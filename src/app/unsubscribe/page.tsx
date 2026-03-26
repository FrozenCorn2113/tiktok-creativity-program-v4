'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Container from '@/components/ui/Container'
import { MailX } from 'lucide-react'

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'no-email'>('loading')

  useEffect(() => {
    if (!email) {
      setStatus('no-email')
      return
    }

    fetch('/api/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        setStatus(res.ok ? 'success' : 'error')
      })
      .catch(() => {
        setStatus('error')
      })
  }, [email])

  return (
    <section className="py-20">
      <Container size="narrow">
        <div className="max-w-lg mx-auto text-center">
          <MailX className="w-12 h-12 text-brand-primary mx-auto mb-6" aria-hidden />

          {status === 'loading' && (
            <>
              <h1 className="text-2xl font-bold text-brand-ink mb-3">
                Unsubscribing...
              </h1>
              <p className="text-text-secondary">
                Please wait while we process your request.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <h1 className="text-2xl font-bold text-brand-ink mb-3">
                You have been unsubscribed
              </h1>
              <p className="text-text-secondary mb-6">
                Sorry to see you go. You will no longer receive emails from us.
              </p>
              <p className="text-text-muted text-sm">
                If you change your mind, you can always re-subscribe from our{' '}
                <a href="/" className="text-brand-primary underline hover:text-brand-primaryHover">
                  homepage
                </a>.
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <h1 className="text-2xl font-bold text-brand-ink mb-3">
                Something went wrong
              </h1>
              <p className="text-text-secondary mb-6">
                We were unable to process your unsubscribe request. Please try again
                or contact us at{' '}
                <a
                  href="mailto:hello@tiktokcreativityprogram.com"
                  className="text-brand-primary underline hover:text-brand-primaryHover"
                >
                  hello@tiktokcreativityprogram.com
                </a>.
              </p>
            </>
          )}

          {status === 'no-email' && (
            <>
              <h1 className="text-2xl font-bold text-brand-ink mb-3">
                Invalid unsubscribe link
              </h1>
              <p className="text-text-secondary mb-6">
                This link appears to be missing your email address. Please use the
                unsubscribe link from one of our emails, or contact us at{' '}
                <a
                  href="mailto:hello@tiktokcreativityprogram.com"
                  className="text-brand-primary underline hover:text-brand-primaryHover"
                >
                  hello@tiktokcreativityprogram.com
                </a>.
              </p>
            </>
          )}
        </div>
      </Container>
    </section>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <section className="py-20">
          <Container size="narrow">
            <div className="max-w-lg mx-auto text-center">
              <MailX className="w-12 h-12 text-brand-primary mx-auto mb-6" aria-hidden />
              <h1 className="text-2xl font-bold text-brand-ink mb-3">
                Unsubscribing...
              </h1>
              <p className="text-text-secondary">
                Please wait while we process your request.
              </p>
            </div>
          </Container>
        </section>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  )
}
