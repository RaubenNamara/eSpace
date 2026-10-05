<template>
  <!-- Scheme of work: plan the week for each curriculum topic of a subject and class, tick it off
       when taught, and see what already covers it. Topics whose week has passed without a tick
       show as behind. -->
  <div class="w-full">
    <PageHeader title="Scheme of work" description="Plan a week for each topic, tick it off when you've taught it - and see at a glance where a class is behind." icon="clipboard" accent="indigo" :active-filters="0">
      <template #actions>
        <button type="button" :disabled="!data || planning" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" title="Give every unplanned topic a week, spread over what's left of its term" @click="autoPlan">
          <AppIcon name="sparkles" class="w-4 h-4" />{{ planning ? 'Planning…' : 'Auto-plan' }}
        </button>
      </template>
      <StatStrip v-if="data && data.topics.length" v-model="filter" :items="statItems" />
      <template #filters>
        <select v-model.number="subjectId" class="w-full sm:w-52 py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" aria-label="Subject">
          <option v-for="s in data?.subjects || []" :key="s.id" :value="Number(s.id)">{{ s.name }}</option>
        </select>
        <div class="flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
          <button v-for="l in data?.levels || []" :key="l" type="button" class="flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-semibold border" :class="level === l ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'" @click="level = l">{{ l }}</button>
        </div>
      </template>
    </PageHeader>

    <Skeleton v-if="loading" variant="list" :count="5" />
    <EmptyState v-else-if="!data || !data.topics.length" icon="clipboard" tone="gray" title="No curriculum topics here yet" message="Topics come from the curriculum your administrator sets up for this year. Pick another subject or class." />
    <EmptyState v-else-if="!shown.length" compact icon="clipboard" title="Nothing here" message="Try another filter." />

    <div v-else class="space-y-6">
      <section v-for="g in groups" :key="g.term">
        <h2 class="mb-2 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">{{ g.term }} <span v-if="g.range" class="text-xs font-medium text-gray-500 dark:text-gray-400">· {{ g.range }}</span></h2>
        <ul class="space-y-2">
          <li v-for="t in g.topics" :key="t.id" class="rounded-2xl border bg-white dark:bg-gray-800 p-4 flex flex-col lg:flex-row lg:items-center gap-3" :class="t.status === 'behind' ? 'border-rose-200 dark:border-rose-800' : t.status === 'this_week' ? 'border-indigo-300 dark:border-indigo-700' : 'border-gray-200 dark:border-gray-700'">
            <button type="button" class="w-6 h-6 flex-shrink-0 rounded-md border-2 flex items-center justify-center transition" :class="t.taught_at ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400'" :aria-label="t.taught_at ? 'Mark as not taught' : 'Mark as taught'" :title="t.taught_at ? 'Taught - tap to undo' : 'Mark as taught'" @click="save(t, { taught: !t.taught_at })">
              <svg v-if="t.taught_at" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            </button>
            <div class="min-w-0 flex-1">
              <p class="font-semibold text-gray-900 dark:text-white" :class="t.taught_at ? 'line-through decoration-gray-300 dark:decoration-gray-600 text-gray-500 dark:text-gray-400' : ''">{{ t.topic }}</p>
              <p v-if="t.theme" class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ t.theme }}</p>
              <p class="mt-1.5 flex flex-wrap gap-1.5 text-[11px] font-semibold">
                <span class="px-2 py-0.5 rounded-full" :class="t.evidence.enotes ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'">{{ t.evidence.enotes ? `${t.evidence.enotes} eNote${t.evidence.enotes === 1 ? '' : 's'}` : 'No eNotes' }}</span>
                <span class="px-2 py-0.5 rounded-full" :class="t.evidence.outcomes && t.evidence.outcomes_covered === t.evidence.outcomes ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : t.evidence.outcomes_covered ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'">{{ t.evidence.outcomes_covered }}/{{ t.evidence.outcomes }} outcomes assessed</span>
                <span class="px-2 py-0.5 rounded-full" :class="t.evidence.aoi ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'">{{ t.evidence.aoi ? 'AOI set' : 'No AOI' }}</span>
              </p>
            </div>
            <div class="flex items-center gap-2 lg:flex-shrink-0">
              <span class="px-2.5 py-1 rounded-lg text-xs font-bold" :class="STATUS[t.status].chip">{{ STATUS[t.status].label }}</span>
              <label class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                Week of
                <input type="date" :value="t.week_start || ''" class="py-1.5 px-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white" @change="save(t, { week_start: ($event.target as HTMLInputElement).value || null })">
              </label>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { useToastStore } from '@/stores/toast'

