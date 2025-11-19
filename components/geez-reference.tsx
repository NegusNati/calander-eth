'use client'

import { GEEZ_NUMERAL_TABLE } from '@/lib/calendar-utils'
import { useState } from 'react'

export function GeezReference() {
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null)

  const handlePronounce = (name: string, index: number) => {
    setSpeakingIndex(index)
    const amharic = name.split('(')[0].trim()
    try {
      const utterance = new SpeechSynthesisUtterance(amharic)
      utterance.lang = 'am-ET'
      utterance.onend = () => setSpeakingIndex(null)
      window.speechSynthesis?.speak(utterance)
    } catch {
      setSpeakingIndex(null)
    }
  }

  return (
    <div className="border-border/60 rounded-2xl border bg-white/60 p-6 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-transparent sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight">Ge&apos;ez Numeral System</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Traditional Ethiopian numerals used in cultural and liturgical contexts
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground border-b border-border/50 text-xs font-semibold uppercase tracking-wider">
              <th className="text-left px-4 py-3">Number</th>
              <th className="text-left px-4 py-3">Symbol</th>
              <th className="text-left px-4 py-3">Amharic Name</th>
            </tr>
          </thead>
          <tbody>
            {GEEZ_NUMERAL_TABLE.map((row, idx) => (
              <tr key={row.value} className="border-b border-border/30 hover:bg-secondary/30 transition">
                <td className="px-4 py-3 text-foreground/90">
                  {row.value.toLocaleString('en-US')}
                </td>
                <td className="px-4 py-3 text-lg font-semibold text-primary">
                  {row.symbol}
                </td>
                <td className="px-4 py-3">
                  <button
                    className="hover:text-primary focus:text-primary transition focus:outline-none font-medium"
                    onClick={() => handlePronounce(row.name, idx)}
                    aria-label={`Pronounce ${row.name}`}
                  >
                    <span className={speakingIndex === idx ? 'text-primary font-bold' : ''}>
                      {row.name}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
        <p className="text-sm text-foreground">
          <strong>Pro tip:</strong> Combine Ge&apos;ez numerals from largest to smallest. For example: ፳፻፲፫ = 2013 EC (፳ = 20, ፻ = 100, so 20 × 100 = 2000, then ፲፫ adds 13).
        </p>
      </div>
    </div>
  )
}
