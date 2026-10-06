<template>
  <div class="w-full">
    <PageHeader title="Assessments" description="Set work, see who has handed in, and mark - the ones waiting on you come first." icon="clipboard" accent="violet" :active-filters="activeFilterCount">
      <template #actions>
        <RouterLink to="/teacher/term-copy" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" title="Reuse a term you've already taught">
          <span class="hidden sm:inline">Copy a past term</span><span class="sm:hidden">Copy term</span>
        </RouterLink>
        <button type="button" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-500/20" @click="router.push('/teacher/assignments/create')">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          <span class="hidden sm:inline">New assessment</span><span class="sm:hidden">New</span>
        </button>
      </template>
      <template #filters>
        <div class="relative">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="searchQuery" type="search" placeholder="Search assessments" class="w-full md:w-48 pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500">
        </div>
        <PickerDropdown v-model="classFilter" label="Class" :options="classOptions" align="right" />
        <PickerDropdown v-model="subjectFilter" label="Subject" :options="subjectOptions" align="right" />
        <PickerDropdown v-model="typeFilter" label="Type" :options="typeOptions" align="right" />
      </template>
      <StatStrip v-model="viewFilter" :items="statItems" hide-when-empty />
    </PageHeader>

    <Skeleton v-if="loading && !assignments.length" variant="list" :count="5" />

    <div v-else-if="error && !assignments.length" class="flex items-start gap-3 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 p-4">
      <AppIcon name="warning" class="w-5 h-5 text-rose-500 flex-shrink-0" />
      <p class="flex-1 text-sm text-rose-700 dark:text-rose-200">{{ error }}</p>
      <button type="button" class="text-sm font-semibold text-rose-700 dark:text-rose-200 hover:underline" @click="loadAssignments">Try again</button>
    </div>

    <EmptyState v-else-if="!assignments.length" icon="clipboard" tone="violet" title="No assessments yet" message="Build a quiz, a test or a take-home task - students answer in eSpace and you mark it here.">
      <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700" @click="router.push('/teacher/assignments/create')">Create your first assessment</button>
    </EmptyState>

    <template v-else>
      <BulkActionBar :count="bulk.selectedCount.value" @clear="bulk.clear()">
        <button class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" @click="bulkExport">Export CSV</button>
        <button class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors" @click="bulkDeleteSelected">Delete</button>
      </BulkActionBar>

      <EmptyState v-if="!filteredAssignments.length" compact icon="clipboard" tone="gray" title="No assessments match" message="Try another class, subject or type.">
        <button type="button" class="text-sm font-semibold text-violet-600 dark:text-violet-300 hover:underline" @click="clearFilters">Clear filters</button>
      </EmptyState>

      <template v-else>
        <div class="flex items-center gap-2 mb-3">
          <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
            <input
              type="checkbox"
              :checked="bulk.allSelected(visibleIds)"
              class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-violet-600 focus:ring-violet-500"
              @change="bulk.toggleAll(visibleIds)"
            >
            Select all
          </label>
        </div>

        <!-- One section per state, the ones needing the teacher first -->
        <section v-for="group in groups" :key="group.key" class="mb-6">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2 h-2 rounded-full" :class="group.dot"></span>
            <h2 class="text-sm font-bold text-gray-900 dark:text-white">{{ group.title }}</h2>
            <span class="text-xs font-medium text-gray-400">{{ group.items.length }}</span>
            <span v-if="group.hint" class="hidden sm:inline text-xs text-gray-400">· {{ group.hint }}</span>
          </div>
          <ul class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
            <li v-for="a in group.items" :key="a.id" class="p-3 sm:p-4 flex items-start gap-3" :class="bulk.isSelected(a.id) ? 'bg-violet-50/60 dark:bg-violet-900/10' : ''">
              <input
                type="checkbox"
                :checked="bulk.isSelected(a.id)"
                class="mt-1 w-4 h-4 flex-shrink-0 rounded border-gray-300 dark:border-gray-600 text-violet-600 focus:ring-violet-500"
                :aria-label="`Select ${a.title}`"
                @change="bulk.toggle(a.id)"
              >
              <div class="min-w-0 flex-1 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                <!-- What it is -->
                <button type="button" class="min-w-0 flex-1 text-left" @click="viewAssignment(a.id)">
                  <span class="flex items-center gap-2 min-w-0">
                    <span v-if="categoryOf(a)" class="flex-shrink-0 px-1.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide" :class="categoryChip(categoryOf(a))">{{ categoryOf(a) }}</span>
                    <span class="text-sm font-semibold text-gray-900 dark:text-white truncate hover:text-violet-700 dark:hover:text-violet-300">{{ a.title }}</span>
                  </span>
                  <span class="block mt-0.5 text-[11px] text-gray-500 dark:text-gray-400 truncate">
                    {{ a.subject_name || 'No subject' }} · {{ classLabel(a) }} · {{ formatType(a.type) }} · {{ a.question_count || 0 }} {{ Number(a.question_count) === 1 ? 'question' : 'questions' }} · {{ Number(a.total_marks) }} {{ Number(a.total_marks) === 1 ? 'mark' : 'marks' }}
                  </span>
                </button>

                <!-- How the class is getting on -->
                <div v-if="a.status !== 'draft'" class="lg:w-56 flex-shrink-0">
                  <div class="flex items-center gap-2">
                    <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden flex">
                      <span class="h-full bg-emerald-500" :style="{ width: share(a, a.marked_count) + '%' }" :title="`${a.marked_count || 0} marked`"></span>
                      <span class="h-full bg-rose-500" :style="{ width: share(a, a.to_mark_count) + '%' }" :title="`${a.to_mark_count || 0} waiting to be marked`"></span>
                    </span>
                    <span class="text-[11px] font-semibold tabular-nums text-gray-500 dark:text-gray-400">{{ a.handed_in_count || 0 }}/{{ a.audience || 0 }}</span>
                  </div>
                  <p class="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                    handed in<template v-if="Number(a.to_mark_count)"> · <span class="font-semibold text-rose-600 dark:text-rose-300">{{ a.to_mark_count }} to mark</span></template><template v-if="Number(a.marked_count)"> · {{ a.marked_count }} marked</template>
                  </p>
                </div>

                <!-- When (and, on a phone, the main action beside it) -->
                <div class="lg:w-36 flex-shrink-0 flex items-center justify-between gap-2 text-[11px]">
                  <p>
                    <span class="font-semibold" :class="due(a).tone">{{ due(a).label }}</span>
                    <span v-if="due(a).sub" class="text-gray-400"><span class="lg:hidden"> · </span><span class="lg:block">{{ due(a).sub }}</span></span>
                  </p>
                  <button v-if="group.key === 'to_mark'" type="button" class="sm:hidden px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white" @click="viewSubmissions(a.id)">Mark {{ a.to_mark_count }}</button>
                  <button v-else-if="a.status === 'draft'" type="button" class="sm:hidden px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600 text-white" @click="togglePublish(a)">Publish</button>
                </div>
              </div>

              <!-- What to do -->
              <div class="flex items-center gap-1 flex-shrink-0">
                <button
                  v-if="group.key === 'to_mark'"
                  type="button"
                  class="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700"
                  @click="viewSubmissions(a.id)"
                >Mark {{ a.to_mark_count }}</button>
                <button
                  v-else-if="a.status === 'draft'"
                  type="button"
                  class="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700"
                  @click="togglePublish(a)"
                >Publish</button>
                <button
                  v-else
                  type="button"
                  class="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  @click="viewSubmissions(a.id)"
                >Submissions</button>
                <ActionMenu :items="actionsFor(a, group.key)" :label="`Actions for ${a.title}`" />
              </div>
            </li>
          </ul>
        </section>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import type { Assignment } from '@/types'
