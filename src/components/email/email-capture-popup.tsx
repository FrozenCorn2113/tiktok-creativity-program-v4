// Exit intent popup — warm editorial

"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { LeadMagnetPreviewCard } from "@/components/email/lead-magnet-preview";

const SESSION_KEY = "tcp_popup_shown";

interface EmailCapturePopupProps {
  leadMagnetTitle: string;
  previewImageSrc?: string;
  itemCount?: string;
  headline: string;
  description: string;
}

export function EmailCapturePopup({
  leadMagnetTitle,
  previewImageSrc = "/images/brand/email-capture-illustration.webp",
  itemCount = "Free guide",
  headline,
  description,
}: EmailCapturePopupProps) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleDismiss = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage may be unavailable in some contexts
    }
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        try {
          if (sessionStorage.getItem(SESSION_KEY)) return;
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          // ignore
        }
        setVisible(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

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
          source: "exit-intent",
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

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-ink/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Get your free guide"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss();
      }}
    >
      {/* Modal */}
      <div className="bg-paper rounded-[24px] shadow-[0_30px_80px_rgba(15,14,12,0.25)] max-w-[480px] w-full p-8 relative border border-line">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute top-4 right-4 text-ink-soft hover:text-ink transition-colors"
        >
          <X className="w-5 h-5" aria-hidden />
        </button>

        {/* Lead magnet preview */}
        <LeadMagnetPreviewCard
          title={leadMagnetTitle}
          previewSrc={previewImageSrc}
          itemCount={itemCount}
        />

        {/* Eyebrow + headline + description */}
        <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] font-medium text-[#C2622A]">
          Before you go
        </div>
        <h3 className="font-sans font-semibold text-ink text-[22px] tracking-[-0.02em] mt-2 mb-2.5 m-0 leading-[1.2]">
          {headline}
        </h3>
        <p className="text-ink-soft text-[14px] leading-[1.6] mb-5 m-0">{description}</p>

        {status === "success" ? (
          <div className="rounded-[16px] bg-ink text-paper p-4 font-sans font-semibold text-center text-sm">
            You&apos;re in. Check your inbox.
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
                className="flex-1 h-11 rounded-full px-4 text-[14px] bg-white border border-line focus:outline-none focus:border-[#F4A261] transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-full h-11 px-6 bg-ink text-paper text-[13px] font-semibold hover:bg-[#1a1916] transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Get it free"}
              </button>
            </form>
            {status === "error" && (
              <p className="text-[11px] text-[#C2622A] mt-1.5">
                Something went wrong. Please try again.
              </p>
            )}
            <p className="text-ink-soft/70 text-[11px] text-center mt-3">
              No spam. Free forever. Unsubscribe anytime.
            </p>
          </>
        )}

        {/* Dismiss link */}
        <button
          onClick={handleDismiss}
          className="block text-center text-ink-soft text-[11px] mt-3 underline underline-offset-2 hover:text-ink transition-colors w-full"
        >
          No thanks, I&apos;ll figure it out myself
        </button>
      </div>
    </div>
  );
}

export default EmailCapturePopup;
