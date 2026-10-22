<template>
  <div>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
      <RouterLink :to="`/${role}/ict-lab`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the ICT Lab">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">ICT Lab · Computer hardware</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">Parts and devices showroom</h1>
      </div>
      <div class="w-full sm:w-auto grid grid-cols-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-0.5" role="tablist" aria-label="Mode">
        <button type="button" role="tab" :aria-selected="!quizOn" class="px-3 py-1.5 rounded-lg text-sm font-semibold" :class="!quizOn ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'" @click="stopQuiz">Explore</button>
        <button type="button" role="tab" :aria-selected="quizOn" class="px-3 py-1.5 rounded-lg text-sm font-semibold" :class="quizOn ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'" @click="startQuiz">Test yourself</button>
      </div>
    </div>

    <template v-if="!quizOn">
      <!-- The groups: inside the computer, then the devices around it -->
      <div class="flex gap-1 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none]" role="tablist">
        <button
          v-for="g in GROUPS"
          :key="g.key"
          type="button"
          role="tab"
          :aria-selected="group === g.key"
          class="flex-shrink-0 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors"
          :class="group === g.key ? 'bg-indigo-800 text-white' : 'bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 text-gray-700 dark:text-gray-200 hover:ring-indigo-300'"
          @click="setGroup(g.key)"
        >{{ g.label }} <span class="text-xs opacity-70">{{ g.keys.length }}</span></button>
      </div>
      <!-- The items in this group -->
      <div class="flex gap-1.5 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        <button
          v-for="(k, i) in SHOWN"
          :key="k"
          type="button"
          class="flex-shrink-0 px-3 py-1.5 rounded-xl border text-sm font-semibold transition-colors"
          :class="index === i ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-400'"
          @click="index = i"
        >{{ shortName(k) }}</button>
      </div>
    </template>

    <div class="mt-3 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-4 items-start">
      <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 sm:p-3">
        <div v-if="!unsupported" class="relative w-full h-[50vh] min-h-[320px] lg:h-[62vh] rounded-xl overflow-hidden bg-slate-100">
          <div ref="host" class="absolute inset-0 cursor-grab" @pointerdown="autoTurn = false"></div>

          <!-- The numbered details on the model; tap one to fly in close -->
          <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <button
              v-for="(c, i) in spots"
              :key="`${viewKey}-${i}`"
              :ref="el => (spotEls[i] = el as HTMLElement | null)"
              type="button"
              class="hs absolute left-0 top-0 pointer-events-auto rounded-full font-bold flex items-center justify-center shadow-md transition-[width,height,background-color] duration-200"
              :class="[spotSel === i || quizOn ? 'w-14 h-14 text-transparent bg-transparent border-[3px] border-amber-400 ring-2 ring-white/80' : 'w-6 h-6 text-[11px] bg-indigo-600 text-white ring-2 ring-white hover:bg-indigo-700', quizOn && quizQ?.type === 'spot' ? 'hs-pulse' : '']"
              :aria-label="quizOn ? 'The marked detail' : c.label"
              style="opacity: 0"
              @click="quizOn ? null : selectSpot(i)"
            >{{ quizOn ? '?' : i + 1 }}</button>
          </div>

          <div v-if="isInside && !quizOn" class="absolute top-2 left-2 flex flex-wrap gap-1.5">
            <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm" :class="!inCase ? 'bg-indigo-600 text-white' : 'bg-white/90 text-gray-800 hover:bg-white'" @click="inCase = false">On its own</button>
            <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm" :class="inCase ? 'bg-indigo-600 text-white' : 'bg-white/90 text-gray-800 hover:bg-white'" @click="inCase = true">Where it goes</button>
          </div>
          <div class="absolute top-2 right-2 flex flex-wrap justify-end gap-1.5">
            <span v-if="!inCase && sizeNote && !quizOn" class="hidden sm:inline px-2 py-1 rounded-lg bg-black/50 text-white text-[11px]">{{ sizeNote }}</span>
            <span class="px-2 py-1 rounded-lg bg-indigo-700 text-white text-[11px] font-bold tracking-wide">HD</span>
          </div>

          <div class="absolute bottom-2 left-2 right-2 flex items-end justify-between gap-2 pointer-events-none">
            <span class="hidden sm:inline px-2 py-1 rounded-lg bg-black/45 text-white text-[11px]">{{ spots.length && !quizOn ? 'Tap a number to look closely · ' : '' }}Drag to turn · pinch to zoom</span>
            <div class="flex flex-wrap justify-end gap-1.5 pointer-events-auto ml-auto">
              <button v-if="zoomed" type="button" class="px-2.5 py-1 rounded-lg bg-amber-400 text-gray-900 text-xs font-semibold shadow-sm" @click="wholeView">Whole view</button>
              <template v-if="!quizOn && !inCase">
                <button v-if="CLOSEUPS[viewKey]" type="button" class="px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm" :class="labelsOn ? 'bg-indigo-600 text-white' : 'bg-white/90 text-gray-800'" @click="labelsOn = !labelsOn">Labels</button>
                <button type="button" class="px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm" :class="autoTurn ? 'bg-indigo-600 text-white' : 'bg-white/90 text-gray-800'" @click="toggleTurn">Turn</button>
              </template>
              <template v-if="!quizOn">
                <button type="button" class="px-2.5 py-1 rounded-lg bg-white/90 text-gray-800 text-xs font-semibold shadow-sm hover:bg-white disabled:opacity-50" :disabled="index === 0" @click="index = Math.max(0, index - 1)">‹ Back</button>
                <button type="button" class="px-2.5 py-1 rounded-lg bg-white/90 text-gray-800 text-xs font-semibold shadow-sm hover:bg-white disabled:opacity-50" :disabled="index === SHOWN.length - 1" @click="index = Math.min(SHOWN.length - 1, index + 1)">Next ›</button>
              </template>
            </div>
          </div>

          <!-- Test yourself: the "what does this?" questions hide the model until answered -->
          <div v-if="quizOn && quizQ?.type === 'job' && quizPicked === null" class="absolute inset-0 flex items-center justify-center bg-slate-100">
            <div class="text-center px-6">
              <span class="mx-auto w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold">?</span>
              <p class="mt-2 text-sm text-gray-600">Answer, and the part appears here.</p>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500 dark:text-gray-400 p-6 text-center">This device cannot show 3D - here is everything about it.</p>
      </section>

      <!-- Explore: all about it -->
      <aside v-if="!quizOn" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-3 lg:sticky lg:top-20">
        <div>
          <p class="text-[11px] font-bold uppercase tracking-wide text-gray-400">{{ index + 1 }} of {{ SHOWN.length }}</p>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white leading-snug">{{ itemName }}</h2>
          <p v-if="!isInside" class="mt-0.5 inline-block px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200 text-xs font-semibold">{{ BADGE[group] || groupLabel }}</p>
        </div>

        <!-- The detail picked on the model -->
        <div v-if="spotSel !== null && spots[spotSel]" class="rounded-xl border-2 border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700 p-3">
          <p class="text-[11px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">Close-up · {{ spotSel + 1 }} of {{ spots.length }}</p>
          <p class="text-sm font-bold text-gray-900 dark:text-white">{{ spots[spotSel].label }}</p>
          <p class="text-sm text-gray-700 dark:text-gray-200 mt-0.5">{{ spots[spotSel].text }}</p>
          <div class="mt-2 flex gap-1.5">
            <button type="button" class="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 text-xs font-semibold border border-amber-300 disabled:opacity-40" :disabled="spotSel === 0" @click="selectSpot(spotSel - 1)">‹ Previous</button>
            <button type="button" class="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 text-xs font-semibold border border-amber-300 disabled:opacity-40" :disabled="spotSel === spots.length - 1" @click="selectSpot(spotSel + 1)">Next detail ›</button>
          </div>
        </div>

        <div v-for="row in rows" :key="row.label">
          <p class="text-xs font-bold text-indigo-600 dark:text-indigo-300 flex items-center gap-1"><AppIcon :name="row.icon" class="w-3.5 h-3.5" />{{ row.label }}</p>
          <p class="text-sm text-gray-700 dark:text-gray-200 mt-0.5">{{ row.text }}</p>
        </div>

        <!-- Every labelled detail, as a list too -->
        <div v-if="spots.length && !inCase">
          <p class="text-xs font-bold text-indigo-600 dark:text-indigo-300 flex items-center gap-1"><AppIcon name="target" class="w-3.5 h-3.5" />Look closely</p>
          <div class="mt-1.5 flex flex-wrap gap-1.5">
            <button
              v-for="(c, i) in spots"
              :key="i"
              type="button"
              class="px-2 py-1 rounded-lg text-xs font-medium border transition-colors"
              :class="spotSel === i ? 'bg-amber-400 border-amber-400 text-gray-900' : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-400'"
              @click="selectSpot(i)"
            ><span class="font-bold">{{ i + 1 }}</span> {{ c.label }}</button>
          </div>
        </div>

        <p class="text-sm rounded-xl px-3 py-2 bg-amber-50 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
          <AppIcon name="bulb" class="w-4 h-4 inline -mt-0.5" /> <span class="font-semibold">Did you know?</span> {{ fact }}
        </p>
      </aside>

      <!-- Test yourself: the question -->
      <aside v-else class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 lg:sticky lg:top-20">
        <template v-if="quizQ">
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span class="font-semibold">Question {{ quizI + 1 }} of {{ quiz.length }}</span>
            <span class="tabular-nums">{{ quizRight }} right</span>
          </div>
          <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mb-3">
            <div class="h-full bg-indigo-600 transition-all duration-500" :style="{ width: `${(quizI / quiz.length) * 100}%` }"></div>
          </div>
          <p class="text-base font-bold text-gray-900 dark:text-white leading-snug">{{ quizQ.prompt }}</p>
          <p v-if="quizQ.clue" class="mt-1 text-sm text-gray-700 dark:text-gray-200 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-2">"{{ quizQ.clue }}"</p>
          <div class="mt-3 space-y-1.5">
            <button
              v-for="o in quizQ.options"
              :key="o"
              type="button"
              class="w-full text-left rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-colors disabled:cursor-default"
              :class="optionClass(o)"
              :disabled="quizPicked !== null"
              @click="answer(o)"
            >{{ o }}</button>
          </div>
          <div v-if="quizPicked !== null" class="mt-3 rounded-xl p-3" :class="quizPicked === quizQ.answer ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100' : 'bg-rose-50 text-rose-900 dark:bg-rose-900/30 dark:text-rose-100'">
            <p class="text-sm font-bold">{{ quizPicked === quizQ.answer ? 'Right!' : `It is the ${quizQ.answer.toLowerCase()}.` }}</p>
            <p class="text-sm mt-0.5">{{ quizQ.explain }}</p>
            <div class="mt-2.5 flex justify-end">
              <button type="button" class="btn-primary !py-1.5 !text-sm" @click="nextQuestion">{{ quizI + 1 < quiz.length ? 'Next question' : 'See my result' }}</button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="text-center py-2">
            <span class="mx-auto w-12 h-12 rounded-2xl flex items-center justify-center" :class="quizScore >= 80 ? 'bg-indigo-600 text-white' : 'bg-amber-500 text-white'"><AppIcon :name="quizScore >= 80 ? 'trophy' : 'bulb'" class="w-6 h-6" /></span>
            <p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white tabular-nums">{{ quizScore }}%</p>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ quizRight }} of {{ quiz.length }} right</p>
            <p class="mt-2 text-sm font-semibold" :class="quizScore >= 80 ? 'text-indigo-800 dark:text-indigo-200' : 'text-amber-800 dark:text-amber-200'">
              {{ quizScore >= 80 ? 'You know your computer parts well.' : 'Explore the parts you missed, then try again.' }}
            </p>
            <p v-if="role !== 'student'" class="mt-1 text-xs text-gray-500">Practice - results are only saved for students.</p>
            <div v-if="quizMissed.length" class="mt-3 text-left">
              <p class="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Look at these again</p>
              <div class="flex flex-wrap gap-1.5">
                <button v-for="m in quizMissed" :key="m.key + m.label" type="button" class="px-2 py-1 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-600 hover:border-indigo-400" @click="exploreItem(m.key)">{{ m.label }}</button>
              </div>
            </div>
            <div class="mt-4 flex justify-center gap-2">
              <button type="button" class="btn-secondary" @click="stopQuiz">Explore</button>
              <button type="button" class="btn-primary" @click="startQuiz">Try again</button>
            </div>
          </div>
        </template>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import * as THREE from 'three'
