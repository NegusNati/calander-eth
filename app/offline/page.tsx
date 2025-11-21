import type { Metadata } from 'next'
import Link from 'next/link'
import { WifiOff } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Offline | Ethiopian Calendar Converter',
  description:
    'You are offline. Reconnect to refresh the Ethiopian ↔ Gregorian calendar or keep browsing the installed PWA.',
}

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-brand-1/70 via-background to-background px-6 py-16">
      <div className="max-w-xl w-full space-y-6 rounded-3xl border border-border/70 bg-card/90 p-8 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-3 text-primary">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <WifiOff className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Offline mode</p>
            <h1 className="text-2xl font-semibold text-foreground">You&apos;re offline</h1>
          </div>
        </div>

        <p className="text-base leading-relaxed text-muted-foreground">
          The converter and calendar work best with a connection, but the installed app will keep recent screens cached for quick reference. Once you&apos;re back online, refreshing will sync today&apos;s dates and holidays.
        </p>

        <div className="grid gap-3 sm:flex sm:items-center sm:gap-4">
          <Button asChild size="lg">
            <Link href="/">Try again</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="mailto:hello@ethiopian-calendar.app?subject=Offline%20support">
              Report an issue
            </Link>
          </Button>
        </div>

        <div className="rounded-2xl border border-dashed border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground">
          Tip: add this app to your home screen for a faster, fullscreen experience. On Android select “Install app”; on iOS tap the share icon → “Add to Home Screen”.
        </div>
      </div>
    </div>
  )
}
