'use client'

import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Slider } from '@/components/ui/slider'
import { NumberTicker } from '@/components/magicui/number-ticker'
import { cn } from '@/lib/utils'
import { fadeUp, viewportOnce } from '@/lib/motion'
import { trackCalculatorUsed } from '@/lib/analytics'
import { TrendingUp, Info } from 'lucide-react'

// ── Niche RPM data ──────────────────────────────────────────────────────────
const niches = [
  { id: 'general',       label: 'General / Entertainment', rpmLow: 0.40, rpmHigh: 0.70 },
  { id: 'comedy',        label: 'Comedy',                  rpmLow: 0.35, rpmHigh: 0.65 },
  { id: 'education',     label: 'Education',               rpmLow: 0.60, rpmHigh: 1.00 },
  { id: 'finance',       label: 'Finance / Business',      rpmLow: 0.70, rpmHigh: 1.00 },
  { id: 'tech',          label: 'Tech / Software',         rpmLow: 0.60, rpmHigh: 0.95 },
  { id: 'beauty',        label: 'Beauty / Fashion',        rpmLow: 0.45, rpmHigh: 0.80 },
  { id: 'fitness',       label: 'Fitness / Health',        rpmLow: 0.50, rpmHigh: 0.85 },
  { id: 'food',          label: 'Food / Cooking',          rpmLow: 0.40, rpmHigh: 0.75 },
  { id: 'gaming',        label: 'Gaming',                  rpmLow: 0.35, rpmHigh: 0.65 },
  { id: 'travel',        label: 'Travel / Lifestyle',      rpmLow: 0.45, rpmHigh: 0.80 },
  { id: 'diy',           label: 'DIY / Crafts',            rpmLow: 0.40, rpmHigh: 0.70 },
  { id: 'pets',          label: 'Pets / Animals',          rpmLow: 0.35, rpmHigh: 0.60 },
] as const

const QUALIFIED_VIEW_RATIO = 0.82

function formatMoney(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`
  return `$${n.toFixed(2)}`
}

function formatViews(v: number): string {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`
  return v.toString()
}

