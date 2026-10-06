<template>
  <div class="w-full">
    <!-- Header: the day, a greeting, the department, and the three things a teacher starts most -->
    <header class="mb-5 flex flex-col lg:flex-row lg:items-end gap-4">
      <div class="flex-1 min-w-0">
        <p class="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">{{ todayLabel }}</p>
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{{ greeting }}, {{ firstName }}</h1>
        <div v-if="analytics.department" class="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-600 text-white font-semibold">
            {{ analytics.department.name }}
            <span class="text-indigo-200 font-medium">{{ analytics.department.code }}</span>
          </span>
          <!-- Department switcher - only when the teacher belongs to more than one -->
          <select
            v-if="myDepartments.length > 1"
            :value="activeDepartmentId"
            :disabled="switchingDepartment"
            class="rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-2.5 py-1 text-xs focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            @change="switchDepartment(($event.target as HTMLSelectElement).value)"
          >
            <option v-for="dept in myDepartments" :key="dept.id" :value="dept.id">{{ dept.name }}{{ dept.is_primary ? ' (Primary)' : '' }}</option>
          </select>
          <button type="button" class="font-semibold text-indigo-600 dark:text-indigo-300 hover:underline underline-offset-2" @click="openViewEnrolledModal">View enrolled students</button>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <RouterLink v-for="a in quickCreate" :key="a.to" :to="a.to" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors" :class="a.primary ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-500/20' : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'">
          <AppIcon :name="a.icon" class="w-4 h-4" />
          {{ a.label }}
        </RouterLink>
      </div>
    </header>
    <NoticeBanner role="teacher" />

    <!-- Quick links - the teacher's most-used modules, first thing, as small tiles -->
    <nav class="grid grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 mb-5" aria-label="Quick links">
      <QuickLink v-for="q in quickLinks" :key="q.to" compact :to="q.to" :label="q.label" :icon="q.icon" color="indigo" />
    </nav>

    <!-- Today, and what to do next -->
    <div v-if="!overview && !overviewError" class="space-y-4 mb-6">
      <Skeleton variant="tiles" :count="4" />
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2"><Skeleton variant="list" :count="4" /></div>
        <Skeleton variant="list" :count="3" />
      </div>
    </div>
    <EmptyState
      v-else-if="!overview"
      class="mb-6"
      card
      tone="rose"
      icon="clipboard"
      title="Today's overview couldn't load"
      :message="overviewError"
    >
      <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700" @click="retryOverview">Try again</button>
    </EmptyState>
    <template v-else>
      <TodayTiles class="mb-5" :today="overview.today" :live-today="overview.live_today" :mark-next="overview.mark_next" :agenda="overview.agenda" />
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <MarkNext class="lg:col-span-2" :items="overview.mark_next" :total="overview.today.to_mark" />
        <div class="space-y-4">
          <AgendaCard :items="overview.agenda" />
          <EarlyWarningCard />
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <ClassHealth class="lg:col-span-2" :classes="overview.classes" />
        <ActivityFeed :items="overview.activity" />
      </div>
    </template>

    <!-- Your students: who's enrolled with you, by class level and stream -->
    <section class="mb-8">
      <h2 class="text-sm font-bold text-gray-900 dark:text-white mb-3">Your students</h2>
      <Skeleton v-if="loadingAnalytics && !analytics.total_enrollments" variant="tiles" :count="4" />
      <template v-else>
        <StatStrip class="mb-4" :items="studentStats" />
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">Students per class</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Each bar is a class level; its colours are the streams - hover for the numbers.</p>
            <div class="h-64">
              <Bar v-if="analytics.by_class.length" :data="levelChartData" :options="stackedOptions" />
              <EmptyState v-else :card="false" compact icon="users" tone="gray" title="No students enrolled yet" />
            </div>
          </div>
          <div class="space-y-4">
            <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
              <p class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Gender</p>
              <template v-if="hasGenderData">
                <div class="flex h-3 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <span v-for="g in genderShares" :key="g.label" :style="{ width: `${g.percent}%`, background: g.color }"></span>
                </div>
                <div class="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div v-for="g in genderShares" :key="g.label">
                    <p class="text-lg font-bold" :style="{ color: g.color }">{{ g.percent }}%</p>
                    <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ g.label }} · {{ g.count.toLocaleString() }}</p>
                  </div>
                </div>
              </template>
              <p v-else class="text-xs text-gray-400">No data yet</p>
            </div>
            <div v-if="analytics.by_academic_year.length > 1" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
              <p class="text-sm font-semibold text-gray-900 dark:text-white mb-2">By year</p>
              <div class="h-40"><Bar :data="yearChartData" :options="chartOptions" /></div>
            </div>
          </div>
        </div>
      </template>
    </section>

    <!-- View Enrolled Students Modal -->
    <div v-if="showViewEnrolledModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <!-- Header -->
        <div class="bg-green-600 px-6 py-5 flex-shrink-0">
          <div class="flex items-center justify-between gap-4">
            <div class="min-w-0">
              <h2 class="text-xl sm:text-2xl font-bold text-white truncate">Enrolled Students in {{ analytics.department?.name }}</h2>
              <p class="text-green-100 text-sm mt-1">View students enrolled in your department</p>
            </div>
            <button @click="showViewEnrolledModal = false" class="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-colors flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Filters -->
        <div class="p-6 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-950">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Academic Year</label>
              <select
                v-model="viewFilters.academic_year"
                @change="fetchEnrolledStudents"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Academic Years</option>
                <option v-for="year in analytics.by_academic_year" :key="year.academic_year" :value="year.academic_year">
                  {{ year.academic_year }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Class</label>
              <select
                v-model="viewFilters.class_id"
                @change="fetchEnrolledStudents"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Classes</option>
                <option v-for="cls in analytics.by_class" :key="cls.class_name" :value="cls.class_name">
                  {{ cls.class_name }} ({{ cls.level }} - {{ cls.stream_name }})
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stream</label>
              <select
                v-model="viewFilters.stream_name"
                @change="fetchEnrolledStudents"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Streams</option>
                <option v-for="stream in analytics.by_stream" :key="stream.stream_name" :value="stream.stream_name">
                  {{ stream.stream_name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Enrolled Students Table -->
        <div class="flex-1 overflow-y-auto">
          <div v-if="loadingEnrolled" class="flex items-center justify-center h-64">
            <div class="text-gray-500 dark:text-gray-400">Loading enrolled students...</div>
          </div>
          <div v-else-if="enrolledStudentsList.length === 0" class="flex items-center justify-center h-64">
            <div class="text-gray-500 dark:text-gray-400">No enrolled students found</div>
          </div>
          <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-950">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admission No</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stream</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Academic Year</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="student in enrolledStudentsList" :key="student.enrollment_id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {{ student.first_name }} {{ student.last_name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ student.admission_number }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ student.department_name || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ student.class_name || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ student.stream_name || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ student.academic_year || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    @click="deEnrollStudent(student.enrollment_id, student.first_name, student.last_name)"
                    class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                  >
                    De-enroll
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700 flex justify-end flex-shrink-0">
          <button
            @click="showViewEnrolledModal = false"
            class="btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import NoticeBanner from '@/components/dashboard/NoticeBanner.vue'
import { useLiveRefresh } from '@/composables/useLiveRefresh'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import apiService from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import AppIcon from '@/components/common/AppIcon.vue'
import QuickLink from '@/components/dashboard/QuickLink.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import TodayTiles from '@/components/dashboard/teacher/TodayTiles.vue'
import MarkNext from '@/components/dashboard/teacher/MarkNext.vue'
import AgendaCard from '@/components/dashboard/teacher/AgendaCard.vue'
import EarlyWarningCard from '@/components/dashboard/teacher/EarlyWarningCard.vue'
import ClassHealth, { type ClassHealthItem } from '@/components/dashboard/teacher/ClassHealth.vue'
import ActivityFeed from '@/components/dashboard/teacher/ActivityFeed.vue'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

const toast = useToastStore()
const confirmDialog = useConfirmStore()

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const authStore = useAuthStore()

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
})

// ---- The day at a glance (GET /teacher/dashboard/overview) ----
interface Overview {
  teacher: { first_name: string; last_name: string }
  today: { to_mark: number; live_today: number; due_week: number; support: { groups: number; members: number; revised: number } }
  live_today: { id: number; title: string; at: string; status: string; class_name: string | null }[]
  mark_next: { submission_id: number; assignment_id: number; assignment: string; category: string | null; student: string; class_name: string | null; submitted_at: string | null }[]
  agenda: { kind: 'live' | 'due'; id: number; title: string; at: string; class_name: string | null; status?: string; category?: string | null; submitted?: number }[]
  classes: ClassHealthItem[]
  activity: { kind: 'submission' | 'enote' | 'revised' | 'message'; at: string; who: string; what: string; to: string }[]
}
const overview = ref<Overview | null>(null)
// Why the overview couldn't load (shown instead of leaving the placeholders up for ever)
const overviewError = ref('')
const loadOverview = async () => {
  try {
    const response = await apiService.get('/teacher/dashboard/overview')
    if (response.data?.success) {
      overview.value = response.data.data
      overviewError.value = ''
    } else if (!overview.value) {
      overviewError.value = response.data?.message || 'The server did not send the overview.'
    }
  } catch (error: any) {
    console.error('Failed to load the dashboard overview:', error)
    // A quiet refresh that fails keeps what is already on screen
    if (!overview.value) {
      const status = error?.response?.status
      overviewError.value = (status ? `Error ${status}: ` : '') + (error?.response?.data?.message || error?.message || 'The request failed.')
    }
  }
}
const retryOverview = () => {
  overviewError.value = ''
  loadOverview()
}

const firstName = computed(() => {
  const n = overview.value?.teacher.first_name || authStore.userName || ''
  return n === n.toUpperCase() ? n.charAt(0) + n.slice(1).toLowerCase() : n
})
const todayLabel = new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const quickLinks = [
  { to: '/teacher/classes', label: 'My Classes', icon: 'classes' },
  { to: '/teacher/live-classes', label: 'Live Classes', icon: 'live' },
  { to: '/teacher/enotes', label: 'eNotes', icon: 'notes' },
  { to: '/teacher/library', label: 'eLibrary', icon: 'library' },
  { to: '/teacher/itembank', label: 'Item Bank', icon: 'itembank' },
  { to: '/teacher/assignments', label: 'Assessments', icon: 'check' },
  { to: '/teacher/reports', label: 'Reports', icon: 'reports' },
  { to: '/teacher/chat', label: 'Chats', icon: 'chat' }
]
const quickCreate = [
  { label: 'New assessment', to: '/teacher/assignments/create', icon: 'clipboard', primary: true },
  { label: 'New eNote', to: '/teacher/enotes', icon: 'book', primary: false },
  { label: 'Schedule class', to: '/teacher/live-classes', icon: 'video', primary: false },
  { label: 'My week', to: '/teacher/planner', icon: 'clock', primary: false }
]

const loadingAnalytics = ref(false)
const loadingEnrolled = ref(false)
const showViewEnrolledModal = ref(false)

const myDepartments = ref<{ id: number; name: string; code: string; is_primary: boolean }[]>([])
const activeDepartmentId = ref<number | null>(null)
const switchingDepartment = ref(false)

const analytics = ref({
  total_enrollments: 0,
  recent_enrollments: 0,
  by_class: [] as any[],
  by_academic_year: [] as any[],
  by_stream: [] as any[],
  by_gender: {
    male: 0,
    female: 0,
    other: 0
  },
  department: null as any
})

const enrolledStudentsList = ref<any[]>([])

const viewFilters = ref({
  academic_year: '',
  class_id: '',
  stream_name: ''
})

const hasGenderData = computed(() => {
  const { male, female, other } = analytics.value.by_gender
  return male + female + other > 0
})

// Students per class level, each level's streams stacked
const STREAM_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#0ea5e9', '#8b5cf6', '#14b8a6', '#f97316', '#84cc16', '#e11d48']
const levelChartData = computed(() => {
  const rows = analytics.value.by_class as { class_name: string; stream_name: string | null; count: number }[]
  const levels = [...new Set(rows.map(r => r.class_name))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  const streams = [...new Set(rows.map(r => r.stream_name || '—'))].sort()
  return {
    labels: levels,
    datasets: streams.map((st, i) => ({
      label: st === '—' ? 'Students' : `Stream ${st}`,
      data: levels.map(l => rows.filter(r => r.class_name === l && (r.stream_name || '—') === st).reduce((n, r) => n + Number(r.count), 0)),
      backgroundColor: STREAM_COLORS[i % STREAM_COLORS.length],
      borderRadius: 4,
      borderSkipped: false as const,
      maxBarThickness: 56
    }))
  }
})
const stackedOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { filter: (item: any) => item.raw > 0 }
  },
  scales: {
    x: { stacked: true, grid: { display: false } },
    y: { stacked: true, beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } }
  }
}
const studentStats = computed<StatItem[]>(() => [
  { label: 'Students', value: analytics.value.total_enrollments, tone: 'indigo' },
  { label: 'Class levels', value: uniqueClassCount.value, tone: 'sky' },
  { label: 'Streams', value: analytics.value.by_class.length, tone: 'violet' },
  { label: 'New this week', value: analytics.value.recent_enrollments, tone: 'emerald' }
])
const genderShares = computed(() => {
  const g = analytics.value.by_gender
  const total = g.male + g.female + g.other || 1
  return [
    { label: 'Boys', count: g.male, percent: Math.round(g.male / total * 100), color: '#3b82f6' },
    { label: 'Girls', count: g.female, percent: Math.round(g.female / total * 100), color: '#ec4899' },
    { label: 'Other', count: g.other, percent: Math.round(g.other / total * 100), color: '#9ca3af' }
  ].filter(x => x.count > 0)
})

