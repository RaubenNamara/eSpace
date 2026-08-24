<template>
  <div ref="containerRef" class="relative w-full max-w-md">
    <div class="relative">
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
      <input
        v-model="query"
        type="text"
        placeholder="Search topics, notes, assignments, books..."
        class="w-full pl-9 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-800 transition-colors"
        @input="onInput"
        @focus="onFocus"
        @keydown.enter="submit"
        @keydown.escape="close"
      >
      <button
        v-if="query"
        @click="clear"
        class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Autocomplete dropdown -->
    <div
      v-if="open"
      class="absolute left-0 right-0 mt-1.5 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
    >
      <div v-if="loading" class="p-4 flex justify-center">
        <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
      </div>
      <div v-else-if="suggestions.length === 0" class="p-4 text-center text-sm text-gray-400 dark:text-gray-500">
        No matches for "{{ query }}"
      </div>
      <template v-else>
        <button
          v-for="s in suggestions"
          :key="`${s.type}-${s.id}`"
          @click="openSuggestion(s)"
          class="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700/50 last:border-b-0"
        >
          <span class="text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full flex-shrink-0" :class="typeBadgeClass(s.type)">
            {{ SEARCH_TYPE_LABELS[s.type] || s.type }}
          </span>
          <span class="min-w-0 flex-1">
            <span class="block text-sm font-medium text-gray-900 dark:text-white truncate">{{ s.title }}</span>
            <span v-if="s.subject_name" class="block text-xs text-gray-400 dark:text-gray-500 truncate">{{ s.subject_name }}</span>
          </span>
        </button>
      </template>

      <button
        @click="submit"
        class="w-full text-center px-4 py-2.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors border-t border-gray-100 dark:border-gray-700"
      >
        See all results for "{{ query }}"
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { SEARCH_TYPE_LABELS } from '@/types/search'
import type { SearchSuggestion } from '@/types/search'

const router = useRouter()
const authStore = useAuthStore()

const query = ref('')
const suggestions = ref<SearchSuggestion[]>([])
const loading = ref(false)
const open = ref(false)
const containerRef = ref<HTMLElement | null>(null)

let debounceTimer: ReturnType<typeof setTimeout> | null = null

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

const fetchSuggestions = async () => {
  const role = authStore.userRole
  if ((role !== 'student' && role !== 'teacher') || query.value.trim().length < 2) {
    suggestions.value = []
    return
  }
  loading.value = true
  try {
    const res = await axios.get(`/api/${role}/search/suggestions`, { params: { q: query.value.trim() } })
    suggestions.value = res.data.data.suggestions
  } catch (err) {
    suggestions.value = []
  } finally {
    loading.value = false
  }
}

const onInput = () => {
  open.value = true
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(fetchSuggestions, 250)
}

const onFocus = () => {
  if (query.value.trim().length >= 2) {
    open.value = true
    if (suggestions.value.length === 0) fetchSuggestions()
  }
}

const close = () => {
  open.value = false
}

const clear = () => {
  query.value = ''
  suggestions.value = []
  open.value = false
}

const submit = () => {
  const term = query.value.trim()
  if (!term) return
  const role = authStore.userRole
  if (role !== 'student' && role !== 'teacher') return
  close()
  router.push({ path: `/${role}/search`, query: { q: term } })
}

const openSuggestion = (s: SearchSuggestion) => {
  close()
  if (s.is_file) {
    window.open(s.url, '_blank')
  } else {
    router.push(s.url)
  }
}

const handleOutsideClick = (event: MouseEvent) => {
  if (open.value && containerRef.value && !containerRef.value.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => document.addEventListener('mousedown', handleOutsideClick))
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleOutsideClick)
  if (debounceTimer) clearTimeout(debounceTimer)
})
</script>
