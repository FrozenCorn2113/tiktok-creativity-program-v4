'use client'

import { ArrowRight } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

type AffiliateLinkButtonProps = {
  slug: string
  label: string
  /** Caption above the button. Defaults to "Affiliate link" */
  caption?: string
  className?: string
}

export default function AffiliateLinkButton({
  slug,
  label,
  caption = 'Affiliate link',
  className = '',
}: AffiliateLinkButtonProps) {
  const handleClick = () => {
    trackEvent({
      action: 'affiliate_click',
      category: 'monetization',
      label: slug,
    })
  }

  return (
    <div className={`inline-flex flex-col items-start gap-1 ${className}`}>
      <span className="affiliate-label">{caption}</span>
      <a
        href={`/go/${slug}`}
        onClick={handleClick}
        className="arrow-nudge inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-7 py-4 text-[0.9375rem] font-semibold text-[var(--color-ink-strong)] transition-all duration-200 hover:bg-[var(--color-primary-hover)] hover:shadow-[var(--shadow-sm)] active:scale-95"
        rel="noopener noreferrer sponsored"
      >
        {label}
        <ArrowRight className="arrow-icon h-4 w-4" aria-hidden />
      </a>
    </div>
  )
}
