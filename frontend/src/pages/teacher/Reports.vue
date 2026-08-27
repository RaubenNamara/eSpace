<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Report Cards</h1>
      <p class="text-gray-600 dark:text-gray-400">Generate and view learners' summative assessment reports.</p>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div class="flex flex-wrap items-end gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Term</label>
          <select v-model="selectedTermId" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[220px]">
            <option :value="null">Select term...</option>
            <option v-for="term in terms" :key="term.id" :value="term.id">
              {{ term.name }}{{ term.academic_year ? ` - ${term.academic_year}` : '' }}{{ term.is_current ? ' (Current)' : '' }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Class</label>
          <select v-model="selectedClassId" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[220px]">
            <option :value="null">Select class...</option>
            <option v-for="cls in classes" :key="cls.id" :value="cls.id">
              {{ cls.name }}{{ cls.stream_name ? ` - ${cls.stream_name}` : '' }}
            </option>
          </select>
        </div>
        <div v-if="!isClassTeacher && mySubjects.length > 0">
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Subject</label>
          <select v-model="selectedSubjectId" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[180px]">
            <option v-for="subj in mySubjects" :key="subj.id" :value="subj.id">{{ subj.name }}</option>
          </select>
        </div>
        <p v-if="selectedClassId && !loadingStudents" class="text-xs px-3 py-2 rounded-lg" :class="isClassTeacher ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'">
          {{ isClassTeacher ? "You are this class's Class Teacher - you can generate full reports." : 'You can generate report entries for your subject(s) only.' }}
        </p>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-red-600 dark:text-red-400 text-sm">
      {{ error }}
    </div>

    <!-- Loading -->
    <div v-if="loadingStudents" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
    </div>

    <!-- No selection -->
    <div v-else-if="!selectedTermId || !selectedClassId" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center text-gray-500 dark:text-gray-400">
      Select a term and class to see students.
    </div>

    <template v-else>
      <!-- Class-Wide LOA/AOI/EOC Competency Summary -->
      <div class="mb-8">
        <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-1">Class Competency Summary</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">LOA, AOI and EOC results for every learner in this class, for one subject at a time.</p>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Subject</label>
          <select v-model="summarySubjectId" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[220px]">
            <option :value="null">Select subject...</option>
            <option v-for="subj in summarySubjects" :key="subj.id" :value="subj.id">{{ subj.name }}</option>
          </select>
          <p v-if="summarySubjects.length === 0 && !summarySubjectsLoading" class="text-xs text-gray-400 mt-2">
            No LOA/AOI/EOC-tagged assignments found yet for this class/term.
          </p>
        </div>

        <div v-if="!summarySubjectId" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center text-gray-400 text-sm">
          Select a subject to see the class competency summary.
        </div>

        <div v-else-if="summaryLoading" class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>

        <template v-else>
          <!-- Stats -->
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-4">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3">
              <p class="text-[10px] uppercase tracking-wide text-gray-400">Learners</p>
              <p class="text-xl font-bold text-gray-900 dark:text-white">{{ classStats.total }}</p>
            </div>
            <div v-for="grade in (['A','B','C','D','E'] as const)" :key="grade" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3">
              <p class="text-[10px] uppercase tracking-wide text-gray-400">{{ grade }} &middot; {{ GRADE_DESCRIPTORS[grade] }}</p>
              <p class="text-xl font-bold" :class="gradeTextColor(grade)">{{ classStats.gradeCounts[grade] }}</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3">
              <p class="text-[10px] uppercase tracking-wide text-gray-400">Ready</p>
              <p class="text-xl font-bold text-emerald-600">{{ classStats.ready }}</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3">
              <p class="text-[10px] uppercase tracking-wide text-gray-400">Published</p>
              <p class="text-xl font-bold text-indigo-600">{{ classStats.published }}</p>
            </div>
          </div>

          <!-- Search & filters -->
          <div class="flex flex-wrap items-end gap-3 mb-4">
            <div class="flex-1 min-w-[200px]">
              <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Search learner</label>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Name or student number..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white text-sm"
              >
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Performance</label>
              <select v-model="performanceFilter" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white text-sm">
                <option value="all">All</option>
                <option v-for="grade in (['A','B','C','D','E'] as const)" :key="grade" :value="grade">{{ grade }} - {{ GRADE_DESCRIPTORS[grade] }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Report Status</label>
              <select v-model="statusFilter" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white text-sm">
                <option value="all">All</option>
                <option v-for="s in REPORT_STATUS_ORDER" :key="s" :value="s">{{ REPORT_STATUS_LABELS[s] }}</option>
              </select>
            </div>
          </div>

          <!-- Desktop / tablet table -->
          <div class="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Learner</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">LOA</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">AOI</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">EOC</th>
                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Overall</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Report Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="s in filteredSummary" :key="s.student_id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td class="px-4 py-3">
                      <button @click="openLearnerReport(s.student_id)" class="font-medium text-indigo-600 dark:text-indigo-400 hover:underline text-left">
                        {{ s.first_name }} {{ s.last_name }}
                      </button>
                      <p class="text-xs text-gray-400">{{ s.admission_number }}</p>
                    </td>
                    <td class="px-4 py-3"><CategoryCell :result="s.categories.LOA" :max-weight="summaryMaxWeight" /></td>
                    <td class="px-4 py-3"><CategoryCell :result="s.categories.AOI" :max-weight="summaryMaxWeight" /></td>
                    <td class="px-4 py-3"><CategoryCell :result="s.categories.EOC" :max-weight="summaryMaxWeight" /></td>
                    <td class="px-4 py-3 text-center text-gray-400">&mdash;</td>
                    <td class="px-4 py-3">
                      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="REPORT_STATUS_BADGE[s.report_status]">
                        {{ REPORT_STATUS_LABELS[s.report_status] }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="filteredSummary.length === 0">
                    <td colspan="6" class="px-6 py-10 text-center text-gray-400">No learners match these filters.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Mobile cards -->
          <div class="md:hidden space-y-3">
            <div
              v-for="s in filteredSummary"
              :key="s.student_id"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
            >
              <div class="flex items-start justify-between gap-3 mb-3">
                <div>
                  <button @click="openLearnerReport(s.student_id)" class="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline text-left">
                    {{ s.first_name }} {{ s.last_name }}
                  </button>
                  <p class="text-xs text-gray-400">{{ s.admission_number }}</p>
                </div>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0" :class="REPORT_STATUS_BADGE[s.report_status]">
                  {{ REPORT_STATUS_LABELS[s.report_status] }}
                </span>
              </div>

              <div class="space-y-2.5">
                <div v-for="cat in (['LOA', 'AOI', 'EOC'] as const)" :key="cat" class="flex items-center justify-between text-sm border-t border-gray-100 dark:border-gray-700 pt-2.5 first:border-t-0 first:pt-0">
                  <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{{ cat }}</span>
                  <CategoryCell :result="s.categories[cat]" :max-weight="summaryMaxWeight" align="right" />
                </div>
              </div>

              <button
                @click="openLearnerReport(s.student_id)"
                class="w-full mt-3 px-3 py-2 text-xs font-medium rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
              >
                View Report
              </button>
            </div>
            <div v-if="filteredSummary.length === 0" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center text-gray-400 text-sm">
              No learners match these filters.
            </div>
          </div>
        </template>
      </div>

      <!-- Students table (generate/view management) -->
      <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Report Card Generation</h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admission No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="student in students" :key="student.id" :data-student-id="student.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ student.first_name }} {{ student.last_name }}</td>
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ student.admission_number }}</td>
              <td class="px-6 py-4">
                <span v-if="student.report_card_id" class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  Generated{{ student.performance_level ? ` - ${student.performance_level}` : '' }}
                </span>
                <span v-else class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  Not generated
                </span>
              </td>
              <td class="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                <button
                  v-if="student.report_card_id"
                  @click="viewReport(student.id)"
                  class="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  View
                </button>
                <button
                  v-if="isClassTeacher"
                  :disabled="generatingId === student.id"
                  @click="generateFull(student.id)"
                  class="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  {{ generatingId === student.id ? 'Generating...' : (student.report_card_id ? 'Regenerate Full' : 'Generate Full') }}
                </button>
                <button
                  v-else-if="selectedSubjectId"
                  :disabled="generatingId === student.id"
                  @click="generateSubject(student.id)"
                  class="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  {{ generatingId === student.id ? 'Generating...' : 'Generate Subject' }}
                </button>
              </td>
            </tr>
            <tr v-if="students.length === 0">
              <td colspan="4" class="px-6 py-10 text-center text-gray-400">No students found for this class.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- Report viewer modal -->
    <div v-if="activeReport" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div class="bg-transparent max-w-5xl w-full my-8">
        <div class="flex justify-end mb-2 gap-2">
          <button @click="printReport" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
            Print
          </button>
          <button @click="activeReport = null" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
            Close
          </button>
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
import { ref, computed, watch, onMounted, h, defineComponent, type PropType } from 'vue'
import axios from 'axios'
import ReportCard from '@/components/reportcard/ReportCard.vue'
import type {
  ReportCard as ReportCardType, ReportCardStudentEntry,
  ClassSummaryStudent, ClassSummarySubjectOption, ClassSummaryCategoryResult, ClassSummaryReportStatus,
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

const gradeTextColor = (grade: string) => {
  const colors: Record<string, string> = {
    A: 'text-emerald-600', B: 'text-blue-600', C: 'text-amber-500', D: 'text-orange-500', E: 'text-red-600',
  }
  return colors[grade] || 'text-gray-400'
}

// Small inline component (one file, avoids a whole new SFC for a single grade+status+weight cell
// reused in both the desktop table and the mobile cards). Declared via defineComponent with an
// explicit props object - a bare render function here does NOT reliably get kebab-case template
// attributes (e.g. :max-weight) camelCased into its argument, so max-weight silently read as
// undefined without this.
const CategoryCell = defineComponent({
  props: {
    result: { type: Object as PropType<ClassSummaryCategoryResult>, required: true },
    maxWeight: { type: Number, required: true },
    align: { type: String as PropType<'left' | 'right'>, default: 'left' },
  },
  setup(props) {
    return () => {
      const r = props.result
      if (r.state === 'assessed') {
        return h('div', { class: props.align === 'right' ? 'text-right' : '' }, [
          h('span', { class: 'font-semibold text-gray-900 dark:text-white' }, `${r.percentage}%`),
          h('span', { class: `mx-1 font-bold ${gradeTextColor(r.status || '')}` }, `· ${r.status} ·`),
          h('span', { class: 'text-gray-600 dark:text-gray-400' }, r.performance_descriptor || ''),
          h('div', { class: 'text-xs text-gray-400 mt-0.5' }, `Weight: ${r.weight}/${props.maxWeight}`),
        ])
      }
      const labels: Record<string, string> = {
        not_assessed: 'Not Assessed',
        awaiting_marking: 'Awaiting Marking',
        awaiting_submission: 'Awaiting Submission',
      }
      return h('span', { class: 'text-xs italic text-gray-400' }, labels[r.state] || r.state)
    }
  },
})

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
    error.value = 'Generate this student\'s report card from the table below first (select your subject).'
    const row = document.querySelector(`[data-student-id="${studentId}"]`)
    row?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

const loadTerms = async () => {
  const res = await axios.get(`${API_BASE}/report-cards/terms`)
  terms.value = res.data.data.terms
  const current = terms.value.find(t => t.is_current)
  selectedTermId.value = current ? current.id : (terms.value[0]?.id ?? null)
}

const loadClasses = async () => {
  const res = await axios.get(`${API_BASE}/classes`)
  classes.value = res.data.data
}

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
    error.value = err.response?.data?.message || 'Failed to load students'
    students.value = []
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
  await Promise.all([loadTerms(), loadClasses()])
  await loadStudents()
  await loadSummarySubjects()
})
</script>
