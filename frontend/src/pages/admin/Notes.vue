<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">eNotes</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Every eNotes topic authored by teachers across the school, for review and moderation.</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400">Total Topics</p>
          <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400">Draft</p>
          <p class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{{ stats.draft }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400">Published</p>
          <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ stats.published }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400">Archived</p>
          <p class="text-3xl font-bold text-gray-600 dark:text-gray-400">{{ stats.archived }}</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-100 dark:border-gray-700">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <input
              v-model="search"
              type="text"
              placeholder="Search by title, description, or teacher name..."
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              @input="debouncedSearch"
            >
          </div>
          <select
            v-model="statusFilter"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            @change="fetchTopics"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <select
            v-model="departmentFilter"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            @change="fetchTopics"
          >
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
          </select>
        </div>
      </div>

      <!-- Teacher Leaderboard -->
      <div v-if="teacherLeaderboard.length > 0" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 mb-6 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Topics by Teacher</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Who has published the most eNotes, and in which classes (reflects the filters above).</p>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Teacher</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Department</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Topics by Class</th>
                <th class="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-for="row in teacherLeaderboard" :key="row.teacherId">
                <td class="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ row.name }}</td>
                <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.department }}</td>
                <td class="px-6 py-3">
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="cls in row.classes"
                      :key="cls.name"
                      class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {{ cls.name }} &times; {{ cls.count }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-3 whitespace-nowrap text-right text-sm font-bold text-gray-900 dark:text-white">{{ row.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Topics -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
        <p class="mt-4 text-gray-500 dark:text-gray-400">Loading eNotes...</p>
      </div>

      <div v-else-if="topics.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        <svg class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
        <p class="text-gray-600 dark:text-gray-400">No topics match your filters</p>
      </div>

      <div v-else>
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ topics.length }} topic{{ topics.length === 1 ? '' : 's' }} across {{ groupedTopics.length }} class{{ groupedTopics.length === 1 ? '' : 'es' }}
          </p>
          <button @click="toggleAllClasses" class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
            {{ allClassesCollapsed ? 'Expand all' : 'Collapse all' }}
          </button>
        </div>

        <!-- Grouped by class, then by subject within each class -->
        <div class="space-y-4">
          <div
            v-for="group in groupedTopics"
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
                {{ group.total }} topic{{ group.total === 1 ? '' : 's' }}
              </span>
            </button>

            <div v-if="!collapsedClasses.has(group.key)" class="border-t border-gray-100 dark:border-gray-700 px-6 py-5">
              <!-- Stream cards - click a stream to see its topics below -->
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="stream in group.streams"
                  :key="stream.key"
                  @click="toggleStream(group.key, stream.key)"
                  class="group relative flex flex-col items-center justify-center gap-1 w-24 h-20 rounded-xl border-2 transition-all"
                  :class="selectedStreams[group.key] === stream.key
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 shadow-md'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 hover:border-emerald-300 hover:shadow-sm'"
                >
                  <span
                    class="text-lg font-bold"
                    :class="selectedStreams[group.key] === stream.key ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-800 dark:text-gray-200'"
                  >
                    {{ stream.label }}
                  </span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ stream.topics.length }} topic{{ stream.topics.length === 1 ? '' : 's' }}</span>
                </button>
              </div>

              <!-- Subjects and topics for the selected stream -->
              <div v-if="selectedStreams[group.key]" class="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                <div
                  v-for="subject in subjectsForStream(group.streams.find(s => s.key === selectedStreams[group.key])?.topics || [])"
                  :key="subject.key"
                  class="py-5 first:pt-0"
                >
                <h3 class="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
                  {{ subject.label }}
                  <span class="ml-1 font-normal text-gray-400 dark:text-gray-500">({{ subject.topics.length }})</span>
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div
                    v-for="topic in subject.topics"
                    :key="topic.id"
                    class="bg-gray-50 dark:bg-gray-900/40 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div class="p-6">
                      <div class="flex items-start justify-between mb-3 gap-2">
                        <div class="flex items-center gap-2 min-w-0 cursor-pointer" @click="openViewer(topic)">
                          <div class="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                          </div>
                          <h4 class="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">{{ topic.title }}</h4>
                        </div>
                        <span
                          class="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 capitalize"
                          :class="topic.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            topic.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'"
                        >
                          {{ topic.status }}
                        </span>
                      </div>

                      <p v-if="topic.description" class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ topic.description }}</p>

                      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        By {{ topic.teacher_first_name ? `${topic.teacher_first_name} ${topic.teacher_last_name}` : 'Unknown teacher' }}
                      </p>

                      <div class="flex flex-wrap items-center gap-2 mb-4">
                        <span v-if="topic.department_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          {{ topic.department_name }}
                        </span>
                        <span class="ml-auto text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{{ topic.total_pages }} page{{ topic.total_pages === 1 ? '' : 's' }}</span>
                      </div>

                      <div class="mb-4">
                        <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Class</label>
                        <select
                          :value="topic.class_id ?? ''"
                          @change="assignClass(topic, ($event.target as HTMLSelectElement).value)"
                          class="w-full text-xs px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">Unassigned</option>
                          <option v-for="cls in classOptions" :key="cls.id" :value="cls.id">{{ cls.label }}</option>
                        </select>
                      </div>

                      <div class="flex items-center justify-between gap-2">
                        <select
                          :value="topic.status"
                          @change="changeStatus(topic, ($event.target as HTMLSelectElement).value)"
                          class="text-xs px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </select>
                        <div class="flex items-center gap-1">
                          <button
                            @click="openViewer(topic)"
                            class="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                            title="View content"
                          >
                            <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                          </button>
                          <button
                            @click="deleteTopic(topic)"
                            class="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
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
      </div>
    </div>

    <!-- Content Viewer -->
    <TopicViewer
      v-if="viewingTopic"
      :topic="(viewingTopic as any)"
      :all-topics="(topics as any)"
      @close="viewingTopic = null"
      @next-topic="goToAdjacentTopic(1)"
      @previous-topic="goToAdjacentTopic(-1)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { apiService } from '../../services/api'
