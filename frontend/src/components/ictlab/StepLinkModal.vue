<template>
  <!-- A teacher linking one step of an ICT Lab activity to one of their own eNotes - the whole
       topic, or a single page of it. Students on that step then get "Read about this". -->
  <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col">
      <div class="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-start gap-3">
        <div class="flex-1 min-w-0">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Link to my notes</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 truncate">Step: {{ stepTitle }}</p>
        </div>
        <button type="button" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close" @click="emit('close')">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div class="p-5 space-y-4 overflow-y-auto">
        <div>
          <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">eNote topic</label>
          <select v-model.number="topicId" class="w-full py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white" :disabled="loading">
            <option :value="0">{{ loading ? 'Loading your eNotes…' : topics.length ? 'Choose one of your eNotes' : 'You have no eNotes yet' }}</option>
            <option v-for="t in topics" :key="t.id" :value="t.id">{{ t.title }}{{ t.subject_name ? ` · ${t.subject_name}` : '' }}{{ t.status !== 'published' ? ' (draft)' : '' }}</option>
          </select>
        </div>
        <div v-if="topicId">
          <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Page</label>
          <select v-model.number="pageId" class="w-full py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white" :disabled="pagesLoading">
            <option :value="0">The whole topic (from page 1)</option>
            <option v-for="(p, i) in pages" :key="p.id" :value="p.id">Page {{ i + 1 }}{{ p.title ? ` - ${p.title}` : '' }}</option>
          </select>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400">Students see "Read about this" on this step - at every level - when they can read the eNote you choose.</p>
      </div>

      <div class="px-5 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
        <button v-if="current" type="button" class="text-sm font-semibold text-rose-600 dark:text-rose-300 hover:underline" :disabled="saving" @click="remove">Remove link</button>
        <div class="flex-1"></div>
        <button type="button" class="btn-secondary" @click="emit('close')">Cancel</button>
        <button type="button" class="btn-primary" :disabled="!topicId || saving" @click="save">{{ saving ? 'Saving…' : 'Link' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { useToastStore } from '@/stores/toast'
import type { IctLink } from './types'

const props = defineProps<{
  activityKey: string
  stepKey: string
  stepTitle: string
  current: IctLink | null
}>()
const emit = defineEmits<{ close: []; saved: [link: IctLink | null] }>()
const toast = useToastStore()

interface Topic { id: number; title: string; subject_name?: string; status: string }
const topics = ref<Topic[]>([])
const loading = ref(true)
const topicId = ref(props.current?.enote_topic_id || 0)
const pageId = ref(props.current?.enote_page_id || 0)
const pages = ref<{ id: number; title: string | null }[]>([])
const pagesLoading = ref(false)
const saving = ref(false)

onMounted(async () => {
  try {
    const res = await axios.get('/api/teacher/enotes/topics', { params: { limit: 200 } })
    topics.value = res.data.data.topics || []
  } catch {
    toast.error('Could not load your eNotes')
  } finally {
    loading.value = false
  }
  if (topicId.value) loadPages(topicId.value, true)
})

const loadPages = async (id: number, keepPage = false) => {
  pages.value = []
  if (!keepPage) pageId.value = 0
  if (!id) return
  pagesLoading.value = true
  try {
    const res = await axios.get(`/api/teacher/enotes/topics/${id}`)
    pages.value = (res.data.data.pages || []).filter((p: any) => p.is_active === undefined || Number(p.is_active) === 1)
  } catch {
    toast.error('Could not load the pages')
  } finally {
    pagesLoading.value = false
  }
}
watch(topicId, id => loadPages(id))

const save = async () => {
  saving.value = true
  try {
    const res = await axios.put('/api/teacher/ict-lab/links', {
      activity_key: props.activityKey,
      step_key: props.stepKey,
      enote_topic_id: topicId.value,
      enote_page_id: pageId.value || null
    })
    toast.success('Step linked to your notes')
    emit('saved', res.data.data.link)
  } catch (e: any) {
    const errors = e.response?.data?.errors
    toast.error((errors && Object.values(errors)[0]) || e.response?.data?.message || 'Could not link the step')
  } finally {
    saving.value = false
  }
}

const remove = async () => {
  saving.value = true
  try {
    await axios.delete(`/api/teacher/ict-lab/links/${props.activityKey}/${props.stepKey}`)
    toast.success('Link removed')
    emit('saved', null)
  } catch {
    toast.error('Could not remove the link')
  } finally {
    saving.value = false
  }
}
</script>
