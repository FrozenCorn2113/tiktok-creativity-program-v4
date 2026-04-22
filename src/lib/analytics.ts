// Dynamic import to keep posthog out of the server bundle.
// Called sparingly; `capture` is a tiny no-op when PostHog is not configured.
import posthog from 'posthog-js'

export type AnalyticsEvent = {
  action: string
  category?: string
  label?: string
  value?: number
}

/**
 * Fires an event to GA4 (legacy) AND PostHog. PostHog is the forward path —
 * use `track()` below for new events with rich properties.
 */
export function trackEvent({ action, category, label, value }: AnalyticsEvent) {
  if (typeof window === 'undefined') return

  // GA4
  if ('gtag' in window) {
    window.gtag?.('event', action, {
      event_category: category,
      event_label: label,
      value,
    })
  }

  // PostHog (no-ops if not configured)
  track(action, {
    event_category: category,
    event_label: label,
    value,
  })
}

/**
 * Preferred PostHog capture. Snake-case event names, properties object.
 * Safe to call at any time; no-ops when not configured or during SSR.
 */
export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return
  try {
    posthog.capture(event, properties)
  } catch (err) {
    console.warn('[analytics] posthog capture failed', err)
  }
}

// Typed GA event helpers — use these across the app
export function trackEmailSignupAttempt(location: string) {
  trackEvent({ action: 'email_signup_attempt', category: 'engagement', label: location })
}

export function trackAffiliateLinkClick(slug: string, destination?: string) {
  trackEvent({ action: 'affiliate_link_click', category: 'monetization', label: slug, value: undefined })
}

export function trackCalculatorUsed(calculatorName: string, inputs?: Record<string, unknown>) {
  trackEvent({ action: 'calculator_used', category: 'engagement', label: calculatorName })
}

export function trackGuideScrollDepth(slug: string, depth: 25 | 50 | 75 | 100) {
  trackEvent({ action: 'guide_scroll_depth', category: 'engagement', label: slug, value: depth })
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
