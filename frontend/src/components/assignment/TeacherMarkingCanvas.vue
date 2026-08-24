<template>
  <div class="teacher-marking-canvas">
    <!-- Typed answer, rendered as a read-only text layer so the teacher can circle/underline/
         comment directly on it with the same marking tools used everywhere else, instead of it
         being inert plain text with no annotation surface. -->
    <template v-if="typedAnswerLayerInfo">
      <p class="teacher-marking-canvas__section-label">Typed answer</p>
      <AnnotationToolbar
        variant="marking"
        :tool="typedTool"
        :color="typedColor"
        :stroke-width="typedStrokeWidth"
        @update:tool="typedTool = $event"
        @update:color="typedColor = $event"
        @update:stroke-width="typedStrokeWidth = $event"
        @undo="typedRef?.undo()"
        @redo="typedRef?.redo()"
        @clear-all="typedRef?.clearAll()"
        @clear-selected="typedRef?.clearSelected()"
      />
      <div v-if="typedSaveStatus" class="teacher-marking-canvas__status">{{ typedSaveStatus }}</div>
      <div class="teacher-marking-canvas__workspace teacher-marking-canvas__workspace--typed">
        <AnnotationCanvas
          ref="typedRef"
          :width="800"
          :height="typedAnswerLayerInfo.height"
          :readonly-layers="typedAnswerReadonlyLayers"
          :editable-layer="markingLayer[TYPED_ANSWER_PAGE] || { objects: [] }"
          mode="teacher-marking"
          :tool="typedTool"
          :color="typedColor"
          :stroke-width="typedStrokeWidth"
          @update:editable-layer="onTypedAnswerLayerChange"
        />
      </div>
    </template>

    <!-- PDF layer: teacher-locked pdf_annotation question, or the student's own uploaded PDF -->
    <template v-if="showPdf">
      <p class="teacher-marking-canvas__section-label" :class="{ 'teacher-marking-canvas__section-label--spaced': typedAnswerLayerInfo }">Submitted evidence</p>
      <AnnotationToolbar
        variant="marking"
        :tool="pdfTool"
        :color="pdfColor"
        :stroke-width="pdfStrokeWidth"
        @update:tool="pdfTool = $event"
        @update:color="pdfColor = $event"
        @update:stroke-width="pdfStrokeWidth = $event"
        @undo="pdfRef?.undo()"
        @redo="pdfRef?.redo()"
        @clear-all="pdfRef?.clearAll()"
        @clear-selected="pdfRef?.clearSelected()"
      />
      <div v-if="pdfSaveStatus" class="teacher-marking-canvas__status">{{ pdfSaveStatus }}</div>
      <div class="teacher-marking-canvas__workspace">
        <AnnotationCanvas
          v-if="isEvidenceImage"
          ref="pdfRef"
          :background="pdfUrl"
          :width="evidenceImageDims.width"
          :height="evidenceImageDims.height"
          :readonly-layers="evidenceReadonlyLayers"
          :editable-layer="markingLayer[1] || { objects: [] }"
          mode="teacher-marking"
          :tool="pdfTool"
          :color="pdfColor"
          :stroke-width="pdfStrokeWidth"
          @update:editable-layer="onEvidenceImageLayerChange"
        />
        <PdfAnnotationViewer
          v-else
          ref="pdfRef"
          :pdf-url="pdfUrl"
          :readonly-layers-by-page="pdfReadonlyLayersByPage"
          :editable-layer-by-page="markingLayer"
          mode="teacher-marking"
          :tool="pdfTool"
          :color="pdfColor"
          :stroke-width="pdfStrokeWidth"
          @update:editable-layer-by-page="onPdfLayersChange"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import type { AnnotationLayerJSON, AnnotationTool, AssignmentQuestion } from '@/types'
