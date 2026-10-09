<template>
  <!-- A graph the student draws themselves: choose the axes, plot each point by hand, draw a line of
       best fit, pick two points on it and work out the gradient (and whatever it gives). Same flow as
       the torch-bulb practical's I-V graph, configured per experiment. -->
  <div class="space-y-4">
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">{{ config.title }}</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Plot the graph yourself from your results table. First choose which quantity goes on each axis.</p>

      <div class="flex flex-wrap items-end gap-2 mb-3">
        <label class="text-[11px] text-gray-500 dark:text-gray-400">Horizontal (x) axis
          <select v-model="axisX" :disabled="readOnly || state.axes.ok" class="input-field block text-xs py-1 mt-0.5"><option :value="null">Choose...</option><option v-for="q in config.axisOptions" :key="q.key" :value="q.key">{{ q.label }}</option></select>
        </label>
        <label class="text-[11px] text-gray-500 dark:text-gray-400">Vertical (y) axis
          <select v-model="axisY" :disabled="readOnly || state.axes.ok" class="input-field block text-xs py-1 mt-0.5"><option :value="null">Choose...</option><option v-for="q in config.axisOptions" :key="q.key" :value="q.key">{{ q.label }}</option></select>
        </label>
        <button v-if="!state.axes.ok" type="button" :disabled="readOnly" @click="setAxes" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">Set axes</button>
        <span v-else class="text-xs font-semibold text-emerald-700 dark:text-emerald-400">✓ Axes set: {{ config.ySym }} (y) against {{ config.xSym }} (x)</span>
      </div>
      <p v-if="axisMessage" class="mb-3 text-xs font-medium text-red-600 dark:text-red-400">{{ axisMessage }}</p>

      <template v-if="state.axes.ok">
        <div class="flex flex-wrap gap-1.5 mb-2">
          <button v-for="m in MODES" :key="m.key" type="button" :disabled="readOnly" @click="mode = m.key"
            class="px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
            :class="mode === m.key ? 'bg-indigo-600 text-white shadow-sm' : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'">{{ m.label }}</button>
        </div>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-2">{{ modeHelp }}</p>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div class="xl:col-span-2">
            <svg
              ref="svgEl"
              :viewBox="`0 0 ${GW} ${GH}`"
              class="w-full h-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white touch-none"
              :class="readOnly ? '' : 'cursor-crosshair'"
              @pointerdown="onGraphDown"
              @pointermove="onGraphMove"
              @pointerup="onGraphUp"
              @pointerleave="onGraphUp"
            >
              <line v-for="g in grid.minorX" :key="'mx' + g" :x1="sx(g)" :x2="sx(g)" :y1="PT" :y2="PB" stroke="#fecaca" stroke-width="0.5" />
              <line v-for="g in grid.minorY" :key="'my' + g" :y1="sy(g)" :y2="sy(g)" :x1="PL" :x2="PR" stroke="#fecaca" stroke-width="0.5" />
              <line v-for="g in grid.majorX" :key="'Mx' + g" :x1="sx(g)" :x2="sx(g)" :y1="PT" :y2="PB" stroke="#f87171" stroke-width="0.9" />
              <line v-for="g in grid.majorY" :key="'My' + g" :y1="sy(g)" :y2="sy(g)" :x1="PL" :x2="PR" stroke="#f87171" stroke-width="0.9" />
              <line :x1="PL" :x2="PR" :y1="PB" :y2="PB" stroke="#0f172a" stroke-width="1.6" />
              <line :x1="PL" :x2="PL" :y1="PT" :y2="PB" stroke="#0f172a" stroke-width="1.6" />
              <text v-for="g in grid.majorX" :key="'lx' + g" :x="sx(g)" :y="PB + 15" text-anchor="middle" font-size="11" fill="#0f172a">{{ fmt(g) }}</text>
              <text v-for="g in grid.majorY" :key="'ly' + g" :x="PL - 6" :y="sy(g) + 4" text-anchor="end" font-size="11" fill="#0f172a">{{ fmt(g) }}</text>
              <text :x="(PL + PR) / 2" :y="GH - 6" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">{{ config.xLabel }}</text>
              <text :x="14" :y="(PT + PB) / 2" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a" :transform="`rotate(-90 14 ${(PT + PB) / 2})`">{{ config.yLabel }}</text>

              <line v-if="lineSegment" :x1="sx(lineSegment[0].x)" :y1="sy(lineSegment[0].y)" :x2="sx(lineSegment[1].x)" :y2="sy(lineSegment[1].y)" stroke="#2563eb" stroke-width="1.6" />
              <template v-if="state.picks.length === 2">
                <line :x1="sx(state.picks[0].x)" :y1="sy(state.picks[0].y)" :x2="sx(state.picks[1].x)" :y2="sy(state.picks[0].y)" stroke="#059669" stroke-width="1.3" stroke-dasharray="5 3" />
                <line :x1="sx(state.picks[1].x)" :y1="sy(state.picks[0].y)" :x2="sx(state.picks[1].x)" :y2="sy(state.picks[1].y)" stroke="#059669" stroke-width="1.3" stroke-dasharray="5 3" />
                <text :x="(sx(state.picks[0].x) + sx(state.picks[1].x)) / 2" :y="sy(state.picks[0].y) + 14" text-anchor="middle" font-size="11" font-weight="700" fill="#059669">&Delta;x</text>
                <text :x="sx(state.picks[1].x) + 6" :y="(sy(state.picks[0].y) + sy(state.picks[1].y)) / 2" font-size="11" font-weight="700" fill="#059669">&Delta;y</text>
              </template>
              <circle v-for="(p, i) in state.picks" :key="'pk' + i" :cx="sx(p.x)" :cy="sy(p.y)" r="4.5" fill="#059669" />
              <template v-if="config.intercept && state.interceptOk && hasLine && lineSlope !== null">
                <circle :cx="sx(0)" :cy="sy(lineAt(0))" r="5" fill="none" stroke="#7c3aed" stroke-width="2" />
                <text :x="sx(0) + 8" :y="sy(lineAt(0)) - 6" font-size="11" font-weight="700" fill="#7c3aed">{{ config.intercept.symbol }}</text>
              </template>
              <text v-for="(p, i) in state.picks" :key="'pkl' + i" :x="sx(p.x) - 8" :y="sy(p.y) - 8" font-size="11" font-weight="700" fill="#059669">P{{ i + 1 }}</text>
              <template v-if="mode === 'line'">
                <circle v-for="h in lineHandles" :key="h.which" :cx="sx(h.p.x)" :cy="sy(h.p.y)" r="6" fill="#ffffff" stroke="#2563eb" stroke-width="2" class="cursor-move" />
              </template>
              <g v-for="(p, i) in state.points" :key="'pt' + i" stroke="#0f172a" stroke-width="1.6">
                <line :x1="sx(p.x) - 4" :y1="sy(p.y) - 4" :x2="sx(p.x) + 4" :y2="sy(p.y) + 4" />
                <line :x1="sx(p.x) - 4" :y1="sy(p.y) + 4" :x2="sx(p.x) + 4" :y2="sy(p.y) - 4" />
              </g>
              <text v-if="cursor" :x="PR - 4" :y="PT + 12" text-anchor="end" font-size="10" fill="#64748b">{{ config.xSym }} = {{ fmtV(cursor.x) }}, {{ config.ySym }} = {{ fmtV(cursor.y) }}</text>
            </svg>
          </div>

          <div class="space-y-3">
            <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3">
              <p class="text-[11px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Plotting checklist</p>
              <ul class="space-y-0.5 text-xs">
                <li v-for="c in plotMatches" :key="c.key" class="flex justify-between gap-2" :class="c.plotted ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'">
                  <span>{{ c.label }} <span class="text-gray-400">({{ fmtV(c.x) }}, {{ fmtV(c.y) }})</span></span><span class="font-bold">{{ c.plotted ? '✓' : '○' }}</span>
                </li>
              </ul>
              <form v-if="!readOnly" class="mt-2 flex items-end gap-1.5" @submit.prevent="plotTyped">
                <label class="text-[10px] text-gray-500">{{ config.xSym }}<input v-model="typedX" type="number" step="any" class="input-field w-16 text-xs py-1 block"></label>
                <label class="text-[10px] text-gray-500">{{ config.ySym }}<input v-model="typedY" type="number" step="any" class="input-field w-16 text-xs py-1 block"></label>
                <button type="submit" class="px-2 py-1.5 text-[11px] font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Plot</button>
              </form>
              <p class="text-[10px] text-gray-400 mt-1">Or click on the graph paper. Click a cross again (in Plot mode) to remove it.</p>
            </div>

            <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3 space-y-2">
              <p class="text-[11px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">Line of best fit</p>
              <div class="flex flex-wrap gap-1.5">
                <button type="button" :disabled="readOnly || !hasLine" @click="checkLine" class="px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">Check my line</button>
                <button type="button" :disabled="readOnly || state.points.length < 2" @click="generateLine" class="px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50">Generate line</button>
              </div>
              <p v-if="lineFeedback" class="text-xs" :class="lineFeedback.ok ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'">{{ lineFeedback.text }}</p>
              <p v-if="state.line.generated" class="text-[10px] text-gray-400">Generated by the computer - try drawing it yourself too.</p>
            </div>
          </div>
        </div>
      </template>
    </section>

    <section v-if="state.axes.ok" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">Gradient of your graph</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Use <strong>Select two points</strong> and click two points on your line of best fit, far apart. Then choose the formula and work out the gradient.</p>
      <div v-if="state.picks.length === 2" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="text-sm space-y-1 text-gray-700 dark:text-gray-200">
          <p>P<sub>1</sub>: {{ config.xSym }} = <strong>{{ fmtV(state.picks[0].x) }}</strong>, {{ config.ySym }} = <strong>{{ fmtV(state.picks[0].y) }}</strong></p>
          <p>P<sub>2</sub>: {{ config.xSym }} = <strong>{{ fmtV(state.picks[1].x) }}</strong>, {{ config.ySym }} = <strong>{{ fmtV(state.picks[1].y) }}</strong></p>
          <p v-if="picksTooClose" class="text-xs text-amber-700 dark:text-amber-400">These points are close together. Choosing points far apart (a large triangle) gives a more accurate gradient.</p>
          <div class="pt-2">
            <p class="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1">Formula for the gradient s of this graph:</p>
            <label class="flex items-center gap-2 text-sm"><input v-model="state.formula" type="radio" value="dy/dx" :disabled="readOnly || state.gradientOk"> s = &Delta;{{ config.ySym }} / &Delta;{{ config.xSym }}</label>
            <label class="flex items-center gap-2 text-sm"><input v-model="state.formula" type="radio" value="dx/dy" :disabled="readOnly || state.gradientOk"> s = &Delta;{{ config.xSym }} / &Delta;{{ config.ySym }}</label>
          </div>
        </div>
        <div>
          <form class="flex items-center gap-2" @submit.prevent="checkGradient">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-200">Gradient s =</label>
            <input v-model="state.gradientInput" type="number" step="any" :disabled="readOnly || state.gradientOk" class="input-field w-28 text-sm py-1">
            <span class="text-sm text-gray-500">{{ config.gradientUnit }}</span>
            <button v-if="!state.gradientOk" type="submit" :disabled="readOnly" class="ml-auto px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">Check</button>
          </form>
          <p v-if="gradientFeedback" class="mt-2 text-xs" :class="state.gradientOk ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">{{ gradientFeedback }}</p>
          <div v-if="state.gradientChecks > 0 && autoGradient !== null" class="mt-2 rounded-lg bg-gray-50 dark:bg-gray-900/40 p-2.5 text-xs text-gray-600 dark:text-gray-300">
            Automatic calculation: s = &Delta;{{ config.ySym }} / &Delta;{{ config.xSym }} = ({{ fmtV(state.picks[1].y) }} &minus; {{ fmtV(state.picks[0].y) }}) / ({{ fmtV(state.picks[1].x) }} &minus; {{ fmtV(state.picks[0].x) }}) = <strong>{{ fmtV(autoGradient) }} {{ config.gradientUnit }}</strong>
          </div>
        </div>
      </div>
      <p v-else class="text-xs text-gray-400">{{ hasLine ? 'Select two points on your line.' : 'Draw your line of best fit first.' }}</p>
    </section>

    <section v-if="state.gradientOk" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">{{ config.result.title }}</h3>
      <div class="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 p-3 text-sm text-indigo-900 dark:text-indigo-100 mb-3">{{ config.result.explanation }}</div>
      <form class="flex flex-wrap items-center gap-2" @submit.prevent="checkResult">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-200">{{ config.result.symbol }} =</label>
        <input v-model="state.resultInput" type="number" step="any" :disabled="readOnly || state.resultOk" class="input-field w-28 text-sm py-1">
        <span class="text-sm text-gray-500">{{ config.result.unit }}</span>
        <button v-if="!state.resultOk" type="submit" :disabled="readOnly" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">Check</button>
      </form>
      <p v-if="resultFeedback" class="mt-2 text-xs" :class="state.resultOk ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">{{ resultFeedback }}</p>
    </section>

    <!-- Optional: what the line's intercept on the y-axis gives (e.g. the emf) -->
    <section v-if="config.intercept && state.resultOk" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">{{ config.intercept.title }}</h3>
      <div class="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 p-3 text-sm text-indigo-900 dark:text-indigo-100 mb-3">{{ config.intercept.explanation }}</div>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Read where your line of best fit crosses the {{ config.ySym }}-axis (at {{ config.xSym }} = 0) on the graph above.</p>
      <form class="flex flex-wrap items-center gap-2" @submit.prevent="checkIntercept">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-200">{{ config.ySym }}-axis intercept =</label>
        <input v-model="state.interceptInput" type="number" step="any" :disabled="readOnly || state.interceptOk" class="input-field w-28 text-sm py-1">
        <span class="text-sm text-gray-500">{{ config.intercept.unit }}</span>
        <button v-if="!state.interceptOk" type="submit" :disabled="readOnly" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">Check</button>
      </form>
      <p v-if="interceptFeedback" class="mt-2 text-xs" :class="state.interceptOk ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">{{ interceptFeedback }}</p>
      <p v-if="state.interceptOk" class="mt-2 text-sm font-semibold text-gray-800 dark:text-gray-100">Therefore {{ config.intercept.symbol }} = {{ state.interceptInput }} {{ config.intercept.unit }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onBeforeUnmount } from 'vue'
