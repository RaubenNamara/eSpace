// Finds how much empty white margin a PDF's pages have, so a phone can trim it off and show the
// printed text larger. A few pages from inside the book (not the cover) are drawn small, the
// printed area (anything darker than near-white) is found on each, and the smallest box holding
// all of them - plus a little breathing room - is the part of every page that's kept. One box for
// the whole book, so every page stays the same size and lines up when turned.

export interface PageTrim {
  // Fractions of the page width/height to cut from each side
  left: number
  top: number
  right: number
  bottom: number
}

const SAMPLE_WIDTH = 320
const INK = 232 // brightness below this counts as printed
const PADDING = 0.025 // kept around the printed area
const MAX_SIDE = 0.2 // never cut more than this from one side
const MIN_WORTHWHILE = 0.03 // not worth trimming if every side is thinner than this

/** Printed area of one drawn page, as fractions of its size (null for a blank page) */
function inkBox(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const data = ctx.getImageData(0, 0, w, h).data
  let minX = w, minY = h, maxX = -1, maxY = -1
  for (let y = 0; y < h; y++) {
    let rowInk = 0
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      if (lum < INK) {
        rowInk++
        if (x < minX) minX = x
        if (x > maxX) maxX = x
      }
    }
    // A lone stray dot doesn't make a row printed
    if (rowInk > 1) {
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
  if (maxX < 0 || maxY < 0) return null
  return { left: minX / w, top: minY / h, right: 1 - (maxX + 1) / w, bottom: 1 - (maxY + 1) / h }
}

/** Margins to trim for this book, or null when its pages are already close to edge-to-edge */
export async function measurePageTrim(pdfDoc: any, totalPages: number): Promise<PageTrim | null> {
  if (!pdfDoc || totalPages < 3) return null
  // Up to six pages spread through the first part of the book, skipping the cover
  const last = Math.min(totalPages, 40)
  const picks = new Set<number>()
  for (let k = 0; k < 6; k++) picks.add(Math.round(2 + (k * (last - 2)) / 5))

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return null

  const boxes: PageTrim[] = []
  for (const n of picks) {
    try {
      const page = await pdfDoc.getPage(n)
      const base = page.getViewport({ scale: 1 })
      const viewport = page.getViewport({ scale: SAMPLE_WIDTH / base.width })
      canvas.width = Math.round(viewport.width)
      canvas.height = Math.round(viewport.height)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      await page.render({ canvasContext: ctx, viewport }).promise
      const box = inkBox(ctx, canvas.width, canvas.height)
      if (box) boxes.push(box)
    } catch {
      // skip a page that won't draw
    }
  }
  if (boxes.length < 2) return null

  const side = (key: keyof PageTrim) => Math.min(MAX_SIDE, Math.max(0, Math.min(...boxes.map(b => b[key])) - PADDING))
  const trim = { left: side('left'), top: side('top'), right: side('right'), bottom: side('bottom') }
  // Keep the text centred: cut the same from left and right
  const across = Math.min(trim.left, trim.right)
  trim.left = across
  trim.right = across
  if (Object.values(trim).every(v => v < MIN_WORTHWHILE)) return null
  return trim
}
