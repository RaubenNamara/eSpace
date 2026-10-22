<template>
  <!-- WhatsApp Web layout (assets/whatsapp.css): an icon rail, the chat list, and the open
       conversation on a doodle wallpaper. Full screen - the app's own menu and top bar are hidden
       on chat (route meta fullScreenChat, see MainLayout) and the menu buttons bring the menu in. -->
  <div class="wa h-[100dvh] flex overflow-hidden bg-[var(--wa-panel)]">
    <!-- Icon rail (tablet and up) -->
    <nav class="hidden md:flex w-16 flex-shrink-0 flex-col items-center justify-between py-3 bg-[var(--wa-rail)] border-r border-[var(--wa-border)]" aria-label="Chat">
      <div class="flex flex-col items-center gap-1.5">
        <button type="button" class="w-10 h-10 rounded-full flex items-center justify-center text-[var(--wa-icon)] hover:bg-black/5 dark:hover:bg-white/5" title="Tusome menu" aria-label="Open the Tusome menu" @click="openAppSidebar">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <button type="button" class="relative w-10 h-10 rounded-full flex items-center justify-center text-[var(--wa-text)] bg-black/5 dark:bg-white/10" title="Chats" aria-current="page">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          <span v-if="totalUnread" class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--wa-green)] text-white text-[10px] font-bold leading-[18px] text-center">{{ totalUnread > 99 ? '99+' : totalUnread }}</span>
        </button>
        <button type="button" class="w-10 h-10 rounded-full flex items-center justify-center text-[var(--wa-icon)] hover:bg-black/5 dark:hover:bg-white/5" title="New chat" @click="showNewChat = true">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8.5v7M8.5 12h7" /></svg>
        </button>
      </div>
      <div class="flex flex-col items-center gap-2">
        <router-link :to="homePath" class="w-10 h-10 rounded-full flex items-center justify-center text-[var(--wa-icon)] hover:bg-black/5 dark:hover:bg-white/5" title="Tusome home">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </router-link>
        <img v-if="myPhoto" :src="myPhoto" alt="" class="w-9 h-9 rounded-full object-cover" :title="myName">
        <div v-else class="w-9 h-9 rounded-full bg-[var(--wa-green)] text-white text-xs font-semibold flex items-center justify-center" :title="myName">{{ myInitials }}</div>
      </div>
    </nav>

    <!-- Chat list -->
    <section class="w-full md:w-[340px] lg:w-[400px] flex-shrink-0 flex flex-col bg-[var(--wa-panel)] md:border-r border-[var(--wa-border)]" :class="activeConversation ? 'hidden md:flex' : 'flex'">
      <header class="h-16 flex-shrink-0 px-4 flex items-center justify-between">
        <div class="flex items-center gap-2"><AppMenuButton class="md:hidden text-[var(--wa-icon)]" /><h1 class="text-[22px] font-bold text-[var(--wa-text)]">Chats</h1></div>
        <button type="button" class="w-10 h-10 rounded-full flex items-center justify-center text-[var(--wa-icon)] hover:bg-black/5 dark:hover:bg-white/5" title="New chat" @click="showNewChat = true">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8.5v7M8.5 12h7" /></svg>
        </button>
      </header>

      <div class="px-3 flex-shrink-0">
        <label class="flex items-center gap-3 h-[35px] px-3 rounded-lg bg-[var(--wa-search)] focus-within:ring-2 focus-within:ring-[var(--wa-green)]">
          <svg class="w-4 h-4 flex-shrink-0 text-[var(--wa-icon)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input v-model="conversationSearch" type="text" placeholder="Search or start a new chat" class="flex-1 min-w-0 bg-transparent border-0 p-0 text-[15px] text-[var(--wa-text)] placeholder-[var(--wa-muted)] focus:ring-0 focus:outline-none">
        </label>
        <!-- Quick filters -->
        <div class="mt-2.5 mb-1.5 flex gap-2 overflow-x-auto [scrollbar-width:none]">
          <button
            v-for="f in chatFilters"
            :key="f.key"
            type="button"
            class="flex-shrink-0 px-3 py-[5px] rounded-full text-[14px] transition-colors border"
            :class="chatFilter === f.key ? 'bg-[var(--wa-chip-on)] text-[var(--wa-chip-on-text)] border-transparent font-medium' : 'border-[var(--wa-border)] text-[var(--wa-muted)] hover:bg-[var(--wa-hover)]'"
            @click="chatFilter = f.key"
          >{{ f.label }}<span v-if="f.count" class="ml-1">{{ f.count }}</span></button>
        </div>
      </div>

      <div class="wa-scroll flex-1 overflow-y-auto px-2 pb-2">
        <div v-if="loadingConversations" class="text-center py-12 text-[var(--wa-muted)] text-sm">Loading…</div>
        <div v-else-if="conversations.length === 0" class="text-center py-16 px-6">
          <p class="text-sm text-[var(--wa-muted)]">No chats yet. Tap the new chat button to message a classmate, a teacher or your class group.</p>
        </div>
        <div v-else-if="filteredConversations.length === 0" class="text-center py-16 px-6">
          <p class="text-sm text-[var(--wa-muted)]">{{ conversationSearch ? `No chats match "${conversationSearch}".` : 'No chats here yet.' }}</p>
        </div>
        <ConversationListItem
          v-for="conv in filteredConversations"
          :key="conv.id"
          :conversation="conv"
          :active="activeConversation?.id === conv.id"
          @click="openConversation(conv)"
        />
      </div>
    </section>

    <!-- Open conversation -->
    <section class="flex-1 flex flex-col min-w-0" :class="activeConversation ? 'flex' : 'hidden md:flex'">
      <template v-if="activeConversation">
        <header class="h-[59px] flex-shrink-0 px-2 sm:px-4 flex items-center gap-3 bg-[var(--wa-panel-header)] border-b border-[var(--wa-border)] z-10">
          <button @click="activeConversation = null" class="md:hidden p-1 text-[var(--wa-icon)]" aria-label="Back to chats">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div class="relative flex-shrink-0">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold" :style="{ background: threadAvatarColor }">
              <svg v-if="isGroup" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" /></svg>
              <template v-else>{{ initials(activeConversation.name) }}</template>
            </div>
          </div>
          <div class="min-w-0 flex-1">
            <h2 class="text-[16px] leading-[21px] text-[var(--wa-text)] truncate">{{ activeConversation.type === 'direct' ? niceName(activeConversation.name) : activeConversation.name }}</h2>
            <p v-if="headerLine.text" class="text-[13px] leading-5 truncate" :class="headerLine.live && headerLine.text !== 'online' ? 'text-[var(--wa-green)]' : 'text-[var(--wa-muted)]'">{{ headerLine.text }}</p>
          </div>

          <div class="flex items-center gap-1 text-[var(--wa-icon)] flex-shrink-0">
            <button type="button" class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5" :class="threadSearchOpen ? 'bg-black/5 dark:bg-white/10' : ''" title="Search" @click="toggleThreadSearch">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <div class="relative" ref="threadMenuRef">
              <button @click="showThreadMenu = !showThreadMenu" class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5" title="Menu">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" /></svg>
              </button>
              <div v-if="showThreadMenu" class="absolute right-0 top-full mt-1 w-52 rounded-lg shadow-xl bg-[var(--wa-panel)] py-2 z-20 border border-[var(--wa-border)]">
                <button @click="showThreadMenu = false; toggleThreadSearch()" class="w-full text-left px-5 py-2.5 text-[14.5px] text-[var(--wa-text)] hover:bg-[var(--wa-hover)]">Search</button>
                <button @click="clearActiveChat" class="w-full text-left px-5 py-2.5 text-[14.5px] text-[var(--wa-text)] hover:bg-[var(--wa-hover)]">Clear chat</button>
                <button @click="showThreadMenu = false; activeConversation = null" class="w-full text-left px-5 py-2.5 text-[14.5px] text-[var(--wa-text)] hover:bg-[var(--wa-hover)]">Close chat</button>
              </div>
            </div>
          </div>
        </header>

        <div v-if="threadSearchOpen" class="flex-shrink-0 px-4 py-2 bg-[var(--wa-panel-header)] border-b border-[var(--wa-border)]">
          <label class="flex items-center gap-3 h-[35px] px-3 rounded-lg bg-[var(--wa-input)]">
            <svg class="w-4 h-4 text-[var(--wa-icon)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input ref="threadSearchInput" v-model="threadSearch" type="text" placeholder="Search messages" class="flex-1 min-w-0 bg-transparent border-0 p-0 text-[15px] text-[var(--wa-text)] placeholder-[var(--wa-muted)] focus:ring-0 focus:outline-none">
            <span v-if="threadSearch" class="text-xs text-[var(--wa-muted)]">{{ messageRows.length }} found</span>
          </label>
        </div>

        <div class="wa-wallpaper relative flex-1 min-h-0">
          <div ref="messagesContainer" class="wa-scroll absolute inset-0 overflow-y-auto py-3" @scroll="onMessagesScroll">
            <div v-if="loadingMessages" class="text-center py-8 text-[var(--wa-muted)] text-sm">Loading messages…</div>
            <template v-else>
              <template v-for="row in messageRows" :key="row.msg.id">
                <div v-if="row.day" class="flex justify-center my-3">
                  <span class="px-3 py-1.5 rounded-lg text-[12.5px] bg-[var(--wa-date)] text-[var(--wa-muted)] shadow-sm">{{ row.day }}</span>
                </div>
                <MessageBubble
                  :id="`msg-${row.msg.id}`"
                  :message="row.msg"
                  :tail="row.tail"
                  :show-avatar="isGroup ? row.tail : undefined"
                  :show-sender-name="isGroup && !row.msg.is_mine"
                  @reply="replyingTo = $event"
                  @scroll-to="scrollToMessage"
                  @preview-image="previewImage = $event"
                />
              </template>
              <div v-if="messages.length === 0" class="flex justify-center mt-6">
                <span class="px-3 py-1.5 rounded-lg text-[12.5px] bg-[var(--wa-date)] text-[var(--wa-muted)] shadow-sm">No messages yet. Say hi!</span>
              </div>
              <div v-else-if="threadSearch && messageRows.length === 0" class="flex justify-center mt-6">
                <span class="px-3 py-1.5 rounded-lg text-[12.5px] bg-[var(--wa-date)] text-[var(--wa-muted)] shadow-sm">No messages match "{{ threadSearch }}"</span>
              </div>
            </template>
          </div>
          <!-- jump to the newest message -->
          <button v-if="showJump" type="button" class="absolute right-5 bottom-4 w-10 h-10 rounded-full bg-[var(--wa-panel)] shadow-lg flex items-center justify-center text-[var(--wa-icon)]" title="Scroll to bottom" @click="scrollToBottom">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>

        <MessageComposer :replying-to="replyingTo" :sending="sending" @send="sendMessage" @cancel-reply="replyingTo = null" @activity="live.reportActivity" />
      </template>

      <!-- nothing open: WhatsApp's welcome panel, in Tusome's words -->
      <div v-else class="flex-1 flex flex-col items-center justify-center text-center px-8 bg-[var(--wa-panel-header)] border-b-[6px] border-[var(--wa-green)]">
        <div class="w-24 h-24 rounded-full bg-[var(--wa-chip-on)] flex items-center justify-center mb-6">
          <svg class="w-12 h-12 text-[var(--wa-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        </div>
        <h2 class="text-[28px] font-light text-[var(--wa-text)]">Tusome Chat</h2>
        <p class="mt-8 text-[13px] text-[var(--wa-muted)] flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          Your messages stay inside your school's Tusome.
        </p>
      </div>
    </section>

    <NewChatModal
      v-if="showNewChat"
      :contact-tabs="contactTabs"
      :class-groups="classGroups"
      @close="showNewChat = false"
      @select-contact="startDirectChat"
      @select-class="startClassChat"
    />

    <!-- Image lightbox -->
    <div v-if="previewImage" @click="previewImage = null" class="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 cursor-zoom-out">
      <img :src="previewImage" class="max-w-full max-h-full rounded-lg">
    </div>
  </div>
