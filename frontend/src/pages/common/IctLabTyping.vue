<template>
  <!-- The typing tutor: lessons from the home row to a one-minute speed test. While typing, the
       key to press lights up on the keyboard and the hand below shows which finger presses it.
       A wrong key does not move on - press the right one. Speed (words a minute) and accuracy
       are saved for students like any ICT Lab activity (activity_key typing-<lesson>). -->
  <div>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
      <button v-if="view !== 'lessons'" type="button" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the lessons" @click="backToLessons">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <RouterLink v-else :to="`/${role}/ict-lab`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the ICT Lab">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">ICT Lab · Typing tutor</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">{{ lesson && view !== 'lessons' ? `Lesson ${lessonIndex + 1}: ${lesson.title}` : 'Learn to touch-type' }}</h1>
      </div>
      <div v-if="view === 'lessons' && bestWpm" class="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-sm">
        <span class="text-gray-500 dark:text-gray-400">Your best speed</span> <b class="text-indigo-800 dark:text-indigo-200">{{ bestWpm }} words a minute</b>
      </div>
    </div>

    <!-- ===================== The lessons ===================== -->
    <template v-if="view === 'lessons'">
      <div class="dash-box mb-4">
        <div class="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 flex flex-wrap gap-x-6 gap-y-1">
          <span><b>1.</b> Fingers on the home row: A S D F and J K L ;</span>
          <span><b>2.</b> Look at the screen, not your hands.</span>
          <span><b>3.</b> Get it right first - speed comes with practice.</span>
          <span v-if="role === 'student'" class="text-gray-500"><b>{{ TYPING_PASS }}%</b> accuracy opens the next lesson.</span>
        </div>
      </div>

      <div v-for="sec in sections" :key="sec.name" class="mb-5">
        <h2 class="text-sm font-bold text-gray-900 dark:text-white mb-2">{{ sec.name }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5">
          <button
            v-for="l in sec.lessons"
            :key="l.id"
            type="button"
            class="text-left rounded-2xl border p-3.5 transition-all disabled:cursor-not-allowed"
            :class="locked(l) ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-70' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-400 hover:shadow-sm'"
            :disabled="locked(l)"
            @click="startLesson(l)"
          >
            <div class="flex items-start gap-3">
              <span class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold" :class="stars(l) ? 'bg-indigo-600 text-white' : locked(l) ? 'bg-gray-200 text-gray-500 dark:bg-gray-700' : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200'">
                <svg v-if="locked(l)" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <template v-else>{{ TYPING_LESSONS.indexOf(l) + 1 }}</template>
              </span>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{{ l.title }}</p>
                <div class="mt-1 flex flex-wrap items-center gap-1">
                  <span v-for="c in chips(l)" :key="c" class="min-w-[1.5rem] h-6 px-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-xs font-semibold flex items-center justify-center shadow-[0_2px_0_rgba(0,0,0,0.12)]">{{ c }}</span>
                </div>
                <p class="mt-1.5 text-[11px] font-semibold flex items-center gap-1.5">
                  <span v-if="stars(l)" class="text-amber-500 tracking-tight">{{ '★'.repeat(stars(l)) }}<span class="text-gray-300 dark:text-gray-600">{{ '★'.repeat(3 - stars(l)) }}</span></span>
                  <span v-if="best(l)" class="text-gray-500 dark:text-gray-400">{{ best(l)!.wpm }} wpm · {{ best(l)!.acc }}%</span>
                  <span v-else-if="locked(l)" class="text-gray-400">Pass the lesson before</span>
                  <span v-else class="text-indigo-600 dark:text-indigo-300">Start</span>
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </template>

    <!-- ===================== Typing ===================== -->
    <template v-else-if="view === 'type' && lesson">
      <!-- live numbers -->
      <div class="grid grid-cols-4 gap-2 mb-3">
        <div v-for="s in liveStats" :key="s.label" class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
          <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ s.label }}</p>
          <p class="text-lg font-bold text-gray-900 dark:text-white tabular-nums leading-tight">{{ s.value }}</p>
        </div>
      </div>

      <!-- the text to type; a hidden box underneath takes the typing (it also brings up a phone's keyboard) -->
      <div class="relative rounded-2xl border-2 bg-white dark:bg-gray-900 p-4 sm:p-5 cursor-text transition-colors" :class="focused ? 'border-indigo-400' : 'border-gray-200 dark:border-gray-700'" @click="focusInput">
        <textarea
          ref="input"
          class="absolute inset-0 w-full h-full opacity-0 resize-none cursor-text"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          aria-label="Type the text here"
          @input="onInput"
          @keydown="onKeydown"
          @focus="focused = true"
          @blur="focused = false"
        ></textarea>
        <p ref="textBox" class="relative pointer-events-none text-xl sm:text-2xl leading-[1.9] tracking-wide font-medium text-gray-400 dark:text-gray-500 max-h-[5.7em] overflow-hidden select-none" style="font-family: ui-monospace, 'Cascadia Mono', Consolas, monospace">
          <span v-for="(w, wi) in words" :key="wi" class="inline-block whitespace-pre">
            <span
              v-for="c in w"
              :key="c.i"
              :data-i="c.i"
              :class="charClass(c.i)"
            >{{ c.ch === ' ' && c.i === pos ? '␣' : c.ch }}</span>
          </span>
        </p>
        <div v-if="!focused" class="absolute inset-0 rounded-2xl bg-white/80 dark:bg-gray-900/80 flex items-center justify-center pointer-events-none">
          <p class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow">{{ pos === 0 ? 'Click here and start typing' : 'Paused - click here to carry on' }}</p>
        </div>
      </div>

      <!-- what to press -->
      <div class="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span v-if="target" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl" :style="{ background: FINGER_COLOR[target.key.finger] }">
          <span class="text-gray-600">Next:</span>
          <b class="text-gray-900">{{ target.shift ? 'Shift + ' : '' }}{{ target.key.id === 'space' ? 'Space' : target.key.label }}</b>
          <span class="text-gray-600">with your</span>
          <b :style="{ color: FINGER_DARK[target.key.finger] }">{{ FINGER_NAME[target.key.finger] }}</b>
          <span v-if="shiftKeyId" class="text-gray-600">- hold Shift with your {{ shiftKeyId === 'rshift' ? 'right' : 'left' }} little finger</span>
        </span>
        <span v-if="wrongFlash" class="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-800 font-semibold">Not that one - try again</span>
        <span class="ml-auto text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">{{ lesson.tip }}</span>
        <button type="button" class="btn-secondary !py-1.5 !text-sm" @click.stop="startLesson(lesson)">Start again</button>
      </div>

      <!-- the keyboard, tilted like one on a desk, and the hands -->
      <div class="mt-4 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-3 sm:p-5 overflow-hidden">
        <div class="kb mx-auto max-w-3xl rounded-2xl bg-slate-700 p-2 sm:p-3 shadow-[0_18px_30px_-12px_rgba(0,0,0,0.45)]">
          <div v-for="(row, ri) in ROWS" :key="ri" class="flex gap-1 sm:gap-1.5 mb-1 sm:mb-1.5 last:mb-0" :class="ri === 4 ? 'justify-center' : ''">
            <div
              v-for="key in row"
              :key="key.id"
              class="key relative h-8 sm:h-11 rounded-md sm:rounded-lg flex items-center justify-center text-[10px] sm:text-sm font-semibold text-gray-800 select-none"
              :class="[keyState(key), key.id === 'space' ? 'max-w-[60%]' : '']"
              :style="keyStyle(key)"
            >
              <span class="truncate px-0.5">{{ key.label }}</span>
              <span v-if="key.id === 'f' || key.id === 'j'" class="absolute bottom-1 sm:bottom-1.5 left-1/2 -translate-x-1/2 w-2 sm:w-3 h-0.5 rounded bg-gray-600"></span>
            </div>
          </div>
        </div>

        <svg viewBox="0 0 440 150" class="mx-auto mt-3 w-full max-w-xl" aria-hidden="true">
          <g v-for="h in HANDS" :key="h.side">
            <rect :x="h.palm[0]" :y="h.palm[1]" width="170" height="64" rx="28" fill="#f3d6bf" stroke="#c9a385" stroke-width="2" />
            <g v-for="f in h.fingers" :key="f.id">
              <rect
                :x="f.x"
                :y="f.y"
                width="30"
                :height="f.h"
                rx="15"
                :transform="f.rot ? `rotate(${f.rot} ${f.x + 15} ${f.y + f.h})` : undefined"
                :fill="activeFingers.includes(f.id) ? FINGER_DARK[f.id] : '#f3d6bf'"
                :stroke="activeFingers.includes(f.id) ? FINGER_DARK[f.id] : '#c9a385'"
                stroke-width="2"
                :class="activeFingers.includes(f.id) ? 'finger-on' : ''"
              />
            </g>
          </g>
          <text x="105" y="146" text-anchor="middle" font-size="12" fill="#64748b">left hand</text>
          <text x="335" y="146" text-anchor="middle" font-size="12" fill="#64748b">right hand</text>
        </svg>
      </div>
    </template>

    <!-- ===================== The result ===================== -->
    <div v-else-if="view === 'result' && lesson && result" class="max-w-xl mx-auto">
      <div class="rounded-2xl border p-6 text-center" :class="result.acc >= TYPING_PASS ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-700' : 'border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700'">
        <p class="text-3xl text-amber-500 tracking-wider">{{ '★'.repeat(result.stars) }}<span class="text-gray-300 dark:text-gray-600">{{ '★'.repeat(3 - result.stars) }}</span></p>
        <div class="mt-3 grid grid-cols-3 gap-2">
          <div class="rounded-xl bg-white dark:bg-gray-800 py-3">
            <p class="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">{{ result.wpm }}</p>
            <p class="text-[11px] text-gray-500">words a minute</p>
          </div>
          <div class="rounded-xl bg-white dark:bg-gray-800 py-3">
            <p class="text-2xl font-bold tabular-nums" :class="result.acc >= TYPING_PASS ? 'text-emerald-600' : 'text-rose-600'">{{ result.acc }}%</p>
            <p class="text-[11px] text-gray-500">accuracy</p>
          </div>
          <div class="rounded-xl bg-white dark:bg-gray-800 py-3">
            <p class="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">{{ result.time }}</p>
            <p class="text-[11px] text-gray-500">time</p>
          </div>
        </div>
        <p class="mt-4 text-base font-semibold" :class="result.acc >= TYPING_PASS ? 'text-indigo-800 dark:text-indigo-200' : 'text-amber-800 dark:text-amber-200'">{{ result.message }}</p>
        <div v-if="result.trouble.length" class="mt-3 text-sm text-gray-700 dark:text-gray-200">
          Keys to practise:
          <span v-for="t in result.trouble" :key="t" class="inline-flex mx-0.5 min-w-[1.75rem] h-7 px-1.5 rounded-md border border-gray-300 bg-white dark:bg-gray-700 font-semibold items-center justify-center shadow-[0_2px_0_rgba(0,0,0,0.12)]">{{ t === ' ' ? 'Space' : t }}</span>
        </div>
        <p v-if="role !== 'student'" class="mt-2 text-xs text-gray-500">Practice - results are only saved for students.</p>
        <div class="mt-5 flex flex-wrap justify-center gap-2">
          <button type="button" class="btn-secondary" @click="backToLessons">All lessons</button>
          <button type="button" class="btn-secondary" @click="startLesson(lesson)">Try again</button>
          <button v-if="nextLesson && !locked(nextLesson)" type="button" class="btn-primary" @click="startLesson(nextLesson)">Next lesson</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { labRoleOf, type IctProgress } from '@/components/ictlab/types'
import {
  ROWS, TYPING_LESSONS, TYPING_PASS, FINGER_COLOR, FINGER_DARK, FINGER_NAME,
  keyFor, shiftFor, practiceText, type Finger, type Key, type TypingLesson
} from '@/components/ictlab/typing'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))

