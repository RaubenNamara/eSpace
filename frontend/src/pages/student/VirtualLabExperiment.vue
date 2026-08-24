<template>
  <div class="min-h-full">
    <div v-if="loading" class="flex flex-col items-center justify-center py-24 gap-3">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      <p class="text-xs text-gray-400 dark:text-gray-500">Entering the lab...</p>
    </div>

    <template v-else-if="attempt">
      <!-- Header -->
      <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-4">
        <div class="max-w-7xl mx-auto">
          <router-link to="/student/virtual-lab" class="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline mb-1.5">
            <span>&larr;</span> Back to Virtual Lab
          </router-link>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h1 class="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">{{ attempt.experiment.title }}</h1>
            <span class="px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap" :class="statusBadgeClass">{{ attempt.status.replace('_', ' ') }}</span>
          </div>

          <!-- Progress bar -->
          <div v-if="attempt.status === 'in_progress'" class="mt-3 flex items-center gap-3">
            <div class="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <div class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 print-color-exact transition-all duration-500" :style="{ width: progressPct + '%' }"></div>
            </div>
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ attempt.steps_completed }}/{{ attempt.experiment.steps.length }} steps</span>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div v-if="attempt.experiment.safety_precautions" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 sm:p-4 mb-4 flex items-start gap-3">
          <span class="w-8 h-8 flex-shrink-0 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-base">⚠️</span>
          <p class="text-sm text-red-700 dark:text-red-300"><strong>Safety:</strong> {{ attempt.experiment.safety_precautions }}</p>
        </div>

        <!-- Required apparatus - some pieces may already be on the bench, others wait in the tray
             inside the 3D view until you pick them up; the setup itself (wiring, pouring,
             measuring) is still entirely up to you. -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-3.5 mb-4">
          <p class="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">{{ CATEGORY_LABELS[attempt.experiment.category] }} Apparatus</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="o in apparatusList"
              :key="o.key"
              class="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors"
              :class="isHighlightedApparatus(o.key) ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-300 dark:ring-indigo-700' : 'bg-gray-50 dark:bg-gray-900/40 text-gray-600 dark:text-gray-300'"
            >
              <span>{{ o.icon }}</span> {{ o.name }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          <!-- Step panel: shown first on mobile/tablet so the instruction is visible without
               scrolling past the 3D view; resets to the right-hand column on desktop. -->
          <div class="order-1 lg:order-2 lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5 flex flex-col lg:h-[560px] lg:overflow-y-auto">
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
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                  Step {{ previewStepNumber }} of {{ attempt.experiment.steps.length }}
                </p>
                <div class="flex items-center gap-1">
                  <button :disabled="previewStepNumber <= 1" @click="previewStepNumber--" class="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-transparent text-xs" title="Previous instruction">&larr;</button>
                  <button :disabled="previewStepNumber >= attempt.experiment.steps.length" @click="previewStepNumber++" class="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-transparent text-xs" title="Next instruction">&rarr;</button>
                </div>
              </div>

              <div v-if="previewStep" class="mb-3">
                <div v-if="!isPreviewingCurrent" class="bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-xl p-3.5">
                  <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">{{ previewStepNumber < attempt.current_step ? 'Already completed' : 'Coming up' }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ previewStep.instruction }}</p>
                  <button @click="previewStepNumber = attempt.current_step" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline mt-2">Back to current step</button>
                </div>
                <template v-else>
                  <div v-if="previewStep.is_safety_check" class="bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-xl p-3.5">
                    <p class="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2.5">{{ previewStep.instruction }}</p>
                    <button @click="acknowledgeSafety" class="w-full px-3 py-2.5 text-sm font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 shadow-sm">I Understand - Continue</button>
                  </div>
                  <div v-else class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 rounded-xl p-3.5">
                    <p class="text-sm font-medium text-gray-800 dark:text-gray-100 leading-relaxed">{{ previewStep.instruction }}</p>
                  </div>

                  <div v-if="hintLevels.length && !previewStep.is_safety_check" class="mt-2">
                    <button v-if="hintLevel < hintLevels.length" @click="requestHint" class="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                      <span>💡</span> {{ hintLevel === 0 ? 'Need a hint?' : 'Show me more' }}
                    </button>
                    <div v-for="(h, i) in hintLevels.slice(0, hintLevel)" :key="i" class="text-xs text-gray-500 dark:text-gray-400 mt-1.5 italic bg-gray-50 dark:bg-gray-900/40 rounded-lg p-2.5">{{ h }}</div>
                  </div>

                  <button @click="resetCurrentStep" class="inline-flex items-center gap-1 text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:underline mt-2 ml-3">
                    <span>↺</span> Reset this step
                  </button>
                </template>
              </div>

              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-to-class="opacity-0"
              >
                <div v-if="toast" class="mb-3 text-xs font-semibold rounded-xl px-3.5 py-2.5 flex items-center gap-2" :class="toast.correct ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'">
                  <span>{{ toast.correct ? '✅' : '⚠️' }}</span> {{ toast.text }}
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
                <span v-if="attempt.hints_used > 0" class="inline-flex items-center gap-1 text-amber-500 dark:text-amber-400 font-medium">💡 {{ attempt.hints_used }}</span>
                <span v-if="attempt.safety_mistakes > 0" class="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-bold">⚠️ {{ attempt.safety_mistakes }} safety</span>
              </div>
              </template>
            </template>

            <template v-else>
              <p class="text-sm text-gray-600 dark:text-gray-300">All steps recorded. This practical has been {{ attempt.status }}.</p>
              <div v-if="attempt.status === 'graded'" class="mt-3 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4">
                <p class="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">{{ attempt.score }}<span class="text-sm font-medium text-indigo-400">/{{ attempt.marks }}</span></p>
                <p v-if="attempt.teacher_feedback" class="text-xs text-gray-600 dark:text-gray-300 mt-2 italic">&ldquo;{{ attempt.teacher_feedback }}&rdquo;</p>
              </div>
            </template>
          </div>

          <!-- Experiment scene - a registered 2D/SVG renderer for experiments that have opted in
               (render_mode + render_component), the original Three.js engine for everything else.
               The lookup lives entirely in the registry - this component never branches on which
               experiment it is. -->
          <div class="order-2 lg:order-1 lg:col-span-2 h-[300px] sm:h-[440px] lg:h-[560px] rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-900/5">
            <component
              :is="active2DRenderer ?? VirtualLabScene"
              ref="sceneRef"
              :scene-objects="attempt.experiment.scene_objects"
              :object-catalog="objectCatalog"
              :read-only="sceneReadOnly"
              @action="onSceneAction"
            />
          </div>
        </div>

        <!-- Practical Notebook -->
        <div v-if="allStepsDone || attempt.status !== 'in_progress'" class="mt-5 sm:mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 sm:p-6 space-y-5">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"><span>📔</span> Practical Notebook</h2>

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
              <table class="w-full text-xs border-collapse">
                <thead>
                  <tr class="bg-gray-50 dark:bg-gray-900/40 text-left text-gray-500 dark:text-gray-400">
                    <th v-for="col in resultTableColumns" :key="col" class="px-3 py-2 font-semibold capitalize">{{ col }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                  <tr v-for="row in resultRows" :key="row.id">
                    <td v-for="col in resultTableColumns" :key="col" class="px-3 py-2 text-gray-700 dark:text-gray-200">{{ row.extra?.[col] ?? '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
          </div>

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

          <button
            v-if="attempt.status === 'in_progress'"
            :disabled="!allStepsDone || submitting"
            @click="submitPractical"
            class="w-full px-4 py-3 text-sm font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm hover:shadow-md hover:brightness-105 disabled:opacity-50 disabled:hover:brightness-100 transition-all print-color-exact"
          >
            {{ submitting ? 'Submitting...' : allStepsDone ? 'Submit Practical' : 'Complete all steps to submit' }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import VirtualLabScene from '@/components/virtuallab/VirtualLabScene.vue'
import VirtualLabGraph from '@/components/virtuallab/VirtualLabGraph.vue'
import { resolve2DRenderer } from '@/components/virtuallab/render2d/registry'
import { CATEGORY_LABELS } from '@/types/virtualLab'
import type { AttemptState, LabObjectDef, ExperimentQuestion } from '@/types/virtualLab'

const QUESTION_TYPE_LABELS: Record<string, string> = {
  short_answer: 'Short answer', calculation: 'Calculation', observation: 'Observation', procedure: 'Procedure',
}

const route = useRoute()
const router = useRouter()

const attempt = ref<AttemptState | null>(null)
const objectCatalog = ref<LabObjectDef[]>([])
const loading = ref(true)
// Loosely typed on purpose - it can be the 3D engine or any registered 2D renderer, and the only
// method every renderer needs to expose is setObjectState (see registry.ts's Component contract).
const sceneRef = ref<{ setObjectState: (key: string, patch: Record<string, any>) => void } | null>(null)
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
const previewStepNumber = ref(1)
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
const lastLaunchAngleDeg = ref<number | null>(null)
const lastRangeM = ref<number | null>(null)

const currentStep = computed(() => attempt.value?.experiment.steps.find(s => s.step_number === attempt.value!.current_step) || null)
const previewStep = computed(() => attempt.value?.experiment.steps.find(s => s.step_number === previewStepNumber.value) || null)
const isPreviewingCurrent = computed(() => !!attempt.value && previewStepNumber.value === attempt.value.current_step)
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

const active2DRenderer = computed(() => {
  if (!attempt.value || attempt.value.experiment.render_mode !== '2d') return null
  return resolve2DRenderer(attempt.value.experiment.render_component)
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

watch(() => attempt.value?.current_step, (step) => {
  if (step !== undefined) previewStepNumber.value = step
  // Beginner: the first hint level shows automatically, no need to ask. Intermediate/advanced
  // still need a click - the underlying grading/tolerance is identical at every difficulty,
  // this only changes how much guidance is surfaced.
  hintLevel.value = attempt.value?.experiment.difficulty === 'beginner' ? Math.min(1, hintLevels.value.length) : 0
})

const loadObjects = async () => {
  const res = await axios.get('/api/student/virtual-lab/objects')
  objectCatalog.value = res.data.data.objects
}

const startAttempt = async () => {
  const assignmentId = route.params.assignmentId
  const res = await axios.post(`/api/student/virtual-lab/assignments/${assignmentId}/start`)
  attempt.value = res.data.data
  previewStepNumber.value = attempt.value!.current_step
  observationText.value = attempt.value!.observations['general'] || ''
  answers.value = { ...attempt.value!.answers }
  conclusionText.value = attempt.value!.conclusion_text || ''
}

const refreshAttempt = async () => {
  if (!attempt.value) return
  const res = await axios.get(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}`)
  attempt.value = res.data.data
}

const onSceneAction = async (payload: { objectKey: string | null; action: string; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null; springLoadG?: number }) => {
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
      await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/safety-mistake`)
      attempt.value.safety_mistakes++
    } catch (err) {
      // non-fatal - the warning was already shown by the 3D engine either way
    }
  }

  try {
    const res = await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/action`, {
      step_id: currentStep.value?.id ?? null,
      object_key: payload.objectKey,
      action: payload.action,
      value: payload.value,
    })
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
    await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/hint`)
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

const addPendingToNotebook = async () => {
  if (!attempt.value || !pendingNotebookEntry.value) return
  const entry = pendingNotebookEntry.value
  await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/notebook`, {
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
  await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/notebook`, {
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
  await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/notebook`, {
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
  await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/notebook`, {
    entry_type: 'result_row', label: `Trial ${trialNumber}`, value: String(titre), unit: 'ml',
    extra: { trial: trialNumber, initial_reading_ml: initial, final_reading_ml: final, titre_ml: titre },
  })
  lastBuretteInitialMl.value = null
  lastBuretteFinalMl.value = null
  await refreshAttempt()
}

const opticsTrials = computed(() => resultRows.value.filter(r => r.extra && 'incidence_deg' in r.extra))

const addOpticsResultRow = async () => {
  if (!attempt.value || lastIncidenceAngle.value === null || lastOutgoingAngle.value === null) return
  const trialNumber = opticsTrials.value.length + 1
  const incidence = lastIncidenceAngle.value
  const outgoing = lastOutgoingAngle.value
  const outgoingKey = lastOutgoingLabel.value === 'Angle of Refraction' ? 'refraction_deg' : 'reflection_deg'
  await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/notebook`, {
    entry_type: 'result_row', label: `Trial ${trialNumber}`, value: String(outgoing), unit: '°',
    extra: { trial: trialNumber, incidence_deg: incidence, [outgoingKey]: outgoing },
  })
  lastIncidenceAngle.value = null
  lastOutgoingAngle.value = null
  await refreshAttempt()
}

const addProjectileResultRow = async () => {
  if (!attempt.value || lastLaunchAngleDeg.value === null || lastRangeM.value === null) return
  const angle = lastLaunchAngleDeg.value
  const range = lastRangeM.value
  await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/notebook`, {
    entry_type: 'result_row', label: `${angle}°`, value: String(range), unit: 'm',
    extra: { angle_deg: angle, range_m: range },
  })
  lastLaunchAngleDeg.value = null
  lastRangeM.value = null
  await refreshAttempt()
}

const saveObservation = async () => {
  if (!attempt.value) return
  await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/observation`, { step_id: null, text: observationText.value })
}

const saveAnswer = async (questionId: number) => {
  if (!attempt.value) return
  await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/answer`, { question_id: questionId, text: answers.value[questionId] || '' })
}

const submitPractical = async () => {
  if (!attempt.value) return
  submitting.value = true
  try {
    await axios.post(`/api/student/virtual-lab/attempts/${attempt.value.attempt_id}/submit`, {
      conclusion: conclusionText.value,
      graph_x_key: graphRef.value?.xKey || null,
      graph_y_key: graphRef.value?.yKey || null,
    })
    await refreshAttempt()
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  try {
    await Promise.all([loadObjects(), startAttempt()])
  } catch (err) {
    router.push('/student/virtual-lab')
  } finally {
    loading.value = false
  }
})
</script>
