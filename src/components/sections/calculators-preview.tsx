// Calculators Preview section — dark bg-brand-ink, image right (v4: Free badges added)
// No external library — custom 2-column split per PAGE_SPECS.md
// SSR-safe: content visible without JS.

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Calculator, BarChart2, Users, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

const calculators = [
  {
    Icon: Calculator,
    title: "Earnings Calculator",
    href: "/calculators/earnings-calculator",
  },
  {
    Icon: BarChart2,
    title: "RPM Calculator",
    href: "/calculators/rpm-by-country",
  },
  {
    Icon: Users,
    title: "Follower Income Calculator",
    href: "/calculators/follower-income-estimator",
  },
];

export function CalculatorsPreview() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const motionProps = mounted && !shouldReduceMotion
    ? { initial: "hidden", whileInView: "show", viewport: viewportOnce, variants: fadeUp }
    : {};

  return (
    <section className="bg-brand-ink py-24">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left — text on dark bg */}
          <motion.div {...motionProps}>
            <span className="text-[12px] font-semibold uppercase tracking-widest text-brand-primary">
              Free Calculators
            </span>
            <h2 className="mt-3 text-[2.25rem] font-bold text-white leading-tight" style={{ fontWeight: 700 }}>
              Find Out What Your Views Are Worth
            </h2>
            <p className="mt-4 text-[1rem] leading-[1.75] text-gray-300 max-w-md">
              Most TikTok earnings calculators use follower count. The Creator Rewards Program doesn&apos;t pay based on followers — it pays based on qualified views and your RPM. These calculators use the actual model.
            </p>

            {/* Calculator links */}
            <div className="mt-8 flex flex-col gap-3">
              {calculators.map(({ Icon, title, href }) => (
                <Link
                  key={title}
                  href={href}
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 transition-colors cursor-pointer group"
                >
                  <Icon className="h-6 w-6 text-brand-primary shrink-0" aria-hidden />
                  <span className="flex-1 text-[15px] font-semibold text-white">
                    {title}
                  </span>
                  <Badge className="bg-brand-primarySoft text-brand-primaryDeep text-xs font-manrope border-0 mr-1">
                    Free
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-gray-300 transition-colors" aria-hidden />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Right — brand image */}
          <motion.div
            className="flex justify-center md:justify-end"
            {...(mounted && !shouldReduceMotion
              ? { initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 }, viewport: viewportOnce, transition: { duration: 0.5, delay: 0.15 } }
              : {})}
          >
            <Image
              src="/images/brand/landpress-marketing-2.png"
              alt="TikTok earnings calculator on phone"
              width={400}
              height={440}
              className="rounded-2xl object-contain"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CalculatorsPreview;