// ------------------------------------------------------------ progress
const progress = ref<IctProgress[]>([])
async function loadProgress() {
  if (role.value !== 'student') return
  try {
    const res = await axios.get('/api/student/ict-lab')
    progress.value = res.data.data.progress || []
  } catch {
    // lessons still work; they just are not unlocked from saved results
  }
}
onMounted(loadProgress)
const best = (l: TypingLesson) => {
  const p = progress.value.find(x => x.activity_key === `typing-${l.id}`)
  return p ? { acc: p.best, wpm: p.best_wpm ?? 0 } : null
}
const starsFor = (acc: number, wpm: number, target: number) => (acc < TYPING_PASS ? 0 : 1 + (wpm >= target ? 1 : 0) + (acc >= 97 && wpm >= target ? 1 : 0))
const stars = (l: TypingLesson) => {
  const b = best(l)
  return b ? starsFor(b.acc, b.wpm, l.target) : 0
}
// A student opens each lesson by passing the one before; everyone else can try any
const locked = (l: TypingLesson) => {
  if (role.value !== 'student') return false
  const i = TYPING_LESSONS.indexOf(l)
  return i > 0 && (best(TYPING_LESSONS[i - 1])?.acc ?? 0) < TYPING_PASS
}
const bestWpm = computed(() => Math.max(0, ...progress.value.filter(p => p.activity_key.startsWith('typing-')).map(p => p.best_wpm ?? 0)))
const sections = computed(() => {
  const out: { name: string; lessons: TypingLesson[] }[] = []
  for (const l of TYPING_LESSONS) {
    const s = out.find(x => x.name === l.section)
    if (s) s.lessons.push(l)
    else out.push({ name: l.section, lessons: [l] })
  }
  return out
})
const chips = (l: TypingLesson) => (l.newKeys.length > 3 && !/^[a-z;,.]+$/.test(l.newKeys) ? [l.newKeys] : [...l.newKeys].map(c => c.toUpperCase()))

