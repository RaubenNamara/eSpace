<template>
  <!-- Student answer toolbar: ONE row on every screen - the writing tools, undo/redo and (from
       tablet up) the colours; size, clearing and the less-used tools sit under More. -->
  <div v-if="variant === 'answer'" ref="rootEl" class="answer-toolbar">
    <div class="answer-toolbar__row">
      <button type="button" :class="['tool-btn', 'answer-toolbar__btn', { active: tool === 'pen' && !pencilActive }]" title="Pen" aria-label="Pen" :disabled="disabled" @click="selectPen">
        <span class="tool-btn__icon"><AppIcon name="pencil" class="w-4 h-4" /></span><span class="answer-toolbar__label">Pen</span>
      </button>
      <button type="button" :class="['tool-btn', 'answer-toolbar__btn', { active: tool === 'highlighter' }]" title="Highlighter" aria-label="Highlighter" :disabled="disabled" @click="selectTool('highlighter')">
        <span class="tool-btn__icon"><AppIcon name="highlighter" class="w-4 h-4" /></span><span class="answer-toolbar__label">Highlighter</span>
      </button>
      <button type="button" :class="['tool-btn', 'answer-toolbar__btn', { active: tool === 'eraser' }]" title="Eraser" aria-label="Eraser" :disabled="disabled" @click="selectTool('eraser')">
        <span class="tool-btn__icon"><AppIcon name="eraser" class="w-4 h-4" /></span><span class="answer-toolbar__label">Eraser</span>
      </button>

      <span class="answer-toolbar__sep" aria-hidden="true"></span>

      <button type="button" class="tool-btn answer-toolbar__btn" title="Undo" aria-label="Undo" :disabled="disabled" @click="$emit('undo')">
        <span class="tool-btn__icon">↶</span><span class="answer-toolbar__label">Undo</span>
      </button>
      <button type="button" class="tool-btn answer-toolbar__btn" title="Redo" aria-label="Redo" :disabled="disabled" @click="$emit('redo')">
        <span class="tool-btn__icon">↷</span><span class="answer-toolbar__label">Redo</span>
      </button>

      <!-- colours in the row from tablet width; on phones they are under More -->
      <div class="answer-toolbar__colors answer-toolbar__colors--inline">
        <button
          v-for="c in ANSWER_COLORS"
          :key="c"
          type="button"
          :class="['color-btn', { active: color === c }]"
          :style="{ backgroundColor: c }"
          :title="c"
          :aria-label="`Colour ${c}`"
          :disabled="disabled"
          @click="$emit('update:color', c)"
        ></button>
      </div>

      <span class="answer-toolbar__tool-label">{{ statusLabel || `Tool: ${activeToolLabel}` }}</span>

      <div class="answer-toolbar__more">
        <button
          type="button"
          :class="['tool-btn', 'answer-toolbar__btn', 'answer-toolbar__more-btn', { active: moreToolsOpen || inMoreTool }]"
          :aria-expanded="moreToolsOpen"
          title="More tools"
          :disabled="disabled"
          @click="moreToolsOpen = !moreToolsOpen"
        >
          <span class="tool-btn__icon">⋯</span><span class="answer-toolbar__more-label">More</span>
        </button>

        <div v-if="moreToolsOpen" class="answer-toolbar__panel" role="menu">
          <!-- colours (phones only) and pen size -->
          <div class="answer-toolbar__colors answer-toolbar__colors--panel">
            <button
              v-for="c in ANSWER_COLORS"
              :key="c"
              type="button"
              :class="['color-btn', { active: color === c }]"
              :style="{ backgroundColor: c }"
              :title="c"
              :aria-label="`Colour ${c}`"
              :disabled="disabled"
              @click="$emit('update:color', c)"
            ></button>
          </div>
          <label class="size-label answer-toolbar__size">
            <span>Size</span>
            <input
              type="range"
              min="1"
              max="20"
              :value="strokeWidth"
              :disabled="disabled"
              @input="$emit('update:strokeWidth', Number(($event.target as HTMLInputElement).value))"
            >
            <span class="size-value">{{ strokeWidth }}px</span>
          </label>

          <div class="answer-toolbar__grid">
            <button type="button" :class="['answer-toolbar__item', { active: tool === 'select' }]" :disabled="disabled" @click="pick('select')"><span>↖</span> Select</button>
            <button type="button" :class="['answer-toolbar__item', { active: tool === 'pan' }]" :disabled="disabled" @click="pick('pan')"><AppIcon name="hand" class="w-4 h-4" /> Pan</button>
            <button type="button" :class="['answer-toolbar__item', { active: tool === 'pen' && pencilActive }]" :disabled="disabled" @click="selectPencil(); moreToolsOpen = false"><span>✎</span> Pencil</button>
            <button type="button" :class="['answer-toolbar__item', { active: tool === 'text' }]" :disabled="disabled" @click="pick('text')"><span>T</span> Text</button>
            <button
              v-for="sh in SHAPE_OPTIONS"
              :key="sh.value"
              type="button"
              :class="['answer-toolbar__item', { active: tool === sh.value }]"
              :disabled="disabled"
              @click="pick(sh.value)"
            ><span>{{ sh.icon }}</span> {{ sh.label }}</button>
            <button type="button" :class="['answer-toolbar__item', { active: tool === 'image' }]" :disabled="disabled" @click="pick('image')"><AppIcon name="photo" class="w-4 h-4" /> Add media</button>
            <button type="button" :class="['answer-toolbar__item', { active: tool === 'equation' }]" :disabled="disabled" @click="pick('equation')"><span>∑</span> Equation</button>
            <button type="button" :class="['answer-toolbar__item', { active: tool === 'signature' }]" :disabled="disabled" @click="pick('signature')"><AppIcon name="pencil" class="w-4 h-4" /> Signature</button>
            <button type="button" :class="['answer-toolbar__item', { active: tool === 'comment' }]" :disabled="disabled" @click="pick('comment')"><AppIcon name="chat" class="w-4 h-4" /> Comment</button>
          </div>

          <div class="answer-toolbar__panel-actions">
            <button type="button" class="answer-toolbar__item" :disabled="disabled" @click="$emit('clear-selected'); moreToolsOpen = false">⌫ Clear selected</button>
            <button type="button" class="answer-toolbar__item answer-toolbar__item--danger" :disabled="disabled" @click="$emit('clear-all'); moreToolsOpen = false"><AppIcon name="trash" class="w-4 h-4" /> Clear all</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Author / marking toolbar: flat button row (unchanged) -->
  <div v-else class="annotation-toolbar" :class="{ 'annotation-toolbar--vertical': vertical, 'annotation-toolbar--marking': variant === 'marking' }">
    <div class="toolbar-section">
      <button
        v-for="t in tools"
        :key="t.value"
        type="button"
        :class="['tool-btn', { active: tool === t.value }]"
        :title="t.label"
        :disabled="disabled"
        @click="$emit('update:tool', t.value)"
      >
        <span class="tool-btn__icon"><AppIcon v-if="t.icon.startsWith('@')" :name="t.icon.slice(1)" class="w-4 h-4" /><template v-else>{{ t.icon }}</template></span>
      </button>
    </div>

    <div v-if="variant !== 'marking'" class="toolbar-section">
      <button
        v-for="c in colors"
        :key="c"
        type="button"
        :class="['color-btn', { active: color === c }]"
        :style="{ backgroundColor: c }"
        :title="c"
        :disabled="disabled"
        @click="$emit('update:color', c)"
      ></button>
    </div>

    <!-- marking keeps a fixed 2px line: no size control -->
    <div v-if="variant !== 'marking'" class="toolbar-section">
      <label class="size-label">
        <span>Size</span>
        <input
          type="range"
          min="1"
          max="20"
          :value="strokeWidth"
          :disabled="disabled"
          @input="$emit('update:strokeWidth', Number(($event.target as HTMLInputElement).value))"
        >
        <span class="size-value">{{ strokeWidth }}px</span>
      </label>
    </div>

    <div class="toolbar-section">
      <button type="button" class="tool-btn" title="Undo" :disabled="disabled" @click="$emit('undo')">↶</button>
      <button type="button" class="tool-btn" title="Redo" :disabled="disabled" @click="$emit('redo')">↷</button>
      <!-- marking: Clear Selected removes the marks picked with Select; Delete clears this page's marks (Undo brings them back) -->
      <button type="button" class="tool-btn" title="Clear Selected" :disabled="disabled" @click="$emit('clear-selected')">⌫</button>
      <button type="button" class="tool-btn tool-btn--danger" :title="variant === 'marking' ? 'Delete all marks on this page' : 'Clear All'" :disabled="disabled" @click="$emit('clear-all')"><AppIcon name="trash" class="w-4 h-4" /></button>
    </div>

    <!-- marking: the three ink colours come last, as small dots -->
    <div v-if="variant === 'marking'" class="toolbar-section">
      <button
        v-for="c in MARKING_COLORS"
        :key="c"
        type="button"
        :class="['color-btn', 'color-btn--small', { active: color === c }]"
        :style="{ backgroundColor: c }"
        :title="c"
        :disabled="disabled"
        @click="$emit('update:color', c)"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import type { AnnotationTool } from '@/types'