import { linearRegression } from '@/utils/linearRegression'
import type { NotebookEntry } from '@/types/virtualLab'

export interface StudentGraphConfig {
  title: string
  axisOptions: { key: string; label: string }[]
  /** The axis keys the practical asks for. */
  xKey: string
  yKey: string
  /** Axis titles with units, and the short symbols used in the working. */
  xLabel: string
  yLabel: string
  xSym: string
  ySym: string
  gradientUnit: string
  /** Shown when the student picks the wrong axes. */
  axisMessage: string
  /** Shown when the student uses the upside-down gradient formula. */
  formulaMessage: string
  /** What the gradient gives - e.g. the focal length f = s. */
  result: { title: string; symbol: string; unit: string; explanation: string; fromGradient: (s: number) => number; name: string }
  /** Optional: what the y-axis intercept of the line gives (e.g. the emf E = V-intercept). */
  intercept?: { title: string; symbol: string; unit: string; explanation: string; name: string }
}
interface Pt { x: number; y: number }
interface GraphState {
  axes: { x: string | null; y: string | null; attempts: number; ok: boolean }
  points: Pt[]
  line: { a: Pt | null; b: Pt | null; generated: boolean; checks: number }
  picks: Pt[]
  formula: 'dy/dx' | 'dx/dy' | null
  wrongFormula: number
  gradientInput: string
  gradientChecks: number
  gradientOk: boolean
  resultInput: string
  resultChecks: number
  resultOk: boolean
  interceptInput: string
  interceptChecks: number
  interceptOk: boolean
}

