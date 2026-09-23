<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-2 sm:gap-3">
      <div class="flex items-center gap-2 sm:gap-4 min-w-0">
        <button
          @click="goBack"
          class="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div class="min-w-0">
          <h1 class="text-base sm:text-xl font-semibold text-gray-900 dark:text-white truncate">{{ topic?.title }}</h1>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{{ topic?.subject_name }}</p>
        </div>
      </div>

      <div class="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-3 w-full sm:w-auto">
        <div class="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span v-if="autosaveStatus === 'saving'" class="text-yellow-600 dark:text-yellow-400">
            <svg class="animate-spin h-4 w-4 inline" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </span>
          <span v-else-if="autosaveStatus === 'saved'" class="text-green-600 dark:text-green-400">
            Saved
          </span>
          <span v-else class="text-gray-400">
            Unsaved
          </span>
        </div>

        <button
          @click="showPagesPanel = !showPagesPanel"
          class="p-2 rounded-lg transition-colors"
          :class="showPagesPanel ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'"
          :title="showPagesPanel ? 'Hide Pages panel' : 'Show Pages panel'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
          </svg>
        </button>
        <button
          @click="showSettingsPanel = !showSettingsPanel"
          class="p-2 rounded-lg transition-colors"
          :class="showSettingsPanel ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'"
          :title="showSettingsPanel ? 'Hide Page Settings panel' : 'Show Page Settings panel'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </button>

        <button
          @click="openPreview"
          class="px-2.5 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1.5 sm:gap-2"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          <span class="hidden sm:inline">Preview</span>
        </button>

        <button
          @click="publishTopic"
          :disabled="topic?.status === 'published'"
          class="px-2.5 sm:px-4 py-2 text-sm sm:text-base bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ topic?.status === 'published' ? 'Published' : 'Publish' }}
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Sidebar - Pages: a full-screen overlay below lg (three fixed-width columns would
           never fit a phone screen), a static column at lg+ where there's room for all three. -->
      <div v-if="showPagesPanel" class="fixed inset-0 z-40 lg:static lg:z-auto w-full lg:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-gray-900 dark:text-white">Pages</h2>
            <div class="flex items-center gap-1">
              <button
                @click="addPage"
                class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                title="Add Page"
              >
                <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>
              <button
                @click="showPagesPanel = false"
                class="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                title="Close"
              >
                <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-2">
          <div
            v-for="(page, index) in pages"
            :key="page.id"
            draggable="true"
            @dragstart="onDragStart(index)"
            @dragover.prevent="onDragOver"
            @drop="onDrop(index)"
            @dragend="onDragEnd"
            @click="selectPage(page.id)"
            :class="[
              'p-3 rounded-lg cursor-pointer transition-colors mb-1',
              currentPage?.id === page.id
                ? 'bg-indigo-100 dark:bg-indigo-900 border border-indigo-300 dark:border-indigo-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700',
              draggedIndex === index ? 'opacity-50' : ''
            ]"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center flex-1 min-w-0">
                <svg class="w-4 h-4 text-gray-400 mr-2 cursor-move" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                </svg>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    Page {{ page.order_number }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ getPageWordCount(page.content) }} words
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-1 ml-2">
                <button
                  @click.stop="movePageUp(index)"
                  :disabled="index === 0"
                  class="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move Up"
                >
                  <svg class="w-3 h-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                </button>
                <button
                  @click.stop="movePageDown(index)"
                  :disabled="index === pages.length - 1"
                  class="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move Down"
                >
                  <svg class="w-3 h-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <button
                  @click.stop="duplicatePage(page.id)"
                  class="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                  title="Duplicate"
                >
                  <svg class="w-3 h-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
                <button
                  @click.stop="deletePage(page.id)"
                  class="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                  title="Delete"
                >
                  <svg class="w-3 h-3 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="addPage"
            class="btn-primary w-full text-sm flex items-center justify-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Add New Page</span>
          </button>
        </div>
      </div>

      <!-- Main Editor -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <div class="flex-1 overflow-y-auto p-4 sm:p-6">
          <div v-if="currentPage" class="max-w-4xl xl:max-w-6xl 2xl:max-w-[1600px] mx-auto">
            <div class="mb-4">
              <CKEditor
                v-if="currentPage"
                :key="currentPage.id"
                v-model="currentPage.content"
                @update:model-value="scheduleAutosave"
                @ready="onEditorReady"
                @error="onEditorError"
                placeholder="Write your page content here..."
                min-height="400px"
              />
              <div v-else class="p-8 text-center text-gray-500">
                Select or create a page to start editing
              </div>
            </div>

            <!-- Page-fit meter: the reader shows this page in a fixed-size flipbook page, not a
                 free-scrolling column, so content that runs long forces students to scroll inside
                 that one page instead of turning to a fresh one. Measured against the real
                 flipbook page size (a hidden probe below, styled identically). Advisory only for
                 now, not enforced - see measurePageFit(): a full page shows a warning toast (once
                 per crossing) and this banner, but a teacher can keep typing past it. Hard
                 blocking was tried and reverted - see git history if reintroducing it. -->
            <div
              v-if="currentPage"
              class="mb-4 rounded-lg border px-3 py-2.5 flex items-center gap-3 text-xs sm:text-sm transition-colors"
              :class="pageFitStatus === 'over'
                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                : pageFitStatus === 'near'
                  ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                  : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'"
            >
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <span class="font-medium">
                    {{ pageFitStatus === 'over' ? "Page is full - students will need to scroll. Consider starting a new page."
                      : pageFitStatus === 'near' ? 'Getting close to a full page'
                      : 'Fits comfortably on one page' }}
                  </span>
                  <span class="flex-shrink-0 font-semibold">~{{ Math.min(estimatedLines, PAGE_LINE_TARGET) }} of {{ PAGE_LINE_TARGET }} lines</span>
                </div>
                <div class="h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all"
                    :class="pageFitStatus === 'over' ? 'bg-red-500' : pageFitStatus === 'near' ? 'bg-amber-500' : 'bg-emerald-500'"
                    :style="{ width: `${Math.min(pageFitRatio, 1) * 100}%` }"
                  ></div>
                </div>
              </div>
              <button
                v-if="pageFitStatus === 'over'"
                @click="addPage"
                class="flex-shrink-0 px-2.5 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium whitespace-nowrap transition-colors"
              >
                + New Page
              </button>
            </div>

            <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Page {{ currentPage?.order_number }} of {{ pages.length }}</span>
              <div class="flex items-center space-x-2">
                <button
                  @click="previousPage"
                  :disabled="!hasPreviousPage"
                  class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="!hasNextPage"
                  class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
                <!-- Quick "add page" - the Pages panel (where "Add New Page" normally lives) is
                     hidden by default now, so this stays reachable without opening it. -->
                <button
                  v-if="!showPagesPanel"
                  @click="addPage"
                  title="Add New Page"
                  class="w-7 h-7 flex-shrink-0 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div v-else class="flex items-center justify-center h-full">
            <div class="text-center">
              <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p class="text-gray-600 dark:text-gray-400 mb-4">No page selected</p>
              <button
                @click="addPage"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create First Page
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar - Settings: same full-screen-overlay-below-lg treatment as Pages. -->
      <div v-if="showSettingsPanel" class="fixed inset-0 z-40 lg:static lg:z-auto w-full lg:w-72 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4 sm:p-6 overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold text-gray-900 dark:text-white">Page Settings</h2>
          <button
            @click="showSettingsPanel = false"
            class="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Close"
          >
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div v-if="currentPage" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Page Order</label>
            <input
              :value="currentPage.order_number"
              type="number"
              disabled
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            >
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Drag pages in the sidebar to reorder
            </p>
          </div>

          <div>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="currentPage.is_active"
                @change="scheduleAutosave"
                type="checkbox"
                class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              >
              <span class="text-sm text-gray-700 dark:text-gray-300">Active</span>
            </label>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Only active pages are visible to students
            </p>
          </div>

          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Statistics</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Word Count</span>
                <span class="text-gray-900 dark:text-white">{{ getPageWordCount(currentPage.content) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Character Count</span>
                <span class="text-gray-900 dark:text-white">{{ currentPage.content.length }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Reading Time</span>
                <span class="text-gray-900 dark:text-white">{{ getReadingTime(currentPage.content) }} min</span>
              </div>
            </div>
          </div>

          <NarrationControls
            v-if="topic"
            :topic-id="topic.id"
            :page-id="currentPage.id"
            :narration-voice="topic.narration_voice ?? null"
            :narrations="currentPage.narrations || []"
            @voice-changed="onNarrationVoiceChanged"
            @narration-generated="onNarrationGenerated"
          />

          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Topic Info</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Total Pages</span>
                <span class="text-gray-900 dark:text-white">{{ pages.length }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Status</span>
                <span
                  :class="[
                    'px-2 py-0.5 rounded-full text-xs',
                    topic?.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    topic?.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  ]"
                >
                  {{ topic?.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- One-time link from this eNote topic to the admin-authored curriculum bank, so the
               LO button below knows this topic's outcomes. -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Curriculum Link</h3>
            <div v-if="topic?.curriculum_topic_id" class="space-y-1.5">
              <p v-if="linkedCurriculumTopic" class="text-xs text-gray-500 dark:text-gray-400">{{ linkedCurriculumTopic.theme_branch }}</p>
              <p v-if="linkedCurriculumTopic" class="text-sm text-gray-900 dark:text-white font-medium">{{ linkedCurriculumTopic.topic }}</p>
              <button @click="openCurriculumLinkModal" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Change Link</button>
            </div>
            <div v-else class="space-y-2">
              <p class="text-xs text-gray-500 dark:text-gray-400">Link to the curriculum bank to enable Learning Outcome Assessments on this topic's pages.</p>
              <button @click="openCurriculumLinkModal" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Link to Curriculum</button>
            </div>
          </div>

        </div>

        <div v-else class="text-center text-gray-500 dark:text-gray-400 text-sm">
          Select a page to view settings
        </div>
      </div>
    </div>

    <!-- Floating quick-create assessments - small chips (abbreviated: LO = Learning Outcome
         Assessment, page-scoped, shown to students on finishing this page; AOI = Activity of
         Integration Assessment, topic-scoped, shown at topic-completion), always visible on every
         page for easy access rather than tucked inside the Page Settings panel. Bottom-center,
         small enough to stay out of the way of everything else. -->
    <div v-if="currentPage" class="fixed left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 z-30 flex items-center gap-1.5">
      <span
        v-if="!topic?.curriculum_topic_id"
        class="text-[11px] text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-2.5 py-1.5 shadow-lg"
      >
        Link curriculum to enable LO
      </span>
      <button
        v-else-if="!currentPage.linked_assignment"
        @click="openLoaModal"
        class="inline-flex items-center gap-1 pl-2 pr-2.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all"
        title="Create a Learning Outcome Assessment for this page"
      >
        <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
        </svg>
        <span>LO</span>
      </button>
      <button
        v-else
        @click="router.push(`/teacher/assignments/${currentPage.linked_assignment!.id}/edit`)"
        class="inline-flex items-center gap-1 pl-2 pr-2.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 text-xs font-medium shadow-lg hover:shadow-xl transition-all"
        :title="currentPage.linked_assignment.learning_outcome_label || 'Edit this page\'s Learning Outcome Assessment'"
      >
        <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>LO</span>
      </button>

      <button
        v-if="!topic?.linked_assignment"
        @click="openAoiModal"
        class="inline-flex items-center gap-1 pl-2 pr-2.5 py-1.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all"
        title="Create an AOI (Activity of Integration) Assessment for this topic"
      >
        <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
        <span>AOI</span>
      </button>
      <button
        v-else
        @click="router.push(`/teacher/assignments/${topic!.linked_assignment!.id}/edit`)"
        class="inline-flex items-center gap-1 pl-2 pr-2.5 py-1.5 rounded-full bg-violet-50 dark:bg-violet-900/40 border border-violet-200 dark:border-violet-700 text-violet-700 dark:text-violet-300 text-xs font-medium shadow-lg hover:shadow-xl transition-all"
        title="This topic already has a linked assessment"
      >
        <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>AOI</span>
      </button>
    </div>

    <!-- One-time curriculum link modal -->
    <div
      v-if="showCurriculumLinkModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="showCurriculumLinkModal = false"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-base font-bold text-gray-900 dark:text-white">Link to Curriculum</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">One-time setup - after linking, every page in this topic can quick-create a Learning Outcome Assessment from this topic's own outcomes.</p>
        </div>
        <div class="p-5 space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Academic Year</label>
              <select
                v-model="curriculumLinkSelection.academic_year_id"
                @change="onCurriculumLinkStepChange('academic_year_id')"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select year</option>
                <option v-for="y in curriculumMeta?.academic_years" :key="y.id" :value="y.id">{{ y.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Term</label>
              <select
                v-model="curriculumLinkSelection.term_id"
                :disabled="!curriculumLinkSelection.academic_year_id"
                @change="onCurriculumLinkStepChange('term_id')"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
              >
                <option value="">Select term</option>
                <option v-for="t in curriculumMeta?.terms" :key="t.id" :value="t.id">{{ t.name }}</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Theme / Branch</label>
            <select
              v-model="curriculumLinkSelection.theme_branch"
              :disabled="!curriculumLinkSelection.term_id"
              @change="onCurriculumLinkStepChange('theme_branch')"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
            >
              <option value="">Select theme/branch</option>
              <option v-for="theme in curriculumMeta?.themes" :key="theme" :value="theme">{{ theme }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Topic</label>
            <select
              v-model="curriculumLinkSelection.curriculum_topic_id"
              :disabled="!curriculumLinkSelection.theme_branch"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
            >
              <option value="">Select topic</option>
              <option v-for="t in curriculumMeta?.topics" :key="t.id" :value="t.id">{{ t.topic }}</option>
            </select>
          </div>
          <p v-if="curriculumLinkError" class="text-xs text-red-600 dark:text-red-400">{{ curriculumLinkError }}</p>
        </div>
        <div class="flex gap-3 p-5 pt-0">
          <button
            @click="showCurriculumLinkModal = false"
            class="flex-1 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="saveCurriculumLink"
            :disabled="savingCurriculumLink || !curriculumLinkSelection.curriculum_topic_id"
            class="flex-1 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ savingCurriculumLink ? 'Saving...' : 'Link' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Learning Outcome Assessment quick-create modal (page-scoped) -->
    <div
      v-if="showLoaModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="showLoaModal = false"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-base font-bold text-gray-900 dark:text-white">Learning Outcome Assessment</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Attached to Page {{ currentPage?.order_number }} - students are prompted the moment they finish reading this page.</p>
        </div>
        <div class="p-5 space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Learning Outcome *</label>
            <div v-if="!linkedCurriculumTopic?.learning_outcomes?.length" class="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-950/40 rounded-lg p-3">
              No learning outcomes found for the linked curriculum topic.
            </div>
            <div v-else class="space-y-1.5 border border-gray-200 dark:border-gray-700 rounded-lg p-2 max-h-48 overflow-y-auto">
              <label
                v-for="(o, i) in linkedCurriculumTopic.learning_outcomes"
                :key="linkedCurriculumTopic.learning_outcome_ids[i]"
                class="flex items-start gap-2.5 px-2 py-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
              >
                <input type="radio" name="loa-outcome" :value="linkedCurriculumTopic.learning_outcome_ids[i]" v-model="loaForm.learning_outcome_id" class="mt-0.5 text-indigo-600 focus:ring-indigo-500">
                <span>{{ i + 1 }}. {{ o }}</span>
              </label>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Year *</label>
              <select v-model="loaForm.academic_year" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                <option value="">Select year</option>
                <option v-for="y in academicYears" :key="y.academic_year" :value="y.academic_year">{{ y.academic_year }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Weight</label>
              <input v-model="loaForm.weight" type="number" min="0" step="0.5" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date *</label>
            <input v-model="loaForm.due_date" type="date" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
          </div>
          <p v-if="loaError" class="text-xs text-red-600 dark:text-red-400">{{ loaError }}</p>
        </div>
        <div class="flex gap-3 p-5 pt-0">
          <button
            @click="showLoaModal = false"
            class="flex-1 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="createLoaAssessment"
            :disabled="creatingLoa || !loaForm.learning_outcome_id || !loaForm.academic_year || !loaForm.due_date"
            class="flex-1 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ creatingLoa ? 'Creating...' : 'Create & Continue' }}
          </button>
        </div>
      </div>
    </div>

    <!-- AOI Assessment quick-create modal (topic-scoped) -->
    <div
      v-if="showAoiModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="showAoiModal = false"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-base font-bold text-gray-900 dark:text-white">AOI Assessment</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Linked to "{{ topic?.title }}" - shown to students at the end of this topic.</p>
        </div>
        <div class="p-5 space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Year *</label>
              <select v-model="aoiForm.academic_year" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                <option value="">Select year</option>
                <option v-for="y in academicYears" :key="y.academic_year" :value="y.academic_year">{{ y.academic_year }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Weight</label>
              <input v-model="aoiForm.weight" type="number" min="0" step="0.5" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date *</label>
            <input v-model="aoiForm.due_date" type="date" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
          </div>
          <p v-if="aoiError" class="text-xs text-red-600 dark:text-red-400">{{ aoiError }}</p>
        </div>
        <div class="flex gap-3 p-5 pt-0">
          <button
            @click="showAoiModal = false"
            class="flex-1 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="createAoiAssessment"
            :disabled="creatingAoi || !aoiForm.academic_year || !aoiForm.due_date"
            class="flex-1 py-2.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ creatingAoi ? 'Creating...' : 'Create & Continue' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Hidden page-fit probe: an off-screen clone of the real flipbook page's markup and fixed
         size (matches ENotePreview.vue's book page exactly, including the optional title and
         embed/asset-URL processing - see formatProbeContent() - since either can add real height
         a raw content measurement would miss), used only to measure whether this page's content
         overflows it. -->
    <div ref="pageFitProbeRef" class="page-fit-probe">
      <div class="h-1.5 bg-indigo-600"></div>
      <div class="p-5 sm:p-8">
        <h2 v-if="hasMeaningfulTitle(currentPage?.title || '')" class="text-xl sm:text-2xl font-bold mb-3">
          {{ currentPage?.title }}
        </h2>
        <div class="flex flex-wrap items-center gap-3 text-xs mb-5">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-600 text-white font-semibold">
            Page {{ currentPage?.order_number }} of {{ pages.length }}
          </span>
          <span>{{ getPageWordCount(currentPage?.content || '') }} words</span>
          <span>{{ getReadingTime(currentPage?.content || '') }} min read</span>
        </div>
        <div class="prose prose-sm sm:prose-base max-w-none" v-html="formatProbeContent(currentPage?.content || '')"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import axios from 'axios'
import CKEditor from '@/components/teacher/CKEditor.vue'
import NarrationControls from '@/components/enotes/NarrationControls.vue'
import { autoEmbedYoutube, resolveContentAssetUrls } from '@/utils/richContent'
import type { ENoteTopic, ENotePage, ENotePageForm, ENotePageNarration } from '@/types/enotes'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

const toast = useToastStore()
const confirmDialog = useConfirmStore()

const router = useRouter()
const route = useRoute()

const API_BASE = '/api'

const topicId = computed(() => parseInt(route.params.id as string))
const topic = ref<ENoteTopic | null>(null)
const pages = ref<ENotePage[]>([])
const currentPage = ref<ENotePage | null>(null)

const autosaveStatus = ref<'idle' | 'saving' | 'saved'>('idle')
const autosaveTimeout = ref<number | null>(null)

const draggedIndex = ref<number | null>(null)

// Both side panels start closed (toggled open via the header buttons) to give the editor the
// full width by default - state isn't persisted since it's a per-session editing preference, not
// something that should carry over between topics. Below the lg breakpoint they render as
// full-screen overlays (see template), so a panel left open when the window shrinks that far
// needs to auto-close rather than bury the editor under a full-screen overlay - it just never
// auto-opens on its own.
const LG_BREAKPOINT = 1024
const isDesktop = ref(typeof window !== 'undefined' ? window.innerWidth >= LG_BREAKPOINT : true)
const showPagesPanel = ref(false)
const showSettingsPanel = ref(false)

const applyResponsivePanels = () => {
  const wasDesktop = isDesktop.value
  isDesktop.value = window.innerWidth >= LG_BREAKPOINT
  if (wasDesktop && !isDesktop.value) {
    showPagesPanel.value = false
    showSettingsPanel.value = false
  }
}

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

const loadTopic = async () => {
  try {
    console.log('Loading topic:', topicId.value)
    const response = await axios.get(`${API_BASE}/teacher/enotes/topics/${topicId.value}`)
    console.log('Topic response:', response.data)
    if (response.data.success) {
      topic.value = response.data.data
      pages.value = (response.data.data.pages || []).map((page: ENotePage) => ({
        ...page,
        // Safety net for images/GIFs saved before the upload adapter baked the /eSpace/ base
        // path into the src itself - without this, reopening an older page to edit it would
        // show a broken image even though the same content renders fine after this fix (see
        // resolveContentAssetUrls()). Re-saving the page persists the corrected src for good.
        content: resolveContentAssetUrls(page.content || '')
      }))
      console.log('Pages loaded:', pages.value.length)

      if (pages.value.length > 0) {
        currentPage.value = pages.value[0]
        console.log('Current page set:', currentPage.value)
      } else {
        // A topic with zero pages (freshly created, or every page deleted) has nothing for the
        // teacher to click into - create the first one automatically so the editor is ready to
        // type into the moment the builder appears, instead of an empty state and an extra click.
        console.log('No pages found, creating a first page automatically')
        await addPage()
      }

      await loadLinkedCurriculumTopic()
    }
  } catch (error) {
    console.error('Failed to load topic:', error)
  }
}

const onNarrationVoiceChanged = (voice: string) => {
  if (topic.value) topic.value.narration_voice = voice
}

const onNarrationGenerated = (narration: ENotePageNarration) => {
  if (!currentPage.value) return
  const list = currentPage.value.narrations || []
  const idx = list.findIndex(n => n.voice === narration.voice)
  if (idx >= 0) {
    list[idx] = narration
  } else {
    list.push(narration)
  }
  currentPage.value.narrations = [...list]
}

const selectPage = async (pageId: number) => {
  await flushAutosave()
  currentPage.value = pages.value.find(p => p.id === pageId) || null
}

const addPage = async () => {
  try {
    await flushAutosave()

    const newPage: ENotePageForm = {
      title: 'Page',
      content: '',
      is_active: true
    }

    const response = await axios.post(
      `${API_BASE}/teacher/enotes/topics/${topicId.value}/pages`,
      newPage
    )

    if (response.data.success) {
      await loadTopic()
      if (response.data.data.id) {
        selectPage(response.data.data.id)
      }
    }
  } catch (error) {
    console.error('Failed to add page:', error)
  }
}

const updatePage = async () => {
  if (!currentPage.value) return

  try {
    autosaveStatus.value = 'saving'

    const updateData: Partial<ENotePageForm> = {
      title: currentPage.value.title,
      content: currentPage.value.content || '',
      is_active: currentPage.value.is_active
    }

    await axios.put(`${API_BASE}/teacher/enotes/pages/${currentPage.value.id}`, updateData)

    autosaveStatus.value = 'saved'

    setTimeout(() => {
      if (autosaveStatus.value === 'saved') {
        autosaveStatus.value = 'idle'
      }
    }, 2000)
  } catch (error) {
    console.error('Failed to update page:', error)
    autosaveStatus.value = 'idle'
  }
}

const scheduleAutosave = () => {
  if (autosaveTimeout.value) {
    clearTimeout(autosaveTimeout.value)
  }

  autosaveStatus.value = 'idle'

  autosaveTimeout.value = window.setTimeout(() => {
    updatePage()
  }, 2000)
}

// Navigating away or switching pages while a debounced autosave is still pending
// used to just clearTimeout() it, silently discarding the edit (e.g. an inserted
// image) instead of saving it. Anything that leaves the current page must flush first.
const flushAutosave = async () => {
  if (autosaveTimeout.value) {
    clearTimeout(autosaveTimeout.value)
    autosaveTimeout.value = null
    await updatePage()
  }
}

const duplicatePage = async (pageId: number) => {
  try {
    await axios.post(`${API_BASE}/teacher/enotes/pages/${pageId}/duplicate`)
    await loadTopic()
  } catch (error) {
    console.error('Failed to duplicate page:', error)
  }
}

const deletePage = async (pageId: number) => {
  if (!await confirmDialog.open({ title: 'Delete page', message: 'Are you sure you want to delete this page?', confirmLabel: 'Delete', danger: true })) return

  try {
    await axios.delete(`${API_BASE}/teacher/enotes/pages/${pageId}`)
    await loadTopic()

    if (currentPage.value?.id === pageId) {
      currentPage.value = pages.value.length > 0 ? pages.value[0] : null
    }
  } catch (error) {
    console.error('Failed to delete page:', error)
    toast.error('Failed to delete page. Please try again.')
  }
}

const previousPage = async () => {
  if (!hasPreviousPage.value || !currentPage.value) return

  await flushAutosave()
  const currentIndex = pages.value.findIndex(p => p.id === currentPage.value!.id)
  if (currentIndex > 0) {
    currentPage.value = pages.value[currentIndex - 1]
  }
}

const nextPage = async () => {
  if (!hasNextPage.value || !currentPage.value) return

  await flushAutosave()
  const currentIndex = pages.value.findIndex(p => p.id === currentPage.value!.id)
  if (currentIndex < pages.value.length - 1) {
    currentPage.value = pages.value[currentIndex + 1]
  }
}

const publishTopic = async () => {
  if (!topic.value) return

  try {
    await flushAutosave()

    if (topic.value.status === 'published') {
      await axios.post(`${API_BASE}/teacher/enotes/topics/${topic.value.id}/unpublish`)
    } else {
      await axios.post(`${API_BASE}/teacher/enotes/topics/${topic.value.id}/publish`)
    }

    await loadTopic()
  } catch (error) {
    console.error('Failed to publish topic:', error)
  }
}

const openPreview = async () => {
  await flushAutosave()
  router.push(`/teacher/enotes/preview/${topicId.value}`)
}

const goBack = async () => {
  await flushAutosave()
  router.push('/teacher/enotes')
}

const getPageWordCount = (content: string): number => {
  if (!content) return 0
  return content.trim().split(/\s+/).filter(word => word.length > 0).length
}

const getReadingTime = (content: string): number => {
  const wordCount = getPageWordCount(content)
  return Math.ceil(wordCount / 200) // Average reading speed: 200 words per minute
}

// The reader shows this page inside a fixed-size flipbook page (see ENotePreview.vue's
// BookFlipbook usage) rather than a free-scrolling column - 900 is that page's height in the
// same reference pixels used there (`:page-height="900"`). The hidden probe below is styled
// identically (including the title/embeds a real page can have - see updateProbeHtml()), so its
// natural (unclipped) height tells us how this content would actually sit on that page, not just
// a word-count guess. A full page (ratio 1.0) comfortably holds at least 24 lines of plain body
// text at the reader's default font size - PAGE_LINE_TARGET turns that same measured ratio into
// a "N of 24 lines" readout instead of a raw percentage, since that's a much more concrete sense
// of "how full is this page" for a teacher than a percentage is. It's still driven by the exact
// same pixel-height measurement underneath, so a bigger font (which renders each line taller)
// still eats through the 24-line budget faster automatically - nothing extra needed for that.
const PAGE_FIT_HEIGHT = 900
const PAGE_LINE_TARGET = 24
const pageFitProbeRef = ref<HTMLElement | null>(null)
const pageFitRatio = ref(0)
const estimatedLines = computed(() => Math.max(0, Math.round(pageFitRatio.value * PAGE_LINE_TARGET)))

// Untitled pages default to a generic placeholder - mirrors ENotePreview.vue's own check exactly,
// since the probe needs to know whether the real page would render a title (and its height) too.
const GENERIC_PAGE_TITLES = ['page', 'new page']
const hasMeaningfulTitle = (title: string): boolean => {
  if (!title) return false
  const normalized = title.trim().toLowerCase().replace(/\s*\(copy\)$/, '')
  return !GENERIC_PAGE_TITLES.includes(normalized)
}

// Mirrors ENotePreview.vue's own formatContent() - a raw v-html of page.content would measure an
// inert <oembed> placeholder as near-zero height instead of the real ~315px video iframe it
// becomes in the reader, silently letting a video-containing page pass as "fits" when it doesn't.
const formatProbeContent = (content: string): string => {
  if (!content) return ''
  let formatted = autoEmbedYoutube(content)
  formatted = formatted.replace(
    /<oembed url="https:\/\/vimeo\.com\/(\d+)"><\/oembed>/gi,
    '<iframe width="560" height="315" src="https://player.vimeo.com/video/$1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>'
  )
  return resolveContentAssetUrls(formatted)
}
const pageFitStatus = computed<'ok' | 'near' | 'over'>(() => {
  if (pageFitRatio.value >= 1) return 'over'
  if (pageFitRatio.value >= 0.85) return 'near'
  return 'ok'
})

// Advisory only for now (not enforced): a full page just warns, via this toast (throttled so
// rapid typing doesn't spam it) and the banner above, but a teacher can keep adding past it if
// they choose to. A hard-blocking version (reverting content that would grow past the limit) was
// tried and turned out to fight CKEditor's one-way v-model binding (it only syncs editor->data,
// never external changes back into the visible editor), causing real edits - including
// legitimate deletions - to get silently rejected. Simpler and reliable for now; revisit
// enforcement later if needed, using the CKEditor instance's setData() directly rather than
// reassigning page.content alone.
let lastPageFullToastAt = 0
const notifyPageFull = () => {
  const now = Date.now()
  if (now - lastPageFullToastAt < 4000) return // typing/pasting can trigger several checks in a row
  lastPageFullToastAt = now
  toast.error('This page is full - students will need to scroll. Consider starting a new page.')
}

let pageFitTimeout: number | null = null
const measurePageFit = () => {
  const el = pageFitProbeRef.value
  const page = currentPage.value
  const newRatio = el ? el.offsetHeight / PAGE_FIT_HEIGHT : 0
  pageFitRatio.value = newRatio
  if (!page || !el) return

  if (newRatio >= 1) {
    notifyPageFull()
  }
}

watch(
  () => [currentPage.value?.id, currentPage.value?.content],
  () => {
    if (pageFitTimeout) window.clearTimeout(pageFitTimeout)
    pageFitTimeout = window.setTimeout(async () => {
      await nextTick()
      measurePageFit()
    }, 350)
  },
  { immediate: true }
)

const onDragStart = (index: number) => {
  draggedIndex.value = index
}

const onDragOver = () => {
  // Allow drop
}

const onDrop = async (dropIndex: number) => {
  if (draggedIndex.value === null || draggedIndex.value === dropIndex) return

  const dragIndex = draggedIndex.value
  const newPages = [...pages.value]
  const [draggedPage] = newPages.splice(dragIndex, 1)
  newPages.splice(dropIndex, 0, draggedPage)

  pages.value = newPages

  try {
    const pageOrders = newPages.map((page, idx) => ({
      id: page.id,
      order_number: idx + 1
    }))

    await axios.post(`${API_BASE}/teacher/enotes/topics/${topicId.value}/reorder`, {
      page_orders: pageOrders
    })

    await loadTopic()
  } catch (error) {
    console.error('Failed to reorder pages:', error)
    await loadTopic()
  }

  draggedIndex.value = null
}

const onDragEnd = () => {
  draggedIndex.value = null
}

const onEditorReady = (editor: any) => {
  console.log('ENoteBuilder: CKEditor ready', editor)
}

const onEditorError = (error: any) => {
  console.error('ENoteBuilder: CKEditor error', error)
}

const movePageUp = async (index: number) => {
  if (index === 0) return

  const newPages = [...pages.value]
  const [page] = newPages.splice(index, 1)
  newPages.splice(index - 1, 0, page)
  pages.value = newPages

  try {
    const pageOrders = newPages.map((page, idx) => ({
      id: page.id,
      order_number: idx + 1
    }))

    await axios.post(`${API_BASE}/teacher/enotes/topics/${topicId.value}/reorder`, {
      page_orders: pageOrders
    })

    await loadTopic()
  } catch (error) {
    console.error('Failed to move page up:', error)
    await loadTopic()
  }
}

const movePageDown = async (index: number) => {
  if (index === pages.value.length - 1) return

  const newPages = [...pages.value]
  const [page] = newPages.splice(index, 1)
  newPages.splice(index + 1, 0, page)
  pages.value = newPages

  try {
    const pageOrders = newPages.map((page, idx) => ({
      id: page.id,
      order_number: idx + 1
    }))

    await axios.post(`${API_BASE}/teacher/enotes/topics/${topicId.value}/reorder`, {
      page_orders: pageOrders
    })

    await loadTopic()
  } catch (error) {
    console.error('Failed to move page down:', error)
    await loadTopic()
  }
}

// --- One-time link from this eNote topic to the admin-authored curriculum bank
// (enote_curriculum_topics/enote_learning_outcomes) - reuses the same cascading
// Year -> Term -> Theme/Branch -> Topic endpoint AssignmentBuilder.vue's LOA/AOI picker uses.
// Unlike that picker, Academic Year is asked directly here since eNote topics carry no year of
// their own to auto-derive it from. ---
interface CurriculumMetaOption { id: number; name: string }
interface CurriculumTopicMetaOption { id: number; topic: string }
interface CurriculumMeta {
  academic_years: CurriculumMetaOption[]
  terms: CurriculumMetaOption[]
  themes: string[]
  topics: CurriculumTopicMetaOption[]
}
interface CurriculumTopicDetail {
  topic: string
  theme_branch: string
  competence: string
  learning_outcomes: string[]
  learning_outcome_ids: number[]
}

// Same "Year" options AssignmentBuilder.vue's Target Audience section uses, for the LOA/AOI
// quick-create modals below (a plain year value on the created assignment, independent of
// whichever year/term the linked curriculum topic itself happens to be scoped to).
const academicYears = ref<{ academic_year: string }[]>([])
const loadAcademicYears = async () => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/classes/academic-years`)
    if (response.data.success) academicYears.value = response.data.data
  } catch (error) {
    console.error('Failed to load academic years:', error)
  }
}

// The school-wide "current term" (terms.is_current, the same flag Marksheet/Report Card already
// key off) - a topic's teacher is virtually always linking curriculum for the term they're
// actually teaching in right now, so the Curriculum Link modal auto-selects Year+Term to this
// instead of asking the teacher to pick both by hand. Reuses the existing report-cards/terms
// endpoint (no new route) rather than adding a bespoke "current term" lookup.
const currentTermInfo = ref<{ name: string; academic_year: string | null } | null>(null)
const loadCurrentTermInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/report-cards/terms`)
    if (response.data.success) {
      const current = (response.data.data.terms || []).find((t: any) => t.is_current)
      currentTermInfo.value = current ? { name: current.name, academic_year: current.academic_year } : null
    }
  } catch (error) {
    console.error('Failed to load current term:', error)
  }
}

const showCurriculumLinkModal = ref(false)
const curriculumMeta = ref<CurriculumMeta | null>(null)
const curriculumLinkSelection = ref<{ academic_year_id: number | ''; term_id: number | ''; theme_branch: string; curriculum_topic_id: number | '' }>({
  academic_year_id: '', term_id: '', theme_branch: '', curriculum_topic_id: ''
})
const linkedCurriculumTopic = ref<CurriculumTopicDetail | null>(null)
const savingCurriculumLink = ref(false)
const curriculumLinkError = ref('')

const loadLinkedCurriculumTopic = async () => {
  linkedCurriculumTopic.value = null
  if (!topic.value?.curriculum_topic_id) return
  try {
    const response = await axios.get(`${API_BASE}/teacher/enotes/curriculum/topics/${topic.value.curriculum_topic_id}`)
    if (response.data.success) linkedCurriculumTopic.value = response.data.data
  } catch (error) {
    console.error('Failed to load linked curriculum topic:', error)
  }
}

const loadCurriculumLinkMeta = async () => {
  if (!topic.value) return
  try {
    const params: Record<string, string> = { subject_id: String(topic.value.subject_id) }
    if (topic.value.class_id) params.class_id = String(topic.value.class_id)
    if (curriculumLinkSelection.value.academic_year_id) params.academic_year_id = String(curriculumLinkSelection.value.academic_year_id)
    if (curriculumLinkSelection.value.term_id) params.term_id = String(curriculumLinkSelection.value.term_id)
    if (curriculumLinkSelection.value.theme_branch) params.theme_branch = curriculumLinkSelection.value.theme_branch

    const response = await axios.get(`${API_BASE}/teacher/enotes/curriculum/meta`, { params })
    if (response.data.success) curriculumMeta.value = response.data.data
  } catch (error) {
    console.error('Failed to load curriculum meta:', error)
  }
}

const onCurriculumLinkStepChange = async (changed: 'academic_year_id' | 'term_id' | 'theme_branch') => {
  if (changed === 'academic_year_id') {
    curriculumLinkSelection.value.term_id = ''
    curriculumLinkSelection.value.theme_branch = ''
    curriculumLinkSelection.value.curriculum_topic_id = ''
  } else if (changed === 'term_id') {
    curriculumLinkSelection.value.theme_branch = ''
    curriculumLinkSelection.value.curriculum_topic_id = ''
  } else {
    curriculumLinkSelection.value.curriculum_topic_id = ''
  }
  await loadCurriculumLinkMeta()
}

const openCurriculumLinkModal = async () => {
  curriculumLinkError.value = ''
  curriculumLinkSelection.value = { academic_year_id: '', term_id: '', theme_branch: '', curriculum_topic_id: '' }
  curriculumMeta.value = null
  showCurriculumLinkModal.value = true
  await loadCurriculumLinkMeta()

  // Auto-select the current term (and its year) if curriculum data actually exists for it -
  // matched by name, same as AssignmentBuilder.vue's own Year auto-fill, since these dropdowns
  // are only ever populated with years/terms that have curriculum entries. Falls back to leaving
  // both for manual selection if there's no curriculum yet for the current term specifically.
  if (!currentTermInfo.value) return
  const metaAfterYearsLoad = curriculumMeta.value as CurriculumMeta | null
  const matchedYear = metaAfterYearsLoad?.academic_years.find(y => y.name === currentTermInfo.value!.academic_year)
  if (!matchedYear) return
  curriculumLinkSelection.value.academic_year_id = matchedYear.id
  await loadCurriculumLinkMeta()

  const metaAfterTermsLoad = curriculumMeta.value as CurriculumMeta | null
  const matchedTerm = metaAfterTermsLoad?.terms.find(t => t.name === currentTermInfo.value!.name)
  if (!matchedTerm) return
  curriculumLinkSelection.value.term_id = matchedTerm.id
  await loadCurriculumLinkMeta()
}

const saveCurriculumLink = async () => {
  if (!topic.value || !curriculumLinkSelection.value.curriculum_topic_id) return
  savingCurriculumLink.value = true
  curriculumLinkError.value = ''
  try {
    await axios.put(`${API_BASE}/teacher/enotes/topics/${topic.value.id}`, {
      curriculum_topic_id: curriculumLinkSelection.value.curriculum_topic_id
    })
    topic.value.curriculum_topic_id = Number(curriculumLinkSelection.value.curriculum_topic_id)
    await loadLinkedCurriculumTopic()
    showCurriculumLinkModal.value = false
  } catch (err: any) {
    curriculumLinkError.value = err.response?.data?.message || 'Failed to link curriculum topic'
  } finally {
    savingCurriculumLink.value = false
  }
}

// --- Per-page Learning Outcome Assessment (LOA) quick-create - attached to currentPage via
// enote_page_id, so it's shown to students the moment they finish reading this one page (see
// ENotePreview.vue's per-page Ignore/Attempt prompt). Reuses
// Teacher\AssignmentController::create()/updateCurriculum() exactly as the full builder does. ---
const showLoaModal = ref(false)
const loaForm = ref<{ learning_outcome_id: number | ''; academic_year: string; weight: string; due_date: string }>({
  learning_outcome_id: '', academic_year: '', weight: '', due_date: ''
})
const creatingLoa = ref(false)
const loaError = ref('')

const openLoaModal = () => {
  loaError.value = ''
  loaForm.value = { learning_outcome_id: '', academic_year: '', weight: '', due_date: '' }
  showLoaModal.value = true
}

const createLoaAssessment = async () => {
  if (!topic.value || !currentPage.value || !loaForm.value.learning_outcome_id || !loaForm.value.academic_year || !loaForm.value.due_date) return
  creatingLoa.value = true
  loaError.value = ''
  try {
    const response = await axios.post(`${API_BASE}/teacher/assignments`, {
      title: `${topic.value.title} - Page ${currentPage.value.order_number} Learning Outcome Assessment`,
      total_marks: 0,
      due_date: loaForm.value.due_date,
      subject_id: topic.value.subject_id,
      scope: topic.value.class_group_name ? 'all_streams' : 'stream',
      class_id: topic.value.class_id,
      class_group_name: topic.value.class_group_name,
      enote_topic_id: topic.value.id,
      enote_page_id: currentPage.value.id,
      assessment_category: 'LOA',
      academic_year: loaForm.value.academic_year,
      weight: loaForm.value.weight || null,
    })
    const assignmentId = response.data.data.id
    await axios.put(`${API_BASE}/teacher/assignments/${assignmentId}/curriculum`, {
      curriculum_topic_id: topic.value.curriculum_topic_id,
      learning_outcome_ids: [Number(loaForm.value.learning_outcome_id)]
    })
    showLoaModal.value = false
    router.push(`/teacher/assignments/${assignmentId}/edit`)
  } catch (err: any) {
    loaError.value = err.response?.data?.message || 'Failed to create assessment'
  } finally {
    creatingLoa.value = false
  }
}

// --- Topic-level AOI quick-create - reuses the same topic.linked_assignment slot the older
// generic "Create Assessment" quick-link (ENotePreview.vue's header) also fills, just pre-set to
// assessment_category: 'AOI' and linked to this topic's curriculum topic wholesale. ---
const showAoiModal = ref(false)
const aoiForm = ref<{ academic_year: string; weight: string; due_date: string }>({ academic_year: '', weight: '', due_date: '' })
const creatingAoi = ref(false)
const aoiError = ref('')

const openAoiModal = () => {
  aoiError.value = ''
  aoiForm.value = { academic_year: '', weight: '', due_date: '' }
  showAoiModal.value = true
}

const createAoiAssessment = async () => {
  if (!topic.value || !aoiForm.value.academic_year || !aoiForm.value.due_date) return
  creatingAoi.value = true
  aoiError.value = ''
  try {
    const response = await axios.post(`${API_BASE}/teacher/assignments`, {
      title: `${topic.value.title} AOI Assessment`,
      total_marks: 0,
      due_date: aoiForm.value.due_date,
      subject_id: topic.value.subject_id,
      scope: topic.value.class_group_name ? 'all_streams' : 'stream',
      class_id: topic.value.class_id,
      class_group_name: topic.value.class_group_name,
      enote_topic_id: topic.value.id,
      assessment_category: 'AOI',
      academic_year: aoiForm.value.academic_year,
      weight: aoiForm.value.weight || null,
    })
    const assignmentId = response.data.data.id
    if (topic.value.curriculum_topic_id) {
      await axios.put(`${API_BASE}/teacher/assignments/${assignmentId}/curriculum`, {
        topic_ids: [topic.value.curriculum_topic_id]
      })
    }
    showAoiModal.value = false
    router.push(`/teacher/assignments/${assignmentId}/edit`)
  } catch (err: any) {
    aoiError.value = err.response?.data?.message || 'Failed to create assessment'
  } finally {
    creatingAoi.value = false
  }
}

onMounted(() => {
  console.log('ENoteBuilder mounted, topicId:', topicId.value)
  loadTopic()
  loadAcademicYears()
  loadCurrentTermInfo()
  window.addEventListener('resize', applyResponsivePanels)
})

onBeforeRouteLeave(async () => {
  await flushAutosave()
})

onUnmounted(() => {
  if (autosaveTimeout.value) {
    clearTimeout(autosaveTimeout.value)
  }
  window.removeEventListener('resize', applyResponsivePanels)
})
</script>

<style scoped>
.page-fit-probe {
  position: fixed;
  top: 0;
  left: -9999px;
  width: 700px;
  visibility: hidden;
  pointer-events: none;
}

/* Mirrors ENotePreview.vue's .prose rules exactly - the probe's measured height is only
   trustworthy if the content is laid out with the same line-height/spacing the reader actually
   uses, not Tailwind Typography's unmodified defaults. */
.page-fit-probe .prose {
  line-height: 1.8;
  text-align: justify;
}

.page-fit-probe .prose :deep(p) {
  margin-bottom: 1em;
  text-align: justify;
}

.page-fit-probe .prose :deep(h1),
.page-fit-probe .prose :deep(h2),
.page-fit-probe .prose :deep(h3),
.page-fit-probe .prose :deep(h4),
.page-fit-probe .prose :deep(h5),
.page-fit-probe .prose :deep(h6) {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.page-fit-probe .prose :deep(ul),
.page-fit-probe .prose :deep(ol) {
  margin-bottom: 1em;
  padding-left: 1.5em;
}

.page-fit-probe .prose :deep(li) {
  margin-bottom: 0.25em;
}

.page-fit-probe .prose :deep(blockquote) {
  border-left: 4px solid #6366f1;
  padding-left: 1em;
  margin: 1em 0;
  font-style: italic;
}

.page-fit-probe .prose :deep(pre) {
  padding: 1em;
  border-radius: 0.5em;
  margin: 1em 0;
}

.page-fit-probe .prose :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.page-fit-probe .prose :deep(th),
.page-fit-probe .prose :deep(td) {
  border: 1px solid #e5e7eb;
  padding: 0.5em 0.75em;
}
</style>
