<template>
  <div class="w-full">
    <PageHeader title="Videos" :description="COPY[contentRole]" icon="video" accent="violet" :active-filters="activeFilterCount">
      <template #actions>
        <button type="button" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-500/20" @click="openCreateModal">
          <AppIcon name="upload" class="w-4 h-4" />
          <span class="hidden sm:inline">Upload video</span><span class="sm:hidden">Upload</span>
        </button>
      </template>
      <template #filters>
        <div class="relative">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="search" type="search" placeholder="Search videos" class="w-full md:w-48 pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500">
        </div>
        <PickerDropdown v-if="contentRole === 'admin'" v-model="departmentFilter" label="Department" :options="departmentOptions" align="right" />
        <PickerDropdown v-model="subjectFilter" label="Subject" :options="subjectOptions" align="right" />
      </template>
      <StatStrip v-model="statusFilter" :items="statItems" hide-when-empty />
    </PageHeader>

    <p v-if="assignmentsError || optionsError" class="mb-4 text-sm text-rose-600 dark:text-rose-300">{{ assignmentsError || optionsError }}</p>

    <Skeleton v-if="loading && !videos.length" variant="cards" :count="8" />

    <EmptyState v-else-if="!videos.length" icon="video" tone="violet" title="No videos yet" message="Upload a short lesson, a practical demo or a revision clip - students can watch it any time, even save it for offline.">
      <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700" @click="openCreateModal">Upload your first video</button>
    </EmptyState>

    <template v-else>
      <!-- Class tabs: one per class (all-streams videos sit under their class) -->
      <nav v-if="classTabs.length > 2" class="flex gap-1.5 mb-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 [scrollbar-width:none]" aria-label="Classes">
        <button
          v-for="g in classTabs"
          :key="g.name"
          type="button"
          class="flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-colors"
          :class="activeClassName === g.name
            ? 'bg-violet-600 border-violet-600 text-white shadow-sm shadow-violet-500/20'
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-violet-300 dark:hover:border-violet-700'"
          @click="activeClassName = g.name"
        >
          {{ g.label }}
          <span class="px-1.5 rounded-md text-[11px] font-bold" :class="activeClassName === g.name ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'">{{ g.count }}</span>
        </button>
      </nav>

      <div v-if="visibleIds.length" class="flex items-center gap-2 mb-3">
        <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
          <input
            type="checkbox"
            :checked="bulk.allSelected(visibleIds)"
            class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-violet-600 focus:ring-violet-500"
            @change="bulk.toggleAll(visibleIds)"
          >
          Select all
        </label>
      </div>

      <BulkActionBar :count="bulk.selectedCount.value" @clear="bulk.clear()">
        <button class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" @click="bulkSetStatus('published')">Publish</button>
        <button class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" @click="bulkSetStatus('draft')">Draft</button>
        <button class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" @click="bulkSetStatus('archived')">Archive</button>
        <button class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" @click="bulkExport">Export CSV</button>
        <button class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors" @click="bulkDeleteSelected">Delete</button>
      </BulkActionBar>

      <EmptyState v-if="!activeClassSubjectShelves.length" compact icon="video" tone="gray" title="No videos match" message="Try another class, subject or status.">
        <button type="button" class="text-sm font-semibold text-violet-600 dark:text-violet-300 hover:underline" @click="clearFilters">Clear filters</button>
      </EmptyState>

      <section v-for="(shelf, i) in activeClassSubjectShelves" :key="shelf.name" class="mb-8">
        <div class="flex items-center gap-2 mb-3">
          <span class="w-1.5 h-5 rounded-full" :class="sectionAccents[i % sectionAccents.length]"></span>
          <h3 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{{ shelf.name }}</h3>
          <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ shelf.videos.length }}</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
          <VideoTile
            v-for="video in shelf.videos"
            :key="video.id"
            :video="video"
            :subtitle="audienceLabel(video)"
            show-status
            selectable
            :selected="bulk.isSelected(video.id)"
            @toggle-select="bulk.toggle(video.id)"
            @play="playVideo = video"
          >
            <template #actions>
              <button class="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Edit" @click="editVideo(video)">
                <AppIcon name="pencil" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
              <button class="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors" title="Delete" @click="deleteVideo(video.id)">
                <AppIcon name="trash" class="w-4 h-4 text-red-500 dark:text-red-400" />
              </button>
            </template>
            <template #footer>
              <p v-if="contentRole !== 'teacher' && video.uploader_name" class="mt-1 text-[11px] text-gray-400 dark:text-gray-500 truncate">By {{ video.uploader_name }}</p>
              <!-- Published: how far the class has got, opening the full list -->
              <p v-if="video.status === 'published' && !video.audience" class="mt-1.5 text-[11px] text-gray-400">No students in this class yet</p>
              <button v-else-if="video.status === 'published'" type="button" class="mt-1.5 w-full text-left group/w" :title="'See who has watched'" @click="viewersFor = video">
                <span class="flex items-center gap-2">
                  <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <span class="block h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" :style="{ width: reach(video) + '%' }"></span>
                  </span>
                  <span class="text-[11px] font-semibold tabular-nums text-gray-500 dark:text-gray-400">{{ reach(video) }}%</span>
                </span>
                <span class="block text-[11px] text-gray-500 dark:text-gray-400 group-hover/w:text-violet-600 dark:group-hover/w:text-violet-300">
                  {{ video.viewers || 0 }} of {{ video.audience || 0 }} watched<template v-if="video.completed"> · {{ video.completed }} finished</template>
                </span>
              </button>
              <p v-else-if="video.status === 'draft'" class="mt-1.5 flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                Students can't see it yet
                <button type="button" class="font-semibold text-violet-600 dark:text-violet-300 hover:underline" @click="publishOne(video)">Publish</button>
              </p>
            </template>
          </VideoTile>
        </div>
      </section>
    </template>

    <!-- Upload/Edit Modal -->
    <div v-if="showVideoModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ editingVideo ? 'Edit Video' : 'Upload Video' }}
          </h3>
          <button @click="closeVideoModal" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6">
          <form @submit.prevent="saveVideo">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
              <input
                v-model="videoForm.title"
                type="text"
                required
                placeholder="Enter video title..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                v-model="videoForm.description"
                rows="3"
                placeholder="Enter a short description..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            <div v-if="contentRole === 'admin'" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department *</label>
              <select
                v-model="videoForm.department_id"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                @change="onFormDepartmentChange"
              >
                <option value="">Select Department</option>
                <option v-for="d in contentOptions?.departments || []" :key="d.id" :value="String(d.id)">{{ d.name }}</option>
              </select>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                <select
                  v-model="videoForm.subject_id"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  :disabled="!subjectChoices.length"
                >
                  <option value="">Select Subject</option>
                  <option v-for="subject in subjectChoices" :key="subject.id" :value="String(subject.id)">{{ subject.name }}</option>
                </select>
                <p v-if="!subjectChoices.length" class="text-xs text-red-600 dark:text-red-400 mt-1">
                  {{ contentRole === 'admin' ? (videoForm.department_id ? 'This department has no subjects yet.' : 'Choose the department first.') : 'No subjects available. Please ensure you are assigned to a department with subjects.' }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ contentRole === 'teacher' ? 'Class *' : 'Who is it for? *' }}</label>
                <TeacherClassSelector v-if="contentRole === 'teacher'" v-model="videoForm.classTarget" />
                <template v-else>
                  <DepartmentAudiencePicker v-model="videoForm.classTarget" :levels="formDepartment?.levels || []" :disabled="!formDepartment" />
                  <p v-if="formDepartment && missingLevels.length" class="mt-1 text-[11px] text-amber-700 dark:text-amber-300">
                    No {{ missingLevels.join(', ') }} learners are enrolled in {{ formDepartment.name }} yet{{ contentRole === 'admin' ? ' - enrol them (Dashboard → Enrol students) and those classes appear here' : '' }}.
                  </p>
                </template>
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select
                v-model="videoForm.status"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div v-if="!editingVideo" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Video file *</label>
              <label
                class="flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-xl border-2 border-dashed cursor-pointer text-center transition-colors"
                :class="dragging ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20' : videoForm.file ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/60 dark:bg-emerald-900/10' : 'border-gray-300 dark:border-gray-600 hover:border-violet-400 dark:hover:border-violet-600'"
                @dragover.prevent="dragging = true"
                @dragleave.prevent="dragging = false"
                @drop.prevent="onDrop"
              >
                <input type="file" accept="video/mp4,video/webm,video/ogg,video/quicktime" class="sr-only" @change="handleFileSelect">
                <span class="w-11 h-11 rounded-xl flex items-center justify-center" :class="videoForm.file ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300'">
                  <AppIcon :name="videoForm.file ? 'video' : 'upload'" class="w-5 h-5" />
                </span>
                <template v-if="videoForm.file">
                  <span class="text-sm font-semibold text-gray-900 dark:text-white break-all">{{ videoForm.file.name }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ fileSize(videoForm.file.size) }} · tap to choose another</span>
                </template>
                <template v-else>
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">Drop a video here, or tap to choose</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">MP4, WebM, OGG or MOV, up to 300MB</span>
                </template>
              </label>
            </div>
            <p v-else class="text-xs text-gray-500 dark:text-gray-400 mb-4">
              The video file can't be replaced here - delete this video and upload a new one if you need to change it.
            </p>

            <div v-if="uploading" class="mb-4">
              <div class="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div class="h-full bg-indigo-600 transition-all" :style="{ width: uploadProgress + '%' }"></div>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Uploading... {{ uploadProgress }}%</p>
            </div>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="closeVideoModal"
                class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? 'Saving...' : (editingVideo ? 'Update Video' : 'Upload') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Player -->
    <VideoPlayerModal v-if="playVideo" :video="playVideo" @close="playVideo = null" />
    <AudiencePanel v-if="viewersFor" :title="viewersFor.title" :endpoint="`${contentApi}/${viewersFor.id}/viewers`" :subtitle="`${audienceLabel(viewersFor)} · ${viewersFor.subject_name || ''}`" @close="viewersFor = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import PickerDropdown, { type PickerOption } from '@/components/common/PickerDropdown.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import AudiencePanel from '@/components/common/AudiencePanel.vue'
