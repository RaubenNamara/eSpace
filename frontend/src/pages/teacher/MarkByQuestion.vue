<template>
  <!-- Marking one question across the whole class, then the next: every handed-in answer to the
       question side by side with its mark and comment. Faster than script by script, and fairer -
       the same answer gets the same mark because the answers sit next to each other. -->
  <div class="w-full">
    <button type="button" class="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" @click="router.push(`/teacher/assignments/${assignmentId}/submissions`)">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      Scripts
    </button>
    <PageHeader title="Mark by question" :description="data ? `${data.assignment.title} - mark one question for everyone, then move to the next.` : 'Loading…'" icon="clipboard" accent="indigo" />

    <EmptyState v-if="!loading && data && !data.scripts" icon="clipboard" tone="gray" title="Nothing handed in yet" message="When students hand in this assessment, their answers appear here question by question." />

    <template v-else-if="data">
      <!-- The questions, with how far marking has got on each -->
      <div class="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
        <button
          v-for="q in data.questions"
          :key="q.id"
          type="button"
          class="flex-shrink-0 w-28 text-left rounded-xl border px-3 py-2 transition-colors"
          :class="q.id === questionId ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 ring-2 ring-indigo-100 dark:ring-indigo-900/40' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'"
          @click="openQuestion(q.id)"
        >
          <span class="flex items-center justify-between text-xs font-bold text-gray-900 dark:text-white">
            Q{{ q.number }}
            <svg v-if="q.marked >= data.scripts" class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
          </span>
          <span class="block text-[10px] text-gray-500 dark:text-gray-400 capitalize truncate">{{ q.type.replace(/_/g, ' ') }} · {{ q.marks }} mk</span>
          <span class="mt-1.5 block h-1 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full bg-emerald-500" :style="{ width: `${Math.min(100, (q.marked / data.scripts) * 100)}%` }"></span></span>
          <span class="mt-0.5 block text-[10px] text-gray-400 tabular-nums">{{ q.marked }}/{{ data.scripts }} marked</span>
        </button>
      </div>

      <div v-if="loadingQuestion" class="space-y-3">
        <div v-for="i in 4" :key="i" class="h-24 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div>
      </div>

      <template v-else-if="q">
        <!-- The question -->
        <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5 mb-4">
          <div class="flex flex-wrap items-start gap-3">
            <span class="px-2 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white">Q{{ current?.number }}</span>
            <div class="flex-1 min-w-0 prose prose-sm dark:prose-invert max-w-none" v-html="q.html"></div>
            <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">out of {{ q.marks }}</span>
          </div>
          <p v-if="q.correct && q.correct.length" class="mt-3 text-xs text-emerald-700 dark:text-emerald-300">
            <b>Correct:</b> {{ q.correct.join(' · ') }}
          </p>
          <div class="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span class="text-gray-500 dark:text-gray-400">{{ markedHere }}/{{ markable.length }} marked</span>
            <button v-if="isObjective && unmarkedObjective.length" type="button" class="px-2.5 py-1.5 rounded-lg font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 hover:bg-emerald-100" :disabled="bulkSaving" @click="markObjective">
              {{ bulkSaving ? 'Marking…' : `Mark the ${unmarkedObjective.length} unmarked: right ${q.marks}, wrong 0` }}
            </button>
            <label class="ml-auto inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400 cursor-pointer select-none">
              <input v-model="hideMarked" type="checkbox" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600"> Hide marked
            </label>
          </div>
        </section>

        <!-- Every answer to it -->
        <ul class="space-y-2.5">
          <li
            v-for="(r, i) in shownRows"
            :key="r.submission_id"
            class="rounded-2xl border bg-white dark:bg-gray-800 p-3 sm:p-4 transition-colors"
            :class="r.marks_awarded !== null ? 'border-gray-200 dark:border-gray-700' : 'border-amber-200 dark:border-amber-800/70'"
          >
            <div class="flex flex-col md:flex-row gap-3">
              <!-- Answer -->
              <div class="flex-1 min-w-0">
                <p class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span class="font-semibold text-gray-900 dark:text-white">{{ niceName(r.student) }}</span>
                  <span>{{ r.admission_number }}</span>
                  <span v-if="r.locked" class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[10px] font-semibold">{{ r.status }} - reopen the script to change</span>
                </p>
                <p v-if="r.chosen !== null" class="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium" :class="isRight(r) ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200' : 'bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200'">
                  {{ isRight(r) ? '✓' : '✗' }} {{ r.chosen }}
                </p>
                <p v-else-if="r.answer_text" class="mt-1.5 text-sm text-gray-800 dark:text-gray-100 whitespace-pre-line break-words line-clamp-[12]">{{ r.answer_text }}</p>
                <p v-else-if="!r.has_file && !r.has_drawing" class="mt-1.5 text-sm italic text-gray-400">No answer</p>
                <RouterLink v-if="r.has_file || r.has_drawing" :to="`/teacher/assignments/${assignmentId}/submissions?submission=${r.submission_id}`" class="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">
                  {{ r.has_file ? 'Has an uploaded file' : 'Has a drawing' }} - open the full script →
                </RouterLink>
              </div>

              <!-- Mark and comment -->
              <div class="md:w-80 flex-shrink-0">
                <div class="flex items-center gap-1.5">
                  <input
                    :ref="el => setInput(i, el)"
                    type="number"
                    inputmode="decimal"
                    min="0"
                    :max="q.marks"
                    step="0.5"
                    class="w-20 px-2.5 py-1.5 rounded-lg border text-sm font-semibold tabular-nums bg-white dark:bg-gray-900 dark:text-white"
                    :class="r.marks_awarded !== null ? 'border-gray-300 dark:border-gray-600' : 'border-amber-300 dark:border-amber-700'"
                    :value="r.marks_awarded ?? ''"
                    :disabled="r.locked"
                    :aria-label="`Mark for ${r.student}`"
                    @change="setMark(r, ($event.target as HTMLInputElement).value)"
                    @keydown.enter.prevent="focusNext(i)"
                  >
                  <span class="text-xs text-gray-400">/ {{ q.marks }}</span>
                  <button v-for="v in quickMarks" :key="v" type="button" class="px-2 py-1 rounded-md text-xs font-semibold border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40" :disabled="r.locked" @click="setMark(r, String(v))">{{ v }}</button>
                  <span class="ml-auto w-4 text-center text-xs" :title="saveState[r.submission_id] === 'error' ? 'Not saved' : ''">
                    <span v-if="saveState[r.submission_id] === 'saving'" class="text-gray-400">…</span>
                    <span v-else-if="saveState[r.submission_id] === 'saved'" class="text-emerald-500">✓</span>
                    <span v-else-if="saveState[r.submission_id] === 'error'" class="text-rose-500">!</span>
                  </span>
                </div>
                <textarea
                  v-model="r.feedback"
                  rows="2"
                  placeholder="Comment (optional)"
                  class="mt-1.5 w-full px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white text-xs resize-y"
                  :disabled="r.locked"
                  @blur="save(r)"
                ></textarea>
                <CommentChips v-if="!r.locked" class="mt-1" :current="r.feedback || ''" :show="3" @insert="t => { r.feedback = r.feedback ? `${r.feedback} ${t}` : t; save(r) }" />
              </div>
            </div>
          </li>
        </ul>
        <p v-if="!shownRows.length" class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">Every answer to this question is marked.</p>

        <div class="mt-5 flex items-center justify-between gap-3">
          <button v-if="prevQ" type="button" class="btn-secondary" @click="openQuestion(prevQ.id)">← Q{{ prevQ.number }}</button>
          <span v-else></span>
          <p class="text-xs text-gray-500 dark:text-gray-400 text-center">When every question is marked, finish each script from <RouterLink :to="`/teacher/assignments/${assignmentId}/submissions`" class="font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Scripts</RouterLink> to total and return it.</p>
          <button v-if="nextQ" type="button" class="btn-primary" @click="openQuestion(nextQ.id)">Q{{ nextQ.number }} →</button>
          <span v-else></span>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import CommentChips from '@/components/assignment/CommentChips.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'

