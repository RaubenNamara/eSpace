<template>
  <div class="p-4 sm:p-6">
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="hidden sm:flex w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">eNotes Curriculum Setup</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            Define the theme/branch, topic, competence, and learning outcomes teachers pick from when creating eNotes.
          </p>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row gap-2 flex-shrink-0">
        <button
          @click="router.push('/admin/constructs')"
          class="w-full sm:w-auto px-5 py-2.5 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200 font-medium flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          <span>Construct</span>
        </button>
        <button
          @click="openCreateModal"
          class="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Add Curriculum Topic</span>
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div class="flex items-center gap-2 mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
        </svg>
        Filters
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <select v-model="filterDepartmentId" class="filter-select">
          <option value="">All Departments</option>
          <option v-for="d in meta?.departments" :key="d.id" :value="d.id">{{ d.name }}</option>
        </select>
        <select v-model="filterSubjectId" class="filter-select">
          <option value="">All Subjects</option>
          <option v-for="s in subjectsForFilter" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
        <select v-model="filterAcademicYearId" class="filter-select">
          <option value="">All Years</option>
          <option v-for="y in meta?.academic_years" :key="y.id" :value="y.id">{{ y.name }}</option>
        </select>
        <select v-model="filterClassId" class="filter-select">
          <option value="">All Class-Streams</option>
          <option v-for="c in meta?.class_streams" :key="c.id" :value="c.id">{{ c.display_name }}</option>
        </select>
        <select v-model="filterTermId" class="filter-select">
          <option value="">All Terms</option>
          <option v-for="t in termsForFilter" :key="t.id" :value="t.id">{{ t.name }}</option>
        </select>
        <select v-model="filterThemeBranch" class="filter-select">
          <option value="">All Themes/Branches</option>
          <option v-for="theme in themeBranchOptions" :key="theme" :value="theme">{{ theme }}</option>
        </select>
      </div>
      <div class="relative mt-3">
        <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          v-model="search"
          type="text"
          placeholder="Search topic, theme/branch, competence..."
          class="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white"
        >
      </div>
    </div>

    <!-- Table -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-200 dark:border-gray-700 border-t-indigo-600"></div>
      <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">Loading curriculum topics...</p>
    </div>

    <div v-else-if="groupedTopics.length === 0" class="flex flex-col items-center justify-center text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <svg class="w-14 h-14 text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
      </svg>
      <p class="text-gray-500 dark:text-gray-400">
        {{ topics.length === 0 ? 'No curriculum topics configured yet.' : 'No topics match these filters.' }}
      </p>
    </div>

    <div v-else class="space-y-4">
      <div v-for="classCard in classCards" :key="classCard.key" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          type="button"
          @click="toggleClassCard(classCard.key)"
          class="w-full flex items-center justify-between gap-3 px-5 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 transition-colors"
        >
          <div class="flex items-center gap-3 min-w-0">
            <svg
              class="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 transition-transform duration-200"
              :class="isClassExpanded(classCard.key) ? 'rotate-90' : ''"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <h3 class="text-base font-bold text-gray-900 dark:text-white truncate">{{ classCard.name }}</h3>
            <span class="tag-pill bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 flex-shrink-0">
              {{ classCard.subjectCards.length }} subject{{ classCard.subjectCards.length === 1 ? '' : 's' }}
            </span>
          </div>
        </button>

        <div v-show="isClassExpanded(classCard.key)" class="p-3 sm:p-4 space-y-3 bg-gray-50/60 dark:bg-gray-900/20">
          <div v-for="subjectCard in classCard.subjectCards" :key="subjectCard.key" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              type="button"
              @click="toggleSubjectCard(subjectCard.key)"
              class="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
            >
              <div class="flex items-center gap-2.5 min-w-0">
                <svg
                  class="w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform duration-200"
                  :class="isSubjectExpanded(subjectCard.key) ? 'rotate-90' : ''"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
                <span class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ subjectCard.name }}</span>
              </div>
              <span class="text-xs text-gray-400 flex-shrink-0">
                {{ subjectCard.groups.length }} topic{{ subjectCard.groups.length === 1 ? '' : 's' }}
              </span>
            </button>

            <div v-show="isSubjectExpanded(subjectCard.key)" class="divide-y divide-gray-100 dark:divide-gray-700 border-t border-gray-100 dark:border-gray-700">
              <div v-for="group in subjectCard.groups" :key="group.key" class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <div class="flex flex-col lg:flex-row lg:items-start gap-3 lg:gap-6">
                  <div class="flex flex-wrap items-center gap-1.5 lg:w-52 flex-shrink-0">
                    <span class="tag-pill bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ group.academic_year_name }}</span>
                    <span class="tag-pill bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ group.term_name }}</span>
                    <span class="tag-pill bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                      {{ group.instances[0].class_stream_name }}
                    </span>
                    <span v-if="group.instances.length > 1" class="text-xs text-gray-400">
                      +{{ group.instances.length - 1 }} more
                    </span>
                  </div>

                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">{{ group.theme_branch }}</p>
                    <p class="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{{ group.topic }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1.5 line-clamp-2">{{ group.competence }}</p>
                    <div v-if="group.learning_outcomes.length" class="mt-1.5 text-xs text-gray-500 dark:text-gray-400 truncate">
                      {{ group.learning_outcomes[0] }}
                      <span v-if="group.learning_outcomes.length > 1" class="text-gray-400">
                        +{{ group.learning_outcomes.length - 1 }} more
                      </span>
                    </div>
                    <p v-else class="mt-1.5 text-xs text-gray-400">No learning outcomes</p>
                  </div>

                  <div class="flex items-center gap-1 flex-shrink-0 lg:self-start">
                    <button @click="openViewModal(group)" title="View" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                    <button @click="openEditGroupModal(group)" title="Edit (applies to all class-streams)" class="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors">
                      <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button @click="confirmDeleteGroup(group)" title="Delete (all class-streams)" class="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors">
                      <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showFormModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] flex flex-col">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 sm:px-6 py-5 flex-shrink-0 rounded-t-2xl">
          <div class="flex items-center justify-between gap-4">
            <div class="min-w-0">
              <h3 class="text-xl sm:text-2xl font-bold text-white truncate">
                {{ editingTopic ? 'Edit Curriculum Topic' : 'Add Curriculum Topic' }}
              </h3>
              <p class="text-indigo-100 text-sm mt-1">
                Define the theme, topic, competence, and learning outcomes teachers pick from.
              </p>
            </div>
            <button @click="closeFormModal" class="text-white/80 hover:text-white transition-colors flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <form @submit.prevent="saveForm" class="flex-1 flex flex-col min-h-0">
          <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-7">
            <!-- Scope -->
            <div>
              <h4 class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-3 flex items-center">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                Scope
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Department</label>
                  <select v-model="formDepartmentId" @change="form.subject_id = ''" class="form-input">
                    <option value="">Select Department</option>
                    <option v-for="d in meta?.departments" :key="d.id" :value="d.id">{{ d.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">Subject *</label>
                  <select v-model="form.subject_id" required class="form-input" :disabled="!formDepartmentId">
                    <option value="">Select Subject</option>
                    <option v-for="s in subjectsForForm" :key="s.id" :value="s.id">{{ s.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">Academic Year *</label>
                  <select v-model="form.academic_year_id" required class="form-input" @change="form.term_id = ''">
                    <option value="">Select Academic Year</option>
                    <option v-for="y in meta?.academic_years" :key="y.id" :value="y.id">{{ y.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">Term *</label>
                  <select v-model="form.term_id" required class="form-input" :disabled="!form.academic_year_id">
                    <option value="">Select Term</option>
                    <option v-for="t in termsForForm" :key="t.id" :value="t.id">{{ t.name }}</option>
                  </select>
                </div>

                <div v-if="!editingTopic" ref="classDropdownRef" class="relative md:col-span-2">
                  <label class="form-label">Class-Stream(s) *</label>
                  <div v-if="classGroups.length === 0" class="text-sm text-gray-400">No classes found.</div>
                  <template v-else>
                    <button
                      type="button"
                      @click="classDropdownOpen = !classDropdownOpen"
                      class="w-full flex items-center justify-between px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-left focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      <span class="truncate" :class="selectedClassStreamCount ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'">
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
                      <div v-for="group in classGroups" :key="group.name">
                        <label class="flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm font-medium text-gray-800 dark:text-gray-200">
                          <input
                            type="checkbox"
                            :checked="group.streams.every(s => classStreamChecked[s.id])"
                            @change="toggleAllStreamsInGroup(group, ($event.target as HTMLInputElement).checked)"
                            class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          >
                          Select all streams of {{ group.name }}
                        </label>
                        <label
                          v-for="stream in group.streams"
                          :key="stream.id"
                          class="flex items-center gap-2.5 px-3 py-2 pl-8 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
                        >
                          <input type="checkbox" v-model="classStreamChecked[stream.id]" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                          {{ stream.display_name }}
                        </label>
                      </div>
                    </div>
                  </template>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Select one or more class-streams - a separate curriculum topic is created for each.
                  </p>
                </div>

                <div v-else-if="isGroupEdit" class="md:col-span-2">
                  <label class="form-label">Class-Stream(s)</label>
                  <div class="flex flex-wrap gap-1.5 px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/40">
                    <span
                      v-for="instance in editingInstances"
                      :key="instance.id"
                      class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                      {{ instance.class_stream_name }}
                    </span>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Editing all {{ editingInstances.length }} class-streams for this topic at once. To change one instance's class-stream, edit it individually from the View modal instead.
                  </p>
                </div>

                <div v-else class="md:col-span-2">
                  <label class="form-label">Class-Stream *</label>
                  <select v-model="form.class_id" required class="form-input">
                    <option value="">Select Class-Stream</option>
                    <option v-for="c in meta?.class_streams" :key="c.id" :value="c.id">{{ c.display_name }}</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Curriculum Details -->
            <div>
              <h4 class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-3 flex items-center">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Curriculum Details
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Theme / Branch *</label>
                  <input v-model="form.theme_branch" type="text" required placeholder="e.g. Computer Systems" class="form-input">
                </div>
                <div>
                  <label class="form-label">Topic *</label>
                  <input v-model="form.topic" type="text" required placeholder="e.g. Computer Hardware" class="form-input">
                </div>
                <div class="md:col-span-2">
                  <label class="form-label">Competence *</label>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-1.5">You should be able to:</p>
                  <textarea v-model="form.competence" required rows="3" placeholder="e.g. identify and classify computer hardware components..." class="form-input"></textarea>
                </div>
              </div>
            </div>

            <!-- Learning Outcomes -->
            <div>
              <h4 class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-3 flex items-center">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Learning Outcomes
              </h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">You should be able to:</p>
              <div class="flex flex-col sm:flex-row gap-2">
                <input
                  v-model="outcomeDraft"
                  type="text"
                  placeholder="e.g. identify the main hardware components of a computer"
                  class="form-input flex-1"
                  @keydown.enter.prevent="addOutcome"
                >
                <button
                  type="button"
                  @click="addOutcome"
                  class="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap font-medium"
                >
                  Add Learning Outcome
                </button>
              </div>

              <ol v-if="form.learning_outcomes.length" class="mt-3 space-y-1.5">
                <li
                  v-for="(_outcome, index) in form.learning_outcomes"
                  :key="index"
                  class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <span class="mt-1.5 w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                    {{ index + 1 }}
                  </span>
                  <input v-model="form.learning_outcomes[index]" type="text" class="form-input flex-1 py-1.5">
                  <div class="flex items-center flex-shrink-0">
                    <button type="button" @click="moveOutcomeUp(index)" :disabled="index === 0" class="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-30" title="Move up">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                    </button>
                    <button type="button" @click="moveOutcomeDown(index)" :disabled="index === form.learning_outcomes.length - 1" class="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-30" title="Move down">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <button type="button" @click="removeOutcome(index)" class="p-1 text-red-400 hover:text-red-600" title="Remove">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                </li>
              </ol>
              <p v-else class="text-xs text-gray-400 mt-2">No learning outcomes added yet.</p>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-5 sm:px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-3 flex-shrink-0 rounded-b-2xl">
            <button type="button" @click="closeFormModal" class="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-medium">
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving || (!editingTopic && selectedClassStreamCount === 0)"
              class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {{ saving ? 'Saving...' : (editingTopic ? 'Update Topic' : `Save Topic (${selectedClassStreamCount})`) }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="showViewModal && viewingGroup" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 sm:px-6 py-5 flex-shrink-0 rounded-t-2xl">
          <div class="flex items-center justify-between gap-4">
            <div class="min-w-0">
              <h3 class="text-xl sm:text-2xl font-bold text-white truncate">{{ viewingGroup.topic }}</h3>
              <p class="text-indigo-100 text-sm mt-1 truncate">{{ viewingGroup.theme_branch }}</p>
            </div>
            <button @click="showViewModal = false" class="text-white/80 hover:text-white transition-colors flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm">
          <div class="flex flex-wrap gap-2">
            <span class="tag-pill bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">{{ viewingGroup.subject_name }}</span>
            <span class="tag-pill bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ viewingGroup.academic_year_name }}</span>
            <span class="tag-pill bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ viewingGroup.term_name }}</span>
          </div>

          <div>
            <h4 class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1.5">Competence</h4>
            <p class="text-gray-600 dark:text-gray-400">{{ viewingGroup.competence }}</p>
          </div>

          <div>
            <h4 class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1.5">Learning Outcomes</h4>
            <ol v-if="viewingGroup.learning_outcomes.length" class="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li v-for="(o, i) in viewingGroup.learning_outcomes" :key="i">{{ o }}</li>
            </ol>
            <p v-else class="text-gray-400">None</p>
          </div>

          <div>
            <h4 class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-2">
              Class-Streams ({{ viewingGroup.instances.length }})
            </h4>
            <div class="space-y-1.5">
              <div
                v-for="instance in viewingGroup.instances"
                :key="instance.id"
                class="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700"
              >
                <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                  {{ instance.class_stream_name }}
                </span>
                <div class="flex items-center gap-1 flex-shrink-0">
                  <button @click="openEditModal(instance)" title="Edit" class="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md transition-colors">
                    <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button @click="confirmDelete(instance)" title="Delete" class="p-1.5 hover:bg-red-100 dark:hover:bg-red-900 rounded-md transition-colors">
                    <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Confirm Delete</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-6">
          {{ deleteTargetIds.length > 1
            ? `Are you sure you want to delete this curriculum topic across all ${deleteTargetIds.length} class-streams? Teachers will no longer be able to select any of them.`
            : 'Are you sure you want to delete this curriculum topic? Teachers will no longer be able to select it.' }}
        </p>
        <div class="flex justify-end space-x-3">
          <button @click="showDeleteModal = false" class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Cancel
          </button>
          <button @click="executeDelete" :disabled="saving" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50">
            {{ saving ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import apiService from '@/services/api'
import type { CurriculumMeta, CurriculumTopic, CurriculumTopicForm, CurriculumClassStreamOption } from '@/types/curriculum'

const router = useRouter()
const meta = ref<CurriculumMeta | null>(null)
const topics = ref<CurriculumTopic[]>([])
const loading = ref(false)
const saving = ref(false)

const filterDepartmentId = ref<number | ''>('')
const filterSubjectId = ref<number | ''>('')
const filterAcademicYearId = ref<number | ''>('')
const filterClassId = ref<number | ''>('')
const filterTermId = ref<number | ''>('')
const filterThemeBranch = ref<string>('')
const search = ref('')

const showFormModal = ref(false)
const editingTopic = ref<CurriculumTopic | null>(null)
// Every instance the current edit applies to - a single instance when editing one class-stream's
// copy (from the View modal), or every instance in the group when editing the group-level row (so
// the shared fields update everywhere at once, per the same content-shared-across-streams idea
// eNotes already uses). Class-Stream itself is only editable in single mode - saving a group edit
// re-sends each instance's own class_id unchanged (the backend requires it on every update), it
// never reassigns any instance to a different class.
const editingInstances = ref<CurriculumTopic[]>([])
const isGroupEdit = computed(() => editingInstances.value.length > 1)
const formDepartmentId = ref<number | ''>('')
const outcomeDraft = ref('')

const emptyForm = (): CurriculumTopicForm => ({
  subject_id: '',
  academic_year_id: '',
  class_id: '',
  term_id: '',
  theme_branch: '',
  topic: '',
  competence: '',
  learning_outcomes: []
})

const form = ref<CurriculumTopicForm>(emptyForm())

// Class-Stream is a checkbox multi-select when creating (one curriculum topic row is created per
// checked class-stream) - editing keeps a single select since it maps to one existing row.
const classStreamChecked = ref<Record<number, boolean>>({})
const selectedClassStreamCount = computed(() => Object.values(classStreamChecked.value).filter(Boolean).length)

// Class-Stream(s) dropdown: streams grouped by class name (e.g. "S.1") in the order the backend
// already sorts them (level, name, stream_name), with a "select all streams of X" checkbox per group.
const classDropdownOpen = ref(false)
const classDropdownRef = ref<HTMLElement | null>(null)

const classGroups = computed(() => {
  const map = new Map<string, { name: string; streams: CurriculumClassStreamOption[] }>()
  for (const cls of meta.value?.class_streams ?? []) {
    if (!map.has(cls.name)) map.set(cls.name, { name: cls.name, streams: [] })
    map.get(cls.name)!.streams.push(cls)
  }
  return Array.from(map.values())
})

const classDropdownLabel = computed(() => {
  if (selectedClassStreamCount.value === 0) return 'Select class-stream(s)'

  const ids = new Set(Object.entries(classStreamChecked.value).filter(([, v]) => v).map(([id]) => Number(id)))
  const labels: string[] = []
  for (const group of classGroups.value) {
    if (group.streams.length > 0 && group.streams.every(s => ids.has(s.id))) {
      labels.push(`${group.name} (All Streams)`)
      for (const s of group.streams) ids.delete(s.id)
    }
  }
  for (const group of classGroups.value) {
    for (const s of group.streams) {
      if (ids.has(s.id)) labels.push(s.display_name)
    }
  }
  return labels.join(', ')
})

const toggleAllStreamsInGroup = (group: { streams: CurriculumClassStreamOption[] }, checked: boolean) => {
  for (const s of group.streams) {
    if (checked) classStreamChecked.value[s.id] = true
    else delete classStreamChecked.value[s.id]
  }
}

const onClassDropdownClickOutside = (event: MouseEvent) => {
  if (classDropdownRef.value && !classDropdownRef.value.contains(event.target as Node)) {
    classDropdownOpen.value = false
  }
}

const showViewModal = ref(false)
const viewingGroupKey = ref<string | null>(null)
// Derived from groupedTopics (not a static snapshot) so an edit/delete made from inside the modal
// - on any instance in the group - is reflected immediately, and the modal closes cleanly if the
// group's last instance is deleted.
const viewingGroup = computed(() => groupedTopics.value.find(g => g.key === viewingGroupKey.value) ?? null)

const showDeleteModal = ref(false)
const deleteTargetIds = ref<number[]>([])

const subjectsForForm = computed(() => {
  if (!meta.value) return []
  if (!formDepartmentId.value) return meta.value.subjects
  return meta.value.subjects.filter(s => s.department_id === formDepartmentId.value)
})

const termsForForm = computed(() => {
  if (!meta.value || !form.value.academic_year_id) return []
  return meta.value.terms.filter(t => t.academic_year_id === form.value.academic_year_id)
})

const subjectsForFilter = computed(() => {
  if (!meta.value) return []
  if (!filterDepartmentId.value) return meta.value.subjects
  return meta.value.subjects.filter(s => s.department_id === filterDepartmentId.value)
})

const termsForFilter = computed(() => {
  if (!meta.value) return []
  if (!filterAcademicYearId.value) return meta.value.terms
  return meta.value.terms.filter(t => t.academic_year_id === filterAcademicYearId.value)
})

const themeBranchOptions = computed(() => {
  const set = new Set<string>()
  topics.value.forEach(t => set.add(t.theme_branch))
  return Array.from(set).sort()
})

const filteredTopics = computed(() => {
  return topics.value.filter(t => {
    if (filterDepartmentId.value) {
      const subject = meta.value?.subjects.find(s => s.id === t.subject_id)
      if (!subject || subject.department_id !== filterDepartmentId.value) return false
    }
    if (filterSubjectId.value && t.subject_id !== filterSubjectId.value) return false
    if (filterAcademicYearId.value && t.academic_year_id !== filterAcademicYearId.value) return false
    if (filterClassId.value && t.class_id !== filterClassId.value) return false
    if (filterTermId.value && t.term_id !== filterTermId.value) return false
    if (filterThemeBranch.value && t.theme_branch !== filterThemeBranch.value) return false
    if (search.value) {
      const q = search.value.toLowerCase()
      const hay = `${t.topic} ${t.theme_branch} ${t.competence}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })
})

// The create form bulk-creates one row per checked class-stream, so several rows can share
// identical subject/year/term/theme/topic/competence and only differ by class_id. The table
// groups those back into a single row so the shared columns aren't repeated - Class-Stream shows
// a "+N more" summary, and the View modal lists every underlying instance (each individually
// editable/deletable, since they're still separate database rows).
interface CurriculumTopicGroup {
  key: string
  subject_name?: string
  academic_year_name?: string
  term_name?: string
  theme_branch: string
  topic: string
  competence: string
  learning_outcomes: string[]
  instances: CurriculumTopic[]
}

const groupedTopics = computed<CurriculumTopicGroup[]>(() => {
  const map = new Map<string, CurriculumTopicGroup>()
  for (const t of filteredTopics.value) {
    const key = [t.subject_id, t.academic_year_id, t.term_id, t.theme_branch, t.topic, t.competence].join('|')
    if (!map.has(key)) {
      map.set(key, {
        key,
        subject_name: t.subject_name,
        academic_year_name: t.academic_year_name,
        term_name: t.term_name,
        theme_branch: t.theme_branch,
        topic: t.topic,
        competence: t.competence,
        learning_outcomes: t.learning_outcomes,
        instances: []
      })
    }
    map.get(key)!.instances.push(t)
  }
  return Array.from(map.values())
})

// Display groups by Class (e.g. "S.1") then by Subject (e.g. "Physics"), nesting groupedTopics
// under each - a group can appear under more than one class card if its instances span class-streams
// from different classes (e.g. a topic selected for both S.1-A and S.2-A when created).
interface CurriculumSubjectCard {
  key: string
  name: string
  groups: CurriculumTopicGroup[]
}
interface CurriculumClassCard {
  key: string
  name: string
  subjectCards: CurriculumSubjectCard[]
}

const classCards = computed<CurriculumClassCard[]>(() => {
  const cards: CurriculumClassCard[] = []
  for (const clsGroup of classGroups.value) {
    const streamIds = new Set(clsGroup.streams.map(s => s.id))
    const matchingGroups = groupedTopics.value.filter(g => g.instances.some(i => streamIds.has(i.class_id)))
    if (matchingGroups.length === 0) continue

    const subjMap = new Map<string, CurriculumTopicGroup[]>()
    for (const g of matchingGroups) {
      const subjName = g.subject_name ?? 'Unknown Subject'
      if (!subjMap.has(subjName)) subjMap.set(subjName, [])
      subjMap.get(subjName)!.push(g)
    }

    const subjectCards = Array.from(subjMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, groups]) => ({ key: `${clsGroup.name}|${name}`, name, groups }))

    cards.push({ key: clsGroup.name, name: clsGroup.name, subjectCards })
  }
  return cards
})

// Expand/collapse state keyed by card key - a key absent from the set means "collapsed" so new
// cards default closed until explicitly opened.
const expandedClassKeys = ref<Set<string>>(new Set())
const expandedSubjectKeys = ref<Set<string>>(new Set())
const isClassExpanded = (key: string) => expandedClassKeys.value.has(key)
const isSubjectExpanded = (key: string) => expandedSubjectKeys.value.has(key)
const toggleClassCard = (key: string) => {
  const next = new Set(expandedClassKeys.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  expandedClassKeys.value = next
}
const toggleSubjectCard = (key: string) => {
  const next = new Set(expandedSubjectKeys.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  expandedSubjectKeys.value = next
}

const loadMeta = async () => {
  try {
    const res = await apiService.get('/admin/enotes-curriculum/meta')
    if (res.data.success) meta.value = res.data.data
  } catch (error) {
    console.error('Failed to load curriculum meta:', error)
  }
}

const loadTopics = async () => {
  loading.value = true
  try {
    const res = await apiService.get('/admin/enotes-curriculum')
    if (res.data.success) topics.value = res.data.data.topics
  } catch (error) {
    console.error('Failed to load curriculum topics:', error)
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  editingTopic.value = null
  formDepartmentId.value = ''
  form.value = emptyForm()
  classStreamChecked.value = {}
  classDropdownOpen.value = false
  outcomeDraft.value = ''
  showFormModal.value = true
}

const openEditModal = (topic: CurriculumTopic) => {
  showViewModal.value = false
  editingTopic.value = topic
  editingInstances.value = [topic]
  const subject = meta.value?.subjects.find(s => s.id === topic.subject_id)
  formDepartmentId.value = subject?.department_id ?? ''
  form.value = {
    subject_id: topic.subject_id,
    academic_year_id: topic.academic_year_id,
    class_id: topic.class_id,
    term_id: topic.term_id,
    theme_branch: topic.theme_branch,
    topic: topic.topic,
    competence: topic.competence,
    learning_outcomes: [...topic.learning_outcomes]
  }
  outcomeDraft.value = ''
  showFormModal.value = true
}

// Editing the group-level row - the shared fields (theme/topic/competence/learning outcomes)
// apply to every class-stream instance in the group at once when saved. Class-Stream itself is
// shown read-only here (edit a single instance from the View modal to reassign just that one).
const openEditGroupModal = (group: CurriculumTopicGroup) => {
  const first = group.instances[0]
  editingTopic.value = first
  editingInstances.value = group.instances
  const subject = meta.value?.subjects.find(s => s.id === first.subject_id)
  formDepartmentId.value = subject?.department_id ?? ''
  form.value = {
    subject_id: first.subject_id,
    academic_year_id: first.academic_year_id,
    class_id: first.class_id,
    term_id: first.term_id,
    theme_branch: group.theme_branch,
    topic: group.topic,
    competence: group.competence,
    learning_outcomes: [...group.learning_outcomes]
  }
  outcomeDraft.value = ''
  showFormModal.value = true
}

const closeFormModal = () => {
  showFormModal.value = false
  editingTopic.value = null
  editingInstances.value = []
}

const addOutcome = () => {
  const text = outcomeDraft.value.trim()
  if (!text) return
  form.value.learning_outcomes.push(text)
  outcomeDraft.value = ''
}

const removeOutcome = (index: number) => {
  form.value.learning_outcomes.splice(index, 1)
}

const moveOutcomeUp = (index: number) => {
  if (index === 0) return
  const arr = form.value.learning_outcomes
  ;[arr[index - 1], arr[index]] = [arr[index], arr[index - 1]]
}

const moveOutcomeDown = (index: number) => {
  const arr = form.value.learning_outcomes
  if (index === arr.length - 1) return
  ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
}

const saveForm = async () => {
  saving.value = true
  try {
    if (editingTopic.value) {
      const sharedPayload = {
        subject_id: form.value.subject_id,
        academic_year_id: form.value.academic_year_id,
        term_id: form.value.term_id,
        theme_branch: form.value.theme_branch,
        topic: form.value.topic,
        competence: form.value.competence,
        learning_outcomes: form.value.learning_outcomes
      }
      // Group edit: apply the shared fields to every class-stream instance, re-sending each
      // instance's own class_id unchanged (the backend requires it on every update, but the
      // group-edit form never lets it be reassigned). Single edit: send form.value.class_id,
      // since that field is editable in that mode.
      const instances = editingInstances.value.length ? editingInstances.value : [editingTopic.value]
      await Promise.all(instances.map(instance => apiService.put(
        `/admin/enotes-curriculum/${instance.id}`,
        { ...sharedPayload, class_id: isGroupEdit.value ? instance.class_id : form.value.class_id }
      )))
    } else {
      const classIds = Object.entries(classStreamChecked.value)
        .filter(([, checked]) => checked)
        .map(([id]) => Number(id))

      const payload = {
        subject_id: form.value.subject_id,
        academic_year_id: form.value.academic_year_id,
        class_ids: classIds,
        term_id: form.value.term_id,
        theme_branch: form.value.theme_branch,
        topic: form.value.topic,
        competence: form.value.competence,
        learning_outcomes: form.value.learning_outcomes
      }
      await apiService.post('/admin/enotes-curriculum', payload)
    }

    closeFormModal()
    await loadTopics()
  } catch (error: any) {
    alert(error.response?.data?.message || 'Failed to save curriculum topic')
  } finally {
    saving.value = false
  }
}

const openViewModal = (group: CurriculumTopicGroup) => {
  viewingGroupKey.value = group.key
  showViewModal.value = true
}

const confirmDelete = (topic: CurriculumTopic) => {
  deleteTargetIds.value = [topic.id]
  showDeleteModal.value = true
}

const confirmDeleteGroup = (group: CurriculumTopicGroup) => {
  deleteTargetIds.value = group.instances.map(i => i.id)
  showDeleteModal.value = true
}

const executeDelete = async () => {
  if (!deleteTargetIds.value.length) return
  saving.value = true
  try {
    await Promise.all(deleteTargetIds.value.map(id => apiService.delete(`/admin/enotes-curriculum/${id}`)))
    showDeleteModal.value = false
    deleteTargetIds.value = []
    await loadTopics()
  } catch (error: any) {
    alert(error.response?.data?.message || 'Failed to delete')
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await loadMeta()
  await loadTopics()
  document.addEventListener('click', onClassDropdownClickOutside)
})

onUnmounted(() => document.removeEventListener('click', onClassDropdownClickOutside))
</script>

<style scoped>
.filter-select {
  @apply px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-sm;
}
.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2;
}
.form-input {
  @apply w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed;
}
.tag-pill {
  @apply inline-flex items-center px-2 py-1 rounded-md text-xs font-medium;
}
</style>
