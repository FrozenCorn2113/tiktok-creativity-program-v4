// Legacy endpoint — redirects to /api/newsletter for backward compatibility
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // Forward to the canonical newsletter endpoint
  const url = new URL('/api/newsletter', request.url)

  const body = await request.text()

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
