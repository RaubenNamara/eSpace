<template>
  <!-- Try a lesson: a short sample eNote a visitor can read like a student - turn pages, listen to
       the narration, highlight - ending with a two-question check that marks itself and fills in
       the outcomes, the way an LOA updates the Learning Map. Sample content, nothing is saved
       except the page you were on (this browser only). -->
  <div class="grid lg:grid-cols-[1fr_17rem] gap-5">
    <!-- The page -->
    <div class="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-900/5 overflow-hidden flex flex-col min-h-[30rem]">
      <div class="flex items-center justify-between gap-3 px-5 sm:px-7 pt-5">
        <p class="text-[11px] font-bold uppercase tracking-widest text-slate-400 truncate">Physics · S.1 · Measurements</p>
        <span class="text-xs text-slate-400 flex-shrink-0">{{ isQuiz ? 'Check yourself' : `Page ${page + 1} of ${PAGES.length}` }}</span>
      </div>

      <Transition :name="dir > 0 ? 'turn-next' : 'turn-prev'" mode="out-in">
        <!-- Reading pages -->
        <div v-if="!isQuiz" :key="page" class="flex-1 px-5 sm:px-7 py-4">
          <h3 class="font-jakarta text-2xl font-extrabold tracking-tight">{{ PAGES[page].title }}</h3>
          <p v-for="(para, i) in PAGES[page].body" :key="i" class="mt-3 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
            <template v-for="(bit, j) in para" :key="j">
              <mark v-if="typeof bit !== 'string'" class="rounded px-0.5 transition-colors" :class="highlights ? 'bg-amber-200/80 text-slate-900 dark:bg-amber-400/30 dark:text-amber-50' : 'bg-transparent text-inherit'">{{ bit.key }}</mark>
              <template v-else>{{ bit }}</template>
            </template>
          </p>
          <div v-if="PAGES[page].tools" class="mt-5 grid grid-cols-3 gap-2">
            <div v-for="t in PAGES[page].tools" :key="t.name" class="rounded-xl bg-slate-50 dark:bg-white/5 p-3">
              <p class="text-sm font-semibold">{{ t.name }}</p>
              <p class="text-xs text-slate-500">{{ t.note }}</p>
            </div>
          </div>
        </div>

        <!-- The check at the end -->
        <div v-else key="quiz" class="flex-1 px-5 sm:px-7 py-4">
          <h3 class="font-jakarta text-2xl font-extrabold tracking-tight">Quick check</h3>
          <p class="mt-1 text-sm text-slate-500">Two questions on this topic. Each one is linked to a learning outcome.</p>

          <div class="mt-5">
            <p class="font-semibold">1. Which instrument would you use to measure the diameter of a pencil?</p>
            <div class="mt-3 grid sm:grid-cols-2 gap-2">
              <button
                v-for="o in Q1_OPTIONS"
                :key="o"
                type="button"
                :disabled="marked"
                class="text-left px-3.5 py-2.5 rounded-xl border text-sm font-medium transition"
                :class="optionClass(o)"
                :aria-pressed="q1 === o"
                @click="q1 = o"
              >{{ o }}</button>
            </div>
          </div>

          <div class="mt-6">
            <label for="q2" class="font-semibold">2. A vernier caliper shows 2.4 cm on the main scale and the 6th vernier mark lines up. What is the reading?</label>
            <div class="mt-3 flex items-center gap-2">
              <input id="q2" v-model="q2" :disabled="marked" type="text" inputmode="decimal" placeholder="e.g. 3.15" class="w-36 px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500" :class="marked ? (q2Right ? 'border-emerald-400' : 'border-rose-400') : 'border-slate-300 dark:border-white/15'" @keydown.enter="mark">
              <span class="text-sm text-slate-500">cm</span>
            </div>
            <p v-if="marked && !q2Right" class="mt-2 text-sm text-rose-600 dark:text-rose-300">Main scale + vernier: 2.4 + 6 × 0.01 = <b>2.46 cm</b></p>
          </div>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <button v-if="!marked" type="button" :disabled="!q1 || !q2.trim()" class="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition" @click="mark">Hand in</button>
            <template v-else>
              <p class="font-jakarta text-lg font-extrabold">{{ score }} / 2</p>
              <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 dark:border-white/10" @click="retry">Try again</button>
            </template>
          </div>
        </div>
      </Transition>

      <!-- Page controls -->
      <div class="mt-auto px-5 sm:px-7 pb-5 pt-2 flex items-center gap-3">
        <button type="button" :disabled="page === 0" class="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-40" aria-label="Previous page" @click="go(-1)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <span class="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden"><span class="block h-full rounded-full bg-indigo-600 transition-all duration-500" :style="{ width: `${((page + 1) / (PAGES.length + 1)) * 100}%` }"></span></span>
        <button v-if="!isQuiz" type="button" class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700" @click="go(1)">
          {{ page === PAGES.length - 1 ? 'Check yourself' : 'Next page' }}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    </div>

    <!-- Tools beside the page, as in the real reader -->
    <div class="flex flex-col gap-3">
      <div v-if="canSpeak" class="rounded-2xl bg-slate-900 text-white p-4 dark:bg-white/5 dark:border dark:border-white/10">
        <p class="text-[11px] font-bold uppercase tracking-widest text-slate-400">Narration</p>
        <div class="mt-3 flex items-center gap-3">
          <button type="button" class="w-10 h-10 flex-shrink-0 rounded-full bg-white text-slate-900 flex items-center justify-center" :aria-label="speaking ? 'Stop narration' : 'Listen to this page'" :disabled="isQuiz" @click="toggleSpeak">
            <svg v-if="speaking" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
            <svg v-else class="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </button>
          <span class="flex-1 flex items-end gap-[3px] h-7">
            <span v-for="(b, i) in WAVE" :key="i" class="flex-1 rounded-full" :class="[speaking ? 'bg-indigo-400 wave' : 'bg-white/25']" :style="{ height: `${b}%`, animationDelay: `${i * 60}ms` }"></span>
          </span>
        </div>
        <p class="mt-2 text-xs text-slate-400">{{ isQuiz ? 'Narration is for the reading pages.' : speaking ? 'Reading this page aloud…' : 'Tap play to hear this page.' }}</p>
      </div>

      <button type="button" class="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4 text-left" :aria-pressed="highlights" @click="highlights = !highlights">
        <span>
          <span class="block text-sm font-semibold">Key words</span>
          <span class="block text-xs text-slate-500">Highlight the words to remember</span>
        </span>
        <span class="relative w-10 h-6 rounded-full transition flex-shrink-0" :class="highlights ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-white/15'">
          <span class="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all" :class="highlights ? 'left-5' : 'left-1'"></span>
        </span>
      </button>

      <!-- Outcomes this lesson covers - filled in by the check -->
      <div class="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4">
        <p class="text-[11px] font-bold uppercase tracking-widest text-slate-400">Your Learning Map</p>
        <ul class="mt-3 space-y-2.5">
          <li v-for="o in outcomes" :key="o.label" class="flex items-center gap-2.5 text-sm">
            <span class="w-3 h-3 rounded-full flex-shrink-0 transition-colors duration-500" :class="o.tone"></span>
            <span class="flex-1">{{ o.label }}</span>
          </li>
        </ul>
        <p class="mt-3 text-xs text-slate-500">{{ marked ? (score === 2 ? 'Both outcomes achieved - nice work.' : 'Red means "not yet" - your teacher sees it too.') : 'Hand in the quick check to fill these in.' }}</p>
      </div>

      <p v-if="resumed" class="text-xs text-slate-500 px-1">Picked up on the page you stopped at last time.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type Bit = string | { key: string }
