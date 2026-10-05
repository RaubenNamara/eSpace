<template>
  <!-- Live Quiz on the student's phone: type the code from the teacher's screen, then answer each
       question with the big coloured buttons - same colours and shapes as on the projector. -->
  <div class="w-full">
    <!-- Join -->
    <div v-if="!quizId" class="max-w-md mx-auto pt-4 sm:pt-10">
      <!-- Quizzes running now in my classes: one tap to join -->
      <div v-if="available.length" class="mb-4 space-y-3">
        <p class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
          <span class="relative flex w-2.5 h-2.5"><span class="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-70"></span><span class="relative w-2.5 h-2.5 rounded-full bg-rose-500"></span></span>
          Happening now in your class
        </p>
        <div v-for="q in available" :key="q.id" class="rounded-2xl border-2 border-indigo-500 bg-white dark:bg-gray-800 p-4 flex items-center gap-3">
          <span class="w-11 h-11 flex-shrink-0 rounded-xl bg-indigo-600 text-white flex items-center justify-center"><AppIcon name="bolt" class="w-5 h-5" /></span>
          <div class="min-w-0 flex-1">
            <p class="font-semibold text-gray-900 dark:text-white truncate">{{ q.title }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ q.subject }} · {{ niceName(q.teacher) }}{{ q.phase === 'lobby' ? '' : ' · already started' }}</p>
          </div>
          <button type="button" :disabled="joining" class="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60" @click="joinWith(q.code)">{{ q.joined ? 'Go back in' : 'Join' }}</button>
        </div>
      </div>

      <div class="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 sm:p-8 text-center">
        <span class="mx-auto w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 flex items-center justify-center"><AppIcon name="bolt" class="w-7 h-7" /></span>
        <h1 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{{ available.length ? 'Or join with a code' : 'Join a Live Quiz' }}</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ joinHint }}</p>
        <form class="mt-6" @submit.prevent="join">
          <input
            ref="codeInput"
            v-model="code"
            inputmode="numeric"
            autocomplete="off"
            maxlength="7"
            placeholder="000 000"
            aria-label="Quiz code"
            class="w-full text-center font-jakarta text-4xl font-extrabold tracking-[0.25em] py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-0"
            @input="code = code.replace(/[^\d ]/g, '')"
          >
          <p v-if="joinError" class="mt-3 text-sm text-rose-600 dark:text-rose-400">{{ joinError }}</p>
          <button type="submit" :disabled="digits.length !== 6 || joining" class="mt-5 w-full py-3.5 rounded-2xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">
            {{ joining ? 'Joining…' : 'Join' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Playing: full screen, like a game -->
    <div v-else class="fixed inset-0 z-[60] bg-slate-950 text-white flex flex-col">
      <header class="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <span class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center"><AppIcon name="bolt" class="w-4 h-4" /></span>
        <p class="flex-1 text-sm font-semibold">{{ state && state.phase !== 'lobby' && state.phase !== 'ended' ? `Question ${state.index + 1} of ${state.total}` : 'Live Quiz' }}</p>
        <span v-if="state" class="font-jakarta font-bold tabular-nums">{{ state.my_score }} pts</span>
        <button type="button" class="ml-1 px-2.5 py-1.5 rounded-lg text-sm text-slate-300 hover:bg-white/10" @click="leave">Leave</button>
      </header>

      <div v-if="!state" class="flex-1 flex items-center justify-center text-slate-400">Joining…</div>

      <!-- Waiting to start -->
      <main v-else-if="state.phase === 'lobby'" class="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <span class="relative flex w-16 h-16">
          <span class="absolute inset-0 rounded-full bg-indigo-500/40 animate-ping"></span>
          <span class="relative w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center"><AppIcon name="check-circle" class="w-8 h-8" /></span>
        </span>
        <p class="mt-6 font-jakarta text-2xl font-bold">You're in!</p>
        <p class="mt-2 text-slate-300">Look at your teacher's screen - the quiz starts soon.</p>
        <p class="mt-6 text-sm text-slate-500">{{ state.players }} {{ state.players === 1 ? 'player' : 'players' }} so far</p>
      </main>

      <!-- Answering -->
      <main v-else-if="state.phase === 'question'" class="flex-1 flex flex-col px-4 py-4 min-h-0">
        <div class="flex items-center gap-3">
          <div class="flex-1 h-2 rounded-full bg-white/10 overflow-hidden"><div class="h-full bg-indigo-400 transition-[width] duration-200" :style="{ width: `${(left / state.seconds) * 100}%` }"></div></div>
          <span class="w-8 text-right font-jakarta font-bold tabular-nums">{{ Math.ceil(left) }}</span>
        </div>
        <div class="mt-4 text-lg font-semibold leading-snug quiz-text max-h-[30vh] overflow-y-auto" v-html="state.question?.text"></div>

        <div v-if="state.my_answer" class="flex-1 flex flex-col items-center justify-center text-center">
          <p class="font-jakarta text-2xl font-bold">Answer sent</p>
          <p class="mt-2 text-slate-300">Wait for the answer on your teacher's screen.</p>
        </div>
        <template v-else>
          <p v-if="multi" class="mt-2 text-sm text-indigo-200">Pick all that are right, then tap Send.</p>
          <div class="mt-4 flex-1 grid grid-rows-4 sm:grid-rows-2 sm:grid-cols-2 gap-3 min-h-[16rem]">
            <button
              v-for="(o, i) in state.question?.options || []"
              :key="o.id"
              type="button"
              :disabled="sending"
              class="rounded-2xl px-4 py-3 flex items-center gap-3 text-left text-base font-semibold transition active:scale-[0.98] disabled:opacity-60"
              :class="[OPTION_TONES[i % 4].soft, multi && chosen.includes(o.id) ? 'ring-4 ring-white' : '']"
              @click="pick(o.id)"
            >
              <OptionMark :index="i" class="!bg-black/20" />
              <span class="flex-1 leading-snug">{{ o.text }}</span>
              <AppIcon v-if="multi && chosen.includes(o.id)" name="check-circle" class="w-6 h-6" />
            </button>
          </div>
          <button v-if="multi" type="button" :disabled="!chosen.length || sending" class="mt-3 w-full py-3.5 rounded-2xl font-bold bg-white text-slate-900 disabled:opacity-50" @click="send(chosen)">Send</button>
        </template>
      </main>

      <!-- The answer -->
      <main v-else-if="state.phase === 'reveal'" class="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <template v-if="state.my_answer">
          <span class="w-20 h-20 rounded-full flex items-center justify-center" :class="state.my_answer.is_correct ? 'bg-emerald-500' : 'bg-rose-600'">
            <svg v-if="state.my_answer.is_correct" class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            <svg v-else class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </span>
          <p class="mt-5 font-jakarta text-3xl font-extrabold">{{ state.my_answer.is_correct ? 'Correct!' : 'Not this time' }}</p>
          <p v-if="state.my_answer.is_correct" class="mt-1 text-lg text-emerald-300 font-semibold">+{{ state.my_answer.points }} points</p>
        </template>
        <template v-else>
          <p class="font-jakarta text-2xl font-bold">Time's up</p>
          <p class="mt-1 text-slate-400">No answer this time.</p>
        </template>
        <div class="mt-6 w-full max-w-sm text-left">
          <p class="text-xs font-bold uppercase tracking-widest text-slate-400">The answer</p>
          <p v-for="o in rightOptions" :key="o.id" class="mt-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold">{{ o.text }}</p>
        </div>
        <p class="mt-6 text-slate-300">You're <b class="text-white">{{ ordinal(state.my_rank) }}</b> of {{ state.players }}</p>
      </main>

      <!-- The end -->
      <main v-else class="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p class="text-sm font-bold uppercase tracking-widest text-indigo-300">Quiz finished</p>
        <p class="mt-3 font-jakarta text-5xl font-extrabold">{{ ordinal(state.my_rank) }}</p>
        <p class="mt-1 text-slate-300">{{ state.my_score }} points · {{ state.players }} {{ state.players === 1 ? 'player' : 'players' }}</p>
        <ol v-if="state.podium.length" class="mt-8 w-full max-w-sm space-y-2 text-left">
          <li v-for="(p, i) in state.podium" :key="i" class="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-2.5">
            <span class="w-6 font-bold text-slate-400">{{ i + 1 }}</span>
            <span class="flex-1 font-semibold truncate">{{ p.name }}</span>
            <span class="font-jakarta font-bold tabular-nums">{{ p.score }}</span>
          </li>
        </ol>
        <button type="button" class="mt-8 px-6 py-3 rounded-xl font-bold bg-white text-slate-900" @click="leave">Done</button>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import OptionMark from '@/components/livequiz/OptionMark.vue'
import { OPTION_TONES, makeCountdown } from '@/components/livequiz/tones'
import { useToastStore } from '@/stores/toast'
import { niceName } from '@/components/dashboard/teacher/time'

interface PlayerState {
  id: number
  phase: 'lobby' | 'question' | 'reveal' | 'ended'
  index: number
  total: number
  seconds: number
  time_left: number | null
  question: { id: number; type: string; text: string; options: { id: number; text: string; is_correct?: boolean }[] } | null
  my_answer: { option_ids: number[]; is_correct: boolean | null; points: number | null } | null
  my_score: number
  my_rank: number | null
  players: number
  podium: { name: string; score: number }[]
}

const route = useRoute()
const router = useRouter()
const toast = useToastStore()

const code = ref(typeof route.query.code === 'string' ? route.query.code : '')
const digits = computed(() => code.value.replace(/\D/g, ''))
const joining = ref(false)
const joinError = ref('')
const codeInput = ref<HTMLInputElement | null>(null)

const quizId = ref<number | null>(route.params.id ? Number(route.params.id) : null)
const state = ref<PlayerState | null>(null)
const sending = ref(false)
const chosen = ref<number[]>([])
const multi = computed(() => state.value?.question?.type === 'multiple_choice_multiple')
const rightOptions = computed(() => (state.value?.question?.options ?? []).filter(o => o.is_correct))

const ordinal = (n: number | null) => {
  if (!n) return '-'
  const s = ['th', 'st', 'nd', 'rd'], v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

const countdown = makeCountdown()
const left = ref(0)
let frame = 0
const tick = () => { left.value = countdown.left() ?? 0; frame = requestAnimationFrame(tick) }

// Quizzes running now in my classes
const available = ref<{ id: number; code: string; phase: string; title: string; subject: string; teacher: string; joined: boolean }[]>([])
let availablePoll: number | undefined
const loadAvailable = async () => {
  if (quizId.value) return
  try {
    const res = await axios.get('/api/student/live-quiz/available')
    available.value = res.data.data.quizzes || []
  } catch { /* the code box still works */ }
}

const joinWith = (c: string) => { code.value = c; join() }
const joinHint = computed(() => available.value.length
  ? "If your quiz isn't above, type the 6 numbers your teacher shows on the board."
  : 'When your teacher starts a quiz for your class, it appears here - just tap Join. You can also type the 6 numbers your teacher shows on the board.')

const join = async () => {
  joinError.value = ''
  joining.value = true
  try {
    const res = await axios.post('/api/student/live-quiz/join', { code: digits.value })
    quizId.value = res.data.data.id
    router.replace(`/student/live-quiz/${quizId.value}`)
    startPolling()
  } catch (err: any) {
    joinError.value = err.response?.data?.message || 'Could not join'
  } finally {
    joining.value = false
  }
}

const load = async () => {
  if (!quizId.value) return
  try {
    const res = await axios.get(`/api/student/live-quiz/${quizId.value}`)
    const s: PlayerState = res.data.data
    if (state.value?.question?.id !== s.question?.id) chosen.value = []
    state.value = s
    countdown.set(s.phase === 'question' ? s.time_left : null)
    if (s.phase === 'ended') stopPolling()
  } catch (err: any) {
    if (err.response?.status === 404) {
      stopPolling()
      quizId.value = null
      state.value = null
      router.replace('/student/live-quiz')
      toast.error('That quiz has gone - join with a new code')
    }
  }
}

const send = async (ids: number[]) => {
  if (!quizId.value || sending.value) return
  sending.value = true
  try {
    await axios.post(`/api/student/live-quiz/${quizId.value}/answer`, { option_ids: ids })
    await load()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not send your answer')
    await load()
  } finally {
    sending.value = false
  }
}

const pick = (id: number) => {
  if (multi.value) {
    chosen.value = chosen.value.includes(id) ? chosen.value.filter(x => x !== id) : [...chosen.value, id]
  } else {
    send([id])
  }
}

const leave = () => {
  stopPolling()
  quizId.value = null
  state.value = null
  code.value = ''
  router.replace('/student/live-quiz')
  loadAvailable()
}

let poll: number | undefined
const startPolling = () => {
  stopPolling()
  load()
  poll = window.setInterval(load, 1000)
}
const stopPolling = () => { if (poll) window.clearInterval(poll); poll = undefined }

watch(() => route.params.id, v => { if (!v && quizId.value) leave() })

onMounted(() => {
  frame = requestAnimationFrame(tick)
  if (quizId.value) startPolling()
  // Ready to type a code - unless there's a quiz to tap
  loadAvailable().then(() => { if (!quizId.value && !available.value.length) codeInput.value?.focus() })
  availablePoll = window.setInterval(loadAvailable, 5000)
})
onBeforeUnmount(() => {
  window.clearInterval(availablePoll)
  stopPolling()
  cancelAnimationFrame(frame)
})
</script>

<style scoped>
.quiz-text :deep(p) { margin: 0; }
.quiz-text :deep(img) { max-width: 100%; height: auto; border-radius: 0.75rem; }
</style>
