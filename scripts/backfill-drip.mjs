#!/usr/bin/env node
/**
 * Backfill the day 2/5/8/12 drip sequence for all active subscribers.
 *
 * Default mode is dry-run: queries Supabase for active subs and prints
 * counts without sending. Pass --execute to actually schedule the sends.
 *
 * Usage:
 *   node scripts/backfill-drip.mjs             # dry run
 *   node scripts/backfill-drip.mjs --execute   # actually schedule
 *
 * Per-subscriber outcomes are logged to logs/backfill-drip-YYYY-MM-DD.log.
 *
 * Requires RESEND_API_KEY in env when running with --execute.
 * Uses hardcoded public Supabase URL + anon key (same pattern as
 * src/app/api/newsletter/route.ts).
 */

import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const SCRIPT_DIR = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, '..')
const LOGS_DIR = path.join(PROJECT_ROOT, 'logs')

// Mirror of src/app/api/newsletter/route.ts credentials.
// Note: anon key cannot SELECT from email_subscribers (RLS). To read the
// subscriber list, set SUPABASE_SERVICE_ROLE_KEY in your env before running.
const SUPABASE_PROJECT_URL = 'https://tpihpenmsiojzznpcmcr.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwaWhwZW5tc2lvanp6bnBjbWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMTgxODYsImV4cCI6MjA4OTg5NDE4Nn0.ggN0_rv01pKqU-SS-KWW4gs0iKpgHG1f4N3E6Q2A8aw'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY
const USING_SERVICE_ROLE = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)

const args = process.argv.slice(2)
const EXECUTE = args.includes('--execute')

if (EXECUTE && !process.env.RESEND_API_KEY) {
  console.error('RESEND_API_KEY is required when running with --execute')
  process.exit(1)
}

fs.mkdirSync(LOGS_DIR, { recursive: true })
const today = new Date().toISOString().slice(0, 10)
const LOG_PATH = path.join(LOGS_DIR, `backfill-drip-${today}.log`)
const logStream = fs.createWriteStream(LOG_PATH, { flags: 'a' })

function log(line) {
  const stamp = new Date().toISOString()
  const msg = `[${stamp}] ${line}`
  console.log(msg)
  logStream.write(msg + '\n')
}

const TEST_SOURCES = new Set(['debug', 'debug-test', 'hardcoded-test', 'e2e-test'])

function isTestRow(row) {
  if (TEST_SOURCES.has(row.source)) return true
  if (/^test[-_]/i.test(row.email)) return true
  if (/@(example|test)\./i.test(row.email)) return true
  return false
}

async function fetchActiveSubscribers() {
  const url = `${SUPABASE_PROJECT_URL}/rest/v1/email_subscribers?unsubscribed_at=is.null&select=email,lead_magnet,source`
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Supabase ${res.status}: ${body}`)
  }
  const rows = await res.json()
  const filtered = rows.filter((r) => !isTestRow(r))
  const excluded = rows.length - filtered.length
  if (excluded > 0) {
    log(`Excluded ${excluded} test/debug rows from backfill`)
  }
  return filtered
}

/**
 * Invoke scheduleDripEmails for one subscriber through a tsx child process.
 * Keeps the TS source of truth as the single scheduling implementation.
 */
function scheduleForSubscriber(email, leadMagnet) {
  const helperSrc = `import { scheduleDripEmails } from '${path
    .join(PROJECT_ROOT, 'src/lib/email/schedule-drip')
    .replace(/\\/g, '/')}'
const [email, leadMagnet] = JSON.parse(process.argv[2])
scheduleDripEmails(email, leadMagnet).then((r) => {
  process.stdout.write(JSON.stringify(r))
}).catch((err) => {
  process.stdout.write(JSON.stringify({ scheduled: 0, errors: [{ day: 0, message: err instanceof Error ? err.message : String(err) }] }))
})
`
  const helperPath = path.join(LOGS_DIR, `.backfill-helper.mts`)
  fs.writeFileSync(helperPath, helperSrc, 'utf8')
  const out = execFileSync(
    'npx',
    ['--yes', 'tsx', helperPath, JSON.stringify([email, leadMagnet])],
    {
      cwd: PROJECT_ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'inherit'],
      env: { ...process.env },
      maxBuffer: 10 * 1024 * 1024,
    }
  )
  return JSON.parse(out)
}

async function main() {
  log(
    `Backfill start. mode=${EXECUTE ? 'EXECUTE' : 'DRY-RUN'}, auth=${USING_SERVICE_ROLE ? 'service_role' : 'anon'}`
  )
  if (!USING_SERVICE_ROLE) {
    log(
      'Warning: using anon key. RLS likely blocks SELECT on email_subscribers. Set SUPABASE_SERVICE_ROLE_KEY in env to read the real subscriber list.'
    )
  }

  let subs
  try {
    subs = await fetchActiveSubscribers()
  } catch (err) {
    log(`Failed to fetch subscribers: ${err instanceof Error ? err.message : String(err)}`)
    process.exit(1)
  }

  log(`Fetched ${subs.length} active subscribers`)

  if (!EXECUTE) {
    const sample = subs.slice(0, 3).map((s) => s.email)
    const out = {
      subscriberCount: subs.length,
      totalEmailsWouldSend: subs.length * 4,
      sampleEmails: sample,
    }
    log(`Dry run: ${JSON.stringify(out)}`)
    console.log('\n=== DRY RUN RESULT ===')
    console.log(JSON.stringify(out, null, 2))
    console.log('\nRun with --execute to actually schedule sends.')
    logStream.end()
    return
  }

  let totalScheduled = 0
  const allErrors = []

  for (const sub of subs) {
    try {
      const result = scheduleForSubscriber(sub.email, sub.lead_magnet ?? null)
      totalScheduled += result.scheduled
      if (result.errors && result.errors.length) {
        for (const e of result.errors) {
          allErrors.push({ email: sub.email, day: e.day, message: e.message })
        }
      }
      log(
        `  ${sub.email}: scheduled=${result.scheduled}, errors=${(result.errors || []).length}`
      )
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      log(`  ${sub.email}: FAILED. ${msg}`)
      allErrors.push({ email: sub.email, day: 0, message: msg })
    }
  }

  const summary = { scheduled: totalScheduled, errors: allErrors }
  log(`Backfill complete: ${JSON.stringify(summary)}`)
  console.log('\n=== EXECUTE RESULT ===')
  console.log(JSON.stringify(summary, null, 2))
  logStream.end()
}

main().catch((err) => {
  log(`Fatal: ${err instanceof Error ? err.message : String(err)}`)
  logStream.end()
  process.exit(1)
})
