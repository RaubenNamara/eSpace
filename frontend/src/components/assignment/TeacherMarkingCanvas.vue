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

    <!-- Submitted evidence: every file the student provided (the primary upload plus any
         additional files) shown as one thumbnail strip, all viewed/marked in the same single
         canvas below - only the selected file's canvas is ever mounted at a time. -->
    <template v-if="allFiles.length">
      <p class="teacher-marking-canvas__section-label" :class="{ 'teacher-marking-canvas__section-label--spaced': typedAnswerLayerInfo }">Submitted evidence</p>

      <div v-if="allFiles.length > 1" class="teacher-marking-canvas__gallery">
        <button
          v-for="file in allFiles"
          :key="file.key"
          type="button"
          class="teacher-marking-canvas__gallery-thumb"
          :class="{ 'teacher-marking-canvas__gallery-thumb--active': file.key === selectedKey }"
          :title="`View ${file.label}`"
          @click="selectedKey = file.key"
        >
          <img v-if="file.fileType === 'image'" :src="file.url" alt="" class="teacher-marking-canvas__gallery-thumb-img">
          <span v-else class="teacher-marking-canvas__gallery-thumb-icon" aria-hidden="true">📄</span>
          <span class="teacher-marking-canvas__gallery-thumb-name">{{ file.label }}</span>
        </button>
      </div>

      <template v-if="selectedFile">
        <AnnotationToolbar
          variant="marking"
          :tool="evidenceTool"
          :color="evidenceColor"
          :stroke-width="evidenceStrokeWidth"
          @update:tool="evidenceTool = $event"
          @update:color="evidenceColor = $event"
          @update:stroke-width="evidenceStrokeWidth = $event"
          @undo="evidenceRef?.undo()"
          @redo="evidenceRef?.redo()"
          @clear-all="evidenceRef?.clearAll()"
          @clear-selected="evidenceRef?.clearSelected()"
        />
        <div v-if="evidenceSaveStatus" class="teacher-marking-canvas__status">{{ evidenceSaveStatus }}</div>
        <div class="teacher-marking-canvas__workspace">
          <AnnotationCanvas
            v-if="selectedFile.fileType === 'image'"
            :key="selectedFile.key"
            ref="evidenceRef"
            :background="selectedFile.url"
            :width="evidenceImageDims.width"
            :height="evidenceImageDims.height"
            :readonly-layers="selectedFile.isPrimary ? combinedReadonlyLayer(1) : []"
            :editable-layer="markingLayersByKey[selectedFile.key]?.[1] || { objects: [] }"
            mode="teacher-marking"
            :tool="evidenceTool"
            :color="evidenceColor"
            :stroke-width="evidenceStrokeWidth"
            @update:editable-layer="onEvidenceImageLayerChange"
          />
          <PdfAnnotationViewer
            v-else
            :key="selectedFile.key"
            ref="evidenceRef"
            :pdf-url="selectedFile.url"
            :readonly-layers-by-page="selectedFile.isPrimary ? pdfReadonlyLayersByPage : {}"
            :editable-layer-by-page="markingLayersByKey[selectedFile.key] || {}"
            mode="teacher-marking"
            :tool="evidenceTool"
            :color="evidenceColor"
            :stroke-width="evidenceStrokeWidth"
            @update:editable-layer-by-page="onEvidencePdfLayersChange"
          />
        </div>
      </template>
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
import { createTypedAnswerLayer, htmlToPlainText } from '@/composables/useAnnotationCanvas'
import { resolveAssetUrl } from '@/utils/url'
import { isPlaceholderAttachmentName } from '@/utils/answerAttachment'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

interface Props {
  question: AssignmentQuestion & {
    question_annotations?: Record<number, AnnotationLayerJSON>
    answer_annotations?: Record<number, AnnotationLayerJSON>
    marking_annotations?: Record<number, AnnotationLayerJSON>
    answer?: { answer_mode?: 'typed' | 'canvas' | 'pdf_upload' | 'image_upload'; student_attachment_path?: string; student_attachment_original_name?: string; answer_text?: string } | null
    answer_attachments?: { id: number; path: string; original_name: string; file_type: 'pdf' | 'image'; marking_annotations?: Record<number, AnnotationLayerJSON> }[]
  }
  assignmentId: number
  submissionId: number
}

const props = defineProps<Props>()

