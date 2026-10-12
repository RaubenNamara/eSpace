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
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">The image distances and the angles you measured at T. Correct any you copied down wrongly, then click away to save.</p>
      <div class="overflow-x-auto">
        <table class="w-full max-w-2xl text-sm border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr class="bg-indigo-50 dark:bg-indigo-900/30 text-left text-gray-800 dark:text-gray-100">
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">Object distance, y (cm)</th>
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">Image distance, x (cm)</th>
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">Angle of incidence, i (°)</th>
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">Angle of reflection, r (°)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in tableValues" :key="r.key" class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900/40">
              <td class="border border-gray-300 dark:border-gray-600 px-3 py-1.5 tabular-nums text-gray-800 dark:text-gray-100">{{ r.key }}</td>
              <td class="border border-gray-300 dark:border-gray-600 px-2 py-1"><input v-model="edits[r.key].x" type="number" step="0.1" min="0" :disabled="readOnly" @blur="saveRow(r.key)" class="input-field w-24 text-sm py-1 tabular-nums" placeholder="-"></td>
              <td class="border border-gray-300 dark:border-gray-600 px-2 py-1"><input v-model="edits[r.key].i" type="number" step="1" min="0" max="90" :disabled="readOnly" @blur="saveRow(r.key)" class="input-field w-20 text-sm py-1 tabular-nums" placeholder="-"></td>
              <td class="border border-gray-300 dark:border-gray-600 px-2 py-1"><input v-model="edits[r.key].r" type="number" step="1" min="0" max="90" :disabled="readOnly" @blur="saveRow(r.key)" class="input-field w-20 text-sm py-1 tabular-nums" placeholder="-"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="tableMessage" class="mt-2 text-xs text-amber-700 dark:text-amber-400">{{ tableMessage }}</p>
    </section>

    <!-- 3. Laws of reflection: i and r at T for every trial -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">3. Laws of reflection</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Compare the angle of incidence i with the angle of reflection r in each trial. (The incident ray OT, the reflected ray and the normal TN all lie on the flat sheet - in one plane.)</p>
      <div class="flex flex-wrap gap-2 mb-3">
        <span v-for="r in tableValues" :key="'ir' + r.key" class="px-2.5 py-1 rounded-lg text-xs font-semibold tabular-nums" :class="r.anglesComplete ? (Math.abs(r.i - r.r) <= 1 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300') : 'bg-gray-100 text-gray-400 dark:bg-gray-700'">
          y = {{ r.key }}: i = {{ r.anglesComplete ? r.i + '°' : '-' }}, r = {{ r.anglesComplete ? r.r + '°' : '-' }}
        </span>
      </div>
      <p class="text-xs text-gray-600 dark:text-gray-300 mb-1.5">What do your readings show about i and r?</p>
      <div class="space-y-1.5">
        <label v-for="o in ANGLE_RELATIONS" :key="o.key" class="flex items-start gap-2 rounded-xl border px-3 py-2 text-sm cursor-pointer" :class="state.angleRelation === o.key ? 'border-indigo-300 bg-indigo-50/60 dark:border-indigo-700 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700'">
          <input v-model="state.angleRelation" type="radio" :value="o.key" :disabled="readOnly || !allAngles" class="mt-0.5 text-indigo-600 focus:ring-indigo-500">
          <span class="text-gray-700 dark:text-gray-200">{{ o.label }}</span>
        </label>
      </div>
      <p v-if="state.angleRelation" class="mt-2 text-xs" :class="angleRelationCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">{{ angleRelationFeedback }}</p>
    </section>

    <!-- 4. Graph of x against y -->
    <VirtualLabStudentGraph :config="GRAPH" :rows="graphRows" :saved="graphSaved" :read-only="readOnly" @save="onGraphSave" @blocker="graphBlocker = $event" />

    <!-- 4. What the graph shows -->
    <section v-if="kValue !== null" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">What your graph shows</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Your gradient is <strong>{{ kValue }}</strong>. Which statement does it support?</p>
      <div class="space-y-1.5">
        <label v-for="o in RELATIONS" :key="o.key" class="flex items-start gap-2 rounded-xl border px-3 py-2 text-sm cursor-pointer" :class="state.relation === o.key ? 'border-indigo-300 bg-indigo-50/60 dark:border-indigo-700 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700'">
          <input v-model="state.relation" type="radio" :value="o.key" :disabled="readOnly" class="mt-0.5 text-indigo-600 focus:ring-indigo-500">
          <span class="text-gray-700 dark:text-gray-200">{{ o.label }}</span>
        </label>
      </div>
      <p v-if="state.relation" class="mt-2 text-xs" :class="relationCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">{{ relationFeedback }}</p>
    </section>

    <!-- 5. Conclusion -->
    <section v-if="kValue !== null" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">Conclusion</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">State what you found about the angles i and r (the laws of reflection) and about the image distance and the object distance, and use it to explain to the driver what he saw in his plane mirror.</p>
      <textarea
        :value="conclusion"
        @input="emit('update:conclusion', ($event.target as HTMLTextAreaElement).value)"
        :disabled="readOnly"
        rows="4"
        class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="The angle of incidence was ___ the angle of reflection, and the image distance was ___ the object distance, so ..."
      ></textarea>
    </section>

    <!-- 6. Assessment -->
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
            <p>Angles: i = r in <strong>{{ equalAngleCount }} of 5</strong> trials (laws of reflection)</p>
            <p>Gradient of x against y = <strong>{{ kValue }}</strong> (an ideal plane mirror gives exactly 1: x = y)</p>
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
import type { MirrorPinTrial, MirrorPinRecord } from './VirtualLabScenePlaneMirror.vue'