const k = (key: string) => ({ key })

// Sample lesson (S.1 Physics)
const PAGES: { title: string; body: Bit[][]; tools?: { name: string; note: string }[] }[] = [
  {
    title: 'What is measurement?',
    body: [
      ['To ', k('measure'), ' is to compare a quantity with a standard amount, called a ', k('unit'), '.'],
      ['Scientists everywhere use the same units - the ', k('SI units'), ' - so that a result in Kampala means the same thing in Nairobi or London.']
    ]
  },
  {
    title: 'Measuring length',
    body: [
      ['The SI unit of length is the ', k('metre (m)'), '. Which instrument you use depends on how small the length is - and how exact you need to be.']
    ],
    tools: [
      { name: 'Metre rule', note: 'to 0.1 cm' },
      { name: 'Vernier caliper', note: 'to 0.01 cm' },
      { name: 'Micrometer', note: 'to 0.001 cm' }
    ]
  },
  {
    title: 'Reading a vernier caliper',
    body: [
      ['First read the ', k('main scale'), ' just before the zero of the vernier scale. Then find the vernier mark that lines up exactly with a main-scale mark.'],
      ['Reading = main scale + (vernier mark × ', k('0.01 cm'), '). Keep your eye directly above the mark to avoid ', k('parallax error'), '.']
    ]
  }
]
const Q1_OPTIONS = ['Metre rule', 'Vernier caliper', 'Measuring cylinder', 'Beam balance']
const WAVE = [35, 70, 50, 90, 60, 80, 40, 75, 55, 85, 45, 65, 30, 70]

