<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" @click.self="$emit('close')">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 px-6 py-5 flex items-center justify-between">
        <div>
          <h2 class="text-lg font-bold text-white">Account Settings</h2>
          <p class="text-xs text-indigo-100">Update your photo and password</p>
        </div>
        <button @click="$emit('close')" class="text-white/80 hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
        <!-- Profile Photo -->
        <div>
          <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Profile Photo</h3>
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold ring-4 ring-indigo-100 dark:ring-indigo-900/40 flex-shrink-0">
              <img v-if="photoPreview" :src="photoPreview" alt="Profile photo" class="w-full h-full object-cover">
              <span v-else>{{ initials }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <input ref="fileInputRef" type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="onFileSelected">
              <button
                @click="fileInputRef?.click()"
                class="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Choose Photo
              </button>
              <p class="text-[11px] text-gray-400 dark:text-gray-500 mt-1.5">JPEG, PNG or WebP, up to 2MB</p>
              <button
                v-if="selectedFile"
                :disabled="uploadingPhoto"
                @click="uploadPhoto"
                class="mt-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {{ uploadingPhoto ? 'Uploading...' : 'Save Photo' }}
              </button>
            </div>
          </div>
          <p v-if="photoMessage" class="text-xs mt-2" :class="photoError ? 'text-red-500' : 'text-green-600 dark:text-green-400'">
            {{ photoMessage }}
          </p>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700"></div>

        <!-- Password -->
        <div ref="passwordSectionRef">
          <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Change Password</h3>
          <form @submit.prevent="submitPassword" class="space-y-3">
            <div>
              <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Current Password</label>
              <div class="relative">
                <input
                  v-model="passwordForm.current"
                  :type="showCurrent ? 'text' : 'password'"
                  required
                  class="w-full px-3 py-2 pr-10 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                <button type="button" @click="showCurrent = !showCurrent" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" :aria-label="showCurrent ? 'Hide password' : 'Show password'">
                  <svg v-if="showCurrent" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411M21 21l-3.59-3.59" /></svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
              </div>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">New Password</label>
              <div class="relative">
                <input
                  v-model="passwordForm.new"
                  :type="showNew ? 'text' : 'password'"
                  required
                  minlength="5"
                  class="w-full px-3 py-2 pr-10 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                <button type="button" @click="showNew = !showNew" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" :aria-label="showNew ? 'Hide password' : 'Show password'">
                  <svg v-if="showNew" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411M21 21l-3.59-3.59" /></svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
              </div>
              <p class="text-[11px] text-gray-400 dark:text-gray-500 mt-1">At least 5 characters or digits</p>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Confirm New Password</label>
              <div class="relative">
                <input
                  v-model="passwordForm.confirm"
                  :type="showConfirm ? 'text' : 'password'"
                  required
                  minlength="5"
                  class="w-full px-3 py-2 pr-10 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                <button type="button" @click="showConfirm = !showConfirm" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" :aria-label="showConfirm ? 'Hide password' : 'Show password'">
                  <svg v-if="showConfirm" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411M21 21l-3.59-3.59" /></svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
              </div>
              <p v-if="passwordForm.confirm && passwordForm.new !== passwordForm.confirm" class="text-[11px] text-red-500 mt-1">Passwords do not match</p>
            </div>
            <button
              type="submit"
              :disabled="changingPassword"
              class="w-full px-3 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {{ changingPassword ? 'Updating...' : 'Update Password' }}
            </button>
            <p v-if="passwordMessage" class="text-xs" :class="passwordError ? 'text-red-500' : 'text-green-600 dark:text-green-400'">
              {{ passwordMessage }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const props = withDefaults(defineProps<{ focusSection?: 'photo' | 'password' }>(), {
  focusSection: 'photo'
})

defineEmits<{ close: [] }>()

const authStore = useAuthStore()

const passwordSectionRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (props.focusSection === 'password') {
    await nextTick()
    passwordSectionRef.value?.scrollIntoView({ block: 'start' })
  }
})

const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

const initials = computed(() => {
  const name = authStore.userName || 'U'
  return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
})

const photoPreview = ref<string | null>((authStore.user as any)?.profile_photo || null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const uploadingPhoto = ref(false)
const photoMessage = ref('')
const photoError = ref(false)

const onFileSelected = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  selectedFile.value = file
  photoPreview.value = URL.createObjectURL(file)
  photoMessage.value = ''
}

const uploadPhoto = async () => {
  if (!selectedFile.value) return
  uploadingPhoto.value = true
  photoMessage.value = ''
  photoError.value = false
  try {
    const formData = new FormData()
    formData.append('photo', selectedFile.value)
    const res = await axios.post('/api/auth/profile-photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    const newPath = res.data.data.profile_photo
    if (authStore.user) {
      (authStore.user as any).profile_photo = newPath
      localStorage.setItem('user', JSON.stringify(authStore.user))
    }
    photoPreview.value = newPath
    selectedFile.value = null
    photoMessage.value = 'Profile photo updated'
  } catch (err: any) {
    photoError.value = true
    photoMessage.value = err.response?.data?.message || 'Failed to upload photo'
  } finally {
    uploadingPhoto.value = false
  }
}

const passwordForm = ref({ current: '', new: '', confirm: '' })
const changingPassword = ref(false)
const passwordMessage = ref('')
const passwordError = ref(false)

const submitPassword = async () => {
  passwordMessage.value = ''
  passwordError.value = false

  if (passwordForm.value.new !== passwordForm.value.confirm) {
    passwordError.value = true
    passwordMessage.value = 'New passwords do not match'
    return
  }

  changingPassword.value = true
  try {
    const result = await authStore.changePassword(passwordForm.value.current, passwordForm.value.new, passwordForm.value.confirm)
    if (result.success) {
      passwordMessage.value = 'Password updated successfully'
      passwordForm.value = { current: '', new: '', confirm: '' }
    } else {
      passwordError.value = true
      passwordMessage.value = result.message || 'Failed to update password'
    }
  } finally {
    changingPassword.value = false
  }
}
</script>
