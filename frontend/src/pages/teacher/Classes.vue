<template>
  <!-- My Classes: find any class and see who is in it. Tap a level, then a class, then a stream -
       the ones not chosen fade back - and the stream's learners (those taking the teacher's
       subject) show below, with a search. -->
  <div class="w-full">
    <PageHeader title="My Classes" description="Find any class and see its learners: tap a level, then a class, then a stream." icon="users" />

    <Skeleton v-if="loading" variant="tiles" :count="4" class="mb-4" />
    <EmptyState v-else-if="!streams.length" icon="users" title="No classes yet" message="Classes appear here once learners taking your subject are enrolled." />

    <template v-else>
      <!-- 1. Level -->
      <h2 class="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">1 · Level</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <button
          v-for="lv in levels"
          :key="lv.name"
          type="button"
          class="text-left bg-white dark:bg-gray-800 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
          :class="tileClass(level === lv.name, !!level)"
          :aria-pressed="level === lv.name"
          @click="pickLevel(lv.name)"
        >
          <p class="text-xl font-extrabold text-gray-900 dark:text-white">{{ lv.name }}</p>
          <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{{ lv.classes }} class{{ lv.classes === 1 ? '' : 'es' }} · {{ lv.students.toLocaleString() }} learners</p>
        </button>
      </div>

      <!-- 2. Class -->
      <template v-if="level">
        <h2 class="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">2 · Class</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-3 mb-5">
          <button
            v-for="c in classes"
            :key="c.name"
            type="button"
            class="text-left bg-white dark:bg-gray-800 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            :class="tileClass(cls === c.name, !!cls)"
            :aria-pressed="cls === c.name"
            @click="pickClass(c.name)"
          >
            <p class="text-xl font-extrabold text-gray-900 dark:text-white">{{ c.name }}</p>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{{ c.streams.length }} stream{{ c.streams.length === 1 ? '' : 's' }} · {{ c.students }} learners</p>
            <!-- each stream's size -->
            <div class="mt-3 flex items-end gap-0.5 h-6">
              <span v-for="st in c.streams" :key="st.id" class="flex-1 rounded-sm bg-indigo-300 dark:bg-indigo-800" :style="{ height: `${Math.max(20, (st.students / c.biggest) * 100)}%` }" :title="`${st.stream_name || st.name}: ${st.students}`"></span>
            </div>
          </button>
        </div>
      </template>

      <!-- 3. Stream -->
      <template v-if="cls">
        <h2 class="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">3 · Stream</h2>
        <div class="grid grid-cols-3 sm:grid-cols-5 xl:grid-cols-8 gap-3 mb-6">
          <button
            v-for="st in classStreams"
            :key="st.id"
            type="button"
            class="text-left bg-white dark:bg-gray-800 rounded-2xl border p-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
            :class="tileClass(streamId === st.id, !!streamId)"
            :aria-pressed="streamId === st.id"
            @click="pickStream(st.id)"
          >
            <p class="text-lg font-extrabold text-gray-900 dark:text-white">{{ st.stream_name || st.name }}</p>
            <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ st.students }} learners</p>
            <div class="mt-2 flex h-1.5 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700" :title="`${st.boys} boys, ${st.girls} girls`">
              <span class="bg-indigo-500" :style="{ width: `${share(st.boys, st.students)}%` }"></span>
              <span class="bg-slate-500" :style="{ width: `${share(st.girls, st.students)}%` }"></span>
            </div>
          </button>
        </div>
      </template>

      <!-- The stream's learners -->
      <section v-if="stream" ref="listEl" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden scroll-mt-20">
        <div class="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="flex-1 min-w-[10rem]">
            <h2 class="text-base font-bold text-gray-900 dark:text-white">{{ stream.name }}{{ stream.stream_name ? `-${stream.stream_name}` : '' }}</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ learners.length }} learner{{ learners.length === 1 ? '' : 's' }} · {{ stream.boys }} boys · {{ stream.girls }} girls</p>
          </div>
          <input v-model="search" type="search" placeholder="Search name or student number" class="w-full sm:w-64 px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        </div>
        <div v-if="studentsLoading" class="p-4 space-y-2">
          <div v-for="i in 6" :key="i" class="h-10 rounded-lg bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
        </div>
        <p v-else-if="studentsError" class="p-4 text-sm text-rose-600">{{ studentsError }}</p>
        <p v-else-if="!shownLearners.length" class="p-6 text-center text-sm text-gray-500 dark:text-gray-400">{{ learners.length ? `No learner matches "${search.trim()}".` : 'No learners in this stream.' }}</p>
        <ol v-else class="divide-y divide-gray-100 dark:divide-gray-700">
          <li v-for="(s, i) in shownLearners" :key="s.student_id" class="flex items-center gap-3 px-4 py-2.5">
            <span class="w-6 text-right text-xs tabular-nums text-gray-400">{{ i + 1 }}</span>
            <span class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">{{ initials(s) }}</span>
            <span class="min-w-0 flex-1">
              <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ niceName(`${s.first_name} ${s.last_name}`) }}</span>
              <span class="block text-xs text-gray-500 dark:text-gray-400">{{ s.admission_number || '-' }}</span>
            </span>
            <span class="text-xs text-gray-400 capitalize">{{ s.gender || '' }}</span>
          </li>
        </ol>
      </section>
      <p v-else-if="cls" class="text-sm text-gray-500 dark:text-gray-400">Tap a stream to see its learners.</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import apiService from '@/services/api'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { niceName } from '@/components/dashboard/teacher/time'

