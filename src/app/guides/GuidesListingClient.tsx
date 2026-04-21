// Guides listing — Phase 5 TCP redesign
// Reference: /tmp/tcp-zip/directions/all-guides.jsx
// All guide cards render in initial server HTML so Googlebot can crawl every link.
// Client-side filter/pagination toggles CSS visibility only — never removes cards from DOM.

import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Button } from '@/components/ui/button'
import { EmailCapture } from '@/components/sections/email-capture'
import { EyebrowLabel, ItalicWord, SectionMarker } from '@/components/tcp'
import GuidesFilterController from './GuidesFilterController'
import GuideCardImage from './GuideCardImage'

interface GuideItem {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  href: string
}

const filterTabs = [
  { label: 'All', value: 'all' },
  { label: 'Getting Started', value: 'Getting Started' },
  { label: 'Maximize Earnings', value: 'Maximize Earnings' },
  { label: 'Growth', value: 'Growth' },
  { label: 'Troubleshooting', value: 'Troubleshooting' },
  { label: 'Country Guides', value: 'International' },
  { label: 'Tools & Equipment', value: 'Tools' },
  { label: 'Niche Guides', value: 'Niche Guide' },
  { label: 'Comparisons', value: 'Comparison' },
  { label: 'Advanced', value: 'Advanced' },
]

const PAGE_SIZE = 12
const FEATURED_COUNT = 3

export default function GuidesListingClient({ guides }: { guides: GuideItem[] }) {
  // First three guides act as editor's picks (featured strip).
  const featured = guides.slice(0, FEATURED_COUNT)

  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-[72px] pb-10">
        <EyebrowLabel className="mb-4 block">
          {guides.length} guides · independent · free
        </EyebrowLabel>
        <h1 className="font-sans text-[44px] md:text-[72px] lg:text-[80px] leading-[0.98] tracking-[-0.04em] font-medium text-ink m-0 max-w-[1100px]">
          The complete Creator Rewards{' '}
          <ItalicWord color="#C2622A">library</ItalicWord>.
        </h1>
        <p className="text-[18px] text-ink-soft mt-5 max-w-[640px] leading-[1.55]">
          Every guide, organized by what you are actually trying to do. Start anywhere.
        </p>

        {/* Category filter tabs — scrollable horizontal on mobile. */}
        <div
          className="mt-10 overflow-x-auto pb-1"
          data-guides-tabs-container
        >
          <Tabs defaultValue="all">
            <TabsList className="flex gap-1.5 bg-transparent p-0 w-max">
              {filterTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  data-guides-tab={tab.value}
                  className="font-mono text-[12px] tracking-[0.04em] uppercase px-[14px] py-[9px] rounded-full border border-line bg-white text-ink-soft whitespace-nowrap data-[state=active]:bg-ink data-[state=active]:text-paper data-[state=active]:border-ink transition-colors"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Editor's picks — first 3 guides as featured row */}
      {featured.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-10">
          <SectionMarker numeral="i" heading="Editor's picks.">
            <p className="sr-only">Hand-picked guides to start with.</p>
          </SectionMarker>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((guide) => (
              <Link
                key={`featured-${guide.slug}`}
                href={guide.href}
                className="group flex flex-col bg-white rounded-[20px] border border-line overflow-hidden hover:-translate-y-[3px] hover:border-brand-primaryDeep transition-all duration-200 hover:shadow-[0_12px_32px_-18px_rgba(194,98,42,0.35)]"
              >
                <div className="relative w-full h-[200px] bg-soft overflow-hidden">
                  <GuideCardImage slug={guide.slug} title={guide.title} />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-brand-primaryDeep mb-3.5">
                    {guide.category || 'Guide'} · {guide.readTime}
                  </div>
                  <h3 className="font-sans text-[22px] md:text-[24px] leading-[1.15] tracking-[-0.02em] font-medium text-ink m-0">
                    {guide.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-ink-soft mt-3.5 mb-5 line-clamp-3">
                    {guide.excerpt}
                  </p>
                  <div className="mt-auto text-[13px] font-semibold text-ink">
                    Read the guide →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All guides grid — ALL cards rendered server-side for SEO. Visibility toggled via CSS. */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-12">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-guides-grid
          data-page-size={PAGE_SIZE}
        >
          {guides.map((guide, index) => (
            <div
              key={guide.slug}
              data-guide-card
              data-category={guide.category}
              data-index={index}
              className={index >= PAGE_SIZE ? 'hidden' : ''}
            >
              <GuideCard guide={guide} />
            </div>
          ))}
          <div
            className="col-span-3 text-center py-16 text-ink-soft hidden"
            data-guides-empty
          >
            No guides match. Try a different filter.
          </div>
        </div>

        {/* Load more */}
        <div className="flex justify-center mt-10" data-guides-loadmore-wrap>
          <Button
            variant="outline"
            data-guides-loadmore
            className="min-h-[48px] px-8 rounded-full border-line bg-white text-ink hover:bg-soft hover:border-brand-primaryDeep font-semibold"
          >
            Load more guides
          </Button>
        </div>
      </section>

      {/* Client-only filter/pagination controller */}
      <GuidesFilterController />

      {/* Email capture */}
      <EmailCapture
        headline="Get the Free Eligibility Checklist"
        subheadline="Every requirement in plain language, the most common rejection reasons, and what to do if your qualified views aren't counting. Updated for 2026."
        cta="Send Me the Checklist"
        showImage={false}
      />
    </div>
  )
}

function GuideCard({ guide }: { guide: GuideItem }) {
  return (
    <Link
      href={guide.href}
      className="group flex flex-col bg-white rounded-[16px] border border-line overflow-hidden hover:-translate-y-[2px] hover:border-brand-primaryDeep transition-all duration-200 hover:shadow-[0_10px_28px_-18px_rgba(194,98,42,0.3)] h-full"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-44 bg-soft overflow-hidden">
        <GuideCardImage slug={guide.slug} title={guide.title} />
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between mb-3 gap-3">
          <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-brand-primaryDeep truncate">
            {guide.category || 'Guide'}
          </span>
          <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-soft whitespace-nowrap">
            {guide.readTime}
          </span>
        </div>
        <h3 className="font-sans text-[17px] leading-[1.25] tracking-[-0.01em] font-semibold text-ink line-clamp-2 m-0">
          {guide.title}
        </h3>
        <p className="text-[13px] leading-[1.55] text-ink-soft mt-2.5 line-clamp-3 flex-1">
          {guide.excerpt}
        </p>
      </div>
    </Link>
  )
}
