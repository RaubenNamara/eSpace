<template>
  <div>
    <div class="flex items-center gap-4 mb-6">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm flex-shrink-0">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
      </div>
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">Preview as Student</h1>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">See exactly what your students see, in any of your classes</p>
      </div>
    </div>

    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
    </div>

    <div v-else-if="classes.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <p class="text-gray-500 dark:text-gray-400">No classes found in your department yet.</p>
    </div>

    <template v-else>
      <!-- Class picker -->
      <div class="mb-6">
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Choose a class to preview</p>
        <div class="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 sm:flex-wrap sm:overflow-visible">
          <button
            v-for="cls in classes"
            :key="cls.id"
            @click="selectedClassId = cls.id"
            class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors whitespace-nowrap"
            :class="selectedClassId === cls.id
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-emerald-400'"
          >
            {{ cls.name }}{{ cls.stream_name ? ' - ' + cls.stream_name : '' }}
            <span class="opacity-70">({{ cls.student_count }})</span>
          </button>
        </div>
      </div>

      <!-- Module cards -->
      <div v-if="selectedClassId" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        <RouterLink
          :to="`/teacher/preview/classes/${selectedClassId}`"
          class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center text-center gap-2"
        >
          <div class="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"></path>
            </svg>
          </div>
          <p class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">My Classes</p>
        </RouterLink>

        <RouterLink
          :to="`/teacher/preview/library/${selectedClassId}`"
          class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center text-center gap-2"
        >
          <div class="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <p class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">eLibrary</p>
        </RouterLink>

        <RouterLink
          :to="`/teacher/preview/itembank/${selectedClassId}`"
          class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center text-center gap-2"
        >
          <div class="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-500 to-fuchsia-600">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">Item Bank</p>
        </RouterLink>

        <RouterLink
          :to="`/teacher/preview/live-classes/${selectedClassId}`"
          class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center text-center gap-2"
        >
          <div class="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-red-500 to-rose-600">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
          </div>
          <p class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">Live Classes</p>
        </RouterLink>

        <RouterLink
          :to="`/teacher/preview/videos/${selectedClassId}`"
          class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center text-center gap-2"
        >
          <div class="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-rose-500 to-orange-600">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
          </div>
          <p class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">Videos</p>
        </RouterLink>

        <RouterLink
          :to="`/teacher/preview/enotes/${selectedClassId}`"
          class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center text-center gap-2"
        >
          <div class="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <p class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">eNotes</p>
        </RouterLink>

        <RouterLink
          to="/teacher/assignments"
          class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center text-center gap-2"
          title="Preview a specific assessment from your assessments list"
        >
          <div class="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-sky-500 to-blue-600">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <p class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">Assessments</p>
        </RouterLink>
      </div>

      <p v-else class="text-sm text-gray-500 dark:text-gray-400">Pick a class above to see its preview options.</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface TeacherClass {
  id: number
  name: string
  level: string
  stream_name: string | null
  student_count: number
}

const API_BASE = '/api/teacher'

const classes = ref<TeacherClass[]>([])
const selectedClassId = ref<number | null>(null)
const loading = ref(false)

const loadClasses = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_BASE}/classes`)
    if (response.data.success) {
      classes.value = response.data.data || []
      if (classes.value.length > 0) selectedClassId.value = classes.value[0].id
    }
  } catch (error) {
    console.error('Failed to load classes:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadClasses()
})
</script>
