<template>
  <!-- The teacher's Live Quiz screen - made for the projector: the join code, then each question
       with a countdown, then the answers as bars and the leaderboard, then the podium. It covers
       the whole app while it runs; Exit leaves it. -->
  <div class="fixed inset-0 z-[60] bg-slate-950 text-white flex flex-col overflow-y-auto">
    <!-- Top bar -->
    <header class="flex items-center gap-3 px-4 sm:px-8 py-3 border-b border-white/10">
      <span class="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center"><AppIcon name="bolt" class="w-5 h-5" /></span>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-widest text-slate-400">Live Quiz</p>
        <p class="font-semibold truncate">{{ state?.assignment.title || '…' }}</p>
      </div>
      <span v-if="state && state.phase !== 'lobby' && state.phase !== 'ended'" class="hidden sm:inline text-sm text-slate-300">Question {{ state.index + 1 }} of {{ state.total }}</span>
      <span v-if="state" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-sm font-semibold"><AppIcon name="users" class="w-4 h-4" />{{ state.players.length }}</span>
      <button type="button" class="px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-300 hover:bg-white/10" @click="exit">Exit</button>
    </header>

    <div v-if="!state" class="flex-1 flex items-center justify-center text-slate-400">Opening the quiz…</div>

    <!-- Lobby: the code, and who has joined -->
    <main v-else-if="state.phase === 'lobby'" class="flex-1 flex flex-col items-center justify-center px-4 py-10 text-center">
      <p class="text-slate-300 text-lg">On your phone: open <b class="text-white">Live Quiz</b> in eSpace and type</p>
      <p class="mt-4 font-jakarta font-extrabold tracking-[0.2em] text-6xl sm:text-8xl lg:text-9xl tabular-nums">{{ spacedCode }}</p>
      <div class="mt-10 w-full max-w-4xl">
        <p class="text-sm text-slate-400">{{ state.players.length ? `${state.players.length} joined` : 'Waiting for students to join…' }}</p>
        <TransitionGroup tag="div" name="pop" class="mt-4 flex flex-wrap justify-center gap-2">
          <span v-for="p in state.players" :key="p.student_id" class="px-3 py-1.5 rounded-full bg-white/10 text-sm font-semibold">{{ shortName(p.name) }}</span>
        </TransitionGroup>
      </div>
      <button type="button" :disabled="busy" class="mt-10 px-8 py-3.5 rounded-2xl text-lg font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50" @click="act('start')">
        Start the quiz
      </button>
      <p class="mt-3 text-xs text-slate-500">{{ state.total }} questions · {{ state.seconds }} seconds each</p>
    </main>

    <!-- A question, or its answer -->
    <main v-else-if="state.phase === 'question' || state.phase === 'reveal'" class="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10 flex flex-col">
      <div class="flex items-start gap-5">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-slate-400">Question {{ state.index + 1 }} of {{ state.total }}<span v-if="state.question?.type === 'multiple_choice_multiple'"> · pick all that are right</span></p>
          <div class="mt-2 font-jakarta text-2xl sm:text-4xl font-bold leading-snug quiz-text" v-html="state.question?.text"></div>
          <img v-if="state.question?.image" :src="resolveAssetUrl(state.question.image)" alt="" class="mt-4 max-h-64 rounded-xl bg-white">
        </div>
        <!-- Countdown -->
        <div v-if="state.phase === 'question'" class="relative w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0">
          <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="none" stroke-width="3" class="stroke-white/10" /><circle cx="18" cy="18" r="16" fill="none" stroke-width="3" stroke-linecap="round" class="stroke-indigo-400 transition-[stroke-dasharray] duration-200" :stroke-dasharray="`${(left / state.seconds) * 100.5} 100.5`" /></svg>
          <span class="absolute inset-0 flex items-center justify-center font-jakarta text-3xl sm:text-4xl font-extrabold tabular-nums">{{ Math.ceil(left) }}</span>
        </div>
      </div>

      <div class="mt-8 grid sm:grid-cols-2 gap-3 sm:gap-4">
        <div
          v-for="(o, i) in state.question?.options || []"
          :key="o.id"
          class="relative overflow-hidden rounded-2xl p-4 sm:p-5 flex items-center gap-4 transition"
          :class="state.phase === 'reveal' ? (o.is_correct ? 'bg-white text-slate-900 ring-4 ring-emerald-400' : 'bg-white/5 text-slate-400') : `${OPTION_TONES[i % 4].solid} text-white`"
        >
          <!-- Share of answers, as a bar behind the option -->
          <span v-if="state.phase === 'reveal'" class="absolute inset-y-0 left-0 opacity-20" :class="OPTION_TONES[i % 4].bar" :style="{ width: `${share(o.count)}%` }"></span>
          <OptionMark :index="i" size="lg" class="relative" />
          <span class="relative flex-1 text-lg sm:text-xl font-semibold leading-snug">{{ o.text }}</span>
          <span v-if="state.phase === 'reveal'" class="relative font-jakarta text-2xl font-extrabold tabular-nums">{{ o.count }}</span>
          <AppIcon v-if="state.phase === 'reveal' && o.is_correct" name="check-circle" class="relative w-7 h-7 text-emerald-500" />
        </div>
      </div>

      <div class="mt-auto pt-8 flex flex-wrap items-center gap-4">
        <p v-if="state.phase === 'question'" class="text-slate-300"><b class="text-white text-xl tabular-nums">{{ state.answered }}</b> of {{ state.players.length }} answered</p>
        <p v-else class="text-slate-300"><b class="text-white text-xl tabular-nums">{{ rightCount }}</b> of {{ state.answered }} got it right</p>
        <div class="flex-1"></div>
        <button v-if="state.phase === 'question'" type="button" :disabled="busy" class="px-6 py-3 rounded-xl font-bold bg-white text-slate-900 hover:bg-slate-100 disabled:opacity-50" @click="act('reveal')">Show the answer</button>
        <template v-else>
          <button type="button" :disabled="busy" class="px-4 py-3 rounded-xl font-semibold text-slate-300 hover:bg-white/10" @click="act('end')">Finish now</button>
          <button type="button" :disabled="busy" class="px-6 py-3 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50" @click="act('next')">{{ state.index + 1 >= state.total ? 'See the results' : 'Next question' }}</button>
        </template>
      </div>

      <!-- Leaderboard after each answer -->
      <div v-if="state.phase === 'reveal' && state.players.length" class="mt-8 rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5">
        <p class="text-xs font-bold uppercase tracking-widest text-slate-400">Leaderboard</p>
        <ol class="mt-3 grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
          <li v-for="(p, i) in state.players.slice(0, 5)" :key="p.student_id" class="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2">
            <span class="w-6 text-sm font-bold text-slate-400">{{ i + 1 }}</span>
            <span class="flex-1 min-w-0 truncate font-semibold">{{ shortName(p.name) }}</span>
            <span class="font-jakarta font-bold tabular-nums">{{ p.score }}</span>
          </li>
        </ol>
      </div>
    </main>

    <!-- The end: podium, everyone's score, save -->
    <main v-else class="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
      <p class="text-center text-sm font-bold uppercase tracking-widest text-indigo-300">Quiz finished</p>
      <h1 class="mt-2 text-center font-jakarta text-3xl sm:text-5xl font-extrabold">Well done, everyone</h1>

      <div v-if="state.players.length" class="mt-10 flex items-end justify-center gap-3 sm:gap-6">
        <div v-for="slot in podium" :key="slot.place" class="flex flex-col items-center w-28 sm:w-40">
          <p class="font-semibold text-center truncate w-full">{{ slot.player ? shortName(slot.player.name) : '' }}</p>
          <p class="text-sm text-slate-400 tabular-nums">{{ slot.player?.score ?? '' }}</p>
          <div class="mt-2 w-full rounded-t-2xl flex items-start justify-center pt-3 font-jakarta text-3xl font-extrabold" :class="slot.cls">{{ slot.player ? slot.place : '' }}</div>
        </div>
      </div>
      <p v-else class="mt-10 text-center text-slate-400">Nobody joined this time.</p>

      <div class="mt-10 grid sm:grid-cols-3 gap-3">
        <div class="rounded-2xl bg-white/5 border border-white/10 p-4"><p class="text-sm text-slate-400">Players</p><p class="font-jakarta text-3xl font-extrabold">{{ state.players.length }}</p></div>
        <div class="rounded-2xl bg-white/5 border border-white/10 p-4"><p class="text-sm text-slate-400">Average right</p><p class="font-jakarta text-3xl font-extrabold">{{ averageRight }}%</p></div>
        <div class="rounded-2xl bg-white/5 border border-white/10 p-4"><p class="text-sm text-slate-400">Questions</p><p class="font-jakarta text-3xl font-extrabold">{{ state.total }}</p></div>
      </div>

      <!-- Learning Map -->
      <div class="mt-6 rounded-2xl border p-5" :class="state.counts_on_map ? 'border-emerald-400/40 bg-emerald-500/10' : 'border-white/10 bg-white/5'">
        <template v-if="state.saved">
          <p class="font-semibold flex items-center gap-2"><AppIcon name="check-circle" class="w-5 h-5 text-emerald-400" />Saved to the Learning Map</p>
          <p class="mt-1 text-sm text-slate-300">Each player's score is now their result for "{{ state.assignment.title }}". Anyone who had already done it keeps their own result.</p>
        </template>
        <template v-else-if="state.counts_on_map">
          <p class="font-semibold">Count these scores on the Learning Map?</p>
          <p class="mt-1 text-sm text-slate-300">Every question in "{{ state.assignment.title }}" marks itself, so each player's score can stand as their result - just as if they had done it on their own. Anyone who already did it keeps their own result.</p>
          <button type="button" :disabled="busy || !state.players.length" class="mt-4 px-5 py-2.5 rounded-xl font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50" @click="save">Save to the Learning Map</button>
        </template>
        <template v-else>
          <p class="font-semibold">Practice round</p>
          <p class="mt-1 text-sm text-slate-300">"{{ state.assignment.title }}" also has written questions a quiz can't mark, so these scores aren't saved as its result. Students still do it the normal way.</p>
        </template>
      </div>

      <div v-if="state.players.length" class="mt-6 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
        <p class="px-5 pt-4 text-xs font-bold uppercase tracking-widest text-slate-400">Everyone</p>
        <ol class="p-3 grid sm:grid-cols-2 gap-1">
          <li v-for="(p, i) in state.players" :key="p.student_id" class="flex items-center gap-3 px-2 py-1.5 rounded-lg">
            <span class="w-7 text-sm font-bold text-slate-500 tabular-nums">{{ i + 1 }}</span>
            <span class="flex-1 min-w-0 truncate">{{ p.name }}</span>
            <span class="text-xs text-slate-400">{{ p.correct }}/{{ state.total }} right</span>
            <span class="w-14 text-right font-jakarta font-bold tabular-nums">{{ p.score }}</span>
          </li>
        </ol>
      </div>

      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <router-link to="/teacher/live-quiz" class="px-5 py-2.5 rounded-xl font-semibold bg-white text-slate-900 hover:bg-slate-100">Run another quiz</router-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import OptionMark from '@/components/livequiz/OptionMark.vue'
