<template>
  <div class="video-tile group relative" :class="{ 'is-selected': selected }">
    <!-- Thumbnail: the video's real frame; hovering (mouse) plays a short muted preview -->
    <button
      type="button"
      class="relative block w-full aspect-video rounded-xl overflow-hidden bg-gray-900 shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      :class="selected ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''"
      :aria-label="`Play ${video.title}`"
      @click="$emit('play')"
      @mouseenter="startPreview"
      @mouseleave="stopPreview"
      @focus="startPreview"
      @blur="stopPreview"
    >
      <video
        v-if="!errored"
        ref="videoEl"
        :src="src"
        preload="metadata"
        muted
        playsinline
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        @loadedmetadata="onMetadata"
        @timeupdate="onTimeUpdate"
        @error="errored = true"
      ></video>
      <div v-else class="absolute inset-0 flex items-center justify-center bg-gradient-to-br" :class="gradient">
        <svg class="w-1/4 h-1/4 text-white/30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      </div>

      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 transition-opacity duration-300" :class="previewing ? 'opacity-40' : 'opacity-100'"></div>

      <!-- Play button -->
      <span class="absolute inset-0 flex items-center justify-center transition-opacity duration-300" :class="previewing ? 'opacity-0' : 'opacity-100'">
        <span class="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/25 backdrop-blur-md ring-1 ring-white/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
          <svg class="w-5 h-5 text-white group-hover:text-indigo-600 ml-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
        </span>
      </span>

      <!-- Top chips -->
      <span class="absolute top-2 left-2 right-2 flex items-start justify-between gap-1 pointer-events-none">
        <span class="flex items-center gap-1 min-w-0">
          <span v-if="selectable" class="w-6 h-6"></span>
          <span v-if="tag" class="px-1.5 py-0.5 rounded-md text-[9px] font-bold tracking-wide text-white bg-black/45 backdrop-blur-sm truncate">{{ tag }}</span>
          <span v-if="isNew" class="px-1.5 py-0.5 rounded-md text-[9px] font-bold tracking-wide text-white bg-rose-600">NEW</span>
        </span>
        <span v-if="status" class="px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wide flex-shrink-0" :class="statusClass">{{ status }}</span>
      </span>

      <!-- Bottom: saved-on-device + duration -->
      <span class="absolute bottom-2 left-2 right-2 flex items-end justify-between gap-1 pointer-events-none">
        <span v-if="saved" class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-semibold text-white bg-emerald-600/90" title="Saved on this device - plays instantly">
          <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
          Saved
        </span>
        <span v-else></span>
        <span v-if="durationLabel" class="px-1.5 py-0.5 rounded-md text-[10px] font-semibold text-white bg-black/70 tabular-nums">{{ durationLabel }}</span>
      </span>

      <!-- Preview progress -->
      <span v-if="previewing" class="absolute left-0 right-0 bottom-0 h-1 bg-white/20">
        <span class="block h-full bg-rose-500 transition-[width] duration-200" :style="{ width: previewProgress + '%' }"></span>
      </span>
    </button>

    <!-- Select checkbox sits above the thumbnail button so ticking it never starts playback -->
    <input
      v-if="selectable"
      type="checkbox"
      :checked="selected"
      class="absolute top-2 left-2 z-10 w-5 h-5 rounded-md border-white/70 bg-black/30 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
      :aria-label="`Select ${video.title}`"
      @change="$emit('toggle-select')"
    >

    <!-- Details -->
    <div class="mt-2.5 flex items-start gap-2">
      <div class="min-w-0 flex-1">
        <h3
          class="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug cursor-pointer group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
          @click="$emit('play')"
        >{{ video.title }}</h3>
        <p v-if="subtitle" class="mt-0.5 text-xs text-gray-500 dark:text-gray-400 truncate">{{ subtitle }}</p>
        <p class="text-[11px] text-gray-400 dark:text-gray-500 truncate">{{ meta }}</p>
      </div>
      <div v-if="$slots.actions" class="flex items-center flex-shrink-0 -mr-1.5">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { VideoResource } from '@/types/video'
