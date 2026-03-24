import Container from '@/components/ui/Container'
import PageHeader from '@/components/PageHeader'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'TikTok Creativity Program is an independent resource helping TikTok creators understand eligibility, earnings, and monetization strategies for the Creator Rewards Program.',
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-[var(--color-surface-warm)] py-14">
        <Container>
          <PageHeader
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
            ]}
            title="About TikTok Creativity Program"
            description="An independent resource helping TikTok creators understand eligibility, earnings, and monetization strategies for the Creator Rewards Program."
          />
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container>
          <div className="prose prose-slate mx-auto max-w-prose">
            <h2>What We Do</h2>
            <p>
              TikTok Creativity Program (tiktokcreativityprogram.com) is a free, independent
              educational resource dedicated to helping TikTok creators maximize their earnings
              through the Creator Rewards Program and beyond.
            </p>
            <p>
              We provide in-depth guides, data-driven calculators, and practical tools that help
              creators at every stage &mdash; whether you&apos;re working toward your first 10,000
              followers or optimizing RPM on an established account.
            </p>

            <h2>What You&apos;ll Find Here</h2>
            <ul>
              <li>
                <strong>100+ free guides</strong> covering Creator Rewards eligibility, RPM
                optimization, qualified views, niche-specific strategies, and monetization beyond
                TikTok
              </li>
              <li>
                <strong>Earnings calculators</strong> to model your income based on views, RPM,
                niche, and audience geography
              </li>
              <li>
                <strong>Tool and equipment recommendations</strong> with honest reviews and
                transparent affiliate disclosures
              </li>
              <li>
                <strong>Free downloadable resources</strong> including the{' '}
                <Link href="/lead-magnets/rpm-cheat-sheet">RPM Cheat Sheet</Link> and{' '}
                <Link href="/lead-magnets/eligibility-checklist">Eligibility Checklist</Link>
              </li>
              <li>
                <strong>Regular updates</strong> when TikTok changes its policies, features, or
                Creator Rewards requirements
              </li>
            </ul>

            <h2>Our Approach</h2>
            <p>
              We focus on practical, honest guidance. Every guide covers the upside and the
              downsides. We cite community data where available, mark estimates clearly, and
              update content when TikTok changes the rules.
            </p>
            <p>
              There is no course to sell, no membership gate, and no paywall. All of our guides,
              calculators, and tools are 100% free.
            </p>

            <h2>Who This Is For</h2>
            <p>
              Our content is designed for TikTok creators who want to earn through the Creator
              Rewards Program (formerly the Creativity Program Beta). Whether you are:
            </p>
            <ul>
              <li>A new creator figuring out how to get accepted</li>
              <li>An active creator looking to increase RPM and qualified views</li>
              <li>
                An established creator building multiple income streams beyond Creator Rewards
              </li>
            </ul>
            <p>We built this site to make the path clearer.</p>

            <h2>Independence</h2>
            <p>
              We are <strong>not affiliated with, endorsed by, or sponsored by TikTok or
              ByteDance.</strong> All opinions and recommendations are our own.
            </p>
            <p>
              Some pages contain affiliate links to tools and services we recommend. We earn a
              small commission if you purchase through these links, at no additional cost to you.
              Affiliate relationships never influence our editorial recommendations. See our{' '}
              <Link href="/affiliate-disclosure">Affiliate Disclosure</Link> for details.
            </p>

            <h2>Get in Touch</h2>
            <p>
              Have feedback, a correction, or a topic you want covered? We prioritize guides that
              creators ask for most.
            </p>
            <p>
              Email us at{' '}
              <a href="mailto:hello@tiktokcreativityprogram.com">
                hello@tiktokcreativityprogram.com
              </a>{' '}
              or visit our <Link href="/contact">Contact page</Link>.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
