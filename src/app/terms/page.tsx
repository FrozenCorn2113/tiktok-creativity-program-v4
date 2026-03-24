import Container from '@/components/ui/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms governing your use of tiktokcreativityprogram.com. We are not affiliated with TikTok or ByteDance.',
}

export default function TermsPage() {
  return (
    <section className="py-12">
      <Container size="narrow">
        <div className="prose prose-slate max-w-none text-sm">
          <h1 className="text-3xl font-semibold text-brand-ink">Terms of Service</h1>
          <p className="text-text-muted">Last updated: March 24, 2026</p>

          <p>
            By accessing or using tiktokcreativityprogram.com (&quot;the Site&quot;), you agree
            to these Terms of Service. If you do not agree, please do not use the Site.
          </p>

          <h2>About This Site</h2>
          <p>
            TikTok Creativity Program is an independent educational resource that provides
            guides, calculators, and tools related to TikTok&apos;s Creator Rewards Program and
            content monetization. We are <strong>not affiliated with, endorsed by, or sponsored
            by TikTok, ByteDance, or any of their subsidiaries.</strong>
          </p>

          <h2>Informational Content Only</h2>
          <p>
            All content on this Site is provided for general informational and educational
            purposes only. Our guides, articles, calculators, and tools are based on publicly
            available information, creator community data, and our own research.
          </p>
          <p>
            We do <strong>not</strong> provide:
          </p>
          <ul>
            <li>Legal advice</li>
            <li>Financial advice</li>
            <li>Tax advice</li>
            <li>Professional consulting services</li>
          </ul>
          <p>
            You should consult qualified professionals for specific legal, financial, or tax
            questions related to your creator income.
          </p>

          <h2>No Earnings Guarantees</h2>
          <p>
            TikTok&apos;s Creator Rewards Program earnings vary significantly based on niche,
            audience geography, content quality, watch time, and other factors. RPM figures,
            earnings estimates, and calculator results on this Site are estimates based on
            community data and publicly available information. They are <strong>not guaranteed
            outcomes.</strong>
          </p>
          <p>
            We make no representations or warranties that you will achieve any particular level
            of earnings, views, followers, or other results by using our information or tools.
            Past performance data cited on the Site does not guarantee future results.
          </p>

          <h2>Accuracy and Updates</h2>
          <p>
            We work to keep our information accurate and up to date, but TikTok&apos;s policies,
            features, and program requirements change frequently. You are responsible for
            verifying current requirements and policies directly within the TikTok app or through
            TikTok&apos;s official communications.
          </p>
          <p>
            We are not responsible for any actions you take based on information that may be
            outdated or inaccurate due to platform changes.
          </p>

          <h2>Affiliate Links and Advertising</h2>
          <p>
            Our Site contains affiliate links to third-party products and services. When you
            click these links and make a purchase, we may earn a commission at no additional cost
            to you. Affiliate relationships do not influence our editorial content or
            recommendations.
          </p>
          <p>
            We may also display advertisements through Google AdSense or similar advertising
            networks. We are not responsible for the content or accuracy of third-party
            advertisements.
          </p>
          <p>
            See our <a href="/affiliate-disclosure">Affiliate Disclosure</a> for more details.
          </p>

          <h2>External Links</h2>
          <p>
            Our Site includes links to third-party websites, products, and services. We are not
            responsible for the content, accuracy, privacy practices, or policies of any
            third-party sites. Linking to a third-party site does not constitute an endorsement.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All original content on this Site, including text, graphics, logos, and software, is
            the property of TikTok Creativity Program and is protected by applicable copyright
            laws. You may not reproduce, distribute, or create derivative works from our content
            without prior written permission.
          </p>
          <p>
            &quot;TikTok&quot; and related trademarks are the property of ByteDance Ltd. and its
            affiliates. Their use on this Site is for informational purposes only and does not
            imply affiliation or endorsement.
          </p>

          <h2>User Conduct</h2>
          <p>When using our Site, you agree not to:</p>
          <ul>
            <li>Use the Site for any unlawful purpose</li>
            <li>
              Attempt to gain unauthorized access to any part of the Site or its systems
            </li>
            <li>Scrape, copy, or reproduce our content without permission</li>
            <li>Interfere with the Site&apos;s operation or other users&apos; experience</li>
            <li>Submit false information through our forms or email signup</li>
          </ul>

          <h2>Email Communications</h2>
          <p>
            By providing your email address through our signup forms, you consent to receive
            emails from us including lead magnet delivery, educational content sequences, and
            occasional updates. You can unsubscribe at any time using the link in any email.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, TikTok Creativity Program and its operators
            shall not be liable for any direct, indirect, incidental, special, consequential, or
            punitive damages arising from:
          </p>
          <ul>
            <li>Your use of or inability to use the Site</li>
            <li>Any information, content, or tools provided on the Site</li>
            <li>Actions taken based on our content or calculator results</li>
            <li>
              Changes to TikTok&apos;s policies, features, or Creator Rewards Program that affect
              your account or earnings
            </li>
            <li>Any third-party products or services accessed through our affiliate links</li>
          </ul>
          <p>
            Your use of the Site and reliance on any information provided is solely at your own
            risk.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            The Site is provided &quot;as is&quot; and &quot;as available&quot; without
            warranties of any kind, either express or implied, including but not limited to
            implied warranties of merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the
            applicable jurisdiction, without regard to conflict of law principles.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Changes will be posted on this page
            with an updated date. Continued use of the Site after changes constitutes acceptance
            of the updated terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these Terms? Email us at{' '}
            <a href="mailto:hello@tiktokcreativityprogram.com">
              hello@tiktokcreativityprogram.com
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}
