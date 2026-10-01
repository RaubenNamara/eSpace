<template>
  <div class="min-h-full">
    <div v-if="loading" class="flex flex-col items-center justify-center py-24 gap-3">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      <p class="text-xs text-gray-400 dark:text-gray-500">Entering the lab...</p>
    </div>

    <template v-else-if="attempt">
      <!-- Header -->
      <!-- Header - same compact icon + title pattern as the other student pages -->
      <div>
        <div class="max-w-[1920px] mx-auto">
          <router-link :to="backLink" class="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline mb-2">
            <span>&larr;</span> Virtual Lab
          </router-link>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5 min-w-0">
              <div class="flex items-center gap-2">
                <div class="hidden sm:flex w-7 h-7 rounded-lg bg-indigo-600 items-center justify-center flex-shrink-0">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v6.5L4.5 18A2 2 0 006.3 21h11.4a2 2 0 001.8-3L15 9.5V3M8 3h8M7 15h10" /></svg>
                </div>
                <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">{{ attempt.experiment.title }}</h1>
              </div>
              <p v-if="attempt.experiment.safety_precautions" class="inline-flex items-start gap-1.5 px-2.5 py-1 text-xs sm:text-sm rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300">
                <AppIcon name="warning" class="w-4 h-4 flex-shrink-0 mt-0.5" /><span><strong>Safety:</strong> {{ attempt.experiment.safety_precautions }}</span>
              </p>
            </div>
            <span v-if="isPractice" class="px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200">Practice mode</span>
            <span v-else class="px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap" :class="statusBadgeClass">{{ attempt.status.replace('_', ' ') }}</span>
          </div>

          <!-- Progress bar -->
          <!-- A teacher doing the experiment like a student: same lab, nothing saved, no submit -->
          <div v-if="isPractice" class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-3 py-2 text-xs sm:text-sm text-amber-800 dark:text-amber-200">
            <span class="font-semibold inline-flex items-center gap-1"><AppIcon name="teacher" class="w-4 h-4" /> Teacher practice</span>
            <span class="flex-1 min-w-[12rem]">You are doing this experiment the way a student does. Nothing is saved and it can't be submitted.</span>
            <button type="button" @click="restartPractice" class="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-700 font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/40">↺ Start again</button>
          </div>
          <div v-if="attempt.status === 'in_progress'" class="mt-3 flex items-center gap-3">
            <div class="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <div class="h-full rounded-full bg-indigo-600 print-color-exact transition-all duration-500" :style="{ width: progressPct + '%' }"></div>
            </div>
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ attempt.steps_completed }}/{{ attempt.experiment.steps.length }} steps</span>
          </div>
        </div>
      </div>

      <div class="max-w-[1920px] mx-auto pt-4">
        <!-- Required apparatus - some pieces may already be on the bench, others wait in the tray
             inside the 3D view until you pick them up; the setup itself (wiring, pouring,
             measuring) is still entirely up to you. -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-3.5 mb-4">
          <div class="flex items-center justify-between gap-2 mb-2">
            <p class="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">{{ CATEGORY_LABELS[attempt.experiment.category] }} Apparatus</p>
            <button @click="enterMaximize" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm whitespace-nowrap" title="Fill the whole screen with the lab">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
              Full Screen Lab
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="o in apparatusList"
              :key="o.key"
              class="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors"
              :class="isHighlightedApparatus(o.key) ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-300 dark:ring-indigo-700' : 'bg-gray-50 dark:bg-gray-950/40 text-gray-600 dark:text-gray-300'"
            >
              <span>{{ o.icon }}</span> {{ o.name }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
          <!-- Step panel: shown first on mobile/tablet so the instruction is visible without
               scrolling past the 3D view; resets to the right-hand column on desktop. -->
          <div class="order-1 lg:order-2 lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5 flex flex-col lg:h-[calc(100svh-7rem)] lg:min-h-[560px] lg:overflow-y-auto">
            <template v-if="attempt.status === 'in_progress'">
              <!-- A staged Procedure/Analysis question takes over this panel until answered (or
                   skipped, if optional) - "notebook_only" questions never reach here, they only
                   ever appear in the Practical Notebook below like every question did before this. -->
              <template v-if="pendingInterstitialQuestion">
                <p class="text-xs font-bold uppercase tracking-wider text-purple-500 dark:text-purple-400 mb-2">
                  {{ pendingInterstitialQuestion.requirement === 'required' ? 'Required Before Continuing' : 'Quick Question' }}
                </p>
                <div class="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-3.5">
                  <p class="text-sm font-medium text-gray-800 dark:text-gray-100 mb-2.5">{{ pendingInterstitialQuestion.question_text }}</p>
                  <textarea
                    v-model="answers[pendingInterstitialQuestion.id]"
                    rows="3"
                    class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
                    placeholder="Your answer..."
                  ></textarea>
                  <div class="flex gap-2 mt-2.5">
                    <button v-if="pendingInterstitialQuestion.requirement === 'optional'" @click="skipInterstitial(pendingInterstitialQuestion.id)" class="flex-1 px-3 py-2 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Skip</button>
                    <button :disabled="!answers[pendingInterstitialQuestion.id]?.trim()" @click="continueFromInterstitial(pendingInterstitialQuestion)" class="flex-1 px-3 py-2 text-xs font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50">Continue</button>
                  </div>
                </div>
              </template>
              <template v-else>
              <div class="flex items-center justify-between mb-3">
                <p class="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">Steps</p>
                <p :key="`n${attempt.steps_completed}`" class="step-anim-counter text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                  {{ Math.min(attempt.steps_completed, attempt.experiment.steps.length) }} of {{ attempt.experiment.steps.length }} done
                </p>
              </div>

              <VirtualLabStepList
                class="mb-3"
                :steps="attempt.experiment.steps"
                :current-step="attempt.current_step"
                :all-done="allStepsDone"
                :stagger="revealStagger"
                :hint-levels="hintLevels"
                :hint-level="hintLevel"
                @acknowledge="acknowledgeSafety"
                @hint="requestHint"
                @reset="resetCurrentStep"
              />

              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-to-class="opacity-0"
              >
                <div v-if="toast" class="mb-3 text-xs font-semibold rounded-xl px-3.5 py-2.5 flex items-center gap-2" :class="toast.correct ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'">
                  <AppIcon :name="toast.correct ? 'check-circle' : 'warning'" class="w-4 h-4" /> {{ toast.text }}
                </div>
              </transition>

              <!-- Offered right after taking a real reading - can't be replaced with a typed value. -->
              <div v-if="pendingNotebookEntry" class="mb-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3">
                <p class="text-xs text-emerald-800 dark:text-emerald-200 mb-2">Add <strong>{{ pendingNotebookEntry.label }}: {{ pendingNotebookEntry.value }}{{ pendingNotebookEntry.unit }}</strong> to your notebook?</p>
                <div class="flex gap-2">
                  <button @click="dismissPendingNotebook" class="flex-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300">Skip</button>
                  <button @click="addPendingToNotebook" class="flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Add to Notebook</button>
                </div>
              </div>

              <div class="flex-1"></div>
              <div class="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-700 text-xs">
                <span class="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">✓ {{ attempt.correct_actions }} correct</span>
                <span class="inline-flex items-center gap-1 text-red-500 dark:text-red-400 font-medium">✕ {{ attempt.wrong_actions }} wrong</span>
                <span v-if="attempt.hints_used > 0" class="inline-flex items-center gap-1 text-amber-500 dark:text-amber-400 font-medium"><AppIcon name="bulb" class="w-3.5 h-3.5" /> {{ attempt.hints_used }}</span>
                <span v-if="attempt.safety_mistakes > 0" class="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-bold"><AppIcon name="warning" class="w-3.5 h-3.5" /> {{ attempt.safety_mistakes }} safety</span>
              </div>
              </template>
            </template>

            <template v-else>
              <p class="text-sm text-gray-600 dark:text-gray-300">All steps recorded. This practical has been {{ attempt.status }}.</p>
              <div v-if="attempt.status === 'graded'" class="mt-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
                <p class="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">{{ attempt.score }}<span class="text-sm font-medium text-indigo-400">/{{ attempt.marks }}</span></p>
                <p v-if="attempt.teacher_feedback" class="text-xs text-gray-600 dark:text-gray-300 mt-2 italic">&ldquo;{{ attempt.teacher_feedback }}&rdquo;</p>
                <a v-if="hasTeacherMarking" href="#teacher-marking" class="inline-block mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">See your marked work &darr;</a>
              </div>
              <a v-if="hasTeacherMarking && attempt.status !== 'graded'" href="#teacher-marking" class="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-3 py-2.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"><AppIcon name="pencil" class="w-4 h-4" /> Your teacher has marked your work - see it below &darr;</a>
            </template>
          </div>

          <!-- Experiment scene - a guided 3D experiment from the registry when one is configured
               (render_mode + render_component), the free-layout Three.js engine for everything else.
               This component never branches on which experiment it is. -->
          <!-- Full screen keeps the same element (only its classes change), so the 3D scene is
               never torn down and rebuilt - a slim bar keeps the current step in view. -->
          <div
            class="order-2 lg:order-1 lg:col-span-2 2xl:col-span-3"
            :class="labMaximized ? 'fixed inset-0 z-[200] flex flex-col bg-slate-900' : ''"
          >
            <div v-if="labMaximized" class="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3">
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 whitespace-nowrap">
                    {{ attempt.status === 'in_progress' && !allStepsDone ? `Step ${attempt.current_step} of ${attempt.experiment.steps.length}` : 'All steps done' }}
                  </p>
                  <div class="hidden sm:block flex-1 max-w-[12rem] h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <div class="h-full rounded-full bg-indigo-600 transition-all duration-500" :style="{ width: progressPct + '%' }"></div>
                  </div>
                  <span class="text-[10px] font-medium text-green-600 dark:text-green-400">&check; {{ attempt.correct_actions }}</span>
                  <span class="text-[10px] font-medium text-red-500 dark:text-red-400">&times; {{ attempt.wrong_actions }}</span>
                </div>
                <p :key="`bar${attempt.current_step}${allStepsDone}`" class="step-anim-bar text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-100 line-clamp-2">
                  {{ allStepsDone || attempt.status !== 'in_progress' ? 'Exit full screen to complete your notebook and submit.' : currentStep?.instruction }}
                </p>
              </div>
              <span v-if="toast" class="hidden sm:inline-flex items-center gap-1 max-w-[16rem] text-[11px] font-semibold rounded-lg px-2 py-1" :class="toast.correct ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'">
                <span>{{ toast.correct ? '✅' : '⚠️' }}</span><span class="truncate">{{ toast.text }}</span>
              </span>
              <button v-if="attempt.status === 'in_progress' && currentStep?.is_safety_check && !allStepsDone" @click="acknowledgeSafety" class="flex-shrink-0 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700">I Understand</button>
              <button v-else-if="pendingInterstitialQuestion" @click="exitMaximize" class="flex-shrink-0 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700">Answer Question</button>
              <button v-if="pendingNotebookEntry" @click="addPendingToNotebook" class="flex-shrink-0 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700" :title="`Add ${pendingNotebookEntry.label}: ${pendingNotebookEntry.value}${pendingNotebookEntry.unit} to your notebook`">+ Notebook</button>
              <button
                v-if="attempt.status === 'in_progress'"
                @click="stepsPanelOpen = !stepsPanelOpen"
                class="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors"
                :class="stepsPanelOpen ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" /></svg>
                Steps
              </button>
              <button @click="exitMaximize" class="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /></svg>
                Exit<span class="hidden sm:inline">&nbsp;Full Screen</span>
              </button>
            </div>
            <div :class="labMaximized ? 'relative flex flex-1 min-h-0' : ''">
              <div
                class="relative overflow-hidden"
                :class="labMaximized ? 'flex-1 min-w-0 min-h-0' : 'h-[68svh] min-h-[340px] sm:h-[72svh] lg:h-[calc(100svh-7rem)] lg:min-h-[560px] rounded-2xl shadow-lg ring-1 ring-gray-900/5'"
              >
                <component
                  :is="guidedExperiment ?? VirtualLabScene"
                  ref="sceneRef"
                  :scene-objects="attempt.experiment.scene_objects"
                  :object-catalog="objectCatalog"
                  :read-only="sceneReadOnly"
                  @action="onSceneAction"
                />
              </div>

              <!-- Full screen steps: a side panel beside the lab, a slide-over drawer on phones -->
              <transition
                enter-active-class="transition duration-300 ease-out" enter-from-class="translate-x-full sm:translate-x-0 opacity-0"
                leave-active-class="transition duration-200 ease-in" leave-to-class="translate-x-full sm:translate-x-0 opacity-0"
              >
                <aside
                  v-if="labMaximized && stepsPanelOpen && attempt.status === 'in_progress'"
                  class="absolute sm:static inset-y-0 right-0 z-10 w-[85%] max-w-sm sm:w-72 xl:w-80 flex-shrink-0 overflow-y-auto bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-2xl sm:shadow-none p-4"
                >
                  <div class="flex items-center justify-between mb-3">
                    <p class="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">Steps</p>
                    <div class="flex items-center gap-2">
                      <p :key="`fs${attempt.steps_completed}`" class="step-anim-counter text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                        {{ Math.min(attempt.steps_completed, attempt.experiment.steps.length) }} of {{ attempt.experiment.steps.length }} done
                      </p>
                      <button @click="stepsPanelOpen = false" class="sm:hidden w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm leading-none" aria-label="Close steps">&times;</button>
                    </div>
                  </div>
                  <VirtualLabStepList
                    :steps="attempt.experiment.steps"
                    :current-step="attempt.current_step"
                    :all-done="allStepsDone"
                    :stagger="panelStagger"
                    :hint-levels="hintLevels"
                    :hint-level="hintLevel"
                    @acknowledge="acknowledgeSafety"
                    @hint="requestHint"
                    @reset="resetCurrentStep"
                  />
                </aside>
              </transition>
            </div>
          </div>
        </div>

        <!-- Plot your graph - when the teacher chose "students plot the graph", the student plots
             their own points here (typing or clicking on graph paper) while they work, and answers
             the questions about it right underneath. -->
        <div v-if="manualPlot && attempt.experiment.graph" id="plot-graph" class="mt-5 sm:mt-6 grid grid-cols-1 gap-4" :class="graphQuestions.length ? 'xl:grid-cols-3 items-start' : ''">
          <VirtualLabPlotter
            class="min-w-0 xl:col-span-2"
            :config="attempt.experiment.graph"
            :entries="plotEntries"
            :readings="measurementEntries"
            :read-only="attempt.status !== 'in_progress'"
            @add="addPlotPoint"
            @remove="removePlotPoint"
          />
          <div v-if="graphQuestions.length" class="min-w-0 xl:sticky xl:top-24 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5 space-y-3">
            <p class="text-sm font-bold text-gray-900 dark:text-white">Questions about your graph</p>
            <div v-for="q in graphQuestions" :key="q.id">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                <span class="inline-block px-1.5 py-0.5 mr-1.5 rounded text-[10px] font-bold uppercase tracking-wide bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 align-middle">Graph Analysis</span>
                {{ q.question_text }} <span class="text-xs font-normal text-gray-400">({{ q.marks }} marks)</span>
              </label>
              <textarea
                v-model="answers[q.id]"
                :disabled="attempt.status !== 'in_progress'"
                @blur="saveAnswer(q.id)"
                rows="2"
                class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- The teacher's canvas marking on this practical (ticks, crosses, comments...), shown on the
             same sheets they marked, once it has been graded. -->
        <div v-if="hasTeacherMarking" id="teacher-marking" class="mt-5 sm:mt-6 scroll-mt-24 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 sm:p-6">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2 mb-1"><AppIcon name="pencil" class="w-5 h-5" /> Your Teacher's Marking</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-5 text-center">Your work as your teacher marked it.</p>
          <div class="max-w-[800px] mx-auto">
            <VirtualLabMarking readonly :saved="attempt.marking_annotations" />
          </div>
        </div>

        <!-- Practical Notebook -->
        <div v-if="allStepsDone || attempt.status !== 'in_progress'" class="mt-5 sm:mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 sm:p-6">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-5"><AppIcon name="book" class="w-5 h-5" /> Practical Notebook</h2>

          <!-- Uses the full width: readings, results table and graph on the left; the written work
               (observations, questions, conclusion) and Submit on the right. Stacks on small screens. -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 items-start">
          <div class="space-y-5 min-w-0">

          <div v-if="measurementEntries.length > 0">
            <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Measurements</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="m in measurementEntries" :key="m.id" class="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">{{ m.label }}: {{ m.value }}{{ m.unit }}</span>
            </div>
          </div>

          <div v-if="lastVoltageReading !== null && lastCurrentReading !== null && attempt.status === 'in_progress'" class="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 flex items-center justify-between gap-2">
            <p class="text-xs text-indigo-800 dark:text-indigo-200">V={{ lastVoltageReading }}V, I={{ lastCurrentReading }}A &rarr; R = {{ computedResistance }}&Omega;</p>
            <button @click="addResultRow" class="flex-shrink-0 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Add to Results Table</button>
          </div>

          <div v-if="lastSpringMassG !== null && lastSpringLengthCm !== null && attempt.status === 'in_progress'" class="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 flex items-center justify-between gap-2">
            <p class="text-xs text-indigo-800 dark:text-indigo-200">{{ lastSpringMassG }}g &rarr; F={{ springForceN }}N, length={{ lastSpringLengthCm }}cm, extension={{ springExtensionCm }}cm</p>
            <button @click="addSpringResultRow" class="flex-shrink-0 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Add to Results Table</button>
          </div>

          <div v-if="lastBuretteInitialMl !== null && lastBuretteFinalMl !== null && attempt.status === 'in_progress'" class="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 space-y-1.5">
            <div class="flex items-center justify-between gap-2">
              <p class="text-xs text-indigo-800 dark:text-indigo-200">Initial={{ lastBuretteInitialMl }}ml, Final={{ lastBuretteFinalMl }}ml &rarr; Titre={{ titreMl }}ml</p>
              <button @click="addTitreResultRow" class="flex-shrink-0 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Add to Results Table</button>
            </div>
            <p v-if="concordantTitreHint" class="text-[11px] text-amber-700 dark:text-amber-400">{{ concordantTitreHint }}</p>
          </div>

          <div v-if="lastIncidenceAngle !== null && lastOutgoingAngle !== null && attempt.status === 'in_progress'" class="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 flex items-center justify-between gap-2">
            <p class="text-xs text-indigo-800 dark:text-indigo-200">Incidence={{ lastIncidenceAngle }}&deg;, {{ lastOutgoingLabel }}={{ lastOutgoingAngle }}&deg;</p>
            <button @click="addOpticsResultRow" class="flex-shrink-0 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Add to Results Table</button>
          </div>

          <div v-if="lastLaunchAngleDeg !== null && lastRangeM !== null && attempt.status === 'in_progress'" class="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 flex items-center justify-between gap-2">
            <p class="text-xs text-indigo-800 dark:text-indigo-200">Angle={{ lastLaunchAngleDeg }}&deg;, Range={{ lastRangeM }}m</p>
            <button @click="addProjectileResultRow" class="flex-shrink-0 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Add to Results Table</button>
          </div>

          <div v-if="resultRows.length > 0">
            <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Results Table</p>
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr class="bg-indigo-50 dark:bg-indigo-900/30 text-left text-gray-800 dark:text-gray-100">
                    <th v-for="col in resultTableColumns" :key="col" class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold capitalize">{{ col.replace(/_/g, ' ') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in resultRows" :key="row.id" class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900/40">
                    <td v-for="col in resultTableColumns" :key="col" class="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-800 dark:text-gray-100">{{ row.extra?.[col] ?? '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <template v-if="!manualPlot">
              <VirtualLabGraph ref="graphRef" :rows="resultRows" :config="attempt.experiment.graph" />

              <!-- Graph-analysis questions render right under the graph they're about, not mixed in
                   with the general question list below. -->
              <div v-for="q in graphQuestions" :key="q.id" class="mt-3">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  <span class="inline-block px-1.5 py-0.5 mr-1.5 rounded text-[10px] font-bold uppercase tracking-wide bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 align-middle">Graph Analysis</span>
                  {{ q.question_text }} <span class="text-xs font-normal text-gray-400">({{ q.marks }} marks)</span>
                </label>
                <textarea
                  v-model="answers[q.id]"
                  :disabled="attempt.status !== 'in_progress'"
                  @blur="saveAnswer(q.id)"
                  rows="2"
                  class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                ></textarea>
              </div>
            </template>
          </div>
          </div>

          <div class="space-y-5 min-w-0 lg:sticky lg:top-24 lg:border-l lg:border-gray-100 dark:lg:border-gray-700 lg:pl-8">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Observations</label>
            <textarea
              v-model="observationText"
              :disabled="attempt.status !== 'in_progress'"
              @blur="saveObservation"
              rows="3"
              class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              placeholder="What did you observe during the experiment?"
            ></textarea>
          </div>

          <div v-for="q in generalQuestions" :key="q.id">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              <span class="inline-block px-1.5 py-0.5 mr-1.5 rounded text-[10px] font-bold uppercase tracking-wide bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 align-middle">{{ QUESTION_TYPE_LABELS[q.question_type] }}</span>
              {{ q.question_text }} <span class="text-xs font-normal text-gray-400">({{ q.marks }} marks)</span>
            </label>
            <textarea
              v-model="answers[q.id]"
              :disabled="attempt.status !== 'in_progress'"
              @blur="saveAnswer(q.id)"
              rows="2"
              class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            ></textarea>
          </div>

          <div v-if="attempt.experiment.conclusion_prompt">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Conclusion</label>
            <p class="text-xs text-gray-400 dark:text-gray-500 mb-1.5">{{ attempt.experiment.conclusion_prompt }}</p>
            <textarea
              v-model="conclusionText"
              :disabled="attempt.status !== 'in_progress'"
              rows="3"
              class="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 dark:bg-gray-700 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            ></textarea>
          </div>

          <p v-if="isPractice" class="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-4 py-3 text-sm text-amber-800 dark:text-amber-200 text-center">
            Practice mode - teachers can't submit results. <button type="button" @click="restartPractice" class="font-semibold underline">Start again</button>
          </p>
          <template v-else-if="attempt.status === 'in_progress'">
            <p v-if="allStepsDone && graphBlocker" class="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-4 py-2.5 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
              <AppIcon name="chart" class="w-4 h-4 flex-shrink-0 mt-px" />
              <span>{{ graphBlocker }}</span>
            </p>
            <button
              :disabled="!allStepsDone || !!graphBlocker || submitting"
              @click="submitPractical"
              class="w-full px-4 py-3 text-sm font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md disabled:opacity-50 transition-all print-color-exact"
            >
              {{ submitting ? 'Submitting...' : !allStepsDone ? 'Complete all steps to submit' : graphBlocker ? 'Finish your graph to submit' : 'Submit Practical' }}
            </button>
          </template>
          </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { useToastStore } from '@/stores/toast'
import { ref, computed, watch, onMounted } from 'vue'
import { useFullscreenLab } from '@/components/virtuallab/lab3d/useFullscreenLab'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import VirtualLabScene from '@/components/virtuallab/VirtualLabScene.vue'
import VirtualLabGraph from '@/components/virtuallab/VirtualLabGraph.vue'
import VirtualLabStepList from '@/components/virtuallab/VirtualLabStepList.vue'
import VirtualLabPlotter from '@/components/virtuallab/VirtualLabPlotter.vue'
import VirtualLabMarking from '@/components/virtuallab/VirtualLabMarking.vue'
import { resolveGuidedExperiment } from '@/components/virtuallab/lab3d/registry'
import { CATEGORY_LABELS } from '@/types/virtualLab'
import type { AttemptState, LabObjectDef, ExperimentQuestion, NotebookEntry } from '@/types/virtualLab'

const QUESTION_TYPE_LABELS: Record<string, string> = {
  short_answer: 'Short answer', calculation: 'Calculation', observation: 'Observation', procedure: 'Procedure',
}

const route = useRoute()
const router = useRouter()

// Practice mode (teacher route, meta.practice): a teacher does the experiment exactly like a
// student - same lab, steps, notebook, graph and full screen. Each step is checked by the server the
// way a student's is, but nothing is saved: the attempt lives only in this page and can't be submitted.
const isPractice = computed(() => route.meta.practice === true)
const backLink = computed(() => (isPractice.value ? '/teacher/virtual-lab' : '/student/virtual-lab'))
let practiceNextId = -1
type NotebookBody = { entry_type: NotebookEntry['entry_type']; label: string; value: string; unit?: string | null; extra?: Record<string, any> | null }
const postNotebook = async (body: NotebookBody) => {
  if (!attempt.value) return
  if (isPractice.value) {
    attempt.value.notebook.push({ id: practiceNextId--, entry_type: body.entry_type, label: body.label, value: String(body.value), unit: body.unit ?? null, extra: body.extra ?? null, created_at: new Date().toISOString() })
    return
  }
  await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/notebook`, body)
}
const restartPractice = () => window.location.reload()

const attempt = ref<AttemptState | null>(null)
const objectCatalog = ref<LabObjectDef[]>([])
const loading = ref(true)
// Loosely typed on purpose - it can be the free-layout engine or any guided experiment, and the only
// method every renderer needs to expose is setObjectState (see registry.ts's Component contract).
const sceneRef = ref<{ setObjectState: (key: string, patch: Record<string, any>) => void } | null>(null)
const toastStore = useToastStore()
const graphRef = ref<{ xKey: string; yKey: string } | null>(null)
// Session-only ("optional" questions can be skipped, not answered - there's nothing to persist,
// they just shouldn't interrupt again after being dismissed once this page is open).
const skippedQuestionIds = ref(new Set<number>())
const hintLevel = ref(0)
const toast = ref<{ correct: boolean; text: string } | null>(null)
const observationText = ref('')
const answers = ref<Record<number, string>>({})
const conclusionText = ref('')
const submitting = ref(false)
const pendingNotebookEntry = ref<{ label: string; value: string; unit: string } | null>(null)
const lastVoltageReading = ref<number | null>(null)
const lastCurrentReading = ref<number | null>(null)
const lastSpringMassG = ref<number | null>(null)
const lastSpringLengthCm = ref<number | null>(null)
const lastSpringNaturalCm = ref<number>(15)
const lastBuretteInitialMl = ref<number | null>(null)
const lastBuretteFinalMl = ref<number | null>(null)
const lastIncidenceAngle = ref<number | null>(null)
const lastOutgoingAngle = ref<number | null>(null)
const lastOutgoingLabel = ref<'Angle of Reflection' | 'Angle of Refraction'>('Angle of Reflection')
// Pendulum trial: a measured length plus the time for its oscillations makes one Results Table row
const isPendulum = computed(() => attempt.value?.experiment.render_component === 'pendulum')
const lastPendulumLengthCm = ref<number | null>(null)
const lastPendulumTimeS = ref<number | null>(null)
const lastPendulumOscillations = ref(10)
const lastLaunchAngleDeg = ref<number | null>(null)
const lastRangeM = ref<number | null>(null)

const currentStep = computed(() => attempt.value?.experiment.steps.find(s => s.step_number === attempt.value!.current_step) || null)
/** True just after opening, so the step list builds up from Step 1 one step at a time. */
const revealStagger = ref(true)
/** Full screen side panel of steps (a slide-over drawer on phones). */
const stepsPanelOpen = ref(true)
/** Each time the panel opens its list builds up from Step 1, like the page does on load. */
const panelStagger = ref(false)
let panelStaggerTimer = 0
const allStepsDone = computed(() => !!attempt.value && attempt.value.steps_completed >= attempt.value.experiment.steps.length)

// notebook_only questions (the default, and every pre-existing question) always render passively at
// the end, exactly as before this feature - only required/optional staged questions interrupt.
const notebookQuestions = computed(() => attempt.value?.experiment.questions.filter(q => q.stage === 'after_experiment' || q.requirement === 'notebook_only') ?? [])
const graphQuestions = computed(() => notebookQuestions.value.filter(q => q.linked_to_graph))
const generalQuestions = computed(() => notebookQuestions.value.filter(q => !q.linked_to_graph))

/**
 * The one staged question (if any) currently blocking/prompting the step panel - before_experiment
 * questions take priority (checked first, eligible from the very start), then after_step/
 * after_measurement questions whose stage_step_number has already been reached, earliest first. A
 * question drops out once answered (answers[q.id] set) or skipped (optional only).
 */
const pendingInterstitialQuestion = computed<ExperimentQuestion | null>(() => {
  if (!attempt.value) return null
  const candidates = attempt.value.experiment.questions.filter(q =>
    q.stage !== 'after_experiment' && q.requirement !== 'notebook_only' &&
    !answers.value[q.id]?.trim() && !skippedQuestionIds.value.has(q.id)
  )
  const beforeExperiment = candidates.find(q => q.stage === 'before_experiment')
  if (beforeExperiment) return beforeExperiment

  const stepsCompleted = attempt.value.steps_completed
  const afterStep = candidates
    .filter(q => (q.stage === 'after_step' || q.stage === 'after_measurement') && (q.stage_step_number ?? 0) <= stepsCompleted)
    .sort((a, b) => (a.stage_step_number ?? 0) - (b.stage_step_number ?? 0))
  return afterStep[0] ?? null
})

// A required staged question genuinely blocks progress - freezing the scene (every 2D/3D renderer
// already respects read-only) is the only generic way to stop further correct actions across every
// experiment type without each renderer needing its own per-step lock concept.
const sceneReadOnly = computed(() => {
  if (!attempt.value || attempt.value.status !== 'in_progress') return true
  return pendingInterstitialQuestion.value?.requirement === 'required'
})

function skipInterstitial(id: number) {
  skippedQuestionIds.value.add(id)
}
async function continueFromInterstitial(q: ExperimentQuestion) {
  if (!answers.value[q.id]?.trim()) return
  await saveAnswer(q.id)
}
const progressPct = computed(() => {
  if (!attempt.value || attempt.value.experiment.steps.length === 0) return 0
  return Math.min(100, Math.round((attempt.value.steps_completed / attempt.value.experiment.steps.length) * 100))
})
const statusBadgeClass = computed(() => {
  const map: Record<string, string> = {
    in_progress: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200',
    submitted: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    graded: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
  }
  return map[attempt.value?.status || ''] || map.in_progress
})

// A hint field may be authored as several "||"-separated progressive levels (vaguest first) -
// falls back to a single level for a plain hint string.
const hintLevels = computed(() => {
  const hint = currentStep.value?.hint
  if (!hint) return []
  return hint.split('||').map(h => h.trim()).filter(Boolean)
})

const guidedExperiment = computed(() => {
  if (!attempt.value || attempt.value.experiment.render_mode !== '2d') return null
  return resolveGuidedExperiment(attempt.value.experiment.render_component)
})

const apparatusList = computed(() => {
  if (!attempt.value) return []
  const catalog = new Map(objectCatalog.value.map(o => [o.object_type, o]))
  return attempt.value.experiment.scene_objects.map(o => ({
    key: o.key,
    name: catalog.get(o.object_type)?.display_name ?? o.object_type,
    icon: catalog.get(o.object_type)?.icon ?? '🔬',
  }))
})

// Beginner difficulty highlights the apparatus the current step actually needs - intermediate/
// advanced leave the student to work that out from the instruction alone.
const isHighlightedApparatus = (key: string) => {
  if (!attempt.value || attempt.value.experiment.difficulty !== 'beginner') return false
  return currentStep.value?.target_object_key === key
}

const measurementEntries = computed(() => attempt.value?.notebook.filter(n => n.entry_type === 'measurement') ?? [])
const hasTeacherMarking = computed(() => !!attempt.value && attempt.value.status !== 'in_progress' && (attempt.value.marking_annotations || []).some(m => (m.annotation?.objects?.length || 0) > 0))
const resultRows = computed(() => attempt.value?.notebook.filter(n => n.entry_type === 'result_row') ?? [])
const resultTableColumns = computed(() => {
  const first = resultRows.value[0]
  return first?.extra ? Object.keys(first.extra) : []
})
const computedResistance = computed(() => {
  if (lastVoltageReading.value === null || lastCurrentReading.value === null || lastCurrentReading.value === 0) return 0
  return Math.round((lastVoltageReading.value / lastCurrentReading.value) * 100) / 100
})
const springForceN = computed(() => lastSpringMassG.value === null ? 0 : Math.round((lastSpringMassG.value / 1000) * 9.8 * 100) / 100)
const springExtensionCm = computed(() => lastSpringLengthCm.value === null ? 0 : Math.round((lastSpringLengthCm.value - lastSpringNaturalCm.value) * 100) / 100)
const titreMl = computed(() => (lastBuretteInitialMl.value === null || lastBuretteFinalMl.value === null) ? 0 : Math.round((lastBuretteFinalMl.value - lastBuretteInitialMl.value) * 100) / 100)

watch(() => attempt.value?.current_step, () => {
  // Beginner: the first hint level shows automatically, no need to ask. Intermediate/advanced
  // still need a click - the underlying grading/tolerance is identical at every difficulty,
  // this only changes how much guidance is surfaced.
  hintLevel.value = attempt.value?.experiment.difficulty === 'beginner' ? Math.min(1, hintLevels.value.length) : 0
})

const loadObjects = async () => {
  const res = await axios.get(isPractice.value ? '/api/teacher/virtual-lab/objects' : '/api/student/virtual-lab/objects')
  objectCatalog.value = res.data.data.objects
}

const startAttempt = async () => {
  if (isPractice.value) {
    const res = await axios.get(`/api/teacher/virtual-lab/experiments/${route.params.experimentId}`)
    const experiment = res.data.data
    attempt.value = {
      attempt_id: 0, assignment_id: 0, status: 'in_progress', current_step: 1, steps_completed: 0,
      correct_actions: 0, wrong_actions: 0, hints_used: 0, safety_mistakes: 0,
      conclusion_text: null, score: null, teacher_feedback: null, due_date: null, marks: Number(experiment.marks) || 0,
      experiment, observations: {}, answers: {}, notebook: [], marking_annotations: [],
    }
  } else {
    const assignmentId = route.params.assignmentId
    const res = await axios.post(`/api/student/virtual-lab/assignments/${assignmentId}/start`)
    attempt.value = res.data.data
  }
  // Opening cascade (Step 1 downwards) only - later steps drop in one at a time as they're reached
  const stepsShown = Math.min(attempt.value!.current_step, attempt.value!.experiment.steps.length)
  setTimeout(() => { revealStagger.value = false }, stepsShown * 140 + 900)
  observationText.value = attempt.value!.observations['general'] || ''
  answers.value = { ...attempt.value!.answers }
  conclusionText.value = attempt.value!.conclusion_text || ''
}

const refreshAttempt = async () => {
  if (!attempt.value || isPractice.value) return // practice state is updated in place
  const res = await axios.get(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}`)
  attempt.value = res.data.data
}

const onSceneAction = async (payload: { objectKey: string | null; action: string; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null; springLoadG?: number; oscillations?: number }) => {
  if (!attempt.value) return

  if ((payload.action === 'switch_on' || payload.action === 'switch_off') && payload.objectKey) {
    sceneRef.value?.setObjectState(payload.objectKey, { state: payload.action === 'switch_on' ? 'on' : 'off' })
  }
  if (payload.action === 'heat' && payload.value) {
    sceneRef.value?.setObjectState(payload.objectKey!, { flame: 'on' })
  }
  if (payload.action === 'measure' && payload.value !== null) {
    const num = parseFloat(payload.value)
    if (payload.unit === 'V') lastVoltageReading.value = num
    if (payload.unit === 'A') lastCurrentReading.value = num
    if (payload.unit === 'cm' && payload.targetObjectKey) {
      const targetCfg = attempt.value.experiment.scene_objects.find(o => o.key === payload.targetObjectKey)
      if (targetCfg?.object_type === 'spring') {
        const catalogDef = objectCatalog.value.find(o => o.object_type === 'spring')
        lastSpringNaturalCm.value = Number(targetCfg.props?.natural_length_cm ?? catalogDef?.default_props?.natural_length_cm ?? 15)
        lastSpringLengthCm.value = num
      }
    }
    if (payload.label === 'Initial Burette Reading') {
      lastBuretteInitialMl.value = num
      lastBuretteFinalMl.value = null // a fresh initial reading starts a new trial
    } else if (payload.label === 'Final Burette Reading') {
      lastBuretteFinalMl.value = num
    }
    if (payload.unit === '°' && payload.label === 'Angle of Incidence') {
      lastIncidenceAngle.value = num
      lastOutgoingAngle.value = null // a fresh incidence reading starts a new trial
    } else if (payload.unit === '°' && (payload.label === 'Angle of Reflection' || payload.label === 'Angle of Refraction')) {
      lastOutgoingAngle.value = num
      lastOutgoingLabel.value = payload.label
    }
    if (payload.unit === 'm' && payload.label === 'Range') {
      lastRangeM.value = num
    }
    if (isPendulum.value && payload.unit === 'cm' && payload.label === 'Ruler') {
      lastPendulumLengthCm.value = num
    }
    if (isPendulum.value && payload.unit === 's' && payload.label === 'Stopwatch') {
      // The steps time 10 full oscillations; the lab sends its own count when it has one
      lastPendulumOscillations.value = payload.oscillations && payload.oscillations > 0 ? payload.oscillations : 10
      lastPendulumTimeS.value = num
    }
    pendingNotebookEntry.value = { label: payload.label || 'Reading', value: payload.value, unit: payload.unit || '' }
  }
  if (payload.action === 'move' && payload.springLoadG !== undefined) {
    lastSpringMassG.value = payload.springLoadG
  }
  if (payload.action === 'rotate' && payload.label === 'Launch Angle' && payload.value !== null) {
    lastLaunchAngleDeg.value = Number(payload.value)
    lastRangeM.value = null // a fresh angle starts a new trial
  }
  if (payload.action === 'inspect' && payload.value && payload.objectKey) {
    // Microscope observation - the emitted value is the real focus-quality string, worth
    // offering to the notebook exactly like a measurement. A renderer-supplied label (e.g.
    // "Observation at x400 (focused)") is richer than the generic fallback used elsewhere.
    pendingNotebookEntry.value = { label: payload.label || 'Observation', value: payload.value.replace('_', ' '), unit: '' }
  }
  if (payload.action === 'select_objective' && payload.value) {
    pendingNotebookEntry.value = { label: 'Magnification', value: payload.value, unit: 'x' }
  }
  if (payload.safetyIssue) {
    try {
      if (!isPractice.value) await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/safety-mistake`)
      attempt.value.safety_mistakes++
    } catch (err) {
      // non-fatal - the warning was already shown by the 3D engine either way
    }
  }

  try {
    const res = isPractice.value
      ? await axios.post(`/api/teacher/virtual-lab/experiments/${route.params.experimentId}/practice/action`, {
          step_number: attempt.value.current_step,
          object_key: payload.objectKey,
          action: payload.action,
          value: payload.value,
        })
      : await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/action`, {
          step_id: currentStep.value?.id ?? null,
          object_key: payload.objectKey,
          action: payload.action,
          value: payload.value,
        })
    if (isPractice.value) {
      // the same bookkeeping the server does for a real attempt, kept in the page
      const r = res.data.data
      const a = attempt.value
      if (r.advanced && a.steps_completed < a.experiment.steps.length) {
        a.steps_completed++
        a.correct_actions++
        a.current_step = r.next_step
      } else if (!r.neutral && !r.is_correct) {
        a.wrong_actions++
        if (r.is_safety_check) a.safety_mistakes++
      }
    }
    // Free-look actions (inspect/zoom on something other than the current step's target) aren't
    // a wrong attempt at the step - they don't need a "not quite" warning, since the student
    // wasn't trying to complete the step at all.
    if (!res.data.data.neutral) {
      toast.value = { correct: res.data.data.is_correct, text: res.data.data.feedback || (res.data.data.is_correct ? 'Correct!' : 'Not quite - try again.') }
      setTimeout(() => { toast.value = null }, 4000)
    }
    await refreshAttempt()
  } catch (err) {
    // non-fatal - student can retry the action
  }
}

const acknowledgeSafety = () => onSceneAction({ objectKey: null, action: 'acknowledge', value: null })

const requestHint = async () => {
  if (!attempt.value || hintLevel.value >= hintLevels.value.length) return
  hintLevel.value++
  try {
    if (!isPractice.value) await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/hint`)
    attempt.value.hints_used++
  } catch (err) {
    // non-fatal - the hint is already shown locally either way
  }
}

const resetCurrentStep = () => {
  hintLevel.value = 0
  toast.value = null
}

const dismissPendingNotebook = () => { pendingNotebookEntry.value = null }

// --- Student-plotted graph (manual_plot experiments) ---------------------------------------------
const manualPlot = computed(() => !!attempt.value?.experiment.graph?.enabled && !!attempt.value.experiment.graph.manual_plot)

// A switched-on graph must have its minimum number of points and every graph question (e.g. the
// gradient) answered before the practical can be submitted - the server checks the same thing.
const graphBlocker = computed<string | null>(() => {
  const g = attempt.value?.experiment.graph
  if (!g?.enabled) return null
  const points = manualPlot.value
    ? plotEntries.value.length
    : resultRows.value.filter(r => r.extra && g.x_column && g.y_column && r.extra[g.x_column] != null && r.extra[g.y_column] != null).length
  const min = Math.max(1, g.min_points || 1)
  if (points < min) return `Plot at least ${min} points on your graph (${points} so far).`
  if (graphQuestions.value.some(q => !(answers.value[q.id] || '').trim())) return 'Answer the questions about your graph, such as the gradient.'
  return null
})
const plotEntries = computed(() => attempt.value?.notebook.filter(n => n.entry_type === 'plot_point') ?? [])

const addPlotPoint = async (p: { x: number; y: number }) => {
  if (!attempt.value || attempt.value.status !== 'in_progress') return
  try {
    await postNotebook({
      entry_type: 'plot_point', label: 'Plotted point', value: `${p.x}, ${p.y}`, extra: { x: p.x, y: p.y },
    })
    await refreshAttempt()
  } catch {
    toast.value = { correct: false, text: 'That point could not be saved. Please try again.' }
  }
}

const removePlotPoint = async (id: number) => {
  if (!attempt.value || attempt.value.status !== 'in_progress') return
  if (isPractice.value) {
    attempt.value.notebook = attempt.value.notebook.filter(n => n.id !== id)
    return
  }
  await axios.delete(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/notebook/${id}`)
  await refreshAttempt()
}

const addPendingToNotebook = async () => {
  if (!attempt.value || !pendingNotebookEntry.value) return
  const entry = pendingNotebookEntry.value
  await postNotebook({
    entry_type: 'measurement', label: entry.label, value: entry.value, unit: entry.unit || null,
  })
  pendingNotebookEntry.value = null
  await refreshAttempt()
}

const addResultRow = async () => {
  if (!attempt.value || lastVoltageReading.value === null || lastCurrentReading.value === null) return
  const v = lastVoltageReading.value
  const i = lastCurrentReading.value
  const r = computedResistance.value
  await postNotebook({
    entry_type: 'result_row', label: `V=${v}V`, value: String(r), unit: 'ohm',
    extra: { voltage: v, current: i, resistance: r },
  })
  lastVoltageReading.value = null
  lastCurrentReading.value = null
  await refreshAttempt()
}

const addSpringResultRow = async () => {
  if (!attempt.value || lastSpringMassG.value === null || lastSpringLengthCm.value === null) return
  const mass = lastSpringMassG.value
  const force = springForceN.value
  const length = lastSpringLengthCm.value
  const extension = springExtensionCm.value
  await postNotebook({
    entry_type: 'result_row', label: `${mass}g`, value: String(extension), unit: 'cm',
    extra: { mass_g: mass, force_n: force, length_cm: length, extension_cm: extension },
  })
  lastSpringMassG.value = null
  lastSpringLengthCm.value = null
  await refreshAttempt()
}

const titrationTrials = computed(() => resultRows.value.filter(r => r.extra && 'titre_ml' in r.extra))
// Configurable per experiment rather than hard-coded globally - reads from the burette's own
// props (mirrors how spring/optics tolerances already live on their own objects), falling back to
// a sensible default if the template doesn't set one.
const concordanceToleranceMl = computed(() => {
  const burette = attempt.value?.experiment.scene_objects.find(o => o.object_type === 'burette')
  return Number(burette?.props?.concordance_tolerance_ml ?? 0.2)
})
const concordantTitreHint = computed(() => {
  const trials = titrationTrials.value.map(r => Number(r.extra?.titre_ml)).filter(v => !Number.isNaN(v))
  if (trials.length < 2) return null
  const last = trials[trials.length - 1]
  const prior = trials[trials.length - 2]
  const diff = Math.round(Math.abs(last - prior) * 100) / 100
  return diff <= concordanceToleranceMl.value
    ? `Concordant with your previous titre (within ${concordanceToleranceMl.value}ml).`
    : `Not concordant with your previous titre (differs by ${diff}ml) - consider repeating for a closer result.`
})

const addTitreResultRow = async () => {
  if (!attempt.value || lastBuretteInitialMl.value === null || lastBuretteFinalMl.value === null) return
  const trialNumber = titrationTrials.value.length + 1
  const initial = lastBuretteInitialMl.value
  const final = lastBuretteFinalMl.value
  const titre = titreMl.value
  await postNotebook({
    entry_type: 'result_row', label: `Trial ${trialNumber}`, value: String(titre), unit: 'ml',
    extra: { trial: trialNumber, initial_reading_ml: initial, final_reading_ml: final, titre_ml: titre },
  })
  lastBuretteInitialMl.value = null
  lastBuretteFinalMl.value = null
  await refreshAttempt()
}

const sin3 = (deg: number) => Math.round(Math.sin((deg * Math.PI) / 180) * 1000) / 1000

const opticsTrials = computed(() => resultRows.value.filter(r => r.extra && 'incidence_deg' in r.extra))

const addOpticsResultRow = async () => {
  if (!attempt.value || lastIncidenceAngle.value === null || lastOutgoingAngle.value === null) return
  const trialNumber = opticsTrials.value.length + 1
  const incidence = lastIncidenceAngle.value
  const outgoing = lastOutgoingAngle.value
  const outgoingKey = lastOutgoingLabel.value === 'Angle of Refraction' ? 'refraction_deg' : 'reflection_deg'
  await postNotebook({
    entry_type: 'result_row', label: `Trial ${trialNumber}`, value: String(outgoing), unit: '°',
    extra: {
      trial: trialNumber, incidence_deg: incidence, [outgoingKey]: outgoing,
      ...(outgoingKey === 'refraction_deg' ? { sin_incidence: sin3(incidence), sin_refraction: sin3(outgoing) } : {}),
    },
  })
  lastIncidenceAngle.value = null
  lastOutgoingAngle.value = null
  await refreshAttempt()
}

// Each projectile trial (angle + measured range) is recorded as soon as the range is measured, so the
// results table - and the graph built from it - fills up as the student works through the steps.
// (Waiting for a manual "Add to Results Table" click only surfaced after the last step, and only for
// the final trial, which left the graph one point short of its minimum.)
let projectileRowSaving = false
watch([lastLaunchAngleDeg, lastRangeM], async ([angle, range]) => {
  if (projectileRowSaving || angle === null || range === null || attempt.value?.status !== 'in_progress') return
  projectileRowSaving = true
  try { await addProjectileResultRow() } finally { projectileRowSaving = false }
})

// Each pendulum trial (length + time) goes straight into the Results Table with its period T and T^2,
// so the graph of T^2 against L builds up as the student works - T^2 against L is a straight line
// whose gradient is 4*pi^2/g.
let pendulumRowSaving = false
watch([lastPendulumLengthCm, lastPendulumTimeS], async ([lengthCm, timeS]) => {
  if (pendulumRowSaving || lengthCm === null || timeS === null || !attempt.value || attempt.value.status !== 'in_progress') return
  pendulumRowSaving = true
  try {
    const n = lastPendulumOscillations.value
    const L = Math.round((lengthCm / 100) * 1000) / 1000
    const T = Math.round((timeS / n) * 1000) / 1000
    await postNotebook({
      entry_type: 'result_row', label: `L = ${L} m`, value: String(T), unit: 's',
      extra: { length_m: L, oscillations: n, time_s: timeS, period_s: T, period_squared_s2: Math.round(T * T * 1000) / 1000 },
    })
    lastPendulumTimeS.value = null
    lastPendulumLengthCm.value = null
    await refreshAttempt()
  } finally {
    pendulumRowSaving = false
  }
})

const addProjectileResultRow = async () => {
  if (!attempt.value || lastLaunchAngleDeg.value === null || lastRangeM.value === null) return
  const angle = lastLaunchAngleDeg.value
  const range = lastRangeM.value
  await postNotebook({
    entry_type: 'result_row', label: `${angle}°`, value: String(range), unit: 'm',
    extra: { angle_deg: angle, range_m: range },
  })
  lastLaunchAngleDeg.value = null
  lastRangeM.value = null
  await refreshAttempt()
}

const saveObservation = async () => {
  if (!attempt.value || isPractice.value) return
  await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/observation`, { step_id: null, text: observationText.value })
}

const saveAnswer = async (questionId: number) => {
  if (!attempt.value || isPractice.value) return
  await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/answer`, { question_id: questionId, text: answers.value[questionId] || '' })
}

const submitPractical = async () => {
  if (!attempt.value || isPractice.value) return // teachers practise; they never submit
  submitting.value = true
  try {
    // Answers normally save on blur - make sure the graph answers are stored before the server checks them
    await Promise.all(graphQuestions.value.map(q => saveAnswer(q.id)))
    await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/submit`, {
      conclusion: conclusionText.value,
      graph_x_key: graphRef.value?.xKey || null,
      graph_y_key: graphRef.value?.yKey || null,
    })
    await refreshAttempt()
  } catch (err: any) {
    toastStore.error(err.response?.data?.message || 'Could not submit your practical')
  } finally {
    submitting.value = false
  }
}

const { labMaximized, enterMaximize, exitMaximize } = useFullscreenLab()

// Entering full screen: steps panel open beside the lab on tablets/computers, closed on phones
// (where it would cover the lab) until the student taps "Steps".
watch(labMaximized, (on) => { if (on) stepsPanelOpen.value = window.innerWidth >= 640 })
watch(() => labMaximized.value && stepsPanelOpen.value, (open) => {
  window.clearTimeout(panelStaggerTimer)
  if (!open || !attempt.value) return
  panelStagger.value = true
  const shown = Math.min(attempt.value.current_step, attempt.value.experiment.steps.length)
  panelStaggerTimer = window.setTimeout(() => { panelStagger.value = false }, shown * 140 + 900)
})

onMounted(async () => {
  try {
    await Promise.all([loadObjects(), startAttempt()])
  } catch (err) {
    router.push(backLink.value)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@keyframes step-rise-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
.step-anim-counter { animation: step-rise-in 0.3s ease-out both; }
.step-anim-bar { animation: step-rise-in 0.4s ease-out both; }

@media (prefers-reduced-motion: reduce) {
  .step-anim-counter, .step-anim-bar { animation: none; }
}
</style>
