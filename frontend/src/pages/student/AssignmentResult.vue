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
      <RouterLink
        v-if="oversightRole"
        :to="`/${oversightRole}/assessments/${route.params.id}/submissions`"
        class="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        All marked scripts
      </RouterLink>
      <div class="mb-4 sm:mb-6 flex items-start gap-3">
        <div class="min-w-0 flex-1">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 break-words">{{ submission.assignment_title }}</h1>
        <p v-if="oversightRole && submission.student_name" class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-0.5">
          {{ submission.student_name }} <span class="font-normal text-gray-500 dark:text-gray-400">· view only</span>
        </p>
        <p class="text-gray-600 dark:text-gray-400 text-sm flex items-center flex-wrap gap-2">
          Submitted {{ formatDate(submission.submitted_at) }}
          <span class="px-2 py-0.5 rounded-full text-xs" :class="statusClass">{{ statusLabel }}</span>
        </p>
        </div>
        <!-- Back to the student's assessments, top right -->
        <RouterLink
          v-if="!oversightRole"
          to="/student/assignments"
          class="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          Go back
        </RouterLink>
      </div>

      <!-- The result as a certificate: cream paper in a gold frame, the school's crest, and the
           grade - in a gold seal for an A or B (result mode only) -->
      <section v-if="(mode === 'result' || oversightRole) && summary" class="result-cert mb-4 sm:mb-6">
        <div class="flex items-center gap-3">
          <img v-if="school?.logo && !logoFailed" :src="resolveAssetUrl(school.logo)" alt="" class="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-contain bg-white ring-1 ring-gold-300 flex-shrink-0" @error="logoFailed = true">
          <div class="min-w-0">
            <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-700 dark:text-gold-300">Assessment result</p>
            <p v-if="school?.name" class="font-heading text-base sm:text-lg font-semibold text-indigo-900 dark:text-white capitalize truncate">{{ school.name }}</p>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-4 sm:gap-6">
          <div class="cert-seal flex-shrink-0" :class="honours ? 'cert-seal-gold' : ''" :style="honours ? undefined : { background: gradeHex(summary.grade) }" :aria-label="`Grade ${summary.grade || 'not given'}`">
            <span class="font-heading text-3xl sm:text-4xl font-bold leading-none">{{ summary.grade || '–' }}</span>
            <span class="mt-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider">{{ gradeStatus.label }}</span>
          </div>
          <dl class="grid grid-cols-2 gap-x-6 gap-y-2 min-w-0">
            <div>
              <dt class="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Marks</dt>
              <dd class="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tabular-nums">{{ fmtMarks(summary.marks_awarded) }}<span class="text-sm font-normal text-gray-500"> / {{ fmtMarks(summary.total_marks) }}</span></dd>
            </div>
            <div>
              <dt class="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Percentage</dt>
              <dd class="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tabular-nums">{{ summary.percentage }}%</dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- General feedback -->
      <div v-if="(mode === 'result' || oversightRole) && submission.feedback" class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
        <h3 class="font-medium text-indigo-900 dark:text-indigo-200 mb-1">Teacher Feedback</h3>
        <p class="text-indigo-800 dark:text-indigo-300 text-sm whitespace-pre-line break-words text-justify">{{ submission.feedback }}</p>
      </div>
      <VoiceNote
        v-if="(mode === 'result' || oversightRole) && submission.voice_feedback_path"
        class="mb-4 sm:mb-6"
        readonly
        :path="submission.voice_feedback_path"
        :seconds="submission.voice_feedback_seconds"
      />

      <!-- Questions -->
      <div class="space-y-4 sm:space-y-6">
        <div
          v-for="(question, index) in questions"
          :key="question.id"
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
        >
          <div class="mb-5">
            <div class="mb-2 flex items-center justify-between gap-3">
              <span class="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-lg bg-indigo-50 px-2 text-xs font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">Q{{ index + 1 }}</span>
              <span v-if="(mode === 'result' || oversightRole) && question.question_mark" class="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-sm font-bold tabular-nums text-rose-700 ring-1 ring-rose-100 whitespace-nowrap dark:bg-rose-900/30 dark:text-rose-300 dark:ring-rose-800">
                {{ fmtMarks(question.question_mark.marks_awarded) }} / {{ fmtMarks(question.marks) }}
              </span>
            </div>
            <div class="min-w-0">
              <div class="min-w-0 overflow-x-auto">
                <p v-if="question.question_text" class="text-[15px] font-medium leading-relaxed text-gray-900 dark:text-white mb-1 break-words [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full" v-html="safeHtml(question.question_text)"></p>
                <p v-else-if="question.scenario_text" class="text-gray-700 dark:text-gray-300 mb-1 break-words text-justify [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full" v-html="safeHtml(question.scenario_text)"></p>
              </div>
            </div>
          </div>

          <div v-if="question.scenario_text && question.question_text" class="bg-gray-50 dark:bg-gray-700/50 p-3 sm:p-4 rounded-lg mb-4 overflow-x-auto">
            <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line break-words text-justify [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full" v-html="safeHtml(question.scenario_text)"></p>
          </div>

          <!-- Objective (MCQ/true-false) questions: the answer in words -->
          <div v-if="isObjective(question)" class="ml-3 sm:ml-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ oversightRole ? "Student's answer" : "Your answer" }}</p>
            <p class="text-gray-900 dark:text-white whitespace-pre-line break-words text-justify">{{ objectiveAnswerText(question, answerFor(question.id)) || '(No answer provided)' }}</p>
          </div>

          <!-- An ICT practical: the work, in the app it was made in, view only -->
          <PracticalWorkView
            v-else-if="(question as any).practical_app"
            class="sm:ml-10"
            :app="(question as any).practical_app"
            :path="question.answer?.student_attachment_path || null"
            :files="(question as any).practical_files || null"
            :student-name="oversightRole ? submission?.student_name || null : null"
            :title="submission?.assignment_title || 'Practical'"
            :instructions="question.question_text || null"
            :who="oversightRole ? 'The learner\'s' : 'Your'"
            :markup-layers="(question as any).marking_annotations || null"
          />

          <!-- Free-response question: typed answer (rendered on a canvas so any teacher marks
               made directly over it are visible), plus its drawing/PDF layer(s) -->
          <template v-else>
            <div v-if="typedAnswerLayers[question.id]" class="mb-4 sm:ml-10">
              <div class="mark-sheet-frame" :style="typedAnswerLayers[question.id].phone ? { maxWidth: `${typedAnswerLayers[question.id].width}px` } : undefined">
              <AnnotationCanvas
                :width="typedAnswerLayers[question.id].width"
                :height="typedAnswerLayers[question.id].height"
                stretch
                :readonly-layers="typedAnswerReadonlyLayers[question.id]"
                mode="readonly"
                readonly
              />
              </div>
            </div>
            <!-- Uploaded evidence gallery - the first file the student uploaded and every extra
                 file are shown side by side with no distinction, each with any marks the
                 teacher made on it. -->
            <div v-if="galleryFilesFor(question).length" class="mt-4 sm:ml-10">
              <div class="grid grid-cols-1 gap-4">
                <div v-for="item in galleryFilesFor(question)" :key="item.key" class="min-w-0">
                  <!-- a Word/Excel/... file handed in (ICT): no preview, open it -->
                  <a
                    v-if="item.fileType === 'document'"
                    :href="item.path"
                    :download="item.originalName"
                    class="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >Download {{ item.originalName }}</a>
                  <AnnotationCanvas
                    v-else-if="item.fileType === 'image'"
                    :background="item.path"
                    :width="(item.isPrimary ? evidenceImageDims[question.id] : additionalFileImageDims[item.file.id])?.width || 800"
                    :height="(item.isPrimary ? evidenceImageDims[question.id] : additionalFileImageDims[item.file.id])?.height || 1000"
                    :readonly-layers="item.isPrimary ? (combinedLayersByPage(question)[1] || []) : [item.file.marking_annotations?.[1] || { objects: [] }]"
                    mode="readonly"
                    readonly
                  />
                  <PdfAnnotationViewer
                    v-else
                    :pdf-url="item.path"
                    :readonly-layers-by-page="item.isPrimary ? pdfLayersByPage(question) : additionalFilePdfLayers(item.file)"
                    mode="readonly"
                    readonly
                  />
                </div>
              </div>
            </div>
          </template>

          <p v-if="(mode === 'result' || oversightRole) && question.question_mark?.feedback" class="mt-4 sm:ml-10 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-900/20 dark:text-amber-200">
            <span class="font-semibold">Teacher's comment:</span> {{ question.question_mark.feedback }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gradeHex, isHonours } from '@/utils/grades'
import { resolveAssetUrl } from '@/utils/url'
import { safeHtml } from '@/utils/safeHtml'
import { fmtMarks } from '@/utils/marks'
import VoiceNote from '@/components/assignment/VoiceNote.vue'
import PracticalWorkView from '@/components/practical/PracticalWorkView.vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { AnnotationLayerJSON } from '@/types'
import { TYPED_ANSWER_PAGE } from '@/types'
import AnnotationCanvas from '@/components/assignment/AnnotationCanvas.vue'
import PdfAnnotationViewer from '@/components/assignment/PdfAnnotationViewer.vue'
import { createTypedAnswerLayer, htmlToPlainText, handwritingFontReady, answerLook, sheetWidth } from '@/composables/useAnnotationCanvas'
import { isPlaceholderAttachmentName } from '@/utils/answerAttachment'
import { objectiveAnswerText } from '@/utils/objectiveAnswer'

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
const school = ref<{ name: string | null; logo: string | null } | null>(null)
const logoFailed = ref(false)
const honours = computed(() => isHonours(summary.value?.grade))
const evidenceImageDims = ref<Record<number, { width: number; height: number }>>({})
const additionalFileImageDims = ref<Record<number, { width: number; height: number }>>({})
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

const gradingScale = [
  { grade: 'A', label: 'Exceptional', color: 'text-emerald-700 dark:text-emerald-400' },
  { grade: 'B', label: 'Outstanding', color: 'text-indigo-600 dark:text-indigo-400' },
  { grade: 'C', label: 'Satisfactory', color: 'text-indigo-600 dark:text-indigo-400' },
  { grade: 'D', label: 'Basic', color: 'text-indigo-600 dark:text-indigo-400' },
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
    : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
})

