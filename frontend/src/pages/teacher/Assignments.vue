<template>
  <div>
    <!-- Header - title shares a row with the search/filters and "Create Assignment" so the
         dropdowns line up exactly with the heading; the subtitle drops to its own line
         underneath instead of a separate bar further down the page. -->
    <div class="flex items-center justify-between gap-2 mb-1">
      <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap flex-shrink-0">Assignments</h1>

      <div class="flex items-center gap-2 flex-1 min-w-0 justify-end">
        <div class="flex flex-nowrap items-center gap-2 overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0 min-w-0">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="flex-shrink-0 px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white w-28"
          >

          <select
            v-model="statusFilter"
            class="flex-shrink-0 max-w-[92px] truncate px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          <select
            v-model="typeFilter"
            class="flex-shrink-0 max-w-[92px] truncate px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Types</option>
            <option value="essay">Essay</option>
            <option value="scenario">Scenario</option>
            <option value="objective">Objective</option>
            <option value="file_upload">File Upload</option>
            <option value="mixed">Mixed</option>
          </select>

          <select
            v-model="subjectFilter"
            class="flex-shrink-0 max-w-[92px] truncate px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            :disabled="!availableSubjects || availableSubjects.length === 0"
          >
            <option value="">Subjects</option>
            <option v-for="subject in availableSubjects" :key="subject.id" :value="subject.id">
              {{ subject.name }}
            </option>
          </select>

          <select
            v-model="classFilter"
            class="flex-shrink-0 max-w-[92px] truncate px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            :disabled="!availableClasses || availableClasses.length === 0"
          >
            <option value="">Classes</option>
            <option v-for="cls in availableClasses" :key="cls.id" :value="cls.id">
              {{ cls.name }}
            </option>
          </select>
        </div>

        <button
          v-if="assignments.length > 0"
          @click="router.push('/teacher/assignments/create')"
          class="flex-shrink-0 px-2.5 py-1 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-500/20 whitespace-nowrap"
        >
          Create Assignment
        </button>
      </div>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Create and manage assessments for your classes</p>

    <!-- Dashboard Stats - Total/Draft/Published are clickable to filter the list below; Active,
         Awaiting Marking and Total Submissions are derived figures with no matching status
         filter, so they stay as plain (non-clickable) cards in the same compact style. The count
         sits as a corner badge so each card is shorter and the label can be centered. -->
    <div v-if="stats" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4 mb-6">
      <button
        @click="statusFilter = ''"
        class="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-shadow hover:shadow-md text-center"
        :class="statusFilter === '' ? 'border-indigo-300 dark:border-indigo-700 ring-1 ring-indigo-100 dark:ring-indigo-900/30' : 'border-gray-200 dark:border-gray-700'"
      >
        <span class="absolute top-2 right-3 text-lg font-bold text-gray-900 dark:text-white">{{ stats.total }}</span>
        <p class="text-sm text-gray-500 dark:text-gray-400">Total</p>
      </button>
      <button
        @click="statusFilter = 'draft'"
        class="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-shadow hover:shadow-md text-center"
        :class="statusFilter === 'draft' ? 'border-yellow-300 dark:border-yellow-700 ring-1 ring-yellow-100 dark:ring-yellow-900/30' : 'border-gray-200 dark:border-gray-700'"
      >
        <span class="absolute top-2 right-3 text-lg font-bold text-yellow-600 dark:text-yellow-400">{{ stats.draft }}</span>
        <p class="text-sm text-gray-500 dark:text-gray-400">Draft</p>
      </button>
      <button
        @click="statusFilter = 'published'"
        class="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-shadow hover:shadow-md text-center"
        :class="statusFilter === 'published' ? 'border-green-300 dark:border-green-700 ring-1 ring-green-100 dark:ring-green-900/30' : 'border-gray-200 dark:border-gray-700'"
      >
        <span class="absolute top-2 right-3 text-lg font-bold text-green-600 dark:text-green-400">{{ stats.published }}</span>
        <p class="text-sm text-gray-500 dark:text-gray-400">Published</p>
      </button>
      <div class="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
        <span class="absolute top-2 right-3 text-lg font-bold text-blue-600 dark:text-blue-400">{{ stats.active }}</span>
        <p class="text-sm text-gray-500 dark:text-gray-400">Active</p>
      </div>
      <div class="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
        <span class="absolute top-2 right-3 text-lg font-bold text-orange-600 dark:text-orange-400">{{ stats.awaiting_marking }}</span>
        <p class="text-sm text-gray-500 dark:text-gray-400">Awaiting Marking</p>
      </div>
      <div class="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
        <span class="absolute top-2 right-3 text-lg font-bold text-purple-600 dark:text-purple-400">{{ stats.total_submissions }}</span>
        <p class="text-sm text-gray-500 dark:text-gray-400">Total Submissions</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
      <div class="flex items-center">
        <svg class="w-6 h-6 text-red-600 dark:text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-600 dark:text-red-400">{{ error }}</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading && assignments.length === 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-12 text-center">
      <svg class="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">No assignments yet</h3>
      <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">Get started by creating your first assignment</p>
      <button
        @click="router.push('/teacher/assignments/create')"
        class="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Create Assignment
      </button>
    </div>

    <!-- Assignments List -->
    <div v-else>
      <BulkActionBar :count="bulk.selectedCount.value" @clear="bulk.clear()">
        <button @click="bulkExport" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Export CSV</button>
        <button @click="bulkDeleteSelected" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors">Delete</button>
      </BulkActionBar>

      <div v-if="filteredAssignments.length > 0" class="flex items-center gap-2 mb-3">
        <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
          <input
            type="checkbox"
            :checked="bulk.allSelected(visibleIds)"
            @change="bulk.toggleAll(visibleIds)"
            class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
          >
          Select all
        </label>
      </div>

      <!-- No filter match -->
      <div v-if="filteredAssignments.length === 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-12 text-center">
        <p class="text-gray-600 dark:text-gray-400 mb-3">No assignments match your filters</p>
        <button @click="clearFilters" class="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
          Clear filters
        </button>
      </div>

      <template v-else>
      <!-- Assignments Cards (mobile / tablet) -->
      <div class="lg:hidden space-y-3">
        <div
          v-for="assignment in filteredAssignments"
          :key="assignment.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
        >
          <div class="flex items-start justify-between gap-2 mb-3">
            <div class="min-w-0 flex items-start gap-2">
              <input
                type="checkbox"
                :checked="bulk.isSelected(assignment.id)"
                @change="bulk.toggle(assignment.id)"
                class="mt-1 flex-shrink-0 w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
              >
              <div class="min-w-0">
                <p class="font-medium text-gray-900 dark:text-white break-words">{{ assignment.title }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Created {{ formatDate(assignment.created_at) }}</p>
              </div>
            </div>
            <span :class="getStatusClasses(assignment.status)" class="px-2 py-1 text-xs font-medium rounded-full flex-shrink-0">
              {{ capitalizeFirst(assignment.status) }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-sm mb-3">
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Subject</p>
              <p class="text-gray-900 dark:text-white truncate">{{ assignment.subject_name || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Class</p>
              <p v-if="assignment.class_group_name" class="font-medium text-green-600 dark:text-green-400 break-words">{{ assignment.class_group_name }} (All Streams)</p>
              <template v-else>
                <p class="text-gray-900 dark:text-white truncate">{{ assignment.class_name || 'N/A' }}</p>
                <p v-if="assignment.stream_name" class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ assignment.stream_name }}</p>
              </template>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Type</p>
              <span class="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                {{ formatType(assignment.type) }}
              </span>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Marks</p>
              <p class="text-gray-900 dark:text-white">{{ assignment.total_marks }}<span v-if="assignment.pass_mark" class="text-xs text-gray-500 dark:text-gray-400"> (Pass: {{ assignment.pass_mark }})</span></p>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Deadline</p>
              <p class="text-gray-900 dark:text-white">{{ formatDate(assignment.due_date) }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Submissions</p>
              <p class="text-gray-900 dark:text-white">{{ assignment.submission_count || 0 }} / {{ assignment.question_count || 0 }} marked</p>
            </div>
          </div>

          <div class="flex items-center flex-wrap gap-1 pt-3 border-t border-gray-100 dark:border-gray-700">
            <button
              @click="viewAssignment(assignment.id)"
              class="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="View"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </button>
            <button
              @click="previewAsStudent(assignment.id)"
              class="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Preview as Student"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422A12.083 12.083 0 0121 15.4v.001M12 14l-6.16-3.422A12.083 12.083 0 003 15.4v.001m9-1.401v7"></path>
              </svg>
            </button>
            <button
              @click="editAssignment(assignment.id)"
              class="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Edit"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button
              @click="duplicateAssignment(assignment.id)"
              class="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Duplicate"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </button>
            <button
              @click="togglePublish(assignment)"
              class="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              :title="assignment.status === 'published' ? 'Unpublish' : 'Publish'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
            <button
              @click="viewSubmissions(assignment.id)"
              class="relative p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              :title="assignment.pending_submission_count ? `View Submissions (${assignment.pending_submission_count} new)` : 'View Submissions'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span
                v-if="assignment.pending_submission_count"
                class="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[10px] font-bold leading-none"
              >
                {{ assignment.pending_submission_count > 99 ? '99+' : assignment.pending_submission_count }}
              </span>
            </button>
            <button
              @click="confirmDelete(assignment)"
              class="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Delete"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Assignments Table (desktop) -->
      <div class="hidden lg:block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  :checked="bulk.allSelected(visibleIds)"
                  @change="bulk.toggleAll(visibleIds)"
                  class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                >
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assignment</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Deadline</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Marks</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Submissions</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="assignment in filteredAssignments" :key="assignment.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="px-4 py-4">
                <input
                  type="checkbox"
                  :checked="bulk.isSelected(assignment.id)"
                  @change="bulk.toggle(assignment.id)"
                  class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                >
              </td>
              <td class="px-6 py-4">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ assignment.title }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Created {{ formatDate(assignment.created_at) }}</p>
                </div>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-900 dark:text-white">{{ assignment.subject_name || 'N/A' }}</p>
              </td>
              <td class="px-6 py-4">
                <p v-if="assignment.class_group_name" class="text-sm font-medium text-green-600 dark:text-green-400">{{ assignment.class_group_name }} (All Streams)</p>
                <template v-else>
                  <p class="text-sm text-gray-900 dark:text-white">{{ assignment.class_name || 'N/A' }}</p>
                  <p v-if="assignment.stream_name" class="text-xs text-gray-500 dark:text-gray-400">{{ assignment.stream_name }}</p>
                </template>
              </td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                  {{ formatType(assignment.type) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-900 dark:text-white">{{ formatDate(assignment.due_date) }}</p>
                <p v-if="assignment.open_at" class="text-xs text-gray-500 dark:text-gray-400">Opens: {{ formatDate(assignment.open_at) }}</p>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ assignment.total_marks }}</p>
                <p v-if="assignment.pass_mark" class="text-xs text-gray-500 dark:text-gray-400">Pass: {{ assignment.pass_mark }}</p>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <p class="text-sm text-gray-900 dark:text-white">{{ assignment.submission_count || 0 }}</p>
                  <span class="text-xs text-gray-500 dark:text-gray-400">/ {{ assignment.question_count || 0 }} marked</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="getStatusClasses(assignment.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ capitalizeFirst(assignment.status) }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <button
                    @click="viewAssignment(assignment.id)"
                    class="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="View"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button
                    @click="previewAsStudent(assignment.id)"
                    class="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Preview as Student"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422A12.083 12.083 0 0121 15.4v.001M12 14l-6.16-3.422A12.083 12.083 0 003 15.4v.001m9-1.401v7"></path>
                    </svg>
                  </button>
                  <button
                    @click="editAssignment(assignment.id)"
                    class="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button
                    @click="duplicateAssignment(assignment.id)"
                    class="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Duplicate"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                  <button
                    @click="togglePublish(assignment)"
                    class="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    :title="assignment.status === 'published' ? 'Unpublish' : 'Publish'"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                  <button
                    @click="viewSubmissions(assignment.id)"
                    class="relative p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    :title="assignment.pending_submission_count ? `View Submissions (${assignment.pending_submission_count} new)` : 'View Submissions'"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <span
                      v-if="assignment.pending_submission_count"
                      class="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[10px] font-bold leading-none"
                    >
                      {{ assignment.pending_submission_count > 99 ? '99+' : assignment.pending_submission_count }}
                    </span>
                  </button>
                  <button
                    @click="confirmDelete(assignment)"
                    class="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      </template>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delete Assignment</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete "{{ assignmentToDelete?.title }}"? This action cannot be undone.
        </p>
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-4">
          <button
            @click="showDeleteModal = false"
            class="w-full sm:w-auto px-4 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="deleteAssignment"
            class="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import type { Assignment, AssignmentStats } from '@/types'
import BulkActionBar from '@/components/common/BulkActionBar.vue'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { useBulkSelection } from '@/composables/useBulkSelection'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { downloadBlob } from '@/utils/downloadBlob'

interface FilterOption {
  id: number
  name: string
}

const router = useRouter()
const toast = useToastStore()
const confirmDialog = useConfirmStore()
const bulk = useBulkSelection<number>()

const API_BASE = '/api'

const assignments = ref<Assignment[]>([])
const stats = ref<AssignmentStats | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const searchQuery = ref('')
const statusFilter = usePersistedRef('teacher-assignments-status-filter', '')
const typeFilter = usePersistedRef('teacher-assignments-type-filter', '')
const subjectFilter = usePersistedRef('teacher-assignments-subject-filter', '')
const classFilter = usePersistedRef('teacher-assignments-class-filter', '')

const availableSubjects = ref<FilterOption[]>([])
const availableClasses = ref<FilterOption[]>([])

const showDeleteModal = ref(false)
const assignmentToDelete = ref<Assignment | null>(null)

const filteredAssignments = computed(() => {
  return assignments.value.filter(assignment => {
    const matchesSearch = !searchQuery.value || 
      assignment.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !statusFilter.value || assignment.status === statusFilter.value
    const matchesType = !typeFilter.value || assignment.type === typeFilter.value
    const matchesSubject = !subjectFilter.value || assignment.subject_id === parseInt(subjectFilter.value)
    const matchesClass = !classFilter.value || assignment.class_id === parseInt(classFilter.value)
    
    return matchesSearch && matchesStatus && matchesType && matchesSubject && matchesClass
  })
})

const visibleIds = computed(() => filteredAssignments.value.map(a => a.id))

const bulkDeleteSelected = async () => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  if (!await confirmDialog.open({ title: 'Delete assignments', message: `Are you sure you want to delete ${ids.length} assignment(s)? This cannot be undone.`, confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.post(`${API_BASE}/teacher/assignments/bulk-delete`, { ids })
    toast.success(`${ids.length} assignment(s) deleted`)
    bulk.clear()
    await loadAssignments()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to delete assignments')
  }
}

const bulkExport = async () => {
  const ids = bulk.selectedArray()
  try {
    const response = await axios.post(`${API_BASE}/teacher/assignments/bulk-export`, { ids }, { responseType: 'blob' })
    downloadBlob(response.data, 'assignments.csv')
  } catch (err) {
    toast.error('Failed to export assignments')
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  typeFilter.value = ''
  subjectFilter.value = ''
  classFilter.value = ''
}

const loadAssignments = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await axios.get(`${API_BASE}/teacher/assignments`)
    if (response.data.success) {
      assignments.value = response.data.data
      calculateStats()
      extractFilters()
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load assignments'
  } finally {
    loading.value = false
  }
}

const calculateStats = () => {
  const now = new Date()
  stats.value = {
    total: assignments.value.length,
    draft: assignments.value.filter(a => a.status === 'draft').length,
    published: assignments.value.filter(a => a.status === 'published').length,
    active: assignments.value.filter(a => {
      const deadline = new Date(a.due_date)
      return a.status === 'published' && deadline > now
    }).length,
    awaiting_marking: assignments.value.reduce((acc, a) => acc + (a.pending_submission_count || 0), 0),
    total_submissions: assignments.value.reduce((acc, a) => acc + (a.submission_count || 0), 0)
  }
}

const extractFilters = () => {
  const subjects = new Map<number, FilterOption>()
  const classes = new Map<number, FilterOption>()
  
  assignments.value.forEach(assignment => {
    if (assignment.subject_id && assignment.subject_name) {
      subjects.set(assignment.subject_id, { id: assignment.subject_id, name: assignment.subject_name })
    }
    if (assignment.class_id && assignment.class_name) {
      const name = assignment.stream_name ? `${assignment.class_name} - ${assignment.stream_name}` : assignment.class_name
      classes.set(assignment.class_id, { id: assignment.class_id, name })
    }
  })
  
  availableSubjects.value = Array.from(subjects.values())
  availableClasses.value = Array.from(classes.values())
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const formatType = (type: string) => {
  const typeMap: Record<string, string> = {
    essay: 'Essay',
    scenario: 'Scenario',
    objective: 'Objective',
    file_upload: 'File Upload',
    mixed: 'Mixed'
  }
  return typeMap[type] || type
}

const getStatusClasses = (status: string) => {
  const statusMap: Record<string, string> = {
    draft: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    published: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    archived: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
  }
  return statusMap[status] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
}

const capitalizeFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const viewAssignment = (id: number) => {
  router.push(`/teacher/assignments/${id}?preview=true`)
}

const previewAsStudent = (id: number) => {
  router.push(`/teacher/assignments/${id}/preview`)
}

const editAssignment = (id: number) => {
  router.push(`/teacher/assignments/${id}/edit`)
}

const duplicateAssignment = async (id: number) => {
  try {
    const response = await axios.post(`${API_BASE}/teacher/assignments/${id}/duplicate`)
    if (response.data.success) {
      await loadAssignments()
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to duplicate assignment'
  }
}

const togglePublish = async (assignment: Assignment) => {
  try {
    if (assignment.status === 'published') {
      // Unpublish - change to draft
      await axios.put(`${API_BASE}/teacher/assignments/${assignment.id}`, { status: 'draft' })
    } else {
      // Publish
      await axios.post(`${API_BASE}/teacher/assignments/${assignment.id}/publish`)
    }
    await loadAssignments()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to update assignment status'
  }
}

const viewSubmissions = (id: number) => {
  router.push(`/teacher/assignments/${id}/submissions`)
}

const confirmDelete = (assignment: Assignment) => {
  assignmentToDelete.value = assignment
  showDeleteModal.value = true
}

const deleteAssignment = async () => {
  if (!assignmentToDelete.value) return
  
  try {
    await axios.delete(`${API_BASE}/teacher/assignments/${assignmentToDelete.value.id}`)
    showDeleteModal.value = false
    assignmentToDelete.value = null
    await loadAssignments()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to delete assignment'
  }
}

onMounted(() => {
  loadAssignments()
})
</script>

