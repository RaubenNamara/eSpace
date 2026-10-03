<template>
  <div class="w-full">
    <PageHeader title="Report Cards" description="Learners' LOA, AOI and EOC results for the term - and their report cards, ready to print." icon="document" accent="indigo">
      <template #filters>
        <PickerDropdown v-if="termOptions.length" v-model="selectedTermId" label="Term" :options="termOptions" align="right" />
        <PickerDropdown v-if="classOptions.length" v-model="selectedClassId" label="Class" :options="classOptions" align="right" />
      </template>
    </PageHeader>

    <div v-if="error" class="mb-4 flex items-start gap-3 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 p-3">
      <AppIcon name="warning" class="w-5 h-5 text-rose-500 flex-shrink-0" />
      <p class="flex-1 text-sm text-rose-700 dark:text-rose-200">{{ error }}</p>
      <button type="button" class="text-rose-500 hover:text-rose-700" aria-label="Dismiss" @click="error = null">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>

    <Skeleton v-if="booting" variant="list" :count="5" />
    <EmptyState v-else-if="!classOptions.length" icon="document" tone="indigo" title="No classes yet" message="Report cards appear here for the classes you teach." />

    <template v-else-if="selectedTermId && selectedClassId">
      <!-- Who you are for this class -->
      <div v-if="!loadingStudents && !noAccess" class="mb-4 flex items-center gap-2 rounded-xl px-3 py-2 text-xs" :class="isClassTeacher ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'">
        <AppIcon :name="isClassTeacher ? 'teacher' : 'book'" class="w-4 h-4 flex-shrink-0" />
        {{ isClassTeacher ? "You're this class's Class Teacher - you can generate full report cards." : 'You can generate report entries for your own subject(s).' }}
      </div>

      <!-- Two jobs, one at a time -->
      <nav class="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4 w-full sm:w-auto sm:inline-flex" aria-label="Sections">
        <button v-for="t in TABS" :key="t.key" type="button" class="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap" :class="tab === t.key ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'" @click="tab = t.key">
          {{ t.label }}<span v-if="t.key === 'generate' && students.length" class="ml-1.5 text-xs text-gray-400">{{ generatedCount }}/{{ students.length }}</span>
        </button>
      </nav>

      <!-- ===== Class competency summary ===== -->
      <template v-if="tab === 'summary'">
        <div class="flex flex-wrap items-end gap-2 mb-4">
          <PickerDropdown v-if="summarySubjects.length" v-model="summarySubjectId" label="Subject" :options="summarySubjects.map(s => ({ value: s.id, label: s.name }))" />
        </div>

        <EmptyState v-if="!summarySubjectsLoading && !summarySubjects.length" compact icon="clipboard" tone="gray" title="No LOA, AOI or EOC results yet" message="Once assessments tagged LOA, AOI or EOC are marked for this class and term, each learner's results show here." />
        <Skeleton v-else-if="summaryLoading || summarySubjectsLoading" variant="list" :count="4" />

        <template v-else-if="summarySubjectId">
          <StatStrip :items="summaryStats" class="mb-3" />

          <!-- Grade spread across every LOA/AOI/EOC result -->
          <div v-if="gradeTotal" class="mb-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
            <p class="text-xs font-bold text-gray-900 dark:text-white mb-2">Grade spread</p>
            <div class="flex h-3 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
              <span v-for="g in GRADES" :key="g" :class="GRADE_BAR[g]" :style="{ width: `${classStats.gradeCounts[g] / gradeTotal * 100}%` }" :title="`${g}: ${classStats.gradeCounts[g]}`"></span>
            </div>
            <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              <button v-for="g in GRADES" :key="g" type="button" class="inline-flex items-center gap-1.5 text-[11px]" :class="performanceFilter === g ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'" @click="performanceFilter = performanceFilter === g ? 'all' : g">
                <span class="w-2.5 h-2.5 rounded-sm" :class="GRADE_BAR[g]"></span>{{ g }} · {{ GRADE_DESCRIPTORS[g] }} <span class="text-gray-400">{{ classStats.gradeCounts[g] }}</span>
              </button>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-2 mb-3">
            <input v-model="searchQuery" type="search" placeholder="Search learner or student number" class="flex-1 px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <PickerDropdown v-model="statusFilter" label="Report status" :options="statusOptions" align="right" />
          </div>

          <EmptyState v-if="!filteredSummary.length" compact icon="users" tone="gray" title="No learners match these filters" />
          <ul v-else class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
            <li v-for="s in filteredSummary" :key="s.student_id" class="p-3 sm:p-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <button type="button" class="min-w-0 md:w-56 flex-shrink-0 text-left" @click="openLearnerReport(s.student_id)">
                <span class="block text-sm font-semibold text-gray-900 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-300 truncate">{{ niceName(`${s.first_name} ${s.last_name}`) }}</span>
                <span class="block text-[11px] text-gray-400">{{ s.admission_number }}</span>
              </button>
              <div class="flex-1 grid grid-cols-3 gap-2">
                <div v-for="cat in CATS" :key="cat" class="rounded-xl px-2.5 py-1.5 bg-gray-50 dark:bg-gray-700/40 min-w-0">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400">{{ cat }}</p>
                  <p v-if="s.categories[cat].state === 'assessed'" class="flex items-center gap-1.5 min-w-0">
                    <span class="w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-extrabold text-white flex-shrink-0" :class="GRADE_BAR[(s.categories[cat].status || 'E') as Grade]">{{ s.categories[cat].status }}</span>
                    <span class="text-sm font-semibold text-gray-900 dark:text-white tabular-nums">{{ s.categories[cat].percentage }}%</span>
                  </p>
                  <p v-else class="text-[11px] italic text-gray-400 truncate">{{ STATE_LABEL[s.categories[cat].state] || s.categories[cat].state }}</p>
                </div>
              </div>
              <div class="flex items-center justify-between md:justify-end gap-2 md:w-56 flex-shrink-0">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="REPORT_STATUS_BADGE[s.report_status]">{{ REPORT_STATUS_LABELS[s.report_status] }}</span>
                <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="openLearnerReport(s.student_id)">Report</button>
              </div>
            </li>
          </ul>
        </template>
      </template>

      <!-- ===== Report card generation ===== -->
      <template v-else>
        <div v-if="!noAccess" class="flex flex-col sm:flex-row sm:items-end gap-2 mb-4">
          <PickerDropdown v-if="!isClassTeacher && mySubjects.length" v-model="selectedSubjectId" label="Your subject" :options="mySubjects.map(s => ({ value: s.id, label: s.name }))" />
          <div class="sm:ml-auto flex items-center gap-2">
            <span v-if="bulkProgress" class="text-xs text-gray-500 dark:text-gray-400">Generating {{ bulkProgress.done }}/{{ bulkProgress.total }}…</span>
            <button
              v-if="missingCount || !isClassTeacher"
              type="button"
              :disabled="!!bulkProgress || (!isClassTeacher && !selectedSubjectId)"
              class="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              @click="generateAll"
            >{{ isClassTeacher ? `Generate all missing (${missingCount})` : `Generate for all (${students.length})` }}</button>
          </div>
        </div>

        <!-- Progress through the class -->
        <div v-if="students.length && !noAccess" class="mb-4 flex items-center gap-3">
          <span class="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full bg-indigo-500" :style="{ width: `${generatedCount / students.length * 100}%` }"></span></span>
          <span class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ generatedCount }} of {{ students.length }} generated</span>
        </div>

        <Skeleton v-if="loadingStudents" variant="list" :count="5" />
        <EmptyState v-else-if="noAccess" compact icon="teacher" tone="amber" title="Report cards for this class come from its class teacher" message="You can generate them for a class you're Class Teacher of, or where you're allocated a subject on the timetable. Ask the school admin if this class should be yours." />
        <EmptyState v-else-if="!students.length" compact icon="users" tone="gray" title="No students in this class" />
        <ul v-else class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
          <li v-for="student in students" :key="student.id" :data-student-id="student.id" class="p-3 sm:px-4 flex items-center gap-3">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ niceName(`${student.first_name} ${student.last_name}`) }}</p>
              <p class="text-[11px] text-gray-400">{{ student.admission_number }}</p>
            </div>
            <span v-if="student.report_card_id" class="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
              <AppIcon name="check-circle" class="w-3.5 h-3.5" /> Generated{{ student.performance_level ? ` · ${student.performance_level}` : '' }}
            </span>
            <span v-else class="hidden sm:inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300">Not generated</span>
            <div class="flex items-center gap-1.5 flex-shrink-0">
              <button v-if="student.report_card_id" type="button" class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="viewReport(student.id)">View</button>
              <button
                v-if="isClassTeacher"
                type="button"
                :disabled="generatingId === student.id || !!bulkProgress"
                class="px-3 py-1.5 text-xs font-semibold rounded-lg disabled:opacity-50"
                :class="student.report_card_id ? 'text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30' : 'bg-indigo-600 text-white hover:bg-indigo-700'"
                @click="generateFull(student.id)"
              >{{ generatingId === student.id ? 'Generating…' : (student.report_card_id ? 'Regenerate' : 'Generate') }}</button>
              <button
                v-else-if="selectedSubjectId"
                type="button"
                :disabled="generatingId === student.id || !!bulkProgress"
                class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                @click="generateSubject(student.id)"
              >{{ generatingId === student.id ? 'Generating…' : 'Generate' }}</button>
            </div>
          </li>
        </ul>
      </template>
    </template>

    <!-- Report viewer -->
    <div v-if="activeReport" class="fixed inset-0 bg-black/60 flex items-start justify-center z-50 p-4 overflow-y-auto" @click.self="activeReport = null">
      <div class="max-w-5xl w-full my-6">
        <div class="flex justify-end mb-2 gap-2">
          <button type="button" class="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow" @click="printReport">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Print
          </button>
          <button type="button" class="px-3 py-2 text-sm font-semibold rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow" @click="activeReport = null">Close</button>
        </div>
        <ReportCard
          :report="activeReport"
          :editable-class-teacher-comment="isClassTeacher"
          @save-class-teacher-comment="saveClassTeacherComment"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import ReportCard from '@/components/reportcard/ReportCard.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import PickerDropdown, { type PickerOption } from '@/components/common/PickerDropdown.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { useToastStore } from '@/stores/toast'
