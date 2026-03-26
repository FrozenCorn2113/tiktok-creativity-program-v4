'use client'

import React from 'react'
import Container from '@/components/ui/Container'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ChevronRight,
  BookOpen,
  ArrowRight,
  Users,
  TrendingUp,
  DollarSign,
  Lightbulb,
  Wrench,
  Star,
  Play,
  BarChart3,
  Target,
  Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/motion'
import { EmailCapture } from '@/components/sections/email-capture'
import { nicheContent, type Creator } from './niche-data'

// ---------------------------------------------------------------------------
// Helper: Creator initials for placeholder avatar
// ---------------------------------------------------------------------------
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

// ---------------------------------------------------------------------------
// RPM Range Bar component
// ---------------------------------------------------------------------------
function RpmRangeBar({ range, nicheSlug }: { range: string; nicheSlug: string }) {
  const rpmPositions: Record<string, number> = {
    musicians: 35,
    'fitness-creators': 30,
    artists: 22,
    teachers: 55,
    beauty: 38,
    comedy: 45,
    coaches: 42,
    travel: 32,
  }
  const position = rpmPositions[nicheSlug] ?? 35

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-text-muted">
        <span>$0.00</span>
        <span className="font-semibold text-brand-primaryDeep text-base">{range}</span>
        <span>$1.50+</span>
      </div>
      <div className="relative h-3 bg-[var(--color-surface-inset)] rounded-full overflow-hidden">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-200 via-[var(--color-primary)] to-orange-600 opacity-30" />
        <motion.div
          className="absolute top-0 bottom-0 bg-brand-primary rounded-full"
          style={{ left: `${Math.max(0, position - 15)}%`, width: '30%' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Creator Spotlight Card
// ---------------------------------------------------------------------------
function CreatorCard({ creator }: { creator: Creator }) {
  const imagePath = `/images/creators/${creator.handle}.webp`
  const [imgFailed, setImgFailed] = React.useState(false)

  // Generate a consistent color from the creator name for the avatar gradient
  const nameHash = creator.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const hueRotations = [0, 15, 30, 345, 330] // warm orange-adjacent hues
  const hueShift = hueRotations[nameHash % hueRotations.length]

  return (
    <motion.div
      variants={staggerItem}
      className="rounded-xl border border-border-default bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Profile screenshot -- the main visual element */}
      <div className="relative w-full aspect-[4/3] bg-gray-50">
        {!imgFailed ? (
          <Image
            src={imagePath}
            alt={`${creator.name} TikTok profile`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              background: `linear-gradient(135deg, hsl(${25 + hueShift}, 85%, 92%), hsl(${25 + hueShift}, 75%, 82%))`,
            }}
          >
            <span className="text-4xl font-bold text-brand-primaryDeep">
              {getInitials(creator.name)}
            </span>
            <span className="text-sm text-brand-primaryDeep/70 mt-1">@{creator.handle}</span>
          </div>
        )}
      </div>

      {/* Creator info below the screenshot */}
      <div className="px-5 pt-4 pb-5 space-y-3">
        <div>
          <h3 className="text-base font-bold text-brand-ink">{creator.name}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm text-brand-primaryDeep font-semibold">@{creator.handle}</span>
            <span className="text-sm text-text-muted flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {creator.followers}
            </span>
          </div>
        </div>

        <p className="text-[15px] text-text-secondary leading-relaxed line-clamp-3">
          {creator.description}
        </p>

        <div className="flex items-start gap-2.5 pt-3 border-t border-border-default">
          <Lightbulb className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-text-muted leading-relaxed">
            <span className="font-semibold text-brand-ink">What you can learn:</span>{' '}
            {creator.lesson}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------
export default function NichePageClient({ params }: { params: { slug: string } }) {
  const content = nicheContent[params.slug]

  if (!content) notFound()

  const nicheLabel = content.title
    .replace('Monetization for ', '')
    .replace(' on TikTok', '')

  return (
    <>
      {/* ================================================================= */}
      {/* Section 1: Hero                                                   */}
      {/* ================================================================= */}
      <section className="bg-white pt-24 pb-12">
        <Container>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-text-muted mb-8">
            <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" aria-hidden />
            <Link href="/niche" className="hover:text-brand-primary transition-colors">Niches</Link>
            <ChevronRight className="w-3 h-3" aria-hidden />
            <span className="text-text-primary">{nicheLabel}</span>
          </nav>

          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            {/* Icon + label */}
            <motion.div variants={staggerItem} className="flex items-center gap-3 mb-4">
              <Image
                src={content.icon}
                alt=""
                width={48}
                height={48}
                aria-hidden="true"
              />
              <Badge className="bg-brand-primarySoft text-brand-primaryDeep border-brand-primary/30 text-xs font-semibold">
                {nicheLabel}
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={staggerItem}
              className="text-[2rem] md:text-[2.75rem] font-extrabold text-brand-ink leading-tight mb-4"
            >
              {content.headline}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={staggerItem}
              className="text-[1.05rem] text-text-secondary leading-[1.7] mb-8 max-w-2xl"
            >
              {content.description}
            </motion.p>

            {/* Stats bar */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap gap-4 md:gap-6"
            >
              <div className="flex items-center gap-3 rounded-lg bg-white border border-border-default px-5 py-3">
                <DollarSign className="w-5 h-5 text-brand-primary" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-text-muted font-semibold">RPM Range</p>
                  <p className="text-base font-bold text-brand-ink">{content.rpmRange}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white border border-border-default px-5 py-3">
                <Play className="w-5 h-5 text-brand-primary" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-text-muted font-semibold">Best Format</p>
                  <p className="text-base font-bold text-brand-ink">{content.bestFormat}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white border border-border-default px-5 py-3">
                <BarChart3 className="w-5 h-5 text-brand-primary" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-text-muted font-semibold">Difficulty</p>
                  <p className="text-base font-bold text-brand-ink">{content.difficulty}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* Section 2: Creator Spotlights                                     */}
      {/* ================================================================= */}
      <section className="bg-white py-16">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem} className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-6 h-6 text-brand-primary" />
                <h2 className="text-[1.75rem] font-bold text-brand-ink">
                  Creator spotlights
                </h2>
              </div>
              <p className="text-[1.05rem] text-text-secondary max-w-2xl leading-relaxed">
                Real {nicheLabel.toLowerCase()} earning on TikTok right now. Study what works, learn from their strategies, and apply their lessons to your own content.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {content.creators.map((creator) => (
                <CreatorCard key={creator.handle} creator={creator} />
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* Section 3: Strategy Breakdown                                     */}
      {/* ================================================================= */}
      <section className="bg-[var(--color-background-surface)] py-16">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={staggerItem} className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-6 h-6 text-brand-primary" />
                <h2 className="text-[1.75rem] font-bold text-brand-ink">
                  Strategy breakdown
                </h2>
              </div>
              <p className="text-[1.05rem] text-text-secondary leading-relaxed">
                Proven approaches for {nicheLabel.toLowerCase()} to maximize TikTok earnings.
              </p>
            </motion.div>

            <div className="space-y-6">
              {content.strategy.map((section, i) => (
                <motion.div
                  key={section.heading}
                  variants={staggerItem}
                  className="rounded-xl border border-border-default bg-white p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-primarySoft border border-brand-primary/30 flex items-center justify-center">
                      <span className="text-base font-bold text-brand-primaryDeep">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-brand-ink mb-2">{section.heading}</h3>
                      <p className="text-[15px] text-text-secondary leading-relaxed">{section.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Focus areas */}
            <motion.div variants={staggerItem} className="mt-8 rounded-xl border border-border-default bg-white p-6">
              <h3 className="text-lg font-bold text-brand-ink mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-brand-primary" />
                Key focus areas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {content.focus.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[15px] text-text-secondary">
                    <span className="h-2 w-2 flex-shrink-0 rounded-full bg-brand-primary" aria-hidden />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* Section 4: RPM & Earnings Data                                    */}
      {/* ================================================================= */}
      <section className="bg-white py-16">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="max-w-3xl mx-auto"
          >
            <div className="rounded-xl border-2 border-brand-primary/20 bg-brand-primarySoft/40 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-brand-primary" />
                <h2 className="text-[1.5rem] font-bold text-brand-ink">RPM and earnings data</h2>
              </div>

              <RpmRangeBar range={content.rpmRange} nicheSlug={params.slug} />

              <p className="text-[15px] text-text-secondary leading-relaxed mt-4">
                {content.rpmNote}
              </p>

              <div className="mt-4 pt-4 border-t border-border-default">
                <Link
                  href="/calculators/earnings-calculator"
                  className="inline-flex items-center gap-2 text-[15px] font-bold text-brand-primaryDeep hover:underline"
                >
                  Calculate your estimated earnings <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* Section 5: Recommended Tools                                      */}
      {/* ================================================================= */}
      <section className="bg-[var(--color-background-surface)] py-16">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={staggerItem} className="flex items-center gap-2 mb-6">
              <Wrench className="w-6 h-6 text-brand-primary" />
              <h2 className="text-[1.5rem] font-bold text-brand-ink">Recommended tools</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.tools.map((tool) => (
                <motion.div key={tool.name} variants={staggerItem}>
                  <Link
                    href={tool.href}
                    className="block rounded-xl border border-border-default bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full"
                  >
                    <h3 className="text-base font-bold text-brand-ink mb-1.5">{tool.name}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{tool.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* Section 6: Ultimate Guide CTA                                     */}
      {/* ================================================================= */}
      <section className="bg-white py-16">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="max-w-4xl mx-auto"
          >
            <div className="rounded-2xl border-2 border-brand-primary/30 bg-gradient-to-br from-brand-primarySoft to-[var(--color-surface-warm)] p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <Badge className="mb-3 bg-brand-primary/10 text-brand-primaryDeep border-brand-primary/30 text-xs font-semibold">
                    <BookOpen className="w-3 h-3 mr-1" aria-hidden />
                    Ultimate Guide
                  </Badge>
                  <h2 className="text-xl md:text-2xl font-bold text-brand-ink mb-3">
                    {content.ultimateGuide.label}
                  </h2>
                  <p className="text-[15px] text-text-secondary leading-relaxed mb-5 max-w-lg">
                    The full strategy playbook for {nicheLabel.toLowerCase()}: eligibility requirements, RPM optimization, additional income streams, and a month-one action plan.
                  </p>
                  <Link
                    href={`/guides/${content.ultimateGuide.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors"
                  >
                    Read the full guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="hidden md:flex items-center justify-center w-32 h-32 rounded-xl bg-white/60 border border-brand-primary/20">
                  <Image
                    src={content.icon}
                    alt=""
                    width={64}
                    height={64}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* Section 7: Related Guides                                         */}
      {/* ================================================================= */}
      <section className="bg-[var(--color-background-surface)] py-16">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="text-[1.5rem] font-bold text-brand-ink mb-6">
              Related guides
            </motion.h2>

            <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory scrollbar-none">
              {content.relatedGuides.map((guide) => (
                <motion.div
                  key={guide.href}
                  variants={staggerItem}
                  className="snap-start flex-shrink-0 w-72"
                >
                  <Link
                    href={guide.href}
                    className="block rounded-xl border border-border-default bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full"
                  >
                    <p className="text-base font-bold text-brand-ink mb-2 line-clamp-2">{guide.label}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primaryDeep">
                      Read guide <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ================================================================= */}
      {/* Section 8: Email Capture                                          */}
      {/* ================================================================= */}
      <EmailCapture
        headline={`Get the ${nicheLabel.toLowerCase()} monetization breakdown`}
        subheadline="RPM ranges, best content formats, and monetization paths for your niche. Free."
        cta="Send It to Me"
        showImage={false}
      />
    </>
  )
}