// Rasterized as a read-only Fabric layer (not shown as plain HTML) so the marking canvas stacked
// on top of it gives the teacher a real annotation surface directly over the student's own words.
const typedAnswerLayerInfo = computed(() => {
  const text = props.question.answer?.answer_text
  // Typed answers are now Tiptap-authored HTML - an "empty" editor still serializes to a
  // non-empty string like "<p></p>", so a plain truthy check would show this section for a
  // student who never typed anything. Strip tags before deciding whether there's real content.
  if (!text || !htmlToPlainText(text).trim()) return null
  return createTypedAnswerLayer(text, 800)
})

// Stable array reference (not a fresh array literal in the template) - AnnotationCanvas re-runs
// its readonly-layer setup whenever this reference changes, which raced with itself badly enough
// on this exact layer during development that the text never actually finished loading.
const typedAnswerReadonlyLayers = computed(() => (typedAnswerLayerInfo.value ? [typedAnswerLayerInfo.value.layer] : []))

const API_BASE = '/api'

const typedRef = ref<any>(null)
const typedTool = ref<AnnotationTool>('pen')
const typedColor = ref('#dc2626')
const typedStrokeWidth = ref(3)
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

let typedSaveTimeout: number | null = null

function onTypedAnswerLayerChange(layer: AnnotationLayerJSON) {
  markingLayer.value = { ...markingLayer.value, [TYPED_ANSWER_PAGE]: layer }
  typedSaveStatus.value = 'Unsaved changes'
  if (typedSaveTimeout) clearTimeout(typedSaveTimeout)
  typedSaveTimeout = window.setTimeout(async () => {
    typedSaveStatus.value = 'Saving…'
    try {
      await axios.put(`${API_BASE}/teacher/assignments/${props.assignmentId}/submissions/${props.submissionId}/marking-annotations`, {
        question_id: props.question.id,
        page_number: TYPED_ANSWER_PAGE,
        annotation_data: layer
      })
      typedSaveStatus.value = 'Saved'
    } catch {
      typedSaveStatus.value = 'Save failed'
    }
  }, 1500)
}

// Submitted evidence: every file the student provided - the single primary upload (the one Write
// mode bootstraps from, "attachmentId: null" server-side) plus any supplementary files from
// migration 084 - merged into one selectable list so the teacher marks them all in one canvas
// instead of two separate sections. Only one Fabric canvas is ever mounted here at once.
interface EvidenceFile {
  key: string
  attachmentId: number | null
  url: string
  fileType: 'pdf' | 'image'
  label: string
  isPrimary: boolean
}

// Teacher-locked pdf_annotation questions use the teacher's own attachment; a student's own
// uploaded PDF/image (from a free-response question) uses the file the student uploaded.
const primaryUrl = computed(() =>
  resolveAssetUrl(props.question.response_type === 'pdf_annotation' ? props.question.attachment_path : props.question.answer?.student_attachment_path)
)
// FreeResponseAnswer.vue silently auto-uploads a blank placeholder (named "Assignment file.*" or
// "Blank canvas.png") for every free-response question on mount, purely so the student's Write-
// mode canvas is ready immediately - a student who only typed their answer still ends up with
// this attachment on record. Showing it here as "Submitted evidence" makes it look like the
// student uploaded something they never touched - only treat a placeholder-named attachment as
// real evidence if the student actually drew/wrote on it (real annotation objects), matching the
// same signal used on the student's own result page.
const hasAnswerAnnotations = computed(() => {
  const pages = props.question.answer_annotations || {}
  return Object.values(pages).some(layer => (layer?.objects?.length || 0) > 0)
})
const hasPrimary = computed(() => {
  if (props.question.response_type === 'pdf_annotation') return true
  if (!props.question.answer?.student_attachment_path) return false
  if (!isPlaceholderAttachmentName(props.question.answer?.student_attachment_original_name)) return true
  return hasAnswerAnnotations.value
})
const isPrimaryImage = computed(() => IMAGE_EXTENSIONS.some(ext => primaryUrl.value.toLowerCase().endsWith(ext)))

const allFiles = computed<EvidenceFile[]>(() => {
  const files: EvidenceFile[] = []
  if (hasPrimary.value) {
    files.push({
      key: 'primary',
      attachmentId: null,
      url: primaryUrl.value,
      fileType: isPrimaryImage.value ? 'image' : 'pdf',
      label: props.question.answer?.student_attachment_original_name || 'Submitted file',
      isPrimary: true
    })
  }
  for (const f of props.question.answer_attachments || []) {
    files.push({ key: `af-${f.id}`, attachmentId: f.id, url: resolveAssetUrl(f.path), fileType: f.file_type, label: f.original_name, isPrimary: false })
  }
  return files
})

