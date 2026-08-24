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
      <div class="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
            </div>
          </div>
          <div class="flex items-center flex-wrap gap-2 sm:gap-3">
            <button
              v-if="!isPreview"
              @click="saveDraft"
              :disabled="saving"
              class="px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center space-x-2 text-sm sm:text-base"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
              </svg>
              <span>{{ saving ? 'Saving...' : 'Save Draft' }}</span>
            </button>
            <button
              v-if="!isPreview"
              @click="previewAssignment"
              :disabled="!form.title || questions.length === 0"
              class="px-3 sm:px-4 py-2 border border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors disabled:opacity-50 flex items-center space-x-2 text-sm sm:text-base"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <span>Preview</span>
            </button>
            <button
              v-if="!isPreview"
              @click="publishAssignment"
              :disabled="!canPublish || publishing"
              class="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center space-x-2 text-sm sm:text-base"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ publishing ? 'Publishing...' : 'Publish' }}</span>
            </button>
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
    <div v-if="marksMismatch" class="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
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
    <div class="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left Sidebar - Assignment Details (hidden in preview mode) -->
        <div v-if="!isPreview" class="lg:col-span-4 xl:col-span-3 space-y-6">
          
          <!-- Basic Information -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Basic Information
              </h2>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                <input
                  v-model="form.title"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Assignment title"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select
                  v-model="form.category"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                >
                  <option value="">Select category</option>
                  <option value="Homework">Homework</option>
                  <option value="Classwork">Classwork</option>
                  <option value="Quiz">Quiz</option>
                  <option value="Test">Test</option>
                  <option value="Coursework">Coursework</option>
                  <option value="Revision">Revision</option>
                  <option value="Practice">Practice</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  v-model="form.description"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors resize-none"
                  placeholder="Brief description of the assignment..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Target Audience -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                Target Audience
              </h2>
            </div>
            <div class="p-6 space-y-4">
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

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class *</label>
                <select
                  v-model="form.class_id"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                  :disabled="loadingClasses"
                >
                  <option value="">Select class</option>
                  <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                    {{ cls.name }}{{ cls.stream_name ? ' - ' + cls.stream_name : '' }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Marks -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
                Marks
              </h2>
            </div>
            <div class="p-6 space-y-4">
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

          <!-- Marks Summary Card -->
          <div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h2 class="text-lg font-semibold mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Marks Summary
            </h2>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-indigo-100">Total Assignment Marks:</span>
                <span class="font-bold text-xl">{{ form.total_marks }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-indigo-100">Calculated Question Marks:</span>
                <span :class="marksMismatch ? 'font-bold text-yellow-300' : 'font-bold text-green-300'">
                  {{ calculatedMarks }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-indigo-100">Number of Questions:</span>
                <span class="font-bold text-xl">{{ questions.length }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Content - Questions -->
        <div :class="isPreview ? 'lg:col-span-12' : 'lg:col-span-8 xl:col-span-9'">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Questions
              </h2>
              <button
                v-if="!isPreview"
                @click="showAddQuestionModal = true"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2 shadow-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                <span>Add Question</span>
              </button>
            </div>

            <div class="p-6">
              <!-- Empty State -->
              <div v-if="questions.length === 0" class="text-center py-16">
                <div class="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No questions yet</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">Start building your assignment by adding questions</p>
                <button
                  @click="showAddQuestionModal = true"
                  class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center space-x-2 shadow-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  <span>Add Your First Question</span>
                </button>
              </div>

              <!-- Questions List -->
              <div v-else class="space-y-4">
                <div
                  v-for="(question, index) in questions"
                  :key="question.id"
                  class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center space-x-2">
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
                      </div>
                      
                      <!-- Scenario display with sub-questions -->
                      <div v-if="question.question_type === 'scenario'" class="mt-3">
                        <div v-if="question.scenario_text" class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg mb-2">
                          <p class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line" v-html="question.scenario_text"></p>
                        </div>
                        <div v-if="(question as any).sub_questions && (question as any).sub_questions.length > 0" class="space-y-2">
                          <div
                            v-for="(subQ, subIndex) in (question as any).sub_questions"
                            :key="subQ.id"
                            class="flex items-start space-x-2 text-sm"
                          >
                            <span class="font-medium text-gray-700 dark:text-gray-300">{{ String.fromCharCode(97 + (subIndex as number)) }}</span>
                            <div class="flex-1">
                              <p class="text-gray-900 dark:text-white">{{ subQ.question_text }}</p>
                              <span class="text-xs text-gray-500 dark:text-gray-400">{{ subQ.marks }} marks</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Regular question display -->
                      <div v-else>
                        <p class="text-gray-900 dark:text-white mb-2" v-html="question.question_text"></p>
                        <div v-if="question.options && question.options.length > 0" class="mt-2">
                          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Options:</p>
                          <ul class="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                            <li v-for="(option, optIndex) in question.options" :key="optIndex" class="flex items-center space-x-2">
                              <span>{{ option.option_text }}</span>
                              <span v-if="option.is_correct" class="text-green-600 dark:text-green-400">✓</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div v-if="!isPreview" class="flex items-center space-x-2 ml-4">
                      <button
                        @click="editQuestion(question)"
                        class="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        title="Edit"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button
                        @click="moveQuestionUp(index)"
                        :disabled="index === 0"
                        class="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors disabled:opacity-50"
                        title="Move Up"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                        </svg>
                      </button>
                      <button
                        @click="moveQuestionDown(index)"
                        :disabled="index === questions.length - 1"
                        class="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors disabled:opacity-50"
                        title="Move Down"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                      <button
                        @click="deleteQuestion(index)"
                        class="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
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

          <!-- Schedule - compact, sits right under Questions alongside Settings. -->
          <div v-if="!isPreview" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mt-6">
            <div class="px-5 py-3 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 flex items-center">
                <svg class="w-4 h-4 mr-1.5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Schedule
              </h2>
            </div>
            <div class="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Opens</label>
                <input
                  v-model="form.open_at"
                  type="datetime-local"
                  class="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                >
              </div>
              <div>
                <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Deadline *</label>
                <input
                  v-model="form.due_date"
                  type="datetime-local"
                  class="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                >
              </div>
              <div>
                <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Duration (min)</label>
                <input
                  v-model.number="form.duration_minutes"
                  type="number"
                  min="1"
                  class="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="60"
                >
              </div>
            </div>
          </div>

          <!-- Settings - compact, sits right under Questions since it's the last thing a
               teacher tweaks before saving/publishing rather than core assignment setup. -->
          <div v-if="!isPreview" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mt-6">
            <div class="px-5 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 flex items-center">
                <svg class="w-4 h-4 mr-1.5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Settings
              </h2>
              <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                Attempts
                <input
                  v-model.number="form.attempts_allowed"
                  type="number"
                  min="1"
                  class="w-14 px-1.5 py-0.5 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                >
              </label>
            </div>
            <div class="p-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
              <label class="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <input v-model="form.allow_late_submission" type="checkbox" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0">
                <span class="text-xs text-gray-700 dark:text-gray-300 leading-tight">Late submission</span>
              </label>
              <label class="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <input v-model="form.shuffle_questions" type="checkbox" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0">
                <span class="text-xs text-gray-700 dark:text-gray-300 leading-tight">Shuffle questions</span>
              </label>
              <label class="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <input v-model="form.shuffle_options" type="checkbox" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0">
                <span class="text-xs text-gray-700 dark:text-gray-300 leading-tight">Shuffle options</span>
              </label>
              <label class="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <input v-model="form.allow_save_resume" type="checkbox" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0">
                <span class="text-xs text-gray-700 dark:text-gray-300 leading-tight">Save &amp; continue</span>
              </label>
              <label class="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <input v-model="form.show_marks_immediately" type="checkbox" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0">
                <span class="text-xs text-gray-700 dark:text-gray-300 leading-tight">Show marks instantly</span>
              </label>
              <label class="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <input v-model="form.show_answers_after_submission" type="checkbox" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0">
                <span class="text-xs text-gray-700 dark:text-gray-300 leading-tight">Show answers after</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Question Modal -->
    <div v-if="showAddQuestionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto p-4">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-3xl my-8 transition-all"
      >
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {{ editingQuestion ? 'Edit Question' : 'Add Question' }}
        </h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Question Type *</label>
            <select
              v-model="questionForm.question_type"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              :disabled="!!editingQuestion"
            >
              <option value="multiple_choice_single">Multiple Choice - Single Answer</option>
              <option value="multiple_choice_multiple">Multiple Choice - Multiple Answers</option>
              <option value="true_false">True/False</option>
              <option
                v-if="questionForm.question_type === 'fill_blank' || questionForm.question_type === 'short_answer'"
                :value="questionForm.question_type"
              >{{ formatQuestionType(questionForm.question_type) }} (legacy)</option>
              <option value="essay">Essay</option>
              <option value="structured">Structured Question</option>
              <option value="scenario">Scenario-based Question</option>
            </select>
          </div>

          <div v-if="questionForm.question_type === 'scenario'">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Scenario Title</label>
            <input
              v-model="questionForm.scenario_title"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white mb-4"
              placeholder="e.g., Network Connectivity Issue"
            >
            
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Scenario Description</label>
            <CKEditor
              v-model="questionForm.scenario_description!"
              :height="100"
              class="mb-4"
            />
            
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Scenario Image (Optional)</label>
            <input
              v-model="questionForm.scenario_image"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white mb-4"
              placeholder="Image URL or upload path"
            >
          </div>

          <div v-if="questionForm.question_type === 'scenario'">
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sub-Questions (Optional)</label>
              <button
                @click="addSubQuestion"
                class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium"
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
                  <div class="flex items-center space-x-1">
                    <button
                      @click="moveSubQuestionUp(index)"
                      :disabled="index === 0"
                      class="p-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-50"
                      title="Move Up"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                      </svg>
                    </button>
                    <button
                      @click="moveSubQuestionDown(index)"
                      :disabled="index === questionForm.sub_questions!.length - 1"
                      class="p-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-50"
                      title="Move Down"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    <button
                      @click="removeSubQuestion(index)"
                      class="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
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
              <label class="flex items-center mt-6">
                <input
                  v-model="questionForm.allow_drawing"
                  type="checkbox"
                  class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                >
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Allow drawing workspace</span>
              </label>
            </div>
          </div>

          <div v-if="questionForm.question_type !== 'scenario'">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Question Text *</label>
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
              <label class="flex items-center mt-6">
                <input
                  v-model="questionForm.allow_drawing"
                  type="checkbox"
                  class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                >
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Allow drawing workspace</span>
              </label>
            </div>
          </div>

          <!-- Options for Objective Questions -->
          <div v-if="isObjectiveQuestion">
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Options (Optional)</label>
              <button
                @click="addOption"
                class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium"
              >
                + Add Option
              </button>
            </div>
            <div v-if="questionForm.options && questionForm.options.length > 0" class="space-y-2">
              <div
                v-for="(option, index) in questionForm.options"
                :key="index"
                class="flex items-center space-x-2"
              >
                <input
                  v-model="option.option_text"
                  type="text"
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  :placeholder="`Option ${index + 1}`"
                >
                <label class="flex items-center">
                  <input
                    v-model="option.is_correct"
                    type="checkbox"
                    class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  >
                  <span class="ml-1 text-sm text-gray-700 dark:text-gray-300">Correct</span>
                </label>
                <button
                  @click="removeOption(index)"
                  class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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

        <div class="flex justify-end space-x-4 mt-6">
          <button
            @click="closeQuestionModal"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="saveQuestion"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {{ editingQuestion ? 'Update' : 'Add' }} Question
          </button>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <div v-if="showPreviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full my-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Assignment Preview</h2>
          <button
            @click="showPreviewModal = false"
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Assignment Details -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ form.title }}</h3>
          <p v-if="form.description" class="text-gray-600 dark:text-gray-400 mb-4">{{ form.description }}</p>
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
              class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
            >
              <div class="flex items-start space-x-3">
                <span class="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-medium">
                  {{ index + 1 }}
                </span>
                <div class="flex-1">
                  <!-- Scenario Question -->
                  <div v-if="question.question_type === 'scenario'">
                    <div v-if="question.scenario_text" class="mb-4">
                      <div class="text-gray-900 dark:text-white text-justify" v-html="question.scenario_text"></div>
                    </div>
                  </div>
                  <!-- Regular Question -->
                  <div v-else>
                    <div class="text-gray-900 dark:text-white font-medium mb-2" v-html="question.question_text"></div>
                    <!-- Options for objective questions -->
                    <div v-if="question.options && question.options.length > 0" class="mt-3 space-y-2">
                      <div
                        v-for="(option, optIndex) in question.options"
                        :key="optIndex"
                        class="flex items-center space-x-2"
                      >
                        <span class="text-gray-500 dark:text-gray-400">{{ String.fromCharCode(97 + optIndex) }})</span>
                        <span class="text-gray-700 dark:text-gray-300">{{ option.option_text }}</span>
                        <span v-if="option.is_correct" class="text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded">Correct</span>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>Type: {{ question.question_type }}</span>
                    <span>Marks: {{ question.marks }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="showPreviewModal = false"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import CKEditor from '@/components/teacher/CKEditor.vue'
import type { AssignmentQuestion, QuestionType, Subject, Class, ResponseType, AttachmentType } from '@/types'

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
  class_id: null as number | null
})

