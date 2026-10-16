<template>
  <!-- Where the learners are: enrolments by department, by class or by year, as a short list of
       bars - one card in place of three charts -->
  <section class="dash-box flex flex-col">
    <h2 class="dash-bar">Enrolment <span v-if="total" class="text-xs font-semibold text-indigo-700 dark:text-indigo-300 tabular-nums">{{ total.toLocaleString() }}</span><button type="button" class="dash-bar-link" @click="emit('open')">See who</button></h2>
    <div class="px-3 pt-3">
      <div class="inline-flex p-0.5 rounded-lg bg-gray-100 dark:bg-gray-900/50 text-xs font-semibold">
        <button
          v-for="t in TABS"
          :key="t.key"
          type="button"
          class="px-2.5 py-1 rounded-md transition-colors"
          :class="tab === t.key ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'"
          @click="tab = t.key"
        >{{ t.label }}</button>
      </div>
    </div>
    <div class="p-3">
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
    <p v-if="recent" class="mt-3 text-xs text-gray-500 dark:text-gray-400">{{ recent.toLocaleString() }} new this week</p>
    </div>
    <button v-if="rows.length > LIMIT" type="button" class="dash-more mt-auto" :aria-expanded="all" @click="all = !all">
      {{ all ? 'Show less' : `Show ${rows.length - LIMIT} more` }}
      <svg class="w-4 h-4 transition-transform duration-300" :class="all ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

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
const LIMIT = 6

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
