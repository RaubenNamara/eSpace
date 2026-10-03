<template>
  <div class="w-full">
    <PageHeader title="Live Classes" description="Host real-time lessons with BigBlueButton - students get a reminder and a join button." icon="video" accent="rose">
      <template #actions>
        <button type="button" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-500/20" @click="openCreateModal">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          <span class="hidden sm:inline">Schedule class</span><span class="sm:hidden">New</span>
        </button>
      </template>
      <StatStrip v-model="statusFilter" :items="statItems" hide-when-empty />
    </PageHeader>

    <div v-if="!bbbConfigured" class="mb-5 flex items-start gap-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
      <svg class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <p class="text-sm text-amber-800 dark:text-amber-200">BigBlueButton isn't configured yet. You can schedule classes, but starting and joining won't work until a server URL and secret are set in the backend.</p>
    </div>

    <Skeleton v-if="loading && !classes.length" variant="list" :count="4" />

    <EmptyState v-else-if="!classes.length" icon="video" tone="rose" title="No live classes yet" message="Schedule a lesson and your students get a reminder and a join button on their dashboard.">
      <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700" @click="openCreateModal">Schedule a class</button>
    </EmptyState>

    <template v-else>
      <!-- Live now -->
      <div v-for="cls in liveNow" :key="`live-${cls.id}`" class="mb-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white p-4 sm:p-5 shadow-lg shadow-red-500/20">
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <span class="relative flex w-3 h-3 flex-shrink-0"><span class="absolute inset-0 rounded-full bg-white animate-ping opacity-70"></span><span class="relative w-3 h-3 rounded-full bg-white"></span></span>
            <div class="min-w-0">
              <p class="text-[11px] font-bold uppercase tracking-widest text-red-100">Live now · {{ elapsed(cls) }}</p>
              <p class="text-lg font-bold leading-tight truncate">{{ cls.title }}</p>
              <p class="text-xs text-red-100">{{ audience(cls) }} · {{ cls.subject_name }}</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <button type="button" class="px-4 py-2 rounded-xl text-sm font-bold bg-white text-red-700 hover:bg-red-50 disabled:opacity-60" :disabled="actingId === cls.id" @click="joinClass(cls)">Join now</button>
            <button type="button" class="px-3 py-2 rounded-xl text-sm font-semibold bg-white/15 hover:bg-white/25" @click="openAttendance(cls)">Attendance</button>
            <button type="button" class="px-3 py-2 rounded-xl text-sm font-semibold bg-white/15 hover:bg-white/25 disabled:opacity-60" :disabled="actingId === cls.id" @click="endClass(cls)">{{ actingId === cls.id ? 'Ending…' : 'End' }}</button>
          </div>
        </div>
      </div>

      <!-- Next up -->
      <div v-if="nextUp && !statusFilter" class="mb-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <div class="flex items-center gap-4 flex-1 min-w-0">
          <div class="text-center flex-shrink-0 w-16">
            <p class="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">{{ dayShort(nextUp.scheduled_start) }}</p>
            <p class="text-2xl font-extrabold text-gray-900 dark:text-white leading-none">{{ new Date(nextUp.scheduled_start).getDate() }}</p>
          </div>
          <div class="min-w-0">
            <p class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Next up · starts {{ countdown(nextUp.scheduled_start) }}</p>
            <p class="text-base font-bold text-gray-900 dark:text-white truncate">{{ nextUp.title }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ timeRange(nextUp) }} · {{ audience(nextUp) }} · {{ nextUp.subject_name }}</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button type="button" class="px-4 py-2 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-700 disabled:opacity-60" :disabled="actingId === nextUp.id" @click="startClass(nextUp)">{{ actingId === nextUp.id ? 'Starting…' : 'Start now' }}</button>
          <button type="button" class="px-3 py-2 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="editClass(nextUp)">Edit</button>
        </div>
      </div>

      <EmptyState v-if="!shownUpcoming.length && !shownPast.length && !liveNow.length" compact icon="video" tone="gray" title="No classes match this filter" />

      <!-- Upcoming, day by day -->
      <section v-if="laterUpcoming.length" class="mb-6">
        <h2 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Upcoming</h2>
        <div v-for="day in groupByDay(laterUpcoming)" :key="day.label" class="mb-3">
          <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1.5">{{ day.label }}</p>
          <ul class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
            <li v-for="cls in day.items" :key="cls.id" class="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <div class="w-20 flex-shrink-0">
                  <p class="text-xs font-semibold text-gray-700 dark:text-gray-200">{{ clockOf(cls.scheduled_start) }}</p>
                  <p class="text-[10px] text-gray-400">to {{ clockOf(cls.scheduled_end) }}</p>
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ cls.title }}</p>
                  <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ cls.subject_name }} · {{ audience(cls) }}<template v-if="cls.is_recorded"> · recorded</template></p>
                </div>
              </div>
              <div class="flex flex-wrap gap-1.5 sm:justify-end">
                <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-60" :disabled="actingId === cls.id" @click="startClass(cls)">{{ actingId === cls.id ? 'Starting…' : 'Start' }}</button>
                <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="editClass(cls)">Edit</button>
                <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-900/20" @click="deleteClass(cls.id)">Delete</button>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- Past -->
      <section v-if="shownPast.length">
        <button type="button" class="w-full flex items-center gap-2 mb-2 text-left" @click="showPast = !showPast">
          <h2 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">Past classes <span class="font-medium text-gray-400">{{ shownPast.length }}</span></h2>
          <svg class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': showPast }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <ul v-if="showPast" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
          <li v-for="cls in shownPast" :key="cls.id" class="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div class="w-20 flex-shrink-0">
                <p class="text-xs font-semibold text-gray-700 dark:text-gray-200">{{ shortDate(cls.scheduled_start) }}</p>
                <p class="text-[10px] text-gray-400">{{ clockOf(cls.scheduled_start) }}</p>
              </div>
              <div class="min-w-0">
                <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ cls.title }}</p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                  {{ cls.subject_name }} · {{ audience(cls) }} ·
                  <span :class="cls.status === 'cancelled' ? 'text-rose-600 dark:text-rose-300' : ''">{{ cls.status === 'cancelled' ? 'Cancelled' : cls.status === 'ended' ? 'Ended' : 'Missed - never started' }}</span>
                </p>
              </div>
            </div>
            <div class="flex flex-wrap gap-1.5 sm:justify-end">
              <button v-if="cls.status === 'ended'" type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="openAttendance(cls)">Attendance</button>
              <button v-if="cls.status === 'ended' && cls.is_recorded" type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="openRecordings(cls)">Recordings</button>
              <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-200" @click="scheduleAgain(cls)">Schedule again</button>
              <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-900/20" @click="deleteClass(cls.id)">Delete</button>
            </div>
          </li>
        </ul>
      </section>
    </template>

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
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import axios from 'axios'
import type { LiveClass, LiveClassForm, LiveClassRecording, LiveClassAttendanceRow } from '@/types/liveclass'
import type { ENoteAssignments } from '@/types/enotes'
import TeacherClassSelector from '@/components/teacher/TeacherClassSelector.vue'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