import AppIcon from '@/components/common/AppIcon.vue'
import { createWorkbench, type Workbench } from '@/components/ictlab/three/workbench'
import { buildPc, setEmissive, fadeExcept, type PcRig, type PcPartKey } from '@/components/ictlab/three/pcModel'
import { PC_PARTS, PART_DETAILS } from '@/components/ictlab/activities'
import { DEVICES, DEVICE_GROUPS } from '@/components/ictlab/deviceInfo'
import { buildDevice, type DeviceKey } from '@/components/ictlab/three/devices'
import { CLOSEUPS, STAND_TURN, type Closeup } from '@/components/ictlab/closeups'
import { labRoleOf } from '@/components/ictlab/types'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))

// The parts inside the computer, then the devices around it (input, output, storage, networking
// and power, other computers)
const INSIDE = ['motherboard', 'cpu', 'cooler', 'ram', 'psu', 'hdd', 'ssd', 'gpu', 'optical', 'casefan', 'cmos', 'sata', 'ports']
const GROUPS: { key: string; label: string; keys: string[] }[] = [{ key: 'inside', label: 'Inside the computer', keys: INSIDE }, ...DEVICE_GROUPS]
const group = ref('inside')
const BADGE: Record<string, string> = { input: 'Input device', output: 'Output device', storage: 'Storage device', network: 'Networking and power', computers: 'A computer' }
const isInside = computed(() => group.value === 'inside')
const groupLabel = computed(() => GROUPS.find(g => g.key === group.value)?.label || '')
const SHOWN = computed(() => GROUPS.find(g => g.key === group.value)?.keys || INSIDE)
const index = ref(0)
const inCase = ref(false)
const key = computed(() => SHOWN.value[index.value])
const device = computed(() => (isInside.value ? null : DEVICES[key.value as DeviceKey]))
const nameOf = (k: string) => DEVICES[k as DeviceKey]?.name || PC_PARTS[k].name
const shortName = (k: string) => nameOf(k).replace(/ \(.*\)$/, '')
const itemName = computed(() => nameOf(key.value))
const fact = computed(() => device.value?.fact || PART_DETAILS[key.value].fact)
const rows = computed(() => {
  const d = device.value
  if (d) {
    return [
      { label: 'What it looks like', icon: 'photo', text: d.looks },
      { label: 'What it does', icon: 'bolt', text: d.does },
      { label: 'How it connects', icon: 'paperclip', text: d.connects }
    ]
  }
  const part = PC_PARTS[key.value]
  const details = PART_DETAILS[key.value]
  return [
    { label: 'What it looks like', icon: 'photo', text: details.looks },
    { label: 'What it does', icon: 'bolt', text: part.does },
    { label: 'Where it goes', icon: 'map', text: details.where },
    { label: 'When it fails', icon: 'warning', text: part.fails }
  ]
})
function setGroup(g: string) {
  if (g === group.value) return
  inCase.value = false
  group.value = g
  index.value = 0
}
function exploreItem(k: string) {
  stopQuiz()
  const g = GROUPS.find(x => x.keys.includes(k))
  if (!g) return
  setGroup(g.key)
  index.value = g.keys.indexOf(k)
}

