<template>
  <!-- A card per class stream the teacher teaches: outcomes achieved as a bar, then mastery,
       hand-in and notes read side by side, and a badge for how it's going - each card opens the
       class in the Learning Map. The last card is this week's planned topics. -->
  <section>
    <div class="flex items-center gap-2.5 mb-3">
      <span class="w-8 h-8 flex-shrink-0 rounded-xl flex items-center justify-center bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"><AppIcon name="users" class="w-4 h-4" /></span>
      <h2 class="flex-1 text-base font-bold text-gray-900 dark:text-white">Your classes</h2>
      <RouterLink to="/teacher/class-map" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Class Learning Map →</RouterLink>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      <EmptyState v-if="!classes.length" class="sm:col-span-2 xl:col-span-3" icon="users" tone="indigo" title="Your classes will show here" message="Once you publish an assessment or eNote for a class, its progress appears here." />
      <RouterLink
        v-for="c in classes"
        :key="c.class_id"
        :to="`/teacher/class-map?subject=${c.subject_id}&level=${encodeURIComponent(c.level)}&stream=${c.class_id}`"
        class="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 hover:-translate-y-0.5 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-700 transition-all"
      >
        <span class="absolute inset-x-0 top-0 h-1" :class="badge(c).strip" aria-hidden="true"></span>
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <p class="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white truncate">{{ c.class_name }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ c.students }} learners</p>
          </div>
          <span class="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold" :class="badge(c).cls">{{ badge(c).text }}</span>
        </div>
        <p class="mt-3 text-[11px] font-semibold text-gray-500 dark:text-gray-400">Outcomes achieved</p>
        <div class="mt-1 h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <div class="h-full rounded-full transition-all" :class="barColor(c.achieved_percent)" :style="{ width: `${c.achieved_percent ?? 0}%` }"></div>
        </div>
        <div class="mt-3 grid grid-cols-3 text-center">
          <div v-for="m in metrics(c)" :key="m.label">
            <p class="text-sm font-bold tabular-nums" :class="m.value === null ? 'text-gray-300 dark:text-gray-600' : 'text-gray-900 dark:text-white'">{{ m.value === null ? '–' : `${m.value}%` }}</p>
            <p class="text-[10px] text-gray-400">{{ m.label }}</p>
          </div>
        </div>
        <p v-if="c.most_improved" class="mt-2.5 text-[11px] text-emerald-700 dark:text-emerald-300 truncate">↑ {{ niceName(c.most_improved.name).split(' ')[0] }} improved most, +{{ c.most_improved.improvement }}%</p>
      </RouterLink>

      <!-- This week's topics, from My week -->
      <RouterLink to="/teacher/planner" class="rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 p-4 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors flex flex-col">
        <p class="text-sm font-bold text-gray-800 dark:text-gray-100">This week's topics</p>
        <template v-if="week && week.total">
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ week.taught }} of {{ week.total }} taught</p>
          <ul class="mt-2 space-y-1 text-xs">
            <li v-for="t in week.topics" :key="t.topic + t.class_level" class="flex items-start gap-1.5" :class="t.taught ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-600 dark:text-gray-300'">
              <span class="flex-shrink-0">{{ t.taught ? '✓' : '○' }}</span>
              <span class="min-w-0 truncate">{{ t.topic }} <span class="text-gray-400">{{ t.class_level }}</span></span>
            </li>
          </ul>
        </template>
        <p v-else class="mt-1 text-xs text-gray-500 dark:text-gray-400">Nothing planned yet. Put this week's topics in My week and tick them off as you teach.</p>
        <span class="mt-auto pt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-300">Open My week →</span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import EmptyState from '@/components/ui/EmptyState.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName } from './time'

export interface ClassHealthItem {
  class_id: number
  level: string
  class_name: string
  students: number
  achieved_percent: number | null
  need_support: number
  hand_in_percent?: number | null
  notes_read_percent?: number | null
  most_improved: { name: string; improvement: number } | null
  subject_id: number
}
export interface WeekTopics { total: number; taught: number; topics: { topic: string; class_level: string | null; taught: boolean }[] }
defineProps<{ classes: ClassHealthItem[]; week: WeekTopics | null }>()

const metrics = (c: ClassHealthItem) => [
  { label: 'mastery', value: c.achieved_percent },
  { label: 'hand in', value: c.hand_in_percent ?? null },
  { label: 'read notes', value: c.notes_read_percent ?? null }
]
const barColor = (p: number | null) => (p === null ? '' : p >= 60 ? 'bg-emerald-500' : p >= 40 ? 'bg-amber-500' : 'bg-rose-500')
const badge = (c: ClassHealthItem) => {
  if (c.need_support) return { text: `${c.need_support} need support`, cls: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200', strip: 'bg-rose-500' }
  if (c.achieved_percent === null) return { text: 'No results yet', cls: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300', strip: 'bg-indigo-300 dark:bg-indigo-700' }
  if (c.achieved_percent >= 60) return { text: 'On track', cls: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200', strip: 'bg-emerald-500' }
  return { text: 'Watch', cls: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200', strip: 'bg-amber-500' }
}
</script>
