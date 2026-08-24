<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Student Promotion</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Advance students from one class to the next while keeping their full enrollment history.</p>
      </div>

      <!-- Setup -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-100 dark:border-gray-700">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">From</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Academic Year</label>
                <select v-model="fromAcademicYearId" @change="onFromChange" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                  <option value="">Select Academic Year</option>
                  <option v-for="year in academicYears" :key="year.id" :value="year.id">{{ year.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Term</label>
                <select v-model="termId" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                  <option value="">No specific term</option>
                  <option v-for="term in filteredTerms" :key="term.id" :value="term.id">{{ term.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Class</label>
                <select v-model="fromClassId" @change="onFromChange" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                  <option value="">Select Class</option>
                  <option v-for="cls in sortedClasses" :key="cls.id" :value="cls.id">{{ cls.name }} {{ cls.stream_name }} ({{ cls.level }})</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">To</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Academic Year</label>
                <select v-model="toAcademicYearId" @change="resetPreview" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                  <option value="">Select Academic Year</option>
                  <option v-for="year in academicYears" :key="year.id" :value="year.id">{{ year.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Destination Class</label>
                <select v-model="toClassId" @change="resetPreview" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                  <option value="">Select Class</option>
                  <option v-for="cls in sortedClasses" :key="cls.id" :value="cls.id">{{ cls.name }} {{ cls.stream_name }} ({{ cls.level }})</option>
                </select>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Destination class/year must already exist - create it via Classes/Academic Years first if it doesn't.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Students in the from-class -->
      <div v-if="fromClassId && fromAcademicYearId" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 mb-6">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Students
              <span v-if="selectedStudentIds.length > 0" class="text-indigo-600 dark:text-indigo-400 font-semibold">({{ selectedStudentIds.length }} selected)</span>
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ students.length }} student(s) currently active in this class</p>
          </div>
        </div>

        <div v-if="loadingStudents" class="p-12 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
        </div>

        <div v-else-if="students.length === 0" class="p-12 text-center text-gray-500 dark:text-gray-400">
          No students with an active enrollment in this class/year.
        </div>

        <div v-else class="max-h-96 overflow-y-auto">
          <div class="p-2 space-y-1">
            <label class="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer border-b dark:border-gray-600">
              <input type="checkbox" :checked="allSelected" @change="toggleSelectAll" class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500">
              <span class="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Select All</span>
            </label>
            <label v-for="student in students" :key="student.id" class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer">
              <div class="flex items-center">
                <input type="checkbox" :value="student.id" v-model="selectedStudentIds" @change="resetPreview" class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500">
                <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">{{ student.first_name }} {{ student.last_name }} ({{ student.admission_number }})</span>
              </div>
              <span class="text-xs text-gray-400 dark:text-gray-500">{{ student.active_enrollment_count }} enrollment(s)</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div v-if="preview" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 mb-6 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <p class="text-sm text-green-700 dark:text-green-400">Eligible to promote</p>
            <p class="text-2xl font-bold text-green-800 dark:text-green-300">{{ preview.eligible.length }}</p>
          </div>
          <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <p class="text-sm text-yellow-700 dark:text-yellow-400">Already promoted</p>
            <p class="text-2xl font-bold text-yellow-800 dark:text-yellow-300">{{ preview.already_promoted.length }}</p>
          </div>
          <div class="bg-gray-50 dark:bg-gray-900/40 rounded-lg p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400">Nothing to move</p>
            <p class="text-2xl font-bold text-gray-700 dark:text-gray-300">{{ preview.nothing_to_move.length }}</p>
          </div>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          From <strong>{{ fromClassLabel }}</strong> to <strong>{{ toClassLabel }}</strong> —
          {{ preview.eligible.length }} student(s) will move, migrating roughly
          {{ preview.eligible.reduce((sum, e) => sum + e.enrollments_to_migrate, 0) }} department enrollment(s) in total.
        </p>
      </div>

      <!-- Result -->
      <div v-if="result" class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-green-800 dark:text-green-300 mb-1">Promotion complete</h3>
        <p class="text-sm text-green-700 dark:text-green-400">{{ result.message }}</p>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 mb-8">
        <button
          @click="runPreview"
          :disabled="!canPreview || previewing"
          class="px-6 py-3 border border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ previewing ? 'Checking...' : 'Preview Promotion' }}
        </button>
        <button
          @click="confirmPromotion"
          :disabled="!preview || preview.eligible.length === 0 || promoting"
          class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-medium shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ promoting ? 'Promoting...' : `Confirm Promotion (${preview?.eligible.length || 0})` }}
        </button>
      </div>

      <!-- History -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Promotion History</h3>
          <button @click="fetchHistory" class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">Refresh</button>
        </div>
        <div v-if="history.length === 0" class="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">No promotions recorded yet.</div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Student</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">From</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">To</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Enrollments</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Promoted By</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-for="row in history" :key="row.id">
                <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ row.first_name }} {{ row.last_name }} ({{ row.admission_number }})</td>
                <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.from_class_name }} {{ row.from_stream_name }} — {{ row.from_academic_year }}</td>
                <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.to_class_name }} {{ row.to_stream_name }} — {{ row.to_academic_year }}</td>
                <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.enrollments_migrated_count }}</td>
                <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.promoted_by_username || '—' }}</td>
                <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ formatDate(row.promoted_at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { apiService } from '../../services/api'

interface AcademicYear { id: number; name: string }
interface Term { id: number; name: string; academic_year_id: number }
interface ClassItem { id: number; name: string; level: string; stream_name?: string; academic_year_id: number }
interface Student { id: number; admission_number: string; first_name: string; last_name: string; active_enrollment_count: number }
interface PreviewResult {
  eligible: { student_id: number; enrollments_to_migrate: number }[]
  already_promoted: number[]
  nothing_to_move: number[]
}
interface PromotionResult {
  students_promoted: number
  enrollments_migrated: number
  message: string
}
interface HistoryRow {
  id: number
  first_name: string
  last_name: string
  admission_number: string
  from_class_name: string
  from_stream_name: string
  to_class_name: string
  to_stream_name: string
  from_academic_year: string
  to_academic_year: string
  enrollments_migrated_count: number
  promoted_by_username: string | null
  promoted_at: string
}

const academicYears = ref<AcademicYear[]>([])
const terms = ref<Term[]>([])
const classes = ref<ClassItem[]>([])
const students = ref<Student[]>([])
const history = ref<HistoryRow[]>([])

const fromAcademicYearId = ref<number | ''>('')
const toAcademicYearId = ref<number | ''>('')
const fromClassId = ref<number | ''>('')
const toClassId = ref<number | ''>('')
const termId = ref<number | ''>('')
const selectedStudentIds = ref<number[]>([])

const loadingStudents = ref(false)
const previewing = ref(false)
const promoting = ref(false)
const preview = ref<PreviewResult | null>(null)
const result = ref<PromotionResult | null>(null)

const sortedClasses = computed(() => {
  return [...classes.value].sort((a, b) => {
    const numA = parseInt(a.name.replace(/\D/g, ''), 10) || 0
    const numB = parseInt(b.name.replace(/\D/g, ''), 10) || 0
    if (numA !== numB) return numA - numB
    return (a.stream_name || '').localeCompare(b.stream_name || '')
  })
})

const filteredTerms = computed(() => {
  if (!fromAcademicYearId.value) return terms.value
  return terms.value.filter(t => t.academic_year_id === Number(fromAcademicYearId.value))
})

const allSelected = computed(() => students.value.length > 0 && selectedStudentIds.value.length === students.value.length)

const classLabel = (id: number | '', yearId: number | '') => {
  const cls = classes.value.find(c => c.id === Number(id))
  const year = academicYears.value.find(y => y.id === Number(yearId))
  if (!cls) return '—'
  return `${cls.name} ${cls.stream_name || ''} (${year?.name || ''})`.trim()
}
const fromClassLabel = computed(() => classLabel(fromClassId.value, fromAcademicYearId.value))
const toClassLabel = computed(() => classLabel(toClassId.value, toAcademicYearId.value))

const canPreview = computed(() => {
  return !!fromClassId.value && !!toClassId.value && !!fromAcademicYearId.value && !!toAcademicYearId.value && selectedStudentIds.value.length > 0
})

const formatDate = (value: string) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const fetchAcademicYears = async () => {
  const response = await apiService.get('/admin/academic-years')
  if (response.data.success) academicYears.value = response.data.data || []
}

const fetchTerms = async () => {
  const response = await apiService.get('/admin/terms')
  if (response.data.success) terms.value = response.data.data || []
}

const fetchClasses = async () => {
  const response = await apiService.get('/admin/classes')
  if (response.data.success) classes.value = response.data.data || []
}

const fetchHistory = async () => {
  const response = await apiService.get('/admin/promotion/history', { limit: 50 })
  if (response.data.success) history.value = response.data.data.promotions || []
}

const fetchStudents = async () => {
  if (!fromClassId.value || !fromAcademicYearId.value) {
    students.value = []
    return
  }
  loadingStudents.value = true
  try {
    const response = await apiService.get('/admin/promotion/students', {
      class_id: fromClassId.value,
      academic_year_id: fromAcademicYearId.value
    })
    if (response.data.success) {
      students.value = response.data.data.students || []
    }
  } catch (error) {
    console.error('Failed to fetch students:', error)
  } finally {
    loadingStudents.value = false
  }
}

const onFromChange = () => {
  selectedStudentIds.value = []
  resetPreview()
  fetchStudents()
}

const resetPreview = () => {
  preview.value = null
  result.value = null
}

const toggleSelectAll = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  selectedStudentIds.value = checked ? students.value.map(s => s.id) : []
  resetPreview()
}

