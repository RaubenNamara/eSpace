<template>
  <div class="h-[calc(100vh-6rem)] -m-6 flex bg-gray-100 dark:bg-gray-950 p-2 sm:p-4">
    <div class="flex-1 flex rounded-2xl border border-gray-200 dark:border-black/40 shadow-lg overflow-hidden bg-white dark:bg-[#111b21]">
      <!-- Sidebar -->
      <div class="w-full md:w-80 lg:w-96 flex-shrink-0 md:border-r border-gray-200 dark:border-white/5 bg-white dark:bg-[#111b21] flex flex-col" :class="activeConversation ? 'hidden md:flex' : 'flex'">
        <div class="px-4 py-4 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#202c33] flex items-center justify-between">
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">Chats</h1>
          <button @click="showNewChat = true" class="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-shadow dark:shadow-[0_0_12px_2px_rgba(16,185,129,0.5)]" title="New chat">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>

        <div class="px-3 py-2 bg-white dark:bg-[#111b21]">
          <div class="relative">
            <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              v-model="conversationSearch"
              type="text"
              placeholder="Search or start a new chat"
              class="w-full pl-9 pr-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-[#202c33] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-0 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
          </div>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div v-if="loadingConversations" class="text-center py-12 text-gray-400 text-sm">Loading...</div>
          <div v-else-if="conversations.length === 0" class="text-center py-16 px-6">
            <p class="text-sm text-gray-500 dark:text-gray-400">No chats yet. Tap the + to message a colleague or a student.</p>
          </div>
          <div v-else-if="filteredConversations.length === 0" class="text-center py-16 px-6">
            <p class="text-sm text-gray-500 dark:text-gray-400">No chats match "{{ conversationSearch }}".</p>
          </div>
          <ConversationListItem
            v-for="conv in filteredConversations"
            :key="conv.id"
            :conversation="conv"
            :active="activeConversation?.id === conv.id"
            @click="openConversation(conv)"
          />
        </div>
      </div>

      <!-- Thread -->
      <div class="flex-1 flex flex-col min-w-0" :class="activeConversation ? 'flex' : 'hidden md:flex'">
        <template v-if="activeConversation">
          <div class="px-4 py-3 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#202c33] flex items-center gap-3 z-10 shadow-sm">
            <button @click="activeConversation = null" class="md:hidden p-1 -ml-1 text-gray-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <div class="relative flex-shrink-0">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-semibold">
                {{ initials(activeConversation.name) }}
              </div>
              <span
                v-if="activeConversation.type === 'direct' && activeConversation.is_online"
                class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#202c33] dark:shadow-[0_0_6px_2px_rgba(16,185,129,0.65)]"
              ></span>
            </div>
            <div class="min-w-0 flex-1">
              <h2 class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ activeConversation.name }}</h2>
              <p v-if="activeConversation.type === 'direct' && activeConversation.is_online" class="text-xs text-emerald-600 dark:text-emerald-400">Online</p>
            </div>

            <div class="relative flex-shrink-0" ref="threadMenuRef">
              <button @click="showThreadMenu = !showThreadMenu" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a3942] text-gray-500 dark:text-gray-400" title="Menu">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01"></path>
                </svg>
              </button>
              <div
                v-if="showThreadMenu"
                class="absolute right-0 top-full mt-1 w-44 rounded-lg shadow-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#233138] py-1 z-20"
              >
                <button
                  @click="clearActiveChat"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a3942]"
                >
                  Clear Chat
                </button>
              </div>
            </div>
          </div>

          <div ref="messagesContainer" class="wa-chat-bg flex-1 overflow-y-auto px-4 py-4 space-y-0.5">
            <div v-if="loadingMessages" class="text-center py-8 text-gray-400 text-sm">Loading messages...</div>
            <template v-else>
              <MessageBubble
                v-for="msg in messages"
                :key="msg.id"
                :id="`msg-${msg.id}`"
                :message="msg"
                @reply="replyingTo = $event"
                @scroll-to="scrollToMessage"
                @preview-image="previewImage = $event"
              />
              <p v-if="messages.length === 0" class="text-center text-sm text-gray-400 py-8">No messages yet. Say hi!</p>
            </template>
          </div>

          <MessageComposer :replying-to="replyingTo" :sending="sending" @send="sendMessage" @cancel-reply="replyingTo = null" />
        </template>

        <div v-else class="wa-chat-bg flex-1 flex items-center justify-center">
          <div class="text-center px-6 py-8 rounded-2xl bg-white/70 dark:bg-[#202c33]/70 backdrop-blur-sm border border-white/60 dark:border-white/5 shadow-sm">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
              <svg class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <p class="text-gray-500 dark:text-gray-400">Select a chat or start a new one</p>
          </div>
        </div>
      </div>
    </div>

    <NewChatModal
      v-if="showNewChat"
      :contact-tabs="contactTabs"
      @close="showNewChat = false"
      @select-contact="startDirectChat"
    />

    <!-- Image lightbox -->
    <div v-if="previewImage" @click="previewImage = null" class="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 cursor-zoom-out">
      <img :src="previewImage" class="max-w-full max-h-full rounded-lg">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import axios from 'axios'
import ConversationListItem from '@/components/chat/ConversationListItem.vue'
import MessageBubble from '@/components/chat/MessageBubble.vue'
import MessageComposer from '@/components/chat/MessageComposer.vue'
import NewChatModal from '@/components/chat/NewChatModal.vue'
import { useChatBadgeStore } from '@/stores/chatBadge'
import type { Conversation, ChatMessage, ChatContact } from '@/types/chat'

