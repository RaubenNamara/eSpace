<template>
  <!-- Ask my notes: a question in, a short answer from the learner's own eNotes out, with the
       pages it came from one tap away. -->
  <div class="max-w-3xl mx-auto">
    <PageHeader title="Ask my notes" description="Ask about anything in your subjects. The answer comes only from your school's eNotes, with the pages to read." icon="sparkles" accent="indigo" />

    <form class="mt-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-3 sm:p-4" @submit.prevent="ask()">
      <label for="ask-q" class="sr-only">Your question</label>
      <div class="flex flex-col sm:flex-row gap-2">
        <input
          id="ask-q"
          v-model="question"
          type="text"
          maxlength="300"
          autocomplete="off"
          placeholder="e.g. What is density?"
          class="flex-1 min-w-0 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-base text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
        <button type="submit" class="btn-primary justify-center px-5 py-3" :disabled="busy || question.trim().length < 3">
          <svg v-if="busy" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" class="opacity-25" /><path d="M21 12a9 9 0 00-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" /></svg>
          {{ busy ? 'Looking in your notes…' : 'Ask' }}
        </button>
      </div>
      <div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span v-if="info?.ai_available">{{ info.left_today }} of {{ info.daily_limit }} answers left today</span>
        <span v-else-if="info">Shows the pages in your eNotes that answer your question</span>
        <template v-if="!result && !recent.length">
          <span aria-hidden="true">·</span>
          <span>Try:</span>
          <button v-for="s in samples" :key="s" type="button" class="rounded-full border border-gray-200 dark:border-gray-600 px-2.5 py-0.5 hover:border-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300" @click="ask(s)">{{ s }}</button>
        </template>
      </div>
      <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">{{ error }}</p>
    </form>

    <!-- The answer -->
    <section v-if="result" class="mt-5" aria-live="polite">
      <p class="text-xs uppercase tracking-wide font-semibold text-gray-500 dark:text-gray-400">You asked</p>
      <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ result.question }}</p>

      <div v-if="result.answer" class="mt-3 rounded-2xl border p-4 sm:p-5" :class="result.found ? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-900/20' : 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20'">
        <div class="answer text-[15px] leading-relaxed text-gray-800 dark:text-gray-100" v-html="format(result.answer)"></div>
        <p v-if="result.found" class="mt-3 text-xs text-gray-500 dark:text-gray-400">Written from your notes by AI - read the pages below to be sure.</p>
      </div>
      <p v-else-if="result.note" class="mt-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{{ result.note }}</p>

      <div v-if="result.sources.length" class="mt-4">
        <h2 class="text-sm font-semibold text-gray-900 dark:text-white">{{ result.found ? 'Read more in your notes' : 'Pages in your notes' }}</h2>
        <ul class="mt-2 grid gap-2">
          <li v-for="s in result.sources" :key="s.page_id">
            <RouterLink :to="pageLink(s)" class="block rounded-xl border bg-white dark:bg-gray-800 p-3 sm:p-4 hover:border-indigo-400 hover:shadow-sm transition" :class="s.used ? 'border-indigo-300 dark:border-indigo-700' : 'border-gray-200 dark:border-gray-700'">
              <div class="flex items-center gap-2 text-xs">
                <span class="rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 px-1.5 py-0.5 font-semibold">{{ s.subject }}</span>
                <span class="text-gray-500 dark:text-gray-400 truncate">{{ s.topic }} · page {{ s.page_number }}</span>
                <span v-if="s.used" class="ml-auto text-indigo-700 dark:text-indigo-300 font-semibold whitespace-nowrap">Used in the answer</span>
              </div>
              <p class="mt-1.5 text-sm text-gray-700 dark:text-gray-200 line-clamp-3">{{ s.snippet }}</p>
              <span class="mt-1.5 inline-block text-sm font-semibold text-indigo-700 dark:text-indigo-300">Open page {{ s.page_number }} →</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- Earlier questions -->
    <section v-if="recent.length" class="mt-8">
      <h2 class="text-sm font-semibold text-gray-900 dark:text-white">Your recent questions</h2>
      <ul class="mt-2 divide-y divide-gray-100 dark:divide-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <li v-for="r in recent" :key="r.id">
          <button type="button" class="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50" @click="showRecent(r)">
            <span class="flex-1 min-w-0 truncate text-sm text-gray-800 dark:text-gray-100">{{ r.question }}</span>
            <span class="text-xs text-gray-400 whitespace-nowrap">{{ when(r.asked_at) }}</span>
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiService from '@/services/api'
import PageHeader from '@/components/ui/PageHeader.vue'

