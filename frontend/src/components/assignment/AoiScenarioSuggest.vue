<template>
  <!-- Suggested Activity of Integration scenarios for the topic(s) this AOI assesses, drafted by AI
       from their competency and learning outcomes (Teacher\AoiScenarioController). The teacher reads
       them, picks one - it fills the scenario question and the marking guide - and edits it there. -->
  <Teleport to="body">
    <div class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" @click.self="$emit('close')">
      <div class="w-full sm:max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl">
        <div class="px-5 pt-5 pb-3 border-b border-gray-100 dark:border-gray-700 flex items-start gap-3">
          <div class="flex-1 min-w-0">
            <p class="text-[10px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">Suggested scenarios · Activity of Integration</p>
            <h2 class="text-base font-bold text-gray-900 dark:text-white">Pick a scenario to start from</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Drafted from the topic's competency and learning outcomes, in everyday Ugandan settings. Check the facts and edit before you publish.</p>
          </div>
          <button type="button" class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close" @click="$emit('close')">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-5 py-4">
          <div v-if="loading" class="space-y-3">
            <p class="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <svg class="w-4 h-4 animate-spin text-violet-600" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
              Drafting three scenarios - this takes a few seconds…
            </p>
            <div v-for="i in 3" :key="i" class="h-32 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
          </div>

          <div v-else-if="error" class="py-8 text-center">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">Couldn't draft scenarios</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ error }}</p>
            <button type="button" class="mt-3 px-4 py-2 text-sm font-semibold rounded-lg bg-violet-600 text-white hover:bg-violet-700" @click="load">Try again</button>
          </div>

          <div v-else class="space-y-3">
            <div v-for="(s, i) in suggestions" :key="i" class="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div class="flex items-start gap-3 mb-2">
                <span class="w-6 h-6 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{{ i + 1 }}</span>
                <p class="flex-1 min-w-0 text-sm font-bold text-gray-900 dark:text-white">{{ s.title }}</p>
                <span class="text-[11px] font-semibold text-gray-500 dark:text-gray-400 flex-shrink-0">{{ totalMarks(s) }} marks</span>
              </div>
              <p class="text-sm text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">{{ s.scenario }}</p>
              <p v-if="s.support" class="mt-2 text-xs text-gray-700 dark:text-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1.5 whitespace-pre-line"><span class="font-bold">Support:</span> {{ s.support }}</p>
              <p class="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-3 mb-1">Task{{ s.tasks.length === 1 ? '' : 's' }}</p>
              <ol class="list-[lower-alpha] pl-5 space-y-0.5 text-sm text-gray-800 dark:text-gray-100">
                <li v-for="(t, j) in s.tasks" :key="j">{{ t.text }} <span class="text-gray-500 dark:text-gray-400">({{ t.marks }})</span></li>
              </ol>
              <button type="button" class="mt-3 text-xs font-semibold text-violet-700 dark:text-violet-300" @click="openGuide[i] = !openGuide[i]">
                {{ openGuide[i] ? 'Hide marking guide' : 'Show marking guide and expected answer' }}
              </button>
              <div v-if="openGuide[i] && s.expected_answer" class="mt-2 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-900/15 p-2.5">
                <p class="text-[11px] font-bold text-emerald-800 dark:text-emerald-200">Expected answer <span class="font-medium">· for you, not the learners</span></p>
                <p class="text-xs text-gray-700 dark:text-gray-200 mt-0.5 whitespace-pre-line">{{ s.expected_answer }}</p>
              </div>
              <dl v-if="openGuide[i]" class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div v-for="g in s.marking_guide" :key="g.criterion" class="rounded-lg bg-violet-50/60 dark:bg-violet-900/15 p-2.5">
                  <dt class="text-[11px] font-bold text-violet-800 dark:text-violet-200">{{ g.criterion }} <span class="font-medium text-violet-600 dark:text-violet-300">· 0–3</span></dt>
                  <dd class="text-xs text-gray-700 dark:text-gray-200 mt-0.5">{{ g.look_for }}</dd>
                </div>
              </dl>
              <div class="mt-3 flex items-center justify-end gap-2">
                <button type="button" class="px-3 py-2 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" :disabled="redrafting !== null" @click="redraft(i)">
                  {{ redrafting === i ? 'Redrafting…' : 'Redraft this one' }}
                </button>
                <button type="button" class="px-4 py-2 text-sm font-semibold rounded-lg bg-violet-600 text-white hover:bg-violet-700" :disabled="redrafting === i" @click="$emit('use', s)">{{ useLabel }}</button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!loading && !error" class="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center gap-2">
          <p class="text-[11px] text-gray-500 dark:text-gray-400">Not quite right?</p>
          <button type="button" class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="load">Draft three more</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import type { AoiSuggestion } from '@/utils/aoiDraft'
import { useToastStore } from '@/stores/toast'

const props = withDefaults(defineProps<{ topicIds: number[]; useLabel?: string }>(), { useLabel: 'Use this scenario' })
const toast = useToastStore()
defineEmits<{ close: []; use: [suggestion: AoiSuggestion] }>()

const suggestions = ref<AoiSuggestion[]>([])
const loading = ref(true)
const error = ref('')
const openGuide = ref<Record<number, boolean>>({})
const redrafting = ref<number | null>(null)

const totalMarks = (s: AoiSuggestion) => s.tasks.reduce((n, t) => n + t.marks, 0)

const load = async () => {
  loading.value = true
  error.value = ''
  openGuide.value = {}
  try {
    const response = await axios.post('/api/teacher/aoi-scenarios', { curriculum_topic_ids: props.topicIds, avoid: suggestions.value.map(s => s.title) })
    suggestions.value = response.data.data.suggestions || []
    if (!suggestions.value.length) error.value = 'No scenarios came back. Please try again.'
  } catch (e: any) {
    error.value = e?.response?.data?.message || 'Please check your connection and try again.'
  } finally {
    loading.value = false
  }
}
// Replaces one suggestion with a fresh one, different from those on screen
const redraft = async (i: number) => {
  redrafting.value = i
  try {
    const response = await axios.post('/api/teacher/aoi-scenarios', {
      curriculum_topic_ids: props.topicIds,
      count: 1,
      avoid: suggestions.value.map(s => s.title)
    })
    const fresh = response.data.data.suggestions?.[0]
    if (fresh) {
      suggestions.value.splice(i, 1, fresh)
      openGuide.value = { ...openGuide.value, [i]: false }
    }
  } catch (e: any) {
    toast.error(e?.response?.data?.message || 'Could not redraft it - please try again')
  } finally {
    redrafting.value = null
  }
}

onMounted(load)
</script>
