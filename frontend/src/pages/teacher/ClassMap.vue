<template>
  <!-- The class Learning Map: how one class stream is doing on every learning outcome and topic
       competency of a subject, who needs support on each, and every student's progress - so a
       teacher can see what to reteach and to whom. -->
  <div class="w-full">
    <div class="flex flex-wrap items-center gap-2 mb-1">
      <div class="hidden sm:flex w-7 h-7 rounded-lg bg-emerald-600 items-center justify-center flex-shrink-0">
        <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
      </div>
      <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mr-auto">Class Learning Map</h1>
      <!-- Subject, then the class level, then one stream - or all its streams together -->
      <div class="flex flex-wrap gap-2 w-full sm:w-auto">
        <PickerDropdown class="flex-1 sm:flex-none" v-if="options.length > 1" v-model="subjectId" label="Subject" :options="options.map(s => ({ value: s.id, label: s.name }))" align="right" />
        <PickerDropdown class="flex-1 sm:flex-none" v-if="levelOptions.length" v-model="level" label="Class" :options="levelOptions" align="right" />
        <PickerDropdown class="flex-1 sm:flex-none" v-if="streamOptions.length" v-model="stream" label="Stream" :options="streamOptions" align="right" />
      </div>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">How the class is doing on each learning outcome and topic competency - from returned assessments only. Tap a row to see who needs support.</p>

    <div v-if="loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="h-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
    </div>
    <p v-else-if="!options.length" class="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">No curriculum topics this year for your subjects.</p>

    <template v-else-if="data">
      <!-- Legend + view -->
      <div class="flex flex-wrap items-center gap-2 mb-4">
        <span v-for="k in KEYS" :key="k" class="inline-flex items-center gap-1.5 text-[11px] text-gray-600 dark:text-gray-300"><span class="w-2.5 h-2.5 rounded-sm" :class="STYLE[k].bar"></span>{{ STYLE[k].label }}</span>
        <div class="ml-auto flex gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
          <button v-for="tab in (['outcomes', 'students'] as const)" :key="tab" type="button" class="px-3 py-1 rounded-md text-xs font-semibold" :class="view === tab ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'" @click="view = tab">
            {{ tab === 'outcomes' ? 'By outcome' : `By student (${data.student_count})` }}
          </button>
        </div>
      </div>

      <!-- By outcome -->
      <template v-if="view === 'outcomes'">
        <p v-if="!data.topics.length" class="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">No topics for this class this year.</p>
        <div v-for="t in data.topics" :key="t.id" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-3">
          <p class="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{{ [t.term_name, t.theme].filter(Boolean).join(' · ') }}</p>
          <p class="text-sm font-bold text-gray-900 dark:text-white mb-2">{{ t.topic }}</p>

          <div v-for="row in rowsFor(t)" :key="row.key" class="border-t border-gray-100 dark:border-gray-700 first:border-t-0">
            <button type="button" class="w-full text-left py-2 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3" @click="toggle(row.key)">
              <span class="flex-1 min-w-0 text-sm leading-snug" :class="row.kind === 'competency' ? 'font-semibold text-violet-800 dark:text-violet-200' : 'text-gray-800 dark:text-gray-100'">
                <span v-if="row.kind === 'competency'" class="text-[10px] font-bold uppercase tracking-wider mr-1">Competency (AOI) ·</span>{{ row.text }}
              </span>
              <span v-if="!row.assessed" class="flex-shrink-0 text-[11px] font-semibold text-amber-700 dark:text-amber-300 sm:w-60 sm:text-right">No assessment linked yet</span>
              <span v-else class="flex-shrink-0 sm:w-60 flex items-center gap-2">
                <span class="flex h-2.5 flex-1 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <span v-for="k in KEYS" :key="k" :class="STYLE[k].bar" :style="{ width: `${share(row.counts, k)}%` }"></span>
                </span>
                <span class="text-[11px] w-20 text-right" :class="row.support.length ? 'text-rose-700 dark:text-rose-300 font-semibold' : 'text-gray-500 dark:text-gray-400'">
                  {{ row.support.length ? `${row.support.length} need help` : `${row.counts.achieved} achieved` }}
                </span>
              </span>
            </button>
            <div v-if="open[row.key] && row.assessed" class="pb-3 text-xs">
              <p class="text-gray-500 dark:text-gray-400 mb-1.5">
                {{ row.counts.achieved }} achieved · {{ row.counts.developing }} developing · {{ row.counts.needs_support }} need support · {{ row.counts.not_assessed }} not assessed yet
              </p>
              <div v-if="row.support.length" class="flex flex-wrap gap-1.5">
                <span v-for="s in row.support" :key="s.student_id" class="px-2 py-0.5 rounded-full" :class="STYLE[s.status].chip">{{ s.name }} · {{ s.percentage }}%</span>
              </div>
              <p v-else class="text-emerald-700 dark:text-emerald-300 font-semibold">Everyone assessed has achieved it.</p>
            </div>
          </div>
        </div>
      </template>

      <!-- By student -->
      <div v-else class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <input v-model="search" type="text" placeholder="Search students..." class="w-full sm:w-64 mb-3 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
        <ul class="divide-y divide-gray-100 dark:divide-gray-700">
          <li v-for="s in studentRows" :key="s.id" class="py-2 flex items-center gap-3">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ s.name }}</p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ s.admission_number }}<template v-if="stream === 'all'"> · {{ s.class_name }}</template> · {{ s.results }} of {{ data.outcome_count }} outcomes assessed</p>
            </div>
            <span v-if="!s.results" class="text-[11px] text-gray-400 dark:text-gray-500 w-44 text-right">No results yet</span>
            <span v-else class="w-44 flex items-center gap-2">
              <span class="flex h-2.5 flex-1 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                <span class="bg-emerald-500" :style="{ width: `${s.achieved / s.results * 100}%` }"></span>
                <span class="bg-amber-400" :style="{ width: `${s.developing / s.results * 100}%` }"></span>
                <span class="bg-rose-500" :style="{ width: `${s.needs_support / s.results * 100}%` }"></span>
              </span>
              <span class="text-[11px] w-12 text-right font-semibold" :class="s.needs_support ? 'text-rose-700 dark:text-rose-300' : 'text-emerald-700 dark:text-emerald-300'">{{ s.achieved }}/{{ s.results }}</span>
            </span>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import PickerDropdown, { type PickerOption } from '@/components/common/PickerDropdown.vue'

