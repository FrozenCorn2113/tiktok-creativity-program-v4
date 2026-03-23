import React from 'react'
import { Lightbulb, AlertTriangle, Info, XCircle } from 'lucide-react'

type CalloutType = 'tip' | 'warning' | 'info' | 'error' | 'success'

const config: Record<string, {
  label: string
  icon: React.ComponentType<{ className?: string }>
  borderColor: string
  bgColor: string
  iconColor: string
  labelColor: string
}> = {
  tip: {
    label: 'Pro Tip',
    icon: Lightbulb,
    borderColor: 'border-l-[var(--color-primary)]',
    bgColor: 'bg-[var(--color-surface-warm)]',
    iconColor: 'text-[var(--color-primary)]',
    labelColor: 'text-[var(--color-primary-hover)]',
  },
  warning: {
    label: 'Warning',
    icon: AlertTriangle,
    borderColor: 'border-l-[var(--color-warning)]',
    bgColor: 'bg-[#FFFAEB]',
    iconColor: 'text-[var(--color-warning)]',
    labelColor: 'text-[#B45309]',
  },
  info: {
    label: 'Info',
    icon: Info,
    borderColor: 'border-l-[var(--color-info)]',
    bgColor: 'bg-[#F0F9FF]',
    iconColor: 'text-[var(--color-info)]',
    labelColor: 'text-[#0369A1]',
  },
  error: {
    label: 'Important',
    icon: XCircle,
    borderColor: 'border-l-[var(--color-error)]',
    bgColor: 'bg-[#FEF3F2]',
    iconColor: 'text-[var(--color-error)]',
    labelColor: 'text-[#B42318]',
  },
  // Legacy alias — maps to tip
  success: {
    label: 'Note',
    icon: Lightbulb,
    borderColor: 'border-l-[var(--color-primary)]',
    bgColor: 'bg-[var(--color-surface-warm)]',
    iconColor: 'text-[var(--color-primary)]',
    labelColor: 'text-[var(--color-primary-hover)]',
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
      className={`border-l-[3px] rounded-r-[var(--radius-md)] px-5 py-4 max-w-[65ch] ${c.borderColor} ${c.bgColor} ${className}`}
      role="note"
      {...props}
    >
      <div className={`flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-wide ${c.labelColor}`}>
        <Icon className={`h-4 w-4 flex-shrink-0 ${c.iconColor}`} aria-hidden />
        <span>{title ?? c.label}</span>
      </div>
      <div className="mt-2 text-sm leading-[1.7] text-[var(--color-text)]">{children}</div>
    </div>
  )
}
