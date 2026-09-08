<template>
  <RouterLink
    :to="to"
    class="group relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 ring-0 hover:ring-2 hover:ring-offset-0 hover:border-transparent hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center text-center gap-2"
    :class="palette.ring"
  >
    <span v-if="badge" class="absolute top-2 right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center z-10">
      {{ badge > 99 ? '99+' : badge }}
    </span>

    <!-- Icon pops with a little spring bounce on hover, with a matching-color ring pulsing
         outward behind it - the one bit of "motion personality" this otherwise calm, flat
         navigation grid gets, kept in the tile's own color rather than a generic effect. -->
    <div class="relative flex items-center justify-center">
      <span
        class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 group-hover:animate-ping ring-2"
        :class="palette.ring"
      ></span>
      <div
        class="relative w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-6"
        :class="palette.color"
      >
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath"></path>
        </svg>
      </div>
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
