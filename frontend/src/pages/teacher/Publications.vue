<template>
  <!-- GP: publish an A level student's work. Choose the student who wrote it, upload the PDF,
       publish - every A level student then finds it in Publications and on their dashboard. -->
  <div>
    <PageHeader title="Publications" description="Publish A level students' work. Only A level students see it, in Publications and on their dashboard." icon="book" accent="emerald">
      <template #actions>
        <button type="button" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold" @click="openForm()">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 5v14M5 12h14" /></svg>
          New publication
        </button>
      </template>
      <template #filters>
        <div class="flex flex-col md:flex-row gap-2">
          <input v-model="search" type="search" placeholder="Search title or author" class="w-full md:w-60 px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <select v-model="statusFilter" class="w-full md:w-40 px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option value="">All</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </template>
    </PageHeader>

    <div v-if="loading" class="space-y-2">
      <div v-for="i in 4" :key="i" class="h-20 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    </div>

    <EmptyState v-else-if="error" :title="error" icon="warning" tone="rose" />

    <EmptyState
      v-else-if="!shown.length"
      :title="publications.length ? 'Nothing matches' : 'No publications yet'"
      :message="publications.length ? 'Try another search or filter.' : 'Choose New publication, pick the A level student who wrote it and upload the PDF.'"
      icon="book"
    />

    <ul v-else class="space-y-2">
      <li v-for="p in shown" :key="p.id" class="flex items-center gap-3 sm:gap-4 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <button type="button" class="flex-shrink-0" :aria-label="`Read ${p.title}`" @click="reading = asBook(p)">
          <ShelfBook flat size="sm" :title="p.title" :seed="p.id" label="GP" imprint="GP Publications" />
        </button>
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2 flex-wrap">
            <p class="text-[0.95rem] font-semibold text-gray-900 dark:text-white truncate">{{ p.title }}</p>
            <span
              class="px-2 py-0.5 rounded-full text-[11px] font-semibold"
              :class="p.status === 'published' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'"
            >{{ p.status === 'published' ? 'Published' : 'Draft' }}</span>
          </div>
          <p class="text-sm text-gray-700 dark:text-gray-200 truncate">By {{ p.author_name }}<template v-if="p.author_class"> · {{ p.author_class }}</template></p>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
            {{ p.status === 'published' ? `Published ${dateText(p.published_at)}` : `Added ${dateText(p.created_at)}` }}
            · {{ p.teacher_id === me ? 'by you' : `by ${[p.teacher_first_name, p.teacher_last_name].filter(Boolean).join(' ')}` }}
          </p>
        </div>
        <div class="flex items-center gap-1.5 flex-shrink-0">
          <button type="button" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" @click="reading = asBook(p)">Read</button>
          <ActionMenu v-if="p.teacher_id === me" :label="`Actions for ${p.title}`" :items="menuFor(p)" />
        </div>
      </li>
    </ul>

    <!-- New / edit -->
    <div v-if="form" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" @click.self="closeForm">
      <form class="w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white dark:bg-gray-800 shadow-xl" @submit.prevent="save('published')">
        <div class="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ form.id ? 'Edit publication' : 'New publication' }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">Only A level students see it, once it is published.</p>
        </div>
        <div class="px-5 py-4 space-y-4">
          <label class="block">
            <span class="text-sm font-medium text-gray-800 dark:text-gray-100">Title</span>
            <input v-model="form.title" type="text" maxlength="200" required class="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
          </label>

          <!-- The author: an A level student -->
          <div>
            <span class="text-sm font-medium text-gray-800 dark:text-gray-100">Author (A level student)</span>
            <div v-if="form.author" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40">
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ form.author.name }}</p>
                <p class="text-xs text-gray-600 dark:text-gray-300 truncate">{{ [form.author.class_name, form.author.admission_number].filter(Boolean).join(' · ') }}</p>
              </div>
              <button type="button" class="text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:underline" @click="form.author = null; authorQuery = ''; findAuthors()">Change</button>
            </div>
            <template v-else>
              <input v-model="authorQuery" type="search" placeholder="Search by name or admission number" class="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500" @input="findAuthorsSoon">
              <ul class="mt-1 max-h-48 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                <li v-if="searchingAuthors" class="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">Searching…</li>
                <li v-else-if="!authorResults.length" class="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">No A level student found</li>
                <li v-for="s in authorResults" v-else :key="s.id">
                  <button type="button" class="w-full text-left px-3 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/40" @click="form.author = s">
                    <span class="block text-sm font-medium text-gray-900 dark:text-white truncate">{{ s.name }}</span>
                    <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">{{ [s.class_name, s.admission_number].filter(Boolean).join(' · ') }}</span>
                  </button>
                </li>
              </ul>
            </template>
          </div>

          <label class="block">
            <span class="text-sm font-medium text-gray-800 dark:text-gray-100">About it <span class="font-normal text-gray-500">(optional)</span></span>
            <textarea v-model="form.description" rows="3" maxlength="1000" class="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"></textarea>
          </label>

          <label class="block">
            <span class="text-sm font-medium text-gray-800 dark:text-gray-100">Document (PDF, up to 50MB)</span>
            <input type="file" accept="application/pdf,.pdf" class="mt-1 block w-full text-sm text-gray-700 dark:text-gray-200 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 file:font-semibold dark:file:bg-indigo-950 dark:file:text-indigo-200" @change="onFile">
            <span v-if="form.id && !form.file" class="block mt-1 text-xs text-gray-500 dark:text-gray-400">Leave empty to keep the current document.</span>
          </label>
        </div>
        <div class="px-5 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-end gap-2">
          <button type="button" class="px-3.5 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" :disabled="saving" @click="closeForm">Cancel</button>
          <template v-if="form.id">
            <button type="submit" class="px-3.5 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50" :disabled="saving">{{ saving ? 'Saving…' : 'Save' }}</button>
          </template>
          <template v-else>
            <button type="button" class="px-3.5 py-2 rounded-lg text-sm font-semibold text-indigo-700 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 disabled:opacity-50" :disabled="saving" @click="save('draft')">Save draft</button>
            <button type="submit" class="px-3.5 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50" :disabled="saving">{{ saving ? 'Publishing…' : 'Publish' }}</button>
          </template>
        </div>
      </form>
    </div>

    <LibraryPdfViewer v-if="reading" :book="reading" :with-notes="false" @close="reading = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import ActionMenu from '@/components/ui/ActionMenu.vue'
