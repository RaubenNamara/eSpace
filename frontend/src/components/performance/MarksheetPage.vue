<template>
  <div class="p-4 sm:p-6">
    <div class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">Performance & Marksheets</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">View student performance and download assignment marksheets by class/stream.</p>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div class="flex flex-wrap items-end gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Term</label>
          <select v-model="selectedTermId" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[180px]">
            <option :value="null">All terms</option>
            <option v-for="term in terms" :key="term.id" :value="term.id">
              {{ term.name }}{{ term.academic_year ? ` - ${term.academic_year}` : '' }}{{ term.is_current ? ' (Current)' : '' }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Class / Stream</label>
          <select v-model="selectedClassId" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[180px]">
            <option :value="null">Select class...</option>
            <option v-for="cls in classes" :key="cls.id" :value="cls.id">
              {{ cls.name }}{{ cls.stream_name ? ` - ${cls.stream_name}` : '' }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Subject</label>
          <select v-model="selectedSubjectId" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[180px]">
            <option :value="null">Select subject...</option>
            <option v-for="subj in subjects" :key="subj.id" :value="subj.id">{{ subj.name }}</option>
          </select>
        </div>
        <button
          v-if="selectedClassId && selectedSubjectId"
          @click="downloadCsv"
          class="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          Download CSV
        </button>
      </div>
    </div>

    <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-red-600 dark:text-red-400 text-sm">
      {{ error }}
    </div>

    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="!selectedClassId || !selectedSubjectId" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center text-gray-500 dark:text-gray-400">
      Select a class/stream and subject to view the marksheet.
    </div>

    <div v-else-if="marksheet" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700">
              <th class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap sticky left-0 bg-gray-50 dark:bg-gray-700">Student</th>
              <th
                v-for="a in marksheet.assignments"
                :key="a.id"
                class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap"
              >
                {{ a.title }}<br><span class="font-normal normal-case">/{{ a.total_marks }}</span>
              </th>
              <th class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Average</th>
              <th class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Grade</th>
              <th class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in marksheet.rows" :key="row.student_id" class="hover:bg-gray-50 dark:hover:bg-gray-700/40">
              <td class="border border-gray-200 dark:border-gray-600 px-3 py-2 whitespace-nowrap sticky left-0 bg-white dark:bg-gray-800">
                <p class="font-medium text-gray-900 dark:text-white">{{ row.first_name }} {{ row.last_name }}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500">{{ row.admission_number }}</p>
              </td>
              <td v-for="cell in row.cells" :key="cell.assignment_id" class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                <template v-if="cell.score !== null">{{ cell.score }} <span class="text-xs text-gray-400">({{ cell.percentage }}%)</span></template>
                <template v-else>-</template>
              </td>
              <td class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center font-semibold text-gray-900 dark:text-white">
                {{ row.avg_percentage !== null ? row.avg_percentage + '%' : '-' }}
              </td>
              <td class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center">
                <span v-if="row.grade" class="inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-white text-xs" :class="gradeColor(row.grade)">{{ row.grade }}</span>
                <span v-else>-</span>
              </td>
              <td class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center">
                <button @click="viewStudent(row)" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline whitespace-nowrap">
                  View Performance
                </button>
              </td>
            </tr>
            <tr v-if="marksheet.rows.length === 0">
              <td :colspan="marksheet.assignments.length + 4" class="border border-gray-200 dark:border-gray-600 px-3 py-8 text-center text-gray-400">
                No students found in this class.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="marksheet.assignments.length === 0" class="text-center text-sm text-gray-400 dark:text-gray-500 py-4">
        No published assignments for this class/subject{{ selectedTermId ? ' in this term' : '' }} yet.
      </p>
    </div>

    <StudentPerformanceModal
      v-if="activeStudent"
      :student-id="activeStudent.student_id"
      :student-name="`${activeStudent.first_name} ${activeStudent.last_name}`"
      :term-id="selectedTermId"
      @close="activeStudent = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import StudentPerformanceModal from './StudentPerformanceModal.vue'
import type { Marksheet, MarksheetRow } from '@/types/performance'

interface Term {
  id: number
  name: string
  academic_year: string | null
  is_current: number | boolean
}

interface ClassOption {
  id: number
  name: string
  stream_name?: string | null
}

interface SubjectOption {
  id: number
  name: string
}

const authStore = useAuthStore()
const roleBase = () => (authStore.userRole === 'teacher' ? 'teacher' : authStore.userRole === 'hod' ? 'hod' : 'admin')

const terms = ref<Term[]>([])
const classes = ref<ClassOption[]>([])
const subjects = ref<SubjectOption[]>([])

const selectedTermId = ref<number | null>(null)
const selectedClassId = ref<number | null>(null)
const selectedSubjectId = ref<number | null>(null)

const marksheet = ref<Marksheet | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const activeStudent = ref<MarksheetRow | null>(null)

const gradeColor = (grade: string | null) => {
  const colors: Record<string, string> = {
    A: 'bg-emerald-600', B: 'bg-blue-600', C: 'bg-amber-500', D: 'bg-orange-500', E: 'bg-red-600', F: 'bg-red-600',
  }
  return grade ? colors[grade] || 'bg-gray-400' : 'bg-gray-300'
}

const loadTerms = async () => {
  const res = await axios.get(`/api/${roleBase()}/report-cards/terms`)
  terms.value = res.data.data.terms
  const current = terms.value.find(t => t.is_current)
  selectedTermId.value = current ? current.id : null
}

const loadClasses = async () => {
  const base = roleBase()
  const url = base === 'hod' ? '/api/hod/performance/classes' : `/api/${base}/classes`
  const res = await axios.get(url)
  classes.value = base === 'hod' ? res.data.data.classes : res.data.data
}

const loadSubjects = async () => {
  const base = roleBase()
  const url = base === 'admin' ? '/api/admin/subjects' : `/api/${base}/performance/subjects`
  const res = await axios.get(url)
  subjects.value = base === 'admin' ? res.data.data : res.data.data.subjects
}

const loadMarksheet = async () => {
  if (!selectedClassId.value || !selectedSubjectId.value) {
    marksheet.value = null
    return
  }
  loading.value = true
  error.value = null
  try {
    const params: Record<string, number> = { class_id: selectedClassId.value, subject_id: selectedSubjectId.value }
    if (selectedTermId.value) params.term_id = selectedTermId.value
    const res = await axios.get(`/api/${roleBase()}/performance/marksheet`, { params })
    marksheet.value = res.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load marksheet'
    marksheet.value = null
  } finally {
    loading.value = false
  }
}

const downloadCsv = () => {
  if (!selectedClassId.value || !selectedSubjectId.value) return
  const params = new URLSearchParams({
    class_id: String(selectedClassId.value),
    subject_id: String(selectedSubjectId.value),
  })
  if (selectedTermId.value) params.set('term_id', String(selectedTermId.value))
  window.location.href = `${import.meta.env.BASE_URL}api/${roleBase()}/performance/marksheet/download?${params.toString()}`
}

const viewStudent = (row: MarksheetRow) => {
  activeStudent.value = row
}

watch([selectedClassId, selectedSubjectId, selectedTermId], loadMarksheet)

onMounted(async () => {
  await Promise.all([loadTerms(), loadClasses(), loadSubjects()])
})
</script>
