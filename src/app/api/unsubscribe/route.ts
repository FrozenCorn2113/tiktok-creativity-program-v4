// Unsubscribe API — marks a subscriber as unsubscribed in Supabase
// CAN-SPAM: always returns success to the user even if the DB update fails,
// so the unsubscribe action is never blocked from the user's perspective.
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Same hardcoded Supabase credentials as newsletter route
const SUPABASE_PROJECT_URL = 'https://tpihpenmsiojzznpcmcr.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwaWhwZW5tc2lvanp6bnBjbWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMTgxODYsImV4cCI6MjA4OTg5NDE4Nn0.ggN0_rv01pKqU-SS-KWW4gs0iKpgHG1f4N3E6Q2A8aw'

const bodySchema = z.object({
  email: z.string().email('Invalid email address').max(254),
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
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 }
    )
  }

  const { email } = parsed.data
  const restUrl = `${SUPABASE_PROJECT_URL}/rest/v1`

  try {
    // Update the subscriber record to set unsubscribed_at timestamp
    const res = await fetch(
      `${restUrl}/email_subscribers?email=eq.${encodeURIComponent(email)}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ unsubscribed_at: new Date().toISOString() }),
      }
    )

    if (!res.ok) {
      const errorBody = await res.text()
      console.error(`[api/unsubscribe] Supabase error (${res.status}):`, errorBody)
      // Still return success — CAN-SPAM requires the user always sees confirmation
    }
  } catch (err) {
    console.error('[api/unsubscribe] Fetch error:', err)
    // Still return success — see above
  }

  return NextResponse.json({ success: true })
}
