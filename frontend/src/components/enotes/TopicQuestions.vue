<template>
  <!-- Questions and answers on an eNote topic, in a side panel: students ask and answer each
       other; the topic's teacher answers, marks the best answer, and can remove anything. -->
  <Teleport to="body">
    <Transition name="qa">
      <div v-if="open" class="fixed inset-0 z-[70] flex justify-end" role="dialog" aria-modal="true" aria-label="Questions on this topic">
        <div class="absolute inset-0 bg-black/40" @click="emit('close')"></div>
        <aside class="qa-panel relative w-full sm:max-w-md h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col">
          <header class="flex items-start gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <div class="min-w-0 flex-1">
              <p class="text-[11px] font-bold uppercase tracking-widest text-gray-400">Questions</p>
              <h2 class="font-bold text-gray-900 dark:text-white truncate">{{ title || 'This topic' }}</h2>
            </div>
            <button type="button" class="p-2 -m-1 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close" @click="emit('close')">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </header>

          <!-- Ask -->
          <form v-if="role === 'student'" class="px-5 py-4 border-b border-gray-100 dark:border-gray-800" @submit.prevent="ask">
            <textarea v-model="draft" rows="2" maxlength="2000" placeholder="Stuck on something? Ask your class and your teacher…" class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"></textarea>
            <div class="mt-2 flex items-center justify-between gap-2">
              <label v-if="pageId" class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                <input v-model="aboutPage" type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">About page {{ pageNumber }}
              </label>
              <span v-else></span>
              <button type="submit" :disabled="draft.trim().length < 5 || busy" class="px-4 py-1.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">Ask</button>
            </div>
          </form>

          <div class="flex-1 overflow-y-auto px-5 py-4">
            <p v-if="loading" class="py-10 text-center text-sm text-gray-400">Loading…</p>
            <div v-else-if="!questions.length" class="py-12 text-center">
              <p class="font-semibold text-gray-800 dark:text-gray-100">No questions yet</p>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ role === 'student' ? 'Ask the first one - someone else is probably wondering too.' : 'Questions your students ask on this topic show up here.' }}</p>
            </div>
            <ul v-else class="space-y-4">
              <li v-for="q in questions" :key="q.id" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                <div class="flex items-start gap-2">
                  <p class="flex-1 text-sm font-semibold text-gray-900 dark:text-white whitespace-pre-line">{{ q.body }}</p>
                  <span v-if="q.answered_by_teacher" class="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">Answered</span>
                </div>
                <p class="mt-1 text-[11px] text-gray-500 dark:text-gray-400">{{ q.mine ? 'You' : q.author }}<template v-if="q.page_number"> · page {{ q.page_number }}</template> · {{ timeAgo(q.created_at) }}
                  <button v-if="q.mine || canModerate" type="button" class="ml-2 text-rose-600 hover:underline" @click="removeQuestion(q)">Remove</button>
                </p>

                <ul v-if="q.answers.length" class="mt-3 space-y-2">
                  <li v-for="a in q.answers" :key="a.id" class="rounded-xl px-3 py-2 text-sm" :class="a.endorsed ? 'bg-emerald-50 dark:bg-emerald-900/20 ring-1 ring-emerald-200 dark:ring-emerald-800' : a.is_teacher ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'bg-gray-50 dark:bg-gray-800'">
                    <p class="text-gray-800 dark:text-gray-100 whitespace-pre-line">{{ a.body }}</p>
                    <p class="mt-1 flex flex-wrap items-center gap-x-2 text-[11px] text-gray-500 dark:text-gray-400">
                      <span class="font-semibold" :class="a.is_teacher ? 'text-indigo-700 dark:text-indigo-300' : ''">{{ a.mine ? 'You' : a.author }}{{ a.is_teacher ? ' · Teacher' : '' }}</span>
                      <span v-if="a.endorsed" class="font-semibold text-emerald-700 dark:text-emerald-300">· Best answer</span>
                      <span>· {{ timeAgo(a.created_at) }}</span>
                      <button v-if="canModerate && !a.is_teacher" type="button" class="text-emerald-700 dark:text-emerald-300 hover:underline" @click="endorse(a)">{{ a.endorsed ? 'Unmark' : 'Mark as best' }}</button>
                      <button v-if="a.mine || canModerate" type="button" class="text-rose-600 hover:underline" @click="removeAnswer(a)">Remove</button>
                    </p>
                  </li>
                </ul>

                <form v-if="replyTo === q.id" class="mt-3" @submit.prevent="answer(q)">
                  <textarea v-model="reply" rows="2" maxlength="2000" placeholder="Write an answer…" class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"></textarea>
                  <div class="mt-2 flex justify-end gap-2">
                    <button type="button" class="px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" @click="replyTo = null">Cancel</button>
                    <button type="submit" :disabled="reply.trim().length < 2 || busy" class="px-4 py-1.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">Answer</button>
                  </div>
                </form>
                <button v-else type="button" class="mt-3 text-sm font-semibold text-indigo-600 dark:text-indigo-300 hover:underline" @click="replyTo = q.id; reply = ''">Answer</button>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import { timeAgo } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'

