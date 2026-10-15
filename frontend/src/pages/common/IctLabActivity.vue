<template>
  <div v-if="activity">
    <!-- Title, level and progress -->
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
      <RouterLink :to="`/${role}/ict-lab`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the ICT Lab">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">ICT Lab · {{ activity.topic }}</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight truncate">{{ activity.title }}</h1>
      </div>
      <div class="w-full sm:w-auto grid grid-cols-3 sm:flex rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-0.5" role="tablist" aria-label="Level">
        <button
          v-for="l in LEVELS"
          :key="l.key"
          type="button"
          role="tab"
          :aria-selected="level === l.key"
          class="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
          :class="level === l.key ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
          :title="l.blurb"
          @click="setLevel(l.key)"
        >{{ l.label }}</button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-4 items-start">
      <!-- The current step (first on a phone) -->
      <aside class="lg:order-2 space-y-3 lg:sticky lg:top-20">
        <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span class="font-semibold">Step {{ Math.min(stepIndex + 1, steps.length) }} of {{ steps.length }}</span>
            <span class="tabular-nums">{{ clock }} · {{ mistakes }} mistake{{ mistakes === 1 ? '' : 's' }}</span>
          </div>
          <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mb-3">
            <div class="h-full bg-indigo-600 transition-all duration-500" :style="{ width: `${(stepIndex / steps.length) * 100}%` }"></div>
          </div>

          <template v-if="current">
            <p v-if="stepIndex === 0" class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ levelDef.intro }}</p>
            <Transition name="step-swap" mode="out-in">
              <div :key="current.key">
                <h2 class="text-base font-bold text-gray-900 dark:text-white">{{ current.title }}</h2>
                <p class="text-sm text-gray-700 dark:text-gray-200 mt-1">{{ current.text }}</p>

                <p v-if="current.hint && (level === 'simple' || hintShown || assist)" class="mt-2 text-xs rounded-lg px-2.5 py-1.5 bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200" :class="assist && level !== 'simple' ? 'ring-2 ring-amber-300 dark:ring-amber-700' : ''">
                  <AppIcon name="bulb" class="w-3.5 h-3.5 inline -mt-0.5" />
                  <span v-if="assist && !hintShown && level !== 'simple'" class="font-semibold mr-1">{{ assistReason }}</span>{{ current.hint }}
                </p>
                <button v-else-if="current.hint" type="button" class="mt-2 text-xs font-semibold text-amber-700 dark:text-amber-300 hover:underline" @click="showHint">
                  Show a hint (-3 points)
                </button>

                <!-- Notes teachers linked to this step -->
                <div v-for="l in stepLinks(current.key)" :key="l.enote_topic_id + '-' + l.step_key" class="mt-2">
                  <a :href="noteHref(l)" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">
                    <AppIcon name="document" class="w-3.5 h-3.5" />Read about this: {{ l.topic_title }}<template v-if="l.page_number"> · page {{ l.page_number }}</template>
                  </a>
                </div>
              </div>
            </Transition>
          </template>

          <!-- What just happened -->
          <Transition name="fade">
            <p
              v-if="feedback"
              :key="feedback.id"
              class="mt-3 text-sm rounded-xl px-3 py-2 font-medium"
              :class="feedback.tone === 'good' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200' : feedback.tone === 'bad' ? 'bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'"
              role="status"
            >{{ feedback.text }}</p>
          </Transition>
        </div>

        <!-- Every step: done, now, still to come -->
        <ol class="hidden lg:block rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 space-y-1">
          <li v-for="(s, i) in steps" :key="s.key" class="flex items-center gap-2 rounded-lg px-1.5 py-1" :class="i === stepIndex ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''">
            <span class="w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold"
              :class="i < stepIndex ? 'bg-emerald-500 text-white' : i === stepIndex ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'">
              <svg v-if="i < stepIndex" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
              <template v-else>{{ i + 1 }}</template>
            </span>
            <span class="flex-1 min-w-0 text-xs truncate" :class="i <= stepIndex ? 'text-gray-800 dark:text-gray-100 font-medium' : 'text-gray-400'">
              {{ i <= stepIndex || role !== 'student' || level === 'simple' ? s.title : 'Still to come' }}
            </span>
            <button
              v-if="role === 'teacher'"
              type="button"
              class="flex-shrink-0 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              :class="myLink(s.key) ? 'text-indigo-600 dark:text-indigo-300' : 'text-gray-300 dark:text-gray-500'"
              :title="myLink(s.key) ? `Linked: ${myLink(s.key)!.topic_title}` : 'Link this step to my notes'"
              @click="linking = s"
            >
              <AppIcon name="document" class="w-3.5 h-3.5" />
            </button>
          </li>
        </ol>
        <p v-if="role === 'teacher'" class="hidden lg:block text-[11px] text-gray-500 dark:text-gray-400 px-1">
          Tap the page icon beside a step to link it to one of your eNotes - students on that step get "Read about this".
        </p>
        <p v-else-if="role !== 'student'" class="text-[11px] text-gray-500 dark:text-gray-400 px-1">Practice - your attempts are not saved.</p>
      </aside>

      <!-- The activity itself -->
      <section class="lg:order-1 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4">
        <Pc3DScene v-if="activity.scene === 'parts'" :key="`p-${level}-${run}`" mode="parts" :step="sceneStep" :guide="level === 'simple' || assist" :done="done" :level="level" @act="onAct" @mistake="onMistake" />
        <Rj45Scene v-else-if="activity.scene === 'rj45'" :key="`${level}-${run}`" :step="sceneStep" :guide="level === 'simple' || assist" :done="done" :level="level" @act="onAct" @mistake="onMistake" />
        <Pc3DScene v-else-if="activity.scene === 'assembly'" :key="`a-${level}-${run}`" mode="assembly" :step="sceneStep" :guide="level === 'simple' || assist" :done="sceneDone" :level="level" @act="onAct" @mistake="onMistake" />
        <CleaningScene3D v-else-if="activity.scene === 'cleaning'" :key="`c-${level}-${run}`" :step="sceneStep" :guide="level === 'simple' || assist" :done="done" :level="level" @act="onAct" @mistake="onMistake" />
        <TroubleshootScene3D v-else-if="activity.scene === 'troubleshoot'" :key="`t-${level}-${run}`" :step="sceneStep" :guide="level === 'simple' || assist" :done="done" :level="level" @act="onAct" @mistake="onMistake" />
      </section>
    </div>

    <!-- Finished -->
    <div v-if="finished" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div class="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-2xl font-extrabold"
          :class="score >= 80 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200'">
          {{ score }}
        </div>
        <h2 class="mt-3 text-lg font-bold text-gray-900 dark:text-white">{{ score >= 80 ? 'Well done!' : 'Finished!' }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {{ activity.title }} · {{ levelLabel }}<br>
          {{ steps.length }} steps in {{ clock }} · {{ mistakes }} mistake{{ mistakes === 1 ? '' : 's' }} · {{ hints }} hint{{ hints === 1 ? '' : 's' }}
        </p>
        <p v-if="role === 'student'" class="text-xs mt-2" :class="saveState === 'failed' ? 'text-rose-600' : 'text-gray-400'">
          {{ saveState === 'saving' ? 'Saving your result…' : saveState === 'saved' ? 'Your result is saved.' : saveState === 'failed' ? 'Your result could not be saved.' : '' }}
        </p>
        <div class="mt-5 flex flex-col gap-2">
          <button v-if="nextLevel" type="button" class="btn-primary" @click="setLevel(nextLevel.key)">Try {{ nextLevel.label }}</button>
          <button type="button" :class="nextLevel ? 'btn-secondary' : 'btn-primary'" @click="restart">Do it again</button>
          <RouterLink :to="`/${role}/ict-lab`" class="text-sm font-semibold text-indigo-600 dark:text-indigo-300 hover:underline mt-1">Back to the ICT Lab</RouterLink>
        </div>
      </div>
    </div>

    <StepLinkModal
      v-if="linking"
      :activity-key="activity.key"
      :step-key="linking.key"
      :step-title="linking.title"
      :current="myLink(linking.key)"
      @close="linking = null"
      @saved="onLinkSaved"
    />
  </div>
  <EmptyState v-else title="Activity not found" message="This ICT Lab activity does not exist." icon="kit" />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Rj45Scene from '@/components/ictlab/Rj45Scene.vue'
import Pc3DScene from '@/components/ictlab/Pc3DScene.vue'
import CleaningScene3D from '@/components/ictlab/CleaningScene3D.vue'
import TroubleshootScene3D from '@/components/ictlab/TroubleshootScene3D.vue'
import StepLinkModal from '@/components/ictlab/StepLinkModal.vue'
import { LEVELS, activityByKey, type IctLevel, type IctStep } from '@/components/ictlab/activities'
import { labRoleOf, type IctLink } from '@/components/ictlab/types'

const route = useRoute()
const router = useRouter()
const role = computed(() => labRoleOf(route.path))
const activity = computed(() => activityByKey(String(route.params.activity || '')))

const isLevel = (v: unknown): v is IctLevel => v === 'simple' || v === 'intermediate' || v === 'advanced'
const level = computed<IctLevel>(() => (isLevel(route.query.level) ? route.query.level : 'simple'))
const levelDef = computed(() => activity.value!.levels[level.value])
const levelLabel = computed(() => LEVELS.find(l => l.key === level.value)?.label || '')
const nextLevel = computed(() => LEVELS[LEVELS.findIndex(l => l.key === level.value) + 1] || null)
const steps = computed(() => (activity.value ? levelDef.value.steps : []))

// ---- the run ----
const run = ref(0)
const stepIndex = ref(0)
const done = ref<string[]>([])
const mistakes = ref(0)
const hints = ref(0)
const hintShown = ref(false)
const finished = ref(false)
const startedAt = ref(Date.now())
const now = ref(Date.now())
const current = computed<IctStep | null>(() => steps.value[stepIndex.value] || null)
// Once finished the scene stays on the last step (e.g. the second cable end), not back at the start
const sceneStep = computed(() => current.value ?? steps.value[steps.value.length - 1] ?? null)
// What the scene draws: the level's starting point (e.g. the motherboard already in), then the work done
const sceneDone = computed(() => [...(activity.value ? levelDef.value.preset || [] : []), ...done.value])

let feedbackId = 0
const feedback = ref<{ id: number; tone: 'good' | 'bad' | 'info'; text: string } | null>(null)
const say = (tone: 'good' | 'bad' | 'info', text: string) => { feedback.value = { id: ++feedbackId, tone, text } }

const restart = () => {
  run.value++
  stepIndex.value = 0
  done.value = []
  mistakes.value = 0
  hints.value = 0
  hintShown.value = false
  finished.value = false
  feedback.value = null
  saveState.value = 'idle'
  startedAt.value = Date.now()
  now.value = Date.now()
}
const setLevel = (key: IctLevel) => {
  if (key === level.value) restart()
  else router.replace({ query: { ...route.query, level: key } })
}
watch(() => [route.params.activity, level.value], restart)

let ticker: ReturnType<typeof setInterval> | null = null
onMounted(() => { ticker = setInterval(() => { if (!finished.value) now.value = Date.now() }, 1000) })
onBeforeUnmount(() => { if (ticker) clearInterval(ticker) })
const seconds = computed(() => Math.max(0, Math.round((now.value - startedAt.value) / 1000)))
const clock = computed(() => `${Math.floor(seconds.value / 60)}:${String(seconds.value % 60).padStart(2, '0')}`)

const onAct = (action: string, wrongMessage?: string) => {
  const step = current.value
  if (finished.value || !step) return
  if (action === step.action) {
    done.value = [...done.value, action]
    const t = `${step.title.charAt(0).toLowerCase()}${step.title.slice(1)}`
    say('good', `Done - ${t}${/[.?!]$/.test(t) ? '' : '.'}`)
    stepIndex.value++
    hintShown.value = false
    if (stepIndex.value >= steps.value.length) finish()
    return
  }
  if (done.value.includes(action)) {
    say('info', 'You have already done that one.')
    return
  }
  // The step's own lesson for this mistake first (e.g. "unplug it before touching anything"),
  // then what the scene saw, then a plain "not yet"
  const why = step.wrong?.[action] ?? step.wrong?.['*']
  onMistake(why || wrongMessage || `Not yet - first: ${step.title.charAt(0).toLowerCase()}${step.title.slice(1)}.`)
}
const onMistake = (message: string) => {
  if (finished.value) return
  mistakes.value++
  stepMistakes.value++
  if (stepMistakes.value >= 2 && !assist.value && current.value?.hint) {
    assist.value = true
    assistReason.value = 'Two tries - here is a hint:'
    say('bad', `${message} Look at the hint - what to use is now glowing.`)
    return
  }
  say('bad', message)
}
const showHint = () => {
  hints.value++
  hintShown.value = true
}

// ---- help without asking: two mistakes on a step, or a long time stuck on it ----
// The hint shows (free - it was not asked for) and what to use glows, at every level.
const STUCK_SECONDS = 45
const stepMistakes = ref(0)
const stepStartedAt = ref(Date.now())
const assist = ref(false)
const assistReason = ref('')
watch(stepIndex, () => {
  stepMistakes.value = 0
  stepStartedAt.value = Date.now()
  assist.value = false
})
watch(now, () => {
  if (assist.value || finished.value || !current.value?.hint) return
  if ((now.value - stepStartedAt.value) / 1000 >= STUCK_SECONDS) {
    assist.value = true
    assistReason.value = 'Stuck? Here is some help:'
  }
})

// ---- finishing ----
const score = computed(() => Math.max(0, 100 - mistakes.value * 5 - hints.value * 3))
const saveState = ref<'idle' | 'saving' | 'saved' | 'failed'>('idle')
const finish = async () => {
  now.value = Date.now()
  finished.value = true
  if (role.value !== 'student' || !activity.value) return
  saveState.value = 'saving'
  try {
    await axios.post('/api/student/ict-lab/attempts', {
      activity_key: activity.value.key,
      level: level.value,
      steps_total: steps.value.length,
      mistakes: mistakes.value,
      hints_used: hints.value,
      duration_seconds: seconds.value
    })
    saveState.value = 'saved'
  } catch {
    saveState.value = 'failed'
  }
}

// ---- notes linked to steps ----
const links = ref<IctLink[]>([])
onMounted(async () => {
  if (role.value !== 'student' && role.value !== 'teacher') return
  try {
    const res = await axios.get(`/api/${role.value}/ict-lab`)
    links.value = res.data.data.links || []
  } catch {
    // the activity works without them
  }
})
const stepLinks = (stepKey: string) => links.value.filter(l => l.activity_key === activity.value?.key && l.step_key === stepKey)
const myLink = (stepKey: string) => (role.value === 'teacher' ? stepLinks(stepKey)[0] || null : null)
const noteHref = (l: IctLink) => {
  const base = role.value === 'student' ? `/student/enotes/${l.enote_topic_id}` : `/teacher/enotes/preview/${l.enote_topic_id}`
  return router.resolve({ path: base, query: l.enote_page_id ? { resumePage: String(l.enote_page_id) } : {} }).href
}

const linking = ref<IctStep | null>(null)
const onLinkSaved = (link: IctLink | null) => {
  const step = linking.value
  if (step && activity.value) {
    links.value = links.value.filter(l => !(l.activity_key === activity.value!.key && l.step_key === step.key))
    if (link) links.value.push(link)
  }
  linking.value = null
}
</script>

<style scoped>
.step-swap-enter-active, .step-swap-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.step-swap-enter-from { opacity: 0; transform: translateY(6px); }
.step-swap-leave-to { opacity: 0; transform: translateY(-6px); }
.fade-enter-active { transition: opacity 0.25s ease; }
.fade-enter-from { opacity: 0; }
</style>
