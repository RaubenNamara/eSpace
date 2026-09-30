<template>
  <!-- Curriculum coverage: for every topic this year in the teacher's subjects, what's linked to it -
       outcomes with an assessment, the Activity of Integration, Elements of Construct with an End of
       Chapter, eNotes and Item Bank practice - and the assessments that need fixing. It's what makes
       students' Learning Maps fill in. -->
  <div class="w-full">
    <div class="flex flex-wrap items-center gap-2 mb-1">
      <div class="hidden sm:flex w-7 h-7 rounded-lg bg-emerald-600 items-center justify-center flex-shrink-0">
        <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
      </div>
      <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mr-auto">Curriculum coverage</h1>
      <!-- One class at a time (or all of them), in the chosen subject -->
      <div class="flex flex-wrap gap-2 w-full sm:w-auto">
        <PickerDropdown class="flex-1 sm:flex-none" v-if="data && data.subjects.length > 1" v-model="subjectId" label="Subject" :options="subjectOptions" align="right" />
        <PickerDropdown class="flex-1 sm:flex-none" v-if="data && data.classes.length" v-model="classFilter" label="Class" :options="classOptions" align="right" />
      </div>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">What's linked to each topic this year. Students' Learning Maps only fill in for outcomes, topics and constructs that have an assessment linked.</p>

    <div v-if="loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="h-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
    </div>

    <template v-else-if="data">
      <!-- Needs fixing: linked to deleted topics -->
      <div v-if="data.broken.length" class="bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-800 p-4 mb-4">
        <p class="text-sm font-bold text-red-700 dark:text-red-300 mb-1">Assessments linked to deleted topics ({{ data.broken.length }})</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">These topics were removed from the curriculum, so students' results on them don't show anywhere. Move each to the current topic.</p>
        <ul class="space-y-3">
          <li v-for="b in data.broken" :key="`${b.assignment_id}-${b.topic_id}`" class="rounded-lg bg-red-50/60 dark:bg-red-900/10 p-3">
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
            <p v-else class="text-xs text-gray-500 dark:text-gray-400">No similar current topic - <RouterLink :to="`/teacher/assignments/${b.assignment_id}/edit`" class="font-semibold text-indigo-600 hover:underline">choose one in the assessment</RouterLink>.</p>
          </li>
        </ul>
      </div>

      <!-- Needs linking: curriculum-type assessments with no links -->
      <div v-if="data.unlinked.length" class="bg-white dark:bg-gray-800 rounded-xl border border-amber-200 dark:border-amber-800 p-4 mb-4">
        <p class="text-sm font-bold text-amber-800 dark:text-amber-200 mb-1">Not linked to the curriculum ({{ data.unlinked.length }})</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Link these to their outcomes or topics so students' results count.</p>
        <div class="flex flex-wrap gap-2">
          <RouterLink v-for="u in data.unlinked" :key="u.id" :to="`/teacher/assignments/${u.id}/edit`" class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-100 dark:border-amber-800">
            {{ u.category }} · {{ u.title }}
          </RouterLink>
        </div>
      </div>

      <!-- Summary for the subject -->
      <div v-if="summary.topics" class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div v-for="card in summaryCards" :key="card.label" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
          <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ card.label }}</p>
          <p class="text-xl font-bold text-gray-900 dark:text-white"><CountUp :value="`${card.percent}%`" /></p>
          <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ card.detail }}</p>
        </div>
      </div>

      <p v-if="!data.classes.length" class="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">No curriculum topics this year for this subject.</p>

      <!-- Per class, per topic -->
      <div v-for="cls in shownClasses" :key="cls.class_name" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <p class="text-sm font-bold text-gray-900 dark:text-white mb-2">{{ cls.class_name }}</p>
        <!-- Phones: each topic as a small card (the table's five columns don't fit) -->
        <div class="sm:hidden divide-y divide-gray-100 dark:divide-gray-700">
          <div v-for="t in cls.topics" :key="t.id" class="py-3">
            <p class="font-semibold text-sm text-gray-900 dark:text-white leading-snug">{{ t.topic }}</p>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-2">{{ [t.term_name, t.theme].filter(Boolean).join(' · ') }}</p>
            <div class="grid grid-cols-2 gap-x-3 gap-y-2">
              <div>
                <p class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">Outcomes (LOA)</p>
                <div class="flex items-center gap-2">
                  <div class="h-1.5 flex-1 max-w-[4rem] rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <div class="h-full rounded-full bg-emerald-500" :style="{ width: `${t.outcomes ? t.outcomes_covered / t.outcomes * 100 : 0}%` }"></div>
                  </div>
                  <span class="text-xs" :class="t.outcomes && t.outcomes_covered === t.outcomes ? 'text-emerald-700 dark:text-emerald-300 font-semibold' : 'text-gray-600 dark:text-gray-300'">{{ t.outcomes_covered }}/{{ t.outcomes }}</span>
                </div>
              </div>
              <div class="min-w-0">
                <p class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">AOI</p>
                <p v-if="t.aoi.length" class="text-xs font-semibold text-emerald-700 dark:text-emerald-300 truncate">✓ {{ t.aoi.length === 1 ? t.aoi[0].title : `${t.aoi.length} set` }}</p>
                <template v-else>
                  <p class="text-xs font-semibold text-amber-700 dark:text-amber-300">Missing</p>
                  <button type="button" class="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-violet-700 dark:text-violet-300 hover:underline" @click="aoiFor = { topic: t, className: cls.class_name }">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                  Suggest an AOI
                </button>
                </template>
              </div>
              <div class="min-w-0">
                <p class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">Construct (EOC)</p>
                <p v-if="!t.constructs.length" class="text-xs text-gray-400 dark:text-gray-500">-</p>
                <p v-for="c in t.constructs" :key="c.id" class="text-xs leading-snug">
                  <span class="font-semibold text-gray-700 dark:text-gray-200">{{ c.assessment_objective }}</span>
                  <span :class="c.has_eoc ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'"> {{ c.has_eoc ? '✓ EOC' : 'no EOC' }}</span>
                </p>
              </div>
              <div class="text-xs">
                <p class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">Notes · practice</p>
                <p :class="t.enotes.length ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'">{{ t.enotes.length ? `${t.enotes.length} eNote${t.enotes.length === 1 ? '' : 's'}` : 'No eNotes' }}</p>
                <p :class="t.practice ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'">{{ t.practice ? `${t.practice} practice` : 'No practice' }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden sm:block overflow-x-auto -mx-1">
          <table class="w-full text-sm min-w-[640px] table-fixed">
            <colgroup><col class="w-[34%]"><col class="w-[16%]"><col class="w-[18%]"><col class="w-[14%]"><col class="w-[18%]"></colgroup>
            <thead>
              <tr class="text-left text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <th class="px-1 py-1.5 font-semibold">Topic</th>
                <th class="px-1 py-1.5 font-semibold">Outcomes (LOA)</th>
                <th class="px-1 py-1.5 font-semibold">Activity of Integration</th>
                <th class="px-1 py-1.5 font-semibold">Construct (EOC)</th>
                <th class="px-1 py-1.5 font-semibold">Notes · practice</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-for="t in cls.topics" :key="t.id" class="align-top">
                <td class="px-1 py-2">
                  <p class="font-semibold text-gray-900 dark:text-white leading-snug">{{ t.topic }}</p>
                  <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ [t.term_name, t.theme].filter(Boolean).join(' · ') }}</p>
                </td>
                <td class="px-1 py-2">
                  <div class="flex items-center gap-2">
                    <div class="h-1.5 w-14 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      <div class="h-full rounded-full bg-emerald-500" :style="{ width: `${t.outcomes ? t.outcomes_covered / t.outcomes * 100 : 0}%` }"></div>
                    </div>
                    <span class="text-xs" :class="t.outcomes && t.outcomes_covered === t.outcomes ? 'text-emerald-700 dark:text-emerald-300 font-semibold' : 'text-gray-600 dark:text-gray-300'">{{ t.outcomes_covered }}/{{ t.outcomes }}</span>
                  </div>
                </td>
                <td class="px-1 py-2">
                  <span v-if="t.aoi.length" class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">✓ {{ t.aoi.length === 1 ? t.aoi[0].title : `${t.aoi.length} set` }}</span>
                  <template v-else>
                    <span class="block text-xs font-semibold text-amber-700 dark:text-amber-300">Missing</span>
                    <button type="button" class="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-violet-700 dark:text-violet-300 hover:underline" @click="aoiFor = { topic: t, className: cls.class_name }">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                  Suggest an AOI
                </button>
                  </template>
                </td>
                <td class="px-1 py-2">
                  <span v-if="!t.constructs.length" class="text-xs text-gray-400 dark:text-gray-500">-</span>
                  <p v-for="c in t.constructs" :key="c.id" class="text-xs leading-snug">
                    <span class="font-semibold text-gray-700 dark:text-gray-200">{{ c.assessment_objective }}</span>
                    <span :class="c.has_eoc ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'"> {{ c.has_eoc ? '✓ EOC' : 'no EOC' }}</span>
                  </p>
                </td>
                <td class="px-1 py-2 text-xs">
                  <p :class="t.enotes.length ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'">{{ t.enotes.length ? `${t.enotes.length} eNote${t.enotes.length === 1 ? '' : 's'}` : 'No eNotes linked' }}</p>
                  <p :class="t.practice ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'">{{ t.practice ? `${t.practice} practice` : 'No practice' }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
import CountUp from '@/components/common/CountUp.vue'
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
const classFilter = ref<string>('')
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
const summaryCards = computed(() => [
  { label: 'Outcomes with an assessment', percent: pct(summary.value.covered, summary.value.outcomes), detail: `${summary.value.covered} of ${summary.value.outcomes}` },
  { label: 'Topics with an AOI', percent: pct(summary.value.aoi, summary.value.topics), detail: `${summary.value.aoi} of ${summary.value.topics}` },
  { label: 'Constructs with an EOC', percent: pct(summary.value.constructsEoc, summary.value.constructs), detail: `${summary.value.constructsEoc} of ${summary.value.constructs}` },
  { label: 'Topics with eNotes', percent: pct(summary.value.notes, summary.value.topics), detail: `${summary.value.notes} of ${summary.value.topics}` }
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
