import Link from 'next/link'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/PageHeader'
import ScrollReveal from '@/components/ScrollReveal'
import { AlertTriangle, BarChart2, EyeOff, ShieldOff, RefreshCcw, XCircle, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TikTok Creator Rewards Troubleshooting',
  description:
    'Fix missing qualified views, RPM drops, Creator Rewards not showing, disabled accounts, and rejected appeals — step-by-step diagnostic guides.',
}

const guides = [
  {
    icon: EyeOff,
    symptom: 'Qualified views not counting',
    description:
      'Your views are there but Creator Rewards earnings are zero or suspiciously low. Work through this 7-step diagnostic to find the actual cause.',
    href: '/guides/qualified-views-not-counting',
    label: 'Run the diagnostic',
  },
  {
    icon: EyeOff,
    symptom: 'No qualified views at all',
    description:
      'You are eligible but still seeing zero qualified views. A different problem from low counts — this guide walks through the specific blockers.',
    href: '/guides/no-qualified-views',
    label: 'Find the blocker',
  },
  {
    icon: BarChart2,
    symptom: 'RPM is dropping',
    description:
      'Your RPM dropped and you want to know why. This breaks down the three-layer RPM structure and gives you a root-cause diagnostic.',
    href: '/guides/rpm-dropping',
    label: 'Diagnose your RPM',
  },
  {
    icon: RefreshCcw,
    symptom: 'Creator Rewards not showing in settings',
    description:
      'The program is not appearing in your TikTok settings. Four different situations look identical from the outside — this identifies which one you are in.',
    href: '/guides/creativity-program-not-showing',
    label: 'Identify your situation',
  },
  {
    icon: ShieldOff,
    symptom: 'Creator Rewards disabled',
    description:
      'Your access was disabled. This covers the three-tier severity model, the escalation path most creators never find, and what happens to earnings already accumulated.',
    href: '/guides/rewards-disabled',
    label: 'Start the escalation',
  },
  {
    icon: XCircle,
    symptom: 'Appeal rejected',
    description:
      'Your appeal was denied. Here is why that fast rejection was likely not a real review, and what the actual escalation path looks like.',
    href: '/guides/appeal-rejection',
    label: 'Appeal again properly',
  },
  {
    icon: AlertTriangle,
    symptom: 'Business account blocking eligibility',
    description:
      'Creator Rewards requires a personal account. Step-by-step instructions to switch — and what to watch out for to avoid losing data.',
    href: '/guides/convert-business-to-personal',
    label: 'Switch account type',
  },
]

export default function TroubleshootingPage() {
  return (
    <>
      <ScrollReveal />

      {/* Header */}
      <section className="bg-amber-50 py-14 border-b border-amber-100">
        <Container>
          <PageHeader
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Troubleshooting', href: '/troubleshooting' },
            ]}
            title="Troubleshooting Creator Rewards"
            description="Something is broken. Find your symptom below and follow the diagnostic — most issues resolve in the first two steps."
          />
        </Container>
      </section>

      {/* Guide cards */}
      <section className="bg-white py-14">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl">
            {guides.map((guide) => {
              const Icon = guide.icon
              return (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group flex gap-4 rounded-xl border border-border bg-white p-6 transition-all duration-200 hover:border-orange-300 hover:shadow-md"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center mt-0.5">
                    <Icon className="w-5 h-5 text-orange-600" aria-hidden />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-semibold text-foreground leading-snug mb-1">
                      {guide.symptom}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {guide.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 transition-transform duration-200 group-hover:translate-x-0.5">
                      {guide.label}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Still stuck callout */}
          <div className="mt-12 max-w-4xl rounded-xl border border-border bg-muted/40 p-6">
            <h3 className="text-base font-semibold text-foreground mb-1">Issue not listed here?</h3>
            <p className="text-sm text-muted-foreground">
              Check the{' '}
              <Link href="/guides/creator-rewards-2026" className="underline text-orange-600 hover:text-orange-700">
                Creator Rewards 2026 guide
              </Link>{' '}
              for program-level changes, or browse{' '}
              <Link href="/guides" className="underline text-orange-600 hover:text-orange-700">
                all guides
              </Link>{' '}
              for eligibility and earning deep-dives.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
