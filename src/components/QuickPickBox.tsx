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
      className={`border-l-[3px] border-l-[var(--color-primary)] rounded-r-[var(--radius-lg)] bg-[var(--color-surface-warm)] p-6 ${className}`}
      role="note"
      aria-label={`Quick pick: ${productName}`}
    >
      {/* Label row */}
      <div className="flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-wide text-[var(--color-primary-hover)]">
        <Star className="h-3.5 w-3.5 fill-[var(--color-primary)] text-[var(--color-primary)]" aria-hidden />
        {label}
      </div>

      {/* Product name */}
      <h3 className="mt-2 text-[1.125rem] font-bold text-[var(--color-ink-strong)]">
        {productName}
      </h3>

      {/* Verdict */}
      <p className="mt-1.5 text-sm leading-[1.7] text-[var(--color-text-muted)]">{verdict}</p>

      {/* Affiliate CTA */}
      <div className="mt-4">
        <AffiliateLinkButton
          slug={affiliateSlug}
          label={affiliateLabel ?? `Check ${productName}`}
        />
      </div>
    </div>
  )
}
