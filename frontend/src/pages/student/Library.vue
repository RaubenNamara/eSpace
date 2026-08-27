<template>
  <div>
    <template v-if="!activeSubjectId">
      <!-- Header -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-indigo-500/20 p-4 sm:p-5 mb-6">
        <div class="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10"></div>
        <div class="absolute -right-3 bottom-0 w-24 h-24 rounded-full bg-white/10"></div>
        <div class="relative flex items-center gap-3 mb-3">
          <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-sm flex-shrink-0 ring-2 ring-white/20">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <div class="min-w-0">
            <h1 class="text-lg sm:text-2xl font-bold text-white leading-tight">eLibrary</h1>
            <p class="text-xs sm:text-sm text-indigo-100">PDF resources shared by your teachers</p>
          </div>
        </div>

        <!-- Quick stats -->
        <div v-if="!loading && subjectGroups.length > 0" class="relative flex flex-wrap items-center gap-2 mb-3">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 backdrop-blur-sm text-white">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            {{ books.length }} {{ books.length === 1 ? 'book' : 'books' }}
          </span>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 backdrop-blur-sm text-white">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            {{ subjectGroups.length }} {{ subjectGroups.length === 1 ? 'subject' : 'subjects' }}
          </span>
        </div>

        <!-- Search -->
        <div class="relative">
          <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search subjects or books..."
            class="relative w-full pl-9 pr-4 py-2 rounded-lg border-0 shadow-md focus:ring-2 focus:ring-white/50 bg-white text-gray-900 dark:bg-gray-800 dark:text-white transition-colors"
          >
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        <div v-for="i in 12" :key="i" class="animate-pulse">
          <div class="aspect-[3/4] rounded-xl bg-gray-200 dark:bg-gray-700 mb-3"></div>
          <div class="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 flex items-start gap-3">
        <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-800 dark:text-red-200">{{ error }}</p>
      </div>

      <template v-else-if="filteredSubjectGroups.length > 0">
        <!-- Recently Added shelf -->
        <div v-if="!searchQuery && recentBooks.length > 0" class="mb-10">
          <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Recently Added</h2>
          <div class="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scroll-smooth">
            <button
              v-for="book in recentBooks"
              :key="'recent-' + book.id"
              @click="previewBook = book"
              class="group flex-shrink-0 w-32 sm:w-36 text-left"
            >
              <BookCover :book="book" size="sm" />
              <p class="mt-2 text-xs font-medium text-gray-800 dark:text-gray-200 line-clamp-2 leading-snug">{{ book.title }}</p>
              <p class="text-[11px] text-gray-400 dark:text-gray-500 truncate">{{ book.subject_name || 'General' }}</p>
            </button>
          </div>
        </div>

        <!-- Subject shelves -->
        <h2 v-if="!searchQuery" class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Browse by Subject</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <button
            v-for="group in filteredSubjectGroups"
            :key="group.id"
            @click="activeSubjectId = group.id"
            class="text-left bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-6 group overflow-hidden relative"
          >
            <div
              class="absolute -right-6 -top-6 w-28 h-28 rounded-full opacity-10 bg-gradient-to-br transition-transform duration-300 group-hover:scale-125"
              :class="subjectPalette(group.id).vivid"
            ></div>
            <div class="relative flex items-start justify-between mb-4">
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-sm flex-shrink-0 bg-gradient-to-br"
                :class="subjectPalette(group.id).vivid"
              >
                {{ subjectInitials(group) }}
              </div>
              <svg class="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
            <h3 class="relative text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
              {{ group.name }}
            </h3>
            <span
              class="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
              :class="subjectPalette(group.id).softText"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              {{ group.books.length }} {{ group.books.length === 1 ? 'book' : 'books' }}
            </span>
          </button>
        </div>
      </template>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {{ subjectGroups.length === 0 ? 'No books yet' : 'No subjects match your search' }}
        </h3>
        <p class="text-gray-500 dark:text-gray-400">
          {{ subjectGroups.length === 0 ? 'Your teachers haven\'t shared any PDFs with your department yet.' : 'Try a different search.' }}
        </p>
      </div>
    </template>

    <!-- Subject Bookshelf -->
    <template v-else>
      <div class="flex items-center gap-2 mb-2">
        <button
          @click="activeSubjectId = null"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          All Subjects
        </button>
        <span class="text-gray-300 dark:text-gray-600">/</span>
        <span class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ activeSubject?.name }}</span>
      </div>

      <div class="flex items-center gap-3 mb-6">
        <div
          class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br flex-shrink-0"
          :class="activeSubject ? subjectPalette(activeSubject.id).vivid : ''"
        >
          {{ activeSubject ? subjectInitials(activeSubject) : '' }}
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white leading-tight">{{ activeSubject?.name }}</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ activeSubjectBooks.length }} {{ activeSubjectBooks.length === 1 ? 'book' : 'books' }}</p>
        </div>
      </div>

      <div v-if="activeSubjectBooks.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 sm:gap-6">
        <button
          v-for="book in activeSubjectBooks"
          :key="book.id"
          @click="previewBook = book"
          class="group text-left"
        >
          <BookCover :book="book" />
          <h3 class="mt-3 text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {{ book.title }}
          </h3>
          <p v-if="book.teacher_first_name" class="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
            {{ book.teacher_first_name }} {{ book.teacher_last_name }}
          </p>
          <p class="text-xs text-gray-400 dark:text-gray-500">{{ formatFileSize(book.file_size) }}</p>
        </button>
      </div>

      <div v-else class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <p class="text-gray-500 dark:text-gray-400">No books in this subject yet.</p>
      </div>
    </template>

    <!-- Document Preview -->
    <LibraryDocumentViewer v-if="previewBook" :book="previewBook" @close="previewBook = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import LibraryDocumentViewer from '@/components/library/LibraryDocumentViewer.vue'
