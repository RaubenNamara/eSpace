<template>
  <!-- Marksheet: each learner's marks on one assessment, downloadable as Excel, with a class filter.
       The page header (title, search and filters top right) is part of AssessmentMarksheets. -->
  <div class="w-full">
    <AssessmentMarksheets />
  </div>
</template>

<script setup lang="ts">
import AssessmentMarksheets from './AssessmentMarksheets.vue'
</script>
