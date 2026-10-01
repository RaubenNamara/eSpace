<template>
  <!-- One class stream's page: its students and their results, the teacher's assessments and
       eNotes for it and how the class is getting on with each, and its progress -->
  <div class="w-full">
    <RouterLink to="/teacher/classes" class="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-300 mb-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      My Classes
    </RouterLink>

    <div v-if="loading && !data" class="space-y-4">
      <Skeleton variant="text" :count="2" />
      <Skeleton variant="tiles" :count="4" />
      <Skeleton variant="table" :count="6" />
    </div>
    <EmptyState v-else-if="!data" icon="users" title="Class not found" message="It may not be one of your classes, or it no longer exists." />

    <template v-else>
      <PageHeader :title="className" :description="`${data.class.level} · ${data.summary.students} students`" icon="users">
        <template #actions>
          <RouterLink to="/teacher/assignments/create" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700">
            <AppIcon name="clipboard" class="w-4 h-4" /> New assessment
          </RouterLink>
          <RouterLink v-if="data.subject_id" :to="`/teacher/class-map?subject=${data.subject_id}&level=${encodeURIComponent(data.class.name)}&stream=${data.class.id}`" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
            <AppIcon name="map" class="w-4 h-4" /> <span class="hidden sm:inline">Learning Map</span>
          </RouterLink>
        </template>
        <StatStrip :items="summaryTiles" />
      </PageHeader>

      <!-- Tabs -->
      <div class="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4 overflow-x-auto [scrollbar-width:none]">
        <button
          v-for="t in TABS"
          :key="t.key"
          type="button"
          class="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors"
          :class="tab === t.key ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'"
          @click="tab = t.key"
        >
          {{ t.label }}<span v-if="t.count !== undefined" class="ml-1 text-xs font-medium text-gray-400">{{ t.count }}</span>
        </button>
      </div>

      <!-- Students -->
      <DataTable
        v-if="tab === 'students'"
        :columns="studentColumns"
        :rows="data.students"
        row-key="student_id"
        :search-keys="['name', 'admission_number']"
        search-placeholder="Search students…"
        :page-size="25"
        :initial-sort="{ key: 'name', dir: 'asc' }"
        row-clickable
        empty-title="No students in this class"
        @row-click="openStudent"
      >
        <template #toolbar>
          <button v-if="selected.length" type="button" class="px-3 py-2 rounded-lg text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700" @click="deEnrollSelected">De-enroll {{ selected.length }}</button>
          <label class="inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 cursor-pointer select-none">
            <input type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" :checked="allSelected" @change="toggleAll">
            Select all
          </label>
        </template>
        <template #cell-pick="{ row }">
          <input type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" :checked="selected.includes(row.enrollment_id)" @click.stop @change="toggle(row.enrollment_id)">
        </template>
        <template #cell-name="{ row }">
          <span class="inline-flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-full text-[11px] font-bold flex items-center justify-center flex-shrink-0" :class="row.gender === 'female' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-200' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'">{{ initials(row.name) }}</span>
            <span class="font-semibold text-gray-900 dark:text-white">{{ niceName(row.name) }}</span>
          </span>
        </template>
        <template #cell-average="{ value }">
          <span v-if="value === null" class="text-gray-400">–</span>
          <span v-else class="font-semibold" :class="value >= 60 ? 'text-emerald-700 dark:text-emerald-300' : value >= 50 ? 'text-amber-700 dark:text-amber-300' : 'text-rose-600 dark:text-rose-300'">{{ value }}%</span>
        </template>
        <template #cell-outcomes="{ row }">
          <span v-if="!row.outcomes_assessed" class="text-gray-400">–</span>
          <span v-else>{{ row.outcomes_achieved }}/{{ row.outcomes_assessed }}</span>
        </template>
        <template #cell-improvement="{ value }">
          <span v-if="value === null" class="text-gray-400">–</span>
          <span v-else class="font-semibold" :class="value >= 0 ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'">{{ value > 0 ? '+' : '' }}{{ value }}%</span>
        </template>
        <template #cell-last_active="{ value }">
          <span class="text-gray-500 dark:text-gray-400">{{ value ? timeAgo(value) : 'Not yet' }}</span>
        </template>
      </DataTable>

      <!-- Assessments -->
      <div v-else-if="tab === 'assessments'">
        <EmptyState v-if="!data.assessments.length" icon="clipboard" title="No assessments for this class yet" message="Assessments you set for this stream (or all its class's streams) appear here with how the class is getting on.">
          <RouterLink to="/teacher/assignments/create" class="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700">New assessment</RouterLink>
        </EmptyState>
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div v-for="a in data.assessments" :key="a.id" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
            <div class="flex items-start gap-2">
              <div class="min-w-0 flex-1">
                <p class="text-[10px] font-bold uppercase tracking-wider" :class="a.status === 'published' ? 'text-indigo-600 dark:text-indigo-300' : 'text-gray-400'">{{ a.category || 'Assessment' }} · {{ a.status }}</p>
                <p class="text-sm font-bold text-gray-900 dark:text-white truncate">{{ niceName(a.title) }}</p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ a.due_date ? `Due ${new Date(a.due_date.replace(' ', 'T')).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}` : 'No due date' }}</p>
              </div>
              <RouterLink v-if="a.waiting" :to="`/teacher/assignments/${a.id}/submissions`" class="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700">Mark {{ a.waiting }}</RouterLink>
              <RouterLink v-else :to="`/teacher/assignments/${a.id}/submissions`" class="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Open</RouterLink>
            </div>
            <div class="mt-3 space-y-2">
              <div>
                <div class="flex justify-between text-[11px] mb-1"><span class="text-gray-500 dark:text-gray-400">Submitted</span><span class="font-semibold text-gray-700 dark:text-gray-200">{{ a.submitted }}/{{ data.summary.students }}</span></div>
                <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><div class="h-full bg-indigo-500 rounded-full" :style="{ width: `${pct(a.submitted, data.summary.students)}%` }"></div></div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] mb-1"><span class="text-gray-500 dark:text-gray-400">Marked</span><span class="font-semibold text-gray-700 dark:text-gray-200">{{ a.marked }}/{{ a.submitted }}</span></div>
                <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><div class="h-full bg-emerald-500 rounded-full" :style="{ width: `${pct(a.marked, a.submitted)}%` }"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- eNotes -->
      <div v-else-if="tab === 'enotes'">
        <EmptyState v-if="!data.enotes.length" icon="book" title="No eNotes for this class yet" message="eNotes you write for this stream appear here with how many students have read them.">
          <RouterLink to="/teacher/enotes" class="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700">Go to eNotes</RouterLink>
        </EmptyState>
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div v-for="t in data.enotes" :key="t.id" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 flex items-center justify-center flex-shrink-0"><AppIcon name="book" class="w-5 h-5" /></div>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-bold text-gray-900 dark:text-white truncate">{{ niceName(t.title) }}</p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ t.pages }} pages · {{ t.status }}</p>
              </div>
              <button type="button" class="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="insightsFor = t.id">Insights</button>
            </div>
            <div class="mt-3">
              <div class="flex justify-between text-[11px] mb-1"><span class="text-gray-500 dark:text-gray-400">Finished reading</span><span class="font-semibold text-gray-700 dark:text-gray-200">{{ t.finished }}/{{ data.summary.students }} <span class="font-normal text-gray-400">· {{ t.opened }} opened</span></span></div>
              <div class="relative h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div class="absolute inset-y-0 left-0 bg-emerald-200 dark:bg-emerald-900/50" :style="{ width: `${pct(t.opened, data.summary.students)}%` }"></div>
                <div class="absolute inset-y-0 left-0 bg-emerald-500 rounded-full" :style="{ width: `${pct(t.finished, data.summary.students)}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col items-center text-center">
          <div class="relative w-28 h-28">
            <svg class="w-28 h-28 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke-width="3.5" class="stroke-gray-100 dark:stroke-gray-700" />
              <circle v-if="data.summary.achieved_percent !== null" cx="18" cy="18" r="15.5" fill="none" stroke-width="3.5" stroke-linecap="round" stroke="#10b981" :stroke-dasharray="`${data.summary.achieved_percent * 0.974} 97.4`" />
            </svg>
            <span class="absolute inset-0 flex items-center justify-center text-2xl font-extrabold text-gray-900 dark:text-white">{{ data.summary.achieved_percent === null ? '–' : `${data.summary.achieved_percent}%` }}</span>
          </div>
          <p class="mt-2 text-sm font-semibold text-gray-900 dark:text-white">Outcome results achieved</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ data.summary.assessed_students }} of {{ data.summary.students }} students have returned results</p>
          <RouterLink v-if="data.subject_id" :to="`/teacher/class-map?subject=${data.subject_id}&level=${encodeURIComponent(data.class.name)}&stream=${data.class.id}`" class="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Open the Class Learning Map →</RouterLink>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
          <p class="text-sm font-bold text-gray-900 dark:text-white mb-3">Most improved</p>
          <p v-if="!improvers.length" class="text-xs text-gray-400">Appears once students have at least two returned results.</p>
          <ol v-else class="space-y-2">
            <li v-for="(s, i) in improvers" :key="s.student_id" class="flex items-center gap-2 text-sm">
              <span class="w-5 text-xs font-bold text-emerald-600">{{ i + 1 }}</span>
              <span class="flex-1 min-w-0 truncate text-gray-900 dark:text-white">{{ niceName(s.name) }}</span>
              <span class="text-xs font-semibold text-emerald-700 dark:text-emerald-300">+{{ s.improvement }}%</span>
            </li>
          </ol>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
          <p class="text-sm font-bold text-gray-900 dark:text-white mb-3">Needs support</p>
          <p v-if="!strugglers.length" class="text-xs text-gray-400">No one's average is below 50% - or no results are back yet.</p>
          <ol v-else class="space-y-2">
            <li v-for="s in strugglers" :key="s.student_id">
              <button type="button" class="w-full flex items-center gap-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700/40 rounded-lg px-1 -mx-1" @click="openStudent(s)">
                <span class="flex-1 min-w-0 truncate text-gray-900 dark:text-white">{{ niceName(s.name) }}</span>
                <span class="text-xs font-semibold text-rose-600 dark:text-rose-300">{{ s.average }}%</span>
              </button>
            </li>
          </ol>
          <RouterLink v-if="data.subject_id && strugglers.length" :to="`/teacher/class-map?subject=${data.subject_id}&level=${encodeURIComponent(data.class.name)}&stream=${data.class.id}`" class="mt-3 inline-block text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Create a support group →</RouterLink>
        </div>
      </div>
    </template>

    <StudentPanel v-if="student" :student="student" :class-name="className" @close="student = null" @report="reportFor = student.student_id" @de-enroll="deEnrollOne" />
    <CompetencyReportDialog v-if="reportFor" :url="`/api/teacher/students/${reportFor}/competency-report`" @close="reportFor = null" />
    <ENoteInsightsModal v-if="insightsFor" :topic-id="insightsFor" @close="insightsFor = null" @open-page="(pageId: number) => router.push(`/teacher/enotes/builder/${insightsFor}?page=${pageId}`)" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import apiService from '@/services/api'
