#!/usr/bin/env node
/**
 * TCP Bernard Weekly Decision
 * ---------------------------
 * Runs every Friday 9am PT. Reads:
 *   - This week's snapshot (analytics/weekly/LATEST.md)
 *   - Previous 4 weeks' snapshots (for replication gate evaluation)
 *   - HYPOTHESES.md
 *   - PROJECT.md (context)
 *
 * Invokes Bernard agent via `claude --print --model opus` with a structured prompt.
 * Bernard returns JSON: { hypotheses_update: [...], proposals: [{item_type, item_label, context_md, agent, action}] }
 *
 * For each proposal → INSERT into review_requests (same HMAC token pattern).
 * When Brett clicks GO, `/api/review/[token]` PATCH dispatches the action immediately
 * (Devan/Scribe/Christopher), not queued to Monday's content cron.
 *
 * Usage:
 *   node scripts/bernard-weekly-decision.mjs
 *   DRY_RUN=1 node scripts/bernard-weekly-decision.mjs
 */

import fs from 'fs'
import path from 'path'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const weeklyDir = path.join(repoRoot, 'analytics', 'weekly')
const hypothesesPath = path.join(repoRoot, 'HYPOTHESES.md')
const projectMdPath = path.join(repoRoot, 'PROJECT.md')

const DRY_RUN = process.env.DRY_RUN === '1'
const SUPABASE_PROJECT_URL =
  process.env.SUPABASE_URL || 'https://tpihpenmsiojzznpcmcr.supabase.co'
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwaWhwZW5tc2lvanp6bnBjbWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMTgxODYsImV4cCI6MjA4OTg5NDE4Nn0.ggN0_rv01pKqU-SS-KWW4gs0iKpgHG1f4N3E6Q2A8aw'

// ---------- gather inputs ----------
function listSnapshots() {
  if (!fs.existsSync(weeklyDir)) return []
  return fs
    .readdirSync(weeklyDir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
    .sort()
    .reverse()
}

function readSnapshots(n = 5) {
  const files = listSnapshots().slice(0, n)
  return files.map((f) => ({
    file: f,
    content: fs.readFileSync(path.join(weeklyDir, f), 'utf8'),
  }))
}

function readMaybe(p) {
  try {
    return fs.readFileSync(p, 'utf8')
  } catch {
    return `(${p} not found)`
  }
}

// ---------- prompt builder ----------
function buildPrompt({ snapshots, hypotheses, projectMd }) {
  const snapshotBlock = snapshots
    .map((s) => `### ${s.file}\n\n${s.content}`)
    .join('\n\n---\n\n')

  const projectExcerpt = projectMd.slice(0, 6000) // trim to keep prompt bounded

  return `You are Bernard, TCP's strategic operator. Today is Friday; you run once a week at 9am PT.

Your job this cycle:
1. Read the 5 most recent weekly snapshots (this week first).
2. Update each hypothesis in HYPOTHESES.md:
   - Did the measured metric move? New value.
   - Did confidence change? Bump or decay it (0-1 scale).
   - Did it hold directionally this week? Increment \`consecutive_weeks_holding\`, else reset to 0.
3. For each hypothesis that clears the REPLICATION GATE (confidence ≥1.0 OR held 3 consecutive weeks with n≥30 on the measured step), emit a proposal. The proposal must be REVERSIBLE within one deploy.
4. For each hypothesis that hasn't moved in 8 weeks, mark it for retirement.

Your output MUST be a single JSON object, no prose before or after, wrapped in \`\`\`json ... \`\`\` fence. Schema:

\`\`\`json
{
  "summary": "one-paragraph plain-English read on the week",
  "hypotheses_update": [
    {
      "id": "H1",
      "new_value": "…",
      "new_confidence": 0.6,
      "new_weeks_holding": 2,
      "note": "…",
      "retire": false
    }
  ],
  "proposals": [
    {
      "hypothesis_id": "H1",
      "item_type": "hypothesis action",
      "item_label": "H1: A/B /start-here hero copy (3 variants)",
      "context_md": "Full evidence block: why this fires now, what reversible action ships on GO, rollback plan.",
      "agent": "devan",
      "action_brief": "Concrete one-paragraph brief the agent will act on same-day if Brett clicks GO."
    }
  ],
  "meta_signals": {
    "channel_entropy": 1.0,
    "baseline_drift_notes": "…"
  }
}
\`\`\`

Constraints:
- \`agent\` must be one of: "devan" (code/copy), "scribe" (newsletter/email copy), "christopher" (research).
- \`item_type\` is a short label like "hypothesis action", "copy test", "content velocity bump".
- \`context_md\` goes into the review_requests row verbatim; write it so Brett can decide GO/REVISE in <60 seconds.
- If no hypothesis clears the gate, emit zero proposals. Prime mode is the default — do not over-propose.
- Do not propose spend, new SaaS, new domains, or anything on the CLAUDE.md whitelist.

## INPUTS

### HYPOTHESES.md

${hypotheses}

### Weekly snapshots (newest first)

${snapshotBlock}

### PROJECT.md (first 6KB for context)

${projectExcerpt}

Now produce the JSON.`
}

// ---------- invoke Claude ----------
function invokeBernard(prompt) {
  return new Promise((resolve, reject) => {
    const proc = spawn('claude', ['--print', '--model', 'opus'], {
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    let out = ''
    let err = ''
    proc.stdout.on('data', (d) => {
      out += d.toString()
    })
    proc.stderr.on('data', (d) => {
      err += d.toString()
    })
    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`claude exited ${code}: ${err.slice(0, 400)}`))
        return
      }
      resolve(out)
    })
    proc.stdin.write(prompt)
    proc.stdin.end()
  })
}

