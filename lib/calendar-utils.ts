export type EthiopicDate = {
  year: number
  month: number
  day: number
}

export const ETHIOPIAN_MONTHS = [
  { number: 1, english: 'Meskerem', amharic: 'መስከረም' },
  { number: 2, english: 'Tikimt', amharic: 'ጠቅምት' },
  { number: 3, english: 'Hidar', amharic: 'ኅዳር' },
  { number: 4, english: 'Tahsas', amharic: 'ታኅሳስ' },
  { number: 5, english: 'Terr', amharic: 'ተር' },
  { number: 6, english: 'Yekatit', amharic: 'የካቲት' },
  { number: 7, english: 'Megabit', amharic: 'መጋቢት' },
  { number: 8, english: 'Miazia', amharic: 'ሚያዝያ' },
  { number: 9, english: 'Genbot', amharic: 'ግንቦት' },
  { number: 10, english: 'Sene', amharic: 'ሰኔ' },
  { number: 11, english: 'Hamle', amharic: 'ሐምሌ' },
  { number: 12, english: 'Nehase', amharic: 'ነሐሴ' },
  { number: 13, english: 'Pagume', amharic: 'ጳጉሜ' },
]

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const GEEZ_NUMERAL_TABLE = [
  { value: 1, symbol: '፩', name: 'ሲድ (Sid)' },
  { value: 2, symbol: '፪', name: 'ሙሉ (Mulu)' },
  { value: 3, symbol: '፫', name: 'ሦስት (Sost)' },
  { value: 4, symbol: '፬', name: 'አርባ (Arba)' },
  { value: 5, symbol: '፭', name: 'አምስት (Amist)' },
  { value: 6, symbol: '፮', name: 'ስድስት (Sidist)' },
  { value: 7, symbol: '፯', name: 'ሰባት (Sebat)' },
  { value: 8, symbol: '፰', name: 'ስምንት (Simnit)' },
  { value: 9, symbol: '፱', name: 'ዘጠኝ (Zategnin)' },
  { value: 10, symbol: '፲', name: 'አስር (Asar)' },
  { value: 20, symbol: '፳', name: 'ሃያ (Haya)' },
  { value: 30, symbol: '፴', name: 'ሠላሳ (Salasa)' },
  { value: 40, symbol: '፵', name: 'አርባ (Arba)' },
  { value: 50, symbol: '፶', name: 'ሃምሳ (Hamsa)' },
  { value: 60, symbol: '፷', name: 'ስድሳ (Sidsa)' },
  { value: 70, symbol: '፸', name: 'ሰባ (Seba)' },
  { value: 80, symbol: '፹', name: 'ስምንያ (Simnya)' },
  { value: 90, symbol: '፺', name: 'ዘጠና (Zatgna)' },
  { value: 100, symbol: '፻', name: 'መተ (Mate)' },
  { value: 10000, symbol: '፼', name: 'ልዩ (Liyu)' },
]

export function getDaysInEthiopianMonth(year: number, month: number): number {
  if (month < 1 || month > 13) return 0
  if (month <= 12) return 30
  // Pagume: 5 or 6 days
  return isLeapYear(year) ? 6 : 5
}

function isLeapYear(year: number): boolean {
  return year % 4 === 3
}

export function formatEthiopianDate(date: EthiopicDate, useGeez = false): string {
  const monthName = ETHIOPIAN_MONTHS[date.month - 1]?.amharic ?? ''
  const day = useGeez ? toGeezNumeral(date.day) : date.day
  const year = useGeez ? toGeezNumeral(date.year) : date.year
  return `${monthName} ${day}, ${year} EC`
}

export function formatGregorianDate(date: EthiopicDate): string {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const month = monthNames[date.month - 1] ?? ''
  return `${month} ${date.day}, ${date.year}`
}

export function toGregorian(date: EthiopicDate): EthiopicDate {
  // Ethiopian calendar is 8 years behind Gregorian (approximately)
  // This is a simplified conversion
  const gregYear = date.year + 8
  let gregMonth = date.month + 8
  let gregDay = date.day

  if (gregMonth > 12) {
    gregMonth -= 12
  }

  return {
    year: gregYear,
    month: gregMonth,
    day: gregDay,
  }
}

export function getCalendarMatrix(year: number, month: number): any[] {
  const rows = []
  const daysInMonth = getDaysInEthiopianMonth(year, month)

  for (let day = 1; day <= daysInMonth; day++) {
    rows.push({
      date: { year, month, day },
      gregorian: toGregorian({ year, month, day }),
      isCurrentMonth: true,
    })
  }

  return rows
}

const GEEZ_NUMERALS: { [key: number]: string } = {
  1: '፩',
  2: '፪',
  3: '፫',
  4: '፬',
  5: '፭',
  6: '፮',
  7: '፯',
  8: '፰',
  9: '፱',
  10: '፲',
  20: '፳',
  30: '፴',
  40: '፵',
  50: '፶',
  60: '፷',
  70: '፸',
  80: '፹',
  90: '፺',
  100: '፻',
  10000: '፼',
}

export function toGeezNumeral(num: number): string {
  if (num === 0) return '፪'
  if (num < 0) return '-' + toGeezNumeral(Math.abs(num))

  let result = ''
  let remaining = num

  // Ten thousands
  if (remaining >= 10000) {
    const tenThousands = Math.floor(remaining / 10000)
    result += GEEZ_NUMERALS[10000].repeat(tenThousands)
    remaining %= 10000
  }

  // Hundreds
  if (remaining >= 100) {
    const hundreds = Math.floor(remaining / 100)
    result += GEEZ_NUMERALS[100].repeat(hundreds)
    remaining %= 100
  }

  // Tens
  if (remaining >= 10) {
    const tens = Math.floor(remaining / 10) * 10
    result += GEEZ_NUMERALS[tens] || ''
    remaining %= 10
  }

  // Ones
  if (remaining > 0) {
    result += GEEZ_NUMERALS[remaining] || ''
  }

  return result
}
