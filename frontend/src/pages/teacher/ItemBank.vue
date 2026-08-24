<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Item Bank</h1>
      <p class="text-gray-600 dark:text-gray-400">Upload PDF resources for your classes - students preview them in the browser, no downloads.</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-600 dark:text-gray-400">Total Resources</p>
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
        <span>Upload Item Bank</span>
      </button>
    </div>

    <!-- Resources -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading item bank...</p>
    </div>

    <div v-else-if="filteredResources.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p class="text-gray-600 dark:text-gray-400 mb-4">{{ resources.length === 0 ? 'No PDFs uploaded yet' : 'No resources match your filters' }}</p>
      <button v-if="resources.length === 0" @click="openCreateModal" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
        Upload Your First Item
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="resource in filteredResources"
        :key="resource.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
        @click="previewResource = resource"
      >
        <div class="p-6">
          <div class="flex items-start justify-between mb-3 gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 class="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">{{ resource.title }}</h3>
            </div>
            <span
              class="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0"
              :class="resource.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                resource.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'"
            >
              {{ resource.status.charAt(0).toUpperCase() + resource.status.slice(1) }}
            </span>
          </div>

          <p v-if="resource.description" class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{{ resource.description }}</p>

          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
              {{ resource.subject_name || 'Unknown Subject' }}
            </span>
            <span v-if="resource.class_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {{ resource.class_name }}{{ resource.class_stream_name ? ' - ' + resource.class_stream_name : '' }}
            </span>
            <span class="ml-auto text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{{ formatFileSize(resource.file_size) }}</span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500 dark:text-gray-500">Updated {{ formatDate(resource.updated_at || resource.created_at) }}</span>
            <div class="flex items-center space-x-2">
              <button
                @click.stop="editResource(resource)"
                class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Edit"
              >
                <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              <button
                @click.stop="deleteResource(resource.id)"
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
    <div v-if="showResourceModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ editingResource ? 'Edit Resource' : 'Upload Item Bank' }}
          </h3>
          <button @click="closeResourceModal" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6">
          <form @submit.prevent="saveResource">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
              <input
                v-model="resourceForm.title"
                type="text"
                required
                placeholder="Enter resource title..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                v-model="resourceForm.description"
                rows="3"
                placeholder="Enter a short description..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                <select
                  v-model="resourceForm.subject_id"
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
                  v-model="resourceForm.class_id"
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
                v-model="resourceForm.status"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div v-if="!editingResource" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">PDF File *</label>
              <input
                type="file"
                accept="application/pdf"
                required
                @change="handleFileSelect"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">PDF only, up to 50MB. Students preview it in-browser - there's no download option.</p>
            </div>
            <p v-else class="text-xs text-gray-500 dark:text-gray-400 mb-4">
              The PDF file can't be replaced here - delete this resource and upload a new one if you need to change the document.
            </p>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="closeResourceModal"
                class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? 'Saving...' : (editingResource ? 'Update Resource' : 'Upload') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- PDF Preview -->
    <ItemBankPdfViewer v-if="previewResource" :resource="previewResource" @close="previewResource = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import ItemBankPdfViewer from '@/components/itembank/ItemBankPdfViewer.vue'
import type { ItemBankResource, ItemBankResourceForm } from '@/types/itembank'
import type { ENoteAssignments } from '@/types/enotes'

const API_BASE = '/api'

const resources = ref<ItemBankResource[]>([])
const assignments = ref<ENoteAssignments | null>(null)
const assignmentsError = ref<string | null>(null)
const loading = ref(false)
const saving = ref(false)

const statusFilter = ref('')
const subjectFilter = ref('')
const classFilter = ref('')
const streamFilter = ref('')

const showResourceModal = ref(false)
const editingResource = ref<ItemBankResource | null>(null)
const previewResource = ref<ItemBankResource | null>(null)
const resourceForm = ref<ItemBankResourceForm>({
  title: '',
  description: '',
  subject_id: '',
  class_id: '',
  status: 'draft',
  file: null
})

const stats = computed(() => ({
  total: resources.value.length,
  draft: resources.value.filter(r => r.status === 'draft').length,
  published: resources.value.filter(r => r.status === 'published').length,
  archived: resources.value.filter(r => r.status === 'archived').length
}))

const streamOptions = computed(() => {
  const streams = new Set<string>()
  assignments.value?.classes.forEach(cls => {
    if (cls.stream_name) streams.add(cls.stream_name)
  })
  return Array.from(streams).sort()
})

const filteredResources = computed(() => {
  return resources.value.filter(resource => {
    const matchesStatus = !statusFilter.value || resource.status === statusFilter.value
    const matchesSubject = !subjectFilter.value || resource.subject_id === parseInt(subjectFilter.value)
    const matchesClass = !classFilter.value || resource.class_id === parseInt(classFilter.value)
    const matchesStream = !streamFilter.value || resource.class_stream_name === streamFilter.value
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

const loadResources = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${API_BASE}/teacher/itembank`)
    if (response.data.success) {
      resources.value = response.data.data.resources || []
    }
  } catch (error) {
    console.error('Failed to load item bank:', error)
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
  editingResource.value = null
  resourceForm.value = { title: '', description: '', subject_id: '', class_id: '', status: 'draft', file: null }
  showResourceModal.value = true
}

const editResource = (resource: ItemBankResource) => {
  editingResource.value = resource
  resourceForm.value = {
    title: resource.title,
    description: resource.description || '',
    subject_id: resource.subject_id?.toString() || '',
    class_id: resource.class_id?.toString() || '',
    status: resource.status,
    file: null
  }
  showResourceModal.value = true
}

const closeResourceModal = () => {
  showResourceModal.value = false
  editingResource.value = null
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  resourceForm.value.file = target.files?.[0] || null
}

const saveResource = async () => {
  try {
    saving.value = true

    if (editingResource.value) {
      await axios.put(`${API_BASE}/teacher/itembank/${editingResource.value.id}`, {
        title: resourceForm.value.title,
        description: resourceForm.value.description,
        subject_id: resourceForm.value.subject_id,
        class_id: resourceForm.value.class_id,
        status: resourceForm.value.status
      })
    } else {
      if (!resourceForm.value.file) {
        alert('Please select a PDF file')
        return
      }
      const formData = new FormData()
      formData.append('title', resourceForm.value.title)
      formData.append('description', resourceForm.value.description)
      formData.append('subject_id', resourceForm.value.subject_id)
      formData.append('class_id', resourceForm.value.class_id)
      formData.append('status', resourceForm.value.status)
      formData.append('file', resourceForm.value.file)

      await axios.post(`${API_BASE}/teacher/itembank`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }

    closeResourceModal()
    await loadResources()
  } catch (error: any) {
    console.error('Failed to save resource:', error)
    alert(error.response?.data?.message || 'Failed to save resource')
  } finally {
    saving.value = false
  }
}

const deleteResource = async (id: number) => {
  if (!confirm('Are you sure you want to delete this resource?')) return
  try {
    await axios.delete(`${API_BASE}/teacher/itembank/${id}`)
    await loadResources()
  } catch (error) {
    console.error('Failed to delete resource:', error)
  }
}

onMounted(async () => {
  await Promise.all([loadResources(), loadAssignments()])
})
</script>
