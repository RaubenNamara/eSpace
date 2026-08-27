<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reports</h1>
      <p class="text-gray-600 dark:text-gray-400">Student competency reports (LOA/AOI/EOC) and summative report cards.</p>
    </div>

    <!-- ============================= Student Competency Reports (LOA/AOI/EOC) ============================= -->
    <div class="mb-10">
      <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-1">Student Competency Reports</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">One student, one term, three reports - Learning Outcome Assessment (LOA), Activity of Integration (AOI), and Elements of Construct (EOC).</p>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <div class="flex flex-wrap items-end gap-4">
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Academic Year</label>
            <select v-model="cSelectedYearId" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[160px]">
              <option :value="null">Select year...</option>
              <option v-for="y in academicYears" :key="y.id" :value="y.id">{{ y.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Term</label>
            <select v-model="cSelectedTermId" :disabled="!cSelectedYearId" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[160px] disabled:opacity-50">
              <option :value="null">Select term...</option>
              <option v-for="t in cTermsForYear" :key="t.id" :value="t.id">{{ t.name }}{{ t.is_current ? ' (Current)' : '' }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Class / Stream</label>
            <select v-model="cSelectedClassId" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[200px]">
              <option :value="null">Select class...</option>
              <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.name }}{{ cls.stream_name ? ` - ${cls.stream_name}` : '' }}</option>
            </select>
          </div>
          <div class="flex-1 min-w-[200px]">
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Search learner</label>
            <input v-model="cSearch" type="text" placeholder="Name or admission number..." class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white text-sm">
          </div>
        </div>
      </div>

      <div v-if="cError" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4 text-red-600 dark:text-red-400 text-sm">
        {{ cError }}
      </div>

      <div v-if="!cSelectedTermId || !cSelectedClassId" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center text-gray-400 text-sm">
        Select a year, term and class to see students.
      </div>

      <div v-else-if="cLoading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>

      <template v-else>
        <!-- Desktop / tablet table -->
        <div class="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stream</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Term</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reports</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="s in filteredCompetencyStudents" :key="s.student_id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td class="px-4 py-3">
                    <button @click="openOverview(s.student_id)" class="font-medium text-indigo-600 dark:text-indigo-400 hover:underline text-left">{{ s.first_name }} {{ s.last_name }}</button>
                    <p class="text-xs text-gray-400">{{ s.admission_number }}</p>
                  </td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ selectedClassLabel.name }}</td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ selectedClassLabel.stream || '-' }}</td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ selectedTermLabel }}</td>
                  <td class="px-4 py-3">
                    <div class="flex gap-1.5">
                      <span v-for="cat in (['LOA','AOI','EOC'] as const)" :key="cat" class="px-2 py-0.5 rounded text-[11px] font-semibold" :class="s.categories[cat].available ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'">
                        {{ cat }}
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <button @click="openOverview(s.student_id)" class="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      View Reports
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredCompetencyStudents.length === 0">
                  <td colspan="6" class="px-6 py-10 text-center text-gray-400">No learners match these filters.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Mobile cards -->
        <div class="md:hidden space-y-3">
          <div v-for="s in filteredCompetencyStudents" :key="s.student_id" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <button @click="openOverview(s.student_id)" class="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline text-left block">{{ s.first_name }} {{ s.last_name }}</button>
            <p class="text-xs text-gray-400 mb-2">{{ s.admission_number }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ selectedClassLabel.name }} &mdash; {{ selectedClassLabel.stream || '-' }} &middot; {{ selectedTermLabel }}</p>
            <div class="flex flex-wrap gap-2 mb-3">
              <span v-for="cat in (['LOA','AOI','EOC'] as const)" :key="cat" class="px-2.5 py-1 rounded-lg text-xs font-semibold" :class="s.categories[cat].available ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'">
                {{ cat }} {{ s.categories[cat].available ? `· ${s.categories[cat].percentage}%` : '' }}
              </span>
            </div>
            <button @click="openOverview(s.student_id)" class="w-full px-3 py-2 text-xs font-medium rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100">
              View Reports
            </button>
          </div>
          <div v-if="filteredCompetencyStudents.length === 0" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center text-gray-400 text-sm">
            No learners match these filters.
          </div>
        </div>
      </template>

      <!-- Student Report Overview modal -->
      <div v-if="overview" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto" @click.self="overview = null">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl my-8">
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 rounded-t-2xl flex items-start justify-between gap-4">
            <div>
              <h3 class="text-xl font-bold text-white">{{ overview.student.first_name }} {{ overview.student.last_name }}</h3>
              <p class="text-indigo-100 text-sm mt-1">
                {{ overview.student.admission_number }} &middot; {{ overview.student.class_name }}{{ overview.student.stream_name ? ' - ' + overview.student.stream_name : '' }} &middot; {{ overview.term.name }}{{ overview.term.academic_year ? ' - ' + overview.term.academic_year : '' }}
              </p>
            </div>
            <button @click="overview = null" class="text-white/80 hover:text-white flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div class="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div v-for="cat in (['LOA','AOI','EOC'] as const)" :key="cat" class="rounded-xl border-2 p-4" :class="overview.categories[cat].available ? 'border-gray-200 dark:border-gray-700' : 'border-dashed border-gray-300 dark:border-gray-700'">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-bold text-gray-900 dark:text-white">{{ cat }}</h4>
                <span v-if="overview.categories[cat].available" class="grade-badge font-bold text-white shadow-sm inline-flex items-center justify-center w-7 h-7 rounded-full text-xs" :class="gradeBg(overview.categories[cat].status)">
                  {{ overview.categories[cat].status }}
                </span>
              </div>
              <p class="text-[11px] text-gray-400 mb-3">{{ CATEGORY_SHORT_LABELS[cat] }}</p>

              <template v-if="overview.categories[cat].available">
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ overview.categories[cat].percentage }}%</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">{{ overview.categories[cat].performance_descriptor }} &middot; Weight {{ overview.categories[cat].weight }}/{{ overview.max_weight }}</p>
                <p class="text-xs text-gray-400 mb-3">{{ overview.categories[cat].assessment_count }} assessment{{ overview.categories[cat].assessment_count === 1 ? '' : 's' }}</p>
                <button @click="openDetail(cat)" class="w-full px-3 py-2 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                  View Report
                </button>
              </template>
              <template v-else>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Report not available yet</p>
                <p class="text-xs text-gray-400 mt-1">No completed {{ cat }} assessments found.</p>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Detail modal (view/print/download) -->
      <div v-if="detail" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto" @click.self="detail = null">
        <div class="bg-transparent max-w-5xl w-full my-8">
          <div class="sticky top-0 z-20 flex justify-end mb-2 gap-2 bg-black/40 backdrop-blur-sm rounded-lg p-2">
            <button :disabled="cDownloading" @click="downloadDetailPdf" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
              {{ cDownloading ? 'Preparing PDF...' : 'Download PDF' }}
            </button>
            <button @click="printReport" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
              Print
            </button>
            <button @click="detail = null" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
              Close
            </button>
          </div>
          <CompetencyDetailReport ref="detailCardRef" :report="detail" />
        </div>
      </div>
    </div>

    <!-- ============================= Existing summative Report Cards (unchanged) ============================= -->
    <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-1">Report Cards</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">View, generate and download learners' summative assessment reports.</p>

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
            <option :value="null">All classes</option>
            <option v-for="cls in classes" :key="cls.id" :value="cls.id">
              {{ cls.name }}{{ cls.stream_name ? ` - ${cls.stream_name}` : '' }}
            </option>
          </select>
        </div>
        <button
          v-if="selectedClassId"
          :disabled="bulkDownloading || generatedCount === 0"
          @click="downloadClassPdf"
          class="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ bulkDownloading ? `Preparing (${bulkProgress}/${generatedCount})...` : `Download Class PDF (${generatedCount})` }}
        </button>
      </div>
    </div>

    <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-red-600 dark:text-red-400 text-sm">
      {{ error }}
    </div>

    <div v-if="loadingStudents" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="!selectedTermId" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center text-gray-500 dark:text-gray-400">
      Select a term to see students.
    </div>

    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
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
          <tr v-for="student in students" :key="student.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
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
                v-if="student.report_card_id"
                :disabled="downloadingId === student.id || bulkDownloading"
                @click="downloadSingle(student)"
                class="px-3 py-1.5 text-xs font-medium rounded-lg border border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 disabled:opacity-50"
              >
                {{ downloadingId === student.id ? 'Preparing...' : 'Download' }}
              </button>
              <button
                :disabled="generatingId === student.id || bulkDownloading"
                @click="generateFull(student.id)"
                class="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {{ generatingId === student.id ? 'Generating...' : (student.report_card_id ? 'Regenerate' : 'Generate') }}
              </button>
            </td>
          </tr>
          <tr v-if="students.length === 0">
            <td colspan="4" class="px-6 py-10 text-center text-gray-400">No students found.</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>

    <!-- Report viewer modal -->
    <div v-if="activeReport" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto" @click.self="activeReport = null">
      <div class="bg-transparent max-w-5xl w-full my-8">
        <div class="sticky top-0 z-20 flex justify-end mb-2 gap-2 bg-black/40 backdrop-blur-sm rounded-lg p-2">
          <button
            :disabled="downloading"
            @click="downloadActivePdf"
            class="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {{ downloading ? 'Preparing PDF...' : 'Download PDF' }}
          </button>
          <button @click="printReport" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
            Print
          </button>
          <button @click="activeReport = null" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
            Close
          </button>
        </div>
        <ReportCard
          ref="reportCardRef"
          :report="activeReport"
          editable-head-teacher-comment
          @save-head-teacher-comment="saveHeadTeacherComment"
        />
      </div>
    </div>

    <!-- Hidden offscreen card used only to render+capture each student's report during a class-wide PDF export -->
    <div style="position: fixed; left: -10000px; top: 0; width: 900px;" aria-hidden="true">
      <ReportCard v-if="bulkReport" ref="bulkCardRef" :report="bulkReport" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import ReportCard from '@/components/reportcard/ReportCard.vue'
