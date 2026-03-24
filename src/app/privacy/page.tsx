import Container from '@/components/ui/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How TikTok Creativity Program (tiktokcreativityprogram.com) collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <section className="py-12">
      <Container size="narrow">
        <div className="prose prose-slate max-w-none text-sm">
          <h1 className="text-3xl font-semibold text-brand-ink">Privacy Policy</h1>
          <p className="text-text-muted">Last updated: March 24, 2026</p>

          <p>
            This Privacy Policy describes how TikTok Creativity Program
            (&quot;tiktokcreativityprogram.com,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) collects, uses, and shares information when you visit our website.
            We are an independent educational resource and are not affiliated with TikTok or
            ByteDance.
          </p>

          <h2>Information We Collect</h2>

          <h3>Information You Provide</h3>
          <ul>
            <li>
              <strong>Email address:</strong> When you subscribe to our email list, download a
              free resource (such as the RPM Cheat Sheet or Eligibility Checklist), or contact us
              via email.
            </li>
            <li>
              <strong>Form submissions:</strong> Any information you voluntarily submit through
              contact forms or feedback forms on our site.
            </li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <ul>
            <li>
              <strong>Analytics data:</strong> We use Google Analytics (property ID:
              G-9YX5PRYTJJ) to collect anonymized usage data including pages viewed, time on
              site, referral sources, device type, browser type, and approximate geographic
              location. Google Analytics uses cookies to collect this information.
            </li>
            <li>
              <strong>Cookies and similar technologies:</strong> Our site uses cookies for
              analytics, session management, and to remember your preferences. Third-party
              services we use (Google Analytics, embedded content providers) may also set their
              own cookies.
            </li>
            <li>
              <strong>Log data:</strong> Our hosting provider (Vercel) may collect standard web
              server log data including IP addresses, browser type, referring pages, and
              timestamps.
            </li>
          </ul>

          <h2>How We Use Information</h2>
          <ul>
            <li>
              <strong>Email addresses:</strong> To send the resources you requested, deliver our
              email sequence with TikTok monetization tips, and occasional updates about new
              guides or tools. We will never sell your email address to third parties.
            </li>
            <li>
              <strong>Analytics:</strong> To understand how visitors use our site, improve our
              content and user experience, and identify which guides and tools are most useful.
            </li>
            <li>
              <strong>Advertising:</strong> We may display advertisements on our site through
              Google AdSense or similar advertising networks. These services may use cookies and
              similar technologies to serve ads based on your prior visits to our site or other
              websites. You can opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>
              .
            </li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>We use the following third-party services that may collect data:</p>
          <ul>
            <li>
              <strong>Google Analytics:</strong> Web analytics service by Google. See{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Google AdSense:</strong> Advertising service by Google that may use cookies
              to serve relevant ads. See{' '}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                How Google Uses Information
              </a>
              .
            </li>
            <li>
              <strong>Resend:</strong> Transactional email delivery service. Processes email
              addresses to deliver messages. See{' '}
              <a
                href="https://resend.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resend&apos;s Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Supabase:</strong> Database service that stores subscriber email addresses.
              See{' '}
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Supabase&apos;s Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Vercel:</strong> Hosting provider. See{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vercel&apos;s Privacy Policy
              </a>
              .
            </li>
          </ul>

          <h2>Cookies</h2>
          <p>Our site uses the following types of cookies:</p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> Required for basic site functionality such as
              session management.
            </li>
            <li>
              <strong>Analytics cookies:</strong> Used by Google Analytics to understand site
              usage patterns. These cookies collect anonymized data.
            </li>
            <li>
              <strong>Advertising cookies:</strong> Used by Google AdSense to serve relevant
              advertisements and measure ad performance.
            </li>
          </ul>
          <p>
            You can control cookies through your browser settings. Disabling cookies may affect
            site functionality.
          </p>

          <h2>Affiliate Links</h2>
          <p>
            Our site contains affiliate links to third-party products and services. When you
            click these links and make a purchase, we may earn a commission at no additional cost
            to you. These affiliate partners may use cookies to track referrals. See our{' '}
            <a href="/affiliate-disclosure">Affiliate Disclosure</a> for full details.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain your email address for as long as you remain subscribed to our mailing
            list. You can unsubscribe at any time using the link in any of our emails, and we
            will remove your email address from our active mailing list.
          </p>

          <h2>Your Rights and Choices</h2>
          <ul>
            <li>
              <strong>Unsubscribe:</strong> Every email includes an unsubscribe link. Click it to
              stop receiving emails.
            </li>
            <li>
              <strong>Data deletion:</strong> Contact us at{' '}
              <a href="mailto:hello@tiktokcreativityprogram.com">
                hello@tiktokcreativityprogram.com
              </a>{' '}
              to request deletion of your personal data.
            </li>
            <li>
              <strong>Opt out of analytics:</strong> Install the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </li>
            <li>
              <strong>Opt out of personalized ads:</strong> Visit{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>{' '}
              or{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
              >
                DAA Opt-Out
              </a>
              .
            </li>
          </ul>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our site is not directed at children under 13. We do not knowingly collect personal
            information from children under 13. If you believe we have collected information from
            a child under 13, please contact us so we can delete it.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this
            page with an updated date. Continued use of the site after changes constitutes
            acceptance of the updated policy.
          </p>

          <h2>Contact Us</h2>
          <p>
            For privacy questions or data requests, contact us at:{' '}
            <a href="mailto:hello@tiktokcreativityprogram.com">
              hello@tiktokcreativityprogram.com
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}
