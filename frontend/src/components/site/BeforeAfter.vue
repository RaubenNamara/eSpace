<template>
  <!-- The same school week on paper and on Tusome: drag the handle (or use the arrow keys) to wipe
       from one to the other. Both scenes are drawn at a fixed 60 x 34rem and scaled to the width. -->
  <div ref="box" class="relative select-none touch-none rounded-3xl overflow-hidden ring-1 ring-slate-200 dark:ring-white/10 shadow-2xl shadow-slate-900/10 cursor-ew-resize" :style="{ height: `${H * rem * scale}px` }" @pointerdown="startDrag">
    <div class="absolute left-0 top-0 origin-top-left" :style="{ width: `${W}rem`, height: `${H}rem`, transform: `scale(${scale})` }">
      <!-- ================= on paper ================= -->
      <div class="absolute inset-0 bg-[#f1e7d3] font-sans text-slate-800" aria-hidden="true">
        <div class="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(90deg,rgba(120,80,30,0.06)_0_2px,transparent_2px_14px)]"></div>
        <!-- the pile of scripts -->
        <div class="absolute left-[3rem] top-[4.5rem] w-[15rem] h-[19rem]">
          <div v-for="i in 4" :key="i" class="absolute inset-0 rounded-md bg-white shadow-md" :style="{ transform: `rotate(${(i - 2.5) * 3}deg) translate(${i * 2}px, ${i * 3}px)` }"></div>
          <div class="absolute inset-0 rounded-md bg-white shadow-lg p-4 rotate-[-2deg] font-[cursive] text-[0.8125rem] leading-6">
            <p class="font-sans text-[0.625rem] font-bold uppercase tracking-wider text-slate-400">Measurements test · S.1 A</p>
            <p class="mt-2">1. 2.4 + 0.06 = 2.46 cm</p>
            <p>2. metre rule</p>
            <p>3. ........................</p>
            <p>4. 0.01 mm ?</p>
            <span class="absolute right-4 bottom-12 text-rose-600 text-[1.375rem] font-bold rotate-[-8deg]">?/10</span>
          </div>
          <span class="absolute -top-3 -right-4 rounded-full bg-rose-600 text-white px-3 py-1 text-[0.75rem] font-bold shadow">38 scripts to mark</span>
        </div>
        <!-- the marks spreadsheet -->
        <div class="absolute left-[21rem] top-[3rem] w-[19rem] rounded-md bg-white shadow-lg overflow-hidden">
          <p class="bg-[#1d6f42] text-white px-3 py-1.5 text-[0.6875rem] font-semibold">Marks S.1 A - FINAL (2).xlsx</p>
          <div class="grid grid-cols-6 text-[0.625rem]">
            <span v-for="(c, i) in SHEET" :key="i" class="border-r border-b border-slate-200 px-1.5 py-1 truncate" :class="[i < 6 ? 'bg-slate-100 font-semibold' : '', c === '#REF!' || c === '?' ? 'bg-rose-50 text-rose-600 font-bold' : '']">{{ c }}</span>
          </div>
        </div>
        <!-- the report card, typed by hand -->
        <div class="absolute left-[42.5rem] top-[4.5rem] w-[15rem] h-[19rem] rounded-md bg-white shadow-lg p-4 rotate-[3deg]">
          <p class="text-center text-[0.8125rem] font-extrabold tracking-wide">REPORT CARD</p>
          <p class="text-center text-[0.5625rem] text-slate-400">Term 3 · S.1 A</p>
          <div class="mt-3 space-y-2">
            <div v-for="i in 7" :key="i" class="flex items-center gap-2"><span class="h-1.5 flex-1 rounded bg-slate-200"></span><span class="w-6 h-1.5 rounded bg-slate-300"></span></div>
          </div>
          <p class="mt-4 text-[0.625rem] text-slate-500 italic">Class teacher's comment: .........................</p>
          <span class="absolute right-3 bottom-3 rounded border-2 border-rose-500 text-rose-500 px-2 py-0.5 text-[0.625rem] font-extrabold rotate-[-10deg]">1 of 79</span>
        </div>
        <!-- the sticky notes -->
        <p class="absolute left-[20rem] top-[21rem] w-[10rem] h-[8.5rem] bg-yellow-200 shadow-md p-3 rotate-[-5deg] font-[cursive] text-[0.9375rem] leading-snug">Who hasn't handed in??</p>
        <p class="absolute left-[31rem] top-[23rem] w-[10rem] h-[8.5rem] bg-pink-200 shadow-md p-3 rotate-[4deg] font-[cursive] text-[0.9375rem] leading-snug">Which topics are we behind on?</p>
        <div class="absolute left-[44rem] top-[25.5rem] w-[13rem] rounded-lg bg-white shadow-md p-3">
          <p class="text-[0.5625rem] font-bold uppercase tracking-wider text-rose-600">End of term</p>
          <p class="mt-1 text-[0.9375rem] font-extrabold leading-tight">3 weeks of typing report cards</p>
        </div>
        <svg class="absolute left-[5rem] top-[26rem] w-[12rem]" viewBox="0 0 200 30"><rect x="10" y="10" width="160" height="10" rx="5" fill="#b91c1c" /><path d="M170 10 l22 5 l-22 5 Z" fill="#7f1d1d" /><rect x="10" y="10" width="30" height="10" rx="5" fill="#111827" /></svg>
      </div>

      <!-- ================= with Tusome ================= -->
      <div class="absolute inset-0 bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white" :style="{ clipPath: `inset(0 0 0 ${pos}%)` }" aria-hidden="true">
        <div class="absolute inset-x-0 top-0 h-[3rem] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 flex items-center gap-4 px-[3rem]">
          <Wordmark size="sm" />
          <span class="text-[0.75rem] font-semibold text-slate-500">S.1 A · Term 3</span>
        </div>
        <!-- marking: done -->
        <div class="absolute left-[3rem] top-[4.5rem] w-[15rem] h-[19rem] rounded-2xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-white/10 p-4 flex flex-col">
          <p class="text-[0.625rem] font-bold uppercase tracking-wider text-slate-400">To mark</p>
          <p class="mt-1 text-[2.5rem] font-extrabold leading-none text-indigo-600">0</p>
          <p class="text-[0.75rem] text-slate-500">All 38 marked on screen</p>
          <div class="mt-4 space-y-2">
            <div v-for="n in ['Ashley N.', 'Brian K.', 'Faith M.', 'Daniel O.']" :key="n" class="flex items-center justify-between text-[0.75rem]">
              <span>{{ n }}</span><span class="rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200 px-2 py-0.5 text-[0.625rem] font-bold">Returned</span>
            </div>
          </div>
          <p class="mt-auto inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-indigo-700 dark:text-indigo-300">✓ Feedback sent to every learner</p>
        </div>
        <!-- the class Learning Map, filled in -->
        <div class="absolute left-[21rem] top-[4.5rem] w-[19rem] rounded-2xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-white/10 p-4">
          <p class="text-[0.625rem] font-bold uppercase tracking-wider text-slate-400">Class Learning Map</p>
          <div class="mt-3 grid grid-cols-8 gap-1">
            <span v-for="i in 48" :key="i" class="h-4 rounded" :class="MAP[(i * 7) % MAP.length]"></span>
          </div>
          <p class="mt-3 text-[0.75rem] text-slate-500">Reteach next: <b class="text-rose-600">LO3 · units of length</b></p>
        </div>
        <!-- report cards: made -->
        <div class="absolute left-[42.5rem] top-[4.5rem] w-[15rem] h-[19rem] rounded-2xl bg-indigo-600 text-white p-4 flex flex-col">
          <p class="text-[0.625rem] font-bold uppercase tracking-wider text-indigo-100">Report cards</p>
          <p class="mt-1 text-[2.5rem] font-extrabold leading-none">79<span class="text-[1.125rem] text-indigo-200"> / 79</span></p>
          <p class="text-[0.75rem] text-indigo-100">Made in one go, from the marks</p>
          <div class="mt-4 space-y-1.5">
            <span v-for="i in 4" :key="i" class="block h-2 rounded-full bg-white/20"><span class="block h-2 rounded-full bg-white" :style="{ width: `${100 - i * 8}%` }"></span></span>
          </div>
          <span class="mt-auto rounded-xl bg-white text-indigo-700 text-center py-2 text-[0.75rem] font-bold">Download class PDF</span>
        </div>
        <!-- who hasn't handed in: known, and messaged -->
        <div class="absolute left-[20rem] top-[21rem] w-[10.5rem] rounded-2xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-white/10 p-3">
          <p class="text-[0.625rem] font-bold uppercase tracking-wider text-slate-400">Not handed in</p>
          <p class="mt-1 font-extrabold text-[1.125rem]">3 learners</p>
          <p class="text-[0.6875rem] text-indigo-700 dark:text-indigo-300 font-semibold">Messaged ✓✓</p>
        </div>
        <!-- coverage -->
        <div class="absolute left-[31.5rem] top-[21rem] w-[10.5rem] rounded-2xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-white/10 p-3">
          <p class="text-[0.625rem] font-bold uppercase tracking-wider text-slate-400">Coverage</p>
          <div class="mt-2 flex items-end gap-1 h-12">
            <span v-for="(h, i) in [90, 75, 100, 60, 85]" :key="i" class="flex-1 rounded-t bg-indigo-500" :style="{ height: `${h}%` }"></span>
          </div>
        </div>
        <div class="absolute left-[44rem] top-[25.5rem] w-[13rem] rounded-2xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-white/10 p-3">
          <p class="text-[0.5625rem] font-bold uppercase tracking-wider text-indigo-600">End of term</p>
          <p class="mt-1 text-[0.9375rem] font-extrabold leading-tight">Ready the day marking ends</p>
        </div>
      </div>
    </div>

    <!-- labels -->
    <span class="absolute left-3 top-3 sm:left-4 sm:top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 shadow transition-opacity" :class="pos < 12 ? 'opacity-0' : ''">On paper</span>
    <span class="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white shadow transition-opacity" :class="pos > 88 ? 'opacity-0' : ''">With Tusome</span>

    <!-- the handle -->
    <div class="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.15)]" :style="{ left: `${pos}%` }">
      <button
        type="button"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-xl ring-4 ring-indigo-600/30 flex items-center justify-center text-indigo-700 focus-visible:ring-indigo-600 cursor-ew-resize"
        role="slider"
        aria-label="Compare paper and Tusome"
        :aria-valuenow="Math.round(pos)"
        aria-valuemin="0"
        aria-valuemax="100"
        @keydown.left.prevent="nudge(-5)"
        @keydown.right.prevent="nudge(5)"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7l-5 5 5 5M16 7l5 5-5 5" /></svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Wordmark from '@/components/brand/Wordmark.vue'

