<template>
  <div class="space-y-5">
    <!-- 1. Variables -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2" :class="showVariables ? 'mb-1' : ''">
        <h3 class="text-sm font-bold text-gray-900 dark:text-white">1. Variables</h3>
        <button type="button" @click="showVariables = !showVariables" class="px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">{{ showVariables ? 'Hide' : 'Show' }}</button>
      </div>
      <p v-if="showVariables" class="text-xs text-gray-500 dark:text-gray-400 mb-3">The variables in this investigation.</p>
      <div v-if="showVariables" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div v-for="v in VARIABLES" :key="v.key" class="flex items-center justify-between gap-2 rounded-xl bg-gray-50 dark:bg-gray-900/40 px-3 py-2 text-sm text-gray-700 dark:text-gray-200">
          <span>{{ v.label }}</span>
          <span class="px-2 py-0.5 text-[11px] font-semibold rounded-full whitespace-nowrap" :class="VARIABLE_BADGE[v.answer]">{{ v.answer[0].toUpperCase() + v.answer.slice(1) }}</span>
        </div>
      </div>
    </section>

    <!-- 2. Results table -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
        <h3 class="text-sm font-bold text-gray-900 dark:text-white">2. Results table</h3>
        <button type="button" @click="showWorking = !showWorking" class="px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">{{ showWorking ? 'Hide working' : 'Show how T and T² are worked out' }}</button>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Type the time t your stopwatch showed for 20 oscillations at each length. T = t ÷ 20 and T² = T × T are worked out from it.</p>
      <div class="overflow-x-auto">
        <table class="w-full max-w-2xl text-sm border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr class="bg-indigo-50 dark:bg-indigo-900/30 text-left text-gray-800 dark:text-gray-100">
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">l (m)</th>
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">t for 20 oscillations (s)</th>
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">T (s)</th>
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">T² (s²)</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="r in tableValues" :key="r.key">
              <tr class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900/40">
                <td class="border border-gray-300 dark:border-gray-600 px-3 py-1.5 tabular-nums text-gray-800 dark:text-gray-100">{{ r.key }}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-2 py-1">
                  <input v-model="edits[r.key]" type="number" step="0.01" min="0" :disabled="readOnly" @blur="saveRow(r.key)" class="input-field w-28 text-sm py-1 tabular-nums" :placeholder="r.timed ? 'type t' : 'not timed yet'">
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-3 py-1.5 tabular-nums text-gray-800 dark:text-gray-100">{{ r.complete ? r.T.toFixed(3) : '-' }}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-3 py-1.5 tabular-nums text-gray-800 dark:text-gray-100">{{ r.complete ? r.T2.toFixed(3) : '-' }}</td>
              </tr>
              <tr v-if="showWorking && r.complete">
                <td colspan="4" class="border border-gray-300 dark:border-gray-600 px-3 py-1 text-[11px] text-gray-500 dark:text-gray-400 bg-indigo-50/40 dark:bg-indigo-900/10">
                  T = t ÷ 20 = {{ r.t }} ÷ 20 = <strong>{{ r.T.toFixed(3) }} s</strong> &nbsp;&middot;&nbsp; T² = T × T = {{ r.T.toFixed(3) }} × {{ r.T.toFixed(3) }} = <strong>{{ r.T2.toFixed(3) }} s²</strong>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <p v-if="tableMessage" class="mt-2 text-xs text-amber-700 dark:text-amber-400">{{ tableMessage }}</p>
    </section>

    <!-- 3-4. Graph, gradient and g -->
    <VirtualLabStudentGraph :config="GRAPH" :rows="graphRows" :saved="graphSaved" :read-only="readOnly" @save="onGraphSave" @blocker="graphBlocker = $event" />

    <!-- 5. Compare with 10 m/s² -->
    <section v-if="gValue !== null" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Compare with 10 m/s²</h3>
      <p class="text-sm text-gray-700 dark:text-gray-200 mb-2">Your experimental value: <strong>g = {{ gValue.toFixed(2) }} m/s²</strong>. Does your experimental value support the statement that acceleration due to gravity is approximately 10 m/s²?</p>
      <div class="flex gap-4 text-sm">
        <label class="flex items-center gap-2"><input v-model="state.supports" type="radio" value="yes" :disabled="readOnly"> Yes</label>
        <label class="flex items-center gap-2"><input v-model="state.supports" type="radio" value="no" :disabled="readOnly"> No</label>
      </div>
      <p v-if="state.supports" class="mt-2 text-xs" :class="supportsCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'">{{ supportsFeedback }}</p>
    </section>

    <!-- 6. Conclusion -->
    <section v-if="state.supports" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">Conclusion</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">State the value of g you found (with its unit), and whether it supports the statement that bodies fall freely at about 10 m/s² - answer the grandfather's challenge.</p>
      <textarea
        :value="conclusion"
        @input="emit('update:conclusion', ($event.target as HTMLTextAreaElement).value)"
        :disabled="readOnly"
        rows="3"
        class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="The experiment gives a value of g = ___ m/s², which ..."
      ></textarea>
    </section>


    <!-- 8. Assessment -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
        <h3 class="text-sm font-bold text-gray-900 dark:text-white">Assessment and final results</h3>
        <button type="button" :disabled="readOnly || !!assessBlocker" @click="runAssessment" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50">{{ state.assessment ? 'Re-mark my practical' : 'Mark my practical' }}</button>
      </div>
      <p v-if="assessBlocker && !state.assessment" class="text-xs text-gray-500 dark:text-gray-400">{{ assessBlocker }}</p>
      <template v-if="state.assessment">
        <div class="flex flex-wrap items-center gap-3 mb-3">
          <div class="rounded-xl bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2.5">
            <p class="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 leading-none">{{ state.assessment.total }}<span class="text-sm font-medium text-indigo-400"> / {{ state.assessment.max }}</span></p>
            <p class="text-[11px] text-indigo-600 dark:text-indigo-300 mt-0.5">{{ Math.round((state.assessment.total / state.assessment.max) * 100) }}% - {{ gradeWord(state.assessment.total / state.assessment.max) }}</p>
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-300 space-y-0.5">
            <p>Gradient S = <strong>{{ graphState?.gradientInput ?? '-' }} s²/m</strong>, so g = 4π² / S = <strong>{{ gValue?.toFixed(2) ?? '-' }} m/s²</strong></p>
            <p>Compared with 10 m/s²: {{ gValue !== null ? Math.abs(Math.round((gValue - 10) * 10) / 10) + ' m/s² ' + (gValue >= 10 ? 'above' : 'below') : '-' }}</p>
            <p v-if="trueG">From the stopwatch readings themselves: g = {{ trueG.toFixed(2) }} m/s²</p>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-xs border-collapse">
            <thead><tr class="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"><th class="py-1.5 pr-2 font-semibold">Criterion</th><th class="py-1.5 pr-2 font-semibold whitespace-nowrap">Marks</th><th class="py-1.5 font-semibold">Feedback</th></tr></thead>
            <tbody>
              <tr v-for="item in state.assessment.items" :key="item.key" class="border-b border-gray-100 dark:border-gray-700/60 align-top">
                <td class="py-1.5 pr-2 text-gray-700 dark:text-gray-200">{{ item.label }}</td>
                <td class="py-1.5 pr-2 tabular-nums font-semibold whitespace-nowrap" :class="item.score >= item.max ? 'text-emerald-700 dark:text-emerald-400' : item.score > 0 ? 'text-amber-700 dark:text-amber-400' : 'text-red-600 dark:text-red-400'">{{ item.score }} / {{ item.max }}</td>
                <td class="py-1.5 text-gray-600 dark:text-gray-300">{{ item.feedback }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onBeforeUnmount } from 'vue'
