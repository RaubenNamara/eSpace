<template>
  <!-- The question bank: questions already set for this learning outcome / topic (by the teacher,
       or published by colleagues in the department), with how often each has been used and how
       students did on it. Picked questions are copied into the assessment
       (Teacher\QuestionBankController). -->
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" @click.self="$emit('close')">
      <div class="w-full sm:max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl">
        <div class="px-5 pt-5 pb-3 border-b border-gray-100 dark:border-gray-700">
          <div class="flex items-start gap-3">
            <div class="flex-1 min-w-0">
              <p class="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">Question bank</p>
              <h2 class="text-base font-bold text-gray-900 dark:text-white leading-snug truncate">{{ label }}</h2>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Questions already set for this {{ outcomeId ? 'learning outcome' : 'topic' }}, in any stream or year - yours, and ones colleagues have published.</p>
            </div>
            <button type="button" class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close" @click="$emit('close')">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div class="mt-3 flex flex-col sm:flex-row gap-2">
            <input v-model="search" type="search" placeholder="Search questions…" class="flex-1 min-w-0 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" @keydown.enter="load">
            <div class="flex gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-700 self-start">
              <button v-for="s in (['all', 'mine'] as const)" :key="s" type="button" class="px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap" :class="scope === s ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-300'" @click="scope = s">
                {{ s === 'all' ? 'Department' : 'Mine only' }}
              </button>
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-5 py-4">
          <div v-if="loading" class="space-y-3">
            <div v-for="i in 3" :key="i" class="h-24 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
          </div>
          <div v-else-if="!questions.length" class="py-10 text-center">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">No questions in the bank for this yet</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Every question you and your colleagues set is added automatically - write this one, and it'll be here next time.</p>
          </div>
          <div v-else class="space-y-3">
            <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ total }} question{{ total === 1 ? '' : 's' }}<template v-if="total > questions.length"> · showing the {{ questions.length }} most recent</template></p>
            <div v-for="q in questions" :key="q.id" class="rounded-xl border p-4" :class="added.has(q.id) ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/40 dark:bg-emerald-900/10' : 'border-gray-200 dark:border-gray-700'">
              <div class="flex flex-wrap items-center gap-1.5 mb-2">
                <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">{{ TYPE_LABEL[q.question_type] || q.question_type }}</span>
                <span v-if="q.category" class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200">{{ q.category }}</span>
                <span class="text-[11px] text-gray-500 dark:text-gray-400">{{ q.marks }} mark{{ q.marks === 1 ? '' : 's' }} · {{ q.mine ? 'You' : q.author }}<template v-if="q.class_name"> · {{ q.class_name }}</template></span>
              </div>
              <div class="text-sm text-gray-900 dark:text-white break-words line-clamp-4 [&_img]:max-h-24 [&_img]:w-auto [&_p]:mb-1" v-html="q.question_text || q.scenario_text || '<em>Question in an attached PDF</em>'"></div>
              <ul v-if="q.options.length" class="mt-1.5 text-xs text-gray-600 dark:text-gray-300 space-y-0.5">
                <li v-for="(o, i) in q.options" :key="i" :class="{ 'font-semibold text-emerald-700 dark:text-emerald-300': o.is_correct }">{{ String.fromCharCode(65 + i) }}. <span v-html="o.option_text"></span></li>
              </ul>
              <ol v-if="q.sub_questions.length" class="mt-1.5 list-[lower-alpha] pl-5 text-xs text-gray-600 dark:text-gray-300 space-y-0.5">
                <li v-for="(s, i) in q.sub_questions" :key="i">{{ s.question_text }} ({{ s.marks }})</li>
              </ol>
              <div class="mt-3 flex flex-wrap items-center gap-2">
                <!-- How it has gone -->
                <span class="text-[11px] text-gray-600 dark:text-gray-300">
                  Used {{ q.uses }}×<template v-if="q.teachers > 1"> by {{ q.teachers }} teachers</template>
                </span>
                <span v-if="q.average !== null" class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="q.average >= 60 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200' : q.average >= 50 ? 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' : 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200'" :title="`${q.answers} marked answers`">
                  Average {{ q.average }}% · {{ q.answers }} answer{{ q.answers === 1 ? '' : 's' }}
                </span>
                <span v-else class="text-[11px] text-gray-400 dark:text-gray-500">Not marked yet</span>
                <button type="button" class="ml-auto px-3 py-1.5 text-xs font-semibold rounded-lg disabled:opacity-60" :class="added.has(q.id) ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'" :disabled="added.has(q.id)" @click="add(q)">
                  {{ added.has(q.id) ? 'Added' : 'Add to assessment' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-end">
          <button type="button" class="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600" @click="$emit('close')">Done</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'

export interface BankQuestion {
  id: number
  question_type: string
  question_text: string | null
  scenario_text: string | null
  marks: number
  response_type: string
  allow_drawing: boolean
  attachment_type: string
  attachment_path: string | null
  options: { option_text: string; is_correct: boolean }[]
  sub_questions: { question_text: string; marks: number }[]
  topic_text: string | null
  outcome_text: string | null
  category: string | null
  marking_guide: string | null
  author: string
  mine: boolean
  class_name: string | null
  last_used: string
  uses: number
  teachers: number
  average: number | null
  answers: number
}

const props = defineProps<{ subjectId: number; outcomeId: number | null; topicId: number | null; label: string; excludeAssignmentId: number | null }>()
// add returns whether the question was added (it may not fit the 100-mark total)
const emit = defineEmits<{ close: []; add: [question: BankQuestion, done: (ok: boolean) => void] }>()

const TYPE_LABEL: Record<string, string> = {
  multiple_choice_single: 'Multiple choice',
  multiple_choice_multiple: 'Multiple choice',
  true_false: 'True/False',
  essay: 'Essay',
  scenario: 'Scenario',
  short_answer: 'Short answer',
  structured: 'Structured',
  fill_blank: 'Fill in'
}

const questions = ref<BankQuestion[]>([])
const total = ref(0)
const loading = ref(true)
const search = ref('')
const scope = ref<'all' | 'mine'>('all')
const added = ref(new Set<number>())

const load = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/teacher/question-bank', {
      params: {
        subject_id: props.subjectId,
        outcome_id: props.outcomeId || undefined,
        topic_id: props.outcomeId ? undefined : props.topicId || undefined,
        scope: scope.value,
        q: search.value.trim() || undefined,
        exclude_assignment_id: props.excludeAssignmentId || undefined
      }
    })
    questions.value = response.data.data.questions || []
    total.value = response.data.data.total || 0
  } catch {
    questions.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}
const add = (q: BankQuestion) => {
  emit('add', q, ok => { if (ok) added.value = new Set([...added.value, q.id]) })
}

onMounted(load)
watch(scope, load)
let timer: ReturnType<typeof setTimeout> | null = null
watch(search, () => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(load, 350)
})
</script>
