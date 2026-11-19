<template>
  <!-- My path: the A Level combinations that suit the learner (from their own marks), and the
       courses and careers each leads to. S.5-S.6 learners see where their combination goes. -->
  <div class="max-w-5xl mx-auto">
    <PageHeader title="My path" :description="data?.a_level ? 'Where your A Level combination can take you - courses and careers.' : 'Which A Level combination suits you after S.4, and the courses and careers each one leads to.'" icon="trend" accent="indigo" />

    <div v-if="loading" class="mt-4 grid gap-3 sm:grid-cols-2 animate-pulse">
      <div v-for="i in 4" :key="i" class="h-40 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
    </div>
    <p v-else-if="error" class="mt-4 text-sm text-red-600 dark:text-red-400">{{ error }}</p>

    <template v-else-if="data">
      <!-- S.5-S.6: their own combination first -->
      <section v-if="current" class="mt-4 rounded-2xl bg-gradient-to-br from-[#1b3fa0] to-[#14307d] text-white p-5 shadow-sm">
        <p class="text-xs uppercase tracking-wide text-indigo-100/90 font-semibold">Your combination</p>
        <div class="mt-1 flex flex-wrap items-baseline gap-x-3">
          <h2 class="text-3xl font-semibold tracking-wide">{{ current.code }}</h2>
          <p class="text-indigo-100">{{ current.subjects.map(s => s.subject).join(', ') }} · {{ current.subsidiary }}</p>
        </div>
        <div class="mt-4 grid sm:grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-semibold text-[#f3d27a]">Courses it leads to</p>
            <ul class="mt-1.5 flex flex-wrap gap-1.5">
              <li v-for="c in current.courses" :key="c" class="rounded-full bg-white/12 ring-1 ring-white/20 px-2.5 py-1 text-sm">{{ c }}</li>
            </ul>
          </div>
          <div>
            <p class="text-sm font-semibold text-[#f3d27a]">Careers</p>
            <ul class="mt-1.5 flex flex-wrap gap-1.5">
              <li v-for="c in current.careers" :key="c" class="rounded-full bg-white/12 ring-1 ring-white/20 px-2.5 py-1 text-sm">{{ c }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Strengths -->
      <section class="mt-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white">Your subjects</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">Average on your marked work in Tusome</p>
        </div>
        <p v-if="!data.has_marks" class="mt-2 text-sm text-gray-600 dark:text-gray-300">No marked work yet. Your suggestions below get sharper as your teachers return your assessments.</p>
        <ul v-else class="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2">
          <li v-for="s in data.subjects.filter(x => x.average !== null)" :key="s.code" class="flex items-center gap-3">
            <span class="w-36 sm:w-44 truncate text-sm text-gray-700 dark:text-gray-200" :title="s.name">{{ s.name }}</span>
            <span class="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full" :class="barTone(s.average!)" :style="{ width: s.average + '%' }"></span></span>
            <span class="w-10 text-right text-sm font-semibold tabular-nums text-gray-900 dark:text-white">{{ s.average }}%</span>
          </li>
        </ul>
      </section>

      <!-- Filters -->
      <section class="mt-6">
        <div class="flex flex-col sm:flex-row sm:items-end gap-3">
          <div class="flex-1">
            <h2 class="text-base font-semibold text-gray-900 dark:text-white">{{ data.a_level ? 'All combinations' : 'Combinations for you' }}</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ data.a_level ? 'See where other combinations lead.' : 'The best fit first - from your marks in the subjects each combination builds on.' }}</p>
          </div>
          <label class="relative sm:w-72">
            <span class="sr-only">Search a career or course</span>
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" /></svg>
            <input v-model="search" type="search" placeholder="A career, e.g. doctor, lawyer" class="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          </label>
        </div>
        <div class="mt-3 flex flex-wrap gap-2" role="group" aria-label="What interests you">
          <button
            v-for="(label, key) in data.interests"
            :key="key"
            type="button"
            class="rounded-full px-3 py-1.5 text-sm border transition-colors"
            :class="interests.includes(key) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-400'"
            :aria-pressed="interests.includes(key)"
            @click="toggle(key)"
          >{{ label }}</button>
        </div>
      </section>

      <p v-if="!shown.length" class="mt-4 text-sm text-gray-600 dark:text-gray-300">No combination matches that. Try another career or clear the interests.</p>
      <div class="mt-4 grid gap-3 md:grid-cols-2">
        <article v-for="c in shown" :key="c.code" class="rounded-2xl border bg-white dark:bg-gray-800 p-4 sm:p-5 flex flex-col" :class="isSuited(c) ? 'border-indigo-300 dark:border-indigo-700 shadow-sm' : 'border-gray-200 dark:border-gray-700'">
          <div class="flex items-start gap-3">
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <h3 class="text-xl font-semibold tracking-wide text-[#14307d] dark:text-indigo-200">{{ c.code }}</h3>
                <span v-if="c.code === data.current_combination" class="rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 px-1.5 py-0.5 text-[11px] font-semibold uppercase">Yours</span>
                <span v-else-if="isSuited(c)" class="rounded-md bg-[#fbf1d6] dark:bg-amber-900/40 text-[#7a5a06] dark:text-amber-200 px-1.5 py-0.5 text-[11px] font-semibold uppercase">Suits you</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ c.subsidiary }}</p>
            </div>
            <div v-if="c.fit !== null" class="text-right">
              <p class="text-2xl font-semibold tabular-nums text-gray-900 dark:text-white leading-none">{{ c.fit }}%</p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">your marks{{ c.fit_from < 3 ? ` (${c.fit_from} of 3)` : '' }}</p>
            </div>
          </div>

          <ul class="mt-3 grid grid-cols-3 gap-2">
            <li v-for="p in c.subjects" :key="p.subject" class="rounded-xl px-2 py-2 text-center" :class="p.taken ? 'bg-gray-50 dark:bg-gray-900/40' : 'bg-amber-50 dark:bg-amber-900/20'">
              <p class="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">{{ p.subject }}</p>
              <p class="text-sm tabular-nums" :class="p.average === null ? 'text-gray-400' : 'text-gray-900 dark:text-white'">{{ p.average === null ? (p.taken ? 'no marks' : 'not taken') : p.average + '%' }}</p>
            </li>
          </ul>
          <p v-if="c.missing.length" class="mt-2 text-xs text-amber-800 dark:text-amber-300">You don't take {{ c.missing.join(' or ') }} - schools usually need it from O Level for this combination.</p>

          <div class="mt-3">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Leads to</p>
            <ul class="mt-1 flex flex-wrap gap-1.5">
              <li v-for="x in c.courses" :key="x" class="rounded-full px-2.5 py-0.5 text-xs" :class="hit(x) ? 'bg-indigo-600 text-white' : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-200'">{{ x }}</li>
            </ul>
          </div>
          <div class="mt-2">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Careers</p>
            <p class="mt-0.5 text-sm text-gray-700 dark:text-gray-200">
              <template v-for="(x, i) in c.careers" :key="x"><span :class="hit(x) ? 'font-semibold text-indigo-700 dark:text-indigo-300' : ''">{{ x }}</span><span v-if="i < c.careers.length - 1">, </span></template>
            </p>
          </div>
        </article>
      </div>

      <p class="mt-6 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 px-4 py-3 text-xs text-gray-600 dark:text-gray-300">
        A guide to start the conversation, not a rule. Universities set their own entry requirements and change them - talk to your careers teacher and check the university's admission guide before you choose.
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import apiService from '@/services/api'
import PageHeader from '@/components/ui/PageHeader.vue'

