// Mobile sticky bottom bar for email capture
// Shows after 30 seconds of reading on mobile devices
// Dismissible, once per session

"use client";

import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SESSION_KEY = "tcp_mobile_bar_dismissed";

export function MobileStickyEmailBar() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    // Only show on mobile-width screens
    if (typeof window === "undefined") return;

    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }

    const timer = setTimeout(() => {
      // Check viewport width at trigger time
      if (window.innerWidth < 1024) {
        setVisible(true);
      }
    }, 30000); // 30 seconds

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
        // Auto-dismiss after success
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
      <div className="bg-brand-ink border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4" aria-hidden />
        </button>

        {status === "success" ? (
          <div className="px-4 py-3 text-center">
            <p className="text-white font-semibold text-sm">
              You&apos;re in. Check your inbox.
            </p>
          </div>
        ) : !expanded ? (
          /* Collapsed state — single-line CTA */
          <div className="px-4 py-3 flex items-center gap-3">
            <Mail className="w-4 h-4 text-brand-primary flex-shrink-0" aria-hidden />
            <p className="text-white text-sm font-medium flex-1">
              Get free TikTok tips
            </p>
            <Button
              onClick={() => setExpanded(true)}
              className="bg-brand-primary text-brand-ink font-semibold rounded-full px-4 h-8 text-xs hover:bg-brand-primaryHover flex-shrink-0"
            >
              Subscribe
            </Button>
          </div>
        ) : (
          /* Expanded state — email form */
          <div className="px-4 py-3">
            <p className="text-white text-sm font-medium mb-2">
              Free TikTok monetization tips. No spam.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-9 rounded-full border-white/20 bg-white/10 text-white placeholder:text-gray-400 text-sm focus:border-brand-primary"
                aria-label="Email address"
              />
              <Button
                type="submit"
                disabled={status === "loading"}
                className="bg-brand-primary text-brand-ink font-semibold rounded-full px-4 h-9 text-xs hover:bg-brand-primaryHover flex-shrink-0"
              >
                {status === "loading" ? "..." : "Get It"}
              </Button>
            </form>
            {status === "error" && (
              <p className="text-red-400 text-[11px] mt-1">Something went wrong. Try again.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileStickyEmailBar;
