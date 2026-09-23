<template>
  <!-- Standalone plain-white page (no AuthLayout gradient) - see the /teacher/change-password
       route. Scales from phones up to 27" monitors via the min-[1920px]/min-[2400px] steps. -->
  <div class="min-h-screen bg-white text-gray-900 flex flex-col">
    <header class="border-b border-gray-200">
      <div class="mx-auto w-full max-w-6xl min-[1920px]:max-w-7xl px-4 sm:px-6 lg:px-8 h-16 min-[1920px]:h-20 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/images/stmark-logo.jpg" alt="" class="w-9 h-9 min-[1920px]:w-11 min-[1920px]:h-11 rounded-lg border border-gray-200 object-cover" />
          <span class="text-lg min-[1920px]:text-xl font-semibold tracking-tight">eSpace</span>
        </div>
        <button
          type="button"
          @click="handleLogout"
          class="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 min-[1920px]:px-4 min-[1920px]:py-2 text-sm min-[1920px]:text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Log out
        </button>
      </div>
    </header>

    <main class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-[1920px]:py-16">
      <div class="w-full max-w-md lg:max-w-5xl min-[1920px]:max-w-6xl min-[2400px]:max-w-7xl">
        <div class="rounded-2xl min-[1920px]:rounded-3xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_12px_32px_-12px_rgba(16,24,40,0.12)] overflow-hidden lg:grid lg:grid-cols-5">
          <!-- Intro + requirements -->
          <section class="lg:col-span-2 p-6 sm:p-8 lg:p-10 min-[1920px]:p-14 border-b lg:border-b-0 lg:border-r border-gray-200">
            <h1 class="text-xl sm:text-2xl min-[1920px]:text-3xl font-bold tracking-tight">Change Your Password</h1>
            <p class="mt-3 text-sm sm:text-base min-[1920px]:text-lg text-gray-600 leading-relaxed">
              Set a new password to continue.
            </p>

            <div class="mt-6 lg:mt-8 rounded-xl border border-gray-200 p-4 min-[1920px]:p-5">
              <p class="text-xs min-[1920px]:text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Password requirements</p>
              <ul class="space-y-2.5">
                <li v-for="rule in rules" :key="rule.label" class="flex items-center gap-2.5 text-sm min-[1920px]:text-base">
                  <span
                    class="flex-none inline-flex items-center justify-center w-5 h-5 rounded-full border transition-colors"
                    :class="rule.met ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 text-transparent'"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <span :class="rule.met ? 'text-gray-900' : 'text-gray-500'">
                    {{ rule.label }}
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <!-- Form -->
          <section class="lg:col-span-3 p-6 sm:p-8 lg:p-10 min-[1920px]:p-14">
            <form @submit.prevent="handleSubmit" class="space-y-5 min-[1920px]:space-y-6" novalidate>
              <div v-for="field in fields" :key="field.key">
                <label :for="field.id" class="block text-sm min-[1920px]:text-base font-medium text-gray-700 mb-1.5">
                  {{ field.label }}
                </label>
                <div class="relative">
                  <input
                    :id="field.id"
                    v-model="form[field.key]"
                    :type="visible[field.key] ? 'text' : 'password'"
                    :autocomplete="field.autocomplete"
                    :placeholder="field.placeholder"
                    :minlength="field.key === 'currentPassword' ? undefined : MIN_LENGTH"
                    required
                    class="block w-full rounded-xl border bg-white px-4 py-3 min-[1920px]:py-3.5 pr-12 text-base min-[1920px]:text-lg text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:outline-none focus:ring-4"
                    :class="fieldBorder(field.key)"
                  />
                  <button
                    type="button"
                    @click="visible[field.key] = !visible[field.key]"
                    :aria-label="visible[field.key] ? 'Hide password' : 'Show password'"
                    class="absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:text-indigo-600"
                  >
                    <svg v-if="!visible[field.key]" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  </button>
                </div>

                <!-- Strength meter under the new password -->
                <div v-if="field.key === 'newPassword' && form.newPassword" class="mt-2.5">
                  <div class="flex gap-1.5">
                    <span
                      v-for="i in 4"
                      :key="i"
                      class="h-1.5 flex-1 rounded-full transition-colors"
                      :class="i <= strength.score ? strength.bar : 'bg-gray-200'"
                    ></span>
                  </div>
                  <p class="mt-1.5 text-xs min-[1920px]:text-sm" :class="strength.text">{{ strength.label }}</p>
                </div>

                <p
                  v-if="field.key === 'confirmPassword' && form.confirmPassword && !passwordsMatch"
                  class="mt-1.5 text-xs min-[1920px]:text-sm text-red-600"
                >
                  Passwords do not match.
                </p>
              </div>

              <div
                v-if="error"
                role="alert"
                class="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm min-[1920px]:text-base text-red-700"
              >
                <svg class="w-5 h-5 flex-none mt-px" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span>{{ error }}</span>
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 min-[1920px]:py-4 text-base min-[1920px]:text-lg font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                <svg v-if="isLoading" class="spinner" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isLoading ? 'Changing Password...' : 'Change Password & Continue' }}</span>
              </button>
            </form>
          </section>
        </div>

        <p class="mt-6 text-center text-xs min-[1920px]:text-sm text-gray-400">© {{ year }} eSpace. All rights reserved.</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

