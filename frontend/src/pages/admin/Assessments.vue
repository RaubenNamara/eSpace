<template>
  <div>
    <div class="flex items-center gap-4 mb-6">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm flex-shrink-0">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">Assessments</h1>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">School-wide assignment oversight</p>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-3 mb-6">
      <select v-model="statusFilter" @change="loadAssignments" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
        <option value="">All Status</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>

      <select v-model="departmentFilter" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
        <option value="">All Departments</option>
        <option v-for="dept in departmentOptions" :key="dept" :value="dept">{{ dept }}</option>
      </select>
    </div>

    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading assessments...</p>
    </div>

    <div v-else-if="filteredAssignments.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <p class="text-gray-500 dark:text-gray-400">{{ assignments.length === 0 ? 'No assessments found' : 'No assessments match this filter' }}</p>
    </div>

    <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-900/40">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assignment</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Teacher</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject / Class</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Submissions</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="a in filteredAssignments" :key="a.id" class="hover:bg-gray-50 dark:hover:bg-gray-900/30">
            <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">{{ a.title }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ a.teacher_name }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ a.department_name || 'N/A' }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
              {{ a.subject_name || 'N/A' }}<span v-if="a.class_name" class="text-gray-400 dark:text-gray-500"> · {{ a.class_name }}</span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{{ formatDate(a.due_date) }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ a.submissions_count }}</td>
            <td class="px-6 py-4">
              <span class="px-2 py-1 rounded-full text-xs font-medium" :class="statusBadge(a.status)">{{ capitalize(a.status) }}</span>
            </td>
            <td class="px-6 py-4 text-right">
              <RouterLink
                :to="`/admin/assessments/${a.id}/preview`"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-colors"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                Preview
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

interface AssignmentRow {
  id: number
  title: string
  status: string
  due_date: string
  total_marks: number
  category: string
  subject_name: string | null
  class_name: string | null
  department_name: string | null
  teacher_name: string
  submissions_count: number
}

const API_BASE = '/api/admin'

const assignments = ref<AssignmentRow[]>([])
const loading = ref(false)
const statusFilter = ref('')
const departmentFilter = ref('')

const departmentOptions = computed(() => {
  return Array.from(new Set(assignments.value.map(a => a.department_name).filter((d): d is string => !!d))).sort()
})

const filteredAssignments = computed(() => {
  if (!departmentFilter.value) return assignments.value
  return assignments.value.filter(a => a.department_name === departmentFilter.value)
})

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const statusBadge = (status: string) => {
  if (status === 'published') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  if (status === 'draft') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const loadAssignments = async () => {
  loading.value = true
  try {
    const params: Record<string, string> = {}
    if (statusFilter.value) params.status = statusFilter.value
    const response = await axios.get(`${API_BASE}/assignments`, { params })
    if (response.data.success) {
      assignments.value = response.data.data.assignments || []
    }
  } catch (error) {
    console.error('Failed to load assessments:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadAssignments()
})
</script>
