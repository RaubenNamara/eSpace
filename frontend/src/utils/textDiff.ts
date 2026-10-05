// What changed between two versions of an eNote page, word by word - for the History panel.
// Pages are HTML, so both sides are reduced to their text first (one paragraph per line) and
// compared as words. Long pages fall back to comparing whole paragraphs, which keeps the work
// bounded; images are counted separately since a word diff can't show them.

export interface DiffPart {
  type: 'same' | 'add' | 'del'
  text: string
}

export interface DiffSummary {
  parts: DiffPart[]
  added: number
  removed: number
  imagesBefore: number
  imagesAfter: number
}

const BLOCK_TAGS = /<\/(p|div|h[1-6]|li|tr|blockquote|pre|figure|figcaption|table|ul|ol)>|<br\s*\/?>/gi

export const htmlToText = (html: string): string => {
  if (!html) return ''
  const withBreaks = html.replace(BLOCK_TAGS, '\n').replace(/<[^>]+>/g, ' ')
  const el = document.createElement('textarea')
  el.innerHTML = withBreaks
  return el.value
    .split('\n')
    .map(line => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n')
}

export const countImages = (html: string): number => (html.match(/<img\b/gi) || []).length

// Each word keeps the space after it (so joining tokens gives back the text); line breaks are
// tokens of their own. Tokens are compared without that space - see key()
const tokenize = (text: string): string[] => text.match(/[^\s]+[ \t]*|\n/g) || []
const key = (token: string) => token.trim() || '\n'

// Longest common subsequence over tokens - O(n*m), so callers cap n*m
const lcsDiff = (a: string[], b: string[]): DiffPart[] => {
  const n = a.length
  const m = b.length
  const ka = a.map(key)
  const kb = b.map(key)
  const dp: Uint32Array[] = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = ka[i] === kb[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }
  const out: DiffPart[] = []
  const push = (type: DiffPart['type'], text: string) => {
    const last = out[out.length - 1]
    if (last && last.type === type) last.text += text
    else out.push({ type, text })
  }
  let i = 0
  let j = 0
  while (i < n && j < m) {
    if (ka[i] === kb[j]) { push('same', b[j]); i++; j++ }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { push('del', a[i]); i++ }
    else { push('add', b[j]); j++ }
  }
  while (i < n) push('del', a[i++])
  while (j < m) push('add', b[j++])
  return out
}

const MAX_CELLS = 4_000_000

export const diffHtml = (beforeHtml: string, afterHtml: string): DiffSummary => {
  const before = htmlToText(beforeHtml)
  const after = htmlToText(afterHtml)
  let a = tokenize(before)
  let b = tokenize(after)
  // Too long to compare word by word: compare paragraphs instead
  if (a.length * b.length > MAX_CELLS) {
    a = before.split('\n').map(l => `${l}\n`)
    b = after.split('\n').map(l => `${l}\n`)
  }
  const parts = lcsDiff(a, b)
  const words = (t: string) => (t.trim() ? t.trim().split(/\s+/).length : 0)
  return {
    parts,
    added: parts.filter(p => p.type === 'add').reduce((n, p) => n + words(p.text), 0),
    removed: parts.filter(p => p.type === 'del').reduce((n, p) => n + words(p.text), 0),
    imagesBefore: countImages(beforeHtml),
    imagesAfter: countImages(afterHtml)
  }
}

// Long unchanged stretches are cut down to their ends, so the changes stand out
export const condense = (parts: DiffPart[], keep = 12): DiffPart[] => parts.map((p, i) => {
  if (p.type !== 'same') return p
  const tokens = tokenize(p.text)
  if (tokens.length <= keep * 2 + 4) return p
  const head = i === 0 ? '' : tokens.slice(0, keep).join('')
  const tail = i === parts.length - 1 ? '' : tokens.slice(-keep).join('')
  return { type: 'same', text: `${head}${head ? '… ' : '…'}${tail}` }
})
