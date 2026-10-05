<template>
  <div>
    <PageHeader title="Item Bank" description="Past papers and practice questions from your teachers - open one to work through it." icon="clipboard" accent="amber">
      <template #filters>
        <div class="relative">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="searchQuery" type="search" placeholder="Search papers" class="w-full md:w-56 pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
        </div>
      </template>
    </PageHeader>

    <!-- Offline: only what's saved on this device is on the shelf -->
    <div v-if="showingOffline" class="mb-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-100">
      <svg class="w-4 h-4 flex-shrink-0 mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728M5.636 18.364a9 9 0 010-12.728M3 3l18 18" /></svg>
      <p>Only the resources saved on this device are shown. Page notes you write now are sent when you're back online.</p>
    </div>

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
      <Bookshelf
        v-for="group in filteredSubjectGroups"
        :key="group.id"
        :title="group.name"
        :count="group.resources.length"
        :fresh="group.resources.filter(item => isRecent(item)).length"
        spines
      >
        <ShelfSlot
          v-for="resource in group.resources"
          :key="resource.id"
          :label="resource.title"
          @open="(el) => openItem(resource, el)"
        >
          <template #cover="{ size }">
            <ShelfBook flat :size="size" :title="resource.title" :seed="resource.id" :label="shelfLabel(resource)" :cover-image="resource.cover_image" :pages="resource.total_pages" />
          </template>
          <ShelfBook spine-out :is-new="isRecent(resource)" :saved="!!offline.docs[docKey('itembank', resource.id)]" :title="resource.title" :seed="resource.id" :label="shelfLabel(resource)" :cover-image="resource.cover_image" :pages="resource.total_pages" />
          <template #details>
            <p class="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">{{ resource.title }}</p>
            <p v-if="resource.teacher_first_name" class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ resource.teacher_first_name }} {{ resource.teacher_last_name }}</p>
            <p class="text-[11px] text-gray-400 dark:text-gray-500">PDF<template v-if="resource.total_pages"> &middot; {{ resource.total_pages }} pages</template><template v-else-if="resource.file_size"> &middot; {{ formatFileSize(resource.file_size) }}</template></p>
            <SaveOfflineButton :item="resource" kind="itembank" />
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
        {{ subjectGroups.length === 0 ? (showingOffline ? 'Nothing saved on this device' : 'No resources yet') : 'No resources match your search' }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        {{ subjectGroups.length === 0 ? (showingOffline ? 'When you\'re online, open a book on the shelf and choose Save for offline.' : 'Your teachers haven\'t shared any PDFs with your department yet.') : 'Try a different search.' }}
      </p>
    </div>

    <!-- PDF Preview -->
    <ItemBankPdfViewer v-if="previewResource" :resource="previewResource" :start-in-read-mode="readFromShelf" @close="previewResource = null; readFromShelf = false" />

    <!-- Opening a book: it comes off the shelf, waits with Start reading / Cancel, then opens into
         the reader (or goes back to its place) -->
    <BookOpenTransition
      v-if="opening"
      :from="opening.el"
      :title="opening.item.title"
      :label="shelfLabel(opening.item)"
      :subtitle="[opening.item.teacher_first_name, opening.item.teacher_last_name].filter(Boolean).join(' ')"
      @opened="finishOpening"
      @closed="opening = null"
    >
      <ShelfBook flat size="lg" :title="opening.item.title" :seed="opening.item.id" :label="shelfLabel(opening.item)" :cover-image="opening.item.cover_image" :pages="opening.item.total_pages" />
    </BookOpenTransition>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/ui/PageHeader.vue'
import { ref, computed, onMounted, nextTick } from 'vue'
import axios from 'axios'
import ItemBankPdfViewer from '@/components/itembank/ItemBankPdfViewer.vue'
import Bookshelf from '@/components/library/Bookshelf.vue'
import ShelfBook from '@/components/library/ShelfBook.vue'
import ShelfSlot from '@/components/library/ShelfSlot.vue'
import BookOpenTransition from '@/components/library/BookOpenTransition.vue'
import type { ItemBankResource } from '@/types/itembank'
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

// The book being opened (BookOpenTransition plays first). Once it has opened, the reader is put up
// underneath and the animation cleared off the top of it.
const opening = ref<{ item: ItemBankResource; el: HTMLElement | null } | null>(null)
const openItem = (item: ItemBankResource, el: HTMLElement | null) => {
  if (opening.value || previewResource.value) return
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
  previewResource.value = opening.value.item
  await nextTick()
  opening.value = null
}

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
  // Only subjects with something on them get a shelf
  return orderShelves(Array.from(map.values()).filter(g => g.resources.length > 0), g => g.resources)
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
      showingOffline.value = !!response.data.offline
      resources.value = response.data.data.resources || []
      enrolledSubjects.value = response.data.data.subjects || []
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load item bank'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadItemBank()
  // Opened from Downloads (?open=<id>): straight into the reader
  const wanted = Number(route.query.open)
  const item = wanted ? resources.value.find(b => Number(b.id) === wanted) : null
  if (item) previewResource.value = item
})
</script>
