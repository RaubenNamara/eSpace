<template>
  <div class="w-full">
    <PageHeader title="eNotes" description="Every eNotes topic teachers have written across the school, on shelves by class and subject, for review and moderation." icon="document" accent="emerald" :active-filters="activeFilterCount">
      <template #filters>
        <div class="relative">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
          <input v-model="search" type="search" placeholder="Search topics or teachers" class="w-full md:w-56 pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
        </div>
        <PickerDropdown v-model="departmentFilter" label="Department" :options="departmentOptions" align="right" />
        <PickerDropdown v-model="subjectFilter" label="Subject" :options="subjectOptions" align="right" />
      </template>
      <StatStrip v-model="statusFilter" :items="statItems" hide-when-empty />
    </PageHeader>

    <Skeleton v-if="loading && !topics.length" variant="cards" :count="6" />

    <EmptyState v-else-if="!topics.length" icon="document" tone="emerald" title="No eNotes yet" message="Topics appear here as soon as teachers write them." />

    <template v-else>
      <!-- Class tabs: one per class (all-streams topics sit under their class) -->
      <nav v-if="classTabs.length > 2" class="flex gap-1.5 mb-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 [scrollbar-width:none]" aria-label="Classes">
        <button
          v-for="g in classTabs"
          :key="g.name"
          type="button"
          class="flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-colors"
          :class="activeClassName === g.name
            ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm shadow-emerald-500/20'
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-emerald-300 dark:hover:border-emerald-700'"
          @click="activeClassName = g.name"
        >
          {{ g.label }}
          <span class="px-1.5 rounded-md text-[11px] font-bold" :class="activeClassName === g.name ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'">{{ g.count }}</span>
        </button>
      </nav>

      <EmptyState v-if="!shelves.length" compact icon="document" tone="gray" title="No topics match" message="Try another class, department, subject or status.">
        <button type="button" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300 hover:underline" @click="clearFilters">Clear filters</button>
      </EmptyState>

      <!-- One shelf per subject; copies of a topic shared to several streams are one book -->
      <div v-else class="shelf-row flex flex-wrap items-start gap-x-5 gap-y-7">
        <Bookshelf v-for="shelf in shelves" :key="shelf.name" :title="shelf.name" :count="shelf.books.length" spines>
          <ShelfSlot
            v-for="{ topic, copies } in shelf.books"
            :key="topic.id"
            :label="topic.title"
            :title="`By ${teacherName(topic)}`"
            @open="openViewer(topic)"
          >
            <template #cover="{ size }">
              <ShelfBook
                flat
                :size="size"
                variant="notes"
                :title="topic.title"
                :seed="topic.id"
                :label="subjectTag(topic.subject_name, topic.subject_code)"
                :footer="pagesLabel(topic)"
                :cover="parseCoverDesign(topic.cover_design)"
              />
            </template>
            <ShelfBook
              spine-out
              variant="notes"
              :title="topic.title"
              :seed="topic.id"
              :label="subjectTag(topic.subject_name, topic.subject_code)"
              :footer="pagesLabel(topic)"
              :cover="parseCoverDesign(topic.cover_design)"
            />

            <template #details>
              <div class="flex items-center gap-1.5">
                <span class="px-1.5 py-0.5 rounded-full text-[10px] font-semibold" :class="statusChip(bookStatus(copies))">{{ bookStatusLabel(copies) }}</span>
                <span class="text-[10px] text-gray-400 dark:text-gray-500 truncate">{{ pagesLabel(topic) }}</span>
              </div>
              <p class="mt-1 text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">{{ topic.title }}</p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ copies.length > 1 ? copies.map(classLabel).join(', ') : classLabel(topic) }}</p>
              <p class="text-[11px] text-gray-400 dark:text-gray-500 truncate">By {{ teacherName(topic) }}<template v-if="topic.department_name"> · {{ topic.department_name }}</template></p>

              <template v-if="bookStatus(copies) === 'published'">
                <p v-if="!bookReach(copies).audience" class="mt-1.5 text-[11px] text-gray-400">No students in this class yet</p>
                <div v-else class="mt-1.5">
                  <span class="flex items-center gap-2">
                    <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      <span class="block h-full rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500" :style="{ width: bookReach(copies).percent + '%' }"></span>
                    </span>
                    <span class="text-[11px] font-semibold tabular-nums text-gray-500 dark:text-gray-400">{{ bookReach(copies).percent }}%</span>
                  </span>
                  <span class="block text-[11px] text-gray-500 dark:text-gray-400">{{ bookReach(copies).readers }} of {{ bookReach(copies).audience }} opened</span>
                </div>
              </template>
              <p v-else-if="bookStatus(copies) === 'draft'" class="mt-1.5 text-[11px] text-gray-500 dark:text-gray-400">Students can't see it yet</p>

              <div class="flex items-center -ml-1.5 mt-0.5">
                <button class="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Read" @click.stop="openViewer(topic)">
                  <AppIcon name="book" class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button v-if="copies.length === 1" class="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors" title="Delete" @click.stop="deleteTopic(topic)">
                  <AppIcon name="trash" class="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </template>
          </ShelfSlot>
        </Bookshelf>
      </div>

      <!-- Who's reading: by class, then stream, then each topic with the students reading it -->
      <section v-if="readingGroups.length" class="mt-8">
        <div class="flex items-baseline gap-2 mb-2">
          <h2 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">Who's reading</h2>
          <button v-if="readingGroups.length > 1" type="button" class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-300 hover:underline" @click="toggleAllReadingClasses">
            {{ openReadingClasses.size === readingGroups.length ? 'Close all' : 'Open all' }}
          </button>
        </div>
        <p class="-mt-1 mb-2 text-[11px] text-gray-500 dark:text-gray-400">Open a class to see its streams, then pick a stream to see its topics and who is reading each one.</p>
        <ul class="space-y-2">
          <li v-for="group in readingGroups" :key="group.name" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              type="button"
              class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/40"
              :aria-expanded="openReadingClasses.has(group.name)"
              @click="toggleReadingClass(group.name)"
            >
              <span class="text-base font-extrabold text-gray-900 dark:text-white w-16 flex-shrink-0">{{ group.name }}</span>
              <span class="min-w-0 flex-1">
                <span class="block text-[11px] text-gray-500 dark:text-gray-400">{{ group.topics.length }} {{ group.topics.length === 1 ? 'topic' : 'topics' }} · {{ group.streams.length }} {{ group.streams.length === 1 ? 'stream' : 'streams' }}</span>
                <ReachBar :reach="bookReach(group.topics)" class="max-w-sm" />
              </span>
              <svg class="w-4 h-4 flex-shrink-0 text-gray-400 transition-transform" :class="openReadingClasses.has(group.name) ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>

            <div v-if="openReadingClasses.has(group.name)" class="border-t border-gray-100 dark:border-gray-700 px-4 py-3">
              <!-- the streams of this class where topics are posted -->
              <div class="flex flex-wrap gap-2" role="tablist" :aria-label="`Streams of ${group.name}`">
                <button
                  v-for="stream in group.streams"
                  :key="stream.key"
                  type="button"
                  role="tab"
                  :aria-selected="selectedStream[group.name] === stream.key"
                  class="min-w-[7.5rem] px-3 py-2 rounded-xl border text-left transition-colors"
                  :class="selectedStream[group.name] === stream.key
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 ring-1 ring-emerald-500'
                    : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700'"
                  @click="selectStream(group.name, stream.key)"
                >
                  <span class="block text-sm font-bold text-gray-900 dark:text-white">{{ stream.label }}</span>
                  <span class="block text-[11px] text-gray-500 dark:text-gray-400">{{ stream.topics.length }} {{ stream.topics.length === 1 ? 'topic' : 'topics' }}</span>
                  <ReachBar :reach="bookReach(stream.topics)" compact />
                </button>
              </div>

              <ul v-if="selectedStream[group.name]" class="mt-3 rounded-xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                <template v-for="stream in group.streams.filter(st => st.key === selectedStream[group.name])" :key="stream.key">
                  <li v-for="topic in streamTopics(stream)" :key="topic.id" class="p-3 flex flex-wrap sm:flex-nowrap items-center gap-3">
            <button type="button" class="w-10 h-[53px] flex-shrink-0 overflow-hidden rounded-sm" :title="`Read ${topic.title}`" @click="openViewer(topic)">
              <span class="block origin-top-left scale-[0.43] pointer-events-none">
                <ShelfBook flat size="sm" variant="notes" :title="topic.title" :seed="topic.id" :label="subjectTag(topic.subject_name, topic.subject_code)" :footer="pagesLabel(topic)" :cover="parseCoverDesign(topic.cover_design)" />
              </span>
            </button>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ topic.title }}</p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                {{ topic.subject_name || 'No subject' }} · {{ classLabel(topic) }} · {{ pagesLabel(topic) }} · by {{ teacherName(topic) }}
              </p>
              <button v-if="topic.status === 'published' && Number(topic.audience)" type="button" class="mt-1 w-full max-w-sm flex items-center gap-2 group/r" title="See who is reading it" @click="readersFor = topic">
                <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <span class="block h-full rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500" :style="{ width: bookReach([topic]).percent + '%' }"></span>
                </span>
                <span class="text-[11px] whitespace-nowrap text-gray-500 dark:text-gray-400">{{ bookReach([topic]).readers }}/{{ bookReach([topic]).audience }} opened</span>
                <span class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-300 group-hover/r:underline whitespace-nowrap">Who?</span>
              </button>
              <p v-else-if="topic.status === 'published'" class="mt-1 text-[11px] text-gray-400">No students in this class yet</p>
              <p v-else class="mt-1 text-[11px]">
                <span class="px-1.5 py-0.5 rounded-full font-semibold" :class="statusChip(topic.status)">{{ statusLabel(topic.status) }}</span>
              </p>
            </div>
            <div class="flex items-center gap-1.5 flex-shrink-0">
              <select
                :value="topic.status"
                class="text-xs px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                aria-label="Status"
                @change="changeStatus(topic, ($event.target as HTMLSelectElement).value)"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
              <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" title="Read" @click="openViewer(topic)">
                <AppIcon name="book" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
              <button class="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40" title="Delete" @click="deleteTopic(topic)">
                <AppIcon name="trash" class="w-4 h-4 text-red-500 dark:text-red-400" />
              </button>
            </div>
          </li>
                </template>
              </ul>
              <p v-else class="mt-2 text-[11px] text-gray-400">Pick a stream to see its topics.</p>
            </div>
          </li>
        </ul>
      </section>

      <!-- Who has written the most, and for which classes (follows the class tab and filters) -->
      <section v-if="teacherLeaderboard.length" class="mt-8">
        <h2 class="text-sm font-bold text-gray-900 dark:text-white">Topics by Teacher</h2>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-2">Who has written the most eNotes, and for which classes{{ activeClassName !== ALL ? ` in ${activeClassName}` : '' }}.</p>
        <ul class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
          <li v-for="(row, i) in teacherLeaderboard" :key="row.teacherId" class="p-3 flex items-center gap-3">
            <span class="w-6 text-right text-xs font-bold tabular-nums text-gray-400">{{ i + 1 }}</span>
            <span class="w-9 h-9 flex-shrink-0 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200 flex items-center justify-center text-xs font-bold">{{ row.initials }}</span>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ row.name }}</p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ row.department }}<template v-if="row.published !== row.total"> · {{ row.published }} published</template></p>
              <div class="mt-1 flex flex-wrap gap-1">
                <span v-for="cls in row.classes" :key="cls.name" class="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  {{ cls.name }} &times; {{ cls.count }}
                </span>
              </div>
            </div>
            <span class="flex-shrink-0 text-right">
              <span class="block text-lg font-extrabold tabular-nums text-gray-900 dark:text-white leading-none">{{ row.total }}</span>
              <span class="text-[10px] text-gray-500 dark:text-gray-400">{{ row.total === 1 ? 'topic' : 'topics' }}</span>
            </span>
          </li>
        </ul>
      </section>
    </template>

    <AudiencePanel
      v-if="readersFor"
      :title="readersFor.title"
      :subtitle="`${classLabel(readersFor)} · ${readersFor.subject_name || ''} · by ${teacherName(readersFor)}`"
      :endpoint="`/api/admin/enotes/${readersFor.id}/readers`"
      icon="document"
      verb="read"
      @close="readersFor = null"
    />

    <TopicViewer
      v-if="viewingTopic"
      :topic="(viewingTopic as any)"
      :all-topics="(viewerList as any)"
      @close="viewingTopic = null"
      @next-topic="goToAdjacentTopic(1)"
      @previous-topic="goToAdjacentTopic(-1)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, h, defineComponent, type PropType } from 'vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import PickerDropdown, { type PickerOption } from '@/components/common/PickerDropdown.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import AudiencePanel from '@/components/common/AudiencePanel.vue'
