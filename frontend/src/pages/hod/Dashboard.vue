<template>
  <!-- The HOD's home, in the same format as every role's: notices sliding past, then cards with
       dark-green title bars - what waits for approval, what was set lately, shortcuts, who may be
       slipping, and each teacher's week. Each card shows a few and opens up for the rest. The
       curriculum figures live in Term report and Analytics. -->
  <div class="w-full">
    <header class="mb-3 flex flex-col sm:flex-row sm:items-end gap-x-3 gap-y-2">
      <div class="min-w-0 flex-1">
        <p class="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{{ todayLabel }}</p>
        <h1 class="text-2xl sm:text-[1.7rem] font-extrabold tracking-tight text-gray-900 dark:text-white truncate">{{ greeting }}, {{ firstName }}</h1>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <span v-if="department" class="px-3 py-1.5 rounded-xl bg-indigo-800 text-white text-sm font-bold">{{ department.name }}</span>
        <RouterLink v-if="stats" to="/hod/students" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:ring-indigo-300">
          <AppIcon name="users" class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          {{ stats.students_count.toLocaleString() }} students
        </RouterLink>
      </div>
    </header>

    <NoticesTicker role="hod" />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      <div class="lg:col-span-2 flex flex-col gap-4 min-w-0">
        <!-- Set lately -->
        <section class="dash-box">
          <h2 class="dash-bar">Set lately <RouterLink to="/hod/assessments" class="dash-bar-link">All</RouterLink></h2>
          <p v-if="loaded && !recent.length" class="p-4 text-[0.95rem] text-gray-500 dark:text-gray-400">No assessments set in the department yet.</p>
          <TransitionGroup v-else tag="ul" name="dash-pop" class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3">
            <li v-for="a in shown('recent', recent)" :key="a.id" class="min-w-0">
              <RouterLink :to="`/hod/assessments/${a.id}/submissions`" class="dash-chip">
                <span class="dash-chip-badge bg-indigo-700">{{ a.category || 'Task' }}</span>
                <span class="min-w-0 flex-1">
                  <span class="block text-sm font-bold text-gray-900 dark:text-white truncate">{{ niceName(a.title) }}</span>
                  <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">{{ niceName(a.teacher_name || '') }} · {{ a.class_name || a.subject_name }} · {{ a.submissions_count }} handed in</span>
                </span>
              </RouterLink>
            </li>
          </TransitionGroup>
          <button v-if="recent.length > LIMIT.recent" type="button" class="dash-more" :aria-expanded="!!open.recent" @click="toggle('recent')">
            {{ open.recent ? 'Show less' : `Show ${recent.length - LIMIT.recent} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.recent ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>

        <!-- Shortcuts -->
        <section class="dash-box">
          <h2 class="dash-bar">Jump in</h2>
          <TransitionGroup tag="nav" name="dash-pop" class="grid grid-cols-4 gap-1 sm:gap-2 p-2 sm:p-3" aria-label="Shortcuts">
            <RouterLink v-for="q in shown('jump', QUICK)" :key="q.to" :to="q.to" class="group flex flex-col items-center gap-1.5 rounded-xl py-2.5 px-1 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition min-w-0">
              <span class="w-11 h-11 rounded-2xl flex items-center justify-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-900 group-hover:bg-indigo-600 group-hover:text-white transition"><AppIcon :name="q.icon" class="w-5 h-5" /></span>
              <span class="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100 text-center leading-tight">{{ q.label }}</span>
            </RouterLink>
          </TransitionGroup>
          <button v-if="QUICK.length > LIMIT.jump" type="button" class="dash-more" :aria-expanded="!!open.jump" @click="toggle('jump')">
            {{ open.jump ? 'Show less' : `Show ${QUICK.length - LIMIT.jump} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.jump ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>
      </div>

      <div class="flex flex-col gap-4 min-w-0">
        <!-- Who may be slipping -->
        <section class="dash-box">
          <h2 class="dash-bar">Need attention <span v-if="warning?.flagged" class="px-2 py-0.5 rounded-full bg-amber-400 text-gray-900 text-xs font-extrabold">{{ warning.flagged }}</span><RouterLink to="/hod/early-warning" class="dash-bar-link">All</RouterLink></h2>
          <p v-if="!warning" class="p-4 text-sm text-gray-500 dark:text-gray-400">{{ loaded ? 'Nobody is slipping right now.' : 'Checking…' }}</p>
          <p v-else-if="!warning.flagged" class="p-4 text-[0.95rem] text-gray-700 dark:text-gray-200">Nobody is slipping right now.</p>
          <ul v-else class="p-3 space-y-2">
            <li v-for="r in reasons" :key="r.label" class="flex items-center gap-2 text-sm">
              <span class="w-24 flex-shrink-0 text-gray-700 dark:text-gray-200">{{ r.label }}</span>
              <span class="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full bg-indigo-600 dark:bg-indigo-400" :style="{ width: `${Math.max(r.value ? 4 : 0, (r.value / warning.flagged) * 100)}%` }"></span></span>
              <span class="w-8 text-right font-bold tabular-nums text-gray-900 dark:text-white">{{ r.value }}</span>
            </li>
          </ul>
        </section>

        <!-- Each teacher's week -->
        <section class="dash-box">
          <h2 class="dash-bar">Teachers <span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300"><span class="w-2 h-2 rounded-full bg-emerald-500"></span>{{ onlineCount }} online</span><span class="text-xs font-semibold text-gray-500 dark:text-gray-400">· {{ activeCount }} of {{ teachers.length }} this week</span><RouterLink to="/hod/teachers" class="dash-bar-link">All</RouterLink></h2>
          <div v-if="!loaded" class="space-y-2 p-3"><div v-for="i in 3" :key="i" class="h-12 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
          <p v-else-if="!teachers.length" class="p-4 text-[0.95rem] text-gray-500 dark:text-gray-400">No teachers in the department yet.</p>
          <TransitionGroup v-else tag="ul" name="dash-pop" class="p-3 space-y-2">
            <li v-for="t in shown('teachers', teacherRows)" :key="t.id">
              <RouterLink to="/hod/teachers" class="dash-chip">
                <span class="relative dash-chip-badge bg-gray-800 dark:bg-gray-600">
                  {{ initials(t.name) }}
                  <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-white dark:ring-gray-800" :class="t.is_online ? 'bg-emerald-500' : 'bg-gray-400 dark:bg-gray-500'" :title="t.is_online ? 'Online now' : 'Offline'"></span>
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block text-sm font-bold text-gray-900 dark:text-white truncate">{{ t.name }}</span>
                  <span class="block text-xs truncate" :class="t.is_online ? 'text-emerald-700 dark:text-emerald-300 font-semibold' : 'text-gray-500 dark:text-gray-400'">{{ lastOn(t) }}<span class="font-normal text-gray-500 dark:text-gray-400"> · {{ t.assessments_count }} set</span></span>
                </span>
                <span v-if="t.to_mark_count" class="flex-shrink-0 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200 text-xs font-bold">{{ t.to_mark_count }} to mark</span>
              </RouterLink>
            </li>
          </TransitionGroup>
          <button v-if="teacherRows.length > LIMIT.teachers" type="button" class="dash-more" :aria-expanded="!!open.teachers" @click="toggle('teachers')">
            {{ open.teachers ? 'Show less' : `Show ${teacherRows.length - LIMIT.teachers} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.teachers ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { apiService } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { useLiveRefresh } from '@/composables/useLiveRefresh'
import AppIcon from '@/components/common/AppIcon.vue'
import NoticesTicker from '@/components/dashboard/NoticesTicker.vue'
import { initials, niceName, timeAgo } from '@/components/dashboard/teacher/time'

interface Stats { teachers_count: number; students_count: number; subjects_count: number; pending_approvals: number }
interface TeacherRow { id: number; name: string; assessments_count: number; enotes_count: number; to_mark_count: number; last_active_at: string | null; last_login_at: string | null; is_online: boolean }

const QUICK = [
  { to: '/hod/term-report', label: 'Term report', icon: 'clipboard' },
  { to: '/hod/assessments', label: 'Assessments', icon: 'pencil' },
  { to: '/hod/marksheet', label: 'Marksheet', icon: 'chart' },
  { to: '/hod/analytics', label: 'Analytics', icon: 'trend' },
  { to: '/hod/notices', label: 'Post a notice', icon: 'speaker' },
  { to: '/hod/teachers', label: 'Teachers', icon: 'teacher' },
  { to: '/hod/early-warning', label: 'Early warning', icon: 'warning' },
  { to: '/hod/charts', label: 'Engagement', icon: 'chart' }
]

// ---- each card shows a few, and opens up to show the rest
const LIMIT = { recent: 4, jump: 4, teachers: 4 } as const
type CardKey = keyof typeof LIMIT
const open = ref<Partial<Record<CardKey, boolean>>>({})
const toggle = (k: CardKey) => { open.value = { ...open.value, [k]: !open.value[k] } }
const shown = <T,>(k: CardKey, list: readonly T[]) => (open.value[k] ? list : list.slice(0, LIMIT[k]))

const authStore = useAuthStore()
const firstName = computed(() => niceName(String(authStore.userName || '').split(' ')[0] || ''))
const greeting = computed(() => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening' })
const todayLabel = new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })

const stats = ref<Stats | null>(null)
const department = ref<{ name: string; code: string } | null>(null)
const teachers = ref<TeacherRow[]>([])
const warning = ref<Record<string, number> | null>(null)
const recent = ref<any[]>([])

const loaded = ref(false)
const activeThisWeek = (t: TeacherRow) => !!t.last_active_at && Date.now() - new Date(t.last_active_at.replace(' ', 'T')).getTime() < 7 * 86400000
const activeCount = computed(() => teachers.value.filter(activeThisWeek).length)
const reasons = computed(() => [
  { label: 'Low results', value: warning.value?.low ?? 0, bar: 'bg-indigo-600 dark:bg-indigo-400' },
  { label: 'Falling', value: warning.value?.falling ?? 0, bar: 'bg-indigo-600 dark:bg-indigo-400' },
  { label: 'Missing work', value: warning.value?.missed ?? 0, bar: 'bg-indigo-600 dark:bg-indigo-400' },
  { label: 'Quiet', value: warning.value?.quiet ?? 0, bar: 'bg-indigo-600 dark:bg-indigo-400' }
])

// Online first, then marking waiting, then most recently on
const teacherRows = computed(() => [...teachers.value]
  .sort((a, b) => Number(b.is_online) - Number(a.is_online) || b.to_mark_count - a.to_mark_count || String(b.last_active_at || '').localeCompare(String(a.last_active_at || ''))))
// "Online now", or when they were last on Tusome (and when they last signed in)
const lastOn = (t: TeacherRow) => {
  if (t.is_online) return 'Online now'
  const last = t.last_active_at || t.last_login_at
  return last ? `Last on ${timeAgo(last)}` : 'Has not signed in yet'
}
const onlineCount = computed(() => teachers.value.filter(t => t.is_online).length)

const safe = async <T,>(fn: () => Promise<T>) => { try { return await fn() } catch { return null } }

const loadStats = async () => {
  const r = await safe(() => apiService.get('/hod/department/stats'))
  if (r?.data?.success) stats.value = r.data.data
}
useLiveRefresh(loadStats)

onMounted(async () => {
  loadStats()
  const [info, t, w, a] = await Promise.all([
    safe(() => apiService.get('/hod/department/info')),
    safe(() => apiService.get('/hod/teachers', { limit: 500 })),
    safe(() => apiService.get('/hod/early-warning')),
    safe(() => apiService.get('/hod/assignments'))
  ])
  if (info?.data?.success) department.value = info.data.data
  teachers.value = (t?.data?.data?.teachers || []).map((x: any) => ({
    id: x.id, name: niceName(`${x.first_name} ${x.last_name}`), last_active_at: x.last_active_at, last_login_at: x.last_login_at, is_online: !!x.is_online,
    assessments_count: Number(x.assessments_count) || 0, enotes_count: Number(x.enotes_count) || 0, to_mark_count: Number(x.to_mark_count) || 0
  }))
  warning.value = w?.data?.data?.summary ?? null
  recent.value = [...(a?.data?.data?.assignments || [])].sort((x: any, y: any) => String(y.due_date || '').localeCompare(String(x.due_date || ''))).slice(0, 8)
  loaded.value = true
})
</script>
