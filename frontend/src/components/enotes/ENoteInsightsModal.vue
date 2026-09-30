<template>
  <!-- Reading insights for an eNote topic: page by page, how many students reached it, stopped on
       it, came back to it, the time spent and highlights - the pages students stop on or keep
       re-reading are often the confusing ones (Teacher\ENoteInsightsController) -->
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" @click.self="$emit('close')">
      <div class="w-full sm:max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl">
        <div class="px-5 pt-5 pb-3 border-b border-gray-100 dark:border-gray-700 flex items-start gap-3">
          <div class="flex-1 min-w-0">
            <p class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Reading insights</p>
            <h2 class="text-base font-bold text-gray-900 dark:text-white truncate">{{ data?.topic.title || 'eNote' }}</h2>
            <p v-if="data" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ data.readers }} student{{ data.readers === 1 ? '' : 's' }} opened it · {{ data.completed }} finished</p>
          </div>
          <button type="button" class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close" @click="$emit('close')">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-5 py-4">
          <div v-if="loading" class="space-y-2">
            <div v-for="i in 5" :key="i" class="h-12 rounded-lg bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
          </div>
          <p v-else-if="!data" class="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">Couldn't load the insights.</p>
          <template v-else>
            <!-- Pages worth a look -->
            <div v-if="flagged.length" class="mb-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-900/15 p-3">
              <p class="text-xs font-bold text-amber-900 dark:text-amber-100 mb-1">Worth a second look</p>
              <ul class="text-xs text-amber-900 dark:text-amber-100 space-y-0.5">
                <li v-for="p in flagged" :key="p.id">
                  <button type="button" class="font-semibold underline decoration-dotted" @click="$emit('open-page', p.id)">Page {{ p.number }}</button>
                  - {{ flagText(p) }}
                </li>
              </ul>
            </div>
            <p v-else-if="data.readers" class="mb-4 text-xs text-gray-500 dark:text-gray-400">No page stands out yet - students are reading through without stopping or going back much.</p>
            <p v-else class="mb-4 text-xs text-gray-500 dark:text-gray-400">No one has opened this eNote yet.</p>

            <!-- Page by page -->
            <div class="hidden sm:grid grid-cols-[3rem_1fr_4.5rem_4.5rem_4.5rem_4.5rem_4rem] gap-2 px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <span>Page</span><span>Reached</span><span class="text-right">Stopped</span><span class="text-right">Re-read</span><span class="text-right">Avg time</span><span class="text-right">Highlit</span><span></span>
            </div>
            <ul class="divide-y divide-gray-100 dark:divide-gray-700">
              <li v-for="p in data.pages" :key="p.id" class="py-2 px-2 grid grid-cols-[3rem_1fr] sm:grid-cols-[3rem_1fr_4.5rem_4.5rem_4.5rem_4.5rem_4rem] gap-x-2 gap-y-1 items-center rounded-md" :class="p.flags.length ? 'bg-amber-50/60 dark:bg-amber-900/10' : ''">
                <span class="text-sm font-bold text-gray-900 dark:text-white">{{ p.number }}</span>
                <span class="flex items-center gap-2 min-w-0">
                  <span class="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full bg-emerald-500 rounded-full" :style="{ width: `${share(p.reached)}%` }"></span></span>
                  <span class="text-xs text-gray-600 dark:text-gray-300 w-8 text-right">{{ p.reached }}</span>
                </span>
                <span class="col-span-2 sm:col-span-1 sm:text-right text-xs" :class="p.flags.includes('stopped') ? 'font-bold text-rose-700 dark:text-rose-300' : 'text-gray-600 dark:text-gray-300'"><span class="sm:hidden text-gray-400">Stopped </span>{{ p.stopped }}</span>
                <span class="hidden sm:block text-right text-xs" :class="p.flags.includes('reread') ? 'font-bold text-amber-700 dark:text-amber-300' : 'text-gray-600 dark:text-gray-300'">{{ p.reread }}</span>
                <span class="hidden sm:block text-right text-xs text-gray-600 dark:text-gray-300">{{ time(p.avg_seconds) }}</span>
                <span class="hidden sm:block text-right text-xs text-gray-600 dark:text-gray-300">{{ p.highlighted_by }}</span>
                <span class="col-span-2 sm:col-span-1 flex sm:justify-end gap-3 text-[11px] text-gray-500 dark:text-gray-400">
                  <span class="sm:hidden">Re-read {{ p.reread }} · {{ time(p.avg_seconds) }} · highlit {{ p.highlighted_by }}</span>
                  <button type="button" class="font-semibold text-indigo-600 dark:text-indigo-300 ml-auto sm:ml-0" @click="$emit('open-page', p.id)">Open</button>
                </span>
              </li>
            </ul>
            <p class="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
              Stopped: students whose place is this page and who haven't read the eNote for {{ data.stopped_after_days }}+ days without finishing. Re-read: students who opened the page more than once. Figures start from when reading insights were switched on.
            </p>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

interface PageInsight { id: number; number: number; title: string | null; reached: number; stopped: number; reread: number; views: number; avg_seconds: number | null; highlighted_by: number; flags: ('stopped' | 'reread')[] }
interface Insights { topic: { id: number; title: string }; readers: number; completed: number; stopped_after_days: number; pages: PageInsight[] }

const props = defineProps<{ topicId: number }>()
defineEmits<{ close: []; 'open-page': [pageId: number] }>()

const data = ref<Insights | null>(null)
const loading = ref(true)

const maxReached = computed(() => Math.max(1, ...(data.value?.pages ?? []).map(p => p.reached)))
const share = (n: number) => (n / maxReached.value) * 100
const flagged = computed(() => (data.value?.pages ?? []).filter(p => p.flags.length))
const flagText = (p: PageInsight) => [
  p.flags.includes('stopped') ? `${p.stopped} of ${p.reached} stopped here` : '',
  p.flags.includes('reread') ? `${p.reread} of ${p.reached} came back to it` : ''
].filter(Boolean).join(' · ')
const time = (s: number | null) => (s === null ? '–' : s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`)

onMounted(async () => {
  try {
    const response = await axios.get(`/api/teacher/enotes/topics/${props.topicId}/insights`)
    data.value = response.data.data
  } catch {
    data.value = null
  } finally {
    loading.value = false
  }
})
</script>