import Bookshelf from '@/components/library/Bookshelf.vue'
import ShelfBook from '@/components/library/ShelfBook.vue'
import ShelfSlot from '@/components/library/ShelfSlot.vue'
import TopicViewer from '../../components/student/TopicViewer.vue'
import { apiService } from '../../services/api'
import { parseCoverDesign } from '@/utils/enoteCover'
import { subjectTag } from '@/utils/subjectTag'
import { orderShelves } from '@/utils/shelfOrder'
import { usePersistedRef } from '@/composables/usePersistedRef'
import type { ENoteTopic } from '../../types/enotes'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

const toast = useToastStore()
const confirmDialog = useConfirmStore()

interface Department { id: number; name: string }

const topics = ref<ENoteTopic[]>([])
const departments = ref<Department[]>([])
const loading = ref(false)
const search = ref('')
const statusFilter = ref<string | null>(null)
const departmentFilter = ref('')
const subjectFilter = ref('')
const viewingTopic = ref<ENoteTopic | null>(null)

// --- filters (all on the loaded list, like the eLibrary) ---
const teacherName = (t: ENoteTopic) => t.teacher_first_name ? `${t.teacher_first_name} ${t.teacher_last_name ?? ''}`.trim() : 'Unknown teacher'
const inDepartment = computed(() => topics.value.filter(t => !departmentFilter.value || String(t.department_id) === departmentFilter.value))

