<template>
  <!-- Marksheets by assessment: a teacher's own assessments, a HOD's department, or (admin) every
       department. Open one for every learner's marks, question by question, and download it as Excel. -->
  <div class="w-full">
    <!-- one assessment's sheet -->
    <template v-if="openId">
      <button type="button" class="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" @click="close">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        All assessments
      </button>

      <Skeleton v-if="sheetLoading" variant="table" :count="8" />
      <div v-else-if="sheetError" class="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-200">{{ sheetError }}</div>
      <template v-else-if="sheet">
        <div class="mb-4 flex flex-wrap items-start gap-3">
          <div class="min-w-0 flex-1">
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{{ sheet.assessment.title }}</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ [sheet.assessment.subject_name, sheet.assessment.class_label, role !== 'teacher' ? sheet.assessment.teacher_name : null, `out of ${fmtMarks(sheet.assessment.total_marks)}`].filter(Boolean).join(' · ') }}
            </p>
          </div>
          <button type="button" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm" @click="downloadExcel">
            <AppIcon name="download" class="w-4 h-4" /> Download Excel{{ classFilter ? ` - ${classFilter}` : '' }}
          </button>
        </div>

        <div class="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div v-for="st in sheetStats" :key="st.label" class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
            <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ st.label }}</p>
            <p class="text-lg font-bold tabular-nums text-gray-900 dark:text-white">{{ st.value }}</p>
          </div>
        </div>

        <div class="mb-3 flex flex-wrap items-center gap-2">
          <input v-model="rowSearch" type="search" placeholder="Search learner or student number" class="flex-1 min-w-[12rem] sm:max-w-xs px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <PickerDropdown v-if="sheetClassOptions.length > 2" v-model="classFilter" label="Class" :options="sheetClassOptions" />
          <div class="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800">
            <button v-for="f in ROW_FILTERS" :key="f.key" type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap" :class="rowFilter === f.key ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'" @click="rowFilter = f.key">{{ f.label }}</button>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm border-separate border-spacing-0">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-700/60 text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th class="sticky left-0 z-10 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-left font-bold border-b border-gray-200 dark:border-gray-700 min-w-[12rem]">Learner</th>
                  <th class="px-2 py-2.5 text-left font-bold border-b border-gray-200 dark:border-gray-700">Class</th>
                  <th v-for="q in sheet.questions" :key="q.id" class="px-2 py-2.5 text-center font-bold border-b border-gray-200 dark:border-gray-700 whitespace-nowrap">{{ q.label }}<span class="block font-normal normal-case">/ {{ fmtMarks(q.marks) }}</span></th>
                  <th class="px-2 py-2.5 text-center font-bold border-b border-gray-200 dark:border-gray-700">Total<span class="block font-normal normal-case">/ {{ fmtMarks(sheet.assessment.total_marks) }}</span></th>
                  <th class="px-2 py-2.5 text-center font-bold border-b border-gray-200 dark:border-gray-700">%</th>
                  <th class="px-2 py-2.5 text-center font-bold border-b border-gray-200 dark:border-gray-700">Grade</th>
                  <th class="px-3 py-2.5 text-left font-bold border-b border-gray-200 dark:border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in shownRows" :key="r.student_id" class="group">
                  <td class="sticky left-0 z-10 bg-white dark:bg-gray-800 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/60 px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                    <span class="block font-semibold text-gray-900 dark:text-white whitespace-nowrap">{{ niceName(r.name) }}</span>
                    <span class="block text-[11px] text-gray-400">{{ r.admission_number }}</span>
                  </td>
                  <td class="px-2 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 whitespace-nowrap">{{ r.class_label || '-' }}</td>
                  <td v-for="(m, i) in r.questions" :key="i" class="px-2 py-2 text-center tabular-nums border-b border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-200">{{ m === null ? '-' : fmtMarks(m) }}</td>
                  <td class="px-2 py-2 text-center font-bold tabular-nums border-b border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white">{{ r.score === null ? '-' : fmtMarks(r.score) }}</td>
                  <td class="px-2 py-2 text-center tabular-nums border-b border-gray-100 dark:border-gray-700" :class="pctTone(r.percentage)">{{ r.percentage === null ? '-' : `${fmtMarks(r.percentage)}%` }}</td>
                  <td class="px-2 py-2 text-center border-b border-gray-100 dark:border-gray-700">
                    <span v-if="r.grade" class="inline-flex items-center justify-center w-7 h-7 rounded-lg font-extrabold text-white text-xs" :class="GRADE_BG[r.grade] || 'bg-gray-400'">{{ r.grade }}</span>
                    <span v-else class="text-gray-300 dark:text-gray-600">-</span>
                  </td>
                  <td class="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                    <span class="inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap" :class="STATUS[r.status].cls">{{ STATUS[r.status].label }}</span>
                  </td>
                </tr>
                <tr v-if="!shownRows.length">
                  <td :colspan="sheet.questions.length + 6" class="px-3 py-10 text-center text-sm text-gray-400">No learners match.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </template>

    <!-- the list of assessments -->
    <template v-else>
      <!-- At a glance -->
      <div v-if="!loading && !error && assessments.length" class="mb-4 grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div v-for="t in listStats" :key="t.label" class="flex items-center gap-2.5 rounded-xl border border-gray-200/80 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 shadow-sm min-w-0">
          <span class="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center" :class="t.tone"><AppIcon :name="t.icon" class="w-4 h-4" /></span>
          <div class="min-w-0">
            <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 truncate">{{ t.label }}</p>
            <p class="text-base font-bold leading-tight text-gray-900 dark:text-white tabular-nums truncate">{{ t.value }}</p>
          </div>
        </div>
      </div>

      <!-- Search, filters, and the whole lot as one Excel file -->
      <div class="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-gray-200/80 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 shadow-sm">
        <div class="relative flex-1 min-w-[12rem] sm:max-w-sm">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="search" type="search" placeholder="Search assessment, subject, class or teacher" class="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <PickerDropdown v-if="listClassOptions.length > 2" v-model="classFilter" :options="listClassOptions" align="right" />
        <PickerDropdown v-if="role !== 'teacher' && departmentOptions.length > 2" v-model="departmentFilter" :options="departmentOptions" align="right" />
        <button
          type="button"
          class="inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition"
          :class="onlyMarked ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200' : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
          :aria-pressed="onlyMarked"
          @click="onlyMarked = !onlyMarked"
        >
          <span class="w-3.5 h-3.5 rounded flex items-center justify-center border" :class="onlyMarked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-400'">
            <svg v-if="onlyMarked" class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
          </span>
          With marks only
        </button>
        <button
          type="button"
          class="sm:ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm disabled:opacity-60 disabled:cursor-wait"
          :disabled="!!exporting || !shownAssessments.length"
          :title="`Every assessment listed below in one Excel file: a summary, every learner's marks side by side, and a sheet for each assessment`"
          @click="downloadAll"
        >
          <AppIcon name="download" class="w-4 h-4" />
          <template v-if="exporting">Preparing {{ exporting.done }} of {{ exporting.total }}...</template>
          <template v-else>Download all ({{ shownAssessments.length }})</template>
        </button>
      </div>

      <Skeleton v-if="loading" variant="table" :count="6" />
      <div v-else-if="error" class="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-200">{{ error }}</div>
      <EmptyState v-else-if="!shownAssessments.length" compact icon="clipboard" tone="gray" :title="assessments.length ? 'No assessments match' : 'No assessments yet'" :message="assessments.length ? 'Try another search.' : 'Once assessments are set and marked, their marksheets appear here.'" />
      <div v-else class="space-y-5">
        <section v-for="group in groups" :key="group.name">
          <h3 v-if="role !== 'teacher'" class="mb-2 flex items-center gap-2 text-sm font-bold text-indigo-800 dark:text-indigo-300">
            <span class="w-1.5 h-4 rounded-full bg-indigo-600"></span>{{ group.name }}
            <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ group.items.length }}</span>
          </h3>
          <ul class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700 shadow-sm overflow-hidden divide-y divide-gray-100 dark:divide-gray-700">
            <li v-for="a in group.items" :key="a.id">
              <button type="button" class="group w-full flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 px-4 py-3 text-left hover:bg-emerald-50/40 dark:hover:bg-gray-700/40 transition-colors" @click="open(a.id)">
                <!-- the average, at a glance -->
                <span class="w-12 h-12 flex-shrink-0 rounded-xl flex flex-col items-center justify-center" :class="avgTile(a.average)">
                  <span class="text-sm font-extrabold tabular-nums leading-none">{{ a.average === null ? '-' : `${Math.round(a.average)}` }}</span>
                  <span class="text-[9px] font-semibold opacity-80">{{ a.average === null ? 'no marks' : '% avg' }}</span>
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block font-semibold text-gray-900 dark:text-white truncate">{{ a.title }}</span>
                  <span class="mt-1 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span v-if="a.subject_name" class="px-1.5 py-0.5 rounded-md font-bold bg-indigo-50 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200">{{ a.subject_name }}</span>
                    <span class="text-gray-500 dark:text-gray-400 truncate">{{ [a.class_label, role !== 'teacher' ? a.teacher_name : null, a.set_at ? fmtDate(a.set_at) : null].filter(Boolean).join(' · ') }}</span>
                  </span>
                </span>
                <!-- how far marking has got -->
                <span class="w-full sm:w-44 flex-shrink-0">
                  <span class="flex items-baseline justify-between text-[11px] text-gray-500 dark:text-gray-400">
                    <span><b class="text-gray-900 dark:text-white tabular-nums">{{ a.marked }}</b> of {{ a.handed_in }} marked</span>
                    <span v-if="a.handed_in" class="tabular-nums">{{ Math.round((a.marked / a.handed_in) * 100) }}%</span>
                  </span>
                  <span class="mt-1 block h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <span class="block h-full rounded-full" :class="a.handed_in && a.marked >= a.handed_in ? 'bg-emerald-500' : 'bg-amber-400'" :style="{ width: `${a.handed_in ? (a.marked / a.handed_in) * 100 : 0}%` }"></span>
                  </span>
                </span>
                <span class="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-emerald-600 text-emerald-700 dark:text-emerald-300 text-xs font-semibold group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  Open
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                </span>
              </button>
            </li>
          </ul>
        </section>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import * as XLSX from 'xlsx'
