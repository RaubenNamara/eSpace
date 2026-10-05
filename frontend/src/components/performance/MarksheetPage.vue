<template>
  <!-- Marksheets (teacher, HOD and admin): every learner's marks on each published assessment of a
       class and subject, their average and grade - opens on a class straight away, never blank -->
  <div class="w-full">
    <PageHeader title="Marksheets" description="Every learner's marks on each assessment, their average and grade - ready to download." icon="clipboard" accent="emerald">
      <template #actions>
        <button
          v-if="selectedClassId && selectedSubjectId"
          type="button"
          class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-500/20"
          @click="downloadCsv"
        >
          <AppIcon name="download" class="w-4 h-4" />
          <span class="hidden sm:inline">Download CSV</span><span class="sm:hidden">CSV</span>
        </button>
      </template>
      <template #filters>
        <PickerDropdown v-if="termOptions.length" v-model="termPick" label="Term" :options="termOptions" align="right" />
        <PickerDropdown v-if="classOptions.length" v-model="selectedClassId" label="Class" :options="classOptions" align="right" />
        <PickerDropdown v-if="subjectOptions.length" v-model="selectedSubjectId" label="Subject" :options="subjectOptions" align="right" />
      </template>
      <StatStrip v-if="marksheet && marksheet.rows.length && marksheet.assignments.length" :items="statItems" />
    </PageHeader>

    <div v-if="error" class="mb-4 flex items-start gap-3 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 p-3">
      <AppIcon name="warning" class="w-5 h-5 text-rose-500 flex-shrink-0" />
      <p class="flex-1 text-sm text-rose-700 dark:text-rose-200">{{ error }}</p>
    </div>

    <Skeleton v-if="booting || loading" variant="table" :count="8" />
    <EmptyState v-else-if="!classOptions.length || !subjectOptions.length" icon="clipboard" tone="emerald" title="Nothing to show yet" message="Marksheets appear for the classes and subjects you teach." />

    <template v-else-if="marksheet">
      <EmptyState v-if="!marksheet.assignments.length" compact icon="clipboard" tone="gray" title="No published assessments yet" :message="`Once an assessment for this class and subject${selectedTermId ? ' in this term' : ''} is published and marked, its marks show here.`" />

      <template v-else>
        <!-- Grade spread -->
        <div v-if="gradeTotal" class="mb-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <p class="text-xs font-bold text-gray-900 dark:text-white mb-2">Grade spread</p>
          <div class="flex h-3 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
            <span v-for="g in gradeKeys" :key="g" :class="GRADE_BG[g] || 'bg-gray-400'" :style="{ width: `${gradeCounts[g] / gradeTotal * 100}%` }" :title="`${g}: ${gradeCounts[g]}`"></span>
          </div>
          <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <button v-for="g in gradeKeys" :key="g" type="button" class="inline-flex items-center gap-1.5 text-[11px]" :class="gradeFilter === g ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'" @click="gradeFilter = gradeFilter === g ? null : g">
              <span class="w-2.5 h-2.5 rounded-sm" :class="GRADE_BG[g] || 'bg-gray-400'"></span>{{ g }} <span class="text-gray-400">{{ gradeCounts[g] }}</span>
            </button>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
          <input v-model="search" type="search" placeholder="Search learner or student number" class="flex-1 sm:max-w-xs px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <div class="sm:ml-auto flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 self-start">
            <button v-for="o in SORTS" :key="o.key" type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap" :class="sort === o.key ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'" @click="sort = o.key">{{ o.label }}</button>
          </div>
        </div>

        <!-- The sheet: names stay put while the marks scroll sideways -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm border-separate border-spacing-0">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-700/60">
                  <th class="sticky left-0 z-10 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 min-w-[11rem]">Learner</th>
                  <th v-for="a in marksheet.assignments" :key="a.id" class="px-2 py-2.5 text-center text-[11px] font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 min-w-[6.5rem] max-w-[9rem]" :title="a.title">
                    <span class="block truncate">{{ a.title }}</span>
                    <span class="block font-normal text-gray-400">/ {{ Number(a.total_marks) }}</span>
                  </th>
                  <th class="px-3 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">Average</th>
                  <th class="px-3 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in visibleRows" :key="row.student_id" class="group">
                  <td class="sticky left-0 z-10 bg-white dark:bg-gray-800 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/60 px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                    <button type="button" class="text-left" :title="`${row.first_name} ${row.last_name}: performance`" @click="viewStudent(row)">
                      <span class="block font-semibold text-gray-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-300 whitespace-nowrap">{{ niceName(`${row.first_name} ${row.last_name}`) }}</span>
                      <span class="block text-[11px] text-gray-400">{{ row.admission_number }}</span>
                    </button>
                  </td>
                  <td v-for="cell in row.cells" :key="cell.assignment_id" class="px-1.5 py-1.5 text-center border-b border-gray-100 dark:border-gray-700">
                    <span v-if="cell.score !== null" class="inline-flex flex-col items-center justify-center min-w-[3.5rem] px-2 py-1 rounded-lg" :class="heat(cell.percentage)">
                      <span class="text-sm font-semibold tabular-nums">{{ Number(cell.score) }}</span>
                      <span class="text-[10px] opacity-75 tabular-nums">{{ cell.percentage }}%</span>
                    </span>
                    <span v-else class="text-gray-300 dark:text-gray-600">–</span>
                  </td>
                  <td class="px-3 py-2 text-center border-b border-gray-100 dark:border-gray-700 font-bold tabular-nums text-gray-900 dark:text-white">
                    {{ row.avg_percentage !== null ? `${row.avg_percentage}%` : '–' }}
                  </td>
                  <td class="px-3 py-2 text-center border-b border-gray-100 dark:border-gray-700">
                    <span v-if="row.grade" class="inline-flex items-center justify-center w-7 h-7 rounded-lg font-extrabold text-white text-xs" :class="GRADE_BG[row.grade] || 'bg-gray-400'">{{ row.grade }}</span>
                    <span v-else class="text-gray-300 dark:text-gray-600">–</span>
                  </td>
                </tr>
                <tr v-if="!shownRows.length">
                  <td :colspan="marksheet.assignments.length + 3" class="px-3 py-10 text-center text-sm text-gray-400">
                    {{ marksheet.rows.length ? 'No learners match.' : 'No students found in this class.' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button v-if="shownRows.length > visibleRows.length" type="button" class="mt-3 w-full py-2 rounded-xl text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30" @click="limit = Infinity">
          Show all {{ shownRows.length }} learners
        </button>
        <p class="mt-2 text-[11px] text-gray-400">Tap a learner's name for their full performance.</p>
      </template>
    </template>

    <StudentPerformanceModal
      v-if="activeStudent"
      :student-id="activeStudent.student_id"
      :student-name="`${activeStudent.first_name} ${activeStudent.last_name}`"
      :term-id="selectedTermId"
      @close="activeStudent = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import { useClassSubjectPicker } from '@/composables/useClassSubjectPicker'
import StudentPerformanceModal from './StudentPerformanceModal.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import PickerDropdown, { type PickerOption } from '@/components/common/PickerDropdown.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import type { Marksheet, MarksheetRow } from '@/types/performance'

// Term / Class / Subject - shared with Physical Exams, remembered per page and role
const {
  roleBase, termId: selectedTermId, classId: selectedClassId, subjectId: selectedSubjectId,
  termOptions: realTermOptions, classOptions, subjectOptions, load: loadChoices, rememberChoice
} = useClassSubjectPicker('marksheet')

const marksheet = ref<Marksheet | null>(null)
const booting = ref(true)
const loading = ref(false)
const error = ref<string | null>(null)

const activeStudent = ref<MarksheetRow | null>(null)
const search = ref('')
const gradeFilter = ref<string | null>(null)
const SORTS = [
  { key: 'name' as const, label: 'A–Z' },
  { key: 'high' as const, label: 'Highest' },
  { key: 'low' as const, label: 'Lowest' }
]
const sort = ref<'name' | 'high' | 'low'>('name')

const GRADE_BG: Record<string, string> = { A: 'bg-emerald-500', B: 'bg-sky-500', C: 'bg-amber-400', D: 'bg-orange-500', E: 'bg-rose-500', F: 'bg-rose-600' }

// Each mark tinted by how it went
const heat = (pct: number | null) => {
  if (pct === null) return ''
  if (pct >= 70) return 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/25 dark:text-emerald-200'
  if (pct >= 50) return 'bg-amber-50 text-amber-800 dark:bg-amber-900/25 dark:text-amber-200'
  return 'bg-rose-50 text-rose-700 dark:bg-rose-900/25 dark:text-rose-200'
}

// 0 stands for "All terms" in the picker
const termPick = computed<number>({
  get: () => selectedTermId.value ?? 0,
  set: (v) => { selectedTermId.value = v || null }
})
const termOptions = computed<PickerOption<number>[]>(() => [...realTermOptions.value, { value: 0, label: 'All terms' }])

const gradeCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const r of marksheet.value?.rows ?? []) if (r.grade) counts[r.grade] = (counts[r.grade] || 0) + 1
  return counts
})
const gradeKeys = computed(() => Object.keys(gradeCounts.value).sort())
const gradeTotal = computed(() => Object.values(gradeCounts.value).reduce((a, b) => a + b, 0))

