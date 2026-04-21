// Warm-editorial inline email capture for guide content

"use client";

import { useState } from "react";
import { Download } from "lucide-react";

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
      <div className="not-prose my-10 rounded-[20px] bg-ink text-paper px-6 py-6 text-center">
        <p className="font-sans font-semibold text-[16px] m-0">
          You&apos;re in. Check your inbox for your free resources.
        </p>
      </div>
    );
  }

  return (
    <div className="not-prose my-10 rounded-[20px] bg-ink text-paper px-6 py-6 md:px-8 md:py-7">
      <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
        {/* Lead magnet text */}
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] font-medium text-[#F4A261] mb-2 flex items-center gap-1.5">
            <Download className="w-3 h-3" aria-hidden />
            Free download
          </div>
          <h4 className="font-sans font-semibold text-paper text-[18px] tracking-[-0.01em] m-0 mb-1.5">
            {leadMagnetTitle}
          </h4>
          <p className="text-paper/70 text-[13.5px] leading-[1.55] m-0">
            {leadMagnetDescription}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 w-full sm:w-auto sm:flex-shrink-0"
        >
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email address"
            className="rounded-full h-10 px-4 text-[13px] flex-1 sm:w-[220px] bg-white/10 border border-white/20 text-paper placeholder:text-paper/50 focus:outline-none focus:border-[#F4A261] transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full h-10 px-5 bg-[#F4A261] text-ink text-[13px] font-semibold whitespace-nowrap hover:bg-[#E8894A] transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Get it free"}
          </button>
        </form>
      </div>
      {status === "error" && (
        <p className="text-[12px] text-[#F4A261] mt-2">Something went wrong. Please try again.</p>
      )}
      <p className="text-paper/50 text-[11px] mt-3">No spam. Unsubscribe anytime.</p>
    </div>
  );
}

export default EmailCaptureInline;
