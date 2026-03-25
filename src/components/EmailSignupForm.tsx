'use client'

import { useState } from 'react'
import Button from '@/components/ui/button'
import { trackEvent, trackEmailSignupAttempt } from '@/lib/analytics'

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
  const inputHeight = isHero ? 'h-14' : 'h-12'
  const inputFont = isHero ? 'text-base' : 'text-sm'

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
          lead_magnet: leadMagnet ?? undefined,
          page_url: typeof window !== 'undefined' ? window.location.pathname : undefined,
        }),
      })

      if (!response.ok) throw new Error('Request failed')

      setStatus('success')
      setMessage('Check your inbox for your free resources.')
      setEmail('')
      trackEvent({
        action: 'email_signup',
        category: 'engagement',
        label: variant,
      })
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

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