interface Stream { id: number; name: string; level: string; stream_name: string | null; students: number; boys: number; girls: number }
interface Learner { student_id: number; admission_number: string | null; first_name: string; last_name: string; gender: string | null }

const streams = ref<Stream[]>([])
const loading = ref(true)
// The level, class and stream on view - remembered, so the page reopens where the teacher was
const level = usePersistedRef<string>('classes:level', '')
const cls = usePersistedRef<string>('classes:class', '')
const streamId = usePersistedRef<number>('classes:stream', 0)

const byName = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true })
const share = (n: number, of: number) => (of ? (n / of) * 100 : 0)
// The chosen tile stands out; once something is chosen, the others fade back
const tileClass = (chosen: boolean, anyChosen: boolean) => chosen
  ? 'border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-900'
  : anyChosen ? 'border-gray-200 dark:border-gray-700 opacity-40 blur-[1px] hover:opacity-100 hover:blur-0' : 'border-gray-200 dark:border-gray-700'

const levels = computed(() => {
  const map = new Map<string, { name: string; names: Set<string>; students: number }>()
  for (const st of streams.value) {
    const name = st.level || 'Other'
    const lv = map.get(name) ?? { name, names: new Set<string>(), students: 0 }
    lv.names.add(st.name)
    lv.students += st.students
    map.set(name, lv)
  }
  return [...map.values()].map(l => ({ name: l.name, classes: l.names.size, students: l.students })).sort((a, b) => byName(a.name, b.name))
})
const classes = computed(() => {
  const map = new Map<string, { name: string; streams: Stream[]; students: number; biggest: number }>()
  for (const st of streams.value.filter(s => (s.level || 'Other') === level.value)) {
    const c = map.get(st.name) ?? { name: st.name, streams: [], students: 0, biggest: 1 }
    c.streams.push(st)
    c.students += st.students
    c.biggest = Math.max(c.biggest, st.students)
    map.set(st.name, c)
  }
  return [...map.values()].sort((a, b) => byName(a.name, b.name))
})
const classStreams = computed(() => streams.value
  .filter(s => (s.level || 'Other') === level.value && s.name === cls.value)
  .sort((a, b) => byName(String(a.stream_name), String(b.stream_name))))
const stream = computed(() => classStreams.value.find(s => s.id === streamId.value) || null)

const pickLevel = (name: string) => {
  if (level.value === name) return
  level.value = name
  cls.value = ''
  streamId.value = 0
}
const pickClass = (name: string) => {
  if (cls.value === name) return
  cls.value = name
  streamId.value = 0
  // a class with one stream: straight to its learners
  if (classStreams.value.length === 1) pickStream(classStreams.value[0].id)
}

// ---- the learners of the chosen stream ----
const learners = ref<Learner[]>([])
const studentsLoading = ref(false)
const studentsError = ref('')
const search = ref('')
const listEl = ref<HTMLElement | null>(null)
const pickStream = async (id: number) => {
  streamId.value = id
  search.value = ''
  await loadLearners(true)
}
const loadLearners = async (scroll = false) => {
  const id = streamId.value
  if (!id) return
  studentsLoading.value = true
  studentsError.value = ''
  try {
    const res = await apiService.get(`/teacher/classes/${id}/students`, { params: { active: 1 } })
    if (streamId.value !== id) return
    // one row per learner (a learner can have more than one enrolment in the year)
    const seen = new Set<number>()
    learners.value = (res.data.data as Learner[]).filter(s => !seen.has(s.student_id) && seen.add(s.student_id))
  } catch (e: any) {
    studentsError.value = e.response?.data?.message || 'Could not load the learners'
  } finally {
    studentsLoading.value = false
  }
  if (scroll) {
    await nextTick()
    listEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
const shownLearners = computed(() => {
  const q = search.value.trim().toLowerCase()
  const sorted = [...learners.value].sort((a, b) => `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`))
  return q ? sorted.filter(s => `${s.first_name} ${s.last_name} ${s.admission_number || ''}`.toLowerCase().includes(q)) : sorted
})
const initials = (s: Learner) => `${s.first_name?.[0] || ''}${s.last_name?.[0] || ''}`.toUpperCase()

onMounted(async () => {
  try {
    const res = await apiService.get('/teacher/classes/overview')
    streams.value = res.data.data.streams || []
  } catch {
    streams.value = []
  } finally {
    loading.value = false
  }
  // a remembered choice that no longer exists starts again from the level
  if (level.value && !levels.value.some(l => l.name === level.value)) level.value = ''
  if (!level.value && levels.value.length === 1) level.value = levels.value[0].name
  if (cls.value && !classes.value.some(c => c.name === cls.value)) cls.value = ''
  if (streamId.value && !stream.value) streamId.value = 0
  if (streamId.value) loadLearners()
})
</script>
