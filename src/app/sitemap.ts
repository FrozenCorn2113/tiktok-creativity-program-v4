import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'
import { getAllGuides } from '@/lib/mdx'

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllGuides().map((guide) => ({
    url: `${siteConfig.url}/guides/${guide.slug}`,
    lastModified: guide.date,
  }))

  const routes = [
    '',
    '/start-here',
    '/guides',
    '/guides/monetization-resource-center',
    '/calculators',
    '/calculators/earnings-calculator',
    '/calculators/rpm-by-country',
    '/calculators/follower-income-estimator',
    '/niche/musicians',
    '/niche/teachers',
    '/niche/fitness-creators',
    '/niche/artists',
    '/troubleshooting',
    '/resources',
    '/resources/index',
    '/resources/earnings-tracker',
    '/resources/creator-rewards-checklist',
    '/resources/viral-video-worksheet',
    '/resources/content-planning-template',
    '/earnings-database',

    '/locations/uk',
    '/locations/canada',
    '/locations/australia',
    '/newsletter',
    '/sponsor',
    '/media',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/affiliate-disclosure',
    '/lead-magnets/rpm-cheat-sheet',
    '/lead-magnets/eligibility-checklist',
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...guides]
}
