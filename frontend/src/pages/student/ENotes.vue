<template>
  <div>
    <PageHeader title="eNotes" description="Study notes from your teachers - read page by page, listen along, and pick up where you stopped." icon="document" accent="indigo">
      <template #filters>
        <div class="relative">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="searchQuery" type="search" placeholder="Search topics" class="w-full md:w-56 pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
        </div>
      </template>
      <StatStrip v-if="!loading && topics.length" :items="statItems" />
    </PageHeader>

    <!-- Pick up where you stopped -->
    <button
      v-if="!loading && !searchQuery && continueTopic"
      type="button"
      class="mb-5 w-full text-left rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-4 sm:p-5 shadow-lg shadow-indigo-500/20 flex items-center gap-4 hover:opacity-95"
      @click="openReader(continueTopic, 'resume')"
    >
      <span class="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0"><AppIcon name="book" class="w-6 h-6" /></span>
      <span class="min-w-0 flex-1">
        <span class="block text-[11px] font-bold uppercase tracking-widest text-indigo-100">Continue reading</span>
        <span class="block text-base sm:text-lg font-bold leading-tight truncate">{{ continueTopic.title }}</span>
        <span class="mt-1.5 flex items-center gap-2">
          <span class="flex-1 max-w-xs h-1.5 rounded-full bg-white/25 overflow-hidden"><span class="block h-full rounded-full bg-white" :style="{ width: `${progressOf(continueTopic)}%` }"></span></span>
          <span class="text-xs text-indigo-100 whitespace-nowrap">Page {{ continueTopic.resume_page_number }} of {{ continueTopic.active_pages || continueTopic.total_pages }}</span>
        </span>
      </span>
      <span class="hidden sm:inline-flex px-4 py-2 rounded-xl bg-white text-indigo-700 text-sm font-bold">Continue</span>
    </button>

    <!-- Offline: only the topics saved on this device are on the shelf -->
    <div v-if="showingOffline" class="mb-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-100">
      <svg class="w-4 h-4 flex-shrink-0 mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728M5.636 18.364a9 9 0 010-12.728M3 3l18 18" /></svg>
      <p>Only the eNotes saved on this device are shown. Notes and highlights you make now are sent when you're back online.</p>
    </div>

    <!-- Loading: an empty shelf while topics arrive -->
    <div v-if="loading" class="space-y-8">
      <div v-for="i in 2" :key="i" class="animate-pulse">
        <div class="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700 mb-2"></div>
        <div class="h-56 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 flex items-start gap-3">
      <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p class="text-red-800 dark:text-red-200">{{ error }}</p>
    </div>

    <!-- Bookcase: one shelf per subject, each topic an exercise book standing on it -->
    <div v-else-if="filteredSubjectGroups.length > 0" class="shelf-row flex flex-wrap items-start gap-x-5 gap-y-7">
      <Bookshelf
        v-for="group in filteredSubjectGroups"
        :key="group.id"
        :title="group.name"
        :count="group.topics.length"
        :fresh="group.topics.filter(item => isRecent(item)).length"
        spines
      >
        <ShelfSlot
          v-for="topic in group.topics"
          :key="topic.id"
          :label="topic.title"
          @open="(el) => openTopic(topic, el)"
        >
          <template #cover="{ size }">
            <ShelfBook flat :size="size"
            variant="notes"
            :title="topic.title"
            :seed="topic.id"
            :label="subjectTag(topic.subject_name, topic.subject_code)"
            :footer="`${topic.total_pages} ${topic.total_pages === 1 ? 'page' : 'pages'}`"
            :cover="parseCoverDesign(topic.cover_design)"
           />
          </template>
          <ShelfBook
            spine-out
            :is-new="isRecent(topic)"
            :saved="!!offline.downloads[topic.id]"
            variant="notes"
            :title="topic.title"
            :seed="topic.id"
            :label="subjectTag(topic.subject_name, topic.subject_code)"
            :footer="`${topic.total_pages} ${topic.total_pages === 1 ? 'page' : 'pages'}`"
            :cover="parseCoverDesign(topic.cover_design)"
          />
          <template #details>
          <p class="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">{{ topic.title }}</p>
          <p v-if="topic.teacher_first_name" class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ topic.teacher_first_name }} {{ topic.teacher_last_name }}</p>
          <p class="text-[11px] text-gray-400 dark:text-gray-500">{{ topic.total_pages }} {{ topic.total_pages === 1 ? 'page' : 'pages' }}<template v-if="topic.narration_voice"> &middot; <span class="inline-flex items-center gap-0.5 text-purple-600 dark:text-purple-300 align-bottom"><AppIcon name="speaker" class="w-3 h-3" /> Audio</span></template></p>
          <SaveOfflineButton :item="topic" />
          </template>
        </ShelfSlot>
      </Bookshelf>
    </div>

    <!-- The same topics as a list: how far you've read each, and straight in -->
    <section v-if="!loading && !error && listTopics.length" class="mt-8">
      <h2 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Your topics</h2>
      <ul class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
        <li v-for="topic in listTopics" :key="topic.id" class="p-3 sm:p-4 flex items-center gap-3">
          <span class="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center" :class="stateOf(topic) === 'done' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200' : stateOf(topic) === 'reading' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300'">
            <AppIcon :name="stateOf(topic) === 'done' ? 'check-circle' : 'book'" class="w-5 h-5" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ topic.title }}</p>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ topic.subject_name }} · {{ topic.active_pages || topic.total_pages }} pages<template v-if="topic.teacher_first_name"> · {{ topic.teacher_first_name }} {{ topic.teacher_last_name }}</template></p>
            <div v-if="stateOf(topic) !== 'new'" class="mt-1 flex items-center gap-2 max-w-xs">
              <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><span class="block h-full rounded-full" :class="stateOf(topic) === 'done' ? 'bg-emerald-500' : 'bg-indigo-500'" :style="{ width: `${progressOf(topic)}%` }"></span></span>
              <span class="text-[11px] tabular-nums text-gray-500 dark:text-gray-400">{{ stateOf(topic) === 'done' ? 'Finished' : `${progressOf(topic)}%` }}</span>
            </div>
          </div>
          <button type="button" class="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold" :class="stateOf(topic) === 'reading' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'" @click="openReader(topic, stateOf(topic) === 'reading' ? 'resume' : 'fresh')">
            {{ stateOf(topic) === 'reading' ? 'Continue' : stateOf(topic) === 'done' ? 'Read again' : 'Start' }}
          </button>
        </li>
      </ul>
    </section>

    <!-- Empty State -->
    <div v-else class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {{ subjectGroups.length === 0 ? (showingOffline ? 'No eNotes saved on this device' : 'No eNotes yet') : 'No topics match your search' }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        {{ subjectGroups.length === 0 ? 'Your teachers haven\'t published any eNotes topics yet.' : 'Try a different search.' }}
      </p>
    </div>

    <!-- Opening a book: it comes off the shelf, waits with Start reading / Cancel, then opens before
         the reader loads (or goes back to its place) -->
    <BookOpenTransition
      v-if="opening"
      :from="opening.el"
      :title="opening.topic.title"
      :label="subjectTag(opening.topic.subject_name, opening.topic.subject_code)"
      :subtitle="opening.topic.teacher_first_name ? `${opening.topic.teacher_first_name} ${opening.topic.teacher_last_name || ''}`.trim() : ''"
      :outcomes="opening.topic.learning_outcomes"
      :prepare="() => prepareReader(opening!.topic.id)"
      :resume="resumeOf(opening.topic)"
      @opened="(how) => openReader(opening!.topic, how)"
      @closed="opening = null"
    >
      <ShelfBook
        flat
        size="lg"
        variant="notes"
        :title="opening.topic.title"
        :seed="opening.topic.id"
        :label="subjectTag(opening.topic.subject_name, opening.topic.subject_code)"
        :footer="`${opening.topic.total_pages} ${opening.topic.total_pages === 1 ? 'page' : 'pages'}`"
        :cover="parseCoverDesign(opening.topic.cover_design)"
      />
    </BookOpenTransition>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Bookshelf from '@/components/library/Bookshelf.vue'
import ShelfBook from '@/components/library/ShelfBook.vue'
import ShelfSlot from '@/components/library/ShelfSlot.vue'
import BookOpenTransition from '@/components/library/BookOpenTransition.vue'
import { prefetchStudentTopic } from '@/utils/enotePrefetch'
import { useRouter } from 'vue-router'
import type { ENoteTopic } from '@/types/enotes'
import { parseCoverDesign } from '@/utils/enoteCover'
import { subjectTag } from '@/utils/subjectTag'
import { orderShelves, isRecent } from '@/utils/shelfOrder'
import SaveOfflineButton from '@/components/offline/SaveOfflineButton.vue'
import { offline } from '@/utils/offline/enotes'

interface SubjectGroup {
  id: number
  name: string
  code?: string
  topics: ENoteTopic[]
}

const API_BASE = '/api'
const router = useRouter()

const topics = ref<ENoteTopic[]>([])
// Every subject the student is enrolled in - each gets a shelf, even before it has any topics
const enrolledSubjects = ref<{ id: number; name: string; code?: string }[]>([])
const searchQuery = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
// The list came from this device's saved copies (no network)
const showingOffline = ref(false)

const subjectGroups = computed<SubjectGroup[]>(() => {
  const map = new Map<number, SubjectGroup>()
  enrolledSubjects.value.forEach(subj => {
    map.set(subj.id, { id: subj.id, name: subj.name, code: subj.code, topics: [] })
  })
  topics.value.forEach(topic => {
    const sid = topic.subject_id || 0
    if (!map.has(sid)) {
      map.set(sid, { id: sid, name: topic.subject_name || 'General', code: topic.subject_code, topics: [] })
    }
    map.get(sid)!.topics.push(topic)
  })
  // Only subjects with something on them get a shelf
  return orderShelves(Array.from(map.values()).filter(g => g.topics.length > 0), g => g.topics)
})

// Search narrows each shelf to its matching topics (a subject-name match keeps the whole shelf),
// and drops shelves left empty.
const filteredSubjectGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return subjectGroups.value
  return subjectGroups.value
    .map(group => group.name.toLowerCase().includes(q)
      ? group
      : { ...group, topics: group.topics.filter(topic => topic.title.toLowerCase().includes(q) || (topic.description || '').toLowerCase().includes(q)) })
    .filter(group => group.topics.length > 0)
})

