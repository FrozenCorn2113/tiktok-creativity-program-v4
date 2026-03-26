// ToolsTabs — client component for interactive category tabs
// Custom tab implementation — avoids base-ui/shadcn Tabs which has data-attribute mismatch
// (data-orientation="horizontal" vs data-horizontal: Tailwind variant causing flex-row layout bug)

"use client";

import { useState } from "react";
import { AffiliateCardGrid } from "@/components/affiliate/affiliate-card-grid";

interface Tool {
  toolName: string;
  slug: string;
  domain: string;
  review: string;
  bestFor: string;
  priceRange: string;
  ctaText: string;
  isEditorsPick: boolean;
  ctaUrl?: string;
  imageUrl?: string;
  internal?: boolean;
}

interface Category {
  id: string;
  label: string;
  description: string;
  tools: Tool[];
}

interface ToolsTabsProps {
  categories: Category[];
}

export function ToolsTabs({ categories }: ToolsTabsProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const activeCategory = categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <div className="w-full">
      {/* Sticky tab bar */}
      <div className="bg-white border-b border-border-default sticky top-0 z-10">
        <div className="max-w-container mx-auto px-6">
          <div
            role="tablist"
            aria-label="Tool categories"
            className="flex gap-0 overflow-x-auto pb-px scrollbar-none [-webkit-overflow-scrolling:touch]"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={cat.id === activeId}
                aria-controls={`tabpanel-${cat.id}`}
                id={`tab-${cat.id}`}
                onClick={() => setActiveId(cat.id)}
                className={[
                  "px-4 py-3 text-sm font-manrope whitespace-nowrap rounded-none border-b-2 transition-colors bg-transparent",
                  cat.id === activeId
                    ? "border-brand-primary text-brand-ink font-semibold"
                    : "border-transparent text-text-secondary hover:text-text-primary",
                ].join(" ")}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active category content */}
      {activeCategory && (
        <div
          key={activeCategory.id}
          role="tabpanel"
          id={`tabpanel-${activeCategory.id}`}
          aria-labelledby={`tab-${activeCategory.id}`}
          className="w-full"
        >
          <div className="max-w-container mx-auto px-6 py-12" id={activeCategory.id}>
            <h2 className="text-[1.75rem] font-bold text-brand-ink">{activeCategory.label}</h2>
            <p className="text-[1rem] text-text-secondary leading-[1.75] max-w-2xl mt-2 mb-8">
              {activeCategory.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCategory.tools.map((tool) => (
                <AffiliateCardGrid
                  key={tool.slug}
                  toolName={tool.toolName}
                  slug={tool.slug}
                  domain={tool.domain}
                  review={tool.review}
                  bestFor={tool.bestFor}
                  priceRange={tool.priceRange}
                  ctaText={tool.ctaText}
                  isEditorsPick={tool.isEditorsPick}
                  ctaUrl={tool.ctaUrl}
                  imageUrl={tool.imageUrl}
                  internal={tool.internal}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToolsTabs;
