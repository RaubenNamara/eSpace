<template>
  <!-- My notes: every note the student wrote while reading - eNotes, eLibrary books, Item Bank
       papers - in one place, by subject and topic, and downloadable as a PDF to keep for good. -->
  <div class="w-full max-w-4xl">
    <PageHeader title="My notes" description="Everything you wrote while reading - by subject and topic. Download them as a PDF to keep, even after you finish school." icon="pencil" accent="indigo">
      <template #actions>
        <button type="button" :disabled="!notes.length || making" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50" @click="download">
          <AppIcon name="download" class="w-4 h-4" />{{ making ? 'Making the PDF…' : 'Download PDF' }}
        </button>
      </template>
      <StatStrip v-if="notes.length" v-model="kind" :items="statItems" />
      <template #filters>
        <div class="relative w-full sm:w-72">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="search" type="search" placeholder="Search your notes" class="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
        </div>
      </template>
    </PageHeader>

    <Skeleton v-if="loading" variant="list" :count="3" />
    <EmptyState v-else-if="!notes.length" icon="pencil" tone="indigo" title="No notes yet" message="While you read an eNote or a book, tap the note button on a page and write your own summary. Every note shows up here - and you can download them all." >
      <router-link to="/student/enotes" class="inline-flex px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700">Open eNotes</router-link>
    </EmptyState>
    <EmptyState v-else-if="!shown.length" compact icon="pencil" title="No note matches" message="Try another word." />

    <div v-else class="space-y-6">
      <section v-for="g in groups" :key="g.subject">
        <h2 class="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{{ g.subject }}</h2>
        <div class="space-y-3">
          <article v-for="s in g.sources" :key="s.key" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5">
            <div class="flex items-start gap-3">
              <span class="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300"><AppIcon :name="s.kind === 'enote' ? 'document' : s.kind === 'book' ? 'book' : 'clipboard'" class="w-4 h-4" /></span>
              <div class="min-w-0 flex-1">
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ niceTitle(s.source) }}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ s.kind_label }} · {{ s.notes.length }} {{ s.notes.length === 1 ? 'note' : 'notes' }}</p>
              </div>
              <router-link :to="openLink(s)" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline flex-shrink-0">Open</router-link>
            </div>
            <ul class="mt-3 space-y-3">
              <li v-for="n in s.notes" :key="n.id" class="border-l-2 border-indigo-200 dark:border-indigo-800 pl-3">
                <p class="text-[11px] font-semibold text-gray-500 dark:text-gray-400">Page {{ n.page }}<template v-if="n.page_title && n.page_title.toLowerCase() !== 'page'"> · {{ n.page_title }}</template> · {{ timeAgo(n.updated_at) }}</p>
                <p class="mt-0.5 text-sm text-gray-800 dark:text-gray-100 whitespace-pre-line">{{ n.text }}</p>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { timeAgo } from '@/components/dashboard/teacher/time'
import { buildMyNotesPdf, type MyNote } from '@/utils/myNotesPdf'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()
const notes = ref<MyNote[]>([])
const student = ref<{ name: string; class_label: string | null; admission_number: string | null }>({ name: '', class_label: null, admission_number: null })
const school = ref<string | null>(null)
const loading = ref(true)
const making = ref(false)
const search = ref('')
const kind = ref<string | null>(null)

const statItems = computed<StatItem[]>(() => [
  { label: 'eNotes', value: notes.value.filter(n => n.kind === 'enote').length, key: 'enote', tone: 'indigo' },
  { label: 'eLibrary', value: notes.value.filter(n => n.kind === 'book').length, key: 'book', tone: 'emerald' },
  { label: 'Item Bank', value: notes.value.filter(n => n.kind === 'paper').length, key: 'paper', tone: 'violet' }
])
const shown = computed(() => {
  const q = search.value.trim().toLowerCase()
  return notes.value.filter(n => (!kind.value || n.kind === kind.value) && (!q || [n.text, n.source, n.subject].join(' ').toLowerCase().includes(q)))
})
const groups = computed(() => {
  const out: { subject: string; sources: { key: string; kind: MyNote['kind']; kind_label: string; source: string; source_id: number; notes: MyNote[] }[] }[] = []
  for (const n of shown.value) {
    let g = out.find(x => x.subject === n.subject)
    if (!g) { g = { subject: n.subject, sources: [] }; out.push(g) }
    const key = `${n.kind}:${n.source_id}`
    let s = g.sources.find(x => x.key === key)
    if (!s) { s = { key, kind: n.kind, kind_label: n.kind_label, source: n.source, source_id: n.source_id, notes: [] }; g.sources.push(s) }
    s.notes.push(n)
  }
  return out
})
const niceTitle = (t: string) => (t === t.toUpperCase() ? t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : t)
const openLink = (s: { kind: string; source_id: number }) => (s.kind === 'enote' ? `/student/enotes/${s.source_id}` : s.kind === 'book' ? '/student/library' : '/student/itembank')

const download = () => {
  making.value = true
  try {
    // What's on screen: a search or filter downloads just those
    const doc = buildMyNotesPdf(shown.value, student.value, school.value)
    const name = (student.value.name || 'my').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
    doc.save(`${name}-notes-${new Date().toISOString().slice(0, 10)}.pdf`)
  } catch {
    toast.error('Could not make the PDF')
  } finally {
    making.value = false
  }
}

onMounted(async () => {
  try {
    const res = await axios.get('/api/student/my-notes')
    notes.value = res.data.data.notes || []
    student.value = res.data.data.student
    school.value = res.data.data.school
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load your notes')
  } finally {
    loading.value = false
  }
})
</script>
