import Container from '@/components/ui/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'Some links on this site are affiliate links. Here\'s how that works and what it means for our recommendations.',
}

export default function AffiliateDisclosurePage() {
  return (
    <section className="py-12">
      <Container size="narrow">
        <div className="space-y-6 text-sm text-[var(--color-text)]">
          <h1 className="text-3xl font-semibold">Affiliate disclosure</h1>
          <p>
            Some links on this site are affiliate links. If you click a link and make a purchase,
            we may earn a commission at no extra cost to you.
          </p>
          <p>
            We only recommend tools and products we believe are genuinely useful for creators. Our
            editorial content is independent and not influenced by affiliate partnerships.
          </p>
          <p>
            If you have questions about a specific link or recommendation, contact us at
            hello@tiktokcreativityprogram.com.
          </p>
        </div>
      </Container>
    </section>
  )
}
