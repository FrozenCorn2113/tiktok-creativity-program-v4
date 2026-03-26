// Resend Audience helpers — server-side only
// Manages contacts in the "TCP Newsletter Subscribers" audience
import { resend } from '@/lib/resend'

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? ''

/**
 * Add a contact to the Resend audience.
 * Resend deduplicates by email — safe to call on every signup.
 */
export async function addContactToAudience(email: string): Promise<{ ok: boolean; error?: string }> {
  if (!resend || !AUDIENCE_ID) {
    console.warn('[resend-audience] Resend or audience ID not configured — skipping')
    return { ok: false, error: 'Not configured' }
  }

  try {
    const { error } = await resend.contacts.create({
      audienceId: AUDIENCE_ID,
      email,
      unsubscribed: false,
    })

    if (error) {
      console.error('[resend-audience] Failed to add contact:', error)
      return { ok: false, error: error.message }
    }

    return { ok: true }
  } catch (err) {
    console.error('[resend-audience] Error adding contact:', err)
    return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

/**
 * Mark a contact as unsubscribed in the Resend audience.
 * Uses update (not remove) so the contact record is preserved for compliance.
 */
export async function unsubscribeContactFromAudience(email: string): Promise<{ ok: boolean; error?: string }> {
  if (!resend || !AUDIENCE_ID) {
    console.warn('[resend-audience] Resend or audience ID not configured — skipping')
    return { ok: false, error: 'Not configured' }
  }

  try {
    // First, find the contact by listing and filtering
    // Resend SDK doesn't support lookup by email directly, so we update by email
    // The remove endpoint needs an ID, but we can use the update approach
    const { data: contacts, error: listError } = await resend.contacts.list({
      audienceId: AUDIENCE_ID,
    })

    if (listError) {
      console.error('[resend-audience] Failed to list contacts:', listError)
      return { ok: false, error: listError.message }
    }

    const contact = contacts?.data?.find((c: { email: string }) => c.email === email)
    if (!contact) {
      // Contact not in audience — nothing to do
      return { ok: true }
    }

    const { error } = await resend.contacts.update({
      audienceId: AUDIENCE_ID,
      id: contact.id,
      unsubscribed: true,
    })

    if (error) {
      console.error('[resend-audience] Failed to unsubscribe contact:', error)
      return { ok: false, error: error.message }
    }

    return { ok: true }
  } catch (err) {
    console.error('[resend-audience] Error unsubscribing contact:', err)
    return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}
