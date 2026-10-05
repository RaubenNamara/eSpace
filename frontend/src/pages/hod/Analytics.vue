<template>
  <!-- How the department is doing: the headline figures, the score trend, where submissions stand,
       subjects and teachers side by side, and what's being read in the library. -->
  <div class="w-full">
    <PageHeader title="Analytics" :description="overview.department ? `${overview.department.name} - scores, submissions, teachers and reading, all in one place.` : 'Scores, submissions, teachers and reading for your department.'" icon="chart" accent="indigo">
      <StatStrip :items="statItems" />
    </PageHeader>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <section class="panel">
        <h3 class="panel-title">Average score, last 6 months</h3>
        <div class="h-60">
          <Skeleton v-if="loading.performance" class="h-full w-full rounded-xl" />
          <Line v-else-if="performanceTrend.length" :data="performanceChartData" :options="lineOptions" />
          <EmptyState v-else compact :card="false" icon="trend" tone="gray" title="No marked work yet" message="The trend starts once teachers return marked scripts." />
        </div>
      </section>
      <section class="panel">
        <h3 class="panel-title">Where submissions stand</h3>
        <div class="h-60">
          <Skeleton v-if="loading.overview" class="h-full w-full rounded-xl" />
          <Doughnut v-else-if="statusBreakdown.length" :data="statusChartData" :options="doughnutOptions" />
          <EmptyState v-else compact :card="false" icon="clipboard" tone="gray" title="No submissions yet" />
        </div>
      </section>
      <section class="panel">
        <h3 class="panel-title">Average score by subject</h3>
        <div class="h-60">
          <Skeleton v-if="loading.assignments" class="h-full w-full rounded-xl" />
          <Bar v-else-if="subjectsWithData.length" :data="subjectChartData" :options="chartOptions" />
          <EmptyState v-else compact :card="false" icon="book" tone="gray" title="No marked work yet" />
        </div>
      </section>
      <section class="panel">
        <h3 class="panel-title">Assessments set per teacher</h3>
        <div class="h-60">
          <Skeleton v-if="loading.teachers" class="h-full w-full rounded-xl" />
          <Bar v-else-if="teachers.length" :data="teacherChartData" :options="horizontalChartOptions" />
          <EmptyState v-else compact :card="false" icon="teacher" tone="gray" title="No teachers in this department" />
        </div>
      </section>
    </div>

    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Teacher by teacher</h3>
    <DataTable
      class="mb-4"
      :columns="teacherColumns"
      :rows="teacherRows"
      :loading="loading.teachers"
      :search-keys="['name']"
      search-placeholder="Search teachers"
      :page-size="20"
      :initial-sort="{ key: 'assignments_count', dir: 'desc' }"
      empty-title="No teachers in this department"
    >
      <template #cell-submissions_pending="{ row }">
        <span class="font-semibold tabular-nums" :class="row.submissions_pending > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400 dark:text-gray-500'">{{ row.submissions_pending }}</span>
      </template>
      <template #cell-average_percentage="{ row }">
        <span v-if="row.average_percentage !== null" class="flex items-center gap-2 min-w-[120px]">
          <span class="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <span class="block h-full rounded-full" :class="row.average_percentage >= 60 ? 'bg-emerald-500' : 'bg-amber-500'" :style="{ width: Math.min(100, row.average_percentage) + '%' }"></span>
          </span>
          <span class="font-semibold tabular-nums text-gray-900 dark:text-white">{{ Math.round(row.average_percentage) }}%</span>
        </span>
        <span v-else class="text-gray-400 dark:text-gray-500">-</span>
      </template>
    </DataTable>

    <section class="panel">
      <div class="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <h3 class="panel-title !mb-0">Library reading</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400"><b class="text-gray-900 dark:text-white">{{ reading.books_count ?? 0 }}</b> books · <b class="text-gray-900 dark:text-white">{{ reading.readers_count ?? 0 }}</b> readers</p>
      </div>
      <Skeleton v-if="loading.reading" class="h-24 w-full rounded-xl" />
      <EmptyState v-else-if="!reading.top_books?.length" compact :card="false" icon="book" tone="gray" title="No reading yet" message="Books your students open in the eLibrary show up here." />
      <ol v-else class="divide-y divide-gray-100 dark:divide-gray-700/60">
        <li v-for="(book, i) in reading.top_books" :key="book.id" class="flex items-center gap-3 py-2">
          <span class="w-6 text-xs font-semibold text-gray-400 tabular-nums">{{ i + 1 }}</span>
          <span class="flex-1 min-w-0">
            <span class="block text-sm font-medium text-gray-900 dark:text-white truncate">{{ book.title }}</span>
            <span v-if="book.author" class="block text-xs text-gray-500 dark:text-gray-400 truncate">{{ book.author }}</span>
          </span>
          <span class="text-xs text-gray-600 dark:text-gray-300 tabular-nums whitespace-nowrap">{{ book.readers_count }} reader{{ book.readers_count === 1 ? '' : 's' }}</span>
        </li>
      </ol>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Bar, Doughnut, Line } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, LineElement, PointElement,
  CategoryScale, LinearScale, ArcElement
} from 'chart.js'
import apiService from '@/services/api'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import DataTable, { type Column } from '@/components/ui/DataTable.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import { niceName } from '@/components/dashboard/teacher/time'

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale, ArcElement)

