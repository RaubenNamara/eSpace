<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Account</h2>
    
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Username
        </label>
        <input
          id="username"
          v-model="form.username"
          type="text"
          class="input-field"
          placeholder="Choose a username"
          required
        />
      </div>
      
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
      
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password
        </label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          class="input-field"
          placeholder="Create a password"
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
          placeholder="Confirm your password"
          required
        />
      </div>
      
      <div>
        <label for="role" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Role
        </label>
        <select
          id="role"
          v-model="form.role"
          class="input-field"
          required
        >
          <option value="">Select your role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="hod">Head of Department</option>
          <option value="admin">Administrator</option>
        </select>
      </div>
      
      <div v-if="error" class="p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
        {{ error }}
      </div>
      
      <div v-if="validationErrors" class="p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
        <ul class="list-disc list-inside">
          <li v-for="(err, field) in validationErrors" :key="field">{{ err }}</li>
        </ul>
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
        <span>{{ isLoading ? 'Creating account...' : 'Create Account' }}</span>
      </button>
    </form>
    
    <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
      Already have an account?
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
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: ''
})

const isLoading = ref(false)
const error = ref<string | null>(null)
const validationErrors = ref<Record<string, string> | null>(null)

async function handleRegister() {
  // Validate passwords match
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  
  isLoading.value = true
  error.value = null
  validationErrors.value = null
  
  const result = await authStore.register({
    username: form.value.username,
    email: form.value.email,
    password: form.value.password,
    role: form.value.role as any
  })
  
  isLoading.value = false
  
  if (result.success) {
    // Redirect based on role
    const role = authStore.userRole
    if (role === 'student') router.push('/student/dashboard')
    else if (role === 'teacher') router.push('/teacher/dashboard')
    else if (role === 'hod') router.push('/hod/dashboard')
    else if (role === 'admin') router.push('/admin/dashboard')
    else router.push('/login')
  } else {
    error.value = result.message
    validationErrors.value = result.errors || null
  }
}
</script>
