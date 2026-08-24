<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reset Password</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-6">Enter your new password</p>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="token" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Reset Token
        </label>
        <input
          id="token"
          v-model="form.token"
          type="text"
          class="input-field"
          placeholder="Enter the reset token"
          required
        />
      </div>
      
      <div>
        <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          New Password
        </label>
        <input
          id="newPassword"
          v-model="form.newPassword"
          type="password"
          class="input-field"
          placeholder="Enter your new password"
          required
        />
      </div>
      
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          class="input-field"
          placeholder="Confirm your new password"
          required
        />
      </div>
      
      <div v-if="error" class="p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
        {{ error }}
      </div>
      
      <div v-if="success" class="p-3 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm">
        {{ success }}
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
        <span>{{ isLoading ? 'Resetting...' : 'Reset Password' }}</span>
      </button>
    </form>
    
    <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
      Remember your password?
      <router-link to="/login" class="text-indigo-600 hover:text-indigo-500 font-medium">
        Sign in
      </router-link>
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
  token: '',
  newPassword: '',
  confirmPassword: ''
})

const isLoading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

async function handleSubmit() {
  // Validate passwords match
  if (form.value.newPassword !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  
  isLoading.value = true
  error.value = null
  success.value = null
  
  const result = await authStore.resetPassword(form.value.token, form.value.newPassword)
  
  isLoading.value = false
  
  if (result.success) {
    success.value = 'Password reset successfully. Redirecting to login...'
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } else {
    error.value = result.message
  }
}
</script>
