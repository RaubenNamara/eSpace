<template>
  <div class="w-full">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Classes</h1>

    <div class="flex justify-between items-center mb-6">
      <button
        @click="openClassModal()"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add Class
      </button>
    </div>

      <!-- Classes Table -->
      <div class="w-full bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
        <table class="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stream</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Level</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="classItem in classes" :key="classItem.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {{ classItem.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ classItem.stream_name || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <span :class="[
                  'px-2 py-1 text-xs rounded-full',
                  classItem.level === 'A Level' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                ]">
                  {{ classItem.level }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="openClassModal(classItem)"
                  class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                >
                  Edit
                </button>
                <button
                  @click="confirmDeleteClass(classItem)"
                  class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="classes.length === 0">
              <td colspan="4" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                No classes found
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>

    <!-- Class Modal -->
    <div v-if="showClassModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ editingClass ? 'Edit Class' : 'Add Class' }}
        </h3>
        <form @submit.prevent="saveClass">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Class Name</label>
            <input
              v-model="classForm.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level</label>
            <select
              v-model="classForm.level"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Level</option>
              <option value="A Level">A Level</option>
              <option value="O Level">O Level</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Academic Year</label>
            <select
              v-model="classForm.academic_year_id"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Academic Year</option>
              <option v-for="academicYear in academicYears" :key="academicYear.id" :value="academicYear.id">
                {{ academicYear.name }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stream Name</label>
            <input
              v-model="classForm.stream_name"
              type="text"
              required
              placeholder="e.g., Science, Arts, Commerce"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeClassModal"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {{ loading ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>


    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Confirm Delete</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to delete this {{ deleteTargetType }}? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="closeDeleteModal"
            class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            @click="executeDelete"
            :disabled="loading"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {{ loading ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiService from '@/services/api'
import type { Class, AcademicYear } from '@/types'

const classes = ref<Class[]>([])
const academicYears = ref<AcademicYear[]>([])
const loading = ref(false)

// Class Modal
const showClassModal = ref(false)
const editingClass = ref<Class | null>(null)
const classForm = ref({
  name: '',
  level: '',
  academic_year_id: '',
  stream_name: ''
})

// Delete Modal
const showDeleteModal = ref(false)
const deleteTargetType = ref('')
const deleteTargetId = ref<number | null>(null)

const fetchAcademicYears = async () => {
  loading.value = true
  try {
    const response = await apiService.get('/admin/academic-years')
    if (response.data.success) {
      academicYears.value = response.data.data
    }
  } catch (error: any) {
    console.error('Failed to fetch academic years:', error)
    alert('Failed to fetch academic years')
  } finally {
    loading.value = false
  }
}

const fetchClasses = async () => {
  loading.value = true
  try {
    const response = await apiService.get('/admin/classes')
    if (response.data.success) {
      classes.value = response.data.data
    }
  } catch (error: any) {
    console.error('Failed to fetch classes:', error)
    alert('Failed to fetch classes')
  } finally {
    loading.value = false
  }
}


const openClassModal = (classItem?: Class) => {
  editingClass.value = classItem || null
  if (classItem) {
    classForm.value = {
      name: classItem.name,
      level: classItem.level,
      academic_year_id: classItem.academic_year_id.toString(),
      stream_name: classItem.stream_name || ''
    }
  } else {
    classForm.value = {
      name: '',
      level: '',
      academic_year_id: '',
      stream_name: ''
    }
  }
  showClassModal.value = true
}

const closeClassModal = () => {
  showClassModal.value = false
  editingClass.value = null
  classForm.value = {
    name: '',
    level: '',
    academic_year_id: '',
    stream_name: ''
  }
}

const saveClass = async () => {
  loading.value = true
  try {
    const data = {
      name: classForm.value.name,
      level: classForm.value.level,
      academic_year_id: parseInt(classForm.value.academic_year_id.toString()),
      stream_name: classForm.value.stream_name
    }

    console.log('Saving class with data:', data)

    let response
    if (editingClass.value) {
      response = await apiService.put(`/admin/classes/${editingClass.value.id}`, data)
    } else {
      response = await apiService.post('/admin/classes', data)
    }

    console.log('Save class response:', response.data)

    if (response.data.success) {
      closeClassModal()
      await fetchClasses()
    } else {
      console.error('Backend error:', response.data)
      alert(response.data.message || 'Failed to save class')
    }
  } catch (error: any) {
    console.error('Failed to save class:', error)
    if (error.response?.data) {
      console.error('Error response:', error.response.data)
      alert(error.response.data.message || error.response.data.error || 'Failed to save class')
    } else {
      alert('Failed to save class')
    }
  } finally {
    loading.value = false
  }
}

const confirmDeleteClass = (classItem: Class) => {
  deleteTargetType.value = 'class'
  deleteTargetId.value = classItem.id
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deleteTargetType.value = ''
  deleteTargetId.value = null
}

const executeDelete = async () => {
  loading.value = true
  try {
    const response = await apiService.delete(`/admin/classes/${deleteTargetId.value}`)

    if (response.data.success) {
      closeDeleteModal()
      await fetchClasses()
    } else {
      alert(response.data.message || 'Failed to delete')
    }
  } catch (error: any) {
    console.error('Failed to delete:', error)
    alert('Failed to delete')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAcademicYears()
  fetchClasses()
})
</script>