interface AssessmentItem { key: string; label: string; score: number; max: number; feedback: string }
interface State { relation: string; angleRelation: string; assessment: { total: number; max: number; items: AssessmentItem[] } | null }

const props = defineProps<{
  rows: NotebookEntry[]
  trials: NotebookEntry[]
  labRecord: MirrorPinRecord | null
  analysis: NotebookEntry | null
  graphSaved: NotebookEntry | null
  conclusion: string
  readOnly?: boolean
}>()
const emit = defineEmits<{
  'save-row': [row: { object_cm: number; image_cm: number; i_deg: number | null; r_deg: number | null }]
  'save-analysis': [extra: Record<string, unknown>]
  'save-graph': [extra: Record<string, unknown>]
  'update:conclusion': [text: string]
  blocker: [message: string | null]
}>()

const DISTANCES = [2, 4, 6, 8, 10]
const keyOf = (cm: number) => cm.toFixed(1)

const state = reactive<State>({ relation: '', angleRelation: '', assessment: null })
let restored = false
watch(() => props.analysis, (e) => {
  if (restored) return
  restored = true
  if (e?.extra) Object.assign(state, { relation: '', angleRelation: '', assessment: null }, e.extra)
}, { immediate: true })

// --- Variables (standard, shown for reference) ------------------------------------------------------
const showVariables = ref(false)
const VARIABLES = [
  { label: 'Object distance, y (P1 to the mirror)', kind: 'independent' },
  { label: 'Image distance, x (I to the mirror)', kind: 'dependent' },
  { label: 'Angle of incidence i and angle of reflection r at T', kind: 'dependent' },
  { label: 'The same plane mirror, standing on ML', kind: 'controlled' },
  { label: 'P1 always on the normal RS', kind: 'controlled' },
  { label: 'Pins upright and in one line with the image', kind: 'controlled' },
]
const BADGE: Record<string, string> = {
  independent: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
  dependent: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300',
  controlled: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
}

