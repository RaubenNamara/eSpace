<template>
  <div class="w-full">
    <!-- Greeting -->
    <div class="mb-5 flex flex-col sm:flex-row sm:items-end gap-2">
      <div class="flex-1 min-w-0">
        <p class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ today }}</p>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">{{ greeting }}, {{ firstName }}</h1>
      </div>
      <div v-if="data" class="flex flex-wrap gap-1.5">
        <span v-if="admissionNumber" class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">No. {{ admissionNumber }}</span>
        <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200">{{ data.stats.classes_enrolled }} {{ data.stats.classes_enrolled === 1 ? 'class' : 'classes' }}</span>
      </div>
    </div>

    <NoticeBanner role="student" />
    <!-- Quick links: small tiles, the first thing to reach for -->
    <div class="grid grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 mb-5">
      <QuickLink compact to="/student/live-classes" label="Live" icon="live" color="red" />
      <QuickLink compact to="/student/notes" label="eNotes" icon="notes" color="amber" />
      <QuickLink compact to="/student/library" label="eLibrary" icon="library" :badge="data?.stats.library_resources" color="emerald" />
      <QuickLink compact to="/student/videos" label="Videos" icon="video" color="pink" />
      <QuickLink compact to="/student/itembank" label="Item Bank" icon="itembank" :badge="data?.stats.itembank_resources" color="violet" />
      <QuickLink compact to="/student/assignments" label="Assessments" icon="pending" :badge="data?.stats.assignments_pending" color="indigo" />
      <QuickLink compact to="/student/reports" label="Reports" icon="reports" color="sky" />
      <QuickLink compact to="/student/chat" label="Chats" icon="chat" :badge="data?.stats.unread_messages" color="teal" />
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="space-y-4">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div v-for="i in 4" :key="i" class="h-24 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2 h-64 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
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
        class="block mb-5 rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/20 hover:opacity-95 transition-opacity"
      >
        <div class="flex items-center gap-3">
          <span class="relative flex w-3 h-3 flex-shrink-0"><span class="absolute inset-0 rounded-full bg-white animate-ping opacity-70"></span><span class="relative w-3 h-3 rounded-full bg-white"></span></span>
          <p class="text-sm sm:text-base font-semibold flex-1">
            {{ data.live_now[0]?.title || 'A live class' }}{{ data.stats.live_now > 1 ? ` and ${data.stats.live_now - 1} more` : '' }} - live now
          </p>
          <span class="px-3 py-1.5 rounded-lg bg-white text-red-700 text-xs font-bold">Join</span>
        </div>
      </RouterLink>

      <!-- Four figures -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5">
        <StatTile label="To do" :value="data.stats.assignments_pending" icon="pending" color="amber" to="/student/assignments" />
        <StatTile label="Done" :value="data.stats.assignments_completed" icon="check" color="emerald" to="/student/assignments" />
        <StatTile label="Average" :value="data.stats.average_score !== null ? `${data.stats.average_score}%` : '–'" icon="score" color="violet" to="/student/reports" />
        <StatTile label="Live soon" :value="data.upcoming_live_classes.length" icon="live" color="red" to="/student/live-classes" />
      </div>

      <!-- Two columns that always end together: in each, one card takes up the difference -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-5">
        <!-- Main column: what to do, the map, how it's going, badges and the lab -->
        <div class="lg:col-span-2 min-w-0 flex flex-col">
          <NextStepsCard />
          <LearningMapCard />
          <div class="mb-6">
            <PerformanceTrend
              :graded-count="data.performance.graded_count"
              :trend="data.performance.trend"
              :trend-delta="data.performance.trend_delta"
              :scores="data.performance.scores"
            />
          </div>
          <!-- Badges and the lab side by side, so the two columns end together -->
          <div class="grid sm:grid-cols-2 gap-5 mb-6 lg:flex-1 [&>*]:min-w-0">
            <MyAchievements class="h-full" />
            <VirtualLabWidget class="h-full" />
          </div>
        </div>

        <!-- Side column: today's revision, what's coming, new books -->
        <div class="min-w-0 flex flex-col">
          <ExamCountdownCard />
          <DailyFiveCard />
          <section class="mb-6 lg:flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
            <div class="flex items-center gap-2 mb-3">
              <h2 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">Coming up</h2>
              <RouterLink to="/student/assignments" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">All</RouterLink>
            </div>
            <p v-if="!agenda.length" class="py-4 text-center text-xs text-gray-500 dark:text-gray-400">Nothing due and no live classes coming up - a good time to read ahead.</p>
            <ul v-else class="space-y-2">
              <li v-for="item in agenda" :key="item.key">
                <RouterLink :to="item.to" class="flex items-center gap-3 rounded-xl p-2 -mx-2 hover:bg-gray-50 dark:hover:bg-gray-700/40">
                  <span class="w-10 h-10 flex-shrink-0 rounded-xl flex flex-col items-center justify-center" :class="item.kind === 'live' ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200'">
                    <span class="text-[9px] font-bold uppercase leading-none">{{ item.month }}</span>
                    <span class="text-sm font-extrabold leading-tight">{{ item.day }}</span>
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ item.title }}</span>
                    <span class="block text-[11px] truncate" :class="item.overdue ? 'text-rose-600 dark:text-rose-300 font-semibold' : 'text-gray-500 dark:text-gray-400'">{{ item.sub }}</span>
                  </span>
                </RouterLink>
              </li>
            </ul>
            <!-- This week at a glance, at the foot of the card -->
            <div class="mt-auto pt-4">
              <p class="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">This week</p>
              <div class="grid grid-cols-7 gap-1 text-center">
                <div v-for="d in week" :key="d.key" class="rounded-lg py-1.5" :class="d.today ? 'bg-indigo-600 text-white' : 'bg-gray-50 dark:bg-gray-700/40 text-gray-600 dark:text-gray-300'">
                  <p class="text-[10px] font-semibold uppercase" :class="d.today ? 'text-indigo-100' : 'text-gray-400'">{{ d.name }}</p>
                  <p class="text-sm font-bold leading-tight">{{ d.date }}</p>
                  <p class="mt-0.5 h-1.5 flex justify-center gap-0.5">
                    <span v-if="d.work" class="w-1.5 h-1.5 rounded-full" :class="d.today ? 'bg-white' : 'bg-amber-500'" title="Work due"></span>
                    <span v-if="d.live" class="w-1.5 h-1.5 rounded-full" :class="d.today ? 'bg-white' : 'bg-rose-500'" title="Live class"></span>
                  </p>
                </div>
              </div>
              <p class="mt-2 flex items-center gap-3 text-[10px] text-gray-500 dark:text-gray-400">
                <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Work due</span>
                <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Live class</span>
              </p>
            </div>
          </section>

          <!-- New in the eLibrary -->
          <section v-if="data.recent_library.length > 0" class="mb-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
            <div class="flex items-center gap-2 mb-3">
              <h2 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">New in the eLibrary</h2>
              <RouterLink to="/student/library" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Browse</RouterLink>
            </div>
            <ul class="space-y-1">
              <li v-for="book in data.recent_library.slice(0, 4)" :key="book.id">
                <RouterLink to="/student/library" class="flex items-center gap-3 rounded-xl p-2 -mx-2 hover:bg-gray-50 dark:hover:bg-gray-700/40">
                  <span class="w-9 h-9 flex-shrink-0 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200 flex items-center justify-center">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ book.title }}</span>
                    <span class="block text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ book.subject_name }}</span>
                  </span>
                </RouterLink>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import NoticeBanner from '@/components/dashboard/NoticeBanner.vue'
