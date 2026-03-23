import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type JourneyCardProps = {
  title: string
  description: string
  linkText: string
  linkHref: string
}

export default function JourneyCard({ title, description, linkText, linkHref }: JourneyCardProps) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-sm)]">
      <h3 className="text-base font-semibold text-[var(--color-ink-strong)]">{title}</h3>
      <p className="mt-2 text-sm leading-[1.7] text-[var(--color-text-muted)]">{description}</p>
      <Link
        href={linkHref}
        className="mt-3 inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-[var(--color-primary)] transition-transform duration-200 hover:gap-2"
      >
        {linkText}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  )
}
