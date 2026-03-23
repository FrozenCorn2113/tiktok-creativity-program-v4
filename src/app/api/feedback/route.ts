// Article feedback endpoint — "Was this helpful?" widget
// No external service — logs to console in dev, silently no-ops in prod
import { NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
  url: z.string().url().max(500),
  title: z.string().max(500),
  vote: z.enum(['up', 'down']),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  // Future: write to Supabase or Airtable for feedback tracking
  // For now: accept and acknowledge
  return NextResponse.json({ success: true })
}
