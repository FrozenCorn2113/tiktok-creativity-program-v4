/**
 * Brett Monday briefing email — TCP autonomous ops Phase A.
 *
 * Built on top of `renderEmailShell()` from template-shell.ts.
 *
 * Layout (5 sections, no hero v1):
 *   1. Shipped last week
 *   2. This week's queue
 *   3. Needs your eye  (or "all clear" callout)
 *   4. Blockers        (omitted if none)
 *   5. Ricky leads     (Phase A placeholder)
 *
 * CTA links to first pending review URL if any, otherwise omitted.
 */
import {
  renderEmailShell,
  bodyText,
  calloutBox,
  bulletList,
} from './template-shell'

export interface PendingReview {
  /** Display label, e.g. "Hero image: tiktok-rpm-by-niche-2026" */
  label: string
  /** Item type, e.g. "hero image" */
  itemType: string
  /** Absolute URL to the review dashboard for this row. */
  reviewUrl: string
}

export interface Blocker {
  /** Short description. */
  text: string
}

export interface BernardProposal {
  /** Short human label, e.g. "H1: A/B /start-here hero copy" */
  label: string
  /** One-line "why now" summary. */
  summary: string
  /** Dashboard URL for GO/REVISE. */
  reviewUrl: string
}

export interface BriefingData {
  /** Week-of label, e.g. "Apr 27". */
  weekOfLabel: string
  /** Optional recipient email (drives unsubscribe link). Pass null for ops-list footer. */
  recipientEmail?: string | null
  /** If true, render a "Daily brief" header instead of "Week of" header. */
  daily?: boolean

  /** Section 0 (top): Bernard proposals awaiting GO/REVISE. Omit if empty. */
  bernardProposals?: BernardProposal[]

  /** Section 1: Shipped last week. Plain bullet strings. */
  shipped: string[]

  /** Section 2: This week's queue. Plain bullet strings. Pass [] for "calendar empty". */
  thisWeek: string[]

  /** Section 3: Needs your eye. Pending review_requests. */
  pendingReviews: PendingReview[]

  /** Section 4: Blockers. Omit section entirely when empty. */
  blockers: Blocker[]

  /** Section 5: Ricky leads. Phase A: just a placeholder string. */
  rickyLeadsNote?: string
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function sectionHeading(title: string): string {
  return `<h2 style="margin:24px 0 12px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:18px;font-weight:800;letter-spacing:-0.01em;color:#0B0F1A;line-height:1.3;">${escapeHtml(title)}</h2>`
}

function firstSectionHeading(title: string): string {
  // Same as sectionHeading but without top margin (first section in body).
  return `<h2 style="margin:0 0 12px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:18px;font-weight:800;letter-spacing:-0.01em;color:#0B0F1A;line-height:1.3;">${escapeHtml(title)}</h2>`
}

function reviewLine(r: PendingReview): string {
  const safeLabel = escapeHtml(r.label)
  const safeType = escapeHtml(r.itemType)
  return `<strong>${safeType}:</strong> <a href="${r.reviewUrl}" style="color:#0B0F1A;text-decoration:underline;">${safeLabel}</a>`
}

function proposalLine(p: BernardProposal): string {
  const safeLabel = escapeHtml(p.label)
  const safeSummary = escapeHtml(p.summary)
  return `<strong><a href="${p.reviewUrl}" style="color:#0B0F1A;text-decoration:underline;">${safeLabel}</a></strong><br/><span style="color:#475467;font-size:14px;">${safeSummary}</span>`
}

export function renderBriefingEmail(data: BriefingData): string {
  const {
    weekOfLabel,
    recipientEmail = null,
    daily = false,
    bernardProposals = [],
    shipped,
    thisWeek,
    pendingReviews,
    blockers,
    rickyLeadsNote,
  } = data

  const parts: string[] = []
  let firstRendered = false

  // 0. Bernard proposals (top section when present)
  if (bernardProposals.length > 0) {
    parts.push(firstSectionHeading('Bernard proposals — your call'))
    parts.push(bulletList(bernardProposals.map(proposalLine)))
    parts.push(
      bodyText(
        'One-click GO dispatches the downstream agent same-day. REVISE bounces it back with your comment.'
      )
    )
    firstRendered = true
  }

  // 1. Shipped last week
  parts.push(firstRendered ? sectionHeading('Shipped last week') : firstSectionHeading('Shipped last week'))
  if (shipped.length > 0) {
    parts.push(bulletList(shipped.map(escapeHtml)))
  } else {
    parts.push(bodyText('Quiet week. No new ships logged.'))
  }

  // 2. This week's queue
  parts.push(sectionHeading("This week's queue"))
  if (thisWeek.length > 0) {
    parts.push(bulletList(thisWeek.map(escapeHtml)))
  } else {
    parts.push(bodyText('Calendar is open. Bernard will fill from the content backlog.'))
  }

  // 3. Needs your eye
  parts.push(sectionHeading('Needs your eye'))
  if (pendingReviews.length > 0) {
    parts.push(bulletList(pendingReviews.map(reviewLine)))
    parts.push(
      bodyText(
        'Click any link above to review. One tap = decision logged. Bernard takes it from there.'
      )
    )
  } else {
    parts.push(calloutBox('All clear.', 'No pending reviews. You can ignore this section.'))
  }

  // 4. Blockers (only if any)
  if (blockers.length > 0) {
    parts.push(sectionHeading('Blockers'))
    parts.push(bulletList(blockers.map((b) => escapeHtml(b.text))))
  }

  // 5. Ricky leads (placeholder for Phase A)
  parts.push(sectionHeading('Ricky leads'))
  parts.push(
    bodyText(
      escapeHtml(rickyLeadsNote || 'Ricky reactivation lands Phase B. No leads to post this week.')
    )
  )

  const body = parts.join('\n')

  // CTA: first Bernard proposal OR first pending review URL, or omitted.
  const cta =
    bernardProposals.length > 0
      ? { text: 'Review first proposal', url: bernardProposals[0].reviewUrl }
      : pendingReviews.length > 0
      ? { text: 'Open first review', url: pendingReviews[0].reviewUrl }
      : undefined

  const totalAsk = bernardProposals.length + pendingReviews.length
  const preheader =
    totalAsk > 0
      ? `${totalAsk} item${totalAsk === 1 ? '' : 's'} need your eye ${daily ? 'today' : 'this week'}.`
      : `All clear. ${daily ? 'Daily brief' : `Week of ${weekOfLabel}`}.`

  const title = daily ? `TCP daily brief: ${weekOfLabel}` : `TCP: Week of ${weekOfLabel}`

  return renderEmailShell({
    preheader,
    body,
    cta,
    footer: { email: recipientEmail },
    title,
  })
}
