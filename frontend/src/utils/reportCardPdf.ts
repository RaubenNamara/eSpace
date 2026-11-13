import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function withLightMode<T>(fn: () => Promise<T>): Promise<T> {
  const root = document.documentElement
  const wasDark = root.classList.contains('dark')
  if (wasDark) root.classList.remove('dark')
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  try {
    return await fn()
  } finally {
    if (wasDark) root.classList.add('dark')
  }
}

/*
 * Reports go onto A4. A short one that nearly fits is shrunk onto a single page (a few lines
 * spilling onto a second sheet reads badly); a longer one - the detailed report card - keeps the
 * full page width and runs on to as many A4 pages as it needs. Pages only break between table
 * rows and sections (never through a row), and every page carries a small running line: the
 * report's name on the left, "Page 2 of 3" on the right.
 */
const PAGE_MARGIN_PT = 22
const RUNNING_LINE_PT = 14
/** a report this close to one page (scale at or above this) is shrunk to fit on one */
const ONE_PAGE_FROM_SCALE = 0.86

// A4 width at 96dpi. Narrowing the element to print width before capturing makes its content
// reflow the way it will read on paper (tables and boxes compress instead of sprawling sideways).
const PRINT_WIDTH_PX = 760

/** Where a page may break, per captured canvas, in canvas pixels from the top */
const breakPoints = new WeakMap<HTMLCanvasElement, number[]>()
const runningTitles = new WeakMap<HTMLCanvasElement, string>()

export async function captureElement(el: HTMLElement): Promise<HTMLCanvasElement> {
  if ('fonts' in document) {
    await (document as Document & { fonts: FontFaceSet }).fonts.ready
  }

  const originalWidth = el.style.width
  const originalMaxWidth = el.style.maxWidth
  el.style.width = `${PRINT_WIDTH_PX}px`
  el.style.maxWidth = `${PRINT_WIDTH_PX}px`
  // Opt-in hook for capture-only style corrections (see CompetencyDetailReport.vue's grade-badge
  // rule) where html2canvas's rendering diverges from a real browser's and needs a nudge that
  // must never apply to the on-screen view.
  el.classList.add('is-capturing-pdf')
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))

  // Safe places to start a new page: the top of any table row, list item or marked block
  const box = el.getBoundingClientRect()
  const tops: number[] = []
  el.querySelectorAll<HTMLElement>(':scope > * > *, tr, li, [data-pdf-block], .pdf-block').forEach(n => {
    // keep a heading with what it heads: no break between a section label and the table under it,
    // after a section's heading band, or after a table's header row. (A plain line of text before
    // anything else - "1 subject is not graded…" - is no label: a page may break after it.)
    const prev = n.previousElementSibling
    const labelAbove = prev && prev.tagName === 'P' && n.tagName !== 'P' && (prev.classList.contains('rc-band') || !!n.querySelector('table'))
    if (prev && (labelAbove || prev.classList.contains('record-head'))) return
    // side-by-side boxes (.pdf-keep) are never cut through: break before them, not inside
    const keep = n.closest('.pdf-keep')
    if (keep && keep !== n) return
    if (n.tagName === 'TR' && (n.parentElement?.tagName === 'THEAD' || (!prev && n.parentElement?.previousElementSibling?.tagName === 'THEAD'))) return
    const r = n.getBoundingClientRect()
    if (r.height > 0) tops.push(r.top - box.top - 3)
  })
  const title = el.getAttribute('data-pdf-title') || ''

  try {
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      // The report card is often captured from inside a `position: fixed` modal. html2canvas
      // positions fixed elements using the underlying page's scroll offset instead of the
      // viewport, so if the page behind the modal was scrolled before it opened, the capture
      // comes out padded with blank space equal to that scroll distance. Telling it the window
      // is scrolled to (0,0) cancels that out.
      scrollX: 0,
      scrollY: -window.scrollY,
    })
    const k = canvas.height / Math.max(1, box.height)
    breakPoints.set(canvas, [...new Set(tops.map(t => Math.round(t * k)))].filter(t => t > 0).sort((a, b) => a - b))
    runningTitles.set(canvas, title)
    return canvas
  } finally {
    el.style.width = originalWidth
    el.style.maxWidth = originalMaxWidth
    el.classList.remove('is-capturing-pdf')
  }
}

