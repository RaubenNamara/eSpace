<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

    <!-- Toast -->
    <transition name="toast">
      <div
        v-if="successMessage"
        class="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-green-200 dark:border-green-800 p-4 flex items-center gap-4 min-w-[280px] max-w-[calc(100vw-3rem)]"
      >
        <div class="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <p class="text-sm text-gray-700 dark:text-gray-300">{{ successMessage }}</p>
      </div>
    </transition>

    <div class="card max-w-3xl">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">School Profile</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Shown on every report card header and other school-branded documents.
      </p>

      <!-- Logo -->
      <div class="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
        <div class="w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-600">
          <img v-if="settings.logo_path" :src="resolveAssetUrl(settings.logo_path)" alt="School logo" class="w-full h-full object-contain">
          <svg v-else class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div>
          <input ref="logoInput" type="file" accept="image/png,image/jpeg,image/webp" class="hidden" @change="handleLogoSelect">
          <button
            type="button"
            @click="logoInput?.click()"
            :disabled="uploadingLogo"
            class="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            {{ uploadingLogo ? 'Uploading...' : 'Change Logo' }}
          </button>
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-1.5">PNG, JPEG, or WebP - up to 2MB</p>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="saveSettings" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">School Name</label>
            <input v-model="settings.school_name" type="text" class="input-field">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">P.O. Box</label>
            <input v-model="settings.box_number" type="text" placeholder="P. O. Box, 212 Kampala" class="input-field">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
            <input v-model="settings.website" type="text" placeholder="www.example.net" class="input-field">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input v-model="settings.email" type="email" class="input-field">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Phone</label>
            <input v-model="settings.phone" type="text" placeholder="+256 776960740" class="input-field">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Motto</label>
            <input v-model="settings.motto" type="text" placeholder="'Have to Give'" class="input-field">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
            <input v-model="settings.address" type="text" class="input-field">
          </div>
        </div>

        <div class="pt-2 border-t border-gray-100 dark:border-gray-700">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Awards Shown on Report Card</label>
          <p class="text-xs text-gray-400 dark:text-gray-500 mb-2">
            A student can earn more active badges than fit neatly on one report card. This caps how many appear on the printed report - the most prestigious ones are always kept.
          </p>
          <select v-model.number="settings.max_awards_on_report_card" class="input-field max-w-[140px]">
            <option :value="1">1 award</option>
            <option :value="2">2 awards</option>
            <option :value="3">3 awards</option>
            <option :value="4">4 awards</option>
          </select>
        </div>

        <div class="pt-2">
          <button
            type="submit"
            :disabled="saving"
            class="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiService from '@/services/api'
import { resolveAssetUrl } from '@/utils/url'

interface SchoolSettings {
  school_name: string
  logo_path: string | null
  box_number: string | null
  website: string | null
  email: string | null
  phone: string | null
  motto: string | null
  address: string | null
  max_awards_on_report_card: number
}

const settings = ref<SchoolSettings>({
  school_name: '',
  logo_path: null,
  box_number: null,
  website: null,
  email: null,
  phone: null,
  motto: null,
  address: null,
  max_awards_on_report_card: 2
})

const saving = ref(false)
const uploadingLogo = ref(false)
const successMessage = ref('')
const logoInput = ref<HTMLInputElement | null>(null)

const showSuccess = (message: string) => {
  successMessage.value = message
  setTimeout(() => { successMessage.value = '' }, 4000)
}

const fetchSettings = async () => {
  try {
    const response = await apiService.get('/admin/settings')
    if (response.data.success && response.data.data) {
      settings.value = { ...settings.value, ...response.data.data }
    }
  } catch (error) {
    console.error('Failed to fetch settings:', error)
  }
}

const saveSettings = async () => {
  saving.value = true
  try {
    const response = await apiService.put('/admin/settings', {
      school_name: settings.value.school_name,
      box_number: settings.value.box_number,
      website: settings.value.website,
      email: settings.value.email,
      phone: settings.value.phone,
      motto: settings.value.motto,
      address: settings.value.address,
      max_awards_on_report_card: settings.value.max_awards_on_report_card
    })
    if (response.data.success) {
      showSuccess('School settings saved')
    } else {
      alert(response.data.message || 'Failed to save settings')
    }
  } catch (error: any) {
    console.error('Failed to save settings:', error)
    alert(error.response?.data?.message || 'Failed to save settings')
  } finally {
    saving.value = false
  }
}

const handleLogoSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploadingLogo.value = true
  try {
    const formData = new FormData()
    formData.append('logo', file)
    const response = await apiService.post('/admin/settings/logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    if (response.data.success) {
      settings.value.logo_path = response.data.data.logo_path
      showSuccess('Logo updated')
    } else {
      alert(response.data.message || 'Failed to upload logo')
    }
  } catch (error: any) {
    console.error('Failed to upload logo:', error)
    alert(error.response?.data?.message || 'Failed to upload logo')
  } finally {
    uploadingLogo.value = false
    target.value = ''
  }
}

onMounted(() => {
  fetchSettings()
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}
</style>
