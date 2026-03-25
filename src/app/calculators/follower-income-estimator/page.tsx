import Container from '@/components/ui/Container'
import FollowerIncomeEstimator from '@/components/FollowerIncomeEstimator'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { EmailCapturePopup } from '@/components/email/email-capture-popup'
import { siteConfig } from '@/lib/site'

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
    <>
      <EmailCapturePopup
        leadMagnetTitle="Follower Income Guide"
        headline="Want to know what your followers are actually worth?"
        description="We will explain what your estimated earnings mean, how engagement rate affects income, and which moves have the biggest impact on your payout."
        itemCount="Free guide"
      />

      {/* Hero header - tighter */}
      <section className="pt-10 pb-6 md:pt-12 md:pb-8">
        <Container>
          <div className="max-w-3xl">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-1 text-xs text-text-muted">
                <li><Link href="/" className="hover:text-brand-ink transition-colors">Home</Link></li>
                <li className="text-border-default">/</li>
                <li><Link href="/calculators" className="hover:text-brand-ink transition-colors">Calculators</Link></li>
                <li className="text-border-default">/</li>
                <li className="text-brand-ink font-medium">Follower Income Estimator</li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-ink leading-[1.1]">
              Follower Income Estimator
            </h1>
            <p className="mt-3 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              How much can you earn based on your follower count? Enter your followers, engagement rate, and posting frequency to see estimated Creator Rewards earnings.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-10">
        <Container>
          <div className="space-y-10">
            {/* Calculator */}
            <FollowerIncomeEstimator />

            {/* How it works */}
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold text-brand-ink mb-3">
                How the estimate works
              </h2>
              <div className="space-y-3 text-sm text-text-secondary leading-[1.7]">
                <p>
                  This calculator models your earnings using three variables: <strong className="text-brand-ink">follower count</strong>, <strong className="text-brand-ink">engagement rate</strong>, and <strong className="text-brand-ink">posting frequency</strong>. It estimates how many views your content will generate, then applies your RPM to calculate monthly earnings.
                </p>
                <p>
                  Engagement rate has the biggest impact. A creator with 20K highly-engaged followers often earns more than one with 100K passive followers because qualified views depend on completion rate and organic reach, not raw follower numbers.
                </p>
                <p>
                  Posting frequency increases your monthly view ceiling, but only if each video meets the 1+ minute qualified content threshold. Posting more shorter videos does not help since those views do not count toward Creator Rewards earnings.
                </p>
              </div>
            </div>

            {/* Key factors */}
            <div>
              <h2 className="text-xl font-bold text-brand-ink mb-4">
                What moves the number
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-white rounded-xl border border-border-default p-5">
                  <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center mb-2">
                    <span className="text-sm font-bold text-brand-primary">%</span>
                  </div>
                  <p className="text-sm font-bold text-brand-ink mb-1.5">Engagement Rate</p>
                  <p className="text-xs text-text-secondary leading-[1.6]">
                    Higher engagement means more of your followers actually see and watch your content. Even a 1% improvement can significantly change your monthly views.
                  </p>
                </div>
                <div className="bg-white rounded-xl border border-border-default p-5">
                  <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center mb-2">
                    <span className="text-sm font-bold text-brand-primary">$</span>
                  </div>
                  <p className="text-sm font-bold text-brand-ink mb-1.5">RPM (Revenue Per Mille)</p>
                  <p className="text-xs text-text-secondary leading-[1.6]">
                    RPM varies from $0.35 (gaming, comedy) to $1.00+ (finance, education). Your niche is the single biggest factor in how much each view is worth.
                  </p>
                </div>
                <div className="bg-white rounded-xl border border-border-default p-5">
                  <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center mb-2">
                    <span className="text-sm font-bold text-brand-primary">G</span>
                  </div>
                  <p className="text-sm font-bold text-brand-ink mb-1.5">Audience Location</p>
                  <p className="text-xs text-text-secondary leading-[1.6]">
                    Views from the US, UK, and Germany pay the most. If most of your followers are in lower-RPM regions, your effective earnings per view will be lower.
                  </p>
                </div>
              </div>
            </div>

            {/* Related calculators */}
            <div>
              <h2 className="text-xl font-bold text-brand-ink mb-3">
                Related calculators and guides
              </h2>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/calculators/earnings-calculator"
                  className="group flex flex-col rounded-xl border border-border-default bg-white p-5 transition-all duration-150 hover:border-brand-primary hover:shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-brand-ink">Earnings Calculator</h3>
                  <p className="mt-1.5 flex-1 text-xs leading-[1.6] text-text-secondary">
                    Estimate Creator Rewards payouts based on view count, RPM, and the Additional Reward bonus.
                  </p>
                  <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-primary transition-transform duration-200 group-hover:translate-x-0.5">
                    Open calculator <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
                <Link
                  href="/calculators/rpm-by-country"
                  className="group flex flex-col rounded-xl border border-border-default bg-white p-5 transition-all duration-150 hover:border-brand-primary hover:shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-brand-ink">RPM by Country</h3>
                  <p className="mt-1.5 flex-1 text-xs leading-[1.6] text-text-secondary">
                    Compare typical RPM ranges by country and model weighted earnings based on your audience mix.
                  </p>
                  <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-primary transition-transform duration-200 group-hover:translate-x-0.5">
                    Open calculator <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
                <Link
                  href="/guides/grow-5k-to-10k"
                  className="group flex flex-col rounded-xl border border-border-default bg-white p-5 transition-all duration-150 hover:border-brand-primary hover:shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-brand-ink">Growing from 5K to 10K</h3>
                  <p className="mt-1.5 flex-1 text-xs leading-[1.6] text-text-secondary">
                    Strategies for hitting the Creator Rewards eligibility threshold faster.
                  </p>
                  <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-primary transition-transform duration-200 group-hover:translate-x-0.5">
                    Read guide <ArrowRight className="h-3.5 w-3.5" aria-hidden />
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
