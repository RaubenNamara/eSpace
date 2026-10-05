<template>
  <!-- Every eNote topic in the department - who wrote it, for which class, published or not - each
       one to read. -->
  <div class="w-full">
    <PageHeader title="eNotes" description="Every eNote your department's teachers have written - by teacher, class and status." icon="document" accent="indigo" :active-filters="teacherId ? 1 : 0">
      <StatStrip v-if="!loading && topics.length" v-model="status" :items="statItems" />
      <template #filters>
        <select v-model.number="teacherId" class="w-full sm:w-56 py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" aria-label="Teacher">
          <option :value="0">All teachers</option>
          <option v-for="t in teachers" :key="t.id" :value="t.id">{{ niceName(`${t.first_name} ${t.last_name}`) }}</option>
        </select>
      </template>
    </PageHeader>

    <BulkActionBar :count="bulk.selectedCount.value" @clear="bulk.clear()">
      <button type="button" class="px-2.5 py-1 min-h-[32px] text-xs font-semibold rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="bulkExport">Export CSV</button>
    </BulkActionBar>

    <DataTable
      :columns="columns"
      :rows="shown"
      :loading="loading"
      :search-keys="['title', 'teacher_name', 'subject_name', 'class_name']"
      search-placeholder="Search eNotes"
      :page-size="25"
      :initial-sort="{ key: 'updated_at', dir: 'desc' }"
      empty-title="No eNotes here"
      empty-message="eNotes your teachers write show up here."
    >
      <template #toolbar>
        <label class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
          <input type="checkbox" :checked="bulk.allSelected(shownIds)" class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500" @change="bulk.toggleAll(shownIds)">
          Select all to export
        </label>
      </template>
      <template #cell-title="{ row }">
        <span class="flex items-center gap-2.5 min-w-0">
          <input type="checkbox" :checked="bulk.isSelected(row.id)" class="flex-shrink-0 w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500" :aria-label="`Select ${row.title}`" @click.stop @change="bulk.toggle(row.id)">
          <span class="font-semibold text-gray-900 dark:text-white truncate">{{ nice(row.title) }}</span>
        </span>
      </template>
      <template #cell-subject_class="{ row }">
        <span class="text-gray-700 dark:text-gray-200">{{ row.subject_name || '-' }}</span><span v-if="row.class_name" class="text-gray-400"> · {{ row.class_name }}</span>
      </template>
      <template #cell-status="{ row }">
        <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize" :class="CHIP[row.status] || CHIP.archived">{{ row.status }}</span>
      </template>
      <template #cell-updated_at="{ row }">
        <span class="whitespace-nowrap text-gray-600 dark:text-gray-300">{{ timeAgo(row.updated_at) }}</span>
      </template>
      <template #actions="{ row }">
        <RouterLink :to="`/hod/enotes/${row.id}`" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700">Read</RouterLink>
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
import BulkActionBar from '@/components/common/BulkActionBar.vue'
import { useToastStore } from '@/stores/toast'
import { useBulkSelection } from '@/composables/useBulkSelection'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { downloadBlob } from '@/utils/downloadBlob'
import { niceName, timeAgo } from '@/components/dashboard/teacher/time'

interface Row {
  id: number
  title: string
  status: string
  updated_at: string
  subject_name: string | null
  class_name: string | null
  teacher_name: string
  teacher_id: number
}

const CHIP: Record<string, string> = {
  published: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  draft: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  archived: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
}
const columns: Column[] = [
  { key: 'title', label: 'Topic', sortable: true, mobile: 'title' },
  { key: 'teacher_name', label: 'Teacher', sortable: true, mobile: 'subtitle' },
  { key: 'subject_class', label: 'Subject · class', value: (r: Row) => `${r.subject_name || ''} ${r.class_name || ''}` },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'updated_at', label: 'Updated', sortable: true }
]

const toast = useToastStore()
const bulk = useBulkSelection<number>()
const topics = ref<Row[]>([])
const teachers = ref<{ id: number; first_name: string; last_name: string }[]>([])
const loading = ref(true)
const status = usePersistedRef<string | null>('hod-enotes:status', null)
const teacherId = usePersistedRef<number>('hod-enotes:teacher', 0)

const byTeacher = computed(() => topics.value.filter(t => !teacherId.value || t.teacher_id === teacherId.value))
const statItems = computed<StatItem[]>(() => [
  { label: 'Published', value: byTeacher.value.filter(t => t.status === 'published').length, key: 'published', tone: 'emerald' },
  { label: 'Drafts', value: byTeacher.value.filter(t => t.status === 'draft').length, key: 'draft', tone: 'amber' },
  { label: 'Archived', value: byTeacher.value.filter(t => t.status === 'archived').length, key: 'archived', tone: 'gray' },
  { label: 'All topics', value: byTeacher.value.length, key: 'all', tone: 'indigo' }
])
const shown = computed(() => byTeacher.value.filter(t => !status.value || status.value === 'all' || t.status === status.value))
const shownIds = computed(() => shown.value.map(t => t.id))
const nice = (t: string) => (t === t.toUpperCase() ? t.toLowerCase().replace(/(^|\s)(\w)/g, (_m, p, c) => p + c.toUpperCase()) : t)

const bulkExport = async () => {
  try {
    const response = await axios.post('/api/hod/enotes/bulk-export', { ids: bulk.selectedArray() }, { responseType: 'blob' })
    downloadBlob(response.data, 'enotes.csv')
  } catch {
    toast.error('Could not export the eNotes')
  }
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/hod/enotes')
    topics.value = response.data.data.topics || []
    teachers.value = response.data.data.teachers || []
    if (teacherId.value && !teachers.value.some(t => t.id === teacherId.value)) teacherId.value = 0
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load the eNotes')
  } finally {
    loading.value = false
  }
})
</script>
