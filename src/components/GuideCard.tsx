import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type GuideCardProps = {
  title: string
  description: string
  href: string
  category?: string
  readTime?: string
  isNew?: boolean
  className?: string
}

export default function GuideCard({
  title,
  description,
  href,
  category,
  readTime,
  isNew = false,
  className = '',
}: GuideCardProps) {
  return (
    <Link
      href={href}
      className={`group flex h-full cursor-pointer flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-sm)] ${className}`}
    >
      {/* Badges row */}
      {(category || isNew) ? (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {category ? (
            <span className="inline-flex items-center rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-[0.75rem] font-semibold text-[var(--color-primary-hover)]">
              {category}
            </span>
          ) : null}
          {isNew ? (
            <span className="inline-flex items-center rounded-full bg-[#EFF8FF] px-2 py-1 text-[0.75rem] font-bold text-[var(--color-info)]">
              New
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Title — 2-line clamp */}
      <h3 className="line-clamp-2 text-[1.125rem] font-semibold leading-[1.3] text-[var(--color-ink-strong)]">
        {title}
      </h3>

      {/* Description — 3-line clamp */}
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-[1.6] text-[var(--color-text-muted)]">
        {description}
      </p>

      {/* Footer row */}
      <div className="mt-4 flex items-center justify-between">
        {readTime ? (
          <span className="text-[0.75rem] text-[var(--color-text-subtle)]">{readTime}</span>
        ) : (
          <span />
        )}
        <span className="flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] transition-transform duration-200 group-hover:translate-x-0.5">
          Read guide
          <ChevronRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </Link>
  )
}
