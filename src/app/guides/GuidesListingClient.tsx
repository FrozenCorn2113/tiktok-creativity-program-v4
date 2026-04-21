// Guides listing — SSR-first for SEO.
// All guide cards render in initial server HTML so Googlebot can crawl every link.
// Client-side filter/pagination toggles CSS visibility only — never removes cards from DOM.

import Link from 'next/link'
import { Clock } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Button } from '@/components/ui/button'
import { EmailCapture } from '@/components/sections/email-capture'
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

export default function GuidesListingClient({ guides }: { guides: GuideItem[] }) {

  return (
    <>
      {/* Page header — warm background */}
      <section className="bg-background-warm py-16">
        <div className="max-w-container mx-auto px-6 text-center">
          <h1 className="text-[3rem] font-extrabold text-brand-ink leading-tight mb-4">
            TikTok Creator Rewards Guides
          </h1>
          <p className="text-[1.125rem] text-text-secondary max-w-2xl mx-auto leading-[1.7]">
            {guides.length} guides covering eligibility, earnings, troubleshooting, and strategy — updated for 2026.
          </p>

          {/* Category filter tabs — scrollable horizontal on mobile.
              Rendered SSR with default 'all'; GuidesFilterController hydrates interactivity. */}
          <div className="mt-8 overflow-x-auto pb-1" data-guides-tabs-container>
            <Tabs defaultValue="all">
              <TabsList className="flex gap-1 bg-background-surface rounded-full p-1 w-max mx-auto">
                {filterTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    data-guides-tab={tab.value}
                    className="rounded-full text-sm whitespace-nowrap data-[state=active]:bg-brand-primary data-[state=active]:text-brand-ink data-[state=inactive]:text-text-secondary"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Guide cards grid — ALL cards rendered server-side for SEO crawlability.
          Visibility (filter + load-more pagination) is toggled client-side via CSS
          classes on data-guide-card. Every <a href> is in the SSR HTML regardless. */}
      <section className="bg-white py-12">
        <div className="max-w-container mx-auto px-6">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-guides-grid
            data-page-size={PAGE_SIZE}
          >
            {guides.map((guide, index) => (
              <div
                key={guide.slug}
                data-guide-card
                data-category={guide.category}
                data-index={index}
                // First PAGE_SIZE cards visible by default (matches "All" initial view).
                // Cards beyond PAGE_SIZE are hidden via CSS until "Load more" or filter change.
                className={index >= PAGE_SIZE ? 'hidden' : ''}
              >
                <GuideCard guide={guide} />
              </div>
            ))}
            <div
              className="col-span-3 text-center py-16 text-text-muted hidden"
              data-guides-empty
            >
              No guides found in this category.
            </div>
          </div>

          {/* Load more — controller toggles visibility + increments visible count */}
          <div className="flex justify-center mt-10" data-guides-loadmore-wrap>
            <Button
              variant="outline"
              data-guides-loadmore
              className="min-h-[48px] px-8 font-semibold"
            >
              Load more guides
            </Button>
          </div>
        </div>
      </section>

      {/* Client-only filter/pagination controller — no-JS users see first 12 cards
          but every link is still in the SSR HTML for crawlers. */}
      <GuidesFilterController />

      {/* Email capture */}
      <EmailCapture
        headline="Get the Free Eligibility Checklist"
        subheadline="Every requirement in plain language, the most common rejection reasons, and what to do if your qualified views aren't counting. Updated for 2026."
        cta="Send Me the Checklist"
        showImage={false}
      />
    </>
  )
}

function GuideCard({ guide }: { guide: GuideItem }) {
  return (
    <Link
      href={guide.href}
      className="group flex flex-col border border-border-default rounded-xl overflow-hidden bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full"
    >
      {/* Thumbnail — dynamic slug path, onError hide if missing (client island) */}
      <div className="relative w-full h-48 bg-brand-primarySoft overflow-hidden">
        <GuideCardImage slug={guide.slug} title={guide.title} />
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-[1.125rem] font-bold text-brand-ink leading-snug line-clamp-2 mb-2">
          {guide.title}
        </h3>
        <p className="text-[15px] text-[#4B5563] leading-relaxed line-clamp-3 flex-1">
          {guide.excerpt}
        </p>
        <div className="flex items-center gap-1.5 mt-4 text-xs font-medium text-text-muted">
          <Clock className="h-3 w-3" aria-hidden />
          <span>{guide.readTime}</span>
        </div>
      </div>
    </Link>
  )
}
