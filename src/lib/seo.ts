import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

type SeoInput = {
  title: string
  description: string
  path: string
  image?: string
}

export function buildMetadata({ title, description, path, image }: SeoInput): Metadata {
  const url = new URL(path, siteConfig.url).toString()
  const ogImage = image ?? `${siteConfig.url}/og-default.svg`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