type Status = 'taught' | 'this_week' | 'behind' | 'upcoming' | 'unplanned'
interface Topic {
  id: number
  topic: string
  theme: string | null
  term_id: number | null
  term_name: string | null
  week_start: string | null
  taught_at: string | null
  status: Status
  evidence: { enotes: number; outcomes: number; outcomes_covered: number; aoi: number }
}
interface Scheme {
  subjects: { id: number; name: string }[]
  subject_id: number | null
  levels: string[]
  class_level: string | null
  terms: { id: number; name: string; start_date: string; end_date: string }[]
  topics: Topic[]
  summary: { topics: number; planned: number; taught: number; behind: number; this_week: number }
}

const STATUS: Record<Status, { label: string; chip: string }> = {
  taught: { label: 'Taught', chip: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  this_week: { label: 'This week', chip: 'bg-indigo-600 text-white' },
  behind: { label: 'Behind', chip: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
  upcoming: { label: 'Coming up', chip: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200' },
  unplanned: { label: 'Not planned', chip: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' }
}

const toast = useToastStore()
const data = ref<Scheme | null>(null)
const loading = ref(true)
const planning = ref(false)
const subjectId = usePersistedRef<number>('scheme:subject', 0)
const level = usePersistedRef<string>('scheme:level', '')
const filter = ref<string | null>(null)

const statItems = computed<StatItem[]>(() => {
  const s = data.value?.summary
  if (!s) return []
  return [
    { label: 'Taught', value: `${s.taught}/${s.topics}`, key: 'taught', tone: 'emerald' },
    { label: 'This week', value: s.this_week, key: 'this_week', tone: 'indigo' },
    { label: 'Behind', value: s.behind, key: 'behind', tone: 'rose' },
    { label: 'Not planned', value: data.value?.topics.filter(t => t.status === 'unplanned').length ?? 0, key: 'unplanned', tone: 'amber' }
  ]
})
const shown = computed(() => (data.value?.topics ?? []).filter(t => !filter.value || t.status === filter.value))
const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
const groups = computed(() => {
  const out: { term: string; range: string; topics: Topic[] }[] = []
  for (const t of shown.value) {
    const name = t.term_name || 'No term'
    let g = out.find(x => x.term === name)
    if (!g) {
      const term = data.value?.terms.find(x => x.id === t.term_id)
      g = { term: name, range: term ? `${fmt(term.start_date)} - ${fmt(term.end_date)}` : '', topics: [] }
      out.push(g)
    }
    g.topics.push(t)
  }
  return out
})

const load = async () => {
  loading.value = !data.value
  try {
    const res = await axios.get('/api/teacher/scheme', { params: { subject_id: subjectId.value || undefined, class_level: level.value || undefined } })
    data.value = res.data.data
    if (data.value?.subject_id && data.value.subject_id !== subjectId.value) subjectId.value = data.value.subject_id
    if (data.value?.class_level && data.value.class_level !== level.value) level.value = data.value.class_level
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load the scheme of work')
  } finally {
    loading.value = false
  }
}

const save = async (t: Topic, change: { week_start?: string | null; taught?: boolean }) => {
  try {
    await axios.put(`/api/teacher/scheme/${t.id}`, { subject_id: subjectId.value, class_level: level.value, ...change })
    await load()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not save')
  }
}

const autoPlan = async () => {
  planning.value = true
  try {
    const res = await axios.post('/api/teacher/scheme/auto-plan', { subject_id: subjectId.value, class_level: level.value })
    toast.success(res.data.message || 'Planned')
    await load()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not plan')
  } finally {
    planning.value = false
  }
}

// A different subject or class (not the first load filling them in)
watch([subjectId, level], (_n, o) => { if (o[0] || o[1]) load() })
onMounted(load)
</script>
