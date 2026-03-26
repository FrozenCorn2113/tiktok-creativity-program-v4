// Newsletter subscription — Supabase capture + Resend welcome email + audience sync
// Uses direct REST API for reliability in Vercel serverless
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendWelcomeEmail } from '@/lib/email/send-welcome'
import { addContactToAudience } from '@/lib/resend-audience'

const bodySchema = z.object({
  email: z.string().email('Invalid email address').max(254),
  source: z.string().max(100).optional(),
  lead_magnet: z.string().max(200).optional(),
  page_url: z.string().max(500).optional(),
})

// Hardcoded Supabase credentials for TCP project (tpihpenmsiojzznpcmcr)
// These are the public anon credentials — same values exposed in the client bundle.
// Hardcoded here because Vercel's Supabase integration overrides env vars with
// credentials from a different project, breaking the newsletter API.
const SUPABASE_PROJECT_URL = 'https://tpihpenmsiojzznpcmcr.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwaWhwZW5tc2lvanp6bnBjbWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMTgxODYsImV4cCI6MjA4OTg5NDE4Nn0.ggN0_rv01pKqU-SS-KWW4gs0iKpgHG1f4N3E6Q2A8aw'

async function insertSubscriber(record: {
  email: string
  source: string | null
  lead_magnet: string | null
  page_url: string | null
}): Promise<{ ok: boolean; duplicate?: boolean; error?: string }> {
  const restUrl = `${SUPABASE_PROJECT_URL}/rest/v1`

  try {
    const res = await fetch(`${restUrl}/email_subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(record),
    })

    if (res.ok) {
      return { ok: true }
    }

    // 409 Conflict = unique violation (email already exists)
    if (res.status === 409) {
      return { ok: true, duplicate: true }
    }

    const errorBody = await res.text()
    console.error(`[api/newsletter] Supabase REST error (${res.status}):`, errorBody)
    return { ok: false, error: `Supabase ${res.status}: ${errorBody}` }
  } catch (err) {
    console.error('[api/newsletter] Supabase fetch error:', err)
    return { ok: false, error: err instanceof Error ? err.message : 'Unknown fetch error' }
  }
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 }
    )
  }

  const { email, source, lead_magnet, page_url } = parsed.data

  const result = await insertSubscriber({
    email,
    source: source ?? 'newsletter',
    lead_magnet: lead_magnet ?? null,
    page_url: page_url ?? null,
  })

  if (!result.ok) {
    console.error('[api/newsletter] Insert failed:', result.error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }

  // Send branded welcome email via Resend (fire-and-forget)
  sendWelcomeEmail({ email, leadMagnet: lead_magnet }).catch((err) => {
    console.error('[api/newsletter] Welcome email failed:', err)
  })

  // Add to Resend audience (fire-and-forget)
  addContactToAudience(email).catch((err) => {
    console.error('[api/newsletter] Audience sync failed:', err)
  })

  return NextResponse.json({ success: true })
}
