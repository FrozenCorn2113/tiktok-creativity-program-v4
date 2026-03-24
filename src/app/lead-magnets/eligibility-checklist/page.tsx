import Container from '@/components/ui/Container'
import type { Metadata } from 'next'
import { LeadMagnetGate } from '@/components/email/lead-magnet-gate'
import { PrintButton } from '@/components/PrintButton'

export const metadata: Metadata = {
  title: 'TikTok Creator Rewards Eligibility Checklist — Free Download',
  description:
    'Check every requirement before you apply to TikTok Creator Rewards. The 5 requirements, content red flags, and what to do if rejected.',
}

const eligibleCountries = [
  'United States',
  'United Kingdom',
  'Germany',
  'France',
  'Japan',
  'South Korea',
  'Brazil',
  'Mexico',
]

const redFlags = [
  {
    flag: 'Business account still active',
    fix: 'Switch to personal, wait 30 days',
  },
  {
    flag: 'Mostly Duets and Stitches',
    fix: "These don't qualify. Post 5-10 original 1+ minute videos first",
  },
  {
    flag: 'Videos under 60 seconds',
    fix: 'Only videos 1+ minute earn through Creator Rewards. Build a library of longer content',
  },
  {
    flag: 'Repurposed content with watermarks',
    fix: 'Remove watermarked content. Post originals',
  },
  {
    flag: 'Contact info in your bio',
    fix: 'Remove personal/business contact details before applying',
  },
  {
    flag: 'Clickbait content in recent library',
    fix: 'Clean up misleading titles and thumbnails',
  },
  {
    flag: 'Community Guidelines violations',
    fix: 'Address outstanding strikes. Appeal old ones if applicable',
  },
  {
    flag: 'Low-quality formats (slideshows, split screens)',
    fix: 'TikTok has flagged these as ineligible. Replace with original video content',
  },
]

