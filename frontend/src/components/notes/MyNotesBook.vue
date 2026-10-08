<template>
  <!-- A topic's notes as a book you flip through: a cover, then every note on its own page(s) -
       the eNote page it was written on as the heading, paragraphs set apart, a long note running on
       to the next page - plain paper or the notebook look. A student can remove a note here. -->
  <div class="fixed inset-0 z-50 flex flex-col overflow-hidden bg-stone-900/80 backdrop-blur-sm" @keydown.left="prev" @keydown.right="next" tabindex="-1" ref="rootRef">
    <header class="flex items-center gap-3 px-4 sm:px-6 py-3 text-white">
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-semibold uppercase tracking-widest text-white/60">{{ subject }} · {{ kindLabel }}</p>
        <h2 class="text-base sm:text-lg font-bold truncate">{{ title }}</h2>
      </div>
      <router-link v-if="openLink" :to="openLink" class="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20">Open the {{ kindLabel === 'eNotes' ? 'topic' : kindLabel === 'eLibrary' ? 'book' : 'paper' }}</router-link>
      <button type="button" class="p-2 rounded-lg hover:bg-white/15" aria-label="Close" @click="emit('close')">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </header>

    <div class="flex-1 min-h-0 flex items-center justify-center px-2 sm:px-8 pb-2">
      <div class="w-full max-w-4xl h-full max-h-[680px]">
        <BookFlipbook
          :key="bookKey"
          ref="bookRef"
          mode="html"
          :page-width="440"
          :page-height="600"
          :show-cover="true"
          :edge-flip-only="true"
          @flip="page = $event"
        >
          <template #pages>
            <!-- Cover -->
            <div class="mn-page mn-cover">
              <div class="h-full flex flex-col items-center justify-center text-center px-8">
                <p class="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-200/80">{{ subject }}</p>
                <div class="my-5 w-16 h-px bg-amber-200/50"></div>
                <h3 class="text-2xl font-extrabold leading-tight text-white" style="font-family: Georgia, 'Times New Roman', serif">{{ title }}</h3>
                <p class="mt-3 text-sm text-amber-100/80">My notes · {{ notes.length }} {{ notes.length === 1 ? 'page' : 'pages' }}</p>
                <p v-if="owner" class="mt-auto pt-6 text-xs text-white/60">{{ owner }}</p>
              </div>
            </div>

            <!-- One sheet per note (a long note runs on to more) -->
            <div v-for="(sheet, i) in sheets" :key="sheet.key" class="mn-page" :class="notebook ? 'notebook-paper mn-notebook' : 'mn-paper'">
              <div class="h-full flex flex-col px-7 pt-7 pb-5">
                <div class="flex items-start gap-2 pb-2 mb-4 border-b-2" :class="notebook ? 'border-rose-300/70' : 'border-amber-700/25'">
                  <span class="flex-shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider" :class="notebook ? 'bg-blue-100 text-blue-800' : 'bg-amber-800 text-amber-50'">{{ sheet.pageLabel }}</span>
                  <p class="min-w-0 flex-1 text-sm font-bold text-stone-800 leading-snug" :style="notebook ? 'font-family: \'Patrick Hand\', cursive; font-size: 1.05rem' : 'font-family: Georgia, serif'">
                    {{ sheet.heading }}<span v-if="sheet.continued" class="font-normal italic text-stone-500"> (continued)</span>
                  </p>
                </div>
                <div class="flex-1 min-h-0 overflow-hidden text-stone-800" :class="notebook ? 'mn-hand' : 'mn-serif'">
                  <p v-for="(para, j) in sheet.paragraphs" :key="j" class="mb-3.5 whitespace-pre-line" :class="{ 'mn-drop': !sheet.continued && j === 0 }">{{ para }}</p>
                </div>
                <div class="flex items-center gap-2 pt-2 mt-2 border-t text-[10px] text-stone-500" :class="notebook ? 'border-blue-200' : 'border-amber-700/15'">
                  <span class="flex-1 truncate">{{ sheet.first ? `Written ${timeAgo(sheet.updatedAt)}` : '' }}</span>
                  <span class="font-semibold tabular-nums">{{ i + 1 }}</span>
                  <span class="flex-1 flex justify-end">
                    <button v-if="sheet.first" type="button" class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-rose-700 hover:bg-rose-100" title="Delete this note" @click.stop="remove(sheet.noteId)">
                      <AppIcon name="trash" class="w-3.5 h-3.5" />Delete
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <!-- Back cover, so the last page lies flat -->
            <div class="mn-page mn-cover">
              <div class="h-full flex items-center justify-center text-amber-100/70 text-xs tracking-widest uppercase">The end</div>
            </div>
          </template>
        </BookFlipbook>
      </div>
    </div>

    <footer class="flex items-center justify-center gap-3 pb-4 text-white">
      <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 disabled:opacity-40" :disabled="page <= 0" @click="prev">‹ Back</button>
      <span class="text-xs text-white/70 tabular-nums w-28 text-center">{{ page === 0 ? 'Cover' : `Page ${Math.min(page, sheets.length)} of ${sheets.length}` }}</span>
      <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 disabled:opacity-40" :disabled="page >= sheets.length + 1" @click="next">Next ›</button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import axios from 'axios'
