<template>
  <!-- A PDF with its marking layers, every page one under the other (no page buttons), each page
       as wide as the space allows so nothing scrolls sideways. Pages draw as they come into view.
       Marks are stored relative to the page size, so any width shows them in the same place. -->
  <div class="pdf-viewer">
    <div ref="wrapperRef" class="pdf-viewer__pages">
      <div v-if="loading" class="pdf-viewer__status">Loading PDF…</div>
      <div v-else-if="error" class="pdf-viewer__status pdf-viewer__status--error">{{ error }}</div>
      <template v-else>
        <div
          v-for="p in pages"
          :key="p.num"
          :ref="(el) => setPageEl(p.num, el as HTMLElement | null)"
          class="pdf-viewer__page"
          :data-page="p.num"
          :style="{ width: cssWidth ? `${cssWidth}px` : '100%', aspectRatio: `${p.w} / ${p.h}` }"
          @pointerdown="setActive(p.num)"
        >
          <canvas :ref="(el) => setCanvasEl(p.num, el as HTMLCanvasElement | null)" class="pdf-viewer__page-canvas"></canvas>
          <AnnotationCanvas
            v-if="p.seen && cssWidth"
            :ref="(el: any) => setAnnotEl(p.num, el)"
            :background="null"
            :transparent="true"
            :width="cssWidth"
            :height="heightOf(p)"
            :readonly-layers="props.readonlyLayersByPage[p.num] || NO_LAYERS"
            :editable-layer="props.editableLayerByPage[p.num] || emptyLayer(p.num)"
            :mode="mode"
            :tool="tool"
            :color="color"
            :stroke-width="strokeWidth"
            :readonly="readonly"
            class="pdf-viewer__annotation-overlay"
            :class="{ 'pdf-viewer__annotation-overlay--passive': passive }"
            @update:editable-layer="(layer: AnnotationLayerJSON) => onLayerUpdate(p.num, layer)"
          />
          <span v-if="pages.length > 1" class="pdf-viewer__page-no">{{ p.num }} / {{ pages.length }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'
// eslint-disable-next-line import/no-unresolved
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import type { AnnotationLayerJSON, AnnotationLayerMode, AnnotationTool } from '@/types'
import AnnotationCanvas from './AnnotationCanvas.vue'
import { offlinePdfData } from '@/utils/offline/docs'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

interface Props {
  pdfUrl: string
  readonlyLayersByPage?: Record<number, AnnotationLayerJSON[]>
  editableLayerByPage?: Record<number, AnnotationLayerJSON>
  mode?: AnnotationLayerMode
  tool?: AnnotationTool
  color?: string
  strokeWidth?: number
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readonlyLayersByPage: () => ({}),
  editableLayerByPage: () => ({}),
  mode: 'readonly',
  tool: 'select',
  color: '#000000',
  strokeWidth: 3,
  readonly: false
})

const emit = defineEmits<{
  (e: 'update:editableLayerByPage', value: Record<number, AnnotationLayerJSON>): void
  (e: 'page-change', page: number): void
  (e: 'loaded', totalPages: number): void
}>()

/** widest a page is drawn (a page any wider is just bigger, not easier to read) */
const MAX_PAGE_WIDTH = 900
const NO_LAYERS: AnnotationLayerJSON[] = []

interface PageInfo { num: number; w: number; h: number; seen: boolean }

const wrapperRef = ref<HTMLDivElement | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
// shallowRef: pdf.js objects use private fields that a deep reactive proxy breaks
const pdfDoc = shallowRef<any>(null)
const pages = ref<PageInfo[]>([])
const cssWidth = ref(0)
const activePage = ref(1)

// read-only views let touches through, so a phone can scroll and pinch over the pages
const passive = computed(() => props.readonly && props.mode === 'readonly')

const pageEls = new Map<number, HTMLElement>()
const canvasEls = new Map<number, HTMLCanvasElement>()
const annotEls = new Map<number, any>()
const drawnAt = new Map<number, number>() // page -> the width it was drawn for
const emptyLayers = new Map<number, AnnotationLayerJSON>()
const emptyLayer = (n: number) => {
  if (!emptyLayers.has(n)) emptyLayers.set(n, { objects: [] })
  return emptyLayers.get(n)!
}
const heightOf = (p: PageInfo) => Math.round(cssWidth.value * p.h / p.w)

function setPageEl(n: number, el: HTMLElement | null) {
  if (el) { pageEls.set(n, el); observer?.observe(el) } else pageEls.delete(n)
}
function setCanvasEl(n: number, el: HTMLCanvasElement | null) {
  if (el) canvasEls.set(n, el); else canvasEls.delete(n)
}
function setAnnotEl(n: number, el: any) {
  if (el) annotEls.set(n, el); else annotEls.delete(n)
}
function setActive(n: number) {
  if (activePage.value !== n) {
    activePage.value = n
    emit('page-change', n)
  }
}

function measureWidth() {
  const w = wrapperRef.value?.clientWidth || 0
  // the wrapper's own padding is 8px each side
  return Math.max(200, Math.min(MAX_PAGE_WIDTH, w - 16))
}

