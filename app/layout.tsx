import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import Footer from '@/components/common/calendar/components/footer'

const siteUrl = 'https://ethiopian-calendar.app'
const siteName = 'Ethiopian Calendar Converter'


const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
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
      <body
        className={`${geistSans.className} ${geistMono.variable} font-sans antialiased bg-gradient-to-b from-brand-1 to-background`}
      >
        {/* Global shader background behind all pages */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 w-full bg-[url('/shader_bg.svg')] bg-top bg-no-repeat bg-cover"
        />
        <main id="main" className="relative z-0 w-full min-h-screen">
          {children}
        </main>
        <Footer />
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Analytics />
      </body>
    </html>
  )
}
