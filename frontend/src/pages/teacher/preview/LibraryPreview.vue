<template>
  <div>
    <PreviewBanner module-label="eLibrary" />

    <div class="flex items-center gap-2 mb-6">
      <RouterLink to="/teacher/preview" class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        Back to Preview
      </RouterLink>
      <span v-if="activeSubjectId" class="text-gray-300 dark:text-gray-600">/</span>
      <button v-if="activeSubjectId" @click="activeSubjectId = null" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">All Subjects</button>
    </div>

    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
      <div v-for="i in 10" :key="i" class="animate-pulse">
        <div class="aspect-[3/4] rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>

    <template v-else-if="!activeSubjectId">
      <div v-if="subjectGroups.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <p class="text-gray-500 dark:text-gray-400">No published books for this class yet.</p>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <button
          v-for="group in subjectGroups"
          :key="group.id"
          @click="activeSubjectId = group.id"
          class="text-left bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-6"
        >
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-sm bg-gradient-to-br from-emerald-500 to-teal-600 mb-4">
            {{ subjectInitials(group) }}
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{{ group.name }}</h3>
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            {{ group.books.length }} {{ group.books.length === 1 ? 'book' : 'books' }}
          </span>
        </button>
      </div>
    </template>

    <template v-else>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
        <button v-for="book in activeSubjectBooks" :key="book.id" @click="previewBook = book" class="group text-left">
          <BookCover :book="book" />
          <h3 class="mt-3 text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {{ book.title }}
          </h3>
        </button>
      </div>
    </template>

    <LibraryDocumentViewer v-if="previewBook" :book="previewBook" @close="previewBook = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PreviewBanner from '@/components/preview/PreviewBanner.vue'
import BookCover from '@/components/library/BookCover.vue'
import LibraryDocumentViewer from '@/components/library/LibraryDocumentViewer.vue'
import type { LibraryBook } from '@/types/library'

interface SubjectGroup {
  id: number
  name: string
  code?: string
  books: LibraryBook[]
}

const route = useRoute()
const books = ref<LibraryBook[]>([])
const loading = ref(false)
const activeSubjectId = ref<number | null>(null)
const previewBook = ref<LibraryBook | null>(null)

const subjectInitials = (subj: { name: string; code?: string }) => {
  if (subj.code) return subj.code.slice(0, 3).toUpperCase()
  return subj.name.split(/\s+/).filter(Boolean).map(w => w[0]).join('').slice(0, 3).toUpperCase() || '?'
}

const subjectGroups = computed<SubjectGroup[]>(() => {
  const map = new Map<number, SubjectGroup>()
  books.value.forEach(book => {
    const sid = book.subject_id || 0
    if (!map.has(sid)) map.set(sid, { id: sid, name: book.subject_name || 'General', code: book.subject_code, books: [] })
    map.get(sid)!.books.push(book)
  })
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
})

const activeSubjectBooks = computed(() => subjectGroups.value.find(g => g.id === activeSubjectId.value)?.books || [])

const loadBooks = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/teacher/library/preview', { params: { class_id: route.params.classId } })
    if (response.data.success) {
      books.value = response.data.data.books || []
    }
  } catch (error) {
    console.error('Failed to load library preview:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadBooks()
})
</script>