const statItems = computed<StatItem[]>(() => [
  { label: 'All topics', value: inDepartment.value.length, tone: 'gray' },
  { label: 'Published', value: inDepartment.value.filter(t => t.status === 'published').length, key: 'published', tone: 'emerald' },
  { label: 'Draft', value: inDepartment.value.filter(t => t.status === 'draft').length, key: 'draft', tone: 'amber' },
  { label: 'Archived', value: inDepartment.value.filter(t => t.status === 'archived').length, key: 'archived', tone: 'gray' }
])
const departmentOptions = computed<PickerOption<string>[]>(() => [
  { value: '', label: 'All departments' },
  ...departments.value.map(d => ({ value: String(d.id), label: d.name }))
])
// the subjects the (department's) topics are in
const subjectOptions = computed<PickerOption<string>[]>(() => {
  const subjects = [...new Map(inDepartment.value.filter(t => t.subject_id).map(t => [t.subject_id, t.subject_name || ''])).entries()]
    .sort((a, b) => a[1].localeCompare(b[1]))
  return [{ value: '', label: 'All subjects' }, ...subjects.map(([id, name]) => ({ value: String(id), label: name }))]
})
watch(departmentFilter, () => {
  if (subjectFilter.value && !subjectOptions.value.some(o => o.value === subjectFilter.value)) subjectFilter.value = ''
})
const activeFilterCount = computed(() => (departmentFilter.value ? 1 : 0) + (subjectFilter.value ? 1 : 0) + (search.value.trim() ? 1 : 0))