import ShelfBook from '@/components/library/ShelfBook.vue'
import LibraryPdfViewer from '@/components/library/LibraryPdfViewer.vue'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { asBook, type Publication } from '@/utils/publications'
import type { LibraryBook } from '@/types/library'

interface Author { id: number; name: string; admission_number: string | null; class_name: string | null }
interface Form { id: number | null; title: string; description: string; author: Author | null; file: File | null }

const toast = useToastStore()
const confirmDialog = useConfirmStore()

const publications = ref<Publication[]>([])
const me = ref(0)
const loading = ref(true)
const error = ref('')
const search = ref('')
const statusFilter = ref<'' | 'published' | 'draft'>('')
const reading = ref<LibraryBook | null>(null)

const shown = computed(() => {
  const q = search.value.trim().toLowerCase()
  return publications.value.filter(p =>
    (!statusFilter.value || p.status === statusFilter.value) &&
    (!q || `${p.title} ${p.author_name}`.toLowerCase().includes(q))
  )
})

const dateText = (v: string | null) => v ? new Date(v.replace(' ', 'T')).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : ''

const load = async () => {
  try {
    const res = await axios.get('/api/teacher/publications')
    publications.value = res.data.data.publications || []
    me.value = Number(res.data.data.me) || 0
    error.value = ''
  } catch (e: any) {
    error.value = e.response?.status === 403 ? 'Publications are made in the GP department' : (e.response?.data?.message || 'Publications could not load')
  } finally {
    loading.value = false
  }
}

