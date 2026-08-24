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

    <!-- Students table -->
    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
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
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import ReportCard from '@/components/reportcard/ReportCard.vue'
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

const generateSubject = async (studentId: number) => {
  if (!selectedTermId.value || !selectedSubjectId.value) return
  generatingId.value = studentId
  error.value = null
  try {
    await axios.post(`${API_BASE}/report-cards/${studentId}/${selectedTermId.value}/subjects/${selectedSubjectId.value}/generate`)
    await loadStudents()
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
})
</script>
