import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type DataPillVariant = 'soft' | 'emphasis' | 'tag'

export interface DataPillProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: DataPillVariant
}

const variantClass: Record<DataPillVariant, string> = {
  soft: 'bg-[#FFF1E6] text-[#C2622A]',
  emphasis: 'bg-ink text-paper',
  tag: 'bg-[#F4A261] text-ink',
}

const DataPill = forwardRef<HTMLSpanElement, DataPillProps>(
  ({ children, className, variant = 'soft', ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-[14px] py-[5px] rounded-full text-[12px] font-medium',
          variantClass[variant],
          className,
        )}
        {...rest}
      >
        {children}
      </span>
    )
  },
)

DataPill.displayName = 'DataPill'

export default DataPill
