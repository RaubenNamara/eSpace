<template>
  <RouterLink
    :to="to"
    class="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center text-center gap-2"
  >
    <span v-if="badge" class="absolute top-2 right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center">
      {{ badge > 99 ? '99+' : badge }}
    </span>
    <div class="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br" :class="palette.grad">
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath"></path>
      </svg>
    </div>
    <p class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">{{ label }}</p>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dashboardIcons, dashboardColors } from './icons'

const props = defineProps<{ to: string; label: string; icon: string; color: string; badge?: number }>()

const iconPath = computed(() => dashboardIcons[props.icon] || dashboardIcons.reports)
const palette = computed(() => dashboardColors[props.color] || dashboardColors.indigo)
</script>