import BookFlipbook from '@/components/common/BookFlipbook.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { timeAgo } from '@/components/dashboard/teacher/time'
import { useConfirmStore } from '@/stores/confirm'
import { useToastStore } from '@/stores/toast'
import type { MyNote } from '@/utils/myNotesPdf'

const props = defineProps<{ title: string; subject: string; kindLabel: string; notes: MyNote[]; notebook: boolean; owner?: string; openLink?: string }>()
const emit = defineEmits<{ close: []; deleted: [id: string] }>()
const confirmDialog = useConfirmStore()
const toast = useToastStore()

const rootRef = ref<HTMLElement | null>(null)
const bookRef = ref<InstanceType<typeof BookFlipbook> | null>(null)
const page = ref(0)
const bookKey = ref(0)

// About what fits on one page at this size (handwriting is bigger); a longer note runs on to the next
const pageChars = computed(() => (props.notebook ? 680 : 1050))

interface Sheet { key: string; noteId: string; pageLabel: string; heading: string; paragraphs: string[]; continued: boolean; first: boolean; updatedAt: string }

const paragraphsOf = (text: string) => text.replace(/\r/g, '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

// Break a paragraph too long for one page at a sentence (or, failing that, a word) boundary
const splitLong = (para: string, max: number): string[] => {
  const out: string[] = []
  let rest = para
  while (rest.length > max) {
    let cut = rest.lastIndexOf('. ', max)
    if (cut < max * 0.5) cut = rest.lastIndexOf(' ', max)
    if (cut <= 0) cut = max
    out.push(rest.slice(0, cut + 1).trim())
    rest = rest.slice(cut + 1).trim()
  }
  if (rest) out.push(rest)
  return out
}

const sheets = computed<Sheet[]>(() => {
  const out: Sheet[] = []
  for (const n of props.notes) {
    // The page's own title when it has one (the label already says which page)
    const heading = n.page_title && !/^page\s*\d*$/i.test(n.page_title.trim()) ? n.page_title : 'My summary'
    const pageLabel = n.kind === 'enote' ? `Page ${n.page}` : `p. ${n.page}`
    const PAGE_CHARS = pageChars.value
    const pieces = paragraphsOf(n.text).flatMap(p => splitLong(p, PAGE_CHARS))
    let current: string[] = []
    let size = 0
    let part = 0
    const flush = () => {
      if (!current.length) return
      out.push({ key: `${n.id}-${part}`, noteId: n.id, pageLabel, heading, paragraphs: current, continued: part > 0, first: part === 0, updatedAt: n.updated_at })
      part++
      current = []
      size = 0
    }
    for (const p of pieces) {
      // a paragraph costs its length plus the gap after it
      const cost = p.length + 60
      if (size + cost > PAGE_CHARS && current.length) flush()
      current.push(p)
      size += cost
    }
    flush()
  }
  return out
})

const prev = () => bookRef.value?.flipPrev()
const next = () => bookRef.value?.flipNext()

const remove = async (id: string) => {
  if (!await confirmDialog.open({ title: 'Delete this note', message: 'It will be gone from your notes for good.', confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.delete(`/api/student/my-notes/${id}`)
    emit('deleted', id)
    toast.success('Note deleted')
    // The pages changed - build the book again, back at the cover
    page.value = 0
    bookKey.value++
    await nextTick()
  } catch (e: any) {
    toast.error(e?.response?.data?.message || 'The note could not be deleted')
  }
}

onMounted(() => rootRef.value?.focus())
</script>

<style scoped>
.mn-page {
  background: #fdfaf3;
  box-shadow: inset 0 0 30px rgba(120, 90, 40, 0.08);
  overflow: hidden;
}
.mn-paper {
  background: linear-gradient(90deg, rgba(120, 90, 40, 0.06), transparent 6%), #fdfaf3;
}
.mn-cover {
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.12), transparent 55%), linear-gradient(160deg, #7c2d12, #431407);
  box-shadow: inset 0 0 0 6px rgba(253, 230, 138, 0.15);
}
.mn-serif {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 0.94rem;
  line-height: 1.65;
}
.mn-hand {
  font-family: 'Patrick Hand', cursive;
  font-size: 1.12rem;
  line-height: 1.75rem;
  color: #1e3a8a;
}
.mn-hand > p {
  /* a whole ruled line between paragraphs (the notebook paper's own rules reset margins) */
  margin: 0 0 1.75rem !important;
}
.mn-serif > p {
  margin: 0 0 0.9rem !important;
}
.mn-drop::first-letter {
  float: left;
  font-size: 2.9em;
  line-height: 0.9;
  padding: 0.08em 0.1em 0 0;
  font-weight: 700;
  color: #92400e;
}
.mn-notebook .mn-drop::first-letter {
  color: #be123c;
}
</style>
