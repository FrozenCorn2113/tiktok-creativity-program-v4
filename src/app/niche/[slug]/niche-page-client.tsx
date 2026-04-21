'use client'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'

import { EmailCapture } from '@/components/sections/email-capture'
import {
  DarkCallout,
  DataPill,
  EyebrowLabel,
  ItalicWord,
  SectionMarker,
  SnapshotStrip,
} from '@/components/tcp'
import { nicheContent, nicheIndex } from './niche-data'

// ---- pill mapping for tools "take" column ----
function TakePill({ take }: { take: 'Must-have' | 'Solid' | 'Optional' | 'Skip' }) {
  const variant =
    take === 'Must-have'
      ? 'emphasis'
      : take === 'Solid'
        ? 'soft'
        : take === 'Optional'
          ? 'soft'
          : 'soft'
  return (
    <DataPill
      variant={variant}
      className={
        take === 'Optional'
          ? 'bg-white border border-line text-ink-soft'
          : take === 'Skip'
            ? 'bg-white border border-line text-ink-soft'
            : undefined
      }
    >
      {take}
    </DataPill>
  )
}

function EffortDots({ count }: { count: number }) {
  return (
    <div className="flex gap-[3px]">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          aria-hidden
          className={
            'w-[10px] h-[10px] rounded-[2px] ' +
            (n <= count ? 'bg-brand-primary' : 'bg-soft')
          }
        />
      ))}
    </div>
  )
}

