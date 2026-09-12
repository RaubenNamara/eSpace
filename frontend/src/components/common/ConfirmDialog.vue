<template>
  <Transition name="confirm-fade">
    <div
      v-if="confirmStore.visible && confirmStore.options"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      @click.self="confirmStore.resolve(false)"
      @keydown.esc="confirmStore.resolve(false)"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div class="flex items-start gap-3 mb-4">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            :class="confirmStore.options.danger ? 'bg-red-100 dark:bg-red-900/30' : 'bg-indigo-100 dark:bg-indigo-900/30'"
          >
            <svg
              class="w-5 h-5"
              :class="confirmStore.options.danger ? 'text-red-600 dark:text-red-400' : 'text-indigo-600 dark:text-indigo-400'"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
            </svg>
          </div>
          <div class="min-w-0 pt-1">
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">{{ confirmStore.options.title }}</h3>
          </div>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line mb-6">{{ confirmStore.options.message }}</p>

        <div class="flex justify-end gap-3">
          <button
            @click="confirmStore.resolve(false)"
            class="btn-secondary"
          >
            {{ confirmStore.options.cancelLabel }}
          </button>
          <button
            @click="confirmStore.resolve(true)"
            :class="confirmStore.options.danger ? 'btn-danger' : 'btn-primary'"
            autofocus
          >
            {{ confirmStore.options.confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useConfirmStore } from '@/stores/confirm'

const confirmStore = useConfirmStore()
</script>

<style scoped>
.confirm-fade-enter-active,
.confirm-fade-leave-active {
  transition: opacity 0.15s ease;
}
.confirm-fade-enter-from,
.confirm-fade-leave-to {
  opacity: 0;
}
</style>
