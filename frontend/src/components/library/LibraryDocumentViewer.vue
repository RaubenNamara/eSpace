<template>
  <LibraryPdfViewer v-if="book.file_type === 'pdf'" :book="book" :start-in-read-mode="startInReadMode" :student-view="studentView" @close="$emit('close')" />
  <!-- A PowerPoint with its PDF copy (made when it was uploaded) opens in the same book as a PDF -->
  <LibraryPdfViewer v-else-if="readerBook" :book="readerBook" :start-in-read-mode="startInReadMode" :student-view="studentView" @close="$emit('close')" />
  <LibraryOfficeViewer v-else-if="checked" :book="book" @close="$emit('close')" />
  <div v-else class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
    <p class="text-white/80 text-sm">Loading book…</p>
  </div>
</template>

<script setup lang="ts">
// Thin type-routing wrapper so every eLibrary preview entry point (student, teacher, teacher's
// own "preview as student", HOD, admin) picks the right viewer without duplicating the branch.
// PDFs open in LibraryPdfViewer (the book). PPT/PPTX open there too when the server made their
// PDF copy (utils/libraryReader); without one they fall back to LibraryOfficeViewer
// (Microsoft's slide viewer).
import { onMounted, ref } from 'vue'
import type { LibraryBook } from '@/types/library'
import { resolveAssetUrl } from '@/utils/url'
import { readerPdfPath } from '@/utils/libraryReader'
import LibraryPdfViewer from './LibraryPdfViewer.vue'
import LibraryOfficeViewer from './LibraryOfficeViewer.vue'

const props = defineProps<{ book: LibraryBook; startInReadMode?: boolean; studentView?: boolean }>()
defineEmits(['close'])

const readerBook = ref<LibraryBook | null>(null)
const checked = ref(false)

onMounted(async () => {
  if (props.book.file_type === 'pdf') return
  const readerPath = readerPdfPath(props.book)
  if (readerPath) {
    try {
      const res = await fetch(resolveAssetUrl(readerPath), { method: 'HEAD', credentials: 'same-origin' })
      if (res.ok && (res.headers.get('content-type') || '').includes('pdf')) {
        readerBook.value = { ...props.book, file_path: readerPath }
      }
    } catch {
      // no copy reachable: the slide viewer it is
    }
  }
  checked.value = true
})
</script>
