import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import shaderBgUrl from '../public/shader_bg.svg'

const siteUrl = 'https://ethiopian-calendar.app'
const siteName = 'Ethiopian Calendar Converter'


const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
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
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
  },
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.variable} font-sans antialiased`}
      >

           <main id="main" className="relative z-0 w-full">
        {/* Absolutely positioned background image at the top */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-2rem] left-0 -z-10 h-[720px] w-full border-none"
          style={{
            backgroundImage: `url(${shaderBgUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            width: '100%',
            height: '1120px',
          }}
        />
        {children}
      </main>
      </body>
    </html>
  )
}
