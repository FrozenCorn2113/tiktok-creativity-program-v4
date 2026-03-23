import Container from '@/components/ui/Container'
import CalloutBox from '@/components/CalloutBox'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sponsor This Site',
  description: 'Partner with TikTok Creativity Program to reach creators through guide placements, calculator visibility, and newsletter features.',
}

export default function SponsorPage() {
  return (
    <section className="py-12">
      <Container size="narrow">
        <div className="space-y-6">
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold text-[var(--color-text)]">
              Sponsor TikTok Creativity Program
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              We partner with creator-first tools and platforms. Sponsorships include guide
              placements, calculator visibility, and newsletter features.
            </p>
          </header>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 text-sm">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">Sponsorship options</h2>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>Sponsored guide placements</li>
              <li>Newsletter features</li>
              <li>Calculator sponsorships</li>
            </ul>
          </div>

          <CalloutBox type="info">
            Email us at hello@tiktokcreativityprogram.com to request the sponsorship kit.
          </CalloutBox>
        </div>
      </Container>
    </section>
  )
}