import VideoPlayerModal from '@/components/video/VideoPlayerModal.vue'
import TeacherClassSelector from '@/components/teacher/TeacherClassSelector.vue'
import DepartmentAudiencePicker from '@/components/library/DepartmentAudiencePicker.vue'
import { useContentRole, currentContentRole } from '@/composables/useContentRole'
import BulkActionBar from '@/components/common/BulkActionBar.vue'
import VideoTile from '@/components/video/VideoTile.vue'
import { orderShelves } from '@/utils/shelfOrder'
import type { VideoResource, VideoForm } from '@/types/video'
import type { ENoteAssignments } from '@/types/enotes'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { useBulkSelection } from '@/composables/useBulkSelection'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { downloadBlob } from '@/utils/downloadBlob'

const toast = useToastStore()
const confirmDialog = useConfirmStore()
const bulk = useBulkSelection<number>()

const API_BASE = '/api'

const videos = ref<VideoResource[]>([])
const assignments = ref<ENoteAssignments | null>(null)
const assignmentsError = ref<string | null>(null)
const loading = ref(false)
const saving = ref(false)
const uploading = ref(false)
const uploadProgress = ref(0)

const statusFilter = usePersistedRef<string | null>(`${currentContentRole()}-videos:status`, null)
const subjectFilter = usePersistedRef<string>(`${currentContentRole()}-videos:subject`, '')
const search = ref('')
const dragging = ref(false)
const viewersFor = ref<VideoResource | null>(null)

