<template>
  <component
    :is="to ? 'router-link' : 'div'"
    :to="to"
    class="group relative bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden block"
  >
    <div class="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-gradient-to-br opacity-[0.07] group-hover:opacity-[0.12] transition-opacity" :class="palette.grad"></div>
    <div class="relative flex items-center justify-between gap-2">
      <div class="min-w-0">
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{{ label }}</p>
        <p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ value }}</p>
      </div>
      <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br shadow-sm" :class="palette.grad">
        <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath"></path>
        </svg>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dashboardIcons, dashboardColors } from './icons'

const props = defineProps<{ label: string; value: string | number; icon: string; color: string; to?: string }>()

const iconPath = computed(() => dashboardIcons[props.icon] || dashboardIcons.reports)
const palette = computed(() => dashboardColors[props.color] || dashboardColors.indigo)
</script>
