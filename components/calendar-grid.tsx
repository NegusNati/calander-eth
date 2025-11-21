'use client'

import { EthiopicDate, ETHIOPIAN_MONTHS, WEEKDAYS, getDaysInEthiopianMonth } from '@/lib/calendar-utils'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export function CalendarGrid() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear() - 8)
  const [month, setMonth] = useState(today.getMonth() + 1)

  const daysInMonth = getDaysInEthiopianMonth(year, month)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(13)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const handleNextMonth = () => {
    if (month === 13) {
      setMonth(1)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  const monthName = ETHIOPIAN_MONTHS[month - 1]?.english ?? ''

  return (
    <div className="border-border/60 rounded-2xl border bg-white/60 p-4 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-transparent sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {monthName} {year}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Ethiopian calendar grid view
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePrevMonth}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleNextMonth}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {/* Weekday headers */}
        <div className="text-muted-foreground grid grid-cols-7 gap-1 text-center text-xs font-medium tracking-widest uppercase sm:gap-2">
          {WEEKDAYS.map((day) => (
            <span key={day} className="hidden sm:block">{day}</span>
          ))}
          {WEEKDAYS.map((day, index) => (
            <span key={index} className="block sm:hidden">{day.charAt(0)}</span>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {days.map((day) => (
            <button
              key={day}
              className="bg-secondary/50 hover:bg-secondary text-foreground flex min-h-[44px] sm:min-h-12 items-center justify-center rounded-lg border border-border/50 text-xs sm:text-sm font-medium transition"
              aria-label={`${monthName} ${day}, ${year}`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
