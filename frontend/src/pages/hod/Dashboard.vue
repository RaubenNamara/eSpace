<template>
  <!-- The HOD's morning view of the department: one sentence of where things stand, who was in this
       week, how the curriculum is covered and going, what needs the HOD, and each teacher's week. -->
  <div class="w-full">
    <!-- 1. The department today, and who was in this week -->
    <DashboardHero :date="todayLabel" :title="`${greeting}, ${firstName}`" :parts="daySentence" :chips="heroChips" :actions="QUICK">
      <div class="flex items-center justify-between mb-2.5">
        <p class="text-xs font-bold text-gray-700 dark:text-gray-200">Your teachers this week</p>
        <p class="text-[11px] text-gray-400 dark:text-gray-500">
          <span class="inline-flex items-center gap-1 mr-3"><span class="w-2 h-2 rounded-full bg-emerald-500"></span>active</span>
          <span class="inline-flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>not this week</span>
        </p>
      </div>
      <div v-if="!loaded" class="h-12 rounded-lg bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
      <p v-else-if="!teachers.length" class="text-xs text-gray-500 dark:text-gray-400">No teachers in the department yet.</p>
      <div v-else class="flex flex-wrap gap-x-4 gap-y-3">
        <RouterLink v-for="t in byActivity" :key="t.id" to="/hod/teachers" class="flex flex-col items-center w-14 group" :title="`${t.name} · ${t.last_active_at ? `active ${timeAgo(t.last_active_at)}` : 'not signed in yet'}`">
          <span class="relative w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 transition-transform group-hover:scale-105" :class="activeThisWeek(t) ? 'ring-emerald-500 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200' : 'ring-gray-200 dark:ring-gray-700 bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'">
            {{ initials(t.name) }}
            <span v-if="t.to_mark_count" class="absolute -top-1.5 -right-1.5 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center" :title="`${t.to_mark_count} to mark`">{{ t.to_mark_count }}</span>
          </span>
          <span class="mt-1.5 w-full text-center text-[10px] font-semibold truncate" :class="activeThisWeek(t) ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400'">{{ t.name.split(' ')[0] }}</span>
        </RouterLink>
      </div>
    </DashboardHero>

    <NoticeBanner role="hod" />

    <!-- 2. The curriculum, beside what needs the HOD -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-5">
      <MasteryOverviewCard class="xl:col-span-2 !mb-0 min-w-0" endpoint="/api/hod/mastery-overview" />
      <div class="flex flex-col gap-4 min-w-0">
        <!-- Early warning: who may be slipping, and why -->
        <RouterLink to="/hod/early-warning" class="block rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5 hover:border-rose-300 dark:hover:border-rose-700 transition">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 flex-shrink-0 rounded-xl flex items-center justify-center bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"><AppIcon name="warning" class="w-4 h-4" /></span>
            <h2 class="flex-1 text-base font-bold text-gray-900 dark:text-white">Needs a word</h2>
            <span v-if="warning" class="text-2xl font-extrabold text-rose-600 dark:text-rose-300 tabular-nums">{{ warning.flagged }}</span>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">{{ warning ? (warning.flagged ? 'learners in the department may be slipping' : 'Nobody is slipping right now.') : 'Checking…' }}</p>
          <ul v-if="warning && warning.flagged" class="space-y-2">
            <li v-for="r in reasons" :key="r.label" class="flex items-center gap-2 text-xs">
              <span class="w-24 flex-shrink-0 text-gray-600 dark:text-gray-300">{{ r.label }}</span>
              <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full" :class="r.bar" :style="{ width: `${Math.max(r.value ? 4 : 0, (r.value / warning.flagged) * 100)}%` }"></span></span>
              <span class="w-8 text-right font-bold tabular-nums text-gray-700 dark:text-gray-200">{{ r.value }}</span>
            </li>
          </ul>
        </RouterLink>

        <!-- Waiting for the HOD's approval -->
        <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5">
          <div class="flex items-center gap-2 mb-2">
            <h2 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">Waiting for approval</h2>
            <span v-if="approvals.length" class="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">{{ stats?.pending_approvals || approvals.length }}</span>
            <RouterLink to="/hod/approvals" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Approvals</RouterLink>
          </div>
          <p v-if="!approvals.length" class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <svg class="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            Nothing waiting - you're all caught up.
          </p>
          <ul v-else class="space-y-1.5">
            <li v-for="a in approvals.slice(0, 4)" :key="`${a.type}-${a.id}`" class="flex items-center gap-2 text-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
              <span class="flex-1 min-w-0 truncate text-gray-800 dark:text-gray-100">{{ a.title || (a.question_text || 'Untitled').slice(0, 60) }}</span>
              <span class="text-[11px] text-gray-400 flex-shrink-0">{{ a.type }}</span>
            </li>
          </ul>
        </section>

        <!-- Set lately -->
        <section class="flex-1 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5">
          <div class="flex items-center gap-2 mb-2">
            <h2 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">Set lately</h2>
            <RouterLink to="/hod/assessments" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">All</RouterLink>
          </div>
          <p v-if="!recent.length" class="text-xs text-gray-500 dark:text-gray-400">No assessments set in the department yet.</p>
          <ul v-else class="space-y-1">
            <li v-for="a in recent" :key="a.id">
              <RouterLink :to="`/hod/assessments/${a.id}/submissions`" class="flex items-center gap-3 rounded-xl p-1.5 -mx-1.5 hover:bg-gray-50 dark:hover:bg-gray-700/40">
                <span class="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">{{ a.category || 'Task' }}</span>
                <span class="min-w-0 flex-1">
                  <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ niceName(a.title) }}</span>
                  <span class="block text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ niceName(a.teacher_name || '') }} · {{ a.class_name || a.subject_name }} · {{ a.submissions_count }} handed in</span>
                </span>
              </RouterLink>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <!-- 3. Each teacher's week -->
    <section class="mb-8">
      <div class="flex items-center gap-2.5 mb-3">
        <span class="w-8 h-8 flex-shrink-0 rounded-xl flex items-center justify-center bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"><AppIcon name="teacher" class="w-4 h-4" /></span>
        <h2 class="flex-1 text-base font-bold text-gray-900 dark:text-white">Teachers</h2>
        <RouterLink to="/hod/teachers" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">All teachers →</RouterLink>
      </div>
      <div v-if="!loaded" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3"><div v-for="i in 4" :key="i" class="h-28 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div></div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <RouterLink v-for="t in teacherRows" :key="t.id" to="/hod/teachers" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:-translate-y-0.5 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-700 transition-all">
          <div class="flex items-center gap-3">
            <span class="relative w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
              {{ initials(t.name) }}
              <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-gray-800" :class="activeThisWeek(t) ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'"></span>
            </span>
            <span class="min-w-0 flex-1">
              <span class="block text-sm font-bold text-gray-900 dark:text-white truncate">{{ t.name }}</span>
              <span class="block text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ t.last_active_at ? `Active ${timeAgo(t.last_active_at)}` : 'Not signed in yet' }}</span>
            </span>
          </div>
          <div class="mt-3 grid grid-cols-3 text-center rounded-xl bg-gray-50 dark:bg-gray-900/40 py-2">
            <div><p class="text-sm font-bold tabular-nums text-gray-900 dark:text-white">{{ t.assessments_count }}</p><p class="text-[10px] text-gray-400">assessments</p></div>
            <div><p class="text-sm font-bold tabular-nums text-gray-900 dark:text-white">{{ t.enotes_count }}</p><p class="text-[10px] text-gray-400">eNotes</p></div>
            <div><p class="text-sm font-bold tabular-nums" :class="t.to_mark_count ? 'text-amber-600 dark:text-amber-300' : 'text-gray-900 dark:text-white'">{{ t.to_mark_count }}</p><p class="text-[10px] text-gray-400">to mark</p></div>
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { apiService } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { useLiveRefresh } from '@/composables/useLiveRefresh'
import AppIcon from '@/components/common/AppIcon.vue'
import DashboardHero, { type HeroAction, type HeroChip, type HeroPart } from '@/components/dashboard/DashboardHero.vue'
import MasteryOverviewCard from '@/components/dashboard/MasteryOverviewCard.vue'
import NoticeBanner from '@/components/dashboard/NoticeBanner.vue'
import { initials, niceName, timeAgo } from '@/components/dashboard/teacher/time'

