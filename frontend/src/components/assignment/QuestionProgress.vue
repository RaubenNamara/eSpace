<template>
  <div v-if="total > 1" class="flex flex-col items-end gap-2">
    <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Question {{ current + 1 }} of {{ total }}</p>
    <div class="flex items-center gap-1" role="list" aria-label="Question progress">
      <template v-for="(isAnswered, index) in answered" :key="index">
        <button
          type="button"
          role="listitem"
          class="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors"
          :class="dotClass(index, isAnswered)"
          :aria-label="`Go to question ${index + 1}${isAnswered ? ' (answered)' : ''}`"
          :aria-current="index === current ? 'step' : undefined"
          @click="$emit('select', index)"
        >
          <span v-if="isAnswered && index !== current">✓</span>
          <span v-else>{{ index + 1 }}</span>
        </button>
        <span v-if="index < total - 1" class="h-px w-3 sm:w-4 bg-gray-300 dark:bg-gray-600"></span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  total: number
  current: number
  answered: boolean[]
}>()

defineEmits<{
  (e: 'select', index: number): void
}>()

function dotClass(index: number, isAnswered: boolean): string {
  if (index === props.current) {
    return 'bg-indigo-600 text-white ring-2 ring-indigo-300 dark:ring-indigo-700'
  }
  if (isAnswered) {
    return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
  }
  return 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
}
</script>
