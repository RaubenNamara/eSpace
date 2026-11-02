<template>
  <div class="w-full">
    <!-- One kind opened on its own (Show more): its name, and Go back top right -->
    <div v-if="focusCard" class="mb-4 sm:mb-6 flex items-start gap-3">
      <span class="hidden sm:flex w-10 h-10 flex-shrink-0 rounded-xl items-center justify-center text-white shadow-md" :class="[CARD_LOOK[focusCard.key].solid, CARD_LOOK[focusCard.key].glow]">
        <AppIcon :name="CARD_LOOK[focusCard.key].icon" class="w-5 h-5" />
      </span>
      <div class="min-w-0 flex-1">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 break-words">{{ focusCard.title }}</h1>
        <p class="text-gray-600 dark:text-gray-400 text-sm">{{ focusCard.items.length }} {{ focusCard.items.length === 1 ? 'assessment' : 'assessments' }}, the most recent first</p>
      </div>
      <RouterLink
        to="/student/assignments"
        class="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        Go back
      </RouterLink>
    </div>

    <PageHeader v-else title="Assessments" description="Work from your teachers - what's due first, what you've started, and your marks when they come back." icon="clipboard" accent="indigo" :active-filters="(subjectFilter ? 1 : 0) + (searchQuery.trim() ? 1 : 0)">
      <template #filters>
        <div class="relative">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="searchQuery" type="search" placeholder="Search assessments" class="w-full md:w-52 pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <PickerDropdown v-if="subjectOptions.length > 2" v-model="subjectFilter" :options="subjectOptions" align="right" aria-label="Subject" />
      </template>
      <StatStrip v-if="assignments.length" v-model="viewFilter" :items="statItems" hide-when-empty />
    </PageHeader>

    <Skeleton v-if="loading" variant="list" :count="4" />

    <div v-else-if="error" class="flex items-start gap-3 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 p-4">
      <AppIcon name="warning" class="w-5 h-5 text-rose-500 flex-shrink-0" />
      <p class="flex-1 text-sm text-rose-700 dark:text-rose-200">{{ error }}</p>
      <button type="button" class="text-sm font-semibold text-rose-700 dark:text-rose-200 hover:underline" @click="loadAssignments">Try again</button>
    </div>

    <EmptyState v-else-if="!assignments.length && !focusCard" icon="clipboard" tone="indigo" title="No assessments yet" message="When a teacher sets work for your class, it shows here with its deadline." />

    <EmptyState v-else-if="!visible.length && !focusCard" compact icon="clipboard" tone="gray" title="Nothing matches" message="Try another subject or search.">
      <button type="button" class="text-sm font-semibold text-indigo-600 dark:text-indigo-300 hover:underline" @click="clearFilters">Clear filters</button>
    </EmptyState>

    <!-- One card per kind of assessment: LOA and AOI side by side on a wide screen, exams across the bottom -->
    <div v-if="!loading && !error && (focusCard || (assignments.length && visible.length && viewFilter !== 'marked'))" class="grid grid-cols-1 gap-4 items-start" :class="focusCard ? '' : 'lg:grid-cols-2'">
      <section
        v-for="card in (focusCard ? [focusCard] : shownCards)"
        :key="card.key"
        class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col min-w-0"
        :class="card.key === 'EOC' && !focusCard ? 'lg:col-span-2' : ''"
      >
        <!-- Heading: a coloured band with the kind's icon, its name, and how many there are -->
        <header class="relative flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r to-white dark:to-gray-800" :class="CARD_LOOK[card.key].band">
          <span class="absolute inset-y-0 left-0 w-1" :class="CARD_LOOK[card.key].solid"></span>
          <span class="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center text-white shadow-md" :class="[CARD_LOOK[card.key].solid, CARD_LOOK[card.key].glow]">
            <AppIcon :name="CARD_LOOK[card.key].icon" class="w-5 h-5" />
          </span>
          <div class="min-w-0 flex-1">
            <h2 class="text-base font-bold leading-tight text-indigo-800 dark:text-indigo-300 truncate">{{ card.title }}</h2>
          </div>
          <span class="flex-shrink-0 inline-flex items-baseline gap-1 px-2.5 py-1 rounded-full bg-white/80 dark:bg-gray-900/50 ring-1 ring-black/5 dark:ring-white/10">
            <span class="text-sm font-extrabold tabular-nums" :class="CARD_LOOK[card.key].text">{{ card.items.length }}</span>
            <span class="text-[10px] font-medium text-gray-500 dark:text-gray-400">{{ card.items.length === 1 ? 'item' : 'items' }}</span>
          </span>
        </header>

        <p v-if="!card.items.length" class="flex-1 px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500"><template v-if="finished.some(a => cardOf(a) === card.key) && !subjectFilter && !searchQuery.trim() && !viewFilter">All done here - your marked work is under Finished work.</template><template v-else>No {{ card.key === 'EOC' ? 'exams' : `${card.short} assessments` }}{{ subjectFilter || searchQuery.trim() || viewFilter ? ' match' : ' yet' }}.</template></p>
        <ul v-else class="divide-y divide-gray-100 dark:divide-gray-700">
          <li v-for="a in (focusCard ? card.items : card.items.slice(0, CARD_FIRST))" :key="a.id" class="p-3 sm:p-4 hover:bg-gray-50/70 dark:hover:bg-gray-700/30 transition-colors flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div class="min-w-0 flex-1">
              <p class="flex items-center gap-2 min-w-0">
                <span class="flex-shrink-0 inline-flex items-center gap-1 text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                  <span class="w-1.5 h-1.5 rounded-full" :class="GROUP_META[groupOf(a)].dot"></span>{{ GROUP_META[groupOf(a)].title }}
                </span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ a.title }}</span>
              </p>
              <p class="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ a.subject_name }}<template v-if="a.teacher_name"> · {{ a.teacher_name }}</template> · {{ Number(a.total_marks) }} {{ Number(a.total_marks) === 1 ? 'mark' : 'marks' }}</p>
            </div>

            <div class="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
              <!-- Marked: the score; otherwise when it's due -->
              <div v-if="a.status === 'marked' && a.submission" class="text-right">
                <p class="text-lg font-extrabold tabular-nums leading-none" :class="scoreTone(a.submission.percentage)">{{ Math.round(Number(a.submission.percentage)) }}%</p>
                <p class="text-[10px] text-gray-400">{{ Number(a.submission.total_score) }} / {{ Number(a.total_marks) }}</p>
              </div>
              <div v-else class="text-left sm:text-right text-[11px]">
                <p class="font-semibold" :class="due(a).tone">{{ due(a).label }}</p>
                <p class="text-gray-400">{{ due(a).sub }}</p>
              </div>

              <button v-if="a.status === 'new' || a.status === 'in_progress'" type="button" class="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700" @click="startAssignment(a)">
                {{ a.status === 'new' ? 'Start' : 'Continue' }}
              </button>
              <button v-else-if="a.status === 'overdue' && Number(a.allow_late_submission)" type="button" class="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700" @click="startAssignment(a)">Hand in late</button>
              <button v-else-if="a.status === 'marked'" type="button" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700" @click="viewResult(a)">See result</button>
              <button v-else-if="a.status === 'submitted'" type="button" class="px-4 py-2 rounded-xl text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="viewSubmission(a)">Your answers</button>
            </div>
          </li>
        </ul>
        <RouterLink
          v-if="!focusCard && card.items.length > CARD_FIRST"
          :to="{ path: '/student/assignments', query: { kind: card.key } }"
          class="mt-auto flex items-center justify-center gap-1.5 py-3 border-t border-gray-100 dark:border-gray-700 text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-gray-50 dark:hover:bg-gray-700/40"
        >
          Show more ({{ card.items.length - CARD_FIRST }})
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </RouterLink>
      </section>
    </div>

    <!-- Finished work: marked and returned, the latest first; ten, then the rest on request -->
    <section v-if="!loading && !error && finished.length && !focusCard" class="mt-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700 shadow-sm overflow-hidden">
      <header class="relative flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-emerald-50 to-white dark:from-emerald-950/40 dark:to-gray-800">
        <span class="absolute inset-y-0 left-0 w-1 bg-emerald-600"></span>
        <span class="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center text-white bg-emerald-600 shadow-md shadow-emerald-500/30">
          <AppIcon name="trophy" class="w-5 h-5" />
        </span>
        <div class="min-w-0 flex-1">
          <h2 class="text-base font-bold leading-tight text-indigo-800 dark:text-indigo-300 truncate">Finished work</h2>
          <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">Marked and returned</p>
        </div>
        <span v-if="finishedAverage !== null" class="hidden sm:inline-flex flex-shrink-0 items-baseline gap-1 px-2.5 py-1 rounded-full bg-white/80 dark:bg-gray-900/50 ring-1 ring-black/5 dark:ring-white/10">
          <span class="text-[10px] font-medium text-gray-500 dark:text-gray-400">average</span>
          <span class="text-sm font-extrabold tabular-nums" :class="scoreTone(finishedAverage)">{{ finishedAverage }}%</span>
        </span>
        <span class="flex-shrink-0 inline-flex items-baseline gap-1 px-2.5 py-1 rounded-full bg-white/80 dark:bg-gray-900/50 ring-1 ring-black/5 dark:ring-white/10">
          <span class="text-sm font-extrabold tabular-nums text-emerald-700 dark:text-emerald-300">{{ finished.length }}</span>
          <span class="text-[10px] font-medium text-gray-500 dark:text-gray-400">marked</span>
        </span>
      </header>

      <ul class="divide-y divide-gray-100 dark:divide-gray-700">
        <li v-for="(a, i) in shownFinished" :key="a.id" class="p-3 sm:p-4 flex items-center gap-3 hover:bg-gray-50/70 dark:hover:bg-gray-700/30 transition-colors">
          <!-- the score, as a ring -->
          <span class="relative w-12 h-12 flex-shrink-0">
            <svg viewBox="0 0 36 36" class="w-12 h-12 -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke-width="3.5" class="stroke-gray-100 dark:stroke-gray-700" />
              <circle cx="18" cy="18" r="15.5" fill="none" stroke-width="3.5" stroke-linecap="round" :class="ringTone(pctOf(a))" :stroke-dasharray="`${(pctOf(a) / 100) * 97.4} 97.4`" />
            </svg>
            <span class="absolute inset-0 flex items-center justify-center text-[11px] font-extrabold tabular-nums" :class="scoreTone(pctOf(a))">{{ pctOf(a) }}%</span>
          </span>
          <div class="min-w-0 flex-1">
            <p class="flex items-center gap-2 min-w-0">
              <span v-if="i === 0" class="flex-shrink-0 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">Latest</span>
              <span class="flex-shrink-0 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ cardOf(a) === 'EOC' ? 'Exam' : cardOf(a) }}</span>
              <span class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ a.title }}</span>
            </p>
            <p class="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400 truncate">
              {{ a.subject_name }}<template v-if="a.teacher_name"> · {{ a.teacher_name }}</template> · {{ Number(a.submission!.total_score) }} / {{ Number(a.total_marks) }} marks<template v-if="markedOn(a)"> · marked {{ markedOn(a) }}</template>
            </p>
          </div>
          <button type="button" class="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700" @click="viewResult(a)">See result</button>
        </li>
      </ul>

      <button
        v-if="finished.length > FINISHED_FIRST"
        type="button"
        class="w-full flex items-center justify-center gap-1.5 py-3 border-t border-gray-100 dark:border-gray-700 text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-gray-50 dark:hover:bg-gray-700/40"
        :aria-expanded="showAllFinished"
        @click="showAllFinished = !showAllFinished"
      >
        {{ showAllFinished ? 'Show less' : `View more (${finished.length - FINISHED_FIRST})` }}
        <svg class="w-4 h-4 transition-transform" :class="showAllFinished ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { apiService } from '../../services/api'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import PickerDropdown, { type PickerOption } from '@/components/common/PickerDropdown.vue'
