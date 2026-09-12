<template>
  <div>
    <!-- Header - icon and title share a row with the filters, so the dropdowns line up exactly
         with the heading; the subtitle drops to its own full-width line underneath. -->
    <div class="flex items-center justify-between gap-2 mb-1">
      <div class="flex items-center gap-2 flex-shrink-0">
        <div class="hidden sm:flex w-7 h-7 rounded-lg bg-indigo-600 items-center justify-center flex-shrink-0">
          <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s4.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap">eNotes</h1>
      </div>

      <div class="flex flex-nowrap gap-2 overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0 min-w-0">
        <select v-model="teacherFilter" class="flex-shrink-0 max-w-[92px] truncate px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
          <option value="">Teachers</option>
          <option v-for="t in teachers" :key="t.id" :value="t.id">{{ t.first_name }} {{ t.last_name }}</option>
        </select>
        <select v-model="statusFilter" class="flex-shrink-0 max-w-[92px] truncate px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
          <option value="">Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">eNotes authored by teachers in your department</p>

    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading eNotes...</p>
    </div>

    <div v-else-if="filteredTopics.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <p class="text-gray-500 dark:text-gray-400 mb-3">{{ topics.length === 0 ? 'No eNotes in your department yet' : 'No eNotes match this filter' }}</p>
      <button v-if="topics.length > 0" @click="clearFilters" class="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
        Clear filters
      </button>
    </div>

    <template v-else>
      <BulkActionBar :count="bulk.selectedCount.value" @clear="bulk.clear()">
        <button @click="bulkExport" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Export CSV</button>
      </BulkActionBar>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-950/40">
          <tr>
            <th class="px-4 py-3 text-left">
              <input
                type="checkbox"
                :checked="bulk.allSelected(visibleIds)"
                @change="bulk.toggleAll(visibleIds)"
                class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
              >
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Topic</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Teacher</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject / Class</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Updated</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="topic in filteredTopics" :key="topic.id" class="hover:bg-gray-50 dark:hover:bg-gray-900/30">
            <td class="px-4 py-4">
              <input
                type="checkbox"
                :checked="bulk.isSelected(topic.id)"
                @change="bulk.toggle(topic.id)"
                class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
              >
            </td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">{{ topic.title }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ topic.teacher_name }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
              {{ topic.subject_name || 'N/A' }}<span v-if="topic.class_name" class="text-gray-400 dark:text-gray-500"> &middot; {{ topic.class_name }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="px-2 py-1 rounded-full text-xs font-medium" :class="statusBadge(topic.status)">{{ capitalize(topic.status) }}</span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{{ formatDate(topic.updated_at) }}</td>
            <td class="px-6 py-4 text-right">
              <RouterLink
                :to="`/hod/enotes/${topic.id}`"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-colors"
              >
                View
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import BulkActionBar from '@/components/common/BulkActionBar.vue'
import { useToastStore } from '@/stores/toast'
import { useBulkSelection } from '@/composables/useBulkSelection'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { downloadBlob } from '@/utils/downloadBlob'

const toast = useToastStore()
const bulk = useBulkSelection<number>()

interface TopicRow {
  id: number
  title: string
  status: string
  updated_at: string
  subject_name: string | null
  class_name: string | null
  teacher_name: string
  teacher_id: number
}

interface TeacherOption {
  id: number
  first_name: string
  last_name: string
}

const API_BASE = '/api/hod'

const topics = ref<TopicRow[]>([])
const teachers = ref<TeacherOption[]>([])
const loading = ref(false)
const statusFilter = usePersistedRef('hod-enotes-status-filter', '')
const teacherFilter = usePersistedRef<number | ''>('hod-enotes-teacher-filter', '')

const filteredTopics = computed(() => {
  return topics.value.filter(t => {
    if (statusFilter.value && t.status !== statusFilter.value) return false
    if (teacherFilter.value && t.teacher_id !== teacherFilter.value) return false
    return true
  })
})

const visibleIds = computed(() => filteredTopics.value.map(t => t.id))

const bulkExport = async () => {
  const ids = bulk.selectedArray()
  try {
    const response = await axios.post(`${API_BASE}/enotes/bulk-export`, { ids }, { responseType: 'blob' })
    downloadBlob(response.data, 'enotes.csv')
  } catch (error) {
    toast.error('Failed to export eNotes')
  }
}

const clearFilters = () => {
  statusFilter.value = ''
  teacherFilter.value = ''
}

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

const loadTopics = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_BASE}/enotes`)
    if (response.data.success) {
      topics.value = response.data.data.topics || []
      teachers.value = response.data.data.teachers || []
    }
  } catch (error) {
    console.error('Failed to load eNotes:', error)
  } finally {
    loading.value = false
  }
}

onMounted(loadTopics)
</script>
