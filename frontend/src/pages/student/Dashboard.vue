<template>
  <!-- The student's home, in eSpace's green, white and black. The school's notices slide past at
       the top; a progress card with a gauge says how the term is going; then the work waiting,
       shortcuts, classes and notes - each showing a few, opening up for the rest. -->
  <div class="w-full">
    <!-- A live class running now comes first -->
    <RouterLink v-if="data && data.stats.live_now > 0" to="/student/live-classes" class="mb-3 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-red-600 text-white shadow-md shadow-red-500/20 hover:bg-red-700">
      <span class="relative flex w-2.5 h-2.5 flex-shrink-0"><span class="absolute inset-0 rounded-full bg-white animate-ping opacity-70"></span><span class="relative w-2.5 h-2.5 rounded-full bg-white"></span></span>
      <p class="text-[0.95rem] font-semibold flex-1 truncate">{{ data.live_now[0]?.title || 'A live class' }}{{ data.stats.live_now > 1 ? ` and ${data.stats.live_now - 1} more` : '' }} - live now</p>
      <span class="px-3 py-1 rounded-lg bg-white text-red-700 text-sm font-bold">Join</span>
    </RouterLink>

    <!-- Greeting -->
    <header class="mb-3">
      <p class="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{{ today }}</p>
      <h1 class="text-2xl sm:text-[1.7rem] font-extrabold tracking-tight text-gray-900 dark:text-white truncate">{{ greeting }}, {{ firstName }}</h1>
    </header>

    <!-- Notices, sliding past -->
    <section v-if="notices.length" class="mb-4">
      <div class="ticker flex items-stretch rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm ring-1 ring-indigo-200 dark:ring-indigo-900">
        <div class="relative z-10 flex items-center gap-2 pl-3 pr-4 bg-indigo-800 text-white flex-shrink-0 ticker-label">
          <AppIcon name="speaker" class="w-5 h-5" />
          <span class="text-sm font-extrabold uppercase tracking-wide">Notices</span>
          <span v-if="unreadNotices" class="min-w-[1.25rem] h-5 px-1.5 rounded-full bg-amber-400 text-gray-900 text-xs font-extrabold flex items-center justify-center animate-pulse">{{ unreadNotices }}</span>
        </div>
        <div class="relative flex-1 min-w-0 overflow-hidden ticker-window">
          <div class="ticker-track flex w-max" :style="{ animationDuration: `${tickerSeconds}s` }">
            <template v-for="copy in tickerCopies" :key="copy">
              <button
                v-for="n in notices"
                :key="`${copy}-${n.id}`"
                type="button"
                class="flex items-center gap-2 px-5 py-2.5 whitespace-nowrap text-[0.95rem] hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                :aria-hidden="copy > 1"
                :tabindex="copy > 1 ? -1 : 0"
                @click="showNotice(n)"
              >
                <span v-if="!n.is_read && !n.mine" class="px-1.5 py-0.5 rounded-md bg-amber-400 text-gray-900 text-[10px] font-extrabold uppercase">New</span>
                <span class="font-bold text-gray-900 dark:text-white">{{ n.title }}</span>
                <span class="text-gray-600 dark:text-gray-300">- {{ oneLine(n.body) }}</span>
                <span class="text-indigo-500 pl-3" aria-hidden="true">●</span>
              </button>
            </template>
          </div>
        </div>
      </div>
      <Transition name="drop">
        <div v-if="opened" class="mt-2 rounded-2xl bg-white dark:bg-gray-800 shadow-sm ring-1 ring-indigo-200 dark:ring-indigo-900 p-4">
          <div class="flex items-start gap-3">
            <div class="min-w-0 flex-1">
              <p class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{{ niceName(opened.author_name) }} · {{ shortDate(opened.created_at) }}</p>
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ opened.title }}</h2>
              <p class="mt-1 text-[0.95rem] leading-relaxed text-gray-700 dark:text-gray-200 whitespace-pre-line">{{ opened.body }}</p>
            </div>
            <button type="button" class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close" @click="opened = null">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
        </div>
      </Transition>
    </section>

    <div v-if="error" class="mb-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-800 dark:text-red-200">{{ error }}</div>

    <!-- Two columns on a wide screen; on a phone one column, progress first -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      <div class="contents lg:flex lg:col-span-2 lg:flex-col lg:gap-4 min-w-0">
        <!-- Pending assessments -->
        <section class="box order-2 lg:order-none">
          <h2 class="box-bar">Pending assessments <RouterLink to="/student/assignments" class="box-bar-link">See all</RouterLink></h2>
          <div v-if="loading && !data" class="grid sm:grid-cols-2 gap-2 p-3"><div v-for="i in 4" :key="i" class="h-12 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
          <div v-else-if="!todo.length" class="p-4 flex items-center gap-3">
            <span class="w-10 h-10 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center"><AppIcon name="check" class="w-5 h-5" /></span>
            <p class="text-[0.95rem] text-gray-700 dark:text-gray-200">Nothing waiting - you're all caught up. Well done!</p>
          </div>
          <TransitionGroup v-else tag="ul" name="pop" class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3">
            <li v-for="item in shown('pending', todo)" :key="item.key" class="min-w-0">
              <RouterLink :to="item.to" class="chip group" :class="item.alert ? 'chip-alert' : ''">
                <span class="chip-badge" :style="{ background: tint(item.subject) }">{{ code(item.subject) }}</span>
                <span class="min-w-0 flex-1">
                  <span class="block text-sm font-bold text-gray-900 dark:text-white truncate">{{ item.title }}</span>
                  <span class="block text-xs truncate" :class="item.alert ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-gray-500 dark:text-gray-400'">{{ item.meta }}</span>
                </span>
                <span class="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-indigo-600 group-hover:bg-indigo-700 transition">{{ item.action }}</span>
              </RouterLink>
            </li>
          </TransitionGroup>
          <button v-if="todo.length > LIMIT.pending" type="button" class="more-btn" :aria-expanded="!!open.pending" @click="toggle('pending')">
            {{ open.pending ? 'Show less' : `Show ${todo.length - LIMIT.pending} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.pending ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>

        <!-- Shortcuts to the main modules -->
        <section class="box order-3 lg:order-none">
          <h2 class="box-bar">Jump in</h2>
          <TransitionGroup tag="nav" name="pop" class="grid grid-cols-4 gap-1 sm:gap-2 p-2 sm:p-3" aria-label="Shortcuts">
            <RouterLink v-for="s in shown('jump', shortcuts)" :key="s.to" :to="s.to" class="group flex flex-col items-center gap-1.5 rounded-xl py-2.5 px-1 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition min-w-0">
              <span class="w-11 h-11 rounded-2xl flex items-center justify-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-900 group-hover:bg-indigo-600 group-hover:text-white transition"><AppIcon :name="s.icon" class="w-5 h-5" /></span>
              <span class="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100 text-center leading-tight">{{ s.label }}</span>
            </RouterLink>
          </TransitionGroup>
          <button type="button" class="more-btn" :aria-expanded="!!open.jump" @click="toggle('jump')">
            {{ open.jump ? 'Show less' : `Show ${shortcuts.length - LIMIT.jump} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.jump ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>
      </div>

      <div class="contents lg:flex lg:flex-col lg:gap-4 min-w-0">
        <!-- How the term is going: a gauge, like a score meter -->
        <section class="box order-1 lg:order-none">
          <h2 class="box-bar justify-center">Your progress this term</h2>
          <div v-if="loading && !data" class="h-36 m-4 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
          <div v-else-if="data" class="px-4 pt-3 pb-4">
            <div class="flex items-center gap-3">
              <svg viewBox="0 0 120 70" class="w-[46%] max-w-[11rem] flex-shrink-0" role="img" :aria-label="`${gauge.label}: ${gauge.text}`">
                <defs>
                  <linearGradient id="gaugeGrad" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stop-color="#dc2626" />
                    <stop offset="45%" stop-color="#f59e0b" />
                    <stop offset="100%" stop-color="#15874a" />
                  </linearGradient>
                </defs>
                <path d="M12 62 A48 48 0 0 1 108 62" fill="none" stroke="url(#gaugeGrad)" stroke-width="10" stroke-linecap="round" />
                <g :style="{ transform: `rotate(${gauge.angle}deg)`, transformOrigin: '60px 62px', transition: 'transform 1s cubic-bezier(.3,1.4,.5,1)' }">
                  <path d="M60 62 L57 60 L60 22 L63 60 Z" class="fill-gray-900 dark:fill-white" />
                </g>
                <circle cx="60" cy="62" r="5" class="fill-gray-900 dark:fill-white" />
                <text x="12" y="70" font-size="7" class="fill-gray-400">Low</text>
                <text x="108" y="70" font-size="7" text-anchor="end" class="fill-gray-400">High</text>
              </svg>
              <div class="min-w-0">
                <p class="text-[2rem] font-extrabold leading-none text-indigo-600 dark:text-indigo-400 tabular-nums">{{ gauge.text }}</p>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">{{ gauge.label }}</p>
                <span class="mt-1.5 inline-block px-2 py-0.5 rounded-md text-xs font-bold text-white" :class="gauge.tone">{{ gauge.word }}</span>
              </div>
            </div>
            <div class="mt-3 grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <RouterLink v-for="t in tiles" :key="t.label" :to="t.to" class="py-2 text-center hover:bg-indigo-50/60 dark:hover:bg-indigo-950/30 first:rounded-l-xl last:rounded-r-xl">
                <p class="text-lg font-extrabold tabular-nums" :class="t.alert ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'">{{ t.value }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ t.label }}</p>
              </RouterLink>
            </div>
          </div>
        </section>

        <!-- My classes -->
        <section class="box order-4 lg:order-none">
          <h2 class="box-bar">My classes <RouterLink to="/student/classes" class="box-bar-link">Open</RouterLink></h2>
          <div v-if="!classesLoaded" class="grid grid-cols-2 gap-2 p-3"><div v-for="i in 6" :key="i" class="h-12 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
          <p v-else-if="!classes.length" class="p-4 text-[0.95rem] text-gray-500 dark:text-gray-400">You are not in any class yet.</p>
          <TransitionGroup v-else tag="div" name="pop" class="grid grid-cols-2 gap-2 p-3">
            <RouterLink v-for="c in shown('classes', sortedClasses)" :key="c.id" to="/student/enotes" class="chip">
              <span class="chip-badge" :style="{ background: tint(subjectOf(c)) }">{{ code(subjectOf(c)) }}</span>
              <span class="min-w-0">
                <span class="block text-sm font-bold text-gray-900 dark:text-white truncate">{{ subjectOf(c) }}</span>
                <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">{{ c.name }}</span>
              </span>
            </RouterLink>
          </TransitionGroup>
          <button v-if="sortedClasses.length > LIMIT.classes" type="button" class="more-btn" :aria-expanded="!!open.classes" @click="toggle('classes')">
            {{ open.classes ? 'Show less' : `Show ${sortedClasses.length - LIMIT.classes} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.classes ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>

        <!-- My notes -->
        <section class="box order-5 lg:order-none">
          <h2 class="box-bar">My notes <RouterLink to="/student/my-notes" class="box-bar-link">All</RouterLink></h2>
          <div v-if="!notesLoaded" class="space-y-2 p-3"><div v-for="i in 2" :key="i" class="h-14 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
          <div v-else-if="!myNotes.length" class="m-3 rounded-xl bg-gradient-to-r from-lime-100 to-indigo-50 dark:from-indigo-950/50 dark:to-indigo-900/30 p-3.5">
            <p class="text-[0.95rem] font-medium text-indigo-900 dark:text-indigo-100">Write notes while you read eNotes and books - they all collect here.</p>
            <RouterLink to="/student/enotes" class="mt-2 inline-block px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold">Start reading</RouterLink>
          </div>
          <TransitionGroup v-else tag="ul" name="pop" class="p-3 space-y-2">
            <li v-for="n in shown('notes', myNotes)" :key="n.id">
              <RouterLink to="/student/my-notes" class="block rounded-xl bg-gradient-to-r from-lime-50 to-indigo-50 dark:from-indigo-950/40 dark:to-indigo-900/20 px-3 py-2 hover:-translate-y-0.5 transition">
                <span class="block text-xs font-semibold text-indigo-700 dark:text-indigo-300 truncate">{{ n.subject }} · {{ n.source }}{{ n.page ? ` · p. ${n.page}` : '' }}</span>
                <span class="block text-sm text-gray-900 dark:text-white line-clamp-2">{{ n.text }}</span>
              </RouterLink>
            </li>
          </TransitionGroup>
          <button v-if="myNotes.length > LIMIT.notes" type="button" class="more-btn" :aria-expanded="!!open.notes" @click="toggle('notes')">
            {{ open.notes ? 'Show less' : `Show ${myNotes.length - LIMIT.notes} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.notes ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import { useLiveRefresh } from '@/composables/useLiveRefresh'
import { useAuthStore } from '@/stores/auth'

interface LiveClass { id: number; title: string; status: string; scheduled_start: string; subject_name: string; teacher_name: string }
interface DashboardData {
  stats: { assignments_pending: number; assignments_completed: number; average_score: number | null; live_now: number }
  live_now: LiveClass[]
  upcoming_live_classes: LiveClass[]
  upcoming_assignments: { id: number; title: string; subject_name: string; due_date: string | null; status: string }[]
}
interface Notice { id: number; title: string; body: string; author_name: string; pinned: boolean; created_at: string; is_read: boolean; mine: boolean }
interface StudentClass { id: number; name: string; department_name: string | null }
interface MyNote { id: string; subject: string; source: string; page: number; text: string; updated_at: string }

const authStore = useAuthStore()
const data = ref<DashboardData | null>(null)
const loading = ref(false)
const error = ref('')

const firstName = computed(() => {
  const u = authStore.user as any
  const name = u?.first_name || String(authStore.userName || '').split(' ')[0] || ''
  return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : 'there'
})
const greeting = computed(() => {
  const hour = new Date().getHours()
  return hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
})
const today = new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })

const toDate = (v: string) => new Date(v.replace(' ', 'T'))
const isToday = (d: Date) => d.toDateString() === new Date().toDateString()
const shortDate = (v: string) => (isToday(toDate(v)) ? 'today' : toDate(v).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }))
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

