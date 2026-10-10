<template>
  <div class="w-full">
    <PageHeader title="Live Classes" description="Real-time lessons with your teachers - join when they go live, catch the recording if you miss one." icon="video" accent="rose">
      <StatStrip v-if="classes.length" :items="statItems" />
    </PageHeader>

    <div v-if="autoJoinNotice" class="mb-5 flex items-start gap-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
      <AppIcon name="warning" class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
      <p class="text-sm text-amber-800 dark:text-amber-200">{{ autoJoinNotice }}</p>
    </div>

    <Skeleton v-if="loading" variant="list" :count="3" />

    <div v-else-if="error" class="flex items-start gap-3 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 p-4">
      <AppIcon name="warning" class="w-5 h-5 text-rose-500 flex-shrink-0" />
      <p class="flex-1 text-sm text-rose-700 dark:text-rose-200">{{ error }}</p>
      <button type="button" class="text-sm font-semibold text-rose-700 dark:text-rose-200 hover:underline" @click="loadClasses">Try again</button>
    </div>

    <EmptyState v-else-if="!classes.length" icon="video" tone="rose" title="No live classes yet" message="When a teacher schedules a live lesson for your class it shows here - and you'll get a notification when it starts." />

    <template v-else>
      <!-- Live now -->
      <div v-for="cls in liveNow" :key="`live-${cls.id}`" class="mb-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white p-4 sm:p-5 shadow-lg shadow-red-500/20">
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <span class="relative flex w-3 h-3 flex-shrink-0"><span class="absolute inset-0 rounded-full bg-white animate-ping opacity-70"></span><span class="relative w-3 h-3 rounded-full bg-white"></span></span>
            <div class="min-w-0">
              <p class="text-[11px] font-bold uppercase tracking-widest text-red-100">Live now · started {{ elapsed(cls) }} ago</p>
              <p class="text-lg font-bold leading-tight truncate">{{ cls.title }}</p>
              <p class="text-xs text-red-100 truncate">{{ cls.subject_name }}<template v-if="teacherName(cls)"> · {{ teacherName(cls) }}</template></p>
            </div>
          </div>
          <button
            type="button"
            :disabled="actingId === cls.id || isAlreadyJoined(cls)"
            class="px-6 py-2.5 rounded-xl text-sm font-bold bg-white text-red-700 hover:bg-red-50 disabled:opacity-70 disabled:cursor-not-allowed"
            @click="joinClass(cls)"
          >{{ actingId === cls.id ? 'Joining…' : (isAlreadyJoined(cls) ? 'You\'re in - check the other tab' : 'Join now') }}</button>
        </div>
      </div>

      <!-- Next up -->
      <div v-if="nextUp" class="mb-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5 flex items-center gap-4">
        <div class="text-center flex-shrink-0 w-14 rounded-xl bg-rose-50 dark:bg-rose-900/20 py-2">
          <p class="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-300">{{ dayShort(nextUp.scheduled_start) }}</p>
          <p class="text-2xl font-extrabold text-gray-900 dark:text-white leading-none">{{ new Date(nextUp.scheduled_start).getDate() }}</p>
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Next up · {{ countdown(nextUp.scheduled_start) }}</p>
          <p class="text-base font-bold text-gray-900 dark:text-white truncate">{{ nextUp.title }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ timeRange(nextUp) }} · {{ nextUp.subject_name }}<template v-if="teacherName(nextUp)"> · {{ teacherName(nextUp) }}</template></p>
        </div>
      </div>

      <!-- Upcoming, day by day -->
      <section v-if="laterUpcoming.length" class="mb-6">
        <h2 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Coming up</h2>
        <div v-for="day in groupByDay(laterUpcoming)" :key="day.label" class="mb-3">
          <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1.5">{{ day.label }}</p>
          <ul class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
            <li v-for="cls in day.items" :key="cls.id" class="p-3 sm:p-4 flex items-center gap-3">
              <div class="w-16 flex-shrink-0">
                <p class="text-xs font-semibold text-gray-700 dark:text-gray-200">{{ clockOf(cls.scheduled_start) }}</p>
                <p class="text-[10px] text-gray-400">to {{ clockOf(cls.scheduled_end) }}</p>
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ cls.title }}</p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ cls.subject_name }}<template v-if="teacherName(cls)"> · {{ teacherName(cls) }}</template></p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- Past -->
      <section v-if="past.length">
        <button type="button" class="w-full flex items-center gap-2 mb-2 text-left" @click="showPast = !showPast">
          <h2 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">Past classes <span class="font-medium text-gray-400">{{ past.length }}</span><span v-if="recordedCount" class="ml-2 text-xs font-medium text-rose-600 dark:text-rose-300">{{ recordedCount }} with recordings</span></h2>
          <svg class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': showPast }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <ul v-if="showPast" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
          <li v-for="cls in past" :key="cls.id" class="p-3 sm:p-4 flex items-center gap-3">
            <div class="w-16 flex-shrink-0">
              <p class="text-xs font-semibold text-gray-700 dark:text-gray-200">{{ shortDate(cls.scheduled_start) }}</p>
              <p class="text-[10px] text-gray-400">{{ clockOf(cls.scheduled_start) }}</p>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ cls.title }}</p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                {{ cls.subject_name }} ·
                <span :class="cls.status === 'cancelled' ? 'text-rose-600 dark:text-rose-300' : ''">{{ cls.status === 'cancelled' ? 'Cancelled' : cls.status === 'ended' ? 'Ended' : 'Didn\'t go ahead' }}</span>
              </p>
            </div>
            <button
              v-if="cls.is_recorded && cls.status === 'ended'"
              type="button"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-200"
              @click="openRecordings(cls)"
            >
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
              Watch
            </button>
          </li>
        </ul>
      </section>
    </template>

    <!-- Recordings Modal -->
    <div v-if="recordingsClass" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
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
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import type { LiveClass, LiveClassRecording } from '@/types/liveclass'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()

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