import CompetencyDetailReport from '@/components/reportcard/CompetencyDetailReport.vue'
import { captureElement, buildPdfFromCanvases, downloadElementAsPdf, sanitizeFilename, withLightMode } from '@/utils/reportCardPdf'
import type {
  ReportCard as ReportCardType, ReportCardStudentEntry,
  CompetencyCategory, CompetencyListStudent, CompetencyOverview, CompetencyDetailReport as CompetencyDetailReportType,
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

interface AcademicYear {
  id: number
  name: string
  terms: { id: number; name: string; is_current: number | boolean }[]
}

const API_BASE = '/api/admin'

const CATEGORY_SHORT_LABELS: Record<CompetencyCategory, string> = {
  LOA: 'Learning Outcome Assessment',
  AOI: 'Activity of Integration',
  EOC: 'Elements of Construct',
}

const gradeBg = (grade: string | null) => {
  const colors: Record<string, string> = {
    A: 'bg-emerald-600', B: 'bg-blue-600', C: 'bg-amber-500', D: 'bg-orange-500', E: 'bg-red-600',
  }
  return grade ? colors[grade] || 'bg-gray-400' : 'bg-gray-300'
}

// --- Student Competency Reports (LOA/AOI/EOC) -------------------------------------------------

const academicYears = ref<AcademicYear[]>([])
const cSelectedYearId = ref<number | null>(null)
const cSelectedTermId = ref<number | null>(null)
const cSelectedClassId = ref<number | null>(null)
const cSearch = ref('')

const cTermsForYear = computed(() => academicYears.value.find(y => y.id === cSelectedYearId.value)?.terms ?? [])

const competencyStudents = ref<CompetencyListStudent[]>([])
const cLoading = ref(false)
const cError = ref<string | null>(null)

const filteredCompetencyStudents = computed(() => {
  const q = cSearch.value.trim().toLowerCase()
  if (!q) return competencyStudents.value
  return competencyStudents.value.filter(s => `${s.first_name} ${s.last_name} ${s.admission_number}`.toLowerCase().includes(q))
})

const selectedClassLabel = computed(() => {
  const cls = classes.value.find(c => c.id === cSelectedClassId.value)
  return { name: cls?.name || '-', stream: cls?.stream_name || null }
})
const selectedTermLabel = computed(() => cTermsForYear.value.find(t => t.id === cSelectedTermId.value)?.name || '-')

const loadAcademicYears = async () => {
  const res = await axios.get(`${API_BASE}/academic-years`)
  academicYears.value = res.data.data
}

const loadCompetencyStudents = async () => {
  if (!cSelectedClassId.value || !cSelectedTermId.value) {
    competencyStudents.value = []
    return
  }
  cLoading.value = true
  cError.value = null
  try {
    const res = await axios.get(`${API_BASE}/reports/students`, {
      params: { class_id: cSelectedClassId.value, term_id: cSelectedTermId.value },
    })
    competencyStudents.value = res.data.data.students
  } catch (err: any) {
    cError.value = err.response?.data?.message || 'Failed to load students'
    competencyStudents.value = []
  } finally {
    cLoading.value = false
  }
}

watch(cSelectedYearId, () => { cSelectedTermId.value = cTermsForYear.value[0]?.id ?? null })
watch([cSelectedTermId, cSelectedClassId], () => loadCompetencyStudents())

const overview = ref<CompetencyOverview | null>(null)
const overviewStudentId = ref<number | null>(null)

const openOverview = async (studentId: number) => {
  if (!cSelectedTermId.value) return
  cError.value = null
  overviewStudentId.value = studentId
  try {
    const res = await axios.get(`${API_BASE}/reports/students/${studentId}/terms/${cSelectedTermId.value}`)
    overview.value = res.data.data
  } catch (err: any) {
    cError.value = err.response?.data?.message || 'Failed to load student report overview'
  }
}

const detail = ref<CompetencyDetailReportType | null>(null)
const detailCardRef = ref<InstanceType<typeof CompetencyDetailReport> | null>(null)
const cDownloading = ref(false)

const openDetail = async (category: CompetencyCategory) => {
  if (!cSelectedTermId.value || !overviewStudentId.value) return
  cError.value = null
  try {
    const res = await axios.get(`${API_BASE}/reports/students/${overviewStudentId.value}/terms/${cSelectedTermId.value}/categories/${category}`)
    detail.value = res.data.data
  } catch (err: any) {
    cError.value = err.response?.data?.message || 'Failed to load report'
  }
}

const detailFilenameFor = (r: CompetencyDetailReportType) =>
  sanitizeFilename(`${r.student.first_name}_${r.student.last_name}_${r.term.name}_${r.category}`) + '_Report.pdf'

const downloadDetailPdf = async () => {
  if (!detailCardRef.value?.rootEl || !detail.value) return
  cDownloading.value = true
  try {
    await downloadElementAsPdf(detailCardRef.value.rootEl, detailFilenameFor(detail.value))
  } catch (err: any) {
    cError.value = 'Failed to generate PDF'
  } finally {
    cDownloading.value = false
  }
}

// --- Existing summative Report Cards (unchanged) ----------------------------------------------

const terms = ref<Term[]>([])
const classes = ref<ClassOption[]>([])
const students = ref<ReportCardStudentEntry[]>([])

const selectedTermId = ref<number | null>(null)
const selectedClassId = ref<number | null>(null)

const loadingStudents = ref(false)
const generatingId = ref<number | null>(null)
const downloadingId = ref<number | null>(null)
const downloading = ref(false)
const bulkDownloading = ref(false)
const bulkProgress = ref(0)
const error = ref<string | null>(null)

const activeReport = ref<ReportCardType | null>(null)
const reportCardRef = ref<InstanceType<typeof ReportCard> | null>(null)

const bulkReport = ref<ReportCardType | null>(null)
const bulkCardRef = ref<InstanceType<typeof ReportCard> | null>(null)

const generatedCount = computed(() => students.value.filter(s => s.report_card_id).length)

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

const loadStudents = async () => {
  if (!selectedTermId.value) {
    students.value = []
    return
  }
  loadingStudents.value = true
  error.value = null
  try {
    const params: Record<string, number> = { term_id: selectedTermId.value }
    if (selectedClassId.value) params.class_id = selectedClassId.value
    const res = await axios.get(`${API_BASE}/report-cards/students`, { params })
    students.value = res.data.data.students
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load students'
    students.value = []
  } finally {
    loadingStudents.value = false
  }
}

watch([selectedTermId, selectedClassId], () => {
  loadStudents()
})

const generateFull = async (studentId: number) => {
  if (!selectedTermId.value) return
  generatingId.value = studentId
  error.value = null
  try {
    await axios.post(`${API_BASE}/report-cards/${studentId}/${selectedTermId.value}/generate`)
    await loadStudents()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to generate report'
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

const saveHeadTeacherComment = async (comment: string) => {
  if (!activeReport.value || !selectedTermId.value) return
  try {
    await axios.put(`${API_BASE}/report-cards/${activeReport.value.student.id}/${selectedTermId.value}/head-teacher-comment`, { comment })
    activeReport.value.head_teacher_comment = comment
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to save comment'
  }
}

const printReport = () => {
  window.print()
}

const filenameFor = (report: ReportCardType) => sanitizeFilename(`${report.student.first_name}_${report.student.last_name}_${report.term.name}`) + '_ReportCard.pdf'

const downloadActivePdf = async () => {
  if (!reportCardRef.value?.rootEl || !activeReport.value) return
  downloading.value = true
  try {
    await downloadElementAsPdf(reportCardRef.value.rootEl, filenameFor(activeReport.value))
  } catch (err: any) {
    error.value = 'Failed to generate PDF'
  } finally {
    downloading.value = false
  }
}

const downloadSingle = async (student: ReportCardStudentEntry) => {
  if (!selectedTermId.value) return
  downloadingId.value = student.id
  error.value = null
  try {
    const res = await axios.get(`${API_BASE}/report-cards/${student.id}/${selectedTermId.value}`)
    const report: ReportCardType = res.data.data
    bulkReport.value = report
    await nextTick()
    await new Promise(r => setTimeout(r, 80))
    if (bulkCardRef.value?.rootEl) {
      await withLightMode(async () => {
        const canvas = await captureElement(bulkCardRef.value!.rootEl!)
        const pdf = buildPdfFromCanvases([canvas])
        pdf.save(filenameFor(report))
      })
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to prepare download'
  } finally {
    bulkReport.value = null
    downloadingId.value = null
  }
}

const downloadClassPdf = async () => {
  if (!selectedTermId.value) return
  const targets = students.value.filter(s => s.report_card_id)
  if (targets.length === 0) {
    error.value = 'No generated reports in this class yet'
    return
  }

  bulkDownloading.value = true
  bulkProgress.value = 0
  error.value = null

  try {
    const canvases: HTMLCanvasElement[] = []
    await withLightMode(async () => {
      for (const student of targets) {
        const res = await axios.get(`${API_BASE}/report-cards/${student.id}/${selectedTermId.value}`)
        bulkReport.value = res.data.data
        await nextTick()
        await new Promise(r => setTimeout(r, 80))
        if (bulkCardRef.value?.rootEl) {
          canvases.push(await captureElement(bulkCardRef.value.rootEl))
        }
        bulkProgress.value++
      }
    })

    if (canvases.length > 0) {
      const cls = classes.value.find(c => c.id === selectedClassId.value)
      const term = terms.value.find(t => t.id === selectedTermId.value)
      const name = sanitizeFilename(`${cls?.name || 'Class'}_${term?.name || 'Term'}_ReportCards`)
      const pdf = buildPdfFromCanvases(canvases)
      pdf.save(`${name}.pdf`)
    }
  } catch (err: any) {
    error.value = 'Failed to prepare class PDF'
  } finally {
    bulkReport.value = null
    bulkDownloading.value = false
    bulkProgress.value = 0
  }
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (detail.value) { detail.value = null; return }
    if (overview.value) { overview.value = null; return }
    if (activeReport.value) activeReport.value = null
  }
}

onMounted(async () => {
  window.addEventListener('keydown', handleEscape)
  await Promise.all([loadTerms(), loadClasses(), loadAcademicYears()])
  await loadStudents()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>
