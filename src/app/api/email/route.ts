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

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 })
  }

  const { email, source, lead_magnet, page_url } = parsed.data

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: 'Email provider not configured' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const { error } = await supabase
    .from('email_subscribers')
    .upsert(
      { email, source: source ?? null, lead_magnet: lead_magnet ?? null, page_url: page_url ?? null },
      { onConflict: 'email', ignoreDuplicates: false }
    )

  if (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }

  // Send branded welcome email via Resend (fire-and-forget — don't block response)
  sendWelcomeEmail({ email, leadMagnet: lead_magnet }).catch((err) => {
    console.error('[api/email] Welcome email failed:', err)
  })

  return NextResponse.json({ success: true })
}
