<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">eLibrary</h1>
      <p class="text-gray-600 dark:text-gray-400">Upload PDF or PowerPoint (PPT/PPTX) resources for your classes - students preview them in the browser.</p>
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

    <!-- Actions -->
    <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
      <div class="flex items-center flex-wrap gap-3">
        <select v-model="statusFilter" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        <select
          v-model="subjectFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          :disabled="!assignments?.subjects || assignments.subjects.length === 0"
        >
          <option value="">All Subjects</option>
          <option v-for="subject in assignments?.subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
        </select>

        <select
          v-model="classFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          :disabled="!assignments?.classes || assignments.classes.length === 0"
        >
          <option value="">All Classes</option>
          <option v-for="cls in assignments?.classes" :key="cls.id" :value="cls.id">
            {{ cls.name }} ({{ cls.level }}{{ cls.stream_name ? ' - ' + cls.stream_name : '' }})
          </option>
        </select>

        <select
          v-model="streamFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          :disabled="streamOptions.length === 0"
        >
          <option value="">All Streams</option>
          <option v-for="stream in streamOptions" :key="stream" :value="stream">{{ stream }}</option>
        </select>

        <div v-if="assignmentsError" class="text-red-600 dark:text-red-400 text-sm">{{ assignmentsError }}</div>
      </div>

      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Upload Resource</span>
      </button>
    </div>

    <!-- Books -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading library...</p>
    </div>

    <div v-else-if="filteredBooks.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p class="text-gray-600 dark:text-gray-400 mb-4">{{ books.length === 0 ? 'No resources uploaded yet' : 'No books match your filters' }}</p>
      <button v-if="books.length === 0" @click="openCreateModal" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
        Upload Your First Resource
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
        @click="previewBook = book"
      >
        <div class="p-6">
          <div class="flex items-start justify-between mb-3 gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 class="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">{{ book.title }}</h3>
            </div>
            <span
              class="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0"
              :class="book.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                book.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'"
            >
              {{ book.status.charAt(0).toUpperCase() + book.status.slice(1) }}
            </span>
          </div>

          <p v-if="book.description" class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{{ book.description }}</p>

          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
              {{ book.subject_name || 'Unknown Subject' }}
            </span>
            <span v-if="book.class_group_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              {{ book.class_group_name }} (All Streams)
            </span>
            <span v-else-if="book.class_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {{ book.class_name }}{{ book.class_stream_name ? ' - ' + book.class_stream_name : '' }}
            </span>
            <span class="ml-auto text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{{ formatFileSize(book.file_size) }}</span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500 dark:text-gray-500">Updated {{ formatDate(book.updated_at || book.created_at) }}</span>
            <div class="flex items-center space-x-2">
              <button
                @click.stop="editBook(book)"
                class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Edit"
              >
                <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              <button
                @click.stop="deleteBook(book.id)"
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

    <!-- Upload/Edit Modal -->
    <div v-if="showBookModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ editingBook ? 'Edit Book' : 'Upload Resource' }}
          </h3>
          <button @click="closeBookModal" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6">
          <form @submit.prevent="saveBook">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
              <input
                v-model="bookForm.title"
                type="text"
                required
                placeholder="Enter book/document title..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                v-model="bookForm.description"
                rows="3"
                placeholder="Enter a short description..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                <select
                  v-model="bookForm.subject_id"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  :disabled="!assignments?.subjects || assignments.subjects.length === 0"
                >
                  <option value="">Select Subject</option>
                  <option v-for="subject in assignments?.subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
                </select>
                <p v-if="!assignments?.subjects || assignments.subjects.length === 0" class="text-xs text-red-600 dark:text-red-400 mt-1">
                  No subjects available. Please ensure you are assigned to a department with subjects.
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Class *</label>
                <TeacherClassSelector v-model="bookForm.classTarget" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                <select
                  v-model="bookForm.status"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <label class="flex items-center gap-2 mt-7 px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer h-fit">
                <input v-model="bookForm.allow_download" type="checkbox" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <span class="text-sm text-gray-700 dark:text-gray-300">Allow students to download this file</span>
              </label>
            </div>

            <div v-if="!editingBook" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">File (PDF, PPT, or PPTX) *</label>
              <input
                type="file"
                :accept="LIBRARY_FILE_ACCEPT"
                required
                @change="handleFileSelect"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">PDF, PPT, or PPTX, up to 50MB. Students preview it in-browser.</p>
              <p v-if="fileError" class="text-xs text-red-600 dark:text-red-400 mt-1">{{ fileError }}</p>
            </div>
            <div v-else class="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <div class="flex items-center justify-between gap-3">
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Current file: <span class="font-medium text-gray-700 dark:text-gray-300 uppercase">{{ editingBook.file_type }}</span>
                  <span v-if="editingBook.file_size"> &middot; {{ formatFileSize(editingBook.file_size) }}</span>
                </p>
                <button
                  type="button"
                  @click="showReplaceFile = !showReplaceFile"
                  class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex-shrink-0"
                >
                  {{ showReplaceFile ? 'Cancel' : 'Replace File' }}
                </button>
              </div>
              <div v-if="showReplaceFile" class="mt-3">
                <input
                  type="file"
                  :accept="LIBRARY_FILE_ACCEPT"
                  @change="handleReplaceFileSelect"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">PDF, PPT, or PPTX, up to 50MB. Replaces the file immediately - metadata below is saved separately via "Update Book".</p>
                <p v-if="fileError" class="text-xs text-red-600 dark:text-red-400 mt-1">{{ fileError }}</p>
                <button
                  type="button"
                  @click="replaceFile"
                  :disabled="!replaceFileInput || replacingFile"
                  class="mt-2 px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ replacingFile ? 'Uploading...' : 'Upload Replacement' }}
                </button>
              </div>
            </div>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="closeBookModal"
                class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? 'Saving...' : (editingBook ? 'Update Book' : 'Upload') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Document Preview -->
    <LibraryDocumentViewer v-if="previewBook" :book="previewBook" @close="previewBook = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import LibraryDocumentViewer from '@/components/library/LibraryDocumentViewer.vue'
