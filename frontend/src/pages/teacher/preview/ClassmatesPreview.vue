<template>
  <div>
    <PreviewBanner module-label="My Classes" />

    <div class="mb-6">
      <RouterLink to="/teacher/preview" class="text-indigo-600 dark:text-indigo-400 hover:underline font-medium flex items-center text-sm">
        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        Back to Preview
      </RouterLink>
    </div>

    <div class="card mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ className }}</h2>
      <p class="text-gray-500 dark:text-gray-400">{{ students.length }} student{{ students.length === 1 ? '' : 's' }} in this class</p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden overflow-x-auto">
      <div v-if="loading" class="text-center py-12 text-gray-500">Loading classmates...</div>
      <div v-else-if="students.length === 0" class="text-center py-12 text-gray-500">No students enrolled in this class yet</div>
      <table v-else class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admission No</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gender</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stream</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="student in students" :key="student.enrollment_id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ student.first_name }} {{ student.last_name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ student.admission_number }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">{{ student.gender }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ student.stream_name || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PreviewBanner from '@/components/preview/PreviewBanner.vue'

interface Classmate {
  enrollment_id: number
  first_name: string
  last_name: string
  admission_number: string
  gender: string
  class_name: string
  stream_name: string | null
}

const route = useRoute()
const students = ref<Classmate[]>([])
const className = ref('')
const loading = ref(false)

const loadStudents = async () => {
  loading.value = true
  try {
    const response = await axios.get(`/api/teacher/classes/${route.params.classId}/students`)
    if (response.data.success) {
      students.value = response.data.data || []
      className.value = students.value[0]?.class_name || 'Class'
    }
  } catch (error) {
    console.error('Failed to load classmates:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStudents()
})
</script>
