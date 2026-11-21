import { ref } from 'vue'
import axios from 'axios'

/**
 * Student Voice (the school's anonymous feedback polls) for learners: whether the school has it
 * switched on (Admin > Settings), and opening it in a new tab already signed in with their Tusome
 * account (a signed one-use link from /api/student/student-voice/link).
 */
const enabled = ref(false)
let checked = false

export function useStudentVoice() {
  const opening = ref(false)
  const problem = ref('')

  /** Asks once per page load (the answer is shared by every caller) */
  function check() {
    if (checked) return
    checked = true
    axios.get('/api/student/student-voice').then((r) => { enabled.value = !!r.data?.data?.enabled }).catch(() => { checked = false })
  }

  /**
   * Opens the tab straight away (so the browser doesn't treat it as a pop-up), then sends it to the
   * link once Tusome has made it. If the tab was blocked, this page goes there instead.
   */
  async function open() {
    problem.value = ''
    opening.value = true
    const tab = window.open('', '_blank')
    try {
      const r = await axios.post('/api/student/student-voice/link')
      const url = r.data?.data?.url as string
      if (tab) tab.location.href = url
      else window.location.href = url
    } catch (e: any) {
      tab?.close()
      problem.value = e?.response?.data?.message || 'Could not open Student Voice. Try again.'
      window.alert(problem.value)
    } finally {
      opening.value = false
    }
  }

  return { enabled, opening, problem, check, open }
}
