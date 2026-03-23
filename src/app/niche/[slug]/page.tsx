import Container from '@/components/ui/Container'
import PageHeader from '@/components/PageHeader'
import CalloutBox from '@/components/CalloutBox'
import EmailSignupForm from '@/components/EmailSignupForm'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { ChevronRight, BookOpen, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type NicheData = {
  title: string
  description: string
  focus: string[]
  strategy: { heading: string; body: string }[]
  ultimateGuide: { slug: string; label: string }
  relatedGuides: { label: string; href: string }[]
  rpmNote: string
}

const nicheContent: Record<string, NicheData> = {
  musicians: {
    title: 'Monetization for musicians on TikTok',
    description:
      'Grow plays, drive streams, and stack revenue beyond Creator Rewards with music-friendly income streams.',
    focus: ['Promote music links', 'Sync licensing', 'Live gifts + tips', 'Brand deals'],
    strategy: [
      {
        heading: 'Creator Rewards as a base, not a ceiling',
        body: 'Creator Rewards pays per qualified view — for musicians, that means longer-form music content (60 seconds plus) outperforms quick clips. Tutorial-style videos about your process, songwriting behind-the-scenes, and equipment walkthroughs tend to hit qualified view thresholds better than 15-second track previews.',
      },
      {
        heading: 'Drive streams, not just views',
        body: 'The link-in-bio is your most underused asset. Every video should have a purpose beyond the view count. Use Stan Store or a simple Linktree to send fans to your streaming profiles, music merch, or a "name your price" digital download. Even 0.1% of your monthly TikTok views converting to Spotify saves adds up fast.',
      },
      {
        heading: 'Live gifts as a real income stream',
        body: 'TikTok Live gifts are underrated for musicians. A live performance session — even 20 minutes — with genuine audience interaction can generate more per hour than Creator Rewards on a similar-sized audience. Combine live gifts with Creator Rewards to diversify.',
      },
    ],
    ultimateGuide: {
      slug: 'ultimate-music-guide',
      label: 'Ultimate TikTok Monetization Guide for Musicians',
    },
    relatedGuides: [
      { label: 'TikTok Creator Rewards 2026 Guide', href: '/guides/creator-rewards-2026' },
      { label: 'Growing from 5K to 10K followers', href: '/guides/grow-5k-to-10k' },
      { label: 'Best Monetization Methods for Creators', href: '/guides/best-monetization-methods' },
      { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
    ],
    rpmNote:
      'Music content RPMs typically range from $0.20–$0.80 depending on audience region and video length. US-based audiences watching 1-minute-plus music tutorial content trends toward the higher end.',
  },
  teachers: {
    title: 'Monetization for teachers and educators',
    description:
      'Build authority, sell lesson resources, and keep your account compliant with Creator Rewards.',
    focus: ['Course funnel', 'Affiliate tools', 'Community memberships', 'Lead magnets'],
    strategy: [
      {
        heading: 'Education content is high-RPM',
        body: 'Education niches consistently rank among the highest-RPM categories on TikTok. Advertiser demand for engaged, trust-forward audiences is strong. The key is content that answers specific, searchable questions — not broad motivational content. "How to memorize vocabulary" outperforms "study tips" in both qualified views and RPM.',
      },
      {
        heading: 'Sell the resource, not just the lesson',
        body: 'Teachers who monetize well on TikTok use the platform as top-of-funnel content and convert viewers into buyers of digital resources: templates, lesson packs, worksheets, mini-courses. Platforms like Stan Store and Gumroad make this technically simple. One $12 worksheet sold to 0.5% of your monthly unique viewers adds up fast.',
      },
      {
        heading: 'Email list as your real asset',
        body: 'TikTok accounts get suspended, algorithms change. An email list of students or parents who trust you is the most durable asset a teacher creator can build. Use every video to offer a free resource in exchange for an email — a study guide, a template, a quiz. Kit (formerly ConvertKit) handles this well at the free tier.',
      },
    ],
    ultimateGuide: {
      slug: 'ultimate-educators-guide',
      label: 'Ultimate TikTok Monetization Guide for Educators',
    },
    relatedGuides: [
      { label: 'TikTok Creator Rewards 2026 Guide', href: '/guides/creator-rewards-2026' },
      { label: 'Additional Reward Criteria', href: '/guides/additional-reward-criteria-2026' },
      { label: 'Multiple Revenue Streams', href: '/guides/multiple-revenue-streams' },
      { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
    ],
    rpmNote:
      'Education content RPMs often range from $0.40–$1.20 in US markets, making it one of the higher-value niches for Creator Rewards.',
  },
  'fitness-creators': {
    title: 'Monetization for fitness creators',
    description:
      'Earn from high-retention workout content, programs, and affiliate tools built for creators.',
    focus: ['Workout plans', 'Affiliate supplements', 'Program upsells', 'Live sessions'],
    strategy: [
      {
        heading: 'Workout content earns strong retention',
        body: 'Follow-along workout videos have naturally high watch times — viewers stay because they are actively participating. This is one of the cleanest paths to qualified views in the Creator Rewards program. A 3-minute workout tutorial with clear instruction retains far better than a transformation clip.',
      },
      {
        heading: 'Supplements and gear have real affiliate potential',
        body: 'Fitness is one of the highest-commission affiliate categories available. Supplement brands, fitness equipment, and apparel all run affiliate programs. Mavely, Amazon Associates, and direct brand deals are common paths. A single genuine recommendation in a well-viewed video can outperform weeks of Creator Rewards.',
      },
      {
        heading: 'Sell a program, not individual advice',
        body: 'Fitness creators who earn consistently from TikTok have a product: a 4-week plan, a challenge, a recipe + workout bundle. Stan Store makes it easy to sell digital products without a website. Your TikTok content becomes the top of funnel for your program sales.',
      },
    ],
    ultimateGuide: {
      slug: 'ultimate-fitness-guide',
      label: 'Ultimate TikTok Monetization Guide for Fitness Creators',
    },
    relatedGuides: [
      { label: 'Growing from 5K to 10K followers', href: '/guides/grow-5k-to-10k' },
      { label: 'Additional Reward Criteria', href: '/guides/additional-reward-criteria-2026' },
      { label: 'Best Monetization Methods', href: '/guides/best-monetization-methods' },
      { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
    ],
    rpmNote:
      'Fitness content RPMs typically range from $0.25–$0.70. Long-form workout tutorials (3+ minutes) with US audiences trend toward the higher end.',
  },
  artists: {
    title: 'Monetization for artists and illustrators',
    description:
      'Showcase process videos, sell prints, and turn engagement into predictable income.',
    focus: ['Print sales', 'Commissions', 'Process content', 'Behind-the-scenes'],
    strategy: [
      {
        heading: 'Process content is your best Creator Rewards asset',
        body: 'Time-lapse and real-time drawing or painting videos have strong watch-time retention — viewers are naturally curious about how a piece develops. A 60-90 second process video showing a full illustration from sketch to final piece hits qualified view thresholds consistently. This is one of the most reliable content formats for artist creators on Creator Rewards.',
      },
      {
        heading: 'Prints and digital files are the easiest first product',
        body: 'Etsy, Gumroad, and Stan Store all support digital file sales. A $10 print or $5 desktop wallpaper sold to 1% of your monthly unique viewers can exceed your Creator Rewards income. The content creates the demand — you just need a simple place to sell.',
      },
      {
        heading: 'Commission funnels work at any follower count',
        body: 'Dedicated commission content — videos showing the commission process, client reveals, before-and-afters — builds a waiting list organically. Even 1K-follower artists regularly book commissions from TikTok when the content clearly shows what they create and how to hire them.',
      },
    ],
    ultimateGuide: {
      slug: 'ultimate-artists-guide',
      label: 'Ultimate TikTok Monetization Guide for Artists',
    },
    relatedGuides: [
      { label: 'TikTok Creator Rewards 2026 Guide', href: '/guides/creator-rewards-2026' },
      { label: 'Canada Monetization Without Rewards', href: '/guides/canada-without-rewards' },
      { label: 'Multiple Revenue Streams', href: '/guides/multiple-revenue-streams' },
      { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
    ],
    rpmNote:
      'Art and illustration content RPMs range from $0.15–$0.55. Process videos with tutorial-style narration trend higher than silent time-lapses.',
  },
}

export async function generateStaticParams() {
  return Object.keys(nicheContent).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const content = nicheContent[params.slug]
  if (!content) return {}

  return buildMetadata({
    title: content.title,
    description: content.description,
    path: `/niche/${params.slug}`,
  })
}

export default function NichePage({ params }: { params: { slug: string } }) {
  const content = nicheContent[params.slug]

  if (!content) notFound()

  return (
    <>
      {/* Header */}
      <section className="bg-background-warm py-12">
        <Container>
          <nav className="flex items-center gap-2 text-xs text-text-muted mb-6">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <ChevronRight className="w-3 h-3" aria-hidden />
            <Link href="/niche" className="hover:text-brand-primary">Niches</Link>
            <ChevronRight className="w-3 h-3" aria-hidden />
            <span className="text-text-primary">{content.title}</span>
          </nav>
          <PageHeader
            title={content.title}
            description={content.description}
          />
        </Container>
      </section>

      {/* Main content */}
      <section className="bg-white py-12">
        <Container>
          <div className="mx-auto max-w-2xl space-y-10">

            {/* Focus areas */}
            <div className="rounded-xl border border-border-default bg-white p-6">
              <h2 className="text-lg font-bold text-brand-ink mb-4">
                What to focus on right now
              </h2>
              <ul className="space-y-2">
                {content.focus.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategy sections */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-brand-ink">Strategy for {content.title.toLowerCase().replace('monetization for ', '')}</h2>
              {content.strategy.map((section) => (
                <div key={section.heading} className="rounded-xl border border-border-default bg-white p-6">
                  <h3 className="text-base font-bold text-brand-ink mb-3">{section.heading}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>

            {/* RPM note */}
            <CalloutBox type="info">
              <strong>RPM data:</strong> {content.rpmNote}
            </CalloutBox>

            {/* Ultimate guide CTA */}
            <div className="rounded-xl border-2 border-brand-primary/30 bg-brand-primarySoft p-6">
              <Badge className="mb-3 bg-brand-primary/10 text-brand-primaryDeep border-brand-primary/30 text-xs font-semibold">
                <BookOpen className="w-3 h-3 mr-1" aria-hidden />
                Ultimate Guide
              </Badge>
              <h3 className="text-base font-bold text-brand-ink mb-2">
                {content.ultimateGuide.label}
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                The full strategy playbook for this creator type — eligibility, RPM optimization, additional income streams, and a month-one action plan.
              </p>
              <Link
                href={`/guides/${content.ultimateGuide.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-primaryDeep hover:underline"
              >
                Read the full guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Email capture */}
            <EmailSignupForm variant="inline" />

            {/* Related links */}
            <div className="rounded-xl border border-border-default bg-background-warm p-6">
              <h3 className="text-base font-bold text-brand-ink mb-4">
                Next steps
              </h3>
              <ul className="space-y-2">
                {content.relatedGuides.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm font-semibold text-brand-primaryDeep hover:underline"
                    >
                      {link.label} <ChevronRight className="w-3.5 h-3.5" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </Container>
      </section>
    </>
  )
}