const W = 60
const H = 34
const box = ref<HTMLElement | null>(null)
const scale = ref(1)
const rem = ref(16)
const pos = ref(50)
let touched = false

const SHEET = [
  'Name', 'Test 1', 'Test 2', 'LOA', 'AOI', 'Avg',
  'Ashley', '8', '7', '?', '6', '#REF!',
  'Brian', '5', '', '4', '?', '4.5',
  'Faith', '9', '8', '8', '', '#REF!',
  'Daniel', '?', '6', '5', '7', '6',
  'Grace', '7', '', '?', '5', '6',
  'Joel', '6', '7', '6', '', '#REF!'
]
const MAP = ['bg-indigo-500', 'bg-indigo-500', 'bg-indigo-500', 'bg-amber-400', 'bg-indigo-400', 'bg-rose-400', 'bg-indigo-500']

const fit = () => {
  if (!box.value) return
  rem.value = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  scale.value = box.value.clientWidth / (W * rem.value)
}
const setFrom = (clientX: number) => {
  const r = box.value!.getBoundingClientRect()
  pos.value = Math.min(97, Math.max(3, ((clientX - r.left) / r.width) * 100))
}
const onMove = (e: PointerEvent) => setFrom(e.clientX)
const stopDrag = () => {
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', stopDrag)
}
const startDrag = (e: PointerEvent) => {
  touched = true
  setFrom(e.clientX)
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', stopDrag)
}
const nudge = (d: number) => {
  touched = true
  pos.value = Math.min(97, Math.max(3, pos.value + d))
}

// The first time it comes into view: a little swing to show it moves
let observer: IntersectionObserver | null = null
const hint = () => {
  if (touched || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const keys = [50, 22, 78, 50]
  const start = performance.now()
  const each = 700
  const frame = (t: number) => {
    if (touched) return
    const k = Math.min(keys.length - 1, (t - start) / each)
    const i = Math.floor(k)
    const f = k - i
    const ease = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2
    pos.value = i >= keys.length - 1 ? keys[keys.length - 1] : keys[i] + (keys[i + 1] - keys[i]) * ease
    if (k < keys.length - 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

let ro: ResizeObserver | null = null
onMounted(() => {
  fit()
  ro = new ResizeObserver(fit)
  if (box.value) ro.observe(box.value)
  if ('IntersectionObserver' in window && box.value) {
    observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { observer?.disconnect(); setTimeout(hint, 300) }
    }, { threshold: 0.5 })
    observer.observe(box.value)
  }
})
onBeforeUnmount(() => {
  ro?.disconnect()
  observer?.disconnect()
  stopDrag()
})
</script>
