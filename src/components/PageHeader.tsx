import Link from 'next/link'
import { ChevronRight, Clock, Calendar } from 'lucide-react'

type Breadcrumb = {
  label: string
  href: string
}

type PageHeaderProps = {
  breadcrumbs?: Breadcrumb[]
  category?: string
  title: string
  description?: string
  byline?: string
  updatedAt?: string
  readTime?: string
  className?: string
}

export default function PageHeader({
  breadcrumbs,
  category,
  title,
  description,
  byline,
  updatedAt,
  readTime,
  className = '',
}: PageHeaderProps) {
  return (
    <header className={`space-y-4 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-[0.75rem] text-[var(--color-text-subtle)]">
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-1">
                {i > 0 ? <ChevronRight className="h-3 w-3 flex-shrink-0" aria-hidden /> : null}
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-[var(--color-ink)]"
                >
                  {crumb.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      {/* Category badge */}
      {category ? (
        <span className="inline-flex items-center rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-[0.75rem] font-semibold text-[var(--color-primary-hover)]">
          {category}
        </span>
      ) : null}

      {/* H1 */}
      <h1 className="text-[var(--text-h1)] font-bold leading-[var(--leading-h1)] tracking-tight text-[var(--color-ink-strong)] lg:text-[var(--text-h1)]">
        {title}
      </h1>

      {/* Description */}
      {description ? (
        <p className="max-w-prose text-[1.125rem] leading-[1.7] text-[var(--color-text-muted)]">
          {description}
        </p>
      ) : null}

      {/* Byline / meta row — A2: Clock + Calendar Lucide icons */}
      {(byline || updatedAt || readTime) ? (
        <div className="flex flex-wrap items-center gap-3 text-[0.75rem] text-[var(--color-text-subtle)]">
          {byline ? <span>{byline}</span> : null}
          {byline && updatedAt ? <span className="text-[var(--color-border-strong)]">·</span> : null}
          {updatedAt ? (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3 flex-shrink-0" aria-hidden />
              Updated {updatedAt}
            </span>
          ) : null}
          {(byline || updatedAt) && readTime ? (
            <span className="text-[var(--color-border-strong)]">·</span>
          ) : null}
          {readTime ? (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 flex-shrink-0" aria-hidden />
              {/* readTime may include "read" already (e.g. "12 min read") — output as-is */}
              {readTime}
            </span>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
