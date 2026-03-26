// Guide article page — Phase 3 v3 rebuild + Phase 4 per-guide hero images
// PAGE_SPECS.md: breadcrumb, category badge, H1, description, meta, hero image, ToC LEFT + prose RIGHT
// checklist items 52-68

// Per-guide unique hero images (Phase 4 — 15 high-traffic guides)
// Falls back to category image for all other guides
const PER_GUIDE_SLUGS = new Set([
  'creator-rewards-2026',
  'qualified-views-not-counting',
  'optimize-rpm',
  'grow-5k-to-10k',
  'best-ring-lights',
  'no-qualified-views',
  'rpm-dropping',
  'creativity-program-not-showing',
  'tiktok-hook-formulas',
  'tiktok-viral-formula',
  'viral-psychology',
  'monetize-beauty',
  'monetize-fitness',
  'case-study-0-to-100k',
  'creator-rewards-uk',
])

// next-mdx-remote RSC (compileMDX) cannot be serialized during static generation;
// render on-demand at runtime to avoid prerender failures on Vercel
export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Clock, BookOpen, ChevronRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { compileGuide, getGuideBySlug, getTableOfContents, getAllGuides } from '@/lib/mdx'
import { siteConfig } from '@/lib/site'

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import TableOfContents from '@/components/TableOfContents'
import ReadingProgressBar from '@/components/ReadingProgressBar'
import { EmailCapture } from '@/components/sections/email-capture'
import { GuideCards } from '@/components/sections/guide-cards'
import type { GuideCardData } from '@/components/sections/guide-cards'
import GuideArticleClient from './GuideArticleClient'
import { AffiliateDisclosure } from '@/components/affiliate/affiliate-disclosure'
import { AffiliateCardInline } from '@/components/affiliate/affiliate-card-inline'
import { EmailCaptureInline } from '@/components/email/email-capture-inline'
import { EmailCapturePopup } from '@/components/email/email-capture-popup'
import { MobileStickyEmailBar } from '@/components/email/mobile-sticky-email-bar'

type GuidePageProps = {
  params: { slug: string }
}

// generateStaticParams removed: dynamic = 'force-dynamic' conflicts with static generation
// when compileMDX (RSC) is used. Pages render on-demand; sitemap.ts lists all guide URLs.

