<template>
  <!-- An ICT practical, full screen: the app's title bar, the task, and the editor itself. Work is
       saved as it is done (a few seconds after each change, and on closing); a teacher, HOD or
       admin viewing a learner's work gets the same screen, read only. -->
  <div class="fixed inset-0 z-[70] flex flex-col bg-gray-100 dark:bg-gray-950" role="dialog" aria-modal="true" :aria-label="`${info.label}: ${title}`">
    <header class="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 text-white flex-shrink-0" :class="info.bar">
      <span class="w-8 h-8 rounded-md bg-white/15 flex items-center justify-center text-base font-black flex-shrink-0" aria-hidden="true">{{ info.letter }}</span>
      <div class="min-w-0 flex-1">
        <p class="text-sm font-semibold truncate">{{ title }}</p>
        <p class="text-[11px] text-white/80 truncate">
          {{ info.label }}<template v-if="subtitle"> · {{ subtitle }}</template>
          <template v-if="readonly"> · {{ canMark ? 'marking' : 'view only' }}</template>
          <template v-else-if="saver"> · <span :class="status === 'error' ? 'font-semibold text-amber-200' : ''">{{ statusText }}</span></template>
        </p>
      </div>
      <button v-if="instructions" type="button" class="hidden sm:inline-flex px-2.5 py-1.5 rounded-md text-xs font-semibold hover:bg-white/15" :aria-expanded="showTask" @click="showTask = !showTask">{{ showTask ? 'Hide task' : 'Task' }}</button>
      <label v-if="canImport && !readonly && info.opens" class="px-2.5 py-1.5 rounded-md text-xs font-semibold hover:bg-white/15 cursor-pointer" :title="`Open a ${info.opens} file from your computer`">
        Open file
        <input type="file" class="hidden" :accept="info.opens" @change="onImport">
      </label>
      <button type="button" class="px-2.5 py-1.5 rounded-md text-xs font-semibold hover:bg-white/15 disabled:opacity-50" :disabled="!ready || exporting" :title="`Download as .${info.downloadExt}`" @click="download">
        {{ exporting ? 'Preparing…' : `Download .${info.downloadExt}` }}
      </button>
      <button type="button" class="ml-1 px-3 py-1.5 rounded-md text-xs font-bold bg-white text-gray-900 hover:bg-white/90 disabled:opacity-60" :disabled="closing" @click="close">
        {{ closing ? 'Saving…' : doneLabel }}
      </button>
    </header>

    <!-- The task, as the teacher wrote it -->
    <div v-if="instructions && showTask" class="flex-shrink-0 max-h-[30vh] overflow-y-auto border-b border-gray-200 dark:border-gray-800 bg-amber-50 dark:bg-amber-900/15 px-4 py-3">
      <p class="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-200 mb-1">Task</p>
      <div class="prose prose-sm max-w-none dark:prose-invert text-gray-800 dark:text-gray-100" v-html="instructions"></div>
    </div>

    <div class="flex-1 min-h-0 flex">
    <div class="relative flex-1 min-w-0">
      <div v-if="loadError" class="absolute inset-0 flex items-center justify-center p-6">
        <p class="max-w-md text-center text-sm text-rose-700 dark:text-rose-300">{{ loadError }}</p>
      </div>
      <component
        :is="editor"
        v-else-if="loaded"
        ref="editorRef"
        :initial="initial"
        :readonly="readonly"
        :show-tools="!!marking"
        :markable="showMarkup"
        @change="onChange"
        @ready="ready = true"
        @download="download"
      />
      <div v-if="!ready && !loadError" class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p class="text-sm text-gray-500 dark:text-gray-400">Opening {{ info.label.toLowerCase() }}…</p>
      </div>
    </div>

    <!-- The teacher's pen marks, in the app itself: on the page, slide, sheet or table -->
    <Teleport v-if="surface" :to="surface.host">
      <div
        class="absolute left-0 top-0 z-[5]"
        :class="drawing ? 'pointer-events-auto' : 'pointer-events-none'"
        :style="surface.fill ? { width: '100%', height: '100%' } : { width: `${surface.width}px`, height: `${surface.height}px` }"
      >
        <AnnotationCanvas
          v-for="p in [layerPage]"
          :key="`${p}-${surface.width}-${surface.height}`"
          :ref="(el: any) => { markCanvas = el }"
          :width="surface.width"
          :height="surface.height"
          stretch
          transparent
          :editable-layer="layers[p] || EMPTY_LAYER"
          :mode="canMark ? 'teacher-marking' : 'readonly'"
          :tool="markTool"
          :color="markColor"
          :stroke-width="2"
          @update:editable-layer="onLayerChange(p, $event)"
        />
      </div>
    </Teleport>

    <!-- Marking, beside the work: the teacher reads it and gives the mark and comment here -->
    <aside v-if="marking" class="w-64 sm:w-72 flex-shrink-0 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
      <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <p class="text-sm font-bold text-gray-900 dark:text-white">Marking</p>
        <p class="text-[11px] text-gray-500 dark:text-gray-400">Look through the work, then type the score. It saves by itself.</p>
      </div>
      <div class="p-4 space-y-3 overflow-y-auto">
        <!-- the same pen, ticks and text as every other script -->
        <div v-if="canMark" class="pb-3 border-b border-gray-200 dark:border-gray-800">
          <p class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Mark on the work</p>
          <div class="flex flex-wrap items-center gap-1.5">
            <button type="button" class="px-2 py-1 rounded-md text-xs font-semibold border" :class="viewing ? 'border-transparent text-white ' + info.bar : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'" :aria-pressed="viewing" title="Put the pen down to click and scroll the work" @click="viewing = !viewing">View only</button>
          </div>
          <div class="practical-mark-tools mt-1.5">
            <AnnotationToolbar
              variant="marking"
              :tool="viewing ? 'pan' : markTool"
              :color="markColor"
              :stroke-width="2"
              :disabled="!surface"
              @update:tool="pickTool"
              @update:color="markColor = $event"
              @undo="markCanvas?.undo()"
              @redo="markCanvas?.redo()"
              @clear-all="markCanvas?.clearAll()"
              @clear-selected="markCanvas?.clearSelected()"
            />
          </div>
          <p class="mt-1 text-[11px] text-gray-500 dark:text-gray-400" role="status" aria-live="polite">
            <template v-if="!surface">Open what you want to mark on it.</template>
            <template v-else-if="layerError">Marks not saved. <button type="button" class="underline" @click="flushLayers">Try again</button></template>
            <template v-else-if="layerSaving || pendingLayers.size">Saving marks…</template>
            <template v-else-if="layerSaved">✓ Marks saved</template>
            <template v-else>Marks save by themselves. The learner sees them with the result.</template>
          </p>
        </div>
        <div>
          <label for="practical-mark" class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Score</label>
          <div class="flex items-center gap-1.5">
            <input id="practical-mark" v-model="markValue" type="number" inputmode="decimal" min="0" :max="marking.max" step="0.5" :disabled="marking.locked" placeholder="-" class="w-24 px-2 py-2 text-center text-xl font-bold rounded-lg border-2 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-1" :class="markOver ? 'border-rose-400' : 'border-gray-300 dark:border-gray-600'" @focus="($event.target as HTMLInputElement).select()" @input="touched" @keydown.enter.prevent="saveMark">
            <span class="text-base font-semibold text-gray-500">/ {{ marking.max }}</span>
          </div>
          <div class="mt-2 flex flex-wrap gap-1">
            <button v-for="v in quickMarks" :key="v" type="button" class="min-w-[2.25rem] px-2 py-1 rounded-md text-sm font-semibold border hover:bg-gray-50 dark:hover:bg-gray-800" :class="markValue !== '' && Number(markValue) === v ? 'border-transparent text-white ' + info.bar : 'border-gray-200 dark:border-gray-600'" :disabled="marking.locked" @click="markValue = String(v); touched()">{{ v }}</button>
          </div>
          <p v-if="markOver" class="mt-1 text-[11px] text-rose-600">More than {{ marking.max }}</p>
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Comment <span class="font-normal text-gray-400">(the learner sees it)</span></label>
          <textarea v-model="commentValue" rows="4" :disabled="marking.locked" class="w-full px-2 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white" @input="touched"></textarea>
          <div class="mt-1 flex flex-wrap gap-1">
            <button v-for="c in COMMENTS[app]" :key="c" type="button" class="px-2 py-0.5 rounded-full text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200" :disabled="marking.locked" @click="commentValue = commentValue ? `${commentValue} ${c}` : c; touched()">{{ c }}</button>
          </div>
        </div>
        <!-- saved as it is typed; this says where it stands -->
        <p v-if="!marking.locked" class="text-xs font-semibold flex items-center gap-1.5" :class="markError ? 'text-rose-600' : markDirty || markSaving ? 'text-gray-500 dark:text-gray-400' : 'text-emerald-700 dark:text-emerald-300'" role="status" aria-live="polite">
          <template v-if="markOver">Fix the score first</template>
          <template v-else-if="markSaving">Saving…</template>
          <template v-else-if="markError">Not saved. <button type="button" class="underline" @click="saveMark">Try again</button></template>
          <template v-else-if="markDirty">Saving in a moment…</template>
          <template v-else-if="markValue !== ''">✓ Saved: {{ Number(markValue) }} / {{ marking.max }}</template>
          <template v-else>No score yet</template>
        </p>
        <p v-if="marking.locked" class="text-[11px] text-gray-500">This script is returned; its marks can't be changed here.</p>
      </div>
    </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { useToastStore } from '@/stores/toast'