// ---- The student's own reading ----
type Progress = ENoteTopic & { progress_percent?: number | string | null; progress_completed_at?: string | null; progress_last_read_at?: string | null }
const progressOf = (t: Progress) => {
  if (t.progress_completed_at) return 100
  const pct = Number(t.progress_percent || 0)
  if (pct) return Math.min(100, Math.round(pct))
  const page = Number(t.resume_page_number || 0)
  const total = Number(t.active_pages || t.total_pages || 0)
  return total && page ? Math.round((page / total) * 100) : 0
}
const stateOf = (t: Progress): 'done' | 'reading' | 'new' =>
  t.progress_completed_at || progressOf(t) >= 100 ? 'done' : (t.resume_page_id || progressOf(t) > 0) ? 'reading' : 'new'
// The topic read most recently and not finished yet
const continueTopic = computed(() => (topics.value as Progress[])
  .filter(t => stateOf(t) === 'reading' && t.resume_page_id && Number(t.resume_page_number || 0) > 1)
  .sort((a, b) => String(b.progress_last_read_at || '').localeCompare(String(a.progress_last_read_at || '')))[0] ?? null)
const statItems = computed<StatItem[]>(() => {
  const all = topics.value as Progress[]
  return [
    { label: 'Topics', value: all.length, tone: 'indigo' },
    { label: 'Reading', value: all.filter(t => stateOf(t) === 'reading').length, tone: 'sky' },
    { label: 'Finished', value: all.filter(t => stateOf(t) === 'done').length, tone: 'emerald' },
    { label: 'Not started', value: all.filter(t => stateOf(t) === 'new').length, tone: 'gray' }
  ]
})
// Reading first, then not started, then finished
const listTopics = computed(() => {
  const rank = { reading: 0, new: 1, done: 2 }
  return filteredSubjectGroups.value.flatMap(g => g.topics as Progress[]).sort((a, b) => rank[stateOf(a)] - rank[stateOf(b)])
})