interface Props {
  tool: AnnotationTool
  color: string
  strokeWidth: number
  variant?: 'author' | 'answer' | 'marking'
  disabled?: boolean
  vertical?: boolean
  // 'answer' variant only: replaces the trailing "Tool: X" readout with a save-status message
  // (e.g. "Ready to save" / "Saving…" / "Saved") when provided.
  statusLabel?: string
  // 'answer' variant only: collapses the less-common tools (Select/Pan/Pencil/Text/Shapes/Add
  // media/Equation/Signature/Comment) behind a "More Tools" toggle, leaving only Pen/Highlighter/
  // Eraser visible by default - default false keeps every existing caller's behavior unchanged.
  simplified?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'answer',
  disabled: false,
  vertical: false,
  statusLabel: '',
  simplified: false
})

const moreToolsOpen = ref(false)
const rootEl = ref<HTMLElement | null>(null)
// the More panel closes on a click outside it or Escape
const onDocPointer = (e: PointerEvent) => {
  if (moreToolsOpen.value && rootEl.value && !rootEl.value.contains(e.target as Node)) moreToolsOpen.value = false
}
const onDocKey = (e: KeyboardEvent) => { if (e.key === 'Escape') moreToolsOpen.value = false }
onMounted(() => { document.addEventListener('pointerdown', onDocPointer); document.addEventListener('keydown', onDocKey) })
onBeforeUnmount(() => { document.removeEventListener('pointerdown', onDocPointer); document.removeEventListener('keydown', onDocKey) })

