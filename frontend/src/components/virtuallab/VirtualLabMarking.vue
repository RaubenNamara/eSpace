<template>
  <!-- One centred column of sheets, each with its marks strip directly underneath. layout="grid"
       (the student's read-only view) uses the full width: two sheets per row on wide screens. -->
  <div :class="grid ? 'grid grid-cols-1 xl:grid-cols-2 gap-5 xl:gap-6 items-start w-full' : 'space-y-6 mx-auto w-full max-w-[800px]'">
    <!-- A short marking toolbar for every sheet: the few tools a practical needs, three ink colours.
         Undo/redo/clear act on the sheet last marked. With toolbarTo it is placed elsewhere (the
         grading dialog puts it in its header, beside the student's name, so it never scrolls away). -->
    <Teleport v-if="!readonly" defer :to="toolbarTo || 'body'" :disabled="!toolbarTo">
    <div :class="toolbarTo ? 'relative' : 'sm:sticky sm:top-0 z-20 -mx-1 px-1 pt-1 pb-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur'">
      <div class="flex flex-wrap xl:flex-nowrap items-center gap-1 sm:gap-1.5">
        <div class="flex items-center gap-0.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-0.5">
          <button
            v-for="t in TOOLS"
            :key="t.id"
            type="button"
            :aria-label="t.label"
            :aria-pressed="tool === t.id"
            @click="tool = t.id"
            class="group relative h-6 w-6 2xl:h-7 2xl:w-7 rounded-md flex items-center justify-center text-sm font-semibold transition-colors"
            :class="tool === t.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700'"
          >
            <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 2xl:w-4 2xl:h-4" fill="none" stroke="currentColor" :stroke-width="t.id === 'tick' || t.id === 'cross' ? 3 : 2" stroke-linecap="round" stroke-linejoin="round" v-html="t.icon"></svg>
            <span class="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1.5 z-50 whitespace-nowrap rounded-md bg-gray-900 dark:bg-gray-950 px-2 py-1 text-[11px] font-medium text-white shadow-lg opacity-0 translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 transition-all duration-150">{{ t.label }}</span>
          </button>
        </div>

        <div class="flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 px-1.5 py-1" role="radiogroup" aria-label="Ink colour">
          <button
            v-for="c in COLORS"
            :key="c.value"
            type="button"
            role="radio"
            :aria-checked="color === c.value"
            :aria-label="c.label"
            @click="color = c.value"
            class="group relative w-[18px] h-[18px] 2xl:w-5 2xl:h-5 rounded-full border-2 transition-transform"
            :class="color === c.value ? 'border-white ring-2 ring-offset-1 ring-indigo-500 scale-110 dark:ring-offset-gray-800' : 'border-white dark:border-gray-800 hover:scale-105'"
            :style="{ backgroundColor: c.value }"
          ><span class="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1.5 z-50 whitespace-nowrap rounded-md bg-gray-900 dark:bg-gray-950 px-2 py-1 text-[11px] font-medium text-white shadow-lg opacity-0 translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 transition-all duration-150">{{ c.label }}</span></button>
        </div>

        <div class="flex items-center gap-0.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-0.5">
          <button
            v-for="a in ACTIONS"
            :key="a.id"
            type="button"
            :aria-label="a.label"
            @click="runAction(a.id)"
            class="group relative h-6 w-6 2xl:h-7 2xl:w-7 rounded-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 2xl:w-4 2xl:h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="a.icon"></svg>
            <span class="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1.5 z-50 whitespace-nowrap rounded-md bg-gray-900 dark:bg-gray-950 px-2 py-1 text-[11px] font-medium text-white shadow-lg opacity-0 translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 transition-all duration-150">{{ a.label }}</span>
          </button>
        </div>
      </div>
      <p v-if="!toolbarTo || saveStatus" class="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-2" :class="toolbarTo ? 'absolute right-0 top-full mt-0.5 whitespace-nowrap text-[10px]' : 'mt-1'">
        <span v-if="!toolbarTo">Mark directly on the student's work - it saves as you go.</span>
        <span v-if="saveStatus" class="font-semibold" :class="saveStatus === 'Save failed' ? 'text-red-600' : saveStatus === 'All marks saved' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600'">{{ saveStatus }}</span>
      </p>
    </div>
    </Teleport>

    <p v-if="sheets.length === 0" :class="grid ? 'xl:col-span-2' : ''" class="text-sm text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-950/40 rounded-xl p-6 text-center">
      {{ readonly ? 'Your teacher has not marked on your work.' : 'This practical has nothing written or recorded to mark yet.' }}
    </p>

    <section
      v-for="(s, i) in sheets"
      :key="s.key"
      class="space-y-2 min-w-0"
      :class="grid && sheets.length % 2 === 1 && i === sheets.length - 1 ? 'xl:col-span-2 xl:w-full xl:max-w-[800px] xl:mx-auto' : ''"
    >
      <div class="min-w-0">
        <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1.5">
          {{ s.base.title }}
          <span v-if="s.marks !== undefined" class="text-xs font-normal text-gray-400">({{ s.marks }} marks)</span>
        </p>
        <div
          class="rounded-xl border overflow-hidden bg-white transition-shadow"
          :class="!readonly && activeKey === s.key ? 'border-indigo-400 ring-2 ring-indigo-200 dark:ring-indigo-900' : 'border-gray-300 dark:border-gray-600'"
          @pointerdown="activeKey = s.key"
        >
          <AnnotationCanvas
            :ref="(el) => setSheetRef(s.key, el)"
            :width="s.rendered.width"
            :height="s.rendered.height"
            :background="s.rendered.background"
            :readonly-layers="s.rendered.textLayers"
            :editable-layer="layers[s.key] || EMPTY_ANNOTATION_LAYER"
            :mode="readonly ? 'readonly' : 'teacher-marking'"
            :tool="tool"
            :color="color"
            :stroke-width="strokeWidth"
            ink-colored-marks
            @update:editable-layer="(layer: AnnotationLayerJSON) => onLayerChange(s, layer)"
          />
        </div>
      </div>
      <div v-if="$slots.aside" class="empty:hidden">
        <slot name="aside" :section="s" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, type ComponentPublicInstance } from 'vue'
import axios from 'axios'
import type { AnnotationLayerJSON, AnnotationTool } from '@/types'
import { EMPTY_ANNOTATION_LAYER } from '@/types'
import type { AttemptDetail, MarkingAnnotation } from '@/types/virtualLab'
import AnnotationCanvas from '@/components/assignment/AnnotationCanvas.vue'
import { markingSectionsFor, renderSheet, type MarkingSection } from './markingSheets'

const props = defineProps<{
  /** Teacher: the attempt being marked. Student: omitted, sheets come from the saved marks. */
  attempt?: AttemptDetail | null
  saved?: MarkingAnnotation[]
  readonly?: boolean
  /** CSS selector to place the toolbar in (e.g. a dialog header); omitted = above the sheets */
  toolbarTo?: string
  /** Lay the sheets out across the full width (two per row on wide screens) instead of one column */
  grid?: boolean
}>()


// Teacher marks the attempt as it is now; a student sees exactly the sheets their teacher marked.
const sections = computed<MarkingSection[]>(() => {
  if (props.attempt && !props.readonly) return markingSectionsFor(props.attempt)
  // in reading order (the order the teacher happened to mark them in doesn't matter)
  const rank = (key: string) => (key === 'results' ? 0 : key === 'graph' ? 1 : key === 'observations' ? 3 : key === 'conclusion' ? 5 : 4)
  return (props.saved || [])
    .filter((m) => (m.annotation?.objects?.length || 0) > 0)
    .map((m) => ({ key: m.section_key, base: m.base }))
    .sort((x, y) => rank(x.key) - rank(y.key) || x.key.localeCompare(y.key, undefined, { numeric: true }))
})
// Rendered once per section (stable references - AnnotationCanvas reloads its layers whenever
// these change, so they must not be rebuilt on every render).
const sheets = computed(() => sections.value.map((s) => ({ ...s, rendered: renderSheet(s.base) })))

const layers = ref<Record<string, AnnotationLayerJSON>>(
  Object.fromEntries((props.saved || []).map((m) => [m.section_key, m.annotation || { objects: [] }]))
)

// Deliberately short: marking a practical only needs these (the full assessment toolbar has ~20).
// Select is there so a mark can be picked and removed with "Clear selected".
const TOOLS: { id: AnnotationTool; label: string; icon: string }[] = [
  { id: 'tick', label: 'Tick', icon: '<path d="M4 12.5l5 5L20 6.5"/>' },
  { id: 'cross', label: 'Cross', icon: '<path d="M6 6l12 12M18 6L6 18"/>' },
  { id: 'pen', label: 'Pen', icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/>' },
  { id: 'pencil', label: 'Pencil', icon: '<path d="M17 3l4 4L8 20H4v-4L17 3z"/><path d="M14 6l4 4"/>' },
  { id: 'eraser', label: 'Eraser', icon: '<path d="M20 20H9l-5.5-5.5a2 2 0 010-2.8l8.8-8.8a2 2 0 012.8 0l5.4 5.4a2 2 0 010 2.8L13 18"/><path d="M8 9l7 7"/>' },
  { id: 'select', label: 'Select', icon: '<path d="M5 3l14 8-6 2-2 6-6-16z"/>' },
]
const COLORS = [
  { value: '#dc2626', label: 'Red' },
  { value: '#111827', label: 'Black' },
  { value: '#2563eb', label: 'Blue' },
]
const ACTIONS = [
  { id: 'undo', label: 'Undo', icon: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 010 11H11"/>' },
  { id: 'redo', label: 'Redo', icon: '<path d="M15 14l5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 000 11H13"/>' },
  { id: 'clear-selected', label: 'Clear selected', icon: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>' },
] as const
function runAction(id: (typeof ACTIONS)[number]['id']) {
  const sheet = activeSheet()
  if (!sheet) return
  if (id === 'undo') sheet.undo()
  else if (id === 'redo') sheet.redo()
  else sheet.clearSelected()
}

const tool = ref<AnnotationTool>('tick')
const color = ref('#dc2626')
const strokeWidth = ref(3)

const sheetRefs: Record<string, any> = {}
function setSheetRef(key: string, el: Element | ComponentPublicInstance | null) {
  if (el) sheetRefs[key] = el
  else delete sheetRefs[key]
}
const activeKey = ref<string | null>(null)
const activeSheet = () => (activeKey.value ? sheetRefs[activeKey.value] : sheetRefs[sheets.value[0]?.key])

// --- saving: each sheet saves on its own, shortly after the teacher stops marking it -----------
const pending = new Map<string, number>()
const failed = ref(false)
const saving = ref(0)
const dirty = ref(false)
const touched = ref(false)
const saveStatus = computed(() => {
  if (failed.value) return 'Save failed'
  if (saving.value > 0 || pending.size > 0 || dirty.value) return 'Saving…'
  return touched.value ? 'All marks saved' : ''
})

function onLayerChange(s: MarkingSection, layer: AnnotationLayerJSON) {
  if (props.readonly || !props.attempt) return
  layers.value = { ...layers.value, [s.key]: layer }
  touched.value = true
  dirty.value = true
  failed.value = false
  const existing = pending.get(s.key)
  if (existing) clearTimeout(existing)
  pending.set(s.key, window.setTimeout(() => save(s, layer), 1200))
}

async function save(s: MarkingSection, layer: AnnotationLayerJSON) {
  pending.delete(s.key)
  saving.value++
  try {
    await axios.put(`/api/teacher/virtual-lab/attempts/${props.attempt!.id}/marking-annotations`, {
      section_key: s.key, base: s.base, annotation: layer,
    })
  } catch {
    failed.value = true
  } finally {
    saving.value--
    if (saving.value === 0 && pending.size === 0) dirty.value = false
  }
}

// Closing the dialog mid-debounce still saves what was drawn
onBeforeUnmount(() => {
  for (const [key, t] of pending) {
    clearTimeout(t)
    const s = sections.value.find((x) => x.key === key)
    if (s && layers.value[key]) save(s, layers.value[key])
  }
})
</script>
