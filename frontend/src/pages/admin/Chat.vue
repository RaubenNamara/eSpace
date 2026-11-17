<template>
  <!-- The admin's read-only view of the school's chats. A class or group chat shows how many are in
       it and how many are online - never a list of its learners' names; a direct chat names its two
       people. Nothing can be sent from here. -->
  <div class="wa h-[100dvh] flex bg-gray-100 dark:bg-gray-950">
    <div class="flex-1 flex overflow-hidden bg-white dark:bg-[rgb(17_24_39)]">
      <!-- The list of chats -->
      <aside class="w-full md:w-80 lg:w-[23rem] flex-shrink-0 md:border-r border-gray-200 dark:border-white/5 bg-white dark:bg-[rgb(17_24_39)] flex flex-col" :class="activeConversation ? 'hidden md:flex' : 'flex'">
        <div class="chat-bar px-4 pt-3.5 pb-3 bg-indigo-800">
          <div class="flex items-center gap-1.5">
            <AppMenuButton />
            <div class="min-w-0">
              <h1 class="text-lg font-semibold text-white leading-tight">Chat monitoring</h1>
              <p class="text-xs mt-0.5">Read only · {{ conversations.length }} {{ conversations.length === 1 ? 'chat' : 'chats' }} across the school</p>
            </div>
          </div>
          <select v-model="departmentFilter" class="cm-select mt-3 w-full px-3 py-2 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40" aria-label="Department" @change="loadConversations">
            <option value="">All departments</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
          </select>
        </div>

        <!-- search, then which kind of chat -->
        <div class="px-3 pt-3 pb-2 space-y-2.5">
          <div class="relative">
            <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input v-model="conversationSearch" type="search" placeholder="Search chats" class="w-full pl-9 pr-3 py-2 rounded-full text-sm bg-gray-100 dark:bg-[rgb(31_41_55)] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500/60">
          </div>
          <div class="gp-switch w-full" role="tablist" aria-label="Kind of chat">
            <button v-for="k in KINDS" :key="k.key" type="button" role="tab" class="gp-switch-btn flex-1 justify-center" :class="{ 'gp-switch-on': kind === k.key }" :aria-selected="kind === k.key" @click="kind = k.key">
              {{ k.label }}<span class="cm-count">{{ countOf(k.key) }}</span>
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-2 pb-2">
          <div v-if="loading" class="space-y-1.5 px-1 pt-1">
            <div v-for="i in 6" :key="i" class="h-14 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
          </div>
          <p v-else-if="conversations.length === 0" class="text-center py-16 px-6 text-sm text-gray-500 dark:text-gray-400">No chats yet.</p>
          <p v-else-if="filteredConversations.length === 0" class="text-center py-16 px-6 text-sm text-gray-500 dark:text-gray-400">{{ conversationSearch ? `No chats match "${conversationSearch}".` : 'No chats of this kind.' }}</p>
          <button
            v-for="conv in filteredConversations"
            :key="conv.id"
            type="button"
            class="cm-row w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-left transition-colors"
            :class="activeConversation?.id === conv.id ? 'cm-row-on' : 'hover:bg-gray-50 dark:hover:bg-white/5'"
            @click="openConversation(conv)"
          >
            <span class="cm-avatar" :class="avatarClass(conv)" aria-hidden="true">
              <svg v-if="conv.type !== 'direct'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" /></svg>
              <template v-else>{{ initials(conv.name) }}</template>
            </span>
            <span class="min-w-0 flex-1">
              <span class="flex items-center gap-2">
                <span class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ titleOf(conv) }}</span>
                <span class="cm-badge" :class="`cm-badge-${conv.type}`">{{ typeLabel(conv.type) }}</span>
                <span v-if="conv.last_message" class="ml-auto text-[11px] text-gray-400 flex-shrink-0">{{ formatTime(conv.last_message.created_at) }}</span>
              </span>
              <span class="block text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                {{ conv.last_message ? `${niceName(conv.last_message.sender_name)}: ${conv.last_message.message || previewAttachment(conv.last_message.attachment_type)}` : 'No messages yet' }}
              </span>
            </span>
          </button>
        </div>
      </aside>

      <!-- The chat being read -->
      <section class="flex-1 flex flex-col min-w-0" :class="activeConversation ? 'flex' : 'hidden md:flex'">
        <template v-if="activeConversation">
          <div class="chat-bar px-4 py-3 bg-indigo-800">
            <div class="flex items-center gap-3">
              <button type="button" class="md:hidden p-1 -ml-1 rounded-lg" aria-label="Back to the chats" @click="activeConversation = null">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <span class="cm-avatar cm-avatar-sm ring-2 ring-white/20" :class="avatarClass(activeConversation)" aria-hidden="true">
                <svg v-if="activeConversation.type !== 'direct'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" /></svg>
                <template v-else>{{ initials(activeConversation.name) }}</template>
              </span>
              <div class="min-w-0 flex-1">
                <h2 class="text-sm font-semibold truncate">{{ titleOf(activeConversation) }}</h2>
                <!-- who is in it: the two people of a direct chat; only the numbers for a class or group -->
                <p v-if="activeConversation.type === 'direct'" class="text-xs truncate flex items-center gap-2">
                  <span v-for="pp in (activeConversation.participants || [])" :key="`${pp.role}-${pp.id}`" class="inline-flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :class="pp.is_online ? 'bg-emerald-400' : 'bg-white/30'" :title="pp.is_online ? 'Online' : 'Offline'"></span>{{ niceName(pp.name) }}
                  </span>
                </p>
                <p v-else class="text-xs truncate">{{ membersLine(activeConversation) }}</p>
              </div>
              <span class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-medium text-white/90">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" /><circle cx="12" cy="12" r="3" /></svg>
                Read only
              </span>
            </div>
          </div>

          <div class="wa-chat-bg flex-1 overflow-y-auto px-4 py-4 space-y-0.5">
            <div v-if="loadingMessages" class="text-center py-8 text-gray-400 text-sm">Loading messages...</div>
            <template v-else>
              <MessageBubble
                v-for="msg in messages"
                :key="msg.id"
                :message="msg"
                :show-sender-name="true"
                :read-only="true"
                @preview-image="previewImage = $event"
              />
              <p v-if="messages.length === 0" class="text-center text-sm text-gray-400 py-8">No messages in this chat yet.</p>
            </template>
          </div>

          <div class="px-4 py-2.5 border-t border-gray-200 dark:border-white/5 bg-white dark:bg-[rgb(17_24_39)] flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path stroke-linecap="round" d="M8 11V8a4 4 0 018 0v3" /></svg>
            You are reading this chat. Nothing can be sent from here.
          </div>
        </template>

        <div v-else class="wa-chat-bg flex-1 flex items-center justify-center p-6">
          <div class="max-w-xs text-center px-6 py-7 rounded-2xl bg-white/80 dark:bg-[rgb(31_41_55)]/80 backdrop-blur-sm border border-white/60 dark:border-white/5 shadow-sm">
            <span class="mx-auto mb-3 w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h8M8 14h5m-9 6l2.5-3H19a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14z" /></svg>
            </span>
            <p class="text-sm font-semibold text-gray-900 dark:text-white">Pick a chat to read it</p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">You can read every chat in the school, but you are not part of them and cannot send messages.</p>
          </div>
        </div>
      </section>
    </div>

    <div v-if="previewImage" class="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 cursor-zoom-out" @click="previewImage = null">
      <img :src="previewImage" alt="" class="max-w-full max-h-full rounded-lg">
    </div>
  </div>
