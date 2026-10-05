<template>
  <!-- Who is reading, watching and turning up - module by module and student by student. Shared by
       the teacher (own classes), HOD (department) and admin (school, by department) pages. -->
  <div class="w-full">
    <PageHeader title="Engagement" :description="COPY[role].description" icon="trend" accent="sky" :active-filters="role === 'admin' && departmentId ? 1 : 0">
      <template #filters>
        <PickerDropdown v-if="role === 'admin' && departments.length" v-model="departmentId" label="Department" :options="departmentOptions" align="right" />
        <PickerDropdown v-if="classOptions.length > 1" v-model="classFilter" label="Class" :options="classOptions" align="right" />
      </template>
    </PageHeader>

    <Skeleton v-if="loading" variant="tiles" :count="5" />

    <div v-else-if="error" class="flex items-start gap-3 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 p-4">
      <AppIcon name="warning" class="w-5 h-5 text-rose-500 flex-shrink-0" />
      <p class="flex-1 text-sm text-rose-700 dark:text-rose-200">{{ error }}</p>
      <button type="button" class="text-sm font-semibold text-rose-700 dark:text-rose-200 hover:underline" @click="load">Try again</button>
    </div>

    <EmptyState v-else-if="!students.length" icon="users" tone="sky" :title="COPY[role].emptyTitle" :message="COPY[role].emptyMessage" />

    <template v-else>
      <!-- One tile per module, for the class on view; tapping one sorts the list by it -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
        <button
          v-for="m in moduleTiles"
          :key="m.key"
          type="button"
          class="text-left rounded-2xl border bg-white dark:bg-gray-800 p-3.5 transition-shadow hover:shadow-md"
          :class="sortBy === m.key ? 'border-sky-400 ring-2 ring-sky-200 dark:ring-sky-900/50' : 'border-gray-200 dark:border-gray-700'"
          :title="`Sort students by ${m.label}, least engaged first`"
          :disabled="!m.total"
          @click="sortBy = sortBy === m.key ? 'overall' : m.key"
        >
          <span class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg flex items-center justify-center" :class="m.tint"><AppIcon :name="m.icon" class="w-4 h-4" /></span>
            <span class="text-xs font-semibold text-gray-600 dark:text-gray-300">{{ m.label }}</span>
          </span>
          <span class="mt-2 block text-2xl font-bold" :class="m.pct === null ? 'text-gray-300 dark:text-gray-600' : 'text-gray-900 dark:text-white'">{{ m.pct === null ? '–' : `${m.pct}%` }}</span>
          <span class="mt-1 block h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full" :class="barColor(m.pct)" :style="{ width: `${m.pct ?? 0}%` }"></span></span>
          <span class="mt-1 block text-[11px] text-gray-500 dark:text-gray-400">{{ m.total ? `${m.engaged} / ${m.total} ${m.unit}` : 'Nothing published yet' }}</span>
        </button>
      </div>

      <!-- The quiet ones -->
      <div v-if="quietCount" class="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-900/15 px-4 py-3">
        <AppIcon name="warning" class="w-5 h-5 text-amber-600 dark:text-amber-300 flex-shrink-0 hidden sm:block" />
        <p class="flex-1 text-sm text-amber-900 dark:text-amber-100">
          <span class="font-bold">{{ quietCount }} {{ quietCount === 1 ? 'student has' : 'students have' }}</span> barely opened anything (under {{ QUIET }}% overall){{ role === 'teacher' ? ' - a message can make the difference.' : ' - worth raising with their teachers.' }}
        </p>
        <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold" :class="quietOnly ? 'bg-amber-600 text-white' : 'bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200'" @click="quietOnly = !quietOnly">
          {{ quietOnly ? 'Show everyone' : 'Show only them' }}
        </button>
      </div>

      <DataTable
        :key="`${sortBy}-${quietOnly}`"
        :columns="columns"
        :rows="rows"
        row-key="student_id"
        :search-keys="['name', 'admission_number']"
        search-placeholder="Search name or student number"
        :page-size="25"
        :initial-sort="{ key: sortBy, dir: 'asc' }"
        empty-title="No students match"
      >
        <template #cell-name="{ row }">
          <span class="block font-semibold text-gray-900 dark:text-white">{{ row.name }}</span>
          <span class="block text-[11px] font-normal text-gray-400">{{ row.admission_number }}<template v-if="!classFilter && row.class_name"> · {{ row.class_name }}</template></span>
        </template>
        <template v-for="m in activeModules" :key="m.key" #[`cell-${m.key}`]="{ row }">
          <span class="flex items-center gap-2 min-w-[5.5rem]">
            <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full" :class="barColor(row[m.key].percentage)" :style="{ width: `${row[m.key].percentage ?? 0}%` }"></span></span>
            <span class="text-[11px] tabular-nums w-9 text-right" :class="row[m.key].percentage === null ? 'text-gray-300 dark:text-gray-600' : 'text-gray-600 dark:text-gray-300'" :title="`${row[m.key].engaged} of ${row[m.key].total}`">{{ row[m.key].percentage === null ? '–' : `${row[m.key].percentage}%` }}</span>
          </span>
        </template>
        <template #cell-overall="{ row }">
          <span class="inline-flex px-2 py-0.5 rounded-full text-xs font-bold tabular-nums" :class="overallChip(row.overall)">{{ row.overall === null ? '–' : `${row.overall}%` }}</span>
        </template>
        <template v-if="role === 'teacher'" #actions="{ row }">
          <RouterLink :to="`/teacher/chat?student=${row.student_id}`" class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-900/30" :title="`Message ${row.name}`">
            <AppIcon name="chat" class="w-3.5 h-3.5" /> Message
          </RouterLink>
        </template>
      </DataTable>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import apiService from '@/services/api'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import DataTable, { type Column } from '@/components/ui/DataTable.vue'
