export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Container from '@/components/ui/Container'
import { compileGuide, getGuideBySlug } from '@/lib/mdx'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TikTok Monetization Resource Center',
  description: 'The complete hub for TikTok monetization: Creator Rewards guides, earnings calculators, and income strategies in one place.',
}

export default async function MonetizationResourceCenterPage() {
  const guide = getGuideBySlug('monetization-resource-center')
  if (!guide) notFound()
  const compiled = await compileGuide(guide.content)

  return (
    <section className="py-12">
      <Container>
        <div className="prose prose-slate max-w-none">{compiled.content}</div>
      </Container>
    </section>
  )
}
