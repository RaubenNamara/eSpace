<template>
  <!-- Daily Revision ("Daily 5"): five quick questions a day from your own marked or closed
       assessments - what you got wrong comes back tomorrow, what you got right comes back later.
       Finish the five to keep your streak going. -->
  <div class="w-full max-w-2xl mx-auto">
    <PageHeader title="Daily Revision" description="Five quick questions a day from your own assessments. Get one wrong and it comes back tomorrow." icon="bulb" accent="amber" />

    <!-- Streak and counts -->
    <div v-if="data" class="mb-5 grid grid-cols-3 gap-3">
      <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4">
        <p class="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400"><AppIcon name="flame" class="w-4 h-4 text-amber-500" />Streak</p>
        <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-white tabular-nums">{{ data.streak }} <span class="text-sm font-medium text-gray-500">{{ data.streak === 1 ? 'day' : 'days' }}</span></p>
      </div>
      <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4">
        <p class="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400"><AppIcon name="check-circle" class="w-4 h-4 text-emerald-500" />Known well</p>
        <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-white tabular-nums">{{ data.known }}</p>
      </div>
      <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4">
        <p class="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400"><AppIcon name="clock" class="w-4 h-4 text-indigo-500" />Tomorrow</p>
        <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-white tabular-nums">{{ data.due_tomorrow }}</p>
      </div>
    </div>

    <Skeleton v-if="loading" variant="cards" :count="1" />

    <!-- Nothing to revise yet -->
    <EmptyState
      v-else-if="data && !data.pool"
      icon="bulb"
      tone="amber"
      title="Nothing to revise yet"
      message="Questions come from your multiple-choice assessments once they are marked or closed. Hand in your work, and your Daily 5 starts here."
    >
      <router-link to="/student/assignments" class="inline-flex px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700">Go to Assessments</router-link>
    </EmptyState>

    <!-- Done for today -->
    <div v-else-if="data && finished" class="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 sm:p-8 text-center">
      <span class="mx-auto w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 dark:bg-amber-900/30 flex items-center justify-center"><AppIcon name="flame" class="w-8 h-8" /></span>
      <h2 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{{ sessionTotal ? `${sessionRight} of ${sessionTotal} right` : 'Done for today' }}</h2>
      <p class="mt-1 text-gray-600 dark:text-gray-300">{{ data.streak > 1 ? `${data.streak} days in a row - keep it going tomorrow.` : data.streak === 1 ? 'Day one of your streak - come back tomorrow to keep it going.' : 'Come back tomorrow to start a streak.' }}</p>
      <p v-if="data.due_tomorrow" class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ data.due_tomorrow }} {{ data.due_tomorrow === 1 ? 'card comes' : 'cards come' }} back tomorrow.</p>
      <div class="mt-6 flex flex-wrap justify-center gap-2">
        <button type="button" :disabled="loading" class="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="load(true)">Practise 5 more</button>
        <router-link to="/student/learning-map" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700">See my Learning Map</router-link>
      </div>
    </div>

    <!-- A card -->
    <div v-else-if="card" class="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
      <div class="flex items-center gap-1.5 px-5 pt-5">
        <span v-for="(c, i) in cards" :key="c.question_id" class="h-1.5 flex-1 rounded-full" :class="i < index ? (results[i] ? 'bg-emerald-500' : 'bg-rose-500') : i === index ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'"></span>
      </div>
      <Transition name="card" mode="out-in">
        <div :key="card.question_id" class="p-5 sm:p-7">
          <p class="text-xs font-semibold text-gray-500 dark:text-gray-400">{{ card.subject }} · {{ card.from }}</p>
          <div class="mt-2 text-lg font-semibold text-gray-900 dark:text-white leading-snug card-text" v-html="card.text"></div>
          <img v-if="card.image" :src="resolveAssetUrl(card.image)" alt="" class="mt-3 max-h-56 rounded-xl">
          <p v-if="card.type === 'multiple_choice_multiple' && !feedback" class="mt-2 text-sm text-indigo-600 dark:text-indigo-300">Pick all that are right.</p>

          <div class="mt-5 space-y-2.5">
            <button
              v-for="o in card.options"
              :key="o.id"
              type="button"
              :disabled="!!feedback || sending"
              class="w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl border-2 text-sm sm:text-base font-medium transition"
              :class="optionClass(o.id)"
              @click="choose(o.id)"
            >
              <span class="w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center" :class="chosen.includes(o.id) ? 'border-current' : 'border-gray-300 dark:border-gray-600'">
                <span v-if="chosen.includes(o.id)" class="w-2.5 h-2.5 rounded-full bg-current"></span>
              </span>
              <span class="flex-1">{{ o.text }}</span>
              <AppIcon v-if="feedback && feedback.correct_option_ids.includes(o.id)" name="check-circle" class="w-5 h-5 text-emerald-500" />
            </button>
          </div>

          <div v-if="feedback" class="mt-5 rounded-2xl p-4 flex items-start gap-3" :class="feedback.right ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-rose-50 dark:bg-rose-900/20'">
            <AppIcon :name="feedback.right ? 'check-circle' : 'warning'" class="w-6 h-6 flex-shrink-0" :class="feedback.right ? 'text-emerald-600' : 'text-rose-600'" />
            <div class="flex-1">
              <p class="font-semibold" :class="feedback.right ? 'text-emerald-800 dark:text-emerald-200' : 'text-rose-800 dark:text-rose-200'">{{ feedback.right ? 'Right!' : 'Not quite - the right answer is ticked.' }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ feedback.right ? `This one comes back in ${feedback.next_in_days} days.` : 'It comes back tomorrow.' }}</p>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <button v-if="!feedback" type="button" :disabled="!chosen.length || sending" class="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50" @click="check">Check</button>
            <button v-else type="button" class="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700" @click="next">{{ index + 1 >= cards.length ? 'Finish' : 'Next' }}</button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { resolveAssetUrl } from '@/utils/url'
