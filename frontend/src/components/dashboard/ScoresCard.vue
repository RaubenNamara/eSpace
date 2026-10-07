<template>
  <!-- How the student's marks are going: the average, which way it's heading, and a small line of
       the latest graded scores - into Reports for the full picture -->
  <RouterLink to="/student/reports" class="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
    <div class="flex items-start justify-between gap-2">
      <div>
        <p class="text-sm font-bold text-gray-900 dark:text-white">My scores</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ gradedCount ? `Average of ${gradedCount} marked ${gradedCount === 1 ? 'piece' : 'pieces'} of work` : 'Nothing marked yet' }}</p>
      </div>
      <span v-if="trend" class="flex-shrink-0 px-2 py-0.5 rounded-full text-[11px] font-bold" :class="TREND[trend].cls">{{ `${TREND[trend].arrow} ${TREND[trend].label}` + (trendDelta ? ` ${trendDelta > 0 ? '+' : ''}${trendDelta}` : '') }}</span>
    </div>
    <div class="mt-3 flex items-end gap-4">
      <p class="text-4xl font-extrabold tracking-tight tabular-nums" :class="average === null ? 'text-gray-300 dark:text-gray-600' : 'text-gray-900 dark:text-white'">{{ average === null ? '–' : `${average}%` }}</p>
      <svg v-if="points.length > 1" class="flex-1 h-12 min-w-0" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="scores-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path :d="`${line} L100,40 L0,40 Z`" fill="url(#scores-fill)" />
        <path :d="line" fill="none" stroke="#6366f1" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round" />
      </svg>
    </div>
    <p class="mt-auto pt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-300 group-hover:underline">See my reports →</p>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  average: number | null
  gradedCount: number
  trend: 'improving' | 'declining' | 'steady' | null
  trendDelta: number | null
  scores: number[]
}>()

const TREND = {
  improving: { arrow: '▲', label: 'Improving', cls: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200' },
  declining: { arrow: '▼', label: 'Slipping', cls: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200' },
  steady: { arrow: '●', label: 'Steady', cls: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' }
}

// The latest scores (0-100) as a line across the box
const points = computed(() => props.scores.slice(-10))
const line = computed(() => {
  const p = points.value
  const step = p.length > 1 ? 100 / (p.length - 1) : 0
  return p.map((s, i) => `${i ? 'L' : 'M'}${(i * step).toFixed(1)},${(38 - Math.max(0, Math.min(100, s)) * 0.36).toFixed(1)}`).join(' ')
})
</script>
