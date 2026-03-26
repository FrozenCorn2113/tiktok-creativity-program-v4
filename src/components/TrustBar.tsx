'use client'

// H7-H9 per BRAND.md Mandatory Implementation Checklist
// H8: countUp via useCountUp hook — initial render shows TARGET (not 0) for SSR safety
// Animation triggers only when element enters viewport AND JS is available

import { useEffect, useRef, useState } from 'react'

type TrustStat = {
  value: number
  suffix?: string
  prefix?: string
  label: string
  noGrouping?: boolean // suppress thousands separator (e.g. years)
}

// H9: exactly these three stats
const defaultStats: TrustStat[] = [
  { value: 107, suffix: ' Guides', label: '' },
  { value: 3, suffix: ' Free Calculators', label: '' },
  { value: 2026, prefix: 'Updated ', label: '', noGrouping: true },
]

function useCountUp(target: number, isVisible: boolean, duration = 1200) {
  // H8: initialize to target so SSR shows correct value — no flash of zeros
  const [count, setCount] = useState(target)
  const hasAnimated = useRef(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Only animate once, and only when visible
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true

    // H8: Respect prefers-reduced-motion — skip animation, keep final value
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      return
    }

    // Animate from 0 to target
    setCount(0)
    const startTime = performance.now()
    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isVisible, target, duration])

  return count
}

function formatCount(count: number, noGrouping?: boolean): string {
  if (noGrouping) return String(count)
  return count.toLocaleString()
}

function StatItem({ stat }: { stat: TrustStat }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(stat.value, isVisible)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center">
      {/* H7: stat numbers — large, ink-strong */}
      <span className="text-[1.5rem] font-[700] leading-[1.2] text-[#0F172A] md:text-[1.75rem]">
        {stat.prefix ?? ''}{formatCount(count, stat.noGrouping)}{stat.suffix ?? ''}
      </span>
      {/* H9: label below number, 12px text-muted */}
      {stat.label ? (
        <span className="text-[12px] font-[500] text-[#475467]">{stat.label}</span>
      ) : null}
    </div>
  )
}

type TrustBarProps = {
  stats?: TrustStat[]
  className?: string
}

export default function TrustBar({ stats = defaultStats, className = '' }: TrustBarProps) {
  return (
    // H7: 3-column flex on desktop, grid-cols-3 on mobile
    <div
      className={`bg-white px-4 py-8 ${className}`}
      aria-label="Site stats"
    >
      <div className="mx-auto grid max-w-3xl grid-cols-3 items-center justify-center gap-4 md:flex md:gap-16">
        {stats.map((stat, i) => (
          <StatItem key={`${stat.label || stat.value}-${i}`} stat={stat} />
        ))}
      </div>
    </div>
  )
}