const showVideoModal = ref(false)
const editingVideo = ref<VideoResource | null>(null)
const playVideo = ref<VideoResource | null>(null)
const videoForm = ref<VideoForm>({
  title: '',
  description: '',
  subject_id: '',
  classTarget: { scope: 'stream', class_id: null, class_group_name: null },
  status: 'draft',
  file: null
})

// The same page for a teacher (their own), a HOD (the department's) and an admin (the school's,
// adding into any department) - see useContentRole
const { role: contentRole, api: contentApi, options: contentOptions, optionsError, loadOptions, departmentFilter, departmentOptions, formDepartment, subjectChoices, missingLevels } =
  useContentRole('videos', videoForm, () => assignments.value?.subjects ?? [])
const COPY = {
  teacher: 'Short lessons and demos for your classes - see who has watched them.',
  hod: "Your department's videos - yours and your teachers' - for the whole department, a class or one stream.",
  admin: "The school's videos, in every department - upload one and choose the department and who it's for."
}
const onFormDepartmentChange = () => {
  videoForm.value.subject_id = ''
  videoForm.value.classTarget = { scope: 'department', class_id: null, class_group_name: null }
}

const stats = computed(() => ({
  total: videos.value.length,
  draft: videos.value.filter(v => v.status === 'draft').length,
  published: videos.value.filter(v => v.status === 'published').length,
  archived: videos.value.filter(v => v.status === 'archived').length
}))

