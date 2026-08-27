<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
    </div>

    <!-- Department Info -->
    <div v-if="overview.department" class="card mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-indigo-100 text-sm font-medium">Department</p>
          <h2 class="text-2xl font-bold">{{ overview.department.name }}</h2>
          <p class="text-indigo-200 text-sm">{{ overview.department.code }} - {{ overview.department.description }}</p>
        </div>
        <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div class="card">
        <p class="text-gray-500 dark:text-gray-400 text-sm">Teachers</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ overview.teachers_count ?? '-' }}</p>
      </div>
      <div class="card">
        <p class="text-gray-500 dark:text-gray-400 text-sm">Students</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ overview.students_count ?? '-' }}</p>
      </div>
      <div class="card">
        <p class="text-gray-500 dark:text-gray-400 text-sm">Subjects</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ overview.subjects_count ?? '-' }}</p>
      </div>
      <div class="card">
        <p class="text-gray-500 dark:text-gray-400 text-sm">Assignments</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ overview.assignments_count ?? '-' }}</p>
      </div>
      <div class="card">
        <p class="text-gray-500 dark:text-gray-400 text-sm">Average Score</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ overview.average_percentage !== null && overview.average_percentage !== undefined ? overview.average_percentage + '%' : 'N/A' }}
        </p>
      </div>
    </div>

    <!-- Performance Trend & Submission Status -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Average Score Trend (last 6 months)</h3>
        <div class="h-64">
          <Line v-if="!loading.performance && performanceTrend.length > 0" :data="performanceChartData" :options="lineOptions" />
          <div v-else-if="loading.performance" class="flex items-center justify-center h-full text-gray-500">Loading...</div>
          <div v-else class="flex items-center justify-center h-full text-gray-500">No graded submissions yet</div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Submission Status</h3>
        <div class="h-64">
          <Doughnut v-if="!loading.overview && statusBreakdown.length > 0" :data="statusChartData" :options="doughnutOptions" />
          <div v-else-if="loading.overview" class="flex items-center justify-center h-full text-gray-500">Loading...</div>
          <div v-else class="flex items-center justify-center h-full text-gray-500">No submissions yet</div>
        </div>
      </div>
    </div>

    <!-- Assignments by Subject & Teacher Workload -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Average Score by Subject</h3>
        <div class="h-64">
          <Bar v-if="!loading.assignments && subjectsWithData.length > 0" :data="subjectChartData" :options="chartOptions" />
          <div v-else-if="loading.assignments" class="flex items-center justify-center h-full text-gray-500">Loading...</div>
          <div v-else class="flex items-center justify-center h-full text-gray-500">No graded submissions yet</div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Assignments Set per Teacher</h3>
        <div class="h-64">
          <Bar v-if="!loading.teachers && teachers.length > 0" :data="teacherChartData" :options="horizontalChartOptions" />
          <div v-else-if="loading.teachers" class="flex items-center justify-center h-full text-gray-500">Loading...</div>
          <div v-else class="flex items-center justify-center h-full text-gray-500">No teachers in this department</div>
        </div>
      </div>
    </div>

    <!-- Per-Teacher Breakdown -->
    <div class="card mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Teacher Breakdown</h3>
      <div v-if="loading.teachers" class="text-gray-500 py-6 text-center">Loading...</div>
      <div v-else-if="teachers.length === 0" class="text-gray-500 py-6 text-center">No teachers in this department</div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Teacher</th>
              <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Assignments</th>
              <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Submissions</th>
              <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Marked</th>
              <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Pending</th>
              <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Students Reached</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Average Score</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="t in teachers" :key="t.id">
              <td class="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">{{ t.first_name }} {{ t.last_name }}</td>
              <td class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 text-right">{{ t.assignments_count }}</td>
              <td class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 text-right">{{ t.total_submissions }}</td>
              <td class="px-4 py-2 text-sm text-green-600 dark:text-green-400 text-right font-medium">{{ t.submissions_marked }}</td>
              <td class="px-4 py-2 text-sm text-right font-medium" :class="t.submissions_pending > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400 dark:text-gray-500'">
                {{ t.submissions_pending }}
              </td>
              <td class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 text-right">{{ t.students_reached }}</td>
              <td class="px-4 py-2 text-sm">
                <div v-if="t.average_percentage !== null" class="flex items-center gap-2 min-w-[120px]">
                  <div class="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-indigo-600 rounded-full" :style="{ width: Math.min(100, t.average_percentage) + '%' }"></div>
                  </div>
                  <span class="text-gray-900 dark:text-white font-medium whitespace-nowrap">{{ t.average_percentage }}%</span>
                </div>
                <span v-else class="text-gray-400 dark:text-gray-500">No graded work</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Reading Engagement -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Library Reading Engagement</h3>
        <div class="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
          <span><span class="font-bold text-gray-900 dark:text-white">{{ reading.books_count ?? 0 }}</span> books</span>
          <span><span class="font-bold text-gray-900 dark:text-white">{{ reading.readers_count ?? 0 }}</span> readers</span>
        </div>
      </div>
      <div v-if="loading.reading" class="text-gray-500 py-6 text-center">Loading...</div>
      <div v-else-if="!reading.top_books || reading.top_books.length === 0" class="text-gray-500 py-6 text-center">
        No reading activity recorded yet.
      </div>
      <table v-else class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Title</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Author</th>
            <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Readers</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="book in reading.top_books" :key="book.id">
            <td class="px-4 py-2 text-sm text-gray-900 dark:text-white">{{ book.title }}</td>
            <td class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{{ book.author || '-' }}</td>
            <td class="px-4 py-2 text-sm text-gray-900 dark:text-white text-right">{{ book.readers_count }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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

const loading = ref({ overview: false, teachers: false, assignments: false, performance: false, reading: false })

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

const subjectsWithData = computed(() => subjects.value.filter(s => s.average_percentage !== null))

const statusChartData = computed(() => ({
  labels: statusBreakdown.value.map(s => STATUS_LABELS[s.status] || s.status),
  datasets: [{
    data: statusBreakdown.value.map(s => s.count),
    backgroundColor: ['#9CA3AF', '#3B82F6', '#F59E0B', '#10B981', '#6366F1'],
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
    backgroundColor: '#10B981',
    borderRadius: 8
  }]
}))

const teacherChartData = computed(() => ({
  labels: teachers.value.map(t => `${t.first_name} ${t.last_name}`),
  datasets: [{
    label: 'Assignments',
    data: teachers.value.map(t => t.assignments_count),
    backgroundColor: '#F59E0B',
    borderRadius: 8
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, grid: { display: true, color: 'rgba(0, 0, 0, 0.05)' } },
    x: { grid: { display: false } }
  }
}

const horizontalChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
  plugins: { legend: { display: false } },
  scales: {
    x: { beginAtZero: true, grid: { display: true, color: 'rgba(0, 0, 0, 0.05)' } },
    y: { grid: { display: false } }
  }
}

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, max: 100, grid: { display: true, color: 'rgba(0, 0, 0, 0.05)' } },
    x: { grid: { display: false } }
  }
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: true, position: 'bottom' as const } }
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
