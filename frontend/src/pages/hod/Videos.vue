<template>
  <div>
    <!-- Hero -->
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-indigo-500/20 p-4 sm:p-5 mb-6">
      <div class="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10"></div>
      <div class="absolute -right-3 bottom-0 w-24 h-24 rounded-full bg-white/10"></div>
      <div class="relative flex items-center gap-3 mb-3">
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-sm flex-shrink-0 ring-2 ring-white/20">
          <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div class="min-w-0">
          <h1 class="text-lg sm:text-2xl font-bold text-white leading-tight">Videos</h1>
          <p class="text-xs sm:text-sm text-indigo-100">Moderate video lessons uploaded by teachers in your department</p>
        </div>
      </div>

      <div v-if="!loading" class="relative flex flex-wrap items-center gap-2 mb-3">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 backdrop-blur-sm text-white">
          {{ stats.total }} total
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 backdrop-blur-sm text-white">
          {{ stats.draft }} draft
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 backdrop-blur-sm text-white">
          {{ stats.published }} published
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 backdrop-blur-sm text-white">
          {{ stats.archived }} archived
        </span>
      </div>

      <!-- Search -->
      <div class="relative">
        <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          v-model="search"
          @input="debouncedSearch"
          type="text"
          placeholder="Search by title, description, or teacher name..."
          class="relative w-full pl-9 pr-4 py-2 rounded-lg border-0 shadow-md focus:ring-2 focus:ring-white/50 bg-white text-gray-900 dark:bg-gray-800 dark:text-white transition-colors"
        >
      </div>
    </div>

    <!-- Status filter -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="opt in statusOptions"
        :key="opt.value"
        @click="statusFilter = opt.value; fetchVideos()"
        class="px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors border"
        :class="statusFilter === opt.value
          ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700'"
      >
        {{ opt.label }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="i in 6" :key="i" class="animate-pulse">
        <div class="aspect-video rounded-xl bg-gray-200 dark:bg-gray-700 mb-3"></div>
        <div class="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>

    <!-- Empty -->
    <div v-else-if="videos.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
      <svg class="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
      <p class="text-gray-500 dark:text-gray-400">
        {{ search || statusFilter ? 'No videos match your filters' : 'No videos uploaded in your department yet' }}
      </p>
    </div>

    <!-- Videos -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="video in videos" :key="video.id" class="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow overflow-hidden">
        <button class="block w-full text-left" @click="previewVideo = video">
          <VideoCover :video="video" />
        </button>

        <div class="p-4">
          <div class="flex items-start justify-between gap-2 mb-2">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{{ video.title }}</h3>
            <span
              class="px-2 py-0.5 rounded-full text-[11px] font-medium flex-shrink-0 capitalize"
              :class="video.status === 'published' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                video.status === 'draft' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'"
            >
              {{ video.status }}
            </span>
          </div>

          <p v-if="video.description" class="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{{ video.description }}</p>

          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">
            By {{ video.teacher_first_name ? `${video.teacher_first_name} ${video.teacher_last_name}` : 'Unknown teacher' }}
          </p>

          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span v-if="video.subject_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
              {{ video.subject_name }}
            </span>
            <span v-if="video.class_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {{ video.class_name }}{{ video.class_stream_name ? ' - ' + video.class_stream_name : '' }}
            </span>
          </div>

          <div class="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
            <select
              :value="video.status"
              @change="changeStatus(video, ($event.target as HTMLSelectElement).value)"
              class="text-xs px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <button
              @click="deleteVideo(video)"
              class="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
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

    <!-- Video Preview -->
    <div v-if="previewVideo" @click.self="previewVideo = null" class="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
      <div class="w-full max-w-3xl">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-white font-semibold truncate">{{ previewVideo.title }}</h3>
          <button @click="previewVideo = null" class="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <video :src="resolveAssetUrl(previewVideo.file_path)" controls autoplay class="w-full rounded-xl max-h-[75vh] bg-black"></video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiService } from '@/services/api'
import VideoCover from '@/components/video/VideoCover.vue'
import type { VideoResource } from '@/types/video'
import { resolveAssetUrl } from '@/utils/url'

const videos = ref<VideoResource[]>([])
const stats = ref({ total: 0, draft: 0, published: 0, archived: 0 })
const loading = ref(false)
const search = ref('')
const statusFilter = ref('')
const previewVideo = ref<VideoResource | null>(null)

const statusOptions = [
  { value: '', label: 'All' },
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' }
]

let searchTimer: number | null = null
const debouncedSearch = () => {
  if (searchTimer) window.clearTimeout(searchTimer)
  searchTimer = window.setTimeout(() => fetchVideos(), 350)
}

const fetchVideos = async () => {
  loading.value = true
  try {
    const response = await apiService.get('/hod/videos', {
      search: search.value || undefined,
      status: statusFilter.value || undefined
    })
    if (response.data.success) {
      videos.value = response.data.data.videos || []
      stats.value = response.data.data.stats
    }
  } catch (error) {
    console.error('Failed to fetch videos:', error)
  } finally {
    loading.value = false
  }
}

const changeStatus = async (video: VideoResource, status: string) => {
  try {
    await apiService.put(`/hod/videos/${video.id}`, { status })
    await fetchVideos()
  } catch (error: any) {
    console.error('Failed to update video status:', error)
    alert(error.response?.data?.message || 'Failed to update video status')
  }
}

const deleteVideo = async (video: VideoResource) => {
  if (!confirm(`Are you sure you want to delete "${video.title}"? This action cannot be undone.`)) return

  try {
    await apiService.delete(`/hod/videos/${video.id}`)
    await fetchVideos()
  } catch (error: any) {
    console.error('Failed to delete video:', error)
    alert(error.response?.data?.message || 'Failed to delete video')
  }
}

onMounted(() => {
  fetchVideos()
})
</script>
