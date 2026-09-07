<template>
  <div class="relative aspect-video rounded-xl shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-200 overflow-hidden bg-gray-900">
    <!-- Real first-frame preview, straight from the actual video file - falls back to the
         gradient placeholder below if the file can't be loaded (network error, bad codec, etc). -->
    <video
      v-if="!videoErrored"
      ref="videoEl"
      :src="resolveAssetUrl(video.file_path)"
      preload="metadata"
      muted
      playsinline
      class="absolute inset-0 w-full h-full object-cover"
      @loadedmetadata="seekToFrame"
      @error="videoErrored = true"
    ></video>
    <div v-else class="absolute inset-0 flex items-center justify-center" :class="palette">
      <svg class="w-1/4 h-1/4 text-white/20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
    </div>

    <!-- Bottom scrim, so the title/duration read clearly over any frame -->
    <div class="absolute inset-0 bg-black/40"></div>

    <!-- Play button -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/90 group-hover:scale-110 transition-all duration-200">
        <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-rose-600 ml-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"></path>
        </svg>
      </div>
    </div>

    <!-- Corner chips -->
    <div class="absolute top-0 left-0 right-0 p-2 flex items-start justify-between gap-1">
      <span
        v-if="subjectLabel"
        class="px-1.5 py-0.5 rounded text-white bg-black/40 backdrop-blur-sm font-bold tracking-wide truncate"
        :class="size === 'sm' ? 'text-[8px]' : 'text-[9px]'"
      >
        {{ subjectLabel }}
      </span>
      <span
        v-if="durationLabel"
        class="px-1.5 py-0.5 rounded text-white bg-black/60 backdrop-blur-sm font-semibold tracking-wide flex-shrink-0"
        :class="size === 'sm' ? 'text-[8px]' : 'text-[9px]'"
      >
        {{ durationLabel }}
      </span>
    </div>

    <!-- Title stamp -->
    <div class="absolute bottom-0 left-0 right-0 p-2.5">
      <p
        class="text-white font-semibold leading-snug drop-shadow-sm"
        :class="size === 'sm' ? 'text-[11px] line-clamp-1' : 'text-xs sm:text-sm line-clamp-2'"
      >
        {{ video.title }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { VideoResource } from '@/types/video'
import { resolveAssetUrl } from '@/utils/url'

const props = withDefaults(defineProps<{ video: VideoResource; size?: 'sm' | 'md' }>(), {
  size: 'md'
})

const videoErrored = ref(false)
const videoEl = ref<HTMLVideoElement | null>(null)

// preload="metadata" alone doesn't reliably paint a visible frame in every browser (Chrome shows
// a blank/black box until something forces a decode) - seeking a fraction of a second in is the
// standard cross-browser trick to force the first real frame to render as a static thumbnail.
const seekToFrame = () => {
  if (videoEl.value) {
    videoEl.value.currentTime = Math.min(1, (videoEl.value.duration || 2) / 4)
  }
}

const coverColors = [
  'bg-rose-600',
  'bg-blue-600',
  'bg-indigo-600',
  'bg-emerald-600',
  'bg-red-600',
  'bg-violet-600',
  'bg-sky-600',
  'bg-pink-600',
  'bg-fuchsia-600',
  'bg-orange-600'
]
const palette = computed(() => coverColors[Math.abs(props.video.id) % coverColors.length])

const subjectLabel = computed(() => {
  if (props.video.subject_code) return props.video.subject_code.slice(0, 6).toUpperCase()
  return (props.video.subject_name || '').slice(0, 8).toUpperCase()
})

const durationLabel = computed(() => {
  const seconds = props.video.duration
  if (!seconds || seconds <= 0) return null
  const mins = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
})
</script>
