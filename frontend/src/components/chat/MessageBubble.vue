<template>
  <div class="flex mb-1.5" :class="message.is_mine ? 'justify-end' : 'justify-start'">
    <div class="group flex items-end gap-1.5 max-w-[78%] sm:max-w-[65%]" :class="message.is_mine ? 'flex-row-reverse' : 'flex-row'">
      <button
        v-if="!readOnly"
        @click="$emit('reply', message)"
        class="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 flex-shrink-0 mb-1"
        title="Reply"
      >
        <svg class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l-7 7 7 7m-7-7h13a5 5 0 015 5v1"></path>
        </svg>
      </button>

      <div
        class="rounded-2xl px-3 py-2 shadow-sm"
        :class="message.is_mine
          ? 'bg-indigo-600 dark:bg-[rgb(17_86_51)] text-white rounded-br-sm shadow-indigo-900/10 dark:shadow-[0_0_10px_rgba(21,135,74,0.35)]'
          : 'bg-white dark:bg-[rgb(31_41_55)] text-gray-900 dark:text-white rounded-bl-sm border border-black/5 dark:border-white/5'"
      >
        <p v-if="showSenderName" class="text-xs font-semibold mb-1" :class="message.is_mine ? 'text-indigo-100' : 'text-indigo-600 dark:text-indigo-400'">
          {{ niceName(message.sender_name || '') }}
        </p>

        <!-- Reply quote -->
        <button
          v-if="message.reply_to"
          @click="$emit('scroll-to', message.reply_to.id)"
          class="block w-full text-left mb-1.5 px-2 py-1.5 rounded-lg border-l-4 truncate"
          :class="message.is_mine ? 'bg-white/15 border-white/50' : 'bg-gray-100 dark:bg-[rgb(55_65_81)] border-indigo-500'"
        >
          <p class="text-xs font-medium truncate" :class="message.is_mine ? 'text-white/90' : 'text-indigo-600 dark:text-indigo-400'">
            {{ message.reply_to.sender_name ? niceName(message.reply_to.sender_name) : 'Message' }}
          </p>
          <p class="text-xs truncate" :class="message.is_mine ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'">
            {{ chatText(message.reply_to.message) || 'Attachment' }}
          </p>
        </button>

        <!-- Attachment -->
        <div v-if="message.attachment_type === 'image'" class="mb-1.5 -mx-1">
          <img :src="resolveAssetUrl(message.attachment)" @click="$emit('preview-image', resolveAssetUrl(message.attachment))" class="rounded-lg max-h-64 w-auto cursor-pointer" :alt="message.attachment_name || 'Image'">
        </div>
        <div v-else-if="message.attachment_type === 'audio'" class="mb-1">
          <AudioPlayer :src="resolveAssetUrl(message.attachment)" :is-mine="message.is_mine" />
        </div>
        <video v-else-if="message.attachment_type === 'video'" :src="resolveAssetUrl(message.attachment)" controls class="mb-1.5 rounded-lg max-h-64 max-w-full"></video>
        <a
          v-else-if="message.attachment_type === 'file'"
          :href="resolveAssetUrl(message.attachment)"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2 mb-1.5 px-2.5 py-2 rounded-lg"
          :class="message.is_mine ? 'bg-white/15 hover:bg-white/20' : 'bg-gray-100 dark:bg-[rgb(55_65_81)] hover:bg-gray-200 dark:hover:bg-[rgb(75_85_99)]'"
        >
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span class="text-sm truncate">{{ message.attachment_name || 'File' }}</span>
        </a>

        <p v-if="message.message" class="text-sm whitespace-pre-wrap break-words">{{ chatText(message.message) }}</p>

        <p class="text-[10px] mt-1 flex items-center justify-end gap-1" :class="message.is_mine ? 'text-indigo-100/80' : 'text-gray-400 dark:text-gray-500'">
          <span>{{ formatTime(message.created_at) }}</span>
          <svg
            v-if="message.is_mine && !readOnly"
            class="w-3.5 h-3.5 flex-shrink-0"
            :class="message.is_read ? 'text-lime-300' : 'text-indigo-100/60'"
            viewBox="0 0 16 15"
            fill="none"
          >
            <title>{{ message.is_read ? 'Read' : 'Sent' }}</title>
            <path d="M1 7.5L4.5 11L10.5 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.5 7.5L9 11L15 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AudioPlayer from './AudioPlayer.vue'
import type { ChatMessage } from '@/types/chat'
import { resolveAssetUrl } from '@/utils/url'
import { chatText } from '@/utils/chatText'
import { niceName } from '@/components/dashboard/teacher/time'

defineProps<{ message: ChatMessage; showSenderName?: boolean; readOnly?: boolean }>()
defineEmits<{ reply: [ChatMessage]; 'scroll-to': [number]; 'preview-image': [string] }>()

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}
</script>
