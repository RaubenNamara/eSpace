<template>
  <!-- Choosing a question from the Item Bank for an eNote page: a question from a written paper,
       or a page of an uploaded paper (with a preview of that page). Papers of the topic's subject
       come first. -->
  <Teleport to="body">
    <div class="fixed inset-0 z-[70] bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4" @click.self="emit('close')">
      <div class="w-full sm:max-w-3xl max-h-[92vh] flex flex-col rounded-t-2xl sm:rounded-2xl bg-white dark:bg-gray-800 shadow-2xl">
        <header class="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <button v-if="open" type="button" class="p-1 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Back" @click="open = null">←</button>
          <div class="min-w-0 flex-1">
            <h2 class="text-base font-bold text-gray-900 dark:text-white truncate">{{ open ? open.title : 'Add a question from the Item Bank' }}</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ open ? (open.kind === 'paper' ? 'Choose a question' : 'Choose the page of the paper') : 'Papers you wrote or uploaded, and published ones from your department' }}</p>
          </div>
          <button type="button" class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close" @click="emit('close')">✕</button>
        </header>

        <div class="flex-1 overflow-y-auto p-4">
          <!-- The papers -->
          <template v-if="!open">
            <input v-model="search" type="search" placeholder="Search papers and questions" class="w-full mb-3 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm dark:text-white">
            <div v-if="loading" class="space-y-2"><div v-for="i in 4" :key="i" class="h-14 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
            <p v-else-if="!shown.length" class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              {{ items.length ? 'Nothing matches.' : 'No papers yet. Write one in the Item Bank ("Write a paper"), or upload a past paper.' }}
            </p>
            <ul v-else class="space-y-1.5">
              <li v-for="it in shown" :key="it.id">
                <button type="button" class="w-full flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2.5 text-left hover:border-amber-300 dark:hover:border-amber-700" @click="openItem(it)">
                  <span class="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center text-[10px] font-bold" :class="it.kind === 'paper' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'">{{ it.kind === 'paper' ? 'Q' : 'PDF' }}</span>
                  <span class="min-w-0 flex-1">
                    <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ it.title }}</span>
                    <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">
                      {{ [it.subject, it.kind === 'paper' ? `${it.questions.length} question${it.questions.length === 1 ? '' : 's'}` : (it.pages ? `${it.pages} pages` : 'PDF'), it.teacher].filter(Boolean).join(' · ') }}
                      <span v-if="it.status !== 'published'" class="text-amber-600 dark:text-amber-400"> · draft</span>
                    </span>
                  </span>
                  <span class="text-gray-400">›</span>
                </button>
              </li>
            </ul>
          </template>

          <!-- A written paper's questions -->
          <template v-else-if="open.kind === 'paper'">
            <div v-if="mode === 'assessment' && answerable(open).length > 1" class="mb-2 flex justify-end">
              <button type="button" class="btn-primary !py-1.5 text-sm" @click="emit('pick-all', { item_id: open.id, pages: answerable(open).map(q => q.page) })">Add all {{ answerable(open).length }} questions</button>
            </div>
            <ul class="space-y-1.5">
              <li v-for="q in open.questions" :key="q.page" class="rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2.5">
                <div class="flex items-start gap-3">
                  <span class="w-7 h-7 flex-shrink-0 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-bold flex items-center justify-center text-gray-700 dark:text-gray-200">{{ q.page }}</span>
                  <span class="min-w-0 flex-1">
                    <span class="block text-sm text-gray-900 dark:text-white">{{ q.text || '(No question written yet)' }}</span>
                    <span class="block text-[11px] text-gray-500 dark:text-gray-400">{{ TYPE_LABEL[q.answer_type] || q.answer_type }}</span>
                  </span>
                </div>
                <!-- What it's for -->
                <div class="mt-2 pl-10 flex flex-wrap gap-1.5">
                  <template v-if="mode === 'assessment'">
                    <button type="button" class="pick-btn pick-btn--main" :disabled="q.answer_type === 'none'" @click="emit('pick', { item_id: open.id, item_page: q.page, purpose: 'assessment' })">Add to this assessment</button>
                  </template>
                  <template v-else>
                    <button type="button" class="pick-btn pick-btn--main" @click="emit('pick', { item_id: open.id, item_page: q.page, purpose: 'practice' })">Practice on this page</button>
                    <template v-if="allowAssess && q.answer_type !== 'none'">
                      <button type="button" class="pick-btn" title="Marked, on the Learning Map - students meet it when they finish this page" @click="emit('pick', { item_id: open.id, item_page: q.page, purpose: 'loa' })">Learning Outcome Assessment</button>
                      <button type="button" class="pick-btn" title="The topic's Activity of Integration - students meet it at the end of the topic" @click="emit('pick', { item_id: open.id, item_page: q.page, purpose: 'aoi' })">Activity of Integration</button>
                    </template>
                  </template>
                </div>
              </li>
              <li v-if="!open.questions.length" class="py-6 text-center text-sm text-gray-500">This paper has no questions yet.</li>
            </ul>
          </template>

          <!-- An uploaded paper: which page -->
          <div v-else>
            <div class="flex items-center gap-2 mb-3">
              <label class="text-sm text-gray-600 dark:text-gray-300" for="pdf-page">Page</label>
              <button type="button" class="px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm" :disabled="pdfPage <= 1" @click="pdfPage--">←</button>
              <input id="pdf-page" v-model.number="pdfPage" type="number" min="1" :max="open.pages || undefined" class="w-20 px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm dark:text-white text-center">
              <span v-if="open.pages" class="text-sm text-gray-400">of {{ open.pages }}</span>
              <button type="button" class="px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm" :disabled="!!open.pages && pdfPage >= open.pages" @click="pdfPage++">→</button>
              <button type="button" class="ml-auto btn-primary" @click="emit('pick', { item_id: open.id, item_page: Math.max(1, pdfPage), purpose: 'practice' })">Add page {{ pdfPage }}</button>
            </div>
            <div class="max-w-md mx-auto">
              <PdfPageView v-if="open.file_path" :url="open.file_path" :page="Math.max(1, pdfPage)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import PdfPageView from '@/components/itembank/PdfPageView.vue'

