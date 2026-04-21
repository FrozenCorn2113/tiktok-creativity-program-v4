import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import ItalicWord from './ItalicWord'

export interface DarkCalloutProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  italic?: string
  children?: ReactNode
}

const DarkCallout = forwardRef<HTMLDivElement, DarkCalloutProps>(
  ({ title, italic, children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-ink text-paper rounded-[24px] p-[48px]',
          className,
        )}
        {...rest}
      >
        {title ? (
          <h3 className="font-sans text-[32px] leading-[1.1] tracking-[-0.02em] font-medium m-0">
            {title}
            {italic ? (
              <>
                {' '}
                <ItalicWord color="#F4A261">{italic}</ItalicWord>
              </>
            ) : null}
          </h3>
        ) : italic ? (
          <h3 className="font-sans text-[32px] leading-[1.1] tracking-[-0.02em] font-medium m-0">
            <ItalicWord color="#F4A261">{italic}</ItalicWord>
          </h3>
        ) : null}
        {children ? (
          <div
            className="font-sans text-[15px] leading-[1.6] mt-5"
            style={{ color: 'rgba(251,246,236,0.82)' }}
          >
            {children}
          </div>
        ) : null}
      </div>
    )
  },
)

DarkCallout.displayName = 'DarkCallout'

export default DarkCallout