// Subject badges: shades of the brand green, and near-black
const TINTS = ['#15874a', '#126c3d', '#22a45d', '#0f472b', '#1f2937', '#46bf7b', '#115633', '#374151']
const tint = (name: string) => TINTS[[...name].reduce((h, c) => h + c.charCodeAt(0), 0) % TINTS.length]
const code = (name: string) => name.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || '?'

// ---- progress: the gauge shows the average once something is marked, else how much work is done
const overdue = computed(() => (data.value?.upcoming_assignments ?? []).filter(a => a.status === 'overdue').length)
const progress = computed(() => {
  const d = data.value
  const done = d?.stats.assignments_completed ?? 0
  const total = done + (d?.stats.assignments_pending ?? 0)
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
})
const gauge = computed(() => {
  const avg = data.value?.stats.average_score ?? null
  const value = avg !== null ? Math.round(avg) : progress.value.pct
  const word = value >= 80 ? 'Excellent' : value >= 60 ? 'Good' : value >= 40 ? 'Fair' : avg === null && !progress.value.total ? 'Ready' : 'Keep going'
  const tone = value >= 60 ? 'bg-indigo-700' : value >= 40 ? 'bg-amber-500' : 'bg-gray-800 dark:bg-gray-600'
  return {
    angle: -90 + (Math.min(100, Math.max(0, value)) / 100) * 180,
    text: avg !== null ? `${value}%` : `${progress.value.done}/${progress.value.total}`,
    label: avg !== null ? 'Your average mark' : 'Assessments done',
    word,
    tone
  }
})
const tiles = computed(() => {
  const d = data.value!
  return [
    { label: 'Pending', value: String(d.stats.assignments_pending), to: '/student/assignments', alert: false },
    { label: 'Overdue', value: String(overdue.value), to: '/student/assignments', alert: overdue.value > 0 },
    { label: 'Done', value: String(d.stats.assignments_completed), to: '/student/reports', alert: false }
  ]
})

