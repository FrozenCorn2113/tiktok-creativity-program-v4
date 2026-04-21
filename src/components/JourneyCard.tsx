import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type JourneyCardProps = {
  title: string
  description: string
  linkText: string
  linkHref: string
}

export default function JourneyCard({ title, description, linkText, linkHref }: JourneyCardProps) {
  return (
    <div className="not-prose rounded-[16px] border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-[2px] hover:border-brand-primaryDeep hover:shadow-[0_10px_28px_-18px_rgba(194,98,42,0.3)]">
      <h3 className="font-sans text-[17px] font-semibold text-ink m-0 leading-[1.3]">{title}</h3>
      <p className="mt-2 text-[14px] leading-[1.65] text-ink-soft m-0">{description}</p>
      <Link
        href={linkHref}
        className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] font-medium text-[#C2622A] hover:gap-2 transition-all duration-200"
      >
        {linkText}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  )
}