import type {
  ReportCard as ReportCardType, ReportCardStudentEntry,
  ClassSummaryStudent, ClassSummarySubjectOption, ClassSummaryReportStatus,
} from '@/types/reportCard'

interface Term {
  id: number
  name: string
  academic_year: string | null
  is_current: number | boolean
}

interface ClassOption {
  id: number
  name: string
  level?: string
  stream_name?: string | null
}

interface SubjectOption {
  id: number
  name: string
}

const API_BASE = '/api/teacher'

const terms = ref<Term[]>([])
const classes = ref<ClassOption[]>([])
const mySubjects = ref<SubjectOption[]>([])
const students = ref<ReportCardStudentEntry[]>([])
const isClassTeacher = ref(false)

const selectedTermId = ref<number | null>(null)
const selectedClassId = ref<number | null>(null)
const selectedSubjectId = ref<number | null>(null)

const loadingStudents = ref(false)
// The report-card side refused this class (not its class teacher, no subject allocation)
const noAccess = ref(false)
// Streams the teacher actually teaches - listed first, and the default
const mine = ref<Set<number>>(new Set())
const generatingId = ref<number | null>(null)
const error = ref<string | null>(null)

const activeReport = ref<ReportCardType | null>(null)

// --- Class-wide LOA/AOI/EOC competency summary (Phase F) - a separate subject selector scoped to
// just this section, since the "Subject" dropdown above only ever populates for a genuine subject
// teacher via class_subjects (confirmed empty in this database, so that selector is effectively
// always empty regardless of role today) - left untouched rather than risking the existing
// generate-report flow it drives. This section sources its subjects from actual tagged assignment
// data instead (CompetencyReportService::listSubjectsWithCompetencyData()).
const summarySubjects = ref<ClassSummarySubjectOption[]>([])
const summarySubjectId = ref<number | null>(null)
const summarySubjectsLoading = ref(false)
const classSummary = ref<ClassSummaryStudent[]>([])
const summaryLoading = ref(false)
const summaryMaxWeight = ref(5)