export default function NichePageClient({ params }: { params: { slug: string } }) {
  const content = nicheContent[params.slug]
  if (!content) notFound()

  // Reading progress bar
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      setProgress(Math.min(100, Math.max(0, pct)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nicheLabel = content.title
    .replace('Monetization for ', '')
    .replace(' on TikTok', '')

  const relatedDetail = content.related.map((r) => {
    const entry = nicheIndex.find((n) => n.slug === r.slug)
    return {
      ...r,
      heroImage: entry?.heroImage ?? '/images/guides/hero-ultimate-music-guide.webp',
    }
  })

  return (
    <div className="bg-paper">
      {/* Progress bar */}
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[3px] z-20 bg-transparent"
      >
        <div
          className="h-full bg-brand-primary transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-6">
        <nav className="text-[12px] text-ink-soft font-mono tracking-[0.08em] uppercase flex items-center gap-2">
          <Link href="/" className="hover:text-brand-primaryDeep transition-colors">Home</Link>
          <span aria-hidden>·</span>
          <Link href="/niche" className="hover:text-brand-primaryDeep transition-colors">Niches</Link>
          <span aria-hidden>·</span>
          <span className="text-ink">{nicheLabel}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-7 pb-12 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-[52px] items-center">
        <div>
          <div className="flex gap-2.5 items-center mb-5 flex-wrap">
            <DataPill variant="soft">{content.category}</DataPill>
            <span className="text-[13px] text-ink-soft">Niche guide · updated {content.updated}</span>
          </div>
          <h1 className="font-sans text-[44px] md:text-[60px] lg:text-[72px] leading-[1.0] tracking-[-0.04em] font-medium text-ink m-0 text-balance">
            TikTok monetization for{' '}
            <ItalicWord color="#C2622A">{content.titleItalic}</ItalicWord>.
          </h1>
          <p className="text-[18px] md:text-[19px] leading-[1.55] text-ink-soft mt-6 max-w-[580px]">
            {content.intro}
          </p>
          <div className="mt-7 flex gap-3 flex-wrap">
            <a
              href="#levers"
              className="inline-flex items-center px-[22px] py-[13px] bg-ink text-paper rounded-full text-[14px] font-semibold hover:opacity-90 transition-opacity"
            >
              Jump to monetization paths →
            </a>
            <Link
              href={`/guides/${content.ultimateGuide.slug}`}
              className="inline-flex items-center px-[22px] py-[13px] bg-transparent text-ink rounded-full text-[14px] font-semibold border border-line hover:border-brand-primaryDeep transition-colors"
            >
              Read the ultimate guide
            </Link>
          </div>
        </div>
        <div className="h-[300px] md:h-[420px] bg-soft rounded-[24px] border border-line overflow-hidden relative">
          <Image
            src={content.heroImage}
            alt={`${nicheLabel} monetization illustration`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Snapshot strip */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-12">
        <div className="bg-white border border-line rounded-[20px] overflow-hidden">
          <SnapshotStrip cells={content.snapshot} />
        </div>
      </section>

      {/* Reality check */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pb-14">
        <div className="bg-ink text-paper rounded-[20px] p-8 md:p-[52px] grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-[52px]">
          <div>
            <EyebrowLabel tone="paper" className="!text-[#F4A261]">
              Reality check
            </EyebrowLabel>
            <h2 className="mt-3 font-sans text-[32px] md:text-[40px] m-0 tracking-[-0.03em] leading-[1.05] font-medium">
              {content.reality.title}{' '}
              <ItalicWord color="#F4A261">{content.reality.italic}</ItalicWord>
            </h2>
          </div>
          <div className="text-[15px] md:text-[16px] leading-[1.6]" style={{ color: 'rgba(251,246,236,0.82)' }}>
            {content.reality.body.map((p, i) => (
              <p key={i} className="m-0 mb-3.5 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Monetization paths */}
      <section id="levers" className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-6 pb-6">
        <SectionMarker numeral="i" heading="Monetization paths.">
          <p className="text-[16px] text-ink-soft leading-[1.55] max-w-[700px] m-0">
            Ranked by how much revenue they realistically add for a {content.titleLower} making ~100k views/month. Stack 2-3 of these, not all of them.
          </p>
        </SectionMarker>
      </section>
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-7 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {content.levers.map((lever, i) => (
            <div
              key={`${lever.title}-${i}`}
              className="bg-white border border-line rounded-[20px] p-8 hover:border-brand-primaryDeep hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-baseline gap-[18px] mb-3.5">
                <span className="font-serif italic text-brand-primary text-[46px] leading-[0.9] min-w-[40px]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="text-[22px] font-semibold tracking-[-0.01em] text-ink">{lever.title}</div>
                  <div className="mt-1">
                    <DataPill variant="tag">{lever.tag}</DataPill>
                  </div>
                </div>
              </div>
              <p className="text-[14px] text-ink-soft leading-[1.6] m-0 mb-4.5">{lever.body}</p>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-line">
                <div>
                  <EyebrowLabel tone="inkSoft" className="block mb-1">Typical add</EyebrowLabel>
                  <div className="font-mono text-[15px] font-semibold text-ink">{lever.typical}</div>
                </div>
                <div>
                  <EyebrowLabel tone="inkSoft" className="block mb-2">Effort</EyebrowLabel>
                  <EffortDots count={lever.effort} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools stack */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-6">
        <SectionMarker numeral="ii" heading="Tools we actually recommend.">
          <p className="text-[16px] text-ink-soft leading-[1.55] max-w-[700px] m-0">
            Nothing here is pay-to-play. If a tool is in this list, it is because creators we interviewed use it.
          </p>
        </SectionMarker>
      </section>
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-6 pb-14">
        <div className="bg-white border border-line rounded-[20px] overflow-hidden">
          <div className="hidden md:grid grid-cols-[1.4fr_1fr_1fr_0.8fr] px-7 py-[14px] bg-soft">
            <EyebrowLabel tone="deep">Tool</EyebrowLabel>
            <EyebrowLabel tone="deep">Category</EyebrowLabel>
            <EyebrowLabel tone="deep">Pricing</EyebrowLabel>
            <EyebrowLabel tone="deep" className="text-right">Our take</EyebrowLabel>
          </div>
          {content.toolRows.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-2 md:gap-0 px-6 md:px-7 py-[18px] border-t border-line items-start md:items-center"
            >
              <div>
                <div className="text-[15px] font-semibold text-ink">{t.name}</div>
                <div className="text-[12px] text-ink-soft mt-1">{t.desc}</div>
              </div>
              <div className="text-[13px] text-ink-soft">{t.cat}</div>
              <div className="font-mono text-[13px] text-ink">{t.price}</div>
              <div className="md:text-right">
                <TakePill take={t.take} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Month-one plan */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-6 pb-4">
        <SectionMarker numeral="iii" heading="Month-one action plan." />
      </section>
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] pt-7 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.plan.map((week, i) => (
            <div
              key={`week-${i}`}
              className="bg-white border border-line rounded-[18px] p-6 flex flex-col"
            >
              <EyebrowLabel tone="deep" className="mb-3">Week {i + 1}</EyebrowLabel>
              <div className="text-[18px] font-semibold tracking-[-0.01em] leading-[1.2] text-ink mb-3.5">
                {week.title}
              </div>
              <ul className="m-0 p-0 list-none flex flex-col gap-2">
                {week.tasks.map((t, j) => (
                  <li key={j} className="flex gap-2.5 text-[13px] text-ink-soft leading-[1.5]">
                    <span
                      aria-hidden
                      className="w-[14px] h-[14px] rounded-[3px] border-[1.5px] border-brand-primary mt-[3px] flex-shrink-0"
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-[52px] py-10">
        <h2 className="font-sans text-[32px] md:text-[40px] m-0 mb-7 tracking-[-0.03em] font-medium text-ink">
          Common <ItalicWord color="#C2622A">questions</ItalicWord>.
        </h2>
        <div className="bg-white border border-line rounded-[18px] overflow-hidden">
          {content.faq.map((f, i) => (
            <details
              key={`faq-${i}`}
              className={
                'group ' + (i === 0 ? '' : 'border-t border-line')
              }
            >
              <summary className="px-7 py-[22px] cursor-pointer font-semibold text-[16px] text-ink list-none flex justify-between items-center">
                <span>{f.q}</span>
                <span className="font-serif italic text-brand-primaryDeep text-[24px] group-open:rotate-45 transition-transform duration-200">
                  +
                </span>
              </summary>
              <div className="px-7 pb-6 text-[15px] text-ink-soft leading-[1.65]">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Related niches */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[52px] py-10">
        <EyebrowLabel tone="deep" className="mb-4 block">Related niches</EyebrowLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedDetail.map((r) => (
            <Link
              key={r.slug}
              href={`/niche/${r.slug}`}
              className="bg-white border border-line rounded-[18px] p-5 flex items-center gap-4 hover:border-brand-primaryDeep hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-14 h-14 bg-soft rounded-[10px] overflow-hidden flex-shrink-0 relative">
                <Image
                  src={r.heroImage}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-ink">{r.name}</div>
                <div className="text-[12px] text-ink-soft mt-0.5">{r.tag}</div>
              </div>
              <ChevronRight className="ml-auto w-5 h-5 text-brand-primaryDeep" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      {/* Email capture */}
      <EmailCapture
        headline={`Get the ${nicheLabel.toLowerCase()} monetization breakdown`}
        subheadline="RPM ranges, best content formats, and monetization paths for your niche. Free."
        cta="Send It to Me"
        showImage={false}
      />
    </div>
  )
}
