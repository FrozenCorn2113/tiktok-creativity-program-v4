// TCP warm-editorial footer — matches TCPFooter in tcp-chrome.jsx
// 2fr 1fr 1fr 1fr grid on desktop, paper bg with ink text, line top border.
// Link columns preserve the existing structure from the legacy footer.

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

type LinkItem = { label: string; href: string }

function LinkColumn({ heading, links }: { heading: string; links: LinkItem[] }) {
  return (
    <div>
      <div className="mb-3 text-[12px] font-semibold text-ink">{heading}</div>
      <ul className="flex flex-col">
        {links.map((link) => (
          <li key={link.href} className="py-[5px]">
            <Link
              href={link.href}
              className="text-[13px] text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function FooterDark() {
  return (
    <footer className="border-t border-line bg-paper">
      <div
        className="mx-auto grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]"
        style={{ maxWidth: 1400, padding: '52px 52px 44px' }}
      >
        {/* Brand block */}
        <div>
          <div className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 items-center justify-center bg-brand-primary"
              style={{ borderRadius: 16 }}
              aria-hidden
            >
              <span
                className="font-serif italic text-ink lowercase"
                style={{ fontSize: 20, lineHeight: 1 }}
              >
                t
              </span>
            </span>
            <span
              className="text-[15px] font-semibold text-ink"
              style={{ letterSpacing: '-0.01em' }}
            >
              Creator Rewards Handbook
            </span>
          </div>
          <p
            className="mt-[14px] text-[13px] text-ink-soft"
            style={{ maxWidth: 280, lineHeight: 1.6 }}
          >
            Independent guides, calculators, and benchmarks for serious short-form creators.
          </p>
        </div>

        <LinkColumn heading="Guides" links={topGuides} />
        <LinkColumn heading="Calculators" links={calculatorLinks} />
        <LinkColumn heading="Resources" links={resourceLinks} />
      </div>

      {/* Bottom legal strip — preserved from existing footer */}
      <div
        className="mx-auto border-t border-line"
        style={{ maxWidth: 1400, padding: '20px 52px 28px' }}
      >
        <div className="flex flex-col gap-2 text-[12px] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} TikTok Creativity Program. Independent educational resource.
          </p>
          <p>Not affiliated with TikTok or ByteDance.</p>
        </div>
        <p className="mt-2 text-[12px] text-ink-soft">
          Some links on this site are affiliate links. We may earn a commission at no cost to you.{' '}
          <Link href="/affiliate-disclosure" className="underline hover:text-ink transition-colors">
            See our Affiliate Disclosure
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
