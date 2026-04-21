import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ItalicWordProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  color?: string
}

const ItalicWord = forwardRef<HTMLSpanElement, ItalicWordProps>(
  ({ children, className, color, style, ...rest }, ref) => {
    const mergedStyle: CSSProperties = color ? { color, ...style } : { ...style }
    return (
      <span
        ref={ref}
        className={cn('font-serif italic font-normal', className)}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </span>
    )
  },
)

ItalicWord.displayName = 'ItalicWord'

export default ItalicWord
