<template>
  <!-- The teacher's marked sheets as an open book: two facing pages on wide screens (one on
       phones), every page the same size, turned with the arrows, the page dots or the keyboard. -->
  <div class="w-full" @keydown.left.prevent="turn(-1)" @keydown.right.prevent="turn(1)" tabindex="0" aria-label="Your marked work. Use the arrow keys to turn pages.">
    <p v-if="sheets.length === 0" class="text-sm text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-950/40 rounded-xl p-6 text-center">
      Your teacher has not marked on your work.
    </p>

    <template v-else>
      <!-- Contents: jump straight to any part -->
      <div class="flex flex-wrap items-center justify-center gap-1.5 mb-4">
        <button
          v-for="(s, i) in sheets"
          :key="s.key"
          type="button"
          @click="goTo(i)"
          class="px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors max-w-[14rem] truncate"
          :class="visibleIndexes.includes(i)
            ? 'bg-indigo-600 text-white shadow-sm'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'"
          :title="s.base.title"
        >{{ i + 1 }}. {{ shortTitle(s.base.title) }}</button>
      </div>

      <div class="relative">
        <!-- The book -->
        <div
          class="book mx-auto grid gap-0"
          :class="perView === 2 ? 'grid-cols-2 max-w-[1640px]' : 'grid-cols-1 max-w-[820px]'"
        >
          <article
            v-for="(i, slot) in spreadSlots"
            :key="`${spread}-${slot}`"
            class="page relative flex flex-col bg-white text-gray-900 min-w-0"
            :class="[
              perView === 2 ? (slot === 0 ? 'page-left rounded-l-2xl' : 'page-right rounded-r-2xl') : 'rounded-2xl',
              i === null ? 'page-blank' : '',
            ]"
          >
            <template v-if="i !== null">
              <header class="px-4 sm:px-6 pt-4 sm:pt-5 pb-2 border-b border-stone-200">
                <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">{{ sectionKind(sheets[i]) }}</p>
                <h3 class="text-sm sm:text-base font-semibold leading-snug text-gray-900">{{ sheets[i].base.title }}</h3>
              </header>
              <div class="flex-1 px-3 sm:px-5 py-3 sm:py-4">
                <div class="rounded-lg border border-stone-200 overflow-hidden bg-white">
                  <AnnotationCanvas
                    :width="sheets[i].rendered.width"
                    :height="sheets[i].rendered.height"
                    :background="sheets[i].rendered.background"
                    :readonly-layers="sheets[i].rendered.textLayers"
                    :editable-layer="layers[sheets[i].key] || EMPTY_ANNOTATION_LAYER"
                    mode="readonly"
                    tool="select"
                    color="#dc2626"
                    :stroke-width="3"
                    ink-colored-marks
                  />
                </div>
              </div>
              <footer class="px-4 sm:px-6 pb-3 text-center text-[11px] font-medium text-stone-400 tracking-wide">
                Page {{ i + 1 }} of {{ sheets.length }}
              </footer>
            </template>
            <div v-else class="flex-1 flex items-center justify-center p-10 text-xs italic text-stone-300">End of marked work</div>
          </article>
        </div>

        <!-- Page turning -->
        <div class="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            @click="turn(-1)"
            :disabled="spread === 0"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Previous
          </button>
          <div class="flex items-center gap-1.5" aria-hidden="true">
            <button
              v-for="n in spreadCount"
              :key="n"
              type="button"
              tabindex="-1"
              @click="spread = n - 1"
              class="h-2 rounded-full transition-all"
              :class="spread === n - 1 ? 'w-6 bg-indigo-600' : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'"
            ></button>
          </div>
          <button
            type="button"
            @click="turn(1)"
            :disabled="spread >= spreadCount - 1"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import type { AnnotationLayerJSON } from '@/types'
import { EMPTY_ANNOTATION_LAYER } from '@/types'
import type { MarkingAnnotation } from '@/types/virtualLab'
import AnnotationCanvas from '@/components/assignment/AnnotationCanvas.vue'
import { renderSheet, type MarkingSection } from './markingSheets'

const props = defineProps<{ saved?: MarkingAnnotation[] }>()

// Reading order of a practical write-up, whatever order the teacher marked it in
const rank = (key: string) => (key === 'results' ? 0 : key === 'graph' ? 1 : key === 'observations' ? 3 : key === 'conclusion' ? 5 : 4)
const sections = computed<MarkingSection[]>(() =>
  (props.saved || [])
    .filter((m) => (m.annotation?.objects?.length || 0) > 0)
    .map((m) => ({ key: m.section_key, base: m.base }))
    .sort((x, y) => rank(x.key) - rank(y.key) || x.key.localeCompare(y.key, undefined, { numeric: true })),
)
const sheets = computed(() => sections.value.map((s) => ({ ...s, rendered: renderSheet(s.base) })))
const layers = computed<Record<string, AnnotationLayerJSON>>(() =>
  Object.fromEntries((props.saved || []).map((m) => [m.section_key, m.annotation || { objects: [] }])),
)

const sectionKind = (s: MarkingSection) =>
  s.key === 'results' ? 'Results' : s.key === 'graph' ? 'Graph' : s.key === 'observations' ? 'Observations' : s.key === 'conclusion' ? 'Conclusion' : 'Question'
const shortTitle = (t: string) => (t.length > 28 ? t.slice(0, 26) + '…' : t)

// Two facing pages from the large-screen breakpoint, one page on phones and tablets
const wide = ref(false)
let mq: MediaQueryList | null = null
const onMq = () => { wide.value = !!mq?.matches }
onMounted(() => {
  mq = window.matchMedia('(min-width: 1024px)')
  onMq()
  mq.addEventListener('change', onMq)
})
onBeforeUnmount(() => mq?.removeEventListener('change', onMq))

const perView = computed(() => (wide.value ? 2 : 1))
const spread = ref(0)
const spreadCount = computed(() => Math.max(1, Math.ceil(sheets.value.length / perView.value)))
const spreadSlots = computed<(number | null)[]>(() => {
  const start = spread.value * perView.value
  return Array.from({ length: perView.value }, (_, k) => (start + k < sheets.value.length ? start + k : null))
})
const visibleIndexes = computed(() => spreadSlots.value.filter((i): i is number => i !== null))

// Keep the same page in view when the layout switches between one and two pages
watch(perView, (n, old) => { spread.value = Math.floor((spread.value * (old || 1)) / n) })
watch(spreadCount, (n) => { if (spread.value > n - 1) spread.value = n - 1 })

function turn(delta: number) {
  spread.value = Math.min(spreadCount.value - 1, Math.max(0, spread.value + delta))
}
function goTo(index: number) {
  spread.value = Math.floor(index / perView.value)
}
</script>

<style scoped>
.book {
  filter: drop-shadow(0 12px 24px rgba(15, 23, 42, 0.12));
}
.page {
  background-image: linear-gradient(#fffdf8, #fffdf8);
  min-height: 100%;
}
/* The spine: inner edges shaded like the fold of a real book */
.page-left {
  box-shadow: inset -18px 0 24px -20px rgba(120, 100, 70, 0.35);
  border-right: 1px solid #e7e0d2;
}
.page-right {
  box-shadow: inset 18px 0 24px -20px rgba(120, 100, 70, 0.35);
}
.page-blank {
  background-image: repeating-linear-gradient(#fffdf8 0 30px, #f3eee3 30px 31px);
}
</style>
