<template>
  <div>
    <!-- Header -->
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-indigo-500/20 p-4 sm:p-5 mb-6">
      <div class="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10"></div>
      <div class="absolute -right-3 bottom-0 w-24 h-24 rounded-full bg-white/10"></div>
      <div class="relative flex items-center gap-3 mb-3">
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-sm flex-shrink-0 ring-2 ring-white/20">
          <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div class="min-w-0">
          <h1 class="text-lg sm:text-2xl font-bold text-white leading-tight">Live Classes</h1>
          <p class="text-xs sm:text-sm text-indigo-100">Join real-time sessions from your teachers</p>
        </div>
      </div>

      <!-- Quick stats -->
      <div v-if="!loading && classes.length > 0" class="relative flex flex-wrap items-center gap-2">
        <span v-if="liveNow.length > 0" class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/20 backdrop-blur-sm text-white">
          <span class="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
          {{ liveNow.length }} live now
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 backdrop-blur-sm text-white">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          {{ upcoming.length }} upcoming
        </span>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 backdrop-blur-sm text-white">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {{ past.length }} past
        </span>
      </div>
    </div>

    <div v-if="autoJoinNotice" class="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
      <svg class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p class="text-sm text-amber-800 dark:text-amber-200">{{ autoJoinNotice }}</p>
    </div>

    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading live classes...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 flex items-start gap-3">
      <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p class="text-red-800 dark:text-red-200">{{ error }}</p>
    </div>

    <div v-else-if="classes.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No live classes yet</h3>
      <p class="text-gray-500 dark:text-gray-400">Your teachers haven't scheduled any live sessions.</p>
    </div>

    <template v-else>
      <!-- Live Now -->
      <div v-if="liveNow.length > 0" class="mb-10">
        <h2 class="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-4">
          <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          Live Now
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="cls in liveNow"
            :key="cls.id"
            class="rounded-2xl p-5 bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/20"
          >
            <div class="flex items-start justify-between gap-2 mb-2">
              <h3 class="text-lg font-bold leading-tight">{{ cls.title }}</h3>
              <span class="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold bg-white/20 flex-shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> LIVE
              </span>
            </div>
            <p class="text-sm text-white/80 mb-4">
              {{ cls.subject_name }} · {{ teacherName(cls) }}
            </p>
            <button
              @click="joinClass(cls)"
              :disabled="actingId === cls.id || isAlreadyJoined(cls)"
              class="w-full py-2.5 rounded-lg bg-white text-red-600 font-semibold hover:bg-red-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              {{ actingId === cls.id ? 'Joining...' : (isAlreadyJoined(cls) ? 'Already Joined' : 'Join Now') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Upcoming -->
      <div v-if="upcoming.length > 0" class="mb-10">
        <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Upcoming</h2>
        <div class="space-y-3">
          <div
            v-for="cls in upcoming"
            :key="cls.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex items-center justify-between gap-4"
          >
            <div class="min-w-0">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ cls.title }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ cls.subject_name }} · {{ teacherName(cls) }}</p>
            </div>
            <div class="text-right flex-shrink-0">
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ formatSchedule(cls.scheduled_start, cls.scheduled_end) }}</p>
              <span class="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Scheduled</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Past -->
      <div v-if="past.length > 0">
        <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Past Sessions</h2>
        <div class="space-y-3">
          <div
            v-for="cls in past"
            :key="cls.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex items-center justify-between gap-4"
          >
            <div class="min-w-0">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ cls.title }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ cls.subject_name }} · {{ teacherName(cls) }} · {{ formatSchedule(cls.scheduled_start, cls.scheduled_end) }}</p>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span
                class="px-2 py-0.5 rounded-full text-xs font-medium"
                :class="cls.status === 'cancelled' ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'"
              >
                {{ cls.status === 'cancelled' ? 'Cancelled' : 'Ended' }}
              </span>
              <button
                v-if="cls.is_recorded && cls.status === 'ended'"
                @click="openRecordings(cls)"
                class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Recordings
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import type { LiveClass, LiveClassRecording } from '@/types/liveclass'

const route = useRoute()
const router = useRouter()

const API_BASE = '/api'

const classes = ref<LiveClass[]>([])
const loading = ref(false)
const error = ref('')
const actingId = ref<number | null>(null)

const recordingsClass = ref<LiveClass | null>(null)
const recordings = ref<LiveClassRecording[]>([])
const loadingRecordings = ref(false)

const autoJoinNotice = ref('')

// Tracks classes joined during this page session so the button flips to disabled the instant a
// join succeeds, without waiting on a reload/re-fetch for the server's already_joined flag.
const joinedIds = ref<Set<number>>(new Set())
const isAlreadyJoined = (cls: LiveClass) => !!cls.already_joined || joinedIds.value.has(cls.id)

