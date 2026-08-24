<template>
  <button
    @click="$emit('click')"
    class="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-gray-100 dark:border-white/5"
    :class="active ? 'bg-emerald-50 dark:bg-[#2a3942]' : 'hover:bg-gray-50 dark:hover:bg-[#182229]'"
  >
    <div class="relative flex-shrink-0">
      <div
        class="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-br"
        :class="avatarPalette"
      >
        <svg v-if="conversation.type === 'class'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"></path>
        </svg>
        <span v-else>{{ initials }}</span>
      </div>
      <span
        v-if="conversation.type === 'direct' && conversation.is_online"
        class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#111b21] dark:shadow-[0_0_6px_2px_rgba(16,185,129,0.65)]"
        title="Online"
      ></span>
    </div>

    <div class="min-w-0 flex-1">
      <div class="flex items-center justify-between gap-2">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ conversation.name }}</h3>
        <span v-if="conversation.last_message" class="text-[11px] text-gray-400 dark:text-gray-500 flex-shrink-0">{{ formatTime(conversation.last_message.created_at) }}</span>
      </div>
      <div class="flex items-center justify-between gap-2 mt-0.5">
        <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
          <span v-if="conversation.last_message">
            <span v-if="conversation.last_message.is_mine" class="text-gray-400">You: </span>{{ previewText }}
          </span>
          <span v-else class="italic">No messages yet</span>
        </p>
        <span
          v-if="conversation.unread_count"
          class="flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-600 text-white text-[10px] font-semibold flex items-center justify-center"
        >
          {{ conversation.unread_count > 99 ? '99+' : conversation.unread_count }}
        </span>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Conversation } from '@/types/chat'

const props = defineProps<{ conversation: Conversation; active?: boolean }>()
defineEmits(['click'])

const palettes = [
  'from-emerald-500 to-teal-600', 'from-blue-500 to-cyan-600', 'from-indigo-500 to-purple-600',
  'from-amber-500 to-orange-600', 'from-rose-500 to-pink-600', 'from-violet-500 to-fuchsia-600'
]
const avatarPalette = computed(() => palettes[Math.abs(props.conversation.id) % palettes.length])

const initials = computed(() => {
  return props.conversation.name.split(/\s+/).filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?'
})

const previewText = computed(() => {
  const lm = props.conversation.last_message
  if (!lm) return ''
  if (lm.message) return lm.message
  const labels: Record<string, string> = { image: '📷 Photo', audio: '🎤 Voice message', video: '🎥 Video', file: '📄 File' }
  return lm.attachment_type ? labels[lm.attachment_type] || 'Attachment' : ''
})

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  if (isToday) return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>