const props = defineProps<{
  config: StudentGraphConfig
  /** The results-table points the student should plot, with a label for each. */
  rows: { key: string; label: string; x: number; y: number }[]
  saved: NotebookEntry | null
  readOnly?: boolean
}>()
const emit = defineEmits<{
  save: [extra: Record<string, unknown>]
  blocker: [message: string | null]
}>()

/** Sensible precision for whatever size the numbers are. */
const fmtV = (n: number) => {
  if (!Number.isFinite(n)) return '-'
  const a = Math.abs(n)
  return String(Math.round(n * (a >= 100 ? 1 : a >= 10 ? 10 : a >= 1 ? 100 : 1000)) / (a >= 100 ? 1 : a >= 10 ? 10 : a >= 1 ? 100 : 1000))
}
const fmt = (n: number) => String(Math.round(n * 10000) / 10000)

const blank = (): GraphState => ({
  axes: { x: null, y: null, attempts: 0, ok: false }, points: [], line: { a: null, b: null, generated: false, checks: 0 }, picks: [],
  formula: null, wrongFormula: 0, gradientInput: '', gradientChecks: 0, gradientOk: false, resultInput: '', resultChecks: 0, resultOk: false, interceptInput: '', interceptChecks: 0, interceptOk: false,
})
const state = reactive<GraphState>(blank())
const axisX = ref<string | null>(null)
const axisY = ref<string | null>(null)
let initialised = false
watch(() => props.saved, (entry) => {
  if (initialised) return
  initialised = true
  if (entry?.extra) {
    const { summary: _s, ...saved } = entry.extra as GraphState & { summary?: unknown }
    Object.assign(state, blank(), saved)
    axisX.value = state.axes.x
    axisY.value = state.axes.y
  }
}, { immediate: true })

