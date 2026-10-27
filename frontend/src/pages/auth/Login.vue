<template>
  <main
    class="relative min-h-screen overflow-hidden bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-white"
  >
    <!-- Decorative grid -->
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
      :style="{
        backgroundImage:
          'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
        backgroundSize: '52px 52px'
      }"
    ></div>

    <div class="relative z-10 flex min-h-screen">
      <!-- Left section -->
      <section
        class="relative hidden w-[54%] flex-col justify-between overflow-hidden px-12 py-10 text-white lg:flex xl:px-20 xl:py-14"
      >
        <!-- Students at their laptops in class (public/images/login-students), under a deep green
             wash that keeps the words readable -->
        <picture class="absolute inset-0 -z-0">
          <source srcset="/images/login-students.webp" type="image/webp">
          <img src="/images/login-students.jpg" alt="" class="h-full w-full object-cover object-[35%_center]" fetchpriority="high">
        </picture>
        <div class="absolute inset-0 bg-gradient-to-r from-indigo-950/90 via-indigo-950/60 to-indigo-950/10"></div>
        <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-indigo-950/80 to-transparent"></div>

        <!-- Top logo -->
        <div class="relative animate-fade-down">
          <!-- Tusome is the brand; the badge says whose school space this is -->
          <div class="flex flex-wrap items-center gap-4">
            <router-link to="/" aria-label="Tusome home"><Wordmark size="lg" light /></router-link>
            <span class="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur pl-1 pr-3 py-1">
              <img src="/images/stmark-logo.jpg" alt="" class="h-6 w-6 rounded-full object-contain bg-white">
              <span class="text-xs font-semibold text-white/90">St Mark's College Namagoma</span>
            </span>
          </div>
        </div>

        <!-- Hero content -->
        <div class="relative my-auto max-w-2xl 2xl:max-w-4xl animate-fade-up">
          <div class="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur 2xl:px-5 2xl:py-2.5 2xl:text-base">
            <span class="relative flex h-2.5 w-2.5">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-300 opacity-75"></span>
              <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-300"></span>
            </span>
            Your complete digital learning workspace
          </div>

          <h2 class="max-w-xl 2xl:max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-sm xl:text-6xl xl:leading-[1.08] 2xl:text-7xl">
            Learn, teach and grow <span class="text-indigo-300">together.</span>
          </h2>

          <p class="mt-6 max-w-xl 2xl:max-w-2xl text-base leading-8 text-white/85 xl:text-lg 2xl:text-xl 2xl:leading-9">
            Access lessons, live classes, assignments, digital resources and
            performance insights from one secure and connected platform.
          </p>

          <!-- What's inside, in a line -->
          <div class="mt-8 flex flex-wrap gap-2">
            <span
              v-for="feature in features"
              :key="feature.title"
              :title="feature.description"
              class="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-indigo-300"></span>{{ feature.title }}
            </span>
          </div>
        </div>

        <!-- Left footer -->
        <div class="relative flex items-center justify-between text-xs text-white/70">
          <p>© {{ currentYear }} Tusome. All rights reserved.</p>
          <p>Empowering learners for lifelong learning.</p>
        </div>
      </section>

      <!-- Right section -->
      <section
        class="flex min-h-screen flex-1 items-center justify-center bg-indigo-50/50 px-4 py-8 dark:bg-slate-900 sm:px-8 lg:px-10"
      >
        <div class="w-full max-w-[460px] animate-card-in">
          <!-- Mobile logo -->
          <div class="mb-8 flex justify-center lg:hidden">
            <div class="flex flex-col items-center gap-3">
              <router-link to="/" aria-label="Tusome home"><Wordmark size="lg" /></router-link>
              <span class="inline-flex items-center gap-2 rounded-full bg-white/90 dark:bg-white/10 border border-slate-200 dark:border-white/10 pl-1 pr-3 py-1 shadow-sm">
                <img src="/images/stmark-logo.jpg" alt="" class="h-6 w-6 rounded-full object-contain bg-white">
                <span class="text-xs font-semibold text-slate-700 dark:text-slate-200">St Mark's College Namagoma</span>
              </span>
            </div>
          </div>
          <picture class="lg:hidden">
            <source srcset="/images/login-students.webp" type="image/webp">
            <img src="/images/login-students.jpg" alt="Students learning on Tusome in class" class="-mt-2 mb-5 h-40 w-full rounded-3xl object-cover object-[30%_40%] shadow-lg ring-1 ring-indigo-900/10">
          </picture>

          <!-- Login card -->
          <div
            class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_25px_70px_-20px_rgba(15,23,42,0.22)] ring-1 ring-slate-900/[0.03] dark:border-slate-700 dark:bg-slate-800 dark:ring-white/[0.03] sm:p-9"
          >
            <!-- Back to home -->
            <router-link
              to="/"
              class="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to home
            </router-link>

            <!-- Heading -->
            <div class="mb-8">
              <div
                class="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 dark:bg-indigo-500/15 dark:text-indigo-400 dark:ring-indigo-400/20"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M5.121 17.804A9.969 9.969 0 0112 15c2.658 0 5.075 1.04 6.879 2.735M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h2
                class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
              >
                Welcome back
              </h2>

              <p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Enter your credentials to access your school's Tusome.
              </p>
            </div>

            <form class="space-y-5" @submit.prevent="handleLogin">
              <!-- Username -->
              <div>
                <label
                  for="identifier"
                  class="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  Username or email
                </label>

                <div
                  class="group relative overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 focus-within:border-indigo-600 focus-within:shadow-md focus-within:ring-4 focus-within:ring-indigo-600/10 dark:border-slate-600 dark:bg-slate-900 dark:hover:border-slate-500 dark:focus-within:border-indigo-500 dark:focus-within:ring-indigo-500/20"
                >
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-12 items-center justify-center border-r border-slate-200 bg-slate-50 text-slate-500 transition-colors group-focus-within:border-indigo-100 group-focus-within:bg-indigo-50 group-focus-within:text-indigo-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:group-focus-within:border-indigo-500/30 dark:group-focus-within:bg-indigo-500/10 dark:group-focus-within:text-indigo-400"
                  >
                    <svg
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.8"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>

                  <input
                    id="identifier"
                    ref="identifierInput"
                    v-model.trim="form.identifier"
                    type="text"
                    name="identifier"
                    autocomplete="username"
                    placeholder="Enter your username or email"
                    required
                    :disabled="isLoading"
                    class="block w-full border-0 bg-white py-3.5 pl-14 pr-4 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-0 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:disabled:bg-slate-800"
                  />
                </div>
              </div>

              <!-- Password -->
              <div>
                <div class="mb-2 flex items-center justify-between gap-4">
                  <label
                    for="password"
                    class="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Password
                  </label>

                  <router-link
                    to="/forgot-password"
                    class="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Forgot password?
                  </router-link>
                </div>

                <div
                  class="group relative overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 focus-within:border-indigo-600 focus-within:shadow-md focus-within:ring-4 focus-within:ring-indigo-600/10 dark:border-slate-600 dark:bg-slate-900 dark:hover:border-slate-500 dark:focus-within:border-indigo-500 dark:focus-within:ring-indigo-500/20"
                >
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-12 items-center justify-center border-r border-slate-200 bg-slate-50 text-slate-500 transition-colors group-focus-within:border-indigo-100 group-focus-within:bg-indigo-50 group-focus-within:text-indigo-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:group-focus-within:border-indigo-500/30 dark:group-focus-within:bg-indigo-500/10 dark:group-focus-within:text-indigo-400"
                  >
                    <svg
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.8"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>

                  <input
                    id="password"
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    name="password"
                    autocomplete="current-password"
                    placeholder="Enter your password"
                    required
                    :disabled="isLoading"
                    class="block w-full border-0 bg-white py-3.5 pl-14 pr-14 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-0 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:disabled:bg-slate-800"
                  />

                  <button
                    type="button"
                    class="absolute inset-y-0 right-0 z-10 flex w-12 items-center justify-center border-l border-slate-200 bg-slate-50 text-slate-500 outline-none transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:bg-indigo-50 focus-visible:text-indigo-600 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 group-focus-within:border-indigo-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100 dark:group-focus-within:border-indigo-500/30"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                    :title="showPassword ? 'Hide password' : 'Show password'"
                    @click="showPassword = !showPassword"
                  >
                    <svg
                      v-if="showPassword"
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.8"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411M21 21l-3.59-3.59"
                      />
                    </svg>

                    <svg
                      v-else
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.8"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.8"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Remember me -->
              <div class="flex items-center">
                <input
                  id="remember"
                  v-model="form.remember"
                  type="checkbox"
                  name="remember"
                  :disabled="isLoading"
                  class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-800 dark:focus:ring-offset-slate-800 disabled:cursor-not-allowed"
                />

                <label
                  for="remember"
                  class="ml-2.5 cursor-pointer text-sm font-medium text-slate-600 dark:text-slate-300"
                >
                  Keep me signed in
                </label>
              </div>

              <!-- Error message -->
              <transition name="alert">
                <div
                  v-if="error"
                  role="alert"
                  aria-live="polite"
                  class="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 dark:border-red-500/30 dark:bg-red-500/10"
                >
                  <div
                    class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                  >
                    <svg
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01M5.07 19h13.86a2 2 0 001.74-2.99L13.74 4a2 2 0 00-3.48 0L3.33 16.01A2 2 0 005.07 19z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p class="text-sm font-semibold text-red-800 dark:text-red-300">
                      Unable to sign in
                    </p>
                    <p class="mt-0.5 text-sm leading-5 text-red-600 dark:text-red-400">
                      {{ error }}
                    </p>
                  </div>
                </div>
              </transition>

              <!-- Login button -->
              <button
                type="button"
                :disabled="isLoading"
                @click="handleLogin"
                class="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm outline-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus-visible:ring-4 focus-visible:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <span
                  v-if="!isLoading"
                  class="flex items-center justify-center gap-2"
                >
                  Sign in to Tusome

                  <svg
                    class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>

                <span
                  v-else
                  class="flex items-center justify-center gap-2.5"
                >
                  <svg
                    class="h-5 w-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />

                    <path
                      class="opacity-90"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V1C5.925 1 1 5.925 1 12h3zm2.2 5.6A7.96 7.96 0 014 12H1c0 3.04 1.13 5.82 3 7.94l2.2-2.34z"
                    />
                  </svg>

                  Signing you in...
                </span>
              </button>
            </form>

            <!-- Support message -->
            <div class="mt-7 border-t border-slate-100 pt-6 text-center dark:border-slate-700">
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Having trouble accessing your account?
                <a
                  :href="`mailto:${SUPPORT_EMAIL}`"
                  class="font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  {{ SUPPORT_EMAIL }}
                </a>
              </p>
            </div>
          </div>

          <!-- Mobile footer -->
          <div
            class="mt-7 flex flex-col items-center justify-center gap-2 text-center text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:gap-4"
          >
            <span>© {{ currentYear }} Tusome</span>

            <span class="hidden h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600 sm:block"></span>

            <router-link
              to="/privacy"
              class="transition hover:text-slate-800 dark:hover:text-slate-200"
            >
              Privacy
            </router-link>

            <span class="hidden h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600 sm:block"></span>

            <router-link
              to="/terms"
              class="transition hover:text-slate-800 dark:hover:text-slate-200"
            >
              Terms
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import Wordmark from '@/components/brand/Wordmark.vue'
import { SUPPORT_EMAIL } from '@/data/site'
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

