<template>
  <div v-if="rows.length > 0" class="mt-3">
    <div class="flex items-center justify-between gap-2 mb-2">
      <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ displayTitle }}</p>
      <div v-if="axesEditable" class="flex items-center gap-1.5 text-xs">
        <select v-model="xKey" class="input-field text-xs py-1">
          <option v-for="c in numericColumns" :key="c" :value="c">{{ humanize(c) }}</option>
        </select>
        <span class="text-gray-400">vs</span>
        <select v-model="yKey" class="input-field text-xs py-1">
          <option v-for="c in numericColumns" :key="c" :value="c">{{ humanize(c) }}</option>
        </select>
      </div>
    </div>

    <p v-if="rows.length < minPoints" class="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/40 rounded-lg px-3 py-2.5">
      Record at least {{ minPoints }} reading{{ minPoints === 1 ? '' : 's' }} to plot this graph.
    </p>
    <template v-else-if="xKey && yKey">
      <div class="h-56 sm:h-64">
        <Scatter :data="chartData" :options="chartOptions" />
      </div>
      <div v-if="fit" class="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500 dark:text-gray-400">
        <span>Gradient: <strong class="text-gray-700 dark:text-gray-300">{{ fit.slope }}</strong></span>
        <span>Intercept: <strong class="text-gray-700 dark:text-gray-300">{{ fit.intercept }}</strong></span>
        <span>R&sup2;: <strong class="text-gray-700 dark:text-gray-300">{{ fit.r2 }}</strong></span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Scatter } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, LinearScale } from 'chart.js'
import type { NotebookEntry, GraphConfig } from '@/types/virtualLab'
import { linearRegression } from '@/utils/linearRegression'

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, LinearScale)

const props = defineProps<{ rows: NotebookEntry[]; config?: GraphConfig | null }>()

function humanize(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// Only columns that are numeric across every row can be plotted - a results table's `extra` shape
// is authored per experiment type (see addResultRow/addSpringResultRow/etc in the parent page), so
// this has to check actual values rather than assume a fixed schema.
const numericColumns = computed(() => {
  const first = props.rows[0]?.extra
  if (!first) return []
  return Object.keys(first).filter((key) =>
    props.rows.every((r) => r.extra != null && !Number.isNaN(Number(r.extra[key])))
  )
})

// No config (or a config the teacher never enabled) behaves exactly like before this feature -
// free axis choice, 2-point minimum, humanized column names, no best-fit line.
const minPoints = computed(() => (props.config?.enabled ? props.config.min_points : 2))
const axesEditable = computed(() => !props.config?.enabled || props.config.allow_axis_change)

const xKey = ref('')
const yKey = ref('')

watch([numericColumns, () => props.config], ([cols, config]) => {
  const configuredX = config?.enabled && config.x_column && cols.includes(config.x_column) ? config.x_column : null
  const configuredY = config?.enabled && config.y_column && cols.includes(config.y_column) ? config.y_column : null
  if (!cols.includes(xKey.value)) xKey.value = configuredX ?? cols[0] ?? ''
  if (!cols.includes(yKey.value)) yKey.value = configuredY ?? cols[1] ?? cols[0] ?? ''
  // A locked (non-editable) axis config always wins over whatever was previously selected, even if
  // that previous selection was itself a valid column - the teacher's choice isn't optional here.
  if (config?.enabled && !config.allow_axis_change) {
    if (configuredX) xKey.value = configuredX
    if (configuredY) yKey.value = configuredY
  }
}, { immediate: true })

const displayTitle = computed(() => props.config?.enabled && props.config.title ? props.config.title : 'Graph')
const xAxisLabel = computed(() => props.config?.enabled && props.config.x_label ? props.config.x_label : humanize(xKey.value))
const yAxisLabel = computed(() => props.config?.enabled && props.config.y_label ? props.config.y_label : humanize(yKey.value))

const points = computed(() => props.rows
  .map((r) => ({ x: Number(r.extra?.[xKey.value]), y: Number(r.extra?.[yKey.value]) }))
  .filter((p) => !Number.isNaN(p.x) && !Number.isNaN(p.y)))

// Best-fit is computed only from the learner's own real recorded points, and only rendered when the
// experiment explicitly asks for it - never replaces or adjusts the actual scatter points.
const fit = computed(() => (props.config?.enabled && props.config.show_best_fit) ? linearRegression(points.value) : null)

const fitLinePoints = computed(() => {
  if (!fit.value || points.value.length === 0) return []
  const xs = points.value.map((p) => p.x)
  const minX = Math.min(0, ...xs)
  const maxX = Math.max(...xs) * 1.1
  return [
    { x: minX, y: (fit.value.slope * minX) + fit.value.intercept },
    { x: maxX, y: (fit.value.slope * maxX) + fit.value.intercept },
  ]
})

const chartData = computed(() => {
  const datasets: any[] = [{
    type: 'scatter',
    label: `${yAxisLabel.value} vs ${xAxisLabel.value}`,
    data: points.value,
    backgroundColor: 'rgba(79, 70, 229, 0.75)',
    borderColor: 'rgba(79, 70, 229, 1)',
    pointRadius: 5,
    pointHoverRadius: 7,
  }]
  if (fit.value) {
    datasets.push({
      type: 'line',
      label: 'Best fit',
      data: fitLinePoints.value,
      borderColor: 'rgba(220, 38, 38, 0.85)',
      borderWidth: 2,
      pointRadius: 0,
      borderDash: [6, 4],
      fill: false,
      tension: 0,
    })
  }
  return { datasets }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: !!fit.value } },
  scales: {
    x: { type: 'linear' as const, title: { display: true, text: xAxisLabel.value } },
    y: { title: { display: true, text: yAxisLabel.value } },
  },
}))

// Read by the parent page at submit time so the frozen per-attempt snapshot reflects whichever
// axes the learner was actually viewing (only meaningful when the config allows changing them).
defineExpose({ xKey, yKey })
</script>
