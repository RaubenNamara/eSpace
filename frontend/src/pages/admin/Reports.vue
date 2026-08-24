<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Report Cards</h1>
      <p class="text-gray-600 dark:text-gray-400">View, generate and download learners' summative assessment reports.</p>
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
import { captureElement, buildPdfFromCanvases, downloadElementAsPdf, sanitizeFilename, withLightMode } from '@/utils/reportCardPdf'
import type { ReportCard as ReportCardType, ReportCardStudentEntry } from '@/types/reportCard'

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

const API_BASE = '/api/admin'

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
  if (e.key === 'Escape' && activeReport.value) {
    activeReport.value = null
  }
}

onMounted(async () => {
  window.addEventListener('keydown', handleEscape)
  await Promise.all([loadTerms(), loadClasses()])
  await loadStudents()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>
