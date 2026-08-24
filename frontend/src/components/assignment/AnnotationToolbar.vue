<template>
  <!-- Student answer toolbar: grouped layout (Pencil alias, Shapes dropdown, Add media, tool-name readout) -->
  <div v-if="variant === 'answer'" class="answer-toolbar">
    <div class="answer-toolbar__row">
      <button type="button" :class="['tool-btn', 'answer-toolbar__btn', { active: tool === 'select' }]" title="Select" :disabled="disabled" @click="selectTool('select')">
        <span class="tool-btn__icon">↖</span><span class="answer-toolbar__label">Select</span>
      </button>
      <button type="button" :class="['tool-btn', 'answer-toolbar__btn', { active: tool === 'pan' }]" title="Pan" :disabled="disabled" @click="selectTool('pan')">
        <span class="tool-btn__icon">✋</span><span class="answer-toolbar__label">Pan</span>
      </button>
      <button type="button" :class="['tool-btn', 'answer-toolbar__btn', { active: tool === 'pen' && !pencilActive }]" title="Pen" :disabled="disabled" @click="selectPen">
        <span class="tool-btn__icon">✏️</span><span class="answer-toolbar__label">Pen</span>
      </button>
      <button type="button" :class="['tool-btn', 'answer-toolbar__btn', { active: tool === 'pen' && pencilActive }]" title="Pencil" :disabled="disabled" @click="selectPencil">
        <span class="tool-btn__icon">✎</span><span class="answer-toolbar__label">Pencil</span>
      </button>
      <button type="button" :class="['tool-btn', 'answer-toolbar__btn', { active: tool === 'highlighter' }]" title="Highlighter" :disabled="disabled" @click="selectTool('highlighter')">
        <span class="tool-btn__icon">🖍️</span><span class="answer-toolbar__label">Highlighter</span>
      </button>
      <button type="button" :class="['tool-btn', 'answer-toolbar__btn', { active: tool === 'eraser' }]" title="Eraser" :disabled="disabled" @click="selectTool('eraser')">
        <span class="tool-btn__icon">🧽</span><span class="answer-toolbar__label">Eraser</span>
      </button>
      <button type="button" :class="['tool-btn', 'answer-toolbar__btn', { active: tool === 'text' }]" title="Text" :disabled="disabled" @click="selectTool('text')">
        <span class="tool-btn__icon">T</span><span class="answer-toolbar__label">Text</span>
      </button>

      <div class="answer-toolbar__dropdown">
        <button
          type="button"
          :class="['tool-btn', 'answer-toolbar__btn', { active: SHAPE_TOOLS.includes(tool) }]"
          title="Shapes"
          :disabled="disabled"
          @click="shapesOpen = !shapesOpen"
        >
          <span class="tool-btn__icon">{{ activeShapeIcon }}</span><span class="answer-toolbar__label">Shapes ▾</span>
        </button>
        <div v-if="shapesOpen" class="answer-toolbar__menu">
          <button
            v-for="s in SHAPE_OPTIONS"
            :key="s.value"
            type="button"
            :class="['answer-toolbar__menu-item', { active: tool === s.value }]"
            @click="selectTool(s.value); shapesOpen = false"
          >
            <span class="tool-btn__icon">{{ s.icon }}</span> {{ s.label }}
          </button>
        </div>
      </div>

      <button type="button" :class="['tool-btn', 'answer-toolbar__btn', { active: tool === 'image' }]" title="Add media" :disabled="disabled" @click="selectTool('image')">
        <span class="tool-btn__icon">🖼️</span><span class="answer-toolbar__label">Add media</span>
      </button>
      <button type="button" :class="['tool-btn', 'answer-toolbar__btn', { active: tool === 'equation' }]" title="Equation" :disabled="disabled" @click="selectTool('equation')">
        <span class="tool-btn__icon">∑</span><span class="answer-toolbar__label">Equation</span>
      </button>
      <button type="button" :class="['tool-btn', 'answer-toolbar__btn', { active: tool === 'signature' }]" title="Signature" :disabled="disabled" @click="selectTool('signature')">
        <span class="tool-btn__icon">✒️</span><span class="answer-toolbar__label">Signature</span>
      </button>
      <button type="button" :class="['tool-btn', 'answer-toolbar__btn', { active: tool === 'comment' }]" title="Comment" :disabled="disabled" @click="selectTool('comment')">
        <span class="tool-btn__icon">💬</span><span class="answer-toolbar__label">Comment</span>
      </button>

      <div class="toolbar-section answer-toolbar__colors">
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
    </div>

    <div class="answer-toolbar__row answer-toolbar__row--secondary">
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
      <button type="button" class="tool-btn answer-toolbar__btn answer-toolbar__btn--text" title="Undo" :disabled="disabled" @click="$emit('undo')">Undo</button>
      <button type="button" class="tool-btn answer-toolbar__btn answer-toolbar__btn--text" title="Redo" :disabled="disabled" @click="$emit('redo')">Redo</button>
      <button type="button" class="tool-btn answer-toolbar__btn answer-toolbar__btn--text" title="Clear Selected" :disabled="disabled" @click="$emit('clear-selected')">Clear Selected</button>
      <button type="button" class="tool-btn answer-toolbar__btn answer-toolbar__btn--text tool-btn--danger" title="Clear All" :disabled="disabled" @click="$emit('clear-all')">Clear</button>
      <span class="answer-toolbar__tool-label">{{ statusLabel || `Tool: ${activeToolLabel}` }}</span>
    </div>
  </div>

  <!-- Author / marking toolbar: flat button row (unchanged) -->
  <div v-else class="annotation-toolbar" :class="{ 'annotation-toolbar--vertical': vertical }">
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
        <span class="tool-btn__icon">{{ t.icon }}</span>
      </button>
    </div>

    <div class="toolbar-section">
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

    <div class="toolbar-section">
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
      <button type="button" class="tool-btn" title="Clear Selected" :disabled="disabled" @click="$emit('clear-selected')">⌫</button>
      <button type="button" class="tool-btn tool-btn--danger" title="Clear All" :disabled="disabled" @click="$emit('clear-all')">🗑</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
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
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'answer',
  disabled: false,
  vertical: false,
  statusLabel: ''
})

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
  { value: 'pan', label: 'Pan', icon: '✋' },
  { value: 'pen', label: 'Pen', icon: '✏️' },
  { value: 'pencil', label: 'Pencil', icon: '✎' },
  { value: 'highlighter', label: 'Highlighter', icon: '🖍️' },
  { value: 'eraser', label: 'Eraser', icon: '🧽' },
  { value: 'line', label: 'Line', icon: '／' },
  { value: 'arrow', label: 'Arrow', icon: '➜' },
  { value: 'rectangle', label: 'Rectangle', icon: '▭' },
  { value: 'circle', label: 'Circle', icon: '◯' },
  { value: 'text', label: 'Text', icon: 'T' },
  { value: 'image', label: 'Insert Image', icon: '🖼️' },
  { value: 'equation', label: 'Equation', icon: '∑' },
  { value: 'signature', label: 'Signature', icon: '✒️' }
]

