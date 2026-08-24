<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Heads of Department</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Manage department heads and their assignments</p>
        </div>
        <div class="flex space-x-3">
          <button
            @click="openAssignTeacherModal"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Assign Teacher as HOD
          </button>
          <button
            @click="openCreateModal"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Add HOD
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div class="flex space-x-4">
          <input
            v-model="search"
            type="text"
            placeholder="Search HODs..."
            class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            @input="debouncedSearch"
          >
          <select
            v-model="filterDepartment"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            @change="fetchHODs"
          >
            <option value="">All Departments</option>
            <option v-if="departments.length === 0" disabled>No departments available</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">
              {{ dept.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- HODs Table -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Username</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="hod in hods" :key="hod.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {{ getInitials(hod.first_name, hod.last_name) }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ hod.first_name }} {{ hod.last_name }}</div>
                    <div v-if="hod.teacher_id" class="text-xs text-gray-500 dark:text-gray-400">Also a Teacher</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ hod.username }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ hod.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ hod.department_name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="hod.is_active ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300'" class="px-2 py-1 text-xs font-semibold rounded-full">
                  {{ hod.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="editHOD(hod)" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3">Edit</button>
                <button @click="deassignHOD(hod.id)" class="text-orange-600 dark:text-orange-400 hover:text-orange-900 dark:hover:text-orange-300" title="Remove HOD role">De-assign</button>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>

      <!-- Create HOD Modal -->
      <div v-if="showCreateModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
          <!-- Header -->
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 flex-shrink-0">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold text-white">Add New Head of Department</h2>
                <p class="text-indigo-100 text-sm mt-1">Create a new HOD account and assign department</p>
              </div>
              <button @click="showCreateModal = false" class="text-white/80 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="createHOD" class="flex-1 flex flex-col min-h-0">
            <!-- Form Content -->
            <div class="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
              <!-- Personal Information -->
              <div class="md:col-span-2">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Personal Information
                </h3>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name <span class="text-red-500">*</span></label>
                <input
                  v-model="formData.first_name"
                  type="text"
                  placeholder="Enter first name"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name <span class="text-red-500">*</span></label>
                <input
                  v-model="formData.last_name"
                  type="text"
                  placeholder="Enter last name"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username <span class="text-red-500">*</span></label>
                <input
                  v-model="formData.username"
                  type="text"
                  placeholder="Choose a username"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email <span class="text-red-500">*</span></label>
                <input
                  v-model="formData.email"
                  type="email"
                  placeholder="email@example.com"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password <span class="text-red-500">*</span></label>
                <input
                  v-model="formData.password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
              </div>

              <!-- Department Assignment -->
              <div class="md:col-span-2 mt-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  Department Assignment
                </h3>
              </div>

              <div class="md:col-span-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department <span class="text-red-500">*</span></label>
                <select
                  v-model="formData.department_id"
                  :disabled="loadingDepartments"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                >
                  <option value="">Select Department</option>
                  <option v-if="loadingDepartments" disabled>Loading departments...</option>
                  <option v-else-if="departments.length === 0" disabled>No departments available</option>
                  <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                    {{ dept.name }}
                  </option>
                </select>
                <p v-if="!loadingDepartments && departments.length === 0" class="text-xs text-red-500 dark:text-red-400 mt-1">No departments available. Please create departments first.</p>
              </div>

              <div class="md:col-span-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Appointed Date <span class="text-red-500">*</span></label>
                <input
                  v-model="formData.appointed_date"
                  type="date"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
              </div>

              <!-- Teacher Linking -->
              <div class="md:col-span-2 mt-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  Teacher Role Linking (Optional)
                </h3>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Link to Existing Teacher Account</label>
                <select
                  v-model="formData.teacher_id"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="">No Teacher Link - HOD Only</option>
                  <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
                    {{ teacher.first_name }} {{ teacher.last_name }} ({{ teacher.employee_number }})
                  </option>
                </select>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-start">
                  <svg class="w-4 h-4 mr-1 mt-0.5 text-indigo-500 dark:text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Link this HOD to an existing teacher account to enable dual-role access. The HOD will be able to switch between HOD and Teacher modes.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 flex-shrink-0">
              <button
                type="button"
                @click="showCreateModal = false"
                class="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-indigo-500/30"
              >
                Create HOD Account
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Assign Teacher as HOD Modal -->
      <div v-if="showAssignTeacherModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
          <!-- Header -->
          <div class="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-5 flex-shrink-0">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold text-white">Assign Teacher as HOD</h2>
                <p class="text-green-100 text-sm mt-1">Select a teacher to promote to Head of Department</p>
              </div>
              <button @click="showAssignTeacherModal = false" class="text-white/80 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="assignTeacherAsHOD" class="flex-1 flex flex-col min-h-0">
            <!-- Form Content -->
            <div class="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
              <!-- Teacher Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Teacher <span class="text-red-500">*</span></label>
                <select
                  v-model="assignTeacherData.teacher_id"
                  :disabled="loadingTeachers"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                >
                  <option value="">Select a teacher</option>
                  <option v-if="loadingTeachers" disabled>Loading teachers...</option>
                  <option v-else-if="availableTeachers.length === 0" disabled>No available teachers</option>
                  <option v-for="teacher in availableTeachers" :key="teacher.id" :value="teacher.id">
                    {{ teacher.first_name }} {{ teacher.last_name }} ({{ teacher.employee_number }})
                  </option>
                </select>
                <p v-if="!loadingTeachers && availableTeachers.length === 0" class="text-xs text-red-500 dark:text-red-400 mt-1">No available teachers. All teachers are already HODs or no teachers exist.</p>
              </div>

              <!-- Department Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department <span class="text-red-500">*</span></label>
                <select
                  v-model="assignTeacherData.department_id"
                  :disabled="loadingDepartments"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                >
                  <option value="">Select Department</option>
                  <option v-if="loadingDepartments" disabled>Loading departments...</option>
                  <option v-else-if="departments.length === 0" disabled>No departments available</option>
                  <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                    {{ dept.name }}
                  </option>
                </select>
              </div>

              <!-- Appointment Date -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Appointment Date <span class="text-red-500">*</span></label>
                <input
                  v-model="assignTeacherData.appointed_date"
                  type="date"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
              </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 flex-shrink-0">
              <button
                type="button"
                @click="showAssignTeacherModal = false"
                class="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg shadow-green-500/30"
              >
                Assign as HOD
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Edit HOD Modal -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
          <!-- Header -->
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 flex-shrink-0">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold text-white">Edit Head of Department</h2>
                <p class="text-indigo-100 text-sm mt-1">Update HOD information and department assignment</p>
              </div>
              <button @click="showEditModal = false" class="text-white/80 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="updateHOD" class="flex-1 flex flex-col min-h-0">
            <!-- Form Content -->
            <div class="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
              <!-- Personal Information -->
              <div class="md:col-span-2">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Personal Information
                </h3>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name <span class="text-red-500">*</span></label>
                <input
                  v-model="editFormData.first_name"
                  type="text"
                  placeholder="Enter first name"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name <span class="text-red-500">*</span></label>
                <input
                  v-model="editFormData.last_name"
                  type="text"
                  placeholder="Enter last name"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username <span class="text-red-500">*</span></label>
                <input
                  v-model="editFormData.username"
                  type="text"
                  placeholder="Choose a username"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email <span class="text-red-500">*</span></label>
                <input
                  v-model="editFormData.email"
                  type="email"
                  placeholder="email@example.com"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                <input
                  v-model="editFormData.phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password (leave blank to keep current)</label>
                <input
                  v-model="editFormData.password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
              </div>

              <!-- Department Assignment -->
              <div class="md:col-span-2 mt-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  Department Assignment
                </h3>
              </div>

              <div class="md:col-span-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department <span class="text-red-500">*</span></label>
                <select
                  v-model="editFormData.department_id"
                  :disabled="loadingDepartments"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                >
                  <option value="">Select Department</option>
                  <option v-if="loadingDepartments" disabled>Loading departments...</option>
                  <option v-else-if="departments.length === 0" disabled>No departments available</option>
                  <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                    {{ dept.name }}
                  </option>
                </select>
              </div>

              <div class="md:col-span-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Appointed Date <span class="text-red-500">*</span></label>
                <input
                  v-model="editFormData.appointed_date"
                  type="date"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
              </div>

              <div class="md:col-span-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                <select
                  v-model="editFormData.is_active"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option :value="1">Active</option>
                  <option :value="0">Inactive</option>
                </select>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 flex-shrink-0">
              <button
                type="button"
                @click="showEditModal = false"
                class="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-indigo-500/30"
              >
                Update HOD
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
import apiService from '@/services/api'

interface HOD {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  department_id: number
  department_name: string
  teacher_id?: number
  is_active: boolean
  appointed_date: string
}

interface Department {
  id: number
  name: string
}

interface Teacher {
  id: number
  first_name: string
  last_name: string
  employee_number: string
  username: string
  email: string
  phone?: string
  department_id?: number
  department_name?: string
}

const hods = ref<HOD[]>([])
const departments = ref<Department[]>([])
const teachers = ref<Teacher[]>([])
const availableTeachers = ref<Teacher[]>([])
const search = ref('')
const filterDepartment = ref('')
const showCreateModal = ref(false)
const showAssignTeacherModal = ref(false)
const showEditModal = ref(false)
const loadingDepartments = ref(false)
const loadingTeachers = ref(false)
const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

const formData = ref({
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
  phone: '',
  department_id: '',
  appointed_date: '',
  teacher_id: ''
})

const assignTeacherData = ref({
  teacher_id: '',
  department_id: '',
  appointed_date: ''
})

const editFormData = ref({
  id: 0,
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
  phone: '',
  department_id: '',
  appointed_date: '',
  is_active: 1
})

const fetchHODs = async () => {
  try {
    const params: any = {}
    if (search.value) params.search = search.value
    if (filterDepartment.value) params.department_id = filterDepartment.value

    const response = await apiService.get('/admin/hods', params)
    if (response.data.success) {
      hods.value = response.data.data.hods || []
    }
  } catch (error) {
    console.error('Failed to fetch HODs:', error)
  }
}

const debouncedSearch = () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value)
  searchTimeout.value = setTimeout(() => {
    fetchHODs()
  }, 400)
}

const fetchDepartments = async () => {
  loadingDepartments.value = true
  try {
    const response = await apiService.get('/admin/departments')

    // Backend returns: { success: true, message: "...", data: [departments] }
    if (response.data?.success && response.data?.data) {
      departments.value = response.data.data
    } else if (Array.isArray(response.data?.data)) {
      departments.value = response.data.data
    } else if (Array.isArray(response.data)) {
      departments.value = response.data
    } else {
      departments.value = []
    }
  } catch (error) {
    console.error('Failed to fetch departments:', error)
    departments.value = []
  } finally {
    loadingDepartments.value = false
  }
}

const fetchTeachers = async () => {
  try {
    const response = await apiService.get('/admin/teachers')

    // Backend returns: { success: true, message: "...", data: { teachers: [...] } }
    if (response.data?.success && response.data?.data?.teachers) {
      teachers.value = response.data.data.teachers
    } else if (Array.isArray(response.data?.data)) {
      teachers.value = response.data.data
    } else if (Array.isArray(response.data)) {
      teachers.value = response.data
    } else {
      teachers.value = []
    }
  } catch (error) {
    console.error('Failed to fetch teachers:', error)
    teachers.value = []
  }
}

const createHOD = async () => {
  try {
    const response = await apiService.post('/admin/hods', formData.value)

    if (response.data.success) {
      showCreateModal.value = false
      resetFormData()
      fetchHODs()
    } else {
      alert('Failed to create HOD: ' + (response.data.message || 'Unknown error'))
    }
  } catch (error: any) {
    console.error('Failed to create HOD:', error)

    let errorMessage = 'Unknown error'
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.response?.data) {
      errorMessage = JSON.stringify(error.response.data)
    } else if (error.message) {
      errorMessage = error.message
    }

    alert('Failed to create HOD: ' + errorMessage)
  }
}