const promotionPayload = () => ({
  from_class_id: fromClassId.value,
  to_class_id: toClassId.value,
  from_academic_year_id: fromAcademicYearId.value,
  to_academic_year_id: toAcademicYearId.value,
  term_id: termId.value || null,
  student_ids: selectedStudentIds.value
})

const runPreview = async () => {
  previewing.value = true
  result.value = null
  try {
    const response = await apiService.post('/admin/promotion/preview', promotionPayload())
    if (response.data.success) {
      preview.value = response.data.data
    } else {
      alert(response.data.message || 'Failed to preview promotion')
    }
  } catch (error: any) {
    alert(error.response?.data?.message || 'Failed to preview promotion')
  } finally {
    previewing.value = false
  }
}

const confirmPromotion = async () => {
  if (!preview.value || preview.value.eligible.length === 0) return
  if (!confirm(`Promote ${preview.value.eligible.length} student(s) from ${fromClassLabel.value} to ${toClassLabel.value}?`)) return

  promoting.value = true
  try {
    const response = await apiService.post('/admin/promotion/promote', promotionPayload())
    if (response.data.success) {
      result.value = { ...response.data.data, message: response.data.message }
      preview.value = null
      selectedStudentIds.value = []
      await fetchStudents()
      await fetchHistory()
    } else {
      alert(response.data.message || 'Failed to promote students')
    }
  } catch (error: any) {
    alert(error.response?.data?.message || 'Failed to promote students')
  } finally {
    promoting.value = false
  }
}

onMounted(async () => {
  await Promise.all([fetchAcademicYears(), fetchTerms(), fetchClasses(), fetchHistory()])
})
</script>
