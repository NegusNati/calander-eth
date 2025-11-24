import { ImageResponse } from 'next/og'
import pattern from '@/public/ethiopiac_num_pattern.svg'

export const runtime = 'edge'

const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export async function GET() {
  const title = "Ethiopian Calendar Converter"
  const subtitle =
    "Convert dates between Ethiopian and Gregorian calendars with Ge'ez numerals, holidays, and a bilingual experience."
  const accent = '#0f9d58' // brand green

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '64px',
          backgroundColor: '#0b0f0d',
          color: '#f5f7f6',
          backgroundImage: `linear-gradient(120deg, rgba(15,157,88,0.35), rgba(12,18,16,0.85)), url(${pattern.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontFamily:
            'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: accent,
              boxShadow: `0 0 0 6px rgba(15,157,88,0.18)`,
            }}
          />
          <span
            style={{
              fontSize: 20,
              letterSpacing: 0.4,
              fontWeight: 600,
              opacity: 0.9,
            }}
          >
            Ethiopian Calendar · Ge\u2019ez Numerals
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 64, lineHeight: 1.05, fontWeight: 800, letterSpacing: -1 }}>
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              maxWidth: 900,
              color: 'rgba(245,247,246,0.88)',
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              padding: '10px 16px',
              borderRadius: 999,
              background: 'rgba(15,157,88,0.16)',
              border: `1px solid rgba(15,157,88,0.35)`,
              fontSize: 20,
              fontWeight: 600,
              color: '#dff6e9',
            }}
          >
            Ethiopic ↔ Gregorian · Holidays · Mobile friendly
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
