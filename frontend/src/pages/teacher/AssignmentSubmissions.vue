<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-3 sm:py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3 sm:space-x-4 min-w-0">
            <button
              @click="markingData ? backToList() : router.push('/teacher/assignments')"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
            >
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </button>
            <div class="min-w-0">
              <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">Assignment Submissions</h1>
              <p class="text-sm text-gray-600 dark:text-gray-400 truncate">{{ assignment?.title || 'Loading...' }}</p>
            </div>
          </div>
          <RouterLink v-if="!markingData" :to="`/teacher/assignments/${route.params.id}/mark-by-question`" class="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700" title="Mark one question for every student, then the next">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
            <span class="hidden sm:inline">Mark by question</span><span class="sm:hidden">By question</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-4 sm:py-6">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
        <div class="flex items-center">
          <svg class="w-6 h-6 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-red-600 dark:text-red-400 break-words">{{ error }}</p>
        </div>
      </div>

      <!-- Submissions List -->
      <div v-else-if="!markingData">
        <!-- the scripts by where they are: to mark, marked, not handed in - never mixed -->
        <nav class="mb-3 flex gap-1.5 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 [scrollbar-width:none]" aria-label="Scripts">
          <button
            v-for="t in listTabs"
            :key="t.key"
            type="button"
            class="flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-colors"
            :class="listTab === t.key ? t.on : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'"
            :aria-pressed="listTab === t.key"
            @click="listTab = t.key"
          >
            <span class="w-2 h-2 rounded-full" :class="t.dot" aria-hidden="true"></span>
            {{ t.label }}
            <span class="px-1.5 rounded-md text-[11px] font-bold tabular-nums" :class="listTab === t.key ? 'bg-white/25' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'">{{ t.count }}</span>
          </button>
          <RouterLink to="/teacher/marksheet" class="flex-shrink-0 ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">Marksheet</RouterLink>
        </nav>
        <!-- find a learner by name or admission number in the tab that's open -->
        <label class="mb-3 relative block sm:max-w-sm">
          <span class="sr-only">Search students</span>
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" /></svg>
          <input v-model="listSearch" type="search" :placeholder="listTab === 'marked' ? 'Search marked students' : 'Search students'" class="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
        </label>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <!-- Phone: one compact row per learner -->
          <ul class="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
            <li v-for="submission in shownSubmissions" :key="`m-${submission.id}`" class="flex items-center gap-2.5 px-3 py-2.5">
              <span class="h-9 w-9 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-sm font-bold text-indigo-700 dark:text-indigo-300">{{ submission.student_name?.charAt(0) || '?' }}</span>
              <span class="min-w-0 flex-1">
                <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ submission.student_name }}</span>
                <span class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                  <span :class="getStatusClasses(submission.status)" class="px-1.5 py-0.5 text-[10px] font-semibold rounded-full flex-shrink-0">{{ capitalizeFirst(submission.status) }}</span>
                  <span class="truncate">{{ fmtMarks(submission.total_score) }} / {{ fmtMarks(assignment?.total_marks) }}</span>
                </span>
              </span>
              <button
                v-if="handedIn(submission)"
                class="flex-shrink-0 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-xs font-bold"
                @click="selectSubmission(submission)"
              >{{ isMarked(submission) ? 'View' : 'Mark' }}</button>
              <button v-else-if="Number(submission.has_work)" class="flex-shrink-0 px-3 py-1.5 border border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs font-bold" @click="collect(submission)">Collect &amp; mark</button>
              <span v-else class="flex-shrink-0 text-[11px] text-gray-400">Not handed in</span>
            </li>
          </ul>
          <div class="hidden md:block overflow-x-auto">
          <table class="w-full min-w-[640px]">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Submitted</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="submission in shownSubmissions" :key="submission.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <span class="text-indigo-600 dark:text-indigo-400 font-medium">
                        {{ submission.student_name?.charAt(0) || '?' }}
                      </span>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">{{ submission.student_name }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ submission.student_email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <p class="text-sm text-gray-900 dark:text-white">{{ formatDate(submission.submitted_at) }}</p>
                </td>
                <td class="px-6 py-4">
                  <span :class="getStatusClasses(submission.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ capitalizeFirst(submission.status) }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <p class="text-sm text-gray-900 dark:text-white">
                    {{ fmtMarks(submission.total_score) }} / {{ fmtMarks(assignment?.total_marks) }}
                  </p>
                </td>
                <td class="px-6 py-4 text-right">
                  <button
                    v-if="handedIn(submission)"
                    @click="selectSubmission(submission)"
                    class="px-4 py-2 rounded-lg transition-colors text-sm"
                    :class="isMarked(submission) ? 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'"
                  >
                    {{ isMarked(submission) ? 'View / change' : 'Mark' }}
                  </button>
                  <button v-else-if="Number(submission.has_work)" class="px-4 py-2 rounded-lg border border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-sm font-semibold" title="Saved but never handed in: hand it in for them and mark it" @click="collect(submission)">Collect &amp; mark</button>
                  <span v-else class="text-xs text-gray-400">Not submitted yet</span>
                </td>
              </tr>
            </tbody>
          </table>
          </div>

          <!-- Empty State -->
          <div v-if="shownSubmissions.length === 0" class="p-6 sm:p-12 text-center">
            <svg class="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ emptyText.title }}</h3>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">{{ emptyText.message }}</p>
          </div>
        </div>
      </div>

      <!-- Marking View -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        <!-- Questions -->
        <div class="lg:col-span-3 xl:col-span-4 space-y-4 sm:space-y-6">
          <!-- Marked: straight on to the next script waiting, without going back to the list -->
          <div v-if="justMarked" class="rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-3 sm:p-4 flex flex-wrap items-center gap-3">
            <p class="flex-1 min-w-0 text-sm text-emerald-900 dark:text-emerald-100">
              <b>{{ markingData.submission.student_name }}</b> is {{ markingData.submission.status === 'returned' ? 'marked and returned' : 'marked' }}.
              <template v-if="nextToMark"> {{ waitingCount }} more waiting.</template>
              <template v-else> That was the last one - everything here is marked.</template>
            </p>
            <button v-if="nextToMark" type="button" class="px-3.5 py-2 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700" @click="openNext">Mark next: {{ nextToMark.student_name }} →</button>
            <button v-else type="button" class="px-3.5 py-2 rounded-lg text-sm font-semibold text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100 dark:hover:bg-emerald-900/40" @click="backToList">Back to the list</button>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-wrap items-start gap-3">
            <div class="min-w-0 flex-1">
              <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 break-words">{{ markingData.submission.student_name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Submitted {{ formatDate(markingData.submission.submitted_at) }} • {{ markingData.submission.admission_number }}
              </p>
            </div>
            <button v-if="nextToMark && !justMarked" type="button" class="px-3 py-1.5 rounded-lg text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" :title="`Next waiting: ${nextToMark.student_name}`" @click="openNext">
              Skip to next ({{ waitingCount }} waiting) →
            </button>
          </div>

          <div
            v-for="(question, index) in markingData.questions"
            :key="question.id"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
          >
            <div class="mb-5">
              <div class="mb-2 flex items-center justify-between gap-3">
                <span class="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-lg bg-indigo-50 px-2 text-xs font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">Q{{ index + 1 }}</span>
                <span class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-bold tabular-nums text-gray-700 dark:bg-gray-700 dark:text-gray-200 whitespace-nowrap">{{ fmtMarks(question.marks) }} {{ Number(question.marks) === 1 ? 'mark' : 'marks' }}</span>
              </div>
              <div class="min-w-0 overflow-x-auto">
                <p v-if="question.question_text" class="text-[15px] font-medium leading-relaxed text-gray-900 dark:text-white mb-1 break-words [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full" v-html="question.question_text"></p>
                <p v-else-if="question.scenario_text" class="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300 mb-1 break-words [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full" v-html="question.scenario_text"></p>
              </div>
            </div>

            <!-- Objective (MCQ/true-false) questions: the answer in words -->
            <div v-if="isObjective(question)" class="ml-3 sm:ml-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Student's answer</p>
              <p class="text-gray-900 dark:text-white whitespace-pre-line break-words">{{ objectiveAnswerText(question, question.answer?.answer_text) || '(No answer provided)' }}</p>
            </div>

            <!-- Free-response question: typed answer (annotatable), drawing layer, and PDF/image
                 evidence, all rendered inside TeacherMarkingCanvas -->
            <template v-else>
              <TeacherMarkingCanvas
                :question="question"
                :assignment-id="assignmentId"
                :submission-id="markingData.submission.id"
                :student-name="markingData.submission.student_name"
              />
            </template>
          </div>
        </div>

        <!-- Marking Sidebar -->
        <div class="lg:col-span-1 xl:col-span-1">
          <div class="lg:sticky lg:top-6">
            <!-- The AOI's marking guide (from its suggested scenario), beside the work -->
            <div v-if="markingGuide" class="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-violet-200 dark:border-violet-800 p-4">
              <button type="button" class="w-full flex items-center gap-2 text-left" @click="guideOpen = !guideOpen">
                <span class="flex-1 min-w-0">
                  <span class="block text-sm font-bold text-violet-800 dark:text-violet-200">Marking guide</span>
                  <span class="block text-[11px] text-gray-500 dark:text-gray-400">Score each criterion 0–3</span>
                </span>
                <svg class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': guideOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div v-if="guideOpen && markingGuide.expected_answer" class="mt-2 rounded-md border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-900/15 p-2">
                <p class="text-xs font-bold text-emerald-800 dark:text-emerald-200">Expected answer</p>
                <p class="text-xs text-gray-700 dark:text-gray-200 mt-0.5 whitespace-pre-line">{{ markingGuide.expected_answer }}</p>
              </div>
              <dl v-if="guideOpen" class="mt-2 space-y-2 max-h-[40vh] overflow-y-auto">
                <div v-for="c in markingGuide.criteria" :key="c.criterion" class="rounded-md bg-violet-50/70 dark:bg-violet-900/15 p-2">
                  <dt class="text-xs font-bold text-violet-800 dark:text-violet-200">{{ c.criterion }}</dt>
                  <dd class="text-xs text-gray-700 dark:text-gray-200 mt-0.5">{{ c.look_for }}</dd>
                </div>
              </dl>
            </div>
            <MarkingPanel
              :questions="markingData.questions"
              :assignment-id="assignmentId"
              :submission-id="markingData.submission.id"
              :status="markingData.submission.status"
              :total-marks="Number(markingData.submission.total_marks)"
              :initial-feedback="markingData.submission.feedback || ''"
              @status-changed="onStatusChanged"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fmtMarks } from '@/utils/marks'
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import TeacherMarkingCanvas from '@/components/assignment/TeacherMarkingCanvas.vue'
import MarkingPanel from '@/components/assignment/MarkingPanel.vue'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { objectiveAnswerText } from '@/utils/objectiveAnswer'