interface Item {
  id: number; title: string; kind: 'paper' | 'pdf'; status: string; pages: number | null; file_path: string | null
  subject_id: number; subject: string | null; teacher: string; questions: { page: number; text: string; answer_type: string }[]
}

export type PickPurpose = 'practice' | 'loa' | 'aoi' | 'assessment'
export interface ItemPick { item_id: number; item_page: number; purpose: PickPurpose }

// enote: placing on an eNote page (practice, or as the page's LOA / the topic's AOI)
// assessment: adding questions to an assessment being built (written papers only)
const props = withDefaults(defineProps<{ subjectId: number | null; mode?: 'enote' | 'assessment'; allowAssess?: boolean }>(), { mode: 'enote', allowAssess: false })
const emit = defineEmits<{ close: []; pick: [pick: ItemPick]; 'pick-all': [pick: { item_id: number; pages: number[] }] }>()
const answerable = (it: Item) => it.questions.filter(q => q.answer_type !== 'none')

const TYPE_LABEL: Record<string, string> = { single: 'One right choice', multiple: 'Several right choices', true_false: 'True or false', short: 'Short answer', written: 'Written answer', none: 'Information only' }
const items = ref<Item[]>([])
const loading = ref(true)
const search = ref('')
const open = ref<Item | null>(null)
const pdfPage = ref(1)

const shown = computed(() => {
  const q = search.value.trim().toLowerCase()
  const pool = props.mode === 'assessment' ? items.value.filter(i => i.kind === 'paper') : items.value
  if (!q) return pool
  return pool.filter(i => i.title.toLowerCase().includes(q) || i.questions.some(x => x.text.toLowerCase().includes(q)))
})
const openItem = (it: Item) => { open.value = it; pdfPage.value = 1 }

onMounted(async () => {
  try {
    const res = await axios.get('/api/teacher/itembank/linkable', { params: props.subjectId ? { subject_id: props.subjectId } : {} })
    items.value = res.data.data.items || []
  } catch {
    items.value = []
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.pick-btn { @apply px-2.5 py-1 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-300 disabled:opacity-40; }
.pick-btn--main { @apply bg-amber-600 border-amber-600 text-white hover:bg-amber-700 hover:text-white; }
</style>
