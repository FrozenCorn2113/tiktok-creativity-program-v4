'use client'

// Guides listing — client for filter interactivity + Framer Motion AnimatePresence
// PAGE_SPECS.md Section 4: category tabs, 3-col card grid, Framer Motion enter/exit

import { useState } from 'react'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import { EmailCapture } from '@/components/sections/email-capture'

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
  { label: 'Troubleshooting', value: 'Troubleshooting' },
  { label: 'Country Guides', value: 'International' },
  { label: 'Tools & Equipment', value: 'Tools' },
  { label: 'Niche Guides', value: 'Niche Guide' },
  { label: 'Comparisons', value: 'Comparison' },
]

const PAGE_SIZE = 12

export default function GuidesListingClient({ guides }: { guides: GuideItem[] }) {
  const shouldReduceMotion = useReducedMotion()
  const [activeTab, setActiveTab] = useState('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered =
    activeTab === 'all'
      ? guides
      : guides.filter((g) => g.category === activeTab)

  const displayed = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <>
      {/* Page header — warm background */}
      <section className="bg-background-warm py-16">
        <div className="max-w-container mx-auto px-6 text-center">
          <h1 className="text-[3rem] font-extrabold text-brand-ink leading-tight mb-4">
            TikTok Creator Rewards Guides
          </h1>
          <p className="text-[1.125rem] text-text-secondary max-w-2xl mx-auto leading-[1.7]">
            64 guides covering eligibility, earnings, troubleshooting, and strategy — updated for 2026.
          </p>

          {/* Category filter tabs — scrollable horizontal on mobile */}
          <div className="mt-8 overflow-x-auto pb-1">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="flex gap-1 bg-background-surface rounded-full p-1 w-max mx-auto">
                {filterTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
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

      {/* Guide cards grid */}
      <section className="bg-white py-12">
        <div className="max-w-container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={shouldReduceMotion ? false : "hidden"}
              animate="show"
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              variants={shouldReduceMotion ? {} : staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayed.length > 0 ? (
                displayed.map((guide) => (
                  <motion.div
                    key={guide.slug}
                    variants={shouldReduceMotion ? {} : staggerItem}
                  >
                    <GuideCard guide={guide} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-16 text-text-muted">
                  No guides found in this category.
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <Button
                variant="outline"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="min-h-[48px] px-8 font-semibold"
              >
                Load more guides
              </Button>
            </div>
          )}
        </div>
      </section>

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
      {/* Thumbnail — dynamic slug path, onError hide if missing */}
      <div className="relative w-full h-48 bg-brand-primarySoft overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/guides/hero-${guide.slug}.webp`}
          alt={`Thumbnail for ${guide.title}`}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-5">
        {guide.category && (
          <Badge className="w-fit mb-3 bg-brand-primarySoft text-brand-primaryDeep border-brand-primary/30 text-xs font-semibold">
            {guide.category}
          </Badge>
        )}
        <h3 className="text-[1.125rem] font-bold text-brand-ink leading-snug line-clamp-2 mb-2">
          {guide.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 flex-1">
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