const COMMENT_TOOL: { value: AnnotationTool; label: string; icon: string } = { value: 'comment', label: 'Comment', icon: '💬' }
const MARKING_TOOLS: { value: AnnotationTool; label: string; icon: string }[] = [
  { value: 'tick', label: 'Tick / Correct', icon: '✓' },
  { value: 'cross', label: 'Cross / Incorrect', icon: '✕' },
  { value: 'underline', label: 'Underline', icon: 'U̲' },
  { value: 'score', label: 'Score Box', icon: '☐' }
]

const tools = computed(() => {
  if (props.variant === 'author') return [...BASE_TOOLS, COMMENT_TOOL]
  if (props.variant === 'marking') return [...BASE_TOOLS, COMMENT_TOOL, ...MARKING_TOOLS]
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

const shapesOpen = ref(false)
const SHAPE_TOOLS: AnnotationTool[] = ['line', 'arrow', 'rectangle', 'circle']
const SHAPE_OPTIONS: { value: AnnotationTool; label: string; icon: string }[] = [
  { value: 'line', label: 'Line', icon: '／' },
  { value: 'arrow', label: 'Arrow', icon: '➜' },
  { value: 'rectangle', label: 'Rectangle', icon: '▭' },
  { value: 'circle', label: 'Circle', icon: '◯' }
]

const activeShapeIcon = computed(() => SHAPE_OPTIONS.find(s => s.value === props.tool)?.icon || '▭')

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

:global(.dark) .annotation-toolbar {
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

:global(.dark) .toolbar-section {
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

:global(.dark) .tool-btn {
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

:global(.dark) .size-label {
  color: #d1d5db;
}

.size-value {
  min-width: 30px;
}

/* --- 'answer' variant grouped layout --- */
.answer-toolbar {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
}

:global(.dark) .answer-toolbar {
  background-color: #1f2937;
  border-color: #374151;
}

.answer-toolbar__row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.answer-toolbar__row--secondary {
  padding-top: 6px;
  border-top: 1px solid #e5e7eb;
}

:global(.dark) .answer-toolbar__row--secondary {
  border-color: #374151;
}

.answer-toolbar__btn {
  width: auto;
  height: 32px;
  padding: 0 10px;
  gap: 6px;
}

/* Plain text buttons (Undo/Redo/Clear Selected/Clear) have no icon+label span to collapse on
   mobile - they must keep auto-width at every breakpoint or their text overflows the fixed
   icon-square size .answer-toolbar__btn otherwise shrinks to. */
.answer-toolbar__btn--text {
  white-space: nowrap;
  font-size: 12px;
}

.answer-toolbar__label {
  font-size: 12px;
  white-space: nowrap;
}

.answer-toolbar__colors {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  padding-right: 0;
  border-right: none;
}

.answer-toolbar__dropdown {
  position: relative;
}

.answer-toolbar__menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  min-width: 130px;
  padding: 4px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

:global(.dark) .answer-toolbar__menu {
  background-color: #111827;
  border-color: #374151;
}

.answer-toolbar__menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  font-size: 13px;
  text-align: left;
  border: none;
  border-radius: 6px;
  background: none;
  cursor: pointer;
  color: #374151;
}

:global(.dark) .answer-toolbar__menu-item {
  color: #d1d5db;
}

.answer-toolbar__menu-item:hover,
.answer-toolbar__menu-item.active {
  background-color: #e0e7ff;
}

:global(.dark) .answer-toolbar__menu-item:hover,
:global(.dark) .answer-toolbar__menu-item.active {
  background-color: rgba(99, 102, 241, 0.2);
}

.answer-toolbar__tool-label {
  margin-left: auto;
  font-size: 12px;
  color: #6b7280;
}

:global(.dark) .answer-toolbar__tool-label {
  color: #9ca3af;
}

@media (max-width: 640px) {
  .answer-toolbar__label {
    display: none;
  }

  .answer-toolbar__btn {
    width: 32px;
    padding: 0;
  }

  .answer-toolbar__btn--text {
    width: auto;
    padding: 0 6px;
  }
}
</style>