const emit = defineEmits<{
  (e: 'update:tool', tool: AnnotationTool): void
  (e: 'update:color', color: string): void
  (e: 'update:strokeWidth', width: number): void
  (e: 'undo'): void
  (e: 'redo'): void
  (e: 'clear-all'): void
  (e: 'clear-selected'): void
}>()

const colors = ['#000000', '#ff0000', '#0000ff', '#16a34a', '#f59e0b', '#a855f7', '#ffffff']

const BASE_TOOLS: { value: AnnotationTool; label: string; icon: string }[] = [
  { value: 'select', label: 'Select', icon: '↖' },
  { value: 'pan', label: 'Pan', icon: '@hand' },
  { value: 'pen', label: 'Pen', icon: '@pencil' },
  { value: 'pencil', label: 'Pencil', icon: '✎' },
  { value: 'highlighter', label: 'Highlighter', icon: '@highlighter' },
  { value: 'eraser', label: 'Eraser', icon: '@eraser' },
  { value: 'line', label: 'Line', icon: '／' },
  { value: 'arrow', label: 'Arrow', icon: '➜' },
  { value: 'rectangle', label: 'Rectangle', icon: '▭' },
  { value: 'circle', label: 'Circle', icon: '◯' },
  { value: 'text', label: 'Text', icon: 'T' },
  { value: 'image', label: 'Insert Image', icon: '@photo' },
  { value: 'equation', label: 'Equation', icon: '∑' },
  { value: 'signature', label: 'Signature', icon: '@pencil' }
]

