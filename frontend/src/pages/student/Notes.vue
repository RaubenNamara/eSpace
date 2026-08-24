<template>
  <div>
    <template v-if="!activeSubjectId">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm flex-shrink-0">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">eNotes</h1>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Notes shared by your teachers
            <span v-if="!loading && subjectGroups.length > 0">· {{ subjectGroups.length }} {{ subjectGroups.length === 1 ? 'subject' : 'subjects' }}</span>
          </p>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <div class="relative flex-1 min-w-0">
            <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search subjects or notes..."
              class="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
            >
          </div>
          <button
            @click="bookmarkedOnly = !bookmarkedOnly"
            class="px-3 py-2 border rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 flex-shrink-0"
            :class="bookmarkedOnly
              ? 'border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-700'
              : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
          >
            <svg class="w-4 h-4" :fill="bookmarkedOnly ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
            </svg>
            <span class="hidden sm:inline">Bookmarked</span>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div v-for="i in 8" :key="i" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
          <div class="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-gray-700 mb-4"></div>
          <div class="h-5 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
          <div class="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 flex items-start gap-3">
        <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-800 dark:text-red-200">{{ error }}</p>
      </div>

      <!-- No department enrollment -->
      <div v-else-if="!departmentId" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.42A12.083 12.083 0 0121 14.16 12.083 12.083 0 0112 20.5 12.083 12.083 0 013 14.16a12.083 12.083 0 012.84-3.58L12 14z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No department enrollment found</h3>
        <p class="text-gray-500 dark:text-gray-400">Notes are shared by department. Contact your school if this looks wrong.</p>
      </div>

      <template v-else>
        <!-- Subject Cards -->
        <div v-if="filteredSubjectGroups.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <button
            v-for="group in filteredSubjectGroups"
            :key="group.id"
            @click="openSubject(group.id)"
            class="text-left bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-6 group"
          >
            <div class="flex items-start justify-between mb-4">
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-sm flex-shrink-0 bg-gradient-to-br"
                :class="subjectGradient(group.id)"
              >
                {{ subjectInitials(group) }}
              </div>
              <svg class="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
              {{ group.name }}
            </h3>
            <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span v-if="group.topicCount" class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                {{ group.topicCount }} {{ group.topicCount === 1 ? 'topic' : 'topics' }}
              </span>
              <span v-if="group.noteCount" class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                {{ group.noteCount }} {{ group.noteCount === 1 ? 'note' : 'notes' }}
              </span>
            </div>
            <span
              v-if="group.bookmarkedCount"
              class="inline-flex items-center gap-1 mt-3 px-2 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg>
              {{ group.bookmarkedCount }} bookmarked
            </span>
          </button>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {{ subjectGroups.length === 0 ? 'No subjects yet' : 'No subjects match your filters' }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            {{ subjectGroups.length === 0 ? 'Your teachers haven\'t shared any notes with your department yet.' : 'Try a different search.' }}
          </p>
        </div>
      </template>
    </template>

    <!-- Subject Workspace -->
    <template v-else>
      <div class="flex items-center justify-between gap-2 mb-4">
        <div class="flex items-center gap-2 min-w-0">
          <button
            @click="closeSubject"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex-shrink-0"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            All Subjects
          </button>
          <span class="text-gray-300 dark:text-gray-600">/</span>
          <span class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ activeSubject?.name }}</span>
        </div>
        <button
          @click="showSidebar = !showSidebar"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-colors flex-shrink-0"
        >
          <svg v-if="showSidebar" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          {{ showSidebar ? 'Hide topics' : 'Show topics' }}
        </button>
      </div>

      <div class="flex flex-col lg:flex-row gap-6 items-start">
        <!-- Sidebar -->
        <aside v-if="showSidebar" class="w-full lg:w-80 flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] flex flex-col overflow-hidden">
          <div class="p-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center gap-3 flex-shrink-0">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br flex-shrink-0"
              :class="activeSubject ? subjectGradient(activeSubject.id) : ''"
            >
              {{ activeSubject ? subjectInitials(activeSubject) : '' }}
            </div>
            <div class="min-w-0">
              <p class="font-semibold text-gray-900 dark:text-white truncate">{{ activeSubject?.name }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ subjectItems.length }} {{ subjectItems.length === 1 ? 'item' : 'items' }}</p>
            </div>
          </div>
          <nav class="flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto p-3">
            <button
              v-for="(item, idx) in subjectItems"
              :key="`${item.itemType}-${item.id}`"
              @click="selectItem(idx)"
              class="flex-shrink-0 lg:flex-shrink lg:w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors max-w-[220px] lg:max-w-none"
              :class="idx === activeItemIndex
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/60'"
            >
              <span
                class="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                :class="idx === activeItemIndex ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'"
              >{{ idx + 1 }}</span>
              <span class="min-w-0 flex-1">
                <span class="block text-sm font-medium truncate">{{ item.title }}</span>
                <span class="block text-xs text-gray-400 dark:text-gray-500 truncate">
                  {{ item.itemType === 'topic' ? `${(item.total_pages || 0) + 1} ${(item.total_pages || 0) + 1 === 1 ? 'page' : 'pages'}` : formatDate(item.published_at || item.created_at) }}
                </span>
              </span>
              <svg v-if="item.itemType === 'note' && item.is_bookmarked" class="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg>
              <svg v-else-if="item.itemType === 'note' && (item.percentage_completed || 0) >= 90" class="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </button>
          </nav>
        </aside>

        <!-- Content Pane -->
        <main class="flex-1 min-w-0 w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
          <template v-if="activeItem">
            <!-- Header -->
            <div
              class="relative flex-shrink-0 bg-gradient-to-r px-4 sm:px-8 py-4 sm:py-6"
              :class="activeItem.itemType === 'topic' ? 'from-purple-600 to-fuchsia-600' : 'from-indigo-600 to-blue-600'"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <h2 class="text-lg sm:text-2xl font-bold text-white leading-tight line-clamp-2">{{ activeItem.title }}</h2>
                  <div class="flex flex-wrap items-center gap-2 mt-1.5 text-xs sm:text-sm text-white/80">
                    <span v-if="teacherName" class="truncate">By {{ teacherName }}</span>
                    <span v-if="activeItem.itemType === 'topic' && totalDisplayPages > 1" class="whitespace-nowrap">Page {{ currentPageIndex + 1 }} of {{ totalDisplayPages }}</span>
                    <span v-else class="whitespace-nowrap">{{ formatDate(activeItem.published_at || activeItem.created_at) }}</span>
                  </div>
                </div>
                <button
                  v-if="activeItem.itemType === 'note'"
                  @click="toggleBookmark(notes.find(n => n.id === activeItem!.id) || null)"
                  class="p-2 rounded-lg bg-white/10 hover:bg-white/25 transition-colors flex-shrink-0"
                  :title="isActiveBookmarked ? 'Remove bookmark' : 'Bookmark this note'"
                >
                  <svg class="w-5 h-5" :class="isActiveBookmarked ? 'text-amber-300' : 'text-white'" :fill="isActiveBookmarked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Progress -->
            <div class="h-1 bg-gray-100 dark:bg-gray-700 flex-shrink-0">
              <div
                class="h-1 transition-all duration-300"
                :class="activeItem.itemType === 'topic' ? 'bg-purple-600' : 'bg-indigo-600'"
                :style="{ width: (activeItem.itemType === 'topic' ? pageProgress : maxScrollPercent) + '%' }"
              ></div>
            </div>

            <!-- Content -->
            <div ref="contentRef" @scroll="onContentScroll" @error.capture="hideBrokenImages" class="flex-1 overflow-y-auto min-h-[300px]">
              <div class="px-4 py-6 sm:p-8">
                <!-- Topic cover: name, competency and learning outcomes always shown as page 1 -->
                <div v-if="isCoverPage" class="max-w-2xl mx-auto">
                  <div class="text-center mb-8">
                    <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                    </div>
                    <p class="text-xs font-semibold tracking-wider uppercase text-purple-600 dark:text-purple-400 mb-2">Topic Overview</p>
                    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-snug">{{ activeItem.title }}</h1>
                  </div>

                  <div v-if="coverCompetency" class="mb-8">
                    <div class="flex items-center gap-2.5 mb-3">
                      <div class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0">
                        <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <h2 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">Competency</h2>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed pl-[42px]">{{ coverCompetency }}</p>
                  </div>

                  <div v-if="coverLearningOutcomes.length" class="mb-4">
                    <div class="flex items-center gap-2.5 mb-3">
                      <div class="w-8 h-8 rounded-lg bg-fuchsia-100 dark:bg-fuchsia-900/40 flex items-center justify-center flex-shrink-0">
                        <svg class="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <h2 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">Learning Outcomes</h2>
                    </div>
                    <p class="text-xs text-gray-400 dark:text-gray-500 pl-[42px] mb-3">By the end of this topic, you should be able to:</p>
                    <ol class="pl-[42px] space-y-2.5">
                      <li v-for="(outcome, i) in coverLearningOutcomes" :key="i" class="flex items-start gap-3">
                        <span class="mt-0.5 w-6 h-6 rounded-full bg-fuchsia-50 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {{ i + 1 }}
                        </span>
                        <span class="text-sm text-gray-700 dark:text-gray-300 pt-0.5">{{ outcome }}</span>
                      </li>
                    </ol>
                  </div>

                  <p v-if="!coverCompetency && !coverLearningOutcomes.length" class="text-center text-sm text-gray-400 dark:text-gray-500 italic py-6">
                    No competency or learning outcomes have been added for this topic yet.
                  </p>

                  <div v-if="pages.length" class="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700/60 text-center">
                    <button
                      @click="goNext"
                      class="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    >
                      Start reading
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div v-else-if="activeItemLoading && !renderedContent" class="space-y-3 animate-pulse">
                  <div class="h-4 bg-gray-100 dark:bg-gray-700 rounded w-3/4"></div>
                  <div class="h-4 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
                  <div class="h-4 bg-gray-100 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
                <template v-else>
                  <div class="prose prose-sm sm:prose-lg dark:prose-invert max-w-none" v-html="renderedContent"></div>
                  <p v-if="activeItem.itemType === 'topic' && pages.length === 0" class="text-gray-500 dark:text-gray-400 italic">This topic has no pages yet.</p>
                </template>
              </div>
            </div>

            <!-- Footer Navigation -->
            <div class="flex-shrink-0 flex items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
              <button
                @click="goPrevious"
                :disabled="!canGoPrevious"
                class="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span>Previous</span>
              </button>

              <span class="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
                {{ activeItem.itemType === 'topic'
                  ? (activeItem.estimated_reading_time ? `${activeItem.estimated_reading_time} min read` : '')
                  : `${Math.round(maxScrollPercent)}% read` }}
              </span>

              <button
                @click="goNext"
                :disabled="!canGoNext"
                class="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700"
              >
                <span>Next</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </template>
          <div v-else class="flex-1 flex items-center justify-center p-12 text-gray-400 dark:text-gray-500 text-sm">
            Select an item from the sidebar to start reading.
          </div>
        </main>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { autoEmbedYoutube } from '@/utils/richContent'

