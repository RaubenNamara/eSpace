<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Teacher Dashboard</h1>
      <div class="flex flex-wrap gap-3">
        <RouterLink
          to="/teacher/preview"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          title="See exactly what your students see across classes, eLibrary, Item Bank, Live Classes and assignments"
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
      </div>
    </div>

    <!-- Department Info -->
    <div v-if="analytics.department" class="card mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-indigo-100 text-sm font-medium">Department</p>
          <h2 class="text-2xl font-bold">{{ analytics.department.name }}</h2>
          <p class="text-indigo-200 text-sm">{{ analytics.department.code }} - {{ analytics.department.description }}</p>

          <!-- Department switcher - only shown when the teacher belongs to more than one -->
          <div v-if="myDepartments.length > 1" class="mt-3 flex items-center gap-2">
            <label class="text-indigo-100 text-xs font-medium">Switch to:</label>
            <select
              :value="activeDepartmentId"
              @change="switchDepartment(($event.target as HTMLSelectElement).value)"
              :disabled="switchingDepartment"
              class="text-sm rounded-md bg-white/20 border border-white/30 text-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
            >
              <option v-for="dept in myDepartments" :key="dept.id" :value="dept.id" class="text-gray-900">
                {{ dept.name }}{{ dept.is_primary ? ' (Primary)' : '' }}
              </option>
            </select>
          </div>
        </div>
        <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
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
            <p class="text-gray-500 dark:text-gray-400 text-sm">Classes</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ analytics.by_class.length }}</p>
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
            <p class="text-gray-500 dark:text-gray-400 text-sm">Streams</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ analytics.by_stream.length }}</p>
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
      <!-- Enrollments by Class -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enrollments by Class</h3>
        <div class="h-64">
          <Bar v-if="!loadingAnalytics && analytics.by_class.length > 0" :data="classChartData" :options="chartOptions" />
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

    <!-- Gender Distribution & Stream Distribution -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Gender Distribution -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Gender Distribution</h3>
        <div class="h-64">
          <Doughnut v-if="!loadingAnalytics" :data="genderChartData" :options="doughnutOptions" />
          <div v-else class="flex items-center justify-center h-full text-gray-500">Loading...</div>
        </div>
      </div>

      <!-- Enrollments by Stream -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enrollments by Stream</h3>
        <div class="h-64">
          <Bar v-if="!loadingAnalytics && analytics.by_stream.length > 0" :data="streamChartData" :options="horizontalChartOptions" />
          <div v-else-if="loadingAnalytics" class="flex items-center justify-center h-full text-gray-500">Loading...</div>
          <div v-else class="flex items-center justify-center h-full text-gray-500">No data available</div>
        </div>
      </div>
    </div>

    <!-- View Enrolled Students Modal -->
    <div v-if="showViewEnrolledModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <!-- Header -->
        <div class="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-5 flex-shrink-0">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-white">Enrolled Students in {{ analytics.department?.name }}</h2>
              <p class="text-green-100 text-sm mt-1">View students enrolled in your department</p>
            </div>
            <button @click="showViewEnrolledModal = false" class="text-white/80 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Filters -->
        <div class="p-6 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
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
          <table v-else class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900">
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

        <!-- Footer -->
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-end flex-shrink-0">
          <button
            @click="showViewEnrolledModal = false"
            class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

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

// Chart data
const classChartData = computed(() => ({
  labels: analytics.value.by_class.map((c: any) => c.class_name),
  datasets: [{
    label: 'Students',
    data: analytics.value.by_class.map((c: any) => c.count),
    backgroundColor: '#6366F1',
    borderRadius: 8
  }]
}))

const yearChartData = computed(() => ({
  labels: analytics.value.by_academic_year.map((y: any) => y.academic_year),
  datasets: [{
    label: 'Students',
    data: analytics.value.by_academic_year.map((y: any) => y.count),
    backgroundColor: '#10B981',
    borderRadius: 8
  }]
}))

const streamChartData = computed(() => ({
  labels: analytics.value.by_stream.map((s: any) => s.stream_name),
  datasets: [{
    label: 'Students',
    data: analytics.value.by_stream.map((s: any) => s.count),
    backgroundColor: '#F59E0B',
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

const horizontalChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.05)'
      }
    },
    y: {
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
      alert(response.data?.message || 'Failed to switch department')
    }
  } catch (error: any) {
    console.error('Failed to switch department:', error)
    alert(error.response?.data?.message || 'Failed to switch department')
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
  if (!confirm(`Are you sure you want to de-enroll ${firstName} ${lastName} from the department?`)) {
    return
  }

  console.log('De-enrolling student:', enrollmentId)
  try {
    const response = await apiService.delete(`/teacher/students/${enrollmentId}`)
    console.log('De-enroll response:', response.data)
    
    if (response.data?.success) {
      // Refresh the enrolled students list
      await fetchEnrolledStudents()
      // Refresh analytics
      await loadAnalytics()
      alert('Student de-enrolled successfully')
    } else {
      console.error('De-enroll failed:', response.data?.message)
      alert('Failed to de-enroll student: ' + (response.data?.message || 'Unknown error'))
    }
  } catch (error) {
    console.error('Failed to de-enroll student:', error)
    alert('Failed to de-enroll student. Please try again.')
  }
}

onMounted(() => {
  loadAnalytics()
  loadMyDepartments()
})
</script>
