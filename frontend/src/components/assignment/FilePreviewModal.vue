<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="$emit('close')">
    <div class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white flex-1 truncate">{{ title || 'Preview' }}</h3>
        <button type="button" @click="$emit('close')" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors shrink-0">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <img v-if="fileType === 'image'" :src="url" :alt="title || 'Preview'" class="max-w-full max-h-full rounded-lg object-contain">
        <div v-else class="w-full h-[70vh]">
          <PdfAnnotationViewer :pdf-url="url" mode="readonly" readonly />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PdfAnnotationViewer from './PdfAnnotationViewer.vue'

defineProps<{
  url: string
  fileType: 'pdf' | 'image'
  title?: string
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>