import { resolveAssetUrl } from '@/utils/url'
import { MARKUP_PAGE_BASE, MARKUP_PAGE_RANGE, PRACTICAL_APPS, downloadBlob, safeFileName, type MarkSurface, type PracticalApp, type PracticalEditorApi } from './apps'
import type { AnnotationLayerJSON, AnnotationTool } from '@/types'

const props = withDefaults(defineProps<{
  app: PracticalApp
  title: string
  subtitle?: string
  instructions?: string | null
  /** the saved work (or the teacher's starting file) to open */
  src?: string | null
  readonly?: boolean
  /** a teacher preparing the starting file may open an Office file into it */
  canImport?: boolean
  /** where the work is saved as it is done; none = nothing is saved */
  saver?: ((blob: Blob) => Promise<void>) | null
  doneLabel?: string
  /** the name a download gets */
  fileName?: string
  /** a teacher marking the work: the mark out of max and a comment, saved with save() */
  marking?: { max: number; mark: number | null; comment: string; locked?: boolean; save: (mark: number | null, comment: string) => Promise<void>; layers?: Record<number, AnnotationLayerJSON>; saveLayer?: (page: number, layer: AnnotationLayerJSON) => Promise<void> } | null
  /** the teacher's pen marks, shown to whoever looks at marked work */
  markupLayers?: Record<number, AnnotationLayerJSON> | null
}>(), { subtitle: '', instructions: null, src: null, readonly: false, canImport: false, saver: null, doneLabel: 'Done', fileName: '', marking: null, markupLayers: null })
const emit = defineEmits<{ close: [] }>()

