<template>
  <!-- A student's own activity over a period: what they did and what they did not do. A gauge for
       the share of assessments done, the counts, each subject, the assessments themselves, and
       their reading, videos, live classes and active days. -->
  <div>
    <!-- The period -->
    <div class="flex flex-wrap items-center gap-2 mb-4">
      <div class="inline-flex rounded-xl bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 p-1">
        <button
          v-for="p in PERIODS"
          :key="p.key"
          type="button"
          class="px-3 py-1.5 rounded-lg text-sm font-semibold transition"
          :class="period === p.key ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'"
          @click="setPeriod(p.key)"
        >{{ p.label }}</button>
      </div>
      <span v-if="data" class="text-sm text-gray-500 dark:text-gray-400">{{ data.range.label }} · {{ niceDate(data.range.from) }} - {{ niceDate(data.range.to) }}</span>
    </div>

    <div v-if="error" class="mb-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-800 dark:text-red-200">{{ error }}</div>

    <div v-if="loading && !data" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div v-for="i in 3" :key="i" class="h-48 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    </div>

    <div v-else-if="data" class="grid grid-cols-1 lg:grid-cols-3 items-start gap-4" :class="loading ? 'opacity-60 transition' : ''">
      <!-- Assessments: the gauge and the counts -->
      <section class="dash-box">
        <h2 class="dash-bar justify-center">Assessments</h2>
        <div class="px-4 pt-3 pb-4">
          <div class="flex items-center gap-3">
            <ScoreGauge :value="donePct" :label="`${donePct}% of assessments done`" class="w-[46%] max-w-[11rem] flex-shrink-0" />
            <div class="min-w-0">
              <p class="text-[2rem] font-extrabold leading-none text-indigo-600 dark:text-indigo-400 tabular-nums">{{ a.done }}/{{ a.given }}</p>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">assessments done</p>
              <span class="mt-1.5 inline-block px-2 py-0.5 rounded-md text-xs font-bold text-white" :class="word.tone">{{ word.text }}</span>
            </div>
          </div>
          <div class="mt-3 grid grid-cols-4 divide-x divide-gray-100 dark:divide-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/40 text-center">
            <div v-for="c in counts" :key="c.label" class="py-2">
              <p class="text-lg font-extrabold tabular-nums" :class="c.tone">{{ c.value }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ c.label }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Each subject -->
      <section class="dash-box lg:col-span-2">
        <h2 class="dash-bar">By subject</h2>
        <p v-if="!data.subjects.length" class="p-4 text-[0.95rem] text-gray-500 dark:text-gray-400">No assessments were set for you in this period.</p>
        <ul v-else class="p-3 space-y-2">
          <li v-for="s in shownSubjects" :key="s.subject" class="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 px-3 py-2">
            <span class="w-9 h-9 flex-shrink-0 rounded-lg text-[10px] font-extrabold flex items-center justify-center text-white bg-indigo-700">{{ code(s.subject) }}</span>
            <div class="min-w-0 flex-1">
              <div class="flex items-center justify-between gap-2 text-sm">
                <span class="font-bold text-gray-900 dark:text-white truncate">{{ s.subject }}</span>
                <span class="flex-shrink-0 text-gray-600 dark:text-gray-300"><b class="text-gray-900 dark:text-white">{{ s.done }}</b> of {{ s.given }} done<template v-if="s.average !== null"> · avg <b class="text-indigo-700 dark:text-indigo-300">{{ Math.round(s.average) }}%</b></template></span>
              </div>
              <!-- done / missed / still open -->
              <div class="mt-1.5 flex h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <span class="bg-indigo-600" :style="{ width: `${(s.done / s.given) * 100}%` }"></span>
                <span class="bg-red-500" :style="{ width: `${(s.missed / s.given) * 100}%` }"></span>
                <span class="bg-gray-300 dark:bg-gray-600" :style="{ width: `${(s.open / s.given) * 100}%` }"></span>
              </div>
            </div>
          </li>
        </ul>
        <button v-if="data.subjects.length > 4" type="button" class="dash-more" @click="allSubjects = !allSubjects">
          {{ allSubjects ? 'Show less' : `Show ${data.subjects.length - 4} more` }}
        </button>
      </section>

      <!-- Reading, watching, joining, showing up -->
      <section class="dash-box">
        <h2 class="dash-bar">Learning activity</h2>
        <div class="grid grid-cols-2 gap-2 p-3">
          <div v-for="t in activity" :key="t.label" class="rounded-xl bg-gray-50 dark:bg-gray-900/40 px-3 py-2.5">
            <div class="flex items-center gap-2 text-indigo-700 dark:text-indigo-300"><AppIcon :name="t.icon" class="w-4 h-4" /><span class="text-xs font-semibold text-gray-600 dark:text-gray-300">{{ t.label }}</span></div>
            <p class="mt-1 text-xl font-extrabold text-gray-900 dark:text-white tabular-nums">{{ t.value }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ t.sub }}</p>
          </div>
        </div>
      </section>

      <!-- Active days -->
      <section class="dash-box">
        <h2 class="dash-bar">Active days <span class="ml-auto text-xs font-semibold text-indigo-700 dark:text-indigo-300">{{ data.active_days.length }} of {{ data.range.days }}</span></h2>
        <div class="p-3">
          <div class="flex flex-wrap gap-1">
            <span
              v-for="d in dayGrid"
              :key="d.date"
              class="w-4 h-4 rounded-[4px]"
              :class="d.active ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'"
              :title="`${niceDate(d.date)}${d.active ? ' - active' : ''}`"
            ></span>
          </div>
          <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">A green square is a day you read, revised or answered something.</p>
        </div>
      </section>

      <!-- The assessments themselves -->
      <section class="dash-box">
        <h2 class="dash-bar">Assessments in this period</h2>
        <p v-if="!data.items.length" class="p-4 text-[0.95rem] text-gray-500 dark:text-gray-400">None in this period.</p>
        <ul v-else class="p-3 space-y-1.5">
          <li v-for="it in shownItems" :key="it.id" class="flex items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-900/40 px-2.5 py-1.5">
            <span class="min-w-0 flex-1">
              <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ it.title }}</span>
              <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">{{ it.subject }}{{ it.due_date ? ` · due ${niceDate(it.due_date)}` : '' }}</span>
            </span>
            <span v-if="it.percentage !== null" class="flex-shrink-0 text-sm font-extrabold text-indigo-700 dark:text-indigo-300">{{ Math.round(it.percentage) }}%</span>
            <span class="flex-shrink-0 px-2 py-0.5 rounded-md text-[11px] font-bold" :class="STATE[it.state].tone">{{ STATE[it.state].text }}</span>
          </li>
        </ul>
        <button v-if="data.items.length > 5" type="button" class="dash-more" @click="allItems = !allItems">
          {{ allItems ? 'Show less' : `Show ${data.items.length - 5} more` }}
        </button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import ScoreGauge from '@/components/ui/ScoreGauge.vue'

