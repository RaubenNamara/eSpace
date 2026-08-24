<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

      <!-- Profile Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-100 dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h2>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
            <input
              v-model="profile.first_name"
              type="text"
              disabled
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
            <input
              v-model="profile.last_name"
              type="text"
              disabled
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reg No</label>
            <input
              v-model="profile.admission_number"
              type="text"
              disabled
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class</label>
            <input
              v-model="profile.class_name"
              type="text"
              disabled
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400"
            >
          </div>
        </div>
      </div>

      <!-- Account Credentials Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Account Credentials</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Update your login credentials. Your username and password are used to access the system.</p>

        <form @submit.prevent="updateCredentials">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
              <input
                v-model="credentials.username"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">This is your login username</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
              <input
                v-model="credentials.current_password"
                type="password"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
              <input
                v-model="credentials.new_password"
                type="password"
                required
                minlength="5"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Password must be at least 5 characters or digits</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
              <input
                v-model="credentials.confirm_password"
                type="password"
                required
                minlength="5"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
            </div>
          </div>
          <div class="mt-6">
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {{ loading ? 'Updating...' : 'Update Credentials' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Toast Notification -->
      <transition name="toast">
        <div
          v-if="successMessage"
          class="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-green-200 dark:border-green-800 p-4 flex items-center gap-4 min-w-[320px]"
        >
          <div class="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold text-gray-900 dark:text-white">Success!</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ successMessage }}</p>
          </div>
          <button
            @click="successMessage = ''"
            class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiService } from '../../services/api'

interface Profile {
  first_name: string
  last_name: string
  admission_number: string
  class_name?: string
}

const profile = ref<Profile>({
  first_name: '',
  last_name: '',
  admission_number: '',
  class_name: ''
})

const credentials = ref({
  username: '',
  current_password: '',
  new_password: '',
  confirm_password: ''
})

const loading = ref(false)
const successMessage = ref('')

const fetchProfile = async () => {
  try {
    const response = await apiService.get('/auth/me')
    if (response.data.success) {
      const user = response.data.data
      credentials.value.username = user.username || ''

      // Fetch student details
      const studentResponse = await apiService.get('/student/profile')
      if (studentResponse.data.success) {
        profile.value = studentResponse.data.data
      }
    }
  } catch (error) {
    console.error('Failed to fetch profile:', error)
  }
}

const updateCredentials = async () => {
  if (credentials.value.new_password !== credentials.value.confirm_password) {
    alert('Passwords do not match')
    return
  }

  loading.value = true
  try {
    const response = await apiService.put('/auth/password', {
      current_password: credentials.value.current_password,
      new_password: credentials.value.new_password
    })

    if (response.data.success) {
      // Update username separately
      await apiService.put('/auth/profile', {
        username: credentials.value.username
      })

      successMessage.value = 'Credentials updated successfully!'
      credentials.value.current_password = ''
      credentials.value.new_password = ''
      credentials.value.confirm_password = ''

      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      alert(response.data.message || 'Failed to update credentials')
    }
  } catch (error: any) {
    console.error('Failed to update credentials:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to update credentials'
    alert(errorMessage)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProfile()
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}
</style>
