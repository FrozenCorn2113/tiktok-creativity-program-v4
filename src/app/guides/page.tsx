// Guides listing — Phase 3 v3 rebuild
// PAGE_SPECS.md: warm header, shadcn Tabs filter, 3-col card grid, Framer Motion AnimatePresence
// checklist items via guides listing section

import { getAllGuides } from '@/lib/mdx'
import { buildMetadata } from '@/lib/seo'
import GuidesListingClient from './GuidesListingClient'

export const metadata = buildMetadata({
  title: 'TikTok Creator Rewards Guides',
  description:
    'Everything TikTok creators need to know about eligibility, qualifying, and earning from the Creator Rewards Program. 107 guides updated for 2026.',
  path: '/guides',
})

export default function GuidesPage() {
  const allGuides = getAllGuides()

  const guides = allGuides.map((g) => ({
    slug: g.slug,
    title: g.title,
    excerpt: g.description ?? '',
    category: g.category ?? '',
    readTime: g.readingTime ?? '8 min',
    href: `/guides/${g.slug}`,
  }))

  return <GuidesListingClient guides={guides} />
}
