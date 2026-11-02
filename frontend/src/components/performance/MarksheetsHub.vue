<template>
  <!-- Marksheet: by assessment (each learner's marks on one assessment, downloadable as Excel) or
       the class-and-subject sheet (every assessment of a class side by side) -->
  <div class="w-full">
    <div v-if="view === 'assessment'">
      <PageHeader title="Marksheets" :description="description" icon="clipboard" accent="emerald" />
    </div>
    <nav class="mb-4 inline-flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800" aria-label="Marksheet view">
      <button
        v-for="t in TABS"
        :key="t.key"
        type="button"
        class="px-3.5 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap"
        :class="view === t.key ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'"
        :aria-pressed="view === t.key"
        @click="setView(t.key)"
      >{{ t.label }}</button>
    </nav>
    <AssessmentMarksheets v-if="view === 'assessment'" />
    <MarksheetPage v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHeader from '@/components/ui/PageHeader.vue'
import AssessmentMarksheets from './AssessmentMarksheets.vue'
import MarksheetPage from './MarksheetPage.vue'
import { useAuthStore } from '@/stores/auth'

const TABS = [
  { key: 'assessment' as const, label: 'By assessment' },
  { key: 'class' as const, label: 'By class & subject' }
]
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const view = computed(() => (route.query.view === 'class' ? 'class' : 'assessment'))
const setView = (v: 'assessment' | 'class') => router.push({ query: v === 'class' ? { view: 'class' } : {} })
const description = computed(() => auth.userRole === 'teacher'
  ? 'The marks of every learner on each of your assessments - open one and download it as Excel.'
  : auth.userRole === 'hod'
    ? "Every assessment in your department, with each learner's marks - open one and download it as Excel."
    : "Every department's assessments, with each learner's marks - open one and download it as Excel.")
</script>
