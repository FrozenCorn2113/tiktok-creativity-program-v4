// Designed by Vale v4 — FTC-compliant affiliate disclosure banner

import Link from "next/link";
import { Info } from "lucide-react";

export function AffiliateDisclosure() {
  return (
    <div className="flex items-start gap-2 bg-surface border border-border-default rounded-md px-4 py-2.5 text-text-muted mb-6 not-prose">
      <Info className="w-3 h-3 mt-0.5 flex-shrink-0" aria-hidden />
      <span className="text-[12px] font-manrope leading-relaxed">
        This page contains affiliate links. If you click through and make a purchase, we may earn a small commission at no extra cost to you. We only recommend tools we&apos;ve researched and genuinely think are useful.{" "}
        <Link href="/affiliate-disclosure" className="underline hover:text-text-secondary transition-colors">
          Learn more about our affiliate policy
        </Link>.
      </span>
    </div>
  );
}

export default AffiliateDisclosure;
