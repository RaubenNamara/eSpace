<template>
  <!-- The teacher's week on one screen: the scheme-of-work topics planned for it (tick them off as
       they're taught), live classes and work due placed on their days, exams, and a short note
       per day. Turns the scheme of work from a document into something used every day. -->
  <div class="w-full">
    <PageHeader title="My week" :description="data ? weekLabel : 'Your lessons, topics, work due and notes for the week.'" icon="clock" accent="indigo">
      <template #actions>
        <div class="inline-flex rounded-xl border border-gray-300 dark:border-gray-600 overflow-hidden bg-white dark:bg-gray-800">
          <button type="button" class="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" aria-label="Previous week" @click="shift(-7)">←</button>
          <button type="button" class="px-3 py-2 text-sm font-semibold border-x border-gray-300 dark:border-gray-600 disabled:text-gray-400" :class="isThisWeek ? 'text-gray-400' : 'text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'" :disabled="isThisWeek" @click="goTo('')">This week</button>
          <button type="button" class="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" aria-label="Next week" @click="shift(7)">→</button>
        </div>
      </template>
      <StatStrip v-if="data" :items="statItems" />
    </PageHeader>

    <div v-if="loading && !data" class="grid grid-cols-1 lg:grid-cols-7 gap-3">
      <div v-for="i in 7" :key="i" class="h-48 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div>
    </div>

    <template v-else-if="data">
      <!-- Topics planned for the week -->
      <section class="mb-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <h2 class="text-sm font-bold text-gray-900 dark:text-white">Topics to teach this week</h2>
          <span v-if="data.topics.length" class="text-xs text-gray-500 dark:text-gray-400">{{ taughtCount }}/{{ data.topics.length }} taught</span>
          <RouterLink to="/teacher/scheme" class="ml-auto text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Scheme of work →</RouterLink>
        </div>
        <p v-if="data.behind" class="mb-2 text-xs text-amber-700 dark:text-amber-300">{{ data.behind }} topic{{ data.behind === 1 ? '' : 's' }} from earlier weeks not ticked off yet - catch up or move them in the scheme of work.</p>
        <p v-if="!data.topics.length" class="text-sm text-gray-500 dark:text-gray-400">Nothing planned for this week. Plan topics into weeks in the scheme of work and they show up here.</p>
        <ul v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <li v-for="t in data.topics" :key="`${t.subject_id}-${t.class_level}-${t.topic_id}`">
            <label class="flex items-start gap-2.5 rounded-xl border px-3 py-2 cursor-pointer transition-colors" :class="t.taught ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-900/15' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'">
              <input type="checkbox" class="mt-0.5 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" :checked="t.taught" @change="toggleTaught(t)">
              <span class="min-w-0">
                <span class="block text-sm font-semibold truncate" :class="t.taught ? 'text-emerald-800 dark:text-emerald-200 line-through decoration-emerald-400/60' : 'text-gray-900 dark:text-white'">{{ t.topic }}</span>
                <span class="block text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ t.subject }} · {{ t.class_level }}</span>
              </span>
            </label>
          </li>
        </ul>
      </section>

      <!-- The days -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        <article
          v-for="d in data.days"
          :key="d.date"
          class="rounded-2xl border bg-white dark:bg-gray-800 p-3 flex flex-col lg:min-h-[12rem]"
          :class="[d.date === data.today ? 'border-indigo-400 ring-2 ring-indigo-100 dark:ring-indigo-900/40' : 'border-gray-200 dark:border-gray-700', isWeekend(d.date) ? 'lg:opacity-80' : '']"
        >
          <header class="flex items-baseline justify-between mb-2">
            <p class="text-sm font-bold" :class="d.date === data.today ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-white'">{{ dayName(d.date) }}</p>
            <p class="text-xs text-gray-400">{{ dayNum(d.date) }}</p>
          </header>

          <p v-for="e in d.exams" :key="e.title" class="mb-1.5 px-2 py-1 rounded-lg text-[11px] font-semibold bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 truncate" :title="e.title">Exam · {{ e.title }}</p>

          <RouterLink v-for="l in d.lessons" :key="`l${l.id}`" to="/teacher/live-classes" class="mb-1.5 block rounded-lg px-2 py-1.5 bg-sky-50 dark:bg-sky-900/25 hover:bg-sky-100 dark:hover:bg-sky-900/40">
            <span class="block text-[11px] font-semibold text-sky-800 dark:text-sky-200">{{ time(l.start) }} · Live</span>
            <span class="block text-xs text-sky-900 dark:text-sky-100 truncate">{{ l.title }}</span>
            <span v-if="l.class" class="block text-[10px] text-sky-700/80 dark:text-sky-300/80 truncate">{{ l.class }}</span>
          </RouterLink>

          <RouterLink v-for="a in d.due" :key="`a${a.id}`" :to="`/teacher/assignments/${a.id}/submissions`" class="mb-1.5 block rounded-lg px-2 py-1.5 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/35">
            <span class="block text-[11px] font-semibold text-amber-800 dark:text-amber-200">Due {{ time(a.due) }}</span>
            <span class="block text-xs text-amber-900 dark:text-amber-100 truncate">{{ a.title }}</span>
            <span class="block text-[10px] text-amber-700/90 dark:text-amber-300/80">{{ a.class }}<template v-if="a.handed_in"> · {{ a.handed_in }} in</template><template v-if="a.to_mark"> · <b>{{ a.to_mark }} to mark</b></template></span>
          </RouterLink>

          <p v-if="!d.exams.length && !d.lessons.length && !d.due.length" class="text-[11px] text-gray-300 dark:text-gray-600 mb-1.5">Nothing scheduled</p>

          <textarea
            v-model="notes[d.date]"
            rows="2"
            maxlength="500"
            placeholder="Note for the day…"
            class="mt-auto w-full px-2 py-1.5 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-transparent text-xs text-gray-700 dark:text-gray-200 placeholder-gray-400 resize-none focus:border-solid focus:border-indigo-400 focus:outline-none"
            @blur="saveNote(d.date)"
          ></textarea>
        </article>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import { useToastStore } from '@/stores/toast'

