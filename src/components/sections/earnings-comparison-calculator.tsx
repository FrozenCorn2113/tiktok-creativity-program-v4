'use client'

import { useState, useMemo } from 'react'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { trackCalculatorUsed } from '@/lib/analytics'
import { DataPill } from '@/components/tcp'

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
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        {/* Left: Inputs — paper card */}
        <div className="bg-white rounded-[20px] border border-line p-7 md:p-9">
          <div className="flex items-baseline gap-3 mb-7">
            <span className="font-serif italic text-[40px] leading-none text-brand-primary" aria-hidden>
              i
            </span>
            <h2 className="font-sans text-[22px] tracking-[-0.02em] font-semibold m-0 text-ink">Your inputs</h2>
          </div>

          <div className="flex flex-col gap-6">
            {/* Niche selector */}
            <div>
              <label htmlFor="niche-select" className="block font-sans text-[14px] font-medium text-ink mb-2">
                Content niche
              </label>
              <select
                id="niche-select"
                value={nicheId}
                onChange={(e) => { setNicheId(e.target.value); handleInteraction() }}
                className="w-full h-11 rounded-[10px] border border-line bg-paper px-3 text-[14px] text-ink focus-visible:outline-none focus-visible:border-ink transition-colors"
              >
                {niches.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label}
                  </option>
                ))}
              </select>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                RPM {results.rpmRange} per 1K
              </p>
            </div>

            {/* Views per video slider */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label className="font-sans text-[14px] font-medium text-ink">Views per video</label>
                <span className="font-mono text-[15px] font-medium tabular-nums text-ink">
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
              <div className="flex justify-between mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                <span>1K</span>
                <span>5M</span>
              </div>
            </div>

            {/* Videos per month slider */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label className="font-sans text-[14px] font-medium text-ink">Videos per month</label>
                <span className="font-mono text-[15px] font-medium tabular-nums text-ink">
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
              <div className="flex justify-between mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                <span>1</span>
                <span>60</span>
              </div>
            </div>

            {/* Bonus toggle */}
            <label className="flex cursor-pointer items-center gap-3 text-[14px] text-ink rounded-[10px] bg-paper px-4 py-3 border border-line hover:border-ink/30 transition-colors">
              <input
                type="checkbox"
                checked={includeBonus}
                onChange={(e) => { setIncludeBonus(e.target.checked); handleInteraction() }}
                className="h-4 w-4 cursor-pointer rounded border-line accent-brand-primary"
              />
              <span>Additional Reward bonus <span className="font-semibold text-brand-primaryDeep">+20%</span></span>
            </label>
          </div>
        </div>

        {/* Right: Results — dark ink card */}
        <div
          className="rounded-[20px] p-7 md:p-9 relative overflow-hidden"
          style={{ background: '#0F0E0C', color: '#FBF6EC' }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F4A261' }}>
            Estimated Monthly Earnings
          </div>
          <div
            className="font-serif italic tabular-nums"
            style={{
              fontSize: 'clamp(56px, 8vw, 96px)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              fontWeight: 400,
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            {formatMoney(results.low)}<span style={{ color: 'rgba(251,246,236,0.35)' }}> – </span>{formatMoney(results.high)}
          </div>
          <div className="mt-4 text-[14px]" style={{ color: 'rgba(251,246,236,0.65)' }}>
            Based on <b style={{ color: '#FBF6EC' }}>{results.qualifiedViews.toLocaleString()}</b> qualified views · RPM <b style={{ color: '#F4A261' }}>{results.rpmRange}</b>
          </div>

          {/* Yearly + monthly views grid */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-[12px] p-4" style={{ background: 'rgba(251,246,236,0.05)' }}>
              <div className="font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: 'rgba(251,246,236,0.5)' }}>
                Yearly
              </div>
              <div className="mt-1 font-mono text-[22px] font-semibold tabular-nums" style={{ letterSpacing: '-0.02em' }}>
                {formatMoney(results.yearlyLow)} – {formatMoney(results.yearlyHigh)}
              </div>
            </div>
            <div className="rounded-[12px] p-4" style={{ background: 'rgba(251,246,236,0.05)' }}>
              <div className="font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: 'rgba(251,246,236,0.5)' }}>
                Monthly views
              </div>
              <div className="mt-1 font-mono text-[22px] font-semibold tabular-nums" style={{ letterSpacing: '-0.02em' }}>
                {formatViews(results.totalMonthlyViews)}
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="mt-6 rounded-[12px] p-5 font-mono text-[12px]" style={{ background: 'rgba(251,246,236,0.04)' }}>
            <div className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid rgba(251,246,236,0.08)' }}>
              <span style={{ opacity: 0.6 }}>Qualified views (82%)</span>
              <span className="tabular-nums">{results.qualifiedViews.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid rgba(251,246,236,0.08)' }}>
              <span style={{ opacity: 0.6 }}>RPM range</span>
              <span className="tabular-nums">{results.rpmRange}</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span style={{ opacity: 0.6 }}>Bonus</span>
              <span className="tabular-nums" style={{ color: includeBonus ? '#F4A261' : 'rgba(251,246,236,0.5)' }}>
                {includeBonus ? '+20% applied' : 'Off'}
              </span>
            </div>
          </div>

          {/* Range pill */}
          <div className="mt-5 flex flex-wrap gap-2">
            <DataPill variant="tag">{formatMoney(results.yearlyMid)} / yr mid</DataPill>
            <DataPill variant="emphasis">{formatViews(results.qualifiedViews)} qualified</DataPill>
          </div>

          <p className="mt-5 text-[12px] leading-[1.6]" style={{ color: 'rgba(251,246,236,0.55)' }}>
            Only 1+ min videos earn Creator Rewards. Qualified views exclude Duets, Stitches, and paid promotion.
          </p>
        </div>
      </div>
    </div>
  )
}

export default EarningsComparisonCalculator
