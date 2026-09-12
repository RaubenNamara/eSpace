<template>
  <Transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-100 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div
      v-if="count > 0"
      class="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2.5 shadow-sm"
    >
      <span class="text-sm font-medium text-indigo-900 dark:text-indigo-200 whitespace-nowrap">
        {{ count }} selected
      </span>

      <div class="flex flex-wrap items-center gap-2 sm:ml-auto">
        <slot />

        <button
          @click="$emit('clear')"
          class="px-2.5 py-1.5 min-h-[32px] text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{ count: number }>()
defineEmits<{ clear: [] }>()
</script>
