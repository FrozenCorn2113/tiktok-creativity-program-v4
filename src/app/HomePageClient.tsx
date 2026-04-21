// TCP Phase 3 — Warm-refined homepage
// Reference: /tmp/tcp-zip/directions/home-warm-refined.jsx
// Preserves all existing data sources (featured guides, calculator cards,
// email signup). Content unchanged — visual layer rebuilt on Phase 2 primitives.

'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  EyebrowLabel,
  ItalicWord,
  SectionMarker,
  DataPill,
} from '@/components/tcp'
import EmailSignupForm from '@/components/EmailSignupForm'
import type { GuideCardData } from '@/components/sections/guide-cards'

// ─── Data (unchanged — mirrors previous HomePageClient) ────────────────────
const featuredGuides: GuideCardData[] = [
  {
    slug: 'creator-rewards-2026',
    title: 'TikTok Creator Rewards Program 2026: Complete Guide',
    excerpt:
      'Eligibility requirements, how the program works, what qualified views actually means, and how payouts are calculated.',
    href: '/guides/creator-rewards-2026',
    category: 'Getting Started',
    readTime: '12 min',
  },
  {
    slug: 'optimize-rpm',
    title: 'How to Improve Your RPM',
    excerpt:
      'Country mix, niche, content length, completion rate — everything that moves the RPM needle.',
    href: '/guides/optimize-rpm',
    category: 'Maximize Earnings',
    readTime: '10 min',
  },
  {
    slug: 'maximize-qualified-views',
    title: 'How to Maximize Qualified Views',
    excerpt:
      'Why your qualified view count is lower than your total views, and what to do about it.',
    href: '/guides/maximize-qualified-views',
    category: 'Maximize Earnings',
    readTime: '8 min',
  },
  {
    slug: 'appeal-rejection',
    title: 'What to Do If Your Application Is Rejected',
    excerpt:
      'The real reasons applications fail and the exact steps to appeal or reapply successfully.',
    href: '/guides/appeal-rejection',
    category: 'Troubleshooting',
    readTime: '7 min',
  },
]

const threePaths = [
  {
    numeral: 'I',
    title: 'Not yet eligible',
    body: 'Get to 10K followers and 100K views the right way, with content that qualifies.',
    meta: '6 guides · 42 min',
    href: '/guides/eligibility-requirements',
    image: '/images/calculators/hero-follower.webp',
  },
  {
    numeral: 'II',
    title: 'Just qualified',
    body: 'Apply cleanly, avoid rejection triggers, and ship your first qualifying video.',
    meta: '9 guides · 68 min',
    href: '/guides/creator-rewards-2026',
    image: '/images/calculators/hero-earnings.webp',
  },
  {
    numeral: 'III',
    title: 'Already earning',
    body: 'Improve RPM, qualified-view rate, and make payouts predictable month after month.',
    meta: '14 guides · 2h 10m',
    href: '/guides/optimize-rpm',
    image: '/images/calculators/hero-rpm.webp',
  },
]

const calculators = [
  {
    title: 'Earnings Calculator',
    blurb: 'Estimate payouts from qualified views and RPM.',
    href: '/calculators/earnings-calculator',
    image: '/images/calculators/hero-earnings.webp',
  },
  {
    title: 'RPM by Country',
    blurb: 'Benchmark your blended RPM against regional data.',
    href: '/calculators/rpm-by-country',
    image: '/images/calculators/hero-rpm.webp',
  },
  {
    title: 'Follower Income Estimator',
    blurb: 'Rough earnings read from follower count.',
    href: '/calculators/follower-income-estimator',
    image: '/images/calculators/hero-follower.webp',
  },
]

