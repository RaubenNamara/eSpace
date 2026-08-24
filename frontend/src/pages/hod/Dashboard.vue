<template>
  <div>
    <!-- Hero -->
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-indigo-500/20 p-4 sm:p-5 mb-6">
      <div class="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10"></div>
      <div class="absolute -right-3 bottom-0 w-24 h-24 rounded-full bg-white/10"></div>
      <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-sm flex-shrink-0 ring-2 ring-white/20">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
            </svg>
          </div>
          <div class="min-w-0">
            <h1 class="text-lg sm:text-2xl font-bold text-white leading-tight">HOD Dashboard</h1>
            <p class="text-xs sm:text-sm text-indigo-100 truncate">
              {{ departmentInfo ? `${departmentInfo.name} (${departmentInfo.code}) Department` : 'Manage your department, teachers, and content approvals' }}
            </p>
          </div>
        </div>
        <RouterLink
          to="/hod/assessments"
          class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-sm font-medium transition-colors flex-shrink-0"
          title="See exactly what students see for any assessment in your department"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          Preview as Student
        </RouterLink>
      </div>
    </div>

    <!-- Statistics -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <RouterLink to="/hod/teachers">
        <StatTile label="Department Teachers" :value="stats?.teachers_count ?? 0" icon="teachers" color="sky" />
      </RouterLink>
      <RouterLink to="/hod/students">
        <StatTile label="Department Students" :value="stats?.students_count ?? 0" icon="students" color="emerald" />
      </RouterLink>
      <RouterLink to="/hod/subjects">
        <StatTile label="Department Subjects" :value="stats?.subjects_count ?? 0" icon="classes" color="violet" />
      </RouterLink>
      <RouterLink to="/hod/approvals">
        <StatTile label="Pending Approvals" :value="stats?.pending_approvals ?? 0" icon="pending" color="amber" />
      </RouterLink>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- Quick Actions -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div class="space-y-2">
          <router-link
            v-for="action in quickActions"
            :key="action.to"
            :to="action.to"
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-transparent hover:shadow-sm transition-all group"
          >
            <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br text-white" :class="action.grad">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="action.icon"></path>
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-200 flex-1">{{ action.label }}</span>
            <svg class="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </router-link>
        </div>
      </div>

      <!-- Department Information -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 lg:col-span-2">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Department Information</h3>
        <div v-if="departmentInfo" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-4">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Department Name</p>
            <p class="text-base font-bold text-gray-900 dark:text-white">{{ departmentInfo.name }}</p>
          </div>
          <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-4">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Department Code</p>
            <p class="text-base font-bold text-gray-900 dark:text-white">{{ departmentInfo.code }}</p>
          </div>
          <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-4">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Your Role</p>
            <p class="text-base font-bold text-gray-900 dark:text-white">Head of Department</p>
          </div>
        </div>
        <div v-else class="text-sm text-gray-500 dark:text-gray-400">Loading department information...</div>
      </div>
    </div>

    <!-- Pending Approvals Preview -->
    <div v-if="recentApprovals.length > 0" class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Recent Pending Approvals</h3>
        <router-link to="/hod/approvals" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-xs font-semibold">
          View All &rarr;
        </router-link>
      </div>
      <div class="space-y-2">
        <div
          v-for="approval in recentApprovals.slice(0, 5)"
          :key="approval.id"
          class="flex items-center justify-between gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 hover:bg-gray-100 dark:hover:bg-gray-900/70 transition-colors"
        >
          <div class="min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ getApprovalTitle(approval) }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ approval.type }} &middot; {{ formatDate(approval.created_at) }}</p>
          </div>
          <span class="flex-shrink-0 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
            Pending
          </span>
        </div>
      </div>
    </div>
    <div v-else-if="!loading" class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 text-center">
      <svg class="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p class="text-sm text-gray-500 dark:text-gray-400">No pending approvals right now &mdash; you're all caught up.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiService from '@/services/api'
import StatTile from '@/components/dashboard/StatTile.vue'

interface Stats {
  teachers_count: number
  subjects_count: number
  students_count: number
  pending_approvals: number
  pending_library: number
  pending_notes: number
  pending_item_bank: number
}

interface DepartmentInfo {
  id: number
  name: string
  code: string
}

interface Approval {
  id: number
  type: string
  title?: string
  question_text?: string
  created_at: string
}

const stats = ref<Stats | null>(null)
const departmentInfo = ref<DepartmentInfo | null>(null)
const recentApprovals = ref<Approval[]>([])
const loading = ref(false)

const quickActions = [
  {
    label: 'View Teachers',
    to: '/hod/teachers',
    grad: 'from-sky-500 to-blue-600',
    icon: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4'
  },
  {
    label: 'View Students',
    to: '/hod/students',
    grad: 'from-emerald-500 to-teal-600',
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
  },
  {
    label: 'Pending Approvals',
    to: '/hod/approvals',
    grad: 'from-amber-500 to-orange-600',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    label: 'Manage Subjects',
    to: '/hod/subjects',
    grad: 'from-violet-500 to-fuchsia-600',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  }
]

const fetchStats = async () => {
  loading.value = true
  try {
    const response = await apiService.get('/hod/department/stats')
    if (response.data.success) {
      stats.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  } finally {
    loading.value = false
  }
}

const fetchDepartmentInfo = async () => {
  try {
    const response = await apiService.get('/hod/department/info')
    if (response.data.success) {
      departmentInfo.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to fetch department info:', error)
  }
}

const fetchRecentApprovals = async () => {
  try {
    const response = await apiService.get('/hod/department/approvals', { limit: 5 } as any)
    if (response.data.success) {
      recentApprovals.value = response.data.data.approvals || []
    }
  } catch (error) {
    console.error('Failed to fetch approvals:', error)
  }
}

const getApprovalTitle = (approval: Approval): string => {
  if (approval.title) return approval.title
  if (approval.question_text) return approval.question_text.substring(0, 50) + '...'
  return 'Untitled'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

onMounted(() => {
  fetchStats()
  fetchDepartmentInfo()
  fetchRecentApprovals()
})
</script>