import AppIcon from '@/components/common/AppIcon.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import PickerDropdown, { type PickerOption } from '@/components/common/PickerDropdown.vue'
import { useAuthStore } from '@/stores/auth'
import { niceName } from '@/components/dashboard/teacher/time'
import { fmtMarks } from '@/utils/marks'

type Status = 'not_started' | 'in_progress' | 'handed_in' | 'marked' | 'returned'
interface AssessmentItem {
  id: number; title: string; status: string; total_marks: number; due_date: string | null; set_at: string | null
  class_label: string; subject_name: string | null; department_id: number | null; department_name: string | null
  teacher_name: string; handed_in: number; marked: number; average: number | null
}
interface SheetRow {
  student_id: number; name: string; admission_number: string | null; class_label: string | null; status: Status
  submitted_at: string | null; questions: (number | null)[]; score: number | null; percentage: number | null; grade: string | null
}
interface Sheet {
  assessment: { id: number; title: string; total_marks: number; due_date: string | null; class_label: string; subject_name: string | null; department_name: string | null; teacher_name: string }
  questions: { id: number; label: string; marks: number }[]
  rows: SheetRow[]
  stats: { learners: number; handed_in: number; marked: number; average: number | null; highest: number | null; lowest: number | null }
}

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const role = computed(() => (auth.userRole === 'teacher' ? 'teacher' : auth.userRole === 'hod' ? 'hod' : 'admin'))
const api = (path = '') => `/api/${role.value}/marksheets${path}`

