/**
 * Schedule the day 2/5/8/12 drip emails via Resend's `scheduledAt`.
 *
 * Called fire-and-forget from the /api/newsletter signup flow after the
 * welcome email. Also used by scripts/backfill-drip.mjs for existing subs.
 *
 * Each of the 4 sends is wrapped in try/catch so one failure does not block
 * the other three. Errors are logged with the day number prefix so the four
 * are distinguishable in the logs.
 */

import { resend } from '@/lib/resend'
import { buildDripEmail } from './drip-templates'

const FROM_ADDRESS = 'TikTok Creativity Program <hello@tiktokcreativityprogram.com>'
const DRIP_DAYS: Array<2 | 5 | 8 | 12> = [2, 5, 8, 12]
const MS_PER_DAY = 86_400_000

export interface ScheduleDripResult {
  scheduled: number
  errors: Array<{ day: number; message: string }>
}

/**
 * Schedule all four drip emails for `email`. Returns counts + per-day errors.
 */
export async function scheduleDripEmails(
  email: string,
  leadMagnet: string | null
): Promise<ScheduleDripResult> {
  if (!resend) {
    console.warn('[drip] Resend not configured, skipping drip scheduling')
    return {
      scheduled: 0,
      errors: DRIP_DAYS.map((day) => ({ day, message: 'Resend not configured' })),
    }
  }

  const result: ScheduleDripResult = { scheduled: 0, errors: [] }
  const now = Date.now()

  for (const day of DRIP_DAYS) {
    try {
      const scheduledAt = new Date(now + day * MS_PER_DAY).toISOString()
      const { subject, html, text } = buildDripEmail({ day, email, leadMagnet })

      const { error } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        subject,
        html,
        text,
        scheduledAt,
      })

      if (error) {
        console.error(`[drip][day${day}] Resend error for ${email}:`, error)
        result.errors.push({ day, message: error.message || 'Resend returned error' })
        continue
      }

      result.scheduled += 1
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      console.error(`[drip][day${day}] Failed to schedule for ${email}:`, err)
      result.errors.push({ day, message })
    }
  }

  return result
}
