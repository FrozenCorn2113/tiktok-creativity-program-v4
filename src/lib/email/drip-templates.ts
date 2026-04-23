/**
 * TCP drip email templates (days 2, 5, 8, 12).
 *
 * Source copy: content/email-sequences/welcome-sequence.md
 * Each builder composes body HTML via the shared shell module helpers and
 * wraps with `renderEmailShell`. Subject lines are verbatim from the sequence
 * doc. No lead-magnet branching in v1.
 */

import {
  renderEmailShell,
  bodyText,
  calloutBox,
  bulletList,
  SITE_URL,
} from './template-shell'

interface BuiltEmail {
  subject: string
  html: string
  text: string
}

interface BuildDripOptions {
  /** Subscriber email (used for unsubscribe link). */
  email: string | null
  /** Which day of the sequence: 2, 5, 8, or 12. */
  day: 2 | 5 | 8 | 12
  /** Reserved for future segmentation (Phase 3). Unused in v1. */
  leadMagnet?: string | null
}

function inlineLink(url: string, label: string): string {
  return `<a href="${url}" style="color:#0B0F1A;font-weight:700;text-decoration:underline;">${label}</a>`
}

function buildDay2(email: string | null): BuiltEmail {
  const subject = 'The mistake that tanks most new Creator Rewards earnings'
  const preheader = "It's not your content. It's what you're measuring."

  const qualifiedGuideUrl = `${SITE_URL}/guides/qualified-views-not-counting`

  const body = [
    bodyText(
      'Here is what I see happen constantly with creators who just got into the Rewards Program:'
    ),
    bodyText(
      'They check their total view count, see a decent number, and expect a proportional payout. Then the payout shows up and it is a fraction of what they calculated.'
    ),
    bodyText(
      'The disconnect is almost always the same thing: they are looking at total views, not qualified views.'
    ),
    bodyText('Qualified views are the only views that count toward your earnings. A view only qualifies when:'),
    bulletList([
      'The video is 1+ minute long',
      'The viewer watches a meaningful portion',
      'The view comes from an eligible region (US, UK, Germany, France, Japan, South Korea, Brazil, or Mexico)',
    ]),
    bodyText(
      'Everything else is invisible to the Rewards algorithm. A video with 200K total views might have 40K qualified views. That gap is where the confusion lives.'
    ),
    bodyText(
      `<strong>What to do right now:</strong> Open Creator Studio, go to Creator Rewards analytics, and look at your qualified view count. Compare it to your total views. If there is a big gap, the guide below walks through exactly why and what to fix: ${inlineLink(qualifiedGuideUrl, 'Why Your TikTok Views Are Not Counting as Qualified')}.`
    ),
    calloutBox(
      'One number to remember:',
      'Videos where viewers stay past the 60-second mark see 40-60% higher RPM than content with fast drop-off. Retention is the single heaviest factor in what TikTok pays you.'
    ),
  ].join('\n')

  const html = renderEmailShell({
    preheader,
    body,
    cta: {
      text: 'Read the Qualified Views Guide',
      url: qualifiedGuideUrl,
    },
    footer: { email },
    title: subject,
  })

  const text = [
    'Here is what I see happen constantly with creators who just got into the Rewards Program:',
    '',
    'They check their total view count, see a decent number, and expect a proportional payout. Then the payout shows up and it is a fraction of what they calculated.',
    '',
    'The disconnect is almost always the same thing: they are looking at total views, not qualified views.',
    '',
    'Qualified views are the only views that count toward your earnings. A view only qualifies when:',
    '- The video is 1+ minute long',
    '- The viewer watches a meaningful portion',
    '- The view comes from an eligible region (US, UK, Germany, France, Japan, South Korea, Brazil, or Mexico)',
    '',
    'What to do right now: Open Creator Studio, go to Creator Rewards analytics, and look at your qualified view count. Compare it to your total views.',
    '',
    `Read the full guide: ${qualifiedGuideUrl}`,
    '',
    'One number to remember: videos where viewers stay past the 60-second mark see 40-60% higher RPM than content with fast drop-off.',
    '',
    '--',
    'TikTok Creativity Program',
    `Unsubscribe: ${SITE_URL}/unsubscribe${email ? `?email=${encodeURIComponent(email)}` : ''}`,
  ].join('\n')

  return { subject, html, text }
}

