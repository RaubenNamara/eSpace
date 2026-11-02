import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue'
import axios from 'axios'

/**
 * Reports a student's reading of an eLibrary book: the page they're on (shortly after it settles)
 * and a minute of reading for every minute the reader is open, on screen and in use. Feeds the
 * "Your reading" stats on the eLibrary shelf and the teacher's who-has-read-it view.
 */
export function useLibraryReadingTracker(opts: {
  bookId: () => number
  enabled: () => boolean
  page?: Ref<number>
  totalPages?: Ref<number>
}) {
  const url = () => `/api/student/library/${opts.bookId()}/progress`
  let lastActive = Date.now()
  let timer: ReturnType<typeof setInterval> | null = null
  let pageTimer: ReturnType<typeof setTimeout> | null = null

  const send = (body: Record<string, number>) => {
    if (!opts.enabled() || !opts.bookId()) return
    axios.post(url(), body).catch(() => { /* best effort, like the eNotes tracking */ })
  }
  const pageBody = (): Record<string, number> => (opts.page?.value ? { page: opts.page.value, total_pages: opts.totalPages?.value || 0 } : {})

  const markActive = () => { lastActive = Date.now() }
  const ACTIVITY = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const

  onMounted(() => {
    // Opened: counts as started straight away
    send({})
    ACTIVITY.forEach(e => window.addEventListener(e, markActive, { passive: true, capture: true }))
    // Only a minute when the page is on screen and someone touched it in the last two minutes
    timer = setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - lastActive < 120000) send({ minutes: 1, ...pageBody() })
    }, 60000)
  })

  if (opts.page) {
    // A page turned, or the book's page count just became known
    watch([opts.page, () => opts.totalPages?.value], () => {
      if (pageTimer) clearTimeout(pageTimer)
      pageTimer = setTimeout(() => send(pageBody()), 1500)
    })
  }

  onBeforeUnmount(() => {
    ACTIVITY.forEach(e => window.removeEventListener(e, markActive, { capture: true }))
    if (timer) clearInterval(timer)
    if (pageTimer) { clearTimeout(pageTimer); send(pageBody()) }
  })
}