// ------------------------------------------------------------ typing
const view = ref<'lessons' | 'type' | 'result'>('lessons')
// shallowRef keeps the lesson the plain object from TYPING_LESSONS, so it can be found in the list
const lesson = shallowRef<TypingLesson | null>(null)
const lessonIndex = computed(() => Math.max(0, TYPING_LESSONS.findIndex(x => x.id === lesson.value?.id)))
const nextLesson = computed(() => TYPING_LESSONS[lessonIndex.value + 1] || null)
const text = ref('')
const pos = ref(0)
const errors = ref(0)
const errorAt = ref(new Set<number>())
const missedKeys = new Map<string, number>()
const startedAt = ref(0)
const now = ref(Date.now())
const focused = ref(false)
const wrongFlash = ref(false)
const input = ref<HTMLTextAreaElement | null>(null)
const textBox = ref<HTMLElement | null>(null)
const flash = ref<{ id: string; ok: boolean } | null>(null)
let flashTimer = 0
let ticker = 0
const TIMED_SECONDS = 60

const words = computed(() => {
  // characters grouped into words (each with the space after it), so lines break between words
  const out: { ch: string; i: number }[][] = []
  let cur: { ch: string; i: number }[] = []
  ;[...text.value].forEach((ch, i) => {
    cur.push({ ch, i })
    if (ch === ' ') {
      out.push(cur)
      cur = []
    }
  })
  if (cur.length) out.push(cur)
  return out
})