import TopicViewer from '../../components/student/TopicViewer.vue'
import type { ENoteTopic } from '../../types/enotes'

interface Department {
  id: number
  name: string
}

interface ClassRow {
  id: number
  name: string
  level: string
  stream_name: string
}

const topics = ref<ENoteTopic[]>([])
const departments = ref<Department[]>([])
const classes = ref<ClassRow[]>([])
const stats = ref({ total: 0, draft: 0, published: 0, archived: 0 })
const loading = ref(false)
const search = ref('')
const statusFilter = ref('')
const departmentFilter = ref('')
const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const viewingTopic = ref<ENoteTopic | null>(null)

// Options for the per-topic "assign to class" dropdown, sorted the same way class streams
// are grouped elsewhere on this page.
const classOptions = computed(() => {
  return classes.value
    .map(c => ({ id: c.id, label: `${c.name} - ${c.stream_name} (${c.level})` }))
    .sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }))
})

// Who has published the most eNotes, broken down by class - answers "which teacher has put up
// more topics, and in which class" directly from whatever's currently loaded (respects filters).
const teacherLeaderboard = computed(() => {
  const byTeacher = new Map<number, { teacherId: number; name: string; department: string; total: number; classes: Map<string, number> }>()

  for (const topic of topics.value) {
    const teacherId = topic.teacher_id
    if (!byTeacher.has(teacherId)) {
      byTeacher.set(teacherId, {
        teacherId,
        name: topic.teacher_first_name ? `${topic.teacher_first_name} ${topic.teacher_last_name}` : 'Unknown teacher',
        department: topic.department_name || '—',
        total: 0,
        classes: new Map()
      })
    }

    const entry = byTeacher.get(teacherId)!
    entry.total++

    const className = topic.class_name
      ? `${topic.class_name}${topic.class_stream_name ? '-' + topic.class_stream_name : ''}`
      : 'Unassigned'
    entry.classes.set(className, (entry.classes.get(className) || 0) + 1)
  }

  return Array.from(byTeacher.values())
    .map(entry => ({
      ...entry,
      classes: Array.from(entry.classes.entries()).map(([name, count]) => ({ name, count }))
    }))
    .sort((a, b) => b.total - a.total)
})

// Topics arranged by class, with each class's streams shown as clickable cards - clicking a
// stream reveals its topics grouped by subject. Matches how a teacher/admin actually thinks
// about "what's been written for S.2-East Geography" rather than a flat list.
interface SubjectGroup {
  key: string
  label: string
  topics: ENoteTopic[]
}

interface StreamGroup {
  key: string
  label: string
  topics: ENoteTopic[]
}

interface ClassGroup {
  key: string
  label: string
  streams: StreamGroup[]
  total: number
}

const groupedTopics = computed<ClassGroup[]>(() => {
  const classMap = new Map<string, { label: string; streamMap: Map<string, StreamGroup> }>()

  for (const topic of topics.value) {
    const classKey = topic.class_name || '__unassigned'
    const classLabel = topic.class_name || 'Unassigned class'

    if (!classMap.has(classKey)) {
      classMap.set(classKey, { label: classLabel, streamMap: new Map() })
    }
    const classEntry = classMap.get(classKey)!

    const streamKey = topic.class_stream_name || '__none'
    if (!classEntry.streamMap.has(streamKey)) {
      classEntry.streamMap.set(streamKey, { key: streamKey, label: topic.class_stream_name || 'No stream', topics: [] })
    }
    classEntry.streamMap.get(streamKey)!.topics.push(topic)
  }

  const groups: ClassGroup[] = Array.from(classMap.entries()).map(([key, value]) => {
    const streams = Array.from(value.streamMap.values()).sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }))
    return {
      key,
      label: value.label,
      streams,
      total: streams.reduce((sum, s) => sum + s.topics.length, 0)
    }
  })

  groups.sort((a, b) => {
    if (a.key === '__unassigned') return 1
    if (b.key === '__unassigned') return -1
    return a.label.localeCompare(b.label, undefined, { numeric: true })
  })

  return groups
})

