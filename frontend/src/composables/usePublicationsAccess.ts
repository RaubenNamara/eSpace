import { ref } from 'vue'
import axios from 'axios'

// Whether Publications shows for this user: A level students, and teachers in GP
// (PublicationController::access). Asked once per signed-in role and shared by the sidebar and
// the dashboard.
const allowed = ref(false)
let askedFor = ''

export function usePublicationsAccess() {
  const check = (role: string | null | undefined) => {
    const r = role === 'student' || role === 'teacher' ? role : ''
    if (r === askedFor) return
    askedFor = r
    allowed.value = false
    if (!r) return
    axios.get(`/api/${r}/publications/access`)
      .then(res => { if (askedFor === r) allowed.value = !!res.data?.data?.allowed })
      .catch(() => {})
  }
  return { allowed, check }
}
