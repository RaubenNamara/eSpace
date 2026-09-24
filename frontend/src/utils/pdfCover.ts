// Renders the first page of a library PDF in the browser as a JPEG "book cover", so the eLibrary
// shelf can show each book's real cover. pdf.js is imported on demand (it's large), and
// disableAutoFetch/disableStream make it fetch only the byte ranges page 1 needs - not the whole
// file - since library PDFs are static files Apache serves with range support.

const COVER_WIDTH = 480

export interface PdfCover {
  blob: Blob
  totalPages: number
}

export async function renderPdfCover(url: string): Promise<PdfCover> {
  const pdfjsLib = await import('pdfjs-dist')
  const { default: workerUrl } = await import('pdfjs-dist/build/pdf.worker.min.mjs?url')
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

  const doc = await pdfjsLib.getDocument({
    url,
    standardFontDataUrl: '/pdfjs/standard_fonts/',
    cMapUrl: '/pdfjs/cmaps/',
    cMapPacked: true,
    disableAutoFetch: true,
    disableStream: true
  }).promise

  try {
    const page = await doc.getPage(1)
    const base = page.getViewport({ scale: 1 })
    const viewport = page.getViewport({ scale: COVER_WIDTH / base.width })

    const canvas = document.createElement('canvas')
    canvas.width = Math.round(viewport.width)
    canvas.height = Math.round(viewport.height)
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas unavailable')
    // White paper behind transparent PDF pages, otherwise the JPEG comes out black
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    await page.render({ canvasContext: ctx, viewport } as any).promise

    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Could not encode cover'))), 'image/jpeg', 0.85)
    )
    return { blob, totalPages: doc.numPages }
  } finally {
    doc.destroy()
  }
}
