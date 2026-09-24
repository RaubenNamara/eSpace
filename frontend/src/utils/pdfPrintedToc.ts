// Builds a table of contents for a PDF that has no embedded bookmarks, by reading the book's own
// printed "Contents" page(s): lines like "Measurement ........ 12". Printed page numbers are then
// mapped to real PDF pages (books start numbering after the cover and front matter), using the
// PDF's own page labels when it has them, otherwise by finding where the chapter titles actually
// appear. Returns [] when no believable contents page is found - the caller falls back to a page list.

export interface PrintedTocEntry {
  title: string
  page: number | null // 1-indexed PDF page
  depth: number
}

interface Line {
  text: string
  x: number
}

const SCAN_PAGES = 25
// "Title ....... 12", "Title 12", "Chapter 3: Title – 45"
const ENTRY = /^(.{2,160}?)[\s.·•…_\-–—]*?(?:\s|\.{2,}|…)(\d{1,4})$/
const CONTENTS_HEADING = /^\s*(table\s+of\s+)?contents\s*$/i

async function pageLines(doc: any, pageNum: number): Promise<Line[]> {
  const page = await doc.getPage(pageNum)
  const content = await page.getTextContent()
  // Group text runs into lines by their baseline (y), then read each line left to right
  const rows = new Map<number, { x: number; str: string }[]>()
  for (const item of content.items as any[]) {
    if (!item.str || !item.transform) continue
    const y = Math.round(item.transform[5] / 3) * 3
    if (!rows.has(y)) rows.set(y, [])
    rows.get(y)!.push({ x: item.transform[4], str: item.str })
  }
  return Array.from(rows.entries())
    .sort((a, b) => b[0] - a[0]) // top of the page first
    .map(([, parts]) => {
      parts.sort((a, b) => a.x - b.x)
      return { text: parts.map(p => p.str).join(' ').replace(/\s+/g, ' ').trim(), x: parts[0].x }
    })
    .filter(line => line.text)
}

function parseEntry(line: Line): { title: string; printed: number; x: number } | null {
  const m = line.text.match(ENTRY)
  if (!m) return null
  const title = m[1].replace(/[\s.·•…_\-–—]+$/, '').trim()
  // A title needs real words, not just another number or a stray symbol
  if (!/[A-Za-z]{2,}/.test(title) || CONTENTS_HEADING.test(title)) return null
  return { title, printed: parseInt(m[2], 10), x: line.x }
}

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

export async function extractPrintedToc(doc: any): Promise<PrintedTocEntry[]> {
  const total: number = doc.numPages
  const scanTo = Math.min(total, SCAN_PAGES)
  const textCache = new Map<number, Line[]>()
  const linesOf = async (n: number) => {
    if (!textCache.has(n)) textCache.set(n, await pageLines(doc, n).catch(() => []))
    return textCache.get(n)!
  }

  // 1. Find the contents page(s): a "Contents" heading, or a page that's mostly "title ... number"
  //    lines; a contents list running over several pages is followed while pages keep looking alike.
  let entries: { title: string; printed: number; x: number }[] = []
  let tocEnd = 0
  for (let n = 1; n <= scanTo; n++) {
    const lines = await linesOf(n)
    const parsed = lines.map(parseEntry).filter(Boolean) as { title: string; printed: number; x: number }[]
    const hasHeading = lines.slice(0, 6).some(l => CONTENTS_HEADING.test(l.text))
    const looksLikeToc = parsed.length >= 5 && parsed.length >= lines.length * 0.4
    if ((hasHeading && parsed.length >= 3) || looksLikeToc) {
      entries = parsed
      tocEnd = n
      for (let next = n + 1; next <= Math.min(total, n + 6); next++) {
        const more = (await linesOf(next)).map(parseEntry).filter(Boolean) as typeof parsed
        if (more.length < 3) break
        entries.push(...more)
        tocEnd = next
      }
      break
    }
  }
  // Printed page numbers in a real contents list only go up (allowing equal for sub-entries)
  entries = entries.filter((e, i, all) => i === 0 || e.printed >= all[i - 1].printed)
  if (entries.length < 3) return []

  // 2. Map printed numbers to PDF pages - page labels first
  let labelIndex: Map<string, number> | null = null
  try {
    const labels: string[] | null = await doc.getPageLabels()
    if (labels?.some(l => /^\d+$/.test(l))) {
      labelIndex = new Map()
      labels.forEach((l, i) => { if (!labelIndex!.has(l)) labelIndex!.set(l, i + 1) })
    }
  } catch {
    // no labels - fall through to the title search
  }

  let offset: number | null = null
  if (!labelIndex) {
    // Find where a few entries' titles actually appear after the contents pages; the most common
    // difference between "real page" and "printed page" is this book's offset.
    const votes = new Map<number, number>()
    for (const entry of entries.slice(0, 4)) {
      const needle = normalize(entry.title).slice(0, 30)
      if (needle.length < 4) continue
      const from = Math.max(tocEnd + 1, entry.printed)
      const to = Math.min(total, entry.printed + 40)
      for (let n = from; n <= to; n++) {
        const text = normalize((await linesOf(n)).slice(0, 12).map(l => l.text).join(' '))
        if (text.includes(needle)) {
          const d = n - entry.printed
          votes.set(d, (votes.get(d) ?? 0) + 1)
          break
        }
      }
    }
    offset = Array.from(votes.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0
  }

  // 3. Depth from indentation: entries noticeably right of the leftmost ones are sub-sections
  const minX = Math.min(...entries.map(e => e.x))
  return entries.map(e => {
    const page = labelIndex ? labelIndex.get(String(e.printed)) ?? null : e.printed + (offset ?? 0)
    return {
      title: e.title,
      page: page && page >= 1 && page <= total ? page : null,
      depth: e.x - minX > 12 ? 1 : 0,
    }
  })
}
