<template>
  <!-- One assessment's submissions across the department: who has handed in, how they did, and
       each script one tap away. -->
  <div class="w-full">
    <button type="button" class="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" @click="router.push('/hod/assessments')">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      Assessments
    </button>
    <PageHeader title="Submissions" description="Who has handed in, how they did - and each script one tap away." icon="clipboard" accent="indigo">
      <StatStrip v-if="!loading && !error" v-model="filter" :items="statItems" />
    </PageHeader>

    <div v-if="error" class="rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 p-4 text-sm text-rose-800 dark:text-rose-200">{{ error }}</div>

    <DataTable
      v-else
      :columns="columns"
      :rows="shown"
      :loading="loading"
      :search-keys="['student_name', 'admission_number']"
      search-placeholder="Search students"
      :page-size="30"
      :initial-sort="{ key: 'student_name', dir: 'asc' }"
      empty-title="No submissions yet"
      empty-message="When students start this assessment, they show up here."
    >
      <template #cell-status="{ row }">
        <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize" :class="badge(row.status)">{{ row.status.replace('_', ' ') }}</span>
      </template>
      <template #cell-percentage="{ row }">
        <span v-if="row.percentage !== null" class="font-semibold tabular-nums" :class="Number(row.percentage) >= 60 ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'">{{ Math.round(Number(row.percentage)) }}%</span>
        <span v-else class="text-gray-400">-</span>
      </template>
      <template #cell-submitted_at="{ row }">
        <span class="whitespace-nowrap text-gray-600 dark:text-gray-300">{{ row.submitted_at ? timeAgo(row.submitted_at) : 'Not handed in' }}</span>
      </template>
      <template #actions="{ row }">
        <RouterLink :to="`/hod/assessments/${assignmentId}/submissions/${row.id}`" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700">View</RouterLink>
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

const columns: Column[] = [
  { key: 'student_name', label: 'Student', sortable: true, mobile: 'title' },
  { key: 'admission_number', label: 'Admission no.', sortable: true, mobile: 'subtitle' },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'percentage', label: 'Score', sortable: true, align: 'center', value: (r: Row) => (r.percentage === null ? -1 : Number(r.percentage)) },
  { key: 'submitted_at', label: 'Handed in', sortable: true, value: (r: Row) => r.submitted_at || '' }
]

const loading = ref(true)
const error = ref('')
const submissions = ref<Row[]>([])
const stats = ref<Stats | null>(null)
const filter = ref<string | null>(null)

const pct = (v: number | null | undefined) => (v === null || v === undefined ? '-' : `${Math.round(Number(v))}%`)
const statItems = computed<StatItem[]>(() => {
  const s = stats.value
  if (!s) return []
  return [
    { label: 'Handed in', value: `${s.submitted_count}/${s.total_students}`, key: 'in', tone: 'emerald' },
    { label: 'Not yet', value: s.not_submitted_count, key: 'out', tone: 'amber' },
    { label: 'Marked', value: s.graded_count, key: 'marked', tone: 'indigo' },
    { label: 'Average', value: pct(s.average_percentage), key: 'all', tone: 'violet', hint: `high ${pct(s.highest_percentage)} · low ${pct(s.lowest_percentage)}` }
  ]
})
const shown = computed(() => submissions.value.filter(r => {
  if (filter.value === 'in') return !!r.submitted_at
  if (filter.value === 'out') return !r.submitted_at
  if (filter.value === 'marked') return ['graded', 'returned'].includes(r.status)
  return true
}))
const badge = (s: string) => (s === 'graded' || s === 'returned'
  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
  : s === 'submitted' || s === 'marking' ? 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300')

onMounted(async () => {
  try {
    const response = await axios.get(`/api/hod/assignments/${assignmentId.value}/submissions`)
    submissions.value = response.data.data.submissions || []
    stats.value = response.data.data.stats
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Could not load the submissions'
  } finally {
    loading.value = false
  }
})
</script>