const searchQuery = ref('')
const performanceFilter = ref<'all' | 'A' | 'B' | 'C' | 'D' | 'E'>('all')
const statusFilter = ref<'all' | ClassSummaryReportStatus>('all')

const toast = useToastStore()
const booting = ref(true)
// Two jobs on the page, one shown at a time (remembered)
const TABS = [
  { key: 'summary' as const, label: 'Class summary' },
  { key: 'generate' as const, label: 'Generate reports' }
]
const tab = usePersistedRef<'summary' | 'generate'>('reports:tab', 'summary')

type Grade = 'A' | 'B' | 'C' | 'D' | 'E'
const GRADES: Grade[] = ['A', 'B', 'C', 'D', 'E']
const GRADE_BAR: Record<Grade, string> = { A: 'bg-emerald-500', B: 'bg-sky-500', C: 'bg-amber-400', D: 'bg-orange-500', E: 'bg-rose-500' }
const CATS = ['LOA', 'AOI', 'EOC'] as const
const STATE_LABEL: Record<string, string> = { not_assessed: 'Not assessed', awaiting_marking: 'Awaiting marking', awaiting_submission: 'Not handed in' }

const GRADE_DESCRIPTORS: Record<'A' | 'B' | 'C' | 'D' | 'E', string> = {
  A: 'Exceptional', B: 'Outstanding', C: 'Satisfactory', D: 'Basic', E: 'Elementary',
}

