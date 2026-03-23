// Source: https://github.com/magicuidesign/magicui/blob/main/registry/magicui/number-ticker.tsx
// Magic UI NumberTicker — animates number from 0 to target on scroll into view
// Customized: uses brand tokens, respects prefers-reduced-motion

"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number; // seconds
  className?: string;
  decimalPlaces?: number;
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const shouldReduceMotion = useReducedMotion();

  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (shouldReduceMotion) {
      // Static render — no animation
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(value);
      }
      return;
    }

    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
    }
  }, [isInView, delay, direction, value, motionValue, shouldReduceMotion, decimalPlaces]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(Number(latest.toFixed(decimalPlaces)));
      }
    });
  }, [springValue, decimalPlaces, shouldReduceMotion]);

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums", className)}
    >
      {/* Initial value rendered server-side — prevents flash of 0 on SSR */}
      {Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(value)}
    </span>
  );
}

export default NumberTicker;
