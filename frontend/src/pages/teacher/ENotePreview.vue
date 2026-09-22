<template>
  <div class="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
    <!-- Header - hidden entirely in Read Mode (replaced by floating overlay controls), and also
         auto-collapses while the reader scrolls down through a page's content, reappearing on
         scroll-up - same idea as the app shell's own header (MainLayout.vue), applied here so
         scrolling to read reclaims that space too. max-height (not a transform) so the book
         actually grows into the reclaimed space rather than leaving a blank gap behind a
         slid-away header. -->
    <div
      v-if="!readMode"
      class="relative bg-indigo-600 px-3 sm:px-6 flex items-center justify-between gap-2 flex-shrink-0 shadow-sm transition-[max-height,padding,opacity] duration-300"
      :class="headerHidden ? 'max-h-0 !py-0 opacity-0 overflow-hidden' : 'max-h-24 py-1.5 sm:py-2 opacity-100 overflow-visible'">
      <div class="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          @click="goBack"
          class="p-1.5 rounded-lg bg-white/10 hover:bg-white/25 transition-colors flex-shrink-0"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <!-- Table of contents toggle - sidebar is an overlay below lg -->
        <button
          @click="showToc = !showToc"
          class="p-1.5 rounded-lg bg-white/10 hover:bg-white/25 transition-colors flex-shrink-0 lg:hidden"
          title="Table of contents"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div class="hidden sm:flex w-8 h-8 rounded-lg bg-white/15 items-center justify-center flex-shrink-0">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <div class="min-w-0">
          <h1 class="text-sm sm:text-lg font-bold text-white truncate leading-tight">{{ topic?.title }}</h1>
          <div class="flex items-center gap-2 mt-0.5">
            <span class="text-xs sm:text-sm text-indigo-100 truncate">{{ topic?.subject_name }}</span>
            <span v-if="isPreviewMode" class="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/20 text-white">
              Preview
            </span>
            <span
              v-else-if="topic?.status"
              class="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium capitalize"
              :class="topic.status === 'published'
                ? 'bg-emerald-400/20 text-emerald-100'
                : 'bg-white/15 text-white'"
            >
              {{ topic.status }}
            </span>
          </div>
        </div>

        <!-- AI Tutor: lives entirely in the header now, as a trigger + dropdown panel (same
             pattern as the Voice panel on the right), instead of an inline block in the reading
             area - keeps that whole vertical space free for the notes themselves. -->
        <div v-if="isStudentMode && currentPage" class="relative flex-shrink-0">
          <button
            @click="onTutorHeaderClick"
            class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 hover:bg-white/25 text-white text-xs font-medium rounded-lg transition-colors"
          >
            <svg v-if="tutorStatus === 'loading'" class="w-3.5 h-3.5 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <span v-else>🧑‍🏫</span>
            <span>
              AI Tutor<template v-if="tutorStatus === 'ready' && tutorProgress.total > 0"> · {{ tutorProgress.current }}/{{ tutorProgress.total }}</template>
            </span>
            <div v-if="tutorStatus === 'ready' && tutorProgress.total > 0" class="w-10 h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div class="h-full bg-white rounded-full transition-all" :style="{ width: `${(tutorProgress.current / tutorProgress.total) * 100}%` }"></div>
            </div>
          </button>

          <div v-show="showTutorPanel" @click="showTutorPanel = false" class="fixed inset-0 z-40"></div>

          <div v-show="showTutorPanel" class="absolute left-0 top-full mt-2 w-80 max-w-[90vw] z-50 text-left">
            <AITutorPlayer
              v-if="currentPage"
              ref="aiTutorRef"
              :key="`tutor-${currentPage.id}`"
              :page-id="currentPage.id"
              @block-active="onTutorBlockActive"
              @block-cleared="tutorActiveBlockIndex = null"
              @status-change="tutorStatus = $event"
              @progress="tutorProgress = $event"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <!-- Read Mode - whole screen given over to the book, floating overlay controls replace
             every other piece of chrome. Only for students, who are the ones this is meant to
             help focus - teachers/HOD previewing already have their own editing chrome to worry
             about keeping visible. -->
        <button
          v-if="isStudentMode && currentPage"
          @click="enterReadMode"
          class="flex items-center gap-1.5 px-3 py-1.5 bg-white text-indigo-700 font-medium text-sm rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          <span class="hidden sm:inline">Read</span>
        </button>

        <!-- Zoom controls - scale the whole book area via CSS transform (see the wrapping div
             around BookFlipbook below), so the reader can pan around an enlarged page when the
             base size isn't big enough, without page-flip itself needing any zoom support. -->
        <div v-if="currentPage" class="flex items-center bg-white/10 rounded-lg">
          <button
            @click="zoomOut"
            :disabled="zoomLevel <= MIN_ZOOM"
            class="p-1.5 rounded-lg hover:bg-white/25 transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
            title="Zoom out"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11h6"></path>
            </svg>
          </button>
          <span v-if="zoomLevel > MIN_ZOOM" class="text-xs text-white/90 font-medium px-0.5 min-w-[2.5rem] text-center select-none">{{ Math.round(zoomLevel * 100) }}%</span>
          <button
            @click="zoomIn"
            :disabled="zoomLevel >= MAX_ZOOM"
            class="p-1.5 rounded-lg hover:bg-white/25 transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
            title="Zoom in"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 8v6M8 11h6"></path>
            </svg>
          </button>
        </div>
        <!-- Only matters at lg+ - below that the book already always shows one page at a time
             (no room for two), so this toggle would have nothing to do. -->
        <button
          v-if="currentPage"
          @click="preferSinglePage = !preferSinglePage"
          class="hidden lg:flex p-1.5 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
          :title="preferSinglePage ? 'Switch to two-page view' : 'Switch to single-page view'"
        >
          <svg v-if="preferSinglePage" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="7" y="4" width="10" height="16" rx="1" stroke-width="2"></rect>
          </svg>
          <svg v-else class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="8" height="16" rx="1" stroke-width="2"></rect>
            <rect x="13" y="4" width="8" height="16" rx="1" stroke-width="2"></rect>
          </svg>
        </button>
        <button
          v-if="currentPage"
          @click="isMuted = !isMuted"
          class="p-1.5 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
          :title="isMuted ? 'Unmute page-turn sound' : 'Mute page-turn sound'"
        >
          <svg v-if="isMuted" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M11 5L6 9H2v6h4l5 4V5z"></path>
          </svg>
          <svg v-else class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5L6 9H2v6h4l5 4V5z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.54 8.46a5 5 0 010 7.07M18.36 5.64a9 9 0 010 12.73"></path>
          </svg>
        </button>
        <button
          @click="toggleFullscreen"
          class="p-1.5 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
          title="Toggle Fullscreen"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
          </svg>
        </button>

        <!-- Reading focus overlay picker - a colored tint over the page, common reading-focus aid. -->
        <div v-if="currentPage" class="relative">
          <button
            @click="showTintPanel = !showTintPanel"
            class="p-1.5 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
            title="Reading focus color"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h10a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5"></path>
            </svg>
          </button>
          <div v-if="showTintPanel" @click="showTintPanel = false" class="fixed inset-0 z-40"></div>
          <div
            v-if="showTintPanel"
            class="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 z-50"
          >
            <button
              v-for="tint in READING_TINTS"
              :key="tint.value"
              @click="readingTint = tint.value; showTintPanel = false"
              class="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              :class="readingTint === tint.value ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium' : 'text-gray-700 dark:text-gray-200'"
            >
              <span class="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 flex-shrink-0" :class="tint.swatchClass"></span>
              <span>{{ tint.label }}</span>
            </button>
          </div>
        </div>

        <div v-if="!isReadOnly" class="relative">
          <button
            @click="showVoicePanel = !showVoicePanel"
            class="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 bg-white/10 hover:bg-white/25 text-white font-medium text-sm sm:text-base rounded-lg transition-colors"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-14 0m7 7v3m-3 0h6M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3z"></path>
            </svg>
            <span class="hidden sm:inline">{{ topic?.narration_voice ? `Voice: ${voiceLabel(topic.narration_voice)}` : 'Enable AI Voice' }}</span>
          </button>

          <div v-if="showVoicePanel" @click="showVoicePanel = false" class="fixed inset-0 z-40"></div>

          <div
            v-if="showVoicePanel"
            class="absolute right-0 top-full mt-2 w-80 max-w-[90vw] bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50 text-left"
          >
            <div class="flex items-center justify-between mb-1">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white">AI Voice Narration</h3>
              <button @click="showVoicePanel = false" class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">
              Pick a voice to narrate every page in this topic. Students will hear it once it's generated.
            </p>

            <div class="grid grid-cols-2 gap-2 mb-3">
              <button
                v-for="v in AI_VOICES"
                :key="v.value"
                @click="enableVoice(v.value)"
                :disabled="voiceBusy"
                class="flex flex-col items-start gap-0.5 p-3 rounded-lg border text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :class="topic?.narration_voice === v.value
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                  : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500'"
              >
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ v.label }}</span>
                <span class="text-[11px] text-gray-500 dark:text-gray-400">{{ v.gender }} · {{ v.description }}</span>
              </button>
            </div>

            <div v-if="voiceBusy" class="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400">
              <svg class="w-3.5 h-3.5 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Generating narration ({{ Math.min(voiceProgress.done + 1, voiceProgress.total) }}/{{ voiceProgress.total }})...
            </div>
            <p v-else-if="voiceError" class="text-xs text-red-500">{{ voiceError }}</p>
            <p v-else-if="topic?.narration_voice" class="text-xs text-emerald-600 dark:text-emerald-400">
              Narration ready with {{ voiceLabel(topic.narration_voice) }}'s voice for all pages.
            </p>
          </div>
        </div>

        <button
          v-if="!isReadOnly"
          @click="editTopic"
          class="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 bg-white text-indigo-700 font-medium text-sm sm:text-base rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          <span>Edit</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden relative">
      <!-- Mobile/tablet backdrop for the table-of-contents drawer -->
      <div
        v-if="showToc && !readMode"
        @click="showToc = false"
        class="fixed inset-0 bg-black/50 z-30 lg:hidden"
      ></div>

      <!-- Right Sidebar - Navigation - hidden entirely in Read Mode, both the mobile drawer and
           the desktop-docked version, so the book claims that width too. -->
      <div
        v-if="!readMode"
        class="order-2 fixed lg:static inset-y-0 right-0 z-40 w-56 max-w-[75vw] mt-2 lg:mt-3 lg:mb-3 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 rounded-tl-2xl overflow-hidden flex flex-col transform transition-[transform,width] duration-300 lg:translate-x-0 lg:relative"
        :class="[showToc ? 'translate-x-0' : 'translate-x-full', sidebarCollapsed ? 'lg:!w-14' : 'lg:!w-56']"
      >
        <!-- Desktop-only collapse toggle, so the reader can reclaim the sidebar's width for the
             book without losing it entirely (mobile already has its own overlay drawer). -->
        <button
          @click="sidebarCollapsed = !sidebarCollapsed"
          class="hidden lg:flex absolute top-5 -left-3 z-10 w-6 h-6 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow items-center justify-center text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          :title="sidebarCollapsed ? 'Expand contents' : 'Collapse contents'"
        >
          <svg class="w-3.5 h-3.5 transition-transform" :class="{ 'rotate-180': !sidebarCollapsed }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <!-- Collapsed rail: just enough to show there's more, and to re-expand -->
        <div v-if="sidebarCollapsed" class="hidden lg:flex flex-col items-center pt-6 gap-2 text-gray-400 dark:text-gray-500">
          <span class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{{ progressPercentage }}%</span>
          <span class="text-[10px] tracking-wide" style="writing-mode: vertical-rl;">Contents</span>
        </div>

        <div v-show="!sidebarCollapsed" class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="relative w-10 h-10 flex-shrink-0">
              <svg class="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" stroke-width="3" class="text-gray-200 dark:text-gray-700"></circle>
                <circle
                  cx="18" cy="18" r="15.5" fill="none" stroke="url(#tocProgressGradient)" stroke-width="3" stroke-linecap="round"
                  :stroke-dasharray="`${progressPercentage * 0.974} 200`"
                  class="transition-all duration-500"
                ></circle>
                <defs>
                  <linearGradient id="tocProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#6366f1"></stop>
                    <stop offset="50%" stop-color="#a855f7"></stop>
                    <stop offset="100%" stop-color="#ec4899"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <span class="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-indigo-700 dark:text-indigo-300">{{ progressPercentage }}%</span>
            </div>
            <div>
              <h2 class="font-semibold text-gray-900 dark:text-white leading-tight">Course Contents</h2>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                {{ pages.length }} {{ pages.length === 1 ? 'lesson' : 'lessons' }}
              </div>
            </div>
          </div>
          <button @click="showToc = false" class="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors lg:hidden">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div v-show="!sidebarCollapsed" class="flex-1 overflow-y-auto p-2 space-y-1">
          <div
            v-for="page in pages"
            :key="page.id"
            @click="selectPage(page.id)"
            :class="[
              'flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer transition-colors border-l-4',
              currentPage?.id === page.id
                ? 'bg-indigo-50 dark:bg-indigo-900/40 border-indigo-600 shadow-sm'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 border-transparent'
            ]"
          >
            <span
              v-if="isVisited(page.id) && currentPage?.id !== page.id"
              class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold bg-emerald-500 text-white"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
              </svg>
            </span>
            <span
              v-else
              class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
              :class="currentPage?.id === page.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'"
            >
              {{ page.order_number }}
            </span>
            <p
              class="text-sm font-medium truncate"
              :class="currentPage?.id === page.id ? 'text-indigo-900 dark:text-indigo-100' : 'text-gray-700 dark:text-gray-200'"
            >
              Page {{ page.order_number }}<span v-if="hasMeaningfulTitle(page.title)"> · {{ page.title }}</span>
            </p>
          </div>
        </div>

        <!-- Reading Progress -->
        <div v-show="!sidebarCollapsed" class="p-4 border-t border-gray-200 dark:border-gray-700">
          <div class="mb-2">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600 dark:text-gray-400">Your progress</span>
              <span class="text-gray-900 dark:text-white font-medium">{{ progressPercentage }}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                class="bg-indigo-600 h-2 rounded-full transition-all"
                :style="{ width: `${progressPercentage}%` }"
              ></div>
            </div>
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">
            {{ visitedCount }} of {{ pages.length }} pages read
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 overflow-y-auto flex flex-col" :class="{ 'lg:block': !readMode }">
        <!-- Below `lg` this becomes a flex column filling the full remaining height (no vh
             guessing) so the book claims every pixel between the header and the screen edge -
             at `lg`+ it reverts to plain block flow with its old fixed sizing, where there's
             already room to spare. Read Mode forces the flex-column/fill behavior at every
             breakpoint, on top of the header/sidebar/nav-buttons already being gone entirely. -->
        <div
          class="w-full max-w-5xl xl:max-w-7xl 2xl:max-w-[1800px] mx-auto flex-1 min-h-0 flex flex-col"
          :class="readMode ? 'p-0' : 'p-0 lg:p-4 2xl:p-6 lg:block'"
        >
          <template v-if="currentPage">
            <!-- Read-aloud + AI tutor controls for whichever page is open right now - kept
                 outside the book itself since it's the reader's current position that's live,
                 not a specific page object being turned. -->
            <div v-if="narrationAudioUrl" class="mx-3 mt-2 mb-2 lg:mx-0 lg:mt-0 lg:mb-3 flex-shrink-0">
              <p class="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1.5 flex items-center gap-1">
                <span>🔊</span><span>Read Aloud</span>
              </p>
              <div class="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-14 0m7 7v3m-3 0h6M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3z"></path>
                </svg>
                <audio
                  :key="narrationAudioUrl"
                  :src="narrationAudioUrl"
                  :autoplay="autoplayNarration"
                  controls
                  class="flex-1 h-9"
                  @ended="onNarrationEnded"
                ></audio>
              </div>
            </div>

            <!-- The book: drag a page corner to curl it, like heyzine.com/flip-book. Every page
                 renders up front (StPageFlip needs them all present to turn between), but only
                 the page currently open gets the narration-highlight markup - the rest render as
                 plain formatted content. -->
            <div
              ref="bookWrapRef"
              :class="[
                readMode ? 'flex-1 min-h-0' : 'flex-1 min-h-0 lg:flex-none lg:h-[80vh] lg:min-h-[420px] lg:mb-3',
                zoomLevel > MIN_ZOOM ? 'overflow-auto' : 'overflow-hidden',
              ]"
            >
              <div
                class="w-full h-full transition-transform duration-200"
                :style="{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }"
              >
              <BookFlipbook
                ref="flipbookRef"
                mode="html"
                :page-width="effectivePageWidth"
                :page-height="effectivePageHeight"
                :show-cover="false"
                :muted="isMuted"
                :prefer-single-page="preferSinglePage"
                class="transition-shadow duration-300 hover:drop-shadow-2xl"
                @flip="onBookFlip"
              >
                <template #pages>
                  <div v-for="page in pages" :key="page.id" class="enote-flip-page bg-white dark:bg-gray-800">
                    <div class="h-1.5 bg-indigo-600"></div>
                    <div class="p-5 sm:p-8">
                      <h2 v-if="hasMeaningfulTitle(page.title)" class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {{ page.title }}
                      </h2>
                      <div class="flex flex-wrap items-center gap-3 text-xs mb-5">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-600 text-white font-semibold shadow-sm">
                          Page {{ page.order_number }} of {{ pages.length }}
                        </span>
                        <span class="text-gray-500 dark:text-gray-400">{{ getPageWordCount(page.content) }} words</span>
                        <span class="text-gray-500 dark:text-gray-400">{{ getReadingTime(page.content) }} min read</span>
                      </div>
                      <div class="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                        <template v-if="isStudentMode && page.id === currentPage?.id && contentBlocks.length">
                          <div
                            v-for="(block, i) in contentBlocks"
                            :key="i"
                            :ref="el => block.narrationIndex !== null && setBlockRef(el, block.narrationIndex)"
                            class="ai-tutor-block"
                            :class="{ 'ai-tutor-active': block.narrationIndex !== null && tutorActiveBlockIndex === block.narrationIndex }"
                            v-html="block.html"
                          ></div>
                        </template>
                        <!-- .stop on mousedown/touchstart is the same fix as the summary textarea
                             below: without it, StPageFlip's own drag-to-flip listener on this
                             element's ".stf__block" ancestor calls preventDefault() on every
                             mousedown here, which also blocks the browser's native text-selection
                             drag - meaning a student could never start selecting text to highlight
                             it. Trades away "click/drag directly on the text to flip" (still
                             possible via the page's own margins or the corner-drag/Prev-Next
                             controls) for selection actually working. -->
                        <div
                          v-else
                          :ref="el => setPageContentRef(el, page.id)"
                          @mousedown.stop
                          @touchstart.stop
                          @mouseup="onContentMouseUp(page.id)"
                          @click="onContentClick(page.id, $event)"
                          v-html="formatContent(page.content)"
                        ></div>
                      </div>

                      <!-- Student's own private summary of this page - never seen by the
                           teacher/HOD, just a small space to write what they understood. -->
                      <div v-if="isStudentMode" class="mt-6 pt-4 border-t border-dashed border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-1.5">
                          <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                            <span>📝</span><span>My Summary</span>
                          </p>
                          <span class="text-[11px] text-gray-400 dark:text-gray-500">{{ pageNoteStatus[page.id] === 'saving' ? 'Saving…' : pageNoteStatus[page.id] === 'saved' ? 'Saved' : '' }}</span>
                        </div>
                        <!-- .stop is load-bearing: this textarea lives inside StPageFlip's own
                             ".stf__block" (html mode physically moves page content in there), and
                             StPageFlip attaches a mousedown/touchstart listener on that block for
                             its own drag-to-flip gesture which calls preventDefault() on every
                             target except <a>/<button> - silently blocking the browser's native
                             "focus this textarea" behavior, so nothing typed ever registered. -->
                        <textarea
                          v-model="pageNotes[page.id]"
                          @input="onPageNoteInput(page.id)"
                          @mousedown.stop
                          @touchstart.stop
                          rows="2"
                          maxlength="2000"
                          placeholder="What did you understand from this page? (only you can see this)"
                          class="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </template>
              </BookFlipbook>

              <!-- Reading focus overlay - a plain colored tint over the whole book, toggled from
                   the header, purely visual (no interaction of its own). -->
              <div
                v-if="readingTint !== 'none'"
                class="absolute inset-0 pointer-events-none z-10 mix-blend-multiply"
                :class="READING_TINTS.find(t => t.value === readingTint)?.class"
              ></div>

              <!-- Highlight color picker - appears near a text selection while in student mode. -->
              <div
                v-if="highlightPopup"
                class="fixed z-50 flex items-center gap-1 bg-white dark:bg-gray-800 rounded-full shadow-xl border border-gray-200 dark:border-gray-700 px-2 py-1.5 -translate-x-1/2 -translate-y-[calc(100%+8px)]"
                :style="{ left: `${highlightPopup.x}px`, top: `${highlightPopup.y}px` }"
              >
                <button
                  v-for="color in HIGHLIGHT_COLORS"
                  :key="color"
                  @click="pickHighlightColor(color)"
                  class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 shadow ring-1 ring-black/10 hover:scale-110 transition-transform"
                  :class="HIGHLIGHT_SWATCH_CLASS[color]"
                  :title="`Highlight ${color}`"
                ></button>
              </div>
              </div>
            </div>
          </template>

          <!-- Empty state -->
          <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 mb-6 mx-3 lg:mx-0 flex-shrink-0 text-center">
            <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <p class="text-gray-500 dark:text-gray-400">This topic has no pages yet.</p>
          </div>

          <!-- Navigation Buttons - replaced by floating overlay arrows in Read Mode. -->
          <div v-if="!readMode" class="flex items-center justify-between flex-shrink-0 px-3 pb-3 pt-2 lg:px-0 lg:pb-0 lg:pt-0">
            <button
              @click="handlePrevious"
              :disabled="!hasPreviousPage"
              class="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span>Previous</span>
            </button>

            <button
              v-if="!(isStudentMode && !hasNextPage)"
              @click="handleNext"
              :disabled="!hasNextPage"
              class="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 text-sm sm:text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sm transition-all"
            >
              <span>Next</span>
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            <button
              v-else-if="isStudentMode"
              @click="showCompletion = true"
              class="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 text-sm sm:text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span>Finish Topic</span>
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Read Mode overlay controls - back/next/exit float over the book itself rather than
         taking any layout space of their own, since the whole point is the book gets literally
         the entire screen. Fixed (not absolute) so they stay put regardless of any scrolling
         inside the book area. -->
    <template v-if="readMode">
      <button
        @click="handlePrevious"
        :disabled="!hasPreviousPage"
        class="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 rounded-full bg-gray-900/40 hover:bg-gray-900/60 text-white backdrop-blur-sm shadow-lg transition-colors disabled:opacity-0 disabled:pointer-events-none"
        title="Previous page"
      >
        <svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <button
        v-if="!(isStudentMode && !hasNextPage)"
        @click="handleNext"
        :disabled="!hasNextPage"
        class="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 rounded-full bg-gray-900/40 hover:bg-gray-900/60 text-white backdrop-blur-sm shadow-lg transition-colors disabled:opacity-0 disabled:pointer-events-none"
        title="Next page"
      >
        <svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      <button
        v-else-if="isStudentMode"
        @click="showCompletion = true"
        class="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 flex items-center gap-1.5 pl-3 pr-4 py-3 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white backdrop-blur-sm shadow-lg transition-colors"
        title="Finish topic"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-sm font-medium hidden sm:inline">Finish</span>
      </button>

      <button
        @click="exitReadMode"
        class="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 flex items-center gap-1.5 pl-3 pr-3.5 py-2 rounded-full bg-gray-900/40 hover:bg-gray-900/60 text-white backdrop-blur-sm shadow-lg transition-colors"
        title="Exit Read Mode"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <span class="text-xs font-medium hidden sm:inline">Exit</span>
      </button>
    </template>

    <!-- Completion celebration - shown once the student reaches the end of a topic. -->
    <div
      v-if="isStudentMode && showCompletion && topic"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden text-center">
        <div class="bg-emerald-600 px-6 py-8">
          <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
            <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-white">Topic Complete!</h2>
          <p class="text-emerald-50 text-sm mt-1">{{ topic.title }}</p>
        </div>
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-center gap-6 text-sm">
            <div>
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ pages.length }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ pages.length === 1 ? 'page' : 'pages' }} read</div>
            </div>
            <div class="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
            <div>
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalReadingTime }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">min invested</div>
            </div>
          </div>
          <div class="flex gap-3 pt-2">
            <button
              @click="showCompletion = false"
              class="flex-1 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Review Again
            </button>
            <button
              @click="goBack"
              class="flex-1 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl hover:shadow-md transition-all"
            >
              Back to eNotes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Student "before you start" intro: shown once per topic-open, gates reading behind an
         overview of what the topic covers and what the student should get out of it. -->
    <div
      v-if="isStudentMode && showIntro && topic"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col">
        <div class="bg-indigo-600 px-5 sm:px-6 py-3 sm:py-4 text-center flex-shrink-0">
          <p v-if="topic.subject_name" class="text-indigo-100 text-xs font-semibold uppercase tracking-wide mb-1">{{ topic.subject_name }}</p>
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">{{ topic.title }}</h2>
        </div>

        <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          <div v-if="topic.description">
            <h3 class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Competence
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">You should be able to:</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ topic.description }}</p>
          </div>

          <div v-if="topic.learning_outcomes && topic.learning_outcomes.length">
            <h3 class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
              </svg>
              Learning Outcomes
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">By the end, you'll be able to:</p>
            <ul class="space-y-2">
              <li
                v-for="(outcome, i) in topic.learning_outcomes"
                :key="i"
                class="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300"
              >
                <span class="mt-0.5 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                  {{ i + 1 }}
                </span>
                <span class="pt-px">{{ outcome }}</span>
              </li>
            </ul>
          </div>

          <p
            v-if="!topic.description && !(topic.learning_outcomes && topic.learning_outcomes.length)"
            class="text-sm text-gray-500 dark:text-gray-400 text-center py-4"
          >
            {{ topic.total_pages }} page{{ topic.total_pages === 1 ? '' : 's' }} &middot; Ready when you are.
          </p>
        </div>

        <div class="p-5 sm:p-6 pt-2 flex-shrink-0">
          <button
            @click="showIntro = false"
            class="w-full py-2.5 sm:py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <span>Start Reading</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import type { ENoteTopic, ENotePage } from '@/types/enotes'
