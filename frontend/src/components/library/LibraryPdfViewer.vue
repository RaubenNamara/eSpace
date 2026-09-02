<template>
  <div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
    <div class="bg-white dark:bg-gray-800 w-full h-full sm:h-[92vh] lg:h-[95vh] sm:max-w-4xl lg:max-w-5xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      <!-- Header -->
      <div class="relative flex-shrink-0 bg-gradient-to-r from-emerald-600 to-teal-600 px-4 sm:px-8 py-4 sm:py-5">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h2 class="text-base sm:text-xl font-bold text-white leading-tight truncate">{{ book.title }}</h2>
            <div class="flex flex-wrap items-center gap-2 mt-1 text-xs sm:text-sm text-emerald-100">
              <span v-if="book.subject_name" class="px-2 py-0.5 rounded-full bg-white/20 font-medium">{{ book.subject_name }}</span>
              <span v-if="teacherName" class="truncate">By {{ teacherName }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <a
              v-if="allowDownload"
              :href="pdfUrl"
              download
              class="p-2 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
              title="Download"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"></path>
              </svg>
            </a>
            <button
              @click="$emit('close')"
              class="p-2 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Canvas (pdf.js renders to pixels here - no native browser download affordance) -->
      <div
        ref="wrapperRef"
        class="flex-1 overflow-auto flex justify-center items-start p-4 sm:p-6 bg-gray-200 dark:bg-gray-900"
        @contextmenu.prevent
      >
        <div v-if="loading" class="text-gray-500 dark:text-gray-300 py-20 text-sm">Loading document…</div>
        <div v-else-if="error" class="text-red-400 py-20 text-sm">{{ error }}</div>
        <canvas
          v-else
          ref="canvasRef"
          :key="currentPage"
          :width="pageWidth"
          :height="pageHeight"
          class="shadow-lg bg-white"
          style="max-width: 100%; height: auto;"
        ></canvas>
      </div>

      <!-- Controls - bottom bar. Centered as one wrapped row on mobile; on sm+ the page-nav and
           zoom groups split to either side so the extra width is put to use instead of leaving
           everything bunched in the middle. -->
      <div class="flex items-center justify-center sm:justify-between gap-3 sm:gap-6 px-3 sm:px-6 py-2.5 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 flex-wrap flex-shrink-0">
        <div class="flex items-center gap-2">
          <button type="button" class="nav-btn" @click="zoomOut" title="Zoom out">−</button>
          <span class="text-xs text-gray-500 dark:text-gray-400 min-w-[48px] text-center">{{ Math.round(scale * 100) }}%</span>
          <button type="button" class="nav-btn" @click="zoomIn" title="Zoom in">+</button>
          <button type="button" class="nav-btn" @click="fitWidth">Fit Width</button>
        </div>
        <div class="flex items-center gap-2">
          <button type="button" class="nav-btn" :disabled="currentPage <= 1" @click="prevPage">‹ Prev</button>
          <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 min-w-[100px] text-center">Page {{ currentPage }} of {{ totalPages || '…' }}</span>
          <button type="button" class="nav-btn" :disabled="currentPage >= totalPages" @click="nextPage">Next ›</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePdfRenderer } from '@/composables/usePdfRenderer'
import type { LibraryBook } from '@/types/library'
import { resolveAssetUrl } from '@/utils/url'

const props = defineProps<{ book: LibraryBook }>()
defineEmits(['close'])

const wrapperRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const pdfUrl = computed(() => resolveAssetUrl(props.book.file_path))
const allowDownload = computed(() => !!props.book.allow_download)

const {
  loading, error, currentPage, totalPages, scale, pageWidth, pageHeight,
  loadPdf, prevPage, nextPage, zoomIn, zoomOut, fitWidth
} = usePdfRenderer(pdfUrl, {
  getCanvasEl: () => canvasRef.value,
  getWrapperEl: () => wrapperRef.value
})

const teacherName = computed(() => {
  if (!props.book.teacher_first_name) return ''
  return `${props.book.teacher_first_name} ${props.book.teacher_last_name || ''}`.trim()
})

onMounted(loadPdf)
</script>

<style scoped>
.nav-btn {
  padding: 6px 10px;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  flex-shrink: 0;
}

.dark .nav-btn {
  background-color: #111827;
  border-color: #374151;
  color: #e5e7eb;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
