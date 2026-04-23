// Review decision PATCH endpoint — TCP autonomous ops Phase A.
// Verifies HMAC token, validates body via Zod, then PATCHes the row in Supabase.
//
// Extended (2026-04-22): on GO for a Bernard proposal (context_md ends with
// `<!-- TCP_DISPATCH:{json} -->` sentinel), dispatch the downstream agent
// same-day by writing a dispatch record. The actual agent invocation is handled
// by `scripts/dispatch-processor.mjs` which polls pending dispatches — keeps
// the HTTP path fast and side-effect-minimal while the cron closes the loop
// without the 10-day Monday-briefing delay.
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyToken } from '@/lib/review/token'

const SUPABASE_PROJECT_URL = 'https://tpihpenmsiojzznpcmcr.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwaWhwZW5tc2lvanp6bnBjbWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMTgxODYsImV4cCI6MjA4OTg5NDE4Nn0.ggN0_rv01pKqU-SS-KWW4gs0iKpgHG1f4N3E6Q2A8aw'

const bodySchema = z.object({
  decision: z.enum(['go', 'revise']),
  comment: z.string().max(4000).optional(),
})

const dispatchSchema = z.object({
  agent: z.enum(['devan', 'scribe', 'christopher']),
  action_brief: z.string(),
  hypothesis_id: z.string().optional(),
})

function parseDispatch(contextMd: string | null | undefined): z.infer<typeof dispatchSchema> | null {
  if (!contextMd) return null
  const match = contextMd.match(/<!--\s*TCP_DISPATCH:(\{[\s\S]*?\})\s*-->/)
  if (!match) return null
  try {
    const parsed = JSON.parse(match[1])
    const result = dispatchSchema.safeParse(parsed)
    return result.success ? result.data : null
  } catch {
    return null
  }
}

async function writeDispatchRecord(
  rowId: string,
  dispatch: z.infer<typeof dispatchSchema>,
  comment: string | undefined
): Promise<void> {
  // Writes a marker row into review_requests.acted_on_at = now() is handled by Bernard's
  // poll loop. Here we just need to ensure the dispatch intent is durable.
  // We encode the dispatch intent into the same row's `decision_comment` prefix so the
  // downstream processor can find it without a schema migration. Format:
  //   "[DISPATCH:devan] <optional Brett comment>"
  const tag = `[DISPATCH:${dispatch.agent}]`
  const composite = comment ? `${tag} ${comment}` : tag
  const restUrl = `${SUPABASE_PROJECT_URL}/rest/v1`
  await fetch(
    `${restUrl}/review_requests?id=eq.${encodeURIComponent(rowId)}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ decision_comment: composite }),
    }
  )
}

export async function PATCH(
  request: Request,
  { params }: { params: { token: string } }
) {
  const verified = verifyToken(params.token)
  if (!verified) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 }
    )
  }

  const { decision, comment } = parsed.data
  const restUrl = `${SUPABASE_PROJECT_URL}/rest/v1`

  // Fetch row first so we can inspect context_md for a Bernard-proposal dispatch sentinel.
  let row: { context_md?: string | null } | null = null
  try {
    const fetchRes = await fetch(
      `${restUrl}/review_requests?id=eq.${encodeURIComponent(verified.rowId)}&select=context_md`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    )
    if (fetchRes.ok) {
      const rows = await fetchRes.json()
      if (Array.isArray(rows) && rows.length > 0) row = rows[0]
    }
  } catch (err) {
    console.warn('[api/review] context_md fetch failed (non-fatal):', err)
  }

  try {
    const res = await fetch(
      `${restUrl}/review_requests?id=eq.${encodeURIComponent(verified.rowId)}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          decision,
          decision_comment: comment ?? null,
          decided_at: new Date().toISOString(),
        }),
      }
    )

    if (!res.ok) {
      const errorBody = await res.text()
      console.error(`[api/review] Supabase error (${res.status}):`, errorBody)
      return NextResponse.json({ error: 'Failed to record decision' }, { status: 500 })
    }
  } catch (err) {
    console.error('[api/review] Fetch error:', err)
    return NextResponse.json({ error: 'Failed to record decision' }, { status: 500 })
  }

  // On GO for a Bernard proposal, stamp dispatch intent onto decision_comment so the
  // poll-based dispatcher picks it up same-day (not batched into Monday's content cron).
  let dispatched: z.infer<typeof dispatchSchema> | null = null
  if (decision === 'go') {
    dispatched = parseDispatch(row?.context_md)
    if (dispatched) {
      try {
        await writeDispatchRecord(verified.rowId, dispatched, comment)
      } catch (err) {
        console.warn('[api/review] dispatch-record write failed (non-fatal):', err)
      }
    }
  }

  return NextResponse.json({ success: true, dispatched: dispatched?.agent ?? null })
}
