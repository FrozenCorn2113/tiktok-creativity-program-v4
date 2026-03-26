"use client";

import { useState } from "react";
import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LeadMagnetGateProps {
  leadMagnet: string;
  title: string;
  description: string;
}

/**
 * Email gate for lead magnet pages. User enters email to "unlock" the content.
 * In practice, the content is visible on the page (for SEO), but this prominent
 * CTA captures the email and delivers the welcome sequence.
 */
export function LeadMagnetGate({ leadMagnet, title, description }: LeadMagnetGateProps) {
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
          source: "lead-magnet-page",
          lead_magnet: leadMagnet,
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
      <div className="rounded-2xl bg-brand-primarySoft border border-brand-primary/20 p-8 text-center">
        <Download className="w-8 h-8 text-brand-primary mx-auto mb-3" aria-hidden />
        <p className="font-bold text-brand-ink text-lg mb-1">
          You&apos;re in! Check your inbox.
        </p>
        <p className="text-text-secondary text-sm">
          We sent your download link. You can also print or save this page as PDF using your
          browser&apos;s print function (Ctrl+P / Cmd+P).
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-brand-primarySoft border border-brand-primary/20 p-8">
      <div className="flex items-start gap-3 mb-4">
        <Mail className="w-6 h-6 text-brand-primary flex-shrink-0 mt-0.5" aria-hidden />
        <div>
          <h3 className="font-bold text-brand-ink text-lg">{title}</h3>
          <p className="text-text-secondary text-sm mt-1">{description}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 h-11 rounded-full border-border-strong focus:border-brand-primary text-sm"
          aria-label="Email address"
        />
        <Button
          type="submit"
          disabled={status === "loading"}
          className="bg-brand-primary text-brand-ink font-bold rounded-full px-6 h-11 hover:bg-brand-primaryHover whitespace-nowrap"
        >
          {status === "loading" ? "Sending..." : "Get Free Access"}
        </Button>
      </form>
      {status === "error" && (
        <p className="text-[11px] text-red-600 mt-2">Something went wrong. Please try again.</p>
      )}
      <p className="text-text-muted text-[11px] mt-2">No spam. Unsubscribe anytime.</p>
    </div>
  );
}

export default LeadMagnetGate;