const uniqueClassCount = computed(() => new Set(analytics.value.by_class.map((c: any) => c.class_name)).size)

const yearChartData = computed(() => ({
  labels: analytics.value.by_academic_year.map((y: any) => y.academic_year),
  datasets: [{
    label: 'Students',
    data: analytics.value.by_academic_year.map((y: any) => y.count),
    backgroundColor: '#10B981',
    borderRadius: 8
  }]
}))


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.05)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}


// silent: the live refresh (no loading state; the counters just move to the new numbers)
const loadAnalytics = async (silent = false) => {
  if (!silent) loadingAnalytics.value = true
  try {
    const response = await apiService.get('/teacher/dashboard')
    if (response.data?.success && response.data?.data) {
      analytics.value = response.data.data
    }
  } catch (error) {
    if (!silent) console.error('Failed to load analytics:', error)
  } finally {
    if (!silent) loadingAnalytics.value = false
  }
}

useLiveRefresh(() => { loadAnalytics(true); loadOverview() })

const loadMyDepartments = async () => {
  try {
    const response = await apiService.get('/teacher/departments')
    if (response.data?.success) {
      myDepartments.value = response.data.data.departments || []
      activeDepartmentId.value = response.data.data.active_department_id
    }
  } catch (error) {
    console.error('Failed to load departments:', error)
  }
}