const target = computed(() => (view.value === 'type' ? keyFor(text.value[pos.value] ?? '') : null))
const shiftKeyId = computed(() => (target.value?.shift ? shiftFor(target.value.key) : null))
// The fingers to light: the one for the key, and the other hand's little finger holding Shift
const activeFingers = computed<Finger[]>(() => {
  if (!target.value) return []
  const out: Finger[] = [target.value.key.finger]
  if (shiftKeyId.value) out.push(shiftKeyId.value === 'rshift' ? 'rp' : 'lp')
  return out
})

const elapsed = computed(() => (startedAt.value ? Math.max(0.001, (now.value - startedAt.value) / 1000) : 0))
const wpm = computed(() => (elapsed.value > 1 ? Math.round(pos.value / 5 / (elapsed.value / 60)) : 0))
const accuracy = computed(() => (pos.value + errors.value ? Math.round((100 * pos.value) / (pos.value + errors.value)) : 100))
const timed = computed(() => lesson.value?.kind === 'timed')
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
const liveStats = computed(() => [
  { label: 'Speed', value: `${wpm.value} wpm` },
  { label: 'Accuracy', value: `${accuracy.value}%` },
  { label: timed.value ? 'Time left' : 'Time', value: timed.value ? fmt(Math.max(0, TIMED_SECONDS - elapsed.value)) : fmt(elapsed.value) },
  { label: 'Done', value: timed.value ? `${pos.value} keys` : `${Math.round((100 * pos.value) / Math.max(1, text.value.length))}%` }
])

