<template>
  <!-- Tour: a teacher marking a script on screen - the answer with annotations, marks alongside -->
  <ScreenShell role="teacher" active="Assessments" user="Grace">
    <div class="h-full flex gap-4">
      <div class="flex-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-4 flex flex-col">
        <div class="flex items-center justify-between">
          <span><span class="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200 text-[0.5625rem] font-bold">LOA</span> <span class="font-semibold text-[0.75rem]">Measurements in Physics</span></span>
          <span class="text-[0.625rem] text-slate-500">Script 4 of 38</span>
        </div>
        <p class="mt-3 font-semibold">Q2. A vernier caliper shows 2.4 cm on the main scale and the 6th vernier mark lines up. What is the reading?</p>
        <!-- The learner's working, with the teacher's marks drawn on it -->
        <div class="relative mt-3 flex-1 rounded-lg bg-[linear-gradient(transparent_1.4375rem,rgba(148,163,184,0.25)_1.5rem)] [background-size:100%_1.5rem] dark:bg-[linear-gradient(transparent_1.4375rem,rgba(255,255,255,0.08)_1.5rem)] p-3 font-[cursive] text-[0.875rem] text-slate-700 dark:text-slate-200 leading-[1.5rem]">
          <p>Main scale = 2.4 cm</p>
          <p>Vernier = 6 × 0.01 = 0.06 cm</p>
          <p>Reading = 2.4 + 0.06 = <span class="relative">2.46 cm<svg class="absolute -inset-x-2 -inset-y-1.5 w-[calc(100%+1rem)] h-[calc(100%+0.75rem)] text-rose-500" viewBox="0 0 100 40" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="2.5"><ellipse cx="50" cy="20" rx="48" ry="17" /></svg></span></p>
          <svg class="absolute right-10 top-4 w-8 h-8 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 13l5 5L20 6" /></svg>
          <svg class="absolute right-10 top-11 w-8 h-8 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 13l5 5L20 6" /></svg>
          <span class="absolute right-3 bottom-3 rotate-[-4deg] text-rose-500 font-bold">Good - mind units!</span>
        </div>
        <div class="mt-3 flex gap-1.5">
          <span v-for="t in ['Tick', 'Cross', 'Circle', 'Comment', 'Pen']" :key="t" class="px-2 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-[0.625rem] font-semibold">{{ t }}</span>
        </div>
      </div>
      <div class="w-[12.5rem] flex flex-col gap-3">
        <div class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3">
          <p class="text-[0.5625rem] font-bold uppercase tracking-widest text-slate-400">Marks</p>
          <div v-for="q in MARKS" :key="q.q" class="mt-2 flex items-center justify-between">
            <span class="text-slate-600 dark:text-slate-300">{{ q.q }}</span>
            <span class="px-2 py-0.5 rounded-md font-bold" :class="q.got === q.of ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'">{{ q.got }} / {{ q.of }}</span>
          </div>
          <div class="mt-3 pt-2 border-t border-slate-100 dark:border-white/10 flex justify-between font-bold text-[0.75rem]"><span>Total</span><span>9 / 10</span></div>
        </div>
        <div class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3">
          <p class="text-[0.5625rem] font-bold uppercase tracking-widest text-slate-400">Outcome</p>
          <p class="mt-1 font-semibold">Uses instruments to measure length accurately</p>
          <p class="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 font-bold text-[0.625rem]">Achieved</p>
        </div>
        <span class="mt-auto py-2 rounded-lg bg-indigo-600 text-white font-semibold text-center">Save and next script</span>
      </div>
    </div>
  </ScreenShell>
</template>

<script setup lang="ts">
import ScreenShell from './ScreenShell.vue'

const MARKS = [{ q: 'Q1', got: 3, of: 3 }, { q: 'Q2', got: 3, of: 4 }, { q: 'Q3', got: 3, of: 3 }]
</script>
