<template>
  <div>
    <!-- Header - icon and title share a row with the search box, so the input lines up exactly
         with the heading; the subtitle drops to its own line underneath. -->
    <div class="flex items-center justify-between gap-2 mb-1">
      <div class="flex items-center gap-2 flex-shrink-0">
        <div class="hidden sm:flex w-7 h-7 rounded-lg bg-indigo-600 items-center justify-center flex-shrink-0">
          <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap">eLibrary</h1>
      </div>

      <div class="relative flex-shrink min-w-0 w-32 sm:w-80">
        <svg class="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          v-model="search"
          @input="debouncedSearch"
          type="text"
          placeholder="Search..."
          class="w-full pl-8 pr-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
      </div>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Moderate PDF resources uploaded by teachers in your department</p>

    <!-- Stats - double as the status filter (replacing the separate filter-pill row); the count
         sits as a corner badge so each card is shorter and the label can be centered. -->
    <div v-if="!loading" class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <button
        @click="statusFilter = ''; fetchBooks()"
        class="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-shadow hover:shadow-md text-center"
        :class="statusFilter === '' ? 'border-indigo-300 dark:border-indigo-700 ring-1 ring-indigo-100 dark:ring-indigo-900/30' : 'border-gray-200 dark:border-gray-700'"
      >
        <span class="absolute top-2 right-3 text-lg font-bold text-gray-900 dark:text-white">{{ stats.total }}</span>
        <p class="text-sm text-gray-500 dark:text-gray-400">Total</p>
      </button>
      <button
        @click="statusFilter = 'draft'; fetchBooks()"
        class="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-shadow hover:shadow-md text-center"
        :class="statusFilter === 'draft' ? 'border-yellow-300 dark:border-yellow-700 ring-1 ring-yellow-100 dark:ring-yellow-900/30' : 'border-gray-200 dark:border-gray-700'"
      >
        <span class="absolute top-2 right-3 text-lg font-bold text-yellow-600 dark:text-yellow-400">{{ stats.draft }}</span>
        <p class="text-sm text-gray-500 dark:text-gray-400">Draft</p>
      </button>
      <button
        @click="statusFilter = 'published'; fetchBooks()"
        class="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-shadow hover:shadow-md text-center"
        :class="statusFilter === 'published' ? 'border-green-300 dark:border-green-700 ring-1 ring-green-100 dark:ring-green-900/30' : 'border-gray-200 dark:border-gray-700'"
      >
        <span class="absolute top-2 right-3 text-lg font-bold text-green-600 dark:text-green-400">{{ stats.published }}</span>
        <p class="text-sm text-gray-500 dark:text-gray-400">Published</p>
      </button>
      <button
        @click="statusFilter = 'archived'; fetchBooks()"
        class="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-shadow hover:shadow-md text-center"
        :class="statusFilter === 'archived' ? 'border-gray-400 dark:border-gray-500 ring-1 ring-gray-200 dark:ring-gray-700' : 'border-gray-200 dark:border-gray-700'"
      >
        <span class="absolute top-2 right-3 text-lg font-bold text-gray-600 dark:text-gray-400">{{ stats.archived }}</span>
        <p class="text-sm text-gray-500 dark:text-gray-400">Archived</p>
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="i in 6" :key="i" class="animate-pulse rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5">
        <div class="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
        <div class="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div class="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>

    <!-- Empty -->
    <div v-else-if="books.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
      <svg class="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p class="text-gray-500 dark:text-gray-400 mb-3">
        {{ search || statusFilter ? 'No books match your filters' : 'No books uploaded in your department yet' }}
      </p>
      <button v-if="search || statusFilter" @click="clearFilters" class="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
        Clear filters
      </button>
    </div>

    <!-- Books -->
    <template v-else>
      <div class="flex items-center gap-2 mb-3">
        <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
          <input
            type="checkbox"
            :checked="bulk.allSelected(visibleIds)"
            @change="bulk.toggleAll(visibleIds)"
            class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
          >
          Select all
        </label>
      </div>

      <BulkActionBar :count="bulk.selectedCount.value" @clear="bulk.clear()">
        <button @click="bulkSetStatus('published')" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Publish</button>
        <button @click="bulkSetStatus('draft')" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Draft</button>
        <button @click="bulkSetStatus('archived')" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Archive</button>
        <button @click="bulkExport" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Export CSV</button>
        <button @click="bulkDeleteSelected" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors">Delete</button>
      </BulkActionBar>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="book in books"
        :key="book.id"
        class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow overflow-hidden"
      >
        <div class="p-5">
          <div class="flex items-start justify-between mb-3 gap-2">
            <div class="flex items-center gap-2 min-w-0 cursor-pointer" @click="previewBook = book">
              <input
                type="checkbox"
                :checked="bulk.isSelected(book.id)"
                @click.stop
                @change="bulk.toggle(book.id)"
                class="flex-shrink-0 w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
              >
              <div class="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 class="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">{{ book.title }}</h3>
            </div>
            <span
              class="px-2 py-1 rounded-full text-[11px] font-medium flex-shrink-0 capitalize"
              :class="book.status === 'published' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                book.status === 'draft' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'"
            >
              {{ book.status }}
            </span>
          </div>

          <p v-if="book.description" class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ book.description }}</p>

          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">
            By {{ book.teacher_first_name ? `${book.teacher_first_name} ${book.teacher_last_name}` : 'Unknown teacher' }}
          </p>

          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span v-if="book.subject_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
              {{ book.subject_name }}
            </span>
            <span v-if="book.class_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {{ book.class_name }}{{ book.class_stream_name ? ' - ' + book.class_stream_name : '' }}
            </span>
            <span class="ml-auto text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{{ formatFileSize(book.file_size) }}</span>
          </div>

          <div class="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
            <select
              :value="book.status"
              @change="changeStatus(book, ($event.target as HTMLSelectElement).value)"
              class="text-xs px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <button
              @click="deleteBook(book)"
              class="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
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
    </template>

    <!-- Document Preview -->
    <LibraryDocumentViewer v-if="previewBook" :book="previewBook" @close="previewBook = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { apiService } from '@/services/api'
