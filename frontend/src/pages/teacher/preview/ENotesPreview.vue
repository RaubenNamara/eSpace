<template>
  <div>
    <PreviewBanner module-label="eNotes" />

    <div class="flex items-center gap-2 mb-6">
      <RouterLink to="/teacher/preview" class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        Back to Preview
      </RouterLink>
      <span v-if="activeSubjectId" class="text-gray-300 dark:text-gray-600">/</span>
      <button v-if="activeSubjectId" @click="activeSubjectId = null" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400">All Subjects</button>
    </div>

    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div v-for="i in 8" :key="i" class="animate-pulse">
        <div class="h-40 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>

    <template v-else-if="!activeSubjectId">
      <div v-if="subjectGroups.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <p class="text-gray-500 dark:text-gray-400">No published eNotes topics for this class yet.</p>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <button
          v-for="group in subjectGroups"
          :key="group.id"
          @click="activeSubjectId = group.id"
          class="text-left bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-6"
        >
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-sm bg-gradient-to-br from-amber-500 to-orange-600 mb-4">
            {{ subjectInitials(group) }}
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{{ group.name }}</h3>
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
            {{ group.topics.length }} {{ group.topics.length === 1 ? 'topic' : 'topics' }}
          </span>
        </button>
      </div>
    </template>

    <template v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <RouterLink
          v-for="topic in activeSubjectTopics"
          :key="topic.id"
          :to="`/teacher/preview/enotes/${route.params.classId}/topics/${topic.id}`"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all p-5"
        >
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-3">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">{{ topic.title }}</h3>
          <p v-if="topic.description" class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">{{ topic.description }}</p>
          <p class="text-xs text-gray-400 dark:text-gray-500">{{ topic.total_pages }} {{ topic.total_pages === 1 ? 'page' : 'pages' }}</p>
        </RouterLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PreviewBanner from '@/components/preview/PreviewBanner.vue'
import type { ENoteTopic } from '@/types/enotes'

interface SubjectGroup {
  id: number
  name: string
  code?: string
  topics: ENoteTopic[]
}

const route = useRoute()
const topics = ref<ENoteTopic[]>([])
const loading = ref(false)
const activeSubjectId = ref<number | null>(null)

const subjectInitials = (subj: { name: string; code?: string }) => {
  if (subj.code) return subj.code.slice(0, 3).toUpperCase()
  return subj.name.split(/\s+/).filter(Boolean).map(w => w[0]).join('').slice(0, 3).toUpperCase() || '?'
}

const subjectGroups = computed<SubjectGroup[]>(() => {
  const map = new Map<number, SubjectGroup>()
  topics.value.forEach(topic => {
    const sid = topic.subject_id || 0
    if (!map.has(sid)) map.set(sid, { id: sid, name: topic.subject_name || 'General', code: topic.subject_code, topics: [] })
    map.get(sid)!.topics.push(topic)
  })
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
})

const activeSubjectTopics = computed(() => subjectGroups.value.find(g => g.id === activeSubjectId.value)?.topics || [])

const loadTopics = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/teacher/enotes/preview', { params: { class_id: route.params.classId } })
    if (response.data.success) {
      topics.value = response.data.data.topics || []
    }
  } catch (error) {
    console.error('Failed to load eNotes preview:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadTopics()
})
</script>