const REPORT_STATUS_ORDER: ClassSummaryReportStatus[] = ['not_assessed', 'awaiting_submission', 'awaiting_marking', 'ready', 'published']
const REPORT_STATUS_LABELS: Record<ClassSummaryReportStatus, string> = {
  not_assessed: 'Not Assessed',
  awaiting_submission: 'Awaiting Submission',
  awaiting_marking: 'Awaiting Marking',
  ready: 'Ready',
  published: 'Published',
}
const REPORT_STATUS_BADGE: Record<ClassSummaryReportStatus, string> = {
  not_assessed: 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400',
  awaiting_submission: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  awaiting_marking: 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
  ready: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  published: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
}

const loadSummarySubjects = async () => {
  if (!selectedClassId.value || !selectedTermId.value) {
    summarySubjects.value = []
    summarySubjectId.value = null
    return
  }
  summarySubjectsLoading.value = true
  try {
    const res = await axios.get(`${API_BASE}/report-cards/class-summary/subjects`, {
      params: { class_id: selectedClassId.value, term_id: selectedTermId.value },
    })
    summarySubjects.value = res.data.data.subjects
    summarySubjectId.value = summarySubjects.value[0]?.id ?? null
  } catch (err) {
    summarySubjects.value = []
  } finally {
    summarySubjectsLoading.value = false
  }
}

const loadClassSummary = async () => {
  if (!selectedClassId.value || !selectedTermId.value || !summarySubjectId.value) {
    classSummary.value = []
    return
  }
  summaryLoading.value = true
  try {
    const res = await axios.get(`${API_BASE}/report-cards/class-summary`, {
      params: { class_id: selectedClassId.value, term_id: selectedTermId.value, subject_id: summarySubjectId.value },
    })
    classSummary.value = res.data.data.students
    summaryMaxWeight.value = res.data.data.max_weight
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load class competency summary'
    classSummary.value = []
  } finally {
    summaryLoading.value = false
  }
}