// --- Axes ---------------------------------------------------------------------------------------------
const axisMessage = ref<string | null>(null)
function setAxes() {
  if (!axisX.value || !axisY.value) { axisMessage.value = 'Choose a quantity for both axes.'; return }
  state.axes.x = axisX.value
  state.axes.y = axisY.value
  if (axisX.value === props.config.xKey && axisY.value === props.config.yKey) { state.axes.ok = true; axisMessage.value = null } else { state.axes.attempts++; axisMessage.value = props.config.axisMessage }
}

// --- Graph paper ----------------------------------------------------------------------------------------
const GW = 560, GH = 420
const PL = 66, PR = 540, PT = 16, PB = 376
const STEPS = [0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 2.5, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000]
const niceStep = (max: number) => STEPS.find(s => max / s <= 8) ?? 10000
/** Where the trend of the results meets the y-axis - when the intercept is to be read off the graph,
 *  the y scale must reach it (as a student choosing their own scale would make sure of). */
const trendIntercept = computed(() => {
  if (!props.config.intercept || props.rows.length < 2) return 0
  const fit = linearRegression(props.rows.map(r => ({ x: r.x, y: r.y })))
  return fit ? Math.max(0, fit.intercept) : 0
})
const dataMax = computed(() => ({
  x: Math.max(1e-9, ...props.rows.map(r => r.x), ...state.points.map(p => p.x)),
  y: Math.max(1e-9, trendIntercept.value, ...props.rows.map(r => r.y), ...state.points.map(p => p.y)),
}))
const scale = computed(() => {
  const stepX = niceStep(dataMax.value.x * 1.05), stepY = niceStep(dataMax.value.y * 1.05)
  return { stepX, stepY, maxX: Math.ceil((dataMax.value.x * 1.05) / stepX) * stepX, maxY: Math.ceil((dataMax.value.y * 1.05) / stepY) * stepY }
})
const range = (max: number, step: number) => Array.from({ length: Math.round(max / step) + 1 }, (_, i) => Math.round(i * step * 10000) / 10000)
const grid = computed(() => ({
  majorX: range(scale.value.maxX, scale.value.stepX), majorY: range(scale.value.maxY, scale.value.stepY),
  minorX: range(scale.value.maxX, scale.value.stepX / 5), minorY: range(scale.value.maxY, scale.value.stepY / 5),
}))
const sx = (x: number) => PL + (x / scale.value.maxX) * (PR - PL)
const sy = (y: number) => PB - (y / scale.value.maxY) * (PB - PT)
const halfMinor = computed(() => ({ x: scale.value.stepX / 10, y: scale.value.stepY / 10 }))
/** Rounds a reading taken off the graph to a tenth of a small square. */
const snap = (v: number, step: number) => { const q = step / 50; return Math.round(Math.max(0, v) / q) * q }

