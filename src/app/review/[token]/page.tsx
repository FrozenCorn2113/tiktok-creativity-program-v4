/**
 * Review dashboard route — TCP autonomous ops Phase A.
 *
 * Server component. Verifies the HMAC token, fetches the review_requests row
 * via Supabase REST, then renders TCP-branded review UI with a client island
 * for the GO/REVISE buttons + comment box.
 *
 * Invalid token or missing row -> notFound().
 */
import { notFound } from 'next/navigation'
import { verifyToken } from '@/lib/review/token'
import { ReviewActions } from './ReviewActions'

export const dynamic = 'force-dynamic'

// Mirrors src/app/api/unsubscribe/route.ts hardcoded credentials.
const SUPABASE_PROJECT_URL = 'https://tpihpenmsiojzznpcmcr.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwaWhwZW5tc2lvanp6bnBjbWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMTgxODYsImV4cCI6MjA4OTg5NDE4Nn0.ggN0_rv01pKqU-SS-KWW4gs0iKpgHG1f4N3E6Q2A8aw'

interface ReviewRow {
  id: string
  item_type: string
  item_label: string
  preview_urls: string[] | null
  context_md: string | null
  created_by: string | null
  created_at: string
  decision: 'go' | 'revise' | null
  decision_comment: string | null
  decided_at: string | null
}

async function fetchRow(rowId: string): Promise<ReviewRow | null> {
  const url = `${SUPABASE_PROJECT_URL}/rest/v1/review_requests?id=eq.${encodeURIComponent(rowId)}&select=*`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    })
    if (!res.ok) {
      console.error(`[review/page] Supabase ${res.status}:`, await res.text())
      return null
    }
    const rows = (await res.json()) as ReviewRow[]
    if (!Array.isArray(rows) || rows.length === 0) return null
    return rows[0]
  } catch (err) {
    console.error('[review/page] Fetch error:', err)
    return null
  }
}

function formatCreatedAt(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/Los_Angeles',
      timeZoneName: 'short',
    })
  } catch {
    return iso
  }
}

export default async function ReviewPage({
  params,
}: {
  params: { token: string }
}) {
  const verified = verifyToken(params.token)
  if (!verified) notFound()

  const row = await fetchRow(verified.rowId)
  if (!row) notFound()

  const previews = (row.preview_urls ?? []).filter((u) => typeof u === 'string' && u.length > 0)
  const alreadyDecided = row.decision === 'go' || row.decision === 'revise'

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFF7ED',
        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        WebkitFontSmoothing: 'antialiased',
        color: '#0B0F1A',
        padding: '40px 16px 80px',
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap"
      />

      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
        }}
      >
        {/* Wordmark pill */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span
            style={{
              display: 'inline-block',
              backgroundColor: '#FFF1E6',
              borderRadius: 10,
              padding: '10px 20px',
              fontSize: 17,
              fontWeight: 800,
              color: '#0B0F1A',
              letterSpacing: '-0.3px',
            }}
          >
            TikTok Creativity Program
          </span>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #EADFD3',
            borderRadius: 16,
            padding: '36px 36px 32px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          }}
        >
          {/* Accent bar */}
          <div
            style={{
              height: 3,
              backgroundColor: '#F4A261',
              borderRadius: 2,
              marginBottom: 24,
            }}
          />

          {/* Subhead */}
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#475467',
              marginBottom: 10,
            }}
          >
            {row.item_type} · {formatCreatedAt(row.created_at)}
          </div>

          {/* Label */}
          <h1
            style={{
              fontSize: 30,
              lineHeight: 1.2,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: '0 0 20px 0',
              color: '#0B0F1A',
            }}
          >
            {row.item_label}
          </h1>

          {/* Preview link — only for item types with a dedicated renderer */}
          {(row.item_type === 'email-draft' ||
            row.item_type === 'copy-draft' ||
            row.item_type === 'page-draft') ? (
            <div style={{ margin: '0 0 20px 0' }}>
              <a
                href={`/preview/${row.id}?t=${encodeURIComponent(params.token)}`}
                style={{
                  display: 'inline-block',
                  padding: '10px 16px',
                  borderRadius: 999,
                  border: '1px solid #EADFD3',
                  backgroundColor: '#FFF1E6',
                  color: '#0B0F1A',
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Open full preview →
              </a>
            </div>
          ) : null}

          {/* Optional context */}
          {row.context_md ? (
            <div
              style={{
                backgroundColor: '#FFF1E6',
                borderRadius: 10,
                padding: '16px 20px',
                fontSize: 14,
                lineHeight: 1.7,
                color: '#111827',
                margin: '0 0 24px 0',
                whiteSpace: 'pre-wrap',
              }}
            >
              {row.context_md}
            </div>
          ) : null}

          {/* Previews */}
          {previews.length > 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                marginBottom: 28,
              }}
            >
              {previews.map((url, i) => {
                const lower = url.toLowerCase()
                const isImage =
                  lower.endsWith('.png') ||
                  lower.endsWith('.jpg') ||
                  lower.endsWith('.jpeg') ||
                  lower.endsWith('.webp') ||
                  lower.endsWith('.gif') ||
                  lower.endsWith('.svg')
                if (isImage) {
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={url}
                      alt={`Preview ${i + 1}`}
                      style={{
                        display: 'block',
                        width: '100%',
                        height: 'auto',
                        borderRadius: 10,
                        border: '1px solid #EADFD3',
                      }}
                    />
                  )
                }
                return (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      padding: '14px 18px',
                      backgroundColor: '#FFF1E6',
                      borderRadius: 10,
                      color: '#0B0F1A',
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: 'none',
                      border: '1px solid #EADFD3',
                      wordBreak: 'break-all',
                    }}
                  >
                    {url}
                  </a>
                )
              })}
            </div>
          ) : null}

          {/* Decision area */}
          {alreadyDecided ? (
            <DecisionBanner
              decision={row.decision as 'go' | 'revise'}
              comment={row.decision_comment}
              decidedAt={row.decided_at}
            />
          ) : (
            <ReviewActions token={params.token} />
          )}
        </div>

        {/* Footer */}
        <p
          style={{
            textAlign: 'center',
            fontSize: 12,
            color: '#9CA3AF',
            marginTop: 24,
          }}
        >
          Review link expires 14 days after issue. One click = decision logged.
        </p>
      </div>
    </div>
  )
}

function DecisionBanner({
  decision,
  comment,
  decidedAt,
}: {
  decision: 'go' | 'revise'
  comment: string | null
  decidedAt: string | null
}) {
  const isGo = decision === 'go'
  const bg = isGo ? '#E8F5E9' : '#FFF1E6'
  const border = isGo ? '#A5D6A7' : '#F4A261'
  const label = isGo ? 'GO — Approved' : 'REVISE — Sent back'
  const decidedStr = decidedAt ? formatCreatedAt(decidedAt) : null

  return (
    <div
      style={{
        backgroundColor: bg,
        border: `1px solid ${border}`,
        borderRadius: 10,
        padding: '18px 20px',
        marginTop: 8,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          color: '#0B0F1A',
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {decidedStr ? (
        <div style={{ fontSize: 12, color: '#475467', marginBottom: comment ? 10 : 0 }}>
          Decided {decidedStr}
        </div>
      ) : null}
      {comment ? (
        <div
          style={{
            fontSize: 14,
            color: '#111827',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
          }}
        >
          {comment}
        </div>
      ) : null}
    </div>
  )
}
