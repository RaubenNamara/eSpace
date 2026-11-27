// Chat messages come back from the server HTML-escaped ("What&#039;s up"); they are shown as plain
// text, so turn the few escapes back into the characters the person typed.
const ENTITIES: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'", '&#39;': "'", '&apos;': "'" }
export const chatText = (s: string | null | undefined) => (s ? s.replace(/&(amp|lt|gt|quot|#0?39|apos);/g, m => ENTITIES[m] ?? m) : '')

/**
 * A plain message split into text and web addresses, so the addresses can be shown as links
 * without ever putting the message in as HTML: [{ text }, { text, href }, ...]
 */
const URL_RE = /\b(?:https?:\/\/|www\.)[^\s<>"']+[^\s<>"'.,;:!?)\]}]/gi
export function linkParts(text: string): { text: string; href?: string }[] {
  const parts: { text: string; href?: string }[] = []
  let last = 0
  for (const m of text.matchAll(URL_RE)) {
    const at = m.index ?? 0
    if (at > last) parts.push({ text: text.slice(last, at) })
    parts.push({ text: m[0], href: /^www\./i.test(m[0]) ? `https://${m[0]}` : m[0] })
    last = at + m[0].length
  }
  if (last < text.length) parts.push({ text: text.slice(last) })
  return parts
}
