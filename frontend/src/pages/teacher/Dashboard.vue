<template>
  <div>
    <!-- The topbar already shows this teacher's name and photo, so this line is just a quick
         personal greeting rather than a redundant "Teacher Dashboard" title + icon badge. The
         department strip sits in the same row (rather than stacked below) so both fit on one
         line instead of using two. -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <h1 class="text-xl font-bold text-gray-900 dark:text-white">{{ greeting }}, {{ authStore.userName }}</h1>

      <!-- Department Info - a slim identity strip rather than a full hero card, since it's just
           context (which department this data belongs to), not a headline number. "View Enrolled
           Students" lives here as a compact link instead of its own header button, and "Preview as
           Student" was dropped entirely - it's already one click away in the sidebar. -->
      <div v-if="analytics.department" class="hidden sm:flex flex-wrap items-center gap-x-3 gap-y-1.5 bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm">
        <span class="font-semibold">{{ analytics.department.name }}</span>
        <span class="text-indigo-200 truncate">{{ analytics.department.code }} &middot; {{ analytics.department.description }}</span>

        <!-- Department switcher - only shown when the teacher belongs to more than one -->
        <select
          v-if="myDepartments.length > 1"
          :value="activeDepartmentId"
          @change="switchDepartment(($event.target as HTMLSelectElement).value)"
          :disabled="switchingDepartment"
          class="text-xs rounded-md bg-white/20 border border-white/30 text-white px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
        >
          <option v-for="dept in myDepartments" :key="dept.id" :value="dept.id" class="text-gray-900">
            {{ dept.name }}{{ dept.is_primary ? ' (Primary)' : '' }}
          </option>
        </select>

        <button
          @click="openViewEnrolledModal"
          class="text-xs font-semibold text-white/90 hover:text-white hover:underline underline-offset-2 flex-shrink-0"
        >
          View Enrolled Students
        </button>
      </div>
    </div>

    <!-- Quick Access - the fast path into a teacher's most-used modules, front and centre so
         there's no need to hunt through the sidebar for them. One color throughout (rather than
         a different hue per tile) keeps this section calm since it's pure navigation, not a set
         of distinct statuses worth color-coding. -->
    <div class="mb-6">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <QuickLink to="/teacher/classes" label="My Classes" icon="classes" color="indigo" />
        <QuickLink to="/teacher/live-classes" label="Live Classes" icon="live" color="indigo" />
        <QuickLink to="/teacher/enotes" label="eNotes" icon="notes" color="indigo" />
        <QuickLink to="/teacher/library" label="eLibrary" icon="library" color="indigo" />
        <QuickLink to="/teacher/itembank" label="Item Bank" icon="itembank" color="indigo" />
        <QuickLink to="/teacher/assignments" label="Assessments" icon="check" color="indigo" />
        <QuickLink to="/teacher/reports" label="Reports" icon="reports" color="indigo" />
        <QuickLink to="/teacher/chat" label="Chats" icon="chat" color="indigo" />
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <RouterLink to="/teacher/classes" class="group card !p-4 sm:!p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700 border border-transparent">
        <div class="flex items-center justify-between">
          <template v-if="loadingAnalytics">
            <div class="flex-1">
              <div class="h-3.5 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
              <div class="h-7 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex-shrink-0"></div>
          </template>
          <template v-else>
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Total Enrollments</p>
              <p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{{ analytics.total_enrollments }}</p>
            </div>
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </template>
        </div>
      </RouterLink>
      <!-- Hidden below sm: a 7-day trend is a secondary metric compared to the totals, not
           worth the space on a small screen. -->
      <RouterLink to="/teacher/classes" class="hidden sm:block group card !p-4 sm:!p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700 border border-transparent">
        <div class="flex items-center justify-between">
          <template v-if="loadingAnalytics">
            <div class="flex-1">
              <div class="h-3.5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
              <div class="h-7 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex-shrink-0"></div>
          </template>
          <template v-else>
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Recent (7 days)</p>
              <p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{{ analytics.recent_enrollments }}</p>
            </div>
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
          </template>
        </div>
      </RouterLink>
      <RouterLink to="/teacher/classes" class="group card !p-4 sm:!p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700 border border-transparent">
        <div class="flex items-center justify-between">
          <template v-if="loadingAnalytics">
            <div class="flex-1">
              <div class="h-3.5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
              <div class="h-7 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex-shrink-0"></div>
          </template>
          <template v-else>
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Classes</p>
              <p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{{ uniqueClassCount }}</p>
            </div>
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
          </template>
        </div>
      </RouterLink>
      <!-- Hidden below sm: the same information at finer granularity than "Classes" above -
           not worth doubling up on a small screen. -->
      <RouterLink to="/teacher/classes" class="hidden sm:block group card !p-4 sm:!p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700 border border-transparent">
        <div class="flex items-center justify-between">
          <template v-if="loadingAnalytics">
            <div class="flex-1">
              <div class="h-3.5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
              <div class="h-7 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex-shrink-0"></div>
          </template>
          <template v-else>
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Class-Streams</p>
              <p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{{ analytics.by_class.length }}</p>
            </div>
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
          </template>
        </div>
      </RouterLink>
    </div>

    <!-- Enrollment by Stream -->
    <div class="card mb-8">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1 flex items-center">
        <span class="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center mr-2.5 flex-shrink-0">
          <svg class="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </span>
        Enrollment by Stream
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 ml-[42px]">How your students are distributed across each class-stream</p>
      <div class="h-72">
        <Bar v-if="!loadingAnalytics && analytics.by_class.length > 0" :data="classChartData" :options="chartOptions" />
        <div v-else-if="loadingAnalytics" class="flex items-center justify-center h-full text-gray-500">Loading...</div>
        <div v-else class="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500 gap-2">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p class="text-sm">No enrollment data available yet</p>
        </div>
      </div>
    </div>

    <!-- Analytics Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Enrollment by Year -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1 flex items-center">
          <span class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mr-2.5 flex-shrink-0">
            <svg class="w-4.5 h-4.5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </span>
          Enrollment by Year
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 ml-[42px]">Enrollment trend across academic years</p>
        <div class="h-64">
          <Bar v-if="!loadingAnalytics && analytics.by_academic_year.length > 0" :data="yearChartData" :options="chartOptions" />
          <div v-else-if="loadingAnalytics" class="flex items-center justify-center h-full text-gray-500">Loading...</div>
          <div v-else class="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500 gap-2">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-sm">No data available</p>
          </div>
        </div>
      </div>

      <!-- Gender Distribution -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1 flex items-center">
          <span class="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mr-2.5 flex-shrink-0">
            <svg class="w-4.5 h-4.5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </span>
          Gender Distribution
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 ml-[42px]">Breakdown of enrolled students by gender</p>
        <div class="h-64">
          <Doughnut v-if="!loadingAnalytics && hasGenderData" :data="genderChartData" :options="doughnutOptions" />
          <div v-else-if="loadingAnalytics" class="flex items-center justify-center h-full text-gray-500">Loading...</div>
          <div v-else class="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500 gap-2">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p class="text-sm">No data available</p>
          </div>
        </div>
      </div>
    </div>

    <!-- View Enrolled Students Modal -->
    <div v-if="showViewEnrolledModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <!-- Header -->
        <div class="bg-green-600 px-6 py-5 flex-shrink-0">
          <div class="flex items-center justify-between gap-4">
            <div class="min-w-0">
              <h2 class="text-xl sm:text-2xl font-bold text-white truncate">Enrolled Students in {{ analytics.department?.name }}</h2>
              <p class="text-green-100 text-sm mt-1">View students enrolled in your department</p>
            </div>
            <button @click="showViewEnrolledModal = false" class="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-colors flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Filters -->
        <div class="p-6 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-950">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Academic Year</label>
              <select
                v-model="viewFilters.academic_year"
                @change="fetchEnrolledStudents"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Academic Years</option>
                <option v-for="year in analytics.by_academic_year" :key="year.academic_year" :value="year.academic_year">
                  {{ year.academic_year }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Class</label>
              <select
                v-model="viewFilters.class_id"
                @change="fetchEnrolledStudents"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Classes</option>
                <option v-for="cls in analytics.by_class" :key="cls.class_name" :value="cls.class_name">
                  {{ cls.class_name }} ({{ cls.level }} - {{ cls.stream_name }})
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stream</label>
              <select
                v-model="viewFilters.stream_name"
                @change="fetchEnrolledStudents"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Streams</option>
                <option v-for="stream in analytics.by_stream" :key="stream.stream_name" :value="stream.stream_name">
                  {{ stream.stream_name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Enrolled Students Table -->
        <div class="flex-1 overflow-y-auto">
          <div v-if="loadingEnrolled" class="flex items-center justify-center h-64">
            <div class="text-gray-500 dark:text-gray-400">Loading enrolled students...</div>
          </div>
          <div v-else-if="enrolledStudentsList.length === 0" class="flex items-center justify-center h-64">
            <div class="text-gray-500 dark:text-gray-400">No enrolled students found</div>
          </div>
          <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-950">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admission No</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stream</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Academic Year</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="student in enrolledStudentsList" :key="student.enrollment_id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {{ student.first_name }} {{ student.last_name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ student.admission_number }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ student.department_name || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ student.class_name || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ student.stream_name || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ student.academic_year || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    @click="deEnrollStudent(student.enrollment_id, student.first_name, student.last_name)"
                    class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                  >
                    De-enroll
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700 flex justify-end flex-shrink-0">
          <button
            @click="showViewEnrolledModal = false"
            class="btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Bar, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
import apiService from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import QuickLink from '@/components/dashboard/QuickLink.vue'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

const toast = useToastStore()
const confirmDialog = useConfirmStore()

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const authStore = useAuthStore()

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
})

const loadingAnalytics = ref(false)
const loadingEnrolled = ref(false)
const showViewEnrolledModal = ref(false)

const myDepartments = ref<{ id: number; name: string; code: string; is_primary: boolean }[]>([])
const activeDepartmentId = ref<number | null>(null)
const switchingDepartment = ref(false)

const analytics = ref({
  total_enrollments: 0,
  recent_enrollments: 0,
  by_class: [] as any[],
  by_academic_year: [] as any[],
  by_stream: [] as any[],
  by_gender: {
    male: 0,
    female: 0,
    other: 0
  },
  department: null as any
})

const enrolledStudentsList = ref<any[]>([])

const viewFilters = ref({
  academic_year: '',
  class_id: '',
  stream_name: ''
})

const hasGenderData = computed(() => {
  const { male, female, other } = analytics.value.by_gender
  return male + female + other > 0
})

// Chart data
const classChartData = computed(() => ({
  labels: analytics.value.by_class.map((c: any) => c.stream_name ? `${c.class_name} ${c.stream_name}` : c.class_name),
  datasets: [{
    label: 'Students',
    data: analytics.value.by_class.map((c: any) => c.count),
    backgroundColor: '#6366F1',
    borderRadius: 8
  }]
}))

const uniqueClassCount = computed(() => new Set(analytics.value.by_class.map((c: any) => c.class_name)).size)

const yearChartData = computed(() => ({
  labels: analytics.value.by_academic_year.map((y: any) => y.academic_year),
  datasets: [{
    label: 'Students',
    data: analytics.value.by_academic_year.map((y: any) => y.count),
    backgroundColor: '#10B981',
    borderRadius: 8
  }]
}))

const genderChartData = computed(() => ({
  labels: ['Male', 'Female', 'Other'],
  datasets: [{
    data: [analytics.value.by_gender.male, analytics.value.by_gender.female, analytics.value.by_gender.other],
    backgroundColor: ['#3B82F6', '#EC4899', '#6B7280'],
    borderWidth: 0
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
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.05)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const
    }
  }
}

const loadAnalytics = async () => {
  loadingAnalytics.value = true
  try {
    const response = await apiService.get('/teacher/dashboard')
    if (response.data?.success && response.data?.data) {
      analytics.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to load analytics:', error)
  } finally {
    loadingAnalytics.value = false
  }
}

const loadMyDepartments = async () => {
  try {
    const response = await apiService.get('/teacher/departments')
    if (response.data?.success) {
      myDepartments.value = response.data.data.departments || []
      activeDepartmentId.value = response.data.data.active_department_id
    }
  } catch (error) {
    console.error('Failed to load departments:', error)
  }
}

const switchDepartment = async (departmentId: string) => {
  const id = Number(departmentId)
  if (!id || id === activeDepartmentId.value) return

  switchingDepartment.value = true
  try {
    const response = await apiService.put('/teacher/departments/active', { department_id: id })
    if (response.data?.success) {
      activeDepartmentId.value = id
      await loadAnalytics()
    } else {
      toast.error(response.data?.message || 'Failed to switch department')
    }
  } catch (error: any) {
    console.error('Failed to switch department:', error)
    toast.error(error.response?.data?.message || 'Failed to switch department')
  } finally {
    switchingDepartment.value = false
  }
}

const fetchEnrolledStudents = async () => {
  loadingEnrolled.value = true
  try {
    const params: any = {}
    if (viewFilters.value.academic_year) {
      params.academic_year = viewFilters.value.academic_year
    }
    if (viewFilters.value.class_id) {
      params.class_name = viewFilters.value.class_id
    }
    if (viewFilters.value.stream_name) {
      params.stream_name = viewFilters.value.stream_name
    }

    console.log('Fetching enrolled students with params:', params)
    const response = await apiService.get('/teacher/students/enrolled', { params })
    console.log('Response:', response.data)

    if (response.data?.success && response.data?.data) {
      enrolledStudentsList.value = response.data.data
      console.log('Enrolled students loaded:', enrolledStudentsList.value.length)
    } else {
      console.error('API returned error:', response.data?.message)
    }
  } catch (error) {
    console.error('Failed to fetch enrolled students:', error)
  } finally {
    loadingEnrolled.value = false
  }
}

const openViewEnrolledModal = async () => {
  await fetchEnrolledStudents()
  showViewEnrolledModal.value = true
}

const deEnrollStudent = async (enrollmentId: number, firstName: string, lastName: string) => {
  if (!await confirmDialog.open({
    title: 'De-enroll student',
    message: `De-enroll ${firstName} ${lastName} from your account?\n\nThey'll lose access to your assignments, eNotes, and other content, but stay fully enrolled with every other teacher in the department.`,
    confirmLabel: 'De-enroll',
    danger: true
  })) {
    return
  }

  const reason = prompt('Reason (optional):') || undefined

  console.log('De-enrolling student:', enrollmentId)
  try {
    const response = await apiService.delete(`/teacher/students/${enrollmentId}`, { data: { reason } })
    console.log('De-enroll response:', response.data)

    if (response.data?.success) {
      // Refresh the enrolled students list
      await fetchEnrolledStudents()
      // Refresh analytics
      await loadAnalytics()
      toast.success('Student de-enrolled successfully')
    } else {
      console.error('De-enroll failed:', response.data?.message)
      toast.error('Failed to de-enroll student: ' + (response.data?.message || 'Unknown error'))
    }
  } catch (error) {
    console.error('Failed to de-enroll student:', error)
    toast.error('Failed to de-enroll student. Please try again.')
  }
}

onMounted(() => {
  loadAnalytics()
  loadMyDepartments()
})
</script>
