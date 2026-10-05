<template>
  <div>
    <PageHeader title="eLibrary" description="Textbooks and notes from your teachers - open one to read it right here, or save it to read offline." icon="book" accent="emerald">
      <template #filters>
        <div class="relative">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="searchQuery" type="search" placeholder="Search books" class="w-full md:w-56 pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
        </div>
      </template>
    </PageHeader>

    <!-- Offline: only what's saved on this device is on the shelf -->
    <div v-if="showingOffline" class="mb-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-100">
      <svg class="w-4 h-4 flex-shrink-0 mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728M5.636 18.364a9 9 0 010-12.728M3 3l18 18" /></svg>
      <p>Only the books saved on this device are shown. Page notes you write now are sent when you're back online.</p>
    </div>

    <!-- Loading: an empty shelf while books arrive -->
    <div v-if="loading" class="space-y-8">
      <div v-for="i in 2" :key="i" class="animate-pulse">
        <div class="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700 mb-2"></div>
        <div class="h-56 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 flex items-start gap-3">
      <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p class="text-red-800 dark:text-red-200">{{ error }}</p>
    </div>

    <!-- Bookcase: one shelf per subject, books standing on it -->
    <div v-else-if="filteredSubjectGroups.length > 0" class="shelf-row flex flex-wrap items-start gap-x-5 gap-y-7">
      <Bookshelf
        v-for="group in filteredSubjectGroups"
        :key="group.id"
        :title="group.name"
        :count="group.books.length"
        :fresh="group.books.filter(item => isRecent(item)).length"
        spines
      >
        <ShelfSlot
          v-for="book in group.books"
          :key="book.id"
          :label="book.title"
          @open="(el) => openItem(book, el)"
        >
          <template #cover="{ size }">
            <ShelfBook flat :size="size" :title="book.title" :seed="book.id" :label="shelfLabel(book)" :cover-image="book.cover_image" :author="book.author" :pages="book.total_pages"  />
          </template>
          <ShelfBook spine-out :is-new="isRecent(book)" :saved="!!offline.docs[docKey('library', book.id)]" :title="book.title" :seed="book.id" :label="shelfLabel(book)" :cover-image="book.cover_image" :author="book.author" :pages="book.total_pages" />
          <template #details>
          <p class="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">{{ book.title }}</p>
          <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ book.author || [book.teacher_first_name, book.teacher_last_name].filter(Boolean).join(' ') }}</p>
          <p class="text-[11px] text-gray-400 dark:text-gray-500">{{ fileLabel(book) }}<template v-if="book.total_pages"> &middot; {{ book.total_pages }} pages</template><template v-else-if="book.file_size"> &middot; {{ formatFileSize(book.file_size) }}</template></p>
          <SaveOfflineButton :item="book" kind="library" />
          </template>
        </ShelfSlot>
      </Bookshelf>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {{ subjectGroups.length === 0 ? (showingOffline ? 'Nothing saved on this device' : 'No books yet') : 'No books match your search' }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        {{ subjectGroups.length === 0 ? (showingOffline ? 'When you\'re online, open a book on the shelf and choose Save for offline.' : 'Your teachers haven\'t shared any PDFs with your department yet.') : 'Try a different search.' }}
      </p>
    </div>
    <!-- Document Preview -->
    <LibraryPdfViewer v-if="previewBook && previewBook.file_type === 'pdf'" :book="previewBook" :start-in-read-mode="readFromShelf" @close="previewBook = null; readFromShelf = false" />
    <LibraryDocumentViewer v-else-if="previewBook" :book="previewBook" @close="previewBook = null; readFromShelf = false" />

    <!-- Opening a book: it comes off the shelf, waits with Start reading / Cancel, then opens into
         the reader (or goes back to its place) -->
    <BookOpenTransition
      v-if="opening"
      :from="opening.el"
      :title="opening.item.title"
      :label="shelfLabel(opening.item)"
      :subtitle="opening.item.author || [opening.item.teacher_first_name, opening.item.teacher_last_name].filter(Boolean).join(' ')"
      @opened="finishOpening"
      @closed="opening = null"
    >
      <ShelfBook flat size="lg" :title="opening.item.title" :seed="opening.item.id" :label="shelfLabel(opening.item)" :cover-image="opening.item.cover_image" :author="opening.item.author" :pages="opening.item.total_pages" />
    </BookOpenTransition>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/ui/PageHeader.vue'
import { ref, computed, onMounted, nextTick } from 'vue'
import axios from 'axios'
import LibraryDocumentViewer from '@/components/library/LibraryDocumentViewer.vue'
import LibraryPdfViewer from '@/components/library/LibraryPdfViewer.vue'
import Bookshelf from '@/components/library/Bookshelf.vue'
import ShelfBook from '@/components/library/ShelfBook.vue'
import ShelfSlot from '@/components/library/ShelfSlot.vue'
import BookOpenTransition from '@/components/library/BookOpenTransition.vue'
import type { LibraryBook } from '@/types/library'
import { subjectTag } from '@/utils/subjectTag'
import { orderShelves, isRecent } from '@/utils/shelfOrder'
import SaveOfflineButton from '@/components/offline/SaveOfflineButton.vue'
import { offline } from '@/utils/offline/enotes'
import { docKey } from '@/utils/offline/docs'
import { useRoute } from 'vue-router'

interface SubjectGroup {
  id: number
  name: string
  code?: string
  books: LibraryBook[]
}

const API_BASE = '/api'

const books = ref<LibraryBook[]>([])
// Every subject the student is enrolled in - each gets a shelf, even before it has any books
const enrolledSubjects = ref<{ id: number; name: string; code?: string }[]>([])
const searchQuery = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const previewBook = ref<LibraryBook | null>(null)

// The book being opened (BookOpenTransition plays first). Once it has opened, the reader is put up
// underneath and the animation cleared off the top of it.
const opening = ref<{ item: LibraryBook; el: HTMLElement | null } | null>(null)
const openItem = (item: LibraryBook, el: HTMLElement | null) => {
  if (opening.value || previewBook.value) return
  opening.value = { item, el }
}
// Opened with "Start reading" on the shelf: the reader starts in Read Mode
const readFromShelf = ref(false)
// The list came from this device's saved copies (no network)
const showingOffline = ref(false)
const route = useRoute()
const finishOpening = async () => {
  if (!opening.value) return
  readFromShelf.value = true
  previewBook.value = opening.value.item
  await nextTick()
  opening.value = null
}

const shelfLabel = (book: LibraryBook) => subjectTag(book.subject_name, book.subject_code)
const fileLabel = (book: LibraryBook) => (book.file_type || 'pdf').toUpperCase()

const subjectGroups = computed<SubjectGroup[]>(() => {
  const map = new Map<number, SubjectGroup>()
  enrolledSubjects.value.forEach(subj => {
    map.set(subj.id, { id: subj.id, name: subj.name, code: subj.code, books: [] })
  })
  books.value.forEach(book => {
    const sid = book.subject_id || 0
    if (!map.has(sid)) {
      map.set(sid, { id: sid, name: book.subject_name || 'General', code: book.subject_code, books: [] })
    }
    map.get(sid)!.books.push(book)
  })
  // Only subjects with something on them get a shelf
  return orderShelves(Array.from(map.values()).filter(g => g.books.length > 0), g => g.books)
})

// Search narrows each shelf to its matching books (a subject-name match keeps the whole shelf),
// and drops shelves left empty.
const filteredSubjectGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return subjectGroups.value
  return subjectGroups.value
    .map(group => group.name.toLowerCase().includes(q)
      ? group
      : { ...group, books: group.books.filter(book => book.title.toLowerCase().includes(q) || (book.description || '').toLowerCase().includes(q)) })
    .filter(group => group.books.length > 0)
})


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
      showingOffline.value = !!response.data.offline
      books.value = response.data.data.books || []
      enrolledSubjects.value = response.data.data.subjects || []
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load library'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadLibrary()
  // Opened from Downloads (?open=<id>): straight into the reader
  const wanted = Number(route.query.open)
  const item = wanted ? books.value.find(b => Number(b.id) === wanted) : null
  if (item) previewBook.value = item
})
</script>
