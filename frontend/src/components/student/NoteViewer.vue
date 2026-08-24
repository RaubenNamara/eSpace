<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 sm:p-4">
    <div class="bg-white dark:bg-gray-800 w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[90vh] sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      <!-- Header -->
      <div class="relative flex-shrink-0 bg-gradient-to-r from-indigo-600 to-blue-600 px-4 sm:px-8 py-4 sm:py-6">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-3 min-w-0">
            <div class="hidden sm:flex w-11 h-11 rounded-xl bg-white/15 items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="min-w-0">
              <h2 class="text-lg sm:text-2xl font-bold text-white leading-tight truncate">{{ note?.title }}</h2>
              <div class="flex flex-wrap items-center gap-2 mt-1.5 text-xs sm:text-sm text-indigo-100">
                <span class="px-2 py-0.5 rounded-full bg-white/20 font-medium">
                  {{ note?.subject_name || 'General' }}
                </span>
                <span v-if="teacherName" class="truncate">By {{ teacherName }}</span>
                <span class="whitespace-nowrap">{{ formatDate(note?.published_at || note?.created_at) }}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <button
              @click="$emit('toggle-bookmark', note)"
              class="p-2 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
              :title="note?.is_bookmarked ? 'Remove bookmark' : 'Bookmark this note'"
            >
              <svg
                class="w-5 h-5"
                :class="note?.is_bookmarked ? 'text-amber-300' : 'text-white'"
                :fill="note?.is_bookmarked ? 'currentColor' : 'none'"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg>
            </button>
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

      <!-- Reading progress -->
      <div class="h-1 bg-gray-100 dark:bg-gray-700 flex-shrink-0">
        <div class="h-1 bg-indigo-600 transition-all duration-300" :style="{ width: readingProgress + '%' }"></div>
      </div>

      <!-- Content -->
      <div ref="contentRef" @scroll="onScroll" class="flex-1 overflow-y-auto">
        <div class="px-4 py-6 sm:p-8">
          <div
            class="prose prose-sm sm:prose-lg dark:prose-invert max-w-none"
            v-html="renderedContent"
          ></div>
        </div>
      </div>

      <!-- Footer with Navigation -->
      <div class="flex-shrink-0 flex items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
        <button
          @click="$emit('previous')"
          :disabled="!hasPrevious"
          class="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span>Previous</span>
        </button>

        <span class="hidden sm:block text-sm text-gray-500 dark:text-gray-400">{{ Math.round(readingProgress) }}% read</span>

        <button
          @click="$emit('next')"
          :disabled="!hasNext"
          class="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700"
        >
          <span>Next</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { autoEmbedYoutube } from '@/utils/richContent'

interface Note {
  id: number
  title: string
  subject_name?: string
  content: string
  teacher_first_name?: string
  teacher_last_name?: string
  percentage_completed?: number
  is_bookmarked?: boolean
  created_at: string
  published_at?: string
}

interface Props {
  note: Note | null
  allNotes: Note[]
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'toggle-bookmark', 'next', 'previous', 'progress'])

const contentRef = ref<HTMLElement | null>(null)
const maxScrollPercent = ref(0)
const viewStartedAt = ref(Date.now())

const currentIndex = computed(() => {
  if (!props.note) return -1
  return props.allNotes.findIndex(n => n.id === props.note!.id)
})

const hasPrevious = computed(() => currentIndex.value > 0)
const hasNext = computed(() => currentIndex.value < props.allNotes.length - 1)

const readingProgress = computed(() => maxScrollPercent.value)
const renderedContent = computed(() => autoEmbedYoutube(props.note?.content || ''))

// Content sometimes contains <img> tags with a missing/deleted source - hide those instead of
// showing the browser's broken-image icon. 'error' doesn't bubble, so this must be a
// capture-phase listener; the scroll container is a shared ancestor of any image in the content.
const hideBrokenImages = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    e.target.style.display = 'none'
  }
}

