#!/usr/bin/env node
// Generates public/search-index.json from guide frontmatter + niche data
// Run before build: node scripts/generate-search-index.mjs

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const root = process.cwd()
const guidesDir = path.join(root, 'content', 'guides')
const outPath = path.join(root, 'public', 'search-index.json')

// Read all guides
const files = fs.readdirSync(guidesDir).filter((f) => f.endsWith('.mdx'))
const guides = files
  .map((file) => {
    const raw = fs.readFileSync(path.join(guidesDir, file), 'utf8')
    const { data } = matter(raw)
    return {
      title: data.title || '',
      description: data.description || '',
      slug: data.slug || file.replace('.mdx', ''),
      category: data.category || '',
      keywords: data.keywords || [],
      href: `/guides/${data.slug || file.replace('.mdx', '')}`,
      type: 'guide',
    }
  })
  .filter((g) => g.title && g.slug)

// Add calculator pages
const calculators = [
  {
    title: 'TikTok Earnings Calculator',
    description: 'Estimate your TikTok Creator Rewards earnings based on views, RPM, and niche.',
    slug: 'earnings-calculator',
    category: 'Calculator',
    keywords: ['earnings', 'calculator', 'rpm', 'money', 'income'],
    href: '/calculators/earnings-calculator',
    type: 'calculator',
  },
  {
    title: 'RPM by Country Calculator',
    description: 'Compare TikTok Creator Rewards RPM rates across different countries.',
    slug: 'rpm-by-country',
    category: 'Calculator',
    keywords: ['rpm', 'country', 'international', 'rates'],
    href: '/calculators/rpm-by-country',
    type: 'calculator',
  },
  {
    title: 'Follower Income Estimator',
    description: 'Estimate potential TikTok income based on your follower count and engagement.',
    slug: 'follower-income-estimator',
    category: 'Calculator',
    keywords: ['followers', 'income', 'estimator', 'engagement'],
    href: '/calculators/follower-income-estimator',
    type: 'calculator',
  },
]

// Add niche pages
const niches = [
  { slug: 'musicians', title: 'Monetization for Musicians on TikTok' },
  { slug: 'fitness-creators', title: 'Monetization for Fitness Creators on TikTok' },
  { slug: 'artists', title: 'Monetization for Artists on TikTok' },
  { slug: 'teachers', title: 'Monetization for Teachers and Educators on TikTok' },
  { slug: 'beauty', title: 'Monetization for Beauty Creators on TikTok' },
  { slug: 'comedy', title: 'Monetization for Comedians on TikTok' },
  { slug: 'coaches', title: 'Monetization for Coaches and Consultants on TikTok' },
  { slug: 'travel', title: 'Monetization for Travel Creators on TikTok' },
].map((n) => ({
  title: n.title,
  description: `Niche monetization guide for ${n.slug.replace(/-/g, ' ')} on TikTok.`,
  slug: n.slug,
  category: 'Niche',
  keywords: [n.slug.replace(/-/g, ' '), 'niche', 'monetization'],
  href: `/niche/${n.slug}`,
  type: 'niche',
}))

const index = [...guides, ...calculators, ...niches]

fs.writeFileSync(outPath, JSON.stringify(index, null, 0))
console.log(`Search index generated: ${index.length} entries -> ${outPath}`)
