<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full mx-4 p-6">
      <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-1">Student Photo</h2>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">{{ studentName }} &middot; appears on their report card.</p>

      <div class="flex flex-col items-center gap-3 mb-4">
        <!-- Live camera preview - swaps in for the static photo/initials while capturing, so the
             same square frame is used for "what you'll get" before and after the shot. -->
        <video
          v-if="cameraActive"
          ref="videoRef"
          autoplay
          playsinline
          muted
          class="w-28 h-28 rounded-lg object-cover ring-2 ring-indigo-400 bg-black -scale-x-100"
        ></video>
        <img v-else-if="preview" :src="preview" alt="" class="w-28 h-28 rounded-lg object-cover ring-2 ring-gray-200 dark:ring-gray-600">
        <div v-else class="w-28 h-28 rounded-lg flex items-center justify-center bg-indigo-600 text-white text-2xl font-bold">{{ initials }}</div>
        <canvas ref="captureCanvasRef" class="hidden"></canvas>
        <input ref="fileInputRef" type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="onFileSelected">

        <div v-if="cameraActive" class="flex items-center gap-3">
          <button @click="capturePhoto" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Capture</button>
          <button @click="stopCamera" class="text-xs font-medium text-gray-500 dark:text-gray-400 hover:underline">Cancel</button>
        </div>
        <div v-else class="flex items-center gap-3">
          <button @click="fileInputRef?.click()" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Choose a photo</button>
          <span class="text-gray-300 dark:text-gray-600">|</span>
          <button @click="startCamera" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Take a photo</button>
        </div>
      </div>

      <p v-if="message" class="text-xs text-center mb-3" :class="isError ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'">{{ message }}</p>

      <div class="flex gap-3">
        <button @click="upload" :disabled="!selectedFile || uploading" class="btn-primary flex-1 disabled:opacity-50">
          {{ uploading ? 'Uploading...' : 'Upload' }}
        </button>
        <button @click="closeModal" class="btn-secondary flex-1">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { apiService } from '@/services/api'
import { resolveAssetUrl } from '@/utils/url'

const props = defineProps<{
  studentId: number
  studentName: string
  currentPhoto: string | null
  uploadUrl: string
}>()

const emit = defineEmits<{ close: []; uploaded: [string] }>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const objectUrl = ref<string | null>(null)
const uploading = ref(false)
const message = ref('')
const isError = ref(false)

const preview = computed(() => objectUrl.value || (props.currentPhoto ? resolveAssetUrl(props.currentPhoto) : null))

const initials = computed(() => props.studentName.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0, 2))

const onFileSelected = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  selectedFile.value = file
  objectUrl.value = URL.createObjectURL(file)
  message.value = ''
}

// Live camera capture - an alternative to "Choose a photo" for when there's no existing photo
// file to hand, e.g. an admin photographing a student in person. getUserMedia works the same way
// for a desktop webcam and a phone/tablet's camera, so this one path covers both.
const videoRef = ref<HTMLVideoElement | null>(null)
const captureCanvasRef = ref<HTMLCanvasElement | null>(null)
const cameraActive = ref(false)
let mediaStream: MediaStream | null = null

const startCamera = async () => {
  message.value = ''
  isError.value = false
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
    cameraActive.value = true
    // The <video> element only mounts once cameraActive flips true, so the stream can't be
    // attached until after that reactive update has actually patched the DOM.
    await new Promise((resolve) => setTimeout(resolve, 0))
    if (videoRef.value) videoRef.value.srcObject = mediaStream
  } catch (err: any) {
    isError.value = true
    message.value = err?.name === 'NotAllowedError'
      ? 'Camera access was denied. Allow camera access in your browser and try again.'
      : 'Could not access a camera on this device.'
  }
}

const stopCamera = () => {
  mediaStream?.getTracks().forEach((track) => track.stop())
  mediaStream = null
  cameraActive.value = false
}

const capturePhoto = () => {
  const video = videoRef.value
  const canvas = captureCanvasRef.value
  if (!video || !canvas || !video.videoWidth) return
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  // Drawn from the raw video frame, not the mirrored CSS preview - a student's saved profile
  // photo should look like how others actually see them, even though the live preview is
  // mirrored (more natural to line yourself up against, the same way a bathroom mirror is).
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  canvas.toBlob((blob) => {
    if (!blob) return
    selectedFile.value = new File([blob], `student-${props.studentId}-camera.jpg`, { type: 'image/jpeg' })
    objectUrl.value = URL.createObjectURL(blob)
    message.value = ''
  }, 'image/jpeg', 0.92)
  stopCamera()
}

onBeforeUnmount(stopCamera)

const closeModal = () => {
  stopCamera()
  emit('close')
}

const upload = async () => {
  if (!selectedFile.value) return
  uploading.value = true
  message.value = ''
  isError.value = false
  try {
    const formData = new FormData()
    formData.append('photo', selectedFile.value)
    const res = await apiService.post<{ profile_photo: string }>(props.uploadUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    message.value = 'Photo updated'
    emit('uploaded', res.data.data!.profile_photo)
  } catch (err: any) {
    isError.value = true
    message.value = err.response?.data?.message || 'Failed to upload photo'
  } finally {
    uploading.value = false
  }
}
</script>