const toast = useToastStore()
const confirmDialog = useConfirmStore()

const API_BASE = '/api'

const classes = ref<LiveClass[]>([])
const assignments = ref<ENoteAssignments | null>(null)
const loading = ref(false)
const saving = ref(false)
const actingId = ref<number | null>(null)
const bbbConfigured = ref(true)

const statusFilter = ref<string | null>(null)
const showPast = ref(false)
// Ticks every 30s so countdowns and live timers move
const now = ref(Date.now())
let ticker: ReturnType<typeof setInterval> | null = null
onBeforeUnmount(() => { if (ticker) clearInterval(ticker) })

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

const statItems = computed<StatItem[]>(() => [
  { label: 'All', value: stats.value.total, tone: 'gray' },
  { label: 'Scheduled', value: stats.value.scheduled, key: 'scheduled', tone: 'sky' },
  { label: 'Live now', value: stats.value.started, key: 'started', tone: 'rose' },
  { label: 'Ended', value: stats.value.ended, key: 'ended', tone: 'gray' }
])
const at = (s: string) => new Date(s).getTime()
const liveNow = computed(() => filteredClasses.value.filter(c => c.status === 'started'))
// Scheduled and not yet over, soonest first; "past" is everything else (ended, cancelled, missed)
const shownUpcoming = computed(() => filteredClasses.value
  .filter(c => c.status === 'scheduled' && at(c.scheduled_end) >= now.value)
  .sort((a, b) => at(a.scheduled_start) - at(b.scheduled_start)))
