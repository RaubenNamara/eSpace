<template>
  <!-- A voice message, WhatsApp style: play button, waveform that fills as it plays (tap to seek),
       the length underneath, and a mic badge. Colours from assets/whatsapp.css. -->
  <div class="flex items-center gap-2 w-[240px] sm:w-[270px] py-0.5">
    <button
      type="button"
      @click="toggle"
      class="w-8 h-8 flex items-center justify-center flex-shrink-0 text-[var(--wa-icon,#54656f)]"
      :aria-label="playing ? 'Pause' : 'Play voice message'"
    >
      <svg v-if="!playing" class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86A1 1 0 008 5.14z" /></svg>
      <svg v-else class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
    </button>

    <div class="flex-1 min-w-0">
      <div ref="barRef" class="flex items-center gap-[2px] h-7 cursor-pointer" @click="seek" role="slider" :aria-valuenow="Math.round(progressPct)" aria-valuemin="0" aria-valuemax="100" aria-label="Voice message position">
        <span
          v-for="(h, i) in bars"
          :key="i"
          class="flex-1 rounded-full transition-colors"
          :style="{ height: `${h}%`, background: (i + 0.5) / bars.length * 100 <= progressPct ? 'var(--wa-played, #00a884)' : 'var(--wa-unplayed, rgba(84,101,111,0.45))' }"
        ></span>
      </div>
      <span class="text-[11px] leading-3 text-[var(--wa-muted,#667781)]">
        {{ formatTime(playing || currentTime > 0 ? currentTime : duration) }}
      </span>
    </div>

    <!-- mic badge, like the sender photo + mic on WhatsApp voice notes -->
    <div class="relative w-11 h-11 flex-shrink-0">
      <div class="w-11 h-11 rounded-full flex items-center justify-center text-white" :style="{ background: isMine ? '#00a884' : '#54656f' }">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 11a7 7 0 01-14 0m7 7v3m-3 0h6M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3z" /></svg>
      </div>
    </div>

    <audio ref="audioRef" :src="src" preload="metadata" @loadedmetadata="onLoaded" @durationchange="onLoaded" @timeupdate="onTimeUpdate" @ended="onEnded" class="hidden"></audio>
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
let probing = false

const progressPct = computed(() => duration.value ? (currentTime.value / duration.value) * 100 : 0)

// a steady "waveform" per message (a voice note has no stored waveform, so it's drawn from its address)
const bars = computed(() => {
  let h = 2166136261
  for (let i = 0; i < props.src.length; i++) h = Math.imul(h ^ props.src.charCodeAt(i), 16777619) >>> 0
  return Array.from({ length: 34 }, () => {
    h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0
    return 25 + (h % 75)
  })
})

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
    // stop any other voice note that is playing, as WhatsApp does
    document.querySelectorAll('audio').forEach(a => { if (a !== audioRef.value) a.pause() })
    audioRef.value.play()
    playing.value = true
  }
}

// Browser-recorded .webm files often report an unknown (Infinity) length until read to the end:
// jump far ahead once to make the browser work it out, then come back to the start.
const onLoaded = () => {
  const a = audioRef.value
  if (!a) return
  if (isFinite(a.duration) && a.duration > 0) {
    duration.value = a.duration
    if (probing) { probing = false; a.currentTime = 0; currentTime.value = 0 }
  } else if (!probing) {
    probing = true
    a.currentTime = 1e101
  }
}

const onTimeUpdate = () => {
  const a = audioRef.value
  if (!a || probing) return
  currentTime.value = a.currentTime
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
