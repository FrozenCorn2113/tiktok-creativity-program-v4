// Source: https://ui.aceternity.com/components/floating-navbar
// Customized for brand tokens: ink #0F172A, primary #F97316, warm #FFF8F2
// Uses shadcn Sheet for mobile drawer

"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Guides", href: "/guides" },
  { label: "Calculators", href: "/calculators" },
  { label: "Tools", href: "/tools" },
  { label: "Start Here", href: "/start-here" },
];

export function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Hide global nav on conversion pages (Start Here, 404)
  // PAGE_SPECS.md: Start Here has no navigation — conversion page
  if (pathname === '/start-here' || pathname.startsWith('/start-here/')) {
    return null;
  }

  const pillVariants = shouldReduceMotion
    ? {}
    : {
        initial: { y: -8, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
      };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <motion.nav
        {...(shouldReduceMotion ? {} : pillVariants)}
        initial="initial"
        animate="animate"
        className={cn(
          "flex items-center justify-between gap-6 rounded-full px-5 py-2.5 transition-all duration-300",
          // Floating pill behavior
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-md border border-border-default max-w-3xl w-full"
            : "bg-transparent max-w-container w-full"
        )}
      >
        {/* Logo wordmark */}
        <Link
          href="/"
          className="shrink-0 font-sans text-lg font-extrabold tracking-tight text-brand-ink no-underline"
          style={{ fontWeight: 800 }}
        >
          TikTok Creativity Program
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href + "/"));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {link.label}
                {/* Active indicator underline */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA + Mobile hamburger */}
        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <Link
            href="/start-here"
            className="hidden lg:inline-flex items-center px-4 py-1.5 rounded-full bg-brand-primary text-brand-ink hover:bg-brand-primaryHover font-semibold text-sm transition-colors min-h-[36px]"
          >
            Get Started Free
          </Link>

          {/* Mobile hamburger — shadcn Sheet */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="lg:hidden rounded-full p-2 text-brand-ink hover:bg-brand-primarySoft transition-colors" aria-label="Open navigation menu">
              <Menu className="h-5 w-5" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white p-0">
              <div className="flex flex-col h-full">
                {/* Sheet header */}
                <div className="px-6 py-5 border-b border-border-default">
                  <span className="font-extrabold text-base text-brand-ink" style={{ fontWeight: 800 }}>
                    TikTok Creativity Program
                  </span>
                </div>

                {/* Nav links stacked */}
                <nav className="flex flex-col px-3 py-4 flex-1">
                  {navLinks.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== "/" && pathname.startsWith(link.href + "/"));
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        className={cn(
                          "flex items-center justify-between min-h-[48px] px-3 py-2 rounded-xl text-[15px] font-medium transition-colors",
                          isActive
                            ? "bg-brand-primarySoft text-text-primary"
                            : "text-text-secondary hover:bg-brand-primarySoft hover:text-text-primary"
                        )}
                      >
                        {link.label}
                        <ChevronRight className="h-4 w-4 text-text-muted" aria-hidden />
                      </Link>
                    );
                  })}
                </nav>

                {/* CTA pinned at bottom */}
                <div className="px-6 py-6 border-t border-border-default">
                  <Link
                    href="/start-here"
                    className="flex items-center justify-center w-full bg-brand-primary text-brand-ink hover:bg-brand-primaryHover font-semibold rounded-xl min-h-[48px] text-[15px] transition-colors"
                  >
                    Get Started Free
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </header>
  );
}

export default FloatingNavbar;
