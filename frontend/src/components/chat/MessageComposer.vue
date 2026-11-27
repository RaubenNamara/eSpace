<template>
  <!-- WhatsApp Web style composer (assets/whatsapp.css): grey bar, white rounded input, grey icons.
       The message box is a small Tiptap editor: Enter sends, Shift+Enter starts a new line, web
       addresses become links, and Ctrl+B / Ctrl+I / Ctrl+U still format. The server cleans what is
       sent (backend ChatHtml). -->
  <div class="bg-[var(--wa-panel-header)] px-2 sm:px-4 py-2.5">
    <!-- Reply preview -->
    <div v-if="replyingTo" class="flex items-start justify-between gap-2 mb-2 px-3 py-2 rounded-lg bg-[var(--wa-input)] border-l-4 border-[var(--wa-green)]">
      <div class="min-w-0">
        <p class="text-xs font-medium text-[var(--wa-green-dark)] dark:text-[var(--wa-green)]">Replying to {{ replyingTo.sender_name }}</p>
        <p class="text-xs text-gray-600 dark:text-gray-300 truncate">{{ chatText(replyingTo.message) || 'Attachment' }}</p>
      </div>
      <button @click="$emit('cancel-reply')" class="p-1 hover:bg-gray-200 dark:hover:bg-[rgb(75_85_99)] rounded flex-shrink-0" aria-label="Cancel reply">
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
      <button @click="pendingFile = null" class="p-1 hover:bg-gray-200 dark:hover:bg-[rgb(75_85_99)] rounded flex-shrink-0" aria-label="Remove attachment">
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
      <button type="button" @click="stopAndSend" class="w-[38px] h-[38px] rounded-full bg-[var(--wa-green)] hover:brightness-95 text-[var(--wa-on-accent)] flex items-center justify-center" title="Send voice message" aria-label="Send voice message">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" /></svg>
      </button>
    </div>

    <!-- Normal row: one rounded bar with attach, emoji, the message box and mic / send. Kept
         (hidden) while recording, so a half-written message is still there afterwards. -->
    <div v-show="!recorder.isRecording.value" class="flex items-end gap-1 min-h-[46px] pl-1.5 pr-1.5 py-[5px] rounded-[24px] bg-[var(--wa-input)]">
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

      <!-- the message box -->
      <div class="relative flex-1 min-w-0 self-center">
        <span v-if="isEmpty" class="absolute left-2 top-1/2 -translate-y-1/2 text-[15px] text-[var(--wa-muted)] pointer-events-none select-none truncate max-w-full">Type a message</span>
        <EditorContent :editor="editor" class="max-h-32 overflow-y-auto wa-scroll" />
      </div>

      <button
        v-if="hasText || pendingFile"
        type="button"
        @click="handleSend"
        :disabled="sending"
        class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center bg-[var(--wa-green)] hover:brightness-95 text-[var(--wa-on-accent)] disabled:opacity-50"
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
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { useAudioRecorder } from '@/composables/useAudioRecorder'
import { chatText } from '@/utils/chatText'
import EmojiPicker from './EmojiPicker.vue'
import CameraCapture from './CameraCapture.vue'
import type { ChatMessage } from '@/types/chat'

const props = defineProps<{ replyingTo: ChatMessage | null; sending?: boolean }>()
const emit = defineEmits<{
  /** html: the formatted message (null when it is plain text); message: its plain text */
  send: [{ message: string; html: string | null; file: File | null; replyToId: number | null }]
  'cancel-reply': []
  /** typing / recording a voice note, or stopped - the others see "typing..." / "recording audio..." */
  activity: ['typing' | 'recording' | null]
}>()

const pendingFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const showCamera = ref(false)
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

// ---- the editor ---------------------------------------------------------------------------------
const isEmpty = ref(true)
const hasText = ref(false)

/** Enter sends (as before); Shift+Enter: a new list item inside a list, a new line anywhere else */
const SendKeys = Extension.create({
  name: 'chatSendKeys',
  addKeyboardShortcuts() {
    return {
      Enter: () => { handleSend(); return true },
      'Shift-Enter': ({ editor }) => editor.commands.first(({ commands }) => [
        () => commands.splitListItem('listItem'),
        () => commands.splitBlock(),
      ]),
    }
  },
})

const editor = useEditor({
  extensions: [
    // only what the bar offers: no headings, code blocks, images or tables
    StarterKit.configure({ heading: false, codeBlock: false, dropcursor: false, gapcursor: false }),
    Underline,
    Link.configure({
      openOnClick: false,
      autolink: true,
      linkOnPaste: true,
      defaultProtocol: 'https',
      HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer nofollow' },
      isAllowedUri: (url: string) => /^(https?:\/\/|mailto:|www\.)/i.test(url.trim()),
    }),
    SendKeys,
  ],
  editorProps: {
    attributes: { class: 'wa-rich wa-editor px-2 py-[8px] text-[15px] leading-5 text-[var(--wa-text)]', 'aria-label': 'Message', role: 'textbox', 'aria-multiline': 'true' },
  },
  onUpdate: ({ editor: ed }) => {
    const text = ed.getText().trim()
    isEmpty.value = ed.isEmpty
    hasText.value = text !== ''
    emit('activity', text ? 'typing' : null)
  },
})

/** HTML with anything beyond plain paragraphs and line breaks */
const isFormatted = (html: string) => /<(?!\/?(p|br)\b)[a-z]/i.test(html)

// ---- the rest of the composer ------------------------------------------------------------------
const pendingPreviewUrl = computed(() => {
  if (pendingFile.value && pendingFile.value.type.startsWith('image/')) {
    return URL.createObjectURL(pendingFile.value)
  }
  return null
})

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
  editor.value?.chain().focus().insertContent(emoji).run()
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  if (showEmojiPicker.value && emojiWrapperRef.value && !emojiWrapperRef.value.contains(target)) {
    showEmojiPicker.value = false
  }
  if (showAttachMenu.value && attachWrapperRef.value && !attachWrapperRef.value.contains(target)) {
    showAttachMenu.value = false
  }
}

// recording: reported every second while it lasts (the page throttles), cleared when it ends
watch([() => recorder.isRecording.value, () => recorder.seconds.value], ([recording]) => {
  emit('activity', recording ? 'recording' : null)
})

function handleSend() {
  const ed = editor.value
  if (!ed || props.sending) return
  const message = ed.getText({ blockSeparator: '\n' }).trim()
  if (!message && !pendingFile.value) return
  const html = ed.getHTML()
  emit('activity', null)
  emit('send', { message, html: message && isFormatted(html) ? html : null, file: pendingFile.value, replyToId: props.replyingTo?.id ?? null })
  ed.commands.clearContent(true)
  // the next message starts plain: no bold (or other style) carried over from the last word typed
  ed.view.dispatch(ed.state.tr.setStoredMarks([]))
  pendingFile.value = null
  showEmojiPicker.value = false
}

const startRecording = () => {
  recorder.start()
}

const stopAndSend = async () => {
  const blob = await recorder.stop()
  if (!blob) return
  const file = new File([blob], `voice-note-${Date.now()}.webm`, { type: blob.type || 'audio/webm' })
  emit('send', { message: '', html: null, file, replyToId: props.replyingTo?.id ?? null })
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
