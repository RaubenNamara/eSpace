<template>
  <div class="space-y-6">
    <!-- The question itself, when the teacher uploaded a PDF instead of typing it out - shown
         plainly (not as an editable canvas) so the student reads it like a normal PDF, separate
         from their own answer/drawing workspace further down. -->
    <div v-if="questionPdfUrl">
      <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Question (PDF)</label>
      <div class="w-full aspect-[210/297] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <PdfAnnotationViewer :pdf-url="questionPdfUrl" mode="readonly" readonly />
      </div>
    </div>

    <!-- Answer method selector -->
    <div>
      <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-1.5">
        <span aria-hidden="true">✏️</span> Answer the Question
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Choose how you want to answer:</p>
      <AnswerModeSelector v-model="answerMode" :readonly="readonly" />
    </div>

    <!-- Unified answer workspace - only the selected mode is shown at a time, but nothing in the
         other two modes' data is ever cleared, so switching modes never loses work. -->
    <div>
      <template v-if="answerMode === 'type'">
        <p class="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
          <span aria-hidden="true">⌨️</span> Type your Answer
        </p>
        <TypedAnswerEditor
          :model-value="modelValue"
          :readonly="readonly"
          :placeholder="placeholder"
          @update:model-value="$emit('update:modelValue', $event)"
        />
      </template>

      <template v-else-if="answerMode === 'write'">
        <p class="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
          <span aria-hidden="true">✍️</span> Write
        </p>
        <p v-if="autoCreating" class="text-sm text-gray-500 dark:text-gray-400">Preparing your workspace…</p>
        <div v-else-if="attachment" class="free-response-answer__panel">
          <AnnotationToolbar
            v-if="!readonly"
            variant="answer"
            simplified
            :tool="pdfTool"
            :color="pdfColor"
            :stroke-width="pdfStrokeWidth"
            :status-label="pdfSaveStatus"
            @update:tool="pdfTool = $event"
            @update:color="pdfColor = $event"
            @update:stroke-width="pdfStrokeWidth = $event"
            @undo="pdfRef?.undo()"
            @redo="pdfRef?.redo()"
            @clear-all="pdfRef?.clearAll()"
            @clear-selected="pdfRef?.clearSelected()"
          />
          <div class="free-response-answer__workspace">
            <StudentAnswerCanvas
              v-if="isImageAttachment"
              ref="pdfRef"
              :assignment-id="assignmentId"
              :question-id="question.id"
              :background="resolveAssetUrl(attachment.path)"
              :width="imageDims.width"
              :height="imageDims.height"
              :page-number="1"
              :initial-layer="pdfLayers[1] || { objects: [] }"
              :tool="pdfTool"
              :color="pdfColor"
              :stroke-width="pdfStrokeWidth"
              :readonly="readonly"
              hide-status
              @submission-id="$emit('submission-id', $event)"
              @locked="$emit('locked')"
              @status-change="pdfSaveStatus = $event"
            />
            <PdfAnnotationViewer
              v-else
              ref="pdfRef"
              :pdf-url="resolveAssetUrl(attachment.path)"
              :editable-layer-by-page="pdfLayers"
              mode="student-answer"
              :tool="pdfTool"
              :color="pdfColor"
              :stroke-width="pdfStrokeWidth"
              :readonly="readonly"
              @update:editable-layer-by-page="onPdfLayersChange"
              @loaded="pdfPageCount = $event"
            />
          </div>
        </div>
        <p v-else-if="readonly" class="text-sm text-gray-500 dark:text-gray-400">No answer provided.</p>
        <p v-else class="text-sm text-gray-500 dark:text-gray-400">Use the tools above to write or draw your answer.</p>
      </template>

      <template v-else>
        <p class="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
          <span aria-hidden="true">📎</span> Upload your completed work
        </p>

        <p v-if="uploading" class="text-sm text-gray-500 dark:text-gray-400 mb-2">Uploading…</p>
        <p v-if="uploadError" class="text-sm text-red-600 dark:text-red-400 mb-2">{{ uploadError }}</p>

        <div v-if="attachment && attachment.originalName && !isPlaceholderAttachmentName(attachment.originalName)" class="free-response-answer__replace mb-3">
          <p class="text-sm text-gray-900 dark:text-white break-all">📄 {{ attachment.originalName }}</p>
          <div v-if="!readonly" class="flex items-center gap-3 shrink-0">
            <label class="free-response-answer__replace-btn">
              Replace File
              <input type="file" accept="application/pdf,image/jpeg,image/png,image/webp" class="hidden" :disabled="uploading" @change="onFileSelected">
            </label>
            <button type="button" class="free-response-answer__remove-btn" :disabled="uploading" @click="removeUpload">
              Remove File
            </button>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500 dark:text-gray-400 mb-2">No file uploaded yet.</p>

        <div
          v-if="!readonly"
          class="free-response-answer__dropzone"
          :class="{ 'free-response-answer__dropzone--active': isDragging }"
          @click="fileInputRef?.click()"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="onDrop"
        >
          <input ref="fileInputRef" type="file" accept="application/pdf,image/jpeg,image/png,image/webp" class="hidden" :disabled="uploading" @change="onFileSelected">
          <span class="free-response-answer__dropzone-icon">⬆</span>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Choose File</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">PDF, JPG, PNG, or WEBP files are supported.</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import type { AnnotationLayerJSON, AnnotationTool, AssignmentQuestion } from '@/types'