function sliceCanvas(src: HTMLCanvasElement, from: number, to: number): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = src.width
  c.height = Math.max(1, to - from)
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, c.width, c.height)
  ctx.drawImage(src, 0, from, src.width, to - from, 0, 0, src.width, to - from)
  return c
}

/** Adds one captured report: on one page if it (nearly) fits, else across as many as it needs */
function addCanvas(pdf: jsPDF, canvas: HTMLCanvasElement, isFirst: boolean): void {
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()
  const maxW = pageW - PAGE_MARGIN_PT * 2
  const maxH = pageH - PAGE_MARGIN_PT * 2

  const fitWidthScale = maxW / canvas.width // pt per canvas px at full width
  const oneShot = canvas.height * fitWidthScale <= maxH / ONE_PAGE_FROM_SCALE

  if (oneShot) {
    let w = maxW
    let h = canvas.height * fitWidthScale
    if (h > maxH) {
      h = maxH
      w = canvas.width * (maxH / canvas.height)
    }
    if (!isFirst) pdf.addPage()
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', (pageW - w) / 2, PAGE_MARGIN_PT, w, h)
    return
  }

  // Several pages at full width, leaving room for the running line
  const bodyH = maxH - RUNNING_LINE_PT
  const perPage = Math.floor(bodyH / fitWidthScale) // canvas px per page
  const breaks = breakPoints.get(canvas) ?? []
  const cuts: number[] = [0]
  while (canvas.height - cuts[cuts.length - 1] > perPage) {
    const start = cuts[cuts.length - 1]
    const limit = start + perPage
    // the lowest safe break on this page that still fills at least 60% of it
    // the lowest safe break that still fills most of the page; failing that, any safe break below
    // the top quarter - a shorter page is better than one cut through a row of boxes
    const safe = breaks.filter(b => b > start + perPage * 0.6 && b <= limit)
    const fallback = safe.length ? safe : breaks.filter(b => b > start + perPage * 0.25 && b <= limit)
    cuts.push(fallback.length ? fallback[fallback.length - 1] : limit)
  }
  cuts.push(canvas.height)

  const pages = cuts.length - 1
  const title = runningTitles.get(canvas) || ''
  for (let i = 0; i < pages; i++) {
    if (!isFirst || i > 0) pdf.addPage()
    const part = sliceCanvas(canvas, cuts[i], cuts[i + 1])
    const h = part.height * fitWidthScale
    pdf.addImage(part.toDataURL('image/jpeg', 0.95), 'JPEG', PAGE_MARGIN_PT, PAGE_MARGIN_PT, maxW, h)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    pdf.setTextColor(110, 110, 120)
    const y = pageH - PAGE_MARGIN_PT + 4
    if (title) pdf.text(title, PAGE_MARGIN_PT, y)
    pdf.text(`Page ${i + 1} of ${pages}`, pageW - PAGE_MARGIN_PT, y, { align: 'right' })
  }
}

export function buildPdfFromCanvases(canvases: HTMLCanvasElement[]): jsPDF {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
  canvases.forEach((canvas, i) => addCanvas(pdf, canvas, i === 0))
  return pdf
}

export async function downloadElementAsPdf(el: HTMLElement, filename: string): Promise<void> {
  await withLightMode(async () => {
    const canvas = await captureElement(el)
    buildPdfFromCanvases([canvas]).save(filename)
  })
}

export async function downloadElementsAsPdf(elements: HTMLElement[], filename: string): Promise<void> {
  if (elements.length === 0) return
  await withLightMode(async () => {
    const canvases: HTMLCanvasElement[] = []
    for (const el of elements) canvases.push(await captureElement(el))
    buildPdfFromCanvases(canvases).save(filename)
  })
}

export function sanitizeFilename(name: string): string {
  return name.replace(/[^a-z0-9-_]+/gi, '_')
}
