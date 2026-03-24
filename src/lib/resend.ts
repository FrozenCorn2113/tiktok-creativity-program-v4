import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY

/**
 * Resend client — server-side only.
 * Returns null when RESEND_API_KEY is missing so callers can gracefully skip.
 */
export const resend = apiKey ? new Resend(apiKey) : null
