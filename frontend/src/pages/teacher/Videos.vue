<template>
  <div>
    <!-- Header - title shares a row with the filters/action (never wrapping, scrolling
         horizontally on narrow screens instead) so the dropdowns always line up with the
         heading; the subtitle drops to its own full-width line underneath. -->
    <div class="flex items-center justify-between gap-2 mb-1">
      <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap flex-shrink-0">Videos</h1>

      <div class="flex items-center gap-2 flex-1 min-w-0 justify-end">
        <div class="flex flex-nowrap items-center gap-2 overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0 min-w-0">
          <select v-model="statusFilter" class="flex-shrink-0 max-w-[92px] truncate px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
            <option value="">Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          <select
            v-model="subjectFilter"
            class="flex-shrink-0 max-w-[92px] truncate px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            :disabled="!assignments?.subjects || assignments.subjects.length === 0"
          >
            <option value="">Subjects</option>
            <option v-for="subject in assignments?.subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
          </select>

          <select
            v-model="classFilter"
            class="flex-shrink-0 max-w-[92px] truncate px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            :disabled="!assignments?.classes || assignments.classes.length === 0"
          >
            <option value="">Classes</option>
            <option v-for="cls in assignments?.classes" :key="cls.id" :value="cls.id">
              {{ cls.name }} ({{ cls.level }}{{ cls.stream_name ? ' - ' + cls.stream_name : '' }})
            </option>
          </select>

          <div v-if="assignmentsError" class="flex-shrink-0 text-red-600 dark:text-red-400 text-xs whitespace-nowrap">{{ assignmentsError }}</div>
        </div>

        <button
          v-if="videos.length > 0"
          @click="openCreateModal"
          class="flex-shrink-0 px-2.5 py-1 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-sm shadow-indigo-500/20 whitespace-nowrap"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Upload Video</span>
        </button>
      </div>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Upload video resources for your classes.</p>

    <!-- Stats - clickable to filter the list below; the count sits as a corner badge so each
         card is shorter and the label can be centered. -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <button
        @click="statusFilter = ''"
        class="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-shadow hover:shadow-md text-center"
        :class="statusFilter === '' ? 'border-indigo-300 dark:border-indigo-700 ring-1 ring-indigo-100 dark:ring-indigo-900/30' : 'border-gray-200 dark:border-gray-700'"
      >
        <span class="absolute top-2 right-3 text-lg font-bold text-gray-900 dark:text-white">{{ stats.total }}</span>
        <p class="text-sm text-gray-500 dark:text-gray-400">Total Videos</p>
      </button>
      <button
        @click="statusFilter = 'draft'"
        class="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-shadow hover:shadow-md text-center"
        :class="statusFilter === 'draft' ? 'border-yellow-300 dark:border-yellow-700 ring-1 ring-yellow-100 dark:ring-yellow-900/30' : 'border-gray-200 dark:border-gray-700'"
      >
        <span class="absolute top-2 right-3 text-lg font-bold text-yellow-600 dark:text-yellow-400">{{ stats.draft }}</span>
        <p class="text-sm text-gray-500 dark:text-gray-400">Draft</p>
      </button>
      <button
        @click="statusFilter = 'published'"
        class="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-shadow hover:shadow-md text-center"
        :class="statusFilter === 'published' ? 'border-green-300 dark:border-green-700 ring-1 ring-green-100 dark:ring-green-900/30' : 'border-gray-200 dark:border-gray-700'"
      >
        <span class="absolute top-2 right-3 text-lg font-bold text-green-600 dark:text-green-400">{{ stats.published }}</span>
        <p class="text-sm text-gray-500 dark:text-gray-400">Published</p>
      </button>
      <button
        @click="statusFilter = 'archived'"
        class="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-shadow hover:shadow-md text-center"
        :class="statusFilter === 'archived' ? 'border-gray-400 dark:border-gray-500 ring-1 ring-gray-200 dark:ring-gray-700' : 'border-gray-200 dark:border-gray-700'"
      >
        <span class="absolute top-2 right-3 text-lg font-bold text-gray-600 dark:text-gray-400">{{ stats.archived }}</span>
        <p class="text-sm text-gray-500 dark:text-gray-400">Archived</p>
      </button>
    </div>

    <!-- Videos -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading videos...</p>
    </div>

    <div v-else-if="filteredVideos.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
      <p class="text-gray-600 dark:text-gray-400 mb-4">{{ videos.length === 0 ? 'No videos uploaded yet' : 'No videos match your filters' }}</p>
      <button v-if="videos.length === 0" @click="openCreateModal" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
        Upload Your First Video
      </button>
      <button v-else @click="clearFilters" class="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
        Clear filters
      </button>
    </div>

    <template v-else>
      <div class="flex items-center gap-2 mb-3">
        <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
          <input
            type="checkbox"
            :checked="bulk.allSelected(visibleIds)"
            @change="bulk.toggleAll(visibleIds)"
            class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
          >
          Select all
        </label>
      </div>

      <BulkActionBar :count="bulk.selectedCount.value" @clear="bulk.clear()">
        <button @click="bulkSetStatus('published')" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Publish</button>
        <button @click="bulkSetStatus('draft')" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Draft</button>
        <button @click="bulkSetStatus('archived')" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Archive</button>
        <button @click="bulkExport" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Export CSV</button>
        <button @click="bulkDeleteSelected" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors">Delete</button>
      </BulkActionBar>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="video in filteredVideos"
        :key="video.id"
        class="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
        @click="playVideo = video"
      >
        <div class="aspect-video bg-rose-600 relative flex items-center justify-center">
          <input
            type="checkbox"
            :checked="bulk.isSelected(video.id)"
            @click.stop
            @change="bulk.toggle(video.id)"
            class="absolute top-2 left-2 z-10 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          >
          <div class="w-14 h-14 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center">
            <svg class="w-7 h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"></path>
            </svg>
          </div>
          <span
            class="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium"
            :class="video.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              video.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'"
          >
            {{ video.status.charAt(0).toUpperCase() + video.status.slice(1) }}
          </span>
        </div>

        <div class="p-5">
          <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-1.5 line-clamp-1">{{ video.title }}</h3>
          <p v-if="video.description" class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ video.description }}</p>

          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
              {{ video.subject_name || 'Unknown Subject' }}
            </span>
            <span v-if="video.class_group_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              {{ video.class_group_name }} (All Streams)
            </span>
            <span v-else-if="video.class_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {{ video.class_name }}{{ video.class_stream_name ? ' - ' + video.class_stream_name : '' }}
            </span>
            <span class="ml-auto text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{{ formatFileSize(video.file_size) }}</span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500 dark:text-gray-500">Updated {{ formatDate(video.updated_at || video.created_at) }}</span>
            <div class="flex items-center space-x-2">
              <button
                @click.stop="editVideo(video)"
                class="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Edit"
              >
                <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              <button
                @click.stop="deleteVideo(video.id)"
                class="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
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
      </div>
    </template>

    <!-- Upload/Edit Modal -->
    <div v-if="showVideoModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ editingVideo ? 'Edit Video' : 'Upload Video' }}
          </h3>
          <button @click="closeVideoModal" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6">
          <form @submit.prevent="saveVideo">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
              <input
                v-model="videoForm.title"
                type="text"
                required
                placeholder="Enter video title..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                v-model="videoForm.description"
                rows="3"
                placeholder="Enter a short description..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                <select
                  v-model="videoForm.subject_id"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  :disabled="!assignments?.subjects || assignments.subjects.length === 0"
                >
                  <option value="">Select Subject</option>
                  <option v-for="subject in assignments?.subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
                </select>
                <p v-if="!assignments?.subjects || assignments.subjects.length === 0" class="text-xs text-red-600 dark:text-red-400 mt-1">
                  No subjects available. Please ensure you are assigned to a department with subjects.
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Class *</label>
                <TeacherClassSelector v-model="videoForm.classTarget" />
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select
                v-model="videoForm.status"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div v-if="!editingVideo" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Video File *</label>
              <input
                type="file"
                accept="video/mp4,video/webm,video/ogg,video/quicktime"
                required
                @change="handleFileSelect"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">MP4, WebM, OGG or MOV, up to 300MB.</p>
            </div>
            <p v-else class="text-xs text-gray-500 dark:text-gray-400 mb-4">
              The video file can't be replaced here - delete this video and upload a new one if you need to change it.
            </p>

            <div v-if="uploading" class="mb-4">
              <div class="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div class="h-full bg-indigo-600 transition-all" :style="{ width: uploadProgress + '%' }"></div>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Uploading... {{ uploadProgress }}%</p>
            </div>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="closeVideoModal"
                class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? 'Saving...' : (editingVideo ? 'Update Video' : 'Upload') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Player -->
    <VideoPlayerModal v-if="playVideo" :video="playVideo" @close="playVideo = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import VideoPlayerModal from '@/components/video/VideoPlayerModal.vue'
