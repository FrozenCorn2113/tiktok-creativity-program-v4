// Version B — Dark variant navbar
// Sticky dark header, minimal, ink background, orange accent

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { navigation } from '@/lib/site'
import Container from '@/components/ui/Container'
import { X, Menu } from 'lucide-react'
import SearchBar from '@/components/SearchBar'

export default function NavbarDark() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0F172A] transition-shadow duration-200 ${
        isScrolled ? 'shadow-[0_1px_12px_rgba(0,0,0,0.4)]' : ''
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="shrink-0 cursor-pointer no-underline flex items-center gap-2.5">
            <Image
              src="/favicon.svg"
              alt="TikTok Creativity Program"
              width={36}
              height={36}
              className="rounded-lg"
              priority
            />
            <span
              className="hidden sm:inline text-[15px] font-[700] leading-none tracking-[-0.02em] text-white"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              TCP
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.main.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative inline-flex items-center px-3 py-2 text-[15px] font-[500] transition-colors duration-200 rounded-lg ${
                    isActive
                      ? 'text-[#F97316] bg-white/5'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-[#F97316] rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right side — Search + CTA + hamburger */}
          <div className="flex items-center gap-3">
            <SearchBar />
            <Link
              href="/start-here"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-[#F97316] text-[#0F172A] text-[14px] font-bold hover:bg-[#EA6A0A] transition-colors"
            >
              Get Started Free
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden cursor-pointer rounded-lg border border-white/15 p-2 text-gray-400 transition-colors hover:bg-white/8 hover:text-white"
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
      </Container>

      {/* Mobile menu */}
      {isMobileMenuOpen ? (
        <div className="lg:hidden border-t border-white/10 bg-[#0F172A]">
          <Container>
            <div className="flex flex-col py-4 gap-0">
              {navigation.main.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex min-h-[48px] items-center rounded-lg px-3 text-[15px] font-[500] transition-colors ${
                      isActive
                        ? 'bg-white/8 text-[#F97316]'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <div className="mt-4 pt-4 border-t border-white/10">
                <Link
                  href="/start-here"
                  className="flex items-center justify-center h-12 rounded-lg bg-[#F97316] text-[#0F172A] font-bold text-[15px] hover:bg-[#EA6A0A] transition-colors"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
