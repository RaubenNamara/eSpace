<template>
  <!-- Teachers and HODs who signed in recently: online now or when last active, how often they
       signed in, on what device - and, for teachers, the work they actually did. -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <!-- Teachers -->
    <section class="dash-box lg:col-span-2 min-w-0">
      <h2 class="dash-bar">Teachers: recent sign-ins and activity</h2>
      <div class="p-3 space-y-3">
        <div class="flex flex-wrap items-center gap-2">
          <div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden" role="radiogroup" aria-label="Period">
            <button
              v-for="p in PERIODS"
              :key="p.days"
              type="button"
              role="radio"
              :aria-checked="days === p.days"
              class="px-3 py-1.5 text-xs font-semibold"
              :class="days === p.days ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'"
              @click="setDays(p.days)"
            >{{ p.label }}</button>
          </div>
          <input
            v-model="search"
            type="search"
            placeholder="Find a teacher"
            class="flex-1 min-w-[10rem] px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
            aria-label="Find a teacher"
          >
          <p v-if="data" class="w-full sm:w-auto text-xs text-gray-500 dark:text-gray-400">
            <b class="text-gray-900 dark:text-white">{{ data.teachers.length }}</b> signed in ·
            <b class="text-emerald-600">{{ onlineTeachers }}</b> online now ·
            <b class="text-gray-900 dark:text-white">{{ totalActivities }}</b> pieces of work
          </p>
        </div>

        <div v-if="loading && !data" class="space-y-2" aria-busy="true">
          <div v-for="i in 4" :key="i" class="h-14 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
        </div>
        <p v-else-if="error" class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
        <p v-else-if="!filteredTeachers.length" class="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {{ search ? 'No teacher matches that name.' : `No teacher signed in ${periodLabel}.` }}
        </p>

        <ul v-else class="divide-y divide-gray-100 dark:divide-gray-700/60">
          <li v-for="t in shownTeachers" :key="t.id" class="py-2">
            <button
              type="button"
              class="w-full flex items-center gap-3 text-left rounded-lg px-1 py-1 hover:bg-gray-50 dark:hover:bg-gray-700/40"
              :aria-expanded="open === t.id"
              @click="open = open === t.id ? null : t.id"
            >
              <Avatar :person="t" />
              <span class="min-w-0 flex-1">
                <span class="flex items-center gap-1.5">
                  <span class="font-semibold text-sm text-gray-900 dark:text-white truncate">{{ t.name }}</span>
                  <span v-if="t.department" class="flex-shrink-0 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[10px] font-semibold text-gray-600 dark:text-gray-300">{{ t.department }}</span>
                </span>
                <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">
                  <StatusText :person="t" /> · signed in {{ t.logins }}× · last {{ when(t.last_login_at) }}<template v-if="t.device"> · {{ t.device }}</template>
                </span>
              </span>
              <span class="flex-shrink-0 text-right">
                <span class="block text-sm font-bold tabular-nums" :class="t.activity_count ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-400'">{{ t.activity_count }}</span>
                <span class="block text-[10px] text-gray-500 dark:text-gray-400">{{ t.activity_count === 1 ? 'piece of work' : 'pieces of work' }}</span>
              </span>
              <svg class="w-4 h-4 flex-shrink-0 text-gray-400 transition-transform" :class="open === t.id ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>

            <!-- what they did -->
            <div v-if="open === t.id" class="mt-1 ml-12 mr-1">
              <ol v-if="t.activities.length" class="relative border-l-2 border-indigo-100 dark:border-indigo-900/60 pl-4 space-y-2 py-1">
                <li v-for="(a, i) in t.activities" :key="i" class="relative">
                  <span class="absolute -left-[1.4rem] top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[11px]" :class="ICONS[a.type]?.bg ?? 'bg-gray-100 dark:bg-gray-700'" aria-hidden="true">{{ ICONS[a.type]?.icon ?? '•' }}</span>
                  <p class="text-sm text-gray-800 dark:text-gray-100">
                    <span class="font-semibold">{{ a.label }}</span><template v-if="a.title"> · <span class="text-gray-600 dark:text-gray-300">{{ a.title }}</span></template>
                  </p>
                  <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ when(a.at) }}</p>
                </li>
              </ol>
              <p v-else class="text-xs text-gray-500 dark:text-gray-400 py-1">Signed in, but no recorded work {{ periodLabel }} (assessments, marking, eNotes, videos, live classes, virtual labs, live quizzes, item bank).</p>
              <p v-if="t.activity_count > t.activities.length" class="mt-1 text-[11px] text-gray-500 dark:text-gray-400">Showing the latest {{ t.activities.length }}.</p>
            </div>
          </li>
        </ul>

        <button v-if="filteredTeachers.length > LIMIT" type="button" class="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline" @click="showAll = !showAll">
          {{ showAll ? 'Show fewer' : `Show all ${filteredTeachers.length} teachers` }}
        </button>
      </div>
    </section>

    <!-- HODs -->
    <section class="dash-box min-w-0">
      <h2 class="dash-bar">HODs: recent sign-ins</h2>
      <div class="p-3">
        <div v-if="loading && !data" class="space-y-2" aria-busy="true">
          <div v-for="i in 3" :key="i" class="h-12 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
        </div>
        <p v-else-if="data && !data.hods.length" class="py-6 text-center text-sm text-gray-500 dark:text-gray-400">No HOD signed in {{ periodLabel }}.</p>
        <ul v-else-if="data" class="divide-y divide-gray-100 dark:divide-gray-700/60">
          <li v-for="h in data.hods" :key="h.id" class="flex items-center gap-3 py-2">
            <Avatar :person="h" />
            <span class="min-w-0 flex-1">
              <span class="flex items-center gap-1.5">
                <span class="font-semibold text-sm text-gray-900 dark:text-white truncate">{{ h.name }}</span>
                <span v-if="h.department" class="flex-shrink-0 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[10px] font-semibold text-gray-600 dark:text-gray-300">{{ h.department }}</span>
              </span>
              <span class="block text-xs text-gray-500 dark:text-gray-400"><StatusText :person="h" /></span>
              <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">Signed in {{ h.logins }}× · last {{ when(h.last_login_at) }}<template v-if="h.device"> · {{ h.device }}</template></span>
            </span>
          </li>
        </ul>
        <p class="mt-2 text-[11px] text-gray-400 dark:text-gray-500">Period: {{ periodLabel }}. Change it in the Teachers panel.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, h, defineComponent, type PropType } from 'vue'