const svgEl = ref<SVGSVGElement | null>(null)
function toData(ev: PointerEvent): Pt | null {
  const svg = svgEl.value
  const ctm = svg?.getScreenCTM()
  if (!svg || !ctm) return null
  const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(ctm.inverse())
  if (p.x < PL - 4 || p.x > PR + 4 || p.y < PT - 4 || p.y > PB + 4) return null
  return { x: snap(((p.x - PL) / (PR - PL)) * scale.value.maxX, scale.value.stepX), y: snap(((PB - p.y) / (PB - PT)) * scale.value.maxY, scale.value.stepY) }
}
const pxDist = (a: Pt, b: Pt) => Math.hypot(sx(a.x) - sx(b.x), sy(a.y) - sy(b.y))

// --- Plotting, line, picks ------------------------------------------------------------------------------
type Mode = 'plot' | 'line' | 'pick'
const MODES: { key: Mode; label: string }[] = [{ key: 'plot', label: 'Plot points' }, { key: 'line', label: 'Draw best-fit line' }, { key: 'pick', label: 'Select two points' }]
const mode = ref<Mode>('plot')
const modeHelp = computed(() => ({
  plot: 'Click the graph paper where each point belongs and a cross is plotted there. Plot every row of your results table.',
  line: 'Click two places to set the ends of your straight line, then drag the round handles until the points are balanced either side of it.',
  pick: 'Click two points on your line, far apart. They snap onto the line.',
}[mode.value]))
const cursor = ref<Pt | null>(null)
let dragging: 'a' | 'b' | null = null
const hasLine = computed(() => !!state.line.a && !!state.line.b && pxDist(state.line.a, state.line.b) > 4)
const lineHandles = computed(() => [state.line.a ? { which: 'a' as const, p: state.line.a } : null, state.line.b ? { which: 'b' as const, p: state.line.b } : null].filter(Boolean) as { which: 'a' | 'b'; p: Pt }[])
const lineSlope = computed(() => (hasLine.value && state.line.a!.x !== state.line.b!.x ? (state.line.b!.y - state.line.a!.y) / (state.line.b!.x - state.line.a!.x) : null))
const lineAt = (x: number) => state.line.a!.y + lineSlope.value! * (x - state.line.a!.x)
const lineSegment = computed<[Pt, Pt] | null>(() => {
  if (!hasLine.value || lineSlope.value === null) return null
  const pts: Pt[] = []
  const add = (p: Pt) => { if (p.x >= -1e-9 && p.x <= scale.value.maxX + 1e-9 && p.y >= -1e-9 && p.y <= scale.value.maxY + 1e-9) pts.push(p) }
  add({ x: 0, y: lineAt(0) })
  add({ x: scale.value.maxX, y: lineAt(scale.value.maxX) })
  if (lineSlope.value !== 0) {
    add({ x: state.line.a!.x + (0 - state.line.a!.y) / lineSlope.value, y: 0 })
    add({ x: state.line.a!.x + (scale.value.maxY - state.line.a!.y) / lineSlope.value, y: scale.value.maxY })
  }
  if (pts.length < 2) return null
  pts.sort((p, q) => p.x - q.x)
  return [pts[0], pts[pts.length - 1]]
})