import { useLiveRefresh } from '@/composables/useLiveRefresh'
import LearningMapCard from '@/components/dashboard/LearningMapCard.vue'
import NextStepsCard from '@/components/dashboard/NextStepsCard.vue'
import DailyFiveCard from '@/components/dashboard/DailyFiveCard.vue'
import ExamCountdownCard from '@/components/dashboard/ExamCountdownCard.vue'
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
const firstName = computed(() => {
  const u = authStore.user as any
  const name = u?.first_name || String(authStore.userName || '').split(' ')[0] || ''
  return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : 'there'
})

// What's coming, soonest first: work due (overdue included) and live classes
const agenda = computed(() => {
  if (!data.value) return []
  const now = Date.now()
  const at = (v: string) => new Date(v.replace(' ', 'T')).getTime()
  const parts = (t: number) => ({ month: new Date(t).toLocaleDateString(undefined, { month: 'short' }), day: new Date(t).getDate() })
  const when = (t: number) => `${new Date(t).toLocaleDateString(undefined, { weekday: 'short' })} ${new Date(t).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`
  const items = [
    ...data.value.upcoming_assignments.map(a => {
      const t = at(a.due_date)
      return { key: `a${a.id}`, kind: 'work' as const, t, title: a.title, to: `/student/assignments/${a.id}/answer`, overdue: t < now,
        sub: `${a.subject_name} · ${t < now ? 'overdue' : `due ${when(t)}`}`, ...parts(t) }
    }),
    ...data.value.upcoming_live_classes.map(l => {
      const t = at(l.scheduled_start)
      return { key: `l${l.id}`, kind: 'live' as const, t, title: l.title, to: '/student/live-classes', overdue: false,
        sub: `Live · ${l.subject_name} · ${when(t)}`, ...parts(t) }
    })
  ]
  return items.sort((p, q) => p.t - q.t).slice(0, 5)
})

const today = computed(() => new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))

// Monday to Sunday of this week, with a dot on days that have work due or a live class
const week = computed(() => {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7))
  const todayKey = new Date().toDateString()
  const at = (v: string) => new Date(v.replace(' ', 'T')).toDateString()
  const work = new Set((data.value?.upcoming_assignments ?? []).map(a => at(a.due_date)))
  const live = new Set((data.value?.upcoming_live_classes ?? []).map(l => at(l.scheduled_start)))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const key = d.toDateString()
    return { key, name: d.toLocaleDateString(undefined, { weekday: 'narrow' }), date: d.getDate(), today: key === todayKey, work: work.has(key), live: live.has(key) }
  })
})

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
})

// silent: the live refresh - the numbers just count to their new values, no loading state, and a
// failed refresh leaves the dashboard as it was
const loadDashboard = async (silent = false) => {
  if (!silent) {
    loading.value = true
    error.value = ''
  }
  try {
    const response = await axios.get(`${API_BASE}/student/dashboard`)
    if (response.data.success) {
      data.value = response.data.data
    }
  } catch (err: any) {
    if (!silent) error.value = err.response?.data?.message || 'Failed to load dashboard'
  } finally {
    if (!silent) loading.value = false
  }
}

useLiveRefresh(() => loadDashboard(true))

onMounted(() => {
  loadDashboard()
})
</script>
