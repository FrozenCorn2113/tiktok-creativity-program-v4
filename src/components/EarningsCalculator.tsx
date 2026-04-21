'use client'

import { useMemo, useState } from 'react'
import ComparisonTable from '@/components/ComparisonTable'
import { trackEvent, trackCalculatorUsed } from '@/lib/analytics'
import { DataPill } from '@/components/tcp'

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
      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        {/* Inputs — paper card */}
        <div className="bg-white rounded-[20px] border border-line p-7 md:p-9">
          <div className="flex items-baseline gap-3 mb-7">
            <span className="font-serif italic text-[40px] leading-none text-brand-primary" aria-hidden>
              i
            </span>
            <h2 className="font-sans text-[22px] tracking-[-0.02em] font-semibold m-0 text-ink">Your inputs</h2>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <label className="block font-sans text-[14px] font-medium text-ink mb-2">
                Video views
              </label>
              <input
                type="number"
                min={0}
                value={views}
                onChange={(event) => setViews(Number(event.target.value))}
                className="h-11 w-full rounded-[10px] border border-line bg-paper px-4 font-mono text-right text-[14px] text-ink focus-visible:outline-none focus-visible:border-ink transition-colors"
              />
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Qualified views estimated at 82% of total.
              </p>
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
              type="button"
              onClick={handleCalculate}
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-ink px-5 py-3.5 text-[14px] font-semibold text-paper transition-all duration-200 hover:bg-ink/90"
            >
              Update estimate
            </button>
            {lastCalculated ? (
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Last updated {lastCalculated.toLocaleTimeString()}
              </p>
            ) : null}
          </div>
        </div>

        {/* Results — dark ink card */}
        <div
          className="rounded-[20px] p-7 md:p-9 relative overflow-hidden"
          style={{ background: '#0F0E0C', color: '#FBF6EC' }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F4A261' }}>
            Estimated earnings
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
            ${totalEarnings.toFixed(2)}
          </div>

          <div className="mt-7 space-y-3 pt-5 font-mono text-[12px]" style={{ borderTop: '1px solid rgba(251,246,236,0.08)' }}>
            <div className="flex items-center justify-between">
              <span style={{ opacity: 0.6 }}>Qualified views</span>
              <span className="tabular-nums">{qualifiedViews.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ opacity: 0.6 }}>Base earnings</span>
              <span className="tabular-nums">${baseEarnings.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ opacity: 0.6 }}>Bonus applied</span>
              <span className="tabular-nums" style={{ color: includeBonus ? '#F4A261' : 'rgba(251,246,236,0.5)' }}>
                {includeBonus ? 'Yes (+20%)' : 'No'}
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <DataPill variant="tag">${(totalEarnings * 12).toFixed(0)} / yr</DataPill>
            <DataPill variant="emphasis">RPM ${rpm.toFixed(2)}</DataPill>
          </div>

          <p className="mt-5 text-[12px] leading-[1.6]" style={{ color: 'rgba(251,246,236,0.55)' }}>
            Estimate only. Actual payouts vary by country, content quality, and engagement.
          </p>
          <a
            href="/guides/optimize-rpm"
            className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold"
            style={{ color: '#F4A261' }}
          >
            How to improve your RPM &rarr;
          </a>
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
