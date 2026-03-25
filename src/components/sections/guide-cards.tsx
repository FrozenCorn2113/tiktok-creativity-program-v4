// Source: https://21st.dev/r/sumonadotwork/blog-cards
// Featured Guides section — 3-column card grid with category filter tabs
// Brand tokens applied throughout. SSR-safe: content visible without JS.

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface GuideCardData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  href: string;
}

interface GuideCardsProps {
  guides: GuideCardData[];
  showTabs?: boolean;
  showViewAll?: boolean;
  headline?: string;
}

const tabs = [
  { label: "All", value: "all" },
  { label: "Getting Started", value: "getting-started" },
  { label: "Maximize Earnings", value: "maximize-earnings" },
  { label: "Troubleshooting", value: "troubleshooting" },
];

function GuideCard({ guide }: { guide: GuideCardData }) {
  return (
    <Link
      href={guide.href}
      className="group flex flex-col border border-border-default rounded-xl overflow-hidden bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-36 bg-brand-primarySoft overflow-hidden">
        <Image
          src={`/images/guides/hero-${guide.slug}.webp`}
          alt={`Thumbnail for ${guide.title}`}
          fill
          className="object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        {/* Placeholder visible behind image */}
        <div className="absolute inset-0 bg-brand-primarySoft flex items-center justify-center -z-10">
          <Clock className="h-8 w-8 text-brand-primary/30" aria-hidden />
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-5">
        <Badge className="w-fit mb-3 bg-brand-primarySoft text-brand-primaryDeep border-brand-primary/30 text-xs font-semibold">
          {guide.category}
        </Badge>
        <h3 className="text-[18px] font-bold text-brand-ink leading-snug line-clamp-2 mb-2" style={{ fontWeight: 700 }}>
          {guide.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 flex-1">
          {guide.excerpt}
        </p>
        <div className="flex items-center gap-1.5 mt-4 text-xs font-medium text-text-muted">
          <Clock className="h-3 w-3" aria-hidden />
          <span>{guide.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

export function GuideCards({
  guides,
  showTabs = false,
  showViewAll = true,
  headline = "Guides Worth Reading First",
}: GuideCardsProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  useEffect(() => { setMounted(true); }, []);

  const filtered =
    activeTab === "all"
      ? guides
      : guides.filter((g) =>
          g.category.toLowerCase().replace(/\s+/g, "-") === activeTab
        );

  const displayed = filtered.slice(0, 6);

  const containerMotion = mounted && !shouldReduceMotion
    ? { initial: "hidden", whileInView: "show", viewport: viewportOnce, variants: staggerContainer }
    : {};

  return (
    <section className="bg-white py-24">
      <div className="max-w-container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-8">
          <h2 className="text-[2.25rem] font-bold text-brand-ink" style={{ fontWeight: 700 }}>
            {headline}
          </h2>
        </div>

        {/* Category tabs */}
        {showTabs && (
          <div className="flex justify-center mb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex gap-1 bg-background-surface rounded-full p-1">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-full text-sm data-[state=active]:bg-brand-primary data-[state=active]:text-brand-ink data-[state=inactive]:text-text-secondary"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            {...containerMotion}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {displayed.map((guide) => (
              <motion.div
                key={guide.slug}
                variants={mounted && !shouldReduceMotion ? staggerItem : {}}
              >
                <GuideCard guide={guide} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all */}
        {showViewAll && (
          <div className="flex justify-center mt-10">
            <Link
              href="/guides"
              className="inline-flex items-center px-6 py-2.5 rounded-xl border border-border-default text-brand-ink hover:bg-background-surface font-semibold text-sm transition-colors"
            >
              View all guides
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default GuideCards;
