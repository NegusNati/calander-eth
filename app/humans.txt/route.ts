import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

const body = `Team: Ethiopian Calendar Converter
Site: https://ethiopian-calendar.app
Contact: hello@ethiopian-calendar.app
GitHub: https://github.com/negusnati
`;

export function GET() {
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, immutable',
    },
  })
}
