<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Interactive eNotes</h1>
    
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center space-x-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search notes..."
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
        <select
          v-model="selectedSubjectId"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Subjects</option>
          <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
        </select>
        <select
          v-model="isPublishedFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Status</option>
          <option value="1">Published</option>
          <option value="0">Draft</option>
        </select>
      </div>
      <button
        @click="openNoteModal()"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Create Note</span>
      </button>
    </div>

    <!-- Notes Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="note in filteredNotes"
        :key="note.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all cursor-pointer group"
        @click="openNoteViewer(note)"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-3">
            <span class="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              {{ note.subject_name || 'Unknown Subject' }}
            </span>
            <div class="flex items-center space-x-2">
              <span
                :class="[
                  'px-2 py-1 text-xs rounded-full',
                  note.is_published
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                ]"
              >
                {{ note.is_published ? 'Published' : 'Draft' }}
              </span>
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {{ note.title }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4" v-html="stripHtml(note.content)"></p>
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{{ formatDate(note.created_at) }}</span>
            <div class="flex items-center space-x-2">
              <button
                @click.stop="openNoteModal(note)"
                class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                title="Edit"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              <button
                @click.stop="deleteNote(note.id)"
                class="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors text-red-600"
                title="Delete"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredNotes.length === 0 && !loading" class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p class="text-gray-500 dark:text-gray-400 mb-4">No notes found. Create your first interactive note!</p>
      <button
        @click="openNoteModal()"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Create Your First Note
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="text-gray-500 dark:text-gray-400 mt-4">Loading notes...</p>
    </div>

    <!-- Note Editor Modal -->
    <div v-if="showNoteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ editingNote ? 'Edit Note' : 'Create New Note' }}
          </h3>
          <button
            @click="closeNoteModal"
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-6">
          <form @submit.prevent="saveNote">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                <input
                  v-model="noteForm.title"
                  type="text"
                  required
                  placeholder="Enter note title..."
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                <select
                  v-model="noteForm.subject_id"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Subject</option>
                  <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Topic</label>
                <select
                  v-model="noteForm.topic_id"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  @change="loadSubtopics"
                >
                  <option value="">Select Topic (Optional)</option>
                  <option v-for="topic in topics" :key="topic.id" :value="topic.id">{{ topic.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subtopic</label>
                <select
                  v-model="noteForm.subtopic_id"
                  :disabled="!noteForm.topic_id"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                >
                  <option value="">Select Subtopic (Optional)</option>
                  <option v-for="subtopic in subtopics" :key="subtopic.id" :value="subtopic.id">{{ subtopic.name }}</option>
                </select>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content *</label>
              <textarea
                v-model="noteForm.content"
                rows="10"
                required
                placeholder="Write your note content here..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>
            <div class="flex items-center space-x-4 mb-4">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="noteForm.is_published"
                  type="checkbox"
                  class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                >
                <span class="text-sm text-gray-700 dark:text-gray-300">Publish immediately</span>
              </label>
            </div>
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="closeNoteModal"
                class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <svg v-if="saving" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ saving ? 'Saving...' : (editingNote ? 'Update Note' : 'Create Note') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Note Viewer Modal -->
    <NoteViewer
      v-if="showNoteViewer"
      :note="currentNote"
      :all-notes="filteredNotes"
      @close="closeNoteViewer"
      @edit="openNoteModal"
      @next="navigateNext"
      @previous="navigatePrevious"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import NoteViewer from '@/components/teacher/NoteViewer.vue'

interface Note {
  id: number
  title: string
  subject_id: number
  subject_name?: string
  content: string
  topic_id?: number
  subtopic_id?: number
  is_published: boolean
  created_at: string
}

interface Subject {
  id: number
  name: string
  code: string
}

interface Topic {
  id: number
  name: string
  code: string
}

interface Subtopic {
  id: number
  name: string
}

const notes = ref<Note[]>([])
const subjects = ref<Subject[]>([])
const topics = ref<Topic[]>([])
const subtopics = ref<Subtopic[]>([])
const searchQuery = ref('')
const selectedSubjectId = ref('')
const isPublishedFilter = ref('')
const showNoteModal = ref(false)
const showNoteViewer = ref(false)
const currentNote = ref<Note | null>(null)
const editingNote = ref<Note | null>(null)
const loading = ref(false)
const saving = ref(false)
const noteForm = ref({
  title: '',
  subject_id: '',
  topic_id: '',
  subtopic_id: '',
  content: '',
  is_published: false
})

const API_BASE = '/api'

const filteredNotes = computed(() => {
  return notes.value.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesSubject = !selectedSubjectId.value || note.subject_id === parseInt(selectedSubjectId.value)
    const matchesPublished = isPublishedFilter.value === '' || 
                           note.is_published === (isPublishedFilter.value === '1')
    return matchesSearch && matchesSubject && matchesPublished
  })
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const stripHtml = (html: string) => {
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

const loadNotes = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_BASE}/teacher/notes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.data.success) {
      notes.value = response.data.data.notes
    }
  } catch (error) {
    console.error('Failed to load notes:', error)
  } finally {
    loading.value = false
  }
}

