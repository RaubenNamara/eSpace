<template>
  <div class="space-y-5">
    <!-- 1. Variables -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2" :class="showVariables ? 'mb-1' : ''">
        <h3 class="text-sm font-bold text-gray-900 dark:text-white">1. Variables</h3>
        <button type="button" @click="showVariables = !showVariables" class="px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">{{ showVariables ? 'Hide' : 'Show' }}</button>
      </div>
      <template v-if="showVariables">
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">The variables in this investigation.</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div v-for="v in VARIABLES" :key="v.label" class="flex items-center justify-between gap-2 rounded-xl bg-gray-50 dark:bg-gray-900/40 px-3 py-2 text-sm text-gray-700 dark:text-gray-200">
            <span>{{ v.label }}</span>
            <span class="px-2 py-0.5 text-[11px] font-semibold rounded-full whitespace-nowrap" :class="BADGE[v.kind]">{{ v.kind[0].toUpperCase() + v.kind.slice(1) }}</span>
          </div>
        </div>
      </template>
    </section>

    <!-- 2. Results table -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">2. Results table</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">The readings you recorded at each length. Correct any you copied down wrongly, then click away to save the row.</p>
      <div class="overflow-x-auto">
        <table class="w-full max-w-2xl text-sm border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr class="bg-indigo-50 dark:bg-indigo-900/30 text-left text-gray-800 dark:text-gray-100">
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">Length of constantan wire, l (cm)</th>
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">Current, I (A)</th>
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">Terminal voltage, V (V)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in tableValues" :key="r.key" class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900/40">
              <td class="border border-gray-300 dark:border-gray-600 px-3 py-1.5 tabular-nums text-gray-800 dark:text-gray-100">{{ r.key }}</td>
              <td class="border border-gray-300 dark:border-gray-600 px-2 py-1"><input v-model="edits[r.key].i" type="number" step="0.01" min="0" :disabled="readOnly" @blur="saveRow(r.key)" class="input-field w-24 text-sm py-1 tabular-nums" placeholder="-"></td>
              <td class="border border-gray-300 dark:border-gray-600 px-2 py-1"><input v-model="edits[r.key].v" type="number" step="0.01" min="0" :disabled="readOnly" @blur="saveRow(r.key)" class="input-field w-24 text-sm py-1 tabular-nums" placeholder="-"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="tableMessage" class="mt-2 text-xs text-amber-700 dark:text-amber-400">{{ tableMessage }}</p>
    </section>

    <!-- 3. Graph of V against I, gradient, r and the emf -->
    <VirtualLabStudentGraph :config="GRAPH" :rows="graphRows" :saved="graphSaved" :read-only="readOnly" @save="onGraphSave" @blocker="graphBlocker = $event" />

    <!-- Summary of the two results -->
    <section v-if="rValue !== null && eValue !== null" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Results</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-xl">
        <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-2.5"><p class="text-[10px] uppercase font-bold text-gray-400">Gradient s</p><p class="text-base font-bold text-gray-900 dark:text-white">{{ graphState?.gradientInput }} Ω</p></div>
        <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-2.5"><p class="text-[10px] uppercase font-bold text-gray-400">Internal resistance r</p><p class="text-base font-bold text-gray-900 dark:text-white">{{ rValue }} Ω</p></div>
        <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-2.5"><p class="text-[10px] uppercase font-bold text-gray-400">emf E</p><p class="text-base font-bold text-gray-900 dark:text-white">{{ eValue }} V</p></div>
      </div>
    </section>

    <!-- 4. Conclusion -->
    <section v-if="rValue !== null && eValue !== null" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">Conclusion</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">State the internal resistance and the emf of the battery, with their units.</p>
      <textarea
        :value="conclusion"
        @input="emit('update:conclusion', ($event.target as HTMLTextAreaElement).value)"
        :disabled="readOnly"
        rows="3"
        class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="The internal resistance of the battery was ___ Ω and its emf was ___ V."
      ></textarea>
    </section>

    <!-- 5. Assessment -->
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
            <p>Internal resistance r = <strong>{{ rValue }} Ω</strong>, emf E = <strong>{{ eValue }} V</strong></p>
            <p v-if="trueFit">From what the meters really showed: r = {{ trueFit.r.toFixed(2) }} Ω, E = {{ trueFit.e.toFixed(2) }} V</p>
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
import type { BulbTrial, BulbLabRecord } from './bulbCircuitEngine'
import type { NotebookEntry } from '@/types/virtualLab'

interface AssessmentItem { key: string; label: string; score: number; max: number; feedback: string }
interface State { assessment: { total: number; max: number; items: AssessmentItem[] } | null }

