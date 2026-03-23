// Source: https://21st.dev/r/radu-activation-popescu/pricing-slider-loops
// Adapted: pricing context replaced with earnings context
// Calculator input panel — slider inputs, JetBrains Mono result display
// Brand tokens applied throughout

"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Button } from "@/components/ui/button";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Share2, Copy } from "lucide-react";
import { EmailCaptureInline } from "@/components/email/email-capture-inline";
import { AffiliateCardInline } from "@/components/affiliate/affiliate-card-inline";

interface CalculatorResult {
  earnings: number;
  qualifiedViews: number;
  withBonus: number;
}

function calculate(views: number, rpm: number): CalculatorResult {
  const qualifiedRatio = 0.82;
  const qualifiedViews = Math.round(views * qualifiedRatio);
  const earnings = (qualifiedViews / 1000) * rpm;
  const withBonus = earnings * 1.2;
  return {
    earnings: parseFloat(earnings.toFixed(2)),
    qualifiedViews,
    withBonus: parseFloat(withBonus.toFixed(2)),
  };
}

interface CalculatorPanelProps {
  className?: string;
}

export function CalculatorPanel({ className }: CalculatorPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const [views, setViews] = useState(100000);
  const [rpm, setRpm] = useState(0.7);
  const [copied, setCopied] = useState(false);

  const result = calculate(views, rpm);

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: viewportOnce,
        variants: fadeUp,
      };

  const formatViews = (v: number) => {
    if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
    if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
    return v.toString();
  };

  return (
    <motion.div
      {...motionProps}
      className={cn(
        "bg-white rounded-2xl border border-border-default shadow-lg p-8",
        className
      )}
    >
      {/* Views slider */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-brand-ink">
            Monthly Views
          </label>
          <span className="font-mono text-lg font-bold text-brand-primary" style={{ fontFamily: "var(--font-mono)" }}>
            {formatViews(views)}
          </span>
        </div>
        <Slider
          min={10000}
          max={10000000}
          step={10000}
          value={[views]}
          onValueChange={(val) => {
            const v = Array.isArray(val) ? val[0] : val;
            if (typeof v === 'number') setViews(v);
          }}
          className="[&_[role=slider]]:bg-brand-primary [&_[role=slider]]:border-brand-primary [&_.relative]:bg-brand-primary"
          aria-label="Monthly views"
        />
        <div className="flex justify-between mt-1 text-xs text-text-muted">
          <span>10K</span>
          <span>10M</span>
        </div>
      </div>

      {/* RPM slider */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-brand-ink">
            RPM ($ per 1,000 views)
          </label>
          <span className="font-mono text-lg font-bold text-brand-primary" style={{ fontFamily: "var(--font-mono)" }}>
            ${rpm.toFixed(2)}
          </span>
        </div>
        <Slider
          min={0.1}
          max={5}
          step={0.05}
          value={[rpm]}
          onValueChange={(val) => {
            const v = Array.isArray(val) ? val[0] : val;
            if (typeof v === 'number') setRpm(v);
          }}
          className="[&_[role=slider]]:bg-brand-primary [&_[role=slider]]:border-brand-primary"
          aria-label="RPM in dollars per 1000 views"
        />
        <div className="flex justify-between mt-1 text-xs text-text-muted">
          <span>$0.10</span>
          <span>$5.00</span>
        </div>
      </div>

      {/* Result display */}
      <div className="rounded-xl bg-background-warm border border-brand-primary/20 p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
          Estimated Earnings
        </p>
        <div
          className="text-[3rem] font-bold text-brand-primary leading-none"
          style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          aria-live="polite"
          aria-atomic="true"
        >
          $<NumberTicker
            value={result.earnings}
            decimalPlaces={2}
            className="text-brand-primary"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-brand-primary/10">
          <div>
            <p
              className="text-xl font-medium text-text-secondary"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {result.qualifiedViews.toLocaleString()}
            </p>
            <p className="text-xs text-text-muted mt-0.5">qualified views</p>
          </div>
          <div>
            <p
              className="text-xl font-medium text-text-secondary"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ${result.withBonus.toFixed(2)}
            </p>
            <p className="text-xs text-text-muted mt-0.5">with +20% bonus</p>
          </div>
        </div>
      </div>

      {/* Section 4b — v4: Email capture + share buttons + affiliate card */}
      <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-border-default">
        {/* Email capture */}
        <EmailCaptureInline
          leadMagnetTitle="Get a detailed breakdown emailed to you"
          leadMagnetDescription="We'll send your results with context on what they mean and how to improve."
        />

        {/* Share buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[13px] font-medium text-text-secondary">Share your results:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const url = typeof window !== "undefined" ? window.location.href : "";
              const text = encodeURIComponent(
                `I just calculated my estimated TikTok Creator Rewards earnings using this free calculator → ${url} #TikTokCreator #CreatorRewards`
              );
              window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank", "noopener,noreferrer");
            }}
            className="flex items-center gap-1.5 text-text-secondary hover:text-brand-ink"
          >
            <Share2 className="w-3.5 h-3.5" aria-hidden />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const url = typeof window !== "undefined" ? window.location.href : "";
              navigator.clipboard.writeText(url).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              });
            }}
            className="flex items-center gap-1.5 text-text-secondary hover:text-brand-ink"
          >
            <Copy className="w-3.5 h-3.5" aria-hidden />
            {copied ? "Copied!" : "Copy link"}
          </Button>
        </div>

        {/* Affiliate card — contextual based on RPM */}
        <div>
          <h4 className="text-[14px] font-semibold text-text-secondary mb-3">
            Tools that can help improve your results
          </h4>
          {rpm < 0.02 ? (
            <AffiliateCardInline
              toolName="CapCut"
              slug="capcut"
              review="The video editor most creators with growing qualified view rates use. Built for vertical video with auto-captions that boost completion rates — which directly affects your RPM."
              bestFor="Creators building content quality"
              priceRange="Free • Pro from $7.99/mo"
              ctaText="Try CapCut Free"
            />
          ) : (
            <AffiliateCardInline
              toolName="Exolyt"
              slug="exolyt"
              review="Deep TikTok analytics that show you exactly which videos are earning qualified views, what's driving your RPM, and where your audience is coming from. Essential for optimizing at your level."
              bestFor="Creators optimizing their RPM"
              priceRange="Free plan • Pro from $9.99/mo"
              ctaText="Try Exolyt"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default CalculatorPanel;
