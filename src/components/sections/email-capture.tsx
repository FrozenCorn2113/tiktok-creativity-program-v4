// Source: https://21st.dev/r/ruixenui/newsletter-form
// Email capture section — single-column centered with image above form
// Brand tokens applied throughout. SSR-safe: content visible without JS.

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmailCaptureProps {
  headline?: string;
  subheadline?: string;
  cta?: string;
  showImage?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  compact?: boolean;
}

export function EmailCapture({
  headline = "Get the Free Eligibility Checklist",
  subheadline = "Every requirement in plain language, the most common rejection reasons, and what to do if your qualified views aren't counting. Updated for 2026.",
  cta = "Send Me the Checklist",
  showImage = true,
  imageSrc = "/images/brand/landpress-marketing-3.png",
  imageAlt = "Creator reviewing TikTok analytics",
  compact = false,
}: EmailCaptureProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  useEffect(() => { setMounted(true); }, []);

  const motionProps = mounted && !shouldReduceMotion
    ? { initial: "hidden", whileInView: "show", viewport: viewportOnce, variants: fadeUp }
    : {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-background-warm py-24">
      <div className="max-w-container mx-auto px-6">
        <motion.div
          {...motionProps}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Image above form */}
          {showImage && !compact && (
            <div className="mb-8">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={200}
                height={200}
                className="mx-auto rounded-2xl object-contain"
                loading="lazy"
              />
            </div>
          )}

          <h2
            className="text-brand-ink leading-tight"
            style={{
              fontWeight: 800,
              fontSize: compact ? "1.5rem" : "2.25rem",
            }}
          >
            {headline}
          </h2>
          <p className="mt-4 text-[1.125rem] leading-relaxed text-text-secondary">
            {subheadline}
          </p>

          {/* Form */}
          {status === "success" ? (
            <div className="mt-8 rounded-2xl bg-status-successSoft border border-status-success/20 p-6 text-status-success font-medium">
              You&apos;re in. Check your inbox for the checklist.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 rounded-full border-border-strong focus:border-brand-primary h-12 px-5 text-base"
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-brand-primary text-brand-ink hover:bg-brand-primaryHover font-bold rounded-full px-8 h-12 shrink-0"
                >
                  {status === "loading" ? "Sending..." : cta}
                </Button>
              </div>
              {status === "error" && (
                <p className="mt-2 text-sm text-status-error">
                  Something went wrong. Please try again.
                </p>
              )}
              <p className="mt-3 text-xs text-text-muted">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default EmailCapture;
