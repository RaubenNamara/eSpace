<template>
  <!-- One message, WhatsApp Web style (assets/whatsapp.css): light-green when mine, white when
       theirs, a tail on the first of a run, time and ticks tucked into the bottom-right corner. -->
  <div class="flex px-[4%] sm:px-[7%]" :class="[message.is_mine ? 'justify-end' : 'justify-start', tail ? 'mt-2' : 'mt-0.5']">
    <!-- group chats: who sent it, as a small avatar on the first of their run -->
    <div v-if="showAvatar !== undefined && !message.is_mine" class="w-8 flex-shrink-0 mr-1.5">
      <div v-if="showAvatar" class="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold text-white" :style="{ background: nameColor }">{{ initials }}</div>
    </div>

    <div class="group relative max-w-[85%] sm:max-w-[65%]">
      <div
        class="wa-bubble px-2 pt-1.5 pb-1.5 text-[14.2px] leading-[19px]"
        :class="[message.is_mine ? 'wa-bubble-out' : 'wa-bubble-in', tail ? (message.is_mine ? 'wa-tail-out' : 'wa-tail-in') : '']"
      >
        <p v-if="showSenderName && tail" class="text-[12.8px] font-medium leading-5 -mt-0.5 mb-0.5" :style="{ color: nameColor }">
          {{ niceName(message.sender_name || '') }}
        </p>

        <!-- Reply quote -->
        <button
          v-if="message.reply_to"
          @click="$emit('scroll-to', message.reply_to.id)"
          class="block w-full text-left mb-1 px-2 py-1.5 rounded-md border-l-4 border-[var(--wa-green)] bg-[var(--wa-quote)]"
        >
          <p class="text-[12.8px] font-medium truncate text-[var(--wa-green-dark)] dark:text-[var(--wa-green)]">
            {{ message.reply_to.sender_name ? niceName(message.reply_to.sender_name) : 'Message' }}
          </p>
          <p class="text-[13px] truncate text-[var(--wa-muted)]">{{ chatText(message.reply_to.message) || 'Attachment' }}</p>
        </button>

        <!-- Attachment -->
        <div v-if="message.attachment_type === 'image'" class="mb-1 -mx-1 -mt-0.5">
          <img :src="resolveAssetUrl(message.attachment)" @click="$emit('preview-image', resolveAssetUrl(message.attachment))" class="rounded-md max-h-72 w-auto cursor-pointer" :alt="message.attachment_name || 'Image'">
        </div>
        <div v-else-if="message.attachment_type === 'audio'" class="mb-1 min-w-[220px]">
          <AudioPlayer :src="resolveAssetUrl(message.attachment)" :is-mine="message.is_mine" />
        </div>
        <video v-else-if="message.attachment_type === 'video'" :src="resolveAssetUrl(message.attachment)" controls class="mb-1 rounded-md max-h-72 max-w-full"></video>
        <a
          v-else-if="message.attachment_type === 'file'"
          :href="resolveAssetUrl(message.attachment)"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2.5 mb-1 px-3 py-2.5 rounded-md bg-[var(--wa-quote)] hover:opacity-90"
        >
          <svg class="w-8 h-8 flex-shrink-0 text-[var(--wa-icon)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span class="text-sm truncate">{{ message.attachment_name || 'File' }}</span>
        </a>

        <!-- text, with the time and ticks floating into its last line like WhatsApp -->
        <p class="flow-root whitespace-pre-wrap break-words">
          <span v-if="message.message">{{ chatText(message.message) }}</span>
          <span class="float-right ml-2.5 mt-1.5 -mb-0.5 flex items-center gap-0.5 text-[11px] leading-[15px] text-[var(--wa-muted)] select-none">
            {{ formatTime(message.created_at) }}
            <!-- one grey = sent, two grey = delivered, two blue = read -->
            <svg v-if="message.is_mine && !readOnly" class="w-[18px] h-[15px] flex-shrink-0" viewBox="0 0 18 15" fill="none" :style="{ color: tick === 'read' ? 'var(--wa-tick-read)' : 'var(--wa-tick)' }">
              <title>{{ tick === 'read' ? 'Read' : tick === 'delivered' ? 'Delivered' : 'Sent' }}</title>
              <path v-if="tick === 'sent'" d="M4 7.6l3.4 3.4L14 4.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <template v-else>
                <path d="M1.5 7.6l3.4 3.4L11.5 4.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.5 9.9l1.1 1.1L15.2 4.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </template>
            </svg>
          </span>
        </p>
      </div>

      <!-- reply, on hover (like WhatsApp's message menu) -->
      <button
        v-if="!readOnly"
        @click="$emit('reply', message)"
        class="absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-full bg-[var(--wa-panel)] shadow flex items-center justify-center text-[var(--wa-icon)]"
        :class="message.is_mine ? '-left-10' : '-right-10'"
        title="Reply"
        aria-label="Reply"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l-7 7 7 7m-7-7h13a5 5 0 015 5v1"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AudioPlayer from './AudioPlayer.vue'
import type { ChatMessage } from '@/types/chat'
import { resolveAssetUrl } from '@/utils/url'
import { chatText } from '@/utils/chatText'
import { niceName } from '@/components/dashboard/teacher/time'
import '@/assets/whatsapp.css'

const props = defineProps<{
  message: ChatMessage
  showSenderName?: boolean
  readOnly?: boolean
  /** first message of a run from the same sender - gets the bubble tail and a little more space */
  tail?: boolean
  /** group chats: undefined = no avatar column; true/false = show the sender's avatar / keep its space */
  showAvatar?: boolean
}>()
defineEmits<{ reply: [ChatMessage]; 'scroll-to': [number]; 'preview-image': [string] }>()

// older servers only send is_read
const tick = computed(() => props.message.status ?? (props.message.is_read ? 'read' : 'sent'))

// each group member keeps one colour for their name, as on WhatsApp
const NAME_COLORS = ['#e542a3', '#02a698', '#7f66ff', '#d3396d', '#1f7aec', '#fa6533', '#6bcbef', '#a62c71', '#008069', '#ff8b53']
const nameColor = computed(() => {
  const key = `${props.message.sender_role}:${props.message.sender_id}`
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return NAME_COLORS[h % NAME_COLORS.length]
})
const initials = computed(() => niceName(props.message.sender_name || '').split(/\s+/).filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?')

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}
</script>
