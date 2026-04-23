'use client'

/**
 * Client island for the review dashboard.
 * Renders comment textarea + GO / REVISE buttons.
 * On click, PATCHes /api/review/<token> and shows confirmation in place.
 */
import { useState } from 'react'

type Decision = 'go' | 'revise'
type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ReviewActions({ token }: { token: string }) {
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [resultDecision, setResultDecision] = useState<Decision | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submit(decision: Decision) {
    if (status === 'submitting') return
    setStatus('submitting')
    setError(null)
    try {
      const res = await fetch(`/api/review/${encodeURIComponent(token)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision, comment: comment.trim() || undefined }),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `HTTP ${res.status}`)
      }
      setResultDecision(decision)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success' && resultDecision) {
    const isGo = resultDecision === 'go'
    return (
      <div
        style={{
          backgroundColor: isGo ? '#E8F5E9' : '#FFF1E6',
          border: `1px solid ${isGo ? '#A5D6A7' : '#F4A261'}`,
          borderRadius: 10,
          padding: '18px 20px',
          marginTop: 8,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 800, color: '#0B0F1A', marginBottom: 4 }}>
          {isGo ? 'GO — recorded' : 'REVISE — recorded'}
        </div>
        <div style={{ fontSize: 12, color: '#475467' }}>
          You can close this tab. Bernard will route from here.
        </div>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <div>
      <label
        htmlFor="review-comment"
        style={{
          display: 'block',
          fontSize: 13,
          fontWeight: 700,
          color: '#475467',
          marginBottom: 8,
          letterSpacing: '0.02em',
        }}
      >
        Optional comment
      </label>
      <textarea
        id="review-comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="What would you change? (Optional, sent only if you click REVISE.)"
        rows={4}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '12px 14px',
          fontSize: 14,
          fontFamily: 'inherit',
          color: '#111827',
          backgroundColor: '#FFFFFF',
          border: '1px solid #EADFD3',
          borderRadius: 10,
          resize: 'vertical',
          marginBottom: 18,
          lineHeight: 1.5,
          outline: 'none',
        }}
        disabled={submitting}
      />

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => submit('go')}
          disabled={submitting}
          style={{
            flex: '1 1 200px',
            padding: '14px 24px',
            fontSize: 15,
            fontWeight: 700,
            color: '#0B0F1A',
            background: 'linear-gradient(135deg,#F4A261 0%,#E8894A 100%)',
            border: 'none',
            borderRadius: 999,
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.6 : 1,
            boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.12)',
            fontFamily: 'inherit',
            letterSpacing: '0.02em',
          }}
        >
          GO — Ship it
        </button>
        <button
          type="button"
          onClick={() => submit('revise')}
          disabled={submitting}
          style={{
            flex: '1 1 200px',
            padding: '14px 24px',
            fontSize: 15,
            fontWeight: 700,
            color: '#0B0F1A',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #0B0F1A',
            borderRadius: 999,
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.6 : 1,
            fontFamily: 'inherit',
            letterSpacing: '0.02em',
          }}
        >
          REVISE — Send back
        </button>
      </div>

      {status === 'error' && error ? (
        <div
          style={{
            marginTop: 16,
            padding: '12px 14px',
            backgroundColor: '#FEE2E2',
            border: '1px solid #FCA5A5',
            borderRadius: 8,
            fontSize: 13,
            color: '#7F1D1D',
          }}
        >
          {error}
        </div>
      ) : null}
    </div>
  )
}
