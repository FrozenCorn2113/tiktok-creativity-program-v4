#!/usr/bin/env node
/**
 * TCP Brett Monday Briefing
 * --------------------------
 * Sends Brett a single weekly briefing email at 7am PT every Monday.
 *
 * Sections:
 *   1. Shipped last week  (guides modified in last 7d via fs.statSync)
 *   2. This week's queue  (calendar parsing — Phase A skeleton)
 *   3. Needs your eye     (pending review_requests, links signed via signToken)
 *   4. Blockers           (omitted in v1)
 *   5. Ricky leads        (placeholder, lands Phase B)
 *
 * Required env vars (when not DRY_RUN):
 *   RESEND_API_KEY            Resend API key
 *   REVIEW_TOKEN_SECRET       HMAC signing secret for review URLs (32+ char hex)
 *
 * Optional env vars:
 *   RESEND_TO_BRETT           Recipient (default: brettlc2113@gmail.com)
 *   RESEND_FROM_ADDRESS       From header (default: hello@tiktokcreativityprogram.com)
 *   BRIEFING_SITE_URL         Base site URL (default: https://tiktokcreativityprogram.com)
 *   DRY_RUN=1                 Skip send. Writes rendered HTML to scripts/last-briefing.html
 *
 * Usage:
 *   DRY_RUN=1 node scripts/brett-monday-briefing.mjs
 *   node scripts/brett-monday-briefing.mjs
 *   node scripts/brett-monday-briefing.mjs --daily   (alt subject + shortened period copy)
 */

import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import { Resend } from 'resend'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const guidesDir = path.join(repoRoot, 'content', 'guides')
const outHtmlPath = path.join(__dirname, 'last-briefing.html')

// ---------- config ----------
const SITE_URL = (process.env.BRIEFING_SITE_URL || 'https://tiktokcreativityprogram.com').replace(/\/$/, '')
const DRY_RUN = process.env.DRY_RUN === '1'
const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_TO_BRETT = process.env.RESEND_TO_BRETT || 'brettlc2113@gmail.com'
const RESEND_FROM_ADDRESS =
  process.env.RESEND_FROM_ADDRESS ||
  'TikTok Creativity Program <hello@tiktokcreativityprogram.com>'
const REVIEW_TOKEN_SECRET = process.env.REVIEW_TOKEN_SECRET

// Mirrors api/unsubscribe credentials.
const SUPABASE_PROJECT_URL = 'https://tpihpenmsiojzznpcmcr.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwaWhwZW5tc2lvanp6bnBjbWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMTgxODYsImV4cCI6MjA4OTg5NDE4Nn0.ggN0_rv01pKqU-SS-KWW4gs0iKpgHG1f4N3E6Q2A8aw'

// ---------- env validation ----------
function fail(msg) {
  console.error(`[brett-monday-briefing] FATAL: ${msg}`)
  process.exit(1)
}

if (!DRY_RUN) {
  if (!RESEND_API_KEY) fail('RESEND_API_KEY is not set')
  if (!REVIEW_TOKEN_SECRET || REVIEW_TOKEN_SECRET.length < 16) {
    fail('REVIEW_TOKEN_SECRET is missing or too short (min 16 chars)')
  }
} else {
  console.log('[brett-monday-briefing] DRY_RUN=1 — skipping send, will render HTML to scripts/last-briefing.html')
}

// ---------- HMAC token (mirror src/lib/review/token.ts) ----------
const TOKEN_TTL_MS = 14 * 24 * 60 * 60 * 1000

function base64UrlEncode(s) {
  return Buffer.from(s, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function signToken(rowId) {
  if (!REVIEW_TOKEN_SECRET) {
    // In DRY_RUN we may still want a placeholder token.
    const fake = base64UrlEncode(`${rowId}.0.unsigned`)
    return fake
  }
  const expiresAt = Date.now() + TOKEN_TTL_MS
  const payload = `${rowId}.${expiresAt}`
  const sig = crypto.createHmac('sha256', REVIEW_TOKEN_SECRET).update(payload).digest('hex')
  return base64UrlEncode(`${payload}.${sig}`)
}

// ---------- utils ----------
function monthDay(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'America/Los_Angeles' })
}

function daysAgoMs(days) {
  return Date.now() - days * 24 * 60 * 60 * 1000
}

