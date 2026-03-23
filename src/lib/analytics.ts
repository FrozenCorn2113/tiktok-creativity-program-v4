import posthog from 'posthog-js'

export type AnalyticsEvent = {
  action: string
  category?: string
  label?: string
  value?: number
}

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

  // PostHog — production only (PostHog is opted out in dev via PostHogProvider)
  if (process.env.NODE_ENV === 'production') {
    posthog.capture(action, {
      category,
      label,
      value,
    })
  }
}

// Typed PostHog event helpers — use these across the app
export function trackEmailSignupAttempt(location: string) {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return
  posthog.capture('email_signup_attempt', { location })
}

export function trackAffiliateLinkClick(slug: string, destination?: string) {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return
  posthog.capture('affiliate_link_click', { slug, destination })
}

export function trackCalculatorUsed(calculatorName: string, inputs?: Record<string, unknown>) {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return
  posthog.capture('calculator_used', { calculator: calculatorName, ...inputs })
}

export function trackGuideScrollDepth(slug: string, depth: 25 | 50 | 75 | 100) {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return
  posthog.capture('guide_scroll_depth', { slug, depth })
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
