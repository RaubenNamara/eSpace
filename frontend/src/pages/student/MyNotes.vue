<template>
  <!-- My notes: every note the student wrote while reading - eNotes, eLibrary books, Item Bank
       papers - in one place, by subject and topic, and downloadable as a PDF to keep for good. -->
  <div class="w-full max-w-4xl">
    <PageHeader title="My notes" description="Everything you wrote while reading - by subject and topic. Download them as a PDF to keep, even after you finish school." icon="pencil" accent="indigo">
      <template #actions>
        <div class="inline-flex rounded-xl border border-gray-300 dark:border-gray-600 overflow-hidden text-sm font-semibold" role="group" aria-label="How your notes look">
          <button type="button" class="px-3 py-2" :class="notesStyle === 'plain' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'" @click="notesStyle = 'plain'">Plain</button>
          <button type="button" class="px-3 py-2" :class="notesStyle === 'notebook' ? 'bg-blue-700 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'" style="font-family: 'Patrick Hand', cursive" @click="notesStyle = 'notebook'">Notebook</button>
        </div>
        <button type="button" :disabled="!notes.length || making" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50" @click="download">
          <AppIcon name="download" class="w-4 h-4" /><span class="hidden sm:inline">{{ making ? 'Making the PDF…' : 'Download PDF' }}</span><span class="sm:hidden">{{ making ? '…' : 'PDF' }}</span>
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

    <template v-else>
      <!-- Subjects: all, or one -->
      <nav class="flex gap-1.5 mb-5 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 [scrollbar-width:none]" aria-label="Subjects">
        <button
          v-for="c in subjectChips"
          :key="c.name"
          type="button"
          class="flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-colors"
          :class="subjectFilter === c.name ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-500/20' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-indigo-300 dark:hover:border-indigo-700'"
          @click="subjectFilter = c.name"
        >
          {{ c.label }}
          <span class="px-1.5 rounded-md text-[11px] font-bold" :class="subjectFilter === c.name ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'">{{ c.count }}</span>
        </button>
      </nav>

      <!-- Each subject, then each topic (or book, or paper) it has notes on, then the notes
           themselves - every note its own page -->
      <section v-for="g in visibleGroups" :key="g.subject" class="mb-10">
        <div class="flex items-center gap-2.5 mb-4">
          <span class="w-1.5 h-6 rounded-full" :style="{ background: tint(g.subject) }"></span>
          <h2 class="flex-1 text-lg font-bold text-gray-900 dark:text-white">{{ g.subject }}</h2>
          <span class="text-xs text-gray-400">{{ g.sources.length }} {{ g.sources.length === 1 ? 'topic' : 'topics' }} · {{ g.count }} {{ g.count === 1 ? 'note' : 'notes' }}</span>
        </div>

        <div v-for="s in g.sources" :key="s.key" class="mb-6">
          <div class="flex items-center gap-2 mb-2.5 pl-1">
            <AppIcon :name="s.kind === 'enote' ? 'document' : s.kind === 'book' ? 'book' : 'clipboard'" class="w-4 h-4 text-gray-400 flex-shrink-0" />
            <h3 class="min-w-0 flex-1 font-semibold text-gray-800 dark:text-gray-100 truncate">{{ niceTitle(s.source) }}</h3>
            <span class="text-[11px] text-gray-400 flex-shrink-0">{{ s.kind_label }} · {{ s.notes.length }} {{ s.notes.length === 1 ? 'page' : 'pages' }}</span>
            <router-link :to="openLink(s)" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline flex-shrink-0">Open</router-link>
          </div>

          <div class="space-y-3">
            <article
              v-for="n in s.notes"
              :key="n.id"
              class="mn-page rounded-xl border overflow-hidden"
              :class="notesStyle === 'notebook' ? 'notebook-paper border-blue-200 dark:border-blue-900' : 'mn-paper border-amber-900/10 dark:border-gray-700'"
            >
              <div class="px-5 sm:px-7 pt-5 pb-4">
                <div class="flex items-start gap-2 pb-2 mb-3 border-b-2" :class="notesStyle === 'notebook' ? 'border-rose-300/70' : 'border-amber-700/20 dark:border-gray-600'">
                  <span class="flex-shrink-0 mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider" :class="notesStyle === 'notebook' ? 'bg-blue-100 text-blue-800' : 'bg-amber-800 text-amber-50'">{{ n.kind === 'enote' ? `Page ${n.page}` : `p. ${n.page}` }}</span>
                  <p class="min-w-0 flex-1 text-sm font-bold leading-snug" :class="notesStyle === 'notebook' ? 'mn-hand-title text-blue-900' : 'mn-serif-title text-stone-800 dark:text-gray-100'">{{ headingOf(n) }}</p>
                </div>
                <div :class="notesStyle === 'notebook' ? 'mn-hand' : 'mn-serif text-stone-800 dark:text-gray-100'">
                  <p v-for="(para, j) in paragraphsOf(n.text)" :key="j" class="whitespace-pre-line" :class="{ 'mn-drop': j === 0 }">{{ para }}</p>
                </div>
                <div class="flex items-center gap-2 pt-2 mt-1 border-t text-[11px] text-stone-500 dark:text-gray-400" :class="notesStyle === 'notebook' ? 'border-blue-200' : 'border-amber-700/10 dark:border-gray-700'">
                  <span class="flex-1">Written {{ timeAgo(n.updated_at) }}</span>
                  <button type="button" class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/30" title="Delete this note" @click="removeNote(n)">
                    <AppIcon name="trash" class="w-3.5 h-3.5" />Delete
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </template>

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
import { useConfirmStore } from '@/stores/confirm'
import { timeAgo } from '@/components/dashboard/teacher/time'
import { buildMyNotesPdf, buildNotebookPdf, type MyNote } from '@/utils/myNotesPdf'
import { useNotesStyle } from '@/composables/useNotesStyle'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()
const notesStyle = useNotesStyle()
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
// Subjects to choose from, with how many notes each has
const subjectFilter = ref('')
const subjectChips = computed(() => {
  const counts = new Map<string, number>()
  for (const n of shown.value) counts.set(n.subject, (counts.get(n.subject) || 0) + 1)
  return [
    { name: '', label: 'All subjects', count: shown.value.length },
    ...[...counts].sort((a, b) => a[0].localeCompare(b[0])).map(([name, count]) => ({ name, label: name, count }))
  ]
})
const visibleGroups = computed(() => groups.value
  .filter(g => !subjectFilter.value || g.subject === subjectFilter.value)
  .map(g => ({ ...g, count: g.sources.reduce((n, s) => n + s.notes.length, 0) })))

