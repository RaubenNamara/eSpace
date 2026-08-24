<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Videos</h1>
      <p class="text-gray-600 dark:text-gray-400">Upload video resources for your classes.</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-600 dark:text-gray-400">Total Videos</p>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-600 dark:text-gray-400">Draft</p>
        <p class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{{ stats.draft }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-600 dark:text-gray-400">Published</p>
        <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ stats.published }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-600 dark:text-gray-400">Archived</p>
        <p class="text-3xl font-bold text-gray-600 dark:text-gray-400">{{ stats.archived }}</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
      <div class="flex items-center flex-wrap gap-3">
        <select v-model="statusFilter" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        <select
          v-model="subjectFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          :disabled="!assignments?.subjects || assignments.subjects.length === 0"
        >
          <option value="">All Subjects</option>
          <option v-for="subject in assignments?.subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
        </select>

        <select
          v-model="classFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          :disabled="!assignments?.classes || assignments.classes.length === 0"
        >
          <option value="">All Classes</option>
          <option v-for="cls in assignments?.classes" :key="cls.id" :value="cls.id">
            {{ cls.name }} ({{ cls.level }}{{ cls.stream_name ? ' - ' + cls.stream_name : '' }})
          </option>
        </select>

        <select
          v-model="streamFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          :disabled="streamOptions.length === 0"
        >
          <option value="">All Streams</option>
          <option v-for="stream in streamOptions" :key="stream" :value="stream">{{ stream }}</option>
        </select>

        <div v-if="assignmentsError" class="text-red-600 dark:text-red-400 text-sm">{{ assignmentsError }}</div>
      </div>

      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Upload Video</span>
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
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="video in filteredVideos"
        :key="video.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
        @click="playVideo = video"
      >
        <div class="aspect-video bg-gradient-to-br from-rose-500 to-orange-500 relative flex items-center justify-center">
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
            <span v-if="video.class_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {{ video.class_name }}{{ video.class_stream_name ? ' - ' + video.class_stream_name : '' }}
            </span>
            <span class="ml-auto text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{{ formatFileSize(video.file_size) }}</span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500 dark:text-gray-500">Updated {{ formatDate(video.updated_at || video.created_at) }}</span>
            <div class="flex items-center space-x-2">
              <button
                @click.stop="editVideo(video)"
                class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Edit"
              >
                <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              <button
                @click.stop="deleteVideo(video.id)"
                class="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
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
                <select
                  v-model="videoForm.class_id"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  :disabled="!assignments?.classes || assignments.classes.length === 0"
                >
                  <option value="">Select Class</option>
                  <option v-for="cls in assignments?.classes" :key="cls.id" :value="cls.id">
                    {{ cls.name }} ({{ cls.level }}{{ cls.stream_name ? ' - ' + cls.stream_name : '' }})
                  </option>
                </select>
                <p v-if="!assignments?.classes || assignments.classes.length === 0" class="text-xs text-red-600 dark:text-red-400 mt-1">
                  No classes available. Please ensure you are assigned to a department with classes.
                </p>
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
import type { VideoResource, VideoForm } from '@/types/video'
import type { ENoteAssignments } from '@/types/enotes'

const API_BASE = '/api'

const videos = ref<VideoResource[]>([])
const assignments = ref<ENoteAssignments | null>(null)
const assignmentsError = ref<string | null>(null)
const loading = ref(false)
const saving = ref(false)
const uploading = ref(false)
const uploadProgress = ref(0)

const statusFilter = ref('')
const subjectFilter = ref('')
const classFilter = ref('')
const streamFilter = ref('')

const showVideoModal = ref(false)
const editingVideo = ref<VideoResource | null>(null)
const playVideo = ref<VideoResource | null>(null)
const videoForm = ref<VideoForm>({
  title: '',
  description: '',
  subject_id: '',
  class_id: '',
  status: 'draft',
  file: null
})

const stats = computed(() => ({
  total: videos.value.length,
  draft: videos.value.filter(v => v.status === 'draft').length,
  published: videos.value.filter(v => v.status === 'published').length,
  archived: videos.value.filter(v => v.status === 'archived').length
}))

const streamOptions = computed(() => {
  const streams = new Set<string>()
  assignments.value?.classes.forEach(cls => {
    if (cls.stream_name) streams.add(cls.stream_name)
  })
  return Array.from(streams).sort()
})

const filteredVideos = computed(() => {
  return videos.value.filter(video => {
    const matchesStatus = !statusFilter.value || video.status === statusFilter.value
    const matchesSubject = !subjectFilter.value || video.subject_id === parseInt(subjectFilter.value)
    const matchesClass = !classFilter.value || video.class_id === parseInt(classFilter.value)
    const matchesStream = !streamFilter.value || video.class_stream_name === streamFilter.value
    return matchesStatus && matchesSubject && matchesClass && matchesStream
  })
})

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
  videoForm.value = { title: '', description: '', subject_id: '', class_id: '', status: 'draft', file: null }
  showVideoModal.value = true
}

const editVideo = (video: VideoResource) => {
  editingVideo.value = video
  videoForm.value = {
    title: video.title,
    description: video.description || '',
    subject_id: video.subject_id?.toString() || '',
    class_id: video.class_id?.toString() || '',
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
        class_id: videoForm.value.class_id,
        status: videoForm.value.status
      })
    } else {
      if (!videoForm.value.file) {
        alert('Please select a video file')
        return
      }
      const formData = new FormData()
      formData.append('title', videoForm.value.title)
      formData.append('description', videoForm.value.description)
      formData.append('subject_id', videoForm.value.subject_id)
      formData.append('class_id', videoForm.value.class_id)
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
    alert(error.response?.data?.message || 'Failed to save video')
  } finally {
    saving.value = false
    uploading.value = false
  }
}

const deleteVideo = async (id: number) => {
  if (!confirm('Are you sure you want to delete this video?')) return
  try {
    await axios.delete(`${API_BASE}/teacher/videos/${id}`)
    await loadVideos()
  } catch (error) {
    console.error('Failed to delete video:', error)
  }
}

onMounted(async () => {
  await Promise.all([loadVideos(), loadAssignments()])
})
</script>