// ---------- data: shipped last week ----------
function gatherShipped() {
  if (!fs.existsSync(guidesDir)) return []
  const cutoff = daysAgoMs(7)
  const files = fs.readdirSync(guidesDir).filter((f) => f.endsWith('.mdx'))
  const shipped = []
  for (const file of files) {
    const full = path.join(guidesDir, file)
    let stat
    try {
      stat = fs.statSync(full)
    } catch {
      continue
    }
    if (stat.mtimeMs >= cutoff) {
      const raw = fs.readFileSync(full, 'utf8')
      let title = file.replace(/\.mdx$/, '')
      try {
        const { data } = matter(raw)
        title = data.title || title
      } catch {
        // ignore
      }
      shipped.push({ title, mtime: stat.mtimeMs })
    }
  }
  shipped.sort((a, b) => b.mtime - a.mtime)
  return shipped.slice(0, 12).map((s) => s.title)
}

// ---------- data: subscriber deltas ----------
async function gatherSubscriberDelta() {
  // Best-effort: ignore failures. Returns null on error.
  try {
    const url = `${SUPABASE_PROJECT_URL}/rest/v1/email_subscribers?select=created_at`
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
    if (!res.ok) return null
    const rows = await res.json()
    if (!Array.isArray(rows)) return null
    const cutoff = daysAgoMs(7)
    const newCount = rows.filter((r) => {
      const t = r?.created_at ? new Date(r.created_at).getTime() : 0
      return t >= cutoff
    }).length
    return { total: rows.length, newCount }
  } catch (err) {
    console.warn('[brett-monday-briefing] subscriber delta fetch failed:', err.message)
    return null
  }
}

// ---------- data: pending reviews + Bernard proposals ----------
async function gatherPendingReviews() {
  try {
    const url = `${SUPABASE_PROJECT_URL}/rest/v1/review_requests?decision=is.null&select=id,item_type,item_label,context_md,created_by,created_at&order=created_at.desc`
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
    if (!res.ok) {
      console.warn(`[brett-monday-briefing] pending reviews fetch returned ${res.status}`)
      return { proposals: [], reviews: [] }
    }
    const rows = await res.json()
    if (!Array.isArray(rows)) return { proposals: [], reviews: [] }

    const proposals = []
    const reviews = []
    for (const r of rows) {
      const url = `${SITE_URL}/review/${signToken(r.id)}`
      // Bernard proposal detected by TCP_DISPATCH sentinel in context_md.
      const isProposal = r.context_md && /<!--\s*TCP_DISPATCH:/.test(r.context_md)
      if (isProposal) {
        // Extract a short summary line (first paragraph of context_md, pre-sentinel).
        const beforeSentinel = (r.context_md || '').split('<!-- TCP_DISPATCH:')[0].trim()
        const firstLine = beforeSentinel.split('\n').find((l) => l.trim().length > 0) || ''
        proposals.push({
          label: r.item_label || '(unlabeled proposal)',
          summary: firstLine.slice(0, 200),
          reviewUrl: url,
        })
      } else {
        reviews.push({
          label: r.item_label || '(unlabeled)',
          itemType: r.item_type || 'item',
          reviewUrl: url,
        })
      }
    }
    return { proposals, reviews }
  } catch (err) {
    console.warn('[brett-monday-briefing] pending reviews fetch failed:', err.message)
    return { proposals: [], reviews: [] }
  }
}

// ---------- data: this week's queue (skeleton) ----------
function gatherThisWeek(subscriberDelta) {
  // Phase A: skeletal. Calendar parsing lands later.
  const items = []
  if (subscriberDelta) {
    items.push(
      `Subscribers: ${subscriberDelta.total} total, +${subscriberDelta.newCount} this past week`
    )
  }
  items.push('Sunday weekly digest auto-sends if any guides shipped')
  items.push('Drip emails (day 2/5/8/12) auto-fire for new signups')
  return items
}

// ---------- briefing renderer (mirrors src/lib/email/briefing-template.ts) ----------
// Inlined here so we avoid TS compilation in the script. Keep in sync.
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function bodyText(p) {
  return `<p class="card-text" style="margin:0 0 16px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.65;">${p}</p>`
}

function calloutBox(label, text) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="callout-box" style="background-color:#FFF1E6;border-radius:10px;margin:8px 0 20px 0;">
  <tr>
    <td style="padding:16px 20px;">
      <p class="card-text-muted" style="margin:0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:13px;color:#475467;line-height:1.7;">
        <strong style="color:#0B0F1A;">${label}</strong> ${text}
      </p>
    </td>
  </tr>
</table>`
}

function bulletList(items) {
  const lis = items.map((item) => `    <li style="margin-bottom:6px;">${item}</li>`).join('\n')
  return `<ul class="card-text" style="margin:0 0 16px 0;padding-left:20px;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.8;">
