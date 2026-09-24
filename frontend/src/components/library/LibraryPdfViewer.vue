<template>
  <div
    ref="viewerRef"
    class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
    :class="readMode ? 'p-0' : 'p-0 lg:p-3'"
  >
    <div
      class="bg-white dark:bg-gray-800 w-full h-full shadow-2xl overflow-hidden flex flex-col"
      :class="readMode ? '' : 'lg:h-[98vh] lg:max-w-7xl lg:rounded-2xl'"
    >
      <!-- Header - hidden entirely in Read Mode, replaced by floating overlay controls. -->
      <div v-if="!readMode" class="relative flex-shrink-0 bg-emerald-600 px-3 sm:px-6 py-2 sm:py-3">
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
            <!-- Large books reveal a first batch of pages immediately rather than blocking on the
                 whole document - this says the rest is still coming in the background, since a
                 reader who flips past the revealed pages would otherwise see nothing and not know
                 why. -->
            <div v-if="bookImagesLoadingMore" class="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-100">
              <svg class="w-3 h-3 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <span>Loading more pages… ({{ prepared }}/{{ totalPages }})</span>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <!-- Read Mode - whole screen given over to the book, floating overlay controls
                 replace every other piece of chrome. Student-only, same as the eNotes reader. -->
            <button
              v-if="bookImages.length > 0 && isStudentRole"
              @click="enterReadMode"
              class="flex items-center gap-1.5 px-3 py-2 bg-white text-emerald-700 font-medium text-sm rounded-lg hover:bg-emerald-50 transition-colors shadow-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              <span class="hidden sm:inline">Read</span>
            </button>

            <!-- Zoom controls - scale the whole book area via CSS transform (see the wrapping
                 div around BookFlipbook below), so the reader can pan around an enlarged page
                 when the base size isn't big enough. -->
            <div v-if="bookImages.length > 0" class="flex items-center bg-white/10 rounded-lg">
              <button
                @click="zoomOut"
                :disabled="zoomLevel <= MIN_ZOOM"
                class="p-2 rounded-lg hover:bg-white/25 transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                title="Zoom out"
              >
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11h6"></path>
                </svg>
              </button>
              <span v-if="zoomLevel > MIN_ZOOM" class="text-xs text-white/90 font-medium px-0.5 min-w-[2.5rem] text-center select-none">{{ Math.round(zoomLevel * 100) }}%</span>
              <button
                @click="zoomIn"
                :disabled="zoomLevel >= MAX_ZOOM"
                class="p-2 rounded-lg hover:bg-white/25 transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                title="Zoom in"
              >
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 8v6M8 11h6"></path>
                </svg>
              </button>
            </div>
            <!-- Only matters at lg+ - below that the book already always shows one page at a
                 time (no room for two), so this toggle would have nothing to do. -->
            <button
              v-if="bookImages.length > 0"
              @click="preferSinglePage = !preferSinglePage"
              class="hidden lg:flex p-2 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
              :title="preferSinglePage ? 'Switch to two-page view' : 'Switch to single-page view'"
            >
              <svg v-if="preferSinglePage" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="7" y="4" width="10" height="16" rx="1" stroke-width="2"></rect>
              </svg>
              <svg v-else class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="8" height="16" rx="1" stroke-width="2"></rect>
                <rect x="13" y="4" width="8" height="16" rx="1" stroke-width="2"></rect>
              </svg>
            </button>
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
            <!-- Reading focus overlay picker - a colored tint over the page. -->
            <div v-if="bookImages.length > 0" class="relative">
              <button
                @click="showTintPanel = !showTintPanel"
                class="p-2 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
                title="Reading focus color"
              >
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h10a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5"></path>
                </svg>
              </button>
              <div v-if="showTintPanel" @click="showTintPanel = false" class="fixed inset-0 z-40"></div>
              <div
                v-if="showTintPanel"
                class="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 z-50"
              >
                <button
                  v-for="tint in READING_TINTS"
                  :key="tint.value"
                  @click="readingTint = tint.value; showTintPanel = false"
                  class="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  :class="readingTint === tint.value ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium' : 'text-gray-700 dark:text-gray-200'"
                >
                  <span class="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 flex-shrink-0" :class="tint.swatchClass"></span>
                  <span>{{ tint.label }}</span>
                </button>
              </div>
            </div>
            <!-- Student's own private per-page summary. -->
            <button
              v-if="bookImages.length > 0 && isStudentRole"
              @click="showNotesPanel = !showNotesPanel"
              class="p-2 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
              :class="{ 'ring-2 ring-white/50': showNotesPanel }"
              title="My notes for this page"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
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

        <div
          class="flex-1 p-0 lg:p-3 bg-gray-200 dark:bg-gray-900"
          :class="[
            zoomLevel > MIN_ZOOM ? 'overflow-auto' : 'overflow-hidden flex justify-center items-center',
            // Read Mode fallback: the book is sized to fit the screen exactly, but a scrollbar
            // (rather than a hard clip) means any edge case that still renders a touch taller than
            // available height is just a short scroll away instead of unreachable content. Not
            // wired into the zoom branch above since that already gets overflow-auto for its own
            // reason (panning an enlarged page) - items-start (not the normal items-center) so the
            // book's own top edge is always the scrolled-to-top resting position, not partially
            // hidden above it.
            readMode && zoomLevel <= MIN_ZOOM ? '!overflow-y-auto !items-start' : '',
          ]"
          @contextmenu.prevent
        >
          <div v-if="loading" class="text-gray-500 dark:text-gray-300 py-20 text-sm">Loading document…</div>
          <div v-else-if="error" class="text-red-400 py-20 text-sm">{{ error }}</div>
          <div v-else-if="preparing" class="w-full max-w-xs text-center">
            <p class="text-sm text-gray-500 dark:text-gray-300 mb-2">Preparing your book… {{ prepared }} / {{ totalPages }}</p>
            <div class="h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
              <div class="h-full bg-emerald-600 transition-all" :style="{ width: `${totalPages ? (prepared / totalPages) * 100 : 0}%` }"></div>
            </div>
          </div>
          <div
            v-else
            class="w-full h-full flex justify-center items-center transition-transform duration-200"
            :style="{ transform: `scale(${zoomLevel})`, transformOrigin: zoomLevel > MIN_ZOOM ? 'top center' : 'center' }"
          >
            <BookFlipbook
              ref="flipbookRef"
              :images="bookImages"
              :page-width="bookPageWidth"
              :page-height="bookPageHeight"
              :start-page="currentPage - 1"
              :muted="isMuted"
              :prefer-single-page="preferSinglePage"
              class="max-w-full max-h-full transition-shadow duration-300 hover:drop-shadow-2xl"
              @flip="onFlip"
            />
          </div>

          <!-- Reading focus overlay - a plain colored tint over the whole book, purely visual. -->
          <div
            v-if="readingTint !== 'none'"
            class="absolute inset-0 pointer-events-none z-10 mix-blend-multiply"
            :class="READING_TINTS.find(t => t.value === readingTint)?.class"
          ></div>

          <!-- Student's own private summary for the current page - a bottom drawer rather than
               something embedded in the page itself, since eLibrary pages are rendered images
               (no DOM to inject a textarea into, unlike the eNotes reader). -->
          <div
            v-if="showNotesPanel && isStudentRole"
            class="absolute inset-x-0 bottom-0 z-40 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl rounded-t-2xl p-3 max-h-[50%] flex flex-col"
            :class="currentNoteStyle.panel"
          >
            <div class="flex items-center justify-between mb-1.5 flex-shrink-0">
              <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                <span>📝</span><span>My Notes — Page {{ currentPage }}</span>
              </p>
              <div class="flex items-center gap-2">
                <span class="text-[11px] text-gray-400">{{ noteStatus === 'saving' ? 'Saving…' : noteStatus === 'saved' ? 'Saved' : '' }}</span>
                <SummaryColorPicker :model-value="currentNoteColor" @update:model-value="setCurrentNoteColor" />
                <button @click="showNotesPanel = false" class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            <textarea
              v-model="currentPageNote"
              @input="onNoteInput"
              rows="3"
              maxlength="2000"
              placeholder="What did you understand from this page? (only you can see this)"
              class="flex-1 w-full text-sm px-3 py-2 rounded-lg border placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 resize-none"
              :class="currentNoteStyle.box"
            ></textarea>
          </div>
        </div>

        <!-- Right-side contents panel - the PDF's own bookmarks/outline when it has one, else a
             plain page list, so a reader can jump straight to a topic instead of flipping through.
             Hidden entirely in Read Mode, same as the eNotes reader's TOC sidebar. -->
        <div
          v-if="bookImages.length > 0 && !readMode"
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
              :title="entry.page ? `${entry.title} - page ${entry.page}` : entry.title"
              class="group w-full flex items-baseline gap-2 text-left py-1.5 pr-2 rounded-lg text-xs transition-colors disabled:opacity-50 disabled:cursor-default"
              :class="entry.page === currentPage
                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium'
                : 'text-gray-600 dark:text-gray-300 enabled:hover:bg-blue-50 enabled:hover:text-blue-700 enabled:hover:underline dark:enabled:hover:bg-blue-900/30 dark:enabled:hover:text-blue-300'"
            >
              <span class="flex-1 min-w-0 truncate">{{ entry.title }}</span>
              <span v-if="entry.page" class="flex-shrink-0 text-[10px] tabular-nums text-gray-400 group-enabled:group-hover:text-blue-500">{{ entry.page }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Controls - replaced by floating overlay arrows in Read Mode. -->
      <div v-if="!readMode" class="flex items-center justify-center gap-3 sm:gap-6 px-3 sm:px-6 py-1.5 sm:py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 flex-shrink-0">
        <button type="button" class="nav-btn" :disabled="currentPage <= 1" @click="goPrev">‹ Prev</button>
        <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 min-w-[100px] text-center">Page {{ currentPage }} of {{ totalPages || '…' }}</span>
        <button type="button" class="nav-btn" :disabled="currentPage >= totalPages" @click="goNext">Next ›</button>
      </div>
    </div>

    <!-- Read Mode overlay controls - back/next/exit float over the book itself. -->
    <template v-if="readMode">
      <button
        @click="goPrev"
        :disabled="currentPage <= 1"
        class="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 rounded-full bg-gray-900/40 hover:bg-gray-900/60 text-white backdrop-blur-sm shadow-lg transition-colors disabled:opacity-0 disabled:pointer-events-none"
        title="Previous page"
      >
        <svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button
        @click="goNext"
        :disabled="currentPage >= totalPages"
        class="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 rounded-full bg-gray-900/40 hover:bg-gray-900/60 text-white backdrop-blur-sm shadow-lg transition-colors disabled:opacity-0 disabled:pointer-events-none"
        title="Next page"
      >
        <svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      <button
        @click="exitReadMode"
        class="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 flex items-center gap-1.5 pl-3 pr-3.5 py-2 rounded-full bg-gray-900/40 hover:bg-gray-900/60 text-white backdrop-blur-sm shadow-lg transition-colors"
        title="Exit Read Mode"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <span class="text-xs font-medium hidden sm:inline">Exit</span>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { extractPrintedToc } from '@/utils/pdfPrintedToc'
import SummaryColorPicker from '@/components/enotes/SummaryColorPicker.vue'
import { useSummaryColor, summaryStyleOf, isSummaryColor, type SummaryColor } from '@/composables/useSummaryColor'
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { usePdfRenderer } from '@/composables/usePdfRenderer'
import type { LibraryBook } from '@/types/library'
import { resolveAssetUrl } from '@/utils/url'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { useAuthStore } from '@/stores/auth'
import { useReadModeStore } from '@/stores/readMode'
import axios from 'axios'
import BookFlipbook from '@/components/common/BookFlipbook.vue'

const props = defineProps<{ book: LibraryBook }>()
defineEmits(['close'])

const API_BASE = '/api'
const authStore = useAuthStore()
const isStudentRole = computed(() => authStore.userRole === 'student')

// Shared with the eNotes reader too - muting the page-turn sound in one place should mean it
// stays muted everywhere, since it's a preference about the sound itself, not this one book.
const isMuted = usePersistedRef('espace:flipbook-muted', false)
// Shared with the eNotes reader and read directly by BookFlipbook.vue itself (same key) - this
// button just gives the reader a visible way to flip it, on top of whatever screen size already
// forces.
const preferSinglePage = usePersistedRef('espace:flipbook-single-page-preferred', false)

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
const BOOK_RENDER_SCALE = 2.2
const preparing = ref(false)
const prepared = ref(0)
const bookImages = ref<string[]>([])
const bookPageWidth = ref(0)
const bookPageHeight = ref(0)
const flipbookRef = ref<InstanceType<typeof BookFlipbook> | null>(null)

// Zoom: a plain CSS transform on the wrapper around BookFlipbook (see the template) - StPageFlip
// itself has no notion of zoom, so this scales the whole rendered book visually and lets the
// wrapper's own scroll (enabled once zoomed past 1x) pan around the enlarged result.
const MIN_ZOOM = 1
const MAX_ZOOM = 2.5
const ZOOM_STEP = 0.25
const zoomLevel = ref(MIN_ZOOM)
const zoomIn = () => { zoomLevel.value = Math.min(MAX_ZOOM, Math.round((zoomLevel.value + ZOOM_STEP) * 100) / 100) }
const zoomOut = () => { zoomLevel.value = Math.max(MIN_ZOOM, Math.round((zoomLevel.value - ZOOM_STEP) * 100) / 100) }

// Reading focus overlay - shared preference key with the eNotes reader (espace:reading-tint), so
// picking a tint in one reader carries over to the other.
const showTintPanel = ref(false)
const readingTint = usePersistedRef('espace:reading-tint', 'none')
const READING_TINTS = [
  { value: 'none', label: 'None', class: '', swatchClass: 'bg-white dark:bg-gray-800' },
  { value: 'sepia', label: 'Sepia', class: 'bg-amber-700/10', swatchClass: 'bg-amber-200' },
  { value: 'blue', label: 'Cool Blue', class: 'bg-blue-500/10', swatchClass: 'bg-blue-200' },
  { value: 'green', label: 'Soft Green', class: 'bg-emerald-500/10', swatchClass: 'bg-emerald-200' },
  { value: 'rose', label: 'Warm Rose', class: 'bg-rose-500/10', swatchClass: 'bg-rose-200' },
]

// Student's own private per-page summary ("what I understood from this page") - lazy-loaded per
// page visit (unlike eNotes, a library book can run to hundreds of pages, so bulk-loading every
// page's note upfront isn't worth it), never visible to the teacher/HOD.
const showNotesPanel = ref(false)
// Each page's note has its own colour (saved with it); pages without one use the colour the
// student picked last (shared with the eNotes reader's My Summary)
const { summaryColor } = useSummaryColor()
const pageNotes = ref<Record<number, string>>({})
const pageNoteColors = ref<Record<number, SummaryColor | null>>({})
const currentNoteColor = computed<SummaryColor>(() => pageNoteColors.value[currentPage.value] ?? summaryColor.value)
const currentNoteStyle = computed(() => summaryStyleOf(currentNoteColor.value))
const noteStatus = ref<'idle' | 'saving' | 'saved'>('idle')
const loadedNotePages = new Set<number>()
let noteSaveTimer: ReturnType<typeof setTimeout> | null = null

const currentPageNote = computed({
  get: () => pageNotes.value[currentPage.value] ?? '',
  set: (val: string) => { pageNotes.value[currentPage.value] = val },
})

async function loadPageNote(pageNumber: number) {
  if (!isStudentRole.value || loadedNotePages.has(pageNumber)) return
  loadedNotePages.add(pageNumber)
  try {
    const response = await axios.get(`${API_BASE}/student/library/books/${props.book.id}/pages/${pageNumber}/note`)
    if (response.data.success) {
      pageNotes.value[pageNumber] = response.data.data.content || ''
      const color = response.data.data.color
      pageNoteColors.value[pageNumber] = isSummaryColor(color) ? color : null
    }
  } catch {
    // best-effort - a student can still read without their note loading
  }
}

function onNoteInput() {
  noteStatus.value = 'saving'
  const pageNumber = currentPage.value
  if (noteSaveTimer) clearTimeout(noteSaveTimer)
  noteSaveTimer = setTimeout(async () => {
    try {
      await axios.put(`${API_BASE}/student/library/books/${props.book.id}/pages/${pageNumber}/note`, {
        content: pageNotes.value[pageNumber] || '',
        color: pageNoteColors.value[pageNumber] ?? null,
      })
      noteStatus.value = 'saved'
    } catch {
      noteStatus.value = 'idle'
    }
  }, 800)
}

// Choosing a colour saves it for this page straight away and makes it the default for new pages
function setCurrentNoteColor(color: SummaryColor) {
  pageNoteColors.value[currentPage.value] = color
  summaryColor.value = color
  onNoteInput()
}

watch(currentPage, (page) => {
  if (page > 0) loadPageNote(page)
}, { immediate: true })

// Pages used to render strictly one-at-a-time (await in a for loop) onto a single shared canvas -
// simple, but the reused canvas is exactly what forced serialization. pdf.js supports safely
// requesting several different pages concurrently (each gets its own canvas here instead), so a
// small worker pool renders several pages in parallel, meaningfully cutting the wall-clock time
// to prepare a book without touching render scale or JPEG quality at all.
const PREPARE_CONCURRENCY = 3

// Some books run to hundreds of pages - blocking the whole "preparing" screen on every single one
// turns what should be a few-second wait into minutes. Instead, reveal the book to the reader as
// soon as a first small batch is ready, then keep rendering the rest in the background,
// periodically growing the pages BookFlipbook can show. bookImagesLoadingMore stays true for as
// long as that background work is still running, so the header can show a subtle indicator.
const INITIAL_REVEAL_TARGET = 6
const BACKGROUND_REVEAL_INTERVAL = 1500
const bookImagesLoadingMore = ref(false)

async function prepareBook() {
  preparing.value = true
  prepared.value = 0
  bookImagesLoadingMore.value = false
  scale.value = BOOK_RENDER_SCALE
  const totalCount = totalPages.value
  const images: (string | undefined)[] = new Array(totalCount)
  let revealedCount = 0
  let revealTimer: ReturnType<typeof setInterval> | null = null

  // Only a *leading, contiguous* run of pages can be revealed - concurrent workers don't
  // necessarily finish in page order, and a gap (page 5 done, page 4 still pending) would leave a
  // hole BookFlipbook can't render around.
  const leadingReadyCount = () => {
    let n = revealedCount
    while (n < totalCount && images[n] !== undefined) n++
    return n
  }

  const reveal = (force = false) => {
    const ready = leadingReadyCount()
    if (ready <= revealedCount) return
    // Once the reader already has the first batch to read, don't rebuild the whole book for
    // every trickle of newly-ready pages - only once a meaningful chunk more has accumulated, or
    // this is the guaranteed final reveal once every page is done.
    if (!force && revealedCount >= INITIAL_REVEAL_TARGET && ready - revealedCount < 15) return
    revealedCount = ready
    bookImages.value = images.slice(0, revealedCount) as string[]
    if (preparing.value) preparing.value = false
  }

  try {
    if (!totalCount) throw new Error('This document has no readable pages.')

    let nextPageIndex = 0 // 0-based cursor into the shared page-number work queue

    const renderOnePage = async (pageNum: number, canvas: HTMLCanvasElement) => {
      try {
        await renderPage(pageNum, canvas)
        if (pageNum === 1) {
          bookPageWidth.value = canvas.width
          bookPageHeight.value = canvas.height
        }
        images[pageNum - 1] = canvas.toDataURL('image/jpeg', 0.92)
      } catch (pageErr) {
        // One bad page (a malformed embedded image, a canvas taint, ...) shouldn't take down the
        // whole book - fall back to a blank placeholder at the right size so the page count and
        // flip behavior stay correct, and keep going.
        console.error(`Library PDF: failed to render page ${pageNum}`, pageErr)
        if (bookPageWidth.value && bookPageHeight.value) {
          const placeholder = document.createElement('canvas')
          placeholder.width = bookPageWidth.value
          placeholder.height = bookPageHeight.value
          const ctx = placeholder.getContext('2d')
          if (ctx) {
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, placeholder.width, placeholder.height)
          }
          images[pageNum - 1] = placeholder.toDataURL('image/jpeg', 0.85)
        }
      }
      prepared.value++
      // The first handful of pages: reveal each one as it lands, so the reader isn't stuck
      // behind hundreds more pages just to see page 1.
      if (revealedCount < INITIAL_REVEAL_TARGET) reveal()
    }

    const worker = async () => {
      const canvas = document.createElement('canvas')
      while (true) {
        const idx = nextPageIndex++
        if (idx >= totalCount) break
        await renderOnePage(idx + 1, canvas)
      }
    }

    bookImagesLoadingMore.value = totalCount > INITIAL_REVEAL_TARGET
    revealTimer = setInterval(() => reveal(), BACKGROUND_REVEAL_INTERVAL)

    await Promise.all(
      Array.from({ length: Math.min(PREPARE_CONCURRENCY, totalCount) }, () => worker())
    )

    reveal(true) // guaranteed final reveal, however few pages that last batch is
    if (revealedCount === 0) throw new Error('None of this document\'s pages could be rendered.')
  } catch (err: any) {
    console.error('Library PDF: failed to prepare book', err)
    error.value = err?.message || 'Failed to prepare this document for reading. Please try again.'
  } finally {
    if (revealTimer) clearInterval(revealTimer)
    preparing.value = false
    bookImagesLoadingMore.value = false
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
      // No embedded bookmarks - read the book's own printed "Contents" page instead
      const printed = await extractPrintedToc(pdfDoc.value).catch(() => [])
      if (printed.length) {
        tocEntries.value = printed
        return
      }
      // No contents page either - a flat page list is still a faster way to jump than flipping.
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

// Read Mode: the whole modal becomes the book - header, TOC panel and Controls bar all disappear
// (see the template's `v-if="!readMode"` bindings), replaced by floating overlay arrows. Also
// requests real fullscreen as a bonus - best-effort, since some mobile browsers don't support it
// reliably, and Read Mode's own layout already maximizes the book regardless.
const readMode = ref(false)
const readModeStore = useReadModeStore()

const enterReadMode = () => {
  readMode.value = true
  readModeStore.enter()
  viewerRef.value?.requestFullscreen?.().catch(() => {})
}

const exitReadMode = () => {
  readMode.value = false
  readModeStore.exit()
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {})
  }
}

// BookFlipbook's own host resizeObserver rebuilds itself whenever the container's real size
// actually changes (see its comment) - covers this fullscreen transition, the plain "Fullscreen"
// header button, and Read Mode uniformly, so nothing extra is needed here beyond tracking state.
const onFullscreenChange = () => {
  if (!document.fullscreenElement && readMode.value) {
    readMode.value = false
  }
}

const onReadModeKeydown = (e: KeyboardEvent) => {
  if (!readMode.value) return
  if (e.key === 'Escape') exitReadMode()
  else if (e.key === 'ArrowLeft') goPrev()
  else if (e.key === 'ArrowRight') goNext()
}

onMounted(async () => {
  await loadPdf()
  if (!error.value) {
    await prepareBook()
    await loadToc()
  }
  document.addEventListener('fullscreenchange', onFullscreenChange)
  document.addEventListener('keydown', onReadModeKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', onFullscreenChange)
  document.removeEventListener('keydown', onReadModeKeydown)
  // Safety net for closing the modal without pressing Exit first.
  readModeStore.exit()
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {})
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
