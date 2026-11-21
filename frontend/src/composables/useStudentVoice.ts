import { ref } from 'vue'
import axios from 'axios'

/**
 * Student Voice (the school's anonymous feedback polls) for learners: whether the school has it
 * switched on (Admin > Settings), and opening it in this tab already signed in with their Tusome
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
   * Goes to Student Voice in this same tab (no second tab left signed in on a shared computer).
   * When the learner finishes there, Student Voice sends them to /signout here, so they end up
   * signed out of both and the next learner signs in.
   */
  async function open() {
    problem.value = ''
    opening.value = true
    try {
      const r = await axios.post('/api/student/student-voice/link')
      window.location.href = r.data?.data?.url as string
    } catch (e: any) {
      problem.value = e?.response?.data?.message || 'Could not open Student Voice. Try again.'
      window.alert(problem.value)
    } finally {
      opening.value = false
    }
  }

  return { enabled, opening, problem, check, open }
}
