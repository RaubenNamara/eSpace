<template>
  <!-- Try it: a small class Learning Map. Each "Mark" fills in one outcome for every learner, the
       way marking a real LOA does, and the class view says what to reteach. Sample learners. -->
  <div class="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-4 sm:p-6 text-slate-900 dark:text-white">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-slate-400">S.1 Physics · Measurements</p>
        <p class="font-jakarta text-lg font-bold">Class Learning Map</p>
      </div>
      <div class="flex gap-2">
        <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition" :disabled="marked >= OUTCOMES.length || busy" @click="markNext">
          {{ marked >= OUTCOMES.length ? 'All marked' : `Mark LOA ${marked + 1}` }}
        </button>
        <button v-if="marked" type="button" class="px-3 py-2 rounded-xl text-sm font-semibold border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300" @click="reset">Reset</button>
      </div>
    </div>

    <div class="mt-5 overflow-x-auto [scrollbar-width:thin]">
      <table class="w-full min-w-[30rem] border-separate border-spacing-1.5">
        <thead>
          <tr>
            <th class="w-28 sm:w-36 text-left text-xs font-semibold text-slate-400 pr-2">Learner</th>
            <th v-for="(o, j) in OUTCOMES" :key="o" class="text-[11px] font-semibold text-slate-500 dark:text-slate-400" :class="flagged === j ? 'text-rose-600 dark:text-rose-300' : ''" :title="o">LO{{ j + 1 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(l, i) in LEARNERS" :key="l">
            <td class="pr-2 text-sm font-medium whitespace-nowrap">{{ l }}</td>
            <td v-for="(o, j) in OUTCOMES" :key="o">
              <span class="block h-8 rounded-lg transition-all duration-500" :class="cellClass(i, j)" :style="{ transitionDelay: `${i * 70}ms` }"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4 grid sm:grid-cols-[auto_1fr] gap-4 items-center">
      <div class="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-emerald-500"></span>Achieved</span>
        <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-400"></span>Nearly</span>
        <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-rose-500"></span>Not yet</span>
      </div>
      <Transition name="fade" mode="out-in">
        <p :key="message" class="text-sm sm:text-right" :class="flagged >= 0 ? 'text-rose-700 dark:text-rose-300 font-semibold' : 'text-slate-600 dark:text-slate-300'">{{ message }}</p>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Sample class - not real learners
const LEARNERS = ['Ashley N.', 'Brian K.', 'Faith M.', 'Daniel O.', 'Grace A.', 'Joel W.']
const OUTCOMES = ['Reads a metre rule', 'Uses a vernier caliper', 'Uses a micrometer', 'Avoids parallax error', 'Measures volume', 'Measures mass']
// What each learner gets on each outcome: g achieved, a nearly, r not yet
const RESULTS = [
  ['g', 'g', 'a', 'g', 'g', 'g'],
  ['g', 'a', 'r', 'g', 'g', 'a'],
  ['g', 'g', 'r', 'a', 'g', 'g'],
  ['a', 'g', 'r', 'g', 'a', 'g'],
  ['g', 'g', 'a', 'g', 'g', 'g'],
  ['g', 'r', 'r', 'a', 'g', 'g']
]
const TONE: Record<string, string> = { g: 'bg-emerald-500', a: 'bg-amber-400', r: 'bg-rose-500' }

const marked = ref(0)
const busy = ref(false)
const cellClass = (i: number, j: number) => (j < marked.value ? TONE[RESULTS[i][j]] : 'bg-slate-100 dark:bg-white/5')

// The marked outcome most of the class has not got yet
const flagged = computed(() => {
  for (let j = 0; j < marked.value; j++) if (RESULTS.filter(r => r[j] === 'r').length >= 3) return j
  return -1
})
const achievedPct = computed(() => {
  if (!marked.value) return 0
  let got = 0
  for (const r of RESULTS) for (let j = 0; j < marked.value; j++) if (r[j] === 'g') got++
  return Math.round((got / (RESULTS.length * marked.value)) * 100)
})
const message = computed(() => {
  if (!marked.value) return 'Mark an assessment to fill in the map.'
  if (flagged.value >= 0) {
    const n = RESULTS.filter(r => r[flagged.value] === 'r').length
    return `Reteach LO${flagged.value + 1} - ${n} learners have not got "${OUTCOMES[flagged.value].toLowerCase()}" yet.`
  }
  return `${achievedPct.value}% of outcomes achieved so far.`
})

const markNext = () => {
  if (marked.value >= OUTCOMES.length) return
  busy.value = true
  marked.value++
  setTimeout(() => { busy.value = false }, 500)
}
const reset = () => { marked.value = 0 }
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
