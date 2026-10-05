<template>
  <!-- Early warning: learners who may be slipping - low results, falling results, gone quiet,
       or missing deadlines - so a teacher can reach out before the report card shows it.
       Teachers see their own classes; HODs (same page under /hod) see the whole department. -->
  <div class="w-full">
    <PageHeader title="Early warning" :description="isHod ? 'Learners in your department who may be slipping - before the end-of-term report shows it.' : 'Learners in your classes who may be slipping - reach out before the report card shows it.'" icon="warning" accent="rose" :active-filters="classId ? 1 : 0">
      <StatStrip v-if="summary" v-model="filter" :items="statItems" />
      <template #filters>
        <select v-if="classes.length > 1" v-model.number="classId" class="w-full sm:w-56 py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" aria-label="Class">
          <option :value="0">All classes</option>
          <option v-for="c in classes" :key="c.id" :value="c.id">{{ c.label }}</option>
        </select>
        <div class="relative w-full sm:w-64">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="search" type="search" placeholder="Search learners" class="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
        </div>
      </template>
    </PageHeader>

    <Skeleton v-if="loading" variant="list" :count="5" />
    <EmptyState v-else-if="!classes.length" icon="users" tone="gray" title="No classes yet" :message="isHod ? 'When learners are enrolled in your department, they show up here.' : 'Classes you set assessments or eNotes for show up here.'" />
    <EmptyState v-else-if="!students.length" icon="check-circle" tone="emerald" title="No one needs a nudge right now" message="Nobody in these classes has low or falling results, has gone quiet, or is missing deadlines." />
    <EmptyState v-else-if="!shown.length" compact icon="users" title="No learners match" message="Try another filter or search." />

    <template v-else>
      <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">{{ listNote }}</p>
      <ul class="space-y-2.5">
        <li v-for="s in visible" :key="s.id" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <span class="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-bold" :class="s.needs_teacher ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'">{{ initials(s.name) }}</span>
            <div class="min-w-0 flex-1">
              <p class="font-semibold text-gray-900 dark:text-white truncate">{{ niceName(s.name) }} <span class="font-normal text-sm text-gray-500 dark:text-gray-400">· {{ s.class_label }}</span></p>
              <p class="mt-1 flex flex-wrap gap-1.5">
                <span v-for="g in s.signals" :key="g.key" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="SIGNAL[g.key].chip">
                  <AppIcon :name="SIGNAL[g.key].icon" class="w-3 h-3" />{{ g.text }}
                </span>
              </p>
              <p v-if="s.missed.length" class="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">Missed: {{ s.missed.join(', ') }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 sm:flex-shrink-0">
            <span v-if="s.average !== null" class="px-2.5 py-1 rounded-lg text-sm font-bold tabular-nums" :class="s.average < 50 ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'" title="Average on returned LOA and AOI results">{{ Math.round(s.average) }}%</span>
            <RouterLink v-if="!isHod" :to="`/teacher/chat?student=${s.id}`" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
              <AppIcon name="chat" class="w-4 h-4" />Message
            </RouterLink>
          </div>
        </li>
      </ul>
      <div v-if="visible.length < shown.length" class="mt-4 text-center">
        <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="limit += 50">Show more ({{ shown.length - visible.length }} left)</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { initials, niceName } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'

type SignalKey = 'low' | 'falling' | 'quiet' | 'missed' | 'never'
interface Flagged {
  id: number
  name: string
  class_id: number
  class_label: string
  average: number | null
  improvement: number | null
  missed: string[]
  signals: { key: SignalKey; text: string }[]
  needs_teacher: boolean
}

const SIGNAL: Record<SignalKey, { label: string; icon: string; chip: string; tone: StatItem['tone']; hint: string }> = {
  low: { label: 'Low results', icon: 'chart', chip: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200', tone: 'rose', hint: 'Average under 50%' },
  falling: { label: 'Falling', icon: 'trend', chip: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200', tone: 'amber', hint: '10+ points down this term' },
  missed: { label: 'Missing work', icon: 'clock', chip: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-200', tone: 'violet', hint: '2+ deadlines in 30 days' },
  quiet: { label: 'Gone quiet', icon: 'hourglass', chip: 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-200', tone: 'sky', hint: 'Not signed in for 14 days' },
  never: { label: 'Never signed in', icon: 'users', chip: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', tone: 'gray', hint: 'Hand out their login' }
}

const route = useRoute()
const toast = useToastStore()
const isHod = computed(() => route.path.startsWith('/hod'))
const base = computed(() => (isHod.value ? '/hod' : '/teacher'))

const loading = ref(true)
const students = ref<Flagged[]>([])
const classes = ref<{ id: number; label: string }[]>([])
const summary = ref<Record<string, number> | null>(null)
const classId = ref(0)
const search = ref('')
const filter = ref<string | null>(null)
const limit = ref(50)

const statItems = computed<StatItem[]>(() => {
  const s = summary.value ?? {}
  return [
    { label: 'Need attention', value: s.flagged ?? 0, key: 'attention', tone: 'indigo', hint: `of ${s.total ?? 0} learners` },
    ...(['low', 'falling', 'missed', 'quiet', 'never'] as SignalKey[]).map(k => ({ label: SIGNAL[k].label, value: s[k] ?? 0, key: k, tone: SIGNAL[k].tone, hint: SIGNAL[k].hint }))
  ]
})

const shown = computed(() => {
  const q = search.value.trim().toLowerCase()
  return students.value.filter(s => {
    // By default, the learners who need a teacher; "never signed in" only when asked for
    if (!filter.value || filter.value === 'attention') { if (!s.needs_teacher) return false }
    else if (!s.signals.some(g => g.key === filter.value)) return false
    return !q || s.name.toLowerCase().includes(q)
  })
})
const visible = computed(() => shown.value.slice(0, limit.value))
const listNote = computed(() => {
  const n = shown.value.length
  if (filter.value === 'never') return `${n} ${n === 1 ? 'learner has' : 'learners have'} never signed in - make sure they have their login.`
  return `${n} ${n === 1 ? 'learner' : 'learners'}, most signals first.`
})

const load = async () => {
  loading.value = true
  try {
    const res = await axios.get(`/api${base.value}/early-warning`, { params: classId.value ? { class_id: classId.value } : {} })
    const d = res.data.data
    students.value = d.students || []
    if (!classId.value) classes.value = d.classes || []
    summary.value = d.summary
    limit.value = 50
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load the early-warning list')
  } finally {
    loading.value = false
  }
}

watch(classId, load)
watch([filter, search], () => { limit.value = 50 })
onMounted(load)
</script>
