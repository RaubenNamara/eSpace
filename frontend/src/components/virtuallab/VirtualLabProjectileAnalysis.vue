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
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">The range you measured at each angle of projection (launch speed 10 m/s). Correct any you copied down wrongly, then click away to save.</p>
      <div class="overflow-x-auto">
        <table class="w-full max-w-md text-sm border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr class="bg-indigo-50 dark:bg-indigo-900/30 text-left text-gray-800 dark:text-gray-100">
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">Angle of projection, θ (°)</th>
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">Range, R (m)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in tableValues" :key="r.key" class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900/40">
              <td class="border border-gray-300 dark:border-gray-600 px-3 py-1.5 tabular-nums text-gray-800 dark:text-gray-100">{{ r.angle }}</td>
              <td class="border border-gray-300 dark:border-gray-600 px-2 py-1"><input v-model="edits[r.key]" type="number" step="0.01" min="0" :disabled="readOnly" @blur="saveRow(r.key)" class="input-field w-24 text-sm py-1 tabular-nums" placeholder="-"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="tableMessage" class="mt-2 text-xs text-amber-700 dark:text-amber-400">{{ tableMessage }}</p>
    </section>

    <!-- 3. Questions -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 space-y-5">
      <div>
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">3. Questions</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400">Answer from your results table.</p>
      </div>

      <div>
        <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1.5">(a) At which angle of projection was the range greatest?</p>
        <div class="flex flex-wrap gap-1.5">
          <label v-for="a in ANGLES" :key="'q1' + a" class="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm cursor-pointer" :class="state.q1 === String(a) ? 'border-indigo-300 bg-indigo-50/60 dark:border-indigo-700 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700'">
            <input v-model="state.q1" type="radio" :value="String(a)" :disabled="readOnly || !tableComplete" class="text-indigo-600 focus:ring-indigo-500"> {{ a }}°
          </label>
        </div>
        <p v-if="state.q1" class="mt-1.5 text-xs" :class="q1Correct ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">{{ q1Correct ? `Yes - ${bestAngle}° gave the greatest range (${bestRange} m). For a given speed the range is greatest at 45°.` : 'Look again at your results table - which range is the largest?' }}</p>
      </div>

      <div>
        <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1.5">(b) Compare the ranges at 30° and 60°, and at 15° and 75°. What do you notice?</p>
        <div class="space-y-1.5">
          <label v-for="o in PAIR_OPTIONS" :key="o.key" class="flex items-start gap-2 rounded-xl border px-3 py-2 text-sm cursor-pointer" :class="state.q2 === o.key ? 'border-indigo-300 bg-indigo-50/60 dark:border-indigo-700 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700'">
            <input v-model="state.q2" type="radio" :value="o.key" :disabled="readOnly || !tableComplete" class="mt-0.5 text-indigo-600 focus:ring-indigo-500">
            <span class="text-gray-700 dark:text-gray-200">{{ o.label }}</span>
          </label>
        </div>
        <p v-if="state.q2" class="mt-1.5 text-xs" :class="q2Correct ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">{{ q2Correct ? 'Correct - angles that add up to 90° (complementary angles) give about the same range: sin 2θ is the same for both. (The lower angle goes slightly further here because the ball leaves the launcher a little above the ground.)' : 'Look again: compare the two ranges in each pair.' }}</p>
      </div>

      <div>
        <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1.5">(c) Use R = u² sin 2θ / g, with u = 10 m/s and g = 9.8 m/s², to calculate the range at 45°.</p>
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-sm text-gray-700 dark:text-gray-200">R =</span>
          <input v-model="state.q3" type="number" step="0.01" :disabled="readOnly" class="input-field w-24 text-sm py-1 tabular-nums" placeholder="-">
          <span class="text-sm text-gray-700 dark:text-gray-200">m</span>
        </div>
        <p v-if="state.q3 !== ''" class="mt-1.5 text-xs" :class="q3Correct ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">{{ q3Feedback }}</p>
      </div>

      <div>
        <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1.5">(d) State two factors, other than the angle of projection, that affect the range of a projectile.</p>
        <textarea v-model="state.q4" :disabled="readOnly" rows="2" class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
      </div>

      <div>
        <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1.5">(e) Explain why a ball fired at an angle of 90° has a range of zero.</p>
        <textarea v-model="state.q5" :disabled="readOnly" rows="2" class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
      </div>
    </section>

    <!-- 4. Conclusion -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">4. Conclusion</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">State how the range of the projectile depends on the angle of projection.</p>
      <textarea
        :value="conclusion"
        @input="emit('update:conclusion', ($event.target as HTMLTextAreaElement).value)"
        :disabled="readOnly"
        rows="3"
        class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="The range increases as the angle increases up to ___, where it is greatest; ..."
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
          <p class="text-xs text-gray-600 dark:text-gray-300">Greatest range: <strong>{{ bestRange }} m at {{ bestAngle }}°</strong></p>
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
import type { NotebookEntry } from '@/types/virtualLab'
import type { ProjectileTrial } from './VirtualLabSceneProjectile.vue'

