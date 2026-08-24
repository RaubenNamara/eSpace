<template>
  <div class="ckeditor-wrapper">
    <div v-if="!editorConfig" class="flex items-center justify-center p-8 text-gray-500">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mr-3"></div>
      <span>Loading editor...</span>
    </div>
    <Ckeditor
      v-else
      :editor="editor"
      :config="editorConfig"
      :model-value="sanitizedModelValue"
      @update:model-value="emitUpdate"
      @ready="onReady"
      @focus="onFocus"
      @blur="onBlur"
      @error="onError"
    ></Ckeditor>
    <div v-if="wordCount > 0 || characterCount > 0" class="word-count-footer">
      <span class="word-count-item">{{ wordCount }} words</span>
      <span class="word-count-item">{{ characterCount }} characters</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import 'ckeditor5/ckeditor5.css'

// Editor foundation
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Heading,
  Autoformat,
  SelectAll
} from 'ckeditor5'

// Text formatting
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Superscript,
  Subscript,
  Code,
  RemoveFormat
} from 'ckeditor5'

// Font tools
import {
  FontFamily,
  FontSize,
  FontColor,
  FontBackgroundColor,
  Highlight
} from 'ckeditor5'

// Paragraph formatting
import {
  Alignment,
  Indent,
  IndentBlock,
  HorizontalLine,
  BlockQuote
} from 'ckeditor5'

// Lists and links
import {
  Link,
  AutoLink,
  List,
  ListProperties,
  TodoList
} from 'ckeditor5'

// Images
import {
  Image,
  ImageBlock,
  ImageInline,
  ImageUpload,
  ImageInsert,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageResize,
  ImageTextAlternative,
  LinkImage
} from 'ckeditor5'

// Tables
import {
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
  TableColumnResize,
  TableCaption
} from 'ckeditor5'

// Media and embedded content
import {
  MediaEmbed,
  HtmlEmbed,
  GeneralHtmlSupport
} from 'ckeditor5'

// Code and source tools
import {
  CodeBlock,
  SourceEditing
} from 'ckeditor5'

// Special writing tools
import {
  SpecialCharacters,
  SpecialCharactersEssentials
} from 'ckeditor5'

// Productivity
import {
  PasteFromOffice,
  WordCount
} from 'ckeditor5'

// SECURITY NOTE: Source Editing and HTML Embed can allow unsafe HTML.
// All saved editor HTML must be sanitized by the PHP backend (HtmlSanitizer class)
// before being stored or displayed to prevent XSS attacks.

// LICENSE NOTE: Using GPL license key. If the project does not meet GPL requirements,
// a commercial license key must be purchased from CKSource.
const LICENSE_KEY = 'GPL'

interface Props {
  modelValue: string
  placeholder?: string
  minHeight?: string
  readOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Start typing...',
  minHeight: '400px',
  readOnly: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'ready', editor: any): void
  (e: 'focus', event: any): void
  (e: 'blur', event: any): void
  (e: 'error', error: any): void
}>()

const editor = ClassicEditor
const editorConfig = ref<any>(null)
const wordCount = ref(0)
const characterCount = ref(0)

// Sanitize model value to prevent CKEditor parsing errors
const sanitizedModelValue = computed(() => {
  if (typeof props.modelValue !== 'string') {
    return ''
  }
  
  // Basic sanitization to remove potentially problematic HTML
  let sanitized = props.modelValue
  
  // Remove null/undefined content
  if (!sanitized) {
    return ''
  }
  
  // Ensure the content is valid HTML string
  try {
    // If it looks like it might be malformed, return empty string
    if (sanitized.includes('undefined') || sanitized.includes('null')) {
      return ''
    }
    
    // Remove XML declarations that might be added by backend sanitizer
    sanitized = sanitized.replace(/<\?xml[^>]*\?>/gi, '')
    sanitized = sanitized.replace(/<!DOCTYPE[^>]*>/gi, '')
    
    // Allow iframe and figure tags for media embeds
    // Don't strip out valid media content
  } catch (e) {
    return ''
  }
  
  return sanitized
})

class SimpleUploadAdapter {
  private loader: any
  private xhr: XMLHttpRequest | null = null

  constructor(loader: any) {
    console.log('SimpleUploadAdapter constructor called')
    this.loader = loader
  }

