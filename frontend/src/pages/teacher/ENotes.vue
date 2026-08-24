<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">eNotes</h1>
      <p class="text-gray-600 dark:text-gray-400">Create and manage interactive note topics for your classes</p>
    </div>

    <!-- Dashboard Stats -->
    <div v-if="stats" class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Total Topics</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
          </div>
          <div class="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Draft</p>
            <p class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{{ stats.draft }}</p>
          </div>
          <div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Published</p>
            <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ stats.published }}</p>
          </div>
          <div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Archived</p>
            <p class="text-3xl font-bold text-gray-600 dark:text-gray-400">{{ stats.archived }}</p>
          </div>
          <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <select
          v-model="statusFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        <select
          v-model="subjectFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          :disabled="!assignments?.subjects || assignments.subjects.length === 0"
        >
          <option value="">All Subjects</option>
          <option v-for="subject in assignments?.subjects" :key="subject.id" :value="subject.id">
            {{ subject.name }}
          </option>
        </select>

        <select
          v-model="classFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          :disabled="!assignments?.classes || assignments.classes.length === 0"
        >
          <option value="">All Classes</option>
          <option v-for="cls in assignments?.classes" :key="cls.id" :value="cls.id">
            {{ cls.name }} ({{ cls.level }}{{ cls.stream_name ? ' - ' + cls.stream_name : '' }})
          </option>
        </select>

        <select
          v-model="streamFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          :disabled="streamOptions.length === 0"
        >
          <option value="">All Streams</option>
          <option v-for="stream in streamOptions" :key="stream" :value="stream">
            {{ stream }}
          </option>
        </select>

        <div v-if="assignmentsError" class="text-red-600 dark:text-red-400 text-sm">
          {{ assignmentsError }}
        </div>
      </div>

      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Create Topic</span>
      </button>
    </div>

    <!-- Topics List -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading topics...</p>
    </div>

    <div v-else-if="topics.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p class="text-gray-600 dark:text-gray-400 mb-4">No topics found</p>
      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Create Your First Topic
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="topic in filteredTopics"
        :key="topic.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
        @click="openBuilder(topic.id)"
      >
        <div class="p-6">
          <div class="flex items-start justify-between mb-3">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex-1">{{ topic.title }}</h3>
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                topic.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                topic.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              ]"
            >
              {{ topic.status.charAt(0).toUpperCase() + topic.status.slice(1) }}
            </span>
          </div>

          <p v-if="topic.description" class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {{ topic.description }}
          </p>

          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
              {{ topic.subject_name || 'Unknown Subject' }}
            </span>
            <span v-if="topic.class_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {{ topic.class_name }}{{ topic.class_stream_name ? ' - ' + topic.class_stream_name : '' }}
            </span>
            <span class="ml-auto text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{{ topic.total_pages }} pages</span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500 dark:text-gray-500">
              Updated {{ formatDate(topic.updated_at) }}
            </span>
            <div class="flex items-center space-x-2">
              <button
                @click.stop="editTopic(topic)"
                class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Edit"
              >
                <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              <button
                @click.stop="deleteTopic(topic.id)"
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

    <!-- Create/Edit Topic Modal -->
    <div v-if="showTopicModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ editingTopic ? 'Edit Topic' : 'Create New Topic' }}
          </h3>
          <button
            @click="closeTopicModal"
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6">
          <form @submit.prevent="saveTopic">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Topic *</label>
              <input
                v-model="topicForm.title"
                type="text"
                required
                placeholder="Enter topic..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Competency</label>
              <textarea
                v-model="topicForm.description"
                rows="3"
                placeholder="Enter competency..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Learning Outcomes</label>
              <input
                v-model="learningOutcomeDraft"
                type="text"
                placeholder="Type an outcome and press Enter..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                @keydown.enter.prevent="addLearningOutcome"
              >
              <ol v-if="topicForm.learning_outcomes.length" class="mt-3 space-y-1.5">
                <li
                  v-for="(outcome, index) in topicForm.learning_outcomes"
                  :key="index"
                  class="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300"
                >
                  <span class="mt-0.5 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                    {{ index + 1 }}
                  </span>
                  <span class="flex-1 pt-px">{{ outcome }}</span>
                  <button
                    type="button"
                    @click="removeLearningOutcome(index)"
                    class="p-1 -m-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors flex-shrink-0"
                    title="Remove"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </li>
              </ol>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                <select
                  v-model="topicForm.subject_id"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  :disabled="!assignments?.subjects || assignments.subjects.length === 0"
                >
                  <option value="">Select Subject</option>
                  <option v-for="subject in assignments?.subjects" :key="subject.id" :value="subject.id">
                    {{ subject.name }}
                  </option>
                </select>
                <p v-if="!assignments?.subjects || assignments.subjects.length === 0" class="text-xs text-red-600 dark:text-red-400 mt-1">
                  No subjects available. Please ensure you are assigned to a department with subjects.
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Class *</label>
                <select
                  v-model="topicForm.class_id"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  :disabled="!assignments?.classes || assignments.classes.length === 0"
                >
                  <option value="">Select Class</option>
                  <option v-for="cls in assignments?.classes" :key="cls.id" :value="cls.id">
                    {{ cls.name }} ({{ cls.level }}{{ cls.stream_name ? ' - ' + cls.stream_name : '' }})
                  </option>
                </select>
                <p v-if="!assignments?.classes || assignments.classes.length === 0" class="text-xs text-red-600 dark:text-red-400 mt-1">
                  No classes available. Please ensure you are assigned to a department with classes.
                </p>
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select
                v-model="topicForm.status"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="closeTopicModal"
                class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? 'Saving...' : (editingTopic ? 'Update Topic' : 'Create Topic') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import type {
  ENoteTopic,
  ENoteDashboardStats,
  ENoteAssignments,
  ENoteTopicForm
} from '@/types/enotes'

