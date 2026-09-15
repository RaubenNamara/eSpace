<template>
  <div>
    <template v-if="!activeSubjectId">
      <!-- Header - icon and title share a row with the search box, matching the compact style
           used across the teacher/HOD modules; the subtitle (with counts folded in) sits on its
           own line underneath. -->
      <div class="flex items-center gap-2 mb-1">
        <div class="flex items-center gap-2 flex-shrink-0">
          <div class="hidden sm:flex w-7 h-7 rounded-lg bg-indigo-600 items-center justify-center flex-shrink-0">
            <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap">Item Bank</h1>
        </div>

        <div class="flex-1 flex justify-center min-w-0">
          <div class="relative flex-shrink min-w-0 w-32 sm:w-80">
            <svg class="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full pl-8 pr-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            >
          </div>
        </div>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">
        PDF resources shared by your teachers<span v-if="!loading && subjectGroups.length > 0"> &middot; {{ resources.length }} {{ resources.length === 1 ? 'resource' : 'resources' }} &middot; {{ subjectGroups.length }} {{ subjectGroups.length === 1 ? 'subject' : 'subjects' }}</span>
      </p>

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
        <div v-if="!searchQuery && recentResources.length > 0" class="mb-10">
          <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Recently Added</h2>
          <div class="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scroll-smooth">
            <button
              v-for="resource in recentResources"
              :key="'recent-' + resource.id"
              @click="previewResource = resource"
              class="group flex-shrink-0 w-32 sm:w-36 text-left"
            >
              <ItemCover :resource="resource" size="sm" />
              <p class="mt-2 text-xs font-medium text-gray-800 dark:text-gray-200 line-clamp-2 leading-snug">{{ resource.title }}</p>
              <p class="text-[11px] text-gray-400 dark:text-gray-500 truncate">{{ resource.subject_name || 'General' }}</p>
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
              class="absolute -right-6 -top-6 w-28 h-28 rounded-full opacity-10 transition-transform duration-300 group-hover:scale-125"
              :class="subjectPalette(group.id).solid"
            ></div>
            <div class="relative flex items-start justify-between mb-4">
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-sm flex-shrink-0"
                :class="subjectPalette(group.id).solid"
              >
                {{ subjectInitials(group) }}
              </div>
              <svg class="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
            <h3 class="relative text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
              {{ group.name }}
            </h3>
            <span
              class="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
              :class="subjectPalette(group.id).softText"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              {{ group.resources.length }} {{ group.resources.length === 1 ? 'resource' : 'resources' }}
            </span>
          </button>
        </div>
      </template>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {{ subjectGroups.length === 0 ? 'No resources yet' : 'No subjects match your search' }}
        </h3>
        <p class="text-gray-500 dark:text-gray-400">
          {{ subjectGroups.length === 0 ? 'Your teachers haven\'t shared any PDFs with your department yet.' : 'Try a different search.' }}
        </p>
      </div>
    </template>

    <!-- Subject Shelf -->
    <template v-else>
      <div class="flex items-center gap-2 mb-2">
        <button
          @click="activeSubjectId = null"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
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
          class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          :class="activeSubject ? subjectPalette(activeSubject.id).solid : ''"
        >
          {{ activeSubject ? subjectInitials(activeSubject) : '' }}
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white leading-tight">{{ activeSubject?.name }}</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ activeSubjectResources.length }} {{ activeSubjectResources.length === 1 ? 'resource' : 'resources' }}</p>
        </div>
      </div>

      <div v-if="activeSubjectResources.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 sm:gap-6">
        <button
          v-for="resource in activeSubjectResources"
          :key="resource.id"
          @click="previewResource = resource"
          class="group text-left"
        >
          <ItemCover :resource="resource" />
          <h3 class="mt-3 text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {{ resource.title }}
          </h3>
          <p v-if="resource.teacher_first_name" class="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
            {{ resource.teacher_first_name }} {{ resource.teacher_last_name }}
          </p>
          <p class="text-xs text-gray-400 dark:text-gray-500">{{ formatFileSize(resource.file_size) }}</p>
        </button>
      </div>

      <div v-else class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <p class="text-gray-500 dark:text-gray-400">No resources in this subject yet.</p>
      </div>
    </template>

    <!-- PDF Preview -->
    <ItemBankPdfViewer v-if="previewResource" :resource="previewResource" @close="previewResource = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import ItemBankPdfViewer from '@/components/itembank/ItemBankPdfViewer.vue'
import ItemCover from '@/components/itembank/ItemCover.vue'
import type { ItemBankResource } from '@/types/itembank'

interface SubjectGroup {
  id: number
  name: string
  code?: string
  resources: ItemBankResource[]
}

const API_BASE = '/api'

const resources = ref<ItemBankResource[]>([])
const searchQuery = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const activeSubjectId = ref<number | null>(null)
const previewResource = ref<ItemBankResource | null>(null)

const palettes = [
  { solid: 'bg-indigo-600', softText: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
  { solid: 'bg-blue-600', softText: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { solid: 'bg-emerald-600', softText: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { solid: 'bg-amber-600', softText: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  { solid: 'bg-rose-600', softText: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
  { solid: 'bg-violet-600', softText: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { solid: 'bg-sky-600', softText: 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300' },
  { solid: 'bg-teal-600', softText: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' }
]
const subjectPalette = (id: number) => palettes[Math.abs(id) % palettes.length]
const subjectInitials = (subj: { name: string; code?: string }) => {
  if (subj.code) return subj.code.slice(0, 3).toUpperCase()
  return subj.name.split(/\s+/).filter(Boolean).map(w => w[0]).join('').slice(0, 3).toUpperCase() || '?'
}

const subjectGroups = computed<SubjectGroup[]>(() => {
  const map = new Map<number, SubjectGroup>()
  resources.value.forEach(resource => {
    const sid = resource.subject_id || 0
    if (!map.has(sid)) {
      map.set(sid, { id: sid, name: resource.subject_name || 'General', code: resource.subject_code, resources: [] })
    }
    map.get(sid)!.resources.push(resource)
  })
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
})

const filteredSubjectGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return subjectGroups.value
  return subjectGroups.value.filter(group => {
    if (group.name.toLowerCase().includes(q)) return true
    return group.resources.some(resource => resource.title.toLowerCase().includes(q) || (resource.description || '').toLowerCase().includes(q))
  })
})

const recentResources = computed(() => {
  return [...resources.value]
    .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime())
    .slice(0, 10)
})

const activeSubject = computed(() => subjectGroups.value.find(g => g.id === activeSubjectId.value) || null)
const activeSubjectResources = computed(() => activeSubject.value?.resources || [])

const formatFileSize = (bytes: number | null) => {
  if (!bytes) return ''
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

const loadItemBank = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(`${API_BASE}/student/itembank`)
    if (response.data.success) {
      resources.value = response.data.data.resources || []
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load item bank'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadItemBank()
})
</script>
