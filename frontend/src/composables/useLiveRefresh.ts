import { onMounted, onBeforeUnmount } from 'vue'

/**
 * Keeps a dashboard live: calls `refresh` every `intervalMs` while the tab is visible, and again
 * as soon as the student/teacher comes back to the tab (if it's been a while), so its counters
 * move up to the latest numbers without a page reload. Nothing runs while the tab is hidden.
 */
export function useLiveRefresh(refresh: () => unknown, intervalMs = 60_000) {
  let timer: ReturnType<typeof setInterval> | null = null
  let last = Date.now()

  const run = () => {
    last = Date.now()
    try {
      const result = refresh()
      if (result instanceof Promise) result.catch(() => {})
    } catch {
      // a refresh that fails just waits for the next one
    }
  }

  const tick = () => {
    if (document.visibilityState === 'visible') run()
  }

  const onVisibility = () => {
    if (document.visibilityState === 'visible' && Date.now() - last > intervalMs / 3) run()
  }

  onMounted(() => {
    timer = setInterval(tick, intervalMs)
    document.addEventListener('visibilitychange', onVisibility)
  })

  onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
    document.removeEventListener('visibilitychange', onVisibility)
  })
}