import { AI_VOICES } from '@/types/enotes'
import { autoEmbedYoutube, resolveContentAssetUrls, splitContentBlocks } from '@/utils/richContent'
import { resolveAssetUrl } from '@/utils/url'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { useReadModeStore } from '@/stores/readMode'
import { applyHighlights, rangeToOffsets, removeHighlightMark, type StoredHighlight } from '@/utils/textHighlight'
import AITutorPlayer from '@/components/enotes/AITutorPlayer.vue'
import BookFlipbook from '@/components/common/BookFlipbook.vue'

const router = useRouter()
const route = useRoute()

const API_BASE = '/api'

const topicId = computed(() => parseInt(route.params.id as string))

// This one component serves three modes, all via route meta so the URL alone determines
// behavior: (1) a teacher viewing their own topic (default, editable), (2) staff "Preview as
// Student" for any published topic in the department (previewRole meta, read-only), and (3) a
// real student actually reading a topic they're enrolled for (studentMode meta, read-only, hits
// the real gated student endpoint rather than a staff preview one).
const previewRole = computed(() => route.meta.previewRole as string | undefined)
const isPreviewMode = computed(() => !!previewRole.value)
const isStudentMode = computed(() => route.meta.studentMode === true)
const isReadOnly = computed(() => isPreviewMode.value || isStudentMode.value)

