import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import Footer from '@/components/common/calendar/components/footer'
import ServiceWorkerRegister from '@/components/common/pwa/service-worker-register'

const siteUrl = 'https://ethiopian-calendar.app'
const siteName = 'Ethiopian Calendar Converter'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ethiopian Calendar Converter | Ge'ez Numeral System",
    template: '%s | Ethiopian Calendar Converter',
  },
  description:
    "Convert between Ethiopian and Gregorian calendars, explore traditional Ge'ez numerals and understand the Ethiopian calendar system.",
  applicationName: siteName,
  generator: 'v0.app',
  keywords: [
    'Ethiopian calendar',
    'Gregorian calendar',
    "Ge'ez numerals",
    'date converter',
    'ethiopian date today',
    'ethiopian to gregorian',
    'gregorian to ethiopian',
  ],
  authors: [{ name: 'Ethiopian Calendar Converter' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ethiopian Calendar Converter',
    description:
      "Convert dates between Ethiopian and Gregorian calendars with traditional Ge'ez numerals and an interactive calendar view.",
    type: 'website',
    url: siteUrl,
    siteName,
    locale: 'en_US',
    images: [
      {
        url: '/placeholder.jpg',
        width: 1200,
        height: 630,
        alt: 'Ethiopian Calendar Converter interface with Geʼez numerals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ethiopian Calendar Converter',
    description:
      'Convert dates between Ethiopian and Gregorian calendars and explore Geʼez numerals.',
    images: ['/placeholder.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/fav/favicon.ico' },
      { url: '/fav/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/fav/apple-touch-icon.png' },
    ],
  },
  manifest: '/fav/manifest.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#009966',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: metadata.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="en">
      <head>
        <Script
          id="umami-analytics"
          src="https://analytics.passport.et/script.js"
          data-website-id="b6e704de-a131-4abf-9e93-a01241367cf4"
          strategy="afterInteractive"
          defer
        />
      </head>
      <body
        className={`${playfair.className} font-sans antialiased bg-gradient-to-b from-brand-1 to-background`}
      >
        {/* Global shader background behind all pages */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 w-full bg-[url('/shader_bg.svg')] bg-top bg-no-repeat bg-cover"
        />
        <main id="main" className="relative z-0 w-full min-h-screen">
          {children}
        </main>
        <ServiceWorkerRegister />
        <Footer />
      </body>
    </html>
  )
}
