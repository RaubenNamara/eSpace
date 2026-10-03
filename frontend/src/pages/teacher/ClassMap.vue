<template>
  <!-- The class Learning Map: how one class stream is doing on every learning outcome and topic
       competency of a subject, who needs support on each, and every student's progress - so a
       teacher can see what to reteach and to whom. -->
  <div class="w-full">
    <PageHeader title="Class Learning Map" description="How the class is doing on each learning outcome - from returned assessments. See what to reteach, and to whom." icon="map" accent="emerald">
      <!-- Subject, then the class level, then one stream - or all its streams together -->
      <template #filters>
        <PickerDropdown v-if="options.length > 1" v-model="subjectId" label="Subject" :options="options.map(s => ({ value: s.id, label: s.name }))" align="right" />
        <PickerDropdown v-if="levelOptions.length" v-model="level" label="Class" :options="levelOptions" align="right" />
        <PickerDropdown v-if="streamOptions.length" v-model="stream" label="Stream" :options="streamOptions" align="right" />
      </template>
      <StatStrip v-if="data" :items="statItems" />
    </PageHeader>

    <Skeleton v-if="loading" variant="list" :count="4" />
    <EmptyState v-else-if="!options.length" icon="map" tone="emerald" title="No curriculum topics yet" message="Once your subjects have curriculum topics for this year, each class's progress on them shows here." />

    <template v-else-if="data">
      <!-- Nothing marked against outcomes yet: say why the map is empty, and what fills it -->
      <div v-if="!assessedRows" class="mb-5 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-900/15 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <span class="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200 flex items-center justify-center flex-shrink-0">
          <AppIcon name="map" class="w-5 h-5" />
        </span>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-emerald-900 dark:text-emerald-100">This map fills in as you mark</p>
          <p class="text-xs text-emerald-800/80 dark:text-emerald-200/80">Link an assessment to its learning outcomes (in the assessment builder), then return the marked work - each outcome here turns green, amber or red for every student.</p>
        </div>
        <RouterLink to="/teacher/assignments/create" class="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 text-center">New assessment</RouterLink>
      </div>

      <!-- Reteach next: the outcomes with the most students needing help -->
      <section v-if="reteach.length" class="mb-5">
        <h2 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Reteach next</h2>
        <div class="grid gap-3 md:grid-cols-3">
          <div v-for="r in reteach" :key="r.row.key" class="rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-gray-800 p-4 flex flex-col">
            <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400 truncate">{{ r.topic }}</p>
            <p class="mt-0.5 text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">{{ r.row.text }}</p>
            <div class="mt-2 flex h-2 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
              <span v-for="k in KEYS" :key="k" :class="STYLE[k].bar" :style="{ width: `${share(r.row.counts, k)}%` }"></span>
            </div>
            <div class="mt-2.5 flex items-center justify-between gap-2">
              <span class="text-xs font-semibold text-rose-700 dark:text-rose-300">{{ r.row.support.length }} need help</span>
              <button v-if="openGroupFor(r.row)" type="button" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline" @click="view = 'groups'">
                Group open · {{ openGroupFor(r.row)!.counts.revised }}/{{ openGroupFor(r.row)!.counts.members }} revised
              </button>
              <button v-else type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700" @click="supportRow = { row: r.row, topic: r.topic }">Support group</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Legend + view -->
      <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
        <div class="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 max-w-full overflow-x-auto [scrollbar-width:none]">
          <button v-for="tab in (['outcomes', 'students', 'groups'] as const)" :key="tab" type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap" :class="view === tab ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'" @click="view = tab">
            {{ tab === 'outcomes' ? 'By outcome' : tab === 'students' ? `By student (${data.student_count})` : `Support groups${openGroupCount ? ` (${openGroupCount})` : ''}` }}
          </button>
        </div>
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span v-for="k in KEYS" :key="k" class="inline-flex items-center gap-1.5 text-[11px] text-gray-600 dark:text-gray-300"><span class="w-2.5 h-2.5 rounded-sm" :class="STYLE[k].bar"></span>{{ STYLE[k].label }}</span>
        </div>
        <button v-if="view === 'outcomes' && data.topics.length" type="button" class="ml-auto text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:underline" @click="setAllTopics(!allExpanded)">{{ allExpanded ? 'Collapse all' : 'Expand all' }}</button>
      </div>

      <!-- By outcome: one card per topic, folded to a summary line until opened -->
      <template v-if="view === 'outcomes'">
        <EmptyState v-if="!data.topics.length" compact icon="map" tone="gray" title="No topics for this class this year" />
        <div v-for="t in data.topics" :key="t.id" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 mb-3 overflow-hidden">
          <button type="button" class="w-full text-left p-4 flex items-center gap-3" :aria-expanded="isTopicOpen(t)" @click="toggleTopic(t)">
            <div class="min-w-0 flex-1">
              <p class="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 truncate">{{ [t.term_name, t.theme].filter(Boolean).join(' · ') }}</p>
              <p class="text-sm font-bold text-gray-900 dark:text-white">{{ t.topic }}</p>
              <div class="mt-1.5 flex items-center gap-2">
                <span class="flex h-1.5 flex-1 max-w-xs rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <span v-for="k in KEYS" :key="k" :class="STYLE[k].bar" :style="{ width: `${share(topicCounts(t), k)}%` }"></span>
                </span>
                <span class="text-[11px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ topicAssessed(t) }}/{{ rowsFor(t).length }} assessed<template v-if="topicSupport(t)"> · <span class="font-semibold text-rose-600 dark:text-rose-300">{{ topicSupport(t) }} need help</span></template></span>
              </div>
            </div>
            <svg class="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform" :class="{ 'rotate-180': isTopicOpen(t) }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>

          <div v-if="isTopicOpen(t)" class="px-4 pb-2">
            <div v-for="row in rowsFor(t)" :key="row.key" class="border-t border-gray-100 dark:border-gray-700">
              <button type="button" class="w-full text-left py-2.5 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3" :disabled="!row.assessed" @click="toggle(row.key)">
                <span class="flex-1 min-w-0 text-sm leading-snug" :class="row.kind === 'competency' ? 'font-semibold text-violet-800 dark:text-violet-200' : 'text-gray-800 dark:text-gray-100'">
                  <span v-if="row.kind === 'competency'" class="text-[10px] font-bold uppercase tracking-wider mr-1">Competency (AOI) ·</span>{{ row.text }}
                </span>
                <span v-if="!row.assessed" class="flex-shrink-0 text-[11px] text-gray-400 dark:text-gray-500 sm:w-60 sm:text-right">Not assessed yet</span>
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
                <!-- Re-teach: send the students who need help to revise it -->
                <div v-if="row.support.length" class="mt-2.5 flex flex-wrap items-center gap-2">
                  <button type="button" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700" @click="supportRow = { row, topic: t.topic }">
                    <AppIcon name="users" class="w-3.5 h-3.5" />
                    Create support group ({{ row.support.length }})
                  </button>
                  <button v-if="openGroupFor(row)" type="button" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300" @click="view = 'groups'">
                    Support group open · {{ openGroupFor(row)!.counts.revised }}/{{ openGroupFor(row)!.counts.members }} revised
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Support groups -->
      <SupportGroupList v-else-if="view === 'groups'" :groups="classGroups" @changed="loadGroups" />

      <!-- By student -->
      <div v-else class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
        <div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
          <input v-model="search" type="search" placeholder="Search students" class="w-full sm:w-64 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 dark:text-white">
          <!-- Growth, not rank: who is improving most, or achieved most this term -->
          <div class="sm:ml-auto flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-700 self-start max-w-full overflow-x-auto [scrollbar-width:none]">
            <button v-for="o in SORTS" :key="o.key" type="button" class="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap" :class="studentSort === o.key ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-300'" @click="studentSort = o.key">{{ o.label }}</button>
          </div>
        </div>
        <ul class="divide-y divide-gray-100 dark:divide-gray-700">
          <li v-for="s in shownStudents" :key="s.id" class="py-2.5 flex flex-wrap sm:flex-nowrap items-center gap-x-3 gap-y-1.5">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ niceName(s.name) }}</p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ s.admission_number }}<template v-if="stream === 'all'"> · {{ s.class_name }}</template> · {{ s.results }} of {{ data.outcome_count }} outcomes assessed</p>
            </div>
            <span v-if="studentSort !== 'support'" class="flex-shrink-0 w-14 text-right text-xs font-semibold" :class="growthValue(s) === null ? 'text-gray-400 dark:text-gray-500' : growthValue(s)! < 0 ? 'text-rose-700 dark:text-rose-300' : 'text-emerald-700 dark:text-emerald-300'" :title="studentSort === 'improved' ? 'Recent results against earlier ones, in this subject' : 'Learning outcomes achieved this term'">
              {{ growthLabel(s) }}
            </span>
            <button type="button" class="flex-shrink-0 p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-indigo-700 dark:hover:bg-gray-700 dark:hover:text-indigo-300" :title="`${s.name}: what I can do report`" @click="reportFor = s.id">
              <AppIcon name="document" class="w-4 h-4" />
            </button>
            <!-- On a phone the bar takes its own full-width line under the name -->
            <span v-if="!s.results" class="w-full sm:w-44 text-[11px] text-gray-400 dark:text-gray-500 sm:text-right">No results yet</span>
            <span v-else class="w-full sm:w-44 flex items-center gap-2">
              <span class="flex h-2.5 flex-1 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                <span class="bg-emerald-500" :style="{ width: `${s.achieved / s.results * 100}%` }"></span>
                <span class="bg-amber-400" :style="{ width: `${s.developing / s.results * 100}%` }"></span>
                <span class="bg-rose-500" :style="{ width: `${s.needs_support / s.results * 100}%` }"></span>
              </span>
              <span class="text-[11px] w-12 text-right font-semibold" :class="s.needs_support ? 'text-rose-700 dark:text-rose-300' : 'text-emerald-700 dark:text-emerald-300'">{{ s.achieved }}/{{ s.results }}</span>
            </span>
          </li>
        </ul>
        <button v-if="studentRows.length > shownStudents.length" type="button" class="mt-3 w-full py-2 rounded-xl text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30" @click="studentLimit += 40">
          Show more ({{ studentRows.length - shownStudents.length }} left)
        </button>
      </div>
    </template>

    <CompetencyReportDialog v-if="reportFor" :url="`/api/teacher/students/${reportFor}/competency-report`" @close="reportFor = null" />

    <SupportGroupModal
      v-if="supportRow && subjectId"
      :row="supportRow.row"
      :topic="supportRow.topic"
      :subject-id="subjectId"
      @close="supportRow = null"
      @created="supportRow = null; loadGroups()"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import PickerDropdown, { type PickerOption } from '@/components/common/PickerDropdown.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import SupportGroupModal, { type SupportRow } from '@/components/classmap/SupportGroupModal.vue'
