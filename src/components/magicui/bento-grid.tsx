// Source: https://github.com/magicuidesign/magicui/blob/main/registry/magicui/bento-grid.tsx
// Magic UI BentoGrid — used for Three-Path section (3 equal cards)
// Customized: brand tokens, hover shadow, no default gradient backgrounds

import { cn } from "@/lib/utils";
import React from "react";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoCardProps {
  name?: string;
  className?: string;
  background?: React.ReactNode;
  Icon?: React.ElementType;
  description?: string;
  href?: string;
  cta?: string;
  children?: React.ReactNode;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  children,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border-default bg-white p-8",
        "shadow-sm hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      {background && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {background}
        </div>
      )}
      <div className="relative z-10">
        {Icon && (
          <div className="mb-4">
            <Icon className="h-8 w-8 text-brand-primary" aria-hidden />
          </div>
        )}
        {name && (
          <h3 className="text-xl font-bold text-brand-ink mb-2" style={{ fontWeight: 700 }}>
            {name}
          </h3>
        )}
        {description && (
          <p className="text-[15px] leading-relaxed text-text-secondary">
            {description}
          </p>
        )}
        {children}
        {href && cta && (
          <a
            href={href}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primaryDeep hover:underline"
          >
            {cta}
          </a>
        )}
      </div>
    </div>
  );
}
