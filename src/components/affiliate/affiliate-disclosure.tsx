// FTC-compliant affiliate disclosure banner — warm editorial

import Link from "next/link";
import { Info } from "lucide-react";

export function AffiliateDisclosure() {
  return (
    <div className="not-prose flex items-start gap-2 rounded-[12px] bg-soft border border-[rgba(244,162,97,0.2)] px-4 py-2.5 text-ink-soft mb-6">
      <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#C2622A]" aria-hidden />
      <span className="text-[12px] leading-[1.55]">
        This page contains affiliate links. If you click through and make a purchase, we may earn a small commission at no extra cost to you. We only recommend tools we&apos;ve researched and genuinely think are useful.{" "}
        <Link
          href="/affiliate-disclosure"
          className="underline decoration-[#F4A261] underline-offset-[3px] hover:text-ink transition-colors"
        >
          Learn more about our affiliate policy
        </Link>
        .
      </span>
    </div>
  );
}

export default AffiliateDisclosure;
