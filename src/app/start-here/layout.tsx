// Start Here layout — logo only, no nav, no footer
// PAGE_SPECS.md: "Remove navigation. This is a conversion page."
// checklist item 79: no floating navbar
// checklist item 80: only wordmark appears, linking to homepage

import Link from 'next/link'
import { siteConfig } from '@/lib/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Start Here | ${siteConfig.name}`,
}

export default function StartHereLayout({ children }: { children: React.ReactNode }) {
  return (
    // Suppress global layout nav/footer by using a standalone layout
    <div className="flex min-h-screen flex-col">
      {/* Logo-only header — centered wordmark, no nav links */}
      <header className="py-6 border-b border-border-default bg-white">
        <div className="flex justify-center">
          <Link
            href="/"
            className="text-[1.375rem] font-extrabold tracking-tight text-brand-ink hover:text-brand-primary transition-colors"
            aria-label="TikTok Creativity Program — back to homepage"
          >
            {siteConfig.name}
          </Link>
        </div>
      </header>

      {/* Page content */}
      <main className="flex flex-1 flex-col">
        {children}
      </main>
    </div>
  )
}
