// About page — Phase 7 TCP redesign
// Reference: /tmp/tcp-zip/directions/about.jsx
// NOTE: All existing copy preserved. Only visual chrome restyled.

import Link from 'next/link'
import type { Metadata } from 'next'
import {
  EyebrowLabel,
  ItalicWord,
  SectionMarker,
  DarkCallout,
} from '@/components/tcp'

export const metadata: Metadata = {
  title: 'About',
  description:
    'TikTok Creativity Program is an independent resource helping TikTok creators understand eligibility, earnings, and monetization strategies for the Creator Rewards Program.',
}

export default function AboutPage() {
  return (
    <div className="bg-paper">
      {/* Hero — editorial two-column */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-[72px] md:pt-[96px] pb-12">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-ink-soft font-mono">
            <li>
              <Link href="/" className="hover:text-ink transition-colors">
                Home
              </Link>
            </li>
            <li className="text-line">/</li>
            <li className="text-ink">About</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-end">
          <div>
            <EyebrowLabel className="mb-4 block">About · Independent since day one</EyebrowLabel>
            <h1 className="font-sans text-[44px] md:text-[72px] lg:text-[84px] leading-[0.98] tracking-[-0.04em] font-medium text-ink m-0">
              An independent{' '}
              <ItalicWord color="#C2622A">handbook</ItalicWord>{' '}
              for TikTok creator monetization.
            </h1>
          </div>
          <p className="text-[17px] text-ink-soft leading-[1.6] max-w-[520px]">
            TikTok Creativity Program (tiktokcreativityprogram.com) is a free,
            independent educational resource dedicated to helping TikTok creators
            maximize their earnings through the Creator Rewards Program and beyond.
          </p>
        </div>
      </section>

      {/* Section i — What we do */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <SectionMarker numeral="i" heading="What we do.">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-14 max-w-[1100px]">
            <div className="space-y-4 text-[15px] text-ink-soft leading-[1.7]">
              <p>
                We provide in-depth guides, data-driven calculators, and practical
                tools that help creators at every stage, whether you&apos;re
                working toward your first 10,000 followers or optimizing RPM on an
                established account.
              </p>
            </div>
            <ul className="space-y-4 text-[15px] text-ink-soft leading-[1.65]">
              <li>
                <strong className="text-ink">100+ free guides</strong> covering
                Creator Rewards eligibility, RPM optimization, qualified views,
                niche-specific strategies, and monetization beyond TikTok.
              </li>
              <li>
                <strong className="text-ink">Earnings calculators</strong> to
                model your income based on views, RPM, niche, and audience
                geography.
              </li>
              <li>
                <strong className="text-ink">Tool and equipment recommendations</strong>{' '}
                with honest reviews and transparent affiliate disclosures.
              </li>
              <li>
                <strong className="text-ink">Free downloadable resources</strong>{' '}
                including the{' '}
                <Link
                  href="/lead-magnets/rpm-cheat-sheet"
                  className="text-brand-primaryDeep font-semibold hover:underline"
                >
                  RPM Cheat Sheet
                </Link>{' '}
                and{' '}
                <Link
                  href="/lead-magnets/eligibility-checklist"
                  className="text-brand-primaryDeep font-semibold hover:underline"
                >
                  Eligibility Checklist
                </Link>
                .
              </li>
              <li>
                <strong className="text-ink">Regular updates</strong> when TikTok
                changes its policies, features, or Creator Rewards requirements.
              </li>
            </ul>
          </div>
        </SectionMarker>
      </section>

      {/* Section ii — Approach */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <SectionMarker numeral="ii" heading="Our approach.">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-14 max-w-[1100px]">
            <div className="space-y-4 text-[15px] text-ink-soft leading-[1.7]">
              <p>
                We focus on practical, honest guidance. Every guide covers the
                upside and the downsides. We cite community data where available,
                mark estimates clearly, and update content when TikTok changes the
                rules.
              </p>
            </div>
            <div className="space-y-4 text-[15px] text-ink-soft leading-[1.7]">
              <p>
                There is no course to sell, no membership gate, and no paywall.
                All of our guides, calculators, and tools are 100% free.
              </p>
            </div>
          </div>
        </SectionMarker>
      </section>

      {/* Section iii — Who this is for */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <SectionMarker numeral="iii" heading="Who this is for.">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-14 max-w-[1100px]">
            <p className="text-[15px] text-ink-soft leading-[1.7]">
              Our content is designed for TikTok creators who want to earn through
              the Creator Rewards Program (formerly the Creativity Program Beta).
            </p>
            <ul className="space-y-3 text-[15px] text-ink-soft leading-[1.65]">
              <li>A new creator figuring out how to get accepted.</li>
              <li>
                An active creator looking to increase RPM and qualified views.
              </li>
              <li>
                An established creator building multiple income streams beyond
                Creator Rewards.
              </li>
            </ul>
          </div>
          <p className="mt-6 text-[15px] text-ink-soft leading-[1.7] max-w-[680px]">
            We built this site to make the path clearer.
          </p>
        </SectionMarker>
      </section>

      {/* Mission callout — dark block */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <DarkCallout title="We are" italic="independent.">
          <p className="m-0 mb-4">
            We are not affiliated with, endorsed by, or sponsored by TikTok or
            ByteDance. All opinions and recommendations are our own.
          </p>
          <p className="m-0">
            Some pages contain affiliate links to tools and services we recommend.
            We earn a small commission if you purchase through these links, at no
            additional cost to you. Affiliate relationships never influence our
            editorial recommendations. See our{' '}
            <Link
              href="/affiliate-disclosure"
              className="font-semibold"
              style={{ color: '#F4A261' }}
            >
              Affiliate Disclosure
            </Link>{' '}
            for details.
          </p>
        </DarkCallout>
      </section>

      {/* Section iv — Get in touch */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-20">
        <SectionMarker numeral="iv" heading="Get in touch.">
          <div className="max-w-[760px] space-y-4 text-[15px] text-ink-soft leading-[1.7]">
            <p>
              Have feedback, a correction, or a topic you want covered? We
              prioritize guides that creators ask for most.
            </p>
            <p>
              Email us at{' '}
              <a
                href="mailto:hello@tiktokcreativityprogram.com"
                className="text-brand-primaryDeep font-semibold hover:underline"
              >
                hello@tiktokcreativityprogram.com
              </a>{' '}
              or visit our{' '}
              <Link
                href="/contact"
                className="text-brand-primaryDeep font-semibold hover:underline"
              >
                Contact page
              </Link>
              .
            </p>
          </div>
        </SectionMarker>
      </section>
    </div>
  )
}
