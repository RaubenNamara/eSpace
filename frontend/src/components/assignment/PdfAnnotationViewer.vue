<template>
  <div class="pdf-viewer">
    <div class="pdf-viewer__controls">
      <button type="button" class="nav-btn" :disabled="currentPage <= 1" @click="prevPage">‹ Prev</button>
      <span class="page-info">Page {{ currentPage }} of {{ totalPages || '…' }}</span>
      <button type="button" class="nav-btn" :disabled="currentPage >= totalPages" @click="nextPage">Next ›</button>

      <span class="divider"></span>

      <button type="button" class="nav-btn" @click="zoomOut" title="Zoom Out">−</button>
      <span class="zoom-value">{{ Math.round(scale * 100) }}%</span>
      <button type="button" class="nav-btn" @click="zoomIn" title="Zoom In">+</button>
      <button type="button" class="nav-btn" @click="fitWidth" title="Fit Width">Fit Width</button>
      <button type="button" class="nav-btn" @click="fitPage" title="Fit Page">Fit Page</button>
    </div>

    <div ref="wrapperRef" class="pdf-viewer__canvas-wrapper">
      <div v-if="loading" class="pdf-viewer__status">Loading PDF…</div>
      <div v-else-if="error" class="pdf-viewer__status pdf-viewer__status--error">{{ error }}</div>
      <div
        v-else-if="pageWidth && pageHeight"
        class="pdf-viewer__page-stack"
        :style="{ maxWidth: pageWidth + 'px' }"
      >
        <canvas ref="pdfCanvasRef" :key="currentPage" :width="pageWidth" :height="pageHeight" class="pdf-viewer__page-canvas"></canvas>
        <AnnotationCanvas
          ref="canvasRef"
          :key="currentPage"
          :background="null"
          :transparent="true"
          :width="pageWidth"
          :height="pageHeight"
          :readonly-layers="readonlyLayersForPage"
          :editable-layer="editableLayerForPage"
          :mode="mode"
          :tool="tool"
          :color="color"
          :stroke-width="strokeWidth"
          :readonly="readonly"
          class="pdf-viewer__annotation-overlay"
          @update:editable-layer="onLayerUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRef, watch, onMounted } from 'vue'
import type { AnnotationLayerJSON, AnnotationLayerMode, AnnotationTool } from '@/types'
import AnnotationCanvas from './AnnotationCanvas.vue'
import { usePdfRenderer } from '@/composables/usePdfRenderer'

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

const wrapperRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<InstanceType<typeof AnnotationCanvas> | null>(null)
const pdfCanvasRef = ref<HTMLCanvasElement | null>(null)

const {
  loading, error, currentPage, totalPages, scale, pageWidth, pageHeight,
  loadPdf, prevPage, nextPage, zoomIn, zoomOut, fitWidth, fitPage
} = usePdfRenderer(toRef(props, 'pdfUrl'), {
  getCanvasEl: () => pdfCanvasRef.value,
  getWrapperEl: () => wrapperRef.value,
  onLoaded: total => emit('loaded', total),
  onPageChange: page => emit('page-change', page)
})

const readonlyLayersForPage = computed(() => props.readonlyLayersByPage[currentPage.value] || [])
const editableLayerForPage = computed(() => props.editableLayerByPage[currentPage.value] || { objects: [] })

function onLayerUpdate(layer: AnnotationLayerJSON) {
  emit('update:editableLayerByPage', { ...props.editableLayerByPage, [currentPage.value]: layer })
}

function undo() {
  canvasRef.value?.undo()
}
function redo() {
  canvasRef.value?.redo()
}
function clearAll() {
  canvasRef.value?.clearAll()
}
function clearSelected() {
  canvasRef.value?.clearSelected()
}

defineExpose({ undo, redo, clearAll, clearSelected, currentPage, totalPages })

watch(() => props.pdfUrl, () => {
  currentPage.value = 1
  loadPdf()
})

onMounted(loadPdf)
</script>

<style scoped>
.pdf-viewer {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.pdf-viewer__controls {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

:global(.dark) .pdf-viewer__controls {
  background-color: #1f2937;
  border-color: #374151;
}

@media (max-width: 640px) {
  .pdf-viewer__controls {
    padding: 6px 8px;
    gap: 4px;
  }

  .nav-btn {
    padding: 5px 8px;
    font-size: 12px;
  }

  .page-info,
  .zoom-value {
    min-width: 60px;
    font-size: 12px;
  }

  .pdf-viewer__canvas-wrapper {
    padding: 8px;
  }
}

.nav-btn {
  padding: 6px 10px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
}

:global(.dark) .nav-btn {
  background-color: #111827;
  border-color: #374151;
  color: #e5e7eb;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info,
.zoom-value {
  font-size: 13px;
  color: #374151;
  min-width: 90px;
  text-align: center;
}

:global(.dark) .page-info,
:global(.dark) .zoom-value {
  color: #d1d5db;
}

.divider {
  width: 1px;
  height: 20px;
  background-color: #e5e7eb;
}

.pdf-viewer__canvas-wrapper {
  flex: 1;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  background-color: #9ca3af;
}

.pdf-viewer__status {
  padding: 40px;
  color: white;
  font-size: 14px;
}

.pdf-viewer__status--error {
  color: #fecaca;
}

.pdf-viewer__page-stack {
  position: relative;
  width: 100%;
}

/* Normal-flow, intrinsically-sized element (not absolutely positioned): this
   is what gives the page-stack a real, definite height for the overlay below
   to resolve its own height:100% against. Letting the canvas set its own
   height via its intrinsic width/height attributes (height:auto) mirrors how
   a plain, unstyled canvas naturally sizes itself - deliberately avoiding
   aspect-ratio + position:absolute + height:100% together, which does not
   reliably establish a definite containing-block height for descendants. */
.pdf-viewer__page-canvas {
  display: block;
  width: 100%;
  height: auto;
}

.pdf-viewer__annotation-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
