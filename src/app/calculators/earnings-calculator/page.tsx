// Earnings Calculator page — rebuilt with Fund vs Rewards comparison
// SEO target: "TikTok Creativity Program Earnings Calculator"

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BarChart2, TrendingUp, Zap, DollarSign, ArrowRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import { EarningsComparisonCalculator } from '@/components/sections/earnings-comparison-calculator'
import { Badge } from '@/components/ui/badge'
import { EmailCapturePopup } from '@/components/email/email-capture-popup'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'TikTok Creativity Program Earnings Calculator',
  description:
    'Free TikTok earnings calculator. Compare Creator Rewards Program vs old Creator Fund payouts by niche, views, and posting frequency. See estimated monthly and yearly earnings instantly.',
  keywords: [
    'tiktok earnings calculator',
    'tiktok creativity program calculator',
    'tiktok creator rewards calculator',
    'tiktok creator fund vs rewards',
    'tiktok rpm calculator',
    'tiktok money calculator',
  ],
  openGraph: {
    title: 'TikTok Creativity Program Earnings Calculator',
    description:
      'Compare Creator Rewards vs old Creator Fund. Estimate monthly and yearly TikTok earnings by niche.',
    images: [
      {
        url: `/og?title=${encodeURIComponent('TikTok Earnings Calculator — Creator Rewards vs Creator Fund')}`,
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
      'Compare Creator Rewards vs Creator Fund payouts. Free calculator with niche-specific RPM data.',
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
    'Free calculator to estimate TikTok Creator Rewards Program earnings. Compare new Rewards payouts vs old Creator Fund by niche, views, and posting frequency.',
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
        text: 'The Creator Rewards Program (formerly Creativity Program) pays $0.40 to $1.00 per 1,000 qualified views depending on niche and audience geography. The old Creator Fund paid only $0.02 to $0.04 per 1,000 views — roughly 20x less.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Creator Fund and Creator Rewards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Creator Rewards Program replaced the Creator Fund in 2024. It pays significantly more ($0.40-$1.00 RPM vs $0.02-$0.04 RPM) but requires videos to be at least 1 minute long and counts only qualified views from the For You Page.',
      },
    },
    {
      '@type': 'Question',
      name: 'What RPM should I expect on TikTok?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RPM varies by niche: Finance and education content earns $0.60-$1.00 per 1,000 views, while entertainment and comedy typically earn $0.35-$0.70. Geography matters too — US, UK, and Germany have the highest rates.',
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
        text: 'With 1 million qualified views on the Creator Rewards Program, you can expect $400-$1,000 depending on your niche. With the Additional Reward bonus, this can reach up to $1,200. On the old Creator Fund, the same views would have earned only $20-$40.',
      },
    },
  ],
}

