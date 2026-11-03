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
      <template v-if="data?.role === 'owner' || (row && q)" #actions>
        <div class="flex flex-col items-end gap-2">
          <button v-if="data?.role === 'owner'" type="button" class="px-3 py-2 rounded-lg text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" :aria-expanded="shareOpen" @click="toggleShare">
            {{ shareOpen ? 'Close sharing' : 'Share the marking' }}
          </button>
          <!-- moving through the class: the mark saves on its own as it is typed -->
          <div v-if="row && q" class="flex items-center gap-1.5">
            <button type="button" class="px-2.5 py-2 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40" :disabled="pos === 0" @click="goTo(pos - 1)">← Previous</button>
            <button v-if="pos < ordered.length - 1" type="button" class="px-2.5 py-2 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" @click="goTo(pos + 1)">Skip →</button>
            <button
              type="button"
              class="btn-primary"
              :disabled="row.marks_awarded === null && !row.locked"
              :title="row.marks_awarded === null && !row.locked ? 'Give a mark first' : ''"
              @click="nextStudent"
            >{{ pos < ordered.length - 1 ? 'Next student →' : 'Save and finish' }}</button>
          </div>
        </div>
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
        <!-- Every student's answer to this question is marked: straight on to the next question -->
        <div v-if="allMarkedHere" class="mb-4 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-3 sm:p-4 flex flex-wrap items-center gap-3">
          <p class="flex-1 min-w-0 text-sm text-emerald-900 dark:text-emerald-100">
            <b>Q{{ current?.number }}</b> is marked for every student.<template v-if="!nextQ"> That was the last question.</template>
          </p>
          <button v-if="nextQ" type="button" class="px-3.5 py-2 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700" @click="openQuestion(nextQ.id)">Mark Q{{ nextQ.number }} →</button>
        </div>

        <!-- One student at a time, A-Z: the same layout as marking a script, for this question only -->
        <div v-if="row" class="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          <div class="lg:col-span-3 xl:col-span-4 space-y-4 sm:space-y-6">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-wrap items-start gap-3">
              <div class="min-w-0 flex-1">
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 break-words">{{ niceName(row.student) }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Student {{ pos + 1 }} of {{ ordered.length }}<template v-if="row.admission_number"> • {{ row.admission_number }}</template>
                </p>
              </div>
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold" :class="row.locked ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' : row.marks_awarded !== null ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'">
                {{ row.locked ? `${row.status} - reopen the script to change` : row.status === 'returned' ? 'Returned - a changed mark updates the total' : row.status === 'graded' ? 'Totalled - a changed mark updates the total' : row.marks_awarded !== null ? 'Marked' : 'To mark' }}
              </span>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <div class="mb-5">
                <div class="mb-2 flex items-center justify-between gap-3">
                  <span class="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-lg bg-indigo-50 px-2 text-xs font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">Q{{ current?.number }}</span>
                  <span class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-bold tabular-nums text-gray-700 dark:bg-gray-700 dark:text-gray-200 whitespace-nowrap">{{ fmtMarks(q.marks) }} {{ Number(q.marks) === 1 ? 'mark' : 'marks' }}</span>
                </div>
                <div class="min-w-0 overflow-x-auto text-[15px] font-medium leading-relaxed text-gray-900 dark:text-white break-words [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full" v-html="q.html"></div>
                <p v-if="q.correct && q.correct.length" class="mt-2 text-xs text-emerald-700 dark:text-emerald-300"><b>Correct:</b> {{ q.correct.join(' · ') }}</p>
              </div>

              <!-- Objective: the option chosen, right or wrong -->
              <div v-if="isObjective || row.chosen !== null" class="ml-3 sm:ml-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Student's answer</p>
                <p v-if="row.chosen !== null" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium" :class="isRight(row) ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200' : 'bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200'">
                  {{ isRight(row) ? '✓' : '✗' }} {{ row.chosen }}
                </p>
                <p v-else class="text-gray-900 dark:text-white">(No answer provided)</p>
              </div>
              <!-- Written, drawn or uploaded: the answer with the marking tools, as on a script -->
              <template v-else>
                <div v-if="sheetLoading" class="h-64 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
                <TeacherMarkingCanvas
                  v-else-if="sheetQuestion"
                  :key="`${q.id}-${row.submission_id}`"
                  :question="sheetQuestion"
                  :assignment-id="assignmentId"
                  :submission-id="row.submission_id"
                />
                <p v-else-if="row.answer_text" class="text-sm text-gray-800 dark:text-gray-100 whitespace-pre-line break-words">{{ row.answer_text }}</p>
                <p v-else class="text-sm italic text-gray-400">No answer</p>
              </template>
            </div>
          </div>

          <!-- Mark, comment, and the next student -->
          <div class="lg:col-span-1 xl:col-span-1">
            <div class="lg:sticky lg:top-6 space-y-4">
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <p class="text-sm font-bold text-gray-900 dark:text-white">Mark for Q{{ current?.number }}</p>
                <div class="mt-2 flex items-center gap-1.5">
                  <input
                    ref="markInput"
                    type="number"
                    inputmode="decimal"
                    min="0"
                    :max="q.marks"
                    step="0.5"
                    class="w-20 px-2.5 py-1.5 rounded-lg border text-sm font-semibold tabular-nums bg-white dark:bg-gray-900 dark:text-white"
                    :class="row.marks_awarded !== null ? 'border-gray-300 dark:border-gray-600' : 'border-amber-300 dark:border-amber-700'"
                    :value="row.marks_awarded ?? ''"
                    :disabled="row.locked"
                    :aria-label="`Mark for ${row.student}`"
                    @input="autoMark(row, ($event.target as HTMLInputElement).value)"
                    @change="setMark(row, ($event.target as HTMLInputElement).value)"
                    @keydown.enter.prevent="setMark(row, ($event.target as HTMLInputElement).value); nextStudent()"
                  >
                  <span class="text-xs text-gray-400">/ {{ fmtMarks(q.marks) }}</span>
                  <span class="ml-auto w-4 text-center text-xs" :title="saveState[row.submission_id] === 'error' ? 'Not saved' : ''">
                    <span v-if="saveState[row.submission_id] === 'saving'" class="text-gray-400">…</span>
                    <span v-else-if="saveState[row.submission_id] === 'saved'" class="text-emerald-500">✓</span>
                    <span v-else-if="saveState[row.submission_id] === 'error'" class="text-rose-500">!</span>
                  </span>
                </div>
                <div class="mt-1.5 flex flex-wrap gap-1">
                  <button v-for="v in quickMarks" :key="v" type="button" class="px-2 py-1 rounded-md text-xs font-semibold border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40" :disabled="row.locked" @click="setMark(row, String(v))">{{ v }}</button>
                </div>
                <textarea
                  v-model="row.feedback"
                  rows="3"
                  placeholder="Comment (optional)"
                  class="mt-2 w-full px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white text-xs resize-y"
                  :disabled="row.locked"
                  @input="autoComment(row)"
                  @blur="save(row)"
                ></textarea>
                <CommentChips v-if="!row.locked" class="mt-1" :current="row.feedback || ''" :show="3" @insert="t => { row!.feedback = row!.feedback ? `${row!.feedback} ${t}` : t; save(row!) }" />

                <button v-if="isObjective && unmarkedObjective.length" type="button" class="mt-3 w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 hover:bg-emerald-100" :disabled="bulkSaving" @click="markObjective">
                  {{ bulkSaving ? 'Marking…' : `Mark all ${unmarkedObjective.length} unmarked: right ${q.marks}, wrong 0` }}
                </button>
              </div>

              <!-- The class, A-Z: who is marked on this question; any name opens that student -->
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-gray-900 dark:text-white">Students</span>
                  <span class="text-gray-500 dark:text-gray-400 tabular-nums">{{ markedHere }}/{{ ordered.length }} marked</span>
                </div>
                <span class="mt-1.5 block h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full bg-emerald-500" :style="{ width: `${ordered.length ? (markedHere / ordered.length) * 100 : 0}%` }"></span></span>
                <ul class="mt-2 max-h-80 overflow-y-auto -mx-1 [scrollbar-width:thin]">
                  <li v-for="(r, i) in ordered" :key="r.submission_id">
                    <button type="button" class="w-full flex items-center gap-2 px-1.5 py-1 rounded-md text-left text-xs" :class="i === pos ? 'bg-indigo-50 dark:bg-indigo-900/30 font-semibold text-indigo-800 dark:text-indigo-200' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'" @click="goTo(i)">
                      <span class="w-3.5 text-center" :class="r.marks_awarded !== null ? 'text-emerald-500' : 'text-gray-300 dark:text-gray-600'">{{ r.marks_awarded !== null ? '✓' : '•' }}</span>
                      <span class="flex-1 min-w-0 truncate">{{ niceName(r.student) }}</span>
                      <span v-if="r.marks_awarded !== null" class="tabular-nums text-gray-500 dark:text-gray-400">{{ fmtMarks(r.marks_awarded) }}</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

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
import { computed, onMounted, reactive, ref, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import CommentChips from '@/components/assignment/CommentChips.vue'
import TeacherMarkingCanvas from '@/components/assignment/TeacherMarkingCanvas.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'

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

const current = computed(() => data.value?.questions.find(x => x.id === questionId.value) || null)
const idx = computed(() => data.value?.questions.findIndex(x => x.id === questionId.value) ?? -1)
const prevQ = computed(() => (idx.value > 0 ? data.value!.questions[idx.value - 1] : null))
const nextQ = computed(() => (data.value && idx.value >= 0 && idx.value < data.value.questions.length - 1 ? data.value.questions[idx.value + 1] : null))
const isObjective = computed(() => !!current.value?.objective)
const markable = computed(() => q.value?.rows || [])
const markedHere = computed(() => markable.value.filter(r => r.marks_awarded !== null).length)
// Every handed-in answer, A-Z; the teacher goes through them one student at a time
const byName = (a: Row, b: Row) => a.student.localeCompare(b.student, undefined, { sensitivity: 'base' })
const ordered = computed(() => [...markable.value].sort(byName))
const pos = ref(0)
const row = computed(() => ordered.value[pos.value] ?? null)
const allMarkedHere = computed(() => !!ordered.value.length && ordered.value.every(r => r.marks_awarded !== null || r.locked))

// The student's script as the marking page shows it, for this question: the answer with the
// marking tools (pen, ticks, crosses, highlighter, text) - fetched once per script
const sheetQuestion = ref<any | null>(null)
const sheetLoading = ref(false)
const sheetCache = new Map<number, any[]>()
let sheetRun = 0
async function loadSheet() {
  const r = row.value
  sheetQuestion.value = null
  if (!r || !q.value || isObjective.value || r.chosen !== null) return
  const run = ++sheetRun
  const pick = (qs: any[]) => qs.find(x => Number(x.id) === q.value!.id) ?? null
  if (sheetCache.has(r.submission_id)) { sheetQuestion.value = pick(sheetCache.get(r.submission_id)!); return }
  sheetLoading.value = true
  try {
    const res = await axios.get(`/api/teacher/assignments/${assignmentId.value}/submissions/${r.submission_id}/marking`)
    const qs = res.data.data?.questions || []
    sheetCache.set(r.submission_id, qs)
    if (run === sheetRun) sheetQuestion.value = pick(qs)
  } catch {
    if (run === sheetRun) sheetQuestion.value = null
  } finally {
    if (run === sheetRun) sheetLoading.value = false
  }
}
watch([() => row.value?.submission_id, () => q.value?.id], loadSheet)

const markInput = ref<HTMLInputElement | null>(null)
const goTo = async (i: number) => {
  if (row.value) save(row.value)
  pos.value = Math.max(0, Math.min(ordered.value.length - 1, i))
  window.scrollTo({ top: 0, behavior: 'smooth' })
  await nextTick()
  markInput.value?.focus({ preventScroll: true })
}
// Next student: the mark is saved, then the next name A-Z; after the last, any still to mark
const nextStudent = async () => {
  const r = row.value
  if (!r) return
  if (!r.locked) {
    if (r.marks_awarded === null) { toast.error('Give a mark first'); return }
    await save(r)
    if (saveState[r.submission_id] === 'error') return
  }
  if (pos.value < ordered.value.length - 1) return goTo(pos.value + 1)
  const left = ordered.value.findIndex(x => x.marks_awarded === null && !x.locked)
  if (left >= 0) goTo(left)
}
// Opening a question starts at the first student (A-Z) still to mark
const startAt = () => {
  const i = ordered.value.findIndex(x => x.marks_awarded === null && !x.locked)
  pos.value = i >= 0 ? i : 0
}

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
  sheetCache.clear()
  for (const r of q.value?.rows || []) {
    savedFeedback.set(r.submission_id, r.feedback || '')
    savedMark.set(r.submission_id, r.marks_awarded)
  }
  startAt()
  loadSheet()
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
  // nothing new since the last save
  if (feedback === (savedFeedback.get(r.submission_id) || '') && (r.marks_awarded === null || r.marks_awarded === (savedMark.get(r.submission_id) ?? null))) return
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

// Saving as the teacher types: a moment after the last key, the mark (or comment) is saved
let typingTimer: ReturnType<typeof setTimeout> | null = null
const later = (fn: () => void, ms: number) => {
  if (typingTimer) clearTimeout(typingTimer)
  typingTimer = setTimeout(fn, ms)
}
const autoMark = (r: Row, raw: string) => {
  // a half-typed mark ("1." or empty) waits for more
  if (raw.trim() === '' || raw.endsWith('.')) return
  later(() => setMark(r, raw), 500)
}
const autoComment = (r: Row) => later(() => save(r), 900)

const markObjective = async () => {
  if (!q.value) return
  bulkSaving.value = true
  for (const r of unmarkedObjective.value) {
    r.marks_awarded = isRight(r) ? q.value.marks : 0
    await save(r)
  }
  startAt()
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
