import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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
      className={`not-prose group flex h-full flex-col rounded-[16px] border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-[2px] hover:border-brand-primaryDeep hover:shadow-[0_10px_28px_-18px_rgba(194,98,42,0.3)] ${className}`}
    >
      {/* Eyebrow row — mono 11px uppercase */}
      {(category || isNew || readTime) ? (
        <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] font-medium">
          {category ? <span className="text-[#C2622A]">{category}</span> : null}
          {category && readTime ? <span className="text-ink-soft/50" aria-hidden>·</span> : null}
          {readTime ? <span className="text-ink-soft">{readTime}</span> : null}
          {isNew ? (
            <span className="inline-flex items-center rounded-full bg-ink text-paper px-2 py-0.5 text-[10px] font-medium">
              New
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Title */}
      <h3 className="line-clamp-2 font-sans text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink m-0">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 line-clamp-3 flex-1 text-[14px] leading-[1.6] text-ink-soft m-0">
        {description}
      </p>

      {/* Footer — "Read guide" arrow */}
      <div className="mt-5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] font-medium text-ink group-hover:text-[#C2622A] transition-colors">
        Read guide
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
      </div>
    </Link>
  )
}