import BookCover from '@/components/library/BookCover.vue'
import type { LibraryBook } from '@/types/library'

interface SubjectGroup {
  id: number
  name: string
  code?: string
  books: LibraryBook[]
}

const API_BASE = '/api'

const books = ref<LibraryBook[]>([])
const searchQuery = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const activeSubjectId = ref<number | null>(null)
const previewBook = ref<LibraryBook | null>(null)

const palettes = [
  { vivid: 'from-emerald-500 to-teal-600', softText: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { vivid: 'from-blue-500 to-cyan-600', softText: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { vivid: 'from-indigo-500 to-purple-600', softText: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
  { vivid: 'from-amber-500 to-orange-600', softText: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  { vivid: 'from-rose-500 to-pink-600', softText: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
  { vivid: 'from-violet-500 to-fuchsia-600', softText: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { vivid: 'from-sky-500 to-blue-600', softText: 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300' },
  { vivid: 'from-teal-500 to-cyan-600', softText: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' }
]
const subjectPalette = (id: number) => palettes[Math.abs(id) % palettes.length]
const subjectInitials = (subj: { name: string; code?: string }) => {
  if (subj.code) return subj.code.slice(0, 3).toUpperCase()
  return subj.name.split(/\s+/).filter(Boolean).map(w => w[0]).join('').slice(0, 3).toUpperCase() || '?'
}

const subjectGroups = computed<SubjectGroup[]>(() => {
  const map = new Map<number, SubjectGroup>()
  books.value.forEach(book => {
    const sid = book.subject_id || 0
    if (!map.has(sid)) {
      map.set(sid, { id: sid, name: book.subject_name || 'General', code: book.subject_code, books: [] })
    }
    map.get(sid)!.books.push(book)
  })
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
})

const filteredSubjectGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return subjectGroups.value
  return subjectGroups.value.filter(group => {
    if (group.name.toLowerCase().includes(q)) return true
    return group.books.some(book => book.title.toLowerCase().includes(q) || (book.description || '').toLowerCase().includes(q))
  })
})

const recentBooks = computed(() => {
  return [...books.value]
    .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime())
    .slice(0, 10)
})

const activeSubject = computed(() => subjectGroups.value.find(g => g.id === activeSubjectId.value) || null)
const activeSubjectBooks = computed(() => activeSubject.value?.books || [])

const formatFileSize = (bytes: number | null) => {
  if (!bytes) return ''
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

const loadLibrary = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(`${API_BASE}/student/library`)
    if (response.data.success) {
      books.value = response.data.data.books || []
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load library'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadLibrary()
})
</script>
