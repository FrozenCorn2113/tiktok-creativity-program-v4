/**
 * Welcome email template.
 *
 * Composes the on-brand shared shell (`renderEmailShell`) with lead-magnet
 * specific delivery content. Subject line and PDF routing preserved from
 * the original template.
 *
 * Behavior preserved:
 *   - Subject line: "Here's your TikTok cheat sheet" when a lead magnet is
 *     known, "Welcome to TikTok Creativity Program" otherwise.
 *   - PDF routing via LEAD_MAGNET_PDF_URLS / LEAD_MAGNET_URLS.
 *   - Unsubscribe link: /unsubscribe?email=encoded via the shell footer.
 *
 * Visual changes (per Vale spec):
 *   - Shell header (wordmark pill + orange accent bar), dark-mode support,
 *     VML+gradient CTA button.
 *   - Primary PDF download is now the shell's single CTA. Secondary PDF
 *     remains an inline text link below the body copy.
 */

import {
  renderEmailShell,
  bodyText,
  calloutBox,
  bulletList,
  SITE_URL,
} from './template-shell'

interface WelcomeEmailOptions {
  /** Subscriber email address (used for unsubscribe link) */
  email?: string | null
  /** Which lead magnet they signed up for */
  leadMagnet?: string | null
  /** Direct download URL or guide URL */
  downloadUrl?: string | null
}

/** Map lead magnet identifiers to their direct PDF download URLs */
const LEAD_MAGNET_PDF_URLS: Record<string, string> = {
  'rpm-cheat-sheet': '/downloads/tcp-creator-rewards-playbook-2026.pdf',
  'RPM Cheat Sheet': '/downloads/tcp-creator-rewards-playbook-2026.pdf',
  'Get the Free RPM Cheat Sheet': '/downloads/tcp-creator-rewards-playbook-2026.pdf',
  'eligibility-checklist': '/downloads/tcp-eligibility-checklist-2026.pdf',
  'Eligibility Checklist': '/downloads/tcp-eligibility-checklist-2026.pdf',
  'Get the Free Creator Rewards Checklist': '/downloads/tcp-eligibility-checklist-2026.pdf',
  'Creator Rewards Checklist': '/downloads/tcp-eligibility-checklist-2026.pdf',
}

/** Map lead magnet identifiers to their landing page URLs (fallback) */
const LEAD_MAGNET_URLS: Record<string, string> = {
  'rpm-cheat-sheet': '/lead-magnets/rpm-cheat-sheet',
  'RPM Cheat Sheet': '/lead-magnets/rpm-cheat-sheet',
  'Get the Free RPM Cheat Sheet': '/lead-magnets/rpm-cheat-sheet',
  'eligibility-checklist': '/lead-magnets/eligibility-checklist',
  'Eligibility Checklist': '/lead-magnets/eligibility-checklist',
  'Get the Free Creator Rewards Checklist': '/lead-magnets/eligibility-checklist',
  // Legacy mappings
  'RPM Optimization Guide': '/calculators/rpm-by-country',
  'Follower Income Guide': '/calculators/follower-income-estimator',
  'Earnings Calculator Results Guide': '/calculators/earnings-calculator',
  'Earnings Tracker': '/resources/earnings-tracker',
  'Creator Rewards Checklist': '/lead-magnets/eligibility-checklist',
  'Content Planning Template': '/resources/content-planning-template',
  'Viral Video Worksheet': '/resources/viral-video-worksheet',
}

function getDownloadUrl(leadMagnet?: string | null, downloadUrl?: string | null): string {
  if (downloadUrl) return downloadUrl.startsWith('http') ? downloadUrl : `${SITE_URL}${downloadUrl}`
  if (leadMagnet && LEAD_MAGNET_PDF_URLS[leadMagnet]) return `${SITE_URL}${LEAD_MAGNET_PDF_URLS[leadMagnet]}`
  if (leadMagnet && LEAD_MAGNET_URLS[leadMagnet]) return `${SITE_URL}${LEAD_MAGNET_URLS[leadMagnet]}`
  return `${SITE_URL}/guides`
}

function isRpmCheatSheet(leadMagnet?: string | null): boolean {
  if (!leadMagnet) return false
  return leadMagnet.toLowerCase().includes('rpm')
}

function isEligibilityChecklist(leadMagnet?: string | null): boolean {
  if (!leadMagnet) return false
  return leadMagnet.toLowerCase().includes('eligibility') || leadMagnet.toLowerCase().includes('checklist')
}

/** Plain inline text link (secondary PDF reference inside the body). */
function inlineLinkParagraph(label: string, url: string): string {
  return `<p class="card-text" style="margin:0 0 20px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.65;">
    <a href="${url}" style="color:#0B0F1A;font-weight:700;text-decoration:underline;">${label}</a>
  </p>`
}