import AppIcon from '@/components/common/AppIcon.vue'

interface StudentAssignment {
  id: number
  title: string
  instructions: string
  subject_id: number
  subject_name: string
  teacher_name: string
  open_at: string
  due_date: string
  total_marks: number
  status: 'new' | 'in_progress' | 'submitted' | 'marked' | 'late' | 'overdue'
  assessment_category?: 'LOA' | 'AOI' | 'EOC' | null
  // when the teacher set it
  set_at?: string | null
  category?: string | null
  // The teacher still takes work after the deadline
  allow_late_submission?: number | boolean | string
  submission?: {
    id: number
    total_score: number
    percentage: number
    submitted_at?: string | null
    // when it came back marked
    released_at?: string | null
  }
}
type GroupKey = 'overdue' | 'todo' | 'started' | 'waiting' | 'marked'

// Each kind's colour and icon for its card heading
const CARD_LOOK: Record<'LOA' | 'AOI' | 'EOC', { icon: string; solid: string; glow: string; band: string; text: string }> = {
  LOA: { icon: 'target', solid: 'bg-indigo-600', glow: 'shadow-indigo-500/30', band: 'from-indigo-50 dark:from-indigo-950/40', text: 'text-indigo-700 dark:text-indigo-300' },
  AOI: { icon: 'bulb', solid: 'bg-violet-600', glow: 'shadow-violet-500/30', band: 'from-violet-50 dark:from-violet-950/40', text: 'text-violet-700 dark:text-violet-300' },
  EOC: { icon: 'clipboard', solid: 'bg-amber-500', glow: 'shadow-amber-500/30', band: 'from-amber-50 dark:from-amber-950/40', text: 'text-amber-700 dark:text-amber-300' }
}