const teacherName = computed(() => {
  if (!props.note?.teacher_first_name) return ''
  return `${props.note.teacher_first_name} ${props.note.teacher_last_name || ''}`.trim()
})

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const onScroll = () => {
  const el = contentRef.value
  if (!el) return
  const scrollable = el.scrollHeight - el.clientHeight
  const percent = scrollable <= 0 ? 100 : Math.min(100, Math.round(((el.scrollTop + el.clientHeight) / el.scrollHeight) * 100))
  if (percent > maxScrollPercent.value) {
    maxScrollPercent.value = percent
  }
}

const reportProgress = (noteId: number) => {
  const timeSpentMinutes = Math.max(0, Math.round((Date.now() - viewStartedAt.value) / 60000))
  emit('progress', { noteId, percentage: maxScrollPercent.value, timeSpentMinutes })
}

watch(() => props.note?.id, (_newId, oldId) => {
  // Reset tracking state whenever a different note is shown (next/previous navigation) -
  // report against the note being left, not the one just switched to.
  if (oldId && maxScrollPercent.value > 0) reportProgress(oldId)
  // Seed from this note's already-known progress so re-reading less of it this session
  // never reports a lower percentage than what was previously recorded.
  maxScrollPercent.value = props.note?.percentage_completed || 0
  viewStartedAt.value = Date.now()
  if (contentRef.value) contentRef.value.scrollTop = 0
})

onMounted(() => {
  maxScrollPercent.value = props.note?.percentage_completed || 0
  onScroll()
  contentRef.value?.addEventListener('error', hideBrokenImages, true)
})

onBeforeUnmount(() => {
  if (props.note) reportProgress(props.note.id)
  contentRef.value?.removeEventListener('error', hideBrokenImages, true)
})
</script>

<style scoped>
.prose {
  line-height: 1.8;
}

.prose :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.prose :deep(video) {
  max-width: 100%;
  border-radius: 8px;
  margin: 16px 0;
}

.prose :deep(iframe) {
  max-width: 100%;
  border-radius: 8px;
  margin: 16px 0;
}

.prose :deep(.yt-embed) {
  display: block;
  position: relative;
  width: 100%;
  max-width: 640px;
  aspect-ratio: 16 / 9;
  margin: 16px 0;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
}

.prose :deep(.yt-embed iframe) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  margin: 0;
}

.prose :deep(blockquote) {
  border-left: 4px solid #6366f1;
  padding-left: 16px;
  margin: 16px 0;
  font-style: italic;
  background: #f3f4f6;
  padding: 16px;
  border-radius: 0 8px 8px 0;
}

.dark .prose :deep(blockquote) {
  background: #374151;
}

.prose :deep(pre) {
  background: #1e293b;
  color: #e2e8f0;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0;
}

.prose :deep(code) {
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.875em;
}

.dark .prose :deep(code) {
  background: #374151;
}

.prose :deep(pre code) {
  background: transparent;
  padding: 0;
}

.prose :deep(hr) {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 24px 0;
}

.prose :deep(ul),
.prose :deep(ol) {
  padding-left: 24px;
  margin: 16px 0;
}

.prose :deep(li) {
  margin: 8px 0;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4),
.prose :deep(h5),
.prose :deep(h6) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
}

.prose :deep(h1) {
  font-size: 2em;
}

.prose :deep(h2) {
  font-size: 1.5em;
}

.prose :deep(h3) {
  font-size: 1.25em;
}

.prose :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}

.prose :deep(th),
.prose :deep(td) {
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  text-align: left;
}

.dark .prose :deep(th),
.dark .prose :deep(td) {
  border-color: #4b5563;
}

.prose :deep(th) {
  background: #f9fafb;
  font-weight: 600;
}

.dark .prose :deep(th) {
  background: #374151;
}

.prose :deep(a) {
  color: #6366f1;
  text-decoration: underline;
}

.prose :deep(a:hover) {
  color: #4f46e5;
}
</style>
