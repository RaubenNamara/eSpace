<template>
  <!-- A spoken note on a script. The teacher records (up to two minutes), listens back, and keeps
       or redoes it; the student hears it with their returned script. With `readonly` it is just
       the player. -->
  <div class="voice-note rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-3">
    <div class="flex items-center gap-2 mb-2">
      <span class="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 flex items-center justify-center flex-shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
      </span>
      <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ readonly ? 'Voice note from your teacher' : 'Voice note' }}</p>
      <span v-if="savedUrl && !recording && !draftUrl" class="ml-auto text-[11px] text-gray-400">{{ fmt(savedSeconds) }}</span>
    </div>

    <!-- Recording -->
    <div v-if="recording" class="flex items-center gap-3">
      <span class="relative flex w-3 h-3"><span class="absolute inline-flex w-full h-full rounded-full bg-rose-400 opacity-75 animate-ping"></span><span class="relative inline-flex w-3 h-3 rounded-full bg-rose-500"></span></span>
      <span class="text-sm font-semibold tabular-nums text-rose-600 dark:text-rose-400">{{ fmt(elapsed) }}</span>
      <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full bg-rose-500 transition-all" :style="{ width: `${(elapsed / MAX) * 100}%` }"></span></span>
      <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-900 text-white dark:bg-white dark:text-gray-900" @click="stop">Stop</button>
    </div>

    <!-- Just recorded: listen, keep or redo -->
    <div v-else-if="draftUrl" class="space-y-2">
      <audio :src="draftUrl" controls class="w-full h-10"></audio>
      <div class="flex flex-wrap gap-2">
        <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" :disabled="saving" @click="upload">{{ saving ? 'Saving…' : 'Keep it' }}</button>
        <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200" :disabled="saving" @click="discard">Redo</button>
      </div>
    </div>

    <!-- The saved note -->
    <div v-else-if="savedUrl" class="space-y-2">
      <audio :src="savedUrl" controls preload="none" class="w-full h-10"></audio>
      <div v-if="!readonly && !disabled" class="flex gap-2">
        <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200" @click="start">Record again</button>
        <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20" @click="remove">Remove</button>
      </div>
    </div>

    <!-- Nothing yet -->
    <div v-else-if="!readonly">
      <button type="button" class="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 hover:bg-rose-100 disabled:opacity-50" :disabled="disabled" @click="start">
        <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Record a note
      </button>
      <p class="mt-1.5 text-[11px] text-gray-500 dark:text-gray-400">Up to two minutes - often quicker than typing, and students hear your voice.</p>
    </div>
    <p v-if="problem" class="mt-2 text-xs text-rose-600 dark:text-rose-400">{{ problem }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import axios from 'axios'
import { resolveAssetUrl } from '@/utils/url'

const props = withDefaults(defineProps<{
  path?: string | null
  seconds?: number | null
  endpoint?: string
  readonly?: boolean
  disabled?: boolean
}>(), { path: null, seconds: null, endpoint: '', readonly: false, disabled: false })
const emit = defineEmits<{ changed: [path: string | null, seconds: number | null] }>()

const MAX = 120
const currentPath = ref<string | null>(props.path)
const savedSeconds = ref<number>(props.seconds || 0)
const savedUrl = computed(() => (currentPath.value ? resolveAssetUrl(currentPath.value) : ''))

const recording = ref(false)
const elapsed = ref(0)
const draftUrl = ref('')
const saving = ref(false)
const problem = ref('')
let recorder: MediaRecorder | null = null
let stream: MediaStream | null = null
let chunks: Blob[] = []
let draftBlob: Blob | null = null
let timer: number | null = null

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`

const pickType = () => ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'].find(t => typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(t)) || ''

const start = async () => {
  problem.value = ''
  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
    problem.value = 'This browser cannot record audio - try Chrome or Edge.'
    return
  }
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  } catch {
    problem.value = 'The microphone is blocked - allow it in the browser and try again.'
    return
  }
  const type = pickType()
  recorder = new MediaRecorder(stream, type ? { mimeType: type } : undefined)
  chunks = []
  recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data) }
  recorder.onstop = () => {
    draftBlob = new Blob(chunks, { type: recorder?.mimeType || type || 'audio/webm' })
    draftUrl.value = URL.createObjectURL(draftBlob)
    stream?.getTracks().forEach(t => t.stop())
  }
  recorder.start()
  recording.value = true
  elapsed.value = 0
  timer = window.setInterval(() => {
    elapsed.value++
    if (elapsed.value >= MAX) stop()
  }, 1000)
}

const stop = () => {
  if (timer) { clearInterval(timer); timer = null }
  recording.value = false
  if (recorder && recorder.state !== 'inactive') recorder.stop()
}

const discard = () => {
  if (draftUrl.value) URL.revokeObjectURL(draftUrl.value)
  draftUrl.value = ''
  draftBlob = null
  start()
}

const upload = async () => {
  if (!draftBlob || !props.endpoint) return
  saving.value = true
  problem.value = ''
  try {
    const form = new FormData()
    const ext = draftBlob.type.includes('mp4') ? 'm4a' : draftBlob.type.includes('ogg') ? 'ogg' : 'webm'
    form.append('audio', draftBlob, `voice-note.${ext}`)
    form.append('seconds', String(Math.max(1, elapsed.value)))
    const res = await axios.post(props.endpoint, form)
    currentPath.value = res.data.data.voice_feedback_path
    savedSeconds.value = res.data.data.voice_feedback_seconds
    URL.revokeObjectURL(draftUrl.value)
    draftUrl.value = ''
    draftBlob = null
    emit('changed', currentPath.value, savedSeconds.value)
  } catch (err: any) {
    problem.value = err.response?.data?.message || 'The voice note could not be saved - check the connection and try again.'
  } finally {
    saving.value = false
  }
}

const remove = async () => {
  if (!props.endpoint) return
  try {
    await axios.delete(props.endpoint)
    currentPath.value = null
    savedSeconds.value = 0
    emit('changed', null, null)
  } catch (err: any) {
    problem.value = err.response?.data?.message || 'Could not remove the voice note.'
  }
}

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
  if (recorder && recorder.state !== 'inactive') recorder.stop()
  stream?.getTracks().forEach(t => t.stop())
  if (draftUrl.value) URL.revokeObjectURL(draftUrl.value)
})
</script>
