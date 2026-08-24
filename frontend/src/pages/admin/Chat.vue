<template>
  <div class="h-[calc(100vh-6rem)] -m-6 flex bg-gray-100 dark:bg-gray-950 p-2 sm:p-4">
    <div class="flex-1 flex rounded-2xl border border-gray-200 dark:border-black/40 shadow-lg overflow-hidden bg-white dark:bg-[#111b21]">
      <!-- Sidebar -->
      <div class="w-full md:w-80 lg:w-96 flex-shrink-0 md:border-r border-gray-200 dark:border-white/5 bg-white dark:bg-[#111b21] flex flex-col" :class="activeConversation ? 'hidden md:flex' : 'flex'">
        <div class="px-4 py-4 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#202c33]">
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">Chat Monitoring</h1>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-3">School-wide conversations</p>
          <select v-model="departmentFilter" @change="loadConversations" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-[#2a3942] dark:text-white">
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
          </select>
        </div>

        <div class="px-3 py-2 bg-white dark:bg-[#111b21]">
          <div class="relative">
            <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              v-model="conversationSearch"
              type="text"
              placeholder="Search conversations"
              class="w-full pl-9 pr-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-[#202c33] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
          </div>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div v-if="loading" class="text-center py-12 text-gray-400 text-sm">Loading...</div>
          <div v-else-if="conversations.length === 0" class="text-center py-16 px-6">
            <p class="text-sm text-gray-500 dark:text-gray-400">No conversations found.</p>
          </div>
          <div v-else-if="filteredConversations.length === 0" class="text-center py-16 px-6">
            <p class="text-sm text-gray-500 dark:text-gray-400">No chats match "{{ conversationSearch }}".</p>
          </div>
          <button
            v-for="conv in filteredConversations"
            :key="conv.id"
            @click="openConversation(conv)"
            class="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-gray-100 dark:border-white/5"
            :class="activeConversation?.id === conv.id ? 'bg-red-50 dark:bg-[#2a3942]' : 'hover:bg-gray-50 dark:hover:bg-[#182229]'"
          >
            <div class="w-11 h-11 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white flex-shrink-0">
              <svg v-if="conv.type === 'class'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"></path>
              </svg>
              <span v-else class="text-sm font-semibold">{{ initials(conv.name) }}</span>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center justify-between gap-2">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ conv.name }}</h3>
                <span v-if="conv.last_message" class="text-[11px] text-gray-400 flex-shrink-0">{{ formatTime(conv.last_message.created_at) }}</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                {{ conv.last_message ? `${conv.last_message.sender_name}: ${conv.last_message.message || previewAttachment(conv.last_message.attachment_type)}` : 'No messages yet' }}
              </p>
            </div>
          </button>
        </div>
      </div>

      <!-- Thread -->
      <div class="flex-1 flex flex-col min-w-0" :class="activeConversation ? 'flex' : 'hidden md:flex'">
        <template v-if="activeConversation">
          <div class="px-4 py-3 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#202c33]">
            <div class="flex items-center gap-3">
              <button @click="activeConversation = null" class="md:hidden p-1 -ml-1 text-gray-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <div class="min-w-0">
                <h2 class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ activeConversation.name }}</h2>
                <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-500 dark:text-gray-400">
                  <span v-for="p in (activeConversation.participants || [])" :key="`${p.role}-${p.id}`" class="inline-flex items-center gap-1">
                    <span v-if="p.is_online" class="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 dark:shadow-[0_0_5px_1.5px_rgba(16,185,129,0.65)]" title="Online"></span>
                    {{ p.name }}
                  </span>
                </div>
              </div>
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
              <p v-if="messages.length === 0" class="text-center text-sm text-gray-400 py-8">No messages in this conversation yet.</p>
            </template>
          </div>

          <div class="px-4 py-3 border-t border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-[#202c33] text-center text-xs text-gray-500 dark:text-gray-400">
            Read-only monitoring view
          </div>
        </template>

        <div v-else class="wa-chat-bg flex-1 flex items-center justify-center">
          <p class="px-6 py-4 rounded-2xl bg-white/70 dark:bg-[#202c33]/70 backdrop-blur-sm border border-white/60 dark:border-white/5 shadow-sm text-gray-500 dark:text-gray-400">Select a conversation to view</p>
        </div>
      </div>
    </div>

    <div v-if="previewImage" @click="previewImage = null" class="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 cursor-zoom-out">
      <img :src="previewImage" class="max-w-full max-h-full rounded-lg">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import MessageBubble from '@/components/chat/MessageBubble.vue'
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

const filteredConversations = computed(() => {
  const q = conversationSearch.value.trim().toLowerCase()
  if (!q) return conversations.value
  return conversations.value.filter(c => c.name.toLowerCase().includes(q))
})

const initials = (name: string) => name.split(/\s+/).filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?'

const previewAttachment = (type: string | null) => {
  const labels: Record<string, string> = { image: '📷 Photo', audio: '🎤 Voice message', video: '🎥 Video', file: '📄 File' }
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
.wa-chat-bg {
  background-color: #e5ddd5;
  background-image:
    radial-gradient(circle at 12% 18%, rgba(0, 0, 0, 0.045) 1.5px, transparent 1.5px),
    radial-gradient(circle at 62% 42%, rgba(0, 0, 0, 0.035) 1.5px, transparent 1.5px),
    radial-gradient(circle at 38% 78%, rgba(0, 0, 0, 0.04) 1.5px, transparent 1.5px),
    radial-gradient(circle at 88% 88%, rgba(0, 0, 0, 0.03) 1.5px, transparent 1.5px);
  background-size: 120px 120px;
}

.dark .wa-chat-bg {
  background-color: #0b141a;
  background-image:
    radial-gradient(circle at 12% 18%, rgba(255, 255, 255, 0.035) 1.5px, transparent 1.5px),
    radial-gradient(circle at 62% 42%, rgba(255, 255, 255, 0.028) 1.5px, transparent 1.5px),
    radial-gradient(circle at 38% 78%, rgba(255, 255, 255, 0.032) 1.5px, transparent 1.5px),
    radial-gradient(circle at 88% 88%, rgba(255, 255, 255, 0.024) 1.5px, transparent 1.5px);
  background-size: 120px 120px;
}
</style>