const switchDepartment = async (departmentId: string) => {
  const id = Number(departmentId)
  if (!id || id === activeDepartmentId.value) return

  switchingDepartment.value = true
  try {
    const response = await apiService.put('/teacher/departments/active', { department_id: id })
    if (response.data?.success) {
      activeDepartmentId.value = id
      overview.value = null
      overviewError.value = ''
      await Promise.all([loadAnalytics(), loadOverview()])
    } else {
      toast.error(response.data?.message || 'Failed to switch department')
    }
  } catch (error: any) {
    console.error('Failed to switch department:', error)
    toast.error(error.response?.data?.message || 'Failed to switch department')
  } finally {
    switchingDepartment.value = false
  }
}

const fetchEnrolledStudents = async () => {
  loadingEnrolled.value = true
  try {
    const params: any = {}
    if (viewFilters.value.academic_year) {
      params.academic_year = viewFilters.value.academic_year
    }
    if (viewFilters.value.class_id) {
      params.class_name = viewFilters.value.class_id
    }
    if (viewFilters.value.stream_name) {
      params.stream_name = viewFilters.value.stream_name
    }

    console.log('Fetching enrolled students with params:', params)
    const response = await apiService.get('/teacher/students/enrolled', { params })
    console.log('Response:', response.data)

    if (response.data?.success && response.data?.data) {
      enrolledStudentsList.value = response.data.data
      console.log('Enrolled students loaded:', enrolledStudentsList.value.length)
    } else {
      console.error('API returned error:', response.data?.message)
    }
  } catch (error) {
    console.error('Failed to fetch enrolled students:', error)
  } finally {
    loadingEnrolled.value = false
  }
}

