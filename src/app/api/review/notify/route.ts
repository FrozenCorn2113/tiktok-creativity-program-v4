/**
 * Review-request insert notifier — TCP autonomous ops Gap 1.
 *
 * Invoked by a Supabase Database Webhook on INSERT into `review_requests`.
 * Sends an immediate Resend email to Brett with item label, context preview,
 * and one-click GO / REVISE links (HMAC-signed review dashboard).
 *
 * Auth: shared secret in `x-tcp-webhook-secret` header, compared against
 * `REVIEW_WEBHOOK_SECRET` env var with timingSafeEqual. Missing env -> 500.
 *
 * Supabase webhook payload (v1):
 *   { type: 'INSERT', table, schema, record, old_record }
 *
 * Response is always 200 on success so Supabase doesn't retry on side effects
 * (email already sent). Auth + shape failures return 4xx.
 *
 * Registration lives in docs/TCP-AUTONOMY-SETUP.md.
 */
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { Resend } from 'resend'
import { signToken } from '@/lib/review/token'
import { renderEmailShell, bodyText, calloutBox } from '@/lib/email/template-shell'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SITE_URL = 'https://tiktokcreativityprogram.com'
const REVIEW_EMAIL_TO = 'brettlc2113@gmail.com'
const REVIEW_EMAIL_FROM = 'TCP Ops <ops@tiktokcreativityprogram.com>'

interface InsertRecord {
  id?: string
  item_type?: string
  item_label?: string
  preview_urls?: string[] | null
  context_md?: string | null
  preview_html?: string | null
  created_by?: string | null
  created_at?: string | null
}

interface WebhookPayload {
  type?: string
  table?: string
  schema?: string
  record?: InsertRecord
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, 'utf8')
  const bb = Buffer.from(b, 'utf8')
  if (ab.length !== bb.length) return false
  try {
    return crypto.timingSafeEqual(ab, bb)
  } catch {
    return false
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function stripDispatchSentinel(md: string): string {
  return md.replace(/<!--\s*TCP_DISPATCH:[\s\S]*?-->/g, '').trim()
}

function buildBody(record: InsertRecord, reviewUrl: string, previewUrl: string | null): string {
  const itemType = record.item_type || 'item'
  const label = record.item_label || '(unlabeled)'
  const cleanedCtx = stripDispatchSentinel(record.context_md || '')
  const previewText = cleanedCtx.slice(0, 200).trim()
  const truncated = cleanedCtx.length > 200

  const chip = `<div style="margin:0 0 10px 0;">
    <span style="display:inline-block;background-color:#FFF1E6;color:#0B0F1A;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:5px 10px;border-radius:999px;">${escapeHtml(itemType)}</span>
  </div>`

  const title = `<h2 class="card-text" style="margin:0 0 16px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:22px;line-height:1.3;font-weight:700;color:#0B0F1A;letter-spacing:-0.01em;">${escapeHtml(label)}</h2>`

  const contextBlock = previewText
    ? calloutBox('Context.', `${escapeHtml(previewText)}${truncated ? '…' : ''}`)
    : ''

  const urls = (record.preview_urls || []).filter((u) => typeof u === 'string' && u.length > 0)
  const urlList = urls.length
    ? `<p class="card-text" style="margin:0 0 10px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:14px;color:#111827;line-height:1.6;"><strong>Preview links:</strong></p>
<ul class="card-text" style="margin:0 0 20px 0;padding-left:20px;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:14px;color:#111827;line-height:1.7;">
${urls.map((u) => `  <li style="margin-bottom:4px;"><a href="${escapeHtml(u)}" style="color:#F4A261;text-decoration:underline;word-break:break-all;">${escapeHtml(u)}</a></li>`).join('\n')}
</ul>`
    : ''

  const previewBtn = previewUrl
    ? `<p style="margin:0 0 14px 0;text-align:center;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:13px;"><a href="${previewUrl}" class="card-text" style="color:#475467;text-decoration:underline;">Open full preview →</a></p>`
    : ''

  const reviseLink = `<p style="margin:14px 0 0 0;text-align:center;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:13px;"><a href="${reviewUrl}" class="card-text" style="color:#475467;text-decoration:underline;">Open dashboard to REVISE →</a></p>`

  return `${chip}
${title}
${contextBlock}
${urlList}
${previewBtn}
${bodyText('Tap GO below to approve. REVISE opens the dashboard for a comment.')}
${reviseLink}`
}

export async function POST(request: Request) {
  const expected = process.env.REVIEW_WEBHOOK_SECRET
  if (!expected || expected.length < 16) {
    console.error('[api/review/notify] REVIEW_WEBHOOK_SECRET missing or too short')
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  const provided = request.headers.get('x-tcp-webhook-secret') || ''
  if (!safeEqual(provided, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let payload: WebhookPayload
  try {
    payload = (await request.json()) as WebhookPayload
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (payload.type && payload.type !== 'INSERT') {
    // Ignore UPDATE/DELETE silently.
    return NextResponse.json({ ignored: true, reason: `type=${payload.type}` })
  }

  const record = payload.record
  if (!record || !record.id) {
    return NextResponse.json({ error: 'Missing record.id' }, { status: 400 })
  }

  // Build token + URLs.
  let reviewUrl: string
  try {
    reviewUrl = `${SITE_URL}/review/${signToken(record.id)}`
  } catch (err) {
    console.error('[api/review/notify] signToken failed:', err)
    return NextResponse.json({ error: 'Token signing failed' }, { status: 500 })
  }

  // Preview route only for item types with dedicated renderers (see /preview/[id]/page.tsx).
  const hasPreview =
    record.item_type === 'email-draft' ||
    record.item_type === 'copy-draft' ||
    record.item_type === 'page-draft'
  const previewUrl = hasPreview
    ? `${SITE_URL}/preview/${record.id}?t=${encodeURIComponent(signToken(record.id))}`
    : null

  const html = renderEmailShell({
    preheader: `New ${record.item_type || 'item'} needs your review: ${record.item_label || ''}`.slice(0, 100),
    body: buildBody(record, reviewUrl, previewUrl),
    cta: { text: 'Open review dashboard', url: reviewUrl },
    footer: { email: REVIEW_EMAIL_TO },
    title: 'TCP review request',
  })

  const subject = `TCP review: ${record.item_label || 'new item'}`

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[api/review/notify] RESEND_API_KEY missing')
    return NextResponse.json({ error: 'Resend not configured' }, { status: 500 })
  }
  const resend = new Resend(apiKey)

  try {
    const result = await resend.emails.send({
      from: REVIEW_EMAIL_FROM,
      to: REVIEW_EMAIL_TO,
      subject,
      html,
    })
    if (result.error) {
      console.error('[api/review/notify] Resend error:', result.error)
      return NextResponse.json({ error: 'Send failed' }, { status: 502 })
    }
    return NextResponse.json({ sent: true, id: result.data?.id ?? null })
  } catch (err) {
    console.error('[api/review/notify] send exception:', err)
    return NextResponse.json({ error: 'Send exception' }, { status: 502 })
  }
}
