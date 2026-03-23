// Based on 21st.dev efferd/header-1 - customized per BRAND.md v2.0
// Source: https://21st.dev/components/efferd/header-1
// N1-N10 per Mandatory Implementation Checklist

'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { navigation } from '@/lib/site'
import Button from '@/components/ui/button'
import Container from '@/components/ui/Container'
import { X, Menu } from 'lucide-react'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // N3: scroll shadow at >10px
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    // N2: white bg, border-b #E8D5C4
    // N3: shadow-sm on scroll (no blur, no gradient)
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-[#E8D5C4] bg-white transition-shadow duration-200 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">

          {/* N4: Logo — 18px, font-700, tracking-tight, ink-strong */}
          <Link href="/" className="shrink-0 cursor-pointer no-underline">
            <span
              className="text-[18px] font-[700] leading-none tracking-[-0.02em] text-[#0F172A]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              TikTok Creativity Program
            </span>
          </Link>

          {/* Desktop nav — centered links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.main.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <div key={item.label} className="group relative">
                  {/* N5: Manrope 500, 15px, text-muted. Hover: text-ink */}
                  {/* N6: Active: orange underline via nav-underline class + active */}
                  <Link
                    href={item.href}
                    className={`nav-underline relative inline-flex items-center gap-1 px-3 py-2 text-[15px] font-[500] transition-colors duration-200 ${
                      isActive
                        ? 'active text-[#0F172A]'
                        : 'text-[#475467] hover:text-[#0F172A]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* Right side — CTA + hamburger */}
          <div className="flex items-center gap-3">
            {/* N7: "Start Here" primary button — right side, desktop */}
            <Link href="/start-here" className="hidden sm:inline-flex">
              <Button size="sm">Start Here</Button>
            </Link>

            {/* N8: hamburger — Lucide Menu size 24 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden cursor-pointer rounded-xl border border-[#E8D5C4] p-2 text-[#475467] transition-colors hover:bg-[#FFF8F2]"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {/* N8: static X icon (Lucide X size 24) when open — no animated X */}
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden />
              ) : (
                <Menu className="h-6 w-6" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* N9: Mobile nav panel — slides in from right, white bg */}
      {isMobileMenuOpen ? (
        <div className="lg:hidden border-t border-[#E8D5C4] bg-white">
          <Container>
            {/* N9: Flex col, gap-0, full height with CTA pinned at bottom */}
            <div className="flex flex-col py-4 gap-0">
              {/* N10: Group label above each group */}
              {navigation.main.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      // N9: 48px minimum tap height
                      className={`flex min-h-[48px] items-center rounded-xl px-3 text-[15px] font-[500] transition-colors ${
                        isActive
                          ? 'bg-[#FFF8F2] text-[#0F172A]'
                          : 'text-[#475467] hover:bg-[#FFF8F2] hover:text-[#0F172A]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </div>
                )
              })}

              {/* N9: CTA pinned at bottom of panel */}
              <div className="mt-4 pt-4 border-t border-[#E8D5C4]">
                {/* N10: small gray label above group */}
                <p className="mb-2 px-3 text-[12px] font-[500] text-[#667085]">Get started</p>
                <Link href="/start-here" className="block">
                  <Button className="w-full">Start Here</Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