const rpms: Array<[string, string, string]> = [
  ['US', '$1.08', '+2.1%'],
  ['UK', '$0.87', '-0.4%'],
  ['DE', '$0.62', '+1.2%'],
  ['FR', '$0.58', '+0.9%'],
  ['CA', '$0.94', '+1.6%'],
  ['AU', '$0.82', '+0.3%'],
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function HomePageClient() {
  return (
    <div className="bg-paper text-ink">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1400px] px-6 pt-14 pb-16 lg:px-[52px] lg:pt-16 lg:pb-[52px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left — headline + CTAs + trust line */}
          <div>
            <EyebrowLabel>Trusted by Creators</EyebrowLabel>
            <h1
              className="mt-5 font-sans font-medium text-ink"
              style={{
                fontSize: 'clamp(40px, 7.2vw, 72px)',
                lineHeight: 0.98,
                letterSpacing: '-0.04em',
                textWrap: 'balance',
              }}
            >
              The real guide to getting{' '}
              <ItalicWord color="#C2622A">paid</ItalicWord> by TikTok.
            </h1>
            <p
              className="mt-7 text-ink-soft"
              style={{ fontSize: 18, lineHeight: 1.55, maxWidth: 600 }}
            >
              Independent guides, honest calculators, and quarterly benchmarks
              built from real creator reports, not viral RPM screenshots.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/calculators/earnings-calculator"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-4 text-paper transition-opacity hover:opacity-90"
                style={{ fontSize: 15, fontWeight: 600 }}
              >
                Estimate my earnings <span aria-hidden>→</span>
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-4 text-ink transition-colors hover:bg-soft"
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  borderColor: 'rgba(15,14,12,0.15)',
                }}
              >
                Start with the guides
              </Link>
            </div>

            {/* Trust row: avatar stack + subscriber stat */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex">
                {[
                  { bg: '#F4A261', fg: '#FBF6EC', label: 'AM' },
                  { bg: '#C2622A', fg: '#FBF6EC', label: 'JS' },
                  { bg: '#0F0E0C', fg: '#FBF6EC', label: 'RK' },
                  { bg: '#49443D', fg: '#FBF6EC', label: 'TL' },
                  { bg: '#FFF1E6', fg: '#0F0E0C', label: 'DP' },
                ].map((a, i) => (
                  <div
                    key={a.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full font-semibold"
                    style={{
                      background: a.bg,
                      color: a.fg,
                      border: '2px solid #FBF6EC',
                      marginLeft: i === 0 ? 0 : -10,
                      fontSize: 12,
                    }}
                  >
                    {a.label}
                  </div>
                ))}
              </div>
              <div className="text-[13px] leading-snug text-ink-soft">
                <div>
                  <span className="font-semibold text-ink">12,400 creators</span>{' '}
                  read us every Sunday
                </div>
                <div className="mt-0.5 text-[12px] opacity-70">
                  ★★★★★ &nbsp;&ldquo;finally, plain English&rdquo;
                </div>
              </div>
            </div>
          </div>

          {/* Right — hero illustration stack */}
          <div className="relative mx-auto w-full max-w-[560px] lg:h-[560px]">
            {/* Main dark earnings card */}
            <div
              className="relative rounded-[24px] bg-ink p-7 text-paper shadow-[0_30px_80px_rgba(15,14,12,0.22)] lg:absolute lg:left-[80px] lg:right-0 lg:top-[80px] lg:bottom-[40px]"
              style={{ borderRadius: 24 }}
            >
              <div className="flex items-center justify-between">
                <EyebrowLabel tone="paper">Last 30 days</EyebrowLabel>
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F4A261]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[rgba(251,246,236,0.2)]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[rgba(251,246,236,0.2)]" />
                </div>
              </div>
              <div
                className="mt-3 font-serif"
                style={{
                  fontSize: 72,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  fontStyle: 'italic',
                }}
              >
                $2,840
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-[13px] opacity-70">
                <span className="text-[#F4A261]">↑ 12.4%</span>
                vs. previous month
              </div>

              {/* Mini chart */}
              <svg
                viewBox="0 0 300 80"
                preserveAspectRatio="none"
                className="mt-6 block w-full"
                aria-hidden
              >
                <path
                  d="M0,60 L30,50 L60,55 L90,42 L120,48 L150,38 L180,30 L210,35 L240,22 L270,18 L300,10"
                  fill="none"
                  stroke="#F4A261"
                  strokeWidth="2"
                />
                <path
                  d="M0,60 L30,50 L60,55 L90,42 L120,48 L150,38 L180,30 L210,35 L240,22 L270,18 L300,10 L300,80 L0,80 Z"
                  fill="#F4A261"
                  fillOpacity="0.12"
                />
              </svg>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {[
                  ['Qualifying rate', '38.2%'],
                  ['Blended RPM', '$1.08'],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-2xl p-3.5"
                    style={{ background: 'rgba(251,246,236,0.05)' }}
                  >
                    <div className="text-[11px] opacity-60">{k}</div>
                    <div
                      className="mt-0.5 font-medium tabular-nums"
                      style={{ fontSize: 22 }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/calculators/earnings-calculator"
                className="mt-5 flex items-center justify-between rounded-2xl p-3.5 text-ink transition-opacity hover:opacity-90"
                style={{ background: '#F4A261' }}
              >
                <span className="text-[13px] font-semibold">
                  Run your own numbers
                </span>
                <span className="text-lg">→</span>
              </Link>
            </div>

            {/* Callout chip — desktop only overlay */}
            <div
              className="mt-6 hidden lg:mt-0 lg:block lg:absolute lg:top-[-10px] lg:left-[-20px] lg:h-[170px] lg:w-[170px] lg:-rotate-[5deg] lg:z-10"
              style={{
                background: '#FFF1E6',
                borderRadius: 24,
                boxShadow: '0 12px 40px rgba(15,14,12,0.1)',
              }}
            >
              <div className="flex h-full w-full flex-col items-center justify-center text-center">
                <div
                  className="font-serif italic"
                  style={{
                    fontSize: 56,
                    lineHeight: 1,
                    color: '#C2622A',
                  }}
                >
                  47
                </div>
                <div
                  className="mt-1.5 font-semibold uppercase"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    color: '#C2622A',
                  }}
                >
                  In-depth guides
                </div>
              </div>
            </div>

            {/* Small creator badge — desktop only overlay */}
            <div
              className="hidden lg:flex lg:absolute lg:-bottom-6 lg:-right-2 lg:z-10 lg:items-center lg:gap-2.5"
              style={{
                background: '#FBF6EC',
                border: '1px solid rgba(15,14,12,0.08)',
                borderRadius: 100,
                padding: '12px 16px',
                boxShadow: '0 8px 24px rgba(15,14,12,0.08)',
              }}
            >
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full font-bold text-ink"
                style={{ background: '#F4A261', fontSize: 11 }}
              >
                AM
              </div>
              <div className="text-[12px] leading-tight">
                <div className="font-semibold">Ana M. — Q1 payout</div>
                <div className="text-ink-soft tabular-nums">
                  $4,210 · 2.1M views
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Country RPM strip ────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1400px] px-6 lg:px-[52px]">
        <div
          className="rounded-[20px] bg-ink text-paper"
          style={{ padding: '28px 44px' }}
        >
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[auto_1fr] lg:gap-10">
            <div>
              <div
                className="font-mono font-medium uppercase"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  color: '#F4A261',
                }}
              >
                Live · Snapshot
              </div>
              <div
                className="mt-1.5 whitespace-nowrap font-medium"
                style={{ fontSize: 16, letterSpacing: '-0.01em' }}
              >
                RPM by country
              </div>
            </div>
            <div
              className="grid grid-cols-3 gap-4 md:grid-cols-6 lg:border-l lg:pl-8"
              style={{ borderColor: 'rgba(251,246,236,0.12)' }}
            >
              {rpms.map(([c, v, d]) => (
                <div key={c}>
                  <div
                    className="font-mono opacity-55"
                    style={{ fontSize: 11, letterSpacing: '0.08em' }}
                  >
                    {c}
                  </div>
                  <div
                    className="mt-0.5 font-medium tabular-nums"
                    style={{ fontSize: 22, letterSpacing: '-0.02em' }}
                  >
                    {v}
                  </div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      color: d.startsWith('+')
                        ? '#F4A261'
                        : 'rgba(251,246,236,0.5)',
                    }}
                  >
                    {d}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Three-path ───────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1400px] px-6 pt-20 lg:px-[52px]">
        <SectionMarker
          numeral="i"
          heading="Pick your starting line."
          italicWord="starting"
        />
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {threePaths.map((p, i) => {
            const isFeatured = i === 1
            return (
              <Link
                key={p.numeral}
                href={p.href}
                className="group block overflow-hidden rounded-[20px] transition-transform hover:-translate-y-0.5"
                style={{
                  background: isFeatured ? '#0F0E0C' : '#FFFFFF',
                  color: isFeatured ? '#FBF6EC' : '#0F0E0C',
                  border: isFeatured
                    ? 'none'
                    : '1px solid rgba(15,14,12,0.08)',
                }}
              >
                <div
                  className="relative h-44 overflow-hidden"
                  style={{
                    background: isFeatured
                      ? 'rgba(244,162,97,0.12)'
                      : '#FFF1E6',
                  }}
                >
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute left-5 top-3 font-serif italic"
                    style={{
                      fontSize: 44,
                      lineHeight: 1,
                      color: '#F4A261',
                      textShadow: '0 2px 16px rgba(15,14,12,0.2)',
                    }}
                  >
                    {p.numeral}
                  </div>
                </div>
                <div className="p-7">
                  <h3
                    className="font-semibold"
                    style={{ fontSize: 24, letterSpacing: '-0.02em' }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="mt-3 mb-5"
                    style={{
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: isFeatured
                        ? 'rgba(251,246,236,0.7)'
                        : '#49443D',
                    }}
                  >
                    {p.body}
                  </p>
                  <div
                    className="flex items-center justify-between pt-4"
                    style={{
                      borderTop: `1px solid ${
                        isFeatured
                          ? 'rgba(251,246,236,0.12)'
                          : 'rgba(15,14,12,0.08)'
                      }`,
                    }}
                  >
                    <span
                      className="font-mono opacity-70"
                      style={{ fontSize: 11 }}
                    >
                      {p.meta}
                    </span>
                    <span
                      className="font-semibold"
                      style={{ fontSize: 14 }}
                    >
                      Start →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Featured guides ──────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1400px] px-6 pt-20 lg:px-[52px]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <SectionMarker
            numeral="ii"
            heading="Guides worth reading first."
            italicWord="reading"
            className="max-w-3xl"
          />
          <Link
            href="/guides"
            className="shrink-0 text-[14px] font-semibold text-ink hover:underline"
          >
            All guides →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr_1fr]">
          {/* Featured (first) — spans 2 rows on desktop */}
          <Link
            href={featuredGuides[0].href}
            className="block overflow-hidden rounded-[20px] bg-white lg:row-span-2"
            style={{ border: '1px solid rgba(15,14,12,0.08)' }}
          >
            <div
              className="relative h-64 lg:h-80"
              style={{ background: '#FFF1E6' }}
            >
              <Image
                src="/images/brand/hero-illustration.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute left-5 top-5">
                <DataPill variant="emphasis">
                  <span className="font-mono uppercase tracking-[0.08em]">
                    Editor&rsquo;s pick
                  </span>
                </DataPill>
              </div>
            </div>
            <div className="p-9">
              <EyebrowLabel>
                {featuredGuides[0].category} · {featuredGuides[0].readTime}
              </EyebrowLabel>
              <h3
                className="mt-3.5 font-medium"
                style={{
                  fontSize: 30,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                {featuredGuides[0].title}
              </h3>
              <p
                className="mt-4 text-ink-soft"
                style={{ fontSize: 15, lineHeight: 1.6, maxWidth: 520 }}
              >
                {featuredGuides[0].excerpt}
              </p>
              <div className="mt-6 text-[14px] font-semibold">
                Read the guide →
              </div>
            </div>
          </Link>

          {/* Side cards */}
          {featuredGuides.slice(1, 4).map((g, idx) => (
            <Link
              key={g.slug}
              href={g.href}
              className="block rounded-[16px] bg-white p-5"
              style={{ border: '1px solid rgba(15,14,12,0.08)' }}
            >
              <div className="flex items-baseline justify-between">
                <span
                  aria-hidden
                  className="font-serif italic"
                  style={{
                    fontSize: 30,
                    lineHeight: 1,
                    color: '#F4A261',
                  }}
                >
                  {String(idx + 2).padStart(2, '0')}
                </span>
                <EyebrowLabel tone="inkSoft">{g.readTime}</EyebrowLabel>
              </div>
              <div className="mt-3">
                <EyebrowLabel>{g.category}</EyebrowLabel>
              </div>
              <h3
                className="mt-2 font-semibold"
                style={{
                  fontSize: 17,
                  lineHeight: 1.25,
                  letterSpacing: '-0.01em',
                }}
              >
                {g.title}
              </h3>
              <p
                className="mt-2.5 text-ink-soft"
                style={{ fontSize: 13, lineHeight: 1.55 }}
              >
                {g.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Calculators ──────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1400px] px-6 pt-20 lg:px-[52px]">
        <SectionMarker
          numeral="iii"
          heading="Run your actual numbers."
          italicWord="actual"
        />
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {calculators.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group flex flex-col overflow-hidden rounded-[20px] bg-white transition-transform hover:-translate-y-0.5"
              style={{ border: '1px solid rgba(15,14,12,0.08)' }}
            >
              <div
                className="relative h-44"
                style={{ background: '#FFF1E6' }}
              >
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div>
                  <DataPill variant="soft">Free</DataPill>
                </div>
                <h3
                  className="mt-4 font-semibold"
                  style={{
                    fontSize: 22,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                  }}
                >
                  {c.title}
                </h3>
                <p
                  className="mt-2.5 flex-1 text-ink-soft"
                  style={{ fontSize: 14, lineHeight: 1.55 }}
                >
                  {c.blurb}
                </p>
                <div
                  className="mt-5 flex items-center justify-between pt-4"
                  style={{ borderTop: '1px solid rgba(15,14,12,0.08)' }}
                >
                  <EyebrowLabel>Calculator</EyebrowLabel>
                  <span className="text-[14px] font-semibold">Open →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Email / Dispatch (inline TCPNewsletter pattern) ──────────────── */}
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-20 pb-6 lg:px-[52px]">
        <EmailSignupForm
          variant="inline"
          title="Benchmarks in your inbox."
          description="Weekly RPM updates, policy changes, and one sharp essay. No listicles. No upsells. Unsubscribe in a click."
          ctaLabel="Subscribe →"
        />
      </div>

      {/* ── Trust strip ──────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-20 lg:px-[52px]">
        <p className="text-center text-[13px] text-ink-soft">
          Independent resource, not affiliated with TikTok or ByteDance.
          Updated weekly.
        </p>
      </div>
    </div>
  )
}