export function buildWelcomeEmail(options: WelcomeEmailOptions = {}): {
  subject: string
  html: string
} {
  const { email, leadMagnet, downloadUrl: overrideUrl } = options

  const subject = leadMagnet
    ? "Here's your TikTok cheat sheet"
    : 'Welcome to TikTok Creativity Program'

  const preheader = leadMagnet
    ? 'Plus what to check before you apply for Creator Rewards.'
    : 'Free guides, calculators, and tips to grow your TikTok earnings.'

  const playbookPdfUrl = `${SITE_URL}/downloads/tcp-creator-rewards-playbook-2026.pdf`
  const checklistPdfUrl = `${SITE_URL}/downloads/tcp-eligibility-checklist-2026.pdf`

  // Figure out which variant we are rendering.
  const rpm = isRpmCheatSheet(leadMagnet)
  const elig = isEligibilityChecklist(leadMagnet)

  // Primary CTA: the PDF this subscriber signed up for. Override URL wins if provided.
  let primaryPdfUrl: string
  let primaryCtaText: string
  let secondaryLinkLabel: string
  let secondaryLinkUrl: string
  let deliveryIntro: string
  let deliveryBody: string
  let secondaryIntro: string

  if (rpm) {
    primaryPdfUrl = overrideUrl ? getDownloadUrl(leadMagnet, overrideUrl) : playbookPdfUrl
    primaryCtaText = 'Download the Playbook (PDF)'
    secondaryLinkLabel = 'Download: Eligibility Checklist (PDF)'
    secondaryLinkUrl = checklistPdfUrl
    deliveryIntro = 'Your download is ready:'
    deliveryBody =
      'It covers RPM ranges for 18 niches, the 4 factors TikTok uses to calculate your rate, and the quickest ways to push that number higher.'
    secondaryIntro = 'You might also find the eligibility checklist useful:'
  } else if (elig) {
    primaryPdfUrl = overrideUrl ? getDownloadUrl(leadMagnet, overrideUrl) : checklistPdfUrl
    primaryCtaText = 'Download the Checklist (PDF)'
    secondaryLinkLabel = 'Download: Creator Rewards Playbook (PDF)'
    secondaryLinkUrl = playbookPdfUrl
    deliveryIntro = 'Your download is ready:'
    deliveryBody =
      'Every requirement, the most common rejection reasons, and what to do if your application is denied.'
    secondaryIntro = 'You might also find the Creator Rewards Playbook useful:'
  } else {
    // Generic signup. Playbook is the primary, Checklist is the secondary.
    primaryPdfUrl = overrideUrl ? getDownloadUrl(leadMagnet, overrideUrl) : playbookPdfUrl
    primaryCtaText = 'Download the Playbook (PDF)'
    secondaryLinkLabel = 'Download: Eligibility Checklist (PDF)'
    secondaryLinkUrl = checklistPdfUrl
    deliveryIntro = 'Here are two free resources to get you started:'
    deliveryBody =
      'The Creator Rewards Playbook covers RPM, eligibility levers, and the factors that most affect payout. Start there.'
    secondaryIntro = 'And a second one to pair with it:'
  }

  // Compose body HTML. The primary CTA lives in the shell. Secondary PDF stays inline.
  const body = [
    bodyText(deliveryIntro),
    bodyText(deliveryBody),
    bodyText(secondaryIntro),
    inlineLinkParagraph(secondaryLinkLabel, secondaryLinkUrl),
    bodyText(
      'Quick intro: TikTok Creativity Program is a free resource site with 100+ guides on everything from Creator Rewards eligibility to RPM optimization to building income beyond the program itself. No course to sell, no membership gate.'
    ),
    bodyText('Here are the most popular starting points:'),
    bulletList([
      `<a href="${SITE_URL}/guides/eligibility-requirements" style="color:#0B0F1A;font-weight:600;text-decoration:underline;">Eligibility requirements explained</a>`,
      `<a href="${SITE_URL}/guides/optimize-rpm" style="color:#0B0F1A;font-weight:600;text-decoration:underline;">How to optimize your RPM</a>`,
      `<a href="${SITE_URL}/calculators/earnings-calculator" style="color:#0B0F1A;font-weight:600;text-decoration:underline;">Earnings calculator</a>`,
    ]),
    bodyText('Reply to this email if you have a question. I read them.'),
    bodyText('Talk soon.'),
    calloutBox(
      'P.S.',
      "The single most common reason applications get rejected has nothing to do with follower count. It's account type. Business accounts get auto-rejected, and TikTok doesn't always make the reason obvious. Check yours: Settings &gt; Account &gt; Account type."
    ),
  ].join('\n')

  const html = renderEmailShell({
    preheader,
    hero: {
      src: `${SITE_URL}/images/email/lead-magnet-preview.webp`,
      alt: 'Free download: TCP Creator Rewards Playbook',
    },
    body,
    cta: {
      text: primaryCtaText,
      url: primaryPdfUrl,
    },
    footer: {
      email: email ?? null,
    },
    title: subject,
  })

  return { subject, html }
}
