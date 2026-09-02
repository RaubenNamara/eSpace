<template>
  <div class="p-4 sm:p-6">
    <div class="mb-6 flex items-center gap-3">
      <div class="hidden sm:flex w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      </div>
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Constructs</h1>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
          EOC building blocks defined by your school - browse and view what admin has saved.
        </p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <select v-model="filterLevel" class="filter-select">
          <option value="">All Levels</option>
          <option value="O Level">O Level</option>
          <option value="A Level">A Level</option>
        </select>
        <select v-model="filterSubjectId" class="filter-select">
          <option value="">All Subjects</option>
          <option v-for="s in subjectOptions" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
        <input v-model="search" type="text" placeholder="Search name or description..." class="filter-select" />
      </div>
    </div>

    <div v-if="loading" class="text-center py-16 text-gray-400">Loading...</div>
    <div v-else-if="constructs.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-400">
      No constructs found for your department yet.
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <button
        v-for="c in constructs"
        :key="c.id"
        @click="openDetail(c.id)"
        class="text-left bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white leading-snug mb-2">{{ c.name }}</h3>
        <div class="flex flex-wrap gap-1.5 mb-3">
          <span class="tag-pill bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">{{ c.assessment_objective }}</span>
          <span class="tag-pill bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">{{ c.level }}</span>
          <span class="tag-pill bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ c.topic_count ?? 0 }} topic{{ (c.topic_count ?? 0) === 1 ? '' : 's' }}</span>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ c.subject_name }}</p>
        <p v-if="c.description" class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{{ c.description }}</p>
      </button>
    </div>

    <!-- Detail View -->
    <div v-if="detail" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="detail = null">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl md:max-w-3xl max-h-[90vh] flex flex-col">
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 sm:px-6 py-5 flex-shrink-0 rounded-t-2xl">
          <div class="flex items-center justify-between gap-4">
            <div class="min-w-0">
              <h3 class="text-xl sm:text-2xl font-bold text-white truncate">{{ detail.name }}</h3>
              <p class="text-indigo-100 text-sm mt-1">{{ detail.assessment_objective }} &middot; {{ detail.level }} &middot; {{ detail.subject_name }}</p>
            </div>
            <button @click="detail = null" class="text-white/80 hover:text-white transition-colors flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          <p v-if="detail.description" class="text-sm text-gray-600 dark:text-gray-300">{{ detail.description }}</p>

          <div>
            <h4 class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-3">Topics</h4>
            <div class="space-y-2">
              <div v-for="topic in detail.topics" :key="topic.id" class="px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700">
                <div class="flex items-start gap-2.5">
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ topic.topic }}</p>
                    <p class="text-xs text-gray-400">
                      {{ topic.class_stream_name }}<template v-if="topic.academic_year_name"> &middot; {{ topic.academic_year_name }}</template><template v-if="topic.term_name"> &middot; {{ topic.term_name }}</template>
                    </p>
                  </div>
                  <button
                    type="button"
                    @click="toggleOutcomesReveal(topic.id)"
                    title="Show/hide learning outcomes"
                    class="p-1 flex-shrink-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': isOutcomesRevealed(topic.id) }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
                <div v-if="isOutcomesRevealed(topic.id)" class="mt-2 ml-0 pl-2 border-l-2 border-indigo-100 dark:border-indigo-900">
                  <p v-if="topic.learning_outcomes.length === 0" class="text-xs text-gray-400">No learning outcomes recorded for this topic.</p>
                  <ol v-else class="text-xs text-gray-600 dark:text-gray-300 list-decimal list-inside space-y-0.5">
                    <li v-for="(lo, i) in topic.learning_outcomes" :key="i">{{ lo }}</li>
                  </ol>
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
import { ref, computed, onMounted, watch } from 'vue'
import apiService from '@/services/api'
import type { Construct } from '@/types/construct'

const constructs = ref<Construct[]>([])
const allConstructs = ref<Construct[]>([])
const loading = ref(false)
const detail = ref<Construct | null>(null)
const revealedOutcomes = ref<Set<number>>(new Set())

const filterLevel = ref('')
const filterSubjectId = ref<number | ''>('')
const search = ref('')

// Subject filter options are derived from every construct visible to this teacher (fetched once,
// unfiltered) rather than a separate subjects endpoint - there's no point offering a subject with
// zero constructs to filter to.
const subjectOptions = computed(() => {
  const seen = new Map<number, string>()
  for (const c of allConstructs.value) {
    if (c.subject_id && c.subject_name) seen.set(c.subject_id, c.subject_name)
  }
  return Array.from(seen.entries()).map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name))
})

const isOutcomesRevealed = (topicId: number) => revealedOutcomes.value.has(topicId)
const toggleOutcomesReveal = (topicId: number) => {
  const next = new Set(revealedOutcomes.value)
  if (next.has(topicId)) next.delete(topicId)
  else next.add(topicId)
  revealedOutcomes.value = next
}

watch([filterLevel, filterSubjectId, search], () => loadConstructs())

async function loadAllConstructsForFilterOptions() {
  try {
    const response = await apiService.get('/teacher/constructs')
    if (response.data.success) allConstructs.value = response.data.data.constructs || []
  } catch (err) {
    console.error('Failed to load constructs for subject filter:', err)
  }
}

async function loadConstructs() {
  loading.value = true
  try {
    const response = await apiService.get('/teacher/constructs', {
      params: {
        level: filterLevel.value || undefined,
        subject_id: filterSubjectId.value || undefined,
        search: search.value || undefined
      }
    })
    if (response.data.success) constructs.value = response.data.data.constructs || []
  } catch (err) {
    console.error('Failed to load constructs:', err)
  } finally {
    loading.value = false
  }
}

async function openDetail(id: number) {
  revealedOutcomes.value = new Set()
  try {
    const response = await apiService.get(`/teacher/constructs/${id}`)
    if (response.data.success) detail.value = response.data.data
  } catch (err) {
    console.error('Failed to load construct detail:', err)
  }
}

onMounted(async () => {
  await loadConstructs()
  await loadAllConstructsForFilterOptions()
})
</script>

<style scoped>
.filter-select {
  @apply px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-sm;
}
.tag-pill {
  @apply inline-flex items-center px-2 py-1 rounded-md text-xs font-medium;
}
</style>
