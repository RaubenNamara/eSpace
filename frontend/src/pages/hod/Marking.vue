<template>
  <!-- Marking: each teacher in the department this term - what they set for its subjects, how
       much they have marked, what is still waiting (and for how long). Tap a teacher for every
       assessment, its scripts and marks, the learners who didn't hand in, and a reminder. -->
  <div>
    <PageHeader
      title="Marking"
      description="What each teacher in your department has marked this term, and what is still waiting."
      icon="check-circle"
      accent="indigo"
    >
      <template #filters>
        <select v-model.number="termId" aria-label="Term" class="w-full sm:w-auto py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
          <option v-for="t in data?.terms || []" :key="t.id" :value="t.id">{{ t.name }}</option>
        </select>
      </template>
      <StatStrip v-if="data && data.teachers.length" v-model="quick" :items="statItems" />
    </PageHeader>

    <DataTable
      :columns="columns"
      :rows="shown"
      row-key="id"
      :search-keys="['name']"
      search-placeholder="Find a teacher"
      :page-size="25"
      row-clickable
      :loading="loading"
      empty-title="No teachers here"
      :empty-message="quick ? 'Nobody matches this check - good news.' : 'No teachers are in your department yet.'"
      @row-click="(row: SupTeacher) => (openId = row.id)"
    >
      <template #cell-name="{ row }">
        <p class="font-semibold text-gray-900 dark:text-white">{{ niceName(row.name) }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          {{ row.set }} set<template v-if="row.drafts"> · {{ row.drafts }} draft{{ row.drafts === 1 ? '' : 's' }}</template>
        </p>
      </template>
      <template #cell-handed_in="{ row }">
        <span class="tabular-nums font-semibold text-gray-900 dark:text-white">{{ row.handed_in }}</span>
        <span v-if="row.missing" class="text-xs text-gray-500 dark:text-gray-400"> · {{ row.missing }} missing</span>
      </template>
      <template #cell-marked="{ row }">
        <div class="min-w-[8rem]">
          <p class="text-sm">
            <span class="tabular-nums font-semibold" :class="row.marked ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-400'">{{ row.marked }}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400"> of {{ row.marked + row.waiting }}</span>
            <span v-if="row.marked_rate !== null" class="text-xs font-semibold ml-1" :class="rateTone(row.marked_rate)">{{ row.marked_rate }}%</span>
          </p>
          <div v-if="row.marked + row.waiting" class="mt-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <div class="h-full bg-emerald-500" :style="{ width: `${row.marked_rate ?? 0}%` }"></div>
          </div>
          <p v-if="row.last_marked_at" class="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">last marked {{ new Date(row.last_marked_at.replace(' ', 'T')).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) }}</p>
        </div>
      </template>
      <template #cell-waiting="{ row }">
        <span v-if="!row.waiting" class="text-gray-400">0</span>
        <span v-else class="tabular-nums font-semibold" :class="row.overdue ? 'text-amber-600 dark:text-amber-300' : 'text-gray-900 dark:text-white'">
          {{ row.waiting }}<span class="text-xs font-normal text-gray-500 dark:text-gray-400"> · oldest {{ row.oldest_days }}d</span>
        </span>
      </template>
      <template #cell-flags="{ row }">
        <div class="flex flex-wrap gap-1">
          <span v-for="f in row.flags" :key="f" class="px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap" :class="FLAG[f as SupFlag].cls">{{ FLAG[f as SupFlag].label }}</span>
          <span v-if="!row.flags.length" class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">On track</span>
        </div>
      </template>
    </DataTable>

    <TeacherDrawer
      v-if="openId && data?.term"
      :teacher="openRow"
      :teacher-id="openId"
      :term-id="data.term.id"
      :marking-days="data.marking_days"
      api-base="/api/hod/marking"
      scripts-path="/hod/assessments"
      @close="openId = 0"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import DataTable, { type Column } from '@/components/ui/DataTable.vue'
import TeacherDrawer from '@/components/supervision/TeacherDrawer.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'
import { FLAG, type SupFlag, type SupTeacher } from '@/components/supervision/types'

interface MarkingData {
  terms: { id: number; name: string }[]
  term: { id: number; start_date: string; end_date: string } | null
  marking_days: number
  teachers: SupTeacher[]
}

const toast = useToastStore()
const data = ref<MarkingData | null>(null)
const loading = ref(true)
const termId = ref(0)
const quick = ref<string | null>(null)
const openId = ref(0)

const load = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/hod/marking', { params: { term_id: termId.value || undefined } })
    data.value = res.data.data
    if (!termId.value && data.value?.term) termId.value = data.value.term.id
  } catch (e: any) {
    toast.error(e.response?.data?.message || 'Could not load the marking')
  } finally {
    loading.value = false
  }
}
onMounted(load)
watch(termId, (_v, old) => { if (old) load() })

const teachers = computed(() => data.value?.teachers || [])
const shown = computed(() => {
  const q = quick.value
  if (q === 'waiting') return teachers.value.filter(t => t.waiting > 0)
  if (q === 'marking') return teachers.value.filter(t => t.overdue > 0)
  if (q === 'none_set') return teachers.value.filter(t => t.flags.includes('none_set'))
  if (q === 'done') return teachers.value.filter(t => t.marked > 0 && t.waiting === 0)
  return teachers.value
})

const statItems = computed<StatItem[]>(() => {
  const list = teachers.value
  return [
    { key: 'done', label: 'all marked', value: list.filter(t => t.marked > 0 && t.waiting === 0).length, tone: 'emerald' },
    { key: 'waiting', label: 'still marking', value: list.filter(t => t.waiting > 0).length, tone: 'indigo', hint: `${list.reduce((n, t) => n + t.waiting, 0)} scripts` },
    { key: 'marking', label: `with scripts over ${data.value?.marking_days ?? 7} days`, value: list.filter(t => t.overdue > 0).length, tone: 'amber' },
    { key: 'none_set', label: 'set nothing this term', value: list.filter(t => t.flags.includes('none_set')).length, tone: 'rose' }
  ]
})

const columns: Column[] = [
  { key: 'name', label: 'Teacher', sortable: true, mobile: 'title' },
  { key: 'handed_in', label: 'Handed in', sortable: true, mobile: 'field' },
  { key: 'marked', label: 'Marked', sortable: true, mobile: 'field', value: (r: SupTeacher) => r.marked_rate ?? -1 },
  { key: 'waiting', label: 'To mark', sortable: true, mobile: 'field', value: (r: SupTeacher) => r.overdue * 1000 + r.waiting },
  { key: 'flags', label: 'Follow up', mobile: 'subtitle', value: (r: SupTeacher) => r.flags.length }
]

const rateTone = (rate: number | null) =>
  rate === null ? 'text-gray-400' : rate < 50 ? 'text-rose-600 dark:text-rose-300' : rate < 80 ? 'text-amber-600 dark:text-amber-300' : 'text-emerald-600 dark:text-emerald-300'

const openRow = computed(() => teachers.value.find(t => t.id === openId.value) || null)
</script>
