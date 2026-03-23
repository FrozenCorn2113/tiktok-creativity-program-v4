import Container from '@/components/ui/Container'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Creator Resources',
  description: 'Browse every free template and tool for TikTok creators — earnings trackers, checklists, and viral content worksheets.',
}

const resources = [
  {
    title: 'TikTok Earnings Tracker',
    excerpt: 'Track views, RPM, qualified views, and payouts in a single sheet.',
    href: '/resources/earnings-tracker',
  },
  {
    title: 'Creator Rewards Application Checklist',
    excerpt: 'A pre-application checklist to avoid common rejection reasons.',
    href: '/resources/creator-rewards-checklist',
  },
  {
    title: 'Viral Video Formula Worksheet',
    excerpt: 'A fillable worksheet to plan hooks, pacing, and outcomes.',
    href: '/resources/viral-video-worksheet',
  },
  {
    title: 'Content Planning Template',
    excerpt: 'Plan 30 days of TikTok content with performance tracking.',
    href: '/resources/content-planning-template',
  },
]

export default function ResourcesIndexPage() {
  return (
    <section className="py-12">
      <Container>
        <div className="space-y-6">
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold text-[var(--color-text)]">Downloadable resources</h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Templates and worksheets to help you grow and monetize faster.
            </p>
          </header>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <ArticleCard
                key={resource.href}
                title={resource.title}
                excerpt={resource.excerpt}
                href={resource.href}
                tag="Resource"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
