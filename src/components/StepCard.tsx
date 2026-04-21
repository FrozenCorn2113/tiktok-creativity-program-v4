type StepCardProps = {
  number: number
  title: string
  description: string
}

export default function StepCard({ number, title, description }: StepCardProps) {
  const num = String(number).padStart(2, '0')
  return (
    <div className="not-prose flex gap-5 items-start my-5">
      <div
        className="flex-shrink-0 font-mono text-[13px] tracking-[0.08em] text-[#C2622A] pt-1"
        aria-hidden
      >
        {num}
      </div>
      <div className="flex-1 border-l border-line pl-5">
        <h3 className="font-sans text-[17px] font-semibold text-ink m-0 leading-[1.35]">
          {title}
        </h3>
        <p className="mt-1.5 text-[15px] leading-[1.65] text-ink-soft m-0">{description}</p>
      </div>
    </div>
  )
}
