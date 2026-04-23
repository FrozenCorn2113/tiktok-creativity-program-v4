#!/usr/bin/env node
/**
 * Retry adding Supabase subscribers to the Resend audience.
 *
 * The signup API calls addContactToAudience fire-and-forget; when Resend
 * errors or rate-limits, the sub stays in Supabase but never lands in the
 * Resend audience. This finds the gap and retries.
 *
 * Default mode: dry-run. Pass --execute to actually add contacts.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, RESEND_AUDIENCE_ID in env.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const SCRIPT_DIR = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, '..')
const LOGS_DIR = path.join(PROJECT_ROOT, 'logs')

const SUPABASE_PROJECT_URL = 'https://tpihpenmsiojzznpcmcr.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID

const args = process.argv.slice(2)
const EXECUTE = args.includes('--execute')

if (!SUPABASE_KEY) {
  console.error('SUPABASE_SERVICE_ROLE_KEY is required')
  process.exit(1)
}
if (!RESEND_API_KEY) {
  console.error('RESEND_API_KEY is required')
  process.exit(1)
}
if (!RESEND_AUDIENCE_ID) {
  console.error('RESEND_AUDIENCE_ID is required')
  process.exit(1)
}

fs.mkdirSync(LOGS_DIR, { recursive: true })
const today = new Date().toISOString().slice(0, 10)
const LOG_PATH = path.join(LOGS_DIR, `sync-audience-retry-${today}.log`)
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

async function fetchSupabaseSubs() {
  const url = `${SUPABASE_PROJECT_URL}/rest/v1/email_subscribers?unsubscribed_at=is.null&select=email,source`
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  })
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`)
  return res.json()
}

async function fetchResendContacts() {
  const url = `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
  })
  if (!res.ok) throw new Error(`Resend list ${res.status}: ${await res.text()}`)
  const body = await res.json()
  return body.data ?? []
}

async function addContact(email) {
  const url = `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    return { ok: false, status: res.status, error: body.message || JSON.stringify(body) }
  }
  return { ok: true, id: body.id }
}

async function main() {
  log(`Sync start. mode=${EXECUTE ? 'EXECUTE' : 'DRY-RUN'}`)

  const [supabaseRows, resendContacts] = await Promise.all([
    fetchSupabaseSubs(),
    fetchResendContacts(),
  ])

  const realSubs = supabaseRows.filter((r) => !isTestRow(r))
  const excluded = supabaseRows.length - realSubs.length
  log(`Supabase: ${supabaseRows.length} active rows, ${excluded} test/debug excluded, ${realSubs.length} real`)
  log(`Resend: ${resendContacts.length} contacts in audience`)

  const resendEmails = new Set(resendContacts.map((c) => c.email.toLowerCase()))
  const missing = realSubs.filter((s) => !resendEmails.has(s.email.toLowerCase()))

  log(`Missing from Resend audience: ${missing.length}`)

  if (!EXECUTE) {
    const preview = missing.slice(0, 5).map((s) => s.email)
    console.log('\n=== DRY RUN RESULT ===')
    console.log(JSON.stringify({
      supabaseReal: realSubs.length,
      resendAudience: resendContacts.length,
      missingCount: missing.length,
      firstFiveMissing: preview,
    }, null, 2))
    console.log('\nRun with --execute to add missing subs to Resend audience.')
    logStream.end()
    return
  }

  let added = 0
  const failures = []
  for (const sub of missing) {
    const result = await addContact(sub.email)
    if (result.ok) {
      added++
      log(`  ADDED ${sub.email} (id=${result.id})`)
    } else {
      failures.push({ email: sub.email, status: result.status, error: result.error })
      log(`  FAIL ${sub.email} status=${result.status} error=${result.error}`)
    }
    // Light throttle: Resend allows 100 req/sec, this is 10/sec, safe
    await new Promise((r) => setTimeout(r, 100))
  }

  console.log('\n=== EXECUTE RESULT ===')
  console.log(JSON.stringify({ attempted: missing.length, added, failures }, null, 2))
  log(`Sync complete: attempted=${missing.length}, added=${added}, failures=${failures.length}`)
  logStream.end()
}

main().catch((err) => {
  log(`Fatal: ${err instanceof Error ? err.message : String(err)}`)
  logStream.end()
  process.exit(1)
})
