<template>
  <component
    :is="to ? 'router-link' : 'div'"
    :to="to"
    class="group relative bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 ring-0 hover:ring-2 hover:ring-offset-0 hover:border-transparent hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden block"
    :class="palette.ring"
  >
    <div class="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-[0.07] group-hover:opacity-[0.12] transition-opacity" :class="palette.color"></div>
    <div class="relative flex items-center justify-between gap-2">
      <div class="min-w-0">
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{{ label }}</p>
        <p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ value }}</p>
      </div>

      <!-- Icon pops with a little spring bounce on hover, with a matching-color ring pulsing
           outward behind it - see QuickLink.vue for the same treatment. -->
      <div class="relative flex items-center justify-center flex-shrink-0">
        <span
          class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 group-hover:animate-ping ring-2"
          :class="palette.ring"
        ></span>
        <div
          class="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-6"
          :class="palette.color"
        >
          <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath"></path>
          </svg>
        </div>
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
