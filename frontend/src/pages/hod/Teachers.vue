<template>
  <div>
    <!-- Hero -->
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-indigo-500/20 p-4 sm:p-5 mb-6">
      <div class="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10"></div>
      <div class="absolute -right-3 bottom-0 w-24 h-24 rounded-full bg-white/10"></div>
      <div class="relative flex items-center gap-3 mb-3">
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-sm flex-shrink-0 ring-2 ring-white/20">
          <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"></path>
          </svg>
        </div>
        <div class="min-w-0">
          <h1 class="text-lg sm:text-2xl font-bold text-white leading-tight">Teachers</h1>
          <p class="text-xs sm:text-sm text-indigo-100">Teachers in your department</p>
        </div>
      </div>

      <div v-if="!loading" class="relative flex flex-wrap items-center gap-2 mb-3">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 backdrop-blur-sm text-white">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"></path></svg>
          {{ pagination.total }} {{ pagination.total === 1 ? 'teacher' : 'teachers' }}
        </span>
      </div>

      <!-- Search -->
      <div class="relative">
        <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          v-model="search"
          @input="debouncedSearch"
          type="text"
          placeholder="Search by name, employee number, username or email..."
          class="relative w-full pl-9 pr-4 py-2 rounded-lg border-0 shadow-md focus:ring-2 focus:ring-white/50 bg-white text-gray-900 dark:bg-gray-800 dark:text-white transition-colors"
        >
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6">
      <div v-for="i in 5" :key="i" class="animate-pulse flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
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
    <div v-else-if="teachers.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
      <svg class="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"></path>
      </svg>
      <p class="text-gray-500 dark:text-gray-400">
        {{ search ? `No teachers match "${search}"` : 'No teachers in your department yet' }}
      </p>
    </div>

    <!-- Table -->
    <div v-else class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900/40">
            <tr>
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Teacher</th>
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee No.</th>
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr v-for="teacher in teachers" :key="teacher.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
              <td class="px-5 py-3 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold bg-gradient-to-br flex-shrink-0" :class="avatarPalette(teacher.id)">
                    {{ initials(teacher) }}
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ teacher.first_name }} {{ teacher.last_name }}</p>
                    <p class="text-xs text-gray-400 dark:text-gray-500 truncate">@{{ teacher.username }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ teacher.employee_number }}</td>
              <td class="px-5 py-3 whitespace-nowrap">
                <p class="text-sm text-gray-700 dark:text-gray-300">{{ teacher.email }}</p>
                <p v-if="teacher.phone" class="text-xs text-gray-400 dark:text-gray-500">{{ teacher.phone }}</p>
              </td>
              <td class="px-5 py-3 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
                  :class="teacher.is_active ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'"
                >
                  {{ teacher.is_active ? 'Active' : 'Suspended' }}
                </span>
              </td>
              <td class="px-5 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ formatDate(teacher.created_at) }}</td>
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
            @click="fetchTeachers(pagination.page - 1)"
            class="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Previous
          </button>
          <button
            :disabled="pagination.page >= pagination.pages"
            @click="fetchTeachers(pagination.page + 1)"
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

interface Teacher {
  id: number
  username: string
  email: string
  employee_number: string
  first_name: string
  last_name: string
  phone: string | null
  is_active: number
  created_at: string
  department_id: number
  department_name?: string
  department_code?: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

const teachers = ref<Teacher[]>([])
const pagination = ref<Pagination>({ page: 1, limit: 20, total: 0, pages: 0 })
const loading = ref(false)
const error = ref('')
const search = ref('')

let searchTimer: number | null = null
const debouncedSearch = () => {
  if (searchTimer) window.clearTimeout(searchTimer)
  searchTimer = window.setTimeout(() => fetchTeachers(1), 350)
}

const fetchTeachers = async (page = 1) => {
  loading.value = true
  error.value = ''
  try {
    const response = await apiService.get('/hod/teachers', {
      search: search.value || undefined,
      page,
      limit: pagination.value.limit
    })
    if (response.data.success) {
      teachers.value = response.data.data.teachers || []
      pagination.value = response.data.data.pagination
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load teachers'
  } finally {
    loading.value = false
  }
}

const avatarPalettes = [
  'from-indigo-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-sky-500 to-blue-600',
  'from-violet-500 to-fuchsia-600'
]
const avatarPalette = (id: number) => avatarPalettes[Math.abs(id) % avatarPalettes.length]

const initials = (teacher: Teacher) => `${teacher.first_name?.[0] || ''}${teacher.last_name?.[0] || ''}`.toUpperCase() || '?'

const formatDate = (value: string) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

onMounted(() => {
  fetchTeachers()
})
</script>
