<template>
  <!-- Tour: a student's Learning Map - outcomes by topic, green / amber / red -->
  <ScreenShell role="student" active="Learning Map" user="Ashley">
    <div class="h-full flex flex-col gap-3">
      <div class="grid grid-cols-3 gap-3">
        <div v-for="r in RINGS" :key="r.label" class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3 flex items-center gap-3">
          <svg class="w-11 h-11 -rotate-90" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5" fill="none" stroke-width="4" class="stroke-slate-100 dark:stroke-white/10" /><circle cx="18" cy="18" r="15.5" fill="none" stroke-width="4" stroke-linecap="round" :stroke="r.color" :stroke-dasharray="`${r.pct * 0.974} 97.4`" /></svg>
          <span><span class="block font-jakarta text-[1rem] font-extrabold">{{ r.pct }}%</span><span class="block text-[0.625rem] text-slate-500">{{ r.label }}</span></span>
        </div>
      </div>
      <div class="flex gap-1.5">
        <span v-for="(s, i) in SUBJECTS" :key="s" class="px-2.5 py-1 rounded-full font-semibold" :class="i === 0 ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white border border-slate-200 text-slate-500 dark:bg-white/5 dark:border-white/10'">{{ s }}</span>
      </div>
      <div class="flex-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3 space-y-2.5 overflow-hidden">
        <div v-for="t in TOPICS" :key="t.name" class="rounded-lg border border-slate-100 dark:border-white/5 p-2.5">
          <div class="flex items-center justify-between">
            <span><span class="block text-[0.5625rem] font-bold uppercase tracking-wider text-slate-400">{{ t.theme }}</span><span class="block font-semibold text-[0.75rem]">{{ t.name }}</span></span>
            <span class="text-[0.625rem] text-slate-500">{{ t.o.filter(x => x === 'g').length }}/{{ t.o.length }} achieved</span>
          </div>
          <div class="mt-2 flex gap-1">
            <span v-for="(o, i) in t.o" :key="i" class="flex-1 h-2 rounded-full" :class="TONE[o]"></span>
          </div>
        </div>
      </div>
    </div>
  </ScreenShell>
</template>

<script setup lang="ts">
import ScreenShell from './ScreenShell.vue'

const RINGS = [
  { label: 'Outcomes achieved', pct: 68, color: '#10b981' },
  { label: 'Competencies', pct: 54, color: '#6366f1' },
  { label: 'Constructs', pct: 41, color: '#f59e0b' }
]
const SUBJECTS = ['Physics', 'Biology', 'Chemistry', 'Maths', 'English', 'Geography']
const TONE: Record<string, string> = { g: 'bg-emerald-500', a: 'bg-amber-400', r: 'bg-rose-500', n: 'bg-slate-200 dark:bg-white/10' }
const TOPICS = [
  { theme: 'Mechanics and properties of matter', name: 'Measurements in Physics', o: ['g', 'g', 'g', 'a', 'g', 'g', 'g', 'a'] },
  { theme: 'Mechanics and properties of matter', name: 'States of matter', o: ['g', 'g', 'a', 'a', 'r', 'g', 'n', 'n'] },
  { theme: 'Mechanics and properties of matter', name: 'The effects of forces', o: ['g', 'a', 'r', 'n', 'n', 'n', 'n'] },
  { theme: 'Heat', name: 'Temperature measurements', o: ['n', 'n', 'n', 'n', 'n'] }
]
</script>
