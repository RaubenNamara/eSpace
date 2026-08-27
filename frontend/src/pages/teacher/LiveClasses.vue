<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 via-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20 flex-shrink-0">
        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">Live Classes</h1>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">Host real-time video sessions with BigBlueButton</p>
      </div>
    </div>

    <div v-if="!bbbConfigured" class="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
      <svg class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p class="text-sm text-amber-800 dark:text-amber-200">
        BigBlueButton isn't configured yet. You can schedule classes, but starting/joining won't work until a server URL and secret are set in the backend.
      </p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">Total</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ stats.total }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">Scheduled</p>
        <p class="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{{ stats.scheduled }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div v-if="stats.started > 0" class="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
        <p class="text-sm text-gray-500 dark:text-gray-400">Live Now</p>
        <p class="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{{ stats.started }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">Ended</p>
        <p class="text-2xl font-bold text-gray-600 dark:text-gray-400 mt-1">{{ stats.ended }}</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
      <select v-model="statusFilter" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white">
        <option value="">All Status</option>
        <option value="scheduled">Scheduled</option>
        <option value="started">Live Now</option>
        <option value="ended">Ended</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-gradient-to-r from-rose-600 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm shadow-red-500/20"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Schedule Class</span>
      </button>
    </div>

    <!-- Classes -->
    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading live classes...</p>
    </div>

    <div v-else-if="filteredClasses.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      </div>
      <p class="text-gray-600 dark:text-gray-400 mb-4">{{ classes.length === 0 ? 'No live classes scheduled yet' : 'No classes match this filter' }}</p>
      <button v-if="classes.length === 0" @click="openCreateModal" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
        Schedule Your First Class
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="cls in filteredClasses"
        :key="cls.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border transition-shadow hover:shadow-md"
        :class="cls.status === 'started' ? 'border-red-300 dark:border-red-800 ring-1 ring-red-100 dark:ring-red-900/40' : 'border-gray-200 dark:border-gray-700'"
      >
        <div class="p-5">
          <div class="flex items-start justify-between mb-3 gap-2">
            <h3 class="text-base font-semibold text-gray-900 dark:text-white line-clamp-2">{{ cls.title }}</h3>
            <span
              class="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0"
              :class="statusBadge(cls.status)"
            >
              <span v-if="cls.status === 'started'" class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              {{ statusLabel(cls.status) }}
            </span>
          </div>

          <p v-if="cls.description" class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ cls.description }}</p>

          <div class="flex flex-wrap items-center gap-2 mb-3">
            <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300">
              {{ cls.subject_name || 'Unknown Subject' }}
            </span>
            <span v-if="cls.class_group_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              {{ cls.class_group_name }} (All Streams)
            </span>
            <span v-else-if="cls.class_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {{ cls.class_name }}{{ cls.class_stream_name ? ' - ' + cls.class_stream_name : '' }}
            </span>
          </div>

          <div class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-4">
            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {{ formatSchedule(cls.scheduled_start, cls.scheduled_end) }}
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <template v-if="cls.status === 'scheduled'">
              <button @click="startClass(cls)" :disabled="actingId === cls.id" class="btn-primary">
                {{ actingId === cls.id ? 'Starting...' : 'Start' }}
              </button>
              <button @click="editClass(cls)" class="btn-secondary">Edit</button>
              <button @click="deleteClass(cls.id)" class="btn-danger">Delete</button>
            </template>
            <template v-else-if="cls.status === 'started'">
              <button @click="joinClass(cls)" :disabled="actingId === cls.id" class="btn-live">
                Join Now
              </button>
              <button @click="openAttendance(cls)" class="btn-secondary">Attendance</button>
              <button @click="endClass(cls)" :disabled="actingId === cls.id" class="btn-secondary">
                {{ actingId === cls.id ? 'Ending...' : 'End' }}
              </button>
            </template>
            <template v-else-if="cls.status === 'ended'">
              <button @click="openAttendance(cls)" class="btn-secondary">Attendance</button>
              <button v-if="cls.is_recorded" @click="openRecordings(cls)" class="btn-secondary">Recordings</button>
              <button @click="deleteClass(cls.id)" class="btn-danger">Delete</button>
            </template>
            <template v-else>
              <button @click="deleteClass(cls.id)" class="btn-danger">Delete</button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Schedule/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ editingClass ? 'Edit Live Class' : 'Schedule Live Class' }}
          </h3>
          <button @click="closeModal" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6">
          <form @submit.prevent="saveClass">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
              <input
                v-model="form.title"
                type="text"
                required
                placeholder="e.g. Algebra Revision Session"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
              >
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                v-model="form.description"
                rows="2"
                placeholder="What will this session cover?"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                <select
                  v-model="form.subject_id"
                  required
                  :disabled="!!editingClass"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white disabled:opacity-60"
                >
                  <option value="">Select Subject</option>
                  <option v-for="subject in assignments?.subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Class *</label>
                <TeacherClassSelector
                  v-model="form.classTarget"
                  :disabled="!!editingClass"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start *</label>
                <input
                  v-model="form.scheduled_start"
                  type="datetime-local"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End *</label>
                <input
                  v-model="form.scheduled_end"
                  type="datetime-local"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
            </div>

            <label class="flex items-center gap-2 mb-6 cursor-pointer">
              <input v-model="form.is_recorded" type="checkbox" class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500">
              <span class="text-sm text-gray-700 dark:text-gray-300">Record this session</span>
            </label>

            <div class="flex justify-end gap-3">
              <button type="button" @click="closeModal" class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-gradient-to-r from-rose-600 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {{ saving ? 'Saving...' : (editingClass ? 'Update' : 'Schedule') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Recordings Modal -->
    <div v-if="recordingsClass" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">Recordings · {{ recordingsClass.title }}</h3>
          <button @click="recordingsClass = null" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-6">
          <div v-if="loadingRecordings" class="text-center py-8 text-gray-500">Loading recordings...</div>
          <div v-else-if="recordings.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            No recordings available for this session yet.
          </div>
          <div v-else class="space-y-2">
            <a
              v-for="rec in recordings"
              :key="rec.record_id"
              :href="rec.playback_url || '#'"
              target="_blank"
              rel="noopener"
              class="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ formatDate(rec.start_time) }}</span>
              <svg class="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Attendance Modal -->
    <div v-if="attendanceClass" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div class="min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">Attendance · {{ attendanceClass.title }}</h3>
            <p v-if="liveParticipantCount !== null" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {{ liveParticipantCount }} currently in the meeting
            </p>
          </div>
          <button @click="attendanceClass = null" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-6">
          <div v-if="loadingAttendance" class="text-center py-8 text-gray-500">Loading attendance...</div>
          <div v-else-if="attendance.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            No students have joined yet.
          </div>
          <div v-else class="space-y-2">
            <div
              v-for="row in attendance"
              :key="row.student_id"
              class="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div class="min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ row.first_name }} {{ row.last_name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Joined {{ formatDate(row.join_time) }}
                  <span v-if="row.duration_minutes !== null"> · {{ row.duration_minutes }} min</span>
                </p>
              </div>
              <span
                class="px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0"
                :class="row.attendance_status === 'left_early' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'"
              >
                {{ row.attendance_status === 'left_early' ? 'Left early' : (row.leave_time ? 'Present' : 'In meeting') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import type { LiveClass, LiveClassForm, LiveClassRecording, LiveClassAttendanceRow } from '@/types/liveclass'
import type { ENoteAssignments } from '@/types/enotes'
import TeacherClassSelector from '@/components/teacher/TeacherClassSelector.vue'

const API_BASE = '/api'

const classes = ref<LiveClass[]>([])
const assignments = ref<ENoteAssignments | null>(null)
const loading = ref(false)
const saving = ref(false)
const actingId = ref<number | null>(null)
const bbbConfigured = ref(true)

const statusFilter = ref('')

const showModal = ref(false)
const editingClass = ref<LiveClass | null>(null)
const form = ref<LiveClassForm>(blankForm())

const recordingsClass = ref<LiveClass | null>(null)
const recordings = ref<LiveClassRecording[]>([])
const loadingRecordings = ref(false)

const attendanceClass = ref<LiveClass | null>(null)
const attendance = ref<LiveClassAttendanceRow[]>([])
const liveParticipantCount = ref<number | null>(null)
const loadingAttendance = ref(false)

function blankForm(): LiveClassForm {
  return {
    title: '', description: '', subject_id: '',
    classTarget: { scope: 'stream', class_id: null, class_group_name: null },
    scheduled_start: '', scheduled_end: '', is_recorded: false
  }
}

const stats = computed(() => ({
  total: classes.value.length,
  scheduled: classes.value.filter(c => c.status === 'scheduled').length,
  started: classes.value.filter(c => c.status === 'started').length,
  ended: classes.value.filter(c => c.status === 'ended').length
}))

const filteredClasses = computed(() => {
  if (!statusFilter.value) return classes.value
  return classes.value.filter(c => c.status === statusFilter.value)
})

const statusLabel = (status: string) => {
  if (status === 'started') return 'LIVE'
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const statusBadge = (status: string) => {
  if (status === 'started') return 'bg-red-500 text-white'
  if (status === 'scheduled') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  if (status === 'ended') return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
  return 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
}

const formatSchedule = (start: string, end: string) => {
  const s = new Date(start)
  const e = new Date(end)
  const dateStr = s.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const startTime = s.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const endTime = e.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${dateStr} · ${startTime} - ${endTime}`
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}

const toDatetimeLocal = (iso: string) => {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const loadClasses = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${API_BASE}/teacher/live-classes`)
    if (response.data.success) {
      classes.value = response.data.data.classes || []
    }
  } catch (error) {
    console.error('Failed to load live classes:', error)
  } finally {
    loading.value = false
  }
}

const loadAssignments = async () => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/enotes/assignments`)
    if (response.data.success) {
      assignments.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to load assignments:', error)
  }
}

const openCreateModal = () => {
  editingClass.value = null
  form.value = blankForm()
  showModal.value = true
}

const editClass = (cls: LiveClass) => {
  editingClass.value = cls
  form.value = {
    title: cls.title,
    description: cls.description || '',
    subject_id: cls.subject_id?.toString() || '',
    classTarget: cls.class_group_name
      ? { scope: 'all_streams', class_id: null, class_group_name: cls.class_group_name }
      : { scope: 'stream', class_id: cls.class_id, class_group_name: null },
    scheduled_start: toDatetimeLocal(cls.scheduled_start),
    scheduled_end: toDatetimeLocal(cls.scheduled_end),
    is_recorded: !!cls.is_recorded
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingClass.value = null
}

const saveClass = async () => {
  try {
    saving.value = true

    if (editingClass.value) {
      await axios.put(`${API_BASE}/teacher/live-classes/${editingClass.value.id}`, {
        title: form.value.title,
        description: form.value.description,
        scheduled_start: form.value.scheduled_start,
        scheduled_end: form.value.scheduled_end,
        is_recorded: form.value.is_recorded
      })
    } else {
      await axios.post(`${API_BASE}/teacher/live-classes`, {
        title: form.value.title,
        description: form.value.description,
        subject_id: form.value.subject_id,
        scope: form.value.classTarget.scope,
        class_id: form.value.classTarget.class_id,
        class_group_name: form.value.classTarget.class_group_name,
        scheduled_start: form.value.scheduled_start,
        scheduled_end: form.value.scheduled_end,
        is_recorded: form.value.is_recorded
      })
    }

    closeModal()
    await loadClasses()
  } catch (error: any) {
    console.error('Failed to save live class:', error)
    alert(error.response?.data?.message || 'Failed to save live class')
  } finally {
    saving.value = false
  }
}

const startClass = async (cls: LiveClass) => {
  actingId.value = cls.id
  try {
    await axios.post(`${API_BASE}/teacher/live-classes/${cls.id}/start`)
    await loadClasses()
  } catch (error: any) {
    bbbConfigured.value = !(error.response?.status === 502)
    alert(error.response?.data?.message || 'Failed to start the class')
  } finally {
    actingId.value = null
  }
}

const endClass = async (cls: LiveClass) => {
  if (!confirm('End this live class for everyone?')) return
  actingId.value = cls.id
  try {
    await axios.post(`${API_BASE}/teacher/live-classes/${cls.id}/end`)
    await loadClasses()
  } catch (error: any) {
    alert(error.response?.data?.message || 'Failed to end the class')
  } finally {
    actingId.value = null
  }
}

const joinClass = async (cls: LiveClass) => {
  actingId.value = cls.id
  try {
    const response = await axios.post(`${API_BASE}/teacher/live-classes/${cls.id}/join`)
    if (response.data.success) {
      window.open(response.data.data.join_url, '_blank')
    }
  } catch (error: any) {
    bbbConfigured.value = !(error.response?.status === 502)
    alert(error.response?.data?.message || 'Failed to join the class')
  } finally {
    actingId.value = null
  }
}

const deleteClass = async (id: number) => {
  if (!confirm('Delete this live class?')) return
  try {
    await axios.delete(`${API_BASE}/teacher/live-classes/${id}`)
    await loadClasses()
  } catch (error: any) {
    alert(error.response?.data?.message || 'Failed to delete the class')
  }
}

const openRecordings = async (cls: LiveClass) => {
  recordingsClass.value = cls
  recordings.value = []
  loadingRecordings.value = true
  try {
    const response = await axios.get(`${API_BASE}/teacher/live-classes/${cls.id}/recordings`)
    if (response.data.success) {
      recordings.value = response.data.data.recordings || []
    }
  } catch (error) {
    console.error('Failed to load recordings:', error)
  } finally {
    loadingRecordings.value = false
  }
}

const openAttendance = async (cls: LiveClass) => {
  attendanceClass.value = cls
  attendance.value = []
  liveParticipantCount.value = null
  loadingAttendance.value = true
  try {
    const response = await axios.get(`${API_BASE}/teacher/live-classes/${cls.id}/attendance`)
    if (response.data.success) {
      attendance.value = response.data.data.attendance || []
      liveParticipantCount.value = response.data.data.live_participant_count ?? null
    }
  } catch (error) {
    console.error('Failed to load attendance:', error)
  } finally {
    loadingAttendance.value = false
  }
}

onMounted(async () => {
  await Promise.all([loadClasses(), loadAssignments()])
})
</script>

<style scoped>
.btn-primary {
  @apply px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors disabled:opacity-50;
}
.btn-secondary {
  @apply px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50;
}
.btn-danger {
  @apply px-3 py-1.5 rounded-lg text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors;
}
.btn-live {
  @apply px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-500 text-white text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-sm shadow-red-500/30 animate-pulse;
}
</style>