import BulkActionBar from '@/components/common/BulkActionBar.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import ActionMenu, { type ActionItem } from '@/components/ui/ActionMenu.vue'
import PickerDropdown, { type PickerOption } from '@/components/common/PickerDropdown.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { useBulkSelection } from '@/composables/useBulkSelection'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { downloadBlob } from '@/utils/downloadBlob'

// The list adds where each class has got (see Teacher\AssignmentController::index)
type Row = Assignment & {
  assessment_category?: string | null
  audience?: number | string
  handed_in_count?: number | string
  to_mark_count?: number | string
  marked_count?: number | string
}
type GroupKey = 'to_mark' | 'open' | 'upcoming' | 'draft' | 'closed' | 'archived'

const router = useRouter()
const toast = useToastStore()
const confirmDialog = useConfirmStore()
const bulk = useBulkSelection<number>()

const API_BASE = '/api'

const assignments = ref<Row[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const searchQuery = ref('')
const viewFilter = usePersistedRef<string | null>('teacher-assessments:view', null)
const typeFilter = usePersistedRef<string>('teacher-assessments:type', '')
const subjectFilter = usePersistedRef<string>('teacher-assessments:subject', '')
const classFilter = usePersistedRef<string>('teacher-assessments:class', '')

const now = Date.now()
const at = (s?: string | null) => (s ? new Date(s.replace(' ', 'T')).getTime() : NaN)
const n = (v: unknown) => Number(v || 0)

// Which section an assessment sits in - work waiting on the teacher wins over everything else
const groupOf = (a: Row): GroupKey => {
  if (a.status === 'archived') return 'archived'
  if (n(a.to_mark_count) > 0) return 'to_mark'
  if (a.status === 'draft') return 'draft'
  if (at(a.open_at) > now) return 'upcoming'
  const end = at(a.deadline_at || a.due_date)
  return !isNaN(end) && end < now ? 'closed' : 'open'
}

const GROUPS: { key: GroupKey; title: string; dot: string; hint?: string }[] = [
  { key: 'to_mark', title: 'Waiting to be marked', dot: 'bg-rose-500', hint: 'students are waiting for their results' },
  { key: 'open', title: 'Open now', dot: 'bg-emerald-500', hint: 'students can answer these' },
  { key: 'upcoming', title: 'Opening soon', dot: 'bg-sky-500' },
  { key: 'draft', title: 'Drafts', dot: 'bg-amber-500', hint: "students can't see these yet" },
  { key: 'closed', title: 'Closed', dot: 'bg-gray-400' },
  { key: 'archived', title: 'Archived', dot: 'bg-gray-300 dark:bg-gray-600' }
]

const classLabel = (a: Row) => a.class_group_name
  ? `${a.class_group_name} (all streams)`
  : a.class_name ? `${a.class_name}${a.stream_name ? `-${a.stream_name}` : ''}` : 'No class'
const classKey = (a: Row) => a.class_group_name || a.class_name || ''

const filteredAssignments = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return assignments.value.filter(a =>
    (!q || a.title.toLowerCase().includes(q)) &&
    (!typeFilter.value || a.type === typeFilter.value) &&
    (!subjectFilter.value || a.subject_id === parseInt(subjectFilter.value)) &&
    (!classFilter.value || classKey(a) === classFilter.value))
})

