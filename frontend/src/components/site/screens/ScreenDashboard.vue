<template>
  <!-- Tour: a teacher's dashboard first thing in the morning -->
  <ScreenShell role="teacher" active="Dashboard" user="Grace">
    <div class="h-full flex flex-col gap-3">
      <div class="flex items-end justify-between">
        <span><span class="block text-[0.5625rem] font-bold uppercase tracking-widest text-slate-400">Monday, 7:02</span><span class="block font-jakarta text-[1.125rem] font-extrabold">Good morning, Grace</span></span>
        <span class="flex gap-1.5"><span class="px-2.5 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold">New assessment</span><span class="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 dark:bg-white/5 dark:border-white/10 font-semibold">New eNote</span></span>
      </div>
      <div class="grid grid-cols-4 gap-3">
        <div v-for="s in TILES" :key="s.label" class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3">
          <AppIcon :name="s.icon" class="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
          <p class="mt-1.5 font-jakarta text-[1.125rem] font-extrabold">{{ s.value }}</p>
          <p class="font-semibold">{{ s.label }}</p>
          <p class="text-[0.625rem] text-slate-400">{{ s.hint }}</p>
        </div>
      </div>
      <div class="flex-1 grid grid-cols-[1.4fr_1fr] gap-3 min-h-0">
        <div class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3">
          <p class="font-bold text-[0.75rem]">Mark next</p>
          <div v-for="m in MARK" :key="m.title" class="mt-2 flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-white/5 p-2">
            <span class="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200 text-[0.5625rem] font-bold">{{ m.type }}</span>
            <span class="flex-1 min-w-0"><span class="block font-semibold truncate">{{ m.title }}</span><span class="block text-[0.625rem] text-slate-500">{{ m.cls }} · {{ m.waiting }} waiting</span></span>
            <span class="px-2 py-1 rounded-md bg-indigo-600 text-white font-semibold text-[0.625rem]">Mark</span>
          </div>
        </div>
        <div class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3">
          <p class="font-bold text-[0.75rem]">Gone quiet this week</p>
          <p class="text-[0.625rem] text-slate-500">Haven't opened notes or handed in</p>
          <div v-for="q in QUIET" :key="q" class="mt-2 flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-[0.5625rem] font-bold">{{ q.split(' ').map(w => w[0]).join('') }}</span>
            <span class="flex-1 font-semibold">{{ q }}</span>
            <span class="text-[0.625rem] text-indigo-600 dark:text-indigo-300 font-semibold">Message</span>
          </div>
        </div>
      </div>
    </div>
  </ScreenShell>
</template>

<script setup lang="ts">
import ScreenShell from './ScreenShell.vue'
import AppIcon from '@/components/common/AppIcon.vue'

const TILES = [
  { icon: 'pencil', value: 11, label: 'To mark', hint: 'Oldest from Friday' },
  { icon: 'video', value: 1, label: 'Live today', hint: 'S.2 Biology, 11:00' },
  { icon: 'clock', value: 2, label: 'Due this week', hint: 'LOA and AOI' },
  { icon: 'users', value: 1, label: 'Support group', hint: 'Forces - 6 learners' }
]
const MARK = [
  { type: 'LOA', title: 'Measurements in Physics', cls: 'S.1 East', waiting: 7 },
  { type: 'AOI', title: 'Design a rain gauge', cls: 'S.1 West', waiting: 3 },
  { type: 'EOC', title: 'States of matter', cls: 'S.2 North', waiting: 1 }
]
// Sample names, not real learners
const QUIET = ['Brian Kato', 'Faith Mirembe', 'Daniel Okello']
</script>
