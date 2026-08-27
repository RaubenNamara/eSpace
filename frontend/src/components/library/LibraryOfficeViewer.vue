<template>
  <div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
    <div class="bg-white dark:bg-gray-800 w-full h-full sm:h-[92vh] sm:max-w-4xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      <!-- Header (mirrors LibraryPdfViewer's, so PDF/PPT/PPTX previews look like one consistent feature) -->
      <div class="relative flex-shrink-0 bg-gradient-to-r from-emerald-600 to-teal-600 px-4 sm:px-8 py-4 sm:py-5">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h2 class="text-base sm:text-xl font-bold text-white leading-tight truncate">{{ book.title }}</h2>
            <div class="flex flex-wrap items-center gap-2 mt-1 text-xs sm:text-sm text-emerald-100">
              <span v-if="book.subject_name" class="px-2 py-0.5 rounded-full bg-white/20 font-medium">{{ book.subject_name }}</span>
              <span class="px-2 py-0.5 rounded-full bg-white/20 font-medium uppercase">{{ book.file_type }}</span>
              <span v-if="teacherName" class="truncate">By {{ teacherName }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <a
              v-if="allowDownload"
              :href="absoluteUrl"
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

      <!-- Body -->
      <div class="flex-1 overflow-auto bg-gray-200 dark:bg-gray-900">
        <iframe
          v-if="canEmbed"
          :src="embedUrl"
          class="w-full h-full border-0"
          title="Presentation preview"
        ></iframe>

        <div v-else class="h-full flex flex-col items-center justify-center text-center p-6 sm:p-10 gap-4">
          <div class="w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow flex items-center justify-center">
            <svg class="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div>
            <p class="font-semibold text-gray-900 dark:text-white">{{ book.title }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
              Live preview needs the file to be reachable from the public internet - it will render here automatically once this is running on the live server.
            </p>
          </div>
          <a
            v-if="allowDownload"
            :href="absoluteUrl"
            target="_blank"
            rel="noopener"
            class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
          >
            Open File
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LibraryBook } from '@/types/library'
import { resolveAssetUrl } from '@/utils/url'

const props = defineProps<{ book: LibraryBook }>()
defineEmits(['close'])

const allowDownload = computed(() => !!props.book.allow_download)

// Microsoft's viewer fetches the file itself from its own servers, so it needs a fully-
// qualified, publicly-reachable URL - a relative path (what resolveAssetUrl returns) only
// resolves correctly for the *browser* loading this page, not for a remote server.
const absoluteUrl = computed(() => window.location.origin + resolveAssetUrl(props.book.file_path))

const canEmbed = computed(() => {
  const { protocol, hostname } = window.location
  return protocol === 'https:' && hostname !== 'localhost' && hostname !== '127.0.0.1'
})

const embedUrl = computed(() => `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteUrl.value)}`)

const teacherName = computed(() => {
  if (!props.book.teacher_first_name) return ''
  return `${props.book.teacher_first_name} ${props.book.teacher_last_name || ''}`.trim()
})
</script>
