<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Subjects Management</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Create and manage academic subjects</p>
        </div>
        <button
          @click="showCreateModal = true"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Subject
        </button>
      </div>

      <!-- Toast Notification -->
      <transition name="toast">
        <div
          v-if="successMessage"
          class="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-green-200 dark:border-green-800 p-4 flex items-center gap-4 min-w-[280px] max-w-[calc(100vw-3rem)]"
        >
          <div class="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold text-gray-900 dark:text-white">Success!</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ successMessage }}</p>
          </div>
          <button
            @click="successMessage = ''"
            class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </transition>

      <!-- Subjects Table -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        <!-- Loading State -->
        <div v-if="loading" class="p-12 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
          <p class="mt-4 text-gray-500 dark:text-gray-400">Loading subjects...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="subjects.length === 0" class="p-12 text-center">
          <svg class="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">No subjects found</h3>
          <p class="mt-2 text-gray-500 dark:text-gray-400">Get started by creating your first subject.</p>
          <button
            @click="showCreateModal = true"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Subject
          </button>
        </div>

        <!-- Subjects Table -->
        <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
          <thead class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Department</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Created</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
            <tr
              v-for="subject in subjects"
              :key="subject.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors duration-150"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-gray-900 dark:text-white">{{ subject.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                {{ getDepartmentName(subject.department_id) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                {{ formatDate(subject.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="editSubject(subject)"
                    class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-150"
                    title="Edit"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button
                    @click="deleteSubject(subject)"
                    class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-150"
                    title="Delete"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>

    <!-- Create Subject Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Subject</h2>
          <form @submit.prevent="createSubject">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                <select
                  v-model="formData.department_id"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">No Department</option>
                  <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                    {{ dept.name }} ({{ dept.code }})
                  </option>
                </select>
              </div>
            </div>
            <div class="flex gap-3 mt-6">
              <button
                type="button"
                @click="showCreateModal = false"
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {{ loading ? 'Creating...' : 'Create Subject' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Subject Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Subject</h2>
          <form @submit.prevent="updateSubject">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  v-model="editFormData.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                <select
                  v-model="editFormData.department_id"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">No Department</option>
                  <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                    {{ dept.name }} ({{ dept.code }})
                  </option>
                </select>
              </div>
            </div>
            <div class="flex gap-3 mt-6">
              <button
                type="button"
                @click="showEditModal = false"
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {{ loading ? 'Updating...' : 'Update Subject' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiService } from '../../services/api'
import type { Subject, Department } from '../../types'

const subjects = ref<Subject[]>([])
const departments = ref<Department[]>([])
const loading = ref(false)
const successMessage = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)

const formData = ref({
  name: '',
  department_id: ''
})

const editFormData = ref({
  id: 0,
  name: '',
  department_id: ''
})

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

const fetchSubjects = async () => {
  loading.value = true
  try {
    const response = await apiService.get('/admin/subjects')

    if (response.data.success) {
      subjects.value = response.data.data || []
    } else {
      console.error('API returned error:', response.data)
    }
  } catch (error) {
    console.error('Failed to fetch subjects:', error)
  } finally {
    loading.value = false
  }
}

const getDepartmentName = (departmentId: number | undefined) => {
  if (!departmentId) return 'No Department'
  const dept = departments.value.find(d => d.id === departmentId)
  return dept ? `${dept.name} (${dept.code})` : 'Unknown'
}

const createSubject = async () => {
  loading.value = true
  try {
    const response = await apiService.post('/admin/subjects', formData.value)

    if (response.data.success) {
      const createdName = formData.value.name
      showCreateModal.value = false
      formData.value = { name: '', department_id: '' }
      successMessage.value = `Subject "${createdName}" created successfully!`
      await fetchSubjects()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      alert(response.data.message || 'Failed to create subject')
    }
  } catch (error: any) {
    console.error('Failed to create subject:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to create subject'
    alert(errorMessage)
  } finally {
    loading.value = false
  }
}

const editSubject = (subject: Subject) => {
  editFormData.value = {
    id: subject.id,
    name: subject.name,
    department_id: subject.department_id?.toString() || ''
  }
  showEditModal.value = true
}

const updateSubject = async () => {
  loading.value = true
  try {
    const response = await apiService.put(`/admin/subjects/${editFormData.value.id}`, {
      name: editFormData.value.name,
      department_id: editFormData.value.department_id ? parseInt(editFormData.value.department_id) : null
    })

    if (response.data.success) {
      showEditModal.value = false
      successMessage.value = `Subject "${editFormData.value.name}" updated successfully!`
      await fetchSubjects()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      alert(response.data.message || 'Failed to update subject')
    }
  } catch (error: any) {
    console.error('Failed to update subject:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to update subject'
    alert(errorMessage)
  } finally {
    loading.value = false
  }
}

const deleteSubject = async (subject: Subject) => {
  if (!confirm(`Are you sure you want to delete subject "${subject.name}"? This action cannot be undone.`)) return

  loading.value = true
  try {
    const response = await apiService.delete(`/admin/subjects/${subject.id}`)

    if (response.data.success) {
      successMessage.value = `Subject "${subject.name}" deleted successfully!`
      await fetchSubjects()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      alert(response.data.message || 'Failed to delete subject')
    }
  } catch (error: any) {
    console.error('Failed to delete subject:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to delete subject'
    alert(errorMessage)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

onMounted(() => {
  fetchDepartments()
  fetchSubjects()
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}
</style>
