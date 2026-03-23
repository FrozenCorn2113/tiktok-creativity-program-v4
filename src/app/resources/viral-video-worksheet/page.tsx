import Container from '@/components/ui/Container'
import CalloutBox from '@/components/CalloutBox'
import EmailSignupForm from '@/components/EmailSignupForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Viral Video Worksheet',
  description: 'Plan high-performing TikTok videos with this hook, structure, and pacing worksheet.',
}

export default function ViralVideoWorksheetPage() {
  return (
    <section className="py-12">
      <Container size="narrow">
        <div className="space-y-6">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-subtle)]">
              Download
            </p>
            <h1 className="text-3xl font-semibold text-[var(--color-text)]">
              Viral Video Formula Worksheet
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Use this worksheet to plan hooks, pacing, and payoffs before you film.
            </p>
          </header>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 text-sm">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">Worksheet prompts</h2>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>Hook: What promise do you deliver in 2 seconds?</li>
              <li>Pacing: Where will you cut every 3–5 seconds?</li>
              <li>Payoff: What outcome makes viewers rewatch?</li>
              <li>CTA: What should viewers do next?</li>
            </ul>
            <CalloutBox type="info" className="mt-4">
              Save this worksheet and reuse it for every video in your series.
            </CalloutBox>
          </div>

          <EmailSignupForm variant="inline" />
        </div>
      </Container>
    </section>
  )
}
