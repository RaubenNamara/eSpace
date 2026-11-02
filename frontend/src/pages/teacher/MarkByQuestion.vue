<template>
  <!-- Marking one question across the whole class, then the next: every handed-in answer to the
       question side by side with its mark and comment. Faster than script by script, and fairer -
       the same answer gets the same mark because the answers sit next to each other. -->
  <div class="w-full">
    <button type="button" class="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" @click="router.push(data?.role === 'marker' ? '/teacher/dashboard' : `/teacher/assignments/${assignmentId}/submissions`)">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      {{ data?.role === 'marker' ? 'Dashboard' : 'Scripts' }}
    </button>
    <PageHeader title="Mark by question" :description="headerText" icon="clipboard" accent="indigo">
      <template v-if="data?.role === 'owner'" #actions>
        <button type="button" class="px-3 py-2 rounded-lg text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" :aria-expanded="shareOpen" @click="toggleShare">
          {{ shareOpen ? 'Close sharing' : 'Share the marking' }}
        </button>
      </template>
    </PageHeader>

    <!-- Conveyor-belt marking: give colleagues questions to mark; each marks only theirs for
         every student, and the marks add up on each script -->
    <section v-if="shareOpen && data" class="mb-4 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/10 p-4 sm:p-5">
      <h2 class="text-sm font-bold text-gray-900 dark:text-white">Share the marking</h2>
      <p class="mt-0.5 text-xs text-gray-600 dark:text-gray-300">Give a colleague one or more questions. They mark those questions for every student from their dashboard; you can still mark any question. Each script's marks add up, and you total and return them below.</p>

      <ul v-if="markers.length" class="mt-3 space-y-1.5">
        <li v-for="m in markers" :key="m.teacher_id" class="flex flex-wrap items-center gap-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2">
          <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ niceName(m.name) }}</span>
          <span class="flex flex-wrap gap-1">
            <span v-for="qid in m.question_ids" :key="qid" class="px-1.5 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">Q{{ numberOf(qid) }}</span>
          </span>
          <span class="ml-auto flex gap-3 text-xs font-semibold">
            <button type="button" class="text-indigo-600 dark:text-indigo-300 hover:underline" @click="editMarker(m)">Change</button>
            <button type="button" class="text-rose-600 hover:underline" :disabled="shareSaving" @click="removeMarker(m)">Stop sharing</button>
          </span>
        </li>
      </ul>

      <div class="mt-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 space-y-3">
        <label class="block">
          <span class="text-xs font-semibold text-gray-700 dark:text-gray-200">Colleague</span>
          <select v-model.number="shareForm.teacher_id" class="mt-1 w-full sm:w-80 px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white text-sm">
            <option :value="0" disabled>Choose a teacher…</option>
            <option v-for="t in colleagues" :key="t.id" :value="t.id">{{ niceName(t.name) }}{{ t.same_department ? '' : ' (other department)' }}</option>
          </select>
        </label>
        <div>
          <span class="text-xs font-semibold text-gray-700 dark:text-gray-200">Questions they mark</span>
          <div class="mt-1 flex flex-wrap gap-1.5">
            <label v-for="item in data.questions" :key="item.id" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold cursor-pointer select-none" :class="shareForm.question_ids.includes(item.id) ? 'border-indigo-400 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'">
              <input v-model="shareForm.question_ids" type="checkbox" :value="item.id" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600">
              Q{{ item.number }}
            </label>
          </div>
        </div>
        <button type="button" class="btn-primary" :disabled="shareSaving || !shareForm.teacher_id || !shareForm.question_ids.length" @click="saveMarker">
          {{ shareSaving ? 'Saving…' : 'Share these questions' }}
        </button>
      </div>
    </section>

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
          <span class="block text-[10px] text-gray-500 dark:text-gray-400 capitalize truncate">{{ q.type.replace(/_/g, ' ') }} · {{ fmtMarks(q.marks) }} mk</span>
          <span class="mt-1.5 block h-1 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full bg-emerald-500" :style="{ width: `${Math.min(100, (q.marked / data.scripts) * 100)}%` }"></span></span>
          <span class="mt-0.5 block text-[10px] text-gray-400 tabular-nums">{{ q.marked }}/{{ data.scripts }} marked</span>
          <span v-if="data.role === 'owner' && q.markers?.length" class="mt-0.5 block text-[10px] font-semibold text-indigo-600 dark:text-indigo-300 truncate">{{ q.markers.join(', ') }}</span>
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
            <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">out of {{ fmtMarks(q.marks) }}</span>
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

        <p v-if="!toMarkRows.length" class="mb-1 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm font-medium text-emerald-800 dark:text-emerald-200">Every answer to this question is marked.</p>
        <!-- Every answer to it: the ones still to mark on top; a marked answer moves down to the
             marked ones (A-Z, searchable) once the teacher goes on to the next -->
        <ul class="space-y-2.5">
          <template v-for="(r, i) in shownRows" :key="r.submission_id">
          <li v-if="i === toMarkRows.length" class="pt-3 flex flex-wrap items-center gap-2">
            <h3 class="text-sm font-bold text-gray-900 dark:text-white">Marked <span class="font-semibold text-gray-400 tabular-nums">{{ markedRows.length }}</span></h3>
            <label class="relative ml-auto w-full sm:w-64">
              <span class="sr-only">Search marked students</span>
              <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" /></svg>
              <input v-model="markedSearch" type="search" placeholder="Search marked students" class="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
            </label>
          </li>
          <li
            :data-unmarked="settled.has(r.submission_id) ? null : '1'"
            class="rounded-2xl border bg-white dark:bg-gray-800 p-3 sm:p-4 transition-colors"
            :class="r.marks_awarded !== null ? 'border-gray-200 dark:border-gray-700' : 'border-amber-200 dark:border-amber-800/70'"
            @focusin="onRowFocus(r)"
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
                <p v-else-if="r.answer_text && openSheet !== r.submission_id" class="mt-1.5 text-sm text-gray-800 dark:text-gray-100 whitespace-pre-line break-words line-clamp-[12]">{{ r.answer_text }}</p>
                <p v-else-if="!r.has_file && !r.has_drawing" class="mt-1.5 text-sm italic text-gray-400">No answer</p>
                <div v-if="r.files?.length || r.drawing" class="mt-1.5 flex flex-wrap gap-1.5">
                  <a v-for="f in r.files" :key="f.path" :href="fileHref(f)" target="_blank" rel="noopener" class="inline-flex items-center gap-1 max-w-[16rem] px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-600 text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                    <span class="px-1 rounded bg-gray-100 dark:bg-gray-700 text-[9px] font-bold uppercase text-gray-600 dark:text-gray-300">{{ extOf(f.name) }}</span>
                    <span class="truncate">{{ f.name }}</span>
                  </a>
                  <a v-if="r.drawing" :href="resolveAssetUrl(r.drawing)" target="_blank" rel="noopener" class="inline-flex items-center px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-600 text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">Drawing</a>
                </div>
                <button
                  v-if="canWriteOn(r)"
                  type="button"
                  class="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                  :class="openSheet === r.submission_id ? 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'"
                  :aria-expanded="openSheet === r.submission_id"
                  @click="openSheet = openSheet === r.submission_id ? null : r.submission_id"
                >
                  <AppIcon name="pencil" class="w-3.5 h-3.5" />
                  {{ openSheet === r.submission_id ? 'Close the marking tools' : 'Mark on the answer' }}
                </button>
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
                    @keydown.enter.prevent="setMark(r, ($event.target as HTMLInputElement).value); focusNext(i)"
                  >
                  <span class="text-xs text-gray-400">/ {{ fmtMarks(q.marks) }}</span>
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
            <!-- the answer with the marking tools: pen, ticks, crosses, highlighter, text -->
            <AnswerMarkingSheet
              v-if="openSheet === r.submission_id && q"
              :key="`${q.id}-${r.submission_id}`"
              class="mt-3"
              :assignment-id="assignmentId"
              :submission-id="r.submission_id"
              :question-id="q.id"
            />
          </li>
          </template>
          <li v-if="markedSearch.trim() && !markedShown.length && !hideMarked" class="py-3 text-center text-sm text-gray-500 dark:text-gray-400">No marked student matches "{{ markedSearch.trim() }}".</li>
        </ul>

        <div class="mt-5 flex items-center justify-between gap-3">
          <button v-if="prevQ" type="button" class="btn-secondary" @click="openQuestion(prevQ.id)">← Q{{ prevQ.number }}</button>
          <span v-else></span>
          <p v-if="data.role === 'owner'" class="text-xs text-gray-500 dark:text-gray-400 text-center">Each question's marks add up on the script - total and return them below.</p>
          <p v-else class="text-xs text-gray-500 dark:text-gray-400 text-center">Your marks add to each student's total. {{ data.owner ? niceName(data.owner) : 'The teacher who set it' }} totals and returns the scripts.</p>
          <button v-if="nextQ" type="button" class="btn-primary" @click="openQuestion(nextQ.id)">Q{{ nextQ.number }} →</button>
          <span v-else></span>
        </div>

        <!-- Totals: every script's marks added up across all the questions (and everyone marking) -->
        <section v-if="data.role === 'owner' && data.progress?.length" class="mt-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5">
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex-1 min-w-[14rem]">
              <h2 class="text-sm font-bold text-gray-900 dark:text-white">Totals</h2>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ readyCount }} of {{ data.progress.length }} scripts have every question marked{{ returnedCount ? ` · ${returnedCount} already returned` : '' }}.</p>
            </div>
            <button type="button" class="px-3 py-2 rounded-lg text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" :disabled="finishing || !toTotal" @click="finish(false)">Total {{ toTotal || '' }} only</button>
            <button type="button" class="btn-primary" :disabled="finishing || !toReturn" @click="finish(true)">{{ finishing ? 'Working…' : `Total and return ${toReturn || ''}` }}</button>
          </div>
          <button type="button" class="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline" :aria-expanded="showTotals" @click="showTotals = !showTotals">{{ showTotals ? 'Hide each student' : 'Show each student' }}</button>
          <ul v-if="showTotals" class="mt-2 divide-y divide-gray-100 dark:divide-gray-700 text-sm">
            <li v-for="p in data.progress" :key="p.submission_id" class="flex items-center gap-3 py-1.5">
              <span class="flex-1 min-w-0 truncate text-gray-800 dark:text-gray-100">{{ niceName(p.student) }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 tabular-nums">{{ p.marked }}/{{ data.questions.length }} questions</span>
              <span class="w-20 text-right font-semibold tabular-nums text-gray-900 dark:text-white">{{ fmtMarks(p.total) }} / {{ fmtMarks(data.assignment.total_marks) }}</span>
              <span class="w-20 text-right text-xs font-semibold" :class="p.status === 'returned' ? 'text-emerald-600' : p.status === 'graded' ? 'text-indigo-600 dark:text-indigo-300' : p.complete ? 'text-emerald-600' : 'text-amber-600'">
                {{ p.status === 'returned' ? 'Returned' : p.status === 'graded' ? 'Totalled' : p.complete ? 'Ready' : 'Marking' }}
              </span>
            </li>
          </ul>
        </section>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { fmtMarks } from '@/utils/marks'
import { computed, onMounted, reactive, ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import CommentChips from '@/components/assignment/CommentChips.vue'
import AnswerMarkingSheet from '@/components/assignment/AnswerMarkingSheet.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'
import { resolveAssetUrl } from '@/utils/url'

interface QuestionItem { id: number; number: number; type: string; objective: boolean; text: string; marks: number; marked: number; answered: number; markers?: string[] }
interface Row {
  submission_id: number; student: string; admission_number: string | null; status: string
  answer_text: string | null; chosen: string | null; has_file: boolean; has_drawing: boolean
  auto_mark: number | null; marks_awarded: number | null; feedback: string | null; locked: boolean
  files?: { path: string; name: string }[]; drawing?: string | null
}
interface Progress { submission_id: number; student: string; status: string; total: number; marked: number; complete: boolean }
interface Marker { teacher_id: number; name: string; question_ids: number[] }
interface Colleague { id: number; name: string; same_department: boolean }
interface QuestionDetail { id: number; type: string; html: string; marks: number; correct: string[] | null; rows: Row[] }
interface Payload {
  assignment: { id: number; title: string; total_marks: number }; questions: QuestionItem[]; scripts: number; question: QuestionDetail | null
  // owner: the teacher who set it; marker: a colleague given some of its questions
  role?: 'owner' | 'marker'; owner?: string | null; progress?: Progress[] | null
}

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
// each answer's mark as last saved, so the totals below move with every mark
const savedMark = new Map<number, number | null>()

const headerText = computed(() => {
  if (!data.value) return 'Loading…'
  const t = data.value.assignment.title
  if (data.value.role === 'marker') {
    const qs = data.value.questions.map(x => `Q${x.number}`).join(', ')
    return `${t} - shared by ${data.value.owner ? niceName(data.value.owner) : 'a colleague'}. You mark ${qs} for every student.`
  }
  return `${t} - mark one question for everyone, then move to the next.`
})
const numberOf = (qid: number) => data.value?.questions.find(x => x.id === qid)?.number ?? '?'

// A file opens in a new tab - Word, Excel and PowerPoint through Microsoft's Office viewer on the live site
const OFFICE = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx']
const extOf = (name: string) => (name.split('.').pop() || '').toLowerCase().slice(0, 5)
const fileHref = (f: { path: string; name: string }) => {
  const url = new URL(resolveAssetUrl(f.path), window.location.origin)
  const local = /^(localhost|127\.|10\.|192\.168\.)/.test(url.hostname)
  return OFFICE.includes(extOf(f.name)) && !local ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url.href)}` : url.href
}

const current = computed(() => data.value?.questions.find(x => x.id === questionId.value) || null)
const idx = computed(() => data.value?.questions.findIndex(x => x.id === questionId.value) ?? -1)
const prevQ = computed(() => (idx.value > 0 ? data.value!.questions[idx.value - 1] : null))
const nextQ = computed(() => (data.value && idx.value >= 0 && idx.value < data.value.questions.length - 1 ? data.value.questions[idx.value + 1] : null))
const isObjective = computed(() => !!current.value?.objective)
const markable = computed(() => q.value?.rows || [])
const markedHere = computed(() => markable.value.filter(r => r.marks_awarded !== null).length)
// Answers already marked sit below the ones to mark. A newly marked answer stays where it is
// (so its comment can still be written) until the teacher moves on to another answer.
const settled = reactive(new Set<number>())
const pendingId = ref<number | null>(null)
const markedSearch = ref('')
const settlePending = () => {
  if (pendingId.value !== null) {
    const r = markable.value.find(x => x.submission_id === pendingId.value)
    if (r && r.marks_awarded !== null) {
      settled.add(r.submission_id)
      // the marking tools move on with the teacher, to the next answer still to mark
      if (openSheet.value === r.submission_id) openSheet.value = firstToWriteOn()
    }
    pendingId.value = null
  }
}

// The answer open with the marking tools - one at a time (each is a full drawing canvas). A typed,
// drawn or uploaded answer can be written on; a multiple-choice or true/false one can't.
const openSheet = ref<number | null>(null)
const canWriteOn = (r: Row) => !r.locked && !isObjective.value && r.chosen === null && (!!r.answer_text || r.has_file || r.has_drawing)
const firstToWriteOn = () => markable.value.find(x => !settled.has(x.submission_id) && canWriteOn(x))?.submission_id ?? null
const onRowFocus = (r: Row) => { if (pendingId.value !== null && pendingId.value !== r.submission_id) settlePending() }
const byName = (a: Row, b: Row) => a.student.localeCompare(b.student, undefined, { sensitivity: 'base' })
const toMarkRows = computed(() => markable.value.filter(r => !settled.has(r.submission_id)))
const markedRows = computed(() => markable.value.filter(r => settled.has(r.submission_id)).sort(byName))
const markedShown = computed(() => {
  const term = markedSearch.value.trim().toLowerCase()
  return term ? markedRows.value.filter(r => r.student.toLowerCase().includes(term) || (r.admission_number || '').toLowerCase().includes(term)) : markedRows.value
})
const shownRows = computed(() => [...toMarkRows.value, ...(hideMarked.value ? [] : markedShown.value)])
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
  savedMark.clear()
  settled.clear()
  pendingId.value = null
  for (const r of q.value?.rows || []) {
    if (r.marks_awarded !== null) settled.add(r.submission_id)
    savedFeedback.set(r.submission_id, r.feedback || '')
    savedMark.set(r.submission_id, r.marks_awarded)
  }
  // open the first answer still to mark with the marking tools, ready to write on
  openSheet.value = firstToWriteOn()
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
    // the script's running total and count of marked questions
    const before = savedMark.get(r.submission_id) ?? null
    const p = data.value?.progress?.find(x => x.submission_id === r.submission_id)
    if (p) {
      p.total += (r.marks_awarded ?? 0) - (before ?? 0)
      if (before === null && r.marks_awarded !== null) p.marked++
      if (before !== null && r.marks_awarded === null) p.marked--
      p.complete = p.marked >= (data.value?.questions.length || 0)
    }
    savedMark.set(r.submission_id, r.marks_awarded)
    if (r.marks_awarded !== null && !settled.has(r.submission_id)) {
      if (pendingId.value !== r.submission_id) settlePending()
      pendingId.value = r.submission_id
    }
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
  if (v === r.marks_awarded) return // already saved (Enter, then the change event)
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
  settlePending()
  for (const r of markable.value) if (r.marks_awarded !== null) settled.add(r.submission_id)
  bulkSaving.value = false
}

// Sharing the marking with colleagues (the teacher who set it)
const shareOpen = ref(false)
const shareSaving = ref(false)
const markers = ref<Marker[]>([])
const colleagues = ref<Colleague[]>([])
const shareForm = reactive<{ teacher_id: number; question_ids: number[] }>({ teacher_id: 0, question_ids: [] })

const loadMarkers = async () => {
  const d = (await axios.get(`/api/teacher/assignments/${assignmentId.value}/markers`)).data.data
  markers.value = d.markers
  colleagues.value = d.teachers
}
const toggleShare = async () => {
  shareOpen.value = !shareOpen.value
  if (shareOpen.value && !colleagues.value.length) {
    try { await loadMarkers() } catch (err: any) { toast.error(err.response?.data?.message || 'Could not load your colleagues') }
  }
}
const editMarker = (m: Marker) => {
  shareForm.teacher_id = m.teacher_id
  shareForm.question_ids = [...m.question_ids]
}
const putMarker = async (teacherId: number, ids: number[]) => {
  shareSaving.value = true
  try {
    const res = await axios.put(`/api/teacher/assignments/${assignmentId.value}/markers`, { teacher_id: teacherId, question_ids: ids })
    toast.success(res.data.message || 'Saved')
    await loadMarkers()
    await load(questionId.value || undefined) // the names on the question strip
    shareForm.teacher_id = 0
    shareForm.question_ids = []
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not share the marking')
  } finally {
    shareSaving.value = false
  }
}
const saveMarker = () => putMarker(shareForm.teacher_id, shareForm.question_ids)
const removeMarker = (m: Marker) => putMarker(m.teacher_id, [])

// Totalling and returning the scripts every question of which is marked
const showTotals = ref(false)
const finishing = ref(false)
const readyCount = computed(() => (data.value?.progress || []).filter(p => p.complete).length)
const returnedCount = computed(() => (data.value?.progress || []).filter(p => p.status === 'returned').length)
const toTotal = computed(() => (data.value?.progress || []).filter(p => p.complete && p.status !== 'graded' && p.status !== 'returned').length)
const toReturn = computed(() => (data.value?.progress || []).filter(p => p.complete && p.status !== 'returned').length)
const finish = async (andReturn: boolean) => {
  const n = andReturn ? toReturn.value : toTotal.value
  if (andReturn && !window.confirm(`Total and return ${n} script${n === 1 ? '' : 's'} to the students? They will see their marks.`)) return
  finishing.value = true
  try {
    const res = await axios.post(`/api/teacher/assignments/${assignmentId.value}/finish-marked`, { return: andReturn })
    toast.success(res.data.message || 'Done')
    await load(questionId.value || undefined)
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not finish the scripts')
  } finally {
    finishing.value = false
  }
}

// Enter in a mark box moves to the next answer's
const inputs: (HTMLInputElement | null)[] = []
const setInput = (i: number, el: unknown) => { inputs[i] = (el as HTMLInputElement) || null }
// (the marked answer then moves down, and the next one still to mark is focused)
const focusNext = async (i: number) => {
  const row = shownRows.value[i]
  if (row && row.marks_awarded !== null && !settled.has(row.submission_id)) {
    pendingId.value = row.submission_id
    settlePending()
    await nextTick()
    const next = document.querySelector<HTMLInputElement>('[data-unmarked="1"] input[type="number"]:not(:disabled)')
    if (next) { next.focus(); next.select() }
    return
  }
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
