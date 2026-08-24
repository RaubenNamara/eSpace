<template>
  <div class="flex items-center gap-2 min-w-[180px]">
    <button
      @click="toggle"
      class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
      :class="isMine ? 'bg-white/25 hover:bg-white/35 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'"
    >
      <svg v-if="!playing" class="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
      <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"></path></svg>
    </button>

    <div class="flex-1 min-w-0">
      <div
        class="h-1.5 rounded-full cursor-pointer overflow-hidden"
        :class="isMine ? 'bg-white/25' : 'bg-gray-300 dark:bg-gray-600'"
        @click="seek"
        ref="barRef"
      >
        <div class="h-full rounded-full" :class="isMine ? 'bg-white' : 'bg-emerald-600'" :style="{ width: progressPct + '%' }"></div>
      </div>
      <span class="text-[11px] mt-1 inline-block" :class="isMine ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'">
        {{ formatTime(playing || currentTime > 0 ? currentTime : duration) }}
      </span>
    </div>

    <audio ref="audioRef" :src="src" preload="metadata" @loadedmetadata="onLoaded" @timeupdate="onTimeUpdate" @ended="onEnded" class="hidden"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ src: string; isMine?: boolean }>()

const audioRef = ref<HTMLAudioElement | null>(null)
const barRef = ref<HTMLElement | null>(null)
const playing = ref(false)
const duration = ref(0)
const currentTime = ref(0)

const progressPct = computed(() => duration.value ? (currentTime.value / duration.value) * 100 : 0)

const formatTime = (secs: number) => {
  if (!isFinite(secs) || secs < 0) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

const toggle = () => {
  if (!audioRef.value) return
  if (playing.value) {
    audioRef.value.pause()
    playing.value = false
  } else {
    audioRef.value.play()
    playing.value = true
  }
}

const onLoaded = () => {
  if (audioRef.value && isFinite(audioRef.value.duration)) {
    duration.value = audioRef.value.duration
  }
}

const onTimeUpdate = () => {
  if (audioRef.value) currentTime.value = audioRef.value.currentTime
}

const onEnded = () => {
  playing.value = false
  currentTime.value = 0
}

const seek = (event: MouseEvent) => {
  if (!audioRef.value || !barRef.value || !duration.value) return
  const rect = barRef.value.getBoundingClientRect()
  const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
  audioRef.value.currentTime = ratio * duration.value
  currentTime.value = audioRef.value.currentTime
}
</script>