const toast = useToastStore()
const info = computed(() => PRACTICAL_APPS[props.app])

// each app's editor is its own chunk, loaded only when it is used
const EDITORS = {
  word: defineAsyncComponent(() => import('./WordEditor.vue')),
  excel: defineAsyncComponent(() => import('./SheetEditor.vue')),
  powerpoint: defineAsyncComponent(() => import('./SlideEditor.vue')),
  access: defineAsyncComponent(() => import('./DatabaseEditor.vue'))
}
const editor = computed(() => EDITORS[props.app])
const editorRef = ref<PracticalEditorApi | null>(null)

const initial = shallowRef<ArrayBuffer | null>(null)
const loaded = ref(false)
const ready = ref(false)
const loadError = ref('')
const showTask = ref(!!props.instructions && !props.readonly)

onMounted(async () => {
  document.documentElement.style.overflow = 'hidden'
  if (props.src) {
    try {
      const res = await fetch(resolveAssetUrl(props.src), { credentials: 'include' })
      if (!res.ok) throw new Error(String(res.status))
      initial.value = await res.arrayBuffer()
    } catch {
      loadError.value = 'This work could not be opened. Check your connection and try again.'
      return
    }
  }
  loaded.value = true
})

// ---- saving as the work is done ----
const status = ref<'saved' | 'unsaved' | 'saving' | 'error'>('saved')
const statusText = computed(() => ({ saved: 'All changes saved', unsaved: 'Unsaved changes', saving: 'Saving…', error: 'Not saved - retrying' }[status.value]))
let timer: number | null = null
let saving: Promise<void> | null = null
let again = false

