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
            <AppIcon name="download" class="w-4 h-4" /> Download Excel
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
      <div class="mb-3 flex flex-wrap items-center gap-2">
        <input v-model="search" type="search" placeholder="Search assessment, subject, class or teacher" class="flex-1 min-w-[12rem] sm:max-w-sm px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <PickerDropdown v-if="role !== 'teacher' && departmentOptions.length > 2" v-model="departmentFilter" label="Department" :options="departmentOptions" align="right" />
        <label class="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300 cursor-pointer select-none">
          <input v-model="onlyMarked" type="checkbox" class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"> With marks only
        </label>
      </div>

      <Skeleton v-if="loading" variant="table" :count="6" />
      <div v-else-if="error" class="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-200">{{ error }}</div>
      <EmptyState v-else-if="!shownAssessments.length" compact icon="clipboard" tone="gray" :title="assessments.length ? 'No assessments match' : 'No assessments yet'" :message="assessments.length ? 'Try another search.' : 'Once assessments are set and marked, their marksheets appear here.'" />
      <div v-else class="space-y-5">
        <section v-for="group in groups" :key="group.name">
          <h3 v-if="role !== 'teacher'" class="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{{ group.name }} <span class="font-normal">· {{ group.items.length }}</span></h3>
          <ul class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
            <li v-for="a in group.items" :key="a.id">
              <button type="button" class="w-full flex flex-wrap sm:flex-nowrap items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/40" @click="open(a.id)">
                <span class="min-w-0 flex-1">
                  <span class="block font-semibold text-gray-900 dark:text-white truncate">{{ a.title }}</span>
                  <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">
                    {{ [a.subject_name, a.class_label, role !== 'teacher' ? a.teacher_name : null, a.set_at ? fmtDate(a.set_at) : null].filter(Boolean).join(' · ') }}
                  </span>
                </span>
                <span class="flex items-center gap-4 flex-shrink-0 text-xs tabular-nums">
                  <span class="text-gray-500 dark:text-gray-400"><b class="text-gray-900 dark:text-white">{{ a.marked }}</b> marked of {{ a.handed_in }}</span>
                  <span class="w-14 text-right" :class="pctTone(a.average)">{{ a.average === null ? '-' : `${fmtMarks(a.average)}%` }}</span>
                  <span class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold">Open</span>
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
const fmtDate = (s: string) => new Date(s.replace(' ', 'T')).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })

// ---- the list ----
const assessments = ref<AssessmentItem[]>([])
const loading = ref(true)
const error = ref('')
const search = ref('')
const departmentFilter = ref('')
const onlyMarked = ref(false)

const departmentOptions = computed<PickerOption<string>[]>(() => {
  const names = [...new Set(assessments.value.map(a => a.department_name || 'No department'))].sort()
  return [{ value: '', label: 'All departments' }, ...names.map(n => ({ value: n, label: n }))]
})
const shownAssessments = computed(() => {
  const q = search.value.trim().toLowerCase()
  return assessments.value.filter(a =>
    (!departmentFilter.value || (a.department_name || 'No department') === departmentFilter.value) &&
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
const shownRows = computed(() => {
  const q = rowSearch.value.trim().toLowerCase()
  return (sheet.value?.rows ?? []).filter(r =>
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

/** The whole sheet (every learner, not just the filtered ones) as an Excel file */
function downloadExcel() {
  const s = sheet.value
  if (!s) return
  const a = s.assessment
  const header = ['No.', 'Learner', 'Student number', 'Class', ...s.questions.map(q => `${q.label} (/${fmtMarks(q.marks)})`), `Total (/${fmtMarks(a.total_marks)})`, '%', 'Grade', 'Status']
  const rows = s.rows.map((r, i) => [
    i + 1, niceName(r.name), r.admission_number || '', r.class_label || '',
    ...r.questions.map(m => (m === null ? '' : m)),
    r.score === null ? '' : r.score, r.percentage === null ? '' : r.percentage, r.grade || '', STATUS[r.status].label
  ])
  const sheetRows = [
    [a.title],
    [[a.subject_name, a.class_label, a.teacher_name, a.department_name].filter(Boolean).join(' · ')],
    [`Learners: ${s.stats.learners}   Handed in: ${s.stats.handed_in}   Marked: ${s.stats.marked}   Average: ${s.stats.average === null ? '-' : s.stats.average + '%'}`],
    [],
    header,
    ...rows
  ]
  const ws = XLSX.utils.aoa_to_sheet(sheetRows)
  ws['!cols'] = header.map((h, i) => ({ wch: i === 1 ? 28 : i === 2 ? 16 : i === 3 ? 10 : Math.max(8, String(h).length + 2) }))
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Marksheet')
  const safe = `${a.title} ${a.class_label}`.replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80)
  XLSX.writeFile(wb, `Marksheet - ${safe}.xlsx`)
}

watch(openId, id => { if (id) loadSheet(id) }, { immediate: true })
onMounted(loadList)
</script>
