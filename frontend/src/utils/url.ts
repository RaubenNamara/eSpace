// Uploaded-file paths (videos, chat attachments, profile photos, eNote narration audio, school
// logos, etc.) are stored and returned by the backend as root-relative paths like
// '/uploads/videos/xyz.mp4' (relative to backend/public/), not '/eSpace/uploads/...' - the same
// gap that main.ts and services/api.ts already solve for API calls by prefixing
// import.meta.env.BASE_URL ('/' in dev, '/eSpace/' in production). Any <img>/<video>/<audio> src
// bound directly to one of these backend-provided paths needs the same treatment, or it resolves
// against the domain root in production (stmark.sc.ug's main site) instead of /eSpace/.
export function resolveAssetUrl(path?: string | null): string {
  if (!path) return ''
  if (/^(https?:|data:|blob:)/i.test(path)) return path

  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return base + (path.startsWith('/') ? path : `/${path}`)
}