const toast = useToastStore()
const confirmDialog = useConfirmStore()

const router = useRouter()
const route = useRoute()

const API_BASE = '/api'

const assignmentId = ref<number>(parseInt(route.params.id as string))
const assignment = ref<any>(null)
const submissions = ref<any[]>([])
// the list's tabs: scripts waiting to be marked, marked ones, and not handed in
type ListTab = 'tomark' | 'marked' | 'out'
const listTab = ref<ListTab>('tomark')
const isMarked = (sub: any) => sub.status === 'graded' || sub.status === 'returned'
const isOut = (sub: any) => sub.status === 'in_progress' || sub.status === 'draft' || !sub.status || !sub.submitted_at
const handedIn = (sub: any) => isMarked(sub) || !isOut(sub)
const listGroups = computed(() => ({
  tomark: submissions.value.filter(sub => !isMarked(sub) && !isOut(sub)),
  marked: submissions.value.filter(isMarked),
  out: submissions.value.filter(sub => !isMarked(sub) && isOut(sub))
}))
const listTabs = computed(() => [
  { key: 'tomark' as const, label: 'To mark', count: listGroups.value.tomark.length, dot: 'bg-amber-500', on: 'bg-amber-500 border-amber-500 text-white' },
  { key: 'marked' as const, label: 'Marked', count: listGroups.value.marked.length, dot: 'bg-emerald-500', on: 'bg-emerald-600 border-emerald-600 text-white' },
  { key: 'out' as const, label: 'Not handed in', count: listGroups.value.out.length, dot: 'bg-gray-400', on: 'bg-gray-700 border-gray-700 text-white dark:bg-gray-600 dark:border-gray-600' }
])
// Marked scripts A-Z by name; any tab narrowed by the search
const listSearch = ref('')
const byName = (a: any, b: any) => String(a.student_name || '').localeCompare(String(b.student_name || ''), undefined, { sensitivity: 'base' })
const shownSubmissions = computed(() => {
  let rows = listGroups.value[listTab.value]
  if (listTab.value === 'marked') rows = rows.slice().sort(byName)
  const term = listSearch.value.trim().toLowerCase()
  if (!term) return rows
  return rows.filter(sub => [sub.student_name, sub.admission_number, sub.student_email].some(v => String(v || '').toLowerCase().includes(term)))
})
const emptyText = computed(() => listSearch.value.trim()
  ? { title: 'No one by that name', message: `No student in this list matches "${listSearch.value.trim()}".` }
  : listTab.value === 'tomark'
  ? { title: 'Nothing to mark', message: submissions.value.length ? 'Every script handed in has been marked.' : "Students haven't handed this in yet." }
  : listTab.value === 'marked'
    ? { title: 'No marked scripts yet', message: 'Scripts move here once you mark them.' }
    : { title: 'Everyone who started has handed in', message: 'Students who have not opened it are not listed.' })