import TeacherClassSelector from '@/components/teacher/TeacherClassSelector.vue'
import BulkActionBar from '@/components/common/BulkActionBar.vue'
import type { VideoResource, VideoForm } from '@/types/video'
import type { ENoteAssignments } from '@/types/enotes'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { useBulkSelection } from '@/composables/useBulkSelection'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { downloadBlob } from '@/utils/downloadBlob'

const toast = useToastStore()
const confirmDialog = useConfirmStore()
const bulk = useBulkSelection<number>()

const API_BASE = '/api'

const videos = ref<VideoResource[]>([])
const assignments = ref<ENoteAssignments | null>(null)
const assignmentsError = ref<string | null>(null)
const loading = ref(false)
const saving = ref(false)
const uploading = ref(false)
const uploadProgress = ref(0)

const statusFilter = usePersistedRef('teacher-videos-status-filter', '')
const subjectFilter = usePersistedRef('teacher-videos-subject-filter', '')
const classFilter = usePersistedRef('teacher-videos-class-filter', '')

const showVideoModal = ref(false)
const editingVideo = ref<VideoResource | null>(null)
const playVideo = ref<VideoResource | null>(null)
const videoForm = ref<VideoForm>({
  title: '',
  description: '',
  subject_id: '',
  classTarget: { scope: 'stream', class_id: null, class_group_name: null },
  status: 'draft',
  file: null
})

