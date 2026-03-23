// TCP Variant B4 — Refined Homepage
// Flow: Calculator Hero → Three-Path → 3-4 Featured Guides → Calculator Preview → Email Capture → Social Proof

'use client'

import { DarkHeroCalculator } from '@/components/sections/dark-hero-calculator'
import { ThreePath } from '@/components/sections/three-path'
import { GuideCards } from '@/components/sections/guide-cards'
import { CalculatorsPreview } from '@/components/sections/calculators-preview'
import { EmailCapture } from '@/components/sections/email-capture'
import { SocialProofMarquee } from '@/components/sections/social-proof-marquee'
import type { GuideCardData } from '@/components/sections/guide-cards'

const featuredGuides: GuideCardData[] = [
  {
    slug: 'creator-rewards-2026',
    title: 'TikTok Creator Rewards Program 2026: Complete Guide',
    excerpt:
      'Eligibility requirements, how the program works, what qualified views actually means, and how payouts are calculated.',
    href: '/guides/creator-rewards-2026',
    category: 'Getting Started',
    readTime: '12 min',
  },
  {
    slug: 'optimize-rpm',
    title: 'How to Improve Your RPM',
    excerpt:
      'Country mix, niche, content length, completion rate — everything that moves the RPM needle.',
    href: '/guides/optimize-rpm',
    category: 'Maximize Earnings',
    readTime: '10 min',
  },
  {
    slug: 'maximize-qualified-views',
    title: 'How to Maximize Qualified Views',
    excerpt:
      'Why your qualified view count is lower than your total views, and what to do about it.',
    href: '/guides/maximize-qualified-views',
    category: 'Maximize Earnings',
    readTime: '8 min',
  },
  {
    slug: 'appeal-rejection',
    title: 'What to Do If Your Application Is Rejected',
    excerpt:
      'The real reasons applications fail and the exact steps to appeal or reapply successfully.',
    href: '/guides/appeal-rejection',
    category: 'Troubleshooting',
    readTime: '7 min',
  },
]

export default function HomePageClient() {
  return (
    <>
      {/* 1. Hero — calculator embedded as hero */}
      <DarkHeroCalculator />

      {/* 2. Three-Path Entry — routes visitors by intent */}
      <ThreePath />

      {/* 3. Featured Guides — 4 cards, single row, no tabs */}
      <GuideCards
        guides={featuredGuides}
        showTabs={false}
        showViewAll={true}
        headline="Guides Worth Reading First"
      />

      {/* 4. Calculator Preview — dark section, drives calculator usage → email */}
      <CalculatorsPreview />

      {/* 5. Email Capture */}
      <EmailCapture />

      {/* 6. Social Proof */}
      <SocialProofMarquee />
    </>
  )
}
