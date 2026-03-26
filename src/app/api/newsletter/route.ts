// Newsletter subscription — Supabase capture + Resend welcome email
// Uses direct REST API for reliability in Vercel serverless
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendWelcomeEmail } from '@/lib/email/send-welcome'

const bodySchema = z.object({
  email: z.string().email('Invalid email address').max(254),
  source: z.string().max(100).optional(),
  lead_magnet: z.string().max(200).optional(),
  page_url: z.string().max(500).optional(),
})

async function insertSubscriber(record: {
  email: string
  source: string | null
  lead_magnet: string | null
  page_url: string | null
}): Promise<{ ok: boolean; duplicate?: boolean; error?: string }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return { ok: false, error: 'Missing Supabase env vars' }
  }

  const restUrl = `${supabaseUrl}/rest/v1/email_subscribers`

  try {
    const res = await fetch(restUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
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
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    return NextResponse.json({
      error: 'Failed to save',
      _debug: { err: result.error, urlPrefix: supabaseUrl?.substring(0, 30) }
    }, { status: 500 })
  }

  // Send branded welcome email via Resend (fire-and-forget)
  sendWelcomeEmail({ email, leadMagnet: lead_magnet }).catch((err) => {
    console.error('[api/newsletter] Welcome email failed:', err)
  })

  return NextResponse.json({ success: true })
}
