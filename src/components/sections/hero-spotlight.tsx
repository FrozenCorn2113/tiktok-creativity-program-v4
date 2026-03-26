// Source: https://ui.aceternity.com/components/spotlight
// Homepage hero — Spotlight background effect, staggered word reveal, 2-column grid
// All copy from CONTENT.md. Brand tokens throughout.
// SSR-safe: content is always visible; animations enhance on client.

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, Calculator, ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { wordRevealContainer, wordRevealItem } from "@/lib/motion";
import { SpotlightContainer } from "@/components/aceternity/spotlight";

const headline = "The Real Guide to Getting Paid by TikTok";
const words = headline.split(" ");

export function HeroSpotlight() {
  const shouldReduceMotion = useReducedMotion();
  // Only run animations after hydration — prevents SSR flash
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <SpotlightContainer className="min-h-[85vh] flex flex-col">
      {/* Top padding for floating nav */}
      <div className="pt-28 pb-16 flex-1 flex items-center">
        <div className="max-w-container mx-auto px-6 w-full">
          {/* 2-column grid: text left (3fr), image right (2fr) */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 items-center">

            {/* Left — text column */}
            <div className="flex flex-col">
              {/* Badge */}
              {/* H1 — staggered word reveal (client-only, SSR shows full text) */}
              {mounted && !shouldReduceMotion ? (
                <motion.h1
                  className="text-[2.25rem] md:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-brand-ink max-w-[560px]"
                  style={{ fontWeight: 800 }}
                  aria-label={headline}
                  initial="hidden"
                  animate="show"
                  variants={wordRevealContainer}
                >
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.25em]"
                      variants={wordRevealItem}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
              ) : (
                <h1
                  className="text-[2.25rem] md:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-brand-ink max-w-[560px]"
                  style={{ fontWeight: 800 }}
                >
                  {headline}
                </h1>
              )}

              {/* Subheadline */}
              <p className="mt-6 text-[1.125rem] leading-[1.7] text-text-secondary max-w-lg">
                Free calculators, 57 guides, and honest answers to the questions TikTok&apos;s help center won&apos;t touch. Qualified views, RPM, eligibility, what breaks, and how to fix it — all free.
              </p>

              {/* CTA row — v4: calculator primary, start-here secondary */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/calculators/earnings-calculator"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-brand-ink hover:bg-brand-primaryHover font-bold shadow-orange hover:shadow-lg transition-all hover:scale-[1.02] min-h-[48px] text-base"
                >
                  <Calculator className="h-4 w-4" aria-hidden />
                  Try the Calculator Free
                </Link>
                <Link
                  href="/start-here"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-brand-ink hover:bg-brand-primarySoft font-semibold min-h-[48px] text-base transition-colors"
                >
                  Start the Learning Path
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>

            {/* Right — brand image */}
            <div className="hidden md:flex items-center justify-center">
              <Image
                src="/images/brand/landpress-marketing-hero.png"
                alt="TikTok creator reviewing earnings dashboard on phone"
                width={480}
                height={440}
                className="rounded-2xl object-contain max-h-[440px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center pb-8">
        <motion.button
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" })}
          className="text-text-muted hover:text-text-secondary transition-colors p-2 cursor-pointer bg-transparent border-0"
          aria-label="Scroll to next section"
          animate={mounted && !shouldReduceMotion ? { y: [0, 6, 0] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6" aria-hidden />
        </motion.button>
      </div>
    </SpotlightContainer>
  );
}

export default HeroSpotlight;
