<template>
  <!-- My Classes: the class levels in the teacher's department, each level's streams - with how
       the streams the teacher teaches are doing - and into any stream's own page -->
  <div class="w-full">
    <PageHeader title="My Classes" description="Your classes and streams, and how the ones you teach are doing." icon="users">
      <template #filters>
        <PickerDropdown v-if="yearOptions.length" v-model="year" label="Academic year" :options="yearOptions" align="right" />
      </template>
    </PageHeader>

    <Skeleton v-if="loading" variant="tiles" :count="4" class="mb-4" />
    <template v-else>
      <StatStrip class="mb-5" :items="stats" />

      <EmptyState v-if="!streams.length" icon="users" title="No classes yet" message="Classes appear here once students are enrolled in your department for this year." />

      <template v-else>
        <!-- Class levels -->
        <div class="flex items-center gap-2 mb-2">
          <h2 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">Class levels</h2>
          <button v-if="mineCount" type="button" class="px-3 py-1 rounded-full text-xs font-semibold border transition-colors" :class="onlyMine ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300'" @click="onlyMine = !onlyMine">
            Only streams I teach
          </button>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3 mb-6">
          <!-- Every stream of every level -->
          <button
            type="button"
            class="text-left bg-white dark:bg-gray-800 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            :class="level === 'all' ? 'border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-900' : 'border-gray-200 dark:border-gray-700 opacity-50 hover:opacity-100'"
            @click="level = 'all'"
          >
            <p class="text-xl font-extrabold text-gray-900 dark:text-white">All</p>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{{ streams.length }} streams · every class</p>
            <div class="mt-3 grid grid-cols-3 gap-0.5 h-6">
              <span v-for="i in 6" :key="i" class="rounded-sm bg-indigo-200 dark:bg-indigo-900/60"></span>
            </div>
          </button>
          <button
            v-for="lv in levels"
            :key="lv.name"
            type="button"
            class="text-left bg-white dark:bg-gray-800 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            :class="level === lv.name ? 'border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-900' : 'border-gray-200 dark:border-gray-700 opacity-50 hover:opacity-100'"
            @click="level = lv.name"
          >
            <div class="flex items-center justify-between">
              <p class="text-xl font-extrabold text-gray-900 dark:text-white">{{ lv.name }}</p>
              <span v-if="lv.mine" class="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">You teach {{ lv.mine }}</span>
            </div>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{{ lv.streams.length }} stream{{ lv.streams.length === 1 ? '' : 's' }} · {{ lv.students.toLocaleString() }} students</p>
            <!-- Stream sizes -->
            <div class="mt-3 flex items-end gap-0.5 h-6">
              <span v-for="st in lv.streams" :key="st.id" class="flex-1 rounded-sm" :class="st.mine ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-600'" :style="{ height: `${Math.max(20, st.students / lv.biggest * 100)}%` }" :title="`${st.stream_name || st.name}: ${st.students}`"></span>
            </div>
          </button>
        </div>

        <!-- Streams (of the chosen level, or all) -->
        <div class="flex items-center gap-2 mb-2">
          <h2 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">{{ level === 'all' ? 'All streams' : `${level} streams` }}</h2>
          <button v-if="level !== 'all'" type="button" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300" @click="level = 'all'">See all streams</button>
        </div>
        <EmptyState v-if="!shownStreams.length" compact icon="users" title="No streams to show" message="You don't teach any stream in this class level yet." />
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          <RouterLink
            v-for="st in shownStreams"
            :key="st.id"
            :to="{ path: `/teacher/classes/${st.id}`, query: year ? { year } : {} }"
            class="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            <div class="flex items-start gap-3">
              <div class="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-extrabold flex-shrink-0" :class="st.mine ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200'">
                {{ st.stream_name || '–' }}
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <p class="text-base font-bold text-gray-900 dark:text-white">{{ st.name }}{{ st.stream_name ? `-${st.stream_name}` : '' }}</p>
                  <span v-if="st.mine" class="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">Yours</span>
                </div>
                <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ st.students }} students · {{ st.level }}</p>
                <!-- Boys / girls -->
                <div class="mt-2 flex h-1.5 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700" :title="`${st.boys} boys, ${st.girls} girls`">
                  <span class="bg-blue-500" :style="{ width: `${share(st.boys, st.students)}%` }"></span>
                  <span class="bg-pink-500" :style="{ width: `${share(st.girls, st.students)}%` }"></span>
                </div>
                <p class="mt-1 text-[10px] text-gray-400">{{ st.boys }} boys · {{ st.girls }} girls</p>
              </div>
              <svg class="w-4 h-4 text-gray-300 group-hover:text-indigo-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
            <!-- How it's doing, for the streams the teacher teaches -->
            <div v-if="st.mine" class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex flex-wrap items-center gap-1.5 text-[11px]">
              <span class="px-2 py-0.5 rounded-full font-semibold" :class="st.achieved_percent === null ? 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200'">
                {{ st.achieved_percent === null ? 'No results yet' : `${st.achieved_percent}% outcomes achieved` }}
              </span>
              <span v-if="st.need_support" class="px-2 py-0.5 rounded-full font-semibold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200">{{ st.need_support }} need support</span>
              <span v-if="st.to_mark" class="px-2 py-0.5 rounded-full font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">{{ st.to_mark }} to mark</span>
            </div>
          </RouterLink>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import apiService from '@/services/api'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import PickerDropdown, { type PickerOption } from '@/components/common/PickerDropdown.vue'
