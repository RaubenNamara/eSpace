import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

/**
 * "Full Screen Lab" state for a page. The page renders its lab wrapper as a fixed full-viewport
 * overlay while `labMaximized` is true (keep the same element, only change its classes, so the 3D
 * scene isn't torn down). The Fullscreen API additionally hides the browser's own chrome where
 * supported - not on iPhone, where the overlay alone is the maximised layout.
 */
export function useFullscreenLab() {
  const labMaximized = ref(false)

  async function enterMaximize() {
    labMaximized.value = true
    try {
      await document.documentElement.requestFullscreen?.({ navigationUI: 'hide' })
    } catch {
      // Refused or unsupported - the overlay still gives the maximised layout
    }
  }

  function exitMaximize() {
    labMaximized.value = false
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
  }

  function onFullscreenChange() {
    if (!document.fullscreenElement && labMaximized.value) labMaximized.value = false
  }
  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape' && labMaximized.value) exitMaximize()
  }

  watch(labMaximized, (on) => { document.body.style.overflow = on ? 'hidden' : '' })

  onMounted(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange)
    window.addEventListener('keydown', onKey)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('fullscreenchange', onFullscreenChange)
    window.removeEventListener('keydown', onKey)
    if (labMaximized.value) exitMaximize()
    document.body.style.overflow = ''
  })

  return { labMaximized, enterMaximize, exitMaximize }
}