const props = defineProps<{
  rows: NotebookEntry[]
  snapshots: NotebookEntry[]
  labRecord: BulbLabRecord | null
  analysis: NotebookEntry | null
  graphSaved: NotebookEntry | null
  conclusion: string
  readOnly?: boolean
}>()
const emit = defineEmits<{
  'save-row': [row: { length_cm: number; current_a: number; voltage_v: number }]
  'save-analysis': [extra: Record<string, unknown>]
  'save-graph': [extra: Record<string, unknown>]
  'update:conclusion': [text: string]
  blocker: [message: string | null]
}>()

const LENGTHS_CM = [10, 20, 30, 40, 50]
const keyOf = (cm: number) => cm.toFixed(1)

const state = reactive<State>({ assessment: null })
let restored = false
watch(() => props.analysis, (e) => {
  if (restored) return
  restored = true
  if (e?.extra) Object.assign(state, { assessment: null }, e.extra)
}, { immediate: true })

// --- Variables (standard, shown for reference) ------------------------------------------------------
const showVariables = ref(false)
const VARIABLES = [
  { label: 'Length of constantan wire, l (the external resistance)', kind: 'independent' },
  { label: 'Current, I', kind: 'dependent' },
  { label: 'Terminal voltage, V', kind: 'dependent' },
  { label: 'The same battery, wire, ammeter and voltmeter', kind: 'controlled' },
  { label: 'The same circuit', kind: 'controlled' },
  { label: 'Temperature (as far as possible)', kind: 'controlled' },
]
const BADGE: Record<string, string> = {
  independent: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
  dependent: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300',
  controlled: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
}

// --- Results table ----------------------------------------------------------------------------------
const rowFor = (key: string) => props.rows.find(r => r.extra && keyOf(Number(r.extra.length_cm)) === key) ?? null
const trialFor = (key: string) => props.snapshots.map(s => s.extra as BulbTrial | null).filter((t): t is BulbTrial => !!t).reverse().find(t => keyOf(t.x_m * 100) === key) ?? null
const edits = reactive<Record<string, { i: string; v: string }>>({})
LENGTHS_CM.forEach((cm) => { edits[keyOf(cm)] = { i: '', v: '' } })
watch(() => props.rows.map(r => `${r.id}:${JSON.stringify(r.extra)}`).join('|'), () => {
  LENGTHS_CM.forEach((cm) => {
    const k = keyOf(cm)
    const r = rowFor(k)
    if (!r?.extra) return
    if (edits[k].i === '') edits[k].i = String(r.extra.current_a)
    if (edits[k].v === '') edits[k].v = String(r.extra.voltage_v)
  })
}, { immediate: true })
const tableValues = computed(() => LENGTHS_CM.map((cm) => {
  const e = edits[keyOf(cm)]
  const I = e.i === '' ? NaN : Number(e.i)
  const V = e.v === '' ? NaN : Number(e.v)
  return { cm, key: keyOf(cm), I, V, complete: Number.isFinite(I) && Number.isFinite(V) }
}))
const tableMessage = ref<string | null>(null)
function saveRow(key: string) {
  if (props.readOnly) return
  const e = edits[key]
  if ((e.i === '') !== (e.v === '')) { tableMessage.value = 'Record both the current I and the terminal voltage V for each length.'; return }
  if (e.i === '') return
  const I = Number(e.i), V = Number(e.v)
  if (!Number.isFinite(I) || !Number.isFinite(V)) return
  if (I > 1 || V > 3) { tableMessage.value = `Check the l = ${key} cm row: the ammeter reads up to 1 A and the voltmeter up to 3 V.`; return }
  tableMessage.value = null
  const existing = rowFor(key)
  if (existing?.extra && Number(existing.extra.current_a) === I && Number(existing.extra.voltage_v) === V) return
  emit('save-row', { length_cm: Number(key), current_a: I, voltage_v: V })
}