const topic = ref<ENoteTopic | null>(null)
const pages = ref<ENotePage[]>([])
const currentPage = ref<ENotePage | null>(null)
const isFullscreen = ref(false)
const showToc = ref(false)
// Desktop-only, session-scoped (not persisted) - a reader who collapses the contents rail to
// give the book more room shouldn't come back to a topic later and find an empty-looking sidebar.
const sidebarCollapsed = ref(false)
// Shared with the eLibrary flipbook too - muting the page-turn sound in one place should mean it
// stays muted everywhere, since it's a preference about the sound itself, not this one topic.
const isMuted = usePersistedRef('espace:flipbook-muted', false)
// Shared with the eLibrary flipbook and read directly by BookFlipbook.vue itself (same key) -
// this button just gives the reader a visible way to flip it, on top of whatever screen size
// already forces.
const preferSinglePage = usePersistedRef('espace:flipbook-single-page-preferred', false)
const showIntro = ref(false)
const showCompletion = ref(false)
const flipbookRef = ref<InstanceType<typeof BookFlipbook> | null>(null)

// Zoom: a plain CSS transform on the wrapper around BookFlipbook (see the template) - StPageFlip
// itself has no notion of zoom, so this scales the whole rendered book visually and lets the
// wrapper's own scroll (enabled once zoomed past 1x) pan around the enlarged result, rather than
// needing any cooperation from the flip engine.
const MIN_ZOOM = 1
const MAX_ZOOM = 2.5
const ZOOM_STEP = 0.25
const zoomLevel = ref(MIN_ZOOM)
const zoomIn = () => { zoomLevel.value = Math.min(MAX_ZOOM, Math.round((zoomLevel.value + ZOOM_STEP) * 100) / 100) }
const zoomOut = () => { zoomLevel.value = Math.max(MIN_ZOOM, Math.round((zoomLevel.value - ZOOM_STEP) * 100) / 100) }