// --- Results table ----------------------------------------------------------------------------------
const rowFor = (key: string) => props.rows.find(r => r.extra && r.extra.object_cm != null && keyOf(Number(r.extra.object_cm)) === key) ?? null
const trialFor = (key: string) => props.trials.map(t => t.extra as MirrorPinTrial | null).filter((t): t is MirrorPinTrial => !!t).reverse().find(t => keyOf(t.object_cm) === key) ?? null
const edits = reactive<Record<string, { x: string; i: string; r: string }>>({})
DISTANCES.forEach((d) => { edits[keyOf(d)] = { x: '', i: '', r: '' } })
watch(() => props.rows.map(r => `${r.id}:${JSON.stringify(r.extra)}`).join('|'), () => {
  DISTANCES.forEach((d) => {
    const k = keyOf(d)
    const r = rowFor(k)
    if (!r?.extra) return
    if (edits[k].x === '') edits[k].x = String(r.extra.image_cm)
    if (edits[k].i === '' && r.extra.i_deg != null) edits[k].i = String(r.extra.i_deg)
    if (edits[k].r === '' && r.extra.r_deg != null) edits[k].r = String(r.extra.r_deg)
  })
}, { immediate: true })
const tableValues = computed(() => DISTANCES.map((d) => {
  const k = keyOf(d)
  const e = edits[k]
  const x = e.x === '' ? NaN : Number(e.x)
  const i = e.i === '' ? NaN : Number(e.i)
  const r = e.r === '' ? NaN : Number(e.r)
  return { y: d, key: k, x, i, r, complete: Number.isFinite(x) && x > 0, anglesComplete: Number.isFinite(i) && Number.isFinite(r) }
}))
const tableMessage = ref<string | null>(null)
function saveRow(key: string) {
  if (props.readOnly || edits[key].x === '') return
  const r = tableValues.value.find(v => v.key === key)!
  if (!r.complete || r.x > 30) { tableMessage.value = 'Enter the image distance in centimetres, as measured on your sheet.'; return }
  tableMessage.value = null
  const existing = rowFor(key)
  if (r.anglesComplete && (r.i > 90 || r.r > 90)) { tableMessage.value = 'Angles from the normal are between 0° and 90°.'; return }
  const iv = r.anglesComplete ? r.i : null, rv = r.anglesComplete ? r.r : null
  if (existing?.extra && Number(existing.extra.image_cm) === r.x && existing.extra.i_deg === iv && existing.extra.r_deg === rv) return
  emit('save-row', { object_cm: r.y, image_cm: r.x, i_deg: iv, r_deg: rv })
}

// --- Graph: x against y ------------------------------------------------------------------------------
const GRAPH: StudentGraphConfig = {
  title: 'Graph of x against y',
  allowGenerateLine: false,
  axisOptions: [{ key: 'y', label: 'Object distance, y (cm)' }, { key: 'x', label: 'Image distance, x (cm)' }],
  xKey: 'y', yKey: 'x', xLabel: 'Object distance, y (cm)', yLabel: 'Image distance, x (cm)', xSym: 'y', ySym: 'x', gradientUnit: '',
  axisMessage: 'Check that the object distance y is on the X-axis and the image distance x is on the Y-axis - the graph is x against y.',
  formulaMessage: 'Since the graph is x against y, the gradient = Δx / Δy.',
  result: {
    title: 'Ratio of image distance to object distance, x / y', symbol: 'x/y', unit: '', name: 'ratio x / y',
    explanation: 'The graph is a straight line through the origin, so x = k y: for every trial x / y is the same number k - the gradient of the line.',
    fromGradient: (s: number) => s,
  },
}
const graphRows = computed(() => tableValues.value.filter(r => r.complete).map(r => ({ key: r.key, label: `y = ${r.key} cm`, x: r.y, y: r.x })))
const graphBlocker = ref<string | null>('Set the axes of your graph.')
const graphState = ref<Record<string, any> | null>(null)
watch(() => props.graphSaved, (e) => { if (e?.extra && !graphState.value) graphState.value = e.extra as Record<string, any> }, { immediate: true })
function onGraphSave(extra: Record<string, unknown>) { graphState.value = extra as Record<string, any>; emit('save-graph', extra) }
const kValue = computed(() => (graphState.value?.resultOk ? Number(graphState.value.resultInput) : null))

// --- Laws of reflection --------------------------------------------------------------------------------
const ANGLE_RELATIONS = [
  { key: 'equal', label: 'The angle of incidence is equal to the angle of reflection (i = r).' },
  { key: 'greater', label: 'The angle of incidence is greater than the angle of reflection.' },
  { key: 'smaller', label: 'The angle of incidence is smaller than the angle of reflection.' },
]
const allAngles = computed(() => tableValues.value.every(r => r.anglesComplete))
const equalAngleCount = computed(() => tableValues.value.filter(r => r.anglesComplete && Math.abs(r.i - r.r) <= 1).length)
const angleRelationCorrect = computed(() => state.angleRelation === (equalAngleCount.value >= 4 ? 'equal' : tableValues.value.reduce((s, r) => s + (r.i - r.r), 0) > 0 ? 'greater' : 'smaller'))
const angleRelationFeedback = computed(() => (angleRelationCorrect.value
  ? (state.angleRelation === 'equal' ? 'Yes - in every trial i = r: the angle of incidence equals the angle of reflection. With the incident ray, reflected ray and normal all on the flat sheet (one plane), both laws of reflection are verified.' : 'That matches your readings - but a plane mirror should give i = r. Check your pins and angles.')
  : 'Look again at your readings of i and r in each trial.'))

