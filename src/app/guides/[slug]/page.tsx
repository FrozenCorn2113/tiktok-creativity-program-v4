// Guide article page — Phase 5 TCP redesign
// Reference: /tmp/tcp-zip/directions/guide-article.jsx
// MDX loader / content parsing / frontmatter / JSON-LD / generateMetadata are PRESERVED.
// Only chrome (hero, TOC shell, body container, callouts, related, share) is restyled.

// next-mdx-remote RSC (compileMDX) cannot be serialized during static generation;
// render on-demand at runtime to avoid prerender failures on Vercel
export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { compileGuide, getGuideBySlug, getTableOfContents, getAllGuides } from '@/lib/mdx'
import { siteConfig } from '@/lib/site'

import TableOfContents from '@/components/TableOfContents'
import ReadingProgressBar from '@/components/ReadingProgressBar'
import SocialShareButtons from '@/components/SocialShareButtons'
import { EmailCapture } from '@/components/sections/email-capture'
import type { GuideCardData } from '@/components/sections/guide-cards'
import GuideArticleClient from './GuideArticleClient'
import { AffiliateDisclosure } from '@/components/affiliate/affiliate-disclosure'
import { AffiliateCardInline } from '@/components/affiliate/affiliate-card-inline'
import { EmailCaptureInline } from '@/components/email/email-capture-inline'
import { EmailCapturePopup } from '@/components/email/email-capture-popup'
import { MobileStickyEmailBar } from '@/components/email/mobile-sticky-email-bar'
import { EyebrowLabel, ItalicWord, DataPill } from '@/components/tcp'

type GuidePageProps = {
  params: { slug: string }
}

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

