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
    <div className={`not-prose inline-flex flex-col items-start gap-1.5 ${className}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] font-medium text-ink-soft">
        {caption}
      </span>
      <a
        href={`/go/${slug}`}
        onClick={handleClick}
        className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-paper transition-all duration-200 hover:bg-[#1a1916] active:scale-[0.98]"
        rel="noopener noreferrer sponsored"
      >
        {label}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
      </a>
    </div>
  )
}