type Key = 'achieved' | 'developing' | 'needs_support' | 'not_assessed'
interface Summary { assessed: boolean; counts: Record<Key, number>; support: { student_id: number; name: string; percentage: number; status: 'developing' | 'needs_support' }[] }
interface Topic { id: number; topic: string; theme: string | null; term_name: string | null; competence: string | null; outcomes: (Summary & { id: number; text: string })[]; competency: Summary }
interface StudentRow { id: number; name: string; admission_number: string; class_name: string | null; achieved: number; developing: number; needs_support: number; results: number }
interface ClassMap { subject: { id: number; name: string }; student_count: number; topics: Topic[]; students: StudentRow[]; outcome_count: number }

const KEYS: Key[] = ['achieved', 'developing', 'needs_support', 'not_assessed']
const STYLE: Record<Key, { label: string; bar: string; chip: string }> = {
  achieved: { label: 'Achieved', bar: 'bg-emerald-500', chip: 'bg-emerald-50 text-emerald-800' },
  developing: { label: 'Developing', bar: 'bg-amber-400', chip: 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' },
  needs_support: { label: 'Needs support', bar: 'bg-rose-500', chip: 'bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200' },
  not_assessed: { label: 'Not assessed yet', bar: 'bg-gray-200 dark:bg-gray-600', chip: 'bg-gray-100 text-gray-700' }
}

interface Level { name: string; streams: { id: number; name: string; stream: string }[] }
const options = ref<{ id: number; name: string; levels: Level[] }[]>([])
const subjectId = ref<number | null>(null)
// The class level (e.g. 'S.1'), and the stream within it - a class id, or 'all' for every stream
const level = ref<string | null>(null)
const stream = ref<number | 'all' | null>(null)
const data = ref<ClassMap | null>(null)
const loading = ref(true)
const view = ref<'outcomes' | 'students'>('outcomes')
const open = ref<Record<string, boolean>>({})
const search = ref('')

const levels = computed(() => options.value.find(s => s.id === subjectId.value)?.levels ?? [])
const levelOptions = computed<PickerOption<string>[]>(() => levels.value.map(l => ({
  value: l.name, label: l.name, hint: `${l.streams.length} ${l.streams.length === 1 ? 'stream' : 'streams'}`
})))
const streamOptions = computed<PickerOption<number | 'all'>[]>(() => {
  const streams = levels.value.find(l => l.name === level.value)?.streams ?? []
  return [
    ...streams.map(st => ({ value: st.id, label: st.stream })),
    ...(streams.length > 1 ? [{ value: 'all' as const, label: 'All streams', hint: `${streams.length} together` }] : [])
  ]
})

const rowsFor = (t: Topic) => [
  ...t.outcomes.map(o => ({ key: `o${o.id}`, kind: 'outcome' as const, ...o })),
  { key: `c${t.id}`, kind: 'competency' as const, text: t.competence || 'Topic competency', ...t.competency }
]
const share = (counts: Record<Key, number>, k: Key) => {
  const total = KEYS.reduce((n, key) => n + counts[key], 0)
  return total ? counts[k] / total * 100 : 0
}
const toggle = (key: string) => { open.value = { ...open.value, [key]: !open.value[key] } }

// Who's furthest behind first
const studentRows = computed(() => {
  const q = search.value.trim().toLowerCase()
  return [...(data.value?.students ?? [])]
    .filter(s => !q || s.name.toLowerCase().includes(q) || s.admission_number.toLowerCase().includes(q))
    .sort((a, b) => b.needs_support - a.needs_support || (a.results ? a.achieved / a.results : 1) - (b.results ? b.achieved / b.results : 1) || a.name.localeCompare(b.name))
})

const load = async () => {
  if (!subjectId.value || !level.value || stream.value === null) return
  loading.value = true
  open.value = {}
  try {
    const params = stream.value === 'all'
      ? { subject_id: subjectId.value, level: level.value }
      : { subject_id: subjectId.value, class_id: stream.value }
    const response = await axios.get('/api/teacher/class-map', { params })
    data.value = response.data.data
  } catch {
    data.value = null
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/teacher/class-map/options')
    options.value = response.data.data.subjects || []
    subjectId.value = options.value[0]?.id ?? null
  } finally {
    if (!options.value.length) loading.value = false
  }
})
// A new subject keeps the class level when it has it (else its first); a new level starts on its
// first stream
watch(subjectId, () => {
  if (!levels.value.some(l => l.name === level.value)) level.value = levels.value[0]?.name ?? null
  else stream.value = streamOptions.value[0]?.value ?? null
})
watch(level, () => { stream.value = streamOptions.value[0]?.value ?? null })
watch(stream, load)
</script>
