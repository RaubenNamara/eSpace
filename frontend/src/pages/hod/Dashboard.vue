<template>
  <div>
    <!-- The topbar already shows this HOD's name and photo, so this is a quick personal greeting
         rather than a redundant "HOD Dashboard" title + icon badge. The old "Preview as Student"
         button was dropped too - it just linked to /hod/assessments, already one click away in
         the sidebar's Assessment & Analytics section. -->
    <h1 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{{ greeting }}, {{ authStore.userName }} 👋</h1>

    <!-- Department strip - a slim identity bar rather than a full hero card, since it's just
         context (which department this data belongs to), not a headline number. -->
    <div v-if="departmentInfo" class="hidden sm:flex items-center gap-x-3 bg-indigo-600 text-white rounded-lg px-4 py-2 mb-4 text-sm">
      <span class="font-semibold">{{ departmentInfo.name }}</span>
      <span class="text-indigo-200">{{ departmentInfo.code }} &middot; Head of Department</span>
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

    <!-- "Quick Actions" and "Department Information" cards used to live here, but they only
         duplicated the four stat tiles above (same four destinations) and the department strip
         (same name/code) - removed rather than kept as redundant chrome. -->

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
          class="flex items-center justify-between gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-950/40 hover:bg-gray-100 dark:hover:bg-gray-900/70 transition-colors"
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
import { ref, computed, onMounted } from 'vue'
import apiService from '@/services/api'
import { useAuthStore } from '@/stores/auth'
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

const authStore = useAuthStore()

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
})

const stats = ref<Stats | null>(null)
const departmentInfo = ref<DepartmentInfo | null>(null)
const recentApprovals = ref<Approval[]>([])
const loading = ref(false)

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