// The book's own fixed 700x900 "notebook page" aspect ratio doesn't match whatever screen/window
// shape it's actually being read in, so StPageFlip's aspect-preserving "stretch" sizing was
// leaving real letterbox gaps around the page even though the *container* itself already fills
// the available space correctly - eLibrary never has this problem since its page ratio always
// comes from the real rendered PDF page, never a fixed guess. Matching eNotes' book to its own
// container's actual aspect ratio (StPageFlip derives page height from our width:height ratio,
// so feeding it a ratio that already matches the container makes the computed height land
// exactly on the container's height too) closes the gap outright, in every mode - single-page
// (mobile, or the desktop manual toggle) and desktop's natural two-page spread alike.
const MOBILE_QUERY = '(max-width: 1023px)'
const mq = typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY) : null
const isMobileForAspect = ref(mq?.matches ?? false)
const bookWrapRef = ref<HTMLElement | null>(null)
const dynamicPageWidth = ref(700)
const dynamicPageHeight = ref(900)
let bookWrapResizeObserver: ResizeObserver | null = null

// Below this, treat a measurement as a transient/bogus one (e.g. mid-layout-transition, such as
// the moment Read Mode's classes are still being applied) rather than a real container size -
// BookFlipbook rebuilds the whole book on a pageWidth/pageHeight change, so feeding it a
// momentarily-tiny value would tear it down for no real reason instead of just skipping a stale
// measurement and waiting for a real one.
const MIN_PLAUSIBLE_CONTAINER_SIZE = 50

