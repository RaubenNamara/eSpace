<template>
  <div class="equation-dialog__overlay" @click.self="$emit('close')">
    <div class="equation-dialog">
      <h3 class="equation-dialog__title">{{ isEditing ? 'Edit Equation' : 'Insert Equation' }}</h3>
      <p class="equation-dialog__hint">Type LaTeX notation, e.g. <code>x^2 + 2x - 3 = 0</code></p>

      <textarea
        v-model="source"
        class="equation-dialog__input"
        rows="3"
        placeholder="x^2 + 2x - 3 = 0"
        autofocus
      ></textarea>

      <div class="equation-dialog__preview-wrap">
        <div v-if="!source.trim()" class="equation-dialog__preview-empty">Preview appears here</div>
        <div v-else-if="renderError" class="equation-dialog__preview-error">{{ renderError }}</div>
        <div v-else ref="previewRef" class="equation-dialog__preview" v-html="renderedHtml"></div>
      </div>

      <div class="equation-dialog__actions">
        <button type="button" class="equation-dialog__btn" @click="$emit('close')">Cancel</button>
        <button type="button" class="equation-dialog__btn equation-dialog__btn--primary" :disabled="!source.trim() || !!renderError || inserting" @click="onInsert">
          {{ inserting ? 'Inserting…' : isEditing ? 'Update' : 'Insert' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import html2canvas from 'html2canvas'

interface Props {
  initialSource?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialSource: ''
})

const emit = defineEmits<{
  (e: 'insert', payload: { dataUrl: string; source: string; width: number; height: number }): void
  (e: 'close'): void
}>()

const isEditing = computed(() => !!props.initialSource)
const source = ref(props.initialSource)
const previewRef = ref<HTMLElement | null>(null)
const renderError = ref('')
const inserting = ref(false)

const renderedHtml = computed(() => {
  if (!source.value.trim()) return ''
  try {
    renderError.value = ''
    return katex.renderToString(source.value, { throwOnError: true, displayMode: true })
  } catch (err: any) {
    renderError.value = err?.message || 'Invalid LaTeX'
    return ''
  }
})

async function onInsert() {
  if (!source.value.trim() || renderError.value) return
  inserting.value = true
  try {
    await nextTick()
    const node = previewRef.value
    if (!node) return
    const canvas = await html2canvas(node, { backgroundColor: null, scale: 2 })
    emit('insert', {
      dataUrl: canvas.toDataURL('image/png'),
      source: source.value,
      width: canvas.width,
      height: canvas.height
    })
  } finally {
    inserting.value = false
  }
}
</script>

<style scoped>
.equation-dialog__overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
}

.equation-dialog {
  width: 420px;
  max-width: calc(100vw - 32px);
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

:global(.dark) .equation-dialog {
  background-color: #1f2937;
}

.equation-dialog__title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

:global(.dark) .equation-dialog__title {
  color: #f3f4f6;
}

.equation-dialog__hint {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 12px;
}

:global(.dark) .equation-dialog__hint {
  color: #9ca3af;
}

.equation-dialog__hint code {
  background-color: #f3f4f6;
  padding: 1px 4px;
  border-radius: 4px;
}

:global(.dark) .equation-dialog__hint code {
  background-color: #374151;
}

.equation-dialog__input {
  width: 100%;
  padding: 8px 10px;
  font-family: ui-monospace, monospace;
  font-size: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  resize: vertical;
}

:global(.dark) .equation-dialog__input {
  background-color: #111827;
  border-color: #374151;
  color: #e5e7eb;
}

.equation-dialog__preview-wrap {
  margin-top: 12px;
  min-height: 60px;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
}

:global(.dark) .equation-dialog__preview-wrap {
  background-color: #111827;
}

.equation-dialog__preview {
  display: inline-block;
  color: #111827;
}

:global(.dark) .equation-dialog__preview {
  color: #f3f4f6;
}

.equation-dialog__preview-empty {
  font-size: 13px;
  color: #9ca3af;
}

.equation-dialog__preview-error {
  font-size: 13px;
  color: #dc2626;
}

.equation-dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

.equation-dialog__btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
}

:global(.dark) .equation-dialog__btn {
  background-color: #111827;
  border-color: #374151;
  color: #e5e7eb;
}

.equation-dialog__btn--primary {
  background-color: #6366f1;
  border-color: #6366f1;
  color: white;
}

.equation-dialog__btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