// Which stream is currently expanded within each class (keyed by class key). Clicking the
// already-selected stream's card collapses it again.
const selectedStreams = ref<Record<string, string>>({})

const toggleStream = (classKey: string, streamKey: string) => {
  selectedStreams.value = {
    ...selectedStreams.value,
    [classKey]: selectedStreams.value[classKey] === streamKey ? '' : streamKey
  }
}

const subjectsForStream = (streamTopics: ENoteTopic[]): SubjectGroup[] => {
  const bySubject = new Map<string, SubjectGroup>()
  for (const topic of streamTopics) {
    const key = topic.subject_name || '__unassigned'
    if (!bySubject.has(key)) {
      bySubject.set(key, { key, label: topic.subject_name || 'Unassigned subject', topics: [] })
    }
    bySubject.get(key)!.topics.push(topic)
  }
  return Array.from(bySubject.values()).sort((a, b) => a.label.localeCompare(b.label))
}

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
  groupedTopics.value.length > 0 && groupedTopics.value.every(g => collapsedClasses.value.has(g.key))
)

const toggleAllClasses = () => {
  collapsedClasses.value = allClassesCollapsed.value
    ? new Set()
    : new Set(groupedTopics.value.map(g => g.key))
}

const fetchDepartments = async () => {
  try {
    const response = await apiService.get('/admin/departments')
    if (response.data.success) {
      departments.value = response.data.data || []
    }
  } catch (error) {
    console.error('Failed to fetch departments:', error)
  }
}

const fetchClasses = async () => {
  try {
    const response = await apiService.get('/admin/classes')
    if (response.data.success) {
      classes.value = response.data.data || []
    }
  } catch (error) {
    console.error('Failed to fetch classes:', error)
  }
}

// Classes start collapsed by default (only on the very first load, so a group the admin has
// deliberately opened doesn't snap shut again after a status/class change refetches the list).
let collapseInitialized = false

const fetchTopics = async () => {
  loading.value = true
  try {
    const params: any = {}
    if (search.value) params.search = search.value
    if (statusFilter.value) params.status = statusFilter.value
    if (departmentFilter.value) params.department_id = departmentFilter.value

    const response = await apiService.get('/admin/enotes', params)

    if (response.data.success) {
      topics.value = response.data.data.topics || []
      stats.value = response.data.data.stats

      if (!collapseInitialized) {
        collapsedClasses.value = new Set(groupedTopics.value.map(g => g.key))
        collapseInitialized = true
      }
    }
  } catch (error) {
    console.error('Failed to fetch eNotes topics:', error)
  } finally {
    loading.value = false
  }
}

const debouncedSearch = () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value)
  searchTimeout.value = setTimeout(() => {
    fetchTopics()
  }, 500)
}

const changeStatus = async (topic: ENoteTopic, status: string) => {
  try {
    await apiService.put(`/admin/enotes/${topic.id}`, { status })
    await fetchTopics()
  } catch (error: any) {
    console.error('Failed to update topic status:', error)
    alert(error.response?.data?.message || 'Failed to update topic status')
  }
}

const assignClass = async (topic: ENoteTopic, value: string) => {
  try {
    const classId = value === '' ? null : Number(value)
    await apiService.put(`/admin/enotes/${topic.id}/class`, { class_id: classId })
    await fetchTopics()
  } catch (error: any) {
    console.error('Failed to assign topic class:', error)
    alert(error.response?.data?.message || 'Failed to assign topic class')
  }
}

const fetchTopicDetail = async (id: number): Promise<ENoteTopic | null> => {
  try {
    const response = await apiService.get(`/admin/enotes/${id}`)
    return response.data.success ? response.data.data : null
  } catch (error) {
    console.error('Failed to fetch topic detail:', error)
    return null
  }
}

const openViewer = async (topic: ENoteTopic) => {
  viewingTopic.value = await fetchTopicDetail(topic.id)
}

const goToAdjacentTopic = async (direction: 1 | -1) => {
  if (!viewingTopic.value) return
  const currentIndex = topics.value.findIndex(t => t.id === viewingTopic.value!.id)
  const nextIndex = currentIndex + direction
  if (nextIndex < 0 || nextIndex >= topics.value.length) return
  viewingTopic.value = await fetchTopicDetail(topics.value[nextIndex].id)
}

const deleteTopic = async (topic: ENoteTopic) => {
  if (!confirm(`Are you sure you want to delete "${topic.title}"? This action cannot be undone.`)) return

  try {
    await apiService.delete(`/admin/enotes/${topic.id}`)
    await fetchTopics()
  } catch (error: any) {
    console.error('Failed to delete topic:', error)
    alert(error.response?.data?.message || 'Failed to delete topic')
  }
}

onMounted(() => {
  fetchDepartments()
  fetchClasses()
  fetchTopics()
})
</script>