const statItems = computed<StatItem[]>(() => {
  const rows = marksheet.value?.rows ?? []
  const avgs = rows.map(r => r.avg_percentage).filter((v): v is number => v !== null)
  const mean = avgs.length ? Math.round(avgs.reduce((a, b) => a + Number(b), 0) / avgs.length) : null
  return [
    { label: 'Learners', value: rows.length, tone: 'gray' },
    { label: 'Assessments', value: marksheet.value?.assignments.length ?? 0, tone: 'sky' },
    { label: 'Class average', value: mean === null ? '–' : `${mean}%`, tone: 'emerald' },
    { label: 'With marks', value: avgs.length, tone: 'violet', hint: `of ${rows.length}` }
  ]
})

const shownRows = computed(() => {
  const q = search.value.trim().toLowerCase()
  const rows = (marksheet.value?.rows ?? []).filter(r =>
    (!q || `${r.first_name} ${r.last_name} ${r.admission_number}`.toLowerCase().includes(q)) &&
    (!gradeFilter.value || r.grade === gradeFilter.value))
  const avg = (r: MarksheetRow) => (r.avg_percentage === null ? null : Number(r.avg_percentage))
  if (sort.value === 'name') return [...rows].sort((a, b) => `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`))
  // Learners with no marks yet go last either way
  return [...rows].sort((a, b) => {
    const x = avg(a), y = avg(b)
    if (x === null) return y === null ? 0 : 1
    if (y === null) return -1
    return sort.value === 'high' ? y - x : x - y
  })
})