import VirtualLabStudentGraph, { type StudentGraphConfig } from './VirtualLabStudentGraph.vue'
import { linearRegression } from '@/utils/linearRegression'
import type { NotebookEntry } from '@/types/virtualLab'
import type { PendulumTrial, PendulumGRecord } from './VirtualLabScenePendulum.vue'

interface AssessmentItem { key: string; label: string; score: number; max: number; feedback: string }
interface State {
  variables: Record<string, string | undefined>
  supports: 'yes' | 'no' | null
  errors: string[]
  precautions: Record<string, string | undefined>
  assessment: { total: number; max: number; items: AssessmentItem[] } | null
}

const props = defineProps<{
  rows: NotebookEntry[]
  trials: NotebookEntry[]
  gRecord: PendulumGRecord | null
  analysis: NotebookEntry | null
  graphSaved: NotebookEntry | null
  conclusion: string
  readOnly?: boolean
}>()
const emit = defineEmits<{
  'save-row': [row: { length_m: number; time_20_s: number; period_s: number; period_squared_s2: number }]
  'save-analysis': [extra: Record<string, unknown>]
  'save-graph': [extra: Record<string, unknown>]
  'update:conclusion': [text: string]
  blocker: [message: string | null]
}>()

const LENGTHS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6]
const N = 20
const keyOf = (x: number) => x.toFixed(3)
const FOUR_PI2 = 4 * Math.PI * Math.PI

