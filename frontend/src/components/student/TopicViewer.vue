<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 sm:p-4">
    <div class="bg-white dark:bg-gray-800 w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[90vh] sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      <!-- Header -->
      <div class="relative flex-shrink-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 sm:px-8 py-4 sm:py-6">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-3 min-w-0">
            <div class="hidden sm:flex w-11 h-11 rounded-xl bg-white/15 items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div class="min-w-0">
              <h2 class="text-lg sm:text-2xl font-bold text-white leading-tight truncate">{{ topic?.title }}</h2>
              <div class="flex flex-wrap items-center gap-2 mt-1.5 text-xs sm:text-sm text-purple-100">
                <span class="px-2 py-0.5 rounded-full bg-white/20 font-medium">
                  {{ topic?.subject_name || 'General' }}
                </span>
                <span v-if="teacherName" class="truncate">By {{ teacherName }}</span>
                <span v-if="pages.length > 1" class="whitespace-nowrap">Page {{ currentPageIndex + 1 }} of {{ pages.length }}</span>
              </div>
            </div>
          </div>
          <button
            @click="$emit('close')"
            class="p-2 rounded-lg bg-white/10 hover:bg-white/25 transition-colors flex-shrink-0"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Page progress -->
      <div v-if="pages.length > 1" class="h-1 bg-gray-100 dark:bg-gray-700 flex-shrink-0">
        <div class="h-1 bg-purple-600 transition-all duration-300" :style="{ width: pageProgress + '%' }"></div>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto">
        <div class="px-4 py-6 sm:p-8">
          <h3 v-if="currentPage && pages.length > 1 && !isDefaultPageTitle(currentPage.title)" class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {{ currentPage.title }}
          </h3>
          <div v-if="currentPage?.narration_audio_path" class="mb-6 flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
            <span class="text-lg flex-shrink-0">🔊</span>
            <audio :key="currentPage.narration_audio_path" :src="resolveAssetUrl(currentPage.narration_audio_path)" controls class="flex-1 h-9"></audio>
          </div>
          <div
            ref="contentRef"
            class="prose prose-sm sm:prose-lg dark:prose-invert max-w-none"
            v-html="renderedContent"
          ></div>
          <p v-if="pages.length === 0" class="text-gray-500 dark:text-gray-400 italic">This topic has no pages yet.</p>
        </div>
      </div>

      <!-- Footer with Navigation -->
      <div class="flex-shrink-0 flex items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
        <button
          @click="previous"
          :disabled="!canGoPrevious"
          class="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span>Previous</span>
        </button>

        <span class="hidden sm:block text-sm text-gray-500 dark:text-gray-400">{{ topic?.estimated_reading_time ? `${topic.estimated_reading_time} min read` : '' }}</span>

        <button
          @click="next"
          :disabled="!canGoNext"
          class="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-700"
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
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { autoEmbedYoutube } from '@/utils/richContent'
import { resolveAssetUrl } from '@/utils/url'

interface Page {
  id: number
  title: string
  content: string
  order_number: number
  narration_audio_path?: string | null
}

interface Topic {
  id: number
  title: string
  subject_name?: string
  teacher_first_name?: string
  teacher_last_name?: string
  estimated_reading_time?: number
  pages?: Page[]
}

interface Props {
  topic: Topic | null
  allTopics: Topic[]
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'next-topic', 'previous-topic'])

const currentPageIndex = ref(0)
const contentRef = ref<HTMLElement | null>(null)

const pages = computed(() => props.topic?.pages || [])
const currentPage = computed(() => pages.value[currentPageIndex.value] || null)
const pageProgress = computed(() => pages.value.length ? Math.round(((currentPageIndex.value + 1) / pages.value.length) * 100) : 0)
const renderedContent = computed(() => autoEmbedYoutube(currentPage.value?.content || ''))

// Pages left with their auto-generated default title (from "Add Page" / "Duplicate Page" in the
// builder, never renamed by the teacher) aren't meaningful to a reader - hide the heading rather
// than show "Page" / "Page 2" / "New Page" / "New Page (Copy)" / "New Page (Copy 2)" etc.
const isDefaultPageTitle = (title: string) => /^(new )?page(\s*\d+)?(\s*\(copy(\s*\d+)?\))?$/i.test(title.trim())

// Content sometimes contains <img> tags with a missing/deleted source (seen in real authored
// pages) - hide those instead of showing the browser's broken-image icon. 'error' doesn't
// bubble, so this has to be a capture-phase listener on the container.
const hideBrokenImages = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    e.target.style.display = 'none'
  }
}

const teacherName = computed(() => {
  if (!props.topic?.teacher_first_name) return ''
  return `${props.topic.teacher_first_name} ${props.topic.teacher_last_name || ''}`.trim()
})

const topicIndex = computed(() => {
  if (!props.topic) return -1
  return props.allTopics.findIndex(t => t.id === props.topic!.id)
})

const canGoPrevious = computed(() => currentPageIndex.value > 0 || topicIndex.value > 0)
const canGoNext = computed(() => currentPageIndex.value < pages.value.length - 1 || topicIndex.value < props.allTopics.length - 1)

const previous = () => {
  if (currentPageIndex.value > 0) {
    currentPageIndex.value--
  } else if (topicIndex.value > 0) {
    emit('previous-topic')
  }
}

const next = () => {
  if (currentPageIndex.value < pages.value.length - 1) {
    currentPageIndex.value++
  } else if (topicIndex.value < props.allTopics.length - 1) {
    emit('next-topic')
  }
}

watch(() => props.topic?.id, () => {
  currentPageIndex.value = 0
})

onMounted(() => {
  contentRef.value?.addEventListener('error', hideBrokenImages, true)
})

onBeforeUnmount(() => {
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
  border-left: 4px solid #9333ea;
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
.prose :deep(h4) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
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

.prose :deep(a) {
  color: #9333ea;
  text-decoration: underline;
}
</style>
