<template>
  <!-- Keeps an eNote topic, eLibrary book or Item Bank PDF on this device for reading without
       internet (see utils/offline) -->
  <div v-if="savable" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700" @click.stop>
    <div v-if="progress !== undefined" class="space-y-1">
      <p class="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">Saving for offline… {{ Math.round(progress * 100) }}%</p>
      <div class="h-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 overflow-hidden">
        <div class="h-full bg-indigo-600 transition-all duration-300" :style="{ width: `${Math.max(4, progress * 100)}%` }"></div>
      </div>
    </div>

    <div v-else-if="saved" class="flex items-center justify-between gap-2">
      <p class="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1 min-w-0">
        <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
        <span class="truncate">Saved offline · {{ formatBytes(saved.bytes) }}</span>
      </p>
      <button type="button" class="text-[11px] font-medium text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 flex-shrink-0" @click="remove">Remove</button>
    </div>

    <template v-else>
      <button
        type="button"
        class="w-full inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
        :class="offline.online ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-200 dark:hover:bg-indigo-900/50' : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'"
        :disabled="!offline.online"
        @click="save"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        {{ offline.online ? 'Save for offline' : 'Connect to save' }}
      </button>
      <label v-if="kind === 'enote' && hasAudio" class="mt-1.5 flex items-center gap-1.5 text-[11px] text-gray-600 dark:text-gray-300 cursor-pointer select-none">
        <input v-model="withAudio" type="checkbox" class="w-3 h-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
        Include audio (bigger)
      </label>
      <p v-if="failed" class="mt-1 text-[11px] text-red-600 dark:text-red-400">{{ failed }}</p>
    </template>
  </div>
  <p v-else-if="kind === 'library' && isPdf" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-[11px] text-gray-400 dark:text-gray-500">Your teacher hasn't allowed saving this book offline</p>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { offline, downloadTopic, removeTopic } from '@/utils/offline/enotes'
import { canSaveOffline, docKey, downloadDoc, removeDoc } from '@/utils/offline/docs'
import { formatBytes } from '@/utils/offline/format'

const props = withDefaults(defineProps<{ item: any; kind?: 'enote' | 'library' | 'itembank' }>(), { kind: 'enote' })

const id = computed(() => Number(props.item.id))
const key = computed(() => props.kind === 'enote' ? null : docKey(props.kind, id.value))
const isPdf = computed(() => String(props.item.file_type || '').toLowerCase() === 'pdf')
const savable = computed(() => props.kind === 'enote' || canSaveOffline(props.kind, props.item))
const saved = computed(() => key.value ? offline.docs[key.value] : offline.downloads[id.value])
const progress = computed<number | undefined>(() => key.value ? offline.docProgress[key.value] : offline.progress[id.value])
const hasAudio = computed(() => !!props.item.narration_voice)
const withAudio = ref(false)
const failed = ref('')

const save = async () => {
  failed.value = ''
  try {
    if (props.kind === 'enote') await downloadTopic(id.value, { audio: withAudio.value, listRow: props.item })
    else await downloadDoc(props.kind, props.item)
  } catch (err: any) {
    console.error('Save for offline failed:', err)
    failed.value = err?.name === 'QuotaExceededError' ? 'Not enough space on this device' : 'Could not save - try again'
  }
}

const remove = () => props.kind === 'enote' ? removeTopic(id.value) : removeDoc(props.kind, id.value)
</script>