const router = useRouter()
const route = useRoute()

const assignments = ref<StudentAssignment[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const searchQuery = ref('')
const subjectFilter = ref('')
const viewFilter = ref<string | null>(null)

// Which section each piece of work sits in
const groupOf = (a: StudentAssignment): GroupKey => {
  if (a.status === 'marked') return 'marked'
  if (a.status === 'submitted' || a.status === 'late') return 'waiting'
  if (a.status === 'overdue') return 'overdue'
  if (a.status === 'in_progress') return 'started'
  return 'todo'
}
const GROUPS: { key: GroupKey; title: string; dot: string; hint?: string }[] = [
  { key: 'overdue', title: 'Overdue', dot: 'bg-rose-500', hint: 'the deadline has passed' },
  { key: 'started', title: 'In progress', dot: 'bg-amber-500', hint: 'pick up where you left off' },
  { key: 'todo', title: 'To do', dot: 'bg-indigo-500', hint: 'soonest deadline first' },
  { key: 'waiting', title: 'Waiting for marks', dot: 'bg-indigo-500' },
  { key: 'marked', title: 'Marked', dot: 'bg-emerald-500' }
]

const filtered = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return assignments.value.filter(a =>
    (!q || a.title.toLowerCase().includes(q) || (a.subject_name || '').toLowerCase().includes(q)) &&
    (!subjectFilter.value || a.subject_id === Number(subjectFilter.value)))
})
const at = (v: string) => (v ? new Date(v.replace(' ', 'T')).getTime() : NaN)
const GROUP_META = Object.fromEntries(GROUPS.map(g => [g.key, g])) as Record<GroupKey, typeof GROUPS[number]>