interface LoginResult {
  success: boolean
  message?: string
}

const router = useRouter()
const authStore = useAuthStore()

const identifierInput = ref<HTMLInputElement | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const showPassword = ref(false)

const form = reactive({
  identifier: '',
  password: '',
  remember: false
})

const currentYear = computed(() => new Date().getFullYear())

const features = [
  {
    title: 'Live Classes',
    description: 'Join secure and interactive virtual lessons.',
    icon: 'classes'
  },
  {
    title: 'Digital Library',
    description: 'Access learning resources from any device.',
    icon: 'library'
  },
  {
    title: 'Smart Analytics',
    description: 'Monitor progress and academic performance.',
    icon: 'analytics'
  },
  {
    title: 'Secure Platform',
    description: 'Protected access for every user account.',
    icon: 'security'
  }
]

onMounted(async () => {
  await nextTick()
  identifierInput.value?.focus()
})

async function handleLogin(): Promise<void> {
  
  if (isLoading.value) {
    return
  }

  error.value = null

  if (!form.identifier.trim()) {
    error.value = 'Please enter your username or email address.'
    identifierInput.value?.focus()
    return
  }

  if (!form.password) {
    error.value = 'Please enter your password.'
    return
  }


  isLoading.value = true

  try {
    const result = (await authStore.login({
      identifier: form.identifier.trim(),
      password: form.password,
      remember: form.remember
    })) as LoginResult & { user?: any }


    if (!result.success) {
      error.value =
        result.message ||
        'The username or password you entered is incorrect. Please try again.'
      return
    }

    // Pass user data directly from result to avoid timing issues with store
    redirectUserByRole(result.user)
  } catch (loginError) {
    console.error('Login error:', loginError)

    error.value =
      'We could not connect to the server. Please check your internet connection and try again.'
  } finally {
    isLoading.value = false
  }
}

