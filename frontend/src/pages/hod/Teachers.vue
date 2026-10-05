<template>
  <!-- The department's teachers - and what each is doing here: assessments and eNotes published,
       scripts waiting to be marked, and when they were last on eSpace. -->
  <div class="w-full">
    <PageHeader title="Teachers" description="Your department's teachers - what each has published, what's waiting to be marked, and who's been active." icon="teacher" accent="indigo">
      <StatStrip v-if="!loading && teachers.length" v-model="filter" :items="statItems" />
    </PageHeader>

    <div v-if="error" class="rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 p-4 text-sm text-rose-800 dark:text-rose-200">{{ error }}</div>

    <DataTable
      v-else
      :columns="columns"
      :rows="shown"
      :loading="loading"
      :search-keys="['name', 'username', 'email', 'employee_number']"
      search-placeholder="Search teachers"
      :page-size="25"
      :initial-sort="{ key: 'name', dir: 'asc' }"
      empty-title="No teachers here"
      empty-message="Teachers assigned to your department show up here."
    >
      <template #cell-name="{ row }">
        <div class="flex items-center gap-3 min-w-0">
          <span class="w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">{{ initials(row.name) }}</span>
          <span class="min-w-0">
            <span class="block font-semibold text-gray-900 dark:text-white truncate">{{ row.name }}</span>
            <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">{{ row.email || '@' + row.username }}</span>
          </span>
        </div>
      </template>
      <template #cell-assessments_count="{ row }">
        <span class="font-semibold tabular-nums" :class="row.assessments_count ? 'text-gray-900 dark:text-white' : 'text-gray-400'">{{ row.assessments_count }}</span>
      </template>
      <template #cell-enotes_count="{ row }">
        <span class="font-semibold tabular-nums" :class="row.enotes_count ? 'text-gray-900 dark:text-white' : 'text-gray-400'">{{ row.enotes_count }}</span>
      </template>
      <template #cell-to_mark_count="{ row }">
        <span v-if="row.to_mark_count" class="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">{{ row.to_mark_count }}</span>
        <span v-else class="text-gray-400">0</span>
      </template>
      <template #cell-last_active="{ row }">
        <span :class="row.last_active_at ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400'">{{ row.last_active_at ? timeAgo(row.last_active_at) : 'Never' }}</span>
      </template>
      <template #cell-status="{ row }">
        <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="row.is_active ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'">{{ row.is_active ? 'Active' : 'Suspended' }}</span>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { apiService } from '@/services/api'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import DataTable, { type Column } from '@/components/ui/DataTable.vue'
import { initials, niceName, timeAgo } from '@/components/dashboard/teacher/time'

interface Teacher {
  id: number
  username: string
  email: string | null
  employee_number: string | null
  first_name: string
  last_name: string
  phone: string | null
  is_active: number
  last_active_at: string | null
  assessments_count: number
  enotes_count: number
  to_mark_count: number
}
type Row = Teacher & { name: string }

const columns: Column[] = [
  { key: 'name', label: 'Teacher', sortable: true, mobile: 'title' },
  { key: 'employee_number', label: 'Staff no.', sortable: true, mobile: 'subtitle' },
  { key: 'assessments_count', label: 'Assessments', sortable: true, align: 'center' },
  { key: 'enotes_count', label: 'eNotes', sortable: true, align: 'center' },
  { key: 'to_mark_count', label: 'To mark', sortable: true, align: 'center' },
  { key: 'last_active', label: 'Last active', sortable: true, value: (r: Row) => r.last_active_at || '' },
  { key: 'status', label: 'Status', value: (r: Row) => (r.is_active ? 1 : 0) }
]

const teachers = ref<Row[]>([])
const loading = ref(true)
const error = ref('')
const filter = ref<string | null>(null)

const weekAgo = () => Date.now() - 7 * 86400000
const activeThisWeek = (t: Row) => !!t.last_active_at && new Date(t.last_active_at.replace(' ', 'T')).getTime() >= weekAgo()

const statItems = computed<StatItem[]>(() => [
  { label: 'Teachers', value: teachers.value.length, key: 'all', tone: 'indigo' },
  { label: 'Active this week', value: teachers.value.filter(activeThisWeek).length, key: 'active', tone: 'emerald' },
  { label: 'Scripts to mark', value: teachers.value.reduce((n, t) => n + t.to_mark_count, 0), key: 'marking', tone: 'amber', hint: 'across the department' },
  { label: 'Nothing published', value: teachers.value.filter(t => !t.assessments_count && !t.enotes_count).length, key: 'quiet', tone: 'rose', hint: 'no assessment or eNote yet' }
])
const shown = computed(() => teachers.value.filter(t => {
  if (filter.value === 'active') return activeThisWeek(t)
  if (filter.value === 'marking') return t.to_mark_count > 0
  if (filter.value === 'quiet') return !t.assessments_count && !t.enotes_count
  return true
}))

onMounted(async () => {
  try {
    const response = await apiService.get('/hod/teachers', { limit: 500 })
    teachers.value = (response.data.data.teachers || []).map((t: Teacher) => ({
      ...t,
      name: niceName(`${t.first_name} ${t.last_name}`),
      assessments_count: Number(t.assessments_count) || 0,
      enotes_count: Number(t.enotes_count) || 0,
      to_mark_count: Number(t.to_mark_count) || 0
    }))
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Could not load the teachers'
  } finally {
    loading.value = false
  }
})
</script>
