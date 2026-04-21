// Countries page — Phase 7 TCP redesign
// Reference: /tmp/tcp-zip/directions/countries.jsx
// NOTE: Country list and RPM ranges sourced from the existing
// RpmByCountryCalculator dataset. Tiers are derived from the min-RPM band.
// No content invented. If richer country data lands later (deltas, population),
// extend the dataset here and render extra columns.

import Link from 'next/link'
import type { Metadata } from 'next'
import Script from 'next/script'
import { EyebrowLabel, ItalicWord } from '@/components/tcp'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'TikTok RPM by Country',
  description:
    'TikTok Creator Rewards RPM ranges by country. Compare what advertisers pay for qualified views across major markets.',
  openGraph: {
    title: 'TikTok RPM by Country',
    description:
      'Creator Rewards RPM ranges by country. Compare what advertisers pay for qualified views across major markets.',
    images: [
      {
        url: `/og?title=${encodeURIComponent('TikTok RPM by Country')}`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
    url: `${siteConfig.url}/countries`,
  },
  alternates: {
    canonical: `${siteConfig.url}/countries`,
  },
}

type Tier = 'A' | 'B' | 'C' | 'D'

type CountryRow = {
  code: string
  name: string
  rpmMin: number
  rpmMax: number
  tier: Tier
}

// Data mirrors src/components/RpmByCountryCalculator.tsx
const countries: CountryRow[] = [
  { code: 'US', name: 'United States', rpmMin: 0.7, rpmMax: 1.0, tier: 'A' },
  { code: 'UK', name: 'United Kingdom', rpmMin: 0.6, rpmMax: 0.9, tier: 'A' },
  { code: 'JP', name: 'Japan', rpmMin: 0.6, rpmMax: 0.95, tier: 'A' },
  { code: 'DE', name: 'Germany', rpmMin: 0.55, rpmMax: 0.85, tier: 'B' },
  { code: 'KR', name: 'South Korea', rpmMin: 0.55, rpmMax: 0.9, tier: 'B' },
  { code: 'FR', name: 'France', rpmMin: 0.5, rpmMax: 0.8, tier: 'B' },
  { code: 'MX', name: 'Mexico', rpmMin: 0.35, rpmMax: 0.6, tier: 'C' },
  { code: 'BR', name: 'Brazil', rpmMin: 0.3, rpmMax: 0.55, tier: 'C' },
]

const tierLabel: Record<Tier, string> = {
  A: 'Tier A · Top markets',
  B: 'Tier B · Strong',
  C: 'Tier C · Mid',
  D: 'Tier D · Volume',
}

const maxRpm = Math.max(...countries.map((c) => c.rpmMax))

export default function CountriesPage() {
  const tiers: Tier[] = ['A', 'B', 'C', 'D']
  const active = tiers.filter((t) => countries.some((c) => c.tier === t))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'TikTok RPM by Country',
    url: `${siteConfig.url}/countries`,
    numberOfItems: countries.length,
    itemListElement: countries.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      description: `RPM range $${c.rpmMin.toFixed(2)} – $${c.rpmMax.toFixed(2)}`,
    })),
  }

  return (
    <div className="bg-paper">
      <Script
        id="countries-jsonld"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-[64px] md:pt-[88px] pb-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-ink-soft font-mono">
            <li>
              <Link href="/" className="hover:text-ink transition-colors">
                Home
              </Link>
            </li>
            <li className="text-line">/</li>
            <li className="text-ink">Countries</li>
          </ol>
        </nav>

        <EyebrowLabel className="mb-4 block">Live · Creator Rewards · Q2 2026</EyebrowLabel>
        <h1 className="font-sans text-[44px] md:text-[64px] lg:text-[80px] leading-[0.98] tracking-[-0.04em] font-medium text-ink m-0 max-w-[1100px]">
          RPM by{' '}
          <ItalicWord color="#C2622A">country</ItalicWord>.
        </h1>
        <p className="text-[18px] text-ink-soft mt-5 max-w-[680px] leading-[1.55]">
          What advertisers actually pay for a qualified view, country by country.
          Ranges reflect creator-reported payouts across the eligible Creator
          Rewards markets.
        </p>
      </section>

      {/* Tier tables */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-10">
        {active.map((tier) => (
          <div key={tier} className="mb-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-primaryDeep mb-4 font-semibold">
              {tierLabel[tier]}
            </div>
            <div className="bg-white rounded-[20px] border border-line overflow-hidden">
              {countries
                .filter((c) => c.tier === tier)
                .map((c, idx, arr) => {
                  const mid = (c.rpmMin + c.rpmMax) / 2
                  return (
                    <div
                      key={c.code}
                      className={`grid grid-cols-[48px_1.4fr_1.2fr_2fr] md:grid-cols-[60px_2fr_1.2fr_2fr] items-center gap-3 md:gap-6 px-5 md:px-7 py-4 md:py-5 ${
                        idx !== arr.length - 1 ? 'border-b border-line' : ''
                      }`}
                    >
                      <div className="font-mono text-[13px] font-semibold text-ink">
                        {c.code}
                      </div>
                      <div className="text-[14px] md:text-[15px] font-semibold text-ink">
                        {c.name}
                      </div>
                      <div className="font-mono text-[14px] md:text-[15px] tabular-nums font-semibold text-ink">
                        ${c.rpmMin.toFixed(2)}
                        <span className="text-ink-soft"> – </span>$
                        {c.rpmMax.toFixed(2)}
                      </div>
                      <div
                        className="hidden md:flex items-center gap-3"
                        aria-hidden="true"
                      >
                        <div className="flex-1 h-[6px] bg-soft rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-primary"
                            style={{ width: `${(mid / maxRpm) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        ))}
      </section>

      {/* Methodology note */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-20">
        <p className="max-w-[760px] text-[14px] text-ink-soft leading-[1.7]">
          RPM ranges reflect creator-reported payouts. Actual RPM varies by
          niche, content quality, and seasonal ad spend. For a blended estimate
          based on your audience mix, use the{' '}
          <Link
            href="/calculators/rpm-by-country"
            className="text-brand-primaryDeep font-semibold hover:underline"
          >
            RPM by Country calculator
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
