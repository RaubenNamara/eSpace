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

// Scales the whole report onto a single A4 page (shrinking to fit both width and height,
// centered with a small margin) rather than the previous fit-width-and-paginate-overflow
// approach - a report card should read as one page, not spill a few lines onto a second sheet.
const PAGE_MARGIN_PT = 18

function addCanvasAsPage(pdf: jsPDF, canvas: HTMLCanvasElement, isFirstPage: boolean): void {
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const maxWidth = pageWidth - PAGE_MARGIN_PT * 2
  const maxHeight = pageHeight - PAGE_MARGIN_PT * 2

  const canvasRatio = canvas.width / canvas.height
  let imgWidth = maxWidth
  let imgHeight = imgWidth / canvasRatio

  if (imgHeight > maxHeight) {
    imgHeight = maxHeight
    imgWidth = imgHeight * canvasRatio
  }

  const x = (pageWidth - imgWidth) / 2
  const y = (pageHeight - imgHeight) / 2
  const imgData = canvas.toDataURL('image/jpeg', 0.95)

  if (!isFirstPage) pdf.addPage()
  pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight)
}

// A4 width at 96dpi. On screen the report card renders as wide as its modal (up to ~1024px),
// much wider-relative-to-tall than an A4 page - "contain" that shape into the page and most of
// the page height goes unused as blank margin above/below. Narrowing the element to print width
// before capturing makes its content reflow taller (table columns and comment boxes compress
// instead of sprawling sideways), so the captured aspect ratio lands close to A4's own and the
// page ends up filled top to bottom instead of letterboxed.
const PRINT_WIDTH_PX = 794

export async function captureElement(el: HTMLElement): Promise<HTMLCanvasElement> {
  if ('fonts' in document) {
    await (document as Document & { fonts: FontFaceSet }).fonts.ready
  }

  const originalWidth = el.style.width
  const originalMaxWidth = el.style.maxWidth
  el.style.width = `${PRINT_WIDTH_PX}px`
  el.style.maxWidth = `${PRINT_WIDTH_PX}px`
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))

  try {
    return await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      // The report card is always captured from inside a `position: fixed` modal. html2canvas
      // positions fixed elements using the underlying page's scroll offset instead of the
      // viewport, so if the page behind the modal was scrolled before it opened, the capture
      // comes out padded with blank space equal to that scroll distance. Telling it the window
      // is scrolled to (0,0) cancels that out.
      scrollX: 0,
      scrollY: -window.scrollY,
    })
  } finally {
    el.style.width = originalWidth
    el.style.maxWidth = originalMaxWidth
  }
}

export function buildPdfFromCanvases(canvases: HTMLCanvasElement[]): jsPDF {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
  canvases.forEach((canvas, i) => addCanvasAsPage(pdf, canvas, i === 0))
  return pdf
}

export async function downloadElementAsPdf(el: HTMLElement, filename: string): Promise<void> {
  await withLightMode(async () => {
    const canvas = await captureElement(el)
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
    addCanvasAsPage(pdf, canvas, true)
    pdf.save(filename)
  })
}

export async function downloadElementsAsPdf(elements: HTMLElement[], filename: string): Promise<void> {
  if (elements.length === 0) return
  await withLightMode(async () => {
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
    for (let i = 0; i < elements.length; i++) {
      const canvas = await captureElement(elements[i])
      addCanvasAsPage(pdf, canvas, i === 0)
    }
    pdf.save(filename)
  })
}

export function sanitizeFilename(name: string): string {
  return name.replace(/[^a-z0-9-_]+/gi, '_')
}