// ---------------------------------------------------------------- test yourself
// Ten questions: name the part on the stand, pick the part that does a job, and name a marked
// detail on the motherboard. Saved for students as an ICT Lab attempt ('parts-quiz').
interface QuizQ { type: 'name' | 'job' | 'spot'; key: string; spot?: number; prompt: string; clue?: string; options: string[]; answer: string; explain: string }
const quizOn = ref(false)
const quiz = ref<QuizQ[]>([])
const quizI = ref(0)
const quizPicked = ref<string | null>(null)
const quizRight = ref(0)
const quizMissed = ref<{ key: string; label: string }[]>([])
let quizStarted = 0
const quizQ = computed<QuizQ | null>(() => (quizOn.value ? quiz.value[quizI.value] || null : null))
const quizScore = computed(() => Math.round((quizRight.value / Math.max(1, quiz.value.length)) * 100))
const ALL = GROUPS.flatMap(g => g.keys)
const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5)
const optionsFor = (answer: string, pool: string[]) => shuffle([answer, ...shuffle(pool.filter(p => p !== answer)).slice(0, 3)])

function makeQuiz(): QuizQ[] {
  const keys = shuffle(ALL)
  const out: QuizQ[] = []
  // name what is on the stand (the other choices from the same group, so it is not a give-away)
  for (const k of keys.slice(0, 4)) {
    const same = GROUPS.find(g => g.keys.includes(k))!.keys
    const pool = (same.length >= 4 ? same : ALL).map(shortName)
    out.push({ type: 'name', key: k, prompt: 'What is this?', options: optionsFor(shortName(k), pool), answer: shortName(k), explain: DEVICES[k as DeviceKey]?.does || PC_PARTS[k].does })
  }
  // which part does this job?
  for (const k of keys.slice(4, 7)) {
    const job = DEVICES[k as DeviceKey]?.does || PC_PARTS[k].does
    out.push({ type: 'job', key: k, prompt: 'Which one does this job?', clue: job, options: optionsFor(shortName(k), ALL.map(shortName)), answer: shortName(k), explain: `${nameOf(k)}: ${job}` })
  }
  // name the marked detail on the motherboard
  const mb = CLOSEUPS.motherboard
  for (const i of shuffle(mb.map((_, n) => n)).slice(0, 3)) {
    out.push({ type: 'spot', key: 'motherboard', spot: i, prompt: 'On the motherboard: what is the part marked "?"', options: optionsFor(mb[i].label, mb.map(c => c.label)), answer: mb[i].label, explain: mb[i].text })
  }
  return shuffle(out)
}
function startQuiz() {
  inCase.value = false
  spotSel.value = null
  quiz.value = makeQuiz()
  quizI.value = 0
  quizPicked.value = null
  quizRight.value = 0
  quizMissed.value = []
  quizStarted = Date.now()
  quizOn.value = true
}
function stopQuiz() {
  quizOn.value = false
  spotSel.value = null
}
function answer(o: string) {
  if (!quizQ.value || quizPicked.value !== null) return
  quizPicked.value = o
  if (o === quizQ.value.answer) quizRight.value++
  else quizMissed.value.push({ key: quizQ.value.key, label: quizQ.value.type === 'spot' ? `Motherboard: ${quizQ.value.answer}` : nameOf(quizQ.value.key) })
}
function optionClass(o: string) {
  if (quizPicked.value === null) return 'border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:border-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20'
  if (quizQ.value && o === quizQ.value.answer) return 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
  if (o === quizPicked.value) return 'border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200'
  return 'border-gray-200 dark:border-gray-700 text-gray-400'
}
async function nextQuestion() {
  quizPicked.value = null
  quizI.value++
  if (quizI.value < quiz.value.length || role.value !== 'student') return
  try {
    // An attempt scores 100 - 5 per mistake, so each wrong answer counts as two: 10 questions, 10% each
    await axios.post('/api/student/ict-lab/attempts', {
      activity_key: 'parts-quiz',
      level: 'simple',
      steps_total: quiz.value.length,
      mistakes: (quiz.value.length - quizRight.value) * 2,
      hints_used: 0,
      duration_seconds: Math.round((Date.now() - quizStarted) / 1000)
    })
  } catch {
    // the result still shows; it just is not kept
  }
}

