<template>
  <!-- Live sessions run by the department's teachers: what's live now (one tap to observe), what's
       coming, and attendance and recordings for each one that has run. -->
  <div class="w-full">
    <PageHeader title="Live Classes" description="Live sessions your department's teachers run - observe one that's live, and see who attended." icon="video" accent="rose">
      <StatStrip v-if="!loading && classes.length" v-model="statusFilter" :items="statItems" />
    </PageHeader>

    <!-- Something is live right now - the HOD's most likely reason to be here -->
    <div v-for="cls in liveNow" :key="`live-${cls.id}`" class="mb-3 flex flex-wrap items-center gap-3 rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3">
      <span class="relative flex w-2.5 h-2.5"><span class="absolute inline-flex w-full h-full rounded-full bg-rose-400 opacity-75 animate-ping"></span><span class="relative inline-flex w-2.5 h-2.5 rounded-full bg-rose-500"></span></span>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold text-rose-900 dark:text-rose-100 truncate">{{ cls.title }}</p>
        <p class="text-xs text-rose-700 dark:text-rose-300">{{ teacherName(cls) }}<span v-if="cls.class_name"> · {{ cls.class_name }}</span> · live now</p>
      </div>
      <button type="button" :disabled="actingId === cls.id" class="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 disabled:opacity-50" @click="joinClass(cls)">{{ actingId === cls.id ? 'Joining…' : 'Observe' }}</button>
    </div>

    <!-- Scheduled lessons whose start time has passed -->
    <div v-if="summary.overdue_lessons && summary.overdue_lessons.length" class="mb-4 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
      <p class="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-1.5">{{ summary.overdue_lessons.length }} scheduled lesson{{ summary.overdue_lessons.length > 1 ? 's' : '' }} not started yet</p>
      <ul class="space-y-1">
        <li v-for="lesson in summary.overdue_lessons" :key="lesson.id" class="text-sm text-amber-800 dark:text-amber-200">
          {{ lesson.title }} - {{ niceName(`${lesson.teacher_first_name} ${lesson.teacher_last_name}`) }}, due {{ formatDate(lesson.scheduled_start) }}
        </li>
      </ul>
    </div>

    <p v-if="!loading && classes.length" class="mb-3 text-xs text-gray-500 dark:text-gray-400">
      Today: <b class="text-gray-700 dark:text-gray-200">{{ summary.upcoming_today }}</b> still to come · <b class="text-gray-700 dark:text-gray-200">{{ summary.completed_today }}</b> done ·
      <b class="text-gray-700 dark:text-gray-200">{{ summary.students_online }}</b> students online · <b class="text-gray-700 dark:text-gray-200">{{ summary.recorded_sessions }}</b> recorded sessions in all
    </p>

    <DataTable
      :columns="columns"
      :rows="filteredClasses"
      :loading="loading"
      :search-keys="['title', 'teacher', 'subject_name', 'class_name']"
      search-placeholder="Search live classes"
      :page-size="25"
      :initial-sort="{ key: 'scheduled_start', dir: 'desc' }"
      empty-title="No live classes here"
      :empty-message="classes.length ? 'Nothing matches this filter.' : 'Live classes your teachers schedule show up here.'"
    >
      <template #cell-title="{ row }">
        <span class="font-semibold text-gray-900 dark:text-white">{{ row.title }}</span>
      </template>
      <template #cell-subject_class="{ row }">
        <span class="text-gray-700 dark:text-gray-200">{{ row.subject_name || '-' }}</span><span v-if="row.class_name" class="text-gray-400"> · {{ row.class_name }}</span>
      </template>
      <template #cell-scheduled_start="{ row }">
        <span class="whitespace-nowrap text-gray-600 dark:text-gray-300">{{ formatSchedule(row.scheduled_start, row.scheduled_end) }}</span>
      </template>
      <template #cell-status="{ row }">
        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="statusBadge(row.status)">
          <span v-if="row.status === 'started'" class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          {{ statusLabel(row.status) }}
        </span>
      </template>
      <template #actions="{ row }">
        <button v-if="row.status === 'started'" type="button" :disabled="actingId === row.id" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50" @click="joinClass(row)">Observe</button>
        <ActionMenu v-if="menuFor(row).length" :items="menuFor(row)" :label="`Actions for ${row.title}`" />
      </template>
    </DataTable>

    <!-- Attendance Modal -->
    <div v-if="attendanceClass" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
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
    <div v-if="recordingsClass" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
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
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import DataTable, { type Column } from '@/components/ui/DataTable.vue'
import ActionMenu, { type ActionItem } from '@/components/ui/ActionMenu.vue'
import type { LiveClass, LiveClassAttendanceRow, LiveClassRecording, LiveClassSummary } from '@/types/liveclass'
import { useToastStore } from '@/stores/toast'
import { niceName } from '@/components/dashboard/teacher/time'

