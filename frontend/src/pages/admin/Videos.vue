<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Videos</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Manage and view video content</p>
      </div>
      <button 
        @click="showUploadModal = true"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Upload Video</span>
      </button>
    </div>

    <!-- Video Grid -->
    <div v-if="loading" class="flex items-center justify-center h-64">
      <div class="text-gray-500 dark:text-gray-400">Loading videos...</div>
    </div>
    <div v-else-if="videos.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
      <p class="text-gray-500 dark:text-gray-400">No videos uploaded yet</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="video in videos" 
        :key="video.id"
        class="card overflow-hidden"
      >
        <div class="aspect-video bg-gray-900 relative">
          <video 
            v-if="video.url"
            :src="resolveAssetUrl(video.url)"
            class="w-full h-full object-cover"
            controls
          ></video>
          <div v-else class="w-full h-full flex items-center justify-center text-gray-500">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-gray-900 dark:text-white truncate">{{ video.title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{{ video.description || 'No description' }}</p>
          <div class="flex items-center justify-between mt-3">
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(video.created_at) }}</span>
            <button
              @click="deleteVideo(video.id)"
              class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg">
        <div class="p-6 border-b dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Upload Video</h2>
            <button @click="showUploadModal = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <form @submit.prevent="uploadVideo" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input
              v-model="uploadForm.title"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter video title"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              v-model="uploadForm.description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter video description"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Video File</label>
            <input
              type="file"
              accept="video/*"
              @change="handleFileSelect"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="showUploadModal = false"
              class="px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="uploading"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {{ uploading ? 'Uploading...' : 'Upload' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiService from '@/services/api'
import { resolveAssetUrl } from '@/utils/url'

const videos = ref<any[]>([])
const loading = ref(false)
const showUploadModal = ref(false)
const uploading = ref(false)

const uploadForm = ref({
  title: '',
  description: '',
  file: null as File | null
})

const fetchVideos = async () => {
  loading.value = true
  try {
    const response = await apiService.get('/admin/videos')
    if (response.data?.success && response.data?.data) {
      videos.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to fetch videos:', error)
  } finally {
    loading.value = false
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    uploadForm.value.file = target.files[0]
  }
}

const uploadVideo = async () => {
  if (!uploadForm.value.file) {
    alert('Please select a video file')
    return
  }

  uploading.value = true
  try {
    const formData = new FormData()
    formData.append('title', uploadForm.value.title)
    formData.append('description', uploadForm.value.description)
    formData.append('video', uploadForm.value.file)

    const response = await apiService.post('/admin/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.data.success) {
      showUploadModal.value = false
      uploadForm.value = { title: '', description: '', file: null }
      await fetchVideos()
      alert('Video uploaded successfully')
    } else {
      alert('Failed to upload video: ' + (response.data.message || 'Unknown error'))
    }
  } catch (error: any) {
    console.error('Failed to upload video:', error)
    alert('Failed to upload video: ' + (error.response?.data?.message || error.message || 'Unknown error'))
  } finally {
    uploading.value = false
  }
}

const deleteVideo = async (id: number) => {
  if (!confirm('Are you sure you want to delete this video?')) {
    return
  }

  try {
    const response = await apiService.delete(`/admin/videos/${id}`)
    if (response.data.success) {
      await fetchVideos()
      alert('Video deleted successfully')
    } else {
      alert('Failed to delete video: ' + (response.data.message || 'Unknown error'))
    }
  } catch (error: any) {
    console.error('Failed to delete video:', error)
    alert('Failed to delete video: ' + (error.response?.data?.message || error.message || 'Unknown error'))
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

onMounted(() => {
  fetchVideos()
})
</script>
