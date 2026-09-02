<template>
  <div class="p-4 sm:p-6">
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center gap-3">
        <button @click="router.push('/admin/enotes-curriculum')" title="Back to eNotes Curriculum" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </button>
        <div class="hidden sm:flex w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Constructs</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            Define EOC building blocks - a competency tied to a level, department, subject, assessment objective, and curriculum topics.
          </p>
        </div>
      </div>
      <button
        @click="openCreateModal"
        class="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 flex-shrink-0"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>New Construct</span>
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <select v-model="filterDepartmentId" class="filter-select">
          <option value="">All Departments</option>
          <option v-for="d in meta?.departments" :key="d.id" :value="d.id">{{ d.name }}</option>
        </select>
        <select v-model="filterSubjectId" class="filter-select">
          <option value="">All Subjects</option>
          <option v-for="s in subjectsForFilter" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
        <select v-model="filterLevel" class="filter-select">
          <option value="">All Levels</option>
          <option v-for="lv in meta?.levels" :key="lv" :value="lv">{{ lv }}</option>
        </select>
        <input v-model="search" type="text" placeholder="Search name or description..." class="filter-select" />
      </div>
    </div>

    <!-- List -->
    <div v-if="loading" class="text-center py-16 text-gray-400">Loading...</div>
    <div v-else-if="constructs.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-400">
      No constructs yet. Click "New Construct" to define one.
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-for="c in constructs" :key="c.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col">
        <div class="flex items-start justify-between gap-2 mb-2">
          <h3 class="font-semibold text-gray-900 dark:text-white leading-snug">{{ c.name }}</h3>
          <div class="flex items-center gap-1 flex-shrink-0">
            <button @click="openDetail(c.id)" title="View" class="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
              <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </button>
            <button @click="openEditModal(c)" title="Edit" class="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md transition-colors">
              <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button @click="confirmDelete(c)" title="Delete" class="p-1.5 hover:bg-red-100 dark:hover:bg-red-900 rounded-md transition-colors">
              <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="flex flex-wrap gap-1.5 mb-3">
          <span class="tag-pill bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">{{ c.assessment_objective }}</span>
          <span class="tag-pill bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">{{ c.level }}</span>
          <span class="tag-pill bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ c.topic_count ?? 0 }} topic{{ (c.topic_count ?? 0) === 1 ? '' : 's' }}</span>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ c.department_name }} &middot; {{ c.subject_name }}</p>
        <p v-if="c.description" class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{{ c.description }}</p>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showFormModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl md:max-w-3xl max-h-[90vh] flex flex-col">
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 sm:px-6 py-5 flex-shrink-0 rounded-t-2xl">
          <div class="flex items-center justify-between gap-4">
            <div class="min-w-0">
              <h3 class="text-xl sm:text-2xl font-bold text-white truncate">{{ editingConstruct ? 'Edit Construct' : 'New Construct' }}</h3>
              <p class="text-indigo-100 text-sm mt-1">Level and subject decide which curriculum topics are available to attach.</p>
            </div>
            <button @click="closeFormModal" class="text-white/80 hover:text-white transition-colors flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <form @submit.prevent="saveForm" class="flex-1 flex flex-col min-h-0">
          <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="form-label">Level *</label>
                <select v-model="form.level" required class="form-input" @change="onLevelOrSubjectChange">
                  <option value="">Select Level</option>
                  <option v-for="lv in meta?.levels" :key="lv" :value="lv">{{ lv }}</option>
                </select>
              </div>
              <div>
                <label class="form-label">Department *</label>
                <select v-model="form.department_id" required class="form-input" @change="form.subject_id = ''; onLevelOrSubjectChange()">
                  <option value="">Select Department</option>
                  <option v-for="d in meta?.departments" :key="d.id" :value="d.id">{{ d.name }}</option>
                </select>
              </div>
              <div>
                <label class="form-label">Subject *</label>
                <select v-model="form.subject_id" required class="form-input" :disabled="!form.department_id" @change="onLevelOrSubjectChange">
                  <option value="">Select Subject</option>
                  <option v-for="s in subjectsForForm" :key="s.id" :value="s.id">{{ s.name }}</option>
                </select>
              </div>
              <div>
                <label class="form-label">Assessment Objective *</label>
                <select v-model="form.assessment_objective" required class="form-input">
                  <option value="">Select AO</option>
                  <option v-for="ao in meta?.assessment_objectives" :key="ao" :value="ao">{{ ao }}</option>
                </select>
              </div>
            </div>

            <div>
              <label class="form-label">Construct Name *</label>
              <input v-model="form.name" type="text" required class="form-input" placeholder="e.g. Data Handling &amp; Interpretation" />
            </div>

            <div>
              <label class="form-label">Construct Description</label>
              <textarea v-model="form.description" rows="3" class="form-input" placeholder="What this construct assesses..."></textarea>
            </div>

            <div ref="topicDropdownRef" class="relative">
              <label class="form-label">Topics *</label>
              <p v-if="!form.subject_id || !form.level" class="text-sm text-gray-400">Select a Level and Subject first.</p>
              <template v-else>
                <button
                  type="button"
                  @click="topicDropdownOpen = !topicDropdownOpen"
                  class="w-full flex items-center justify-between px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-left focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  <span class="truncate" :class="form.topic_ids.length ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'">
                    {{ form.topic_ids.length ? `${form.topic_ids.length} topic(s) selected` : (loadingTopics ? 'Loading topics...' : (topicOptions.length ? 'Select topic(s)' : 'No topics found for this subject/level')) }}
                  </span>
                  <svg class="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                <div
                  v-if="topicDropdownOpen"
                  class="absolute z-20 mt-1 w-full max-h-80 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1"
                >
                  <div v-for="topic in topicOptions" :key="topic.id" class="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                    <div class="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        :checked="form.topic_ids.includes(topic.id)"
                        @change="toggleTopic(topic.id)"
                        class="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      >
                      <div class="min-w-0 flex-1">
                        <p class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ topic.topic }}</p>
                        <p class="text-xs text-gray-400">
                          {{ topic.class_stream_name }}<template v-if="topic.academic_year_name"> &middot; {{ topic.academic_year_name }}</template><template v-if="topic.term_name"> &middot; {{ topic.term_name }}</template>
                        </p>
                      </div>
                      <button
                        type="button"
                        @click.stop="toggleOutcomesReveal(topic.id)"
                        title="Show/hide learning outcomes"
                        class="p-1 flex-shrink-0 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <svg class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': isOutcomesRevealed(topic.id) }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                    </div>
                    <div v-if="isOutcomesRevealed(topic.id)" class="mt-2 ml-7 pl-2 border-l-2 border-indigo-100 dark:border-indigo-900">
                      <p v-if="topic.learning_outcomes.length === 0" class="text-xs text-gray-400">No learning outcomes recorded for this topic.</p>
                      <ol v-else class="text-xs text-gray-600 dark:text-gray-300 list-decimal list-inside space-y-0.5">
                        <li v-for="(lo, i) in topic.learning_outcomes" :key="i">{{ lo }}</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </template>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Select one or more topics. Click the arrow next to a topic to reveal its learning outcomes.
              </p>
            </div>
          </div>

          <div class="px-5 sm:px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-3 flex-shrink-0 rounded-b-2xl">
            <button type="button" @click="closeFormModal" class="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-medium">
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving || form.topic_ids.length === 0"
              class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {{ saving ? 'Saving...' : (editingConstruct ? 'Update Construct' : 'Save Construct') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Read-only Detail View -->
    <div v-if="detail" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="detail = null">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl md:max-w-3xl max-h-[90vh] flex flex-col">
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 sm:px-6 py-5 flex-shrink-0 rounded-t-2xl">
          <div class="flex items-center justify-between gap-4">
            <div class="min-w-0">
              <h3 class="text-xl sm:text-2xl font-bold text-white truncate">{{ detail.name }}</h3>
              <p class="text-indigo-100 text-sm mt-1">{{ detail.assessment_objective }} &middot; {{ detail.level }} &middot; {{ detail.department_name }} &middot; {{ detail.subject_name }}</p>
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
                    @click="toggleDetailOutcomesReveal(topic.id)"
                    title="Show/hide learning outcomes"
                    class="p-1 flex-shrink-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': isDetailOutcomesRevealed(topic.id) }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
                <div v-if="isDetailOutcomesRevealed(topic.id)" class="mt-2 ml-0 pl-2 border-l-2 border-indigo-100 dark:border-indigo-900">
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

    <!-- Delete Confirmation -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Confirm Delete</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to delete "{{ deleteTarget?.name }}"? Teachers and students will no longer be able to view it.
        </p>
        <div class="flex justify-end space-x-3">
          <button @click="showDeleteModal = false" class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Cancel
          </button>
          <button @click="executeDelete" :disabled="saving" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50">
            {{ saving ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import apiService from '@/services/api'
import type { Construct, ConstructMeta, ConstructForm, ConstructTopicOption } from '@/types/construct'

const router = useRouter()

const meta = ref<ConstructMeta | null>(null)
const constructs = ref<Construct[]>([])
const loading = ref(false)
const saving = ref(false)

const filterDepartmentId = ref<number | ''>('')
const filterSubjectId = ref<number | ''>('')
const filterLevel = ref('')
const search = ref('')

const subjectsForFilter = computed(() => {
  if (!filterDepartmentId.value) return meta.value?.subjects ?? []
  return (meta.value?.subjects ?? []).filter(s => s.department_id === filterDepartmentId.value)
})

watch(filterDepartmentId, () => { filterSubjectId.value = '' })
watch([filterDepartmentId, filterSubjectId, filterLevel, search], () => loadConstructs())

const emptyForm = (): ConstructForm => ({
  name: '',
  department_id: '',
  subject_id: '',
  level: '',
  assessment_objective: '',
  description: '',
  topic_ids: []
})

const form = ref<ConstructForm>(emptyForm())
const editingConstruct = ref<Construct | null>(null)
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const deleteTarget = ref<Construct | null>(null)

// Read-only "View" modal - separate from the edit form, so its own reveal-state doesn't collide
// with the form's per-topic reveal toggles.
const detail = ref<Construct | null>(null)
const detailRevealedOutcomes = ref<Set<number>>(new Set())
const isDetailOutcomesRevealed = (topicId: number) => detailRevealedOutcomes.value.has(topicId)
const toggleDetailOutcomesReveal = (topicId: number) => {
  const next = new Set(detailRevealedOutcomes.value)
  if (next.has(topicId)) next.delete(topicId)
  else next.add(topicId)
  detailRevealedOutcomes.value = next
}
async function openDetail(id: number) {
  detailRevealedOutcomes.value = new Set()
  try {
    const response = await apiService.get(`/admin/constructs/${id}`)
    if (response.data.success) detail.value = response.data.data
  } catch (err) {
    console.error('Failed to load construct detail:', err)
  }
}

const subjectsForForm = computed(() => {
  if (!form.value.department_id) return []
  return (meta.value?.subjects ?? []).filter(s => s.department_id === form.value.department_id)
})

// Topics dropdown: fetched fresh whenever both Level and Subject are chosen.
const topicOptions = ref<ConstructTopicOption[]>([])
const loadingTopics = ref(false)
const topicDropdownOpen = ref(false)
const topicDropdownRef = ref<HTMLElement | null>(null)
// Which topics currently have their learning outcomes revealed - hidden by default, per topic.
const revealedOutcomes = ref<Set<number>>(new Set())

const isOutcomesRevealed = (topicId: number) => revealedOutcomes.value.has(topicId)
const toggleOutcomesReveal = (topicId: number) => {
  const next = new Set(revealedOutcomes.value)
  if (next.has(topicId)) next.delete(topicId)
  else next.add(topicId)
  revealedOutcomes.value = next
}

const toggleTopic = (topicId: number) => {
  const idx = form.value.topic_ids.indexOf(topicId)
  if (idx === -1) form.value.topic_ids.push(topicId)
  else form.value.topic_ids.splice(idx, 1)
}

const onClassDropdownClickOutside = (event: MouseEvent) => {
  if (topicDropdownRef.value && !topicDropdownRef.value.contains(event.target as Node)) {
    topicDropdownOpen.value = false
  }
}

async function onLevelOrSubjectChange() {
  topicOptions.value = []
  if (!editingConstruct.value) form.value.topic_ids = []
  if (!form.value.subject_id || !form.value.level) return

  loadingTopics.value = true
  try {
    const response = await apiService.get('/admin/constructs/topics', {
      params: { subject_id: form.value.subject_id, level: form.value.level }
    })
    if (response.data.success) topicOptions.value = response.data.data.topics || []
  } catch (err) {
    console.error('Failed to load topics for construct:', err)
  } finally {
    loadingTopics.value = false
  }
}

async function loadMeta() {
  try {
    const response = await apiService.get('/admin/constructs/meta')
    if (response.data.success) meta.value = response.data.data
  } catch (err) {
    console.error('Failed to load construct meta:', err)
  }
}

async function loadConstructs() {
  loading.value = true
  try {
    const response = await apiService.get('/admin/constructs', {
      params: {
        department_id: filterDepartmentId.value || undefined,
        subject_id: filterSubjectId.value || undefined,
        level: filterLevel.value || undefined,
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

function openCreateModal() {
  editingConstruct.value = null
  form.value = emptyForm()
  topicOptions.value = []
  revealedOutcomes.value = new Set()
  showFormModal.value = true
}

async function openEditModal(construct: Construct) {
  editingConstruct.value = construct
  try {
    const response = await apiService.get(`/admin/constructs/${construct.id}`)
    if (!response.data.success) return
    const full: Construct = response.data.data
    form.value = {
      name: full.name,
      department_id: full.department_id,
      subject_id: full.subject_id,
      level: full.level,
      assessment_objective: full.assessment_objective,
      description: full.description || '',
      topic_ids: (full.topics || []).map(t => t.id)
    }
    revealedOutcomes.value = new Set()
    showFormModal.value = true
    await onLevelOrSubjectChange()
    // onLevelOrSubjectChange() resets topic_ids for a fresh selection - restore what was saved.
    form.value.topic_ids = (full.topics || []).map(t => t.id)
  } catch (err) {
    console.error('Failed to load construct for edit:', err)
  }
}

function closeFormModal() {
  showFormModal.value = false
  topicDropdownOpen.value = false
}

// Each checked box represents a group (one entry per class LEVEL, e.g. "S.1" - see
// ConstructTopicOption's docblock); expand back to every underlying curriculum_topic_id (one per
// class-stream, e.g. S.1-A/S.1-B/S.1-C) before submitting, so all of them get linked.
function expandTopicIds(representativeIds: number[]): number[] {
  const byId = new Map(topicOptions.value.map(t => [t.id, t.topic_ids]))
  const expanded = new Set<number>()
  for (const id of representativeIds) {
    for (const underlyingId of byId.get(id) ?? [id]) expanded.add(underlyingId)
  }
  return Array.from(expanded)
}

async function saveForm() {
  saving.value = true
  try {
    const payload = { ...form.value, topic_ids: expandTopicIds(form.value.topic_ids) }
    const response = editingConstruct.value
      ? await apiService.put(`/admin/constructs/${editingConstruct.value.id}`, payload)
      : await apiService.post('/admin/constructs', payload)

    if (response.data.success) {
      closeFormModal()
      await loadConstructs()
    } else {
      alert(response.data.message || 'Failed to save construct')
    }
  } catch (err: any) {
    console.error('Failed to save construct:', err)
    alert(err.response?.data?.message || 'Failed to save construct')
  } finally {
    saving.value = false
  }
}

function confirmDelete(construct: Construct) {
  deleteTarget.value = construct
  showDeleteModal.value = true
}

async function executeDelete() {
  if (!deleteTarget.value) return
  saving.value = true
  try {
    const response = await apiService.delete(`/admin/constructs/${deleteTarget.value.id}`)
    if (response.data.success) {
      showDeleteModal.value = false
      deleteTarget.value = null
      await loadConstructs()
    }
  } catch (err) {
    console.error('Failed to delete construct:', err)
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await loadMeta()
  await loadConstructs()
  document.addEventListener('click', onClassDropdownClickOutside)
})
onUnmounted(() => document.removeEventListener('click', onClassDropdownClickOutside))
</script>

<style scoped>
.filter-select {
  @apply px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-sm;
}
.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2;
}
.form-input {
  @apply w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed;
}
.tag-pill {
  @apply inline-flex items-center px-2 py-1 rounded-md text-xs font-medium;
}
</style>
