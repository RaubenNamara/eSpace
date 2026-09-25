<template>
  <LibraryPdfViewer :book="book" :notes-base="`/student/itembank/${resource.id}`" @close="$emit('close')" />
</template>

<script setup lang="ts">
// Item Bank PDFs open in the same reader as eLibrary books - flip from the page edges, contents
// linked to pages, pages loaded nearest-first, bundle flips for far jumps - so the two read alike.
// A student's page notes are kept in the Item Bank's own notes store (notes-base).
import { computed } from 'vue'
import LibraryPdfViewer from '@/components/library/LibraryPdfViewer.vue'
import type { ItemBankResource } from '@/types/itembank'
import type { LibraryBook } from '@/types/library'

const props = defineProps<{ resource: ItemBankResource }>()
defineEmits(['close'])

const book = computed<LibraryBook>(() => ({
  ...props.resource,
  total_pages: props.resource.total_pages ?? null,
  allow_download: false
}))
</script>
