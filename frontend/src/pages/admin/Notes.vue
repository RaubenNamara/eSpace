<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">eNotes</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Every eNotes topic authored by teachers across the school, for review and moderation.</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400">Total Topics</p>
          <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400">Draft</p>
          <p class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{{ stats.draft }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400">Published</p>
          <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ stats.published }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400">Archived</p>
          <p class="text-3xl font-bold text-gray-600 dark:text-gray-400">{{ stats.archived }}</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-100 dark:border-gray-700">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <input
              v-model="search"
              type="text"
              placeholder="Search by title, description, or teacher name..."
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              @input="debouncedSearch"
            >
          </div>
          <select
            v-model="statusFilter"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            @change="fetchTopics"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <select
            v-model="departmentFilter"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            @change="fetchTopics"
          >
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
          </select>
        </div>
      </div>

      <!-- Teacher Leaderboard -->
      <div v-if="teacherLeaderboard.length > 0" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 mb-6 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Topics by Teacher</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Who has published the most eNotes, and in which classes (reflects the filters above).</p>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Teacher</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Department</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Topics by Class</th>
                <th class="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-for="row in teacherLeaderboard" :key="row.teacherId">
                <td class="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ row.name }}</td>
                <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.department }}</td>
                <td class="px-6 py-3">
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="cls in row.classes"
                      :key="cls.name"
                      class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {{ cls.name }} &times; {{ cls.count }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-3 whitespace-nowrap text-right text-sm font-bold text-gray-900 dark:text-white">{{ row.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Topics -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
        <p class="mt-4 text-gray-500 dark:text-gray-400">Loading eNotes...</p>
      </div>

      <div v-else-if="topics.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        <svg class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
        <p class="text-gray-600 dark:text-gray-400">No topics match your filters</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="topic in topics"
          :key="topic.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-start justify-between mb-3 gap-2">
              <div class="flex items-center gap-2 min-w-0 cursor-pointer" @click="openViewer(topic)">
                <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </div>
                <h3 class="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">{{ topic.title }}</h3>
              </div>
              <span
                class="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 capitalize"
                :class="topic.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  topic.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'"
              >
                {{ topic.status }}
              </span>
            </div>

            <p v-if="topic.description" class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ topic.description }}</p>

            <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">
              By {{ topic.teacher_first_name ? `${topic.teacher_first_name} ${topic.teacher_last_name}` : 'Unknown teacher' }}
            </p>

            <div class="flex flex-wrap items-center gap-2 mb-4">
              <span v-if="topic.subject_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                {{ topic.subject_name }}
              </span>
              <span v-if="topic.department_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {{ topic.department_name }}
              </span>
              <span v-if="topic.class_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                {{ topic.class_name }}{{ topic.class_stream_name ? ' - ' + topic.class_stream_name : '' }}
              </span>
              <span class="ml-auto text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{{ topic.total_pages }} page{{ topic.total_pages === 1 ? '' : 's' }}</span>
            </div>

            <div class="flex items-center justify-between gap-2">
              <select
                :value="topic.status"
                @change="changeStatus(topic, ($event.target as HTMLSelectElement).value)"
                class="text-xs px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
              <div class="flex items-center gap-1">
                <button
                  @click="openViewer(topic)"
                  class="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                  title="View content"
                >
                  <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
                <button
                  @click="deleteTopic(topic)"
                  class="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                  title="Delete"
                >
                  <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Viewer -->
    <TopicViewer
      v-if="viewingTopic"
      :topic="(viewingTopic as any)"
      :all-topics="(topics as any)"
      @close="viewingTopic = null"
      @next-topic="goToAdjacentTopic(1)"
      @previous-topic="goToAdjacentTopic(-1)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { apiService } from '../../services/api'
import TopicViewer from '../../components/student/TopicViewer.vue'
import type { ENoteTopic } from '../../types/enotes'

interface Department {
  id: number
  name: string
}