const updateDynamicAspect = () => {
  const el = bookWrapRef.value
  if (!el || el.clientWidth < MIN_PLAUSIBLE_CONTAINER_SIZE || el.clientHeight < MIN_PLAUSIBLE_CONTAINER_SIZE) return
  dynamicPageWidth.value = el.clientWidth
  dynamicPageHeight.value = el.clientHeight
}

// BookFlipbook caps its own container width to 560px specifically for the desktop manual
// single-page toggle (its capWidthForToggle) - matching that here keeps the ratio in sync with
// what it actually renders at, rather than computing against bookWrapRef's uncapped full width.
const MANUAL_SINGLE_PAGE_CAP = 560
// Mirrors StPageFlip's own portrait/landscape threshold (blockWidth < minWidth(300)*2) directly,
// rather than our own separate `lg` breakpoint, so this never disagrees with which mode it
// actually picks - in landscape/two-page mode it halves the container width per page, same as
// StPageFlip itself does.
const AUTO_PORTRAIT_THRESHOLD = 600

const effectivePageWidth = computed(() => {
  const containerWidth = dynamicPageWidth.value
  if (preferSinglePage.value && !isMobileForAspect.value) {
    return Math.min(containerWidth, MANUAL_SINGLE_PAGE_CAP)
  }
  return containerWidth < AUTO_PORTRAIT_THRESHOLD ? containerWidth : containerWidth / 2
})
const effectivePageHeight = computed(() => dynamicPageHeight.value)

// Reading focus overlay - a plain colored tint over the whole book, purely a personal display
// preference (like `isMuted`), not content, so it's a localStorage preference rather than
// anything saved server-side.
const showTintPanel = ref(false)
const readingTint = usePersistedRef('espace:reading-tint', 'none')
const READING_TINTS = [
  { value: 'none', label: 'None', class: '', swatchClass: 'bg-white dark:bg-gray-800' },
  { value: 'sepia', label: 'Sepia', class: 'bg-amber-700/10', swatchClass: 'bg-amber-200' },
  { value: 'blue', label: 'Cool Blue', class: 'bg-blue-500/10', swatchClass: 'bg-blue-200' },
  { value: 'green', label: 'Soft Green', class: 'bg-emerald-500/10', swatchClass: 'bg-emerald-200' },
  { value: 'rose', label: 'Warm Rose', class: 'bg-rose-500/10', swatchClass: 'bg-rose-200' },
]

// Student's own private per-page summary ("what I understood from this page") - loaded/saved via
// PageNoteController, never visible to the teacher/HOD.
const pageNotes = ref<Record<number, string>>({})
const pageNoteStatus = ref<Record<number, 'idle' | 'saving' | 'saved'>>({})
const noteSaveTimers: Record<number, ReturnType<typeof setTimeout>> = {}

const onPageNoteInput = (pageId: number) => {
  pageNoteStatus.value[pageId] = 'saving'
  clearTimeout(noteSaveTimers[pageId])
  noteSaveTimers[pageId] = setTimeout(async () => {
    try {
      await axios.put(`${API_BASE}/student/enotes/pages/${pageId}/note`, { content: pageNotes.value[pageId] || '' })
      pageNoteStatus.value[pageId] = 'saved'
    } catch {
      pageNoteStatus.value[pageId] = 'idle'
    }
  }, 800)
}

// Student's own private text highlights - stored as plain-text offsets (see textHighlight.ts),
// applied imperatively onto each page's rendered content once both the DOM element and the
// stored highlights for that page are available.
const HIGHLIGHT_COLORS = ['yellow', 'green', 'blue', 'pink'] as const
const HIGHLIGHT_SWATCH_CLASS: Record<string, string> = {
  yellow: 'bg-yellow-300', green: 'bg-emerald-300', blue: 'bg-sky-300', pink: 'bg-pink-300',
}
const pageHighlights = ref<Record<number, StoredHighlight[]>>({})
const pageContentRefs: Record<number, HTMLElement> = {}
const highlightPopup = ref<{ pageId: number; x: number; y: number; range: Range } | null>(null)

const setPageContentRef = (el: Element | { $el?: Element } | null, pageId: number) => {
  const node = el && '$el' in el ? el.$el : el
  if (node instanceof HTMLElement) {
    pageContentRefs[pageId] = node
    const highlights = pageHighlights.value[pageId]
    if (highlights?.length) applyHighlights(node, highlights)
  }
}

const onContentMouseUp = (pageId: number) => {
  if (!isStudentMode.value) return
  const selection = window.getSelection()
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
    highlightPopup.value = null
    return
  }
  const range = selection.getRangeAt(0)
  const container = pageContentRefs[pageId]
  if (!container || !container.contains(range.commonAncestorContainer)) return
  const rect = range.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) return
  highlightPopup.value = { pageId, x: rect.left + rect.width / 2, y: rect.top, range: range.cloneRange() }
}

