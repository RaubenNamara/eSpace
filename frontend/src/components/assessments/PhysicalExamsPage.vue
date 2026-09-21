<template>
  <div>
    <div v-if="!activeExam">
      <div class="flex items-center gap-2 mb-1">
        <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap flex-shrink-0">Physical Exams</h1>

        <div class="flex flex-nowrap items-center gap-2 overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0 min-w-0">
          <select v-model="selectedTermId" class="flex-shrink-0 max-w-[92px] truncate px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
            <option :value="null">Terms</option>
            <option v-for="term in terms" :key="term.id" :value="term.id">
              {{ term.name }}{{ term.academic_year ? ` - ${term.academic_year}` : '' }}{{ term.is_current ? ' (Current)' : '' }}
            </option>
          </select>
          <select v-model="selectedClassId" class="flex-shrink-0 max-w-[92px] truncate px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
            <option :value="null">Class</option>
            <option v-for="cls in classes" :key="cls.id" :value="cls.id">
              {{ cls.name }}{{ cls.stream_name ? ` - ${cls.stream_name}` : '' }}
            </option>
          </select>
          <select v-model="selectedSubjectId" class="flex-shrink-0 max-w-[92px] truncate px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
            <option :value="null">Subject</option>
            <option v-for="subj in subjects" :key="subj.id" :value="subj.id">{{ subj.name }}</option>
          </select>
          <button
            v-if="canQuery"
            @click="showCreateForm = true"
            class="flex-shrink-0 px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 whitespace-nowrap"
          >
            + New Exam
          </button>
        </div>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Record marks for exams/tests students sat on paper, and control whether each one counts on report cards.
      </p>

      <div v-if="showCreateForm" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <h2 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">New Physical Exam</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <div>
            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Title</label>
            <input v-model="createForm.title" type="text" placeholder="e.g. Mid-Term CAT 1" class="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
          </div>
          <div>
            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Max Score</label>
            <input v-model.number="createForm.max_score" type="number" min="1" step="0.5" class="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
          </div>
          <div>
            <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Exam Date</label>
            <input v-model="createForm.exam_date" type="date" class="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
          </div>
        </div>
        <label class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 mb-3">
          <input v-model="createForm.include_on_report" type="checkbox" class="rounded border-gray-300 dark:border-gray-600">
          Show on report cards
        </label>
        <div class="flex items-center gap-2">
          <button @click="submitCreate" :disabled="creating" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
            {{ creating ? 'Creating...' : 'Create' }}
          </button>
          <button @click="showCreateForm = false" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            Cancel
          </button>
        </div>
      </div>

      <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-red-600 dark:text-red-400 text-sm">
        {{ error }}
      </div>

      <div v-if="loading" class="flex items-center justify-center py-16">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else-if="!canQuery" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center text-gray-500 dark:text-gray-400">
        Select a term, class/stream and subject to view physical exams.
      </div>

      <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700">
              <th class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Title</th>
              <th class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Date</th>
              <th class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Max Score</th>
              <th class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">On Report</th>
              <th class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exam in exams" :key="exam.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/40">
              <td class="border border-gray-200 dark:border-gray-600 px-3 py-2 font-medium text-gray-900 dark:text-white">{{ exam.title }}</td>
              <td class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center text-gray-700 dark:text-gray-300 whitespace-nowrap">{{ formatDate(exam.exam_date) }}</td>
              <td class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center text-gray-700 dark:text-gray-300">{{ exam.max_score }}</td>
              <td class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center">
                <label class="inline-flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" :checked="exam.include_on_report" @change="toggleIncludeOnReport(exam)" class="rounded border-gray-300 dark:border-gray-600">
                </label>
              </td>
              <td class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center whitespace-nowrap">
                <button @click="openMarksheet(exam)" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline mr-3">Enter Marks</button>
                <button @click="removeExam(exam)" class="text-xs font-medium text-red-600 dark:text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
            <tr v-if="exams.length === 0">
              <td colspan="5" class="border border-gray-200 dark:border-gray-600 px-3 py-8 text-center text-gray-400">
                No physical exams recorded for this selection yet.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Marksheet entry -->
    <div v-else>
      <div class="flex items-center gap-2 mb-1">
        <button @click="closeMarksheet" class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex-shrink-0">&larr; Back</button>
        <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight truncate">{{ activeExam.title }}</h1>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">
        {{ activeExam.subject_name }} &middot; {{ activeExam.class_name }}{{ activeExam.stream_name ? ' - ' + activeExam.stream_name : '' }} &middot; Out of {{ activeExam.max_score }}
      </p>

      <div v-if="marksheetLoading" class="flex items-center justify-center py-16">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700">
              <th class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Student</th>
              <th class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Score (/{{ activeExam.max_score }})</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in marksheetStudents" :key="student.student_id" class="hover:bg-gray-50 dark:hover:bg-gray-700/40">
              <td class="border border-gray-200 dark:border-gray-600 px-3 py-2">
                <p class="font-medium text-gray-900 dark:text-white">{{ student.first_name }} {{ student.last_name }}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500">{{ student.admission_number }}</p>
              </td>
              <td class="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center">
                <input
                  v-model.number="student.score"
                  type="number" min="0" :max="activeExam.max_score" step="0.5"
                  class="w-24 px-2 py-1 text-sm text-center border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                >
              </td>
            </tr>
            <tr v-if="marksheetStudents.length === 0">
              <td colspan="2" class="border border-gray-200 dark:border-gray-600 px-3 py-8 text-center text-gray-400">
                No students found in this class.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4">
        <button @click="saveMarksheet" :disabled="savingMarks" class="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
          {{ savingMarks ? 'Saving...' : 'Save Marks' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import type { PhysicalExam, PhysicalExamMarksheetStudent } from '@/types/physicalExam'

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
const toast = useToastStore()
const roleBase = () => (authStore.userRole === 'teacher' ? 'teacher' : authStore.userRole === 'hod' ? 'hod' : 'admin')

const terms = ref<Term[]>([])
const classes = ref<ClassOption[]>([])
const subjects = ref<SubjectOption[]>([])

const selectedTermId = ref<number | null>(null)
const selectedClassId = ref<number | null>(null)
const selectedSubjectId = ref<number | null>(null)

const canQuery = computed(() => !!(selectedTermId.value && selectedClassId.value && selectedSubjectId.value))

const exams = ref<PhysicalExam[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const showCreateForm = ref(false)
const creating = ref(false)
const createForm = ref({ title: '', max_score: 100, exam_date: '', include_on_report: true })

const activeExam = ref<PhysicalExam | null>(null)
const marksheetStudents = ref<PhysicalExamMarksheetStudent[]>([])
const marksheetLoading = ref(false)
const savingMarks = ref(false)

const formatDate = (d: string) => new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })

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

const loadExams = async () => {
  if (!canQuery.value) {
    exams.value = []
    return
  }
  loading.value = true
  error.value = null
  try {
    const res = await axios.get(`/api/${roleBase()}/physical-exams`, {
      params: { class_id: selectedClassId.value, subject_id: selectedSubjectId.value, term_id: selectedTermId.value },
    })
    exams.value = res.data.data.exams
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load physical exams'
    exams.value = []
  } finally {
    loading.value = false
  }
}

const submitCreate = async () => {
  if (!createForm.value.title.trim() || !createForm.value.max_score || !createForm.value.exam_date) {
    toast.error('Title, max score and exam date are all required')
    return
  }
  creating.value = true
  try {
    await axios.post(`/api/${roleBase()}/physical-exams`, {
      ...createForm.value,
      class_id: selectedClassId.value,
      subject_id: selectedSubjectId.value,
      term_id: selectedTermId.value,
    })
    toast.success('Physical exam created')
    showCreateForm.value = false
    createForm.value = { title: '', max_score: 100, exam_date: '', include_on_report: true }
    await loadExams()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to create physical exam')
  } finally {
    creating.value = false
  }
}

const toggleIncludeOnReport = async (exam: PhysicalExam) => {
  const next = !exam.include_on_report
  try {
    await axios.put(`/api/${roleBase()}/physical-exams/${exam.id}`, { include_on_report: next })
    exam.include_on_report = next
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to update exam')
  }
}

const removeExam = async (exam: PhysicalExam) => {
  if (!confirm(`Delete "${exam.title}"? This removes its marks and drops it from any report card.`)) return
  try {
    await axios.delete(`/api/${roleBase()}/physical-exams/${exam.id}`)
    toast.success('Physical exam deleted')
    await loadExams()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to delete exam')
  }
}

const openMarksheet = async (exam: PhysicalExam) => {
  activeExam.value = exam
  marksheetLoading.value = true
  try {
    const res = await axios.get(`/api/${roleBase()}/physical-exams/${exam.id}/marksheet`)
    marksheetStudents.value = res.data.data.students
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to load marksheet')
    activeExam.value = null
  } finally {
    marksheetLoading.value = false
  }
}

const closeMarksheet = () => {
  activeExam.value = null
  marksheetStudents.value = []
}

const saveMarksheet = async () => {
  if (!activeExam.value) return
  savingMarks.value = true
  try {
    await axios.put(`/api/${roleBase()}/physical-exams/${activeExam.value.id}/marksheet`, {
      scores: marksheetStudents.value.map(s => ({ student_id: s.student_id, score: s.score })),
    })
    toast.success('Marks saved')
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to save marks')
  } finally {
    savingMarks.value = false
  }
}

watch([selectedClassId, selectedSubjectId, selectedTermId], loadExams)

onMounted(async () => {
  await Promise.all([loadTerms(), loadClasses(), loadSubjects()])
})
</script>
