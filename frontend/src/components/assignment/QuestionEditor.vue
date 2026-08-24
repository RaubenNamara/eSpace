<template>
  <div class="question-editor">
    <div v-if="!questionId" class="question-editor__notice">
      Save this assignment as a draft first, then reopen this question to upload an image/PDF and annotate it.
    </div>

    <template v-else>
      <div v-if="!attachmentPath" class="question-editor__upload">
        <label class="question-editor__upload-btn">
          <input type="file" accept="image/jpeg,image/png,image/gif,image/webp,application/pdf" class="hidden" @change="onFileSelected">
          {{ uploading ? 'Uploading…' : `Upload ${responseType === 'pdf_annotation' ? 'PDF' : 'Image'}` }}
        </label>
        <p v-if="uploadError" class="question-editor__error">{{ uploadError }}</p>
      </div>

      <template v-else>
        <AnnotationToolbar
          variant="author"
          :tool="tool"
          :color="color"
          :stroke-width="strokeWidth"
          @update:tool="tool = $event"
          @update:color="color = $event"
          @update:stroke-width="strokeWidth = $event"
          @undo="callEditor('undo')"
          @redo="callEditor('redo')"
          @clear-all="callEditor('clearAll')"
          @clear-selected="callEditor('clearSelected')"
        />

        <div class="question-editor__save-status">{{ saveStatus }}</div>

        <div class="question-editor__workspace">
          <PdfAnnotationViewer
            v-if="attachmentType === 'pdf'"
            ref="editorRef"
            :pdf-url="fullAttachmentUrl"
            :editable-layer-by-page="pagesLayer"
            mode="teacher-question"
            :tool="tool"
            :color="color"
            :stroke-width="strokeWidth"
            @update:editable-layer-by-page="onPagesChange"
          />
          <AnnotationCanvas
            v-else
            ref="editorRef"
            :background="fullAttachmentUrl"
            :width="imageDims.width"
            :height="imageDims.height"
            :editable-layer="pagesLayer[1] || { objects: [] }"
            mode="teacher-question"
            :tool="tool"
            :color="color"
            :stroke-width="strokeWidth"
            @update:editable-layer="onImageLayerChange"
          />
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import type { AnnotationLayerJSON, AnnotationTool, AttachmentType, ResponseType } from '@/types'
import AnnotationToolbar from './AnnotationToolbar.vue'
import AnnotationCanvas from './AnnotationCanvas.vue'
import PdfAnnotationViewer from './PdfAnnotationViewer.vue'

interface Props {
  questionId: number | null
  attachmentPath?: string | null
  attachmentType?: AttachmentType
  responseType: ResponseType
}

const props = withDefaults(defineProps<Props>(), {
  attachmentPath: null,
  attachmentType: 'none'
})

const emit = defineEmits<{
  (e: 'update:attachmentPath', path: string): void
  (e: 'update:attachmentType', type: AttachmentType): void
}>()

const API_BASE = '/api'

const uploading = ref(false)
const uploadError = ref<string | null>(null)
const editorRef = ref<InstanceType<typeof AnnotationCanvas> | InstanceType<typeof PdfAnnotationViewer> | null>(null)

const tool = ref<AnnotationTool>('pen')
const color = ref('#000000')
const strokeWidth = ref(3)
const saveStatus = ref('')

const pagesLayer = ref<Record<number, AnnotationLayerJSON>>({})
const imageDims = ref({ width: 800, height: 600 })

const fullAttachmentUrl = computed(() => props.attachmentPath || '')

function callEditor(method: 'undo' | 'redo' | 'clearAll' | 'clearSelected') {
  ;(editorRef.value as any)?.[method]?.()
}

async function onFileSelected(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !props.questionId) return

  uploading.value = true
  uploadError.value = null

  try {
    const formData = new FormData()
    formData.append('attachment', file)

    const response = await axios.post(`${API_BASE}/teacher/assignments/questions/${props.questionId}/attachment`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    if (response.data.success) {
      emit('update:attachmentPath', response.data.data.attachment_path)
      emit('update:attachmentType', response.data.data.attachment_type)
    } else {
      uploadError.value = response.data.message || 'Upload failed'
    }
  } catch (err: any) {
    uploadError.value = err.response?.data?.message || 'Upload failed'
  } finally {
    uploading.value = false
  }
}

async function loadAnnotations() {
  if (!props.questionId || !props.attachmentPath) return
  try {
    const response = await axios.get(`${API_BASE}/teacher/assignments/questions/${props.questionId}/annotations`)
    if (response.data.success) {
      pagesLayer.value = response.data.data.pages || {}
    }
  } catch {
    // No annotations saved yet is not an error condition worth surfacing.
  }
}

let saveTimeout: number | null = null

function scheduleSave(pageNumber: number, layer: AnnotationLayerJSON) {
  saveStatus.value = 'Saving…'
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = window.setTimeout(async () => {
    try {
      await axios.put(`${API_BASE}/teacher/assignments/questions/${props.questionId}/annotations`, {
        page_number: pageNumber,
        annotation_data: layer
      })
      saveStatus.value = 'Saved'
    } catch {
      saveStatus.value = 'Save failed'
    }
  }, 1500)
}

function onImageLayerChange(layer: AnnotationLayerJSON) {
  pagesLayer.value = { ...pagesLayer.value, 1: layer }
  scheduleSave(1, layer)
}

function onPagesChange(pages: Record<number, AnnotationLayerJSON>) {
  const changedPage = Number(Object.keys(pages).find(p => pages[Number(p)] !== pagesLayer.value[Number(p)]) || 1)
  pagesLayer.value = pages
  scheduleSave(changedPage, pages[changedPage] || { objects: [] })
}

function measureImage() {
  if (props.attachmentType !== 'image' || !props.attachmentPath) return
  const img = new Image()
  img.onload = () => {
    imageDims.value = { width: img.naturalWidth, height: img.naturalHeight }
  }
  img.src = props.attachmentPath
}

watch(() => props.attachmentPath, () => {
  measureImage()
  loadAnnotations()
})

onMounted(() => {
  measureImage()
  loadAnnotations()
})
</script>

<style scoped>
.question-editor {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

:global(.dark) .question-editor {
  border-color: #374151;
}

.question-editor__notice {
  padding: 16px;
  font-size: 13px;
  color: #92400e;
  background-color: #fef3c7;
}

.question-editor__upload {
  padding: 24px;
  text-align: center;
}

.question-editor__upload-btn {
  display: inline-block;
  padding: 8px 16px;
  background-color: #6366f1;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.hidden {
  display: none;
}

.question-editor__error {
  margin-top: 8px;
  font-size: 13px;
  color: #dc2626;
}

.question-editor__save-status {
  padding: 4px 12px;
  font-size: 12px;
  color: #6b7280;
  background-color: #f9fafb;
}

:global(.dark) .question-editor__save-status {
  background-color: #111827;
  color: #9ca3af;
}

.question-editor__workspace {
  /* explicit height (not max-height) so percentage-height children like
     PdfAnnotationViewer's internal layout can size against it reliably,
     including before any page has rendered */
  height: min(500px, 65vh);
  min-height: 320px;
  overflow: auto;
}

@media (max-width: 640px) {
  .question-editor__workspace {
    height: min(420px, 60vh);
    min-height: 260px;
  }
}
</style>