// The stat tiles narrow the list to one state (To do covers work started too)
const visible = computed(() => filtered.value.filter(a => {
  const g = groupOf(a)
  return !viewFilter.value || g === viewFilter.value || (viewFilter.value === 'todo' && g === 'started')
}))

// Which card an assessment sits in: LOA, AOI, or exams (EOC); anything not tagged counts as an LOA
type CardKey = 'LOA' | 'AOI' | 'EOC'
const cardOf = (a: StudentAssignment): CardKey => {
  if (a.assessment_category === 'AOI') return 'AOI'
  if (a.assessment_category === 'EOC' || /exam/i.test(a.category || '')) return 'EOC'
  return 'LOA'
}
const CARDS: { key: CardKey; short: string; title: string }[] = [
  { key: 'LOA', short: 'LOA', title: 'Learning Outcome Assessments (LOA)' },
  { key: 'AOI', short: 'AOI', title: 'Activities of Integration (AOI)' },
  { key: 'EOC', short: 'Exams', title: 'Exams (EOC)' }
]
// Exams only show once there is one
const shownCards = computed(() => cards.value.filter(c => c.key !== 'EOC' || c.items.length))
// Marked work leaves the cards for "Finished work"; the most recently set first
const CARD_FIRST = 6
const recentFirst = (x: StudentAssignment, y: StudentAssignment) =>
  (at(y.set_at || '') || at(y.open_at) || 0) - (at(x.set_at || '') || at(x.open_at) || 0)
const cards = computed(() => CARDS.map(c => ({
  ...c,
  items: visible.value.filter(a => cardOf(a) === c.key && groupOf(a) !== 'marked').sort(recentFirst)
})))

// Show more opens one kind on its own page (?kind=LOA): all of it, whatever tile was picked
const focusCard = computed(() => {
  const c = CARDS.find(k => k.key === route.query.kind)
  return c ? { ...c, items: filtered.value.filter(a => cardOf(a) === c.key && groupOf(a) !== 'marked').sort(recentFirst) } : null
})
watch(() => route.query.kind, () => window.scrollTo({ top: 0 }))

// ---- Finished work: marked, the latest back first; ten, then the rest on request
const FINISHED_FIRST = 10
const showAllFinished = ref(false)
const markedAt = (a: StudentAssignment) => at(a.submission?.released_at || a.submission?.submitted_at || a.due_date || '') || 0
const finished = computed(() => (viewFilter.value && viewFilter.value !== 'marked' ? [] : filtered.value)
  .filter(a => groupOf(a) === 'marked' && a.submission)
  .sort((x, y) => markedAt(y) - markedAt(x)))