const pickHighlightColor = async (color: string) => {
  if (!highlightPopup.value) return
  const { pageId, range } = highlightPopup.value
  const container = pageContentRefs[pageId]
  highlightPopup.value = null
  window.getSelection()?.removeAllRanges()
  if (!container) return
  const offsets = rangeToOffsets(container, range)
  if (!offsets) return
  try {
    const response = await axios.post(`${API_BASE}/student/enotes/pages/${pageId}/highlights`, {
      start_offset: offsets.start,
      end_offset: offsets.end,
      color,
    })
    if (response.data.success) {
      const newHighlight: StoredHighlight = { id: response.data.data.id, start_offset: offsets.start, end_offset: offsets.end, color }
      pageHighlights.value[pageId] = [...(pageHighlights.value[pageId] || []), newHighlight]
      applyHighlights(container, [newHighlight])
    }
  } catch {
    // best-effort - losing one highlight isn't worth surfacing an error over
  }
}

const onContentClick = async (pageId: number, event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.classList?.contains('student-highlight')) return
  const highlightId = Number(target.dataset.highlightId)
  if (!highlightId) return
  const container = pageContentRefs[pageId]
  try {
    await axios.delete(`${API_BASE}/student/enotes/highlights/${highlightId}`)
  } catch {
    return
  }
  pageHighlights.value[pageId] = (pageHighlights.value[pageId] || []).filter(h => h.id !== highlightId)
  if (container) removeHighlightMark(container, highlightId)
}

// Loaded once per topic open (student mode only) - a handful of small requests per page rather
// than a bulk endpoint, since eNote topics are typically well under 20 pages.
const loadStudentPageData = async () => {
  await Promise.all(pages.value.map(async (page) => {
    try {
      const [noteRes, highlightRes] = await Promise.all([
        axios.get(`${API_BASE}/student/enotes/pages/${page.id}/note`),
        axios.get(`${API_BASE}/student/enotes/pages/${page.id}/highlights`),
      ])
      if (noteRes.data.success) pageNotes.value[page.id] = noteRes.data.data.content || ''
      if (highlightRes.data.success) {
        pageHighlights.value[page.id] = highlightRes.data.data.highlights || []
        const el = pageContentRefs[page.id]
        if (el) applyHighlights(el, pageHighlights.value[page.id])
      }
    } catch {
      // best-effort - a student can still read the page without their notes/highlights loading
    }
  }))
}

// Which pages the reader has actually opened this session - drives the ToC checkmarks and a
// progress bar that reflects real coverage rather than just "how far is the current page."
const visitedPageIds = ref(new Set<number>())
const isVisited = (pageId: number) => visitedPageIds.value.has(pageId)

const hasPreviousPage = computed(() => {
  if (!currentPage.value) return false
  const currentIndex = pages.value.findIndex(p => p.id === currentPage.value!.id)
  return currentIndex > 0
})

const hasNextPage = computed(() => {
  if (!currentPage.value) return false
  const currentIndex = pages.value.findIndex(p => p.id === currentPage.value!.id)
  return currentIndex < pages.value.length - 1
})

const visitedCount = computed(() => pages.value.filter(p => visitedPageIds.value.has(p.id)).length)

const progressPercentage = computed(() => {
  if (pages.value.length === 0) return 0
  return Math.round((visitedCount.value / pages.value.length) * 100)
})

const totalReadingTime = computed(() => pages.value.reduce((sum, p) => sum + getReadingTime(p.content), 0))

// Student/staff-preview responses carry a single resolved narration_audio_path per page (for
// the topic's currently selected voice); the teacher's own authoring response instead carries
// every cached voice's narration per page, so resolve against whichever voice the topic has
// selected.
const narrationAudioUrl = computed(() => {
  if (!currentPage.value) return null
  const page = currentPage.value as ENotePage & { narration_audio_path?: string | null }
  if (isStudentMode.value || isPreviewMode.value) {
    return resolveAssetUrl(page.narration_audio_path) || null
  }
  const voice = topic.value?.narration_voice
  if (!voice) return null
  return resolveAssetUrl(page.narrations?.find(n => n.voice === voice)?.audio_path) || null
})

const showVoicePanel = ref(false)
const voiceBusy = ref(false)
const voiceError = ref('')
const voiceProgress = ref({ done: 0, total: 0 })

const voiceLabel = (value: string) => AI_VOICES.find(v => v.value === value)?.label || value

// "Enabling" a voice sets it as the topic's narration voice, then generates (or reuses cached,
// non-stale) narration for every page in one go - so by the time a student opens the topic,
// every page already has narration ready rather than only the pages the teacher happened to
// visit individually in the builder.
const enableVoice = async (voice: string) => {
  if (voiceBusy.value) return
  voiceError.value = ''
  voiceBusy.value = true
  voiceProgress.value = { done: 0, total: pages.value.length }
  try {
    await axios.put(`${API_BASE}/teacher/enotes/topics/${topicId.value}/narration-voice`, { voice })
    if (topic.value) topic.value.narration_voice = voice

    for (const page of pages.value) {
      const cached = page.narrations?.find(n => n.voice === voice)
      if (!cached || cached.is_stale) {
        const response = await axios.post(`${API_BASE}/teacher/enotes/pages/${page.id}/narration`, { voice })
        if (response.data.success) {
          const narrations = (page.narrations || []).filter(n => n.voice !== voice)
          page.narrations = [...narrations, response.data.data]
        }
      }
      voiceProgress.value.done++
    }
    showVoicePanel.value = false
  } catch (err: any) {
    voiceError.value = err.response?.data?.message || 'Failed to generate narration'
  } finally {
    voiceBusy.value = false
  }
}

const loadTopic = async () => {
  try {
    let url: string
    let config: { params: Record<string, unknown> } | undefined
    if (isStudentMode.value) {
      url = `${API_BASE}/student/enotes/topics/${topicId.value}`
      config = undefined
    } else if (isPreviewMode.value && route.params.classId) {
      // "Preview as student" for a specific class - published topics from any teacher in the
      // department, scoped to that class.
      url = `${API_BASE}/${previewRole.value}/enotes/preview/topics/${topicId.value}`
      config = { params: { class_id: route.params.classId } }
    } else if (isPreviewMode.value) {
      // HOD/admin browsing one teacher's topic directly (no class_id) - any status, not just
      // published, since this is oversight rather than a student-facing preview.
      url = `${API_BASE}/${previewRole.value}/enotes/${topicId.value}`
      config = undefined
    } else {
      url = `${API_BASE}/teacher/enotes/topics/${topicId.value}`
      config = undefined
    }
    const response = await axios.get(url, config)
    if (response.data.success) {
      topic.value = response.data.data
      pages.value = response.data.data.pages || []

      if (pages.value.length > 0) {
        currentPage.value = pages.value[0]
      }

      if (isStudentMode.value) {
        showIntro.value = true
        loadStudentPageData()
      }
    }
  } catch (error) {
    console.error('Failed to load topic:', error)
  }
}

const selectPage = (pageId: number) => {
  autoplayNarration.value = false
  const index = pages.value.findIndex(p => p.id === pageId)
  if (index === -1) return
  currentPage.value = pages.value[index]
  flipbookRef.value?.turnToPage(index)
  showToc.value = false
}

// Fired by the book itself once a turn completes (StPageFlip is 0-indexed) - this is the single
// source of truth for "which page is current" now, whichever triggered the turn (buttons, ToC,
// or the reader just dragging a corner directly).
const onBookFlip = (index: number) => {
  currentPage.value = pages.value[index] ?? null
}