function startLesson(l: TypingLesson) {
  lesson.value = l
  text.value = practiceText(l)
  pos.value = 0
  errors.value = 0
  errorAt.value = new Set()
  missedKeys.clear()
  startedAt.value = 0
  result.value = null
  view.value = 'type'
  clearInterval(ticker)
  ticker = window.setInterval(() => {
    now.value = Date.now()
    if (timed.value && startedAt.value && elapsed.value >= TIMED_SECONDS) finish()
  }, 250)
  nextTick(focusInput)
}
function backToLessons() {
  clearInterval(ticker)
  view.value = 'lessons'
}
function focusInput() {
  input.value?.focus({ preventScroll: true })
}

function press(ch: string) {
  if (view.value !== 'type' || pos.value >= text.value.length) return
  if (!startedAt.value) startedAt.value = Date.now()
  const want = text.value[pos.value]
  const typedKey = keyFor(ch)?.key.id ?? (ch === ' ' ? 'space' : '')
  if (ch === want) {
    pos.value++
    wrongFlash.value = false
    showFlash(typedKey, true)
    keepInView()
    if (pos.value >= text.value.length) finish()
  } else {
    // a wrong key does not move on: count it once per character, then wait for the right one
    errors.value++
    errorAt.value = new Set(errorAt.value).add(pos.value)
    missedKeys.set(want, (missedKeys.get(want) || 0) + 1)
    wrongFlash.value = true
    showFlash(typedKey, false)
  }
}
function showFlash(id: string, ok: boolean) {
  flash.value = { id, ok }
  clearTimeout(flashTimer)
  flashTimer = window.setTimeout(() => (flash.value = null), 160)
}
function onInput(e: Event) {
  const el = e.target as HTMLTextAreaElement
  for (const ch of el.value) press(ch === '\n' ? '' : ch)
  el.value = ''
}
function onKeydown(e: KeyboardEvent) {
  // Tab and Enter would leave the box or add a line; Backspace is not needed (mistakes do not move on)
  if (e.key === 'Tab' || e.key === 'Enter' || e.key === 'Backspace') e.preventDefault()
}
// Scroll the text so the line being typed stays in view
function keepInView() {
  const box = textBox.value
  const el = box?.querySelector<HTMLElement>(`[data-i="${pos.value}"]`)
  if (!box || !el) return
  const line = parseFloat(getComputedStyle(box).lineHeight) || 40
  const top = el.offsetTop
  if (top - box.scrollTop > line * 1.5) box.scrollTop = top - line
}

function charClass(i: number) {
  if (i < pos.value) return errorAt.value.has(i) ? 'text-rose-500' : 'text-gray-900 dark:text-white'
  if (i === pos.value) return wrongFlash.value ? 'bg-rose-200 text-rose-900 rounded' : 'bg-indigo-200 text-indigo-950 rounded border-b-[3px] border-indigo-600'
  return ''
}