export async function generateMetadata({ params }: GuidePageProps) {
  const guide = getGuideBySlug(params.slug)
  if (!guide) return {}

  const { frontmatter } = guide
  return buildMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    path: `/guides/${frontmatter.slug}`,
    image: frontmatter.image,
  })
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = getGuideBySlug(params.slug)
  if (!guide) notFound()

  const { frontmatter, content } = guide
  const toc = getTableOfContents(content)
  const compiled = await compileGuide(content)

  // Category → hero/thumb image mapping
  // Keys are lowercase — lookup normalizes with .toLowerCase() to handle mixed-case frontmatter
  // Only 8 category-level images exist; map all guide categories to the nearest one
  const categoryImageMap: Record<string, string> = {
    'creator rewards': 'getting-started',
    eligibility: 'getting-started',
    'ultimate guide': 'niche-guides',
    'niche guide': 'niche-guides',
    niche: 'niche-guides',
    strategy: 'strategy',
    growth: 'strategy',
    'case study': 'strategy',
    seasonal: 'strategy',
    monetization: 'maximize-earnings',
    earnings: 'maximize-earnings',
    troubleshooting: 'troubleshooting',
    tools: 'tools-equipment',
    affiliate: 'tools-equipment',
    comparison: 'comparisons',
    international: 'country-guides',
    regional: 'country-guides',
    hub: 'getting-started',
    core: 'getting-started',
    payment: 'maximize-earnings',
  }
  const categoryKey = frontmatter.category ? (categoryImageMap[frontmatter.category.toLowerCase()] ?? 'getting-started') : 'getting-started'
  const perGuideHero = `/images/guides/hero-${frontmatter.slug}.webp`
  const heroImageSrc = PER_GUIDE_SLUGS.has(frontmatter.slug) ? perGuideHero : `/images/guides/hero-${categoryKey}.webp`
  const thumbImagePrefix = `/images/guides/thumb-`

  // Related guides — same category, exclude current
  const related = getAllGuides()
    .filter((g) => g.slug !== frontmatter.slug && g.category === frontmatter.category)
    .slice(0, 3)

  const relatedCards: GuideCardData[] = related.map((g) => ({
    slug: g.slug,
    title: g.title,
    excerpt: g.description ?? '',
    href: `/guides/${g.slug}`,
    category: g.category ?? 'Guide',
    readTime: g.readingTime ?? '8 min',
  }))

  const articleUrl = `${siteConfig.url}/guides/${frontmatter.slug}`

  // JSON-LD structured data — Article schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    url: articleUrl,
    image: `${siteConfig.url}${heroImageSrc}`,
    author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/brand/tcp-logo.png`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    keywords: frontmatter.keywords?.join(', '),
  }

  // BreadcrumbList schema
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: `${siteConfig.url}/guides` },
  ]
  if (frontmatter.category) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: frontmatter.category,
      item: `${siteConfig.url}/guides`,
    })
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 4,
      name: frontmatter.title,
      item: articleUrl,
    })
  } else {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: frontmatter.title,
      item: articleUrl,
    })
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Reading progress bar — client component */}
      <ReadingProgressBar />

      {/* Breadcrumb — checklist item 52 — pt-20 clears fixed floating nav */}
      <div className="max-w-container mx-auto px-6 pt-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-sm text-text-muted hover:text-text-primary">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-3 w-3" aria-hidden />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/guides" className="text-sm text-text-muted hover:text-text-primary">
                Guides
              </BreadcrumbLink>
            </BreadcrumbItem>
            {frontmatter.category && (
              <>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-3 w-3" aria-hidden />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <span className="text-sm text-text-muted">{frontmatter.category}</span>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator>
              <ChevronRight className="h-3 w-3" aria-hidden />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm text-text-primary font-medium line-clamp-1">
                {frontmatter.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Affiliate Disclosure — v4: conditional on hasAffiliateLinks frontmatter */}
      {Boolean((frontmatter as Record<string, unknown>).hasAffiliateLinks) && (
        <div className="max-w-container mx-auto px-6 mt-3">
          <AffiliateDisclosure />
        </div>
      )}

      {/* Article header — checklist items 53 */}
      <div className="max-w-container mx-auto px-6 pt-6 pb-8">
        {/* H1 — Manrope 800, 48px desktop / 32px mobile */}
        <h1 className="text-[2rem] md:text-[3rem] font-extrabold text-brand-ink leading-[1.15] mb-4">
          {frontmatter.title}
        </h1>

        {/* Description */}
        <p className="text-[1.125rem] text-text-secondary leading-[1.7] max-w-3xl mb-6">
          {frontmatter.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {frontmatter.readingTime ?? '8 min read'}
          </span>
          <span aria-hidden>|</span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" aria-hidden />
            Last updated {frontmatter.date}
          </span>
        </div>
      </div>

      {/* Hero image — checklist items 54-56 — uses category image, not per-guide slug */}
      <div className="max-w-container mx-auto px-6">
        <Image
          src={heroImageSrc}
          alt={`${frontmatter.title} — hero illustration`}
          width={1200}
          height={630}
          className="w-full rounded-2xl object-cover mb-12"
          priority
          loading="eager"
        />
      </div>

      {/* Article body + sidebar — checklist items 60-65 */}
      <section className="bg-white pb-24">
        <div className="max-w-container mx-auto px-6">
          {/* Mobile collapsible ToC */}
          {toc.length > 0 && (
            <div className="mb-8 lg:hidden">
              <TableOfContents items={toc} sidebar={false} />
            </div>
          )}

          {/* Two-column: ToC LEFT (sticky), article prose RIGHT */}
          {/* PAGE_SPECS: grid grid-cols-1 lg:grid-cols-[1fr_300px] — ToC is left sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            {/* LEFT: sticky sidebar ToC + mini email capture + related guides */}
            {toc.length > 0 && (
              <aside className="hidden lg:block">
                <TableOfContents items={toc} sidebar={true} />
              </aside>
            )}

            {/* RIGHT: article prose */}
            <article className="min-w-0">
              {/* Prose — checklist item 60 */}
              <div className="prose prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:text-brand-ink prose-p:text-text-secondary prose-p:leading-[1.75] prose-a:text-brand-primaryDeep prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-ink prose-code:font-mono prose-code:text-brand-primaryDeep prose-code:bg-brand-primarySoft prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm">
                {compiled.content}
              </div>

              {/* Inline email capture — shown on ALL guides, promotes RPM Cheat Sheet */}
              <EmailCaptureInline
                leadMagnetTitle="Get the Free RPM Cheat Sheet"
                leadMagnetDescription="RPM ranges for 18 TikTok niches, the 4 factors that set your rate, and quick tips to push your RPM higher. Free instant access."
              />

              {/* v4: Affiliate card inline — tools recommendation */}
              {Boolean((frontmatter as Record<string, unknown>).hasAffiliateLinks) && (
                <AffiliateCardInline
                  toolName="CapCut"
                  slug="capcut"
                  review="The editing tool most TikTok creators with high qualified view rates actually use. Fast, free, and built for vertical video. The auto-captions alone are worth it for boosting completion rates."
                  bestFor="Creators focused on qualified views"
                  priceRange="Free • Pro from $7.99/mo"
                  ctaText="Try CapCut Free"
                />
              )}

              {/* Article footer — "Was this helpful?" + email capture */}
              <div className="mt-16 pt-8 border-t border-border-default">
                <GuideArticleClient articleUrl={articleUrl} title={frontmatter.title} slug={frontmatter.slug} />
              </div>
            </article>
          </div>

          {/* Related guides — checklist item 66 */}
          {relatedCards.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border-default">
              <h3 className="text-[1.5rem] font-bold text-brand-ink mb-6">More guides you might need</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedCards.map((guide) => (
                  <a
                    key={guide.slug}
                    href={guide.href}
                    className="group flex flex-col border border-border-default rounded-xl overflow-hidden bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="relative w-full h-36 bg-brand-primarySoft overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${thumbImagePrefix}${categoryImageMap[guide.category] ?? 'getting-started'}.webp`}
                        alt={`Thumbnail for ${guide.title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <p className="text-sm font-bold text-brand-ink line-clamp-2 leading-snug">
                        {guide.title}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* End-of-article email capture — checklist per PAGE_SPECS article footer */}
      <EmailCapture
        headline="Want to Know When Something Changes?"
        subheadline="Every requirement in plain language, the most common rejection reasons, and what to do if your qualified views aren't counting. Updated for 2026."
        cta="Send Me the Checklist"
        showImage={false}
        compact={true}
      />

      {/* Exit-intent popup — desktop users, promotes RPM Cheat Sheet */}
      <EmailCapturePopup
        leadMagnetTitle="RPM Cheat Sheet"
        headline="Before you go — grab the free RPM Cheat Sheet"
        description="RPM ranges for 18 TikTok niches, the 4 factors that determine your rate, and quick tips to earn more per view."
      />

      {/* Mobile sticky bar — shows after 30s of reading */}
      <MobileStickyEmailBar />
    </>
  )
}
