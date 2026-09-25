<template>
  <div>
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

    <!-- Loading: an empty shelf while resources arrive -->
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

    <!-- Bookcase: one shelf per subject, resources standing on it -->
    <div v-else-if="filteredSubjectGroups.length > 0" class="shelf-row flex flex-wrap items-start gap-x-5 gap-y-7">
      <Bookshelf v-if="!searchQuery && recentResources.length > 0" title="Recently Added" spines>
        <ShelfSlot
          v-for="resource in recentResources"
          :key="'recent-' + resource.id"
          :label="resource.title"
          @open="previewResource = resource"
        >
          <template #cover="{ size }">
            <ShelfBook flat :size="size" :title="resource.title" :seed="resource.id" :label="shelfLabel(resource)" :cover-image="resource.cover_image" :pages="resource.total_pages" />
          </template>
          <ShelfBook spine-out :title="resource.title" :seed="resource.id" :label="shelfLabel(resource)" :cover-image="resource.cover_image" :pages="resource.total_pages" />
          <template #details>
            <p class="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">{{ resource.title }}</p>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ resource.subject_name || 'General' }}</p>
          </template>
        </ShelfSlot>
      </Bookshelf>

      <Bookshelf
        v-for="group in filteredSubjectGroups"
        :key="group.id"
        :title="group.name"
        :count="group.resources.length"
        :empty="group.resources.length ? '' : 'No resources yet'"
        spines
      >
        <ShelfSlot
          v-for="resource in group.resources"
          :key="resource.id"
          :label="resource.title"
          @open="previewResource = resource"
        >
          <template #cover="{ size }">
            <ShelfBook flat :size="size" :title="resource.title" :seed="resource.id" :label="shelfLabel(resource)" :cover-image="resource.cover_image" :pages="resource.total_pages" />
          </template>
          <ShelfBook spine-out :title="resource.title" :seed="resource.id" :label="shelfLabel(resource)" :cover-image="resource.cover_image" :pages="resource.total_pages" />
          <template #details>
            <p class="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">{{ resource.title }}</p>
            <p v-if="resource.teacher_first_name" class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ resource.teacher_first_name }} {{ resource.teacher_last_name }}</p>
            <p class="text-[11px] text-gray-400 dark:text-gray-500">PDF<template v-if="resource.total_pages"> &middot; {{ resource.total_pages }} pages</template><template v-else-if="resource.file_size"> &middot; {{ formatFileSize(resource.file_size) }}</template></p>
          </template>
        </ShelfSlot>
      </Bookshelf>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {{ subjectGroups.length === 0 ? 'No resources yet' : 'No resources match your search' }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        {{ subjectGroups.length === 0 ? 'Your teachers haven\'t shared any PDFs with your department yet.' : 'Try a different search.' }}
      </p>
    </div>

    <!-- PDF Preview -->
    <ItemBankPdfViewer v-if="previewResource" :resource="previewResource" @close="previewResource = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import ItemBankPdfViewer from '@/components/itembank/ItemBankPdfViewer.vue'
import Bookshelf from '@/components/library/Bookshelf.vue'
import ShelfBook from '@/components/library/ShelfBook.vue'
import ShelfSlot from '@/components/library/ShelfSlot.vue'
import type { ItemBankResource } from '@/types/itembank'
import { subjectTag } from '@/utils/subjectTag'
import { orderShelves } from '@/utils/shelfOrder'

interface SubjectGroup {
  id: number
  name: string
  code?: string
  resources: ItemBankResource[]
}

const API_BASE = '/api'

const resources = ref<ItemBankResource[]>([])
// Every subject the student is enrolled in - each gets a shelf, even before it has any resources
const enrolledSubjects = ref<{ id: number; name: string; code?: string }[]>([])
const searchQuery = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const previewResource = ref<ItemBankResource | null>(null)

const shelfLabel = (resource: ItemBankResource) => subjectTag(resource.subject_name, resource.subject_code)

const subjectGroups = computed<SubjectGroup[]>(() => {
  const map = new Map<number, SubjectGroup>()
  enrolledSubjects.value.forEach(subj => {
    map.set(subj.id, { id: subj.id, name: subj.name, code: subj.code, resources: [] })
  })
  resources.value.forEach(resource => {
    const sid = resource.subject_id || 0
    if (!map.has(sid)) {
      map.set(sid, { id: sid, name: resource.subject_name || 'General', code: resource.subject_code, resources: [] })
    }
    map.get(sid)!.resources.push(resource)
  })
  return orderShelves(Array.from(map.values()), g => g.resources)
})

// Search narrows each shelf to its matching resources (a subject-name match keeps the whole
// shelf), and drops shelves left empty.
const filteredSubjectGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return subjectGroups.value
  return subjectGroups.value
    .map(group => group.name.toLowerCase().includes(q)
      ? group
      : { ...group, resources: group.resources.filter(resource => resource.title.toLowerCase().includes(q) || (resource.description || '').toLowerCase().includes(q)) })
    .filter(group => group.resources.length > 0)
})

const recentResources = computed(() => {
  return [...resources.value]
    .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime())
    .slice(0, 10)
})

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
      enrolledSubjects.value = response.data.data.subjects || []
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