interface Part { subject: string; average: number | null; taken: boolean }
interface Combo {
  code: string; subjects: Part[]; subsidiary: string; interests: string[]; courses: string[]; careers: string[]
  fit: number | null; fit_from: number; missing: string[]
}
interface PathData {
  first_name: string; class_name: string | null; a_level: boolean; current_combination: string | null
  subjects: { name: string; code: string; current: boolean; average: number | null; marked: number }[]
  combinations: Combo[]; interests: Record<string, string>; has_marks: boolean
}

const data = ref<PathData | null>(null)
const loading = ref(true)
const error = ref('')
const search = ref('')
const interests = ref<string[]>([])

onMounted(async () => {
  try {
    const res = await apiService.get('/student/my-path')
    data.value = res.data.data
  } catch {
    error.value = 'Your path could not be loaded just now.'
  } finally {
    loading.value = false
  }
})

const current = computed(() => data.value?.combinations.find(c => c.code === data.value?.current_combination) ?? null)
const needle = computed(() => search.value.trim().toLowerCase())
const hit = (s: string) => needle.value.length >= 3 && s.toLowerCase().includes(needle.value)

const shown = computed(() => (data.value?.combinations ?? []).filter(c => {
  if (interests.value.length && !c.interests.some(i => interests.value.includes(i))) return false
  if (needle.value.length >= 2) {
    const hay = [c.code, ...c.subjects.map(s => s.subject), ...c.courses, ...c.careers].join(' ').toLowerCase()
    if (!hay.includes(needle.value)) return false
  }
  return true
}))

// the strongest three with nothing missing and marks to go on
const suited = computed(() => new Set((data.value?.combinations ?? [])
  .filter(c => !c.missing.length && c.fit !== null && c.fit >= 50 && c.fit_from >= 2)
  .slice(0, 3).map(c => c.code)))
const isSuited = (c: Combo) => !data.value?.a_level && suited.value.has(c.code)

const toggle = (k: string) => {
  interests.value = interests.value.includes(k) ? interests.value.filter(x => x !== k) : [...interests.value, k]
}
const barTone = (v: number) => (v >= 70 ? 'bg-[#1b3fa0]' : v >= 50 ? 'bg-indigo-400' : 'bg-amber-400')
</script>
