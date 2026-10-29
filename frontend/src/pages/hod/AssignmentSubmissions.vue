<template>
  <!-- One assessment's submissions (HOD: their department, admin: the school): who has handed in,
       how they did, and each marked script one tap away - view only. -->
  <div class="w-full">
    <button type="button" class="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" @click="router.push(`/${role}/assessments`)">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      Assessments
    </button>
    <PageHeader :title="title ? `Scripts · ${title}` : 'Scripts'" description="Marked and returned scripts, scripts waiting to be marked, and who has not handed in (view only)." icon="clipboard" accent="indigo">
      <StatStrip v-if="!loading && !error" :items="statItems" />
    </PageHeader>

    <!-- scripts by where they are: marked and returned, handed in but not marked, not handed in -->
    <nav v-if="!loading && !error" class="mb-3 flex gap-1.5 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 [scrollbar-width:none]" aria-label="Scripts">
      <button
        v-for="t in tabs"
        :key="t.key"
        type="button"
        class="flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-colors"
        :class="category === t.key ? t.on : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'"
        :aria-pressed="category === t.key"
        @click="category = t.key"
      >
        <span class="w-2 h-2 rounded-full" :class="t.dot" aria-hidden="true"></span>
        {{ t.label }}
        <span class="px-1.5 rounded-md text-[11px] font-bold tabular-nums" :class="category === t.key ? 'bg-white/25' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'">{{ t.count }}</span>
      </button>
    </nav>
    <p v-if="!loading && !error && category === 'out' && counts.out > shown.length" class="-mt-1 mb-3 text-xs text-gray-500 dark:text-gray-400">
      {{ counts.out }} students have not handed in. The {{ shown.length }} listed opened it but did not submit; the rest have not opened it yet.
    </p>

    <div v-if="error" class="rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 p-4 text-sm text-rose-800 dark:text-rose-200">{{ error }}</div>

    <DataTable
      v-else
      :columns="columns"
      :rows="shown"
      :loading="loading"
      :search-keys="['student_name', 'admission_number', 'class_label']"
      search-placeholder="Search students"
      :page-size="30"
      :initial-sort="{ key: 'student_name', dir: 'asc' }"
      :empty-title="emptyText.title"
      :empty-message="emptyText.message"
    >
      <template #cell-status="{ row }">
        <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="badge(row.status)">{{ statusText(row.status) }}</span>
      </template>
      <template #cell-percentage="{ row }">
        <span v-if="row.percentage !== null" class="font-semibold tabular-nums" :class="Number(row.percentage) >= 60 ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'">{{ Math.round(Number(row.percentage)) }}%</span>
        <span v-else class="text-gray-400">-</span>
      </template>
      <template #cell-submitted_at="{ row }">
        <span class="whitespace-nowrap text-gray-600 dark:text-gray-300">{{ row.submitted_at ? timeAgo(row.submitted_at) : 'Not handed in' }}</span>
      </template>
      <template #actions="{ row }">
        <RouterLink v-if="row.submitted_at" :to="`/${role}/assessments/${assignmentId}/submissions/${row.id}`" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700">{{ isMarked(row) ? 'View script' : 'View answers' }}</RouterLink>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import DataTable, { type Column } from '@/components/ui/DataTable.vue'
import { timeAgo } from '@/components/dashboard/teacher/time'

interface Row {
  id: number
  student_id: number
  status: string
  total_score: number | null
  percentage: number | null
  submitted_at: string | null
  student_name: string
  admission_number: string | null
  class_label?: string | null
}
interface Stats {
  total_students: number
  submitted_count: number
  not_submitted_count: number
  graded_count: number
  average_percentage: number | null
  highest_percentage: number | null
  lowest_percentage: number | null
}

const route = useRoute()
const router = useRouter()
const assignmentId = computed(() => route.params.id as string)
const role = computed(() => (route.meta.staffRole as string | undefined) || 'hod')
const title = ref('')

