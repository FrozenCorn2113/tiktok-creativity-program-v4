// RPM by Country page — Phase 6 TCP redesign
// Reference: /tmp/tcp-zip/directions/rpm-calc.jsx
// NOTE: All math/state preserved in RpmByCountryCalculator. Only chrome restyled.

import RpmByCountryCalculator from '@/components/RpmByCountryCalculator'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CalculatorNav } from '@/components/calculators/CalculatorNav'
import { EmailCapturePopup } from '@/components/email/email-capture-popup'
import { siteConfig } from '@/lib/site'
import {
  EyebrowLabel,
  ItalicWord,
  SectionMarker,
  DarkCallout,
  DataPill,
} from '@/components/tcp'

export const metadata: Metadata = {
  title: 'TikTok RPM by Country Estimator',
  description:
    'Compare TikTok Creator Rewards RPM rates by country. Model your blended RPM based on audience location and estimate monthly earnings.',
  openGraph: {
    title: 'TikTok RPM by Country Estimator',
    description:
      'Compare RPM rates by country. Understand how audience location affects your TikTok Creator Rewards earnings.',
    images: [
      {
        url: `/og?title=${encodeURIComponent('TikTok RPM by Country Estimator')}`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
    url: `${siteConfig.url}/calculators/rpm-by-country`,
  },
  alternates: {
    canonical: `${siteConfig.url}/calculators/rpm-by-country`,
  },
}

const rpmRows: { country: string; low: string; high: string; tier: 'Top' | 'High' | 'Mid' | 'Lower' }[] = [
  { country: 'United States', low: '$0.70', high: '$1.00', tier: 'Top' },
  { country: 'Japan', low: '$0.60', high: '$0.95', tier: 'Top' },
  { country: 'United Kingdom', low: '$0.60', high: '$0.90', tier: 'Top' },
  { country: 'South Korea', low: '$0.55', high: '$0.90', tier: 'High' },
  { country: 'Germany', low: '$0.55', high: '$0.85', tier: 'High' },
  { country: 'France', low: '$0.50', high: '$0.80', tier: 'Mid' },
  { country: 'Mexico', low: '$0.35', high: '$0.60', tier: 'Lower' },
  { country: 'Brazil', low: '$0.30', high: '$0.55', tier: 'Lower' },
]

export default function RpmByCountryPage() {
  return (
    <div className="bg-paper">
      <EmailCapturePopup
        leadMagnetTitle="RPM Optimization Guide"
        headline="Learn how to improve your RPM in your region"
        description="We will break down how audience location affects your RPM, which content niches earn most per view, and how to shift your numbers over time."
        itemCount="Free guide"
      />

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-[72px] md:pt-[88px] pb-10">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-ink-soft font-mono">
            <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
            <li className="text-line">/</li>
            <li><Link href="/calculators" className="hover:text-ink transition-colors">Calculators</Link></li>
            <li className="text-line">/</li>
            <li className="text-ink">RPM by Country</li>
          </ol>
        </nav>

        <EyebrowLabel className="mb-4 block">Calculators · 03 of 03 · RPM audit</EyebrowLabel>
        <h1 className="font-sans text-[44px] md:text-[72px] lg:text-[84px] leading-[0.98] tracking-[-0.04em] font-medium text-ink m-0 max-w-[1100px]">
          What RPM are you{' '}
          <ItalicWord color="#C2622A">actually getting?</ItalicWord>
        </h1>
        <p className="text-[18px] md:text-[19px] text-ink-soft mt-6 max-w-[720px] leading-[1.55]">
          Your audience location directly affects your earnings. Set your audience mix across eligible countries to calculate your blended RPM and estimated monthly payout.
        </p>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
          Updated Apr 2026
        </p>
      </section>

      {/* Calculator nav */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-6">
        <CalculatorNav currentCalculator="rpm-by-country" />
      </section>

      {/* Calculator tool */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <RpmByCountryCalculator />
      </section>

      {/* RPM reference table — SectionMarker i */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <SectionMarker numeral="i" heading="RPM ranges by country.">
          <div className="overflow-x-auto rounded-[20px] border border-line bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-soft/60">
                  <th className="text-left px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">Country</th>
                  <th className="text-right px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">RPM Low</th>
                  <th className="text-right px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">RPM High</th>
                  <th className="text-right px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rpmRows.map((row) => (
                  <tr key={row.country}>
                    <td className="px-5 py-3 text-[14px] text-ink">{row.country}</td>
                    <td className="px-5 py-3 text-right font-mono text-[13px] tabular-nums text-ink-soft">{row.low}</td>
                    <td className="px-5 py-3 text-right font-mono text-[13px] tabular-nums text-ink">{row.high}</td>
                    <td className="px-5 py-3 text-right">
                      <DataPill variant={row.tier === 'Top' ? 'emphasis' : row.tier === 'Lower' ? 'soft' : 'tag'}>
                        {row.tier}
                      </DataPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13px] text-ink-soft">
            RPM ranges based on creator-reported data for the Creator Rewards Program. Actual RPM varies by niche, content quality, and seasonal ad spend.
          </p>
        </SectionMarker>
      </section>

      {/* What affects RPM — SectionMarker ii */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <SectionMarker numeral="ii" heading="What moves RPM by country.">
          <div className="max-w-[760px] space-y-4 text-[15px] text-ink-soft leading-[1.7]">
            <p>
              RPM is not uniform. It varies by country based on <strong className="text-ink">advertiser demand</strong>, <strong className="text-ink">content category</strong>, and <strong className="text-ink">seasonal ad spend</strong> patterns. The US, UK, Japan, and Germany consistently show the highest RPMs in the Creator Rewards Program.
            </p>
            <p>
              Your audience mix determines your blended RPM. If 80% of your views come from the US but 20% come from Brazil, your effective RPM will be weighted accordingly. Creators who grow their audience in high-RPM markets typically see the biggest impact on earnings per qualified view.
            </p>
            <p>
              Content niche also plays a role within each country. Finance, technology, and educational content attracts higher advertiser bids across all markets. Entertainment and trending content tends to have lower RPMs regardless of region.
            </p>
          </div>
        </SectionMarker>
      </section>

      {/* Reality check */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <DarkCallout title="Geography is half the story." italic="Niche is the other.">
          A finance creator in Brazil still out-earns a gaming creator in the US on a per-view basis. Blended RPM tells you the ceiling your audience allows; niche tells you how close you&rsquo;ll actually get.
        </DarkCallout>
      </section>

      {/* Related — 2-up grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-20">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
          <h2 className="font-sans text-[28px] md:text-[32px] leading-[1.05] tracking-[-0.02em] font-medium text-ink m-0">
            Related <ItalicWord color="#C2622A">calculators and guides</ItalicWord>.
          </h2>
          <DataPill variant="soft">3 related</DataPill>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            {
              href: '/calculators/earnings-calculator',
              title: 'Earnings Calculator',
              desc: 'Estimate Creator Rewards payouts based on view count, RPM, and the Additional Reward bonus.',
              cta: 'Open calculator',
              tag: 'Calculator',
            },
            {
              href: '/calculators/follower-income-estimator',
              title: 'Follower Income Estimator',
              desc: 'Project earnings based on follower count, engagement rate, and monthly posting frequency.',
              cta: 'Open calculator',
              tag: 'Calculator',
            },
            {
              href: '/guides/optimize-rpm',
              title: 'How to Optimize Your RPM',
              desc: 'Actionable strategies to increase your revenue per 1,000 views across any niche.',
              cta: 'Read guide',
              tag: 'Guide',
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col rounded-[22px] border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-[3px] hover:border-brand-primaryDeep hover:shadow-[0_12px_32px_-18px_rgba(194,98,42,0.35)]"
            >
              <div className="mb-3">
                <DataPill variant="soft">{card.tag}</DataPill>
              </div>
              <h3 className="text-[18px] font-semibold text-ink tracking-[-0.01em]">{card.title}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-[1.6] text-ink-soft">{card.desc}</p>
              <span className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold text-brand-primaryDeep transition-transform duration-200 group-hover:translate-x-0.5">
                {card.cta} <span aria-hidden>&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
