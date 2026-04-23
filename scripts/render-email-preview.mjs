#!/usr/bin/env node
/**
 * Render TCP email templates to standalone HTML for visual preview.
 *
 * Writes HTML files to tmp/email-previews/<type>.html so you can open them
 * in Gmail, Apple Mail, Outlook web, or a browser for visual verification.
 *
 * Usage:
 *   node scripts/render-email-preview.mjs welcome-rpm
 *   node scripts/render-email-preview.mjs welcome-eligibility
 *   node scripts/render-email-preview.mjs welcome-default
 *   node scripts/render-email-preview.mjs drip-day2
 *   node scripts/render-email-preview.mjs drip-day5
 *   node scripts/render-email-preview.mjs drip-day8
 *   node scripts/render-email-preview.mjs drip-day12
 *   node scripts/render-email-preview.mjs all
 *
 * The script shells out to `npx tsx` so it can import the TypeScript
 * source directly without a build step.
 */

import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const SCRIPT_DIR = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, '..')
const OUT_DIR = path.join(PROJECT_ROOT, 'tmp', 'email-previews')

const WELCOME_VARIANTS = {
  'welcome-rpm': {
    email: 'preview-rpm@example.com',
    leadMagnet: 'rpm-cheat-sheet',
  },
  'welcome-eligibility': {
    email: 'preview-eligibility@example.com',
    leadMagnet: 'eligibility-checklist',
  },
  'welcome-default': {
    email: 'preview-default@example.com',
    leadMagnet: null,
  },
}

const DRIP_VARIANTS = {
  'drip-day2': { email: 'preview-drip@example.com', day: 2 },
  'drip-day5': { email: 'preview-drip@example.com', day: 5 },
  'drip-day8': { email: 'preview-drip@example.com', day: 8 },
  'drip-day12': { email: 'preview-drip@example.com', day: 12 },
}

const ALL_KEYS = [...Object.keys(WELCOME_VARIANTS), ...Object.keys(DRIP_VARIANTS)]

function usage() {
  console.error(
    'Usage: node scripts/render-email-preview.mjs <welcome-rpm|welcome-eligibility|welcome-default|drip-day2|drip-day5|drip-day8|drip-day12|all>'
  )
  process.exit(1)
}

const arg = process.argv[2]
if (!arg) usage()

const targets = arg === 'all' ? ALL_KEYS : [arg]
for (const t of targets) {
  if (!WELCOME_VARIANTS[t] && !DRIP_VARIANTS[t]) {
    console.error(`Unknown variant: ${t}`)
    usage()
  }
}

fs.mkdirSync(OUT_DIR, { recursive: true })

// tsx-executable helper that imports the relevant template and prints HTML to stdout.
const HELPER_PATH = path.join(OUT_DIR, '.render-helper.mts')
const WELCOME_PATH = path.join(PROJECT_ROOT, 'src/lib/email/welcome-template').replace(/\\/g, '/')
const DRIP_PATH = path.join(PROJECT_ROOT, 'src/lib/email/drip-templates').replace(/\\/g, '/')
const HELPER_SRC = `import { buildWelcomeEmail } from '${WELCOME_PATH}'
import { buildDripEmail } from '${DRIP_PATH}'
const mode = process.argv[2]
const opts = JSON.parse(process.argv[3])
if (mode === 'welcome') {
  const { html } = buildWelcomeEmail(opts)
  process.stdout.write(html)
} else if (mode === 'drip') {
  const { html } = buildDripEmail(opts)
  process.stdout.write(html)
} else {
  console.error('Unknown mode: ' + mode)
  process.exit(1)
}
`
fs.writeFileSync(HELPER_PATH, HELPER_SRC, 'utf8')

try {
  for (const key of targets) {
    const outPath = path.join(OUT_DIR, `${key}.html`)
    let mode
    let opts
    if (WELCOME_VARIANTS[key]) {
      mode = 'welcome'
      opts = WELCOME_VARIANTS[key]
    } else {
      mode = 'drip'
      opts = DRIP_VARIANTS[key]
    }
    const html = execFileSync(
      'npx',
      ['--yes', 'tsx', HELPER_PATH, mode, JSON.stringify(opts)],
      {
        cwd: PROJECT_ROOT,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'inherit'],
        maxBuffer: 10 * 1024 * 1024,
      }
    )
    fs.writeFileSync(outPath, html, 'utf8')
    console.log(`wrote ${path.relative(PROJECT_ROOT, outPath)} (${html.length} bytes)`)
  }
} finally {
  // Leave the helper in place for reproducibility; it's tiny and gitignored (tmp/).
}

console.log('\nDone. Open any file in tmp/email-previews/ to preview.')
