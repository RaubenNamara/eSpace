<template>
  <!-- A student's evidence of one topic competency: what they've attached (and what their teacher
       said), and a way to add more - a photo, document, short video or voice recording, with a note
       on what it shows. Their teacher confirms it or returns it with a comment. -->
  <div>
    <div class="flex items-center justify-between gap-2 mb-1.5">
      <p class="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">My evidence</p>
      <button v-if="available && !adding" type="button" class="text-xs font-semibold text-violet-700 dark:text-violet-300 hover:underline" @click="adding = true">+ Add evidence</button>
    </div>

    <p v-if="!available" class="text-xs text-gray-500 dark:text-gray-400">Evidence isn't set up on this server yet.</p>
    <p v-else-if="!loading && !items.length && !adding" class="text-xs text-gray-500 dark:text-gray-400">
      Show what you can do - a photo of your work, a short video, a voice explanation or a document. Your teacher confirms it.
    </p>

    <ul v-if="items.length" class="space-y-2 mb-2">
      <li v-for="e in items" :key="e.id" class="rounded-lg border p-2.5" :class="STATUS[e.status].box">
        <div class="flex items-start gap-2.5">
          <a v-if="e.file_kind === 'image' && e.file_path" :href="e.file_path" target="_blank" rel="noopener" class="flex-shrink-0">
            <img :src="e.file_path" alt="" class="w-14 h-14 rounded-md object-cover border border-gray-200 dark:border-gray-700">
          </a>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="px-1.5 py-0.5 rounded text-[10px] font-bold" :class="STATUS[e.status].chip">{{ STATUS[e.status].label }}</span>
              <span class="text-[11px] text-gray-500 dark:text-gray-400">{{ new Date(e.created_at.replace(' ', 'T')).toLocaleDateString() }}</span>
            </div>
            <p v-if="e.note" class="text-sm text-gray-800 dark:text-gray-100 mt-1 whitespace-pre-line">{{ e.note }}</p>
            <audio v-if="e.file_kind === 'audio' && e.file_path" :src="e.file_path" controls preload="none" class="mt-1.5 w-full max-w-xs h-9"></audio>
            <video v-else-if="e.file_kind === 'video' && e.file_path" :src="e.file_path" controls preload="none" class="mt-1.5 w-full max-w-xs rounded-md"></video>
            <a v-else-if="e.file_kind === 'pdf' && e.file_path" :href="e.file_path" target="_blank" rel="noopener" class="inline-block mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">{{ e.original_name || 'Open document' }}</a>
            <p v-if="e.teacher_comment" class="text-xs mt-1.5 p-2 rounded-md bg-white/70 dark:bg-gray-800/60 text-gray-700 dark:text-gray-200">
              <span class="font-semibold">Teacher:</span> {{ e.teacher_comment }}
            </p>
          </div>
          <button v-if="e.status !== 'confirmed'" type="button" class="text-[11px] text-gray-400 hover:text-red-600 flex-shrink-0" title="Remove" @click="remove(e.id)">Remove</button>
        </div>
      </li>
    </ul>

    <!-- Add evidence -->
    <form v-if="adding" class="rounded-lg border border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-900/10 p-3 space-y-2" @submit.prevent="submit">
      <textarea v-model="note" rows="2" maxlength="2000" placeholder="What does this show you can do?" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-violet-500"></textarea>

      <div class="flex flex-wrap items-center gap-2">
        <label class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
          Photo, video or file
          <input type="file" class="hidden" accept="image/*,video/*,audio/*,application/pdf" @change="pick">
        </label>
        <button v-if="!recorder.isRecording.value" type="button" class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200" @click="startRecording">
          <span class="w-2 h-2 rounded-full bg-red-500"></span> Record my voice
        </button>
        <button v-else type="button" class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700" @click="stopRecording">
          <span class="w-2 h-2 rounded-sm bg-white"></span> Stop · {{ recorder.seconds.value }}s
        </button>
        <span v-if="file" class="text-xs text-gray-600 dark:text-gray-300 truncate max-w-[180px]">{{ file.name }} <button type="button" class="text-red-600 ml-1" @click="file = null">×</button></span>
      </div>
      <p v-if="recorder.error.value" class="text-xs text-red-600">{{ recorder.error.value }}</p>

      <div v-if="progress !== null" class="h-1.5 rounded-full bg-violet-100 dark:bg-violet-900/40 overflow-hidden">
        <div class="h-full bg-violet-600 transition-all" :style="{ width: `${progress}%` }"></div>
      </div>
      <p v-if="error" class="text-xs text-red-600 dark:text-red-400">{{ error }}</p>

      <div class="flex gap-2">
        <button type="submit" :disabled="sending || (!note.trim() && !file)" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50">{{ sending ? 'Sending…' : 'Send to my teacher' }}</button>
        <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" @click="reset">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useAudioRecorder } from '@/composables/useAudioRecorder'