interface Stats { teachers_count: number; students_count: number; subjects_count: number; pending_approvals: number }
interface TeacherRow { id: number; name: string; assessments_count: number; enotes_count: number; to_mark_count: number; last_active_at: string | null }

const QUICK: HeroAction[] = [
  { to: '/hod/term-report', label: 'Term report', icon: 'clipboard' },
  { to: '/hod/assessments', label: 'Assessments', icon: 'pencil' },
  { to: '/hod/marksheet', label: 'Marksheet', icon: 'chart' },
  { to: '/hod/analytics', label: 'Analytics', icon: 'trend' },
  { to: '/hod/notices', label: 'Post a notice', icon: 'speaker' }
]

const authStore = useAuthStore()
const firstName = computed(() => niceName(String(authStore.userName || '').split(' ')[0] || ''))
const greeting = computed(() => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening' })
const todayLabel = new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

const stats = ref<Stats | null>(null)
const department = ref<{ name: string; code: string } | null>(null)
const teachers = ref<TeacherRow[]>([])
const warning = ref<Record<string, number> | null>(null)
const recent = ref<any[]>([])
const approvals = ref<any[]>([])

const loaded = ref(false)
const toMark = computed(() => teachers.value.reduce((n, t) => n + t.to_mark_count, 0))
const activeThisWeek = (t: TeacherRow) => !!t.last_active_at && Date.now() - new Date(t.last_active_at.replace(' ', 'T')).getTime() < 7 * 86400000
const activeCount = computed(() => teachers.value.filter(activeThisWeek).length)
// The strip: who was in this week first
const byActivity = computed(() => [...teachers.value].sort((a, b) => String(b.last_active_at || '').localeCompare(String(a.last_active_at || ''))))
const reasons = computed(() => [
  { label: 'Low results', value: warning.value?.low ?? 0, bar: 'bg-indigo-600 dark:bg-indigo-400' },
  { label: 'Falling', value: warning.value?.falling ?? 0, bar: 'bg-indigo-600 dark:bg-indigo-400' },
  { label: 'Missing work', value: warning.value?.missed ?? 0, bar: 'bg-indigo-600 dark:bg-indigo-400' },
  { label: 'Quiet', value: warning.value?.quiet ?? 0, bar: 'bg-indigo-600 dark:bg-indigo-400' }
])

const heroChips = computed<HeroChip[]>(() => {
  const out: HeroChip[] = []
  if (department.value) out.push({ text: `${department.value.name} · ${department.value.code}`, tone: 'solid' })
  out.push({ text: 'Head of Department', icon: 'teacher' })
  if (stats.value) out.push({ text: `${stats.value.students_count.toLocaleString()} students · ${stats.value.subjects_count} ${stats.value.subjects_count === 1 ? 'subject' : 'subjects'}`, icon: 'users', to: '/hod/students' })
  return out
})
// "5 of your 8 teachers were in this week. 12 scripts wait to be marked, 154 learners may be slipping, and 3 items wait for your approval."
const daySentence = computed(() => {
  type Part = HeroPart
  if (!loaded.value) return [{ text: 'Getting your department ready…' }] as Part[]
  const out: Part[] = []
  const n = teachers.value.length
  if (n) out.push({ text: `${activeCount.value} of your ${n}`, strong: true }, { text: ` ${n === 1 ? 'teacher was' : 'teachers were'} in this week. ` })
  const bits: Part[][] = []
  if (toMark.value) bits.push([{ text: `${toMark.value} ${toMark.value === 1 ? 'script waits' : 'scripts wait'}`, strong: true }, { text: ' to be marked' }])
  if (warning.value?.flagged) bits.push([{ text: `${warning.value.flagged} ${warning.value.flagged === 1 ? 'learner' : 'learners'}`, strong: true, alert: true }, { text: ' may be slipping' }])
  const pending = stats.value?.pending_approvals || approvals.value.length
  if (pending) bits.push([{ text: `${pending} ${pending === 1 ? 'item waits' : 'items wait'}`, strong: true, alert: true }, { text: ' for your approval' }])
  if (!bits.length) out.push({ text: 'Nothing is waiting on you today.' })
  bits.forEach((b, i) => {
    if (i > 0) out.push({ text: i === bits.length - 1 ? ', and ' : ', ' })
    const first = i === 0 ? { ...b[0], text: b[0].text.charAt(0).toUpperCase() + b[0].text.slice(1) } : b[0]
    out.push(first, ...b.slice(1))
  })
  if (bits.length) out.push({ text: '.' })
  return out
})
// Busiest first: marking waiting, then most recently active
const teacherRows = computed(() => [...teachers.value]
  .sort((a, b) => b.to_mark_count - a.to_mark_count || String(b.last_active_at || '').localeCompare(String(a.last_active_at || '')))
  .slice(0, 8))

const safe = async <T,>(fn: () => Promise<T>) => { try { return await fn() } catch { return null } }

const loadStats = async () => {
  const r = await safe(() => apiService.get('/hod/department/stats'))
  if (r?.data?.success) stats.value = r.data.data
}
useLiveRefresh(loadStats)

onMounted(async () => {
  loadStats()
  const [info, t, w, a, p] = await Promise.all([
    safe(() => apiService.get('/hod/department/info')),
    safe(() => apiService.get('/hod/teachers', { limit: 500 })),
    safe(() => apiService.get('/hod/early-warning')),
    safe(() => apiService.get('/hod/assignments')),
    safe(() => apiService.get('/hod/department/approvals', { limit: 5 }))
  ])
  if (info?.data?.success) department.value = info.data.data
  teachers.value = (t?.data?.data?.teachers || []).map((x: any) => ({
    id: x.id, name: niceName(`${x.first_name} ${x.last_name}`), last_active_at: x.last_active_at,
    assessments_count: Number(x.assessments_count) || 0, enotes_count: Number(x.enotes_count) || 0, to_mark_count: Number(x.to_mark_count) || 0
  }))
  warning.value = w?.data?.data?.summary ?? null
  recent.value = [...(a?.data?.data?.assignments || [])].sort((x: any, y: any) => String(y.due_date || '').localeCompare(String(x.due_date || ''))).slice(0, 5)
  approvals.value = p?.data?.data?.approvals || []
  loaded.value = true
})
</script>