const questions = ref<AssignmentQuestion[]>([])
// Existing (server-side) question ids removed via deleteQuestion() during this editing
// session - staged locally and only actually deleted from the backend on the next save.
const deletedQuestionIds = ref<number[]>([])
const saving = ref(false)
const publishing = ref(false)

const subjects = ref<Subject[]>([])
const classes = ref<Class[]>([])
const academicYears = ref<any[]>([])
const loadingSubjects = ref(false)
const loadingClasses = ref(false)
const loadingAcademicYears = ref(false)

const showAddQuestionModal = ref(false)
const editingQuestion = ref<AssignmentQuestion | null>(null)
const questionForm = ref<QuestionForm>({
  id: 0,
  question_type: 'multiple_choice_single',
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
  attachment_type: 'none'
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

const canPublish = computed(() => {
  return form.value.title && 
         form.value.due_date && 
         form.value.total_marks > 0 && 
         form.value.subject_id && 
         form.value.class_id && 
         !marksMismatch.value
})

const isObjectiveQuestion = computed(() => {
  return ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'].includes(questionForm.value.question_type)
})

const loadDropdownData = async () => {
  await loadAssignments()
  await loadAcademicYears()
}

const loadAssignments = async () => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/enotes/assignments`)
    if (response.data.success) {
      subjects.value = response.data.data.subjects
      classes.value = response.data.data.classes
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
        class_id: assignment.class_id || null
      }
      
      // Load questions if available
      if (assignment.questions && Array.isArray(assignment.questions)) {
        questions.value = assignment.questions.map((q: any) => ({
          ...q,
          options: q.options || []
        }))
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
  questionForm.value = {
    id: 0,
    question_type: 'multiple_choice_single',
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
    attachment_type: 'none'
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
    if (!questionForm.value.scenario_title && !questionForm.value.scenario_description) {
      showToast('error', 'Please provide a scenario title or description')
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
    if (!questionForm.value.question_text || questionForm.value.marks < 1) {
      showToast('error', 'Please fill in required fields')
      return
    }
  }

  if (isObjectiveQuestion.value) {
    const hasCorrectOption = questionForm.value.options.some(opt => opt.is_correct)
    if (!hasCorrectOption) {
      showToast('error', 'Please mark at least one option as correct')
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
      ? `${questionForm.value.scenario_title || ''}\n${questionForm.value.scenario_description || ''}`
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
    attachment_type: question.attachment_type || 'none'
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
const syncQuestions = async (assignmentId: number | string) => {
  for (const question of questions.value) {
    const { id, assignment_id, created_at, updated_at, deleted_at, sub_questions, ...questionData } = question as any
    const questionPayload = {
      assignment_id: assignmentId,
      ...questionData,
      sub_questions: (sub_questions || []).map((sq: SubQuestion, idx: number) => ({
        question_text: sq.question_text,
        marks: sq.marks,
        display_order: sq.display_order ?? idx
      }))
    }

    if (id > 1000000) {
      // New question (temporary ID)
      await axios.post(`${API_BASE}/teacher/assignments/${assignmentId}/questions`, questionPayload)
    } else {
      // Existing question - persist any edits made via the Edit Question modal
      await axios.put(`${API_BASE}/teacher/assignments/${assignmentId}/questions/${id}`, questionPayload)
    }
  }

  for (const questionId of deletedQuestionIds.value) {
    await axios.delete(`${API_BASE}/teacher/assignments/${assignmentId}/questions/${questionId}`)
  }
  deletedQuestionIds.value = []
}

const saveDraft = async () => {
  if (!form.value.title) {
    showToast('error', 'Please enter a title')
    return
  }

  saving.value = true
  try {
    const data: Record<string, any> = {
      title: form.value.title,
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
      class_id: form.value.class_id || null
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

    if (response.data.success) {
      const assignmentId = isEdit.value ? route.params.id : response.data.data.id

      await syncQuestions(assignmentId)

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

const previewAssignment = () => {
  if (!form.value.title || questions.value.length === 0) {
    showToast('error', 'Please add a title and at least one question to preview')
    return
  }
  showPreviewModal.value = true
}

const publishAssignment = async () => {
  if (!canPublish.value) {
    showToast('error', 'Please complete all required fields and ensure marks match')
    return
  }

  publishing.value = true
  try {
    const data = {
      title: form.value.title,
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
      class_id: form.value.class_id,
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

      // Publish
      await axios.post(`${API_BASE}/teacher/assignments/${assignmentId}/publish`)
      
      showToast('success', 'Assignment published successfully')
      router.push('/teacher/assignments')
    }
  } catch (err: any) {
    console.error('Publish error:', err)
    showToast('error', err.response?.data?.message || 'Failed to publish assignment')
  } finally {
    publishing.value = false
  }
}


onMounted(() => {
  loadDropdownData()
  
  if (isEdit.value) {
    loadAssignment().then(() => {
      if (isPreview.value) {
        showPreviewModal.value = true
      }
    })
  }
})
</script>

<style scoped>
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
