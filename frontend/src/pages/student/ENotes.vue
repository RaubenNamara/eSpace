<template>
  <div>
    <!-- Header - icon and title share a row with the search box, matching the compact style
         used across the teacher/HOD modules; the subtitle (with counts folded in) sits on its
         own line underneath. -->
    <div class="flex items-center gap-2 mb-1">
      <div class="flex items-center gap-2 flex-shrink-0">
        <div class="hidden sm:flex w-7 h-7 rounded-lg bg-indigo-600 items-center justify-center flex-shrink-0">
          <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap">eNotes</h1>
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
      Study notes from your teachers, with AI voice narration<span v-if="!loading && subjectGroups.length > 0"> &middot; {{ topics.length }} {{ topics.length === 1 ? 'topic' : 'topics' }} &middot; {{ subjectGroups.length }} {{ subjectGroups.length === 1 ? 'subject' : 'subjects' }}</span>
    </p>

    <!-- Loading: an empty shelf while topics arrive -->
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

    <!-- Bookcase: one shelf per subject, each topic an exercise book standing on it -->
    <div v-else-if="filteredSubjectGroups.length > 0" class="space-y-8">
      <Bookshelf
        v-for="group in filteredSubjectGroups"
        :key="group.id"
        :title="group.name"
        :count="group.topics.length"
        spines
      >
        <ShelfSlot
          v-for="topic in group.topics"
          :key="topic.id"
          :label="topic.title"
          @open="router.push(`/student/enotes/${topic.id}`)"
        >
          <ShelfBook
            spine-out
            variant="notes"
            :title="topic.title"
            :seed="topic.id"
            :label="(topic.subject_code || topic.subject_name || '').slice(0, 10).toUpperCase()"
            :footer="`${topic.total_pages} ${topic.total_pages === 1 ? 'page' : 'pages'}`"
            :cover="parseCoverDesign(topic.cover_design)"
          />
          <template #details>
          <p class="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">{{ topic.title }}</p>
          <p v-if="topic.teacher_first_name" class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ topic.teacher_first_name }} {{ topic.teacher_last_name }}</p>
          <p class="text-[11px] text-gray-400 dark:text-gray-500">{{ topic.total_pages }} {{ topic.total_pages === 1 ? 'page' : 'pages' }}<template v-if="topic.narration_voice"> &middot; <span class="text-purple-600 dark:text-purple-300">🔊 Audio</span></template></p>
          <p class="mt-1 text-[11px] font-medium text-indigo-600 dark:text-indigo-400">Click the book to open</p>
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
        {{ subjectGroups.length === 0 ? 'No eNotes yet' : 'No topics match your search' }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        {{ subjectGroups.length === 0 ? 'Your teachers haven\'t published any eNotes topics yet.' : 'Try a different search.' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Bookshelf from '@/components/library/Bookshelf.vue'
import ShelfBook from '@/components/library/ShelfBook.vue'
import ShelfSlot from '@/components/library/ShelfSlot.vue'
import { useRouter } from 'vue-router'
import type { ENoteTopic } from '@/types/enotes'
import { parseCoverDesign } from '@/utils/enoteCover'

interface SubjectGroup {
  id: number
  name: string
  code?: string
  topics: ENoteTopic[]
}

const API_BASE = '/api'
const router = useRouter()

const topics = ref<ENoteTopic[]>([])
const searchQuery = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const subjectGroups = computed<SubjectGroup[]>(() => {
  const map = new Map<number, SubjectGroup>()
  topics.value.forEach(topic => {
    const sid = topic.subject_id || 0
    if (!map.has(sid)) {
      map.set(sid, { id: sid, name: topic.subject_name || 'General', code: topic.subject_code, topics: [] })
    }
    map.get(sid)!.topics.push(topic)
  })
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
})

// Search narrows each shelf to its matching topics (a subject-name match keeps the whole shelf),
// and drops shelves left empty.
const filteredSubjectGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return subjectGroups.value
  return subjectGroups.value
    .map(group => group.name.toLowerCase().includes(q)
      ? group
      : { ...group, topics: group.topics.filter(topic => topic.title.toLowerCase().includes(q) || (topic.description || '').toLowerCase().includes(q)) })
    .filter(group => group.topics.length > 0)
})

const loadTopics = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(`${API_BASE}/student/enotes/topics`)
    if (response.data.success) {
      topics.value = response.data.data.topics || []
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load eNotes'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadTopics()
})
</script>