function onGraphDown(ev: PointerEvent) {
  if (props.readOnly) return
  const p = toData(ev)
  if (!p) return
  if (mode.value === 'plot') {
    const near = state.points.findIndex(q => pxDist(q, p) < 7)
    if (near >= 0) state.points.splice(near, 1)
    else if (state.points.length < 12) state.points.push(p)
    resetDownstream(true)
  } else if (mode.value === 'line') {
    const handle = lineHandles.value.find(h => pxDist(h.p, p) < 10)
    if (handle) { dragging = handle.which; (ev.target as Element).setPointerCapture?.(ev.pointerId); return }
    if (!state.line.a || state.line.b) { state.line.a = p; state.line.b = null } else state.line.b = p
    state.line.generated = false
    resetDownstream(true)
  } else if (hasLine.value) {
    if (state.picks.length >= 2) state.picks.splice(0, state.picks.length)
    state.picks.push(projectOntoLine(p))
    state.picks.sort((a, b) => a.x - b.x)
    resetDownstream(false)
  }
}
function onGraphMove(ev: PointerEvent) {
  const p = toData(ev)
  cursor.value = p
  if (!dragging || !p) return
  state.line[dragging] = p
  state.line.generated = false
}
function onGraphUp() { if (dragging) resetDownstream(true); dragging = null }
function projectOntoLine(p: Pt): Pt {
  const a = state.line.a!, b = state.line.b!
  const ax = sx(a.x), ay = sy(a.y), bx = sx(b.x), by = sy(b.y), px = sx(p.x), py = sy(p.y)
  const t = ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / ((bx - ax) ** 2 + (by - ay) ** 2)
  return { x: snap(a.x + t * (b.x - a.x), scale.value.stepX), y: snap(a.y + t * (b.y - a.y), scale.value.stepY) }
}
function resetDownstream(clearPicks: boolean) {
  lineFeedback.value = null
  if (clearPicks) state.picks.splice(0, state.picks.length)
  state.gradientOk = false
  state.resultOk = false
  state.interceptOk = false
  gradientFeedback.value = null
  resultFeedback.value = null
}
const typedX = ref('')
const typedY = ref('')
function plotTyped() {
  const x = Number(typedX.value), y = Number(typedY.value)
  if (typedX.value === '' || typedY.value === '' || !Number.isFinite(x) || !Number.isFinite(y) || state.points.length >= 12) return
  state.points.push({ x, y })
  typedX.value = ''
  typedY.value = ''
  resetDownstream(true)
}
const plotMatches = computed(() => props.rows.map(r => ({
  ...r,
  plotted: state.points.some(p => Math.abs(p.x - r.x) <= halfMinor.value.x + 1e-9 && Math.abs(p.y - r.y) <= halfMinor.value.y + 1e-9),
})))

