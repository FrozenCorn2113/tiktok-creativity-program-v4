import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import ItalicWord from './ItalicWord'

export interface SectionMarkerProps extends HTMLAttributes<HTMLElement> {
  numeral: string
  heading: string
  italicWord?: string
  children?: ReactNode
}

const SectionMarker = forwardRef<HTMLElement, SectionMarkerProps>(
  ({ numeral, heading, italicWord, children, className, ...rest }, ref) => {
    let renderedHeading: ReactNode = heading
    if (italicWord && heading.includes(italicWord)) {
      const [before, ...afterParts] = heading.split(italicWord)
      const after = afterParts.join(italicWord)
      renderedHeading = (
        <>
          {before}
          <ItalicWord color="#F4A261">{italicWord}</ItalicWord>
          {after}
        </>
      )
    }

    return (
      <section ref={ref} className={cn('w-full', className)} {...rest}>
        <div className="flex items-baseline gap-6">
          <span
            className="font-serif italic text-[52px] leading-none text-[#F4A261]"
            aria-hidden="true"
          >
            {numeral}
          </span>
          <h2 className="font-sans text-[44px] leading-[1.05] tracking-[-0.02em] font-medium text-ink">
            {renderedHeading}
          </h2>
        </div>
        {children ? <div className="pl-[72px] mt-6">{children}</div> : null}
      </section>
    )
  },
)

SectionMarker.displayName = 'SectionMarker'

export default SectionMarker
