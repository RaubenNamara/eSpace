<template>
  <div>
    <!-- Hero -->
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-indigo-500/20 p-4 sm:p-5 mb-6">
      <div class="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10"></div>
      <div class="absolute -right-3 bottom-0 w-24 h-24 rounded-full bg-white/10"></div>
      <div class="relative flex items-center gap-3">
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-sm flex-shrink-0 ring-2 ring-white/20">
          <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <div class="min-w-0">
          <h1 class="text-lg sm:text-2xl font-bold text-white leading-tight">My Classes</h1>
          <p class="text-xs sm:text-sm text-indigo-100">Classes and departments you're enrolled in</p>
        </div>
      </div>

      <div v-if="!loadingClasses && classes.length > 0" class="relative flex flex-wrap items-center gap-2 mt-3">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 backdrop-blur-sm text-white">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          {{ classes.length }} {{ classes.length === 1 ? 'class' : 'classes' }}
        </span>
      </div>
    </div>

    <!-- Classes List -->
    <template v-if="!selectedClass">
      <div v-if="loadingClasses" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="i in 6" :key="i" class="animate-pulse rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="space-y-2">
              <div class="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div class="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div class="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div class="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 flex items-start gap-3">
        <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-800 dark:text-red-200">{{ error }}</p>
      </div>
      <div v-else-if="classes.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
        <svg class="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
        <p class="text-gray-500 dark:text-gray-400">You're not enrolled in any classes yet</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <button
          v-for="(cls, idx) in classes"
          :key="`${cls.id}-${cls.department_id}`"
          @click="selectClass(cls)"
          class="group text-left rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all overflow-hidden"
        >
          <div class="h-1.5 bg-gradient-to-r" :class="cardAccent(idx)"></div>
          <div class="p-5">
            <div class="flex items-start justify-between gap-3 mb-4">
              <div class="min-w-0">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white truncate">{{ cls.name }}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ cls.level }}</p>
              </div>
              <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br text-white shadow-sm" :class="cardAccent(idx)">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"></path>
                </svg>
              </div>
            </div>
            <div class="space-y-2 mb-4">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-400 dark:text-gray-500">Department</span>
                <span class="font-medium text-gray-700 dark:text-gray-300 truncate max-w-[60%] text-right">{{ cls.department_name || 'N/A' }}</span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-400 dark:text-gray-500">Stream</span>
                <span class="font-medium text-gray-700 dark:text-gray-300">{{ cls.stream_name || 'N/A' }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
              <span class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"></path></svg>
                {{ cls.student_count }} classmate{{ cls.student_count === 1 ? '' : 's' }}
              </span>
              <span class="text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                View <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </span>
            </div>
          </div>
        </button>
      </div>
    </template>

    <!-- Classmates View -->
    <div v-else>
      <button @click="selectedClass = null" class="mb-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center text-sm">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Classes
      </button>

      <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm p-5 mb-5 flex items-center gap-4">
        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"></path>
          </svg>
        </div>
        <div class="min-w-0">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white truncate">{{ selectedClass.name }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
            {{ selectedClass.level }} &middot; {{ selectedClass.stream_name || 'No Stream' }} &middot; {{ selectedClass.department_name || 'N/A' }}
          </p>
        </div>
      </div>

      <!-- Students -->
      <div class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div v-if="loadingStudents" class="text-center py-12">
          <div class="text-gray-500 dark:text-gray-400 text-sm">Loading classmates...</div>
        </div>
        <div v-else-if="students.length === 0" class="text-center py-12">
          <svg class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"></path>
          </svg>
          <p class="text-gray-500 dark:text-gray-400 text-sm">No other students enrolled in this class yet</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900/40">
              <tr>
                <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admission No</th>
                <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gender</th>
                <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stream</th>
                <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Academic Year</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <tr
                v-for="student in students"
                :key="student.enrollment_id"
                class="transition-colors"
                :class="student.student_id === ownStudentId ? 'bg-indigo-50/60 dark:bg-indigo-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-700/40'"
              >
                <td class="px-5 py-3 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold bg-gradient-to-br flex-shrink-0" :class="avatarPalette(student.student_id)">
                      {{ studentInitials(student) }}
                    </div>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ student.first_name }} {{ student.last_name }}
                      <span v-if="student.student_id === ownStudentId" class="ml-1 text-xs text-indigo-600 dark:text-indigo-400 font-normal">(You)</span>
                    </span>
                  </div>
                </td>
                <td class="px-5 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ student.admission_number }}</td>
                <td class="px-5 py-3 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium capitalize"
                    :class="student.gender === 'female' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'"
                  >
                    {{ student.gender }}
                  </span>
                </td>
                <td class="px-5 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ student.stream_name || 'N/A' }}</td>
                <td class="px-5 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ student.academic_year || 'N/A' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_BASE = '/api'

interface StudentClass {
  id: number
  name: string
  level: string
  stream_name: string | null
  department_id: number
  department_name: string | null
  academic_year: string | null
  student_count: number
}

interface Classmate {
  enrollment_id: number
  student_id: number
  admission_number: string
  first_name: string
  last_name: string
  gender: string
  department_id: number
  academic_year: string | null
  class_id: number
  department_name: string | null
  class_name: string | null
  level: string | null
  stream_name: string | null
}

const loadingClasses = ref(false)
const loadingStudents = ref(false)
const error = ref('')
const classes = ref<StudentClass[]>([])
const students = ref<Classmate[]>([])
const selectedClass = ref<StudentClass | null>(null)
const ownStudentId = ref<number | null>(null)

const loadClasses = async () => {
  loadingClasses.value = true
  error.value = ''
  try {
    const response = await axios.get(`${API_BASE}/student/classes`)
    if (response.data.success) {
      classes.value = response.data.data || []
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load classes'
  } finally {
    loadingClasses.value = false
  }
}

const selectClass = async (cls: StudentClass) => {
  selectedClass.value = cls
  await loadStudents(cls)
}

const loadStudents = async (cls: StudentClass) => {
  loadingStudents.value = true
  try {
    const response = await axios.get(`${API_BASE}/student/classes/${cls.id}/students`, {
      params: { department_id: cls.department_id }
    })
    if (response.data.success) {
      students.value = response.data.data || []
    }
  } catch (error) {
    console.error('Failed to load classmates:', error)
    students.value = []
  } finally {
    loadingStudents.value = false
  }
}

const cardPalettes = [
  'from-indigo-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-sky-500 to-blue-600',
  'from-violet-500 to-fuchsia-600'
]
const cardAccent = (idx: number) => cardPalettes[idx % cardPalettes.length]
const avatarPalette = (id: number) => cardPalettes[Math.abs(id) % cardPalettes.length]

const studentInitials = (student: Classmate) => {
  return `${student.first_name?.[0] || ''}${student.last_name?.[0] || ''}`.toUpperCase() || '?'
}

const loadOwnProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE}/auth/me`)
    if (response.data.success) {
      ownStudentId.value = response.data.data?.id ?? null
    }
  } catch {
    // Non-critical: just skip the "(You)" label if this fails
  }
}

onMounted(() => {
  loadClasses()
  loadOwnProfile()
})
</script>
