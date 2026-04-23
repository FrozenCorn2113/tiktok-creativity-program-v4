/**
 * Preview route — TCP autonomous ops Gap 2.
 *
 * Faithfully renders a draft artifact queued in `review_requests`. Auth is an
 * HMAC token passed as `?t=<token>`, same signing key as /review/[token].
 *
 * Per-item_type rendering:
 *   email-draft  -> iframe srcdoc = preview_html (subscriber-accurate), plus
 *                   subject/from/to header read from context_md frontmatter.
 *   copy-draft   -> markdown prose in the TCP article style (context_md).
 *   page-draft   -> iframe the first preview_urls[0] entry.
 *   anything else (incl. bernard-proposal) -> redirect to /review/[token].
 */
import { notFound, redirect } from 'next/navigation'
import { verifyToken } from '@/lib/review/token'

export const dynamic = 'force-dynamic'

const SUPABASE_PROJECT_URL = 'https://tpihpenmsiojzznpcmcr.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwaWhwZW5tc2lvanp6bnBjbWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMTgxODYsImV4cCI6MjA4OTg5NDE4Nn0.ggN0_rv01pKqU-SS-KWW4gs0iKpgHG1f4N3E6Q2A8aw'

interface ReviewRow {
  id: string
  item_type: string
  item_label: string
  preview_urls: string[] | null
  context_md: string | null
  preview_html: string | null
  created_at: string
}

async function fetchRow(rowId: string): Promise<ReviewRow | null> {
  const url = `${SUPABASE_PROJECT_URL}/rest/v1/review_requests?id=eq.${encodeURIComponent(rowId)}&select=*`
  try {
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const rows = (await res.json()) as ReviewRow[]
    if (!Array.isArray(rows) || rows.length === 0) return null
    return rows[0]
  } catch {
    return null
  }
}

/**
 * Extract simple frontmatter key/value pairs from context_md.
 *   Subject: ...
 *   From: ...
 *   To: ...
 * Returns found pairs + the remaining body (unused for email-draft, body
 * lives in preview_html).
 */
function parseEmailFrontmatter(md: string | null): {
  subject: string | null
  from: string | null
  to: string | null
} {
  if (!md) return { subject: null, from: null, to: null }
  const grab = (key: string): string | null => {
    const re = new RegExp(`^${key}:\\s*(.+?)$`, 'im')
    const m = md.match(re)
    return m ? m[1].trim() : null
  }
  return {
    subject: grab('Subject'),
    from: grab('From'),
    to: grab('To'),
  }
}

function stripDispatchSentinel(md: string): string {
  return md.replace(/<!--\s*TCP_DISPATCH:[\s\S]*?-->/g, '').trim()
}

/** Very small markdown → HTML for copy-draft rendering. Handles paragraphs,
 * headings (#, ##, ###), bold (**), italic (*), inline code (`), and links.
 * Intentionally minimal — Scribe drafts are structured prose, not rich MDX. */
function renderMarkdown(md: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const inline = (s: string) =>
    esc(s)
      .replace(/`([^`]+)`/g, '<code style="background:#FFF1E6;padding:1px 6px;border-radius:4px;font-family:ui-monospace,monospace;font-size:0.92em;">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#F4A261;text-decoration:underline;">$1</a>')

  const blocks = md.split(/\n{2,}/)
  return blocks
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (/^###\s+/.test(trimmed)) {
        return `<h3 style="font-size:20px;font-weight:700;margin:28px 0 12px;color:#0B0F1A;letter-spacing:-0.01em;">${inline(trimmed.replace(/^###\s+/, ''))}</h3>`
      }
      if (/^##\s+/.test(trimmed)) {
        return `<h2 style="font-size:26px;font-weight:700;margin:32px 0 14px;color:#0B0F1A;letter-spacing:-0.015em;">${inline(trimmed.replace(/^##\s+/, ''))}</h2>`
      }
      if (/^#\s+/.test(trimmed)) {
        return `<h1 style="font-size:34px;font-weight:800;margin:0 0 18px;color:#0B0F1A;letter-spacing:-0.02em;">${inline(trimmed.replace(/^#\s+/, ''))}</h1>`
      }
      if (/^[-*]\s+/.test(trimmed)) {
        const items = trimmed
          .split(/\n/)
          .map((l) => l.replace(/^[-*]\s+/, '').trim())
          .filter(Boolean)
          .map((li) => `<li style="margin-bottom:6px;">${inline(li)}</li>`)
          .join('')
        return `<ul style="margin:0 0 18px;padding-left:22px;font-size:16px;line-height:1.7;color:#111827;">${items}</ul>`
      }
      return `<p style="margin:0 0 16px;font-size:16px;line-height:1.75;color:#111827;">${inline(trimmed)}</p>`
    })
    .filter(Boolean)
    .join('\n')
}

