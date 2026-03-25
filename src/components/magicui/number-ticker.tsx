// NumberTicker — instant number display, no spring animation
// Formats numbers with locale-aware separators and decimal places

"use client";

import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
  decimalPlaces?: number;
}

export function NumberTicker({
  value,
  className,
  decimalPlaces = 0,
}: NumberTickerProps) {
  return (
    <span
      className={cn("inline-block tabular-nums", className)}
    >
      {Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(value)}
    </span>
  );
}

export default NumberTicker;