const filteredSummary = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return classSummary.value.filter(s => {
    if (q) {
      const haystack = `${s.first_name} ${s.last_name} ${s.admission_number}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    if (performanceFilter.value !== 'all') {
      const grades = [s.categories.LOA.status, s.categories.AOI.status, s.categories.EOC.status]
      if (!grades.includes(performanceFilter.value)) return false
    }
    if (statusFilter.value !== 'all' && s.report_status !== statusFilter.value) return false
    return true
  })
})

const termOptions = computed<PickerOption<number>[]>(() => terms.value.map(t => ({
  value: t.id, label: `${t.name}${t.academic_year ? ` ${t.academic_year}` : ''}`, hint: t.is_current ? 'current' : undefined
})))
const classOptions = computed<PickerOption<number>[]>(() => [...classes.value]
  .sort((a, b) => Number(mine.value.has(b.id)) - Number(mine.value.has(a.id)) || a.name.localeCompare(b.name, undefined, { numeric: true }) || String(a.stream_name).localeCompare(String(b.stream_name)))
  .map(c => ({ value: c.id, label: `${c.name}${c.stream_name ? `-${c.stream_name}` : ''}`, hint: mine.value.has(c.id) ? 'yours' : undefined, hintClass: 'text-indigo-600 dark:text-indigo-300' })))
const statusOptions = computed<PickerOption<'all' | ClassSummaryReportStatus>[]>(() => [
  { value: 'all', label: 'All' },
  ...REPORT_STATUS_ORDER.map(s => ({ value: s, label: REPORT_STATUS_LABELS[s] }))
])

const classStats = computed(() => {
  const gradeCounts: Record<'A' | 'B' | 'C' | 'D' | 'E', number> = { A: 0, B: 0, C: 0, D: 0, E: 0 }
  let ready = 0
  let published = 0
  for (const s of classSummary.value) {
    for (const cat of ['LOA', 'AOI', 'EOC'] as const) {
      const status = s.categories[cat].status
      if (status && status in gradeCounts) gradeCounts[status as 'A' | 'B' | 'C' | 'D' | 'E']++
    }
    if (s.report_status === 'ready') ready++
    if (s.report_status === 'published') published++
  }
  return { total: classSummary.value.length, gradeCounts, ready, published }
})

const gradeTotal = computed(() => GRADES.reduce((n, g) => n + classStats.value.gradeCounts[g], 0))
const summaryStats = computed<StatItem[]>(() => [
  { label: 'Learners', value: classStats.value.total, tone: 'gray' },
  { label: 'Ready', value: classStats.value.ready, tone: 'emerald', hint: 'all results in' },
  { label: 'Published', value: classStats.value.published, tone: 'indigo' },
  { label: 'Still to come', value: classStats.value.total - classStats.value.ready - classStats.value.published, tone: 'amber', hint: 'waiting on work or marking' }
])
const generatedCount = computed(() => students.value.filter(s => s.report_card_id).length)
const missingCount = computed(() => students.value.length - generatedCount.value)

// Generate for the whole class in one go - one learner after another, so the server isn't
// flooded; the class teacher fills in the missing full reports, a subject teacher their subject
const bulkProgress = ref<{ done: number; total: number } | null>(null)
const generateAll = async () => {
  if (!selectedTermId.value) return
  const subjectId = selectedSubjectId.value
  const targets = isClassTeacher.value ? students.value.filter(s => !s.report_card_id) : students.value
  if (!targets.length || (!isClassTeacher.value && !subjectId)) return
  bulkProgress.value = { done: 0, total: targets.length }
  let failed = 0
  for (const st of targets) {
    try {
      const url = isClassTeacher.value
        ? `${API_BASE}/report-cards/${st.id}/${selectedTermId.value}/generate`
        : `${API_BASE}/report-cards/${st.id}/${selectedTermId.value}/subjects/${subjectId}/generate`
      await axios.post(url)
    } catch {
      failed++
    }
    bulkProgress.value = { done: bulkProgress.value.done + 1, total: targets.length }
  }
  bulkProgress.value = null
  await loadStudents()
  await loadClassSummary()
  if (failed) toast.warning(`${targets.length - failed} generated, ${failed} could not be`)
  else toast.success(`${targets.length} report${targets.length === 1 ? '' : 's'} generated`)
}

// Reuses the exact existing view/generate flow below - the already-loaded `students` list (from
// the "Report Card Generation" table) tells us whether a report already exists for this learner.
const openLearnerReport = async (studentId: number) => {
  const known = students.value.find(s => s.id === studentId)
  if (known?.report_card_id) {
    await viewReport(studentId)
    return
  }
  if (isClassTeacher.value) {
    await generateFull(studentId)
  } else if (selectedSubjectId.value) {
    await generateSubject(studentId)
  } else {
    toast.warning("Generate this learner's report first - pick your subject")
    tab.value = 'generate'
  }
}

const loadTerms = async () => {
  const res = await axios.get(`${API_BASE}/report-cards/terms`)
  terms.value = res.data.data.terms
  const current = terms.value.find(t => t.is_current)
  selectedTermId.value = current ? current.id : (terms.value[0]?.id ?? null)
}

const loadClasses = async () => {
  const [res, overview] = await Promise.all([
    axios.get(`${API_BASE}/classes`),
    axios.get(`${API_BASE}/classes/overview`).catch(() => null)
  ])
  classes.value = res.data.data
  const streams: { id: number; mine?: boolean }[] = overview?.data?.data?.streams ?? []
  mine.value = new Set(streams.filter(st => st.mine).map(st => st.id))
  // The last class looked at, else the first - never a blank "Select class"
  let last: number | null = null
  try { last = Number(localStorage.getItem('reports:class')) || null } catch { /* private mode */ }
  selectedClassId.value = classOptions.value.find(o => o.value === last)?.value ?? classOptions.value[0]?.value ?? null
}
watch(selectedClassId, (id) => { try { if (id) localStorage.setItem('reports:class', String(id)) } catch { /* private mode */ } })

const loadMySubjects = async () => {
  if (!selectedClassId.value || !selectedTermId.value) {
    mySubjects.value = []
    return
  }
  try {
    const res = await axios.get(`${API_BASE}/report-cards/my-subjects`, {
      params: { class_id: selectedClassId.value, term_id: selectedTermId.value },
    })
    mySubjects.value = res.data.data.subjects
    selectedSubjectId.value = mySubjects.value[0]?.id ?? null
  } catch (err: any) {
    mySubjects.value = []
  }
}

const loadStudents = async () => {
  if (!selectedClassId.value || !selectedTermId.value) {
    students.value = []
    return
  }
  loadingStudents.value = true
  error.value = null
  noAccess.value = false
  try {
    const res = await axios.get(`${API_BASE}/report-cards/students`, {
      params: { class_id: selectedClassId.value, term_id: selectedTermId.value },
    })
    students.value = res.data.data.students
    isClassTeacher.value = res.data.data.is_class_teacher
    if (!isClassTeacher.value) {
      await loadMySubjects()
    } else {
      mySubjects.value = []
    }
  } catch (err: any) {
    if (err.response?.status === 403) noAccess.value = true
    else error.value = err.response?.data?.message || 'Failed to load students'
    students.value = []
    isClassTeacher.value = false
  } finally {
    loadingStudents.value = false
  }
}

watch([selectedTermId, selectedClassId], () => {
  loadStudents()
  loadSummarySubjects()
})

watch(summarySubjectId, () => {
  loadClassSummary()
})

const generateFull = async (studentId: number) => {
  if (!selectedTermId.value) return
  generatingId.value = studentId
  error.value = null
  try {
    await axios.post(`${API_BASE}/report-cards/${studentId}/${selectedTermId.value}/generate`)
    await loadStudents()
    await loadClassSummary()
    await viewReport(studentId)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to generate report'
  } finally {
    generatingId.value = null
  }
}

const generateSubject = async (studentId: number) => {
  if (!selectedTermId.value || !selectedSubjectId.value) return
  generatingId.value = studentId
  error.value = null
  try {
    await axios.post(`${API_BASE}/report-cards/${studentId}/${selectedTermId.value}/subjects/${selectedSubjectId.value}/generate`)
    await loadStudents()
    await loadClassSummary()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to generate subject report'
  } finally {
    generatingId.value = null
  }
}

const viewReport = async (studentId: number) => {
  if (!selectedTermId.value) return
  error.value = null
  try {
    const res = await axios.get(`${API_BASE}/report-cards/${studentId}/${selectedTermId.value}`)
    activeReport.value = res.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load report'
  }
}

const saveClassTeacherComment = async (comment: string) => {
  if (!activeReport.value || !selectedTermId.value) return
  try {
    await axios.put(`${API_BASE}/report-cards/${activeReport.value.student.id}/${selectedTermId.value}/class-teacher-comment`, { comment })
    activeReport.value.class_teacher_comment = comment
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to save comment'
  }
}

const printReport = () => {
  window.print()
}

onMounted(async () => {
  try {
    await Promise.all([loadTerms(), loadClasses()])
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load terms and classes'
  } finally {
    booting.value = false
  }
})
</script>
