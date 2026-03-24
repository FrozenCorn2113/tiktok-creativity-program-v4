import Container from '@/components/ui/Container'
import { Mail, MessageCircle, FileText } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Questions, corrections, or collaboration ideas? Get in touch with the TikTok Creativity Program team.',
}

export default function ContactPage() {
  return (
    <section className="py-12">
      <Container size="narrow">
        <div className="space-y-8">
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold text-[var(--color-text)]">Contact Us</h1>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-lg">
              Questions, corrections, topic suggestions, or collaboration ideas? We read every
              email and respond within 2 business days.
            </p>
          </header>

          {/* Email card */}
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-primarySoft flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-brand-primary" aria-hidden />
              </div>
              <div>
                <h2 className="font-semibold text-brand-ink mb-1">Email</h2>
                <a
                  className="text-brand-primaryDeep hover:underline text-sm"
                  href="mailto:hello@tiktokcreativityprogram.com"
                >
                  hello@tiktokcreativityprogram.com
                </a>
                <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                  Best for: general questions, topic requests, corrections, partnership inquiries
                </p>
              </div>
            </div>
          </div>

          {/* Tips for a faster response */}
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-surface p-6">
            <h3 className="font-semibold text-brand-ink mb-4 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-brand-primary" aria-hidden />
              Tips for a faster response
            </h3>
            <ul className="space-y-3 text-sm text-[var(--color-text-muted)]">
              <li className="flex gap-2">
                <span className="text-brand-primary font-bold">1.</span>
                <span>
                  <strong className="text-brand-ink">Creator Rewards issues:</strong> Include
                  your country, content format (original/duet/stitch), and recent view totals so
                  we can respond accurately.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary font-bold">2.</span>
                <span>
                  <strong className="text-brand-ink">Content corrections:</strong> Link to the
                  specific guide and tell us what needs updating.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary font-bold">3.</span>
                <span>
                  <strong className="text-brand-ink">Topic requests:</strong> Tell us what
                  question you are trying to answer. The most useful guides we have written came
                  from specific reader questions.
                </span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6">
            <h3 className="font-semibold text-brand-ink mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-primary" aria-hidden />
              You might also need
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/guides" className="text-brand-primaryDeep hover:underline">
                  Browse all 100+ guides
                </a>
              </li>
              <li>
                <a href="/calculators/earnings-calculator" className="text-brand-primaryDeep hover:underline">
                  Earnings Calculator
                </a>
              </li>
              <li>
                <a href="/affiliate-disclosure" className="text-brand-primaryDeep hover:underline">
                  Affiliate Disclosure
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-brand-primaryDeep hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-brand-primaryDeep hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
