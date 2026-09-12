<template>
  <div>
    <!-- Header - icon and title share a row with the search box, so the input lines up exactly
         with the heading; the subtitle (with the live count folded in) sits on its own line. -->
    <div class="flex items-center justify-between gap-2 mb-1">
      <div class="flex items-center gap-2 flex-shrink-0">
        <div class="hidden sm:flex w-7 h-7 rounded-lg bg-indigo-600 items-center justify-center flex-shrink-0">
          <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
          </svg>
        </div>
        <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap">Students</h1>
      </div>

      <div class="relative flex-shrink min-w-0 w-32 sm:w-80">
        <svg class="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          v-model="search"
          @input="debouncedSearch"
          type="text"
          placeholder="Search..."
          class="w-full pl-8 pr-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
      </div>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">
      Students enrolled in your department<template v-if="!loading"> &middot; {{ pagination.total }} {{ pagination.total === 1 ? 'student' : 'students' }}</template>
    </p>

    <!-- Loading -->
    <div v-if="loading" class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6">
      <div v-for="i in 6" :key="i" class="animate-pulse flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
        <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div class="flex-1 space-y-2">
          <div class="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="h-2.5 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 flex items-start gap-3">
      <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p class="text-red-800 dark:text-red-200">{{ error }}</p>
    </div>

    <!-- Empty -->
    <div v-else-if="students.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
      <svg class="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
      </svg>
      <p class="text-gray-500 dark:text-gray-400">
        {{ search ? `No students match "${search}"` : 'No students enrolled in your department yet' }}
      </p>
    </div>

    <!-- Table -->
    <div v-else class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-950/40">
            <tr>
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admission No.</th>
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gender</th>
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class</th>
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Academic Year</th>
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-5 py-3 text-right text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr v-for="student in students" :key="student.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
              <td class="px-5 py-3 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0" :class="avatarPalette(student.id)">
                    {{ initials(student) }}
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ student.first_name }} {{ student.last_name }}</p>
                    <p class="text-xs text-gray-400 dark:text-gray-500 truncate">@{{ student.username }}</p>
                  </div>
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
              <td class="px-5 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {{ student.class_name || 'N/A' }}{{ student.stream_name ? ' ' + student.stream_name : '' }}
                <span v-if="student.class_level" class="block text-xs text-gray-400 dark:text-gray-500">{{ student.class_level }}</span>
              </td>
              <td class="px-5 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ student.academic_year || 'N/A' }}</td>
              <td class="px-5 py-3 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
                  :class="student.is_active ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'"
                >
                  {{ student.is_active ? 'Active' : 'Suspended' }}
                </span>
              </td>
              <td class="px-5 py-3 whitespace-nowrap text-right">
                <button
                  @click="deenrollStudent(student)"
                  :disabled="deenrolling === student.id"
                  class="text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 disabled:opacity-50"
                  title="De-enroll from department"
                >
                  {{ deenrolling === student.id ? 'De-enrolling...' : 'De-enroll' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.pages > 1" class="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-700">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          Page {{ pagination.page }} of {{ pagination.pages }} &middot; {{ pagination.total }} total
        </p>
        <div class="flex gap-2">
          <button
            :disabled="pagination.page <= 1"
            @click="fetchStudents(pagination.page - 1)"
            class="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Previous
          </button>
          <button
            :disabled="pagination.page >= pagination.pages"
            @click="fetchStudents(pagination.page + 1)"
            class="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiService } from '@/services/api'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

const toast = useToastStore()
const confirmDialog = useConfirmStore()

interface Student {
  id: number
  username: string
  email: string | null
  admission_number: string
  first_name: string
  last_name: string
  gender: string
  phone: string | null
  is_active: number
  created_at: string
  class_name: string | null
  class_level: string | null
  stream_name: string | null
  academic_year: string | null
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

const students = ref<Student[]>([])
const pagination = ref<Pagination>({ page: 1, limit: 20, total: 0, pages: 0 })
const loading = ref(false)
const error = ref('')
const search = ref('')
const deenrolling = ref<number | null>(null)

let searchTimer: number | null = null
const debouncedSearch = () => {
  if (searchTimer) window.clearTimeout(searchTimer)
  searchTimer = window.setTimeout(() => fetchStudents(1), 350)
}

const fetchStudents = async (page = 1) => {
  loading.value = true
  error.value = ''
  try {
    const response = await apiService.get('/hod/students', {
      search: search.value || undefined,
      page,
      limit: pagination.value.limit
    })
    if (response.data.success) {
      students.value = response.data.data.students || []
      pagination.value = response.data.data.pagination
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load students'
  } finally {
    loading.value = false
  }
}

const deenrollStudent = async (student: Student) => {
  const name = `${student.first_name} ${student.last_name}`
  if (!await confirmDialog.open({
    title: 'De-enroll student',
    message: `De-enroll ${name} from your department?\n\nThis removes them from every teacher in the department, not just your view. Their account and historical records (submissions, marks, attendance) are kept.`,
    confirmLabel: 'De-enroll',
    danger: true
  })) {
    return
  }

  const reason = prompt('Reason (optional):') || undefined

  deenrolling.value = student.id
  try {
    const response = await apiService.post('/hod/students/deenroll', {
      student_ids: [student.id],
      reason
    })
    if (response.data.success) {
      await fetchStudents(pagination.value.page)
      toast.success('Student de-enrolled successfully')
    } else {
      toast.error(response.data.message || 'Failed to de-enroll student')
    }
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to de-enroll student')
  } finally {
    deenrolling.value = null
  }
}

const avatarPalettes = [
  'bg-indigo-600',
  'bg-emerald-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-sky-600',
  'bg-violet-600'
]
const avatarPalette = (id: number) => avatarPalettes[Math.abs(id) % avatarPalettes.length]

const initials = (student: Student) => `${student.first_name?.[0] || ''}${student.last_name?.[0] || ''}`.toUpperCase() || '?'

onMounted(() => {
  fetchStudents()
})
</script>