import LibraryDocumentViewer from '@/components/library/LibraryDocumentViewer.vue'
import BulkActionBar from '@/components/common/BulkActionBar.vue'
import type { LibraryBook } from '@/types/library'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { useBulkSelection } from '@/composables/useBulkSelection'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { downloadBlob } from '@/utils/downloadBlob'

const toast = useToastStore()
const confirmDialog = useConfirmStore()
const bulk = useBulkSelection<number>()

const books = ref<LibraryBook[]>([])
const stats = ref({ total: 0, draft: 0, published: 0, archived: 0 })
const loading = ref(false)
const search = ref('')
const statusFilter = usePersistedRef('hod-library-status-filter', '')
const previewBook = ref<LibraryBook | null>(null)

let searchTimer: number | null = null
const debouncedSearch = () => {
  if (searchTimer) window.clearTimeout(searchTimer)
  searchTimer = window.setTimeout(() => fetchBooks(), 350)
}

const formatFileSize = (bytes: number | null) => {
  if (!bytes) return ''
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

const fetchBooks = async () => {
  loading.value = true
  try {
    const response = await apiService.get('/hod/library', {
      search: search.value || undefined,
      status: statusFilter.value || undefined
    })
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

const changeStatus = async (book: LibraryBook, status: string) => {
  try {
    await apiService.put(`/hod/library/${book.id}`, { status })
    await fetchBooks()
  } catch (error: any) {
    console.error('Failed to update book status:', error)
    toast.error(error.response?.data?.message || 'Failed to update book status')
  }
}

const deleteBook = async (book: LibraryBook) => {
  if (!await confirmDialog.open({ title: 'Delete book', message: `Are you sure you want to delete "${book.title}"? This action cannot be undone.`, confirmLabel: 'Delete', danger: true })) return

  try {
    await apiService.delete(`/hod/library/${book.id}`)
    await fetchBooks()
    toast.success('Book deleted')
  } catch (error: any) {
    console.error('Failed to delete book:', error)
    toast.error(error.response?.data?.message || 'Failed to delete book')
  }
}

const visibleIds = computed(() => books.value.map(b => b.id))

const bulkSetStatus = async (status: 'draft' | 'published' | 'archived') => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  try {
    await apiService.post('/hod/library/bulk-status', { ids, status })
    toast.success(`${ids.length} resource(s) updated`)
    bulk.clear()
    await fetchBooks()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to update resources')
  }
}

const bulkDeleteSelected = async () => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  if (!await confirmDialog.open({ title: 'Delete resources', message: `Are you sure you want to delete ${ids.length} resource(s)? This cannot be undone.`, confirmLabel: 'Delete', danger: true })) return
  try {
    await apiService.post('/hod/library/bulk-delete', { ids })
    toast.success(`${ids.length} resource(s) deleted`)
    bulk.clear()
    await fetchBooks()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to delete resources')
  }
}

const bulkExport = async () => {
  const ids = bulk.selectedArray()
  try {
    const response = await apiService.post('/hod/library/bulk-export', { ids }, { responseType: 'blob' })
    downloadBlob(response.data as unknown as Blob, 'library.csv')
  } catch (error) {
    toast.error('Failed to export resources')
  }
}

const clearFilters = () => {
  search.value = ''
  statusFilter.value = ''
  fetchBooks()
}

onMounted(() => {
  fetchBooks()
})
</script>
