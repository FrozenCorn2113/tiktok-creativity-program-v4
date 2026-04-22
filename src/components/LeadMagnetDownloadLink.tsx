'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

import { track } from '@/lib/analytics'

/**
 * Wraps a lead-magnet download link and fires `lead_magnet_download` in
 * PostHog on click. Drop-in replacement for a `<Link>` to a `/downloads/*`
 * PDF on lead-magnet pages.
 */
export default function LeadMagnetDownloadLink({
  href,
  leadMagnet,
  source,
  children,
  className,
  target = '_blank',
}: {
  href: string
  leadMagnet: string
  source?: string
  children: ReactNode
  className?: string
  target?: string
}) {
  const handleClick = () => {
    track('lead_magnet_download', {
      lead_magnet: leadMagnet,
      signup_source: source ?? 'lead_magnet_page',
      file_url: href,
    })
  }

  return (
    <Link href={href} target={target} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