interface Topic { topic_id: number; subject_id: number; class_level: string; topic: string; theme: string | null; subject: string; taught: boolean }
interface Day {
  date: string
  lessons: { id: number; title: string; start: string; end: string; status: string; class: string; subject: string | null }[]
  due: { id: number; title: string; due: string; status: string; class: string; handed_in: number; to_mark: number }[]
  exams: { title: string; class_level: string | null }[]
  note: string
}
interface Payload { week_start: string; week_end: string; today: string; topics: Topic[]; behind: number; to_mark: number; days: Day[] }

const route = useRoute()
const router = useRouter()
const toast = useToastStore()
const data = ref<Payload | null>(null)
const loading = ref(true)
const notes = reactive<Record<string, string>>({})
const savedNotes: Record<string, string> = {}

const parse = (d: string) => new Date(`${d.slice(0, 10)}T${d.length > 10 ? d.slice(11, 19) : '00:00:00'}`)
const dayName = (d: string) => parse(d).toLocaleDateString(undefined, { weekday: 'short' })
const dayNum = (d: string) => parse(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
const time = (d: string) => parse(d).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
const isWeekend = (d: string) => [0, 6].includes(parse(d).getDay())
const isThisWeek = computed(() => !!data.value && data.value.today >= data.value.week_start && data.value.today <= data.value.week_end)
const weekLabel = computed(() => data.value ? `${parse(data.value.week_start).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })} – ${parse(data.value.week_end).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}${isThisWeek.value ? ' · this week' : ''}` : '')

const taughtCount = computed(() => data.value?.topics.filter(t => t.taught).length || 0)
const statItems = computed<StatItem[]>(() => {
  const d = data.value!
  const lessons = d.days.reduce((n, x) => n + x.lessons.length, 0)
  const due = d.days.reduce((n, x) => n + x.due.length, 0)
  return [
    { label: 'Topics taught', value: `${taughtCount.value}/${d.topics.length}`, tone: 'emerald' },
    { label: 'Live classes', value: lessons, tone: 'sky' },
    { label: 'Work due', value: due, tone: 'amber' },
    { label: 'Scripts to mark', value: d.to_mark, tone: 'rose', hint: 'all assessments' }
  ]
})

const load = async (week = '') => {
  loading.value = true
  try {
    const res = await axios.get('/api/teacher/planner', { params: week ? { week } : {} })
    data.value = res.data.data
    for (const d of data.value!.days) { notes[d.date] = d.note; savedNotes[d.date] = d.note }
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load your week')
  } finally {
    loading.value = false
  }
}

const goTo = (week: string) => {
  router.replace({ query: week ? { week } : {} })
  load(week)
}
const shift = (days: number) => {
  if (!data.value) return
  const d = parse(data.value.week_start)
  d.setDate(d.getDate() + days)
  goTo(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
}

const toggleTaught = async (t: Topic) => {
  t.taught = !t.taught
  try {
    await axios.put(`/api/teacher/scheme/${t.topic_id}`, { subject_id: t.subject_id, class_level: t.class_level, taught: t.taught })
  } catch (err: any) {
    t.taught = !t.taught
    toast.error(err.response?.data?.message || 'Could not save that')
  }
}

const saveNote = async (day: string) => {
  const note = (notes[day] || '').trim()
  if (note === (savedNotes[day] || '')) return
  try {
    await axios.put('/api/teacher/planner/notes', { day, note })
    savedNotes[day] = note
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not save the note')
  }
}

onMounted(() => load(String(route.query.week || '')))
</script>
