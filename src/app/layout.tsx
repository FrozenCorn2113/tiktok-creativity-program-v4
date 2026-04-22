import type { Metadata } from 'next'
import Script from 'next/script'
import { Manrope, JetBrains_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/site'
import NavbarDark from '@/components/NavbarDark'
import FooterDark from '@/components/FooterDark'
import { PostHogProvider } from '@/components/PostHogProvider'
import { cn } from '@/lib/utils'

// Manrope — primary brand font, all weights per BRAND.md
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

// JetBrains Mono — calculator outputs and data values only
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap',
})

// Instrument Serif — italic flourish on large headings, roman-numeral section markers
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: `/og?title=${encodeURIComponent(siteConfig.name)}`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
}

// WebSite + Organization JSON-LD for Google rich results (sitelinks search box, knowledge panel)
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/guides?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/brand/tcp-logo.png`,
  sameAs: [
    'https://twitter.com/tiktokcreativity',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID
  const searchConsoleVerification = process.env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'tiktokcreativityprogram.com'
  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <html lang="en" className={cn(manrope.variable, jetbrainsMono.variable, instrumentSerif.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {searchConsoleVerification ? (
          <meta name="google-site-verification" content={searchConsoleVerification} />
        ) : null}
        {/* Plausible Analytics — production only */}
        {isProduction ? (
          <script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        ) : null}
      </head>
      <body className="min-h-screen bg-paper text-ink font-sans antialiased">
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        <PostHogProvider>
          <NavbarDark />
          <main className="flex min-h-[calc(100vh-220px)] flex-col">
            {children}
          </main>
          <FooterDark />
        </PostHogProvider>
      </body>
    </html>
  )
}
