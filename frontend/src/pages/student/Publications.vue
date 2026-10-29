<template>
  <!-- A level learners' work published by the GP department - open one to read it as a book -->
  <div>
    <PageHeader title="Publications" description="Work by A level students, published by the GP department. Open one to read it page by page." icon="book" accent="emerald">
      <template #filters>
        <div class="relative">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="search" type="search" placeholder="Search title or author" class="w-full md:w-60 pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
        </div>
      </template>
    </PageHeader>

    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
      <div v-for="i in 5" :key="i" class="h-64 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    </div>

    <EmptyState v-else-if="error" :title="error" icon="warning" tone="rose" />

    <EmptyState
      v-else-if="!shown.length"
      :title="publications.length ? 'Nothing matches your search' : 'No publications yet'"
      :message="publications.length ? 'Try another title or name.' : 'When the GP department publishes an A level student\'s work, it appears here.'"
      icon="book"
    />

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-7">
      <button
        v-for="p in shown"
        :key="p.id"
        type="button"
        class="group text-left min-w-0 focus:outline-none"
        @click="open(p)"
      >
        <div class="relative flex justify-center transition group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-indigo-500 rounded-lg">
          <ShelfBook flat size="md" :title="p.title" :seed="p.id" label="GP" imprint="GP Publications" :author="p.author_name" />
          <span v-if="isNew(p)" class="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-bold">NEW</span>
        </div>
        <p class="mt-2 text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">{{ p.title }}</p>
        <p class="text-xs text-gray-600 dark:text-gray-300 truncate">
          By {{ p.author_student_id === me ? 'you' : p.author_name }}<template v-if="p.author_class"> · {{ p.author_class }}</template>
        </p>
        <p class="text-[11px] text-gray-400 dark:text-gray-500">{{ dateText(p.published_at) }}</p>
      </button>
    </div>

    <LibraryPdfViewer v-if="reading" :book="reading" :with-notes="false" @close="close" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import ShelfBook from '@/components/library/ShelfBook.vue'
import LibraryPdfViewer from '@/components/library/LibraryPdfViewer.vue'
import { asBook, type Publication } from '@/utils/publications'
import type { LibraryBook } from '@/types/library'

const route = useRoute()
const router = useRouter()

const publications = ref<Publication[]>([])
const me = ref(0)
const loading = ref(true)
const error = ref('')
const search = ref('')
const reading = ref<LibraryBook | null>(null)

const shown = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return publications.value
  return publications.value.filter(p => `${p.title} ${p.author_name}`.toLowerCase().includes(q))
})

const DAY = 86400000
const isNew = (p: Publication) => !!p.published_at && Date.now() - new Date(p.published_at.replace(' ', 'T')).getTime() < 14 * DAY
const dateText = (v: string | null) => v ? new Date(v.replace(' ', 'T')).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : ''

const open = (p: Publication) => { reading.value = asBook(p) }
const close = () => {
  reading.value = null
  if (route.query.open) router.replace({ query: { ...route.query, open: undefined } })
}

onMounted(async () => {
  try {
    const res = await axios.get('/api/student/publications')
    publications.value = res.data.data.publications || []
    me.value = Number(res.data.data.me) || 0
    // From a notification: open that one straight away
    const wanted = Number(route.query.open)
    const hit = wanted ? publications.value.find(p => p.id === wanted) : null
    if (hit) open(hit)
  } catch (e: any) {
    error.value = e.response?.status === 403 ? 'Publications are for A level students' : (e.response?.data?.message || 'Publications could not load')
  } finally {
    loading.value = false
  }
})
</script>