import AppIcon from '@/components/common/AppIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import DataTable, { type Column } from '@/components/ui/DataTable.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import StudentPanel, { type ClassStudent } from '@/components/classes/StudentPanel.vue'
import CompetencyReportDialog from '@/components/learningmap/CompetencyReportDialog.vue'
import ENoteInsightsModal from '@/components/enotes/ENoteInsightsModal.vue'
import { initials, niceName, timeAgo } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { usePersistedRef } from '@/composables/usePersistedRef'

interface Detail {
  class: { id: number; name: string; level: string; stream_name: string | null }
  subject_id: number | null
  summary: { students: number; achieved_percent: number | null; need_support: number; assessed_students: number; to_mark: number }
  students: ClassStudent[]
  assessments: { id: number; title: string; category: string | null; status: string; due_date: string | null; submitted: number; marked: number; waiting: number }[]
  enotes: { id: number; title: string; status: string; pages: number; opened: number; finished: number }[]
}

const route = useRoute()
const router = useRouter()
const toast = useToastStore()
const confirm = useConfirmStore()

const data = ref<Detail | null>(null)
const loading = ref(true)
const tab = usePersistedRef<'students' | 'assessments' | 'enotes' | 'progress'>('class-detail:tab', 'students')
const student = ref<ClassStudent | null>(null)
const reportFor = ref<number | null>(null)
const insightsFor = ref<number | null>(null)
const selected = ref<number[]>([])