const editHOD = async (hod: HOD) => {
  await fetchDepartments()
  editFormData.value = {
    id: hod.id,
    first_name: hod.first_name,
    last_name: hod.last_name,
    username: hod.username,
    email: hod.email,
    password: '',
    phone: hod.phone || '',
    department_id: hod.department_id.toString(),
    appointed_date: hod.appointed_date,
    is_active: hod.is_active ? 1 : 0
  }
  showEditModal.value = true
}

const updateHOD = async () => {
  try {
    const payload: any = {
      first_name: editFormData.value.first_name,
      last_name: editFormData.value.last_name,
      username: editFormData.value.username,
      email: editFormData.value.email,
      department_id: parseInt(editFormData.value.department_id),
      appointed_date: editFormData.value.appointed_date,
      is_active: editFormData.value.is_active
    }

    if (editFormData.value.phone) payload.phone = editFormData.value.phone
    if (editFormData.value.password) payload.password = editFormData.value.password

    const response = await apiService.put(`/admin/hods/${editFormData.value.id}`, payload)

    if (response.data.success) {
      showEditModal.value = false
      fetchHODs()
      alert('HOD updated successfully')
    } else {
      alert('Failed to update HOD: ' + (response.data.message || 'Unknown error'))
    }
  } catch (error: any) {
    console.error('Failed to update HOD:', error)
    let errorMessage = 'Unknown error'
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.message) {
      errorMessage = error.message
    }
    alert('Failed to update HOD: ' + errorMessage)
  }
}

