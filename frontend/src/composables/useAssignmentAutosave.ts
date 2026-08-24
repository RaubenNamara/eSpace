import { ref } from 'vue'
import axios from 'axios'

export type AutosaveStatus = 'idle' | 'unsaved' | 'saving' | 'saved' | 'failed' | 'locked'

const STATUS_LABEL: Record<AutosaveStatus, string> = {
  idle: 'Ready to save',
  unsaved: 'Unsaved changes',
  saving: 'Saving…',
  saved: 'Saved',
  failed: 'Save failed',
  locked: 'This attempt is already submitted - not saved'
}

interface UseAssignmentAutosaveOptions {
  debounceMs?: number
  onLocked?: () => void
}

/**
 * Generalizes the debounced-save-with-status pattern that was hand-rolled independently in
 * StudentAnswerCanvas.vue, FreeResponseAnswer.vue, QuestionEditor.vue, and TeacherMarkingCanvas.vue
 * (each with its own saveTimeout/saveStatus ref pair). New call sites should use this instead of
 * re-implementing the debounce; existing call sites can be migrated to it incrementally without
 * behavior change, since the status string values match what they already display.
 */
export function useAssignmentAutosave(options: UseAssignmentAutosaveOptions = {}) {
  const debounceMs = options.debounceMs ?? 1500
  const status = ref<AutosaveStatus>('idle')
  const statusLabel = ref(STATUS_LABEL.idle)
  let timeout: number | null = null

  function setStatus(next: AutosaveStatus) {
    status.value = next
    statusLabel.value = STATUS_LABEL[next]
  }

  /**
   * Marks the state dirty and schedules `save` to run after the debounce window. Calling this
   * again before the window elapses resets the timer (never spams the API on every keystroke or
   * mouse movement).
   */
  function schedule(save: () => Promise<void>) {
    setStatus('unsaved')
    if (timeout) clearTimeout(timeout)
    timeout = window.setTimeout(async () => {
      setStatus('saving')
      try {
        await save()
        setStatus('saved')
      } catch (err: any) {
        if (err?.response?.status === 403) {
          setStatus('locked')
          options.onLocked?.()
        } else {
          setStatus('failed')
        }
      }
    }, debounceMs)
  }

  /** Fire-and-debounce a plain axios POST/PUT call - the common case of `schedule`. */
  function scheduleRequest(method: 'post' | 'put', url: string, data: Record<string, any>) {
    schedule(() => axios[method](url, data))
  }

  return { status, statusLabel, schedule, scheduleRequest, setStatus }
}
