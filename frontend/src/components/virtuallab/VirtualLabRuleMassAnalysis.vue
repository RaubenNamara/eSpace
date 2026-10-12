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

    <!-- 2. Balance point C and the results table -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">2. Results table</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">The balance points you recorded. Correct any you copied down wrongly, then click away to save. x = P − a and z = C − P are worked out from your readings.</p>
      <label class="flex flex-wrap items-center gap-2 mb-3 text-sm text-gray-700 dark:text-gray-200">
        <span class="font-semibold">Balance point of the rule alone (centre of gravity), C =</span>
        <input v-model="cEdit" type="number" step="0.1" min="0" max="100" :disabled="readOnly" @blur="saveC" class="input-field w-24 text-sm py-1 tabular-nums" placeholder="-">
        <span>cm</span>
      </label>
      <div class="overflow-x-auto">
        <table class="w-full max-w-2xl text-sm border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr class="bg-indigo-50 dark:bg-indigo-900/30 text-left text-gray-800 dark:text-gray-100">
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">Position of 100 g mass, a (cm)</th>
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">Balance point (pivot), P (cm)</th>
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">x = P − a (cm)</th>
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">z = C − P (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in tableValues" :key="r.key" class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900/40">
              <td class="border border-gray-300 dark:border-gray-600 px-3 py-1.5 tabular-nums text-gray-800 dark:text-gray-100">{{ r.key }}</td>
              <td class="border border-gray-300 dark:border-gray-600 px-2 py-1"><input v-model="edits[r.key]" type="number" step="0.1" min="0" max="100" :disabled="readOnly" @blur="saveRow(r.key)" class="input-field w-24 text-sm py-1 tabular-nums" placeholder="-"></td>
              <td class="border border-gray-300 dark:border-gray-600 px-3 py-1.5 tabular-nums text-gray-800 dark:text-gray-100">{{ r.complete ? r.x.toFixed(1) : '-' }}</td>
              <td class="border border-gray-300 dark:border-gray-600 px-3 py-1.5 tabular-nums text-gray-800 dark:text-gray-100">{{ r.complete && cValue !== null ? r.z.toFixed(1) : '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="tableMessage" class="mt-2 text-xs text-amber-700 dark:text-amber-400">{{ tableMessage }}</p>
    </section>

    <!-- 3. Graph of x against z, gradient and M -->
    <VirtualLabStudentGraph :config="GRAPH" :rows="graphRows" :saved="graphSaved" :read-only="readOnly" @save="onGraphSave" @blocker="graphBlocker = $event" />

    <section v-if="massValue !== null" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Result</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-xl">
        <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-2.5"><p class="text-[10px] uppercase font-bold text-gray-400">Gradient s</p><p class="text-base font-bold text-gray-900 dark:text-white">{{ graphState?.gradientInput }}</p></div>
        <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-2.5"><p class="text-[10px] uppercase font-bold text-gray-400">Mass of the metre rule, M</p><p class="text-base font-bold text-gray-900 dark:text-white">{{ massValue }} g</p></div>
      </div>
    </section>

    <!-- 4. Conclusion -->
    <section v-if="massValue !== null" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">Conclusion</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">State the mass of the metre rule you found, with its unit, for the laboratory assistant.</p>
      <textarea
        :value="conclusion"
        @input="emit('update:conclusion', ($event.target as HTMLTextAreaElement).value)"
        :disabled="readOnly"
        rows="3"
        class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="The mass of the metre rule is ___ g."
      ></textarea>
    </section>

    <!-- 5. Assessment -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
        <h3 class="text-sm font-bold text-gray-900 dark:text-white">Assessment and final result</h3>
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
            <p>Mass of the metre rule M = <strong>{{ massValue }} g</strong></p>
            <p v-if="trueMass">The rule's actual mass: {{ trueMass }} g</p>
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
import type { RuleMassTrial, RuleMassRecord } from './VirtualLabSceneRuleMass.vue'

interface AssessmentItem { key: string; label: string; score: number; max: number; feedback: string }
interface State { c_cm: string; assessment: { total: number; max: number; items: AssessmentItem[] } | null }

const props = defineProps<{
  rows: NotebookEntry[]
  trials: NotebookEntry[]
  cTrial: RuleMassTrial | null
  labRecord: RuleMassRecord | null
  analysis: NotebookEntry | null
  graphSaved: NotebookEntry | null
  conclusion: string
  readOnly?: boolean
}>()
const emit = defineEmits<{
  'save-row': [row: { mass_cm: number; pivot_cm: number; x_cm: number; z_cm: number | null }]
  'save-analysis': [extra: Record<string, unknown>]
  'save-graph': [extra: Record<string, unknown>]
  'update:conclusion': [text: string]
  blocker: [message: string | null]
}>()

const POSITIONS = [10, 15, 20, 25, 30]
const keyOf = (cm: number) => cm.toFixed(1)
const r1 = (n: number) => Math.round(n * 10) / 10

const state = reactive<State>({ c_cm: '', assessment: null })
let restored = false
watch(() => props.analysis, (e) => {
  if (restored) return
  restored = true
  if (e?.extra) Object.assign(state, { c_cm: '', assessment: null }, e.extra)
}, { immediate: true })

// --- Variables (standard, shown for reference) ------------------------------------------------------
const showVariables = ref(false)
const VARIABLES = [
  { label: 'Position of the 100 g mass, a (so its distance x from the pivot)', kind: 'independent' },
  { label: 'Balance point P (so the distance z from the pivot to C)', kind: 'dependent' },
  { label: 'The same metre rule and 100 g mass', kind: 'controlled' },
  { label: 'The centre of gravity C of the rule', kind: 'controlled' },
  { label: 'The rule balanced level each time', kind: 'controlled' },
]
const BADGE: Record<string, string> = {
  independent: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
  dependent: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300',
  controlled: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
}

// --- C and the results table ----------------------------------------------------------------------
const cEdit = ref('')
watch(() => [state.c_cm, props.cTrial?.pivot_cm], () => {
  if (cEdit.value !== '') return
  if (state.c_cm !== '') cEdit.value = state.c_cm
  else if (props.cTrial) cEdit.value = props.cTrial.pivot_cm.toFixed(1)
}, { immediate: true })
const cValue = computed(() => {
  const n = cEdit.value === '' ? NaN : Number(cEdit.value)
  return Number.isFinite(n) && n > 0 && n < 100 ? n : null
})

const rowFor = (key: string) => props.rows.find(r => r.extra && r.extra.mass_cm != null && keyOf(Number(r.extra.mass_cm)) === key) ?? null
const trialFor = (key: string) => props.trials.map(t => t.extra as RuleMassTrial | null)
  .filter((t): t is RuleMassTrial => !!t && t.mass_cm != null).reverse().find(t => keyOf(t.mass_cm!) === key) ?? null
const edits = reactive<Record<string, string>>({})
POSITIONS.forEach((a) => { edits[keyOf(a)] = '' })
watch(() => props.rows.map(r => `${r.id}:${JSON.stringify(r.extra)}`).join('|'), () => {
  POSITIONS.forEach((a) => {
    const k = keyOf(a)
    const r = rowFor(k)
    if (r?.extra && edits[k] === '') edits[k] = String(r.extra.pivot_cm)
  })
}, { immediate: true })
const tableValues = computed(() => POSITIONS.map((a) => {
  const k = keyOf(a)
  const P = edits[k] === '' ? NaN : Number(edits[k])
  const complete = Number.isFinite(P) && P > a && P < 100
  return { a, key: k, P, x: r1(P - a), z: cValue.value !== null ? r1(cValue.value - P) : NaN, complete }
}))
const tableMessage = ref<string | null>(null)
function saveRow(key: string) {
  if (props.readOnly || edits[key] === '') return
  const r = tableValues.value.find(v => v.key === key)!
  if (!r.complete) { tableMessage.value = `Check the a = ${key} cm row: the pivot P must be on the 100 cm side of the mass.`; return }
  tableMessage.value = null
  const existing = rowFor(key)
  const z = cValue.value !== null ? r.z : null
  if (existing?.extra && Number(existing.extra.pivot_cm) === r.P && existing.extra.z_cm === z) return
  emit('save-row', { mass_cm: r.a, pivot_cm: r.P, x_cm: r.x, z_cm: z })
}
function saveC() {
  if (props.readOnly) return
  if (cValue.value === null) { if (cEdit.value !== '') tableMessage.value = 'C is a position on the metre rule, between 0 and 100 cm.'; return }
  tableMessage.value = null
  state.c_cm = cEdit.value
  // z depends on C - bring every saved row up to date
  tableValues.value.filter(r => r.complete).forEach((r) => {
    const existing = rowFor(r.key)
    if (existing?.extra && existing.extra.z_cm !== r.z) emit('save-row', { mass_cm: r.a, pivot_cm: r.P, x_cm: r.x, z_cm: r.z })
  })
}

// --- Graph: x against z ------------------------------------------------------------------------------
const GRAPH: StudentGraphConfig = {
  title: 'Graph of x against z',
  axisOptions: [
    { key: 'z', label: 'z (cm)' }, { key: 'x', label: 'x (cm)' }, { key: 'a', label: 'Position of mass, a (cm)' }, { key: 'p', label: 'Balance point, P (cm)' },
  ],
  allowGenerateLine: false,
  xKey: 'z', yKey: 'x', xLabel: 'z (cm)', yLabel: 'x (cm)', xSym: 'z', ySym: 'x', gradientUnit: '',
  axisMessage: 'Check that z is on the X-axis and x is on the Y-axis - the graph is x against z.',
  formulaMessage: 'Since the graph is x against z, the gradient s = Δx / Δz. Then M = 100 s.',
  result: {
    title: 'Mass of the metre rule, M', symbol: 'M', unit: 'g', name: 'mass of the metre rule M',
    explanation: 'Taking moments about the pivot: 100 x = M z, so x = (M / 100) z. On a graph of x against z the gradient s = M / 100, so M = 100 s.',
    fromGradient: (s: number) => 100 * s,
  },
}
const graphRows = computed(() => tableValues.value.filter(r => r.complete && cValue.value !== null).map(r => ({ key: r.key, label: `a = ${r.key} cm`, x: r.z, y: r.x })))
const graphBlocker = ref<string | null>('Set the axes of your graph.')
const graphState = ref<Record<string, any> | null>(null)
watch(() => props.graphSaved, (e) => { if (e?.extra && !graphState.value) graphState.value = e.extra as Record<string, any> }, { immediate: true })
function onGraphSave(extra: Record<string, unknown>) { graphState.value = extra as Record<string, any>; emit('save-graph', extra) }
const massValue = computed(() => (graphState.value?.resultOk ? Number(graphState.value.resultInput) : null))

// --- Assessment -------------------------------------------------------------------------------------
const trialList = computed(() => POSITIONS.map(a => trialFor(keyOf(a))).filter((t): t is RuleMassTrial => !!t))
const trueMass = computed(() => trialList.value[0]?.rule_mass_g ?? props.cTrial?.rule_mass_g ?? null)
const trueC = computed(() => trialList.value[0]?.cg_cm ?? props.cTrial?.cg_cm ?? null)
const assessBlocker = computed<string | null>(() => {
  if (cValue.value === null) return 'Enter the balance point C of the rule alone.'
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

  add('setup', 'Apparatus setup', 2, trialList.value.length ? 2 : 1, 'Metre rule hung from the clamp by a thread loop, 100 g mass hung from a thread.')
  let cScore = props.cTrial ? 1 : 0
  if (trueC.value !== null && cValue.value !== null) cScore += Math.abs(cValue.value - trueC.value) <= 0.25 ? 2 : Math.abs(cValue.value - trueC.value) <= 0.5 ? 1 : 0
  add('c', 'Centre of gravity C', 3, cScore, cScore === 3 ? 'C found accurately by balancing the rule alone.' : `C should be where the rule alone balances level${trueC.value !== null ? ` (it balances at ${trueC.value.toFixed(1)} cm)` : ''}.`)
  const wm = rec?.wrong_mark_attempts ?? 0
  add('positions', 'Positions of the 100 g mass', 2, (trialList.value.length / 5) * 2 - wm * 0.5, trialList.value.length === 5 && !wm ? 'The mass hung at each of the five marks, 10.0-30.0 cm.' : `${trialList.value.length} of 5 positions used${wm ? `; the mass was hung on the wrong mark ${wm} time(s)` : ''}.`)
  const ub = rec?.unbalanced_attempts ?? 0
  add('balance', 'Balancing the rule', 2, 2 - ub * 0.5, ub ? `A reading was attempted ${ub} time(s) before the rule was level.` : 'Every reading taken with the rule balanced level.')
  const pOk = tableValues.value.filter((r) => { const t = trialFor(r.key); return t && Math.abs(r.P - t.pivot_cm) <= 0.1 }).length
  add('pivot', 'Recording of balance points', 2, (pOk / 5) * 2, pOk === 5 ? 'Every P matches the balance point you measured.' : `${pOk} of 5 balance points match what you measured.`)
  const trend = tableValues.value.every((r, i, arr) => i === 0 || (r.x <= arr[i - 1].x + 0.2 && r.z <= arr[i - 1].z + 0.2))
  add('table', 'Results table: x and z', 2, 1 + (trend ? 1 : 0), trend ? 'Complete, with x and z both getting smaller as the mass moves towards C.' : 'Check the trend: as the mass moves towards C, x and z both get smaller.')
  add('axes', 'Graph axes', 2, gs.axes?.attempts ? 1 : 2, gs.axes?.attempts ? 'Axes corrected after a first attempt with the wrong orientation.' : 'z on the x-axis and x on the y-axis, with units.')
  const pts = (gs.points || []) as { x: number; y: number }[]
  const plotted = graphRows.value.filter(r => pts.some(p => Math.abs(p.x - r.x) <= 0.3 && Math.abs(p.y - r.y) <= 0.3)).length
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
  add('gradient', 'Gradient', 3, gScore, gs.wrongFormula ? 'Correct in the end, but Δx/Δz was not used at first.' : 'Gradient s = Δx / Δz worked out correctly.')
  let mScore = gs.resultOk ? ((gs.resultChecks ?? 0) <= 1 ? 3 : 2) : 0
  let mNote = (gs.resultChecks ?? 0) <= 1 ? 'M = 100 s worked out correctly first time.' : 'M = 100 s correct after more than one attempt.'
  if (trueMass.value && massValue.value !== null && Math.abs(massValue.value - trueMass.value) > trueMass.value * 0.1) { mScore -= 1; mNote += ' Your M is more than 10% from the rule\'s actual mass - check your balance points and line.' }
  add('mass', 'Mass of the metre rule', 3, mScore, mNote)
  const text = props.conclusion
  const nums = (text.match(/\d+(?:\.\d+)?/g) || []).map(Number)
  const statesM = massValue.value !== null && nums.some(n => Math.abs(n - massValue.value!) <= Math.max(1, massValue.value! * 0.03))
  const unit = /\d\s*g\b|gram/i.test(text)
  const missing = [statesM ? '' : 'state the mass you found', unit ? '' : 'give its unit (g)'].filter(Boolean)
  add('conclusion', 'Conclusion', 3, 3 - missing.length * 1.5, missing.length ? `Your conclusion should ${missing.join(' and ')}.` : 'States the mass of the metre rule with its unit.')

  const total = half(items.reduce((s, i) => s + i.score, 0))
  state.assessment = { total, max: items.reduce((s, i) => s + i.max, 0), items }
}
watch(() => props.conclusion + cEdit.value + JSON.stringify(tableValues.value) + JSON.stringify(graphState.value), () => { if (state.assessment) state.assessment = null })

let saveTimer = 0
watch(() => JSON.stringify(state), () => {
  if (props.readOnly) return
  window.clearTimeout(saveTimer)
  saveTimer = window.setTimeout(() => {
    emit('save-analysis', { ...JSON.parse(JSON.stringify(state)), summary: { mass_g: massValue.value, true_mass_g: trueMass.value, c_cm: cValue.value, score: state.assessment?.total ?? null, max_score: state.assessment?.max ?? null } })
  }, 900)
})
onBeforeUnmount(() => window.clearTimeout(saveTimer))
watch(() => (state.assessment ? null : assessBlocker.value ?? 'Click "Mark my practical" to see your assessment before submitting.'), m => emit('blocker', m), { immediate: true })
</script>
