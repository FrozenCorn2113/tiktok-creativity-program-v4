import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'TikTok Creator Rewards Program — Guides, Calculators & Strategies',
  description:
    'Everything you need to succeed in the TikTok Creator Rewards Program. Eligibility guides, earnings calculators, and monetization strategies.',
}

export default function HomePage() {
  return <HomePageClient />
}