interface Note {
  id: number
  title: string
  subject_id: number
  subject_name?: string
  subject_code?: string
  content: string
  teacher_first_name?: string
  teacher_last_name?: string
  percentage_completed?: number
  last_read_at?: string | null
  time_spent_minutes?: number
  is_bookmarked?: boolean
  created_at: string
  published_at?: string
  preview?: string
}

interface Topic {
  id: number
  title: string
  description?: string
  learning_outcomes?: string[]
  subject_id: number
  subject_name?: string
  subject_code?: string
  class_id?: number | null
  total_pages: number
  estimated_reading_time?: number
  teacher_first_name?: string
  teacher_last_name?: string
  created_at: string
  published_at?: string
  pages?: { id: number; title: string; content: string; order_number: number }[]
  preview?: string
}

type NoteItem = Note & { itemType: 'note' }
type TopicItem = Topic & { itemType: 'topic' }
type SubjectItem = NoteItem | TopicItem

interface SubjectGroup {
  id: number
  name: string
  code?: string
  items: SubjectItem[]
  topicCount: number
  noteCount: number
  bookmarkedCount: number
}

const API_BASE = '/api'

const notes = ref<Note[]>([])
const topics = ref<Topic[]>([])
const departmentId = ref<number | null>(null)
const searchQuery = ref('')
const bookmarkedOnly = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)