// --- Line of best fit -----------------------------------------------------------------------------------
const fitOfPoints = computed(() => linearRegression(state.points))
const lineFeedback = ref<{ ok: boolean; text: string } | null>(null)
function checkLine() {
  state.line.checks++
  const fit = fitOfPoints.value
  if (!hasLine.value || lineSlope.value === null || !fit) { lineFeedback.value = { ok: false, text: 'Plot your points and draw a straight line first.' }; return }
  const ratio = lineSlope.value / fit.slope
  const mean = state.points.reduce((sum, p) => sum + (p.y - lineAt(p.x)), 0) / state.points.length
  if (Math.abs(ratio - 1) <= 0.08 && Math.abs(mean) <= halfMinor.value.y * 2) lineFeedback.value = { ok: true, text: 'Good line of best fit - the points are spread evenly either side of it.' }
  else if (ratio > 1.08) lineFeedback.value = { ok: false, text: 'Your line is steeper than the trend of the points. Rotate it so the points are balanced either side.' }
  else if (ratio < 0.92) lineFeedback.value = { ok: false, text: 'Your line is less steep than the trend of the points. Rotate it so the points are balanced either side.' }
  else lineFeedback.value = { ok: false, text: mean > 0 ? 'Most points lie above your line - move it up a little.' : 'Most points lie below your line - move it down a little.' }
}
function generateLine() {
  const fit = fitOfPoints.value
  if (!fit) return
  const xs = state.points.map(p => p.x)
  const lo = Math.min(...xs), hi = Math.max(...xs)
  state.line.a = { x: lo, y: fit.intercept + fit.slope * lo }
  state.line.b = { x: hi, y: fit.intercept + fit.slope * hi }
  state.line.generated = true
  resetDownstream(true)
  lineFeedback.value = { ok: true, text: 'Least-squares line of best fit drawn through your points.' }
}