const COMMENT_TOOL: { value: AnnotationTool; label: string; icon: string } = { value: 'comment', label: 'Comment', icon: '@chat' }
// marking a student's work: only the tools teachers use for it
const MARKING_TOOLS: { value: AnnotationTool; label: string; icon: string }[] = [
  // picks marks for Clear Selected
  { value: 'select', label: 'Select', icon: '↖' },
  { value: 'pen', label: 'Pen', icon: '@pencil' },
  { value: 'eraser', label: 'Eraser', icon: '@eraser' },
  { value: 'tick', label: 'Tick / Correct', icon: '✓' },
  { value: 'cross', label: 'Cross / Incorrect', icon: '✕' },
  { value: 'underline', label: 'Underline', icon: 'U̲' },
  { value: 'text', label: 'Text', icon: 'T' }
]
// marking ink: red, blue, green
const MARKING_COLORS = ['#dc2626', '#2563eb', '#16a34a']
// a learner writing an answer: black, blue and green ink
const ANSWER_COLORS = ['#000000', '#0000ff', '#16a34a']

const tools = computed(() => {
  if (props.variant === 'author') return [...BASE_TOOLS, COMMENT_TOOL]
  if (props.variant === 'marking') return MARKING_TOOLS
  return BASE_TOOLS
})

// --- 'answer' variant: Pencil is a thin-stroke alias of Pen (same underlying tool, distinct
// preset width) - pencilActive is purely local UI state so the two buttons highlight separately.
const PEN_DEFAULT_WIDTH = 3
const PENCIL_WIDTH = 1
const pencilActive = ref(false)

watch(() => props.tool, t => {
  if (t !== 'pen') pencilActive.value = false
})

function selectPen() {
  pencilActive.value = false
  emit('update:tool', 'pen')
  emit('update:strokeWidth', PEN_DEFAULT_WIDTH)
}

function selectPencil() {
  pencilActive.value = true
  emit('update:tool', 'pen')
  emit('update:strokeWidth', PENCIL_WIDTH)
}

function selectTool(t: AnnotationTool) {
  pencilActive.value = false
  emit('update:tool', t)
}

/** choose a tool from the More panel and close it */
function pick(t: AnnotationTool) {
  selectTool(t)
  moreToolsOpen.value = false
}
/** the current tool is one of those under More (the More button then shows as active) */
const inMoreTool = computed(() => (props.tool === 'pen' && pencilActive.value) || !['pen', 'highlighter', 'eraser'].includes(props.tool))
const SHAPE_OPTIONS: { value: AnnotationTool; label: string; icon: string }[] = [
  { value: 'line', label: 'Line', icon: '／' },
  { value: 'arrow', label: 'Arrow', icon: '➜' },
  { value: 'rectangle', label: 'Rectangle', icon: '▭' },
  { value: 'circle', label: 'Circle', icon: '◯' }
]


const TOOL_LABELS: Record<string, string> = {
  select: 'Select',
  pen: 'Pen',
  highlighter: 'Highlighter',
  eraser: 'Eraser',
  text: 'Text',
  line: 'Line',
  arrow: 'Arrow',
  rectangle: 'Rectangle',
  circle: 'Circle',
  image: 'Add media',
  comment: 'Comment',
  pan: 'Pan',
  equation: 'Equation',
  signature: 'Signature',
  underline: 'Underline',
  score: 'Score Box'
}

const activeToolLabel = computed(() => {
  if (props.tool === 'pen' && pencilActive.value) return 'Pencil'
  return TOOL_LABELS[props.tool] || props.tool
})
</script>

<style scoped>
.annotation-toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

.dark .annotation-toolbar {
  background-color: #1f2937;
  border-color: #374151;
}

.annotation-toolbar--vertical {
  flex-direction: column;
  align-items: stretch;
  border-bottom: none;
  border-right: 1px solid #e5e7eb;
}

.toolbar-section {
  display: flex;
  align-items: center;
  gap: 4px;
  padding-right: 12px;
  border-right: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .annotation-toolbar {
    padding: 6px;
    gap: 2px;
  }

  .toolbar-section {
    padding-right: 8px;
    gap: 2px;
  }

  .tool-btn,
  .color-btn {
    width: 32px;
    height: 32px;
  }

  .size-label span:first-child {
    display: none;
  }
}

.dark .toolbar-section {
  border-color: #374151;
}

.toolbar-section:last-child {
  border-right: none;
}

.tool-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  font-size: 15px;
}

.dark .tool-btn {
  background-color: #111827;
  border-color: #374151;
  color: #e5e7eb;
}

.tool-btn.active {
  background-color: #e0e7ff;
  border-color: #6366f1;
}

.tool-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tool-btn--danger {
  color: #dc2626;
}

.color-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
  cursor: pointer;
}

