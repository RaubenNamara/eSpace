<template>
  <!-- Curriculum coverage: for every topic this year in the teacher's subjects, what's linked to it -
       outcomes with an assessment, the Activity of Integration, Elements of Construct with an End of
       Chapter, eNotes and Item Bank practice - and the assessments that need fixing. It's what makes
       students' Learning Maps fill in. -->
  <div class="w-full">
    <PageHeader title="Curriculum coverage" description="What's linked to each topic this year - students' Learning Maps only fill in where an assessment is linked." icon="chart" accent="emerald">
      <!-- One class at a time (or all of them), in the chosen subject -->
      <template #filters>
        <PickerDropdown v-if="data && data.subjects.length > 1" v-model="subjectId" label="Subject" :options="subjectOptions" align="right" />
        <PickerDropdown v-if="data && data.classes.length" v-model="classFilter" label="Class" :options="classOptions" align="right" />
      </template>
      <StatStrip v-if="summary.topics" :items="statItems" />
    </PageHeader>

    <Skeleton v-if="loading" variant="list" :count="4" />

    <template v-else-if="data">
      <!-- Needs fixing: linked to deleted topics -->
      <div v-if="data.broken.length" class="bg-white dark:bg-gray-800 rounded-2xl border border-rose-200 dark:border-rose-800 p-4 mb-4">
        <p class="flex items-center gap-2 text-sm font-bold text-rose-700 dark:text-rose-300 mb-1"><AppIcon name="warning" class="w-4 h-4" /> Assessments linked to deleted topics ({{ data.broken.length }})</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">These topics were removed from the curriculum, so students' results on them don't show anywhere. Move each to the current topic.</p>
        <ul class="space-y-3">
          <li v-for="b in data.broken" :key="`${b.assignment_id}-${b.topic_id}`" class="rounded-xl bg-rose-50/60 dark:bg-rose-900/10 p-3">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ b.title }} <span class="font-normal text-gray-500 dark:text-gray-400">· {{ b.category || 'Assessment' }} · {{ b.subject_name }} {{ b.class_name }}</span></p>
            <p class="text-xs text-gray-600 dark:text-gray-300 mb-2">Linked to "<span class="line-through">{{ b.topic }}</span>" (deleted)</p>
            <div v-if="b.suggestions.length" class="flex flex-wrap items-center gap-2">
              <span class="text-xs text-gray-500 dark:text-gray-400">Move to:</span>
              <button
                v-for="s in b.suggestions"
                :key="s.id"
                type="button"
                :disabled="busy"
                class="px-2.5 py-1 rounded-lg text-xs font-semibold border border-emerald-300 bg-white text-emerald-800 hover:bg-emerald-50 disabled:opacity-50 dark:bg-gray-800 dark:text-emerald-200 dark:border-emerald-700"
                @click="relink(b, s.id)"
              >{{ s.topic }}<span v-if="s.term_name" class="font-normal text-gray-500"> · {{ s.term_name }}</span></button>
            </div>
            <p v-else class="text-xs text-gray-500 dark:text-gray-400">No similar current topic - <RouterLink :to="`/teacher/assignments/${b.assignment_id}/edit`" class="font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">choose one in the assessment</RouterLink>.</p>
          </li>
        </ul>
      </div>

      <!-- Needs linking: curriculum-type assessments with no links -->
      <div v-if="data.unlinked.length" class="bg-white dark:bg-gray-800 rounded-2xl border border-amber-200 dark:border-amber-800 p-4 mb-4">
        <p class="text-sm font-bold text-amber-800 dark:text-amber-200 mb-1">Not linked to the curriculum ({{ data.unlinked.length }})</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Link these to their outcomes or topics so students' results count.</p>
        <div class="flex flex-wrap gap-2">
          <RouterLink v-for="u in data.unlinked" :key="u.id" :to="`/teacher/assignments/${u.id}/edit`" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-100 dark:border-amber-800">
            {{ u.category }} · {{ u.title }}
          </RouterLink>
        </div>
      </div>

      <EmptyState v-if="!data.classes.length" icon="chart" tone="emerald" title="No curriculum topics this year" message="Once this subject has curriculum topics for the year, what's linked to each shows here." />

      <template v-else>
        <div class="flex items-center gap-3 mb-3">
          <label class="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer select-none">
            <input v-model="gapsOnly" type="checkbox" class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500">
            Only topics with gaps
          </label>
          <span class="ml-auto hidden sm:flex items-center gap-3 text-[11px] text-gray-500 dark:text-gray-400">
            <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-emerald-400"></span>All linked</span>
            <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-amber-400"></span>Some</span>
            <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-rose-400"></span>Missing</span>
          </span>
        </div>

        <!-- Per class, per topic: one row each, four status chips -->
        <section v-for="cls in shownClasses" :key="cls.class_name" class="mb-5">
          <div class="flex items-center gap-3 mb-2">
            <h2 class="text-sm font-bold text-gray-900 dark:text-white">{{ cls.class_name }}</h2>
            <span class="flex-1 max-w-[10rem] h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <span class="block h-full rounded-full bg-emerald-500" :style="{ width: classOutcomeShare(cls.topics) + '%' }"></span>
            </span>
            <span class="text-[11px] text-gray-500 dark:text-gray-400">{{ classOutcomeShare(cls.topics) }}% of outcomes linked</span>
          </div>
          <EmptyState v-if="!visibleTopics(cls.topics).length" compact icon="check-circle" tone="emerald" title="No gaps in this class" message="Every topic has its outcomes, AOI, EOCs and eNotes linked." />
          <ul v-else class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
            <li v-for="t in visibleTopics(cls.topics)" :key="t.id" class="p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center gap-2.5 lg:gap-4">
              <div class="min-w-0 lg:w-[32%] flex-shrink-0">
                <p class="text-[10px] font-semibold uppercase tracking-wider text-gray-400 truncate">{{ [t.term_name, t.theme].filter(Boolean).join(' · ') }}</p>
                <p class="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{{ t.topic }}</p>
              </div>
              <div class="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <!-- Outcomes with an assessment -->
                <div class="rounded-xl px-2.5 py-2" :class="chipTone(t.outcomes ? t.outcomes_covered / t.outcomes : 1)">
                  <p class="text-[10px] font-bold uppercase tracking-wider opacity-70">Outcomes · LOA</p>
                  <div class="flex items-center gap-2">
                    <span class="flex-1 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden"><span class="block h-full rounded-full bg-current" :style="{ width: `${t.outcomes ? t.outcomes_covered / t.outcomes * 100 : 0}%` }"></span></span>
                    <span class="text-xs font-bold tabular-nums">{{ t.outcomes_covered }}/{{ t.outcomes }}</span>
                  </div>
                </div>
                <!-- Activity of Integration -->
                <div class="rounded-xl px-2.5 py-2 min-w-0" :class="chipTone(t.aoi.length ? 1 : 0)">
                  <p class="text-[10px] font-bold uppercase tracking-wider opacity-70">AOI</p>
                  <p v-if="t.aoi.length" class="flex items-center gap-1 text-xs font-semibold truncate" :title="t.aoi.map(a => a.title).join(', ')"><AppIcon name="check-circle" class="w-3.5 h-3.5 flex-shrink-0" />{{ t.aoi.length === 1 ? t.aoi[0].title : `${t.aoi.length} set` }}</p>
                  <button v-else type="button" class="inline-flex items-center gap-1 text-xs font-semibold hover:underline" @click="aoiFor = { topic: t, className: cls.class_name }">
                    <AppIcon name="bulb" class="w-3.5 h-3.5" /> Suggest one
                  </button>
                </div>
                <!-- Elements of Construct with an End of Chapter -->
                <div class="rounded-xl px-2.5 py-2 min-w-0" :class="t.constructs.length ? chipTone(t.constructs.filter(c => c.has_eoc).length / t.constructs.length) : NEUTRAL">
                  <p class="text-[10px] font-bold uppercase tracking-wider opacity-70">Construct · EOC</p>
                  <p v-if="!t.constructs.length" class="text-xs">None in this topic</p>
                  <p v-else class="text-xs font-semibold truncate" :title="t.constructs.map(c => `${c.assessment_objective}: ${c.has_eoc ? 'EOC set' : 'no EOC'}`).join('\n')">
                    {{ t.constructs.filter(c => c.has_eoc).length }}/{{ t.constructs.length }} with an EOC
                  </p>
                </div>
                <!-- Notes and practice -->
                <div class="rounded-xl px-2.5 py-2 min-w-0" :class="chipTone(t.enotes.length ? 1 : 0)">
                  <p class="text-[10px] font-bold uppercase tracking-wider opacity-70">eNotes · practice</p>
                  <p class="text-xs font-semibold truncate">
                    <template v-if="t.enotes.length">{{ t.enotes.length }} eNote{{ t.enotes.length === 1 ? '' : 's' }}</template>
                    <RouterLink v-else to="/teacher/enotes" class="hover:underline">Write eNotes</RouterLink>
                    <span class="font-normal opacity-80"> · {{ t.practice ? `${t.practice} practice` : 'no practice' }}</span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </template>
    </template>
    <AoiQuickCreate
      v-if="aoiFor && subjectId"
      :topic-ids="aoiFor.topic.ids"
      :topic-name="aoiFor.topic.topic"
      :subject-id="subjectId"
      :class-label="aoiFor.className"
      :academic-year="aoiFor.topic.academic_year || ''"
      :term-id="aoiFor.topic.term_id"
      @close="aoiFor = null"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import { usePersistedRef } from '@/composables/usePersistedRef'