// ---- pending work: live classes later today, then assessments - overdue first, then by due date
const todo = computed(() => {
  const d = data.value
  if (!d) return []
  const live = d.upcoming_live_classes
    .filter(l => isToday(toDate(l.scheduled_start)))
    .map(l => ({ key: `live-${l.id}`, title: l.title, subject: l.subject_name, meta: `${l.subject_name} · live at ${toDate(l.scheduled_start).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`, to: '/student/live-classes', action: 'Open', alert: false }))
  const work = d.upcoming_assignments
    .slice()
    .sort((a, b) => (a.status === 'overdue' ? 0 : 1) - (b.status === 'overdue' ? 0 : 1) || (a.due_date ? toDate(a.due_date).getTime() : Infinity) - (b.due_date ? toDate(b.due_date).getTime() : Infinity))
    .map(a => ({ key: `work-${a.id}`, title: a.title, subject: a.subject_name, meta: a.status === 'overdue' ? 'Overdue' : dueText(a.due_date), to: `/student/assignments/${a.id}/answer`, action: a.status === 'in_progress' ? 'Continue' : 'Start', alert: a.status === 'overdue' }))
  return [...live, ...work].slice(0, 6)
})

// ---- each card shows a few, and opens up to show the rest
const LIMIT = { pending: 4, jump: 4, classes: 6, notes: 2 } as const
type CardKey = keyof typeof LIMIT
const open = ref<Partial<Record<CardKey, boolean>>>({})
const toggle = (k: CardKey) => { open.value = { ...open.value, [k]: !open.value[k] } }
const shown = <T,>(k: CardKey, list: T[]) => (open.value[k] ? list : list.slice(0, LIMIT[k]))

