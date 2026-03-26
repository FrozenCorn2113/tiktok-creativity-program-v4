import { resend } from '@/lib/resend'
import { buildWelcomeEmail } from './welcome-template'

const FROM_ADDRESS = 'TikTok Creativity Program <hello@tiktokcreativityprogram.com>'

interface SendWelcomeOptions {
  email: string
  leadMagnet?: string | null
  downloadUrl?: string | null
}

/**
 * Send branded welcome email via Resend.
 * Gracefully skips if Resend is not configured (returns { sent: false }).
 */
export async function sendWelcomeEmail(
  options: SendWelcomeOptions
): Promise<{ sent: boolean; error?: string }> {
  if (!resend) {
    console.warn('[email] Resend not configured — skipping welcome email')
    return { sent: false, error: 'Resend not configured' }
  }

  const { email, leadMagnet, downloadUrl } = options
  const { subject, html } = buildWelcomeEmail({ email, leadMagnet, downloadUrl })

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject,
      html,
    })

    if (error) {
      console.error('[email] Resend error:', error)
      return { sent: false, error: error.message }
    }

    return { sent: true }
  } catch (err) {
    console.error('[email] Failed to send welcome email:', err)
    return { sent: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}