const markingData = ref<{ submission: any; questions: any[] } | null>(null)

const loading = ref(false)
const error = ref<string | null>(null)

// An AOI's marking guide, saved from a suggested scenario (AssignmentBuilder's useAoiScenario)
const guideOpen = ref(true)
const markingGuide = computed<{ title: string; criteria: { criterion: string; look_for: string }[]; expected_answer?: string | null } | null>(() => {
  const raw = assignment.value?.rubric
  if (!raw) return null
  try {
    const guide = typeof raw === 'string' ? JSON.parse(raw) : raw
    return guide?.kind === 'aoi_marking_guide' && Array.isArray(guide.criteria) && guide.criteria.length ? guide : null
  } catch {
    return null
  }
})

const OBJECTIVE_TYPES = ['multiple_choice_single', 'multiple_choice_multiple', 'true_false']
function isObjective(question: any): boolean {
  return OBJECTIVE_TYPES.includes(question.question_type)
}

const loadAssignment = async () => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/assignments/${assignmentId.value}`)
    if (response.data.success) {
      assignment.value = response.data.data
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load assignment'
  }
}

const loadSubmissions = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await axios.get(`${API_BASE}/teacher/assignments/${assignmentId.value}/submissions`)
    if (response.data.success) {
      submissions.value = response.data.data
      // open on what needs marking; once all are marked, on the marked ones
      if (!listGroups.value.tomark.length && listGroups.value.marked.length) listTab.value = 'marked'
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load submissions'
  } finally {
    loading.value = false
  }
}

// ---- Mark next: the scripts still waiting (handed in, not marked yet), oldest first
const justMarked = ref(false)
const waiting = computed(() => submissions.value
  .filter(s => (s.status === 'submitted' || s.status === 'marking') && s.id !== markingData.value?.submission.id)
  .slice()
  .sort((a, b) => String(a.submitted_at || '').localeCompare(String(b.submitted_at || ''))))
const nextToMark = computed(() => waiting.value[0] ?? null)
const waitingCount = computed(() => waiting.value.length)
const openNext = async () => {
  if (!nextToMark.value) return
  await selectSubmission(nextToMark.value)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Saved work the learner never handed in: hand it in for them, then mark it. Asked first only
// when they could still be working on it.
const collect = async (submission: any) => {
  if (Number(submission.can_still_work) && !await confirmDialog.open({
    title: 'Collect this script?',
    message: `${submission.student_name} has not handed this in and still has time. Collecting hands it in as it is now, and they won't be able to change it.`,
    confirmLabel: 'Collect and mark'
  })) return
  try {
    const response = await axios.post(`${API_BASE}/teacher/assignments/${assignmentId.value}/submissions/${submission.id}/collect`)
    submission.status = response.data.data.status
    submission.submitted_at = response.data.data.submitted_at
    await selectSubmission(submission)
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'The script could not be collected')
    loadSubmissions()
  }
}

const selectSubmission = async (submission: any) => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/assignments/${assignmentId.value}/submissions/${submission.id}/marking`)
    if (response.data.success) {
      markingData.value = response.data.data
      justMarked.value = false
    }
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to load submission for marking')
  }
}

const backToList = () => {
  markingData.value = null
  loadSubmissions()
}

const onStatusChanged = (status: string) => {
  if (markingData.value) {
    markingData.value.submission.status = status
    // keep the list in step, so "waiting" counts this one as done
    const row = submissions.value.find(s => s.id === markingData.value!.submission.id)
    if (row) row.status = status
    if (status === 'graded' || status === 'returned') {
      justMarked.value = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClasses = (status: string) => {
  const statusMap: Record<string, string> = {
    submitted: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    marking: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200',
    graded: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    returned: 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200'
  }
  return statusMap[status] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
}

const capitalizeFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ')
}

onMounted(() => {
  loadAssignment()
  loadSubmissions()
  // ?submission=<id> (e.g. the dashboard's "Mark next") opens that submission for marking
  const submissionId = Number(route.query.submission)
  if (submissionId) selectSubmission({ id: submissionId })
})
</script>
