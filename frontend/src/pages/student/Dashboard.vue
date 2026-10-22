<template>
  <!-- The student's home, in Tusome's green, white and black on cream. The school's notices slide
       past at the top; then the work waiting, shortcuts, classes and notes - each showing a few,
       opening up for the rest. How it is all going lives in Reports (My activity). -->
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

    <NoticesTicker role="student" />

    <div v-if="error" class="mb-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-800 dark:text-red-200">{{ error }}</div>

    <!-- Two columns on a wide screen; one on a phone -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      <div class="lg:col-span-2 flex flex-col gap-4 min-w-0">
        <!-- Pending assessments -->
        <section class="dash-box">
          <h2 class="dash-bar">Pending assessments <RouterLink to="/student/assignments" class="dash-bar-link">See all</RouterLink></h2>
          <div v-if="loading && !data" class="grid sm:grid-cols-2 gap-2 p-3"><div v-for="i in 4" :key="i" class="h-12 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
          <div v-else-if="!todo.length" class="p-4 flex items-center gap-3">
            <span class="w-10 h-10 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center"><AppIcon name="check" class="w-5 h-5" /></span>
            <p class="text-[0.95rem] text-gray-700 dark:text-gray-200">Nothing waiting - you're all caught up. Well done!</p>
          </div>
          <TransitionGroup v-else tag="ul" name="dash-pop" class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3">
            <li v-for="item in shown('pending', todo)" :key="item.key" class="min-w-0">
              <RouterLink :to="item.to" class="dash-chip group" :class="item.alert ? 'dash-chip-alert' : ''">
                <span class="dash-chip-badge" :style="{ background: tint(item.subject) }">{{ code(item.subject) }}</span>
                <span class="min-w-0 flex-1">
                  <span class="block text-sm font-bold text-gray-900 dark:text-white truncate">{{ item.title }}</span>
                  <span class="block text-xs truncate" :class="item.alert ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-gray-500 dark:text-gray-400'">{{ item.meta }}</span>
                </span>
                <span class="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-indigo-600 group-hover:bg-indigo-700 transition">{{ item.action }}</span>
              </RouterLink>
            </li>
          </TransitionGroup>
          <button v-if="todo.length > LIMIT.pending" type="button" class="dash-more" :aria-expanded="!!open.pending" @click="toggle('pending')">
            {{ open.pending ? 'Show less' : `Show ${todo.length - LIMIT.pending} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.pending ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>

        <!-- Shortcuts to the main modules -->
        <section class="dash-box">
          <h2 class="dash-bar">Jump in</h2>
          <TransitionGroup tag="nav" name="dash-pop" class="grid grid-cols-4 gap-1 sm:gap-2 p-2 sm:p-3" aria-label="Shortcuts">
            <RouterLink v-for="s in shown('jump', shortcuts)" :key="s.to" :to="s.to" class="group flex flex-col items-center gap-1.5 rounded-xl py-2.5 px-1 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition min-w-0">
              <span class="w-11 h-11 rounded-2xl flex items-center justify-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-900 group-hover:bg-indigo-600 group-hover:text-white transition"><AppIcon :name="s.icon" class="w-5 h-5" /></span>
              <span class="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100 text-center leading-tight">{{ s.label }}</span>
            </RouterLink>
          </TransitionGroup>
          <button type="button" class="dash-more" :aria-expanded="!!open.jump" @click="toggle('jump')">
            {{ open.jump ? 'Show less' : `Show ${shortcuts.length - LIMIT.jump} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.jump ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>
      </div>

      <div class="flex flex-col gap-4 min-w-0">
        <!-- My classes -->
        <section class="dash-box">
          <h2 class="dash-bar">My classes <RouterLink to="/student/classes" class="dash-bar-link">Open</RouterLink></h2>
          <div v-if="!classesLoaded" class="grid grid-cols-2 gap-2 p-3"><div v-for="i in 6" :key="i" class="h-12 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
          <p v-else-if="!classes.length" class="p-4 text-[0.95rem] text-gray-500 dark:text-gray-400">You are not in any class yet.</p>
          <TransitionGroup v-else tag="div" name="dash-pop" class="grid grid-cols-2 gap-2 p-3">
            <RouterLink v-for="c in shown('classes', sortedClasses)" :key="c.id" to="/student/enotes" class="dash-chip">
              <span class="dash-chip-badge" :style="{ background: tint(subjectOf(c)) }">{{ code(subjectOf(c)) }}</span>
              <span class="min-w-0">
                <span class="block text-sm font-bold text-gray-900 dark:text-white truncate">{{ subjectOf(c) }}</span>
                <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">{{ c.name }}</span>
              </span>
            </RouterLink>
          </TransitionGroup>
          <button v-if="sortedClasses.length > LIMIT.classes" type="button" class="dash-more" :aria-expanded="!!open.classes" @click="toggle('classes')">
            {{ open.classes ? 'Show less' : `Show ${sortedClasses.length - LIMIT.classes} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.classes ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>

        <!-- My notes -->
        <section class="dash-box">
          <h2 class="dash-bar">My notes <RouterLink to="/student/my-notes" class="dash-bar-link">All</RouterLink></h2>
          <div v-if="!notesLoaded" class="space-y-2 p-3"><div v-for="i in 2" :key="i" class="h-14 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
          <div v-else-if="!myNotes.length" class="m-3 rounded-xl bg-gradient-to-r from-lime-100 to-indigo-50 dark:from-indigo-950/50 dark:to-indigo-900/30 p-3.5">
            <p class="text-[0.95rem] font-medium text-indigo-900 dark:text-indigo-100">Write notes while you read eNotes and books - they all collect here.</p>
            <RouterLink to="/student/enotes" class="mt-2 inline-block px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold">Start reading</RouterLink>
          </div>
          <TransitionGroup v-else tag="ul" name="dash-pop" class="p-3 space-y-2">
            <li v-for="n in shown('notes', myNotes)" :key="n.id">
              <RouterLink to="/student/my-notes" class="block rounded-xl bg-gradient-to-r from-lime-50 to-indigo-50 dark:from-indigo-950/40 dark:to-indigo-900/20 px-3 py-2 hover:-translate-y-0.5 transition">
                <span class="block text-xs font-semibold text-indigo-700 dark:text-indigo-300 truncate">{{ n.subject }} · {{ n.source }}{{ n.page ? ` · p. ${n.page}` : '' }}</span>
                <span class="block text-sm text-gray-900 dark:text-white line-clamp-2">{{ n.text }}</span>
              </RouterLink>
            </li>
          </TransitionGroup>
          <button v-if="myNotes.length > LIMIT.notes" type="button" class="dash-more" :aria-expanded="!!open.notes" @click="toggle('notes')">
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
import NoticesTicker from '@/components/dashboard/NoticesTicker.vue'
import { useLiveRefresh } from '@/composables/useLiveRefresh'
import { useAuthStore } from '@/stores/auth'

interface LiveClass { id: number; title: string; status: string; scheduled_start: string; subject_name: string; teacher_name: string }
interface DashboardData {
  stats: { assignments_pending: number; assignments_completed: number; average_score: number | null; live_now: number }
  live_now: LiveClass[]
  upcoming_live_classes: LiveClass[]
  upcoming_assignments: { id: number; title: string; subject_name: string; due_date: string | null; status: string }[]
}
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

useLiveRefresh(() => loadDashboard(true))
onMounted(() => {
  loadDashboard()
  axios.get('/api/student/classes').then(r => { classes.value = r.data.data || [] }).catch(() => {}).finally(() => { classesLoaded.value = true })
  axios.get('/api/student/my-notes').then(r => {
    const all: MyNote[] = r.data.data.notes || []
    myNotes.value = all.slice().sort((a, b) => (b.updated_at || '').localeCompare(a.updated_at || '')).slice(0, 6)
  }).catch(() => {}).finally(() => { notesLoaded.value = true })
})
</script>
