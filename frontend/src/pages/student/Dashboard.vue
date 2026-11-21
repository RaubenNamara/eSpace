<template>
  <!-- The student's home: a welcome banner, the school's notices, how their learning is going, what to
       continue, their classes and shortcuts, what needs them, and how the marks are going. Every
       number comes from their own data. Card styles (.sd-*) are in assets/style.css. -->
  <div class="w-full">
    <!-- A live class running now comes first -->
    <RouterLink v-if="data && data.stats.live_now > 0" to="/student/live-classes" class="mb-3 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-red-600 text-white shadow-md shadow-red-500/20 hover:bg-red-700">
      <span class="relative flex w-2.5 h-2.5 flex-shrink-0"><span class="absolute inset-0 rounded-full bg-white animate-ping opacity-70"></span><span class="relative w-2.5 h-2.5 rounded-full bg-white"></span></span>
      <p class="text-[0.95rem] font-semibold flex-1 truncate">{{ data.live_now[0]?.title || 'A live class' }}{{ data.stats.live_now > 1 ? ` and ${data.stats.live_now - 1} more` : '' }} - live now</p>
      <span class="px-3 py-1 rounded-lg bg-white text-red-700 text-sm font-bold">Join</span>
    </RouterLink>

    <!-- The welcome banner -->
    <!-- tucked up under the top bar (into the page's top padding), and kept short -->
    <section class="sd-hero relative overflow-hidden -mt-3 sm:-mt-5 mb-4 rounded-[1.25rem] h-[108px] sm:h-[118px] xl:h-[130px] shadow-sm" :class="`sd-hero-${period}`">
      <DaySky :period="period" :narrow="narrowSky" />
      <div class="relative h-full flex flex-col justify-center pl-4 sm:pl-6 pr-24 sm:pr-56 xl:pr-[32%]">
        <h1 class="font-brand text-[1.15rem] sm:text-[1.45rem] xl:text-[1.65rem] font-extrabold tracking-tight leading-tight truncate" :class="period === 'night' ? 'text-white' : 'text-[#061a55] dark:text-white'">{{ greeting }}, {{ firstName }}!</h1>
        <p class="mt-0.5 font-brand text-[0.78rem] sm:text-[0.9rem] xl:text-base font-semibold leading-snug" :class="period === 'night' ? 'text-blue-50' : 'text-[#10296e] dark:text-blue-100'">{{ dayLine }}</p>
        <p class="mt-0.5 sm:mt-1 text-[0.7rem] sm:text-[0.8rem] italic" :class="period === 'night' ? 'text-blue-200' : 'text-[#1d3a86] dark:text-blue-200'">"Small steps make big progress."</p>
      </div>
    </section>

    <NoticesTicker role="student" />

    <div v-if="error" class="mb-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-800 dark:text-red-200">{{ error }}</div>

    <!-- Two columns on a wide screen. On a phone the columns dissolve (display: contents) so the
         work waiting can sit high up, in the order set on each card. -->
    <div class="sd-grid grid grid-cols-1 lg:grid-cols-5 min-[1800px]:grid-cols-3 gap-4 mb-8">
      <div class="contents lg:flex lg:col-span-3 min-[1800px]:col-span-2 lg:flex-col lg:gap-4 min-w-0 lg:[&>*:last-child]:flex-grow">
        <!-- My Learning Overview -->
        <section class="sd-card order-1 lg:order-none">
          <header class="sd-card-head">
            <span class="sd-card-icon"><AppIcon name="chart" class="w-4 h-4" /></span>
            <h2 class="sd-card-title">My Learning Overview</h2>
            <RouterLink to="/student/learning-map" class="sd-card-link">View Details <span aria-hidden="true">→</span></RouterLink>
          </header>
          <!-- eight figures, two rows of four: the overview (each opens its page), then the summaries -->
          <div class="sd-tiles grid grid-cols-4 gap-1.5 sm:gap-3 p-2.5 sm:p-4">
            <RouterLink v-for="o in overview" :key="o.label" :to="o.to" class="sd-tile transition hover:-translate-y-0.5" :class="o.tile">
              <AppIcon :name="o.icon" class="w-5 h-5 sm:w-6 sm:h-6" :class="o.ink" />
              <span class="mt-1 text-base sm:text-xl font-extrabold font-brand text-[#061a55] dark:text-white tabular-nums leading-tight">{{ o.value }}</span>
              <span class="text-[10px] sm:text-xs lg:text-[11px] xl:text-xs font-medium text-gray-600 dark:text-gray-300 text-center leading-tight sm:whitespace-nowrap">{{ o.label }}</span>
            </RouterLink>
            <div v-for="t in summaryTiles" :key="t.label" class="sd-tile" :class="t.tile">
              <AppIcon :name="t.icon" class="w-5 h-5 sm:w-6 sm:h-6" :class="t.ink" />
              <span class="mt-1 text-base sm:text-xl font-extrabold font-brand text-[#061a55] dark:text-white tabular-nums leading-tight">{{ t.value }}</span>
              <span class="text-[10px] sm:text-xs lg:text-[11px] xl:text-xs font-medium text-gray-600 dark:text-gray-300 text-center leading-tight sm:whitespace-nowrap">{{ t.label }}</span>
            </div>
          </div>
        </section>

        <!-- Continue Learning -->
        <section class="dash-box order-2 lg:order-none">
          <h2 class="dash-bar"><AppIcon name="play" class="w-4 h-4" /> Continue Learning <RouterLink to="/student/enotes" class="dash-bar-link">Resume all <span aria-hidden="true">→</span></RouterLink></h2>
          <div v-if="!topicsLoaded" class="p-3"><div class="h-24 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
          <div v-else-if="nextTopic" class="sd-next px-3 py-2.5 sm:px-4 flex items-center gap-3">
            <span class="sd-topic-art flex-shrink-0"><SubjectMonogram :code="code(nextTopic.subject_name || 'eNotes')" :color="tint(nextTopic.subject_name || 'eNotes')" /></span>
            <div class="min-w-0 flex-1">
              <p class="text-[0.95rem] sm:text-base font-semibold tracking-[-0.005em] font-sans text-[#10296e] dark:text-white truncate" :title="nextTopic.title">{{ readableTitle(nextTopic.title) }}</p>
              <div class="mt-2 flex items-center gap-2.5">
                <span class="flex-1 h-2 rounded-full bg-blue-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full bg-emerald-500" :style="{ width: `${progressOf(nextTopic)}%` }"></span></span>
                <span class="flex-shrink-0 text-xs font-medium text-gray-600 dark:text-gray-300">{{ progressOf(nextTopic) }}% complete</span>
              </div>
            </div>
            <RouterLink :to="readerLink(nextTopic)" class="sd-continue flex-shrink-0" :aria-label="`${stateOf(nextTopic) === 'reading' ? 'Continue' : 'Start'} ${nextTopic.title}`">
              <AppIcon name="play" class="w-4 h-4" /><span class="hidden sm:inline">{{ stateOf(nextTopic) === 'reading' ? 'Continue' : 'Start' }}</span>
            </RouterLink>
          </div>
          <div v-else class="p-4 text-[0.95rem] text-gray-600 dark:text-gray-300">{{ topics.length ? "You've finished all your eNotes. Well done!" : 'Your eNotes appear here once a teacher publishes them to your class.' }}</div>
        </section>

        <!-- How the marks are going (each score and the trend), the week's activity, and the marks as a
             table: one graph at a time, chosen with the switch at the top of the card -->
        <GeneralPerformance class="order-7 lg:order-none">
          <template #activity-head>
            <div class="sd-weekbox">
              <h3 class="text-sm font-bold text-[#061a55] dark:text-white leading-snug">Your Activity This Week <span class="text-xs font-normal text-gray-500 dark:text-gray-400">(pages read, videos watched, books opened and work handed in)</span></h3>
            </div>
          </template>
          <template #activity>
            <div class="sd-weekbox">
              <div class="sd-week mt-1" role="img" :aria-label="weekSummary">
                <div v-for="d in week" :key="d.date" class="sd-week-col" tabindex="0" :aria-label="`${d.day}: ${d.count}`">
                  <span class="sd-week-tip">{{ d.day }}: {{ d.count }} {{ d.count === 1 ? 'activity' : 'activities' }}</span>
                  <div class="sd-week-track">
                    <span class="sd-week-bar" :class="{ 'sd-week-bar-zero': !d.count }" :style="{ height: d.count ? `${Math.max(8, (d.count / weekMax) * 100)}%` : undefined }"></span>
                  </div>
                  <span class="mt-1.5 text-xs" :class="d.date === todayKey ? 'font-bold text-[#0b5fe0] dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'">{{ d.day }}</span>
                </div>
              </div>
            </div>
          </template>
        </GeneralPerformance>
      </div>

      <div class="contents lg:flex lg:col-span-2 min-[1800px]:col-span-1 lg:flex-col lg:gap-4 min-w-0 lg:[&>*:last-child]:flex-grow">
        <!-- My Subjects (each subject the learner takes, with its class) -->
        <section class="dash-box order-5 lg:order-none">
          <h2 class="dash-bar"><AppIcon name="book" class="w-4 h-4" /> My Subjects <RouterLink to="/student/classes" class="dash-bar-link">Open All <span aria-hidden="true">→</span></RouterLink></h2>
          <div v-if="!classesLoaded" class="space-y-2 p-3"><div v-for="i in 4" :key="i" class="h-8 rounded-lg bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
          <p v-else-if="!classes.length" class="p-4 text-[0.95rem] text-gray-500 dark:text-gray-400">You are not taking any subjects yet.</p>
          <TransitionGroup v-else tag="ul" name="dash-pop" class="sd-rows px-3 py-1.5 divide-y divide-gray-100 dark:divide-gray-700/60">
            <li v-for="c in shown('classes', sortedClasses)" :key="c.id">
              <RouterLink to="/student/enotes" class="flex items-center gap-3 py-2 group">
                <span class="sd-pill" :style="{ background: tint(subjectOf(c)) }">{{ code(subjectOf(c)) }}</span>
                <span class="flex-1 min-w-0 text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{{ subjectOf(c) }}</span>
                <span class="flex-shrink-0 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-[#0b5fe0] dark:bg-blue-900/30 dark:text-blue-300">{{ c.name }}</span>
                <svg class="w-4 h-4 flex-shrink-0 text-[#0b5fe0] dark:text-blue-300 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              </RouterLink>
            </li>
          </TransitionGroup>
          <button v-if="sortedClasses.length > LIMIT.classes" type="button" class="dash-more" :aria-expanded="!!open.classes" @click="toggle('classes')">
            {{ open.classes ? 'Show less' : `Show ${sortedClasses.length - LIMIT.classes} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.classes ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>

        <!-- Jump In -->
        <section class="dash-box order-4 lg:order-none">
          <h2 class="dash-bar"><AppIcon name="bolt" class="w-4 h-4" /> Jump In</h2>
          <TransitionGroup tag="nav" name="dash-pop" class="grid grid-cols-4 xl:grid-cols-5 gap-1.5 sm:gap-2 xl:gap-1.5 min-[1800px]:gap-2 p-2.5 sm:p-3" aria-label="Shortcuts">
            <RouterLink v-for="s in shortcuts" :key="s.to" :to="s.to" class="sd-jump flex-col items-center min-w-0 lg:!px-0 lg:!py-2 min-[1800px]:!py-2.5" :class="[s.tile, s.wideOnly ? 'hidden xl:flex' : 'flex']">
              <AppIcon :name="s.icon" class="w-6 h-6 lg:w-5 lg:h-5 min-[1800px]:w-6 min-[1800px]:h-6" :class="s.ink" />
              <span class="mt-1 text-[11px] sm:text-xs lg:text-[10px] min-[1366px]:text-[11px] min-[1800px]:text-xs tracking-tight min-[1800px]:tracking-normal font-semibold text-gray-800 dark:text-gray-100 text-center leading-tight whitespace-nowrap">{{ s.label }}</span>
            </RouterLink>
          </TransitionGroup>
        </section>

        <!-- Need Attention: today's live classes, then what is most useful next (next-steps) -->
        <section class="sd-card order-3 lg:order-none">
          <header class="sd-card-head">
            <h2 class="sd-card-title">Need Attention</h2>
            <span v-if="todo.length" class="min-w-[22px] h-[22px] px-1 rounded-full bg-red-500 text-white text-xs font-bold leading-[22px] text-center">{{ todo.length }}</span>
            <RouterLink to="/student/assignments" class="sd-card-link">View All <span aria-hidden="true">→</span></RouterLink>
          </header>
          <div v-if="loading && !data" class="space-y-2 p-3"><div v-for="i in 3" :key="i" class="h-12 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
          <div v-else-if="!todo.length" class="p-4 flex items-center gap-3">
            <span class="w-10 h-10 flex-shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center"><AppIcon name="check" class="w-5 h-5" /></span>
            <p class="text-[0.95rem] text-gray-700 dark:text-gray-200">Nothing waiting - you're all caught up. Well done!</p>
          </div>
          <TransitionGroup v-else tag="ul" name="dash-pop" class="sd-rows px-3 py-1 divide-y divide-gray-100 dark:divide-gray-700/60">
            <li v-for="item in shown('pending', todo)" :key="item.key">
              <RouterLink :to="item.to" class="flex items-center gap-3 py-2.5 group" @click="item.mark && markRevised(item.mark)">
                <span class="sd-dot" :style="{ background: tint(item.subject || item.title) }">{{ code(item.subject || item.title) }}</span>
                <span class="min-w-0 flex-1">
                  <span class="block text-sm font-bold text-[#061a55] dark:text-white truncate">{{ item.title }}</span>
                  <span class="block text-xs truncate" :class="item.alert ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-gray-600 dark:text-gray-400'">{{ item.action }} · {{ item.meta }}</span>
                </span>
                <svg class="w-4 h-4 flex-shrink-0 text-[#0b5fe0] dark:text-blue-300 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              </RouterLink>
            </li>
          </TransitionGroup>
          <button v-if="todo.length > LIMIT.pending" type="button" class="dash-more" :aria-expanded="!!open.pending" @click="toggle('pending')">
            {{ open.pending ? 'Show less' : `Show ${todo.length - LIMIT.pending} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.pending ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>

        <!-- Publications: A level students' work from GP - A level only -->
        <section v-if="publicationsAccess.allowed.value && publications.length" class="dash-box order-8 lg:order-none">
          <h2 class="dash-bar">Publications <RouterLink to="/student/publications" class="dash-bar-link">All</RouterLink></h2>
          <TransitionGroup tag="ul" name="dash-pop" class="p-3 space-y-2">
            <li v-for="p in shown('publications', publications)" :key="p.id">
              <RouterLink :to="{ path: '/student/publications', query: { open: String(p.id) } }" class="dash-chip">
                <span class="dash-chip-badge" :style="{ background: tint(p.title) }">GP</span>
                <span class="min-w-0 flex-1">
                  <span class="block text-sm font-bold text-gray-900 dark:text-white truncate">{{ p.title }}</span>
                  <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">By {{ p.author_name }}<template v-if="p.author_class"> · {{ p.author_class }}</template></span>
                </span>
                <span v-if="isFreshPublication(p)" class="flex-shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold text-white bg-indigo-600">NEW</span>
              </RouterLink>
            </li>
          </TransitionGroup>
          <button v-if="publications.length > LIMIT.publications" type="button" class="dash-more" :aria-expanded="!!open.publications" @click="toggle('publications')">
            {{ open.publications ? 'Show less' : `Show ${publications.length - LIMIT.publications} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.publications ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import NoticesTicker from '@/components/dashboard/NoticesTicker.vue'
import GeneralPerformance from '@/components/dashboard/GeneralPerformance.vue'
import DaySky, { type DayPeriod } from '@/components/dashboard/DaySky.vue'
import SubjectMonogram from '@/components/dashboard/SubjectMonogram.vue'
import { useLiveRefresh } from '@/composables/useLiveRefresh'
import { usePublicationsAccess } from '@/composables/usePublicationsAccess'
import { useAuthStore } from '@/stores/auth'
import type { Publication } from '@/utils/publications'

interface LiveClass { id: number; title: string; status: string; scheduled_start: string; subject_name: string; teacher_name: string }
interface DashboardData {
  stats: { assignments_pending: number; assignments_completed: number; average_score: number | null; live_now: number }
  live_now: LiveClass[]
  upcoming_live_classes: LiveClass[]
  upcoming_assignments: { id: number; title: string; subject_name: string; due_date: string | null; status: string }[]
  learning?: Learning
}
interface StudentClass { id: number; name: string; department_name: string | null }
interface Learning { minutes: number; books_read: number; week: { day: string; date: string; count: number }[] }
interface Topic { id: number; title: string; subject_name?: string | null; active_pages?: number; total_pages?: number; resume_page_id?: number | null; resume_page_number?: number | null; pages_reached?: number | string | null; progress_last_read_at?: string | null }

const authStore = useAuthStore()
const data = ref<DashboardData | null>(null)
const loading = ref(false)
const error = ref('')

const firstName = computed(() => {
  const u = authStore.user as any
  const name = u?.first_name || String(authStore.userName || '').split(' ')[0] || ''
  return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : 'there'
})
// The banner follows the learner's clock: the greeting, the line under it and the sky (sun or moon)
const periodAt = (h: number): DayPeriod => (h >= 5 && h < 12 ? 'morning' : h >= 12 && h < 16 ? 'afternoon' : h >= 16 && h < 19 ? 'evening' : 'night')
const period = ref<DayPeriod>(periodAt(new Date().getHours()))
const periodTimer = window.setInterval(() => { period.value = periodAt(new Date().getHours()) }, 60_000)
const narrowQuery = window.matchMedia('(max-width: 639px)')
const narrowSky = ref(narrowQuery.matches)
const onNarrow = (e: MediaQueryListEvent) => { narrowSky.value = e.matches }
narrowQuery.addEventListener('change', onNarrow)
onUnmounted(() => { window.clearInterval(periodTimer); narrowQuery.removeEventListener('change', onNarrow) })
const greeting = computed(() => (period.value === 'morning' ? 'Good morning' : period.value === 'afternoon' ? 'Good afternoon' : 'Good evening'))
const dayLine = computed(() => ({
  morning: 'A fresh day to learn something new.',
  afternoon: "Keep learning. You're doing great!",
  evening: 'A little revision this evening goes a long way.',
  night: "Rest well. Tomorrow's lessons are waiting.",
})[period.value])
const toDate = (v: string) => new Date(v.replace(' ', 'T'))
const isToday = (d: Date) => d.toDateString() === new Date().toDateString()
const dueText = (v: string | null) => {
  if (!v) return 'no due date'
  const d = toDate(v)
  const time = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  if (isToday(d)) return `due today, ${time}`
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (d.toDateString() === tomorrow.toDateString()) return `due tomorrow, ${time}`
  return `due ${d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}`
}

// Subject badges: one bright colour each, the same subject always the same colour
const TINTS = ['#0a8a5f', '#6d3fe0', '#1a6fe0', '#0d8177', '#c95f08', '#d02a7c', '#2f55d4', '#b34e0a']
const tint = (name: string) => TINTS[[...name].reduce((h, c) => h + c.charCodeAt(0), 0) % TINTS.length]
// Titles typed in capitals read better in title case ("MEASUREMENTS IN PHYSICS" -> "Measurements in Physics");
// short words stay lower case, and anything already mixed case is left as typed
const SMALL_WORDS = new Set(['a', 'an', 'and', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with'])
const readableTitle = (t: string) => (t !== t.toUpperCase() || !/[A-Z]{2}/.test(t) ? t : t.toLowerCase().replace(/[a-z][a-z']*/g, (w, i) => (i > 0 && SMALL_WORDS.has(w) ? w : w[0].toUpperCase() + w.slice(1))))
const code = (name: string) => name.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || '?'

// ---- To do: live classes later today, then the next steps (most useful first: work started,
// work due soon, notes to read before an assessment, revision from a teacher, reading to finish,
// outcomes to strengthen). If those can't load, the assessments - overdue first, then by due date.
interface NextStep { kind: string; title: string; detail: string; subject: string; overdue: boolean; action: { label: string; to: string; mark?: string } }
const steps = ref<NextStep[] | null>(null)
const loadSteps = () => axios.get('/api/student/next-steps', { params: { limit: 12 } })
  .then(r => { steps.value = r.data.data.steps || [] })
  .catch(() => { if (steps.value === null) steps.value = null })
// Opening revision a teacher sent counts as revising it
const markRevised = (url: string) => { axios.post(url).catch(() => {}) }

const todo = computed(() => {
  const d = data.value
  if (!d) return []
  const live = d.upcoming_live_classes
    .filter(l => isToday(toDate(l.scheduled_start)))
    .map(l => ({ key: `live-${l.id}`, title: l.title, subject: l.subject_name, meta: `${l.subject_name} · live at ${toDate(l.scheduled_start).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`, to: '/student/live-classes', action: 'Open', alert: false, mark: '' }))
  if (steps.value) {
    return [...live, ...steps.value.map((s, i) => ({
      key: `step-${i}-${s.action.to}`, title: s.title, subject: s.subject || '', meta: s.overdue ? `Overdue · ${s.detail}` : s.detail,
      to: s.action.to, action: s.action.label, alert: s.overdue, mark: s.action.mark || ''
    }))]
  }
  const work = d.upcoming_assignments
    .slice()
    .sort((a, b) => (a.status === 'overdue' ? 0 : 1) - (b.status === 'overdue' ? 0 : 1) || (a.due_date ? toDate(a.due_date).getTime() : Infinity) - (b.due_date ? toDate(b.due_date).getTime() : Infinity))
    .map(a => ({ key: `work-${a.id}`, title: a.title, subject: a.subject_name, meta: a.status === 'overdue' ? 'Overdue' : dueText(a.due_date), to: `/student/assignments/${a.id}/answer`, action: a.status === 'in_progress' ? 'Continue' : 'Start', alert: a.status === 'overdue', mark: '' }))
  return [...live, ...work].slice(0, 6)
})

// ---- each card shows a few, and opens up to show the rest
const LIMIT = { pending: 5, classes: 6, publications: 3 } as const
type CardKey = keyof typeof LIMIT
const open = ref<Partial<Record<CardKey, boolean>>>({})
const toggle = (k: CardKey) => { open.value = { ...open.value, [k]: !open.value[k] } }
const shown = <T,>(k: CardKey, list: T[]) => (open.value[k] ? list : list.slice(0, LIMIT[k]))

// ---- classes, shortcuts, notes
const classes = ref<StudentClass[]>([])
const classesLoaded = ref(false)
const subjectOf = (c: StudentClass) => c.department_name || c.name
const sortedClasses = computed(() => classes.value.slice().sort((a, b) => subjectOf(a).localeCompare(subjectOf(b))))
// wideOnly: from laptop width up (five a row); phones and tablets keep to two rows of four
const shortcuts: { label: string; to: string; icon: string; tile: string; ink: string; wideOnly?: boolean }[] = [
  { label: 'eNotes', to: '/student/enotes', icon: 'book', tile: 'sd-t-blue', ink: 'sd-i-blue' },
  { label: 'Live classes', to: '/student/live-classes', icon: 'camera', tile: 'sd-t-rose', ink: 'sd-i-rose' },
  { label: 'eLibrary', to: '/student/library', icon: 'document', tile: 'sd-t-mint', ink: 'sd-i-mint' },
  { label: 'Item Bank', to: '/student/itembank', icon: 'target', tile: 'sd-t-violet', ink: 'sd-i-violet' },
  { label: 'Achievements', to: '/student/achievements', icon: 'trophy', tile: 'sd-t-peach', ink: 'sd-i-peach', wideOnly: true },
  { label: 'Videos', to: '/student/videos', icon: 'video', tile: 'sd-t-violet', ink: 'sd-i-violet' },
  { label: 'Virtual Lab', to: '/student/virtual-lab', icon: 'beaker', tile: 'sd-t-mint', ink: 'sd-i-mint' },
  { label: 'Learning Map', to: '/student/learning-map', icon: 'map', tile: 'sd-t-peach', ink: 'sd-i-peach', wideOnly: true },
  { label: 'Summaries', to: '/student/my-notes', icon: 'pencil', tile: 'sd-t-peach', ink: 'sd-i-peach' },
  { label: 'Downloads', to: '/student/downloads', icon: 'download', tile: 'sd-t-blue', ink: 'sd-i-blue' }
]

// ---- eNotes: lessons done, overall progress and what to continue
const topics = ref<Topic[]>([])
const topicsLoaded = ref(false)
const progressOf = (t: Topic) => {
  // the farthest page reached (progress_percent and progress_completed_at only record that it was opened)
  const total = Number(t.active_pages || t.total_pages || 0)
  const reached = Math.max(Number(t.pages_reached || 0), Number(t.resume_page_number || 0))
  return total && reached ? Math.min(100, Math.round((reached / total) * 100)) : 0
}
const stateOf = (t: Topic): 'done' | 'reading' | 'new' =>
  progressOf(t) >= 100 ? 'done' : (t.progress_last_read_at || t.resume_page_id) ? 'reading' : 'new'
// The topic read most recently and not finished, or else the first not started
const nextTopic = computed(() => topics.value
  .filter(t => stateOf(t) === 'reading')
  .sort((a, b) => String(b.progress_last_read_at || '').localeCompare(String(a.progress_last_read_at || '')))[0]
  ?? topics.value.find(t => stateOf(t) === 'new') ?? null)
const readerLink = (t: Topic) => `/student/enotes/${t.id}?${stateOf(t) === 'reading' && t.resume_page_id ? `resumePage=${t.resume_page_id}&` : ''}opened=1`

const overview = computed(() => {
  const list = topics.value
  const done = list.filter(t => stateOf(t) === 'done').length
  const overall = list.length ? Math.round(list.reduce((n, t) => n + progressOf(t), 0) / list.length) : 0
  return [
    { label: 'My Classes', tile: 'sd-t-blue', ink: 'sd-i-blue', value: classes.value.length, icon: 'book', to: '/student/classes', color: 'linear-gradient(135deg,#4f9bf7,#1a6fe0)', ring: 'rgba(26,123,240,.14)' },
    { label: 'Lessons Completed', tile: 'sd-t-rose', ink: 'sd-i-rose', value: done, icon: 'check', to: '/student/enotes', color: 'linear-gradient(135deg,#34c77b,#0e9f5c)', ring: 'rgba(14,159,92,.14)' },
    { label: 'Assessments Pending', tile: 'sd-t-peach', ink: 'sd-i-peach', value: data.value?.stats.assignments_pending ?? 0, icon: 'document', to: '/student/assignments', color: 'linear-gradient(135deg,#fbab3c,#f0760f)', ring: 'rgba(240,118,15,.14)' },
    { label: 'Overall Progress', tile: 'sd-t-violet', ink: 'sd-i-violet', value: `${overall}%`, icon: 'star', to: '/student/learning-map', color: 'linear-gradient(135deg,#9a6bf5,#6d3fe0)', ring: 'rgba(109,63,224,.14)' }
  ]
})

// ---- My Summaries
const learningTime = (min: number) => {
  if (min < 60) return `${min}m`
  const h = Math.floor(min / 60)
  return `${h}h${min % 60 && h < 10 ? ` ${min % 60}m` : ''}`
}
const summaryTiles = computed(() => {
  const l = data.value?.learning
  const avg = data.value?.stats.average_score
  return [
    { label: 'Notes Read', value: topics.value.filter(t => stateOf(t) !== 'new').length, icon: 'book', tile: 'sd-t-violet', ink: 'sd-i-violet' },
    { label: 'Learning Time', value: learningTime(l?.minutes ?? 0), icon: 'clock', tile: 'sd-t-mint', ink: 'sd-i-mint' },
    { label: 'Books Read', value: l?.books_read ?? 0, icon: 'document', tile: 'sd-t-blue', ink: 'sd-i-blue' },
    { label: 'Avg Score', value: avg === null || avg === undefined ? '-' : `${Math.round(Number(avg))}%`, icon: 'trophy', tile: 'sd-t-peach', ink: 'sd-i-peach' }
  ]
})
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const week = computed(() => data.value?.learning?.week ?? DAYS.map(day => ({ day, date: day, count: 0 })))
const weekMax = computed(() => Math.max(1, ...week.value.map(d => d.count)))
const weekSummary = computed(() => `Your activity this week: ${week.value.map(d => `${d.day} ${d.count}`).join(', ')}`)
const pad = (n: number) => String(n).padStart(2, '0')
const now = new Date()
const todayKey = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`

// ---- publications (A level only), newest first
const publicationsAccess = usePublicationsAccess()
publicationsAccess.check('student')
const publications = ref<Publication[]>([])
const isFreshPublication = (p: Publication) => !!p.published_at && Date.now() - toDate(p.published_at).getTime() < 14 * 86400000
const loadPublications = () => {
  axios.get('/api/student/publications').then(r => { publications.value = (r.data.data.publications || []).slice(0, 10) }).catch(() => {})
}
watch(publicationsAccess.allowed, ok => { if (ok) loadPublications() }, { immediate: true })

// silent: the live refresh - no loading state, and a failed refresh leaves the page as it was
const loadDashboard = async (silent = false) => {
  if (!silent) {
    loading.value = true
    error.value = ''
  }
  try {
    const response = await axios.get('/api/student/dashboard')
    if (response.data.success) data.value = response.data.data
  } catch (err: any) {
    if (!silent) error.value = err.response?.data?.message || 'Your dashboard could not load.'
  } finally {
    if (!silent) loading.value = false
  }
}

useLiveRefresh(() => { loadDashboard(true); loadSteps() })
onMounted(() => {
  loadDashboard()
  loadSteps()
  axios.get('/api/student/classes').then(r => { classes.value = r.data.data || [] }).catch(() => {}).finally(() => { classesLoaded.value = true })
  axios.get('/api/student/enotes/topics').then(r => { topics.value = r.data.data.topics || [] }).catch(() => {}).finally(() => { topicsLoaded.value = true })
})
</script>