// Pages: 0..PAGES.length-1 are reading, PAGES.length is the check
const page = ref(0)
const dir = ref(1)
const isQuiz = computed(() => page.value === PAGES.length)
const go = (d: number) => {
  const to = Math.min(PAGES.length, Math.max(0, page.value + d))
  if (to === page.value) return
  dir.value = d
  page.value = to
}

// "Continue where you stopped" - remembered in this browser only
const STORE = 'espace-site-sample-page'
const resumed = ref(false)
onMounted(() => {
  try {
    const saved = Number(localStorage.getItem(STORE))
    if (saved > 0 && saved <= PAGES.length) { page.value = saved; resumed.value = true }
  } catch { /* storage blocked - start at the beginning */ }
})
watch(page, p => {
  try { localStorage.setItem(STORE, String(p)) } catch { /* ignore */ }
})

const highlights = ref(true)

// Narration with the browser's own voice
const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window
const speaking = ref(false)
const pageText = () => {
  const p = PAGES[page.value]
  const words = p.body.map(para => para.map(b => (typeof b === 'string' ? b : b.key)).join('')).join(' ')
  const tools = p.tools ? ' ' + p.tools.map(t => `${t.name}, ${t.note}.`).join(' ') : ''
  return `${p.title}. ${words}${tools}`
}
const stopSpeak = () => { if (canSpeak) window.speechSynthesis.cancel(); speaking.value = false }
const toggleSpeak = () => {
  if (!canSpeak || isQuiz.value) return
  if (speaking.value) { stopSpeak(); return }
  const u = new SpeechSynthesisUtterance(pageText())
  u.lang = 'en-GB'
  u.rate = 0.95
  u.onend = () => { speaking.value = false }
  u.onerror = () => { speaking.value = false }
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
  speaking.value = true
}
watch(page, stopSpeak)
onBeforeUnmount(stopSpeak)

// The check
const q1 = ref('')
const q2 = ref('')
const marked = ref(false)
const q1Right = computed(() => q1.value === 'Vernier caliper')
const q2Right = computed(() => Math.abs(parseFloat(q2.value.replace(',', '.')) - 2.46) < 0.001)
const score = computed(() => Number(q1Right.value) + Number(q2Right.value))
const mark = () => { if (q1.value && q2.value.trim()) marked.value = true }
const retry = () => { marked.value = false; q1.value = ''; q2.value = '' }

const optionClass = (o: string) => {
  if (!marked.value) return q1.value === o ? 'border-indigo-500 bg-indigo-50 text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-100' : 'border-slate-200 hover:border-slate-300 dark:border-white/10'
  if (o === 'Vernier caliper') return 'border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-100'
  if (o === q1.value) return 'border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-500/15 dark:text-rose-100'
  return 'border-slate-200 opacity-60 dark:border-white/10'
}

const GREY = 'bg-slate-200 dark:bg-white/15'
const outcomes = computed(() => [
  { label: 'Chooses the right instrument for a length', tone: !marked.value ? GREY : q1Right.value ? 'bg-emerald-500' : 'bg-rose-500' },
  { label: 'Reads a vernier caliper accurately', tone: !marked.value ? GREY : q2Right.value ? 'bg-emerald-500' : 'bg-rose-500' }
])
</script>

<style scoped>
.turn-next-enter-active, .turn-next-leave-active, .turn-prev-enter-active, .turn-prev-leave-active { transition: opacity 0.22s ease, transform 0.22s ease; }
.turn-next-enter-from, .turn-prev-leave-to { opacity: 0; transform: translateX(24px); }
.turn-next-leave-to, .turn-prev-enter-from { opacity: 0; transform: translateX(-24px); }
.wave { animation: wave 0.9s ease-in-out infinite alternate; transform-origin: bottom; }
@keyframes wave { from { transform: scaleY(0.4); } to { transform: scaleY(1); } }
@media (prefers-reduced-motion: reduce) { .wave { animation: none; } }
</style>
