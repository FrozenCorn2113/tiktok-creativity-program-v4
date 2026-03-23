'use client'

// Section 4b — Calculator results actions (v4)
// Renders after calculator panel: email capture + share buttons + affiliate card

import { useState } from 'react'
import { Share2, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmailCaptureInline } from '@/components/email/email-capture-inline'
import { AffiliateCardInline } from '@/components/affiliate/affiliate-card-inline'

interface CalculatorSection4bProps {
  emailLeadMagnetTitle: string
  emailLeadMagnetDescription: string
  tweetText: string
  tweetUrl: string
  affiliateToolName: string
  affiliateSlug: string
  affiliateReview: string
  affiliateBestFor: string
  affiliatePriceRange: string
  affiliateCtaText: string
}

export function CalculatorSection4b({
  emailLeadMagnetTitle,
  emailLeadMagnetDescription,
  tweetText,
  tweetUrl,
  affiliateToolName,
  affiliateSlug,
  affiliateReview,
  affiliateBestFor,
  affiliatePriceRange,
  affiliateCtaText,
}: CalculatorSection4bProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const url = typeof window !== 'undefined' ? window.location.href : tweetUrl
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(tweetUrl)}`

  return (
    <div className="max-w-2xl flex flex-col gap-4">
      {/* Email capture */}
      <EmailCaptureInline
        leadMagnetTitle={emailLeadMagnetTitle}
        leadMagnetDescription={emailLeadMagnetDescription}
      />

      {/* Share buttons */}
      <div className="flex items-center gap-3">
        <span className="text-[13px] font-[500] text-text-secondary font-manrope">Share your results:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(twitterHref, '_blank', 'noopener,noreferrer')}
        >
          <Share2 className="w-3.5 h-3.5 mr-1.5" aria-hidden />
          Share on X
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
        >
          <Copy className="w-3.5 h-3.5 mr-1.5" aria-hidden />
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
      </div>

      {/* Affiliate card */}
      <div className="border-t border-border-default pt-4">
        <p className="text-[14px] font-[600] font-manrope text-text-secondary mb-2">Tools that can help improve your results</p>
        <AffiliateCardInline
          toolName={affiliateToolName}
          slug={affiliateSlug}
          review={affiliateReview}
          bestFor={affiliateBestFor}
          priceRange={affiliatePriceRange}
          ctaText={affiliateCtaText}
        />
      </div>
    </div>
  )
}
