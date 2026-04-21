import React from 'react'
import { Lightbulb, AlertTriangle, Info, XCircle } from 'lucide-react'

type CalloutType = 'tip' | 'warning' | 'info' | 'error' | 'success'

/**
 * Warm-editorial callout variants.
 * tip / success: soft orange panel
 * info: ink-dark callout with paper text (dramatic)
 * warning / error: soft orange panel with deep orange accent
 * All use Manrope body text, JetBrains mono eyebrow, orange accents on cream paper.
 */
const config: Record<
  string,
  {
    label: string
    icon: React.ComponentType<{ className?: string }>
    wrapperClass: string
    eyebrowClass: string
    iconClass: string
    bodyClass: string
  }
> = {
  tip: {
    label: 'Pro Tip',
    icon: Lightbulb,
    wrapperClass: 'bg-soft border border-[rgba(244,162,97,0.25)]',
    eyebrowClass: 'text-[#C2622A]',
    iconClass: 'text-[#C2622A]',
    bodyClass: 'text-ink',
  },
  success: {
    label: 'Note',
    icon: Lightbulb,
    wrapperClass: 'bg-soft border border-[rgba(244,162,97,0.25)]',
    eyebrowClass: 'text-[#C2622A]',
    iconClass: 'text-[#C2622A]',
    bodyClass: 'text-ink',
  },
  info: {
    label: 'Info',
    icon: Info,
    wrapperClass: 'bg-ink text-paper border border-ink',
    eyebrowClass: 'text-[#F4A261]',
    iconClass: 'text-[#F4A261]',
    bodyClass: 'text-paper/90',
  },
  warning: {
    label: 'Warning',
    icon: AlertTriangle,
    wrapperClass: 'bg-soft border border-[rgba(194,98,42,0.35)]',
    eyebrowClass: 'text-[#C2622A]',
    iconClass: 'text-[#C2622A]',
    bodyClass: 'text-ink',
  },
  error: {
    label: 'Important',
    icon: XCircle,
    wrapperClass: 'bg-ink text-paper border border-ink',
    eyebrowClass: 'text-[#F4A261]',
    iconClass: 'text-[#F4A261]',
    bodyClass: 'text-paper/90',
  },
}

type CalloutBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: CalloutType
  title?: string
}

export default function CalloutBox({
  type = 'info',
  title,
  children,
  className = '',
  ...props
}: CalloutBoxProps) {
  const c = config[type] ?? config['info']
  const Icon = c.icon

  return (
    <div
      className={`not-prose rounded-[20px] px-6 py-5 my-6 max-w-[65ch] ${c.wrapperClass} ${className}`}
      role="note"
      {...props}
    >
      <div
        className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] font-medium ${c.eyebrowClass}`}
      >
        <Icon className={`h-4 w-4 flex-shrink-0 ${c.iconClass}`} aria-hidden />
        <span>{title ?? c.label}</span>
      </div>
      <div className={`mt-2.5 text-[15px] leading-[1.65] ${c.bodyClass}`}>{children}</div>
    </div>
  )
}
