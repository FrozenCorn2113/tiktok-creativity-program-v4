import Container from '@/components/ui/Container'
import CalloutBox from '@/components/CalloutBox'
import VideoEmbed from '@/components/VideoEmbed'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media Library',
  description: 'Video walkthroughs and visuals supporting TikTok creator education — earnings calculators, program guides, and more.',
}

export default function MediaPage() {
  return (
    <section className="py-12">
      <Container>
        <div className="space-y-6">
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold text-[var(--color-text)]">Media library</h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Video walkthroughs and visuals that support creator education.
            </p>
          </header>

          <VideoEmbed
            title="Earnings Calculator Walkthrough"
            embedUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
          />

          <CalloutBox type="info">
            Replace the embedded video with your first tutorial once it’s available.
          </CalloutBox>
        </div>
      </Container>
    </section>
  )
}