const API_BASE = '/api/teacher/chat'
const chatBadge = useChatBadgeStore()

const conversations = ref<Conversation[]>([])
const conversationSearch = ref('')
const activeConversation = ref<Conversation | null>(null)
const messages = ref<ChatMessage[]>([])
const loadingConversations = ref(false)
const loadingMessages = ref(false)
const sending = ref(false)
const replyingTo = ref<ChatMessage | null>(null)
const previewImage = ref<string | null>(null)
const messagesContainer = ref<HTMLElement | null>(null)

const showNewChat = ref(false)
const colleagues = ref<ChatContact[]>([])
const students = ref<ChatContact[]>([])

const showThreadMenu = ref(false)
const threadMenuRef = ref<HTMLElement | null>(null)

const contactTabs = computed(() => [
  { key: 'colleagues', label: 'Colleagues', contacts: colleagues.value },
  { key: 'students', label: 'Students', contacts: students.value }
])

const filteredConversations = computed(() => {
  const q = conversationSearch.value.trim().toLowerCase()
  if (!q) return conversations.value
  return conversations.value.filter(c => c.name.toLowerCase().includes(q))
})

const initials = (name: string) => name.split(/\s+/).filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?'

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  })
}

const scrollToMessage = (id: number) => {
  document.getElementById(`msg-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const loadConversations = async () => {
  try {
    const response = await axios.get(`${API_BASE}/conversations`)
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
      const wasAtBottom = !messagesContainer.value || messagesContainer.value.scrollHeight - messagesContainer.value.scrollTop - messagesContainer.value.clientHeight < 100
      messages.value = response.data.data.messages || []
      if (wasAtBottom || showLoading) scrollToBottom()
    }
  } catch (error) {
    console.error('Failed to load messages:', error)
  } finally {
    loadingMessages.value = false
  }
}

const loadContacts = async () => {
  try {
    const response = await axios.get(`${API_BASE}/contacts`)
    if (response.data.success) {
      colleagues.value = response.data.data.colleagues || []
      students.value = response.data.data.students || []
    }
  } catch (error) {
    console.error('Failed to load contacts:', error)
  }
}

const openConversation = async (conv: Conversation) => {
  activeConversation.value = conv
  replyingTo.value = null
  showThreadMenu.value = false
  conv.unread_count = 0
  // Await this - it's what marks the conversation read server-side. Firing chatBadge.refresh()
  // without waiting raced the two requests, so the badge could re-fetch the old count before the
  // read-status write had actually landed.
  await loadMessages(conv.id)
  chatBadge.refresh()
}

const clearActiveChat = async () => {
  showThreadMenu.value = false
  if (!activeConversation.value) return
  if (!confirm('Clear this chat? Messages will be removed from your view only — the other person will still see them.')) return
  try {
    const response = await axios.post(`${API_BASE}/conversations/${activeConversation.value.id}/clear`)
    if (response.data.success) {
      messages.value = []
      activeConversation.value.last_message = null
      await loadConversations()
    }
  } catch (error: any) {
    alert(error.response?.data?.message || 'Failed to clear chat')
  }
}

const handleThreadMenuClickOutside = (event: MouseEvent) => {
  if (showThreadMenu.value && threadMenuRef.value && !threadMenuRef.value.contains(event.target as Node)) {
    showThreadMenu.value = false
  }
}

const startDirectChat = async (contact: ChatContact) => {
  try {
    const response = await axios.post(`${API_BASE}/conversations`, { contact_id: contact.id, contact_role: contact.role })
    if (response.data.success) {
      showNewChat.value = false
      await loadConversations()
      const conv = conversations.value.find(c => c.id === response.data.data.id)
      if (conv) openConversation(conv)
    }
  } catch (error: any) {
    alert(error.response?.data?.message || 'Failed to start chat')
  }
}

const sendMessage = async ({ message, file, replyToId }: { message: string; file: File | null; replyToId: number | null }) => {
  if (!activeConversation.value) return
  sending.value = true
  try {
    let response
    if (file) {
      const formData = new FormData()
      formData.append('message', message)
      formData.append('file', file)
      if (replyToId) formData.append('reply_to_id', String(replyToId))
      response = await axios.post(`${API_BASE}/conversations/${activeConversation.value.id}/send`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    } else {
      response = await axios.post(`${API_BASE}/conversations/${activeConversation.value.id}/send`, { message, reply_to_id: replyToId })
    }
    if (response.data.success) {
      replyingTo.value = null
      await loadMessages(activeConversation.value.id, false)
      await loadConversations()
    }
  } catch (error: any) {
    alert(error.response?.data?.message || 'Failed to send message')
  } finally {
    sending.value = false
  }
}

let messagePollTimer: number | null = null
let conversationPollTimer: number | null = null

onMounted(() => {
  loadingConversations.value = true
  Promise.all([loadConversations(), loadContacts()]).finally(() => {
    loadingConversations.value = false
  })

  conversationPollTimer = window.setInterval(loadConversations, 8000)
  messagePollTimer = window.setInterval(() => {
    if (activeConversation.value) loadMessages(activeConversation.value.id, false)
  }, 3000)

  document.addEventListener('click', handleThreadMenuClickOutside)
})

onBeforeUnmount(() => {
  if (messagePollTimer) window.clearInterval(messagePollTimer)
  if (conversationPollTimer) window.clearInterval(conversationPollTimer)
  document.removeEventListener('click', handleThreadMenuClickOutside)
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
