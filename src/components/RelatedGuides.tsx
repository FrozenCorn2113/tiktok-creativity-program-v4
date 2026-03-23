import GuideCard from '@/components/GuideCard'

type RelatedGuide = {
  title: string
  description: string
  href: string
  category?: string
  readTime?: string
}

type RelatedGuidesProps = {
  guides: RelatedGuide[]
  heading?: string
  className?: string
}

export default function RelatedGuides({
  guides,
  heading = 'Related guides',
  className = '',
}: RelatedGuidesProps) {
  if (!guides.length) return null

  return (
    <section className={`space-y-4 ${className}`} aria-label={heading}>
      <h2 className="text-xl font-bold text-[var(--color-ink-strong)]">{heading}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.slice(0, 3).map((guide) => (
          <GuideCard
            key={guide.href}
            title={guide.title}
            description={guide.description}
            href={guide.href}
            category={guide.category}
            readTime={guide.readTime}
          />
        ))}
      </div>
    </section>
  )
}