function answerFor(questionId: number): string | undefined {
  return answers.value.find(a => a.question_id === questionId)?.answer_text
}

// Rendered as a read-only Fabric layer (not plain HTML) so any marks the teacher drew directly
// over the typed answer are visible here, stacked on top of it - matching how the teacher's
// marking view renders it (see TeacherMarkingCanvas.vue).
// a phone lays out unmarked answers to its own width (readable, nothing to scroll sideways);
// an answer with marks keeps the page it was marked on, fitted to the screen
const viewportWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1280)
const onViewportResize = () => { viewportWidth.value = window.innerWidth }
onMounted(() => window.addEventListener('resize', onViewportResize))
onBeforeUnmount(() => window.removeEventListener('resize', onViewportResize))
const phoneSheetWidth = computed(() => (viewportWidth.value < 700 ? Math.max(260, viewportWidth.value - 64) : 0))
const hasTypedMarks = (question: any) => (combinedLayersByPage(question)[TYPED_ANSWER_PAGE] || [])
  .some((l: AnnotationLayerJSON) => (l?.objects?.length || 0) > 0)

const typedAnswerLayers = computed(() => {
  const map: Record<number, { layer: AnnotationLayerJSON; height: number; width: number; phone: boolean }> = {}
  for (const question of questions.value) {
    if (isObjective(question)) continue
    const text = answerFor(question.id)
    // Tiptap's "empty" editor still serializes to a non-empty string like "<p></p>" - strip tags
    // before deciding whether there's real content (see TeacherMarkingCanvas.vue for the same fix).
    // the mark sheet: ruled paper, in handwriting if the learner chose it
    const look = answerLook(question.answer?.answer_style)
    if ((look.handwriting || look.modern) && !handwritingFontReady.value) continue
    if (!text || !htmlToPlainText(text).trim()) continue
    const phone = phoneSheetWidth.value > 0 && !hasTypedMarks(question)
    const width = phone ? phoneSheetWidth.value : sheetWidth(question.answer?.answer_style)
    // the phone layout is the wide page's look (normal-size writing) at the phone's width
    map[question.id] = { ...createTypedAnswerLayer(text, width, phone ? { ...look, wide: true, modern: look.modern || !look.handwriting } : look), width, phone }
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

// FreeResponseAnswer.vue silently auto-uploads a blank placeholder (named "Assignment file.*" or
// "Blank canvas.png") for every free-response question on mount, purely so its Write-mode canvas
// is ready immediately - a student who only typed their answer still ends up with this attachment
// on record. Showing it here as if it were real evidence is exactly the "blank page I never
// chose" confusion - only show a placeholder-named attachment if the student actually drew/wrote
// on it (real annotation objects), matching the same signal used for the answered/progress
// checks in AssignmentAnswer.vue.
function hasAnswerAnnotations(question: any): boolean {
  const pages = question.answer_annotations || {}
  return Object.values(pages).some((layer: any) => (layer?.objects?.length || 0) > 0)
}

function showPdf(question: any): boolean {
  if (question.response_type === 'pdf_annotation') return true
  if (!question.answer?.student_attachment_path) return false
  if (!isPlaceholderAttachmentName(question.answer?.student_attachment_original_name)) return true
  return hasAnswerAnnotations(question)
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

// Additional files have no question/answer stacking (students never draw on them, only upload
// them - see FreeResponseAnswer.vue) so the only readonly layer is whatever the teacher marked.
function additionalFilePdfLayers(file: any): Record<number, AnnotationLayerJSON[]> {
  const pages = file.marking_annotations || {}
  const result: Record<number, AnnotationLayerJSON[]> = {}
  for (const page of Object.keys(pages).map(Number)) {
    result[page] = [pages[page] || { objects: [] }]
  }
  if (Object.keys(result).length === 0) result[1] = [{ objects: [] }]
  return result
}

interface ResultGalleryItem {
  key: string
  path: string
  originalName: string
  fileType: 'image' | 'pdf' | 'document'
  isPrimary: boolean
  file?: any
}

// Unifies the single primary evidence upload with every "additional file" into one gallery,
// with no visual distinction between them - matches the merged upload gallery in
// FreeResponseAnswer.vue.
function galleryFilesFor(question: any): ResultGalleryItem[] {
  const items: ResultGalleryItem[] = []
  if (showPdf(question)) {
    items.push({
      key: 'primary',
      path: pdfUrlFor(question),
      originalName: question.answer?.student_attachment_original_name || 'Uploaded file',
      fileType: isEvidenceImage(question) ? 'image' : 'pdf',
      isPrimary: true
    })
  }
  for (const file of question.answer_attachments || []) {
    items.push({
      key: `file-${file.id}`,
      path: resolveAssetUrl(file.path),
      originalName: file.original_name,
      fileType: file.file_type,
      isPrimary: false,
      file
    })
  }
  return items
}

function measureImages() {
  for (const question of questions.value) {
    if (showPdf(question) && isEvidenceImage(question)) {
      const img = new Image()
      img.onload = () => {
        evidenceImageDims.value[question.id] = { width: img.naturalWidth, height: img.naturalHeight }
      }
      img.src = pdfUrlFor(question)
    }

    for (const file of question.answer_attachments || []) {
      if (file.file_type !== 'image') continue
      const img = new Image()
      img.onload = () => {
        additionalFileImageDims.value[file.id] = { width: img.naturalWidth, height: img.naturalHeight }
      }
      img.src = resolveAssetUrl(file.path)
    }
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
      school.value = response.data.data.school || null
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

<style>
/* the mark sheet as a sheet of paper: soft edge, a little lift, the paper's own width */
.mark-sheet-frame {
  /* as wide as the PDF pages beside it: their 1200px page + 8px border each side */
  max-width: 1216px;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background: #fff;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -12px rgba(15, 23, 42, 0.18);
}
html.dark .mark-sheet-frame {
  border-color: #374151;
}
</style>

<style scoped>
/* The result's certificate: cream paper inside a thin gold frame */
.result-cert {
  position: relative;
  padding: 1.25rem 1.25rem 1.4rem;
  border-radius: 1rem;
  background: #fdfaf3;
  border: 1px solid #edc95a;
  box-shadow: inset 0 0 0 4px #fdfaf3, inset 0 0 0 5px rgba(217, 165, 32, 0.45), 0 1px 3px rgba(12, 24, 66, 0.08);
}
.dark .result-cert { background: #14223f; border-color: rgba(217, 165, 32, 0.5); box-shadow: inset 0 0 0 4px #14223f, inset 0 0 0 5px rgba(217, 165, 32, 0.3); }
.cert-seal {
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 9999px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.35), 0 2px 6px rgba(0, 0, 0, 0.15);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.cert-seal-gold {
  color: #4a3705;
  background: radial-gradient(circle at 35% 30%, #faeec6, #e5b836 55%, #b8871a);
  box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.45), 0 0 0 3px #d9a520, 0 3px 8px rgba(138, 98, 0, 0.35);
}
@media (min-width: 640px) { .cert-seal { width: 6.5rem; height: 6.5rem; } }
</style>