// The book being opened (BookOpenTransition plays, then the reader loads)
const opening = ref<{ topic: ENoteTopic; el: HTMLElement | null } | null>(null)
// While the book lists the topic's learning outcomes, load the reader and the topic's pages so it
// opens straight onto them
const prepareReader = (id: number) => Promise.all([
  import('@/pages/teacher/ENotePreview.vue'),
  prefetchStudentTopic(id)
])
// A topic the student has read before (their place is past the first page) offers to continue
const resumeOf = (topic: ENoteTopic) => {
  const page = Number(topic.resume_page_number || 0)
  const total = Number(topic.active_pages || topic.total_pages || 0)
  return topic.resume_page_id && page > 1 ? { page, total: Math.max(total, page) } : null
}
const openReader = (topic: ENoteTopic, how: 'resume' | 'fresh') => {
  const query = how === 'resume' && topic.resume_page_id ? `resumePage=${topic.resume_page_id}&opened=1` : 'opened=1'
  router.push(`/student/enotes/${topic.id}?${query}`)
}
const openTopic = (topic: ENoteTopic, el: HTMLElement | null) => {
  if (opening.value) return
  opening.value = { topic, el }
}

const loadTopics = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(`${API_BASE}/student/enotes/topics`)
    if (response.data.success) {
      showingOffline.value = !!response.data.offline
      topics.value = response.data.data.topics || []
      enrolledSubjects.value = response.data.data.subjects || []
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load eNotes'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadTopics()
})
</script>
