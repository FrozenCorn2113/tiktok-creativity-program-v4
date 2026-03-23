'use client'

import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    // Respect prefers-reduced-motion — skip all animation setup
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
      elements.forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return
    }

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!elements.length) return

    // Add reveal class to initialise hidden state
    elements.forEach((el) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal')
      }
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -32px 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