const filteredTopics = computed(() => {
  const q = search.value.trim().toLowerCase()
  return inDepartment.value.filter(t =>
    (!statusFilter.value || t.status === statusFilter.value) &&
    (!subjectFilter.value || String(t.subject_id) === subjectFilter.value) &&
    (!q || [t.title, t.description, teacherName(t)].some(s => (s || '').toLowerCase().includes(q))))
})

const clearFilters = () => {
  statusFilter.value = null
  departmentFilter.value = ''
  subjectFilter.value = ''
  search.value = ''
  activeClassName.value = ALL
}

// --- class tabs, then one shelf per subject ---
const ALL = '__all'
const classOf = (t: ENoteTopic) => t.class_group_name || t.class_name || 'Unassigned'
const activeClassName = usePersistedRef<string>('admin-enotes:class', '')

// Copies of one topic (shared to several streams, linked by content_group_id) are one book: the
// earliest copy stands for them, `copies` holds them all.
interface TopicBook { topic: ENoteTopic; copies: ENoteTopic[] }
const toBooks = (list: ENoteTopic[]): TopicBook[] => {
  const books: TopicBook[] = []
  const byGroup = new Map<number, TopicBook>()
  for (const topic of list) {
    const gid = topic.content_group_id
    const existing = gid ? byGroup.get(gid) : undefined
    if (existing) {
      existing.copies.push(topic)
      if (topic.id < existing.topic.id) existing.topic = topic
      continue
    }
    const book = { topic, copies: [topic] }
    books.push(book)
    if (gid) byGroup.set(gid, book)
  }
  books.forEach(b => b.copies.sort((a, c) => classLabel(a).localeCompare(classLabel(c), undefined, { numeric: true })))
  return books
}