import PickerDropdown, { type PickerOption } from '@/components/common/PickerDropdown.vue'
import { useToastStore } from '@/stores/toast'
import AoiQuickCreate from '@/components/assignment/AoiQuickCreate.vue'

interface Topic {
  id: number
  topic: string
  theme: string | null
  term_name: string | null
  outcomes: number
  outcomes_covered: number
  aoi: { id: number; title: string }[]
  constructs: { id: number; name: string; assessment_objective: string; has_eoc: boolean }[]
  enotes: { id: number; title: string; status: string }[]
  practice: number
  // Every stream's copy of the topic, its term and year - for drafting an AOI for the class level
  ids: number[]
  term_id: number | null
  academic_year: string | null
}
interface Broken {
  assignment_id: number
  title: string
  category: string | null
  topic_id: number
  topic: string
  class_name: string | null
  subject_name: string | null
  suggestions: { id: number; topic: string; term_name: string | null; match: number }[]
}
interface Coverage {
  subjects: { id: number; name: string; code: string | null }[]
  subject_id: number | null
  classes: { class_name: string; topics: Topic[] }[]
  broken: Broken[]
  unlinked: { id: number; title: string; category: string; subject_name: string | null }[]
}

const toast = useToastStore()
const data = ref<Coverage | null>(null)
const loading = ref(true)
const busy = ref(false)
const subjectId = ref<number | null>(null)
// The topic an AOI is being drafted for (Suggest an AOI)
const aoiFor = ref<{ topic: Topic; className: string } | null>(null)

