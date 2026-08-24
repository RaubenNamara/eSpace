export interface HighlightSegment {
  text: string
  match: boolean
}

/**
 * Splits text into segments around case-insensitive matches of `term`, for rendering with
 * <mark> around the matched parts. Deliberately returns data to render via {{ }} interpolation
 * rather than a raw HTML string - v-html on search-result text (which ultimately comes from
 * user-submitted titles/descriptions) would be an XSS vector.
 */
export function highlightSegments(text: string | null | undefined, term: string): HighlightSegment[] {
  if (!text) return []
  const trimmed = term.trim()
  if (!trimmed) return [{ text, match: false }]

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  return parts
    .filter(part => part !== '')
    .map(part => ({ text: part, match: part.toLowerCase() === trimmed.toLowerCase() }))
}
