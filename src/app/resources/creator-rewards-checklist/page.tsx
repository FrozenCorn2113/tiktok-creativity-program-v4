import Container from '@/components/ui/Container'
import CalloutBox from '@/components/CalloutBox'
import EmailSignupForm from '@/components/EmailSignupForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creator Rewards Application Checklist',
  description: 'A pre-application checklist to avoid the most common TikTok Creator Rewards rejection reasons.',
}

export default function CreatorRewardsChecklistPage() {
  return (
    <section className="py-12">
      <Container size="narrow">
        <div className="space-y-6">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-subtle)]">
              Download
            </p>
            <h1 className="text-3xl font-semibold text-[var(--color-text)]">
              Creator Rewards Application Checklist
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Use this checklist before you apply to avoid the most common rejection reasons.
            </p>
          </header>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 text-sm">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">Checklist items</h2>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>✓ Personal account (not Business)</li>
              <li>✓ 10,000+ followers</li>
              <li>✓ 100,000+ views in the last 30 days</li>
              <li>✓ 1+ minute original videos posted after eligibility</li>
              <li>✓ No recent guideline violations</li>
            </ul>
            <CalloutBox type="tip" className="mt-4">
              If you’re missing one requirement, wait until the next 30-day window before applying.
            </CalloutBox>
          </div>

          <EmailSignupForm variant="inline" />
        </div>
      </Container>
    </section>
  )
}