import { TYPED_ANSWER_PAGE } from '@/types'
import AnnotationToolbar from './AnnotationToolbar.vue'
import AnnotationCanvas from './AnnotationCanvas.vue'
import PdfAnnotationViewer from './PdfAnnotationViewer.vue'
import { createTypedAnswerLayer } from '@/composables/useAnnotationCanvas'
import { resolveAssetUrl } from '@/utils/url'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

interface Props {
  question: AssignmentQuestion & {
    question_annotations?: Record<number, AnnotationLayerJSON>
    answer_annotations?: Record<number, AnnotationLayerJSON>
    marking_annotations?: Record<number, AnnotationLayerJSON>
    answer?: { answer_mode?: 'typed' | 'canvas' | 'pdf_upload' | 'image_upload'; student_attachment_path?: string; answer_text?: string } | null
  }
  assignmentId: number
  submissionId: number
}

const props = defineProps<Props>()

// A free-response question always offers typed and PDF-upload input together (not a single
// locked mode) - show the PDF viewer for a teacher-locked 'pdf_annotation' question OR whenever
// the student uploaded their own PDF/image. (AssignmentSubmissions.vue only renders this
// component for non-objective questions in the first place.)
const showPdf = computed(() => props.question.response_type === 'pdf_annotation' || !!props.question.answer?.student_attachment_path)

// Rasterized as a read-only Fabric layer (not shown as plain HTML) so the marking canvas stacked
// on top of it gives the teacher a real annotation surface directly over the student's own words.
const typedAnswerLayerInfo = computed(() => {
  const text = props.question.answer?.answer_text
  return text ? createTypedAnswerLayer(text, 800) : null
})

// Stable array reference (not a fresh array literal in the template) - AnnotationCanvas re-runs
// its readonly-layer setup whenever this reference changes, which raced with itself badly enough
// on this exact layer during development that the text never actually finished loading.
const typedAnswerReadonlyLayers = computed(() => (typedAnswerLayerInfo.value ? [typedAnswerLayerInfo.value.layer] : []))

// Teacher-locked pdf_annotation questions use the teacher's attachment; a student's own
// uploaded PDF (from a free-response question) uses the file the student uploaded.
const pdfUrl = computed(() =>
  resolveAssetUrl(props.question.response_type === 'pdf_annotation' ? props.question.attachment_path : props.question.answer?.student_attachment_path)
)

// The student's own uploaded "evidence" file can be a PDF or a single image - an image can't be
// rendered by the pdf.js-based viewer, so it's drawn on with a plain AnnotationCanvas instead,
// at the same page-1 slot a single-page PDF would use.
const isEvidenceImage = computed(() => IMAGE_EXTENSIONS.some(ext => pdfUrl.value.toLowerCase().endsWith(ext)))
const evidenceImageDims = ref({ width: 800, height: 1000 })
const evidenceReadonlyLayers = computed(() => combinedReadonlyLayer(1))

const API_BASE = '/api'

const pdfRef = ref<any>(null)
const typedRef = ref<any>(null)
const pdfTool = ref<AnnotationTool>('pen')
const pdfColor = ref('#dc2626')
const pdfStrokeWidth = ref(3)
const typedTool = ref<AnnotationTool>('pen')
const typedColor = ref('#dc2626')
const typedStrokeWidth = ref(3)
const pdfSaveStatus = ref('')
const typedSaveStatus = ref('')

const markingLayer = ref<Record<number, AnnotationLayerJSON>>({ ...(props.question.marking_annotations || {}) })

function combinedReadonlyLayer(page: number): AnnotationLayerJSON[] {
  return [
    props.question.question_annotations?.[page] || { objects: [] },
    props.question.answer_annotations?.[page] || { objects: [] }
  ]
}

const pdfReadonlyLayersByPage = computed(() => {
  const pages = new Set([
    ...Object.keys(props.question.question_annotations || {}),
    ...Object.keys(props.question.answer_annotations || {})
  ].map(Number).filter(p => p >= 1))
  const result: Record<number, AnnotationLayerJSON[]> = {}
  for (const page of pages) {
    result[page] = [
      props.question.question_annotations?.[page] || { objects: [] },
      props.question.answer_annotations?.[page] || { objects: [] }
    ]
  }
  return result
})