// --- Graph: V against I -----------------------------------------------------------------------------
const GRAPH: StudentGraphConfig = {
  title: 'Graph of V against I',
  axisOptions: [
    { key: 'current', label: 'Current, I (A)' }, { key: 'voltage', label: 'Terminal voltage, V (V)' }, { key: 'length', label: 'Length, l (cm)' },
  ],
  xKey: 'current', yKey: 'voltage', xLabel: 'Current, I (A)', yLabel: 'Terminal voltage, V (V)', xSym: 'I', ySym: 'V', gradientUnit: 'Ω',
  axisMessage: 'Check that the current I is on the X-axis and the terminal voltage V is on the Y-axis - the graph is V against I.',
  formulaMessage: 'Since the graph is V against I, the gradient s = ΔV / ΔI. Then r = -s.',
  result: {
    title: 'Internal resistance, r', symbol: 'r', unit: 'Ω', name: 'internal resistance r',
    explanation: 'E = V + Ir, so V = -rI + E. Compared with y = mx + c, the gradient of V against I is m = -r. So the gradient s is negative, and r = -s.',
    fromGradient: (s: number) => -s,
  },
  intercept: {
    title: 'Emf of the battery, E', symbol: 'E', unit: 'V', name: 'emf E',
    explanation: 'In V = -rI + E, the constant c is E. At I = 0 the terminal voltage equals the emf - so the V-axis intercept of the graph is the emf: E = V-intercept.',
  },
}
const graphRows = computed(() => tableValues.value.filter(r => r.complete).map(r => ({ key: r.key, label: `l = ${r.key} cm`, x: r.I, y: r.V })))
const graphBlocker = ref<string | null>('Set the axes of your graph.')
const graphState = ref<Record<string, any> | null>(null)
watch(() => props.graphSaved, (e) => { if (e?.extra && !graphState.value) graphState.value = e.extra as Record<string, any> }, { immediate: true })
function onGraphSave(extra: Record<string, unknown>) { graphState.value = extra as Record<string, any>; emit('save-graph', extra) }
const rValue = computed(() => (graphState.value?.resultOk ? Number(graphState.value.resultInput) : null))
const eValue = computed(() => (graphState.value?.interceptOk ? Number(graphState.value.interceptInput) : null))

// --- True values from the meters' own readings ---------------------------------------------------------
const trials = computed(() => LENGTHS_CM.map(cm => trialFor(keyOf(cm))).filter((t): t is BulbTrial => !!t))
const trueFit = computed(() => {
  const fit = linearRegression(trials.value.map(t => ({ x: t.true_current_a, y: t.true_voltage_v })))
  return fit ? { r: -fit.slope, e: fit.intercept } : null
})

// --- Assessment -------------------------------------------------------------------------------------
const assessBlocker = computed<string | null>(() => {
  if (tableValues.value.some(r => !r.complete)) return 'Complete all five rows of the results table.'
  if (graphBlocker.value) return graphBlocker.value
  if (!props.conclusion.trim()) return 'Write your conclusion.'
  return null
})
const half = (n: number) => Math.round(n * 2) / 2
const clampScore = (n: number, max: number) => Math.max(0, Math.min(max, half(n)))
const gradeWord = (f: number) => (f >= 0.8 ? 'Excellent' : f >= 0.65 ? 'Good' : f >= 0.5 ? 'Fair' : 'Needs improvement')

