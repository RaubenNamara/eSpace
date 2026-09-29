<template>
  <!-- Students' evidence of their topic competencies, for the subjects in the teacher's
       department: confirm it, or return it with a comment on what to improve -->
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center gap-2 mb-1">
      <div class="hidden sm:flex w-7 h-7 rounded-lg bg-violet-600 items-center justify-center flex-shrink-0">
        <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
      </div>
      <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Competency evidence</h1>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">What students have shared to show a topic competency - a photo of their work, a video, a voice explanation or a document. Confirm it, or return it with what to improve.</p>

    <div class="flex gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 w-fit mb-4">
      <button
        v-for="tab in TABS"
        :key="tab.key"
        type="button"
        class="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
        :class="status === tab.key ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800'"
        @click="status = tab.key"
      >
        {{ tab.label }}<span v-if="tab.key !== 'all'" class="ml-1 px-1.5 rounded-full text-[10px]" :class="tab.key === 'pending' && counts.pending ? 'bg-violet-600 text-white' : 'bg-gray-200 dark:bg-gray-600'">{{ counts[tab.key] }}</span>
      </button>
    </div>

    <div v-if="loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="h-28 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
    </div>
    <p v-else-if="!available" class="text-sm text-amber-700 dark:text-amber-300">Evidence isn't set up on this server yet (migration 099).</p>
    <div v-else-if="!items.length" class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ status === 'pending' ? 'Nothing waiting for you' : 'Nothing here yet' }}</p>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Students add evidence from the competencies on their Learning Map.</p>
    </div>

    <ul v-else class="space-y-3">
      <li v-for="e in items" :key="e.id" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div class="min-w-0">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ e.first_name }} {{ e.last_name }} <span class="font-normal text-gray-500 dark:text-gray-400">· {{ e.class_name }} · {{ e.admission_number }}</span></p>
            <p class="text-xs text-gray-600 dark:text-gray-300">{{ e.subject_name }} · <span class="font-semibold">{{ e.topic }}</span></p>
            <p v-if="e.competence" class="text-xs italic text-gray-500 dark:text-gray-400 mt-0.5">“{{ e.competence }}”</p>
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] font-bold flex-shrink-0" :class="CHIP[e.status]">{{ LABEL[e.status] }}</span>
        </div>

        <p v-if="e.note" class="text-sm text-gray-800 dark:text-gray-100 whitespace-pre-line mb-2">{{ e.note }}</p>
        <a v-if="e.file_kind === 'image' && e.file_path" :href="e.file_path" target="_blank" rel="noopener">
          <img :src="e.file_path" alt="Evidence" class="max-h-64 rounded-lg border border-gray-200 dark:border-gray-700 mb-2">
        </a>
        <audio v-else-if="e.file_kind === 'audio' && e.file_path" :src="e.file_path" controls preload="none" class="w-full max-w-md mb-2"></audio>
        <video v-else-if="e.file_kind === 'video' && e.file_path" :src="e.file_path" controls preload="none" class="w-full max-w-md rounded-lg mb-2"></video>
        <a v-else-if="e.file_kind === 'pdf' && e.file_path" :href="e.file_path" target="_blank" rel="noopener" class="inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-300 hover:underline mb-2">{{ e.original_name || 'Open document' }}</a>

        <p class="text-[11px] text-gray-400 dark:text-gray-500">Sent {{ when(e.created_at) }}<template v-if="e.reviewed_at"> · reviewed {{ when(e.reviewed_at) }}</template></p>

        <p v-if="e.status !== 'pending' && e.teacher_comment" class="text-xs mt-2 p-2 rounded-md bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200"><span class="font-semibold">Your comment:</span> {{ e.teacher_comment }}</p>

        <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <textarea v-model="comments[e.id]" rows="2" maxlength="2000" :placeholder="e.status === 'pending' ? 'Comment for the student (needed when returning)' : 'Change your comment'" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-violet-500 mb-2"></textarea>
          <div class="flex flex-wrap gap-2">
            <button type="button" :disabled="busy[e.id]" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50" @click="review(e, 'confirmed')">Confirm evidence</button>
            <button type="button" :disabled="busy[e.id]" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-amber-800 border border-amber-300 hover:bg-amber-50 disabled:opacity-50 dark:bg-gray-800 dark:text-amber-200 dark:border-amber-700" @click="review(e, 'returned')">Return with comment</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useToastStore } from '@/stores/toast'

type Status = 'pending' | 'confirmed' | 'returned'
interface Item {
  id: number
  note: string | null
  file_path: string | null
  file_kind: 'image' | 'pdf' | 'audio' | 'video' | null
  original_name: string | null
  status: Status
  teacher_comment: string | null
  created_at: string
  reviewed_at: string | null
  first_name: string
  last_name: string
  admission_number: string
  class_name: string | null
  subject_name: string
  topic: string
  competence: string | null
}

const TABS: { key: Status | 'all'; label: string }[] = [
  { key: 'pending', label: 'To review' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'returned', label: 'Returned' },
  { key: 'all', label: 'All' }
]
const LABEL: Record<Status, string> = { pending: 'To review', confirmed: 'Confirmed', returned: 'Returned' }
const CHIP: Record<Status, string> = {
  pending: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200',
  confirmed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
  returned: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
}

const toast = useToastStore()
const status = ref<Status | 'all'>('pending')
const items = ref<Item[]>([])
const counts = ref<Record<Status, number>>({ pending: 0, confirmed: 0, returned: 0 })
const loading = ref(true)
const available = ref(true)
const comments = ref<Record<number, string>>({})
const busy = ref<Record<number, boolean>>({})

const when = (at: string) => new Date(at.replace(' ', 'T')).toLocaleString([], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

const load = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/teacher/evidence', { params: { status: status.value } })
    available.value = response.data.data.available !== false
    items.value = response.data.data.evidence || []
    counts.value = response.data.data.counts
    comments.value = Object.fromEntries(items.value.map(e => [e.id, e.teacher_comment || '']))
  } catch {
    items.value = []
  } finally {
    loading.value = false
  }
}
onMounted(load)
watch(status, load)

const review = async (e: Item, next: 'confirmed' | 'returned') => {
  const comment = (comments.value[e.id] || '').trim()
  if (next === 'returned' && !comment) {
    toast.warning('Add a comment telling the student what to improve')
    return
  }
  busy.value = { ...busy.value, [e.id]: true }
  try {
    await axios.put(`/api/teacher/evidence/${e.id}`, { status: next, comment })
    toast.success(next === 'confirmed' ? 'Evidence confirmed' : 'Returned to the student')
    await load()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not save')
  } finally {
    busy.value = { ...busy.value, [e.id]: false }
  }
}
</script>
