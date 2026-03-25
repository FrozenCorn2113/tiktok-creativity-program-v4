'use client'

import { useMemo, useState } from 'react'
import ComparisonTable from '@/components/ComparisonTable'
import { trackEvent, trackCalculatorUsed } from '@/lib/analytics'

const comparisonRows = [
  { cells: ['10,000', '$4 – $10', 'Needs 100K views in last 30 days'] },
  { cells: ['100,000', '$40 – $100', 'Typical first payout range'] },
  { cells: ['1,000,000', '$400 – $1,000', 'Average RPM baseline'] },
]

export default function EarningsCalculator() {
  const [views, setViews] = useState(100000)
  const [rpm, setRpm] = useState(0.7)
  const [includeBonus, setIncludeBonus] = useState(false)
  const [lastCalculated, setLastCalculated] = useState<Date | null>(null)

  const qualifiedViews = useMemo(() => Math.round(views * 0.82), [views])
  const baseEarnings = useMemo(() => (qualifiedViews / 1000) * rpm, [qualifiedViews, rpm])
  const bonusMultiplier = includeBonus ? 1.2 : 1
  const totalEarnings = baseEarnings * bonusMultiplier

  const handleCalculate = () => {
    setLastCalculated(new Date())
    trackEvent({
      action: 'calculator_use',
      category: 'tools',
      label: 'earnings_calculator',
      value: views,
    })
    trackCalculatorUsed('earnings_calculator', { views, rpm, includeBonus })
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-md)] overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1.3fr_1fr]">
          {/* Inputs panel */}
          <div className="space-y-5 p-6 lg:p-8">
            <div>
              <label className="block text-sm font-semibold text-[var(--color-ink)]">
                Video views
              </label>
              <input
                type="number"
                min={0}
                value={views}
                onChange={(event) => setViews(Number(event.target.value))}
                className="mt-2 h-12 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-inset)] px-4 font-[family-name:var(--font-mono)] text-right text-sm text-[var(--color-ink)] transition-shadow focus-visible:outline-none focus-visible:border-[var(--color-primary)] focus-visible:shadow-[var(--focus-ring-input)]"
              />
              <p className="mt-2 text-xs text-[var(--color-text-subtle)]">
                We estimate qualified views at 82% of total based on typical Creator Rewards reports.
              </p>
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
              type="button"
              onClick={handleCalculate}
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-3 text-[0.9375rem] font-semibold text-[var(--color-ink-strong)] transition-all duration-200 hover:bg-[var(--color-primary-hover)] hover:shadow-[var(--shadow-sm)] active:scale-95"
            >
              Update estimate
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
              Estimated earnings
            </p>
            <p className="mono-output mt-3 text-[2rem] lg:text-[2.5rem]">
              ${totalEarnings.toFixed(2)}
            </p>
            <div className="mt-5 space-y-3 border-t border-[var(--color-border)] pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Qualified views</span>
                <span className="font-[family-name:var(--font-mono)] font-semibold text-[var(--color-ink)]">
                  {qualifiedViews.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Base earnings</span>
                <span className="font-[family-name:var(--font-mono)] font-semibold text-[var(--color-ink)]">
                  ${baseEarnings.toFixed(2)}
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
              Estimate only. Actual payouts vary by country, content quality, and engagement.
            </p>
            <a
              href="/guides/optimize-rpm"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] hover:underline"
            >
              How to improve your RPM &rarr;
            </a>
          </div>
        </div>
      </div>

      <ComparisonTable
        caption="Estimated earnings by view count"
        columns={['Views', 'Estimated earnings', 'Notes']}
        rows={comparisonRows}
      />
    </div>
  )
}
