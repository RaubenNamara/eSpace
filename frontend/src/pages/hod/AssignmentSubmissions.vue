<template>
  <div>
    <div class="flex items-center gap-4 mb-6">
      <button
        @click="router.push('/hod/assessments')"
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
      >
        <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">Submissions</h1>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">Per-student status and department-wide statistics for this assignment</p>
      </div>
    </div>

    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading submissions...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
      <p class="text-red-800 dark:text-red-200">{{ error }}</p>
    </div>

    <div v-else>
      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">Students</p>
          <p class="text-xl font-bold text-gray-900 dark:text-white">{{ stats.total_students }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">Submitted</p>
          <p class="text-xl font-bold text-green-600 dark:text-green-400">{{ stats.submitted_count }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">Not Submitted</p>
          <p class="text-xl font-bold text-amber-600 dark:text-amber-400">{{ stats.not_submitted_count }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">Graded</p>
          <p class="text-xl font-bold text-indigo-600 dark:text-indigo-400">{{ stats.graded_count }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">Average</p>
          <p class="text-xl font-bold text-gray-900 dark:text-white">{{ stats.average_percentage !== null ? stats.average_percentage + '%' : '—' }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">Highest / Lowest</p>
          <p class="text-xl font-bold text-gray-900 dark:text-white">
            {{ stats.highest_percentage !== null ? stats.highest_percentage + '%' : '—' }} / {{ stats.lowest_percentage !== null ? stats.lowest_percentage + '%' : '—' }}
          </p>
        </div>
      </div>

      <div v-if="submissions.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <p class="text-gray-500 dark:text-gray-400">No students have started this assignment yet</p>
      </div>

      <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900/40">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admission No.</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Submitted</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="sub in submissions" :key="sub.id" class="hover:bg-gray-50 dark:hover:bg-gray-900/30">
              <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{{ sub.student_name }}</td>
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ sub.admission_number || 'N/A' }}</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 rounded-full text-xs font-medium" :class="statusBadge(sub.status)">{{ capitalize(sub.status.replace('_', ' ')) }}</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {{ sub.percentage !== null ? sub.percentage + '%' : '—' }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{{ formatDate(sub.submitted_at) }}</td>
              <td class="px-6 py-4 text-right">
                <RouterLink
                  :to="`/hod/assessments/${assignmentId}/submissions/${sub.id}`"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-colors"
                >
                  View
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

interface SubmissionRow {
  id: number
  student_id: number
  status: string
  total_score: number | null
  percentage: number | null
  submitted_at: string | null
  marked_at: string | null
  released_at: string | null
  student_name: string
  admission_number: string | null
}

interface Stats {
  total_students: number
  submitted_count: number
  not_submitted_count: number
  graded_count: number
  average_percentage: number | null
  highest_percentage: number | null
  lowest_percentage: number | null
}

const route = useRoute()
const router = useRouter()

const API_BASE = '/api/hod'
const assignmentId = computed(() => route.params.id as string)

const loading = ref(false)
const error = ref<string | null>(null)
const submissions = ref<SubmissionRow[]>([])
const stats = ref<Stats>({
  total_students: 0,
  submitted_count: 0,
  not_submitted_count: 0,
  graded_count: 0,
  average_percentage: null,
  highest_percentage: null,
  lowest_percentage: null
})

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const statusBadge = (status: string) => {
  if (status === 'graded' || status === 'returned') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  if (status === 'submitted' || status === 'marking') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Not started'
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const load = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(`${API_BASE}/assignments/${assignmentId.value}/submissions`)
    if (response.data.success) {
      submissions.value = response.data.data.submissions || []
      stats.value = response.data.data.stats
    } else {
      error.value = response.data.message || 'Failed to load submissions'
    }
  } catch (err: any) {
    console.error('Failed to load submissions:', err)
    error.value = err.response?.data?.message || 'Failed to load submissions'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
