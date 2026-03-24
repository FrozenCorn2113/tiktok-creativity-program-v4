"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-brand-ink transition-colors cursor-pointer"
    >
      <Printer className="w-4 h-4" aria-hidden />
      Print / Save as PDF
    </button>
  );
}

export default PrintButton;
