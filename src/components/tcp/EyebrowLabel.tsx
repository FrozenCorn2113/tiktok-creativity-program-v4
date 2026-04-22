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
  (_props, _ref) => null,
)

EyebrowLabel.displayName = 'EyebrowLabel'

export default EyebrowLabel
