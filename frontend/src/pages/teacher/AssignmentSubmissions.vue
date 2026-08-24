<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4 min-w-0">
            <button
              @click="markingData ? backToList() : router.push('/teacher/assignments')"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
            >
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </button>
            <div class="min-w-0">
              <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">Assignment Submissions</h1>
              <p class="text-sm text-gray-600 dark:text-gray-400 truncate">{{ assignment?.title || 'Loading...' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-6">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
        <div class="flex items-center">
          <svg class="w-6 h-6 text-red-600 dark:text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-red-600 dark:text-red-400">{{ error }}</p>
        </div>
      </div>

      <!-- Submissions List -->
      <div v-else-if="!markingData">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="overflow-x-auto">
          <table class="w-full min-w-[640px]">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Submitted</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="submission in submissions" :key="submission.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <span class="text-indigo-600 dark:text-indigo-400 font-medium">
                        {{ submission.student_name?.charAt(0) || '?' }}
                      </span>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">{{ submission.student_name }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ submission.student_email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <p class="text-sm text-gray-900 dark:text-white">{{ formatDate(submission.submitted_at) }}</p>
                </td>
                <td class="px-6 py-4">
                  <span :class="getStatusClasses(submission.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ capitalizeFirst(submission.status) }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <p class="text-sm text-gray-900 dark:text-white">
                    {{ submission.total_score !== null ? submission.total_score : '-' }} / {{ assignment?.total_marks }}
                  </p>
                </td>
                <td class="px-6 py-4 text-right">
                  <button
                    v-if="submission.status !== 'in_progress' && submission.status !== 'draft'"
                    @click="selectSubmission(submission)"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                  >
                    Mark
                  </button>
                  <span v-else class="text-xs text-gray-400">Not submitted yet</span>
                </td>
              </tr>
            </tbody>
          </table>
          </div>

          <!-- Empty State -->
          <div v-if="submissions.length === 0" class="p-12 text-center">
            <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No submissions yet</h3>
            <p class="text-gray-600 dark:text-gray-400">Students haven't submitted this assignment yet.</p>
          </div>
        </div>
      </div>

      <!-- Marking View -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <!-- Questions -->
        <div class="lg:col-span-3 xl:col-span-4 space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">{{ markingData.submission.student_name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Submitted {{ formatDate(markingData.submission.submitted_at) }} • {{ markingData.submission.admission_number }}
            </p>
          </div>

          <div
            v-for="(question, index) in markingData.questions"
            :key="question.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div class="flex items-start space-x-3 mb-4">
              <span class="font-medium text-gray-900 dark:text-white">Q{{ index + 1 }}.</span>
              <div class="flex-1">
                <p v-if="question.question_text" class="text-gray-900 dark:text-white mb-2" v-html="question.question_text"></p>
                <p v-else-if="question.scenario_text" class="text-gray-700 dark:text-gray-300 mb-2" v-html="question.scenario_text"></p>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ question.marks }} marks</span>
              </div>
            </div>

            <!-- Objective (MCQ/true-false) questions: raw stored answer only -->
            <div v-if="isObjective(question)" class="ml-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Student's answer</p>
              <p class="text-gray-900 dark:text-white whitespace-pre-line">{{ question.answer?.answer_text || '(No answer provided)' }}</p>
            </div>

            <!-- Free-response question: typed answer (annotatable), drawing layer, and PDF/image
                 evidence, all rendered inside TeacherMarkingCanvas -->
            <template v-else>
              <TeacherMarkingCanvas
                :question="question"
                :assignment-id="assignmentId"
                :submission-id="markingData.submission.id"
              />
            </template>
          </div>
        </div>

        <!-- Marking Sidebar -->
        <div class="lg:col-span-1 xl:col-span-1">
          <div class="lg:sticky lg:top-6">
            <MarkingPanel
              :questions="markingData.questions"
              :assignment-id="assignmentId"
              :submission-id="markingData.submission.id"
              :status="markingData.submission.status"
              :total-marks="markingData.submission.total_marks"
              :initial-feedback="markingData.submission.feedback || ''"
              @status-changed="onStatusChanged"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import TeacherMarkingCanvas from '@/components/assignment/TeacherMarkingCanvas.vue'
import MarkingPanel from '@/components/assignment/MarkingPanel.vue'

const router = useRouter()
const route = useRoute()

const API_BASE = '/api'

const assignmentId = ref<number>(parseInt(route.params.id as string))
const assignment = ref<any>(null)
const submissions = ref<any[]>([])
const markingData = ref<{ submission: any; questions: any[] } | null>(null)

const loading = ref(false)
const error = ref<string | null>(null)

const OBJECTIVE_TYPES = ['multiple_choice_single', 'multiple_choice_multiple', 'true_false']
function isObjective(question: any): boolean {
  return OBJECTIVE_TYPES.includes(question.question_type)
}

const loadAssignment = async () => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/assignments/${assignmentId.value}`)
    if (response.data.success) {
      assignment.value = response.data.data
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load assignment'
  }
}

const loadSubmissions = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await axios.get(`${API_BASE}/teacher/assignments/${assignmentId.value}/submissions`)
    if (response.data.success) {
      submissions.value = response.data.data
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load submissions'
  } finally {
    loading.value = false
  }
}

const selectSubmission = async (submission: any) => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/assignments/${assignmentId.value}/submissions/${submission.id}/marking`)
    if (response.data.success) {
      markingData.value = response.data.data
    }
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to load submission for marking')
  }
}

const backToList = () => {
  markingData.value = null
  loadSubmissions()
}

const onStatusChanged = (status: string) => {
  if (markingData.value) {
    markingData.value.submission.status = status
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClasses = (status: string) => {
  const statusMap: Record<string, string> = {
    submitted: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    marking: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    graded: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    returned: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
  }
  return statusMap[status] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
}

const capitalizeFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ')
}

onMounted(() => {
  loadAssignment()
  loadSubmissions()
})
</script>
