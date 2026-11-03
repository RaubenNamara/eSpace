<template>
  <div>
    <PageHeader title="Assessments" description="Every assignment in the school - who set it, where it went, and how far it has got." icon="clipboard" accent="indigo" :active-filters="(statusFilter ? 1 : 0) + (departmentFilter ? 1 : 0)">
      <template #actions>
        <span v-if="!loading && assignments.length > 0" class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {{ filteredAssignments.length }} of {{ assignments.length }} shown
        </span>
      </template>
      <StatStrip v-if="!loading && assignments.length" :items="summaryItems" />
      <template #filters>
        <div class="relative w-full sm:w-72">
          <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 114 10.5a6.5 6.5 0 0113 0z"></path>
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Search by title or teacher..."
            aria-label="Search"
            class="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>
        <select v-model="statusFilter" @change="loadAssignments" aria-label="Status" class="w-full sm:w-auto py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
        <select v-model="departmentFilter" aria-label="Department" class="w-full sm:w-auto py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
          <option value="">All Departments</option>
          <option v-for="dept in departmentOptions" :key="dept" :value="dept">{{ dept }}</option>
        </select>
      </template>
    </PageHeader>

    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading assessments...</p>
    </div>

    <EmptyState v-else-if="assignments.length === 0" icon="clipboard" tone="gray" title="No assessments found" />

    <EmptyState v-else-if="filteredAssignments.length === 0" icon="clipboard" tone="gray" title="No assessments match this filter" />

    <div v-else>
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ filteredAssignments.length }} assessment{{ filteredAssignments.length === 1 ? '' : 's' }} across {{ groupedAssignments.length }} class{{ groupedAssignments.length === 1 ? '' : 'es' }}
        </p>
        <button @click="toggleAllClasses" class="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
          {{ allClassesCollapsed ? 'Expand all' : 'Collapse all' }}
        </button>
      </div>

      <!-- Grouped by class, with each class's streams shown as clickable cards -->
      <div class="space-y-4">
        <div
          v-for="group in groupedAssignments"
          :key="group.key"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <button
            @click="toggleClassGroup(group.key)"
            class="w-full flex items-center justify-between gap-3 px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div class="flex items-center gap-3 min-w-0">
              <svg
                class="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform"
                :class="{ '-rotate-90': collapsedClasses.has(group.key) }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
              <h2 class="text-base font-bold text-gray-900 dark:text-white truncate">{{ group.label }}</h2>
            </div>
            <span class="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {{ group.total }} assessment{{ group.total === 1 ? '' : 's' }}
            </span>
          </button>

          <div v-if="!collapsedClasses.has(group.key)" class="border-t border-gray-100 dark:border-gray-700 px-6 py-5">
            <!-- Stream cards - click a stream to see its assessments below -->
            <div class="flex flex-wrap gap-3">
              <button
                v-for="stream in group.streams"
                :key="stream.key"
                @click="toggleStream(group.key, stream.key)"
                class="group relative flex flex-col items-center justify-center gap-1 min-w-[6rem] px-3 h-20 rounded-xl border-2 transition-all"
                :class="selectedStreams[group.key] === stream.key
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-md'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950/40 hover:border-indigo-300 hover:shadow-sm'"
              >
                <span
                  class="text-lg font-bold"
                  :class="selectedStreams[group.key] === stream.key ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-800 dark:text-gray-200'"
                >
                  {{ stream.label }}
                </span>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ stream.key === ALL ? 'All streams · ' : '' }}{{ stream.assignments.length }} item{{ stream.assignments.length === 1 ? '' : 's' }}</span>
              </button>
            </div>

            <!-- Subjects and assessments for the selected stream -->
            <div v-if="selectedStreams[group.key]" class="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
              <div
                v-for="subject in subjectsForStream(group.streams.find(s => s.key === selectedStreams[group.key])?.assignments || [])"
                :key="subject.key"
                class="py-5 first:pt-0"
              >
                <h3 class="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
                  {{ subject.label }}
                  <span class="ml-1 font-normal text-gray-400 dark:text-gray-500">({{ subject.assignments.length }})</span>
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div
                    v-for="a in subject.assignments"
                    :key="a.id"
                    class="group flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/60"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <p class="min-w-0 text-[15px] font-semibold leading-snug text-gray-900 dark:text-white line-clamp-2" :title="a.title">{{ a.title }}</p>
                      <span class="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap" :class="statusBadge(a.status)">
                        <span class="h-1.5 w-1.5 rounded-full bg-current opacity-70"></span>{{ capitalize(a.status) }}
                      </span>
                    </div>
                    <div class="mt-2 flex items-center gap-2 min-w-0">
                      <span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-700 ring-1 ring-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-300 dark:ring-indigo-800">{{ initials(a.teacher_name) }}</span>
                      <span class="truncate text-xs text-gray-600 dark:text-gray-300">{{ a.teacher_name }}<template v-if="a.department_name"> · {{ a.department_name }}</template></span>
                    </div>

                    <dl class="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs dark:bg-gray-800/70">
                      <div class="min-w-0" :title="isWholeClass(a) ? 'All streams' : 'Streams'">
                        <dt class="text-[10px] font-medium uppercase tracking-wide text-gray-400">For</dt>
                        <dd class="truncate font-semibold text-gray-800 dark:text-gray-100">{{ audienceLabel(a) }}</dd>
                      </div>
                      <div class="min-w-0">
                        <dt class="text-[10px] font-medium uppercase tracking-wide text-gray-400">Due</dt>
                        <dd class="truncate font-semibold" :class="isOverdue(a) ? 'text-rose-600 dark:text-rose-400' : 'text-gray-800 dark:text-gray-100'" :title="a.due_date ? (isOverdue(a) ? 'Past the due date' : formatDate(a.due_date)) : ''">{{ a.due_date ? shortDate(a.due_date) : 'None' }}</dd>
                      </div>
                      <div class="min-w-0 text-right">
                        <dt class="text-[10px] font-medium uppercase tracking-wide text-gray-400">Handed in</dt>
                        <dd class="font-semibold tabular-nums text-gray-800 dark:text-gray-100">{{ a.submissions_count }}</dd>
                      </div>
                    </dl>

                    <div class="mt-auto pt-3 flex items-center gap-1.5">
                      <RouterLink
                        :to="`/admin/assessments/${a.id}/preview`"
                        class="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap"
                        title="Preview as student"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        Preview
                      </RouterLink>
                      <RouterLink
                        :to="`/admin/assessments/${a.id}/submissions`"
                        class="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors whitespace-nowrap"
                        title="Marked scripts and scripts waiting for marking"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                        Scripts ({{ a.submissions_count }})
                      </RouterLink>
                      <button
                        type="button"
                        class="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                        :disabled="deletingId === a.id"
                        :title="deletingId === a.id ? 'Deleting…' : 'Delete'"
                        :aria-label="`Delete ${a.title}`"
                        @click="deleteAssessment(a)"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EmptyState from '@/components/ui/EmptyState.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useConfirmStore } from '@/stores/confirm'