  upload() {
    console.log('SimpleUploadAdapter upload() called')
    return new Promise((resolve, reject) => {
      this.loader.file.then((file: File) => {
        console.log('File received for upload:', file.name, file.size, file.type)
        const data = new FormData()
        data.append('upload', file)

        this.xhr = new XMLHttpRequest()
        const uploadUrl = '/api/teacher/enotes/upload-image'
        console.log('Uploading to:', uploadUrl)
        this.xhr.open('POST', uploadUrl, true)
        
        // Note: Backend uses session-based authentication, no token needed
        this.xhr.withCredentials = true
        
        this.xhr.responseType = 'json'

        this.xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100)
            console.log('Upload progress:', progress + '%')
            this.loader.uploadTotal = event.total
            this.loader.uploaded = event.loaded
          }
        }

        this.xhr.onload = () => {
          console.log('Upload completed with status:', this.xhr?.status)
          console.log('Response:', this.xhr?.response)
          
          if (this.xhr?.status === 200) {
            const response = this.xhr.response
            console.log('Upload response:', response)
            if (response.url) {
              console.log('Resolving with URL:', response.url)
              resolve({
                default: response.url
              })
            } else if (response.error) {
              console.error('Server returned error:', response.error)
              reject(new Error(response.error.message || 'Upload failed'))
            } else {
              console.error('Invalid response structure')
              reject(new Error('Invalid response from server'))
            }
          } else {
            console.error('Upload failed with status:', this.xhr?.status)
            reject(new Error(`Upload failed with status ${this.xhr?.status}`))
          }
        }

        this.xhr.onerror = () => {
          console.error('Upload network error')
          reject(new Error('Network error during upload'))
        }

        this.xhr.onabort = () => {
          console.error('Upload aborted')
          reject(new Error('Upload aborted'))
        }

        console.log('Sending upload request...')
        this.xhr.send(data)
      }).catch((error: any) => {
        console.error('Error getting file from loader:', error)
        reject(error)
      })
    })
  }

  abort() {
    console.log('Upload aborted')
    if (this.xhr) {
      this.xhr.abort()
    }
  }
}

const configureEditor = () => {
  console.log('Configuring CKEditor with modular plugins...')
  
  // Register the custom upload adapter plugin
  class SimpleUploadAdapterPlugin {
    constructor(editor: any) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return new SimpleUploadAdapter(loader)
      }
    }
    
    static get pluginName() {
      return 'SimpleUploadAdapter'
    }
  }
  
  editorConfig.value = {
    licenseKey: LICENSE_KEY,
    plugins: [
      Essentials,
      Paragraph,
      Heading,
      Autoformat,
      SelectAll,
      Bold,
      Italic,
      Underline,
      Strikethrough,
      Superscript,
      Subscript,
      Code,
      RemoveFormat,
      FontFamily,
      FontSize,
      FontColor,
      FontBackgroundColor,
      Highlight,
      Alignment,
      Indent,
      IndentBlock,
      HorizontalLine,
      BlockQuote,
      Link,
      AutoLink,
      List,
      ListProperties,
      TodoList,
      Image,
      ImageBlock,
      ImageInline,
      ImageUpload,
      ImageInsert,
      ImageToolbar,
      ImageCaption,
      ImageStyle,
      ImageResize,
      ImageTextAlternative,
      LinkImage,
      Table,
      TableToolbar,
      TableProperties,
      TableCellProperties,
      TableColumnResize,
      TableCaption,
      MediaEmbed,
      HtmlEmbed,
      GeneralHtmlSupport,
      CodeBlock,
      SourceEditing,
      SpecialCharacters,
      SpecialCharactersEssentials,
      PasteFromOffice,
      WordCount,
      SimpleUploadAdapterPlugin
    ],
    placeholder: props.placeholder,
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'heading',
        '|',
        'fontFamily',
        'fontSize',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'superscript',
        'subscript',
        '|',
        'highlight',
        'removeFormat',
        '|',
        'alignment',
        'outdent',
        'indent',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        '|',
        'link',
        'uploadImage',
        'mediaEmbed',
        'insertTable',
        '|',
        'blockQuote',
        'code',
        'codeBlock',
        'horizontalLine',
        'specialCharacters',
        'htmlEmbed',
        '|',
        'sourceEditing'
      ],
      shouldNotGroupWhenFull: false
    },
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
      ]
    },
    fontFamily: {
      options: [
        'default',
        'Arial, Helvetica, sans-serif',
        'Calibri, Arial, sans-serif',
        'Georgia, serif',
        'Times New Roman, Times, serif',
        'Courier New, Courier, monospace'
      ],
      supportAllValues: false
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 24, 28, 32, 36],
      supportAllValues: false
    },
    alignment: {
      options: ['left', 'center', 'right', 'justify']
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true
      }
    },
    image: {
      toolbar: [
        'imageTextAlternative',
        'toggleImageCaption',
        '|',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        '|',
        'resizeImage',
        'linkImage'
      ],
      resizeOptions: [
        {
          name: 'resizeImage:original',
          value: null,
          label: 'Original'
        },
        {
          name: 'resizeImage:25',
          value: '25',
          label: '25%'
        },
        {
          name: 'resizeImage:50',
          value: '50',
          label: '50%'
        },
        {
          name: 'resizeImage:75',
          value: '75',
          label: '75%'
        }
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        '|',
        'tableProperties',
        'tableCellProperties',
        '|',
        'toggleTableCaption'
      ]
    },
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://'
    },
    mediaEmbed: {
      previewsInData: false,
      extraProviders: [
        {
          name: 'youtube',
          url: /^https?:\/\/(www\.)?youtube\.com\/watch\?v=([^&]+)/,
          html: (match: any) => {
            const id = match[1];
            return `<figure class="media"><oembed url="https://www.youtube.com/watch?v=${id}"></oembed></figure>`;
          }
        },
        {
          name: 'youtubeShort',
          url: /^https?:\/\/(www\.)?youtu\.be\/([^?]+)/,
          html: (match: any) => {
            const id = match[1];
            return `<figure class="media"><oembed url="https://www.youtube.com/watch?v=${id}"></oembed></figure>`;
          }
        },
        {
          name: 'youtubeEmbed',
          url: /^https?:\/\/(www\.)?youtube\.com\/embed\/([^?]+)/,
          html: (match: any) => {
            const id = match[1];
            return `<figure class="media"><oembed url="https://www.youtube.com/watch?v=${id}"></oembed></figure>`;
          }
        },
        {
          name: 'youtubeShorts',
          url: /^https?:\/\/(www\.)?youtube\.com\/shorts\/([^?]+)/,
          html: (match: any) => {
            const id = match[1];
            return `<figure class="media"><oembed url="https://www.youtube.com/watch?v=${id}"></oembed></figure>`;
          }
        },
        {
          name: 'vimeo',
          url: /^https?:\/\/(www\.)?vimeo\.com\/(\d+)/,
          html: (match: any) => {
            const id = match[2];
            return `<figure class="media"><oembed url="https://vimeo.com/${id}"></oembed></figure>`;
          }
        }
      ]
    },
    htmlSupport: {
      allow: [
        {
          name: 'oembed',
          attributes: {
            url: true
          }
        },
        {
          name: 'figure',
          classes: ['media']
        }
      ]
    },
    codeBlock: {
      languages: [
        { language: 'plaintext', label: 'Plain text' },
        { language: 'html', label: 'HTML' },
        { language: 'css', label: 'CSS' },
        { language: 'javascript', label: 'JavaScript' },
        { language: 'typescript', label: 'TypeScript' },
        { language: 'php', label: 'PHP' },
        { language: 'sql', label: 'SQL' },
        { language: 'python', label: 'Python' }
      ]
    },
    wordCount: {
      onUpdate: (stats: any) => {
        wordCount.value = stats.words
        characterCount.value = stats.characters
      }
    }
  }
  console.log('CKEditor config set:', editorConfig.value)
}

