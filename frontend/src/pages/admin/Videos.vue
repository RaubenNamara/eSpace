<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
    <div v-else>
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ videos.length }} video{{ videos.length === 1 ? '' : 's' }} across {{ groupedVideos.length }} class{{ groupedVideos.length === 1 ? '' : 'es' }}
        </p>
        <button @click="toggleAllClasses" class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
          {{ allClassesCollapsed ? 'Expand all' : 'Collapse all' }}
        </button>
      </div>

      <!-- Grouped by class, with each class's streams shown as clickable cards -->
      <div class="space-y-4">
        <div
          v-for="group in groupedVideos"
          :key="group.key"
          class="card overflow-hidden"
        >
          <button
            @click="toggleClassGroup(group.key)"
            class="w-full flex items-center justify-between gap-3 px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div class="flex items-center gap-3 min-w-0">
              <svg
                class="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform"
                :class="{ '-rotate-90': collapsedClasses.has(group.key) }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
              <h2 class="text-base font-bold text-gray-900 dark:text-white truncate">{{ group.label }}</h2>
            </div>
            <span class="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {{ group.total }} video{{ group.total === 1 ? '' : 's' }}
            </span>
          </button>

          <div v-if="!collapsedClasses.has(group.key)" class="border-t border-gray-100 dark:border-gray-700 px-6 py-5">
            <!-- Stream cards - click a stream to see its videos below -->
            <div class="flex flex-wrap gap-3">
              <button
                v-for="stream in group.streams"
                :key="stream.key"
                @click="toggleStream(group.key, stream.key)"
                class="group relative flex flex-col items-center justify-center gap-1 w-24 h-20 rounded-xl border-2 transition-all"
                :class="selectedStreams[group.key] === stream.key
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-md'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950/40 hover:border-indigo-300 hover:shadow-sm'"
              >
                <span
                  class="text-lg font-bold"
                  :class="selectedStreams[group.key] === stream.key ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-800 dark:text-gray-200'"
                >
                  {{ stream.label }}
                </span>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ stream.videos.length }} video{{ stream.videos.length === 1 ? '' : 's' }}</span>
              </button>
            </div>

            <!-- Subjects and videos for the selected stream -->
            <div v-if="selectedStreams[group.key]" class="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
              <div
                v-for="subject in subjectsForStream(group.streams.find(s => s.key === selectedStreams[group.key])?.videos || [])"
                :key="subject.key"
                class="py-5 first:pt-0"
              >
                <h3 class="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
                  {{ subject.label }}
                  <span class="ml-1 font-normal text-gray-400 dark:text-gray-500">({{ subject.videos.length }})</span>
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div
                    v-for="video in subject.videos"
                    :key="video.id"
                    class="bg-gray-50 dark:bg-gray-950/40 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
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
                      <h4 class="font-semibold text-gray-900 dark:text-white truncate">{{ video.title }}</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{{ video.description || 'No description' }}</p>
                      <div v-if="video.department_name" class="mt-2">
                        <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          {{ video.department_name }}
                        </span>
                      </div>
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
              </div>
            </div>
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
import { ref, computed, onMounted } from 'vue'
import apiService from '@/services/api'
import { resolveAssetUrl } from '@/utils/url'

interface Video {
  id: number
  title: string
  description: string | null
  url: string | null
  created_at: string
  subject_name: string | null
  class_name: string | null
  class_stream_name: string | null
  department_name: string | null
}

const videos = ref<Video[]>([])
const loading = ref(false)
const showUploadModal = ref(false)
const uploading = ref(false)

// Videos arranged by class, with each class's streams shown as clickable cards - clicking a
// stream reveals its videos grouped by subject.
interface SubjectGroup {
  key: string
  label: string
  videos: Video[]
}

interface StreamGroup {
  key: string
  label: string
  videos: Video[]
}

interface ClassGroup {
  key: string
  label: string
  streams: StreamGroup[]
  total: number
}

const groupedVideos = computed<ClassGroup[]>(() => {
  const classMap = new Map<string, { label: string; streamMap: Map<string, StreamGroup> }>()

  for (const video of videos.value) {
    const classKey = video.class_name || '__unassigned'
    const classLabel = video.class_name || 'Unassigned class'

    if (!classMap.has(classKey)) {
      classMap.set(classKey, { label: classLabel, streamMap: new Map() })
    }
    const classEntry = classMap.get(classKey)!

    const streamKey = video.class_stream_name || '__none'
    if (!classEntry.streamMap.has(streamKey)) {
      classEntry.streamMap.set(streamKey, { key: streamKey, label: video.class_stream_name || 'No stream', videos: [] })
    }
    classEntry.streamMap.get(streamKey)!.videos.push(video)
  }

  const groups: ClassGroup[] = Array.from(classMap.entries()).map(([key, value]) => {
    const streams = Array.from(value.streamMap.values()).sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }))
    return {
      key,
      label: value.label,
      streams,
      total: streams.reduce((sum, s) => sum + s.videos.length, 0)
    }
  })

  groups.sort((a, b) => {
    if (a.key === '__unassigned') return 1
    if (b.key === '__unassigned') return -1
    return a.label.localeCompare(b.label, undefined, { numeric: true })
  })

  return groups
})

const collapsedClasses = ref<Set<string>>(new Set())

const toggleClassGroup = (key: string) => {
  const next = new Set(collapsedClasses.value)
  if (next.has(key)) {
    next.delete(key)
  } else {
    next.add(key)
  }
  collapsedClasses.value = next
}

const allClassesCollapsed = computed(() =>
  groupedVideos.value.length > 0 && groupedVideos.value.every(g => collapsedClasses.value.has(g.key))
)

const toggleAllClasses = () => {
  collapsedClasses.value = allClassesCollapsed.value
    ? new Set()
    : new Set(groupedVideos.value.map(g => g.key))
}

// Which stream is currently expanded within each class (keyed by class key).
const selectedStreams = ref<Record<string, string>>({})

const toggleStream = (classKey: string, streamKey: string) => {
  selectedStreams.value = {
    ...selectedStreams.value,
    [classKey]: selectedStreams.value[classKey] === streamKey ? '' : streamKey
  }
}

const subjectsForStream = (streamVideos: Video[]): SubjectGroup[] => {
  const bySubject = new Map<string, SubjectGroup>()
  for (const video of streamVideos) {
    const key = video.subject_name || '__unassigned'
    if (!bySubject.has(key)) {
      bySubject.set(key, { key, label: video.subject_name || 'Unassigned subject', videos: [] })
    }
    bySubject.get(key)!.videos.push(video)
  }
  return Array.from(bySubject.values()).sort((a, b) => a.label.localeCompare(b.label))
}

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