const loadSubjects = async () => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/notes/subjects`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.data.success) {
      subjects.value = response.data.data.subjects
    }
  } catch (error) {
    console.error('Failed to load subjects:', error)
  }
}

const loadTopics = async () => {
  if (!noteForm.value.subject_id) {
    topics.value = []
    return
  }
  try {
    const response = await axios.get(`${API_BASE}/teacher/notes/topics/${noteForm.value.subject_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.data.success) {
      topics.value = response.data.data.topics
    }
  } catch (error) {
    console.error('Failed to load topics:', error)
  }
}

const loadSubtopics = async () => {
  if (!noteForm.value.topic_id) {
    subtopics.value = []
    return
  }
  try {
    const response = await axios.get(`${API_BASE}/teacher/notes/subtopics/${noteForm.value.topic_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.data.success) {
      subtopics.value = response.data.data.subtopics
    }
  } catch (error) {
    console.error('Failed to load subtopics:', error)
  }
}

const openNoteModal = (note?: Note) => {
  console.log('Opening note modal', note)
  editingNote.value = note || null
  if (note) {
    noteForm.value = {
      title: note.title,
      subject_id: note.subject_id.toString(),
      topic_id: note.topic_id?.toString() || '',
      subtopic_id: note.subtopic_id?.toString() || '',
      content: note.content,
      is_published: note.is_published
    }
    if (note.topic_id) {
      loadTopics()
    }
    if (note.subtopic_id) {
      loadSubtopics()
    }
  } else {
    noteForm.value = {
      title: '',
      subject_id: '',
      topic_id: '',
      subtopic_id: '',
      content: '',
      is_published: false
    }
  }
  showNoteModal.value = true
  console.log('showNoteModal set to true', showNoteModal.value)
}

const closeNoteModal = () => {
  showNoteModal.value = false
  editingNote.value = null
  noteForm.value = {
    title: '',
    subject_id: '',
    topic_id: '',
    subtopic_id: '',
    content: '',
    is_published: false
  }
  topics.value = []
  subtopics.value = []
}

const saveNote = async () => {
  saving.value = true
  try {
    const payload = {
      title: noteForm.value.title,
      subject_id: parseInt(noteForm.value.subject_id),
      topic_id: noteForm.value.topic_id ? parseInt(noteForm.value.topic_id) : null,
      subtopic_id: noteForm.value.subtopic_id ? parseInt(noteForm.value.subtopic_id) : null,
      content: noteForm.value.content,
      is_published: noteForm.value.is_published ? 1 : 0
    }

    let response
    if (editingNote.value) {
      response = await axios.put(`${API_BASE}/teacher/notes/${editingNote.value.id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    } else {
      response = await axios.post(`${API_BASE}/teacher/notes`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    }

    if (response.data.success) {
      closeNoteModal()
      loadNotes()
    }
  } catch (error) {
    console.error('Failed to save note:', error)
  } finally {
    saving.value = false
  }
}

const deleteNote = async (id: number) => {
  if (!confirm('Are you sure you want to delete this note?')) return
  
  try {
    await axios.delete(`${API_BASE}/teacher/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    loadNotes()
  } catch (error) {
    console.error('Failed to delete note:', error)
  }
}

const openNoteViewer = (note: Note) => {
  currentNote.value = note
  showNoteViewer.value = true
}

const closeNoteViewer = () => {
  showNoteViewer.value = false
  currentNote.value = null
}

const navigateNext = () => {
  if (!currentNote.value) return
  const currentIndex = filteredNotes.value.findIndex(n => n.id === currentNote.value!.id)
  if (currentIndex < filteredNotes.value.length - 1) {
    currentNote.value = filteredNotes.value[currentIndex + 1]
  }
}

const navigatePrevious = () => {
  if (!currentNote.value) return
  const currentIndex = filteredNotes.value.findIndex(n => n.id === currentNote.value!.id)
  if (currentIndex > 0) {
    currentNote.value = filteredNotes.value[currentIndex - 1]
  }
}

onMounted(() => {
  loadNotes()
  loadSubjects()
})
</script>
