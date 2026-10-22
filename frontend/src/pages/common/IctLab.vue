<template>
  <div>
    <PageHeader
      title="ICT Lab"
      :description="role === 'teacher'
        ? 'Hands-on computer activities, step by step. Open one to try it, and link its steps to your eNotes.'
        : 'Hands-on computer activities, step by step - at a Simple, Intermediate or Advanced level.'"
      icon="keyboard"
      accent="indigo"
    />

    <!-- Start here: 1. the lab rules, 2. the parts and devices -->
    <div class="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
      <RouterLink
        :to="`/${role}/ict-lab/rules`"
        class="flex items-center gap-4 rounded-2xl border p-4 hover:shadow-md transition-shadow"
        :class="!rulesDue ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800' : 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20'"
      >
        <span class="w-12 h-12 rounded-2xl text-white flex items-center justify-center flex-shrink-0 shadow-sm" :class="!rulesDue ? 'bg-indigo-600' : 'bg-amber-500'"><AppIcon :name="rulesPassed ? 'check-circle' : 'warning'" class="w-6 h-6" /></span>
        <div class="min-w-0 flex-1">
          <p class="text-[11px] font-bold uppercase tracking-wide" :class="!rulesDue ? 'text-indigo-600 dark:text-indigo-300' : 'text-amber-700 dark:text-amber-300'">Step 1 · Start here</p>
          <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">Computer lab rules</p>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{ rulesPassed ? `Lab pass earned - best ${rulesBest}%. Look over the rules any time.` : 'How to stay safe and look after the computers. Learn the 12 rules, then judge real situations to earn your lab pass.' }}
          </p>
        </div>
        <svg class="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </RouterLink>

      <!-- The showroom: every major part, and the devices around a computer, in 3D on their own -->
      <div class="flex items-center gap-4 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-900/20 p-4">
        <span class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm"><AppIcon name="photo" class="w-6 h-6" /></span>
        <div class="min-w-0 flex-1">
          <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Step 2 · Know the computer</p>
          <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">Parts and devices showroom</p>
          <p class="text-sm text-gray-600 dark:text-gray-300">Every part inside a computer and 22 devices around it, in HD 3D. Tap the numbers to look closely at each detail.</p>
          <div class="mt-2 flex flex-wrap items-center gap-2">
            <RouterLink :to="`/${role}/ict-lab/showroom`" class="btn-primary !py-1.5 !text-sm">Explore</RouterLink>
            <RouterLink :to="{ path: `/${role}/ict-lab/showroom`, query: { quiz: 1 } }" class="btn-secondary !py-1.5 !text-sm">Test yourself</RouterLink>
            <span v-if="quizBest !== null" class="text-xs font-bold" :class="quizBest >= 80 ? 'text-emerald-600 dark:text-emerald-300' : 'text-amber-600 dark:text-amber-300'">Best {{ quizBest }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-4 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3">
    <!-- Spot the hazard: the lab rules put to use in a 3D computer room -->
    <RouterLink
      :to="`/${role}/ict-lab/hazards`"
      class="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md hover:border-indigo-300 transition"
    >
      <span class="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm"><AppIcon name="warning" class="w-6 h-6" /></span>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Safety game · 2 minutes</p>
        <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">Spot the hazard</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">A computer lab in 3D with 8 dangers hidden round it - a drink by a keyboard, an overloaded socket, a damaged cable. Find them all before time runs out.</p>
        <p v-if="hazardsBest !== null" class="mt-1 text-xs font-bold" :class="hazardsBest >= 80 ? 'text-emerald-600 dark:text-emerald-300' : 'text-amber-600 dark:text-amber-300'">Best {{ hazardsBest }}%</p>
      </div>
      <svg class="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </RouterLink>

    <!-- Online safety: scams, fake websites, passwords -->
    <RouterLink
      :to="`/${role}/ict-lab/online-safety`"
      class="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md hover:border-indigo-300 transition"
    >
      <span class="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center flex-shrink-0 shadow-sm"><AppIcon name="key" class="w-6 h-6" /></span>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Safety · 3 parts</p>
        <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">Is it safe online?</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">Sort an inbox of real and scam messages, spot fake websites from the address bar, and test how strong a password is.</p>
        <p v-if="safetyDone" class="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-300">{{ safetyDone }} of 3 parts done</p>
      </div>
      <svg class="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </RouterLink>

    <!-- Computer networks: build one, room by room -->
    <RouterLink
      :to="`/${role}/ict-lab/network`"
      class="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md hover:border-indigo-300 transition"
    >
      <span class="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm"><AppIcon name="users" class="w-6 h-6" /></span>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Computer networks · 5 missions</p>
        <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">Build a network</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">Place computers, a switch, a printer, a router and Wi-Fi in a classroom, run the cables, then ping and watch the data travel. Find and fix a broken network.</p>
        <p v-if="networkDone" class="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-300">{{ networkDone }} of 5 missions done</p>
      </div>
      <svg class="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </RouterLink>

    <!-- Boot-up and BIOS: power to desktop, and two start-up faults to fix -->
    <RouterLink
      :to="`/${role}/ict-lab/boot`"
      class="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md hover:border-indigo-300 transition"
    >
      <span class="w-12 h-12 rounded-2xl bg-blue-900 text-white flex items-center justify-center flex-shrink-0 shadow-sm font-mono text-[10px] font-bold leading-tight text-center">BIOS</span>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">How a computer works · 4 parts</p>
        <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">Boot-up and BIOS</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">Watch a computer start - power, POST, boot device, operating system - then fix "no boot device" in BIOS Setup and a clock that keeps resetting.</p>
        <p v-if="bootDone" class="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-300">{{ bootDone }} of 4 parts done</p>
      </div>
      <svg class="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </RouterLink>

    <!-- Binary and storage: bits, bytes, letters as numbers, KB to TB -->
    <RouterLink
      :to="`/${role}/ict-lab/binary`"
      class="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md hover:border-indigo-300 transition"
    >
      <span class="w-12 h-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm font-mono text-sm font-bold">101</span>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">How a computer works · 3 parts</p>
        <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">Binary and storage</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">Flip 8 light switches to count in binary, spell your name in 1s and 0s, and fill a flash disk to feel KB, MB and GB.</p>
        <p v-if="binaryDone" class="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-300">{{ binaryDone }} of 3 parts done</p>
      </div>
      <svg class="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </RouterLink>

    <!-- How a computer works: one key press followed through the computer -->
    <RouterLink
      :to="`/${role}/ict-lab/journey`"
      class="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md hover:border-indigo-300 transition"
    >
      <span class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm"><AppIcon name="bolt" class="w-6 h-6" /></span>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">How a computer works</p>
        <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">Inside a computer: the journey of one key</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">Press a letter and follow it in 3D - keyboard, cable, motherboard, processor, memory, graphics card, monitor and hard disk. Input, process, output and storage.</p>
        <p v-if="journeyBest !== null" class="mt-1 text-xs font-bold" :class="journeyBest >= 80 ? 'text-emerald-600 dark:text-emerald-300' : 'text-amber-600 dark:text-amber-300'">Best {{ journeyBest }}%</p>
      </div>
      <svg class="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </RouterLink>

    <!-- The typing tutor: a skill to practise every lesson -->
    <RouterLink
      :to="`/${role}/ict-lab/typing`"
      class="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md hover:border-indigo-300 transition"
    >
      <span class="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center flex-shrink-0 shadow-sm"><AppIcon name="keyboard" class="w-6 h-6" /></span>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Every lesson · 5 minutes</p>
        <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">Typing tutor</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">Learn to type without looking: 16 lessons from the home row to a one-minute speed test. The key to press lights up, and the hand shows which finger to use.</p>
      </div>
      <div v-if="typingDone" class="hidden sm:block text-right flex-shrink-0">
        <p class="text-xl font-bold text-gray-900 dark:text-white tabular-nums">{{ typingWpm }} <span class="text-xs font-semibold text-gray-500">wpm</span></p>
        <p class="text-[11px] text-gray-500">{{ typingDone }} of 16 lessons passed</p>
      </div>
      <svg class="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </RouterLink>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <article
        v-for="a in ACTIVITIES"
        :key="a.key"
        class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 flex flex-col"
      >
        <div class="flex items-start gap-3">
          <span class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <AppIcon :name="a.icon" class="w-6 h-6" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">{{ a.topic }}</p>
            <h2 class="text-lg font-bold text-gray-900 dark:text-white leading-snug">{{ a.title }}</h2>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{{ a.summary }}</p>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-3 gap-2">
          <RouterLink
            v-for="l in LEVELS"
            :key="l.key"
            :to="{ path: `/${role}/ict-lab/${a.key}`, query: { level: l.key } }"
            class="group rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2.5 hover:border-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20 transition-colors"
            :title="l.blurb"
          >
            <p class="text-sm font-bold text-gray-900 dark:text-white">{{ l.label }}</p>
            <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ a.levels[l.key].steps.length }} steps</p>
            <p v-if="best(a.key, l.key) !== null" class="mt-1 text-[11px] font-bold" :class="(best(a.key, l.key) ?? 0) >= 80 ? 'text-emerald-600 dark:text-emerald-300' : 'text-amber-600 dark:text-amber-300'">
              Best {{ best(a.key, l.key) }}%
            </p>
            <p v-else-if="role === 'student'" class="mt-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-300 group-hover:underline">Start</p>
            <p v-else class="mt-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-300 group-hover:underline">Try it</p>
          </RouterLink>
        </div>

        <p v-if="role === 'teacher' && linkCount(a.key)" class="mt-3 text-xs text-gray-500 dark:text-gray-400">
          <AppIcon name="document" class="w-3.5 h-3.5 inline -mt-0.5" /> {{ linkCount(a.key) }} step{{ linkCount(a.key) === 1 ? '' : 's' }} linked to your eNotes
        </p>
      </article>
    </div>

    <h2 v-if="COMING.length" class="mt-8 mb-2 text-sm font-bold text-gray-900 dark:text-white">Coming next</h2>
    <div v-if="COMING.length" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div v-for="c in COMING" :key="c.title" class="rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 p-4">
        <div class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 flex items-center justify-center"><AppIcon :name="c.icon" class="w-4 h-4" /></span>
          <p class="font-semibold text-gray-800 dark:text-gray-100">{{ c.title }}</p>
        </div>
        <p class="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{{ c.summary }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { ACTIVITIES, COMING, LEVELS, type IctLevel } from '@/components/ictlab/activities'
