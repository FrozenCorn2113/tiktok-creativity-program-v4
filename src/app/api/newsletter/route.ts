// Newsletter subscription — unified Supabase capture + Resend welcome email
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import { sendWelcomeEmail } from '@/lib/email/send-welcome'

const bodySchema = z.object({
  email: z.string().email('Invalid email address').max(254),
  source: z.string().max(100).optional(),
  lead_magnet: z.string().max(200).optional(),
  page_url: z.string().max(500).optional(),
})

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  // Prefer service role key for server-side (bypasses RLS)
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseKey)
}

export async function GET() {
  // Health check endpoint for debugging
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY
  const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const hasResendKey = !!process.env.RESEND_API_KEY

  return NextResponse.json({
    status: 'ok',
    config: {
      supabaseUrl: hasUrl,
      serviceRoleKey: hasServiceKey,
      anonKey: hasAnonKey,
      resendKey: hasResendKey,
    },
  })
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

  const supabase = getSupabaseClient()
  if (!supabase) {
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const hasKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY || !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    console.error(`[api/newsletter] Missing env vars — URL: ${hasUrl}, Key: ${hasKey}`)
    return NextResponse.json({ error: 'Email provider not configured' }, { status: 500 })
  }

  const usingServiceRole = !!process.env.SUPABASE_SERVICE_ROLE_KEY
  console.log(`[api/newsletter] Inserting subscriber: ${email} (source: ${source ?? 'newsletter'}, serviceRole: ${usingServiceRole})`)

  const { data, error, status, statusText } = await supabase
    .from('email_subscribers')
    .insert({ email, source: source ?? 'newsletter', lead_magnet: lead_magnet ?? null, page_url: page_url ?? null })
    .select()

  // 23505 = unique_violation — email already exists, treat as success
  if (error && error.code !== '23505') {
    console.error(`[api/newsletter] Supabase insert error (HTTP ${status} ${statusText}):`, JSON.stringify(error))
    return NextResponse.json({ error: 'Failed to save', debug: { code: error.code, message: error.message, hint: error.hint, status } }, { status: 500 })
  }

  console.log(`[api/newsletter] Insert success for ${email}`, data ? `rows: ${data.length}` : '(no select data)')

  // Send branded welcome email via Resend (fire-and-forget — don't block response)
  sendWelcomeEmail({ email, leadMagnet: lead_magnet }).catch((err) => {
    console.error('[api/newsletter] Welcome email failed:', err)
  })

  return NextResponse.json({ success: true })
}
