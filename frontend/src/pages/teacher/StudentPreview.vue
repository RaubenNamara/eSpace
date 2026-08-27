<template>
  <div>
    <div class="flex items-center gap-4 mb-8">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
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
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-200 dark:border-gray-700 border-t-emerald-600"></div>
    </div>

    <div v-else-if="classes.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
      <p class="text-gray-500 dark:text-gray-400">No classes found in your department yet.</p>
    </div>

    <template v-else>
      <!-- Class picker -->
      <div class="mb-8">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Choose a class to preview</p>
        <div class="flex gap-2.5 overflow-x-auto pb-2 -mx-1 px-1 sm:flex-wrap sm:overflow-visible">
          <button
            v-for="cls in classes"
            :key="cls.id"
            @click="selectedClassId = cls.id"
            class="flex-shrink-0 flex items-center gap-2 pl-3 pr-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 whitespace-nowrap"
            :class="selectedClassId === cls.id
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-transparent text-white shadow-md shadow-emerald-500/25'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-sm'"
          >
            <span
              class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
              :class="selectedClassId === cls.id ? 'bg-white/20 text-white' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'"
            >
              {{ cls.name.replace(/[^0-9A-Za-z]/g, '').slice(0, 2) }}
            </span>
            {{ cls.name }}{{ cls.stream_name ? ' - ' + cls.stream_name : '' }}
            <span :class="selectedClassId === cls.id ? 'text-white/70' : 'text-gray-400'">({{ cls.student_count }})</span>
          </button>
        </div>
      </div>

      <!-- Module cards -->
      <div v-if="selectedClassId">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Modules</p>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
          <RouterLink
            v-for="mod in modules"
            :key="mod.label"
            :to="mod.to"
            class="group bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3"
          >
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm bg-gradient-to-br transition-transform duration-200 group-hover:scale-105"
              :class="mod.color"
            >
              <component :is="mod.icon" class="w-6 h-6 text-white" />
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ mod.label }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{{ mod.description }}</p>
            </div>
          </RouterLink>
        </div>
      </div>

      <div v-else class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">Pick a class above to see its preview options.</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
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

// Tiny inline icon factory so this file doesn't need eight separate heroicon imports for
// single-use glyphs - each is just a path/viewBox pair rendered through the same <svg> shell.
const icon = (paths: string[]) => (_props: unknown) => h(
  'svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
  paths.map(d => h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': 2, d }))
)

const ClassesIcon = icon(['M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4'])
const LibraryIcon = icon(['M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'])
const ItemBankIcon = icon(['M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'])
const LiveClassIcon = icon(['M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'])
const VideoIcon = icon(['M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'])
const ENotesIcon = icon(['M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'])
const VirtualLabIcon = icon(['M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5'])
const AssessmentIcon = icon(['M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'])

const modules = computed(() => selectedClassId.value ? [
  { label: 'My Classes', description: 'Classmates & class overview', to: `/teacher/preview/classes/${selectedClassId.value}`, icon: ClassesIcon, color: 'from-indigo-500 to-purple-600' },
  { label: 'eLibrary', description: 'Books available to this class', to: `/teacher/preview/library/${selectedClassId.value}`, icon: LibraryIcon, color: 'from-emerald-500 to-teal-600' },
  { label: 'Item Bank', description: 'Practice question sets', to: `/teacher/preview/itembank/${selectedClassId.value}`, icon: ItemBankIcon, color: 'from-violet-500 to-fuchsia-600' },
  { label: 'Live Classes', description: 'Scheduled & past sessions', to: `/teacher/preview/live-classes/${selectedClassId.value}`, icon: LiveClassIcon, color: 'from-red-500 to-rose-600' },
  { label: 'Videos', description: 'Published video lessons', to: `/teacher/preview/videos/${selectedClassId.value}`, icon: VideoIcon, color: 'from-rose-500 to-orange-600' },
  { label: 'eNotes', description: 'Topic notes by subject', to: `/teacher/preview/enotes/${selectedClassId.value}`, icon: ENotesIcon, color: 'from-amber-500 to-orange-600' },
  { label: 'Virtual Lab', description: 'Interactive experiments', to: `/teacher/preview/virtual-lab/${selectedClassId.value}`, icon: VirtualLabIcon, color: 'from-cyan-500 to-blue-600' },
  { label: 'Assessments', description: 'Preview from your assessments list', to: '/teacher/assignments', icon: AssessmentIcon, color: 'from-sky-500 to-blue-600' },
] : [])

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