// ------------------------------------------------------------ keyboard drawing
function keyStyle(key: Key) {
  const w = key.w ?? 1
  return { flex: `${w} 1 0`, background: FINGER_COLOR[key.finger] }
}
function keyState(key: Key) {
  const cls: string[] = []
  if (flash.value?.id === key.id) cls.push(flash.value.ok ? 'key-ok' : 'key-bad')
  else if (target.value?.key.id === key.id || shiftKeyId.value === key.id) cls.push('key-target')
  return cls
}
const HANDS: { side: 'l' | 'r'; palm: [number, number]; fingers: { id: Finger; x: number; y: number; h: number; rot?: number }[] }[] = [
  { side: 'l', palm: [20, 70], fingers: [
    { id: 'lp', x: 22, y: 30, h: 52 }, { id: 'lr', x: 58, y: 14, h: 66 }, { id: 'lm', x: 94, y: 6, h: 74 }, { id: 'li', x: 130, y: 16, h: 64 }, { id: 'th', x: 172, y: 78, h: 46, rot: 38 }
  ] },
  { side: 'r', palm: [250, 70], fingers: [
    { id: 'th', x: 238, y: 78, h: 46, rot: -38 }, { id: 'ri', x: 280, y: 16, h: 64 }, { id: 'rm', x: 316, y: 6, h: 74 }, { id: 'rr', x: 352, y: 14, h: 66 }, { id: 'rp', x: 388, y: 30, h: 52 }
  ] }
]

// ------------------------------------------------------------ result
const result = ref<{ wpm: number; acc: number; time: string; stars: number; message: string; trouble: string[] } | null>(null)
async function finish() {
  if (view.value !== 'type' || !lesson.value) return
  clearInterval(ticker)
  now.value = Date.now()
  const l = lesson.value
  const seconds = timed.value ? Math.min(TIMED_SECONDS, elapsed.value) : elapsed.value
  const w = seconds > 1 ? Math.round(pos.value / 5 / (seconds / 60)) : 0
  const acc = accuracy.value
  const s = starsFor(acc, w, l.target)
  const trouble = [...missedKeys.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([c]) => c)
  result.value = {
    wpm: w,
    acc,
    time: fmt(seconds),
    stars: s,
    trouble,
    message: acc < TYPING_PASS
      ? `Aim for ${TYPING_PASS}% accuracy - slow down a little and watch the screen.`
      : w < l.target
        ? `Well done! Now aim for ${l.target} words a minute for another star.`
        : s === 3 ? 'Excellent - fast and accurate!' : 'Great typing! Get 97% accuracy for the third star.'
  }
  view.value = 'result'
  if (role.value !== 'student' || pos.value === 0) return
  try {
    await axios.post('/api/student/ict-lab/attempts', {
      activity_key: `typing-${l.id}`,
      level: 'simple',
      steps_total: pos.value,
      mistakes: errors.value,
      hints_used: 0,
      duration_seconds: Math.max(1, Math.round(seconds))
    })
    await loadProgress()
  } catch {
    // the result still shows; it just is not kept
  }
}

// leaving the page mid-lesson stops the clock
watch(() => route.fullPath, () => clearInterval(ticker))
onBeforeUnmount(() => {
  clearInterval(ticker)
  clearTimeout(flashTimer)
})
</script>

<style scoped>
.kb {
  transform: perspective(1100px) rotateX(16deg);
  transform-origin: 50% 100%;
}
.key {
  box-shadow: 0 3px 0 rgba(15, 23, 42, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition: transform 0.08s ease, box-shadow 0.08s ease, background-color 0.15s ease;
}
.key-target {
  outline: 3px solid #15874a;
  outline-offset: 1px;
  animation: key-glow 1s ease-in-out infinite;
}
.key-ok {
  background: #86efac !important;
  transform: translateY(3px);
  box-shadow: 0 0 0 rgba(15, 23, 42, 0.55);
}
.key-bad {
  background: #fda4af !important;
  transform: translateY(3px);
  box-shadow: 0 0 0 rgba(15, 23, 42, 0.55);
}
@keyframes key-glow {
  0%, 100% { box-shadow: 0 3px 0 rgba(15, 23, 42, 0.55), 0 0 0 0 rgba(21, 135, 74, 0.55); }
  50% { box-shadow: 0 3px 0 rgba(15, 23, 42, 0.55), 0 0 0 6px rgba(21, 135, 74, 0); }
}
.finger-on {
  filter: drop-shadow(0 0 6px rgba(21, 135, 74, 0.55));
}
</style>
