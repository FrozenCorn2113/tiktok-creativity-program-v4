import Link from 'next/link'

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
    <section className={`not-prose my-12 ${className}`} aria-label={heading}>
      {/* Eyebrow + heading, matches guide-article chrome */}
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] font-medium text-[#C2622A]">
        {heading}
      </span>
      <h2 className="mt-3 mb-6 font-sans text-[28px] md:text-[32px] leading-[1.1] tracking-[-0.02em] font-medium text-ink m-0">
        More guides you might need.
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {guides.slice(0, 3).map((guide) => {
          // Derive slug from href (for /guides/{slug}) for thumbnail lookup
          const slug = guide.href.split('/').filter(Boolean).pop() ?? ''
          return (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex flex-col bg-white rounded-[16px] border border-line overflow-hidden transition-all duration-200 hover:-translate-y-[2px] hover:border-brand-primaryDeep hover:shadow-[0_10px_28px_-18px_rgba(194,98,42,0.3)]"
            >
              <div className="relative w-full h-36 bg-soft overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/guides/hero-${slug}.webp`}
                  alt={`Thumbnail for ${guide.title}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#C2622A] mb-2">
                  {guide.category ?? 'Guide'}
                  {guide.readTime ? ` · ${guide.readTime}` : ''}
                </div>
                <p className="font-sans text-[15px] font-semibold text-ink line-clamp-2 leading-[1.35] m-0">
                  {guide.title}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
