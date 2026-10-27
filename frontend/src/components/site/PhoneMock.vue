<template>
  <!-- A phone showing one moment of a learner's day on Tusome (see DayStory.vue). Drawn in rem so
       it scales with the site. -->
  <div class="relative mx-auto w-[16.5rem] h-[33rem] rounded-[2.6rem] bg-slate-900 p-2.5 shadow-2xl shadow-indigo-950/40 ring-1 ring-black/20" aria-hidden="true">
    <div class="absolute left-1/2 -translate-x-1/2 top-3 w-20 h-5 rounded-full bg-slate-900 z-20"></div>
    <div class="relative h-full w-full overflow-hidden rounded-[2rem] bg-slate-50 text-slate-900 font-sans text-[0.6875rem]">
      <!-- status bar -->
      <div class="flex items-center justify-between px-6 pt-2.5 pb-1 text-[0.625rem] font-semibold">
        <span>{{ clock }}</span>
        <span class="flex items-center gap-1"><span class="w-3 h-2 rounded-sm bg-slate-900"></span><span class="w-4 h-2 rounded-sm border border-slate-900"></span></span>
      </div>
      <Transition name="phone" mode="out-in">
        <!-- 1. reading eNotes, with narration, saved offline -->
        <div v-if="screen === 'read'" key="read" class="px-4 pt-2 flex flex-col h-[calc(100%-1.75rem)]">
          <p class="text-[0.5625rem] font-bold uppercase tracking-wider text-indigo-600">eNotes · Physics · S.1</p>
          <p class="mt-1 text-[0.9375rem] font-bold">Measuring length</p>
          <div class="mt-3 space-y-2 leading-relaxed text-slate-600">
            <p>To <span class="bg-amber-200/80 px-0.5 rounded">measure</span> is to compare a quantity with a standard unit.</p>
            <p>For small lengths we use a <span class="bg-amber-200/80 px-0.5 rounded">vernier caliper</span>, which reads to 0.01 cm.</p>
          </div>
          <div class="mt-3 rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-slate-200">
            <div class="h-16 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center">
              <svg viewBox="0 0 120 40" class="w-28"><rect x="6" y="14" width="108" height="10" rx="2" fill="#15874a" /><rect x="40" y="10" width="26" height="22" rx="2" fill="#7dd8a3" /><path v-for="i in 18" :key="i" :d="`M${8 + i * 6} 24 v${i % 5 === 0 ? 6 : 3}`" stroke="#0f472b" stroke-width="1" /></svg>
            </div>
          </div>
          <div class="mt-auto mb-3">
            <div class="rounded-2xl bg-slate-900 text-white p-2.5 flex items-center gap-2">
              <span class="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center"><svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg></span>
              <span class="flex-1 flex items-end gap-0.5 h-5"><span v-for="i in 18" :key="i" class="phone-wave flex-1 rounded-full bg-indigo-300" :style="{ animationDelay: `${(i % 6) * 0.1}s`, height: `${35 + ((i * 29) % 60)}%` }"></span></span>
            </div>
            <div class="mt-2 flex items-center justify-between text-[0.5625rem] text-slate-500">
              <span class="inline-flex items-center gap-1 rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5 font-semibold">Saved offline</span>
              <span>Page 3 of 12</span>
            </div>
          </div>
        </div>

        <!-- 2. a live class -->
        <div v-else-if="screen === 'live'" key="live" class="flex flex-col h-[calc(100%-1.75rem)]">
          <div class="relative mx-3 mt-1 h-40 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center">
            <span class="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-red-500 text-white px-1.5 py-0.5 text-[0.5rem] font-bold"><span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>LIVE</span>
            <span class="w-14 h-14 rounded-full bg-amber-200 ring-4 ring-white/20 flex items-center justify-center text-[1.125rem] font-bold text-amber-900">MO</span>
            <span class="absolute bottom-2 left-2 text-[0.5625rem] text-white/90">Mr Okello · Biology</span>
          </div>
          <div class="mx-3 mt-2 grid grid-cols-4 gap-1.5">
            <span v-for="(c, i) in ['bg-sky-300', 'bg-rose-300', 'bg-amber-300', 'bg-indigo-300']" :key="i" class="h-10 rounded-lg" :class="c"></span>
          </div>
          <p class="mx-3 mt-3 text-[0.75rem] font-bold">Photosynthesis Q&amp;A</p>
          <div class="mx-3 mt-2 space-y-1.5 flex-1">
            <p class="w-fit max-w-[85%] rounded-xl rounded-tl-none bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-slate-200">Why do leaves look green?</p>
            <p class="ml-auto w-fit max-w-[85%] rounded-xl rounded-tr-none bg-indigo-600 text-white px-2.5 py-1.5">Chlorophyll reflects green light!</p>
            <p class="w-fit rounded-xl rounded-tl-none bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-slate-200">Exactly right, Ashley 👏</p>
          </div>
          <div class="m-3 flex gap-2">
            <span class="flex-1 rounded-xl bg-white ring-1 ring-slate-200 px-2.5 py-2 text-slate-400">Ask a question…</span>
            <span class="rounded-xl bg-amber-400 px-2.5 py-2 font-bold">✋</span>
          </div>
        </div>

        <!-- 3. handing in an assessment -->
        <div v-else-if="screen === 'assess'" key="assess" class="px-4 pt-2 flex flex-col h-[calc(100%-1.75rem)]">
          <div class="flex items-center justify-between">
            <span class="rounded bg-indigo-50 text-indigo-700 px-1.5 py-0.5 text-[0.5625rem] font-bold">LOA</span>
            <span class="rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-[0.5625rem] font-semibold">Closes 5:00 pm</span>
          </div>
          <p class="mt-2 text-[0.8125rem] font-bold leading-snug">Q2. The main scale shows 2.4 cm and the 6th vernier mark lines up. What is the reading?</p>
          <div class="mt-3 space-y-1.5">
            <p v-for="(o, i) in ['2.40 cm', '2.46 cm', '2.6 cm', '3.0 cm']" :key="o" class="rounded-xl px-3 py-2 ring-1" :class="i === 1 ? 'bg-indigo-50 ring-indigo-500 text-indigo-800 font-bold' : 'bg-white ring-slate-200'">{{ o }}</p>
          </div>
          <div class="mt-3 rounded-xl bg-white ring-1 ring-slate-200 p-2">
            <p class="text-[0.5625rem] text-slate-400">Show your working</p>
            <svg viewBox="0 0 200 40" class="w-full h-10"><path d="M6 30 C30 10 40 34 64 18 S100 30 120 14" fill="none" stroke="#1d4ed8" stroke-width="2" stroke-linecap="round" /><text x="128" y="26" font-size="12" fill="#1d4ed8" font-family="cursive">= 2.46</text></svg>
          </div>
          <div class="mt-auto mb-3 rounded-2xl bg-indigo-600 text-white text-center py-2.5 font-bold text-[0.75rem] shadow-lg shadow-indigo-600/30">Hand in</div>
        </div>

        <!-- teacher 1. the morning dashboard -->
        <div v-else-if="screen === 'tdash'" key="tdash" class="px-4 pt-2 flex flex-col h-[calc(100%-1.75rem)]">
          <p class="text-[0.625rem] text-slate-400">Good morning,</p>
          <p class="text-[0.9375rem] font-bold">Mr Okello</p>
          <div class="mt-3 rounded-2xl bg-indigo-600 text-white p-3">
            <p class="text-[0.5625rem] font-bold uppercase tracking-wider text-indigo-100">To mark</p>
            <p class="mt-0.5 text-[1.5rem] font-extrabold leading-none">11 <span class="text-[0.6875rem] font-semibold text-indigo-100">scripts</span></p>
            <p class="mt-1.5 text-[0.625rem] text-indigo-100">S.1 Measurements LOA · oldest 1 day</p>
            <span class="mt-2 inline-flex rounded-lg bg-white text-indigo-700 px-2.5 py-1 text-[0.625rem] font-bold">Mark next</span>
          </div>
          <div class="mt-2.5 grid grid-cols-2 gap-2">
            <div class="rounded-xl bg-white ring-1 ring-slate-200 p-2.5">
              <p class="flex items-center gap-1 text-[0.5rem] font-bold uppercase tracking-wider text-slate-400"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>Today</p>
              <p class="mt-1 font-bold leading-tight">Live class</p>
              <p class="text-[0.5625rem] text-slate-500">11:00 · S.2 Biology</p>
            </div>
            <div class="rounded-xl bg-white ring-1 ring-slate-200 p-2.5">
              <p class="text-[0.5rem] font-bold uppercase tracking-wider text-slate-400">Attention</p>
              <p class="mt-1 font-bold leading-tight text-amber-600">3 learners</p>
              <p class="text-[0.5625rem] text-slate-500">gone quiet</p>
            </div>
          </div>
          <p class="mt-3 text-[0.5625rem] font-bold uppercase tracking-wider text-slate-400">My classes</p>
          <div class="mt-1.5 space-y-1.5">
            <div v-for="c in [['S.1 A', 79, 72], ['S.1 B', 85, 64], ['S.2 C', 73, 81]]" :key="c[0]" class="flex items-center gap-2 rounded-xl bg-white ring-1 ring-slate-200 px-2.5 py-2">
              <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center text-[0.5625rem] font-bold">{{ String(c[0]).replace(' ', '') }}</span>
              <span class="flex-1"><span class="block font-semibold">{{ c[0] }}</span><span class="block h-1 mt-1 rounded-full bg-slate-100"><span class="block h-1 rounded-full bg-indigo-500" :style="{ width: `${c[2]}%` }"></span></span></span>
              <span class="text-[0.5625rem] text-slate-400">{{ c[1] }}</span>
            </div>
          </div>
        </div>

        <!-- teacher 2. marking on screen -->
        <div v-else-if="screen === 'tmark'" key="tmark" class="px-4 pt-2 flex flex-col h-[calc(100%-1.75rem)]">
          <div class="flex items-center justify-between">
            <span class="font-bold">Faith M. · S.1 A</span>
            <span class="text-[0.5625rem] text-slate-400">4 of 11</span>
          </div>
          <p class="mt-2 font-semibold leading-snug">Q2. Read the vernier caliper.</p>
          <div class="relative mt-2 rounded-xl bg-white ring-1 ring-slate-200 p-3 font-[cursive] text-[0.8125rem] leading-6 text-slate-700 bg-[linear-gradient(transparent_1.4375rem,rgba(148,163,184,0.25)_1.5rem)] [background-size:100%_1.5rem]">
            <p>Main = 2.4 cm</p>
            <p>Vernier = 6 × 0.01</p>
            <p>= <span class="relative">2.46 cm<svg class="absolute -inset-x-2 -inset-y-1 w-[calc(100%+1rem)] h-[calc(100%+0.5rem)] text-rose-500" viewBox="0 0 100 40" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="3"><ellipse cx="50" cy="20" rx="48" ry="17" /></svg></span></p>
            <svg class="absolute right-3 top-3 w-7 h-7 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 13l5 5L20 6" /></svg>
            <svg class="absolute right-3 top-10 w-7 h-7 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 13l5 5L20 6" /></svg>
            <span class="absolute right-2 bottom-1 -rotate-6 text-rose-500 font-bold text-[0.75rem]">Well done!</span>
          </div>
          <div class="mt-2.5 flex gap-1.5">
            <span v-for="t in ['✓', '✗', '◯', 'Aa']" :key="t" class="flex-1 rounded-lg bg-white ring-1 ring-slate-200 py-1.5 text-center font-bold text-rose-500">{{ t }}</span>
          </div>
          <div class="mt-2.5 rounded-xl bg-white ring-1 ring-slate-200 p-2.5 flex items-center justify-between">
            <span class="text-slate-500">Marks</span>
            <span class="text-[0.9375rem] font-extrabold text-indigo-700">9 / 10</span>
          </div>
          <div class="mt-auto mb-3 rounded-2xl bg-indigo-600 text-white text-center py-2.5 font-bold text-[0.75rem]">Return to Faith</div>
        </div>

        <!-- teacher 3. the class Learning Map flags an outcome -->
        <div v-else-if="screen === 'tmap'" key="tmap" class="px-4 pt-2 flex flex-col h-[calc(100%-1.75rem)]">
          <p class="text-[0.5625rem] font-bold uppercase tracking-wider text-indigo-600">Class Learning Map · S.1 A</p>
          <p class="mt-1 text-[0.9375rem] font-bold">Measurements</p>
          <div class="mt-3 rounded-xl bg-white ring-1 ring-slate-200 p-2.5">
            <div class="grid grid-cols-[3.2rem_repeat(4,1fr)] gap-1 text-[0.5rem] text-slate-400 font-semibold">
              <span></span><span v-for="h in ['LO1', 'LO2', 'LO3', 'LO4']" :key="h" class="text-center" :class="h === 'LO3' ? 'text-rose-600 font-bold' : ''">{{ h }}</span>
            </div>
            <div v-for="(r, ri) in CLASS_MAP" :key="r.n" class="mt-1 grid grid-cols-[3.2rem_repeat(4,1fr)] gap-1 items-center">
              <span class="text-[0.5625rem] font-semibold truncate">{{ r.n }}</span>
              <span v-for="(c, ci) in r.c" :key="ci" class="h-4 rounded" :class="[c, ci === 2 ? 'ring-1 ring-rose-400' : '']" :style="{ animationDelay: `${ri * 0.08}s` }"></span>
            </div>
          </div>
          <div class="mt-3 rounded-xl bg-rose-50 ring-1 ring-rose-200 p-2.5 phone-pop">
            <p class="font-bold text-rose-700">LO3 · 12 learners need support</p>
            <p class="mt-0.5 text-[0.5625rem] text-rose-600">Converts between units of length</p>
          </div>
          <div class="mt-auto mb-3 rounded-2xl bg-indigo-600 text-white text-center py-2.5 font-bold text-[0.75rem]">Create a support group</div>
        </div>

        <!-- teacher 4. a message to the learners who haven't started -->
        <div v-else-if="screen === 'tmsg'" key="tmsg" class="flex flex-col h-[calc(100%-1.75rem)]">
          <div class="px-4 pt-1 pb-2 flex items-center gap-2 border-b border-slate-200">
            <span class="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center font-bold text-amber-900">3</span>
            <span class="leading-tight"><span class="block font-bold">Brian, Joel and Grace</span><span class="block text-[0.5625rem] text-slate-400">Haven't opened the notes</span></span>
          </div>
          <div class="flex-1 px-3 py-3 space-y-2 bg-[#efeae2]">
            <p class="ml-auto w-fit max-w-[85%] rounded-xl rounded-tr-none bg-[#d9fdd3] px-2.5 py-1.5 shadow-sm">Hello! The Measurements notes are up - start with page 1 tonight, it takes 10 minutes. 📘<span class="block text-right text-[0.5rem] text-sky-500 font-bold">5:02 ✓✓</span></p>
            <p class="w-fit max-w-[85%] rounded-xl rounded-tl-none bg-white px-2.5 py-1.5 shadow-sm">Yes sir, opening now 👍<span class="block text-right text-[0.5rem] text-slate-400">5:04</span></p>
            <p class="w-fit max-w-[85%] rounded-xl rounded-tl-none bg-white px-2.5 py-1.5 shadow-sm">Thank you sir!<span class="block text-right text-[0.5rem] text-slate-400">5:06</span></p>
          </div>
          <div class="m-3 flex gap-2">
            <span class="flex-1 rounded-full bg-white ring-1 ring-slate-200 px-3 py-2 text-slate-400">Message</span>
            <span class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">➤</span>
          </div>
        </div>

        <!-- 4. marked: an outcome turns green -->
        <div v-else key="map" class="px-4 pt-2 flex flex-col h-[calc(100%-1.75rem)]">
          <p class="text-[0.5625rem] font-bold uppercase tracking-wider text-indigo-600">Learning Map · Physics</p>
          <p class="mt-1 text-[0.9375rem] font-bold">Measurements</p>
          <div class="relative mt-3 rounded-2xl bg-indigo-600 text-white p-3 overflow-hidden phone-pop">
            <span v-for="i in 10" :key="i" class="absolute w-1.5 h-1.5 rounded-sm" :class="['bg-amber-300', 'bg-white', 'bg-sky-300'][i % 3]" :style="{ left: `${62 + ((i * 37) % 34)}%`, top: `${12 + ((i * 23) % 70)}%`, transform: `rotate(${i * 40}deg)` }"></span>
            <p class="relative text-[0.5625rem] font-bold uppercase tracking-wider text-indigo-100">Marked · 9 / 10</p>
            <p class="relative mt-0.5 text-[0.8125rem] font-bold">New outcome achieved!</p>
          </div>
          <ul class="mt-3 space-y-1.5">
            <li v-for="o in OUTCOMES" :key="o.t" class="flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 ring-1" :class="o.isNew ? 'ring-indigo-400 phone-glow' : 'ring-slate-200'">
              <span class="w-3 h-3 rounded-full flex-shrink-0" :class="o.c"></span>
              <span class="flex-1 leading-snug" :class="o.isNew ? 'font-bold text-indigo-800' : ''">{{ o.t }}</span>
            </li>
          </ul>
          <div class="mt-auto mb-3 flex items-center justify-between rounded-xl bg-white ring-1 ring-slate-200 px-3 py-2">
            <span class="text-slate-500">This term</span>
            <span class="font-bold text-indigo-700">7 of 10 achieved</span>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
