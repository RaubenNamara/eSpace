<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Classes</h1>
    
    <!-- Classes List -->
    <template v-if="!selectedClass">
      <!-- Filter Section -->
      <div class="card mb-6">
        <div class="flex items-center gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Academic Year
            </label>
            <select 
              v-model="selectedAcademicYear"
              @change="loadClasses"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option v-for="year in academicYears" :key="year.academic_year" :value="year.academic_year">
                {{ year.academic_year }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-if="loadingClasses" class="col-span-full text-center py-12">
          <div class="text-gray-500">Loading classes...</div>
        </div>
        <div v-else-if="classes.length === 0" class="col-span-full text-center py-12">
          <div class="text-gray-500">No classes found in your department</div>
        </div>
        <div v-else v-for="cls in classes" :key="cls.id" 
             @click="selectClass(cls)"
             class="card cursor-pointer hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ cls.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ cls.level }}</p>
              </div>
              <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span class="font-medium">Stream:</span>
                <span class="ml-2">{{ cls.stream_name || 'N/A' }}</span>
              </div>
              <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span class="font-medium">Students:</span>
                <span class="ml-2">{{ cls.student_count }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Class Students View -->
    <div v-else>
      <div class="mb-6">
        <button @click="selectedClass = null" class="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Classes
        </button>
      </div>

      <div class="card mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedClass.name }}</h2>
            <p class="text-gray-500 dark:text-gray-400">
              {{ selectedClass.level }} - {{ selectedClass.stream_name || 'No Stream' }}
            </p>
          </div>
          <div class="flex gap-3">
            <button 
              @click="bulkDeEnroll"
              :disabled="selectedStudents.length === 0"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              De-enroll Selected ({{ selectedStudents.length }})
            </button>
          </div>
        </div>
      </div>

      <!-- Students Table -->
      <div class="card">
        <div class="mb-4">
          <label class="flex items-center">
            <input 
              type="checkbox" 
              v-model="selectAll"
              @change="toggleSelectAll"
              class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            >
            <span class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Select All</span>
          </label>
        </div>

        <div v-if="loadingStudents" class="text-center py-12">
          <div class="text-gray-500">Loading students...</div>
        </div>
        <div v-else-if="students.length === 0" class="text-center py-12">
          <div class="text-gray-500">No students enrolled in this class</div>
        </div>
        <table v-else class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">
                Select
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Student
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Admission No
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Gender
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Class
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Level
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Stream
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Department
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Academic Year
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="student in students" :key="student.enrollment_id" 
                class="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td class="px-6 py-4 whitespace-nowrap">
                <input 
                  type="checkbox" 
                  v-model="selectedStudents"
                  :value="student.enrollment_id"
                  class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {{ student.first_name }} {{ student.last_name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ student.admission_number }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">
                {{ student.gender }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ student.class_name || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ student.level || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ student.stream_name || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ student.department_name || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ student.academic_year || 'N/A' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import apiService from '@/services/api'

const loadingClasses = ref(false)
const loadingStudents = ref(false)
const classes = ref<any[]>([])
const students = ref<any[]>([])
const selectedClass = ref<any>(null)
const selectedStudents = ref<number[]>([])
const selectAll = ref(false)
const academicYears = ref<any[]>([])
const selectedAcademicYear = ref('')

const loadAcademicYears = async () => {
  try {
    const response = await apiService.get('/teacher/classes/academic-years')
    if (response.data?.success && response.data?.data) {
      academicYears.value = response.data.data
      // Set default to current year if available
      const currentYear = new Date().getFullYear().toString()
      if (academicYears.value.some((y: any) => y.academic_year === currentYear)) {
        selectedAcademicYear.value = currentYear
      } else if (academicYears.value.length > 0) {
        selectedAcademicYear.value = academicYears.value[0].academic_year
      }
    }
  } catch (error) {
    console.error('Failed to load academic years:', error)
  }
}

const loadClasses = async () => {
  loadingClasses.value = true
  try {
    const params: any = {}
    if (selectedAcademicYear.value) {
      params.academic_year = selectedAcademicYear.value
    }
    const response = await apiService.get('/teacher/classes', { params })
    if (response.data?.success && response.data?.data) {
      classes.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to load classes:', error)
  } finally {
    loadingClasses.value = false
  }
}

const selectClass = async (cls: any) => {
  selectedClass.value = cls
  selectedStudents.value = []
  selectAll.value = false
  await loadStudents(cls.id)
}

const loadStudents = async (classId: number) => {
  loadingStudents.value = true
  try {
    const params: any = {}
    if (selectedAcademicYear.value) {
      params.academic_year = selectedAcademicYear.value
    }
    const response = await apiService.get(`/teacher/classes/${classId}/students`, { params })
    if (response.data?.success && response.data?.data) {
      students.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to load students:', error)
  } finally {
    loadingStudents.value = false
  }
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedStudents.value = students.value.map(s => s.enrollment_id)
  } else {
    selectedStudents.value = []
  }
}

watch(selectedStudents, (newVal) => {
  selectAll.value = newVal.length === students.value.length && students.value.length > 0
})

const bulkDeEnroll = async () => {
  if (selectedStudents.value.length === 0) {
    alert('Please select at least one student to de-enroll')
    return
  }

  if (!confirm(`Are you sure you want to de-enroll ${selectedStudents.value.length} student(s) from the department?`)) {
    return
  }

  try {
    const promises = selectedStudents.value.map(id => 
      apiService.delete(`/teacher/students/${id}`)
    )
    
    await Promise.all(promises)
    
    // Refresh the students list
    await loadStudents(selectedClass.value.id)
    // Clear selection
    selectedStudents.value = []
    selectAll.value = false
    
    alert('Students de-enrolled successfully')
  } catch (error) {
    console.error('Failed to de-enroll students:', error)
    alert('Failed to de-enroll some students. Please try again.')
  }
}

onMounted(() => {
  loadAcademicYears()
  loadClasses()
})
</script>
