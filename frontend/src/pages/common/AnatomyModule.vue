<template>
  <div>
    <div class="flex items-center gap-3 mb-3">
      <RouterLink :to="`/${role}/anatomy/modules`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to modules">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">{{ mod ? CATEGORY_NAMES[mod.category] : 'Module' }}</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight truncate">{{ mod?.title ?? 'Module not found' }}</h1>
      </div>
    </div>

    <AnatomyErrorState v-if="!mod" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-h-[30vh]" title="Module not found" message="This module does not exist. Go back to the module list." />
    <AnatomyErrorState v-else-if="error" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-h-[30vh]" title="The anatomy model could not be loaded" :message="error" retryable @retry="load" />
    <div v-else-if="!index" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-h-[30vh] flex items-center justify-center" role="status"><p class="text-sm text-gray-500">Loading the anatomy model…</p></div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-[22rem_minmax(0,1fr)] gap-3">
      <!-- Text panel -->
      <aside class="order-2 lg:order-none rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex lg:h-[calc(100vh-10rem)] min-h-0">
        <!-- step rail -->
        <ol v-if="mod.steps" class="hidden sm:flex flex-col gap-2 p-2 border-r border-gray-200 dark:border-gray-700 overflow-y-auto" aria-label="Steps">
          <li v-for="(s, i) in mod.steps" :key="i">
            <button
              type="button"
              class="w-9 h-9 rounded-lg text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              :class="i === stepIndex ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200'"
              :aria-current="i === stepIndex ? 'step' : undefined"
              :aria-label="`Step ${i + 1}: ${s.title}`"
              @click="stepIndex = i"
            >{{ i + 1 }}</button>
          </li>
        </ol>

        <div class="flex-1 min-w-0 flex flex-col">
          <!-- tour -->
          <template v-if="step">
            <div class="flex-1 overflow-y-auto p-4" aria-live="polite">
              <p class="text-[11px] font-bold uppercase tracking-wide text-gray-400">Step {{ stepIndex + 1 }} of {{ mod.steps!.length }}</p>
              <h2 class="text-lg font-bold text-gray-900 dark:text-white mt-0.5">{{ step.title }}</h2>
              <p v-for="(para, i) in step.text" :key="i" class="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                <template v-for="(seg, j) in richText(para)" :key="j"><strong v-if="seg.bold" class="text-gray-900 dark:text-white">{{ seg.text }}</strong><template v-else>{{ seg.text }}</template></template>
              </p>
              <p v-if="picked" class="mt-3 text-xs rounded-lg bg-gray-100 dark:bg-gray-700 px-2.5 py-1.5 text-gray-700 dark:text-gray-200">You clicked: <span class="font-semibold">{{ picked }}</span></p>
              <div v-if="stepIndex === mod.steps!.length - 1 && mod.curriculum.length" class="mt-4">
                <p class="text-xs font-bold text-gray-500">Curriculum topics</p>
                <p class="text-xs text-gray-600 dark:text-gray-300">{{ mod.curriculum.join(' · ') }}</p>
              </div>
            </div>
            <div class="flex items-center justify-between gap-2 p-3 border-t border-gray-200 dark:border-gray-700">
              <button type="button" class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-200 disabled:opacity-40" :disabled="stepIndex === 0" @click="stepIndex--">‹ Back</button>
              <RouterLink v-if="stepIndex === mod.steps!.length - 1" :to="`/${role}/anatomy/modules`" class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Finish</RouterLink>
              <button v-else type="button" class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700" @click="stepIndex++">Next ›</button>
            </div>
          </template>

          <!-- quiz -->
          <template v-else-if="question">
            <div class="flex-1 overflow-y-auto p-4" aria-live="polite">
              <p class="text-sm font-semibold text-gray-900 dark:text-white">Question {{ qIndex + 1 }} <span class="font-normal text-gray-500">of {{ mod.quiz!.length }}</span></p>
              <p class="mt-3 text-sm text-gray-700 dark:text-gray-200">{{ question.prompt }}</p>
              <p class="mt-1 text-xs text-gray-500">Click the structure on the model, then press Submit.</p>
              <p class="mt-3 text-sm">Your choice: <span class="font-semibold text-gray-900 dark:text-white">{{ quizPickName ?? '—' }}</span></p>
              <div v-if="answered" class="mt-3 rounded-xl px-3 py-2 text-sm" :class="answered.correct ? 'bg-green-50 text-green-900 dark:bg-green-900/30 dark:text-green-100' : 'bg-red-50 text-red-900 dark:bg-red-900/30 dark:text-red-100'" role="status">
                <p class="font-bold">{{ answered.correct ? 'Correct!' : 'Not quite.' }}</p>
                <p>{{ question.explain }}<template v-if="!answered.correct"> The correct answer is highlighted.</template></p>
              </div>
            </div>
            <div class="p-3 border-t border-gray-200 dark:border-gray-700">
              <button v-if="!answered" type="button" class="w-full px-3 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 disabled:opacity-50" :disabled="!quizPick" @click="submit">Submit</button>
              <button v-else type="button" class="w-full px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700" @click="nextQuestion">{{ qIndex === mod.quiz!.length - 1 ? 'See my score' : 'Next question' }}</button>
            </div>
          </template>

          <!-- quiz result -->
          <template v-else-if="mod.quiz">
            <div class="flex-1 p-4" role="status">
              <p class="text-[11px] font-bold uppercase tracking-wide text-gray-400">Finished</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ score }} / {{ mod.quiz.length }}</p>
              <ul class="mt-3 space-y-1 text-sm">
                <li v-for="(r, i) in results" :key="i" class="flex gap-2"><span :class="r ? 'text-green-600' : 'text-red-600'">{{ r ? '✓' : '✗' }}</span>{{ mod.quiz[i].prompt }}</li>
              </ul>
            </div>
            <div class="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
              <button type="button" class="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-semibold" @click="restartQuiz">Try again</button>
              <RouterLink :to="`/${role}/anatomy/modules`" class="flex-1 text-center px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">Done</RouterLink>
            </div>
          </template>
        </div>
      </aside>

      <!-- 3D -->
      <section class="order-1 lg:order-none relative rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden h-[52vh] min-h-[320px] lg:h-[calc(100vh-10rem)]">
        <AnatomyViewer
          ref="viewer"
          :index="index"
          :base-url="ANATOMY_BASE"
          :systems="scene.systems"
          :selection="scene.selection"
          :isolate="scene.isolate"
          :see-through="scene.seeThrough"
          :show-sensitive="false"
          :labels-on="scene.labels.length > 0"
          :labels="scene.labels"
          :selected-label-key="null"
          :clip="scene.clip"
          @pick="onPick"
          @load-state="onLoadState"
        >
          <AnatomyLoadingState :states="loadStates" />
          <div class="absolute top-2 right-2 flex gap-1.5">
            <button type="button" class="px-2.5 py-1.5 rounded-lg bg-white/95 dark:bg-gray-900/95 shadow-sm border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200" aria-label="Reset camera for this step" @click="placeCamera">Reset view</button>
          </div>
          <span v-if="scene.clip" class="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-black/55 text-white text-[11px]">Cross-section</span>
        </AnatomyViewer>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { labRoleOf } from '@/components/ictlab/types'
