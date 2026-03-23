import Container from '@/components/ui/Container'
import CalloutBox from '@/components/CalloutBox'
import RpmByCountryCalculator from '@/components/RpmByCountryCalculator'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { EmailCapturePopup } from '@/components/email/email-capture-popup'
import { CalculatorSection4b } from '@/components/sections/calculator-section-4b'

export const metadata: Metadata = {
  title: 'TikTok RPM by Country Estimator',
  description:
    'Compare TikTok Creator Rewards RPM rates by country to understand how your audience location affects earnings.',
}

export default function RpmByCountryPage() {
  return (
    <>
      <EmailCapturePopup
        leadMagnetTitle="RPM Optimization Guide"
        headline="Learn how to improve your RPM in your region"
        description="We'll break down how audience location affects your RPM, which content niches earn most per view, and how to shift your numbers over time."
        itemCount="Free guide"
      />
      <ScrollReveal />
      {/* C1-C3: two-column header band with illustration */}
      <section className="bg-[#FFF8F2] py-12 md:py-16">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-[3fr_2fr]">
            <PageHeader
              breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: 'Calculators', href: '/calculators' },
                { label: 'RPM by Country', href: '/calculators/rpm-by-country' },
              ]}
              category="Interactive tool"
              title="RPM by country estimator"
              description="Estimate typical RPM ranges by country and model earnings based on your audience mix."
            />
            <div className="relative hidden h-[320px] w-full md:block">
              <Image
                src="/assets/brand-images/landpress-marketing-hero.png"
                alt="Creator analyzing TikTok RPM rates by country"
                fill
                className="object-contain object-right"
              />
            </div>
          </div>
        </Container>
      </section>

    <section className="py-12">
      <Container>
        <div className="space-y-10">
          {/* Calculator */}
          <RpmByCountryCalculator />

          {/* Section 4b: Calculator results actions — email capture, share, affiliate */}
          <CalculatorSection4b
            emailLeadMagnetTitle="Get Your Results Explained"
            emailLeadMagnetDescription="We will break down what your blended RPM means — which countries move it most and what you can do to shift the mix over time."
            tweetText="I just estimated my TikTok Creator Rewards RPM based on my audience countries"
            tweetUrl="https://tiktokcreativityprogram.com/calculators/rpm-by-country"
            affiliateToolName="Exolyt"
            affiliateSlug="exolyt"
            affiliateReview="Exolyt tracks TikTok performance over time and lets you benchmark against other creators in your niche."
            affiliateBestFor="Creators who want to understand what is driving their RPM"
            affiliatePriceRange="Free tier available"
            affiliateCtaText="Try Exolyt"
          />

          {/* Guidance */}
          <CalloutBox type="tip">
            If your audience mix isn&apos;t 100% yet, use your best estimate. Update monthly to track
            changes in RPM.
          </CalloutBox>

          {/* How to use */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
              <h2 className="text-[var(--text-h3)] font-semibold text-[var(--color-ink-strong)]">
                Inputs
              </h2>
              <ul className="mt-3 space-y-1.5 text-[var(--text-small)] text-[var(--color-text-muted)]">
                <li>Country selector (8 eligible countries)</li>
                <li>Audience mix percentages by country</li>
                <li>Monthly view count</li>
              </ul>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
              <h2 className="text-[var(--text-h3)] font-semibold text-[var(--color-ink-strong)]">
                Outputs
              </h2>
              <ul className="mt-3 space-y-1.5 text-[var(--text-small)] text-[var(--color-text-muted)]">
                <li>RPM range by country</li>
                <li>Weighted blended RPM</li>
                <li>Estimated earnings by audience mix</li>
              </ul>
            </div>
          </div>

          {/* C10: "What affects your results?" — required per BRAND.md */}
          <div className="max-w-prose space-y-4">
            <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink-strong)]">
              What affects your results?
            </h2>
            <p className="text-[var(--text-body)] leading-[1.7] text-[var(--color-text-muted)]">
              RPM is not uniform — it varies by country based on advertiser demand, content category,
              and seasonal ad spend patterns. The US, UK, Germany, and Australia consistently show the
              highest RPMs in the Creator Rewards Program. France and Japan sit in the mid-tier.
              Brazil and Indonesia are lower but still eligible.
            </p>
            <p className="text-[var(--text-body)] leading-[1.7] text-[var(--color-text-muted)]">
              Your audience mix determines your blended RPM. If 80% of your views come from the US
              but 20% come from Brazil, your effective RPM will be weighted accordingly. Creators who
              grow their audience in high-RPM markets typically see the biggest impact on earnings
              per qualified view.
            </p>
            <p className="text-[var(--text-body)] leading-[1.7] text-[var(--color-text-muted)]">
              Content niche also plays a role within each country. Finance, technology, and educational
              content attracts higher advertiser bids across all markets. Entertainment and trending
              content tends to have lower RPMs regardless of region.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/calculators/earnings-calculator"
                className="text-sm font-[500] text-[#F97316] hover:underline"
              >
                Use the full earnings calculator &rarr;
              </Link>
              <Link
                href="/guides/optimize-rpm"
                className="text-sm font-[500] text-[#F97316] hover:underline"
              >
                How to improve your RPM &rarr;
              </Link>
            </div>
          </div>

          {/* C11: Related calculators — 2-col grid */}
          <div>
            <h2 className="mb-4 text-[var(--text-h2)] font-bold text-[var(--color-ink-strong)]">
              Related calculators
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/calculators/earnings-calculator"
                className="group flex flex-col rounded-2xl border border-[#E8D5C4] bg-white p-6 transition-all duration-150 hover:border-[#F97316] hover:shadow-sm"
              >
                <h3 className="text-[1.125rem] font-[600] text-[#0F172A]">Earnings Calculator</h3>
                <p className="mt-2 flex-1 text-sm leading-[1.65] text-[#475467]">
                  Estimate Creator Rewards payouts based on view count, RPM, and the Additional Reward bonus.
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
