<template>
  <!-- Live Quiz: pick one of your assessments and run its multiple-choice and true/false questions
       live in class. Students join on their phones with the code on your screen. -->
  <div class="w-full">
    <PageHeader title="Live Quiz" description="Run an assessment's choice questions live in class - on the projector, with students answering on their phones." icon="bolt" accent="indigo">
      <template #filters>
        <div class="relative w-full sm:w-72">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="search" type="search" placeholder="Search assessments" class="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
        </div>
      </template>
    </PageHeader>

    <!-- How it works -->
    <ol class="mb-6 grid sm:grid-cols-3 gap-3">
      <li v-for="(s, i) in STEPS" :key="s.title" class="flex gap-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <span class="w-8 h-8 flex-shrink-0 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200 flex items-center justify-center text-sm font-bold">{{ i + 1 }}</span>
        <span>
          <span class="block text-sm font-semibold text-gray-900 dark:text-white">{{ s.title }}</span>
          <span class="block text-xs text-gray-500 dark:text-gray-400">{{ s.text }}</span>
        </span>
      </li>
    </ol>

    <Skeleton v-if="loading" variant="list" :count="4" />
    <EmptyState
      v-else-if="!assessments.length"
      icon="bolt"
      tone="indigo"
      title="No assessment can be run live yet"
      message="A live quiz uses an assessment's multiple-choice and true/false questions. Add some to one of your published assessments, and it will show up here."
    >
      <router-link to="/teacher/assignments/create" class="inline-flex px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700">New assessment</router-link>
    </EmptyState>
    <EmptyState v-else-if="!shown.length" compact icon="bolt" title="No assessment matches" :message="`Nothing matches &quot;${search}&quot;.`" />

    <ul v-else class="grid md:grid-cols-2 gap-3">
      <li v-for="a in shown" :key="a.id">
        <button
          type="button"
          class="w-full text-left rounded-2xl border bg-white dark:bg-gray-800 p-4 transition hover:border-indigo-300 dark:hover:border-indigo-600"
          :class="picked?.id === a.id ? 'border-indigo-500 ring-2 ring-indigo-100 dark:ring-indigo-900/50' : 'border-gray-200 dark:border-gray-700'"
          @click="picked = a"
        >
          <div class="flex items-start gap-3">
            <span class="w-10 h-10 flex-shrink-0 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 flex items-center justify-center"><AppIcon name="bolt" class="w-5 h-5" /></span>
            <div class="min-w-0 flex-1">
              <p class="font-semibold text-gray-900 dark:text-white truncate">{{ a.title }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ [a.category, a.subject, a.class_label].filter(Boolean).join(' · ') }}</p>
              <p class="mt-2 flex flex-wrap gap-1.5 text-[11px] font-semibold">
                <span class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">{{ a.choice_count }} {{ a.choice_count === 1 ? 'question' : 'questions' }} to play</span>
                <span v-if="a.counts_on_map" class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">Can count on the Learning Map</span>
                <span v-else class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" title="It also has written questions, which a quiz can't mark">Practice only</span>
              </p>
            </div>
            <span class="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full border-2 flex items-center justify-center" :class="picked?.id === a.id ? 'border-indigo-600' : 'border-gray-300 dark:border-gray-600'">
              <span v-if="picked?.id === a.id" class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            </span>
          </div>
        </button>
      </li>
    </ul>

    <!-- Start bar -->
    <div v-if="picked" class="sticky bottom-0 mt-6 -mx-4 sm:mx-0 px-4 py-3 sm:rounded-2xl border-t sm:border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur flex flex-col sm:flex-row sm:items-center gap-3">
      <p class="flex-1 min-w-0 text-sm text-gray-700 dark:text-gray-200 truncate"><span class="font-semibold">{{ picked.title }}</span> · {{ picked.choice_count }} questions</p>
      <label class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        Time per question
        <select v-model.number="seconds" class="py-1.5 pl-2 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm">
          <option v-for="s in [10, 20, 30, 45, 60, 90]" :key="s" :value="s">{{ s }} seconds</option>
        </select>
      </label>
      <button type="button" :disabled="starting" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60" @click="start">
        <AppIcon name="bolt" class="w-4 h-4" />{{ starting ? 'Getting ready…' : 'Open the quiz' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { useToastStore } from '@/stores/toast'

interface Candidate {
  id: number
  title: string
  category: string | null
  subject: string
  class_label: string
  choice_count: number
  question_count: number
  counts_on_map: boolean
}

const STEPS = [
  { title: 'Pick an assessment', text: 'Its multiple-choice and true/false questions become the quiz.' },
  { title: 'Students join', text: 'They open Live Quiz on their phones and type the 6-digit code.' },
  { title: 'Play and save', text: 'Answers, a leaderboard - and the scores can go to the Learning Map.' }
]

const router = useRouter()
const toast = useToastStore()
const assessments = ref<Candidate[]>([])
const loading = ref(true)
const search = ref('')
const picked = ref<Candidate | null>(null)
const seconds = ref(20)
const starting = ref(false)

const shown = computed(() => {
  const q = search.value.trim().toLowerCase()
  return q ? assessments.value.filter(a => [a.title, a.subject, a.class_label, a.category].join(' ').toLowerCase().includes(q)) : assessments.value
})

const start = async () => {
  if (!picked.value) return
  starting.value = true
  try {
    const res = await axios.post('/api/teacher/live-quizzes', { assignment_id: picked.value.id, seconds: seconds.value })
    router.push(`/teacher/live-quiz/${res.data.data.id}`)
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not open the quiz')
    starting.value = false
  }
}

onMounted(async () => {
  try {
    const res = await axios.get('/api/teacher/live-quiz/assessments')
    assessments.value = res.data.data.assessments || []
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load your assessments')
  } finally {
    loading.value = false
  }
})
</script>