const statItems = computed<StatItem[]>(() => [
  { label: 'All videos', value: stats.value.total, tone: 'gray' },
  { label: 'Published', value: stats.value.published, key: 'published', tone: 'emerald' },
  { label: 'Draft', value: stats.value.draft, key: 'draft', tone: 'amber' },
  { label: 'Archived', value: stats.value.archived, key: 'archived', tone: 'gray' }
])
// A teacher's subjects; for a HOD or admin, the subjects their items are in
const subjectOptions = computed<PickerOption<string>[]>(() => {
  const subjects = contentRole === 'teacher'
    ? (assignments.value?.subjects ?? []).map(s => ({ id: s.id, name: s.name }))
    : [...new Map(videos.value.filter(i => i.subject_id && (!departmentFilter.value || String(i.department_id) === departmentFilter.value)).map(i => [i.subject_id, { id: i.subject_id as number, name: i.subject_name || '' }])).values()].sort((a, b) => a.name.localeCompare(b.name))
  return [{ value: '', label: 'All subjects' }, ...subjects.map(s => ({ value: String(s.id), label: s.name }))]
})
const activeFilterCount = computed(() => (subjectFilter.value ? 1 : 0) + (departmentFilter.value ? 1 : 0) + (search.value.trim() ? 1 : 0))

const filteredVideos = computed(() => {
  const q = search.value.trim().toLowerCase()
  return videos.value.filter(video => {
    const matchesStatus = !statusFilter.value || video.status === statusFilter.value
    const matchesSubject = !subjectFilter.value || video.subject_id === parseInt(subjectFilter.value)
    if (departmentFilter.value && String(video.department_id) !== departmentFilter.value) return false
    const matchesSearch = !q || video.title.toLowerCase().includes(q) || (video.description || '').toLowerCase().includes(q)
    return matchesStatus && matchesSubject && matchesSearch
  })
})