import SupportGroupList, { type SupportGroup } from '@/components/classmap/SupportGroupList.vue'
import CompetencyReportDialog from '@/components/learningmap/CompetencyReportDialog.vue'

type Key = 'achieved' | 'developing' | 'needs_support' | 'not_assessed'
interface Summary { assessed: boolean; counts: Record<Key, number>; support: { student_id: number; name: string; percentage: number; status: 'developing' | 'needs_support' }[] }
// ids: every stream's copy of the outcome / topic (the class level's streams each have their own)
interface Topic { id: number; ids: number[]; topic: string; theme: string | null; term_name: string | null; competence: string | null; outcomes: (Summary & { id: number; ids: number[]; text: string })[]; competency: Summary }
interface StudentRow { id: number; name: string; admission_number: string; class_name: string | null; achieved: number; developing: number; needs_support: number; results: number; improvement: number | null; outcomes_term: number }
interface ClassMap { subject: { id: number; name: string }; student_count: number; topics: Topic[]; students: StudentRow[]; outcome_count: number }

const KEYS: Key[] = ['achieved', 'developing', 'needs_support', 'not_assessed']
const STYLE: Record<Key, { label: string; bar: string; chip: string }> = {
  achieved: { label: 'Achieved', bar: 'bg-emerald-500', chip: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200' },
  developing: { label: 'Developing', bar: 'bg-amber-400', chip: 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' },
  needs_support: { label: 'Needs support', bar: 'bg-rose-500', chip: 'bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200' },
  not_assessed: { label: 'Not assessed yet', bar: 'bg-gray-200 dark:bg-gray-600', chip: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200' }
}

interface Level { name: string; streams: { id: number; name: string; stream: string }[] }
const options = ref<{ id: number; name: string; levels: Level[] }[]>([])
const subjectId = ref<number | null>(null)
// The class level (e.g. 'S.1'), and the stream within it - a class id, or 'all' for every stream
const level = ref<string | null>(null)
const stream = ref<number | 'all' | null>(null)
const data = ref<ClassMap | null>(null)
const loading = ref(true)
const view = ref<'outcomes' | 'students' | 'groups'>('outcomes')
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
  { key: `c${t.id}`, kind: 'competency' as const, ids: t.ids, text: t.competence || 'Topic competency', ...t.competency }
]

// ---- Support groups (re-teaching) ----
const groups = ref<SupportGroup[]>([])
const supportRow = ref<{ row: SupportRow; topic: string } | null>(null)
const loadGroups = async () => {
  if (!subjectId.value) return
  try {
    const response = await axios.get('/api/teacher/support-groups', { params: { subject_id: subjectId.value } })
    groups.value = response.data.data.groups || []
  } catch {
    groups.value = []
  }
}
// The groups for the outcomes and competencies of the class on view
const classGroups = computed(() => {
  const outcomeIds = new Set<number>()
  const topicIds = new Set<number>()
  for (const t of data.value?.topics ?? []) {
    t.ids.forEach(id => topicIds.add(id))
    t.outcomes.forEach(o => o.ids.forEach(id => outcomeIds.add(id)))
  }
  return groups.value.filter(g => g.item_ids.some(id => (g.kind === 'outcome' ? outcomeIds : topicIds).has(id)))
})
const openGroupCount = computed(() => classGroups.value.filter(g => g.status === 'open').length)
const openGroupFor = (row: { kind: 'outcome' | 'competency'; ids: number[] }) =>
  classGroups.value.find(g => g.status === 'open' && g.kind === row.kind && g.item_ids.some(id => row.ids.includes(id))) ?? null
const share = (counts: Record<Key, number>, k: Key) => {
  const total = KEYS.reduce((n, key) => n + counts[key], 0)
  return total ? counts[k] / total * 100 : 0
}
const toggle = (key: string) => { open.value = { ...open.value, [key]: !open.value[key] } }

// ---- Topic cards: folded to a summary line; a topic with results starts open ----
const topicOpen = ref<Record<number, boolean>>({})
const topicAssessed = (t: Topic) => rowsFor(t).filter(r => r.assessed).length
const isTopicOpen = (t: Topic) => topicOpen.value[t.id] ?? topicAssessed(t) > 0
const toggleTopic = (t: Topic) => { topicOpen.value = { ...topicOpen.value, [t.id]: !isTopicOpen(t) } }
const allExpanded = computed(() => (data.value?.topics ?? []).every(isTopicOpen))
const setAllTopics = (to: boolean) => { topicOpen.value = Object.fromEntries((data.value?.topics ?? []).map(t => [t.id, to])) }
const topicCounts = (t: Topic) => {
  const total: Record<Key, number> = { achieved: 0, developing: 0, needs_support: 0, not_assessed: 0 }
  for (const row of rowsFor(t)) if (row.assessed) KEYS.forEach(k => { total[k] += row.counts[k] })
  return total
}
// Different students needing help anywhere in the topic
const topicSupport = (t: Topic) => new Set(rowsFor(t).flatMap(r => r.support.map(s => s.student_id))).size

// ---- The class at a glance ----
const allRows = computed(() => (data.value?.topics ?? []).flatMap(t => rowsFor(t).map(row => ({ row, topic: t.topic }))))
const assessedRows = computed(() => allRows.value.filter(x => x.row.assessed).length)
// The outcomes most students need help with - what to reteach first
const reteach = computed(() => allRows.value
  .filter(x => x.row.support.length)
  .sort((a, b) => b.row.support.length - a.row.support.length)
  .slice(0, 3))
const statItems = computed<StatItem[]>(() => {
  let achieved = 0
  let results = 0
  for (const { row } of allRows.value) {
    if (!row.assessed) continue
    achieved += row.counts.achieved
    results += row.counts.achieved + row.counts.developing + row.counts.needs_support
  }
  const behind = (data.value?.students ?? []).filter(s => s.needs_support > 0).length
  return [
    { label: 'Achieved', value: results ? `${Math.round((achieved / results) * 100)}%` : '–', tone: 'emerald', hint: 'of results on outcomes' },
    { label: 'Outcomes assessed', value: `${assessedRows.value}/${allRows.value.length}`, tone: 'sky' },
    { label: 'Need support', value: behind, tone: 'rose', hint: behind === 1 ? 'student' : 'students' },
    { label: 'Support groups', value: openGroupCount.value, tone: 'violet', hint: 'open' }
  ]
})

// Who's furthest behind first - or growth: most improved, most outcomes achieved this term
const SORTS = [
  { key: 'support' as const, label: 'Needs support' },
  { key: 'improved' as const, label: 'Most improved' },
  { key: 'term' as const, label: 'Outcomes this term' }
]
const studentSort = ref<'support' | 'improved' | 'term'>('support')
// The student whose "what I can do" report is open
const reportFor = ref<number | null>(null)
const growthValue = (s: StudentRow) => (studentSort.value === 'improved' ? s.improvement : s.outcomes_term || null)
const growthLabel = (s: StudentRow) => {
  const v = growthValue(s)
  if (v === null) return '–'
  return studentSort.value === 'improved' ? `${v > 0 ? '+' : ''}${v}%` : `${v}`
}
// Long classes show 40 at a time
const studentLimit = ref(40)
watch(search, () => { studentLimit.value = 40 })
const shownStudents = computed(() => studentRows.value.slice(0, studentLimit.value))
const studentRows = computed(() => {
  const q = search.value.trim().toLowerCase()
  const rows = [...(data.value?.students ?? [])]
    .filter(s => !q || s.name.toLowerCase().includes(q) || s.admission_number.toLowerCase().includes(q))
  if (studentSort.value !== 'support') {
    return rows.sort((a, b) => (growthValue(b) ?? -Infinity) - (growthValue(a) ?? -Infinity) || a.name.localeCompare(b.name))
  }
  return rows.sort((a, b) => b.needs_support - a.needs_support || (a.results ? a.achieved / a.results : 1) - (b.results ? b.achieved / b.results : 1) || a.name.localeCompare(b.name))
})

const load = async () => {
  if (!subjectId.value || !level.value || stream.value === null) return
  loading.value = true
  open.value = {}
  topicOpen.value = {}
  studentLimit.value = 40
  // Remembered, so the page reopens on this class
  try { localStorage.setItem('classmap:last', JSON.stringify({ subject: subjectId.value, level: level.value, stream: stream.value })) } catch { /* private mode */ }
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

// A link can open a given class: ?subject=<id>&level=S.1&stream=<class id | all> (e.g. the
// dashboard's class cards)
const route = useRoute()
// Without a link, the last class looked at
const last = (() => {
  try { return JSON.parse(localStorage.getItem('classmap:last') || 'null') as { subject?: number; level?: string; stream?: number | 'all' } | null } catch { return null }
})()
const fromLink = !!route.query.subject || !!route.query.level
const wanted = {
  level: typeof route.query.level === 'string' ? route.query.level : (!fromLink && last?.level) || null,
  stream: route.query.stream === 'all' ? 'all' as const : Number(route.query.stream) || (!fromLink && last?.stream) || null
}
const firstStream = () => {
  const w = wanted.stream
  wanted.stream = null
  return w !== null && streamOptions.value.some(o => o.value === w) ? w : streamOptions.value[0]?.value ?? null
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/teacher/class-map/options')
    options.value = response.data.data.subjects || []
    const wantedSubject = Number(route.query.subject) || (!fromLink && last?.subject) || 0
    subjectId.value = options.value.find(s => s.id === wantedSubject)?.id ?? options.value[0]?.id ?? null
  } finally {
    if (!options.value.length) loading.value = false
  }
})
// A new subject keeps the class level when it has it (else its first); a new level starts on its
// first stream
watch(subjectId, () => {
  loadGroups()
  const w = wanted.level
  wanted.level = null
  if (w && levels.value.some(l => l.name === w) && w !== level.value) level.value = w
  else if (!levels.value.some(l => l.name === level.value)) level.value = levels.value[0]?.name ?? null
  else stream.value = firstStream()
})
watch(level, () => { stream.value = firstStream() })
watch(stream, load)
</script>