const classTabs = computed(() => {
  const names = [...new Set(topics.value.map(classOf))].sort((a, b) => {
    if (a === 'Unassigned') return 1
    if (b === 'Unassigned') return -1
    return a.localeCompare(b, undefined, { numeric: true })
  })
  return [
    { name: ALL, label: 'All classes', count: toBooks(filteredTopics.value).length },
    ...names.map(name => ({ name, label: name, count: toBooks(filteredTopics.value.filter(t => classOf(t) === name)).length }))
  ]
})
watch(classTabs, (tabs) => {
  if (!topics.value.length) return
  if (!tabs.some(t => t.name === activeClassName.value)) activeClassName.value = ALL
}, { immediate: true })

const activeClassTopics = computed(() => activeClassName.value === ALL
  ? filteredTopics.value
  : filteredTopics.value.filter(t => classOf(t) === activeClassName.value))

const shelves = computed(() => {
  const map = new Map<string, ENoteTopic[]>()
  activeClassTopics.value.forEach(t => {
    const name = t.subject_name || 'Other'
    if (!map.has(name)) map.set(name, [])
    map.get(name)!.push(t)
  })
  return orderShelves(Array.from(map, ([name, list]) => ({ name, topics: list })), g => g.topics)
    .map(shelf => ({ name: shelf.name, books: toBooks(shelf.topics) }))
})

// --- reach: the students a topic is aimed at, and how many opened it ---
const bookReach = (copies: ENoteTopic[]) => {
  const live = copies.filter(c => c.status === 'published')
  const audience = live.reduce((n, c) => n + Number(c.audience || 0), 0)
  const readers = live.reduce((n, c) => n + Number(c.readers || 0), 0)
  return { audience, readers, percent: audience ? Math.min(100, Math.round((readers / audience) * 100)) : 0 }
}
// --- Who's reading: classes, then the streams a topic is posted to, then its topics ---
interface StreamGroup { key: string; label: string; topics: ENoteTopic[] }
interface ReadingGroup { name: string; topics: ENoteTopic[]; streams: StreamGroup[] }
const streamOf = (t: ENoteTopic) => t.class_group_name
  ? { key: '__all', label: 'All streams' }
  : t.class_stream_name
    ? { key: t.class_stream_name, label: `${t.class_name}-${t.class_stream_name}` }
    : { key: '__none', label: t.class_name ? 'No stream' : 'Whole department' }
