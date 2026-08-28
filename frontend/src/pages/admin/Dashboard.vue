<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
      <div class="flex flex-wrap gap-3">
        <RouterLink
          to="/admin/assessments"
          class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
          title="See exactly what students see for any assessment school-wide"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          Preview as Student
        </RouterLink>
        <button
          @click="openViewEnrolledModal"
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          View Enrolled Students
        </button>
        <button
          @click="openEnrollModal"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Enroll Students
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">Total Enrollments</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ analytics.total_enrollments }}</p>
          </div>
          <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">Recent Enrollments (7 days)</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ analytics.recent_enrollments }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">Departments</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ analytics.by_department.length }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">Active Classes</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ analytics.by_class.length }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Analytics Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Enrollments by Department -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enrollments by Department</h3>
        <div class="h-64">
          <Bar v-if="!loadingAnalytics && analytics.by_department.length > 0" :data="departmentChartData" :options="chartOptions" />
          <div v-else-if="loadingAnalytics" class="flex items-center justify-center h-full text-gray-500">Loading...</div>
          <div v-else class="flex items-center justify-center h-full text-gray-500">No data available</div>
        </div>
      </div>

      <!-- Enrollments by Academic Year -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enrollments by Academic Year</h3>
        <div class="h-64">
          <Bar v-if="!loadingAnalytics && analytics.by_academic_year.length > 0" :data="yearChartData" :options="chartOptions" />
          <div v-else-if="loadingAnalytics" class="flex items-center justify-center h-full text-gray-500">Loading...</div>
          <div v-else class="flex items-center justify-center h-full text-gray-500">No data available</div>
        </div>
      </div>
    </div>

    <!-- Enrollments by Class -->
    <div class="card mb-8">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enrollments by Class</h3>
      <div class="h-64">
        <Bar v-if="!loadingAnalytics && analytics.by_class.length > 0" :data="classChartData" :options="chartOptions" />
        <div v-else-if="loadingAnalytics" class="flex items-center justify-center h-full text-gray-500">Loading...</div>
        <div v-else class="flex items-center justify-center h-full text-gray-500">No data available</div>
      </div>
    </div>
    <!-- View Enrolled Students Modal -->
    <div v-if="showViewEnrolledModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-2 sm:p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        <!-- Header -->
        <div class="bg-gradient-to-r from-green-600 to-teal-600 px-4 sm:px-6 py-4 sm:py-5 flex-shrink-0 rounded-t-2xl">
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0">
              <h2 class="text-lg sm:text-2xl font-bold text-white truncate">View Enrolled Students</h2>
              <p class="text-green-100 text-xs sm:text-sm mt-1 hidden sm:block">View students enrolled by department and academic year</p>
            </div>
            <button @click="showViewEnrolledModal = false" class="text-white/80 hover:text-white transition-colors flex-shrink-0 p-1 -m-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Filters -->
        <div class="p-4 sm:p-6 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900 space-y-3 flex-shrink-0">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
              <select
                v-model="viewFilters.department_id"
                @change="fetchEnrolledStudents"
                :disabled="loadingDepartments"
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-sm"
              >
                <option value="">All Departments</option>
                <option v-if="loadingDepartments" disabled>Loading departments...</option>
                <option v-else-if="departments.length === 0" disabled>No departments available</option>
                <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                  {{ dept.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Academic Year</label>
              <select
                v-model="viewFilters.academic_year_id"
                @change="fetchEnrolledStudents"
                :disabled="loadingAcademicYears"
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-sm"
              >
                <option value="">All Academic Years</option>
                <option v-if="loadingAcademicYears" disabled>Loading academic years...</option>
                <option v-else-if="academicYears.length === 0" disabled>No academic years available</option>
                <option v-for="year in academicYears" :key="year.id" :value="year.id">
                  {{ year.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Class</label>
              <select
                v-model="viewFilters.class_id"
                @change="fetchEnrolledStudents"
                :disabled="loadingClasses"
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-sm"
              >
                <option value="">All Classes</option>
                <option v-if="loadingClasses" disabled>Loading classes...</option>
                <option v-else-if="classes.length === 0" disabled>No classes available</option>
                <option v-for="cls in sortedClasses" :key="cls.id" :value="cls.id">
                  {{ cls.name }} ({{ cls.level }} - {{ cls.stream_name }})
                </option>
              </select>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <div class="relative flex-1 min-w-[200px]">
              <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 114 10.5a6.5 6.5 0 0113 0z"></path>
              </svg>
              <input
                v-model="viewSearch"
                type="text"
                placeholder="Search by name or admission number..."
                class="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 dark:text-white"
              >
            </div>
            <span v-if="!loadingEnrolled" class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {{ visibleEnrolledStudentsList.length }} of {{ enrolledStudentsList.length }} shown
            </span>
          </div>
        </div>

        <!-- Enrolled Students List -->
        <div class="flex-1 overflow-y-auto">
          <div v-if="loadingEnrolled" class="flex items-center justify-center h-64">
            <div class="text-gray-500 dark:text-gray-400 text-sm">Loading enrolled students...</div>
          </div>
          <div v-else-if="enrolledStudentsList.length === 0" class="flex items-center justify-center h-64 px-6 text-center">
            <div class="text-gray-500 dark:text-gray-400 text-sm">No enrolled students found for these filters</div>
          </div>
          <div v-else-if="visibleEnrolledStudentsList.length === 0" class="flex items-center justify-center h-64 px-6 text-center">
            <div class="text-gray-500 dark:text-gray-400 text-sm">No students match "{{ viewSearch }}"</div>
          </div>
          <template v-else>
            <!-- Desktop table -->
            <div class="hidden sm:block overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admission No</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Academic Year</th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="student in visibleEnrolledStudentsList" :key="student.enrollment_id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {{ student.first_name }} {{ student.last_name }}
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ student.admission_number }}
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ student.department_name || 'N/A' }}
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ student.class_name ? `${student.class_name} (${student.level} - ${student.stream_name || 'N/A'})` : 'N/A' }}
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ student.academic_year || 'N/A' }}
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <button
                        v-if="student.enrollment_id"
                        @click="deenrollSingleStudent(student.enrollment_id)"
                        class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      >
                        De-enroll
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mobile cards -->
            <div class="sm:hidden p-3 space-y-2">
              <div
                v-for="student in visibleEnrolledStudentsList"
                :key="student.enrollment_id"
                class="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800"
              >
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ student.first_name }} {{ student.last_name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ student.admission_number }}</p>
                  </div>
                  <button
                    v-if="student.enrollment_id"
                    @click="deenrollSingleStudent(student.enrollment_id)"
                    class="flex-shrink-0 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 border border-red-200 dark:border-red-900/50 rounded-full px-2.5 py-1"
                  >
                    De-enroll
                  </button>
                </div>
                <div class="mt-2 flex flex-wrap gap-1.5">
                  <span class="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                    {{ student.department_name || 'N/A' }}
                  </span>
                  <span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {{ student.class_name ? `${student.class_name} (${student.stream_name || 'N/A'})` : 'N/A' }}
                  </span>
                  <span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {{ student.academic_year || 'N/A' }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Footer -->
        <div class="px-4 sm:px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-end flex-shrink-0 rounded-b-2xl">
          <button
            @click="showViewEnrolledModal = false"
            class="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Enroll Students Modal -->
    <div v-if="showEnrollModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-2 sm:p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 sm:px-6 py-4 sm:py-5 flex-shrink-0 rounded-t-2xl">
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0">
              <h2 class="text-lg sm:text-2xl font-bold text-white truncate">Enroll Students in Departments</h2>
              <p class="text-indigo-100 text-xs sm:text-sm mt-1 hidden sm:block">Assign students to their respective departments</p>
            </div>
            <button @click="showEnrollModal = false" class="text-white/80 hover:text-white transition-colors flex-shrink-0 p-1 -m-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="enrollStudents" class="flex-1 flex flex-col min-h-0">
          <!-- Form Content -->
          <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 min-h-0">
            <!-- Department / Academic Year / Class Selection -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- Department Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department <span class="text-red-500">*</span></label>
              <select
                v-model="enrollData.department_id"
                @change="filterStudentsByDepartment"
                :disabled="loadingDepartments"
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-sm"
              >
                <option value="">Select Department</option>
                <option value="__all__">Enroll in All Compulsory Departments</option>
                <option v-if="loadingDepartments" disabled>Loading departments...</option>
                <option v-else-if="departments.length === 0" disabled>No departments available</option>
                <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                  {{ dept.name }}
                </option>
              </select>
            </div>

            <!-- Academic Year Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Academic Year <span class="text-red-500">*</span></label>
              <select
                v-model="enrollData.academic_year_id"
                @change="filterStudentsByDepartment"
                :disabled="loadingAcademicYears"
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-sm"
              >
                <option value="">Select Academic Year</option>
                <option v-if="loadingAcademicYears" disabled>Loading academic years...</option>
                <option v-else-if="academicYears.length === 0" disabled>No academic years available</option>
                <option v-for="year in academicYears" :key="year.id" :value="year.id">
                  {{ year.name }}
                </option>
              </select>
            </div>

            <!-- Class Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Class <span class="text-red-500">*</span></label>
              <select
                v-model="enrollData.class_id"
                @change="filterStudentsByDepartment"
                :disabled="loadingClasses"
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-sm"
              >
                <option value="">Select Class</option>
                <option v-if="loadingClasses" disabled>Loading classes...</option>
                <option v-else-if="classes.length === 0" disabled>No classes available</option>
                <option v-for="cls in sortedClasses" :key="cls.id" :value="cls.id">
                  {{ cls.name }} ({{ cls.level }} - {{ cls.stream_name }})
                </option>
              </select>
            </div>
            </div>
            <p v-if="enrollData.department_id === '__all__'" class="text-xs text-indigo-600 dark:text-indigo-400 -mt-2">
              {{ selectedClassLevel === 'A Level' ? 'A Level: enrolls in GP.' : 'O Level: enrolls in MTC, BIO, CHEM, PHY, HIST, GEOG, and ENG.' }}
              <span v-if="!selectedClassLevel">Select a class below to see which departments apply.</span>
            </p>

            <!-- Student Selection -->
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Students <span class="text-red-500">*</span>
                  <span v-if="enrollData.student_ids.length > 0" class="ml-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                    ({{ enrollData.student_ids.length }} selected)
                  </span>
                </label>
                <span v-if="filteredStudents.length > 0" class="text-xs text-gray-500 dark:text-gray-400">
                  {{ visibleStudents.length }} of {{ filteredStudents.length }} shown
                </span>
              </div>

              <!-- Search -->
              <div v-if="filteredStudents.length > 0" class="relative mb-2">
                <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 114 10.5a6.5 6.5 0 0113 0z"></path>
                </svg>
                <input
                  v-model="studentSearch"
                  type="text"
                  placeholder="Search by name or admission number..."
                  class="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white"
                >
              </div>

              <div class="border border-gray-300 dark:border-gray-600 rounded-lg max-h-56 sm:max-h-64 overflow-y-auto">
                <div v-if="loadingStudentsForClass" class="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                  Loading students...
                </div>
                <div v-else class="p-2 space-y-1">
                  <label v-if="visibleStudents.length > 0" class="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer border-b dark:border-gray-600">
                    <input
                      type="checkbox"
                      @change="toggleSelectAll"
                      :checked="allStudentsSelected"
                      class="w-4 h-4 text-indigo-600 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500"
                    >
                    <span class="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Select All</span>
                  </label>
                  <label
                    v-for="student in visibleStudents"
                    :key="student.id"
                    class="flex items-center justify-between gap-2 p-2 rounded cursor-pointer"
                    :class="enrolledStudentIds.includes(student.id) ? 'opacity-70' : 'hover:bg-gray-50 dark:hover:bg-gray-700'"
                  >
                    <div class="flex items-center min-w-0">
                      <input
                        type="checkbox"
                        :value="student.id"
                        v-model="enrollData.student_ids"
                        :disabled="enrolledStudentIds.includes(student.id)"
                        class="w-4 h-4 flex-shrink-0 text-indigo-600 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                      <span class="ml-3 text-sm text-gray-700 dark:text-gray-300 truncate" :class="{'text-gray-400 dark:text-gray-500': enrolledStudentIds.includes(student.id)}">{{ student.first_name }} {{ student.last_name }} ({{ student.admission_number }})</span>
                    </div>
                    <span
                      v-if="enrolledStudentIds.includes(student.id)"
                      class="flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                      :class="isEnrolledInSelectedClass(student.id)
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'"
                    >
                      {{ enrollmentBadgeText(student.id) }}
                    </span>
                  </label>
                  <p v-if="!loadingStudentsForClass && filteredStudents.length > 0 && visibleStudents.length === 0" class="text-sm text-gray-500 dark:text-gray-400 text-center py-3">
                    No students match "{{ studentSearch }}"
                  </p>
                </div>
              </div>
              <p v-if="!loadingStudentsForClass && filteredStudents.length === 0" class="text-sm text-gray-500 dark:text-gray-400 mt-2">No students available for this class</p>
            </div>

            <!-- De-enroll Section -->
            <div v-if="enrolledStudents.length > 0" class="border-t dark:border-gray-700 pt-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">De-enroll Students</label>
              <div class="border border-gray-300 dark:border-gray-600 rounded-lg max-h-40 sm:max-h-48 overflow-y-auto">
                <div class="p-2 space-y-1">
                  <label class="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer border-b dark:border-gray-600">
                    <input
                      type="checkbox"
                      @change="toggleSelectAllDeenroll"
                      :checked="allEnrolledSelected"
                      class="w-4 h-4 text-red-600 border-gray-300 dark:border-gray-600 rounded focus:ring-red-500"
                    >
                    <span class="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Select All</span>
                  </label>
                  <label v-for="student in enrolledStudents" :key="student.id" class="flex items-center justify-between gap-2 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded cursor-pointer">
                    <div class="flex items-center min-w-0">
                      <input
                        type="checkbox"
                        :value="student.id"
                        v-model="deenrollData.student_ids"
                        class="w-4 h-4 flex-shrink-0 text-red-600 border-gray-300 dark:border-gray-600 rounded focus:ring-red-500"
                      >
                      <span class="ml-3 text-sm text-gray-700 dark:text-gray-300 truncate">{{ student.first_name }} {{ student.last_name }} ({{ student.admission_number }})</span>
                    </div>
                    <span class="flex-shrink-0 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {{ [student.class_name, student.stream_name].filter(Boolean).join(' - ') || student.academic_year }}
                    </span>
                  </label>
                </div>
              </div>
              <button
                type="button"
                @click="deenrollStudents"
                :disabled="deenrollData.student_ids.length === 0"
                class="mt-2 w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-sm font-medium"
              >
                De-enroll Selected ({{ deenrollData.student_ids.length }})
              </button>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-4 sm:px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-3 flex-shrink-0 rounded-b-2xl">
            <button
              type="button"
              @click="showEnrollModal = false"
              class="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="enrollData.student_ids.length === 0"
              class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Enroll Students{{ enrollData.student_ids.length > 0 ? ` (${enrollData.student_ids.length})` : '' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import apiService from '@/services/api'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

interface Department {
  id: number
  name: string
}

interface AcademicYear {
  id: number
  name: string
}

interface Class {
  id: number
  name: string
  level: string
  academic_year_id: number
  stream_name: string
}

interface Student {
  id: number
  enrollment_id?: number
  student_id?: number
  first_name: string
  last_name: string
  admission_number: string
  department_id?: number
  department_name?: string
  academic_year?: string
  enrolled_at?: string
  class_id?: number
  class_name?: string
  level?: string
  stream_name?: string
}

const showEnrollModal = ref(false)
const showViewEnrolledModal = ref(false)
const loadingDepartments = ref(false)
const loadingAcademicYears = ref(false)
const loadingClasses = ref(false)
const loadingEnrolled = ref(false)
const loadingStudentsForClass = ref(false)
const loadingAnalytics = ref(false)
const departments = ref<Department[]>([])
const academicYears = ref<AcademicYear[]>([])
const classes = ref<Class[]>([])
// Ordered S.1..S.6 (numeric, so "S.10" would still sort after "S.2"), then alphabetically by
// stream within each class - e.g. S.1 A, S.1 B, ... S.1 W, S.2 A, ...
const sortedClasses = computed(() => {
  return [...classes.value].sort((a, b) => {
    const numA = parseInt(a.name.replace(/\D/g, ''), 10) || 0
    const numB = parseInt(b.name.replace(/\D/g, ''), 10) || 0
    if (numA !== numB) return numA - numB
    return (a.stream_name || '').localeCompare(b.stream_name || '')
  })
})
const students = ref<Student[]>([])
const filteredStudents = ref<Student[]>([])
const enrolledStudents = ref<Student[]>([])
const enrolledStudentsList = ref<Student[]>([])
const enrolledStudentIds = ref<number[]>([])
// Keyed by student_id, holds the class/stream that student is currently enrolled under for the
// selected department + academic year - lets the modal tell "already in this exact stream" apart
// from "enrolled in the department, but under a different stream" (a real case after promotions).
const enrolledStudentDetails = ref<Record<number, { class_id: number | null; class_name: string | null; stream_name: string | null }>>({})
const studentSearch = ref('')

// Analytics data
const analytics = ref({
  total_enrollments: 0,
  recent_enrollments: 0,
  by_department: [] as any[],
  by_academic_year: [] as any[],
  by_class: [] as any[]
})

const enrollData = ref({
  department_id: '' as string | number,
  academic_year_id: '',
  class_id: '',
  student_ids: [] as number[]
})

const selectedClassLevel = computed(() => {
  const cls = classes.value.find(c => c.id === Number(enrollData.value.class_id))
  return cls?.level || ''
})

const deenrollData = ref({
  student_ids: [] as number[]
})

const viewFilters = ref({
  department_id: '',
  academic_year_id: '',
  class_id: ''
})
const viewSearch = ref('')

const visibleEnrolledStudentsList = computed(() => {
  const q = viewSearch.value.trim().toLowerCase()
  if (!q) return enrolledStudentsList.value
  return enrolledStudentsList.value.filter(s =>
    `${s.first_name} ${s.last_name}`.toLowerCase().includes(q) ||
    s.admission_number.toLowerCase().includes(q)
  )
})

const fetchDepartments = async () => {
  loadingDepartments.value = true
  try {
    const response = await apiService.get('/admin/departments')
    if (response.data?.success && response.data?.data) {
      departments.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to fetch departments:', error)
  } finally {
    loadingDepartments.value = false
  }
}

const fetchAcademicYears = async () => {
  loadingAcademicYears.value = true
  try {
    const response = await apiService.get('/admin/academic-years')
    if (response.data?.success && response.data?.data) {
      academicYears.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to fetch academic years:', error)
  } finally {
    loadingAcademicYears.value = false
  }
}

const fetchClasses = async () => {
  loadingClasses.value = true
  try {
    const response = await apiService.get('/admin/classes')
    if (response.data?.success && response.data?.data) {
      classes.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to fetch classes:', error)
  } finally {
    loadingClasses.value = false
  }
}

const fetchAnalytics = async () => {
  loadingAnalytics.value = true
  try {
    const response = await apiService.get('/admin/students/analytics')
    if (response.data?.success && response.data?.data) {
      analytics.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to fetch analytics:', error)
  } finally {
    loadingAnalytics.value = false
  }
}

// Loads only the students who actually belong to the given class - the enroll modal must never
// show/allow-selecting students from other classes. limit=500 comfortably covers the largest
// class (S.5 A currently has 175 students).
const fetchStudentsForClass = async (classId: number) => {
  try {
    const response = await apiService.get('/admin/students', { params: { class_id: classId, limit: 500 } })
    if (response.data?.success && response.data?.data?.students) {
      students.value = response.data.data.students
    } else {
      students.value = []
    }
  } catch (error) {
    console.error('Failed to fetch students for class:', error)
    students.value = []
  }
}

const filterStudentsByDepartment = async () => {
  if (!enrollData.value.class_id) {
    students.value = []
    filteredStudents.value = []
    enrolledStudentIds.value = []
    enrolledStudentDetails.value = {}
    enrolledStudents.value = []
    return
  }

  loadingStudentsForClass.value = true
  await fetchStudentsForClass(Number(enrollData.value.class_id))
  loadingStudentsForClass.value = false

  if (!enrollData.value.department_id || !enrollData.value.academic_year_id) {
    filteredStudents.value = students.value
    enrolledStudentIds.value = []
    enrolledStudentDetails.value = {}
    enrolledStudents.value = []
    return
  }

  // "Enroll in All Compulsory Departments" spans several departments at once - there's no
  // single department to check "already enrolled" against, so just show this class's students.
  if (enrollData.value.department_id === '__all__') {
    filteredStudents.value = students.value
    enrolledStudentIds.value = []
    enrolledStudentDetails.value = {}
    enrolledStudents.value = []
    return
  }

  // Fetch already enrolled students for this department and academic year, so the same student
  // can't be enrolled twice into the same department (their checkbox gets disabled below).
  try {
    // Deliberately not scoped by class_id here - the backend's duplicate check
    // (student + department + academic_year) ignores class_id too, so this must match it
    // exactly or a student enrolled under a different class_id would wrongly look available.
    const response = await apiService.get('/admin/students/enrolled', {
      params: {
        department_id: enrollData.value.department_id,
        academic_year_id: enrollData.value.academic_year_id
      }
    })

    if (response.data?.success && response.data?.data) {
      enrolledStudentIds.value = response.data.data.map((s: any) => s.student_id)

      const details: Record<number, { class_id: number | null; class_name: string | null; stream_name: string | null }> = {}
      for (const s of response.data.data) {
        details[s.student_id] = { class_id: s.class_id ?? null, class_name: s.class_name ?? null, stream_name: s.stream_name ?? null }
      }
      enrolledStudentDetails.value = details

      // Show this class's students, but track which are already enrolled in this department
      filteredStudents.value = students.value

      enrolledStudents.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to fetch enrolled students:', error)
    filteredStudents.value = students.value
    enrolledStudentIds.value = []
    enrolledStudentDetails.value = {}
  }
}

// True only when the enrolled record's own class_id matches the class currently selected in the
// modal - distinguishes "already in this exact stream" from "enrolled under a different stream".
const isEnrolledInSelectedClass = (studentId: number): boolean => {
  const detail = enrolledStudentDetails.value[studentId]
  if (!detail) return false
  return detail.class_id === Number(enrollData.value.class_id)
}

const enrollmentBadgeText = (studentId: number): string => {
  const detail = enrolledStudentDetails.value[studentId]
  if (!detail) return 'Enrolled'
  if (isEnrolledInSelectedClass(studentId)) return 'Enrolled'
  const label = [detail.class_name, detail.stream_name].filter(Boolean).join(' - ')
  return label ? `Enrolled in ${label}` : 'Enrolled elsewhere'
}

const visibleStudents = computed(() => {
  const q = studentSearch.value.trim().toLowerCase()
  if (!q) return filteredStudents.value
  return filteredStudents.value.filter(s =>
    `${s.first_name} ${s.last_name}`.toLowerCase().includes(q) ||
    s.admission_number.toLowerCase().includes(q)
  )
})

// Students that can actually be enrolled right now - excludes anyone already enrolled in the
// selected department for this academic year, so "Select All" and the count never include them.
// Scoped to the current search text too, so "Select All" only selects what's visible.
const selectableStudents = computed(() => {
  return visibleStudents.value.filter(s => !enrolledStudentIds.value.includes(s.id))
})

const allStudentsSelected = computed(() => {
  return selectableStudents.value.length > 0 &&
         enrollData.value.student_ids.length === selectableStudents.value.length
})

const toggleSelectAll = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.checked) {
    enrollData.value.student_ids = selectableStudents.value.map(s => s.id)
  } else {
    enrollData.value.student_ids = []
  }
}

const allEnrolledSelected = computed(() => {
  return enrolledStudents.value.length > 0 && 
         deenrollData.value.student_ids.length === enrolledStudents.value.length
})

const toggleSelectAllDeenroll = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.checked) {
    deenrollData.value.student_ids = enrolledStudents.value.map(s => s.id)
  } else {
    deenrollData.value.student_ids = []
  }
}

const openEnrollModal = async () => {
  // Reset so a class must be explicitly (re-)selected each time - never carries over the
  // previous session's students or selections.
  enrollData.value = { department_id: '', academic_year_id: '', class_id: '', student_ids: [] }
  students.value = []
  filteredStudents.value = []
  enrolledStudentIds.value = []
  enrolledStudentDetails.value = {}
  enrolledStudents.value = []
  studentSearch.value = ''

  await fetchDepartments()
  await fetchAcademicYears()
  await fetchClasses()
  showEnrollModal.value = true
}

const openViewEnrolledModal = async () => {
  viewFilters.value = { department_id: '', academic_year_id: '', class_id: '' }
  viewSearch.value = ''
  await fetchDepartments()
  await fetchAcademicYears()
  await fetchClasses()
  await fetchEnrolledStudents()
  showViewEnrolledModal.value = true
}

const fetchEnrolledStudents = async () => {
  loadingEnrolled.value = true
  try {
    const params: any = {}
    if (viewFilters.value.department_id) {
      params.department_id = viewFilters.value.department_id
    }
    if (viewFilters.value.academic_year_id) {
      params.academic_year_id = viewFilters.value.academic_year_id
    }
    if (viewFilters.value.class_id) {
      params.class_id = viewFilters.value.class_id
    }
    
    console.log('Fetching enrolled students with params:', params)
    const response = await apiService.get('/admin/students/enrolled', { params })
    console.log('Enrolled students response:', response.data)
    
    if (response.data?.success && response.data?.data) {
      enrolledStudentsList.value = response.data.data
      console.log('Enrolled students list set:', enrolledStudentsList.value)
    }
  } catch (error) {
    console.error('Failed to fetch enrolled students:', error)
  } finally {
    loadingEnrolled.value = false
  }
}

const deenrollSingleStudent = async (enrollmentId: number) => {
  if (!confirm('Are you sure you want to de-enroll this student from this department?')) return
  
  try {
    const response = await apiService.post('/admin/students/deenroll-single', { enrollment_id: enrollmentId })
    if (response.data.success) {
      await fetchEnrolledStudents()
      alert('Student de-enrolled successfully')
    } else {
      alert('Failed to de-enroll student: ' + (response.data.message || 'Unknown error'))
    }
  } catch (error: any) {
    console.error('Failed to de-enroll student:', error)
    let errorMessage = 'Unknown error'
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.message) {
      errorMessage = error.message
    }
    alert('Failed to de-enroll student: ' + errorMessage)
  }
}

const enrollStudents = async () => {
  try {
    console.log('Enroll data being sent:', enrollData.value)
    
    // Validate before sending
    if (!enrollData.value.department_id) {
      alert('Please select a department')
      return
    }
    if (!enrollData.value.academic_year_id) {
      alert('Please select an academic year')
      return
    }
    if (!enrollData.value.class_id) {
      alert('Please select a class')
      return
    }
    if (!enrollData.value.student_ids || enrollData.value.student_ids.length === 0) {
      alert('Please select at least one student')
      return
    }
    
    const isAllDepartments = enrollData.value.department_id === '__all__'
    const endpoint = isAllDepartments ? '/admin/students/enroll-all-departments' : '/admin/students/enroll'
    const payload = isAllDepartments
      ? {
          academic_year_id: enrollData.value.academic_year_id,
          class_id: enrollData.value.class_id,
          student_ids: enrollData.value.student_ids
        }
      : enrollData.value

    const response = await apiService.post(endpoint, payload)
    if (response.data.success) {
      enrollData.value.student_ids = []
      await filterStudentsByDepartment()
      alert(response.data.message || 'Students enrolled successfully')
    } else {
      alert('Failed to enroll students: ' + (response.data.message || 'Unknown error'))
    }
  } catch (error: any) {
    console.error('Failed to enroll students:', error)
    console.error('Error response:', error.response?.data)
    let errorMessage = 'Unknown error'
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.response?.data?.errors) {
      errorMessage = JSON.stringify(error.response.data.errors)
    } else if (error.message) {
      errorMessage = error.message
    }
    alert('Failed to enroll students: ' + errorMessage)
  }
}

const deenrollStudents = async () => {
  if (deenrollData.value.student_ids.length === 0) return
  
  try {
    // Scoped to the department+year currently shown in the de-enroll list below - without this
    // the backend would close every department's enrollment for these students, not just this one.
    const response = await apiService.post('/admin/students/deenroll', {
      student_ids: deenrollData.value.student_ids,
      department_id: enrollData.value.department_id,
      academic_year_id: enrollData.value.academic_year_id
    })
    if (response.data.success) {
      deenrollData.value.student_ids = []
      await filterStudentsByDepartment()
      alert('Students de-enrolled successfully')
    } else {
      alert('Failed to de-enroll students: ' + (response.data.message || 'Unknown error'))
    }
  } catch (error: any) {
    console.error('Failed to de-enroll students:', error)
    let errorMessage = 'Unknown error'
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.message) {
      errorMessage = error.message
    }
    alert('Failed to de-enroll students: ' + errorMessage)
  }
}

// Chart data
const departmentChartData = computed(() => ({
  labels: analytics.value.by_department.map((d: any) => d.department),
  datasets: [{
    label: 'Enrollments',
    data: analytics.value.by_department.map((d: any) => d.count),
    backgroundColor: [
      'rgba(99, 102, 241, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(139, 92, 246, 0.8)',
    ],
    borderColor: [
      'rgba(99, 102, 241, 1)',
      'rgba(16, 185, 129, 1)',
      'rgba(245, 158, 11, 1)',
      'rgba(239, 68, 68, 1)',
      'rgba(139, 92, 246, 1)',
    ],
    borderWidth: 1
  }]
}))

const yearChartData = computed(() => ({
  labels: analytics.value.by_academic_year.map((y: any) => y.academic_year),
  datasets: [{
    label: 'Enrollments',
    data: analytics.value.by_academic_year.map((y: any) => y.count),
    backgroundColor: 'rgba(99, 102, 241, 0.8)',
    borderColor: 'rgba(99, 102, 241, 1)',
    borderWidth: 1
  }]
}))

const classChartData = computed(() => ({
  labels: analytics.value.by_class.map((c: any) => c.stream_name ? `${c.class_name} ${c.stream_name}` : c.class_name),
  datasets: [{
    label: 'Enrollments',
    data: analytics.value.by_class.map((c: any) => c.count),
    backgroundColor: [
      'rgba(99, 102, 241, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(236, 72, 153, 0.8)',
    ],
    borderColor: [
      'rgba(99, 102, 241, 1)',
      'rgba(16, 185, 129, 1)',
      'rgba(245, 158, 11, 1)',
      'rgba(239, 68, 68, 1)',
      'rgba(139, 92, 246, 1)',
      'rgba(236, 72, 153, 1)',
    ],
    borderWidth: 1
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0
      }
    }
  }
}

onMounted(() => {
  fetchAnalytics()
})
</script>

