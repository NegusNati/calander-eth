import CalendarPage from '@/components/common/calendar/components/calendar-page'

// Cache static HTML for an hour to improve TTFB while keeping the calendar fresh daily.
export const revalidate = 3600

export default function Home() {
  return (
    <CalendarPage />
  )
}