const load = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/teacher/coverage', { params: subjectId.value ? { subject_id: subjectId.value } : {} })
    data.value = response.data.data
    subjectId.value = response.data.data.subject_id
  } catch {
    toast.error('Could not load coverage')
  } finally {
    loading.value = false
  }
}
onMounted(load)
watch(subjectId, (now, before) => { if (before !== null && now !== before) load() })

// Which class is shown - one at a time by default, or every class with 'all'
const classFilter = usePersistedRef<string>('coverage:class', '')
// Hide the topics that already have everything linked
const gapsOnly = usePersistedRef<boolean>('coverage:gaps-only', false)
const hasGap = (t: Topic) => t.outcomes_covered < t.outcomes || !t.aoi.length || t.constructs.some(c => !c.has_eoc) || !t.enotes.length
const visibleTopics = (topics: Topic[]) => (gapsOnly.value ? topics.filter(hasGap) : topics)

// Status chip colour: all linked, some, none
const NEUTRAL = 'bg-gray-50 text-gray-500 dark:bg-gray-700/40 dark:text-gray-400'
const chipTone = (share: number) => share >= 1
  ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/25 dark:text-emerald-200'
  : share > 0 ? 'bg-amber-50 text-amber-800 dark:bg-amber-900/25 dark:text-amber-200' : 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-200'
