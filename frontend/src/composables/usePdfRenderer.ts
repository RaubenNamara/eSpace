import { nextTick, ref, shallowRef, type Ref } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'
// eslint-disable-next-line import/no-unresolved
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

// Floor for fit-to-width so text never renders smaller than a comfortably readable size, even on
// a narrow mobile viewport.
const MIN_READABLE_SCALE = 1.3

interface UsePdfRendererOptions {
  getCanvasEl: () => HTMLCanvasElement | null
  getWrapperEl: () => HTMLElement | null
  onLoaded?: (totalPages: number) => void
  onPageChange?: (page: number) => void
}

/**
 * pdf.js page rendering/zoom/navigation, extracted from PdfAnnotationViewer.vue so the
 * annotation-overlay wiring in the component can stay focused on the Fabric side.
 */
export function usePdfRenderer(pdfUrl: Ref<string>, options: UsePdfRendererOptions) {
  const loading = ref(false)
  const error = ref<string | null>(null)
  // shallowRef, not ref: pdf.js documents/pages use ES private fields internally, and Vue's
  // ref() would deep-wrap the object in a reactive Proxy, breaking any method that reads its
  // own private fields ("Cannot read from private field").
  const pdfDoc = shallowRef<any>(null)
  const currentPage = ref(1)
  const totalPages = ref(0)
  const scale = ref(1.2)
  const pageWidth = ref(0)
  const pageHeight = ref(0)

  async function renderPage(pageNum: number) {
    if (!pdfDoc.value) return
    const page = await pdfDoc.value.getPage(pageNum)
    const viewport = page.getViewport({ scale: scale.value })

    // Set the page dimensions first so the live <canvas> element mounts (or resizes) at the
    // correct size, then render pdf.js's output directly into it.
    pageWidth.value = viewport.width
    pageHeight.value = viewport.height
    await nextTick()

    const canvas = options.getCanvasEl()
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // pdf.js leaves blank page areas fully transparent rather than painting an opaque white
    // background; without this fill, transparent regions show whatever is behind the canvas in
    // the DOM (gray in light mode, black in dark mode) instead of white page background.
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    await page.render({ canvasContext: ctx, viewport }).promise
    options.onPageChange?.(pageNum)
  }

  async function fitWidth() {
    const wrapper = options.getWrapperEl()
    if (!pdfDoc.value || !wrapper) return
    const page = await pdfDoc.value.getPage(currentPage.value)
    const baseViewport = page.getViewport({ scale: 1 })
    const availableWidth = wrapper.clientWidth - 32
    const availableHeight = wrapper.clientHeight - 32
    const widthScale = availableWidth / baseViewport.width
    // On a wide/short viewer (a large monitor, a MacBook's shallow window height) fitting purely
    // to width can render a portrait page far taller than what's visible, forcing heavy scrolling
    // just to read one page. Cap by the height fit too - but never below the readable floor, so
    // a genuinely tall-and-narrow viewer (mobile) still fits to width as before.
    const heightScale = availableHeight / baseViewport.height
    scale.value = Math.max(MIN_READABLE_SCALE, Math.min(widthScale, Math.max(heightScale, MIN_READABLE_SCALE)))
    await renderPage(currentPage.value)
  }

  async function fitPage() {
    const wrapper = options.getWrapperEl()
    if (!pdfDoc.value || !wrapper) return
    const page = await pdfDoc.value.getPage(currentPage.value)
    const baseViewport = page.getViewport({ scale: 1 })
    const availableWidth = wrapper.clientWidth - 32
    const availableHeight = wrapper.clientHeight - 32
    scale.value = Math.max(0.3, Math.min(availableWidth / baseViewport.width, availableHeight / baseViewport.height))
    await renderPage(currentPage.value)
  }

  async function loadPdf() {
    loading.value = true
    error.value = null
    try {
      // standardFontDataUrl/cMapUrl let pdf.js substitute the 14 standard PDF fonts (Helvetica,
      // Times, etc.) and render non-Latin/embedded-cmap text; without them pdf.js can render the
      // page but silently omit text using those fonts.
      const loadingTask = pdfjsLib.getDocument({
        url: pdfUrl.value,
        standardFontDataUrl: '/pdfjs/standard_fonts/',
        cMapUrl: '/pdfjs/cmaps/',
        cMapPacked: true
      })
      pdfDoc.value = await loadingTask.promise
      totalPages.value = pdfDoc.value.numPages
      options.onLoaded?.(totalPages.value)
      // Flip loading off *before* the first render, not after: the <canvas> element only exists
      // in the DOM once loading=false, so rendering while still "loading" would reach for a
      // canvas ref that hasn't mounted yet and silently do nothing.
      loading.value = false
      // Fit to width by default (standard PDF-reader behavior) rather than fitting the whole
      // page, which shrinks text to fit both dimensions and can end up tiny on a portrait page
      // inside a wide-but-short box.
      await fitWidth()
    } catch (err: any) {
      error.value = err?.message || 'Failed to load PDF'
      loading.value = false
    }
  }

  async function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--
      await renderPage(currentPage.value)
    }
  }

  async function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      await renderPage(currentPage.value)
    }
  }

  async function zoomIn() {
    scale.value = Math.min(scale.value + 0.2, 4)
    await renderPage(currentPage.value)
  }

  async function zoomOut() {
    scale.value = Math.max(scale.value - 0.2, 0.3)
    await renderPage(currentPage.value)
  }

  return {
    loading,
    error,
    currentPage,
    totalPages,
    scale,
    pageWidth,
    pageHeight,
    loadPdf,
    renderPage,
    prevPage,
    nextPage,
    zoomIn,
    zoomOut,
    fitWidth,
    fitPage
  }
}