interface AssessmentItem { key: string; label: string; score: number; max: number; feedback: string }
interface State {
  q1: string; q2: string; q3: string; q4: string; q5: string
  assessment: { total: number; max: number; items: AssessmentItem[] } | null
}

const props = defineProps<{
  rows: NotebookEntry[]
  trials: NotebookEntry[]
  analysis: NotebookEntry | null
  conclusion: string
  readOnly?: boolean
}>()
const emit = defineEmits<{
  'save-row': [row: { angle_deg: number; range_m: number }]
  'save-analysis': [extra: Record<string, unknown>]
  'update:conclusion': [text: string]
  blocker: [message: string | null]
}>()

const ANGLES = [15, 30, 45, 60, 75]
const U = 10, G = 9.8
const keyOf = (a: number) => String(a)

const blank = (): State => ({ q1: '', q2: '', q3: '', q4: '', q5: '', assessment: null })
const state = reactive<State>(blank())
let restored = false
watch(() => props.analysis, (e) => {
  if (restored) return
  restored = true
  if (e?.extra) Object.assign(state, blank(), e.extra)
}, { immediate: true })

// --- Variables ----------------------------------------------------------------------------------------
const showVariables = ref(false)
const VARIABLES = [
  { label: 'Angle of projection, θ', kind: 'independent' },
  { label: 'Range, R (horizontal distance to where it lands)', kind: 'dependent' },
  { label: 'Launch speed (10 m/s)', kind: 'controlled' },
  { label: 'Height of the launcher', kind: 'controlled' },
  { label: 'The same ball', kind: 'controlled' },
]
const BADGE: Record<string, string> = {
  independent: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
  dependent: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300',
  controlled: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
}

// --- Results table ------------------------------------------------------------------------------------
const rowFor = (key: string) => props.rows.find(r => r.extra && r.extra.angle_deg != null && keyOf(Number(r.extra.angle_deg)) === key) ?? null
const trialFor = (key: string) => props.trials.map(t => t.extra as ProjectileTrial | null).filter((t): t is ProjectileTrial => !!t).reverse().find(t => keyOf(t.angle_deg) === key) ?? null
const edits = reactive<Record<string, string>>({})
ANGLES.forEach((a) => { edits[keyOf(a)] = '' })
watch(() => props.rows.map(r => `${r.id}:${JSON.stringify(r.extra)}`).join('|'), () => {
  ANGLES.forEach((a) => {
    const k = keyOf(a)
    const r = rowFor(k)
    if (r?.extra && edits[k] === '') edits[k] = String(r.extra.range_m)
  })
}, { immediate: true })
const tableValues = computed(() => ANGLES.map((a) => {
  const k = keyOf(a)
  const R = edits[k] === '' ? NaN : Number(edits[k])
  return { angle: a, key: k, R, complete: Number.isFinite(R) && R > 0 }
}))
const tableComplete = computed(() => tableValues.value.every(r => r.complete))
const tableMessage = ref<string | null>(null)
function saveRow(key: string) {
  if (props.readOnly || edits[key] === '') return
  const r = tableValues.value.find(v => v.key === key)!
  if (!r.complete || r.R > 30) { tableMessage.value = 'Enter the range in metres, as read on the measuring tape.'; return }
  tableMessage.value = null
  const existing = rowFor(key)
  if (existing?.extra && Number(existing.extra.range_m) === r.R) return
  emit('save-row', { angle_deg: r.angle, range_m: r.R })
}