const STATUS: Record<Status, { label: string; cls: string }> = {
  not_started: { label: 'Not started', cls: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300' },
  in_progress: { label: 'Started', cls: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200' },
  handed_in: { label: 'To mark', cls: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  marked: { label: 'Marked', cls: 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300' },
  returned: { label: 'Returned', cls: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' }
}
const GRADE_BG: Record<string, string> = { A: 'bg-emerald-500', B: 'bg-indigo-500', C: 'bg-amber-400', D: 'bg-orange-500', E: 'bg-rose-500', F: 'bg-rose-600' }
const pctTone = (p: number | null) => (p === null ? 'text-gray-400' : p >= 70 ? 'text-emerald-700 dark:text-emerald-300 font-semibold' : p >= 50 ? 'text-amber-700 dark:text-amber-300 font-semibold' : 'text-rose-700 dark:text-rose-300 font-semibold')
// the average tile on each row
const avgTile = (p: number | null) => (p === null ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-400'
  : p >= 70 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
  : p >= 50 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
  : 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200')
const fmtDate = (s: string) => new Date(s.replace(' ', 'T')).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })

// ---- the list ----
const assessments = ref<AssessmentItem[]>([])
const loading = ref(true)
const error = ref('')
const search = ref('')
const departmentFilter = ref('')
// Class: a level ("S.2") or one stream ("S.2-East"); kept when a sheet is opened from the list
const classFilter = ref('')
const levelOf = (label: string) => (label === 'Whole department' ? label : label.split(/[\s-]/)[0])
const inClass = (label: string | null, f: string) => !f || label === f || (!!label && levelOf(label) === f)
const byLabel = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true })
const listClassOptions = computed<PickerOption<string>[]>(() => {
  const levels = [...new Set(assessments.value.map(a => levelOf(a.class_label || '')).filter(l => l && l !== 'Whole department'))].sort(byLabel)
  return [{ value: '', label: 'All classes' }, ...levels.map(l => ({ value: l, label: l }))]
})
const onlyMarked = ref(false)

const departmentOptions = computed<PickerOption<string>[]>(() => {
  const names = [...new Set(assessments.value.map(a => a.department_name || 'No department'))].sort()
  return [{ value: '', label: 'All departments' }, ...names.map(n => ({ value: n, label: n }))]
})
const shownAssessments = computed(() => {
  const q = search.value.trim().toLowerCase()
  return assessments.value.filter(a =>
    (!departmentFilter.value || (a.department_name || 'No department') === departmentFilter.value) &&
    (!classFilter.value || a.class_label === 'Whole department' || levelOf(a.class_label || '') === levelOf(classFilter.value)) &&
    (!onlyMarked.value || a.marked > 0) &&
    (!q || [a.title, a.subject_name, a.class_label, a.teacher_name].some(t => (t || '').toLowerCase().includes(q))))
})
const groups = computed(() => {
  const map = new Map<string, AssessmentItem[]>()
  for (const a of shownAssessments.value) {
    const k = role.value === 'teacher' ? '' : (a.department_name || 'No department')
    if (!map.has(k)) map.set(k, [])
    map.get(k)!.push(a)
  }
  return [...map.entries()].sort(([x], [y]) => x.localeCompare(y)).map(([name, items]) => ({ name, items }))
})

const listStats = computed(() => {
  const list = shownAssessments.value
  const marked = list.reduce((n, a) => n + a.marked, 0)
  const handed = list.reduce((n, a) => n + a.handed_in, 0)
  const withAvg = list.filter(a => a.average !== null)
  const avg = withAvg.length ? Math.round(withAvg.reduce((n, a) => n + Number(a.average), 0) / withAvg.length) : null
  return [
    { label: 'Assessments', value: list.length, icon: 'clipboard', tone: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' },
    { label: 'Scripts handed in', value: handed, icon: 'document', tone: 'bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300' },
    { label: 'Scripts marked', value: marked, icon: 'check-circle', tone: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300' },
    { label: 'Average mark', value: avg === null ? '-' : `${avg}%`, icon: 'chart', tone: 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300' }
  ]
})

async function loadList() {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(api())
    assessments.value = res.data.data.assessments || []
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Could not load the marksheets'
  } finally {
    loading.value = false
  }
}

// ---- one sheet (?assessment=ID keeps it in the address, so Back works) ----
const openId = computed(() => Number(route.query.assessment) || 0)
const sheet = ref<Sheet | null>(null)
const sheetLoading = ref(false)
const sheetError = ref('')
const rowSearch = ref('')
const ROW_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'marked', label: 'Marked' },
  { key: 'tomark', label: 'To mark' },
  { key: 'out', label: 'Not handed in' }
] as const
const rowFilter = ref<(typeof ROW_FILTERS)[number]['key']>('all')

const open = (id: number) => router.push({ query: { ...route.query, assessment: String(id) } })
const close = () => {
  const { assessment: _a, ...rest } = route.query
  router.push({ query: rest })
}

const sheetStats = computed(() => {
  const s = sheet.value?.stats
  if (!s) return []
  const pct = (v: number | null) => (v === null ? '-' : `${fmtMarks(v)}%`)
  return [
    { label: 'Learners', value: s.learners },
    { label: 'Handed in', value: s.handed_in },
    { label: 'Marked', value: s.marked },
    { label: 'Average', value: pct(s.average) }
  ]
})
const sheetClassOptions = computed<PickerOption<string>[]>(() => {
  const streams = [...new Set((sheet.value?.rows ?? []).map(r => r.class_label).filter((l): l is string => !!l))].sort(byLabel)
  const opts: PickerOption<string>[] = [{ value: '', label: 'All classes' }]
  for (const level of [...new Set(streams.map(levelOf))]) {
    const mine = streams.filter(st => levelOf(st) === level)
    if (mine.length > 1) opts.push({ value: level, label: `${level} - all streams` })
    opts.push(...mine.filter(st => mine.length === 1 || st !== level).map(st => ({ value: st, label: st })))
  }
  // a class chosen on the list that this sheet doesn't have
  if (classFilter.value && !opts.some(o => o.value === classFilter.value)) opts.push({ value: classFilter.value, label: classFilter.value })
  return opts
})
const classRows = computed(() => (sheet.value?.rows ?? []).filter(r => inClass(r.class_label, classFilter.value)))
const shownRows = computed(() => {
  const q = rowSearch.value.trim().toLowerCase()
  return classRows.value.filter(r =>
    (rowFilter.value === 'all' ||
      (rowFilter.value === 'marked' && (r.status === 'marked' || r.status === 'returned')) ||
      (rowFilter.value === 'tomark' && r.status === 'handed_in') ||
      (rowFilter.value === 'out' && (r.status === 'not_started' || r.status === 'in_progress'))) &&
    (!q || `${r.name} ${r.admission_number || ''}`.toLowerCase().includes(q)))
})

async function loadSheet(id: number) {
  sheet.value = null
  sheetError.value = ''
  if (!id) return
  sheetLoading.value = true
  rowSearch.value = ''
  rowFilter.value = 'all'
  try {
    const res = await axios.get(api(`/${id}`))
    sheet.value = res.data.data
  } catch (e: any) {
    sheetError.value = e.response?.data?.message || 'Could not load this marksheet'
  } finally {
    sheetLoading.value = false
  }
}

/** One assessment laid out for Excel: its title lines, then a row per learner */
function sheetToRows(s: Sheet) {
  const a = s.assessment
  const header = ['No.', 'Learner', 'Student number', 'Class', ...s.questions.map(q => `${q.label} (/${fmtMarks(q.marks)})`), `Total (/${fmtMarks(a.total_marks)})`, '%', 'Grade', 'Status']
  const rows = s.rows.filter(r => inClass(r.class_label, classFilter.value)).map((r, i) => [
    i + 1, niceName(r.name), r.admission_number || '', r.class_label || '',
    ...r.questions.map(m => (m === null ? '' : m)),
    r.score === null ? '' : r.score, r.percentage === null ? '' : r.percentage, r.grade || '', STATUS[r.status].label
  ])
  const aoa = [
    [a.title],
    [[a.subject_name, classFilter.value || a.class_label, a.teacher_name, a.department_name].filter(Boolean).join(' · ')],
    [`Learners: ${s.stats.learners}   Handed in: ${s.stats.handed_in}   Marked: ${s.stats.marked}   Average: ${s.stats.average === null ? '-' : s.stats.average + '%'}`],
    [],
    header,
    ...rows
  ]
  const ws = XLSX.utils.aoa_to_sheet(aoa)
  ws['!cols'] = header.map((h, i) => ({ wch: i === 1 ? 28 : i === 2 ? 16 : i === 3 ? 10 : Math.max(8, String(h).length + 2) }))
  return ws
}
const safeName = (t: string) => t.replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80)

/** The whole sheet (every learner in the chosen class, whatever the other filters) as an Excel file */
function downloadExcel() {
  const s = sheet.value
  if (!s) return
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, sheetToRows(s), 'Marksheet')
  XLSX.writeFile(wb, `Marksheet - ${safeName(`${s.assessment.title} ${classFilter.value || s.assessment.class_label}`)}.xlsx`)
}

