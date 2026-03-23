// Source: https://github.com/magicuidesign/magicui/blob/main/registry/magicui/marquee.tsx
// Magic UI Marquee — horizontal scroll strip, pauses on hover
// Customized: respects prefers-reduced-motion

"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = true,
  children,
  vertical = false,
  repeat = 4,
}: MarqueeProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "group flex overflow-hidden [--duration:40s] [--gap:1rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn("flex shrink-0 justify-around gap-[--gap]", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse,
            // Respect reduced motion — no scrolling animation
            "![animation-play-state:paused]": shouldReduceMotion,
          })}
          style={
            shouldReduceMotion
              ? { animationPlayState: "paused" }
              : undefined
          }
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export default Marquee;