/* marking: one compact line (fits beside the part label on a 14" laptop) */
.annotation-toolbar--marking {
  flex-wrap: nowrap;
  gap: 2px;
}
.annotation-toolbar--marking .toolbar-section {
  flex-wrap: nowrap;
  gap: 2px;
  padding-right: 6px;
  margin-right: 4px;
}
.annotation-toolbar--marking .toolbar-section:last-child {
  margin-right: 0;
  padding-right: 0;
}
.annotation-toolbar--marking .tool-btn {
  width: 30px;
  height: 30px;
  font-size: 14px;
}

.color-btn--small,
.annotation-toolbar .color-btn--small {
  width: 16px;
  height: 16px;
  border-width: 1px;
}

.color-btn.active {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px #e0e7ff;
}

.size-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #374151;
}

.dark .size-label {
  color: #d1d5db;
}

.size-value {
  min-width: 30px;
}

/* --- 'answer' variant: one row on every screen --- */
.answer-toolbar {
  padding: 8px 10px;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
}

.dark .answer-toolbar {
  background-color: #1f2937;
  border-color: #374151;
}

.answer-toolbar__row {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: nowrap;
  min-width: 0;
}

.answer-toolbar__btn {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  padding: 0;
  gap: 6px;
}

.answer-toolbar__label,
.answer-toolbar__more-label {
  display: none;
  font-size: 12px;
  white-space: nowrap;
}

.answer-toolbar__sep {
  flex-shrink: 0;
  width: 1px;
  height: 22px;
  margin: 0 2px;
  background: #e5e7eb;
}

.dark .answer-toolbar__sep {
  background: #374151;
}

.answer-toolbar__colors {
  display: flex;
  align-items: center;
  gap: 4px;
  padding-right: 0;
  border-right: none;
}

/* colours: in the row from tablet width, under More on phones */
.answer-toolbar__colors--inline {
  display: none;
  flex-shrink: 0;
  margin-left: 4px;
}

.answer-toolbar__colors--panel {
  flex-wrap: wrap;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.dark .answer-toolbar__colors--panel {
  border-color: #374151;
}

.answer-toolbar__tool-label {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  font-size: 12px;
  color: #6b7280;
}

.dark .answer-toolbar__tool-label {
  color: #9ca3af;
}

.answer-toolbar__more {
  position: relative;
  flex-shrink: 0;
}

.answer-toolbar__more-btn {
  width: auto;
  padding: 0 10px;
  font-weight: 600;
}

.answer-toolbar__panel {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 30;
  width: min(300px, calc(100vw - 32px));
  padding: 10px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

.dark .answer-toolbar__panel {
  background-color: #111827;
  border-color: #374151;
}

.answer-toolbar__size {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-bottom: 8px;
}

.answer-toolbar__size input {
  flex: 1;
}

.answer-toolbar__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
}

.answer-toolbar__panel-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #e5e7eb;
}

.dark .answer-toolbar__panel-actions {
  border-color: #374151;
}

.answer-toolbar__item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 6px 8px;
  font-size: 13px;
  text-align: left;
  border: none;
  border-radius: 8px;
  background: none;
  cursor: pointer;
  color: #374151;
}

.dark .answer-toolbar__item {
  color: #d1d5db;
}

.answer-toolbar__item:hover,
.answer-toolbar__item.active {
  background-color: #e0e7ff;
}

.dark .answer-toolbar__item:hover,
.dark .answer-toolbar__item.active {
  background-color: rgba(99, 102, 241, 0.2);
}

.answer-toolbar__item--danger {
  color: #dc2626;
}

.answer-toolbar__item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* phones: the save status would crowd the tools */
@media (max-width: 479px) {
  .answer-toolbar__tool-label {
    visibility: hidden;
  }
}

/* tablet up: the colours join the row */
@media (min-width: 768px) {
  .answer-toolbar__colors--inline {
    display: flex;
  }

  .answer-toolbar__colors--panel {
    display: none;
  }

  .answer-toolbar__more-label {
    display: inline;
  }
}

/* large screens: names beside the icons */
@media (min-width: 1280px) {
  .answer-toolbar__btn:not(.answer-toolbar__more-btn) {
    width: auto;
    padding: 0 10px;
  }

  .answer-toolbar__label {
    display: inline;
  }
}
</style>
