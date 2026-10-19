<template>
  <div class="flex flex-col items-center justify-center text-center gap-2 p-6" role="alert">
    <div class="w-11 h-11 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-700 dark:text-amber-300">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3.75m0 3.75h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
    </div>
    <p class="font-semibold text-gray-900 dark:text-white">{{ title }}</p>
    <p class="text-sm text-gray-600 dark:text-gray-300 max-w-sm">{{ message }}</p>
    <button
      v-if="retryable"
      type="button"
      class="mt-1 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      @click="$emit('retry')"
    >Try again</button>
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title?: string; message: string; retryable?: boolean }>(), { title: 'Something went wrong', retryable: false })
defineEmits<{ retry: [] }>()
</script>
