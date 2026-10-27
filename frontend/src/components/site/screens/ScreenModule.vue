<template>
  <!-- Any module, drawn as its page in the app: what it is, what it does (as cards), who uses it -
       for the modules that have no hand-drawn tour screen (see ModuleExplorer.vue) -->
  <ScreenShell :role="shellRole" :active="module.name" :user="shellRole === 'student' ? 'Ashley' : 'Grace'">
    <div class="h-full flex gap-4">
      <div class="flex-1 min-w-0 flex flex-col gap-3">
        <div class="rounded-xl bg-indigo-600 text-white p-4 flex items-center gap-3">
          <span class="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center"><AppIcon :name="module.icon" class="w-6 h-6" /></span>
          <div class="min-w-0">
            <p class="text-[0.9375rem] font-bold leading-tight">{{ module.name }}</p>
            <p class="mt-0.5 text-[0.6875rem] text-white/85 leading-snug">{{ module.short }}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 flex-1 min-h-0">
          <div v-for="(f, i) in module.features.slice(0, 4)" :key="f" class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3 flex flex-col">
            <span class="w-7 h-7 rounded-lg flex items-center justify-center" :class="TINTS[i % TINTS.length]"><AppIcon name="check-circle" class="w-4 h-4" /></span>
            <p class="mt-2 font-semibold text-[0.75rem] leading-snug">{{ f }}</p>
            <!-- a little of the page itself: lines of content, a progress bar -->
            <div class="mt-auto pt-2 space-y-1.5">
              <span class="block h-1.5 rounded-full bg-slate-100 dark:bg-white/10"></span>
              <span class="block h-1.5 w-2/3 rounded-full bg-slate-100 dark:bg-white/10"></span>
              <span class="block h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden"><span class="block h-full rounded-full bg-indigo-500" :style="{ width: `${45 + i * 15}%` }"></span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[12.5rem] flex flex-col gap-3">
        <div class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3">
          <p class="text-[0.5625rem] font-bold uppercase tracking-wider text-slate-400">Used by</p>
          <div class="mt-2 flex flex-wrap gap-1">
            <span v-for="r in module.roles" :key="r" class="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200 text-[0.625rem] font-semibold">{{ ROLE_LABEL[r] }}</span>
          </div>
        </div>
        <div class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3 flex-1">
          <p class="text-[0.5625rem] font-bold uppercase tracking-wider text-slate-400">Today</p>
          <ul class="mt-2 space-y-2">
            <li v-for="(a, i) in ACTIVITY" :key="i" class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[0.5625rem] font-bold" :class="a.color">{{ a.who[0] }}</span>
              <span class="min-w-0 leading-tight">
                <span class="block font-semibold text-[0.625rem] truncate">{{ a.who }}</span>
                <span class="block text-[0.5625rem] text-slate-400 truncate">{{ a.when }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </ScreenShell>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ScreenShell from './ScreenShell.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { ROLE_LABEL, type EModule } from '@/data/modules'

const props = defineProps<{ module: EModule }>()

// A student's page if only students use it, otherwise the teacher's
const shellRole = computed(() => (props.module.roles.includes('teacher') || props.module.roles.includes('hod') ? 'teacher' : 'student'))

const TINTS = [
  'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300',
  'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
  'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300',
  'bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300'
]
const ACTIVITY = [
  { who: 'Brian K.', when: '2 minutes ago', color: 'bg-indigo-500' },
  { who: 'Faith M.', when: '15 minutes ago', color: 'bg-amber-500' },
  { who: 'Joel W.', when: 'This morning', color: 'bg-sky-500' },
  { who: 'Grace A.', when: 'Yesterday', color: 'bg-rose-500' }
]
</script>
