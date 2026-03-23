import Container from '@/components/ui/Container'
import PageHeader from '@/components/PageHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'An independent resource helping TikTok creators understand eligibility, earnings, and monetization strategies for the Creator Rewards Program.',
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-[var(--color-surface-warm)] py-14">
        <Container>
          <PageHeader
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }]}
            title="About this site"
            description="An independent resource helping TikTok creators understand eligibility, earnings, and monetization strategies for the Creator Rewards Program."
          />
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container>
          <div className="prose prose-slate mx-auto max-w-prose">
            <p>
              TikTok Creator Rewards can feel like a moving target. We built this site to make it
              easier to understand what counts, what pays, and how to grow consistently.
            </p>
            <p>
              We focus on practical guidance, clear calculators, and honest updates when TikTok
              changes the rules. You&apos;ll find the upside and the downsides in every guide — plus
              data-informed recommendations so you can choose the right path for your account.
            </p>
            <p>
              If you have feedback or want a topic covered, reach out any time. We publish weekly
              updates and prioritize topics that creators ask for most.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