function runAssessment() {
  if (assessBlocker.value) return
  const rec = props.labRecord
  const gs = graphState.value || {}
  const items: AssessmentItem[] = []
  const add = (key: string, label: string, max: number, score: number, feedback: string) => items.push({ key, label, max, score: clampScore(score, max), feedback })

  const dp = rec?.distractor_picks ?? 0
  add('apparatus', 'Identification of apparatus', 2, 2 - dp, dp ? `${dp} item(s) picked up that the practical doesn't use.` : 'All the apparatus collected and set out on the bench.')
  const wf = rec?.wiring_faults ?? 0
  add('circuit', 'Circuit setup', 2, 2 - wf, wf ? `K was closed ${wf} time(s) with a wiring fault - check the connections before switching on.` : 'Cells, K, ammeter and wire P connected in one series loop.')
  const ar = rec?.ammeter_reversed ?? 0
  add('ammeter', 'Ammeter connection', 2, 2 - ar, ar ? 'The ammeter was once connected the wrong way round.' : 'Ammeter in series, + towards the cells\' +.')
  const vr = rec?.voltmeter_reversed ?? 0
  add('voltmeter', 'Voltmeter connection', 2, 2 - vr, vr ? 'The voltmeter was once connected the wrong way round.' : 'Voltmeter across the battery terminals, measuring the terminal voltage.')
  const misuse = (rec?.left_on ?? 0) + (rec?.record_while_open ?? 0) + (rec?.length_change_while_on ?? 0) + (rec?.incomplete_pairs ?? 0)
  add('switch', 'Use of the switch', 3, 3 - misuse, misuse ? 'Close K only to take readings, open it straight afterwards, and never change the wire length with K closed.' : 'K closed only to take readings and opened straight afterwards.')
  const lengths = trials.value.length
  add('length', 'Measurement of wire length', 2, (lengths / 5) * 2, lengths === 5 ? 'All five lengths (10.0-50.0 cm) set correctly on the metre rule.' : `Readings taken at ${lengths} of the five lengths.`)
  const iOk = tableValues.value.filter((r) => { const t = trialFor(r.key); return t && Math.abs(r.I - t.true_current_a) <= 0.021 }).length
  add('current', 'Recording of current', 2, (iOk / 5) * 2, iOk === 5 ? 'Every current matches the ammeter.' : `${iOk} of 5 currents match the ammeter to within one division.`)
  const vOk = tableValues.value.filter((r) => { const t = trialFor(r.key); return t && Math.abs(r.V - t.true_voltage_v) <= 0.051 }).length
  add('voltage', 'Recording of terminal voltage', 2, (vOk / 5) * 2, vOk === 5 ? 'Every voltage matches the voltmeter.' : `${vOk} of 5 voltages match the voltmeter to within half a division.`)
  const trend = tableValues.value.every((r, i, a) => i === 0 || (r.I <= a[i - 1].I + 0.02 && r.V >= a[i - 1].V - 0.05))
  add('table', 'Results table', 2, 1 + (trend ? 1 : 0), trend ? 'Complete, with I falling and V rising as the wire gets longer.' : 'Check the trend: a longer wire means a smaller current and a larger terminal voltage.')
  add('axes', 'Graph axes', 2, gs.axes?.attempts ? 1 : 2, gs.axes?.attempts ? 'Axes corrected after a first attempt with the wrong orientation.' : 'I on the x-axis and V on the y-axis, with units.')
  const pts = (gs.points || []) as { x: number; y: number }[]
  const plotted = graphRows.value.filter(r => pts.some(p => Math.abs(p.x - r.x) <= 0.011 && Math.abs(p.y - r.y) <= 0.03)).length
  add('plotting', 'Plotting of points', 3, (plotted / 5) * 3, plotted === 5 ? 'All five points plotted accurately.' : `${plotted} of 5 points plotted accurately.`)
  let lineScore = 0, lineNote = 'No line of best fit.'
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
  add('gradient', 'Gradient', 3, gScore, gs.wrongFormula ? 'Correct in the end, but ΔV/ΔI was not used at first.' : 'Negative gradient s = ΔV / ΔI worked out correctly.')
  let rScore = gs.resultOk ? ((gs.resultChecks ?? 0) <= 1 ? 3 : 2) : 0
  let rNote = (gs.resultChecks ?? 0) <= 1 ? 'r = -s worked out correctly first time.' : 'r = -s correct after more than one attempt.'
  if (trueFit.value && rValue.value !== null && Math.abs(rValue.value - trueFit.value.r) > trueFit.value.r * 0.15) { rScore -= 1; rNote += ' Your r is more than 15% from what the meters showed - check your readings and line.' }
  add('r', 'Internal resistance', 3, rScore, rNote)
  let eScore = gs.interceptOk ? ((gs.interceptChecks ?? 0) <= 1 ? 3 : 2) : 0
  let eNote = (gs.interceptChecks ?? 0) <= 1 ? 'E read correctly from the V-axis intercept.' : 'E read from the intercept after more than one attempt.'
  if (trueFit.value && eValue.value !== null && Math.abs(eValue.value - trueFit.value.e) > 0.15) { eScore -= 1; eNote += ' Your E is more than 0.15 V from what the meters showed.' }
  add('emf', 'Emf', 3, eScore, eNote)
  const text = props.conclusion
  const nums = (text.match(/\d+(?:\.\d+)?/g) || []).map(Number)
  const hasR = rValue.value !== null && nums.some(n => Math.abs(n - rValue.value!) <= Math.max(0.05, rValue.value! * 0.05))
  const hasE = eValue.value !== null && nums.some(n => Math.abs(n - eValue.value!) <= 0.05)
  const units = /Ω|ohm/i.test(text) && /\bV\b|volt/i.test(text)
  const missing = [hasR ? '' : 'state the internal resistance', hasE ? '' : 'state the emf', units ? '' : 'give both units (Ω and V)'].filter(Boolean)
  add('conclusion', 'Conclusion', 3, 3 - missing.length, missing.length ? `Your conclusion should ${missing.join(', ')}.` : 'States r and E with their units.')

  const total = half(items.reduce((s, i) => s + i.score, 0))
  state.assessment = { total, max: items.reduce((s, i) => s + i.max, 0), items }
}
watch(() => props.conclusion + JSON.stringify(tableValues.value) + JSON.stringify(graphState.value), () => { if (state.assessment) state.assessment = null })

let saveTimer = 0
watch(() => JSON.stringify(state), () => {
  if (props.readOnly) return
  window.clearTimeout(saveTimer)
  saveTimer = window.setTimeout(() => {
    emit('save-analysis', { ...JSON.parse(JSON.stringify(state)), summary: { r: rValue.value, e: eValue.value, true_r: trueFit.value ? Math.round(trueFit.value.r * 100) / 100 : null, true_e: trueFit.value ? Math.round(trueFit.value.e * 100) / 100 : null, score: state.assessment?.total ?? null, max_score: state.assessment?.max ?? null } })
  }, 900)
})
onBeforeUnmount(() => window.clearTimeout(saveTimer))
watch(() => (state.assessment ? null : assessBlocker.value ?? 'Click "Mark my practical" to see your assessment before submitting.'), m => emit('blocker', m), { immediate: true })
</script>