</template>

<script setup lang="ts">
import { niceName } from '@/components/dashboard/teacher/time'
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ConversationListItem from '@/components/chat/ConversationListItem.vue'
import MessageBubble from '@/components/chat/MessageBubble.vue'
import AppMenuButton from '@/components/chat/AppMenuButton.vue'
import MessageComposer from '@/components/chat/MessageComposer.vue'
import NewChatModal from '@/components/chat/NewChatModal.vue'
import { useChatBadgeStore } from '@/stores/chatBadge'
import { useChatLive } from '@/composables/useChatLive'
import { useAuthStore } from '@/stores/auth'
import { openAppSidebar } from '@/utils/appSidebar'
import { resolveAssetUrl } from '@/utils/url'
import '@/assets/whatsapp.css'
import type { Conversation, ChatMessage, ChatContact, ChatClassGroup } from '@/types/chat'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

const route = useRoute()
const toast = useToastStore()
const confirmDialog = useConfirmStore()

const API_BASE = '/api/student/chat'
const chatBadge = useChatBadgeStore()

const conversations = ref<Conversation[]>([])
const conversationSearch = ref('')
const activeConversation = ref<Conversation | null>(null)
// typing / recording / online / last seen (see composables/useChatLive)
const live = useChatLive(API_BASE, activeConversation)
const headerLine = computed(() => live.headerLine())
const messages = ref<ChatMessage[]>([])
const loadingConversations = ref(false)
const loadingMessages = ref(false)
const sending = ref(false)
const replyingTo = ref<ChatMessage | null>(null)
const previewImage = ref<string | null>(null)
const messagesContainer = ref<HTMLElement | null>(null)

