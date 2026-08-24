<template>
  <div class="mb-6">
    <button
      v-if="status === 'idle'"
      @click="fetchWalkthrough(false)"
      class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-medium hover:from-purple-700 hover:to-fuchsia-700 transition-colors shadow-sm"
    >
      <span>🧑‍🏫</span>
      <span>AI Tutor – Explain</span>
    </button>

    <div v-else class="rounded-xl border border-purple-100 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-lg">🧑‍🏫</span>
        <h4 class="text-sm font-semibold text-purple-900 dark:text-purple-200">AI Tutor Walkthrough</h4>
        <span v-if="status === 'ready' && blocks.length" class="text-[11px] text-purple-500 dark:text-purple-400 ml-auto">
          {{ currentIndex >= 0 ? `Paragraph ${currentIndex + 1} of ${blocks.length}` : `${blocks.length} paragraphs` }}
        </span>
      </div>

      <div v-if="status === 'loading'" class="flex items-center gap-2 text-sm text-purple-700 dark:text-purple-300">
        <svg class="w-4 h-4 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        AI Tutor is preparing your explanation...
      </div>

      <template v-else-if="status === 'error'">
        <p class="text-sm text-red-600 dark:text-red-400 mb-2">{{ errorMsg }}</p>
        <button @click="fetchWalkthrough(false)" class="text-xs font-medium text-purple-700 dark:text-purple-300 hover:underline">
          Try again
        </button>
      </template>

      <template v-else-if="status === 'ready'">
        <audio
          ref="audioEl"
          class="hidden"
          @ended="onEnded"
          @play="isPlaying = true"
          @pause="isPlaying = false"
        ></audio>

        <!-- One segment per paragraph: filled for done/current, empty for not-yet-reached -->
        <div v-if="blocks.length > 1" class="flex items-center gap-1 mb-3">
          <span
            v-for="(_b, i) in blocks"
            :key="i"
            class="h-1.5 flex-1 rounded-full transition-colors"
            :class="i < currentIndex ? 'bg-purple-400' : i === currentIndex ? 'bg-purple-600' : 'bg-purple-100 dark:bg-purple-800'"
          ></span>
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button
            @click="togglePlay"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-medium hover:bg-purple-700 transition-colors"
          >
            <svg v-if="!isPlaying" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
            <svg v-else class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"></path></svg>
            {{ isPlaying ? 'Pause' : (currentIndex === -1 ? 'Play' : 'Resume') }}
          </button>
          <button
            @click="replay"
            :disabled="currentIndex === -1"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 text-xs font-medium hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Replay
          </button>
          <button
            @click="stop"
            :disabled="currentIndex === -1"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 text-xs font-medium hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12"></rect></svg>
            Stop
          </button>

          <div class="flex items-center gap-1 ml-1">
            <span class="text-[11px] text-purple-500 dark:text-purple-400 mr-0.5">Speed</span>
            <button
              v-for="rate in speeds"
              :key="rate"
              @click="setSpeed(rate)"
              class="px-2 py-1 rounded text-[11px] font-medium transition-colors"
              :class="playbackRate === rate
                ? 'bg-purple-600 text-white'
                : 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-gray-600'"
            >{{ rate }}x</button>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3 text-xs">
          <button
            @click="explainAgain"
            :disabled="regenerating"
            class="text-purple-700 dark:text-purple-300 font-medium hover:underline disabled:opacity-50"
          >
            {{ regenerating ? 'Explaining again...' : 'Explain Again' }}
          </button>
          <button @click="showTranscript = !showTranscript" class="text-purple-700 dark:text-purple-300 font-medium hover:underline">
            {{ showTranscript ? 'Hide Explanation' : 'View Explanation' }}
          </button>
        </div>

        <div
          v-if="showTranscript"
          class="mt-3 p-3 rounded-lg bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-800 text-sm text-gray-700 dark:text-gray-300 max-h-64 overflow-y-auto space-y-2"
        >
          <p
            v-for="(segments, bi) in blockSegments"
            :key="bi"
            :class="bi === currentIndex ? 'text-purple-900 dark:text-purple-100 font-medium' : ''"
          >
            <template v-for="(seg, si) in segments" :key="si">
              <span v-if="seg.highlight" class="text-red-600 dark:text-red-400 font-semibold">{{ seg.text }}</span>
              <span v-else>{{ seg.text }}</span>
            </template>
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import axios from 'axios'
import type { ENoteTutorBlock } from '@/types/enotes'

