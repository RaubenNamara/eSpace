<template>
  <div class="p-3 sm:p-6">
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 sm:p-6">
      <p class="text-red-800 dark:text-red-200 break-words">{{ error }}</p>
    </div>

    <div v-else-if="!submission" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 sm:p-6">
      <p class="text-yellow-800 dark:text-yellow-200">No submission data was returned for this assignment.</p>
    </div>

    <div v-else>
      <div class="mb-4 sm:mb-6">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 break-words">{{ submission.assignment_title }}</h1>
        <p class="text-gray-600 dark:text-gray-400 text-sm flex items-center flex-wrap gap-2">
          Submitted {{ formatDate(submission.submitted_at) }}
          <span class="px-2 py-0.5 rounded-full text-xs" :class="statusClass">{{ statusLabel }}</span>
        </p>
      </div>

      <!-- Marks / Grade summary (result mode only) -->
      <div v-if="(mode === 'result' || oversightRole) && summary" class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4 text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">Marks</p>
          <p class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{{ summary.marks_awarded }} / {{ summary.total_marks }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4 text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">Percentage</p>
          <p class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{{ summary.percentage }}%</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4 text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">Grade</p>
          <p class="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-400">{{ summary.grade }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4 text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">Status</p>
          <p class="text-lg sm:text-xl font-bold" :class="gradeStatus.color">
            {{ gradeStatus.label }}
          </p>
        </div>
      </div>

      <!-- General feedback -->
      <div v-if="(mode === 'result' || oversightRole) && submission.feedback" class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
        <h3 class="font-medium text-indigo-900 dark:text-indigo-200 mb-1">Teacher Feedback</h3>
        <p class="text-indigo-800 dark:text-indigo-300 text-sm whitespace-pre-line break-words">{{ submission.feedback }}</p>
      </div>

      <!-- Questions -->
      <div class="space-y-4 sm:space-y-6">
        <div
          v-for="(question, index) in questions"
          :key="question.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
        >
          <div class="flex flex-wrap items-start justify-between gap-2 mb-4">
            <div class="flex items-start gap-3 min-w-0">
              <span class="font-medium text-gray-900 dark:text-white flex-shrink-0">Q{{ index + 1 }}.</span>
              <div class="min-w-0 overflow-x-auto">
                <p v-if="question.question_text" class="text-gray-900 dark:text-white mb-1 break-words [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full" v-html="question.question_text"></p>
                <p v-else-if="question.scenario_text" class="text-gray-700 dark:text-gray-300 mb-1 break-words [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full" v-html="question.scenario_text"></p>
              </div>
            </div>
            <span v-if="(mode === 'result' || oversightRole) && question.question_mark" class="text-sm font-bold text-red-600 dark:text-red-400 whitespace-nowrap">
              {{ question.question_mark.marks_awarded ?? '—' }} / {{ question.marks }}
            </span>
          </div>

          <div v-if="question.scenario_text" class="bg-gray-50 dark:bg-gray-700/50 p-3 sm:p-4 rounded-lg mb-4 overflow-x-auto">
            <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line break-words [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full" v-html="question.scenario_text"></p>
          </div>

          <!-- Objective (MCQ/true-false) questions: raw stored answer only -->
          <div v-if="isObjective(question)" class="ml-3 sm:ml-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Your answer</p>
            <p class="text-gray-900 dark:text-white whitespace-pre-line break-words">{{ answerFor(question.id) || '(No answer provided)' }}</p>
          </div>

          <!-- Free-response question: typed answer (rendered on a canvas so any teacher marks
               made directly over it are visible), plus its drawing/PDF layer(s) -->
          <template v-else>
            <div v-if="typedAnswerLayers[question.id]" class="ml-3 sm:ml-6 mb-4">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Your typed answer</p>
              <AnnotationCanvas
                :width="800"
                :height="typedAnswerLayers[question.id].height"
                :readonly-layers="typedAnswerReadonlyLayers[question.id]"
                mode="readonly"
                readonly
              />
            </div>
            <AnnotationCanvas
              v-if="showPdf(question) && isEvidenceImage(question)"
              :background="pdfUrlFor(question)"
              :width="evidenceImageDims[question.id]?.width || 800"
              :height="evidenceImageDims[question.id]?.height || 1000"
              :readonly-layers="combinedLayersByPage(question)[1] || []"
              mode="readonly"
              readonly
            />
            <PdfAnnotationViewer
              v-else-if="showPdf(question)"
              :pdf-url="pdfUrlFor(question)"
              :readonly-layers-by-page="pdfLayersByPage(question)"
              mode="readonly"
              readonly
            />
          </template>

          <p v-if="(mode === 'result' || oversightRole) && question.question_mark?.feedback" class="mt-3 text-sm text-gray-600 dark:text-gray-400 italic">
            "{{ question.question_mark.feedback }}"
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { AnnotationLayerJSON } from '@/types'
import { TYPED_ANSWER_PAGE } from '@/types'
import AnnotationCanvas from '@/components/assignment/AnnotationCanvas.vue'
import PdfAnnotationViewer from '@/components/assignment/PdfAnnotationViewer.vue'
import { createTypedAnswerLayer } from '@/composables/useAnnotationCanvas'
import { resolveAssetUrl } from '@/utils/url'

const route = useRoute()

const API_BASE = '/api'

const mode = computed<'submission' | 'result'>(() => (route.meta.viewMode as 'submission' | 'result') || 'submission')

// Staff (HOD/admin) oversight mode: set via route meta, same pattern as the "preview as
// student" routes - hits a role-scoped read-only submission endpoint instead of the student's
// own, and always shows marking progress regardless of whether it's been released to the student.
const oversightRole = computed(() => route.meta.previewRole as string | undefined)

const loading = ref(false)
const error = ref<string | null>(null)
const submission = ref<any>(null)
const answers = ref<any[]>([])
const questions = ref<any[]>([])
const summary = ref<{ marks_awarded: number; total_marks: number; percentage: number; grade: string } | null>(null)
const evidenceImageDims = ref<Record<number, { width: number; height: number }>>({})
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

const gradingScale = [
  { grade: 'A', label: 'Exceptional', color: 'text-green-600 dark:text-green-400' },
  { grade: 'B', label: 'Outstanding', color: 'text-blue-600 dark:text-blue-400' },
  { grade: 'C', label: 'Satisfactory', color: 'text-blue-600 dark:text-blue-400' },
  { grade: 'D', label: 'Basic', color: 'text-blue-600 dark:text-blue-400' },
  { grade: 'E', label: 'Elementary', color: 'text-red-600 dark:text-red-400' }
]

const gradeStatus = computed(() => {
  const band = gradingScale.find(b => b.grade === summary.value?.grade)
  return band ? { label: band.label, color: band.color } : { label: '—', color: 'text-gray-500 dark:text-gray-400' }
})

const statusLabel = computed(() => {
  const map: Record<string, string> = { submitted: 'Submitted', marking: 'Marking', graded: 'Marked', returned: 'Marked' }
  return map[submission.value?.status] || submission.value?.status
})

const statusClass = computed(() => {
  return submission.value?.status === 'returned'
    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
    : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
})

function answerFor(questionId: number): string | undefined {
  return answers.value.find(a => a.question_id === questionId)?.answer_text
}

// Rendered as a read-only Fabric layer (not plain HTML) so any marks the teacher drew directly
// over the typed answer are visible here, stacked on top of it - matching how the teacher's
// marking view renders it (see TeacherMarkingCanvas.vue).
const typedAnswerLayers = computed(() => {
  const map: Record<number, { layer: AnnotationLayerJSON; height: number }> = {}
  for (const question of questions.value) {
    if (isObjective(question)) continue
    const text = answerFor(question.id)
    if (text) map[question.id] = createTypedAnswerLayer(text, 800)
  }
  return map
})

// Stable array reference per question - a fresh array literal in the template re-triggers
// AnnotationCanvas's readonly-layer setup on every re-render, which can race with itself badly
// enough that the layer never actually finishes loading (see TeacherMarkingCanvas.vue).
const typedAnswerReadonlyLayers = computed(() => {
  const map: Record<number, AnnotationLayerJSON[]> = {}
  for (const question of questions.value) {
    const info = typedAnswerLayers.value[question.id]
    if (info) map[question.id] = [info.layer, ...(combinedLayersByPage(question)[TYPED_ANSWER_PAGE] || [])]
  }
  return map
})

const OBJECTIVE_TYPES = ['multiple_choice_single', 'multiple_choice_multiple', 'true_false']
function isObjective(question: any): boolean {
  return OBJECTIVE_TYPES.includes(question.question_type)
}

function showPdf(question: any): boolean {
  return question.response_type === 'pdf_annotation' || !!question.answer?.student_attachment_path
}

function pdfUrlFor(question: any): string {
  return resolveAssetUrl(question.response_type === 'pdf_annotation' ? question.attachment_path : question.answer?.student_attachment_path)
}

// A student's own uploaded evidence can be a PDF or a single image - an image can't be
// rendered by the pdf.js-based viewer, so it's shown on a plain readonly AnnotationCanvas
// instead, at the same page-1 slot a single-page PDF would use.
function isEvidenceImage(question: any): boolean {
  const url = pdfUrlFor(question).toLowerCase()
  return IMAGE_EXTENSIONS.some(ext => url.endsWith(ext))
}

function pdfLayersByPage(question: any): Record<number, AnnotationLayerJSON[]> {
  const layers = combinedLayersByPage(question)
  const result: Record<number, AnnotationLayerJSON[]> = {}
  for (const page of Object.keys(layers).map(Number)) {
    if (page >= 1) result[page] = layers[page]
  }
  return result
}

function combinedLayersByPage(question: any): Record<number, AnnotationLayerJSON[]> {
  const pages = new Set([
    ...Object.keys(question.question_annotations || {}),
    ...Object.keys(question.answer_annotations || {}),
    ...Object.keys(question.marking_annotations || {})
  ].map(Number))

  if (pages.size === 0) pages.add(1)

  const result: Record<number, AnnotationLayerJSON[]> = {}
  for (const page of pages) {
    result[page] = [
      question.question_annotations?.[page] || { objects: [] },
      question.answer_annotations?.[page] || { objects: [] },
      question.marking_annotations?.[page] || { objects: [] }
    ]
  }
  return result
}

function measureImages() {
  for (const question of questions.value) {
    if (!showPdf(question) || !isEvidenceImage(question)) continue
    const img = new Image()
    img.onload = () => {
      evidenceImageDims.value[question.id] = { width: img.naturalWidth, height: img.naturalHeight }
    }
    img.src = pdfUrlFor(question)
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

const load = async () => {
  loading.value = true
  error.value = null

  try {
    const endpoint = oversightRole.value
      ? `${API_BASE}/${oversightRole.value}/assignments/${route.params.id}/submissions/${route.params.submissionId}`
      : mode.value === 'result'
        ? `${API_BASE}/student/assignments/${route.params.id}/result/${route.params.submissionId}`
        : `${API_BASE}/student/assignments/${route.params.id}/submission/${route.params.submissionId}`

    const response = await axios.get(endpoint)
    if (response.data.success) {
      submission.value = response.data.data.submission
      answers.value = response.data.data.answers || []
      questions.value = response.data.data.questions || []
      summary.value = response.data.data.summary || null
      measureImages()
    } else {
      error.value = response.data.message || 'Failed to load submission'
    }
  } catch (err: any) {
    console.error('AssignmentResult load failed:', err)
    error.value = err.response?.data?.message || 'Failed to load submission'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
