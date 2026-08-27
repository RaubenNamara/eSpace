<template>
  <div>
    <div class="flex items-center gap-4 mb-6">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm flex-shrink-0">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s4.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      </div>
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">eNotes</h1>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">eNotes authored by teachers in your department</p>
      </div>
    </div>

    <div class="flex flex-wrap gap-3 mb-6">
      <select v-model="teacherFilter" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
        <option value="">All Teachers</option>
        <option v-for="t in teachers" :key="t.id" :value="t.id">{{ t.first_name }} {{ t.last_name }}</option>
      </select>
      <select v-model="statusFilter" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
        <option value="">All Status</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>
    </div>

    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading eNotes...</p>
    </div>

    <div v-else-if="filteredTopics.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <p class="text-gray-500 dark:text-gray-400">{{ topics.length === 0 ? 'No eNotes in your department yet' : 'No eNotes match this filter' }}</p>
    </div>

    <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-900/40">
          <tr>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

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
const statusFilter = ref('')
const teacherFilter = ref<number | ''>('')

const filteredTopics = computed(() => {
  return topics.value.filter(t => {
    if (statusFilter.value && t.status !== statusFilter.value) return false
    if (teacherFilter.value && t.teacher_id !== teacherFilter.value) return false
    return true
  })
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
