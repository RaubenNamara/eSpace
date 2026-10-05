<template>
  <!-- Tour: a student reading an eNote page, with narration and a page note -->
  <ScreenShell role="student" active="eNotes" user="Ashley">
    <div class="h-full flex gap-4">
      <div class="flex-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-6 flex flex-col">
        <p class="text-[0.5625rem] font-bold uppercase tracking-widest text-slate-400">Physics · S.1 · Measurements</p>
        <h3 class="mt-1 font-jakarta text-[1.125rem] font-extrabold">Measuring length</h3>
        <p class="mt-3 text-[0.75rem] leading-relaxed text-slate-600 dark:text-slate-300">
          Length is the distance between two points. Its SI unit is the <span class="bg-amber-200/70 dark:bg-amber-400/30 rounded px-0.5">metre (m)</span>. For short lengths we use a metre rule, for small diameters a
          <span class="bg-amber-200/70 dark:bg-amber-400/30 rounded px-0.5">vernier caliper</span>, and for very small thicknesses a micrometer screw gauge.
        </p>
        <div class="mt-4 grid grid-cols-3 gap-2">
          <div v-for="t in TOOLS" :key="t.name" class="rounded-lg bg-slate-50 dark:bg-white/5 p-2.5">
            <p class="font-semibold">{{ t.name }}</p>
            <p class="text-[0.625rem] text-slate-500">Reads to {{ t.acc }}</p>
          </div>
        </div>
        <p class="mt-4 text-[0.75rem] leading-relaxed text-slate-600 dark:text-slate-300">Always read the scale with your eye directly above the mark, to avoid parallax error.</p>
        <div class="mt-auto flex items-center gap-3 pt-4">
          <span class="text-[0.625rem] text-slate-400">Page 3 of 12</span>
          <span class="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-white/10"><span class="block h-1.5 w-1/4 rounded-full bg-indigo-600"></span></span>
          <span class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold">Next page</span>
        </div>
      </div>
      <div class="w-[11.875rem] flex flex-col gap-3">
        <div class="rounded-xl bg-slate-900 dark:bg-white/5 text-white p-3">
          <p class="text-[0.5625rem] font-bold uppercase tracking-widest text-slate-400">Narration</p>
          <div class="mt-2 flex items-center gap-2">
            <span class="w-7 h-7 rounded-full bg-white text-slate-900 flex items-center justify-center"><svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg></span>
            <span class="flex-1 flex items-end gap-[0.125rem] h-6">
              <span v-for="(b, i) in WAVE" :key="i" class="flex-1 rounded-full" :class="i < 14 ? 'bg-indigo-400' : 'bg-white/25'" :style="{ height: `${b}%` }"></span>
            </span>
          </div>
          <p class="mt-1.5 text-[0.5625rem] text-slate-400">0:42 / 2:10</p>
        </div>
        <div class="rounded-xl bg-amber-50 dark:bg-amber-400/10 border border-amber-200 dark:border-amber-400/20 p-3">
          <p class="text-[0.5625rem] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">My page note</p>
          <p class="mt-1 text-[0.6875rem] text-amber-900 dark:text-amber-100">Vernier: main scale + vernier scale. Ask about zero error tomorrow.</p>
        </div>
        <div class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3">
          <p class="text-[0.5625rem] font-bold uppercase tracking-widest text-slate-400">Saved for offline</p>
          <p class="mt-1 flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400"><AppIcon name="check-circle" class="w-3.5 h-3.5" />Read without internet</p>
        </div>
      </div>
    </div>
  </ScreenShell>
</template>

<script setup lang="ts">
import ScreenShell from './ScreenShell.vue'
import AppIcon from '@/components/common/AppIcon.vue'

const TOOLS = [{ name: 'Metre rule', acc: '0.1 cm' }, { name: 'Vernier caliper', acc: '0.01 cm' }, { name: 'Micrometer', acc: '0.001 cm' }]
const WAVE = [30, 60, 45, 80, 55, 90, 40, 70, 50, 85, 35, 65, 75, 45, 60, 30, 80, 50, 40, 70, 55, 35]
</script>