const emitUpdate = (...args: unknown[]) => {
  console.log('emitUpdate called with args:', args)
  let value = ''
  
  // Handle different argument structures from CKEditor
  if (args.length > 0) {
    const firstArg = args[0]
    if (typeof firstArg === 'string') {
      value = firstArg
    } else if (firstArg && typeof firstArg === 'object') {
      // CKEditor might pass an event object with data property
      value = (firstArg as any).data || (firstArg as any).toString() || ''
    } else {
      value = String(firstArg || '')
    }
  }
  
  // Sanitize the value to ensure it's a valid string
  if (typeof value !== 'string') {
    value = String(value || '')
  }
  
  console.log('Emitting value:', value)
  emit('update:modelValue', value)
}

const onReady = (editor: any) => {
  console.log('CKEditor ready:', editor)
  emit('ready', editor)
  
  try {
    const editorElement = editor.ui.getEditableElement()
    if (editorElement) {
      editorElement.style.minHeight = props.minHeight
      console.log('CKEditor element set min-height:', props.minHeight)
    }
    
    // Log the model value being passed to editor
    console.log('CKEditor modelValue (first 500 chars):', props.modelValue ? props.modelValue.substring(0, 500) : 'empty')
    console.log('CKEditor modelValue contains iframe:', props.modelValue && props.modelValue.includes('iframe') ? 'YES' : 'NO')
    console.log('CKEditor modelValue contains oembed:', props.modelValue && props.modelValue.includes('oembed') ? 'YES' : 'NO')
    
    // Force media embeds to render when content is loaded
    if (editor.editing && editor.editing.view && editor.editing.view.document) {
      editor.editing.view.document.on('change:data', () => {
        console.log('Editor data changed, refreshing media embeds')
      })
    }
    
    // Set initial content if model value is empty
    if (!props.modelValue || props.modelValue.trim() === '') {
      editor.setData('')
    }
    
    // Log the current editor data to debug
    console.log('Initial editor data (first 500 chars):', editor.getData().substring(0, 500))
    console.log('Initial editor data contains iframe:', editor.getData().includes('iframe') ? 'YES' : 'NO')
    console.log('Initial editor data contains oembed:', editor.getData().includes('oembed') ? 'YES' : 'NO')
    
    // Check if media embed plugin is loaded
    console.log('Media embed plugin loaded:', editor.plugins.has('MediaEmbed') ? 'YES' : 'NO')
    console.log('GeneralHtmlSupport plugin loaded:', editor.plugins.has('GeneralHtmlSupport') ? 'YES' : 'NO')
    console.log('HtmlEmbed plugin loaded:', editor.plugins.has('HtmlEmbed') ? 'YES' : 'NO')
  } catch (error) {
    console.error('Error in onReady:', error)
  }
}

