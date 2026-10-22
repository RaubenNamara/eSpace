<template>
  <!-- The computer lab rules: first learn them (tap a card to see why the rule matters), then
       judge everyday situations - allowed or not? A student passes at PASS_MARK; the result is
       saved like any ICT Lab activity. -->
  <div>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
      <RouterLink :to="`/${role}/ict-lab`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the ICT Lab">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">ICT Lab · Start here</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">Computer lab rules</h1>
      </div>
      <div class="w-full sm:w-auto grid grid-cols-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-0.5" role="tablist">
        <button type="button" role="tab" :aria-selected="stage === 'learn'" class="px-3 py-1.5 rounded-lg text-sm font-semibold" :class="stage === 'learn' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'" @click="stage = 'learn'">1 · Learn</button>
        <button type="button" role="tab" :aria-selected="stage !== 'learn'" class="px-3 py-1.5 rounded-lg text-sm font-semibold" :class="stage !== 'learn' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'" @click="startCheck">2 · Check</button>
      </div>
    </div>

    <!-- 1. Learn: every rule as a card; tap to see why -->
    <template v-if="stage === 'learn'">
      <div class="dash-box mb-3">
        <div class="px-4 py-3 flex flex-wrap items-center gap-3">
          <p class="flex-1 min-w-[14rem] text-sm text-gray-700 dark:text-gray-200">
            These rules keep you, your classmates and the computers safe. <b>Tap each rule</b> to see why it matters.
          </p>
          <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 tabular-nums">{{ opened.size }} of {{ LAB_RULES.length }} read</span>
          <div class="w-28 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <div class="h-full bg-indigo-600 transition-all duration-500" :style="{ width: `${(opened.size / LAB_RULES.length) * 100}%` }"></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
        <button
          v-for="(r, i) in LAB_RULES"
          :key="i"
          type="button"
          class="text-left rounded-2xl border p-3.5 transition-all"
          :class="opened.has(i) ? 'border-indigo-300 dark:border-indigo-700 bg-indigo-50/70 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300 hover:shadow-sm'"
          :aria-expanded="opened.has(i)"
          @click="open(i)"
        >
          <div class="flex items-start gap-3">
            <span class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" :class="opened.has(i) ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200'">
              <AppIcon :name="r.icon" class="w-[18px] h-[18px]" />
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-[11px] font-semibold text-gray-400">Rule {{ i + 1 }}</p>
              <p class="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{{ r.rule }}</p>
              <p v-if="opened.has(i)" class="mt-1.5 text-[13px] text-gray-600 dark:text-gray-300"><span class="font-semibold text-indigo-700 dark:text-indigo-300">Why:</span> {{ r.why }}</p>
              <p v-else class="mt-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-300">Tap to see why</p>
            </div>
          </div>
        </button>
      </div>

      <div class="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" class="btn-primary" :disabled="opened.size < LAB_RULES.length" @click="startCheck">Check what I know</button>
        <p v-if="opened.size < LAB_RULES.length" class="text-xs text-gray-500 dark:text-gray-400">Read all {{ LAB_RULES.length }} rules first - {{ LAB_RULES.length - opened.size }} to go.</p>
      </div>
    </template>

    <!-- 2. Check: one situation at a time -->
    <div v-else-if="stage === 'check' && q" class="max-w-2xl mx-auto">
      <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
        <span class="font-semibold">Situation {{ qi + 1 }} of {{ quiz.length }}</span>
        <span class="tabular-nums">{{ right }} right</span>
      </div>
      <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mb-3">
        <div class="h-full bg-indigo-600 transition-all duration-500" :style="{ width: `${(qi / quiz.length) * 100}%` }"></div>
      </div>

      <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 sm:p-6">
        <p class="text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Allowed in the lab, or not?</p>
        <p class="mt-2 text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-snug">{{ q.text }}</p>

        <div class="mt-5 grid grid-cols-2 gap-2.5">
          <button
            v-for="choice in [true, false]"
            :key="String(choice)"
            type="button"
            class="rounded-xl border-2 px-3 py-3.5 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-colors disabled:cursor-default"
            :class="choiceClass(choice)"
            :disabled="picked !== null"
            @click="pick(choice)"
          >
            <svg v-if="choice" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            {{ choice ? 'Allowed' : 'Not allowed' }}
          </button>
        </div>

        <Transition name="dash-pop">
          <div v-if="picked !== null" class="mt-4 rounded-xl p-3.5" :class="picked === q.allowed ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100' : 'bg-rose-50 text-rose-900 dark:bg-rose-900/30 dark:text-rose-100'">
            <p class="text-sm font-bold">{{ picked === q.allowed ? 'Right!' : 'Not quite.' }} {{ q.allowed ? 'This is allowed.' : 'This is not allowed.' }}</p>
            <p class="text-sm mt-0.5">{{ q.explain }}</p>
            <p class="text-xs mt-1.5 opacity-80">Rule {{ q.rule + 1 }}: {{ LAB_RULES[q.rule].rule }}</p>
            <div class="mt-3 flex justify-end">
              <button type="button" class="btn-primary !py-1.5 !text-sm" @click="next">{{ qi + 1 < quiz.length ? 'Next situation' : 'See my result' }}</button>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- 3. The result -->
    <div v-else-if="stage === 'done'" class="max-w-xl mx-auto">
      <div class="rounded-2xl border p-6 text-center" :class="passed ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-700' : 'border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700'">
        <span class="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center" :class="passed ? 'bg-indigo-600 text-white' : 'bg-amber-500 text-white'">
          <AppIcon :name="passed ? 'medal' : 'bulb'" class="w-7 h-7" />
        </span>
        <p class="mt-3 text-3xl font-bold text-gray-900 dark:text-white tabular-nums">{{ score }}%</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">{{ right }} of {{ quiz.length }} situations right</p>
        <p class="mt-3 text-base font-semibold" :class="passed ? 'text-indigo-800 dark:text-indigo-200' : 'text-amber-800 dark:text-amber-200'">
          {{ passed ? 'You have your lab pass - you know how to keep safe in the computer lab.' : `You need ${PASS_MARK}% to pass. Look over the rules you missed and try again.` }}
        </p>
        <p v-if="role !== 'student'" class="mt-1 text-xs text-gray-500">Practice - results are only saved for students.</p>
        <div v-if="missed.length" class="mt-4 text-left rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3">
          <p class="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">Rules to look at again</p>
          <ul class="space-y-1">
            <li v-for="i in missed" :key="i" class="text-sm text-gray-800 dark:text-gray-100 flex gap-2"><AppIcon :name="LAB_RULES[i].icon" class="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-600" />{{ LAB_RULES[i].rule }}</li>
          </ul>
        </div>
        <div class="mt-5 flex flex-wrap justify-center gap-2">
          <button type="button" class="btn-secondary" @click="stage = 'learn'">Read the rules</button>
          <button type="button" class="btn-secondary" @click="startCheck">Try again</button>
          <RouterLink v-if="passed" :to="`/${role}/ict-lab/hazards`" class="btn-primary">Now spot the hazards</RouterLink>
          <RouterLink v-else :to="`/${role}/ict-lab`" class="btn-primary">Go to the ICT Lab</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import { LAB_RULES, LAB_SCENARIOS, PASS_MARK, RULES_KEY, type LabScenario } from '@/components/ictlab/labRules'
