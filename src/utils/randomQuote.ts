export interface RandomQuoteData {
  text: string
  from: string
}

const FALLBACK_QUOTES: RandomQuoteData[] = [
  { text: '愿此行，终抵群星。', from: '崩坏：星穹铁道' },
  { text: '比起牺牲自己，我更想和你一起活下去。', from: 'Re:从零开始的异世界生活' },
  { text: '没有未来的未来，不是我想要的未来。', from: '境界的彼方' },
]

export async function fetchRandomQuote(): Promise<RandomQuoteData> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 3000)

  try {
    const res = await fetch('https://v1.hitokoto.cn?c=a', {
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    return {
      text: json.hitokoto,
      from: json.from || '未知',
    }
  } catch {
    const i = Math.floor(Math.random() * FALLBACK_QUOTES.length)
    return FALLBACK_QUOTES[i]!
  } finally {
    clearTimeout(timer)
  }
}