import { useToastStore } from '@/stores/toast'

interface AssignmentRow {
  id: number
  title: string
  status: string
  due_date: string
  total_marks: number
  category: string
  subject_name: string | null
  class_name: string | null
  class_stream_name: string | null
  class_group_name: string | null
  target_streams: string | null
  class_stream_count: number | string | null
  department_name: string | null
  teacher_name: string
  submissions_count: number
}

const API_BASE = '/api/admin'

const confirmDialog = useConfirmStore()
const toast = useToastStore()
const deletingId = ref<number | null>(null)

/** Delete any assessment; its results leave report cards, so say how many students that touches */
const deleteAssessment = async (a: AssignmentRow) => {
  const n = Number(a.submissions_count) || 0
  const message = n > 0
    ? `Delete "${a.title}" by ${a.teacher_name}? ${n} student submission${n === 1 ? '' : 's'} will be removed with it, and those results will no longer count on report cards. This cannot be undone.`
    : `Delete "${a.title}" by ${a.teacher_name}? This cannot be undone.`
  if (!await confirmDialog.open({ title: 'Delete assessment', message, confirmLabel: 'Delete', danger: true })) return
  deletingId.value = a.id
  try {
    await axios.delete(`${API_BASE}/assignments/${a.id}`)
    assignments.value = assignments.value.filter(x => x.id !== a.id)
    toast.success('Assessment deleted')
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to delete assessment')
  } finally {
    deletingId.value = null
  }
}