const router = useRouter()

const API_BASE = '/api'

const stats = ref<ENoteDashboardStats | null>(null)
const topics = ref<ENoteTopic[]>([])
const assignments = ref<ENoteAssignments | null>(null)
const assignmentsError = ref<string | null>(null)
const loading = ref(false)
const saving = ref(false)

const statusFilter = ref('')
const subjectFilter = ref('')
const classFilter = ref('')
const streamFilter = ref('')

const showTopicModal = ref(false)
const editingTopic = ref<ENoteTopic | null>(null)
const learningOutcomeDraft = ref('')
const topicForm = ref<ENoteTopicForm>({
  title: '',
  description: '',
  learning_outcomes: [],
  subject_id: '',
  class_id: '',
  status: 'draft'
})

const addLearningOutcome = () => {
  const text = learningOutcomeDraft.value.trim()
  if (!text) return
  topicForm.value.learning_outcomes.push(text)
  learningOutcomeDraft.value = ''
}

const removeLearningOutcome = (index: number) => {
  topicForm.value.learning_outcomes.splice(index, 1)
}

const streamOptions = computed(() => {
  const streams = new Set<string>()
  assignments.value?.classes.forEach(cls => {
    if (cls.stream_name) streams.add(cls.stream_name)
  })
  return Array.from(streams).sort()
})

const filteredTopics = computed(() => {
  return topics.value.filter(topic => {
    const matchesStatus = !statusFilter.value || topic.status === statusFilter.value
    const matchesSubject = !subjectFilter.value || topic.subject_id === parseInt(subjectFilter.value)
    const matchesClass = !classFilter.value || topic.class_id === parseInt(classFilter.value)
    const matchesStream = !streamFilter.value || topic.class_stream_name === streamFilter.value
    return matchesStatus && matchesSubject && matchesClass && matchesStream
  })
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const loadDashboard = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${API_BASE}/teacher/enotes/dashboard`)
    if (response.data.success) {
      stats.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to load dashboard:', error)
  } finally {
    loading.value = false
  }
}

const loadTopics = async () => {
  try {
    loading.value = true
    const params: Record<string, string> = {}
    if (statusFilter.value) params.status = statusFilter.value
    if (subjectFilter.value) params.subject_id = subjectFilter.value

    const response = await axios.get(`${API_BASE}/teacher/enotes/topics`, { params })
    if (response.data.success) {
      topics.value = response.data.data.topics
    }
  } catch (error) {
    console.error('Failed to load topics:', error)
  } finally {
    loading.value = false
  }
}

const loadAssignments = async () => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/enotes/assignments`)
    console.log('Assignments full response:', response)
    console.log('Assignments response.data:', response.data)
    console.log('Assignments response.data.success:', response.data.success)
    console.log('Assignments response.data.data:', response.data.data)
    
    if (response.data.success) {
      assignments.value = response.data.data
      console.log('Subjects loaded:', response.data.data.subjects)
      console.log('Classes loaded:', response.data.data.classes)
      console.log('Department ID:', response.data.data.department_id)
      assignmentsError.value = null
    } else {
      console.error('Assignments API returned error:', response.data)
      assignmentsError.value = response.data.message || 'Failed to load assignments'
    }
  } catch (error: any) {
    console.error('Failed to load assignments:', error)
    console.error('Error response:', error.response)
    console.error('Error message:', error.message)
    assignmentsError.value = error.response?.data?.message || 'Failed to load assignments. Please ensure you are assigned to a department.'
  }
}

const openCreateModal = () => {
  editingTopic.value = null
  learningOutcomeDraft.value = ''
  topicForm.value = {
    title: '',
    description: '',
    learning_outcomes: [],
    subject_id: '',
    class_id: '',
    status: 'draft'
  }
  showTopicModal.value = true
}

const editTopic = (topic: ENoteTopic) => {
  editingTopic.value = topic
  learningOutcomeDraft.value = ''
  topicForm.value = {
    title: topic.title,
    description: topic.description || '',
    learning_outcomes: [...(topic.learning_outcomes || [])],
    subject_id: topic.subject_id.toString(),
    class_id: topic.class_id?.toString() || '',
    status: topic.status
  }
  showTopicModal.value = true
}

const closeTopicModal = () => {
  showTopicModal.value = false
  editingTopic.value = null
  learningOutcomeDraft.value = ''
}

const saveTopic = async () => {
  try {
    saving.value = true

    if (editingTopic.value) {
      await axios.put(`${API_BASE}/teacher/enotes/topics/${editingTopic.value.id}`, topicForm.value)
    } else {
      await axios.post(`${API_BASE}/teacher/enotes/topics`, topicForm.value)
    }

    closeTopicModal()
    await loadTopics()
    await loadDashboard()
  } catch (error) {
    console.error('Failed to save topic:', error)
  } finally {
    saving.value = false
  }
}

const deleteTopic = async (id: number) => {
  if (!confirm('Are you sure you want to delete this topic?')) return

  try {
    await axios.delete(`${API_BASE}/teacher/enotes/topics/${id}`)
    await loadTopics()
    await loadDashboard()
  } catch (error) {
    console.error('Failed to delete topic:', error)
  }
}

const openBuilder = (topicId: number) => {
  router.push(`/teacher/enotes/builder/${topicId}`)
}

onMounted(async () => {
  await Promise.all([
    loadDashboard(),
    loadTopics(),
    loadAssignments()
  ])
})
</script>
