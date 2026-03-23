// Source: https://21st.dev/r/jatin-yadav05/feature-spotlight
// "What Is the Creator Rewards Program?" section — text left, image right
// Brand tokens applied throughout. SSR-safe: content visible without JS.

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

const features = [
  "Eligibility explained clearly — follower counts, view thresholds, account type, and regional requirements",
  "RPM data and earnings calculators that use the program's actual view-based model",
  "Troubleshooting guides for the issues TikTok's support team won't help you solve",
];

export function FeatureSpotlight() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const motionProps = mounted && !shouldReduceMotion
    ? { initial: "hidden", whileInView: "show", viewport: viewportOnce, variants: fadeUp }
    : {};

  return (
    <section className="bg-white py-24">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <motion.div {...motionProps}>
            <span className="text-[12px] font-semibold uppercase tracking-widest text-brand-primary">
              The Basics
            </span>
            <h2 className="mt-3 text-[2.25rem] font-bold leading-tight text-brand-ink">
              TikTok&apos;s Creator Rewards Program, Without the Jargon
            </h2>
            <div className="mt-4 space-y-4 text-[1rem] leading-[1.75] text-text-secondary max-w-lg">
              <p>
                TikTok pays eligible creators based on qualified views — not follower count, not likes, not how many people saved your video. The Creator Rewards Program (formerly the Creativity Program, formerly the Creator Fund) replaced the old fund in 2023 and pays significantly more per view. But the eligibility requirements are stricter, the qualified view threshold is specific, and the payout math is nothing like what most guides describe.
              </p>
              <p>
                This site exists because finding accurate, current information about the program is genuinely hard. TikTok&apos;s help pages are vague. Most creator blogs cite numbers from 2021. We verify against the actual program rules and update when things change.
              </p>
            </div>

            {/* Feature checklist */}
            <ul className="mt-6 space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle
                    className="h-4 w-4 mt-0.5 shrink-0 text-status-success"
                    aria-hidden
                  />
                  <span className="text-[15px] font-medium text-brand-ink">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/guides/creator-rewards-2026"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-brand-primary text-brand-ink hover:bg-brand-primarySoft font-semibold text-sm transition-colors"
              >
                Read the Full Guide
                <ExternalLink className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            {...(mounted && !shouldReduceMotion
              ? { initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 }, viewport: viewportOnce, transition: { duration: 0.5, delay: 0.1 } }
              : {})}
          >
            <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-lg bg-background-surface">
              <Image
                src="/images/brand/landpress-marketing-2.png"
                alt="Creator reviewing TikTok analytics and Creator Rewards earnings on their phone"
                fill
                className="object-contain object-center"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FeatureSpotlight;