const activeSubjectId = ref<number | null>(null)
const showSidebar = ref(true)
const activeItemIndex = ref(0)
const activeItemDetail = ref<SubjectItem | null>(null)
const activeItemLoading = ref(false)
const currentPageIndex = ref(0)
const contentRef = ref<HTMLElement | null>(null)
const maxScrollPercent = ref(0)
const viewStartedAt = ref(Date.now())

const stripHtml = (html: string) => {
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

// Unified list combining both content sources so students see one set of subjects regardless
// of which system a teacher authored the content in.
const allItems = computed<SubjectItem[]>(() => {
  const noteItems: NoteItem[] = notes.value.map(note => ({
    ...note,
    itemType: 'note',
    preview: stripHtml(note.content)
  }))
  const topicItems: TopicItem[] = topics.value.map(topic => ({
    ...topic,
    itemType: 'topic',
    preview: topic.description ? stripHtml(topic.description) : (topic.pages?.[0] ? stripHtml(topic.pages[0].content) : '')
  }))
  return [...noteItems, ...topicItems]
})

const gradients = [
  'from-indigo-500 to-purple-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-violet-500 to-fuchsia-600',
  'from-sky-500 to-blue-600',
  'from-teal-500 to-cyan-600'
]
const subjectGradient = (id: number) => gradients[Math.abs(id) % gradients.length]
const subjectInitials = (subj: { name: string; code?: string }) => {
  if (subj.code) return subj.code.slice(0, 3).toUpperCase()
  return subj.name.split(/\s+/).filter(Boolean).map(w => w[0]).join('').slice(0, 3).toUpperCase() || '?'
}

const subjectGroups = computed<SubjectGroup[]>(() => {
  const map = new Map<number, SubjectGroup>()
  allItems.value.forEach(item => {
    const sid = item.subject_id || 0
    if (!map.has(sid)) {
      map.set(sid, { id: sid, name: item.subject_name || 'General', code: item.subject_code, items: [], topicCount: 0, noteCount: 0, bookmarkedCount: 0 })
    }
    const group = map.get(sid)!
    group.items.push(item)
    if (item.itemType === 'topic') {
      group.topicCount++
    } else {
      group.noteCount++
      if (item.is_bookmarked) group.bookmarkedCount++
    }
  })
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
})

const filteredSubjectGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return subjectGroups.value.filter(group => {
    if (bookmarkedOnly.value && group.bookmarkedCount === 0) return false
    if (!q) return true
    if (group.name.toLowerCase().includes(q)) return true
    return group.items.some(item => item.title.toLowerCase().includes(q) || (item.preview || '').toLowerCase().includes(q))
  })
})