// Whether the *next* page's Read Aloud audio should autoplay the instant it mounts - only true
// when we're auto-advancing because the current page's narration just finished (see
// onNarrationEnded below), never on manual navigation, so pressing Next/Previous or picking a
// page from the contents list never triggers an unexpected autoplay.
const autoplayNarration = ref(false)

const onNarrationEnded = () => {
  if (hasNextPage.value) {
    autoplayNarration.value = true
    flipbookRef.value?.flipNext({ silent: true }) // auto-advance, not a reader gesture - no flip sound
  } else if (isStudentMode.value) {
    showCompletion.value = true
  }
}

const handlePrevious = () => {
  autoplayNarration.value = false
  if (!hasPreviousPage.value) return
  flipbookRef.value?.flipPrev()
}

const handleNext = () => {
  autoplayNarration.value = false
  if (!hasNextPage.value) return
  flipbookRef.value?.flipNext()
}

const formatContent = (content: string): string => {
  if (!content) return ''

  // YouTube: handles the CKEditor <oembed> placeholder (any URL form, including youtu.be short
  // links - the previous hand-rolled regex here only matched youtube.com/watch?v= and silently
  // left youtu.be oembeds unrendered), plain <a> links, and bare pasted URLs.
  let formatted = autoEmbedYoutube(content)

  // Vimeo only ever appears as an oembed placeholder from the media-embed tool.
  formatted = formatted.replace(
    /<oembed url="https:\/\/vimeo\.com\/(\d+)"><\/oembed>/gi,
    '<iframe width="560" height="315" src="https://player.vimeo.com/video/$1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>'
  )

  // Safety net for images/GIFs saved before the upload adapter baked the /eSpace/ base path into
  // the src itself - see resolveContentAssetUrls().
  formatted = resolveContentAssetUrls(formatted)

  // BookFlipbook's html mode mounts every page's content into the DOM at once (so the reader can
  // flip between pages instantly), not just the current one - without this, the browser eagerly
  // fetches every image on every page in the topic the moment it opens, not just the page being
  // read. loading="lazy" defers a page's images until the reader actually flips near it; the
  // negative lookahead skips any <img> that already specifies its own loading behavior.
  formatted = formatted.replace(/<img(?:(?!loading=)[^>])*>/gi, (tag) =>
    tag.replace(/\s*\/?>$/, ' loading="lazy" decoding="async"$&')
  )

  return formatted
}

// AI Tutor walkthrough: the content is split into the same "paragraph" blocks the backend
// generated narration for (see richContent.ts::splitContentBlocks, which mirrors
// HtmlBlockSplitter::split() on the backend), rendered as individually highlightable elements
// instead of one big v-html blob, so the currently-narrated paragraph can be visually marked.
const contentBlocks = computed(() => {
  if (!isStudentMode.value || !currentPage.value) return []
  return splitContentBlocks(formatContent(currentPage.value.content))
})

const tutorActiveBlockIndex = ref<number | null>(null)
const blockEls = ref<Record<number, HTMLElement | null>>({})
const aiTutorRef = ref<InstanceType<typeof AITutorPlayer> | null>(null)
const tutorStatus = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
const tutorProgress = ref<{ current: number; total: number }>({ current: 0, total: 0 })
const showTutorPanel = ref(false)

const onTutorHeaderClick = () => {
  showTutorPanel.value = !showTutorPanel.value
  if (showTutorPanel.value && tutorStatus.value === 'idle') {
    aiTutorRef.value?.start()
  }
}

const setBlockRef = (el: unknown, i: number) => {
  blockEls.value[i] = (el as HTMLElement) || null
}

const onTutorBlockActive = (paragraphIndex: number) => {
  tutorActiveBlockIndex.value = paragraphIndex
  const el = blockEls.value[paragraphIndex]
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

// Untitled pages default to a generic placeholder ("Page", "New Page", ...) - showing it next
// to "Page N" is redundant, so only surface titles the teacher actually customized.
const GENERIC_PAGE_TITLES = ['page', 'new page']
const hasMeaningfulTitle = (title: string): boolean => {
  if (!title) return false
  const normalized = title.trim().toLowerCase().replace(/\s*\(copy\)$/, '')
  return !GENERIC_PAGE_TITLES.includes(normalized)
}

const getPageWordCount = (content: string): number => {
  if (!content) return 0
  return content.trim().split(/\s+/).filter(word => word.length > 0).length
}

const getReadingTime = (content: string): number => {
  const wordCount = getPageWordCount(content)
  return Math.ceil(wordCount / 200)
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value

  if (isFullscreen.value) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// Read Mode: the whole screen becomes the book - header, TOC sidebar and the nav-button row all
// disappear (see the template's `v-if="!readMode"` / `:class="readMode ? ..."` bindings), replaced
// by floating overlay arrows. Also requests real browser fullscreen as a bonus (reclaims the
// browser's own chrome too, mainly useful on desktop) - best-effort, since some mobile browsers
// don't support requestFullscreen() reliably, and Read Mode's own layout already maximizes the
// book regardless of whether that succeeds.
const readMode = ref(false)
const readModeStore = useReadModeStore()

const enterReadMode = () => {
  readMode.value = true
  readModeStore.enter()
  document.documentElement.requestFullscreen?.().catch(() => {})
}

const exitReadMode = () => {
  readMode.value = false
  readModeStore.exit()
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {})
  }
}

// A student can also leave real fullscreen directly (Esc, swipe-down on mobile, browser UI)
// without touching our own Exit button - Read Mode should still end when that happens rather than
// leaving the overlay controls stranded with the browser's own chrome back.
const onFullscreenChange = () => {
  if (!document.fullscreenElement && readMode.value) {
    readMode.value = false
  }
}

const onReadModeKeydown = (e: KeyboardEvent) => {
  if (!readMode.value) return
  if (e.key === 'Escape') exitReadMode()
  else if (e.key === 'ArrowLeft') handlePrevious()
  else if (e.key === 'ArrowRight') handleNext()
}

// Header hide-on-scroll: mirrors MainLayout.vue's own app-shell header, but there's no single
// page-level scroll here to listen to - each open page (`.enote-flip-page`) scrolls internally
// when its content runs long (see the "overflow-y: auto" rule in this file's <style>), and native
// `scroll` events don't bubble, so this listens in the capture phase on `document` (same trick
// already used for `hideBrokenImages` below) rather than needing a handler wired to every page.
const HEADER_SHOW_THRESHOLD_PX = 80
const headerHidden = ref(false)
let lastPageScrollTop = 0
let lastPageScrollTarget: EventTarget | null = null

const handlePageScroll = (e: Event) => {
  const target = e.target as HTMLElement
  if (!target.classList?.contains('enote-flip-page')) return

  const currentTop = target.scrollTop
  // Just started scrolling a *different* page (e.g. right after a flip) - its scrollTop resets
  // to near 0 regardless of where the reader left off on the last one, which would otherwise
  // read as a big upward jump and force the header back open on every single page turn.
  if (target !== lastPageScrollTarget) {
    lastPageScrollTarget = target
    lastPageScrollTop = currentTop
    return
  }

  if (currentTop < HEADER_SHOW_THRESHOLD_PX) {
    headerHidden.value = false
  } else if (currentTop > lastPageScrollTop) {
    headerHidden.value = true
  } else if (currentTop < lastPageScrollTop) {
    headerHidden.value = false
  }
  lastPageScrollTop = currentTop
}