// One tab per class ("All Streams" videos under their class), then one shelf per subject.
// A class is always open - the last one used, or the first - with "All" beside them.
const ALL = '__all'
const classOf = (video: VideoResource) => video.class_group_name || video.class_name || 'Whole department'
const activeClassName = usePersistedRef<string>(`${currentContentRole()}-videos:class`, '')
const classTabs = computed(() => {
  const names = [...new Set(videos.value.map(classOf))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  return [
    { name: ALL, label: 'All classes', count: filteredVideos.value.length },
    ...names.map(name => ({ name, label: name, count: filteredVideos.value.filter(v => classOf(v) === name).length }))
  ]
})
watch(classTabs, (tabs) => {
  if (!videos.value.length) return
  if (!tabs.some(t => t.name === activeClassName.value)) activeClassName.value = tabs[1]?.name ?? ALL
}, { immediate: true })

const activeClassVideos = computed(() => activeClassName.value === ALL
  ? filteredVideos.value
  : filteredVideos.value.filter(v => classOf(v) === activeClassName.value))

const audienceLabel = (video: VideoResource) => {
  const who = video.class_group_name
    ? `${video.class_group_name} (All Streams)`
    : video.class_stream_name ? `${video.class_name}-${video.class_stream_name}` : (video.class_name || 'Whole department')
  return contentRole === 'admin' && video.department_name && video.department_name !== video.subject_name ? `${video.department_name} · ${who}` : who
}
// Share of the class that has opened it
const reach = (video: VideoResource) => video.audience ? Math.min(100, Math.round(((video.viewers || 0) / video.audience) * 100)) : 0
const fileSize = (bytes: number) => bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`

const activeClassSubjectShelves = computed(() => {
  const map = new Map<string, VideoResource[]>()
  activeClassVideos.value.forEach(video => {
    const name = video.subject_name || 'Other'
    if (!map.has(name)) map.set(name, [])
    map.get(name)!.push(video)
  })
  return orderShelves(Array.from(map, ([name, videos]) => ({ name, videos })), g => g.videos)
})

const sectionAccents = ['bg-indigo-500', 'bg-rose-500', 'bg-emerald-500', 'bg-amber-500', 'bg-sky-500', 'bg-violet-500']

const visibleIds = computed(() => activeClassVideos.value.map(v => v.id))

const bulkSetStatus = async (status: 'draft' | 'published' | 'archived') => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  try {
    await axios.post(`${contentApi}/bulk-status`, { ids, status })
    toast.success(`${ids.length} video(s) updated`)
    bulk.clear()
    await loadVideos()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to update videos')
  }
}

const publishOne = async (video: VideoResource) => {
  try {
    await axios.post(`${contentApi}/bulk-status`, { ids: [video.id], status: 'published' })
    toast.success(`"${video.title}" is now visible to students`)
    await loadVideos()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to publish video')
  }
}

const bulkDeleteSelected = async () => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  if (!await confirmDialog.open({ title: 'Delete videos', message: `Are you sure you want to delete ${ids.length} video(s)? This cannot be undone.`, confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.post(`${contentApi}/bulk-delete`, { ids })
    toast.success(`${ids.length} video(s) deleted`)
    bulk.clear()
    await loadVideos()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to delete videos')
  }
}

const bulkExport = async () => {
  const ids = bulk.selectedArray()
  try {
    const response = await axios.post(`${contentApi}/bulk-export`, { ids }, { responseType: 'blob' })
    downloadBlob(response.data, 'videos.csv')
  } catch (error) {
    toast.error('Failed to export videos')
  }
}

const clearFilters = () => {
  statusFilter.value = null
  subjectFilter.value = ''
  search.value = ''
}

const loadVideos = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${contentApi}`)
    if (response.data.success) {
      videos.value = response.data.data.videos || []
    }
  } catch (error) {
    console.error('Failed to load videos:', error)
  } finally {
    loading.value = false
  }
}

