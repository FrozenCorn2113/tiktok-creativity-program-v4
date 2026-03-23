import Container from '@/components/ui/Container'
import CalloutBox from '@/components/CalloutBox'
import EmailSignupForm from '@/components/EmailSignupForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Content Planning Template',
  description: 'A weekly content planning template designed for TikTok creators in the Creator Rewards Program.',
}

export default function ContentPlanningTemplatePage() {
  return (
    <section className="py-12">
      <Container size="narrow">
        <div className="space-y-6">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-subtle)]">
              Download
            </p>
            <h1 className="text-3xl font-semibold text-[var(--color-text)]">
              Content Planning Template
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Plan 30 days of TikTok content with a simple calendar and performance tracker.
            </p>
          </header>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 text-sm">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">What’s inside</h2>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>30-day calendar view</li>
              <li>Content idea tracker</li>
              <li>Performance notes by post</li>
              <li>Weekly summary section</li>
            </ul>
            <CalloutBox type="info" className="mt-4">
              Use the tracker weekly to spot which topics drive the highest retention.
            </CalloutBox>
          </div>

          <EmailSignupForm variant="inline" />
        </div>
      </Container>
    </section>
  )
}
