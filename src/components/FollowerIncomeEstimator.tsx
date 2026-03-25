'use client'

import { useMemo, useState } from 'react'
import { trackEvent, trackCalculatorUsed } from '@/lib/analytics'
import { Users, TrendingUp, BarChart3, Info } from 'lucide-react'

const engagementOptions = [
  { label: 'Low (2%)', value: 0.02, reach: 2.5 },
  { label: 'Medium (5%)', value: 0.05, reach: 3 },
  { label: 'High (8%)', value: 0.08, reach: 3.5 },
]

function formatMoney(n: number): string {
  if (n >= 10000) return `$${(n / 1000).toFixed(0)}K`
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`
  return `$${n.toFixed(2)}`
}

export default function FollowerIncomeEstimator() {
  const [followers, setFollowers] = useState(12000)
  const [postsPerMonth, setPostsPerMonth] = useState(12)
  const [rpm, setRpm] = useState(0.7)
  const [engagement, setEngagement] = useState(engagementOptions[1])
  const [includeBonus, setIncludeBonus] = useState(false)

  const projectedViews = useMemo(() => {
    const viewsPerPost = followers * engagement.value * engagement.reach
    return Math.round(viewsPerPost * postsPerMonth)
  }, [followers, engagement, postsPerMonth])

  const qualifiedViews = useMemo(() => Math.round(projectedViews * 0.82), [projectedViews])
  const bonusMultiplier = includeBonus ? 1.2 : 1
  const earnings = useMemo(
    () => (qualifiedViews / 1000) * rpm * bonusMultiplier,
    [qualifiedViews, rpm, bonusMultiplier],
  )
  const yearlyEarnings = earnings * 12

  const handleCalculate = (event: React.FormEvent) => {
    event.preventDefault()
    trackEvent({
      action: 'calculator_use',
      category: 'tools',
      label: 'follower_income_estimator',
      value: followers,
    })
    trackCalculatorUsed('follower_income_estimator', { followers, postsPerMonth, rpm })
  }

  return (
    <form
      onSubmit={handleCalculate}
      className="rounded-2xl border border-border-default bg-white shadow-lg overflow-hidden"
    >
      <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
        {/* Inputs panel */}
        <div className="space-y-4 p-5 lg:p-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-1.5 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" aria-hidden />
              Current followers
            </label>
            <input
              type="number"
              min={0}
              value={followers}
              onChange={(event) => setFollowers(Number(event.target.value))}
              className="h-10 w-full rounded-lg border border-border-default bg-background-surface px-3 font-[family-name:var(--font-mono)] text-right text-sm text-brand-ink transition-shadow focus-visible:outline-none focus-visible:border-brand-primary focus-visible:shadow-[0_0_0_3px_rgba(249,115,22,0.1)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-1.5">
              Engagement rate
            </label>
            <select
              value={engagement.value}
              onChange={(event) =>
                setEngagement(
                  engagementOptions.find((option) => option.value === Number(event.target.value)) ??
                    engagementOptions[1],
                )
              }
              className="h-10 w-full rounded-lg border border-border-default bg-background-surface px-3 text-sm text-brand-ink focus-visible:outline-none focus-visible:border-brand-primary focus-visible:shadow-[0_0_0_3px_rgba(249,115,22,0.1)]"
            >
              {engagementOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-1.5">
              Posts per month
            </label>
            <input
              type="number"
              min={1}
              value={postsPerMonth}
              onChange={(event) => setPostsPerMonth(Number(event.target.value))}
              className="h-10 w-full rounded-lg border border-border-default bg-background-surface px-3 font-[family-name:var(--font-mono)] text-right text-sm text-brand-ink transition-shadow focus-visible:outline-none focus-visible:border-brand-primary focus-visible:shadow-[0_0_0_3px_rgba(249,115,22,0.1)]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                Estimated RPM
              </label>
              <span className="text-sm font-bold text-brand-ink tabular-nums bg-background-surface rounded-md px-2 py-0.5" style={{ fontFamily: 'var(--font-mono)' }}>
                ${rpm.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={0.4}
              max={1}
              step={0.01}
              value={rpm}
              onChange={(event) => setRpm(Number(event.target.value))}
              className="w-full accent-brand-primary"
            />
            <div className="flex justify-between mt-0.5 text-[10px] text-text-muted">
              <span>$0.40</span>
              <span>$1.00+</span>
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-text-secondary rounded-lg bg-background-surface px-3 py-2.5 border border-border-default hover:border-brand-primary/30 transition-colors">
            <input
              type="checkbox"
              checked={includeBonus}
              onChange={(event) => setIncludeBonus(event.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-border-default accent-brand-primary"
            />
            <span className="text-sm">Additional Reward bonus <span className="font-semibold text-green-600">+20%</span></span>
          </label>

          <button
            type="submit"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-primaryHover hover:shadow-md active:scale-[0.98]"
          >
            Calculate earnings
          </button>
        </div>

        {/* Results panel */}
        <div className="border-t border-border-default bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 lg:border-t-0 lg:border-l lg:border-l-slate-700 lg:p-6 text-white">
          {/* Projected views */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center">
              <BarChart3 className="h-3.5 w-3.5 text-slate-300" aria-hidden />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Projected Monthly Views
              </p>
              <p className="text-base font-bold text-white tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
                {projectedViews.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Earnings display */}
          <div className="rounded-xl bg-white/[0.07] border border-white/10 p-4 mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                Estimated Monthly Earnings
              </p>
            </div>
            <p className="text-3xl lg:text-[2.25rem] font-bold text-emerald-400 tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
              {formatMoney(earnings)}
            </p>
            <p className="text-xs text-slate-400 mt-1.5 tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
              {formatMoney(yearlyEarnings)} / year
            </p>
          </div>

          {/* Breakdown */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs">Qualified views (82%)</span>
              <span className="font-semibold text-white text-xs tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
                {qualifiedViews.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs">RPM applied</span>
              <span className="font-semibold text-white text-xs tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
                ${rpm.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs">Bonus applied</span>
              <span className="font-semibold text-xs" style={{ color: includeBonus ? '#34d399' : '#94a3b8' }}>
                {includeBonus ? 'Yes (+20%)' : 'No'}
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-white/[0.05] border border-white/10 p-2.5">
            <div className="flex gap-2">
              <Info className="h-3.5 w-3.5 text-slate-500 flex-shrink-0 mt-0.5" aria-hidden />
              <p className="text-[11px] text-slate-400 leading-[1.5]">
                Assumes each post reaches {engagement.reach}x your engaged audience organically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