const subjectOptions = computed<PickerOption<number>[]>(() => (data.value?.subjects ?? []).map(s => ({ value: s.id, label: s.name })))
const classOutcomeShare = (topics: Topic[]) => {
  const total = topics.reduce((n, t) => n + t.outcomes, 0)
  return total ? Math.round(topics.reduce((n, t) => n + t.outcomes_covered, 0) / total * 100) : 0
}
const classOptions = computed<PickerOption<string>[]>(() => {
  const classes = data.value?.classes ?? []
  return [
    ...classes.map(c => {
      const share = classOutcomeShare(c.topics)
      return { value: c.class_name, label: c.class_name, hint: `${c.topics.length} topics · ${share}% linked`, hintClass: share ? 'text-emerald-600 dark:text-emerald-400' : undefined }
    }),
    { value: 'all', label: 'All classes', hint: `${classes.reduce((n, c) => n + c.topics.length, 0)} topics` }
  ]
})
const shownClasses = computed(() => {
  const classes = data.value?.classes ?? []
  return classFilter.value === 'all' ? classes : classes.filter(c => c.class_name === classFilter.value)
})
// A new subject starts on its first class (keeping the choice when that class exists in it too)
watch(() => data.value?.classes, (classes) => {
  if (!classes?.length) return
  if (classFilter.value !== 'all' && !classes.some(c => c.class_name === classFilter.value)) classFilter.value = classes[0].class_name
})

// The summary follows what's shown
const summary = computed(() => {
  const topics = shownClasses.value.flatMap(c => c.topics)
  const outcomes = topics.reduce((n, t) => n + t.outcomes, 0)
  const covered = topics.reduce((n, t) => n + t.outcomes_covered, 0)
  const constructs = new Map<number, boolean>()
  topics.forEach(t => t.constructs.forEach(c => constructs.set(c.id, c.has_eoc)))
  return {
    topics: topics.length,
    outcomes, covered,
    aoi: topics.filter(t => t.aoi.length).length,
    constructs: constructs.size,
    constructsEoc: [...constructs.values()].filter(Boolean).length,
    notes: topics.filter(t => t.enotes.length).length
  }
})
const pct = (a: number, b: number) => (b ? Math.round(a / b * 100) : 0)
const statItems = computed<StatItem[]>(() => [
  { label: 'Outcomes assessed', value: `${pct(summary.value.covered, summary.value.outcomes)}%`, tone: 'emerald', hint: `${summary.value.covered} of ${summary.value.outcomes}` },
  { label: 'Topics with an AOI', value: `${pct(summary.value.aoi, summary.value.topics)}%`, tone: 'violet', hint: `${summary.value.aoi} of ${summary.value.topics}` },
  // Only where the topics have Elements of Construct at all
  ...(summary.value.constructs ? [{ label: 'Constructs with an EOC', value: `${pct(summary.value.constructsEoc, summary.value.constructs)}%`, tone: 'amber' as const, hint: `${summary.value.constructsEoc} of ${summary.value.constructs}` }] : []),
  { label: 'Topics with eNotes', value: `${pct(summary.value.notes, summary.value.topics)}%`, tone: 'sky', hint: `${summary.value.notes} of ${summary.value.topics}` }
])

const relink = async (b: Broken, toTopicId: number) => {
  busy.value = true
  try {
    const response = await axios.post('/api/teacher/coverage/relink', { assignment_id: b.assignment_id, from_topic_id: b.topic_id, to_topic_id: toTopicId })
    toast.success(response.data.message || 'Re-linked')
    await load()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not re-link')
  } finally {
    busy.value = false
  }
}
</script>
