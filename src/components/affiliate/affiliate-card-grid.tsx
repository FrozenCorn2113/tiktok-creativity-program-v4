// Designed by Vale v4 — Editorial affiliate card, grid/tools page variant

"use client";

import { useState } from "react";
import { Info, Tag, ExternalLink, Star } from "lucide-react";

/** Review text with 3-line clamp and expand toggle */
function ReviewText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex-1 mb-4">
      <p
        className={[
          "text-text-secondary text-sm leading-relaxed",
          !expanded ? "line-clamp-3" : "",
        ].join(" ")}
      >
        {text}
      </p>
      {text.length > 160 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-xs font-medium text-brand-primary hover:underline focus:outline-none"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}

interface AffiliateCardGridProps {
  toolName: string;
  slug: string;
  review: string;
  bestFor: string;
  priceRange: string;
  ctaText: string;
  isEditorsPick?: boolean;
  domain?: string;
  /** Override CTA link destination (e.g. internal guide page) */
  ctaUrl?: string;
  /** Override thumbnail image source */
  imageUrl?: string;
  /** When true, CTA opens in same tab (for internal links) */
  internal?: boolean;
}

export function AffiliateCardGrid({
  toolName,
  slug,
  review,
  bestFor,
  priceRange,
  ctaText,
  isEditorsPick = false,
  domain,
  ctaUrl,
  imageUrl,
  internal = false,
}: AffiliateCardGridProps) {
  const logoSrc = imageUrl ?? `/images/tools/${slug}-logo.png`;
  // Clearbit Logo API returns a proper brand logo (not a 16px favicon)
  const logoDomain = domain ?? `${slug.replace(/-/g, "")}.com`;
  const clearbitUrl = `https://logo.clearbit.com/${logoDomain}`;
  // Final fallback: styled letter badge as SVG data URI — looks intentional, never broken
  const letter = toolName.charAt(0).toUpperCase();
  const letterBadge = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='10' fill='%23FFF3E8'/%3E%3Ctext x='24' y='33' font-family='system-ui%2C sans-serif' font-size='22' font-weight='700' fill='%23C2622A' text-anchor='middle'%3E${letter}%3C/text%3E%3C/svg%3E`;
  const linkHref = ctaUrl ?? `/go/${slug}`;

  return (
    <div className="bg-white border border-border-default rounded-xl p-6 hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      {/* Header row */}
      <div className="flex items-start gap-3 mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt={`${toolName} logo`}
          className={[
            "rounded-lg object-cover border border-border-default bg-white flex-shrink-0",
            imageUrl ? "w-14 h-14 p-0" : "w-12 h-12 p-1 object-contain",
          ].join(" ")}
          onError={(e) => {
            if (!imageUrl && e.currentTarget.src.includes('/images/tools/')) {
              // Stage 1: Clearbit
              e.currentTarget.src = clearbitUrl;
            } else if (!e.currentTarget.src.startsWith('data:')) {
              // Stage 2: letter badge (always available, looks intentional)
              e.currentTarget.src = letterBadge;
              e.currentTarget.onerror = null;
            }
          }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-manrope font-bold text-brand-ink text-base leading-tight">{toolName}</h3>
          <span className="text-text-muted text-xs">{priceRange}</span>
        </div>
        {/* Optional: editor's pick label */}
        {isEditorsPick && (
          <span className="inline-flex items-center text-brand-primaryDeep text-xs font-manrope font-semibold flex-shrink-0">
            <Star className="w-3 h-3 mr-1" aria-hidden />
            Editor&apos;s Pick
          </span>
        )}
      </div>

      {/* Review — capped at 3 lines with expand toggle */}
      <ReviewText text={review} />

      {/* Best for tag */}
      <div className="mb-4">
        <span className="inline-flex items-center text-text-secondary text-xs font-manrope max-w-full">
          <Tag className="w-3 h-3 mr-1 flex-shrink-0" aria-hidden />
          <span className="truncate">Best for: {bestFor}</span>
        </span>
      </div>

      {/* CTA */}
      <a
        href={linkHref}
        {...(internal ? {} : { target: "_blank", rel: "noopener sponsored" })}
        className="w-full inline-flex items-center justify-center gap-2 h-10 px-4 text-sm rounded-lg border border-brand-primary text-brand-ink hover:bg-brand-primarySoft font-semibold transition-colors"
      >
        {ctaText} {!internal && <ExternalLink className="w-3 h-3" aria-hidden />}
      </a>

      {/* Disclosure — only for external affiliate links */}
      {!internal && (
        <p className="text-text-muted text-[11px] font-manrope text-center mt-2 flex items-center justify-center gap-1">
          <Info className="w-3 h-3" aria-hidden />
          We may earn a commission
        </p>
      )}
    </div>
  );
}

export default AffiliateCardGrid;
