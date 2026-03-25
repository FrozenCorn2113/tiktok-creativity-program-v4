// Version B — Dark editorial guide cards, horizontal layout (image left, text right)
// Magazine/Verge feel. Dark backgrounds, orange category labels.

"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import type { GuideCardData } from "@/components/sections/guide-cards";

interface DarkGuideCardsProps {
  guides: GuideCardData[];
  headline?: string;
  showViewAll?: boolean;
}

function DarkGuideCard({ guide, featured = false }: { guide: GuideCardData; featured?: boolean }) {
  if (featured) {
    // Featured card — larger, vertical
    return (
      <Link
        href={guide.href}
        className="group relative flex flex-col bg-[#1a2337] border border-white/10 rounded-xl overflow-hidden hover:border-[#F97316]/40 transition-all duration-200"
      >
        <div className="relative w-full h-52 bg-[#0F172A] overflow-hidden">
          <Image
            src={`/images/guides/hero-${guide.slug}.webp`}
            alt={`Thumbnail for ${guide.title}`}
            fill
            className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2337] via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#F97316] bg-[#0F172A]/80 px-2 py-1 rounded">
              {guide.category}
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-[18px] font-bold text-white leading-snug line-clamp-2 group-hover:text-[#F97316] transition-colors" style={{ fontWeight: 700 }}>
            {guide.title}
          </h3>
          <p className="mt-2 text-[14px] text-gray-400 leading-relaxed line-clamp-2 flex-1">
            {guide.excerpt}
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="flex items-center gap-1.5 text-[12px] text-gray-500">
              <Clock className="h-3 w-3" /> {guide.readTime}
            </span>
            <ArrowRight className="h-4 w-4 text-gray-600 group-hover:text-[#F97316] transition-colors" />
          </div>
        </div>
      </Link>
    );
  }

  // Standard horizontal card
  return (
    <Link
      href={guide.href}
      className="group flex items-start gap-4 py-4 border-b border-white/8 hover:bg-white/3 px-3 -mx-3 rounded-lg transition-colors"
    >
      {/* Small thumbnail */}
      <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-[#1a2337]">
        <Image
          src={`/images/guides/hero-${guide.slug}.webp`}
          alt=""
          fill
          className="object-cover opacity-60"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#F97316]">
          {guide.category}
        </span>
        <h3 className="mt-0.5 text-[15px] font-semibold text-gray-200 leading-snug line-clamp-2 group-hover:text-white transition-colors">
          {guide.title}
        </h3>
        <span className="flex items-center gap-1 mt-1 text-[11px] text-gray-600">
          <Clock className="h-2.5 w-2.5" /> {guide.readTime}
        </span>
      </div>
    </Link>
  );
}

export function DarkGuideCards({
  guides,
  headline = "Guides Worth Reading First",
  showViewAll = true,
}: DarkGuideCardsProps) {
  const featured = guides.slice(0, 2);
  const rest = guides.slice(2, 6);

  return (
    <section className="bg-[#0d1117] py-20">
      <div className="max-w-container mx-auto px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#F97316]">
              Featured Reading
            </span>
            <h2 className="mt-2 text-[2rem] font-bold text-white" style={{ fontWeight: 700 }}>
              {headline}
            </h2>
          </div>
          {showViewAll && (
            <Link
              href="/guides"
              className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-400 hover:text-[#F97316] transition-colors"
            >
              All 57 guides <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        {/* 2-column editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Left — featured vertical cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {featured.map((guide) => (
              <DarkGuideCard key={guide.slug} guide={guide} featured />
            ))}
          </div>

          {/* Right — horizontal list "Popular This Week" */}
          <div>
            <div className="mb-4 pb-3 border-b border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                Popular Reading
              </span>
            </div>
            <div className="space-y-0">
              {rest.map((guide) => (
                <DarkGuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DarkGuideCards;
