<template>
  <div class="question-renderer">
    <AnnotationToolbar
      v-if="!readonly"
      variant="answer"
      :tool="tool"
      :color="color"
      :stroke-width="strokeWidth"
      @update:tool="tool = $event"
      @update:color="color = $event"
      @update:stroke-width="strokeWidth = $event"
      @undo="callActive('undo')"
      @redo="callActive('redo')"
      @clear-all="callActive('clearAll')"
      @clear-selected="callActive('clearSelected')"
    />

    <div v-if="saveStatus" class="question-renderer__status">{{ saveStatus }}</div>

    <div class="question-renderer__workspace">
      <StudentAnswerCanvas
        v-if="question.response_type === 'canvas'"
        ref="activeRef"
        :assignment-id="assignmentId"
        :question-id="question.id"
        :background="resolveAssetUrl(question.attachment_path) || null"
        :width="imageDims.width"
        :height="imageDims.height"
        :teacher-layer="normalizedTeacherLayer"
        :initial-layer="normalizedAnswerLayer"
        :tool="tool"
        :color="color"
        :stroke-width="strokeWidth"
        :readonly="readonly || locked"
        @submission-id="$emit('submission-id', $event)"
        @locked="locked = true; $emit('locked')"
      />

      <PdfAnnotationViewer
        v-else-if="question.response_type === 'pdf_annotation'"
        ref="activeRef"
        :pdf-url="resolveAssetUrl(question.attachment_path)"
        :readonly-layers-by-page="teacherLayersByPage"
        :editable-layer-by-page="editableLayerByPage"
        mode="student-answer"
        :tool="tool"
        :color="color"
        :stroke-width="strokeWidth"
        :readonly="readonly || locked"
        @update:editable-layer-by-page="onPdfLayersChange"
      />
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
import { resolveAssetUrl } from '@/utils/url'

interface Props {
  question: AssignmentQuestion
  assignmentId: number
  answerAnnotations?: Record<number, AnnotationLayerJSON>
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  answerAnnotations: () => ({}),
  readonly: false
})

const emit = defineEmits<{
  (e: 'submission-id', id: number): void
  (e: 'locked'): void
}>()

const API_BASE = '/api'

const activeRef = ref<any>(null)
const tool = ref<AnnotationTool>('pen')
const color = ref('#000000')
const strokeWidth = ref(3)
const saveStatus = ref('')
const locked = ref(false)
const imageDims = ref({ width: 800, height: 600 })
const editableLayerByPage = ref<Record<number, AnnotationLayerJSON>>({ ...props.answerAnnotations })

const teacherLayersByPage = computed(() => {
  const pages = props.question.question_annotations || {}
  const result: Record<number, AnnotationLayerJSON[]> = {}
  for (const page of Object.keys(pages)) {
    result[Number(page)] = [pages[Number(page)]]
  }
  return result
})

// Use a stable reference for normalized layers to prevent unnecessary re-renders
// Cache the result to avoid creating new object references on every render
const teacherLayerCache = ref<AnnotationLayerJSON>({ objects: [] })
const answerLayerCache = ref<AnnotationLayerJSON>({ objects: [] })

const normalizedTeacherLayer = computed(() => {
  const raw = props.question.question_annotations?.[1]
  if (!raw) return { objects: [] }
  // If it's already in the correct format, return it as-is
  if (!Array.isArray(raw) && raw.objects) return raw
  // Otherwise, convert array to the expected format
  const result = { objects: Array.isArray(raw) ? raw : [] }
  // Only update cache if the content actually changed
  if (JSON.stringify(result) !== JSON.stringify(teacherLayerCache.value)) {
    teacherLayerCache.value = result
  }
  return teacherLayerCache.value
})

const normalizedAnswerLayer = computed(() => {
  const raw = props.answerAnnotations[1]
  if (!raw) return { objects: [] }
  // If it's already in the correct format, return it as-is
  if (!Array.isArray(raw) && raw.objects) return raw
  // Otherwise, convert array to the expected format
  const result = { objects: Array.isArray(raw) ? raw : [] }
  // Only update cache if the content actually changed
  if (JSON.stringify(result) !== JSON.stringify(answerLayerCache.value)) {
    answerLayerCache.value = result
  }
  return answerLayerCache.value
})

function callActive(method: 'undo' | 'redo' | 'clearAll' | 'clearSelected') {
  activeRef.value?.[method]?.()
}

let saveTimeout: number | null = null

function onPdfLayersChange(pages: Record<number, AnnotationLayerJSON>) {
  const changedPage = Number(
    Object.keys(pages).find(p => pages[Number(p)] !== editableLayerByPage.value[Number(p)]) || 1
  )
  editableLayerByPage.value = pages
  saveStatus.value = 'Unsaved changes'

  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = window.setTimeout(async () => {
    saveStatus.value = 'Saving…'
    try {
      const response = await axios.post(`${API_BASE}/student/assignments/questions/${props.question.id}/answer-annotations`, {
        assignment_id: props.assignmentId,
        page_number: changedPage,
        annotation_data: pages[changedPage] || { objects: [] }
      })
      if (response.data.data?.submission_id) {
        emit('submission-id', response.data.data.submission_id)
      }
      saveStatus.value = 'Saved'
    } catch (err: any) {
      if (err.response?.status === 403) {
        locked.value = true
        saveStatus.value = 'This attempt is already submitted - not saved'
        emit('locked')
      } else {
        saveStatus.value = 'Save failed'
      }
    }
  }, 1500)
}

function measureImage() {
  if (props.question.response_type !== 'canvas' || !props.question.attachment_path) return
  const img = new Image()
  img.onload = () => {
    imageDims.value = { width: img.naturalWidth, height: img.naturalHeight }
  }
  img.src = resolveAssetUrl(props.question.attachment_path)
}

watch(() => props.question.attachment_path, measureImage)

onMounted(measureImage)
</script>

<style scoped>
.question-renderer__status {
  padding: 4px 12px;
  font-size: 12px;
  color: #6b7280;
}

:global(.dark) .question-renderer__status {
  color: #9ca3af;
}

.question-renderer__workspace {
  /* explicit height (not max-height) so percentage-height children like
     PdfAnnotationViewer's internal layout can size against it reliably,
     including before any page has rendered */
  height: min(600px, 70vh);
  min-height: 320px;
  overflow: auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

:global(.dark) .question-renderer__workspace {
  border-color: #374151;
}

@media (max-width: 640px) {
  .question-renderer__workspace {
    height: min(420px, 60vh);
    min-height: 260px;
  }
}
</style>
