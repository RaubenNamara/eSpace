<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-6">Enter your email to receive a password reset link</p>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="input-field"
          placeholder="Enter your email"
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
        <span>{{ isLoading ? 'Sending...' : 'Send Reset Link' }}</span>
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
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()

const form = ref({
  email: ''
})

const isLoading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

async function handleSubmit() {
  isLoading.value = true
  error.value = null
  success.value = null
  
  try {
    await authStore.forgotPassword(form.value.email)
    success.value = 'If the email exists, a reset link has been sent'
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to send reset link'
  }
  
  isLoading.value = false
}
</script>
