import type { Metadata } from 'next'
import Script from 'next/script'
import { Manrope, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/site'
import NavbarDark from '@/components/NavbarDark'
import FooterDark from '@/components/FooterDark'
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID
  const searchConsoleVerification = process.env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'tiktokcreativityprogram.com'
  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <html lang="en" className={cn(manrope.variable, jetbrainsMono.variable)}>
      <head>
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
      <body className="min-h-screen bg-background text-text font-sans antialiased">
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
        <NavbarDark />
        <main className="flex min-h-[calc(100vh-220px)] flex-col">
          {children}
        </main>
        <FooterDark />
      </body>
    </html>
  )
}
