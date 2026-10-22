<template>
  <!-- One row of the chat list, WhatsApp Web style (assets/whatsapp.css) -->
  <button
    @click="$emit('click')"
    class="w-full flex items-center gap-3 pl-3 pr-0 text-left transition-colors rounded-lg"
    :class="active ? 'bg-[var(--wa-active)]' : 'hover:bg-[var(--wa-hover)]'"
  >
    <div class="relative flex-shrink-0 py-2.5">
      <div class="w-[49px] h-[49px] rounded-full flex items-center justify-center text-white font-semibold" :style="{ background: avatarColor }">
        <svg v-if="conversation.type === 'class' || conversation.type === 'group'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"></path>
        </svg>
        <span v-else>{{ initials }}</span>
      </div>
      <span
        v-if="conversation.type === 'direct' && conversation.is_online"
        class="absolute bottom-3 right-0 w-3 h-3 rounded-full bg-[var(--wa-green)] border-2 border-[var(--wa-panel)]"
        title="Online"
      ></span>
    </div>

    <div class="min-w-0 flex-1 self-stretch flex flex-col justify-center pr-3 border-b border-[var(--wa-border)]">
      <div class="flex items-baseline justify-between gap-2">
        <h3 class="text-[16px] leading-[21px] text-[var(--wa-text)] truncate">{{ displayName }}</h3>
        <span
          v-if="conversation.last_message"
          class="text-[12px] flex-shrink-0"
          :class="conversation.unread_count ? 'text-[var(--wa-green)] font-medium' : 'text-[var(--wa-muted)]'"
        >{{ formatTime(conversation.last_message.created_at) }}</span>
      </div>
      <div class="flex items-center justify-between gap-2 mt-0.5 min-h-[20px]">
        <p class="text-[14px] leading-5 text-[var(--wa-muted)] truncate flex items-center gap-1 min-w-0">
          <span v-if="activityLine" class="text-[var(--wa-green)] font-medium truncate">{{ activityLine }}</span>
          <template v-else-if="conversation.last_message">
            <span v-if="conversation.last_message.is_mine" class="flex-shrink-0">You:</span>
            <span v-else-if="conversation.type !== 'direct'" class="flex-shrink-0">{{ firstName(conversation.last_message.sender_name) }}:</span>
            <span class="truncate">{{ previewText }}</span>
          </template>
          <span v-else class="italic">No messages yet</span>
        </p>
        <span
          v-if="conversation.unread_count"
          class="flex-shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-[var(--wa-green)] text-white text-[12px] font-semibold flex items-center justify-center"
        >
          {{ conversation.unread_count > 999 ? '999+' : conversation.unread_count }}
        </span>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { niceName } from '@/components/dashboard/teacher/time'
import { chatText } from '@/utils/chatText'
import type { Conversation } from '@/types/chat'
import '@/assets/whatsapp.css'

const props = defineProps<{ conversation: Conversation; active?: boolean }>()
defineEmits(['click'])

// People's names in normal case; class and group names ("S.1 - A (ICT)") as they are
const displayName = computed(() => (props.conversation.type === 'direct' ? niceName(props.conversation.name) : props.conversation.name))

// a steady colour per chat, from WhatsApp-like avatar tones
const AVATAR_COLORS = ['#00a884', '#128c7e', '#25d366', '#34b7f1', '#7f66ff', '#e542a3', '#fa6533', '#54656f', '#008069']
const avatarColor = computed(() => AVATAR_COLORS[Math.abs(props.conversation.id) % AVATAR_COLORS.length])

const initials = computed(() => {
  return displayName.value.split(/\s+/).filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?'
})
const firstName = (name: string) => niceName(name || '').split(' ')[0]

// "typing..." / "Kenny is recording audio..." in place of the last message, like WhatsApp
const activityLine = computed(() => {
  const list = props.conversation.activity
  if (!list?.length) return ''
  const verb = list[0].activity === 'recording' ? 'recording audio' : 'typing'
  if (props.conversation.type === 'direct') return `${verb}…`
  return list.length > 1 ? `${list.length} people are ${verb}…` : `${firstName(list[0].name)} is ${verb}…`
})

const previewText = computed(() => {
  const lm = props.conversation.last_message
  if (!lm) return ''
  if (lm.message) return chatText(lm.message)
  const labels: Record<string, string> = { image: '📷 Photo', audio: '🎤 Voice message', video: '🎥 Video', file: '📄 File' }
  return lm.attachment_type ? labels[lm.attachment_type] || 'Attachment' : ''
})

// today: time; yesterday: "Yesterday"; this week: weekday; older: date - as WhatsApp's list
const formatTime = (dateString: string) => {
  const date = new Date(dateString.replace(' ', 'T'))
  const now = new Date()
  const yesterday = new Date(); yesterday.setDate(now.getDate() - 1)
  if (date.toDateString() === now.toDateString()) return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
  if (now.getTime() - date.getTime() < 6 * 86400000) return date.toLocaleDateString('en-US', { weekday: 'long' })
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
</script>
