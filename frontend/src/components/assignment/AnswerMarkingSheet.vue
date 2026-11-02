<template>
  <!-- One student's answer to one question, opened with the marking tools (pen, ticks, crosses,
       highlighter, text) - the same canvas as marking a whole script, used by Mark by question.
       What is written saves by itself, as on the script view. -->
  <div class="answer-marking-sheet">
    <div v-if="loading" class="h-48 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
    <p v-else-if="error" class="rounded-lg bg-rose-50 dark:bg-rose-900/20 p-3 text-sm text-rose-700 dark:text-rose-200">{{ error }}</p>
    <TeacherMarkingCanvas
      v-else-if="question"
      :question="question"
      :assignment-id="Number(assignmentId)"
      :submission-id="submissionId"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import TeacherMarkingCanvas from './TeacherMarkingCanvas.vue'

const props = defineProps<{ assignmentId: number | string; submissionId: number; questionId: number }>()

const loading = ref(true)
const error = ref('')
const question = ref<any>(null)

onMounted(async () => {
  try {
    const res = await axios.get(`/api/teacher/assignments/${props.assignmentId}/submissions/${props.submissionId}/marking`)
    question.value = (res.data.data.questions || []).find((q: any) => Number(q.id) === props.questionId) || null
    if (!question.value) error.value = 'This answer could not be opened.'
  } catch (err: any) {
    error.value = err.response?.data?.message || 'This answer could not be opened.'
  } finally {
    loading.value = false
  }
})
</script>
