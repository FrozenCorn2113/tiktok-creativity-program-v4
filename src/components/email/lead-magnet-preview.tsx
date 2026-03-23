// Designed by Vale v4 — Lead magnet preview card for email capture

import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LeadMagnetPreviewCardProps {
  title: string;
  previewSrc: string;
  itemCount: string;
}

export function LeadMagnetPreviewCard({ title, previewSrc, itemCount }: LeadMagnetPreviewCardProps) {
  return (
    <div className="bg-surface border border-border-default rounded-lg p-3 flex items-center gap-3">
      {/* Preview thumbnail */}
      <div className="w-[80px] h-[60px] bg-brand-primarySoft rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewSrc}
          alt={`Preview of ${title}`}
          className="w-full h-full object-cover rounded-md"
          onError={(e) => {
            /* fallback: show Download icon if image missing */
            e.currentTarget.style.display = "none";
            const sibling = e.currentTarget.nextElementSibling as HTMLElement | null;
            if (sibling) sibling.classList.remove("hidden");
          }}
        />
        <Download className="w-6 h-6 text-brand-primary hidden" aria-hidden />
      </div>
      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="font-manrope font-semibold text-brand-ink text-sm leading-tight">{title}</p>
        <p className="text-text-muted text-[11px] mt-0.5">{itemCount} • Free instant download</p>
      </div>
      {/* Free badge */}
      <Badge className="ml-auto bg-brand-primarySoft text-brand-primaryDeep text-xs font-manrope font-semibold flex-shrink-0 border-0">
        FREE
      </Badge>
    </div>
  );
}

export default LeadMagnetPreviewCard;