const readingGroups = computed<ReadingGroup[]>(() => {
  const byClass = new Map<string, Map<string, StreamGroup>>()
  for (const t of activeClassTopics.value) {
    const cls = classOf(t)
    if (!byClass.has(cls)) byClass.set(cls, new Map())
    const st = streamOf(t)
    const streams = byClass.get(cls)!
    if (!streams.has(st.key)) streams.set(st.key, { ...st, topics: [] })
    streams.get(st.key)!.topics.push(t)
  }
  return [...byClass.entries()]
    .sort(([a], [b]) => (a === 'Unassigned' ? 1 : b === 'Unassigned' ? -1 : a.localeCompare(b, undefined, { numeric: true })))
    .map(([name, streams]) => {
      // "All streams" first, then the streams in order
      const list = [...streams.values()].sort((a, b) => (a.key === '__all' ? -1 : b.key === '__all' ? 1 : a.label.localeCompare(b.label, undefined, { numeric: true })))
      return { name, streams: list, topics: list.flatMap(st => st.topics) }
    })
})
// Published first, the least-read on top - where a nudge to the teacher helps most
const streamTopics = (stream: StreamGroup) => [...stream.topics].sort((a, b) =>
  (a.status === 'published' ? 0 : 1) - (b.status === 'published' ? 0 : 1) || bookReach([a]).percent - bookReach([b]).percent || a.title.localeCompare(b.title))
// the reader's next/previous follows this order
const readingList = computed(() => readingGroups.value.flatMap(g => g.streams.flatMap(streamTopics)))

const openReadingClasses = ref(new Set<string>())
const selectedStream = ref<Record<string, string>>({})
const toggleReadingClass = (name: string) => {
  const next = new Set(openReadingClasses.value)
  if (next.has(name)) next.delete(name); else next.add(name)
  openReadingClasses.value = next
}
const toggleAllReadingClasses = () => {
  const all = readingGroups.value.map(g => g.name)
  openReadingClasses.value = openReadingClasses.value.size === all.length ? new Set() : new Set(all)
}
const selectStream = (cls: string, key: string) => {
  selectedStream.value = { ...selectedStream.value, [cls]: selectedStream.value[cls] === key ? '' : key }
}
// One class on screen (a class tab is chosen): open it straight away
watch(readingGroups, groups => {
  if (groups.length === 1 && !openReadingClasses.value.has(groups[0].name)) openReadingClasses.value = new Set([groups[0].name])
}, { immediate: true })
const readersFor = ref<ENoteTopic | null>(null)

// The share of the students some topics are aimed at who opened them
const ReachBar = defineComponent({
  props: {
    reach: { type: Object as PropType<{ audience: number; readers: number; percent: number }>, required: true },
    compact: Boolean
  },
  setup(props) {
    return () => props.reach.audience
      ? h('span', { class: 'mt-1 flex items-center gap-2' }, [
          h('span', { class: 'flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden' }, [
            h('span', { class: 'block h-full rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500', style: { width: props.reach.percent + '%' } })
          ]),
          h('span', { class: 'text-[11px] whitespace-nowrap tabular-nums text-gray-500 dark:text-gray-400' },
            props.compact ? `${props.reach.percent}%` : `${props.reach.readers}/${props.reach.audience} opened · ${props.reach.percent}%`)
        ])
      : h('span', { class: 'mt-1 block text-[11px] text-gray-400' }, 'Nothing published yet')
  }
})

const classLabel = (t: ENoteTopic) => t.class_group_name
  ? `${t.class_group_name} (All Streams)`
  : t.class_stream_name ? `${t.class_name}-${t.class_stream_name}` : (t.class_name || 'Unassigned')
