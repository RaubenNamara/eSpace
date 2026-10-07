<template>
  <div class="w-full">
    <!-- 1. The day: date, greeting, one sentence of where things stand, the one thing to do first,
            and the week underneath -->
    <!-- A live class running now leads -->
    <RouterLink v-if="data && data.stats.live_now > 0" to="/student/live-classes" class="mb-3 flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-red-600 text-white shadow-md shadow-red-500/20 hover:bg-red-700">
      <span class="relative flex w-2.5 h-2.5 flex-shrink-0"><span class="absolute inset-0 rounded-full bg-white animate-ping opacity-70"></span><span class="relative w-2.5 h-2.5 rounded-full bg-white"></span></span>
      <p class="text-sm font-semibold flex-1 truncate">{{ data.live_now[0]?.title || 'A live class' }}{{ data.stats.live_now > 1 ? ` and ${data.stats.live_now - 1} more` : '' }} - live now</p>
      <span class="px-3 py-1 rounded-lg bg-white text-red-700 text-xs font-bold">Join</span>
    </RouterLink>
    <DashboardHero :date="today" :title="`${greeting}, ${firstName}`" :parts="daySentence" :chips="heroChips" :actions="heroActions">
      <div v-if="loading && !data" class="h-24 rounded-lg bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
      <StudentWeek v-else-if="data" :work="data.upcoming_assignments" :live="data.upcoming_live_classes" />
      <p v-else class="text-xs text-gray-500 dark:text-gray-400">Your week couldn't load.</p>
    </DashboardHero>

    <NoticeBanner role="student" />

    <div v-if="loading && !data" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 h-56 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      <div class="h-56 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 flex items-start gap-3">
      <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p class="text-red-800 dark:text-red-200">{{ error }}</p>
    </div>

    <template v-else-if="data">
      <!-- 2. What to do next, beside today's revision and the next exam -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <NextStepsCard class="lg:col-span-2 !mb-0 min-w-0" />
        <div class="flex flex-col gap-4 min-w-0">
          <ExamCountdownCard class="!mb-0" />
          <DailyFiveCard class="!mb-0 flex-1" />
        </div>
      </div>

      <!-- 3. How it's going -->
      <div class="flex items-center gap-2.5 mb-3">
        <span class="w-8 h-8 flex-shrink-0 rounded-xl flex items-center justify-center bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"><AppIcon name="trend" class="w-4 h-4" /></span>
        <h2 class="text-base font-bold text-gray-900 dark:text-white">How you're doing</h2>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <ScoresCard
          :average="data.stats.average_score"
          :graded-count="data.performance.graded_count"
          :trend="data.performance.trend"
          :trend-delta="data.performance.trend_delta"
          :scores="data.performance.scores"
        />
        <LearningMapCard class="lg:col-span-2 !mb-0 !rounded-2xl" />
      </div>

      <!-- 4. Badges, the lab and new books -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8 [&>*]:min-w-0">
        <MyAchievements class="!rounded-2xl !shadow-none !p-5" />
        <VirtualLabWidget class="!shadow-none" />
        <section class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:col-span-2 xl:col-span-1">
          <div class="flex items-center gap-2 mb-3">
            <h2 class="flex-1 font-bold text-gray-900 dark:text-white">New in the eLibrary</h2>
            <RouterLink to="/student/library" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Browse →</RouterLink>
          </div>
          <p v-if="!data.recent_library.length" class="text-xs text-gray-500 dark:text-gray-400">New books from your teachers show up here.</p>
          <ul v-else class="space-y-1">
            <li v-for="book in data.recent_library.slice(0, 4)" :key="book.id">
              <RouterLink to="/student/library" class="flex items-center gap-3 rounded-xl p-2 -mx-2 hover:bg-gray-50 dark:hover:bg-gray-700/40">
                <span class="w-9 h-11 flex-shrink-0 rounded-md bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-sm flex items-center justify-center">
                  <AppIcon name="book" class="w-4 h-4" />
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ niceTitle(book.title) }}</span>
                  <span class="block text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ book.subject_name }}</span>
                </span>
              </RouterLink>
            </li>
          </ul>
        </section>
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
import AppIcon from '@/components/common/AppIcon.vue'
import DashboardHero, { type HeroAction, type HeroChip, type HeroPart } from '@/components/dashboard/DashboardHero.vue'
import StudentWeek from '@/components/dashboard/StudentWeek.vue'
import ScoresCard from '@/components/dashboard/ScoresCard.vue'
import MyAchievements from '@/components/dashboard/MyAchievements.vue'
import VirtualLabWidget from '@/components/dashboard/VirtualLabWidget.vue'

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

