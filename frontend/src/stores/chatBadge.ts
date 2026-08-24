import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

/**
 * Shared unread-message count for the WhatsApp-style header icon. Kept in its own small store
 * (rather than local state inside MainLayout) so a chat page - a routed child, not a descendant
 * MainLayout can prop/emit to directly - can force an immediate refresh right after opening a
 * conversation (which the backend marks read server-side), instead of the badge sitting stale
 * until the next background poll.
 */
export const useChatBadgeStore = defineStore('chatBadge', () => {
  const unreadCount = ref(0)

  async function refresh() {
    const authStore = useAuthStore()
    const role = authStore.userRole
    if (role !== 'student' && role !== 'teacher') {
      return
    }
    try {
      const res = await axios.get(`/api/${role}/chat/unread-count`)
      unreadCount.value = res.data.data.count
    } catch (err) {
      // Best-effort - the badge just stays at its last known value.
    }
  }

  return { unreadCount, refresh }
})
