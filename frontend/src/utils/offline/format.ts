export function formatBytes(bytes: number): string {
  if (!bytes) return '0 KB'
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

/** "in 12 days" / "today" for a future timestamp */
export function daysLeft(at: number): string {
  const days = Math.ceil((at - Date.now()) / (24 * 60 * 60 * 1000))
  if (days <= 0) return 'today'
  return days === 1 ? 'in 1 day' : `in ${days} days`
}