function buildDay5(email: string | null): BuiltEmail {
  const subject = 'How to earn more from the same number of views'
  const preheader = 'Your niche sets the ceiling. These 4 things determine where you land.'

  const rpmGuideUrl = `${SITE_URL}/guides/optimize-rpm`
  const calculatorUrl = `${SITE_URL}/calculators/earnings-calculator`

  const body = [
    bodyText(
      'Two creators both hit 500,000 qualified views last month. One earned $475. The other earned $110. Same platform, same view count.'
    ),
    bodyText(
      'The difference is RPM (revenue per 1,000 qualified views), and it varies wildly depending on four things:'
    ),
    bodyText(
      '<strong>Watch time.</strong> Heaviest factor. Completion rates above 80% separate top earners from average. If viewers drop off in the first 15 seconds, your RPM takes a hit regardless of your niche.'
    ),
    bodyText(
      '<strong>Originality.</strong> Original footage, audio, and perspective score highest. Duets, Stitches, and repurposed content earn zero or near-zero.'
    ),
    bodyText(
      '<strong>Search value.</strong> Videos that answer specific search queries earn 2-5x the RPM of FYP-only content. "How to edit TikTok videos for beginners" beats "Watch me edit this" because search viewers have intent, and advertisers pay more to reach them.'
    ),
    bodyText(
      '<strong>Engagement quality.</strong> Saves and shares count more than likes. Real comment threads beat emoji strings.'
    ),
    bodyText(
      'Your niche sets the ceiling on all of this. Finance creators earn roughly $1.00-$2.30 per 1K views. Comedy sits at $0.25-$0.60. You downloaded the full niche breakdown in the RPM cheat sheet, so you already have those numbers.'
    ),
    bodyText(
      'The highest-leverage move for most creators: focus on retention first, because it affects both your qualified view rate AND your RPM at the same time.'
    ),
    bodyText(`The full optimization playbook is here: ${inlineLink(rpmGuideUrl, 'How to Optimize Your TikTok RPM')}.`),
    bodyText(
      `And if you want to model what different RPM rates mean for your actual earnings: ${inlineLink(calculatorUrl, 'Earnings Calculator')}.`
    ),
  ].join('\n')

  const html = renderEmailShell({
    preheader,
    body,
    cta: {
      text: 'Read the RPM Optimization Guide',
      url: rpmGuideUrl,
    },
    footer: { email },
    title: subject,
  })

  const text = [
    'Two creators both hit 500,000 qualified views last month. One earned $475. The other earned $110. Same platform, same view count.',
    '',
    'The difference is RPM (revenue per 1,000 qualified views), and it varies wildly depending on four things:',
    '',
    'Watch time. Heaviest factor. Completion rates above 80% separate top earners from average.',
    '',
    'Originality. Original footage, audio, and perspective score highest. Duets, Stitches, and repurposed content earn zero or near-zero.',
    '',
    'Search value. Videos that answer specific search queries earn 2-5x the RPM of FYP-only content.',
    '',
    'Engagement quality. Saves and shares count more than likes.',
    '',
    'Your niche sets the ceiling. Finance creators earn roughly $1.00-$2.30 per 1K views. Comedy sits at $0.25-$0.60.',
    '',
    `Full playbook: ${rpmGuideUrl}`,
    `Earnings calculator: ${calculatorUrl}`,
    '',
    '--',
    'TikTok Creativity Program',
    `Unsubscribe: ${SITE_URL}/unsubscribe${email ? `?email=${encodeURIComponent(email)}` : ''}`,
  ].join('\n')

  return { subject, html, text }
}

