// Start Here page — Phase 3 v3 rebuild
// PAGE_SPECS.md: NO navigation (handled by layout), eligibility accordion, email capture primary CTA
// checklist items 79-84
// copy: CONTENT.md starthere-headline, starthere-subheadline, starthere-email-headline

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Star, CheckCircle } from 'lucide-react'
import { siteConfig } from '@/lib/site'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { EmailCapture } from '@/components/sections/email-capture'

export const metadata: Metadata = {
  title: `Start Here | ${siteConfig.name}`,
  description:
    'Get the free eligibility checklist — a plain-language breakdown of every requirement, plus what to do if you\'ve already been rejected.',
}

const eligibilityItems = [
  {
    id: 'followers',
    title: '10,000 followers minimum',
    content:
      'Your account must have at least 10,000 followers at the time of application. TikTok checks this at the moment you apply — not when you published your first video. Follower count from purchased followers or follow-for-follow exchanges often drops after join, which can void your eligibility.',
  },
  {
    id: 'views',
    title: '100,000 views in the last 30 days',
    content:
      '100,000 total video views in the 30 days before you apply. This includes all video formats, but note that the Creator Rewards Program only pays on qualified views (organic FYP views on 1+ minute videos). Your application views threshold and your payout view threshold are different numbers.',
  },
  {
    id: 'age',
    title: '18 years or older',
    content:
      'You must be at least 18 years old. TikTok may ask for identity verification. Accounts created under a parent\'s name that later transfer to the creator can cause issues — ensure your account name matches the identity you\'d use for payment.',
  },
  {
    id: 'account-type',
    title: 'Personal account (not Business)',
    content:
      'The Creator Rewards Program is available only to Personal accounts. Business accounts are not eligible. If you switched to a Business account to access analytics tools, you\'ll need to convert back to a Personal account before applying. Conversion is possible but resets some features.',
  },
  {
    id: 'country',
    title: 'Eligible country',
    content:
      'As of 2026, the program is available in: United States, United Kingdom, Germany, France, Japan, South Korea, Brazil, Canada, Australia, and a small number of additional markets. The eligible country list changes — verify at TikTok\'s official Creator Rewards help page before applying.',
  },
  {
    id: 'content',
    title: 'Original content only',
    content:
      'Your content must be original — not reposts, compilations, or heavily borrowed material. TikTok uses content matching to identify re-uploaded content. Accounts with a history of DMCA strikes or content violations are often rejected even if the metrics qualify.',
  },
]

export default function StartHerePage() {
  return (
    <>
      {/* Hero — conversion focused, single column centered */}
      {/* item 79: no nav (handled by layout), item 80: logo only in layout */}
      <section className="bg-background-warm py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Pre-headline badge */}
          <div className="inline-flex items-center gap-1.5 bg-brand-primarySoft text-brand-primaryDeep rounded-full px-4 py-1 text-sm font-semibold mb-6">
            <Star className="h-3.5 w-3.5" aria-hidden />
            Start Here
          </div>

          {/* H1 — from CONTENT.md starthere-headline */}
          <h1 className="text-[2rem] md:text-[3rem] font-extrabold text-brand-ink leading-tight mb-4">
            Not Sure If You Qualify for Creator Rewards?
          </h1>

          {/* Subheadline — from CONTENT.md starthere-subheadline */}
          <p className="text-[1.125rem] text-text-secondary leading-[1.7] mb-8 max-w-xl mx-auto">
            Get the free eligibility checklist — a plain-language breakdown of every requirement,
            plus what to do if you&apos;ve already been rejected.
          </p>

          {/* Brand image — item 81 */}
          <Image
            src="/images/brand/landpress-marketing-4.png"
            alt="TikTok creator getting started with the Creator Rewards Program"
            width={600}
            height={400}
            className="mx-auto rounded-2xl mb-8 object-contain max-h-[400px]"
            priority
            loading="eager"
          />
        </div>
      </section>

      {/* Eligibility checklist accordion — item 82 */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[2rem] font-bold text-brand-ink text-center mb-8">
            Are you eligible?
          </h2>

          <Accordion className="space-y-3">
            {eligibilityItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border border-border-default rounded-xl px-5 shadow-sm"
              >
                <AccordionTrigger className="flex items-center gap-3 text-left font-semibold text-brand-ink py-4 hover:no-underline min-h-[48px]">
                  <CheckCircle className="h-5 w-5 text-status-success shrink-0" aria-hidden />
                  <span>{item.title}</span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-text-secondary leading-[1.7] pb-4 pl-8">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Email capture — PRIMARY CTA, item 83, positioned right after eligibility */}
      {/* from CONTENT.md starthere-email-headline */}
      <EmailCapture
        headline="You'll Get the Checklist Right Now"
        subheadline="Every requirement in plain language, the most common rejection reasons, and what to do if your qualified views aren't counting. Updated for 2026."
        cta="Send Me the Checklist"
        showImage={false}
      />

      {/* Next steps — item: numbered 3-step list */}
      <section className="bg-background-warm py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[2rem] font-bold text-brand-ink mb-10">What happens next?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[
              {
                num: '1',
                title: 'Get the checklist',
                body: "You'll receive the eligibility checklist immediately — every requirement explained in plain language.",
              },
              {
                num: '2',
                title: 'Apply with confidence',
                body: 'Know exactly what TikTok checks before you hit apply. Avoid the most common rejection reasons.',
              },
              {
                num: '3',
                title: 'Start earning',
                body: 'Once approved, use our guides to optimize your RPM and maximize qualified views.',
              },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div
                  className="text-[3rem] font-extrabold text-brand-primary mb-3 leading-none"
                  style={{ opacity: 0.2 }}
                  aria-hidden
                >
                  {step.num}
                </div>
                <h3 className="text-[1.25rem] font-bold text-brand-ink mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-[1.65]">{step.body}</p>
              </div>
            ))}
          </div>

          <Link
            href="/guides"
            className="inline-flex items-center justify-center rounded-xl bg-brand-primary text-brand-ink hover:bg-brand-primaryHover font-bold min-h-[48px] px-8 transition-colors"
          >
            Browse all guides
          </Link>
        </div>
      </section>

      {/* Minimal footer — item 84: single-row dark bar, not full 4-column footer */}
      <footer className="bg-brand-ink py-8 px-6">
        <div className="max-w-container mx-auto flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} TikTok Creativity Program. Not affiliated with TikTok or ByteDance.</span>
          <Link href="/privacy" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/affiliate-disclosure" className="hover:text-gray-300 transition-colors">
            Affiliate Disclosure
          </Link>
        </div>
      </footer>
    </>
  )
}
