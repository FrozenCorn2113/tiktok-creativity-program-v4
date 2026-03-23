type StepCardProps = {
  number: number
  title: string
  description: string
}

export default function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="flex gap-4 items-start">
      <div
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-base font-bold text-[var(--color-ink-strong)]"
        aria-hidden
      >
        {number}
      </div>
      <div className="pt-1.5">
        <h3 className="text-[1.0625rem] font-semibold text-[var(--color-ink-strong)]">{title}</h3>
        <p className="mt-1 text-sm leading-[1.7] text-[var(--color-text-muted)]">{description}</p>
      </div>
    </div>
  )
}
