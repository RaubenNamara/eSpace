<template>
  <div>
    <!-- Header -->
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-indigo-500/20 p-5 sm:p-7 mb-6">
      <div class="absolute -right-10 -top-10 w-52 h-52 rounded-full bg-white/10"></div>
      <div class="absolute -right-4 bottom-0 w-32 h-32 rounded-full bg-white/10"></div>
      <div class="relative flex items-center gap-4">
        <div class="hidden sm:flex w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm items-center justify-center flex-shrink-0 text-white text-xl font-bold ring-2 ring-white/20">
          {{ userInitials }}
        </div>
        <div class="min-w-0">
          <h1 class="text-xl sm:text-3xl font-bold text-white leading-tight">
            {{ greeting }}, {{ authStore.userName }} 👋
          </h1>
          <p class="text-sm sm:text-base text-indigo-100 mt-1">
            {{ today }}<span v-if="admissionNumber"> · Admission No. {{ admissionNumber }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="space-y-6">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div v-for="i in 4" :key="i" class="h-24 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div class="h-64 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div class="h-64 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </div>
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 flex items-start gap-3">
      <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p class="text-red-800 dark:text-red-200">{{ error }}</p>
    </div>

    <template v-else-if="data">
      <!-- Live now banner -->
      <RouterLink
        v-if="data.stats.live_now > 0"
        to="/student/live-classes"
        class="block mb-6 rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/20 hover:opacity-95 transition-opacity"
      >
        <div class="flex items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-white animate-pulse flex-shrink-0"></span>
          <p class="text-sm sm:text-base font-semibold flex-1">
            {{ data.stats.live_now }} live class{{ data.stats.live_now > 1 ? 'es are' : ' is' }} happening right now
          </p>
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </div>
      </RouterLink>

      <!-- Stat tiles -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatTile label="Classes Enrolled" :value="data.stats.classes_enrolled" icon="classes" color="indigo" to="/student/classes" />
        <StatTile label="Pending Assignments" :value="data.stats.assignments_pending" icon="pending" color="amber" to="/student/assignments" />
        <StatTile label="Completed" :value="data.stats.assignments_completed" icon="check" color="emerald" to="/student/assignments" />
        <StatTile label="Average Score" :value="data.stats.average_score !== null ? `${data.stats.average_score}%` : '—'" icon="score" color="violet" to="/student/reports" />
        <StatTile label="Upcoming Live Classes" :value="data.upcoming_live_classes.length" icon="live" color="red" to="/student/live-classes" />
      </div>

      <!-- Performance trend -->
      <div class="mb-6">
        <PerformanceTrend
          :graded-count="data.performance.graded_count"
          :trend="data.performance.trend"
          :trend-delta="data.performance.trend_delta"
          :scores="data.performance.scores"
        />
      </div>

      <!-- My Achievements -->
      <div class="mb-6">
        <MyAchievements />
      </div>

      <!-- Virtual Lab -->
      <div class="mb-6">
        <VirtualLabWidget />
      </div>

      <!-- Recent library -->
      <div v-if="data.recent_library.length > 0" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
        <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span class="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </span>
            Recently Added to eLibrary
          </h2>
          <RouterLink to="/student/library" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Browse library</RouterLink>
        </div>
        <div class="flex gap-3 p-5 overflow-x-auto">
          <RouterLink
            v-for="book in data.recent_library"
            :key="book.id"
            to="/student/library"
            class="group flex items-center gap-3 flex-shrink-0 w-64 p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div class="w-11 h-11 flex-shrink-0 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
              <svg class="w-5 h-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <div class="min-w-0">
              <p class="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 leading-snug">{{ book.title }}</p>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Quick links -->
      <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Quick Links</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        <QuickLink to="/student/classes" label="My Classes" icon="classes" color="indigo" />
        <QuickLink to="/student/live-classes" label="Live Classes" icon="live" color="red" />
        <QuickLink to="/student/library" label="eLibrary" icon="library" :badge="data.stats.library_resources" color="emerald" />
        <QuickLink to="/student/itembank" label="Item Bank" icon="itembank" :badge="data.stats.itembank_resources" color="violet" />
        <QuickLink to="/student/chat" label="Chats" icon="chat" :badge="data.stats.unread_messages" color="teal" />
        <QuickLink to="/student/notes" label="eNotes" icon="notes" color="amber" />
        <QuickLink to="/student/videos" label="Videos" icon="video" color="pink" />
        <QuickLink to="/student/reports" label="Reports" icon="reports" color="sky" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import StatTile from '@/components/dashboard/StatTile.vue'
import QuickLink from '@/components/dashboard/QuickLink.vue'
import MyAchievements from '@/components/dashboard/MyAchievements.vue'
import VirtualLabWidget from '@/components/dashboard/VirtualLabWidget.vue'
import PerformanceTrend from '@/components/dashboard/PerformanceTrend.vue'

interface DashboardData {
  stats: {
    classes_enrolled: number
    subjects_enrolled: number
    assignments_pending: number
    assignments_completed: number
    average_score: number | null
    live_now: number
    unread_messages: number
    library_resources: number
    itembank_resources: number
  }
  performance: { graded_count: number; trend: 'improving' | 'declining' | 'steady' | null; trend_delta: number | null; scores: number[] }
  live_now: { id: number; title: string; status: string; scheduled_start: string; subject_name: string; teacher_name: string }[]
  upcoming_live_classes: { id: number; title: string; status: string; scheduled_start: string; subject_name: string; teacher_name: string }[]
  upcoming_assignments: { id: number; title: string; subject_name: string; due_date: string; status: string }[]
  recent_library: { id: number; title: string; file_size: number; published_at: string; subject_name: string }[]
}

const API_BASE = '/api'

const authStore = useAuthStore()
const data = ref<DashboardData | null>(null)
const loading = ref(false)
const error = ref('')

const admissionNumber = computed(() => (authStore.user as any)?.admission_number || '')

const today = computed(() => new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
})

const userInitials = computed(() => {
  const name = authStore.userName || ''
  return name.split(' ').filter(Boolean).map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'S'
})

const loadDashboard = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await axios.get(`${API_BASE}/student/dashboard`)
    if (response.data.success) {
      data.value = response.data.data
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load dashboard'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadDashboard()
})
</script>
