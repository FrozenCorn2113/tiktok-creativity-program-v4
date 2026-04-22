// Newsletter page — Phase 7 TCP redesign
// Reference: /tmp/tcp-zip/directions/newsletter-archive.jsx
// NOTE: All existing copy preserved. Issue archive list deferred until issue
// data exists in the repo. Only chrome/visual layer restyled.
// TODO: when newsletter issue data lands (e.g., src/data/newsletter.ts), render
// the paper-card archive rows here using mono dates + line dividers pattern.

import Link from 'next/link'
import type { Metadata } from 'next'
import EmailSignupForm from '@/components/EmailSignupForm'
import {
  EyebrowLabel,
  ItalicWord,
  DarkCallout,
} from '@/components/tcp'

export const metadata: Metadata = {
  title: 'TikTok Creator Rewards Newsletter — Free',
  description:
    'Weekly updates, tactics, and data-backed strategies for TikTok creators. Free to join.',
}

const perks = [
  'RPM optimization tactics',
  'Monthly tool roundups and honest reviews',
  'Updates when TikTok changes the program rules',
]

export default function NewsletterPage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-[64px] md:pt-[88px] pb-10">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-ink-soft font-mono">
            <li>
              <Link href="/" className="hover:text-ink transition-colors">
                Home
              </Link>
            </li>
            <li className="text-line">/</li>
            <li className="text-ink">Newsletter</li>
          </ol>
        </nav>

        <EyebrowLabel className="mb-4 block">Free every Sunday</EyebrowLabel>
        <h1 className="font-sans text-[44px] md:text-[72px] lg:text-[84px] leading-[0.98] tracking-[-0.04em] font-medium text-ink m-0 max-w-[1150px]">
          The TikTok Creator Rewards{' '}
          <ItalicWord color="#C2622A">newsletter</ItalicWord>.
        </h1>
        <p className="text-[18px] text-ink-soft mt-5 max-w-[680px] leading-[1.55]">
          Weekly updates, tactics, and data-backed strategies for creators. Free
          to join, no strings.
        </p>
      </section>

      {/* What you get — paper card with line dividers */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-10">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
          <h2 className="font-sans text-[28px] md:text-[32px] leading-[1.05] tracking-[-0.02em] font-medium text-ink m-0">
            What you <ItalicWord color="#C2622A">get</ItalicWord>.
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
            {perks.length} topics · every Sunday
          </span>
        </div>

        <div className="rounded-[20px] border border-line bg-white overflow-hidden">
          {perks.map((perk, i) => (
            <div
              key={perk}
              className={`grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] items-center gap-6 px-6 md:px-8 py-6 ${
                i !== perks.length - 1 ? 'border-b border-line' : ''
              }`}
            >
              <div className="font-mono text-[12px] text-brand-primaryDeep tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="text-[15px] md:text-[17px] font-semibold text-ink tracking-[-0.01em]">
                {perk}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Free promise callout */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <DarkCallout title="Free newsletter." italic="No upsells.">
          No paid tier, no upsells. Just useful information delivered once a week.
        </DarkCallout>
      </section>

      {/* Inline signup */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-16">
        <EmailSignupForm variant="inline" />
      </div>
    </div>
  )
}
