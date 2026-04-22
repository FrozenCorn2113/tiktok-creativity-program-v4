'use client'

import { useEffect } from 'react'

import { track } from '@/lib/analytics'

/**
 * Fires `guide_viewed` once on mount for MDX guide pages. Lives as a small
 * client island so the parent page can stay a server component.
 */
export default function GuideViewedTracker({
  slug,
  category,
  wordCount,
}: {
  slug: string
  category?: string | null
  wordCount?: number
}) {
  useEffect(() => {
    if (!slug) return
    track('guide_viewed', {
      guide_slug: slug,
      topic_category: category ?? null,
      word_count: wordCount ?? null,
    })
  }, [slug, category, wordCount])

  return null
}