import { labRoleOf, type IctLink, type IctProgress } from '@/components/ictlab/types'
import { PASS_MARK, RULES_KEY } from '@/components/ictlab/labRules'
import { TYPING_PASS } from '@/components/ictlab/typing'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))

const progress = ref<IctProgress[]>([])
const links = ref<IctLink[]>([])

onMounted(async () => {
  if (role.value !== 'student' && role.value !== 'teacher') return
  try {
    const res = await axios.get(`/api/${role.value}/ict-lab`)
    progress.value = res.data.data.progress || []
    links.value = res.data.data.links || []
  } catch {
    // the activities still work without scores and links
  }
})

const best = (activity: string, level: IctLevel) => progress.value.find(p => p.activity_key === activity && p.level === level)?.best ?? null
const rulesBest = computed(() => best(RULES_KEY, 'simple'))
const rulesPassed = computed(() => (rulesBest.value ?? 0) >= PASS_MARK)
// Only a student who has not passed yet sees the rules card in amber
const rulesDue = computed(() => role.value === 'student' && !rulesPassed.value)
const quizBest = computed(() => best('parts-quiz', 'simple'))
const journeyBest = computed(() => best('journey', 'simple'))
const hazardsBest = computed(() => best('hazards', 'simple'))
const bootDone = computed(() => progress.value.filter(p => p.activity_key.startsWith('boot-')).length)
const safetyDone = computed(() => progress.value.filter(p => p.activity_key.startsWith('safety-')).length)
const binaryDone = computed(() => progress.value.filter(p => p.activity_key.startsWith('binary-')).length)
const networkDone = computed(() => progress.value.filter(p => p.activity_key.startsWith('network-')).length)
// The typing tutor: lessons passed and the best speed
const typingRows = computed(() => progress.value.filter(p => p.activity_key.startsWith('typing-')))
const typingDone = computed(() => typingRows.value.filter(p => p.best >= TYPING_PASS).length)
const typingWpm = computed(() => Math.max(0, ...typingRows.value.map(p => p.best_wpm ?? 0)))
const linkCount = (activity: string) => links.value.filter(l => l.activity_key === activity).length
</script>