import { useToastStore } from '@/stores/toast'

interface Card {
  question_id: number
  type: string
  text: string
  image: string | null
  options: { id: number; text: string }[]
  subject: string
  from: string
}
interface Revision {
  cards: Card[]
  streak: number
  done_today: boolean
  days_total: number
  due_tomorrow: number
  known: number
  pool: number
}

const toast = useToastStore()
const data = ref<Revision | null>(null)
const loading = ref(true)
const cards = ref<Card[]>([])
const index = ref(0)
const results = ref<boolean[]>([])
const chosen = ref<number[]>([])
const feedback = ref<{ right: boolean; correct_option_ids: number[]; next_in_days: number } | null>(null)
const sending = ref(false)
const finished = ref(false)

const card = computed(() => cards.value[index.value] ?? null)
const sessionRight = computed(() => results.value.filter(Boolean).length)
const sessionTotal = computed(() => results.value.length)

const load = async (more = false) => {
  loading.value = true
  try {
    const res = await axios.get('/api/student/revision', { params: more ? { more: 1 } : {} })
    data.value = res.data.data
    cards.value = data.value?.cards ?? []
    index.value = 0
    results.value = []
    chosen.value = []
    feedback.value = null
    // Already done today and not asking for more, or nothing left to show
    finished.value = !cards.value.length && !!data.value?.pool
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load your revision')
  } finally {
    loading.value = false
  }
}

const choose = (id: number) => {
  if (card.value?.type === 'multiple_choice_multiple') {
    chosen.value = chosen.value.includes(id) ? chosen.value.filter(x => x !== id) : [...chosen.value, id]
  } else {
    chosen.value = [id]
  }
}

const optionClass = (id: number) => {
  const f = feedback.value
  if (!f) return chosen.value.includes(id) ? 'border-indigo-500 bg-indigo-50 text-indigo-900 dark:bg-indigo-900/30 dark:text-indigo-100' : 'border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
  if (f.correct_option_ids.includes(id)) return 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-100'
  if (chosen.value.includes(id)) return 'border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-900/20 dark:text-rose-100'
  return 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500'
}

const check = async () => {
  if (!card.value || !chosen.value.length) return
  sending.value = true
  try {
    const res = await axios.post('/api/student/revision/answer', { question_id: card.value.question_id, option_ids: chosen.value })
    feedback.value = res.data.data
    results.value.push(res.data.data.right)
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not check that')
  } finally {
    sending.value = false
  }
}

const next = async () => {
  if (index.value + 1 < cards.value.length) {
    index.value++
    chosen.value = []
    feedback.value = null
    return
  }
  // Finished the set: count the day
  try {
    const res = await axios.post('/api/student/revision/finish', { right: sessionRight.value, total: sessionTotal.value })
    if (data.value) {
      data.value.streak = res.data.data.streak
      data.value.done_today = true
    }
    const fresh = await axios.get('/api/student/revision')
    if (data.value) data.value.due_tomorrow = fresh.data.data.due_tomorrow
    if (data.value) data.value.known = fresh.data.data.known
  } catch { /* the cards are saved either way */ }
  finished.value = true
}

onMounted(() => load())
</script>

<style scoped>
.card-text :deep(p) { margin: 0; }
.card-text :deep(img) { max-width: 100%; height: auto; }
.card-enter-active, .card-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.card-enter-from { opacity: 0; transform: translateX(16px); }
.card-leave-to { opacity: 0; transform: translateX(-16px); }
</style>