// A long class shows 40 at first (the CSV always has everyone)
const limit = ref(40)
watch([search, gradeFilter, sort], () => { limit.value = 40 })
const visibleRows = computed(() => shownRows.value.slice(0, limit.value))

const loadMarksheet = async () => {
  if (!selectedClassId.value || !selectedSubjectId.value) {
    marksheet.value = null
    return
  }
  rememberChoice()
  loading.value = true
  error.value = null
  gradeFilter.value = null
  limit.value = 40
  try {
    const params: Record<string, number> = { class_id: selectedClassId.value, subject_id: selectedSubjectId.value }
    if (selectedTermId.value) params.term_id = selectedTermId.value
    const res = await axios.get(`/api/${roleBase()}/performance/marksheet`, { params })
    marksheet.value = res.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load marksheet'
    marksheet.value = null
  } finally {
    loading.value = false
  }
}

const downloadCsv = () => {
  if (!selectedClassId.value || !selectedSubjectId.value) return
  const params = new URLSearchParams({
    class_id: String(selectedClassId.value),
    subject_id: String(selectedSubjectId.value),
  })
  if (selectedTermId.value) params.set('term_id', String(selectedTermId.value))
  window.location.href = `${import.meta.env.BASE_URL}api/${roleBase()}/performance/marksheet/download?${params.toString()}`
}

const viewStudent = (row: MarksheetRow) => {
  activeStudent.value = row
}

watch([selectedClassId, selectedSubjectId, selectedTermId], loadMarksheet)

onMounted(async () => {
  try {
    await loadChoices()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load classes and subjects'
  } finally {
    booting.value = false
  }
})
</script>
