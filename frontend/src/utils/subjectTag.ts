// Short subject tag for book spines/labels. Some schools' subject codes are auto-generated
// ("SUBFAF0DD"), which mean nothing on a shelf - use the subject's name in that case.
const AUTO_CODE = /^SUB[0-9A-F]{4,}$/i

export function subjectTag(name?: string | null, code?: string | null, max = 10): string {
  const useCode = code && !AUTO_CODE.test(code)
  return ((useCode ? code : name) || code || '').slice(0, max).toUpperCase()
}
