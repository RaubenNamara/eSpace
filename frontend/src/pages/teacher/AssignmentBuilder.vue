<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Toast Notification -->
    <transition name="toast">
      <div
        v-if="toast"
        class="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border p-4 flex items-center gap-4 min-w-[320px] max-w-md"
        :class="toast.type === 'success' ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'"
      >
        <div
          class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          :class="toast.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'"
        >
          <svg v-if="toast.type === 'success'" class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg v-else class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"></path>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-gray-900 dark:text-white">{{ toast.type === 'success' ? 'Success' : 'Please check' }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ toast.message }}</p>
        </div>
        <button
          @click="toast = null"
          class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </transition>

    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-3 sm:py-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div class="flex items-center space-x-4 min-w-0">
            <button
              @click="router.push('/teacher/assignments')"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
            >
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </button>
            <div class="min-w-0">
              <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                {{ isPreview ? 'Preview Assignment' : (isEdit ? 'Edit Assignment' : 'Create Assignment') }}
              </h1>
              <p class="text-sm text-gray-600 dark:text-gray-400 truncate">
                {{ isPreview ? 'View assignment details and questions' : (isEdit ? 'Modify your assignment and questions' : 'Build a new assignment with questions') }}
              </p>
              <p v-if="!isPreview && form.title" class="text-xs text-indigo-600 dark:text-indigo-400 truncate mt-0.5">
                Title (auto): {{ form.title }}
              </p>
              <p v-else-if="!isPreview" class="text-xs text-gray-400 truncate mt-0.5">
                Title will be set automatically once you choose a Topic (LOA) or Topic(s) (AOI/EOC) below.
              </p>
            </div>
          </div>
          <div class="flex items-center flex-wrap gap-2 sm:gap-3">
            <button
              v-if="isPreview"
              @click="router.push(`/teacher/assignments/${route.params.id}/edit`)"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              <span>Edit Assignment</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Warning Banner -->
    <div v-if="marksMismatch && questions.length > 0" class="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
      <div class="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-3">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <p class="text-sm text-yellow-800 dark:text-yellow-200">
            Total question marks ({{ calculatedMarks }}) do not match assignment total marks ({{ form.total_marks }}). Please adjust before publishing.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 xl:grid xl:grid-cols-[1fr_300px] xl:gap-6 xl:items-start">
      <div class="space-y-4 sm:space-y-6">

        <!-- Assessment Details (hidden in preview mode) -->
        <div v-if="!isPreview" class="space-y-4 sm:space-y-6">

          <!-- Target Audience -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <span class="w-8 h-8 mr-2.5 rounded-lg bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </span>
                Target Audience
              </h2>
            </div>
            <div class="p-4 sm:p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Academic Year</label>
                <select
                  v-model="form.academic_year"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                  :disabled="loadingAcademicYears"
                >
                  <option value="">Select academic year</option>
                  <option v-for="year in academicYears" :key="year.academic_year" :value="year.academic_year">
                    {{ year.academic_year }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject (Department) *</label>
                <select
                  v-model="form.subject_id"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                  :disabled="loadingSubjects"
                >
                  <option value="">Select subject</option>
                  <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                    {{ subject.name }}
                  </option>
                </select>
              </div>

              <div ref="classDropdownRef" class="relative">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class-Stream(s) *</label>
                <div v-if="loadingClasses" class="text-sm text-gray-500 dark:text-gray-400">Loading classes...</div>
                <div v-else-if="classGroups.length === 0" class="text-sm text-gray-500 dark:text-gray-400">No classes found in your department.</div>
                <template v-else>
                  <button
                    type="button"
                    @click="classDropdownOpen = !classDropdownOpen"
                    class="w-full flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-left focus:ring-2 focus:ring-indigo-500"
                  >
                    <span class="truncate" :class="selectedClassIds.length ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'">
                      {{ classDropdownLabel }}
                    </span>
                    <svg class="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  <div
                    v-if="classDropdownOpen"
                    class="absolute z-20 mt-1 w-full max-h-64 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1"
                  >
                    <div v-for="group in visibleClassGroups" :key="group.name + group.level">
                      <label class="flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm font-medium text-gray-800 dark:text-gray-200">
                        <input
                          type="checkbox"
                          :checked="group.streams.every(s => classChecked[s.id])"
                          @change="toggleAllStreamsInGroup(group, ($event.target as HTMLInputElement).checked)"
                          class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        >
                        {{ group.name }} (All Streams)
                      </label>
                      <label
                        v-for="stream in group.streams"
                        :key="stream.id"
                        class="flex items-center gap-2.5 px-3 py-2 pl-8 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
                      >
                        <input type="checkbox" v-model="classChecked[stream.id]" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        {{ group.name }} - {{ stream.stream_name || 'N/A' }}
                      </label>
                    </div>
                  </div>
                </template>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Checked streams will all see this assignment once published.
                  <template v-if="selectedClassIds.length && visibleClassGroups.length === 1 && classGroups.length > 1">
                    Uncheck all to pick a different class.
                  </template>
                </p>
              </div>
            </div>
          </div>

          <!-- Curriculum Alignment (LOA/AOI/EOC) -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <span class="w-8 h-8 mr-2.5 rounded-lg bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </span>
                Curriculum Alignment *
              </h2>
            </div>
            <div class="p-4 sm:p-6 space-y-4">
              <div v-if="!form.subject_id || !form.classTarget.class_id" class="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/40 rounded-lg p-3.5">
                <svg class="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Select a Subject and a specific Class-Stream above to align this assessment with the curriculum Admin has configured (LOA/AOI/EOC).</span>
              </div>
              <template v-else>
                <!-- Academic Year is already chosen once, above in Target Audience - reused here
                     automatically instead of asking again. -->
                <div v-if="curriculumMissingYear" class="flex items-start gap-3 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3.5">
                  <svg class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  <span>No curriculum has been configured for Academic Year {{ form.academic_year || '—' }} yet. Choose a different Academic Year above, or contact the administrator.</span>
                </div>
                <template v-else>
                  <div class="flex flex-wrap items-center justify-between gap-3">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      Academic Year {{ form.academic_year }}
                    </span>
                    <div class="flex-1 min-w-[160px] sm:max-w-[220px]">
                      <select
                        v-model="curriculumSelection.term_id"
                        :disabled="!curriculumSelection.academic_year_id"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 text-sm"
                        @change="onCurriculumStepChange('term_id')"
                      >
                        <option value="">Select term</option>
                        <option v-for="t in curriculumMeta?.terms" :key="t.id" :value="t.id">{{ t.name }}</option>
                      </select>
                    </div>
                  </div>
                </template>

                <!-- Assessment Category -->
                <div v-if="curriculumSelection.term_id">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assessment Category</label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      v-for="opt in ASSESSMENT_CATEGORIES"
                      :key="opt.value"
                      type="button"
                      @click="selectAssessmentCategory(opt.value)"
                      class="relative text-left p-3 sm:p-4 rounded-xl border-2 transition-colors"
                      :class="form.assessment_category === opt.value
                        ? CATEGORY_ACTIVE_CLASSES[opt.value]
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'"
                    >
                      <svg v-if="form.assessment_category === opt.value" class="w-4 h-4 absolute top-3 right-3" :class="CATEGORY_TEXT_CLASSES[opt.value]" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="w-8 h-8 mb-2 rounded-lg flex items-center justify-center" :class="CATEGORY_ICON_BG[opt.value]">
                        <svg class="w-4 h-4" :class="CATEGORY_TEXT_CLASSES[opt.value]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="CATEGORY_ICON_PATH[opt.value]"></path>
                        </svg>
                      </span>
                      <p class="font-semibold text-gray-900 dark:text-white">
                        <span :class="CATEGORY_TEXT_CLASSES[opt.value]">{{ opt.value }}</span> &ndash; {{ opt.label }}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ opt.description }}</p>
                    </button>
                  </div>
                </div>

                <!-- LOA scope: Theme/Branch -> Topic -> Competence -> Learning Outcomes -->
                <div v-if="form.assessment_category === 'LOA'" class="space-y-4 pt-4 mt-2 border-t-2 border-blue-100 dark:border-blue-900/40">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Theme / Branch</label>
                      <select
                        v-model="curriculumSelection.theme_branch"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        @change="onCurriculumStepChange('theme_branch')"
                      >
                        <option value="">Select theme/branch</option>
                        <option v-for="theme in curriculumMeta?.themes" :key="theme" :value="theme">{{ theme }}</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topic</label>
                      <select
                        v-model="curriculumSelection.curriculum_topic_id"
                        :disabled="!curriculumSelection.theme_branch"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                        @change="onLoaTopicChosen"
                      >
                        <option value="">Select topic</option>
                        <option v-for="t in curriculumMeta?.topics" :key="t.id" :value="t.id">{{ t.topic }}</option>
                      </select>
                    </div>
                  </div>

                  <div v-if="loaTopicDetail" class="space-y-3">
                    <div>
                      <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Competence</p>
                      <p class="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/40 rounded-lg p-3">{{ loaTopicDetail.competence }}</p>
                    </div>
                    <div>
                      <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Select Learning Outcome(s) to Assess *</p>
                      <div class="space-y-1.5 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                        <label
                          v-for="(o, i) in loaTopicDetail.learning_outcomes"
                          :key="o.id"
                          class="flex items-start gap-2.5 px-2 py-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
                        >
                          <input type="checkbox" v-model="selectedLearningOutcomeIds[o.id]" class="mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                          <span>{{ i + 1 }}. {{ o.learning_outcome }}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- AOI scope: Topic checkboxes -->
                <div v-if="form.assessment_category === 'AOI'" class="pt-4 mt-2 border-t-2 border-violet-100 dark:border-violet-900/40">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Topic(s) *</label>
                  <div v-if="!curriculumMeta?.topics?.length" class="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/40 rounded-lg p-3">
                    No curriculum topics have been configured for this Subject/Class-Stream/Term. Contact the administrator.
                  </div>
                  <div v-else class="space-y-1.5 border border-gray-200 dark:border-gray-700 rounded-lg p-2 max-h-56 overflow-y-auto">
                    <label
                      v-for="t in curriculumMeta.topics"
                      :key="t.id"
                      class="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
                    >
                      <input
                        type="checkbox"
                        :checked="!!selectedTopicIds[t.id]"
                        @change="toggleAoiTopic(t.id, ($event.target as HTMLInputElement).checked)"
                        class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      >
                      {{ t.topic }}
                    </label>
                  </div>
                </div>

                <!-- EOC scope: pick one admin-defined Construct (department + Subject + Level scoped) -->
                <div v-if="form.assessment_category === 'EOC'" class="pt-4 mt-2 border-t-2 border-fuchsia-100 dark:border-fuchsia-900/40 space-y-3">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Construct *</label>
                  <div v-if="!selectedClassLevel" class="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/40 rounded-lg p-3">
                    Select a Class-Stream above to determine the Level (O Level / A Level) before choosing a Construct.
                  </div>
                  <div v-else-if="loadingEocConstructs" class="flex items-center gap-2 text-sm text-gray-400 py-2">
                    <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                    Loading constructs...
                  </div>
                  <div v-else-if="eocConstructs.length === 0" class="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/40 rounded-lg p-3">
                    No constructs found for this Subject/{{ selectedClassLevel }} in your department. Contact the administrator.
                  </div>
                  <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      v-for="c in eocConstructs"
                      :key="c.id"
                      type="button"
                      @click="selectEocConstruct(c.id)"
                      class="relative text-left p-3 rounded-xl border-2 transition-colors"
                      :class="selectedConstructId === c.id
                        ? 'border-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-fuchsia-300 dark:hover:border-fuchsia-700'"
                    >
                      <svg v-if="selectedConstructId === c.id" class="w-4 h-4 absolute top-3 right-3 text-fuchsia-600 dark:text-fuchsia-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path>
                      </svg>
                      <p class="font-semibold text-sm text-gray-900 dark:text-white pr-5">{{ c.name }}</p>
                      <div class="flex flex-wrap gap-1.5 mt-1.5">
                        <span class="tag-pill bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300">{{ c.assessment_objective }}</span>
                        <span class="tag-pill bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ c.topic_count ?? 0 }} topic{{ (c.topic_count ?? 0) === 1 ? '' : 's' }}</span>
                      </div>
                    </button>
                  </div>

                  <div v-if="selectedConstructId">
                    <p v-if="loadingEocConstructTopics" class="text-sm text-gray-400">Loading topics...</p>
                    <template v-else>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        All {{ eocConstructTopics.length }} topic{{ eocConstructTopics.length === 1 ? '' : 's' }} from this Construct will be included.
                      </p>
                      <div class="space-y-2 border border-gray-200 dark:border-gray-700 rounded-lg p-3 max-h-72 overflow-y-auto">
                        <div v-for="topic in eocConstructTopics" :key="topic.id" class="px-2 py-1.5">
                          <div class="flex items-start gap-2.5">
                            <div class="min-w-0 flex-1">
                              <p class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ topic.topic }}</p>
                              <p class="text-xs text-gray-400">{{ topic.theme_branch }}</p>
                            </div>
                            <button
                              type="button"
                              @click="toggleEocOutcomesReveal(topic.id)"
                              title="Show/hide learning outcomes"
                              class="p-1 flex-shrink-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <svg class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': isEocOutcomesRevealed(topic.id) }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                            </button>
                          </div>
                          <div v-if="isEocOutcomesRevealed(topic.id)" class="mt-2 ml-0 pl-2 border-l-2 border-indigo-100 dark:border-indigo-900">
                            <p v-if="topic.learning_outcomes.length === 0" class="text-xs text-gray-400">No learning outcomes recorded for this topic.</p>
                            <ol v-else class="text-xs text-gray-600 dark:text-gray-300 list-decimal list-inside space-y-0.5">
                              <li v-for="(lo, i) in topic.learning_outcomes" :key="i">{{ lo }}</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <!-- Marks -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <span class="w-8 h-8 mr-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </span>
                Marks
              </h2>
            </div>
            <div class="p-4 sm:p-6 space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Marks *</label>
                  <input
                    v-model.number="form.total_marks"
                    type="number"
                    min="1"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="100"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pass Mark</label>
                  <input
                    v-model.number="form.pass_mark"
                    type="number"
                    min="0"
                    :max="form.total_marks"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="50"
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Schedule -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <span class="w-8 h-8 mr-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </span>
                Schedule
              </h2>
            </div>
            <div class="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Opens</label>
                <input
                  v-model="form.open_at"
                  type="datetime-local"
                  class="w-full min-w-0 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline *</label>
                <input
                  v-model="form.due_date"
                  type="datetime-local"
                  class="w-full min-w-0 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (min)</label>
                <input
                  v-model.number="form.duration_minutes"
                  type="number"
                  min="1"
                  class="w-full min-w-0 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="60"
                >
              </div>
            </div>
          </div>

          <!-- Settings -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <span class="w-8 h-8 mr-2.5 rounded-lg bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </span>
                Settings
              </h2>
              <label class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                Attempts
                <input
                  v-model.number="form.attempts_allowed"
                  type="number"
                  min="1"
                  class="w-16 px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                >
              </label>
            </div>
            <div class="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              <label class="flex items-center gap-2 px-3 py-2.5 sm:px-2.5 sm:py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <input v-model="form.allow_late_submission" type="checkbox" class="w-4 h-4 sm:w-3.5 sm:h-3.5 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0">
                <span class="text-sm sm:text-xs text-gray-700 dark:text-gray-300 leading-tight">Late submission</span>
              </label>
              <label class="flex items-center gap-2 px-3 py-2.5 sm:px-2.5 sm:py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <input v-model="form.shuffle_questions" type="checkbox" class="w-4 h-4 sm:w-3.5 sm:h-3.5 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0">
                <span class="text-sm sm:text-xs text-gray-700 dark:text-gray-300 leading-tight">Shuffle questions</span>
              </label>
              <label class="flex items-center gap-2 px-3 py-2.5 sm:px-2.5 sm:py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <input v-model="form.shuffle_options" type="checkbox" class="w-4 h-4 sm:w-3.5 sm:h-3.5 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0">
                <span class="text-sm sm:text-xs text-gray-700 dark:text-gray-300 leading-tight">Shuffle options</span>
              </label>
              <label class="flex items-center gap-2 px-3 py-2.5 sm:px-2.5 sm:py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <input v-model="form.allow_save_resume" type="checkbox" class="w-4 h-4 sm:w-3.5 sm:h-3.5 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0">
                <span class="text-sm sm:text-xs text-gray-700 dark:text-gray-300 leading-tight">Save &amp; continue</span>
              </label>
              <label class="flex items-center gap-2 px-3 py-2.5 sm:px-2.5 sm:py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <input v-model="form.show_marks_immediately" type="checkbox" class="w-4 h-4 sm:w-3.5 sm:h-3.5 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0">
                <span class="text-sm sm:text-xs text-gray-700 dark:text-gray-300 leading-tight">Show marks instantly</span>
              </label>
              <label class="flex items-center gap-2 px-3 py-2.5 sm:px-2.5 sm:py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <input v-model="form.show_answers_after_submission" type="checkbox" class="w-4 h-4 sm:w-3.5 sm:h-3.5 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0">
                <span class="text-sm sm:text-xs text-gray-700 dark:text-gray-300 leading-tight">Show answers after</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Questions -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-2">
              <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <span class="w-8 h-8 mr-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </span>
                Questions
              </h2>
              <button
                v-if="!isPreview && !form.assessment_category"
                @click="showAddQuestionModal = true"
                class="px-3.5 sm:px-4 py-2.5 sm:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm text-sm sm:text-base"
              >
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                <span>Add Question</span>
              </button>
            </div>

            <!-- Curriculum question-group cards: one per selected Learning Outcome (LOA) or
                 Topic (AOI/EOC), each with its own "Add Question" that carries the group's
                 curriculum context into the modal automatically. -->
            <div v-if="!isPreview && form.assessment_category" class="p-4 sm:p-6 pb-0 space-y-3">
              <div
                v-for="group in curriculumQuestionGroups"
                :key="group.key"
                class="border rounded-lg p-3 sm:p-4 flex items-center justify-between gap-3"
                :class="group.count === 0 ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/10' : 'border-gray-200 dark:border-gray-700'"
              >
                <div class="min-w-0">
                  <p v-if="group.theme" class="text-xs text-indigo-500 dark:text-indigo-400">{{ group.theme }}</p>
                  <p class="font-medium text-gray-900 dark:text-white truncate">{{ group.label }}</p>
                  <p class="text-xs" :class="group.count === 0 ? 'text-amber-700 dark:text-amber-400' : 'text-gray-500 dark:text-gray-400'">
                    {{ group.count }} question{{ group.count === 1 ? '' : 's' }}
                    <span v-if="group.count === 0"> - required before publishing</span>
                  </p>
                </div>
                <button
                  type="button"
                  @click="openAddQuestionForGroup(group)"
                  class="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors flex-shrink-0"
                >
                  Add Question
                </button>
              </div>
              <p v-if="curriculumQuestionGroups.length === 0" class="text-sm text-gray-500 dark:text-gray-400 py-2">
                Select {{ form.assessment_category === 'LOA' ? 'a Topic and Learning Outcome(s)' : 'at least one Topic' }} above to start adding questions.
              </p>
            </div>

            <div class="p-4 sm:p-6">
              <!-- Empty State -->
              <div v-if="questions.length === 0" class="text-center py-10 sm:py-16">
                <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-2">No questions added yet. Click "Add Question" to start creating your assessment.</p>
              </div>

              <!-- Questions List -->
              <div v-else class="space-y-4">
                <div
                  v-for="(question, index) in questions"
                  :key="question.id"
                  class="border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center flex-wrap gap-2">
                        <span class="text-sm font-medium text-indigo-600 dark:text-indigo-400">Q{{ index + 1 }}</span>
                        <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                          {{ formatQuestionType(question.question_type) }}
                        </span>
                        <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          {{ question.marks }} marks
                        </span>
                        <span v-if="question.allow_drawing" class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          Drawing
                        </span>
                        <span
                          v-if="questionCurriculumLabel(question)"
                          class="px-2 py-1 text-xs font-medium rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                        >
                          {{ questionCurriculumLabel(question) }}
                        </span>
                      </div>

                      <!-- Scenario display with sub-questions -->
                      <div v-if="question.question_type === 'scenario'" class="mt-3">
                        <div v-if="question.scenario_text" class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg mb-2 overflow-x-auto">
                          <p class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line break-words [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full" v-html="question.scenario_text"></p>
                        </div>
                        <div v-if="(question as any).sub_questions && (question as any).sub_questions.length > 0" class="space-y-2">
                          <div
                            v-for="(subQ, subIndex) in (question as any).sub_questions"
                            :key="subQ.id"
                            class="flex items-start gap-2 text-sm"
                          >
                            <span class="font-medium text-gray-700 dark:text-gray-300">{{ String.fromCharCode(97 + (subIndex as number)) }}</span>
                            <div class="flex-1 min-w-0">
                              <p class="text-gray-900 dark:text-white break-words">{{ subQ.question_text }}</p>
                              <span class="text-xs text-gray-500 dark:text-gray-400">{{ subQ.marks }} marks</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Regular question display -->
                      <div v-else class="overflow-x-auto">
                        <p class="text-gray-900 dark:text-white mb-2 break-words [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full" v-html="question.question_text"></p>
                        <div v-if="question.options && question.options.length > 0" class="mt-2">
                          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Options:</p>
                          <ul class="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                            <li v-for="(option, optIndex) in question.options" :key="optIndex" class="flex items-center gap-2 flex-wrap">
                              <span class="break-words">{{ option.option_text }}</span>
                              <span v-if="option.is_correct" class="text-green-600 dark:text-green-400">✓</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div v-if="!isPreview" class="flex items-center gap-1 flex-wrap sm:flex-nowrap pt-2 sm:pt-0 border-t border-gray-100 dark:border-gray-700 sm:border-t-0 sm:ml-4 sm:flex-shrink-0">
                      <button
                        @click="editQuestion(question)"
                        class="p-2.5 sm:p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button
                        @click="moveQuestionUp(index)"
                        :disabled="index === 0"
                        class="p-2.5 sm:p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
                        title="Move Up"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                        </svg>
                      </button>
                      <button
                        @click="moveQuestionDown(index)"
                        :disabled="index === questions.length - 1"
                        class="p-2.5 sm:p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
                        title="Move Down"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                      <button
                        @click="deleteQuestion(index)"
                        class="p-2.5 sm:p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Action Bar -->
          <div v-if="!isPreview" class="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3 pt-2">
            <button
              @click="saveDraft"
              :disabled="saving"
              class="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
              </svg>
              <span>{{ saving ? 'Saving...' : 'Save Draft' }}</span>
            </button>
            <button
              @click="previewAssignment"
              :disabled="previewing"
              class="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-2.5 border border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <span>{{ previewing ? 'Preparing...' : 'Preview' }}</span>
            </button>
            <button
              @click="publishAssignment"
              :disabled="publishing"
              class="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2 text-sm sm:text-base font-medium shadow-sm"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ publishing ? 'Publishing...' : 'Publish' }}</span>
            </button>
          </div>
      </div>

      <!-- Assessment Snapshot sidebar - sticky at xl+, purely a read-only recap of what's below
           so a teacher scrolling a long form never loses track of what they've set. -->
      <div class="mt-4 sm:mt-6 xl:mt-0">
        <div class="xl:sticky xl:top-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-800 flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-md bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </span>
            <h2 class="text-base font-semibold text-indigo-900 dark:text-white">Assessment Snapshot</h2>
          </div>
          <div class="px-4 py-2.5 divide-y divide-gray-100 dark:divide-gray-700 text-sm">
            <div class="flex items-center justify-between gap-3 py-2">
              <span class="text-slate-500 dark:text-slate-400 font-medium">Category</span>
              <span v-if="form.assessment_category" class="px-2 py-0.5 rounded text-xs font-bold"
                :class="{
                  'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300': form.assessment_category === 'LOA',
                  'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300': form.assessment_category === 'AOI',
                  'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300': form.assessment_category === 'EOC'
                }"
                :title="ASSESSMENT_CATEGORY_LABELS[form.assessment_category]"
              >{{ form.assessment_category }}</span>
              <span v-else class="text-gray-400">Not set</span>
            </div>
            <div v-if="form.assessment_category === 'EOC' && selectedConstructName" class="flex items-center justify-between gap-3 py-2">
              <span class="text-slate-500 dark:text-slate-400 font-medium">Construct</span>
              <span class="font-semibold text-fuchsia-700 dark:text-fuchsia-300 text-right truncate max-w-[65%]">{{ selectedConstructName }}</span>
            </div>
            <div class="flex items-center justify-between gap-3 py-2">
              <span class="text-slate-500 dark:text-slate-400 font-medium">Subject</span>
              <span class="font-semibold text-gray-900 dark:text-white text-right truncate max-w-[65%]">{{ selectedSubjectName || 'Not set' }}</span>
            </div>
            <div class="flex items-center justify-between gap-3 py-2">
              <span class="text-slate-500 dark:text-slate-400 font-medium">Class-Stream</span>
              <span class="font-semibold text-gray-900 dark:text-white text-right truncate max-w-[65%]">{{ classDropdownLabel }}</span>
            </div>
            <div class="flex items-center justify-between gap-3 py-2">
              <span class="text-slate-500 dark:text-slate-400 font-medium">Due Date</span>
              <span class="font-semibold text-gray-900 dark:text-white text-right">{{ form.due_date ? new Date(form.due_date).toLocaleDateString() : 'Not set' }}</span>
            </div>
            <div class="flex items-center justify-between gap-3 py-2">
              <span class="text-slate-500 dark:text-slate-400 font-medium">Questions</span>
              <span class="font-semibold text-emerald-600 dark:text-emerald-400">{{ questions.length }}</span>
            </div>
            <div class="flex items-center justify-between gap-3 py-2">
              <span class="text-slate-500 dark:text-slate-400 font-medium">Marks</span>
              <span class="font-semibold" :class="marksMismatch && questions.length > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'">
                {{ calculatedMarks }} / {{ form.total_marks || 0 }}
              </span>
            </div>
          </div>
          <p v-if="marksMismatch && questions.length > 0" class="px-4 pb-3 text-xs font-medium text-amber-600 dark:text-amber-400">
            Question marks don't add up to the total yet.
          </p>
        </div>
      </div>
    </div>

    <!-- Add/Edit Question Modal -->
    <div v-if="showAddQuestionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 sm:p-4">
      <div
        class="bg-white dark:bg-gray-800 rounded-none sm:rounded-lg w-full h-full sm:h-auto max-w-full sm:max-w-3xl max-h-full sm:max-h-[90vh] flex flex-col transition-all"
      >
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white px-4 sm:px-6 pt-4 sm:pt-6 pb-2 flex-shrink-0">
          {{ editingQuestion ? 'Edit Question' : 'Add Question' }}
        </h2>
        <div v-if="questionModalContextLabel || selectedConstructAO" class="flex flex-wrap items-center gap-2 px-4 sm:px-6 pb-2 flex-shrink-0">
          <p v-if="questionModalContextLabel" class="text-sm text-indigo-600 dark:text-indigo-400">
            {{ questionModalContextLabel }}
          </p>
          <span v-if="form.assessment_category === 'EOC' && selectedConstructAO" class="px-2 py-0.5 rounded text-xs font-bold bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300">
            Assessment Objective: {{ selectedConstructAO }}
          </span>
        </div>

        <div class="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6 overflow-y-auto flex-1">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Question Type *</label>
            <select
              v-model="questionForm.question_type"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              :disabled="!!editingQuestion"
            >
              <option value="multiple_choice_single">Multiple Choice - Single Answer</option>
              <option
                v-if="['multiple_choice_multiple', 'true_false', 'structured', 'fill_blank', 'short_answer'].includes(questionForm.question_type)"
                :value="questionForm.question_type"
              >{{ formatQuestionType(questionForm.question_type) }} (legacy)</option>
              <option value="essay">Essay</option>
              <option value="scenario">Scenario-based Question</option>
            </select>
          </div>

          <div v-if="questionForm.question_type === 'scenario'">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Scenario Description</label>
            <CKEditor
              v-model="questionForm.scenario_description!"
              :height="100"
              class="mb-4"
            />
          </div>

          <div v-if="questionForm.question_type === 'scenario'">
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sub-Questions (Optional)</label>
              <button
                @click="addSubQuestion"
                class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium py-1.5 px-1 -mr-1"
              >
                + Add Sub-Question
              </button>
            </div>
            <div v-if="questionForm.sub_questions && questionForm.sub_questions.length > 0" class="space-y-3 mb-4">
              <div
                v-for="(subQ, index) in questionForm.sub_questions"
                :key="subQ.id"
                class="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-700/50"
              >
                <div class="flex items-start justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ String.fromCharCode(97 + index) }})</span>
                  <div class="flex items-center gap-1">
                    <button
                      @click="moveSubQuestionUp(index)"
                      :disabled="index === 0"
                      class="p-2 sm:p-1 min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-50"
                      title="Move Up"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                      </svg>
                    </button>
                    <button
                      @click="moveSubQuestionDown(index)"
                      :disabled="index === questionForm.sub_questions!.length - 1"
                      class="p-2 sm:p-1 min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-50"
                      title="Move Down"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    <button
                      @click="removeSubQuestion(index)"
                      class="p-2 sm:p-1 min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      title="Remove"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <input
                  v-model="subQ.question_text"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-sm mb-2"
                  placeholder="Sub-question text"
                >
                <div class="flex items-center space-x-2">
                  <label class="text-sm text-gray-600 dark:text-gray-400">Marks:</label>
                  <input
                    v-model.number="subQ.marks"
                    type="number"
                    min="1"
                    class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                </div>
              </div>
            </div>
            <p v-else class="text-sm text-gray-500 dark:text-gray-400 italic mb-4">No sub-questions added. Click "Add Sub-Question" to add questions to this scenario.</p>
          </div>

          <!-- Marks for scenario questions without sub-questions -->
          <div v-if="questionForm.question_type === 'scenario' && (!questionForm.sub_questions || questionForm.sub_questions.length === 0)" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marks *</label>
              <input
                v-model.number="questionForm.marks"
                type="number"
                min="1"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Set marks for this scenario"
              >
            </div>
            <div>
              <label class="flex items-center mt-2 sm:mt-6">
                <input
                  v-model="questionForm.allow_drawing"
                  type="checkbox"
                  class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                >
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Allow drawing workspace</span>
              </label>
            </div>
          </div>

          <!-- Upload a PDF instead of typing the question out -->
          <div v-if="questionForm.question_type !== 'scenario'" class="border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-lg p-4 bg-indigo-50/50 dark:bg-indigo-900/10">
            <label class="block text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-2">
              📄 Upload a PDF question paper instead
            </label>
            <div v-if="!hasQuestionPdf">
              <input
                type="file"
                accept="application/pdf"
                class="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:text-sm hover:file:bg-indigo-700 file:cursor-pointer cursor-pointer"
                @change="onQuestionPdfSelected"
              >
            </div>
            <div v-else>
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 mb-2">
                <a :href="questionPdfPreviewUrl || undefined" target="_blank" rel="noopener" class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline truncate min-w-0">
                  📄 {{ questionForm.pdfFile ? questionForm.pdfFile.name : 'View attached PDF' }} (opens in new tab)
                </a>
                <div class="flex items-center gap-3 flex-shrink-0">
                  <label class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                    Replace
                    <input type="file" accept="application/pdf" class="hidden" @change="onQuestionPdfSelected">
                  </label>
                  <button type="button" @click="removeQuestionPdf" class="text-sm text-red-600 dark:text-red-400 hover:underline">
                    Remove
                  </button>
                </div>
              </div>
              <div v-if="questionPdfPreviewUrl" class="h-72 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                <PdfAnnotationViewer
                  :key="questionPdfPreviewUrl"
                  :pdf-url="questionPdfPreviewUrl"
                  mode="readonly"
                  readonly
                />
              </div>
            </div>
          </div>

          <div v-if="questionForm.question_type !== 'scenario'">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ hasQuestionPdf ? 'Question Text (optional - PDF attached above)' : 'Question Text *' }}
            </label>
            <CKEditor
              v-model="questionForm.question_text"
              :height="150"
            />
          </div>

          <div v-if="questionForm.question_type !== 'scenario'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marks *</label>
              <input
                v-model.number="questionForm.marks"
                type="number"
                min="1"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
            </div>
            <div>
              <label class="flex items-center mt-2 sm:mt-6">
                <input
                  v-model="questionForm.allow_drawing"
                  type="checkbox"
                  class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                >
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Allow drawing workspace</span>
              </label>
            </div>
          </div>

          <!-- Options for Objective Questions -->
          <div v-if="isObjectiveQuestion">
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Answer Options *</label>
              <button
                @click="addOption"
                class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium py-1.5 px-1 -mr-1"
              >
                + Add Option
              </button>
            </div>
            <p v-if="hasQuestionPdf" class="text-xs text-gray-500 dark:text-gray-400 mb-2">
              The PDF above supplies the question itself - the system still needs the answer options typed below (with the correct one marked) to grade a student's selection automatically.
            </p>
            <div v-if="questionForm.options && questionForm.options.length > 0" class="space-y-2">
              <div
                v-for="(option, index) in questionForm.options"
                :key="index"
                class="flex flex-wrap sm:flex-nowrap items-center gap-2"
              >
                <input
                  v-model="option.option_text"
                  type="text"
                  class="w-full sm:flex-1 order-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  :placeholder="`Option ${index + 1}`"
                >
                <label class="flex items-center order-2">
                  <input
                    v-model="option.is_correct"
                    type="checkbox"
                    class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  >
                  <span class="ml-1 text-sm text-gray-700 dark:text-gray-300">Correct</span>
                </label>
                <button
                  @click="removeOption(index)"
                  class="order-3 p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            <p v-else class="text-sm text-gray-500 dark:text-gray-400 italic">No options added. Click "Add Option" to add choices.</p>
          </div>
        </div>

        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <button
            @click="closeQuestionModal"
            class="w-full sm:w-auto px-4 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="saveQuestion"
            class="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {{ editingQuestion ? 'Update' : 'Add' }} Question
          </button>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <div v-if="showPreviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto p-0 sm:p-4">
      <div class="bg-white dark:bg-gray-800 rounded-none sm:rounded-lg p-4 sm:p-6 max-w-4xl w-full min-h-full sm:min-h-0 sm:my-8">
        <div class="flex items-center justify-between mb-4 sm:mb-6 gap-2">
          <h2 class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white break-words">Assignment Preview</h2>
          <button
            @click="showPreviewModal = false"
            class="p-2 flex-shrink-0 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Assignment Details -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 break-words">{{ form.title }}</h3>
          <p v-if="form.description" class="text-gray-600 dark:text-gray-400 mb-4 break-words">{{ form.description }}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-500 dark:text-gray-400">Type:</span>
              <span class="ml-2 text-gray-900 dark:text-white font-medium">{{ form.type }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Total Marks:</span>
              <span class="ml-2 text-gray-900 dark:text-white font-medium">{{ form.total_marks }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Due Date:</span>
              <span class="ml-2 text-gray-900 dark:text-white font-medium">{{ form.due_date ? new Date(form.due_date).toLocaleDateString() : 'Not set' }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Duration:</span>
              <span class="ml-2 text-gray-900 dark:text-white font-medium">{{ form.duration_minutes ? form.duration_minutes + ' minutes' : 'Not set' }}</span>
            </div>
          </div>
          <div v-if="form.instructions" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">Instructions</h4>
            <p class="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line">{{ form.instructions }}</p>
          </div>
        </div>

        <!-- Questions Preview -->
        <div class="space-y-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Questions ({{ questions.length }})</h3>
          <div v-if="questions.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
            No questions added yet
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="(question, index) in questions"
              :key="question.id"
              class="border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 bg-white dark:bg-gray-800"
            >
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-medium">
                  {{ index + 1 }}
                </span>
                <div class="flex-1 min-w-0">
                  <!-- Scenario Question -->
                  <div v-if="question.question_type === 'scenario'">
                    <div v-if="question.scenario_text" class="mb-4 overflow-x-auto">
                      <div class="text-gray-900 dark:text-white text-justify break-words [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full" v-html="question.scenario_text"></div>
                    </div>
                  </div>
                  <!-- Regular Question -->
                  <div v-else class="overflow-x-auto">
                    <div class="text-gray-900 dark:text-white font-medium mb-2 break-words [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full" v-html="question.question_text"></div>
                    <!-- Options for objective questions -->
                    <div v-if="question.options && question.options.length > 0" class="mt-3 space-y-2">
                      <div
                        v-for="(option, optIndex) in question.options"
                        :key="optIndex"
                        class="flex items-center gap-2 flex-wrap"
                      >
                        <span class="text-gray-500 dark:text-gray-400">{{ String.fromCharCode(97 + optIndex) }})</span>
                        <span class="text-gray-700 dark:text-gray-300 break-words">{{ option.option_text }}</span>
                        <span v-if="option.is_correct" class="text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded">Correct</span>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3 flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>Type: {{ question.question_type }}</span>
                    <span>Marks: {{ question.marks }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-4 mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="showPreviewModal = false"
            class="w-full sm:w-auto px-4 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import CKEditor from '@/components/teacher/CKEditor.vue'
import PdfAnnotationViewer from '@/components/assignment/PdfAnnotationViewer.vue'
import type { AssignmentQuestion, QuestionType, Subject, ResponseType, AttachmentType } from '@/types'
import type { ClassTarget } from '@/components/teacher/TeacherClassSelector.vue'
import type { Construct, ConstructTopicOption } from '@/types/construct'
import { resolveAssetUrl } from '@/utils/url'

interface QuestionOption {
  option_text: string
  is_correct: boolean
}

interface SubQuestion {
  id: number
  question_text: string
  marks: number
  display_order: number
}

interface QuestionForm {
  id: number
  question_type: QuestionType
  question_text: string
  scenario_title?: string
  scenario_description?: string
  scenario_image?: string
  scenario_text: string
  marks: number
  display_order: number
  allow_drawing: boolean
  options: QuestionOption[]
  sub_questions?: SubQuestion[]
  response_type: ResponseType
  attachment_path?: string
  attachment_type: AttachmentType
  // Set automatically by openAddQuestionForGroup() (or carried over from the loaded question when
  // editing) - never a field the teacher picks inside this modal itself.
  curriculum_topic_id?: number
  learning_outcome_id?: number
  // Transient - a PDF picked in this modal but not yet uploaded (the question may not have a
  // real id yet). Uploaded via uploadQuestionPdf() once the question is persisted in
  // syncQuestions(), then cleared - never sent as part of the JSON question payload itself.
  pdfFile?: File | null
}

const router = useRouter()
const route = useRoute()

const API_BASE = '/api'

const isEdit = computed(() => !!route.params.id)
const isPreview = computed(() => route.query.preview === 'true')

const toast = ref<{ type: 'success' | 'error'; message: string } | null>(null)
let toastTimeout: number | null = null
function showToast(type: 'success' | 'error', message: string) {
  toast.value = { type, message }
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = window.setTimeout(() => { toast.value = null }, 4000)
}

const form = ref({
  title: '',
  description: '',
  type: 'mixed' as const,
  total_marks: 100,
  due_date: '',
  instructions: '',
  category: '',
  open_at: '',
  duration_minutes: null as number | null,
  pass_mark: null as number | null,
  allow_late_submission: true,
  attempts_allowed: 1,
  shuffle_questions: false,
  shuffle_options: false,
  show_marks_immediately: false,
  show_answers_after_submission: false,
  allow_save_resume: true,
  academic_year: '',
  subject_id: null as number | null,
  classTarget: { scope: 'stream', class_id: null, class_group_name: null } as ClassTarget,
  assessment_category: null as 'LOA' | 'AOI' | 'EOC' | null,
  academic_year_id: null as number | null,
  term_id: null as number | null
})

const questions = ref<AssignmentQuestion[]>([])
// Existing (server-side) question ids removed via deleteQuestion() during this editing
// session - staged locally and only actually deleted from the backend on the next save.
const deletedQuestionIds = ref<number[]>([])
const saving = ref(false)
const publishing = ref(false)

const subjects = ref<Subject[]>([])
const academicYears = ref<any[]>([])
const loadingSubjects = ref(false)
const loadingAcademicYears = ref(false)

// Class-Stream is a checkbox multi-select (one assignment can be visible to more than one
// stream) rather than the single/all-streams TeacherClassSelector - `form.classTarget` is kept in
// sync from this selection purely so every existing piece of code that already reads
// classTarget.scope/class_id/class_group_name (curriculum lookups, the create/update/publish
// payloads) keeps working unchanged; the FULL checked list is what actually drives visibility,
// synced separately via syncAssignmentClasses() to /teacher/assignments/{id}/classes.
interface ClassStreamOption { id: number; name: string; level: string; stream_name: string | null }
const availableClasses = ref<ClassStreamOption[]>([])
const loadingClasses = ref(false)
const classChecked = ref<Record<number, boolean>>({})

const classGroups = computed(() => {
  const map = new Map<string, { name: string; level: string; streams: ClassStreamOption[] }>()
  for (const cls of availableClasses.value) {
    const key = `${cls.name}|${cls.level}`
    if (!map.has(key)) map.set(key, { name: cls.name, level: cls.level, streams: [] })
    map.get(key)!.streams.push(cls)
  }
  return Array.from(map.values())
})

const selectedClassIds = computed(() => Object.entries(classChecked.value).filter(([, v]) => v).map(([id]) => Number(id)))

// Curriculum alignment (LOA/AOI/EOC) only ever scopes to ONE class (the first checked stream -
// see the classTarget watcher below), so letting a teacher check streams across different classes
// would silently misalign the curriculum data from the visibility list. Once any stream in a class
// is checked, the other classes disappear from the dropdown until it's cleared - streams WITHIN
// the same class stay multi-selectable.
const visibleClassGroups = computed(() => {
  const activeGroup = classGroups.value.find(g => g.streams.some(s => classChecked.value[s.id]))
  return activeGroup ? [activeGroup] : classGroups.value
})

// Dropdown UI: a closed button showing a summary, opening into the checkbox list on click -
// same interaction pattern as TeacherClassSelector, just multi-select instead of single.
const classDropdownOpen = ref(false)
const classDropdownRef = ref<HTMLElement | null>(null)

const classDropdownLabel = computed(() => {
  const ids = new Set(selectedClassIds.value)
  if (ids.size === 0) return 'Select class-stream(s)'

  const labels: string[] = []
  for (const group of classGroups.value) {
    if (group.streams.length > 0 && group.streams.every(s => ids.has(s.id))) {
      labels.push(`${group.name} (All Streams)`)
      for (const s of group.streams) ids.delete(s.id)
    }
  }
  for (const group of classGroups.value) {
    for (const s of group.streams) {
      if (ids.has(s.id)) labels.push(`${group.name} - ${s.stream_name || 'N/A'}`)
    }
  }
  return labels.join(', ')
})

const onClassDropdownClickOutside = (event: MouseEvent) => {
  if (classDropdownRef.value && !classDropdownRef.value.contains(event.target as Node)) {
    classDropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClassDropdownClickOutside))
onUnmounted(() => document.removeEventListener('click', onClassDropdownClickOutside))

const toggleAllStreamsInGroup = (group: { streams: ClassStreamOption[] }, checked: boolean) => {
  for (const s of group.streams) {
    if (checked) classChecked.value[s.id] = true
    else delete classChecked.value[s.id]
  }
  // Checking "All Streams" selects everything in this group at once - there's nothing left to
  // pick, so close the dropdown automatically instead of making the teacher click away. Unchecking
  // it (going back to none/partial) leaves the dropdown open since they're likely about to pick
  // individual streams instead.
  if (checked) classDropdownOpen.value = false
}

const loadClasses = async () => {
  loadingClasses.value = true
  try {
    const response = await axios.get(`${API_BASE}/teacher/classes`)
    if (response.data.success) {
      availableClasses.value = response.data.data
    }
  } catch (err) {
    console.error('Failed to load classes:', err)
  } finally {
    loadingClasses.value = false
  }
}

// Keeps the legacy single-value classTarget (still used by curriculum lookups and the
// create/update/publish payloads) pointed at the first checked stream.
watch(selectedClassIds, (ids) => {
  form.value.classTarget = { scope: 'stream', class_id: ids[0] ?? null, class_group_name: null }
}, { immediate: true })

const syncAssignmentClasses = async (assignmentId: number | string) => {
  if (selectedClassIds.value.length === 0) return
  await axios.put(`${API_BASE}/teacher/assignments/${assignmentId}/classes`, { class_ids: selectedClassIds.value })
}

// --- LOA/AOI/EOC curriculum alignment (optional) - reuses the exact same admin-authored
// curriculum data and cascading endpoint eNotes uses (Teacher/ENoteCurriculumController), scoped
// to this assignment's own fixed Subject + Class-Stream (chosen above in Target Audience). ---
const ASSESSMENT_CATEGORIES = [
  { value: 'LOA' as const, label: 'Learning Outcome Assessment', description: 'Assess specific learning outcomes from a topic.' },
  { value: 'AOI' as const, label: 'Activity of Integration', description: 'Assess learners across one or several topics.' },
  { value: 'EOC' as const, label: 'Elements of Construct', description: 'Assess topics organized under a Theme/Branch.' }
]

interface CurriculumMetaOption { id: number; name: string }
interface CurriculumClassStreamMetaOption { id: number; display_name: string }
interface CurriculumTopicMetaOption { id: number; topic: string }
interface CurriculumMeta {
  subjects: CurriculumMetaOption[]
  academic_years: CurriculumMetaOption[]
  class_streams: CurriculumClassStreamMetaOption[]
  terms: CurriculumMetaOption[]
  themes: string[]
  topics: CurriculumTopicMetaOption[]
}
interface LoaTopicDetail {
  competence: string
  learning_outcomes: { id: number; learning_outcome: string; order_number: number }[]
}

const curriculumMeta = ref<CurriculumMeta | null>(null)
const curriculumSelection = ref({
  academic_year_id: '' as number | '',
  term_id: '' as number | '',
  theme_branch: '',
  curriculum_topic_id: '' as number | ''
})
const loaTopicDetail = ref<LoaTopicDetail | null>(null)
const selectedLearningOutcomeIds = ref<Record<number, boolean>>({})
const selectedTopicIds = ref<Record<number, boolean>>({})
// Which curriculum group (Topic, and for LOA which Learning Outcome) the question modal should
// silently attach the next-saved question to - set by openAddQuestionForGroup(), read by
// saveQuestion(). Null for the plain/legacy "Add Question" flow (no category selected).
const pendingQuestionContext = ref<{ curriculum_topic_id: number | null; learning_outcome_id: number | null; label: string } | null>(null)

const showAddQuestionModal = ref(false)
const editingQuestion = ref<AssignmentQuestion | null>(null)
const questionForm = ref<QuestionForm>({
  id: 0,
  question_type: 'essay',
  question_text: '',
  scenario_title: '',
  scenario_description: '',
  scenario_image: '',
  scenario_text: '',
  marks: 1,
  display_order: 0,
  allow_drawing: false,
  options: [] as QuestionOption[],
  sub_questions: [] as SubQuestion[],
  response_type: 'text',
  attachment_path: undefined,
  attachment_type: 'none',
  pdfFile: null
})

const calculatedMarks = computed(() => {
  return questions.value.reduce((sum, q) => {
    // marks can come back from the API as a decimal-formatted string (e.g. "10.00"), and
    // JS's + operator concatenates rather than adds as soon as either side is a string -
    // Number(...) keeps this a real numeric sum instead of "010.00" style concatenation.
    let questionMarks = Number(q.marks)
    // Add sub-question marks for scenario questions
    const qWithSubs = q as any
    if (q.question_type === 'scenario' && qWithSubs.sub_questions && qWithSubs.sub_questions.length > 0) {
      questionMarks = qWithSubs.sub_questions.reduce((subSum: number, sq: SubQuestion) => subSum + Number(sq.marks), 0)
    }
    return sum + questionMarks
  }, 0)
})

const marksMismatch = computed(() => {
  return calculatedMarks.value !== Number(form.value.total_marks)
})

// Read-only fields for the "Assessment Snapshot" sidebar - reuses state/computeds already
// defined above, no new data fetching.
const selectedSubjectName = computed(() => subjects.value.find(s => s.id === form.value.subject_id)?.name || '')
const selectedConstructName = computed(() => eocConstructs.value.find(c => c.id === selectedConstructId.value)?.name || '')
const selectedConstructAO = computed(() => eocConstructs.value.find(c => c.id === selectedConstructId.value)?.assessment_objective || '')
const ASSESSMENT_CATEGORY_LABELS: Record<string, string> = {
  LOA: 'Learning Outcome Assessment',
  AOI: 'Activity of Integration',
  EOC: 'Elements of Construct'
}
// Each category gets its own accent (blue/violet/fuchsia) instead of one uniform indigo, so a
// teacher can tell LOA/AOI/EOC apart at a glance wherever they show up (category picker, snapshot).
const CATEGORY_ACTIVE_CLASSES: Record<string, string> = {
  LOA: 'border-blue-600 bg-blue-50 dark:bg-blue-900/20',
  AOI: 'border-violet-600 bg-violet-50 dark:bg-violet-900/20',
  EOC: 'border-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-900/20'
}
const CATEGORY_TEXT_CLASSES: Record<string, string> = {
  LOA: 'text-blue-600 dark:text-blue-400',
  AOI: 'text-violet-600 dark:text-violet-400',
  EOC: 'text-fuchsia-600 dark:text-fuchsia-400'
}
const CATEGORY_ICON_BG: Record<string, string> = {
  LOA: 'bg-blue-50 dark:bg-blue-900/30',
  AOI: 'bg-violet-50 dark:bg-violet-900/30',
  EOC: 'bg-fuchsia-50 dark:bg-fuchsia-900/30'
}
// One glance icon per category on the picker cards - a graduation cap for a single Learning
// Outcome, stacked layers for combining several Topics, a verified-shield for a Construct.
const CATEGORY_ICON_PATH: Record<string, string> = {
  LOA: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222',
  AOI: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  EOC: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
}

const isObjectiveQuestion = computed(() => {
  return ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'].includes(questionForm.value.question_type)
})

// Every free-response question is auto-given this blank answer sheet server-side unless the
// teacher uploads their own (see Teacher\AssignmentController::addQuestion) - it must not be
// mistaken for a real teacher-uploaded question PDF when deciding what the "Remove"/"already
// attached" UI should show.
const DEFAULT_ANSWER_DOCUMENT_PATH = '/uploads/defaults/default_answer_sheet.pdf'

const hasQuestionPdf = computed(() => {
  if (questionForm.value.pdfFile) return true
  return questionForm.value.attachment_type === 'pdf' &&
    !!questionForm.value.attachment_path &&
    questionForm.value.attachment_path !== DEFAULT_ANSWER_DOCUMENT_PATH
})

const questionPdfPreviewUrl = computed(() => {
  if (questionForm.value.pdfFile) return URL.createObjectURL(questionForm.value.pdfFile)
  if (questionForm.value.attachment_path) return resolveAssetUrl(questionForm.value.attachment_path)
  return null
})

const onQuestionPdfSelected = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  if (file.type !== 'application/pdf') {
    showToast('error', 'Please select a PDF file')
    return
  }
  questionForm.value.pdfFile = file
  // Signals intent to the backend before the actual upload happens (which needs a real question
  // id and so can only run after this question is created) - see addQuestion()'s $pdfPending check.
  questionForm.value.attachment_type = 'pdf'
}

const removeQuestionPdf = () => {
  questionForm.value.pdfFile = null
  // '' (not undefined) so it's still sent in the update payload and actually clears the
  // attachment server-side - see updateQuestion()'s isset()-based field handling.
  questionForm.value.attachment_path = ''
  questionForm.value.attachment_type = 'none'
}

const loadDropdownData = async () => {
  await loadAssignments()
  await loadAcademicYears()
  await loadClasses()
}

const loadAssignments = async () => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/enotes/assignments`)
    if (response.data.success) {
      subjects.value = response.data.data.subjects
    }
  } catch (err) {
    console.error('Failed to load assignments:', err)
  }
}

const loadAssignment = async () => {
  if (!isEdit.value) return
  
  try {
    const response = await axios.get(`${API_BASE}/teacher/assignments/${route.params.id}`)
    if (response.data.success) {
      const assignment = response.data.data
      
      // Populate form fields
      form.value = {
        title: assignment.title || '',
        description: assignment.description || '',
        type: assignment.type || 'mixed',
        total_marks: Number(assignment.total_marks) || 100,
        due_date: assignment.due_date || '',
        instructions: assignment.instructions || '',
        category: assignment.category || '',
        open_at: assignment.open_at || '',
        duration_minutes: assignment.duration_minutes || null,
        pass_mark: assignment.pass_mark || null,
        allow_late_submission: assignment.allow_late_submission ?? true,
        attempts_allowed: assignment.attempts_allowed || 1,
        shuffle_questions: assignment.shuffle_questions || false,
        shuffle_options: assignment.shuffle_options || false,
        show_marks_immediately: assignment.show_marks_immediately || false,
        show_answers_after_submission: assignment.show_answers_after_submission || false,
        allow_save_resume: assignment.allow_save_resume ?? true,
        academic_year: assignment.academic_year || '',
        subject_id: assignment.subject_id || null,
        classTarget: assignment.class_group_name
          ? { scope: 'all_streams', class_id: null, class_group_name: assignment.class_group_name }
          : { scope: 'stream', class_id: assignment.class_id || null, class_group_name: null },
        assessment_category: assignment.assessment_category || null,
        academic_year_id: assignment.academic_year_id || null,
        term_id: assignment.term_id || null
      }
      curriculumSelection.value.academic_year_id = assignment.academic_year_id || ''
      curriculumSelection.value.term_id = assignment.term_id || ''

      // Pre-check whichever Class-Stream(s) this assignment is already visible to: the new
      // multi-class list if any rows exist there, else fall back to the legacy single class_id /
      // class_group_name ("All Streams" - check every stream of that class level).
      classChecked.value = {}
      try {
        const classesResponse = await axios.get(`${API_BASE}/teacher/assignments/${route.params.id}/classes`)
        const extraClasses = classesResponse.data.success ? classesResponse.data.data.classes : []
        if (extraClasses.length > 0) {
          for (const c of extraClasses) classChecked.value[c.class_id] = true
        } else if (assignment.class_group_name) {
          for (const cls of availableClasses.value) {
            if (cls.name === assignment.class_group_name) classChecked.value[cls.id] = true
          }
        } else if (assignment.class_id) {
          classChecked.value[assignment.class_id] = true
        }
      } catch (err) {
        console.error('Failed to load assignment class list:', err)
      }

      // Load questions if available
      if (assignment.questions && Array.isArray(assignment.questions)) {
        questions.value = assignment.questions.map((q: any) => ({
          ...q,
          options: q.options || []
        }))
      }

      // Reconstruct the curriculum scope UI (selected Topic(s)/Learning Outcome(s)) from what was
      // actually saved, so reopening a draft doesn't lose the teacher's earlier selections.
      if (assignment.assessment_category) {
        await loadCurriculumMeta()
        try {
          const curriculumResponse = await axios.get(`${API_BASE}/teacher/assignments/${route.params.id}/curriculum`)
          if (curriculumResponse.data.success) {
            const { topics, learning_outcomes, construct_id } = curriculumResponse.data.data
            if (assignment.assessment_category === 'LOA' && topics.length > 0) {
              curriculumSelection.value.theme_branch = topics[0].theme_branch
              curriculumSelection.value.curriculum_topic_id = topics[0].id
              await loadCurriculumMeta()
              await onLoaTopicChosen()
              for (const lo of learning_outcomes) {
                selectedLearningOutcomeIds.value[lo.learning_outcome_id] = true
              }
            } else if (assignment.assessment_category === 'EOC' && construct_id) {
              // selectEocConstruct() fetches the construct's topics (re-scoped to this
              // assignment's own class_id) and repopulates eocConstructTopics/selectedTopicIds
              // itself - the raw `topics` list from this endpoint isn't needed for EOC's restore.
              await selectEocConstruct(construct_id)
            } else {
              selectedTopicIds.value = {}
              for (const t of topics) {
                selectedTopicIds.value[t.id] = true
              }
            }
          }
        } catch (err) {
          console.error('Failed to load existing curriculum linkage:', err)
        }
      }
    }
  } catch (err: any) {
    console.error('Failed to load assignment:', err)
    showToast('error', err.response?.data?.message || 'Failed to load assignment')
  }
}

const loadAcademicYears = async () => {
  try {
    loadingAcademicYears.value = true
    const response = await axios.get(`${API_BASE}/teacher/classes/academic-years`)
    if (response.data.success) {
      academicYears.value = response.data.data
      // Set default to current year if available
      const currentYear = new Date().getFullYear().toString()
      if (academicYears.value.some((y: any) => y.academic_year === currentYear)) {
        form.value.academic_year = currentYear
      } else if (academicYears.value.length > 0) {
        form.value.academic_year = academicYears.value[0].academic_year
      }
    }
  } catch (err) {
    console.error('Failed to load academic years:', err)
  } finally {
    loadingAcademicYears.value = false
  }
}

const loadCurriculumMeta = async () => {
  if (!form.value.subject_id || !form.value.classTarget.class_id) {
    curriculumMeta.value = null
    return
  }
  try {
    const params: Record<string, string> = {
      subject_id: String(form.value.subject_id),
      class_id: String(form.value.classTarget.class_id)
    }
    if (curriculumSelection.value.academic_year_id) params.academic_year_id = String(curriculumSelection.value.academic_year_id)
    if (curriculumSelection.value.term_id) params.term_id = String(curriculumSelection.value.term_id)
    if (curriculumSelection.value.theme_branch) params.theme_branch = curriculumSelection.value.theme_branch

    const response = await axios.get(`${API_BASE}/teacher/enotes/curriculum/meta`, { params })
    if (response.data.success) {
      curriculumMeta.value = response.data.data
    }
  } catch (err) {
    console.error('Failed to load curriculum meta:', err)
  }
}

// Re-fetch as soon as both Subject and a specific Class-Stream are chosen in Target Audience -
// the two dimensions the Curriculum Alignment section can't function without.
watch(() => [form.value.subject_id, form.value.classTarget.class_id], () => {
  loadCurriculumMeta()
})

// Curriculum Alignment used to ask for Academic Year a second time (its own dropdown, separate
// from the one already answered in Target Audience) - confusing duplicate data entry for the
// exact same concept, and it didn't even pre-fill from the first answer. Instead of showing a
// second control, resolve curriculumSelection.academic_year_id automatically by matching the
// admin-configured curriculum year (id+name) against the plain year string already chosen above.
// If no curriculum record exists for that year, leave it unset - curriculumMissingYear below
// then shows an explanatory message rather than silently picking a different year.
const curriculumMissingYear = ref(false)

function syncCurriculumAcademicYear() {
  const years = curriculumMeta.value?.academic_years
  if (!years || years.length === 0) return
  const match = years.find(y => String(y.name) === String(form.value.academic_year))
  curriculumMissingYear.value = !match
  if (match && curriculumSelection.value.academic_year_id !== match.id) {
    curriculumSelection.value.academic_year_id = match.id
    curriculumSelection.value.term_id = ''
    curriculumSelection.value.theme_branch = ''
    curriculumSelection.value.curriculum_topic_id = ''
    selectedTopicIds.value = {}
    loaTopicDetail.value = null
    selectedLearningOutcomeIds.value = {}
    loadCurriculumMeta()
  }
}

watch(() => curriculumMeta.value?.academic_years, syncCurriculumAcademicYear)
watch(() => form.value.academic_year, syncCurriculumAcademicYear)

// Academic year is now resolved automatically (see syncCurriculumAcademicYear above) - only Term
// and Theme/Branch are still picked directly by the teacher.
const onCurriculumStepChange = async (changedField: 'term_id' | 'theme_branch') => {
  if (changedField === 'term_id') {
    curriculumSelection.value.theme_branch = ''
    curriculumSelection.value.curriculum_topic_id = ''
    // Changing the term invalidates any AOI/EOC topic selections made under the old term.
    selectedTopicIds.value = {}
  } else if (changedField === 'theme_branch') {
    curriculumSelection.value.curriculum_topic_id = ''
  }
  loaTopicDetail.value = null
  selectedLearningOutcomeIds.value = {}
  await loadCurriculumMeta()
}

const selectAssessmentCategory = (category: 'LOA' | 'AOI' | 'EOC') => {
  if (form.value.assessment_category === category) return
  form.value.assessment_category = category
  curriculumSelection.value.theme_branch = ''
  curriculumSelection.value.curriculum_topic_id = ''
  loaTopicDetail.value = null
  selectedLearningOutcomeIds.value = {}
  selectedTopicIds.value = {}
  selectedConstructId.value = ''
  eocConstructTopics.value = []
}

const onLoaTopicChosen = async () => {
  loaTopicDetail.value = null
  selectedLearningOutcomeIds.value = {}
  if (!curriculumSelection.value.curriculum_topic_id) return

  try {
    const response = await axios.get(`${API_BASE}/teacher/enotes/curriculum/topics/${curriculumSelection.value.curriculum_topic_id}`)
    if (response.data.success) {
      loaTopicDetail.value = {
        competence: response.data.data.competence,
        learning_outcomes: (response.data.data.learning_outcomes || []).map((text: string, i: number) => ({
          id: response.data.data.learning_outcome_ids?.[i],
          learning_outcome: text,
          order_number: i + 1
        }))
      }
    }
  } catch (err) {
    console.error('Failed to load topic detail:', err)
  }
}

const toggleAoiTopic = (topicId: number, checked: boolean) => {
  if (checked) {
    selectedTopicIds.value[topicId] = true
    return
  }
  const existingCount = questions.value.filter(q => (q as any).curriculum_topic_id === topicId).length
  if (existingCount > 0) {
    const ok = confirm(
      `This Topic already has ${existingCount} question${existingCount === 1 ? '' : 's'} attached. Removing it may also remove its assessment relationship. Do you want to continue?`
    )
    if (!ok) return
  }
  delete selectedTopicIds.value[topicId]
}

// EOC picks exactly one admin-defined Construct - scoped to the teacher's own department
// (enforced server-side), the chosen Subject, and the Level implied by the chosen class-stream -
// instead of raw theme/topic checkboxes. See Admin\ConstructController / Teacher\ConstructController.
const selectedClassLevel = computed(() => availableClasses.value.find(c => c.id === form.value.classTarget.class_id)?.level || '')

const eocConstructs = ref<Construct[]>([])
const loadingEocConstructs = ref(false)
const selectedConstructId = ref<number | ''>('')
const eocConstructTopics = ref<ConstructTopicOption[]>([])
const loadingEocConstructTopics = ref(false)
const eocRevealedOutcomes = ref<Set<number>>(new Set())
const isEocOutcomesRevealed = (topicId: number) => eocRevealedOutcomes.value.has(topicId)
const toggleEocOutcomesReveal = (topicId: number) => {
  const next = new Set(eocRevealedOutcomes.value)
  if (next.has(topicId)) next.delete(topicId)
  else next.add(topicId)
  eocRevealedOutcomes.value = next
}

watch(() => [form.value.assessment_category, form.value.subject_id, form.value.classTarget.class_id, selectedClassLevel.value], async () => {
  eocConstructs.value = []
  selectedConstructId.value = ''
  eocConstructTopics.value = []
  if (form.value.assessment_category !== 'EOC' || !form.value.subject_id || !form.value.classTarget.class_id || !selectedClassLevel.value) return

  loadingEocConstructs.value = true
  try {
    const response = await axios.get(`${API_BASE}/teacher/constructs`, {
      params: { subject_id: form.value.subject_id, level: selectedClassLevel.value }
    })
    if (response.data.success) eocConstructs.value = response.data.data.constructs || []
  } catch (err) {
    console.error('Failed to load constructs for EOC:', err)
  } finally {
    loadingEocConstructs.value = false
  }
}, { deep: false })

// Selecting a Construct auto-includes ALL of its topics (no manual per-topic picking) - every
// topic admin attached to the construct, cross-stream deduped (same shape the admin picker
// shows), not narrowed to whichever happen to have a row for this assignment's specific
// class-stream (a topic is often only authored for some streams, and narrowing under-reported
// the construct's real topic count - see Teacher\ConstructController::show()).
async function selectEocConstruct(constructId: number) {
  selectedConstructId.value = constructId
  eocConstructTopics.value = []
  eocRevealedOutcomes.value = new Set()
  selectedTopicIds.value = {}

  loadingEocConstructTopics.value = true
  try {
    const response = await axios.get(`${API_BASE}/teacher/constructs/${constructId}`)
    if (response.data.success) {
      eocConstructTopics.value = response.data.data.topics || []
      const next: Record<number, boolean> = {}
      for (const t of eocConstructTopics.value) next[t.id] = true
      selectedTopicIds.value = next
    }
  } catch (err) {
    console.error('Failed to load construct topics for EOC:', err)
  } finally {
    loadingEocConstructTopics.value = false
  }
}

// Question groups shown above the flat Questions list, one per selected Learning Outcome (LOA)
// or Topic (AOI/EOC) - the count reflects the flat `questions` array, and "Add Question" carries
// the group's curriculum context into the question modal automatically.
const curriculumQuestionGroups = computed(() => {
  if (form.value.assessment_category === 'LOA') {
    if (!curriculumSelection.value.curriculum_topic_id || !loaTopicDetail.value) return []
    return loaTopicDetail.value.learning_outcomes
      .filter(o => selectedLearningOutcomeIds.value[o.id])
      .map(o => ({
        key: `lo-${o.id}`,
        label: `LO ${o.order_number}: ${o.learning_outcome}`,
        theme: null as string | null,
        curriculum_topic_id: Number(curriculumSelection.value.curriculum_topic_id),
        learning_outcome_id: o.id,
        count: questions.value.filter(q => (q as any).learning_outcome_id === o.id).length
      }))
  }

  if (form.value.assessment_category === 'AOI') {
    return (curriculumMeta.value?.topics || [])
      .filter(t => selectedTopicIds.value[t.id])
      .map(t => ({
        key: `topic-${t.id}`,
        label: t.topic,
        theme: null as string | null,
        curriculum_topic_id: t.id,
        learning_outcome_id: null,
        count: questions.value.filter(q => (q as any).curriculum_topic_id === t.id).length
      }))
  }

  if (form.value.assessment_category === 'EOC') {
    // One card for the whole Construct (not one per topic) - a teacher adds questions against the
    // Assessment Objective as a whole; which specific underlying topic a question lands on doesn't
    // matter for EOC since the Construct is what's being assessed. New questions default onto the
    // construct's first topic (openAddQuestionForGroup still needs a valid curriculum_topic_id).
    const topics = eocConstructTopics.value.filter(t => selectedTopicIds.value[t.id])
    if (topics.length === 0) return []
    const topicIdSet = new Set(topics.map(t => t.id))
    return [{
      key: `construct-${selectedConstructId.value}`,
      label: `Assessment Objective (${selectedConstructAO.value})`,
      theme: null as string | null,
      curriculum_topic_id: topics[0].id,
      learning_outcome_id: null,
      count: questions.value.filter(q => topicIdSet.has((q as any).curriculum_topic_id)).length
    }]
  }

  return []
})

// Basic Information (Title/Category/Description) was removed - the title is derived from the
// curriculum selection instead: the Topic name for LOA, the joined Topic names for AOI, or the
// Construct name for EOC (its question group label is now the generic "Assessment Objective
// (AO#)", not a topic name, so it wouldn't make a useful title).
// Returns null (not '') for a legacy/no-category assignment so the watcher below leaves whatever
// title was already loaded (e.g. an existing pre-this-feature assignment) untouched.
const derivedTitle = computed<string | null>(() => {
  if (form.value.assessment_category === 'LOA') {
    const topic = curriculumMeta.value?.topics.find(t => t.id === Number(curriculumSelection.value.curriculum_topic_id))
    return topic?.topic || ''
  }
  if (form.value.assessment_category === 'AOI') {
    return curriculumQuestionGroups.value.map(g => g.label).join(', ')
  }
  if (form.value.assessment_category === 'EOC') {
    return selectedConstructName.value || ''
  }
  return null
})

watch(derivedTitle, (title) => {
  if (title !== null) {
    form.value.title = title
  }
}, { immediate: true })

const openAddQuestionForGroup = (group: { curriculum_topic_id: number | null; learning_outcome_id: number | null; label: string; theme: string | null }) => {
  pendingQuestionContext.value = {
    curriculum_topic_id: group.curriculum_topic_id,
    learning_outcome_id: group.learning_outcome_id,
    label: group.theme ? `${group.theme} → ${group.label}` : group.label
  }
  editingQuestion.value = null
  questionForm.value = {
    id: 0,
    question_type: 'essay',
    question_text: '',
    scenario_title: '',
    scenario_description: '',
    scenario_image: '',
    scenario_text: '',
    marks: 1,
    display_order: 0,
    allow_drawing: false,
    options: [] as QuestionOption[],
    sub_questions: [] as SubQuestion[],
    response_type: 'text',
    attachment_path: undefined,
    attachment_type: 'none',
    pdfFile: null,
    curriculum_topic_id: group.curriculum_topic_id ?? undefined,
    learning_outcome_id: group.learning_outcome_id ?? undefined
  }
  showAddQuestionModal.value = true
}

const questionModalContextLabel = computed(() => {
  if (editingQuestion.value) {
    return questionCurriculumLabel(editingQuestion.value)
  }
  return pendingQuestionContext.value ? `Adding question for: ${pendingQuestionContext.value.label}` : ''
})

// Small read-only badge on each question card once a category is selected, so the teacher can
// see which Topic/Learning Outcome a question is linked to without opening it.
const questionCurriculumLabel = (question: AssignmentQuestion): string => {
  const q = question as any
  if (!form.value.assessment_category) return ''
  // EOC's one group only carries the construct's FIRST topic's id (see curriculumQuestionGroups),
  // so a question saved against any other of the construct's topics wouldn't otherwise match it -
  // resolve straight from the construct's AO instead of the group lookup below.
  if (form.value.assessment_category === 'EOC' && q.curriculum_topic_id) {
    return selectedConstructAO.value ? `Assessment Objective (${selectedConstructAO.value})` : ''
  }
  if (q.learning_outcome_id) {
    const group = curriculumQuestionGroups.value.find((g: any) => g.learning_outcome_id === q.learning_outcome_id)
    if (group) return group.label
  }
  if (q.curriculum_topic_id) {
    const group = curriculumQuestionGroups.value.find((g: any) => g.curriculum_topic_id === q.curriculum_topic_id && !g.learning_outcome_id)
    if (group) return group.label
    if (form.value.assessment_category === 'LOA' && curriculumMeta.value?.topics) {
      const t = curriculumMeta.value.topics.find(t => t.id === q.curriculum_topic_id)
      if (t) return t.topic
    }
  }
  return ''
}

const formatQuestionType = (type: QuestionType) => {
  const typeMap: Record<QuestionType, string> = {
    multiple_choice_single: 'MCQ Single',
    multiple_choice_multiple: 'MCQ Multiple',
    true_false: 'True/False',
    fill_blank: 'Fill Blank',
    short_answer: 'Short Answer',
    essay: 'Essay',
    structured: 'Structured',
    scenario: 'Scenario'
  }
  return typeMap[type] || type
}

const addOption = () => {
  questionForm.value.options.push({ option_text: '', is_correct: false })
}

const removeOption = (index: number) => {
  questionForm.value.options.splice(index, 1)
}

const closeQuestionModal = () => {
  showAddQuestionModal.value = false
  editingQuestion.value = null
  pendingQuestionContext.value = null
  questionForm.value = {
    id: 0,
    question_type: 'essay',
    question_text: '',
    scenario_title: '',
    scenario_description: '',
    scenario_image: '',
    scenario_text: '',
    marks: 1,
    display_order: 0,
    allow_drawing: false,
    options: [] as QuestionOption[],
    sub_questions: [] as SubQuestion[],
    response_type: 'text',
    attachment_path: undefined,
    attachment_type: 'none',
    pdfFile: null
  }
}

const addSubQuestion = () => {
  if (!questionForm.value.sub_questions) {
    questionForm.value.sub_questions = []
  }
  questionForm.value.sub_questions.push({
    id: Date.now(),
    question_text: '',
    marks: 1,
    display_order: questionForm.value.sub_questions.length
  })
}

const removeSubQuestion = (index: number) => {
  if (questionForm.value.sub_questions) {
    questionForm.value.sub_questions.splice(index, 1)
    questionForm.value.sub_questions.forEach((sq, i) => sq.display_order = i)
  }
}

const moveSubQuestionUp = (index: number) => {
  if (questionForm.value.sub_questions && index > 0) {
    const temp = questionForm.value.sub_questions[index]
    questionForm.value.sub_questions[index] = questionForm.value.sub_questions[index - 1]
    questionForm.value.sub_questions[index - 1] = temp
    questionForm.value.sub_questions.forEach((sq, i) => sq.display_order = i)
  }
}

const moveSubQuestionDown = (index: number) => {
  if (questionForm.value.sub_questions && index < questionForm.value.sub_questions.length - 1) {
    const temp = questionForm.value.sub_questions[index]
    questionForm.value.sub_questions[index] = questionForm.value.sub_questions[index + 1]
    questionForm.value.sub_questions[index + 1] = temp
    questionForm.value.sub_questions.forEach((sq, i) => sq.display_order = i)
  }
}

const saveQuestion = () => {
  // For scenario questions, validate sub-questions if they exist
  if (questionForm.value.question_type === 'scenario') {
    if (!questionForm.value.scenario_description) {
      showToast('error', 'Please provide a scenario description')
      return
    }
    // Sub-questions are now optional - only validate if they exist
    if (questionForm.value.sub_questions && questionForm.value.sub_questions.length > 0) {
      if (questionForm.value.sub_questions.some(sq => !sq.question_text || sq.marks < 1)) {
        showToast('error', 'Please fill in all sub-question text and marks')
        return
      }
    } else {
      // If no sub-questions, require marks to be set
      if (!questionForm.value.marks || questionForm.value.marks < 1) {
        showToast('error', 'Please set marks for this question')
        return
      }
    }
  } else {
    if ((!questionForm.value.question_text && !hasQuestionPdf.value) || questionForm.value.marks < 1) {
      showToast('error', 'Please fill in the question text, or upload a PDF, and set marks')
      return
    }
  }

  if (isObjectiveQuestion.value) {
    const hasCorrectOption = questionForm.value.options.some(opt => opt.is_correct)
    if (!hasCorrectOption) {
      showToast('error', hasQuestionPdf.value
        ? 'The PDF supplies the question, but multiple-choice/true-false answers still need typed options with the correct one marked - add those below, or switch Question Type to Essay/Structured if you just want the PDF read and answered freely'
        : 'Please mark at least one option as correct')
      return
    }
  }

  const questionData: AssignmentQuestion = {
    ...questionForm.value,
    assignment_id: 0,
    parent_question_id: undefined,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: undefined,
    // For scenario questions, set question_text to null and use scenario_text
    question_text: questionForm.value.question_type === 'scenario' ? null : questionForm.value.question_text,
    // Combine scenario fields into scenario_text for storage
    scenario_text: questionForm.value.question_type === 'scenario'
      ? [questionForm.value.scenario_title, questionForm.value.scenario_description].filter(Boolean).join('\n')
      : questionForm.value.scenario_text,
    options: questionForm.value.options.map((opt, idx) => ({
      id: 0,
      question_id: 0,
      option_text: opt.option_text,
      is_correct: opt.is_correct,
      display_order: idx,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })),
    // Store sub-questions as a custom property (will be handled by backend)
    sub_questions: questionForm.value.sub_questions
  } as any

  // For scenario questions, marks should be sum of sub-questions
  if (questionForm.value.question_type === 'scenario' && questionForm.value.sub_questions && questionForm.value.sub_questions.length > 0) {
    (questionData as any).marks = questionForm.value.sub_questions.reduce((sum, sq) => sum + sq.marks, 0)
  }

  if (editingQuestion.value) {
    const index = questions.value.findIndex(q => q.id === editingQuestion.value!.id)
    if (index !== -1) {
      questions.value[index] = {
        ...questionData,
        display_order: index
      }
    }
  } else {
    questions.value.push({
      ...questionData,
      id: Date.now(),
      display_order: questions.value.length
    })
  }

  closeQuestionModal()
}

const editQuestion = (question: AssignmentQuestion) => {
  editingQuestion.value = question
  const qWithSubs = question as any
  
  // Parse scenario_text to extract title and description
  let scenarioTitle = ''
  let scenarioDescription = qWithSubs.scenario_text || ''
  if (qWithSubs.scenario_text && qWithSubs.scenario_text.includes('\n')) {
    const parts = qWithSubs.scenario_text.split('\n')
    scenarioTitle = parts[0]
    scenarioDescription = parts.slice(1).join('\n')
  }
  
  questionForm.value = {
    id: question.id,
    question_type: question.question_type,
    question_text: question.question_text,
    scenario_title: scenarioTitle,
    scenario_description: scenarioDescription,
    scenario_image: qWithSubs.scenario_image || '',
    scenario_text: qWithSubs.scenario_text || '',
    marks: question.marks,
    display_order: question.display_order,
    allow_drawing: question.allow_drawing,
    options: (question.options || []).map(opt => ({
      option_text: opt.option_text,
      is_correct: opt.is_correct
    })),
    sub_questions: qWithSubs.sub_questions || [],
    response_type: question.response_type || 'text',
    attachment_path: question.attachment_path,
    attachment_type: question.attachment_type || 'none',
    curriculum_topic_id: qWithSubs.curriculum_topic_id ?? undefined,
    learning_outcome_id: qWithSubs.learning_outcome_id ?? undefined,
    pdfFile: null
  }
  showAddQuestionModal.value = true
}

const deleteQuestion = (index: number) => {
  if (confirm('Are you sure you want to delete this question?')) {
    const [removed] = questions.value.splice(index, 1)
    // Real (already-saved) questions have small ids; new/unsaved ones use a Date.now()
    // temporary id and were never persisted, so there's nothing to delete server-side.
    if (removed && removed.id > 0 && removed.id <= 1000000) {
      deletedQuestionIds.value.push(removed.id)
    }
    // Update display orders
    questions.value.forEach((q, i) => q.display_order = i)
  }
}

const moveQuestionUp = (index: number) => {
  if (index > 0) {
    const temp = questions.value[index]
    questions.value[index] = questions.value[index - 1]
    questions.value[index - 1] = temp
    questions.value.forEach((q, i) => q.display_order = i)
  }
}

const moveQuestionDown = (index: number) => {
  if (index < questions.value.length - 1) {
    const temp = questions.value[index]
    questions.value[index] = questions.value[index + 1]
    questions.value[index + 1] = temp
    questions.value.forEach((q, i) => q.display_order = i)
  }
}

// Persists the in-memory questions.value array to the backend: creates new questions,
// updates existing ones (the per-question "Edit Question" modal only mutates this local
// array, so without this PUT the edit never reaches the server), and deletes any staged
// via deleteQuestion(). Runs on every Save Draft / Publish, regardless of assignment status.
// Uploads a question's teacher-picked PDF once the question has a real (server-assigned) id -
// the dedicated attachment endpoint checks ownership by id, so this can't run before the
// question itself has been created.
const uploadQuestionPdf = async (questionId: number, file: File) => {
  const formData = new FormData()
  formData.append('attachment', file)
  await axios.post(`${API_BASE}/teacher/assignments/questions/${questionId}/attachment`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const syncQuestions = async (assignmentId: number | string) => {
  for (const question of questions.value) {
    const { id, assignment_id, created_at, updated_at, deleted_at, sub_questions, pdfFile, ...questionData } = question as any
    const questionPayload = {
      assignment_id: assignmentId,
      ...questionData,
      sub_questions: (sub_questions || []).map((sq: SubQuestion, idx: number) => ({
        question_text: sq.question_text,
        marks: sq.marks,
        display_order: sq.display_order ?? idx
      }))
    }

    let realQuestionId = id
    if (id > 1000000) {
      // New question (temporary ID)
      const response = await axios.post(`${API_BASE}/teacher/assignments/${assignmentId}/questions`, questionPayload)
      realQuestionId = response.data.data.id
    } else {
      // Existing question - persist any edits made via the Edit Question modal
      await axios.put(`${API_BASE}/teacher/assignments/${assignmentId}/questions/${id}`, questionPayload)
    }

    if (pdfFile) {
      await uploadQuestionPdf(realQuestionId, pdfFile)
    }
  }

  for (const questionId of deletedQuestionIds.value) {
    await axios.delete(`${API_BASE}/teacher/assignments/${assignmentId}/questions/${questionId}`)
  }
  deletedQuestionIds.value = []
}

// Shared by saveDraft() and previewAssignment() - persists the assignment's own fields plus
// its questions (including any pending question PDFs), without touching status/is_published.
const persistAssignment = async (): Promise<number | string | null> => {
  const data: Record<string, any> = {
    // Basic Information's Title field was removed - title is auto-derived from the curriculum
    // selection (see derivedTitle), with a placeholder fallback so Save Draft never fails just
    // because the teacher hasn't picked a Topic yet.
    title: form.value.title || 'Untitled Assessment',
    description: form.value.description,
    type: form.value.type,
    total_marks: form.value.total_marks,
    due_date: form.value.due_date,
    instructions: form.value.instructions,
    category: form.value.category,
    open_at: form.value.open_at,
    duration_minutes: form.value.duration_minutes,
    pass_mark: form.value.pass_mark,
    allow_late_submission: form.value.allow_late_submission,
    attempts_allowed: form.value.attempts_allowed,
    shuffle_questions: form.value.shuffle_questions,
    shuffle_options: form.value.shuffle_options,
    show_marks_immediately: form.value.show_marks_immediately,
    show_answers_after_submission: form.value.show_answers_after_submission,
    allow_save_resume: form.value.allow_save_resume,
    academic_year: form.value.academic_year,
    subject_id: form.value.subject_id || null,
    scope: form.value.classTarget.scope,
    class_id: form.value.classTarget.class_id,
    class_group_name: form.value.classTarget.class_group_name,
    assessment_category: form.value.assessment_category,
    academic_year_id: curriculumSelection.value.academic_year_id || null,
    term_id: curriculumSelection.value.term_id || null
  }

  // Only force status back to 'draft' when creating a brand-new assignment (its sensible
  // starting state). Editing an existing one must never touch status/is_published here -
  // this used to unconditionally send status:'draft', is_published:false on every save,
  // which silently un-published an already-published assignment just from clicking "Save
  // Draft" to persist an unrelated field edit like a typo or mark correction.
  if (!isEdit.value) {
    data.status = 'draft'
    data.is_published = false
  }

  let response
  if (isEdit.value) {
    response = await axios.put(`${API_BASE}/teacher/assignments/${route.params.id}`, data)
  } else {
    response = await axios.post(`${API_BASE}/teacher/assignments`, data)
  }

  if (!response.data.success) return null

  const assignmentId = isEdit.value ? route.params.id : response.data.data.id
  await syncQuestions(assignmentId)
  await syncCurriculumLinkage(assignmentId)
  await syncAssignmentClasses(assignmentId)
  return assignmentId
}

// Replaces the assignment's curriculum linkage (Topic(s), and for LOA which Learning Outcomes)
// to match the current selection - a no-op when no category is set (legacy/non-curriculum flow).
const syncCurriculumLinkage = async (assignmentId: number | string) => {
  if (!form.value.assessment_category) return

  if (form.value.assessment_category === 'LOA') {
    const outcomeIds = Object.entries(selectedLearningOutcomeIds.value).filter(([, v]) => v).map(([id]) => Number(id))
    if (!curriculumSelection.value.curriculum_topic_id || outcomeIds.length === 0) return
    await axios.put(`${API_BASE}/teacher/assignments/${assignmentId}/curriculum`, {
      curriculum_topic_id: curriculumSelection.value.curriculum_topic_id,
      learning_outcome_ids: outcomeIds
    })
  } else {
    const topicIds = Object.entries(selectedTopicIds.value).filter(([, v]) => v).map(([id]) => Number(id))
    if (topicIds.length === 0) return
    const payload: Record<string, any> = { topic_ids: topicIds }
    if (form.value.assessment_category === 'EOC') payload.construct_id = selectedConstructId.value || null
    await axios.put(`${API_BASE}/teacher/assignments/${assignmentId}/curriculum`, payload)
  }
}

const saveDraft = async () => {
  // Title is auto-derived (see derivedTitle) and persistAssignment() falls back to "Untitled
  // Assessment" if nothing's derivable yet - Save Draft must never be blocked by a missing title.
  saving.value = true
  try {
    const assignmentId = await persistAssignment()
    if (assignmentId) {
      showToast('success', 'Assignment saved as draft')
      if (!isEdit.value) {
        // Vue Router reuses this component instance for a param-only navigation, so
        // onMounted (the only other loadAssignment() trigger) will not fire again -
        // await the navigation, then load explicitly so questions get their real ids.
        await router.push(`/teacher/assignments/${assignmentId}/edit`)
        await loadAssignment()
      } else {
        // Newly-added questions above were just created server-side and now have real
        // ids, but questions.value still holds their old temporary (Date.now()) ids -
        // reload so editing one of them right after saving works instead of getting
        // stuck on "save as draft first" forever.
        await loadAssignment()
      }
    }
  } catch (err: any) {
    console.error('Save draft error:', err)
    showToast('error', err.response?.data?.message || 'Failed to save assignment')
  } finally {
    saving.value = false
  }
}

const showPreviewModal = ref(false)
const previewing = ref(false)

// Saves whatever's currently on the page, then opens the real "preview as student" view
// (the same one used from the assignments list and by HOD/admin oversight) so the teacher sees
// exactly what a student would see - including any uploaded question PDFs - before publishing.
const previewAssignment = async () => {
  if (questions.value.length === 0) {
    showToast('error', 'Please add at least one question to preview')
    return
  }

  previewing.value = true
  try {
    const assignmentId = await persistAssignment()
    if (assignmentId) {
      if (!isEdit.value) {
        await router.push(`/teacher/assignments/${assignmentId}/edit`)
      }
      router.push(`/teacher/assignments/${assignmentId}/preview`)
    }
  } catch (err: any) {
    console.error('Preview error:', err)
    showToast('error', err.response?.data?.message || 'Failed to prepare preview')
  } finally {
    previewing.value = false
  }
}

const publishAssignment = async () => {
  if (!form.value.subject_id) {
    showToast('error', 'Please select a subject before publishing')
    return
  }
  if (selectedClassIds.value.length === 0) {
    showToast('error', 'Please select at least one class-stream before publishing')
    return
  }
  if (!form.value.assessment_category) {
    showToast('error', 'Please select an assessment category (LOA/AOI/EOC) before publishing')
    return
  }
  if (form.value.assessment_category === 'EOC' && !selectedConstructId.value) {
    showToast('error', 'Please select a Construct before publishing')
    return
  }
  if (questions.value.length === 0) {
    showToast('error', 'Please add at least one question before publishing')
    return
  }
  if (!form.value.due_date) {
    showToast('error', 'Please set a due date before publishing')
    return
  }
  if (!form.value.total_marks || form.value.total_marks <= 0) {
    showToast('error', 'Total marks must be greater than 0')
    return
  }
  if (marksMismatch.value) {
    showToast('error', `Question marks (${calculatedMarks.value}) must match total marks (${form.value.total_marks})`)
    return
  }
  // Client-side pre-check mirroring the backend's real publish validation (see
  // AssignmentController::validateCurriculumCompleteness()) - saves a round trip for the most
  // common incompleteness case, but the server is the actual authority.
  if (form.value.assessment_category) {
    const incomplete = curriculumQuestionGroups.value.filter(g => g.count === 0)
    if (curriculumQuestionGroups.value.length === 0) {
      showToast('error', form.value.assessment_category === 'LOA'
        ? 'Select a Topic and at least one Learning Outcome before publishing'
        : 'Select at least one Topic before publishing')
      return
    }
    if (incomplete.length > 0) {
      showToast('error', `"${incomplete[0].label}" requires at least one question before this ${form.value.assessment_category} assessment can be published.`)
      return
    }
  }

  publishing.value = true
  try {
    const data = {
      title: form.value.title || 'Untitled Assessment',
      description: form.value.description,
      type: form.value.type,
      total_marks: form.value.total_marks,
      due_date: form.value.due_date,
      instructions: form.value.instructions,
      category: form.value.category,
      open_at: form.value.open_at,
      duration_minutes: form.value.duration_minutes,
      pass_mark: form.value.pass_mark,
      allow_late_submission: form.value.allow_late_submission,
      attempts_allowed: form.value.attempts_allowed,
      shuffle_questions: form.value.shuffle_questions,
      shuffle_options: form.value.shuffle_options,
      show_marks_immediately: form.value.show_marks_immediately,
      show_answers_after_submission: form.value.show_answers_after_submission,
      allow_save_resume: form.value.allow_save_resume,
      academic_year: form.value.academic_year,
      subject_id: form.value.subject_id,
      scope: form.value.classTarget.scope,
      class_id: form.value.classTarget.class_id,
      class_group_name: form.value.classTarget.class_group_name,
      assessment_category: form.value.assessment_category,
      academic_year_id: curriculumSelection.value.academic_year_id || null,
      term_id: curriculumSelection.value.term_id || null,
      status: 'published',
      is_published: true
    }

    let response
    if (isEdit.value) {
      response = await axios.put(`${API_BASE}/teacher/assignments/${route.params.id}`, data)
    } else {
      response = await axios.post(`${API_BASE}/teacher/assignments`, data)
    }

    if (response.data.success) {
      const assignmentId = isEdit.value ? route.params.id : response.data.data.id

      await syncQuestions(assignmentId)
      await syncCurriculumLinkage(assignmentId)
      await syncAssignmentClasses(assignmentId)

      // Publish
      await axios.post(`${API_BASE}/teacher/assignments/${assignmentId}/publish`)

      showToast('success', 'Assignment published successfully')
      router.push('/teacher/assignments')
    }
  } catch (err: any) {
    console.error('Publish error:', err)
    const serverErrors = err.response?.data?.errors
    const firstErrorDetail = serverErrors ? Object.values(serverErrors)[0] : null
    showToast('error', (firstErrorDetail as string) || err.response?.data?.message || 'Failed to publish assignment')
  } finally {
    publishing.value = false
  }
}


onMounted(async () => {
  // availableClasses must be loaded before loadAssignment() tries to pre-check the right
  // Class-Stream boxes for a legacy "All Streams" assignment (it needs the full class list to
  // know which streams belong to that class level).
  await loadDropdownData()

  if (isEdit.value) {
    await loadAssignment()
    if (isPreview.value) {
      showPreviewModal.value = true
    }
  }
})
</script>

<style scoped>
.tag-pill {
  @apply inline-flex items-center px-2 py-1 rounded-md text-xs font-medium;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}
</style>
