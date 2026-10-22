import { ref, type Ref } from 'vue'
import axios from 'axios'
import { niceName } from '@/components/dashboard/teacher/time'
import type { ChatActivity, ChatThreadStatus, Conversation } from '@/types/chat'

/**
 * WhatsApp-style live state for a chat page:
 *  - tells the server while you are typing or recording, so the others see "typing..." /
 *    "recording audio..." (re-sent every few seconds while it lasts, cleared when you stop);
 *  - turns the open conversation's polled status into the header line: who is typing, else
 *    "online" or "last seen today at 3:40 PM".
 */
export function useChatLive(apiBase: string, active: Ref<Conversation | null>) {
  const status = ref<ChatThreadStatus | null>(null)

  let sent: { conversationId: number; activity: string | null; at: number } | null = null
  let stopTimer: number | null = null

  const post = (conversationId: number, activity: 'typing' | 'recording' | null) => {
    sent = { conversationId, activity, at: Date.now() }
    axios.post(`${apiBase}/conversations/${conversationId}/activity`, { activity }).catch(() => {})
  }

  /** From the composer: 'typing' on every keystroke, 'recording' while recording, null when done */
  const reportActivity = (activity: 'typing' | 'recording' | null) => {
    const conv = active.value
    if (!conv) return
    if (stopTimer) { window.clearTimeout(stopTimer); stopTimer = null }

    if (activity === null) {
      if (sent && sent.conversationId === conv.id && sent.activity !== null) post(conv.id, null)
      return
    }
    // the server shows it for ~6 s, so re-send every 3 s while it goes on
    const fresh = sent && sent.conversationId === conv.id && sent.activity === activity && Date.now() - sent.at < 3000
    if (!fresh) post(conv.id, activity)
    // typing stops counting 4 s after the last keystroke; recording lasts until it ends
    if (activity === 'typing') stopTimer = window.setTimeout(() => reportActivity(null), 4000)
  }

  /** Leaving a conversation (or the page) - stop showing as typing there */
  const stopActivity = () => {
    if (stopTimer) { window.clearTimeout(stopTimer); stopTimer = null }
    if (sent && sent.activity !== null) post(sent.conversationId, null)
  }

  const activityText = (list: ChatActivity[] | undefined, isGroup: boolean): string | null => {
    if (!list?.length) return null
    const a = list[0]
    const verb = a.activity === 'recording' ? 'recording audio' : 'typing'
    if (!isGroup) return `${verb}…`
    const first = niceName(a.name).split(' ')[0]
    return list.length > 1 ? `${list.length} people are ${verb}…` : `${first} is ${verb}…`
  }

  // From "seconds ago" (server clock) when we have it, so the server's timezone can't skew it
  const lastSeen = (at: string | null, secondsAgo?: number | null): string => {
    const d = secondsAgo != null ? new Date(Date.now() - secondsAgo * 1000) : at ? new Date(at.replace(' ', 'T')) : null
    if (!d || isNaN(d.getTime())) return ''
    const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    const today = new Date()
    const yesterday = new Date(); yesterday.setDate(today.getDate() - 1)
    if (d.toDateString() === today.toDateString()) return `last seen today at ${time}`
    if (d.toDateString() === yesterday.toDateString()) return `last seen yesterday at ${time}`
    return `last seen ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} at ${time}`
  }

  /** The line under the name in the open chat's header, and whether it is a live (green) status */
  const headerLine = (): { text: string; live: boolean } => {
    const conv = active.value
    if (!conv) return { text: '', live: false }
    const isGroup = conv.type !== 'direct'
    const activity = activityText(status.value?.activity, isGroup)
    if (activity) return { text: activity, live: true }
    if (isGroup) return { text: conv.type === 'group' ? 'Study group' : 'Class group', live: false }
    const presence = status.value?.presence ?? { is_online: !!conv.is_online, last_active_at: conv.last_active_at ?? null }
    if (presence.is_online) return { text: 'online', live: true }
    return { text: lastSeen(presence.last_active_at, 'seen_seconds_ago' in presence ? presence.seen_seconds_ago : null), live: false }
  }

  return { status, reportActivity, stopActivity, headerLine, activityText }
}
