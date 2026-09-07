<template>
  <div>
    <div class="flex items-center gap-4 mb-6">
      <div class="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm flex-shrink-0">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">Assessments</h1>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">School-wide assignment oversight</p>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-3 mb-6">
      <div class="relative flex-1 min-w-[200px] max-w-sm">
        <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 114 10.5a6.5 6.5 0 0113 0z"></path>
        </svg>
        <input
          v-model="search"
          type="text"
          placeholder="Search by title or teacher..."
          class="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white"
        >
      </div>

      <select v-model="statusFilter" @change="loadAssignments" class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
        <option value="">All Status</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>

      <select v-model="departmentFilter" class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
        <option value="">All Departments</option>
        <option v-for="dept in departmentOptions" :key="dept" :value="dept">{{ dept }}</option>
      </select>

      <span v-if="!loading && assignments.length > 0" class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {{ filteredAssignments.length }} of {{ assignments.length }} shown
      </span>
    </div>

    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading assessments...</p>
    </div>

    <div v-else-if="assignments.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <p class="text-gray-500 dark:text-gray-400">No assessments found</p>
    </div>

    <div v-else-if="filteredAssignments.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <p class="text-gray-500 dark:text-gray-400">No assessments match this filter</p>
    </div>

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
                class="group relative flex flex-col items-center justify-center gap-1 w-24 h-20 rounded-xl border-2 transition-all"
                :class="selectedStreams[group.key] === stream.key
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-md'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 hover:border-indigo-300 hover:shadow-sm'"
              >
                <span
                  class="text-lg font-bold"
                  :class="selectedStreams[group.key] === stream.key ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-800 dark:text-gray-200'"
                >
                  {{ stream.label }}
                </span>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ stream.assignments.length }} item{{ stream.assignments.length === 1 ? '' : 's' }}</span>
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
                    class="bg-gray-50 dark:bg-gray-900/40 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div class="min-w-0">
                        <p class="text-sm font-semibold text-gray-900 dark:text-white truncate" :title="a.title">{{ a.title }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ a.teacher_name }}</p>
                      </div>
                      <span class="flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap" :class="statusBadge(a.status)">{{ capitalize(a.status) }}</span>
                    </div>

                    <div class="mt-3 flex flex-wrap gap-1.5">
                      <span v-if="a.department_name" class="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
                        {{ a.department_name }}
                      </span>
                      <span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        Due {{ formatDate(a.due_date) }}
                      </span>
                      <span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        {{ a.submissions_count }} submission{{ a.submissions_count === 1 ? '' : 's' }}
                      </span>
                    </div>

                    <RouterLink
                      :to="`/admin/assessments/${a.id}/preview`"
                      class="mt-3 inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      Preview as Student
                    </RouterLink>
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
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

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
  department_name: string | null
  teacher_name: string
  submissions_count: number
}

const API_BASE = '/api/admin'

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

const groupedAssignments = computed<ClassGroup[]>(() => {
  const classMap = new Map<string, { label: string; streamMap: Map<string, StreamGroup> }>()

  for (const a of filteredAssignments.value) {
    const classKey = a.class_name || '__unassigned'
    const classLabel = a.class_name || 'Unassigned class'

    if (!classMap.has(classKey)) {
      classMap.set(classKey, { label: classLabel, streamMap: new Map() })
    }
    const classEntry = classMap.get(classKey)!

    const streamKey = a.class_stream_name || '__none'
    if (!classEntry.streamMap.has(streamKey)) {
      classEntry.streamMap.set(streamKey, { key: streamKey, label: a.class_stream_name || 'No stream', assignments: [] })
    }
    classEntry.streamMap.get(streamKey)!.assignments.push(a)
  }

  const groups: ClassGroup[] = Array.from(classMap.entries()).map(([key, value]) => {
    const streams = Array.from(value.streamMap.values()).sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }))
    return {
      key,
      label: value.label,
      streams,
      total: streams.reduce((sum, s) => sum + s.assignments.length, 0)
    }
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
