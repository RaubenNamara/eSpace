<template>
  <main
    class="relative min-h-screen overflow-hidden bg-slate-950 font-sans text-slate-900"
  >
    <!-- Background decoration -->
    <div
      class="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[130px]"
    ></div>

    <div
      class="pointer-events-none absolute -bottom-48 right-0 h-[580px] w-[580px] rounded-full bg-indigo-600/20 blur-[150px]"
    ></div>

    <div
      class="pointer-events-none absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]"
    ></div>

    <!-- Decorative grid -->
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.035]"
      :style="{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '52px 52px'
      }"
    ></div>

    <div class="relative z-10 flex min-h-screen">
      <!-- Left section -->
      <section
        class="relative hidden w-[54%] flex-col justify-between overflow-hidden px-12 py-10 lg:flex xl:px-20 xl:py-14"
      >
        <!-- Top logo -->
        <div class="animate-fade-down">
          <router-link to="/" class="inline-flex items-center gap-4">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-1.5 shadow-xl shadow-blue-500/20 ring-1 ring-black/5"
            >
              <img src="/images/stmark-logo.jpg" alt="St Mark's College Namagoma crest" class="h-full w-full rounded-xl object-contain">
            </div>

            <div>
              <h1 class="text-2xl font-bold tracking-tight text-white">
                Smacon e-Space
              </h1>
              <p class="text-xs font-medium uppercase tracking-[0.2em] text-blue-200/70">
                St Mark's College Namagoma
              </p>
            </div>
          </router-link>
        </div>

        <!-- Hero content -->
        <div class="my-auto max-w-2xl animate-fade-up">
          <div
            class="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur-md"
          >
            <span class="relative flex h-2.5 w-2.5">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400"
              ></span>
            </span>

            Your complete digital learning workspace
          </div>

          <h2
            class="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white xl:text-6xl xl:leading-[1.08]"
          >
            Learn, teach and
            <span
              class="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent"
            >
              grow together.
            </span>
          </h2>

          <p
            class="mt-6 max-w-xl text-base leading-8 text-slate-300 xl:text-lg"
          >
            Access lessons, live classes, assignments, digital resources and
            performance insights from one secure and connected platform.
          </p>

          <!-- Features -->
          <div class="mt-10 grid max-w-xl grid-cols-2 gap-4">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="group rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.08]"
            >
              <div class="flex items-start gap-3">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/20 transition group-hover:bg-blue-500/25"
                >
                  <svg
                    v-if="feature.icon === 'classes'"
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.8"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>

                  <svg
                    v-else-if="feature.icon === 'library'"
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.8"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>

                  <svg
                    v-else-if="feature.icon === 'analytics'"
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.8"
                      d="M9 17v-6m4 6V7m4 10v-3M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 class="text-sm font-semibold text-white">
                    {{ feature.title }}
                  </h3>
                  <p class="mt-1 text-xs leading-5 text-slate-400">
                    {{ feature.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Trust row -->
          <div
            class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400"
          >
            <div class="flex items-center gap-2">
              <svg
                class="h-4 w-4 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Secure access
            </div>

            <div class="flex items-center gap-2">
              <svg
                class="h-4 w-4 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Easy collaboration
            </div>

            <div class="flex items-center gap-2">
              <svg
                class="h-4 w-4 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Available anywhere
            </div>
          </div>
        </div>

        <!-- Left footer -->
        <div
          class="flex items-center justify-between text-xs text-slate-500"
        >
          <p>© {{ currentYear }} St Mark's College Namagoma. All rights reserved.</p>
          <p>Empowering learners for lifelong learning.</p>
        </div>
      </section>

      <!-- Right section -->
      <section
        class="flex min-h-screen flex-1 items-center justify-center bg-slate-50 px-4 py-8 sm:px-8 lg:px-10"
      >
        <div class="w-full max-w-[460px] animate-card-in">
          <!-- Mobile logo -->
          <div class="mb-8 flex justify-center lg:hidden">
            <router-link to="/" class="inline-flex items-center gap-3">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-1.5 shadow-lg shadow-blue-500/20 ring-1 ring-black/5"
              >
                <img src="/images/stmark-logo.jpg" alt="St Mark's College Namagoma crest" class="h-full w-full rounded-xl object-contain">
              </div>

              <div>
                <h1 class="text-xl font-bold text-slate-900">Smacon e-Space</h1>
                <p class="text-xs font-medium text-slate-500">
                  St Mark's College Namagoma
                </p>
              </div>
            </router-link>
          </div>

          <!-- Login card -->
          <div
            class="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_25px_70px_-20px_rgba(15,23,42,0.22)] sm:p-9"
          >
            <!-- Back to home -->
            <router-link
              to="/"
              class="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
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
                class="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100"
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
                class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
              >
                Welcome back
              </h2>

              <p class="mt-2 text-sm leading-6 text-slate-500">
                Enter your credentials to access your Smacon e-Space account.
              </p>
            </div>

            <form class="space-y-5" @submit.prevent="handleLogin">
              <!-- Username -->
              <div>
                <label
                  for="identifier"
                  class="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Username or email
                </label>

                <div
                  class="group relative overflow-hidden rounded-xl border-2 border-slate-400 bg-white transition-all duration-200 hover:border-slate-500 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/10"
                >
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-12 items-center justify-center border-r border-slate-200 bg-slate-50 text-slate-500 transition-colors group-focus-within:border-blue-100 group-focus-within:bg-blue-50 group-focus-within:text-blue-600"
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
                    class="block w-full border-0 bg-white py-3.5 pl-14 pr-4 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-0 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60"
                  />
                </div>
              </div>

              <!-- Password -->
              <div>
                <div class="mb-2 flex items-center justify-between gap-4">
                  <label
                    for="password"
                    class="block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <router-link
                    to="/forgot-password"
                    class="text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                  >
                    Forgot password?
                  </router-link>
                </div>

                <div
                  class="group relative overflow-hidden rounded-xl border-2 border-slate-400 bg-white transition-all duration-200 hover:border-slate-500 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/10"
                >
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-12 items-center justify-center border-r border-slate-200 bg-slate-50 text-slate-500 transition-colors group-focus-within:border-blue-100 group-focus-within:bg-blue-50 group-focus-within:text-blue-600"
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
                    class="block w-full border-0 bg-white py-3.5 pl-14 pr-14 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-0 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60"
                  />

                  <button
                    type="button"
                    class="absolute inset-y-0 right-0 z-10 flex w-12 items-center justify-center border-l border-slate-200 bg-slate-50 text-slate-500 outline-none transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:bg-blue-50 focus-visible:text-blue-600 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 group-focus-within:border-blue-100"
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
                  class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
                />

                <label
                  for="remember"
                  class="ml-2.5 cursor-pointer text-sm font-medium text-slate-600"
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
                  class="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5"
                >
                  <div
                    class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600"
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
                    <p class="text-sm font-semibold text-red-800">
                      Unable to sign in
                    </p>
                    <p class="mt-0.5 text-sm leading-5 text-red-600">
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
                class="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_100%] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-right hover:shadow-xl hover:shadow-blue-600/25 focus-visible:ring-4 focus-visible:ring-blue-500/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <span
                  v-if="!isLoading"
                  class="flex items-center justify-center gap-2"
                >
                  Sign in to Smacon e-Space

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

              <!-- Divider -->
              <div class="relative py-1">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-slate-200"></div>
                </div>

                <div class="relative flex justify-center">
                  <span
                    class="bg-white px-4 text-xs font-medium uppercase tracking-wider text-slate-400"
                  >
                    Or continue with
                  </span>
                </div>
              </div>

              <!-- Google button -->
              <button
                type="button"
                :disabled="isLoading"
                class="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 outline-none transition hover:border-slate-400 hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                @click="handleGoogleLogin"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09A6.96 6.96 0 015.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A10.99 10.99 0 001 12c0 1.78.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                  />
                </svg>

                Continue with Google
              </button>
            </form>

            <!-- Support message -->
            <div class="mt-7 border-t border-slate-100 pt-6 text-center">
              <p class="text-sm text-slate-500">
                Having trouble accessing your account?
                <router-link
                  to="/support"
                  class="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                >
                  Contact support
                </router-link>
              </p>
            </div>
          </div>

          <!-- Mobile footer -->
          <div
            class="mt-7 flex flex-col items-center justify-center gap-2 text-center text-xs text-slate-500 sm:flex-row sm:gap-4"
          >
            <span>© {{ currentYear }} St Mark's College Namagoma</span>

            <span class="hidden h-1 w-1 rounded-full bg-slate-300 sm:block"></span>

            <router-link
              to="/privacy"
              class="transition hover:text-slate-800"
            >
              Privacy
            </router-link>

            <span class="hidden h-1 w-1 rounded-full bg-slate-300 sm:block"></span>

            <router-link
              to="/terms"
              class="transition hover:text-slate-800"
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
  console.log('handleLogin function called')
  
  if (isLoading.value) {
    console.log('Already loading, returning')
    return
  }

  error.value = null

  if (!form.identifier.trim()) {
    console.log('Missing identifier')
    error.value = 'Please enter your username or email address.'
    identifierInput.value?.focus()
    return
  }

  if (!form.password) {
    console.log('Missing password')
    error.value = 'Please enter your password.'
    return
  }

  console.log('Starting login process with:', {
    identifier: form.identifier.trim(),
    hasPassword: !!form.password,
    remember: form.remember
  })

  isLoading.value = true

  try {
    const result = (await authStore.login({
      identifier: form.identifier.trim(),
      password: form.password,
      remember: form.remember
    })) as LoginResult & { user?: any }

    console.log('Login result received:', result)

    if (!result.success) {
      error.value =
        result.message ||
        'The username or password you entered is incorrect. Please try again.'
      return
    }

    console.log('Login successful, calling redirectUserByRole with user data')
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
  
  console.log('Redirecting user by role:', {
    userData: userData,
    role: role,
    roleType: typeof userData?.role
  })

  const roleRoutes: Record<string, string> = {
    student: '/student/dashboard',
    teacher: '/teacher/dashboard',
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

function handleGoogleLogin(): void {
  error.value =
    'Google sign-in has not been configured yet. Please use your username and password.'
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