async function drawPage(n: number) {
  const doc = pdfDoc.value
  const canvas = canvasEls.get(n)
  if (!doc || !canvas || !cssWidth.value || drawnAt.get(n) === cssWidth.value) return
  drawnAt.set(n, cssWidth.value)
  try {
    const page = await doc.getPage(n)
    const base = page.getViewport({ scale: 1 })
    // sharp on high-density screens, without huge canvases on big monitors
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const viewport = page.getViewport({ scale: (cssWidth.value / base.width) * dpr })
    canvas.width = Math.floor(viewport.width)
    canvas.height = Math.floor(viewport.height)
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    // pdf.js leaves blank areas transparent: paint the paper white first
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    await page.render({ canvasContext: ctx, viewport }).promise
  } catch (e) {
    drawnAt.delete(n)
    console.error('PDF page render failed', e)
  }
}

// pages draw (and their marking layers mount) as they come near the screen
let observer: IntersectionObserver | null = null
function makeObserver() {
  observer?.disconnect()
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      const n = Number((entry.target as HTMLElement).dataset.page)
      const p = pages.value.find(x => x.num === n)
      if (p && !p.seen) p.seen = true
      nextTick(() => drawPage(n))
    }
  }, { rootMargin: '800px 0px' })
  pageEls.forEach(el => observer!.observe(el))
}

async function loadPdf() {
  loading.value = true
  error.value = null
  pages.value = []
  drawnAt.clear()
  emptyLayers.clear()
  try {
    const saved = await offlinePdfData(props.pdfUrl)
    const doc = await pdfjsLib.getDocument({
      ...(saved ? { data: saved } : { url: props.pdfUrl }),
      standardFontDataUrl: '/pdfjs/standard_fonts/',
      cMapUrl: '/pdfjs/cmaps/',
      cMapPacked: true,
      disableAutoFetch: true
    }).promise
    pdfDoc.value = doc
    // each page's shape (pages of one PDF can differ)
    const infos: PageInfo[] = []
    for (let n = 1; n <= doc.numPages; n++) {
      const v = (await doc.getPage(n)).getViewport({ scale: 1 })
      infos.push({ num: n, w: v.width, h: v.height, seen: n === 1 })
    }
    loading.value = false
    await nextTick()
    cssWidth.value = measureWidth()
    pages.value = infos
    emit('loaded', doc.numPages)
    await nextTick()
    makeObserver()
    drawPage(1)
  } catch (err: any) {
    error.value = err?.message || 'Failed to load PDF'
    loading.value = false
  }
}

// a different width (phone turned, window resized): redraw at the new width
let resizeObs: ResizeObserver | null = null
let resizeTimer: ReturnType<typeof setTimeout> | null = null
function onResize() {
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    const w = measureWidth()
    if (!pages.value.length || Math.abs(w - cssWidth.value) < 24) return
    cssWidth.value = w
    nextTick(() => pages.value.filter(p => p.seen).forEach(p => drawPage(p.num)))
  }, 200)
}

function onLayerUpdate(n: number, layer: AnnotationLayerJSON) {
  setActive(n)
  emit('update:editableLayerByPage', { ...props.editableLayerByPage, [n]: layer })
}

// the toolbar's undo/redo/clear act on the page last written on
const active = () => annotEls.get(activePage.value)
function undo() { active()?.undo() }
function redo() { active()?.redo() }
function clearAll() { active()?.clearAll() }
function clearSelected() { active()?.clearSelected() }

const totalPages = computed(() => pages.value.length)
defineExpose({ undo, redo, clearAll, clearSelected, currentPage: activePage, totalPages })

watch(() => props.pdfUrl, () => {
  activePage.value = 1
  loadPdf()
})

onMounted(() => {
  loadPdf()
  if (typeof ResizeObserver !== 'undefined' && wrapperRef.value) {
    resizeObs = new ResizeObserver(onResize)
    resizeObs.observe(wrapperRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  resizeObs?.disconnect()
  if (resizeTimer) clearTimeout(resizeTimer)
  pdfDoc.value?.destroy?.()
})
</script>

<style scoped>
.pdf-viewer {
  width: 100%;
}

.pdf-viewer__pages {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background-color: #9ca3af;
  border-radius: 8px;
  overflow-x: hidden;
}

.dark .pdf-viewer__pages {
  background-color: #374151;
}

.pdf-viewer__status {
  padding: 40px;
  color: white;
  font-size: 14px;
}

.pdf-viewer__status--error {
  color: #fecaca;
}

.pdf-viewer__page {
  position: relative;
  max-width: 100%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

.pdf-viewer__page-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.pdf-viewer__annotation-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* read-only: touches go to the page (scroll, pinch-zoom), not the marks layer */
.pdf-viewer__annotation-overlay--passive {
  pointer-events: none;
}

.pdf-viewer__page-no {
  position: absolute;
  right: 6px;
  bottom: 6px;
  padding: 1px 6px;
  border-radius: 999px;
  background: rgba(17, 24, 39, 0.55);
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  pointer-events: none;
}
</style>
