<template>
  <!-- The HOD's morning view of the department: how the curriculum is covered and going, what each
       teacher is doing, who may be slipping, what was set lately, and what waits for approval. -->
  <div class="w-full">
    <header class="mb-5 flex flex-col lg:flex-row lg:items-end gap-3">
      <div class="flex-1 min-w-0">
        <p class="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">{{ todayLabel }}</p>
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{{ greeting }}, {{ firstName }}</h1>
        <p v-if="department" class="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-600 text-white font-semibold">{{ department.name }} <span class="text-indigo-200 font-medium">{{ department.code }}</span></span>
          <span class="text-gray-500 dark:text-gray-400">Head of Department</span>
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <RouterLink v-for="q in QUICK" :key="q.to" :to="q.to" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-indigo-300 dark:hover:border-indigo-600">
          <AppIcon :name="q.icon" class="w-4 h-4 text-indigo-500" />{{ q.label }}
        </RouterLink>
      </div>
    </header>

    <NoticeBanner role="hod" />

    <!-- Four figures -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <RouterLink v-for="t in tiles" :key="t.label" :to="t.to" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-indigo-300 dark:hover:border-indigo-600 transition">
        <span class="w-9 h-9 rounded-xl flex items-center justify-center" :class="t.tint"><AppIcon :name="t.icon" class="w-5 h-5" /></span>
        <p class="mt-3 text-2xl font-extrabold text-gray-900 dark:text-white tabular-nums">{{ t.value }}</p>
        <p class="text-sm font-semibold text-gray-700 dark:text-gray-200">{{ t.label }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ t.hint }}</p>
      </RouterLink>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-5">
      <!-- Main column -->
      <div class="lg:col-span-2 min-w-0 flex flex-col">
        <MasteryOverviewCard endpoint="/api/hod/mastery-overview" />

        <section class="mb-6 lg:flex-1 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5">
          <div class="flex items-center gap-2 mb-3">
            <h2 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">Teachers this week</h2>
            <RouterLink to="/hod/teachers" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">All teachers</RouterLink>
          </div>
          <p v-if="!teachers.length" class="py-6 text-center text-sm text-gray-500 dark:text-gray-400">No teachers in the department yet.</p>
          <ul v-else class="divide-y divide-gray-100 dark:divide-gray-700">
            <li v-for="t in teacherRows" :key="t.id" class="py-2.5 flex items-center gap-3">
              <span class="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center text-[11px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">{{ initials(t.name) }}</span>
              <span class="min-w-0 flex-1">
                <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ t.name }}</span>
                <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">{{ t.assessments_count }} assessments · {{ t.enotes_count }} eNotes · {{ t.last_active_at ? `active ${timeAgo(t.last_active_at)}` : 'not signed in yet' }}</span>
              </span>
              <span v-if="t.to_mark_count" class="flex-shrink-0 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">{{ t.to_mark_count }} to mark</span>
              <span v-else-if="!t.assessments_count && !t.enotes_count" class="flex-shrink-0 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">Nothing yet</span>
            </li>
          </ul>
        </section>
      </div>

      <!-- Side column -->
      <div class="min-w-0 flex flex-col">
        <RouterLink to="/hod/early-warning" class="mb-6 block rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-rose-300 dark:hover:border-rose-700 transition">
          <div class="flex items-center gap-3">
            <span class="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300"><AppIcon name="warning" class="w-5 h-5" /></span>
            <span class="min-w-0 flex-1">
              <span class="block text-sm font-bold text-gray-900 dark:text-white">Early warning</span>
              <span class="block text-xs text-gray-500 dark:text-gray-400">{{ warning ? `${warning.flagged} learners may be slipping` : 'Checking…' }}</span>
            </span>
            <span v-if="warning" class="text-2xl font-extrabold text-rose-600 dark:text-rose-300 tabular-nums">{{ warning.flagged }}</span>
          </div>
          <p v-if="warning" class="mt-3 flex flex-wrap gap-1.5 text-[11px] font-semibold">
            <span class="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">{{ warning.low }} low results</span>
            <span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">{{ warning.falling }} falling</span>
            <span class="px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">{{ warning.missed }} missing work</span>
            <span class="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">{{ warning.quiet }} quiet</span>
          </p>
        </RouterLink>

        <section class="mb-6 lg:flex-1 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <div class="flex items-center gap-2 mb-3">
            <h2 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">Set lately</h2>
            <RouterLink to="/hod/assessments" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">All</RouterLink>
          </div>
          <p v-if="!recent.length" class="py-4 text-center text-xs text-gray-500 dark:text-gray-400">No assessments set in the department yet.</p>
          <ul v-else class="space-y-2">
            <li v-for="a in recent" :key="a.id">
              <RouterLink :to="`/hod/assessments/${a.id}/submissions`" class="flex items-center gap-3 rounded-xl p-2 -mx-2 hover:bg-gray-50 dark:hover:bg-gray-700/40">
                <span class="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">{{ a.category || 'Task' }}</span>
                <span class="min-w-0 flex-1">
                  <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ a.title }}</span>
                  <span class="block text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ niceName(a.teacher_name) }} · {{ a.class_name || a.subject_name }} · {{ a.submissions_count }} handed in</span>
                </span>
              </RouterLink>
            </li>
          </ul>
        </section>

        <section class="mb-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <div class="flex items-center gap-2 mb-3">
            <h2 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">Waiting for approval</h2>
            <RouterLink to="/hod/approvals" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Approvals</RouterLink>
          </div>
          <p v-if="!approvals.length" class="py-3 text-center text-xs text-gray-500 dark:text-gray-400">Nothing waiting - you're all caught up.</p>
          <ul v-else class="space-y-1.5">
            <li v-for="a in approvals.slice(0, 5)" :key="`${a.type}-${a.id}`" class="flex items-center gap-2 text-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
              <span class="flex-1 min-w-0 truncate text-gray-800 dark:text-gray-100">{{ a.title || (a.question_text || 'Untitled').slice(0, 60) }}</span>
              <span class="text-[11px] text-gray-400 flex-shrink-0">{{ a.type }}</span>
            </li>
          </ul>
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
import MasteryOverviewCard from '@/components/dashboard/MasteryOverviewCard.vue'
import NoticeBanner from '@/components/dashboard/NoticeBanner.vue'
import { initials, niceName, timeAgo } from '@/components/dashboard/teacher/time'