// --- Saved state ------------------------------------------------------------------------------------
const blank = (): State => ({ variables: {}, supports: null, errors: [], precautions: {}, assessment: null })
const state = reactive<State>(blank())
let restored = false
watch(() => props.analysis, (entry) => {
  if (restored) return
  restored = true
  if (entry?.extra) Object.assign(state, blank(), entry.extra)
}, { immediate: true })

// --- Variables --------------------------------------------------------------------------------------
const VARIABLES = [
  { key: 'length', label: 'Length of the pendulum, l', answer: 'independent' },
  { key: 'time', label: 'Time for 20 oscillations, t', answer: 'dependent' },
  { key: 'period', label: 'Period, T', answer: 'dependent' },
  { key: 'tsq', label: 'Period squared, T²', answer: 'dependent' },
  { key: 'mass', label: 'Mass of the pendulum bob', answer: 'controlled' },
  { key: 'angle', label: 'Angle of displacement (kept small)', answer: 'controlled' },
]
const showVariables = ref(false) // folded by default - Show opens it
const VARIABLE_BADGE: Record<string, string> = {
  independent: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
  dependent: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300',
  controlled: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
}

// --- Results table ----------------------------------------------------------------------------------
const rowFor = (key: string) => props.rows.find(r => r.extra && keyOf(Number(r.extra.length_m)) === key) ?? null
const trialFor = (key: string) => (props.trials.map(t => t.extra as PendulumTrial | null).filter((t): t is PendulumTrial => !!t).reverse().find(t => keyOf(t.length_m) === key)) ?? null
const edits = reactive<Record<string, string>>({})
LENGTHS.forEach((x) => { edits[keyOf(x)] = '' })
watch(() => props.rows.map(r => `${r.id}:${JSON.stringify(r.extra)}`).join('|'), () => {
  LENGTHS.forEach((x) => {
    const k = keyOf(x)
    const r = rowFor(k)
    if (r?.extra && edits[k] === '') edits[k] = String(r.extra.time_20_s)
  })
}, { immediate: true })
const tableValues = computed(() => LENGTHS.map((x) => {
  const k = keyOf(x)
  const t = edits[k] === '' ? NaN : Number(edits[k])
  const T = Math.round((t / N) * 1000) / 1000
  return { x, key: k, t, T, T2: Math.round(T * T * 1000) / 1000, complete: Number.isFinite(t) && t > 0, timed: !!trialFor(k) }
}))
const tableMessage = ref<string | null>(null)
const showWorking = ref(false)
function saveRow(key: string) {
  if (props.readOnly) return
  const r = tableValues.value.find(v => v.key === key)!
  if (edits[key] === '') return
  if (!r.complete) { tableMessage.value = 'Enter the time as a number of seconds.'; return }
  if (r.t < 5 || r.t > 60) { tableMessage.value = `Check the l = ${key} m row: 20 oscillations of this pendulum take between about 10 and 35 seconds.`; return }
  tableMessage.value = null
  const existing = rowFor(key)
  if (existing?.extra && Number(existing.extra.time_20_s) === r.t) return
  emit('save-row', { length_m: r.x, time_20_s: r.t, period_s: r.T, period_squared_s2: r.T2 })
}