const loadAssignments = async () => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/enotes/assignments`)
    if (response.data.success) {
      assignments.value = response.data.data
      assignmentsError.value = null
    } else {
      assignmentsError.value = response.data.message || 'Failed to load assignments'
    }
  } catch (error: any) {
    assignmentsError.value = error.response?.data?.message || 'Failed to load assignments. Please ensure you are assigned to a department.'
  }
}

const openCreateModal = () => {
  editingVideo.value = null
  // The subject on view is the likely one
  videoForm.value = { title: '', description: '', subject_id: subjectFilter.value, department_id: contentRole === 'admin' ? departmentFilter.value : '', classTarget: contentRole === 'teacher' ? { scope: 'stream', class_id: null, class_group_name: null } : { scope: 'department', class_id: null, class_group_name: null }, status: 'draft', file: null }
  showVideoModal.value = true
}

const editVideo = (video: VideoResource) => {
  editingVideo.value = video
  videoForm.value = {
    title: video.title,
    description: video.description || '',
    subject_id: video.subject_id?.toString() || '',
    department_id: video.department_id ? String(video.department_id) : '',
    classTarget: video.class_group_name
      ? { scope: 'all_streams', class_id: null, class_group_name: video.class_group_name }
      : video.class_id ? { scope: 'stream', class_id: video.class_id, class_group_name: null } : { scope: 'department', class_id: null, class_group_name: null },
    status: video.status,
    file: null
  }
  showVideoModal.value = true
}

const closeVideoModal = () => {
  showVideoModal.value = false
  editingVideo.value = null
}

// A chosen file names the video too, if the teacher hasn't typed a title yet
const pickFile = (file: File | null) => {
  videoForm.value.file = file
  if (file && !videoForm.value.title.trim()) {
    videoForm.value.title = file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim()
  }
}
const handleFileSelect = (event: Event) => pickFile((event.target as HTMLInputElement).files?.[0] || null)
const onDrop = (event: DragEvent) => {
  dragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('video/')) pickFile(file)
  else if (file) toast.warning('That file isn\'t a video')
}

const saveVideo = async () => {
  try {
    saving.value = true

    if (editingVideo.value) {
      await axios.put(`${contentApi}/${editingVideo.value.id}`, {
        title: videoForm.value.title,
        description: videoForm.value.description,
        subject_id: videoForm.value.subject_id,
        ...(contentRole === 'admin' ? { department_id: videoForm.value.department_id } : {}),
        scope: videoForm.value.classTarget.scope,
        class_id: videoForm.value.classTarget.class_id,
        class_group_name: videoForm.value.classTarget.class_group_name,
        status: videoForm.value.status
      })
    } else {
      if (!videoForm.value.file) {
        toast.warning('Please select a video file')
        return
      }
      const formData = new FormData()
      formData.append('title', videoForm.value.title)
      formData.append('description', videoForm.value.description)
      formData.append('subject_id', videoForm.value.subject_id)
      if (contentRole === 'admin') formData.append('department_id', videoForm.value.department_id || '')
      formData.append('scope', videoForm.value.classTarget.scope)
      if (videoForm.value.classTarget.class_id !== null) formData.append('class_id', String(videoForm.value.classTarget.class_id))
      if (videoForm.value.classTarget.class_group_name !== null) formData.append('class_group_name', videoForm.value.classTarget.class_group_name)
      formData.append('status', videoForm.value.status)
      formData.append('file', videoForm.value.file)

      uploading.value = true
      uploadProgress.value = 0
      await axios.post(`${contentApi}`, formData, {
        onUploadProgress: (event) => {
          if (event.total) uploadProgress.value = Math.round((event.loaded * 100) / event.total)
        }
      })
    }

    closeVideoModal()
    await loadVideos()
  } catch (error: any) {
    console.error('Failed to save video:', error)
    toast.error(error.response?.data?.message || 'Failed to save video')
  } finally {
    saving.value = false
    uploading.value = false
  }
}

const deleteVideo = async (id: number) => {
  if (!await confirmDialog.open({ title: 'Delete video', message: 'Are you sure you want to delete this video?', confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.delete(`${contentApi}/${id}`)
    await loadVideos()
    toast.success('Video deleted')
  } catch (error) {
    console.error('Failed to delete video:', error)
    toast.error('Failed to delete video. Please try again.')
  }
}

onMounted(async () => {
  await Promise.all([loadVideos(), contentRole === 'teacher' ? loadAssignments() : loadOptions()])
})
</script>
