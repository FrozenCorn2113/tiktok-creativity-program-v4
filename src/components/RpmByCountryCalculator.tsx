'use client'

import { useMemo, useState } from 'react'
import { trackEvent, trackCalculatorUsed } from '@/lib/analytics'
import { DataPill } from '@/components/tcp'

type CountryConfig = {
  code: string
  name: string
  flag: string
  rpmMin: number
  rpmMax: number
}

const countries: CountryConfig[] = [
  { code: 'US', name: 'United States', flag: 'US', rpmMin: 0.7, rpmMax: 1.0 },
  { code: 'UK', name: 'United Kingdom', flag: 'UK', rpmMin: 0.6, rpmMax: 0.9 },
  { code: 'DE', name: 'Germany', flag: 'DE', rpmMin: 0.55, rpmMax: 0.85 },
  { code: 'FR', name: 'France', flag: 'FR', rpmMin: 0.5, rpmMax: 0.8 },
  { code: 'JP', name: 'Japan', flag: 'JP', rpmMin: 0.6, rpmMax: 0.95 },
  { code: 'KR', name: 'South Korea', flag: 'KR', rpmMin: 0.55, rpmMax: 0.9 },
  { code: 'MX', name: 'Mexico', flag: 'MX', rpmMin: 0.35, rpmMax: 0.6 },
  { code: 'BR', name: 'Brazil', flag: 'BR', rpmMin: 0.3, rpmMax: 0.55 },
]

const defaultMix: Record<string, number> = {
  US: 35, UK: 10, DE: 10, FR: 8, JP: 10, KR: 7, MX: 10, BR: 10,
}

function formatMoney(n: number): string {
  if (n >= 10000) return `$${(n / 1000).toFixed(0)}K`
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`
  return `$${n.toFixed(2)}`
}

export default function RpmByCountryCalculator() {
  const [views, setViews] = useState(250000)
  const [includeBonus, setIncludeBonus] = useState(false)
  const [mix, setMix] = useState<Record<string, number>>(defaultMix)

  const totalPercent = useMemo(
    () => Object.values(mix).reduce((sum, value) => sum + value, 0),
    [mix],
  )

  const qualifiedViews = useMemo(() => Math.round(views * 0.82), [views])
  const bonusMultiplier = includeBonus ? 1.2 : 1

  const blended = useMemo(() => {
    const weightedMin = countries.reduce(
      (sum, country) => sum + (country.rpmMin * (mix[country.code] ?? 0)) / 100,
      0,
    )
    const weightedMax = countries.reduce(
      (sum, country) => sum + (country.rpmMax * (mix[country.code] ?? 0)) / 100,
      0,
    )
    return { min: weightedMin, max: weightedMax }
  }, [mix])

  const earningsRange = useMemo(() => {
    const min = (qualifiedViews / 1000) * blended.min * bonusMultiplier
    const max = (qualifiedViews / 1000) * blended.max * bonusMultiplier
    return { min, max }
  }, [qualifiedViews, blended, bonusMultiplier])

  const handleMixChange = (code: string, value: number) => {
    setMix((prev) => ({ ...prev, [code]: value }))
  }

  const handleCalculate = (event: React.FormEvent) => {
    event.preventDefault()
    trackEvent({
      action: 'calculator_use',
      category: 'tools',
      label: 'rpm_by_country',
      value: views,
    })
    trackCalculatorUsed('rpm_by_country', { views, includeBonus })
  }

  return (
    <form onSubmit={handleCalculate} className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      {/* Inputs — paper card */}
      <div className="bg-white rounded-[20px] border border-line p-7 md:p-9">
        <div className="flex items-baseline gap-3 mb-7">
          <span className="font-serif italic text-[40px] leading-none text-brand-primary" aria-hidden>
            i
          </span>
          <h2 className="font-sans text-[22px] tracking-[-0.02em] font-semibold m-0 text-ink">Your numbers</h2>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block font-sans text-[14px] font-medium text-ink mb-2">
              Monthly views
            </label>
            <input
              type="number"
              min={0}
              value={views}
              onChange={(event) => setViews(Number(event.target.value))}
              className="h-11 w-full rounded-[10px] border border-line bg-paper px-4 font-mono text-right text-[14px] text-ink focus-visible:outline-none focus-visible:border-ink transition-colors"
            />
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              82% assumed qualified after eligibility.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-sans text-[14px] font-medium text-ink">
                Audience mix
              </p>
              <DataPill variant={totalPercent === 100 ? 'tag' : 'soft'}>
                {totalPercent}% total
              </DataPill>
            </div>
            <div className="grid gap-2">
              {countries.map((country) => (
                <label
                  key={country.code}
                  className="flex items-center justify-between gap-3 text-[14px] text-ink bg-paper rounded-[10px] px-3.5 py-2 border border-line"
                >
                  <span className="text-[13px] font-medium">{country.name}</span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={mix[country.code] ?? 0}
                      onChange={(event) => handleMixChange(country.code, Number(event.target.value))}
                      className="h-8 w-14 flex-shrink-0 rounded-md border border-line bg-white px-2 font-mono text-right text-[12px] tabular-nums text-ink focus-visible:outline-none focus-visible:border-ink"
                    />
                    <span className="font-mono text-[10px] text-ink-soft">%</span>
                  </div>
                </label>
              ))}
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
            Calculate blended RPM
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
            fontSize: 'clamp(48px, 7vw, 88px)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            fontWeight: 400,
          }}
        >
          {formatMoney(earningsRange.min)}<span style={{ color: 'rgba(251,246,236,0.35)' }}> – </span>{formatMoney(earningsRange.max)}
        </div>
        <div className="mt-4 text-[14px]" style={{ color: 'rgba(251,246,236,0.65)' }}>
          Blended RPM <b style={{ color: '#F4A261' }}>${blended.min.toFixed(2)} – ${blended.max.toFixed(2)}</b> · {formatMoney(earningsRange.min * 12)}–{formatMoney(earningsRange.max * 12)}/yr
        </div>

        {/* Breakdown */}
        <div className="mt-7 rounded-[12px] p-5 font-mono text-[12px]" style={{ background: 'rgba(251,246,236,0.04)' }}>
          <div className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid rgba(251,246,236,0.08)' }}>
            <span style={{ opacity: 0.6 }}>Qualified views</span>
            <span className="tabular-nums">{qualifiedViews.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid rgba(251,246,236,0.08)' }}>
            <span style={{ opacity: 0.6 }}>Audience coverage</span>
            <span className="tabular-nums" style={{ color: totalPercent === 100 ? '#F4A261' : 'rgba(251,246,236,0.7)' }}>
              {totalPercent}%
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid rgba(251,246,236,0.08)' }}>
            <span style={{ opacity: 0.6 }}>Blended RPM range</span>
            <span className="tabular-nums">${blended.min.toFixed(2)} – ${blended.max.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span style={{ opacity: 0.6 }}>Bonus</span>
            <span className="tabular-nums" style={{ color: includeBonus ? '#F4A261' : 'rgba(251,246,236,0.5)' }}>
              {includeBonus ? '+20% applied' : 'Off'}
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <DataPill variant="tag">{formatMoney(earningsRange.min)}–{formatMoney(earningsRange.max)}/mo</DataPill>
          <DataPill variant="emphasis">{formatMoney(qualifiedViews)} qualified</DataPill>
        </div>

        <p className="mt-5 text-[12px] leading-[1.6]" style={{ color: 'rgba(251,246,236,0.55)' }}>
          Blended RPM is weighted by your audience mix. Adjust percentages to match your analytics.
        </p>
      </div>
    </form>
  )
}
