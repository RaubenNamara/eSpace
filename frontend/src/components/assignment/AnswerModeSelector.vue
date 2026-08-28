<template>
  <div class="grid grid-cols-3 gap-2 sm:gap-3" role="tablist" aria-label="Choose how you want to answer">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      role="tab"
      :aria-selected="modelValue === option.value"
      :disabled="readonly"
      class="flex flex-col items-center justify-center gap-1 rounded-xl border-2 px-2 py-3 sm:py-4 text-center transition-colors"
      :class="[
        modelValue === option.value
          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-400'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300 dark:hover:border-indigo-600',
        { 'opacity-60 cursor-not-allowed': readonly }
      ]"
      @click="!readonly && $emit('update:modelValue', option.value)"
    >
      <span class="text-2xl sm:text-3xl" aria-hidden="true">{{ option.icon }}</span>
      <span class="text-sm sm:text-base font-semibold" :class="modelValue === option.value ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-white'">
        {{ option.label }}
      </span>
      <span class="hidden sm:block text-xs text-gray-500 dark:text-gray-400">{{ option.description }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
export type AnswerMode = 'type' | 'write' | 'upload'

defineProps<{
  modelValue: AnswerMode
  readonly?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: AnswerMode): void
}>()

const options: { value: AnswerMode; icon: string; label: string; description: string }[] = [
  { value: 'type', icon: '⌨️', label: 'Type', description: 'Type your answer' },
  { value: 'write', icon: '✍️', label: 'Write', description: 'Write on the page' },
  { value: 'upload', icon: '📎', label: 'Upload', description: 'Upload your work' }
]
</script>
