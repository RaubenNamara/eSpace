<template>
  <div class="note-editor">
    <!-- Toolbar -->
    <div class="editor-toolbar flex flex-wrap gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-t-lg border border-gray-300 dark:border-gray-600">
      <button
        v-for="button in textButtons"
        :key="button.name"
        @click="executeEditorAction(button.action)"
        :class="[
          'p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors',
          editor?.isActive(button.name) ? 'bg-indigo-500 text-white' : 'text-gray-700 dark:text-gray-300'
        ]"
        :title="button.title"
      >
        <span v-html="button.icon"></span>
      </button>

      <div class="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <button
        @click="editor?.chain().focus().toggleBold().run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors',
          editor?.isActive('bold') ? 'bg-indigo-500 text-white' : 'text-gray-700 dark:text-gray-300'
        ]"
        title="Bold"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"></path>
        </svg>
      </button>

      <button
        @click="editor?.chain().focus().toggleItalic().run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors',
          editor?.isActive('italic') ? 'bg-indigo-500 text-white' : 'text-gray-700 dark:text-gray-300'
        ]"
        title="Italic"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 4h4m-2 0v16m-4 0h8"></path>
        </svg>
      </button>

      <button
        @click="editor?.chain().focus().toggleUnderline().run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors',
          editor?.isActive('underline') ? 'bg-indigo-500 text-white' : 'text-gray-700 dark:text-gray-300'
        ]"
        title="Underline"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v7a5 5 0 0010 0V4M5 20h14"></path>
        </svg>
      </button>

      <button
        @click="editor?.chain().focus().toggleStrike().run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors',
          editor?.isActive('strike') ? 'bg-indigo-500 text-white' : 'text-gray-700 dark:text-gray-300'
        ]"
        title="Strikethrough"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 12H7m10-4a4 4 0 00-8 0m8 8a4 4 0 01-8 0"></path>
        </svg>
      </button>

      <div class="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <button
        @click="editor?.chain().focus().toggleBulletList().run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors',
          editor?.isActive('bulletList') ? 'bg-indigo-500 text-white' : 'text-gray-700 dark:text-gray-300'
        ]"
        title="Bullet List"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <button
        @click="editor?.chain().focus().toggleOrderedList().run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors',
          editor?.isActive('orderedList') ? 'bg-indigo-500 text-white' : 'text-gray-700 dark:text-gray-300'
        ]"
        title="Ordered List"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
        </svg>
      </button>

      <div class="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <button
        @click="editor?.chain().focus().toggleBlockquote().run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors',
          editor?.isActive('blockquote') ? 'bg-indigo-500 text-white' : 'text-gray-700 dark:text-gray-300'
        ]"
        title="Quote"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      </button>

      <button
        @click="editor?.chain().focus().toggleCodeBlock().run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors',
          editor?.isActive('codeBlock') ? 'bg-indigo-500 text-white' : 'text-gray-700 dark:text-gray-300'
        ]"
        title="Code Block"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
      </button>

      <div class="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <button
        @click="addImage"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
        title="Insert Image"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </button>

      <button
        @click="addVideo"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
        title="Insert Video"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      </button>

      <button
        @click="addYouTube"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
        title="Insert YouTube Video"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </button>

      <button
        @click="addLink"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
        title="Insert Link"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
        </svg>
      </button>

      <button
        @click="editor?.chain().focus().setHorizontalRule().run()"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
        title="Horizontal Rule"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
        </svg>
      </button>

      <div class="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <button
        @click="editor?.chain().focus().undo().run()"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
        title="Undo"
        :disabled="!editor?.can().undo()"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
        </svg>
      </button>

      <button
        @click="editor?.chain().focus().redo().run()"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
        title="Redo"
        :disabled="!editor?.can().redo()"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"></path>
        </svg>
      </button>
    </div>

    <!-- Editor -->
    <editor-content v-if="editor" :editor="editor" class="editor-content min-h-[400px] p-4 bg-white dark:bg-gray-800 rounded-b-lg border border-t-0 border-gray-300 dark:border-gray-600 prose dark:prose-invert max-w-none" />

    <!-- Hidden file input for image upload -->
    <input
      ref="imageInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleImageUpload"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const imageInput = ref<HTMLInputElement>()

