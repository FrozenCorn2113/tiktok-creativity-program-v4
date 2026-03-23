import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock next/server before importing the route
vi.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      body,
      status: init?.status ?? 200,
    }),
  },
}))

// Mock fetch globally
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

// Helper to build a mock Request (cast via unknown to avoid TS strict overlap errors)
function makeRequest(body: unknown) {
  return { json: async () => body } as unknown as Request
}

describe('POST /api/email', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.CONVERTKIT_API_KEY = 'test-key'
    process.env.CONVERTKIT_FORM_ID = 'test-form'
  })

  it('returns 400 for missing email', async () => {
    const { POST } = await import('@/app/api/email/route')
    const res = await POST(makeRequest({}))
    expect(res.status).toBe(400)
  })

  it('returns 400 for invalid email format', async () => {
    const { POST } = await import('@/app/api/email/route')
    const res = await POST(makeRequest({ email: 'not-an-email' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 for malformed JSON body', async () => {
    const { POST } = await import('@/app/api/email/route')
    const badReq = { json: async () => { throw new Error('bad json') } } as unknown as Request
    const res = await POST(badReq)
    expect(res.status).toBe(400)
  })

  it('returns 500 when env vars are missing', async () => {
    delete process.env.CONVERTKIT_API_KEY
    const { POST } = await import('@/app/api/email/route')
    const res = await POST(makeRequest({ email: 'user@example.com' }))
    expect(res.status).toBe(500)
    expect((res.body as unknown as { error: string }).error).toMatch(/not configured/i)
  })

  it('calls ConvertKit and returns success on valid email', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true })
    const { POST } = await import('@/app/api/email/route')
    const res = await POST(makeRequest({ email: 'creator@example.com', source: 'inline' }))
    expect(mockFetch).toHaveBeenCalledOnce()
    expect(res.status).toBe(200)
    expect((res.body as unknown as { success: boolean }).success).toBe(true)
  })

  it('returns 500 when ConvertKit responds with an error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false })
    const { POST } = await import('@/app/api/email/route')
    const res = await POST(makeRequest({ email: 'creator@example.com' }))
    expect(res.status).toBe(500)
  })
})
