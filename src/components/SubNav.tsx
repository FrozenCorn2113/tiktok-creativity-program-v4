'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type SubNavItem = {
  label: string
  href: string
}

type SubNavProps = {
  items: SubNavItem[]
  className?: string
}

export default function SubNav({ items, className = '' }: SubNavProps) {
  const pathname = usePathname()

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className}`}
      role="navigation"
      aria-label="Sub navigation"
    >
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] ${
              isActive
                ? 'bg-[var(--color-primary)] text-[var(--color-ink-strong)] shadow-[var(--shadow-sm)]'
                : 'border border-[var(--color-border)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-ink)]'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}
