// Chat messages come back from the server HTML-escaped ("What&#039;s up"); they are shown as plain
// text, so turn the few escapes back into the characters the person typed.
const ENTITIES: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'", '&#39;': "'", '&apos;': "'" }
export const chatText = (s: string | null | undefined) => (s ? s.replace(/&(amp|lt|gt|quot|#0?39|apos);/g, m => ENTITIES[m] ?? m) : '')