const className = computed(() => (data.value ? `${data.value.class.name}${data.value.class.stream_name ? `-${data.value.class.stream_name}` : ''}` : ''))
const pct = (n: number, of: number) => (of ? Math.min(100, n / of * 100) : 0)

const TABS = computed(() => [
  { key: 'students' as const, label: 'Students', count: data.value?.students.length },
  { key: 'assessments' as const, label: 'Assessments', count: data.value?.assessments.length },
  { key: 'enotes' as const, label: 'eNotes', count: data.value?.enotes.length },
  { key: 'progress' as const, label: 'Progress', count: undefined }
])

const summaryTiles = computed<StatItem[]>(() => {
  const s = data.value?.summary
  return [
    { label: 'Students', value: s?.students ?? 0, tone: 'indigo' },
    { label: 'Outcomes achieved', value: s?.achieved_percent === null || s?.achieved_percent === undefined ? '–' : `${s.achieved_percent}%`, tone: 'emerald', hint: s?.achieved_percent === null ? 'no results yet' : undefined },
    { label: 'Need support', value: s?.need_support ?? 0, tone: 'rose', hint: 'average below 50%' },
    { label: 'To mark', value: s?.to_mark ?? 0, tone: 'amber' }
  ]
})

const studentColumns: Column[] = [
  { key: 'pick', label: '', mobile: 'hidden', headerClass: 'w-10' },
  { key: 'name', label: 'Student', sortable: true, mobile: 'title' },
  { key: 'admission_number', label: 'Admission', sortable: true, mobile: 'subtitle' },
  { key: 'average', label: 'Average', sortable: true, align: 'right' },
  { key: 'outcomes', label: 'Outcomes', align: 'right', value: (r: ClassStudent) => r.outcomes_achieved },
  { key: 'submissions', label: 'Submitted', sortable: true, align: 'right', mobile: 'hidden' },
  { key: 'improvement', label: 'Growth', sortable: true, align: 'right', mobile: 'hidden' },
  { key: 'last_active', label: 'Last active', sortable: true, align: 'right', mobile: 'hidden' }
]