import TeacherClassSelector from '@/components/teacher/TeacherClassSelector.vue'
import type { LibraryBook, LibraryBookForm } from '@/types/library'
import type { ENoteAssignments } from '@/types/enotes'
import { LIBRARY_FILE_ACCEPT, LIBRARY_FILE_ERROR, isAllowedLibraryFile } from '@/utils/libraryFileValidation'

const API_BASE = '/api'

const books = ref<LibraryBook[]>([])
const assignments = ref<ENoteAssignments | null>(null)
const assignmentsError = ref<string | null>(null)
const loading = ref(false)
const saving = ref(false)
const fileError = ref('')
const showReplaceFile = ref(false)
const replaceFileInput = ref<File | null>(null)
const replacingFile = ref(false)

const statusFilter = ref('')
const subjectFilter = ref('')
const classFilter = ref('')
const streamFilter = ref('')

const showBookModal = ref(false)
const editingBook = ref<LibraryBook | null>(null)
const previewBook = ref<LibraryBook | null>(null)
const bookForm = ref<LibraryBookForm>({
  title: '',
  description: '',
  subject_id: '',
  classTarget: { scope: 'stream', class_id: null, class_group_name: null },
  status: 'draft',
  allow_download: false,
  file: null
})

const stats = computed(() => ({
  total: books.value.length,
  draft: books.value.filter(b => b.status === 'draft').length,
  published: books.value.filter(b => b.status === 'published').length,
  archived: books.value.filter(b => b.status === 'archived').length
}))

const streamOptions = computed(() => {
  const streams = new Set<string>()
  assignments.value?.classes.forEach(cls => {
    if (cls.stream_name) streams.add(cls.stream_name)
  })
  return Array.from(streams).sort()
})

const filteredBooks = computed(() => {
  return books.value.filter(book => {
    const matchesStatus = !statusFilter.value || book.status === statusFilter.value
    const matchesSubject = !subjectFilter.value || book.subject_id === parseInt(subjectFilter.value)
    const matchesClass = !classFilter.value || book.class_id === parseInt(classFilter.value)
    const matchesStream = !streamFilter.value || book.class_stream_name === streamFilter.value
    return matchesStatus && matchesSubject && matchesClass && matchesStream
  })
})

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatFileSize = (bytes: number | null) => {
  if (!bytes) return ''
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

const loadBooks = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${API_BASE}/teacher/library`)
    if (response.data.success) {
      books.value = response.data.data.books || []
    }
  } catch (error) {
    console.error('Failed to load library:', error)
  } finally {
    loading.value = false
  }
}

const loadAssignments = async () => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/enotes/assignments`)
    if (response.data.success) {
      assignments.value = response.data.data
      assignmentsError.value = null
    } else {
      assignmentsError.value = response.data.message || 'Failed to load assignments'
    }
  } catch (error: any) {
    assignmentsError.value = error.response?.data?.message || 'Failed to load assignments. Please ensure you are assigned to a department.'
  }
}

