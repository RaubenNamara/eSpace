<template>
  <div ref="viewerRef" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-3">
    <div class="bg-white dark:bg-gray-800 w-full h-full sm:h-[97vh] lg:h-[98vh] sm:max-w-6xl lg:max-w-7xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      <!-- Header -->
      <div class="relative flex-shrink-0 bg-emerald-600 px-3 sm:px-6 py-2 sm:py-3">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0 flex-1">
            <h2 class="text-sm sm:text-lg font-bold text-white leading-tight truncate">{{ book.title }}</h2>
            <div class="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-emerald-100">
              <span v-if="book.subject_name" class="px-2 py-0.5 rounded-full bg-white/20 font-medium">{{ book.subject_name }}</span>
              <span v-if="teacherName" class="truncate">By {{ teacherName }}</span>
            </div>
            <!-- Reading progress - same "status readout sharing the title's own bar" pattern as
                 the AI Tutor widget in the eNotes reader, so it's visible without looking down at
                 the footer controls. -->
            <div v-if="bookImages.length > 0" class="hidden sm:flex items-center gap-2 mt-1.5 max-w-xs">
              <div class="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
                <div class="h-full bg-white rounded-full transition-all" :style="{ width: `${(currentPage / totalPages) * 100}%` }"></div>
              </div>
              <span class="text-[11px] text-emerald-100 flex-shrink-0">{{ currentPage }}/{{ totalPages }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <button
              v-if="bookImages.length > 0"
              @click="isMuted = !isMuted"
              class="p-2 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
              :title="isMuted ? 'Unmute page-turn sound' : 'Mute page-turn sound'"
            >
              <svg v-if="isMuted" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M11 5L6 9H2v6h4l5 4V5z"></path>
              </svg>
              <svg v-else class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5L6 9H2v6h4l5 4V5z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.54 8.46a5 5 0 010 7.07M18.36 5.64a9 9 0 010 12.73"></path>
              </svg>
            </button>
            <button
              v-if="bookImages.length > 0"
              @click="toggleFullscreen"
              class="p-2 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
              title="Fullscreen"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4"></path>
              </svg>
            </button>
            <button
              v-if="bookImages.length > 0"
              @click="showToc = !showToc"
              class="p-2 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
              title="Contents"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
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

      <!-- Book + table of contents -->
      <div class="flex-1 flex overflow-hidden relative">
        <!-- Mobile/tablet backdrop for the contents drawer - absolute (not fixed) since this
             viewer is a centered modal below the lg breakpoint, not a full-viewport page; fixed
             positioning would pin the drawer/backdrop to the browser window instead of the card. -->
        <div v-if="showToc" @click="showToc = false" class="absolute inset-0 bg-black/50 z-30 lg:hidden"></div>

        <div class="flex-1 overflow-hidden flex justify-center items-center p-1 sm:p-3 bg-gray-200 dark:bg-gray-900" @contextmenu.prevent>
          <div v-if="loading" class="text-gray-500 dark:text-gray-300 py-20 text-sm">Loading document…</div>
          <div v-else-if="error" class="text-red-400 py-20 text-sm">{{ error }}</div>
          <div v-else-if="preparing" class="w-full max-w-xs text-center">
            <p class="text-sm text-gray-500 dark:text-gray-300 mb-2">Preparing your book… {{ prepared }} / {{ totalPages }}</p>
            <div class="h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
              <div class="h-full bg-emerald-600 transition-all" :style="{ width: `${totalPages ? (prepared / totalPages) * 100 : 0}%` }"></div>
            </div>
          </div>
          <BookFlipbook
            v-else
            ref="flipbookRef"
            :images="bookImages"
            :page-width="bookPageWidth"
            :page-height="bookPageHeight"
            :muted="isMuted"
            class="max-w-full max-h-full transition-shadow duration-300 hover:drop-shadow-2xl"
            @flip="onFlip"
          />
        </div>

        <!-- Right-side contents panel - the PDF's own bookmarks/outline when it has one, else a
             plain page list, so a reader can jump straight to a topic instead of flipping through. -->
        <div
          v-if="bookImages.length > 0"
          class="absolute lg:static inset-y-0 right-0 z-40 w-64 max-w-[80vw] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col transform transition-transform duration-300 lg:translate-x-0"
          :class="showToc ? 'translate-x-0' : 'translate-x-full'"
        >
          <div class="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Contents</h3>
            <button @click="showToc = false" class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors lg:hidden">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-2 space-y-0.5">
            <button
              v-for="(entry, i) in tocEntries"
              :key="i"
              @click="jumpToPage(entry.page)"
              :disabled="!entry.page"
              :style="{ paddingLeft: `${8 + entry.depth * 14}px` }"
              class="w-full text-left py-1.5 pr-2 rounded-lg text-xs truncate transition-colors disabled:opacity-50 disabled:cursor-default"
              :class="entry.page === currentPage
                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            >
              {{ entry.title }}
            </button>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-center gap-3 sm:gap-6 px-3 sm:px-6 py-1.5 sm:py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 flex-shrink-0">
        <button type="button" class="nav-btn" :disabled="currentPage <= 1" @click="goPrev">‹ Prev</button>
        <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 min-w-[100px] text-center">Page {{ currentPage }} of {{ totalPages || '…' }}</span>
        <button type="button" class="nav-btn" :disabled="currentPage >= totalPages" @click="goNext">Next ›</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePdfRenderer } from '@/composables/usePdfRenderer'
