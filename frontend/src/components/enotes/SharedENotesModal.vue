<template>
  <!-- eNotes colleagues in the department have shared: copy one into your own class(es) as a draft
       to adapt (Teacher\ENoteController::sharedIndex / copyShared). Your own shared topics are
       listed too, with how many colleagues copied them. -->
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" @click.self="$emit('close')">
      <div class="w-full sm:max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl">
        <div class="px-5 pt-5 pb-3 border-b border-gray-100 dark:border-gray-700">
          <div class="flex items-start gap-3">
            <div class="flex-1 min-w-0">
              <p class="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">Shared by colleagues</p>
              <h2 class="text-base font-bold text-gray-900 dark:text-white">eNotes from your department</h2>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Copy one into your class as a draft - all its pages - then adapt it. Share your own with the share button on its book.</p>
            </div>
            <button type="button" class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close" @click="$emit('close')">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <input v-model="search" type="search" placeholder="Search by title or subject…" class="mt-3 w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
        </div>

        <div class="flex-1 overflow-y-auto px-5 py-4">
          <div v-if="loading" class="space-y-3">
            <div v-for="i in 3" :key="i" class="h-20 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
          </div>
          <div v-else-if="!shown.length" class="py-10 text-center">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ topics.length ? 'Nothing matches that search' : 'Nothing shared yet' }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">When colleagues share an eNote with the department, it appears here.</p>
          </div>
          <ul v-else class="space-y-3">
            <li v-for="t in shown" :key="t.id" class="rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row gap-3">
              <div class="w-12 h-16 rounded-md flex-shrink-0 hidden sm:flex items-end p-1 text-[7px] font-bold text-white leading-tight" :style="{ background: coverColor(t) }">{{ t.title.slice(0, 28) }}</div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-gray-900 dark:text-white">{{ t.title }}</p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400">
                  {{ [t.subject_name, t.class_label].filter(Boolean).join(' · ') }} · {{ t.pages }} page{{ t.pages === 1 ? '' : 's' }}<template v-if="t.outcomes"> · {{ t.outcomes }} outcome{{ t.outcomes === 1 ? '' : 's' }}</template>
                </p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400">
                  {{ t.mine ? 'Shared by you' : `By ${t.author}` }}<template v-if="t.copied_by"> · copied by {{ t.copied_by }} teacher{{ t.copied_by === 1 ? '' : 's' }}</template>
                </p>
                <p v-if="t.description" class="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{{ t.description }}</p>
              </div>
              <div class="flex-shrink-0 flex sm:flex-col items-center sm:items-end gap-2">
                <span v-if="t.my_copies" class="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">In your eNotes</span>
                <button v-if="!t.mine" type="button" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700" @click="$emit('copy', t)">
                  {{ t.my_copies ? 'Copy again' : 'Copy to my class' }}
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

export interface SharedTopic {
  id: number
  title: string
  description: string | null
  outcomes: number
  cover_design: string | null
  subject_name: string | null
  class_label: string | null
  author: string
  mine: boolean
  pages: number
  copied_by: number
  my_copies: number
  shared_at: string
}

defineEmits<{ close: []; copy: [topic: SharedTopic] }>()

const topics = ref<SharedTopic[]>([])
const loading = ref(true)
const search = ref('')

const shown = computed(() => {
  const q = search.value.trim().toLowerCase()
  return topics.value.filter(t => !q || t.title.toLowerCase().includes(q) || (t.subject_name || '').toLowerCase().includes(q))
})
const coverColor = (t: SharedTopic) => {
  try {
    return JSON.parse(t.cover_design || '{}').color || '#4f46e5'
  } catch {
    return '#4f46e5'
  }
}

const load = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/teacher/enotes/shared')
    topics.value = response.data.data.topics || []
  } catch {
    topics.value = []
  } finally {
    loading.value = false
  }
}
onMounted(load)
defineExpose({ load })
</script>