const today = computed(() => new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
const toDate = (v: string) => new Date(v.replace(' ', 'T'))
const clock = (d: Date) => d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })

const overdueWork = computed(() => (data.value?.upcoming_assignments ?? []).filter(a => toDate(a.due_date) < new Date()))
const nextWork = computed(() => (data.value?.upcoming_assignments ?? []).slice().sort((p, q) => toDate(p.due_date).getTime() - toDate(q.due_date).getTime())[0] || null)
const liveToday = computed(() => (data.value?.upcoming_live_classes ?? []).filter(l => toDate(l.scheduled_start).toDateString() === new Date().toDateString()))

// "You have 1 piece of work to do (1 overdue), a live class at 2:00 PM, and your average is 71.5% and rising."
const daySentence = computed(() => {
  const d = data.value
  if (!d) return []
  type Part = HeroPart
  const bits: Part[][] = []
  const todo = d.stats.assignments_pending
  if (todo) {
    const b: Part[] = [{ text: 'you have ' }, { text: `${todo} ${todo === 1 ? 'piece' : 'pieces'} of work`, strong: true }, { text: ' to do' }]
    if (overdueWork.value.length) b.push({ text: ' - ' }, { text: `${overdueWork.value.length} overdue`, strong: true, alert: true })
    bits.push(b)
  }
  if (liveToday.value.length) {
    bits.push(liveToday.value.length === 1
      ? [{ text: 'a live class at ' }, { text: clock(toDate(liveToday.value[0].scheduled_start)), strong: true }]
      : [{ text: `${liveToday.value.length} live classes`, strong: true }, { text: ' today' }])
  }
  if (d.stats.average_score !== null) {
    const trend = d.performance.trend === 'improving' ? ' and rising' : d.performance.trend === 'declining' ? ', a little lower lately' : ''
    bits.push([{ text: 'your average is ' }, { text: `${d.stats.average_score}%`, strong: true }, { text: trend }])
  }
  if (!todo && !liveToday.value.length) bits.unshift([{ text: 'you are all caught up' }])
  const out: Part[] = []
  bits.forEach((b, i) => {
    if (i > 0) out.push({ text: i === bits.length - 1 ? ', and ' : ', ' })
    out.push(...b)
  })
  out.push({ text: '.' })
  out[0] = { ...out[0], text: out[0].text.charAt(0).toUpperCase() + out[0].text.slice(1) }
  return out
})

// The one thing to do first: join a live class, catch up overdue work, the next piece due, or revise
const primary = computed(() => {
  const d = data.value
  if (d && d.stats.live_now > 0) return { label: 'Join live class', to: '/student/live-classes', icon: 'video', danger: true }
  const w = overdueWork.value[0] || nextWork.value
  if (w) return { label: `${overdueWork.value.length ? 'Catch up' : 'Start'}: ${w.title}`, to: `/student/assignments/${w.id}/answer`, icon: 'clipboard', danger: overdueWork.value.length > 0 }
  return { label: "Start today's revision", to: '/student/revision', icon: 'flame', danger: false }
})
const actions = computed(() => [
  { label: 'eNotes', to: '/student/notes', icon: 'book', badge: 0 },
  { label: 'My notes', to: '/student/my-notes', icon: 'pencil', badge: 0 },
  { label: 'Item Bank', to: '/student/itembank', icon: 'document', badge: 0 },
  { label: 'Chats', to: '/student/chat', icon: 'chat', badge: data.value?.stats.unread_messages || 0 }
])
const heroChips = computed<HeroChip[]>(() => {
  const d = data.value
  if (!d) return []
  const out: HeroChip[] = []
  if (admissionNumber.value) out.push({ text: `No. ${admissionNumber.value}`, tone: 'solid' })
  out.push({ text: `${d.stats.classes_enrolled} ${d.stats.classes_enrolled === 1 ? 'class' : 'classes'}`, icon: 'users' })
  out.push({ text: `${d.stats.assignments_completed} done`, icon: 'clipboard' })
  return out
})
const heroActions = computed<HeroAction[]>(() => {
  if (!data.value) return []
  const p = primary.value
  return [{ label: p.label, to: p.to, icon: p.icon, danger: p.danger }, ...actions.value]
})
// "HISTORY BOOK 1" -> "History Book 1"
const niceTitle = (t: string) => (t === t.toUpperCase() ? t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : t)

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
