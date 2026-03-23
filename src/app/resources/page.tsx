import Container from '@/components/ui/Container'
import PageHeader from '@/components/PageHeader'
import AffiliateLink from '@/components/AffiliateLink'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creator Resources — Tools Worth Knowing',
  description:
    'A curated list of the apps, platforms, and services that make the Creator Rewards workflow easier — honestly assessed, not just listed.',
}

export default function ResourcesPage() {
  return (
    <>
      <ScrollReveal />

      {/* Header */}
      <section className="bg-[var(--color-surface-warm)] py-14">
        <Container>
          <div className="reveal" data-reveal>
            <PageHeader
              breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: 'Resources', href: '/resources' },
              ]}
              title="Tools worth knowing for TikTok creators"
              description="A curated list of the apps, platforms, and services that make the Creator Rewards workflow easier — honestly assessed, not just listed."
            />
          </div>
        </Container>
      </section>

      {/* Resource categories */}
      <section className="bg-white py-14">
        <Container>
          <div className="mx-auto max-w-2xl space-y-12">

            {/* Affiliate disclosure at top */}
            <p className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-[0.75rem] text-[var(--color-text-subtle)]">
              Some links on this page are affiliate links. If you purchase through them, this site
              earns a commission at no extra cost to you. Every tool listed here is included because
              it&apos;s relevant to TikTok creators — not because of the commission.
            </p>

            {/* Category 1: Video Editing */}
            <div className="reveal space-y-4" data-reveal>
              <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink-strong)]">
                Video Editing
              </h2>
              <p className="text-[var(--text-small)] text-[var(--color-text-muted)]">
                These are the apps most TikTok creators use to film, cut, and export their content.
                See the{' '}
                <Link href="/guides/best-video-editing-apps-tiktok" className="text-[var(--color-primary)] hover:underline font-semibold">
                  full video editing roundup
                </Link>{' '}
                for a detailed comparison.
              </p>
              <div className="space-y-4">
                <ResourceItem
                  name="CapCut"
                  description="TikTok's own editing app. Free, no watermark on exports, and built around vertical video. The default recommendation for creators who edit on mobile. No affiliate link."
                />
                <ResourceItem
                  name="Filmora"
                  description="A desktop and mobile editor with a simpler learning curve than Premiere. Good template library, reasonable pricing. Better for creators who've outgrown mobile-only editing."
                  affiliateSlug="filmora"
                  affiliateLabel="Filmora — view plans and pricing"
                />
                <ResourceItem
                  name="DaVinci Resolve"
                  description="Professional video editing software with a free tier. Best color grading tools available at zero cost. Steep learning curve — worth it for creators who want professional-grade output."
                  externalHref="https://www.blackmagicdesign.com/products/davinciresolve"
                  externalLabel="Download free at Blackmagic Design"
                />
                <ResourceItem
                  name="Adobe Creative Cloud"
                  description="The industry standard for video editing (Premiere Pro), graphic design (Photoshop, Illustrator), and more. Relevant for creators who need cross-platform professional tools. Higher cost than alternatives."
                  affiliateSlug="adobe-cc"
                  affiliateLabel="Adobe Creative Cloud — view plans"
                />
              </div>
            </div>

            {/* Category 2: Music and Audio */}
            <div className="reveal space-y-4" data-reveal>
              <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink-strong)]">
                Music and Audio
              </h2>
              <p className="text-[var(--text-small)] text-[var(--color-text-muted)]">
                Copyright-safe music is a real consideration for Creator Rewards creators — content
                using copyrighted audio can be muted or removed, which eliminates qualified views
                from that video.
              </p>
              <div className="space-y-4">
                <ResourceItem
                  name="TikTok Commercial Music Library"
                  description="Free. Built into TikTok. Limited catalog but zero licensing risk. The starting point for creators who don't want to pay for music. No affiliate link."
                />
                <ResourceItem
                  name="Epidemic Sound"
                  description="Large catalog of licensed music for TikTok, YouTube, Instagram, and other platforms. Clear licensing — no copyright strike risk. Monthly subscription. Well-regarded in creator communities for catalog depth and sound quality."
                  affiliateSlug="epidemic-sound"
                  affiliateLabel="Epidemic Sound — free trial available"
                />
                <ResourceItem
                  name="Artlist"
                  description="Similar to Epidemic Sound. Slightly more film/cinematic focus in the catalog. Annual subscription model."
                  affiliateSlug="artlist"
                  affiliateLabel="Artlist — view plans"
                />
              </div>
            </div>

            {/* Category 3: Analytics */}
            <div className="reveal space-y-4" data-reveal>
              <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink-strong)]">
                Analytics
              </h2>
              <div className="space-y-4">
                <ResourceItem
                  name="TikTok Creator Studio (native)"
                  description="Free. Built into TikTok. Shows qualified view data, RPM, follower growth, and content performance. The right starting point — don't pay for third-party analytics before you've used the native tools consistently. No affiliate link."
                  externalHref="https://studio.tiktok.com"
                  externalLabel="Access TikTok Creator Studio"
                />
                <ResourceItem
                  name="Later"
                  description="Scheduling tool with solid TikTok analytics. Best for creators who want scheduling and analytics in one platform, especially when managing multiple platforms alongside TikTok."
                  affiliateSlug="later"
                  affiliateLabel="Later — view analytics and scheduling plans"
                />
                <ResourceItem
                  name="Exolyt"
                  description="TikTok-specific analytics with competitor tracking and hashtag analytics. More depth than native analytics for creators doing competitive research."
                  externalHref="https://exolyt.com"
                  externalLabel="View Exolyt"
                />
              </div>
            </div>

            {/* Category 4: Scheduling */}
            <div className="reveal space-y-4" data-reveal>
              <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink-strong)]">
                Scheduling
              </h2>
              <div className="space-y-4">
                <ResourceItem
                  name="TikTok Studio (native scheduler)"
                  description="Free. Available on desktop at studio.tiktok.com. Basic scheduling up to 10 days in advance. Good enough for most solo creators. No affiliate link."
                />
                <ResourceItem
                  name="Later"
                  description="Multi-platform scheduling with a visual calendar. Best for creators managing TikTok alongside Instagram, Pinterest, or other platforms."
                  affiliateSlug="later"
                  affiliateLabel="Later — view plans and pricing"
                />
                <ResourceItem
                  name="Buffer"
                  description="Simple, lower-cost scheduling tool. Good TikTok support. Better priced than Later for creators who don't need multi-platform analytics depth."
                  affiliateSlug="buffer"
                  affiliateLabel="Buffer — view plans"
                />
              </div>
            </div>

            {/* Category 5: Design */}
            <div className="reveal space-y-4" data-reveal>
              <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink-strong)]">
                Design and Graphics
              </h2>
              <div className="space-y-4">
                <ResourceItem
                  name="Canva"
                  description="The go-to tool for TikTok thumbnails, profile graphics, presentation overlays, and template-based design. Free tier is genuinely capable. Pro tier adds more templates and brand kit features."
                  affiliateSlug="canva"
                  affiliateLabel="Canva Pro — view plans"
                />
              </div>
            </div>

            {/* Category 6: Equipment */}
            <div className="reveal space-y-4" data-reveal>
              <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-ink-strong)]">
                Equipment
              </h2>
              <p className="text-[var(--text-small)] text-[var(--color-text-muted)]">
                Recommended gear for creators setting up or upgrading their filming setup. All links
                are Amazon Associates.
              </p>
              <div className="space-y-4">
                <ResourceItem
                  name="Lighting"
                  description="A ring light or key light is one of the highest-impact upgrades for video quality. Consistent, well-diffused light improves completion rate more than most editing tricks."
                  affiliateSlug="amazon-ring-light"
                  affiliateLabel="Ring lights on Amazon"
                />
                <ResourceItem
                  name="Microphones"
                  description="Audio quality affects viewer retention. A lapel mic for mobile filming or a USB condenser mic for desk setups covers most use cases under $100."
                  affiliateSlug="amazon-mic"
                  affiliateLabel="Microphones under $100 on Amazon"
                  guideHref="/guides/best-microphones-under-100"
                  guideLabel="Top Microphones for TikTok Videos Under $100"
                />
              </div>
            </div>

            {/* Footer affiliate disclosure */}
            <p className="border-t border-[var(--color-border)] pt-6 text-[0.75rem] text-[var(--color-text-subtle)]">
              Some links on this page are affiliate links. If you purchase through them, this site
              earns a commission at no extra cost to you. Every tool listed here is included because
              it&apos;s relevant to TikTok creators — not because of the commission.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}

// Internal helper component
function ResourceItem({
  name,
  description,
  affiliateSlug,
  affiliateLabel,
  externalHref,
  externalLabel,
  guideHref,
  guideLabel,
}: {
  name: string
  description: string
  affiliateSlug?: string
  affiliateLabel?: string
  externalHref?: string
  externalLabel?: string
  guideHref?: string
  guideLabel?: string
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-4">
      <h3 className="text-[var(--text-h3)] font-semibold text-[var(--color-ink-strong)]">{name}</h3>
      <p className="mt-1.5 text-[var(--text-small)] leading-[1.65] text-[var(--color-text-muted)]">
        {description}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {affiliateSlug && affiliateLabel ? (
          <span className="flex flex-col gap-0.5">
            <span className="text-[12px] font-[500] text-[#667085]">Affiliate</span>
            <AffiliateLink slug={affiliateSlug} label={affiliateLabel} />
          </span>
        ) : null}
        {externalHref && externalLabel ? (
          <a
            href={externalHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            {externalLabel} &rarr;
          </a>
        ) : null}
        {guideHref && guideLabel ? (
          <Link
            href={guideHref}
            className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            {guideLabel} &rarr;
          </Link>
        ) : null}
      </div>
    </div>
  )
}