const topics = ref<ENoteTopic[]>([])
const departments = ref<Department[]>([])
const stats = ref({ total: 0, draft: 0, published: 0, archived: 0 })
const loading = ref(false)
const search = ref('')
const statusFilter = ref('')
const departmentFilter = ref('')
const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const viewingTopic = ref<ENoteTopic | null>(null)

// Who has published the most eNotes, broken down by class - answers "which teacher has put up
// more topics, and in which class" directly from whatever's currently loaded (respects filters).
const teacherLeaderboard = computed(() => {
  const byTeacher = new Map<number, { teacherId: number; name: string; department: string; total: number; classes: Map<string, number> }>()

  for (const topic of topics.value) {
    const teacherId = topic.teacher_id
    if (!byTeacher.has(teacherId)) {
      byTeacher.set(teacherId, {
        teacherId,
        name: topic.teacher_first_name ? `${topic.teacher_first_name} ${topic.teacher_last_name}` : 'Unknown teacher',
        department: topic.department_name || '—',
        total: 0,
        classes: new Map()
      })
    }

    const entry = byTeacher.get(teacherId)!
    entry.total++

    const className = topic.class_name
      ? `${topic.class_name}${topic.class_stream_name ? '-' + topic.class_stream_name : ''}`
      : 'Unassigned'
    entry.classes.set(className, (entry.classes.get(className) || 0) + 1)
  }

  return Array.from(byTeacher.values())
    .map(entry => ({
      ...entry,
      classes: Array.from(entry.classes.entries()).map(([name, count]) => ({ name, count }))
    }))
    .sort((a, b) => b.total - a.total)
})

const fetchDepartments = async () => {
  try {
    const response = await apiService.get('/admin/departments')
    if (response.data.success) {
      departments.value = response.data.data || []
    }
  } catch (error) {
    console.error('Failed to fetch departments:', error)
  }
}

const fetchTopics = async () => {
  loading.value = true
  try {
    const params: any = {}
    if (search.value) params.search = search.value
    if (statusFilter.value) params.status = statusFilter.value
    if (departmentFilter.value) params.department_id = departmentFilter.value

    const response = await apiService.get('/admin/enotes', params)

    if (response.data.success) {
      topics.value = response.data.data.topics || []
      stats.value = response.data.data.stats
    }
  } catch (error) {
    console.error('Failed to fetch eNotes topics:', error)
  } finally {
    loading.value = false
  }
}

const debouncedSearch = () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value)
  searchTimeout.value = setTimeout(() => {
    fetchTopics()
  }, 500)
}

const changeStatus = async (topic: ENoteTopic, status: string) => {
  try {
    await apiService.put(`/admin/enotes/${topic.id}`, { status })
    await fetchTopics()
  } catch (error: any) {
    console.error('Failed to update topic status:', error)
    alert(error.response?.data?.message || 'Failed to update topic status')
  }
}

const fetchTopicDetail = async (id: number): Promise<ENoteTopic | null> => {
  try {
    const response = await apiService.get(`/admin/enotes/${id}`)
    return response.data.success ? response.data.data : null
  } catch (error) {
    console.error('Failed to fetch topic detail:', error)
    return null
  }
}

const openViewer = async (topic: ENoteTopic) => {
  viewingTopic.value = await fetchTopicDetail(topic.id)
}

const goToAdjacentTopic = async (direction: 1 | -1) => {
  if (!viewingTopic.value) return
  const currentIndex = topics.value.findIndex(t => t.id === viewingTopic.value!.id)
  const nextIndex = currentIndex + direction
  if (nextIndex < 0 || nextIndex >= topics.value.length) return
  viewingTopic.value = await fetchTopicDetail(topics.value[nextIndex].id)
}

const deleteTopic = async (topic: ENoteTopic) => {
  if (!confirm(`Are you sure you want to delete "${topic.title}"? This action cannot be undone.`)) return

  try {
    await apiService.delete(`/admin/enotes/${topic.id}`)
    await fetchTopics()
  } catch (error: any) {
    console.error('Failed to delete topic:', error)
    alert(error.response?.data?.message || 'Failed to delete topic')
  }
}

onMounted(() => {
  fetchDepartments()
  fetchTopics()
})
</script>