const openViewEnrolledModal = async () => {
  await fetchEnrolledStudents()
  showViewEnrolledModal.value = true
}

const deEnrollStudent = async (enrollmentId: number, firstName: string, lastName: string) => {
  if (!await confirmDialog.open({
    title: 'De-enroll student',
    message: `De-enroll ${firstName} ${lastName} from your account?\n\nThey'll lose access to your assignments, eNotes, and other content, but stay fully enrolled with every other teacher in the department.`,
    confirmLabel: 'De-enroll',
    danger: true
  })) {
    return
  }

  const reason = prompt('Reason (optional):') || undefined

  console.log('De-enrolling student:', enrollmentId)
  try {
    const response = await apiService.delete(`/teacher/students/${enrollmentId}`, { data: { reason } })
    console.log('De-enroll response:', response.data)

    if (response.data?.success) {
      // Refresh the enrolled students list
      await fetchEnrolledStudents()
      // Refresh analytics
      await loadAnalytics()
      toast.success('Student de-enrolled successfully')
    } else {
      console.error('De-enroll failed:', response.data?.message)
      toast.error('Failed to de-enroll student: ' + (response.data?.message || 'Unknown error'))
    }
  } catch (error) {
    console.error('Failed to de-enroll student:', error)
    toast.error('Failed to de-enroll student. Please try again.')
  }
}

onMounted(() => {
  loadOverview()
  loadAnalytics()
  loadMyDepartments()
})
</script>
