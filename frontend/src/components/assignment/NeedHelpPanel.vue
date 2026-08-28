<template>
  <details class="group rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 open:bg-white dark:open:bg-gray-800">
    <summary class="flex items-center gap-2 px-4 py-2.5 cursor-pointer select-none text-sm font-medium text-indigo-700 dark:text-indigo-300 list-none">
      <span aria-hidden="true">💡</span>
      Need Help?
      <svg class="w-4 h-4 ml-auto transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
    <div class="px-4 pb-4 pt-1">
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Think about:</p>
      <ul class="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
        <li v-for="(hint, index) in resolvedHints" :key="index" class="flex gap-2">
          <span class="text-indigo-500 dark:text-indigo-400" aria-hidden="true">•</span>
          <span>{{ hint }}</span>
        </li>
      </ul>
    </div>
  </details>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const DEFAULT_HINTS = [
  'Break the question into parts - what is it really asking you to do?',
  'Look for keywords like explain, describe, compare, or suggest - they tell you how to answer.',
  'Use the scenario above for clues - the answer is often connected to it.',
  'Organise your answer into clear points instead of one long paragraph.',
  'Check your answer covers everything the question asks before you move on.'
]

const props = defineProps<{
  hints?: string[]
}>()

const resolvedHints = computed(() => (props.hints && props.hints.length > 0 ? props.hints : DEFAULT_HINTS))
</script>
