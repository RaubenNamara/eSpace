<template>
  <!-- One student's activity on eSpace (opened from the eye on a student sign-in row) -->
  <Teleport to="body">
    <div
      v-if="person"
      class="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
      @click.self="emit('close')"
    >
      <div
        role="dialog"
        aria-modal="true"
        :aria-label="`What ${properName(person.name)} did`"
        class="w-full sm:max-w-xl max-h-[92vh] flex flex-col bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl"
      >
        <!-- who -->
        <header class="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <Avatar :person="person" />
          <div class="min-w-0 flex-1">
            <p class="font-bold text-gray-900 dark:text-white truncate">{{ properName(person.name) }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
              <template v-if="person.department">{{ person.department }} · </template><StatusText :person="person" />
            </p>
          </div>
          <button
            ref="closeBtn"
            type="button"
            class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:text-gray-200 dark:hover:bg-gray-700"
            aria-label="Close"
            @click="emit('close')"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div class="overflow-y-auto px-4 py-3 space-y-4">
          <div v-if="loading && !data" class="space-y-2" aria-busy="true">
            <div class="h-16 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
            <div v-for="i in 4" :key="i" class="h-10 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
          </div>
          <p v-else-if="error" class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>

          <template v-else-if="data">
            <!-- the numbers -->
            <div class="grid grid-cols-2 gap-2">
              <div class="rounded-xl bg-indigo-50 dark:bg-indigo-900/30 px-3 py-2">
                <p class="text-2xl font-extrabold tabular-nums text-indigo-700 dark:text-indigo-200">{{ data.activity_count }}</p>
                <p class="text-xs text-gray-600 dark:text-gray-300">{{ data.activity_count === 1 ? 'activity' : 'activities' }} {{ periodPhrase(data.days) }}</p>
              </div>
              <div class="rounded-xl bg-emerald-50 dark:bg-emerald-900/30 px-3 py-2">
                <p class="text-2xl font-extrabold tabular-nums text-emerald-700 dark:text-emerald-300">{{ data.this_visit_count }}</p>
                <p class="text-xs text-gray-600 dark:text-gray-300">
                  since they last signed in<template v-if="data.last_login_at"> ({{ when(data.last_login_at) }})</template>
                </p>
              </div>
            </div>

            <!-- by kind -->
            <div v-if="groups.length" class="flex flex-wrap gap-1.5">
              <span
                v-for="g in groups"
                :key="g.name"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-200"
              >{{ g.name }} <b class="tabular-nums">{{ g.count }}</b></span>
            </div>

            <!-- what they did -->
            <ol v-if="data.activities.length" class="relative border-l-2 border-indigo-100 dark:border-indigo-900/60 ml-2.5 pl-4 space-y-2.5 py-1">
              <li v-for="(a, i) in data.activities" :key="i" class="relative">
                <span class="absolute -left-[1.65rem] top-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px]" :class="ICONS[a.type]?.bg ?? 'bg-gray-100 dark:bg-gray-700'" aria-hidden="true">{{ ICONS[a.type]?.icon ?? '•' }}</span>
                <p class="text-sm text-gray-800 dark:text-gray-100">
                  <span class="font-semibold">{{ a.label }}</span><template v-if="a.title"> · <span class="text-gray-600 dark:text-gray-300">{{ a.title }}</span></template>
                </p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400">
                  {{ when(a.at) }}<span v-if="a.this_visit" class="ml-1.5 px-1.5 py-px rounded bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold">this visit</span>
                </p>
              </li>
            </ol>
            <p v-else class="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Signed in, but nothing recorded {{ periodPhrase(data.days) }} (assessments, eNotes, library books, videos, live classes, labs, practice or chat).
            </p>
            <p v-if="data.more" class="text-[11px] text-gray-500 dark:text-gray-400">Showing the latest {{ data.activities.length }}.</p>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import apiService from '@/services/api'
import { Avatar, StatusText, when, periodPhrase, properName, type SignInPerson } from './signInParts'

interface StudentActivity { type: string; group: string; label: string; title: string | null; count: number; at: string; this_visit: boolean }
interface StudentActivityData {
  days: number; last_login_at: string | null; activity_count: number; this_visit_count: number
  by_group: Record<string, number>; activities: StudentActivity[]; more: number
}

const props = defineProps<{ person: SignInPerson | null; days: number }>()
const emit = defineEmits<{ close: [] }>()

const ICONS: Record<string, { icon: string; bg: string }> = {
  test_submitted: { icon: '📝', bg: 'bg-sky-100 dark:bg-sky-900/40' },
  test_started: { icon: '✏️', bg: 'bg-sky-100 dark:bg-sky-900/40' },
  enote_pages_read: { icon: '📘', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
  enote_note: { icon: '🗒', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
  enote_highlight: { icon: '🖍', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
  enote_bookmark: { icon: '🔖', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
  enote_question: { icon: '❓', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
  enote_explanation: { icon: '💡', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
  notes_read: { icon: '📄', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
  book_read: { icon: '📚', bg: 'bg-amber-100 dark:bg-amber-900/40' },
  book_note: { icon: '🗒', bg: 'bg-amber-100 dark:bg-amber-900/40' },
  book_bookmark: { icon: '🔖', bg: 'bg-amber-100 dark:bg-amber-900/40' },
  video_watched: { icon: '🎬', bg: 'bg-rose-100 dark:bg-rose-900/40' },
  live_class_joined: { icon: '🎥', bg: 'bg-rose-100 dark:bg-rose-900/40' },
  live_quiz_played: { icon: '⚡', bg: 'bg-violet-100 dark:bg-violet-900/40' },
  lab_started: { icon: '🧪', bg: 'bg-emerald-100 dark:bg-emerald-900/40' },
  lab_submitted: { icon: '🧪', bg: 'bg-emerald-100 dark:bg-emerald-900/40' },
  ict_practice: { icon: '💻', bg: 'bg-emerald-100 dark:bg-emerald-900/40' },
  item_bank_practice: { icon: '🎯', bg: 'bg-violet-100 dark:bg-violet-900/40' },
  revision_cards: { icon: '🃏', bg: 'bg-violet-100 dark:bg-violet-900/40' },
  notes_helper: { icon: '💬', bg: 'bg-violet-100 dark:bg-violet-900/40' },
  chat_sent: { icon: '💬', bg: 'bg-sky-100 dark:bg-sky-900/40' },
}

const data = ref<StudentActivityData | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)

const groups = computed(() => Object.entries(data.value?.by_group ?? {}).map(([name, count]) => ({ name, count })))

let request = 0
async function load(silent = false) {
  if (!props.person) return
  const mine = ++request
  if (!silent) { loading.value = true; error.value = null }
  try {
    const res = await apiService.get(`/admin/student-activity/${props.person.id}`, { params: { days: props.days } })
    if (mine === request) data.value = res.data.data
  } catch (e: any) {
    if (mine === request && !silent) error.value = e?.response?.data?.message || 'Could not load this student\'s activity.'
  } finally {
    if (mine === request) loading.value = false
  }
}

const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') emit('close') }
// while it is open, keep it up to date for a student who is still working
let timer: number | undefined
function stop() {
  window.clearInterval(timer)
  window.removeEventListener('keydown', onKey)
}
watch(() => [props.person?.id, props.days], () => {
  stop()
  data.value = null
  if (!props.person) return
  load()
  window.addEventListener('keydown', onKey)
  timer = window.setInterval(() => load(true), 60_000)
  nextTick(() => closeBtn.value?.focus())
}, { immediate: true })
onBeforeUnmount(stop)
</script>
