<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">eLibrary</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Every PDF resource uploaded by teachers across the school, for review and moderation.</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400">Total Books</p>
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
            @change="fetchBooks"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <select
            v-model="departmentFilter"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            @change="fetchBooks"
          >
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
          </select>
        </div>
      </div>

      <!-- Books -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
        <p class="mt-4 text-gray-500 dark:text-gray-400">Loading library...</p>
      </div>

      <div v-else-if="books.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        <svg class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <p class="text-gray-600 dark:text-gray-400">No books match your filters</p>
      </div>

      <div v-else>
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ books.length }} book{{ books.length === 1 ? '' : 's' }} across {{ groupedBooks.length }} class{{ groupedBooks.length === 1 ? '' : 'es' }}
          </p>
          <button @click="toggleAllClasses" class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
            {{ allClassesCollapsed ? 'Expand all' : 'Collapse all' }}
          </button>
        </div>

        <!-- Grouped by class, with each class's streams shown as clickable cards -->
        <div class="space-y-4">
          <div
            v-for="group in groupedBooks"
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
                {{ group.total }} book{{ group.total === 1 ? '' : 's' }}
              </span>
            </button>

            <div v-if="!collapsedClasses.has(group.key)" class="border-t border-gray-100 dark:border-gray-700 px-6 py-5">
              <!-- Stream cards - click a stream to see its books below -->
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
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ stream.books.length }} book{{ stream.books.length === 1 ? '' : 's' }}</span>
                </button>
              </div>

              <!-- Subjects and books for the selected stream -->
              <div v-if="selectedStreams[group.key]" class="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                <div
                  v-for="subject in subjectsForStream(group.streams.find(s => s.key === selectedStreams[group.key])?.books || [])"
                  :key="subject.key"
                  class="py-5 first:pt-0"
                >
                  <h3 class="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
                    {{ subject.label }}
                    <span class="ml-1 font-normal text-gray-400 dark:text-gray-500">({{ subject.books.length }})</span>
                  </h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div
                      v-for="book in subject.books"
                      :key="book.id"
                      class="bg-gray-50 dark:bg-gray-900/40 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                    >
                      <div class="p-6">
                        <div class="flex items-start justify-between mb-3 gap-2">
                          <div class="flex items-center gap-2 min-w-0 cursor-pointer" @click="previewBook = book">
                            <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                              </svg>
                            </div>
                            <h4 class="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">{{ book.title }}</h4>
                          </div>
                          <span
                            class="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 capitalize"
                            :class="book.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              book.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'"
                          >
                            {{ book.status }}
                          </span>
                        </div>

                        <p v-if="book.description" class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ book.description }}</p>

                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">
                          By {{ book.teacher_first_name ? `${book.teacher_first_name} ${book.teacher_last_name}` : 'Unknown teacher' }}
                        </p>

                        <div class="flex flex-wrap items-center gap-2 mb-4">
                          <span v-if="book.department_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            {{ book.department_name }}
                          </span>
                          <span class="ml-auto text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{{ formatFileSize(book.file_size) }}</span>
                        </div>

                        <div class="flex items-center justify-between gap-2">
                          <select
                            :value="book.status"
                            @change="changeStatus(book, ($event.target as HTMLSelectElement).value)"
                            class="text-xs px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                          </select>
                          <button
                            @click="deleteBook(book)"
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

    <!-- Document Preview -->
    <LibraryDocumentViewer v-if="previewBook" :book="previewBook" @close="previewBook = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { apiService } from '../../services/api'
import LibraryDocumentViewer from '../../components/library/LibraryDocumentViewer.vue'
import type { LibraryBook } from '../../types/library'

interface Department {
  id: number
  name: string
}

const books = ref<LibraryBook[]>([])
const departments = ref<Department[]>([])
const stats = ref({ total: 0, draft: 0, published: 0, archived: 0 })
const loading = ref(false)
const search = ref('')
const statusFilter = ref('')
const departmentFilter = ref('')
const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const previewBook = ref<LibraryBook | null>(null)