import { OPTION_TONES, makeCountdown } from '@/components/livequiz/tones'
import { resolveAssetUrl } from '@/utils/url'
import { useToastStore } from '@/stores/toast'

interface HostState {
  id: number
  phase: 'lobby' | 'question' | 'reveal' | 'ended'
  index: number
  total: number
  seconds: number
  time_left: number | null
  join_code: string
  assignment: { id: number; title: string; category: string | null; subject: string }
  question: { id: number; type: string; text: string; image: string | null; options: { id: number; text: string; is_correct: boolean; count: number }[] } | null
  answered: number
  right: number
  players: { student_id: number; name: string; score: number; correct: number }[]
  counts_on_map: boolean
  saved: boolean
}

const route = useRoute()
const router = useRouter()
const toast = useToastStore()
const id = Number(route.params.id)
const state = ref<HostState | null>(null)
const busy = ref(false)

const spacedCode = computed(() => (state.value?.join_code ?? '').replace(/(\d{3})(\d{3})/, '$1 $2'))
const shortName = (name: string) => {
  const [first, ...rest] = name.split(' ')
  return rest.length ? `${first} ${rest[rest.length - 1][0]}.` : first
}
const share = (count: number) => (state.value?.answered ? Math.round((count / state.value.answered) * 100) : 0)
const rightCount = computed(() => state.value?.right ?? 0)
const averageRight = computed(() => {
  const s = state.value
  if (!s?.players.length || !s.total) return 0
  return Math.round((s.players.reduce((n, p) => n + p.correct, 0) / (s.players.length * s.total)) * 100)
})
const podium = computed(() => {
  const p = state.value?.players ?? []
  return [
    { place: 2, player: p[1], cls: 'h-24 bg-slate-600' },
    { place: 1, player: p[0], cls: 'h-36 bg-indigo-600' },
    { place: 3, player: p[2], cls: 'h-16 bg-slate-700' }
  ]
})

