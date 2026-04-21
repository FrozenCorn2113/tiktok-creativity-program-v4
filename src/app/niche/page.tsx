// Niches index — Phase 4 TCP redesign
// Reference: /tmp/tcp-zip/directions/niches.jsx
// Data source: src/app/niche/[slug]/niche-data.ts (unchanged)
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { buildMetadata } from '@/lib/seo'
import { EmailCapture } from '@/components/sections/email-capture'
import { EyebrowLabel, ItalicWord, SectionMarker } from '@/components/tcp'
import { nicheIndex } from './[slug]/niche-data'

export const metadata: Metadata = buildMetadata({
  title: 'TikTok Monetization by Niche: Creator Type Guides',
  description:
    'Monetization strategies tailored to your content type. Whether you create music, fitness, comedy, travel, beauty, or education content, here is how to earn more on TikTok.',
  path: '/niche',
})

export default function NichesIndexPage() {
  const niches = nicheIndex

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-[88px] pb-8">
        <EyebrowLabel className="mb-4 block">Niche guides · 8 creator types</EyebrowLabel>
        <h1 className="font-sans text-[44px] md:text-[72px] lg:text-[84px] leading-[0.98] tracking-[-0.04em] font-medium text-ink m-0 max-w-[1200px]">
          Monetization guides{' '}
          <ItalicWord color="#C2622A">for your niche</ItalicWord>.
        </h1>
        <p className="text-[18px] text-ink-soft mt-6 max-w-[700px] leading-[1.55]">
          Generic TikTok advice ignores what actually matters for your content type. These guides are written for specific creator categories, with revenue breakdowns, tool picks, and strategy that fits how you already create.
        </p>
      </section>

      {/* Niche cards grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {niches.map((n) => (
            <Link
              key={n.slug}
              href={`/niche/${n.slug}`}
              className="group flex flex-col bg-white rounded-[22px] border border-line overflow-hidden hover:-translate-y-[3px] hover:border-brand-primaryDeep transition-all duration-200 hover:shadow-[0_12px_32px_-18px_rgba(194,98,42,0.35)]"
            >
              <div className="relative h-[240px] bg-soft border-b border-line overflow-hidden">
                <Image
                  src={n.heroImage}
                  alt={`${n.label} illustration`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <div className="text-[24px] font-semibold tracking-[-0.02em] mb-2.5 text-ink">{n.label}</div>
                <p className="text-[14px] text-ink-soft leading-[1.55] mb-4">{n.tagline}</p>
                <div className="flex flex-col gap-1.5 mb-5">
                  {n.focus.map((l) => (
                    <div key={l} className="flex items-center gap-2.5 text-[13px] text-ink-soft">
                      <span className="w-[5px] h-[5px] rounded-full bg-brand-primary flex-shrink-0" aria-hidden />
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t border-line flex items-center gap-2 text-[13px] font-semibold text-brand-primaryDeep">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 3h10v10H3V3z M3 6h10" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span>Read the full guide</span>
                  <span className="ml-auto transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Lead magnet CTA */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] py-8">
        <EmailCapture
          headline="Get the niche-specific Creator Rewards breakdown"
          subheadline="RPM ranges, best content formats, and monetization paths by creator type. Free."
          cta="Send It to Me"
          showImage={false}
        />
      </section>

      {/* Ultimate guides — dense grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-12">
        <SectionMarker numeral="ii" heading="Ultimate guides by niche.">
          <p className="text-[16px] text-ink-soft leading-[1.55] max-w-[720px] m-0">
            Each ultimate guide covers the full picture for that creator type: Creator Rewards strategy, additional income streams, tools, and a month-one action plan.
          </p>
        </SectionMarker>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {niches.map((n) => (
            <Link
              key={`u-${n.slug}`}
              href={`/guides/${n.guideSlug}`}
              className="flex flex-col bg-white rounded-[18px] border border-line overflow-hidden hover:border-brand-primaryDeep hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="relative h-[140px] bg-soft border-b border-line">
                <Image
                  src={n.heroImage}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <EyebrowLabel className="mb-2 block">Ultimate guide</EyebrowLabel>
                <div className="text-[15px] font-semibold leading-[1.35] text-ink">
                  Ultimate TikTok Monetization Guide for {n.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
