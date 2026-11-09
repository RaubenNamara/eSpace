<template>
  <!-- The colleagues' published eNotes, books or papers in this department, on the same bookcase
       students see: one shelf per subject. Opening one plays the same take-it-off-the-shelf
       animation, then the page opens it in the student's reader. View only - unless the HOD lets
       this teacher edit colleagues' work (can_edit, Services/DepartmentContent). -->
  <div>
    <div class="mb-4 flex flex-wrap items-center gap-3">
      <p class="flex-1 min-w-[14rem] text-sm text-gray-600 dark:text-gray-300">
        Your colleagues' {{ noun }}, as students see them. You can open and read them; only the teacher who added one can change it.
      </p>
      <div class="relative">
        <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
        <input v-model="search" type="search" :placeholder="`Search ${noun} or teachers`" class="w-full md:w-64 pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
      </div>
    </div>

    <div v-if="loading && !items.length" class="space-y-8">
      <div v-for="i in 2" :key="i" class="animate-pulse">
        <div class="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700 mb-2"></div>
        <div class="h-56 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>

    <EmptyState
      v-else-if="!shelves.length"
      compact
      icon="users"
      tone="gray"
      :title="published.length ? `No ${noun} match your search` : `No ${noun} from colleagues yet`"
      :message="published.length ? 'Try a different search.' : `When other teachers in your department publish ${noun}, they show here.`"
    />

    <div v-else class="shelf-row flex flex-wrap items-start gap-x-5 gap-y-7">
      <Bookshelf v-for="g in shelves" :key="g.id" :title="g.name" :count="g.items.length" :fresh="g.items.filter(x => isRecent(x.raw as any)).length" spines>
        <ShelfSlot v-for="it in g.items" :key="it.id" :label="it.title" @open="(el) => startOpening(it, el)">
          <template #cover="{ size }">
            <ShelfBook flat :size="size" v-bind="bookProps(it)" />
          </template>
          <ShelfBook spine-out :is-new="isRecent(it.raw as any)" v-bind="bookProps(it)" />
          <template #details>
            <p class="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">{{ it.title }}</p>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ it.owner || 'A colleague' }}</p>
            <p class="text-[11px] text-gray-400 dark:text-gray-500">{{ detailOf(it) }}</p>
            <div v-if="it.canEdit" class="mt-1 flex items-center gap-1">
              <button type="button" class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" title="Edit (your HOD lets you edit colleagues' work)" @click.stop="$emit('edit', it.raw)">
                <AppIcon name="pencil" class="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
              </button>
              <button type="button" class="p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30" title="Delete" @click.stop="$emit('remove', it.raw)">
                <AppIcon name="trash" class="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
              </button>
            </div>
            <span v-else class="mt-1 inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300">View only</span>
          </template>
        </ShelfSlot>
      </Bookshelf>
    </div>

    <BookOpenTransition
      v-if="opening"
      :from="opening.el"
      :title="opening.item.title"
      :label="labelOf(opening.item)"
      :subtitle="opening.item.owner"
      @opened="finishOpening"
      @closed="opening = null"
    >
      <ShelfBook flat size="lg" v-bind="bookProps(opening.item)" />
    </BookOpenTransition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Bookshelf from '@/components/library/Bookshelf.vue'
import ShelfBook from '@/components/library/ShelfBook.vue'
import ShelfSlot from '@/components/library/ShelfSlot.vue'
import BookOpenTransition from '@/components/library/BookOpenTransition.vue'
import { parseCoverDesign } from '@/utils/enoteCover'
import { subjectTag } from '@/utils/subjectTag'
import { orderShelves, isRecent } from '@/utils/shelfOrder'
import type { DeptItem } from './DepartmentWork.vue'

const props = defineProps<{ items: DeptItem[]; loading: boolean; kind: 'library' | 'enotes' | 'itembank'; noun: string }>()
const emit = defineEmits<{ open: [unknown]; edit: [unknown]; remove: [unknown] }>()

const search = ref('')
const raw = (it: DeptItem) => it.raw as Record<string, any>

// Students only ever see published work, so the shelves show the same
const published = computed(() => props.items.filter(it => it.status === 'published'))

const shelves = computed(() => {
  const q = search.value.trim().toLowerCase()
  const map = new Map<number, { id: number; name: string; items: DeptItem[] }>()
  for (const it of published.value) {
    const r = raw(it)
    const name = r.subject_name || 'General'
    if (q && !`${it.title} ${it.owner} ${name}`.toLowerCase().includes(q)) continue
    const sid = Number(r.subject_id) || 0
    if (!map.has(sid)) map.set(sid, { id: sid, name, items: [] })
    map.get(sid)!.items.push(it)
  }
  return orderShelves([...map.values()], g => g.items.map(x => x.raw as any))
})

const labelOf = (it: DeptItem) => subjectTag(raw(it).subject_name, raw(it).subject_code)
const pages = (it: DeptItem) => Number(raw(it).total_pages) || 0

const bookProps = (it: DeptItem) => {
  const r = raw(it)
  const common = { title: it.title, seed: it.id, label: labelOf(it) }
  if (props.kind === 'enotes') {
    return { ...common, variant: 'notes' as const, footer: `${pages(it)} ${pages(it) === 1 ? 'page' : 'pages'}`, cover: parseCoverDesign(r.cover_design) }
  }
  if (props.kind === 'library') {
    return { ...common, coverImage: r.cover_image, cover: parseCoverDesign(r.cover_design), author: r.author, pages: r.total_pages }
  }
  return { ...common, coverImage: r.cover_image, pages: r.total_pages }
}

const detailOf = (it: DeptItem) => {
  const r = raw(it)
  const n = pages(it)
  if (props.kind === 'enotes') return `${n} ${n === 1 ? 'page' : 'pages'}`
  if (props.kind === 'itembank' && r.question_type === 'paper') return `Questions to try${n ? ` · ${n} questions` : ''}`
  const type = props.kind === 'itembank' ? 'PDF' : String(r.file_type || 'pdf').toUpperCase()
  return `${type}${n ? ` · ${n} pages` : ''}`
}

// The book comes off the shelf (BookOpenTransition), then the page opens its reader
const opening = ref<{ item: DeptItem; el: HTMLElement | null } | null>(null)
const startOpening = (item: DeptItem, el: HTMLElement | null) => {
  if (!opening.value) opening.value = { item, el }
}
const finishOpening = () => {
  const item = opening.value?.item
  opening.value = null
  if (item) emit('open', item.raw)
}
</script>
