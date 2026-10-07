<template>
  <!-- Where the learners are: enrolments by department, by class or by year, as a short list of
       bars - one card in place of three charts -->
  <section class="flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5">
    <div class="flex items-center gap-2 mb-3">
<span class="w-8 h-8 flex-shrink-0 rounded-xl flex items-center justify-center bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"><AppIcon name="users" class="w-4 h-4" /></span>
      <h2 class="flex-1 text-base font-bold text-gray-900 dark:text-white">Enrolment</h2>
      <button type="button" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline" @click="emit('open')">See who →</button>
    </div>
    <div class="inline-flex self-start p-0.5 mb-3 rounded-lg bg-gray-100 dark:bg-gray-900/50 text-xs font-semibold">
      <button
        v-for="t in TABS"
        :key="t.key"
        type="button"
        class="px-2.5 py-1 rounded-md transition-colors"
        :class="tab === t.key ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
        @click="tab = t.key"
      >{{ t.label }}</button>
    </div>

    <div v-if="loading" class="space-y-2.5"><div v-for="i in 5" :key="i" class="h-6 rounded bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
    <p v-else-if="!rows.length" class="text-xs text-gray-500 dark:text-gray-400">Nothing yet - this fills in as students are enrolled.</p>
    <ul v-else class="space-y-2">
      <li v-for="(r, i) in shown" :key="r.label" class="text-xs">
        <div class="flex items-center justify-between gap-2 mb-0.5">
          <span class="min-w-0 truncate font-medium text-gray-700 dark:text-gray-200">{{ r.label }}</span>
          <span class="flex-shrink-0 font-bold tabular-nums text-gray-900 dark:text-white">{{ r.count.toLocaleString() }}</span>
        </div>
        <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <div class="h-full rounded-full transition-all duration-500" :class="BARS[i % BARS.length]" :style="{ width: `${Math.max(2, (r.count / max) * 100)}%` }"></div>
        </div>
      </li>
    </ul>
    <button v-if="rows.length > LIMIT" type="button" class="mt-3 self-start text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" @click="all = !all">
      {{ all ? 'Show fewer' : `Show all ${rows.length}` }}
    </button>
    <p v-if="total" class="mt-auto pt-3 text-[11px] text-gray-400">{{ total.toLocaleString() }} enrolments in all{{ recent ? ` · ${recent.toLocaleString()} new this week` : '' }}</p>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'

const props = defineProps<{
  loading: boolean
  total: number
  recent: number
  byDepartment: { department: string; count: number }[]
  byClass: { class_name: string; stream_name?: string | null; count: number }[]
  byYear: { academic_year: string; count: number }[]
}>()
const emit = defineEmits<{ open: [] }>()

const TABS = [
  { key: 'department', label: 'Department' },
  { key: 'class', label: 'Class' },
  { key: 'year', label: 'Year' }
] as const
const BARS = ['bg-indigo-600 dark:bg-indigo-400']
const LIMIT = 10

const tab = ref<(typeof TABS)[number]['key']>('department')
const all = ref(false)
watch(tab, () => { all.value = false })

const rows = computed(() => {
  if (tab.value === 'department') {
    return props.byDepartment.map(d => ({ label: d.department, count: Number(d.count) || 0 })).sort((a, b) => b.count - a.count)
  }
  if (tab.value === 'year') {
    return props.byYear.map(y => ({ label: y.academic_year, count: Number(y.count) || 0 }))
  }
  // A class level with its streams added together, S.1 to S.6 in order
  const levels = new Map<string, number>()
  for (const c of props.byClass) levels.set(c.class_name, (levels.get(c.class_name) || 0) + (Number(c.count) || 0))
  return [...levels].map(([label, count]) => ({ label, count })).sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }))
})
const shown = computed(() => (all.value ? rows.value : rows.value.slice(0, LIMIT)))
const max = computed(() => Math.max(1, ...rows.value.map(r => r.count)))
</script>