const columns: Column[] = [
  { key: 'student_name', label: 'Student', sortable: true, mobile: 'title' },
  { key: 'class_label', label: 'Class', sortable: true, mobile: 'subtitle' },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'percentage', label: 'Score', sortable: true, align: 'center', value: (r: Row) => (r.percentage === null ? -1 : Number(r.percentage)) },
  { key: 'submitted_at', label: 'Handed in', sortable: true, value: (r: Row) => r.submitted_at || '' }
]

const loading = ref(true)
const error = ref('')
const submissions = ref<Row[]>([])
const stats = ref<Stats | null>(null)
// which scripts are listed: marked (graded or returned), handed in but not marked, not handed in
type Category = 'marked' | 'waiting' | 'out'
const category = ref<Category>('marked')
const isMarked = (r: Row) => ['graded', 'returned'].includes(r.status)
const isWaiting = (r: Row) => !!r.submitted_at && !isMarked(r)
const counts = computed(() => ({
  marked: submissions.value.filter(isMarked).length,
  waiting: submissions.value.filter(isWaiting).length,
  out: stats.value ? Math.max(stats.value.not_submitted_count, submissions.value.filter(r => !r.submitted_at).length) : submissions.value.filter(r => !r.submitted_at).length
}))
const tabs = computed(() => [
  { key: 'marked' as const, label: 'Marked & returned', count: counts.value.marked, dot: 'bg-emerald-500', on: 'bg-emerald-600 border-emerald-600 text-white' },
  { key: 'waiting' as const, label: 'Handed in, not marked', count: counts.value.waiting, dot: 'bg-amber-500', on: 'bg-amber-500 border-amber-500 text-white' },
  { key: 'out' as const, label: 'Not handed in', count: counts.value.out, dot: 'bg-gray-400', on: 'bg-gray-700 border-gray-700 text-white dark:bg-gray-600 dark:border-gray-600' }
])
const emptyText = computed(() => category.value === 'marked'
  ? { title: 'No marked scripts yet', message: 'Scripts appear here once the teacher has marked them.' }
  : category.value === 'waiting'
    ? { title: 'Nothing waiting for marking', message: 'Every script handed in has been marked.' }
    : { title: 'Everyone who started has handed in', message: 'Students who have not opened the assessment are not listed.' })
const statusText = (s: string) => ({ returned: 'Marked & returned', graded: 'Marked, not returned', submitted: 'Handed in', marking: 'Being marked', in_progress: 'Started, not handed in' } as Record<string, string>)[s] || s.replace('_', ' ')

const pct = (v: number | null | undefined) => (v === null || v === undefined ? '-' : `${Math.round(Number(v))}%`)
const statItems = computed<StatItem[]>(() => {
  const s = stats.value
  if (!s) return []
  return [
    { label: 'Handed in', value: `${s.submitted_count}/${s.total_students}`, tone: 'gray' },
    { label: 'Marked', value: s.graded_count, tone: 'emerald' },
    { label: 'Not marked', value: counts.value.waiting, tone: 'amber' },
    { label: 'Average', value: pct(s.average_percentage), tone: 'gray', hint: `high ${pct(s.highest_percentage)} · low ${pct(s.lowest_percentage)}` }
  ]
})
const shown = computed(() => submissions.value.filter(r =>
  category.value === 'marked' ? isMarked(r) : category.value === 'waiting' ? isWaiting(r) : !r.submitted_at))
const badge = (s: string) => (s === 'graded' || s === 'returned'
  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
  : s === 'submitted' || s === 'marking' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300')

onMounted(async () => {
  try {
    const response = await axios.get(`/api/${role.value}/assignments/${assignmentId.value}/submissions`)
    submissions.value = response.data.data.submissions || []
    title.value = response.data.data.assignment?.title || ''
    // open on the marked scripts, or on those waiting when nothing is marked yet
    if (!counts.value.marked && counts.value.waiting) category.value = 'waiting'
    stats.value = response.data.data.stats
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Could not load the submissions'
  } finally {
    loading.value = false
  }
})
</script>
