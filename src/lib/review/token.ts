/**
 * HMAC token signing + verification for the review dashboard.
 *
 * Format: base64url( `${rowId}.${expiresAtMs}.${hmac32hex}` )
 *
 * - 14-day TTL.
 * - Fails closed if REVIEW_TOKEN_SECRET is missing.
 * - Uses crypto.timingSafeEqual on equal-length buffers.
 *
 * Token is the only auth — Supabase anon role is allowed SELECT/UPDATE
 * on review_requests but only the row whose id is embedded in a valid
 * (un-expired, signature-matching) token can be read or mutated by the
 * /review/<token> route + /api/review/<token> PATCH endpoint.
 */
import crypto from 'crypto'

const TTL_MS = 14 * 24 * 60 * 60 * 1000 // 14 days
const HMAC_HEX_LEN = 64 // sha256 hex

function getSecret(): string {
  const secret = process.env.REVIEW_TOKEN_SECRET
  if (!secret || secret.length < 16) {
    throw new Error('REVIEW_TOKEN_SECRET is missing or too short (min 16 chars)')
  }
  return secret
}

function hmacHex(payload: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex')
}

function base64UrlEncode(s: string): string {
  return Buffer.from(s, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function base64UrlDecode(s: string): string | null {
  try {
    const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4))
    const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + pad
    return Buffer.from(b64, 'base64').toString('utf8')
  } catch {
    return null
  }
}

/**
 * Sign a token for the given review_requests row id.
 * Throws if REVIEW_TOKEN_SECRET is missing.
 */
export function signToken(rowId: string): string {
  const secret = getSecret()
  const expiresAt = Date.now() + TTL_MS
  const payload = `${rowId}.${expiresAt}`
  const sig = hmacHex(payload, secret)
  return base64UrlEncode(`${payload}.${sig}`)
}

export interface VerifiedToken {
  rowId: string
}

/**
 * Verify a token. Returns { rowId } on success, null on any failure.
 * Fails closed: invalid format, bad signature, expired, missing secret all return null.
 */
export function verifyToken(token: string): VerifiedToken | null {
  let secret: string
  try {
    secret = getSecret()
  } catch {
    return null
  }

  if (!token || typeof token !== 'string') return null

  const decoded = base64UrlDecode(token)
  if (!decoded) return null

  const parts = decoded.split('.')
  if (parts.length !== 3) return null

  const [rowId, expiresAtStr, sig] = parts
  if (!rowId || !expiresAtStr || !sig) return null
  if (sig.length !== HMAC_HEX_LEN) return null

  const expiresAt = Number.parseInt(expiresAtStr, 10)
  if (!Number.isFinite(expiresAt)) return null
  if (Date.now() > expiresAt) return null

  const expected = hmacHex(`${rowId}.${expiresAtStr}`, secret)
  if (expected.length !== sig.length) return null

  const a = Buffer.from(expected, 'utf8')
  const b = Buffer.from(sig, 'utf8')
  if (a.length !== b.length) return null

  let ok = false
  try {
    ok = crypto.timingSafeEqual(a, b)
  } catch {
    return null
  }

  if (!ok) return null
  return { rowId }
}