const toast = useToastStore()

const API_BASE = '/api'

const columns: Column[] = [
  { key: 'title', label: 'Class', sortable: true, mobile: 'title' },
  { key: 'teacher', label: 'Teacher', sortable: true, mobile: 'subtitle', value: (r: LiveClass) => teacherName(r) },
  { key: 'subject_class', label: 'Subject · class', value: (r: LiveClass) => `${r.subject_name || ''} ${r.class_name || ''}` },
  { key: 'scheduled_start', label: 'When', sortable: true },
  { key: 'status', label: 'Status', sortable: true }
]

const classes = ref<(LiveClass & { teacher: string })[]>([])
const loading = ref(true)
const actingId = ref<number | null>(null)
const statusFilter = ref<string | null>(null)

const summary = ref<LiveClassSummary>({ live_now: 0, upcoming_today: 0, completed_today: 0, students_online: 0, recorded_sessions: 0, overdue_lessons: [] })

const attendanceClass = ref<LiveClass | null>(null)
const attendance = ref<LiveClassAttendanceRow[]>([])
const loadingAttendance = ref(false)

const recordingsClass = ref<LiveClass | null>(null)
const recordings = ref<LiveClassRecording[]>([])
const loadingRecordings = ref(false)

const count = (s: string) => classes.value.filter(c => c.status === s).length
const statItems = computed<StatItem[]>(() => [
  { label: 'Live now', value: count('started'), key: 'started', tone: 'rose' },
  { label: 'Scheduled', value: count('scheduled'), key: 'scheduled', tone: 'sky' },
  { label: 'Ended', value: count('ended'), key: 'ended', tone: 'gray' },
  { label: 'All sessions', value: classes.value.length, key: 'all', tone: 'indigo', hint: count('cancelled') ? `${count('cancelled')} cancelled` : undefined }
])
const filteredClasses = computed(() => classes.value.filter(c => !statusFilter.value || statusFilter.value === 'all' || c.status === statusFilter.value))
const liveNow = computed(() => classes.value.filter(c => c.status === 'started'))

const teacherName = (cls: LiveClass) => (cls.teacher_first_name ? niceName(`${cls.teacher_first_name} ${cls.teacher_last_name || ''}`.trim()) : '-')

const menuFor = (cls: LiveClass): ActionItem[] => {
  const items: ActionItem[] = []
  if (cls.status === 'started' || cls.status === 'ended') items.push({ label: 'Attendance', icon: 'users', run: () => openAttendance(cls) })
  if (cls.status === 'ended' && cls.is_recorded) items.push({ label: 'Recordings', icon: 'video', run: () => openRecordings(cls) })
  return items
}

const statusLabel = (status: string) => (status === 'started' ? 'Live' : status.charAt(0).toUpperCase() + status.slice(1))

const statusBadge = (status: string) => {
  if (status === 'started') return 'bg-rose-500 text-white'
  if (status === 'scheduled') return 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'
  if (status === 'ended') return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
  return 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
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
      classes.value = (response.data.data.classes || []).map((c: LiveClass) => ({ ...c, teacher: teacherName(c) }))
      summary.value = response.data.data.summary || summary.value
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Could not load the live classes')
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
    toast.error(error.response?.data?.message || 'Failed to join the class')
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