// ---- the form
const form = ref<Form | null>(null)
const saving = ref(false)
const authorQuery = ref('')
const authorResults = ref<Author[]>([])
const searchingAuthors = ref(false)
let authorTimer: ReturnType<typeof setTimeout> | null = null
let authorAsk = 0

const findAuthors = async () => {
  const ask = ++authorAsk
  searchingAuthors.value = true
  try {
    const res = await axios.get('/api/teacher/publications/authors', { params: { q: authorQuery.value.trim() } })
    if (ask === authorAsk) authorResults.value = res.data.data.students || []
  } catch {
    if (ask === authorAsk) authorResults.value = []
  } finally {
    if (ask === authorAsk) searchingAuthors.value = false
  }
}
const findAuthorsSoon = () => {
  if (authorTimer) clearTimeout(authorTimer)
  authorTimer = setTimeout(findAuthors, 300)
}

const openForm = (p?: Publication) => {
  form.value = p
    ? { id: p.id, title: p.title, description: p.description || '', author: { id: p.author_student_id, name: p.author_name, admission_number: null, class_name: p.author_class }, file: null }
    : { id: null, title: '', description: '', author: null, file: null }
  authorQuery.value = ''
  if (!p) findAuthors()
}
const closeForm = () => { if (!saving.value) form.value = null }
const onFile = (e: Event) => {
  const f = (e.target as HTMLInputElement).files?.[0] || null
  if (form.value) form.value.file = f
}

const save = async (status: 'published' | 'draft') => {
  const f = form.value
  if (!f) return
  if (!f.title.trim()) return toast.error('Give the publication a title')
  if (!f.author) return toast.error('Choose the A level student who wrote it')
  if (!f.id && !f.file) return toast.error('Choose the PDF to publish')
  if (f.file && f.file.size > 50 * 1024 * 1024) return toast.error('The file is bigger than 50MB')

  const body = new FormData()
  body.append('title', f.title.trim())
  body.append('description', f.description.trim())
  body.append('author_student_id', String(f.author.id))
  if (f.file) body.append('file', f.file)
  if (!f.id) body.append('status', status)

  saving.value = true
  try {
    const res = await axios.post(f.id ? `/api/teacher/publications/${f.id}` : '/api/teacher/publications', body)
    toast.success(res.data.message || 'Saved')
    form.value = null
    await load()
  } catch (e: any) {
    const errs = e.response?.data?.errors
    toast.error((errs && Object.values(errs)[0]) || e.response?.data?.message || 'Could not save the publication')
  } finally {
    saving.value = false
  }
}

// ---- publish, take down, remove
const setStatus = async (p: Publication, status: 'published' | 'draft') => {
  if (status === 'draft') {
    const ok = await confirmDialog.open({
      title: 'Take this publication down?',
      message: 'A level students stop seeing it. It stays here as a draft, and you can publish it again.',
      confirmLabel: 'Take down'
    })
    if (!ok) return
  }
  try {
    const res = await axios.put(`/api/teacher/publications/${p.id}/status`, { status })
    toast.success(res.data.message)
    await load()
  } catch (e: any) {
    toast.error(e.response?.data?.message || 'Could not change it')
  }
}
const remove = async (p: Publication) => {
  const ok = await confirmDialog.open({
    title: 'Remove this publication?',
    message: `"${p.title}" is removed for everyone.`,
    confirmLabel: 'Remove',
    danger: true
  })
  if (!ok) return
  try {
    await axios.delete(`/api/teacher/publications/${p.id}`)
    toast.success('Publication removed')
    await load()
  } catch (e: any) {
    toast.error(e.response?.data?.message || 'Could not remove it')
  }
}

const menuFor = (p: Publication) => [
  p.status === 'published'
    ? { label: 'Take down', run: () => setStatus(p, 'draft') }
    : { label: 'Publish', run: () => setStatus(p, 'published') },
  { label: 'Edit', run: () => openForm(p) },
  { label: 'Remove', run: () => remove(p), danger: true }
]

onMounted(load)
</script>