// ---- notices: a ticker; tapping one opens it in full and counts as read
const notices = ref<Notice[]>([])
const opened = ref<Notice | null>(null)
const unreadNotices = computed(() => notices.value.filter(n => !n.is_read && !n.mine).length)
const oneLine = (t: string) => t.replace(/\s+/g, ' ').trim()
// Enough copies to run wider than any screen (an even number, so sliding half-way loops seamlessly),
// at a steady reading speed whatever the length
const tickerChars = computed(() => notices.value.reduce((n, x) => n + x.title.length + oneLine(x.body).length + 12, 0))
const tickerCopies = computed(() => 2 * Math.max(1, Math.ceil(1600 / Math.max(1, tickerChars.value * 8))))
const tickerSeconds = computed(() => Math.max(14, (tickerChars.value * tickerCopies.value) / 2 / 6))
async function showNotice(n: Notice) {
  opened.value = opened.value?.id === n.id ? null : n
  if (n.is_read || n.mine) return
  n.is_read = true
  try {
    await axios.post(`/api/student/notices/${n.id}/read`)
  } catch { /* tried again next time it is opened */ }
}

// ---- classes, shortcuts, notes
const classes = ref<StudentClass[]>([])
const classesLoaded = ref(false)
const subjectOf = (c: StudentClass) => c.department_name || c.name
const sortedClasses = computed(() => classes.value.slice().sort((a, b) => subjectOf(a).localeCompare(subjectOf(b))))
const shortcuts = [
  { label: 'eNotes', to: '/student/enotes', icon: 'book' },
  { label: 'Live classes', to: '/student/live-classes', icon: 'camera' },
  { label: 'eLibrary', to: '/student/library', icon: 'document' },
  { label: 'Item Bank', to: '/student/itembank', icon: 'target' },
  { label: 'Videos', to: '/student/videos', icon: 'video' },
  { label: 'Virtual Lab', to: '/student/virtual-lab', icon: 'beaker' },
  { label: 'Learning Map', to: '/student/learning-map', icon: 'map' },
  { label: 'Reports', to: '/student/reports', icon: 'chart' }
]
const myNotes = ref<MyNote[]>([])
const notesLoaded = ref(false)

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
const loadNotices = async () => {
  try {
    const res = await axios.get('/api/student/notices')
    notices.value = res.data.data.notices || []
  } catch { /* no ticker */ }
}

