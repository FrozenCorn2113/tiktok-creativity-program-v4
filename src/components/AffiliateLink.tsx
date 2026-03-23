'use client'

import { trackEvent, trackAffiliateLinkClick } from '@/lib/analytics'
import { ReactNode } from 'react'

type AffiliateLinkProps = {
  // Explicit slug+label usage (programmatic)
  slug?: string
  label?: string
  // MDX inline usage: <AffiliateLink href="/tools/filmora">Filmora</AffiliateLink>
  href?: string
  children?: ReactNode
  className?: string
}

export default function AffiliateLink({ slug, label, href, children, className = '' }: AffiliateLinkProps) {
  // Derive slug from href if not provided directly (e.g. "/tools/filmora" -> "filmora")
  const resolvedSlug = slug ?? href?.split('/').pop() ?? 'unknown'
  // Normalize /tools/{slug} hrefs to /go/{slug} — MDX guides use /tools/ pattern but the
  // actual affiliate redirect route is /go/[slug]. No individual /tools/[slug] pages exist.
  const rawHref = slug ? `/go/${slug}` : href ?? `/go/${resolvedSlug}`
  const resolvedHref = rawHref.startsWith('/tools/') ? rawHref.replace('/tools/', '/go/') : rawHref
  const resolvedLabel = label ?? children

  const handleClick = () => {
    trackEvent({
      action: 'affiliate_click',
      category: 'monetization',
      label: resolvedSlug,
    })
    trackAffiliateLinkClick(resolvedSlug, resolvedHref)
  }

  return (
    <a
      href={resolvedHref}
      onClick={handleClick}
      rel="noopener noreferrer sponsored"
      className={`text-[var(--color-primary-hover)] underline decoration-[var(--color-primary)] underline-offset-2 hover:text-[var(--color-ink)] ${className}`}
    >
      {resolvedLabel}
    </a>
  )
}