import AnnotationToolbar from './AnnotationToolbar.vue'
import StudentAnswerCanvas from './StudentAnswerCanvas.vue'
import PdfAnnotationViewer from './PdfAnnotationViewer.vue'
import AnswerModeSelector, { type AnswerMode } from './AnswerModeSelector.vue'
import TypedAnswerEditor from './TypedAnswerEditor.vue'
import { resolveAssetUrl } from '@/utils/url'
import { isPlaceholderAttachmentName } from '@/utils/answerAttachment'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

interface Props {
  question: AssignmentQuestion
  assignmentId: number
  modelValue: string
  initialAnnotations?: Record<number, AnnotationLayerJSON>
  initialAttachment?: { path: string; originalName?: string } | null
  readonly?: boolean
  rows?: number
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialAnnotations: () => ({}),
  initialAttachment: null,
  readonly: false,
  rows: 6,
  placeholder: 'Type your answer here...'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submission-id', id: number): void
  (e: 'locked'): void
  // Lets the parent's own "is this question answered" tracking (progress dots, submit
  // confirmation) react to an Upload-mode file the moment it's chosen, instead of only after
  // the next full page load re-fetches answerAttachmentByQuestion from the server.
  (e: 'update:attachment', value: { path: string; originalName?: string } | null): void
}>()

const API_BASE = '/api'

const attachment = ref(props.initialAttachment)
const uploading = ref(false)
const uploadError = ref('')
const isDragging = ref(false)
const autoCreating = ref(!props.readonly && !attachment.value)

const pdfTool = ref<AnnotationTool>('pen')
const pdfColor = ref('#000000')
const pdfStrokeWidth = ref(3)

const pdfRef = ref<InstanceType<typeof PdfAnnotationViewer> | InstanceType<typeof StudentAnswerCanvas> | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const pdfLayers = ref<Record<number, AnnotationLayerJSON>>({ ...props.initialAnnotations })
const pdfSaveStatus = ref('Ready to save')
const pdfPageCount = ref(0)
const imageDims = ref({ width: 800, height: 1000 })

// Which of the three answer channels is shown - purely a client-side UI preference, recomputed
// fresh on every load (not persisted), inferred from whichever channel already has real content
// so a returning student lands back on the view that matches their existing work.
function inferInitialMode(): AnswerMode {
  // A real (non-placeholder) upload is the most explicit, unambiguous signal - a student can
  // only end up with one by deliberately choosing a file, so it wins over the other channels.
  if (props.initialAttachment && !isPlaceholderAttachmentName(props.initialAttachment.originalName)) return 'upload'
  if ((props.question as any).response_type === 'pdf_annotation') return 'write'
  const plainText = (props.modelValue || '').replace(/<[^>]*>/g, '').trim()
  if (plainText.length > 0) return 'type'
  const hasDrawnContent = Object.values(props.initialAnnotations || {}).some(layer => (layer?.objects?.length || 0) > 0)
  if (hasDrawnContent) return 'write'
  return 'type'
}

