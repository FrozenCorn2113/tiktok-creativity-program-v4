import { describe, it, expect } from 'vitest'
import { getTableOfContents, getGuideSlugs, getGuideBySlug } from '@/lib/mdx'

describe('getTableOfContents', () => {
  it('extracts h2 headings', () => {
    const content = '## Eligibility\n\nSome text.\n\n## How to Apply\n'
    const toc = getTableOfContents(content)
    expect(toc).toHaveLength(2)
    expect(toc[0]).toEqual({ id: 'eligibility', title: 'Eligibility', level: 2 })
    expect(toc[1]).toEqual({ id: 'how-to-apply', title: 'How to Apply', level: 2 })
  })

  it('extracts h3 headings', () => {
    const content = '### Step One\n'
    const toc = getTableOfContents(content)
    expect(toc).toHaveLength(1)
    expect(toc[0].level).toBe(3)
  })

  it('ignores h1 headings', () => {
    const content = '# Title\n## Section\n'
    const toc = getTableOfContents(content)
    expect(toc).toHaveLength(1)
    expect(toc[0].title).toBe('Section')
  })

  it('returns empty array for content with no headings', () => {
    const content = 'Just a paragraph.\n'
    expect(getTableOfContents(content)).toEqual([])
  })

  it('slugifies heading ids correctly', () => {
    const content = '## Creator Rewards & RPM Tips!\n'
    const toc = getTableOfContents(content)
    // & is stripped, spaces become dashes → no double-dash
    expect(toc[0].id).toBe('creator-rewards-rpm-tips')
  })
})

describe('getGuideSlugs', () => {
  it('returns an array of strings', () => {
    const slugs = getGuideSlugs()
    expect(Array.isArray(slugs)).toBe(true)
    expect(slugs.length).toBeGreaterThan(0)
    slugs.forEach((slug) => expect(typeof slug).toBe('string'))
  })
})

describe('getGuideBySlug', () => {
  it('returns null for an unknown slug', () => {
    expect(getGuideBySlug('this-slug-does-not-exist')).toBeNull()
  })

  it('returns guide content for a known slug', () => {
    const slugs = getGuideSlugs()
    const first = slugs[0]
    const guide = getGuideBySlug(first)
    expect(guide).not.toBeNull()
    expect(guide?.frontmatter.slug).toBe(first)
    expect(typeof guide?.content).toBe('string')
  })
})
