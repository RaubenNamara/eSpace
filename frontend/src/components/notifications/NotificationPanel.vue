<template>
  <!-- On mobile, "absolute right-0" positions relative to the small bell icon itself - which
       sits close to the screen's right edge in a cramped header - so a wide dropdown anchored to
       it can overflow off the left edge instead of ever getting a scrollbar. Below sm:, switch to
       fixed positioning anchored to the viewport (not the icon) so it always fits with even
       margins, regardless of exactly where the bell sits in the header. -->
  <div class="fixed sm:absolute inset-x-3 sm:inset-x-auto top-[72px] sm:top-auto sm:right-0 sm:mt-2 w-auto sm:w-96 max-w-full sm:max-w-[90vw] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
      <button
        v-if="hasUnread"
        @click="markAllRead"
        class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        Mark all as read
      </button>
    </div>

    <div class="max-h-96 overflow-y-auto">
      <div v-if="loading" class="p-8 flex justify-center">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
      </div>
      <div v-else-if="notifications.length === 0" class="p-8 text-center text-sm text-gray-400 dark:text-gray-500">
        No notifications yet.
      </div>
      <button
        v-for="n in notifications"
        :key="n.id"
        @click="onItemClick(n)"
        class="w-full text-left px-4 py-3 border-b border-gray-100 dark:border-gray-700/50 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex gap-3"
        :class="!n.is_read ? 'bg-indigo-50/60 dark:bg-indigo-900/10' : ''"
      >
        <span class="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" :class="!n.is_read ? 'bg-indigo-500' : 'bg-transparent'"></span>
        <div class="min-w-0">
          <p class="text-sm font-medium text-gray-900 dark:text-white">{{ n.title }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{{ n.message }}</p>
          <p class="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{{ relativeTime(n.created_at) }}</p>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import type { NotificationItem } from '@/types/notification'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits<{ 'unread-change': [number]; 'navigate': [] }>()

const router = useRouter()
const authStore = useAuthStore()

const notifications = ref<NotificationItem[]>([])
const loading = ref(false)

const hasUnread = computed(() => notifications.value.some(n => !n.is_read))

const load = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/notifications', { params: { limit: 30 } })
    notifications.value = res.data.data.notifications
  } catch (err) {
    // Best-effort - the dropdown just stays empty/stale on failure.
  } finally {
    loading.value = false
  }
}

// Maps a notification's (type, data) to the module it's about. All current notification-raising
// code only ever targets students (see backend NotificationService call sites), so every route
// below is under the student area; roleSegment() is still used as the prefix rather than a
// hardcoded '/student' so a future teacher/hod/admin notification type routes correctly without
// touching this again.
function roleSegment(): string {
  const role = authStore.userRole
  if (role === 'admin' || role === 'super_admin') return 'admin'
  return role || 'student'
}

function routeForNotification(n: NotificationItem): { path: string; query?: Record<string, string> } | null {
  const base = `/${roleSegment()}`
  const data = n.data || {}

  switch (n.type) {
    case 'new_live_class':
      // Live class is special-cased: eagerly join if it's already live, see LiveClasses.vue's
      // handling of the `join` query param.
      return { path: `${base}/live-classes`, query: { join: String(data.live_class_id) } }
    case 'new_assessment':
      return { path: `${base}/assignments/${data.assignment_id}/answer` }
    case 'assignment_graded':
      return { path: `${base}/assignments/${data.assignment_id}/result/${data.submission_id}` }
    case 'new_enote':
      return { path: `${base}/enotes/${data.topic_id}` }
    case 'new_video':
    case 'new_video_resource':
      return { path: `${base}/videos` }
    case 'new_library_resource':
      return { path: `${base}/library` }
    case 'new_item_bank_resource':
      return { path: `${base}/itembank` }
    case 'report_card_ready':
      return { path: `${base}/reports` }
    default:
      return null
  }
}

const onItemClick = async (n: NotificationItem) => {
  if (!n.is_read) {
    n.is_read = true
    try {
      await axios.put(`/api/notifications/${n.id}/read`)
      emit('unread-change', notifications.value.filter(x => !x.is_read).length)
    } catch (err) {
      n.is_read = false
    }
  }

  const target = routeForNotification(n)
  if (target) {
    emit('navigate')
    router.push(target)
  }
}

const markAllRead = async () => {
  const previouslyUnread = notifications.value.filter(n => !n.is_read)
  notifications.value.forEach(n => { n.is_read = true })
  try {
    await axios.put('/api/notifications/read-all')
    emit('unread-change', 0)
  } catch (err) {
    previouslyUnread.forEach(n => { n.is_read = false })
  }
}

const relativeTime = (dateString: string) => {
  const date = new Date(dateString)
  const diffMin = Math.round((Date.now() - date.getTime()) / 60000)
  if (diffMin < 1) return 'Just now'
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.round(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.round(diffHr / 24)
  if (diffDay < 7) return `${diffDay}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

onMounted(load)
</script>