// Smooth countdown between polls
const countdown = makeCountdown()
const left = ref(0)
let frame = 0
const tick = () => {
  left.value = countdown.left() ?? 0
  frame = requestAnimationFrame(tick)
}

const apply = (s: HostState) => {
  state.value = s
  countdown.set(s.phase === 'question' ? s.time_left : null)
}

const load = async () => {
  try {
    const res = await axios.get(`/api/teacher/live-quizzes/${id}`)
    apply(res.data.data)
    // Time's up, or everyone has answered: show the answer
    const s = state.value
    if (s && s.phase === 'question' && !busy.value && ((s.time_left ?? 1) <= 0 || (s.players.length > 0 && s.answered >= s.players.length))) {
      act('reveal')
    }
  } catch (err: any) {
    if (err.response?.status === 404) {
      toast.error('Quiz not found')
      router.replace('/teacher/live-quiz')
    }
  }
}

const act = async (action: 'start' | 'reveal' | 'next' | 'end') => {
  if (busy.value) return
  busy.value = true
  try {
    const res = await axios.post(`/api/teacher/live-quizzes/${id}/advance`, { action })
    apply(res.data.data)
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not move the quiz on')
  } finally {
    busy.value = false
  }
}

const save = async () => {
  busy.value = true
  try {
    const res = await axios.post(`/api/teacher/live-quizzes/${id}/save`)
    toast.success(res.data.message || 'Saved')
    await load()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not save the results')
  } finally {
    busy.value = false
  }
}

const exit = async () => {
  const s = state.value
  if (s && s.phase !== 'ended' && s.phase !== 'lobby' && !window.confirm('Leave the quiz? It will finish for everyone.')) return
  if (s && s.phase !== 'ended') {
    try { await axios.post(`/api/teacher/live-quizzes/${id}/advance`, { action: 'end' }) } catch { /* leaving anyway */ }
  }
  router.push('/teacher/live-quiz')
}

let poll: number | undefined
onMounted(() => {
  load()
  poll = window.setInterval(load, 1000)
  frame = requestAnimationFrame(tick)
})
onBeforeUnmount(() => {
  window.clearInterval(poll)
  cancelAnimationFrame(frame)
})
</script>

<style scoped>
.quiz-text :deep(p) { margin: 0; }
.quiz-text :deep(img) { max-width: 100%; height: auto; }
.pop-enter-active { transition: transform 0.25s ease, opacity 0.25s ease; }
.pop-enter-from { transform: scale(0.6); opacity: 0; }
</style>
