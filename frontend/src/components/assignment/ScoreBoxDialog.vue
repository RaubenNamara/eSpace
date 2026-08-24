<template>
  <div class="score-box-popup" :style="{ left: x + 'px', top: y + 'px' }" @click.stop>
    <input
      ref="inputRef"
      v-model="draft"
      type="text"
      class="score-box-popup__input"
      placeholder="e.g. 3/5"
      @keydown="onKeydown"
    >
    <div class="score-box-popup__actions">
      <button class="score-box-popup__cancel" @click="$emit('close')">Cancel</button>
      <button class="score-box-popup__save" @click="$emit('save', draft)">Add</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

interface Props {
  x: number
  y: number
  initialText?: string
}

const props = withDefaults(defineProps<Props>(), { initialText: '' })

const emit = defineEmits<{
  (e: 'save', text: string): void
  (e: 'close'): void
}>()

const draft = ref(props.initialText)
const inputRef = ref<HTMLInputElement | null>(null)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('close')
  } else if (e.key === 'Enter') {
    e.preventDefault()
    emit('save', draft.value)
  }
}

onMounted(async () => {
  await nextTick()
  inputRef.value?.focus()
  inputRef.value?.select()
})
</script>

<style scoped>
.score-box-popup {
  position: absolute;
  z-index: 20;
  width: 160px;
  padding: 8px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

:global(.dark) .score-box-popup {
  background-color: #1f2937;
  border-color: #374151;
}

.score-box-popup__input {
  width: 100%;
  font-size: 13px;
  padding: 6px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

:global(.dark) .score-box-popup__input {
  background-color: #111827;
  border-color: #374151;
  color: #e5e7eb;
}

.score-box-popup__actions {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 6px;
}

.score-box-popup__save {
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 6px;
  background-color: #6366f1;
  color: white;
  border: none;
  cursor: pointer;
}

.score-box-popup__cancel {
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 6px;
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
  cursor: pointer;
}
</style>