interface StatusCount { status: string; count: number }
interface TeacherStat {
  id: number
  first_name: string
  last_name: string
  assignments_count: number
  total_submissions: number
  submissions_marked: number
  submissions_pending: number
  students_reached: number
  average_percentage: number | null
}
interface SubjectStat { id: number; name: string; assignment_count: number; submission_count: number; average_percentage: number | null }
interface TrendPoint { month: string; average_percentage: number; submission_count: number }
interface TopBook { id: number; title: string; author: string | null; readers_count: number }

const loading = ref({ overview: true, teachers: true, assignments: true, performance: true, reading: true })

const overview = ref<{
  department: { id: number; name: string; code: string; description: string } | null
  teachers_count: number | null
  students_count: number | null
  subjects_count: number | null
  assignments_count: number | null
  average_percentage: number | null
}>({
  department: null,
  teachers_count: null,
  students_count: null,
  subjects_count: null,
  assignments_count: null,
  average_percentage: null
})
const statusBreakdown = ref<StatusCount[]>([])
const teachers = ref<TeacherStat[]>([])
const subjects = ref<SubjectStat[]>([])
const performanceTrend = ref<TrendPoint[]>([])
const reading = ref<{ books_count: number; readers_count: number; top_books: TopBook[] }>({
  books_count: 0,
  readers_count: 0,
  top_books: []
})

const STATUS_LABELS: Record<string, string> = {
  in_progress: 'In Progress',
  submitted: 'Submitted',
  marking: 'Marking',
  graded: 'Graded',
  returned: 'Returned'
}

const fig = (v: number | null | undefined) => (loading.value.overview ? '…' : v ?? '-')
const statItems = computed<StatItem[]>(() => [
  { label: 'Teachers', value: fig(overview.value.teachers_count), tone: 'indigo' },
  { label: 'Students', value: fig(overview.value.students_count), tone: 'sky' },
  { label: 'Subjects', value: fig(overview.value.subjects_count), tone: 'violet' },
  { label: 'Assessments', value: fig(overview.value.assignments_count), tone: 'amber' },
  { label: 'Average score', value: loading.value.overview ? '…' : overview.value.average_percentage != null ? `${Math.round(overview.value.average_percentage)}%` : '-', tone: 'emerald' }
])

const teacherColumns: Column[] = [
  { key: 'name', label: 'Teacher', sortable: true, mobile: 'title' },
  { key: 'assignments_count', label: 'Assessments', sortable: true, align: 'center' },
  { key: 'total_submissions', label: 'Submissions', sortable: true, align: 'center' },
  { key: 'submissions_marked', label: 'Marked', sortable: true, align: 'center' },
  { key: 'submissions_pending', label: 'To mark', sortable: true, align: 'center' },
  { key: 'students_reached', label: 'Students reached', sortable: true, align: 'center' },
  { key: 'average_percentage', label: 'Average', sortable: true, value: (r: TeacherStat) => r.average_percentage ?? -1 }
]
const teacherRows = computed(() => teachers.value.map(t => ({ ...t, name: niceName(`${t.first_name} ${t.last_name}`) })))

