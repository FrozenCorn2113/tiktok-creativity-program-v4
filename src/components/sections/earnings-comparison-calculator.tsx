'use client'

import { useState, useMemo } from 'react'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { trackCalculatorUsed } from '@/lib/analytics'
import { TrendingUp, Info, DollarSign, Eye, Calendar } from 'lucide-react'

// Niche RPM data
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
  if (n >= 10000) return `$${(n / 1000).toFixed(0)}K`
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`
  return `$${n.toFixed(2)}`
}

function formatViews(v: number): string {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`
  return v.toString()
}

export function EarningsComparisonCalculator({ className }: { className?: string }) {
  const [viewsPerVideo, setViewsPerVideo] = useState(50000)
  const [videosPerMonth, setVideosPerMonth] = useState(15)
  const [nicheId, setNicheId] = useState('general')
  const [includeBonus, setIncludeBonus] = useState(false)

  const niche = niches.find((n) => n.id === nicheId) || niches[0]

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

  const handleInteraction = () => {
    trackCalculatorUsed('earnings_calculator', {
      viewsPerVideo,
      videosPerMonth,
      niche: nicheId,
      includeBonus,
    })
  }

  return (
    <div className={cn('', className)}>
      <div className="rounded-2xl border border-border-default bg-white shadow-lg overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
          {/* Left: inputs */}
          <div className="p-5 lg:p-6 space-y-5">
            {/* Niche selector */}
            <div>
              <label htmlFor="niche-select" className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-1.5">
                Content Niche
              </label>
              <select
                id="niche-select"
                value={nicheId}
                onChange={(e) => { setNicheId(e.target.value); handleInteraction() }}
                className="w-full h-10 rounded-lg border border-border-default bg-background-surface px-3 text-sm text-brand-ink transition-shadow focus-visible:outline-none focus-visible:border-brand-primary focus-visible:shadow-[0_0_0_3px_rgba(249,115,22,0.1)]"
              >
                {niches.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-text-muted">
                RPM: {results.rpmRange} per 1K views
              </p>
            </div>

            {/* Views per video slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-text-muted flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" aria-hidden />
                  Views Per Video
                </label>
                <span
                  className="text-sm font-bold text-brand-ink tabular-nums bg-background-surface rounded-md px-2 py-0.5"
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
              <div className="flex justify-between mt-1 text-[10px] text-text-muted">
                <span>1K</span>
                <span>5M</span>
              </div>
            </div>

            {/* Videos per month slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-text-muted flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden />
                  Videos Per Month
                </label>
                <span
                  className="text-sm font-bold text-brand-ink tabular-nums bg-background-surface rounded-md px-2 py-0.5"
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
              <div className="flex justify-between mt-1 text-[10px] text-text-muted">
                <span>1</span>
                <span>60</span>
              </div>
            </div>

            {/* Bonus toggle */}
            <label className="flex cursor-pointer items-center gap-3 text-sm text-text-secondary rounded-lg bg-background-surface px-3 py-2.5 border border-border-default hover:border-brand-primary/30 transition-colors">
              <input
                type="checkbox"
                checked={includeBonus}
                onChange={(e) => { setIncludeBonus(e.target.checked); handleInteraction() }}
                className="h-4 w-4 cursor-pointer rounded border-border-default accent-brand-primary"
              />
              <span className="text-sm">Additional Reward bonus <span className="font-semibold text-green-600">+20%</span></span>
            </label>
          </div>

          {/* Right: results panel */}
          <div className="border-t border-border-default bg-gradient-to-br from-[#0A0F1C] via-[#111827] to-[#0A0F1C] p-5 lg:border-t-0 lg:border-l lg:border-l-[#1E293B] lg:p-6 text-white">
            {/* Monthly views badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center">
                <Eye className="h-3.5 w-3.5 text-gray-400" aria-hidden />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  Monthly Views
                </p>
                <p
                  className="text-base font-bold text-white tabular-nums"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {results.totalMonthlyViews.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Monthly earnings - the star */}
            <div className="rounded-xl bg-white/[0.07] border border-white/10 p-4 mb-4">
              <div className="flex items-center gap-1.5 mb-2">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
                <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                  Monthly Earnings
                </p>
              </div>
              <div
                className="flex items-baseline gap-1 flex-wrap"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="text-3xl lg:text-[2.25rem] font-bold text-emerald-400 tabular-nums whitespace-nowrap" style={{ fontFamily: 'var(--font-mono)' }}>
                  {formatMoney(results.low)}
                </span>
                <span className="text-lg text-gray-500 font-medium mx-0.5">-</span>
                <span className="text-3xl lg:text-[2.25rem] font-bold text-emerald-400 tabular-nums whitespace-nowrap" style={{ fontFamily: 'var(--font-mono)' }}>
                  {formatMoney(results.high)}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1.5 tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
                {formatMoney(results.yearlyLow)} - {formatMoney(results.yearlyHigh)} / year
              </p>
            </div>

            {/* Breakdown */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 text-xs">Qualified views (82%)</span>
                <span
                  className="font-semibold text-white text-xs tabular-nums"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {results.qualifiedViews.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 text-xs">RPM range</span>
                <span
                  className="font-semibold text-white text-xs tabular-nums"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {results.rpmRange}
                </span>
              </div>
              {includeBonus && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 text-xs">Additional Reward</span>
                  <span className="font-semibold text-emerald-400 text-xs">+20% applied</span>
                </div>
              )}
            </div>

            <div className="mt-4 rounded-lg bg-white/[0.05] border border-white/10 p-2.5">
              <div className="flex gap-2">
                <Info className="h-3.5 w-3.5 text-gray-500 flex-shrink-0 mt-0.5" aria-hidden />
                <p className="text-[11px] text-gray-400 leading-[1.5]">
                  Only 1+ min videos earn Creator Rewards. Qualified views exclude Duets, Stitches, and paid promotion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EarningsComparisonCalculator
