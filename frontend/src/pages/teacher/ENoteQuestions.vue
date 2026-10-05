<template>
  <!-- Questions students asked on your eNote topics that are still waiting for an answer.
       Open one to answer it (or mark a classmate's answer as the best). -->
  <div class="w-full max-w-4xl">
    <PageHeader title="Student questions" description="Questions on your eNotes that are waiting for an answer - answer them, or mark a classmate's answer as the best." icon="chat" accent="indigo" />

    <Skeleton v-if="loading" variant="list" :count="3" />
    <EmptyState v-else-if="!questions.length" icon="check-circle" tone="emerald" title="All caught up" message="No question on your eNotes is waiting for an answer. Students ask from the Questions button while they read." />

    <ul v-else class="space-y-2.5">
      <li v-for="q in questions" :key="q.id">
        <button type="button" class="w-full text-left rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-indigo-300 dark:hover:border-indigo-600 transition" @click="openTopic(q)">
          <p class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 truncate">{{ q.topic_title }}</p>
          <p class="mt-1 text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{{ q.body }}</p>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ q.author }} · {{ timeAgo(q.created_at) }}</p>
        </button>
      </li>
    </ul>

    <TopicQuestions v-if="topicId" :open="open" :topic-id="topicId" role="teacher" @close="close" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import TopicQuestions from '@/components/enotes/TopicQuestions.vue'
import { timeAgo } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'

interface Waiting { id: number; body: string; created_at: string; topic_id: number; topic_title: string; author: string }

const toast = useToastStore()
const questions = ref<Waiting[]>([])
const loading = ref(true)
const topicId = ref(0)
const open = ref(false)

const load = async () => {
  try {
    const res = await axios.get('/api/teacher/enote-questions')
    questions.value = res.data.data.questions || []
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load the questions')
  } finally {
    loading.value = false
  }
}
const openTopic = (q: Waiting) => { topicId.value = q.topic_id; open.value = true }
const close = () => { open.value = false; load() }

onMounted(load)
</script>
