<template>
  <!-- Tour: curriculum coverage - what each topic has, and the gaps -->
  <ScreenShell role="teacher" active="Coverage" user="Grace">
    <div class="h-full flex flex-col gap-3">
      <div class="grid grid-cols-3 gap-3">
        <div v-for="s in STATS" :key="s.label" class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3">
          <p class="text-[0.625rem] text-slate-500">{{ s.label }}</p>
          <p class="font-jakarta text-[1.125rem] font-extrabold">{{ s.value }}</p>
          <p class="text-[0.625rem] text-slate-400">{{ s.hint }}</p>
        </div>
      </div>
      <div class="flex-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 overflow-hidden">
        <div class="grid grid-cols-[1.6fr_repeat(4,1fr)] gap-2 px-3 py-2 border-b border-slate-100 dark:border-white/10 text-[0.5625rem] font-bold uppercase tracking-wider text-slate-400">
          <span>Topic</span><span>Outcomes · LOA</span><span>AOI</span><span>Constructs · EOC</span><span>eNotes</span>
        </div>
        <div v-for="t in ROWS" :key="t.name" class="grid grid-cols-[1.6fr_repeat(4,1fr)] gap-2 px-3 py-2.5 border-b border-slate-50 dark:border-white/5 items-center">
          <span><span class="block text-[0.5625rem] text-slate-400">{{ t.term }}</span><span class="block font-semibold">{{ t.name }}</span></span>
          <span v-for="(c, i) in t.cells" :key="i" class="rounded-md px-2 py-1 font-semibold text-[0.625rem]" :class="TONE[c[0]]">{{ c[1] }}</span>
        </div>
      </div>
    </div>
  </ScreenShell>
</template>

<script setup lang="ts">
import ScreenShell from './ScreenShell.vue'

const STATS = [
  { label: 'Outcomes assessed', value: '62%', hint: '24 of 39' },
  { label: 'Topics with an AOI', value: '5 of 8', hint: '3 still to set' },
  { label: 'Topics with eNotes', value: '7 of 8', hint: 'Heat transfer has none' }
]
const TONE: Record<string, string> = {
  g: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  a: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  r: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'
}
const ROWS = [
  { term: 'Term 1', name: 'Introduction to Physics', cells: [['g', '2 / 2'], ['g', '1 AOI'], ['g', '2 EOCs'], ['g', '1 eNote']] },
  { term: 'Term 1', name: 'Measurements in Physics', cells: [['g', '11 / 11'], ['g', '1 AOI'], ['a', '1 EOC'], ['g', '2 eNotes']] },
  { term: 'Term 2', name: 'States of matter', cells: [['a', '3 / 5'], ['g', '1 AOI'], ['r', 'None'], ['g', '1 eNote']] },
  { term: 'Term 2', name: 'The effects of forces', cells: [['a', '4 / 7'], ['r', 'Suggest one'], ['a', '1 EOC'], ['g', '1 eNote']] },
  { term: 'Term 2', name: 'Temperature', cells: [['r', '0 / 5'], ['r', 'Suggest one'], ['r', 'None'], ['g', '1 eNote']] },
  { term: 'Term 3', name: 'Heat transfer', cells: [['r', '0 / 3'], ['r', 'Suggest one'], ['r', 'None'], ['r', 'Write eNotes']] }
]
</script>