const editTopic = () => {
  router.push(`/teacher/enotes/builder/${topicId.value}`)
}

const goBack = () => {
  if (isStudentMode.value) {
    router.push('/student/enotes')
    return
  }
  if (isPreviewMode.value && route.params.classId) {
    router.push(`/teacher/preview/enotes/${route.params.classId}`)
    return
  }
  if (isPreviewMode.value) {
    router.push(`/${previewRole.value}/enotes`)
    return
  }
  router.push('/teacher/enotes')
}

// Content sometimes contains <img> tags with a missing/deleted source - hide those instead of
// showing the browser's broken-image icon. 'error' doesn't bubble, so this must be a
// capture-phase listener.
const hideBrokenImages = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    e.target.style.display = 'none'
  }
}

watch(currentPage, (page) => {
  if (page) visitedPageIds.value.add(page.id)
  showTutorPanel.value = false
}, { immediate: true })

// bookWrapRef only exists once currentPage is set (it's inside `v-if="currentPage"`), which
// happens asynchronously once loadTopic()'s request resolves - watching the ref itself (rather
// than trying to attach in onMounted, before it exists) catches it whenever that actually happens.
watch(bookWrapRef, (el) => {
  bookWrapResizeObserver?.disconnect()
  bookWrapResizeObserver = null
  if (!el) return
  updateDynamicAspect()
  bookWrapResizeObserver = new ResizeObserver(updateDynamicAspect)
  bookWrapResizeObserver.observe(el)
})

const handleAspectMqChange = (e: MediaQueryListEvent) => { isMobileForAspect.value = e.matches }

onMounted(() => {
  loadTopic()
  // All pages render into the book at once now (not just the current one), so this listens
  // document-wide rather than watching a single "current page" content element.
  document.addEventListener('error', hideBrokenImages, true)
  document.addEventListener('fullscreenchange', onFullscreenChange)
  document.addEventListener('keydown', onReadModeKeydown)
  document.addEventListener('scroll', handlePageScroll, true)
  mq?.addEventListener('change', handleAspectMqChange)
})

onBeforeUnmount(() => {
  document.removeEventListener('error', hideBrokenImages, true)
  document.removeEventListener('fullscreenchange', onFullscreenChange)
  document.removeEventListener('keydown', onReadModeKeydown)
  document.removeEventListener('scroll', handlePageScroll, true)
  mq?.removeEventListener('change', handleAspectMqChange)
  bookWrapResizeObserver?.disconnect()
  // Safety net for navigating away without pressing Exit (back button, a TOC/search jump, ...) -
  // otherwise the app shell's chrome would stay hidden on whatever page the reader lands on next.
  readModeStore.exit()
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {})
  }
})
</script>

<style scoped>
/* StPageFlip forces each page to its own fixed pixel box (like a real page) via inline styles -
   this fills that box and scrolls internally for a page whose content runs long, rather than
   trying to grow the page itself. */
.enote-flip-page {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}

.prose {
  line-height: 1.8;
  text-align: justify;
}

.prose :deep(p) {
  margin-bottom: 1em;
  text-align: justify;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4),
.prose :deep(h5),
.prose :deep(h6) {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
  color: #1f2937;
}

.dark .prose :deep(h1),
.dark .prose :deep(h2),
.dark .prose :deep(h3),
.dark .prose :deep(h4),
.dark .prose :deep(h5),
.dark .prose :deep(h6) {
  color: #f9fafb;
}

.prose :deep(ul),
.prose :deep(ol) {
  margin-bottom: 1em;
  padding-left: 1.5em;
}

.prose :deep(li) {
  margin-bottom: 0.25em;
}

.prose :deep(blockquote) {
  border-left: 4px solid #6366f1;
  padding-left: 1em;
  margin: 1em 0;
  color: #6b7280;
  font-style: italic;
}

.dark .prose :deep(blockquote) {
  color: #9ca3af;
}

.prose :deep(code) {
  background: #f3f4f6;
  padding: 0.125em 0.25em;
  border-radius: 0.25em;
  font-size: 0.875em;
  color: #1f2937;
}

.dark .prose :deep(code) {
  background: #374151;
  color: #f9fafb;
}

.prose :deep(pre) {
  background: #1f2937;
  color: #f9fafb;
  padding: 1em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin: 1em 0;
}

.prose :deep(pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
}

.prose :deep(figure) {
  margin: 0;
}

.prose :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.prose :deep(th),
.prose :deep(td) {
  border: 1px solid #e5e7eb;
  padding: 0.5em 0.75em;
  text-align: left;
  vertical-align: top;
}

.dark .prose :deep(th),
.dark .prose :deep(td) {
  border-color: #4b5563;
}

.prose :deep(th) {
  background: #f9fafb;
  font-weight: 600;
}

.dark .prose :deep(th) {
  background: #374151;
}

.prose :deep(th p),
.prose :deep(td p) {
  margin-bottom: 0;
  text-align: left;
}

.prose :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1em 0;
}

.prose :deep(video.enote-video) {
  max-width: 100%;
  border-radius: 8px;
  margin: 1em 0;
  background: #000;
}

.prose :deep(iframe) {
  max-width: 100%;
  border-radius: 8px;
  margin: 1em 0;
}

.prose :deep(.yt-embed) {
  display: block;
  position: relative;
  width: 100%;
  max-width: 640px;
  aspect-ratio: 16 / 9;
  margin: 1em 0;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
}

.prose :deep(.yt-embed iframe) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  margin: 0;
}

/* AI Tutor walkthrough: a soft highlighter glow plus a dashed underline that "draws" itself
   left-to-right as the paragraph is narrated, like a pen following along. */
.ai-tutor-block {
  position: relative;
  border-radius: 8px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.ai-tutor-active {
  background-color: rgba(250, 204, 21, 0.16);
  box-shadow: 0 0 0 4px rgba(250, 204, 21, 0.16);
}

.dark .ai-tutor-active {
  background-color: rgba(250, 204, 21, 0.09);
  box-shadow: 0 0 0 4px rgba(250, 204, 21, 0.09);
}

/* Student highlight marks are added imperatively (see textHighlight.ts) directly onto the
   v-html-rendered content, so they need :deep() the same way the rest of .prose's typography
   does - Vue's scoped-style attribute never reaches elements created outside the template. */
.prose :deep(mark.student-highlight) {
  padding: 0 1px;
  border-radius: 2px;
  cursor: pointer;
  background-image: none;
}
.prose :deep(mark.student-highlight-yellow) { background-color: rgba(250, 204, 21, 0.45); }
.prose :deep(mark.student-highlight-green) { background-color: rgba(52, 211, 153, 0.4); }
.prose :deep(mark.student-highlight-blue) { background-color: rgba(56, 189, 248, 0.4); }
.prose :deep(mark.student-highlight-pink) { background-color: rgba(244, 114, 182, 0.4); }

.ai-tutor-active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 0%;
  height: 3px;
  background-image: linear-gradient(to right, #f59e0b 60%, transparent 40%);
  background-size: 12px 3px;
  background-repeat: repeat-x;
  animation: aiTutorDraw 3.5s ease-out forwards;
}

@keyframes aiTutorDraw {
  from { width: 0%; }
  to { width: 100%; }
}
</style>