export default function EligibilityChecklistPage() {
  return (
    <>
      <section className="bg-background-warm py-14 print:bg-white print:py-6">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-primary font-semibold text-sm uppercase tracking-widest mb-3 print:hidden">
              Free Checklist
            </p>
            <h1 className="text-[2rem] md:text-[2.75rem] font-extrabold text-brand-ink leading-[1.15] mb-4">
              Creator Rewards Eligibility Checklist
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Check every box before you apply. Miss one and you get rejected.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 print:py-4">
        <Container size="narrow">
          {/* Email gate */}
          <div className="print:hidden mb-12">
            <LeadMagnetGate
              leadMagnet="eligibility-checklist"
              title="Get instant access to this checklist"
              description="Enter your email to unlock the download link. You'll also get tips on maximizing your Creator Rewards earnings."
            />
          </div>

          {/* The 5 Requirements */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-ink mb-6">The 5 Requirements</h2>
            <div className="space-y-6">
              {/* Requirement 1 */}
              <div className="rounded-xl border border-border-default p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-primarySoft flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-brand-primaryDeep">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-brand-ink mb-1">Age: 18+ (19+ in South Korea)</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <input type="checkbox" className="w-4 h-4 accent-brand-primary rounded" id="req-age" />
                      <label htmlFor="req-age" className="text-sm text-text-secondary">I am at least 18 years old</label>
                    </div>
                    <p className="text-xs text-text-muted">
                      <strong>How to verify:</strong> TikTok uses the birthdate you entered when you created your account.
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirement 2 */}
              <div className="rounded-xl border border-border-default p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-primarySoft flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-brand-primaryDeep">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-brand-ink mb-1">Followers: 10,000 minimum</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <input type="checkbox" className="w-4 h-4 accent-brand-primary rounded" id="req-followers" />
                      <label htmlFor="req-followers" className="text-sm text-text-secondary">I have at least 10,000 followers right now</label>
                    </div>
                    <p className="text-xs text-text-muted">
                      <strong>How to verify:</strong> Profile page shows your follower count. TikTok checks at the moment you submit.
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      <strong>If under 10K:</strong>{' '}
                      <a href="/guides/get-10000-followers-tiktok-2026" className="text-brand-primaryDeep hover:underline">
                        See our growth guide
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirement 3 */}
              <div className="rounded-xl border border-border-default p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-primarySoft flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-brand-primaryDeep">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-brand-ink mb-1">Views: 100,000 in the last 30 days</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <input type="checkbox" className="w-4 h-4 accent-brand-primary rounded" id="req-views" />
                      <label htmlFor="req-views" className="text-sm text-text-secondary">I have 100,000+ video views in the rolling 30-day window</label>
                    </div>
                    <p className="text-xs text-text-muted">
                      <strong>How to verify:</strong> Go to Creator tools &gt; Analytics &gt; Content. Look at total views for the past 30 days.
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      <strong>Watch out:</strong> Views from TikTok Promote (paid boosts) do NOT count toward this threshold.
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirement 4 */}
              <div className="rounded-xl border border-border-default p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-primarySoft flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-brand-primaryDeep">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-brand-ink mb-1">Account Type: Personal account only</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <input type="checkbox" className="w-4 h-4 accent-brand-primary rounded" id="req-account" />
                      <label htmlFor="req-account" className="text-sm text-text-secondary">My account is set to Personal (not Business)</label>
                    </div>
                    <p className="text-xs text-text-muted">
                      <strong>How to verify:</strong> Go to Settings and Privacy &gt; Account &gt; Account type.
                    </p>
                    <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                      <p className="text-xs text-amber-800">
                        <strong>Most common &quot;silent&quot; rejection.</strong> Your followers and views can look perfect, but a Business account gets you auto-rejected without a clear error message. If switching, wait 30 days before applying.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirement 5 */}
              <div className="rounded-xl border border-border-default p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-primarySoft flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-brand-primaryDeep">5</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-brand-ink mb-1">Eligible Country</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <input type="checkbox" className="w-4 h-4 accent-brand-primary rounded" id="req-country" />
                      <label htmlFor="req-country" className="text-sm text-text-secondary">My account is registered in one of the 8 eligible countries</label>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {eligibleCountries.map((country) => (
                        <span
                          key={country}
                          className="inline-block bg-brand-primarySoft text-brand-primaryDeep text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Red Flags */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-ink mb-4">
              Before You Hit Submit: Content Check
            </h2>
            <p className="text-sm text-text-muted mb-6">
              Even if you pass all 5 requirements, TikTok reviews your recent content. These will get you rejected:
            </p>
            <div className="overflow-x-auto rounded-xl border border-border-default">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface border-b border-border-default">
                    <th className="text-left px-4 py-3 font-semibold text-brand-ink">Red Flag</th>
                    <th className="text-left px-4 py-3 font-semibold text-brand-ink">Fix It</th>
                  </tr>
                </thead>
                <tbody>
                  {redFlags.map((row) => (
                    <tr key={row.flag} className="border-b border-border-default last:border-0">
                      <td className="px-4 py-3 text-text-primary font-medium">{row.flag}</td>
                      <td className="px-4 py-3 text-text-secondary">{row.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Apply */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-brand-ink mb-4">How to Apply (Quick Steps)</h2>
            <ol className="space-y-3 text-sm text-text-secondary">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-primarySoft flex items-center justify-center flex-shrink-0 text-xs font-bold text-brand-primaryDeep">1</span>
                <span>Open TikTok &gt; Profile &gt; Menu &gt; Creator tools</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-primarySoft flex items-center justify-center flex-shrink-0 text-xs font-bold text-brand-primaryDeep">2</span>
                <span>Select Creator Rewards Program</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-primarySoft flex items-center justify-center flex-shrink-0 text-xs font-bold text-brand-primaryDeep">3</span>
                <span>Review the in-app eligibility checklist</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-primarySoft flex items-center justify-center flex-shrink-0 text-xs font-bold text-brand-primaryDeep">4</span>
                <span>Submit your application</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-primarySoft flex items-center justify-center flex-shrink-0 text-xs font-bold text-brand-primaryDeep">5</span>
                <span>Wait 1-3 business days</span>
              </li>
            </ol>
            <p className="mt-4 text-xs text-text-muted">
              After approval, only NEW videos earn. Older videos are permanently excluded. Post an original 1+ minute video on the day you&apos;re approved.
            </p>
          </div>

          {/* Got Rejected? */}
          <div className="mb-12 rounded-xl border border-border-default p-6 bg-surface">
            <h3 className="font-bold text-brand-ink mb-3">Got Rejected?</h3>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>
                <strong className="text-brand-ink">Video appeal:</strong> You have 80 days. Go to Creator Rewards dashboard, find the video, tap Appeal.
              </p>
              <p>
                <strong className="text-brand-ink">Account appeal:</strong> You have 30 days from the rejection notification. Tap Appeal inside the notification.
              </p>
              <p className="text-xs text-text-muted">
                Both types are reviewed in about 3 business days. If your rejection is for missing metrics, appealing won&apos;t help. Fix the issue and reapply.
              </p>
            </div>
          </div>

          {/* Related Links */}
          <div className="rounded-xl border border-border-default p-6 bg-surface print:hidden">
            <h3 className="font-bold text-brand-ink mb-3">Related guides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/guides/eligibility-requirements" className="text-brand-primaryDeep hover:underline">
                  Full eligibility guide
                </a>
              </li>
              <li>
                <a href="/guides/appeal-rejection" className="text-brand-primaryDeep hover:underline">
                  Appeal walkthrough
                </a>
              </li>
              <li>
                <a href="/guides/creativity-program-not-showing" className="text-brand-primaryDeep hover:underline">
                  Program not showing up?
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