const textButtons = [
  { name: 'paragraph', action: 'setParagraph', title: 'Paragraph', icon: '¶' },
  { name: 'heading', args: { level: 1 }, action: 'toggleHeading', title: 'Heading 1', icon: 'H1' },
  { name: 'heading', args: { level: 2 }, action: 'toggleHeading', title: 'Heading 2', icon: 'H2' },
  { name: 'heading', args: { level: 3 }, action: 'toggleHeading', title: 'Heading 3', icon: 'H3' },
]

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Image,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-indigo-600 hover:text-indigo-800 underline cursor-pointer',
      },
    }),
    Underline,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    TextStyle,
    Color,
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
  },
})

watch(() => props.modelValue, (newValue) => {
  if (editor.value && editor.value.getHTML() !== newValue) {
    editor.value.commands.setContent(newValue, false)
  }
})

const addImage = () => {
  imageInput.value?.click()
}

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}api/teacher/notes/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })

    const data = await response.json()
    if (data.success) {
      editor.value?.chain().focus().setImage({ src: data.data.url }).run()
    }
  } catch (error) {
    console.error('Failed to upload image:', error)
  }

  target.value = ''
}

const addVideo = () => {
  const url = prompt('Enter video URL:')
  if (url) {
    editor.value?.chain().focus().insertContent(`<video src="${url}" controls class="max-w-full rounded-lg"></video>`).run()
  }
}

const addYouTube = () => {
  const url = prompt('Enter YouTube URL:')
  if (url) {
    const videoId = extractYouTubeId(url)
    if (videoId) {
      editor.value?.chain().focus().insertContent(`
        <div class="youtube-wrapper my-4">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/${videoId}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="rounded-lg"
          ></iframe>
        </div>
      `).run()
    }
  }
}

const extractYouTubeId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

const executeEditorAction = (action: string) => {
  if (!editor.value) return

  const chain = editor.value.chain().focus()

  switch (action) {
    case 'toggleBold':
      chain.toggleBold().run()
      break
    case 'toggleItalic':
      chain.toggleItalic().run()
      break
    case 'toggleUnderline':
      chain.toggleUnderline().run()
      break
    case 'toggleStrike':
      chain.toggleStrike().run()
      break
    case 'toggleBulletList':
      chain.toggleBulletList().run()
      break
    case 'toggleOrderedList':
      chain.toggleOrderedList().run()
      break
    case 'toggleBlockquote':
      chain.toggleBlockquote().run()
      break
    case 'toggleCodeBlock':
      chain.toggleCodeBlock().run()
      break
    default:
      break
  }
}

const addLink = () => {
  const url = prompt('Enter URL:')
  if (url) {
    editor.value?.chain().focus().setLink({ href: url }).run()
  }
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style>
.editor-content .ProseMirror {
  outline: none;
  min-height: 400px;
}

.editor-content .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

.editor-content .ProseMirror img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
}

.editor-content .ProseMirror iframe {
  max-width: 100%;
  border-radius: 8px;
}

.editor-content .ProseMirror blockquote {
  border-left: 4px solid #6366f1;
  padding-left: 16px;
  margin: 16px 0;
  font-style: italic;
  background: #f3f4f6;
  padding: 16px;
  border-radius: 0 8px 8px 0;
}

.editor-content .ProseMirror pre {
  background: #1e293b;
  color: #e2e8f0;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}

.editor-content .ProseMirror code {
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.875em;
}

.editor-content .ProseMirror pre code {
  background: transparent;
  padding: 0;
}

.editor-content .ProseMirror hr {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 24px 0;
}

.youtube-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}

.youtube-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
