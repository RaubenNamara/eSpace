import { ref } from 'vue'
import axios from 'axios'

// Whether Report card(s) shows in the menu: the super admin chooses whether students and teachers
// may see report cards (Reports page, "Who can see report cards"). Asked once per signed-in role.
const allowed = ref(false)
let askedFor = ''

export function useReportCardAccess() {
  const check = (role: string | null | undefined) => {
    const r = role === 'student' || role === 'teacher' ? role : ''
    if (r === askedFor) return
    askedFor = r
    allowed.value = false
    if (!r) return
    axios.get(`/api/${r}/report-cards/access`)
      .then(res => { if (askedFor === r) allowed.value = !!res.data?.data?.allowed })
      .catch(() => {})
  }
  return { allowed, check }
}