const answerMode = ref<AnswerMode>(inferInitialMode())

const isImageAttachment = computed(() => {
  const path = attachment.value?.path || ''
  return IMAGE_EXTENSIONS.some(ext => path.toLowerCase().endsWith(ext))
})

// Every free-response question gets this blank sheet by default unless the teacher uploads
// their own - it isn't a real question document, so it's never shown as "the question" here.
const DEFAULT_ANSWER_DOCUMENT_PATH = '/uploads/defaults/default_answer_sheet.pdf'

const questionPdfUrl = computed(() => {
  const path = props.question.attachment_path
  if (!path || path === DEFAULT_ANSWER_DOCUMENT_PATH) return null
  if ((props.question as any).attachment_type !== 'pdf') return null
  return resolveAssetUrl(path)
})

function measureAttachmentImage() {
  if (!isImageAttachment.value || !attachment.value) return
  const img = new Image()
  img.onload = () => {
    imageDims.value = { width: img.naturalWidth, height: img.naturalHeight }
  }
  img.src = resolveAssetUrl(attachment.value.path)
}

watch(() => attachment.value?.path, measureAttachmentImage, { immediate: true })

async function uploadFile(file: File) {
  uploading.value = true
  uploadError.value = ''

  const formData = new FormData()
  formData.append('file', file)
  formData.append('assignment_id', String(props.assignmentId))

  try {
    const response = await axios.post(
      `${API_BASE}/student/assignments/questions/${props.question.id}/upload-answer-pdf`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    attachment.value = { path: response.data.data.path, originalName: response.data.data.original_name }
    emit('update:attachment', attachment.value)
    pdfLayers.value = {}
    if (response.data.data.submission_id) {
      emit('submission-id', response.data.data.submission_id)
    }
  } catch (err: any) {
    if (err.response?.status === 403) {
      emit('locked')
    }
    uploadError.value = err.response?.data?.message || 'Failed to upload file'
  } finally {
    uploading.value = false
  }
}

// The question itself (questionPdfUrl) is shown separately above when the teacher uploaded one -
// this workspace always starts from the plain default answer sheet instead, never a copy of the
// question PDF, so the two don't show the same document twice.
const startingDocPath = computed(() => questionPdfUrl.value ? DEFAULT_ANSWER_DOCUMENT_PATH : props.question.attachment_path)

// Builds and uploads the placeholder starting document - either a copy of the teacher's own
// starting doc (question.attachment_path), or a blank white page if the teacher didn't set one.
// Used both to seed a brand-new question (autoCreateBlankCanvas) and to restore a clean slate
// when the student removes their own upload (removeUpload).
async function uploadStartingDocument() {
  if (startingDocPath.value) {
    const response = await fetch(resolveAssetUrl(startingDocPath.value))
    const blob = await response.blob()
    const ext = startingDocPath.value.split('.').pop()?.split(/[?#]/)[0] || 'pdf'
    const mime = blob.type || (ext === 'pdf' ? 'application/pdf' : `image/${ext}`)
    const file = new File([blob], `Assignment file.${ext}`, { type: mime })
    await uploadFile(file)
    return
  }

  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 1000
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'))
  if (!blob) return

  const file = new File([blob], 'Blank canvas.png', { type: 'image/png' })
  await uploadFile(file)
}

// A question offers a drawing surface even before the student uploads their own file - rather
// than a separate always-blank canvas section (removed per an earlier request), a starting file
// is auto-uploaded into this same "PDF or image" slot the first time the student opens a question
// with nothing here yet, so the toolbar/canvas are ready to write or draw on immediately. Either
// way the student can still replace it via "Replace file", and since it becomes a real uploaded
// attachment, the teacher sees and can mark it exactly like any other uploaded evidence - no
// separate handling needed on the marking side.
async function autoCreateBlankCanvas() {
  if (props.readonly) {
    // Preview/oversight mode (teacher previewing before publish, HOD/admin reviewing) has no
    // real submission to upload into - just point straight at the starting document (if any) so
    // it's actually visible here, instead of silently showing "No file uploaded."
    if (!attachment.value && startingDocPath.value) {
      attachment.value = { path: startingDocPath.value }
    }
    autoCreating.value = false
    return
  }

  if (attachment.value) {
    autoCreating.value = false
    return
  }

  try {
    await uploadStartingDocument()
  } finally {
    autoCreating.value = false
  }
}

onMounted(autoCreateBlankCanvas)

function onFileSelected(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (file) uploadFile(file)
}

async function removeUpload() {
  if (props.readonly || uploading.value) return
  if (!window.confirm('Remove this file? This cannot be undone.')) return
  await uploadStartingDocument()
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) uploadFile(file)
}

let saveTimeout: number | null = null

function onPdfLayersChange(pages: Record<number, AnnotationLayerJSON>) {
  const changedPage = Number(
    Object.keys(pages).find(p => pages[Number(p)] !== pdfLayers.value[Number(p)]) || 1
  )
  pdfLayers.value = pages
  pdfSaveStatus.value = 'Unsaved changes'

  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = window.setTimeout(async () => {
    pdfSaveStatus.value = 'Saving…'
    try {
      const response = await axios.post(`${API_BASE}/student/assignments/questions/${props.question.id}/answer-annotations`, {
        assignment_id: props.assignmentId,
        page_number: changedPage,
        annotation_data: pages[changedPage] || { objects: [] }
      })
      if (response.data.data?.submission_id) {
        emit('submission-id', response.data.data.submission_id)
      }
      pdfSaveStatus.value = 'Saved'
    } catch (err: any) {
      if (err.response?.status === 403) {
        pdfSaveStatus.value = 'This attempt is already submitted - not saved'
        emit('locked')
      } else {
        pdfSaveStatus.value = 'Save failed'
      }
    }
  }, 1500)
}
</script>

<style scoped>
.free-response-answer__panel {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

:global(.dark) .free-response-answer__panel {
  border-color: #374151;
}

.free-response-answer__workspace {
  height: min(500px, 65vh);
  min-height: 280px;
  overflow: auto;
  background-image: linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px);
  background-size: 24px 24px;
}

:global(.dark) .free-response-answer__workspace {
  background-image: linear-gradient(#374151 1px, transparent 1px), linear-gradient(90deg, #374151 1px, transparent 1px);
}

@media (max-width: 640px) {
  .free-response-answer__workspace {
    height: min(360px, 55vh);
    min-height: 240px;
  }
}

.free-response-answer__dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 28px 16px;
  border: 2px dashed #c7d2fe;
  border-radius: 10px;
  background-color: #eef2ff;
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
}

:global(.dark) .free-response-answer__dropzone {
  border-color: #4338ca;
  background-color: rgba(99, 102, 241, 0.08);
}

.free-response-answer__dropzone--active {
  border-color: #6366f1;
  background-color: #e0e7ff;
}

:global(.dark) .free-response-answer__dropzone--active {
  background-color: rgba(99, 102, 241, 0.18);
}

.free-response-answer__dropzone-icon {
  font-size: 20px;
  color: #4f46e5;
}

:global(.dark) .free-response-answer__dropzone-icon {
  color: #a5b4fc;
}

.free-response-answer__replace {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 2px;
}

.free-response-answer__replace-btn {
  font-size: 12px;
  color: #4f46e5;
  cursor: pointer;
  white-space: nowrap;
}

:global(.dark) .free-response-answer__replace-btn {
  color: #a5b4fc;
}

.free-response-answer__remove-btn {
  font-size: 12px;
  color: #dc2626;
  cursor: pointer;
  white-space: nowrap;
  background: none;
  border: none;
  padding: 0;
}

.free-response-answer__remove-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

:global(.dark) .free-response-answer__remove-btn {
  color: #f87171;
}
</style>