type State = 'done' | 'missed' | 'open'
interface Activity {
  range: { from: string; to: string; label: string; days: number }
  assessments: { given: number; done: number; missed: number; open: number; average: number | null; marked: number }
  subjects: { subject: string; given: number; done: number; missed: number; open: number; average: number | null }[]
  items: { id: number; title: string; subject: string; due_date: string | null; state: State; percentage: number | null }[]
  reading: { pages: number; topics: number; minutes: number; books: number }
  videos: { watched: number; finished: number }
  live: { joined: number; held: number }
  active_days: string[]
}

const PERIODS = [
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'term', label: 'Term' },
  { key: 'year', label: 'Year' }
] as const
const STATE: Record<State, { text: string; tone: string }> = {
  done: { text: 'Done', tone: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200' },
  missed: { text: 'Missed', tone: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' },
  open: { text: 'Still open', tone: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200' }
}

const period = ref<(typeof PERIODS)[number]['key']>('term')
const data = ref<Activity | null>(null)
const loading = ref(false)
const error = ref('')
const allSubjects = ref(false)
const allItems = ref(false)

const a = computed(() => data.value!.assessments)
const donePct = computed(() => (a.value.given ? Math.round((a.value.done / a.value.given) * 100) : 0))
const word = computed(() => {
  if (!a.value.given) return { text: 'Nothing set', tone: 'bg-gray-500' }
  const v = donePct.value
  return v >= 80 ? { text: 'Excellent', tone: 'bg-indigo-700' } : v >= 60 ? { text: 'Good', tone: 'bg-indigo-600' } : v >= 40 ? { text: 'Fair', tone: 'bg-amber-500' } : { text: 'Catch up', tone: 'bg-red-600' }
})
const counts = computed(() => [
  { label: 'Given', value: a.value.given, tone: 'text-gray-900 dark:text-white' },
  { label: 'Done', value: a.value.done, tone: 'text-indigo-700 dark:text-indigo-300' },
  { label: 'Missed', value: a.value.missed, tone: a.value.missed ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white' },
  { label: 'Average', value: a.value.average === null ? '-' : `${Math.round(a.value.average)}%`, tone: 'text-gray-900 dark:text-white' }
])
const activity = computed(() => {
  const d = data.value!
  return [
    { label: 'eNote pages', icon: 'book', value: d.reading.pages, sub: `${d.reading.topics} topics · ${d.reading.minutes} min` },
    { label: 'Books', icon: 'document', value: d.reading.books, sub: 'opened in the eLibrary' },
    { label: 'Videos', icon: 'video', value: d.videos.watched, sub: `${d.videos.finished} watched to the end` },
    { label: 'Live classes', icon: 'camera', value: d.live.joined, sub: d.live.held >= d.live.joined && d.live.held ? `joined, of ${d.live.held} held` : 'joined' }
  ]
})
const shownSubjects = computed(() => (allSubjects.value ? data.value!.subjects : data.value!.subjects.slice(0, 4)))
const shownItems = computed(() => (allItems.value ? data.value!.items : data.value!.items.slice(0, 5)))

// one square per day of the period (the last 120 at most, so a whole year stays readable)
const dayGrid = computed(() => {
  const d = data.value!
  const active = new Set(d.active_days)
  const out: { date: string; active: boolean }[] = []
  const end = new Date(`${d.range.to}T00:00:00`)
  const start = new Date(`${d.range.from}T00:00:00`)
  const first = new Date(Math.max(start.getTime(), end.getTime() - 119 * 86400000))
  for (let t = first.getTime(); t <= end.getTime(); t += 86400000) {
    const day = new Date(t)
    const key = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`
    out.push({ date: key, active: active.has(key) })
  }
  return out
})

const niceDate = (v: string) => new Date(v.replace(' ', 'T').length === 10 ? `${v}T00:00:00` : v.replace(' ', 'T')).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
const code = (name: string) => name.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || '?'

async function load() {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get('/api/student/reports/activity', { params: { period: period.value } })
    data.value = res.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Your activity report could not load.'
  } finally {
    loading.value = false
  }
}
function setPeriod(p: (typeof PERIODS)[number]['key']) {
  if (p === period.value) return
  period.value = p
  allSubjects.value = false
  allItems.value = false
  load()
}
onMounted(load)
</script>