// Books arranged by class, with each class's streams shown as clickable cards - clicking a
// stream reveals its books grouped by subject.
interface SubjectGroup {
  key: string
  label: string
  books: LibraryBook[]
}

interface StreamGroup {
  key: string
  label: string
  books: LibraryBook[]
}

interface ClassGroup {
  key: string
  label: string
  streams: StreamGroup[]
  total: number
}

const groupedBooks = computed<ClassGroup[]>(() => {
  const classMap = new Map<string, { label: string; streamMap: Map<string, StreamGroup> }>()

  for (const book of books.value) {
    const classKey = book.class_name || '__unassigned'
    const classLabel = book.class_name || 'Unassigned class'

    if (!classMap.has(classKey)) {
      classMap.set(classKey, { label: classLabel, streamMap: new Map() })
    }
    const classEntry = classMap.get(classKey)!

    const streamKey = book.class_stream_name || '__none'
    if (!classEntry.streamMap.has(streamKey)) {
      classEntry.streamMap.set(streamKey, { key: streamKey, label: book.class_stream_name || 'No stream', books: [] })
    }
    classEntry.streamMap.get(streamKey)!.books.push(book)
  }

  const groups: ClassGroup[] = Array.from(classMap.entries()).map(([key, value]) => {
    const streams = Array.from(value.streamMap.values()).sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }))
    return {
      key,
      label: value.label,
      streams,
      total: streams.reduce((sum, s) => sum + s.books.length, 0)
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
  groupedBooks.value.length > 0 && groupedBooks.value.every(g => collapsedClasses.value.has(g.key))
)

const toggleAllClasses = () => {
  collapsedClasses.value = allClassesCollapsed.value
    ? new Set()
    : new Set(groupedBooks.value.map(g => g.key))
}

// Which stream is currently expanded within each class (keyed by class key).
const selectedStreams = ref<Record<string, string>>({})

const toggleStream = (classKey: string, streamKey: string) => {
  selectedStreams.value = {
    ...selectedStreams.value,
    [classKey]: selectedStreams.value[classKey] === streamKey ? '' : streamKey
  }
}

const subjectsForStream = (streamBooks: LibraryBook[]): SubjectGroup[] => {
  const bySubject = new Map<string, SubjectGroup>()
  for (const book of streamBooks) {
    const key = book.subject_name || '__unassigned'
    if (!bySubject.has(key)) {
      bySubject.set(key, { key, label: book.subject_name || 'Unassigned subject', books: [] })
    }
    bySubject.get(key)!.books.push(book)
  }
  return Array.from(bySubject.values()).sort((a, b) => a.label.localeCompare(b.label))
}

const formatFileSize = (bytes: number | null) => {
  if (!bytes) return ''
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
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

const fetchBooks = async () => {
  loading.value = true
  try {
    const params: any = {}
    if (search.value) params.search = search.value
    if (statusFilter.value) params.status = statusFilter.value
    if (departmentFilter.value) params.department_id = departmentFilter.value

    const response = await apiService.get('/admin/library', params)

    if (response.data.success) {
      books.value = response.data.data.books || []
      stats.value = response.data.data.stats
    }
  } catch (error) {
    console.error('Failed to fetch library books:', error)
  } finally {
    loading.value = false
  }
}

const debouncedSearch = () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value)
  searchTimeout.value = setTimeout(() => {
    fetchBooks()
  }, 500)
}

const changeStatus = async (book: LibraryBook, status: string) => {
  try {
    await apiService.put(`/admin/library/${book.id}`, { status })
    await fetchBooks()
  } catch (error: any) {
    console.error('Failed to update book status:', error)
    alert(error.response?.data?.message || 'Failed to update book status')
  }
}

const deleteBook = async (book: LibraryBook) => {
  if (!confirm(`Are you sure you want to delete "${book.title}"? This action cannot be undone.`)) return

  try {
    await apiService.delete(`/admin/library/${book.id}`)
    await fetchBooks()
  } catch (error: any) {
    console.error('Failed to delete book:', error)
    alert(error.response?.data?.message || 'Failed to delete book')
  }
}

onMounted(() => {
  fetchDepartments()
  fetchBooks()
})
</script>
