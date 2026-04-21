// Earnings Calculator page — Phase 6 TCP redesign
// Reference: /tmp/tcp-zip/directions/calculator.jsx
// NOTE: All math, state, inputs, outputs preserved in EarningsComparisonCalculator.
// Only page chrome + component visual wrappers restyled.

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { EarningsComparisonCalculator } from '@/components/sections/earnings-comparison-calculator'
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
  title: 'TikTok Creativity Program Earnings Calculator',
  description:
    'Free TikTok earnings calculator. Estimate monthly and yearly Creator Rewards Program payouts by niche, views per video, and posting frequency.',
  keywords: [
    'tiktok earnings calculator',
    'tiktok creativity program calculator',
    'tiktok creator rewards calculator',
    'tiktok rpm calculator',
    'tiktok money calculator',
  ],
  openGraph: {
    title: 'TikTok Creativity Program Earnings Calculator',
    description:
      'Estimate monthly and yearly TikTok Creator Rewards earnings by niche, views, and posting frequency.',
    images: [
      {
        url: `/og?title=${encodeURIComponent('TikTok Earnings Calculator')}`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
    url: `${siteConfig.url}/calculators/earnings-calculator`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok Creativity Program Earnings Calculator',
    description:
      'Free calculator with niche-specific RPM data. Estimate your TikTok Creator Rewards earnings.',
  },
  alternates: {
    canonical: `${siteConfig.url}/calculators/earnings-calculator`,
  },
}

// JSON-LD: WebApplication schema for tool pages
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TikTok Creativity Program Earnings Calculator',
  description:
    'Free calculator to estimate TikTok Creator Rewards Program earnings by niche, views, and posting frequency.',
  url: `${siteConfig.url}/calculators/earnings-calculator`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  creator: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteConfig.url,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Calculators',
      item: `${siteConfig.url}/calculators`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Earnings Calculator',
      item: `${siteConfig.url}/calculators/earnings-calculator`,
    },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does TikTok pay per 1,000 views?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Creator Rewards Program pays $0.40 to $1.00 per 1,000 qualified views depending on niche and audience geography. Finance and education content earns the most.',
      },
    },
    {
      '@type': 'Question',
      name: 'What RPM should I expect on TikTok?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RPM varies by niche: Finance and education content earns $0.60-$1.00 per 1,000 views, while entertainment and comedy typically earn $0.35-$0.70. Geography matters too, US, UK, and Germany have the highest rates.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are qualified views on TikTok?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Qualified views are organic views from the For You Page on videos 1 minute or longer. Duets, Stitches, Photo Mode, and paid promotion views do not count. Most creators see 70-90% of total views qualify.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much can you make with 1 million views on TikTok?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With 1 million qualified views on the Creator Rewards Program, you can expect $400-$1,000 depending on your niche. With the Additional Reward bonus, this can reach up to $1,200.',
      },
    },
  ],
}

const faqs = [
  {
    q: 'How much does TikTok pay per 1,000 views?',
    a: 'The Creator Rewards Program pays $0.40 to $1.00 per 1,000 qualified views depending on your niche and audience geography. Finance and education content earns on the higher end.',
  },
  {
    q: 'What RPM should I expect?',
    a: "Use the niche selector above to see RPM ranges for your content type. Finance and education earn the most ($0.60-$1.00). Entertainment and comedy are lower ($0.35-$0.70). Your country matters too, US, UK, and Germany have the highest advertiser demand.",
  },
  {
    q: 'Why are qualified views lower than total views?',
    a: "TikTok only counts organic FYP views on videos 1 minute or longer. Duets, Stitches, Photo Mode, and paid promotion views don't qualify. Most creators see 70-90% of total views qualify. We use 82% as a typical baseline.",
  },
  {
    q: 'What is the Additional Reward bonus?',
    a: "A bonus of up to 20% on top of base earnings for content that meets TikTok's quality and engagement thresholds. Consistent 1+ minute videos with high completion rates earn it most reliably. Toggle it on in the calculator to see the impact.",
  },
  {
    q: 'How much can I make with 1 million views?',
    a: 'With 1 million qualified views on the Creator Rewards Program, expect $400-$1,000 depending on niche. With the +20% bonus, up to $1,200. Use the calculator above to model your specific scenario.',
  },
  {
    q: 'Does follower count affect earnings?',
    a: 'No. The Creator Rewards Program pays based on qualified views and RPM, not follower count. A creator with 20K followers posting quality 1-minute videos can earn more than a creator with 500K followers posting short clips.',
  },
  {
    q: 'Are these estimates guaranteed?',
    a: 'No. This calculator uses average RPM ranges based on creator-reported data and publicly available information. Your actual earnings will vary based on content quality, audience geography, engagement patterns, and TikTok algorithms. Use it to model scenarios.',
  },
]

