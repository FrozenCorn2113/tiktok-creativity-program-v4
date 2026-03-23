import Container from '@/components/ui/Container'
import CalloutBox from '@/components/CalloutBox'
import EmailSignupForm from '@/components/EmailSignupForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TikTok Earnings Tracker',
  description: 'Free spreadsheet to track your TikTok qualified views, RPM, and Creator Rewards payouts week by week.',
}

export default function EarningsTrackerPage() {
  const trackerUrl = process.env.NEXT_PUBLIC_EARNINGS_TRACKER_URL

  return (
    <section className="py-12">
      <Container size="narrow">
        <div className="space-y-6">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-subtle)]">
              Lead magnet
            </p>
            <h1 className="text-3xl font-semibold text-[var(--color-text)]">
              TikTok Earnings Tracker (Google Sheet)
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Track views, qualified views, RPM, and payouts in one simple spreadsheet built for
              Creator Rewards.
            </p>
          </header>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 text-sm text-[var(--color-text)]">
            <h2 className="text-xl font-semibold">How it works</h2>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>• Log each video’s views, qualified views, and RPM.</li>
              <li>• See weekly and monthly earnings totals.</li>
              <li>• Compare performance by content format.</li>
            </ul>
            <div className="mt-4 rounded-[var(--radius-md)] bg-[var(--color-surface-muted)] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-subtle)]">
                Deliverables
              </p>
              <div className="mt-2 space-y-1 text-xs text-[var(--color-text-subtle)]">
                <p>
                  <strong>Purpose:</strong> Help creators track earnings consistently.
                </p>
                <p>
                  <strong>Target Keywords:</strong> TikTok earnings tracker, Creator Rewards tracker.
                </p>
                <p>
                  <strong>User Intent:</strong> Get a simple tool to track payouts.
                </p>
                <p>
                  <strong>Success Metrics:</strong> Download rate, email signups, weekly retention.
                </p>
                <p>
                  <strong>Next Steps:</strong> Use the earnings calculator and set a weekly review.
                </p>
              </div>
            </div>
          </div>

          {trackerUrl ? (
            <a
              href={trackerUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[#0F172A] transition hover:bg-[var(--color-primary-hover)] cursor-pointer"
            >
              Open the tracker
            </a>
          ) : (
            <CalloutBox type="warning">
              Tracker link not configured yet. Add `NEXT_PUBLIC_EARNINGS_TRACKER_URL` in `.env.local`.
            </CalloutBox>
          )}

          <EmailSignupForm variant="inline" />
        </div>
      </Container>
    </section>
  )
}