${lis}
  </ul>`
}

function sectionHeading(title, first = false) {
  const margin = first ? '0' : '24px 0 12px 0'
  const m = first ? '0 0 12px 0' : margin
  return `<h2 style="margin:${m};font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:18px;font-weight:800;letter-spacing:-0.01em;color:#0B0F1A;line-height:1.3;">${escapeHtml(title)}</h2>`
}

function reviewLine(r) {
  return `<strong>${escapeHtml(r.itemType)}:</strong> <a href="${r.reviewUrl}" style="color:#0B0F1A;text-decoration:underline;">${escapeHtml(r.label)}</a>`
}

function proposalLine(p) {
  return `<strong><a href="${p.reviewUrl}" style="color:#0B0F1A;text-decoration:underline;">${escapeHtml(p.label)}</a></strong><br/><span style="color:#475467;font-size:14px;">${escapeHtml(p.summary)}</span>`
}

function renderCTA(cta) {
  const vmlWidth = cta.text.length > 18 ? 300 : 240
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
  <tr>
    <td align="center" style="padding:0;">
      <!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml"
                   xmlns:w="urn:schemas-microsoft-com:office:word"
                   href="${cta.url}"
                   style="height:48px;v-text-anchor:middle;width:${vmlWidth}px;"
                   arcsize="50%"
                   fillcolor="#F4A261"
                   stroke="f">
        <w:anchorlock/>
        <center style="color:#0B0F1A;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;">
          ${cta.text}
        </center>
      </v:roundrect>
      <![endif]-->
      <!--[if !mso]><!-->
      <a href="${cta.url}" class="cta-link" style="display:inline-block;padding:14px 32px;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#0B0F1A;text-decoration:none;border-radius:999px;background:linear-gradient(135deg,#F4A261 0%,#E8894A 100%);background-color:#F4A261;box-shadow:inset 0 -2px 0 rgba(0,0,0,0.15),0 1px 3px rgba(0,0,0,0.12);line-height:1;mso-hide:all;">
        ${cta.text}
      </a>
      <!--<![endif]-->
    </td>
  </tr>
</table>`
}