// What is on the stand: the item picked, or the quiz question's
const viewKey = computed(() => (quizQ.value ? quizQ.value.key : key.value))

// ---------------------------------------------------------------- 3D
const host = ref<HTMLDivElement | null>(null)
const wb = shallowRef<Workbench | null>(null)
const unsupported = ref(false)
let rig: PcRig | null = null
let stand: THREE.Group
let turntable: THREE.Group
let shown: THREE.Object3D | null = null
let model: THREE.Object3D | null = null
let computer: THREE.Group
// "Shown larger than real size" for a small part, "smaller" for a big device
const sizeNote = ref('')
const autoTurn = ref(true)
const labelsOn = ref(true)
let swayT = 0

// The numbered details: in Explore every one (when Labels is on); in the quiz only the one asked about
const spotSel = ref<number | null>(null)
const spotEls: (HTMLElement | null)[] = []
const spots = computed<Closeup[]>(() => {
  const all = CLOSEUPS[viewKey.value] || []
  if (quizOn.value && !quizQ.value) return []
  if (quizQ.value) return quizQ.value.type === 'spot' && quizQ.value.spot !== undefined ? [all[quizQ.value.spot]] : []
  return labelsOn.value && !inCase.value ? all : []
})

// The one object for each part (some live on the motherboard, one is a cable)
const objectFor = (k: string): THREE.Object3D | null => {
  if (DEVICES[k as DeviceKey]) return buildDevice(k as DeviceKey)
  if (!rig) return null
  if (k === 'cmos') return rig.cmos
  if (k === 'ports') return rig.ports
  if (k === 'sata') return rig.cables.sata
  return rig.parts[k as PcPartKey] || null
}

