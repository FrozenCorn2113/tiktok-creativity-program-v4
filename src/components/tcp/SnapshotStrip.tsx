import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import EyebrowLabel from './EyebrowLabel'

export interface SnapshotCell {
  label: string
  value: string
  note?: string
}

export interface SnapshotStripProps extends HTMLAttributes<HTMLDivElement> {
  cells: SnapshotCell[]
}

const SnapshotStrip = forwardRef<HTMLDivElement, SnapshotStripProps>(
  ({ cells, className, ...rest }, ref) => {
    if (process.env.NODE_ENV !== 'production' && cells.length !== 4) {
      // eslint-disable-next-line no-console
      console.warn(
        `SnapshotStrip expects exactly 4 cells, received ${cells.length}.`,
      )
    }

    return (
      <div
        ref={ref}
        className={cn('grid grid-cols-4 w-full', className)}
        {...rest}
      >
        {cells.map((cell, i) => (
          <div
            key={`${cell.label}-${i}`}
            className={cn(
              'px-6 py-5',
              i !== 0 && 'border-l border-line',
            )}
          >
            <EyebrowLabel tone="deep">{cell.label}</EyebrowLabel>
            <div className="mt-3 font-serif italic text-[32px] leading-[1.1] text-ink">
              {cell.value}
            </div>
            {cell.note ? (
              <div className="mt-2 font-sans text-[13px] text-ink-soft">
                {cell.note}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    )
  },
)

SnapshotStrip.displayName = 'SnapshotStrip'

export default SnapshotStrip