const selectedKey = ref<string | null>(allFiles.value[0]?.key ?? null)
const selectedFile = computed(() => allFiles.value.find(f => f.key === selectedKey.value) || null)

const evidenceRef = ref<any>(null)
const evidenceTool = ref<AnnotationTool>('pen')
const evidenceColor = ref('#dc2626')
const evidenceStrokeWidth = ref(3)
const evidenceSaveStatus = ref('')
const evidenceImageDims = ref({ width: 800, height: 1000 })

// Keyed the same way as `allFiles` above - 'primary' holds the legacy page-numbered layer
// (unchanged shape/meaning), each 'af-<id>' holds that one supplementary file's own pages.
const markingLayersByKey = ref<Record<string, Record<number, AnnotationLayerJSON>>>({
  primary: { ...(props.question.marking_annotations || {}) },
  ...Object.fromEntries((props.question.answer_attachments || []).map(f => [`af-${f.id}`, { ...(f.marking_annotations || {}) }]))
})

function measureEvidenceImage() {
  if (!selectedFile.value || selectedFile.value.fileType !== 'image' || !selectedFile.value.url) return
  const img = new Image()
  img.onload = () => {
    evidenceImageDims.value = { width: img.naturalWidth, height: img.naturalHeight }
  }
  img.src = selectedFile.value.url
}

watch(() => selectedFile.value?.url, measureEvidenceImage, { immediate: true })

let evidenceSaveTimeout: number | null = null

function persistEvidence(attachmentId: number | null, pageNumber: number, layer: AnnotationLayerJSON) {
  evidenceSaveStatus.value = 'Unsaved changes'
  if (evidenceSaveTimeout) clearTimeout(evidenceSaveTimeout)
  evidenceSaveTimeout = window.setTimeout(async () => {
    evidenceSaveStatus.value = 'Saving…'
    try {
      await axios.put(`${API_BASE}/teacher/assignments/${props.assignmentId}/submissions/${props.submissionId}/marking-annotations`, {
        question_id: props.question.id,
        page_number: pageNumber,
        attachment_id: attachmentId,
        annotation_data: layer
      })
      evidenceSaveStatus.value = 'Saved'
    } catch {
      evidenceSaveStatus.value = 'Save failed'
    }
  }, 1500)
}

function onEvidenceImageLayerChange(layer: AnnotationLayerJSON) {
  const file = selectedFile.value
  if (!file) return
  markingLayersByKey.value = {
    ...markingLayersByKey.value,
    [file.key]: { ...(markingLayersByKey.value[file.key] || {}), 1: layer }
  }
  persistEvidence(file.attachmentId, 1, layer)
}

function onEvidencePdfLayersChange(pages: Record<number, AnnotationLayerJSON>) {
  const file = selectedFile.value
  if (!file) return
  const prev = markingLayersByKey.value[file.key] || {}
  const changedPage = Number(Object.keys(pages).find(p => pages[Number(p)] !== prev[Number(p)]) || 1)
  markingLayersByKey.value = { ...markingLayersByKey.value, [file.key]: { ...prev, ...pages } }
  persistEvidence(file.attachmentId, changedPage, pages[changedPage] || { objects: [] })
}
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

.teacher-marking-canvas__gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 10px;
}

.teacher-marking-canvas__gallery-thumb {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
  cursor: pointer;
  overflow: hidden;
}

:global(.dark) .teacher-marking-canvas__gallery-thumb {
  border-color: #4b5563;
  background: #1f2937;
}

.teacher-marking-canvas__gallery-thumb--active {
  border-color: #dc2626;
  background: #fef2f2;
}

:global(.dark) .teacher-marking-canvas__gallery-thumb--active {
  background: rgba(220, 38, 38, 0.12);
}

.teacher-marking-canvas__gallery-thumb-img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 4px;
}

.teacher-marking-canvas__gallery-thumb-icon {
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.teacher-marking-canvas__gallery-thumb-name {
  font-size: 11px;
  color: #6b7280;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

:global(.dark) .teacher-marking-canvas__gallery-thumb-name {
  color: #9ca3af;
}
</style>