function buildDay8(email: string | null): BuiltEmail {
  const subject = 'Creator Rewards is one income stream. Here are the others.'
  const preheader = "The creators earning $5K-$10K/month aren't relying on RPM alone."

  const monetizationGuideUrl = `${SITE_URL}/guides/best-monetization-methods`
  const brandDealsGuideUrl = `${SITE_URL}/guides/brand-deals-small-creator`
  const kitAffiliateUrl = 'https://partners.kit.com/o474ub5e1gtu'

  const body = [
    bodyText(
      'Creator Rewards pays based on views. That is useful, but it has a ceiling. RPM rates fluctuate, qualified view thresholds cut into your total, and January payouts drop 40-60% from December peaks every year.'
    ),
    bodyText(
      'The creators who build real income from TikTok are stacking multiple streams. Here is what actually works at different stages:'
    ),
    bodyText('<strong>Under 10K followers:</strong>'),
    bulletList([
      'Affiliate marketing (product links in bio, no follower minimum for most programs)',
      'Digital products (templates, cheat sheets, mini-guides sold through your link-in-bio)',
      'Clipping services for other creators',
    ]),
    bodyText('<strong>10K-50K followers:</strong>'),
    bulletList([
      'Creator Rewards (you are here)',
      'Brand deals (micro-influencer rates: $200-$2,000 per post)',
      'Email list monetization',
    ]),
    bodyText('<strong>50K+ followers:</strong>'),
    bulletList([
      'All of the above, plus higher brand deal rates',
      'TikTok LIVE gifts',
      'TikTok Shop affiliate commissions',
      'Course or membership products',
    ]),
    bodyText(
      `The monetization methods guide ranks every option by effort, timeline, and earning potential: ${inlineLink(monetizationGuideUrl, 'Best TikTok Monetization Methods Ranked')}.`
    ),
    bodyText(
      `One thing worth setting up early regardless of your follower count: an email list. Social algorithms do not guarantee your followers see your posts. An email list does. ${inlineLink(kitAffiliateUrl, 'Kit')} is what most creators start with because the free tier handles up to 10,000 subscribers and includes automation.`
    ),
    calloutBox(
      'Affiliate disclosure:',
      'The Kit link above is an affiliate link. If you sign up through it, we earn a commission at no extra cost to you.'
    ),
    bodyText(
      `The brand deals guide covers how to land paid partnerships even with a smaller audience: ${inlineLink(brandDealsGuideUrl, 'How to Get Brand Deals as a Small TikTok Creator')}.`
    ),
  ].join('\n')

  const html = renderEmailShell({
    preheader,
    body,
    cta: {
      text: 'See All Monetization Methods',
      url: monetizationGuideUrl,
    },
    footer: { email },
    title: subject,
  })

  const text = [
    'Creator Rewards pays based on views. That is useful, but it has a ceiling. RPM rates fluctuate, qualified view thresholds cut into your total, and January payouts drop 40-60% from December peaks every year.',
    '',
    'The creators who build real income from TikTok are stacking multiple streams.',
    '',
    'Under 10K followers: affiliate marketing, digital products, clipping services.',
    '10K-50K: Creator Rewards, brand deals ($200-$2,000/post), email list monetization.',
    '50K+: higher brand rates, LIVE gifts, TikTok Shop affiliate, courses or memberships.',
    '',
    `Monetization methods ranked: ${monetizationGuideUrl}`,
    `Brand deals guide: ${brandDealsGuideUrl}`,
    '',
    `Set up an email list early. Kit is a common starting point: ${kitAffiliateUrl}`,
    '(Affiliate link. We earn a commission at no extra cost to you.)',
    '',
    '--',
    'TikTok Creativity Program',
    `Unsubscribe: ${SITE_URL}/unsubscribe${email ? `?email=${encodeURIComponent(email)}` : ''}`,
  ].join('\n')

  return { subject, html, text }
}