import { resolveAssetUrl } from '@/utils/url'
import { subjectTag } from '@/utils/subjectTag'
import { isVideoCached } from '@/utils/videoCache'

const props = withDefaults(defineProps<{
  video: VideoResource
  subtitle?: string
  showStatus?: boolean
  isNew?: boolean
  selectable?: boolean
  selected?: boolean
}>(), {
  subtitle: '',
  showStatus: false,
  isNew: false,
  selectable: false,
  selected: false
})
defineEmits<{ play: []; 'toggle-select': [] }>()

const src = computed(() => resolveAssetUrl(props.video.file_path))
const videoEl = ref<HTMLVideoElement | null>(null)
const errored = ref(false)
const duration = ref<number | null>(props.video.duration || null)
const previewing = ref(false)
const previewProgress = ref(0)
const saved = ref(false)

const canHover = typeof window !== 'undefined' && !!window.matchMedia?.('(hover: hover)').matches
const PREVIEW_SECONDS = 8
let previewTimer: ReturnType<typeof setTimeout> | null = null
let posterTime = 0

onMounted(async () => {
  saved.value = await isVideoCached(src.value)
})

// Seeking a little way in forces browsers to paint a real frame as the thumbnail
function onMetadata() {
  const el = videoEl.value
  if (!el) return
  if (el.duration && isFinite(el.duration)) duration.value = el.duration
  posterTime = Math.min(1, (el.duration || 2) / 4)
  el.currentTime = posterTime
}

function onTimeUpdate() {
  const el = videoEl.value
  if (!el || !previewing.value) return
  const elapsed = el.currentTime - posterTime
  previewProgress.value = Math.min(100, (elapsed / PREVIEW_SECONDS) * 100)
  if (elapsed >= PREVIEW_SECONDS) el.currentTime = posterTime
}

// Short delay so sweeping the mouse across the grid doesn't start a dozen downloads
function startPreview() {
  if (!canHover || errored.value) return
  previewTimer = setTimeout(() => {
    const el = videoEl.value
    if (!el) return
    previewing.value = true
    el.play().catch(() => { previewing.value = false })
  }, 350)
}

function stopPreview() {
  if (previewTimer) clearTimeout(previewTimer)
  previewTimer = null
  const el = videoEl.value
  if (!previewing.value || !el) return
  previewing.value = false
  previewProgress.value = 0
  el.pause()
  el.currentTime = posterTime
}

const durationLabel = computed(() => {
  const s = duration.value
  if (!s || s <= 0) return ''
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = Math.floor(s % 60).toString().padStart(2, '0')
  return h ? `${h}:${m.toString().padStart(2, '0')}:${sec}` : `${m}:${sec}`
})

const tag = computed(() => subjectTag(props.video.subject_name, props.video.subject_code, 8))
const status = computed(() => (props.showStatus ? props.video.status : ''))
const statusClass = computed(() => ({
  published: 'bg-emerald-500 text-white',
  draft: 'bg-amber-400 text-amber-950',
  archived: 'bg-gray-500 text-white'
}[props.video.status]))

const gradients = ['from-rose-500 to-orange-500', 'from-indigo-500 to-sky-500', 'from-emerald-500 to-teal-500', 'from-violet-500 to-fuchsia-500', 'from-amber-500 to-rose-500']
const gradient = computed(() => gradients[Math.abs(props.video.id) % gradients.length])

const meta = computed(() => {
  const parts: string[] = []
  const bytes = props.video.file_size
  if (bytes) parts.push(bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`)
  const when = props.video.published_at || props.video.updated_at || props.video.created_at
  if (when) parts.push(timeAgo(when))
  return parts.join(' · ')
})

function timeAgo(date: string): string {
  const days = Math.floor((Date.now() - new Date(date.replace(' ', 'T')).getTime()) / 86400000)
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} wk ago`
  return new Date(date.replace(' ', 'T')).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>
