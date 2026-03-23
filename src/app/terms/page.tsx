import Container from '@/components/ui/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms governing your use of TikTok Creativity Program. We are not affiliated with TikTok or ByteDance.',
}

export default function TermsPage() {
  return (
    <section className="py-12">
      <Container size="narrow">
        <div className="space-y-6 text-sm text-[var(--color-text)]">
          <h1 className="text-3xl font-semibold">Terms of use</h1>
          <p>
            By accessing this site, you agree to use the content for informational purposes only.
            We are not affiliated with TikTok or ByteDance, and we do not provide legal or
            financial advice.
          </p>
          <h2 className="text-xl font-semibold">Accuracy</h2>
          <p>
            We work hard to keep information updated, but TikTok policies can change quickly. You
            are responsible for verifying the latest requirements inside your TikTok app.
          </p>
          <h2 className="text-xl font-semibold">External links</h2>
          <p>
            Our site includes links to third-party sites and affiliate programs. We are not
            responsible for their content or policies.
          </p>
          <h2 className="text-xl font-semibold">Limitation of liability</h2>
          <p>
            We are not liable for any losses or damages arising from use of this site. Use the
            information at your own discretion.
          </p>
        </div>
      </Container>
    </section>
  )
}