const stats = computed(() => ({
  total: videos.value.length,
  draft: videos.value.filter(v => v.status === 'draft').length,
  published: videos.value.filter(v => v.status === 'published').length,
  archived: videos.value.filter(v => v.status === 'archived').length
}))

const filteredVideos = computed(() => {
  return videos.value.filter(video => {
    const matchesStatus = !statusFilter.value || video.status === statusFilter.value
    const matchesSubject = !subjectFilter.value || video.subject_id === parseInt(subjectFilter.value)
    const matchesClass = !classFilter.value || video.class_id === parseInt(classFilter.value)
    return matchesStatus && matchesSubject && matchesClass
  })
})

const visibleIds = computed(() => filteredVideos.value.map(v => v.id))

const bulkSetStatus = async (status: 'draft' | 'published' | 'archived') => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  try {
    await axios.post(`${API_BASE}/teacher/videos/bulk-status`, { ids, status })
    toast.success(`${ids.length} video(s) updated`)
    bulk.clear()
    await loadVideos()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to update videos')
  }
}

const bulkDeleteSelected = async () => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  if (!await confirmDialog.open({ title: 'Delete videos', message: `Are you sure you want to delete ${ids.length} video(s)? This cannot be undone.`, confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.post(`${API_BASE}/teacher/videos/bulk-delete`, { ids })
    toast.success(`${ids.length} video(s) deleted`)
    bulk.clear()
    await loadVideos()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to delete videos')
  }
}

const bulkExport = async () => {
  const ids = bulk.selectedArray()
  try {
    const response = await axios.post(`${API_BASE}/teacher/videos/bulk-export`, { ids }, { responseType: 'blob' })
    downloadBlob(response.data, 'videos.csv')
  } catch (error) {
    toast.error('Failed to export videos')
  }
}

const clearFilters = () => {
  statusFilter.value = ''
  subjectFilter.value = ''
  classFilter.value = ''
}

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatFileSize = (bytes: number | null) => {
  if (!bytes) return ''
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

const loadVideos = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${API_BASE}/teacher/videos`)
    if (response.data.success) {
      videos.value = response.data.data.videos || []
    }
  } catch (error) {
    console.error('Failed to load videos:', error)
  } finally {
    loading.value = false
  }
}

const loadAssignments = async () => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/enotes/assignments`)
    if (response.data.success) {
      assignments.value = response.data.data
      assignmentsError.value = null
    } else {
      assignmentsError.value = response.data.message || 'Failed to load assignments'
    }
  } catch (error: any) {
    assignmentsError.value = error.response?.data?.message || 'Failed to load assignments. Please ensure you are assigned to a department.'
  }
}