function extractJson(text) {
  const fence = text.match(/```json\s*([\s\S]*?)```/)
  const raw = fence ? fence[1] : text
  try {
    return JSON.parse(raw)
  } catch (err) {
    throw new Error(`Bernard returned invalid JSON: ${err.message}\n\nRaw (first 800 chars):\n${raw.slice(0, 800)}`)
  }
}

// ---------- insert review_requests ----------
async function insertReviewRequest(proposal) {
  const body = {
    item_type: proposal.item_type,
    item_label: proposal.item_label,
    context_md: proposal.context_md,
    preview_urls: [],
    created_by: 'bernard',
    // Extend schema use: stash dispatch info in context_md tail so PATCH can parse it.
    // (Kept structured via sentinel below so we don't need a migration.)
  }
  // Sentinel-encoded dispatch metadata so /api/review/[token] can parse on GO.
  const sentinel = `\n\n<!-- TCP_DISPATCH:${JSON.stringify({
    agent: proposal.agent,
    action_brief: proposal.action_brief,
    hypothesis_id: proposal.hypothesis_id,
  })} -->`
  body.context_md = (body.context_md || '') + sentinel

  if (DRY_RUN) {
    console.log(`[bernard-weekly-decision] DRY_RUN: would INSERT review_request:`, {
      item_type: body.item_type,
      item_label: body.item_label,
      agent: proposal.agent,
    })
    return { id: `dry-run-${Math.random().toString(36).slice(2, 8)}` }
  }

  const res = await fetch(`${SUPABASE_PROJECT_URL}/rest/v1/review_requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`Supabase insert ${res.status}: ${t.slice(0, 300)}`)
  }
  const rows = await res.json()
  return rows[0]
}

// ---------- main ----------
async function main() {
  const snapshots = readSnapshots(5)
  if (!snapshots.length) {
    console.error('[bernard-weekly-decision] no snapshots found; run weekly-snapshot.mjs first')
    process.exit(1)
  }
  const hypotheses = readMaybe(hypothesesPath)
  const projectMd = readMaybe(projectMdPath)

  const prompt = buildPrompt({ snapshots, hypotheses, projectMd })

  if (DRY_RUN) {
    console.log(
      `[bernard-weekly-decision] DRY_RUN: prompt built (${prompt.length} chars), ${snapshots.length} snapshots, hypotheses=${hypotheses.length} chars`
    )
    // In DRY_RUN we skip the Claude call. Simulate with an empty proposals array.
    const fakeDecision = {
      summary: '(dry-run) Bernard call skipped. Structure validated.',
      hypotheses_update: [],
      proposals: [],
      meta_signals: { channel_entropy: 1.0, baseline_drift_notes: 'dry-run' },
    }
    console.log('[bernard-weekly-decision] DRY_RUN decision:', JSON.stringify(fakeDecision, null, 2))
    // Exercise the review_requests write path WITHOUT actually inserting.
    const stub = await insertReviewRequest({
      hypothesis_id: 'DRY',
      item_type: 'hypothesis action',
      item_label: '[DRY_RUN] Verify bernard decision loop end-to-end',
      context_md: 'This is a dry-run insertion to validate the Bernard decision cron. Not persisted.',
      agent: 'devan',
      action_brief: 'No-op. Dry-run test row.',
    })
    console.log(`[bernard-weekly-decision] DRY_RUN would-insert stub:`, stub)
    return
  }

  console.log(`[bernard-weekly-decision] invoking Bernard (claude --print opus)...`)
  const raw = await invokeBernard(prompt)
  const decision = extractJson(raw)

  // Log the decision memo to a dated file for audit
  const memoDir = path.join(repoRoot, 'analytics', 'decisions')
  fs.mkdirSync(memoDir, { recursive: true })
  const memoPath = path.join(memoDir, `${new Date().toISOString().slice(0, 10)}.json`)
  fs.writeFileSync(memoPath, JSON.stringify(decision, null, 2), 'utf8')
  console.log(`[bernard-weekly-decision] wrote decision memo ${memoPath}`)

  // Insert each proposal into review_requests
  const proposals = Array.isArray(decision.proposals) ? decision.proposals : []
  console.log(`[bernard-weekly-decision] ${proposals.length} proposals to insert`)
  for (const p of proposals) {
    try {
      const row = await insertReviewRequest(p)
      console.log(`[bernard-weekly-decision] inserted review_request id=${row.id} (${p.item_label})`)
    } catch (err) {
      console.error(`[bernard-weekly-decision] insert failed for "${p.item_label}": ${err.message}`)
    }
  }

  // TODO Phase C+: write hypothesis updates back to HYPOTHESES.md. For now, Bernard's memo
  // is the audit trail and the next weekly run ingests it via the snapshot.

  console.log('[bernard-weekly-decision] done.')
}

main().catch((err) => {
  console.error('[bernard-weekly-decision] fatal:', err)
  process.exit(1)
})
