<template>
  <div class="space-y-5">
    <!-- 1. Labelled diagram -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">1. Label the diagram</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">The diagram shows the frog as you dissected it: on its back, head at the top. Name the organ at each letter.</p>
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
        <svg viewBox="0 0 420 400" class="lg:col-span-3 w-full max-w-md h-auto rounded-xl bg-white border border-gray-200 dark:border-gray-700" role="img" aria-label="Diagram of the opened frog with organs marked A to G">
          <!-- body and opened cavity -->
          <path d="M 210 20 C 170 20 158 50 158 78 C 140 110 140 230 152 280 C 160 320 185 345 210 345 C 235 345 260 320 268 280 C 280 230 280 110 262 78 C 262 50 250 20 210 20 Z" fill="#e9dfb8" stroke="#a3986a" stroke-width="2" />
          <path d="M 210 70 C 185 70 170 85 168 110 C 160 160 162 250 175 290 C 182 312 196 322 210 322 C 224 322 238 312 245 290 C 258 250 260 160 252 110 C 250 85 235 70 210 70 Z" fill="#8c3b3b" />
          <!-- flaps -->
          <path d="M 168 110 C 140 140 130 230 150 290 L 120 300 C 100 230 108 150 140 100 Z" fill="#e8c7bf" stroke="#a3986a" />
          <path d="M 252 110 C 280 140 290 230 270 290 L 300 300 C 320 230 312 150 280 100 Z" fill="#e8c7bf" stroke="#a3986a" />
          <!-- kidneys (beneath the gut) -->
          <ellipse cx="196" cy="262" rx="9" ry="26" fill="none" stroke="#7e2020" stroke-width="2" stroke-dasharray="4 3" />
          <ellipse cx="224" cy="262" rx="9" ry="26" fill="none" stroke="#7e2020" stroke-width="2" stroke-dasharray="4 3" />
          <!-- lungs -->
          <ellipse cx="184" cy="122" rx="13" ry="24" fill="#e59c9c" stroke="#bf5f6c" />
          <ellipse cx="236" cy="122" rx="13" ry="24" fill="#e59c9c" stroke="#bf5f6c" />
          <!-- heart -->
          <path d="M 200 92 C 200 84 220 84 220 92 C 222 104 214 116 210 122 C 206 116 198 104 200 92 Z" fill="#9a1f1f" />
          <!-- liver -->
          <path d="M 172 150 C 176 136 204 134 208 146 C 206 168 184 172 172 150 Z" fill="#6d2116" />
          <path d="M 212 146 C 218 134 246 136 248 150 C 238 172 214 168 212 146 Z" fill="#6d2116" />
          <path d="M 232 168 C 240 158 254 164 252 176 C 246 186 232 182 232 168 Z" fill="#6d2116" />
          <!-- stomach (frog's left = viewer's right) -->
          <path d="M 236 150 C 252 160 254 196 236 212 C 228 218 220 214 218 206" fill="none" stroke="#e9d6c6" stroke-width="10" stroke-linecap="round" />
          <!-- small intestine -->
          <path d="M 218 206 C 190 206 182 218 196 226 C 214 234 232 226 226 238 C 218 250 186 244 186 256 C 186 268 230 262 232 274 C 232 284 200 282 204 292" fill="none" stroke="#ecc9b5" stroke-width="6" stroke-linecap="round" />
          <!-- large intestine -->
          <path d="M 204 292 C 206 302 210 310 210 322" fill="none" stroke="#b88f80" stroke-width="11" stroke-linecap="round" />
          <!-- letters -->
          <g font-size="15" font-weight="800" fill="#0f172a">
            <g v-for="l in LETTERS" :key="l.key">
              <line :x1="l.from[0]" :y1="l.from[1]" :x2="l.to[0]" :y2="l.to[1]" stroke="#334155" stroke-width="1.2" />
              <circle :cx="l.at[0]" :cy="l.at[1]" r="11" fill="#fff" stroke="#334155" />
              <text :x="l.at[0]" :y="l.at[1] + 5" text-anchor="middle">{{ l.key }}</text>
            </g>
          </g>
        </svg>
        <div class="lg:col-span-2 space-y-1.5">
          <div v-for="l in LETTERS" :key="'d' + l.key">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 flex-shrink-0 rounded-full border border-gray-400 dark:border-gray-500 text-xs font-bold flex items-center justify-center text-gray-800 dark:text-gray-100">{{ l.key }}</span>
              <select v-model="state.labels[l.key]" :disabled="readOnly" class="input-field text-sm py-1 flex-1 min-w-0" :class="state.labels[l.key] ? (state.labels[l.key] === l.answer ? '!border-emerald-400' : '!border-red-400') : ''">
                <option value="">Choose the organ...</option>
                <option v-for="o in ORGAN_OPTIONS" :key="o" :value="o">{{ o }}</option>
              </select>
              <span v-if="state.labels[l.key]" class="text-xs font-bold w-4" :class="state.labels[l.key] === l.answer ? 'text-emerald-600' : 'text-red-500'">{{ state.labels[l.key] === l.answer ? '✓' : '✗' }}</span>
            </div>
            <p v-if="state.labels[l.key]" class="ml-8 mt-0.5 text-[11px]" :class="state.labels[l.key] === l.answer ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">{{ state.labels[l.key] === l.answer ? 'Correct.' : `Not quite. ${l.clue}` }}</p>
          </div>
          <p class="text-[11px] text-gray-500 dark:text-gray-400 pt-1">G is drawn dashed: it lies under the gut, against the back wall.</p>
        </div>
      </div>
    </section>

    <!-- 2. Functions -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">2. Organs and their functions</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Choose the main function of each organ you found.</p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr class="bg-indigo-50 dark:bg-indigo-900/30 text-left text-gray-800 dark:text-gray-100">
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold w-36">Organ</th>
              <th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">Function</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in FUNCTIONS" :key="o.organ" class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900/40">
              <td class="border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-gray-800 dark:text-gray-100">
                {{ o.organ }}
                <span v-if="foundAtBench(o.key)" class="ml-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400" title="You identified this organ in the dissection">found</span>
              </td>
              <td class="border border-gray-300 dark:border-gray-600 px-2 py-1">
                <div class="flex items-center gap-2">
                  <select v-model="state.functions[o.key]" :disabled="readOnly" class="input-field text-sm py-1 flex-1 min-w-0">
                    <option value="">Choose...</option>
                    <option v-for="f in FUNCTION_OPTIONS" :key="f.key" :value="f.key">{{ f.text }}</option>
                  </select>
                  <span v-if="state.functions[o.key]" class="text-xs font-bold w-4" :class="state.functions[o.key] === o.key ? 'text-emerald-600' : 'text-red-500'">{{ state.functions[o.key] === o.key ? '✓' : '✗' }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 3. Questions -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 space-y-5">
      <div>
        <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">3. Questions</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400">Answer from what you observed in the dissection.</p>
      </div>

      <div v-for="mc in MCQ" :key="mc.key">
        <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1.5">{{ mc.q }}</p>
        <div class="space-y-1.5">
          <label v-for="o in mc.options" :key="o.key" class="flex items-start gap-2 rounded-xl border px-3 py-2 text-sm cursor-pointer" :class="state[mc.key] === o.key ? 'border-indigo-300 bg-indigo-50/60 dark:border-indigo-700 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700'">
            <input v-model="state[mc.key]" type="radio" :value="o.key" :disabled="readOnly" class="mt-0.5 text-indigo-600 focus:ring-indigo-500">
            <span class="text-gray-700 dark:text-gray-200">{{ o.text }}</span>
          </label>
        </div>
        <p v-if="state[mc.key]" class="mt-1.5 text-xs" :class="state[mc.key] === mc.answer ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">{{ state[mc.key] === mc.answer ? mc.right : mc.wrong }}</p>
      </div>

      <div v-for="t in TEXT_QUESTIONS" :key="t.key">
        <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1.5">{{ t.q }}</p>
        <textarea v-model="state[t.key]" :disabled="readOnly" rows="2" class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
      </div>
    </section>

    <!-- 4. Conclusion -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
      <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">4. Conclusion</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Summarise what you observed: the frog's external features, and the organs in its body cavity with their positions.</p>
      <textarea
        :value="conclusion"
        @input="emit('update:conclusion', ($event.target as HTMLTextAreaElement).value)"
        :disabled="readOnly"
        rows="3"
        class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="The frog has a dark dorsal side and a pale ventral side ... The heart lies at the front of the body cavity, between the lungs; behind it ..."
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
          <p class="text-xs text-gray-600 dark:text-gray-300">Organs found: <strong>{{ organsFound.length }} of {{ BENCH_ORGANS.length }}</strong>, organs boxed: <strong>{{ record?.sorted?.length ?? 0 }} of 12</strong></p>
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
import { reactive, computed, watch, onBeforeUnmount } from 'vue'
import type { NotebookEntry } from '@/types/virtualLab'
import type { FrogRecord } from './VirtualLabSceneFrogDissection.vue'

interface AssessmentItem { key: string; label: string; score: number; max: number; feedback: string }
interface State {
  labels: Record<string, string>
  functions: Record<string, string>
  q1: string; q2: string; q3: string; q4: string; q5: string; q6: string
  assessment: { total: number; max: number; items: AssessmentItem[] } | null
}

const props = defineProps<{
  record: FrogRecord | null
  analysis: NotebookEntry | null
  conclusion: string
  readOnly?: boolean
}>()
const emit = defineEmits<{
  'save-analysis': [extra: Record<string, unknown>]
  'update:conclusion': [text: string]
  blocker: [message: string | null]
}>()

// --- Diagram ---------------------------------------------------------------------------------------
const LETTERS = [
  { key: 'A', answer: 'Heart', at: [330, 70], from: [319, 72], to: [218, 100], clue: 'This three-chambered organ pumps blood throughout the body.' },
  { key: 'B', answer: 'Lung', at: [90, 110], from: [101, 112], to: [174, 118], clue: 'This pink, spongy sac fills with air and takes in oxygen.' },
  { key: 'C', answer: 'Liver', at: [90, 160], from: [101, 160], to: [180, 152], clue: 'This large, dark, three-lobed organ makes bile and stores glycogen.' },
  { key: 'D', answer: 'Stomach', at: [330, 180], from: [319, 180], to: [248, 182], clue: 'This muscular, J-shaped sac stores food and begins digesting protein.' },
  { key: 'E', answer: 'Small intestine', at: [90, 230], from: [101, 230], to: [192, 228], clue: 'This long, coiled tube absorbs digested food.' },
  { key: 'F', answer: 'Large intestine', at: [330, 330], from: [319, 328], to: [214, 310], clue: 'This short, wide tube absorbs water before the waste is expelled.' },
  { key: 'G', answer: 'Kidney', at: [330, 260], from: [319, 260], to: [233, 262], clue: 'This dark-red organ on the back wall filters the blood and makes urine.' },
]
const ORGAN_OPTIONS = ['Bladder', 'Gall bladder', 'Heart', 'Kidney', 'Large intestine', 'Liver', 'Lung', 'Small intestine', 'Spleen', 'Stomach']

// --- Functions -------------------------------------------------------------------------------------
const FUNCTIONS = [
  { key: 'heart', organ: 'Heart' }, { key: 'lungs', organ: 'Lungs' }, { key: 'liver', organ: 'Liver' }, { key: 'stomach', organ: 'Stomach' },
  { key: 'small_intestine', organ: 'Small intestine' }, { key: 'large_intestine', organ: 'Large intestine' }, { key: 'kidneys', organ: 'Kidneys' },
]
// listed in a fixed mixed-up order (not the order of the organs)
const FUNCTION_OPTIONS = [
  { key: 'kidneys', text: 'Remove urea and other wastes from the blood, making urine' },
  { key: 'stomach', text: 'Stores food and begins the digestion of protein' },
  { key: 'heart', text: 'Pumps blood around the body' },
  { key: 'large_intestine', text: 'Absorbs water and passes the undigested waste to the cloaca' },
  { key: 'lungs', text: 'Gaseous exchange: oxygen in, carbon dioxide out' },
  { key: 'small_intestine', text: 'Completes digestion and absorbs the digested food' },
  { key: 'liver', text: 'Makes bile, stores glycogen and breaks down excess amino acids' },
]
const BENCH_ORGANS = ['fat_bodies', 'stomach', 'liver', 'lungs', 'heart', 'kidneys']
const EXTERNAL_PARTS = 7
const BOX_COUNT = 12
const organsFound = computed(() => (props.record?.organs_found ?? []).filter(o => BENCH_ORGANS.includes(o)))
const foundAtBench = (k: string) => organsFound.value.includes(k) || (props.record?.sorted ?? []).includes(k)

// --- Questions -------------------------------------------------------------------------------------
const MCQ = [
  {
    key: 'q1' as const, q: '(a) How many chambers does the frog’s heart have?', answer: 'three',
    options: [{ key: 'two', text: 'Two - one atrium and one ventricle' }, { key: 'three', text: 'Three - two atria and one ventricle' }, { key: 'four', text: 'Four - two atria and two ventricles' }],
    right: 'Correct - two thin-walled atria and one thick-walled ventricle. (A fish heart has two chambers; a mammal’s has four.)',
    wrong: 'Look again at what you saw through the hand lens: the darker, thin-walled atria at the front and the ventricle behind them.',
  },
  {
    key: 'q2' as const, q: '(b) The frog is dark on its dorsal side and pale on its ventral side. How does this help it survive?', answer: 'camouflage',
    options: [
      { key: 'camouflage', text: 'Camouflage: from above it matches the dark water or mud, and from below it matches the bright sky' },
      { key: 'heat', text: 'The pale belly absorbs more heat from the ground' },
      { key: 'warning', text: 'The colours warn predators that it is poisonous' },
    ],
    right: 'Correct - this is countershading, a form of camouflage.',
    wrong: 'Think about what a predator sees looking down at a frog in a pond, and what a fish sees looking up at it.',
  },
]
const TEXT_QUESTIONS = [
  { key: 'q3' as const, q: '(c) Why was the skin lifted with forceps before it was cut?' },
  { key: 'q4' as const, q: '(d) Why was the muscle wall cut just to one side of the midline, and not along it?' },
  { key: 'q5' as const, q: '(e) State two external features of the frog that adapt it to life in water.' },
  { key: 'q6' as const, q: '(f) State two safety precautions you should take when carrying out a dissection.' },
]

const blank = (): State => ({ labels: {}, functions: {}, q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', assessment: null })
const state = reactive<State>(blank())
LETTERS.forEach((l) => { state.labels[l.key] = '' })
FUNCTIONS.forEach((f) => { state.functions[f.key] = '' })
let restored = false
watch(() => props.analysis, (e) => {
  if (restored) return
  restored = true
  if (!e?.extra) return
  const x = e.extra as Partial<State>
  Object.assign(state, { ...blank(), ...x, labels: { ...state.labels, ...(x.labels || {}) }, functions: { ...state.functions, ...(x.functions || {}) } })
}, { immediate: true })

const text = (k: 'q3' | 'q4' | 'q5' | 'q6') => state[k].toLowerCase()
const q3Ok = computed(() => /(damag|cut|injur|harm|punctur|pierc|burst|tear)/.test(text('q3')) && /(organ|underneath|beneath|below|under|inside|gut|intestin|vein|blood)/.test(text('q3')))
const q4Ok = computed(() => /vein/.test(text('q4')) && /(avoid|not|damag|cut|bleed|blood|burst)/.test(text('q4')))
const WATER_FEATURES: RegExp[] = [/web/, /stream|smooth|slippery|slim|mucus|moist|wet/, /(eye|nostril).*(top|above|high)|(top|above).*(eye|nostril)/, /long.*leg|hind ?leg|powerful|strong.*leg|muscular/, /skin.*(breath|gas|respir|oxygen)|breath.*skin/, /nictitat|eyelid|membrane over/]
const q5Count = computed(() => WATER_FEATURES.filter(re => re.test(text('q5'))).length)
const SAFETY: RegExp[] = [/glove/, /wash/, /(sharp|careful|away from|point|fingers|cut yourself)/, /dispos|bin|discard|throw/, /coat|apron|goggle/, /(do not|don.t|never) eat|mouth|face|eyes|wipe|disinfect|clean/]
const q6Count = computed(() => SAFETY.filter(re => re.test(text('q6'))).length)

// --- Assessment ------------------------------------------------------------------------------------
const labelsDone = computed(() => LETTERS.every(l => !!state.labels[l.key]))
const functionsDone = computed(() => FUNCTIONS.every(f => !!state.functions[f.key]))
const assessBlocker = computed<string | null>(() => {
  if (!labelsDone.value) return 'Label every letter on the diagram.'
  if (!functionsDone.value) return 'Choose a function for every organ.'
  if (!state.q1 || !state.q2 || TEXT_QUESTIONS.some(t => !text(t.key).trim())) return 'Answer all six questions.'
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
  const rec = props.record
  const slips = rec?.cut_slips ?? 0
  const opened = (rec?.pins_used ?? 0) >= 8
  add('technique', 'Dissection technique', 3, opened ? 3 - Math.min(2, slips * 0.5) : 1,
    !opened ? 'Complete the dissection: pin the frog and fold back the skin and muscle.' : slips ? `Cut cleanly along the midline - the scissors left the line ${slips} time${slips === 1 ? '' : 's'}.` : 'Pinned out, lifted and cut cleanly along the midline.')
  const n = organsFound.value.length
  const wrong = rec?.wrong_ids ?? 0
  const nExt = Math.min(EXTERNAL_PARTS, rec?.features_found?.length ?? 0)
  add('found', 'Parts found in the frog anatomy view', 4, ((n + nExt) / (BENCH_ORGANS.length + EXTERNAL_PARTS)) * 4 - Math.min(1, Math.max(0, wrong - 2) * 0.25),
    n + nExt === BENCH_ORGANS.length + EXTERNAL_PARTS ? 'All 7 external parts and 6 organs found.' : `${nExt} of 7 external parts and ${n} of 6 organs found.`)
  const nSorted = rec?.sorted?.length ?? 0
  const sortMistakes = rec?.sort_mistakes ?? 0
  add('sorted', 'Deep dissection: organs in their boxes', 3, (nSorted / BOX_COUNT) * 3 - Math.min(1, Math.max(0, sortMistakes - 2) * 0.25),
    nSorted === BOX_COUNT ? (sortMistakes > 2 ? `All 12 organs boxed, after ${sortMistakes} wrong boxes.` : 'All 12 organs lifted out and boxed correctly.') : `${nSorted} of ${BOX_COUNT} organs boxed.`)
  const labelsRight = LETTERS.filter(l => state.labels[l.key] === l.answer)
  add('diagram', 'Labelled diagram', 7, labelsRight.length, labelsRight.length === 7 ? 'All labels correct.' : `Correct: ${labelsRight.map(l => l.key).join(', ') || 'none'}. ${LETTERS.filter(l => state.labels[l.key] !== l.answer).map(l => `${l.key} is the ${l.answer.toLowerCase()}`).join('; ')}.`)
  const fnRight = FUNCTIONS.filter(f => state.functions[f.key] === f.key)
  add('functions', 'Organs and their functions', 7, fnRight.length, fnRight.length === 7 ? 'All functions correct.' : `${fnRight.length} of 7 correct. Check: ${FUNCTIONS.filter(f => state.functions[f.key] !== f.key).map(f => f.organ.toLowerCase()).join(', ')}.`)
  add('q1', '(a) Chambers of the heart', 2, state.q1 === 'three' ? 2 : 0, state.q1 === 'three' ? 'Correct.' : 'Three: two atria and one ventricle.')
  add('q2', '(b) Dark back, pale belly', 2, state.q2 === 'camouflage' ? 2 : 0, state.q2 === 'camouflage' ? 'Correct - countershading.' : 'It is camouflage (countershading) from predators above and below.')
  add('q3', '(c) Lifting the skin before cutting', 2, q3Ok.value ? 2 : text('q3').length > 15 ? 1 : 0, q3Ok.value ? 'Correct - so the scissors do not damage the organs underneath.' : 'Lifting the skin away from the body keeps the points of the scissors off the organs underneath, so they are not damaged.')
  add('q4', '(d) Cutting beside the midline', 2, q4Ok.value ? 2 : text('q4').length > 15 ? 1 : 0, q4Ok.value ? 'Correct - to avoid cutting the abdominal vein.' : 'The abdominal vein runs up the middle of the muscle wall; cutting beside it avoids cutting the vein and bleeding that hides the organs.')
  add('q5', '(e) Adaptations to life in water', 2, Math.min(2, q5Count.value), q5Count.value >= 2 ? 'Two correct features.' : 'For example: webbed hind feet, a smooth slimy streamlined body, eyes and nostrils on top of the head, powerful hind legs, a moist skin for gaseous exchange.')
  add('q6', '(f) Safety precautions', 2, Math.min(2, q6Count.value), q6Count.value >= 2 ? 'Two sensible precautions.' : 'For example: wear gloves, handle scissors and pins with care, wash your hands afterwards, dispose of the specimen properly.')
  const c = props.conclusion.toLowerCase()
  const organsNamed = ['heart', 'lung', 'liver', 'stomach', 'intestin', 'kidney'].filter(o => c.includes(o)).length
  const positions = /(front|anterior|behind|posterior|below|beneath|under|back wall|dorsal|between|beside|either side)/.test(c)
  const external = /(dorsal|ventral|web|tympan|skin|colour|color|pale|dark)/.test(c)
  const cScore = (organsNamed >= 5 ? 1 : organsNamed >= 3 ? 0.5 : 0) + (positions ? 1 : 0) + (external ? 1 : 0)
  const missing = [organsNamed >= 5 ? '' : 'name the organs you found', positions ? '' : 'say where each lies (e.g. the heart at the front, the kidneys against the back wall)', external ? '' : 'mention the external features'].filter(Boolean)
  add('conclusion', 'Conclusion', 3, cScore, missing.length ? `Your conclusion should ${missing.join(', ')}.` : 'A full summary of the external features and the organs with their positions.')
  const total = half(items.reduce((s, i) => s + i.score, 0))
  state.assessment = { total, max: items.reduce((s, i) => s + i.max, 0), items }
}
watch(() => JSON.stringify({ ...state, assessment: null }) + props.conclusion, () => { if (state.assessment) state.assessment = null })

let saveTimer = 0
watch(() => JSON.stringify(state), () => {
  if (props.readOnly) return
  window.clearTimeout(saveTimer)
  saveTimer = window.setTimeout(() => {
    emit('save-analysis', { ...JSON.parse(JSON.stringify(state)), summary: { organs_found: organsFound.value.length, score: state.assessment?.total ?? null, max_score: state.assessment?.max ?? null } })
  }, 900)
})
onBeforeUnmount(() => window.clearTimeout(saveTimer))
watch(() => (state.assessment ? null : assessBlocker.value ?? 'Click "Mark my practical" to see your assessment before submitting.'), m => emit('blocker', m), { immediate: true })
</script>
