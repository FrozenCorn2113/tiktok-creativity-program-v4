// Source: https://ui.aceternity.com/components/spotlight
// Customized for brand tokens: warm background #FFF8F2, orange accent #F97316

"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export function Spotlight({ className, fill = "#F97316" }: SpotlightProps) {
  const shouldReduceMotion = useReducedMotion();
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!divRef.current || shouldReduceMotion) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, [shouldReduceMotion]);

  const handleMouseEnter = useCallback(() => {
    if (shouldReduceMotion) return;
    setOpacity(1);
  }, [shouldReduceMotion]);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <div ref={divRef} className={cn("relative overflow-hidden", className)}>
      {/* Spotlight beam — follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ opacity }}
      >
        <div
          className="absolute"
          style={{
            left: position.x - 300,
            top: position.y - 300,
            width: 600,
            height: 600,
            background: `radial-gradient(circle at center, ${fill}22 0%, transparent 70%)`,
            transform: "translate(0, 0)",
          }}
        />
      </div>
      {/* Ambient top spotlight — always visible */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${fill}18 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}

type SpotlightContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function SpotlightContainer({ children, className }: SpotlightContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || shouldReduceMotion) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [shouldReduceMotion]
  );

  const handleMouseEnter = useCallback(() => {
    if (shouldReduceMotion) return;
    setOpacity(1);
  }, [shouldReduceMotion]);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <section
      ref={containerRef}
      className={cn("relative overflow-hidden bg-background-warm", className)}
    >
      {/* Cursor spotlight beam */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{ opacity }}
      >
        <div
          className="absolute rounded-full"
          style={{
            left: position.x - 350,
            top: position.y - 350,
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle at center, rgba(244,162,97,0.12) 0%, transparent 70%)",
          }}
        />
      </div>
      {/* Ambient top glow — always on */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% -5%, rgba(244,162,97,0.14) 0%, transparent 60%)",
        }}
      />
      {/* Content above overlays */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
