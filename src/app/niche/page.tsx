// Niches index page — links to all niche pages and features ultimate guides as cornerstone content
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { buildMetadata } from '@/lib/seo'
import { EmailCapture } from '@/components/sections/email-capture'

export const metadata: Metadata = buildMetadata({
  title: 'TikTok Monetization by Niche — Creator Type Guides',
  description:
    'Monetization strategies tailored to your content type. Whether you create music, fitness, comedy, travel, beauty, or education content — here is how to earn more on TikTok.',
  path: '/niche',
})

const niches = [
  {
    slug: 'musicians',
    label: 'Musicians',
    description: 'Promote music, drive streams, stack income beyond Creator Rewards.',
    guideSlug: 'ultimate-music-guide',
    guideLabel: 'Ultimate TikTok Monetization Guide for Musicians',
    focus: ['Music promotion links', 'Sync licensing', 'Live gifts + tips', 'Brand deals'],
    emoji: '🎵',
  },
  {
    slug: 'fitness-creators',
    label: 'Fitness Creators',
    description: 'Earn from workout content, programs, and affiliate tools built for creators.',
    guideSlug: 'ultimate-fitness-guide',
    guideLabel: 'Ultimate TikTok Monetization Guide for Fitness Creators',
    focus: ['Workout plans', 'Affiliate supplements', 'Program upsells', 'Live sessions'],
    emoji: '💪',
  },
  {
    slug: 'artists',
    label: 'Artists',
    description: 'Showcase process content, sell prints, turn engagement into income.',
    guideSlug: 'ultimate-artists-guide',
    guideLabel: 'Ultimate TikTok Monetization Guide for Artists',
    focus: ['Print sales', 'Commissions', 'Process content', 'Behind-the-scenes'],
    emoji: '🎨',
  },
  {
    slug: 'teachers',
    label: 'Teachers & Educators',
    description: 'Build authority, sell lesson resources, keep your account compliant.',
    guideSlug: 'ultimate-educators-guide',
    guideLabel: 'Ultimate TikTok Monetization Guide for Educators',
    focus: ['Course funnels', 'Affiliate tools', 'Community memberships', 'Lead magnets'],
    emoji: '📚',
  },
  {
    slug: 'beauty',
    label: 'Beauty Creators',
    description: 'Monetize tutorials, reviews, and affiliate deals in the beauty space.',
    guideSlug: 'ultimate-beauty-guide',
    guideLabel: 'Ultimate TikTok Monetization Guide for Beauty Creators',
    focus: ['Affiliate reviews', 'Creator Rewards', 'Brand partnerships', 'Product launches'],
    emoji: '✨',
  },
  {
    slug: 'comedy',
    label: 'Comedians',
    description: 'Monetize skits, series, and superfans — comedy is high-RPM if done right.',
    guideSlug: 'ultimate-comedy-guide',
    guideLabel: 'Ultimate TikTok Monetization Guide for Comedians',
    focus: ['Skits and series', 'Creator Rewards', 'Superfan monetization', 'Brand comedy deals'],
    emoji: '😂',
  },
  {
    slug: 'coaches',
    label: 'Coaches & Consultants',
    description: 'Turn authority content into clients, courses, and recurring revenue.',
    guideSlug: 'ultimate-coaches-guide',
    guideLabel: 'Ultimate TikTok Monetization Guide for Coaches and Consultants',
    focus: ['High-ticket offers', 'Content-to-client funnel', 'Creator Rewards', 'Email list building'],
    emoji: '🎯',
  },
  {
    slug: 'travel',
    label: 'Travel Creators',
    description: 'Earn from travel content with partnerships, affiliates, and Creator Rewards.',
    guideSlug: 'ultimate-travel-guide',
    guideLabel: 'Ultimate TikTok Monetization Guide for Travel Creators',
    focus: ['Travel partnerships', 'Affiliate hotels + gear', 'Creator Rewards', 'Brand campaigns'],
    emoji: '✈️',
  },
]

// These niche slugs have a dedicated /niche/[slug] page
const nichePageSlugs = new Set(['musicians', 'teachers', 'fitness-creators', 'artists'])

export default function NichesIndexPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-background-warm pt-24 pb-16">
        <div className="max-w-container mx-auto px-6">
          <Badge className="mb-4 bg-brand-primarySoft text-brand-primaryDeep border-brand-primary/30 text-xs font-semibold">
            By Creator Type
          </Badge>
          <h1 className="text-[2.25rem] md:text-[3rem] font-extrabold text-brand-ink leading-tight mb-4">
            Monetization guides for your niche
          </h1>
          <p className="text-[1.125rem] text-text-secondary leading-[1.7] max-w-2xl">
            Generic TikTok advice ignores what actually matters for your content type. These guides are written for specific creator categories — with revenue breakdowns, tool picks, and strategy that fits how you already create.
          </p>
        </div>
      </section>

      {/* Niche cards grid */}
      <section className="bg-white py-16">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {niches.map((niche) => {
              const href = nichePageSlugs.has(niche.slug)
                ? `/niche/${niche.slug}`
                : `/guides/${niche.guideSlug}`
              return (
                <Link
                  key={niche.slug}
                  href={href}
                  className="group flex flex-col border border-border-default rounded-xl p-6 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl" aria-hidden>{niche.emoji}</span>
                    <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-brand-primary transition-colors mt-1" />
                  </div>
                  <h2 className="text-lg font-bold text-brand-ink mb-2 group-hover:text-brand-primaryDeep transition-colors">
                    {niche.label}
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
                    {niche.description}
                  </p>
                  <ul className="space-y-1 mb-4">
                    {niche.focus.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-text-muted">
                        <span className="h-1 w-1 rounded-full bg-brand-primary flex-shrink-0" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-primaryDeep mt-auto pt-2 border-t border-border-default">
                    <BookOpen className="w-3.5 h-3.5" aria-hidden />
                    Read the full guide
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ultimate guides featured section */}
      <section className="bg-background-warm py-16">
        <div className="max-w-container mx-auto px-6">
          <h2 className="text-[1.75rem] font-bold text-brand-ink mb-2">
            Ultimate guides — by niche
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl">
            Each ultimate guide covers the full picture for that creator type: Creator Rewards strategy, additional income streams, tools, and a month-one action plan.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {niches.map((niche) => (
              <Link
                key={niche.guideSlug}
                href={`/guides/${niche.guideSlug}`}
                className="flex items-center gap-4 border border-border-default rounded-xl p-4 bg-white hover:shadow-sm hover:border-brand-primary/40 transition-all duration-200 group"
              >
                <span className="text-2xl flex-shrink-0" aria-hidden>{niche.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-brand-ink line-clamp-1 group-hover:text-brand-primaryDeep transition-colors">
                    {niche.guideLabel}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">Ultimate Guide</p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-brand-primary flex-shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EmailCapture
        headline="Get the niche-specific Creator Rewards breakdown"
        subheadline="RPM ranges, best content formats, and monetization paths — by creator type. Free."
        cta="Send It to Me"
        showImage={false}
      />
    </>
  )
}
