// Version B — Dark editorial footer
// Same content as Footer.tsx, deeper dark treatment with orange accents

import Link from 'next/link'

const topGuides = [
  { label: 'Creator Rewards 2026', href: '/guides/creator-rewards-2026' },
  { label: 'Eligibility Requirements', href: '/guides/eligibility-requirements' },
  { label: 'How to Maximize Qualified Views', href: '/guides/maximize-qualified-views' },
  { label: 'How to Improve Your RPM', href: '/guides/optimize-rpm' },
  { label: 'What to Do If Rejected', href: '/guides/appeal-rejection' },
]

const calculatorLinks = [
  { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
  { label: 'RPM Calculator', href: '/calculators/rpm-by-country' },
  { label: 'Follower Income Calculator', href: '/calculators/follower-income-estimator' },
  { label: 'Start Here', href: '/start-here' },
]

const resourceLinks = [
  { label: 'Tools & Resources', href: '/tools' },
  { label: 'About', href: '/about' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact', href: '/contact' },
]

export default function FooterDark() {
  return (
    <footer className="bg-[#0d1117] text-white border-t border-white/8">
      <div className="max-w-container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="block">
              <span className="text-lg font-extrabold text-white tracking-tight" style={{ fontWeight: 800 }}>
                TikTok Creativity Program
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-xs">
              Real information about TikTok&apos;s Creator Rewards Program. No hype.
            </p>
          </div>

          {/* Column 2 — Top Guides */}
          <div>
            <h4 className="text-[11px] font-bold text-[#F97316] uppercase tracking-widest mb-4">
              Top Guides
            </h4>
            <ul className="space-y-2.5">
              {topGuides.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/guides" className="text-sm text-[#F97316] hover:text-[#EA6A0A] transition-colors font-medium">
                  Browse all guides &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Calculators */}
          <div>
            <h4 className="text-[11px] font-bold text-[#F97316] uppercase tracking-widest mb-4">
              Calculators
            </h4>
            <ul className="space-y-2.5">
              {calculatorLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Resources */}
          <div>
            <h4 className="text-[11px] font-bold text-[#F97316] uppercase tracking-widest mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} TikTok Creativity Program. Independent educational resource.
            </p>
            <p className="text-xs text-gray-600">
              Not affiliated with TikTok or ByteDance.
            </p>
          </div>
          <p className="text-xs text-gray-600 mt-3">
            Some links on this site are affiliate links. We may earn a commission at no cost to you.{' '}
            <Link href="/affiliate-disclosure" className="underline hover:text-gray-400 transition-colors">
              See our Affiliate Disclosure
            </Link>.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Find this helpful?{' '}
            <a
              href="https://ko-fi.com/tiktokcreativityprogram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F97316] hover:text-[#EA6A0A] transition-colors"
            >
              Support this site on Ko-fi
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