// --- Graph ------------------------------------------------------------------------------------------
const GRAPH: StudentGraphConfig = {
  title: 'Graph of T² against l',
  axisOptions: [
    { key: 'length', label: 'Length, l (m)' }, { key: 'tsq', label: 'Period squared, T² (s²)' },
    { key: 'period', label: 'Period, T (s)' }, { key: 'time', label: 'Time for 20 oscillations, t (s)' },
  ],
  xKey: 'length', yKey: 'tsq', xLabel: 'Length, l (m)', yLabel: 'Period squared, T² (s²)', xSym: 'l', ySym: 'T²', gradientUnit: 's²/m',
  axisMessage: 'Check that the length l is on the X-axis and the period squared T² is on the Y-axis.',
  formulaMessage: 'Since the graph is T² against l, the gradient S = ΔT² / Δl. Then g = 4π² / S.',
  result: {
    title: 'Acceleration due to gravity, g', symbol: 'g', unit: 'm/s²', name: 'acceleration due to gravity g',
    explanation: 'T² = (4π²/g) l, so the gradient S of the graph of T² against l is 4π²/g. Rearranging: g = 4π² / S (4π² ≈ 39.48).',
    fromGradient: (s: number) => FOUR_PI2 / s,
  },
}
const graphRows = computed(() => tableValues.value.filter(r => r.complete).map(r => ({ key: r.key, label: `l = ${r.key} m`, x: r.x, y: r.T2 })))
const graphBlocker = ref<string | null>('Set the axes of your graph.')
const graphState = ref<Record<string, any> | null>(null)
watch(() => props.graphSaved, (e) => { if (e?.extra && !graphState.value) graphState.value = e.extra as Record<string, any> }, { immediate: true })
function onGraphSave(extra: Record<string, unknown>) {
  graphState.value = extra as Record<string, any>
  emit('save-graph', extra)
}
const gValue = computed(() => (graphState.value?.resultOk ? Number(graphState.value.resultInput) : null))

// --- Compare with 10 m/s² ---------------------------------------------------------------------------
const gNearTen = computed(() => gValue.value !== null && Math.abs(gValue.value - 10) <= 0.5)
const supportsCorrect = computed(() => (state.supports === 'yes') === gNearTen.value)
const supportsFeedback = computed(() => {
  if (gValue.value === null) return ''
  const diff = Math.abs(Math.round((gValue.value - 10) * 100) / 100)
  if (supportsCorrect.value) return gNearTen.value ? `Yes - your value is within ${diff} m/s² of 10 m/s², so it supports the statement.` : `Right - your value is ${diff} m/s² from 10 m/s², too far to call it approximately 10 m/s². Check your timings and graph.`
  return gNearTen.value ? `Look again: ${gValue.value.toFixed(2)} m/s² is within ${diff} m/s² of 10 m/s².` : `Look again: ${gValue.value.toFixed(2)} m/s² is ${diff} m/s² away from 10 m/s².`
})


// --- Assessment -------------------------------------------------------------------------------------
const trialList = computed(() => LENGTHS.map(x => trialFor(keyOf(x))).filter((t): t is PendulumTrial => !!t))
/** g from the stopwatch's own readings (least squares of T² against l). */
const trueG = computed(() => {
  const fit = linearRegression(trialList.value.map(t => ({ x: t.length_m, y: (t.t_s / N) ** 2 })))
  return fit && fit.slope > 0 ? FOUR_PI2 / fit.slope : null
})
const assessBlocker = computed<string | null>(() => {
  if (tableValues.value.some(r => !r.complete)) return 'Complete all six rows of the results table.'
  if (graphBlocker.value) return graphBlocker.value
  if (!state.supports) return 'Say whether your value of g supports the 10 m/s² statement.'
  if (!props.conclusion.trim()) return 'Write your conclusion.'
  return null
})
const half = (n: number) => Math.round(n * 2) / 2
const clampScore = (n: number, max: number) => Math.max(0, Math.min(max, half(n)))
const gradeWord = (f: number) => (f >= 0.8 ? 'Excellent' : f >= 0.65 ? 'Good' : f >= 0.5 ? 'Fair' : 'Needs improvement')

