// Follower Income Estimator page — Phase 6 TCP redesign
// Reference: /tmp/tcp-zip/directions/follower-calc.jsx
// NOTE: All math/state preserved in FollowerIncomeEstimator. Only chrome restyled.

import FollowerIncomeEstimator from '@/components/FollowerIncomeEstimator'
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
  title: 'TikTok Follower Income Estimator',
  description:
    'Estimate monthly TikTok Creator Rewards income based on your follower count, engagement rate, and posting frequency.',
  openGraph: {
    title: 'TikTok Follower Income Estimator',
    description:
      'Model your TikTok earnings based on followers, engagement, and posting frequency.',
    images: [
      {
        url: `/og?title=${encodeURIComponent('TikTok Follower Income Estimator')}`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
    url: `${siteConfig.url}/calculators/follower-income-estimator`,
  },
  alternates: {
    canonical: `${siteConfig.url}/calculators/follower-income-estimator`,
  },
}

export default function FollowerIncomeEstimatorPage() {
  return (
    <div className="bg-paper">
      <EmailCapturePopup
        leadMagnetTitle="Follower Income Guide"
        headline="Want to know what your followers are actually worth?"
        description="We will explain what your estimated earnings mean, how engagement rate affects income, and which moves have the biggest impact on your payout."
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
            <li className="text-ink">Follower Income Estimator</li>
          </ol>
        </nav>

        <EyebrowLabel className="mb-4 block">Calculators · 02 of 03 · Follower target</EyebrowLabel>
        <h1 className="font-sans text-[44px] md:text-[72px] lg:text-[84px] leading-[0.98] tracking-[-0.04em] font-medium text-ink m-0 max-w-[1100px]">
          How much can your followers{' '}
          <ItalicWord color="#C2622A">actually earn?</ItalicWord>
        </h1>
        <p className="text-[18px] md:text-[19px] text-ink-soft mt-6 max-w-[720px] leading-[1.55]">
          Enter your followers, engagement rate, and posting frequency to see estimated Creator Rewards earnings based on projected qualified views.
        </p>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
          Updated Apr 2026
        </p>
      </section>

      {/* Calculator nav */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-6">
        <CalculatorNav currentCalculator="follower-income-estimator" />
      </section>

      {/* Calculator tool */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <FollowerIncomeEstimator />
      </section>

      {/* How the estimate works — SectionMarker i */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <SectionMarker numeral="i" heading="How the estimate is built.">
          <div className="max-w-[760px] space-y-4 text-[15px] text-ink-soft leading-[1.7]">
            <p>
              This calculator models your earnings using three variables: <strong className="text-ink">follower count</strong>, <strong className="text-ink">engagement rate</strong>, and <strong className="text-ink">posting frequency</strong>. It estimates how many views your content will generate, then applies your RPM to calculate monthly earnings.
            </p>
            <p>
              Engagement rate has the biggest impact. A creator with 20K highly-engaged followers often earns more than one with 100K passive followers because qualified views depend on completion rate and organic reach, not raw follower numbers.
            </p>
            <p>
              Posting frequency increases your monthly view ceiling, but only if each video meets the 1+ minute qualified content threshold. Posting more shorter videos does not help since those views do not count toward Creator Rewards earnings.
            </p>
          </div>
        </SectionMarker>
      </section>

      {/* What moves the number — SectionMarker ii */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <SectionMarker numeral="ii" heading="What moves the number.">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                symbol: '%',
                title: 'Engagement rate',
                body: 'Higher engagement means more of your followers actually see and watch your content. Even a 1% improvement can significantly change your monthly views.',
              },
              {
                symbol: '$',
                title: 'RPM (Revenue Per Mille)',
                body: 'RPM varies from $0.35 (gaming, comedy) to $1.00+ (finance, education). Your niche is the single biggest factor in how much each view is worth.',
              },
              {
                symbol: '⦿',
                title: 'Audience location',
                body: 'Views from the US, UK, and Germany pay the most. If most of your followers are in lower-RPM regions, your effective earnings per view will be lower.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-[20px] border border-line p-6"
              >
                <div className="font-serif italic text-[32px] leading-none text-brand-primary mb-3">
                  {card.symbol}
                </div>
                <div className="text-[16px] font-semibold text-ink mb-2 tracking-[-0.01em]">{card.title}</div>
                <p className="text-[14px] text-ink-soft leading-[1.6]">{card.body}</p>
              </div>
            ))}
          </div>
        </SectionMarker>
      </section>

      {/* Reality check */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <DarkCallout title="Followers are not the point." italic="Qualified views are.">
          The Creator Rewards Program pays on qualified views, not on audience size. Treat follower count as a proxy for reach, not as a revenue metric — two creators with identical follower counts can earn radically different payouts.
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
              href: '/calculators/rpm-by-country',
              title: 'RPM by Country',
              desc: 'Compare typical RPM ranges by country and model weighted earnings based on your audience mix.',
              cta: 'Open calculator',
              tag: 'Calculator',
            },
            {
              href: '/guides/grow-5k-to-10k',
              title: 'Growing from 5K to 10K',
              desc: 'Strategies for hitting the Creator Rewards eligibility threshold faster.',
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
