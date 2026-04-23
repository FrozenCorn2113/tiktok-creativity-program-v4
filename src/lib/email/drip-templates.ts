/**
 * TCP drip email templates (days 2, 5, 8, 12).
 *
 * Source copy: content/email-sequences/welcome-sequence-v2.md
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
  const subject = 'The number creators ignore after joining Creator Rewards'
  const preheader =
    'Total views and qualified views are not the same thing. The gap is where the money goes missing.'

  const qualifiedGuideUrl = `${SITE_URL}/guides/qualified-views-not-counting`

  const body = [
    bodyText(
      'A lot of creators join the Rewards Program, check their analytics the next day, and feel like something is broken.'
    ),
    bodyText('The views are there. The payout is not.'),
    bodyText(
      'The disconnect is almost always the same: they are tracking total views. TikTok pays on qualified views only.'
    ),
    bodyText('A view qualifies when three things are true at once:'),
    bulletList([
      'The video is at least 1 minute long',
      'The viewer watches a meaningful portion of it',
      'The view originates from an eligible region (US, UK, Germany, France, Japan, South Korea, Brazil, or Mexico)',
    ]),
    bodyText(
      'Everything outside those conditions is invisible to the Rewards algorithm. A video with 200K total views can have 40K qualified views. That gap is where the confusion lives.'
    ),
    bodyText(
      `<strong>One benchmark to know:</strong> If your qualified views are under 60% of your total views, that ratio is costing you money. Most accounts land between 45-70% early on. The guide below explains the biggest causes and the fixes that actually move the number: ${inlineLink(qualifiedGuideUrl, 'Why Your TikTok Views Are Not Counting as Qualified')}.`
    ),
    calloutBox(
      'P.S.',
      'Before I send the next one: what is the biggest thing you are trying to figure out with Creator Rewards right now? Just reply with one sentence. I read every reply and it shapes what I write.'
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
    'A lot of creators join the Rewards Program, check their analytics the next day, and feel like something is broken.',
    '',
    'The views are there. The payout is not.',
    '',
    'The disconnect is almost always the same: they are tracking total views. TikTok pays on qualified views only.',
    '',
    'A view qualifies when three things are true at once:',
    '- The video is at least 1 minute long',
    '- The viewer watches a meaningful portion of it',
    '- The view originates from an eligible region (US, UK, Germany, France, Japan, South Korea, Brazil, or Mexico)',
    '',
    'Everything outside those conditions is invisible to the Rewards algorithm. A video with 200K total views can have 40K qualified views.',
    '',
    'One benchmark to know: if your qualified views are under 60% of your total views, that ratio is costing you money. Most accounts land between 45-70% early on.',
    '',
    `Read the full guide: ${qualifiedGuideUrl}`,
    '',
    'P.S. Before I send the next one: what is the biggest thing you are trying to figure out with Creator Rewards right now? Just reply with one sentence. I read every reply and it shapes what I write.',
    '',
    '--',
    'TikTok Creativity Program',
    `Unsubscribe: ${SITE_URL}/unsubscribe${email ? `?email=${encodeURIComponent(email)}` : ''}`,
  ].join('\n')

  return { subject, html, text }
}

function buildDay5(email: string | null): BuiltEmail {
  const subject = 'Same views, different paycheck. Here is why.'
  const preheader = 'Two creators, 500K qualified views each. One earns $475. The other earns $110.'

  const rpmGuideUrl = `${SITE_URL}/guides/optimize-rpm`
  const calculatorUrl = `${SITE_URL}/calculators/earnings-calculator`

  const body = [
    bodyText('Two creators. Same platform. Same month. Both hit 500,000 qualified views.'),
    bodyText('One earned $475. The other earned $110.'),
    bodyText(
      'Same view count, four times the payout. The difference is RPM: what TikTok pays per 1,000 qualified views. And RPM varies more than most creators expect.'
    ),
    bodyText(
      'The $475 creator was in personal finance. The $110 creator was in comedy. Both made solid content. But their niches set different ceilings, and their retention numbers put them in different positions within those ceilings.'
    ),
    bodyText('Four things determine where you land:'),
    bodyText(
      '<strong>Watch time.</strong> The heaviest factor. When viewers stay past the 60-second mark, RPM climbs. When they drop off in the first 15 seconds, TikTok docks your rate regardless of everything else.'
    ),
    bodyText(
      '<strong>Originality.</strong> Original footage, audio, and framing score highest. Duets, Stitches, and reposted content earn near-zero.'
    ),
    bodyText(
      '<strong>Search value.</strong> Videos that answer a specific question earn 2-5x the RPM of scroll-bait clips. Search viewers have intent. Advertisers pay more to reach them.'
    ),
    bodyText(
      '<strong>Engagement quality.</strong> Saves and shares move the needle. Likes and emoji comments barely register.'
    ),
    bodyText(
      'The highest-leverage move for most creators is retention, because it affects both your qualified view rate and your RPM at the same time. One fix, two outputs.'
    ),
    bodyText(
      `The full breakdown is here, including what to prioritize based on your niche: ${inlineLink(rpmGuideUrl, 'How to Optimize Your TikTok RPM')}.`
    ),
    bodyText(
      `And if you want to run the numbers on what your current views should be generating: ${inlineLink(calculatorUrl, 'Earnings Calculator')}.`
    ),
    calloutBox(
      'P.S.',
      'One question: what is the biggest RPM frustration you are running into right now? Reply with one sentence. Even a "I do not know where to start" is useful to hear.'
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
    'Two creators. Same platform. Same month. Both hit 500,000 qualified views.',
    '',
    'One earned $475. The other earned $110.',
    '',
    'Same view count, four times the payout. The difference is RPM: what TikTok pays per 1,000 qualified views.',
    '',
    'The $475 creator was in personal finance. The $110 creator was in comedy. Both made solid content. But their niches set different ceilings, and their retention numbers put them in different positions within those ceilings.',
    '',
    'Four things determine where you land:',
    '',
    'Watch time. The heaviest factor. When viewers stay past the 60-second mark, RPM climbs.',
    '',
    'Originality. Original footage, audio, and framing score highest. Duets, Stitches, and reposted content earn near-zero.',
    '',
    'Search value. Videos that answer a specific question earn 2-5x the RPM of scroll-bait clips.',
    '',
    'Engagement quality. Saves and shares move the needle. Likes and emoji comments barely register.',
    '',
    'The highest-leverage move for most creators is retention, because it affects both your qualified view rate and your RPM at the same time.',
    '',
    `Full playbook: ${rpmGuideUrl}`,
    `Earnings calculator: ${calculatorUrl}`,
    '',
    'P.S. One question: what is the biggest RPM frustration you are running into right now? Reply with one sentence. Even a "I do not know where to start" is useful to hear.',
    '',
    '--',
    'TikTok Creativity Program',
    `Unsubscribe: ${SITE_URL}/unsubscribe${email ? `?email=${encodeURIComponent(email)}` : ''}`,
  ].join('\n')

  return { subject, html, text }
}

function buildDay8(email: string | null): BuiltEmail {
  const subject = 'Creator Rewards is one income stream. Here are the others.'
  const preheader = 'The creators earning $5K-$10K/month are not relying on RPM alone.'

  const monetizationGuideUrl = `${SITE_URL}/guides/best-monetization-methods`
  const brandDealsGuideUrl = `${SITE_URL}/guides/brand-deals-small-creator`
  const kitAffiliateUrl = 'https://partners.kit.com/o474ub5e1gtu'

  const body = [
    bodyText(
      'Creator Rewards pays on views. That is useful, but it has a ceiling. RPM rates shift quarterly, eligible view thresholds trim your total, and January payouts drop 40-60% from December peaks every year.'
    ),
    bodyText('The creators building real income on TikTok are running multiple streams.'),
    bodyText(
      'One thing that surprises most people: TikTok Shop affiliate commissions have no follower minimum. Creators with under 5K followers can participate without Creator Rewards access at all, and some creators report $100-$400/month in Shop commissions at that stage (estimate, not a guarantee). It is one of the few monetization paths that does not gate you by audience size.'
    ),
    bodyText('Here is what works at each stage:'),
    bodyText('<strong>Under 10K followers:</strong>'),
    bulletList([
      'Affiliate marketing (product links in bio, no follower minimum for most programs)',
      'Digital products (templates, guides, cheat sheets sold through your link-in-bio)',
    ]),
    bodyText('<strong>10K-50K followers:</strong>'),
    bulletList([
      'Creator Rewards (you are here)',
      'Brand deals (micro-influencer rates run $200-$2,000 per post)',
      'Email list monetization',
    ]),
    bodyText('<strong>50K+ followers:</strong>'),
    bulletList([
      'All of the above at higher rates',
      'TikTok LIVE gifts',
      'TikTok Shop affiliate commissions at scale',
      'Course or membership products',
    ]),
    bodyText(
      `One thing worth setting up now regardless of where you are: an email list. TikTok's algorithm does not guarantee your followers see your posts. An email list does. ${inlineLink(kitAffiliateUrl, 'Kit')} is where most creators start because the free tier covers up to 10,000 subscribers and includes automation.`
    ),
    calloutBox(
      'Affiliate disclosure:',
      'The Kit link above is an affiliate link. If you sign up through it, we earn a commission at no extra cost to you.'
    ),
    bodyText(
      `The full monetization guide ranks every option by effort, timeline, and earning potential: ${inlineLink(monetizationGuideUrl, 'Best TikTok Monetization Methods Ranked')}.`
    ),
    bodyText(
      `And if you want specifics on landing brand deals before you are "big": ${inlineLink(brandDealsGuideUrl, 'How to Get Brand Deals as a Small TikTok Creator')}.`
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
    'Creator Rewards pays on views. That is useful, but it has a ceiling. RPM rates shift quarterly, eligible view thresholds trim your total, and January payouts drop 40-60% from December peaks every year.',
    '',
    'The creators building real income on TikTok are running multiple streams.',
    '',
    'One thing that surprises most people: TikTok Shop affiliate commissions have no follower minimum. Creators with under 5K followers can participate without Creator Rewards access at all, and some creators report $100-$400/month in Shop commissions at that stage (estimate, not a guarantee).',
    '',
    'Under 10K followers: affiliate marketing, digital products.',
    '10K-50K: Creator Rewards, brand deals ($200-$2,000/post), email list monetization.',
    '50K+: higher rates across the board, LIVE gifts, TikTok Shop at scale, courses or memberships.',
    '',
    `Set up an email list early. Kit is a common starting point: ${kitAffiliateUrl}`,
    '(Affiliate link. We earn a commission at no extra cost to you.)',
    '',
    `Monetization methods ranked: ${monetizationGuideUrl}`,
    `Brand deals guide: ${brandDealsGuideUrl}`,
    '',
    '--',
    'TikTok Creativity Program',
    `Unsubscribe: ${SITE_URL}/unsubscribe${email ? `?email=${encodeURIComponent(email)}` : ''}`,
  ].join('\n')

  return { subject, html, text }
}

function buildDay12(email: string | null): BuiltEmail {
  const subject = '12 days in. Here is where to go next.'
  const preheader =
    'You know more about how TikTok pays creators than 90% of creators on the platform.'

  const eligibilityUrl = `${SITE_URL}/guides/eligibility-requirements`
  const growthUrl = `${SITE_URL}/guides/get-10000-followers-tiktok-2026`
  const rpmUrl = `${SITE_URL}/guides/optimize-rpm`
  const calculatorUrl = `${SITE_URL}/calculators/earnings-calculator`
  const monetizationUrl = `${SITE_URL}/guides/best-monetization-methods`
  const multipleStreamsUrl = `${SITE_URL}/guides/multiple-revenue-streams`

  const body = [
    bodyText('Over the past 12 days you learned how TikTok actually pays creators.'),
    bodyText(
      'Qualified views vs total views. The ratio that determines whether your analytics match your paycheck. The four RPM levers. Why two creators can post the same number of views and earn four times apart. How to stack income streams so you are not dependent on a single metric that TikTok resets every January.'
    ),
    bodyText(
      'Most creators stumble through Creator Rewards for months before they figure any of that out. You have it now.'
    ),
    bodyText('Here is where to go next, based on where you are:'),
    bodyText('<strong>If you are still working toward eligibility:</strong>'),
    bulletList([
      `${inlineLink(eligibilityUrl, 'Eligibility Requirements Checklist')} - confirm every box before you apply`,
      `${inlineLink(growthUrl, 'How to Grow to 10K Followers')} - growth tactics that move the number`,
    ]),
    bodyText('<strong>If you are in the program and want to earn more:</strong>'),
    bulletList([
      `${inlineLink(rpmUrl, 'RPM Optimization Guide')} - the 4 levers in depth`,
      `${inlineLink(calculatorUrl, 'Earnings Calculator')} - model what your views should generate`,
    ]),
    bodyText('<strong>If you want to build beyond Creator Rewards:</strong>'),
    bulletList([
      `${inlineLink(monetizationUrl, 'Best Monetization Methods Ranked')} - every option compared`,
      `${inlineLink(multipleStreamsUrl, 'Multiple Revenue Streams Guide')} - the stacking playbook`,
    ]),
    bodyText(
      `The site has 122 guides covering everything from algorithm changes to tax filing to niche-specific monetization: ${inlineLink(SITE_URL, 'tiktokcreativityprogram.com')}.`
    ),
    calloutBox(
      'P.S.',
      'Last ask: if there was a $39 advanced playbook with a 12-month content calendar for your niche, an RPM benchmark database, and a rejection decoder, would you buy it? Reply with "yes," "maybe," or "no." No sales pitch. I am deciding whether to build it, and your answer shapes that.'
    ),
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
    'Over the past 12 days you learned how TikTok actually pays creators.',
    '',
    'Qualified views vs total views. The four RPM levers. Why two creators can post the same number of views and earn four times apart. How to stack income streams so you are not dependent on a single metric that TikTok resets every January.',
    '',
    'Most creators stumble through Creator Rewards for months before they figure any of that out. You have it now.',
    '',
    'Here is where to go next, based on where you are:',
    '',
    'If you are still working toward eligibility:',
    `- ${eligibilityUrl}`,
    `- ${growthUrl}`,
    '',
    'If you are in the program and want to earn more:',
    `- ${rpmUrl}`,
    `- ${calculatorUrl}`,
    '',
    'If you want to build beyond Creator Rewards:',
    `- ${monetizationUrl}`,
    `- ${multipleStreamsUrl}`,
    '',
    `Browse all 122 guides: ${SITE_URL}`,
    '',
    'P.S. Last ask: if there was a $39 advanced playbook with a 12-month content calendar for your niche, an RPM benchmark database, and a rejection decoder, would you buy it? Reply with "yes," "maybe," or "no." No sales pitch. I am deciding whether to build it, and your answer shapes that.',
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