const shownFinished = computed(() => (showAllFinished.value ? finished.value : finished.value.slice(0, FINISHED_FIRST)))
const pctOf = (a: StudentAssignment) => Math.max(0, Math.min(100, Math.round(Number(a.submission?.percentage || 0))))
const finishedAverage = computed(() => finished.value.length ? Math.round(finished.value.reduce((n, a) => n + pctOf(a), 0) / finished.value.length) : null)
const ringTone = (pct: number) => (pct >= 70 ? 'stroke-emerald-500' : pct >= 50 ? 'stroke-amber-500' : 'stroke-rose-500')
const markedOn = (a: StudentAssignment) => {
  const t = at(a.submission?.released_at || '')
  if (!t) return ''
  const days = Math.floor((Date.now() - t) / 86400000)
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  return new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}

const count = (k: GroupKey) => filtered.value.filter(a => groupOf(a) === k).length
const statItems = computed<StatItem[]>(() => {
  const marked = filtered.value.filter(a => a.status === 'marked' && a.submission)
  const avg = marked.length ? Math.round(marked.reduce((n, a) => n + Number(a.submission!.percentage), 0) / marked.length) : null
  return [
    { label: 'To do', value: count('todo') + count('started'), key: 'todo', tone: 'indigo', hint: count('started') ? `${count('started')} started` : undefined },
    { label: 'Overdue', value: count('overdue'), key: 'overdue', tone: 'rose' },
    { label: 'Waiting', value: count('waiting'), key: 'waiting', tone: 'sky', hint: 'for marks' },
    { label: 'Marked', value: count('marked'), key: 'marked', tone: 'emerald', hint: avg === null ? undefined : `average ${avg}%` }
  ]
})

const subjectOptions = computed<PickerOption<string>[]>(() => [
  { value: '', label: 'All subjects' },
  ...[...new Map(assignments.value.filter(a => a.subject_id).map(a => [a.subject_id, a.subject_name])).entries()]
    .map(([id, name]) => ({ value: String(id), label: name }))
])
const clearFilters = () => {
  searchQuery.value = ''
  subjectFilter.value = ''
  viewFilter.value = null
}

const DAY = 86400000
const due = (a: StudentAssignment) => {
  const end = at(a.due_date)
  if (isNaN(end)) return { label: 'No deadline', sub: '', tone: 'text-gray-500 dark:text-gray-400' }
  const date = new Date(end).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })
  if (a.status === 'submitted' || a.status === 'late') return { label: a.status === 'late' ? 'Handed in late' : 'Handed in', sub: `was due ${date}`, tone: 'text-indigo-600 dark:text-indigo-300' }
  const midnight = (t: number) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime() }
  const days = Math.round((midnight(end) - midnight(Date.now())) / DAY)
  if (end < Date.now()) return { label: days === 0 ? 'Closed today' : `Closed ${-days === 1 ? 'yesterday' : `${-days} days ago`}`, sub: date, tone: 'text-rose-600 dark:text-rose-300' }
  return {
    label: days <= 0 ? 'Due today' : days === 1 ? 'Due tomorrow' : `Due in ${days} days`,
    sub: `${date} · ${new Date(end).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`,
    tone: days <= 1 ? 'text-rose-600 dark:text-rose-300' : 'text-gray-700 dark:text-gray-200'
  }
}
const scoreTone = (pct: number) => (Number(pct) >= 70 ? 'text-emerald-600 dark:text-emerald-300' : Number(pct) >= 50 ? 'text-amber-600 dark:text-amber-300' : 'text-rose-600 dark:text-rose-300')

const loadAssignments = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await apiService.get('/student/assignments')
    if (response.data.success) {
      assignments.value = response.data.data
    } else {
      error.value = response.data.message || 'Failed to load assessments'
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load assessments'
  } finally {
    loading.value = false
  }
}

const startAssignment = (assignment: StudentAssignment) => {
  router.push(`/student/assignments/${assignment.id}/answer`)
}

const viewSubmission = (assignment: StudentAssignment) => {
  if (assignment.submission) {
    router.push(`/student/assignments/${assignment.id}/submission/${assignment.submission.id}`)
  }
}

const viewResult = (assignment: StudentAssignment) => {
  if (assignment.submission) {
    router.push(`/student/assignments/${assignment.id}/result/${assignment.submission.id}`)
  }
}

onMounted(() => {
  loadAssignments()
})
</script>