useLiveRefresh(() => {
  loadDashboard(true)
  loadNotices()
})
onMounted(() => {
  loadDashboard()
  loadNotices()
  axios.get('/api/student/classes').then(r => { classes.value = r.data.data || [] }).catch(() => {}).finally(() => { classesLoaded.value = true })
  axios.get('/api/student/my-notes').then(r => {
    const all: MyNote[] = r.data.data.notes || []
    myNotes.value = all.slice().sort((a, b) => (b.updated_at || '').localeCompare(a.updated_at || '')).slice(0, 6)
  }).catch(() => {}).finally(() => { notesLoaded.value = true })
})
</script>

<style scoped>
/* White cards with a dark-green title bar */
.box {
  @apply rounded-2xl bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200/80 dark:ring-gray-700 min-w-0 overflow-hidden;
}
.box-bar {
  @apply flex items-center gap-2 px-4 py-2.5 bg-indigo-800 text-white text-[0.95rem] font-bold tracking-tight;
}
.box-bar-link {
  @apply ml-auto text-xs font-semibold text-indigo-100 hover:text-white hover:underline;
}
.chip {
  @apply flex items-center gap-2 rounded-xl px-2 py-1.5 min-w-0 bg-gray-50 ring-1 ring-gray-100 hover:ring-indigo-300 hover:bg-indigo-50/60 dark:bg-gray-900/40 dark:ring-gray-700 dark:hover:ring-indigo-700 transition;
}
.chip-alert {
  @apply bg-red-50/70 ring-red-100 dark:bg-red-950/20 dark:ring-red-900/50;
}
.chip-badge {
  @apply w-8 h-8 flex-shrink-0 rounded-lg text-[10px] font-extrabold flex items-center justify-center text-white;
}
.more-btn {
  @apply w-full flex items-center justify-center gap-1 py-2 border-t border-gray-100 dark:border-gray-700/70 text-sm font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20 transition;
}
.pop-enter-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.pop-leave-active { transition: opacity 0.15s ease; }
.pop-enter-from { opacity: 0; transform: translateY(-6px) scale(0.97); }
.pop-leave-to { opacity: 0; }

/* The notices slide left, round and round; they stop while the pointer is on them */
.ticker-track {
  animation: ticker linear infinite;
}
.ticker:hover .ticker-track,
.ticker:focus-within .ticker-track {
  animation-play-state: paused;
}
@keyframes ticker {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.ticker-window {
  mask-image: linear-gradient(90deg, transparent, #000 24px, #000 calc(100% - 24px), transparent);
}
.ticker-label::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 0;
  bottom: 0;
  width: 10px;
  background: inherit;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}
@media (prefers-reduced-motion: reduce) {
  .ticker-track { animation: none; }
  .ticker-window { overflow-x: auto; }
  .pop-enter-active, .pop-leave-active { transition: none; }
}

.drop-enter-active, .drop-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
