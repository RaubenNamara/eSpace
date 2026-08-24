<template>
  <div class="p-6">
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-800 dark:text-red-200">{{ error }}</p>
      </div>
    </div>

    <div v-else-if="assignment">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ assignment.title }}</h1>
              <span v-if="isPreview" class="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                Preview
              </span>
            </div>
            <p class="text-gray-600 dark:text-gray-400">{{ assignment.subject_name }} • {{ assignment.teacher_name }}</p>
          </div>
          <div v-if="!isLocked && autoSaveStatus" class="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg v-if="autoSaveStatus === 'saving'" class="animate-spin w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <svg v-else-if="autoSaveStatus === 'saved'" class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <svg v-else class="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            {{ autoSaveStatus === 'saving' ? 'Saving...' : autoSaveStatus === 'saved' ? 'Saved' : 'Save failed' }}
          </div>
        </div>

        <!-- Preview banner: staff viewing exactly what a student sees -->
        <div v-if="isPreview" class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4 flex items-start gap-3">
          <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          <p class="text-indigo-800 dark:text-indigo-200 text-sm">
            This is exactly what a student sees when taking this assignment. It's read-only - nothing you do here is saved or submitted.
          </p>
        </div>

        <!-- Locked banner: attempt already submitted -->
        <div v-else-if="isLocked" class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p class="text-blue-800 dark:text-blue-200 text-sm">
            You have already submitted this assignment. Your work is shown below in read-only mode.
            <span v-if="submissionStatus === 'returned' || submissionStatus === 'graded'">It has been marked by your teacher.</span>
          </p>
        </div>

        <!-- Assignment Info -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span class="text-gray-600 dark:text-gray-400">Total Marks:</span>
              <span class="font-medium text-gray-900 dark:text-white ml-2">{{ assignment.total_marks }}</span>
            </div>
            <div>
              <span class="text-gray-600 dark:text-gray-400">Duration:</span>
              <span class="font-medium text-gray-900 dark:text-white ml-2">{{ assignment.duration_minutes ? `${assignment.duration_minutes} min` : 'No limit' }}</span>
            </div>
            <div>
              <span class="text-gray-600 dark:text-gray-400">Deadline:</span>
              <span class="font-medium text-gray-900 dark:text-white ml-2">{{ formatDate(assignment.due_date) }}</span>
            </div>
            <div v-if="timeRemaining > 0" class="text-yellow-600 dark:text-yellow-400">
              <span>Time Remaining:</span>
              <span class="font-medium ml-2">{{ formatTime(timeRemaining) }}</span>
            </div>
          </div>
          
          <div v-if="assignment.instructions" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 class="font-medium text-gray-900 dark:text-white mb-2">Instructions</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm" v-html="assignment.instructions"></p>
          </div>
        </div>
      </div>

      <!-- Questions -->
      <div class="space-y-6">
        <div
          v-for="(question, index) in questions"
          :key="question.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <!-- Scenario Question -->
          <div v-if="question.question_type === 'scenario'">
            <div class="mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Scenario</h3>
              <div v-if="question.scenario_text" class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line" v-html="question.scenario_text"></p>
              </div>
            </div>
            
            <!-- Sub-questions -->
            <div v-if="(question as any).sub_questions && (question as any).sub_questions.length > 0" class="space-y-4">
              <div
                v-for="(subQ, subIndex) in (question as any).sub_questions"
                :key="subQ.id"
                class="border-l-4 border-indigo-500 pl-4"
              >
                <div class="flex items-start space-x-3 mb-3">
                  <span class="font-medium text-gray-900 dark:text-white">{{ String.fromCharCode(97 + (subIndex as number)) }})</span>
                  <div class="flex-1">
                    <p class="text-gray-900 dark:text-white mb-2">{{ subQ.question_text }}</p>
                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ subQ.marks }} marks</span>
                  </div>
                </div>
                <div class="ml-6">
                  <FreeResponseAnswer
                    :question="subQ"
                    :assignment-id="Number(route.params.id)"
                    :model-value="answers[subQ.id] || ''"
                    :initial-annotations="answerAnnotationsByQuestion[subQ.id] || {}"
                    :initial-attachment="answerAttachmentByQuestion[subQ.id] || null"
                    :readonly="isLocked"
                    :rows="4"
                    @update:model-value="answers[subQ.id] = $event; triggerAutoSave()"
                    @submission-id="submissionId = $event"
                    @locked="submissionStatus = 'submitted'"
                  />
                </div>
              </div>
            </div>

            <!-- Fallback: scenario has no structured sub-questions, answer the scenario directly -->
            <div v-else class="ml-0">
              <FreeResponseAnswer
                :question="question"
                :assignment-id="Number(route.params.id)"
                :model-value="answers[question.id] || ''"
                :initial-annotations="answerAnnotationsByQuestion[question.id] || {}"
                :initial-attachment="answerAttachmentByQuestion[question.id] || null"
                :readonly="isLocked"
                :rows="8"
                @update:model-value="answers[question.id] = $event; triggerAutoSave()"
                @submission-id="submissionId = $event"
                @locked="submissionStatus = 'submitted'"
              />
            </div>
          </div>

          <!-- Regular Question -->
          <div v-else>
            <div class="flex items-start justify-between mb-4">
              <div>
                <p class="text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">Question {{ index + 1 }} · {{ Number(question.marks).toFixed(2) }} Marks</p>
                <p class="text-gray-900 dark:text-white mt-1" v-html="question.question_text"></p>
              </div>
              <span class="shrink-0 ml-4 px-2.5 py-1 rounded-full text-xs font-medium border" :class="questionStatusBadgeClass">{{ questionStatusLabel }}</span>
            </div>

            <!-- Multiple Choice Single -->
            <div v-if="question.question_type === 'multiple_choice_single'" class="ml-6 space-y-2">
              <label
                v-for="(option, optIndex) in question.options"
                :key="optIndex"
                class="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
              >
                <input
                  v-model="answers[question.id]"
                  type="radio"
                  :value="option.id"
                  :disabled="isLocked"
                  class="mr-3"
                  @change="triggerAutoSave"
                >
                <span class="text-gray-700 dark:text-gray-300">{{ option.option_text }}</span>
              </label>
            </div>

            <!-- Multiple Choice Multiple -->
            <div v-else-if="question.question_type === 'multiple_choice_multiple'" class="ml-6 space-y-2">
              <label
                v-for="(option, optIndex) in question.options"
                :key="optIndex"
                class="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
              >
                <input
                  v-model="multipleChoiceAnswers[question.id]"
                  type="checkbox"
                  :value="option.id"
                  :disabled="isLocked"
                  class="mr-3"
                  @change="triggerAutoSave"
                >
                <span class="text-gray-700 dark:text-gray-300">{{ option.option_text }}</span>
              </label>
            </div>

            <!-- True/False -->
            <div v-else-if="question.question_type === 'true_false'" class="ml-6 space-y-2">
              <label class="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                <input
                  v-model="answers[question.id]"
                  type="radio"
                  value="true"
                  :disabled="isLocked"
                  class="mr-3"
                  @change="triggerAutoSave"
                >
                <span class="text-gray-700 dark:text-gray-300">True</span>
              </label>
              <label class="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                <input
                  v-model="answers[question.id]"
                  type="radio"
                  value="false"
                  :disabled="isLocked"
                  class="mr-3"
                  @change="triggerAutoSave"
                >
                <span class="text-gray-700 dark:text-gray-300">False</span>
              </label>
            </div>

            <!-- Fill in Blank, Short Answer, Essay, Structured -->
            <div v-else class="ml-6">
              <FreeResponseAnswer
                :question="question"
                :assignment-id="Number(route.params.id)"
                :model-value="answers[question.id] || ''"
                :initial-annotations="answerAnnotationsByQuestion[question.id] || {}"
                :initial-attachment="answerAttachmentByQuestion[question.id] || null"
                :readonly="isLocked"
                :rows="question.question_type === 'essay' ? 8 : 4"
                :placeholder="getPlaceholder(question.question_type)"
                @update:model-value="answers[question.id] = $event; triggerAutoSave()"
                @submission-id="submissionId = $event"
                @locked="submissionStatus = 'submitted'"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Sticky bottom action bar -->
      <div v-if="!isLocked" class="sticky bottom-0 -mx-6 px-6 py-3 mt-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 z-10">
        <p v-if="autoSaveStatus !== 'saved'" class="text-sm text-amber-700 dark:text-amber-400">
          Unsaved changes - press Save Progress before leaving.
        </p>
        <p v-else class="text-sm text-gray-500 dark:text-gray-400">Submit only when every question is ready. Submitted answers are locked for teacher review.</p>
        <div class="flex items-center gap-3 shrink-0">
          <button
            @click="saveDraft"
            :disabled="saving"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {{ saving ? 'Saving...' : '✓ Save Progress' }}
          </button>
          <button
            @click="showSubmitConfirm = true"
            :disabled="!canSubmit || submitting"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {{ submitting ? 'Submitting...' : '⬆ Submit for Review' }}
          </button>
        </div>
      </div>

      <!-- Submit Confirmation Modal -->
      <div v-if="showSubmitConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Submit Assignment</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to submit your assignment? You will not be able to make changes after submission unless another attempt is allowed.
          </p>
          <div class="flex justify-end space-x-4">
            <button
              @click="showSubmitConfirm = false"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="submitAssignment"
              :disabled="submitting"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {{ submitting ? 'Submitting...' : 'Submit' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import type { AssignmentQuestion, AnnotationLayerJSON } from '@/types'
import FreeResponseAnswer from '@/components/assignment/FreeResponseAnswer.vue'

const router = useRouter()
const route = useRoute()

const API_BASE = '/api'

const assignment = ref<any>(null)
const questions = ref<AssignmentQuestion[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const saving = ref(false)
const submitting = ref(false)
const showSubmitConfirm = ref(false)
const autoSaveStatus = ref<'saving' | 'saved' | 'failed' | null>(null)
const submissionTiming = ref<'early' | 'on_time' | 'late' | null>(null)

const answers = ref<Record<number, string>>({})
const multipleChoiceAnswers = ref<Record<number, number[]>>({})
const answerAnnotationsByQuestion = ref<Record<number, Record<number, AnnotationLayerJSON>>>({})
const answerModeByQuestion = ref<Record<number, 'typed' | 'canvas' | 'pdf_upload'>>({})
const answerAttachmentByQuestion = ref<Record<number, { path: string; originalName?: string } | null>>({})

const submissionId = ref<number | null>(null)
const submissionStatus = ref<string | null>(null)
const timeRemaining = ref(0)
let timerInterval: number | null = null

// Staff (teacher/hod/admin) "Preview as Student" mode: set via route meta on the /teacher,
// /hod, /admin variants of this same component so it can be reused unmodified for the real
// student-taking experience and for a read-only staff preview.
const previewRole = computed(() => route.meta.previewRole as string | undefined)
const isPreview = computed(() => !!previewRole.value)

const loadUrl = computed(() => {
  return isPreview.value
    ? `${API_BASE}/${previewRole.value}/assignments/${route.params.id}/preview`
    : `${API_BASE}/student/assignments/${route.params.id}`
})

// Locked once the attempt has moved past in_progress (submitted/marking/graded/returned) -
// a teacher reopening it resets status back to in_progress server-side. Preview mode is always
// locked - there's no real submission to save answers into.
const isLocked = computed(() => isPreview.value || (submissionStatus.value !== null && submissionStatus.value !== 'in_progress'))

const questionStatusLabel = computed(() => {
  if (!isLocked.value) return 'Draft'
  if (submissionStatus.value === 'graded' || submissionStatus.value === 'returned') return 'Marked'
  return 'Submitted'
})

const questionStatusBadgeClass = computed(() => {
  if (!isLocked.value) return 'border-amber-300 text-amber-700 bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:bg-amber-900/20'
  return 'border-green-300 text-green-700 bg-green-50 dark:border-green-700 dark:text-green-300 dark:bg-green-900/20'
})

const canSubmit = computed(() => {
  if (isLocked.value) return false
  const hasTextAnswer = Object.keys(answers.value).length > 0
  const hasCanvasQuestion = questions.value.some(q => q.response_type === 'canvas' || q.response_type === 'pdf_annotation')
  const hasDrawnOrUploadedAnswer = Object.keys(answerModeByQuestion.value).some(
    qId => answerModeByQuestion.value[Number(qId)] !== 'typed'
  )
  return hasTextAnswer || hasCanvasQuestion || hasDrawnOrUploadedAnswer
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

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  }
  return `${minutes}m ${secs}s`
}

const getPlaceholder = (type: string) => {
  const placeholders: Record<string, string> = {
    fill_blank: 'Type your answer here...',
    short_answer: 'Type your answer here...',
    essay: 'Write your essay here...',
    structured: 'Type your answer here...'
  }
  return placeholders[type] || 'Type your answer here...'
}

const loadAssignment = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await axios.get(loadUrl.value)
    if (response.data.success) {
      assignment.value = response.data.data.assignment
      questions.value = response.data.data.questions
      submissionId.value = response.data.data.submission_id || null
      submissionStatus.value = response.data.data.submission_status || null
      answerAnnotationsByQuestion.value = response.data.data.answer_annotations || {}

      // Load existing answers if submission exists
      if (response.data.data.answers) {
        response.data.data.answers.forEach((answer: any) => {
          if (answer.answer_text !== null && answer.answer_text !== undefined) {
            answers.value[answer.question_id] = answer.answer_text
          }
          answerModeByQuestion.value[answer.question_id] = answer.answer_mode || 'typed'
          answerAttachmentByQuestion.value[answer.question_id] = answer.student_attachment_path
            ? { path: answer.student_attachment_path, originalName: answer.student_attachment_original_name }
            : null
        })
      }

      // Start timer if duration is set and the attempt is still editable
      if (assignment.value.duration_minutes && !isLocked.value) {
        startTimer()
      }
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load assignment'
  } finally {
    loading.value = false
  }
}

const startTimer = () => {
  if (!assignment.value.duration_minutes) return
  
  const now = new Date()
  const durationSeconds = assignment.value.duration_minutes * 60
  const endTime = new Date(now.getTime() + durationSeconds * 1000)
  
  timerInterval = window.setInterval(() => {
    const currentTime = new Date()
    const remaining = Math.floor((endTime.getTime() - currentTime.getTime()) / 1000)
    timeRemaining.value = remaining > 0 ? remaining : 0
    
    if (remaining <= 0) {
      clearInterval(timerInterval!)
      // Auto-submit or show timeout warning
    }
  }, 1000)
}

const triggerAutoSave = () => {
  if (isLocked.value || isPreview.value) return
  autoSave()
}

let autoSaveTimeout: number | null = null

const autoSave = async () => {
  if (isLocked.value || isPreview.value) return
  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout)
  }
  
  autoSaveStatus.value = 'saving'
  
  autoSaveTimeout = window.setTimeout(async () => {
    try {
      const data = {
        assignment_id: route.params.id,
        answers: prepareAnswers(),
        status: 'in_progress'
      }
      
      let response
      if (submissionId.value) {
        response = await axios.put(`${API_BASE}/student/assignments/submissions/${submissionId.value}`, data)
      } else {
        response = await axios.post(`${API_BASE}/student/assignments/${route.params.id}/submit`, data)
        submissionId.value = response.data.data.id
      }
      
      if (response.data.success) {
        autoSaveStatus.value = 'saved'
      }
    } catch (err: any) {
      autoSaveStatus.value = 'failed'
      console.error('Auto-save failed:', err)
    }
  }, 3000)
}

