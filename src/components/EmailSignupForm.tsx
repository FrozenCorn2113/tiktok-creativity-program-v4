'use client'

import { useState } from 'react'
import Button from '@/components/ui/button'
import { track, trackEmailSignupAttempt, trackEvent } from '@/lib/analytics'

type Variant = 'inline' | 'sidebar' | 'exit-intent' | 'hero'

type EmailSignupFormProps = {
  variant?: Variant
  title?: string
  description?: string
  ctaLabel?: string
  className?: string
  /** Lead magnet name — stored in Supabase for segmentation */
  leadMagnet?: string
}

const defaultCopy: Record<Variant, { title: string; description: string; ctaLabel: string }> = {
  inline: {
    title: 'Get the free TikTok Earnings Tracker',
    description: 'Track views, RPM, qualified views, and earnings in one clean sheet.',
    ctaLabel: 'Send the tracker',
  },
  sidebar: {
    title: 'Get weekly monetization tips',
    description: 'Short, tactical emails to grow earnings without the fluff.',
    ctaLabel: 'Join the list',
  },
  'exit-intent': {
    title: 'Before you go — want the free RPM Cheat Sheet?',
    description: 'RPM ranges for 18 TikTok niches and tips to push your rate higher. Instant access.',
    ctaLabel: 'Get the cheat sheet',
  },
  hero: {
    title: 'Start earning more from TikTok',
    description: 'Free guides, calculators, and the earnings tracker — delivered to your inbox.',
    ctaLabel: 'Get free access',
  },
}

export default function EmailSignupForm({
  variant = 'inline',
  title,
  description,
  ctaLabel,
  className = '',
  leadMagnet,
}: EmailSignupFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const copy = defaultCopy[variant]
  const isHero = variant === 'hero'
  const isInline = variant === 'inline'

  // Always pass a lead_magnet so Supabase has segmentation data.
  // Fall back to the variant's default title (e.g. "Newsletter" for hero/inline)
  // rather than null, which pollutes the analytics breakdown.
  const effectiveLeadMagnet =
    leadMagnet ?? (variant === 'inline' ? 'Newsletter' : copy.title)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) return

    setStatus('loading')
    setMessage('')
    trackEmailSignupAttempt(variant)

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: variant,
          lead_magnet: effectiveLeadMagnet,
          page_url: typeof window !== 'undefined' ? window.location.pathname : undefined,
        }),
      })

      if (!response.ok) throw new Error('Request failed')

      setStatus('success')
      setMessage('Check your inbox for your free resources.')
      setEmail('')
      // Legacy GA wrapper — dual-fires to PostHog via lib/analytics.
      trackEvent({
        action: 'email_signup',
        category: 'engagement',
        label: variant,
      })
      // PostHog with taxonomy-aligned properties.
      track('email_signup', {
        signup_source: variant,
        lead_magnet: effectiveLeadMagnet,
        page_url: typeof window !== 'undefined' ? window.location.pathname : undefined,
      })
      // If this signup was driven by an explicit lead magnet (not the newsletter
      // default), a download will follow on the email side. Fire a lightweight
      // download-intent event so we can measure the magnet-specific funnel.
      if (leadMagnet) {
        track('lead_magnet_download', {
          lead_magnet: leadMagnet,
          signup_source: variant,
        })
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  // Inline variant — TCP warm-editorial dark block (matches TCPNewsletter in tcp-chrome.jsx)
  if (isInline) {
    const headline = title ?? copy.title
    const sub = description ?? copy.description
    return (
      <section
        id="newsletter"
        className={className}
        style={{ padding: '64px 0', maxWidth: 1400, margin: '0 auto' }}
      >
        <div
          className="grid grid-cols-1 items-center gap-8 bg-ink text-paper lg:grid-cols-2 lg:gap-12"
          style={{ padding: 52, borderRadius: 24 }}
        >
          <div>
            <h2
              className="m-0 text-paper"
              style={{ fontSize: 44, lineHeight: 1.04, letterSpacing: '-0.03em', fontWeight: 500 }}
            >
              {headline}{' '}
              <span
                className="font-serif italic"
                style={{ color: '#F4A261', fontWeight: 400 }}
              >
                Every Sunday.
              </span>
            </h2>
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex bg-paper"
              style={{ borderRadius: 100, padding: 6 }}
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@domain.com"
                required
                className="flex-1 bg-transparent text-ink outline-none"
                style={{ border: 'none', padding: '14px 20px', fontSize: 14, fontFamily: 'inherit' }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{
                  background: '#F4A261',
                  color: '#0F0E0C',
                  border: 'none',
                  padding: '0 24px',
                  fontSize: 14,
                  borderRadius: 100,
                  cursor: 'pointer',
                }}
              >
                {status === 'loading' ? 'Sending…' : ctaLabel ?? copy.ctaLabel ?? 'Subscribe →'}
              </button>
            </form>
            {sub ? (
              <div
                className="mt-4 text-[12px]"
                style={{ color: 'rgba(251,246,236,0.55)' }}
              >
                {sub}
              </div>
            ) : null}
            {message ? (
              <div
                className={`mt-3 text-[12px] ${
                  status === 'success' ? 'text-[#86efac]' : 'text-[#fca5a5]'
                }`}
              >
                {message}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    )
  }

  // Non-inline variants (sidebar / exit-intent / hero) — light card, existing styling.
  const inputHeight = isHero ? 'h-14' : 'h-12'
  const inputFont = isHero ? 'text-base' : 'text-sm'

  return (
    <div
      className={`rounded-[var(--radius-xl)] bg-[var(--color-surface-muted)] p-8 ${isHero ? 'md:p-10' : ''} ${className}`}
    >
      {(title ?? copy.title) ? (
        <h3 className={`font-bold text-[var(--color-ink-strong)] ${isHero ? 'text-2xl' : 'text-lg'}`}>
          {title ?? copy.title}
        </h3>
      ) : null}
      {(description ?? copy.description) ? (
        <p className="mt-2 text-sm leading-[1.7] text-[var(--color-text-muted)]">
          {description ?? copy.description}
        </p>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className={`${inputHeight} ${inputFont} flex-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] transition-shadow duration-200 focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-input)] focus-visible:border-[var(--color-primary)]`}
          required
        />
        <Button
          type="submit"
          size={isHero ? 'lg' : 'default'}
          disabled={status === 'loading'}
          className={isHero ? 'h-14 whitespace-nowrap' : 'whitespace-nowrap'}
        >
          {status === 'loading' ? 'Sending...' : ctaLabel ?? copy.ctaLabel}
        </Button>
      </form>

      {message ? (
        <p
          className={`mt-3 text-xs ${
            status === 'success' ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
