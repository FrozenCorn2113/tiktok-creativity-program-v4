'use client'

import { trackEvent } from '@/lib/analytics'

type VideoEmbedProps = {
  title: string
  embedUrl: string
}

export default function VideoEmbed({ title, embedUrl }: VideoEmbedProps) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white shadow-sm">
      <div className="aspect-video w-full">
        <iframe
          src={embedUrl}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() =>
            trackEvent({
              action: 'video_embed_load',
              category: 'engagement',
              label: title,
            })
          }
        />
      </div>
      <div className="border-t border-[var(--color-border)] p-3 text-xs text-[var(--color-text-subtle)]">
        {title}
      </div>
    </div>
  )
}