// --- Gradient and result --------------------------------------------------------------------------------
const autoGradient = computed(() => {
  if (state.picks.length !== 2) return null
  const [p1, p2] = state.picks
  return p2.x === p1.x ? null : (p2.y - p1.y) / (p2.x - p1.x)
})
const picksTooClose = computed(() => {
  if (state.picks.length !== 2) return false
  const xs = state.points.map(p => p.x)
  const span = xs.length ? Math.max(...xs) - Math.min(...xs) : 0
  return Math.abs(state.picks[1].x - state.picks[0].x) < Math.max(scale.value.stepX / 2, span * 0.5)
})
const gradientFeedback = ref<string | null>(null)
const resultFeedback = ref<string | null>(null)
const close = (a: number, b: number, rel: number) => Math.abs(a - b) <= Math.abs(b) * rel + 1e-9
function checkGradient() {
  const s = autoGradient.value
  if (s === null) return
  if (!state.formula) { gradientFeedback.value = 'Choose the formula for the gradient first.'; return }
  const typed = Number(state.gradientInput)
  if (state.gradientInput === '' || !Number.isFinite(typed)) { gradientFeedback.value = 'Enter your value for the gradient.'; return }
  state.gradientChecks++
  if (state.formula === 'dx/dy' || (s !== 0 && close(typed, 1 / s, 0.02) && !close(typed, s, 0.02))) { state.wrongFormula++; gradientFeedback.value = props.config.formulaMessage; return }
  if (close(typed, s, 0.02)) { state.gradientOk = true; gradientFeedback.value = `Correct - the gradient is ${fmtV(s)} ${props.config.gradientUnit}.` } else gradientFeedback.value = `Not quite. Work out Δ${props.config.ySym} and Δ${props.config.xSym} from your two points, then divide Δ${props.config.ySym} by Δ${props.config.xSym}.`
}
const studentGradient = computed(() => Number(state.gradientInput))
/** The y-intercept of the student's own line, to check their reading of it against. */
const lineIntercept = computed(() => (hasLine.value && lineSlope.value !== null ? lineAt(0) : null))
const interceptFeedback = ref<string | null>(null)
function checkIntercept() {
  const typed = Number(state.interceptInput)
  if (state.interceptInput === '' || !Number.isFinite(typed)) { interceptFeedback.value = 'Enter the value where your line crosses the axis.'; return }
  const c = lineIntercept.value
  if (c === null) return
  state.interceptChecks++
  // Within half a small square of where the student's own line crosses the axis
  if (Math.abs(typed - c) <= Math.max(halfMinor.value.y, Math.abs(c) * 0.02)) {
    state.interceptOk = true
    interceptFeedback.value = `Correct - your line crosses the ${props.config.ySym}-axis at about ${fmtV(c)} ${props.config.intercept!.unit}.`
  } else {
    interceptFeedback.value = `Not quite. Follow your line of best fit to ${props.config.xSym} = 0 and read the value on the ${props.config.ySym}-axis.`
  }
}
function checkResult() {
  const typed = Number(state.resultInput)
  if (state.resultInput === '' || !Number.isFinite(typed)) { resultFeedback.value = `Enter your value for ${props.config.result.symbol}.`; return }
  state.resultChecks++
  const expected = props.config.result.fromGradient(studentGradient.value)
  if (close(typed, expected, 0.02)) { state.resultOk = true; resultFeedback.value = `Correct - ${props.config.result.symbol} = ${fmtV(expected)} ${props.config.result.unit}.` } else resultFeedback.value = `Not quite. ${props.config.result.explanation}`
}

// --- Saving and the submit gate -------------------------------------------------------------------------
let saveTimer = 0
watch(() => JSON.stringify(state), () => {
  if (props.readOnly) return
  window.clearTimeout(saveTimer)
  saveTimer = window.setTimeout(() => {
    emit('save', {
      ...JSON.parse(JSON.stringify(state)),
      summary: { gradient: state.gradientOk ? studentGradient.value : null, result_name: props.config.result.name, result: state.resultOk ? Number(state.resultInput) : null, result_unit: props.config.result.unit, points_plotted: plotMatches.value.filter(m => m.plotted).length, intercept_name: props.config.intercept?.name ?? null, intercept: state.interceptOk ? Number(state.interceptInput) : null, intercept_unit: props.config.intercept?.unit ?? null },
    })
  }, 900)
})
onBeforeUnmount(() => window.clearTimeout(saveTimer))

const blocker = computed<string | null>(() => {
  if (!state.axes.ok) return 'Set the axes of your graph.'
  if (plotMatches.value.some(m => !m.plotted)) return 'Plot every point from your results table on your graph.'
  if (!hasLine.value) return 'Draw your line of best fit.'
  if (!state.gradientOk) return 'Work out the gradient of your line.'
  if (!state.resultOk) return `Work out the ${props.config.result.name} from your gradient.`
  if (props.config.intercept && !state.interceptOk) return `Read the ${props.config.intercept.name} from the intercept of your line.`
  return null
})
watch(blocker, m => emit('blocker', m), { immediate: true })
</script>
