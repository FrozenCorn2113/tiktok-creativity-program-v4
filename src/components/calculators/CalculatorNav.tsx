'use client'

import Link from 'next/link'
import { ArrowRight, DollarSign, Globe, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const calculators = [
  {
    slug: 'earnings-calculator',
    name: 'Earnings Calculator',
    description:
      'Estimate your Creator Rewards earnings based on views and RPM',
    href: '/calculators/earnings-calculator',
    icon: DollarSign,
  },
  {
    slug: 'rpm-by-country',
    name: 'RPM by Country',
    description:
      'Compare RPM rates by country and model weighted earnings',
    href: '/calculators/rpm-by-country',
    icon: Globe,
  },
  {
    slug: 'follower-income-estimator',
    name: 'Follower Income Estimator',
    description:
      'Project earnings based on follower count and engagement',
    href: '/calculators/follower-income-estimator',
    icon: Users,
  },
] as const

interface CalculatorNavProps {
  currentCalculator: string
}

export function CalculatorNav({ currentCalculator }: CalculatorNavProps) {
  return (
    <nav aria-label="Calculator navigation" className="py-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px flex-1 bg-border-default" />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
          All Calculators
        </span>
        <div className="h-px flex-1 bg-border-default" />
      </div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {calculators.map((calc, i) => {
          const isCurrent = calc.slug === currentCalculator
          const Icon = calc.icon

          return (
            <motion.div
              key={calc.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08, ease: 'easeOut' }}
              className="min-w-[240px] flex-shrink-0 md:min-w-0"
            >
              {isCurrent ? (
                <div className="relative flex items-start gap-3.5 rounded-xl border-2 border-brand-primary bg-orange-50/60 p-4 h-full">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                    <Icon className="h-[18px] w-[18px] text-brand-primary" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-brand-ink leading-tight">
                      {calc.name}
                    </p>
                    <p className="mt-1 text-xs leading-[1.5] text-text-secondary line-clamp-2">
                      {calc.description}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-primary">
                      Currently viewing
                    </span>
                  </div>
                  {/* Active indicator dot */}
                  <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-brand-primary" />
                </div>
              ) : (
                <Link
                  href={calc.href}
                  className="group relative flex items-start gap-3.5 rounded-xl border border-border-default bg-white p-4 h-full transition-all duration-200 hover:border-brand-primary hover:shadow-md hover:shadow-brand-primary/5 hover:-translate-y-0.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background-surface transition-colors duration-200 group-hover:bg-brand-primary/10">
                    <Icon className="h-[18px] w-[18px] text-text-muted transition-colors duration-200 group-hover:text-brand-primary" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-brand-ink leading-tight">
                      {calc.name}
                    </p>
                    <p className="mt-1 text-xs leading-[1.5] text-text-secondary line-clamp-2">
                      {calc.description}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-primary opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5">
                      Open <ArrowRight className="h-3 w-3" aria-hidden />
                    </span>
                  </div>
                </Link>
              )}
            </motion.div>
          )
        })}
      </div>
    </nav>
  )
}
