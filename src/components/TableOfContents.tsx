'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type TocItem = {
  id: string
  title: string
  level: number
}

type TableOfContentsProps = {
  items?: TocItem[]
  /** If true, renders as a sticky desktop sidebar (w-64). Default: false (inline). */
  sidebar?: boolean
}

export default function TableOfContents({ items, sidebar = false }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!items || !items.length) return

    const headingIds = items.map((item) => item.id)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      },
    )

    headingIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [items])

  // When rendered from MDX content without items prop, render nothing
  if (!items || !items.length) return null

  const linkList = (
    <ul className="space-y-0.5">
      {items.map((item) => {
        const isActive = activeId === item.id
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`flex items-center gap-2 rounded-[var(--radius-sm)] py-1.5 pr-2 text-sm transition-colors duration-150 ${
                item.level === 3 ? 'pl-6' : 'pl-3'
              } ${
                isActive
                  ? 'font-semibold text-[var(--color-ink)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-ink)]'
              }`}
            >
              {/* Orange dot indicator for active item */}
              <span
                className={`h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all duration-200 ${
                  isActive ? 'bg-[var(--color-primary)] opacity-100' : 'opacity-0'
                }`}
                aria-hidden
              />
              {item.title}
            </a>
          </li>
        )
      })}
    </ul>
  )

  if (sidebar) {
    return (
      <nav
        className="sticky top-24 hidden w-64 flex-shrink-0 lg:block"
        aria-label="Table of contents"
      >
        <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-wide text-[var(--color-text-subtle)]">
          On this page
        </p>
        {linkList}
      </nav>
    )
  }

  // Mobile/inline: collapsible accordion
  return (
    <nav
      className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white"
      aria-label="Table of contents"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-sm font-semibold text-[var(--color-ink)]"
        aria-expanded={isOpen}
      >
        <span>On this page</span>
        <ChevronDown
          className={`h-4 w-4 text-[var(--color-text-muted)] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>
      {isOpen ? (
        <div className="border-t border-[var(--color-border)] px-2 pb-3 pt-2">
          {linkList}
        </div>
      ) : null}
    </nav>
  )
}