// Soonest deadline first while open; most recent first once closed
const sortFor = (key: GroupKey) => (x: Row, y: Row) => {
  const dx = at(x.deadline_at || x.due_date)
  const dy = at(y.deadline_at || y.due_date)
  if (key === 'open' || key === 'upcoming') return (isNaN(dx) ? Infinity : dx) - (isNaN(dy) ? Infinity : dy)
  if (key === 'to_mark') return n(y.to_mark_count) - n(x.to_mark_count)
  if (key === 'draft') return at(y.updated_at || y.created_at) - at(x.updated_at || x.created_at)
  return (isNaN(dy) ? 0 : dy) - (isNaN(dx) ? 0 : dx)
}

const groups = computed(() => GROUPS
  .filter(g => !viewFilter.value || g.key === viewFilter.value)
  .map(g => ({ ...g, items: filteredAssignments.value.filter(a => groupOf(a) === g.key).sort(sortFor(g.key)) }))
  .filter(g => g.items.length))

const visibleIds = computed(() => groups.value.flatMap(g => g.items.map(a => a.id)))

const countIn = (key: GroupKey) => filteredAssignments.value.filter(a => groupOf(a) === key).length
const statItems = computed<StatItem[]>(() => [
  { label: 'To mark', value: filteredAssignments.value.reduce((t, a) => t + n(a.to_mark_count), 0), key: 'to_mark', tone: 'rose', hint: `${countIn('to_mark')} assessments` },
  { label: 'Open now', value: countIn('open'), key: 'open', tone: 'emerald' },
  { label: 'Drafts', value: countIn('draft'), key: 'draft', tone: 'amber' },
  { label: 'Closed', value: countIn('closed'), key: 'closed', tone: 'gray' }
])

