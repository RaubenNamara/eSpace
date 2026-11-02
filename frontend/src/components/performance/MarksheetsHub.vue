<template>
  <!-- Marksheet: each learner's marks on one assessment, downloadable as Excel, with a class filter -->
  <div class="w-full">
    <PageHeader title="Marksheets" :description="description" icon="clipboard" accent="emerald" />
    <AssessmentMarksheets />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import AssessmentMarksheets from './AssessmentMarksheets.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const description = computed(() => auth.userRole === 'teacher'
  ? 'The marks of every learner on each of your assessments - open one and download it as Excel.'
  : auth.userRole === 'hod'
    ? "Every assessment in your department, with each learner's marks - open one and download it as Excel."
    : "Every department's assessments, with each learner's marks - open one and download it as Excel.")
</script>
