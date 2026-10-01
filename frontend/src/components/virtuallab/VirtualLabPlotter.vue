<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
    <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
      <div class="min-w-0">
        <p class="text-sm font-bold text-gray-900 dark:text-white">{{ config.title || 'Plot your graph' }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          <strong class="text-gray-700 dark:text-gray-300">{{ yLabel }}</strong> (up) against <strong class="text-gray-700 dark:text-gray-300">{{ xLabel }}</strong> (across)
        </p>
      </div>
      <span
        class="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold rounded-full whitespace-nowrap"
        :class="enough ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'"
      >{{ points.length }} of {{ minPoints }} points plotted</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Graph paper -->
      <div class="lg:col-span-2">
        <div class="h-72 sm:h-96 rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-1" :class="readOnly ? '' : 'cursor-crosshair'">
          <Scatter :data="chartData" :options="chartOptions" />
        </div>
        <p v-if="!readOnly" class="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5">Click (or tap) the graph paper to plot a point, or type the values in the box on the right.</p>

        <div class="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span class="text-gray-500 dark:text-gray-400">Scale:</span>
          <label class="inline-flex items-center gap-1 text-gray-600 dark:text-gray-300">{{ shortLabel(xLabel) }} up to
            <input v-model="xMaxInput" type="number" min="0" step="any" placeholder="auto" class="input-field w-20 text-xs py-1">
          </label>
          <label class="inline-flex items-center gap-1 text-gray-600 dark:text-gray-300">{{ shortLabel(yLabel) }} up to
            <input v-model="yMaxInput" type="number" min="0" step="any" placeholder="auto" class="input-field w-20 text-xs py-1">
          </label>
          <button v-if="config.show_best_fit && points.length >= 2" @click="showFit = !showFit" class="ml-auto px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors" :class="showFit ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800 text-red-700 dark:text-red-300' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'">
            {{ showFit ? 'Hide line of best fit' : 'Draw line of best fit' }}
          </button>
        </div>
        <div v-if="showFit && fit" class="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500 dark:text-gray-400">
          <span>Gradient: <strong class="text-gray-700 dark:text-gray-300">{{ fit.slope }}</strong></span>
          <span>Intercept: <strong class="text-gray-700 dark:text-gray-300">{{ fit.intercept }}</strong></span>
          <span>R&sup2;: <strong class="text-gray-700 dark:text-gray-300">{{ fit.r2 }}</strong></span>
        </div>
      </div>

      <!-- Entering and reviewing points -->
      <div class="space-y-3">
        <div v-if="!readOnly" class="bg-gray-50 dark:bg-gray-950/40 rounded-xl p-3">
          <p class="text-[11px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2">Add a point</p>
          <form @submit.prevent="addTyped" class="grid grid-cols-2 gap-2">
            <label class="text-[11px] text-gray-500 dark:text-gray-400">{{ shortLabel(xLabel) }}
              <input ref="xInput" v-model="xText" type="number" step="any" required class="input-field w-full text-sm mt-0.5">
            </label>
            <label class="text-[11px] text-gray-500 dark:text-gray-400">{{ shortLabel(yLabel) }}
              <input v-model="yText" type="number" step="any" required class="input-field w-full text-sm mt-0.5">
            </label>
            <button type="submit" class="col-span-2 px-3 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 ">Plot point</button>
          </form>
          <div v-if="readings.length" class="mt-2.5">
            <p class="text-[10px] text-gray-400 dark:text-gray-500 mb-1">Your readings from the experiment (tap to use):</p>
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="r in readings"
                :key="r.id"
                type="button"
                @click="useReading(r)"
                class="px-2 py-1 text-[11px] font-medium rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-700"
              >{{ r.label }}: {{ r.value }}{{ r.unit ? ' ' + r.unit : '' }}</button>
            </div>
          </div>
          <p v-if="error" class="mt-2 text-[11px] text-red-600 dark:text-red-400">{{ error }}</p>
        </div>

        <div>
          <p class="text-[11px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Your points</p>
          <p v-if="points.length === 0" class="text-xs text-gray-400 dark:text-gray-500">Nothing plotted yet.</p>
          <div v-else class="max-h-64 overflow-y-auto rounded-lg border border-gray-100 dark:border-gray-700">
            <table class="w-full text-xs">
              <thead class="bg-gray-50 dark:bg-gray-950/40 text-left text-gray-500 dark:text-gray-400 sticky top-0">
                <tr><th class="px-2.5 py-1.5 font-semibold">#</th><th class="px-2.5 py-1.5 font-semibold">{{ shortLabel(xLabel) }}</th><th class="px-2.5 py-1.5 font-semibold">{{ shortLabel(yLabel) }}</th><th></th></tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                <tr v-for="(p, i) in points" :key="p.id">
                  <td class="px-2.5 py-1.5 text-gray-400">{{ i + 1 }}</td>
                  <td class="px-2.5 py-1.5 text-gray-700 dark:text-gray-200">{{ p.x }}</td>
                  <td class="px-2.5 py-1.5 text-gray-700 dark:text-gray-200">{{ p.y }}</td>
                  <td class="px-2.5 py-1.5 text-right"><button v-if="!readOnly" @click="emit('remove', p.id)" class="text-gray-400 hover:text-red-500" title="Remove this point">&times;</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Scatter } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, LinearScale } from 'chart.js'
import type { NotebookEntry, GraphConfig } from '@/types/virtualLab'
import { linearRegression } from '@/utils/linearRegression'

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, LinearScale)