const deassignHOD = async (id: number) => {
  if (confirm('Are you sure you want to remove the HOD role from this person? They will no longer be a Head of Department.')) {
    try {
      await apiService.post(`/admin/hods/${id}/deassign`, {})
      fetchHODs()
      alert('HOD de-assigned successfully')
    } catch (error: any) {
      console.error('Failed to de-assign HOD:', error)
      let errorMessage = 'Unknown error'
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      alert('Failed to de-assign HOD: ' + errorMessage)
    }
  }
}

const resetFormData = () => {
  formData.value = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    department_id: '',
    appointed_date: '',
    teacher_id: ''
  }
}

const resetAssignTeacherData = () => {
  assignTeacherData.value = {
    teacher_id: '',
    department_id: '',
    appointed_date: ''
  }
}

const openCreateModal = async () => {
  await fetchDepartments()
  showCreateModal.value = true
}

const openAssignTeacherModal = async () => {
  await fetchDepartments()
  await fetchAvailableTeachers()
  showAssignTeacherModal.value = true
}

const fetchAvailableTeachers = async () => {
  loadingTeachers.value = true
  try {
    const response = await apiService.get('/admin/hods/available-teachers', {})

    // Try different response structures
    if (response.data?.success && response.data?.data?.teachers) {
      availableTeachers.value = response.data.data.teachers
    } else if (response.data?.teachers) {
      availableTeachers.value = response.data.teachers
    } else if (Array.isArray(response.data)) {
      availableTeachers.value = response.data
    } else {
      availableTeachers.value = []
    }
  } catch (error) {
    console.error('Failed to fetch available teachers:', error)
    availableTeachers.value = []
  } finally {
    loadingTeachers.value = false
  }
}

const assignTeacherAsHOD = async () => {
  try {
    const response = await apiService.post('/admin/hods/assign-teacher', assignTeacherData.value)
    if (response.data.success) {
      showAssignTeacherModal.value = false
      resetAssignTeacherData()
      fetchHODs()
      alert('Teacher assigned as HOD successfully')
    } else {
      alert('Failed to assign teacher as HOD: ' + (response.data.message || 'Unknown error'))
    }
  } catch (error: any) {
    console.error('Failed to assign teacher as HOD:', error)
    let errorMessage = 'Unknown error'
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.message) {
      errorMessage = error.message
    }
    alert('Failed to assign teacher as HOD: ' + errorMessage)
  }
}

const getInitials = (firstName?: string | null, lastName?: string | null) => {
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`
  return initials ? initials.toUpperCase() : '?'
}

onMounted(() => {
  fetchHODs()
  fetchDepartments()
  fetchTeachers()
})
</script>
