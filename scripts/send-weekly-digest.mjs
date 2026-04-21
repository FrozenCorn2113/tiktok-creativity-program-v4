#!/usr/bin/env node
/**
 * TCP Weekly Guide Digest
 * ------------------------
 * Finds guides added or meaningfully updated in the prior 7 days (UTC) and
 * broadcasts a warm-editorial digest email to the Resend audience.
 *
 * Runs: every Sunday evening via cron.
 *
 * Required env vars:
 *   RESEND_API_KEY           Resend API key
 *   RESEND_AUDIENCE_ID       Target audience id for the broadcast
 *   RESEND_FROM_ADDRESS      Optional. From header. Defaults to 'TikTok Creativity Program <hello@tiktokcreativityprogram.com>' (matches welcome email sender).
 *
 * Optional env vars:
 *   DIGEST_SITE_URL          Base site URL (default: https://tiktokcreativityprogram.com)
 *   DRY_RUN=1                Skip send. Writes rendered HTML to scripts/last-digest.html
 *   DIGEST_WINDOW_DAYS       Override 7-day window (integer)
 *
 * Usage:
 *   DRY_RUN=1 node scripts/send-weekly-digest.mjs
 *   node scripts/send-weekly-digest.mjs
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import { Resend } from 'resend'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const guidesDir = path.join(repoRoot, 'content', 'guides')
const outHtmlPath = path.join(__dirname, 'last-digest.html')

// ---------- config ----------
const SITE_URL = (process.env.DIGEST_SITE_URL || 'https://tiktokcreativityprogram.com').replace(/\/$/, '')
const WINDOW_DAYS = Number.parseInt(process.env.DIGEST_WINDOW_DAYS || '7', 10)
const DRY_RUN = process.env.DRY_RUN === '1'
const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID
const RESEND_FROM_ADDRESS =
  process.env.RESEND_FROM_ADDRESS ||
  'TikTok Creativity Program <hello@tiktokcreativityprogram.com>'

// ---------- env validation ----------
function fail(msg) {
  console.error(`[weekly-digest] FATAL: ${msg}`)
  process.exit(1)
}

if (!DRY_RUN) {
  if (!RESEND_API_KEY) fail('RESEND_API_KEY is not set')
  if (!RESEND_AUDIENCE_ID) fail('RESEND_AUDIENCE_ID is not set')
  // RESEND_FROM_ADDRESS has a safe default (hello@tiktokcreativityprogram.com, matches welcome email sender).
} else {
  console.log('[weekly-digest] DRY_RUN=1 — skipping send, will render HTML to scripts/last-digest.html')
}

// ---------- utils ----------
function htmlEscape(s) {
  if (s == null) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function monthDay(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
}

function parseDateSafe(v) {
  if (!v) return null
  const d = new Date(typeof v === 'string' ? v : String(v))
  return Number.isFinite(d.getTime()) ? d : null
}

// ---------- guide loader ----------
function loadAllGuides() {
  const files = fs.readdirSync(guidesDir).filter((f) => f.endsWith('.mdx'))
  return files.map((file) => {
    const fullPath = path.join(guidesDir, file)
    const raw = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(raw)
    return {
      file,
      fullPath,
      slug: data.slug || file.replace(/\.mdx$/, ''),
      title: data.title || data.slug || file,
      description: data.description || '',
      date: data.date || null,
      category: data.category || null,
      readingTime: data.readingTime || null,
      image: data.image || null,
    }
  })
}

function gitAddedGuidesInWindow(days) {
  // Fallback: list guides newly added via git log within window.
  try {
    const out = execSync(
      `git log --since="${days} days ago" --name-only --diff-filter=A --pretty=format: -- content/guides/*.mdx`,
      { cwd: repoRoot, encoding: 'utf8' }
    )
    const set = new Set(
      out
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.startsWith('content/guides/') && s.endsWith('.mdx'))
        .map((s) => path.basename(s))
    )
    return set
  } catch (err) {
    console.warn('[weekly-digest] git fallback failed:', err.message)
    return new Set()
  }
}

function filterRecentGuides(all, days) {
  const now = Date.now()
  const cutoff = now - days * 24 * 60 * 60 * 1000
  const byFrontmatter = all.filter((g) => {
    const d = parseDateSafe(g.date)
    return d && d.getTime() >= cutoff && d.getTime() <= now
  })
  if (byFrontmatter.length > 0) return byFrontmatter

  // Fallback to git log if no frontmatter dates fall in the window.
  const gitAdded = gitAddedGuidesInWindow(days)
  if (gitAdded.size === 0) return []
  return all.filter((g) => gitAdded.has(g.file))
}

// ---------- HTML builder ----------
const PALETTE = {
  paper: '#FBF6EC',
  ink: '#0F0E0C',
  inkMuted: '#5B544A',
  accent: '#F4A261',
  rule: '#E6DDCB',
  pillBg: '#F1E7D2',
}

// Pick one word in a heading to set in Instrument Serif italic.
// Rule: the final word if >= 3 chars, otherwise the longest word.
function italicAccentHeading(text) {
  const escaped = htmlEscape(text)
  const words = escaped.split(/\s+/).filter(Boolean)
  if (words.length === 0) return escaped
  let idx = words.length - 1
  if (words[idx].replace(/[^a-z]/gi, '').length < 3) {
    let best = -1
    let bestLen = 0
    for (let i = 0; i < words.length; i++) {
      const l = words[i].replace(/[^a-z]/gi, '').length
      if (l > bestLen) {
        best = i
        bestLen = l
      }
    }
    if (best >= 0) idx = best
  }
  const styled = `<em style="font-family:'Instrument Serif',Georgia,'Times New Roman',serif;font-style:italic;font-weight:400;color:${PALETTE.ink};">${words[idx]}</em>`
  const out = [...words]
  out[idx] = styled
  return out.join(' ')
}

function absUrl(p) {
  if (!p) return ''
  if (p.startsWith('http')) return p
  if (!p.startsWith('/')) return `${SITE_URL}/${p}`
  return `${SITE_URL}${p}`
}

function buildGuideCard(g) {
  const href = `${SITE_URL}/guides/${encodeURIComponent(g.slug)}`
  const title = htmlEscape(g.title)
  const desc = htmlEscape(g.description)
  const category = g.category ? htmlEscape(g.category) : null
  const readingTime = g.readingTime ? htmlEscape(g.readingTime) : null
  const heroImg = g.image ? absUrl(g.image) : null

  const metaBits = []
  if (category) {
    metaBits.push(
      `<span style="display:inline-block;padding:3px 10px;border-radius:999px;background:${PALETTE.pillBg};color:${PALETTE.ink};font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;">${category}</span>`
    )
  }
  if (readingTime) {
    metaBits.push(
      `<span style="font-family:'JetBrains Mono','Courier New',monospace;font-size:11px;color:${PALETTE.inkMuted};letter-spacing:0.04em;">${readingTime}</span>`
    )
  }
  const meta = metaBits.length
    ? `<div style="margin:0 0 10px 0;line-height:1.4;">${metaBits.join('&nbsp;&nbsp;')}</div>`
    : ''

  const image = heroImg
    ? `<a href="${href}" style="display:block;text-decoration:none;">
         <img src="${heroImg}" alt="" width="520" style="display:block;width:100%;max-width:520px;height:auto;border-radius:10px;border:1px solid ${PALETTE.rule};margin:0 0 16px 0;" />
       </a>`
    : ''

  return `
    <tr>
      <td style="padding:28px 0;border-bottom:1px solid ${PALETTE.rule};">
        ${image}
        ${meta}
        <h2 style="margin:0 0 10px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:22px;line-height:1.25;font-weight:700;letter-spacing:-0.01em;color:${PALETTE.ink};">
          <a href="${href}" style="color:${PALETTE.ink};text-decoration:none;">${title}</a>
        </h2>
        <p style="margin:0 0 14px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${PALETTE.inkMuted};">${desc}</p>
        <p style="margin:0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:14px;line-height:1.4;">
          <a href="${href}" style="color:${PALETTE.ink};font-weight:700;text-decoration:none;border-bottom:2px solid ${PALETTE.accent};padding-bottom:1px;">Read the guide</a>
        </p>
      </td>
    </tr>`
}

function buildDigestHtml({ guides, subject, weekOfLabel, unsubscribeBase }) {
  const heroHeading = italicAccentHeading('New guides worth reading')
  const eyebrow = `DISPATCH · WEEK OF ${weekOfLabel.toUpperCase()}`
  const cards = guides.map(buildGuideCard).join('\n')
  const archiveUrl = `${SITE_URL}/newsletter`
  const unsubHref = `${unsubscribeBase}?email={{{RESEND_UNSUBSCRIBE_EMAIL}}}`

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${htmlEscape(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:${PALETTE.paper};font-family:'Manrope',Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:${PALETTE.ink};">

  <div style="display:none;font-size:1px;color:${PALETTE.paper};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${htmlEscape(subject)}. A short dispatch from TCP.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${PALETTE.paper};">
    <tr>
      <td align="center" style="padding:48px 16px;">

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;width:100%;background-color:${PALETTE.paper};">

          <!-- Mark + eyebrow -->
          <tr>
            <td style="padding:0 0 28px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align:middle;">
                    <span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;font-weight:800;letter-spacing:0.12em;color:${PALETTE.ink};">TCP</span>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;color:${PALETTE.inkMuted};letter-spacing:0.14em;">${htmlEscape(eyebrow)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Rule -->
          <tr>
            <td style="border-top:1px solid ${PALETTE.rule};padding:0;line-height:0;font-size:0;">&nbsp;</td>
          </tr>

          <!-- Hero heading -->
          <tr>
            <td style="padding:40px 0 8px 0;">
              <h1 style="margin:0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:34px;line-height:1.15;font-weight:700;letter-spacing:-0.02em;color:${PALETTE.ink};">
                ${heroHeading}
              </h1>
            </td>
          </tr>

          <!-- Lede -->
          <tr>
            <td style="padding:0 0 12px 0;">
              <p style="margin:0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:${PALETTE.inkMuted};">
                A short dispatch with what shipped this week on TikTok Creativity Program. ${guides.length} ${guides.length === 1 ? 'guide' : 'guides'} below.
              </p>
            </td>
          </tr>

          <!-- Guides list -->
          <tr>
            <td>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${cards}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:40px 0 0 0;">
              <p style="margin:0 0 10px 0;font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${PALETTE.inkMuted};">
                End of dispatch
              </p>
              <p style="margin:0 0 14px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:${PALETTE.inkMuted};">
                Browse every past dispatch in the <a href="${archiveUrl}" style="color:${PALETTE.ink};text-decoration:underline;">newsletter archive</a>, or read the full library at <a href="${SITE_URL}/guides" style="color:${PALETTE.ink};text-decoration:underline;">tiktokcreativityprogram.com/guides</a>.
              </p>
              <p style="margin:0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${PALETTE.inkMuted};">
                You are receiving this because you subscribed on tiktokcreativityprogram.com.
                <br>
                <a href="${unsubHref}" style="color:${PALETTE.inkMuted};text-decoration:underline;">Unsubscribe</a>
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

// ---------- main ----------
async function main() {
  const all = loadAllGuides()
  const recent = filterRecentGuides(all, WINDOW_DAYS).sort((a, b) => {
    const da = parseDateSafe(a.date)?.getTime() ?? 0
    const db = parseDateSafe(b.date)?.getTime() ?? 0
    return db - da
  })

  if (recent.length === 0) {
    console.log('No new guides this week, skipping digest')
    process.exit(0)
  }

  const first = recent[0]
  const subject =
    recent.length === 1
      ? `New on TCP: ${first.title}`
      : `${recent.length} new guides this week`

  const weekOfLabel = monthDay(new Date())
  const unsubscribeBase = `${SITE_URL}/unsubscribe`

  const html = buildDigestHtml({
    guides: recent,
    subject,
    weekOfLabel,
    unsubscribeBase,
  })

  if (DRY_RUN) {
    fs.writeFileSync(outHtmlPath, html, 'utf8')
    console.log(`[weekly-digest] DRY_RUN: wrote ${outHtmlPath}`)
    console.log(
      `[weekly-digest] Would send: subject="${subject}" guides=${recent.length} audienceId=${RESEND_AUDIENCE_ID || '(unset)'}`
    )
    console.log(
      `[weekly-digest] Included: ${recent[0].slug}${recent.length > 1 ? ` .. ${recent[recent.length - 1].slug}` : ''}`
    )
    process.exit(0)
  }

  const resend = new Resend(RESEND_API_KEY)
  const broadcastName = `TCP Weekly Dispatch — ${weekOfLabel}`

  try {
    const created = await resend.broadcasts.create({
      audienceId: RESEND_AUDIENCE_ID,
      from: RESEND_FROM_ADDRESS,
      subject,
      html,
      name: broadcastName,
    })

    if (created.error) {
      throw new Error(`broadcasts.create failed: ${created.error.message}`)
    }

    const broadcastId = created.data?.id
    if (!broadcastId) throw new Error('broadcasts.create returned no id')

    const sent = await resend.broadcasts.send(broadcastId)
    if (sent.error) {
      throw new Error(`broadcasts.send failed: ${sent.error.message}`)
    }

    const lastSlug = recent[recent.length - 1].slug
    console.log(
      `Sent digest to ${RESEND_AUDIENCE_ID}, ${recent.length} guides included, ${recent[0].slug}${
        recent.length > 1 ? ` .. ${lastSlug}` : ''
      }`
    )
    console.log(`[weekly-digest] broadcastId=${broadcastId} subject="${subject}"`)
  } catch (err) {
    console.error('[weekly-digest] send failed:', err.message || err)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('[weekly-digest] unexpected error:', err)
  process.exit(1)
})
