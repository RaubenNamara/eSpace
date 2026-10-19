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
                  <span class="font-semibold text-sm text-gray-900 dark:text-white truncate">{{ properName(t.name) }}</span>
                  <span v-if="t.department" class="flex-shrink-0 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[10px] font-semibold text-gray-600 dark:text-gray-300">{{ t.department }}</span>
                </span>
                <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">
                  <StatusText :person="t" /> · {{ signIns(t.logins) }}<template v-if="t.device"> · <DeviceText :person="t" /></template>
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

    <!-- HODs: sign-ins and what they did (or "Viewed only") -->
    <section class="dash-box min-w-0">
      <h2 class="dash-bar">HODs: recent sign-ins and activity</h2>
      <div class="p-3">
        <div v-if="loading && !data" class="space-y-2" aria-busy="true">
          <div v-for="i in 3" :key="i" class="h-12 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
        </div>
        <p v-else-if="data && !data.hods.length" class="py-6 text-center text-sm text-gray-500 dark:text-gray-400">No HOD signed in {{ periodLabel }}.</p>
        <ul v-else-if="data" class="divide-y divide-gray-100 dark:divide-gray-700/60">
          <li v-for="h in data.hods" :key="h.id" class="py-2">
            <button
              type="button"
              class="w-full flex items-center gap-3 text-left rounded-lg px-1 py-1 hover:bg-gray-50 dark:hover:bg-gray-700/40"
              :aria-expanded="openHod === h.id"
              @click="openHod = openHod === h.id ? null : h.id"
            >
              <Avatar :person="h" />
              <span class="min-w-0 flex-1">
                <span class="flex items-center gap-1.5">
                  <span class="font-semibold text-sm text-gray-900 dark:text-white truncate">{{ properName(h.name) }}</span>
                  <span v-if="h.department" class="flex-shrink-0 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[10px] font-semibold text-gray-600 dark:text-gray-300">{{ h.department }}</span>
                </span>
                <span class="block text-xs text-gray-500 dark:text-gray-400"><StatusText :person="h" /> · {{ signIns(h.logins) }}</span>
                <span v-if="h.device" class="block text-xs text-gray-500 dark:text-gray-400 truncate"><DeviceText :person="h" /></span>
              </span>
              <span
                class="flex-shrink-0 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                :class="h.viewed_only ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200'"
                :title="h.viewed_only ? 'Signed in and looked around, but changed nothing that is recorded' : undefined"
              >{{ h.viewed_only ? 'Viewed only' : `${h.activity_count} ${h.activity_count === 1 ? 'action' : 'actions'}` }}</span>
            </button>
            <div v-if="openHod === h.id" class="mt-1 ml-12 mr-1">
              <ol v-if="h.activities.length" class="relative border-l-2 border-indigo-100 dark:border-indigo-900/60 pl-4 space-y-2 py-1">
                <li v-for="(a, i) in h.activities" :key="i" class="relative">
                  <span class="absolute -left-[1.4rem] top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[11px]" :class="ICONS[a.type]?.bg ?? 'bg-gray-100 dark:bg-gray-700'" aria-hidden="true">{{ ICONS[a.type]?.icon ?? '•' }}</span>
                  <p class="text-sm text-gray-800 dark:text-gray-100">
                    <span class="font-semibold">{{ a.label }}</span><template v-if="a.title"> · <span class="text-gray-600 dark:text-gray-300">{{ a.title }}</span></template>
                  </p>
                  <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ when(a.at) }}</p>
                </li>
              </ol>
              <p v-else class="text-xs text-gray-500 dark:text-gray-400 py-1">Signed in and looked around, but changed nothing {{ periodLabel }} - no approvals, enrolment changes, notices, answers, report cards, awards, attendance, uploads, messages or teaching work.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Students: the latest 12; the full list is its own page -->
    <section class="dash-box lg:col-span-3 min-w-0">
      <h2 class="dash-bar">Students: recent sign-ins</h2>
      <div class="p-3 space-y-3">
        <p v-if="data" class="text-xs text-gray-500 dark:text-gray-400">
          <b class="text-gray-900 dark:text-white">{{ data.students_total }}</b> students signed in {{ periodLabel }} ·
          <b class="text-emerald-600">{{ onlineStudents }}</b> of the latest {{ data.students.length }} online now
        </p>
        <div v-if="loading && !data" class="grid grid-cols-1 md:grid-cols-2 gap-2" aria-busy="true">
          <div v-for="i in 4" :key="i" class="h-12 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
        </div>
        <p v-else-if="data && !data.students.length" class="py-6 text-center text-sm text-gray-500 dark:text-gray-400">No student signed in {{ periodLabel }}.</p>
        <ul v-else-if="data" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4">
          <StudentRow v-for="st in data.students" :key="st.id" :person="st" />
        </ul>
        <RouterLink
          v-if="data && data.students_total > data.students.length"
          :to="{ path: '/admin/student-sign-ins', query: { days: String(days) } }"
          class="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >See all {{ data.students_total }} students →</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import apiService from '@/services/api'
