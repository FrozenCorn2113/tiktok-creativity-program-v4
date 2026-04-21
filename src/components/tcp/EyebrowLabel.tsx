import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type EyebrowLabelTone = 'deep' | 'inkSoft' | 'paper'

export interface EyebrowLabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  tone?: EyebrowLabelTone
}

const toneClass: Record<EyebrowLabelTone, string> = {
  deep: 'text-brand-primaryDeep',
  inkSoft: 'text-ink-soft',
  paper: 'text-paper',
}

const EyebrowLabel = forwardRef<HTMLSpanElement, EyebrowLabelProps>(
  ({ children, className, tone = 'deep', ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'font-mono text-[11px] uppercase tracking-[0.12em] font-medium',
          toneClass[tone],
          className,
        )}
        {...rest}
      >
        {children}
      </span>
    )
  },
)

EyebrowLabel.displayName = 'EyebrowLabel'

export default EyebrowLabel
