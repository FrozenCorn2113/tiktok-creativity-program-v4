'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_PLACEHOLDER'
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize PostHog in production
    if (process.env.NODE_ENV !== 'production') return
    if (typeof window === 'undefined') return

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      loaded: (ph) => {
        if (process.env.NODE_ENV !== 'production') {
          ph.opt_out_capturing()
        }
      },
    })
  }, [])

  if (process.env.NODE_ENV !== 'production') {
    // In dev, skip the provider wrapper — PostHog is not initialized
    return <>{children}</>
  }

  return <PHProvider client={posthog}>{children}</PHProvider>
}
