import Container from '@/components/ui/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How TikTok Creativity Program collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <section className="py-12">
      <Container size="narrow">
        <div className="space-y-6 text-sm text-[var(--color-text)]">
          <h1 className="text-3xl font-semibold">Privacy policy</h1>
          <p>
            We respect your privacy. This policy explains what data we collect, how we use it, and
            your choices.
          </p>
          <h2 className="text-xl font-semibold">Information we collect</h2>
          <p>
            We collect email addresses when you subscribe, and we collect analytics data (like page
            views and calculator usage) to improve the site.
          </p>
          <h2 className="text-xl font-semibold">How we use information</h2>
          <p>
            Email addresses are used to send the resources you requested and occasional updates. We
            do not sell your personal data.
          </p>
          <h2 className="text-xl font-semibold">Third-party services</h2>
          <p>
            We use Google Analytics and an email service provider (ConvertKit or MailerLite). These
            providers may set their own cookies or tracking technologies.
          </p>
          <h2 className="text-xl font-semibold">Your choices</h2>
          <p>
            You can unsubscribe at any time using the link in our emails. For privacy questions,
            contact hello@tiktokcreativityprogram.com.
          </p>
        </div>
      </Container>
    </section>
  )
}
