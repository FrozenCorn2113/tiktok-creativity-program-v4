import Link from 'next/link'
import Image from 'next/image'
import type React from 'react'

type ArticleCardProps = {
  title: string
  excerpt: string
  href: string
  image?: string
  tag?: string
  className?: string
} & React.ComponentPropsWithoutRef<'a'>

export default function ArticleCard({
  title,
  excerpt,
  href,
  image,
  tag,
  className = '',
  ...props
}: ArticleCardProps) {
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] ${className}`}
      {...props}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-surface-muted)]">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-wide text-[var(--color-text-subtle)]">
            Featured Guide
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {tag ? (
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-subtle)]">
            {tag}
          </span>
        ) : null}
        <h3 className="text-base font-semibold text-[var(--color-text)] line-clamp-2">{title}</h3>
        <p className="text-sm text-[var(--color-text-muted)] line-clamp-3">{excerpt}</p>
        <span className="mt-auto text-sm font-semibold text-[var(--color-primary)]">Read guide</span>
      </div>
    </Link>
  )
}
