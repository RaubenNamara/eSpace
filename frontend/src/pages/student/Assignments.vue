<template>
  <div class="w-full">
    <PageHeader title="Assessments" description="Work from your teachers - what's due first, what you've started, and your marks when they come back." icon="clipboard" accent="indigo" :active-filters="(subjectFilter ? 1 : 0) + (searchQuery.trim() ? 1 : 0)">
      <template #filters>
        <div class="relative">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="searchQuery" type="search" placeholder="Search assessments" class="w-full md:w-52 pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <PickerDropdown v-if="subjectOptions.length > 2" v-model="subjectFilter" label="Subject" :options="subjectOptions" align="right" />
      </template>
      <StatStrip v-if="assignments.length" v-model="viewFilter" :items="statItems" hide-when-empty />
    </PageHeader>

    <Skeleton v-if="loading" variant="list" :count="4" />

    <div v-else-if="error" class="flex items-start gap-3 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 p-4">
      <AppIcon name="warning" class="w-5 h-5 text-rose-500 flex-shrink-0" />
      <p class="flex-1 text-sm text-rose-700 dark:text-rose-200">{{ error }}</p>
      <button type="button" class="text-sm font-semibold text-rose-700 dark:text-rose-200 hover:underline" @click="loadAssignments">Try again</button>
    </div>

    <EmptyState v-else-if="!assignments.length" icon="clipboard" tone="indigo" title="No assessments yet" message="When a teacher sets work for your class, it shows here with its deadline." />

    <EmptyState v-else-if="!groups.length" compact icon="clipboard" tone="gray" title="Nothing matches" message="Try another subject or search.">
      <button type="button" class="text-sm font-semibold text-indigo-600 dark:text-indigo-300 hover:underline" @click="clearFilters">Clear filters</button>
    </EmptyState>

    <!-- One section per state, the ones needing you first -->
    <section v-for="group in groups" :key="group.key" class="mb-6">
      <div class="flex items-center gap-2 mb-2">
        <span class="w-2 h-2 rounded-full" :class="group.dot"></span>
        <h2 class="text-sm font-bold text-gray-900 dark:text-white">{{ group.title }}</h2>
        <span class="text-xs font-medium text-gray-400">{{ group.items.length }}</span>
        <span v-if="group.hint" class="hidden sm:inline text-xs text-gray-400">· {{ group.hint }}</span>
      </div>
      <ul class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
        <li v-for="a in group.items" :key="a.id" class="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div class="min-w-0 flex-1">
            <p class="flex items-center gap-2 min-w-0">
              <span v-if="a.assessment_category" class="flex-shrink-0 px-1.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide" :class="CATEGORY_CHIP[a.assessment_category]" :title="CATEGORY_LABEL[a.assessment_category]">{{ a.assessment_category }}</span>
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
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
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
  // The teacher still takes work after the deadline
  allow_late_submission?: number | boolean | string
  submission?: {
    id: number
    total_score: number
    percentage: number
  }
}
type GroupKey = 'overdue' | 'todo' | 'started' | 'waiting' | 'marked'

const CATEGORY_LABEL: Record<'LOA' | 'AOI' | 'EOC', string> = {
  LOA: 'Learning Outcome Assessment',
  AOI: 'Activity of Integration',
  EOC: 'Elements of Construct'
}
const CATEGORY_CHIP: Record<'LOA' | 'AOI' | 'EOC', string> = {
  LOA: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200',
  AOI: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200',
  EOC: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
}

const router = useRouter()

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
  { key: 'waiting', title: 'Waiting for marks', dot: 'bg-sky-500' },
  { key: 'marked', title: 'Marked', dot: 'bg-emerald-500' }
]

const filtered = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return assignments.value.filter(a =>
    (!q || a.title.toLowerCase().includes(q) || (a.subject_name || '').toLowerCase().includes(q)) &&
    (!subjectFilter.value || a.subject_id === Number(subjectFilter.value)))
})
const at = (v: string) => (v ? new Date(v.replace(' ', 'T')).getTime() : NaN)
const groups = computed(() => GROUPS
  // The To do tile covers work started too
  .filter(g => !viewFilter.value || g.key === viewFilter.value || (viewFilter.value === 'todo' && g.key === 'started'))
  .map(g => ({
    ...g,
    items: filtered.value.filter(a => groupOf(a) === g.key).sort((x, y) => g.key === 'marked' || g.key === 'waiting'
      ? (at(y.due_date) || 0) - (at(x.due_date) || 0)
      : (at(x.due_date) || Infinity) - (at(y.due_date) || Infinity))
  }))
  .filter(g => g.items.length))

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
  if (a.status === 'submitted' || a.status === 'late') return { label: a.status === 'late' ? 'Handed in late' : 'Handed in', sub: `was due ${date}`, tone: 'text-sky-600 dark:text-sky-300' }
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