import type { LibraryBook } from '@/types/library'
import { resolveAssetUrl } from '@/utils/url'
import { usePersistedRef } from '@/composables/usePersistedRef'
import BookFlipbook from '@/components/common/BookFlipbook.vue'

const props = defineProps<{ book: LibraryBook }>()
defineEmits(['close'])

// Shared with the eNotes reader too - muting the page-turn sound in one place should mean it
// stays muted everywhere, since it's a preference about the sound itself, not this one book.
const isMuted = usePersistedRef('espace:flipbook-muted', false)

const pdfUrl = computed(() => resolveAssetUrl(props.book.file_path))
const allowDownload = computed(() => !!props.book.allow_download)

const {
  loading, error, pdfDoc, currentPage, totalPages, scale,
  loadPdf, renderPage
} = usePdfRenderer(pdfUrl, {
  // No live single-page canvas in this viewer any more - every page is pre-rendered once into a
  // flipbook image (see prepareBook below), so the composable never needs a persistent canvas.
  getCanvasEl: () => null,
  getWrapperEl: () => null
})

const teacherName = computed(() => {
  if (!props.book.teacher_first_name) return ''
  return `${props.book.teacher_first_name} ${props.book.teacher_last_name || ''}`.trim()
})

// A real drag-to-curl flipbook (like heyzine.com/flip-book) needs every page as a picture up
// front - this is how Heyzine's own PDF conversion works too - rendered once at a fixed, readable
// resolution rather than per-zoom-level like the old single-page view, since re-rendering dozens
// of pages on every zoom click would be far too slow.
const BOOK_RENDER_SCALE = 1.8
const preparing = ref(false)
const prepared = ref(0)
const bookImages = ref<string[]>([])
const bookPageWidth = ref(0)
const bookPageHeight = ref(0)
const flipbookRef = ref<InstanceType<typeof BookFlipbook> | null>(null)

