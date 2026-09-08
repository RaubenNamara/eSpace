<template>
  <div class="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-white">
    <!-- Nav -->
    <header
      class="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl transition-transform duration-300 dark:border-white/10 dark:bg-slate-950/80"
      :class="{ '-translate-y-full': headerHidden }"
    >
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <router-link to="/" class="inline-flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1 shadow-lg ring-1 ring-black/5">
            <img src="/images/stmark-logo.jpg" alt="St Mark's College Namagoma crest" class="h-full w-full rounded-lg object-contain">
          </div>
          <div class="leading-tight">
            <span class="block text-base font-bold tracking-tight text-slate-900 dark:text-white">Smacon e-Space</span>
            <span class="block text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">St Mark's College Namagoma</span>
          </div>
        </router-link>

        <nav class="hidden items-center gap-8 md:flex">
          <a href="#about" class="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">About</a>
          <a href="#features" class="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Features</a>
          <a href="#roles" class="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Who it's for</a>
        </nav>

        <div class="flex items-center gap-3">
          <router-link
            to="/login"
            class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
          >
            Log in
          </router-link>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="relative overflow-hidden pt-28 pb-16 sm:pt-40 sm:pb-32">
      <div
        class="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        :style="{
          backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '52px 52px'
        }"
      ></div>

      <div class="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div class="animate-fade-up">
          <div class="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <span class="relative flex h-2.5 w-2.5">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-75 dark:bg-slate-500"></span>
              <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-slate-500 dark:bg-slate-400"></span>
            </span>
            Built for every school
          </div>

          <h1 class="max-w-xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl xl:text-6xl xl:leading-[1.08]">
            Learn without limits.
          </h1>

          <p class="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300 xl:text-lg">
            Smacon e-Space is the digital learning environment designed to extend learning beyond the classroom and place every learner at the centre of a modern, interactive, and engaging educational experience.
          </p>

          <div class="mt-9 flex flex-wrap items-center gap-4">
            <router-link
              to="/login"
              class="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5"
            >
              Log in to Smacon e-Space
              <svg class="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
              </svg>
            </router-link>
            <a
              href="#features"
              class="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
            >
              Explore features
            </a>
          </div>

          <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
            <div v-for="trust in trustPoints" :key="trust" class="flex items-center gap-2">
              <svg class="h-4 w-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ trust }}
            </div>
          </div>
        </div>

        <!-- Hero visual: abstract product preview -->
        <div class="relative hidden animate-fade-up-slow lg:block">
          <div class="relative mx-auto max-w-md">
            <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-slate-900">
              <div class="mb-4 flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span class="ml-3 h-2 flex-1 rounded-full bg-slate-100 dark:bg-white/10"></span>
              </div>

              <div class="grid grid-cols-3 gap-3 mb-3">
                <div v-for="tile in previewTiles" :key="tile.label" class="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100 dark:bg-white/[0.06] dark:ring-white/10">
                  <div class="mb-2 h-7 w-7 rounded-lg bg-indigo-600"></div>
                  <p class="text-[10px] font-medium text-slate-500 dark:text-slate-400">{{ tile.label }}</p>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">{{ tile.value }}</p>
                </div>
              </div>

              <div class="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100 dark:bg-white/[0.06] dark:ring-white/10">
                <div class="mb-3 flex items-center justify-between">
                  <p class="text-xs font-medium text-slate-600 dark:text-slate-300">Weekly activity</p>
                  <span class="text-[10px] text-slate-400 dark:text-slate-500">&#9650; live</span>
                </div>
                <div class="flex items-end gap-1.5 h-16">
                  <div v-for="(bar, i) in chartBars" :key="i" class="flex-1 rounded-t-md bg-indigo-500 opacity-80" :style="{ height: bar + '%' }"></div>
                </div>
              </div>
            </div>

            <!-- Floating chat card -->
            <div class="absolute -bottom-6 -left-8 w-52 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xl animate-float dark:border-white/10 dark:bg-slate-900/90">
              <div class="flex items-center gap-2 mb-2">
                <div class="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                <div class="flex-1">
                  <div class="h-2 w-16 rounded-full bg-slate-100 dark:bg-white/20 mb-1"></div>
                  <div class="h-1.5 w-10 rounded-full bg-slate-100 dark:bg-white/10"></div>
                </div>
              </div>
              <div class="h-1.5 w-full rounded-full bg-slate-100 dark:bg-white/10 mb-1.5"></div>
              <div class="h-1.5 w-3/4 rounded-full bg-slate-100 dark:bg-white/10"></div>
            </div>

            <!-- Floating badge -->
            <div class="absolute -top-5 -right-4 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-xl animate-float-slow dark:border-white/10 dark:bg-slate-900/90">
              <div class="flex items-center gap-2">
                <svg class="h-4 w-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-xs font-semibold text-slate-900 dark:text-white">Assignment graded</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="relative overflow-hidden bg-slate-100 py-12 dark:bg-slate-900 sm:py-28">
      <div class="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div class="text-center lg:text-left">
          <h2 class="text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Your School's eSpace
          </h2>
          <p class="mx-auto mt-5 max-w-lg text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg lg:mx-0">
            Empowering students and teachers with interactive, browser-based access to notes and textbooks,
            with nothing to download or install.
          </p>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-white">
              <svg class="h-4 w-4 text-slate-400 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
              Interactive notes &amp; textbooks
            </span>
            <span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-white">
              <svg class="h-4 w-4 text-slate-400 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Works in any browser
            </span>
            <span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-white">
              <svg class="h-4 w-4 text-slate-400 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/></svg>
              Built for schools like yours
            </span>
          </div>
        </div>

        <!-- Visual: browser-window mockup of a notes page, echoing the hero's device preview -->
        <div class="relative hidden animate-fade-up-slow lg:block">
          <div class="relative mx-auto max-w-md">
            <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-slate-800">
              <div class="mb-4 flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span class="ml-3 flex h-6 flex-1 items-center rounded-full bg-slate-100 px-3 dark:bg-white/10">
                  <svg class="mr-1.5 h-3 w-3 text-slate-400 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  <span class="text-[10px] text-slate-500 dark:text-slate-300">e-space.stmarks.ac.ug/enotes</span>
                </span>
              </div>

              <div class="mb-3 flex items-center justify-between">
                <span class="rounded-md bg-indigo-600 px-2.5 py-1 text-[10px] font-semibold text-white">Chapter 4</span>
                <span class="text-[10px] text-slate-400 dark:text-slate-500">Page 3 of 12</span>
              </div>

              <div class="space-y-2 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100 dark:bg-white/[0.06] dark:ring-white/10">
                <p class="text-xs font-bold text-slate-900 dark:text-white">Data Communication</p>
                <div class="h-1.5 w-full rounded-full bg-slate-200 dark:bg-white/10"></div>
                <div class="h-1.5 w-11/12 rounded-full bg-slate-200 dark:bg-white/10"></div>
                <div class="h-1.5 w-full rounded-full bg-slate-200 dark:bg-white/10"></div>
                <div class="h-1.5 w-4/5 rounded-full bg-slate-200 dark:bg-white/10"></div>
                <div class="mt-3 h-16 rounded-lg bg-slate-100 ring-1 ring-slate-200 dark:bg-white/5 dark:ring-white/10"></div>
                <div class="h-1.5 w-full rounded-full bg-slate-200 dark:bg-white/10"></div>
                <div class="h-1.5 w-3/5 rounded-full bg-slate-200 dark:bg-white/10"></div>
              </div>

              <div class="mt-3 flex items-center justify-between rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100 dark:bg-white/[0.06] dark:ring-white/10">
                <div class="flex items-center gap-2">
                  <div class="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-600"></div>
                  <div class="h-1.5 w-16 rounded-full bg-slate-200 dark:bg-white/10"></div>
                </div>
                <svg class="h-4 w-4 text-slate-400 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </div>
            </div>

            <!-- Floating "no install" badge -->
            <div class="absolute -bottom-6 -left-8 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-xl animate-float dark:border-white/10 dark:bg-slate-800/95">
              <div class="flex items-center gap-2">
                <svg class="h-4 w-4 text-slate-400 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18"/></svg>
                <span class="text-xs font-semibold text-slate-900 dark:text-white">Read from any device</span>
              </div>
            </div>

            <!-- Floating badge -->
            <div class="absolute -top-5 -right-4 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-xl animate-float-slow dark:border-white/10 dark:bg-slate-800/95">
              <div class="flex items-center gap-2">
                <svg class="h-4 w-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-xs font-semibold text-slate-900 dark:text-white">Progress saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="relative bg-white py-12 dark:bg-slate-950 sm:py-28">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Everything in one place</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Built for how schools actually work
          </h2>
          <p class="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
            From daily lessons to end-of-term report cards, Smacon e-Space connects every part of the learning journey.
          </p>
        </div>

        <div class="mt-10 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          <div
            v-for="feature in productFeatures"
            :key="feature.title"
            class="group rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 sm:p-5"
          >
            <div class="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm sm:mb-4 sm:h-11 sm:w-11">
              <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon"/>
              </svg>
            </div>
            <h3 class="text-xs font-semibold text-slate-900 dark:text-white sm:text-sm">{{ feature.title }}</h3>
            <p class="mt-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400 sm:mt-1.5 sm:text-xs sm:leading-5">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Roles -->
    <section id="roles" class="relative overflow-hidden bg-slate-100 py-12 dark:bg-slate-900 sm:py-28">
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">One platform, four experiences</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Built for every role in your school
          </h2>
        </div>

        <div class="mt-10 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          <div
            v-for="role in roles"
            :key="role.title"
            class="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20 dark:hover:bg-white/[0.07] sm:p-6"
          >
            <div class="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white sm:mb-4 sm:h-11 sm:w-11">
              <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="role.icon"/>
              </svg>
            </div>
            <h3 class="text-sm font-semibold text-slate-900 dark:text-white sm:text-base">{{ role.title }}</h3>
            <p class="mt-1 text-xs leading-4 text-slate-500 dark:text-slate-400 sm:mt-2 sm:text-sm sm:leading-6">{{ role.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA band -->
    <section class="relative overflow-hidden bg-white py-10 dark:bg-slate-950 sm:py-20">
      <div class="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Ready to get started?</h2>
        <p class="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Sign in with the account your school has set up for you and pick up right where you left off.
        </p>
        <router-link
          to="/login"
          class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5"
        >
          Log in to Smacon e-Space
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </router-link>
      </div>
    </section>

    <!-- Spacer so the fixed footer below doesn't permanently sit over the last section's
         content - same reason the hero has top padding to clear the fixed header. -->
    <div class="h-32 sm:h-20" aria-hidden="true"></div>

    <!-- Footer - fixed like the header, but only slides into view once you've actually reached
         the bottom of the page (see handleScroll), so it doesn't eat into mobile screen space
         everywhere else. Same translucent-blur treatment as the header (border + backdrop
         blur), just gray instead of white/slate - light gray in light mode rather than plain
         white, so it doesn't read as just another white system panel. -->
    <footer
      class="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-gray-100/90 py-6 backdrop-blur-xl transition-transform duration-300 dark:border-white/10 dark:bg-gray-900/90"
      :class="{ 'translate-y-full': footerHidden }"
    >
      <div class="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <router-link to="/" class="inline-flex items-center gap-2.5">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1 shadow ring-1 ring-black/5">
            <img src="/images/stmark-logo.jpg" alt="St Mark's College Namagoma crest" class="h-full w-full rounded object-contain">
          </div>
          <span class="text-sm font-bold text-slate-900 dark:text-white">Smacon e-Space</span>
        </router-link>

        <nav class="flex flex-wrap items-center justify-center gap-6">
          <a href="#about" class="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">About</a>
          <a href="#features" class="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Features</a>
          <a href="#roles" class="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Who it's for</a>
          <router-link to="/login" class="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Log in</router-link>
        </nav>

        <div class="flex flex-col items-center gap-0.5 text-center lg:items-end lg:text-right">
          <p class="text-xs text-slate-500 dark:text-slate-400">&copy; {{ currentYear }} St Mark's College Namagoma. All rights reserved.</p>
          <p class="text-xs text-slate-400 dark:text-slate-500">Learn without limits.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

// Header hides while scrolling down and reappears while scrolling up (or near the very top, so
// a small nudge doesn't make the nav vanish). The footer is independent of direction - it only
// shows once you've actually reached the bottom of the page, staying out of the way everywhere
// else so it doesn't compete with the header for mobile screen space.
const HEADER_SHOW_THRESHOLD_PX = 80
const FOOTER_SHOW_DISTANCE_FROM_BOTTOM_PX = 24
const headerHidden = ref(false)
const footerHidden = ref(true)
let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY
  const scrollingDown = currentScrollY > lastScrollY
  const scrollingUp = currentScrollY < lastScrollY

  if (currentScrollY < HEADER_SHOW_THRESHOLD_PX) {
    headerHidden.value = false
  } else if (scrollingDown) {
    headerHidden.value = true
  } else if (scrollingUp) {
    headerHidden.value = false
  }

  const distanceFromBottom = document.documentElement.scrollHeight - (currentScrollY + window.innerHeight)
  footerHidden.value = distanceFromBottom > FOOTER_SHOW_DISTANCE_FROM_BOTTOM_PX

  lastScrollY = currentScrollY
}

onMounted(() => {
  lastScrollY = window.scrollY
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const trustPoints = ['Secure access', 'Easy collaboration', 'Available anywhere']

const previewTiles = [
  { label: 'Classes', value: '12' },
  { label: 'Students', value: '486' },
  { label: 'Live now', value: '3' }
]

const chartBars = [45, 70, 55, 85, 60, 95, 75]

// Monochrome throughout (black in light mode, white in dark mode) - no per-module color.
const productFeatures = [
  {
    title: 'eNotes',
    description: 'Rich, narrated topic notes students can read or listen to, anywhere.',
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
  },
  {
    title: 'Live Classes',
    description: 'Secure, interactive video lessons with attendance built in.',
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
  },
  {
    title: 'Assignments',
    description: 'Create, submit and grade work with instant feedback loops.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Virtual Lab',
    description: 'Run real science experiments in a 3D browser-based lab.',
    icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 20.25a48.286 48.286 0 01-8.135-.673c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5'
  },
  {
    title: 'eLibrary',
    description: 'A digital book collection students can browse and read online.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  },
  {
    title: 'Item Bank',
    description: 'A shared, department-approved bank of practice questions.',
    icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Messaging',
    description: 'Direct and class-group chat between students, teachers and staff.',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
  },
  {
    title: 'Report Cards',
    description: 'CBC-style weighted grading with printable term report cards.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  }
]

const roles = [
  {
    title: 'Students',
    description: 'Attend classes, submit assignments, track grades and access every resource in one dashboard.',
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
  },
  {
    title: 'Teachers',
    description: 'Build lessons, grade work, run live classes and monitor every student\'s progress.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  },
  {
    title: 'Heads of Department',
    description: 'Oversee teachers and students in your department, and approve shared content.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Administrators',
    description: 'Manage the whole school — accounts, departments, classes, promotions and reports.',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
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