import apiService from '@/services/api'

interface Activity { type: string; label: string; title: string | null; count: number; at: string }
interface Person {
  id: number; name: string; username: string; profile_photo: string | null; department: string | null
  logins: number; last_login_at: string; last_active_at: string | null; online: boolean; device: string | null; ip_address: string | null
}
interface Teacher extends Person { activity_count: number; activities: Activity[] }
interface StaffActivityData { days: number; since: string; online_minutes: number; teachers: Teacher[]; hods: Person[] }

const PERIODS = [{ days: 1, label: 'Today' }, { days: 7, label: '7 days' }, { days: 30, label: '30 days' }]
const LIMIT = 6
const ICONS: Record<string, { icon: string; bg: string }> = {
  assignment_created: { icon: '📝', bg: 'bg-sky-100 dark:bg-sky-900/40' },
  assignment_published: { icon: '📣', bg: 'bg-sky-100 dark:bg-sky-900/40' },
  scripts_marked: { icon: '✓', bg: 'bg-emerald-100 dark:bg-emerald-900/40' },
  enote_created: { icon: '📘', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
  enote_published: { icon: '📗', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
  enote_pages_edited: { icon: '✎', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
  video_added: { icon: '🎬', bg: 'bg-rose-100 dark:bg-rose-900/40' },
  live_class_scheduled: { icon: '🎥', bg: 'bg-rose-100 dark:bg-rose-900/40' },
  virtual_lab_set: { icon: '🧪', bg: 'bg-amber-100 dark:bg-amber-900/40' },
  virtual_lab_graded: { icon: '🧪', bg: 'bg-amber-100 dark:bg-amber-900/40' },
  live_quiz_run: { icon: '⚡', bg: 'bg-violet-100 dark:bg-violet-900/40' },
  questions_added: { icon: '❓', bg: 'bg-violet-100 dark:bg-violet-900/40' },
}

const days = ref(7)
const data = ref<StaffActivityData | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const search = ref('')
const open = ref<number | null>(null)
const showAll = ref(false)

const periodLabel = computed(() => (days.value === 1 ? 'today' : `in the last ${days.value} days`))
const filteredTeachers = computed(() => {
  const q = search.value.trim().toLowerCase()
  const list = data.value?.teachers ?? []
  return q ? list.filter(t => `${t.name} ${t.username} ${t.department ?? ''}`.toLowerCase().includes(q)) : list
})
const shownTeachers = computed(() => (showAll.value || search.value ? filteredTeachers.value : filteredTeachers.value.slice(0, LIMIT)))
const onlineTeachers = computed(() => (data.value?.teachers ?? []).filter(t => t.online).length)
const totalActivities = computed(() => (data.value?.teachers ?? []).reduce((n, t) => n + t.activity_count, 0))

async function load() {
  loading.value = true
  error.value = null
  try {
    const res = await apiService.get('/admin/staff-activity', { params: { days: days.value } })
    data.value = res.data.data
  } catch (e: any) {
    error.value = e?.response?.data?.message || 'Could not load staff activity.'
  } finally {
    loading.value = false
  }
}
function setDays(d: number) {
  days.value = d
  open.value = null
  load()
}

// "5 min ago", "today 14:05", "yesterday 09:12", "Mon 3 Oct 11:40"
const now = ref(Date.now())
function when(at: string | null) {
  if (!at) return 'never'
  const t = new Date(at.replace(' ', 'T')).getTime()
  const diff = Math.max(0, (now.value - t) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  const d = new Date(t)
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const today = new Date(now.value); today.setHours(0, 0, 0, 0)
  const day = new Date(d); day.setHours(0, 0, 0, 0)
  const daysAgo = Math.round((today.getTime() - day.getTime()) / 86400000)
  if (daysAgo === 0) return `today ${time}`
  if (daysAgo === 1) return `yesterday ${time}`
  return `${d.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })} ${time}`
}

// small pieces of the rows
const Avatar = defineComponent({
  props: { person: { type: Object as PropType<Person>, required: true } },
  setup(p) {
    return () => h('span', { class: 'relative flex-shrink-0' }, [
      p.person.profile_photo
        ? h('img', { src: p.person.profile_photo, alt: '', class: 'w-9 h-9 rounded-full object-cover' })
        : h('span', { class: 'w-9 h-9 rounded-full flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 text-xs font-bold' },
          p.person.name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase()),
      h('span', {
        class: ['absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-white dark:ring-gray-800', p.person.online ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'],
        title: p.person.online ? 'Online now' : 'Offline',
      }),
    ])
  },
})
const StatusText = defineComponent({
  props: { person: { type: Object as PropType<Person>, required: true } },
  setup(p) {
    return () => p.person.online
      ? h('span', { class: 'font-semibold text-emerald-600 dark:text-emerald-400' }, 'Online now')
      : h('span', null, `Last active ${when(p.person.last_active_at)}`)
  },
})

// keep "online" and the times fresh while the dashboard stays open
let timer: number | undefined
onMounted(() => {
  load()
  timer = window.setInterval(() => { now.value = Date.now(); load() }, 60_000)
})
onBeforeUnmount(() => window.clearInterval(timer))
</script>
