// Designed by Vale v4 — Editorial affiliate card, inline guide variant

"use client";

import { Info, Tag, ExternalLink } from "lucide-react";

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
  // Final fallback: styled letter badge — always available, looks intentional
  const letter = toolName.charAt(0).toUpperCase();
  const letterBadge = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='10' fill='%23FFF3E8'/%3E%3Ctext x='24' y='33' font-family='system-ui%2C sans-serif' font-size='22' font-weight='700' fill='%23C2622A' text-anchor='middle'%3E${letter}%3C/text%3E%3C/svg%3E`;

  return (
    <div className="bg-surface border border-border-default rounded-xl p-5 flex items-start gap-4 my-8 relative not-prose">
      {/* Affiliate disclosure label — top right, always visible */}
      <div className="absolute top-3 right-3 flex items-center gap-1 text-text-muted">
        <Info className="w-3 h-3" aria-hidden />
        <span className="text-[11px] font-manrope font-medium">Affiliate</span>
      </div>

      {/* Tool logo — try local file, fallback to Google Favicon, fallback to letter badge */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/tools/${slug}-logo.png`}
        alt={`${toolName} logo`}
        className="w-12 h-12 rounded-lg object-contain flex-shrink-0 border border-border-default bg-white p-1"
        onError={(e) => {
          if (e.currentTarget.src.includes('/images/tools/')) {
            // Stage 1 → Google Favicon (128px, reliable)
            e.currentTarget.src = googleFaviconUrl;
          } else {
            // Stage 2 → letter badge (always available, looks intentional)
            e.currentTarget.src = letterBadge;
            e.currentTarget.onerror = null;
          }
        }}
      />

      {/* Content */}
      <div className="flex-1 pr-12">
        <h4 className="font-manrope font-semibold text-brand-ink text-base mb-1">{toolName}</h4>
        <p className="text-text-secondary text-sm leading-relaxed mb-3">{review}</p>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="inline-flex items-center text-text-secondary text-xs font-manrope">
            <Tag className="w-3 h-3 mr-1" aria-hidden />
            Best for: {bestFor}
          </span>
          <span className="text-text-muted text-xs">{priceRange}</span>
        </div>
        <a
          href={`/go/${slug}`}
          target="_blank"
          rel="noopener sponsored"
          className="inline-flex items-center gap-1.5 h-7 px-2.5 text-[0.8rem] rounded-lg border border-brand-primary text-brand-ink hover:bg-brand-primarySoft font-semibold transition-colors"
        >
          {ctaText} <ExternalLink className="w-3 h-3" aria-hidden />
        </a>
      </div>
    </div>
  );
}

export default AffiliateCardInline;