function renderShell({ preheader, body, cta, footerEmail, title }) {
  const unsubscribeUrl = footerEmail
    ? `${SITE_URL}/unsubscribe?email=${encodeURIComponent(footerEmail)}`
    : `${SITE_URL}/unsubscribe`
  const ctaRow = cta
    ? `<tr>
  <td style="padding:8px 32px 0 32px;" align="center">
    ${renderCTA(cta)}
  </td>
</tr>
`
    : ''
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${escapeHtml(title)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap');
    @media (prefers-color-scheme: dark) {
      body, .outer-wrapper { background-color: #1A1310 !important; }
      .card { background-color: #211C18 !important; border-color: #3A3028 !important; }
      .card-text { color: #EDE8E3 !important; }
      .card-text a { color: #F4A261 !important; text-decoration: underline !important; }
      .card-text-muted { color: #A89E96 !important; }
      .callout-box { background-color: #2A2218 !important; }
      .wordmark-pill { background-color: #2A2218 !important; }
      .footer-text { color: #6B6560 !important; }
      .footer-text a { color: #A89E96 !important; }
      .wordmark-text { color: #EDE8E3 !important; }
    }
  </style>
</head>
<body class="outer-wrapper" style="margin:0;padding:0;background-color:#FFF7ED;font-family:'Manrope',Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;">
  <div style="display:none;font-size:1px;color:#FFF7ED;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="outer-wrapper" style="background-color:#FFF7ED;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="card" style="max-width:600px;width:100%;background-color:#FFFFFF;border:1px solid #EADFD3;border-radius:16px;">
          <tr>
            <td style="padding:28px 0 0 0;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr>
                  <td class="wordmark-pill" style="background-color:#FFF1E6;border-radius:10px;padding:10px 20px;">
                    <span class="wordmark-text" style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:17px;font-weight:800;color:#0B0F1A;letter-spacing:-0.3px;">TikTok Creativity Program</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 0 0 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td height="3" style="height:3px;font-size:0;line-height:0;background-color:#F4A261;">&#8202;</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 0 32px;">
              ${body}
            </td>
          </tr>
          ${ctaRow}<tr>
            <td style="padding:28px 0 0 0;"></td>
          </tr>
          <tr>
            <td style="padding:0 32px;">
              <div style="border-top:1px solid #EADFD3;"></div>
            </td>
          </tr>
          <tr>
            <td class="footer-text" style="padding:20px 32px 28px 32px;text-align:center;">
              <p style="margin:0 0 6px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:12px;color:#475467;line-height:1.6;">
                <a href="${SITE_URL}" style="color:#475467;text-decoration:underline;" target="_blank">tiktokcreativityprogram.com</a>
              </p>
              <p style="margin:0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:11px;color:#9CA3AF;line-height:1.5;">
                Internal ops briefing for Brett. <a href="${unsubscribeUrl}" style="color:#9CA3AF;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function renderBriefing({ weekOfLabel, bernardProposals = [], shipped, thisWeek, pendingReviews, blockers, rickyLeadsNote, daily = false }) {
  const parts = []

  let firstDone = false
  if (bernardProposals.length > 0) {
    parts.push(sectionHeading('Bernard proposals — your call', true))
    parts.push(bulletList(bernardProposals.map(proposalLine)))
    parts.push(bodyText('One-click GO dispatches the downstream agent same-day. REVISE bounces it back with your comment.'))
    firstDone = true
  }

  parts.push(sectionHeading('Shipped last week', !firstDone))
  if (shipped.length > 0) {
    parts.push(bulletList(shipped.map(escapeHtml)))
  } else {
    parts.push(bodyText('Quiet week. No new ships logged.'))
  }

  parts.push(sectionHeading("This week's queue"))
  if (thisWeek.length > 0) {
    parts.push(bulletList(thisWeek.map(escapeHtml)))
  } else {
    parts.push(bodyText('Calendar is open. Bernard will fill from the content backlog.'))
  }

  parts.push(sectionHeading('Needs your eye'))
  if (pendingReviews.length > 0) {
    parts.push(bulletList(pendingReviews.map(reviewLine)))
    parts.push(bodyText('Click any link above to review. One tap = decision logged. Bernard takes it from there.'))
  } else {
    parts.push(calloutBox('All clear.', 'No pending reviews. You can ignore this section.'))
  }

  if (blockers.length > 0) {
    parts.push(sectionHeading('Blockers'))
    parts.push(bulletList(blockers.map((b) => escapeHtml(b))))
  }

  parts.push(sectionHeading('Ricky leads'))
  parts.push(bodyText(escapeHtml(rickyLeadsNote || 'Ricky reactivation lands Phase B. No leads to post this week.')))

  const cta = bernardProposals.length > 0
    ? { text: 'Review first proposal', url: bernardProposals[0].reviewUrl }
    : pendingReviews.length > 0
    ? { text: 'Open first review', url: pendingReviews[0].reviewUrl }
    : undefined
  const totalAsk = bernardProposals.length + pendingReviews.length
  const preheader =
    totalAsk > 0
      ? `${totalAsk} item${totalAsk === 1 ? '' : 's'} need your eye ${daily ? 'today' : 'this week'}.`
      : `All clear. ${daily ? 'Daily brief' : `Week of ${weekOfLabel}`}.`

  return renderShell({
    preheader,
    body: parts.join('\n'),
    cta,
    footerEmail: null,
    title: daily ? `TCP daily brief: ${weekOfLabel}` : `TCP: Week of ${weekOfLabel}`,
  })
}

// ---------- main ----------
async function main() {
  const daily = process.argv.includes('--daily')
  const weekOfLabel = monthDay(new Date())

  const shipped = gatherShipped()
  const subscriberDelta = await gatherSubscriberDelta()
  const thisWeek = gatherThisWeek(subscriberDelta)
  const { proposals: bernardProposals, reviews: pendingReviews } = await gatherPendingReviews()
  const blockers = [] // Phase A: empty by default. Bernard can wire data source later.

  const html = renderBriefing({
    weekOfLabel,
    bernardProposals,
    shipped,
    thisWeek,
    pendingReviews,
    blockers,
    rickyLeadsNote: undefined,
    daily,
  })

  const subject = daily ? `TCP daily brief: ${weekOfLabel}` : `TCP: Week of ${weekOfLabel}`

  if (DRY_RUN) {
    fs.writeFileSync(outHtmlPath, html, 'utf8')
    console.log(`[brett-monday-briefing] DRY_RUN: wrote ${outHtmlPath}`)
    console.log(
      `[brett-monday-briefing] Would send: subject="${subject}" to=${RESEND_TO_BRETT} shipped=${shipped.length} pending=${pendingReviews.length} proposals=${bernardProposals.length}`
    )
    process.exit(0)
  }

  const resend = new Resend(RESEND_API_KEY)
  try {
    const sent = await resend.emails.send({
      from: RESEND_FROM_ADDRESS,
      to: RESEND_TO_BRETT,
      subject,
      html,
    })
    if (sent.error) {
      throw new Error(`emails.send failed: ${sent.error.message}`)
    }
    console.log(
      `[brett-monday-briefing] Sent to ${RESEND_TO_BRETT} subject="${subject}" id=${sent.data?.id || '(no id)'}`
    )
  } catch (err) {
    console.error('[brett-monday-briefing] send failed:', err.message || err)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('[brett-monday-briefing] unexpected error:', err)
  process.exit(1)
})
