'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY
      const percent = totalHeight > 0 ? (current / totalHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, percent)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full rounded-r-full bg-[var(--color-primary)] transition-[width] duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
