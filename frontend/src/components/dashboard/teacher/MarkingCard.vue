<template>
  <!-- Marking this week: a ring for how much is done, then each assessment with scripts waiting -
       how many, how many handed in - one tap into marking it, script by script or by question -->
  <!-- Nothing waiting: a slim strip, so the card doesn't sit there big and empty -->
  <section v-if="!data.waiting" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-5 flex flex-wrap items-center gap-x-4 gap-y-2">
    <span class="w-11 h-11 rounded-full bg-emerald-50 dark:bg-emerald-900/30 ring-4 ring-emerald-100 dark:ring-emerald-900/40 text-emerald-600 dark:text-emerald-300 flex items-center justify-center flex-shrink-0">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
    </span>
    <div class="flex-1 min-w-[12rem]">
      <h2 class="text-sm font-bold text-gray-900 dark:text-white">Marking: all caught up</h2>
      <p class="text-xs text-gray-500 dark:text-gray-400">{{ data.marked_week ? `${data.marked_week} marked this week. ` : '' }}New submissions will show up here.</p>
    </div>
    <div class="flex gap-2">
      <RouterLink to="/teacher/marksheet" class="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Marksheet</RouterLink>
      <RouterLink to="/teacher/assignments" class="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Assessments</RouterLink>
    </div>
  </section>

  <section v-else class="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
    <span class="absolute inset-x-0 top-0 h-1 bg-indigo-600" aria-hidden="true"></span>
    <div class="flex items-center gap-4">
      <div class="relative w-20 h-20 flex-shrink-0">
        <svg class="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke-width="3.5" class="stroke-indigo-50 dark:stroke-gray-700" />
          <circle v-if="donePercent > 0" cx="18" cy="18" r="15.5" fill="none" stroke-width="3.5" stroke-linecap="round" class="stroke-indigo-600 dark:stroke-indigo-400" :stroke-dasharray="`${donePercent * 0.974} 97.4`" />
        </svg>
        <span class="absolute inset-0 flex items-center justify-center">
          <span v-if="data.marked_week" class="text-lg font-extrabold text-gray-900 dark:text-white tabular-nums">{{ donePercent }}%</span>
          <span v-else class="text-center leading-none"><span class="block text-xl font-extrabold text-gray-900 dark:text-white tabular-nums">{{ data.waiting }}</span><span class="text-[9px] font-semibold uppercase tracking-wide text-gray-400">to mark</span></span>
        </span>
      </div>
      <div class="flex-1 min-w-0">
        <h2 class="text-base font-bold text-gray-900 dark:text-white">Marking</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          <template v-if="data.marked_week">{{ data.marked_week }} marked this week · </template>
          <b class="text-gray-800 dark:text-gray-100">{{ data.waiting }} waiting</b><template v-if="data.oldest_at">, oldest {{ timeAgo(data.oldest_at) }}</template>
        </p>
      </div>
      <RouterLink v-if="next" :to="`/teacher/assignments/${next.assignment_id}/submissions?submission=${next.submission_id}`" class="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-[13px] font-semibold bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">Mark next</RouterLink>
    </div>

    <ul v-if="data.by_assignment.length" class="mt-4 divide-y divide-gray-100 dark:divide-gray-700">
      <li v-for="(a, i) in data.by_assignment" :key="a.assignment_id" class="flex items-center gap-3 py-2.5">
        <span class="w-10 h-10 rounded-xl text-[11px] font-bold flex items-center justify-center flex-shrink-0 text-center leading-tight" :class="BADGES[i % BADGES.length]">{{ shortClass(a.class_name) }}</span>
        <RouterLink :to="`/teacher/assignments/${a.assignment_id}/submissions`" class="flex-1 min-w-0 group">
          <p class="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
            {{ niceName(a.title) }}<span v-if="a.category" class="ml-1.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-300">{{ a.category }}</span>
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ a.waiting }} to mark<template v-if="a.expected"> · handed in {{ a.submitted }} of {{ a.expected }}</template><template v-if="a.class_name"> · {{ a.class_name }}</template></p>
        </RouterLink>
        <div v-if="a.expected" class="w-24 hidden md:block flex-shrink-0">
          <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><div class="h-full rounded-full bg-emerald-500" :style="{ width: `${handIn(a)}%` }"></div></div>
          <p class="mt-1 text-[10px] text-gray-400 text-right tabular-nums">{{ handIn(a) }}% in</p>
        </div>
        <RouterLink :to="`/teacher/assignments/${a.assignment_id}/mark-by-question`" class="flex-shrink-0 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">By question</RouterLink>
      </li>
    </ul>

    <RouterLink v-if="next" :to="`/teacher/assignments/${next.assignment_id}/submissions?submission=${next.submission_id}`" class="sm:hidden mt-3 flex justify-center px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 text-white dark:bg-white dark:text-gray-900">Mark next</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { niceName, timeAgo } from './time'

export interface MarkingSummary {
  marked_week: number
  waiting: number
  oldest_at: string | null
  by_assignment: { assignment_id: number; title: string; category: string | null; class_name: string | null; waiting: number; submitted: number; expected: number }[]
}
const props = defineProps<{
  data: MarkingSummary
  next: { submission_id: number; assignment_id: number } | null
}>()

const BADGES = ['bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200']

const donePercent = computed(() => {
  const total = props.data.marked_week + props.data.waiting
  return total ? Math.round((props.data.marked_week / total) * 100) : 100
})
const handIn = (a: MarkingSummary['by_assignment'][number]) => Math.min(100, Math.round((a.submitted / a.expected) * 100))
// "S.3-N" -> "S.3 N"; "Senior Three" -> "SE"
const shortClass = (name: string | null) => {
  if (!name) return '·'
  const m = name.match(/^([A-Za-z]+\.?\s?\d+)/)
  return m ? m[1].replace(/\s/g, '') : name.slice(0, 3)
}
</script>
