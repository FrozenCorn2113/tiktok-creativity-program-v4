// Designed by Vale v4 — Inline email capture for guide content

"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmailCaptureInlineProps {
  leadMagnetTitle: string;
  leadMagnetDescription: string;
  convertKitFormId?: string;
}

export function EmailCaptureInline({
  leadMagnetTitle,
  leadMagnetDescription,
  convertKitFormId: _convertKitFormId,
}: EmailCaptureInlineProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "inline",
          lead_magnet: leadMagnetTitle,
          page_url: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
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

  if (status === "success") {
    return (
      <div className="bg-brand-primarySoft border border-brand-primary/20 rounded-xl p-6 my-8 not-prose text-center">
        <p className="font-manrope font-semibold text-brand-ink text-base">
          You&apos;re in! Check your inbox for your free resources.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-brand-primarySoft border border-brand-primary/20 rounded-xl p-6 my-8 not-prose">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        {/* Lead magnet text */}
        <div className="flex-1">
          <h4 className="font-manrope font-bold text-brand-ink text-lg mb-1 flex items-center gap-2">
            <Download className="w-4 h-4 text-brand-primary flex-shrink-0" aria-hidden />
            {leadMagnetTitle}
          </h4>
          <p className="text-text-secondary text-sm leading-snug">{leadMagnetDescription}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto sm:flex-shrink-0">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-full h-10 border-border-strong focus:border-brand-primary text-sm flex-1 sm:w-[220px]"
            aria-label="Email address"
          />
          <Button
            type="submit"
            disabled={status === "loading"}
            className="bg-brand-primary text-brand-ink font-semibold rounded-full px-5 h-10 whitespace-nowrap hover:bg-brand-primaryHover"
          >
            {status === "loading" ? "Sending..." : "Get It Free"}
          </Button>
        </form>
      </div>
      {status === "error" && (
        <p className="text-[11px] text-red-600 font-manrope mt-2">Something went wrong. Please try again.</p>
      )}
      <p className="text-text-muted text-[11px] font-manrope mt-2">No spam. Unsubscribe anytime.</p>
    </div>
  );
}

export default EmailCaptureInline;
