'use client'

import { useMemo, useState } from 'react'
import { trackEvent, trackCalculatorUsed } from '@/lib/analytics'

const engagementOptions = [
  { label: 'Low (2%)', value: 0.02, reach: 2.5 },
  { label: 'Medium (5%)', value: 0.05, reach: 3 },
  { label: 'High (8%)', value: 0.08, reach: 3.5 },
]

export default function FollowerIncomeEstimator() {
  const [followers, setFollowers] = useState(12000)
  const [postsPerMonth, setPostsPerMonth] = useState(12)
  const [rpm, setRpm] = useState(0.7)
  const [engagement, setEngagement] = useState(engagementOptions[1])
  const [includeBonus, setIncludeBonus] = useState(false)
  const [lastCalculated, setLastCalculated] = useState<Date | null>(null)

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

  const handleCalculate = (event: React.FormEvent) => {
    event.preventDefault()
    setLastCalculated(new Date())
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
      className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-md)] overflow-hidden"
    >
      <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
        {/* Inputs panel */}
        <div className="space-y-5 p-6 lg:p-8">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-ink)]">
              Current followers
            </label>
            <input
              type="number"
              min={0}
              value={followers}
              onChange={(event) => setFollowers(Number(event.target.value))}
              className="mt-2 h-12 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-inset)] px-4 font-[family-name:var(--font-mono)] text-right text-sm text-[var(--color-ink)] transition-shadow focus-visible:outline-none focus-visible:border-[var(--color-primary)] focus-visible:shadow-[var(--focus-ring-input)]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--color-ink)]">
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
              className="mt-2 h-12 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-inset)] px-4 text-sm text-[var(--color-ink)] focus-visible:outline-none focus-visible:border-[var(--color-primary)]"
            >
              {engagementOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--color-ink)]">
              Posts per month
            </label>
            <input
              type="number"
              min={1}
              value={postsPerMonth}
              onChange={(event) => setPostsPerMonth(Number(event.target.value))}
              className="mt-2 h-12 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-inset)] px-4 font-[family-name:var(--font-mono)] text-right text-sm text-[var(--color-ink)] transition-shadow focus-visible:outline-none focus-visible:border-[var(--color-primary)] focus-visible:shadow-[var(--focus-ring-input)]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--color-ink)]">
              Estimated RPM{' '}
              <span className="font-[family-name:var(--font-mono)] font-normal text-[var(--color-text-muted)]">
                ${rpm.toFixed(2)}
              </span>
            </label>
            <input
              type="range"
              min={0.4}
              max={1}
              step={0.01}
              value={rpm}
              onChange={(event) => setRpm(Number(event.target.value))}
              className="mt-3 w-full accent-[var(--color-primary)]"
            />
            <div className="mt-2 flex justify-between text-xs text-[var(--color-text-subtle)]">
              <span>$0.40</span>
              <span>$1.00+</span>
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              checked={includeBonus}
              onChange={(event) => setIncludeBonus(event.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-[var(--color-border)] accent-[var(--color-primary)]"
            />
            Include Additional Reward bonus (+20%)
          </label>

          <button
            type="submit"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-3 text-[0.9375rem] font-semibold text-[var(--color-ink-strong)] transition-all duration-200 hover:bg-[var(--color-primary-hover)] hover:shadow-[var(--shadow-sm)] active:scale-95"
          >
            Calculate earnings
          </button>
          {lastCalculated ? (
            <p className="text-xs text-[var(--color-text-subtle)]">
              Last updated {lastCalculated.toLocaleTimeString()}
            </p>
          ) : null}
        </div>

        {/* Results panel */}
        <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-warm)] p-6 lg:border-t-0 lg:border-l lg:p-8">
          <p className="text-[0.75rem] font-semibold uppercase tracking-wide text-[var(--color-text-subtle)]">
            Estimated monthly earnings
          </p>
          <p className="mono-output mt-3 text-[2rem] lg:text-[2.5rem]">
            ${earnings.toFixed(2)}
          </p>
          <div className="mt-5 space-y-3 border-t border-[var(--color-border)] pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-text-muted)]">Projected views</span>
              <span className="font-[family-name:var(--font-mono)] font-semibold text-[var(--color-ink)]">
                {projectedViews.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-text-muted)]">Qualified views</span>
              <span className="font-[family-name:var(--font-mono)] font-semibold text-[var(--color-ink)]">
                {qualifiedViews.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-text-muted)]">Bonus applied</span>
              <span className="font-semibold text-[var(--color-ink)]">
                {includeBonus ? 'Yes (+20%)' : 'No'}
              </span>
            </div>
          </div>
          <p className="mt-4 text-xs text-[var(--color-text-subtle)] leading-[1.6]">
            Assumes each post reaches {engagement.reach}× your engaged audience.
          </p>
        </div>
      </div>
    </form>
  )
}
