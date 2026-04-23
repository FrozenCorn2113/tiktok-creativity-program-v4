#!/usr/bin/env node
/**
 * TCP Weekly Analytics Snapshot
 * -----------------------------
 * Writes a structured markdown snapshot to
 *   analytics/weekly/YYYY-MM-DD.md
 *
 * Pulls data from:
 *   - GA4 (via ga-service-account.json)     → traffic metrics
 *   - Supabase email_subscribers             → signup velocity, unsub rate
 *   - Resend emails/audience                 → drip + digest performance (best effort)
 *   - Local content/ + logs/                 → content shipped this week
 *
 * PostHog intentionally dropped per Bernard memo (simpler at this scale).
 *
 * Usage:
 *   node scripts/weekly-snapshot.mjs
 *   DRY_RUN=1 node scripts/weekly-snapshot.mjs   # still writes the .md (that's the deliverable)
 *
 * Exit non-zero only on fatal errors. Partial data failures are logged inline
 * in the markdown as "(unavailable: reason)" so the file always lands.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const outDir = path.join(repoRoot, 'analytics', 'weekly')
const guidesDir = path.join(repoRoot, 'content', 'guides')

// ---------- config ----------
const SUPABASE_PROJECT_URL =
  process.env.SUPABASE_URL || 'https://tpihpenmsiojzznpcmcr.supabase.co'
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwaWhwZW5tc2lvanp6bnBjbWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMTgxODYsImV4cCI6MjA4OTg5NDE4Nn0.ggN0_rv01pKqU-SS-KWW4gs0iKpgHG1f4N3E6Q2A8aw'
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || null

const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID || '507035708'
const GA_SERVICE_ACCOUNT_PATH =
  process.env.GA_SERVICE_ACCOUNT_PATH ||
  path.join(repoRoot, 'ga-service-account.json')

const RESEND_API_KEY = process.env.RESEND_API_KEY || null
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || null

// ---------- helpers ----------
function isoDate(d = new Date()) {
  return d.toISOString().slice(0, 10)
}

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000)
}

function fmtNum(n) {
  if (n == null || Number.isNaN(n)) return 'n/a'
  return new Intl.NumberFormat('en-US').format(n)
}

function fmtPct(n, digits = 1) {
  if (n == null || Number.isNaN(n)) return 'n/a'
  return `${(n * 100).toFixed(digits)}%`
}

// ---------- GA4 via JWT + Analytics Data API (no deps) ----------
async function ga4Query({ startDate, endDate, dimensions = [], metrics = [], limit = 20 }) {
  // Returns { rows: [{dims: [...], mets: [...]}], error }
  if (!fs.existsSync(GA_SERVICE_ACCOUNT_PATH)) {
    return { rows: [], error: `ga-service-account.json not found at ${GA_SERVICE_ACCOUNT_PATH}` }
  }
  let creds
  try {
    creds = JSON.parse(fs.readFileSync(GA_SERVICE_ACCOUNT_PATH, 'utf8'))
  } catch (err) {
    return { rows: [], error: `invalid ga-service-account.json: ${err.message}` }
  }

  // --- Build JWT ---
  const crypto = await import('crypto')
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT' }
  const claims = {
    iss: creds.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }
  const b64url = (obj) =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  const unsigned = `${b64url(header)}.${b64url(claims)}`
  const signer = crypto.createSign('RSA-SHA256')
  signer.update(unsigned)
  const sig = signer
    .sign(creds.private_key, 'base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
  const jwt = `${unsigned}.${sig}`

  // --- Exchange for access token ---
  let accessToken
  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
    })
    if (!res.ok) {
      const t = await res.text()
      return { rows: [], error: `GA token exchange ${res.status}: ${t.slice(0, 200)}` }
    }
    const body = await res.json()
    accessToken = body.access_token
  } catch (err) {
    return { rows: [], error: `GA token fetch failed: ${err.message}` }
  }

  // --- Run report ---
  try {
    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY_ID}:runReport`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate, endDate }],
          dimensions: dimensions.map((name) => ({ name })),
          metrics: metrics.map((name) => ({ name })),
          limit,
        }),
      }
    )
    if (!res.ok) {
      const t = await res.text()
      return { rows: [], error: `GA runReport ${res.status}: ${t.slice(0, 200)}` }
    }
    const body = await res.json()
    const rows = (body.rows || []).map((r) => ({
      dims: (r.dimensionValues || []).map((v) => v.value),
      mets: (r.metricValues || []).map((v) => v.value),
    }))
    return { rows, error: null }
  } catch (err) {
    return { rows: [], error: `GA runReport failed: ${err.message}` }
  }
}

async function gatherTraffic() {
  const start = isoDate(daysAgo(7))
  const end = isoDate(daysAgo(1))

  const totals = await ga4Query({
    startDate: start,
    endDate: end,
    metrics: ['sessions', 'screenPageViews', 'activeUsers'],
  })

  const topPages = await ga4Query({
    startDate: start,
    endDate: end,
    dimensions: ['pagePath'],
    metrics: ['screenPageViews'],
    limit: 10,
  })

  const sources = await ga4Query({
    startDate: start,
    endDate: end,
    dimensions: ['sessionSource'],
    metrics: ['sessions'],
    limit: 8,
  })

  return {
    startDate: start,
    endDate: end,
    totals,
    topPages,
    sources,
  }
}

// ---------- Supabase signups ----------
// Exclude synthetic/QA rows so totals, weekly, and unsub counts reflect real subs.
const TEST_SOURCES = ['debug-test', 'e2e-test', 'debug', 'hardcoded-test']

async function gatherSignups() {
  const key = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY
  try {
    // PostgREST `not.in` filter — applied to all three derived counts since we
    // fetch the full set once and bucket locally.
    const notIn = `(${TEST_SOURCES.join(',')})`
    const url = `${SUPABASE_PROJECT_URL}/rest/v1/email_subscribers?select=created_at,unsubscribed_at,lead_magnet,source&source=not.in.${encodeURIComponent(
      notIn
    )}`
    const res = await fetch(url, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    })
    if (!res.ok) {
      return { error: `Supabase ${res.status}`, total: null, newWeek: null, unsubWeek: null }
    }
    const rows = await res.json()
    if (!Array.isArray(rows)) {
      return { error: 'Supabase: non-array response (RLS?)', total: null, newWeek: null, unsubWeek: null }
    }
    const cutoff = daysAgo(7).getTime()
    let newWeek = 0
    let unsubWeek = 0
    const bySource = {}
    const byLM = {}
    for (const r of rows) {
      const t = r?.created_at ? new Date(r.created_at).getTime() : 0
      if (t >= cutoff) newWeek += 1
      if (r?.unsubscribed_at) {
        const ut = new Date(r.unsubscribed_at).getTime()
        if (ut >= cutoff) unsubWeek += 1
      }
      const s = r?.source || '(unknown)'
      bySource[s] = (bySource[s] || 0) + (t >= cutoff ? 1 : 0)
      const lm = r?.lead_magnet || '(none)'
      byLM[lm] = (byLM[lm] || 0) + (t >= cutoff ? 1 : 0)
    }
    const total = rows.length
    const unsubRate = total > 0 ? unsubWeek / Math.max(newWeek, 1) : null
    return { error: null, total, newWeek, unsubWeek, unsubRate, bySource, byLM }
  } catch (err) {
    return { error: err.message, total: null, newWeek: null, unsubWeek: null }
  }
}

// ---------- Resend drip + digest performance ----------
async function gatherEmailPerformance() {
  // Resend exposes per-email events (sent/delivered/opened/clicked) via the Emails list API.
  // At our scale (<200 sends/week), we can paginate the last 7 days of emails and bucket them
  // by "subject prefix" to stage-attribute drip performance.
  if (!RESEND_API_KEY) {
    return { error: 'RESEND_API_KEY missing' }
  }
  try {
    const res = await fetch('https://api.resend.com/emails?limit=100', {
      headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
    })
    if (!res.ok) {
      return { error: `Resend ${res.status}` }
    }
    const body = await res.json()
    const emails = body?.data || body?.emails || []
    if (!Array.isArray(emails)) {
      return { error: 'Resend: unexpected response shape' }
    }
    const cutoff = daysAgo(7).getTime()
    const stages = { day0: [], day2: [], day5: [], day8: [], day12: [], digest: [], other: [] }
    for (const e of emails) {
      const ct = e.created_at ? new Date(e.created_at).getTime() : 0
      if (ct < cutoff) continue
      const subj = (e.subject || '').toLowerCase()
      let bucket = 'other'
      if (subj.includes('welcome')) bucket = 'day0'
      else if (subj.includes('day 2') || subj.includes('day2')) bucket = 'day2'
      else if (subj.includes('day 5') || subj.includes('day5')) bucket = 'day5'
      else if (subj.includes('day 8') || subj.includes('day8')) bucket = 'day8'
      else if (subj.includes('day 12') || subj.includes('day12')) bucket = 'day12'
      else if (subj.includes('digest') || subj.includes('weekly') || subj.includes('sunday'))
        bucket = 'digest'
      stages[bucket].push(e)
    }
    // Resend doesn't surface aggregate open/click on the list endpoint — flag as unavailable.
    // Per-email event queries would require N calls; we skip unless Brett wires a pipeline later.
    return {
      error: null,
      stageCounts: Object.fromEntries(Object.entries(stages).map(([k, v]) => [k, v.length])),
      note: 'Open/click rates require per-email event queries. Phase C: add /emails/:id/events batching.',
    }
  } catch (err) {
    return { error: err.message }
  }
}

// ---------- Inbox signals (Phase C stub) ----------
async function gatherInboxSignals() {
  // Placeholder. Phase C will populate this from a replies-ingest table.
  return { error: 'Phase C pending', count: 0 }
}

// ---------- Content shipped ----------
function gatherContentShipped() {
  if (!fs.existsSync(guidesDir)) return { guides: [] }
  const cutoff = daysAgo(7).getTime()
  const guides = []
  for (const f of fs.readdirSync(guidesDir)) {
    if (!f.endsWith('.mdx')) continue
    const full = path.join(guidesDir, f)
    const stat = fs.statSync(full)
    if (stat.mtimeMs >= cutoff) {
      guides.push({ file: f, mtime: stat.mtimeMs })
    }
  }
  guides.sort((a, b) => b.mtime - a.mtime)
  return { guides }
}

// ---------- markdown rendering ----------
function renderTotals(totals) {
  if (totals.error) return `- _(unavailable: ${totals.error})_`
  if (!totals.rows.length) return '- No data returned.'
  const row = totals.rows[0]
  return [
    `- Sessions: **${fmtNum(Number(row.mets[0]))}**`,
    `- Pageviews: **${fmtNum(Number(row.mets[1]))}**`,
    `- Active users: **${fmtNum(Number(row.mets[2]))}**`,
  ].join('\n')
}

function renderTopPages(top) {
  if (top.error) return `_(unavailable: ${top.error})_`
  if (!top.rows.length) return '_No data._'
  const lines = ['| Page | Views |', '|---|---|']
  for (const r of top.rows) {
    lines.push(`| \`${r.dims[0]}\` | ${fmtNum(Number(r.mets[0]))} |`)
  }
  return lines.join('\n')
}

function renderSources(s) {
  if (s.error) return `_(unavailable: ${s.error})_`
  if (!s.rows.length) return '_No data._'
  const lines = ['| Source | Sessions |', '|---|---|']
  for (const r of s.rows) {
    lines.push(`| ${r.dims[0]} | ${fmtNum(Number(r.mets[0]))} |`)
  }
  return lines.join('\n')
}

function renderSignups(s) {
  if (s.error) return `- _(unavailable: ${s.error})_`
  const lines = [
    `- Total subscribers: **${fmtNum(s.total)}**`,
    `- New this week: **${fmtNum(s.newWeek)}**`,
    `- Unsubs this week: **${fmtNum(s.unsubWeek)}**`,
    `- Unsub rate (vs new): ${s.unsubRate == null ? 'n/a' : fmtPct(s.unsubRate)}`,
  ]
  if (s.bySource) {
    lines.push('')
    lines.push('**New signups by source:**')
    for (const [k, v] of Object.entries(s.bySource).sort((a, b) => b[1] - a[1])) {
      if (v > 0) lines.push(`- ${k}: ${v}`)
    }
  }
  if (s.byLM) {
    lines.push('')
    lines.push('**New signups by lead magnet:**')
    for (const [k, v] of Object.entries(s.byLM).sort((a, b) => b[1] - a[1])) {
      if (v > 0) lines.push(`- ${k}: ${v}`)
    }
  }
  return lines.join('\n')
}

function renderEmailPerf(p) {
  if (p.error) return `- _(unavailable: ${p.error})_`
  const lines = ['**Sends in last 7 days (bucketed by subject):**']
  for (const [k, v] of Object.entries(p.stageCounts)) {
    lines.push(`- ${k}: ${v}`)
  }
  if (p.note) lines.push('', `_Note: ${p.note}_`)
  return lines.join('\n')
}

function renderContent(c) {
  if (!c.guides.length) return '- No guides modified this week.'
  return c.guides.map((g) => `- \`content/guides/${g.file}\``).join('\n')
}

// ---------- main ----------
async function main() {
  const today = isoDate()
  const [traffic, signups, emailPerf, inbox] = await Promise.all([
    gatherTraffic(),
    gatherSignups(),
    gatherEmailPerformance(),
    gatherInboxSignals(),
  ])
  const content = gatherContentShipped()

  const md = `# TCP Weekly Snapshot — ${today}

_Generated by \`scripts/weekly-snapshot.mjs\`. Source of truth for Bernard's Friday decision cron._

**Window:** ${traffic.startDate} → ${traffic.endDate} (7 days)

---

## 1. Traffic (GA4)

${renderTotals(traffic.totals)}

### Top pages
${renderTopPages(traffic.topPages)}

### Top sources
${renderSources(traffic.sources)}

---

## 2. Signup velocity (Supabase)

${renderSignups(signups)}

---

## 3. Drip + newsletter performance (Resend)

${renderEmailPerf(emailPerf)}

---

## 4. Inbox signals

- Reply/intent signal count: **${inbox.count}** _(${inbox.error || 'live'})_

---

## 5. Content shipped this week

${renderContent(content)}

---

_End of snapshot. Bernard's Friday 9am PT decision cron reads this file + the previous 3 weeks + \`HYPOTHESES.md\` to propose reversible actions._
`

  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, `${today}.md`)
  fs.writeFileSync(outPath, md, 'utf8')
  console.log(`[weekly-snapshot] wrote ${outPath} (${md.length} bytes)`)
}

main().catch((err) => {
  console.error('[weekly-snapshot] fatal:', err)
  process.exit(1)
})
