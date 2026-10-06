<template>
  <!-- One page of an uploaded Item Bank PDF, drawn to the width it's given - used where a page
       of a past paper is placed on an eNote page. Loads only when scrolled near. -->
  <div ref="wrap" class="pdf-page-view relative w-full">
    <canvas ref="canvas" class="w-full h-auto rounded-lg bg-white shadow-sm" :class="{ invisible: state !== 'ready' }"></canvas>
    <div v-if="state === 'loading'" class="absolute inset-0 min-h-[12rem] rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
    <p v-else-if="state === 'error'" class="rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-6 text-center text-xs text-gray-500">This page could not be shown.</p>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'
// eslint-disable-next-line import/no-unresolved
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { resolveAssetUrl } from '@/utils/url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

const props = defineProps<{ url: string; page: number }>()
const wrap = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const state = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
let observer: IntersectionObserver | null = null

// One loaded document per file, shared by every page shown from it
const docs = ((globalThis as any).__esPdfDocs ??= new Map<string, Promise<any>>()) as Map<string, Promise<any>>

const draw = async () => {
  state.value = 'loading'
  try {
    const src = resolveAssetUrl(props.url)
    if (!docs.has(src)) docs.set(src, pdfjsLib.getDocument({ url: src, withCredentials: true }).promise)
    const doc = await docs.get(src)!
    const page = await doc.getPage(Math.min(Math.max(1, props.page), doc.numPages))
    const width = (wrap.value?.clientWidth || 600) * (window.devicePixelRatio || 1)
    const base = page.getViewport({ scale: 1 })
    const viewport = page.getViewport({ scale: width / base.width })
    const c = canvas.value
    if (!c) return
    c.width = viewport.width
    c.height = viewport.height
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, c.width, c.height)
    await page.render({ canvasContext: ctx, viewport }).promise
    state.value = 'ready'
  } catch {
    state.value = 'error'
  }
}

onMounted(() => {
  observer = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting) && state.value === 'idle') draw()
  }, { rootMargin: '300px' })
  if (wrap.value) observer.observe(wrap.value)
})
watch(() => [props.url, props.page], () => { state.value = 'idle'; draw() })
onBeforeUnmount(() => observer?.disconnect())
</script>
