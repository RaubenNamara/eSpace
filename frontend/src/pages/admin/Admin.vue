<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Admin Management</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Create and manage admin users</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Your role: <span class="font-medium">{{ currentUserRole?.toUpperCase() }}</span></p>
        </div>
        <button
          @click="showCreateModal = true"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors self-start sm:self-auto flex-shrink-0"
        >
          Create Admin
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

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div class="flex gap-4">
          <div class="flex-1">
            <input
              v-model="search"
              type="text"
              placeholder="Search by username or email..."
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        <!-- Loading State -->
        <div v-if="loading" class="p-12 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
          <p class="mt-4 text-gray-500 dark:text-gray-400">Loading users...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="users.length === 0" class="p-12 text-center">
          <svg class="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">No users found</h3>
          <p class="mt-2 text-gray-500 dark:text-gray-400">Get started by creating your first admin user.</p>
          <button
            @click="showCreateModal = true"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create User
          </button>
        </div>

        <!-- Users Table -->
        <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
          <thead class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">User</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Role</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Created</th>
              <th class="sticky right-0 z-10 bg-gray-100 dark:bg-gray-800 px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider shadow-[-4px_0_6px_-4px_rgba(0,0,0,0.15)]">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
            <tr
              v-for="user in users"
              :key="user.id"
              class="group hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors duration-150"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                    :class="getAvatarColor(user.username)"
                  >
                    {{ user.username.charAt(0).toUpperCase() }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-semibold text-gray-900 dark:text-white">{{ user.username }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                  :class="getRoleBadgeClass(user.role)"
                >
                  {{ formatRole(user.role) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  :class="user.is_active ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300'"
                >
                  <span
                    class="w-2 h-2 rounded-full"
                    :class="user.is_active ? 'bg-emerald-500' : 'bg-rose-500'"
                  ></span>
                  {{ user.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                {{ formatDate(user.created_at) }}
              </td>
              <td class="sticky right-0 z-10 bg-white dark:bg-gray-800 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/60 transition-colors duration-150 px-6 py-4 whitespace-nowrap text-right shadow-[-4px_0_6px_-4px_rgba(0,0,0,0.15)]">
                <div class="flex items-center justify-end gap-2">
                  <button
                    v-if="canEditUser(user)"
                    @click="editUser(user)"
                    class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-150"
                    title="Edit"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button
                    v-if="canSuspendUser(user)"
                    @click="suspendUser(user)"
                    class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-150"
                    :title="user.is_active ? 'Suspend' : 'Activate'"
                  >
                    <svg v-if="user.is_active" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </button>
                  <button
                    v-if="canDeleteUser(user)"
                    @click="deleteUser(user)"
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
        <div class="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700 dark:text-gray-300">
              Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of {{ pagination.total }} results
            </div>
            <div class="flex gap-2">
              <button
                @click="prevPage"
                :disabled="pagination.page === 1"
                class="px-3 py-1 border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-md text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <button
                @click="nextPage"
                :disabled="pagination.page === pagination.pages"
                class="px-3 py-1 border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-md text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create User Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New User</h2>
          <form @submit.prevent="createUser">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                <input
                  v-model="formData.username"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <input
                  v-model="formData.password"
                  type="password"
                  required
                  minlength="8"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                <select
                  v-model="formData.role"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="admin">Admin</option>
                  <option v-if="currentUserRole === 'super_admin'" value="super_admin">Super Admin</option>
                </select>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {{ currentUserRole === 'super_admin' ? 'You can create both Admin and Super Admin users' : 'You can only create Admin users' }}
                </p>
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
                {{ loading ? 'Creating...' : 'Create User' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit User</h2>
          <form @submit.prevent="updateUser">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                <input
                  v-model="editFormData.username"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  v-model="editFormData.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                <select
                  v-model="editFormData.role"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="admin">Admin</option>
                  <option v-if="currentUserRole === 'super_admin'" value="super_admin">Super Admin</option>
                </select>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {{ currentUserRole === 'super_admin' ? 'You can change role to Admin or Super Admin' : 'Role cannot be changed' }}
                </p>
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
                {{ loading ? 'Updating...' : 'Update User' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { apiService } from '../../services/api'

type UserRole = 'student' | 'teacher' | 'hod' | 'admin' | 'super_admin'

interface AdminUser {
  id: number
  username: string
  email: string
  role: UserRole
  is_active: boolean
  created_at: string
  updated_at?: string
  profile_photo?: string | null
  phone?: string | null
}

const authStore = useAuthStore()

const users = ref<AdminUser[]>([])
const search = ref('')
const pagination = ref({
  page: 1,
  limit: 20,
  total: 0,
  pages: 0
})
const showCreateModal = ref(false)
const showEditModal = ref(false)
const loading = ref(false)
const successMessage = ref('')
const formData = ref({
  username: '',
  email: '',
  password: '',
  role: 'admin' as UserRole // Pre-fill with admin role
})
const editFormData = ref({
  id: 0,
  username: '',
  email: '',
  role: 'admin' as UserRole
})

// Get current user's role
const currentUserRole = computed(() => {
  return authStore.user?.role || 'admin'
})

// Check if current user can edit a specific user
const canEditUser = (user: AdminUser) => {
  // Can't edit yourself
  if (user.id === authStore.user?.id) return false

  // Regular admins can only edit other regular admins
  if (currentUserRole.value === 'admin') {
    return user.role === 'admin'
  }

  // Super admins can edit everyone except themselves
  return true
}

// Check if current user can suspend/activate a specific user
const canSuspendUser = (user: AdminUser) => {
  // Can't suspend yourself
  if (user.id === authStore.user?.id) return false

  // Regular admins can only suspend other regular admins
  if (currentUserRole.value === 'admin') {
    return user.role === 'admin'
  }

  // Super admins can suspend everyone except themselves
  return true
}

// Check if current user can delete a specific user
const canDeleteUser = (user: AdminUser) => {
  // Can't delete yourself
  if (user.id === authStore.user?.id) return false

  // Regular admins can only delete other regular admins
  if (currentUserRole.value === 'admin') {
    return user.role === 'admin'
  }

  // Super admins can delete everyone except themselves
  return true
}

const fetchUsers = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.value.page,
      limit: pagination.value.limit,
      role: '' // Fetch all admin types (admin and super_admin)
    }

    if (search.value) (params as any).search = search.value

    console.log('Current user role:', currentUserRole.value)
    console.log('Fetching users with params:', params)
    const response = await apiService.get('/admin/users', params)
    console.log('API response:', response)

    if (response.data.success) {
      users.value = response.data.data.users
      pagination.value = response.data.data.pagination
      console.log('Users loaded:', users.value.length, users.value)
    } else {
      console.error('API returned error:', response.data)
    }
  } catch (error) {
    console.error('Failed to fetch users:', error)
  } finally {
    loading.value = false
  }
}

const createUser = async () => {
  loading.value = true
  try {
    const response = await apiService.post('/admin/users', formData.value)

    if (response.data.success) {
      const createdUsername = formData.value.username
      showCreateModal.value = false
      formData.value = { username: '', email: '', password: '', role: 'admin' }
      successMessage.value = `User "${createdUsername}" created successfully!`
      await fetchUsers()
      // Clear success message after 5 seconds
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      console.error('Create user error:', response.data)
      alert(response.data.message || 'Failed to create user')
    }
  } catch (error: any) {
    console.error('Failed to create user:', error)
    console.error('Error response:', error.response?.data)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to create user'
    alert(errorMessage)
  } finally {
    loading.value = false
  }
}

const suspendUser = async (user: AdminUser) => {
  const action = user.is_active ? 'suspend' : 'activate'
  if (!confirm(`Are you sure you want to ${action} this user?`)) return

  loading.value = true
  try {
    const endpoint = user.is_active ? 'suspend' : 'restore'
    const response = await apiService.put(`/admin/users/${user.id}/${endpoint}`, {})

    if (response.data.success) {
      successMessage.value = `User "${user.username}" ${action}d successfully!`
      await fetchUsers()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      alert(response.data.message || 'Failed to update user')
    }
  } catch (error: any) {
    console.error('Failed to update user:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to update user'
    alert(errorMessage)
  } finally {
    loading.value = false
  }
}

const deleteUser = async (user: AdminUser) => {
  if (!confirm(`Are you sure you want to delete user "${user.username}"? This action cannot be undone.`)) return

  loading.value = true
  try {
    const response = await apiService.delete(`/admin/users/${user.id}`)

    if (response.data.success) {
      successMessage.value = `User "${user.username}" deleted successfully!`
      await fetchUsers()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      alert(response.data.message || 'Failed to delete user')
    }
  } catch (error: any) {
    console.error('Failed to delete user:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to delete user'
    alert(errorMessage)
  } finally {
    loading.value = false
  }
}

const editUser = (user: AdminUser) => {
  editFormData.value = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role
  }
  showEditModal.value = true
}

const updateUser = async () => {
  loading.value = true
  try {
    console.log('Updating user:', editFormData.value)
    const response = await apiService.put(`/admin/users/${editFormData.value.id}`, {
      username: editFormData.value.username,
      email: editFormData.value.email,
      role: editFormData.value.role
    })
    console.log('Update response:', response)

    if (response.data.success) {
      showEditModal.value = false
      successMessage.value = `User "${editFormData.value.username}" updated successfully!`
      await fetchUsers()
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      console.error('Update failed:', response.data)
      alert(response.data.message || 'Failed to update user')
    }
  } catch (error: any) {
    console.error('Failed to update user:', error)
    console.error('Error response:', error.response?.data)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to update user'
    alert(errorMessage)
  } finally {
    loading.value = false
  }
}

const getRoleBadgeClass = (role: string) => {
  const classes = {
    student: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300',
    teacher: 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300',
    hod: 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300',
    admin: 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300',
    super_admin: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300'
  }
  return classes[role as keyof typeof classes] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
}

const formatRole = (role: string) => {
  const roleNames: Record<string, string> = {
    student: 'Student',
    teacher: 'Teacher',
    hod: 'HOD',
    admin: 'Admin',
    super_admin: 'Super Admin'
  }
  return roleNames[role] || role.toUpperCase()
}

const getAvatarColor = (username: string) => {
  const colors = [
    'bg-gradient-to-br from-blue-500 to-blue-600',
    'bg-gradient-to-br from-purple-500 to-purple-600',
    'bg-gradient-to-br from-pink-500 to-pink-600',
    'bg-gradient-to-br from-indigo-500 to-indigo-600',
    'bg-gradient-to-br from-teal-500 to-teal-600',
    'bg-gradient-to-br from-orange-500 to-orange-600',
    'bg-gradient-to-br from-green-500 to-green-600',
    'bg-gradient-to-br from-red-500 to-red-600'
  ]
  const index = username.charCodeAt(0) % colors.length
  return colors[index]
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const prevPage = () => {
  if (pagination.value.page > 1) {
    pagination.value.page--
    fetchUsers()
  }
}

const nextPage = () => {
  if (pagination.value.page < pagination.value.pages) {
    pagination.value.page++
    fetchUsers()
  }
}

watch([search], () => {
  pagination.value.page = 1
  fetchUsers()
})

onMounted(() => {
  fetchUsers()
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
