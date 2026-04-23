// Review decision PATCH endpoint — TCP autonomous ops Phase A.
// Verifies HMAC token, validates body via Zod, then PATCHes the row in Supabase.
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

  return NextResponse.json({ success: true })
}