const activeSubject = computed(() => subjectGroups.value.find(g => g.id === activeSubjectId.value) || null)

const subjectItems = computed<SubjectItem[]>(() => {
  if (!activeSubject.value) return []
  return [...activeSubject.value.items].sort((a, b) => {
    const aDate = a.published_at || a.created_at
    const bDate = b.published_at || b.created_at
    return new Date(aDate).getTime() - new Date(bDate).getTime()
  })
})

const activeItem = computed<SubjectItem | null>(() => subjectItems.value[activeItemIndex.value] || null)

const pages = computed(() => (activeItemDetail.value?.itemType === 'topic' ? (activeItemDetail.value.pages || []) : []))

// Every topic gets a synthesized "cover" as page 1 (topic name, competency, learning
// outcomes) ahead of the teacher's authored pages, which shift down by one slot.
const hasCoverPage = computed(() => activeItem.value?.itemType === 'topic')
const totalDisplayPages = computed(() => pages.value.length + (hasCoverPage.value ? 1 : 0))
const isCoverPage = computed(() => hasCoverPage.value && currentPageIndex.value === 0)
const currentPage = computed(() => (hasCoverPage.value ? pages.value[currentPageIndex.value - 1] || null : null))
const pageProgress = computed(() => (totalDisplayPages.value ? Math.round(((currentPageIndex.value + 1) / totalDisplayPages.value) * 100) : 0))

const coverCompetency = computed(() => {
  if (activeItemDetail.value?.itemType !== 'topic' || !activeItemDetail.value.description) return ''
  return stripHtml(activeItemDetail.value.description)
})
const coverLearningOutcomes = computed(() => {
  if (activeItemDetail.value?.itemType !== 'topic') return [] as string[]
  return (activeItemDetail.value.learning_outcomes || []).map(o => stripHtml(o))
})