const assignments = ref<AssignmentRow[]>([])
const loading = ref(false)
const statusFilter = ref('')
const departmentFilter = ref('')
const search = ref('')

const departmentOptions = computed(() => {
  return Array.from(new Set(assignments.value.map(a => a.department_name).filter((d): d is string => !!d))).sort()
})

const filteredAssignments = computed(() => {
  let list = assignments.value
  if (departmentFilter.value) {
    list = list.filter(a => a.department_name === departmentFilter.value)
  }
  const q = search.value.trim().toLowerCase()
  if (q) {
    list = list.filter(a => a.title.toLowerCase().includes(q) || a.teacher_name.toLowerCase().includes(q))
  }
  return list
})

// Assessments arranged by class, with each class's streams shown as clickable cards - clicking
// a stream reveals its assessments grouped by subject.
interface SubjectGroup {
  key: string
  label: string
  assignments: AssignmentRow[]
}

interface StreamGroup {
  key: string
  label: string
  assignments: AssignmentRow[]
}

interface ClassGroup {
  key: string
  label: string
  streams: StreamGroup[]
  total: number
}

// Who an assessment is for: the whole class ("all streams", or every stream ticked) or some streams
const ALL = '__all'
const classOf = (a: AssignmentRow) => a.class_group_name || a.class_name || ''
const streamsOf = (a: AssignmentRow): string[] => {
  const list = (a.target_streams || a.class_stream_name || '').split(',').map(x => x.trim()).filter(Boolean)
  return [...new Set(list)].sort((x, y) => x.localeCompare(y, undefined, { numeric: true }))
}
const isWholeClass = (a: AssignmentRow) => !!a.class_group_name
  || (Number(a.class_stream_count) > 1 && streamsOf(a).length >= Number(a.class_stream_count))
/** "S.1" for the whole class, "S.1 A" for one stream, "S.5 B1, B2, B3" for several */
const audienceLabel = (a: AssignmentRow) => {
  const cls = classOf(a)
  if (!cls) return 'No class'
  if (isWholeClass(a)) return cls
  const streams = streamsOf(a)
  return streams.length ? `${cls} ${streams.join(', ')}` : cls
}

const groupedAssignments = computed<ClassGroup[]>(() => {
  const classMap = new Map<string, { label: string; streamMap: Map<string, StreamGroup>; ids: Set<number> }>()

  for (const a of filteredAssignments.value) {
    const cls = classOf(a)
    const classKey = cls || '__unassigned'
    if (!classMap.has(classKey)) {
      classMap.set(classKey, { label: cls || 'Unassigned class', streamMap: new Map(), ids: new Set() })
    }
    const classEntry = classMap.get(classKey)!
    classEntry.ids.add(a.id)

    const targets = isWholeClass(a)
      ? [{ key: ALL, label: cls || 'All' }]
      : (streamsOf(a).length ? streamsOf(a) : ['']).map(st => ({ key: st || '__none', label: st ? `${cls} ${st}` : 'No stream' }))
    for (const t of targets) {
      if (!classEntry.streamMap.has(t.key)) classEntry.streamMap.set(t.key, { key: t.key, label: t.label, assignments: [] })
      classEntry.streamMap.get(t.key)!.assignments.push(a)
    }
  }

  const groups: ClassGroup[] = Array.from(classMap.entries()).map(([key, value]) => {
    // the whole class first, then its streams in order
    const streams = Array.from(value.streamMap.values()).sort((a, b) =>
      a.key === ALL ? -1 : b.key === ALL ? 1 : a.label.localeCompare(b.label, undefined, { numeric: true }))
    return { key, label: value.label, streams, total: value.ids.size }
  })

  groups.sort((a, b) => {
    if (a.key === '__unassigned') return 1
    if (b.key === '__unassigned') return -1
    return a.label.localeCompare(b.label, undefined, { numeric: true })
  })

  return groups
})

