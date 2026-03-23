// Version B — Dark email capture section
// Minimal, inline, dark bg with orange input accent

"use client";

import { useState } from "react";

export function DarkEmailCapture() {
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
    <section className="bg-[#0d1117] py-16 border-t border-white/8">
      <div className="max-w-container mx-auto px-6">
        <div className="max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#F97316]">
            Free Resource
          </span>
          <h2 className="mt-2 text-[1.75rem] font-bold text-white leading-tight" style={{ fontWeight: 700 }}>
            Get the Free Eligibility Checklist
          </h2>
          <p className="mt-3 text-[15px] text-gray-400 leading-relaxed max-w-xl">
            Every requirement in plain language, the most common rejection reasons, and what to do if your qualified views aren&apos;t counting. Updated for 2026.
          </p>

          {status === "success" ? (
            <div className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-[#F97316]">
              <span className="w-5 h-5 rounded-full bg-[#F97316]/20 flex items-center justify-center text-[10px]">✓</span>
              You&apos;re in. Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-11 rounded-lg border border-white/15 bg-white/5 px-4 text-[14px] text-white placeholder:text-gray-600 focus:outline-none focus:border-[#F97316] transition-colors"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-11 px-6 rounded-lg bg-[#F97316] text-[#0F172A] text-[14px] font-bold hover:bg-[#EA6A0A] transition-colors shrink-0 disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send Me the Checklist"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-2 text-[13px] text-red-400">Something went wrong. Please try again.</p>
          )}
          <p className="mt-2.5 text-[11px] text-gray-600">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}

export default DarkEmailCapture;