const uniq = <T,>(list: T[], key: (t: T) => string) => [...new Map(list.map(t => [key(t), t])).values()]
const classOptions = computed<PickerOption<string>[]>(() => [
  { value: '', label: 'All classes' },
  ...uniq(assignments.value.filter(a => classKey(a)), classKey)
    .map(a => ({ value: classKey(a), label: classKey(a) }))
    .sort((x, y) => x.label.localeCompare(y.label, undefined, { numeric: true }))
])
const subjectOptions = computed<PickerOption<string>[]>(() => [
  { value: '', label: 'All subjects' },
  ...uniq(assignments.value.filter(a => a.subject_id && a.subject_name), a => String(a.subject_id))
    .map(a => ({ value: String(a.subject_id), label: a.subject_name as string }))
])
const TYPES: Record<string, string> = { essay: 'Essay', scenario: 'Scenario', objective: 'Objective', file_upload: 'File upload', mixed: 'Mixed' }
const typeOptions = computed<PickerOption<string>[]>(() => [
  { value: '', label: 'All types' },
  ...[...new Set(assignments.value.map(a => a.type))].map(t => ({ value: t, label: TYPES[t] || t }))
])
const activeFilterCount = computed(() => [searchQuery.value.trim(), typeFilter.value, subjectFilter.value, classFilter.value].filter(Boolean).length)

const clearFilters = () => {
  searchQuery.value = ''
  viewFilter.value = null
  typeFilter.value = ''
  subjectFilter.value = ''
  classFilter.value = ''
}

const formatType = (type: string) => TYPES[type] || type
const categoryOf = (a: Row) => a.assessment_category || ''
const categoryChip = (c: string) => ({
  LOA: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200',
  AOI: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200',
  EOC: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
}[c] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200')

// Share of the class, for the handed-in bar
const share = (a: Row, count: unknown) => {
  const total = Math.max(n(a.audience), n(a.handed_in_count), 1)
  return Math.min(100, Math.round((n(count) / total) * 100))
}

const DAY = 86400000
const shortDate = (t: number) => new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
const due = (a: Row) => {
  const end = at(a.deadline_at || a.due_date)
  if (a.status === 'draft') return { label: 'Not published', sub: isNaN(end) ? 'No deadline' : `Due ${shortDate(end)}`, tone: 'text-amber-600 dark:text-amber-300' }
  const opens = at(a.open_at)
  if (opens > now) return { label: `Opens ${shortDate(opens)}`, sub: isNaN(end) ? '' : `Due ${shortDate(end)}`, tone: 'text-sky-600 dark:text-sky-300' }
  if (isNaN(end)) return { label: 'No deadline', sub: '', tone: 'text-gray-500 dark:text-gray-400' }
  // Calendar days, so "tomorrow" means the next date, whatever the hour
  const midnight = (t: number) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime() }
  const days = Math.round((midnight(end) - midnight(now)) / DAY)
  if (end >= now) {
    const label = days <= 0 ? 'Due today' : days === 1 ? 'Due tomorrow' : `Due in ${days} days`
    return { label, sub: shortDate(end), tone: days <= 2 ? 'text-rose-600 dark:text-rose-300' : 'text-emerald-600 dark:text-emerald-300' }
  }
  const ago = -days
  return { label: `Closed ${ago <= 0 ? 'today' : ago === 1 ? 'yesterday' : `${ago} days ago`}`, sub: shortDate(end), tone: 'text-gray-500 dark:text-gray-400' }
}

