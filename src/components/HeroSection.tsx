// Based on 21st.dev moumensoliman/hero-section-shadcnui - customized per BRAND.md v2.0
// Source: https://21st.dev/components/moumensoliman/hero-section-shadcnui
// H1-H6 per Mandatory Implementation Checklist

import Image from 'next/image'
import Link from 'next/link'

type HeroSectionProps = {
  title?: string
  subtitle?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  eyebrow?: string
}

export default function HeroSection({
  title = 'The TikTok Creator Rewards Program, explained plainly.',
  subtitle = 'Eligibility requirements, earnings calculators, and practical guides — no hype, no fluff.',
  primaryCta = { label: 'Start here', href: '/start-here' },
  secondaryCta = { label: 'Browse guides', href: '/guides' },
  eyebrow = 'Free Guide',
}: HeroSectionProps) {
  return (
    // H3: gradient bg from white to warm-white — NOT flat
    <section className="bg-gradient-to-b from-white to-[#FFF8F2] pb-0 pt-16 sm:pt-20">
      {/* H2: max-w-5xl centered, grid cols-[3fr_2fr] on desktop */}
      <div className="mx-auto max-w-5xl px-4 pb-12 pt-4 sm:pb-16">
        <div className="grid items-center gap-8 md:grid-cols-[3fr_2fr] md:gap-12">

          {/* H4: Left column — eyebrow, H1, subtitle, buttons */}
          <div className="flex flex-col">
            {/* H4: Eyebrow pill badge */}
            <span
              className="mb-4 inline-flex w-fit items-center rounded-full bg-[#FFE9D5] px-3 py-1 text-[12px] font-[600] text-[#E58B3A]"
              // H6: fades in first — CSS animation-delay-0
              style={{ animationDelay: '0ms' }}
            >
              {eyebrow}
            </span>

            {/* H4: H1 display text — Manrope 800, tracking-tight, max-w-[520px] */}
            <h1
              className="max-w-[520px] text-[2.5rem] font-[800] leading-[1.15] tracking-tight text-[#0F172A] md:text-[3.5rem]"
              style={{ animationDelay: '150ms' }}
            >
              {title}
            </h1>

            {/* H4: Subtitle — body-large, text-muted */}
            <p
              className="mt-4 max-w-[480px] text-[1.125rem] leading-[1.7] text-[#475467]"
              style={{ animationDelay: '300ms' }}
            >
              {subtitle}
            </p>

            {/* H4: Button row */}
            <div
              className="mt-8 flex flex-wrap gap-4"
              style={{ animationDelay: '450ms' }}
            >
              <Link
                href={primaryCta.href}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 text-[15px] font-[600] text-[#0F172A] shadow-none transition-all duration-150 hover:bg-[#E58B3A] hover:shadow-sm active:scale-95"
              >
                {primaryCta.label}
              </Link>
              <Link
                href={secondaryCta.href}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#E8D5C4] bg-white px-6 py-3 text-[15px] font-[600] text-[#0F172A] transition-all duration-150 hover:border-[#DFD1C4] hover:bg-[#FFF8F2]"
              >
                {secondaryCta.label}
              </Link>
            </div>
          </div>

          {/* H5: Right column — illustration, desktop only */}
          {/* hidden md:block — shows only on desktop */}
          <div className="relative hidden h-[440px] w-full md:block">
            <Image
              src="/assets/brand-images/landpress-marketing-hero.png"
              alt="Creator reviewing TikTok Creator Rewards earnings dashboard"
              fill
              className="object-contain object-right"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