import { useConfirmStore } from '@/stores/confirm'

interface Evidence {
  id: number
  note: string | null
  file_path: string | null
  file_kind: 'image' | 'pdf' | 'audio' | 'video' | null
  original_name: string | null
  status: 'pending' | 'confirmed' | 'returned'
  teacher_comment: string | null
  created_at: string
}

const props = defineProps<{ topicId: number }>()
const emit = defineEmits<{ changed: [] }>()

const STATUS = {
  pending: { label: 'Waiting for your teacher', chip: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200', box: 'border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/40' },
  confirmed: { label: 'Confirmed', chip: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200', box: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10' },
  returned: { label: 'Returned - have another go', chip: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200', box: 'border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10' }
} as const

const confirm = useConfirmStore()
const recorder = useAudioRecorder()
const items = ref<Evidence[]>([])
const loading = ref(true)
const available = ref(true)
const adding = ref(false)
const note = ref('')
const file = ref<File | null>(null)
const sending = ref(false)
const progress = ref<number | null>(null)
const error = ref('')

const load = async () => {
  try {
    const response = await axios.get('/api/student/evidence', { params: { topic_id: props.topicId } })
    available.value = response.data.data.available !== false
    items.value = response.data.data.evidence || []
  } catch {
    available.value = false
  } finally {
    loading.value = false
  }
}
onMounted(load)

const pick = (e: Event) => {
  const input = e.target as HTMLInputElement
  const chosen = input.files?.[0] ?? null
  input.value = ''
  if (chosen && chosen.size > 25 * 1024 * 1024) {
    error.value = 'That file is too large - the limit is 25MB'
    return
  }
  error.value = ''
  file.value = chosen
}

const startRecording = async () => {
  file.value = null
  await recorder.start()
}
const stopRecording = async () => {
  const blob = await recorder.stop()
  if (blob) file.value = new File([blob], `voice-note.${blob.type.includes('ogg') ? 'ogg' : 'webm'}`, { type: blob.type || 'audio/webm' })
}

const reset = () => {
  recorder.cancel()
  adding.value = false
  note.value = ''
  file.value = null
  error.value = ''
  progress.value = null
}

const submit = async () => {
  error.value = ''
  sending.value = true
  progress.value = file.value ? 0 : null
  try {
    const data = new FormData()
    data.append('topic_id', String(props.topicId))
    data.append('note', note.value.trim())
    if (file.value) data.append('file', file.value)
    await axios.post('/api/student/evidence', data, {
      onUploadProgress: e => { if (e.total) progress.value = Math.round(e.loaded / e.total * 100) }
    })
    reset()
    await load()
    emit('changed')
  } catch (err: any) {
    const errors = err.response?.data?.errors
    error.value = (errors && Object.values(errors)[0] as string) || err.response?.data?.message || 'Could not send - try again'
  } finally {
    sending.value = false
    if (error.value) progress.value = null
  }
}

const remove = async (id: number) => {
  if (!await confirm.open({ title: 'Remove this evidence?', message: 'It will be taken back from your teacher.', confirmLabel: 'Remove', danger: true })) return
  try {
    await axios.delete(`/api/student/evidence/${id}`)
    items.value = items.value.filter(e => e.id !== id)
    emit('changed')
  } catch {
    // stays in the list
  }
}
</script>
