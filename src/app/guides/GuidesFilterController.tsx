'use client'

// Client-only filter + pagination controller for /guides.
// Rationale: the page renders ALL guide cards in SSR HTML (for SEO/indexing).
// This controller toggles CSS visibility on those existing cards — it never
// adds or removes <a> elements from the DOM. That guarantees every guide link
// remains crawlable whether JS runs or not.

import { useEffect, useRef, useState } from 'react'

export default function GuidesFilterController() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [visibleCount, setVisibleCount] = useState<number>(12)
  const initialized = useRef(false)

  // Wire up tab buttons once on mount.
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const tabButtons = document.querySelectorAll<HTMLElement>('[data-guides-tab]')
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.guidesTab
        if (!value) return
        setActiveCategory(value)
        setVisibleCount(12)
      })
    })

    const loadMore = document.querySelector<HTMLButtonElement>('[data-guides-loadmore]')
    loadMore?.addEventListener('click', () => {
      setVisibleCount((c) => c + 12)
    })
  }, [])

  // Apply filter + pagination by toggling .hidden class on data-guide-card nodes.
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('[data-guide-card]')
    const empty = document.querySelector<HTMLElement>('[data-guides-empty]')
    const loadMoreWrap = document.querySelector<HTMLElement>('[data-guides-loadmore-wrap]')

    let matchedCount = 0
    let shownCount = 0

    cards.forEach((card) => {
      const cat = card.dataset.category ?? ''
      const matches = activeCategory === 'all' || cat === activeCategory
      if (matches) {
        if (shownCount < visibleCount) {
          card.classList.remove('hidden')
          shownCount += 1
        } else {
          card.classList.add('hidden')
        }
        matchedCount += 1
      } else {
        card.classList.add('hidden')
      }
    })

    if (empty) {
      if (matchedCount === 0) empty.classList.remove('hidden')
      else empty.classList.add('hidden')
    }

    if (loadMoreWrap) {
      if (shownCount < matchedCount) loadMoreWrap.classList.remove('hidden')
      else loadMoreWrap.classList.add('hidden')
    }
  }, [activeCategory, visibleCount])

  return null
}