// The BBB session opens in a new tab, so there's no in-page "leave" event - watching the popup's
// `closed` flag is the only signal available without BBB webhooks. Once it closes, tell the
// backend the student left (POST .../leave) so already_joined clears and Join re-enables.
const openPopups = new Map<number, Window>()
let popupWatcher: ReturnType<typeof setInterval> | null = null

const markLeft = async (classId: number) => {
  joinedIds.value.delete(classId)
  const cls = classes.value.find(c => c.id === classId)
  if (cls) cls.already_joined = false
  try {
    await axios.post(`${API_BASE}/student/live-classes/${classId}/leave`)
  } catch (err) {
    console.error('Failed to record leaving the live class:', err)
  }
}

const startPopupWatcher = () => {
  if (popupWatcher) return
  popupWatcher = setInterval(() => {
    for (const [classId, win] of openPopups) {
      if (win.closed) {
        openPopups.delete(classId)
        markLeft(classId)
      }
    }
    if (openPopups.size === 0 && popupWatcher) {
      clearInterval(popupWatcher)
      popupWatcher = null
    }
  }, 2000)
}

onUnmounted(() => {
  if (popupWatcher) clearInterval(popupWatcher)
})

const liveNow = computed(() => classes.value.filter(c => c.status === 'started'))
const upcoming = computed(() =>
  classes.value
    .filter(c => c.status === 'scheduled')
    .sort((a, b) => new Date(a.scheduled_start).getTime() - new Date(b.scheduled_start).getTime())
)
const past = computed(() =>
  classes.value
    .filter(c => c.status === 'ended' || c.status === 'cancelled')
    .sort((a, b) => new Date(b.scheduled_start).getTime() - new Date(a.scheduled_start).getTime())
)

const teacherName = (cls: LiveClass) => {
  if (!cls.teacher_first_name) return ''
  return `${cls.teacher_first_name} ${cls.teacher_last_name || ''}`.trim()
}

const formatSchedule = (start: string, end: string) => {
  const s = new Date(start)
  const e = new Date(end)
  const dateStr = s.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const startTime = s.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const endTime = e.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${dateStr} · ${startTime} - ${endTime}`
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}

const loadClasses = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await axios.get(`${API_BASE}/student/live-classes`)
    if (response.data.success) {
      classes.value = response.data.data.classes || []
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load live classes'
  } finally {
    loading.value = false
  }
}

const joinClass = async (cls: LiveClass) => {
  if (isAlreadyJoined(cls)) return
  actingId.value = cls.id
  try {
    const response = await axios.post(`${API_BASE}/student/live-classes/${cls.id}/join`)
    if (response.data.success) {
      joinedIds.value.add(cls.id)
      const popup = window.open(response.data.data.join_url, '_blank')
      if (popup) {
        openPopups.set(cls.id, popup)
        startPopupWatcher()
      }
    }
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to join the class')
  } finally {
    actingId.value = null
  }
}

const openRecordings = async (cls: LiveClass) => {
  recordingsClass.value = cls
  recordings.value = []
  loadingRecordings.value = true
  try {
    const response = await axios.get(`${API_BASE}/student/live-classes/${cls.id}/recordings`)
    if (response.data.success) {
      recordings.value = response.data.data.recordings || []
    }
  } catch (err) {
    console.error('Failed to load recordings:', err)
  } finally {
    loadingRecordings.value = false
  }
}

// Coming from a "new live class" notification click (see NotificationPanel.vue) - go straight
// into the meeting if it's already live, instead of making the student find and click Join again.
const handleAutoJoin = async () => {
  const joinId = route.query.join
  if (!joinId) return

  // Clear the query param so a refresh/back-nav doesn't re-trigger the join.
  router.replace({ path: route.path })

  const targetId = Number(joinId)
  const cls = classes.value.find(c => c.id === targetId)

  if (!cls) {
    autoJoinNotice.value = 'That live class is no longer available or you don\'t have access to it.'
    return
  }

  if (cls.status === 'started') {
    await joinClass(cls)
  } else if (cls.status === 'scheduled') {
    autoJoinNotice.value = `"${cls.title}" hasn't started yet - you'll see a Join button here as soon as the teacher goes live.`
  } else {
    autoJoinNotice.value = `"${cls.title}" has already ended.`
  }
}

// Landed here via BBB's logoutURL -> /live-class/return -> here (see LiveClassReturnController).
// This tab is the same one that was joined from - BBB navigates it rather than closing it - so
// the popup-close poll never fires for it. Clear already_joined for whatever's still marked
// joined so Join re-enables immediately instead of waiting on a logout or the class ending.
const handleReturnFromMeeting = async () => {
  if (route.query.left !== '1') return
  router.replace({ path: route.path })

  const stillMarkedJoined = classes.value.filter(c => isAlreadyJoined(c))
  await Promise.all(stillMarkedJoined.map(c => markLeft(c.id)))
}

onMounted(async () => {
  await loadClasses()
  await handleAutoJoin()
  await handleReturnFromMeeting()
})
</script>
