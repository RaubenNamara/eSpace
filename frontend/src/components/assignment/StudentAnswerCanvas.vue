<template>
  <div class="student-answer-canvas">
    <div v-if="!hideStatus" class="student-answer-canvas__status">{{ saveStatus }}</div>
    <AnnotationCanvas
      ref="canvasRef"
      :background="background"
      :width="width"
      :height="height"
      :readonly-layers="staticReadonlyLayers"
      :editable-layer="staticEditableLayer"
      mode="student-answer"
      :tool="tool"
      :color="color"
      :stroke-width="strokeWidth"
      :readonly="readonly || locked"
      @update:editable-layer="onLayerChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import type { AnnotationLayerJSON, AnnotationTool } from '@/types'
import { EMPTY_ANNOTATION_LAYER } from '@/types'
import AnnotationCanvas from './AnnotationCanvas.vue'

const emit = defineEmits<{
  (e: 'submission-id', id: number): void
  (e: 'locked'): void
  (e: 'status-change', status: string): void
}>()

interface Props {
  assignmentId: number
  questionId: number
  background?: string | null
  width: number
  height: number
  teacherLayer?: AnnotationLayerJSON
  initialLayer?: AnnotationLayerJSON
  tool?: AnnotationTool
  color?: string
  strokeWidth?: number
  readonly?: boolean
  // Page-number slot this canvas's annotations are stored under. Defaults to 1 (the original
  // convention for a question locked to a single canvas/pdf_annotation response_type). When a
  // free-response question shows this blank canvas ALONGSIDE an uploaded PDF (which owns real
  // page numbers 1..N), the canvas must use a distinct slot - callers pass 0 in that case so the
  // two channels never collide on the same (submission_id, question_id, page_number) row.
  pageNumber?: number
  // Hide this component's own status line - used when the parent already surfaces save status
  // itself (e.g. inside the shared answer toolbar via @status-change).
  hideStatus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  background: null,
  teacherLayer: () => EMPTY_ANNOTATION_LAYER,
  initialLayer: () => EMPTY_ANNOTATION_LAYER,
  tool: 'pen',
  color: '#000000',
  strokeWidth: 3,
  readonly: false,
  pageNumber: 1,
  hideStatus: false
})

const API_BASE = '/api'

const canvasRef = ref<InstanceType<typeof AnnotationCanvas> | null>(null)
const saveStatus = ref('Ready to save')
const locked = ref(false)

// Use a static ref for the editable layer that never changes after initial load
// This completely prevents AnnotationCanvas from receiving prop updates that could trigger reloads
const staticEditableLayer = ref<AnnotationLayerJSON>(props.initialLayer)

// Use a static ref for readonlyLayers as well - never update it after initial load
// Since AnnotationCanvas no longer watches readonlyLayers, this is safe
const staticReadonlyLayers = ref<AnnotationLayerJSON[]>([{ ...props.teacherLayer }])

watch(saveStatus, status => emit('status-change', status))

let saveTimeout: number | null = null

function onLayerChange(updated: AnnotationLayerJSON) {
  // DO NOT update layer.value - this prevents the prop from changing
  // which would cause AnnotationCanvas to reload and lose the user's drawings
  // We only save to the server; AnnotationCanvas manages its own state internally
  
  saveStatus.value = 'Unsaved changes'

  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = window.setTimeout(async () => {
    saveStatus.value = 'Saving…'
    try {
      const response = await axios.post(`${API_BASE}/student/assignments/questions/${props.questionId}/answer-annotations`, {
        assignment_id: props.assignmentId,
        page_number: props.pageNumber,
        annotation_data: updated
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

function undo() {
  canvasRef.value?.undo()
}
function redo() {
  canvasRef.value?.redo()
}
function clearAll() {
  canvasRef.value?.clearAll()
}
function clearSelected() {
  canvasRef.value?.clearSelected()
}

defineExpose({ undo, redo, clearAll, clearSelected })
</script>

<style scoped>
.student-answer-canvas__status {
  padding: 4px 12px;
  font-size: 12px;
  color: #6b7280;
}

:global(.dark) .student-answer-canvas__status {
  color: #9ca3af;
}
</style>
