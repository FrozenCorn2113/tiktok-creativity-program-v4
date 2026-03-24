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