const improvers = computed(() => (data.value?.students ?? []).filter(s => s.improvement !== null && s.improvement > 0).sort((a, b) => (b.improvement ?? 0) - (a.improvement ?? 0)).slice(0, 5))
const strugglers = computed(() => (data.value?.students ?? []).filter(s => s.average !== null && s.average < 50).sort((a, b) => (a.average ?? 0) - (b.average ?? 0)).slice(0, 6))

const allSelected = computed(() => !!data.value?.students.length && selected.value.length === data.value.students.length)
const toggle = (id: number) => { selected.value = selected.value.includes(id) ? selected.value.filter(x => x !== id) : [...selected.value, id] }
const toggleAll = () => { selected.value = allSelected.value ? [] : (data.value?.students ?? []).map(s => s.enrollment_id) }

const openStudent = (s: ClassStudent) => { student.value = s }

const load = async () => {
  loading.value = true
  try {
    const response = await apiService.get(`/teacher/classes/${route.params.id}/detail`, { params: route.query.year ? { academic_year: route.query.year } : {} })
    data.value = response.data?.data ?? null
  } catch {
    data.value = null
  } finally {
    loading.value = false
  }
}

const deEnroll = async (ids: number[], names: string) => {
  const ok = await confirm.open({
    title: ids.length === 1 ? 'De-enroll student' : `De-enroll ${ids.length} students`,
    message: `De-enroll ${names} from your account?\n\nThey'll lose access to your assessments, eNotes and other content, but stay enrolled with every other teacher in the department.`,
    confirmLabel: 'De-enroll',
    danger: true
  })
  if (!ok) return
  const results = await Promise.allSettled(ids.map(id => apiService.delete(`/teacher/students/${id}`, { data: {} })))
  const failed = results.filter(r => r.status === 'rejected').length
  if (failed) toast.error(`${failed} could not be de-enrolled`)
  else toast.success(ids.length === 1 ? 'Student de-enrolled' : `${ids.length} students de-enrolled`)
  selected.value = []
  student.value = null
  load()
}
const deEnrollSelected = () => deEnroll(selected.value, `${selected.value.length} students`)
const deEnrollOne = () => { if (student.value) deEnroll([student.value.enrollment_id], niceName(student.value.name)) }

watch(() => route.params.id, () => { if (route.params.id) load() })
onMounted(load)
</script>
