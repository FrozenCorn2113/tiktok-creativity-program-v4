import Container from '@/components/ui/Container'
import CalloutBox from '@/components/CalloutBox'
import EmailSignupForm from '@/components/EmailSignupForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TikTok Creator Rewards Newsletter — Free',
  description: 'Weekly updates, tactics, and data-backed strategies for TikTok creators. Free to join.',
}

export default function NewsletterPage() {
  return (
    <section className="py-12">
      <Container size="narrow">
        <div className="space-y-6">
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold text-[var(--color-text)]">
              TikTok Creator Rewards Newsletter
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Weekly updates, tactics, and data-backed strategies for creators. Free to join, no strings.
            </p>
          </header>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 text-sm">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">What you get</h2>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>RPM optimization tactics</li>
              <li>Monthly tool roundups and honest reviews</li>
              <li>Updates when TikTok changes the program rules</li>
            </ul>
          </div>

          <CalloutBox type="info">
            Free newsletter — no paid tier, no upsells. Just useful information.
          </CalloutBox>

          <EmailSignupForm variant="inline" />
        </div>
      </Container>
    </section>
  )
}
