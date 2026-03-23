// Earnings Calculator page — Phase 3 v3 rebuild
// PAGE_SPECS.md: C1-C3 two-column header, CalculatorPanel, "What affects your results?", FAQ accordion, NO affiliate CTAs
// BRAND.md C1-C3: grid md:grid-cols-[3fr_2fr] gap-12, right col = landpress-marketing-hero.png fill object-contain h-[320px]

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, BarChart2, Users, TrendingUp, Zap } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import { CalculatorPanel } from '@/components/sections/calculator-panel'
import { Badge } from '@/components/ui/badge'
import { EmailCapturePopup } from '@/components/email/email-capture-popup'
import { CalculatorSection4b } from '@/components/sections/calculator-section-4b'

export const metadata: Metadata = {
  title: 'TikTok Earnings Calculator',
  description:
    'Estimate your TikTok Creator Rewards payout based on qualified views and RPM. Uses the actual view-based payout model — not follower count.',
  openGraph: {
    images: [{ url: `/og?title=${encodeURIComponent('TikTok Earnings Calculator')}`, width: 1200, height: 630 }],
  },
}

const faqs = [
  {
    q: 'What RPM should I use?',
    a: "Start with $0.60–$0.80 if you're in the US, UK, or Germany and your content is consistently 1+ minute. Creators in other eligible countries often see $0.20–$0.50. Niche matters — finance and educational content earns more than trends.",
  },
  {
    q: 'Why are qualified views lower than total views?',
    a: "TikTok only counts organic FYP views on videos 1 minute or longer after you join the program. Duets, Stitches, and Photo Mode don't count. Most creators see 70–90% of total views qualify.",
  },
  {
    q: 'What is the Additional Reward?',
    a: "A bonus of up to 20% on top of base earnings for content that meets quality and engagement thresholds. It's not guaranteed — consistent 1+ minute videos with high completion rates earn it most reliably.",
  },
  {
    q: 'How often does TikTok pay out?',
    a: 'Earnings accumulate monthly and become available for withdrawal around the 15th of the following month, once your balance exceeds $50. You can request a withdrawal to PayPal or direct deposit.',
  },
  {
    q: 'Does my follower count affect earnings?',
    a: "No. The Creator Rewards Program pays based on qualified views and your RPM — not follower count. A creator with 20K followers posting 1-minute videos can earn more than a creator with 500K followers posting short clips.",
  },
  {
    q: 'Why does my RPM change month to month?',
    a: "RPM fluctuates based on advertiser demand (higher in Q4), your content niche, audience geography, and TikTok's internal quality scoring. Track RPM over 3+ months to get a reliable baseline.",
  },
  {
    q: 'Are these estimates guaranteed?',
    a: "No. This calculator uses average RPM ranges and typical qualified view ratios based on creator-reported data. Your actual earnings will vary. Use it to model scenarios, not to predict exact payouts.",
  },
]

