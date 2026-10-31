<template>
  <div class="typed-answer-editor" :class="{ 'typed-answer-editor--readonly': readonly, 'typed-answer-editor--handwriting': handwriting }">
    <div v-if="editor && !readonly" class="typed-answer-editor__toolbar">
      <button
        type="button"
        class="typed-answer-editor__btn"
        :class="{ 'is-active': editor.isActive('bold') }"
        title="Bold"
        aria-label="Bold"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        class="typed-answer-editor__btn"
        :class="{ 'is-active': editor.isActive('italic') }"
        title="Italic"
        aria-label="Italic"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <em>I</em>
      </button>
      <button
        type="button"
        class="typed-answer-editor__btn"
        :class="{ 'is-active': editor.isActive('underline') }"
        title="Underline"
        aria-label="Underline"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <span class="underline">U</span>
      </button>

      <span class="typed-answer-editor__divider"></span>

      <select
        class="typed-answer-editor__size"
        title="Font size"
        aria-label="Font size"
        :value="currentFontSize"
        @change="setFontSize(($event.target as HTMLSelectElement).value)"
      >
        <option v-for="size in FONT_SIZES" :key="size" :value="`${size}px`">{{ size }}px</option>
      </select>

      <span class="typed-answer-editor__divider"></span>

      <button
        type="button"
        class="typed-answer-editor__btn"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        title="Bulleted list"
        aria-label="Bulleted list"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        •≡
      </button>
      <button
        type="button"
        class="typed-answer-editor__btn"
        :class="{ 'is-active': editor.isActive('orderedList') }"
        title="Numbered list"
        aria-label="Numbered list"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        1≡
      </button>

      <span class="typed-answer-editor__divider"></span>

      <button
        type="button"
        class="typed-answer-editor__btn"
        title="Undo"
        aria-label="Undo"
        :disabled="!editor.can().undo()"
        @click="editor.chain().focus().undo().run()"
      >
        ↶
      </button>
      <button
        type="button"
        class="typed-answer-editor__btn"
        title="Redo"
        aria-label="Redo"
        :disabled="!editor.can().redo()"
        @click="editor.chain().focus().redo().run()"
      >
        ↷
      </button>

      <span class="typed-answer-editor__divider"></span>

      <!-- write it in handwriting: the teacher sees it the same way when marking -->
      <button
        type="button"
        class="typed-answer-editor__btn typed-answer-editor__hand"
        :class="{ 'is-active': handwriting }"
        :aria-pressed="handwriting"
        title="Show my answer in handwriting"
        @click="emit('update:handwriting', !handwriting)"
      >
        <span aria-hidden="true">✍</span> Handwriting
      </button>
    </div>

    <div class="typed-answer-editor__content-wrap">
      <p v-if="isEmpty" class="typed-answer-editor__placeholder">{{ placeholder }}</p>
      <EditorContent :editor="editor" class="typed-answer-editor__content" />
    </div>

    <div class="typed-answer-editor__footer">
      <span>Words: {{ wordCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { FontSize } from '@/composables/tiptapFontSize'

const FONT_SIZES = [12, 14, 16, 18, 20, 24]
const DEFAULT_FONT_SIZE = '16px'

interface Props {
  modelValue: string
  readonly?: boolean
  placeholder?: string
  /** written in handwriting instead of print */
  handwriting?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false,
  placeholder: 'Type your answer here...',
  handwriting: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:handwriting', value: boolean): void
}>()

const editor = useEditor({
  content: props.modelValue || '',
  editable: !props.readonly,
  extensions: [
    StarterKit.configure({
      heading: false,
      blockquote: false,
      codeBlock: false,
      horizontalRule: false,
      strike: false
    }),
    Underline,
    FontSize
  ],
  editorProps: {
    attributes: {
      class: 'typed-answer-editor__prosemirror'
    }
  },
  onUpdate: ({ editor: e }) => {
    emit('update:modelValue', e.getHTML())
  }
})

const currentFontSize = computed(() => {
  if (!editor.value) return DEFAULT_FONT_SIZE
  return editor.value.getAttributes('textStyle').fontSize || DEFAULT_FONT_SIZE
})

function setFontSize(size: string) {
  editor.value?.chain().focus().setFontSize(size).run()
}

const wordCount = computed(() => {
  if (!editor.value) return 0
  const text = editor.value.getText().trim()
  return text ? text.split(/\s+/).length : 0
})

const isEmpty = computed(() => wordCount.value === 0)

// The parent restores a saved answer asynchronously (after the initial submission load) - keep
// the editor in sync without fighting the user's own typing (only resync when content actually
// differs, which in practice means "an external load just happened").
watch(() => props.modelValue, (value) => {
  if (!editor.value) return
  if (value === editor.value.getHTML()) return
  editor.value.commands.setContent(value || '', false)
})

watch(() => props.readonly, (value) => {
  editor.value?.setEditable(!value)
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style scoped>
.typed-answer-editor {
  border: 1px solid #d1d5db;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.dark .typed-answer-editor {
  border-color: #4b5563;
  background: #374151;
}

.typed-answer-editor__toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  flex-wrap: wrap;
}

.dark .typed-answer-editor__toolbar {
  border-color: #4b5563;
  background: #1f2937;
}

.typed-answer-editor__btn {
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s;
}

.dark .typed-answer-editor__btn {
  color: #e5e7eb;
}

.typed-answer-editor__btn:hover {
  background: #eef2ff;
}

.dark .typed-answer-editor__btn:hover {
  background: rgba(99, 102, 241, 0.15);
}

.typed-answer-editor__btn.is-active {
  background: #e0e7ff;
  border-color: #6366f1;
  color: #4338ca;
}

.dark .typed-answer-editor__btn.is-active {
  background: rgba(99, 102, 241, 0.25);
  color: #c7d2fe;
}

.typed-answer-editor__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.typed-answer-editor__divider {
  width: 1px;
  height: 24px;
  background: #e5e7eb;
  margin: 0 2px;
}

.dark .typed-answer-editor__divider {
  background: #4b5563;
}

.typed-answer-editor__size {
  height: 36px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #374151;
  font-size: 13px;
  padding: 0 6px;
  cursor: pointer;
}

.dark .typed-answer-editor__size {
  border-color: #4b5563;
  background: #1f2937;
  color: #e5e7eb;
}

.typed-answer-editor__content-wrap {
  position: relative;
}

.typed-answer-editor__content {
  min-height: 220px;
}

.typed-answer-editor__placeholder {
  position: absolute;
  top: 16px;
  left: 46px;
  font-size: 16px;
  color: #9ca3af;
  pointer-events: none;
  margin: 0;
}

.dark .typed-answer-editor__placeholder {
  color: #6b7280;
}

.typed-answer-editor__footer {
  padding: 6px 14px;
  border-top: 1px solid #e5e7eb;
  font-size: 12px;
  color: #9ca3af;
  text-align: right;
  background: #f9fafb;
}

.dark .typed-answer-editor__footer {
  border-color: #4b5563;
  background: #1f2937;
  color: #6b7280;
}

.typed-answer-editor__hand {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
}
</style>

<style>
/* The mark sheet: ruled paper - a pale blue line under every line of writing and a red margin.
   It stays paper-coloured in dark mode too, like a real sheet. */
.typed-answer-editor__prosemirror {
  padding: 14px 16px 16px 46px;
  min-height: 220px;
  font-size: 16px;
  line-height: 28px;
  color: #111827;
  outline: none;
  background-color: #fffef9;
  background-image:
    linear-gradient(to right, transparent 34px, #f2b8b8 34px, #f2b8b8 35.5px, transparent 35.5px),
    repeating-linear-gradient(to bottom, transparent 0, transparent 27px, #b7cdea 27px, #b7cdea 28px);
  background-position: 0 0, 0 14px;
  background-attachment: local;
}

.typed-answer-editor__prosemirror p,
.typed-answer-editor__prosemirror li {
  margin: 0;
}

.dark .typed-answer-editor__prosemirror {
  color: #111827;
}

/* in handwriting: a school hand in blue ink, on the same lines */
.typed-answer-editor--handwriting .typed-answer-editor__prosemirror {
  font-family: "Patrick Hand", "Comic Sans MS", cursive;
  font-size: 21px;
  color: #1e3a8a;
}

.typed-answer-editor__prosemirror ul {
  list-style: disc;
  padding-left: 24px;
}

.typed-answer-editor__prosemirror ol {
  list-style: decimal;
  padding-left: 24px;
}
</style>
