<template>
  <div class="p-3 sm:p-6">
    <!-- Completion screen: shown in place of the redirect that used to happen silently after
         submitting. The destination depends on how the student got here - see submitAssignment(). -->
    <div v-if="showCompletionScreen" class="flex items-center justify-center py-16 px-4">
      <div class="max-w-md w-full text-center">
        <div class="mx-auto mb-4 w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
          <svg class="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {{ completionOrigin === 'enote' ? 'Learning Outcome Complete!' : 'Assignment Submitted' }}
        </h1>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
          You've completed "{{ assignment?.title }}"{{ completionTimingLabel }}.
          <template v-if="submittedOffline"><br>It's saved on this device and will be sent to your teacher as soon as you're online.</template>
        </p>
        <button
          v-if="completionOrigin === 'enote' && completionNextPageId"
          @click="continueToNextPage"
          class="w-full py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
        >
          Continue to Next Page
        </button>
        <button
          v-else-if="completionOrigin === 'enote'"
          @click="backToEnotes"
          class="w-full py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
        >
          Back to eNotes
        </button>
        <button
          v-else
          @click="router.push('/student/assignments')"
          class="w-full py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
        >
          Back to Assessments
        </button>
      </div>
    </div>

    <div v-else-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-800 dark:text-red-200 break-words">{{ error }}</p>
      </div>
    </div>

    <div v-else-if="assignment">
      <!-- Back link + question progress -->
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <router-link
          to="/student/assignments"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Assignments
        </router-link>
        <div class="flex flex-wrap items-center justify-end gap-3 ml-auto">
          <!-- Answering: the clock, and whether it is saved (the bottom bar says so when there is one) -->
          <template v-if="opened">
            <div v-if="stepMode && !isLocked && !isPreview && saveState.short" class="flex items-center gap-1.5 text-sm font-medium" :class="saveState.tone">
              <span class="w-2 h-2 rounded-full flex-shrink-0" :class="saveState.dot"></span>{{ saveState.short }}
            </div>
            <div v-if="timeUp" class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <span class="text-sm font-semibold text-red-700 dark:text-red-300">{{ isLocked ? 'Time is up - your answers were handed in' : 'Time is up - handing in your answers…' }}</span>
            </div>
            <div v-else-if="timeRemaining > 0" class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
              <svg class="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span class="text-xs text-amber-700 dark:text-amber-400">Time left</span>
              <span class="text-sm font-bold tabular-nums text-amber-700 dark:text-amber-400">{{ formatTime(timeRemaining) }}</span>
            </div>
          </template>
          <QuestionProgress
            v-if="opened"
            :total="totalCount"
            :current="currentQuestionIndex"
            :answered="answeredFlags"
            @select="goToQuestion"
          />
          <!-- Answering offline: keep it on this device -->
          <div v-if="!isPreview && !isLocked && offline.online && savedOffline?.state !== 'failed' && !loadedOffline" class="flex flex-wrap items-center gap-2 text-xs">
            <template v-if="savedOffline">
              <span class="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-300">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                Saved to answer offline
              </span>
              <button type="button" class="text-gray-500 hover:text-red-600 dark:text-gray-400" @click="toggleOffline">Remove</button>
            </template>
            <button v-else-if="!offlineBlockReason" type="button" :disabled="savingOffline" class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-200 disabled:opacity-50" @click="toggleOffline">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              {{ savingOffline ? 'Saving…' : 'Save to answer offline' }}
            </button>
            <span v-else class="text-gray-400 dark:text-gray-500">{{ offlineBlockReason }} - can't be answered offline</span>
          </div>
        </div>
      </div>

      <!-- Notices: preview, handed in, answering offline -->
      <div class="mb-2">
        <!-- Preview banner: staff viewing exactly what a student sees -->
        <div v-if="isPreview" class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4 flex items-start gap-3">
          <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          <p class="text-indigo-800 dark:text-indigo-200 text-sm">
            This is exactly what a student sees when taking this assignment. It's read-only - nothing you do here is saved or submitted.
          </p>
        </div>

        <!-- Submitted on this device, waiting to be sent -->
        <div v-else-if="savedOffline?.state === 'submitted'" class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
          <p class="text-amber-900 dark:text-amber-100 text-sm"><span class="font-semibold">Submitted on this device.</span> It will be sent to your teacher as soon as you're online.</p>
        </div>

        <!-- The deadline has passed and it was never handed in -->
        <div v-else-if="neverHandedIn" class="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-lg p-4 mb-4">
          <p class="text-rose-800 dark:text-rose-200 text-sm font-medium">The deadline has passed, so this can no longer be handed in. If you need more time, speak to your teacher.</p>
        </div>

        <!-- Locked banner: attempt already submitted -->
        <div v-else-if="isLocked" class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
          <p class="text-indigo-800 dark:text-indigo-200 text-sm">
            You have already submitted this assignment. Your work is shown below in read-only mode.
            <span v-if="submissionStatus === 'returned' || submissionStatus === 'graded'">It has been marked by your teacher.</span>
          </p>
        </div>

        <!-- Answering without internet: saved on this device, or refused when it was sent -->
        <div v-if="!isPreview && savedOffline?.state === 'failed'" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p class="text-red-800 dark:text-red-200 text-sm"><span class="font-semibold">Your answers couldn't be sent:</span> {{ savedOffline.message }} They're still kept on this device - please tell your teacher.</p>
        </div>
        <div v-else-if="!isPreview && !isLocked && loadedOffline" class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
          <p class="text-amber-900 dark:text-amber-100 text-sm">
            <span class="font-semibold">You're answering offline.</span> Your answers are kept on this device and sent when you're back online.
            <template v-if="savedOffline?.uploads"> Answers with photos or drawings need a connection.</template>
          </p>
        </div>

      </div>

      <!-- Before it is opened: one card with everything about the assessment, and Open
           (the same look as the cards on the assessments list) -->
      <section v-if="!opened" class="mb-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700 shadow-sm overflow-hidden">
        <!-- The title on the left, the kind (LOA / AOI / EOC) in the middle, subject and teacher on the right -->
        <header class="relative flex flex-wrap sm:flex-nowrap items-center gap-x-4 gap-y-2 px-4 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r to-white dark:to-gray-800" :class="introLook.band">
          <span class="absolute inset-y-0 left-0 w-1" :class="introLook.solid"></span>
          <div class="w-full sm:w-auto sm:flex-1 sm:basis-0 min-w-0 flex items-center gap-3">
            <span class="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center text-white shadow-md" :class="[introLook.solid, introLook.glow]">
              <AppIcon :name="introLook.icon" class="w-5 h-5" />
            </span>
            <h1 class="min-w-0 text-base sm:text-lg font-bold leading-snug text-indigo-800 dark:text-indigo-300 break-words">{{ assignment.title }}</h1>
          </div>
          <div v-if="curriculum || isPreview" class="flex-shrink-0 flex items-center gap-1.5 pl-[3.25rem] sm:pl-0">
            <span v-if="curriculum" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 dark:bg-gray-900/50 ring-1 ring-black/5 dark:ring-white/10 text-[11px] font-bold" :class="introLook.text">
              {{ curriculum.category }}<span class="font-medium text-gray-500 dark:text-gray-400">· {{ ASSESSMENT_CATEGORY_LABELS[curriculum.category] }}</span>
            </span>
            <span v-if="isPreview" class="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-[10px] font-bold text-amber-800 dark:text-amber-200">Preview</span>
          </div>
          <p class="sm:flex-1 sm:basis-0 min-w-0 ml-auto text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-right break-words">
            <span class="font-semibold text-gray-700 dark:text-gray-200">{{ assignment.subject_name }}</span><template v-if="assignment.teacher_name"> · By {{ assignment.teacher_name }}</template>
          </p>
        </header>

        <div class="px-4 sm:px-6 py-5 space-y-5">
          <!-- The numbers -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            <div v-for="t in introTiles" :key="t.label" class="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 dark:bg-gray-900/40 ring-1 ring-gray-100 dark:ring-gray-700/60 min-w-0">
              <span class="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center" :class="introLook.soft">
                <AppIcon :name="t.icon" class="w-4 h-4" />
              </span>
              <div class="min-w-0">
                <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{{ t.label }}</p>
                <p class="text-sm font-bold text-gray-900 dark:text-white leading-snug break-words">{{ t.value }}</p>
              </div>
            </div>
          </div>

          <!-- What it assesses -->
          <div v-if="curriculum && (curriculum.topic || curriculum.topics?.length)" class="rounded-xl border border-gray-200/80 dark:border-gray-700 overflow-hidden">
            <template v-if="curriculum.category === 'LOA' && curriculum.topic">
              <div class="flex items-center gap-2.5 px-4 py-3 bg-gray-50/80 dark:bg-gray-900/40">
                <AppIcon name="book" class="w-4 h-4 flex-shrink-0" :class="introLook.text" />
                <p class="min-w-0 text-sm"><span class="text-gray-500 dark:text-gray-400">Topic:</span> <span class="font-semibold text-gray-900 dark:text-white">{{ curriculum.topic.topic }}</span></p>
              </div>
              <div v-if="curriculum.learning_outcomes?.length" class="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Learning outcomes being assessed</p>
                <ul class="space-y-2">
                  <li v-for="lo in curriculum.learning_outcomes" :key="lo.id" class="flex gap-2.5 text-sm text-gray-700 dark:text-gray-200">
                    <span class="mt-px w-5 h-5 flex-shrink-0 rounded-md flex items-center justify-center text-[10px] font-bold" :class="introLook.soft">{{ lo.order_number || '•' }}</span>
                    <span class="min-w-0">{{ lo.learning_outcome }}</span>
                  </li>
                </ul>
              </div>
            </template>
            <div v-else class="px-4 py-3">
              <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">{{ curriculum.category === 'EOC' ? 'Topics covered' : 'Activity focus' }}</p>
              <ul class="space-y-1.5">
                <li v-for="topic in curriculum.topics" :key="topic.id" class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                  <span class="w-1.5 h-1.5 flex-shrink-0 rounded-full" :class="introLook.solid"></span>{{ topic.topic }}
                </li>
              </ul>
            </div>
          </div>

          <div v-if="assignment.instructions || supportFiles.length" class="space-y-4">
            <div v-if="assignment.instructions" class="overflow-x-auto">
              <h3 class="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Instructions
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm break-words [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full" v-html="safeHtml(assignment.instructions)"></p>
            </div>

            <!-- Files the teacher attached to work with (ICT: starter files, a zip of resources...) -->
            <div v-if="supportFiles.length" class="">
              <h3 class="font-medium text-gray-900 dark:text-white mb-2">Support files <span class="text-xs font-normal text-gray-500 dark:text-gray-400">- download, then work on them</span></h3>
              <ul class="grid sm:grid-cols-2 gap-2">
                <li v-for="f in supportFiles" :key="f.id">
                  <a :href="resolveAssetUrl(f.file_path)" :download="f.original_name" class="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <span class="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">{{ (f.original_name.split('.').pop() || '').slice(0, 5) }}</span>
                    <span class="flex-1 min-w-0 truncate text-sm text-gray-800 dark:text-gray-100">{{ f.original_name }}</span>
                    <span class="text-xs font-semibold text-indigo-700 dark:text-indigo-300">Download</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Open -->
        <footer class="flex flex-col sm:flex-row sm:items-center gap-3 px-4 sm:px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-900/30">
          <p class="flex-1 flex items-start gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <AppIcon :name="isLocked ? 'check-circle' : assignment.duration_minutes ? 'clock' : 'check'" class="w-4 h-4 mt-0.5 flex-shrink-0" :class="assignment.duration_minutes && !isLocked ? 'text-amber-500' : 'text-emerald-500'" />
            <span>
              <template v-if="isLocked">You have handed this in. Open it to see your answers.</template>
              <template v-else-if="assignment.duration_minutes">You have {{ assignment.duration_minutes }} minutes. The clock starts when you open it, and your answers are handed in by themselves when the time is over.</template>
              <template v-else>Your answers save by themselves as you go.</template>
            </span>
          </p>
          <button type="button" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/30 transition-colors" @click="openAssessment">
            {{ isLocked ? 'View my answers' : answeredCount > 0 ? 'Continue assessment' : 'Open assessment' }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </footer>
      </section>

      <!-- All questions, one page - no Prev/Next paging (a "Next" click was confusing students
           into thinking each question was a separate step/page). -->
      <div v-if="opened" class="space-y-6 sm:space-y-8">
        <div
          v-for="(entry, entryIndex) in displayQuestions"
          v-show="!stepMode || entryIndex === step"
          :key="entry.question.id"
          :id="`question-${entry.question.id}`"
          class="space-y-3 scroll-mt-24"
        >

          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm ring-1 ring-gray-200/80 dark:ring-gray-700 overflow-hidden">
            <!-- one at a time: how far through -->
            <div v-if="stepMode" class="h-1 bg-gray-100 dark:bg-gray-700" aria-hidden="true">
              <div class="h-full bg-emerald-500 transition-all duration-500" :style="{ width: `${((entryIndex + 1) / totalCount) * 100}%` }"></div>
            </div>
            <div class="p-4 sm:p-6">
            <div class="flex items-center gap-3 mb-4">
              <span class="w-9 h-9 flex-shrink-0 rounded-xl bg-emerald-600 text-white text-sm font-bold flex items-center justify-center shadow-sm shadow-emerald-600/30">{{ entryIndex + 1 }}</span>
              <p class="flex-1 min-w-0 text-sm font-semibold text-gray-500 dark:text-gray-400">Question {{ entryIndex + 1 }} <span class="font-normal">of {{ totalCount }}</span></p>
              <span class="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800">{{ fmtMarks(entry.question.marks) }} {{ Number(entry.question.marks) === 1 ? 'mark' : 'marks' }}</span>
              <span v-if="isLocked" class="shrink-0 px-2.5 py-1 rounded-full text-xs font-medium border" :class="questionStatusBadgeClass">{{ questionStatusLabel }}</span>
            </div>
            <!-- Scenario Question -->
            <div v-if="entry.question.question_type === 'scenario'">
              <div class="mb-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <AppIcon name="book" class="w-4 h-4" /> Scenario
                </h3>
                <div v-if="entry.question.scenario_text" class="bg-indigo-50/50 dark:bg-indigo-900/10 border-l-4 border-indigo-300 dark:border-indigo-700 p-3 sm:p-4 rounded-lg mb-4 overflow-x-auto">
                  <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line break-words [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full" v-html="safeHtml(entry.question.scenario_text)"></p>
                </div>
              </div>

              <!-- Sub-questions -->
              <div v-if="(entry.question as any).sub_questions && (entry.question as any).sub_questions.length > 0" class="space-y-4">
                <div
                  v-for="(subQ, subIndex) in (entry.question as any).sub_questions"
                  :key="subQ.id"
                  class="border-l-4 border-indigo-500 pl-4"
                >
                  <div class="flex items-start space-x-3 mb-3">
                    <span class="font-medium text-gray-900 dark:text-white">{{ String.fromCharCode(97 + (subIndex as number)) }})</span>
                    <div class="flex-1">
                      <p class="text-gray-900 dark:text-white mb-2">{{ subQ.question_text }}</p>
                      <span class="text-sm text-gray-600 dark:text-gray-400">{{ fmtMarks(subQ.marks) }} marks</span>
                    </div>
                  </div>
                  <div class="ml-3 sm:ml-6">
                    <FreeResponseAnswer
                      :question="subQ"
                      :assignment-id="Number(route.params.id)"
                      :office-uploads="officeUploads"
                      :model-value="answers[subQ.id] || ''"
                      :initial-annotations="answerAnnotationsByQuestion[subQ.id] || {}"
                      :initial-attachment="answerAttachmentByQuestion[subQ.id] || null"
                      :initial-additional-files="answerAdditionalFilesByQuestion[subQ.id] || []"
                      :readonly="isLocked"
                      @update:model-value="answers[subQ.id] = $event; triggerAutoSave()"
                      @update:attachment="answerAttachmentByQuestion[subQ.id] = $event"
                      @update:additional-files="answerAdditionalFilesByQuestion[subQ.id] = $event"
                  :parts-order="partsOrderByQuestion[subQ.id] || []"
                  @update:parts-order="partsOrderByQuestion[subQ.id] = $event; triggerAutoSave()"
                  :answer-style="answerStyleByQuestion[subQ.id] || null"
                  @update:answer-style="answerStyleByQuestion[subQ.id] = $event; triggerAutoSave()"
                      @submission-id="submissionId = $event"
                      @locked="submissionStatus = 'submitted'"
                    />
                  </div>
                </div>
              </div>

              <!-- Fallback: scenario has no structured sub-questions, answer the scenario directly -->
              <div v-else class="ml-0">
                <FreeResponseAnswer
                  :question="entry.question"
                  :assignment-id="Number(route.params.id)"
                  :office-uploads="officeUploads"
                  :model-value="answers[entry.question.id] || ''"
                  :initial-annotations="answerAnnotationsByQuestion[entry.question.id] || {}"
                  :initial-attachment="answerAttachmentByQuestion[entry.question.id] || null"
                  :initial-additional-files="answerAdditionalFilesByQuestion[entry.question.id] || []"
                  :readonly="isLocked"
                  @update:model-value="answers[entry.question.id] = $event; triggerAutoSave()"
                  @update:attachment="answerAttachmentByQuestion[entry.question.id] = $event"
                  @update:additional-files="answerAdditionalFilesByQuestion[entry.question.id] = $event"
                  :parts-order="partsOrderByQuestion[entry.question.id] || []"
                  @update:parts-order="partsOrderByQuestion[entry.question.id] = $event; triggerAutoSave()"
                  :answer-style="answerStyleByQuestion[entry.question.id] || null"
                  @update:answer-style="answerStyleByQuestion[entry.question.id] = $event; triggerAutoSave()"
                  @submission-id="submissionId = $event"
                  @locked="submissionStatus = 'submitted'"
                />
              </div>
            </div>

            <!-- Regular Question -->
            <div v-else>
              <div class="mb-5">
                <p v-if="!isObjectiveQuestion(entry.question)" class="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1.5 flex items-center gap-1.5">
                  <AppIcon name="target" class="w-3.5 h-3.5" /> Your task
                </p>
                <div class="text-lg sm:text-xl font-semibold leading-snug text-gray-900 dark:text-white break-words [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_table]:max-w-full" v-html="safeHtml(entry.question.question_text)"></div>
                <p v-if="entry.question.question_type === 'multiple_choice_multiple'" class="mt-1.5 text-xs text-gray-500 dark:text-gray-400">Choose all that are correct.</p>
              </div>

              <!-- Multiple Choice Single -->
              <div v-if="entry.question.question_type === 'multiple_choice_single'" class="grid gap-2.5" role="radiogroup">
                <label
                  v-for="(option, optIndex) in entry.question.options"
                  :key="optIndex"
                  class="ans-opt"
                  :class="{ 'ans-opt-on': String(answers[entry.question.id]) === String(option.id), 'ans-opt-locked': isLocked }"
                >
                  <input
                    v-model="answers[entry.question.id]"
                    type="radio"
                    :value="option.id"
                    :disabled="isLocked"
                    class="sr-only"
                    @change="triggerAutoSave"
                  >
                  <span class="ans-opt-letter">{{ String.fromCharCode(65 + Number(optIndex)) }}</span>
                  <span class="flex-1 min-w-0 text-[0.95rem] text-gray-800 dark:text-gray-100 break-words">{{ option.option_text }}</span>
                  <span class="ans-opt-tick" aria-hidden="true"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg></span>
                </label>
              </div>

              <!-- Multiple Choice Multiple -->
              <div v-else-if="entry.question.question_type === 'multiple_choice_multiple'" class="grid gap-2.5">
                <label
                  v-for="(option, optIndex) in entry.question.options"
                  :key="optIndex"
                  class="ans-opt"
                  :class="{ 'ans-opt-on': (multipleChoiceAnswers[entry.question.id] || []).includes(option.id), 'ans-opt-locked': isLocked }"
                >
                  <input
                    v-model="multipleChoiceAnswers[entry.question.id]"
                    type="checkbox"
                    :value="option.id"
                    :disabled="isLocked"
                    class="sr-only"
                    @change="answers[entry.question.id] = JSON.stringify(multipleChoiceAnswers[entry.question.id] || []); triggerAutoSave()"
                  >
                  <span class="ans-opt-letter">{{ String.fromCharCode(65 + Number(optIndex)) }}</span>
                  <span class="flex-1 min-w-0 text-[0.95rem] text-gray-800 dark:text-gray-100 break-words">{{ option.option_text }}</span>
                  <span class="ans-opt-tick" aria-hidden="true"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg></span>
                </label>
              </div>

              <!-- True/False -->
              <div v-else-if="entry.question.question_type === 'true_false'" class="grid sm:grid-cols-2 gap-2.5" role="radiogroup">
                <label class="ans-opt" :class="{ 'ans-opt-on': answers[entry.question.id] === 'true', 'ans-opt-locked': isLocked }">
                  <input
                    v-model="answers[entry.question.id]"
                    type="radio"
                    value="true"
                    :disabled="isLocked"
                    class="sr-only"
                    @change="triggerAutoSave"
                  >
                  <span class="ans-opt-letter">T</span>
                  <span class="flex-1 text-[0.95rem] font-medium text-gray-800 dark:text-gray-100">True</span>
                  <span class="ans-opt-tick" aria-hidden="true"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg></span>
                </label>
                <label class="ans-opt" :class="{ 'ans-opt-on': answers[entry.question.id] === 'false', 'ans-opt-locked': isLocked }">
                  <input
                    v-model="answers[entry.question.id]"
                    type="radio"
                    value="false"
                    :disabled="isLocked"
                    class="sr-only"
                    @change="triggerAutoSave"
                  >
                  <span class="ans-opt-letter">F</span>
                  <span class="flex-1 text-[0.95rem] font-medium text-gray-800 dark:text-gray-100">False</span>
                  <span class="ans-opt-tick" aria-hidden="true"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg></span>
                </label>
              </div>

              <!-- An ICT practical: done in Tusome's Word, Excel, PowerPoint or Access -->
              <PracticalAnswerCard
                v-else-if="(entry.question as any).practical_app"
                :question="entry.question as any"
                :assignment-id="Number(route.params.id)"
                :saved-files="practicalFilesByQuestion[entry.question.id] || []"
                :readonly="isLocked"
                :title="assignment?.title || 'Practical'"
                @saved="(files: PracticalFile[], sid: number) => { practicalFilesByQuestion[entry.question.id] = files; if (sid) submissionId = sid }"
              />

              <!-- Fill in Blank, Short Answer, Essay, Structured -->
              <div v-else>
                <FreeResponseAnswer
                  :question="entry.question"
                  :assignment-id="Number(route.params.id)"
                  :office-uploads="officeUploads"
                  :model-value="answers[entry.question.id] || ''"
                  :initial-annotations="answerAnnotationsByQuestion[entry.question.id] || {}"
                  :initial-attachment="answerAttachmentByQuestion[entry.question.id] || null"
                  :initial-additional-files="answerAdditionalFilesByQuestion[entry.question.id] || []"
                  :readonly="isLocked"
                  :placeholder="getPlaceholder(entry.question.question_type)"
                  @update:model-value="answers[entry.question.id] = $event; triggerAutoSave()"
                  @update:attachment="answerAttachmentByQuestion[entry.question.id] = $event"
                  @update:additional-files="answerAdditionalFilesByQuestion[entry.question.id] = $event"
                  :parts-order="partsOrderByQuestion[entry.question.id] || []"
                  @update:parts-order="partsOrderByQuestion[entry.question.id] = $event; triggerAutoSave()"
                  :answer-style="answerStyleByQuestion[entry.question.id] || null"
                  @update:answer-style="answerStyleByQuestion[entry.question.id] = $event; triggerAutoSave()"
                  @submission-id="submissionId = $event"
                  @locked="submissionStatus = 'submitted'"
                />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Objective questions, one at a time: Next opens once this one is answered; the last one finishes -->
      <div v-if="opened && stepMode && !isLocked" class="mt-4 flex items-center gap-2">
        <button
          type="button"
          class="px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 shadow-sm"
          :disabled="step === 0"
          @click="goStep(step - 1)"
        >← Back</button>
        <span class="flex-1 text-center text-xs text-gray-500 dark:text-gray-400">
          {{ answeredFlags[step] ? '' : 'Choose an answer to go on' }}
        </span>
        <button
          v-if="step < totalCount - 1"
          type="button"
          class="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:shadow-none shadow-md shadow-indigo-600/25 transition"
          :disabled="!answeredFlags[step]"
          @click="goStep(step + 1)"
        >Next →</button>
        <button
          v-else
          type="button"
          class="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:shadow-none shadow-md shadow-indigo-600/25 transition"
          :disabled="!answeredFlags[step] || submitting"
          @click="submitAssignment"
        >{{ submitting ? 'Marking…' : 'Finish & see my mark' }}</button>
      </div>

      <!-- Sticky bottom action bar -->
      <div v-if="opened && !isLocked && !stepMode" class="sticky bottom-0 -mx-3 sm:-mx-6 px-3 sm:px-6 py-3 mt-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur border-t border-gray-200 dark:border-gray-700 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 z-10">
        <p class="flex items-center gap-2 text-sm" :class="saveState.tone" role="status" aria-live="polite">
          <span class="w-2 h-2 rounded-full flex-shrink-0" :class="saveState.dot"></span>
          <span>{{ saveState.text }}</span>
          <button v-if="autoSaveStatus === 'failed'" type="button" class="font-semibold underline" @click="autoSave(0)">Try now</button>
        </p>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 shrink-0">
          <button
            @click="saveDraft"
            :disabled="saving"
            class="w-full sm:w-auto px-4 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {{ saving ? 'Saving...' : 'Save Progress' }}
          </button>
          <button
            @click="showSubmitConfirm = true"
            :disabled="!canSubmit || submitting"
            class="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {{ submitting ? 'Submitting...' : '✓ Submit Assignment' }}
          </button>
        </div>
      </div>

      <!-- Submit Confirmation -->
      <SubmitConfirmDialog
        v-if="showSubmitConfirm"
        :answered-count="answeredCount"
        :total-count="totalCount"
        :submitting="submitting"
        @cancel="showSubmitConfirm = false"
        @review="reviewAnswers"
        @confirm="submitAssignment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { safeHtml } from '@/utils/safeHtml'
import { fmtMarks } from '@/utils/marks'
import AppIcon from '@/components/common/AppIcon.vue'
import { ref, computed, watch, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import type { AssignmentQuestion, AnnotationLayerJSON } from '@/types'
import { resolveAssetUrl } from '@/utils/url'
import type { AdditionalAnswerFile } from '@/components/assignment/FreeResponseAnswer.vue'
// Loaded only when a question needs it: it brings the answer editor and the drawing tool (some
// 260 KB), which a multiple-choice test never uses - the page opens without waiting for them
const FreeResponseAnswer = defineAsyncComponent(() => import('@/components/assignment/FreeResponseAnswer.vue'))
import QuestionProgress from '@/components/assignment/QuestionProgress.vue'
import SubmitConfirmDialog from '@/components/assignment/SubmitConfirmDialog.vue'
import PracticalAnswerCard, { type PracticalFile } from '@/components/practical/PracticalAnswerCard.vue'
import { isPlaceholderAttachmentName } from '@/utils/answerAttachment'
import { useToastStore } from '@/stores/toast'
import { offline } from '@/utils/offline/enotes'
import { saveAssessment, removeAssessment, offlineBlocker } from '@/utils/offline/assessments'

const toast = useToastStore()

const router = useRouter()
const route = useRoute()

const API_BASE = '/api'

const ASSESSMENT_CATEGORY_LABELS: Record<'LOA' | 'AOI' | 'EOC', string> = {
  LOA: 'Learning Outcome Assessment',
  AOI: 'Activity of Integration',
  EOC: 'Elements of Construct'
}

interface CurriculumStructure {
  category: 'LOA' | 'AOI' | 'EOC'
  topic?: { id: number; theme_branch: string; topic: string; competence: string } | null
  learning_outcomes?: { id: number; learning_outcome: string; order_number: number }[]
  topics?: { id: number; theme_branch: string; topic: string }[]
  assessment_objective?: string
  construct_name?: string
}

const assignment = ref<any>(null)
const questions = ref<AssignmentQuestion[]>([])
// Read-only curriculum structure (null for any assignment without an assessment_category - every
// assignment created before this feature) - see Student\AssignmentController::getCurriculumStructure().
const curriculum = ref<CurriculumStructure | null>(null)

// Groups the flat `questions` array (unchanged - still the single source of truth for answer
// state, keyed by question.id) into the Topic/Learning-Outcome order the teacher organized them
// under, with a header inserted before each group's first question. Falls back to the original
// flat order untouched when there's no assessment_category (legacy assignments).
const displayQuestions = computed(() => {
  if (!curriculum.value) {
    return questions.value.map(question => ({ question, groupHeader: null as null | { theme: string | null; label: string } }))
  }

  const topicById = new Map<number, { theme_branch: string; topic: string }>()
  if (curriculum.value.category === 'LOA' && curriculum.value.topic) {
    topicById.set(curriculum.value.topic.id, curriculum.value.topic)
  }
  for (const t of curriculum.value.topics || []) {
    topicById.set(t.id, t)
  }
  const outcomeById = new Map((curriculum.value.learning_outcomes || []).map(o => [o.id, o]))

  const groupKeyFor = (q: any): string => {
    if (curriculum.value!.category === 'LOA') return `lo-${q.learning_outcome_id ?? 'none'}`
    // EOC always groups as one, regardless of which underlying curriculum_topic_id a question
    // carries - it's assessed against the Construct's Assessment Objective as a whole.
    if (curriculum.value!.category === 'EOC') return 'eoc-construct'
    return `topic-${q.curriculum_topic_id ?? 'none'}`
  }

  const seenGroups = new Set<string>()
  return questions.value.map((question) => {
    const q = question as any
    const key = groupKeyFor(q)
    let groupHeader: { theme: string | null; label: string } | null = null

    if (!seenGroups.has(key)) {
      seenGroups.add(key)
      if (curriculum.value!.category === 'LOA') {
        const outcome = outcomeById.get(q.learning_outcome_id)
        groupHeader = outcome ? { theme: null, label: `Learning Outcome ${outcome.order_number}: ${outcome.learning_outcome}` } : null
      } else if (curriculum.value!.category === 'EOC') {
        // EOC is assessed against the Construct's Assessment Objective as a whole - every EOC
        // question shares the same group in the builder now, so this shows once rather than
        // switching per raw Theme/Topic text.
        groupHeader = curriculum.value!.assessment_objective
          ? { theme: null, label: `Assessment Objective (${curriculum.value!.assessment_objective})` }
          : null
      } else {
        const topic = topicById.get(q.curriculum_topic_id)
        groupHeader = topic ? { theme: null, label: topic.topic } : null
      }
    }

    return { question, groupHeader }
  })
})
// Every question renders on one page at once now (no Prev/Next paging - that confused students
// into treating each question as a separate step). `currentQuestionIndex` just tracks which
// question QuestionProgress's dots last jumped to, for its highlight ring; goToQuestion() scrolls
// that question into view instead of swapping which one is displayed.
const currentQuestionIndex = ref(0)
const totalCount = computed(() => displayQuestions.value.length)

// Only objective questions (multiple choice / true-false): one at a time, each opening once the
// one before it is answered, and the mark comes straight back on finishing
const stepMode = computed(() => displayQuestions.value.length > 0 &&
  displayQuestions.value.every(({ question }) => ['multiple_choice_single', 'multiple_choice_multiple', 'true_false'].includes(question.question_type)))
const step = ref(0)
/** the furthest question open: the first one not answered yet */
const furthestOpen = computed(() => {
  const i = answeredFlags.value.findIndex(a => !a)
  return i === -1 ? totalCount.value - 1 : i
})
function goStep(index: number) {
  if (index < 0 || index >= totalCount.value || index > furthestOpen.value) return
  step.value = index
  currentQuestionIndex.value = index
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToQuestion(index: number) {
  if (stepMode.value) return goStep(index)
  if (index < 0 || index >= displayQuestions.value.length) return
  currentQuestionIndex.value = index
  const entry = displayQuestions.value[index]
  if (entry) {
    document.getElementById(`question-${entry.question.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

const OBJECTIVE_TYPES = ['multiple_choice_single', 'multiple_choice_multiple', 'true_false']
function isObjectiveQuestion(question: any): boolean {
  return OBJECTIVE_TYPES.includes(question.question_type)
}

// "Answered" is a best-effort completion signal for the progress dots / submit-confirmation
// wording, not a hard gate (matches canSubmit's existing loose philosophy - the spec's own
// "Submit Anyway" escape hatch confirms this is meant as a nudge, not a blocker).
function isFreeResponseAnswered(question: any): boolean {
  // an ICT practical is answered once there is saved work
  if (question.practical_app) return !!practicalFilesByQuestion.value[question.id]?.length || !!answerAttachmentByQuestion.value[question.id]?.path
  // Type, Write, and Upload are independent - completing any one of them is enough, regardless
  // of whether the other two are empty (Upload in particular never populates `answers`/typed
  // text, so it needs its own check here rather than falling through to "unanswered").
  const text = (answers.value[question.id] || '').replace(/<[^>]*>/g, '').trim()
  if (text.length > 0) return true
  const attachment = answerAttachmentByQuestion.value[question.id]
  if (attachment && !isPlaceholderAttachmentName(attachment.originalName)) return true
  if ((answerAdditionalFilesByQuestion.value[question.id] || []).length > 0) return true
  const pages = answerAnnotationsByQuestion.value[question.id] || {}
  return Object.values(pages).some(layer => (layer?.objects?.length || 0) > 0)
}

function isQuestionAnswered(question: any): boolean {
  if (question.question_type === 'scenario') {
    const subs = question.sub_questions
    if (subs && subs.length > 0) return subs.every((s: any) => isFreeResponseAnswered(s))
    return isFreeResponseAnswered(question)
  }
  if (question.question_type === 'multiple_choice_multiple') {
    return (multipleChoiceAnswers.value[question.id] || []).length > 0
  }
  if (isObjectiveQuestion(question)) {
    return answers.value[question.id] !== undefined && answers.value[question.id] !== ''
  }
  return isFreeResponseAnswered(question)
}

const answeredFlags = computed(() => displayQuestions.value.map(({ question }) => isQuestionAnswered(question)))
const answeredCount = computed(() => answeredFlags.value.filter(Boolean).length)
// coming back to a half-done objective assessment: open where they stopped
watch(() => [stepMode.value, totalCount.value], () => {
  if (stepMode.value) step.value = furthestOpen.value
})

function reviewAnswers() {
  showSubmitConfirm.value = false
  const firstUnanswered = answeredFlags.value.findIndex(a => !a)
  if (firstUnanswered !== -1) goToQuestion(firstUnanswered)
}

const loading = ref(false)
const error = ref<string | null>(null)
const saving = ref(false)
const submitting = ref(false)
const showSubmitConfirm = ref(false)
// null: nothing changed since opening · pending: a change waiting to be sent · then saving, saved, failed
const autoSaveStatus = ref<'pending' | 'saving' | 'saved' | 'failed' | null>(null)
const lastSavedAt = ref<number | null>(null)
const clock = ref(Date.now())
const ago = (t: number) => {
  const sec = Math.max(0, Math.round((clock.value - t) / 1000))
  if (sec < 10) return 'just now'
  if (sec < 60) return `${sec} seconds ago`
  const min = Math.round(sec / 60)
  return min === 1 ? '1 minute ago' : min < 60 ? `${min} minutes ago` : `at ${new Date(t).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`
}
// The one line that tells a student whether their work is safe
const saveState = computed(() => {
  const here = loadedOffline.value || !offline.online
  switch (autoSaveStatus.value) {
    case 'pending': return { text: 'Changes not saved yet...', short: 'Not saved yet', tone: 'text-gray-500 dark:text-gray-400', dot: 'bg-amber-400' }
    case 'saving': return { text: 'Saving...', short: 'Saving...', tone: 'text-gray-500 dark:text-gray-400', dot: 'bg-amber-400 animate-pulse' }
    case 'saved': return {
      text: `${here ? 'Saved on this device' : 'All your work is saved'} - ${lastSavedAt.value ? ago(lastSavedAt.value) : 'just now'}`,
      short: here ? 'Saved on this device' : 'Saved', tone: 'text-green-700 dark:text-green-400', dot: 'bg-green-500'
    }
    case 'failed': return {
      text: offline.online ? 'Not saved - Tusome could not be reached. Trying again...' : 'Not saved - no internet. It saves when you are back online.',
      short: 'Not saved', tone: 'text-red-600 dark:text-red-400 font-medium', dot: 'bg-red-500'
    }
    default: return { text: Object.keys(answers.value).length ? 'Your saved answers are here - changes save by themselves' : 'Your answers save by themselves as you go', short: '', tone: 'text-gray-500 dark:text-gray-400', dot: 'bg-gray-300 dark:bg-gray-600' }
  }
})
const submissionTiming = ref<'early' | 'on_time' | 'late' | null>(null)

const answers = ref<Record<number, string>>({})
const multipleChoiceAnswers = ref<Record<number, number[]>>({})
const answerAnnotationsByQuestion = ref<Record<number, Record<number, AnnotationLayerJSON>>>({})
const answerAttachmentByQuestion = ref<Record<number, { path: string; originalName?: string } | null>>({})
// ICT practicals: the learner's file in each app they used
const practicalFilesByQuestion = ref<Record<number, PracticalFile[]>>({})
const answerAdditionalFilesByQuestion = ref<Record<number, AdditionalAnswerFile[]>>({})

const submissionId = ref<number | null>(null)
const submissionStatus = ref<string | null>(null)
const timeRemaining = ref(0)
let timerInterval: number | null = null

// Staff (teacher/hod/admin) "Preview as Student" mode: set via route meta on the /teacher,
// /hod, /admin variants of this same component so it can be reused unmodified for the real
// student-taking experience and for a read-only staff preview.
const previewRole = computed(() => route.meta.previewRole as string | undefined)
const isPreview = computed(() => !!previewRole.value)

const loadUrl = computed(() => {
  return isPreview.value
    ? `${API_BASE}/${previewRole.value}/assignments/${route.params.id}/preview`
    : `${API_BASE}/student/assignments/${route.params.id}`
})

// Locked once the attempt has moved past in_progress (submitted/marking/graded/returned) -
// a teacher reopening it resets status back to in_progress server-side. Preview mode is always
// locked - there's no real submission to save answers into.
const deadlinePassed = ref(false)
const isLocked = computed(() => isPreview.value || deadlinePassed.value || (submissionStatus.value !== null && submissionStatus.value !== 'in_progress'))
const neverHandedIn = computed(() => deadlinePassed.value && (submissionStatus.value === null || submissionStatus.value === 'in_progress'))

const questionStatusLabel = computed(() => {
  if (!isLocked.value) return 'Draft'
  if (neverHandedIn.value) return 'Not handed in'
  if (submissionStatus.value === 'graded' || submissionStatus.value === 'returned') return 'Marked'
  return 'Submitted'
})

const questionStatusBadgeClass = computed(() => {
  if (!isLocked.value) return 'border-amber-300 text-amber-700 bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:bg-amber-900/20'
  if (neverHandedIn.value) return 'border-rose-300 text-rose-700 bg-rose-50 dark:border-rose-700 dark:text-rose-300 dark:bg-rose-900/20'
  return 'border-green-300 text-green-700 bg-green-50 dark:border-green-700 dark:text-green-300 dark:bg-green-900/20'
})

// Reuses the same live `answeredFlags` the progress dots and submit-confirmation dialog already
// read (derived straight from `answers`/`answerAttachmentByQuestion`/`answerAnnotationsByQuestion`,
// updated the moment the student types, draws, or uploads - not just after a page reload). This
// used to be a separate, looser check keyed off `answerModeByQuestion`, which is only populated
// once at initial load, so a same-session Upload never flipped it and the Submit button stayed
// disabled until a refresh.
const canSubmit = computed(() => !isLocked.value && answeredCount.value > 0)

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  }
  return `${minutes}m ${secs}s`
}

const getPlaceholder = (type: string) => {
  const placeholders: Record<string, string> = {
    fill_blank: 'Type your answer here...',
    short_answer: 'Type your answer here...',
    essay: 'Write your essay here...',
    structured: 'Type your answer here...'
  }
  return placeholders[type] || 'Type your answer here...'
}

// Answering offline (see utils/offline/assessments.ts): loaded from this device, whether it's saved
// to answer offline, and why it can't be when it can't
const loadedOffline = ref(false)
const submittedOffline = ref(false)
const lastLoad = ref<any>(null)
// ICT: support files to download, and Office files may be handed in (Student\AssignmentController show())
const supportFiles = computed<{ id: number; file_path: string; original_name: string }[]>(() => lastLoad.value?.resources ?? [])
const officeUploads = computed(() => !!lastLoad.value?.office_uploads)
const savingOffline = ref(false)
const savedOffline = computed(() => offline.assessments[Number(route.params.id)] ?? null)
const offlineBlockReason = computed(() => (lastLoad.value ? offlineBlocker(lastLoad.value) : 'Not loaded'))
const toggleOffline = async () => {
  const id = Number(route.params.id)
  if (savedOffline.value) {
    await removeAssessment(id)
    return
  }
  savingOffline.value = true
  try {
    await saveAssessment(id, lastLoad.value)
    toast.success('Saved - you can answer this without internet')
  } catch (err: any) {
    toast.error(err?.message || 'Could not save it for offline')
  } finally {
    savingOffline.value = false
  }
}

// The order a student arranged each written answer's parts in (see FreeResponseAnswer)
const partsOrderByQuestion = ref<Record<number, string[]>>({})
// 'handwriting' when the learner writes a mark sheet in handwriting (saved with the answer)
const answerStyleByQuestion = ref<Record<number, string | null>>({})

const loadAssignment = async () => {
  loading.value = true
  error.value = null
  currentQuestionIndex.value = 0

  try {
    let response = await axios.get(loadUrl.value)
    // a timed paper is released when the student begins - this starts its clock
    if (response.data.data?.not_started) response = await axios.get(loadUrl.value, { params: { begin: 1 } })
    if (response.data.success) {
      loadedOffline.value = !!response.data.offline
      lastLoad.value = response.data.data
      deadlinePassed.value = !!response.data.data.deadline_passed
      assignment.value = response.data.data.assignment
      questions.value = response.data.data.questions
      curriculum.value = response.data.data.curriculum || null
      submissionId.value = response.data.data.submission_id || null
      submissionStatus.value = response.data.data.submission_status || null
      answerAnnotationsByQuestion.value = response.data.data.answer_annotations || {}

      practicalFilesByQuestion.value = response.data.data.practical_files || {}
      const rawAdditionalFiles: Record<string, any[]> = response.data.data.answer_attachments || {}
      answerAdditionalFilesByQuestion.value = Object.fromEntries(
        Object.entries(rawAdditionalFiles).map(([qId, files]) => [
          qId,
          files.map(f => ({ id: f.id, path: f.path, originalName: f.original_name, fileType: f.file_type }))
        ])
      )

      // "Choose all that are correct": each question keeps a list of the options chosen
      const multi = questions.value.filter(q => q.question_type === 'multiple_choice_multiple')
      multi.forEach(q => { multipleChoiceAnswers.value[q.id] = [] })

      // Load existing answers if submission exists
      if (response.data.data.answers) {
        response.data.data.answers.forEach((answer: any) => {
          if (answer.answer_text !== null && answer.answer_text !== undefined) {
            answers.value[answer.question_id] = answer.answer_text
            if (multi.some(q => q.id === Number(answer.question_id))) {
              try {
                const picked = JSON.parse(answer.answer_text)
                if (Array.isArray(picked)) multipleChoiceAnswers.value[answer.question_id] = picked.map(Number)
              } catch { /* not a list - nothing chosen */ }
            }
          }
          if (answer.answer_style) answerStyleByQuestion.value[answer.question_id] = answer.answer_style
          if (answer.parts_order) {
            try {
              const order = JSON.parse(answer.parts_order)
              if (Array.isArray(order)) partsOrderByQuestion.value[answer.question_id] = order.map(String)
            } catch { /* keep the default order */ }
          }
          answerAttachmentByQuestion.value[answer.question_id] = answer.student_attachment_path
            ? { path: answer.student_attachment_path, originalName: answer.student_attachment_original_name }
            : null
        })
      }

      // Start timer if duration is set and the attempt is still editable - counting from when
      // they first started, so coming back later doesn't give them the full time again
      const secondsUsed = Number(response.data.data.seconds_used) || 0
      // already started (or handed in): straight to the answer sheet, not the opening card
      if (isLocked.value || secondsUsed > 0 || response.data.data.submission_status === 'in_progress') opened.value = true
      if (assignment.value.duration_minutes && !isLocked.value && opened.value) startTimer(secondsUsed)
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load assignment'
  } finally {
    loading.value = false
  }
}

// The card first: nothing of the questions until the learner opens it
const opened = ref(false)
// the colours of the assessments list's cards, by kind
const INTRO_LOOK: Record<'LOA' | 'AOI' | 'EOC', { icon: string; solid: string; glow: string; band: string; text: string; soft: string }> = {
  LOA: { icon: 'target', solid: 'bg-indigo-600', glow: 'shadow-indigo-500/30', band: 'from-indigo-50 dark:from-indigo-950/40', text: 'text-indigo-700 dark:text-indigo-300', soft: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' },
  AOI: { icon: 'bulb', solid: 'bg-violet-600', glow: 'shadow-violet-500/30', band: 'from-violet-50 dark:from-violet-950/40', text: 'text-violet-700 dark:text-violet-300', soft: 'bg-violet-50 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300' },
  EOC: { icon: 'clipboard', solid: 'bg-amber-500', glow: 'shadow-amber-500/30', band: 'from-amber-50 dark:from-amber-950/40', text: 'text-amber-700 dark:text-amber-300', soft: 'bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' }
}
const introLook = computed(() => INTRO_LOOK[curriculum.value?.category as 'LOA' | 'AOI' | 'EOC'] || INTRO_LOOK.LOA)
const introTiles = computed(() => [
  { label: 'Total marks', icon: 'star', value: fmtMarks(assignment.value?.total_marks) },
  { label: 'Questions', icon: 'document', value: totalCount.value },
  { label: 'Duration', icon: 'clock', value: assignment.value?.duration_minutes ? `${assignment.value.duration_minutes} min` : 'No limit' },
  { label: 'Deadline', icon: 'hourglass', value: assignment.value?.due_date ? formatDate(assignment.value.due_date) : 'None' }
])
const openAssessment = () => {
  opened.value = true
  window.scrollTo({ top: 0 })
  if (assignment.value?.duration_minutes && !isLocked.value && !isPreview.value && !timerInterval && !timeUp.value) {
    startTimer(0)
    // saved straight away, so the school's clock starts now too
    autoSave(0)
  }
}

const timeUp = ref(false)
const startTimer = (secondsUsed = 0) => {
  if (!assignment.value.duration_minutes) return
  if (timerInterval) clearInterval(timerInterval)

  const durationSeconds = assignment.value.duration_minutes * 60
  const endTime = Date.now() + (durationSeconds - secondsUsed) * 1000
  let warned = false
  const tick = () => {
    const remaining = Math.floor((endTime - Date.now()) / 1000)
    timeRemaining.value = remaining > 0 ? remaining : 0
    if (remaining <= 60 && remaining > 0 && !warned && durationSeconds > 120) {
      warned = true
      toast.info('One minute left - your answers will be handed in when the time is over')
    }
    if (remaining <= 0) {
      timeUp.value = true
      if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = null
      }
      handInWhenTimeIsUp()
    }
  }
  tick()
  if (!timeUp.value) timerInterval = window.setInterval(tick, 1000)
}

// The time is over: whatever has been answered is handed in, as in an exam room
let handedInForTime = false
const handInWhenTimeIsUp = async () => {
  if (handedInForTime || isLocked.value || isPreview.value) return
  handedInForTime = true
  toast.info('Time is up - your answers are being handed in')
  showSubmitConfirm.value = false
  await submitAssignment()
}

const triggerAutoSave = () => {
  if (isLocked.value || isPreview.value) return
  autoSave()
}

let autoSaveTimeout: number | null = null

let retryTimeout: number | null = null
const autoSave = async (delay = 3000) => {
  if (isLocked.value || isPreview.value) return
  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout)
  }
  if (retryTimeout) {
    clearTimeout(retryTimeout)
    retryTimeout = null
  }

  autoSaveStatus.value = 'pending'

  autoSaveTimeout = window.setTimeout(async () => {
    autoSaveStatus.value = 'saving'
    try {
      const data = {
        assignment_id: route.params.id,
        answers: prepareAnswers(),
        status: 'in_progress'
      }

      let response
      if (submissionId.value) {
        response = await axios.put(`${API_BASE}/student/assignments/submissions/${submissionId.value}`, data)
      } else {
        response = await axios.post(`${API_BASE}/student/assignments/${route.params.id}/submit`, data)
        submissionId.value = response.data.data.id
      }

      if (response.data.success) {
        autoSaveStatus.value = 'saved'
        lastSavedAt.value = Date.now()
        // past the time limit the server has handed in what was saved
        if (response.data.data.time_up) {
          submissionStatus.value = response.data.data.status
          toast.error(response.data.message)
        }
      }
    } catch (err: any) {
      // the deadline went by while the page was open: lock it rather than keep retrying
      if (err.response?.data?.errors?.deadline_passed) {
        deadlinePassed.value = true
        autoSaveStatus.value = null
        toast.error(err.response.data.message)
        return
      }
      autoSaveStatus.value = 'failed'
      console.error('Auto-save failed:', err)
      // try again by itself; also as soon as the internet is back (see onOnline)
      retryTimeout = window.setTimeout(() => autoSave(0), 15000)
    }
  }, delay)
}
const onOnline = () => { if (autoSaveStatus.value === 'failed' || autoSaveStatus.value === 'pending') autoSave(0) }
// Leaving with work that hasn't reached the server: ask first
const onBeforeUnload = (e: BeforeUnloadEvent) => {
  if (autoSaveStatus.value === 'pending' || autoSaveStatus.value === 'saving' || autoSaveStatus.value === 'failed') {
    e.preventDefault()
    e.returnValue = ''
  }
}
let clockTimer: number | undefined

const saveDraft = async () => {
  if (isLocked.value || isPreview.value) return
  saving.value = true

  try {
    const data = {
      assignment_id: route.params.id,
      answers: prepareAnswers(),
      status: 'in_progress'
    }

    let response
    if (submissionId.value) {
      response = await axios.put(`${API_BASE}/student/assignments/submissions/${submissionId.value}`, data)
    } else {
      response = await axios.post(`${API_BASE}/student/assignments/${route.params.id}/submit`, data)
      submissionId.value = response.data.data.id
    }

    if (response.data.success) {
      autoSaveStatus.value = 'saved'
      lastSavedAt.value = Date.now()
      toast.success('Your work is saved')
    }
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to save draft')
  } finally {
    saving.value = false
  }
}

const prepareAnswers = () => {
  const prepared: any[] = []

  Object.entries(answers.value).forEach(([questionId, answer]) => {
    const qId = Number(questionId)
    const question = questions.value.find(q => q.id === qId)

    if (question?.question_type === 'multiple_choice_multiple') {
      const selectedOptions = multipleChoiceAnswers.value[qId] || []
      prepared.push({
        question_id: qId,
        answer_text: JSON.stringify(selectedOptions)
      })
    } else {
      prepared.push({
        question_id: qId,
        answer_text: String(answer)
      })
    }
  })

  // The arranged order of each written answer - also for questions answered only by writing on
  // the page or uploading (no typed text, so no entry above)
  Object.entries(partsOrderByQuestion.value).forEach(([questionId, order]) => {
    const qId = Number(questionId)
    const entry = prepared.find(a => a.question_id === qId)
    if (entry) entry.parts_order = order
    else prepared.push({ question_id: qId, parts_order: order })
  })

  // print or handwriting, for each mark sheet the learner set it on
  Object.entries(answerStyleByQuestion.value).forEach(([questionId, style]) => {
    const qId = Number(questionId)
    const entry = prepared.find(a => a.question_id === qId)
    if (entry) entry.answer_style = style || null
    else prepared.push({ question_id: qId, answer_style: style || null })
  })

  return prepared
}

const submitAssignment = async () => {
  if (isLocked.value || isPreview.value || submitting.value) {
    // Already submitted (or a duplicate click while the first request is in flight) - no-op.
    showSubmitConfirm.value = false
    return
  }

  submitting.value = true

  try {
    const data = {
      assignment_id: route.params.id,
      answers: prepareAnswers(),
      status: 'submitted'
    }

    let response
    if (submissionId.value) {
      response = await axios.put(`${API_BASE}/student/assignments/submissions/${submissionId.value}`, data)
    } else {
      response = await axios.post(`${API_BASE}/student/assignments/${route.params.id}/submit`, data)
    }

    if (response.data.success) {
      showSubmitConfirm.value = false
      submissionStatus.value = 'submitted'
      submissionTiming.value = response.data.data?.submission_timing || null
      if (timerInterval) clearInterval(timerInterval)
      const timingLabel = submissionTiming.value === 'late' ? ' (late)' : submissionTiming.value === 'early' ? ' (early)' : ''
      submittedOffline.value = !!response.data.offline
      const auto = response.data.data?.auto_marked
      if (auto && response.data.data?.id) {
        toast.success(`You scored ${fmtMarks(auto.marks_awarded)} / ${fmtMarks(auto.total_marks)} (${fmtMarks(auto.percentage)}%)`)
        router.replace(`/student/assignments/${route.params.id}/result/${response.data.data.id}`)
        return
      }
      toast.success(submittedOffline.value ? 'Submitted on this device - it will be sent when you\'re online' : `Assignment submitted successfully${timingLabel}`)
      showCompletionScreen.value = true
    }
  } catch (err: any) {
    if (err.response?.data?.errors?.deadline_passed) deadlinePassed.value = true
    toast.error(err.response?.data?.message || 'Failed to submit assignment')
  } finally {
    submitting.value = false
  }
}

// Where the student came from - present only when they arrived via an eNotes page/topic quick-
// link (ENotePreview.vue's per-page "Attempt" or the topic-completion "Attempt ... Now" CTA), so
// the post-submit screen can send them back into the reader instead of the plain Assessments list.
const showCompletionScreen = ref(false)
const completionOrigin = computed(() => (route.query.origin as string) || '')
const completionTopicId = computed(() => route.query.topicId as string | undefined)
const completionNextPageId = computed(() => route.query.nextPageId as string | undefined)
const completionTimingLabel = computed(() => {
  if (submissionTiming.value === 'late') return ' (late)'
  if (submissionTiming.value === 'early') return ' (early)'
  return ''
})

const continueToNextPage = () => {
  if (!completionTopicId.value || !completionNextPageId.value) return
  router.push(`/student/enotes/${completionTopicId.value}?resumePage=${completionNextPageId.value}`)
}

const backToEnotes = () => {
  if (!completionTopicId.value) return
  router.push(`/student/enotes/${completionTopicId.value}`)
}

onMounted(() => {
  loadAssignment()
  window.addEventListener('online', onOnline)
  window.addEventListener('beforeunload', onBeforeUnload)
  clockTimer = window.setInterval(() => { clock.value = Date.now() }, 15000)
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  if (retryTimeout) clearTimeout(retryTimeout)
  window.clearInterval(clockTimer)
  window.removeEventListener('online', onOnline)
  window.removeEventListener('beforeunload', onBeforeUnload)
})
</script>

<style scoped>
/* an answer choice: a card with its letter, green and ticked when chosen */
.ans-opt { display: flex; align-items: center; gap: 0.75rem; padding: 0.8rem 1rem; border-radius: 0.9rem; background: #fff; box-shadow: inset 0 0 0 1.5px #e5e7eb; cursor: pointer; transition: box-shadow .15s, background-color .15s, transform .15s; }
.ans-opt:hover { box-shadow: inset 0 0 0 1.5px #86efac; background: #f7fdf9; }
.ans-opt:active { transform: scale(0.995); }
.ans-opt:focus-within { outline: 2px solid #22a45d; outline-offset: 2px; }
.ans-opt-letter { width: 2rem; height: 2rem; flex-shrink: 0; border-radius: 0.6rem; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; color: #4b5563; background: #f3f4f6; transition: background-color .15s, color .15s; }
.ans-opt-tick { width: 1.4rem; height: 1.4rem; flex-shrink: 0; border-radius: 9999px; display: flex; align-items: center; justify-content: center; color: #fff; background: #16a34a; opacity: 0; transform: scale(.6); transition: opacity .15s, transform .15s; }
.ans-opt-on { box-shadow: inset 0 0 0 2px #16a34a; background: #f0fdf4; }
.ans-opt-on:hover { box-shadow: inset 0 0 0 2px #16a34a; background: #f0fdf4; }
.ans-opt-on .ans-opt-letter { background: #16a34a; color: #fff; }
.ans-opt-on .ans-opt-tick { opacity: 1; transform: scale(1); }
.ans-opt-locked { cursor: default; }
.ans-opt-locked:hover:not(.ans-opt-on) { box-shadow: inset 0 0 0 1.5px #e5e7eb; background: #fff; }
</style>

<style>
/* the answer choices in dark mode (not scoped, so .dark on <html> reaches them) */
html.dark .ans-opt { background: #1f2937; box-shadow: inset 0 0 0 1.5px #374151; }
html.dark .ans-opt:hover { background: #1f2a24; box-shadow: inset 0 0 0 1.5px #166534; }
html.dark .ans-opt-letter { background: #374151; color: #d1d5db; }
html.dark .ans-opt-on, html.dark .ans-opt-on:hover { background: #14271c; box-shadow: inset 0 0 0 2px #22c55e; }
html.dark .ans-opt-on .ans-opt-letter { background: #22c55e; color: #052e16; }
</style>
