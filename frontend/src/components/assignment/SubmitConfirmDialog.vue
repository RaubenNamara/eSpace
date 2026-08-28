<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 max-w-md w-full">
      <template v-if="allAnswered">
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Ready to submit?</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-2">
          You have completed {{ answeredCount }} of {{ totalCount }} question{{ totalCount === 1 ? '' : 's' }}.
        </p>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          After submitting, you may not be able to edit your answers.
        </p>
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-4">
          <button
            @click="$emit('cancel')"
            class="w-full sm:w-auto px-4 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
          <button
            @click="$emit('confirm')"
            :disabled="submitting"
            class="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {{ submitting ? 'Submitting...' : '✓ Submit Assignment' }}
          </button>
        </div>
      </template>
      <template v-else>
        <h2 class="text-lg sm:text-xl font-semibold text-amber-700 dark:text-amber-400 mb-2">⚠️ Some questions are unanswered</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          You have answered {{ answeredCount }} of {{ totalCount }} questions. Would you like to review them before submitting?
        </p>
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-4">
          <button
            @click="$emit('review')"
            class="w-full sm:w-auto px-4 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Review Answers
          </button>
          <button
            @click="$emit('confirm')"
            :disabled="submitting"
            class="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
          >
            {{ submitting ? 'Submitting...' : 'Submit Anyway' }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  answeredCount: number
  totalCount: number
  submitting?: boolean
}>()

defineEmits<{
  (e: 'cancel'): void
  (e: 'review'): void
  (e: 'confirm'): void
}>()

const allAnswered = computed(() => props.answeredCount >= props.totalCount)
</script>
