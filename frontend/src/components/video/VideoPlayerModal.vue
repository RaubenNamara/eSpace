<template>
  <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
    <div class="bg-white dark:bg-gray-800 w-full h-full sm:h-auto sm:max-w-4xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      <!-- Header -->
      <div class="relative flex-shrink-0 bg-gradient-to-r from-rose-600 to-orange-600 px-4 sm:px-8 py-4 sm:py-5">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h2 class="text-base sm:text-xl font-bold text-white leading-tight truncate">{{ video.title }}</h2>
            <div class="flex flex-wrap items-center gap-2 mt-1 text-xs sm:text-sm text-orange-100">
              <span v-if="video.subject_name" class="px-2 py-0.5 rounded-full bg-white/20 font-medium">{{ video.subject_name }}</span>
              <span v-if="teacherName" class="truncate">By {{ teacherName }}</span>
            </div>
          </div>
          <button
            @click="$emit('close')"
            class="p-2 rounded-lg bg-white/10 hover:bg-white/25 transition-colors flex-shrink-0"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Player -->
      <div class="flex-1 bg-black flex items-center justify-center">
        <video
          :src="resolveAssetUrl(video.file_path)"
          controls
          autoplay
          class="w-full max-h-[75vh]"
          @timeupdate="onTimeUpdate"
          @pause="sendProgress"
          @ended="sendProgress"
        ></video>
      </div>

      <!-- Description -->
      <div v-if="video.description" class="flex-shrink-0 px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
        <p class="text-sm text-gray-600 dark:text-gray-300">{{ video.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { VideoResource } from '@/types/video'
import { resolveAssetUrl } from '@/utils/url'
import apiService from '@/services/api'

const props = withDefaults(defineProps<{ video: VideoResource; trackProgress?: boolean }>(), {
  trackProgress: false,
})
defineEmits(['close'])

const teacherName = computed(() => {
  if (!props.video.teacher_first_name) return ''
  return `${props.video.teacher_first_name} ${props.video.teacher_last_name || ''}`.trim()
})

// Engagement analytics (Teacher/HOD/Admin dashboards) - only sent when a student is actually
// watching (trackProgress), not when a teacher/HOD/admin previews the same modal. Throttled to
// once per 15s of playback plus on pause/end, rather than every timeupdate tick (several per
// second) - see Student\VideoController::recordWatchProgress for the write side.
let lastSent = 0
function onTimeUpdate(e: Event) {
  if (!props.trackProgress) return
  const el = e.target as HTMLVideoElement
  if (!el.duration || Date.now() - lastSent < 15000) return
  sendProgress(e)
}

function sendProgress(e: Event) {
  if (!props.trackProgress) return
  const el = e.target as HTMLVideoElement
  if (!el.duration) return
  lastSent = Date.now()
  const percentage = Math.min(100, (el.currentTime / el.duration) * 100)
  apiService.post(`/student/videos/${props.video.id}/watch-progress`, { percentage_watched: percentage }).catch(() => {})
}
</script>
