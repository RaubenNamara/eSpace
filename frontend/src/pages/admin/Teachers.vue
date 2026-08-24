<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Teachers</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Manage teacher accounts, departments, subjects and class assignments.</p>
        </div>
        <div class="flex gap-3">
          <button
            @click="fetchTeachers"
            class="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Refresh
          </button>
          <button
            @click="showImportModal = true"
            class="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Import Teachers
          </button>
          <button
            @click="showCreateModal = true"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Teacher
          </button>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8" v-if="statistics">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="text-sm text-gray-500 dark:text-gray-400">Total Teachers</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ statistics.total || 0 }}</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="text-sm text-gray-500 dark:text-gray-400">Active Teachers</div>
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ statistics.active || 0 }}</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="text-sm text-gray-500 dark:text-gray-400">Suspended Teachers</div>
          <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ statistics.suspended || 0 }}</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="text-sm text-gray-500 dark:text-gray-400">Heads of Department</div>
          <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ statistics.hods || 0 }}</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="text-sm text-gray-500 dark:text-gray-400">Unassigned Teachers</div>
          <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ statistics.unassigned || 0 }}</div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div class="flex gap-4">
          <div class="flex-1">
            <input
              v-model="search"
              @input="debouncedSearch"
              type="text"
              placeholder="Search by name, staff number, username, email or phone..."
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
          </div>
          <select
            v-model="filterStatus"
            @change="fetchTeachers"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="1">Active</option>
            <option value="0">Suspended</option>
          </select>
        </div>
      </div>

      <!-- Teachers Table -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        <!-- Loading State -->
        <div v-if="loading" class="p-12 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
          <p class="mt-4 text-gray-500 dark:text-gray-400">Loading teachers...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="teachers.length === 0" class="p-12 text-center">
          <svg class="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">No teachers found</h3>
          <p class="mt-2 text-gray-500 dark:text-gray-400">Get started by creating your first teacher.</p>
          <button
            @click="showCreateModal = true"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Teacher
          </button>
        </div>

        <!-- Teachers Table -->
        <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
          <thead class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Teacher</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Staff Number</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Department</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Last Login</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
            <tr
              v-for="teacher in teachers"
              :key="teacher.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors duration-150"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-white font-medium" :class="getAvatarColor(teacher.first_name)">
                    {{ getInitials(teacher.first_name, teacher.last_name) }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ teacher.first_name }} {{ teacher.last_name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ teacher.username }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ teacher.employee_number }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <span :title="allTeacherDepartmentNames(teacher)">{{ primaryDepartmentName(teacher) }}</span>
                <span v-if="(teacher.departments?.length || 0) > 1" class="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                  +{{ teacher.departments!.length - 1 }} more
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="teacher.is_active" class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300">
                  Active
                </span>
                <span v-else class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300">
                  Suspended
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(teacher.last_login_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end gap-2">
                  <button
                    @click="viewTeacher(teacher)"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                    title="View"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button
                    @click="editTeacher(teacher)"
                    class="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                    title="Edit"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button
                    @click="manageDepartments(teacher)"
                    class="text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300"
                    title="Manage Departments"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2M5 21H3m16 0h-6m-4 0H5m6-14v.01M11 12v.01M11 16v.01M7 8v.01M7 12v.01M7 16v.01M15 8v.01M15 12v.01M15 16v.01"></path>
                    </svg>
                  </button>
                  <button
                    @click="resetPassword(teacher)"
                    class="text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300"
                    title="Reset Password"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                    </svg>
                  </button>
                  <button
                    v-if="teacher.is_active"
                    @click="suspendTeacher(teacher)"
                    class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                    title="Suspend"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                    </svg>
                  </button>
                  <button
                    v-else
                    @click="restoreTeacher(teacher)"
                    class="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                    title="Activate"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                  <button
                    @click="deleteTeacher(teacher)"
                    class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
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
        <div v-if="pagination.pages > 1" class="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="prevPage"
              :disabled="pagination.page === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="pagination.page === pagination.pages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Showing <span class="font-medium">{{ (pagination.page - 1) * pagination.limit + 1 }}</span>
                to <span class="font-medium">{{ Math.min(pagination.page * pagination.limit, pagination.total) }}</span>
                of <span class="font-medium">{{ pagination.total }}</span> results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="prevPage"
                  :disabled="pagination.page === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="pagination.page === pagination.pages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Teacher Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Add Teacher</h2>
        </div>
        <form @submit.prevent="createTeacher" class="p-6 space-y-4">
          <!-- Personal Information -->
          <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Personal Information</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name *</label>
                <input v-model="formData.first_name" type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name *</label>
                <input v-model="formData.last_name" type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender *</label>
                <select v-model="formData.gender" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                <input v-model="formData.phone" type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              </div>
            </div>
          </div>

          <!-- Login Information -->
          <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Login Information</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Username *</label>
                <input v-model="formData.username" type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email *</label>
                <input v-model="formData.email" type="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password *</label>
                <input v-model="formData.password" type="password" required minlength="8" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password *</label>
                <input v-model="formData.password_confirmation" type="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              </div>
            </div>
          </div>

          <!-- Department Assignment -->
          <div class="pb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Department Assignment</h3>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
              <select v-model="formData.department_id" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
                <option value="">Select Department</option>
                <option v-for="department in departments" :key="department.id" :value="department.id">
                  {{ department.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="showCreateModal = false"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="creating"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {{ creating ? 'Creating...' : 'Create Teacher' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Reset Password Modal -->
    <div v-if="showResetModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Reset Password</h2>
        </div>
        <form @submit.prevent="confirmResetPassword" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password *</label>
            <input v-model="resetForm.password" type="password" required minlength="8" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password *</label>
            <input v-model="resetForm.password_confirmation" type="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="showResetModal = false"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="resetting"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {{ resetting ? 'Resetting...' : 'Reset Password' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Teacher Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Edit Teacher</h2>
        </div>
        <form @submit.prevent="updateTeacher" class="p-6 space-y-4">
          <!-- Personal Information -->
          <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Personal Information</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name *</label>
                <input v-model="editForm.first_name" type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Middle Name</label>
                <input v-model="editForm.middle_name" type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name *</label>
                <input v-model="editForm.last_name" type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender *</label>
                <select v-model="editForm.gender" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                <input v-model="editForm.phone" type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              </div>
            </div>
          </div>

          <!-- Account Information -->
          <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Information</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Username *</label>
                <input v-model="editForm.username" type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email *</label>
                <input v-model="editForm.email" type="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Account Status</label>
                <select v-model="editForm.is_active" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
                  <option value="1">Active</option>
                  <option value="0">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Department Assignment -->
          <div class="pb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Departments</h3>
            <div class="flex items-center justify-between gap-3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md">
              <span class="text-sm text-gray-700 dark:text-gray-300">
                {{ editDepartmentsSummary || 'No departments assigned' }}
              </span>
              <button
                type="button"
                @click="manageDepartmentsFromEdit"
                class="shrink-0 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Manage Departments
              </button>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="showEditModal = false"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="editing"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {{ editing ? 'Updating...' : 'Update Teacher' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Teacher Drawer -->
    <div v-if="showViewDrawer" class="fixed inset-0 z-50 overflow-hidden">
      <div class="absolute inset-0 bg-black bg-opacity-50" @click="showViewDrawer = false"></div>
      <div class="absolute inset-y-0 right-0 max-w-md w-full bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Teacher Details</h2>
          <button @click="showViewDrawer = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-6" v-if="teacherDetails">
          <!-- Profile Section -->
          <div class="flex items-center mb-6">
            <div class="flex-shrink-0 h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-bold" :class="getAvatarColor(teacherDetails.first_name)">
              {{ getInitials(teacherDetails.first_name, teacherDetails.last_name) }}
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ teacherDetails.first_name }} {{ teacherDetails.last_name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ teacherDetails.username }}</p>
              <span v-if="teacherDetails.is_active" class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 mt-1">
                Active
              </span>
              <span v-else class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 mt-1">
                Suspended
              </span>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="mb-6">
            <h4 class="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wide mb-3">Contact Information</h4>
            <div class="space-y-2">
              <div class="flex items-center text-sm">
                <svg class="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span class="text-gray-600 dark:text-gray-300">{{ teacherDetails.email }}</span>
              </div>
              <div class="flex items-center text-sm" v-if="teacherDetails.phone">
                <svg class="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span class="text-gray-600 dark:text-gray-300">{{ teacherDetails.phone }}</span>
              </div>
            </div>
          </div>

          <!-- Departments -->
          <div class="mb-6">
            <h4 class="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wide mb-3">Departments</h4>
            <div v-if="teacherDetails.departments?.length" class="flex flex-wrap gap-2">
              <span
                v-for="dept in teacherDetails.departments"
                :key="dept.id"
                class="px-2 py-1 text-xs rounded-full"
                :class="dept.is_primary
                  ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-medium'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'"
              >
                {{ dept.name }}<span v-if="dept.is_primary"> (Primary)</span>
              </span>
            </div>
            <p v-else class="text-sm text-gray-500 dark:text-gray-400">No departments assigned</p>
            <button
              type="button"
              @click="manageDepartmentsFromDrawer"
              class="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Manage Departments
            </button>
          </div>

          <!-- Account Information -->
          <div class="mb-6">
            <h4 class="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wide mb-3">Account Information</h4>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">Username</span>
                <span class="text-gray-900 dark:text-white">{{ teacherDetails.username }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">Role</span>
                <span class="text-gray-900 dark:text-white">Teacher</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">Last Login</span>
                <span class="text-gray-900 dark:text-white">{{ formatDate(teacherDetails.last_login_at) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">Account Created</span>
                <span class="text-gray-900 dark:text-white">{{ formatDate(teacherDetails.created_at) }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div class="flex gap-3">
              <button
                @click="editTeacherFromDrawer"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Teacher
              </button>
              <button
                @click="resetPasswordFromDrawer"
                class="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Import Teachers Modal -->
    <ImportTeachersModal
      v-if="showImportModal"
      @close="showImportModal = false"
      @imported="fetchTeachers"
    />

    <!-- Manage Departments Modal -->
    <ManageTeacherDepartmentsModal
      v-if="showManageDepartmentsModal && selectedTeacher"
      :teacher-id="selectedTeacher.id"
      :teacher-name="`${selectedTeacher.first_name} ${selectedTeacher.last_name}`"
      :all-departments="departments"
      @close="showManageDepartmentsModal = false"
      @saved="onDepartmentsSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import apiService from '@/services/api'
import ImportTeachersModal from '@/components/admin/ImportTeachersModal.vue'
import ManageTeacherDepartmentsModal from '@/components/admin/ManageTeacherDepartmentsModal.vue'

interface TeacherDepartment {
  id: number
  name: string
  code: string
  is_primary: boolean
}

interface Teacher {
  id: number
  teacher_id: number
  username: string
  email: string
  first_name: string
  last_name: string
  employee_number: string
  department_id: number | null
  departments?: TeacherDepartment[]
  is_active: number
  last_login_at: string | null
  created_at: string
}

interface Statistics {
  total: number
  active: number
  suspended: number
  hods: number
  unassigned: number
}

const teachers = ref<Teacher[]>([])
const departments = ref<any[]>([])
const statistics = ref<Statistics | null>(null)
const search = ref('')
const filterStatus = ref('')
const loading = ref(false)
const creating = ref(false)
const editing = ref(false)
const resetting = ref(false)
const selectedTeacher = ref<Teacher | null>(null)
const teacherDetails = ref<any>(null)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showResetModal = ref(false)
const showViewDrawer = ref(false)
const showImportModal = ref(false)
const showManageDepartmentsModal = ref(false)
const manageDepartmentsReturnTo = ref<'edit' | 'drawer' | null>(null)

const pagination = ref({
  page: 1,
  limit: 20,
  total: 0,
  pages: 0
})

const formData = ref({
  first_name: '',
  last_name: '',
  gender: '',
  phone: '',
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  department_id: ''
})

const resetForm = ref({
  password: '',
  password_confirmation: ''
})

const editForm = ref({
  first_name: '',
  middle_name: '',
  last_name: '',
  gender: '',
  phone: '',
  username: '',
  email: '',
  is_active: '1',
  department_id: ''
})

let searchTimeout: NodeJS.Timeout | null = null

const debouncedSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchTeachers()
  }, 500)
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

const fetchTeachers = async () => {
  loading.value = true
  try {
    const params: any = {
      page: pagination.value.page,
      limit: pagination.value.limit
    }

    if (search.value) params.search = search.value
    if (filterStatus.value) params.is_active = filterStatus.value

    // apiService here is actually the raw axios instance (see services/api.ts's default
    // export vs its named `apiService` wrapper export) - its .get(url, config) needs the
    // query params nested under config.params, not passed flat as the 2nd argument.
    const response = await apiService.get('/admin/teachers', { params })

    if (response.data.success) {
      teachers.value = response.data.data.teachers
      pagination.value = response.data.data.pagination
      statistics.value = response.data.data.statistics
    }
  } catch (error) {
    console.error('Failed to fetch teachers:', error)
  } finally {
    loading.value = false
  }
}

const createTeacher = async () => {
  if (formData.value.password !== formData.value.password_confirmation) {
    alert('Passwords do not match')
    return
  }

  creating.value = true
  try {
    console.log('Creating teacher with data:', formData.value)
    const response = await apiService.post('/admin/teachers', formData.value)
    console.log('Response:', response)

    if (response.data.success) {
      showCreateModal.value = false
      resetFormData()
      fetchTeachers()
      alert('Teacher created successfully')
    } else {
      console.error('Server returned error:', response.data)
      alert(response.data.message || 'Failed to create teacher')
    }
  } catch (error: any) {
    console.error('Failed to create teacher:', error)
    console.error('Error response:', error.response?.data)
    const errorMessage = error.response?.data?.message || error.message || 'Failed to create teacher'
    console.error('Detailed error:', errorMessage)
    alert(errorMessage)
  } finally {
    creating.value = false
  }
}

const resetFormData = () => {
  formData.value = {
    first_name: '',
    last_name: '',
    gender: '',
    phone: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    department_id: ''
  }
}

const viewTeacher = async (teacher: Teacher, openDrawer = true) => {
  selectedTeacher.value = teacher
  try {
    const response = await apiService.get(`/admin/teachers/${teacher.id}`)
    if (response.data.success) {
      teacherDetails.value = response.data.data
      if (openDrawer) showViewDrawer.value = true
    }
  } catch (error) {
    console.error('Failed to fetch teacher details:', error)
  }
}

const editTeacherFromDrawer = () => {
  showViewDrawer.value = false
  editTeacher(selectedTeacher.value!)
}

const resetPasswordFromDrawer = () => {
  showViewDrawer.value = false
  resetPassword(selectedTeacher.value!)
}

const editDepartmentsSummary = computed(() => {
  const depts = selectedTeacher.value?.departments || []
  return depts.map(d => d.is_primary ? `${d.name} (Primary)` : d.name).join(', ')
})

const manageDepartments = (teacher: Teacher) => {
  selectedTeacher.value = teacher
  manageDepartmentsReturnTo.value = null
  showManageDepartmentsModal.value = true
}

const manageDepartmentsFromEdit = () => {
  manageDepartmentsReturnTo.value = 'edit'
  showEditModal.value = false
  showManageDepartmentsModal.value = true
}

const manageDepartmentsFromDrawer = () => {
  manageDepartmentsReturnTo.value = 'drawer'
  showViewDrawer.value = false
  showManageDepartmentsModal.value = true
}

const onDepartmentsSaved = async () => {
  await fetchTeachers()
  if (selectedTeacher.value) {
    await viewTeacher(selectedTeacher.value, false)
    if (manageDepartmentsReturnTo.value === 'edit') {
      editTeacher(teacherDetails.value)
    } else if (manageDepartmentsReturnTo.value === 'drawer') {
      showViewDrawer.value = true
    }
  }
  manageDepartmentsReturnTo.value = null
}

const primaryDepartmentName = (teacher: Teacher) => {
  const primary = teacher.departments?.find(d => d.is_primary)
  if (primary) return primary.name
  if (teacher.departments?.length) return teacher.departments[0].name
  return getDepartmentName(teacher.department_id)
}

const allTeacherDepartmentNames = (teacher: Teacher) => {
  return (teacher.departments || []).map(d => d.name).join(', ')
}

const editTeacher = (teacher: Teacher) => {
  selectedTeacher.value = teacher
  editForm.value = {
    first_name: teacher.first_name,
    middle_name: '',
    last_name: teacher.last_name,
    gender: '',
    phone: '',
    username: teacher.username,
    email: teacher.email,
    is_active: teacher.is_active.toString(),
    department_id: teacher.department_id?.toString() || ''
  }
  showEditModal.value = true
}

const updateTeacher = async () => {
  editing.value = true
  try {
    const response = await apiService.put(`/admin/teachers/${selectedTeacher.value?.id}`, editForm.value)

    if (response.data.success) {
      showEditModal.value = false
      fetchTeachers()
      alert('Teacher updated successfully')
    } else {
      alert(response.data.message || 'Failed to update teacher')
    }
  } catch (error: any) {
    console.error('Failed to update teacher:', error)
    alert(error.response?.data?.message || 'Failed to update teacher')
  } finally {
    editing.value = false
  }
}

const resetPassword = (teacher: Teacher) => {
  selectedTeacher.value = teacher
  showResetModal.value = true
}

const confirmResetPassword = async () => {
  if (resetForm.value.password !== resetForm.value.password_confirmation) {
    alert('Passwords do not match')
    return
  }

  resetting.value = true
  try {
    const response = await apiService.post(`/admin/teachers/${selectedTeacher.value?.id}/reset-password`, resetForm.value)

    if (response.data.success) {
      showResetModal.value = false
      resetForm.value = { password: '', password_confirmation: '' }
      alert('Password reset successfully')
    } else {
      alert(response.data.message || 'Failed to reset password')
    }
  } catch (error: any) {
    console.error('Failed to reset password:', error)
    alert(error.response?.data?.message || 'Failed to reset password')
  } finally {
    resetting.value = false
  }
}

const suspendTeacher = async (teacher: Teacher) => {
  if (!confirm(`Are you sure you want to suspend ${teacher.first_name} ${teacher.last_name}?`)) return

  try {
    const response = await apiService.put(`/admin/teachers/${teacher.id}/suspend`)

    if (response.data.success) {
      fetchTeachers()
      alert('Teacher suspended successfully')
    } else {
      alert(response.data.message || 'Failed to suspend teacher')
    }
  } catch (error: any) {
    console.error('Failed to suspend teacher:', error)
    alert(error.response?.data?.message || 'Failed to suspend teacher')
  }
}

const restoreTeacher = async (teacher: Teacher) => {
  if (!confirm(`Are you sure you want to activate ${teacher.first_name} ${teacher.last_name}?`)) return

  try {
    const response = await apiService.put(`/admin/teachers/${teacher.id}/restore`)

    if (response.data.success) {
      fetchTeachers()
      alert('Teacher activated successfully')
    } else {
      alert(response.data.message || 'Failed to activate teacher')
    }
  } catch (error: any) {
    console.error('Failed to activate teacher:', error)
    alert(error.response?.data?.message || 'Failed to activate teacher')
  }
}

const deleteTeacher = async (teacher: Teacher) => {
  if (!confirm(`Are you sure you want to delete ${teacher.first_name} ${teacher.last_name}? This action cannot be undone.`)) return

  try {
    const response = await apiService.delete(`/admin/teachers/${teacher.id}`)

    if (response.data.success) {
      fetchTeachers()
      alert('Teacher deleted successfully')
    } else {
      alert(response.data.message || 'Failed to delete teacher')
    }
  } catch (error: any) {
    console.error('Failed to delete teacher:', error)
    alert(error.response?.data?.message || 'Failed to delete teacher')
  }
}

const prevPage = () => {
  if (pagination.value.page > 1) {
    pagination.value.page--
    fetchTeachers()
  }
}

const nextPage = () => {
  if (pagination.value.page < pagination.value.pages) {
    pagination.value.page++
    fetchTeachers()
  }
}

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

const getAvatarColor = (name: string) => {
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500']
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

const formatDate = (date: string | null) => {
  if (!date) return 'Never'
  return new Date(date).toLocaleDateString()
}

const getDepartmentName = (departmentId: number | null) => {
  if (!departmentId) return 'Unassigned'
  const department = departments.value.find(d => d.id === departmentId)
  return department ? department.name : 'Unknown'
}

onMounted(() => {
  fetchTeachers()
  fetchDepartments()
})
</script>
