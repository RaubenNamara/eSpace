<template>
  <div class="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="relative bg-gradient-to-r from-indigo-600 to-purple-600 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 flex-shrink-0 shadow-sm">
      <div class="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          @click="goBack"
          class="p-2 rounded-lg bg-white/10 hover:bg-white/25 transition-colors flex-shrink-0"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <!-- Table of contents toggle - sidebar is an overlay below lg -->
        <button
          @click="showToc = !showToc"
          class="p-2 rounded-lg bg-white/10 hover:bg-white/25 transition-colors flex-shrink-0 lg:hidden"
          title="Table of contents"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div class="hidden sm:flex w-10 h-10 rounded-xl bg-white/15 items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <div class="min-w-0">
          <h1 class="text-base sm:text-xl font-bold text-white truncate leading-tight">{{ topic?.title }}</h1>
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
      </div>

      <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <button
          @click="toggleFullscreen"
          class="p-2 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
          title="Toggle Fullscreen"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
          </svg>
        </button>

        <div v-if="!isReadOnly" class="relative">
          <button
            @click="showVoicePanel = !showVoicePanel"
            class="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/25 text-white font-medium text-sm sm:text-base rounded-lg transition-colors"
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
          class="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-white text-indigo-700 font-medium text-sm sm:text-base rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
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
        v-if="showToc"
        @click="showToc = false"
        class="fixed inset-0 bg-black/50 z-30 lg:hidden"
      ></div>

      <!-- Left Sidebar - Navigation -->
      <div
        class="fixed lg:static inset-y-0 left-0 z-40 w-72 max-w-[85vw] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transform transition-transform duration-300 lg:translate-x-0"
        :class="showToc ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
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

        <div class="flex-1 overflow-y-auto p-2 space-y-1">
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
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
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
        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
          <div class="mb-2">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600 dark:text-gray-400">Your progress</span>
              <span class="text-gray-900 dark:text-white font-medium">{{ progressPercentage }}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2 rounded-full transition-all"
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
      <div class="flex-1 overflow-y-auto">
        <div class="w-full max-w-4xl xl:max-w-6xl 2xl:max-w-[1600px] mx-auto p-4 sm:p-8 2xl:p-12">
          <!-- Page Content -->
          <div v-if="currentPage" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div class="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div class="p-5 sm:p-8">
              <div class="mb-6">
                <h2 v-if="hasMeaningfulTitle(currentPage.title)" class="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {{ currentPage.title }}
                </h2>
                <div class="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-sm">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    Page {{ currentPage.order_number }} of {{ pages.length }}
                  </span>
                  <span class="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
                    </svg>
                    {{ getPageWordCount(currentPage.content) }} words
                  </span>
                  <span class="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {{ getReadingTime(currentPage.content) }} min read
                  </span>
                </div>
              </div>

              <div v-if="narrationAudioUrl" class="mb-6">
                <p class="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1.5 flex items-center gap-1">
                  <span>🔊</span><span>Read Aloud</span>
                </p>
                <div class="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                  <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-14 0m7 7v3m-3 0h6M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3z"></path>
                  </svg>
                  <audio :key="narrationAudioUrl" :src="narrationAudioUrl" controls class="flex-1 h-9"></audio>
                </div>
              </div>

              <AITutorPlayer
                v-if="isStudentMode && currentPage"
                :key="`tutor-${currentPage.id}`"
                :page-id="currentPage.id"
                @block-active="onTutorBlockActive"
                @block-cleared="tutorActiveBlockIndex = null"
              />

              <div ref="contentRef" class="prose prose-sm sm:prose-lg dark:prose-invert max-w-none">
                <template v-if="isStudentMode && contentBlocks.length">
                  <div
                    v-for="(block, i) in contentBlocks"
                    :key="i"
                    :ref="el => block.narrationIndex !== null && setBlockRef(el, block.narrationIndex)"
                    class="ai-tutor-block"
                    :class="{ 'ai-tutor-active': block.narrationIndex !== null && tutorActiveBlockIndex === block.narrationIndex }"
                    v-html="block.html"
                  ></div>
                </template>
                <div v-else v-html="formatContent(currentPage.content)"></div>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 mb-6 text-center">
            <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <p class="text-gray-500 dark:text-gray-400">This topic has no pages yet.</p>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex items-center justify-between">
            <button
              @click="previousPage"
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
              @click="nextPage"
              :disabled="!hasNextPage"
              class="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 text-sm sm:text-base font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sm transition-all"
            >
              <span>Next</span>
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            <button
              v-else-if="isStudentMode"
              @click="showCompletion = true"
              class="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 text-sm sm:text-base font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
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

    <!-- Completion celebration - shown once the student reaches the end of a topic. -->
    <div
      v-if="isStudentMode && showCompletion && topic"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden text-center">
        <div class="bg-gradient-to-br from-emerald-500 via-teal-500 to-indigo-600 px-6 py-8">
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
              class="flex-1 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:shadow-md transition-all"
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
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 sm:px-6 py-5 sm:py-6 text-center flex-shrink-0">
          <div class="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2.5 sm:mb-3 rounded-2xl bg-white/15 flex items-center justify-center">
            <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
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
import AITutorPlayer from '@/components/enotes/AITutorPlayer.vue'

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
const showIntro = ref(false)
const showCompletion = ref(false)
const contentRef = ref<HTMLElement | null>(null)

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
      }
    }
  } catch (error) {
    console.error('Failed to load topic:', error)
  }
}

const selectPage = (pageId: number) => {
  currentPage.value = pages.value.find(p => p.id === pageId) || null
  showToc.value = false
}

const previousPage = () => {
  if (!hasPreviousPage.value || !currentPage.value) return

  const currentIndex = pages.value.findIndex(p => p.id === currentPage.value!.id)
  if (currentIndex > 0) {
    currentPage.value = pages.value[currentIndex - 1]
  }
}

const nextPage = () => {
  if (!hasNextPage.value || !currentPage.value) return

  const currentIndex = pages.value.findIndex(p => p.id === currentPage.value!.id)
  if (currentIndex < pages.value.length - 1) {
    currentPage.value = pages.value[currentIndex + 1]
  }
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
}, { immediate: true })

watch(contentRef, (el, _old, onCleanup) => {
  if (!el) return
  el.addEventListener('error', hideBrokenImages, true)
  onCleanup(() => el.removeEventListener('error', hideBrokenImages, true))
})

onMounted(() => {
  loadTopic()
})

onBeforeUnmount(() => {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {})
  }
})
</script>

<style scoped>
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
