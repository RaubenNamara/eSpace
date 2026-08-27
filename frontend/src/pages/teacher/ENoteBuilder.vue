<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <button
          @click="goBack"
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div>
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white">{{ topic?.title }}</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ topic?.subject_name }}</p>
        </div>
      </div>

      <div class="flex items-center space-x-3">
        <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span v-if="autosaveStatus === 'saving'" class="text-yellow-600 dark:text-yellow-400">
            <svg class="animate-spin h-4 w-4 inline" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </span>
          <span v-else-if="autosaveStatus === 'saved'" class="text-green-600 dark:text-green-400">
            Saved
          </span>
          <span v-else class="text-gray-400">
            Unsaved
          </span>
        </div>

        <button
          @click="openPreview"
          class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          <span>Preview</span>
        </button>

        <button
          @click="publishTopic"
          :disabled="topic?.status === 'published'"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ topic?.status === 'published' ? 'Published' : 'Publish' }}
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Sidebar - Pages -->
      <div class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-gray-900 dark:text-white">Pages</h2>
            <button
              @click="addPage"
              class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              title="Add Page"
            >
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-2">
          <div
            v-for="(page, index) in pages"
            :key="page.id"
            draggable="true"
            @dragstart="onDragStart(index)"
            @dragover.prevent="onDragOver"
            @drop="onDrop(index)"
            @dragend="onDragEnd"
            @click="selectPage(page.id)"
            :class="[
              'p-3 rounded-lg cursor-pointer transition-colors mb-1',
              currentPage?.id === page.id
                ? 'bg-indigo-100 dark:bg-indigo-900 border border-indigo-300 dark:border-indigo-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700',
              draggedIndex === index ? 'opacity-50' : ''
            ]"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center flex-1 min-w-0">
                <svg class="w-4 h-4 text-gray-400 mr-2 cursor-move" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                </svg>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    Page {{ page.order_number }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ getPageWordCount(page.content) }} words
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-1 ml-2">
                <button
                  @click.stop="movePageUp(index)"
                  :disabled="index === 0"
                  class="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move Up"
                >
                  <svg class="w-3 h-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                </button>
                <button
                  @click.stop="movePageDown(index)"
                  :disabled="index === pages.length - 1"
                  class="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move Down"
                >
                  <svg class="w-3 h-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <button
                  @click.stop="duplicatePage(page.id)"
                  class="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                  title="Duplicate"
                >
                  <svg class="w-3 h-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
                <button
                  @click.stop="deletePage(page.id)"
                  class="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                  title="Delete"
                >
                  <svg class="w-3 h-3 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="addPage"
            class="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Add New Page</span>
          </button>
        </div>
      </div>

      <!-- Main Editor -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <div class="flex-1 overflow-y-auto p-6">
          <div v-if="currentPage" class="max-w-4xl mx-auto">
            <div class="mb-4">
              <input
                v-model="currentPage.title"
                @input="scheduleAutosave"
                type="text"
                placeholder="Page Title"
                class="w-full text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-none focus:ring-0 p-0"
              >
            </div>

            <div class="mb-4">
              <CKEditor
                v-if="currentPage"
                :key="currentPage.id"
                v-model="currentPage.content"
                @update:model-value="scheduleAutosave"
                @ready="onEditorReady"
                @error="onEditorError"
                placeholder="Write your page content here..."
                min-height="400px"
              />
              <div v-else class="p-8 text-center text-gray-500">
                Select or create a page to start editing
              </div>
            </div>

            <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Page {{ currentPage?.order_number }} of {{ pages.length }}</span>
              <div class="flex items-center space-x-2">
                <button
                  @click="previousPage"
                  :disabled="!hasPreviousPage"
                  class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="!hasNextPage"
                  class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div v-else class="flex items-center justify-center h-full">
            <div class="text-center">
              <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p class="text-gray-600 dark:text-gray-400 mb-4">No page selected</p>
              <button
                @click="addPage"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create First Page
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar - Settings -->
      <div class="w-72 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
        <h2 class="font-semibold text-gray-900 dark:text-white mb-4">Page Settings</h2>

        <div v-if="currentPage" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Page Order</label>
            <input
              :value="currentPage.order_number"
              type="number"
              disabled
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            >
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Drag pages in the sidebar to reorder
            </p>
          </div>

          <div>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="currentPage.is_active"
                @change="scheduleAutosave"
                type="checkbox"
                class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              >
              <span class="text-sm text-gray-700 dark:text-gray-300">Active</span>
            </label>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Only active pages are visible to students
            </p>
          </div>

          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Statistics</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Word Count</span>
                <span class="text-gray-900 dark:text-white">{{ getPageWordCount(currentPage.content) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Character Count</span>
                <span class="text-gray-900 dark:text-white">{{ currentPage.content.length }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Reading Time</span>
                <span class="text-gray-900 dark:text-white">{{ getReadingTime(currentPage.content) }} min</span>
              </div>
            </div>
          </div>

          <NarrationControls
            v-if="topic"
            :topic-id="topic.id"
            :page-id="currentPage.id"
            :narration-voice="topic.narration_voice ?? null"
            :narrations="currentPage.narrations || []"
            @voice-changed="onNarrationVoiceChanged"
            @narration-generated="onNarrationGenerated"
          />

          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Topic Info</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Total Pages</span>
                <span class="text-gray-900 dark:text-white">{{ pages.length }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Status</span>
                <span
                  :class="[
                    'px-2 py-0.5 rounded-full text-xs',
                    topic?.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    topic?.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  ]"
                >
                  {{ topic?.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-500 dark:text-gray-400 text-sm">
          Select a page to view settings
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import axios from 'axios'
import CKEditor from '@/components/teacher/CKEditor.vue'
import NarrationControls from '@/components/enotes/NarrationControls.vue'
import { resolveContentAssetUrls } from '@/utils/richContent'
import type { ENoteTopic, ENotePage, ENotePageForm, ENotePageNarration } from '@/types/enotes'

const router = useRouter()
const route = useRoute()

const API_BASE = '/api'

const topicId = computed(() => parseInt(route.params.id as string))
const topic = ref<ENoteTopic | null>(null)
const pages = ref<ENotePage[]>([])
const currentPage = ref<ENotePage | null>(null)

const autosaveStatus = ref<'idle' | 'saving' | 'saved'>('idle')
const autosaveTimeout = ref<number | null>(null)

const draggedIndex = ref<number | null>(null)

const hasPreviousPage = computed(() => {
  if (!currentPage.value) return false
  const currentIndex = pages.value.findIndex(p => p.id === currentPage.value!.id)
  return currentIndex > 0
})

const hasNextPage = computed(() => {
  if (!currentPage.value) return false
  const currentIndex = pages.value.findIndex(p => p.id === currentPage.value!.id)
  return currentIndex < pages.value.length - 1
})

const loadTopic = async () => {
  try {
    console.log('Loading topic:', topicId.value)
    const response = await axios.get(`${API_BASE}/teacher/enotes/topics/${topicId.value}`)
    console.log('Topic response:', response.data)
    if (response.data.success) {
      topic.value = response.data.data
      pages.value = (response.data.data.pages || []).map((page: ENotePage) => ({
        ...page,
        // Safety net for images/GIFs saved before the upload adapter baked the /eSpace/ base
        // path into the src itself - without this, reopening an older page to edit it would
        // show a broken image even though the same content renders fine after this fix (see
        // resolveContentAssetUrls()). Re-saving the page persists the corrected src for good.
        content: resolveContentAssetUrls(page.content || '')
      }))
      console.log('Pages loaded:', pages.value.length)
      
      if (pages.value.length > 0) {
        currentPage.value = pages.value[0]
        console.log('Current page set:', currentPage.value)
      } else {
        console.log('No pages found, currentPage is null')
      }
    }
  } catch (error) {
    console.error('Failed to load topic:', error)
  }
}

const onNarrationVoiceChanged = (voice: string) => {
  if (topic.value) topic.value.narration_voice = voice
}

const onNarrationGenerated = (narration: ENotePageNarration) => {
  if (!currentPage.value) return
  const list = currentPage.value.narrations || []
  const idx = list.findIndex(n => n.voice === narration.voice)
  if (idx >= 0) {
    list[idx] = narration
  } else {
    list.push(narration)
  }
  currentPage.value.narrations = [...list]
}

const selectPage = async (pageId: number) => {
  await flushAutosave()
  currentPage.value = pages.value.find(p => p.id === pageId) || null
}

const addPage = async () => {
  try {
    await flushAutosave()

    const newPage: ENotePageForm = {
      title: 'Page',
      content: '',
      is_active: true
    }

    const response = await axios.post(
      `${API_BASE}/teacher/enotes/topics/${topicId.value}/pages`,
      newPage
    )

    if (response.data.success) {
      await loadTopic()
      if (response.data.data.id) {
        selectPage(response.data.data.id)
      }
    }
  } catch (error) {
    console.error('Failed to add page:', error)
  }
}

const updatePage = async () => {
  if (!currentPage.value) return

  try {
    autosaveStatus.value = 'saving'

    const updateData: Partial<ENotePageForm> = {
      title: currentPage.value.title,
      content: currentPage.value.content || '',
      is_active: currentPage.value.is_active
    }

    await axios.put(`${API_BASE}/teacher/enotes/pages/${currentPage.value.id}`, updateData)

    autosaveStatus.value = 'saved'

    setTimeout(() => {
      if (autosaveStatus.value === 'saved') {
        autosaveStatus.value = 'idle'
      }
    }, 2000)
  } catch (error) {
    console.error('Failed to update page:', error)
    autosaveStatus.value = 'idle'
  }
}

const scheduleAutosave = () => {
  if (autosaveTimeout.value) {
    clearTimeout(autosaveTimeout.value)
  }

  autosaveStatus.value = 'idle'

  autosaveTimeout.value = window.setTimeout(() => {
    updatePage()
  }, 2000)
}

// Navigating away or switching pages while a debounced autosave is still pending
// used to just clearTimeout() it, silently discarding the edit (e.g. an inserted
// image) instead of saving it. Anything that leaves the current page must flush first.
const flushAutosave = async () => {
  if (autosaveTimeout.value) {
    clearTimeout(autosaveTimeout.value)
    autosaveTimeout.value = null
    await updatePage()
  }
}

const duplicatePage = async (pageId: number) => {
  try {
    await axios.post(`${API_BASE}/teacher/enotes/pages/${pageId}/duplicate`)
    await loadTopic()
  } catch (error) {
    console.error('Failed to duplicate page:', error)
  }
}

const deletePage = async (pageId: number) => {
  if (!confirm('Are you sure you want to delete this page?')) return

  try {
    await axios.delete(`${API_BASE}/teacher/enotes/pages/${pageId}`)
    await loadTopic()

    if (currentPage.value?.id === pageId) {
      currentPage.value = pages.value.length > 0 ? pages.value[0] : null
    }
  } catch (error) {
    console.error('Failed to delete page:', error)
  }
}

const previousPage = async () => {
  if (!hasPreviousPage.value || !currentPage.value) return

  await flushAutosave()
  const currentIndex = pages.value.findIndex(p => p.id === currentPage.value!.id)
  if (currentIndex > 0) {
    currentPage.value = pages.value[currentIndex - 1]
  }
}

const nextPage = async () => {
  if (!hasNextPage.value || !currentPage.value) return

  await flushAutosave()
  const currentIndex = pages.value.findIndex(p => p.id === currentPage.value!.id)
  if (currentIndex < pages.value.length - 1) {
    currentPage.value = pages.value[currentIndex + 1]
  }
}

const publishTopic = async () => {
  if (!topic.value) return

  try {
    await flushAutosave()

    if (topic.value.status === 'published') {
      await axios.post(`${API_BASE}/teacher/enotes/topics/${topic.value.id}/unpublish`)
    } else {
      await axios.post(`${API_BASE}/teacher/enotes/topics/${topic.value.id}/publish`)
    }

    await loadTopic()
  } catch (error) {
    console.error('Failed to publish topic:', error)
  }
}

const openPreview = async () => {
  await flushAutosave()
  router.push(`/teacher/enotes/preview/${topicId.value}`)
}

const goBack = async () => {
  await flushAutosave()
  router.push('/teacher/enotes')
}

const getPageWordCount = (content: string): number => {
  if (!content) return 0
  return content.trim().split(/\s+/).filter(word => word.length > 0).length
}

const getReadingTime = (content: string): number => {
  const wordCount = getPageWordCount(content)
  return Math.ceil(wordCount / 200) // Average reading speed: 200 words per minute
}

const onDragStart = (index: number) => {
  draggedIndex.value = index
}

const onDragOver = () => {
  // Allow drop
}

const onDrop = async (dropIndex: number) => {
  if (draggedIndex.value === null || draggedIndex.value === dropIndex) return

  const dragIndex = draggedIndex.value
  const newPages = [...pages.value]
  const [draggedPage] = newPages.splice(dragIndex, 1)
  newPages.splice(dropIndex, 0, draggedPage)

  pages.value = newPages

  try {
    const pageOrders = newPages.map((page, idx) => ({
      id: page.id,
      order_number: idx + 1
    }))

    await axios.post(`${API_BASE}/teacher/enotes/topics/${topicId.value}/pages/reorder`, {
      pages: pageOrders
    })

    await loadTopic()
  } catch (error) {
    console.error('Failed to reorder pages:', error)
    await loadTopic()
  }

  draggedIndex.value = null
}

const onDragEnd = () => {
  draggedIndex.value = null
}

const onEditorReady = (editor: any) => {
  console.log('ENoteBuilder: CKEditor ready', editor)
}

const onEditorError = (error: any) => {
  console.error('ENoteBuilder: CKEditor error', error)
}

const movePageUp = async (index: number) => {
  if (index === 0) return

  const newPages = [...pages.value]
  const [page] = newPages.splice(index, 1)
  newPages.splice(index - 1, 0, page)
  pages.value = newPages

  try {
    const pageOrders = newPages.map((page, idx) => ({
      id: page.id,
      order_number: idx + 1
    }))

    await axios.post(`${API_BASE}/teacher/enotes/topics/${topicId.value}/pages/reorder`, {
      pages: pageOrders
    })

    await loadTopic()
  } catch (error) {
    console.error('Failed to move page up:', error)
    await loadTopic()
  }
}

const movePageDown = async (index: number) => {
  if (index === pages.value.length - 1) return

  const newPages = [...pages.value]
  const [page] = newPages.splice(index, 1)
  newPages.splice(index + 1, 0, page)
  pages.value = newPages

  try {
    const pageOrders = newPages.map((page, idx) => ({
      id: page.id,
      order_number: idx + 1
    }))

    await axios.post(`${API_BASE}/teacher/enotes/topics/${topicId.value}/pages/reorder`, {
      pages: pageOrders
    })

    await loadTopic()
  } catch (error) {
    console.error('Failed to move page down:', error)
    await loadTopic()
  }
}

onMounted(() => {
  console.log('ENoteBuilder mounted, topicId:', topicId.value)
  loadTopic()
})

onBeforeRouteLeave(async () => {
  await flushAutosave()
})

onUnmounted(() => {
  if (autosaveTimeout.value) {
    clearTimeout(autosaveTimeout.value)
  }
})
</script>
