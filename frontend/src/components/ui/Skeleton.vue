<template>
  <!-- Placeholder shapes while a page loads - the shape of what's coming (stat tiles, cards, a
       list, a table, lines of text) instead of a blank screen or a spinner -->
  <div aria-busy="true" aria-label="Loading">
    <div v-if="variant === 'tiles'" class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div v-for="i in count" :key="i" class="sk rounded-xl h-[72px]"></div>
    </div>

    <div v-else-if="variant === 'cards'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      <div v-for="i in count" :key="i" class="rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
        <div class="flex items-center gap-3">
          <div class="sk w-10 h-10 rounded-xl"></div>
          <div class="flex-1 space-y-2">
            <div class="sk h-3 rounded w-2/3"></div>
            <div class="sk h-2.5 rounded w-1/3"></div>
          </div>
        </div>
        <div class="sk h-2.5 rounded w-full"></div>
        <div class="sk h-2.5 rounded w-4/5"></div>
      </div>
    </div>

    <div v-else-if="variant === 'list'" class="rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
      <div v-for="i in count" :key="i" class="flex items-center gap-3 p-3">
        <div class="sk w-9 h-9 rounded-full flex-shrink-0"></div>
        <div class="flex-1 space-y-2">
          <div class="sk h-3 rounded" :style="{ width: `${60 - (i % 3) * 12}%` }"></div>
          <div class="sk h-2.5 rounded w-1/4"></div>
        </div>
        <div class="sk h-6 w-16 rounded-lg hidden sm:block"></div>
      </div>
    </div>

    <div v-else-if="variant === 'table'" class="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="sk h-9 rounded-none opacity-60"></div>
      <div v-for="i in count" :key="i" class="flex items-center gap-4 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
        <div class="sk h-3 rounded w-1/4"></div>
        <div class="sk h-3 rounded w-1/6 hidden sm:block"></div>
        <div class="sk h-3 rounded w-1/6 hidden md:block"></div>
        <div class="sk h-3 rounded flex-1"></div>
      </div>
    </div>

    <div v-else class="space-y-2">
      <div v-for="i in count" :key="i" class="sk h-3 rounded" :style="{ width: i === count ? '55%' : '100%' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'tiles' | 'cards' | 'list' | 'table' | 'text'
  count?: number
}>(), { variant: 'cards', count: 3 })
</script>

<style scoped>
.sk {
  background: linear-gradient(90deg, #eceae6 25%, #f7f5f1 45%, #eceae6 65%);
  background-size: 300% 100%;
  animation: sk-shimmer 1.4s ease-in-out infinite;
}
.dark .sk {
  background: linear-gradient(90deg, #2a3140 25%, #343c4d 45%, #2a3140 65%);
  background-size: 300% 100%;
}
@keyframes sk-shimmer {
  from { background-position: 100% 0; }
  to { background-position: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .sk { animation: none; }
}
</style>
