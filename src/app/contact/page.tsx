import Container from '@/components/ui/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Questions, corrections, or collaboration ideas? Get in touch with the TikTok Creativity Program team.',
}

export default function ContactPage() {
  return (
    <section className="py-12">
      <Container size="narrow">
        <div className="space-y-6">
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold text-[var(--color-text)]">Contact</h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Questions, corrections, or collab ideas? Email us and we’ll get back within 2
              business days.
            </p>
          </header>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 text-sm text-[var(--color-text)]">
            <p>
              Email: <a className="text-[var(--color-primary)]" href="mailto:hello@tiktokcreativityprogram.com">hello@tiktokcreativityprogram.com</a>
            </p>
            <p className="mt-3 text-[var(--color-text-muted)]">
              If you’re sharing a Creator Rewards issue, include your country, content format, and
              recent view totals so we can respond accurately.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
