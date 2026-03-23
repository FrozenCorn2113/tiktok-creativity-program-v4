// Three-Path Entry section — Magic UI BentoGrid, 3 equal cards
// Routes visitors by intent: eligibility / earnings / troubleshooting
// Framer Motion stagger on scroll. SSR-safe: content visible without JS.

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle, TrendingUp, AlertTriangle, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";

const paths = [
  {
    Icon: CheckCircle,
    title: "Am I even eligible?",
    body: "You've heard about the program but you're not sure your account qualifies. The requirements are specific — follower count, view thresholds, account age, content type, and country all factor in. Start here before you apply.",
    cta: "Check eligibility requirements",
    href: "/guides/eligibility-requirements",
  },
  {
    Icon: TrendingUp,
    title: "I'm in. How do I earn more?",
    body: "You're approved and getting payouts, but the RPM feels low or inconsistent. There are real levers you can pull — content length, niche, posting schedule, view completion rate. Here's what actually moves the number.",
    cta: "Optimize your RPM",
    href: "/guides/optimize-rpm",
  },
  {
    Icon: AlertTriangle,
    title: "Something's wrong with my account",
    body: "Views aren't counting as qualified. Payouts stopped. Your application got rejected and TikTok didn't say why. These are the most common issues, and almost all of them have a fix.",
    cta: "Troubleshoot your account",
    href: "/guides/qualified-views-not-counting",
  },
];

export function ThreePath() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const containerMotion = mounted && !shouldReduceMotion
    ? { initial: "hidden", whileInView: "show", viewport: viewportOnce, variants: staggerContainer }
    : {};

  return (
    <section className="bg-background-warm py-24">
      <div className="max-w-container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-[2.25rem] font-bold text-brand-ink" style={{ fontWeight: 700 }}>
            Where do you want to start?
          </h2>
          <p className="mt-4 text-[1.125rem] text-text-secondary max-w-2xl mx-auto">
            Most creators land here in one of three situations. Pick the one that fits.
          </p>
        </div>

        {/* Bento Grid — 3 cards */}
        <motion.div {...containerMotion}>
          <BentoGrid>
            {paths.map(({ Icon, title, body, cta, href }) => (
              <motion.div
                key={title}
                variants={mounted && !shouldReduceMotion ? staggerItem : {}}
              >
                <BentoCard
                  Icon={Icon}
                  name={title}
                  description={body}
                >
                  <Link
                    href={href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primaryDeep hover:underline"
                  >
                    {cta}
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </BentoCard>
              </motion.div>
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
}

export default ThreePath;
