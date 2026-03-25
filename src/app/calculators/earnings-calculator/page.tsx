// Earnings Calculator page — redesigned: clean, no Creator Fund comparison
// SEO target: "TikTok Creativity Program Earnings Calculator"

import type { Metadata } from 'next'
import Link from 'next/link'
import { BarChart2, TrendingUp, Zap, ArrowRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Container from '@/components/ui/Container'
import ScrollReveal from '@/components/ScrollReveal'
import { EarningsComparisonCalculator } from '@/components/sections/earnings-comparison-calculator'
import { EmailCapturePopup } from '@/components/email/email-capture-popup'
import { siteConfig } from '@/lib/site'

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
        text: 'RPM varies by niche: Finance and education content earns $0.60-$1.00 per 1,000 views, while entertainment and comedy typically earn $0.35-$0.70. Geography matters too -- US, UK, and Germany have the highest rates.',
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
    a: "Use the niche selector above to see RPM ranges for your content type. Finance and education earn the most ($0.60-$1.00). Entertainment and comedy are lower ($0.35-$0.70). Your country matters too -- US, UK, and Germany have the highest advertiser demand.",
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
    <>
      <ScrollReveal />

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

      {/* Hero header */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1 text-xs text-text-muted">
                <li><Link href="/" className="hover:text-brand-ink transition-colors">Home</Link></li>
                <li className="text-border-default">/</li>
                <li><Link href="/calculators" className="hover:text-brand-ink transition-colors">Calculators</Link></li>
                <li className="text-border-default">/</li>
                <li className="text-brand-ink font-medium">Earnings Calculator</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-ink leading-[1.1]">
              TikTok Earnings Calculator
            </h1>
            <p className="mt-4 text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
              Estimate your monthly and yearly Creator Rewards earnings. Select your niche, set your average views, and see what your content could earn.
            </p>
          </div>
        </Container>
      </section>

      {/* Calculator tool */}
      <section className="pb-16">
        <Container>
          <div className="space-y-16">
            {/* Calculator */}
            <div className="max-w-4xl">
              <EarningsComparisonCalculator />
            </div>

            {/* Quick earnings reference table */}
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-brand-ink mb-6">
                Earnings at a glance
              </h2>
              <div className="overflow-x-auto rounded-xl border border-border-default">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-background-surface border-b border-border-default">
                      <th className="text-left px-5 py-3 font-semibold text-brand-ink">Monthly Views</th>
                      <th className="text-right px-5 py-3 font-semibold text-brand-ink">Low Estimate</th>
                      <th className="text-right px-5 py-3 font-semibold text-brand-ink">High Estimate</th>
                      <th className="text-right px-5 py-3 font-semibold text-brand-ink">Per Year (High)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-default">
                    {[
                      { views: '10,000', low: '$3.28', high: '$8.20', yearly: '$98' },
                      { views: '100,000', low: '$33', high: '$82', yearly: '$984' },
                      { views: '500,000', low: '$164', high: '$410', yearly: '$4,920' },
                      { views: '1,000,000', low: '$328', high: '$820', yearly: '$9,840' },
                      { views: '5,000,000', low: '$1,640', high: '$4,100', yearly: '$49,200' },
                    ].map((row) => (
                      <tr key={row.views} className="bg-white hover:bg-background-surface/50 transition-colors">
                        <td className="px-5 py-3 font-medium text-brand-ink" style={{ fontFamily: 'var(--font-mono)' }}>
                          {row.views}
                        </td>
                        <td className="px-5 py-3 text-right font-semibold text-text-secondary" style={{ fontFamily: 'var(--font-mono)' }}>
                          {row.low}
                        </td>
                        <td className="px-5 py-3 text-right font-semibold text-green-700" style={{ fontFamily: 'var(--font-mono)' }}>
                          {row.high}
                        </td>
                        <td className="px-5 py-3 text-right font-semibold text-green-700" style={{ fontFamily: 'var(--font-mono)' }}>
                          {row.yearly}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-text-muted">
                Based on qualified views (82% of total) at General/Entertainment RPM ($0.40-$1.00). Finance and education niches earn more. Actual earnings vary.
              </p>
            </div>

            {/* What affects your results? */}
            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-6">What affects your earnings</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-6 rounded-xl border border-border-default">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart2 className="h-5 w-5 text-brand-primary" aria-hidden />
                    <h3 className="font-bold text-brand-ink text-sm">Your RPM</h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-[1.65] mb-3">
                    RPM varies by country, niche, content length, and viewer behavior. US, UK, and Germany see the highest
                    rates ($0.50-$1.20). Finance and educational content consistently earns more than trends.
                  </p>
                  <Link href="/guides/optimize-rpm" className="text-xs font-semibold text-brand-primaryDeep hover:underline">
                    How to improve your RPM &rarr;
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-xl border border-border-default">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-brand-primary" aria-hidden />
                    <h3 className="font-bold text-brand-ink text-sm">Qualified view rate</h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-[1.65] mb-3">
                    TikTok only counts organic FYP views on 1+ minute videos. Duets, Stitches, and Photo Mode don&apos;t
                    count. Most creators qualify 70-90% of total views.
                  </p>
                  <Link href="/guides/no-qualified-views" className="text-xs font-semibold text-brand-primaryDeep hover:underline">
                    Why views aren&apos;t counting &rarr;
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-xl border border-border-default">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-brand-primary" aria-hidden />
                    <h3 className="font-bold text-brand-ink text-sm">Content niche</h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-[1.65] mb-3">
                    Finance and education niches earn up to 2x more than entertainment or gaming. Choose your niche in the
                    calculator above to see niche-specific RPM ranges.
                  </p>
                  <Link href="/guides/tiktok-creator-rewards-earnings-by-niche" className="text-xs font-semibold text-brand-primaryDeep hover:underline">
                    RPM by niche breakdown &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-brand-ink mb-8">Frequently Asked Questions</h2>
              <Accordion className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={i}
                    className="border border-border-default rounded-xl px-5 shadow-sm bg-white"
                  >
                    <AccordionTrigger className="text-left font-semibold text-brand-ink text-sm py-4 hover:no-underline min-h-[48px]">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-text-secondary leading-[1.7] pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Related guides and tools */}
            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-4">
                Related guides and tools
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/guides/how-much-does-tiktok-creativity-program-pay"
                  className="group flex flex-col rounded-2xl border border-border-default bg-white p-6 transition-all duration-150 hover:border-brand-primary hover:shadow-sm"
                >
                  <h3 className="text-base font-semibold text-brand-ink">How Much Does TikTok Pay?</h3>
                  <p className="mt-2 flex-1 text-sm leading-[1.65] text-text-secondary">
                    Complete earnings breakdown with real creator examples and RPM data.
                  </p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-primary transition-transform duration-200 group-hover:translate-x-0.5">
                    Read guide <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
                <Link
                  href="/guides/optimize-rpm"
                  className="group flex flex-col rounded-2xl border border-border-default bg-white p-6 transition-all duration-150 hover:border-brand-primary hover:shadow-sm"
                >
                  <h3 className="text-base font-semibold text-brand-ink">How to Optimize Your RPM</h3>
                  <p className="mt-2 flex-1 text-sm leading-[1.65] text-text-secondary">
                    Actionable strategies to increase your revenue per 1,000 views.
                  </p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-primary transition-transform duration-200 group-hover:translate-x-0.5">
                    Read guide <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
                <Link
                  href="/calculators/rpm-by-country"
                  className="group flex flex-col rounded-2xl border border-border-default bg-white p-6 transition-all duration-150 hover:border-brand-primary hover:shadow-sm"
                >
                  <h3 className="text-base font-semibold text-brand-ink">RPM by Country Calculator</h3>
                  <p className="mt-2 flex-1 text-sm leading-[1.65] text-text-secondary">
                    Compare RPM rates by country and model weighted earnings by audience geography.
                  </p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-primary transition-transform duration-200 group-hover:translate-x-0.5">
                    Open calculator <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
                <Link
                  href="/guides/additional-reward-criteria-2025"
                  className="group flex flex-col rounded-2xl border border-border-default bg-white p-6 transition-all duration-150 hover:border-brand-primary hover:shadow-sm"
                >
                  <h3 className="text-base font-semibold text-brand-ink">Additional Reward Criteria</h3>
                  <p className="mt-2 flex-1 text-sm leading-[1.65] text-text-secondary">
                    How to qualify for the +20% bonus on your Creator Rewards earnings.
                  </p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-primary transition-transform duration-200 group-hover:translate-x-0.5">
                    Read guide <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
                <Link
                  href="/calculators/follower-income-estimator"
                  className="group flex flex-col rounded-2xl border border-border-default bg-white p-6 transition-all duration-150 hover:border-brand-primary hover:shadow-sm"
                >
                  <h3 className="text-base font-semibold text-brand-ink">Follower Income Estimator</h3>
                  <p className="mt-2 flex-1 text-sm leading-[1.65] text-text-secondary">
                    Project earnings based on follower count, engagement rate, and posting frequency.
                  </p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-primary transition-transform duration-200 group-hover:translate-x-0.5">
                    Open calculator <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