import PickerDropdown, { type PickerOption } from '@/components/common/PickerDropdown.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import { usePersistedRef } from '@/composables/usePersistedRef'

interface ModuleStat { engaged: number; total: number; percentage: number | null }
interface StudentRow {
  student_id: number
  first_name: string
  last_name: string
  admission_number: string
  class_name: string | null
  enotes: ModuleStat
  library: ModuleStat
  itembank: ModuleStat
  videos: ModuleStat
  live_classes: ModuleStat
}
type ModuleKey = 'enotes' | 'library' | 'itembank' | 'videos' | 'live_classes'

const MODULES: { key: ModuleKey; label: string; unit: string; icon: string; tint: string }[] = [
  { key: 'enotes', label: 'eNotes', unit: 'read', icon: 'document', tint: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' },
  { key: 'library', label: 'eLibrary', unit: 'read', icon: 'book', tint: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300' },
  { key: 'itembank', label: 'Item Bank', unit: 'opened', icon: 'clipboard', tint: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300' },
  { key: 'videos', label: 'Videos', unit: 'watched', icon: 'video', tint: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300' },
  { key: 'live_classes', label: 'Live classes', unit: 'attended', icon: 'users', tint: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300' }
]
const props = withDefaults(defineProps<{ role?: 'teacher' | 'hod' | 'admin' }>(), { role: 'teacher' })

const COPY = {
  teacher: { description: 'Who is reading, watching and turning up - in your own classes. Find the quiet ones early.', emptyTitle: 'No class attached to you yet', emptyMessage: "Once you're set as a class teacher, or you set an assessment for a class, its students' engagement shows here.", all: 'All my classes' },
  hod: { description: "Who is reading, watching and turning up across your department - class by class, student by student.", emptyTitle: 'No students in the department yet', emptyMessage: 'Once students are enrolled in your department, their engagement shows here.', all: 'All classes' },
  admin: { description: 'Who is reading, watching and turning up across the school - by department, class and student.', emptyTitle: 'No students here yet', emptyMessage: 'Once students are enrolled, their engagement shows here.', all: 'All classes' }
}
const ENDPOINT = { teacher: '/teacher/analytics/engagement', hod: '/hod/analytics/engagement', admin: '/admin/analytics/engagement' }

// Under this overall share, a student counts as "quiet"
const QUIET = 25

const loading = ref(true)
const error = ref<string | null>(null)
const students = ref<StudentRow[]>([])
const classFilter = usePersistedRef<string>(`engagement:${props.role}:class`, '')
const departments = ref<{ id: number; name: string }[]>([])
const departmentId = usePersistedRef<number>('engagement:admin:department', 0)
const departmentOptions = computed<PickerOption<number>[]>(() => [{ value: 0, label: 'All departments' }, ...departments.value.map(d => ({ value: d.id, label: d.name }))])
const sortBy = ref<ModuleKey | 'overall'>('overall')
const quietOnly = ref(false)

const classOptions = computed<PickerOption<string>[]>(() => {
  const names = [...new Set(students.value.map(s => s.class_name).filter((n): n is string => !!n))]
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  return [{ value: '', label: COPY[props.role].all, hint: `${students.value.length}` }, ...names.map(n => ({ value: n, label: n, hint: `${students.value.filter(s => s.class_name === n).length}` }))]
})

// The average share across the modules a student has anything in
const overallOf = (s: StudentRow) => {
  const pcts = MODULES.map(m => s[m.key].percentage).filter((p): p is number => p !== null)
  return pcts.length ? Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length) : null
}

const inClass = computed(() => students.value.filter(s => !classFilter.value || s.class_name === classFilter.value))
const quietCount = computed(() => inClass.value.filter(s => { const o = overallOf(s); return o !== null && o < QUIET }).length)

const rows = computed(() => inClass.value
  .map(s => ({ ...s, name: niceName(`${s.first_name} ${s.last_name}`), overall: overallOf(s) }))
  .filter(r => !quietOnly.value || (r.overall !== null && r.overall < QUIET)))

// Module tiles follow the class on view
const moduleTiles = computed(() => MODULES.map(m => {
  const engaged = inClass.value.reduce((n, s) => n + s[m.key].engaged, 0)
  const total = inClass.value.reduce((n, s) => n + s[m.key].total, 0)
  return { ...m, engaged, total, pct: total ? Math.round((engaged / total) * 100) : null }
}))

const activeModules = computed(() => moduleTiles.value.filter(m => m.total > 0))

// Unknown shares sort as if lowest, so "least engaged first" puts them at the top too
const pctValue = (key: ModuleKey) => (row: any) => row[key].percentage ?? -1
const columns = computed<Column[]>(() => [
  { key: 'name', label: 'Student', sortable: true, mobile: 'title' },
  { key: 'overall', label: 'Overall', sortable: true, align: 'center', mobile: 'subtitle', value: (r: any) => r.overall ?? -1 },
  // A module with nothing published for these students has no column - it would only be dashes
  ...activeModules.value.map(m => ({ key: m.key, label: m.label, sortable: true, mobile: 'field' as const, value: pctValue(m.key) }))
])

function barColor(pct: number | null): string {
  if (pct === null) return 'bg-gray-300 dark:bg-gray-600'
  if (pct >= 75) return 'bg-emerald-500'
  if (pct >= 40) return 'bg-amber-500'
  return 'bg-rose-500'
}
const overallChip = (pct: number | null) => pct === null
  ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
  : pct >= 75 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200'
    : pct >= QUIET ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200' : 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200'

async function load() {
  loading.value = true
  error.value = null
  try {
    const response = await apiService.get(ENDPOINT[props.role], { params: props.role === 'admin' && departmentId.value ? { department_id: departmentId.value } : {} })
    if (response.data.success) {
      students.value = response.data.data.students || []
      // A remembered class that's no longer there falls back to all
      if (classFilter.value && !students.value.some(s => s.class_name === classFilter.value)) classFilter.value = ''
    } else {
      error.value = response.data.message || 'Failed to load engagement analytics'
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load engagement analytics'
  } finally {
    loading.value = false
  }
}

async function loadDepartments() {
  try {
    const response = await apiService.get('/admin/departments')
    const data = response.data.data
    departments.value = (data?.departments || data || []).map((d: any) => ({ id: Number(d.id), name: d.name }))
    if (departmentId.value && !departments.value.some(d => d.id === departmentId.value)) departmentId.value = 0
  } catch {
    departments.value = []
  }
}

watch(departmentId, () => { if (props.role === 'admin') load() })
onMounted(() => {
  if (props.role === 'admin') loadDepartments()
  load()
})
</script>