// ---- Download all: every assessment in the list, in one workbook ----
const exporting = ref<{ done: number; total: number } | null>(null)
async function downloadAll() {
  const list = [...shownAssessments.value]
  if (!list.length || exporting.value) return
  exporting.value = { done: 0, total: list.length }
  const sheets: (Sheet | null)[] = new Array(list.length).fill(null)
  // a few at a time, so a big school doesn't send hundreds of requests at once
  let next = 0
  const worker = async () => {
    while (next < list.length) {
      const i = next++
      try {
        sheets[i] = (await axios.get(api(`/${list[i].id}`))).data.data
      } catch {
        sheets[i] = null
      }
      if (exporting.value) exporting.value.done++
    }
  }
  try {
    await Promise.all(Array.from({ length: Math.min(4, list.length) }, worker))
    const got = sheets.map((sh, i) => ({ sh, item: list[i] })).filter((x): x is { sh: Sheet; item: AssessmentItem } => !!x.sh)
    if (!got.length) throw new Error('none')
    const wb = XLSX.utils.book_new()
    const label = (x: { sh: Sheet; item: AssessmentItem }) => `${x.sh.assessment.title}${x.item.set_at ? ` (${fmtDate(x.item.set_at)})` : ''}`

    // 1. Summary: one row per assessment
    const summary = [
      ['Marksheets', '', '', '', '', '', '', '', '', '', '', ''],
      [`${got.length} assessments · downloaded ${new Date().toLocaleString()}`],
      [],
      ['No.', 'Assessment', 'Subject', 'Class', 'Teacher', 'Department', 'Date set', 'Out of', 'Learners', 'Handed in', 'Marked', 'Average %'],
      ...got.map((x, i) => [
        i + 1, x.sh.assessment.title, x.sh.assessment.subject_name || '', x.sh.assessment.class_label, x.sh.assessment.teacher_name,
        x.sh.assessment.department_name || '', x.item.set_at ? fmtDate(x.item.set_at) : '', Number(x.sh.assessment.total_marks),
        x.sh.stats.learners, x.sh.stats.handed_in, x.sh.stats.marked, x.sh.stats.average === null ? '' : x.sh.stats.average
      ])
    ]
    const ws1 = XLSX.utils.aoa_to_sheet(summary)
    ws1['!cols'] = [6, 36, 14, 16, 22, 18, 14, 8, 9, 10, 8, 10].map(wch => ({ wch }))
    XLSX.utils.book_append_sheet(wb, ws1, 'Summary')

    // 2. All marks: every learner, their mark on each assessment side by side, and their average
    const learners = new Map<number, { name: string; adm: string; cls: string; marks: (number | '')[]; pcts: number[] }>()
    got.forEach((x, col) => {
      for (const r of x.sh.rows) {
        if (!inClass(r.class_label, classFilter.value)) continue
        if (!learners.has(r.student_id)) learners.set(r.student_id, { name: niceName(r.name), adm: r.admission_number || '', cls: r.class_label || '', marks: new Array(got.length).fill(''), pcts: [] })
        const l = learners.get(r.student_id)!
        if (!l.cls && r.class_label) l.cls = r.class_label
        if (r.score !== null) l.marks[col] = r.score
        if (r.percentage !== null) l.pcts.push(Number(r.percentage))
      }
    })
    const people = [...learners.values()].sort((a, b) => a.cls.localeCompare(b.cls) || a.name.localeCompare(b.name))
    const allHeader = ['No.', 'Learner', 'Student number', 'Class', ...got.map(x => `${label(x)} (/${fmtMarks(x.sh.assessment.total_marks)})`), 'Average %']
    const ws2 = XLSX.utils.aoa_to_sheet([
      allHeader,
      ...people.map((l, i) => [i + 1, l.name, l.adm, l.cls, ...l.marks, l.pcts.length ? Math.round((l.pcts.reduce((n, p) => n + p, 0) / l.pcts.length) * 10) / 10 : ''])
    ])
    ws2['!cols'] = allHeader.map((h, i) => ({ wch: i === 1 ? 28 : i === 2 ? 16 : i === 3 ? 10 : i === 0 ? 6 : Math.min(30, Math.max(10, String(h).length / 2)) }))
    XLSX.utils.book_append_sheet(wb, ws2, 'All marks')

    // 3. One sheet per assessment, question by question
    const used = new Set(['Summary', 'All marks'])
    got.forEach((x, i) => {
      let name = `${i + 1}. ${x.sh.assessment.title}`.replace(/[\\/:*?[\]]+/g, ' ').slice(0, 31).trim()
      while (used.has(name)) name = `${name.slice(0, 28)}~${i}`
      used.add(name)
      XLSX.utils.book_append_sheet(wb, sheetToRows(x.sh), name)
    })

    const scope = [role.value === 'teacher' ? 'My assessments' : departmentFilter.value || 'All departments', classFilter.value].filter(Boolean).join(' ')
    XLSX.writeFile(wb, `Marksheets - ${safeName(scope)} - ${new Date().toISOString().slice(0, 10)}.xlsx`)
  } catch {
    error.value = 'Could not prepare the marksheets. Please try again.'
  } finally {
    exporting.value = null
  }
}

watch(openId, id => { if (id) loadSheet(id) }, { immediate: true })
onMounted(loadList)
</script>
