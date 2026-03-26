import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef } from 'react'
import CalloutBox from '@/components/CalloutBox'
import ComparisonTable from '@/components/ComparisonTable'
import EmailSignupForm from '@/components/EmailSignupForm'
import SocialShareButtons from '@/components/SocialShareButtons'
import AffiliateLink from '@/components/AffiliateLink'
import AffiliateLinkButton from '@/components/AffiliateLinkButton'
import VideoEmbed from '@/components/VideoEmbed'
import ProTipBox from '@/components/ProTipBox'
import GuideCard from '@/components/GuideCard'
import QuickPickBox from '@/components/QuickPickBox'
import RelatedGuides from '@/components/RelatedGuides'
import TableOfContents from '@/components/TableOfContents'
import PageHeader from '@/components/PageHeader'
import StepCard from '@/components/StepCard'
import JourneyCard from '@/components/JourneyCard'
// v4 affiliate + email components
import { AffiliateDisclosure } from '@/components/affiliate/affiliate-disclosure'
import { AffiliateCardInline } from '@/components/affiliate/affiliate-card-inline'
import { EmailCaptureInline } from '@/components/email/email-capture-inline'

/** Responsive table wrapper -- prevents overflow on small screens */
function ResponsiveTable(props: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="prose-table-wrapper">
      <table {...props} />
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // HTML element overrides
    table: ResponsiveTable,
    // Existing components
    CalloutBox,
    ComparisonTable,
    EmailSignupForm,
    SocialShareButtons,
    AffiliateLink,
    AffiliateLinkButton,
    VideoEmbed,
    ProTipBox,
    // New components
    GuideCard,
    QuickPickBox,
    RelatedGuides,
    TableOfContents,
    PageHeader,
    StepCard,
    JourneyCard,
    // v4 components
    AffiliateDisclosure,
    AffiliateCardInline,
    EmailCaptureInline,
    ...components,
  }
}