import { moduleById, CATEGORY_NAMES } from '@/anatomy/modules'
import { useAnatomyData, ANATOMY_BASE, richText } from '@/anatomy/useAnatomyData'
import type { ClipSpec, LoadState, SystemKey } from '@/anatomy/types'
import AnatomyViewer, { type LabelSpec } from '@/components/anatomy/AnatomyViewer.vue'
import AnatomyLoadingState from '@/components/anatomy/AnatomyLoadingState.vue'
import AnatomyErrorState from '@/components/anatomy/AnatomyErrorState.vue'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))
const mod = computed(() => moduleById(String(route.params.id)))
const { index, error, load } = useAnatomyData()
onMounted(load)

const viewer = ref<InstanceType<typeof AnatomyViewer> | null>(null)
const loadStates = ref<Partial<Record<SystemKey, LoadState>>>({})
const onLoadState = (s: SystemKey, st: LoadState) => { loadStates.value = { ...loadStates.value, [s]: st } }

// --- tour ---
const stepIndex = ref(0)
const step = computed(() => mod.value?.steps?.[stepIndex.value] ?? null)
const picked = ref<string | null>(null)

// --- quiz ---
const qIndex = ref(0)
const question = computed(() => (mod.value?.quiz && qIndex.value < mod.value.quiz.length) ? mod.value.quiz[qIndex.value] : null)
const quizPick = ref<string | null>(null) // group key
const answered = ref<{ correct: boolean } | null>(null)
const results = ref<boolean[]>([])
const score = computed(() => results.value.filter(Boolean).length)
const quizPickName = computed(() => quizPick.value ? index.value?.group(quizPick.value)?.name ?? null : null)

const idsOf = (keys: string[] = []) => keys.flatMap(k => index.value?.group(k)?.ids ?? [])

/** what the viewer shows for the current step or question */
const scene = computed(() => {
  const empty = { systems: [] as SystemKey[], selection: [] as string[], labels: [] as LabelSpec[], isolate: false, seeThrough: true, clip: null as ClipSpec | null }
  if (!index.value) return empty
  if (step.value) {
    const s = step.value
    const labelKeys = [...new Set([...(s.highlight ?? []), ...(s.labels ?? [])])]
    return {
      systems: s.systems,
      selection: idsOf(s.highlight),
      labels: labelKeys.map(k => ({ key: k, name: index.value!.group(k)?.name ?? k, ids: idsOf([k]) })),
      isolate: !!s.isolate,
      seeThrough: s.seeThrough ?? true,
      clip: s.clip ?? null,
    }
  }
  if (question.value) {
    const q = question.value
    const shownKeys = answered.value && !answered.value.correct ? q.answer : quizPick.value ? [quizPick.value] : []
    return { ...empty, systems: q.systems, selection: idsOf(shownKeys), clip: q.clip ?? null }
  }
  return empty
})

function placeCamera() {
  const v = viewer.value
  if (!v) return
  const s = step.value
  // a cross-section is framed on its labelled organs, seen from the step's side
  const sectionKeys = s?.clip ? [...(s.highlight ?? []), ...(s.labels ?? [])] : []
  if (s?.focus?.length) v.focus(idsOf(s.focus), s.view, s.clip ? 1.25 : undefined)
  else if (sectionKeys.length) v.focus(idsOf(sectionKeys), s!.view)
  else v.setView(step.value?.view ?? question.value?.view ?? 'front')
}
watch([stepIndex, qIndex, () => !!index.value], async () => {
  picked.value = null
  await nextTick()
  // give the viewer a moment to exist on first load
  setTimeout(placeCamera, 50)
}, { immediate: true })

function onPick(id: string | null) {
  const g = id ? index.value?.groupOf(id) : null
  if (step.value) { picked.value = g?.name ?? null; return }
  if (question.value && !answered.value) quizPick.value = g?.key ?? null
}
function submit() {
  if (!question.value || !quizPick.value) return
  const correct = question.value.answer.includes(quizPick.value)
  answered.value = { correct }
  results.value = [...results.value, correct]
}
function nextQuestion() {
  answered.value = null
  quizPick.value = null
  qIndex.value++
}
function restartQuiz() {
  results.value = []
  answered.value = null
  quizPick.value = null
  qIndex.value = 0
}
</script>