// Ticks every 30s so the countdown and "started … ago" move
const now = ref(Date.now())
const ticker = setInterval(() => { now.value = Date.now() }, 30000)

onUnmounted(() => {
  if (popupWatcher) clearInterval(popupWatcher)
  clearInterval(ticker)
})

const liveNow = computed(() => classes.value.filter(c => c.status === 'started'))
const at = (v: string) => new Date(v).getTime()
// Scheduled and not over yet; a scheduled class whose time has passed counts as past
const upcoming = computed(() =>
  classes.value
    .filter(c => c.status === 'scheduled' && at(c.scheduled_end) >= now.value)
    .sort((a, b) => at(a.scheduled_start) - at(b.scheduled_start))
)
const past = computed(() =>
  classes.value
    .filter(c => c.status === 'ended' || c.status === 'cancelled' || (c.status === 'scheduled' && at(c.scheduled_end) < now.value))
    .sort((a, b) => at(b.scheduled_start) - at(a.scheduled_start))
)
const nextUp = computed(() => upcoming.value[0] ?? null)
const laterUpcoming = computed(() => upcoming.value.slice(1))
const recordedCount = computed(() => past.value.filter(c => c.is_recorded && c.status === 'ended').length)
const showPast = ref(false)

const statItems = computed<StatItem[]>(() => [
  { label: 'Live now', value: liveNow.value.length, tone: 'rose' },
  { label: 'Coming up', value: upcoming.value.length, tone: 'sky' },
  { label: 'Past', value: past.value.length, tone: 'gray', hint: recordedCount.value ? `${recordedCount.value} recorded` : undefined }
])

const clockOf = (v: string) => new Date(v).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
const timeRange = (c: LiveClass) => `${clockOf(c.scheduled_start)}–${clockOf(c.scheduled_end)}`
const shortDate = (v: string) => new Date(v).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
const dayShort = (v: string) => new Date(v).toLocaleDateString(undefined, { weekday: 'short' })
const dayLabelOf = (v: string) => {
  const d = new Date(v).toDateString()
  if (d === new Date().toDateString()) return 'Today'
  if (d === new Date(Date.now() + 86400000).toDateString()) return 'Tomorrow'
  return new Date(v).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })
}
const groupByDay = (list: LiveClass[]) => {
  const out: { label: string; items: LiveClass[] }[] = []
  for (const c of list) {
    const label = dayLabelOf(c.scheduled_start)
    const day = out.find(x => x.label === label)
    if (day) day.items.push(c)
    else out.push({ label, items: [c] })
  }
  return out
}
const countdown = (v: string) => {
  const mins = Math.round((at(v) - now.value) / 60000)
  if (mins <= 0) return 'starting any moment'
  if (mins < 60) return `starts in ${mins} min`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `starts in ${hours} h ${mins % 60} min`
  const days = Math.round(hours / 24)
  return days === 1 ? 'tomorrow' : `in ${days} days`
}
const elapsed = (c: LiveClass) => {
  const mins = Math.max(0, Math.round((now.value - at(c.actual_start || c.scheduled_start)) / 60000))
  return mins < 60 ? `${mins} min` : `${Math.floor(mins / 60)} h ${mins % 60} min`
}

const teacherName = (cls: LiveClass) => {
  if (!cls.teacher_first_name) return ''
  return `${cls.teacher_first_name} ${cls.teacher_last_name || ''}`.trim()
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
    toast.error(err.response?.data?.message || 'Failed to join the class')
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
