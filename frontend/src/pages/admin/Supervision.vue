<template>
  <div>
    <PageHeader
      title="Supervision"
      description="Every department and teacher this term - work set, scripts waiting to be marked, and who has not handed in."
      icon="target"
      accent="indigo"
      :active-filters="departmentId ? 1 : 0"
    >
      <template #actions>
        <RouterLink :to="{ path: '/admin/supervision/report', query: { ...(termId ? { term_id: String(termId) } : {}), ...(departmentId ? { department_id: String(departmentId) } : {}) } }" class="btn-primary">Print report</RouterLink>
      </template>
      <template #filters>
        <select v-model.number="termId" aria-label="Term" class="w-full sm:w-auto py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
          <option v-for="t in data?.terms || []" :key="t.id" :value="t.id">{{ t.name }}</option>
        </select>
        <select v-model.number="departmentId" aria-label="Department" class="w-full sm:w-56 py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
          <option :value="0">All departments</option>
          <option v-for="d in data?.departments || []" :key="d.id" :value="d.id">{{ d.name }}</option>
        </select>
      </template>
      <StatStrip v-if="data && data.teachers.length" v-model="quick" :items="statItems" />
    </PageHeader>

    <!-- Departments: tap one to see only its teachers -->
    <section v-if="data && data.departments.length" class="mb-5">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-sm font-bold text-gray-900 dark:text-white">Departments</h2>
        <div class="flex items-center gap-3">
          <button v-if="departmentId" type="button" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline" @click="departmentId = 0">All teachers</button>
          <button v-if="sortedDepartments.length > FEW" type="button" class="hidden sm:inline text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline" @click="allDepartments = !allDepartments">
            {{ allDepartments ? 'Show fewer' : `Show all ${sortedDepartments.length}` }}
          </button>
        </div>
      </div>
      <!-- A strip to swipe through on a phone, a grid from tablet up -->
      <div class="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2.5 overflow-x-auto sm:overflow-visible snap-x -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
        <button
          v-for="d in visibleDepartments"
          :key="d.id"
          type="button"
          class="snap-start flex-shrink-0 w-60 sm:w-auto text-left rounded-xl border bg-white dark:bg-gray-800 px-3.5 py-2.5 transition-all hover:shadow-md"
          :class="departmentId === d.id ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-gray-200 dark:border-gray-700'"
          @click="departmentId = departmentId === d.id ? 0 : d.id"
        >
          <div class="flex items-center justify-between gap-2">
            <p class="font-bold text-gray-900 dark:text-white truncate">{{ d.name }}</p>
            <span
              v-if="d.follow_up"
              class="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200"
            >{{ d.follow_up }} of {{ d.teachers }} to follow up</span>
            <span v-else-if="d.teachers" class="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">On track</span>
          </div>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400 flex flex-wrap gap-x-2">
            <span>{{ d.set }} set</span>
            <span :class="d.overdue ? 'text-amber-600 dark:text-amber-300 font-semibold' : ''">{{ d.waiting }} to mark</span>
            <span :class="rateTone(d.hand_in_rate)">{{ d.hand_in_rate === null ? '–' : `${d.hand_in_rate}%` }} handed in</span>
            <span v-if="d.none_set" class="text-rose-600 dark:text-rose-300">{{ d.none_set }} set nothing</span>
          </p>
        </button>
      </div>
    </section>

    <!-- Teachers -->
    <section>
      <h2 class="text-sm font-bold text-gray-900 dark:text-white mb-2">
        Teachers<span v-if="selectedDepartment"> in {{ selectedDepartment.name }}</span>
      </h2>
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
        :empty-message="quick ? 'Nobody matches this check - good news.' : 'No teachers are in this department yet.'"
        @row-click="openTeacher"
      >
        <template #cell-name="{ row }">
          <p class="font-semibold text-gray-900 dark:text-white">{{ niceName(row.name) }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ deptNames(row) }}</p>
        </template>
        <template #cell-set="{ row }">
          <span class="tabular-nums font-semibold" :class="row.set ? 'text-gray-900 dark:text-white' : 'text-rose-600 dark:text-rose-300'">{{ row.set }}</span>
          <span v-if="row.drafts" class="text-xs text-gray-400"> +{{ row.drafts }} draft{{ row.drafts === 1 ? '' : 's' }}</span>
        </template>
        <template #cell-waiting="{ row }">
          <span v-if="!row.waiting" class="text-gray-400">0</span>
          <span v-else class="tabular-nums font-semibold" :class="row.overdue ? 'text-amber-600 dark:text-amber-300' : 'text-gray-900 dark:text-white'">
            {{ row.waiting }}<span class="text-xs font-normal text-gray-500 dark:text-gray-400"> · oldest {{ row.oldest_days }}d</span>
          </span>
        </template>
        <template #cell-hand_in_rate="{ row }">
          <span class="tabular-nums font-semibold" :class="rateTone(row.hand_in_rate)">{{ row.hand_in_rate === null ? '–' : `${row.hand_in_rate}%` }}</span>
          <span v-if="row.missing" class="text-xs text-gray-500 dark:text-gray-400"> · {{ row.missing }} missing</span>
        </template>
        <template #cell-last_seen="{ row }">
          <span :class="row.flags.includes('quiet') ? 'text-gray-400' : 'text-gray-700 dark:text-gray-200'">{{ ago(row.last_seen) }}</span>
        </template>
        <template #cell-flags="{ row }">
          <div class="flex flex-wrap gap-1">
            <span v-for="f in row.flags" :key="f" class="px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap" :class="FLAG[f as SupFlag].cls">{{ FLAG[f as SupFlag].label }}</span>
            <span v-if="!row.flags.length" class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">On track</span>
          </div>
        </template>
      </DataTable>
    </section>

    <TeacherDrawer
      v-if="openId && data?.term"
      :teacher="openRow"
      :teacher-id="openId"
      :term-id="data.term.id"
      :marking-days="data.marking_days"
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
import { usePersistedRef } from '@/composables/usePersistedRef'
import { useToastStore } from '@/stores/toast'
import { FLAG, type SupDepartment, type SupFlag, type SupTeacher } from '@/components/supervision/types'

