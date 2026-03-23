'use client'

import { useMemo, useState } from 'react'
import { trackEvent, trackCalculatorUsed } from '@/lib/analytics'

type CountryConfig = {
  code: string
  name: string
  rpmMin: number
  rpmMax: number
}

const countries: CountryConfig[] = [
  { code: 'US', name: 'United States', rpmMin: 0.7, rpmMax: 1.0 },
  { code: 'UK', name: 'United Kingdom', rpmMin: 0.6, rpmMax: 0.9 },
  { code: 'DE', name: 'Germany', rpmMin: 0.55, rpmMax: 0.85 },
  { code: 'FR', name: 'France', rpmMin: 0.5, rpmMax: 0.8 },
  { code: 'JP', name: 'Japan', rpmMin: 0.6, rpmMax: 0.95 },
  { code: 'KR', name: 'South Korea', rpmMin: 0.55, rpmMax: 0.9 },
  { code: 'MX', name: 'Mexico', rpmMin: 0.35, rpmMax: 0.6 },
  { code: 'BR', name: 'Brazil', rpmMin: 0.3, rpmMax: 0.55 },
]

const defaultMix: Record<string, number> = {
  US: 35, UK: 10, DE: 10, FR: 8, JP: 10, KR: 7, MX: 10, BR: 10,
}

export default function RpmByCountryCalculator() {
  const [views, setViews] = useState(250000)
  const [includeBonus, setIncludeBonus] = useState(false)
  const [mix, setMix] = useState<Record<string, number>>(defaultMix)
  const [lastCalculated, setLastCalculated] = useState<Date | null>(null)

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
    setLastCalculated(new Date())
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
      className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-md)] overflow-hidden"
    >
      <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
        {/* Inputs panel */}
        <div className="space-y-5 p-6 lg:p-8">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-ink)]">
              Monthly views
            </label>
            <input
              type="number"
              min={0}
              value={views}
              onChange={(event) => setViews(Number(event.target.value))}
              className="mt-2 h-12 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-inset)] px-4 font-[family-name:var(--font-mono)] text-right text-sm text-[var(--color-ink)] transition-shadow focus-visible:outline-none focus-visible:border-[var(--color-primary)] focus-visible:shadow-[var(--focus-ring-input)]"
            />
            <p className="mt-2 text-xs text-[var(--color-text-subtle)]">
              We assume 82% of views are qualified after eligibility.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--color-ink)]">
              Audience mix (%)
              {totalPercent !== 100 ? (
                <span className="ml-2 text-xs font-normal text-[var(--color-warning)]">
                  Total: {totalPercent}% — adjust to 100%
                </span>
              ) : (
                <span className="ml-2 text-xs font-normal text-[var(--color-success)]">
                  Total: 100%
                </span>
              )}
            </p>
            <div className="mt-3 grid gap-2.5 md:grid-cols-2">
              {countries.map((country) => (
                <label key={country.code} className="flex items-center justify-between gap-2 text-sm text-[var(--color-text)]">
                  <span className="min-w-0 truncate">{country.name}</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={mix[country.code] ?? 0}
                    onChange={(event) => handleMixChange(country.code, Number(event.target.value))}
                    className="h-9 w-20 flex-shrink-0 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-inset)] px-2 font-[family-name:var(--font-mono)] text-right text-sm text-[var(--color-ink)] focus-visible:outline-none focus-visible:border-[var(--color-primary)]"
                  />
                </label>
              ))}
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
            Calculate blended RPM
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
            Blended RPM range
          </p>
          <p className="mono-output mt-3 text-[1.75rem] lg:text-[2rem]">
            ${blended.min.toFixed(2)} – ${blended.max.toFixed(2)}
          </p>
          <div className="mt-5 space-y-3 border-t border-[var(--color-border)] pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-text-muted)]">Qualified views</span>
              <span className="font-[family-name:var(--font-mono)] font-semibold text-[var(--color-ink)]">
                {qualifiedViews.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-text-muted)]">Estimated earnings</span>
              <span className="font-[family-name:var(--font-mono)] font-semibold text-[var(--color-ink)]">
                ${earningsRange.min.toFixed(2)} – ${earningsRange.max.toFixed(2)}
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
            Blended RPM is weighted by your audience mix and typical country ranges.
          </p>
        </div>
      </div>
    </form>
  )
}
