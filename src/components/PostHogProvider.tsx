'use client'

import { Suspense, useEffect } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

/**
 * PostHog analytics provider for TCP.
 *
 * Runs alongside GA / Plausible. Captures pageviews manually on App Router
 * navigation (capture_pageview disabled on init).
 *
 * TCP is an affiliate content site with no auth, so we do not identify users
 * — PostHog uses its own anonymous distinct_id.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

    if (!key) return
    if (typeof window === 'undefined') return
    if ((posthog as any).__loaded) return

    posthog.init(key, {
      api_host: host,
      capture_pageview: false,
      capture_pageleave: true,
      disable_session_recording: true,
      persistence: 'localStorage+cookie',
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      {/*
       * PostHogPageview uses useSearchParams. Wrap in Suspense so the static
       * prerender path stays open for the rest of the app.
       */}
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </PHProvider>
  )
}

function PostHogPageview(): null {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) return
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return

    let url = window.origin + pathname
    const qs = searchParams?.toString()
    if (qs) url = `${url}?${qs}`

    posthog.capture('$pageview', { $current_url: url })
  }, [pathname, searchParams])

  return null
}
