// Trust bar — 4 stats with Magic UI NumberTicker animated countup (v4)
// Stats: 57 guides, 3 calculators, Updated for 2026, 100% Free Forever
// Target values render server-side to prevent SSR flash of 0

"use client";

import { BookOpen, Calculator, Zap } from "lucide-react";
import { NumberTicker } from "@/components/magicui/number-ticker";

const numberStats = [
  {
    Icon: BookOpen,
    value: 57,
    suffix: "",
    label: "Guides Published",
  },
  {
    Icon: Calculator,
    value: 3,
    suffix: "",
    label: "Free Calculators",
  },
];

export function TrustBarV3() {
  return (
    <div className="bg-white border-y border-border-default">
      <div className="max-w-container mx-auto px-6 py-6">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-8">
          {numberStats.map(({ Icon, value, suffix, label }) => (
            <div key={label} className="flex items-center gap-3 text-center md:text-left">
              <Icon className="h-5 w-5 text-brand-primary shrink-0" aria-hidden />
              <div>
                <div className="text-[1.75rem] font-extrabold text-brand-ink leading-none" style={{ fontWeight: 800 }}>
                  <NumberTicker value={value} className="text-brand-ink" />
                  {suffix}
                </div>
                <div className="text-[13px] font-medium text-text-secondary mt-0.5">
                  {label}
                </div>
              </div>
            </div>
          ))}

          {/* Third stat — "Updated for 2026" text, no number ticker */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <BookOpen className="h-5 w-5 text-brand-primary shrink-0" aria-hidden />
            <div>
              <div className="text-[1.75rem] font-extrabold text-brand-ink leading-none" style={{ fontWeight: 800 }}>
                2026
              </div>
              <div className="text-[13px] font-medium text-text-secondary mt-0.5">
                Updated for 2026
              </div>
            </div>
          </div>

          {/* Fourth stat (v4) — 100% Free Forever */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <Zap className="h-5 w-5 text-brand-primary shrink-0" aria-hidden />
            <div>
              <div className="text-[1.75rem] font-extrabold text-brand-ink leading-none" style={{ fontWeight: 800 }}>
                100%
              </div>
              <div className="text-[13px] font-medium text-text-secondary mt-0.5">
                Free Forever
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrustBarV3;