const onFocus = (event: any) => {
  emit('focus', event)
}

const onBlur = (event: any) => {
  emit('blur', event)
}

const onError = (error: any) => {
  console.error('CKEditor error:', error)
  
  // Provide user-friendly error messages
  let errorMessage = 'An error occurred with the editor'
  
  if (error && error.message) {
    if (error.message.includes('Upload failed')) {
      errorMessage = 'Image upload failed. Please check your internet connection and try again.'
    } else if (error.message.includes('Network error')) {
      errorMessage = 'Network error. Please check your connection and try again.'
    } else if (error.message.includes('Unauthorized')) {
      errorMessage = 'You are not authorized to upload images. Please log in again.'
    } else if (error.message.includes('data')) {
      errorMessage = 'Content parsing error. The page content may be corrupted. Please try clearing the content.'
    } else {
      errorMessage = error.message
    }
  }
  
  // Show user-friendly notification
  if (typeof window !== 'undefined' && (window as any).showNotification) {
    (window as any).showNotification('error', errorMessage)
  } else {
    alert(errorMessage)
  }
  
  emit('error', error)
}

onMounted(() => {
  configureEditor()
})

onBeforeUnmount(() => {
  editorConfig.value = null
})
</script>

<style scoped>
.ckeditor-wrapper {
  width: 100%;
}

.ckeditor-wrapper :deep(.ck-editor__editable) {
  min-height: 350px;
  max-height: 700px;
  overflow-y: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  background-color: #ffffff;
}

.ckeditor-wrapper :deep(.ck-editor__editable.ck-focused) {
  border-color: #6366f1 !important;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
}

.ckeditor-wrapper :deep(.ck-toolbar) {
  border-color: #e5e7eb;
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: #f9fafb;
}

.ckeditor-wrapper :deep(.ck-editor__main) {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.ckeditor-wrapper :deep(.ck-editor__editable) {
  border-top: 1px solid #e5e7eb;
  border-radius: 0 0 0.5rem 0.5rem;
}

.ckeditor-wrapper :deep(img) {
  max-width: 100%;
  height: auto;
}

.ckeditor-wrapper :deep(table) {
  width: 100%;
  border-collapse: collapse;
}

.ckeditor-wrapper :deep(.media-wrapper) {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  margin: 16px 0;
}

.ckeditor-wrapper :deep(.media-wrapper iframe) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.ckeditor-wrapper :deep(figure.media) {
  margin: 16px 0;
  position: relative;
  display: block;
}

.ckeditor-wrapper :deep(figure.media iframe) {
  width: 100%;
  height: 315px;
  border: 0;
  display: block;
  border-radius: 4px;
}

/* Ensure all iframes in editor are visible */
.ckeditor-wrapper :deep(iframe) {
  display: block !important;
  min-width: 200px;
  min-height: 200px;
  border: 1px solid #ccc;
  background: #f0f0f0;
}

.ckeditor-wrapper :deep(p iframe) {
  display: block !important;
  width: 100%;
  min-height: 200px;
  border: 1px solid #ccc;
  background: #f0f0f0;
}

.ckeditor-wrapper :deep(figure.image) {
  margin: 16px 0;
}

.ckeditor-wrapper :deep(figure.image img) {
  max-width: 100%;
  height: auto;
}

.word-count-footer {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-top: none;
  border-radius: 0 0 0.5rem 0.5rem;
  font-size: 12px;
  color: #6b7280;
}

.word-count-item {
  font-weight: 500;
}

/* Responsive toolbar */
@media (max-width: 768px) {
  .ckeditor-wrapper :deep(.ck-toolbar) {
    flex-wrap: wrap;
  }
  
  .ckeditor-wrapper :deep(.ck-toolbar__items) {
    flex-wrap: wrap;
  }
}
</style>