export default function EarningsCalculatorPage() {
  return (
    <div className="bg-paper">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Exit intent popup */}
      <EmailCapturePopup
        leadMagnetTitle="Earnings Calculator Results Guide"
        headline="Get a breakdown of what your numbers actually mean"
        description="We will explain what your estimated earnings mean, how to improve your RPM, and which variables have the biggest impact on your payout."
        itemCount="Free guide"
      />

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-[72px] md:pt-[88px] pb-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-ink-soft font-mono">
            <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
            <li className="text-line">/</li>
            <li><Link href="/calculators" className="hover:text-ink transition-colors">Calculators</Link></li>
            <li className="text-line">/</li>
            <li className="text-ink">Earnings Calculator</li>
          </ol>
        </nav>

        <EyebrowLabel className="mb-4 block">Calculators · 01 of 03 · Earnings</EyebrowLabel>
        <h1 className="font-sans text-[44px] md:text-[72px] lg:text-[84px] leading-[0.98] tracking-[-0.04em] font-medium text-ink m-0 max-w-[1100px]">
          What will TikTok actually pay you?{' '}
          <ItalicWord color="#C2622A">Run the numbers.</ItalicWord>
        </h1>
        <p className="text-[18px] md:text-[19px] text-ink-soft mt-6 max-w-[720px] leading-[1.55]">
          Estimate your monthly and yearly Creator Rewards earnings. Select your niche, set your average views, and see what your content could earn.
        </p>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
          Updated Apr 2026
        </p>
      </section>

      {/* Calculator nav */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-6">
        <CalculatorNav currentCalculator="earnings-calculator" />
      </section>

      {/* Calculator tool */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <EarningsComparisonCalculator />
      </section>

      {/* Earnings at a glance — SectionMarker i */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <SectionMarker numeral="i" heading="Earnings at a glance.">
          <div className="overflow-x-auto rounded-[20px] border border-line bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-soft/60">
                  <th className="text-left px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">Monthly Views</th>
                  <th className="text-right px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">Low</th>
                  <th className="text-right px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">High</th>
                  <th className="text-right px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">Per Year (High)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {[
                  { views: '10,000', low: '$3.28', high: '$8.20', yearly: '$98' },
                  { views: '100,000', low: '$33', high: '$82', yearly: '$984' },
                  { views: '500,000', low: '$164', high: '$410', yearly: '$4,920' },
                  { views: '1,000,000', low: '$328', high: '$820', yearly: '$9,840' },
                  { views: '5,000,000', low: '$1,640', high: '$4,100', yearly: '$49,200' },
                ].map((row) => (
                  <tr key={row.views}>
                    <td className="px-5 py-3 font-mono text-[13px] tabular-nums text-ink">{row.views}</td>
                    <td className="px-5 py-3 text-right font-mono text-[13px] tabular-nums text-ink-soft">{row.low}</td>
                    <td className="px-5 py-3 text-right font-mono text-[13px] tabular-nums text-ink">{row.high}</td>
                    <td className="px-5 py-3 text-right font-mono text-[13px] tabular-nums text-ink">{row.yearly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13px] text-ink-soft">
            Based on qualified views (82% of total) at General/Entertainment RPM ($0.40-$1.00). Finance and education niches earn more.
          </p>
        </SectionMarker>
      </section>

      {/* What affects your earnings — SectionMarker ii */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <SectionMarker numeral="ii" heading="What affects your earnings.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'Your RPM',
                body: 'RPM varies by country, niche, content length, and viewer behavior. US, UK, and Germany see the highest rates ($0.50-$1.20).',
                href: '/guides/optimize-rpm',
                cta: 'How to improve your RPM',
              },
              {
                title: 'Qualified view rate',
                body: 'TikTok only counts organic FYP views on 1+ minute videos. Duets, Stitches, and Photo Mode don’t count.',
                href: '/guides/no-qualified-views',
                cta: "Why views aren’t counting",
              },
              {
                title: 'Content niche',
                body: 'Finance and education niches earn up to 2x more than entertainment or gaming.',
                href: '/guides/tiktok-rpm-by-niche-2026',
                cta: 'RPM by niche breakdown',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-[20px] border border-line p-6"
              >
                <div className="text-[16px] font-semibold text-ink mb-2 tracking-[-0.01em]">{card.title}</div>
                <p className="text-[14px] text-ink-soft leading-[1.6] mb-4">{card.body}</p>
                <Link
                  href={card.href}
                  className="text-[13px] font-semibold text-brand-primaryDeep hover:text-ink transition-colors"
                >
                  {card.cta} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </SectionMarker>
      </section>

      {/* Reality check — DarkCallout */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <DarkCallout title="These are estimates." italic="Not guarantees.">
          Actual payouts move with content quality, audience geography, seasonal advertiser demand, and the algorithm&rsquo;s read of your watch-time. Use the calculator to model scenarios, not to plan rent.
        </DarkCallout>
      </section>

      {/* FAQ — SectionMarker iii */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <SectionMarker numeral="iii" heading="Frequently asked.">
          <div className="max-w-[760px]">
            <Accordion className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={i}
                  className="border border-line rounded-[16px] px-5 bg-white"
                >
                  <AccordionTrigger className="text-left font-semibold text-ink text-[15px] py-4 hover:no-underline min-h-[44px]">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] text-ink-soft leading-[1.7] pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SectionMarker>
      </section>

      {/* Related — 2-up grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-20">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
          <h2 className="font-sans text-[28px] md:text-[32px] leading-[1.05] tracking-[-0.02em] font-medium text-ink m-0">
            Related <ItalicWord color="#C2622A">guides and tools</ItalicWord>.
          </h2>
          <DataPill variant="soft">5 related</DataPill>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            {
              href: '/guides/how-much-does-tiktok-pay-per-view',
              image: '/images/guides/hero-how-much-does-tiktok-pay-per-view.webp',
              title: 'How Much Does TikTok Pay?',
              desc: 'Complete earnings breakdown with real creator examples and RPM data.',
              cta: 'Read guide',
              tag: 'Guide',
            },
            {
              href: '/guides/optimize-rpm',
              image: '/images/guides/hero-optimize-rpm.webp',
              title: 'How to Optimize Your RPM',
              desc: 'Actionable strategies to increase your revenue per 1,000 views.',
              cta: 'Read guide',
              tag: 'Guide',
            },
            {
              href: '/calculators/rpm-by-country',
              image: '/images/calculators/hero-rpm.webp',
              title: 'RPM by Country Calculator',
              desc: 'Compare RPM rates by country and model weighted earnings by audience geography.',
              cta: 'Open calculator',
              tag: 'Calculator',
            },
            {
              href: '/calculators/follower-income-estimator',
              image: '/images/calculators/hero-follower.webp',
              title: 'Follower Income Estimator',
              desc: 'Project earnings based on follower count, engagement rate, and posting frequency.',
              cta: 'Open calculator',
              tag: 'Calculator',
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col rounded-[22px] border border-line bg-white overflow-hidden transition-all duration-200 hover:-translate-y-[3px] hover:border-brand-primaryDeep hover:shadow-[0_12px_32px_-18px_rgba(194,98,42,0.35)]"
            >
              <div className="relative aspect-[16/9] w-full bg-soft border-b border-line">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <div className="mb-3">
                  <DataPill variant="soft">{card.tag}</DataPill>
                </div>
                <h3 className="text-[18px] font-semibold text-ink tracking-[-0.01em]">{card.title}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-[1.6] text-ink-soft">{card.desc}</p>
                <span className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold text-brand-primaryDeep transition-transform duration-200 group-hover:translate-x-0.5">
                  {card.cta} <span aria-hidden>&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