async function prepareBook() {
  preparing.value = true
  prepared.value = 0
  scale.value = BOOK_RENDER_SCALE
  const scratch = document.createElement('canvas')
  const images: string[] = []
  try {
    if (!totalPages.value) throw new Error('This document has no readable pages.')

    for (let p = 1; p <= totalPages.value; p++) {
      try {
        await renderPage(p, scratch)
        if (p === 1) {
          bookPageWidth.value = scratch.width
          bookPageHeight.value = scratch.height
        }
        images.push(scratch.toDataURL('image/jpeg', 0.85))
      } catch (pageErr) {
        // One bad page (a malformed embedded image, a canvas taint, ...) shouldn't take down the
        // whole book - fall back to a blank placeholder at the right size so the page count and
        // flip behavior stay correct, and keep going.
        console.error(`Library PDF: failed to render page ${p}`, pageErr)
        if (bookPageWidth.value && bookPageHeight.value) {
          const placeholder = document.createElement('canvas')
          placeholder.width = bookPageWidth.value
          placeholder.height = bookPageHeight.value
          const ctx = placeholder.getContext('2d')
          if (ctx) {
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, placeholder.width, placeholder.height)
          }
          images.push(placeholder.toDataURL('image/jpeg', 0.85))
        }
      }
      prepared.value = p
    }

    if (images.length === 0) throw new Error('None of this document\'s pages could be rendered.')
    bookImages.value = images
  } catch (err: any) {
    console.error('Library PDF: failed to prepare book', err)
    error.value = err?.message || 'Failed to prepare this document for reading. Please try again.'
  } finally {
    preparing.value = false
  }
}

const onFlip = (page: number) => {
  currentPage.value = page + 1 // StPageFlip is 0-indexed; the rest of this viewer is 1-indexed
}

const goPrev = () => flipbookRef.value?.flipPrev()
const goNext = () => flipbookRef.value?.flipNext()

// Table of contents: the PDF's own embedded bookmarks/outline when it has one (most real
// textbooks do), resolved down to a 1-indexed page number per entry; falls back to a plain
// page-number list for documents with no outline, so "jump to a topic" always has something to
// jump to.
interface TocEntry {
  title: string
  page: number | null
  depth: number
}

const showToc = ref(false)
const tocEntries = ref<TocEntry[]>([])

async function resolveOutlineDestPage(dest: unknown): Promise<number | null> {
  try {
    let explicitDest = dest
    if (typeof dest === 'string') {
      explicitDest = await pdfDoc.value.getDestination(dest)
    }
    if (!Array.isArray(explicitDest) || !explicitDest[0]) return null
    const pageIndex = await pdfDoc.value.getPageIndex(explicitDest[0])
    return pageIndex + 1
  } catch {
    return null
  }
}

async function loadToc() {
  if (!pdfDoc.value) return
  try {
    const outline = await pdfDoc.value.getOutline()
    if (!outline || outline.length === 0) {
      // No embedded bookmarks - a flat page list is still a faster way to jump than flipping.
      tocEntries.value = Array.from({ length: totalPages.value }, (_, i) => ({
        title: `Page ${i + 1}`,
        page: i + 1,
        depth: 0,
      }))
      return
    }

    const flat: TocEntry[] = []
    const walk = async (items: any[], depth: number) => {
      for (const item of items) {
        flat.push({
          title: item.title || 'Untitled',
          page: item.dest ? await resolveOutlineDestPage(item.dest) : null,
          depth,
        })
        if (item.items?.length) await walk(item.items, depth + 1)
      }
    }
    await walk(outline, 0)
    tocEntries.value = flat
  } catch (err) {
    console.error('Library PDF: failed to load table of contents', err)
    tocEntries.value = []
  }
}

const jumpToPage = (page: number | null) => {
  if (!page) return
  flipbookRef.value?.turnToPage(page - 1) // StPageFlip is 0-indexed
  showToc.value = false
}

const viewerRef = ref<HTMLElement | null>(null)
const toggleFullscreen = async () => {
  if (!document.fullscreenElement) await viewerRef.value?.requestFullscreen()
  else await document.exitFullscreen()
}

onMounted(async () => {
  await loadPdf()
  if (!error.value) {
    await prepareBook()
    await loadToc()
  }
})
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
