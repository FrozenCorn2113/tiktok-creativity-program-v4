'use client'

import { useState } from 'react'

type FilterTab = {
  label: string
  value: string
}

type CategoryFilterTabsProps = {
  tabs: FilterTab[]
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

export default function CategoryFilterTabs({
  tabs,
  defaultValue = 'all',
  onChange,
  className = '',
}: CategoryFilterTabsProps) {
  const [active, setActive] = useState(defaultValue)

  const handleClick = (value: string) => {
    setActive(value)
    onChange?.(value)
  }

  const allTabs = [{ label: 'All', value: 'all' }, ...tabs]

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className}`}
      role="tablist"
      aria-label="Filter by category"
    >
      {allTabs.map((tab) => {
        const isActive = active === tab.value
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleClick(tab.value)}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] ${
              isActive
                ? 'bg-[var(--color-primary)] text-[var(--color-ink-strong)] shadow-[var(--shadow-sm)]'
                : 'border border-[var(--color-border)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-ink)]'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
