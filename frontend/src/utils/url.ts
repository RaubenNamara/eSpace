// Uploaded-file paths (videos, chat attachments, profile photos, eNote narration audio, school
// logos, etc.) are stored and returned by the backend as root-relative paths like
// '/uploads/videos/xyz.mp4' (relative to backend/public/). import.meta.env.BASE_URL is '/' in
// both dev and production (see vite.config.ts's `base`), so base is '' here and this is just a
// no-op passthrough - kept in case a future deployment ever needs a subpath prefix again.
export function resolveAssetUrl(path?: string | null): string {
  if (!path) return ''
  if (/^(https?:|data:|blob:)/i.test(path)) return path

  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return base + (path.startsWith('/') ? path : `/${path}`)
}
