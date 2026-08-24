<template>
  <div class="border-t border-gray-200 dark:border-white/5 bg-white dark:bg-[#202c33] p-3">
    <!-- Reply preview -->
    <div v-if="replyingTo" class="flex items-start justify-between gap-2 mb-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#2a3942] border-l-4 border-emerald-500">
      <div class="min-w-0">
        <p class="text-xs font-medium text-emerald-600 dark:text-emerald-400">Replying to {{ replyingTo.sender_name }}</p>
        <p class="text-xs text-gray-600 dark:text-gray-300 truncate">{{ replyingTo.message || 'Attachment' }}</p>
      </div>
      <button @click="$emit('cancel-reply')" class="p-1 hover:bg-gray-200 dark:hover:bg-[#334752] rounded flex-shrink-0">
        <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Pending attachment preview -->
    <div v-if="pendingFile" class="flex items-center justify-between gap-2 mb-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#2a3942]">
      <div class="flex items-center gap-2 min-w-0">
        <img v-if="pendingPreviewUrl" :src="pendingPreviewUrl" class="w-10 h-10 rounded object-cover flex-shrink-0">
        <svg v-else class="w-6 h-6 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <span class="text-sm text-gray-700 dark:text-gray-300 truncate">{{ pendingFile.name }}</span>
      </div>
      <button @click="pendingFile = null" class="p-1 hover:bg-gray-200 dark:hover:bg-[#334752] rounded flex-shrink-0">
        <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Recording bar -->
    <div v-if="recorder.isRecording.value" class="flex items-center gap-3 px-2">
      <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse flex-shrink-0"></span>
      <span class="text-sm text-gray-700 dark:text-gray-300 flex-1">Recording... {{ formatDuration(recorder.seconds.value) }}</span>
      <button @click="recorder.cancel()" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a3942] text-gray-500">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      <button @click="stopAndSend" class="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
      </button>
    </div>

    <!-- Normal input row -->
    <div v-else class="flex items-end gap-2">
      <div class="relative flex-shrink-0" ref="emojiWrapperRef">
        <button @click="showEmojiPicker = !showEmojiPicker" class="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a3942] text-gray-500 dark:text-gray-400" title="Emoji">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
        <EmojiPicker v-if="showEmojiPicker" @select="insertEmoji" />
      </div>

      <button @click="fileInput?.click()" class="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a3942] text-gray-500 dark:text-gray-400 flex-shrink-0" title="Attach">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
        </svg>
      </button>
      <input ref="fileInput" type="file" accept="image/*,video/*,audio/*,.pdf,.doc,.docx" class="hidden" @change="handleFileSelect">

      <button @click="showCamera = true" class="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a3942] text-gray-500 dark:text-gray-400 flex-shrink-0" title="Camera">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      </button>
      <CameraCapture v-if="showCamera" @close="showCamera = false" @capture="handleCameraCapture" />

      <textarea
        v-model="text"
        rows="1"
        placeholder="Type a message..."
        class="flex-1 resize-none px-4 py-2.5 rounded-2xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2a3942] text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none max-h-32"
        @keydown.enter.exact.prevent="handleSend"
        ref="textareaRef"
        @input="autoGrow"
      ></textarea>

      <button
        v-if="text.trim() || pendingFile"
        @click="handleSend"
        :disabled="sending"
        class="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex-shrink-0 disabled:opacity-50 transition-shadow dark:shadow-[0_0_14px_2px_rgba(16,185,129,0.55)]"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
        </svg>
      </button>
      <button v-else @click="startRecording" class="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a3942] text-gray-500 dark:text-gray-400 flex-shrink-0" title="Record voice message">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-14 0m7 7v3m-3 0h6M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3z"></path>
        </svg>
      </button>
    </div>
    <p v-if="recorder.error.value" class="text-xs text-red-500 mt-1">{{ recorder.error.value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAudioRecorder } from '@/composables/useAudioRecorder'
import EmojiPicker from './EmojiPicker.vue'
import CameraCapture from './CameraCapture.vue'
import type { ChatMessage } from '@/types/chat'

const props = defineProps<{ replyingTo: ChatMessage | null; sending?: boolean }>()
const emit = defineEmits<{
  send: [{ message: string; file: File | null; replyToId: number | null }]
  'cancel-reply': []
}>()

const text = ref('')
const pendingFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const showCamera = ref(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const showEmojiPicker = ref(false)
const emojiWrapperRef = ref<HTMLElement | null>(null)
const recorder = useAudioRecorder()

const pendingPreviewUrl = computed(() => {
  if (pendingFile.value && pendingFile.value.type.startsWith('image/')) {
    return URL.createObjectURL(pendingFile.value)
  }
  return null
})

const autoGrow = () => {
  if (!textareaRef.value) return
  textareaRef.value.style.height = 'auto'
  textareaRef.value.style.height = Math.min(textareaRef.value.scrollHeight, 128) + 'px'
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  pendingFile.value = target.files?.[0] || null
  target.value = ''
}

const handleCameraCapture = (file: File) => {
  pendingFile.value = file
  showCamera.value = false
}

const insertEmoji = (emoji: string) => {
  const el = textareaRef.value
  if (!el) {
    text.value += emoji
    return
  }
  const start = el.selectionStart ?? text.value.length
  const end = el.selectionEnd ?? text.value.length
  text.value = text.value.slice(0, start) + emoji + text.value.slice(end)
  requestAnimationFrame(() => {
    el.focus()
    const cursor = start + emoji.length
    el.setSelectionRange(cursor, cursor)
    autoGrow()
  })
}

const handleClickOutside = (event: MouseEvent) => {
  if (showEmojiPicker.value && emojiWrapperRef.value && !emojiWrapperRef.value.contains(event.target as Node)) {
    showEmojiPicker.value = false
  }
}

const handleSend = () => {
  if (props.sending || (!text.value.trim() && !pendingFile.value)) return
  emit('send', { message: text.value.trim(), file: pendingFile.value, replyToId: props.replyingTo?.id ?? null })
  text.value = ''
  pendingFile.value = null
  showEmojiPicker.value = false
  if (textareaRef.value) textareaRef.value.style.height = 'auto'
}

const startRecording = () => {
  recorder.start()
}

const stopAndSend = async () => {
  const blob = await recorder.stop()
  if (!blob) return
  const file = new File([blob], `voice-note-${Date.now()}.webm`, { type: blob.type || 'audio/webm' })
  emit('send', { message: '', file, replyToId: props.replyingTo?.id ?? null })
}

const formatDuration = (secs: number) => {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  recorder.cancel()
  document.removeEventListener('click', handleClickOutside)
})
</script>
