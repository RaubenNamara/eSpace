<template>
  <div class="w-full">
    <div class="max-w-4xl">
      <PageHeader title="Settings" description="Your details and your password." icon="wrench" />

      <!-- Profile Section -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 mb-5 border border-gray-200 dark:border-gray-700">
        <h2 class="text-base font-bold text-gray-900 dark:text-white mb-4">Profile Information</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
            <input
              v-model="profile.first_name"
              type="text"
              disabled
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
            <input
              v-model="profile.last_name"
              type="text"
              disabled
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reg No</label>
            <input
              v-model="profile.admission_number"
              type="text"
              disabled
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class</label>
            <input
              v-model="profile.class_name"
              type="text"
              disabled
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400"
            >
          </div>
        </div>
      </div>

      <!-- Account Credentials Section -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
        <h2 class="text-base font-bold text-gray-900 dark:text-white mb-4">Account Credentials</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Update your password. Your username is set by your administrator.</p>

        <form @submit.prevent="updateCredentials">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
              <input
                v-model="credentials.username"
                type="text"
                disabled
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400"
              >
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Contact your administrator to change your username</p>
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
              class="btn-primary"
            >
              {{ loading ? 'Updating...' : 'Update Credentials' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/ui/PageHeader.vue'
import { ref, onMounted } from 'vue'
import { apiService } from '../../services/api'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()

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
    toast.warning('Passwords do not match')
    return
  }

  loading.value = true
  try {
    const response = await apiService.put('/auth/password', {
      current_password: credentials.value.current_password,
      new_password: credentials.value.new_password
    })

    if (response.data.success) {
      toast.success('Password updated successfully!')
      credentials.value.current_password = ''
      credentials.value.new_password = ''
      credentials.value.confirm_password = ''
    } else {
      toast.error(response.data.message || 'Failed to update credentials')
    }
  } catch (error: any) {
    console.error('Failed to update credentials:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to update credentials'
    toast.error(errorMessage)
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
