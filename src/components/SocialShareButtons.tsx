'use client'

import { useMemo } from 'react'
import { Share2, Twitter, Facebook, Linkedin } from 'lucide-react'

type SocialShareButtonsProps = {
  url: string
  title: string
}

export default function SocialShareButtons({ url, title }: SocialShareButtonsProps) {
  const shareLinks = useMemo(
    () => ({
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    }),
    [title, url],
  )

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url })
    } else {
      window.open(shareLinks.twitter, '_blank', 'noopener,noreferrer')
    }
  }

  const btnClass =
    'flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-xs font-semibold text-[var(--color-text-muted)] transition-all duration-200 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-ink)]'

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={handleNativeShare} className={btnClass} type="button">
        <Share2 className="h-3.5 w-3.5" aria-hidden />
        Share
      </button>
      <a href={shareLinks.twitter} target="_blank" rel="noreferrer" className={btnClass}>
        <Twitter className="h-3.5 w-3.5" aria-hidden />
        Twitter
      </a>
      <a href={shareLinks.facebook} target="_blank" rel="noreferrer" className={btnClass}>
        <Facebook className="h-3.5 w-3.5" aria-hidden />
        Facebook
      </a>
      <a href={shareLinks.linkedin} target="_blank" rel="noreferrer" className={btnClass}>
        <Linkedin className="h-3.5 w-3.5" aria-hidden />
        LinkedIn
      </a>
    </div>
  )
}