// Splits a title into leading text + one "italic" word (the last meaningful word).
// Used for the H1 treatment — one Instrument-Serif italic accent word per heading.
function splitTitleForItalic(title: string): { lead: string; italic: string; trail: string } {
  const trimmed = title.trim().replace(/[.!?]$/, '')
  const punct = title.trim().slice(trimmed.length)
  const parts = trimmed.split(/\s+/)
  if (parts.length < 2) return { lead: trimmed, italic: '', trail: punct }
  const italic = parts[parts.length - 1]
  const lead = parts.slice(0, -1).join(' ')
  return { lead, italic, trail: punct }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = getGuideBySlug(params.slug)
  if (!guide) notFound()

  const { frontmatter, content } = guide
  const toc = getTableOfContents(content)
  const compiled = await compileGuide(content)

  // Every guide has its own hero image at /images/guides/hero-{slug}.webp
  const heroImageSrc = `/images/guides/hero-${frontmatter.slug}.webp`

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
  const titleSplit = splitTitleForItalic(frontmatter.title)

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
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Reading progress bar — recolored to orange via existing CSS var */}
      <ReadingProgressBar />

      {/* Breadcrumb — mono eyebrow */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-[72px]">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-soft"
        >
          <Link href="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <span className="mx-2 text-ink-soft/60" aria-hidden>
            ·
          </span>
          <Link href="/guides" className="hover:text-ink transition-colors">
            Guides
          </Link>
          {frontmatter.category ? (
            <>
              <span className="mx-2 text-ink-soft/60" aria-hidden>
                ·
              </span>
              <span className="text-ink-soft">{frontmatter.category}</span>
            </>
          ) : null}
          <span className="mx-2 text-ink-soft/60" aria-hidden>
            ·
          </span>
          <span className="text-ink">{frontmatter.title}</span>
        </nav>
      </div>

      {/* Affiliate Disclosure */}
      {Boolean((frontmatter as Record<string, unknown>).hasAffiliateLinks) && (
        <div className="max-w-[1400px] mx-auto px-6 md:px-[52px] mt-4">
          <AffiliateDisclosure />
        </div>
      )}

      {/* Article hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-8 pb-12">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          {frontmatter.category ? (
            <DataPill variant="soft">
              <EyebrowLabel className="!text-[11px]">{frontmatter.category}</EyebrowLabel>
            </DataPill>
          ) : null}
          <span className="text-[13px] text-ink-soft">
            {frontmatter.readingTime ?? '8 min read'}
            {frontmatter.date ? ` · updated ${frontmatter.date}` : ''}
          </span>
        </div>

        <h1 className="font-sans text-[40px] md:text-[60px] lg:text-[72px] leading-[1.0] tracking-[-0.04em] font-medium text-ink m-0 text-balance max-w-[1100px]">
          {titleSplit.italic ? (
            <>
              {titleSplit.lead}{' '}
              <ItalicWord color="#C2622A">{titleSplit.italic}</ItalicWord>
              {titleSplit.trail}
            </>
          ) : (
            frontmatter.title
          )}
        </h1>

        <p className="text-[18px] md:text-[19px] leading-[1.55] text-ink-soft mt-6 max-w-[680px]">
          {frontmatter.description}
        </p>
      </section>

      {/* Hero image */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-10">
        <Image
          src={heroImageSrc}
          alt={`${frontmatter.title} — hero illustration`}
          width={1200}
          height={630}
          className="w-full rounded-[24px] object-cover border border-line"
          priority
          loading="eager"
        />
      </div>

      {/* Article body + sticky TOC */}
      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-[52px]">
          {/* Mobile collapsible ToC */}
          {toc.length > 0 && (
            <div className="mb-8 lg:hidden">
              <TableOfContents items={toc} sidebar={false} />
            </div>
          )}

          {/* Two-column: sticky ToC LEFT, article prose RIGHT */}
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 lg:gap-16">
            {/* TOC sidebar — restyled shell; existing component handles scrollspy */}
            {toc.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <EyebrowLabel tone="inkSoft" className="block mb-4">
                    Contents
                  </EyebrowLabel>
                  <TableOfContents items={toc} sidebar={false} />
                </div>
              </aside>
            )}

            {/* Article prose */}
            <article className="min-w-0">
              <div className="prose prose-lg max-w-[720px] prose-headings:font-sans prose-headings:font-semibold prose-headings:tracking-[-0.02em] prose-headings:text-ink prose-h2:text-[30px] md:prose-h2:text-[32px] prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-[22px] prose-p:text-[18px] prose-p:leading-[1.7] prose-p:text-ink prose-a:text-brand-primaryDeep prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-code:font-mono prose-code:text-brand-primaryDeep prose-code:bg-soft prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.9em] prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-[22px] prose-blockquote:leading-[1.45] prose-blockquote:text-brand-primaryDeep prose-blockquote:border-l-[3px] prose-blockquote:border-brand-primary prose-blockquote:not-italic">
                {compiled.content}
              </div>

              {/* Social share — pill buttons */}
              <div className="mt-10 pt-6 border-t border-line">
                <div className="flex items-center gap-4 flex-wrap">
                  <EyebrowLabel tone="inkSoft">Share</EyebrowLabel>
                  <SocialShareButtons url={articleUrl} title={frontmatter.title} />
                </div>
              </div>

              {/* Inline email capture */}
              <EmailCaptureInline
                leadMagnetTitle="Get the Free RPM Cheat Sheet"
                leadMagnetDescription="RPM ranges for 18 TikTok niches, the 4 factors that set your rate, and quick tips to push your RPM higher. Free instant access."
              />

              {/* Affiliate card inline */}
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

              {/* "Was this helpful?" feedback */}
              <div className="mt-12 pt-8 border-t border-line">
                <GuideArticleClient
                  articleUrl={articleUrl}
                  title={frontmatter.title}
                  slug={frontmatter.slug}
                />
              </div>
            </article>
          </div>

          {/* Related guides */}
          {relatedCards.length > 0 && (
            <div className="mt-20 pt-10 border-t border-line">
              <EyebrowLabel tone="deep" className="block mb-3">
                Related guides
              </EyebrowLabel>
              <h3 className="font-sans text-[28px] md:text-[32px] leading-[1.1] tracking-[-0.02em] font-medium text-ink m-0 mb-8">
                More guides you might need.
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedCards.map((g) => (
                  <Link
                    key={g.slug}
                    href={g.href}
                    className="group flex flex-col bg-white rounded-[16px] border border-line overflow-hidden hover:-translate-y-[2px] hover:border-brand-primaryDeep transition-all duration-200 hover:shadow-[0_10px_28px_-18px_rgba(194,98,42,0.3)]"
                  >
                    <div className="relative w-full h-36 bg-soft overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/guides/hero-${g.slug}.webp`}
                        alt={`Thumbnail for ${g.title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 flex-1">
                      <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-brand-primaryDeep mb-2">
                        {g.category} · {g.readTime}
                      </div>
                      <p className="font-sans text-[15px] font-semibold text-ink line-clamp-2 leading-[1.35] m-0">
                        {g.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* End-of-article email capture */}
      <EmailCapture
        headline="Want to Know When Something Changes?"
        subheadline="Every requirement in plain language, the most common rejection reasons, and what to do if your qualified views aren't counting. Updated for 2026."
        cta="Send Me the Checklist"
        showImage={false}
        compact={true}
      />

      {/* Exit-intent popup */}
      <EmailCapturePopup
        leadMagnetTitle="RPM Cheat Sheet"
        headline="Before you go — grab the free RPM Cheat Sheet"
        description="RPM ranges for 18 TikTok niches, the 4 factors that determine your rate, and quick tips to earn more per view."
      />

      {/* Mobile sticky bar */}
      <MobileStickyEmailBar />
    </div>
  )
}
