<template>
  <!-- The support files the teacher attached to this one question (an ICT practical's zip of
       files, a starting spreadsheet...): a PDF or picture opens to view, anything else downloads -->
  <div v-if="files.length" class="mb-5 rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50/60 dark:bg-sky-900/15 p-3">
    <p class="text-xs font-semibold uppercase tracking-wide text-sky-800 dark:text-sky-200 mb-2 flex items-center gap-1.5">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
      {{ files.length === 1 ? 'Support file' : 'Support files' }}
    </p>
    <ul class="grid sm:grid-cols-2 gap-2">
      <li v-for="f in files" :key="f.id" class="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <span class="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200 flex-shrink-0">{{ ext(f.original_name) }}</span>
        <span class="flex-1 min-w-0 truncate text-sm text-gray-800 dark:text-gray-100" :title="f.original_name">{{ f.original_name }}</span>
        <span v-if="f.file_size" class="text-[11px] text-gray-400 tabular-nums flex-shrink-0">{{ size(f.file_size) }}</span>
        <a v-if="viewable(f.original_name)" :href="resolveAssetUrl(f.file_path)" target="_blank" rel="noopener" class="text-xs font-semibold text-sky-700 dark:text-sky-300 hover:underline flex-shrink-0">View</a>
        <a :href="resolveAssetUrl(f.file_path)" :download="f.original_name" class="text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:underline flex-shrink-0">Download</a>
      </li>
    </ul>
    <p v-if="files.some(f => /\.(zip|rar|7z)$/i.test(f.original_name))" class="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
      A zip holds several files: download it, then open (extract) it on your device to get the files inside.
    </p>
  </div>
</template>

<script setup lang="ts">
import { resolveAssetUrl } from '@/utils/url'

export interface QuestionFile { id: number; file_path: string; original_name: string; file_size?: number | null; question_id?: number | null }

defineProps<{ files: QuestionFile[] }>()

const ext = (name: string) => (name.split('.').pop() || '').slice(0, 5)
const size = (b: number) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`)
const viewable = (name: string) => /\.(pdf|png|jpe?g|gif|webp|txt)$/i.test(name)
</script>