const showNewChat = ref(false)
const classmates = ref<ChatContact[]>([])
const teachers = ref<ChatContact[]>([])
const classGroups = ref<ChatClassGroup[]>([])

const showThreadMenu = ref(false)
const threadMenuRef = ref<HTMLElement | null>(null)

const contactTabs = computed(() => [
  { key: 'classmates', label: 'Classmates', contacts: classmates.value },
  { key: 'teachers', label: 'Teachers', contacts: teachers.value }
])

// Quick filters: unread, teachers, classmates, groups
type ChatFilter = 'all' | 'unread' | 'teachers' | 'classmates' | 'groups'
const chatFilter = ref<ChatFilter>('all')
const kindOf = (c: Conversation): Exclude<ChatFilter, 'all' | 'unread'> =>
  c.type !== 'direct' ? 'groups' : c.other_role === 'student' ? 'classmates' : 'teachers'
const chatFilters = computed(() => {
  const count = (k: ChatFilter) => conversations.value.filter(c => (k === 'unread' ? (c.unread_count || 0) > 0 : kindOf(c) === k)).length
  return [
    { key: 'all' as ChatFilter, label: 'All', count: 0 },
    { key: 'unread' as ChatFilter, label: 'Unread', count: count('unread') },
    { key: 'teachers' as ChatFilter, label: 'Teachers', count: 0 },
    { key: 'classmates' as ChatFilter, label: 'Classmates', count: 0 },
    { key: 'groups' as ChatFilter, label: 'Groups', count: 0 }
  ].filter(f => f.key === 'all' || f.key === 'unread' || count(f.key) > 0)
})