type FieldKey = 'currentPassword' | 'newPassword' | 'confirmPassword'

// Matches AuthService::changePassword()'s min:8 rule for non-student roles.
const MIN_LENGTH = 8

const router = useRouter()
const authStore = useAuthStore()
const year = new Date().getFullYear()

const form = reactive<Record<FieldKey, string>>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const visible = reactive<Record<FieldKey, boolean>>({
  currentPassword: false,
  newPassword: false,
  confirmPassword: false
})

const fields: { key: FieldKey; id: string; label: string; autocomplete: string; placeholder: string }[] = [
  { key: 'currentPassword', id: 'current_password', label: 'Current Password', autocomplete: 'current-password', placeholder: 'Enter your temporary password' },
  { key: 'newPassword', id: 'new_password', label: 'New Password', autocomplete: 'new-password', placeholder: `At least ${MIN_LENGTH} characters` },
  { key: 'confirmPassword', id: 'new_password_confirmation', label: 'Confirm New Password', autocomplete: 'new-password', placeholder: 'Re-enter your new password' }
]

const isLoading = ref(false)
const error = ref<string | null>(null)

const passwordsMatch = computed(() => form.newPassword === form.confirmPassword)

const rules = computed(() => [
  { label: `At least ${MIN_LENGTH} characters`, met: form.newPassword.length >= MIN_LENGTH },
  { label: 'Different from current password', met: !!form.newPassword && form.newPassword !== form.currentPassword },
  { label: 'Passwords match', met: !!form.confirmPassword && passwordsMatch.value }
])

const strength = computed(() => {
  const p = form.newPassword
  let score = 0
  if (p.length >= MIN_LENGTH) score++
  if (p.length >= 12) score++
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) score++
  if (/\d/.test(p) && /[^a-zA-Z\d]/.test(p)) score++
  if (p.length < MIN_LENGTH) score = 1
  return [
    { score: 1, label: 'Weak', bar: 'bg-red-500', text: 'text-red-600' },
    { score: 2, label: 'Fair', bar: 'bg-amber-500', text: 'text-amber-600' },
    { score: 3, label: 'Good', bar: 'bg-lime-500', text: 'text-lime-700' },
    { score: 4, label: 'Strong', bar: 'bg-emerald-500', text: 'text-emerald-600' }
  ][score - 1]
})

function fieldBorder(key: FieldKey) {
  const invalid = key === 'confirmPassword' && form.confirmPassword && !passwordsMatch.value
  return invalid
    ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
    : 'border-gray-300 hover:border-gray-400 focus:border-indigo-500 focus:ring-indigo-100'
}

async function handleSubmit() {
  error.value = null

  if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
    error.value = 'Please fill in all fields.'
    return
  }

  if (form.newPassword.length < MIN_LENGTH) {
    error.value = `Your new password must be at least ${MIN_LENGTH} characters.`
    return
  }

  if (!passwordsMatch.value) {
    error.value = 'New password and confirmation do not match.'
    return
  }

  if (form.newPassword === form.currentPassword) {
    error.value = 'Your new password must be different from your current password.'
    return
  }

  isLoading.value = true
  try {
    const result = await authStore.changePassword(
      form.currentPassword,
      form.newPassword,
      form.confirmPassword
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
