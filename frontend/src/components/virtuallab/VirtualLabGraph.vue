<template>
  <div v-if="rows.length > 0 || config?.enabled" class="mt-3">
    <div class="flex items-center justify-between gap-2 mb-2">
      <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ displayTitle }}</p>
      <div v-if="axesEditable" class="flex items-center gap-1.5 text-xs">
        <select v-model="xKey" @change="xTouched = true" class="input-field text-xs py-1">
          <option v-for="c in numericColumns" :key="c" :value="c">{{ humanize(c) }}</option>
        </select>
        <span class="text-gray-400">vs</span>
        <select v-model="yKey" @change="yTouched = true" class="input-field text-xs py-1">
          <option v-for="c in numericColumns" :key="c" :value="c">{{ humanize(c) }}</option>
        </select>
      </div>
    </div>

    <div v-if="points.length >= 2" class="flex items-center justify-end gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1.5">
      <label class="flex items-center gap-1.5 mr-3 cursor-pointer select-none"><input v-model="showFit" type="checkbox" class="rounded"> Line of best fit</label>
      <label for="graph-line-mode">Line:</label>
      <select id="graph-line-mode" v-model="lineMode" class="input-field text-xs py-1 w-auto">
        <option value="none">Points only</option>
        <option value="join">Join the points</option>
        <option value="smooth">Smooth curve</option>
      </select>
    </div>
    <p v-if="rows.length < minPoints" class="text-xs text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg px-3 py-2 mb-2">
      <strong>{{ rows.length }} of {{ minPoints }}</strong> reading{{ minPoints === 1 ? '' : 's' }} recorded - the graph is drawn here as you add readings to your Results Table{{ rows.length ? '' : ' (run the experiment and use "Add to results")' }}.
    </p>
    <template v-if="config?.enabled || (xKey && yKey)">
      <div class="h-56 sm:h-64">
        <Scatter :data="chartData" :options="chartOptions" />
      </div>
      <p v-if="numericColumns.includes('sin_2theta') && xKey !== 'sin_2theta' && yKey === 'range_m' && fit && fit.r2 < 0.7" class="mt-1.5 text-[11px] text-amber-700 dark:text-amber-400">
        Range against angle is a hump, so a straight line fits it badly (R&sup2; {{ fit.r2 }}). Try choosing <strong>sin(2θ)</strong> for the horizontal axis - range against sin(2θ) is a straight line.
      </p>
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
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, LinearScale, Filler } from 'chart.js'
import type { NotebookEntry, GraphConfig } from '@/types/virtualLab'
import { linearRegression } from '@/utils/linearRegression'

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, LinearScale, Filler)

const props = defineProps<{
  rows: NotebookEntry[]
  config?: GraphConfig | null
  /** The x values are separate samples (1, 2, 3...), not a quantity - ticks read `${prefix}1` etc.,
   *  and points start unjoined with no best-fit line, since neither means anything across samples. */
  discreteXPrefix?: string
  /** A shaded horizontal range to compare the points against (e.g. a reference density range). */
  band?: { min: number; max: number; label: string } | null
}>()

// A derived column that is not stored in the results table but worked out from one that is. Range
// against sin(2*angle) is a straight line (R = v^2 sin(2*angle) / g), unlike range against angle,
// which is a hump - so it is the axis to choose for a meaningful line of best fit.
const SIN_2THETA = 'sin_2theta'
const isDerived = (key: string) => key === SIN_2THETA

function cell(row: NotebookEntry, key: string): number {
  if (key === SIN_2THETA) return Math.sin((2 * Number(row.extra?.angle_deg) * Math.PI) / 180)
  return Number(row.extra?.[key])
}

