// Batch sync: pull all subscribers from Supabase, push to Resend audience
// Requires SUPABASE_SERVICE_ROLE_KEY for server-side SELECT (RLS blocks anon reads)
// Call via POST /api/sync-audience (no body needed)
import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

// Hardcoded Supabase URL (same as other routes — Vercel integration overrides env vars)
const SUPABASE_PROJECT_URL = 'https://tpihpenmsiojzznpcmcr.supabase.co'
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? ''

interface Subscriber {
  email: string
  subscribed: boolean
  unsubscribed_at: string | null
}

async function fetchAllSubscribers(): Promise<Subscriber[]> {
  const restUrl = `${SUPABASE_PROJECT_URL}/rest/v1`

  // Fetch all subscribers (both active and unsubscribed) so we can sync state
  const res = await fetch(
    `${restUrl}/email_subscribers?select=email,subscribed,unsubscribed_at&order=created_at.asc`,
    {
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  )

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Supabase fetch failed (${res.status}): ${body}`)
  }

  return res.json()
}

export async function POST() {
  // Validate config
  if (!resend) {
    return NextResponse.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 })
  }
  if (!AUDIENCE_ID) {
    return NextResponse.json({ error: 'RESEND_AUDIENCE_ID not configured' }, { status: 500 })
  }
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY not configured — needed for server-side reads' },
      { status: 500 }
    )
  }

  let subscribers: Subscriber[]
  try {
    subscribers = await fetchAllSubscribers()
  } catch (err) {
    console.error('[sync-audience] Failed to fetch subscribers:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }

  let added = 0
  let unsubscribed = 0
  let errors = 0

  for (const sub of subscribers) {
    const isActive = sub.subscribed !== false && !sub.unsubscribed_at

    try {
      // Resend's create endpoint is idempotent by email — safe for both new and existing
      const { error } = await resend.contacts.create({
        audienceId: AUDIENCE_ID,
        email: sub.email,
        unsubscribed: !isActive,
      })

      if (error) {
        console.error(`[sync-audience] Error syncing ${sub.email}:`, error)
        errors++
      } else if (isActive) {
        added++
      } else {
        unsubscribed++
      }
    } catch (err) {
      console.error(`[sync-audience] Exception syncing ${sub.email}:`, err)
      errors++
    }
  }

  const summary = {
    total: subscribers.length,
    active_synced: added,
    unsubscribed_synced: unsubscribed,
    errors,
  }

  console.log('[sync-audience] Sync complete:', summary)
  return NextResponse.json(summary)
}
