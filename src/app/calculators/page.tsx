import Container from '@/components/ui/Container'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'
import { ArrowRight, Calculator, Globe, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TikTok Creator Rewards Calculators',
  description:
    'Free TikTok Creator Rewards calculators: estimate earnings, compare RPM by country, and forecast income from your follower count.',
}

const calculators = [
  {
    icon: Calculator,
    title: 'Earnings Calculator',
    description:
      'Estimate your Creator Rewards payout based on qualified view count, RPM, and the Additional Reward bonus. The most-used tool on this site.',
    href: '/calculators/earnings-calculator',
    badge: 'Most used',
    badgeColor: 'bg-orange-100 text-orange-700',
    highlight: true,
    stats: ['View-based model', 'RPM by niche', 'Additional Reward bonus'],
  },
  {
    icon: Globe,
    title: 'RPM by Country',
    description:
      'Compare typical RPM ranges by country and model weighted earnings based on your audience geography mix.',
    href: '/calculators/rpm-by-country',
    badge: null,
    badgeColor: '',
    highlight: false,
    stats: ['25+ countries', 'Weighted blends', 'Regional benchmarks'],
  },
  {
    icon: Users,
    title: 'Follower Income Estimator',
    description:
      'Project earnings based on follower count, engagement rate, and monthly posting frequency.',
    href: '/calculators/follower-income-estimator',
    badge: null,
    badgeColor: '',
    highlight: false,
    stats: ['Follower tiers', 'Engagement rate', 'Monthly projections'],
  },
]

export default function CalculatorsPage() {
  return (
    <>
      <ScrollReveal />

      {/* Header band */}
      <section className="bg-[#FFF8F2] py-12 md:py-16 border-b border-orange-100">
        <Container>
          <PageHeader
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Calculators', href: '/calculators' },
            ]}
            title="Creator Rewards calculators"
            description="Model your earnings before committing to a content strategy. All calculators use real payout mechanics — not guesses."
          />
        </Container>
      </section>

      {/* Calculator cards */}
      <section className="bg-white py-14">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {calculators.map((calc) => {
              const Icon = calc.icon
              return (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className={[
                    'group relative flex flex-col rounded-2xl border p-7 transition-all duration-200',
                    calc.highlight
                      ? 'border-orange-300 bg-gradient-to-br from-orange-50 to-white shadow-md hover:shadow-lg hover:border-orange-400'
                      : 'border-border bg-white hover:border-orange-200 hover:shadow-md',
                  ].join(' ')}
                >
                  {/* Badge */}
                  {calc.badge && (
                    <span className={`mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${calc.badgeColor}`}>
                      {calc.badge}
                    </span>
                  )}

                  {/* Icon */}
                  <div className={[
                    'mb-4 w-11 h-11 rounded-xl flex items-center justify-center',
                    calc.highlight ? 'bg-orange-600' : 'bg-orange-50',
                  ].join(' ')}>
                    <Icon
                      className={calc.highlight ? 'w-5 h-5 text-white' : 'w-5 h-5 text-orange-600'}
                      aria-hidden
                    />
                  </div>

                  {/* Title + description */}
                  <h2 className="text-lg font-bold text-foreground mb-2">{calc.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground flex-1 mb-5">
                    {calc.description}
                  </p>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {calc.stats.map((stat) => (
                      <span
                        key={stat}
                        className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground font-medium"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <span className={[
                    'flex items-center gap-1.5 text-sm font-semibold transition-transform duration-200 group-hover:translate-x-0.5',
                    calc.highlight ? 'text-orange-600' : 'text-orange-600',
                  ].join(' ')}>
                    Open calculator
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Trust note */}
          <p className="mt-10 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            All calculators use creator-reported data and TikTok&apos;s documented payout model.
            Results are estimates — actual earnings vary by niche, audience geography, and content quality.
          </p>
        </Container>
      </section>
    </>
  )
}