</template>

<script setup lang="ts">
import { niceName } from '@/components/dashboard/teacher/time'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import MessageBubble from '@/components/chat/MessageBubble.vue'
import AppMenuButton from '@/components/chat/AppMenuButton.vue'
import type { Conversation, ChatMessage } from '@/types/chat'

const API_BASE = '/api/admin/chat'

const conversations = ref<Conversation[]>([])
const conversationSearch = ref('')
const activeConversation = ref<Conversation | null>(null)
const messages = ref<ChatMessage[]>([])
const loading = ref(false)
const loadingMessages = ref(false)
const previewImage = ref<string | null>(null)
const departments = ref<{ id: number; name: string }[]>([])
const departmentFilter = ref('')

// which kind of chat the list shows
type Kind = 'all' | 'class' | 'group' | 'direct'
const KINDS: { key: Kind; label: string }[] = [{ key: 'all', label: 'All' }, { key: 'class', label: 'Classes' }, { key: 'group', label: 'Groups' }, { key: 'direct', label: 'Direct' }]
const kind = ref<Kind>('all')
const ofKind = (c: Conversation, k: Kind) => k === 'all' || (k === 'group' ? c.type === 'group' || c.type === 'announcement' : c.type === k)
const countOf = (k: Kind) => conversations.value.filter(c => ofKind(c, k)).length

