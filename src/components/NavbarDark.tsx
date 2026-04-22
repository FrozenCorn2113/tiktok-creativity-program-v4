// TCP warm-editorial navbar — matches TCPHeader in tcp-chrome.jsx
// Sticky, paper bg with blur, orange "t" square wordmark, ink/paper pill CTA.

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { navigation } from '@/lib/site'
import { X, Menu } from 'lucide-react'

const WORDMARK = 'Creator Rewards Handbook'
const JOIN_COUNT = '12.4K'

export default function NavbarDark() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className="sticky top-0 z-50 border-b border-line backdrop-blur-[8px]"
      style={{ background: '#FBF6ECee' }}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-[52px] md:py-[18px]">
        {/* Brand lockup */}
        <Link
          href="/"
          className="flex items-center gap-3 text-ink no-underline shrink-0"
        >
          <Image
            src="/favicon.svg"
            alt="TikTok Creativity Program"
            width={36}
            height={36}
            priority
          />
          <span
            className="hidden sm:inline text-[16px] font-semibold"
            style={{ letterSpacing: '-0.01em' }}
          >
            {WORDMARK}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px]">
          {navigation.main.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-colors ${
                  isActive
                    ? 'text-ink font-semibold'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right — CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/newsletter"
            className="hidden sm:inline-flex items-center rounded-full bg-ink text-paper px-[18px] py-[10px] text-[13px] font-semibold transition-opacity hover:opacity-90"
          >
            Join {JOIN_COUNT} →
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden cursor-pointer rounded-lg border border-line p-2 text-ink-soft transition-colors hover:bg-soft hover:text-ink"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden />
            ) : (
              <Menu className="h-6 w-6" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen ? (
        <div className="lg:hidden border-t border-line bg-paper">
          <div className="flex flex-col px-4 py-4 gap-0">
            {navigation.main.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex min-h-[48px] items-center rounded-lg px-3 text-[15px] transition-colors ${
                    isActive
                      ? 'text-ink font-semibold bg-soft'
                      : 'text-ink-soft hover:bg-soft hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="mt-4 pt-4 border-t border-line">
              <Link
                href="/newsletter"
                className="flex items-center justify-center h-12 rounded-full bg-ink text-paper font-semibold text-[14px] hover:opacity-90 transition-opacity"
              >
                Join {JOIN_COUNT} →
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