type PhoneScreen = 'read' | 'live' | 'assess' | 'map' | 'tdash' | 'tmark' | 'tmap' | 'tmsg'
defineProps<{ screen: PhoneScreen; clock: string }>()

// a class's outcomes, one row a learner (green achieved, amber nearly, red not yet)
const G = 'bg-indigo-500', A = 'bg-amber-400', R = 'bg-rose-400'
const CLASS_MAP = [
  { n: 'Ashley N.', c: [G, G, R, G] },
  { n: 'Brian K.', c: [G, A, R, A] },
  { n: 'Faith M.', c: [G, G, A, G] },
  { n: 'Daniel O.', c: [A, G, R, G] },
  { n: 'Grace A.', c: [G, G, R, A] },
  { n: 'Joel W.', c: [G, A, R, G] }
]

const OUTCOMES = [
  { t: 'Chooses the right instrument for a length', c: 'bg-indigo-500', isNew: false },
  { t: 'Reads a vernier caliper accurately', c: 'bg-indigo-500', isNew: true },
  { t: 'Converts between units of length', c: 'bg-amber-400', isNew: false },
  { t: 'Estimates the error in a reading', c: 'bg-slate-300', isNew: false }
]
</script>

<style scoped>
.phone-enter-active, .phone-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.phone-enter-from { opacity: 0; transform: translateX(14px); }
.phone-leave-to { opacity: 0; transform: translateX(-14px); }
@keyframes phone-wave { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
.phone-wave { transform-origin: bottom; animation: phone-wave 1s ease-in-out infinite; }
@keyframes phone-pop { 0% { transform: scale(0.92); opacity: 0; } 60% { transform: scale(1.03); opacity: 1; } 100% { transform: scale(1); } }
.phone-pop { animation: phone-pop 0.6s ease-out both; }
@keyframes phone-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(34, 164, 93, 0.0); } 50% { box-shadow: 0 0 0 4px rgba(34, 164, 93, 0.25); } }
.phone-glow { animation: phone-glow 1.8s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .phone-wave, .phone-pop, .phone-glow { animation: none; } }
</style>
