<template>
  <div class="w-full">
    <!-- 1. The day: date, greeting, one sentence of what's ahead, the things a teacher starts most,
            and today on a timeline underneath -->
    <DashboardHero :date="todayLabel" :title="`${greeting}, ${firstName}`" :parts="daySentence" :chips="heroChips" :actions="quickCreate">
      <template #chips>
        <!-- Department switcher - only when the teacher belongs to more than one -->
        <select
          v-if="myDepartments.length > 1"
          :value="activeDepartmentId"
          :disabled="switchingDepartment"
          class="rounded-full border-0 ring-1 ring-amber-900/15 dark:ring-amber-200/10 bg-white/70 dark:bg-gray-800/60 text-gray-700 dark:text-gray-200 pl-2.5 pr-7 py-1 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          @change="switchDepartment(($event.target as HTMLSelectElement).value)"
        >
          <option v-for="dept in myDepartments" :key="dept.id" :value="dept.id">{{ dept.name }}{{ dept.is_primary ? ' (Primary)' : '' }}</option>
        </select>
      </template>
      <div v-if="!overview && !overviewError" class="h-14 rounded-lg bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
      <TodayTimeline v-else-if="overview" :items="overview.agenda" />
      <p v-else class="text-xs text-gray-500 dark:text-gray-400">Today's plan couldn't load.</p>
    </DashboardHero>
    <NoticeBanner role="teacher" />

    <div v-if="!overview && !overviewError" class="space-y-4 mb-6">
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div class="xl:col-span-2"><Skeleton variant="list" :count="4" /></div>
        <Skeleton variant="list" :count="3" />
      </div>
      <Skeleton variant="tiles" :count="4" />
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
      <!-- 2. Marking, and who needs a word -->
      <!-- (all caught up: marking shrinks to a strip and "Recently" moves up under it) -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-5">
        <div class="xl:col-span-2 flex flex-col gap-4 min-w-0">
          <MarkingCard :class="marking.waiting ? 'flex-1' : ''" :data="marking" :next="overview.mark_next[0] || null" />
          <ActivityFeed v-if="!marking.waiting" class="flex-1" :items="overview.activity" />
        </div>
        <EarlyWarningCard class="min-w-0" :limit="marking.waiting ? 4 : 2" @count="needWord = $event" />
      </div>
      <!-- 3. Each class at a glance, and this week's topics -->
      <ClassHealth class="mb-5" :classes="overview.classes" :week="overview.week_topics || null" />
      <!-- 4. What students did lately -->
      <ActivityFeed v-if="marking.waiting" class="mb-8" :items="overview.activity" />
    </template>

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
import apiService from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import Skeleton from '@/components/ui/Skeleton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import DashboardHero, { type HeroChip, type HeroPart } from '@/components/dashboard/DashboardHero.vue'
import TodayTimeline, { type AgendaItem } from '@/components/dashboard/teacher/TodayTimeline.vue'
import MarkingCard, { type MarkingSummary } from '@/components/dashboard/teacher/MarkingCard.vue'
import EarlyWarningCard from '@/components/dashboard/teacher/EarlyWarningCard.vue'
import ClassHealth, { type ClassHealthItem, type WeekTopics } from '@/components/dashboard/teacher/ClassHealth.vue'
import ActivityFeed from '@/components/dashboard/teacher/ActivityFeed.vue'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

const toast = useToastStore()
const confirmDialog = useConfirmStore()

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
  marking?: MarkingSummary | null
  week_topics?: WeekTopics | null
  agenda: AgendaItem[]
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
const quickCreate = [
  { label: 'New assessment', to: '/teacher/assignments/create', icon: 'clipboard' },
  { label: 'New eNote', to: '/teacher/enotes', icon: 'book' },
  { label: 'Schedule class', to: '/teacher/live-classes', icon: 'video' },
  { label: 'My week', to: '/teacher/planner', icon: 'clock' },
  { label: 'Item Bank', to: '/teacher/itembank', icon: 'document' }
]
const heroChips = computed<HeroChip[]>(() => {
  const out: HeroChip[] = []
  if (analytics.value.department) out.push({ text: `${analytics.value.department.name} · ${analytics.value.department.code}`, tone: 'solid' })
  const w = overview.value?.week_topics
  if (w?.total) out.push({ text: `Taught ${w.taught} of ${w.total} planned topics`, icon: 'flame' })
  if (analytics.value.department) out.push({ text: analytics.value.total_enrollments ? `${analytics.value.total_enrollments.toLocaleString()} students enrolled` : 'View enrolled students', icon: 'users', onClick: openViewEnrolledModal })
  return out
})

// Students flagged in early warning (the card fetches them and reports the count)
const needWord = ref<number | null>(null)

// Older servers send no marking summary: build one from the queue
const marking = computed<MarkingSummary>(() => overview.value?.marking || {
  marked_week: 0,
  waiting: overview.value?.today.to_mark || 0,
  oldest_at: overview.value?.mark_next[0]?.submitted_at || null,
  by_assignment: []
})

// "You teach 2 lessons today, have 12 scripts to mark, and 3 students could use a word."
const daySentence = computed(() => {
  const o = overview.value
  if (!o) return []
  const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`
  const bits: HeroPart[][] = []
  const lessons = o.today.live_today
  const dueToday = o.agenda.filter(a => a.kind === 'due' && new Date(a.at.replace(' ', 'T')).toDateString() === new Date().toDateString()).length
  if (lessons) bits.push([{ text: 'you teach ' }, { text: plural(lessons, 'live lesson', 'live lessons'), strong: true }, { text: ' today' }])
  if (dueToday) bits.push([{ text: plural(dueToday, 'assessment closes', 'assessments close'), strong: true }, { text: ' today' }])
  if (o.today.to_mark) bits.push([{ text: 'you have ' }, { text: plural(o.today.to_mark, 'script', 'scripts'), strong: true }, { text: ' to mark' }])
  if (needWord.value) bits.push([{ text: plural(needWord.value, 'student', 'students'), strong: true, alert: true }, { text: ' could use a word' }])
  if (!bits.length) return [{ text: 'A clear day: nothing to mark and nothing scheduled. A good time to plan ahead.' }]
  const out: HeroPart[] = []
  bits.forEach((b, i) => {
    if (i > 0) out.push({ text: i === bits.length - 1 ? ', and ' : ', ' })
    out.push(...b)
  })
  out.push({ text: '.' })
  out[0] = { ...out[0], text: out[0].text.charAt(0).toUpperCase() + out[0].text.slice(1) }
  return out
})

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
