// PAGE_SPECS.md: 404 — centered full-viewport, NO nav, NO footer, unDraw SVG, two exit buttons
// Strategy: fixed full-viewport overlay at z-[60] (above FloatingNavbar z-50) covers nav+footer
// This keeps the root layout intact while visually hiding nav and footer on this page.
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background-warm px-6">
      <div className="max-w-md w-full text-center">
        {/* unDraw page-not-found SVG — orange (#F97316), color-swapped, optimized */}
        <Image
          src="/images/illustrations/page-not-found.min.svg"
          alt="Page not found illustration"
          width={400}
          height={300}
          className="mx-auto mb-8 max-w-xs w-full"
          priority
        />

        <h1 className="text-[3rem] font-extrabold text-brand-ink leading-tight mb-4">
          Page Not Found
        </h1>

        <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-sm mx-auto">
          That page doesn&apos;t exist — which is frustrating, but at least you found us. The guide
          you&apos;re looking for might have moved, or the URL might have a typo. Try browsing the
          full guide library or heading back home.
        </p>

        {/* Two exit buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-brand-primary text-brand-ink font-bold px-6 py-3 min-h-[48px] hover:bg-brand-primaryHover transition-colors shadow-orange"
          >
            Go Home
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center justify-center rounded-xl border border-border-strong text-brand-ink font-semibold px-6 py-3 min-h-[48px] hover:border-brand-primary hover:bg-background-warm transition-colors"
          >
            Browse Guides
          </Link>
        </div>
      </div>
    </div>
  )
}
