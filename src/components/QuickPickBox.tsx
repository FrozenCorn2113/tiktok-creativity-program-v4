import { Star } from 'lucide-react'
import AffiliateLinkButton from '@/components/AffiliateLinkButton'

type QuickPickBoxProps = {
  label?: string
  productName: string
  verdict: string
  affiliateSlug: string
  affiliateLabel?: string
  className?: string
}

export default function QuickPickBox({
  label = 'Top Pick',
  productName,
  verdict,
  affiliateSlug,
  affiliateLabel,
  className = '',
}: QuickPickBoxProps) {
  return (
    <div
      className={`not-prose my-8 rounded-[20px] bg-soft border border-[rgba(244,162,97,0.25)] p-7 ${className}`}
      role="note"
      aria-label={`Quick pick: ${productName}`}
    >
      {/* Eyebrow */}
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] font-medium text-[#C2622A]">
        <Star className="h-3.5 w-3.5 fill-[#F4A261] text-[#F4A261]" aria-hidden />
        {label}
      </div>

      {/* Product name */}
      <h3 className="mt-3 font-sans text-[22px] font-semibold tracking-[-0.01em] text-ink m-0">
        {productName}
      </h3>

      {/* Verdict */}
      <p className="mt-2 text-[15px] leading-[1.65] text-ink-soft">{verdict}</p>

      {/* Affiliate CTA */}
      <div className="mt-5">
        <AffiliateLinkButton
          slug={affiliateSlug}
          label={affiliateLabel ?? `Check ${productName}`}
        />
      </div>
    </div>
  )
}