const saveDraft = async () => {
  if (isLocked.value || isPreview.value) return
  saving.value = true
  
  try {
    const data = {
      assignment_id: route.params.id,
      answers: prepareAnswers(),
      status: 'in_progress'
    }
    
    let response
    if (submissionId.value) {
      response = await axios.put(`${API_BASE}/student/assignments/submissions/${submissionId.value}`, data)
    } else {
      response = await axios.post(`${API_BASE}/student/assignments/${route.params.id}/submit`, data)
      submissionId.value = response.data.data.id
    }
    
    if (response.data.success) {
      alert('Draft saved successfully')
    }
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to save draft')
  } finally {
    saving.value = false
  }
}

const prepareAnswers = () => {
  const prepared: any[] = []
  
  Object.entries(answers.value).forEach(([questionId, answer]) => {
    const qId = Number(questionId)
    const question = questions.value.find(q => q.id === qId)
    
    if (question?.question_type === 'multiple_choice_multiple') {
      const selectedOptions = multipleChoiceAnswers.value[qId] || []
      prepared.push({
        question_id: qId,
        answer_text: JSON.stringify(selectedOptions)
      })
    } else {
      prepared.push({
        question_id: qId,
        answer_text: String(answer)
      })
    }
  })
  
  return prepared
}

const submitAssignment = async () => {
  if (isLocked.value || isPreview.value || submitting.value) {
    // Already submitted (or a duplicate click while the first request is in flight) - no-op.
    showSubmitConfirm.value = false
    return
  }

  submitting.value = true

  try {
    const data = {
      assignment_id: route.params.id,
      answers: prepareAnswers(),
      status: 'submitted'
    }

    let response
    if (submissionId.value) {
      response = await axios.put(`${API_BASE}/student/assignments/submissions/${submissionId.value}`, data)
    } else {
      response = await axios.post(`${API_BASE}/student/assignments/${route.params.id}/submit`, data)
    }

    if (response.data.success) {
      showSubmitConfirm.value = false
      submissionStatus.value = 'submitted'
      submissionTiming.value = response.data.data?.submission_timing || null
      if (timerInterval) clearInterval(timerInterval)
      const timingLabel = submissionTiming.value === 'late' ? ' (late)' : submissionTiming.value === 'early' ? ' (early)' : ''
      alert(`Assignment submitted successfully${timingLabel}`)
      router.push('/student/assignments')
    }
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to submit assignment')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadAssignment()
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>
