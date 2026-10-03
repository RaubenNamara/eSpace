<template>
  <!-- Student View: any of the teacher's class streams exactly as its students see it, one module
       at a time - the stream and module are remembered, so it opens straight onto the last view -->
  <div class="w-full">
    <PageHeader title="Student View" description="See your classes exactly as your students do." icon="teacher">
      <template #filters>
        <PickerDropdown v-if="streamOptions.length" v-model="selectedStreamId" label="Class" :options="streamOptions" align="right" />
      </template>
    </PageHeader>

    <Skeleton v-if="loading" variant="cards" :count="3" />
    <EmptyState v-else-if="classes.length === 0" icon="users" title="No classes yet" message="Classes appear here once students are enrolled in your department." />

    <template v-else-if="selectedStream">
      <!-- Whose eyes these are -->
      <div class="mb-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-3 flex items-center gap-3 shadow-sm">
        <div class="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
        </div>
        <p class="flex-1 min-w-0 text-sm leading-snug">
          You're seeing exactly what students in <span class="font-bold">{{ streamLabel(selectedStream) }}</span> see
          <span class="text-indigo-100">· {{ selectedStream.student_count }} students</span>
          <span class="block text-xs text-indigo-100">Read-only - nothing you do here changes real data.</span>
        </p>
      </div>

      <!-- Modules -->
      <nav class="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4 overflow-x-auto [scrollbar-width:none]" aria-label="Modules">
        <template v-for="mod in modules" :key="mod.label">
          <RouterLink
            v-if="mod.external"
            :to="mod.to"
            class="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            :title="mod.description"
          >
            <component :is="mod.icon" class="w-4 h-4" />
            {{ mod.label }}
            <svg class="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </RouterLink>
          <button
            v-else
            type="button"
            class="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors"
            :class="isModuleActive(mod) ? 'bg-white dark:bg-gray-700 text-indigo-700 dark:text-indigo-200 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'"
            :title="mod.description"
            @click="openModule(mod)"
          >
            <component :is="mod.icon" class="w-4 h-4" />
            {{ mod.label }}
          </button>
        </template>
      </nav>

      <!-- The open module, rendered in place via the nested route under /teacher/preview -->
      <router-view />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import PickerDropdown, { type PickerOption } from '@/components/common/PickerDropdown.vue'
import { usePersistedRef } from '@/composables/usePersistedRef'

interface TeacherClass {
  id: number
  name: string
  level: string
  stream_name: string | null
  student_count: number
  // A stream this teacher teaches (has published work for)
  mine: boolean
}

const API_BASE = '/api/teacher'

const route = useRoute()
const router = useRouter()

const classes = ref<TeacherClass[]>([])
// The stream and module on view - both remembered, so the page reopens where the teacher left it
const selectedStreamId = usePersistedRef<number | null>('preview:stream', null)
const lastModule = usePersistedRef<string>('preview:module', 'eNotes')
const loading = ref(false)

const streamLabel = (c: TeacherClass) => `${c.name}${c.stream_name ? `-${c.stream_name}` : ''}`
const streamOptions = computed<PickerOption<number>[]>(() => [...classes.value]
  .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }) || String(a.stream_name).localeCompare(String(b.stream_name)))
  .map(c => ({ value: c.id, label: streamLabel(c), hint: c.mine ? 'yours' : `${c.student_count}` })))

const selectedStream = computed<TeacherClass | null>(() => classes.value.find(c => c.id === selectedStreamId.value) || null)

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

const openModule = (mod: { label: string; to: string }) => {
  lastModule.value = mod.label
  router.push(mod.to)
}

// With a stream chosen and no module open, open the last one used (eNotes to begin with)
const openDefaultModule = () => {
  if (!selectedStream.value || anyModuleActive.value) return
  const mod = modules.value.find(m => m.label === lastModule.value && !m.external) ?? modules.value.find(m => !m.external)
  if (mod) router.replace(mod.to)
}

// Keep whatever module is currently open in sync with the class/stream picker above it: closing
// the drill-down closes the module too, and switching to a different stream re-opens the same
// module type against the new class instead of leaving a stale classId in the URL.
watch(selectedStream, (newStream) => {
  if (!newStream) return
  const activeMod = modules.value.find(m => isModuleActive(m))
  if (activeMod && activeMod.to !== route.path) router.push(activeMod.to)
  else openDefaultModule()
})
// Back on /teacher/preview itself (e.g. the sidebar link): reopen the module
watch(() => route.name, (name) => { if (name === 'StudentPreview') openDefaultModule() })

const loadClasses = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_BASE}/classes/overview`)
    if (response.data.success) {
      classes.value = (response.data.data.streams || []).map((s: any) => ({
        id: s.id, name: s.name, level: s.level, stream_name: s.stream_name, student_count: s.students, mine: !!s.mine
      }))
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
  if (classId && classes.value.some(c => c.id === classId)) {
    selectedStreamId.value = classId
  } else if (!selectedStream.value) {
    // The remembered stream isn't there any more (or first visit): the first one the teacher teaches
    const firstMine = streamOptions.value.find(o => classes.value.find(c => c.id === o.value)?.mine)
    selectedStreamId.value = (firstMine ?? streamOptions.value[0])?.value ?? null
  }
  openDefaultModule()
}

onMounted(async () => {
  await loadClasses()
  initFromRoute()
})
</script>
