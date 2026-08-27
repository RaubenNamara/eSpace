<template>
  <LibraryPdfViewer v-if="book.file_type === 'pdf'" :book="book" @close="$emit('close')" />
  <LibraryOfficeViewer v-else :book="book" @close="$emit('close')" />
</template>

<script setup lang="ts">
// Thin type-routing wrapper so every eLibrary preview entry point (student, teacher, teacher's
// own "preview as student", HOD, admin) picks the right viewer without duplicating the branch -
// LibraryPdfViewer (pdf.js) is untouched/reused as-is; PPT/PPTX go to LibraryOfficeViewer.
import type { LibraryBook } from '@/types/library'
import LibraryPdfViewer from './LibraryPdfViewer.vue'
import LibraryOfficeViewer from './LibraryOfficeViewer.vue'

defineProps<{ book: LibraryBook }>()
defineEmits(['close'])
</script>