// Camera spots: close to the stand, or standing back to see the whole computer
const STAND_VIEW = { pos: new THREE.Vector3(0.0, 0.2, 0.44), target: new THREE.Vector3(0, 0.1, 0) }
const CASE_VIEW = { pos: new THREE.Vector3(0.26, 0.46, 0.85), target: new THREE.Vector3(0, 0.22, -0.4) }
let camGoal: { pos: THREE.Vector3; target: THREE.Vector3 } | null = null
const zoomed = ref(false)

const tmpV = new THREE.Vector3()
const tmpN = new THREE.Vector3()
const tmpQ = new THREE.Quaternion()
// A detail's place and facing in the world
function spotWorld(c: Closeup, pos: THREE.Vector3, normal: THREE.Vector3) {
  if (!model) return false
  pos.set(...c.at)
  model.localToWorld(pos)
  normal.set(...(c.n || [0, 0, 1])).applyQuaternion(model.getWorldQuaternion(tmpQ)).normalize()
  return true
}

onMounted(async () => {
  await nextTick()
  if (!host.value) return
  try {
    wb.value = createWorkbench(host.value, { cameraPosition: STAND_VIEW.pos.toArray(), target: STAND_VIEW.target.toArray(), minDistance: 0.035, maxDistance: 1.6, near: 0.004, studio: true, hd: true })
  } catch {
    unsupported.value = true
    return
  }
  const w = wb.value
  // The stand: a white turntable with a dark rim
  stand = new THREE.Group()
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.175, 0.014, 96), new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.05, roughness: 0.55 }))
  base.position.y = 0.007
  base.receiveShadow = true
  base.castShadow = true
  stand.add(base)
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.1725, 0.003, 12, 120), new THREE.MeshStandardMaterial({ color: 0x115633, metalness: 0.3, roughness: 0.4 }))
  rim.rotation.x = Math.PI / 2
  rim.position.y = 0.0135
  stand.add(rim)
  turntable = new THREE.Group()
  turntable.position.y = 0.014
  stand.add(turntable)
  w.scene.add(stand)

  // The whole computer, further back, for "where it goes"
  rig = buildPc()
  computer = new THREE.Group()
  computer.add(rig.shell)
  for (const k of Object.keys(rig.parts) as PcPartKey[]) computer.add(rig.parts[k])
  computer.add(rig.cables.sata, rig.cables.atx24, rig.cables.cpu_fan, rig.cables.fpanel, rig.cables.mainsIn)
  computer.position.set(0, 0, -0.4)
  computer.visible = false
  w.scene.add(computer)

  w.onFrame(dt => {
    if (!inCase.value && autoTurn.value) {
      // a gentle sway that keeps the working side facing you
      swayT += dt
      turntable.rotation.y = Math.sin(swayT * 0.55) * 0.6
    }
    if (camGoal) {
      const k = 1 - Math.exp(-dt * 4)
      w.camera.position.lerp(camGoal.pos, k)
      w.controls.target.lerp(camGoal.target, k)
      if (w.camera.position.distanceTo(camGoal.pos) < 0.0015) camGoal = null
    }
    if (inCase.value) {
      const o = objectFor(key.value)
      if (o) setEmissive(o, 0xfacc15, 0.25 + 0.25 * Math.sin(performance.now() / 250))
    }
    placeSpots()
  })
  show()
})