import { useRemembered } from '@/composables/useRemembered'
import { usePersistedRef } from '@/composables/usePersistedRef'

interface Stream {
  id: number
  name: string
  level: string
  stream_name: string | null
  students: number
  boys: number
  girls: number
  mine: boolean
  achieved_percent: number | null
  need_support: number
  to_mark: number
}

const years = ref<string[]>([])
const yearOptions = computed<PickerOption<string>[]>(() => years.value.map(y => ({ value: y, label: y })))
const year = useRemembered<string>('classes:year', years, () => String(new Date().getFullYear()))
const streams = ref<Stream[]>([])
const loading = ref(true)
// The class level on view ('all' for every stream) - remembered; to begin with, the first level
// the teacher teaches
const level = usePersistedRef<string>('classes:level', '')
const onlyMine = usePersistedRef('classes:only-mine', false)

const share = (n: number, of: number) => (of ? n / of * 100 : 0)

const levels = computed(() => {
  const map = new Map<string, { name: string; streams: Stream[]; students: number; mine: number; biggest: number }>()
  for (const st of streams.value) {
    const lv = map.get(st.name) ?? { name: st.name, streams: [], students: 0, mine: 0, biggest: 1 }
    lv.streams.push(st)
    lv.students += st.students
    lv.mine += st.mine ? 1 : 0
    lv.biggest = Math.max(lv.biggest, st.students)
    map.set(st.name, lv)
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
})
const mineCount = computed(() => streams.value.filter(s => s.mine).length)
const shownStreams = computed(() => streams.value
  .filter(s => level.value === 'all' || s.name === level.value)
  .filter(s => !onlyMine.value || s.mine)
  .sort((a, b) => Number(b.mine) - Number(a.mine) || a.name.localeCompare(b.name, undefined, { numeric: true }) || String(a.stream_name).localeCompare(String(b.stream_name))))

const stats = computed<StatItem[]>(() => [
  { label: 'Class levels', value: levels.value.length, tone: 'sky' },
  { label: 'Streams', value: streams.value.length, tone: 'violet' },
  { label: 'Students', value: streams.value.reduce((n, s) => n + s.students, 0), tone: 'indigo' },
  { label: 'Streams you teach', value: mineCount.value, tone: 'emerald' }
])

const loadYears = async () => {
  try {
    const response = await apiService.get('/teacher/classes/academic-years')
    years.value = (response.data?.data || []).map((y: any) => String(y.academic_year))
  } catch {
    years.value = []
  }
}
const load = async () => {
  loading.value = true
  try {
    const response = await apiService.get('/teacher/classes/overview', { params: year.value ? { academic_year: year.value } : {} })
    streams.value = response.data?.data?.streams || []
    // A level that isn't there (first visit, another year): the first one the teacher teaches
    if (level.value !== 'all' && !levels.value.some(l => l.name === level.value)) {
      level.value = (levels.value.find(l => l.mine) ?? levels.value[0])?.name ?? 'all'
    }
  } catch {
    streams.value = []
  } finally {
    loading.value = false
  }
}

// Reload when the teacher picks another year (not while the remembered one is being restored)
let ready = false
watch(year, () => {
  if (!ready) return
  load()
})
onMounted(async () => {
  await loadYears()
  await nextTick()
  ready = true
  load()
})
</script>
