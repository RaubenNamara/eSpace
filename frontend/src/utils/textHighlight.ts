// Plain-text-offset-based highlighting for eNotes page content. Highlights are stored as
// character positions into the container's own textContent (not DOM node paths or wrapped HTML),
// so they're simple to store/transmit and don't care about the exact tag structure CKEditor
// happened to produce - the tradeoff is that if a teacher edits the page afterward, a student's
// existing highlight can drift onto the wrong text, same as any offset-based annotation scheme.

export interface StoredHighlight {
  id?: number
  start_offset: number
  end_offset: number
  color: string
}

function collectTextNodes(container: Node): Text[] {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  let n = walker.nextNode()
  while (n) {
    nodes.push(n as Text)
    n = walker.nextNode()
  }
  return nodes
}

// Converts a live Selection Range (from the user dragging over text) into plain-text character
// offsets relative to `container`, by summing the length of every text node before the range's
// boundaries.
export function rangeToOffsets(container: HTMLElement, range: Range): { start: number; end: number } | null {
  const nodes = collectTextNodes(container)
  let pos = 0
  let start = -1
  let end = -1
  for (const node of nodes) {
    if (start === -1 && node === range.startContainer) start = pos + range.startOffset
    if (node === range.endContainer) end = pos + range.endOffset
    pos += node.textContent?.length ?? 0
  }
  if (start === -1 || end === -1 || end <= start) return null
  return { start, end }
}

// Wraps each [start_offset, end_offset) span in a <mark>, splitting text nodes as needed.
// Ranges are applied independently - overlapping highlights just nest rather than merging, which
// is rare and visually harmless.
export function applyHighlights(container: HTMLElement, highlights: StoredHighlight[]) {
  if (!highlights.length) return
  const sorted = [...highlights].sort((a, b) => a.start_offset - b.start_offset)
  let pos = 0
  const nodes = collectTextNodes(container)

  for (const node of nodes) {
    const text = node.textContent ?? ''
    const nodeStart = pos
    const nodeEnd = pos + text.length
    pos = nodeEnd
    if (!node.parentNode || text.length === 0) continue

    const overlaps = sorted.filter((h) => h.start_offset < nodeEnd && h.end_offset > nodeStart)
    if (overlaps.length === 0) continue

    const cuts = new Set<number>([0, text.length])
    for (const h of overlaps) {
      cuts.add(Math.max(0, h.start_offset - nodeStart))
      cuts.add(Math.min(text.length, h.end_offset - nodeStart))
    }
    const points = Array.from(cuts).sort((a, b) => a - b)

    const frag = document.createDocumentFragment()
    for (let i = 0; i < points.length - 1; i++) {
      const segStart = points[i]
      const segEnd = points[i + 1]
      if (segStart === segEnd) continue
      const segText = text.slice(segStart, segEnd)
      const absStart = nodeStart + segStart
      const absEnd = nodeStart + segEnd
      const covering = overlaps.find((h) => h.start_offset <= absStart && h.end_offset >= absEnd)
      if (covering) {
        const mark = document.createElement('mark')
        mark.className = `student-highlight student-highlight-${covering.color}`
        if (covering.id != null) mark.dataset.highlightId = String(covering.id)
        mark.textContent = segText
        frag.appendChild(mark)
      } else {
        frag.appendChild(document.createTextNode(segText))
      }
    }
    node.parentNode.replaceChild(frag, node)
  }
}

// Un-highlights a single mark by id, replacing it with its own plain text - used when a student
// clicks an existing highlight to remove it, without needing to re-render the whole page.
export function removeHighlightMark(container: HTMLElement, highlightId: number): void {
  const mark = container.querySelector(`mark[data-highlight-id="${highlightId}"]`)
  if (!mark?.parentNode) return
  mark.replaceWith(document.createTextNode(mark.textContent ?? ''))
}
