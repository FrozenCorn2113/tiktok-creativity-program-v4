'use client'

// Small client island so the thumbnail img can use onError for missing files
// while the rest of the card remains server-rendered.

export default function GuideCardImage({ slug, title }: { slug: string; title: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/guides/hero-${slug}.webp`}
      alt={`Thumbnail for ${title}`}
      className="w-full h-full object-cover"
      loading="lazy"
      onError={(e) => {
        ;(e.currentTarget as HTMLImageElement).style.display = 'none'
      }}
    />
  )
}