const actionsFor = (a: Row, key: GroupKey): ActionItem[] => [
  // On a phone the main button is folded in here too
  ...(key === 'to_mark' ? [{ label: `Mark submissions (${a.to_mark_count})`, icon: 'pencil', run: () => viewSubmissions(a.id) }] : []),
  ...(a.status === 'draft' ? [{ label: 'Publish', icon: 'send', run: () => togglePublish(a) }] : [{ label: 'Submissions', icon: 'users', run: () => viewSubmissions(a.id) }]),
  { label: 'View', icon: 'document', divider: true, run: () => viewAssignment(a.id) },
  { label: 'Preview as a student', icon: 'teacher', run: () => previewAsStudent(a.id) },
  { label: 'Edit', icon: 'pencil', run: () => editAssignment(a.id) },
  { label: 'Duplicate', icon: 'clipboard', run: () => duplicateAssignment(a.id) },
  ...(a.status === 'published' ? [{ label: 'Unpublish (back to draft)', icon: 'clock', run: () => togglePublish(a) }] : []),
  { label: 'Delete', icon: 'trash', danger: true, divider: true, run: () => deleteAssignment(a) }
]

const bulkDeleteSelected = async () => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  if (!await confirmDialog.open({ title: 'Delete assessments', message: `Are you sure you want to delete ${ids.length} assessment(s)? This cannot be undone.`, confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.post(`${API_BASE}/teacher/assignments/bulk-delete`, { ids })
    toast.success(`${ids.length} assessment(s) deleted`)
    bulk.clear()
    await loadAssignments()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to delete assessments')
  }
}

const bulkExport = async () => {
  const ids = bulk.selectedArray()
  try {
    const response = await axios.post(`${API_BASE}/teacher/assignments/bulk-export`, { ids }, { responseType: 'blob' })
    downloadBlob(response.data, 'assessments.csv')
  } catch {
    toast.error('Failed to export assessments')
  }
}

const loadAssignments = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(`${API_BASE}/teacher/assignments`)
    if (response.data.success) assignments.value = response.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load assessments'
  } finally {
    loading.value = false
  }
}

const viewAssignment = (id: number) => router.push(`/teacher/assignments/${id}?preview=true`)
const previewAsStudent = (id: number) => router.push(`/teacher/assignments/${id}/preview`)
const editAssignment = (id: number) => router.push(`/teacher/assignments/${id}/edit`)
const viewSubmissions = (id: number) => router.push(`/teacher/assignments/${id}/submissions`)

const duplicateAssignment = async (id: number) => {
  try {
    const response = await axios.post(`${API_BASE}/teacher/assignments/${id}/duplicate`)
    if (response.data.success) {
      toast.success('Copied - the copy is a draft')
      await loadAssignments()
    }
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to duplicate assessment')
  }
}

const togglePublish = async (assignment: Row) => {
  try {
    if (assignment.status === 'published') {
      await axios.put(`${API_BASE}/teacher/assignments/${assignment.id}`, { status: 'draft' })
      toast.success(`"${assignment.title}" is back to draft`)
    } else {
      await axios.post(`${API_BASE}/teacher/assignments/${assignment.id}/publish`)
      toast.success(`"${assignment.title}" is now visible to students`)
    }
    await loadAssignments()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to update assessment status')
  }
}

const deleteAssignment = async (assignment: Row) => {
  if (!await confirmDialog.open({ title: 'Delete assessment', message: `Delete "${assignment.title}"? This cannot be undone.`, confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.delete(`${API_BASE}/teacher/assignments/${assignment.id}`)
    toast.success('Assessment deleted')
    await loadAssignments()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to delete assessment')
  }
}

onMounted(loadAssignments)
</script>
