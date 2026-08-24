<template>
  <div class="p-6">
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-indigo-500/20 p-4 sm:p-5 mb-6">
      <div class="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10"></div>
      <div class="absolute -right-3 bottom-0 w-24 h-24 rounded-full bg-white/10"></div>
      <div class="relative flex items-center gap-3">
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-sm flex-shrink-0 ring-2 ring-white/20">
          <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>
        <div class="min-w-0">
          <h1 class="text-lg sm:text-2xl font-bold text-white leading-tight">Assignments</h1>
          <p class="text-xs sm:text-sm text-indigo-100">View and complete your assigned assignments</p>
        </div>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Total</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
          </div>
          <div class="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">New</p>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ stats.new }}</p>
          </div>
          <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
            <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ stats.in_progress }}</p>
          </div>
          <div class="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Submitted</p>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.submitted }}</p>
          </div>
          <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-64">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search assignments..."
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          >
        </div>
        <select
          v-model="statusFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="in_progress">In Progress</option>
          <option value="submitted">Submitted</option>
          <option value="marked">Marked</option>
          <option value="late">Late</option>
          <option value="overdue">Overdue</option>
        </select>
        <select
          v-model="subjectFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Subjects</option>
          <option v-for="subject in availableSubjects" :key="subject.id" :value="subject.id">
            {{ subject.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-800 dark:text-red-200">{{ error }}</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredAssignments.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
      </svg>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No assignments found</h3>
      <p class="text-gray-600 dark:text-gray-400">Check back later for new assignments</p>
    </div>

    <!-- Assignments List -->
    <div v-else class="space-y-4">
      <div
        v-for="assignment in filteredAssignments"
        :key="assignment.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ assignment.title }}</h3>
              <span :class="getStatusClass(assignment.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                {{ formatStatus(assignment.status) }}
              </span>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div>
                <span class="font-medium">Subject:</span> {{ assignment.subject_name }}
              </div>
              <div>
                <span class="font-medium">Teacher:</span> {{ assignment.teacher_name }}
              </div>
              <div>
                <span class="font-medium">Opens:</span> {{ assignment.open_at ? formatDate(assignment.open_at) : 'N/A' }}
              </div>
              <div>
                <span class="font-medium">Deadline:</span> {{ assignment.due_date ? formatDate(assignment.due_date) : 'N/A' }}
              </div>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {{ assignment.instructions }}
            </p>

            <div class="flex items-center space-x-4 text-sm">
              <span class="text-gray-600 dark:text-gray-400">
                <span class="font-medium">Total Marks:</span> {{ assignment.total_marks }}
              </span>
              <span v-if="assignment.submission" class="text-gray-600 dark:text-gray-400">
                <span class="font-medium">Score:</span> {{ assignment.submission.total_score }}/{{ assignment.total_marks }}
              </span>
            </div>
          </div>

          <div class="flex flex-col space-y-2 ml-4">
            <button
              v-if="assignment.status === 'new' || assignment.status === 'in_progress'"
              @click="startAssignment(assignment)"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              {{ assignment.status === 'new' ? 'Start Assignment' : 'Continue' }}
            </button>
            <button
              v-if="assignment.status === 'submitted' || assignment.status === 'marked'"
              @click="viewSubmission(assignment)"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
            >
              View Submission
            </button>
            <button
              v-if="assignment.status === 'marked'"
              @click="viewResult(assignment)"
              class="px-4 py-2 border border-green-600 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-sm"
            >
              View Result
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiService } from '../../services/api'

interface StudentAssignment {
  id: number
  title: string
  instructions: string
  subject_id: number
  subject_name: string
  teacher_name: string
  open_at: string
  due_date: string
  total_marks: number
  status: 'new' | 'in_progress' | 'submitted' | 'marked' | 'late' | 'overdue'
  submission?: {
    id: number
    total_score: number
    percentage: number
  }
}

interface FilterOption {
  id: number
  name: string
}

const router = useRouter()

const assignments = ref<StudentAssignment[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const searchQuery = ref('')
const statusFilter = ref('')
const subjectFilter = ref('')

const availableSubjects = ref<FilterOption[]>([])

const stats = ref({
  total: 0,
  new: 0,
  in_progress: 0,
  submitted: 0,
  marked: 0,
  late: 0,
  overdue: 0
})

const filteredAssignments = computed(() => {
  return assignments.value.filter(assignment => {
    const matchesSearch = !searchQuery.value || 
      assignment.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !statusFilter.value || assignment.status === statusFilter.value
    const matchesSubject = !subjectFilter.value || assignment.subject_id === Number(subjectFilter.value)
    return matchesSearch && matchesStatus && matchesSubject
  })
})

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    new: 'New',
    in_progress: 'In Progress',
    submitted: 'Submitted',
    marked: 'Marked',
    late: 'Late',
    overdue: 'Overdue'
  }
  return statusMap[status] || status
}

const getStatusClass = (status: string) => {
  const classMap: Record<string, string> = {
    new: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    in_progress: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    submitted: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    marked: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    late: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
    overdue: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
  }
  return classMap[status] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
}

const calculateStats = () => {
  stats.value = {
    total: assignments.value.length,
    new: assignments.value.filter(a => a.status === 'new').length,
    in_progress: assignments.value.filter(a => a.status === 'in_progress').length,
    submitted: assignments.value.filter(a => a.status === 'submitted').length,
    marked: assignments.value.filter(a => a.status === 'marked').length,
    late: assignments.value.filter(a => a.status === 'late').length,
    overdue: assignments.value.filter(a => a.status === 'overdue').length
  }
}

const extractFilters = () => {
  const subjects = new Map<number, FilterOption>()
  
  assignments.value.forEach(assignment => {
    if (assignment.subject_id && assignment.subject_name) {
      subjects.set(assignment.subject_id, { id: assignment.subject_id, name: assignment.subject_name })
    }
  })
  
  availableSubjects.value = Array.from(subjects.values())
}

const loadAssignments = async () => {
  console.log('loadAssignments called')
  loading.value = true
  error.value = null
  
  try {
    console.log('Making API call to /student/assignments')
    const response = await apiService.get('/student/assignments')
    console.log('API response:', response)
    console.log('Response data:', response.data)
    console.log('Response data success:', response.data.success)
    if (response.data.success) {
      console.log('Assignments data:', response.data.data)
      assignments.value = response.data.data
      calculateStats()
      extractFilters()
    } else {
      console.log('API response not successful. Full response:', response.data)
      error.value = response.data.message || 'Failed to load assignments'
    }
  } catch (err: any) {
    console.error('Error loading assignments:', err)
    error.value = err.response?.data?.message || 'Failed to load assignments'
  } finally {
    loading.value = false
  }
}

const startAssignment = (assignment: StudentAssignment) => {
  router.push(`/student/assignments/${assignment.id}/answer`)
}

const viewSubmission = (assignment: StudentAssignment) => {
  if (assignment.submission) {
    router.push(`/student/assignments/${assignment.id}/submission/${assignment.submission.id}`)
  }
}

const viewResult = (assignment: StudentAssignment) => {
  if (assignment.submission) {
    router.push(`/student/assignments/${assignment.id}/result/${assignment.submission.id}`)
  }
}

onMounted(() => {
  loadAssignments()
})
</script>