// One colour per subject, for its notebooks' spines
const TINTS = ['#4f46e5', '#0d9488', '#b45309', '#be123c', '#7c3aed', '#0369a1', '#4d7c0f', '#c2410c']
const tint = (subject: string) => TINTS[[...subject].reduce((h, c) => h + c.charCodeAt(0), 0) % TINTS.length]

// A note's heading: its page's own title when it has one (the badge already says which page)
const headingOf = (n: MyNote) => (n.page_title && !/^page\s*\d*$/i.test(n.page_title.trim()) ? n.page_title : 'My summary')
// Paragraphs: a blank line in the note starts a new one
const paragraphsOf = (text: string) => text.replace(/\r/g, '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

// A student removes one of their own notes
const confirmDialog = useConfirmStore()
const removeNote = async (n: MyNote) => {
  if (!await confirmDialog.open({ title: 'Delete this note', message: 'It will be gone from your notes for good.', confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.delete(`/api/student/my-notes/${n.id}`)
    notes.value = notes.value.filter(x => x.id !== n.id)
    toast.success('Note deleted')
  } catch (e: any) {
    toast.error(e?.response?.data?.message || 'The note could not be deleted')
  }
}

const niceTitle = (t: string) => (t === t.toUpperCase() ? t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : t)
const openLink = (s: { kind: string; source_id: number }) => (s.kind === 'enote' ? `/student/enotes/${s.source_id}` : s.kind === 'book' ? '/student/library' : '/student/itembank')

const download = async () => {
  making.value = true
  try {
    // What's on screen: a search or filter downloads just those - plain, or as a notebook
    const doc = notesStyle.value === 'notebook'
      ? await buildNotebookPdf(shown.value, student.value, school.value)
      : buildMyNotesPdf(shown.value, student.value, school.value)
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

<style scoped>
.mn-paper {
  background: linear-gradient(90deg, rgba(120, 90, 40, 0.05), transparent 5%), #fdfaf3;
}
.dark .mn-paper {
  background: #1f2937;
}
.mn-serif-title {
  font-family: Georgia, 'Times New Roman', serif;
}
.mn-hand-title {
  font-family: 'Patrick Hand', cursive;
  font-size: 1.05rem;
}
.mn-serif {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 0.95rem;
  line-height: 1.7;
}
.mn-serif > p {
  margin: 0 0 0.9rem;
}
.mn-hand {
  font-family: 'Patrick Hand', cursive;
  font-size: 1.12rem;
  line-height: 1.75rem;
  color: #1e3a8a;
}
.mn-hand > p {
  /* a whole ruled line between paragraphs */
  margin: 0 0 1.75rem !important;
}
.mn-serif > p:last-child,
.mn-hand > p:last-child {
  margin-bottom: 0.5rem !important;
}
.mn-drop {
  /* keep the big first letter inside its own paragraph */
  display: flow-root;
}
.mn-drop::first-letter {
  float: left;
  font-size: 2.8em;
  line-height: 0.9;
  padding: 0.08em 0.1em 0 0;
  font-weight: 700;
  color: #92400e;
}
.dark .mn-serif .mn-drop::first-letter {
  color: #fbbf24;
}
.notebook-paper .mn-drop::first-letter {
  color: #be123c;
}
</style>