export function EarningsComparisonCalculator({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion()

  // Inputs
  const [viewsPerVideo, setViewsPerVideo] = useState(50000)
  const [videosPerMonth, setVideosPerMonth] = useState(15)
  const [nicheId, setNicheId] = useState('general')
  const [includeBonus, setIncludeBonus] = useState(false)

  const niche = niches.find((n) => n.id === nicheId) || niches[0]

  // Calculations
  const results = useMemo(() => {
    const totalMonthlyViews = viewsPerVideo * videosPerMonth
    const qualifiedViews = Math.round(totalMonthlyViews * QUALIFIED_VIEW_RATIO)
    const bonusMultiplier = includeBonus ? 1.2 : 1

    const rewardsLow = (qualifiedViews / 1000) * niche.rpmLow * bonusMultiplier
    const rewardsHigh = (qualifiedViews / 1000) * niche.rpmHigh * bonusMultiplier
    const rewardsMid = (rewardsLow + rewardsHigh) / 2

    return {
      totalMonthlyViews,
      qualifiedViews,
      low: rewardsLow,
      high: rewardsHigh,
      mid: rewardsMid,
      yearlyLow: rewardsLow * 12,
      yearlyHigh: rewardsHigh * 12,
      yearlyMid: rewardsMid * 12,
      rpmRange: `$${niche.rpmLow.toFixed(2)} - $${niche.rpmHigh.toFixed(2)}`,
    }
  }, [viewsPerVideo, videosPerMonth, niche, includeBonus])

  // Track calculator usage
  const handleInteraction = () => {
    trackCalculatorUsed('earnings_calculator', {
      viewsPerVideo,
      videosPerMonth,
      niche: nicheId,
      includeBonus,
    })
  }

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'show',
        viewport: viewportOnce,
        variants: fadeUp,
      }

  return (
    <motion.div {...motionProps} className={cn('space-y-6', className)}>
      <div className="bg-white rounded-2xl border border-border-default shadow-lg overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
          {/* Left: inputs */}
          <div className="p-6 lg:p-8 space-y-6">
            {/* Niche selector */}
            <div>
              <label htmlFor="niche-select" className="block text-sm font-semibold text-brand-ink mb-2">
                Content Niche
              </label>
              <select
                id="niche-select"
                value={nicheId}
                onChange={(e) => { setNicheId(e.target.value); handleInteraction() }}
                className="w-full h-11 rounded-lg border border-border-default bg-background-surface px-3 text-sm text-brand-ink transition-shadow focus-visible:outline-none focus-visible:border-brand-primary focus-visible:shadow-[0_0_0_3px_rgba(249,115,22,0.1)]"
              >
                {niches.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-text-muted">
                RPM for {niche.label}: {results.rpmRange} per 1,000 views
              </p>
            </div>

            {/* Views per video slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-brand-ink">
                  Avg. Views Per Video
                </label>
                <span
                  className="text-lg font-bold text-brand-primary"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {formatViews(viewsPerVideo)}
                </span>
              </div>
              <Slider
                min={1000}
                max={5000000}
                step={1000}
                value={[viewsPerVideo]}
                onValueChange={(val) => {
                  const v = Array.isArray(val) ? val[0] : val
                  if (typeof v === 'number') setViewsPerVideo(v)
                }}
                className="[&_[role=slider]]:bg-brand-primary [&_[role=slider]]:border-brand-primary [&_.relative]:bg-brand-primary"
                aria-label="Average views per video"
              />
              <div className="flex justify-between mt-1 text-xs text-text-muted">
                <span>1K</span>
                <span>5M</span>
              </div>
            </div>

            {/* Videos per month slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-brand-ink">
                  Videos Per Month
                </label>
                <span
                  className="text-lg font-bold text-brand-primary"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {videosPerMonth}
                </span>
              </div>
              <Slider
                min={1}
                max={60}
                step={1}
                value={[videosPerMonth]}
                onValueChange={(val) => {
                  const v = Array.isArray(val) ? val[0] : val
                  if (typeof v === 'number') setVideosPerMonth(v)
                }}
                className="[&_[role=slider]]:bg-brand-primary [&_[role=slider]]:border-brand-primary [&_.relative]:bg-brand-primary"
                aria-label="Videos per month"
              />
              <div className="flex justify-between mt-1 text-xs text-text-muted">
                <span>1</span>
                <span>60</span>
              </div>
            </div>

            {/* Bonus toggle */}
            <label className="flex cursor-pointer items-center gap-3 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={includeBonus}
                onChange={(e) => { setIncludeBonus(e.target.checked); handleInteraction() }}
                className="h-4 w-4 cursor-pointer rounded border-border-default accent-brand-primary"
              />
              Include Additional Reward bonus (+20%)
            </label>
          </div>

          {/* Right: results panel */}
          <div className="border-t border-border-default bg-background-warm p-6 lg:border-t-0 lg:border-l lg:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">
              Total monthly views
            </p>
            <p
              className="text-2xl font-bold text-brand-ink mb-6"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {results.totalMonthlyViews.toLocaleString()}
            </p>

            {/* Monthly earnings */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                  Estimated Monthly Earnings
                </p>
              </div>
              <div
                className="text-[2.25rem] font-bold text-green-600 leading-none"
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}
                aria-live="polite"
                aria-atomic="true"
              >
                $<NumberTicker
                  value={results.low}
                  decimalPlaces={2}
                  className="text-green-600"
                />
                {' - $'}
                <NumberTicker
                  value={results.high}
                  decimalPlaces={2}
                  className="text-green-600"
                />
              </div>
              <p className="text-xs text-text-muted mt-1">per month</p>
              <p
                className="text-sm font-medium text-text-secondary mt-1"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {formatMoney(results.yearlyLow)} - {formatMoney(results.yearlyHigh)} / year
              </p>
            </div>

            {/* Breakdown details */}
            <div className="mt-5 pt-4 border-t border-border-default space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">Qualified views (82%)</span>
                <span
                  className="font-semibold text-brand-ink"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {results.qualifiedViews.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">RPM range</span>
                <span
                  className="font-semibold text-brand-ink"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {results.rpmRange}
                </span>
              </div>
              {includeBonus && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Additional Reward</span>
                  <span className="font-semibold text-green-600">+20% applied</span>
                </div>
              )}
            </div>

            <div className="mt-4 rounded-lg bg-brand-primarySoft/50 border border-brand-primary/20 p-3">
              <div className="flex gap-2">
                <Info className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" aria-hidden />
                <p className="text-xs text-text-secondary leading-[1.6]">
                  Only videos 1 minute or longer earn Creator Rewards. Qualified views are organic FYP views, excluding Duets, Stitches, and paid promotion.
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs text-text-muted leading-[1.6]">
              Estimates based on creator-reported RPM data. Actual earnings vary by country, content quality, and engagement.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EarningsComparisonCalculator