const faqs = [
  {
    q: 'How much does TikTok pay per 1,000 views?',
    a: 'The Creator Rewards Program pays $0.40 to $1.00 per 1,000 qualified views depending on your niche and audience geography. Finance and education content earns on the higher end. The old Creator Fund paid only $0.02 to $0.04 — roughly 20x less.',
  },
  {
    q: 'What is the difference between Creator Fund and Creator Rewards?',
    a: "The Creator Rewards Program (formerly Creativity Program) replaced the Creator Fund in 2024. It pays significantly more but requires videos to be at least 1 minute long. Only qualified views count — organic FYP views on 1+ minute content. The old Fund counted all views but paid almost nothing.",
  },
  {
    q: 'What RPM should I expect?',
    a: "Use the niche selector above to see RPM ranges for your content type. Finance and education earn the most ($0.60-$1.00). Entertainment and comedy are lower ($0.35-$0.70). Your country matters too — US, UK, and Germany have the highest advertiser demand.",
  },
  {
    q: 'Why are qualified views lower than total views?',
    a: "TikTok only counts organic FYP views on videos 1 minute or longer. Duets, Stitches, Photo Mode, and paid promotion views don't qualify. Most creators see 70-90% of total views qualify. We use 82% as a typical baseline.",
  },
  {
    q: 'What is the Additional Reward bonus?',
    a: "A bonus of up to 20% on top of base earnings for content that meets TikTok's quality and engagement thresholds. It's not guaranteed — consistent 1+ minute videos with high completion rates earn it most reliably. Toggle it on in the calculator to see the impact.",
  },
  {
    q: 'How much can I make with 1 million views?',
    a: "With 1 million qualified views on the Creator Rewards Program, expect $400-$1,000 depending on niche. With the +20% bonus, up to $1,200. On the old Creator Fund, the same views earned only $20-$40. Use the calculator above to model your specific scenario.",
  },
  {
    q: 'Does follower count affect earnings?',
    a: "No. The Creator Rewards Program pays based on qualified views and RPM — not follower count. A creator with 20K followers posting quality 1-minute videos can earn more than a creator with 500K followers posting short clips.",
  },
  {
    q: 'Are these estimates guaranteed?',
    a: "No. This calculator uses average RPM ranges based on creator-reported data and publicly available information. Your actual earnings will vary based on content quality, audience geography, engagement patterns, and TikTok's algorithms. Use it to model scenarios and compare programs.",
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

      {/* Hero header band */}
      <section className="bg-[#FFF8F2] py-12 md:py-16 border-b border-orange-100">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-[3fr_2fr]">
            <div>
              <PageHeader
                breadcrumbs={[
                  { label: 'Home', href: '/' },
                  { label: 'Calculators', href: '/calculators' },
                  { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
                ]}
                category="Interactive tool"
                title="TikTok Creativity Program earnings calculator"
                description="Compare Creator Rewards vs the old Creator Fund. Estimate monthly and yearly earnings by niche, views per video, and posting frequency."
              />
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-brand-primarySoft text-brand-primaryDeep border-brand-primary/30 text-xs font-semibold">
                  <Zap className="w-3 h-3 mr-1" aria-hidden />
                  100% Free
                </Badge>
                <Badge className="bg-green-50 text-green-700 border-green-200 text-xs font-semibold">
                  <DollarSign className="w-3 h-3 mr-1" aria-hidden />
                  Fund vs Rewards comparison
                </Badge>
              </div>
            </div>
            <div className="relative hidden h-[320px] w-full md:block">
              <Image
                src="/assets/brand-images/landpress-marketing-hero.png"
                alt="Creator analyzing TikTok earnings with calculator"
                fill
                className="object-contain object-right"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Calculator tool */}
      <section className="py-12">
        <Container>
          <div className="space-y-12">
            {/* Calculator */}
            <div className="max-w-4xl">
              <EarningsComparisonCalculator />
            </div>

            {/* Quick earnings reference table */}
            <div className="max-w-4xl">
              <h2 className="text-[1.5rem] font-bold text-brand-ink mb-6">
                Earnings at a glance: Rewards vs Creator Fund
              </h2>
              <div className="overflow-x-auto rounded-xl border border-border-default">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-background-surface border-b border-border-default">
                      <th className="text-left px-5 py-3 font-semibold text-brand-ink">Monthly Views</th>
                      <th className="text-right px-5 py-3 font-semibold text-green-700">Creator Rewards</th>
                      <th className="text-right px-5 py-3 font-semibold text-red-600">Old Creator Fund</th>
                      <th className="text-right px-5 py-3 font-semibold text-brand-ink">Difference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-default">
                    {[
                      { views: '10,000', rewards: '$4 - $10', fund: '$0.20 - $0.40', diff: '~20x more' },
                      { views: '100,000', rewards: '$40 - $100', fund: '$2 - $4', diff: '~20x more' },
                      { views: '500,000', rewards: '$200 - $500', fund: '$10 - $20', diff: '~20x more' },
                      { views: '1,000,000', rewards: '$400 - $1,000', fund: '$20 - $40', diff: '~20x more' },
                      { views: '5,000,000', rewards: '$2,000 - $5,000', fund: '$100 - $200', diff: '~20x more' },
                    ].map((row) => (
                      <tr key={row.views} className="bg-white hover:bg-background-surface/50 transition-colors">
                        <td className="px-5 py-3 font-medium text-brand-ink" style={{ fontFamily: 'var(--font-mono)' }}>
                          {row.views}
                        </td>
                        <td className="px-5 py-3 text-right font-semibold text-green-700" style={{ fontFamily: 'var(--font-mono)' }}>
                          {row.rewards}
                        </td>
                        <td className="px-5 py-3 text-right font-semibold text-red-500" style={{ fontFamily: 'var(--font-mono)' }}>
                          {row.fund}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full">
                            {row.diff}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-text-muted">
                Based on qualified views (82% of total) at average RPM ranges. Actual earnings vary by niche and geography.
              </p>
            </div>

            {/* What affects your results? */}
            <div>
              <h2 className="text-[1.5rem] font-bold text-brand-ink mb-6">What affects your results?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-background-surface p-5 rounded-xl border border-border-default">
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

                <div className="bg-background-surface p-5 rounded-xl border border-border-default">
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

                <div className="bg-background-surface p-5 rounded-xl border border-border-default">
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
              <h2 className="text-[1.5rem] font-bold text-brand-ink mb-8">Frequently Asked Questions</h2>
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

            {/* Internal links to related content */}
            <div>
              <h2 className="text-[1.5rem] font-bold text-brand-ink mb-4">
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
                  href="/guides/creator-fund-vs-creativity-program"
                  className="group flex flex-col rounded-2xl border border-border-default bg-white p-6 transition-all duration-150 hover:border-brand-primary hover:shadow-sm"
                >
                  <h3 className="text-base font-semibold text-brand-ink">Creator Fund vs Rewards Program</h3>
                  <p className="mt-2 flex-1 text-sm leading-[1.65] text-text-secondary">
                    Full comparison of the old Creator Fund and new Creator Rewards Program.
                  </p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-primary transition-transform duration-200 group-hover:translate-x-0.5">
                    Read guide <ArrowRight className="h-4 w-4" aria-hidden />
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
