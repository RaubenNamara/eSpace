<template>
  <div>
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 via-red-500 to-orange-500 flex items-center justify-center shadow-sm flex-shrink-0">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">Live Classes</h1>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">Oversight of live sessions run by your department's teachers</p>
      </div>
    </div>

    <!-- Dashboard summary -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div v-if="summary.live_now > 0" class="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
        <p class="text-sm text-gray-500 dark:text-gray-400">Live Now</p>
        <p class="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{{ summary.live_now }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">Upcoming Today</p>
        <p class="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{{ summary.upcoming_today }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">Completed Today</p>
        <p class="text-2xl font-bold text-gray-600 dark:text-gray-400 mt-1">{{ summary.completed_today }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">Students Online</p>
        <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{{ summary.students_online }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">Recorded Sessions</p>
        <p class="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">{{ summary.recorded_sessions }}</p>
      </div>
    </div>

    <!-- Overdue lessons alert -->
    <div v-if="summary.overdue_lessons && summary.overdue_lessons.length > 0" class="mb-6 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
      <p class="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">
        {{ summary.overdue_lessons.length }} scheduled lesson{{ summary.overdue_lessons.length > 1 ? 's' : '' }} not yet started
      </p>
      <ul class="space-y-1">
        <li v-for="lesson in summary.overdue_lessons" :key="lesson.id" class="text-sm text-amber-700 dark:text-amber-300">
          {{ lesson.title }} — {{ lesson.teacher_first_name }} {{ lesson.teacher_last_name }} was due to start at {{ formatDate(lesson.scheduled_start) }}
        </li>
      </ul>
    </div>

    <select v-model="statusFilter" class="mb-6 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white">
      <option value="">All Status</option>
      <option value="scheduled">Scheduled</option>
      <option value="started">Live Now</option>
      <option value="ended">Ended</option>
      <option value="cancelled">Cancelled</option>
    </select>

    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading live classes...</p>
    </div>

    <div v-else-if="filteredClasses.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <p class="text-gray-500 dark:text-gray-400">{{ classes.length === 0 ? 'No live classes scheduled in your department yet' : 'No classes match this filter' }}</p>
    </div>

    <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-900/40">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Teacher</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject / Class</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Schedule</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="cls in filteredClasses" :key="cls.id" class="hover:bg-gray-50 dark:hover:bg-gray-900/30">
            <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">{{ cls.title }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ teacherName(cls) }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
              {{ cls.subject_name || 'N/A' }}
              <span v-if="cls.class_name" class="text-gray-400 dark:text-gray-500">· {{ cls.class_name }}</span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{{ formatSchedule(cls.scheduled_start, cls.scheduled_end) }}</td>
            <td class="px-6 py-4">
              <span class="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium w-fit" :class="statusBadge(cls.status)">
                <span v-if="cls.status === 'started'" class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                {{ statusLabel(cls.status) }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2 flex-wrap">
                <button
                  v-if="cls.status === 'started'"
                  @click="joinClass(cls)"
                  :disabled="actingId === cls.id"
                  class="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-500 text-white text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {{ actingId === cls.id ? 'Joining...' : 'Observe' }}
                </button>
                <button
                  v-if="cls.status === 'started' || cls.status === 'ended'"
                  @click="openAttendance(cls)"
                  class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Attendance
                </button>
                <button
                  v-if="cls.status === 'ended' && cls.is_recorded"
                  @click="openRecordings(cls)"
                  class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Recordings
                </button>
                <span v-if="cls.status === 'scheduled' || cls.status === 'cancelled'" class="text-xs text-gray-400 dark:text-gray-500">—</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>

    <!-- Attendance Modal -->
    <div v-if="attendanceClass" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">Attendance · {{ attendanceClass.title }}</h3>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import type { LiveClass, LiveClassAttendanceRow, LiveClassRecording, LiveClassSummary } from '@/types/liveclass'

const API_BASE = '/api'

const classes = ref<LiveClass[]>([])
const loading = ref(false)
const actingId = ref<number | null>(null)
const statusFilter = ref('')

const summary = ref<LiveClassSummary>({ live_now: 0, upcoming_today: 0, completed_today: 0, students_online: 0, recorded_sessions: 0, overdue_lessons: [] })

const attendanceClass = ref<LiveClass | null>(null)
const attendance = ref<LiveClassAttendanceRow[]>([])
const loadingAttendance = ref(false)

const recordingsClass = ref<LiveClass | null>(null)
const recordings = ref<LiveClassRecording[]>([])
const loadingRecordings = ref(false)

const filteredClasses = computed(() => {
  if (!statusFilter.value) return classes.value
  return classes.value.filter(c => c.status === statusFilter.value)
})

const teacherName = (cls: LiveClass) => {
  if (!cls.teacher_first_name) return 'N/A'
  return `${cls.teacher_first_name} ${cls.teacher_last_name || ''}`.trim()
}

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
  const dateStr = s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const startTime = s.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const endTime = e.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${dateStr} · ${startTime} - ${endTime}`
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}

const loadClasses = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_BASE}/hod/live-classes`)
    if (response.data.success) {
      classes.value = response.data.data.classes || []
      summary.value = response.data.data.summary || summary.value
    }
  } catch (error) {
    console.error('Failed to load live classes:', error)
  } finally {
    loading.value = false
  }
}

const joinClass = async (cls: LiveClass) => {
  actingId.value = cls.id
  try {
    const response = await axios.post(`${API_BASE}/hod/live-classes/${cls.id}/join`)
    if (response.data.success) {
      window.open(response.data.data.join_url, '_blank')
    }
  } catch (error: any) {
    alert(error.response?.data?.message || 'Failed to join the class')
  } finally {
    actingId.value = null
  }
}

const openAttendance = async (cls: LiveClass) => {
  attendanceClass.value = cls
  attendance.value = []
  loadingAttendance.value = true
  try {
    const response = await axios.get(`${API_BASE}/hod/live-classes/${cls.id}/attendance`)
    if (response.data.success) {
      attendance.value = response.data.data.attendance || []
    }
  } catch (error) {
    console.error('Failed to load attendance:', error)
  } finally {
    loadingAttendance.value = false
  }
}

const openRecordings = async (cls: LiveClass) => {
  recordingsClass.value = cls
  recordings.value = []
  loadingRecordings.value = true
  try {
    const response = await axios.get(`${API_BASE}/hod/live-classes/${cls.id}/recordings`)
    if (response.data.success) {
      recordings.value = response.data.data.recordings || []
    }
  } catch (error) {
    console.error('Failed to load recordings:', error)
  } finally {
    loadingRecordings.value = false
  }
}

onMounted(() => {
  loadClasses()
})
</script>