function humanize(key: string): string {
  if (key === SIN_2THETA) return 'sin(2θ)'
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// Only columns that are numeric across every row can be plotted - a results table's `extra` shape
// is authored per experiment type (see addResultRow/addSpringResultRow/etc in the parent page), so
// this has to check actual values rather than assume a fixed schema.
const numericColumns = computed(() => {
  const first = props.rows[0]?.extra
  if (!first) return []
  const cols = Object.keys(first).filter((key) =>
    props.rows.every((r) => r.extra != null && !Number.isNaN(Number(r.extra[key])))
  )
  return cols.includes('angle_deg') && props.rows.every((r) => r.extra?.angle_deg != null && r.extra.angle_deg !== '')
    ? [...cols, SIN_2THETA]
    : cols
})

// No config (or a config the teacher never enabled) behaves exactly like before this feature -
// free axis choice, 2-point minimum, humanized column names, no best-fit line.
const minPoints = computed(() => (props.config?.enabled ? props.config.min_points : 2))
const axesEditable = computed(() => !props.config?.enabled || props.config.allow_axis_change)

const xKey = ref('')
const yKey = ref('')
// Set once the learner picks an axis themselves; until then the teacher's configured axes are
// (re)applied whenever the columns change, so a row that arrives with more columns doesn't leave
// both axes stuck on whichever column happened to exist first.
const xTouched = ref(false)
const yTouched = ref(false)

watch([numericColumns, () => props.config], ([cols, config]) => {
  const configuredX = config?.enabled && config.x_column && cols.includes(config.x_column) ? config.x_column : null
  const configuredY = config?.enabled && config.y_column && cols.includes(config.y_column) ? config.y_column : null
  if (!xTouched.value || !cols.includes(xKey.value)) xKey.value = configuredX ?? cols[0] ?? ''
  if (!yTouched.value || !cols.includes(yKey.value)) yKey.value = configuredY ?? cols[1] ?? cols[0] ?? ''
  // A locked (non-editable) axis config always wins over whatever was previously selected, even if
  // that previous selection was itself a valid column - the teacher's choice isn't optional here.
  if (config?.enabled && !config.allow_axis_change) {
    if (configuredX) xKey.value = configuredX
    if (configuredY) yKey.value = configuredY
  }
}, { immediate: true })

// The points are joined by default so the graph reads as a graph; the learner can switch to points
// only, or to a smooth curve, which suits non-linear results such as range against angle.
const lineMode = ref<'none' | 'join' | 'smooth'>(props.discreteXPrefix ? 'none' : 'join')

const displayTitle = computed(() => props.config?.enabled && props.config.title ? props.config.title : 'Graph')
// The teacher's axis labels belong to the columns they configured; if the learner switches an axis
// to another column, the label follows the column instead of staying on the old one.
const xAxisLabel = computed(() => props.config?.enabled && props.config.x_label && xKey.value === props.config.x_column ? props.config.x_label : humanize(xKey.value))
const yAxisLabel = computed(() => props.config?.enabled && props.config.y_label && yKey.value === props.config.y_column ? props.config.y_label : humanize(yKey.value))

const points = computed(() => props.rows
  .map((r) => ({ x: cell(r, xKey.value), y: cell(r, yKey.value) }))
  .filter((p) => !Number.isNaN(p.x) && !Number.isNaN(p.y)))

// Best-fit is computed only from the learner's own real recorded points, and only rendered when the
// experiment explicitly asks for it - never replaces or adjusts the actual scatter points.
// The learner can also switch it on; it is a straight line by definition (least squares), so it
// stays straight whatever the points do. On by default.
const showFit = ref(!props.discreteXPrefix)
watch(() => props.config?.show_best_fit, (on) => { if (on) showFit.value = true })
const fit = computed(() => showFit.value ? linearRegression(points.value) : null)

const fitLinePoints = computed(() => {
  if (!fit.value || points.value.length === 0) return []
  const xs = points.value.map((p) => p.x)
  // spans the data only, so drawing the line never stretches the axes
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  return [
    { x: minX, y: (fit.value.slope * minX) + fit.value.intercept },
    { x: maxX, y: (fit.value.slope * maxX) + fit.value.intercept },
  ]
})

// Smooth curve through the points using monotone cubic interpolation (Fritsch-Carlson): it passes
// through every point and never overshoots between them, so it can't invent a peak or dip that the
// readings don't show. Sampled into short straight segments for drawing.
function smoothCurve(pts: { x: number; y: number }[], perSegment = 24): { x: number; y: number }[] {
  const n = pts.length
  if (n < 3) return pts
  const dx: number[] = [], slope: number[] = []
  for (let i = 0; i < n - 1; i++) {
    dx.push(pts[i + 1].x - pts[i].x)
    slope.push(dx[i] === 0 ? 0 : (pts[i + 1].y - pts[i].y) / dx[i])
  }
  const m: number[] = [slope[0]]
  for (let i = 1; i < n - 1; i++) m.push(slope[i - 1] * slope[i] <= 0 ? 0 : (slope[i - 1] + slope[i]) / 2)
  m.push(slope[n - 2])
  for (let i = 0; i < n - 1; i++) {
    if (slope[i] === 0) { m[i] = 0; m[i + 1] = 0; continue }
    const a = m[i] / slope[i], b = m[i + 1] / slope[i]
    const s = a * a + b * b
    if (s > 9) { const t = 3 / Math.sqrt(s); m[i] = t * a * slope[i]; m[i + 1] = t * b * slope[i] }
  }
  const out: { x: number; y: number }[] = []
  for (let i = 0; i < n - 1; i++) {
    for (let k = 0; k < perSegment; k++) {
      const t = k / perSegment, t2 = t * t, t3 = t2 * t, h = dx[i]
      out.push({
        x: pts[i].x + t * h,
        y: (2 * t3 - 3 * t2 + 1) * pts[i].y + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * pts[i + 1].y + (t3 - t2) * h * m[i + 1],
      })
    }
  }
  out.push(pts[n - 1])
  return out
}

const chartData = computed(() => {
  const datasets: any[] = [{
    type: 'scatter',
    label: `${yAxisLabel.value} vs ${xAxisLabel.value}`,
    data: points.value,
    backgroundColor: 'rgba(79, 70, 229, 0.75)',
    borderColor: 'rgba(79, 70, 229, 1)',
    pointRadius: 5,
    pointHoverRadius: 7,
    order: 0,
  }]
  if (lineMode.value !== 'none' && points.value.length >= 2) {
    // A joining line has to run left to right whatever order the readings were taken in. Drawn as its
    // own line series (like the best-fit line) rather than switching the scatter series' showLine on.
    const sorted = [...points.value].sort((a, b) => a.x - b.x)
    datasets.push({
      type: 'line',
      label: lineMode.value === 'smooth' ? 'Smooth curve' : 'Joined points',
      data: lineMode.value === 'smooth' ? smoothCurve(sorted) : sorted,
      borderColor: 'rgba(79, 70, 229, 0.85)',
      borderWidth: 2,
      pointRadius: 0,
      pointHitRadius: 0,
      fill: false,
      tension: 0,
      order: 1,
    })
  }
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
  if (props.band && points.value.length) {
    // Spans the plotted x range (padded half a step for discrete samples) - the lower edge is drawn
    // first so the upper one can fill down to it.
    const xs = points.value.map((p) => p.x)
    const pad = props.discreteXPrefix ? 0.5 : 0
    const x0 = Math.min(...xs) - pad
    const x1 = Math.max(...xs) + pad
    const edge = { type: 'line', borderColor: 'rgba(16, 185, 129, 0.7)', borderWidth: 1, borderDash: [4, 3], pointRadius: 0, pointHitRadius: 0, tension: 0 }
    datasets.push(
      { ...edge, label: '_band_min', data: [{ x: x0, y: props.band.min }, { x: x1, y: props.band.min }], fill: false },
      { ...edge, label: props.band.label, data: [{ x: x0, y: props.band.max }, { x: x1, y: props.band.max }], fill: '-1', backgroundColor: 'rgba(16, 185, 129, 0.15)' },
    )
  }
  return { datasets }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: !!fit.value || !!props.band,
      labels: { filter: (item: { text: string }) => !item.text.startsWith('_band') },
    },
  },
  scales: {
    x: {
      type: 'linear' as const,
      title: { display: true, text: xAxisLabel.value },
      // Half a step of room either side of the first and last sample, with only the samples
      // themselves labelled (no "M0"/"M7" on the padding).
      ...(props.discreteXPrefix && points.value.length
        ? (() => {
            const xs = points.value.map((p) => p.x)
            const lo = Math.min(...xs), hi = Math.max(...xs)
            const sampleTicks = Array.from({ length: Math.floor(hi) - Math.ceil(lo) + 1 }, (_, i) => ({ value: Math.ceil(lo) + i }))
            return {
              min: lo - 0.5,
              max: hi + 0.5,
              afterBuildTicks: (axis: { ticks: { value: number }[] }) => { axis.ticks = sampleTicks },
              ticks: { callback: (v: string | number) => `${props.discreteXPrefix}${v}` },
            }
          })()
        : {}),
    },
    y: { title: { display: true, text: yAxisLabel.value } },
  },
}))

// Read by the parent page at submit time so the frozen per-attempt snapshot reflects whichever
// axes the learner was actually viewing (only meaningful when the config allows changing them).
// A derived column exists only in this view, so it is reported as "no choice" and the server falls
// back to the experiment's configured columns for the saved snapshot.
defineExpose({
  xKey: computed(() => (isDerived(xKey.value) ? '' : xKey.value)),
  yKey: computed(() => (isDerived(yKey.value) ? '' : yKey.value)),
})
</script>
