// Designed by Vale v4 — Exit intent popup, calculator pages only

"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    // Check if already shown this session
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
    /* Backdrop */
    <div
      className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Get your free guide"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss();
      }}
    >
      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-xl max-w-[480px] w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
        >
          <X className="w-5 h-5" aria-hidden />
        </button>

        {/* Lead magnet preview */}
        <LeadMagnetPreviewCard
          title={leadMagnetTitle}
          previewSrc={previewImageSrc}
          itemCount={itemCount}
        />

        {/* Headline + description */}
        <h3 className="font-manrope font-bold text-brand-ink text-xl mt-4 mb-2">{headline}</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-5">{description}</p>

        {status === "success" ? (
          <div className="bg-brand-primarySoft border border-brand-primary/20 rounded-xl p-4 text-brand-ink font-manrope font-semibold text-center text-sm">
            You&apos;re in. Check your inbox.
          </div>
        ) : (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-11 rounded-full border-border-strong focus:border-brand-primary"
                aria-label="Email address"
              />
              <Button
                type="submit"
                disabled={status === "loading"}
                className="bg-brand-primary text-brand-ink font-bold rounded-full px-6 h-11 hover:bg-brand-primaryHover"
              >
                {status === "loading" ? "Sending..." : "Get It Free"}
              </Button>
            </form>
            {status === "error" && (
              <p className="text-[11px] text-red-600 mt-1">Something went wrong. Please try again.</p>
            )}
            <p className="text-text-muted text-[11px] font-manrope text-center mt-2">
              No spam. Free forever. Unsubscribe anytime.
            </p>
          </>
        )}

        {/* Dismiss link */}
        <button
          onClick={handleDismiss}
          className="block text-center text-text-muted text-xs mt-3 underline hover:text-text-secondary w-full"
        >
          No thanks, I&apos;ll figure it out myself
        </button>
      </div>
    </div>
  );
}

export default EmailCapturePopup;
