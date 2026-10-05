<template>
  <!-- Exam countdown and revision plan: days to the next exam, and a week-by-week list of topics
       to revise - weakest first - each with its eNotes. Ticks are kept on this device. -->
  <div class="w-full max-w-4xl">
    <PageHeader title="Exam plan" description="A countdown to your next exam, and what to revise each week - your weakest topics first." icon="target" accent="indigo" />

    <Skeleton v-if="loading" variant="cards" :count="1" />
    <EmptyState v-else-if="!data?.exam" icon="target" tone="indigo" title="No exam coming up" message="When your school adds an exam date for your class, your countdown and revision plan appear here." />

    <template v-else>
      <!-- Countdown -->
      <section class="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
        <div class="flex-1 min-w-0">
          <p class="text-xs font-bold uppercase tracking-widest text-indigo-300">Next exam</p>
          <h2 class="mt-1 text-2xl sm:text-3xl font-extrabold">{{ data.exam.title }}</h2>
          <p class="mt-1 text-slate-300">{{ longDate(data.exam.starts_on) }}<template v-if="data.exam.ends_on && data.exam.ends_on !== data.exam.starts_on"> - {{ longDate(data.exam.ends_on) }}</template></p>
          <p v-if="data.topics" class="mt-4 text-sm text-slate-300">{{ doneCount }} of {{ data.planned }} planned topics revised<template v-if="data.weak"> · {{ data.weak }} {{ data.weak === 1 ? 'topic needs' : 'topics need' }} extra work</template></p>
          <div v-if="data.planned" class="mt-2 h-2 rounded-full bg-white/10 overflow-hidden max-w-sm"><div class="h-full bg-emerald-400" :style="{ width: `${Math.round(doneCount / data.planned * 100)}%` }"></div></div>
        </div>
        <div class="flex-shrink-0 text-center sm:px-6">
          <p class="font-extrabold text-6xl tabular-nums leading-none">{{ data.exam.days_left }}</p>
          <p class="mt-1 text-sm text-slate-300">{{ data.exam.days_left === 1 ? 'day to go' : 'days to go' }}</p>
        </div>
      </section>

      <p v-if="data.upcoming.length" class="mt-3 text-xs text-gray-500 dark:text-gray-400">Also coming up: {{ data.upcoming.map(e => `${e.title} (${shortDate(e.starts_on)})`).join(', ') }}</p>

      <EmptyState v-if="!data.weeks.length" class="mt-6" compact icon="map" title="No topics to plan yet" message="Your revision plan fills in from your class's curriculum topics." />

      <!-- The plan, week by week -->
      <div v-else class="mt-6 space-y-4">
        <section v-for="(w, i) in data.weeks" :key="w.week_start" class="rounded-2xl border bg-white dark:bg-gray-800 overflow-hidden" :class="i === 0 ? 'border-indigo-300 dark:border-indigo-700' : 'border-gray-200 dark:border-gray-700'">
          <header class="px-4 sm:px-5 py-3 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700">
            <p class="flex-1 font-semibold text-gray-900 dark:text-white">{{ i === 0 ? 'This week' : `Week of ${shortDate(w.week_start)}` }}</p>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ w.items.filter(it => done.has(it.topic_id)).length }}/{{ w.items.length }}</span>
          </header>
          <ul class="divide-y divide-gray-100 dark:divide-gray-700">
            <li v-for="it in w.items" :key="it.topic_id" class="px-4 sm:px-5 py-3 flex items-center gap-3">
              <button type="button" class="w-6 h-6 flex-shrink-0 rounded-md border-2 flex items-center justify-center transition" :class="done.has(it.topic_id) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400'" :aria-label="done.has(it.topic_id) ? 'Mark as not revised' : 'Mark as revised'" @click="toggle(it.topic_id)">
                <svg v-if="done.has(it.topic_id)" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
              </button>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-gray-900 dark:text-white" :class="done.has(it.topic_id) ? 'line-through text-gray-400 dark:text-gray-500' : ''">{{ nice(it.topic) }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ it.subject }}</p>
              </div>
              <span class="hidden sm:inline px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="STATE[it.state].chip">{{ it.score !== null ? `${it.score}%` : STATE[it.state].label }}</span>
              <router-link v-if="it.enote_id" :to="`/student/enotes/${it.enote_id}`" class="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">Revise</router-link>
            </li>
          </ul>
        </section>
        <p v-if="data.topics > data.planned" class="text-xs text-gray-500 dark:text-gray-400">{{ data.topics - data.planned }} more topics didn't fit before the exam - they're the ones you're already doing well on or that come last.</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import { useToastStore } from '@/stores/toast'

interface Item { topic_id: number; topic: string; subject: string; subject_code: string; score: number | null; state: 'weak' | 'new' | 'good'; enote_id: number | null }
interface Exam { id: number; title: string; class_level: string | null; starts_on: string; ends_on: string | null; days_left: number }
interface Plan { exam: Exam | null; upcoming: Exam[]; weeks: { week_start: string; items: Item[] }[]; topics: number; planned: number; weak: number }

const STATE = {
  weak: { label: 'Needs work', chip: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
  new: { label: 'Not assessed', chip: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' },
  good: { label: 'Going well', chip: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' }
}

const toast = useToastStore()
const data = ref<Plan | null>(null)
const loading = ref(true)

// Revised topics - per exam, on this device
const done = ref(new Set<number>())
const storeKey = () => `exam-plan:${data.value?.exam?.id ?? 0}`
const loadDone = () => {
  try { done.value = new Set(JSON.parse(localStorage.getItem(storeKey()) || '[]')) } catch { done.value = new Set() }
}
const toggle = (id: number) => {
  const s = new Set(done.value)
  s.has(id) ? s.delete(id) : s.add(id)
  done.value = s
  try { localStorage.setItem(storeKey(), JSON.stringify([...s])) } catch { /* ticks just won't stick */ }
}
const doneCount = computed(() => (data.value?.weeks ?? []).reduce((n, w) => n + w.items.filter(i => done.value.has(i.topic_id)).length, 0))

const longDate = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })
const shortDate = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
const nice = (t: string) => (t === t.toUpperCase() ? t.toLowerCase().replace(/(^|[.!?]\s+|\s)(\w)/g, (_m, p, c) => p + c.toUpperCase()) : t)

onMounted(async () => {
  try {
    const res = await axios.get('/api/student/exam-plan')
    data.value = res.data.data
    loadDone()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load your exam plan')
  } finally {
    loading.value = false
  }
})
</script>