const renderedContent = computed(() => {
  if (!activeItemDetail.value) return ''
  if (activeItemDetail.value.itemType === 'note') {
    return autoEmbedYoutube(activeItemDetail.value.content || '')
  }
  if (isCoverPage.value) return ''
  return autoEmbedYoutube(currentPage.value?.content || '')
})

const teacherName = computed(() => {
  const d = activeItemDetail.value
  if (!d?.teacher_first_name) return ''
  return `${d.teacher_first_name} ${d.teacher_last_name || ''}`.trim()
})

const isActiveBookmarked = computed(() => {
  if (activeItem.value?.itemType !== 'note') return false
  return notes.value.find(n => n.id === activeItem.value!.id)?.is_bookmarked || false
})

const canGoPrevious = computed(() => {
  if (hasCoverPage.value && currentPageIndex.value > 0) return true
  return activeItemIndex.value > 0
})
const canGoNext = computed(() => {
  if (hasCoverPage.value && currentPageIndex.value < totalDisplayPages.value - 1) return true
  return activeItemIndex.value < subjectItems.value.length - 1
})

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Content sometimes contains <img> tags with a missing/deleted source (seen in real authored
// content) - hide those instead of showing the browser's broken-image icon.
const hideBrokenImages = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    e.target.style.display = 'none'
  }
}

