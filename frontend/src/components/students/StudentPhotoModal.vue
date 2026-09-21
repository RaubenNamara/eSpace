<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full mx-4 p-6">
      <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-1">Student Photo</h2>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">{{ studentName }} &middot; appears on their report card.</p>

      <div class="flex flex-col items-center gap-3 mb-4">
        <img v-if="preview" :src="preview" alt="" class="w-28 h-28 rounded-lg object-cover ring-2 ring-gray-200 dark:ring-gray-600">
        <div v-else class="w-28 h-28 rounded-lg flex items-center justify-center bg-indigo-600 text-white text-2xl font-bold">{{ initials }}</div>
        <input ref="fileInputRef" type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="onFileSelected">
        <button @click="fileInputRef?.click()" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Choose a photo</button>
      </div>

      <p v-if="message" class="text-xs text-center mb-3" :class="isError ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'">{{ message }}</p>

      <div class="flex gap-3">
        <button @click="upload" :disabled="!selectedFile || uploading" class="btn-primary flex-1 disabled:opacity-50">
          {{ uploading ? 'Uploading...' : 'Upload' }}
        </button>
        <button @click="$emit('close')" class="btn-secondary flex-1">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
