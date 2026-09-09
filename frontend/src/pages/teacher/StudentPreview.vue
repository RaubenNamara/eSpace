<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
        </div>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Preview as Student</h1>
      </div>

      <div v-if="classes.length > 0" class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">Class</label>
        <select
          v-model="selectedStreamId"
          class="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">Select a class...</option>
          <optgroup v-for="group in classGroups" :key="group.name + group.level" :label="group.name">
            <option v-for="stream in group.streams" :key="stream.id" :value="stream.id">
              {{ group.name }}{{ stream.stream_name ? ' - ' + stream.stream_name : '' }} ({{ stream.student_count }})
            </option>
          </optgroup>
        </select>
      </div>
    </div>

    <div v-if="loading" class="text-center py-10">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-200 dark:border-gray-700 border-t-indigo-600"></div>
    </div>

    <div v-else-if="classes.length === 0" class="text-center py-10 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
      <p class="text-gray-500 dark:text-gray-400">No classes found in your department yet.</p>
    </div>

    <template v-else>
      <div v-if="!selectedStream" class="text-center py-10 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">Pick a class above to see its preview options.</p>
      </div>

      <!-- Modules for the selected class-stream - same blur-on-sibling
           row, smaller cards, one indigo color throughout so it reads as the final step. Clicking
           one opens its content in the <router-view> below without leaving this page - the picker
           above stays put and the other module cards blur, just like the class/stream rows. -->
      <div v-if="selectedStream">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Modules</p>
        <div class="flex flex-wrap gap-3">
          <template v-for="mod in modules" :key="mod.label">
            <RouterLink
              v-if="mod.external"
              :to="mod.to"
              class="flex-shrink-0 w-36 text-left card !p-3.5 transition-all duration-200 border-2 border-transparent hover:border-indigo-200 dark:hover:border-indigo-800"
            >
              <div class="w-9 h-9 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-2">
                <component :is="mod.icon" class="w-[18px] h-[18px] text-indigo-600 dark:text-indigo-400" />
              </div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ mod.label }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{{ mod.description }}</p>
            </RouterLink>
            <button
              v-else
              @click="toggleModule(mod)"
              class="flex-shrink-0 w-36 text-left card !p-3.5 transition-all duration-200 border-2 hover:opacity-100 hover:blur-0"
              :class="[
                isModuleActive(mod) ? 'border-indigo-500 dark:border-indigo-400' : 'border-transparent hover:border-indigo-200 dark:hover:border-indigo-800',
                { 'opacity-40 blur-[1px]': anyModuleActive && !isModuleActive(mod) }
              ]"
            >
              <div class="w-9 h-9 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-2">
                <component :is="mod.icon" class="w-[18px] h-[18px] text-indigo-600 dark:text-indigo-400" />
              </div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ mod.label }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{{ mod.description }}</p>
            </button>
          </template>
        </div>
      </div>

      <!-- Opened module content, rendered in place via the nested route under /teacher/preview. -->
      <div v-if="anyModuleActive" class="mt-4">
        <router-view />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

interface TeacherClass {
  id: number
  name: string
  level: string
  stream_name: string | null
  student_count: number
}

const API_BASE = '/api/teacher'

const route = useRoute()
const router = useRouter()

const classes = ref<TeacherClass[]>([])
const selectedStreamId = ref<number | ''>('')
const loading = ref(false)

// The backend returns one row per class+stream combination - group them here so the dropdown
// shows an optgroup per class (e.g. "S.6") with its streams as options, same grouping used in
// My Classes.
const classGroups = computed(() => {
  const groups = new Map<string, { name: string; level: string; streams: TeacherClass[]; totalStudents: number }>()
  for (const cls of classes.value) {
    const key = `${cls.name}|${cls.level}`
    if (!groups.has(key)) {
      groups.set(key, { name: cls.name, level: cls.level, streams: [], totalStudents: 0 })
    }
    const group = groups.get(key)!
    group.streams.push(cls)
    group.totalStudents += Number(cls.student_count) || 0
  }
  return Array.from(groups.values())
})

const selectedStream = computed<TeacherClass | null>(() => {
  if (!selectedStreamId.value) return null
  return classes.value.find(c => c.id === selectedStreamId.value) || null
})

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

const modules = computed(() => selectedStream.value ? [
  { label: 'My Classes', description: 'Classmates & class overview', to: `/teacher/preview/classes/${selectedStream.value.id}`, icon: ClassesIcon, routeNames: ['ClassmatesPreview'] },
  { label: 'eLibrary', description: 'Books available to this class', to: `/teacher/preview/library/${selectedStream.value.id}`, icon: LibraryIcon, routeNames: ['LibraryPreview'] },
  { label: 'Item Bank', description: 'Practice question sets', to: `/teacher/preview/itembank/${selectedStream.value.id}`, icon: ItemBankIcon, routeNames: ['ItemBankPreview'] },
  { label: 'Live Classes', description: 'Scheduled & past sessions', to: `/teacher/preview/live-classes/${selectedStream.value.id}`, icon: LiveClassIcon, routeNames: ['LiveClassesPreview'] },
  { label: 'Videos', description: 'Published video lessons', to: `/teacher/preview/videos/${selectedStream.value.id}`, icon: VideoIcon, routeNames: ['VideosPreview'] },
  { label: 'eNotes', description: 'Topic notes by subject', to: `/teacher/preview/enotes/${selectedStream.value.id}`, icon: ENotesIcon, routeNames: ['ENotesPreview', 'ENotesTopicPreview'] },
  { label: 'Virtual Lab', description: 'Interactive experiments', to: `/teacher/preview/virtual-lab/${selectedStream.value.id}`, icon: VirtualLabIcon, routeNames: ['VirtualLabPreview'] },
  { label: 'Assessments', description: 'Preview from your assessments list', to: '/teacher/assignments', icon: AssessmentIcon, external: true },
] : [])

const isModuleActive = (mod: { routeNames?: string[] }) => !!mod.routeNames?.includes(route.name as string)
const anyModuleActive = computed(() => modules.value.some(m => isModuleActive(m)))

const toggleModule = (mod: { to: string; routeNames?: string[] }) => {
  if (isModuleActive(mod)) {
    router.push('/teacher/preview')
  } else {
    router.push(mod.to)
  }
}

// Keep whatever module is currently open in sync with the class/stream picker above it: closing
// the drill-down closes the module too, and switching to a different stream re-opens the same
// module type against the new class instead of leaving a stale classId in the URL.
watch(selectedStream, (newStream) => {
  if (!newStream) {
    if (anyModuleActive.value) router.push('/teacher/preview')
    return
  }
  const activeMod = modules.value.find(m => isModuleActive(m))
  if (activeMod && activeMod.to !== route.path) router.push(activeMod.to)
})

const loadClasses = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_BASE}/classes`)
    if (response.data.success) {
      classes.value = response.data.data || []
    }
  } catch (error) {
    console.error('Failed to load classes:', error)
  } finally {
    loading.value = false
  }
}

// Reloading (or deep-linking to) a module URL directly - e.g. /teacher/preview/enotes/5 - should
// still show the right class/stream highlighted above it instead of an empty picker.
const initFromRoute = () => {
  const classId = Number(route.params.classId)
  if (!classId) return
  if (classes.value.some(c => c.id === classId)) {
    selectedStreamId.value = classId
  }
}

onMounted(async () => {
  await loadClasses()
  initFromRoute()
})
</script>