const loadNotes = async () => {
  loading.value = true
  error.value = null
  try {
    const [notesRes, topicsRes] = await Promise.all([
      axios.get(`${API_BASE}/student/notes`, { params: { limit: 100 } }),
      axios.get(`${API_BASE}/student/enotes/topics`).catch(() => null)
    ])
    if (notesRes.data.success) {
      notes.value = notesRes.data.data.notes || []
      departmentId.value = notesRes.data.data.department_id || null
    }
    if (topicsRes?.data?.success) {
      topics.value = topicsRes.data.data.topics || []
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load notes'
  } finally {
    loading.value = false
  }
}

// Reports reading progress for the note being left - called whenever navigation moves away
// from a note (switching items, closing the subject, or unmounting the page).
const reportProgress = async (noteId: number) => {
  const timeSpentMinutes = Math.max(0, Math.round((Date.now() - viewStartedAt.value) / 60000))
  const note = notes.value.find(n => n.id === noteId)
  if (note) note.percentage_completed = Math.max(note.percentage_completed || 0, maxScrollPercent.value)
  try {
    await axios.post(`${API_BASE}/student/notes/${noteId}/progress`, {
      percentage: maxScrollPercent.value,
      time_spent_minutes: timeSpentMinutes
    })
  } catch {
    // Non-critical - progress tracking is best-effort
  }
}

const loadActiveItemDetail = async () => {
  const item = activeItem.value
  if (!item) {
    activeItemDetail.value = null
    return
  }
  activeItemDetail.value = item
  activeItemLoading.value = true
  try {
    if (item.itemType === 'note') {
      const response = await axios.get(`${API_BASE}/student/notes/${item.id}`)
      if (response.data.success) {
        const merged: NoteItem = { ...item, ...response.data.data }
        activeItemDetail.value = merged
        maxScrollPercent.value = merged.percentage_completed || 0
        const idx = notes.value.findIndex(n => n.id === item.id)
        if (idx !== -1) notes.value[idx] = { ...notes.value[idx], ...response.data.data }
      }
    } else {
      const response = await axios.get(`${API_BASE}/student/enotes/topics/${item.id}`)
      if (response.data.success) {
        activeItemDetail.value = { ...item, ...response.data.data }
      }
    }
  } catch {
    // Card data is already shown; a failed refresh just means slightly stale content.
  } finally {
    activeItemLoading.value = false
  }
  nextTick(() => {
    if (contentRef.value) contentRef.value.scrollTop = 0
  })
}

const openSubject = async (id: number) => {
  activeSubjectId.value = id
  activeItemIndex.value = 0
  currentPageIndex.value = 0
  maxScrollPercent.value = 0
  viewStartedAt.value = Date.now()
  await loadActiveItemDetail()
}

const closeSubject = () => {
  const item = activeItem.value
  if (item?.itemType === 'note') reportProgress(item.id)
  activeSubjectId.value = null
  activeItemDetail.value = null
}

const selectItem = async (idx: number) => {
  if (idx === activeItemIndex.value) return
  const prevItem = activeItem.value
  if (prevItem?.itemType === 'note') reportProgress(prevItem.id)
  activeItemIndex.value = idx
  currentPageIndex.value = 0
  maxScrollPercent.value = 0
  viewStartedAt.value = Date.now()
  await loadActiveItemDetail()
}

const goPrevious = () => {
  if (hasCoverPage.value && currentPageIndex.value > 0) {
    currentPageIndex.value--
    nextTick(() => { if (contentRef.value) contentRef.value.scrollTop = 0 })
    return
  }
  if (activeItemIndex.value > 0) selectItem(activeItemIndex.value - 1)
}

const goNext = () => {
  if (hasCoverPage.value && currentPageIndex.value < totalDisplayPages.value - 1) {
    currentPageIndex.value++
    nextTick(() => { if (contentRef.value) contentRef.value.scrollTop = 0 })
    return
  }
  if (activeItemIndex.value < subjectItems.value.length - 1) selectItem(activeItemIndex.value + 1)
}

const toggleBookmark = async (note: Note | null) => {
  if (!note) return
  try {
    const response = await axios.post(`${API_BASE}/student/notes/${note.id}/bookmark`)
    if (response.data.success) {
      note.is_bookmarked = response.data.data.bookmarked
      if (activeItemDetail.value?.itemType === 'note' && activeItemDetail.value.id === note.id) {
        activeItemDetail.value.is_bookmarked = response.data.data.bookmarked
      }
    }
  } catch {
    // Non-critical - leave state as-is if the request fails
  }
}

const onContentScroll = () => {
  const el = contentRef.value
  if (!el || activeItem.value?.itemType !== 'note') return
  const scrollable = el.scrollHeight - el.clientHeight
  const percent = scrollable <= 0 ? 100 : Math.min(100, Math.round(((el.scrollTop + el.clientHeight) / el.scrollHeight) * 100))
  if (percent > maxScrollPercent.value) {
    maxScrollPercent.value = percent
  }
}

onMounted(() => {
  loadNotes()
})

onBeforeUnmount(() => {
  if (activeItem.value?.itemType === 'note') reportProgress(activeItem.value.id)
})
</script>

<style scoped>
.prose {
  line-height: 1.8;
}

.prose :deep(> *:first-child) {
  margin-top: 0;
}

.prose :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.prose :deep(video) {
  max-width: 100%;
  border-radius: 8px;
  margin: 16px 0;
}

.prose :deep(iframe) {
  max-width: 100%;
  border-radius: 8px;
  margin: 16px 0;
}

.prose :deep(.yt-embed) {
  display: block;
  position: relative;
  width: 100%;
  max-width: 640px;
  aspect-ratio: 16 / 9;
  margin: 16px 0;
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

.prose :deep(blockquote) {
  border-left: 4px solid #6366f1;
  padding-left: 16px;
  margin: 16px 0;
  font-style: italic;
  background: #f3f4f6;
  padding: 16px;
  border-radius: 0 8px 8px 0;
}

.dark .prose :deep(blockquote) {
  background: #374151;
}

.prose :deep(pre) {
  background: #1e293b;
  color: #e2e8f0;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0;
}

.prose :deep(code) {
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.875em;
}

.dark .prose :deep(code) {
  background: #374151;
}

.prose :deep(pre code) {
  background: transparent;
  padding: 0;
}

.prose :deep(hr) {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 24px 0;
}

.prose :deep(ul),
.prose :deep(ol) {
  padding-left: 24px;
  margin: 16px 0;
}

.prose :deep(li) {
  margin: 8px 0;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4),
.prose :deep(h5),
.prose :deep(h6) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
}

.prose :deep(h1) {
  font-size: 2em;
}

.prose :deep(h2) {
  font-size: 1.5em;
}

.prose :deep(h3) {
  font-size: 1.25em;
}

.prose :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}

.prose :deep(th),
.prose :deep(td) {
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  text-align: left;
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

.prose :deep(a) {
  color: #6366f1;
  text-decoration: underline;
}

.prose :deep(a:hover) {
  color: #4f46e5;
}
</style>