onBeforeUnmount(() => wb.value?.dispose())

// Move each number over its detail; hide the ones on the far side
function placeSpots() {
  const w = wb.value
  if (!w) return
  const list = spots.value
  for (let i = 0; i < spotEls.length; i++) {
    const el = spotEls[i]
    if (!el) continue
    const c = list[i]
    if (!c || !spotWorld(c, tmpV, tmpN)) {
      el.style.opacity = '0'
      continue
    }
    const facing = tmpN.dot(w.camera.position.clone().sub(tmpV)) > 0
    const s = w.toScreen(tmpV)
    el.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%, -50%)`
    el.style.opacity = facing ? '1' : '0'
    el.style.pointerEvents = facing ? 'auto' : 'none'
  }
}

// Fly in close to a detail, so it fills the view
function flyTo(c: Closeup, dist = 0.075) {
  if (!wb.value || !spotWorld(c, tmpV, tmpN)) return
  autoTurn.value = false
  const target = tmpV.clone()
  const pos = target.clone().addScaledVector(tmpN, dist).add(new THREE.Vector3(0, dist * 0.25, 0))
  camGoal = { pos, target }
  zoomed.value = true
}
function selectSpot(i: number) {
  const c = spots.value[i]
  if (!c) return
  spotSel.value = i
  flyTo(c)
}
function wholeView() {
  spotSel.value = null
  zoomed.value = false
  camGoal = { pos: STAND_VIEW.pos.clone(), target: STAND_VIEW.target.clone() }
}
function toggleTurn() {
  autoTurn.value = !autoTurn.value
  if (autoTurn.value) wholeView()
}

// A copy of the item on the stand, sized to be seen, turned to show its working side
function show() {
  if (!wb.value || !rig) return
  if (shown) {
    turntable.remove(shown)
    shown = null
    model = null
  }
  // the "what does this job?" question keeps the stand empty until it is answered
  if (quizQ.value?.type === 'job' && quizPicked.value === null) return
  const src = objectFor(viewKey.value)
  if (!src) return
  const copy = src.clone(true)
  copy.position.set(0, 0, 0)
  copy.quaternion.copy(STAND_TURN[viewKey.value] || new THREE.Quaternion())
  copy.scale.set(1, 1, 1)
  copy.visible = true
  // everything in the part shows, but not the connector name tags
  copy.traverse(o => {
    o.visible = !(o as THREE.Sprite).isSprite
    o.castShadow = true
  })
  const box = new THREE.Box3().setFromObject(copy)
  const size = box.getSize(new THREE.Vector3())
  const largest = Math.max(size.x, size.y, size.z)
  // a flat thing (keyboard, cable, extension socket) lies across the whole turntable; a tall one stands
  // in the middle of it
  const flat = size.y < largest * 0.25
  const scale = Math.min(5, (flat ? 0.3 : 0.19) / largest)
  sizeNote.value = scale > 1.3 ? 'Shown larger than real size' : scale < 0.75 ? 'Shown smaller than real size' : ''
  const holder = new THREE.Group()
  holder.add(copy)
  holder.scale.setScalar(scale)
  // centre it over the turntable, sitting on it
  const b2 = new THREE.Box3().setFromObject(holder)
  const c = b2.getCenter(new THREE.Vector3())
  holder.position.set(-c.x, -b2.min.y + 0.002, -c.z)
  const spin = new THREE.Group()
  spin.add(holder)
  turntable.add(spin)
  shown = spin
  model = copy
  turntable.rotation.y = 0
  swayT = 0
  spin.updateMatrixWorld(true)
}

// "Where it goes": the computer with everything faded but this part, which glows
function fadeAllBut(target: THREE.Object3D | null) {
  if (!rig) return
  fadeExcept([rig.shell, ...Object.values(rig.parts), rig.cables.sata, rig.cables.atx24, rig.cables.cpu_fan, rig.cables.fpanel, rig.cables.mainsIn], target, 0.14)
}

watch(viewKey, () => {
  for (const k of INSIDE) {
    const o = objectFor(k)
    if (o) setEmissive(o, 0, 0)
  }
  spotSel.value = null
  show()
  if (inCase.value) fadeAllBut(objectFor(key.value))
  if (!quizQ.value || quizQ.value.type !== 'spot') {
    autoTurn.value = true
    if (zoomed.value) wholeView()
  }
})
// Each quiz question sets up the stand: the model, or a close-up of the marked detail
watch(quizQ, q => {
  if (!q) return
  show()
  if (q.type === 'spot') {
    autoTurn.value = false
    turntable.rotation.y = 0
    shown?.updateMatrixWorld(true)
    const c = spots.value[0]
    if (c) flyTo(c, 0.11)
  } else {
    autoTurn.value = true
    if (zoomed.value) wholeView()
  }
})
// Answering a "what does this job?" question brings the part out
watch(quizPicked, p => {
  if (p !== null && quizQ.value?.type === 'job') show()
})
watch(quizOn, on => {
  if (!on) {
    show()
    wholeView()
    autoTurn.value = true
  }
})
watch(inCase, on => {
  const w = wb.value
  if (!w) return
  spotSel.value = null
  zoomed.value = false
  camGoal = on ? { pos: CASE_VIEW.pos.clone(), target: CASE_VIEW.target.clone() } : { pos: STAND_VIEW.pos.clone(), target: STAND_VIEW.target.clone() }
  stand.visible = !on
  computer.visible = on
  if (on) fadeAllBut(objectFor(key.value))
  else {
    fadeAllBut(null)
    for (const k of INSIDE) {
      const o = objectFor(k)
      if (o) setEmissive(o, 0, 0)
    }
  }
})

// Opened with ?quiz=1 (the ICT Lab page's "Test yourself"): straight into the questions
onMounted(() => {
  if (route.query.quiz) startQuiz()
})
</script>

<style scoped>
.hs-pulse {
  animation: hs-pulse 1.2s ease-in-out infinite;
}
@keyframes hs-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7); }
  50% { box-shadow: 0 0 0 10px rgba(251, 191, 36, 0); }
}
</style>
