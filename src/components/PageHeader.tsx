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
    <header className={`not-prose space-y-5 ${className}`}>
      {/* Breadcrumbs — mono eyebrow */}
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-1">
                {i > 0 ? (
                  <ChevronRight className="h-3 w-3 flex-shrink-0 text-ink-soft/60" aria-hidden />
                ) : null}
                <Link href={crumb.href} className="transition-colors hover:text-ink">
                  {crumb.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      {/* Category pill — soft orange */}
      {category ? (
        <span className="inline-flex items-center rounded-full bg-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] font-medium text-[#C2622A]">
          {category}
        </span>
      ) : null}

      {/* H1 — Manrope semibold, tight tracking */}
      <h1 className="font-sans text-[40px] md:text-[56px] lg:text-[64px] leading-[1.05] tracking-[-0.04em] font-medium text-ink m-0 text-balance max-w-[1100px]">
        {title}
      </h1>

      {/* Description */}
      {description ? (
        <p className="max-w-[680px] text-[17px] md:text-[19px] leading-[1.55] text-ink-soft">
          {description}
        </p>
      ) : null}

      {/* Meta row */}
      {(byline || updatedAt || readTime) ? (
        <div className="flex flex-wrap items-center gap-3 text-[13px] text-ink-soft">
          {byline ? <span>{byline}</span> : null}
          {byline && updatedAt ? <span className="text-ink-soft/50" aria-hidden>·</span> : null}
          {updatedAt ? (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 flex-shrink-0" aria-hidden />
              Updated {updatedAt}
            </span>
          ) : null}
          {(byline || updatedAt) && readTime ? (
            <span className="text-ink-soft/50" aria-hidden>·</span>
          ) : null}
          {readTime ? (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 flex-shrink-0" aria-hidden />
              {readTime}
            </span>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
