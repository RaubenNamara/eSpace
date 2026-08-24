<template>
  <div class="min-h-full">
    <!-- Hero -->
    <div class="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 print-color-exact">
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px); background-size: 48px 48px;"></div>
      <div class="relative px-4 py-8 sm:px-8 sm:py-10">
        <div class="flex items-center gap-3 mb-2">
          <span class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-2xl flex-shrink-0">🧪</span>
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Virtual Lab</h1>
        </div>
        <p class="text-sm sm:text-base text-indigo-100 max-w-2xl">Create 3D practical experiments, publish them to your classes, and mark what students submit.</p>
      </div>
    </div>

    <div class="p-4 sm:p-6 lg:p-8 -mt-4 sm:-mt-5">
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="error" class="mb-4 flex items-start gap-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
          <span class="text-base leading-none">⚠️</span>
          <p class="flex-1 text-sm text-red-700 dark:text-red-300">{{ error }}</p>
          <button @click="error = null" class="flex-shrink-0 text-red-400 hover:text-red-600 text-xs">✕</button>
        </div>
      </transition>

      <!-- Tabs -->
      <div class="inline-flex flex-wrap gap-1 mb-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1 shadow-sm">
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
      </div>

      <!-- ===================== EXPERIMENTS TAB ===================== -->
      <div v-if="activeTab === 'experiments'">
        <div class="flex justify-end mb-5">
          <button @click="openBuilder(null)" class="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all">
            <span class="text-base leading-none">+</span> New Experiment
          </button>
        </div>

        <div v-if="templates.length > 0" class="mb-7">
          <p class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1.5"><span>✨</span> Experiment Catalogue</p>

          <div class="flex flex-wrap items-center gap-2 mb-3.5">
            <input v-model="catalogueSearch" type="text" placeholder="Search experiments..." class="input-field flex-1 min-w-[10rem] text-sm">
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

          <div v-if="filteredTemplates.length === 0" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center text-sm text-gray-400 dark:text-gray-500">No templates match your filters.</div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            <div v-for="t in filteredTemplates" :key="t.id" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div class="flex items-start gap-2.5">
                <span class="w-9 h-9 flex-shrink-0 rounded-xl bg-gradient-to-br flex items-center justify-center text-base print-color-exact" :class="CATEGORY_COLORS[t.category]">{{ CATEGORY_ICONS[t.category] }}</span>
                <div class="min-w-0 flex-1">
                  <p class="font-semibold text-gray-900 dark:text-white text-sm leading-snug truncate">{{ t.title }}</p>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">{{ t.subject_name || CATEGORY_LABELS[t.category] }}<span v-if="t.topic"> · {{ t.topic }}</span></p>
                </div>
              </div>

              <div class="flex items-center gap-1.5 flex-wrap mt-2.5">
                <span class="px-2 py-0.5 text-[10px] font-semibold rounded-full capitalize" :class="DIFFICULTY_BADGE[t.difficulty]">{{ t.difficulty }}</span>
                <span v-if="t.estimated_duration_minutes" class="px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">⏱ {{ t.estimated_duration_minutes }} min</span>
                <span v-if="t.template_version" class="px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">v{{ t.template_version }}</span>
              </div>

              <div v-if="t.practical_skills?.length" class="flex items-center gap-1 flex-wrap mt-2">
                <span v-for="sk in t.practical_skills.slice(0, 3)" :key="sk" class="px-2 py-0.5 text-[10px] font-medium rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">{{ humanizeSkill(sk) }}</span>
                <span v-if="t.practical_skills.length > 3" class="text-[10px] text-gray-400">+{{ t.practical_skills.length - 3 }} more</span>
              </div>

              <div class="flex-1"></div>
              <div class="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <button @click="openPreview(t.id)" class="flex-1 px-3 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Preview</button>
                <button @click="useTemplate(t.id)" class="flex-1 px-3 py-2 text-xs font-semibold rounded-lg border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">Use Template</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Experiment Preview -->
        <div v-if="previewExperiment" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" @click.self="previewExperiment = null">
          <div class="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <div class="p-5 sm:p-6 space-y-4">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <h3 class="font-bold text-lg text-gray-900 dark:text-white">{{ previewExperiment.title }}</h3>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{{ previewExperiment.subject_name }}<span v-if="previewExperiment.topic"> · {{ previewExperiment.topic }}</span></p>
                </div>
                <button @click="previewExperiment = null" class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
              </div>

              <div class="flex items-center gap-1.5 flex-wrap text-xs">
                <span class="px-2 py-0.5 rounded-full font-semibold capitalize" :class="DIFFICULTY_BADGE[previewExperiment.difficulty]">{{ previewExperiment.difficulty }}</span>
                <span v-if="previewExperiment.estimated_duration_minutes" class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">⏱ {{ previewExperiment.estimated_duration_minutes }} min</span>
                <span class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">{{ previewExperiment.marks }} marks</span>
                <span class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">{{ previewExperiment.steps.length }} steps</span>
              </div>

              <div v-if="previewExperiment.objective"><p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Objective</p><p class="text-sm text-gray-700 dark:text-gray-300">{{ previewExperiment.objective }}</p></div>
              <div v-if="previewExperiment.competency"><p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Competency</p><p class="text-sm text-gray-700 dark:text-gray-300">{{ previewExperiment.competency }}</p></div>
              <div v-if="previewExperiment.learning_outcomes"><p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Learning Outcomes</p><p class="text-sm text-gray-700 dark:text-gray-300">{{ previewExperiment.learning_outcomes }}</p></div>
              <div v-if="previewExperiment.prerequisite_knowledge"><p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Prerequisites</p><p class="text-sm text-gray-700 dark:text-gray-300">{{ previewExperiment.prerequisite_knowledge }}</p></div>
              <div v-if="previewExperiment.apparatus"><p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Apparatus</p><p class="text-sm text-gray-700 dark:text-gray-300">{{ previewExperiment.apparatus }}</p></div>
              <div v-if="previewExperiment.safety_precautions"><p class="text-xs font-semibold text-red-500 mb-1">Safety Precautions</p><p class="text-sm text-gray-700 dark:text-gray-300">{{ previewExperiment.safety_precautions }}</p></div>

              <div v-if="previewExperiment.practical_skills?.length">
                <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Skills Assessed</p>
                <div class="flex items-center gap-1 flex-wrap">
                  <span v-for="sk in previewExperiment.practical_skills" :key="sk" class="px-2 py-0.5 text-[11px] font-medium rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">{{ humanizeSkill(sk) }}</span>
                </div>
              </div>

              <div>
                <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Procedure Overview</p>
                <ol class="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-decimal list-inside">
                  <li v-for="s in previewExperiment.steps" :key="s.id">{{ s.instruction }}</li>
                </ol>
              </div>

              <div class="flex gap-2 pt-2">
                <button @click="previewExperiment = null" class="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">Close</button>
                <button @click="useTemplate(previewExperiment.id); previewExperiment = null" class="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">Use Template</button>
              </div>
            </div>
          </div>
        </div>

        <p class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">My Experiments</p>

        <div v-if="loadingExperiments" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <div v-for="i in 3" :key="i" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 animate-pulse space-y-3">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
          </div>
        </div>
        <div v-else-if="experiments.length === 0" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-10 sm:p-14 text-center">
          <span class="text-4xl block mb-2">🧫</span>
          <p class="text-gray-400 dark:text-gray-500 text-sm">No experiments yet &mdash; start from a template above or create your own.</p>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <div v-for="e in experiments" :key="e.id" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            <div class="h-1.5 bg-gradient-to-r print-color-exact" :class="CATEGORY_COLORS[e.category]"></div>
            <div class="p-4 flex-1 flex flex-col">
              <div class="flex items-start justify-between gap-2 mb-1.5">
                <h3 class="font-semibold text-gray-900 dark:text-white text-sm leading-snug">{{ e.title }}</h3>
                <span class="text-lg flex-shrink-0">{{ CATEGORY_ICONS[e.category] }}</span>
              </div>
              <p class="text-xs text-gray-400 dark:text-gray-500 mb-3">{{ e.subject_name || CATEGORY_LABELS[e.category] }}</p>

              <div class="flex items-center gap-2 flex-wrap mb-4">
                <span class="px-2 py-0.5 text-[11px] font-semibold rounded-full" :class="e.status === 'published' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'">{{ e.status }}</span>
                <span class="text-[11px] text-gray-400 dark:text-gray-500">{{ e.assignment_count }} class{{ e.assignment_count === 1 ? '' : 'es' }} published</span>
              </div>

              <div class="flex-1"></div>
              <div class="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <button @click="openBuilder(e.id)" class="flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Edit</button>
                <button @click="openPublish(e)" class="flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50">Publish</button>
                <button @click="deleteExperiment(e.id)" class="px-2.5 py-1.5 text-xs font-semibold rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== ASSIGNMENTS TAB ===================== -->
      <div v-else-if="activeTab === 'assignments'">
        <div v-if="loadingAssignments" class="py-10 text-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div></div>
        <div v-else-if="assignments.length === 0" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-10 sm:p-14 text-center">
          <span class="text-4xl block mb-2">📋</span>
          <p class="text-gray-400 dark:text-gray-500 text-sm">Nothing published yet.</p>
        </div>
        <div v-else class="space-y-3">
          <div v-for="a in assignments" :key="a.id" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <button class="w-full flex items-center justify-between gap-3 p-4 text-left" @click="toggleAssignment(a.id)">
              <div class="flex items-center gap-3 min-w-0">
                <span class="w-9 h-9 flex-shrink-0 rounded-xl bg-gradient-to-br flex items-center justify-center text-base print-color-exact" :class="CATEGORY_COLORS[a.category]">{{ CATEGORY_ICONS[a.category] }}</span>
                <div class="min-w-0">
                  <p class="font-semibold text-gray-900 dark:text-white text-sm truncate">{{ a.experiment_title }} &middot; {{ a.class_name }}</p>
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
                <div v-for="at in attempts" :key="at.id" class="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3">
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
          <span class="text-4xl block mb-2">🧭</span>
          <p class="text-gray-400 dark:text-gray-500 text-sm">Select a class and student to view their practical skills.</p>
        </div>
        <VirtualLabSkillsPanel v-else :key="skillsStudentId" viewer="teacher" :student-id="skillsStudentId" />
      </div>
    </div>

    <!-- ===================== BUILDER MODAL ===================== -->
    <div v-if="showBuilder" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-2 sm:p-4" @click.self="showBuilder = false">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between z-10">
          <h2 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{{ builderId ? 'Edit Experiment' : 'New Experiment' }}</h2>
          <button @click="showBuilder = false" class="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>

        <div class="p-4 sm:p-6 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="sm:col-span-2"><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Title</label><input v-model="form.title" class="input-field w-full mt-1"></div>
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
                <option value="3d">3D (Three.js scene)</option>
                <option value="2d">2D (interactive SVG)</option>
              </select>
            </div>
            <div v-if="form.render_mode === '2d'"><label class="text-xs font-medium text-gray-500 dark:text-gray-400">2D Renderer</label>
              <select v-model="form.render_component" class="input-field w-full mt-1">
                <option :value="null">Choose one...</option>
                <option v-for="c in RENDER_2D_COMPONENTS" :key="c" :value="c">{{ c }}</option>
              </select>
              <p class="text-[11px] text-gray-400 mt-1">Must match a renderer registered in render2d/registry.ts, or the experiment silently falls back to 3D.</p>
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
            <div v-for="(o, i) in form.scene_objects" :key="i" class="bg-gray-50 dark:bg-gray-900/40 sm:bg-transparent dark:sm:bg-transparent rounded-lg p-2 sm:p-0 mb-2">
              <div class="grid grid-cols-2 sm:grid-cols-12 gap-2 sm:items-center">
                <select v-model="o.object_type" class="input-field col-span-2 sm:col-span-4 text-xs">
                  <option v-for="obj in objectCatalog" :key="obj.object_type" :value="obj.object_type">{{ obj.icon }} {{ obj.display_name }}</option>
                </select>
                <input v-model="o.key" placeholder="key (unique)" class="input-field col-span-2 sm:col-span-3 text-xs">
                <input v-model.number="o.position.x" type="number" step="0.5" placeholder="x" class="input-field sm:col-span-2 text-xs">
                <input v-model.number="o.position.z" type="number" step="0.5" placeholder="z" class="input-field sm:col-span-2 text-xs">
                <button @click="form.scene_objects.splice(i, 1)" class="col-span-2 sm:col-span-1 text-red-500 text-xs font-medium py-1 sm:py-0">Remove</button>
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
            <div v-for="(s, i) in form.steps" :key="i" class="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3 mb-2 space-y-2">
              <div class="flex items-center justify-between"><span class="text-xs font-bold text-indigo-500 dark:text-indigo-400">Step {{ Number(i) + 1 }}</span><button @click="form.steps.splice(i, 1)" class="text-red-500 text-xs font-medium">Remove</button></div>
              <input v-model="s.instruction" placeholder="Instruction" class="input-field w-full text-xs">
              <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
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
              <input v-model="form.graph.title" placeholder="Graph title (e.g. Force Against Extension)" class="input-field w-full text-xs">
              <div class="grid grid-cols-2 gap-2">
                <input v-model="form.graph.x_column" placeholder="X column (Results Table key)" list="graph-column-suggestions" class="input-field text-xs">
                <input v-model="form.graph.y_column" placeholder="Y column (Results Table key)" list="graph-column-suggestions" class="input-field text-xs">
              </div>
              <datalist id="graph-column-suggestions">
                <option v-for="c in graphColumnSuggestions" :key="c" :value="c" />
              </datalist>
              <div class="grid grid-cols-2 gap-2">
                <input v-model="form.graph.x_label" placeholder="X axis label (e.g. Extension (cm))" class="input-field text-xs">
                <input v-model="form.graph.y_label" placeholder="Y axis label (e.g. Force (N))" class="input-field text-xs">
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:items-center">
                <select v-model="form.graph.graph_type" class="input-field text-xs">
                  <option value="scatter">Scatter</option><option value="line">Line</option>
                </select>
                <input v-model.number="form.graph.min_points" type="number" min="1" placeholder="Min. points" class="input-field text-xs" title="Minimum Results Table rows required before the graph appears">
                <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"><input v-model="form.graph.allow_axis_change" type="checkbox" class="rounded"> Learner can change axes</label>
                <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"><input v-model="form.graph.show_best_fit" type="checkbox" class="rounded"> Show best-fit line</label>
              </div>
              <p v-if="graphColumnSuggestions.length" class="text-[11px] text-gray-400">Suggested columns for this experiment: {{ graphColumnSuggestions.join(', ') }}</p>
            </div>
          </div>

          <!-- Questions -->
          <div class="border-t border-gray-100 dark:border-gray-700 pt-4">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Questions</p>
              <button @click="addQuestion" class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">+ Add Question</button>
            </div>
            <div v-for="(q, i) in form.questions" :key="i" class="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-2.5 mb-2 space-y-2">
              <div class="grid grid-cols-2 sm:grid-cols-12 gap-2 sm:items-center">
                <input v-model="q.question_text" placeholder="Question" class="input-field col-span-2 sm:col-span-6 text-xs">
                <select v-model="q.question_type" class="input-field sm:col-span-3 text-xs">
                  <option value="short_answer">Short answer</option><option value="calculation">Calculation</option><option value="observation">Observation</option><option value="procedure">Procedure</option>
                </select>
                <input v-model.number="q.marks" type="number" placeholder="Marks" class="input-field sm:col-span-2 text-xs">
                <button @click="form.questions.splice(i, 1)" class="text-red-500 text-xs font-medium sm:col-span-1">Remove</button>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-12 gap-2 sm:items-center">
                <select v-model="q.stage" class="input-field sm:col-span-3 text-xs" title="When this question appears">
                  <option value="before_experiment">Before experiment</option>
                  <option value="after_step">After a step</option>
                  <option value="after_measurement">After a measurement</option>
                  <option value="after_experiment">After experiment (notebook)</option>
                </select>
                <input
                  v-if="q.stage === 'after_step' || q.stage === 'after_measurement'"
                  v-model.number="q.stage_step_number" type="number" min="1" placeholder="Step #"
                  class="input-field sm:col-span-2 text-xs" title="Which step number this follows"
                >
                <select v-model="q.requirement" class="input-field sm:col-span-3 text-xs" title="Notebook only never interrupts the simulation">
                  <option value="notebook_only">Notebook only</option>
                  <option value="optional">Optional (can skip)</option>
                  <option value="required">Required before continuing</option>
                </select>
                <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 sm:col-span-3" title="Renders under the graph instead of the general question list">
                  <input v-model="q.linked_to_graph" type="checkbox" class="rounded"> Graph analysis question
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 flex justify-end gap-2">
          <button @click="showBuilder = false" class="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Cancel</button>
          <button @click="saveExperiment" :disabled="savingExperiment" class="px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm disabled:opacity-50">{{ savingExperiment ? 'Saving...' : 'Save Experiment' }}</button>
        </div>
      </div>
    </div>

    <!-- ===================== PUBLISH MODAL ===================== -->
    <div v-if="publishTarget" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-3 sm:p-4" @click.self="publishTarget = null">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-5 sm:p-6 space-y-3.5">
        <div class="flex items-start justify-between gap-2">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"><span>🚀</span> Publish "{{ publishTarget.title }}"</h2>
          <button @click="publishTarget = null" class="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>
        <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Class</label>
          <select v-model="publishForm.class_id" class="input-field w-full mt-1"><option v-for="c in classes" :key="c.id" :value="c.id">{{ c.name }}{{ c.stream_name ? ' - ' + c.stream_name : '' }}</option></select>
        </div>
        <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Term</label>
          <select v-model="publishForm.term_id" class="input-field w-full mt-1"><option v-for="t in terms" :key="t.id" :value="t.id">{{ t.name }}</option></select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Due Date</label><input v-model="publishForm.due_date" type="date" class="input-field w-full mt-1"></div>
          <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Marks</label><input v-model.number="publishForm.marks" type="number" class="input-field w-full mt-1"></div>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button @click="publishTarget = null" class="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Cancel</button>
          <button @click="confirmPublish" :disabled="publishing" class="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm disabled:opacity-50">{{ publishing ? 'Publishing...' : 'Publish' }}</button>
        </div>
      </div>
    </div>

    <!-- ===================== GRADING MODAL ===================== -->
    <div v-if="gradingAttempt" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-3 sm:p-4" @click.self="gradingAttempt = null">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] sm:max-h-[85vh] overflow-y-auto p-5 sm:p-6 space-y-4">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{{ gradingAttempt.student_name }}</h2>
            <p class="text-xs text-gray-400 dark:text-gray-500">{{ gradingAttempt.experiment_title }}</p>
          </div>
          <button @click="gradingAttempt = null" class="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>

        <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
          <div class="bg-gray-50 dark:bg-gray-900/40 rounded-lg py-2"><p class="text-sm font-bold text-gray-900 dark:text-white">{{ gradingAttempt.steps_completed }}/{{ gradingAttempt.total_steps }}</p><p class="text-[10px] text-gray-400">Steps</p></div>
          <div class="bg-gray-50 dark:bg-gray-900/40 rounded-lg py-2"><p class="text-sm font-bold text-green-600 dark:text-green-400">{{ gradingAttempt.correct_actions }}</p><p class="text-[10px] text-gray-400">Correct</p></div>
          <div class="bg-gray-50 dark:bg-gray-900/40 rounded-lg py-2"><p class="text-sm font-bold text-red-500 dark:text-red-400">{{ gradingAttempt.wrong_actions }}</p><p class="text-[10px] text-gray-400">Retries</p></div>
          <div class="bg-gray-50 dark:bg-gray-900/40 rounded-lg py-2"><p class="text-sm font-bold text-amber-500 dark:text-amber-400">{{ gradingAttempt.hints_used }}</p><p class="text-[10px] text-gray-400">Hints</p></div>
          <div class="rounded-lg py-2" :class="gradingAttempt.safety_mistakes > 0 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-gray-50 dark:bg-gray-900/40'"><p class="text-sm font-bold" :class="gradingAttempt.safety_mistakes > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'">{{ gradingAttempt.safety_mistakes }}</p><p class="text-[10px] text-gray-400">Safety Errors</p></div>
          <div class="bg-gray-50 dark:bg-gray-900/40 rounded-lg py-2"><p class="text-sm font-bold text-gray-900 dark:text-white">{{ Math.round(gradingAttempt.time_spent_seconds / 60) }}m</p><p class="text-[10px] text-gray-400">Time</p></div>
        </div>

        <!-- Sub-tabs -->
        <div class="flex gap-1 bg-gray-100 dark:bg-gray-900/40 rounded-lg p-1">
          <button @click="reviewTab = 'summary'" class="flex-1 px-2 py-1.5 text-xs font-semibold rounded-md transition-colors" :class="reviewTab === 'summary' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'">Summary</button>
          <button @click="reviewTab = 'timeline'" class="flex-1 px-2 py-1.5 text-xs font-semibold rounded-md transition-colors" :class="reviewTab === 'timeline' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'">Timeline</button>
        </div>

        <template v-if="reviewTab === 'summary'">
          <div v-if="notebookMeasurements(gradingAttempt).length" class="text-sm">
            <p class="font-semibold text-gray-700 dark:text-gray-300 mb-1">Notebook - Measurements</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="m in notebookMeasurements(gradingAttempt)" :key="m.id" class="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">{{ m.label }}: {{ m.value }}{{ m.unit }}</span>
            </div>
          </div>

          <div v-if="notebookResultRows(gradingAttempt).length" class="text-sm">
            <p class="font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Notebook - Results Table</p>
            <div class="overflow-x-auto">
              <table class="w-full text-xs border-collapse">
                <thead>
                  <tr class="bg-gray-50 dark:bg-gray-900/40 text-left text-gray-500 dark:text-gray-400">
                    <th v-for="col in Object.keys(notebookResultRows(gradingAttempt)[0]?.extra || {})" :key="col" class="px-3 py-2 font-semibold capitalize">{{ col }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                  <tr v-for="row in notebookResultRows(gradingAttempt)" :key="row.id">
                    <td v-for="col in Object.keys(row.extra || {})" :key="col" class="px-3 py-2 text-gray-700 dark:text-gray-200">{{ row.extra?.[col] ?? '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Graph - shown exactly as the student saw it (locked to the frozen attempt snapshot's
               axes/labels/type, not whatever the template's graph config has since been edited to),
               with graph-analysis answers marked right alongside it. -->
          <div v-if="gradingAttempt.graph_snapshot" class="text-sm">
            <p class="font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Graph</p>
            <VirtualLabGraph :rows="notebookResultRows(gradingAttempt)" :config="gradingGraphConfig(gradingAttempt)" />
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

          <div v-if="gradingAttempt.observations.length" class="text-sm">
            <p class="font-semibold text-gray-700 dark:text-gray-300 mb-1">Observations</p>
            <p v-for="(o, i) in gradingAttempt.observations" :key="i" class="text-gray-600 dark:text-gray-300 italic bg-gray-50 dark:bg-gray-900/40 rounded-lg p-2.5">{{ o.text }}</p>
          </div>

          <!-- Per-question marking - separate from the single overall Score below, which stays the
               teacher's final say rather than being auto-summed from these. Marks are never
               pre-filled just because an answer exists (empty until the teacher enters a value). -->
          <div v-if="generalAnswers(gradingAttempt).length" class="text-sm space-y-2">
            <p class="font-semibold text-gray-700 dark:text-gray-300">Answers</p>
            <div v-for="a in generalAnswers(gradingAttempt)" :key="a.question_id" class="bg-gray-50 dark:bg-gray-900/40 rounded-lg p-2.5 space-y-1.5">
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

          <div v-if="gradingAttempt.conclusion_text" class="text-sm">
            <p class="font-semibold text-gray-700 dark:text-gray-300 mb-1">Conclusion</p>
            <p class="text-gray-600 dark:text-gray-300">{{ gradingAttempt.conclusion_text }}</p>
          </div>
        </template>

        <template v-else>
          <div v-if="gradingAttempt.action_log.length === 0" class="text-xs text-gray-400 text-center py-6">No actions recorded.</div>
          <div v-else class="space-y-2 max-h-72 overflow-y-auto">
            <div v-for="(l, i) in gradingAttempt.action_log" :key="i" class="flex items-start gap-2 text-xs">
              <span class="flex-shrink-0 w-14 text-gray-400 dark:text-gray-500 tabular-nums">{{ formatTime(l.created_at) }}</span>
              <span class="flex-shrink-0">{{ l.is_correct ? '✅' : '⚪' }}</span>
              <span class="text-gray-700 dark:text-gray-200">
                <span class="font-medium capitalize">{{ l.action.replace('_', ' ') }}</span>
                <span v-if="l.object_key" class="text-gray-400"> &middot; {{ l.object_key }}</span>
                <span v-if="l.value" class="text-gray-400"> &middot; {{ l.value }}</span>
              </span>
            </div>
          </div>
        </template>

        <div class="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-2">
          <div class="grid grid-cols-2 gap-3">
            <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Score (out of {{ gradingAttempt.max_marks }})</label><input v-model.number="gradeScore" type="number" class="input-field w-full mt-1"></div>
          </div>
          <div><label class="text-xs font-medium text-gray-500 dark:text-gray-400">Feedback</label><textarea v-model="gradeFeedback" rows="2" class="input-field w-full mt-1"></textarea></div>
          <button @click="submitGrade" :disabled="submittingGrade" class="w-full px-4 py-2.5 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm disabled:opacity-50">{{ submittingGrade ? 'Saving...' : 'Save Grade' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import { CATEGORY_ICONS, CATEGORY_LABELS, CATEGORY_COLORS } from '@/types/virtualLab'
import type { ExperimentSummary, ExperimentDetail, LabObjectDef, TeacherAssignment, AttemptSummary, AttemptDetail, LabAction, LabCategory } from '@/types/virtualLab'
import VirtualLabSkillsPanel from '@/components/virtuallab/VirtualLabSkillsPanel.vue'
import VirtualLabGraph from '@/components/virtuallab/VirtualLabGraph.vue'
import { RENDER_2D_REGISTRY } from '@/components/virtuallab/render2d/registry'

// Restricted to what's actually registered, not free text - a typo'd slug would silently fall back
// to the 3D engine (resolve2DRenderer() returns null for an unknown slug).
const RENDER_2D_COMPONENTS = Object.keys(RENDER_2D_REGISTRY)

const DIFFICULTY_BADGE: Record<string, string> = {
  beginner: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
  intermediate: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',
  advanced: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
}
const humanizeSkill = (slug: string) => slug.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

const API_BASE = '/api/teacher'
const LAB_ACTIONS: LabAction[] = ['move', 'rotate', 'connect', 'pour', 'heat', 'measure', 'switch_on', 'switch_off', 'zoom', 'inspect', 'acknowledge']

const activeTab = ref<'experiments' | 'assignments' | 'skills'>('experiments')

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
const catalogueSubjects = computed(() => [...new Set(visibleTemplates.value.map(t => t.subject_name).filter((s): s is string => !!s))].sort())
const catalogueSkills = computed(() => [...new Set(visibleTemplates.value.flatMap(t => t.practical_skills || []))].sort())
const filteredTemplates = computed(() => visibleTemplates.value.filter(t => {
  if (catalogueSubject.value && t.subject_name !== catalogueSubject.value) return false
  if (catalogueDifficulty.value && t.difficulty !== catalogueDifficulty.value) return false
  if (catalogueSkill.value && !(t.practical_skills || []).includes(catalogueSkill.value)) return false
  if (catalogueSearch.value) {
    const q = catalogueSearch.value.toLowerCase()
    if (!t.title.toLowerCase().includes(q) && !(t.topic || '').toLowerCase().includes(q)) return false
  }
  return true
}))

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
  graph: { enabled: false, title: '', x_column: '', y_column: '', x_label: '', y_label: '', graph_type: 'scatter', allow_axis_change: true, min_points: 2, show_best_fit: false },
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
}
const graphColumnSuggestions = computed(() => GRAPH_COLUMN_OPTIONS[form.value.render_component ?? ''] ?? [])
const onRenderModeChange = () => { if (form.value.render_mode !== '2d') form.value.render_component = null }
const form = ref<any>(emptyForm())

const publishTarget = ref<ExperimentSummary | null>(null)
const publishForm = ref({ class_id: null as number | null, term_id: null as number | null, due_date: '', marks: 20 })

const gradingAttempt = ref<AttemptDetail | null>(null)
const gradeScore = ref(0)
const gradeFeedback = ref('')
const reviewTab = ref<'summary' | 'timeline'>('summary')

const notebookMeasurements = (a: AttemptDetail) => a.notebook.filter(n => n.entry_type === 'measurement')
const notebookResultRows = (a: AttemptDetail) => a.notebook.filter(n => n.entry_type === 'result_row')
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
    allow_axis_change: false, min_points: 0, show_best_fit: s.gradient !== null,
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
const addStep = () => form.value.steps.push({ instruction: '', required_action: 'inspect', target_object_key: '', expected_value: '', tolerance: null, hint: '', feedback_correct: '', feedback_incorrect: '', is_safety_check: false })
const addQuestion = () => form.value.questions.push({
  question_text: '', question_type: 'short_answer', marks: 1,
  stage: 'after_experiment', stage_step_number: null, requirement: 'notebook_only', linked_to_graph: false,
})

const errorMessage = (err: any, fallback: string) => err?.response?.data?.message || fallback

const openBuilder = async (id: number | null) => {
  error.value = null
  builderId.value = id
  try {
    if (id) {
      const res = await axios.get(`${API_BASE}/virtual-lab/experiments/${id}`)
      form.value = res.data.data
      if (!form.value.graph) {
        form.value.graph = { enabled: false, title: '', x_column: '', y_column: '', x_label: '', y_label: '', graph_type: 'scatter', allow_axis_change: true, min_points: 2, show_best_fit: false }
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
  publishForm.value = { class_id: classes.value[0]?.id ?? null, term_id: terms.value[0]?.id ?? null, due_date: '', marks: e.marks }
}

const publishing = ref(false)
const confirmPublish = async () => {
  if (!publishTarget.value) return
  if (!publishForm.value.class_id || !publishForm.value.term_id) {
    error.value = 'Select a class and term before publishing.'
    return
  }
  error.value = null
  publishing.value = true
  try {
    await axios.post(`${API_BASE}/virtual-lab/experiments/${publishTarget.value.id}/publish`, publishForm.value)
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
    reviewTab.value = 'summary'
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
      axios.get(`${API_BASE}/subjects`),
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