interface QuestionItem { id: number; number: number; type: string; objective: boolean; text: string; marks: number; marked: number; answered: number }
interface Row {
  submission_id: number; student: string; admission_number: string | null; status: string
  answer_text: string | null; chosen: string | null; has_file: boolean; has_drawing: boolean
  auto_mark: number | null; marks_awarded: number | null; feedback: string | null; locked: boolean
}
interface QuestionDetail { id: number; type: string; html: string; marks: number; correct: string[] | null; rows: Row[] }
interface Payload { assignment: { id: number; title: string; total_marks: number }; questions: QuestionItem[]; scripts: number; question: QuestionDetail | null }

const route = useRoute()
const router = useRouter()
const toast = useToastStore()
const assignmentId = computed(() => Number(route.params.id))

const data = ref<Payload | null>(null)
const q = ref<QuestionDetail | null>(null)
const questionId = ref<number>(Number(route.query.q) || 0)
const loading = ref(true)
const loadingQuestion = ref(false)
const hideMarked = ref(false)
const bulkSaving = ref(false)
const saveState = reactive<Record<number, 'saving' | 'saved' | 'error'>>({})
const savedFeedback = new Map<number, string>()

const current = computed(() => data.value?.questions.find(x => x.id === questionId.value) || null)
const idx = computed(() => data.value?.questions.findIndex(x => x.id === questionId.value) ?? -1)
const prevQ = computed(() => (idx.value > 0 ? data.value!.questions[idx.value - 1] : null))
const nextQ = computed(() => (data.value && idx.value >= 0 && idx.value < data.value.questions.length - 1 ? data.value.questions[idx.value + 1] : null))
const isObjective = computed(() => !!current.value?.objective)
const markable = computed(() => q.value?.rows || [])
const markedHere = computed(() => markable.value.filter(r => r.marks_awarded !== null).length)
const shownRows = computed(() => markable.value.filter(r => !hideMarked.value || r.marks_awarded === null))
const quickMarks = computed(() => {
  const m = q.value?.marks || 0
  return m <= 1 ? [0, m] : [0, Math.round((m / 2) * 2) / 2, m]
})

