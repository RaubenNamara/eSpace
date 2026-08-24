<template>
  <div class="fixed inset-0 bg-black z-[70] flex flex-col">
    <!-- Live camera / captured preview -->
    <div class="relative flex-1 overflow-hidden flex items-center justify-center bg-black">
      <video
        v-show="!capturedUrl"
        ref="videoRef"
        autoplay
        playsinline
        muted
        class="max-w-full max-h-full"
      ></video>
      <img v-if="capturedUrl" :src="capturedUrl" class="max-w-full max-h-full">

      <div v-if="error" class="absolute inset-0 flex items-center justify-center p-6">
        <div class="text-center max-w-xs">
          <svg class="w-10 h-10 mx-auto mb-3 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-12.728 12.728M12 12a3 3 0 100-6 3 3 0 000 6zm-9 0a9 9 0 1018 0 9 9 0 00-18 0z"></path>
          </svg>
          <p class="text-white text-sm">{{ error }}</p>
        </div>
      </div>

      <!-- Close -->
      <button @click="close" class="absolute top-3 left-3 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Switch camera -->
      <button
        v-if="!capturedUrl && !error"
        @click="switchCamera"
        class="absolute top-3 right-3 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white"
        title="Switch camera"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
      </button>
    </div>

    <!-- Controls -->
    <div class="flex-shrink-0 bg-black px-6 py-6 flex items-center justify-center gap-8">
      <template v-if="!capturedUrl">
        <button
          :disabled="!ready"
          @click="takePhoto"
          class="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center disabled:opacity-40"
        >
          <span class="w-12 h-12 rounded-full bg-white"></span>
        </button>
      </template>
      <template v-else>
        <button @click="retake" class="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-sm font-medium">
          Retake
        </button>
        <button @click="usePhoto" class="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          Use Photo
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits<{ close: []; capture: [File] }>()

const videoRef = ref<HTMLVideoElement | null>(null)
const ready = ref(false)
const error = ref('')
const capturedUrl = ref<string | null>(null)
const facingMode = ref<'environment' | 'user'>('environment')

let stream: MediaStream | null = null
let capturedBlob: Blob | null = null

const stopStream = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }
}

const startCamera = async () => {
  error.value = ''
  ready.value = false
  stopStream()
  if (!navigator.mediaDevices?.getUserMedia) {
    error.value = 'Camera access isn\'t available in this browser or connection. Try the attach button instead.'
    return
  }
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: facingMode.value } },
      audio: false
    })
    if (videoRef.value) {
      videoRef.value.srcObject = stream
      await videoRef.value.play()
      ready.value = true
    }
  } catch (err: any) {
    error.value = err?.name === 'NotAllowedError'
      ? 'Camera access was denied. Allow camera permission in your browser to take a photo.'
      : 'Could not access the camera on this device.'
  }
}

const switchCamera = () => {
  facingMode.value = facingMode.value === 'environment' ? 'user' : 'environment'
  startCamera()
}

const takePhoto = () => {
  if (!videoRef.value || !ready.value) return
  const video = videoRef.value
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  canvas.toBlob(blob => {
    if (!blob) return
    capturedBlob = blob
    capturedUrl.value = URL.createObjectURL(blob)
    stopStream()
  }, 'image/jpeg', 0.9)
}

const retake = () => {
  if (capturedUrl.value) URL.revokeObjectURL(capturedUrl.value)
  capturedUrl.value = null
  capturedBlob = null
  startCamera()
}

const usePhoto = () => {
  if (!capturedBlob) return
  const file = new File([capturedBlob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' })
  emit('capture', file)
}

const close = () => {
  emit('close')
}

onMounted(startCamera)

onBeforeUnmount(() => {
  stopStream()
  if (capturedUrl.value) URL.revokeObjectURL(capturedUrl.value)
})
</script>