function runAssessment() {
  if (assessBlocker.value) return
  const rec = props.gRecord
  const gs = graphState.value || {}
  const items: AssessmentItem[] = []
  const add = (key: string, label: string, max: number, score: number, feedback: string) => items.push({ key, label, max, score: clampScore(score, max), feedback })

  const setup = (rec?.inspected_bob ? 1 : 0) + (rec?.inspected_ruler ? 1 : 0)
  add('setup', 'Apparatus setup', 2, setup, setup === 2 ? 'Bob hanging freely from the clamp, metre rule beside it.' : 'Check the bob and the position of the metre rule before you start.')
  const bad = rec?.bad_measures ?? 0
  add('measure', 'Measurement of pendulum length', 2, 2 - bad, bad ? `${bad} attempt(s) measured to the thread or the top of the bob - l is to the centre of the bob.` : 'Length measured from the point of suspension to the centre of the bob.')
  const large = rec?.large_angles ?? 0
  const trialsLarge = trialList.value.filter(t => t.angle_deg > 10).length
  add('angle', 'Small angular displacement', 2, large === 0 ? 2 : trialsLarge === 0 ? 1 : 0, large === 0 ? 'Always released from a small angle.' : trialsLarge === 0 ? 'A large angle was used once, but every timed swing started small.' : 'Some timed swings started from a large angle - keep it under about 10°.')
  const bumps = rec?.stand_bumps ?? 0
  add('release', 'Release of the bob', 2, 2 - bumps, bumps ? 'The stand was disturbed while the bob swung, making the oscillations elliptical.' : 'Released gently, swinging in one vertical plane.')
  const early = rec?.early_starts ?? 0
  add('technique', 'Timing technique', 2, 2 - early, early ? 'Timing was started before the swing had settled - let a few oscillations pass first.' : 'Timing started once the oscillations were steady.')
  const wrong = rec?.wrong_counts ?? 0
  add('twenty', 'Timing 20 oscillations', 3, (trialList.value.length / 6) * 3 - wrong * 0.5, trialList.value.length === 6 && !wrong ? 'Exactly 20 oscillations timed at all six lengths.' : `${trialList.value.length} of 6 lengths timed${wrong ? `; ${wrong} reading(s) taken with the wrong number of oscillations` : ''}.`)
  const complete = tableValues.value.filter(r => r.complete).length
  add('period', 'Calculation of T', 2, (complete / 6) * 2, 'T = t ÷ 20 for every row.')
  add('tsq', 'Calculation of T²', 2, (complete / 6) * 2, 'T² = T × T for every row.')
  const accurate = tableValues.value.filter((r) => { const t = trialFor(r.key); return t && Math.abs(r.t - t.t_s) <= 0.05 }).length
  add('table', 'Results table', 2, (accurate / 6) * 2, accurate === 6 ? 'Every time matches what your stopwatch showed.' : `${accurate} of 6 times match your stopwatch readings.`)
  add('axes', 'Graph axes', 2, gs.axes?.attempts ? 1 : 2, gs.axes?.attempts ? 'Axes corrected after a first attempt with the wrong orientation.' : 'l on the x-axis and T² on the y-axis, with units.')
  const pts = (gs.points || []) as { x: number; y: number }[]
  const rowsPlotted = graphRows.value.filter(r => pts.some(p => Math.abs(p.x - r.x) <= 0.011 && Math.abs(p.y - r.y) <= Math.max(0.03, r.y * 0.02))).length
  add('plotting', 'Plotting of points', 3, (rowsPlotted / 6) * 3, rowsPlotted === 6 ? 'All six points plotted accurately.' : `${rowsPlotted} of 6 points plotted accurately.`)
  let lineScore = 0
  let lineNote = 'No line of best fit.'
  const fit = linearRegression(pts)
  if (gs.line?.a && gs.line?.b && fit && gs.line.b.x !== gs.line.a.x) {
    const ratio = ((gs.line.b.y - gs.line.a.y) / (gs.line.b.x - gs.line.a.x)) / fit.slope
    lineScore = Math.abs(ratio - 1) <= 0.08 ? 2 : Math.abs(ratio - 1) <= 0.2 ? 1.5 : 1
    lineNote = lineScore === 2 ? 'Well-balanced straight line of best fit.' : 'Line follows the trend but is not balanced through the points.'
    if (gs.line.generated) { lineScore = Math.min(lineScore, 1.5); lineNote = 'Line generated by the computer rather than drawn yourself.' }
  }
  add('bestfit', 'Line of best fit', 2, lineScore, lineNote)
  let gScore = gs.gradientOk ? 3 : 0
  if (gs.wrongFormula) gScore -= 1
  if ((gs.gradientChecks ?? 0) > 1 + (gs.wrongFormula ?? 0)) gScore -= 0.5
  add('gradient', 'Gradient S', 3, gScore, gs.wrongFormula ? 'Correct in the end, but ΔT²/Δl was not used at first.' : 'S = ΔT² / Δl worked out correctly.')
  let calcScore = gs.resultOk ? ((gs.resultChecks ?? 0) <= 1 ? 3 : 2) : 0
  let calcNote = (gs.resultChecks ?? 0) <= 1 ? 'g = 4π² / S worked out correctly first time.' : 'g = 4π² / S correct after more than one attempt.'
  if (gValue.value !== null && Math.abs(gValue.value - 10) > 1) { calcScore -= 1; calcNote += ' Your g is more than 1 m/s² from 10 m/s² - check your timings.' }
  add('g', 'Calculation of g', 3, calcScore, calcNote)
  const text = props.conclusion
  const nums = (text.match(/\d+(?:\.\d+)?/g) || []).map(Number)
  const statesG = gValue.value !== null && nums.some(n => Math.abs(n - gValue.value!) <= 0.3)
  const mentionsTen = /10\s*m\s*\/?\s*s|10 m\/s|approximately 10|about 10|support/i.test(text)
  add('conclusion', 'Conclusion', 2, (supportsCorrect.value ? 1 : 0) + (statesG && mentionsTen ? 1 : statesG || mentionsTen ? 0.5 : 0),
    supportsCorrect.value && statesG && mentionsTen ? 'States g and compares it with 10 m/s² correctly.' : `Your conclusion should ${[statesG ? '' : 'state your value of g', mentionsTen ? '' : 'compare it with 10 m/s²', supportsCorrect.value ? '' : 'answer the comparison correctly'].filter(Boolean).join(', ')}.`)

  const total = half(items.reduce((s, i) => s + i.score, 0))
  state.assessment = { total, max: items.reduce((s, i) => s + i.max, 0), items }
}

// Any change after marking means marking again
watch(() => JSON.stringify({ ...state, assessment: null }) + props.conclusion + JSON.stringify(tableValues.value) + JSON.stringify(graphState.value), () => { if (state.assessment) state.assessment = null })

let saveTimer = 0
watch(() => JSON.stringify(state), () => {
  if (props.readOnly) return
  window.clearTimeout(saveTimer)
  saveTimer = window.setTimeout(() => {
    emit('save-analysis', { ...JSON.parse(JSON.stringify(state)), summary: { g: gValue.value, true_g: trueG.value ? Math.round(trueG.value * 100) / 100 : null, supports: state.supports, score: state.assessment?.total ?? null, max_score: state.assessment?.max ?? null } })
  }, 900)
})
onBeforeUnmount(() => window.clearTimeout(saveTimer))
watch(() => (state.assessment ? null : assessBlocker.value ?? 'Click "Mark my practical" to see your assessment before submitting.'), m => emit('blocker', m), { immediate: true })
</script>