const filteredConversations = computed(() => {
  const q = conversationSearch.value.trim().toLowerCase()
  return conversations.value.filter(c =>
    (!q || c.name.toLowerCase().includes(q)) &&
    (chatFilter.value === 'all' ||
      (chatFilter.value === 'unread' ? (c.unread_count || 0) > 0 : kindOf(c) === chatFilter.value)))
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
      if (activeConversation.value?.id === conversationId) live.status.value = response.data.data.status ?? null
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
      classmates.value = response.data.data.classmates || []
      teachers.value = response.data.data.teachers || []
    }
  } catch (error) {
    console.error('Failed to load contacts:', error)
  }
}

const loadClassGroups = async () => {
  try {
    const response = await axios.get(`${API_BASE}/classes`)
    if (response.data.success) {
      classGroups.value = response.data.data.classes || []
    }
  } catch (error) {
    console.error('Failed to load class groups:', error)
  }
}

const openConversation = async (conv: Conversation) => {
  if (activeConversation.value?.id !== conv.id) { live.stopActivity(); live.status.value = null }
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
  if (!await confirmDialog.open({ title: 'Clear chat', message: 'Clear this chat? Messages will be removed from your view only — the other person will still see them.', confirmLabel: 'Clear' })) return
  try {
    const response = await axios.post(`${API_BASE}/conversations/${activeConversation.value.id}/clear`)
    if (response.data.success) {
      messages.value = []
      activeConversation.value.last_message = null
      await loadConversations()
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to clear chat')
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
    toast.error(error.response?.data?.message || 'Failed to start chat')
  }
}

const startClassChat = async (cls: ChatClassGroup) => {
  try {
    const response = await axios.post(`${API_BASE}/conversations`, { type: 'class', class_id: cls.class_id, department_id: cls.department_id })
    if (response.data.success) {
      showNewChat.value = false
      await loadConversations()
      const conv = conversations.value.find(c => c.id === response.data.data.id)
      if (conv) openConversation(conv)
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to open class chat')
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
    toast.error(error.response?.data?.message || 'Failed to send message')
  } finally {
    sending.value = false
  }
}

let messagePollTimer: number | null = null
let conversationPollTimer: number | null = null

onMounted(() => {
  loadingConversations.value = true
  Promise.all([loadConversations(), loadContacts(), loadClassGroups()]).finally(() => {
    loadingConversations.value = false
    // ?conversation=<id> (from Study groups) opens that conversation
    const wanted = Number(route.query.conversation)
    const conv = wanted ? conversations.value.find(c => c.id === wanted) : null
    if (conv) openConversation(conv)
  })

  conversationPollTimer = window.setInterval(loadConversations, 8000)
  messagePollTimer = window.setInterval(() => {
    if (activeConversation.value) loadMessages(activeConversation.value.id, false)
  }, 3000)

  document.addEventListener('click', handleThreadMenuClickOutside)
})

onBeforeUnmount(() => {
  live.stopActivity()
  if (messagePollTimer) window.clearInterval(messagePollTimer)
  if (conversationPollTimer) window.clearInterval(conversationPollTimer)
  document.removeEventListener('click', handleThreadMenuClickOutside)
})

// --- WhatsApp Web look: rail, day separators, runs, search in chat, jump to newest ---
const auth = useAuthStore()
const myName = computed(() => auth.userName)
const myInitials = computed(() => String(auth.userName || '?').split(/\s+/).filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase())
const myPhoto = computed(() => ((auth.user as any)?.profile_photo ? resolveAssetUrl((auth.user as any).profile_photo) : ''))
const homePath = computed(() => `/${auth.userRole || 'student'}/dashboard`)
const totalUnread = computed(() => conversations.value.reduce((n, c) => n + (c.unread_count || 0), 0))
const isGroup = computed(() => !!activeConversation.value && activeConversation.value.type !== 'direct')
const THREAD_COLORS = ['#00a884', '#128c7e', '#25d366', '#34b7f1', '#7f66ff', '#e542a3', '#fa6533', '#54656f', '#008069']
const threadAvatarColor = computed(() => THREAD_COLORS[Math.abs(activeConversation.value?.id ?? 0) % THREAD_COLORS.length])

const threadSearchOpen = ref(false)
const threadSearch = ref('')
const threadSearchInput = ref<HTMLInputElement | null>(null)
const toggleThreadSearch = () => {
  threadSearchOpen.value = !threadSearchOpen.value
  if (!threadSearchOpen.value) threadSearch.value = ''
  else nextTick(() => threadSearchInput.value?.focus())
}

const dayKey = (s: string) => new Date(s.replace(' ', 'T')).toDateString()
const dayLabel = (s: string) => {
  const d = new Date(s.replace(' ', 'T'))
  const today = new Date()
  const yesterday = new Date(); yesterday.setDate(today.getDate() - 1)
  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
  if (today.getTime() - d.getTime() < 6 * 86400000) return d.toLocaleDateString('en-US', { weekday: 'long' })
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
/** Each message with: a day chip before it when the day changes, and whether it starts a run (tail) */
const messageRows = computed(() => {
  const q = threadSearch.value.trim().toLowerCase()
  const list = q ? messages.value.filter(m => (m.message || '').toLowerCase().includes(q)) : messages.value
  return list.map((msg, i) => {
    const prev = list[i - 1]
    const newDay = !prev || dayKey(prev.created_at) !== dayKey(msg.created_at)
    const sameSender = !!prev && prev.sender_id === msg.sender_id && prev.sender_role === msg.sender_role
    return { msg, day: newDay ? dayLabel(msg.created_at) : '', tail: newDay || !sameSender }
  })
})

const showJump = ref(false)
const onMessagesScroll = () => {
  const el = messagesContainer.value
  if (el) showJump.value = el.scrollHeight - el.scrollTop - el.clientHeight > 300
}
watch(() => activeConversation.value?.id, () => { threadSearchOpen.value = false; threadSearch.value = ''; showJump.value = false })
</script>