function buildDay12(email: string | null): BuiltEmail {
  const subject = 'Your next 3 moves (based on where you are)'
  const preheader = "Skip the noise. Here's what matters at your stage."

  const eligibilityUrl = `${SITE_URL}/guides/eligibility-requirements`
  const growthUrl = `${SITE_URL}/guides/get-10000-followers-tiktok-2026`
  const applyUrl = `${SITE_URL}/guides/how-to-join-creativity-program`
  const rpmUrl = `${SITE_URL}/guides/optimize-rpm`
  const calculatorUrl = `${SITE_URL}/calculators/earnings-calculator`
  const rpmNicheUrl = `${SITE_URL}/guides/tiktok-rpm-by-niche-2026`
  const monetizationUrl = `${SITE_URL}/guides/best-monetization-methods`
  const brandDealsUrl = `${SITE_URL}/guides/brand-deals-small-creator`
  const multipleStreamsUrl = `${SITE_URL}/guides/multiple-revenue-streams`

  const body = [
    bodyText(
      'Last email in this series. I want to make it useful, so here is a quick roadmap based on where you probably are right now.'
    ),
    bodyText('<strong>If you are still working toward Creator Rewards eligibility:</strong>'),
    bulletList([
      `${inlineLink(eligibilityUrl, 'Eligibility Requirements Checklist')} - confirm every box is checked before you apply`,
      `${inlineLink(growthUrl, 'How to Grow to 10K Followers')} - organic growth tactics that actually work`,
      `${inlineLink(applyUrl, 'How to Join the Creator Rewards Program')} - step-by-step application walkthrough`,
    ]),
    bodyText('<strong>If you are already in the program and want to earn more:</strong>'),
    bulletList([
      `${inlineLink(rpmUrl, 'RPM Optimization Guide')} - the 4 levers that move your rate`,
      `${inlineLink(calculatorUrl, 'Earnings Calculator')} - model what your views should be generating`,
      `${inlineLink(rpmNicheUrl, 'RPM by Niche Breakdown')} - where your niche sits and how to push higher`,
    ]),
    bodyText('<strong>If you want to build beyond Creator Rewards:</strong>'),
    bulletList([
      `${inlineLink(monetizationUrl, 'Best Monetization Methods Ranked')} - every option compared`,
      `${inlineLink(brandDealsUrl, 'Brand Deals for Small Creators')} - how to land partnerships before you are "big"`,
      `${inlineLink(multipleStreamsUrl, 'Multiple Revenue Streams Guide')} - the stacking strategy`,
    ]),
    bodyText(
      `The site has 100+ guides covering everything from algorithm changes to tax filing to niche-specific monetization. Browse by topic: ${inlineLink(SITE_URL, 'tiktokcreativityprogram.com')}.`
    ),
    calloutBox(
      'One last thing:',
      'if there is a topic the site does not cover well, reply to this email and tell me. The most useful guides I have written came from questions like yours.'
    ),
    bodyText('Thanks for reading.'),
  ].join('\n')

  const html = renderEmailShell({
    preheader,
    body,
    cta: {
      text: 'Browse All Guides',
      url: `${SITE_URL}/guides`,
    },
    footer: { email },
    title: subject,
  })

  const text = [
    'Last email in this series. Here is a quick roadmap based on where you probably are right now.',
    '',
    'If you are still working toward Creator Rewards eligibility:',
    `- ${eligibilityUrl}`,
    `- ${growthUrl}`,
    `- ${applyUrl}`,
    '',
    'If you are already in the program and want to earn more:',
    `- ${rpmUrl}`,
    `- ${calculatorUrl}`,
    `- ${rpmNicheUrl}`,
    '',
    'If you want to build beyond Creator Rewards:',
    `- ${monetizationUrl}`,
    `- ${brandDealsUrl}`,
    `- ${multipleStreamsUrl}`,
    '',
    `Browse all guides: ${SITE_URL}`,
    '',
    'If there is a topic the site does not cover well, reply to this email and tell me.',
    '',
    'Thanks for reading.',
    '',
    '--',
    'TikTok Creativity Program',
    `Unsubscribe: ${SITE_URL}/unsubscribe${email ? `?email=${encodeURIComponent(email)}` : ''}`,
  ].join('\n')

  return { subject, html, text }
}

/**
 * Public factory. Dispatches to the day-specific builder.
 */
export function buildDripEmail(options: BuildDripOptions): BuiltEmail {
  const { day, email } = options
  switch (day) {
    case 2:
      return buildDay2(email)
    case 5:
      return buildDay5(email)
    case 8:
      return buildDay8(email)
    case 12:
      return buildDay12(email)
    default: {
      const exhaustive: never = day
      throw new Error(`Unknown drip day: ${String(exhaustive)}`)
    }
  }
}

export { buildDay2, buildDay5, buildDay8, buildDay12 }
