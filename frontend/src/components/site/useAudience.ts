import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * Who the public site is talking to: a school (the default - leaders, HODs, admins), a teacher or
 * a student. The landing page tells that person's side of Tusome; the header switch changes it.
 *
 * One value for the whole site, remembered in this browser, and shareable as /?for=student.
 * A link with ?for= wins over what was remembered.
 */
export type Audience = 'school' | 'teacher' | 'student'

export const AUDIENCES: { key: Audience; label: string }[] = [
  { key: 'school', label: 'School' },
  { key: 'teacher', label: 'Teacher' },
  { key: 'student', label: 'Student' }
]

const KEY = 'tusome-site-audience'
const isAudience = (v: unknown): v is Audience => v === 'school' || v === 'teacher' || v === 'student'

const remembered = (): Audience => {
  try {
    const v = localStorage.getItem(KEY)
    return isAudience(v) ? v : 'school'
  } catch {
    return 'school'
  }
}

const audience = ref<Audience>(typeof window !== 'undefined' ? remembered() : 'school')

export function useAudience() {
  const route = useRoute()
  const router = useRouter()

  /** Take ?for= from the link, if there is one */
  const fromLink = () => {
    const q = route.query.for
    if (isAudience(q)) audience.value = q
  }

  /** Switch - on the landing page in place (back to the top), from any other page to the landing page */
  const setAudience = (a: Audience) => {
    audience.value = a
    try {
      localStorage.setItem(KEY, a)
    } catch {
      // Not remembered - the page still switches
    }
    const query = a === 'school' ? {} : { for: a }
    if (route.path === '/') {
      router.replace({ path: '/', query })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.push({ path: '/', query })
    }
  }

  return { audience, setAudience, fromLink }
}