export default function EarningsCalculatorPage() {
  return (
    <>
      <ScrollReveal />

      {/* Exit intent popup — v4: calculator pages only */}
      <EmailCapturePopup
        leadMagnetTitle="Earnings Calculator Results Guide"
        headline="Get a breakdown of what your numbers actually mean"
        description="We'll explain what your estimated earnings mean, how to improve your RPM, and which variables have the biggest impact on your payout."
        itemCount="Free guide"
      />

      {/* C1-C3: two-column header band with illustration */}
      <section className="bg-[#FFF8F2] py-12 md:py-16">
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
                title="TikTok earnings calculator"
                description="Estimate Creator Rewards payouts based on qualified views and RPM. Built on the actual view-based model — not follower count, not total views."
              />
              {/* v4: Free badge */}
              <Badge className="mt-3 bg-brand-primarySoft text-brand-primaryDeep border-brand-primary/30 text-xs font-semibold">
                <Zap className="w-3 h-3 mr-1" aria-hidden />
                100% Free • No signup required
              </Badge>
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
          <div className="space-y-10">
            {/* Calculator */}
            <div className="max-w-2xl">
              <CalculatorPanel />
            </div>

            {/* Section 4b: Calculator results actions — email capture, share, affiliate */}
            <CalculatorSection4b
              emailLeadMagnetTitle="Get Your Results Explained"
              emailLeadMagnetDescription="We will break down what your number actually means — what drives it up, what holds it down, and the one thing most creators in your range miss."
              tweetText="I just calculated my estimated TikTok Creator Rewards earnings"
              tweetUrl="https://tiktokcreativityprogram.com/calculators/earnings-calculator"
              affiliateToolName="Exolyt"
              affiliateSlug="exolyt"
              affiliateReview="Exolyt tracks TikTok performance over time and lets you benchmark against other creators in your niche."
              affiliateBestFor="Creators who want to understand what is driving their RPM"
              affiliatePriceRange="Free tier available"
              affiliateCtaText="Try Exolyt"
            />

            {/* What affects your results? — required per BRAND.md */}
            <div>
              <h2 className="text-[1.5rem] font-bold text-brand-ink mb-6">What affects your results?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card 1 */}
                <div className="bg-background-surface p-5 rounded-xl border border-border-default">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart2 className="h-5 w-5 text-brand-primary" aria-hidden />
                    <h3 className="font-bold text-brand-ink text-sm">Your RPM</h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-[1.65] mb-3">
                    RPM varies by country, niche, content length, and viewer behavior. US, UK, and Germany see the highest
                    rates ($0.50–$1.20). Finance and educational content consistently earns more than trends.
                  </p>
                  <Link href="/guides/optimize-rpm" className="text-xs font-semibold text-brand-primaryDeep hover:underline">
                    How to improve your RPM &rarr;
                  </Link>
                </div>

                {/* Card 2 */}
                <div className="bg-background-surface p-5 rounded-xl border border-border-default">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-brand-primary" aria-hidden />
                    <h3 className="font-bold text-brand-ink text-sm">Qualified view rate</h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-[1.65] mb-3">
                    TikTok only counts organic FYP views on 1+ minute videos. Duets, Stitches, and Photo Mode don&apos;t
                    count. Most creators qualify 70–90% of total views.
                  </p>
                  <Link href="/guides/no-qualified-views" className="text-xs font-semibold text-brand-primaryDeep hover:underline">
                    Why views aren&apos;t counting &rarr;
                  </Link>
                </div>

                {/* Card 3 */}
                <div className="bg-background-surface p-5 rounded-xl border border-border-default">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-brand-primary" aria-hidden />
                    <h3 className="font-bold text-brand-ink text-sm">Additional Reward bonus</h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-[1.65] mb-3">
                    Up to 20% bonus for content that meets TikTok&apos;s quality and engagement thresholds. Not guaranteed —
                    but consistently earns with high-completion 1+ minute content.
                  </p>
                  <Link href="/guides/additional-reward-criteria-2025" className="text-xs font-semibold text-brand-primaryDeep hover:underline">
                    Additional Reward criteria &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ Accordion — no affiliate links */}
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

            {/* Related calculators — C11: 2-col grid, NO affiliate CTAs */}
            <div>
              <h2 className="mb-4 text-[var(--text-h2)] font-bold text-[var(--color-ink-strong)]">
                Related calculators
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Link
                  href="/calculators/rpm-by-country"
                  className="group flex flex-col rounded-2xl border border-[#E8D5C4] bg-white p-6 transition-all duration-150 hover:border-[#F97316] hover:shadow-sm"
                >
                  <h3 className="text-[1.125rem] font-[600] text-[#0F172A]">RPM by Country</h3>
                  <p className="mt-2 flex-1 text-sm leading-[1.65] text-[#475467]">
                    Compare typical RPM ranges by country and model weighted earnings based on your audience mix.
                  </p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-[600] text-[#F97316] transition-transform duration-200 group-hover:translate-x-0.5">
                    Open calculator <span aria-hidden>&rarr;</span>
                  </span>
                </Link>
                <Link
                  href="/calculators/follower-income-estimator"
                  className="group flex flex-col rounded-2xl border border-[#E8D5C4] bg-white p-6 transition-all duration-150 hover:border-[#F97316] hover:shadow-sm"
                >
                  <h3 className="text-[1.125rem] font-[600] text-[#0F172A]">Follower Income Estimator</h3>
                  <p className="mt-2 flex-1 text-sm leading-[1.65] text-[#475467]">
                    Project earnings based on follower count, engagement rate, and monthly posting frequency.
                  </p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-[600] text-[#F97316] transition-transform duration-200 group-hover:translate-x-0.5">
                    Open calculator <span aria-hidden>&rarr;</span>
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