import { labRoleOf } from '@/components/ictlab/types'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))
const QUESTIONS = 10

const stage = ref<'learn' | 'check' | 'done'>('learn')
const opened = ref(new Set<number>())
const open = (i: number) => {
  const s = new Set(opened.value)
  s.add(i)
  opened.value = s
}

const quiz = ref<LabScenario[]>([])
const qi = ref(0)
const picked = ref<boolean | null>(null)
const right = ref(0)
const missed = ref<number[]>([])
const startedAt = ref(0)
const q = computed(() => quiz.value[qi.value] || null)
const score = computed(() => Math.round((right.value / Math.max(1, quiz.value.length)) * 100))
const passed = computed(() => score.value >= PASS_MARK)

function startCheck() {
  // a fresh mix each time, some allowed and some not
  quiz.value = [...LAB_SCENARIOS].sort(() => Math.random() - 0.5).slice(0, QUESTIONS)
  qi.value = 0
  picked.value = null
  right.value = 0
  missed.value = []
  startedAt.value = Date.now()
  stage.value = 'check'
}

function pick(choice: boolean) {
  if (picked.value !== null || !q.value) return
  picked.value = choice
  if (choice === q.value.allowed) right.value++
  else if (!missed.value.includes(q.value.rule)) missed.value.push(q.value.rule)
}

function choiceClass(choice: boolean) {
  if (picked.value === null) return 'border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:border-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20'
  if (q.value && choice === q.value.allowed) return 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
  if (choice === picked.value) return 'border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200'
  return 'border-gray-200 dark:border-gray-700 text-gray-400'
}

async function next() {
  if (qi.value + 1 < quiz.value.length) {
    qi.value++
    picked.value = null
    return
  }
  stage.value = 'done'
  if (role.value !== 'student') return
  try {
    // An attempt scores 100 - 5 per mistake, so each wrong answer counts as two: 10 questions, 10% each
    await axios.post('/api/student/ict-lab/attempts', {
      activity_key: RULES_KEY,
      level: 'simple',
      steps_total: quiz.value.length,
      mistakes: (quiz.value.length - right.value) * 2,
      hints_used: 0,
      duration_seconds: Math.round((Date.now() - startedAt.value) / 1000)
    })
  } catch {
    // the result still shows; it just is not kept
  }
}
</script>
