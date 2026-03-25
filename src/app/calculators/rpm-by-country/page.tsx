import Container from '@/components/ui/Container'
import RpmByCountryCalculator from '@/components/RpmByCountryCalculator'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { EmailCapturePopup } from '@/components/email/email-capture-popup'
import { siteConfig } from '@/lib/site'

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

export default function RpmByCountryPage() {
  return (
    <>
      <EmailCapturePopup
        leadMagnetTitle="RPM Optimization Guide"
        headline="Learn how to improve your RPM in your region"
        description="We will break down how audience location affects your RPM, which content niches earn most per view, and how to shift your numbers over time."
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
                <li className="text-brand-ink font-medium">RPM by Country</li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-ink leading-[1.1]">
              RPM by Country Estimator
            </h1>
            <p className="mt-3 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Your audience location directly affects your earnings. Set your audience mix across eligible countries to calculate your blended RPM and estimated monthly payout.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-10">
        <Container>
          <div className="space-y-10">
            {/* Calculator */}
            <RpmByCountryCalculator />

            {/* RPM reference table */}
            <div>
              <h2 className="text-xl font-bold text-brand-ink mb-4">
                RPM ranges by country
              </h2>
              <div className="overflow-x-auto rounded-xl border border-border-default">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-background-surface border-b border-border-default">
                      <th className="text-left px-4 py-2.5 font-semibold text-brand-ink text-xs">Country</th>
                      <th className="text-right px-4 py-2.5 font-semibold text-brand-ink text-xs">RPM Low</th>
                      <th className="text-right px-4 py-2.5 font-semibold text-brand-ink text-xs">RPM High</th>
                      <th className="text-right px-4 py-2.5 font-semibold text-brand-ink text-xs">Tier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-default">
                    {[
                      { country: 'United States', low: '$0.70', high: '$1.00', tier: 'Top' },
                      { country: 'Japan', low: '$0.60', high: '$0.95', tier: 'Top' },
                      { country: 'United Kingdom', low: '$0.60', high: '$0.90', tier: 'Top' },
                      { country: 'South Korea', low: '$0.55', high: '$0.90', tier: 'High' },
                      { country: 'Germany', low: '$0.55', high: '$0.85', tier: 'High' },
                      { country: 'France', low: '$0.50', high: '$0.80', tier: 'Mid' },
                      { country: 'Mexico', low: '$0.35', high: '$0.60', tier: 'Lower' },
                      { country: 'Brazil', low: '$0.30', high: '$0.55', tier: 'Lower' },
                    ].map((row) => (
                      <tr key={row.country} className="bg-white hover:bg-background-surface/50 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-brand-ink text-xs">{row.country}</td>
                        <td className="px-4 py-2.5 text-right text-text-secondary text-xs tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
                          {row.low}
                        </td>
                        <td className="px-4 py-2.5 text-right font-semibold text-green-700 text-xs tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
                          {row.high}
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            row.tier === 'Top' ? 'bg-green-50 text-green-700' :
                            row.tier === 'High' ? 'bg-blue-50 text-blue-700' :
                            row.tier === 'Mid' ? 'bg-amber-50 text-amber-700' :
                            'bg-gray-50 text-gray-600'
                          }`}>
                            {row.tier}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-text-muted">
                RPM ranges based on creator-reported data for the Creator Rewards Program. Actual RPM varies by niche, content quality, and seasonal ad spend.
              </p>
            </div>

            {/* What affects RPM */}
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold text-brand-ink mb-3">
                What affects RPM by country
              </h2>
              <div className="space-y-3 text-sm text-text-secondary leading-[1.7]">
                <p>
                  RPM is not uniform. It varies by country based on <strong className="text-brand-ink">advertiser demand</strong>, <strong className="text-brand-ink">content category</strong>, and <strong className="text-brand-ink">seasonal ad spend</strong> patterns. The US, UK, Japan, and Germany consistently show the highest RPMs in the Creator Rewards Program.
                </p>
                <p>
                  Your audience mix determines your blended RPM. If 80% of your views come from the US but 20% come from Brazil, your effective RPM will be weighted accordingly. Creators who grow their audience in high-RPM markets typically see the biggest impact on earnings per qualified view.
                </p>
                <p>
                  Content niche also plays a role within each country. Finance, technology, and educational content attracts higher advertiser bids across all markets. Entertainment and trending content tends to have lower RPMs regardless of region.
                </p>
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
                  href="/calculators/follower-income-estimator"
                  className="group flex flex-col rounded-xl border border-border-default bg-white p-5 transition-all duration-150 hover:border-brand-primary hover:shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-brand-ink">Follower Income Estimator</h3>
                  <p className="mt-1.5 flex-1 text-xs leading-[1.6] text-text-secondary">
                    Project earnings based on follower count, engagement rate, and monthly posting frequency.
                  </p>
                  <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-primary transition-transform duration-200 group-hover:translate-x-0.5">
                    Open calculator <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
                <Link
                  href="/guides/optimize-rpm"
                  className="group flex flex-col rounded-xl border border-border-default bg-white p-5 transition-all duration-150 hover:border-brand-primary hover:shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-brand-ink">How to Optimize Your RPM</h3>
                  <p className="mt-1.5 flex-1 text-xs leading-[1.6] text-text-secondary">
                    Actionable strategies to increase your revenue per 1,000 views across any niche.
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
