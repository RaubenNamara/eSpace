// Friendly times for the teacher dashboard: "2 days ago", "Today · 2:00 PM", "Thu 3 Oct"

const toDate = (s: string) => new Date(s.replace(' ', 'T'))

export function timeAgo(s: string | null | undefined): string {
  if (!s) return ''
  const diff = (Date.now() - toDate(s).getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} h ago`
  const days = Math.floor(diff / 86400)
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  return toDate(s).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}

export function dayLabel(s: string): string {
  const d = toDate(s)
  const today = new Date()
  const tomorrow = new Date(Date.now() + 86400000)
  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
  return d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' })
}

export function clock(s: string): string {
  return toDate(s).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}

export function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0]?.toUpperCase()).join('')
}

export function niceName(name: string): string {
  return name === name.toUpperCase() ? name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : name
}