const props = defineProps<{
  config: GraphConfig
  /** The student's own plotted points (notebook entries of type plot_point) */
  entries: NotebookEntry[]
  /** Readings taken in the experiment, offered as quick fills for the x / y boxes */
  readings: NotebookEntry[]
  readOnly?: boolean
}>()

const emit = defineEmits<{ add: [point: { x: number; y: number }]; remove: [id: number] }>()

const xLabel = computed(() => props.config.x_label || 'X')
const yLabel = computed(() => props.config.y_label || 'Y')
const minPoints = computed(() => Math.max(1, props.config.min_points || 2))
/** "Extension (cm)" -> "Extension (cm)" but long labels are trimmed so they fit small inputs */
const shortLabel = (label: string) => (label.length > 24 ? label.slice(0, 22) + '…' : label)

const points = computed(() => props.entries
  .map(e => ({ id: e.id, x: Number(e.extra?.x), y: Number(e.extra?.y) }))
  .filter(p => Number.isFinite(p.x) && Number.isFinite(p.y)))
const enough = computed(() => points.value.length >= minPoints.value)

// --- Adding points ---------------------------------------------------------------------------
const xText = ref('')
const yText = ref('')
const xInput = ref<HTMLInputElement | null>(null)
const error = ref('')

function submit(x: number, y: number) {
  error.value = ''
  if (!Number.isFinite(x) || !Number.isFinite(y)) { error.value = 'Enter a number for both values.'; return }
  emit('add', { x, y })
}
function addTyped() {
  submit(Number(xText.value), Number(yText.value))
  xText.value = ''
  yText.value = ''
  xInput.value?.focus()
}
/** Tapping a reading fills the x box first, then the y box */
function useReading(r: NotebookEntry) {
  const v = Number(r.value)
  if (!Number.isFinite(v)) return
  if (xText.value === '') xText.value = String(v)
  else yText.value = String(v)
}

// --- Scale -----------------------------------------------------------------------------------
const xMaxInput = ref<string>('')
const yMaxInput = ref<string>('')

/** A tidy upper limit (1, 2, 5 x 10^k) at or above the largest value, so the axis reads cleanly */
function niceMax(v: number): number {
  if (!(v > 0)) return 10
  const exp = Math.pow(10, Math.floor(Math.log10(v)))
  const f = v / exp
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * exp
}
const dataMaxX = computed(() => Math.max(0, ...points.value.map(p => p.x)))
const dataMaxY = computed(() => Math.max(0, ...points.value.map(p => p.y)))
const xMax = computed(() => {
  const chosen = Number(xMaxInput.value)
  return xMaxInput.value !== '' && chosen > 0 ? chosen : niceMax(dataMaxX.value * 1.1)
})
const yMax = computed(() => {
  const chosen = Number(yMaxInput.value)
  return yMaxInput.value !== '' && chosen > 0 ? chosen : niceMax(dataMaxY.value * 1.1)
})
/** Values from a click are rounded to the nearest minor grid line so points land on tidy numbers */
function snap(v: number, max: number): number {
  const step = max / 50
  const digits = Math.max(0, 2 - Math.floor(Math.log10(step)))
  return Number((Math.round(v / step) * step).toFixed(Math.min(6, digits)))
}

// --- Best fit --------------------------------------------------------------------------------
const showFit = ref(false)
const fit = computed(() => (points.value.length >= 2 ? linearRegression(points.value.map(p => ({ x: p.x, y: p.y }))) : null))

// --- Chart -----------------------------------------------------------------------------------
const chartData = computed(() => {
  const datasets: any[] = [{
    type: 'scatter',
    label: 'Your points',
    data: points.value.map(p => ({ x: p.x, y: p.y })),
    backgroundColor: 'rgba(79, 70, 229, 0.9)',
    borderColor: '#312e81',
    borderWidth: 1.5,
    pointStyle: 'crossRot',
    pointRadius: 7,
    pointHoverRadius: 9,
  }]
  if (showFit.value && fit.value) {
    datasets.push({
      type: 'line',
      label: 'Line of best fit',
      data: [
        { x: 0, y: fit.value.intercept },
        { x: xMax.value, y: fit.value.slope * xMax.value + fit.value.intercept },
      ],
      borderColor: 'rgba(220, 38, 38, 0.9)',
      borderWidth: 2,
      pointRadius: 0,
      fill: false,
    })
  }
  return { datasets }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: false as const,
  plugins: { legend: { display: showFit.value && !!fit.value }, tooltip: { enabled: true } },
  scales: {
    x: {
      type: 'linear' as const, min: 0, max: xMax.value,
      title: { display: true, text: xLabel.value, font: { weight: 'bold' as const } },
      grid: { color: 'rgba(100,116,139,0.28)' },
      ticks: { color: '#334155' },
    },
    y: {
      type: 'linear' as const, min: 0, max: yMax.value,
      title: { display: true, text: yLabel.value, font: { weight: 'bold' as const } },
      grid: { color: 'rgba(100,116,139,0.28)' },
      ticks: { color: '#334155' },
    },
  },
  onClick: (event: any, _elements: unknown, chart: any) => {
    if (props.readOnly || !chart) return
    const area = chart.chartArea
    if (event.x < area.left || event.x > area.right || event.y < area.top || event.y > area.bottom) return
    const x = snap(chart.scales.x.getValueForPixel(event.x), xMax.value)
    const y = snap(chart.scales.y.getValueForPixel(event.y), yMax.value)
    submit(x, y)
  },
}))

</script>
