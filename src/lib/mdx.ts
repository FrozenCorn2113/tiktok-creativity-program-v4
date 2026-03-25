import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { useMDXComponents } from '@/app/mdx-components'

const contentRoot = path.join(process.cwd(), 'content')
const guidesDirectory = path.join(contentRoot, 'guides')

export type GuideFrontmatter = {
  title: string
  description: string
  date: string
  slug: string
  category?: string
  readingTime?: string
  keywords?: string[]
  image?: string
}

export type TocItem = {
  id: string
  title: string
  level: number
}

export type GuideContent = {
  frontmatter: GuideFrontmatter
  content: string
}

export function getGuideSlugs() {
  return fs
    .readdirSync(guidesDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const fileContents = fs.readFileSync(path.join(guidesDirectory, file), 'utf8')
      const { data } = matter(fileContents)
      return (data as GuideFrontmatter).slug
    })
}

export function getGuideBySlug(slug: string): GuideContent | null {
  const files = fs.readdirSync(guidesDirectory).filter((file) => file.endsWith('.mdx'))

  for (const file of files) {
    const fullPath = path.join(guidesDirectory, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const frontmatter = data as GuideFrontmatter

    if (frontmatter.slug === slug) {
      return { frontmatter: withImage(frontmatter), content }
    }
  }

  return null
}

export function getAllGuides(): GuideFrontmatter[] {
  return getGuideSlugs()
    .map((slug) => getGuideBySlug(slug)?.frontmatter)
    .filter((f): f is GuideFrontmatter => f !== undefined)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function withImage(frontmatter: GuideFrontmatter): GuideFrontmatter {
  if (frontmatter.image) return frontmatter
  // source.unsplash.com was shut down in 2023; fall back to local OG default
  return { ...frontmatter, image: '/og-default.png' }
}

export function getTableOfContents(content: string): TocItem[] {
  const lines = content.split('\n')
  const items: TocItem[] = []

  lines.forEach((line) => {
    const match = /^(#{2,3})\s+(.*)/.exec(line)
    if (!match) return
    const level = match[1].length
    const title = match[2].trim()
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
    items.push({ id, title, level })
  })

  return items
}

export type GuideCategory = 'Eligibility' | 'Application' | 'Earnings' | 'Tools'

const categoryMap: Record<string, GuideCategory> = {
  'Creator Rewards': 'Eligibility',
  'International': 'Eligibility',
  'Growth': 'Eligibility',
  'Troubleshooting': 'Application',
  'Hub': 'Application',
  'Strategy': 'Earnings',
  'Monetization': 'Earnings',
  'Comparison': 'Earnings',
  'Niche Guide': 'Earnings',
  'Ultimate Guide': 'Earnings',
  'Case Study': 'Earnings',
  'Seasonal': 'Earnings',
  'Affiliate': 'Tools',
}

export function getGuidesByCategory(): Record<GuideCategory, GuideFrontmatter[]> {
  const all = getAllGuides()
  const result: Record<GuideCategory, GuideFrontmatter[]> = {
    Eligibility: [],
    Application: [],
    Earnings: [],
    Tools: [],
  }

  for (const guide of all) {
    const mapped = categoryMap[guide.category ?? ''] ?? 'Earnings'
    result[mapped].push(guide)
  }

  return result
}

export async function compileGuide(content: string) {
  return compileMDX({
    source: content,
    // eslint-disable-next-line react-hooks/rules-of-hooks -- useMDXComponents is an MDX utility, not a React hook
    components: useMDXComponents({}),
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  })
}