interface Stats { teachers_count: number; students_count: number; subjects_count: number; pending_approvals: number }
interface TeacherRow { id: number; name: string; assessments_count: number; enotes_count: number; to_mark_count: number; last_active_at: string | null }

const QUICK = [
  { to: '/hod/assessments', label: 'Assessments', icon: 'pencil' },
  { to: '/hod/marksheet', label: 'Marksheet', icon: 'chart' },
  { to: '/hod/notices', label: 'Post a notice', icon: 'speaker' }
]

const authStore = useAuthStore()
const firstName = computed(() => niceName(String(authStore.userName || '').split(' ')[0] || ''))
const greeting = computed(() => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening' })
const todayLabel = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

const stats = ref<Stats | null>(null)
const department = ref<{ name: string; code: string } | null>(null)
const teachers = ref<TeacherRow[]>([])
const warning = ref<Record<string, number> | null>(null)
const recent = ref<any[]>([])
const approvals = ref<any[]>([])

const toMark = computed(() => teachers.value.reduce((n, t) => n + t.to_mark_count, 0))
const tiles = computed(() => [
  { label: 'Teachers', value: stats.value?.teachers_count ?? teachers.value.length, hint: `${teachers.value.filter(t => t.last_active_at && Date.now() - new Date(t.last_active_at.replace(' ', 'T')).getTime() < 7 * 86400000).length} active this week`, icon: 'teacher', to: '/hod/teachers', tint: 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300' },
  { label: 'Students', value: (stats.value?.students_count ?? 0).toLocaleString(), hint: `${stats.value?.subjects_count ?? 0} subjects`, icon: 'users', to: '/hod/students', tint: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { label: 'To mark', value: toMark.value, hint: 'scripts across the department', icon: 'pencil', to: '/hod/assessments', tint: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300' },
  { label: 'Need attention', value: warning.value?.flagged ?? '–', hint: 'from early warning', icon: 'warning', to: '/hod/early-warning', tint: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300' }
])
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
})
</script>
