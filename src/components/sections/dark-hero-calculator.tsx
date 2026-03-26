// Version B — Dark Editorial Hero with embedded EarningsCalculator
// Calculator IS the hero — no CTA to "try the calculator", it's just there.
// Dark ink background, orange accents, editorial typography.

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";

export function DarkHeroCalculator() {
  const [views, setViews] = useState(500000);
  const [rpm, setRpm] = useState(0.65);
  const [includeBonus, setIncludeBonus] = useState(false);

  const qualifiedViews = useMemo(() => Math.round(views * 0.82), [views]);
  const baseEarnings = useMemo(() => (qualifiedViews / 1000) * rpm, [qualifiedViews, rpm]);
  const totalEarnings = baseEarnings * (includeBonus ? 1.2 : 1);

  const formatViews = (v: number) => {
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
    return v.toString();
  };

  return (
    <section className="bg-[#0F172A] min-h-[92vh] flex flex-col justify-center pt-24 pb-16">
      <div className="max-w-container mx-auto px-6 w-full">
        {/* Editorial kicker */}
        <div className="mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F97316]">
            TikTok Creator Rewards Program
          </span>
          <h1 className="mt-3 text-[2.5rem] md:text-[3.75rem] font-extrabold leading-[1.05] tracking-tight text-white max-w-3xl" style={{ fontWeight: 800 }}>
            The Real Guide to Getting Paid by TikTok
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.65] text-gray-400 max-w-2xl">
            Free calculators, 107 guides, and honest answers to the questions TikTok&apos;s help center won&apos;t touch.
          </p>
        </div>

        {/* Main layout — calculator left (3fr), quick links right (2fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-center mt-10">

          {/* Left — embedded calculator */}
          <div className="bg-[#1a2337] border border-white/10 rounded-2xl overflow-hidden">
            {/* Calculator header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold text-[16px]">Earnings Calculator</h2>
                <p className="text-gray-500 text-[13px] mt-0.5">Based on qualified views, not followers</p>
              </div>
              <Link
                href="/calculators/earnings-calculator"
                className="text-[#F97316] text-[13px] font-semibold flex items-center gap-1 hover:text-[#EA6A0A] transition-colors"
              >
                Full calculator <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="space-y-5">
                  {/* Views input */}
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-300 mb-2">
                      Total video views
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={views}
                      onChange={(e) => setViews(Number(e.target.value))}
                      className="w-full h-11 rounded-lg border border-white/15 bg-white/5 px-4 font-mono text-right text-sm text-white focus:outline-none focus:border-[#F97316] focus:bg-white/8 transition-colors"
                    />
                    <p className="mt-1.5 text-[11px] text-gray-500">
                      ~{formatViews(qualifiedViews)} qualified ({Math.round(0.82 * 100)}% of total)
                    </p>
                  </div>

                  {/* RPM slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[13px] font-semibold text-gray-300">
                        Estimated RPM
                      </label>
                      <span className="font-mono text-[13px] text-[#F97316] font-bold">
                        ${rpm.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.4}
                      max={1.0}
                      step={0.01}
                      value={rpm}
                      onChange={(e) => setRpm(Number(e.target.value))}
                      className="w-full accent-[#F97316]"
                    />
                    <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                      <span>$0.40</span>
                      <span>$1.00+</span>
                    </div>
                  </div>

                  {/* Bonus toggle */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`w-9 h-5 rounded-full transition-colors relative ${includeBonus ? "bg-[#F97316]" : "bg-white/15"}`}
                      onClick={() => setIncludeBonus(!includeBonus)}
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${includeBonus ? "translate-x-4" : "translate-x-0.5"}`}
                      />
                    </div>
                    <span className="text-[13px] text-gray-300">Include 20% content bonus</span>
                  </label>
                </div>

                {/* Results */}
                <div className="flex flex-col justify-between">
                  <div className="bg-[#0F172A] rounded-xl p-5 border border-white/10">
                    <div className="text-[12px] font-semibold uppercase tracking-widest text-gray-500 mb-3">
                      Estimated Earnings
                    </div>
                    <div className="font-mono text-[2.75rem] font-bold text-white leading-none">
                      ${totalEarnings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="mt-2 text-[12px] text-gray-500">
                      Based on {formatViews(qualifiedViews)} qualified views × ${rpm.toFixed(2)} RPM
                    </div>

                    {/* Range bar */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="text-[11px] text-gray-500 mb-2">Typical range for this view count</div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#F97316]/40 to-[#F97316]"
                            style={{ width: `${Math.min(100, ((rpm - 0.4) / 0.6) * 100)}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-gray-400 shrink-0">
                          ${((qualifiedViews / 1000) * 0.4).toFixed(0)} – ${((qualifiedViews / 1000) * 1.0).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-[11px] text-gray-600 leading-relaxed">
                    Estimates only. Actual payouts vary by niche, audience geography, and content type.{" "}
                    <Link href="/guides/creator-rewards-2026" className="text-[#F97316] hover:underline">
                      How RPM is calculated
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — hero illustration */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">
              {/* Subtle glow behind the image */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#F97316]/10 to-transparent blur-2xl" />
              <Image
                src="/images/brand/hero-illustration.webp"
                alt="Creator monetization and earnings growth visualization"
                width={480}
                height={480}
                className="relative w-full h-auto drop-shadow-2xl"
                priority
              />
              {/* Floating badge */}
              <Link
                href="/guides/creator-rewards-2026"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#1a2337]/90 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-[13px] text-gray-300 font-medium hover:text-white hover:border-[#F97316]/40 transition-colors whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" />
                Start with the 2026 guide
                <ArrowRight className="h-3.5 w-3.5 text-[#F97316]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DarkHeroCalculator;
