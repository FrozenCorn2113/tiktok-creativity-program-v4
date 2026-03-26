import Container from '@/components/ui/Container'
import type { Metadata } from 'next'
import { PrintButton } from '@/components/PrintButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TikTok RPM Cheat Sheet — Free Download',
  description:
    'RPM ranges for 18 TikTok niches, the 4 factors that set your rate, and tips to push RPM higher. Free instant access.',
}

const nicheData = [
  { niche: 'Finance / Investing', range: '$1.00 - $2.30', tier: 'Premium' },
  { niche: 'Business / Entrepreneurship', range: '$0.80 - $1.80', tier: 'Premium' },
  { niche: 'Tech / Software', range: '$0.60 - $1.50', tier: 'High' },
  { niche: 'Education / How-to', range: '$0.60 - $1.50', tier: 'High' },
  { niche: 'Real Estate', range: '$0.70 - $1.40', tier: 'High' },
  { niche: 'Career / Professional Dev', range: '$0.60 - $1.20', tier: 'High' },
  { niche: 'Health / Wellness', range: '$0.50 - $1.10', tier: 'Mid-High' },
  { niche: 'Fitness', range: '$0.50 - $1.00', tier: 'Mid-High' },
  { niche: 'Parenting / Family', range: '$0.45 - $0.90', tier: 'Mid' },
  { niche: 'Beauty / Fashion', range: '$0.45 - $0.80', tier: 'Mid' },
  { niche: 'Travel / Lifestyle', range: '$0.45 - $0.80', tier: 'Mid' },
  { niche: 'Food / Cooking', range: '$0.40 - $0.75', tier: 'Mid' },
  { niche: 'DIY / Crafts', range: '$0.40 - $0.70', tier: 'Mid' },
  { niche: 'General Entertainment', range: '$0.35 - $0.70', tier: 'Low-Mid' },
  { niche: 'Pets / Animals', range: '$0.30 - $0.60', tier: 'Low' },
  { niche: 'Comedy', range: '$0.25 - $0.60', tier: 'Low' },
  { niche: 'Gaming', range: '$0.20 - $0.55', tier: 'Low' },
  { niche: 'Dance / Music', range: '$0.15 - $0.40', tier: 'Low' },
]

const tierColors: Record<string, string> = {
  Premium: 'bg-amber-100 text-amber-800',
  High: 'bg-emerald-100 text-emerald-800',
  'Mid-High': 'bg-blue-100 text-blue-800',
  Mid: 'bg-slate-100 text-slate-700',
  'Low-Mid': 'bg-orange-100 text-orange-700',
  Low: 'bg-red-50 text-red-700',
}

