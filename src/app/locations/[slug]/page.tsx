import Container from '@/components/ui/Container'
import PageHeader from '@/components/PageHeader'
import CalloutBox from '@/components/CalloutBox'
import EmailSignupForm from '@/components/EmailSignupForm'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'

const locationContent: Record<
  string,
  { title: string; description: string; focus: string[]; links: { label: string; href: string }[] }
> = {
  uk: {
    title: 'TikTok Monetization in the UK',
    description: 'UK-specific guidance for Creator Rewards, RPM, and monetization strategies.',
    focus: ['UK eligibility requirements', 'RPM expectations for UK audiences', 'Best posting windows for UK viewers'],
    links: [
      { label: 'Creator Rewards UK Guide', href: '/guides/creator-rewards-uk' },
      { label: 'RPM by Country Estimator', href: '/calculators/rpm-by-country' },
      { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
    ],
  },
  canada: {
    title: 'TikTok Monetization in Canada',
    description: 'Alternatives for Canadian creators without Creator Rewards access.',
    focus: ['Affiliate stack strategies', 'Digital products for Canadian creators', 'Brand deals and partnerships'],
    links: [
      { label: 'Canada Monetization Guide', href: '/guides/canada-without-rewards' },
      { label: 'Best Monetization Methods', href: '/guides/best-monetization-methods' },
      { label: 'Earnings Tracker', href: '/resources/earnings-tracker' },
    ],
  },
  australia: {
    title: 'TikTok Monetization in Australia',
    description: 'Strategies for Australian creators while waiting for eligibility expansion.',
    focus: ['Affiliate offers for Australian audiences', 'Digital products', 'Community building'],
    links: [
      { label: 'Australia Eligibility Guide', href: '/guides/australia-eligibility' },
      { label: 'Best Monetization Methods', href: '/guides/best-monetization-methods' },
      { label: 'Resource Center', href: '/guides/monetization-resource-center' },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(locationContent).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const content = locationContent[params.slug]
  if (!content) return {}

  return buildMetadata({
    title: content.title,
    description: content.description,
    path: `/locations/${params.slug}`,
  })
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const content = locationContent[params.slug]

  if (!content) notFound()

  return (
    <>
      {/* Header band */}
      <section className="bg-[var(--color-surface-warm)] py-12">
        <Container>
          <PageHeader
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Guides', href: '/guides' },
              { label: content.title, href: `/locations/${params.slug}` },
            ]}
            title={content.title}
            description={content.description}
          />
        </Container>
      </section>

      {/* Content */}
      <section className="bg-white py-12">
        <Container>
          <div className="mx-auto max-w-2xl space-y-8">
            {/* Focus areas */}
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
              <h2 className="text-[var(--text-h3)] font-semibold text-[var(--color-ink-strong)]">
                Focus areas
              </h2>
              <ul className="mt-4 space-y-2">
                {content.focus.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-primary)]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Callout */}
            <CalloutBox type="info">
              Location-specific guides are actively being expanded. Subscribe to get notified when
              new content for your region is published.
            </CalloutBox>

            {/* Email capture */}
            <EmailSignupForm variant="inline" />

            {/* Next steps */}
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-warm)] p-6">
              <h3 className="text-[var(--text-h3)] font-semibold text-[var(--color-ink-strong)]">
                Relevant guides
              </h3>
              <ul className="mt-4 space-y-2">
                {content.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
                    >
                      {link.label} &rarr;
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
