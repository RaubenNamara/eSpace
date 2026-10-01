<template>
  <div>
      <!-- Header - icon and title share a row with the search box, matching the compact style
           used across the teacher/HOD modules; the subtitle (with counts folded in) sits on its
           own line underneath. -->
      <div class="flex items-center gap-2 mb-1">
        <div class="flex items-center gap-2 flex-shrink-0">
          <div class="hidden sm:flex w-7 h-7 rounded-lg bg-indigo-600 items-center justify-center flex-shrink-0">
            <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap">Videos</h1>
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
        Video lessons shared by your teachers<span v-if="!loading && subjectGroups.length > 0"> &middot; {{ videos.length }} {{ videos.length === 1 ? 'video' : 'videos' }} &middot; {{ subjectGroups.length }} {{ subjectGroups.length === 1 ? 'subject' : 'subjects' }}</span>
      </p>

      <!-- Loading: an empty shelf while videos arrive -->
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

      <!-- Video shelves: one shelf per subject, same as the eLibrary bookcase -->
      <div v-else-if="filteredSubjectGroups.length > 0" class="shelf-row flex flex-wrap items-start gap-x-5 gap-y-7">
        <Bookshelf
          v-for="group in filteredSubjectGroups"
          :key="group.id"
          :title="group.name"
          :count="group.videos.length"
          :fresh="group.videos.filter(v => isRecent(v)).length"
          spines
        >
          <ShelfSlot
            v-for="video in group.videos"
            :key="video.id"
            :label="video.title"
            open-label="Play"
            @open="playVideo = video"
          >
            <template #cover>
              <div class="w-full"><VideoCover :video="video" size="sm" /></div>
            </template>
            <ShelfBook spine-out :is-new="isRecent(video)" :title="video.title" :seed="video.id" :label="subjectTag(video.subject_name, video.subject_code)" footer="Video" />
            <template #details>
              <p class="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">{{ video.title }}</p>
              <p v-if="video.teacher_first_name" class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ video.teacher_first_name }} {{ video.teacher_last_name }}</p>
              <p v-if="video.description" class="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">{{ video.description }}</p>
              <p class="text-[11px] text-gray-400 dark:text-gray-500">Video<template v-if="video.file_size"> &middot; {{ formatFileSize(video.file_size) }}</template></p>
            </template>
          </ShelfSlot>
        </Bookshelf>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {{ subjectGroups.length === 0 ? 'No videos yet' : 'No videos match your search' }}
        </h3>
        <p class="text-gray-500 dark:text-gray-400">
          {{ subjectGroups.length === 0 ? 'Your teachers haven\'t shared any videos with your department yet.' : 'Try a different search.' }}
        </p>
      </div>

    <!-- Player -->
    <VideoPlayerModal v-if="playVideo" :video="playVideo" track-progress @close="playVideo = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import VideoPlayerModal from '@/components/video/VideoPlayerModal.vue'
import VideoCover from '@/components/video/VideoCover.vue'
import Bookshelf from '@/components/library/Bookshelf.vue'
import ShelfBook from '@/components/library/ShelfBook.vue'
import ShelfSlot from '@/components/library/ShelfSlot.vue'
import { subjectTag } from '@/utils/subjectTag'
import { orderShelves, isRecent } from '@/utils/shelfOrder'
import type { VideoResource } from '@/types/video'

interface SubjectGroup {
  id: number
  name: string
  code?: string
  videos: VideoResource[]
}

const API_BASE = '/api'

const videos = ref<VideoResource[]>([])
const searchQuery = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const playVideo = ref<VideoResource | null>(null)

const subjectGroups = computed<SubjectGroup[]>(() => {
  const map = new Map<number, SubjectGroup>()
  videos.value.forEach(video => {
    const sid = video.subject_id || 0
    if (!map.has(sid)) {
      map.set(sid, { id: sid, name: video.subject_name || 'General', code: video.subject_code, videos: [] })
    }
    map.get(sid)!.videos.push(video)
  })
  return orderShelves(Array.from(map.values()), g => g.videos)
})

const filteredSubjectGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return subjectGroups.value
  return subjectGroups.value
    .map(group => group.name.toLowerCase().includes(q)
      ? group
      : { ...group, videos: group.videos.filter(v => v.title.toLowerCase().includes(q) || (v.description || '').toLowerCase().includes(q)) })
    .filter(group => group.videos.length > 0)
})

const formatFileSize = (bytes: number | null) => {
  if (!bytes) return ''
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

const loadVideos = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(`${API_BASE}/student/videos`)
    if (response.data.success) {
      videos.value = response.data.data.videos || []
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load videos'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadVideos()
})
</script>
