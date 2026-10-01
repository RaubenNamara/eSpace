<template>
  <!-- A card per class stream the teacher teaches: how many outcome results are achieved, who needs
       support, the most improved student - and straight into that class's Learning Map -->
  <section>
    <div class="flex items-center gap-2 mb-3">
      <h2 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">Your classes</h2>
      <RouterLink to="/teacher/class-map" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Class Learning Map</RouterLink>
    </div>
    <EmptyState v-if="!classes.length" icon="users" tone="indigo" title="Your classes will show here" message="Once you publish an assessment or eNote for a class, its progress appears here." />
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <RouterLink
        v-for="c in classes"
        :key="c.class_id"
        :to="`/teacher/class-map?subject=${c.subject_id}&level=${encodeURIComponent(c.level)}&stream=${c.class_id}`"
        class="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-lg transition-all"
      >
        <!-- Outcome results achieved -->
        <div class="relative w-16 h-16 flex-shrink-0">
          <svg class="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke-width="4" class="stroke-gray-100 dark:stroke-gray-700" />
            <circle v-if="c.achieved_percent !== null" cx="18" cy="18" r="15.5" fill="none" stroke-width="4" stroke-linecap="round" :stroke="ringColor(c.achieved_percent)" :stroke-dasharray="`${c.achieved_percent * 0.974} 97.4`" />
          </svg>
          <span class="absolute inset-0 flex items-center justify-center text-sm font-extrabold" :class="c.achieved_percent === null ? 'text-gray-300 dark:text-gray-600' : 'text-gray-900 dark:text-white'">
            {{ c.achieved_percent === null ? '–' : `${c.achieved_percent}%` }}
          </span>
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-base font-bold text-gray-900 dark:text-white">{{ c.class_name }}</p>
          <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ c.students }} students · {{ c.achieved_percent === null ? 'no results yet' : 'outcomes achieved' }}</p>
          <div class="mt-1.5 flex flex-wrap gap-1.5">
            <span v-if="c.need_support" class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200">{{ c.need_support }} need support</span>
            <span v-if="c.most_improved" class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200 truncate max-w-full">↑ {{ niceName(c.most_improved.name).split(' ')[0] }} +{{ c.most_improved.improvement }}%</span>
          </div>
        </div>
        <svg class="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import EmptyState from '@/components/ui/EmptyState.vue'
import { niceName } from './time'

export interface ClassHealthItem {
  class_id: number
  level: string
  class_name: string
  students: number
  achieved_percent: number | null
  need_support: number
  most_improved: { name: string; improvement: number } | null
  subject_id: number
}
defineProps<{ classes: ClassHealthItem[] }>()

const ringColor = (p: number) => (p >= 60 ? '#10b981' : p >= 40 ? '#f59e0b' : '#f43f5e')
</script>