const openCreateModal = () => {
  editingVideo.value = null
  videoForm.value = { title: '', description: '', subject_id: '', classTarget: { scope: 'stream', class_id: null, class_group_name: null }, status: 'draft', file: null }
  showVideoModal.value = true
}

const editVideo = (video: VideoResource) => {
  editingVideo.value = video
  videoForm.value = {
    title: video.title,
    description: video.description || '',
    subject_id: video.subject_id?.toString() || '',
    classTarget: video.class_group_name
      ? { scope: 'all_streams', class_id: null, class_group_name: video.class_group_name }
      : { scope: 'stream', class_id: video.class_id, class_group_name: null },
    status: video.status,
    file: null
  }
  showVideoModal.value = true
}

const closeVideoModal = () => {
  showVideoModal.value = false
  editingVideo.value = null
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  videoForm.value.file = target.files?.[0] || null
}

const saveVideo = async () => {
  try {
    saving.value = true

    if (editingVideo.value) {
      await axios.put(`${API_BASE}/teacher/videos/${editingVideo.value.id}`, {
        title: videoForm.value.title,
        description: videoForm.value.description,
        subject_id: videoForm.value.subject_id,
        scope: videoForm.value.classTarget.scope,
        class_id: videoForm.value.classTarget.class_id,
        class_group_name: videoForm.value.classTarget.class_group_name,
        status: videoForm.value.status
      })
    } else {
      if (!videoForm.value.file) {
        toast.warning('Please select a video file')
        return
      }
      const formData = new FormData()
      formData.append('title', videoForm.value.title)
      formData.append('description', videoForm.value.description)
      formData.append('subject_id', videoForm.value.subject_id)
      formData.append('scope', videoForm.value.classTarget.scope)
      if (videoForm.value.classTarget.class_id !== null) formData.append('class_id', String(videoForm.value.classTarget.class_id))
      if (videoForm.value.classTarget.class_group_name !== null) formData.append('class_group_name', videoForm.value.classTarget.class_group_name)
      formData.append('status', videoForm.value.status)
      formData.append('file', videoForm.value.file)

      uploading.value = true
      uploadProgress.value = 0
      await axios.post(`${API_BASE}/teacher/videos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          if (event.total) uploadProgress.value = Math.round((event.loaded * 100) / event.total)
        }
      })
    }

    closeVideoModal()
    await loadVideos()
  } catch (error: any) {
    console.error('Failed to save video:', error)
    toast.error(error.response?.data?.message || 'Failed to save video')
  } finally {
    saving.value = false
    uploading.value = false
  }
}

const deleteVideo = async (id: number) => {
  if (!await confirmDialog.open({ title: 'Delete video', message: 'Are you sure you want to delete this video?', confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.delete(`${API_BASE}/teacher/videos/${id}`)
    await loadVideos()
    toast.success('Video deleted')
  } catch (error) {
    console.error('Failed to delete video:', error)
    toast.error('Failed to delete video. Please try again.')
  }
}

onMounted(async () => {
  await Promise.all([loadVideos(), loadAssignments()])
})
</script>
