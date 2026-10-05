<template>
  <!-- Every assessment set in the department - by whom, for which class, how many have handed in -
       with each one's submissions and a preview one tap away. -->
  <div class="w-full">
    <PageHeader title="Assessments" description="Everything your department's teachers have set - who set it, for which class, and how many have handed in." icon="pencil" accent="indigo" :active-filters="teacher ? 1 : 0">
      <StatStrip v-if="!loading && assignments.length" v-model="status" :items="statItems" />
      <template #filters>
        <select v-model="teacher" class="w-full sm:w-56 py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" aria-label="Teacher">
          <option value="">All teachers</option>
          <option v-for="t in teachers" :key="t" :value="t">{{ t }}</option>
        </select>
      </template>
    </PageHeader>

    <DataTable
      :columns="columns"
      :rows="shown"
      :loading="loading"
      :search-keys="['title', 'teacher_name', 'subject_name', 'class_name']"
      search-placeholder="Search assessments"
      :page-size="25"
      :initial-sort="{ key: 'due_date', dir: 'desc' }"
      empty-title="No assessments here"
      empty-message="Assessments your teachers publish show up here."
    >
      <template #cell-title="{ row }">
        <span class="flex items-center gap-2 min-w-0">
          <span v-if="row.category" class="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">{{ row.category }}</span>
          <span class="font-semibold text-gray-900 dark:text-white truncate">{{ row.title }}</span>
        </span>
      </template>
      <template #cell-subject_class="{ row }">
        <span class="text-gray-700 dark:text-gray-200">{{ row.subject_name || '-' }}</span><span v-if="row.class_name" class="text-gray-400"> · {{ row.class_name }}</span>
      </template>
      <template #cell-due_date="{ row }">
        <span class="whitespace-nowrap text-gray-600 dark:text-gray-300">{{ row.due_date ? shortDate(row.due_date) : '-' }}</span>
      </template>
      <template #cell-submissions_count="{ row }">
        <span class="font-semibold tabular-nums">{{ row.submissions_count }}</span>
      </template>
      <template #cell-status="{ row }">
        <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize" :class="STATUS[row.status] || STATUS.archived">{{ row.status }}</span>
      </template>
      <template #actions="{ row }">
        <div class="flex items-center gap-1.5 justify-end">
          <RouterLink :to="`/hod/assessments/${row.id}/submissions`" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Submissions</RouterLink>
          <RouterLink :to="`/hod/assessments/${row.id}/preview`" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700">Preview</RouterLink>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import DataTable, { type Column } from '@/components/ui/DataTable.vue'
import { useToastStore } from '@/stores/toast'

interface Row {
  id: number
  title: string
  status: string
  due_date: string
  total_marks: number
  category: string | null
  subject_name: string | null
  class_name: string | null
  teacher_name: string
  submissions_count: number
}

const STATUS: Record<string, string> = {
  published: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  draft: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  archived: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
}
const columns: Column[] = [
  { key: 'title', label: 'Assessment', sortable: true, mobile: 'title' },
  { key: 'teacher_name', label: 'Teacher', sortable: true, mobile: 'subtitle' },
  { key: 'subject_class', label: 'Subject · class', value: (r: Row) => `${r.subject_name || ''} ${r.class_name || ''}` },
  { key: 'due_date', label: 'Due', sortable: true },
  { key: 'submissions_count', label: 'Handed in', sortable: true, align: 'center' },
  { key: 'status', label: 'Status', sortable: true }
]

const toast = useToastStore()
const assignments = ref<Row[]>([])
const loading = ref(true)
const status = ref<string | null>(null)
const teacher = ref('')

const teachers = computed(() => [...new Set(assignments.value.map(a => a.teacher_name).filter(Boolean))].sort())
const byTeacher = computed(() => assignments.value.filter(a => !teacher.value || a.teacher_name === teacher.value))
const statItems = computed<StatItem[]>(() => [
  { label: 'Published', value: byTeacher.value.filter(a => a.status === 'published').length, key: 'published', tone: 'emerald' },
  { label: 'Drafts', value: byTeacher.value.filter(a => a.status === 'draft').length, key: 'draft', tone: 'amber' },
  { label: 'Archived', value: byTeacher.value.filter(a => a.status === 'archived').length, key: 'archived', tone: 'gray' },
  { label: 'Handed in', value: byTeacher.value.reduce((n, a) => n + Number(a.submissions_count || 0), 0), key: 'all', tone: 'indigo', hint: 'submissions in all' }
])
const shown = computed(() => byTeacher.value.filter(a => !status.value || status.value === 'all' || a.status === status.value))
const shortDate = (d: string) => new Date(d.replace(' ', 'T')).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })

onMounted(async () => {
  try {
    const response = await axios.get('/api/hod/assignments')
    assignments.value = (response.data.data.assignments || []).map((a: Row) => ({ ...a, submissions_count: Number(a.submissions_count) || 0 }))
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load the assessments')
  } finally {
    loading.value = false
  }
})
</script>