const openCreateModal = () => {
  editingBook.value = null
  fileError.value = ''
  showReplaceFile.value = false
  replaceFileInput.value = null
  bookForm.value = { title: '', description: '', subject_id: '', classTarget: { scope: 'stream', class_id: null, class_group_name: null }, status: 'draft', allow_download: false, file: null }
  showBookModal.value = true
}

const editBook = (book: LibraryBook) => {
  editingBook.value = book
  fileError.value = ''
  showReplaceFile.value = false
  replaceFileInput.value = null
  bookForm.value = {
    title: book.title,
    description: book.description || '',
    subject_id: book.subject_id?.toString() || '',
    classTarget: book.class_group_name
      ? { scope: 'all_streams', class_id: null, class_group_name: book.class_group_name }
      : { scope: 'stream', class_id: book.class_id, class_group_name: null },
    status: book.status,
    allow_download: !!book.allow_download,
    file: null
  }
  showBookModal.value = true
}

const closeBookModal = () => {
  showBookModal.value = false
  editingBook.value = null
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0] || null
  if (file && !isAllowedLibraryFile(file)) {
    fileError.value = LIBRARY_FILE_ERROR
    bookForm.value.file = null
    target.value = ''
    return
  }
  fileError.value = ''
  bookForm.value.file = file
}

const handleReplaceFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0] || null
  if (file && !isAllowedLibraryFile(file)) {
    fileError.value = LIBRARY_FILE_ERROR
    replaceFileInput.value = null
    target.value = ''
    return
  }
  fileError.value = ''
  replaceFileInput.value = file
}

const replaceFile = async () => {
  if (!editingBook.value || !replaceFileInput.value) return
  try {
    replacingFile.value = true
    const formData = new FormData()
    formData.append('file', replaceFileInput.value)

    const response = await axios.post(`${API_BASE}/teacher/library/${editingBook.value.id}/replace-file`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    if (response.data.success) {
      editingBook.value = { ...editingBook.value, ...response.data.data }
      showReplaceFile.value = false
      replaceFileInput.value = null
      await loadBooks()
    }
  } catch (error: any) {
    console.error('Failed to replace file:', error)
    fileError.value = error.response?.data?.message || 'Failed to replace file'
  } finally {
    replacingFile.value = false
  }
}

const saveBook = async () => {
  try {
    saving.value = true

    if (editingBook.value) {
      await axios.put(`${API_BASE}/teacher/library/${editingBook.value.id}`, {
        title: bookForm.value.title,
        description: bookForm.value.description,
        subject_id: bookForm.value.subject_id,
        scope: bookForm.value.classTarget.scope,
        class_id: bookForm.value.classTarget.class_id,
        class_group_name: bookForm.value.classTarget.class_group_name,
        status: bookForm.value.status,
        allow_download: bookForm.value.allow_download
      })
    } else {
      if (!bookForm.value.file) {
        alert('Please select a PDF, PPT, or PPTX file')
        return
      }
      const formData = new FormData()
      formData.append('title', bookForm.value.title)
      formData.append('description', bookForm.value.description)
      formData.append('subject_id', bookForm.value.subject_id)
      formData.append('scope', bookForm.value.classTarget.scope)
      if (bookForm.value.classTarget.class_id !== null) formData.append('class_id', String(bookForm.value.classTarget.class_id))
      if (bookForm.value.classTarget.class_group_name !== null) formData.append('class_group_name', bookForm.value.classTarget.class_group_name)
      formData.append('status', bookForm.value.status)
      formData.append('allow_download', bookForm.value.allow_download ? '1' : '0')
      formData.append('file', bookForm.value.file)

      await axios.post(`${API_BASE}/teacher/library`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }

    closeBookModal()
    await loadBooks()
  } catch (error: any) {
    console.error('Failed to save book:', error)
    alert(error.response?.data?.message || 'Failed to save book')
  } finally {
    saving.value = false
  }
}

const deleteBook = async (id: number) => {
  if (!confirm('Are you sure you want to delete this book?')) return
  try {
    await axios.delete(`${API_BASE}/teacher/library/${id}`)
    await loadBooks()
  } catch (error) {
    console.error('Failed to delete book:', error)
  }
}

onMounted(async () => {
  await Promise.all([loadBooks(), loadAssignments()])
})
</script>