const collapsedClasses = ref<Set<string>>(new Set())

const toggleClassGroup = (key: string) => {
  const next = new Set(collapsedClasses.value)
  if (next.has(key)) {
    next.delete(key)
  } else {
    next.add(key)
  }
  collapsedClasses.value = next
}

const allClassesCollapsed = computed(() =>
  groupedAssignments.value.length > 0 && groupedAssignments.value.every(g => collapsedClasses.value.has(g.key))
)

const toggleAllClasses = () => {
  collapsedClasses.value = allClassesCollapsed.value
    ? new Set()
    : new Set(groupedAssignments.value.map(g => g.key))
}

// Which stream is currently expanded within each class (keyed by class key).
const selectedStreams = ref<Record<string, string>>({})

const toggleStream = (classKey: string, streamKey: string) => {
  selectedStreams.value = {
    ...selectedStreams.value,
    [classKey]: selectedStreams.value[classKey] === streamKey ? '' : streamKey
  }
}

const subjectsForStream = (streamAssignments: AssignmentRow[]): SubjectGroup[] => {
  const bySubject = new Map<string, SubjectGroup>()
  for (const a of streamAssignments) {
    const key = a.subject_name || '__unassigned'
    if (!bySubject.has(key)) {
      bySubject.set(key, { key, label: a.subject_name || 'Unassigned subject', assignments: [] })
    }
    bySubject.get(key)!.assignments.push(a)
  }
  return Array.from(bySubject.values()).sort((a, b) => a.label.localeCompare(b.label))
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const initials = (name: string) => String(name || '?').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
// '30 Aug', with the year only when it is not this year
const shortDate = (d: string) => { const x = new Date(d); return x.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', ...(x.getFullYear() !== new Date().getFullYear() ? { year: 'numeric' } : {}) }) }
const isOverdue = (a: AssignmentRow) => a.status === 'published' && !!a.due_date && new Date(a.due_date).getTime() < Date.now()

// School-wide summary of what is listed (follows the search and filters)
const summaryItems = computed<StatItem[]>(() => {
  const list = filteredAssignments.value
  return [
    { label: 'Assessments', value: list.length, tone: 'indigo' },
    { label: 'Published', value: list.filter(a => a.status === 'published').length, tone: 'emerald' },
    { label: 'Drafts', value: list.filter(a => a.status === 'draft').length, tone: 'amber' },
    { label: 'Scripts handed in', value: list.reduce((t, a) => t + (Number(a.submissions_count) || 0), 0).toLocaleString(), tone: 'sky' },
    { label: 'Teachers', value: new Set(list.map(a => a.teacher_name)).size, tone: 'gray' }
  ]
})

const statusBadge = (status: string) => {
  if (status === 'published') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  if (status === 'draft') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const loadAssignments = async () => {
  loading.value = true
  try {
    const params: Record<string, string> = {}
    if (statusFilter.value) params.status = statusFilter.value
    const response = await axios.get(`${API_BASE}/assignments`, { params })
    if (response.data.success) {
      assignments.value = response.data.data.assignments || []
    }
  } catch (error) {
    console.error('Failed to load assessments:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadAssignments()
})
</script>
