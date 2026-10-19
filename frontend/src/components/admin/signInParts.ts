/**
 * Shared pieces of the sign-in lists (admin dashboard StaffActivity.vue and the Student sign-ins
 * page): the person shape the API returns, how times and names are written, and the small row
 * pieces (avatar with online dot, "Online now" / "Last seen", the device).
 */
import { ref, h, defineComponent, type PropType } from 'vue'

export interface SignInPerson {
  id: number; name: string; username: string; profile_photo: string | null
  /** staff: department; students: class and stream */
  department: string | null
  admission_number?: string | null
  logins: number; last_login_at: string; last_active_at: string | null; online: boolean
  /** the latest sign-in's device: "Chrome 129 on Windows 11", and its parts */
  device: string | null; browser?: string | null; os?: string | null; device_type?: string | null; device_model?: string | null
  ip_address: string | null
}

export const PERIODS = [{ days: 1, label: 'Today' }, { days: 7, label: '7 days' }, { days: 30, label: '30 days' }]

/** "today" / "during the last 7 days" (reads after "signed in" and "no recorded work") */
export const periodPhrase = (days: number) => (days === 1 ? 'today' : `during the last ${days} days`)

/** the clock the relative times are measured from; call tickNow() to refresh them */
export const now = ref(Date.now())
export const tickNow = () => { now.value = Date.now() }

/** "5 min ago", "today 14:05", "yesterday 09:12", "Mon 3 Oct 11:40" */
export function when(at: string | null) {
  if (!at) return 'never'
  const t = new Date(at.replace(' ', 'T')).getTime()
  const diff = Math.max(0, (now.value - t) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  const d = new Date(t)
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const today = new Date(now.value); today.setHours(0, 0, 0, 0)
  const day = new Date(d); day.setHours(0, 0, 0, 0)
  const daysAgo = Math.round((today.getTime() - day.getTime()) / 86400000)
  if (daysAgo === 0) return `today ${time}`
  if (daysAgo === 1) return `yesterday ${time}`
  return `${d.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })} ${time}`
}

export const signIns = (n: number) => `${n} sign-in${n === 1 ? '' : 's'}`

/**
 * Names as they are normally written: "KAKOOZA REAGAN" -> "Kakooza Reagan". Names already in
 * mixed case are left alone (the person may have typed "McDonald" or "de Souza" on purpose).
 */
export function properName(name: string) {
  if (!name || name !== name.toUpperCase() && name !== name.toLowerCase()) return name
  return name.toLowerCase().replace(/(^|[\s\-'’.])(\p{L})/gu, (_, sep: string, c: string) => sep + c.toUpperCase())
}

export const Avatar = defineComponent({
  props: { person: { type: Object as PropType<SignInPerson>, required: true } },
  setup(p) {
    return () => h('span', { class: 'relative flex-shrink-0' }, [
      p.person.profile_photo
        ? h('img', { src: p.person.profile_photo, alt: '', class: 'w-9 h-9 rounded-full object-cover' })
        : h('span', { class: 'w-9 h-9 rounded-full flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 text-xs font-bold' },
          p.person.name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase()),
      h('span', {
        class: ['absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-white dark:ring-gray-800', p.person.online ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'],
        title: p.person.online ? 'Online now' : 'Offline',
      }),
    ])
  },
})

export const StatusText = defineComponent({
  props: { person: { type: Object as PropType<SignInPerson>, required: true } },
  setup(p) {
    return () => p.person.online
      ? h('span', { class: 'font-semibold text-emerald-600 dark:text-emerald-400' }, 'Online now')
      : h('span', { title: `Last signed in ${when(p.person.last_login_at)}` }, `Last seen ${when(p.person.last_active_at ?? p.person.last_login_at)}`)
  },
})

const DEVICE_ICON: Record<string, string> = { computer: '💻', phone: '📱', tablet: '📱' }
export const DeviceText = defineComponent({
  props: { person: { type: Object as PropType<SignInPerson>, required: true } },
  setup(p) {
    return () => h('span', { title: [p.person.device, p.person.ip_address ? `IP ${p.person.ip_address}` : ''].filter(Boolean).join(' · ') }, [
      p.person.device_type ? h('span', { 'aria-hidden': 'true' }, `${DEVICE_ICON[p.person.device_type] ?? ''} `) : null,
      p.person.device,
    ])
  },
})

/** one student: name and class, when last seen with how many sign-ins, the device */
export const StudentRow = defineComponent({
  props: { person: { type: Object as PropType<SignInPerson>, required: true } },
  setup(p) {
    return () => h('li', { class: 'flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-700/60 min-w-0' }, [
      h(Avatar, { person: p.person }),
      h('span', { class: 'min-w-0 flex-1' }, [
        h('span', { class: 'flex items-center gap-1.5 min-w-0' }, [
          h('span', { class: 'font-semibold text-sm text-gray-900 dark:text-white truncate' }, properName(p.person.name)),
          p.person.department ? h('span', { class: 'flex-shrink-0 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[10px] font-semibold text-gray-600 dark:text-gray-300' }, p.person.department) : null,
        ]),
        h('span', { class: 'block text-xs text-gray-500 dark:text-gray-400 truncate' }, [h(StatusText, { person: p.person }), ` · ${signIns(p.person.logins)}`]),
        p.person.device ? h('span', { class: 'block text-xs text-gray-500 dark:text-gray-400 truncate' }, [h(DeviceText, { person: p.person })]) : null,
      ]),
    ])
  },
})