// --- The relationship ---------------------------------------------------------------------------------
const RELATIONS = [
  { key: 'equal', label: 'The image distance is equal to the object distance (x = y).' },
  { key: 'greater', label: 'The image distance is greater than the object distance.' },
  { key: 'smaller', label: 'The image distance is smaller than the object distance.' },
]
const kNearOne = computed(() => kValue.value !== null && Math.abs(kValue.value - 1) <= 0.1)
const relationCorrect = computed(() => state.relation === (kNearOne.value ? 'equal' : (kValue.value ?? 1) > 1 ? 'greater' : 'smaller'))
const relationFeedback = computed(() => (relationCorrect.value
  ? (kNearOne.value ? 'Yes - a gradient of about 1 means x = y: the image is as far behind the mirror as the object is in front.' : 'That matches your gradient - but check your pins and lines: a plane mirror should give a gradient of about 1.')
  : `Look again at your gradient of ${kValue.value}: ${kNearOne.value ? 'it is about 1, so x = y.' : 'compare it with 1.'}`))

// --- Assessment -------------------------------------------------------------------------------------
const trialList = computed(() => DISTANCES.map(d => trialFor(keyOf(d))).filter((t): t is MirrorPinTrial => !!t))
const assessBlocker = computed<string | null>(() => {
  if (tableValues.value.some(r => !r.complete || !r.anglesComplete)) return 'Complete all five rows of the results table (x, i and r).'
  if (!state.angleRelation) return 'Say what your readings show about i and r.'
  if (graphBlocker.value) return graphBlocker.value
  if (!state.relation) return 'Choose the statement your graph supports.'
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

  add('setup', 'Apparatus setup', 2, 2, 'White sheet on the soft board, lines ML and RS drawn, mirror standing on ML.')
  const off = rec?.off_line_attempts ?? 0
  add('object', 'Object pin P1', 2, (trialList.value.length / 5) * 2 - off * 0.5, off ? 'Stick P1 on the normal RS each time.' : 'P1 on the normal RS at each of the five object distances.')
  const mis = rec?.misaligned_attempts ?? 0
  const avgMis = trialList.value.length ? trialList.value.reduce((s, t) => s + t.misalignment_cm, 0) / trialList.value.length : 0
  add('alignment', 'No-parallax alignment of P2 and P3', 3, 3 - mis * 0.5 - (avgMis > 0.05 ? 0.5 : 0), mis ? `The mirror was removed ${mis} time(s) before P3, P2 and the image were in line.` : 'P3, P2 and the image of P1 lined up every time.')
  const close = rec?.close_pins ?? 0
  add('spacing', 'Spacing of P2 and P3', 1, close ? 0 : 1, close ? 'Stick P2 and P3 well apart (about 5 cm or more) - the line through them is then more accurate.' : 'P2 and P3 well apart, giving accurate lines.')
  const xOk = tableValues.value.filter((r) => { const t = trialFor(r.key); return t && Math.abs(r.x - t.line_image_cm) <= 0.11 }).length
  add('measure', 'Measurement of image distances', 2, (xOk / 5) * 2, xOk === 5 ? 'Every x matches the line you drew.' : `${xOk} of 5 image distances match your lines.`)
  const rising = tableValues.value.every((r, i, a) => i === 0 || r.x > a[i - 1].x)
  const angOk = tableValues.value.filter((r) => { const t = trialFor(r.key); return t && t.i_deg != null && r.i === t.i_deg && r.r === t.r_deg }).length
  add('angles', 'Measurement of i and r', 2, (angOk / 5) * 2, angOk === 5 ? 'Normal drawn at T and both angles measured from it in every trial.' : `${angOk} of 5 pairs of angles match your protractor readings.`)
  add('law', 'Laws of reflection', 3, angleRelationCorrect.value ? 3 : 0, angleRelationCorrect.value ? 'Correctly concluded that i = r, with the rays and normal in one plane.' : 'The statement about i and r does not match your readings.')
  add('table', 'Results table', 2, 1 + (rising ? 1 : 0), rising ? 'Complete, with x increasing as y increases.' : 'Check your readings: x should increase as P1 moves further from the mirror.')
  add('axes', 'Graph axes', 2, gs.axes?.attempts ? 1 : 2, gs.axes?.attempts ? 'Axes corrected after a first attempt with the wrong orientation.' : 'y on the x-axis and x on the y-axis, with units.')
  const pts = (gs.points || []) as { x: number; y: number }[]
  const plotted = graphRows.value.filter(r => pts.some(p => Math.abs(p.x - r.x) <= 0.2 && Math.abs(p.y - r.y) <= 0.2)).length
  add('plotting', 'Plotting of points', 3, (plotted / 5) * 3, plotted === 5 ? 'All five points plotted accurately.' : `${plotted} of 5 points plotted accurately.`)
  let lineScore = 0, lineNote = 'No line of best fit.'
  const fit = linearRegression(pts)
  if (gs.line?.a && gs.line?.b && fit && gs.line.b.x !== gs.line.a.x) {
    const ratio = ((gs.line.b.y - gs.line.a.y) / (gs.line.b.x - gs.line.a.x)) / fit.slope
    lineScore = Math.abs(ratio - 1) <= 0.08 ? 2 : Math.abs(ratio - 1) <= 0.2 ? 1.5 : 1
    lineNote = lineScore === 2 ? 'Well-balanced straight line of best fit.' : 'Line follows the trend but is not balanced through the points.'
  }
  add('bestfit', 'Line of best fit', 2, lineScore, lineNote)
  let gScore = gs.gradientOk ? 3 : 0
  if (gs.wrongFormula) gScore -= 1
  if ((gs.gradientChecks ?? 0) > 1 + (gs.wrongFormula ?? 0)) gScore -= 0.5
  if (kValue.value !== null && !kNearOne.value) gScore -= 1
  add('gradient', 'Gradient', 3, gScore, kValue.value !== null && !kNearOne.value ? 'Your gradient is far from 1 - check the alignment of your pins.' : 'Gradient Δx / Δy worked out correctly.')
  add('relation', 'Relationship from the graph', 2, relationCorrect.value ? 2 : 0, relationCorrect.value ? 'Correct conclusion from the gradient.' : 'The statement does not match your gradient.')
  const text = props.conclusion.toLowerCase()
  const anglesLaw = /(angle of incidence|\bi\b)[^.]*(equal|same|=)[^.]*(angle of reflection|\br\b)|i\s*=\s*r/.test(text)
  const equal = /equal|same|x\s*=\s*y|y\s*=\s*x/.test(text)
  const both = /image/.test(text) && /object/.test(text)
  const driver = /driver|car|far|near|behind|risk|size/.test(text)
  const missing = [anglesLaw ? '' : 'state that the angle of incidence equals the angle of reflection', equal && both ? '' : 'say that the image distance equals the object distance', driver ? '' : 'use it to explain what the driver saw'].filter(Boolean)
  add('conclusion', 'Conclusion', 3, 3 - missing.length, missing.length ? `Your conclusion should ${missing.join(', ')}.` : 'States i = r and x = y, and explains the driver’s observation.')

  const total = half(items.reduce((s, i) => s + i.score, 0))
  state.assessment = { total, max: items.reduce((s, i) => s + i.max, 0), items }
}
watch(() => JSON.stringify({ ...state, assessment: null }) + props.conclusion + JSON.stringify(tableValues.value) + JSON.stringify(graphState.value), () => { if (state.assessment) state.assessment = null })

let saveTimer = 0
watch(() => JSON.stringify(state), () => {
  if (props.readOnly) return
  window.clearTimeout(saveTimer)
  saveTimer = window.setTimeout(() => {
    emit('save-analysis', { ...JSON.parse(JSON.stringify(state)), summary: { k: kValue.value, relation: state.relation, angle_relation: state.angleRelation, equal_angles: equalAngleCount.value, score: state.assessment?.total ?? null, max_score: state.assessment?.max ?? null } })
  }, 900)
})
onBeforeUnmount(() => window.clearTimeout(saveTimer))
watch(() => (state.assessment ? null : assessBlocker.value ?? 'Click "Mark my practical" to see your assessment before submitting.'), m => emit('blocker', m), { immediate: true })
</script>
