<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-indigo-500/20 p-4 sm:p-5 mb-6">
        <div class="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10"></div>
        <div class="absolute -right-3 bottom-0 w-24 h-24 rounded-full bg-white/10"></div>
        <div class="relative flex items-center gap-3">
          <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-sm flex-shrink-0 ring-2 ring-white/20">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
            </svg>
          </div>
          <div class="min-w-0">
            <h1 class="text-lg sm:text-2xl font-bold text-white leading-tight">My Academic History</h1>
            <p class="text-xs sm:text-sm text-indigo-100">Every class and academic year you've been part of</p>
          </div>
        </div>

        <div v-if="!loading && periods.length > 0" class="relative flex flex-wrap items-center gap-2 mt-3">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 backdrop-blur-sm text-white">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
            {{ periods.length }} {{ periods.length === 1 ? 'period' : 'periods' }}
          </span>
        </div>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
        <p class="mt-4 text-gray-500 dark:text-gray-400">Loading your history...</p>
      </div>

      <div v-else-if="periods.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        <svg class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
        </svg>
        <p class="text-gray-600 dark:text-gray-400">No enrollment history yet.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          v-for="(period, idx) in periods"
          :key="`${period.class_id}-${period.academic_year}`"
          class="rounded-2xl bg-white dark:bg-gray-800 shadow-sm border overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5"
          :class="period.is_current ? 'border-indigo-200 dark:border-indigo-800 ring-1 ring-indigo-100 dark:ring-indigo-900/40' : 'border-gray-100 dark:border-gray-700'"
        >
          <div class="h-1.5 bg-gradient-to-r" :class="period.is_current ? 'from-indigo-500 to-fuchsia-600' : cardAccent(idx)"></div>
          <div class="p-5">
            <div class="flex items-start justify-between gap-3 mb-3">
              <div class="flex items-center gap-3 min-w-0">
                <div
                  class="relative w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  :class="period.is_current ? 'bg-gradient-to-br from-indigo-500 to-fuchsia-600 shadow-sm shadow-indigo-500/30' : 'bg-gray-100 dark:bg-gray-700'"
                >
                  <span v-if="period.is_current" class="absolute inset-0 rounded-xl bg-indigo-400 opacity-40 animate-ping"></span>
                  <svg class="relative w-5 h-5" :class="period.is_current ? 'text-white' : 'text-gray-400 dark:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                  </svg>
                </div>
                <div class="min-w-0">
                  <h3 class="text-base font-bold text-gray-900 dark:text-white truncate">
                    {{ period.class_name }}{{ period.stream_name ? ' ' + period.stream_name : '' }}
                  </h3>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ period.class_level }} &middot; {{ period.academic_year }}</p>
                </div>
              </div>
              <span
                v-if="period.is_current"
                class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex-shrink-0"
              >
                Current
              </span>
            </div>

            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 dark:bg-gray-900/40 text-gray-500 dark:text-gray-400">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              {{ formatDate(period.start_date) }} – {{ period.end_date ? formatDate(period.end_date) : 'Present' }}
            </span>

            <div v-if="period.departments.length" class="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <span
                v-for="dept in period.departments"
                :key="dept"
                class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                {{ dept }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiService } from '../../services/api'

interface AcademicPeriod {
  class_id: number
  class_name: string
  class_level: string
  stream_name: string | null
  academic_year: string
  start_date: string
  end_date: string | null
  is_current: boolean
  departments: string[]
}

const periods = ref<AcademicPeriod[]>([])
const loading = ref(false)

const cardPalettes = [
  'from-gray-400 to-gray-500',
  'from-sky-400 to-blue-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-pink-500',
  'from-violet-400 to-purple-500'
]
const cardAccent = (idx: number) => cardPalettes[idx % cardPalettes.length]

const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const fetchHistory = async () => {
  loading.value = true
  try {
    const response = await apiService.get('/student/academic-history')
    if (response.data.success) {
      periods.value = response.data.data.periods || []
    }
  } catch (error) {
    console.error('Failed to fetch academic history:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchHistory()
})
</script>
