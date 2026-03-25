'use client'

import { useMemo, useState } from 'react'
import { trackEvent, trackCalculatorUsed } from '@/lib/analytics'
import { Globe, TrendingUp, Info } from 'lucide-react'

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
    <form
      onSubmit={handleCalculate}
      className="rounded-2xl border border-border-default bg-white shadow-lg overflow-hidden"
    >
      <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
        {/* Inputs panel */}
        <div className="space-y-4 p-5 lg:p-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-1.5 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" aria-hidden />
              Monthly views
            </label>
            <input
              type="number"
              min={0}
              value={views}
              onChange={(event) => setViews(Number(event.target.value))}
              className="h-10 w-full rounded-lg border border-border-default bg-background-surface px-3 font-[family-name:var(--font-mono)] text-right text-sm text-brand-ink transition-shadow focus-visible:outline-none focus-visible:border-brand-primary focus-visible:shadow-[0_0_0_3px_rgba(249,115,22,0.1)]"
            />
            <p className="mt-1 text-[11px] text-text-muted">
              82% assumed qualified after eligibility.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                Audience mix (%)
              </p>
              {totalPercent !== 100 ? (
                <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-0.5">
                  {totalPercent}% total
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-green-600 bg-green-50 rounded-full px-2 py-0.5">
                  100%
                </span>
              )}
            </div>
            <div className="grid gap-1.5">
              {countries.map((country) => (
                <label key={country.code} className="flex items-center justify-between gap-2 text-sm text-brand-ink bg-background-surface rounded-lg px-3 py-1.5 border border-border-default">
                  <span className="text-xs font-medium">{country.name}</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={mix[country.code] ?? 0}
                      onChange={(event) => handleMixChange(country.code, Number(event.target.value))}
                      className="h-7 w-14 flex-shrink-0 rounded-md border border-border-default bg-white px-2 font-[family-name:var(--font-mono)] text-right text-xs text-brand-ink focus-visible:outline-none focus-visible:border-brand-primary"
                    />
                    <span className="text-[10px] text-text-muted w-3">%</span>
                  </div>
                </label>
              ))}
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
            Calculate blended RPM
          </button>
        </div>

        {/* Results panel */}
        <div className="border-t border-border-default bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 lg:border-t-0 lg:border-l lg:border-l-slate-700 lg:p-6 text-white">
          {/* Blended RPM */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center">
              <Globe className="h-3.5 w-3.5 text-slate-300" aria-hidden />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Blended RPM Range
              </p>
              <p className="text-base font-bold text-white tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
                ${blended.min.toFixed(2)} - ${blended.max.toFixed(2)}
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
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-3xl lg:text-[2.25rem] font-bold text-emerald-400 tabular-nums whitespace-nowrap" style={{ fontFamily: 'var(--font-mono)' }}>
                {formatMoney(earningsRange.min)}
              </span>
              <span className="text-lg text-slate-500 font-medium mx-0.5">-</span>
              <span className="text-3xl lg:text-[2.25rem] font-bold text-emerald-400 tabular-nums whitespace-nowrap" style={{ fontFamily: 'var(--font-mono)' }}>
                {formatMoney(earningsRange.max)}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1.5 tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
              {formatMoney(earningsRange.min * 12)} - {formatMoney(earningsRange.max * 12)} / year
            </p>
          </div>

          {/* Breakdown */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs">Qualified views</span>
              <span className="font-semibold text-white text-xs tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
                {qualifiedViews.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs">Audience coverage</span>
              <span className="font-semibold text-xs tabular-nums" style={{ fontFamily: 'var(--font-mono)', color: totalPercent === 100 ? '#34d399' : '#fbbf24' }}>
                {totalPercent}%
              </span>
            </div>
            {includeBonus && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">Additional Reward</span>
                <span className="font-semibold text-emerald-400 text-xs">+20% applied</span>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-lg bg-white/[0.05] border border-white/10 p-2.5">
            <div className="flex gap-2">
              <Info className="h-3.5 w-3.5 text-slate-500 flex-shrink-0 mt-0.5" aria-hidden />
              <p className="text-[11px] text-slate-400 leading-[1.5]">
                Blended RPM is weighted by your audience mix. Adjust percentages to match your analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
