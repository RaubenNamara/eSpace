<template>
  <router-link
    to="/student/reports"
    class="block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all p-6"
  >
    <div class="flex items-center justify-between mb-4 gap-3">
      <div>
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">📈 Performance Trend</h2>
        <p class="text-xs text-gray-400 dark:text-gray-500">Your own scores over time in this class</p>
      </div>
      <span
        v-if="trend"
        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
        :class="badgeClass"
      >
        {{ badgeIcon }} {{ badgeLabel }}
      </span>
    </div>

    <div v-if="gradedCount < 2" class="text-center py-8 text-sm text-gray-400 dark:text-gray-500">
      Not enough graded assignments yet to show a trend - it'll appear once at least two have been marked.
    </div>

    <template v-else>
      <div class="h-40 pointer-events-none">
        <Line :data="chartData" :options="chartOptions" />
      </div>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-3">
        Based on your last {{ gradedCount }} graded assignment{{ gradedCount === 1 ? '' : 's' }} in this class.
      </p>
    </template>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, LineElement, PointElement, LinearScale, CategoryScale)

const props = defineProps<{
  gradedCount: number
  trend: 'improving' | 'declining' | 'steady' | null
  trendDelta: number | null
  scores: number[]
}>()

const badgeLabel = computed(() => {
  if (props.trend === 'improving') return `Improving (+${Math.abs(props.trendDelta ?? 0)} pts)`
  if (props.trend === 'declining') return `Declining (−${Math.abs(props.trendDelta ?? 0)} pts)`
  return 'Steady'
})
const badgeIcon = computed(() => (props.trend === 'improving' ? '▲' : props.trend === 'declining' ? '▼' : '→'))
const badgeClass = computed(() => {
  if (props.trend === 'improving') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
  if (props.trend === 'declining') return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
  return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
})

// A single series names itself via the card title, so no legend is needed - just a thin recessive
// line with the default hover tooltip showing each score.
const lineColor = computed(() => (props.trend === 'declining' ? '#dc2626' : '#4f46e5'))

const chartData = computed(() => ({
  labels: props.scores.map((_, i) => `#${i + 1}`),
  datasets: [
    {
      data: props.scores,
      borderColor: lineColor.value,
      backgroundColor: lineColor.value,
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.3,
      fill: false
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: any) => `Score: ${ctx.parsed.y}%`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      grid: { color: 'rgba(0, 0, 0, 0.05)' },
      ticks: { callback: (v: string | number) => `${v}%` }
    },
    x: {
      grid: { display: false }
    }
  }
}
</script>
