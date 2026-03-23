// Version B — Dark tools/calculators strip section
// Grid of tool cards with editorial ratings-feel design

"use client";

import Link from "next/link";
import { Calculator, BarChart2, Users, BookOpen, Wrench, ArrowRight } from "lucide-react";

const tools = [
  {
    Icon: Calculator,
    title: "Earnings Calculator",
    description: "Estimate your monthly Creator Rewards payout based on views and RPM.",
    href: "/calculators/earnings-calculator",
    tag: "Most Used",
  },
  {
    Icon: BarChart2,
    title: "RPM by Country",
    description: "See how your audience geography affects your per-1000-view rate.",
    href: "/calculators/rpm-by-country",
    tag: "Free",
  },
  {
    Icon: Users,
    title: "Follower Income Estimator",
    description: "Understand the relationship between followers, views, and potential earnings.",
    href: "/calculators/follower-income-estimator",
    tag: "Free",
  },
  {
    Icon: BookOpen,
    title: "Creator Rewards Guide",
    description: "The complete 2026 guide to eligibility, qualified views, and getting accepted.",
    href: "/guides/creator-rewards-2026",
    tag: "Start Here",
  },
  {
    Icon: Wrench,
    title: "Tools & Resources",
    description: "The editing software, microphones, and cameras used by successful TCP creators.",
    href: "/tools",
    tag: "Curated",
  },
];

export function DarkToolsStrip() {
  return (
    <section className="bg-[#0F172A] py-20 border-t border-white/8">
      <div className="max-w-container mx-auto px-6">
        <div className="mb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#F97316]">
            Free Tools
          </span>
          <h2 className="mt-2 text-[2rem] font-bold text-white" style={{ fontWeight: 700 }}>
            Everything in One Place
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(({ Icon, title, description, href, tag }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col bg-[#1a2337] border border-white/10 rounded-xl p-5 hover:border-[#F97316]/40 hover:bg-[#1e2840] transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-[#F97316]/10 rounded-lg">
                  <Icon className="h-5 w-5 text-[#F97316]" aria-hidden />
                </div>
                <span className="text-[11px] font-bold text-gray-500 bg-white/5 px-2 py-0.5 rounded-md">
                  {tag}
                </span>
              </div>
              <h3 className="text-[15px] font-bold text-white group-hover:text-[#F97316] transition-colors">
                {title}
              </h3>
              <p className="mt-1.5 text-[13px] text-gray-400 leading-relaxed flex-1">
                {description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-gray-500 group-hover:text-[#F97316] transition-colors">
                Open <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DarkToolsStrip;