const pagesLabel = (t: ENoteTopic) => `${t.total_pages || 0} ${Number(t.total_pages) === 1 ? 'page' : 'pages'}`
const statusLabel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
// A shared topic counts as published when any of its copies is
const bookStatus = (copies: ENoteTopic[]) => copies.some(c => c.status === 'published') ? 'published' : copies.some(c => c.status === 'draft') ? 'draft' : 'archived'
const bookStatusLabel = (copies: ENoteTopic[]) => {
  const live = copies.filter(c => c.status === 'published').length
  return copies.length > 1 && live && live < copies.length ? `Published in ${live} of ${copies.length}` : statusLabel(bookStatus(copies))
}
const statusChip = (status: string) => status === 'published'
  ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200'
  : status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'

// --- Topics by Teacher: from what the shelves show (class tab and filters) ---
const teacherLeaderboard = computed(() => {
  const byTeacher = new Map<number, { teacherId: number; name: string; initials: string; department: string; total: number; published: number; classes: Map<string, number> }>()
  for (const t of activeClassTopics.value) {
    if (!byTeacher.has(t.teacher_id)) {
      const name = teacherName(t)
      byTeacher.set(t.teacher_id, {
        teacherId: t.teacher_id,
        name,
        initials: name.split(/\s+/).map(p => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase(),
        department: t.department_name || '—',
        total: 0,
        published: 0,
        classes: new Map()
      })
    }
    const entry = byTeacher.get(t.teacher_id)!
    entry.total++
    if (t.status === 'published') entry.published++
    const label = classLabel(t)
    entry.classes.set(label, (entry.classes.get(label) || 0) + 1)
  }
  return Array.from(byTeacher.values())
    .map(e => ({ ...e, classes: Array.from(e.classes, ([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })) }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name))
})

// --- data ---
const fetchDepartments = async () => {
  try {
    const response = await apiService.get('/admin/departments')
    if (response.data.success) departments.value = response.data.data || []
  } catch (error) {
    console.error('Failed to fetch departments:', error)
  }
}

const fetchTopics = async () => {
  loading.value = true
  try {
    const response = await apiService.get('/admin/enotes')
    if (response.data.success) topics.value = response.data.data.topics || []
  } catch (error) {
    console.error('Failed to fetch eNotes topics:', error)
    toast.error('Failed to load eNotes')
  } finally {
    loading.value = false
  }
}

const changeStatus = async (topic: ENoteTopic, status: string) => {
  try {
    await apiService.put(`/admin/enotes/${topic.id}`, { status })
    toast.success(`"${topic.title}" is now ${status}`)
    await fetchTopics()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to update topic status')
  }
}

// The viewer steps through the topics in the order the list shows them
const viewerList = computed(() => readingList.value)
const fetchTopicDetail = async (id: number): Promise<ENoteTopic | null> => {
  try {
    const response = await apiService.get(`/admin/enotes/${id}`)
    return response.data.success ? response.data.data : null
  } catch (error) {
    console.error('Failed to fetch topic detail:', error)
    toast.error('Failed to open the topic')
    return null
  }
}
const openViewer = async (topic: ENoteTopic) => {
  viewingTopic.value = await fetchTopicDetail(topic.id)
}
const goToAdjacentTopic = async (direction: 1 | -1) => {
  if (!viewingTopic.value) return
  const list = viewerList.value
  const next = list[list.findIndex(t => t.id === viewingTopic.value!.id) + direction]
  if (next) viewingTopic.value = await fetchTopicDetail(next.id)
}

const deleteTopic = async (topic: ENoteTopic) => {
  if (!await confirmDialog.open({ title: 'Delete topic', message: `Delete "${topic.title}" (${classLabel(topic)})? This cannot be undone.`, confirmLabel: 'Delete', danger: true })) return
  try {
    await apiService.delete(`/admin/enotes/${topic.id}`)
    await fetchTopics()
    toast.success('Topic deleted')
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to delete topic')
  }
}

onMounted(() => {
  fetchDepartments()
  fetchTopics()
})
</script>