const saveNow = async (): Promise<void> => {
  if (!props.saver || props.readonly || !editorRef.value) return
  if (saving) {
    again = true
    return saving
  }
  status.value = 'saving'
  saving = (async () => {
    try {
      await props.saver!(await editorRef.value!.save())
      status.value = again ? 'unsaved' : 'saved'
    } catch {
      status.value = 'error'
      schedule(8000)
    } finally {
      saving = null
    }
  })()
  await saving
  if (again) {
    again = false
    await saveNow()
  }
}
const schedule = (ms = 2500) => {
  if (timer) clearTimeout(timer)
  timer = window.setTimeout(() => { timer = null; saveNow() }, ms)
}
const onChange = () => {
  if (props.readonly || !props.saver) return
  status.value = 'unsaved'
  schedule()
}
const warnLeaving = (e: BeforeUnloadEvent) => {
  if (status.value !== 'saved') {
    saveNow()
    e.preventDefault()
  }
}
window.addEventListener('beforeunload', warnLeaving)

const closing = ref(false)
const close = async () => {
  await flushLayers()
  if (layerError.value && !window.confirm('Your latest pen marks could not be saved. Close anyway?')) return
  // a score still waiting to save goes now
  if (markDirty.value && !markOver.value) await saveMark()
  if (markDirty.value && !window.confirm('The score is not saved. Close anyway?')) return
  if (timer) { clearTimeout(timer); timer = null }
  if (props.saver && !props.readonly && status.value !== 'saved') {
    closing.value = true
    await saveNow()
    closing.value = false
    if (status.value === 'error' && !window.confirm('Your latest changes could not be saved. Close anyway?')) return
  }
  emit('close')
}

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
  window.removeEventListener('beforeunload', warnLeaving)
  if (timer) clearTimeout(timer)
  if (markTimer) clearTimeout(markTimer)
  flushLayers()
})

// ---- pen marks on the work ----
// The canvas library is only fetched when marks are there to draw or show
const AnnotationCanvas = defineAsyncComponent(() => import('@/components/assignment/AnnotationCanvas.vue'))
const AnnotationToolbar = defineAsyncComponent(() => import('@/components/assignment/AnnotationToolbar.vue'))
const EMPTY_LAYER: AnnotationLayerJSON = { objects: [] }
const markTool = ref<AnnotationTool>('pen')
const markColor = ref('#dc2626')
const viewing = ref(false)
let markCanvas: any = null
const canMark = computed(() => !!props.marking?.saveLayer && !props.marking.locked)
const drawing = computed(() => canMark.value && !viewing.value)
const pickTool = (t: AnnotationTool) => { markTool.value = t; viewing.value = false }

const layers = shallowRef<Record<number, AnnotationLayerJSON>>({ ...(props.marking?.layers || props.markupLayers || {}) })
// a learner's own marked work only opens the layer on the apps that were marked
const hasMarksHere = computed(() => {
  const base = MARKUP_PAGE_BASE[props.app]
  return Object.entries(layers.value).some(([p, l]) => Number(p) >= base && Number(p) < base + MARKUP_PAGE_RANGE && (l?.objects?.length || 0) > 0)
})
const showMarkup = computed(() => !!props.marking?.saveLayer || hasMarksHere.value)
const surface = computed<MarkSurface | null>(() => (showMarkup.value && ready.value ? editorRef.value?.markSurface || null : null))
const layerPage = computed(() => MARKUP_PAGE_BASE[props.app] + (surface.value?.page || 0))