const STATUS_COLORS: Record<string, string> = { in_progress: '#CBD5E1', submitted: '#38BDF8', marking: '#FBBF24', graded: '#34D399', returned: '#818CF8' }

const subjectsWithData = computed(() => subjects.value.filter(s => s.average_percentage !== null))

const statusChartData = computed(() => ({
  labels: statusBreakdown.value.map(s => STATUS_LABELS[s.status] || (s.status ? s.status.replace('_', ' ') : 'Not started')),
  datasets: [{
    data: statusBreakdown.value.map(s => s.count),
    backgroundColor: statusBreakdown.value.map(s => STATUS_COLORS[s.status] || '#CBD5E1'),
    borderWidth: 0
  }]
}))

const performanceChartData = computed(() => ({
  labels: performanceTrend.value.map(p => p.month),
  datasets: [{
    label: 'Average Score (%)',
    data: performanceTrend.value.map(p => p.average_percentage),
    borderColor: '#6366F1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    fill: true,
    tension: 0.3
  }]
}))

const subjectChartData = computed(() => ({
  labels: subjectsWithData.value.map(s => s.name),
  datasets: [{
    label: 'Average Score (%)',
    data: subjectsWithData.value.map(s => s.average_percentage),
    backgroundColor: '#34D399',
    borderRadius: 6,
    maxBarThickness: 56
  }]
}))

const teacherChartData = computed(() => ({
  labels: teachers.value.map(t => niceName(`${t.first_name} ${t.last_name}`)),
  datasets: [{
    label: 'Assignments',
    data: teachers.value.map(t => t.assignments_count),
    backgroundColor: '#818CF8',
    borderRadius: 6,
    maxBarThickness: 22
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, grid: { display: true, color: 'rgba(148, 163, 184, 0.15)' } },
    x: { grid: { display: false } }
  }
}

const horizontalChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
  plugins: { legend: { display: false } },
  scales: {
    x: { beginAtZero: true, grid: { display: true, color: 'rgba(148, 163, 184, 0.15)' } },
    y: { grid: { display: false } }
  }
}

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, max: 100, grid: { display: true, color: 'rgba(148, 163, 184, 0.15)' } },
    x: { grid: { display: false } }
  }
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '62%',
  plugins: { legend: { display: true, position: 'bottom' as const, labels: { boxWidth: 10, color: '#94A3B8' } } }
}

async function loadOverview() {
  loading.value.overview = true
  try {
    const response = await apiService.get('/hod/analytics')
    if (response.data.success) {
      overview.value = response.data.data
      statusBreakdown.value = response.data.data.submission_status_breakdown || []
    }
  } catch (err) {
    console.error('Failed to load analytics overview:', err)
  } finally {
    loading.value.overview = false
  }
}

async function loadTeachers() {
  loading.value.teachers = true
  try {
    const response = await apiService.get('/hod/analytics/teachers')
    if (response.data.success) teachers.value = response.data.data.teachers || []
  } catch (err) {
    console.error('Failed to load teacher analytics:', err)
  } finally {
    loading.value.teachers = false
  }
}

async function loadAssignments() {
  loading.value.assignments = true
  try {
    const response = await apiService.get('/hod/analytics/assignments')
    if (response.data.success) subjects.value = response.data.data.subjects || []
  } catch (err) {
    console.error('Failed to load assignment analytics:', err)
  } finally {
    loading.value.assignments = false
  }
}

async function loadPerformance() {
  loading.value.performance = true
  try {
    const response = await apiService.get('/hod/analytics/performance')
    if (response.data.success) performanceTrend.value = response.data.data.trend || []
  } catch (err) {
    console.error('Failed to load performance trend:', err)
  } finally {
    loading.value.performance = false
  }
}

async function loadReading() {
  loading.value.reading = true
  try {
    const response = await apiService.get('/hod/analytics/reading')
    if (response.data.success) reading.value = response.data.data
  } catch (err) {
    console.error('Failed to load reading analytics:', err)
  } finally {
    loading.value.reading = false
  }
}

onMounted(() => {
  loadOverview()
  loadTeachers()
  loadAssignments()
  loadPerformance()
  loadReading()
})
</script>

<style scoped>
.panel { @apply rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5; }
.panel-title { @apply text-sm font-semibold text-gray-900 dark:text-white mb-3; }
</style>