const isRight = (r: Row) => {
  if (!q.value) return false
  if (q.value.type === 'true_false') return r.auto_mark !== null ? r.auto_mark > 0 : false
  return !!r.chosen && !!q.value.correct?.length && r.chosen.split(' · ').every(c => q.value!.correct!.includes(c)) && r.chosen.split(' · ').length === q.value.correct.length
}
const unmarkedObjective = computed(() => markable.value.filter(r => !r.locked && r.marks_awarded === null && (r.chosen !== null)))

const load = async (qid?: number) => {
  const res = await axios.get(`/api/teacher/assignments/${assignmentId.value}/marking-by-question`, { params: qid ? { question_id: qid } : {} })
  data.value = res.data.data
  q.value = res.data.data.question
  questionId.value = q.value?.id || 0
  savedFeedback.clear()
  for (const r of q.value?.rows || []) savedFeedback.set(r.submission_id, r.feedback || '')
}

const openQuestion = async (id: number) => {
  loadingQuestion.value = true
  try {
    await load(id)
    router.replace({ query: { ...route.query, q: String(id) } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load that question')
  } finally {
    loadingQuestion.value = false
  }
}

// Keeps the question strip's progress in step without reloading everything
const bumpProgress = () => {
  const item = current.value
  if (item) item.marked = markedHere.value
}

const save = async (r: Row) => {
  if (r.locked || !q.value) return
  const feedback = r.feedback || ''
  if (r.marks_awarded === null && feedback === (savedFeedback.get(r.submission_id) || '')) return
  saveState[r.submission_id] = 'saving'
  try {
    await axios.put(`/api/teacher/assignments/${assignmentId.value}/submissions/${r.submission_id}/marks`, {
      question_id: q.value.id,
      marks_awarded: r.marks_awarded,
      feedback: feedback || null
    })
    savedFeedback.set(r.submission_id, feedback)
    saveState[r.submission_id] = 'saved'
    bumpProgress()
  } catch (err: any) {
    saveState[r.submission_id] = 'error'
    toast.error(err.response?.data?.message || `Could not save ${r.student}'s mark`)
  }
}

const setMark = (r: Row, raw: string) => {
  if (r.locked || !q.value) return
  if (raw.trim() === '') { r.marks_awarded = null; return }
  const v = Number(raw)
  if (!Number.isFinite(v) || v < 0 || v > q.value.marks) {
    toast.error(`A mark must be between 0 and ${q.value.marks}`)
    return
  }
  r.marks_awarded = v
  save(r)
}

const markObjective = async () => {
  if (!q.value) return
  bulkSaving.value = true
  for (const r of unmarkedObjective.value) {
    r.marks_awarded = isRight(r) ? q.value.marks : 0
    await save(r)
  }
  bulkSaving.value = false
}

// Enter in a mark box moves to the next answer's
const inputs: (HTMLInputElement | null)[] = []
const setInput = (i: number, el: unknown) => { inputs[i] = (el as HTMLInputElement) || null }
const focusNext = async (i: number) => {
  await nextTick()
  const next = inputs.slice(i + 1).find(el => el && !el.disabled)
  if (next) { next.focus(); next.select() }
}

onMounted(async () => {
  try {
    await load(questionId.value || undefined)
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load the assessment')
  } finally {
    loading.value = false
  }
})
</script>
