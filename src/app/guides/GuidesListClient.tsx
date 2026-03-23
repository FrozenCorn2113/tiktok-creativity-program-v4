'use client'

import { useState } from 'react'
import GuideCard from '@/components/GuideCard'
import CategoryFilterTabs from '@/components/CategoryFilterTabs'

type Guide = {
  slug: string
  title: string
  description: string
  category: string
  readTime: string
}

const filterTabs = [
  { label: 'Eligibility', value: 'Eligibility' },
  { label: 'Application', value: 'Application' },
  { label: 'Earnings', value: 'Earnings' },
  { label: 'Tools', value: 'Tools' },
]

export default function GuidesListClient({ guides }: { guides: Guide[] }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered =
    activeFilter === 'all'
      ? guides
      : guides.filter((g) => g.category === activeFilter)

  return (
    <>
      {/* Filter tabs */}
      <div className="reveal" data-reveal>
        <CategoryFilterTabs tabs={filterTabs} onChange={setActiveFilter} />
      </div>

      {/* Guide grid — is-visible applied directly so cards render without IntersectionObserver timing dependency */}
      {filtered.length > 0 ? (
        <div
          className="reveal-stagger is-visible mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((guide) => (
            <GuideCard
              key={guide.slug}
              title={guide.title}
              description={guide.description}
              href={`/guides/${guide.slug}`}
              category={guide.category}
              readTime={guide.readTime}
            />
          ))}
        </div>
      ) : (
        <div
          className="reveal mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-warm)] p-10 text-center"
          data-reveal
        >
          <p className="text-[var(--color-text-muted)]">No guides found for this category.</p>
        </div>
      )}
    </>
  )
}
