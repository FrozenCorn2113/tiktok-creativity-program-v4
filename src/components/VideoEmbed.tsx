'use client'

import { trackEvent } from '@/lib/analytics'

type VideoEmbedProps = {
  title: string
  embedUrl: string
}

export default function VideoEmbed({ title, embedUrl }: VideoEmbedProps) {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-[16px] border border-line bg-white">
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
      <div className="border-t border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
        {title}
      </div>
    </div>
  )
}
