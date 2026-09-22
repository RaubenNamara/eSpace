import { defineStore } from 'pinia'
import { ref } from 'vue'

// Read Mode (ENotePreview.vue, LibraryPdfViewer.vue) hides the reader's own chrome and asks for
// real fullscreen, but the app shell's own sidebar/header (MainLayout.vue) is a separate,
// unrelated component - it has no way to know Read Mode is active unless something tells it.
// This is that something: a single shared boolean, set/cleared by whichever reader enters or
// exits Read Mode, watched by MainLayout to hide its own chrome for as long as it's true.
export const useReadModeStore = defineStore('readMode', () => {
  const isActive = ref(false)

  function enter() {
    isActive.value = true
  }

  function exit() {
    isActive.value = false
  }

  return { isActive, enter, exit }
})
