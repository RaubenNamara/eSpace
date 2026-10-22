<template>
  <!-- WhatsApp Web style composer (assets/whatsapp.css): grey bar, white rounded input, grey icons -->
  <div class="bg-[var(--wa-panel-header)] px-2 sm:px-4 py-2.5">
    <!-- Reply preview -->
    <div v-if="replyingTo" class="flex items-start justify-between gap-2 mb-2 px-3 py-2 rounded-lg bg-[var(--wa-input)] border-l-4 border-[var(--wa-green)]">
      <div class="min-w-0">
        <p class="text-xs font-medium text-[var(--wa-green-dark)] dark:text-[var(--wa-green)]">Replying to {{ replyingTo.sender_name }}</p>
        <p class="text-xs text-gray-600 dark:text-gray-300 truncate">{{ replyingTo.message || 'Attachment' }}</p>
      </div>
      <button @click="$emit('cancel-reply')" class="p-1 hover:bg-gray-200 dark:hover:bg-[rgb(75_85_99)] rounded flex-shrink-0">
        <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Pending attachment preview -->
    <div v-if="pendingFile" class="flex items-center justify-between gap-2 mb-2 px-3 py-2 rounded-lg bg-[var(--wa-input)]">
      <div class="flex items-center gap-2 min-w-0">
        <img v-if="pendingPreviewUrl" :src="pendingPreviewUrl" class="w-10 h-10 rounded object-cover flex-shrink-0">
        <svg v-else class="w-6 h-6 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <span class="text-sm text-gray-700 dark:text-gray-300 truncate">{{ pendingFile.name }}</span>
      </div>
      <button @click="pendingFile = null" class="p-1 hover:bg-gray-200 dark:hover:bg-[rgb(75_85_99)] rounded flex-shrink-0">
        <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Recording: delete, red dot + time, send - in the same rounded bar, as on WhatsApp -->
    <div v-if="recorder.isRecording.value" class="flex items-center gap-2 h-[46px] pl-2 pr-1.5 rounded-full bg-[var(--wa-input)]">
      <button type="button" @click="recorder.cancel()" class="w-9 h-9 rounded-full flex items-center justify-center text-[var(--wa-icon)] hover:bg-black/5 dark:hover:bg-white/5" title="Delete recording" aria-label="Delete recording">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      </button>
      <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse flex-shrink-0"></span>
      <span class="text-[15px] text-[var(--wa-text)] tabular-nums">{{ formatDuration(recorder.seconds.value) }}</span>
      <span class="flex-1 text-[13px] text-[var(--wa-muted)] truncate">Recording…</span>
      <button type="button" @click="stopAndSend" class="w-[38px] h-[38px] rounded-full bg-[var(--wa-green)] hover:brightness-95 text-white flex items-center justify-center" title="Send voice message" aria-label="Send voice message">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" /></svg>
      </button>
    </div>

    <!-- Normal row: one rounded bar with attach, emoji, the message box and mic / send -->
    <div v-else class="flex items-end gap-1 min-h-[46px] pl-1.5 pr-1.5 py-[5px] rounded-[24px] bg-[var(--wa-input)]">
      <div class="relative flex-shrink-0" ref="attachWrapperRef">
        <button type="button" @click="showAttachMenu = !showAttachMenu" class="w-9 h-9 rounded-full flex items-center justify-center text-[var(--wa-icon)] hover:bg-black/5 dark:hover:bg-white/5 transition-transform" :class="showAttachMenu ? 'rotate-45 bg-black/5 dark:bg-white/10' : ''" title="Attach" aria-label="Attach">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14M5 12h14" /></svg>
        </button>
        <!-- WhatsApp's attach menu -->
        <div v-if="showAttachMenu" class="absolute bottom-full left-0 mb-3 w-56 rounded-2xl bg-[var(--wa-panel)] shadow-xl border border-[var(--wa-border)] py-2 z-30">
          <button type="button" class="w-full flex items-center gap-3.5 px-4 py-2.5 text-[15px] text-[var(--wa-text)] hover:bg-[var(--wa-hover)]" @click="pickFile('image/*,video/*')">
            <span class="w-6 h-6 flex items-center justify-center text-[#007bfc]"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 5h-3.17L15 3H9L7.17 5H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2zm-8 13a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" /></svg></span>
            Photos &amp; videos
          </button>
          <button type="button" class="w-full flex items-center gap-3.5 px-4 py-2.5 text-[15px] text-[var(--wa-text)] hover:bg-[var(--wa-hover)]" @click="showAttachMenu = false; showCamera = true">
            <span class="w-6 h-6 flex items-center justify-center text-[#ff2e74]"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z" /><path d="M9 2L7.17 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2h-3.17L15 2H9zm3 15a5 5 0 110-10 5 5 0 010 10z" /></svg></span>
            Camera
          </button>
          <button type="button" class="w-full flex items-center gap-3.5 px-4 py-2.5 text-[15px] text-[var(--wa-text)] hover:bg-[var(--wa-hover)]" @click="pickFile('.pdf,.doc,.docx,audio/*')">
            <span class="w-6 h-6 flex items-center justify-center text-[#7f66ff]"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 7V3.5L18.5 9H13z" /></svg></span>
            Document
          </button>
        </div>
      </div>
      <input ref="fileInput" type="file" :accept="fileAccept" class="hidden" @change="handleFileSelect">
      <CameraCapture v-if="showCamera" @close="showCamera = false" @capture="handleCameraCapture" />

      <div class="relative flex-shrink-0" ref="emojiWrapperRef">
        <button type="button" @click="showEmojiPicker = !showEmojiPicker" class="w-9 h-9 rounded-full flex items-center justify-center text-[var(--wa-icon)] hover:bg-black/5 dark:hover:bg-white/5" title="Emoji" aria-label="Emoji">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
        <EmojiPicker v-if="showEmojiPicker" @select="insertEmoji" />
      </div>

      <textarea
        v-model="text"
        rows="1"
        placeholder="Type a message"
        class="flex-1 min-w-0 resize-none px-2 py-[8px] border-0 bg-transparent text-[var(--wa-text)] placeholder-[var(--wa-muted)] text-[15px] leading-5 focus:ring-0 focus:outline-none max-h-32"
        @keydown.enter.exact.prevent="handleSend"
        ref="textareaRef"
        @input="autoGrow(); emit('activity', text.trim() ? 'typing' : null)"
      ></textarea>

      <button
        v-if="text.trim() || pendingFile"
        type="button"
        @click="handleSend"
        :disabled="sending"
        class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center bg-[var(--wa-green)] hover:brightness-95 text-white disabled:opacity-50"
        title="Send"
        aria-label="Send"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" /></svg>
      </button>
      <button v-else type="button" @click="startRecording" class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-[var(--wa-icon)] hover:bg-black/5 dark:hover:bg-white/5" title="Record voice message" aria-label="Record voice message">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 11a7 7 0 01-14 0m7 7v3m-3 0h6M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3z" /></svg>
      </button>
    </div>
    <p v-if="recorder.error.value" class="text-xs text-red-500 mt-1">{{ recorder.error.value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useAudioRecorder } from '@/composables/useAudioRecorder'
import EmojiPicker from './EmojiPicker.vue'
import CameraCapture from './CameraCapture.vue'
import type { ChatMessage } from '@/types/chat'

const props = defineProps<{ replyingTo: ChatMessage | null; sending?: boolean }>()
const emit = defineEmits<{
  send: [{ message: string; file: File | null; replyToId: number | null }]
  'cancel-reply': []
  /** typing / recording a voice note, or stopped - the others see "typing..." / "recording audio..." */
  activity: ['typing' | 'recording' | null]
}>()

const text = ref('')
const pendingFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const showCamera = ref(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const showEmojiPicker = ref(false)
const showAttachMenu = ref(false)
const attachWrapperRef = ref<HTMLElement | null>(null)
const fileAccept = ref('image/*,video/*,audio/*,.pdf,.doc,.docx')
/** Attach menu: open the file picker for photos/videos or for documents */
const pickFile = (accept: string) => {
  showAttachMenu.value = false
  fileAccept.value = accept
  nextTick(() => fileInput.value?.click())
}
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
  if (showAttachMenu.value && attachWrapperRef.value && !attachWrapperRef.value.contains(event.target as Node)) {
    showAttachMenu.value = false
  }
}

// recording: reported every second while it lasts (the page throttles), cleared when it ends
watch([() => recorder.isRecording.value, () => recorder.seconds.value], ([recording]) => {
  emit('activity', recording ? 'recording' : null)
})

const handleSend = () => {
  if (props.sending || (!text.value.trim() && !pendingFile.value)) return
  emit('activity', null)
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
