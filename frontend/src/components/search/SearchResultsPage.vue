<template>
  <div class="p-4 sm:p-6">
    <div class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">Search</h1>
      <p v-if="term" class="text-sm text-gray-500 dark:text-gray-400">
        {{ total }} result{{ total === 1 ? '' : 's' }} for
        <span class="font-medium text-gray-700 dark:text-gray-300">"{{ term }}"</span>
      </p>
    </div>

    <!-- Refine search -->
    <form @submit.prevent="onSearchSubmit" class="mb-5">
      <div class="relative max-w-xl">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          v-model="inputTerm"
          type="text"
          placeholder="Search topics, notes, assignments, books..."
          class="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
      </div>
    </form>

    <!-- Type tabs -->
    <div v-if="term" class="flex gap-2 mb-5 overflow-x-auto pb-1">
      <button
        v-for="t in typeTabs"
        :key="t.value"
        @click="setType(t.value)"
        class="px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0"
        :class="activeType === t.value
          ? 'bg-indigo-600 text-white'
          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'"
      >
        {{ t.label }}<span class="ml-1 opacity-75">({{ t.count }})</span>
      </button>
    </div>

    <!-- Related subjects (also the subject filter) -->
    <div v-if="subjectCounts.length > 0" class="mb-6">
      <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2">Related Subjects</p>
      <div class="flex flex-wrap gap-2">
        <button
          @click="setSubject(null)"
          class="px-2.5 py-1 rounded-full text-xs font-medium transition-colors"
          :class="activeSubjectId === null
            ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'"
        >
          All Subjects
        </button>
        <button
          v-for="sc in subjectCounts"
          :key="sc.subject_id"
          @click="setSubject(sc.subject_id)"
          class="px-2.5 py-1 rounded-full text-xs font-medium transition-colors"
          :class="activeSubjectId === sc.subject_id
            ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'"
        >
          {{ sc.subject_name }} ({{ sc.count }})
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Empty state: no search yet -->
    <div v-else-if="!term" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <svg class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
      <p class="text-gray-500 dark:text-gray-400">Search across eNotes, eLibrary, assignments, item bank, videos and lessons.</p>
    </div>

    <!-- No results -->
    <div v-else-if="results.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <svg class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p class="text-gray-700 dark:text-gray-300 font-medium">No results found for "{{ term }}"</p>
      <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Try a different search term, or clear the filters above.</p>
    </div>

    <!-- Results -->
    <div v-else class="space-y-3">
      <button
        v-for="r in results"
        :key="`${r.type}-${r.id}`"
        @click="openResult(r)"
        class="w-full text-left bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0 flex-1">
            <div class="flex items-center flex-wrap gap-x-2 gap-y-1 mb-1.5">
              <span class="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full flex-shrink-0" :class="typeBadgeClass(r.type)">
                {{ SEARCH_TYPE_LABELS[r.type] || r.type }}
              </span>
              <span v-if="r.subject_name" class="text-xs text-gray-400 dark:text-gray-500">{{ r.subject_name }}</span>
              <span v-if="r.class_name" class="text-xs text-gray-400 dark:text-gray-500">&middot; {{ r.class_name }}</span>
            </div>
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">
              <span v-for="(seg, i) in highlightSegments(r.title, term)" :key="i" :class="seg.match ? 'bg-yellow-200 dark:bg-yellow-500/40 rounded px-0.5' : ''">{{ seg.text }}</span>
            </h3>
            <p v-if="r.description" class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              <span v-for="(seg, i) in highlightSegments(r.description, term)" :key="i" :class="seg.match ? 'bg-yellow-200 dark:bg-yellow-500/40 rounded px-0.5' : ''">{{ seg.text }}</span>
            </p>
          </div>
          <svg class="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </button>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && totalPages > 1" class="flex items-center justify-center gap-3 mt-6">
      <button
        :disabled="page <= 1"
        @click="goToPage(page - 1)"
        class="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span class="text-sm text-gray-500 dark:text-gray-400">Page {{ page }} of {{ totalPages }}</span>
      <button
        :disabled="page >= totalPages"
        @click="goToPage(page + 1)"
        class="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { highlightSegments } from '@/utils/highlight'
import { SEARCH_TYPE_LABELS } from '@/types/search'
import type { SearchResult, SearchResultType } from '@/types/search'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const role = computed(() => (authStore.userRole === 'teacher' ? 'teacher' : 'student'))

const term = ref('')
const inputTerm = ref('')
const activeType = ref('all')
const activeSubjectId = ref<number | null>(null)
const page = ref(1)
const perPage = 15

const results = ref<SearchResult[]>([])
const total = ref(0)
const counts = ref<Partial<Record<SearchResultType, number>>>({})
const subjectCounts = ref<{ subject_id: number; subject_name: string; count: number }[]>([])
const loading = ref(false)

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / perPage)))

const TYPE_ORDER: SearchResultType[] = ['enote', 'library', 'assignment', 'item_bank', 'video', 'lesson']

const typeTabs = computed(() => [
  { value: 'all', label: 'All', count: total.value },
  ...TYPE_ORDER.map(t => ({ value: t, label: SEARCH_TYPE_LABELS[t], count: counts.value[t] ?? 0 })),
])

const typeBadgeClass = (type: string) => {
  const map: Record<string, string> = {
    enote: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
    library: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
    assignment: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
    item_bank: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
    video: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300',
    lesson: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    subject: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
  }
  return map[type] || 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
}

const fetchResults = async () => {
  if (!term.value.trim()) {
    results.value = []
    total.value = 0
    counts.value = {}
    subjectCounts.value = []
    return
  }

  loading.value = true
  try {
    const params: Record<string, string | number> = { q: term.value, type: activeType.value, page: page.value, per_page: perPage }
    if (activeSubjectId.value) params.subject_id = activeSubjectId.value

    const res = await axios.get(`/api/${role.value}/search`, { params })
    results.value = res.data.data.results
    total.value = res.data.data.total
    counts.value = res.data.data.counts || {}
    subjectCounts.value = res.data.data.subject_counts || []
  } catch (err) {
    results.value = []
    total.value = 0
    counts.value = {}
    subjectCounts.value = []
  } finally {
    loading.value = false
  }
}

const syncFromRoute = () => {
  term.value = (route.query.q as string) || ''
  inputTerm.value = term.value
  activeType.value = (route.query.type as string) || 'all'
  activeSubjectId.value = route.query.subject_id ? Number(route.query.subject_id) : null
  page.value = route.query.page ? Number(route.query.page) : 1
}

const updateRoute = () => {
  router.push({
    path: route.path,
    query: {
      q: term.value || undefined,
      type: activeType.value !== 'all' ? activeType.value : undefined,
      subject_id: activeSubjectId.value || undefined,
      page: page.value > 1 ? page.value : undefined,
    },
  })
}

const onSearchSubmit = () => {
  term.value = inputTerm.value.trim()
  activeType.value = 'all'
  activeSubjectId.value = null
  page.value = 1
  updateRoute()
}

const setType = (t: string) => {
  activeType.value = t
  page.value = 1
  updateRoute()
}

const setSubject = (id: number | null) => {
  activeSubjectId.value = id
  page.value = 1
  updateRoute()
}

const goToPage = (p: number) => {
  page.value = p
  updateRoute()
}

const openResult = (r: SearchResult) => {
  if (r.is_file) {
    window.open(r.url, '_blank')
  } else {
    router.push(r.url)
  }
}

watch(
  () => route.query,
  () => {
    syncFromRoute()
    fetchResults()
  }
)

onMounted(() => {
  syncFromRoute()
  fetchResults()
})
</script>