let pdfSaveTimeout: number | null = null
let typedSaveTimeout: number | null = null

function persist(pageNumber: number, layer: AnnotationLayerJSON, statusRef: typeof pdfSaveStatus, timeoutHolder: 'pdf' | 'typed') {
  statusRef.value = 'Unsaved changes'
  const timeouts = { pdf: pdfSaveTimeout, typed: typedSaveTimeout }
  const existing = timeouts[timeoutHolder]
  if (existing) clearTimeout(existing)
  const timeout = window.setTimeout(async () => {
    statusRef.value = 'Saving…'
    try {
      await axios.put(`${API_BASE}/teacher/assignments/${props.assignmentId}/submissions/${props.submissionId}/marking-annotations`, {
        question_id: props.question.id,
        page_number: pageNumber,
        annotation_data: layer
      })
      statusRef.value = 'Saved'
    } catch {
      statusRef.value = 'Save failed'
    }
  }, 1500)
  if (timeoutHolder === 'pdf') pdfSaveTimeout = timeout
  else typedSaveTimeout = timeout
}

function onTypedAnswerLayerChange(layer: AnnotationLayerJSON) {
  markingLayer.value = { ...markingLayer.value, [TYPED_ANSWER_PAGE]: layer }
  persist(TYPED_ANSWER_PAGE, layer, typedSaveStatus, 'typed')
}

function onEvidenceImageLayerChange(layer: AnnotationLayerJSON) {
  markingLayer.value = { ...markingLayer.value, 1: layer }
  persist(1, layer, pdfSaveStatus, 'pdf')
}

function onPdfLayersChange(pages: Record<number, AnnotationLayerJSON>) {
  const changedPage = Number(
    Object.keys(pages).find(p => pages[Number(p)] !== markingLayer.value[Number(p)]) || 1
  )
  markingLayer.value = { ...markingLayer.value, ...pages }
  persist(changedPage, pages[changedPage] || { objects: [] }, pdfSaveStatus, 'pdf')
}

function measureEvidenceImage() {
  if (!isEvidenceImage.value || !pdfUrl.value) return
  const img = new Image()
  img.onload = () => {
    evidenceImageDims.value = { width: img.naturalWidth, height: img.naturalHeight }
  }
  img.src = pdfUrl.value
}

watch(pdfUrl, measureEvidenceImage, { immediate: true })
</script>

<style scoped>
.teacher-marking-canvas__section-label {
  padding: 0 0 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #6b7280;
}

.teacher-marking-canvas__section-label--spaced {
  margin-top: 16px;
}

:global(.dark) .teacher-marking-canvas__section-label {
  color: #9ca3af;
}

.teacher-marking-canvas__status {
  padding: 4px 12px;
  font-size: 12px;
  color: #6b7280;
}

:global(.dark) .teacher-marking-canvas__status {
  color: #9ca3af;
}

.teacher-marking-canvas__workspace {
  /* explicit height (not max-height) so percentage-height children like
     PdfAnnotationViewer's internal layout can size against it reliably,
     including before any page has rendered */
  height: min(600px, 70vh);
  min-height: 320px;
  overflow: auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

:global(.dark) .teacher-marking-canvas__workspace {
  border-color: #374151;
}

@media (max-width: 640px) {
  .teacher-marking-canvas__workspace {
    height: min(420px, 60vh);
    min-height: 260px;
  }
}

/* The typed-answer canvas is sized to fit its text exactly (see createTypedAnswerLayer), so it
   should never scroll/clip internally like the fixed-height evidence workspaces above it. */
.teacher-marking-canvas__workspace--typed {
  height: auto;
  min-height: 0;
  overflow: visible;
}
</style>