interface SupData {
  terms: { id: number; name: string }[]
  term: { id: number; start_date: string; end_date: string } | null
  marking_days: number
  departments: SupDepartment[]
  teachers: SupTeacher[]
}

const toast = useToastStore()
const data = ref<SupData | null>(null)
const loading = ref(true)
const termId = ref(0)
const departmentId = usePersistedRef<number>('supervision:department', 0)
const quick = ref<string | null>(null)
const openId = ref(0)

const load = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/admin/supervision', { params: { term_id: termId.value || undefined } })
    data.value = res.data.data
    if (!termId.value && data.value?.term) termId.value = data.value.term.id
    if (departmentId.value && !data.value?.departments.some(d => d.id === departmentId.value)) departmentId.value = 0
  } catch (e: any) {
    toast.error(e.response?.data?.message || 'Could not load supervision')
  } finally {
    loading.value = false
  }
}
onMounted(load)
watch(termId, (_v, old) => { if (old) load() })

const selectedDepartment = computed(() => data.value?.departments.find(d => d.id === departmentId.value) || null)
// Departments needing the most follow-up first
const sortedDepartments = computed(() => [...(data.value?.departments || [])].sort((a, b) => b.follow_up - a.follow_up || b.overdue - a.overdue || a.name.localeCompare(b.name)))
// On a computer the six needing most follow-up (and the chosen one), so the teachers aren't pushed
// far down; a phone swipes through them all
const FEW = 6
const allDepartments = ref(false)
const isPhone = ref(typeof window !== 'undefined' && window.innerWidth < 640)
const visibleDepartments = computed(() => {
  const list = sortedDepartments.value
  if (allDepartments.value || isPhone.value || list.length <= FEW) return list
  const few = list.slice(0, FEW)
  const chosen = list.find(d => d.id === departmentId.value)
  return chosen && !few.includes(chosen) ? [...few, chosen] : few
})

const inDepartment = computed(() => (data.value?.teachers || []).filter(t => !departmentId.value || t.department_ids.includes(departmentId.value)))
const shown = computed(() => {
  const q = quick.value
  if (!q) return inDepartment.value
  if (q === 'follow') return inDepartment.value.filter(t => t.flags.length)
  return inDepartment.value.filter(t => t.flags.includes(q as SupFlag))
})

const statItems = computed<StatItem[]>(() => {
  const list = inDepartment.value
  const count = (f: SupFlag) => list.filter(t => t.flags.includes(f)).length
  return [
    { key: 'follow', label: 'to follow up', value: list.filter(t => t.flags.length).length, tone: 'indigo' },
    { key: 'none_set', label: 'set nothing this term', value: count('none_set'), tone: 'rose' },
    { key: 'marking', label: `with scripts over ${data.value?.marking_days ?? 7} days`, value: count('marking'), tone: 'amber' },
    { key: 'low_hand_in', label: 'with low hand-in', value: count('low_hand_in'), tone: 'amber' },
    { key: 'quiet', label: 'not signed in lately', value: count('quiet'), tone: 'gray' }
  ]
})

const columns: Column[] = [
  { key: 'name', label: 'Teacher', sortable: true, mobile: 'title' },
  { key: 'set', label: 'Assessments set', sortable: true, align: 'center', mobile: 'field' },
  { key: 'waiting', label: 'To mark', sortable: true, mobile: 'field', value: (r: SupTeacher) => r.overdue * 1000 + r.waiting },
  { key: 'hand_in_rate', label: 'Handed in', sortable: true, mobile: 'field', value: (r: SupTeacher) => r.hand_in_rate ?? 101 },
  { key: 'enotes', label: 'eNotes', sortable: true, align: 'center', mobile: 'hidden' },
  { key: 'last_seen', label: 'Last active', sortable: true, mobile: 'hidden', value: (r: SupTeacher) => r.last_seen || '' },
  { key: 'flags', label: 'Follow up', mobile: 'subtitle', value: (r: SupTeacher) => r.flags.length }
]

const deptNames = (t: SupTeacher) => t.department_ids
  .map(id => data.value?.departments.find(d => d.id === id)?.name)
  .filter(Boolean)
  .join(', ') || 'No department'

const rateTone = (rate: number | null) =>
  rate === null ? 'text-gray-400' : rate < 50 ? 'text-rose-600 dark:text-rose-300' : rate < 80 ? 'text-amber-600 dark:text-amber-300' : 'text-emerald-600 dark:text-emerald-300'

const ago = (when: string | null) => {
  if (!when) return 'Never'
  const days = Math.floor((Date.now() - new Date(when.replace(' ', 'T')).getTime()) / 86400000)
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days} days ago`
  return new Date(when.replace(' ', 'T')).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

const openRow = computed(() => data.value?.teachers.find(t => t.id === openId.value) || null)
const openTeacher = (row: SupTeacher) => { openId.value = row.id }
</script>
