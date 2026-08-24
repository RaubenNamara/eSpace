<template>
  <div class="min-h-screen bg-slate-950 font-sans text-slate-900 antialiased">
    <!-- Nav -->
    <header class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <router-link to="/" class="inline-flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1 shadow-lg ring-1 ring-black/5">
            <img src="/images/stmark-logo.jpg" alt="St Mark's College Namagoma crest" class="h-full w-full rounded-lg object-contain">
          </div>
          <div class="leading-tight">
            <span class="block text-base font-bold tracking-tight text-white">Smacon e-Space</span>
            <span class="block text-[10px] font-medium uppercase tracking-[0.15em] text-blue-200/70">St Mark's College Namagoma</span>
          </div>
        </router-link>

        <nav class="hidden items-center gap-8 md:flex">
          <a href="#about" class="text-sm font-medium text-slate-300 transition hover:text-white">About</a>
          <a href="#features" class="text-sm font-medium text-slate-300 transition hover:text-white">Features</a>
          <a href="#roles" class="text-sm font-medium text-slate-300 transition hover:text-white">Who it's for</a>
        </nav>

        <div class="flex items-center gap-3">
          <router-link
            to="/login"
            class="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/15"
          >
            Log in
          </router-link>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div class="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[130px]"></div>
      <div class="pointer-events-none absolute -bottom-48 right-0 h-[580px] w-[580px] rounded-full bg-indigo-600/20 blur-[150px]"></div>
      <div class="pointer-events-none absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]"></div>
      <div
        class="pointer-events-none absolute inset-0 opacity-[0.035]"
        :style="{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '52px 52px'
        }"
      ></div>

      <div class="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div class="animate-fade-up">
          <div class="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur-md">
            <span class="relative flex h-2.5 w-2.5">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400"></span>
            </span>
            St Mark's College Namagoma
          </div>

          <h1 class="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl xl:text-6xl xl:leading-[1.08]">
            Empowering learners for
            <span class="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              lifelong learning.
            </span>
          </h1>

          <p class="mt-6 max-w-xl text-base leading-8 text-slate-300 xl:text-lg">
            Smacon e-Space is the digital learning environment of St Mark's College Namagoma, designed to extend learning beyond the classroom and place every learner at the centre of a modern, interactive, and engaging educational experience.
          </p>

          <div class="mt-9 flex flex-wrap items-center gap-4">
            <router-link
              to="/login"
              class="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-blue-500/25 transition hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
            >
              Log in to Smacon e-Space
              <svg class="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
              </svg>
            </router-link>
            <a
              href="#features"
              class="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/[0.08]"
            >
              Explore features
            </a>
          </div>

          <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
            <div v-for="trust in trustPoints" :key="trust" class="flex items-center gap-2">
              <svg class="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ trust }}
            </div>
          </div>
        </div>

        <!-- Hero visual: abstract product preview -->
        <div class="relative hidden animate-fade-up-slow lg:block">
          <div class="relative mx-auto max-w-md">
            <div class="rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div class="mb-4 flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-rose-400/70"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-amber-400/70"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-400/70"></span>
                <span class="ml-3 h-2 flex-1 rounded-full bg-white/10"></span>
              </div>

              <div class="grid grid-cols-3 gap-3 mb-3">
                <div v-for="tile in previewTiles" :key="tile.label" class="rounded-xl bg-white/[0.06] p-3 ring-1 ring-white/10">
                  <div class="mb-2 h-7 w-7 rounded-lg bg-gradient-to-br" :class="tile.grad"></div>
                  <p class="text-[10px] font-medium text-slate-400">{{ tile.label }}</p>
                  <p class="text-sm font-bold text-white">{{ tile.value }}</p>
                </div>
              </div>

              <div class="rounded-xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                <div class="mb-3 flex items-center justify-between">
                  <p class="text-xs font-medium text-slate-300">Weekly activity</p>
                  <span class="text-[10px] text-emerald-400">&#9650; live</span>
                </div>
                <div class="flex items-end gap-1.5 h-16">
                  <div v-for="(bar, i) in chartBars" :key="i" class="flex-1 rounded-t-md bg-gradient-to-t from-blue-500 to-cyan-400 opacity-80" :style="{ height: bar + '%' }"></div>
                </div>
              </div>
            </div>

            <!-- Floating chat card -->
            <div class="absolute -bottom-6 -left-8 w-52 rounded-2xl border border-white/10 bg-slate-900/90 p-3.5 shadow-xl shadow-black/40 backdrop-blur-xl animate-float">
              <div class="flex items-center gap-2 mb-2">
                <div class="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600"></div>
                <div class="flex-1">
                  <div class="h-2 w-16 rounded-full bg-white/20 mb-1"></div>
                  <div class="h-1.5 w-10 rounded-full bg-white/10"></div>
                </div>
              </div>
              <div class="h-1.5 w-full rounded-full bg-white/10 mb-1.5"></div>
              <div class="h-1.5 w-3/4 rounded-full bg-white/10"></div>
            </div>

            <!-- Floating badge -->
            <div class="absolute -top-5 -right-4 rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-2.5 shadow-xl shadow-black/40 backdrop-blur-xl animate-float-slow">
              <div class="flex items-center gap-2">
                <svg class="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-xs font-semibold text-white">Assignment graded</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="relative bg-white">
      <img
        src="/images/stmark-home.png"
        alt="St Mark's College Namagoma E-Learning Digital Space — About Smacon e-Space"
        class="block w-full"
      >
    </section>

    <!-- Features -->
    <section id="features" class="relative bg-slate-50 py-20 sm:py-28">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Everything in one place</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Built for how schools actually work
          </h2>
          <p class="mt-4 text-base leading-7 text-slate-600">
            From daily lessons to end-of-term report cards, Smacon e-Space connects every part of the learning journey.
          </p>
        </div>

        <div class="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="feature in productFeatures"
            :key="feature.title"
            class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
          >
            <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm" :class="feature.grad">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon"/>
              </svg>
            </div>
            <h3 class="text-sm font-semibold text-slate-900">{{ feature.title }}</h3>
            <p class="mt-1.5 text-xs leading-5 text-slate-500">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Roles -->
    <section id="roles" class="relative overflow-hidden bg-slate-950 py-20 sm:py-28">
      <div class="pointer-events-none absolute -right-40 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[130px]"></div>

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">One platform, four experiences</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for every role in your school
          </h2>
        </div>

        <div class="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="role in roles"
            :key="role.title"
            class="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.07]"
          >
            <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white" :class="role.grad">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="role.icon"/>
              </svg>
            </div>
            <h3 class="text-base font-semibold text-white">{{ role.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-400">{{ role.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA band -->
    <section class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 py-16 sm:py-20">
      <div
        class="pointer-events-none absolute inset-0 opacity-10"
        :style="{
          backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }"
      ></div>
      <div class="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to get started?</h2>
        <p class="max-w-xl text-base leading-7 text-blue-100">
          Sign in with the account your school has set up for you and pick up right where you left off.
        </p>
        <router-link
          to="/login"
          class="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          Log in to Smacon e-Space
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-950 py-8">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <router-link to="/" class="inline-flex items-center gap-2.5">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1 shadow ring-1 ring-black/5">
            <img src="/images/stmark-logo.jpg" alt="St Mark's College Namagoma crest" class="h-full w-full rounded object-contain">
          </div>
          <span class="text-sm font-bold text-white">Smacon e-Space</span>
        </router-link>
        <p class="text-xs text-slate-500">&copy; {{ currentYear }} St Mark's College Namagoma. All rights reserved.</p>
        <p class="text-xs text-slate-500">Empowering learners for lifelong learning.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const trustPoints = ['Secure access', 'Easy collaboration', 'Available anywhere']

const previewTiles = [
  { label: 'Classes', value: '12', grad: 'from-blue-500 to-cyan-400' },
  { label: 'Students', value: '486', grad: 'from-emerald-500 to-teal-500' },
  { label: 'Live now', value: '3', grad: 'from-amber-500 to-orange-500' }
]

const chartBars = [45, 70, 55, 85, 60, 95, 75]

const productFeatures = [
  {
    title: 'eNotes',
    description: 'Rich, narrated topic notes students can read or listen to, anywhere.',
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    grad: 'from-indigo-500 to-purple-600'
  },
  {
    title: 'Live Classes',
    description: 'Secure, interactive video lessons with attendance built in.',
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    grad: 'from-rose-500 to-red-600'
  },
  {
    title: 'Assignments',
    description: 'Create, submit and grade work with instant feedback loops.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    grad: 'from-emerald-500 to-teal-600'
  },
  {
    title: 'Virtual Lab',
    description: 'Run real science experiments in a 3D browser-based lab.',
    icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 20.25a48.286 48.286 0 01-8.135-.673c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5',
    grad: 'from-violet-500 to-fuchsia-600'
  },
  {
    title: 'eLibrary',
    description: 'A digital book collection students can browse and read online.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    grad: 'from-amber-500 to-orange-600'
  },
  {
    title: 'Item Bank',
    description: 'A shared, department-approved bank of practice questions.',
    icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    grad: 'from-sky-500 to-blue-600'
  },
  {
    title: 'Messaging',
    description: 'Direct and class-group chat between students, teachers and staff.',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    grad: 'from-teal-500 to-cyan-600'
  },
  {
    title: 'Report Cards',
    description: 'CBC-style weighted grading with printable term report cards.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    grad: 'from-pink-500 to-rose-600'
  }
]

const roles = [
  {
    title: 'Students',
    description: 'Attend classes, submit assignments, track grades and access every resource in one dashboard.',
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222',
    grad: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Teachers',
    description: 'Build lessons, grade work, run live classes and monitor every student\'s progress.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    grad: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Heads of Department',
    description: 'Oversee teachers and students in your department, and approve shared content.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    grad: 'from-amber-500 to-orange-500'
  },
  {
    title: 'Administrators',
    description: 'Manage the whole school — accounts, departments, classes, promotions and reports.',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    grad: 'from-violet-500 to-fuchsia-500'
  }
]
</script>

<style scoped>
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fade-up 0.7s ease-out both;
}
.animate-fade-up-slow {
  animation: fade-up 0.9s 0.15s ease-out both;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-float {
  animation: float 5s ease-in-out infinite;
}
.animate-float-slow {
  animation: float 6.5s 0.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-up,
  .animate-fade-up-slow,
  .animate-float,
  .animate-float-slow {
    animation: none;
  }
}
</style>