const shownPast = computed(() => filteredClasses.value
  .filter(c => c.status !== 'started' && !(c.status === 'scheduled' && at(c.scheduled_end) >= now.value))
  .sort((a, b) => at(b.scheduled_start) - at(a.scheduled_start)))
const nextUp = computed(() => shownUpcoming.value[0] ?? null)
// The list under the "Next up" card, without repeating it
const laterUpcoming = computed(() => statusFilter.value ? shownUpcoming.value : shownUpcoming.value.slice(1))

const audience = (c: LiveClass) => c.class_group_name ? `${c.class_group_name} (all streams)` : c.class_name ? `${c.class_name}${c.class_stream_name ? `-${c.class_stream_name}` : ''}` : 'Class'
const clockOf = (s: string) => new Date(s).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
const timeRange = (c: LiveClass) => `${clockOf(c.scheduled_start)}–${clockOf(c.scheduled_end)}`
const shortDate = (s: string) => new Date(s).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
const dayShort = (s: string) => new Date(s).toLocaleDateString(undefined, { weekday: 'short' })
const dayLabelOf = (s: string) => {
  const d = new Date(s)
  const today = new Date()
  const tomorrow = new Date(Date.now() + 86400000)
  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
  return d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })
}
const groupByDay = (list: LiveClass[]) => {
  const out: { label: string; items: LiveClass[] }[] = []
  for (const c of list) {
    const label = dayLabelOf(c.scheduled_start)
    const day = out.find(d => d.label === label)
    if (day) day.items.push(c)
    else out.push({ label, items: [c] })
  }
  return out
}
const countdown = (s: string) => {
  const mins = Math.round((at(s) - now.value) / 60000)
  if (mins <= 0) return 'now'
  if (mins < 60) return `in ${mins} min`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `in ${hours} h ${mins % 60} min`
  const days = Math.round(hours / 24)
  return days === 1 ? 'tomorrow' : `in ${days} days`
}
const elapsed = (c: LiveClass) => {
  const mins = Math.max(0, Math.round((now.value - at(c.actual_start || c.scheduled_start)) / 60000))
  return mins < 60 ? `${mins} min` : `${Math.floor(mins / 60)} h ${mins % 60} min`
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

// A past class again, a week on (or a week after today, if that's already past): same details,
// new date - for a weekly lesson
const scheduleAgain = (cls: LiveClass) => {
  const week = 7 * 86400000
  let start = at(cls.scheduled_start) + week
  const length = at(cls.scheduled_end) - at(cls.scheduled_start)
  while (start < Date.now()) start += week
  editingClass.value = null
  form.value = {
    title: cls.title,
    description: cls.description || '',
    subject_id: cls.subject_id?.toString() || '',
    classTarget: cls.class_group_name
      ? { scope: 'all_streams', class_id: null, class_group_name: cls.class_group_name }
      : { scope: 'stream', class_id: cls.class_id, class_group_name: null },
    scheduled_start: toDatetimeLocal(new Date(start).toISOString()),
    scheduled_end: toDatetimeLocal(new Date(start + length).toISOString()),
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
    toast.error(error.response?.data?.message || 'Failed to save live class')
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
    toast.error(error.response?.data?.message || 'Failed to start the class')
  } finally {
    actingId.value = null
  }
}

const endClass = async (cls: LiveClass) => {
  if (!await confirmDialog.open({ title: 'End live class', message: 'End this live class for everyone?', confirmLabel: 'End Class', danger: true })) return
  actingId.value = cls.id
  try {
    await axios.post(`${API_BASE}/teacher/live-classes/${cls.id}/end`)
    await loadClasses()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to end the class')
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
    toast.error(error.response?.data?.message || 'Failed to join the class')
  } finally {
    actingId.value = null
  }
}

const deleteClass = async (id: number) => {
  if (!await confirmDialog.open({ title: 'Delete live class', message: 'Delete this live class? This cannot be undone.', confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.delete(`${API_BASE}/teacher/live-classes/${id}`)
    await loadClasses()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to delete the class')
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
  ticker = setInterval(() => { now.value = Date.now() }, 30000)
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
  @apply px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 shadow-sm shadow-red-500/30 animate-pulse;
}
</style>
