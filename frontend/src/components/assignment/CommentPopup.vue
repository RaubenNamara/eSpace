<template>
  <div class="comment-popup" :style="{ left: x + 'px', top: y + 'px' }" @click.stop>
    <template v-if="mode === 'view'">
      <p class="comment-popup__text">{{ initialText }}</p>
      <button class="comment-popup__close" @click="$emit('close')">Close</button>
    </template>
    <template v-else>
      <textarea
        ref="textareaRef"
        v-model="draft"
        class="comment-popup__textarea"
        rows="3"
        :placeholder="placeholder"
        @keydown="onKeydown"
      ></textarea>
      <p class="comment-popup__hint">Enter to save, Shift+Enter for a new line, Esc to cancel</p>
      <div class="comment-popup__actions">
        <button class="comment-popup__cancel" @click="$emit('close')">Cancel</button>
        <button class="comment-popup__save" @click="$emit('save', draft)">Save</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

interface Props {
  mode: 'view' | 'edit'
  x: number
  y: number
  initialText?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialText: '',
  placeholder: 'Type here...'
})

const emit = defineEmits<{
  (e: 'save', text: string): void
  (e: 'close'): void
}>()

const draft = ref(props.initialText)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('close')
  } else if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    emit('save', draft.value)
  }
}

onMounted(async () => {
  await nextTick()
  textareaRef.value?.focus()
})
</script>

<style scoped>
.comment-popup {
  position: absolute;
  z-index: 20;
  width: 260px;
  padding: 10px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

:global(.dark) .comment-popup {
  background-color: #1f2937;
  border-color: #374151;
}

.comment-popup__text {
  font-size: 13px;
  color: #374151;
  white-space: pre-wrap;
  margin-bottom: 8px;
}

:global(.dark) .comment-popup__text {
  color: #e5e7eb;
}

.comment-popup__textarea {
  width: 100%;
  font-size: 13px;
  padding: 6px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  resize: vertical;
}

.comment-popup__hint {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 4px;
}

.comment-popup__actions {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 6px;
}

.comment-popup__save,
.comment-popup__close {
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 6px;
  background-color: #6366f1;
  color: white;
  border: none;
  cursor: pointer;
}

.comment-popup__cancel {
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 6px;
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
  cursor: pointer;
}
</style>
