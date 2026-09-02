<template>
  <div class="p-4 sm:p-6">
    <div class="mb-6 flex items-center gap-3">
      <div class="hidden sm:flex w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">eNotes</h1>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">Create and manage interactive note topics for your classes</p>
      </div>
    </div>

    <!-- Dashboard Stats -->
    <div v-if="stats" class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Topics</p>
            <p class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
          </div>
          <div class="p-2.5 sm:p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Draft</p>
            <p class="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400">{{ stats.draft }}</p>
          </div>
          <div class="p-2.5 sm:p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Published</p>
            <p class="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{{ stats.published }}</p>
          </div>
          <div class="p-2.5 sm:p-3 bg-green-100 dark:bg-green-900 rounded-lg">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Archived</p>
            <p class="text-2xl sm:text-3xl font-bold text-gray-600 dark:text-gray-400">{{ stats.archived }}</p>
          </div>
          <div class="p-2.5 sm:p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
      <div class="flex flex-wrap gap-3">
        <select
          v-model="statusFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        <select
          v-model="subjectFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          :disabled="!assignments?.subjects || assignments.subjects.length === 0"
        >
          <option value="">All Subjects</option>
          <option v-for="subject in assignments?.subjects" :key="subject.id" :value="subject.id">
            {{ subject.name }}
          </option>
        </select>

        <select
          v-model="classFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          :disabled="!assignments?.classes || assignments.classes.length === 0"
        >
          <option value="">All Classes</option>
          <option v-for="cls in assignments?.classes" :key="cls.id" :value="cls.id">
            {{ cls.name }} ({{ cls.level }}{{ cls.stream_name ? ' - ' + cls.stream_name : '' }})
          </option>
        </select>

        <select
          v-model="streamFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          :disabled="streamOptions.length === 0"
        >
          <option value="">All Streams</option>
          <option v-for="stream in streamOptions" :key="stream" :value="stream">
            {{ stream }}
          </option>
        </select>

        <div v-if="assignmentsError" class="text-red-600 dark:text-red-400 text-sm flex items-center">
          {{ assignmentsError }}
        </div>
      </div>

      <button
        @click="openCreateModal"
        class="w-full lg:w-auto px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 flex-shrink-0"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Create Topic</span>
      </button>
    </div>

    <!-- Topics List -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-200 dark:border-gray-700 border-t-indigo-600"></div>
      <p class="mt-3 text-sm text-gray-600 dark:text-gray-400">Loading topics...</p>
    </div>

    <div v-else-if="topics.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <svg class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p class="text-gray-600 dark:text-gray-400">No topics found</p>
    </div>

    <!-- Browse by Class -->
    <template v-else-if="!activeClassName">
      <div v-if="classGroups.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <p class="text-gray-500 dark:text-gray-400">No topics match these filters.</p>
      </div>
      <template v-else>
        <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Browse by Class</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          <button
            v-for="group in classGroups"
            :key="group.name"
            @click="activeClassName = group.name"
            class="text-left bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-5 sm:p-6 group overflow-hidden relative"
          >
            <div
              class="absolute -right-6 -top-6 w-28 h-28 rounded-full opacity-10 bg-gradient-to-br transition-transform duration-300 group-hover:scale-125"
              :class="classPalette(group.name).vivid"
            ></div>
            <div
              class="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white shadow-sm flex-shrink-0 bg-gradient-to-br mb-3 sm:mb-4"
              :class="classPalette(group.name).vivid"
            >
              <svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              </svg>
            </div>
            <h3 class="relative text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {{ group.name }}
            </h3>
            <span
              class="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
              :class="classPalette(group.name).softText"
            >
              {{ group.topics.length }} {{ group.topics.length === 1 ? 'topic' : 'topics' }}
            </span>
          </button>
        </div>
      </template>
    </template>

    <!-- Class Topics -->
    <template v-else>
      <div class="flex items-center gap-2 mb-4">
        <button
          @click="activeClassName = null"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          All Classes
        </button>
        <span class="text-gray-300 dark:text-gray-600">/</span>
        <span class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ activeClassName }}</span>
      </div>

      <div v-if="activeClassTopics.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <div
          v-for="topic in activeClassTopics"
          :key="topic.id"
          class="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden"
          @click="openBuilder(topic.id)"
        >
          <div class="h-2.5 bg-gradient-to-r" :class="classPalette(activeClassName).vivid"></div>
          <div
            class="absolute -right-8 top-6 w-24 h-24 rounded-full opacity-[0.07] bg-gradient-to-br transition-transform duration-300 group-hover:scale-125 pointer-events-none"
            :class="classPalette(activeClassName).vivid"
          ></div>

          <div class="relative p-5 sm:p-6">
            <div class="flex items-start justify-between gap-2 mb-3">
              <span
                :class="[
                  'px-2.5 py-1 rounded-full text-xs font-semibold',
                  topic.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  topic.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                ]"
              >
                {{ topic.status.charAt(0).toUpperCase() + topic.status.slice(1) }}
              </span>
              <span class="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">{{ topic.total_pages }} pages</span>
            </div>

            <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {{ topic.title }}
            </h3>

            <p v-if="topic.description" class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
              {{ topic.description }}
            </p>

            <div class="flex flex-wrap items-center gap-1.5 mb-4">
              <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                {{ topic.subject_name || 'Unknown Subject' }}
              </span>
              <span v-if="topic.class_group_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                {{ topic.class_group_name }} (All Streams)
              </span>
              <span v-else-if="topic.class_stream_name" class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                {{ topic.class_name }} - {{ topic.class_stream_name }}
              </span>
              <span
                v-if="topic.content_group_id"
                class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                :title="`Linked to ${linkedTopicCount(topic)} other class/stream cop${linkedTopicCount(topic) === 1 ? 'y' : 'ies'} - editing content here updates them too`"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5m5.656-5.656l1.5-1.5a4 4 0 115.656 5.656l-3 3a4 4 0 01-5.656 0"></path>
                </svg>
                Linked
              </span>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
              <span class="text-xs text-gray-400 dark:text-gray-500">
                Updated {{ formatDate(topic.updated_at) }}
              </span>
              <div class="flex items-center gap-1">
                <button
                  @click.stop="editTopic(topic)"
                  class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title="Edit"
                >
                  <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button
                  @click.stop="openDuplicateModal(topic)"
                  class="p-2 hover:bg-indigo-100 dark:hover:bg-indigo-900 rounded-lg transition-colors"
                  title="Duplicate to another class/stream"
                >
                  <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
                <button
                  @click.stop="deleteTopic(topic.id)"
                  class="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                  title="Delete"
                >
                  <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <p class="text-gray-500 dark:text-gray-400">No eNotes topics in this class yet.</p>
      </div>
    </template>

    <!-- Create/Edit Topic Modal -->
    <div v-if="showTopicModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl md:max-w-3xl max-h-[90vh] flex flex-col">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 sm:px-6 py-5 flex-shrink-0 rounded-t-2xl">
          <div class="flex items-center justify-between gap-4">
            <div class="min-w-0">
              <h3 class="text-xl sm:text-2xl font-bold text-white truncate">
                {{ editingTopic ? 'Edit Topic' : 'Create New Topic' }}
              </h3>
              <p class="text-indigo-100 text-sm mt-1">
                {{ editingTopic ? 'Update this topic\'s details and learning outcomes.' : 'Pick the curriculum path this eNote covers.' }}
              </p>
            </div>
            <button
              @click="closeTopicModal"
              class="text-white/80 hover:text-white transition-colors flex-shrink-0"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Creating: driven by admin-authored curriculum data, cascading
             Subject -> Academic Year -> Class-Stream -> Term -> Theme/Branch -> Topic. -->
        <form v-if="!editingTopic" @submit.prevent="saveTopic" class="flex-1 flex flex-col min-h-0">
          <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            <div>
              <h4 class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-3 flex items-center">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                Curriculum Path
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                  <select
                    v-model="curriculumSelection.subject_id"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                    @change="onCurriculumStepChange('subject_id')"
                  >
                    <option value="">Select Subject</option>
                    <option v-for="s in curriculumMeta?.subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
                  </select>
                  <p v-if="curriculumMeta && curriculumMeta.subjects.length === 0" class="text-xs text-red-600 dark:text-red-400 mt-1">
                    No subjects available. Please ensure you are assigned to a department with subjects.
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Academic Year *</label>
                  <select
                    v-model="curriculumSelection.academic_year_id"
                    required
                    :disabled="!curriculumSelection.subject_id"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                    @change="onCurriculumStepChange('academic_year_id')"
                  >
                    <option value="">Select Academic Year</option>
                    <option v-for="y in curriculumMeta?.academic_years" :key="y.id" :value="y.id">{{ y.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Class-Stream *</label>
                  <select
                    v-model="curriculumSelection.class_id"
                    required
                    :disabled="!curriculumSelection.academic_year_id"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                    @change="onCurriculumStepChange('class_id')"
                  >
                    <option value="">Select Class-Stream</option>
                    <option v-for="c in curriculumMeta?.class_streams" :key="c.id" :value="c.id">{{ c.display_name }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Term *</label>
                  <select
                    v-model="curriculumSelection.term_id"
                    required
                    :disabled="!curriculumSelection.class_id"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                    @change="onCurriculumStepChange('term_id')"
                  >
                    <option value="">Select Term</option>
                    <option v-for="t in curriculumMeta?.terms" :key="t.id" :value="t.id">{{ t.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme / Branch *</label>
                  <select
                    v-model="curriculumSelection.theme_branch"
                    required
                    :disabled="!curriculumSelection.term_id"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                    @change="onCurriculumStepChange('theme_branch')"
                  >
                    <option value="">Select Theme/Branch</option>
                    <option v-for="theme in curriculumMeta?.themes" :key="theme" :value="theme">{{ theme }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Topic *</label>
                  <select
                    v-model="curriculumSelection.curriculum_topic_id"
                    required
                    :disabled="!curriculumSelection.theme_branch"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                    @change="onCurriculumTopicChosen"
                  >
                    <option value="">Select Topic</option>
                    <option v-for="t in curriculumMeta?.topics" :key="t.id" :value="t.id">{{ t.topic }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div v-if="curriculumTopicLoading" class="text-sm text-gray-500 dark:text-gray-400">
              Loading topic details...
            </div>

            <template v-if="selectedCurriculumTopic">
              <div>
                <h4 class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-3 flex items-center">
                  <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  eNote Details
                </h4>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">eNote Title *</label>
                    <input
                      v-model="topicForm.title"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Competence</label>
                    <p class="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900/40 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                      {{ selectedCurriculumTopic.competence }}
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Learning Outcomes</label>
                    <ol
                      v-if="selectedCurriculumTopic.learning_outcomes.length"
                      class="space-y-1.5 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700"
                    >
                      <li
                        v-for="(o, i) in selectedCurriculumTopic.learning_outcomes"
                        :key="i"
                        class="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <span class="mt-0.5 w-5 h-5 rounded-full bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[11px] font-semibold flex items-center justify-center flex-shrink-0 border border-gray-200 dark:border-gray-600">
                          {{ i + 1 }}
                        </span>
                        <span class="flex-1 pt-px">{{ o }}</span>
                      </li>
                    </ol>
                    <p v-else class="text-xs text-gray-400">None configured.</p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                    <select
                      v-model="topicForm.status"
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>
            </template>

            <div v-else class="text-sm text-gray-500 dark:text-gray-400 py-6 text-center border border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
              Select a Subject, Academic Year, Class-Stream, Term, Theme/Branch, and Topic above to continue.
            </div>
          </div>

          <div class="px-5 sm:px-6 pt-4 flex-shrink-0" v-if="topicSaveError">
            <p class="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-2.5">{{ topicSaveError }}</p>
          </div>
          <div class="px-5 sm:px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-3 flex-shrink-0 rounded-b-2xl">
            <button
              type="button"
              @click="closeTopicModal"
              class="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving || !selectedCurriculumTopic"
              class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {{ saving ? 'Saving...' : 'Create Topic' }}
            </button>
          </div>
        </form>

        <!-- Editing an existing topic: unchanged free-form metadata edit. -->
        <form v-else @submit.prevent="saveTopic" class="flex-1 flex flex-col min-h-0">
          <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            <div>
              <h4 class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-3 flex items-center">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Topic Details
              </h4>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Topic *</label>
                  <input
                    v-model="topicForm.title"
                    type="text"
                    required
                    placeholder="Enter topic..."
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Competency</label>
                  <textarea
                    v-model="topicForm.description"
                    rows="3"
                    placeholder="Enter competency..."
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Learning Outcomes</label>
                  <input
                    v-model="learningOutcomeDraft"
                    type="text"
                    placeholder="Type an outcome and press Enter..."
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                    @keydown.enter.prevent="addLearningOutcome"
                  >
                  <ol v-if="topicForm.learning_outcomes.length" class="mt-3 space-y-1.5">
                    <li
                      v-for="(outcome, index) in topicForm.learning_outcomes"
                      :key="index"
                      class="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <span class="mt-0.5 w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                        {{ index + 1 }}
                      </span>
                      <span class="flex-1 pt-px">{{ outcome }}</span>
                      <button
                        type="button"
                        @click="removeLearningOutcome(index)"
                        class="p-1 -m-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors flex-shrink-0"
                        title="Remove"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </li>
                  </ol>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                    <select
                      v-model="topicForm.subject_id"
                      required
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                      :disabled="!assignments?.subjects || assignments.subjects.length === 0"
                    >
                      <option value="">Select Subject</option>
                      <option v-for="subject in assignments?.subjects" :key="subject.id" :value="subject.id">
                        {{ subject.name }}
                      </option>
                    </select>
                    <p v-if="!assignments?.subjects || assignments.subjects.length === 0" class="text-xs text-red-600 dark:text-red-400 mt-1">
                      No subjects available. Please ensure you are assigned to a department with subjects.
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Class *</label>
                    <TeacherClassSelector v-model="topicForm.classTarget" />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select
                    v-model="topicForm.status"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="px-5 sm:px-6 pt-4 flex-shrink-0" v-if="topicSaveError">
            <p class="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-2.5">{{ topicSaveError }}</p>
          </div>
          <div class="px-5 sm:px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-3 flex-shrink-0 rounded-b-2xl">
            <button
              type="button"
              @click="closeTopicModal"
              class="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {{ saving ? 'Saving...' : 'Update Topic' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Duplicate Topic Modal -->
    <div v-if="showDuplicateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Duplicate Topic</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">{{ duplicatingTopic?.title }}</p>
          </div>
          <button
            @click="closeDuplicateModal"
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
          >
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Select the class stream(s) to copy this topic and all its pages to. Each copy is created as a
            <span class="font-medium">draft</span> so you can review it before publishing.
          </p>

          <div v-if="duplicateGroups.length === 0" class="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
            No classes found in your department.
          </div>

          <div v-else class="space-y-1 border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden">
            <div v-for="group in duplicateGroups" :key="group.name + group.level" class="py-1">
              <label class="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 cursor-pointer">
                <input type="checkbox" v-model="duplicateChecked[`all:${group.name}`]" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                {{ group.name }} (All Streams)
              </label>
              <label
                v-for="stream in group.streams"
                :key="stream.id"
                class="flex items-center gap-2.5 px-3 py-2 pl-8 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <input type="checkbox" v-model="duplicateChecked[`stream:${stream.id}`]" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                {{ group.name }} - {{ stream.stream_name || 'N/A' }}
              </label>
            </div>
          </div>

          <div v-if="duplicateResult" class="mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-sm text-green-800 dark:text-green-300">
            Created {{ duplicateResult.created }} duplicate(s){{ duplicateResult.skipped ? `, skipped ${duplicateResult.skipped}` : '' }}.
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="closeDuplicateModal"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {{ duplicateResult ? 'Close' : 'Cancel' }}
            </button>
            <button
              v-if="!duplicateResult"
              type="button"
              :disabled="duplicating || selectedDuplicateTargetCount === 0"
              @click="confirmDuplicate"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ duplicating ? 'Duplicating...' : `Duplicate (${selectedDuplicateTargetCount})` }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import type {
  ENoteTopic,
  ENoteDashboardStats,
  ENoteAssignments,
  ENoteTopicForm
} from '@/types/enotes'
import TeacherClassSelector from '@/components/teacher/TeacherClassSelector.vue'

interface CurriculumMetaOption {
  id: number
  name: string
}

interface CurriculumClassStreamMetaOption {
  id: number
  display_name: string
}

interface CurriculumTopicMetaOption {
  id: number
  topic: string
}

interface CurriculumMeta {
  subjects: CurriculumMetaOption[]
  academic_years: CurriculumMetaOption[]
  class_streams: CurriculumClassStreamMetaOption[]
  terms: CurriculumMetaOption[]
  themes: string[]
  topics: CurriculumTopicMetaOption[]
}

interface SelectedCurriculumTopic {
  subject_id: number
  class_id: number
  competence: string
  learning_outcomes: string[]
}

const router = useRouter()

const API_BASE = '/api'

const stats = ref<ENoteDashboardStats | null>(null)
const topics = ref<ENoteTopic[]>([])
const assignments = ref<ENoteAssignments | null>(null)
const assignmentsError = ref<string | null>(null)
const loading = ref(false)
const saving = ref(false)
const topicSaveError = ref<string | null>(null)

const statusFilter = ref('')
const subjectFilter = ref('')
const classFilter = ref('')
const streamFilter = ref('')

const showTopicModal = ref(false)
const editingTopic = ref<ENoteTopic | null>(null)
const learningOutcomeDraft = ref('')
const topicForm = ref<ENoteTopicForm>({
  title: '',
  description: '',
  learning_outcomes: [],
  subject_id: '',
  classTarget: { scope: 'stream', class_id: null, class_group_name: null },
  status: 'draft'
})

// Curriculum-driven "Create New Topic" flow: Subject -> Academic Year -> Class-Stream -> Term ->
// Theme/Branch -> Topic, each option list re-fetched from admin-authored curriculum data scoped
// to the teacher's own department (see Teacher/ENoteCurriculumController::meta()). Only used when
// creating - editing an existing topic keeps the original free-form metadata form below.
const curriculumMeta = ref<CurriculumMeta | null>(null)
const curriculumSelection = ref({
  subject_id: '' as number | '',
  academic_year_id: '' as number | '',
  class_id: '' as number | '',
  term_id: '' as number | '',
  theme_branch: '',
  curriculum_topic_id: '' as number | ''
})
const curriculumTopicLoading = ref(false)
const selectedCurriculumTopic = ref<SelectedCurriculumTopic | null>(null)

const emptyCurriculumSelection = () => ({
  subject_id: '' as number | '',
  academic_year_id: '' as number | '',
  class_id: '' as number | '',
  term_id: '' as number | '',
  theme_branch: '',
  curriculum_topic_id: '' as number | ''
})

const loadCurriculumMeta = async () => {
  try {
    const params: Record<string, string> = {}
    if (curriculumSelection.value.subject_id) params.subject_id = String(curriculumSelection.value.subject_id)
    if (curriculumSelection.value.academic_year_id) params.academic_year_id = String(curriculumSelection.value.academic_year_id)
    if (curriculumSelection.value.class_id) params.class_id = String(curriculumSelection.value.class_id)
    if (curriculumSelection.value.term_id) params.term_id = String(curriculumSelection.value.term_id)
    if (curriculumSelection.value.theme_branch) params.theme_branch = curriculumSelection.value.theme_branch

    const response = await axios.get(`${API_BASE}/teacher/enotes/curriculum/meta`, { params })
    if (response.data.success) {
      curriculumMeta.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to load curriculum meta:', error)
  }
}

// Changing an earlier cascade step invalidates every step after it (and the chosen topic), since
// those option lists were fetched for the old selection.
const onCurriculumStepChange = async (changedField: 'subject_id' | 'academic_year_id' | 'class_id' | 'term_id' | 'theme_branch') => {
  if (changedField === 'subject_id') {
    curriculumSelection.value.academic_year_id = ''
    curriculumSelection.value.class_id = ''
    curriculumSelection.value.term_id = ''
    curriculumSelection.value.theme_branch = ''
  } else if (changedField === 'academic_year_id') {
    curriculumSelection.value.class_id = ''
    curriculumSelection.value.term_id = ''
    curriculumSelection.value.theme_branch = ''
  } else if (changedField === 'class_id') {
    curriculumSelection.value.term_id = ''
    curriculumSelection.value.theme_branch = ''
  } else if (changedField === 'term_id') {
    curriculumSelection.value.theme_branch = ''
  }

  curriculumSelection.value.curriculum_topic_id = ''
  selectedCurriculumTopic.value = null
  await loadCurriculumMeta()
}

const onCurriculumTopicChosen = async () => {
  selectedCurriculumTopic.value = null
  if (!curriculumSelection.value.curriculum_topic_id) return

  curriculumTopicLoading.value = true
  try {
    const response = await axios.get(`${API_BASE}/teacher/enotes/curriculum/topics/${curriculumSelection.value.curriculum_topic_id}`)
    if (response.data.success) {
      const data = response.data.data
      selectedCurriculumTopic.value = {
        subject_id: data.subject_id,
        class_id: data.class_id,
        competence: data.competence,
        learning_outcomes: data.learning_outcomes || []
      }
      topicForm.value.title = data.topic
      topicForm.value.description = data.competence
      topicForm.value.learning_outcomes = data.learning_outcomes || []
      topicForm.value.subject_id = String(data.subject_id)
      topicForm.value.classTarget = { scope: 'stream', class_id: data.class_id, class_group_name: null }
    }
  } catch (error) {
    console.error('Failed to load curriculum topic detail:', error)
  } finally {
    curriculumTopicLoading.value = false
  }
}

const addLearningOutcome = () => {
  const text = learningOutcomeDraft.value.trim()
  if (!text) return
  topicForm.value.learning_outcomes.push(text)
  learningOutcomeDraft.value = ''
}

const removeLearningOutcome = (index: number) => {
  topicForm.value.learning_outcomes.splice(index, 1)
}

const streamOptions = computed(() => {
  const streams = new Set<string>()
  assignments.value?.classes.forEach(cls => {
    if (cls.stream_name) streams.add(cls.stream_name)
  })
  return Array.from(streams).sort()
})

const filteredTopics = computed(() => {
  return topics.value.filter(topic => {
    const matchesStatus = !statusFilter.value || topic.status === statusFilter.value
    const matchesSubject = !subjectFilter.value || topic.subject_id === parseInt(subjectFilter.value)
    const matchesClass = !classFilter.value || topic.class_id === parseInt(classFilter.value)
    const matchesStream = !streamFilter.value || topic.class_stream_name === streamFilter.value
    return matchesStatus && matchesSubject && matchesClass && matchesStream
  })
})

// Count of other loaded topics sharing this one's content_group_id - only a hint for the "Linked"
// badge tooltip, so it can under-count if a sibling isn't on the current page/filter view.
const linkedTopicCount = (topic: ENoteTopic): number => {
  if (!topic.content_group_id) return 0
  return topics.value.filter(t => t.id !== topic.id && t.content_group_id === topic.content_group_id).length
}

// Browse-by-class landing: topics are grouped by class level (e.g. "S.1") regardless of stream -
// a topic targeting a specific stream and one targeting "All Streams" of the same class both land
// in the same class card, since a teacher thinking "show me my S.1 topics" doesn't care which.
interface ClassTopicGroup {
  name: string
  topics: ENoteTopic[]
}

const activeClassName = ref<string | null>(null)

const classGroups = computed<ClassTopicGroup[]>(() => {
  const map = new Map<string, ClassTopicGroup>()
  for (const topic of filteredTopics.value) {
    const name = topic.class_group_name || topic.class_name || 'Unassigned'
    if (!map.has(name)) map.set(name, { name, topics: [] })
    map.get(name)!.topics.push(topic)
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
})

const activeClassTopics = computed(() => classGroups.value.find(g => g.name === activeClassName.value)?.topics ?? [])

// Deterministic color per class name (not a fixed lookup - department class names vary), so each
// class card/topic-card banner gets a distinct but stable palette across reloads.
const classPalettes = [
  { vivid: 'from-amber-500 to-orange-600', softText: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  { vivid: 'from-blue-500 to-cyan-600', softText: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { vivid: 'from-indigo-500 to-purple-600', softText: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
  { vivid: 'from-emerald-500 to-teal-600', softText: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { vivid: 'from-rose-500 to-pink-600', softText: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
  { vivid: 'from-violet-500 to-fuchsia-600', softText: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' }
]
const classPalette = (name: string) => {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  return classPalettes[hash % classPalettes.length]
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const loadDashboard = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${API_BASE}/teacher/enotes/dashboard`)
    if (response.data.success) {
      stats.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to load dashboard:', error)
  } finally {
    loading.value = false
  }
}

const loadTopics = async () => {
  try {
    loading.value = true
    const params: Record<string, string> = {}
    if (statusFilter.value) params.status = statusFilter.value
    if (subjectFilter.value) params.subject_id = subjectFilter.value

    const response = await axios.get(`${API_BASE}/teacher/enotes/topics`, { params })
    if (response.data.success) {
      topics.value = response.data.data.topics
    }
  } catch (error) {
    console.error('Failed to load topics:', error)
  } finally {
    loading.value = false
  }
}

const loadAssignments = async () => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/enotes/assignments`)
    console.log('Assignments full response:', response)
    console.log('Assignments response.data:', response.data)
    console.log('Assignments response.data.success:', response.data.success)
    console.log('Assignments response.data.data:', response.data.data)
    
    if (response.data.success) {
      assignments.value = response.data.data
      console.log('Subjects loaded:', response.data.data.subjects)
      console.log('Classes loaded:', response.data.data.classes)
      console.log('Department ID:', response.data.data.department_id)
      assignmentsError.value = null
    } else {
      console.error('Assignments API returned error:', response.data)
      assignmentsError.value = response.data.message || 'Failed to load assignments'
    }
  } catch (error: any) {
    console.error('Failed to load assignments:', error)
    console.error('Error response:', error.response)
    console.error('Error message:', error.message)
    assignmentsError.value = error.response?.data?.message || 'Failed to load assignments. Please ensure you are assigned to a department.'
  }
}

const openCreateModal = () => {
  editingTopic.value = null
  learningOutcomeDraft.value = ''
  topicForm.value = {
    title: '',
    description: '',
    learning_outcomes: [],
    subject_id: '',
    classTarget: { scope: 'stream', class_id: null, class_group_name: null },
    status: 'draft'
  }
  curriculumSelection.value = emptyCurriculumSelection()
  selectedCurriculumTopic.value = null
  curriculumMeta.value = null
  topicSaveError.value = null
  showTopicModal.value = true
  loadCurriculumMeta()
}

const editTopic = (topic: ENoteTopic) => {
  editingTopic.value = topic
  learningOutcomeDraft.value = ''
  topicForm.value = {
    title: topic.title,
    description: topic.description || '',
    learning_outcomes: [...(topic.learning_outcomes || [])],
    subject_id: topic.subject_id.toString(),
    classTarget: topic.class_group_name
      ? { scope: 'all_streams', class_id: null, class_group_name: topic.class_group_name }
      : { scope: 'stream', class_id: topic.class_id, class_group_name: null },
    status: topic.status
  }
  topicSaveError.value = null
  showTopicModal.value = true
}

const closeTopicModal = () => {
  showTopicModal.value = false
  editingTopic.value = null
  learningOutcomeDraft.value = ''
  topicSaveError.value = null
}

const saveTopic = async () => {
  topicSaveError.value = null
  try {
    saving.value = true

    const payload = {
      title: topicForm.value.title,
      description: topicForm.value.description,
      learning_outcomes: topicForm.value.learning_outcomes,
      subject_id: topicForm.value.subject_id,
      status: topicForm.value.status,
      scope: topicForm.value.classTarget.scope,
      class_id: topicForm.value.classTarget.class_id,
      class_group_name: topicForm.value.classTarget.class_group_name
    }

    if (editingTopic.value) {
      await axios.put(`${API_BASE}/teacher/enotes/topics/${editingTopic.value.id}`, payload)
    } else {
      await axios.post(`${API_BASE}/teacher/enotes/topics`, payload)
    }

    closeTopicModal()
    await loadTopics()
    await loadDashboard()
  } catch (error: any) {
    console.error('Failed to save topic:', error)
    // Previously silent on failure - the button looked "broken" because a rejected save (e.g. a
    // validation error) never told the teacher anything went wrong.
    const errors = error.response?.data?.errors
    topicSaveError.value = errors
      ? Object.values(errors).join(' ')
      : (error.response?.data?.message || 'Failed to save topic. Please try again.')
  } finally {
    saving.value = false
  }
}

const deleteTopic = async (id: number) => {
  if (!confirm('Are you sure you want to delete this topic?')) return

  try {
    await axios.delete(`${API_BASE}/teacher/enotes/topics/${id}`)
    await loadTopics()
    await loadDashboard()
  } catch (error) {
    console.error('Failed to delete topic:', error)
  }
}

const openBuilder = (topicId: number) => {
  router.push(`/teacher/enotes/builder/${topicId}`)
}

// Duplicate-to-another-class/stream modal. Reuses assignments.value.classes (already loaded for
// the page filters) grouped the same way TeacherClassSelector groups them, but with checkboxes
// since a topic can be duplicated to more than one target at once.
const showDuplicateModal = ref(false)
const duplicatingTopic = ref<ENoteTopic | null>(null)
const duplicateChecked = ref<Record<string, boolean>>({})
const duplicating = ref(false)
const duplicateResult = ref<{ created: number; skipped: number } | null>(null)

interface DuplicateClassGroup {
  name: string
  level: string
  streams: Array<{ id: number; stream_name?: string }>
}

const duplicateGroups = computed<DuplicateClassGroup[]>(() => {
  const map = new Map<string, DuplicateClassGroup>()
  for (const cls of assignments.value?.classes || []) {
    const key = `${cls.name}|${cls.level}`
    if (!map.has(key)) map.set(key, { name: cls.name, level: cls.level, streams: [] })
    map.get(key)!.streams.push(cls)
  }
  return Array.from(map.values())
})

const selectedDuplicateTargetCount = computed(() => Object.values(duplicateChecked.value).filter(Boolean).length)

const openDuplicateModal = (topic: ENoteTopic) => {
  duplicatingTopic.value = topic
  duplicateChecked.value = {}
  duplicateResult.value = null
  showDuplicateModal.value = true
}

const closeDuplicateModal = () => {
  showDuplicateModal.value = false
  duplicatingTopic.value = null
}

const confirmDuplicate = async () => {
  if (!duplicatingTopic.value) return

  const targets: Array<{ scope: string; class_id: number | null; class_group_name: string | null }> = []
  for (const group of duplicateGroups.value) {
    if (duplicateChecked.value[`all:${group.name}`]) {
      targets.push({ scope: 'all_streams', class_id: null, class_group_name: group.name })
    }
    for (const stream of group.streams) {
      if (duplicateChecked.value[`stream:${stream.id}`]) {
        targets.push({ scope: 'stream', class_id: stream.id, class_group_name: null })
      }
    }
  }
  if (targets.length === 0) return

  duplicating.value = true
  try {
    const response = await axios.post(`${API_BASE}/teacher/enotes/topics/${duplicatingTopic.value.id}/duplicate`, { targets })
    if (response.data.success) {
      duplicateResult.value = {
        created: response.data.data.created.length,
        skipped: response.data.data.skipped.length
      }
      await loadTopics()
      await loadDashboard()
    }
  } catch (error) {
    console.error('Failed to duplicate topic:', error)
  } finally {
    duplicating.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    loadDashboard(),
    loadTopics(),
    loadAssignments()
  ])
})
</script>
