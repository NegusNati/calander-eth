'use client'

import { useState } from 'react'
import { EthiopicDate, formatGregorianDate, toGregorian, toGeezNumeral, ETHIOPIAN_MONTHS } from '@/lib/calendar-utils'
import { Button } from '@/components/ui/button'

export function ConversionCard() {
  const [ethiopicYear, setEthiopicYear] = useState(2017)
  const [ethiopicMonth, setEthiopicMonth] = useState(1)
  const [ethiopicDay, setEthiopicDay] = useState(1)
  const [useGeez, setUseGeez] = useState(false)

  const ethiopicDate: EthiopicDate = {
    year: ethiopicYear,
    month: ethiopicMonth,
    day: ethiopicDay,
  }

  const gregorianDate = toGregorian(ethiopicDate)

  const handleReset = () => {
    setEthiopicYear(2017)
    setEthiopicMonth(1)
    setEthiopicDay(1)
  }

  return (
    <div className="border-border/60 rounded-2xl border bg-white/60 p-6 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-transparent sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight">Ethiopian to Gregorian Converter</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Convert dates between the Ethiopian and Gregorian calendars instantly
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Ethiopian Date</h3>
          
          <div>
            <label className="text-muted-foreground block text-sm font-medium mb-2">
              Year {useGeez && `(${toGeezNumeral(ethiopicYear)})`}
            </label>
            <input
              type="number"
              min="1"
              max="3000"
              value={ethiopicYear}
              onChange={(e) => setEthiopicYear(Math.max(1, parseInt(e.target.value) || 2017))}
              className="border-input bg-background w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-muted-foreground block text-sm font-medium mb-2">Month</label>
            <select
              value={ethiopicMonth}
              onChange={(e) => setEthiopicMonth(parseInt(e.target.value))}
              className="border-input bg-background w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {ETHIOPIAN_MONTHS.map((month) => (
                <option key={month.number} value={month.number}>
                  {month.english} - {month.amharic}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-muted-foreground block text-sm font-medium mb-2">
              Day {useGeez && `(${toGeezNumeral(ethiopicDay)})`}
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={ethiopicDay}
              onChange={(e) => setEthiopicDay(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
              className="border-input bg-background w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <input
              type="checkbox"
              id="useGeez"
              checked={useGeez}
              onChange={(e) => setUseGeez(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-input"
            />
            <label htmlFor="useGeez" className="cursor-pointer text-sm font-medium">
              Use Ge&apos;ez Numerals
            </label>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Gregorian Date</h3>
          
          <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Converted Date</p>
              <p className="text-lg font-semibold text-primary mt-1">
                {formatGregorianDate(gregorianDate)}
              </p>
            </div>

            <div className="bg-border/30 h-px w-full" />

            <div className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Year:</span>
                <span className="ml-2 font-semibold">{gregorianDate.year}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Month:</span>
                <span className="ml-2 font-semibold">{gregorianDate.month}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Day:</span>
                <span className="ml-2 font-semibold">{gregorianDate.day}</span>
              </p>
            </div>
          </div>

          <Button variant="outline" onClick={handleReset} className="w-full">
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
