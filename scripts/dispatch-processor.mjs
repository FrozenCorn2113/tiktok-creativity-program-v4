#!/usr/bin/env node
/**
 * TCP Dispatch Processor
 * ----------------------
 * Polls `review_requests` rows where decision='go', acted_on_at IS NULL,
 * and decision_comment starts with "[DISPATCH:<agent>]". For each match,
 * invokes the named agent (devan/scribe/christopher) with the action_brief
 * parsed from the context_md sentinel, then stamps acted_on_at.
 *
 * Runs every 10 minutes via cron (add: `*\/10 * * * * ...dispatch-processor.sh`).
 * Keeps Brett's GO-click → agent action inside a 10-minute window, not 10 days.
 *
 * Safe to run repeatedly; rows with acted_on_at set are skipped.
 *
 * Usage:
 *   node scripts/dispatch-processor.mjs
 *   DRY_RUN=1 node scripts/dispatch-processor.mjs
 */

import { spawn } from 'child_process'

const DRY_RUN = process.env.DRY_RUN === '1'
const SUPABASE_PROJECT_URL =
  process.env.SUPABASE_URL || 'https://tpihpenmsiojzznpcmcr.supabase.co'
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_KEY) {
  console.error('[dispatch-processor] No Supabase key in env.')
  process.exit(1)
}

function parseDispatchSentinel(contextMd) {
  if (!contextMd) return null
  const m = contextMd.match(/<!--\s*TCP_DISPATCH:(\{[\s\S]*?\})\s*-->/)
  if (!m) return null
  try {
    return JSON.parse(m[1])
  } catch {
    return null
  }
}

function parseDispatchTag(decisionComment) {
  if (!decisionComment) return null
  const m = decisionComment.match(/^\[DISPATCH:(devan|scribe|christopher)\]/)
  if (!m) return null
  return { agent: m[1], brettComment: decisionComment.slice(m[0].length).trim() }
}

async function fetchPending() {
  const url = `${SUPABASE_PROJECT_URL}/rest/v1/review_requests?decision=eq.go&acted_on_at=is.null&select=id,item_label,context_md,decision_comment`
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  })
  if (!res.ok) {
    throw new Error(`Supabase fetch ${res.status}: ${await res.text()}`)
  }
  return res.json()
}

async function stampActed(id) {
  const url = `${SUPABASE_PROJECT_URL}/rest/v1/review_requests?id=eq.${id}`
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ acted_on_at: new Date().toISOString() }),
  })
  if (!res.ok) {
    throw new Error(`stamp acted_on_at failed ${res.status}`)
  }
}

function invokeAgent(agentName, brief) {
  // Fire-and-forget: kick off a `claude --print` subprocess pointed at the agent's SOP.
  // The downstream agent writes its own output to Vault/ and/or the repo; we just launch it.
  return new Promise((resolve) => {
    const prompt = `You are ${agentName}. Brett approved the following action via TCP review dashboard. Execute it now.\n\n${brief}\n\nLog your work to Vault/Daily/$(date +%Y-%m-%d).md when done.`
    if (DRY_RUN) {
      console.log(`[dispatch-processor] DRY_RUN: would invoke ${agentName} with brief (${brief.length} chars)`)
      resolve()
      return
    }
    const proc = spawn('claude', ['--print', '--model', agentName === 'devan' ? 'opus' : 'sonnet'], {
      stdio: ['pipe', 'pipe', 'pipe'],
      detached: true,
    })
    proc.stdin.write(prompt)
    proc.stdin.end()
    proc.on('error', (err) => {
      console.warn(`[dispatch-processor] ${agentName} launch error:`, err.message)
    })
    proc.unref()
    resolve()
  })
}

async function main() {
  const rows = await fetchPending()
  if (!Array.isArray(rows) || rows.length === 0) {
    console.log('[dispatch-processor] no pending dispatches.')
    return
  }
  console.log(`[dispatch-processor] ${rows.length} pending dispatch rows.`)
  for (const row of rows) {
    const tag = parseDispatchTag(row.decision_comment)
    if (!tag) {
      console.log(`[dispatch-processor] row ${row.id} has no DISPATCH tag; skipping.`)
      continue
    }
    const sentinel = parseDispatchSentinel(row.context_md)
    if (!sentinel) {
      console.warn(`[dispatch-processor] row ${row.id} has DISPATCH tag but no sentinel; skipping.`)
      continue
    }
    const brief = `Item: ${row.item_label}\n\nBrief:\n${sentinel.action_brief}\n\nBrett's note: ${tag.brettComment || '(none)'}`
    console.log(`[dispatch-processor] dispatching to ${sentinel.agent} for row ${row.id}`)
    try {
      await invokeAgent(sentinel.agent, brief)
      if (!DRY_RUN) {
        await stampActed(row.id)
      } else {
        console.log(`[dispatch-processor] DRY_RUN: would stamp acted_on_at on ${row.id}`)
      }
    } catch (err) {
      console.error(`[dispatch-processor] dispatch failed for ${row.id}: ${err.message}`)
    }
  }
}

main().catch((err) => {
  console.error('[dispatch-processor] fatal:', err)
  process.exit(1)
})