// --- Questions ----------------------------------------------------------------------------------------
const bestRow = computed(() => tableValues.value.filter(r => r.complete).reduce<{ angle: number; R: number } | null>((b, r) => (!b || r.R > b.R ? { angle: r.angle, R: r.R } : b), null))
const bestAngle = computed(() => bestRow.value?.angle ?? '-')
const bestRange = computed(() => (bestRow.value ? bestRow.value.R.toFixed(2) : '-'))
const q1Correct = computed(() => !!bestRow.value && state.q1 === String(bestRow.value.angle))

const PAIR_OPTIONS = [
  { key: 'equal', label: 'The ranges in each pair are about the same.' },
  { key: 'smaller_more', label: 'The smaller angle in each pair gives a much greater range.' },
  { key: 'larger_more', label: 'The larger angle in each pair gives a much greater range.' },
]
const rangeAt = (a: number) => tableValues.value.find(r => r.angle === a)?.R ?? NaN
// within 15%: launching from just above the ground favours the lower angle a little (most at 15°/75°)
const pairsEqual = computed(() => [[30, 60], [15, 75]].every(([p, q]) => Math.abs(rangeAt(p) - rangeAt(q)) <= 0.15 * Math.max(rangeAt(p), rangeAt(q))))
const q2Correct = computed(() => state.q2 === (pairsEqual.value ? 'equal' : rangeAt(30) > rangeAt(60) ? 'smaller_more' : 'larger_more'))

const theory45 = (U * U * Math.sin(Math.PI / 2)) / G // 10.20 m
const q3Correct = computed(() => state.q3 !== '' && Math.abs(Number(state.q3) - theory45) <= 0.06)
const q3Feedback = computed(() => {
  if (!q3Correct.value) return 'Not quite: sin (2 × 45°) = sin 90° = 1, so R = u² / g. Work out 10² ÷ 9.8.'
  const measured = rangeAt(45)
  if (!Number.isFinite(measured)) return `Correct - R = 10² × 1 ÷ 9.8 = ${theory45.toFixed(2)} m.`
  const diff = Math.round(((measured - theory45) / theory45) * 1000) / 10
  return `Correct - R = ${theory45.toFixed(2)} m. Your measured range at 45° was ${measured.toFixed(2)} m (${diff >= 0 ? '+' : ''}${diff}%) - a little more because the ball leaves the launcher above the ground.`
})

const FACTOR_GROUPS: RegExp[] = [/speed|velocity/, /height|level|elevat/, /air|resist|drag|wind|friction/, /gravit|\bg\b/]
const factorsNamed = computed(() => FACTOR_GROUPS.filter(re => re.test(state.q4.toLowerCase())).length)
const q5Ok = computed(() => {
  const t = state.q5.toLowerCase()
  return /vertical|straight up|upward|up and down|same (place|point)/.test(t) && /horizontal|sideways|forward|sin\s*180|cos\s*90|zero|no /.test(t)
})

// --- Assessment ---------------------------------------------------------------------------------------
const trialList = computed(() => ANGLES.map(a => trialFor(keyOf(a))).filter((t): t is ProjectileTrial => !!t))
const assessBlocker = computed<string | null>(() => {
  if (!tableComplete.value) return 'Complete all five rows of the results table.'
  if (!state.q1 || !state.q2 || state.q3 === '' || !state.q4.trim() || !state.q5.trim()) return 'Answer all five questions.'
  if (!props.conclusion.trim()) return 'Write your conclusion.'
  return null
})
const half = (n: number) => Math.round(n * 2) / 2
const clampScore = (n: number, max: number) => Math.max(0, Math.min(max, half(n)))
const gradeWord = (f: number) => (f >= 0.8 ? 'Excellent' : f >= 0.65 ? 'Good' : f >= 0.5 ? 'Fair' : 'Needs improvement')

