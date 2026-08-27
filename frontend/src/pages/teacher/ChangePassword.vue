<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Change Your Password</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      For security purposes, you must change your temporary password before continuing to eSpace.
    </p>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="current_password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Current Password
        </label>
        <input
          id="current_password"
          v-model="form.currentPassword"
          type="password"
          class="input-field"
          autocomplete="current-password"
          required
        />
      </div>

      <div>
        <label for="new_password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          New Password
        </label>
        <input
          id="new_password"
          v-model="form.newPassword"
          type="password"
          class="input-field"
          autocomplete="new-password"
          minlength="8"
          required
        />
      </div>

      <div>
        <label for="new_password_confirmation" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Confirm New Password
        </label>
        <input
          id="new_password_confirmation"
          v-model="form.confirmPassword"
          type="password"
          class="input-field"
          autocomplete="new-password"
          minlength="8"
          required
        />
      </div>

      <div v-if="error" class="p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
        {{ error }}
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="w-full btn-primary flex items-center justify-center space-x-2"
      >
        <svg v-if="isLoading" class="spinner" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ isLoading ? 'Changing Password...' : 'Change Password & Continue' }}</span>
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
      <button type="button" @click="handleLogout" class="text-indigo-600 hover:text-indigo-500 font-medium">
        Log out instead
      </button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const isLoading = ref(false)
const error = ref<string | null>(null)

async function handleSubmit() {
  error.value = null

  if (form.value.newPassword !== form.value.confirmPassword) {
    error.value = 'New password and confirmation do not match.'
    return
  }

  if (form.value.newPassword === form.value.currentPassword) {
    error.value = 'Your new password must be different from your current password.'
    return
  }

  isLoading.value = true
  try {
    const result = await authStore.changePassword(
      form.value.currentPassword,
      form.value.newPassword,
      form.value.confirmPassword
    )

    if (result.success) {
      router.replace('/teacher/dashboard')
    } else {
      error.value = result.message || 'Failed to change password.'
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to change password.'
  } finally {
    isLoading.value = false
  }
}

async function handleLogout() {
  await authStore.logout()
  router.replace('/login')
}
</script>
