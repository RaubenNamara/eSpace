<template>
  <div class="min-h-full">
    <!-- Header - same compact icon + title + subtitle pattern as the other module pages, with the
         main action on the right -->
    <div class="flex items-center gap-2 mb-1">
      <div class="hidden sm:flex w-7 h-7 rounded-lg bg-indigo-600 items-center justify-center flex-shrink-0">
        <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v6.5L4.5 18A2 2 0 006.3 21h11.4a2 2 0 001.8-3L15 9.5V3M8 3h8M7 15h10" /></svg>
      </div>
      <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap">Virtual Lab</h1>
      <router-link to="/teacher/virtual-lab/playground" class="ml-auto inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors" title="Try any apparatus freely in 3D">
        <AppIcon name="kit" class="w-4 h-4" /><span class="hidden sm:inline">Apparatus</span> Playground
      </router-link>
      <button v-if="activeTab === 'experiments'" @click="openBuilder(null)" class="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 transition-colors">
        <span class="text-base leading-none">+</span> New Experiment
      </button>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Create 3D practical experiments, publish them to your classes, and mark what students submit.</p>

    <div>
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="error" class="mb-4 flex items-start gap-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
          <AppIcon name="warning" class="w-4 h-4" />
          <p class="flex-1 text-sm text-red-700 dark:text-red-300">{{ error }}</p>
          <button @click="error = null" class="flex-shrink-0 text-red-400 hover:text-red-600 text-xs">✕</button>
        </div>
      </transition>

      <!-- Tabs -->
      <div class="inline-flex flex-wrap gap-1 mb-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1 shadow-sm">
        <button
          @click="activeTab = 'experiments'"
          class="px-3.5 sm:px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
          :class="activeTab === 'experiments' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
        >My Experiments</button>
        <button
          @click="activeTab = 'assignments'"
          class="px-3.5 sm:px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
          :class="activeTab === 'assignments' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
        >Published Assignments</button>
        <button
          @click="activeTab = 'skills'"
          class="px-3.5 sm:px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
          :class="activeTab === 'skills' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
        >Student Skills</button>
        <button
          @click="activeTab = 'apparatus'"
          class="px-3.5 sm:px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
          :class="activeTab === 'apparatus' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
        >Apparatus</button>
      </div>

      <!-- ===================== EXPERIMENTS TAB ===================== -->
      <div v-if="activeTab === 'experiments'">
        <div class="mb-7">
          <p class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1.5"><AppIcon name="sparkles" class="w-4 h-4" /> Experiments by Subject</p>

          <div class="flex flex-wrap items-center gap-2 mb-3.5">
            <input v-model="catalogueSearch" type="text" placeholder="Search my experiments and the library..." class="input-field flex-1 min-w-[10rem] text-sm">
            <select v-model="catalogueSubject" class="input-field text-sm w-auto">
              <option value="">All Subjects</option>
              <option v-for="s in catalogueSubjects" :key="s" :value="s">{{ s }}</option>
            </select>
            <select v-model="catalogueDifficulty" class="input-field text-sm w-auto">
              <option value="">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select v-model="catalogueSkill" class="input-field text-sm w-auto">
              <option value="">All Skills</option>
              <option v-for="sk in catalogueSkills" :key="sk" :value="sk">{{ humanizeSkill(sk) }}</option>
            </select>
          </div>

          <!-- Subject cards: one card per subject; opening a card lists that subject's experiments -->
          <template v-if="!catalogueSubject">
            <div v-if="loadingExperiments" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4"><div v-for="i in 3" :key="i" class="h-36 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 animate-pulse"></div></div>
            <div v-else-if="subjectCards.length === 0" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center text-sm text-gray-400 dark:text-gray-500">{{ templates.length + experiments.length === 0 ? 'No experiments yet. Create your own with New Experiment.' : 'Nothing matches your filters.' }}</div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              <button
                v-for="c in subjectCards"
                :key="c.name"
                type="button"
                @click="openSubject(c.name)"
                class="group text-left bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col"
              >
                <div class="flex items-center gap-3">
                  <span class="w-12 h-12 flex-shrink-0 rounded-2xl flex items-center justify-center text-2xl print-color-exact" :class="CATEGORY_COLORS[c.category]"><AppIcon :name="CATEGORY_ICONS[c.category]" class="w-6 h-6" /></span>
                  <div class="min-w-0">
                    <p class="font-bold text-gray-900 dark:text-white text-base leading-snug truncate">{{ c.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ c.items.length }} in library<span v-if="c.mine.length"> &middot; <span class="font-semibold text-indigo-600 dark:text-indigo-400">{{ c.mine.length }} yours</span></span></p>
                  </div>
                </div>
                <div v-if="c.topics.length" class="flex flex-wrap gap-1 mt-3">
                  <span v-for="tp in c.topics.slice(0, 3)" :key="tp" class="px-2 py-0.5 text-[10px] font-medium rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">{{ tp }}</span>
                  <span v-if="c.topics.length > 3" class="text-[10px] text-gray-400 self-center">+{{ c.topics.length - 3 }} more</span>
                </div>
                <div class="flex-1"></div>
                <div class="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div class="flex items-center gap-1 flex-wrap">
                    <span v-for="(count, level) in c.levels" :key="level" class="px-2 py-0.5 text-[10px] font-semibold rounded-full capitalize" :class="DIFFICULTY_BADGE[level as string]">{{ count }} {{ level }}</span>
                  </div>
                  <span class="flex-shrink-0 text-xs font-semibold text-indigo-600 dark:text-indigo-400 transition-transform group-hover:translate-x-0.5">Open &rarr;</span>
                </div>
              </button>
            </div>
          </template>

          <!-- One subject open: back to the cards, then the teacher's own experiments and the templates -->
          <template v-else>
            <div class="flex items-center gap-2 mb-4">
              <button type="button" @click="catalogueSubject = ''" class="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"><span>&larr;</span> All subjects</button>
              <span class="text-gray-300 dark:text-gray-600">/</span>
              <span v-if="openSubjectCard" class="w-6 h-6 rounded-lg flex items-center justify-center text-xs print-color-exact" :class="CATEGORY_COLORS[openSubjectCard.category]"><AppIcon :name="CATEGORY_ICONS[openSubjectCard.category]" class="w-3.5 h-3.5" /></span>
              <span class="text-sm font-bold text-gray-800 dark:text-gray-100">{{ catalogueSubject }}</span>
            </div>

            <p class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2.5">My Experiments <span class="text-xs font-normal text-gray-400">({{ filteredMine.length }})</span></p>
            <div v-if="filteredMine.length === 0" class="bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 p-6 text-center text-sm text-gray-400 dark:text-gray-500 mb-6">You have no experiments in {{ catalogueSubject }} yet. Publish one from the Department Library below or create your own.</div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div v-for="e in filteredMine" :key="e.id" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            <div class="h-1.5 print-color-exact" :class="CATEGORY_COLORS[e.category]"></div>
            <div class="p-4 flex-1 flex flex-col">
              <div class="flex items-start justify-between gap-2 mb-3">
                <h3 class="font-semibold text-gray-900 dark:text-white text-sm leading-snug"><span class="text-indigo-600 dark:text-indigo-400">{{ e.subject_name || CATEGORY_LABELS[e.category] }}</span> : {{ e.title }}</h3>
                <span class="text-lg flex-shrink-0"><AppIcon :name="CATEGORY_ICONS[e.category]" class="w-4 h-4" /></span>
              </div>

              <div class="flex items-center gap-2 flex-wrap mb-2">
                <span class="px-2 py-0.5 text-[11px] font-semibold rounded-full" :class="e.status === 'published' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'">{{ e.status }}</span>
              </div>
              <PublishedClasses :classes="e.published_to" class="mb-4" />

              <div class="flex-1"></div>
              <div class="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <button @click="practise(e.id)" title="Do this experiment like a student (nothing is saved)" class="flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50">▶ Try</button>
                <button @click="openBuilder(e.id)" class="flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Edit</button>
                <button @click="openPublish(e)" class="flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50">Publish</button>
                <button @click="deleteExperiment(e.id)" class="px-2.5 py-1.5 text-xs font-semibold rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">Delete</button>
              </div>
            </div>
          </div>
            </div>

            <p class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-0.5">Department Library <span class="text-xs font-normal text-gray-400">({{ filteredTemplates.length }})</span></p>
            <p class="text-xs text-gray-400 dark:text-gray-500 mb-2.5">Ready-made experiments the administrator has shared with your department. Publish one straight to a class, or use it as a starting point for your own.</p>
            <div v-if="filteredTemplates.length === 0" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center text-sm text-gray-400 dark:text-gray-500">No library experiments in this subject match your filters.</div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            <div v-for="t in filteredTemplates" :key="t.id" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div class="flex items-start gap-2.5">
                <span class="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center text-base print-color-exact" :class="CATEGORY_COLORS[t.category]"><AppIcon :name="CATEGORY_ICONS[t.category]" class="w-4 h-4" /></span>
                <div class="min-w-0 flex-1">
                  <p class="font-semibold text-gray-900 dark:text-white text-sm leading-snug truncate">{{ t.title }}</p>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">{{ t.topic || CATEGORY_LABELS[t.category] }}</p>
                </div>
              </div>

              <div class="flex items-center gap-1.5 flex-wrap mt-2.5">
                <span class="px-2 py-0.5 text-[10px] font-semibold rounded-full capitalize" :class="DIFFICULTY_BADGE[t.difficulty]">{{ t.difficulty }}</span>
                <span v-if="t.estimated_duration_minutes" class="px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 inline-flex items-center gap-1"><AppIcon name="clock" class="w-3 h-3" /> {{ t.estimated_duration_minutes }} min</span>
                <span v-if="t.template_version" class="px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">v{{ t.template_version }}</span>
              </div>

              <PublishedClasses :classes="t.published_to" class="mt-2.5" />

              <div v-if="t.practical_skills?.length" class="flex items-center gap-1 flex-wrap mt-2">
                <span v-for="sk in t.practical_skills.slice(0, 3)" :key="sk" class="px-2 py-0.5 text-[10px] font-medium rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">{{ humanizeSkill(sk) }}</span>
                <span v-if="t.practical_skills.length > 3" class="text-[10px] text-gray-400">+{{ t.practical_skills.length - 3 }} more</span>
              </div>

              <div class="flex-1"></div>
              <div class="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <button @click="practise(t.id)" title="Do this experiment like a student (nothing is saved)" class="flex-1 px-3 py-2 text-xs font-semibold rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors">▶ Try</button>
                <button @click="openPreview(t.id)" class="flex-1 px-3 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Preview</button>
                <button @click="useTemplate(t.id)" title="Make your own editable copy" class="flex-1 px-3 py-2 text-xs font-semibold rounded-lg border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">Copy</button>
                <button @click="openPublish(t)" title="Publish to one of your classes" class="flex-1 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors">Publish</button>
              </div>
            </div>
            </div>
          </template>
        </div>

        <!-- Experiment Preview - wide two-column sheet on larger screens, full-width bottom sheet on phones;
             the header and the buttons stay put while the details scroll. -->
        <div v-if="previewExperiment" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 lg:p-6" @click.self="previewExperiment = null">
          <div class="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[92dvh] sm:max-h-[90vh] flex flex-col overflow-hidden">
            <div class="flex-shrink-0 flex items-start justify-between gap-3 px-5 sm:px-7 pt-5 sm:pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <div class="min-w-0">
                <h3 class="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-white leading-snug">{{ previewExperiment.title }}</h3>
                <p class="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-0.5">{{ previewExperiment.subject_name }}<span v-if="previewExperiment.topic"> · {{ previewExperiment.topic }}</span></p>
              </div>
              <button @click="previewExperiment = null" aria-label="Close" class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
            </div>

            <div class="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-7 py-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
                <div class="space-y-4 min-w-0">
                <div class="flex items-center gap-1.5 flex-wrap text-xs">
                  <span class="px-2.5 py-1 rounded-full font-semibold capitalize" :class="DIFFICULTY_BADGE[previewExperiment.difficulty]">{{ previewExperiment.difficulty }}</span>
                  <span v-if="previewExperiment.estimated_duration_minutes" class="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 inline-flex items-center gap-1"><AppIcon name="clock" class="w-3 h-3" /> {{ previewExperiment.estimated_duration_minutes }} min</span>
                  <span class="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">{{ previewExperiment.marks }} marks</span>
                  <span class="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">{{ previewExperiment.steps.length }} steps</span>
                </div>
                <div v-if="previewExperiment.objective"><p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Objective</p><p class="text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">{{ previewExperiment.objective }}</p></div>
                <div v-if="previewExperiment.competency"><p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Competency</p><p class="text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">{{ previewExperiment.competency }}</p></div>
                <div v-if="previewExperiment.learning_outcomes"><p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Learning Outcomes</p><p class="text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">{{ previewExperiment.learning_outcomes }}</p></div>
                <div v-if="previewExperiment.prerequisite_knowledge"><p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Prerequisites</p><p class="text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">{{ previewExperiment.prerequisite_knowledge }}</p></div>
                <div v-if="previewExperiment.apparatus"><p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Apparatus</p><p class="text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">{{ previewExperiment.apparatus }}</p></div>
                </div>
                <div class="space-y-4 min-w-0">
                <div v-if="previewExperiment.safety_precautions" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3.5">
                  <p class="text-xs font-semibold text-red-600 dark:text-red-400 mb-1 flex items-center gap-1"><AppIcon name="warning" class="w-3.5 h-3.5" /> Safety</p>
                  <p class="text-sm leading-relaxed text-red-700 dark:text-red-300">{{ previewExperiment.safety_precautions }}</p>
                </div>
                <div v-if="previewExperiment.practical_skills?.length">
                  <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1.5">Skills Assessed</p>
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span v-for="sk in previewExperiment.practical_skills" :key="sk" class="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">{{ humanizeSkill(sk) }}</span>
                  </div>
                </div>
                <div v-if="previewExperiment.steps?.length">
                  <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Procedure Overview</p>
                  <ol class="space-y-1.5">
                    <li v-for="(s, i) in previewExperiment.steps" :key="s.id" class="flex gap-2.5 text-sm leading-snug text-gray-700 dark:text-gray-300">
                      <span class="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-xs font-bold flex items-center justify-center">{{ Number(i) + 1 }}</span>
                      <span class="pt-0.5">{{ s.instruction }}</span>
                    </li>
                  </ol>
                </div>
                </div>
              </div>
            </div>

            <div class="flex-shrink-0 px-5 sm:px-7 py-3.5 border-t border-gray-100 dark:border-gray-700 pb-[max(0.875rem,env(safe-area-inset-bottom))] flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
              <button @click="previewExperiment = null" class="px-5 py-2.5 text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Close</button>
              <button @click="practise(previewExperiment.id)" title="Do this experiment like a student (nothing is saved)" class="px-5 py-2.5 text-sm font-semibold rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50">▶ Try it like a student</button>
              <button @click="useTemplate(previewExperiment.id); previewExperiment = null" class="sm:min-w-[12rem] px-5 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">Use Template</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== ASSIGNMENTS TAB ===================== -->
      <div v-else-if="activeTab === 'assignments'">
        <div v-if="loadingAssignments" class="py-10 text-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div></div>
        <div v-else-if="assignments.length === 0" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-10 sm:p-14 text-center">
          <span class="block mb-2"><AppIcon name="clipboard" class="w-10 h-10 mx-auto" /></span>
          <p class="text-gray-400 dark:text-gray-500 text-sm">Nothing published yet.</p>
        </div>
        <div v-else class="space-y-3">
          <div v-for="a in assignments" :key="a.id" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <button class="w-full flex items-center justify-between gap-3 p-4 text-left" @click="toggleAssignment(a.id)">
              <div class="flex items-center gap-3 min-w-0">
                <span class="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center text-base print-color-exact" :class="CATEGORY_COLORS[a.category]"><AppIcon :name="CATEGORY_ICONS[a.category]" class="w-4 h-4" /></span>
                <div class="min-w-0">
                  <p class="font-semibold text-gray-900 dark:text-white text-sm truncate">
                    {{ a.experiment_title }} &middot;
                    <span v-if="a.class_group_name" class="text-green-600 dark:text-green-400">{{ a.class_group_name }} (All Streams)</span>
                    <span v-else>{{ a.class_name }}</span>
                    <span v-if="a.published_by_hod" class="ml-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300" title="Published by your HOD to your department - you can follow and mark it">HOD</span>
                    <span v-if="a.published_by_admin" class="ml-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300" title="Published by the admin to your department - you can follow and mark it">Admin</span>
                  </p>
                  <p class="text-xs text-gray-400 dark:text-gray-500">{{ a.attempt_count }} attempts &middot; {{ a.submitted_count }} submitted &middot; {{ a.graded_count }} graded</p>
                </div>
              </div>
              <span class="flex-shrink-0 text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                {{ expandedAssignment === a.id ? 'Hide' : 'View' }}
                <span class="transition-transform" :class="expandedAssignment === a.id ? 'rotate-180' : ''">⌄</span>
              </span>
            </button>

            <div v-if="expandedAssignment === a.id" class="border-t border-gray-100 dark:border-gray-700 p-4">
              <div v-if="loadingAttempts" class="py-4 text-center text-xs text-gray-400">Loading...</div>
              <div v-else-if="attempts.length === 0" class="py-4 text-center text-xs text-gray-400">No attempts yet.</div>

              <!-- Attempts: table on sm+, cards on mobile -->
              <div v-else class="hidden sm:block overflow-x-auto -mx-1">
                <table class="w-full text-xs">
                  <thead>
                    <tr class="text-left text-gray-400 dark:text-gray-500">
                      <th class="py-1.5 px-1 font-medium">Student</th><th class="py-1.5 px-1 font-medium">Status</th><th class="py-1.5 px-1 font-medium">Steps</th><th class="py-1.5 px-1 font-medium">Correct/Wrong</th><th class="py-1.5 px-1 font-medium">Score</th><th class="py-1.5 px-1"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                    <tr v-for="at in attempts" :key="at.id">
                      <td class="py-2 px-1 text-gray-800 dark:text-gray-200 font-medium">{{ at.student_name }}</td>
                      <td class="py-2 px-1 capitalize">{{ at.status.replace('_', ' ') }}</td>
                      <td class="py-2 px-1">{{ at.steps_completed }}</td>
                      <td class="py-2 px-1"><span class="text-green-600 dark:text-green-400">{{ at.correct_actions }}</span>/<span class="text-red-500 dark:text-red-400">{{ at.wrong_actions }}</span></td>
                      <td class="py-2 px-1 font-semibold">{{ at.score ?? '-' }}</td>
                      <td class="py-2 px-1 text-right">
                        <button v-if="at.status !== 'in_progress'" @click="openGrading(at.id)" class="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">{{ at.status === 'graded' ? 'Review' : 'Grade' }}</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="attempts.length > 0" class="sm:hidden space-y-2">
                <div v-for="at in attempts" :key="at.id" class="bg-gray-50 dark:bg-gray-950/40 rounded-xl p-3">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-semibold text-gray-800 dark:text-gray-200">{{ at.student_name }}</p>
                    <span class="text-xs font-semibold" :class="at.score !== null ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'">{{ at.score ?? '-' }}</span>
                  </div>
                  <p class="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 capitalize">{{ at.status.replace('_', ' ') }} &middot; {{ at.steps_completed }} steps &middot; <span class="text-green-600 dark:text-green-400">{{ at.correct_actions }}✓</span> <span class="text-red-500 dark:text-red-400">{{ at.wrong_actions }}✕</span></p>
                  <button v-if="at.status !== 'in_progress'" @click="openGrading(at.id)" class="mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">{{ at.status === 'graded' ? 'Review' : 'Grade' }} &rarr;</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== APPARATUS TAB ===================== -->
      <!-- Every apparatus in the lab, for every teacher, arranged by subject -->
      <div v-else-if="activeTab === 'apparatus'">
        <div class="flex flex-wrap items-center gap-2 mb-5">
          <input v-model="apparatusSearch" type="text" placeholder="Search apparatus..." class="input-field flex-1 min-w-[10rem] text-sm">
          <div class="flex flex-wrap gap-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1">
            <button
              v-for="g in [{ key: '', label: 'All' }, ...APPARATUS_GROUPS]"
              :key="g.key"
              @click="apparatusSubject = g.key"
              class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors"
              :class="apparatusSubject === g.key ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
            >{{ g.label }}</button>
          </div>
        </div>

        <p v-if="apparatusGroups.length === 0" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center text-sm text-gray-400 dark:text-gray-500">No apparatus matches your search.</p>

        <section v-for="g in apparatusGroups" :key="g.key" class="mb-7">
          <div class="flex items-center gap-2.5 mb-3">
            <span class="w-9 h-9 rounded-xl flex items-center justify-center text-lg text-white print-color-exact" :class="g.color"><AppIcon :name="g.icon" class="w-5 h-5" /></span>
            <div>
              <h3 class="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-tight">{{ g.label }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ g.items.length }} {{ g.items.length === 1 ? 'apparatus' : 'pieces of apparatus' }}<span v-if="g.note"> &middot; {{ g.note }}</span></p>
            </div>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3">
            <button
              v-for="o in g.items"
              :key="o.object_type"
              type="button"
              @click="viewApparatus = o"
              class="group text-left bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-3.5 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col"
            >
              <span class="w-11 h-11 rounded-xl bg-gray-50 dark:bg-gray-900/40 flex items-center justify-center text-2xl mb-2">{{ o.icon || '🔬' }}</span>
              <p class="font-semibold text-sm text-gray-900 dark:text-white leading-snug">{{ o.display_name }}</p>
              <p v-if="o.description" class="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{{ o.description }}</p>
              <div class="flex-1"></div>
              <p class="mt-2 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">View in 3D &rarr;</p>
            </button>
          </div>
        </section>
      </div>

      <!-- ===================== STUDENT SKILLS TAB ===================== -->
      <div v-else>
        <div class="flex flex-wrap items-center gap-2 mb-5">
          <select v-model="skillsClassId" class="input-field text-sm w-auto">
            <option :value="null">Select a class...</option>
            <option v-for="c in classes" :key="c.id" :value="c.id">{{ c.name }}{{ c.stream_name ? ' - ' + c.stream_name : '' }}</option>
          </select>
          <select v-model="skillsStudentId" class="input-field text-sm w-auto" :disabled="!skillsClassId">
            <option :value="null">Select a student...</option>
            <option v-for="s in skillsClassStudents" :key="s.student_id" :value="s.student_id">{{ s.first_name }} {{ s.last_name }} ({{ s.admission_number }})</option>
          </select>
        </div>

        <div v-if="!skillsStudentId" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-10 sm:p-14 text-center">
          <span class="block mb-2"><AppIcon name="map" class="w-10 h-10 mx-auto" /></span>
          <p class="text-gray-400 dark:text-gray-500 text-sm">Select a class and student to view their practical skills.</p>
        </div>
        <VirtualLabSkillsPanel v-else :key="skillsStudentId" viewer="teacher" :student-id="skillsStudentId" />
      </div>
    </div>

    <!-- ===================== APPARATUS 3D VIEWER ===================== -->
    <div v-if="viewApparatus" class="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 lg:p-6" @click.self="exitMaximize(); viewApparatus = null">
      <div class="bg-white dark:bg-gray-800 shadow-2xl flex flex-col overflow-hidden" :class="labMaximized ? 'fixed inset-0 z-[10000]' : 'rounded-t-2xl sm:rounded-2xl w-full sm:max-w-3xl lg:max-w-5xl max-h-[94dvh]'">
        <div class="flex-shrink-0 flex items-start justify-between gap-3 px-5 sm:px-6 pt-4 pb-3 border-b border-gray-100 dark:border-gray-700">
          <div class="flex items-center gap-3 min-w-0">
            <span class="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900/40 flex items-center justify-center text-2xl flex-shrink-0">{{ viewApparatus.icon || '🔬' }}</span>
            <div class="min-w-0">
              <h3 class="font-bold text-base sm:text-lg text-gray-900 dark:text-white truncate">{{ viewApparatus.display_name }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ apparatusGroupLabel(viewApparatus.category) }}</p>
            </div>
          </div>
          <div class="flex items-center gap-1.5 flex-shrink-0">
            <button @click="labMaximized ? exitMaximize() : enterMaximize()" class="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" :title="labMaximized ? 'Exit full screen' : 'Full screen'">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path v-if="labMaximized" stroke-linecap="round" stroke-linejoin="round" d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /><path v-else stroke-linecap="round" stroke-linejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
              <span class="hidden sm:inline">{{ labMaximized ? 'Exit Full Screen' : 'Full Screen' }}</span>
            </button>
            <button @click="exitMaximize(); viewApparatus = null" aria-label="Close" class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
          </div>
        </div>
        <div class="flex-1 min-h-0 overflow-y-auto flex flex-col">
          <div class="bg-slate-900" :class="labMaximized ? 'flex-1 min-h-[300px]' : 'h-[46dvh] sm:h-[52vh] min-h-[260px]'">
            <VirtualLabScene :key="viewApparatus.object_type" :scene-objects="apparatusScene" :object-catalog="objectCatalog" read-only />
          </div>
          <div class="px-5 sm:px-6 py-4 space-y-3">
            <p v-if="viewApparatus.description" class="text-sm text-gray-700 dark:text-gray-300">{{ viewApparatus.description }}</p>
            <div v-if="viewApparatus.supported_actions?.length">
              <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1.5">What students can do with it</p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="a in viewApparatus.supported_actions" :key="a" class="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">{{ humanizeSkill(a) }}</span>
              </div>
            </div>
            <p class="text-[11px] text-gray-400 dark:text-gray-500">Drag to turn the view, scroll or pinch to zoom.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== BUILDER MODAL ===================== -->
    <div v-if="showBuilder" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-[9999] p-0 sm:p-4" @click.self="showBuilder = false">
      <div class="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl max-h-[100dvh] sm:max-h-[92vh] h-[94dvh] sm:h-auto flex flex-col overflow-hidden">
        <div class="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
          <h2 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{{ builderId ? 'Edit Experiment' : 'New Experiment' }}</h2>
          <button @click="showBuilder = false" class="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>

        <div class="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            <div class="sm:col-span-2 xl:col-span-3"><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Title</label><input v-model="form.title" class="input-field w-full mt-1"></div>
            <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Category</label>
              <select v-model="form.category" class="input-field w-full mt-1">
                <option value="physics">Physics</option><option value="chemistry">Chemistry</option><option value="biology">Biology</option><option value="agriculture">Agriculture</option>
              </select>
            </div>
            <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Subject</label>
              <select v-model="form.subject_id" class="input-field w-full mt-1">
                <option :value="null">None</option>
                <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
              </select>
            </div>
            <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Topic</label><input v-model="form.topic" class="input-field w-full mt-1"></div>
            <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Marks</label><input v-model.number="form.marks" type="number" class="input-field w-full mt-1"></div>
            <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Difficulty</label>
              <select v-model="form.difficulty" class="input-field w-full mt-1">
                <option value="beginner">Beginner - more guidance</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced - minimal guidance</option>
              </select>
            </div>
            <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Rendering</label>
              <select v-model="form.render_mode" class="input-field w-full mt-1" @change="onRenderModeChange">
                <option value="3d">3D free layout (place your own apparatus)</option>
                <option value="2d">3D guided experiment (ready-made apparatus)</option>
              </select>
            </div>
            <div v-if="form.render_mode === '2d'"><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Guided Experiment</label>
              <select v-model="form.render_component" class="input-field w-full mt-1">
                <option :value="null">Choose one...</option>
                <option v-for="c in GUIDED_EXPERIMENT_SLUGS" :key="c" :value="c">{{ c }}</option>
              </select>
              <p class="text-[11px] text-gray-400 mt-1">Chooses which ready-made 3D experiment students work in.</p>
            </div>
          </div>

          <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Objective</label><textarea v-model="form.objective" rows="2" class="input-field w-full mt-1"></textarea></div>
          <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Introduction</label><textarea v-model="form.introduction" rows="2" class="input-field w-full mt-1"></textarea></div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Apparatus</label><textarea v-model="form.apparatus" rows="2" class="input-field w-full mt-1"></textarea></div>
            <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Materials</label><textarea v-model="form.materials" rows="2" class="input-field w-full mt-1"></textarea></div>
          </div>
          <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Safety Precautions</label><textarea v-model="form.safety_precautions" rows="2" class="input-field w-full mt-1"></textarea></div>
          <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Conclusion Prompt</label><input v-model="form.conclusion_prompt" class="input-field w-full mt-1"></div>

          <!-- Scene objects -->
          <div class="border-t border-gray-100 dark:border-gray-700 pt-4">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">3D Objects in Scene</p>
              <button @click="addSceneObject" class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">+ Add Object</button>
            </div>

            <!-- Visual bench preview - click an object to select it, then drag it into place
                 instead of guessing x/z coordinates. Only meaningful for the 3D renderer. -->
            <div v-if="form.render_mode === '3d' && form.scene_objects.length" class="h-72 sm:h-80 mb-3 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <VirtualLabLayoutEditor :objects="form.scene_objects" :object-catalog="objectCatalog" />
            </div>

            <div v-for="(o, i) in form.scene_objects" :key="i" class="bg-gray-50 dark:bg-gray-950/40 md:bg-transparent dark:md:bg-transparent rounded-lg p-2 md:p-0 mb-2">
              <div class="grid grid-cols-2 md:grid-cols-12 gap-2 md:items-center">
                <select v-model="o.object_type" class="input-field col-span-2 md:col-span-3 text-xs">
                  <option v-for="obj in objectCatalog" :key="obj.object_type" :value="obj.object_type">{{ obj.icon }} {{ obj.display_name }}</option>
                </select>
                <input v-model="o.key" placeholder="key (unique)" class="input-field col-span-2 md:col-span-3 text-xs">
                <input v-model.number="o.position.x" type="number" step="0.5" placeholder="x" class="input-field md:col-span-2 text-xs">
                <input v-model.number="o.position.z" type="number" step="0.5" placeholder="z" class="input-field md:col-span-2 text-xs">
                <input
                  :value="Math.round((((o.rotation?.y || 0) * 180) / Math.PI + 360) % 360)"
                  @change="setRotationDegrees(o, ($event.target as HTMLInputElement).valueAsNumber)"
                  type="number" step="15" placeholder="rot°" title="Rotation in degrees"
                  class="input-field md:col-span-1 text-xs"
                >
                <button @click="form.scene_objects.splice(i, 1)" class="col-span-2 md:col-span-1 text-red-500 text-xs font-medium py-1 sm:py-0">Remove</button>
              </div>
              <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-1.5" title="Starts off the bench in the apparatus tray until the student picks it up and places it">
                <input v-model="o.in_tray" type="checkbox" class="rounded"> Starts in apparatus tray (not pre-placed)
              </label>
            </div>
          </div>

          <!-- Steps -->
          <div class="border-t border-gray-100 dark:border-gray-700 pt-4">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Experiment Steps</p>
              <button @click="addStep" class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">+ Add Step</button>
            </div>
            <div v-for="(s, i) in form.steps" :key="i" class="bg-gray-50 dark:bg-gray-950/40 rounded-xl p-3 mb-2 space-y-2">
              <div class="flex items-center justify-between"><span class="text-xs font-bold text-indigo-500 dark:text-indigo-400">Step {{ Number(i) + 1 }}</span><button @click="form.steps.splice(i, 1)" class="text-red-500 text-xs font-medium">Remove</button></div>
              <input v-model="s.instruction" placeholder="Instruction" class="input-field w-full text-xs">
              <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
                <select v-model="s.required_action" class="input-field text-xs">
                  <option v-for="act in LAB_ACTIONS" :key="act" :value="act">{{ act }}</option>
                </select>
                <input v-model="s.target_object_key" placeholder="target key" class="input-field text-xs">
                <input v-model="s.expected_value" placeholder="expected value" class="input-field text-xs">
                <input v-model.number="s.tolerance" type="number" step="0.1" placeholder="+/- tolerance" class="input-field text-xs" title="Numeric measurements only - e.g. expected 50, tolerance 2 accepts 48-52">
                <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"><input v-model="s.is_safety_check" type="checkbox" class="rounded"> Safety check</label>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input v-model="s.feedback_correct" placeholder="Feedback if correct" class="input-field text-xs">
                <input v-model="s.feedback_incorrect" placeholder="Feedback if wrong" class="input-field text-xs">
              </div>
              <input v-model="s.hint" placeholder="Hint (optional) - separate progressive levels with ||" class="input-field w-full text-xs" title="e.g. 'Check the resistor value.||R = V / I - rearrange for R.' reveals one level at a time as the student asks for more help">
            </div>
          </div>

          <!-- Graph - all display/behaviour is data-driven (read by VirtualLabGraph.vue), nothing
               is hardcoded per experiment component. Column names are free text with suggestions,
               since results-table shape still comes from the render_component's own builder. -->
          <div class="border-t border-gray-100 dark:border-gray-700 pt-4">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Graph</p>
              <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <input v-model="form.graph.enabled" type="checkbox" class="rounded"> Enabled
              </label>
            </div>
            <div v-if="form.graph.enabled" class="space-y-2">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button type="button" @click="form.graph.manual_plot = true" class="text-left rounded-xl border p-2.5 transition-colors" :class="form.graph.manual_plot ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-400' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'">
                  <p class="text-xs font-semibold text-gray-800 dark:text-gray-100">Students plot the graph</p>
                  <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Students choose their readings and plot the points themselves, by typing them or clicking on the graph paper.</p>
                </button>
                <button type="button" @click="form.graph.manual_plot = false" class="text-left rounded-xl border p-2.5 transition-colors" :class="!form.graph.manual_plot ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-400' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'">
                  <p class="text-xs font-semibold text-gray-800 dark:text-gray-100">Build from Results Table</p>
                  <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">The graph is drawn automatically from the readings students add to their Results Table.</p>
                </button>
              </div>
              <input v-model="form.graph.title" placeholder="Graph title (e.g. Force Against Extension)" class="input-field w-full text-xs">
              <div v-if="!form.graph.manual_plot" class="grid grid-cols-2 gap-2">
                <input v-model="form.graph.x_column" placeholder="X column (Results Table key)" list="graph-column-suggestions" class="input-field text-xs">
                <input v-model="form.graph.y_column" placeholder="Y column (Results Table key)" list="graph-column-suggestions" class="input-field text-xs">
              </div>
              <datalist id="graph-column-suggestions">
                <option v-for="c in graphColumnSuggestions" :key="c" :value="c" />
              </datalist>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input v-model="form.graph.x_label" placeholder="X axis label (e.g. Extension (cm))" class="input-field text-xs">
                <input v-model="form.graph.y_label" placeholder="Y axis label (e.g. Force (N))" class="input-field text-xs">
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:items-center">
                <select v-model="form.graph.graph_type" class="input-field text-xs">
                  <option value="scatter">Scatter</option><option value="line">Line</option>
                </select>
                <input v-model.number="form.graph.min_points" type="number" min="1" placeholder="Min. points" class="input-field text-xs" title="Minimum Results Table rows required before the graph appears">
                <label v-if="!form.graph.manual_plot" class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"><input v-model="form.graph.allow_axis_change" type="checkbox" class="rounded"> Learner can change axes</label>
                <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"><input v-model="form.graph.show_best_fit" type="checkbox" class="rounded"> {{ form.graph.manual_plot ? 'Let students draw a best-fit line' : 'Show best-fit line' }}</label>
              </div>
              <p v-if="form.graph.manual_plot" class="text-[11px] text-gray-400">Students plot at least {{ form.graph.min_points || 2 }} points. Use the axis labels above (with units) to tell them what goes on each axis, and mark a question as a "Graph analysis question" below to ask about the graph they plotted.</p>
              <p v-else-if="graphColumnSuggestions.length" class="text-[11px] text-gray-400">Suggested columns for this experiment: {{ graphColumnSuggestions.join(', ') }}</p>
            </div>
          </div>

          <!-- Questions -->
          <div class="border-t border-gray-100 dark:border-gray-700 pt-4">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Questions</p>
              <button @click="addQuestion" class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">+ Add Question</button>
            </div>
            <div v-for="(q, i) in form.questions" :key="i" class="bg-gray-50 dark:bg-gray-950/40 rounded-xl p-2.5 mb-2 space-y-2">
              <div class="grid grid-cols-2 md:grid-cols-12 gap-2 md:items-center">
                <input v-model="q.question_text" placeholder="Question" class="input-field col-span-2 md:col-span-6 text-xs">
                <select v-model="q.question_type" class="input-field md:col-span-3 text-xs">
                  <option value="short_answer">Short answer</option><option value="calculation">Calculation</option><option value="observation">Observation</option><option value="procedure">Procedure</option>
                </select>
                <input v-model.number="q.marks" type="number" placeholder="Marks" class="input-field md:col-span-2 text-xs">
                <button @click="form.questions.splice(i, 1)" class="text-red-500 text-xs font-medium md:col-span-1">Remove</button>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-12 gap-2 md:items-center">
                <select v-model="q.stage" class="input-field md:col-span-3 text-xs" title="When this question appears">
                  <option value="before_experiment">Before experiment</option>
                  <option value="after_step">After a step</option>
                  <option value="after_measurement">After a measurement</option>
                  <option value="after_experiment">After experiment (notebook)</option>
                </select>
                <input
                  v-if="q.stage === 'after_step' || q.stage === 'after_measurement'"
                  v-model.number="q.stage_step_number" type="number" min="1" placeholder="Step #"
                  class="input-field md:col-span-2 text-xs" title="Which step number this follows"
                >
                <select v-model="q.requirement" class="input-field md:col-span-3 text-xs" title="Notebook only never interrupts the simulation">
                  <option value="notebook_only">Notebook only</option>
                  <option value="optional">Optional (can skip)</option>
                  <option value="required">Required before continuing</option>
                </select>
                <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 md:col-span-3" title="Renders under the graph instead of the general question list">
                  <input v-model="q.linked_to_graph" type="checkbox" class="rounded"> Graph analysis question
                </label>
              </div>
            </div>
          </div>
        </div>

        <div v-if="error" class="flex-shrink-0 px-4 sm:px-6 py-2.5 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800 text-xs sm:text-sm text-red-700 dark:text-red-300 flex items-start gap-2"><span class="flex-1 break-words">{{ error }}</span><button type="button" @click="error = null" class="flex-shrink-0 font-semibold">✕</button></div>
        <div class="flex-shrink-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex justify-end gap-2">
          <button @click="showBuilder = false" class="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Cancel</button>
          <button @click="saveExperiment" :disabled="savingExperiment" class="px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm disabled:opacity-50">{{ savingExperiment ? 'Saving...' : 'Save Experiment' }}</button>
        </div>
      </div>
    </div>

    <!-- ===================== PUBLISH MODAL ===================== -->
    <div v-if="publishTarget" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-3 sm:p-4" @click.self="publishTarget = null">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-5 sm:p-6 space-y-3.5">
        <div class="flex items-start justify-between gap-2">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"><AppIcon name="send" class="w-5 h-5" /> Publish "{{ publishTarget.title }}"</h2>
          <button @click="publishTarget = null" class="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>
        <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Class</label>
          <TeacherClassSelector v-model="publishForm.classTarget" class="mt-1" />
        </div>
        <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Term</label>
          <select v-model="publishForm.term_id" class="input-field w-full mt-1"><option v-for="t in terms" :key="t.id" :value="t.id">{{ t.name }}</option></select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Due Date</label><input v-model="publishForm.due_date" type="date" class="input-field w-full mt-1"></div>
          <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Marks</label><input v-model.number="publishForm.marks" type="number" class="input-field w-full mt-1"></div>
        </div>
        <p v-if="!publishTarget.subject_id" class="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">This experiment has no subject yet. Edit it and choose a subject first, otherwise students in the class will not see it.</p>
        <p v-if="error" class="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">{{ error }}</p>
        <div class="flex justify-end gap-2 pt-2">
          <button @click="publishTarget = null" class="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Cancel</button>
          <button @click="confirmPublish" :disabled="publishing" class="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm disabled:opacity-50">{{ publishing ? 'Publishing...' : 'Publish' }}</button>
        </div>
      </div>
    </div>

    <!-- ===================== GRADING MODAL ===================== -->
    <!-- Student work review: a wide dialog (bottom sheet on phones). The student, their stats and the
         tabs stay at the top, the grade form stays at the bottom, and only the work between scrolls;
         on large screens the recorded data and graph sit beside the written answers. -->
    <div v-if="gradingAttempt" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-[9999] p-0 sm:p-4 lg:p-6" @click.self="gradingAttempt = null">
      <div class="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl h-[94dvh] sm:h-auto sm:max-h-[92vh] flex flex-col overflow-hidden">
        <div class="relative flex-shrink-0 px-4 sm:px-6 lg:px-7 pt-4 sm:pt-5 pb-3.5 border-b border-gray-100 dark:border-gray-700 space-y-2.5">
        <button @click="gradingAttempt = null" aria-label="Close" class="absolute right-3 top-3 sm:right-4 sm:top-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        <!-- One row on wide screens: student | Mark / Summary / Timeline | stats | marking tools -->
        <div class="flex flex-wrap xl:flex-nowrap items-center gap-x-3 2xl:gap-x-4 gap-y-2.5 xl:pr-9">
          <div class="flex items-center gap-2.5 min-w-0 max-w-full pr-9 sm:pr-0 sm:max-w-[16rem] xl:max-w-[12.5rem] 2xl:max-w-[17rem]">
            <span class="w-9 h-9 flex-shrink-0 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center">{{ (gradingAttempt.student_name || '?').trim().charAt(0).toUpperCase() }}</span>
            <div class="min-w-0">
              <h2 class="text-sm sm:text-[15px] font-semibold text-gray-900 dark:text-white leading-tight truncate" :title="gradingAttempt.student_name">{{ gradingAttempt.student_name }}</h2>
              <p class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 truncate" :title="gradingAttempt.experiment_title">{{ gradingAttempt.experiment_title }}</p>
            </div>
          </div>

          <div class="flex w-full sm:w-auto flex-shrink-0 gap-1 bg-gray-100 dark:bg-gray-900/40 rounded-lg p-1" role="tablist" aria-label="Review">
            <button @click="reviewTab = 'mark'" class="flex-1 sm:flex-none px-3 xl:px-2.5 2xl:px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors" :class="reviewTab === 'mark' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"><span class="inline-flex items-center gap-1"><AppIcon name="pencil" class="w-3.5 h-3.5" /> Mark</span></button>
            <button @click="reviewTab = 'summary'" class="flex-1 sm:flex-none px-3 xl:px-2.5 2xl:px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors" :class="reviewTab === 'summary' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'">Summary</button>
            <button @click="reviewTab = 'timeline'" class="flex-1 sm:flex-none px-3 xl:px-2.5 2xl:px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors" :class="reviewTab === 'timeline' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'">Timeline</button>
          </div>

          <!-- Attempt stats as tiny chips -->
          <div class="flex flex-wrap xl:flex-nowrap items-center gap-1 flex-shrink-0">
            <span class="inline-flex items-baseline gap-1 whitespace-nowrap rounded-md bg-gray-50 dark:bg-gray-950/40 border border-gray-100 dark:border-gray-700 px-1.5 py-0.5"><strong class="text-[11px] font-bold text-gray-800 dark:text-gray-100">{{ gradingAttempt.steps_completed }}/{{ gradingAttempt.total_steps }}</strong><span class="text-[10px] text-gray-400">Steps</span></span>
            <span class="inline-flex items-baseline gap-1 whitespace-nowrap rounded-md bg-gray-50 dark:bg-gray-950/40 border border-gray-100 dark:border-gray-700 px-1.5 py-0.5"><strong class="text-[11px] font-bold text-green-600 dark:text-green-400">{{ gradingAttempt.correct_actions }}</strong><span class="text-[10px] text-gray-400">Correct</span></span>
            <span class="inline-flex items-baseline gap-1 whitespace-nowrap rounded-md bg-gray-50 dark:bg-gray-950/40 border border-gray-100 dark:border-gray-700 px-1.5 py-0.5"><strong class="text-[11px] font-bold text-red-500 dark:text-red-400">{{ gradingAttempt.wrong_actions }}</strong><span class="text-[10px] text-gray-400">Incorrect</span></span>
            <span class="inline-flex items-baseline gap-1 whitespace-nowrap rounded-md bg-gray-50 dark:bg-gray-950/40 border border-gray-100 dark:border-gray-700 px-1.5 py-0.5"><strong class="text-[11px] font-bold text-gray-800 dark:text-gray-100">{{ Math.round(gradingAttempt.time_spent_seconds / 60) }}m</strong><span class="text-[10px] text-gray-400">Time</span></span>
          </div>

          <!-- Canvas marking tools (VirtualLabMarking teleports them in) -->
          <div v-show="reviewTab === 'mark'" id="lab-mark-toolbar" class="w-full xl:w-auto xl:flex-1 min-w-0 xl:min-w-max flex xl:justify-end"></div>
        </div>


        </div>

        <div class="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 sm:px-6 lg:px-7 py-5">
        <!-- Canvas marking: the assessment annotation tools on the student's own work -->
        <template v-if="reviewTab === 'mark'">
          <VirtualLabMarking :key="gradingAttempt.id" :attempt="gradingAttempt" :saved="gradingAttempt.marking_annotations || []" toolbar-to="#lab-mark-toolbar">
            <template #aside="{ section }">
              <div v-if="section.questionId && answerFor(section.questionId)" class="flex flex-wrap items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-950/40 border border-gray-100 dark:border-gray-700 px-3 py-2">
                <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">Marks</span>
                <input v-model.number="answerFor(section.questionId)!.marks_awarded" type="number" min="0" :max="section.marks" placeholder="0" class="input-field w-16 text-sm py-1.5" @blur="saveQuestionGrade(answerFor(section.questionId)!)">
                <span class="text-sm text-gray-500 dark:text-gray-400">/ {{ section.marks }}</span>
                <input v-model="answerFor(section.questionId)!.feedback" placeholder="Feedback (optional)" class="input-field flex-1 min-w-[10rem] text-sm py-1.5" @blur="saveQuestionGrade(answerFor(section.questionId)!)">
              </div>
              <div v-else-if="section.key === 'graph' && gradingAttempt.graph_snapshot?.gradient != null" class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 px-1">
                <span>Recorded best fit &middot; Gradient: <strong class="text-gray-700 dark:text-gray-200">{{ gradingAttempt.graph_snapshot.gradient }}</strong></span>
                <span>Intercept: <strong class="text-gray-700 dark:text-gray-200">{{ gradingAttempt.graph_snapshot.intercept }}</strong></span>
                <span>R&sup2;: <strong class="text-gray-700 dark:text-gray-200">{{ gradingAttempt.graph_snapshot.r_squared }}</strong></span>
              </div>
            </template>
          </VirtualLabMarking>
        </template>

        <template v-else-if="reviewTab === 'summary'">
          <!-- Balanced: the recorded readings and written work on one side, the graph on the other;
               one centred column when there is no graph. -->
          <div class="grid grid-cols-1 gap-6 lg:gap-8 items-start" :class="gradingAttempt.graph_snapshot ? 'lg:grid-cols-2' : 'max-w-3xl mx-auto'">
          <div class="space-y-5 min-w-0">
          <div v-if="notebookMeasurements(gradingAttempt).length" class="text-sm">
            <p class="font-semibold text-gray-700 dark:text-gray-300 mb-1">Notebook - Measurements</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="m in notebookMeasurements(gradingAttempt)" :key="m.id" class="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">{{ m.label }}: {{ m.value }}{{ m.unit }}</span>
            </div>
          </div>

          <div v-if="notebookResultRows(gradingAttempt).length" class="text-sm">
            <p class="font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Notebook - Results Table</p>
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr class="bg-indigo-50 dark:bg-indigo-900/30 text-left text-gray-800 dark:text-gray-100">
                    <th v-for="col in Object.keys(notebookResultRows(gradingAttempt)[0]?.extra || {})" :key="col" class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold" :class="RESULT_COLUMN_LABELS[col] ? '' : 'capitalize'">{{ resultColumnLabel(col) }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in notebookResultRows(gradingAttempt)" :key="row.id" class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900/40">
                    <td v-for="col in Object.keys(row.extra || {})" :key="col" class="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-800 dark:text-gray-100" :class="resultCellClass(col, row.extra?.[col])">{{ resultCell(col, row.extra?.[col]) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="gradingAttempt.observations.length" class="text-sm">
            <p class="font-semibold text-gray-700 dark:text-gray-300 mb-1">Observations</p>
            <p v-for="(o, i) in gradingAttempt.observations" :key="i" class="text-gray-600 dark:text-gray-300 italic bg-gray-50 dark:bg-gray-950/40 rounded-lg p-2.5">{{ o.text }}</p>
          </div>

          <!-- Per-question marking - separate from the single overall Score below, which stays the
               teacher's final say rather than being auto-summed from these. Marks are never
               pre-filled just because an answer exists (empty until the teacher enters a value). -->
          <div v-if="generalAnswers(gradingAttempt).length" class="text-sm space-y-2">
            <p class="font-semibold text-gray-700 dark:text-gray-300">Answers</p>
            <div v-for="a in generalAnswers(gradingAttempt)" :key="a.question_id" class="bg-gray-50 dark:bg-gray-950/40 rounded-lg p-2.5 space-y-1.5">
              <p class="text-xs text-gray-400">
                <span v-if="a.stage !== 'after_experiment'" class="inline-block px-1.5 py-0.5 mr-1 rounded text-[10px] font-bold uppercase bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 align-middle">{{ a.stage.replace('_', ' ') }}</span>
                {{ a.question_text }} ({{ a.question_marks }} marks)
              </p>
              <p class="text-gray-700 dark:text-gray-200">{{ a.answer_text || '-' }}</p>
              <div class="grid grid-cols-2 gap-2">
                <input v-model.number="a.marks_awarded" type="number" :max="a.question_marks" min="0" placeholder="Marks awarded" class="input-field text-xs" @blur="saveQuestionGrade(a)">
                <input v-model="a.feedback" placeholder="Feedback (optional)" class="input-field text-xs" @blur="saveQuestionGrade(a)">
              </div>
            </div>
          </div>

          <!-- Torch-bulb practical: the student's own gradient/resistance working and the automatic
               practical assessment it produced - a guide for the teacher's mark, not a replacement. -->
          <div v-if="bulbAnalysis(gradingAttempt)" class="text-sm">
            <p class="font-semibold text-gray-700 dark:text-gray-300 mb-1">Gradient, resistance and practical assessment</p>
            <div class="bg-gray-50 dark:bg-gray-950/40 rounded-lg p-2.5 space-y-1.5">
              <p class="text-gray-700 dark:text-gray-200">
                Gradient: <strong>{{ bulbAnalysis(gradingAttempt)!.summary?.gradient_a_per_v ?? '-' }}</strong> A/V &middot;
                R = 1/gradient = <strong>{{ bulbAnalysis(gradingAttempt)!.summary?.resistance_ohm ?? '-' }}</strong> &Omega;
                <span v-if="bulbAnalysis(gradingAttempt)!.summary?.true_resistance_ohm" class="text-gray-400"> (from the meters' true readings: {{ bulbAnalysis(gradingAttempt)!.summary.true_resistance_ohm }} &Omega;)</span>
              </p>
              <template v-if="bulbAnalysis(gradingAttempt)!.assessment">
                <p class="text-gray-700 dark:text-gray-200">Automatic assessment: <strong>{{ bulbAnalysis(gradingAttempt)!.assessment.total }} / {{ bulbAnalysis(gradingAttempt)!.assessment.max }}</strong></p>
                <ul class="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
                  <li v-for="item in bulbAnalysis(gradingAttempt)!.assessment.items" :key="item.key"><span class="font-semibold text-gray-600 dark:text-gray-300">{{ item.label }} {{ item.score }}/{{ item.max }}</span> - {{ item.feedback }}</li>
                </ul>
              </template>
            </div>
          </div>

          <!-- A student-plotted graph (e.g. the concave mirror's uv against u + v): their own gradient
               and what they worked out from it. -->
          <div v-if="studentGraph(gradingAttempt)" class="text-sm">
            <p class="font-semibold text-gray-700 dark:text-gray-300 mb-1">Student's own graph</p>
            <p class="bg-gray-50 dark:bg-gray-950/40 rounded-lg p-2.5 text-gray-700 dark:text-gray-200">
              Points plotted: <strong>{{ studentGraph(gradingAttempt)!.summary?.points_plotted ?? '-' }}</strong> &middot;
              gradient: <strong>{{ studentGraph(gradingAttempt)!.summary?.gradient ?? '-' }}</strong> &middot;
              {{ studentGraph(gradingAttempt)!.summary?.result_name }}: <strong>{{ studentGraph(gradingAttempt)!.summary?.result ?? '-' }}</strong> {{ studentGraph(gradingAttempt)!.summary?.result_unit }}
              <span class="text-gray-400"> &middot; axes {{ studentGraph(gradingAttempt)!.axes?.attempts ? 'corrected after a wrong first try' : 'right first time' }}<template v-if="studentGraph(gradingAttempt)!.wrongFormula"> &middot; tried the upside-down gradient formula first</template></span>
            </p>
          </div>

          <div v-if="gradingAttempt.conclusion_text" class="text-sm">
            <p class="font-semibold text-gray-700 dark:text-gray-300 mb-1">Conclusion</p>
            <p class="text-gray-600 dark:text-gray-300">{{ gradingAttempt.conclusion_text }}</p>
          </div>
          <p v-if="!notebookMeasurements(gradingAttempt).length && !notebookResultRows(gradingAttempt).length && !gradingAttempt.observations.length && !generalAnswers(gradingAttempt).length && !gradingAttempt.conclusion_text" class="text-sm text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-950/40 rounded-xl p-4 text-center">No readings or written answers recorded.</p>
          </div>

          <div v-if="gradingAttempt.graph_snapshot" class="space-y-5 min-w-0 lg:border-l lg:border-gray-100 dark:lg:border-gray-700 lg:pl-8">
          <!-- Graph - shown exactly as the student saw it (locked to the frozen attempt snapshot's
               axes/labels/type, not whatever the template's graph config has since been edited to),
               with graph-analysis answers marked right alongside it. -->
          <div v-if="gradingAttempt.graph_snapshot" class="text-sm">
            <p class="font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Graph</p>
            <VirtualLabGraph
              :rows="notebookGraphRows(gradingAttempt)"
              :config="gradingGraphConfig(gradingAttempt)"
              :discrete-x-prefix="isSilverDensityRows(notebookGraphRows(gradingAttempt)) ? 'M' : undefined"
              :band="isSilverDensityRows(notebookGraphRows(gradingAttempt)) ? SILVER_DENSITY_BAND : null"
            />
            <div v-if="gradingAttempt.graph_snapshot.gradient !== null" class="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500 dark:text-gray-400">
              <span>Recorded gradient: <strong class="text-gray-700 dark:text-gray-300">{{ gradingAttempt.graph_snapshot.gradient }}</strong></span>
              <span>Intercept: <strong class="text-gray-700 dark:text-gray-300">{{ gradingAttempt.graph_snapshot.intercept }}</strong></span>
              <span>R&sup2;: <strong class="text-gray-700 dark:text-gray-300">{{ gradingAttempt.graph_snapshot.r_squared }}</strong></span>
            </div>
            <div v-if="graphAnswers(gradingAttempt).length" class="mt-2.5 space-y-2">
              <div v-for="a in graphAnswers(gradingAttempt)" :key="a.question_id" class="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-2.5 space-y-1.5">
                <p class="text-xs text-indigo-700 dark:text-indigo-300 font-medium">{{ a.question_text }} ({{ a.question_marks }} marks)</p>
                <p class="text-gray-700 dark:text-gray-200">{{ a.answer_text || '-' }}</p>
                <div class="grid grid-cols-2 gap-2">
                  <input v-model.number="a.marks_awarded" type="number" :max="a.question_marks" min="0" placeholder="Marks awarded" class="input-field text-xs" @blur="saveQuestionGrade(a)">
                  <input v-model="a.feedback" placeholder="Feedback (optional)" class="input-field text-xs" @blur="saveQuestionGrade(a)">
                </div>
              </div>
            </div>
          </div>

          </div>
          </div>
        </template>

        <template v-else>
          <div v-if="gradingAttempt.action_log.length === 0" class="text-xs text-gray-400 text-center py-6">No actions recorded.</div>
          <div v-else class="space-y-2 max-w-4xl mx-auto">
            <div v-for="(l, i) in gradingAttempt.action_log" :key="i" class="flex items-start gap-2 text-xs">
              <span class="flex-shrink-0 w-14 text-gray-400 dark:text-gray-500 tabular-nums">{{ formatTime(l.created_at) }}</span>
              <AppIcon :name="l.is_correct ? 'check-circle' : 'circle'" class="w-4 h-4 flex-shrink-0" :class="l.is_correct ? 'text-emerald-600' : 'text-gray-400'" />
              <span class="text-gray-700 dark:text-gray-200">
                <span class="font-medium capitalize">{{ l.action.replace('_', ' ') }}</span>
                <span v-if="l.object_key" class="text-gray-400"> &middot; {{ l.object_key }}</span>
                <span v-if="l.value" class="text-gray-400"> &middot; {{ l.value }}</span>
              </span>
            </div>
          </div>
        </template>
        </div>

        <div class="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/40 px-4 sm:px-6 lg:px-7 py-3 sm:py-3.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] grid grid-cols-[1fr_auto] sm:grid-cols-[9rem_1fr_auto] gap-x-3 gap-y-2 items-end">
          <div class="order-1"><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Score (out of {{ gradingAttempt.max_marks }})</label><input v-model.number="gradeScore" type="number" min="0" :max="gradingAttempt.max_marks" class="input-field w-full mt-1"></div>
          <div class="order-3 col-span-2 sm:order-2 sm:col-span-1"><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Feedback</label><textarea v-model="gradeFeedback" rows="1" class="input-field w-full mt-1 sm:min-h-[2.625rem] resize-y"></textarea></div>
          <button @click="submitGrade" :disabled="submittingGrade" class="order-2 sm:order-3 w-full sm:w-auto min-w-[8rem] sm:min-w-[10rem] px-5 py-2.5 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm disabled:opacity-50">{{ submittingGrade ? 'Saving...' : 'Save Grade' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import { CATEGORY_ICONS, CATEGORY_LABELS, CATEGORY_COLORS } from '@/types/virtualLab'
import type { ExperimentSummary, ExperimentDetail, LabObjectDef, TeacherAssignment, AttemptSummary, AttemptDetail, LabAction, LabCategory, SceneObjectConfig } from '@/types/virtualLab'
import VirtualLabSkillsPanel from '@/components/virtuallab/VirtualLabSkillsPanel.vue'
import PublishedClasses from '@/components/virtuallab/PublishedClasses.vue'
import VirtualLabGraph from '@/components/virtuallab/VirtualLabGraph.vue'
import { RESULT_COLUMN_LABELS, resultColumnLabel, resultCell, resultCellClass, isSilverDensityRows, SILVER_DENSITY_BAND } from '@/components/virtuallab/resultColumns'
import VirtualLabMarking from '@/components/virtuallab/VirtualLabMarking.vue'
import VirtualLabScene from '@/components/virtuallab/VirtualLabScene.vue'
import { useRouter } from 'vue-router'
import VirtualLabLayoutEditor from '@/components/virtuallab/VirtualLabLayoutEditor.vue'
import { GUIDED_EXPERIMENTS } from '@/components/virtuallab/lab3d/registry'
import { useFullscreenLab } from '@/components/virtuallab/lab3d/useFullscreenLab'
import TeacherClassSelector from '@/components/teacher/TeacherClassSelector.vue'
import type { ClassTarget } from '@/components/teacher/TeacherClassSelector.vue'

// Restricted to what's actually registered, not free text - a typo'd slug would silently fall back
// to the free-layout engine (resolveGuidedExperiment() returns null for an unknown slug).
const GUIDED_EXPERIMENT_SLUGS = Object.keys(GUIDED_EXPERIMENTS)

const DIFFICULTY_BADGE: Record<string, string> = {
  beginner: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
  intermediate: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',
  advanced: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
}
const humanizeSkill = (slug: string) => slug.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

const API_BASE = '/api/teacher'
const LAB_ACTIONS: LabAction[] = ['move', 'rotate', 'connect', 'pour', 'heat', 'measure', 'switch_on', 'switch_off', 'zoom', 'inspect', 'acknowledge']

const activeTab = ref<'experiments' | 'assignments' | 'skills' | 'apparatus'>('experiments')

// --- Try an experiment exactly like a student (nothing saved, no submit) ------------------------
const router = useRouter()
const practise = (experimentId: number) => router.push(`/teacher/virtual-lab/practice/${experimentId}`)

// --- Apparatus catalogue: every piece of apparatus, arranged by subject --------------------------
const APPARATUS_GROUPS = [
  { key: 'physics', label: 'Physics', icon: 'bolt', color: 'bg-indigo-600', note: '' },
  { key: 'chemistry', label: 'Chemistry', icon: 'beaker', color: 'bg-emerald-600', note: '' },
  { key: 'biology', label: 'Biology', icon: 'leaf', color: 'bg-purple-600', note: '' },
  { key: 'agriculture', label: 'Agriculture', icon: 'sprout', color: 'bg-lime-600', note: '' },
  { key: 'general', label: 'General', icon: 'wrench', color: 'bg-slate-600', note: 'used in every science' },
]
const apparatusGroupLabel = (category: string) => APPARATUS_GROUPS.find(g => g.key === category)?.label ?? 'General'
const apparatusSearch = ref('')
const apparatusSubject = ref('')
const apparatusGroups = computed(() => {
  const q = apparatusSearch.value.trim().toLowerCase()
  return APPARATUS_GROUPS
    .filter(g => !apparatusSubject.value || g.key === apparatusSubject.value)
    .map(g => ({
      ...g,
      items: objectCatalog.value
        .filter(o => (APPARATUS_GROUPS.some(x => x.key === o.category) ? o.category : 'general') === g.key)
        .filter(o => !q || o.display_name.toLowerCase().includes(q) || (o.description || '').toLowerCase().includes(q))
        .sort((a, b) => a.display_name.localeCompare(b.display_name)),
    }))
    .filter(g => g.items.length > 0)
})
const viewApparatus = ref<LabObjectDef | null>(null)
const { labMaximized, enterMaximize, exitMaximize } = useFullscreenLab()
// One piece of apparatus alone on the bench, for the 3D viewer
const apparatusScene = computed<SceneObjectConfig[]>(() => viewApparatus.value
  ? [{ key: 'preview', object_type: viewApparatus.value.object_type, position: { x: 0, y: 0, z: 0 } }]
  : [])

const skillsClassId = ref<number | null>(null)
const skillsStudentId = ref<number | null>(null)
const skillsClassStudents = ref<{ student_id: number; first_name: string; last_name: string; admission_number: string }[]>([])
watch(skillsClassId, async (classId) => {
  skillsStudentId.value = null
  skillsClassStudents.value = []
  if (!classId) return
  try {
    const res = await axios.get(`${API_BASE}/classes/${classId}/students`)
    skillsClassStudents.value = res.data.data
  } catch {
    skillsClassStudents.value = []
  }
})
const error = ref<string | null>(null)

const experiments = ref<ExperimentSummary[]>([])
const templates = ref<ExperimentSummary[]>([])
const loadingExperiments = ref(true)

// Catalogue browsing (deprecated templates stay usable for their existing assignments/attempts,
// but are hidden from new-assignment browsing by default).
const catalogueSearch = ref('')
const catalogueSubject = ref('')
const catalogueDifficulty = ref('')
const catalogueSkill = ref('')
const previewExperiment = ref<ExperimentDetail | null>(null)

const visibleTemplates = computed(() => templates.value.filter(t => !t.is_deprecated))
// Templates with no subject are kept together under "Other" (listed last)
const OTHER_GROUP = 'Other'
const subjectOf = (t: ExperimentSummary) => t.subject_name || OTHER_GROUP
const catalogueSubjects = computed(() => {
  const names = [...new Set([...visibleTemplates.value, ...experiments.value].map(subjectOf))].sort((a, b) => (a === OTHER_GROUP ? 1 : b === OTHER_GROUP ? -1 : a.localeCompare(b)))
  return names
})
const catalogueSkills = computed(() => [...new Set(visibleTemplates.value.flatMap(t => t.practical_skills || []))].sort())

// Search / difficulty / skill narrow the templates; the subject is the level above them - the
// catalogue shows one card per subject, and choosing a card opens that subject's experiments.
const matchesFilters = (t: ExperimentSummary) => {
  if (catalogueDifficulty.value && t.difficulty !== catalogueDifficulty.value) return false
  if (catalogueSkill.value && !(t.practical_skills || []).includes(catalogueSkill.value)) return false
  if (catalogueSearch.value) {
    const q = catalogueSearch.value.toLowerCase()
    if (!t.title.toLowerCase().includes(q) && !(t.topic || '').toLowerCase().includes(q)) return false
  }
  return true
}
const matchingTemplates = computed(() => visibleTemplates.value.filter(matchesFilters))
const matchingMine = computed(() => experiments.value.filter(matchesFilters))
interface SubjectCard { name: string; category: LabCategory; items: ExperimentSummary[]; mine: ExperimentSummary[]; topics: string[]; levels: Record<string, number> }
const subjectCards = computed<SubjectCard[]>(() => {
  const groups = new Map<string, SubjectCard>()
  const groupFor = (t: ExperimentSummary) => {
    const name = subjectOf(t)
    if (!groups.has(name)) groups.set(name, { name, category: t.category, items: [], mine: [], topics: [], levels: {} })
    return groups.get(name)!
  }
  for (const e of matchingMine.value) groupFor(e).mine.push(e)
  for (const t of matchingTemplates.value) {
    const g = groupFor(t)
    g.items.push(t)
    if (t.topic && !g.topics.includes(t.topic)) g.topics.push(t.topic)
    g.levels[t.difficulty] = (g.levels[t.difficulty] || 0) + 1
  }
  return [...groups.values()].sort((a, b) => (a.name === OTHER_GROUP ? 1 : b.name === OTHER_GROUP ? -1 : a.name.localeCompare(b.name)))
})
/** The experiments to list once a subject card is open (empty until one is chosen) */
const filteredTemplates = computed(() => catalogueSubject.value ? matchingTemplates.value.filter(t => subjectOf(t) === catalogueSubject.value) : [])
const filteredMine = computed(() => catalogueSubject.value ? matchingMine.value.filter(e => subjectOf(e) === catalogueSubject.value) : [])
const openSubjectCard = computed(() => subjectCards.value.find(c => c.name === catalogueSubject.value) ?? null)
const openSubject = (name: string) => { catalogueSubject.value = name }

const openPreview = async (id: number) => {
  error.value = null
  try {
    const res = await axios.get(`${API_BASE}/virtual-lab/experiments/${id}`)
    previewExperiment.value = res.data.data
  } catch (err: any) {
    error.value = errorMessage(err, 'Failed to load experiment preview')
  }
}
const objectCatalog = ref<LabObjectDef[]>([])
const subjects = ref<{ id: number; name: string }[]>([])
const classes = ref<{ id: number; name: string; stream_name?: string | null }[]>([])
const terms = ref<{ id: number; name: string }[]>([])

const assignments = ref<TeacherAssignment[]>([])
const loadingAssignments = ref(true)
const expandedAssignment = ref<number | null>(null)
const attempts = ref<AttemptSummary[]>([])
const loadingAttempts = ref(false)

const showBuilder = ref(false)
const builderId = ref<number | null>(null)
const emptyForm = (): Partial<ExperimentDetail> => ({
  title: '', category: 'physics' as LabCategory, difficulty: 'intermediate' as const, subject_id: null, topic: '', marks: 20,
  render_mode: '3d', render_component: null,
  objective: '', introduction: '', apparatus: '', materials: '', safety_precautions: '', conclusion_prompt: '',
  scene_objects: [], steps: [], questions: [],
  graph: { enabled: false, title: '', x_column: '', y_column: '', x_label: '', y_label: '', graph_type: 'scatter', allow_axis_change: true, min_points: 2, show_best_fit: false, manual_plot: false },
})

// A small, non-hardcoded-per-component lookup of the actual `extra` keys each results-table
// renderer produces (see addResultRow/addSpringResultRow/addTitreResultRow/addOpticsResultRow in
// the student runtime page) - offered as datalist suggestions so a teacher isn't guessing column
// names, without forcing a strict dropdown that would dead-end for an experiment this list doesn't
// recognise (e.g. one that isn't 2D yet, or a future results-table type).
const GRAPH_COLUMN_OPTIONS: Record<string, string[]> = {
  circuit: ['voltage', 'current', 'resistance'],
  hookes_law: ['mass_g', 'force_n', 'length_cm', 'extension_cm'],
  titration: ['trial', 'initial_reading_ml', 'final_reading_ml', 'titre_ml'],
  optics: ['trial', 'incidence_deg', 'reflection_deg', 'refraction_deg'],
  projectile: ['angle_deg', 'range_m'],
  silver_density_spring: ['metal_number', 'reference_cm', 'air_reading_cm', 'water_reading_cm', 'e_a_cm', 'e_w_cm', 'loss_cm', 'relative_density', 'density_kgm3'],
  bulb_filament_resistance: ['x_m', 'current_a', 'voltage_v'],
}
const graphColumnSuggestions = computed(() => GRAPH_COLUMN_OPTIONS[form.value.render_component ?? ''] ?? [])
const onRenderModeChange = () => { if (form.value.render_mode !== '2d') form.value.render_component = null }
const form = ref<any>(emptyForm())

const publishTarget = ref<ExperimentSummary | null>(null)
const publishForm = ref({ classTarget: { scope: 'stream', class_id: null, class_group_name: null } as ClassTarget, term_id: null as number | null, due_date: '', marks: 20 })

const gradingAttempt = ref<AttemptDetail | null>(null)
const gradeScore = ref(0)
const gradeFeedback = ref('')
const reviewTab = ref<'mark' | 'summary' | 'timeline'>('mark')
const answerFor = (questionId: number) => gradingAttempt.value?.answers.find(a => a.question_id === questionId) ?? null

const notebookMeasurements = (a: AttemptDetail) => a.notebook.filter(n => n.entry_type === 'measurement')
const studentGraph = (a: AttemptDetail) => (a.notebook.find(n => n.entry_type === 'calculation' && n.label === 'Graph analysis')?.extra as Record<string, any> | undefined) ?? null
const bulbAnalysis = (a: AttemptDetail) => (a.notebook.find(n => n.entry_type === 'calculation' && n.label === 'Bulb analysis')?.extra as Record<string, any> | undefined) ?? null
const notebookResultRows = (a: AttemptDetail) => a.notebook.filter(n => n.entry_type === 'result_row')
// Points the student plotted themselves (manual-plot experiments) are stored as {x, y} rows and, when
// present, are what the graph was drawn from - otherwise it came from the Results Table
const notebookGraphRows = (a: AttemptDetail) => {
  const plotted = a.notebook.filter(n => n.entry_type === 'plot_point')
  return plotted.length ? plotted : notebookResultRows(a)
}
const graphAnswers = (a: AttemptDetail) => a.answers.filter(ans => ans.linked_to_graph)
const generalAnswers = (a: AttemptDetail) => a.answers.filter(ans => !ans.linked_to_graph)
// Locked to the frozen snapshot's own axes/labels/type (not the template's current graph config,
// which may have since been edited) - allow_axis_change is always off here, this is a historical
// record, not something a teacher should be able to re-plot differently.
const gradingGraphConfig = (a: AttemptDetail) => {
  const s = a.graph_snapshot
  if (!s) return null
  return {
    enabled: true, title: s.title, x_column: s.x_column, y_column: s.y_column,
    x_label: s.x_label, y_label: s.y_label, graph_type: s.graph_type ?? 'scatter',
    allow_axis_change: false, min_points: 0, show_best_fit: s.gradient !== null, manual_plot: false,
  }
}
const formatTime = (iso: string) => new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })

const saveQuestionGrade = async (a: { question_id: number; marks_awarded: number | null; feedback: string | null }) => {
  if (!gradingAttempt.value || a.marks_awarded === null || a.marks_awarded === undefined) return
  try {
    await axios.put(`${API_BASE}/virtual-lab/attempts/${gradingAttempt.value.id}/answers/${a.question_id}/grade`, {
      marks_awarded: a.marks_awarded, feedback: a.feedback,
    })
  } catch (err: any) {
    error.value = errorMessage(err, 'Failed to save this question\'s grade')
  }
}

const loadExperiments = async () => {
  loadingExperiments.value = true
  try {
    const [mine, tpl] = await Promise.all([
      axios.get(`${API_BASE}/virtual-lab/experiments`),
      axios.get(`${API_BASE}/virtual-lab/experiments`, { params: { templates: 1 } }),
    ])
    experiments.value = mine.data.data.experiments
    templates.value = tpl.data.data.experiments
  } finally {
    loadingExperiments.value = false
  }
}

const loadAssignments = async () => {
  loadingAssignments.value = true
  try {
    const res = await axios.get(`${API_BASE}/virtual-lab/assignments`)
    assignments.value = res.data.data.assignments
  } finally {
    loadingAssignments.value = false
  }
}

const toggleAssignment = async (id: number) => {
  if (expandedAssignment.value === id) {
    expandedAssignment.value = null
    return
  }
  expandedAssignment.value = id
  loadingAttempts.value = true
  try {
    const res = await axios.get(`${API_BASE}/virtual-lab/assignments/${id}/attempts`)
    attempts.value = res.data.data.attempts
  } finally {
    loadingAttempts.value = false
  }
}

const addSceneObject = () => form.value.scene_objects.push({ key: `obj${form.value.scene_objects.length + 1}`, object_type: objectCatalog.value[0]?.object_type || 'beaker', position: { x: 0, y: 0, z: 0 } })
const setRotationDegrees = (o: SceneObjectConfig, degrees: number) => {
  if (Number.isNaN(degrees)) return
  o.rotation = { y: (degrees * Math.PI) / 180 }
}
const addStep = () => form.value.steps.push({ instruction: '', required_action: 'inspect', target_object_key: '', expected_value: '', tolerance: null, hint: '', feedback_correct: '', feedback_incorrect: '', is_safety_check: false })
const addQuestion = () => form.value.questions.push({
  question_text: '', question_type: 'short_answer', marks: 1,
  stage: 'after_experiment', stage_step_number: null, requirement: 'notebook_only', linked_to_graph: false,
})

const errorMessage = (err: any, fallback: string) => {
  const data = err?.response?.data
  const detail = data?.errors ? Object.values(data.errors).join('; ') : ''
  return [data?.message || fallback, detail].filter(Boolean).join(': ')
}

const openBuilder = async (id: number | null) => {
  error.value = null
  builderId.value = id
  try {
    if (id) {
      const res = await axios.get(`${API_BASE}/virtual-lab/experiments/${id}`)
      form.value = res.data.data
      if (!form.value.graph) {
        form.value.graph = { enabled: false, title: '', x_column: '', y_column: '', x_label: '', y_label: '', graph_type: 'scatter', allow_axis_change: true, min_points: 2, show_best_fit: false, manual_plot: false }
      }
      form.value.questions = (form.value.questions ?? []).map((q: any) => ({
        stage: 'after_experiment', stage_step_number: null, requirement: 'notebook_only', linked_to_graph: false, ...q,
      }))
    } else {
      form.value = emptyForm()
    }
    showBuilder.value = true
  } catch (err: any) {
    error.value = errorMessage(err, 'Failed to load experiment')
  }
}

const useTemplate = async (templateId: number) => {
  error.value = null
  try {
    const res = await axios.post(`${API_BASE}/virtual-lab/experiments/${templateId}/copy-template`)
    await loadExperiments()
    openBuilder(res.data.data.id)
  } catch (err: any) {
    error.value = errorMessage(err, 'Failed to create experiment from template')
  }
}

const savingExperiment = ref(false)
const saveExperiment = async () => {
  error.value = null
  savingExperiment.value = true
  try {
    if (builderId.value) {
      await axios.put(`${API_BASE}/virtual-lab/experiments/${builderId.value}`, form.value)
    } else {
      await axios.post(`${API_BASE}/virtual-lab/experiments`, form.value)
    }
    showBuilder.value = false
    await loadExperiments()
  } catch (err: any) {
    error.value = errorMessage(err, 'Failed to save experiment')
  } finally {
    savingExperiment.value = false
  }
}

const deleteExperiment = async (id: number) => {
  error.value = null
  try {
    await axios.delete(`${API_BASE}/virtual-lab/experiments/${id}`)
    await loadExperiments()
  } catch (err: any) {
    error.value = errorMessage(err, 'Failed to delete experiment')
  }
}

const openPublish = (e: ExperimentSummary) => {
  error.value = null
  publishTarget.value = e
  publishForm.value = {
    classTarget: { scope: 'stream', class_id: classes.value[0]?.id ?? null, class_group_name: null },
    term_id: terms.value[0]?.id ?? null,
    due_date: '',
    marks: e.marks
  }
}

const publishing = ref(false)
const confirmPublish = async () => {
  if (!publishTarget.value) return
  const target = publishForm.value.classTarget
  if ((!target.class_id && !target.class_group_name) || !publishForm.value.term_id) {
    error.value = 'Select a class and term before publishing.'
    return
  }
  error.value = null
  publishing.value = true
  try {
    await axios.post(`${API_BASE}/virtual-lab/experiments/${publishTarget.value.id}/publish`, {
      scope: target.scope,
      class_id: target.class_id,
      class_group_name: target.class_group_name,
      term_id: publishForm.value.term_id,
      due_date: publishForm.value.due_date,
      marks: publishForm.value.marks
    })
    publishTarget.value = null
    await loadExperiments()
  } catch (err: any) {
    error.value = errorMessage(err, 'Failed to publish experiment')
  } finally {
    publishing.value = false
  }
}

const openGrading = async (attemptId: number) => {
  error.value = null
  try {
    const res = await axios.get(`${API_BASE}/virtual-lab/attempts/${attemptId}`)
    gradingAttempt.value = res.data.data
    gradeScore.value = res.data.data.score ?? 0
    gradeFeedback.value = res.data.data.teacher_feedback ?? ''
    reviewTab.value = 'mark'
  } catch (err: any) {
    error.value = errorMessage(err, 'Failed to load attempt')
  }
}

const submittingGrade = ref(false)
const submitGrade = async () => {
  if (!gradingAttempt.value) return
  error.value = null
  submittingGrade.value = true
  try {
    await axios.put(`${API_BASE}/virtual-lab/attempts/${gradingAttempt.value.id}/grade`, { score: gradeScore.value, feedback: gradeFeedback.value })
    gradingAttempt.value = null
    if (expandedAssignment.value) {
      const res = await axios.get(`${API_BASE}/virtual-lab/assignments/${expandedAssignment.value}/attempts`)
      attempts.value = res.data.data.attempts
    }
    await loadAssignments()
  } catch (err: any) {
    error.value = errorMessage(err, 'Failed to save grade')
  } finally {
    submittingGrade.value = false
  }
}

onMounted(async () => {
  try {
    const [objRes, subRes, clsRes, termRes] = await Promise.all([
      axios.get(`${API_BASE}/virtual-lab/objects`),
      axios.get(`${API_BASE}/virtual-lab/subjects`),
      axios.get(`${API_BASE}/classes`),
      axios.get(`${API_BASE}/report-cards/terms`),
    ])
    objectCatalog.value = objRes.data.data.objects
    subjects.value = subRes.data.data
    classes.value = clsRes.data.data
    terms.value = termRes.data.data.terms
    await Promise.all([loadExperiments(), loadAssignments()])
  } catch (err: any) {
    error.value = errorMessage(err, 'Failed to load Virtual Lab data')
  }
})
</script>