const filteredConversations = computed(() => {
  const q = conversationSearch.value.trim().toLowerCase()
  return conversations.value.filter(c => ofKind(c, kind.value) && (!q || c.name.toLowerCase().includes(q)))
})

const typeLabel = (t: string) => ({ class: 'Class', group: 'Group', announcement: 'Notice', direct: 'Direct' } as Record<string, string>)[t] || 'Chat'
// a direct chat's two names, written nicely ("Ahwera Rabwon & Nakato Sarah")
const titleOf = (c: Conversation) => (c.type === 'direct' ? c.name.split(' & ').map(n => niceName(n)).join(' & ') : c.name)
// a class or group chat: how many are in it, not who
const membersLine = (c: Conversation) => {
  const m = c.members
  if (!m) return ''
  const learners = `${m.students} ${m.students === 1 ? 'learner' : 'learners'}`
  const teachers = `${m.teachers} ${m.teachers === 1 ? 'teacher' : 'teachers'}`
  // all of one kind: just that ("177 learners"); a mix: the total and the split
  const who = m.students && m.teachers ? `${m.total} members: ${learners}, ${teachers}` : m.teachers ? teachers : m.students ? learners : `${m.total} ${m.total === 1 ? 'member' : 'members'}`
  return `${who} · ${m.online} online`
}
// avatars coloured by kind; a direct chat by its name, so each pair keeps its colour
const AVATAR_TONES = ['cm-tone-1', 'cm-tone-2', 'cm-tone-3', 'cm-tone-4', 'cm-tone-5']
const avatarClass = (c: Conversation) => (c.type === 'class' ? 'cm-avatar-class' : c.type !== 'direct' ? 'cm-avatar-group' : AVATAR_TONES[[...c.name].reduce((h, ch) => h + ch.charCodeAt(0), 0) % AVATAR_TONES.length])

const initials = (name: string) => name.split(/\s+/).filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?'