const props = defineProps<{ pageId: number }>()
const emit = defineEmits<{ 'block-active': [number]; 'block-cleared': [] }>()

type Status = 'idle' | 'loading' | 'ready' | 'error'

const status = ref<Status>('idle')
const blocks = ref<ENoteTutorBlock[]>([])
const currentIndex = ref(-1)
const errorMsg = ref('')
const showTranscript = ref(false)
const isPlaying = ref(false)
const playbackRate = ref(1)
const regenerating = ref(false)
const audioEl = ref<HTMLAudioElement | null>(null)
const speeds = [0.75, 1, 1.25, 1.5]

const splitSegments = (text: string) => {
  const segments: { text: string; highlight: boolean }[] = []
  const regex = /\*\*(.+?)\*\*/gs
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) segments.push({ text: text.slice(lastIndex, match.index), highlight: false })
    segments.push({ text: match[1], highlight: true })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) segments.push({ text: text.slice(lastIndex), highlight: false })
  return segments
}

const blockSegments = computed(() => blocks.value.map(b => splitSegments(b.explanation_text)))

// Each eNote page has its own independent walkthrough - switching pages must not carry over
// stale audio/state from whatever page the student was on before.
const resetForNewPage = () => {
  audioEl.value?.pause()
  status.value = 'idle'
  blocks.value = []
  currentIndex.value = -1
  errorMsg.value = ''
  showTranscript.value = false
  isPlaying.value = false
  playbackRate.value = 1
  emit('block-cleared')
}

watch(() => props.pageId, resetForNewPage)

onBeforeUnmount(() => {
  audioEl.value?.pause()
})

const RETRY_DELAY_MS = 3000
const MAX_ATTEMPTS = 4

// A 503 means another student's click is already generating this same page's walkthrough (the
// backend shares one cache across all students and locks generation so only one happens at a
// time) - silently wait and retry rather than surfacing an error for what's really just a queue.
const fetchWalkthrough = async (force: boolean, attempt = 1) => {
  if (attempt === 1) {
    if (force) regenerating.value = true
    else status.value = 'loading'
    errorMsg.value = ''
  }

  try {
    const response = await axios.post(`/api/student/enotes/pages/${props.pageId}/tutor-explain`, { force })
    if (response.data.success) {
      blocks.value = response.data.data.blocks
      status.value = 'ready'
      regenerating.value = false
      startFrom(0)
    }
  } catch (err: any) {
    if (err.response?.status === 503 && attempt < MAX_ATTEMPTS) {
      setTimeout(() => fetchWalkthrough(force, attempt + 1), RETRY_DELAY_MS)
      return
    }
    errorMsg.value = err.response?.data?.message || 'AI Tutor could not prepare an explanation right now.'
    status.value = 'error'
    regenerating.value = false
  }
}

const startFrom = (i: number) => {
  if (i >= blocks.value.length) {
    currentIndex.value = -1
    isPlaying.value = false
    emit('block-cleared')
    return
  }
  currentIndex.value = i
  emit('block-active', blocks.value[i].paragraph_index)

  const el = audioEl.value
  if (!el) return
  el.src = blocks.value[i].audio_path
  el.playbackRate = playbackRate.value
  el.play()
}

const onEnded = () => startFrom(currentIndex.value + 1)

const togglePlay = () => {
  const el = audioEl.value
  if (!el) return
  if (currentIndex.value === -1) {
    startFrom(0)
    return
  }
  if (isPlaying.value) el.pause()
  else el.play()
}

const replay = () => {
  const el = audioEl.value
  if (!el || currentIndex.value === -1) return
  el.currentTime = 0
  el.play()
}

const stop = () => {
  const el = audioEl.value
  if (!el) return
  el.pause()
  currentIndex.value = -1
  isPlaying.value = false
  emit('block-cleared')
}

const explainAgain = () => fetchWalkthrough(true)

const setSpeed = (rate: number) => {
  playbackRate.value = rate
  if (audioEl.value) audioEl.value.playbackRate = rate
}
</script>
