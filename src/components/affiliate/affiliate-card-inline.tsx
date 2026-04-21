// Warm-editorial affiliate card, inline guide variant

"use client";

import { Info, ArrowUpRight } from "lucide-react";

interface AffiliateCardInlineProps {
  toolName: string;
  slug: string;
  review: string;
  bestFor: string;
  priceRange: string;
  ctaText: string;
  domain?: string;
}

export function AffiliateCardInline({
  toolName,
  slug,
  review,
  bestFor,
  priceRange,
  ctaText,
  domain,
}: AffiliateCardInlineProps) {
  // Google Favicon API — reliable, supports size param for good quality
  const logoDomain = domain ?? `${slug.replace(/-/g, "")}.com`;
  const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${logoDomain}&sz=128`;
  const letter = toolName.charAt(0).toUpperCase();
  const letterBadge = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='10' fill='%23FFF1E6'/%3E%3Ctext x='24' y='33' font-family='system-ui%2C sans-serif' font-size='22' font-weight='700' fill='%23C2622A' text-anchor='middle'%3E${letter}%3C/text%3E%3C/svg%3E`;

  return (
    <div className="not-prose my-8 relative rounded-[20px] bg-soft border border-[rgba(244,162,97,0.25)] p-6 flex items-start gap-4">
      {/* Affiliate disclosure eyebrow — top right */}
      <div className="absolute top-4 right-5 flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em] font-medium text-ink-soft">
        <Info className="w-3 h-3" aria-hidden />
        <span>Affiliate</span>
      </div>

      {/* Tool logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/tools/${slug}-logo.png`}
        alt={`${toolName} logo`}
        className="w-12 h-12 rounded-[12px] object-contain flex-shrink-0 border border-line bg-white p-1.5"
        onError={(e) => {
          if (e.currentTarget.src.includes('/images/tools/')) {
            e.currentTarget.src = googleFaviconUrl;
          } else {
            e.currentTarget.src = letterBadge;
            e.currentTarget.onerror = null;
          }
        }}
      />

      {/* Content */}
      <div className="flex-1 pr-14 min-w-0">
        <h4 className="font-sans font-semibold text-ink text-[17px] tracking-[-0.01em] mb-1.5 m-0">
          {toolName}
        </h4>
        <p className="text-ink-soft text-[14px] leading-[1.6] mb-3 m-0">{review}</p>
        <div className="flex items-center gap-3 flex-wrap mb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
          <span>
            <span className="text-[#C2622A]">Best for:</span> {bestFor}
          </span>
          <span className="text-ink-soft/50" aria-hidden>·</span>
          <span>{priceRange}</span>
        </div>
        <a
          href={`/go/${slug}`}
          target="_blank"
          rel="noopener sponsored"
          className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-all duration-200 hover:bg-[#1a1916] active:scale-[0.98]"
        >
          {ctaText}
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}

export default AffiliateCardInline;