function ShellChrome({
  label,
  itemType,
  reviewUrl,
  children,
}: {
  label: string
  itemType: string
  reviewUrl: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFF7ED',
        fontFamily:
          "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        color: '#0B0F1A',
        padding: '32px 16px 80px',
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap"
      />
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span
              style={{
                display: 'inline-block',
                backgroundColor: '#FFF1E6',
                color: '#0B0F1A',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '5px 10px',
                borderRadius: 999,
                marginBottom: 8,
              }}
            >
              {itemType} · preview
            </span>
            <h1
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '-0.01em',
              }}
            >
              {label}
            </h1>
          </div>
          <a
            href={reviewUrl}
            style={{
              display: 'inline-block',
              padding: '10px 18px',
              borderRadius: 999,
              background: 'linear-gradient(135deg,#F4A261 0%,#E8894A 100%)',
              color: '#0B0F1A',
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow:
                'inset 0 -2px 0 rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.12)',
            }}
          >
            Go to review →
          </a>
        </div>
        {children}
      </div>
    </div>
  )
}

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { t?: string }
}) {
  const token = searchParams.t || ''
  const verified = verifyToken(token)
  if (!verified || verified.rowId !== params.id) notFound()

  const row = await fetchRow(params.id)
  if (!row) notFound()

  const reviewUrl = `/review/${encodeURIComponent(token)}`

  // Item types without a dedicated preview -> redirect to review dashboard.
  if (
    row.item_type !== 'email-draft' &&
    row.item_type !== 'copy-draft' &&
    row.item_type !== 'page-draft'
  ) {
    redirect(reviewUrl)
  }

  if (row.item_type === 'email-draft') {
    const fm = parseEmailFrontmatter(row.context_md)
    const html = row.preview_html || ''
    return (
      <ShellChrome label={row.item_label} itemType={row.item_type} reviewUrl={reviewUrl}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #EADFD3',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #EADFD3',
              backgroundColor: '#FFF1E6',
              fontSize: 13,
              lineHeight: 1.7,
              color: '#111827',
            }}
          >
            <div>
              <strong style={{ color: '#475467', fontWeight: 700 }}>Subject:</strong>{' '}
              {fm.subject || <span style={{ color: '#9CA3AF' }}>(not set)</span>}
            </div>
            <div>
              <strong style={{ color: '#475467', fontWeight: 700 }}>From:</strong>{' '}
              {fm.from || <span style={{ color: '#9CA3AF' }}>(not set)</span>}
            </div>
            <div>
              <strong style={{ color: '#475467', fontWeight: 700 }}>To:</strong>{' '}
              {fm.to || <span style={{ color: '#9CA3AF' }}>(subscriber email)</span>}
            </div>
          </div>
          {html ? (
            <iframe
              srcDoc={html}
              title="Email preview"
              sandbox="allow-same-origin"
              style={{
                display: 'block',
                width: '100%',
                height: '80vh',
                border: '0',
                backgroundColor: '#FFFFFF',
              }}
            />
          ) : (
            <div style={{ padding: 32, color: '#9CA3AF' }}>
              No <code>preview_html</code> on this row yet.
            </div>
          )}
        </div>
      </ShellChrome>
    )
  }

  if (row.item_type === 'copy-draft') {
    const cleaned = stripDispatchSentinel(row.context_md || '')
    return (
      <ShellChrome label={row.item_label} itemType={row.item_type} reviewUrl={reviewUrl}>
        <article
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #EADFD3',
            borderRadius: 14,
            padding: '40px 48px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(cleaned) }}
        />
      </ShellChrome>
    )
  }

  // page-draft
  const stagingUrl = (row.preview_urls || [])[0] || ''
  return (
    <ShellChrome label={row.item_label} itemType={row.item_type} reviewUrl={reviewUrl}>
      {stagingUrl ? (
        <iframe
          src={stagingUrl}
          title="Page preview"
          style={{
            display: 'block',
            width: '100%',
            height: '85vh',
            border: '1px solid #EADFD3',
            borderRadius: 14,
            backgroundColor: '#FFFFFF',
          }}
        />
      ) : (
        <div
          style={{
            padding: 32,
            backgroundColor: '#FFFFFF',
            border: '1px solid #EADFD3',
            borderRadius: 14,
            color: '#9CA3AF',
          }}
        >
          No <code>preview_urls[0]</code> staging URL on this row.
        </div>
      )}
    </ShellChrome>
  )
}