export default function RpmCheatSheetPage() {
  return (
    <>
      <section className="bg-background-warm py-14 print:bg-white print:py-6">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-primary font-semibold text-sm uppercase tracking-widest mb-3 print:hidden">
              Free Cheat Sheet
            </p>
            <h1 className="text-[2rem] md:text-[2.75rem] font-extrabold text-brand-ink leading-[1.15] mb-4">
              TikTok RPM Cheat Sheet
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              What your niche actually pays per 1,000 qualified views. RPM ranges for 18 niches,
              the 4 factors TikTok uses to calculate your rate, and the quickest ways to push that
              number higher.
            </p>
            <Link
              href="/downloads/tcp-creator-rewards-playbook-2026.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 bg-brand-primary text-brand-ink font-bold rounded-full px-8 py-3.5 text-base hover:bg-brand-primaryHover transition-colors print:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              Download Free PDF
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 print:py-4">
        <Container size="narrow">
          {/* Welcome banner for email subscribers */}
          <div className="print:hidden mb-12">
            <div className="rounded-2xl bg-brand-primarySoft border border-brand-primary/20 p-6 text-center">
              <p className="font-bold text-brand-ink text-lg mb-1">
                Your cheat sheet is ready
              </p>
              <p className="text-text-secondary text-sm">
                All 18 niche RPM ranges are below. Save this page as a PDF using your browser&apos;s print function (Ctrl+P / Cmd+P).
              </p>
            </div>
          </div>

          {/* RPM Table */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-ink mb-4">
              RPM by Niche (2026 Ranges)
            </h2>
            <p className="text-sm text-text-muted mb-6">
              All figures are estimated from creator community data. TikTok does not publish
              official RPM rates.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border-default">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface border-b border-border-default">
                    <th className="text-left px-4 py-3 font-semibold text-brand-ink">Niche</th>
                    <th className="text-left px-4 py-3 font-semibold text-brand-ink">RPM Range</th>
                    <th className="text-left px-4 py-3 font-semibold text-brand-ink">Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {nicheData.map((row) => (
                    <tr key={row.niche} className="border-b border-border-default last:border-0">
                      <td className="px-4 py-3 text-text-primary font-medium">{row.niche}</td>
                      <td className="px-4 py-3 text-text-secondary font-mono text-xs">
                        {row.range}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${tierColors[row.tier] ?? 'bg-gray-100 text-gray-700'}`}
                        >
                          {row.tier}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted mt-3">
              The gap from top to bottom is roughly 15x. A finance creator at $2.00 RPM earns
              fifteen times more per view than a dance creator at $0.15.
            </p>
          </div>

          {/* 4 Factors */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-ink mb-6">
              The 4 Factors That Set Your RPM
            </h2>
            <div className="space-y-6">
              <div className="rounded-xl border border-border-default p-5">
                <h3 className="font-bold text-brand-ink mb-2">
                  1. Watch Time + Retention (heaviest weight)
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Videos where viewers stay past 60 seconds see meaningfully higher RPM. Completion
                  rates above 80% separate top earners from average. More watch time = more ad
                  inventory = higher payout.
                </p>
              </div>
              <div className="rounded-xl border border-border-default p-5">
                <h3 className="font-bold text-brand-ink mb-2">2. Originality</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Original audio, footage, and perspective score highest. Duets, Stitches, and
                  repurposed content with watermarks earn zero or near-zero RPM.
                </p>
              </div>
              <div className="rounded-xl border border-border-default p-5">
                <h3 className="font-bold text-brand-ink mb-2">3. Search Value</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Videos that answer specific search queries earn 2-5x the RPM of FYP-only content.
                  Search viewers have buying intent. Advertisers pay more to reach them.
                </p>
              </div>
              <div className="rounded-xl border border-border-default p-5">
                <h3 className="font-bold text-brand-ink mb-2">4. Engagement Quality</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Saves and shares count more than likes. Comments with real back-and-forth add to
                  the signal. Strong engagement in the first 48 hours can unlock the Additional
                  Reward bonus, which separates $1.00 RPM from $3.00+.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-ink mb-6">
              Quick Tips to Push Your RPM Higher
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Pick your battles.',
                  text: 'Your niche sets the ceiling. Tutorial and how-to framing outperforms opinion or reaction content by 2-3x in most niches.',
                },
                {
                  title: 'Target US/UK viewers.',
                  text: 'Creators with 80%+ US viewership consistently hit $1.00+ RPM. Audience geography matters more than your own location.',
                },
                {
                  title: 'Title for search, not for clever.',
                  text: '"How to pay less in taxes as a creator" outperforms "This changed everything" on search RPM.',
                },
                {
                  title: 'Post your best content in Q4.',
                  text: 'October through December delivers 30-50% higher RPMs across all niches. January drops 40-60%.',
                },
                {
                  title: 'Fix retention before anything else.',
                  text: 'Watch time affects both your qualified view rate AND your RPM simultaneously. It is the single highest-leverage improvement.',
                },
              ].map((tip) => (
                <div
                  key={tip.title}
                  className="bg-brand-primarySoft/50 rounded-lg px-5 py-4 border border-brand-primary/10"
                >
                  <p className="text-sm text-text-primary">
                    <strong className="text-brand-ink">{tip.title}</strong> {tip.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Links */}
          <div className="rounded-xl border border-border-default p-6 bg-surface print:hidden">
            <h3 className="font-bold text-brand-ink mb-3">Go deeper</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/calculators/earnings-calculator" className="text-brand-primaryDeep hover:underline">
                  Run your numbers with the Earnings Calculator
                </a>
              </li>
              <li>
                <a href="/guides/optimize-rpm" className="text-brand-primaryDeep hover:underline">
                  Full RPM optimization guide
                </a>
              </li>
              <li>
                <a href="/guides/tiktok-rpm-by-niche-2026" className="text-brand-primaryDeep hover:underline">
                  RPM by niche deep dive
                </a>
              </li>
            </ul>
          </div>

          {/* Print button */}
          <div className="mt-8 text-center print:hidden">
            <PrintButton />
          </div>
        </Container>
      </section>
    </>
  )
}
