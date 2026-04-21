'use client'

import { useMemo, useState } from 'react'
import { trackEvent, trackCalculatorUsed } from '@/lib/analytics'
import { DataPill } from '@/components/tcp'

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
    <form onSubmit={handleCalculate} className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      {/* Inputs — paper card */}
      <div className="bg-white rounded-[20px] border border-line p-7 md:p-9">
        <div className="flex items-baseline gap-3 mb-7">
          <span className="font-serif italic text-[40px] leading-none text-brand-primary" aria-hidden>
            i
          </span>
          <h2 className="font-sans text-[22px] tracking-[-0.02em] font-semibold m-0 text-ink">Your target</h2>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block font-sans text-[14px] font-medium text-ink mb-2">
              Current followers
            </label>
            <input
              type="number"
              min={0}
              value={followers}
              onChange={(event) => setFollowers(Number(event.target.value))}
              className="h-11 w-full rounded-[10px] border border-line bg-paper px-4 font-mono text-right text-[14px] text-ink focus-visible:outline-none focus-visible:border-ink transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-[14px] font-medium text-ink mb-2">
              Engagement rate
            </label>
            <div className="flex flex-wrap gap-2">
              {engagementOptions.map((option) => {
                const selected = option.value === engagement.value
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setEngagement(option)}
                    className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-colors ${
                      selected
                        ? 'bg-ink text-paper border-ink'
                        : 'bg-white text-ink border-line hover:border-ink/40'
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block font-sans text-[14px] font-medium text-ink mb-2">
              Posts per month
            </label>
            <input
              type="number"
              min={1}
              value={postsPerMonth}
              onChange={(event) => setPostsPerMonth(Number(event.target.value))}
              className="h-11 w-full rounded-[10px] border border-line bg-paper px-4 font-mono text-right text-[14px] text-ink focus-visible:outline-none focus-visible:border-ink transition-colors"
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label className="font-sans text-[14px] font-medium text-ink">Estimated RPM</label>
              <span className="font-mono text-[15px] font-medium tabular-nums text-ink">
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
            <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
              <span>$0.40</span>
              <span>$1.00+</span>
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-[14px] text-ink rounded-[10px] bg-paper px-4 py-3 border border-line hover:border-ink/30 transition-colors">
            <input
              type="checkbox"
              checked={includeBonus}
              onChange={(event) => setIncludeBonus(event.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-line accent-brand-primary"
            />
            <span>Additional Reward bonus <span className="font-semibold text-brand-primaryDeep">+20%</span></span>
          </label>

          <button
            type="submit"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-ink px-5 py-3.5 text-[14px] font-semibold text-paper transition-all duration-200 hover:bg-ink/90"
          >
            Calculate earnings
          </button>
        </div>
      </div>

      {/* Results — dark ink card */}
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
        >
          {formatMoney(earnings)}
        </div>
        <div className="mt-4 text-[14px]" style={{ color: 'rgba(251,246,236,0.65)' }}>
          Projected <b style={{ color: '#FBF6EC' }}>{projectedViews.toLocaleString()}</b> monthly views · <b style={{ color: '#F4A261' }}>{formatMoney(yearlyEarnings)}</b>/yr
        </div>

        {/* Breakdown */}
        <div className="mt-7 rounded-[12px] p-5 font-mono text-[12px]" style={{ background: 'rgba(251,246,236,0.04)' }}>
          <div className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid rgba(251,246,236,0.08)' }}>
            <span style={{ opacity: 0.6 }}>Projected views</span>
            <span className="tabular-nums">{projectedViews.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid rgba(251,246,236,0.08)' }}>
            <span style={{ opacity: 0.6 }}>Qualified views (82%)</span>
            <span className="tabular-nums">{qualifiedViews.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid rgba(251,246,236,0.08)' }}>
            <span style={{ opacity: 0.6 }}>RPM applied</span>
            <span className="tabular-nums">${rpm.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span style={{ opacity: 0.6 }}>Bonus</span>
            <span className="tabular-nums" style={{ color: includeBonus ? '#F4A261' : 'rgba(251,246,236,0.5)' }}>
              {includeBonus ? '+20% applied' : 'Off'}
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <DataPill variant="tag">{formatMoney(yearlyEarnings)} / yr</DataPill>
          <DataPill variant="emphasis">{engagement.label}</DataPill>
        </div>

        <p className="mt-5 text-[12px] leading-[1.6]" style={{ color: 'rgba(251,246,236,0.55)' }}>
          Assumes each post reaches {engagement.reach}x your engaged audience organically.
        </p>
      </div>
    </form>
  )
}
