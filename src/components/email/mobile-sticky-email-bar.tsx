// Mobile sticky bottom bar for email capture — warm editorial
// Shows after 30 seconds of reading on mobile devices, dismissible once per session

"use client";

import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";

const SESSION_KEY = "tcp_mobile_bar_dismissed";

export function MobileStickyEmailBar() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }

    const timer = setTimeout(() => {
      if (window.innerWidth < 1024) {
        setVisible(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage may be unavailable
    }
  };

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
          source: "mobile-sticky",
          lead_magnet: "Creator Rewards Checklist",
          page_url: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(handleDismiss, 2500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] lg:hidden">
      <div className="bg-ink border-t border-white/10 shadow-[0_-8px_32px_rgba(15,14,12,0.4)]">
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="absolute top-2 right-2 text-paper/60 hover:text-paper transition-colors p-1"
        >
          <X className="w-4 h-4" aria-hidden />
        </button>

        {status === "success" ? (
          <div className="px-4 py-3 text-center">
            <p className="text-paper font-semibold text-sm">
              You&apos;re in. Check your inbox.
            </p>
          </div>
        ) : !expanded ? (
          /* Collapsed */
          <div className="px-4 py-3 flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#F4A261] flex-shrink-0" aria-hidden />
            <p className="text-paper text-[13px] font-medium flex-1 m-0">
              Get free TikTok tips
            </p>
            <button
              onClick={() => setExpanded(true)}
              className="bg-[#F4A261] text-ink font-semibold rounded-full px-4 h-8 text-[12px] hover:bg-[#E8894A] transition-colors flex-shrink-0"
            >
              Subscribe
            </button>
          </div>
        ) : (
          /* Expanded */
          <div className="px-4 py-3">
            <p className="text-paper text-[13px] font-medium mb-2 m-0">
              Free TikTok monetization tips. No spam.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
                className="flex-1 h-9 rounded-full px-4 border border-white/20 bg-white/10 text-paper placeholder:text-paper/50 text-[13px] focus:outline-none focus:border-[#F4A261] transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#F4A261] text-ink font-semibold rounded-full px-4 h-9 text-[12px] hover:bg-[#E8894A] transition-colors flex-shrink-0 disabled:opacity-60"
              >
                {status === "loading" ? "..." : "Get it"}
              </button>
            </form>
            {status === "error" && (
              <p className="text-[#F4A261] text-[11px] mt-1">Something went wrong. Try again.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileStickyEmailBar;