function runAssessment() {
  if (assessBlocker.value) return
  const items: AssessmentItem[] = []
  const add = (key: string, label: string, max: number, score: number, feedback: string) => items.push({ key, label, max, score: clampScore(score, max), feedback })
  add('setup', 'Apparatus setup', 2, trialList.value.length ? 2 : 1, 'Launcher and measuring tape set out on the field.')
  add('angles', 'Setting the angle of projection', 2, (trialList.value.length / 5) * 2, trialList.value.length === 5 ? 'All five angles set accurately on the quadrant.' : `${trialList.value.length} of 5 angles used.`)
  const ok = tableValues.value.filter((r) => { const t = trialFor(r.key); return t && Math.abs(r.R - t.true_range_m) <= 0.08 }).length
  add('range', 'Measurement of the range', 3, (ok / 5) * 3, ok === 5 ? 'Every range read accurately from the tape.' : `${ok} of 5 ranges match where the ball landed.`)
  add('table', 'Results table', 2, tableComplete.value ? 2 : 1, 'Complete, with the angle and the range (with units) for every shot.')
  add('q1', '(a) Greatest range', 2, q1Correct.value ? 2 : 0, q1Correct.value ? 'Correct.' : `Your table shows the greatest range at ${bestAngle.value}°.`)
  add('q2', '(b) Complementary angles', 2, q2Correct.value ? 2 : 0, q2Correct.value ? 'Correct - complementary angles give about the same range.' : 'Compare the ranges at 30° and 60°, and at 15° and 75°.')
  add('q3', '(c) Calculated range at 45°', 3, q3Correct.value ? 3 : 0, q3Correct.value ? `R = u² sin 2θ / g = ${theory45.toFixed(2)} m.` : `R = 10² × sin 90° ÷ 9.8 = ${theory45.toFixed(2)} m.`)
  const f = factorsNamed.value
  add('q4', '(d) Other factors', 2, Math.min(2, f), f >= 2 ? 'Two correct factors named.' : 'For example: the launch speed, the height of launch, air resistance, the acceleration due to gravity.')
  add('q5', '(e) Range at 90°', 2, q5Ok.value ? 2 : state.q5.trim().length > 15 ? 1 : 0, q5Ok.value ? 'Correct - fired straight up there is no horizontal velocity, so it lands where it started.' : 'At 90° the ball goes straight up: it has no horizontal velocity (u cos 90° = 0), so it comes back down where it started.')
  const text = props.conclusion.toLowerCase()
  const mentions45 = /45/.test(text) && /(great|max|furthest|farthest|largest|highest)/.test(text)
  const mentionsPairs = /(complement|same range|equal|both|30.*60|60.*30|15.*75)/.test(text)
  const mentionsTrend = /(increase|decrease|rise|fall|then)/.test(text)
  const missing = [mentions45 ? '' : 'state that the range is greatest at 45°', mentionsTrend ? '' : 'describe how the range changes as the angle increases', mentionsPairs ? '' : 'mention that complementary angles give about the same range'].filter(Boolean)
  add('conclusion', 'Conclusion', 3, 3 - missing.length, missing.length ? `Your conclusion should ${missing.join(', ')}.` : 'Range rises to a maximum at 45° then falls; complementary angles give equal ranges.')
  const total = half(items.reduce((s, i) => s + i.score, 0))
  state.assessment = { total, max: items.reduce((s, i) => s + i.max, 0), items }
}
watch(() => JSON.stringify({ ...state, assessment: null }) + props.conclusion + JSON.stringify(tableValues.value), () => { if (state.assessment) state.assessment = null })

let saveTimer = 0
watch(() => JSON.stringify(state), () => {
  if (props.readOnly) return
  window.clearTimeout(saveTimer)
  saveTimer = window.setTimeout(() => {
    emit('save-analysis', { ...JSON.parse(JSON.stringify(state)), summary: { best_angle: bestRow.value?.angle ?? null, best_range_m: bestRow.value?.R ?? null, score: state.assessment?.total ?? null, max_score: state.assessment?.max ?? null } })
  }, 900)
})
onBeforeUnmount(() => window.clearTimeout(saveTimer))
watch(() => (state.assessment ? null : assessBlocker.value ?? 'Click "Mark my practical" to see your assessment before submitting.'), m => emit('blocker', m), { immediate: true })
</script>