import { PERIODS, periodPhrase, when, tickNow, signIns, properName, Avatar, StatusText, DeviceText, StudentRow, type SignInPerson } from './signInParts'

interface Activity { type: string; label: string; title: string | null; count: number; at: string }
interface Teacher extends SignInPerson { activity_count: number; activities: Activity[] }
interface Hod extends SignInPerson { teacher_id: number | null; activity_count: number; activities: Activity[]; viewed_only: boolean }
interface StaffActivityData { days: number; since: string; online_minutes: number; teachers: Teacher[]; hods: Hod[]; students: SignInPerson[]; students_total: number }

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
  // HOD work
  book_approved: { icon: '✔', bg: 'bg-emerald-100 dark:bg-emerald-900/40' },
  notes_approved: { icon: '✔', bg: 'bg-emerald-100 dark:bg-emerald-900/40' },
  questions_approved: { icon: '✔', bg: 'bg-emerald-100 dark:bg-emerald-900/40' },
  enrolment_department_de_enroll: { icon: '👥', bg: 'bg-amber-100 dark:bg-amber-900/40' },
  enrolment_teacher_de_enroll: { icon: '👥', bg: 'bg-amber-100 dark:bg-amber-900/40' },
  enrolment_teacher_re_enroll: { icon: '👥', bg: 'bg-amber-100 dark:bg-amber-900/40' },
  notice_posted: { icon: '📢', bg: 'bg-sky-100 dark:bg-sky-900/40' },
  questions_answered: { icon: '💬', bg: 'bg-sky-100 dark:bg-sky-900/40' },
  chat_sent: { icon: '💬', bg: 'bg-sky-100 dark:bg-sky-900/40' },
  physical_assessment_created: { icon: '📋', bg: 'bg-sky-100 dark:bg-sky-900/40' },
  report_cards_generated: { icon: '🧾', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
  awards_changed: { icon: '🏅', bg: 'bg-amber-100 dark:bg-amber-900/40' },
  attendance_updated: { icon: '🗓', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
  book_uploaded: { icon: '📚', bg: 'bg-rose-100 dark:bg-rose-900/40' },
  sba_uploaded: { icon: '📎', bg: 'bg-rose-100 dark:bg-rose-900/40' },
}

const days = ref(7)
const data = ref<StaffActivityData | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const search = ref('')
const open = ref<number | null>(null)
const openHod = ref<number | null>(null)
const showAll = ref(false)

const periodLabel = computed(() => periodPhrase(days.value))
const filteredTeachers = computed(() => {
  const q = search.value.trim().toLowerCase()
  const list = data.value?.teachers ?? []
  return q ? list.filter(t => `${t.name} ${t.username} ${t.department ?? ''}`.toLowerCase().includes(q)) : list
})
const shownTeachers = computed(() => (showAll.value || search.value ? filteredTeachers.value : filteredTeachers.value.slice(0, LIMIT)))
const onlineTeachers = computed(() => (data.value?.teachers ?? []).filter(t => t.online).length)
const totalActivities = computed(() => (data.value?.teachers ?? []).reduce((n, t) => n + t.activity_count, 0))

const onlineStudents = computed(() => (data.value?.students ?? []).filter(st => st.online).length)

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
  openHod.value = null
  load()
}

// keep "online" and the times fresh while the dashboard stays open
let timer: number | undefined
onMounted(() => {
  load()
  timer = window.setInterval(() => { tickNow(); load() }, 60_000)
})
onBeforeUnmount(() => window.clearInterval(timer))
</script>