interface Source { page_id: number; topic_id: number; subject: string; topic: string; page_title: string; page_number: number; snippet: string; used?: boolean }
interface Result { question: string; answer: string | null; found: boolean; note?: string | null; sources: Source[] }
interface Recent { id: number; question: string; answer: string | null; found: boolean; sources: Source[]; asked_at: string }

const question = ref('')
const busy = ref(false)
const error = ref('')
const result = ref<Result | null>(null)
const recent = ref<Recent[]>([])
const info = ref<{ ai_available: boolean; left_today: number; daily_limit: number } | null>(null)
const samples = ['What is density?', 'Causes of soil erosion', 'What is photosynthesis?']

onMounted(load)

async function load() {
  try {
    const res = await apiService.get('/student/ask-notes')
    const d = res.data.data
    recent.value = d.recent
    info.value = { ai_available: d.ai_available, left_today: d.left_today, daily_limit: d.daily_limit }
  } catch { /* the form still works */ }
}

async function ask(q?: string) {
  if (q) question.value = q
  const text = question.value.trim()
  if (text.length < 3 || busy.value) return
  busy.value = true
  error.value = ''
  try {
    const res = await apiService.post('/student/ask-notes', { question: text })
    const d = res.data.data
    result.value = d
    if (info.value) info.value.left_today = d.left_today
    load()
  } catch (e: any) {
    error.value = e?.response?.data?.errors?.question || e?.response?.data?.message || 'Could not search your notes just now. Try again.'
  } finally {
    busy.value = false
  }
}

function showRecent(r: Recent) {
  question.value = r.question
  result.value = {
    question: r.question,
    answer: r.answer,
    found: r.found,
    note: r.answer ? null : (r.sources.length ? 'The pages in your notes that matched:' : 'Nothing in your eNotes matched this question.'),
    sources: r.sources,
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const pageLink = (s: Source) => ({ path: `/student/enotes/${s.topic_id}`, query: { resumePage: String(s.page_id) } })

const when = (t: string) => {
  const d = new Date(t.replace(' ', 'T'))
  const today = new Date()
  return d.toDateString() === today.toDateString()
    ? d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    : d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}

// the answer is plain text with **key terms** and "- " list lines; escape it, then add just those
function format(text: string): string {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const html: string[] = []
  let list: string[] = []
  const flush = () => { if (list.length) { html.push(`<ul>${list.map(l => `<li>${l}</li>`).join('')}</ul>`); list = [] } }
  for (const raw of esc.split(/\n+/)) {
    const line = raw.trim().replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    if (!line) continue
    if (/^[-•]\s+/.test(line)) list.push(line.replace(/^[-•]\s+/, ''))
    else { flush(); html.push(`<p>${line}</p>`) }
  }
  flush()
  return html.join('')
}
</script>

<style scoped>
.answer :deep(p + p), .answer :deep(p + ul), .answer :deep(ul + p) { margin-top: .6rem; }
.answer :deep(ul) { list-style: disc; padding-left: 1.25rem; }
.answer :deep(li + li) { margin-top: .2rem; }
.answer :deep(b) { font-weight: 600; color: #14307d; }
.dark .answer :deep(b) { color: #c7d2fe; }
</style>