interface Answer { id: number; body: string; author: string; is_teacher: boolean; endorsed: boolean; created_at: string; mine: boolean }
interface Question { id: number; body: string; page_number: number | null; author: string; created_at: string; mine: boolean; answers: Answer[]; answered_by_teacher: boolean }

const props = defineProps<{ open: boolean; topicId: number; role: 'student' | 'teacher'; pageId?: number | null; pageNumber?: number | null }>()
const emit = defineEmits<{ close: []; count: [n: number] }>()
const toast = useToastStore()

const loading = ref(false)
const busy = ref(false)
const questions = ref<Question[]>([])
const title = ref('')
const canModerate = ref(false)
const draft = ref('')
const aboutPage = ref(true)
const replyTo = ref<number | null>(null)
const reply = ref('')

const base = () => `/api/${props.role}`

const load = async () => {
  loading.value = true
  try {
    const res = await axios.get(`${base()}/enotes/${props.topicId}/questions`)
    questions.value = res.data.data.questions || []
    title.value = res.data.data.topic?.title || ''
    canModerate.value = !!res.data.data.can_moderate
    emit('count', questions.value.length)
  } catch (err: any) {
    if (props.open) toast.error(err.response?.data?.message || 'Could not load the questions')
  } finally {
    loading.value = false
  }
}

const run = async (fn: () => Promise<unknown>, ok?: string) => {
  busy.value = true
  try {
    await fn()
    if (ok) toast.success(ok)
    await load()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Something went wrong')
  } finally {
    busy.value = false
  }
}

const ask = () => run(async () => {
  await axios.post(`${base()}/enotes/${props.topicId}/questions`, { body: draft.value, page_id: aboutPage.value ? props.pageId : null })
  draft.value = ''
}, 'Question posted - your teacher will see it')
const answer = (q: Question) => run(async () => {
  await axios.post(`${base()}/enote-questions/${q.id}/answers`, { body: reply.value })
  replyTo.value = null
  reply.value = ''
})
const endorse = (a: Answer) => run(() => axios.post(`/api/teacher/enote-answers/${a.id}/endorse`))
const removeQuestion = (q: Question) => { if (window.confirm('Remove this question and its answers?')) run(() => axios.delete(`${base()}/enote-questions/${q.id}`)) }
const removeAnswer = (a: Answer) => { if (window.confirm('Remove this answer?')) run(() => axios.delete(`${base()}/enote-answers/${a.id}`)) }

// Loaded with the topic (for the count on the button), and again each time the panel opens
watch(() => props.topicId, id => { if (id) load() }, { immediate: true })
watch(() => props.open, o => { if (o && props.topicId) load() })
</script>

<style scoped>
.qa-enter-active, .qa-leave-active { transition: opacity 0.2s ease; }
.qa-enter-active .qa-panel, .qa-leave-active .qa-panel { transition: transform 0.25s ease; }
.qa-enter-from, .qa-leave-to { opacity: 0; }
.qa-enter-from .qa-panel, .qa-leave-to .qa-panel { transform: translateX(100%); }
</style>
