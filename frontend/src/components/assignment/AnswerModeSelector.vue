<template>
  <!-- How to answer: three compact cards side by side on every screen (phones: icon over the name;
       from tablet width: icon beside the name and a short description) -->
  <div class="grid grid-cols-3 gap-2" role="tablist" aria-label="Choose how you want to answer">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      role="tab"
      :aria-selected="modelValue === option.value"
      :disabled="readonly"
      class="flex min-w-0 flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2 rounded-xl border px-1.5 py-2 md:px-3 text-center md:text-left transition-colors"
      :class="[
        modelValue === option.value
          ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500 dark:bg-indigo-900/20 dark:border-indigo-400 dark:ring-indigo-400'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300 dark:hover:border-indigo-600',
        { 'opacity-60 cursor-not-allowed': readonly }
      ]"
      @click="!readonly && $emit('update:modelValue', option.value)"
    >
      <span
        class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
        :class="modelValue === option.value ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300'"
        aria-hidden="true"
      >
        <AppIcon :name="option.icon" class="w-4 h-4" />
      </span>
      <span class="min-w-0 max-w-full">
        <span class="block truncate text-[13px] sm:text-sm font-semibold leading-tight" :class="modelValue === option.value ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-white'">{{ option.label }}</span>
        <span class="hidden md:block truncate text-[11px] leading-tight text-gray-500 dark:text-gray-400">{{ option.description }}</span>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
export type AnswerMode = 'type' | 'write' | 'upload'

defineProps<{
  modelValue: AnswerMode
  readonly?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: AnswerMode): void
}>()

const options: { value: AnswerMode; icon: string; label: string; description: string }[] = [
  { value: 'type', icon: 'keyboard', label: 'Mark sheet', description: 'Type on lined paper' },
  { value: 'write', icon: 'pencil', label: 'Write', description: 'Write on the page' },
  { value: 'upload', icon: 'paperclip', label: 'Upload', description: 'Upload your work' }
]
</script>