const pendingLayers = shallowRef(new Map<number, AnnotationLayerJSON>())
const layerSaving = ref(false)
const layerSaved = ref(false)
const layerError = ref(false)
let layerTimer: number | null = null
let layerFlush: Promise<void> | null = null
const onLayerChange = (page: number, layer: AnnotationLayerJSON) => {
  if (!canMark.value) return
  // a layer only being loaded, not drawn on, has nothing to save
  if (JSON.stringify(layer) === JSON.stringify(layers.value[page] || EMPTY_LAYER)) return
  layers.value = { ...layers.value, [page]: layer }
  pendingLayers.value = new Map(pendingLayers.value).set(page, layer)
  layerError.value = false
  if (layerTimer) clearTimeout(layerTimer)
  layerTimer = window.setTimeout(() => { layerTimer = null; flushLayers() }, 1200)
}
const flushLayers = async (): Promise<void> => {
  if (layerTimer) { clearTimeout(layerTimer); layerTimer = null }
  if (layerFlush) await layerFlush
  if (!pendingLayers.value.size || !props.marking?.saveLayer) return
  const save = props.marking.saveLayer
  const sending = [...pendingLayers.value.entries()]
  layerSaving.value = true
  layerFlush = (async () => {
    for (const [page, layer] of sending) {
      try {
        await save(page, layer)
        layerSaved.value = true
        // drawn on again while this was on its way: that one still has to go
        if (pendingLayers.value.get(page) === layer) {
          const left = new Map(pendingLayers.value)
          left.delete(page)
          pendingLayers.value = left
        }
      } catch (err: any) {
        layerError.value = true
        toast.error(err?.response?.data?.message || 'Your marks could not be saved. Check your connection and mark again.')
        return
      }
    }
  })()
  try { await layerFlush } finally { layerFlush = null; layerSaving.value = false }
}

// ---- marking beside the work ----
const COMMENTS: Record<PracticalApp, string[]> = {
  word: ['Well formatted.', 'Check your spelling.', 'Use the heading styles.', 'Align the text as asked.', 'Add the table.'],
  excel: ['Correct formulas.', 'Use a formula, not a typed number.', 'Check your cell references.', 'Format the numbers.', 'Add the chart/headings asked for.'],
  powerpoint: ['Clear slides.', 'Too much text on a slide.', 'Add a title to each slide.', 'Use one theme.', 'Add the pictures asked for.'],
  access: ['Correct field types.', 'Set the primary key.', 'Check the query criteria.', 'Records entered correctly.', 'Save the query with a name.']
}
// shown as a plain number (a stored 0.00 reads 0)
const markValue = ref(props.marking?.mark === null || props.marking?.mark === undefined ? '' : String(Number(props.marking.mark)))
const commentValue = ref(props.marking?.comment || '')
const markDirty = ref(false)
const markSaving = ref(false)
const markOver = computed(() => markValue.value !== '' && !!props.marking && Number(markValue.value) > props.marking.max)
const quickMarks = computed(() => {
  const m = props.marking?.max || 0
  return [...new Set([0, Math.round(m / 2), m])]
})
const markError = ref(false)
let markTimer: number | null = null
// a score or comment saves by itself shortly after the last change
const touched = () => {
  markDirty.value = true
  markError.value = false
  if (markTimer) clearTimeout(markTimer)
  markTimer = window.setTimeout(() => { if (!markOver.value) saveMark() }, 700)
}
const saveMark = async () => {
  if (!props.marking || markOver.value) return
  if (markTimer) { clearTimeout(markTimer); markTimer = null }
  markSaving.value = true
  const sent = { mark: markValue.value, comment: commentValue.value }
  try {
    await props.marking.save(markValue.value === '' ? null : Number(markValue.value), commentValue.value.trim())
    // typed on while it was saving: that goes next
    markDirty.value = sent.mark !== markValue.value || sent.comment !== commentValue.value
    if (markDirty.value) touched()
  } catch (err: any) {
    markError.value = true
    toast.error(err?.response?.data?.message || 'The score could not be saved')
  } finally {
    markSaving.value = false
  }
}

// ---- Office files in and out ----
const onImport = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file || !editorRef.value?.importFile) return
  try {
    await editorRef.value.importFile(file)
    onChange()
    toast.success(`${file.name} opened`)
  } catch {
    toast.error(`${file.name} could not be opened`)
  }
}

const exporting = ref(false)
const download = async () => {
  if (!editorRef.value) return
  exporting.value = true
  try {
    downloadBlob(await editorRef.value.exportFile(), `${safeFileName(props.fileName || props.title)}.${info.value.downloadExt}`)
  } catch (err) {
    console.error('Practical export failed', err)
    toast.error('The file could not be made')
  } finally {
    exporting.value = false
  }
}
</script>

<style>
/* The marking tools in the narrow panel beside the work: they wrap, so undo and clear stay in reach */
.practical-mark-tools .annotation-toolbar.annotation-toolbar--marking { flex-wrap: wrap; padding: 0; border: 0; background: transparent; }
.practical-mark-tools .annotation-toolbar.annotation-toolbar--marking .toolbar-section { flex-wrap: wrap; padding-right: 0; border-right: 0; }
</style>
