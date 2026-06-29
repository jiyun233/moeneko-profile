const WEEKDAY_NAMES = ['日', '一', '二', '三', '四', '五', '六']

export function getWeekDay(date: Date): string {
  return WEEKDAY_NAMES[date.getDay()] ?? '?'
}

export function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}年${m}月${d}日 星期${getWeekDay(date)}`
}

export function formatTime(date: Date): string {
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  return `${h}:${min}`
}

function percentOfPeriod(start: Date, end: Date, now: Date): number {
  const total = end.getTime() - start.getTime()
  const elapsed = now.getTime() - start.getTime()
  return Math.min(100, Math.max(0, (elapsed / total) * 100))
}

export interface TimeProgress {
  day: number
  week: number
  month: number
  year: number
}

export function getTimeProgress(now: Date = new Date()): TimeProgress {
  const year = now.getFullYear()
  const month = now.getMonth()
  const date = now.getDate()
  const dayOfWeek = now.getDay()

  const dayStart = new Date(year, month, date, 0, 0, 0)
  const dayEnd = new Date(year, month, date, 23, 59, 59, 999)

  const weekStart = new Date(year, month, date - dayOfWeek, 0, 0, 0)
  const weekEnd = new Date(year, month, date - dayOfWeek + 6, 23, 59, 59, 999)

  const monthStart = new Date(year, month, 1)
  const monthEnd = new Date(year, month + 1, 0, 23, 59, 59, 999)

  const yearStart = new Date(year, 0, 1)
  const yearEnd = new Date(year, 11, 31, 23, 59, 59, 999)

  return {
    day: percentOfPeriod(dayStart, dayEnd, now),
    week: percentOfPeriod(weekStart, weekEnd, now),
    month: percentOfPeriod(monthStart, monthEnd, now),
    year: percentOfPeriod(yearStart, yearEnd, now),
  }
}
