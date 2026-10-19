<template>
  <div
    v-if="items.length"
    class="pointer-events-none absolute inset-x-0 top-3 flex justify-center px-3"
    role="status"
    aria-live="polite"
  >
    <div class="pointer-events-auto w-full max-w-xs rounded-xl bg-white/95 dark:bg-gray-900/95 shadow-md border border-gray-200 dark:border-gray-700 px-3 py-2">
      <p class="text-xs font-semibold text-gray-800 dark:text-gray-100">
        Loading {{ items.length === 1 ? items[0].name.toLowerCase() : `${items.length} systems` }}…
        <span class="font-normal text-gray-500">{{ Math.round(overall * 100) }}%</span>
      </p>
      <div class="mt-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div class="h-full rounded-full bg-indigo-600 transition-[width] duration-200" :style="{ width: `${Math.max(4, overall * 100)}%` }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LoadState, SystemKey } from '@/anatomy/types'
import { SYSTEM_BY_KEY } from '@/anatomy/systems'

const props = defineProps<{ states: Partial<Record<SystemKey, LoadState>> }>()

const items = computed(() => (Object.entries(props.states) as [SystemKey, LoadState][])
  .filter(([, s]) => s.status === 'loading')
  .map(([k, s]) => ({ key: k, name: SYSTEM_BY_KEY[k]?.name ?? k, progress: s.status === 'loading' ? s.progress : 1 })))
const overall = computed(() => items.value.length ? items.value.reduce((a, i) => a + i.progress, 0) / items.value.length : 1)
</script>