function redirectUserByRole(userData: any): void {
  const role = String(userData?.role || '').toLowerCase()
  

  const roleRoutes: Record<string, string> = {
    student: '/student/dashboard',
    teacher: userData?.must_change_password ? '/teacher/change-password' : '/teacher/dashboard',
    hod: '/hod/dashboard',
    admin: '/admin/dashboard',
    super_admin: '/admin/dashboard',
    administrator: '/admin/dashboard'
  }

  const destination = roleRoutes[role]

  if (destination) {
    router.replace(destination)
    return
  }

  console.error('Unrecognised role:', role, 'Available routes:', Object.keys(roleRoutes))
  error.value =
    `Your account does not have a recognised role (${role}). Please contact the administrator.`
}
</script>

<style scoped>
@keyframes fade-down {
  from {
    opacity: 0;
    transform: translateY(-18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(26px) scale(0.985);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fade-down {
  animation: fade-down 0.7s ease-out both;
}

.animate-fade-up {
  animation: fade-up 0.8s 0.1s ease-out both;
}

.animate-card-in {
  animation: card-in 0.75s ease-out both;
}

.alert-enter-active,
.alert-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    max-height 0.25s ease;
}

.alert-enter-from,
.alert-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-8px);
}

.alert-enter-to,
.alert-leave-from {
  max-height: 150px;
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-down,
  .animate-fade-up,
  .animate-card-in {
    animation: none;
  }

  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>