const previewAttachment = (type: string | null) => {
  const labels: Record<string, string> = { image: 'Photo', audio: 'Voice message', video: 'Video', file: 'File' }
  return type ? labels[type] || 'Attachment' : ''
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  if (isToday) return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const loadDepartments = async () => {
  try {
    const response = await axios.get('/api/admin/departments')
    if (response.data.success) {
      departments.value = response.data.data || []
    }
  } catch (error) {
    console.error('Failed to load departments:', error)
  }
}

const loadConversations = async () => {
  try {
    const params: Record<string, string> = {}
    if (departmentFilter.value) params.department_id = departmentFilter.value
    const response = await axios.get(`${API_BASE}/conversations`, { params })
    if (response.data.success) {
      conversations.value = response.data.data.conversations || []
    }
  } catch (error) {
    console.error('Failed to load conversations:', error)
  }
}

const loadMessages = async (conversationId: number, showLoading = true) => {
  if (showLoading) loadingMessages.value = true
  try {
    const response = await axios.get(`${API_BASE}/conversations/${conversationId}`)
    if (response.data.success) {
      messages.value = response.data.data.messages || []
    }
  } catch (error) {
    console.error('Failed to load messages:', error)
  } finally {
    loadingMessages.value = false
  }
}

const openConversation = (conv: Conversation) => {
  activeConversation.value = conv
  loadMessages(conv.id)
}

let pollTimer: number | null = null

onMounted(() => {
  loading.value = true
  Promise.all([loadConversations(), loadDepartments()]).finally(() => { loading.value = false })
  pollTimer = window.setInterval(() => {
    loadConversations()
    if (activeConversation.value) loadMessages(activeConversation.value.id, false)
  }, 8000)
})

onBeforeUnmount(() => {
  if (pollTimer) window.clearInterval(pollTimer)
})
</script>

<style>
.cm-select { background: rgba(255, 255, 255, 0.1); color: #fff; border: 1px solid rgba(255, 255, 255, 0.18); }
.cm-select option { color: #111827; }
.cm-count { margin-left: 0.3rem; font-size: 0.68rem; font-weight: 500; opacity: 0.65; font-variant-numeric: tabular-nums; }
.cm-row { position: relative; }
.cm-row-on { background: #eef3ff; box-shadow: inset 3px 0 0 #0b5fe0; }
.dark .cm-row-on { background: rgba(59, 130, 246, 0.14); box-shadow: inset 3px 0 0 #60a5fa; }
.cm-avatar { flex-shrink: 0; width: 2.75rem; height: 2.75rem; border-radius: 9999px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.85rem; font-weight: 600; }
.cm-avatar-sm { width: 2.25rem; height: 2.25rem; font-size: 0.75rem; }
.cm-avatar-class { background: linear-gradient(135deg, #2a8bf5, #0f4fc4); }
.cm-avatar-group { background: linear-gradient(135deg, #8b6cf2, #5b3bd6); }
.cm-tone-1 { background: #0e9f6e; } .cm-tone-2 { background: #e0760b; } .cm-tone-3 { background: #d02a7c; } .cm-tone-4 { background: #0d8177; } .cm-tone-5 { background: #6d3fe0; }
.cm-badge { flex-shrink: 0; padding: 0.05rem 0.4rem; border-radius: 9999px; font-size: 0.62rem; font-weight: 600; letter-spacing: 0.01em; }
.cm-badge-class { background: #e4efff; color: #1a5fd0; }
.cm-badge-group, .cm-badge-announcement { background: #ede7ff; color: #5b3bd6; }
.cm-badge-direct { background: #e6f6ef; color: #0b7a52; }
.dark .cm-badge-class { background: rgba(59, 130, 246, 0.18); color: #93c5fd; }
.dark .cm-badge-group, .dark .cm-badge-announcement { background: rgba(139, 92, 246, 0.2); color: #c4b5fd; }
.dark .cm-badge-direct { background: rgba(16, 185, 129, 0.18); color: #6ee7b7; }

.wa-chat-bg {
  background-color: #eef5f0;
  background-image:
    radial-gradient(circle at 12% 18%, rgba(27, 63, 160, 0.10) 1.5px, transparent 1.5px),
    radial-gradient(circle at 62% 42%, rgba(27, 63, 160, 0.08) 1.5px, transparent 1.5px),
    radial-gradient(circle at 38% 78%, rgba(27, 63, 160, 0.09) 1.5px, transparent 1.5px),
    radial-gradient(circle at 88% 88%, rgba(27, 63, 160, 0.07) 1.5px, transparent 1.5px);
  background-size: 120px 120px;
}

.dark .wa-chat-bg {
  background-color: rgb(13 21 18);
  background-image:
    radial-gradient(circle at 12% 18%, rgba(255, 255, 255, 0.035) 1.5px, transparent 1.5px),
    radial-gradient(circle at 62% 42%, rgba(255, 255, 255, 0.028) 1.5px, transparent 1.5px),
    radial-gradient(circle at 38% 78%, rgba(255, 255, 255, 0.032) 1.5px, transparent 1.5px),
    radial-gradient(circle at 88% 88%, rgba(255, 255, 255, 0.024) 1.5px, transparent 1.5px);
  background-size: 120px 120px;
}
</style>

