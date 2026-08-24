<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Item Bank</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Every assessment PDF uploaded by teachers across the school, for review and moderation.</p>
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

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-100 dark:border-gray-700">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <input
              v-model="search"
              type="text"
              placeholder="Search by title, description, or teacher name..."
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              @input="debouncedSearch"
            >
          </div>
          <select
            v-model="statusFilter"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            @change="fetchResources"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <select
            v-model="departmentFilter"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            @change="fetchResources"
          >
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
          </select>
        </div>
      </div>

      <!-- Resources -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
        <p class="mt-4 text-gray-500 dark:text-gray-400">Loading item bank...</p>
      </div>

      <div v-else-if="resources.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        <svg class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <p class="text-gray-600 dark:text-gray-400">No resources match your filters</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="resource in resources"
          :key="resource.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-start justify-between mb-3 gap-2">
              <div class="flex items-center gap-2 min-w-0 cursor-pointer" @click="previewResource = resource">
                <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 class="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">{{ resource.title }}</h3>
              </div>
              <span
                class="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 capitalize"
                :class="resource.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  resource.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'"
              >
                {{ resource.status }}
              </span>
            </div>

            <p v-if="resource.description" class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ resource.description }}</p>

            <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">
              By {{ resource.teacher_first_name ? `${resource.teacher_first_name} ${resource.teacher_last_name}` : 'Unknown teacher' }}
            </p>

            <div class="flex flex-wrap items-center gap-2 mb-4">
              <span v-if="resource.subject_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                {{ resource.subject_name }}
              </span>
              <span v-if="resource.department_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {{ resource.department_name }}
              </span>
              <span v-if="resource.class_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                {{ resource.class_name }}{{ resource.class_stream_name ? ' - ' + resource.class_stream_name : '' }}
              </span>
              <span class="ml-auto text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{{ formatFileSize(resource.file_size) }}</span>
            </div>

            <div class="flex items-center justify-between gap-2">
              <select
                :value="resource.status"
                @change="changeStatus(resource, ($event.target as HTMLSelectElement).value)"
                class="text-xs px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
              <button
                @click="deleteResource(resource)"
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

    <!-- PDF Preview -->
    <ItemBankPdfViewer v-if="previewResource" :resource="previewResource" @close="previewResource = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiService } from '../../services/api'
import ItemBankPdfViewer from '../../components/itembank/ItemBankPdfViewer.vue'
import type { ItemBankResource } from '../../types/itembank'

interface Department {
  id: number
  name: string
}

const resources = ref<ItemBankResource[]>([])
const departments = ref<Department[]>([])
const stats = ref({ total: 0, draft: 0, published: 0, archived: 0 })
const loading = ref(false)
const search = ref('')
const statusFilter = ref('')
const departmentFilter = ref('')
const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const previewResource = ref<ItemBankResource | null>(null)

const formatFileSize = (bytes: number | null) => {
  if (!bytes) return ''
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

const fetchDepartments = async () => {
  try {
    const response = await apiService.get('/admin/departments')
    if (response.data.success) {
      departments.value = response.data.data || []
    }
  } catch (error) {
    console.error('Failed to fetch departments:', error)
  }
}

const fetchResources = async () => {
  loading.value = true
  try {
    const params: any = {}
    if (search.value) params.search = search.value
    if (statusFilter.value) params.status = statusFilter.value
    if (departmentFilter.value) params.department_id = departmentFilter.value

    const response = await apiService.get('/admin/itembank', params)

    if (response.data.success) {
      resources.value = response.data.data.resources || []
      stats.value = response.data.data.stats
    }
  } catch (error) {
    console.error('Failed to fetch item bank resources:', error)
  } finally {
    loading.value = false
  }
}

const debouncedSearch = () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value)
  searchTimeout.value = setTimeout(() => {
    fetchResources()
  }, 500)
}

const changeStatus = async (resource: ItemBankResource, status: string) => {
  try {
    await apiService.put(`/admin/itembank/${resource.id}`, { status })
    await fetchResources()
  } catch (error: any) {
    console.error('Failed to update resource status:', error)
    alert(error.response?.data?.message || 'Failed to update resource status')
  }
}

const deleteResource = async (resource: ItemBankResource) => {
  if (!confirm(`Are you sure you want to delete "${resource.title}"? This action cannot be undone.`)) return

  try {
    await apiService.delete(`/admin/itembank/${resource.id}`)
    await fetchResources()
  } catch (error: any) {
    console.error('Failed to delete resource:', error)
    alert(error.response?.data?.message || 'Failed to delete resource')
  }
}

onMounted(() => {
  fetchDepartments()
  fetchResources()
})
</script>
