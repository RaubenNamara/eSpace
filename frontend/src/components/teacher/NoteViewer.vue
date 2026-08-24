<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
      <!-- Header -->
      <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ note?.title }}</h2>
          <div class="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span class="px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              {{ note?.subject_name || 'Unknown Subject' }}
            </span>
            <span>{{ formatDate(note?.created_at) }}</span>
            <span
              :class="[
                'px-2 py-1 rounded-full',
                note?.is_published
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              ]"
            >
              {{ note?.is_published ? 'Published' : 'Draft' }}
            </span>
          </div>
        </div>
        <button
          @click="$emit('close')"
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ml-4"
        >
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto">
        <div class="p-8">
          <div 
            class="prose prose-lg dark:prose-invert max-w-none"
            v-html="note?.content"
          ></div>
        </div>
      </div>

      <!-- Footer with Navigation -->
      <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <button
          @click="$emit('previous')"
          :disabled="!hasPrevious"
          class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span>Previous</span>
        </button>

        <div class="flex items-center space-x-2">
          <button
            @click="$emit('edit', note)"
            class="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            <span>Edit Note</span>
          </button>
        </div>

        <button
          @click="$emit('next')"
          :disabled="!hasNext"
          class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span>Next</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Note {
  id: number
  title: string
  subject_name?: string
  content: string
  is_published: boolean
  created_at: string
}

interface Props {
  note: Note | null
  allNotes: Note[]
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'edit', 'next', 'previous'])

const currentIndex = computed(() => {
  if (!props.note) return -1
  return props.allNotes.findIndex(n => n.id === props.note!.id)
})

const hasPrevious = computed(() => {
  return currentIndex.value > 0
})

const hasNext = computed(() => {
  return currentIndex.value < props.allNotes.length - 1
})

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
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
