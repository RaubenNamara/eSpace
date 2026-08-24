<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Students Management</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Create and manage student accounts</p>
        </div>
        <button
          @click="showCreateModal = true"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors self-start sm:self-auto flex-shrink-0"
        >
          Add Student
        </button>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="text-sm text-gray-500 dark:text-gray-400">Total Students</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="text-sm text-gray-500 dark:text-gray-400">Male</div>
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ stats.male }}</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="text-sm text-gray-500 dark:text-gray-400">Female</div>
          <div class="text-2xl font-bold text-pink-600 dark:text-pink-400">{{ stats.female }}</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="text-sm text-gray-500 dark:text-gray-400">Other</div>
          <div class="text-2xl font-bold text-gray-500 dark:text-gray-400">{{ stats.other }}</div>
        </div>
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

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-100 dark:border-gray-700">
        <div class="flex gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, username, email, or admission number..."
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              @input="debouncedSearch"
            >
          </div>
          <select
            v-model="classFilter"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            @change="fetchStudents(1)"
          >
            <option value="">All Classes</option>
            <option v-for="cls in classes" :key="cls.id" :value="cls.id">
              {{ cls.name }} ({{ cls.level }})
            </option>
          </select>
        </div>
      </div>

      <!-- Students Table -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        <!-- Loading State -->
        <div v-if="loading" class="p-12 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
          <p class="mt-4 text-gray-500 dark:text-gray-400">Loading students...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="students.length === 0" class="p-12 text-center">
          <svg class="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">No students found</h3>
          <p class="mt-2 text-gray-500 dark:text-gray-400">Get started by adding your first student.</p>
          <button
            @click="showCreateModal = true"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Student
          </button>
        </div>

        <!-- Students Table -->
        <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
          <thead class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Reg No</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Class</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Gender</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th class="sticky right-0 z-10 bg-gray-100 dark:bg-gray-800 px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider shadow-[-4px_0_6px_-4px_rgba(0,0,0,0.15)]">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
            <tr
              v-for="student in students"
              :key="student.id"
              class="group hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors duration-150"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-gray-900 dark:text-white">{{ student.first_name }} {{ student.last_name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                  {{ student.admission_number }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                {{ student.class_name ? (student.stream_name ? `${student.class_name}-${student.stream_name}` : student.class_name) : 'Not assigned' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 capitalize">
                {{ student.gender || '—' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="student.is_active ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300'"
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {{ student.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="sticky right-0 z-10 bg-white dark:bg-gray-800 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/60 transition-colors duration-150 px-6 py-4 whitespace-nowrap text-right shadow-[-4px_0_6px_-4px_rgba(0,0,0,0.15)]">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="editStudent(student)"
                    class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-150"
                    title="Edit"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button
                    @click="regeneratePassword(student)"
                    class="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-150"
                    title="Regenerate Password"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                    </svg>
                  </button>
                  <button
                    @click="deleteStudent(student)"
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

        <!-- Pagination -->
        <div v-if="pagination.pages > 1" class="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Page {{ pagination.page }} of {{ pagination.pages }} ({{ pagination.total }} total)
          </p>
          <div class="flex gap-2">
            <button
              :disabled="pagination.page <= 1"
              @click="fetchStudents(pagination.page - 1)"
              class="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Previous
            </button>
            <button
              :disabled="pagination.page >= pagination.pages"
              @click="fetchStudents(pagination.page + 1)"
              class="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Student Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Add New Student</h2>
          <form @submit.prevent="createStudent">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name *</label>
                <input
                  v-model="formData.first_name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name *</label>
                <input
                  v-model="formData.last_name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reg No *</label>
                <input
                  v-model="formData.admission_number"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                <select
                  v-model="formData.gender"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class</label>
                <select
                  v-model="formData.class_id"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">No Class</option>
                  <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                    {{ cls.name }} ({{ cls.level }}) {{ cls.stream_name ? '- ' + cls.stream_name : '' }}
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
                {{ loading ? 'Creating...' : 'Add Student' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Student Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Student</h2>
          <form @submit.prevent="updateStudent">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name *</label>
                <input
                  v-model="editFormData.first_name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name *</label>
                <input
                  v-model="editFormData.last_name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reg No *</label>
                <input
                  v-model="editFormData.admission_number"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                <select
                  v-model="editFormData.gender"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class</label>
                <select
                  v-model="editFormData.class_id"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">No Class</option>
                  <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                    {{ cls.name }} ({{ cls.level }}) {{ cls.stream_name ? '- ' + cls.stream_name : '' }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  v-model="editFormData.is_active"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option :value="1">Active</option>
                  <option :value="0">Inactive</option>
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
                {{ loading ? 'Updating...' : 'Update Student' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Password Display Modal -->
    <div v-if="showPasswordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <div class="flex items-center justify-center mb-4">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
              </svg>
            </div>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">Password Regenerated</h2>
          <p class="text-gray-600 dark:text-gray-400 text-center mb-6">The student's password has been reset to their admission number.</p>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
            <div class="mb-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
              <div class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:text-white rounded px-3 py-2 font-mono text-sm">
                {{ regeneratedPassword.username }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
              <div class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 font-mono text-sm font-bold text-green-600 dark:text-green-400">
                {{ regeneratedPassword.password }}
              </div>
            </div>
          </div>

          <button
            @click="showPasswordModal = false"
            class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiService } from '../../services/api'

interface Student {
  id: number
  admission_number: string
  first_name: string
  last_name: string
  is_active: number
  created_at: string
  class_id?: number
  class_name?: string
  class_level?: string
  gender?: string
  stream_name?: string
  stream_id?: number
}

interface Class {
  id: number
  name: string
  level: string
  stream_name?: string
}

const students = ref<Student[]>([])
const classes = ref<Class[]>([])
const stats = ref({ total: 0, male: 0, female: 0, other: 0 })
const pagination = ref({ page: 1, limit: 20, total: 0, pages: 0 })
const loading = ref(false)
const successMessage = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showPasswordModal = ref(false)
const searchQuery = ref('')
const classFilter = ref('')
const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const regeneratedPassword = ref({
  username: '',
  password: ''
})

const formData = ref({
  first_name: '',
  last_name: '',
  admission_number: '',
  gender: '',
  class_id: ''
})

const editFormData = ref({
  id: 0,
  first_name: '',
  last_name: '',
  admission_number: '',
  gender: '',
  class_id: '',
  is_active: 1
})

const fetchClasses = async () => {
  try {
    const response = await apiService.get('/admin/classes')
    if (response.data.success) {
      classes.value = response.data.data || []
    }
  } catch (error) {
    console.error('Failed to fetch classes:', error)
  }
}

const fetchStudents = async (page = 1) => {
  loading.value = true
  try {
    const params: any = { page, limit: pagination.value.limit }
    if (searchQuery.value) params.search = searchQuery.value
    if (classFilter.value) params.class_id = classFilter.value

    const response = await apiService.get('/admin/students', params)

    if (response.data.success) {
      students.value = response.data.data.students || []
      stats.value = response.data.data.stats
      pagination.value = response.data.data.pagination
    } else {
      console.error('API returned error:', response.data)
    }
  } catch (error) {
    console.error('Failed to fetch students:', error)
  } finally {
    loading.value = false
  }
}

const debouncedSearch = () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value)
  searchTimeout.value = setTimeout(() => {
    fetchStudents()
  }, 500)
}

const createStudent = async () => {
  loading.value = true
  try {
    const payload: any = {
      first_name: formData.value.first_name,
      last_name: formData.value.last_name,
      admission_number: formData.value.admission_number
    }
    
    if (formData.value.gender) payload.gender = formData.value.gender
    if (formData.value.class_id) payload.class_id = parseInt(formData.value.class_id)
    
    const response = await apiService.post('/admin/students', payload)
    
    if (response.data.success) {
      const createdName = formData.value.first_name + ' ' + formData.value.last_name
      showCreateModal.value = false
      resetFormData()
      successMessage.value = `Student "${createdName}" created successfully!`
      await fetchStudents()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      alert(response.data.message || 'Failed to create student')
    }
  } catch (error: any) {
    console.error('Failed to create student:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to create student'
    alert(errorMessage)
  } finally {
    loading.value = false
  }
}

const editStudent = (student: Student) => {
  editFormData.value = {
    id: student.id,
    first_name: student.first_name,
    last_name: student.last_name,
    admission_number: student.admission_number,
    gender: student.gender || '',
    class_id: student.class_id?.toString() || '',
    is_active: student.is_active
  }
  showEditModal.value = true
}

const updateStudent = async () => {
  loading.value = true
  try {
    const payload: any = {
      first_name: editFormData.value.first_name,
      last_name: editFormData.value.last_name,
      admission_number: editFormData.value.admission_number,
      is_active: editFormData.value.is_active
    }
    
    if (editFormData.value.gender) payload.gender = editFormData.value.gender
    if (editFormData.value.class_id) payload.class_id = parseInt(editFormData.value.class_id)
    
    const response = await apiService.put(`/admin/students/${editFormData.value.id}`, payload)
    
    if (response.data.success) {
      showEditModal.value = false
      successMessage.value = `Student "${editFormData.value.first_name} ${editFormData.value.last_name}" updated successfully!`
      await fetchStudents()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      alert(response.data.message || 'Failed to update student')
    }
  } catch (error: any) {
    console.error('Failed to update student:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to update student'
    alert(errorMessage)
  } finally {
    loading.value = false
  }
}

const deleteStudent = async (student: Student) => {
  if (!confirm(`Are you sure you want to delete student "${student.first_name} ${student.last_name}"? This action cannot be undone.`)) return
  
  loading.value = true
  try {
    const response = await apiService.delete(`/admin/students/${student.id}`)
    
    if (response.data.success) {
      successMessage.value = `Student "${student.first_name} ${student.last_name}" deleted successfully!`
      await fetchStudents()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      alert(response.data.message || 'Failed to delete student')
    }
  } catch (error: any) {
    console.error('Failed to delete student:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to delete student'
    alert(errorMessage)
  } finally {
    loading.value = false
  }
}

const resetFormData = () => {
  formData.value = {
    first_name: '',
    last_name: '',
    admission_number: '',
    gender: '',
    class_id: ''
  }
}

const regeneratePassword = async (student: Student) => {
  if (!confirm(`Are you sure you want to regenerate the password for ${student.first_name} ${student.last_name}?`)) return
  
  loading.value = true
  try {
    const response = await apiService.post(`/admin/students/${student.id}/regenerate-password`, {})
    
    if (response.data.success) {
      regeneratedPassword.value = {
        username: response.data.data.username,
        password: response.data.data.new_password
      }
      showPasswordModal.value = true
    } else {
      alert(response.data.message || 'Failed to regenerate password')
    }
  } catch (error: any) {
    console.error('Failed to regenerate password:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to regenerate password'
    alert(errorMessage)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchClasses()
  fetchStudents()
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
